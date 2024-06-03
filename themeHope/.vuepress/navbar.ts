import { navbar } from "vuepress-theme-hope";

export default navbar([
  //   首页导航
  "/",
  {
    text: "导读",
    icon: "book",
    link: "/introduction/"
  },
  {
    text: "算法",
    // collapsible: true,
    icon: "pen-to-square",
    children: [
      {
        text: "算法专题",
        link: "/algorithm/algor/",
        // collapsible: true,
        icon: "pen-to-square",
      },
      {
        text: "数据结构专题",
        icon: "pen-to-square",
        link: "/algorithm/dataStructure/"
      },
    ],
  },
  //   源码专题
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
  {
    text: "架构专题",
    icon: "gaishu",
    link: "/frameDesignAndSourceCode/"
  },
  {
    text: "面试篇",
    icon: "gaishu",
    link: "/interview/"
  },
  {
    text: "基础归档",
    icon: "gaishu",
    link: "/home.md"
  },
  {
    text: "精选博文",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "苹果",
        icon: "pen-to-square",
        prefix: "javaBasic/",
        children: [
          { text: "苹果1", icon: "pen-to-square", link: "1" },
          { text: "苹果2", icon: "pen-to-square", link: "2" },
          "3",
          "4",
        ],
      },
      {
        text: "香蕉",
        icon: "pen-to-square",
        prefix: "javaCore/",
        children: [
          {
            text: "香蕉 1",
            icon: "pen-to-square",
            link: "1",
          },
          {
            text: "香蕉 2",
            icon: "pen-to-square",
            link: "2",
          },
          "3",
          "4",
        ],
      },
      { text: "樱桃", icon: "pen-to-square", link: "cherry" },
      { text: "火龙果", icon: "pen-to-square", link: "dragonfruit" },
      "tomato",
      "strawberry",
    ],
  },
  {
    text: "业务专题",
    icon: "gaishu",
    link: "/business/"
  },
  {
    text: "知识星球",
    icon: "gaishu",
    link: "/KnowledgePlanet/"
  },
  {
    text: "B站",
    icon: "gaishu",
    link: "/KnowledgePlanet/"
  },
  {
    text: "about",
    icon: "book",
    link: "intro.md",
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