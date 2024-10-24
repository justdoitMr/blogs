import { sidebar } from "vuepress-theme-hope";

    //将其他文件下的内容导入此文件
export const sidebarConfig = sidebar({
    //   ------------------------------------------------导航文档导入 start-----------------------------------------------------
    //  导读专题
    "/introduction/": [
    ],
    // 算法专题
    "/algorithm/algor/": [
        "basicAlgor.md"
    ],
    "/algorithm/dataStructure/": [
        "basicDataStructure.md"
    ],
    // 知识星球
    "/KnowledgePlanet/": [
        "act_one_aboutMyKnowledgePlanet.md"
    ],
    // B站
    "/video/": [
        "act_one_aboutMyvideo.md"
    ],
    "/interview/TechnicalInterview/": [
        "act_one_k8s基础面经一.md",
        "act_six_k8s基础面经二.md",
        "act_seven_k8s基础面经三.md",
        "act-two-分布式锁.md",
        "act_three-Redis和Mysql双写一致性问题.md",
        "act_four_分布式基础.md",
        "act_five_分布式事务.md",
    ],
    // 场景题目
    "/interview/Scenequestion/":[
        "actone_Microservice_architecture.md",
        "act_two_interface_design.md",
        "act_three_Slow_SQL.md",
        "act_four_Frequent_calls.md",
        "act_five_Duplicate_data.md"
    ],
    // 业务
    "/business/": [
    ],
    "/frameDesignAndSourceCode/springSourceCode/" :[
        "act_one-springIntroduction.md",
        "act_two-springBeanDefineAndRegister.md",
        "act_three-springConstructurInstantiation.md",
        "act_four-springPropertyAutowareAnddepObj.md",
        "act_five-springResourceLoadAndObjRegister.md",
        "act_six-springContext.md",
        "act_seven-springInitAndDestoryMethod.md",
        "act_eight-springAwareContainerObj.md",
        "act_nine-springActOnAndBeanFactory.md",
        "act_ten-springContainerAndEventListener.md",
        "act_eleven-spring-aopJdkAndCglib.md",
        "act_tweve-spring-UseAopInSpringContainer.md",
        "act_thirteen-spring-UseAopInSpringContainer.md",
        "act_fourteen-spring-UseAnnotationAutoPro.md",
        "act_fifteen-spring-ProxyObjSetPro.md"
    ],
    // mybatis源码
    "/frameDesignAndSourceCode/mybatisSourceCode/" :[
        "first-mybatisintroduction.md",
    ],
    // 架构专题/frameDesignAndSourceCode/
    "/engineeringArchitectureDesign/" :[
        "first-mvcDesignArchitecture.md",
        "second-ddd-Concept-Theory.md",
        "third-ddd-Engineering-Model.md",
        "four-ddd-architecture-design.md",
        "five-ddd-Architectural-Refactoring.md"
    ],
    // 设计模式篇
    "/designpattern/designPrinciple/" :[
        "act_one_classDiagram.md",
    ],
    "/designpattern/creational/" :[
        "act_one_builderPattern.md",
        "act_two_factoryPattern.md",
        "act_three_signPattern.md"
    ],
    //
    "/designpattern/Behavior/" :[
        "act_one_templatePattern.md",
        "act_two_strategyPattern.md"
    ],
    "/designpattern/structural/" :[
        "act_one_adapterPattern.md",
        "act_two_proxyPattern.md",
        "act_three_DecoratorPattern.md"
    ],
    "/project/" :[
        "act_one-K8SDeployApplicatinn.md",
    ],
    "/about/" :[
        "intro.md",
    ],
    // 业务
    "/excellentBook/business/":[
        "act_one_finance.md"
    ],
    // 项目经验
    "/excellentBook/project/":[
        "act_one-K8SDeployApplicatinn.md"
    ],


    //   ------------------------------------------------导航文档导入 end-----------------------------------------------------



    // --------------------------------------------------下面是目录结构-----------------------------------------------------

  "/": [
    {
        text: "一、导读",
        collapsible: true,
        children:
            [
                // Java核心
                {
                    prefix: "/introduction/",
                    text: "1、导读",
                    link: "readme"
                },
                {
                    prefix: "introduction/",
                    text: "2、引言",
                    link: "intrd"
                }
            ]
    },
      // 第二章节：java篇
      {
          text: "二、java核心",
          collapsible: true,
          children:
              [
              // Java核心
                  {
                      prefix: "java/javaBasic/",
                      text: "1、Java概述",
                      collapsible: true,
                      children: [
                          // 里面写每一节
                          "first-introduction.md",
                          "second-jdkInstallion.md"
                      ],
                  },
                  {
                      prefix: "java/javaCore/",
                      text: "2、Java进阶",
                      collapsible: true,
                      children: [
                          // 里面写每一节
                      ],
                  }
              ]
      },
      // 第三章节：Spring
      {
          // 大章节目录
          text: "三、Spring篇",
          collapsible: true,
          children:
              [
                  // 第三章 第一节
                  {
                      prefix: "SpringPrinciple/Spring/",
                      text: "1、Spring",
                      collapsible: true,
                      children: [
                          "act_one_SpringAopPrinciple.md",
                          "act_two_SpringAnnotation.md",
                          "act_three_SpringAopBasic.md",
                          "act_four_SpringTransaction.md",
                      ],
                  },
                  // 第三章 第二节
                  {
                      prefix: "SpringPrinciple/springmvc/",
                      text: "2、SpringMvc",
                      collapsible: true,
                      children: [
                          "act_one_springMvcCharacterOne.md",
                      ],
                  },
                  // 第三章 第三节
                  {
                      prefix: "SpringPrinciple/springboot/",
                      text: "3、SpringBoot",
                      collapsible: true,
                      children: [
                          "act_one_springIntroduction.md",
                          "act_two_springboot_basic.md",
                          "act_three_springboot_webDev.md"
                      ],
                  },
              ]
      },
      // 第三章节：大数据
      {
          // 大章节目录
          text: "四、大数据篇",
          collapsible: true,
          children:
              [
                  // 第三章 第一节
                  {
                      prefix: "bigdata/Flink",
                      text: "1、Flink",
                      collapsible: true,
                      children: [
                      ],
                  },
                  // 第三章 第二节
                  {
                      prefix: "bigdata/spark",
                      text: "2、spark",
                      collapsible: true,
                      children: [
                      ],
                  }
              ]
      },
      // 第四章节: 容器云
      {
          // 大章节目录
          text: "五、云原生",
          collapsible: true,
          children:
              [
                  // 第四章 第一节
                  {
                      prefix: "ContainerCloud/docker/",
                      text: "1、Docker",
                      collapsible: true,
                      children: [
                          "act_one_docker_one.md",
                          "act_two_docker_two.md"
                      ],
                  },
                  // 第三章 第二节
                  {
                      prefix: "ContainerCloud/k8s/",
                      text: "2、K8S",
                      collapsible: true,
                      children: [
                          "act_one_k8s中负载均衡原理.md.md",
                          "act_none_pod异常状态排查.md",
                          "act_two_k8s基础学习.md"
                      ],
                  }
              ]
      },
      // 第五章节: 前端
      {
          text: "五、前端篇",
          collapsible: true,
          children:
              [
                  // 第五章 第一节
                  {
                      prefix: "backend/react/",
                      text: "1、React",
                      collapsible: true,
                      children: [
                          "act_one_reactIntroduction.md",
                          "act_two_componentCodding.md",
                          "act_three_ReactEvent.md",
                          "act_four_lifeCycle.md",
                          "act_five_scaffold.md",
                          "act_six_route.md",
                          "act_seven_ReactHightLevel_one.md",
                          "act_seven_ReactHightLevel_two.md",
                          "act_eight_ReactHook_one.md",
                          "act_eight_ReactHook_two.md"
                      ],
                  },
              ]
      },
  ],
    // "/interview": [
    //     {
    //         text: "一、K8S",
    //         collapsible: true,
    //         prefix: "k8s/",
    //         children:
    //             [
    //                 "act_one_k8s基础面经一.md",
    //                 "act-two-分布式锁.md"
    //             ]
    //     },
    // ]
});









// // 第三章节：架构设计篇
// {
//     // 大章节目录
//     text: "三、工程架构设计",
//         collapsible: true,
//     children:
//     [
//         // 第三章 第一节
//         {
//             prefix: "engineeringArchitectureDesign/",
//             text: "1、MVC架构设计",
//             collapsible: true,
//             children: [
//                 "first-mvcDesignArchitecture.md",
//                 "second-ddd-Concept-Theory.md"
//             ],
//         },
//         // 第三章 第二节
//         {
//             prefix: "engineeringArchitectureDesign/",
//             text: "2、MVC架构设计",
//             collapsible: true,
//             children: [
//                 "first-mvcDesignArchitecture.md",
//             ],
//         }
//     ]
// },
// // 第四章节: 框架设计和源码阅读
// {
//     // 大章节目录
//     text: "三、源码分析及框架设计",
//         collapsible: true,
//     children:
//     [
//         // 第四章 第一节
//         {
//             prefix: "frameDesignAndSourceCode/springSourceCode/",
//             text: "1、spring框架设计",
//             collapsible: true,
//             children: [
//                 "first-springIntroduction.md",
//             ],
//         },
//         // 第三章 第二节
//         {
//             prefix: "frameDesignAndSourceCode/mybatisSourceCode/",
//             text: "2、mybatis框架设计",
//             collapsible: true,
//             children: [
//                 "first-mybatisintroduction.md",
//             ],
//         }
//     ]
// },
// ]

