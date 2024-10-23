import { navbar } from "vuepress-theme-hope";

export default navbar([
  //   首页导航
  "/",
  {
    text: "导读",
    icon: "book",
    link: "/introduction/introducted.md"
  },
  //   算法专题导航
  {
    text: "算法",
    // collapsible: true,
    icon: "pen-to-square",
    children: [
      {
        text: "算法专题",
        link: "/algorithm/algor/",
        icon: "pen-to-square",
      },
      {
        text: "数据结构专题",
        icon: "pen-to-square",
        link: "/algorithm/dataStructure/",
      },
    ],
  },
  //   设计模式导航
  {
    text: "设计模式",
    // collapsible: true,
    icon: "pen-to-square",
    children: [
      {
        text: "设计原则",
        link: "/designpattern/designPrinciple/",
        // collapsible: true,
        icon: "pen-to-square",
      },
      {
        text: "创建型",
        icon: "pen-to-square",
        link: "/designpattern/creational/"
      },
      {
        text: "行为型",
        icon: "pen-to-square",
        link: "/designpattern/Behavior/"
      },
      {
        text: "结构型",
        icon: "pen-to-square",
        link: "/designpattern/structural/"
      },
    ],
  },
  //   源码专题导航
  {
    text: "源码",
    // collapsible: true,
    icon: "pen-to-square",
    children: [
      {
        text: "Spring源码实现",
        link: "/frameDesignAndSourceCode/springSourceCode/",
        // collapsible: true,
        icon: "pen-to-square",
      },
      {
        text: "Mybatis框架实现",
        icon: "pen-to-square",
        link: "/frameDesignAndSourceCode/mybatisSourceCode/"
      },
    ],
  },
  //   架构专题导航
  {
    text: "架构专题",
    icon: "pen-to-square",
    children: [
      {
        text: "MVC和DDD",
        link: "/engineeringArchitectureDesign/",
        // collapsible: true,
        icon: "pen-to-square",
      },
    ],
  },
  //   精选文章导航
  {
    text: "精选博文",
    icon: "pen-to-square",
    prefix: "/excellentBook/",
    children: [
      {
        text: "业务知识",
        icon: "pen-to-square",
        prefix: "/excellentBook/business/",
        children: [
          { text: "金融业务", icon: "pen-to-square", link: "/excellentBook/business/" },
        ],
      },
      {
        text: "项目经验",
        icon: "pen-to-square",
        prefix: "/excellentBook/project/",
        children: [
          {
            text: "K8S部署项目",
            icon: "pen-to-square",
            link: "/excellentBook/project/",
          },
        ],
      },
      { text: "通用数据设计", icon: "pen-to-square", link: "" },
      { text: "业务场景设计", icon: "pen-to-square", link: "scence.md" },
    ],
  },
  //   文章归档导航
  {
    text: "基础归档",
    icon: "gaishu",
    link: "/home.md"
  },
  //   面试导航
  {
    text: "面试篇",
    icon: "gaishu",
    children: [
      {
        text: "技术面经",
        link: "/interview/TechnicalInterview/",
        icon: "pen-to-square",
      },
      {
        text: "场景题",
        icon: "pen-to-square",
        link: "/interview/Scenequestion/",
      },
    ],
  },
  // 知识星球导航
  {
    text: "知识星球",
    icon: "gaishu",
    link: "/KnowledgePlanet/"
  },
  //   B站导航
  {
    text: "B站",
    icon: "gaishu",
    link: "/video/"
  },
  //   关于导航
  {
    text: "关于我",
    icon: "book",
    link: "/about/",
  },
]);



//
// {
//   text: "博文",
//       icon: "pen-to-square",
//     prefix: "/posts/",
//     children: [
//   {
//     text: "苹果",
//     icon: "pen-to-square",
//     prefix: "javaBasic/",
//     children: [
//       { text: "苹果1", icon: "pen-to-square", link: "1" },
//       { text: "苹果2", icon: "pen-to-square", link: "2" },
//       "3",
//       "4",
//     ],
//   },
//   {
//     text: "香蕉",
//     icon: "pen-to-square",
//     prefix: "javaCore/",
//     children: [
//       {
//         text: "香蕉 1",
//         icon: "pen-to-square",
//         link: "1",
//       },
//       {
//         text: "香蕉 2",
//         icon: "pen-to-square",
//         link: "2",
//       },
//       "3",
//       "4",
//     ],
//   },
//   { text: "樱桃", icon: "pen-to-square", link: "cherry" },
//   { text: "火龙果", icon: "pen-to-square", link: "dragonfruit" },
//   "tomato",
//   "strawberry",
// ],
// },