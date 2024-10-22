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

# 1、SpringMvc 基础一

在helloworld案例中，依赖只需要**引入一个springboot父项目依赖、一个指定场景模块的子项目依赖**，指定场景下将要使用的所有包就能自动导入到项目中。

每一个项目都有一个父依赖项目。父项目一般都是做依赖管理的，子项目以后继承父项目，不需要写依赖版本号。

