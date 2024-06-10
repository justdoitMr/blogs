import { sidebar } from "vuepress-theme-hope";

//将其他文件下的内容导入此文件
export const sidebarConfig = sidebar({
    //   ------------------------------------------------导航文档导入 start-----------------------------------------------------
    //  导读专题
    "/introduction/": [
        "readme.md"
    ],
    // 算法专题
    "/algorithm/algor/": [
        "README.md",
        "basicDataStructure.md"
    ],
    "/algorithm/dataStructure/": [
        "README.md"
    ],
    // 知识星球
    "/KnowledgePlanet/": [
        "README.md"
    ],
    // 面试
    "/interview/": [
        "README.md",
        "java.md"
    ],
    // 业务
    "/business/": [
        "README.md",
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
    ],
    // mybatis源码
    "/frameDesignAndSourceCode/mybatisSourceCode/" :[
        "first-mybatisintroduction.md",
    ],
    // 架构专题/frameDesignAndSourceCode/
    "/engineeringArchitectureDesign/" :[
        "first-mvcDesignArchitecture.md",
        "second-mvcDesignArchitecture.md"
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
                          "README.md",
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
                      prefix: "SpringPrinciple/",
                      text: "1、Spring",
                      collapsible: true,
                      children: [
                          "SpringAopPrinciple.md",
                          "SpringAnnotation.md",
                          "SpringAopBasic.md"
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
                          "README.md",
                      ],
                  },
                  // 第三章 第二节
                  {
                      prefix: "bigdata/spark",
                      text: "2、spark",
                      collapsible: true,
                      children: [
                          "README.md",
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
                          "README.md",
                      ],
                  },
                  // 第三章 第二节
                  {
                      prefix: "ContainerCloud/k8s/",
                      text: "2、K8S",
                      collapsible: true,
                      children: [
                          "README.md",
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
                          // "act_one_reactIntroduction.md",
                          // "act_two_componentCodding.md",
                      ],
                  },
              ]
      },
  ]
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
//                 "second-mvcDesignArchitecture.md"
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

