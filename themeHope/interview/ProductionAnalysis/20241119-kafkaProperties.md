---
# 这是文章的标题
title: KAFKA配置说明
# 你可以自定义封面图片
#cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 5
# 设置作者
author: bugcode
# 设置写作时间
date: 2024-11-19
# 一个页面可以有多个分类
category:
  - KAFKA
# 一个页面可以有多个标签
tag:
  - kafka
  - java
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在星标文章中
star: true
# 你可以自定义页脚
footer: 分布式
# 你可以自定义版权信息
copyright: bugcode
---

# KAFKA配置说明

kafka的配置分为 broker、produce、consumer三个不同的配置

# 1**、Broker端参数**

BROKER 的全局配置：

最为核心的三个配置 [broker.id](http://broker.id)、log.dir、zookeeper.connect 。

### **1、存储**

- log.dirs：指定broker使用的若干个文件目录路径。（无默认值，必须指定）
- log.dir：配置单个路径，用于上个参数的补充。

通常情况下，我们只需要设置`log.dirs`即可。而且建议配置多个路径，比如：`/home/kafka1,/home/kafka2,/home/kafka3`。并且，如果条件允许，最好将这些目录**挂载到不同的物理磁盘**。这样做有两个好处：

- 提升读写性能。多块物理磁盘同时读写数据具有更高的吞吐量
- 故障转移（Failvoer）。在之前**Kafka Broker**任何一块磁盘挂掉，整个Broker都会停止提供服务。在**Kafka1.1**开始，坏掉的磁盘上的数据会自动转移到其他正常磁盘上，并且Broker还能正常工作。

# **2、Zookeeper**

Zookeeper在Kafka中扮演着重要的角色，它是一个分布式协调框架，负责协调管理Kafka集群的所有元数据。比如：Broker信息、Topic、每个Topic的partition、partition的Leader副本信息等。

- zookeeper.connect：链接zookeeper的地址。比如我可以指定它的值为`zk1:2181,zk2:2181,zk3:2181`

如果需要让多个Kafka集群使用同一个Zookeeper集群，这个参数应该怎么设置？`chroot`是Zookeeper的概念，类似于别名。

如果你有两套 Kafka 集群，假设分别叫它们`kafka1`和`kafka2`，那么两套集群的`zookeeper.connect`参数可以这样指定：`zk1:2181,zk2:2181,zk3:2181/kafka1`和`zk1:2181,zk2:2181,zk3:2181/kafka2`。切记 chroot 只需要写一次，而且是加到最后的。

# 3、[broker.id](http://broker.id)

每一个broker在集群中的唯一标示，要求是正数。在改变IP地址，不改变broker.id的话不会影响consumers

```java
如果kafka集群有三台机器，那么id分别设置为：
broker.id =1
broker.id =2
broker.id =3
```

# 4**、连接**

客户端或其他Broker和本Broker的通信设置。

- listeners：监听器。其实就是告诉外部连接者要通过什么协议访问指定主机名和端口开放的 Kafka 服务。
- advertised.listeners：和 listeners 相比多了个 advertised。Advertised 的含义表示宣称的、公布的，就是说这组监听器是 Broker 用于对外发布的。

监听器的格式：`<协议名称，主机名，端口号>`。比如`protocol://host:port`

### **4、Topic管理**

- auto.create.topics.enable：是否允许自动创建topic
- unclean.leader.election.enable：是否允许Unclean Leader选举
- auto.leader.rebalance.enable：是否允许定期选举

`auto.create.topics.enable`在线上生产环境一定要改为false，特别是将Kafka用作基础组件，会出现各种稀奇古怪的topic。运维需要严格把控Topic的创建。

`unclean.leader.election.enable`Unclean Leader选举，建议设置为false。解释一下unclean，就是那些同步数据落后太多的`partition`。最新版Kafka默认是false，即不允许落后太多的副本进行Leader选举。如果设置为true，那么那些同步较为落后的副本也会参与选举，如果选为Leader，其他副本就会截取掉多余的数据，造成数据丢失。

但是。假设那些保存数据较多的副本都挂了，并且参数设置为false，服务将会不可用。如果设置为true，这时参数就派上用场了，可以从同步较慢的主机中选择leader，虽然丢失数据，Broker还是可以提供服务。

auto.leader.rebalance.enable`如果设置为true，表示允许Kafka定期对一些Topic的partition进行Leader重选举。上个参数发生在Leader故障的情况，这个参数和它不同的是，他不是选Leader，而是定期换Leader。比如尽管LeaderA表现一直很有好，但是参数设置为true的情况下，有可能会强行换副本B为Leader。`换一次Leader的代价很高，并且这种操作实质上没有任何性能收益，故建议设置为false

### **5、数据留存**

- log.retention.{hours|minutes|ms}：控制一条消息数据被保存多长时间。从优先级上来说 ms 最高、minutes 次之、hours 最低。
- log.retention.bytes：指定 Broker 为消息保存的总磁盘容量大小。
- message.max.bytes：控制 Broker 能够接收的最大消息大小。

`log.retention.hours=168`默认设置，表示保存7天，自动删除七天前的数据，通常情况下，在保证磁盘空间足够时，我们尽量将这个值调大。

`log.retention.bytes=-1`默认设置，代表不限制Broker容量。

`message.max.bytes=1000012`默认还不到1MB，**这个值需要进行调整，线上环境超过1MB的消息场景还是比较多的，设置一个比较大的值比较保险**。

## **二、Topic级别参数**

如果同时设置了Topic级别参数和全局Broker参数，`以Topic级别参数为准，覆盖全局Broker参数`。

- [retention.ms](http://retention.ms)：设置该Topic消息被保存的时间，默认是7天。一旦设置将会覆盖Broker的全局参数
- retention.bytes：设置为该Topic预留多大的磁盘空间，默认为-1，不做限制。
- max.message.bytes：如果公司的Kafka作为基础组件，上面跑的业务数据是比较多的，全局参数较难均衡，可以为每个Topic定制消息大小。

比如使用自带的命令`kafka-configs`来修改 Topic 级别参数，将发送最大值设置为10MB。

```
 bin/kafka-configs.sh --zookeeper localhost:2181 --entity-type topics --entity-name transaction --alter --add-config max.message.bytes=10485760
```

## **三、JVM参数**

Kafka旧版本是用Scala语言编写的，新版本用Java语言，无论是哪个，终归会编译为`class`文件运行在JVM上，因此JVM参数对于Kafka集群相当重要。

**JDK版本选择**：JDK6已经太过陈旧了，并且在kafka2.0.0版本开始已经放弃了对JDK7的支持，所以建议至少使用JDK8。

**堆**：Kafka默认堆大小为1GB，这显然是不够的，Broker在和客户端交互时，会产生大量的ByteBuffer对象。业内公认较为合理的值为6GB。

**GC**：如果在使用JDK8，那么可以手动设置为G1收集器，在没有任何调优的情况下，G1的表现要比CMS出色，主要体现在更少的Full GC，需要调整的参数更少。

- KAFKA_HEAP_OPTS：指定堆大小
- KAFKA_JVM_PERFORMANCE_OPTS：指定 GC 参数

比如，在启动Broker前，可以这样进行设置：

```
 $> export KAFKA_HEAP_OPTS=--Xms6g --Xmx6g
 $> export KAFKA_JVM_PERFORMANCE_OPTS= -server -XX:+UseG1GC -XX:MaxGCPauseMillis=20 -XX:InitiatingHeapOccupancyPercent=35 -XX:+ExplicitGCInvokesConcurrent -Djava.awt.headless=true
 $> bin/kafka-server-start.sh config/server.properties
 123
```

## **四、操作系统参数**

- **文件描述符限制**。通常情况下将它设置成一个超大的值是合理的做法，比如`ulimit -n 1000000`。其实设置这个参数一点都不重要，但不设置的话后果很严重，比如你会经常看到`“Too many open files”`的错误。
- **文件系统类型**：文件系统指的是如 ext3、ext4 或 XFS 这样的日志型文件系统。根据官网的测试报告，XFS 的性能要强于 ext4，所以生产环境最好还是使用 XFS。
- **Swappiness**：很多文章建议设置为0，将swap禁用避免Kafka进程使用swap空间。但是当物理内存耗尽时，操作系统会触发`OOM killer`，随机挑选一个进程然后kill掉，根本不给用户任何预警。 但如果设置成一个比较小的值，当开始使用 swap 空间时，你至少能够观测到 Broker 性能开始出现急剧下降，从而给你进一步调优和诊断问题的时间。比如 1
- **提交时间**：即Flush落盘时间。`向 Kafka 发送数据并不是真要等数据被写入磁盘才会认为成功，而是只要数据被写入到操作系统的页缓存（Page Cache）上就可以了`，随后操作系统根据 LRU 算法会定期将页缓存上的“脏”数据落盘到物理磁盘上。这个定期就是由提交时间来确定的，**默认是 5 秒**。一般情况下我们会认为这个时间太频繁了，可以适当地`增加提交间隔来降低物理磁盘的写操作`。当然你可能会有这样的疑问：如果在页缓存中的数据在写入到磁盘前机器宕机了，那岂不是数据就丢失了。的确，这种情况数据确实就丢失了，但鉴于 **Kafka 在软件层面已经提供了多副本的冗余机制**，因此这里稍微拉大提交间隔去换取性能还是一个合理的做法。

一、Broker参数调优

### **1. 处理消息的最大线程数**

broker 处理消息的最大线程数，默认为 3，建议设为 cpu 核数 + 1：

例如：cpu 核数 8 ：

```
 num.network.threads = 9
 1
```

### **2. 处理磁盘 IO 的线程数**

broker 处理磁盘 IO 的线程数，建议设为 cpu 核数 x 2 ：

例如：cpu 核数 8：

```
 num.io.threads = 16
 1
```

### **3. 数据落盘策略**

[Kafka](https://so.csdn.net/so/search?q=Kafka&spm=1001.2101.3001.7020)重度依赖底层操作系统提供的`PageCache`功能。当上层有写操作时，操作系统只是将数据写入`PageCache`，同时标记`Page`属性为`Dirty`。当读操作发生时，先从`PageCache`中查找，如果发生缺页才进行[磁盘调度](https://so.csdn.net/so/search?q=磁盘调度&spm=1001.2101.3001.7020)，最终返回需要的数据。实际上`PageCache`是把尽可能多的空闲内存都当做了磁盘缓存来使用。但是也带来了问题，如果此时操作系统挂了数据就会丢失，可以通过时间间隔核消息的数量进行合理设置：

```
 ##每当producer写入10000条消息时，刷数据到磁盘
 log.flush.interval.messages=10000
 
 ##每间隔5秒钟时间，刷数据到磁盘
 log.flush.interval.ms=5000
 12345
```

### **4. segment 分段存储策略**

分段文件配置默认是500mb ，有利于快速回收磁盘空间，重启kafka加载也会加快(如果文件过小，则文件数量比较多，[kafka启动](https://so.csdn.net/so/search?q=kafka启动&spm=1001.2101.3001.7020)时是单线程扫描目录(log.dir)下所有数据文件)，文件较多时性能会稍微降低。

```
 ##日志滚动的周期时间，到达指定周期时间时，强制生成一个新的segment
 log.roll.hours=72
 
 ## segment的索引文件最大尺寸限制，即时log.segment.bytes没达到，也会生成一个新的segment
 log.index.size.max.bytes=10*1024*1024
 
 ##控制日志segment文件的大小，超出该大小则追加到一个新的日志segment文件中（-1表示没有限制）
 log.segment.bytes=1024*1024*1024
 12345678
```

### **5. 日志清理策略**

kafka 的消息不管是消费过还是没有消费，都会持久化到硬盘中，如果没有良好的日志清理策略，久而久之会占满磁盘空间，同样核上面配置相似，可以根据时间间隔和日志文件的大小来定义：

```
 ##   开启日志清理
 log.cleaner.enable=true
 
 ##  日志清理运行的线程数
 log.cleaner.threads = 2
 
 ##  日志清理策略选择有：delete和compact主要针对过期数据的处理，或是日志文件达到限制的额度，会被 topic创建时的指定参数覆盖，默认 delete
 log.cleanup.policy = delete
 
 ##  数据文件保留多长时间， 存储的最大时间超过这个时间会根据log.cleanup.policy设置数据清除策略
 ##  log.retention.bytes和 log.retention.minutes或 log.retention.hours任意一个达到要求，都会执行删除
 
 ## 300 分钟
 log.retention.minutes=300
 ## 24小时
 log.retention.hours=24
 
 ##   topic每个分区的最大文件大小，-1没有大小限
 log.retention.bytes=1G
 
 ##  文件大小检查的周期时间，是否触发 log.cleanup.policy中设置的策略
 log.retention.check.interval.ms=5minutes
 
 12345678910111213141516171819202122
```

### **6. 基础配置**

```
 ## 是否允许自动创建topic，若是false，就需要通过命令创建topic
 auto.create.topics.enable =true
 
 ## 默认副本的数量，可以根据 Broker 的个数进行设置。
 default.replication.factor = 3
 
 ## 默认，每个topic的分区个数，若是在topic创建时候没有指定的话会被topic创建时的指定参数覆盖
 num.partitions = 3
 
 ## 消息体的最大大小，单位是字节，如果发送的消息过大，可以适当的增大该参数
 message.max.bytes = 6525000
 
 ## socket的发送缓冲区的大小
 socket.send.buffer.bytes=102400
 
 ## socket的接受缓冲区的大小
 socket.request.max.bytes=104857600
 1234567891011121314151617
```

### **7. 副本同步策略**

```
 ## 默认10s，isr中的follow没有向isr发送心跳包就会被移除
 replica.lag.time.max.ms = 10000
 
 ## 根据leader 和副本的信息条数差值决定是否从isr 中剔除此副本，此信息条数差值根据配置参数，在broker数量较少,或者网络不足的环境中,建议提高此值.
 replica.lag.max.messages = 4000
 
 ## follower与leader之间的socket超时时间
 replica.socket.timeout.ms=30*1000
 
 ## 数据同步时的socket缓存大小
 replica.socket.receive.buffer.bytes=64*1024
 
 ## replicas每次获取数据的最大大小
 replica.fetch.max.bytes =1024*1024
 
 ## replicas同leader之间通信的最大等待时间，失败了会重试
 replica.fetch.wait.max.ms =500
 
 ## fetch的最小数据尺寸，如果leader中尚未同步的数据不足此值,将会阻塞,直到满足条件
 replica.fetch.min.bytes =1
 
 ## leader进行复制的线程数，增大这个数值会增加follower的IO
 num.replica.fetchers=1
 
 ## 每个replica检查是否将最高水位进行固化的频率
 replica.high.watermark.checkpoint.interval.ms = 5000
 
 ## leader的不平衡比例，若是超过这个数值，会对分区进行重新的平衡
 leader.imbalance.per.broker.percentage = 10
 
 ## 检查leader是否不平衡的时间间隔
 leader.imbalance.check.interval.seconds = 300
 1234567891011121314151617181920212223242526272829303132
```

### **二、producer参数**

```
 spring:
   kafka:
     # kafka服务器地址(可以多个)
     bootstrap-servers: 10.218.222.39:9092,10.218.222.40:9092,10.218.222.41:9092
     producer:
       # key/value的序列化
       key-serializer: org.apache.kafka.common.serialization.StringSerializer
       value-serializer: org.apache.kafka.common.serialization.StringSerializer
       # 批量抓取发送的的缓存大小，默认是16kB，意思是缓存中的数据达到配置的数值大小，kafka的生产端发送数据
       batch-size: 65536
       # 缓存容量 默认值为33554432
       # 用于指定producer端用于缓存消息的缓冲区大小，单位为字节，默认值为：33554432  32M。
       # kafka采用的是异步发送的消息架构，producer启动时会首先创建一块内存缓冲区用于保存待发送的消息，
       # 然后由一个专属线程负责从缓冲区读取消息进行真正的发送。
       # 消息持续发送过程中，当缓冲区被填满后，producer立即进入阻塞状态直到空闲内存被释放出来，这段时间不能超过max.blocks.ms设置的值，
       # 一旦超过，producer则会抛出TimeoutException 异常，因为Producer是线程安全的，若一直报TimeoutException，需要考虑调高buffer.memory了。
       # 用户在使用多个线程共享kafka producer时，很容易把 buffer.memory 打满。
       buffer-memory: 524288
       #失败重试次数
       retries: 3
       # ACK
       # 0：Producer 不等待 Broker 的 ACK，这提供了最低延迟，Broker 一收到数据还没有写入磁盘就已经返回，当 Broker 故障时有可能丢失数据。
       # 1：Producer 等待 Broker 的 ACK，Partition 的 Leader 落盘成功后返回 ACK，如果在 Follower 同步成功之前 Leader 故障，那么将会丢失数据。
       # -1（all）：Producer 等待 Broker 的 ACK，Partition 的 Leader 和 Follower 全部落盘成功后才返回 ACK。但是在 Broker 发送 ACK 时，Leader 发生故障，则会造成数据重复。
       acks: 1
 12345678910111213141516171819202122232425
```

### **三、consumer参数**

```
spring:
  kafka:
    bootstrap-servers: 192.168.10.1:9092,192.168.10.2:9092,192.168.10.3:9092
    consumer:
      #用于标识此使用者所属的使用者组的唯一字符串。
      group-id: consumer
      #当Kafka中没有初始偏移量或者服务器上不再存在当前偏移量时该怎么办，默认值为latest，表示自动将偏移重置为最新的偏移量
      #可选的值为latest, earliest, none
      auto-offset-reset: earliest
      #如果'enable.auto.commit'为true，则消费者偏移自动提交给Kafka的频率（以毫秒为单位），默认值为5000。
      auto-commit-interval: 5000ms
      #如果为true，则消费者的偏移量将在后台定期提交，默认值为true
      enable-auto-commit: false
      #如果没有足够的数据立即满足“fetch.min.bytes”给出的要求，服务器在回答获取请求之前将阻塞的最长时间（以毫秒为单位）
      #默认值为500
      fetch-max-wait: 500ms
      #服务器应以字节为单位返回获取请求的最小数据量，默认值为1，对应的kafka的参数为fetch.min.bytes。
      fetch-min-size: 1
      #心跳与消费者协调员之间的预期时间（以毫秒为单位），默认值为3000
      heartbeat-interval: 3000ms
      #密钥的反序列化器类，实现类实现了接口org.apache.kafka.common.serialization.Deserializer
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      #值的反序列化器类，实现类实现了接口org.apache.kafka.common.serialization.Deserializer
      value-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      #一次调用poll()操作时返回的最大记录数，默认值为500
      max-poll-records: 50
    properties:
      max:
        poll:
          interval:
            ms: 600000 #0.10.1.0版本后新增的，这个参数需要根据实际业务处理时间进行设置，一旦Consumer处理不过来，就会被踢出Consumer Group
      session:
        timeout:
          ms: 1800000
    listener:
      # 监听器的 AckMode
      # MANUAL :当每一批poll()的数据被消费者监听器（ListenerConsumer）处理之后, 手动调用Acknowledgment.acknowledge()后提交
      # MANUAL_IMMEDIATE : 手动调用Acknowledgment.acknowledge()后立即提交
      # RECORD : 当每一条记录被消费者监听器（ListenerConsumer）处理之后提交
      # BATCH :当每一批poll()的数据被消费者监听器（ListenerConsumer）处理之后提交
      # TIME 当每一批poll()的数据被消费者监听器（ListenerConsumer）处理之后，距离上次提交时间大于TIME时提交
      # COUNT 当每一批poll()的数据被消费者监听器（ListenerConsumer）处理之后，被处理record数量大于等于COUNT时提交
      ack-mode: manual
      ## poll拉取数据超时时间
      poll-timeout: 600000
      # ack_mode为COUNT/COUNT_TIME 时配置
      ack-count: 10
      # ack_mode为/COUNT_TIME 时配置
      ack-time: 60000
```