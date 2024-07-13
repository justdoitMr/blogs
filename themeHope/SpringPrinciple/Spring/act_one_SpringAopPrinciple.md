---
# 这是文章的标题
title: 8、Aware感知容器接口
# 你可以自定义封面图片
#cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 8
# 设置作者
author: bugcode
# 设置写作时间
date: 2020-01-01
# 一个页面可以有多个分类
category:
  - SPRING
  - SPRINGBOOT
  - JAVA
# 一个页面可以有多个标签
tag:
  - 后端
  - java
  - spring
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在星标文章中
star: true
# 你可以自定义页脚
footer: Spring基础
# 你可以自定义版权信息
copyright: bugcode
---


# 1、Spring AOP原理

## 1、jdk代理

springAOP底层依赖代理技术实现，有两种代理方式：

- JDK代理：基于接口的动态代理技术
- cglib代理：基于父类的动态代理技术

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202406041228008.png)

### 1.1、JDK动态代理

在进行动态代理时，我们可以调用 java.lang.reflect.Proxy 包的 newProxyInstance() 方法。为某些接口创建代理实例Foo的简略步骤如下：

```java
   InvocationHandler handler = new MyInvocationHandler(...);
   Foo f = (Foo) Proxy.newProxyInstance(Foo.class.getClassLoader(),
                     new Class<?>[] { Foo.class },
                     handler);

```

newProxyInstance方法签名如下：

```java
public static Object  newProxyInstance(
	ClassLoader  loader, 
	Class <?>[] interfaces, 
	InvocationHandler  h
	);
```

- loader：定义代理类的类加载器。类加载器（将Class文件字节码内容加载到内存中，生成类对象）
- interfaces：代理类要实现的接口列表。即这个代理类长什么样
- h：将方法调用分派到的调用处理程序

InvocationHandler 介绍
InvocationHandler 是一个接口，需要实现下面的方法。
Object invoke(Object proxy, Method method, Object [] args);

```java
new InvocationHandler() {

            //第一个参数：代理对象
            //第二个参数：需要重写目标对象的方法
            //第三个参数：method方法里面参数
            @Override
            public Object invoke(Object proxy,
                                 Method method,
                                 Object[] args) throws Throwable {

                //调用目标的方法
                Object result = method.invoke(target, args);
  
                return result;
            }
        };
```

在invoke方法里面，可以对我们代理的对象的方法进行功能扩充。

proxy ：调用该方法的代理实例

method：与在代理实例上调用的接口方法对应的 Method 实例。 Method 对象的声明类将是声明该方法的接口，它可能是代理类通过其继承该方法的代理接口的超接口。

args：包含在代理实例的方法调用中传递的参数值的对象数组，或者 null 如果接口方法不带参数。原始类型的参数包装在适当的原始包装类的实例中，例如 java.lang.Integer 或 java.lang.Boolean 。

其实这个proxy就是通过动态代理生成的对象，method是通过动态代理调用的方法，args是方法的参数。那就可以这个简单的理解proxy.method(args);
当然只是这么理解而已，调用过程并不是这样子。

### 1.2、定义代理接口

定义被代理的接口

```java
public interface TargetInterface {

    public void method();
}
```

### 1.3、定义实际的被代理对象

```java
public class TargetClass implements TargetInterface {
    @Override
    public void method() {
        System.out.println("running......");
    }
}
```

### 1.4、动态代理调用

```java
//        创建目标代理对象
        TargetClass targetClass = new TargetClass();

//        创建代理对象
        TargetInterface proxy = (TargetInterface) Proxy.newProxyInstance(targetClass.getClass().getClassLoader(),
                targetClass.getClass().getInterfaces(),
                new InvocationHandler() {
                    /**
                     * 
                     * @param proxy 代理对象 动态生成
                     * @param method 被代理对象调用的方法
                     * @param args 被代理对象调用方法的参数
                     * @return
                     * @throws Throwable
                     */
                    @Override
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
//                        对被代理的对象进行功能扩充
                        System.out.println("前置增强代码");
//                        反射调用方法
                        Object invoke = method.invoke(targetClass, args);
                        System.out.println("后置增强代码");
                        return invoke;
                    }
                });

//        通过代理对象调用测试
        proxy.method();

    }
```

**测试结果**

```java
前置增强代码
running......
后置增强代码
```

无需对具体的方法功能修改，通过代理方法可以实现对被代理对象功能的扩充。

## 2、cglib动态代理

### 2.1、原理

CGLIB 通过动态生成一个需要被代理类的子类（即被代理类作为父类），该子类重写被代理类的所有不是 final 修饰的方法，并在子类中采用方法拦截的技术拦截父类所有的方法调用，进而织入横切逻辑。此外，因为 CGLIB 采用整型变量建立了方法索引，这比使用 JDK 动态代理更快（使用 Java 反射技术创建代理类的实例）。

### 2.2、定义被代理类

```java
public class TargetClass implements TargetInterface {
    @Override
    public void method() {
        System.out.println("method running......");
    }

    //该方法不能被子类覆盖
    final public void finalMethod( ) {
        System.out.println("finalMethod running...");
    }
}
```

cglib动态代理中，final修饰的方法无法做代理，所以在测试案例中，我们声明一个final和非final方法。

### 2.3、定义代理类

```java
public class CglibProxy implements MethodInterceptor {

    /**
     *
     * @param o 表示要进行增强的对象 即被代理对象
     * @param method 表示拦截的方法 被代理对象的方法
     * @param objects 数组表示参数列表，基本数据类型需要传入其包装类型，如int-->Integer、long-Long、double-->Double
     * @param methodProxy 表示对方法的代理，invokeSuper方法表示对被代理对象方法的调用
     * @return
     * @throws Throwable
     */
    @Override
    public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
        System.out.println("前置增强代码" + method.getName());
        //注意这里是调用invokeSuper而不是invoke，否则死循环，methodProxy.invokesuper执行的是原始类的方法，
        // method.invoke执行的是子类的方法
        Object result = methodProxy.invokeSuper(o, objects);
        System.out.println("后置增强代码" + method.getName());
        return result;
    }
}
```

定义代理类，实现MethodInterceptor 接口里面的intercept方法其实就是拦截方法，会将我们代理的对象方法拦截下来然后执行。

### 2.4、cglib代理测试

```java
 @Test
    public void testCglibProxy(){

        CglibProxy cglibProxy = new CglibProxy();

//        cglib用来创建代理对象
        Enhancer enhancer = new Enhancer();

//        设置要创建的动态代理类
        enhancer.setSuperclass(TargetClass.class);
//        设置回调，这里相当于对代理类上所有方法的调用，都会回调CallBack，而Callback则需要执行intercept()方法进行拦截
        enhancer.setCallback(cglibProxy);

        TargetClass proxy = (TargetClass) enhancer.create();

        proxy.method();

        proxy.finalMethod();

    }
```

cglib代理需要设置superClass类，然后设置回调的接口实现类。

**测试结果**

```java
前置增强代码method
method running......
后置增强代码method
finalMethod running...
```

从结果中看到，final修饰的方法没有被代理。

总结一下JDK动态代理和Gglib动态代理的区别：
1.JDK动态代理是实现了被代理对象的接口，Cglib是继承了被代理对象。
2.JDK和Cglib都是在运行期生成字节码，JDK是直接写Class字节码，Cglib使用ASM框架写Class字节码，Cglib代理实现更复杂，生成代理类比JDK效率低。
3.JDK调用代理方法，是通过反射机制调用，Cglib是通过FastClass机制直接调用方法，Cglib执行效率更高。

## 3、Spring AOP

### 3.1、AOP定义

AOP的英文全称是（Aspect Orient Programming），大白话讲就是面向切面切面编程，同OOP一样，AOP也是一种编程思想，是OOP思想的补充，OOP通过对对象的封装，将对对象的操作封装在一个类中，可以在不修改类的基础上，对类的功能进行扩展，而AOP可以看作是在方法级别对方法功能的扩展，在不修改方法源代码基础上实现对方法功能的扩展，可以动态的给方法添加一些额外的功能。

另外AOP可以拦截指定的方法并且对方法增强，而且无需侵入到业务代码中，使业务与非业务处理逻辑分离（理解入侵，就是不修改原有代码的基础上,对原有代码的功能进行扩充），比如Spring的事务，通过事务的注解配置，Spring会自动在业务方法中开启、提交业务，并且在业务处理失败时，执行相应的回滚策略。

使用AOP的主要目的是使得业务逻辑各个部分之间降低耦合度，提高各个模块功能代码的可重用性，提高开发效率。

### 3.2、AOP的实现原理

AOP 采取横向抽取机制（动态代理），取代了传统纵向继承机制的重复性代码，其应用主要体现在事务处理、日志管理、权限控制、异常处理等方面。

主要作用是分离功能性需求和非功能性需求，使开发人员可以集中处理某一个关注点或者横切逻辑，减少对业务代码的侵入，增强代码的可读性和可维护性。

简单的说，AOP 的作用就是保证开发者在不修改源代码的前提下，为系统中的业务组件添加某种通用功能。

AOP 的底层是通过 Spring 提供的的动态代理技术实现的。在运行期间，Spring通过动态代理技术动态的生成代理对象，代理对象方法执行时进行增强功能的介入，在去调用目标对象的方法，从而完成功能的增强。

### 3.3、AOP的应用场景

日志管理，事务管理，权限验证，性能检测，aop可以动态的拦截方法，然后对方法的功能进行增强。

### 3.1、AOP核心概念

- JoinPoint连接点:所谓连接点是指那些被拦截到的点。在spring中,这些点指的是方法，因为spring只支持方法类型的连接点，可以理解为被拦截到的方法。
- PointCut切入点:指要对那些JoinPoint进行拦截，具体是我们要对哪些 Joinpoint 进行拦截的定义
- Advice(通知/增强):拦截到JoinPoint后要做的事情，即对切入点增强的功能
- Target(被代理的目标对象):指的是代理的目标对象
- Weaving植入:是指把增强应用到目标对象来创建新的代理对象的过程。spring采用动态代理织入，而AspectJ采用编译期织入和类装载期织入
- Proxy代理:即生成的代理对象
- Aspect切面:切入点和通知的结合，对切入点和通知的封装。

### 3.2、Spring Aop通知分类

- before前置通知：通知方法在目标方法执行之前执行
- after后置通知：通知方法在目标方法返回或异常后调用执行
- after-returning返回后通知：通知方法会在目标方法返回后调用执行
- after-throwing抛出异常通知：通知方法会在目标方法抛出和异常后调用。
- around环绕通知：通知方法会将目标方法封装起来

### 3.3、Spring aop的植入时期

编译期：切面在目标类编译时被植入，这种方式需要特殊的编译器，AspectJ的植入编译器就是以这种方式植入切面的。
类加载期：切面在目标类加载到JVM时被植入，这种方式需要特殊的类加载器，它可以在目标类引入应用之前增强目标类的字节码。
运行期：切面在应用运行的某一个十七被植入，在这种情况下，在植入切面时，AOP容器会为目标对象动态创建一个代理对象，SpringAop采用的就是这种方式。

### 3.4、Spring AOP三种使用方式

AOP编程其实是很简单的事情，纵观AOP编程，程序员只需要参与三个部分：

1、定义普通业务组件

2、定义切入点，一个切入点可能横切多个业务组件

3、定义增强处理，增强处理就是在AOP框架为普通业务组件织入的处理动作

所以进行AOP编程的关键就是定义切入点和定义增强处理，一旦定义了合适的切入点和增强处理，AOP框架将自动生成AOP代理，即：代理对象的方法=增强处理+被代理对象的方法。所以开发时候明确三点：

1. 谁是切点(切点表达式配置）
2. 谁是通知(切面类中增强方法)
3. 将切点和通知植入配置

> Spring 框架监控切入点方法的执行。一旦监控到切入点方法被运行，使用代理机制，动态创建目标对象的代理对象，根据通知类别，在代理对象的对应位置，将通知对应的功能织入，完成完整的代码逻辑运行。

### 3.5、使用Spring的AIP接口

#### 3.5.1、定义抽象接口

创建目标接口：

```java
public interface UserService {

    public void add();
    public void delete();
    public void update();
    public String select();
}
```

抽象接口，是被代理对象和代理对象都需要实现的内容。

#### 3.5.2、接口实现类

创建目标接口的实现类：

```java
public class UserServiceImpl implements UserService{
    public void add() {
        System.out.println("增加了一个用户");
    }

    public void delete() {
        System.out.println("删除一个用户");
    }

    public void update() {
        System.out.println("修改一个用户");
    }

    public String select() {
        System.out.println("查询一个用户");
        float res = 1/0;

        return "bugcode";
    }

}
```

#### 3.5.3、实现前置通知

创建切面类，切面类有增强通知。

```java
public class BeforeLog implements MethodBeforeAdvice {

    /**
     * 前置通知
     * @param method
     * @param objects
     * @param o
     * @throws Throwable
     */
    @Override
    public void before(Method method, Object[] objects, Object o) throws Throwable {

        System.out.println("执行了before()前置通知方法...");
        System.out.println("对象:"+o.getClass().getName()+" 执行的方法:"+method.getName());
    }
}
```

前置通知，在被代理对象的方法之前执行的内容。

#### 3.5.4、后置通知

创建切面类，切面类有增强通知。

```java
public class AfterLog implements AfterReturningAdvice {

    /**
     * 后置通知
     * @param o
     * @param method
     * @param objects
     * @param o1
     * @throws Throwable 后置通知，代理的方法需要有返回值，否则如果使用o返回结果会包空指针
     */
    @Override
    public void afterReturning(Object o, Method method, Object[] objects, Object o1) throws Throwable {

        System.out.println("执行了afterReturning()后置通知方法...");
        System.out.println("对象:"+o1.toString()+"  执行方法："+method.toString()+"   返回结果是:"+o.toString());
    }
}
```

后置通知，在被代理对象的方法后执行的内容。

#### 3.5.5、环绕通知

创建切面类，切面类有增强通知。

```java
/**
 * @Description 环绕通知 在方法的前后执行
 * @Author bugcode.online
 * @Date 2024/6/4 18:58
 */
public class MethodInterceptorLog implements MethodInterceptor {

    @Override
    public Object invoke(MethodInvocation invocation) throws Throwable {
        System.out.println("before method invoke....");
        Object object = invocation.proceed();
        System.out.println("after method invoke.....");
        return object;
    }
}
```

环绕通知，在被代理对象方法的前后调用执行。

#### 3.5.6、异常通知

创建切面类，切面类有增强通知。

```java
/**
 * @Description
 * @Author bugcode.online
 * @Date 2024/6/4 19:07
 */
public class ThrowAdviceLog  implements ThrowsAdvice {

    public  void  afterThrowing(Exception e)  throws  Throwable{
        System.out.println("出异常了...");
    }
}
```

异常通知，当被代理对象的方法调用抛出异常时候，调用异常通知。

#### 3.5.7、配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/aop https://www.springframework.org/schema/aop/spring-aop.xsd">

    <!--注册bean 将bean的管理权限交给spring容器-->
    <bean id="userService" class="bugcode.online.aop.UserServiceImpl"/>
    <bean id="beforeLog" class="bugcode.online.aop.BeforeLog"/>
    <bean id="afterLog" class="bugcode.online.aop.AfterLog"/>
    <bean id="methodInterceptorLog" class="bugcode.online.aop.MethodInterceptorLog"/>
    <bean id="throwAdviceLog" class="bugcode.online.aop.ThrowAdviceLog"/>

    <!--aop的配置 配置切点表达式和前置增强的织入关系-->
    <aop:config>
        <!--切入点 expression:表达式匹配要执行的方法-->
        <aop:pointcut id="pointcut" expression="execution(* bugcode.online.aop.UserServiceImpl.*(..))"/>
        <!--执行环绕; advice-ref执行方法 . pointcut-ref切入点-->
        <aop:advisor advice-ref="beforeLog" pointcut-ref="pointcut"/>
        <aop:advisor advice-ref="afterLog" pointcut-ref="pointcut"/>
        <aop:advisor advice-ref="methodInterceptorLog" pointcut-ref="pointcut"/>
<!--        异常通知-->
        <aop:advisor advice-ref="throwAdviceLog" pointcut-ref="pointcut"/>
    </aop:config>

</beans>
```

#### 3.5.8、测试

```java
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        //注意：动态代理代理的是接口，不是类
        UserService userService = (UserService) context.getBean("userService", UserService.class);
        userService.select();
    }
```

**测试结果**
有异常的测试：

```java
执行了before()前置通知方法...
对象:bugcode.online.aop.UserServiceImpl 执行的方法:select
before method invoke....
查询一个用户
出异常了...
```

测试用例中调用了被代理对象的select方法，当被代理对象的方法中有异常存在时，不会执行后置通知方法，所以首先执行前置通知，然后执行了环绕前的通知，最后抛出异常。

**无异常测试**

```java
执行了before()前置通知方法...
对象:bugcode.online.aop.UserServiceImpl 执行的方法:select
before method invoke....
查询一个用户
after method invoke.....
执行了afterReturning()后置通知方法...
对象:bugcode.online.aop.UserServiceImpl@7ce3cb8e  执行方法：public abstract java.lang.String bugcode.online.aop.UserService.select()   返回结果是:bugcode
```

首先执行前置通知，然后在执行被代理方法的前后执行了环绕通知，最后执行返回通知。

**小结**
动态代理，代理的是接口，代理类和被代理类都是实现的接口，所以两者属于同级的关系，不能相互强转。

### 3.6、使用自定义切面类

**步骤**

1. 导入 AOP 相关坐标
2. 创建目标接口和目标类（内部有切点）
3. 创建切面类（内部有增强方法）
4. 将目标类和切面类的对象创建权交给 spring
5. 在 applicationContext.xml 中配置织入关系

#### 3.6.1、自定义切面类

```java
public class SelfDefinePointCut {
//    自定义实现切面类

    public void before(){

        System.out.println("befor前置通知方法执行...");
    }

    public void after(){

        System.out.println("after后置通知方法执行...");
    }
}
```

自定义切面类，可以定义前置，后置 环绕等切面方法。

#### 3.6.2、配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/aop https://www.springframework.org/schema/aop/spring-aop.xsd">

    <!--注册bean-->
    <bean id="selfDefinePointCut" class="bugcode.online.aop.two.SelfDefinePointCut"/>
    <bean id="userService" class="bugcode.online.aop.UserServiceImpl"/>

    <!--aop的配置-->
    <aop:config>
        <aop:aspect ref="selfDefinePointCut">
            <!--切入点 expression:表达式匹配要执行的方法-->
            <aop:pointcut id="pointcut" expression="execution(* bugcode.online.aop.UserServiceImpl.*(..))"/>
            <!--执行环绕; advice-ref执行方法 . pointcut-ref切入点-->
            <aop:before method="before" pointcut-ref="pointcut"/>
            <aop:after method="after" pointcut-ref="pointcut"/>
        </aop:aspect>
    </aop:config>

</beans>
```

xml配置中通过method属性指定通知方法的名字

**切点表达式抽取**

当多个增强的切点表达式相同时，可以将切点表达式进行抽取，在增强中使用 pointcut-ref 属性代替 pointcut 属性来引用抽取后的切点表达式。

```java
<aop:config>
    <!--引用myAspect的Bean为切面对象-->
    <aop:aspect ref="myAspect">
        <aop:pointcut id="myPointcut" expression="execution(* com.itheima.aop.*.*(..))"/>
        <aop:before method="before" pointcut-ref="myPointcut"></aop:before>
    </aop:aspect>
</aop:config>

```

**自定义切面类xml文件植入配置**

```java
<aop:config>
    <aop:aspect ref=“切面类”>
        <aop:before method=“通知方法名称” pointcut=“切点表达式"></aop:before>
    </aop:aspect>
</aop:config>

```

* 通知的类型：前置通知、后置通知、环绕通知、异常抛出通知、最终通知
* 切点表达式的写法：

```java
execution([修饰符] 返回值类型 包名.类名.方法名(参数))

```

#### 3.6.3、测试

```java
public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext1.xml");
        //注意：动态代理代理的是接口，不是类
        UserService userService = (UserService) context.getBean("userService", UserService.class);
        userService.select();
    }
```

**测试结果**

```java
befor前置通知方法执行...
查询一个用户
after后置通知方法执行...
```

### 3.7、基于注解实现AOP

基于注解的aop开发步骤：

1. 创建目标接口和目标类（内部有切点）
2. 创建切面类（内部有增强方法）
3. 将目标类和切面类的对象创建权交给 spring
4. 在切面类中使用注解配置织入关系
5. 在配置文件中开启组件扫描和 AOP 的自动代理
6. 测试

#### 3.7.1、实现一个切面类

```java
//标注这是一个切面类
@Aspect
public class AnnotationPointCut {

    /**
     * 标注前置通知切面方法
     */
    @Before("execution(* bugcode.online.aop.UserServiceImpl.*(..))")
    public void before(){
        System.out.println("执行前置通知方法before()...");
    }


    @After("execution(* bugcode.online.aop.UserServiceImpl.*(..))")
    public void after(){
        System.out.println("执行后置通知方法after()...");
    }

    @Around("execution(* bugcode.online.aop.UserServiceImpl.*(..))")
    public void around(ProceedingJoinPoint pjp) throws Throwable {

        System.out.println("环绕通知方法前.....");
        Object proceed = pjp.proceed();
        System.out.println("环绕通知方法后.....");
    }
}
```

切面类中通过注解的方式，标注前置，后置和环绕通知

通知的配置语法：@通知注解(“切点表达式")

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202406051308269.png)


**切点表达式的抽取**

同 xml配置aop 一样，我们可以将切点表达式抽取。抽取方式是在切面内定义方法，在该方法上使用@Pointcut注解定义切点表达式，然后在在增强注解中进行引用。

#### 3.7.2、配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/aop https://www.springframework.org/schema/aop/spring-aop.xsd">

    <!--注册bean-->
    <bean id="userService" class="bugcode.online.aop.UserServiceImpl"/>

    <!--方式三，注解实现AOP-->
    <bean id="ann" class="bugcode.online.aop.annotion.AnnotationPointCut"/>
    <!--开启注解支持-->
    <aop:aspectj-autoproxy/>
</beans>
```

#### 3.7.3、测试

```java
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext2.xml");
        //注意：动态代理代理的是接口，不是类
        UserService userService = (UserService) context.getBean("userService", UserService.class);
        userService.select();
    }
```

**结果**

```java
环绕通知方法前.....
执行前置通知方法before()...
查询一个用户
执行后置通知方法after()...
环绕通知方法后.....
```


### 3.8、切点表达式和通知

#### 3.8.1、切点表达式的语法

```java
execution([修饰符] 返回值类型 包名.类名.方法名(参数))
```

* 访问修饰符可以省略
* 返回值类型、包名、类名、方法名可以使用星号\*  代表任意
* 包名与类名之间一个点 . 代表当前包下的类，两个点 .. 表示当前包及其子包下的类
* 参数列表可以使用两个点 .. 表示任意个数，任意类型的参数列表

```java
execution(public void com.itheima.aop.Target.method())
execution(void com.itheima.aop.Target.*(..))
execution(* com.itheima.aop.*.*(..))
execution(* com.itheima.aop..*.*(..))
execution(* *..*.*(..))
```


#### 3.8.2、通知

```java
<aop:通知类型 method=“切面类中方法名” pointcut=“切点表达式"></aop:通知类型>

```

**通知类型**

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/advice.png)
