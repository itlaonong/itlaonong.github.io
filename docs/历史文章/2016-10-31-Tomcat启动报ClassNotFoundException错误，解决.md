---
title: Tomcat启动报ClassNotFoundException错误，解决
date: 2016-10-31 13:59:45
category: 杂记
tags:
  - Tomcat
  - ClassNotFoundException
permalink: /pages/d9cd3d/
categories:
  - 历史文章
author:
  name: itlaonong
  link: https://github.com/itlaonong
---

今天把一个 Maven 管理的 web 项目 Update 后，启动 Tomcat（Eclipse 中）系统报错。错误提示 java.lang.ClassNotFoundException: ，显示是 spring 的 ContextLoaderListener 找不到。 之前也发生过，网上找了解决方案，不过忘记了，想想这次还是自己发一份，记一下。

# 错误原因：

工程部署时在 WEB-INF 文件夹下没有生成 lib 目录，正常情况下，会生成 lib 目录并把工程的所有依赖 jar 包都部署到该目录下。

# 解决方案：

1. 右键点击项目--选择 Properties。选择 Deployment Assembly,在右边点击 Add 按钮，在弹出的窗口中选择 Java Build Path Entries

2. 点击 Next，选择 Maven Dependencies

3. 点击 Finish，然后可以看到已经把 Maven Dependencies 添加到 Web 应用结构中了

操作完后，重新部署工程，不再报错了。工程 WEB-INF 目录下自动生成了 lib 目录，并且所有的依赖 jar 包也都已经部署进来。问题因此解决。

网上找的别人发布的原文地址：[https://my.oschina.net/selfdesign/blog/547345](https://my.oschina.net/selfdesign/blog/547345)
