---
# 这是文章的标题
title: 线上进程内存动态查看
# 你可以自定义封面图片
#cover: /assets/images/cover2.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 5
# 设置作者
author: bugcode
# 设置写作时间
date: 2024-11-22
# 一个页面可以有多个分类
category:
  - JAVA
# 一个页面可以有多个标签
tag:
  - 面试
  - 场景
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在星标文章中
star: true
# 你可以自定义页脚
footer: 分布式
# 你可以自定义版权信息
copyright: bugcode
---

# 线上进程内存动态查看

## 工具说明

-  jinfo:可以输出并修改运行时的java 进程的opts。
- jps:与unix上的ps类似，用来显示本地的java进程，可以查看本地运行着几个java程序，并显示他们的进程号。
- jstat:一个极强的监视VM内存工具。可以用来监视VM内存内的各种堆和非堆的大小及其内存使用量。
- jmap:打印出某个java进程（使用pid）内存内的所有'对象'的情况（如：产生那些对象，及其数量）。

## JPS




Java版的ps命令，查看java进程及其相关的信息，如果你想找到一个java进程的pid，那可以用jps命令替代linux中的ps命令了，简单而方便。

命令格式：`jps [options] [hostid]`

options参数解释：

- -l : 输出主类全名或jar路径
- -q : 只输出LVMID
- -m : 输出JVM启动时传递给main()的参数
- -v : 输出JVM启动时显示指定的JVM参数

### 案例

```java
jps -l 输出jar包路径，类全名
jps -m 输出main参数
jps -v 输出JVM参数
```



## JSTAT命令

### 说明

jstat命令是使用频率比较高的命令，主要用来查看JVM运行时的状态信息，包括内存状态、垃圾回收等。

命令格式：`jstat [option] LVMID [interval] [count]`

其中LVMID是进程id，interval是打印间隔时间（毫秒），count是打印次数（默认一直打印）

option：参数选项
-t：可以在打印的列加上Timestamp列，用于显示系统运行的时间
-h：可以在周期性数据输出的时候，指定输出多少行以后输出一次表头
vmid：Virtual Machine ID（ 进程的 pid）
interval：执行每次的间隔时间，单位为毫秒
count：用于指定输出多少次记录，缺省则会一直打印

option参数解释：

- -class:class loader的行为统计
- -compiler:HotSpt JIT编译器行为统计
- -gc:垃圾回收堆的行为统计
- -gccapacity:各个垃圾回收代容量(young,old,perm)和他们相应的空间统计
- -gcutil:垃圾回收统计概述
- -gccause 垃圾收集统计概述（同-gcutil），附加最近两次垃圾回收事件的原因
- -gcnew:新生代行为统计
- -gcnewcapacity:新生代与其相应的内存空间的统计
- -gcold:年老代和永生代行为统计
- -gcoldcapacity:年老代行为统计
- -gcpermcapacity:永生代行为统计
- -printcompilation:HotSpot编译方法统计

### 案例

#### 查看系统加载类个数

此命令可以帮助我们查看加载的类个数信息以及占用的内存情况；

```java
//首先进入到jdk安装目录的bin目录下
jstat -class 进程号
    
jstat -class 5052
Loaded  Bytes  Unloaded  Bytes     Time
  7846 14968.0        0     0.0       3.11
```

- Loaded:加载类的数量
- Bytes：加载类的size，单位为Byte
- Unloaded：卸载类的数目
- Bytes：卸载类的size，单位为Byte
- Time：加载与卸载类花费的时间

#### 查看jvm编译类个数

查看jvm编译的类个数信息:

```java
jstat -complier 进程号

jstat -compiler 5052
Compiled Failed Invalid   Time   FailedType FailedMethod
    5415      1       0     9.98          1 java/net/URLClassLoader$1 run
```

- Compiled：编译任务执行数量
- Failed：编译任务执行失败数量
- Invalid：编译任务执行失效数量
- Time：编译任务消耗时间
- FailedType：最后一个编译失败任务的类型
- FailedMethod：最后一个编译失败任务所在的类及方法

#### 查看gc信息以及次数

查看gc的信息以及次数：

```java
jstat -gc 进程号
   
jstat -gc 5052
 S0C    S1C    S0U    S1U      EC       EU        OC         OU       MC     MU    CCSC   CCSU   YGC     YGCT    FGC    FGCT     GCT
7680.0 7680.0  0.0    0.0   206848.0 110596.4  67584.0    10392.8   35496.0 33196.7 4608.0 4210.7      6    0.072   2      0.068    0.139
```

- S0C：年轻代中第一个survivor（幸存区）的容量 （字节）
- S1C：年轻代中第二个survivor（幸存区）的容量 (字节)
- S0U：年轻代中第一个survivor（幸存区）目前已使用空间 (字节)
- S1U：年轻代中第二个survivor（幸存区）目前已使用空间 (字节)
- EC：年轻代中Eden（伊甸园）的容量 (字节)
- EU：年轻代中Eden（伊甸园）目前已使用空间 (字节)
- OC：Old代的容量 (字节)
- OU：Old代目前已使用空间 (字节)
- MC：metaspace(元空间)的容量 (字节)
- MU：metaspace(元空间)目前已使用空间 (字节)
- CCSC：当前压缩类空间的容量 (字节)
- CCSU：当前压缩类空间目前已使用空间 (字节)
- YGC：从应用程序启动到采样时年轻代中gc次数
- YGCT：从应用程序启动到采样时年轻代中gc所用时间(s)
- FGC：从应用程序启动到采样时old代(全gc)gc次数
- FGCT：从应用程序启动到采样时old代(全gc)gc所用时间(s)
- GCT：从应用程序启动到采样时gc用的总时间(s)


#### 查看不同堆区域内存使用大小

查看young，old和perm区的对象和使用大小：

```java
jstat -gccapacity 进程号

jstat -gccapacity 5052
 NGCMN    NGCMX     NGC     S0C   S1C       EC      OGCMN      OGCMX       OGC         OC       MCMN     MCMX      MC     CCSMN    CCSMX     CCSC    YGC    FGC
 40960.0 649216.0 224256.0 7680.0 7680.0 206848.0    81920.0  1298432.0    67584.0    67584.0      0.0 1081344.0  35496.0      0.0 1048576.0   4608.0      6     2


 jstat -gccapacity -h5 5052 1000 #-h5：每5行显示一次表头 1000：每1秒钟显示一次，单位为毫秒

```

- NGCMN：年轻代(young)中初始化(最小)的大小(字节)
- NGCMX：年轻代(young)的最大容量 (字节)
- NGC：年轻代(young)中当前的容量 (字节)
- S0C：年轻代中第一个survivor（幸存区）的容量 (字节)
- S1C：年轻代中第二个survivor（幸存区）的容量 (字节)
- EC：年轻代中Eden（伊甸园）的容量 (字节)
- OGCMN：old代中初始化(最小)的大小 (字节)
- OGCMX：old代的最大容量(字节)
- OGC：old代当前新生成的容量 (字节)
- OC：Old代的容量 (字节)
- MCMN：metaspace(元空间)中初始化(最小)的大小 (字节)
- MCMX：metaspace(元空间)的最大容量 (字节)
- MC：metaspace(元空间)当前新生成的容量 (字节)
- CCSMN：最小压缩类空间大小
- CCSMX：最大压缩类空间大小
- CCSC：当前压缩类空间大小
- YGC：从应用程序启动到采样时年轻代中gc次数
- FGC：从应用程序启动到采样时old代(全gc)gc次数

#### 元数据空间统计

```java
jstat -gcmetacapacity 5052
   MCMN       MCMX        MC       CCSMN      CCSMX       CCSC     YGC   FGC    FGCT     GCT
   0.0  1081344.0    35496.0        0.0  1048576.0     4608.0     6     2    0.068    0.139
```

- MCMN：最小元数据容量
- MCMX：最大元数据容量
- MC：当前元数据空间大小
- CCSMN：最小压缩类空间大小
- CCSMX：最大压缩类空间大小
- CCSC：当前压缩类空间大小
- YGC：从应用程序启动到采样时年轻代中gc次数
- FGC：从应用程序启动到采样时old代(全gc)gc次数
- FGCT：从应用程序启动到采样时old代(全gc)gc所用时间(s)
- GCT：从应用程序启动到采样时gc用的总时间(s)

#### 新生代垃圾回收统计

```java
jstat -gcnew 5052
 S0C    S1C    S0U    S1U   TT MTT  DSS      EC       EU     YGC     YGCT
7680.0 7680.0    0.0    0.0  5  15 7680.0 206848.0 149606.4      6    0.072
```

- S0C：年轻代中第一个survivor（幸存区）的容量 (字节)
- S1C：年轻代中第二个survivor（幸存区）的容量 (字节)
- S0U：年轻代中第一个survivor（幸存区）目前已使用空间 (字节)
- S1U：年轻代中第二个survivor（幸存区）目前已使用空间 (字节)
- TT：持有次数限制
- MTT：最大持有次数限制
- DSS：期望的幸存区大小
- EC：年轻代中Eden（伊甸园）的容量 (字节)
- EU：年轻代中Eden（伊甸园）目前已使用空间 (字节)
- YGC：从应用程序启动到采样时年轻代中gc次数
- YGCT：从应用程序启动到采样时年轻代中gc所用时间(s)


#### 新生代内存统计

```java
jstat -gcnewcapacity 5052
NGCMN      NGCMX       NGC      S0CMX     S0C     S1CMX     S1C       ECMX        EC      YGC   FGC
40960.0   649216.0   224256.0 216064.0   7680.0 216064.0   7680.0   648192.0   206848.0     6     2
```

- NGCMN：年轻代(young)中初始化(最小)的大小(字节)
- NGCMX：年轻代(young)的最大容量 (字节)
- NGC：年轻代(young)中当前的容量 (字节)
- S0CMX：年轻代中第一个survivor（幸存区）的最大容量 (字节)
- S0C：年轻代中第一个survivor（幸存区）的容量 (字节)
- S1CMX：年轻代中第二个survivor（幸存区）的最大容量 (字节)
- S1C：年轻代中第二个survivor（幸存区）的容量 (字节)
- ECMX：年轻代中Eden（伊甸园）的最大容量 (字节)
- EC：年轻代中Eden（伊甸园）的容量 (字节)
- YGC：从应用程序启动到采样时年轻代中gc次数
- GC：从应用程序启动到采样时old代(全gc)gc次数

#### 老年代垃圾回收统计

```java
jstat -gcold 5052
MC       MU      CCSC     CCSU       OC          OU       YGC    FGC    FGCT     GCT
35496.0  33196.7   4608.0   4210.7     67584.0     10392.8      6     2    0.068    0.139
```

- MC：metaspace(元空间)的容量 (字节)
- MU：metaspace(元空间)目前已使用空间 (字节)
- CCSC：压缩类空间大小
- CCSU：压缩类空间使用大小
- OC：Old代的容量 (字节)
- OU：Old代目前已使用空间 (字节)
- YGC：从应用程序启动到采样时年轻代中gc次数
- FGC：从应用程序启动到采样时old代(全gc)gc次数
- FGCT：从应用程序启动到采样时old代(全gc)gc所用时间(s)
- GCT：从应用程序启动到采样时gc用的总时间(s)

#### 老年代内存统计

```java
jstat -gcoldcapacity 5052
OGCMN       OGCMX        OGC         OC       YGC   FGC    FGCT     GCT
81920.0   1298432.0     67584.0     67584.0     6     2    0.068    0.139
```

- OGCMN：old代中初始化(最小)的大小 (字节)
- OGCMX：old代的最大容量(字节)
- OGC：old代当前新生成的容量 (字节)
- OC：Old代的容量 (字节)
- YGC：从应用程序启动到采样时年轻代中gc次数
- FGC：从应用程序启动到采样时old代(全gc)gc次数
- FGCT：从应用程序启动到采样时old代(全gc)gc所用时间(s)
- GCT：从应用程序启动到采样时gc用的总时间(s)

#### 垃圾回收统计

```java
jstat -gcutil 12888 1000 3

12888为pid，每隔1000毫秒打印一次，打印3次
```

**输出**

```java
S0     S1     E      O      M     CCS    YGC     YGCT    FGC    FGCT     GCT

6.17   0.00   6.39  33.72  93.42  90.57    976   57.014    68   53.153  110.168

6.17   0.00   6.39  33.72  93.42  90.57    976   57.014    68   53.153  110.168

6.17   0.00   6.39  33.72  93.42  90.57    976   57.014    68   53.153  110.168
```

字段解释:

- S0：年轻代中第一个survivor（幸存区）已使用的占当前容量百分比
- S1：年轻代中第二个survivor（幸存区）已使用的占当前容量百分比
- E：年轻代中Eden（伊甸园）已使用的占当前容量百分比
- O：old代已使用的占当前容量百分比
- M：元数据区已使用的占当前容量百分比
- CCS：压缩类空间已使用的占当前容量百分比
- YGC ：从应用程序启动到采样时年轻代中gc次数
- YGCT ：从应用程序启动到采样时年轻代中gc所用时间(s)
- FGC ：从应用程序启动到采样时old代(全gc)gc次数
- FGCT ：从应用程序启动到采样时old代(全gc)gc所用时间(s)
- GCT：从应用程序启动到采样时gc用的总时间(s)


#### 垃圾回收堆行为统计

```java
jstat -gc 12888 1000 3
```

-gc和-gcutil参数类似，只不过输出字段不是百分比，而是实际的值。

**输出**

```java
S0C        S1C        S0U  S1U     EC           EU           OC             OU            MC          MU         CCSC      CCSU       YGC  YGCT    FGC   FGCT    GCT

25600.0 25600.0  0.0   1450.0 204800.0 97460.7   512000.0   172668.8  345736.0 322997.7 48812.0 44209.0    977   57.040  68     53.153  110.193

25600.0 25600.0  0.0   1450.0 204800.0 97460.7   512000.0   172668.8  345736.0 322997.7 48812.0 44209.0    977   57.040  68     53.153  110.193

25600.0 25600.0  0.0   1450.0 204800.0 97460.7   512000.0   172668.8  345736.0 322997.7 48812.0 44209.0    977   57.040  68     53.153  110.193
```

字段解释：

- S0C survivor0大小
- S1C survivor1大小
- S0U survivor0已使用大小
- S1U survivor1已使用大小
- EC Eden区大小
- EU Eden区已使用大小
- OC 老年代大小
- OU 老年代已使用大小
- MC 方法区大小
- MU 方法区已使用大小
- CCSC 压缩类空间大小
- CCSU 压缩类空间已使用大小
- YGC 年轻代垃圾回收次数
- YGCT 年轻代垃圾回收消耗时间
- FGC 老年代垃圾回收次数
- FGCT 老年代垃圾回收消耗时间
- GCT 垃圾回收消耗总时间


#### -gccause

```java
jstat -gccause 5052
S0     S1     E      O      M     CCS    YGC     YGCT    FGC    FGCT     GCT    LGCC                 GCC
0.00   0.00  87.76  15.38  93.52  91.38      6    0.072     2    0.068    0.139 Metadata GC Threshold No GC
```

- LGCC：最后一次GC原因
- GCC：当前GC原因（No GC 为当前没有执行GC）

## jinfo

### 说明

在很多情况下，Java应用程序不会指定所有的Java虚拟机参数。而此时，开发人员可能不知道某一个具体的Java虚拟机参数的默认值。在这种情况下，可能需要通过查找文档获取某个参数的默认值。这个查找过程可能是非常艰难的。但有了 jinfo工具，开发人员可以很方便地找到Java虚拟机参数的当前值。

jinfo不仅可以查看运行时某一个Java虚拟机参数的实际取值， 甚至可以在运行时修改部分参 数，并使之立即生效。 但是，并非所有参数都支持动态修改。参数只有被标记 manageable的flag可以被实时修改。其实，这个修改能力是 极其有限的。
**基本语法**

```java
jinfo [options] pid
```

| 选项             | 选项说明                                                     |
| ---------------- | ------------------------------------------------------------ |
| no option        | 输出全部的参数和系统属性                                     |
| -flag name       | 输出对应名称的参数                                           |
| -flag [+-]name   | 开启或者关闭对应名称的参数 只有被标记为 manageable 的参数才可以被动态修改 |
| -flag name=value | 设定对应名称的参数                                           |
| -flags           | 输出全部的参数                                               |
| -sysprops        | 输出系统属性                                                 |

### 使用案例

> 其中11888为pid

#### 查看JVM参数和系统配置

```java
jinfo 11888
jinfo -flags 11888
jinfo -sysprops 11888
```

#### 查看打印GC日志参数

```java
jinfo -flag PrintGC 11888
jinfo -flag PrintGCDetails 11888
```

#### 打开GC日志参数

```java
jinfo -flag +PrintGC 11888
jinfo -flag +PrintGCDetails 11888
```

#### 关闭GC日志参数

```java
jinfo -flag -PrintGC 11888
jinfo -flag -PrintGCDetails 11888
```

还可以使用下面的命令查看那些参数可以使用jinfo命令来管理：

```java
java -XX:+PrintFlagsFinal -version | grep manageable
```

常用JVM参数：

> -Xms：初始堆大小，默认为物理内存的1/64(<1GB)；默认(MinHeapFreeRatio参数可以调整)空余堆内存小于40%时，JVM就会增大堆直到-Xmx的最大限制
> -Xmx：最大堆大小，默认(MaxHeapFreeRatio参数可以调整)空余堆内存大于70%时，JVM会减少堆直到 -Xms的最小限制
> -Xmn：新生代的内存空间大小，注意：此处的大小是（eden+ 2 survivor space)。与jmap -heap中显示的New gen是不同的。整个堆大小=新生代大小 + 老生代大小 + 永久代大小。
>    在保证堆大小不变的情况下，增大新生代后,将会减小老生代大小。此值对系统性能影响较大,Sun官方推荐配置为整个堆的3/8。
> -XX:SurvivorRatio：新生代中Eden区域与Survivor区域的容量比值，默认值为8。两个Survivor区与一个Eden区的比值为2:8,一个Survivor区占整个年轻代的1/10。
> -Xss：每个线程的堆栈大小。JDK5.0以后每个线程堆栈大小为1M,以前每个线程堆栈大小为256K。应根据应用的线程所需内存大小进行适当调整。在相同物理内存下,
>    减小这个值能生成更多的线程。但是操作系统对一个进程内的线程数还是有限制的，不能无限生成，经验值在3000~5000左右。一般小的应用， 如果栈不是很深， 应该是128k够用的，
>    大的应用建议使用256k。这个选项对性能影响比较大，需要严格的测试。和threadstacksize选项解释很类似,官方文档似乎没有解释,
>    在论坛中有这样一句话:"-Xss ``is` `translated ``in` `a VM flag named ThreadStackSize”一般设置这个值就可以了。
> -XX:PermSize：设置永久代(perm gen)初始值。默认值为物理内存的1/64。
> -XX:MaxPermSize：设置持久代最大值。物理内存的1/4。







## jmap

### 说明

jmap是用来生成堆dump文件和查看堆相关的各类信息的命令，例如查看finalize执行队列，heap的详细信息和使用情况。

命令格式：

```java
jmap [option] <pid> (连接正在执行的进程)
jmap [option] <executable <core> (连接一个core文件)
jmap [option] [server_id@]<remote server IP or hostname> (链接远程服务器)
```

option参数解释：

- `<none> to print same info as Solaris pmap`
- -heap :打印java heap摘要
- -histo[:live]: 打印堆中的java对象统计信息
- -clstats :打印类加载器统计信息
- -finalizerinfo:打印在f-queue中等待执行finalizer方法的对象
- `-dump:<dump-options> 生成java堆的dump文件`
    - dump-options:
        - live         只转储存活的对象，如果没有指定则转储所有对象
        - format=b     二进制格式
        - `file=<file>  转储文件到 <file>`

- -F:强制选项

### 案例

#### 转存存活对象

```java
jmap -dump:live,format=b,file=dump.hprof 12888
```

这个命令是要把java堆中的存活对象信息转储到dump.hprof文件

#### 统计存活对象统计信息

```java
jmap -histo:live 12888 | more
```

输出存活对象统计信息:

```java
num     #instances         #bytes  class name
----------------------------------------------
1:         46608        1111232  java.lang.String
2:          6919         734516  java.lang.Class
3:          4787         536164  java.net.SocksSocketImpl
4:         15935         497100  java.util.concurrent.ConcurrentHashMap$Node
5:         28561         436016  java.lang.Object
```



#### 查看进程详细堆信息

**jmap命令可以用来查看堆中的活动对象及大小**

```java
Attaching to process ID 12888, please wait...
Debugger attached successfully.
Server compiler detected.
JVM version is 25.25-b02

using thread-local object allocation.
Parallel GC with 4 thread(s)

Heap Configuration: //堆内存初始化配置
   MinHeapFreeRatio         = 0 //对应jvm启动参数-XX:MinHeapFreeRatio设置JVM堆最小空闲比率(default 40)
   MaxHeapFreeRatio         = 100 //对应jvm启动参数 -XX:MaxHeapFreeRatio设置JVM堆最大空闲比率(default 70)
   MaxHeapSize              = 1073741824 (1024.0MB) //对应jvm启动参数-XX:MaxHeapSize=设置JVM堆的最大大小
   NewSize                  = 22020096 (21.0MB) //对应jvm启动参数-XX:NewSize=设置JVM堆的新生代的默认大小
   MaxNewSize               = 357564416 (341.0MB) //对应jvm启动参数-XX:MaxNewSize=设置JVM堆的新生代的最大大小
   OldSize                  = 45088768 (43.0MB) //对应jvm启动参数-XX:OldSize=<value>:设置JVM堆的老年代的大小
   NewRatio                 = 2 //对应jvm启动参数-XX:NewRatio=:新生代和老生代的大小比率
   SurvivorRatio            = 8 //对应jvm启动参数-XX:SurvivorRatio=设置新生代中Eden区与Survivor区的大小比值
   MetaspaceSize            = 21807104 (20.796875MB) // 元数据区大小
   CompressedClassSpaceSize = 1073741824 (1024.0MB) //类压缩空间大小
   MaxMetaspaceSize         = 17592186044415 MB //元数据区最大大小
   G1HeapRegionSize         = 0 (0.0MB) //G1垃圾收集器每个Region大小

Heap Usage: //堆内存使用情况
PS Young Generation 
Eden Space: //Eden区内存分布
   capacity = 17825792 (17.0MB) //Eden区总容量
   used     = 12704088 (12.115562438964844MB) //Eden区已使用
   free     = 5121704 (4.884437561035156MB) //Eden区剩余容量
   71.26801434685203% used //Eden区使用比率
From Space: //其中一个Survivor区的内存分布
   capacity = 2097152 (2.0MB)
   used     = 1703936 (1.625MB)
   free     = 393216 (0.375MB)
   81.25% used
To Space: //另一个Survivor区的内存分布
   capacity = 2097152 (2.0MB)
   used     = 0 (0.0MB)
   free     = 2097152 (2.0MB)
   0.0% used
PS Old Generation
   capacity = 52428800 (50.0MB) //老年代容量
   used     = 28325712 (27.013504028320312MB) //老年代已使用
   free     = 24103088 (22.986495971679688MB) //老年代空闲
   54.027008056640625% used //老年代使用比率

15884 interned Strings occupying 2075304 bytes.
```



## Jhat

### 说明

jhat是用来分析jmap生成dump文件的命令，jhat内置了应用服务器，可以通过网页查看dump文件分析结果，jhat一般是用在离线分析上。

命令格式：`jhat [option] [dumpfile]`

option参数解释：

```text
- -stack false: 关闭对象分配调用堆栈的跟踪
- -refs false: 关闭对象引用的跟踪
- -port <port>: HTTP服务器端口，默认是7000
- -debug <int>: debug级别
    - 0: 无debug输出
    - Debug hprof file parsing
    - Debug hprof file parsing, no server
    - -version 分析报告版本
```

### 使用案例

```java
jhat dump.hprof
```



## jstack

### 说明

jstack是用来查看JVM线程快照的命令，线程快照是当前JVM线程正在执行的方法堆栈集合。使用jstack命令可以定位线程出现长时间卡顿的原因，例如死锁，死循环等。jstack还可以查看程序崩溃时生成的core文件中的stack信息。

**命令格式**

```java
jstack [option] <pid> // 打印某个进程的堆栈信息

option选项：

jstack [-l] <pid> (连接运行中的进程)
jstack -F [-m] [-l] <pid> (连接挂起的进程)
jstack [-m] [-l] <executable> <core> (连接core文件)
jstack [-m] [-l] [server_id@]<remote server IP or hostname> (连接远程debug服务器)
```

option参数解释：

```text
-F 当使用jstack <pid>无响应时，强制输出线程堆栈。
-m  同时输出java和本地堆栈(混合模式)
-l  除堆栈外，显示关于锁的附加信息，在发生死锁时可以用jstack -l pid来观察锁持有情况
```

### 线程状态分析

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/20241125125506.png)

Java语言定义了6种线程池状态：

- New：创建后尚未启动的线程处于这种状态，不会出现在Dump中。
- RUNNABLE：包括Running和Ready。线程开启start（）方法，会进入该状态，在虚拟机内执行的。
- Waiting：无限的等待另一个线程的特定操作。
- Timed Waiting：有时限的等待另一个线程的特定操作。
- 阻塞（Blocked）：在程序等待进入同步区域的时候，线程将进入这种状态，在等待监视器锁。
- 结束（Terminated）：已终止线程的线程状态，线程已经结束执行。

Dump文件的线程状态一般其实就以下3种：

- RUNNABLE，线程处于执行中
- BLOCKED，线程被阻塞
- WAITING，线程正在等待


### Monitor监视锁

因为Java程序一般都是多线程运行的，Java多线程跟监视锁环环相扣，所以我们分析线程状态时，也需要回顾一下Monitor监视锁知识。

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/20241125125923.png)


- 线程想要获取monitor,首先会进入Entry Set队列，它是Waiting Thread，线程状态是Waiting for monitor entry。
- 当某个线程成功获取对象的monitor后,进入Owner区域，它就是Active Thread。
- 如果线程调用了wait()方法，则会进入Wait Set队列，它会释放monitor锁，它也是Waiting Thread，线程状态in Object.wait()
- 如果其他线程调用 notify() / notifyAll() ，会唤醒Wait Set中的某个线程，该线程再次尝试获取monitor锁，成功即进入Owner区域。


Dump 文件分析关注重点:

- runnable，线程处于执行中
- deadlock，死锁（重点关注）
- blocked，线程被阻塞 （重点关注）
- Parked，停止
- locked，对象加锁
- waiting，线程正在等待
- waiting to lock 等待上锁
- Object.wait()，对象等待中
- waiting for monitor entry 等待获取监视器（重点关注）
- Waiting on condition，等待资源（重点关注），最常见的情况是线程在等待网络的读写

### 查看线程堆栈信息

此命令用来查看进程下jvm的运行状态：

```java
jstack 进程号
```


### jstack分析cpu过高问题

#### 示例代码

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * className: TestCpuHight
 * description:
 * author: MrR
 * date: 2024/11/25 13:03
 * version: 1.0
 */
public class TestCpuHight{

    private static ExecutorService executorService = Executors.newFixedThreadPool(5);

    private static Object lock = new Object();

    public static void main(String[] args) {
        Task task1 = new Task();
        Task task2 = new Task();
        System.out.println("提交task1....");
        executorService.submit(task1);
        System.out.println("提交task2....");
        executorService.submit(task2);
    }

    static class Task implements Runnable{

        @Override
        public void run() {
            synchronized (lock){
                long sum = 0;
                while (true){
                    try {
                        Thread.sleep(200);
                        sum++;
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }

                }
            }
        }
    }
}
```
循环导致cpu占用过高；

使用jstack分析cpu过高问题步骤：


1. top
2. top -Hp pid
3. jstack pid
4. jstack -l [PID] >/tmp/log.txt
5. 分析堆栈信息


#### 使用top命令查看占用cpu过高的进程


![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/20241125171918.png)

在服务器上，我们可以通过top命令查看各个进程的cpu使用情况，它默认是按cpu使用率由高到低排序的；

从上图中，我们可以看到pid为11957的进程cpu占用很高；


#### 查看各个线程cpu占用情况

top -Hp pid:查看进程中线程cpu占用情况；

通过top -Hp 11975可以查看该进程下，各个线程的cpu使用情况，如下：

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/20241125171945.png)

上图中看到线程12010 cpu占用率为99.9%，因此我们重点分析该线程的堆栈数据；

#### jstack命令查看进程堆栈信息

jstack -l pid 命令查看进程堆栈信息；

通过top命令定位到cpu占用率较高的线程之后，接着使用jstack pid命令来查看当前java进程的堆栈状态；

将线程堆栈信息重定向到本地文件，然后将cpu占用率较高的线程id号转换为十六进制；

例如本例子中线程号12010转换为16进制为：2eea，我们使用此编号去堆栈文件中定位线程的堆栈信息；

```text
"pool-1-thread-2" #19 prio=5 os_prio=0 tid=0x00007f36b0127000 nid=0x2eeb waiting for monitor entry [0x00007f362f9fa000]
   java.lang.Thread.State: BLOCKED (on object monitor)
        at TestCpuHight$Task.run(TestCpuHight.java:31)
        - waiting to lock <0x00000000d86744f0> (a java.lang.Object)
        at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511)
        at java.util.concurrent.FutureTask.run(FutureTask.java:266)
        at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
        at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
        at java.lang.Thread.run(Thread.java:748)

   Locked ownable synchronizers:
        - <0x00000000d8676ca8> (a java.util.concurrent.ThreadPoolExecutor$Worker)

"pool-1-thread-1" #18 prio=5 os_prio=0 tid=0x00007f36b0125800 nid=0x2eea runnable [0x00007f362fafa000]
   java.lang.Thread.State: RUNNABLE
        at TestCpuHight$Task.run(TestCpuHight.java:33)
        - locked <0x00000000d86744f0> (a java.lang.Object)
        at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511)
        at java.util.concurrent.FutureTask.run(FutureTask.java:266)
        at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
        at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
        at java.lang.Thread.run(Thread.java:748)

   Locked ownable synchronizers:
        - <0x00000000d8676870> (a java.util.concurrent.ThreadPoolExecutor$Worker)
```

如上，我们定位到：pool-1-thread-1,nid=0x2eea,可以看到该线程处于running状态，并且处于锁占用状态；具体代码在TestCpuHight.java:33位置；

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/20241125173307.png)

这段代码刚好就是true循环位置，因此也就定位到cpu占用高的原因；