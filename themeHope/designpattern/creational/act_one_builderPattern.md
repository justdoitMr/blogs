---
icon: pen-to-square
date: 2024-06-02
category: designPattern
  - 
tag:
  - Java
  - designPattern
---


# 建造者模式

## 需求

1. 需要建房子：这一过程为打桩、砌墙、封顶；
2. 房子有各种各样的，比如**普通房，高楼，别墅**，各种房子的过程虽然一样，但是要求不要相同的.
3. 请编写程序，完成需求.

## 传统方式解决盖房子

抽象类抽象出修建房子的步骤，然后各种房子去实现抽象类实现盖房子的动作。

### **类图**

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202406112036490.png)

### **代码实现**

```java
public class BuilderDemo {
    public static void main(String[] args) {
//        现在创建普通房子的实例
        CommonHouse commonHouse = new CommonHouse();
        commonHouse.build();

    }
}
//抽象的房子类,封装盖房子的整体步骤和操作
abstract class AbstractHouse{
    public abstract void buildBasic();
    public abstract void buildWall();
    public abstract void roofed();

//    具体盖房子的步骤
    public void build(){
        buildBasic();
        buildWall();
        roofed();
    }
}

class CommonHouse extends AbstractHouse{

    @Override
    public void buildBasic() {
        System.out.println("给普通房子打地基");
    }

    @Override
    public void buildWall() {
        System.out.println("给普通房子砌墙");
    }

    @Override
    public void roofed() {
        System.out.println("给普通房子修屋顶");
    }
}
```

**优缺点分析**

1. 优点是比较好理解，简单易操作。
2. 设计的程序结构，过于简单，没有设计缓存层对象，程序的扩展和维护不好. 也就是说，这种设计方案，**把产品(即：房子) 和 创建产品的过程(即：建房子流程) 封装在一起，耦合性增强了**。修建房子的地基，墙和屋顶使用的物料和砌墙，吊顶打地基建房子的过程封装在了一起。
3. 解决方案：将产品和产品建造过程解耦 => 建造者模式.

## 建造者模式

### 建造者模式的基本介绍

1. 建造者模式（**Builder Pattern**） 又叫**生成器模式**，是一种对象构建模式。**它可以将复杂对象的建造过程抽象出来（抽象类别）**，**使这个抽象过程的不同实现方法可以构造出不同表现（属性）的对象**。
2. 建造者模式 是一步一步创建一个复杂的对象，它允许用户只通过指定复杂对象的类型和内容就可以构建它们， 用户不需要知道内部的具体构建细节。
3. 建造者（Builder）模式的定义：**指将一个复杂对象的构造与它的表示分离，使同样的构建过程可以创建不同的表示**，这样的设计模式被称为建造者模式。它是将一个复杂的对象分解为多个简单的对象，然后一步一步构建而成。它将变与不变相分离，即产品的组成部分是不变的，但每一部分是可以灵活选择的。

### **类图说明**

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202406112037411.png)

#### 建造者模式的基本角色

1. Product（产品角色）： 一个具体的产品对象。
2. Builder（抽象建造者）： 创建一个 Product 对象的各个部件指定的 **接口/抽象类。**抽象出建造的流程，不用考虑细节问题。
3. ConcreteBuilder（具体建造者）： 实现接口，构建和装配各个部件。(就相当于我们的房子，实现具体的建造细节)
4. Director（指挥者）： 构建一个使用 Builder 接口的对象。它主要是用于创建一个复杂的对象。它主要有两个作用，一是：隔离了客户与对象的生产过程，二是：负责控制产品对象的生产过程。

**建造者模式原理类图**
![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202406112038246.png)

- concreteBuilder就是具体的建造者，也就是具体需要建造的房子。
- Builder是抽象的类或者是接口，只管理房子的建造过程，不会考虑具体的实现细节，是一个抽象的缓冲层。

### 建造者模式实现盖房子

需要建房子：这一过程为打桩、砌墙、封顶。不管是普通房子也好，别墅也好都需要经历这些过程，下面我们使用建造者模式(Builder Pattern)来完成
**类图实现**
![](https://cdn.nlark.com/yuque/0/2024/png/22919650/1715392890695-c6ea271d-a27b-44ef-8ede-76b99d0f199f.png#averageHue=%23f4f4eb&clientId=u4a1fb044-5b27-4&from=paste&id=uefee823f&originHeight=561&originWidth=1215&originalType=url&ratio=1.6216216216216217&rotation=0&showTitle=false&status=done&style=none&taskId=uce455161-d957-4f88-8ab8-f7a11500120&title=)

- HouseBuilder：就是我们的抽象建造者
- CommonHouse,HighBuilding,OtherHouse是我们具体的建造者
- House:代表我们具体的产品
- HouseDirector:代表我们的指挥者

**代码实现**

```java
public class BuilderHouse4 {
    public static void main(String[] args) {
//        客户端进行调用
//       修建普通的房子
        Commonhouse commonhouse=new Commonhouse();
//        修建房子的指挥者
        HouseDirector houseDirector=new HouseDirector(commonhouse);
//        返回修建好的房子
        House house=houseDirector.constructHouse();
        System.out.println(house);


//        修建高楼
        HighBuilding highBuilding=new HighBuilding();
//        重置指挥者
        houseDirector.setHouseBuilder(highBuilding);
        House house1 = houseDirector.constructHouse();
        System.out.println(house1);
    }
}


/**
 * 具体建造房子的流程，最后返回建造好的房子即可，将建造房子的动作
 封装在一起
 */
class HouseDirector{
//    聚合操作
    HouseBuilder houseBuilder=null;

//    通过构造器方法传入houseBuilder

    public HouseDirector(HouseBuilder houseBuilder) {
        this.houseBuilder = houseBuilder;
    }

//    通过seter方法传入houseBuilder

    public void setHouseBuilder(HouseBuilder houseBuilder) {
        this.houseBuilder = houseBuilder;
    }

//    如何处理建造房子的流程，交给指挥者
    public House constructHouse(){
        houseBuilder.buildBasic();
        houseBuilder.buildWall();
        houseBuilder.roofed();
        return houseBuilder.getHouse();
    }
}

//具体的实现不同房子建造的动作
class HighBuilding extends HouseBuilder{

    @Override
    public void buildBasic() {
        System.out.println("高楼房子打地基");
    }

    @Override
    public void buildWall() {
        System.out.println("高楼房子修墙");
    }

    @Override
    public void roofed() {
        System.out.println("高楼房子修屋顶");
    }
}
//建造Commonhouse房子的动作
class Commonhouse extends HouseBuilder{

    @Override
    public void buildBasic() {
        System.out.println("普通的房子打地基");
    }

    @Override
    public void buildWall() {
        System.out.println("普通的房子修墙");
    }

    @Override
    public void roofed() {
        System.out.println("普通的房子修屋顶");
    }
}

/**
 * 抽象的建造者，仅仅需要考虑房子的建造流程
 */
abstract class HouseBuilder{
    private House house=new House();

//    抽象的方法，只是负责房子的建造流程
    public abstract void buildBasic();
    public abstract void buildWall();
    public abstract void roofed();

//    使用方法建造房子
    public House getHouse(){
        return house;
    }

}

/**
 * 具体的房子类，相当于建造者模式中的产品
 * House--->product
 */
class House{
    private String Basic;
    private String wall;
    private String roofed;

    public House() {
    }

    public House(String basic, String wall, String roofed) {
        Basic = basic;
        this.wall = wall;
        this.roofed = roofed;
    }

    public String getBasic() {
        return Basic;
    }

    public String getWall() {
        return wall;
    }

    public String getRoofed() {
        return roofed;
    }

    @Override
    public String toString() {
        return "House{" +
                "Basic='" + Basic + '\'' +
                ", wall='" + wall + '\'' +
                ", roofed='" + roofed + '\'' +
                '}';
    }

    public void setBasic(String basic) {
        Basic = basic;
    }

    public void setWall(String wall) {
        this.wall = wall;
    }

    public void setRoofed(String roofed) {
        this.roofed = roofed;
    }
}
```

### 建造者模式在jdk源码中的分析

java.lang.StringBuilder 中的建造者模式
**代码分析**
![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202406112039790.png)

#### **角色分析**

1. Appendable 接口定义了多个 append 方法(**抽象方法**), 即 Appendable 为抽象建造者, 定义了抽象方法
2. AbstractStringBuilder 实现了 Appendable 接口方法，这里的 AbstractStringBuilder 已经是**建造者**，只是不能实例化
3. StringBuilder **即充当了指挥者角色，同时充当了具体的建造者**，建造方法的实现是由 AbstractStringBuilder 完成 , 而 StringBuilder 继承了 AbstractStringBuilder

#### 建造者模式的注意细节

1. 客户端(使用程序)不必知道产品内部组成的细节，将产品本身与产品的创建过程解耦，使得相同的创建过程可以创建不同的产品对象
2. 每一个具体建造者都相对独立，而与其他的具体建造者无关，因此可以很方便地替换具体建造者或增加新的具体建造者， 用户使用不同的具体建造者即可得到不同的产品对象
3. 可以更加精细地控制产品的创建过程 。将复杂产品的创建步骤分解在不同的方法中，使得创建过程更加清晰， 也更方便使用程序来控制创建过程
4. 增加新的具体建造者无须修改原有类库的代码，指挥者类针对抽象建造者类编程，系统扩展方便，符合“开闭原则”
5. 建造者模式所创建的产品一般具有较多的共同点，其组成部分相似，如果产品之间的差异性很大，则不适合使用建造者模式，因此其使用范围受到一定的限制。
6. 如果产品的内部变化复杂，可能会导致需要定义很多具体建造者类来实现这种变化，导致系统变得很庞大，因此在这种情况下，要考虑是否选择建造者模式.

#### **抽象工厂模式和建造者模式对比**

- 建造者模式更加注重方法的**调用顺序**，工厂模式注重**创建对象**。
- 创建对象的力度不同，**建造者模式创建复杂的对象，由各种复杂的部件组成，工厂模式创建出来的对象都一样**
- 关注重点不一样，工厂模式只需要把对象创建出来就可以了，而建造者模式不仅要创建出对象，还要知道对象由哪些部件组成。
- 建造者模式根据建造过程中的顺序不一样，最终对象部件组成也不一样。
- 抽象工厂模式实现对产品家族的创建，一个产品家族是这样的一系列产品：具有不同分类维度的产品组合，采用抽象工厂模式不需要关心构建过程，只关心什么产品由什么工厂生产即可。而建造者模式则是要求按照指定的蓝图建造产品，它的主要目的是通过组装零配件而产生一个新产品

**建造者（Builder）模式和工厂模式的关注点不同：建造者模式注重零部件的组装过程，而工厂方法模式更注重零部件的创建过程，但两者可以结合使用。**

#### 建造者模式的优缺点

**优点**

1. 封装性好，构建和表示分离。
2. 扩展性好，各个具体的建造者相互独立，有利于系统的解耦。
3. 客户端不必知道产品内部组成的细节，建造者可以对创建过程逐步细化，而不对其它模块产生任何影响，便于控制细节风险。

**其缺点如下：**

1. 产品的组成部分必须相同，这限制了其使用范围。
2. 如果产品的内部变化复杂，如果产品内部发生变化，则建造者也要同步修改，后期维护成本较大。

#### 建造者模式应用场景

- 建造者模式唯一区别于工厂模式的是**针对复杂对象的创建**。也就是说，如果创建简单对象，通常都是使用工厂模式进行创建，而如果创建复杂对象，就可以考虑使用建造者模式。
- 当需要创建的产品具备复杂创建过程时，可以抽取出共性创建过程，然后交由具体实现类自定义创建流程，使得同样的创建行为可以生产出不同的产品，分离了创建与表示，使创建产品的灵活性大大增加。
- 建造者模式主要适用于以下应用场景：
    - 相同的方法，不同的执行顺序，产生不同的结果。
    - 多个部件或零件，都可以装配到一个对象中，但是产生的结果又不相同。
    - 产品类非常复杂，或者产品类中不同的调用顺序产生不同的作用。
    - 初始化一个对象特别复杂，参数多，而且很多参数都具有默认值