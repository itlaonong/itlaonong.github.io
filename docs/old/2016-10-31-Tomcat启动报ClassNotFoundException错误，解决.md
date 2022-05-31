---
title: Tomcat启动报ClassNotFoundException错误，解决
date: 2016-10-31 13:59:45
category: 杂记
tags: [Tomcat, ClassNotFoundException]
---

今天把一个Maven管理的web项目Update后，启动Tomcat（Eclipse中）系统报错。错误提示 java.lang.ClassNotFoundException: ，显示是spring的ContextLoaderListener找不到。 之前也发生过，网上找了解决方案，不过忘记了，想想这次还是自己发一份，记一下。 

# 错误原因：

工程部署时在WEB-INF文件夹下没有生成lib目录，正常情况下，会生成lib目录并把工程的所有依赖jar包都部署到该目录下。 

# 解决方案：

1. 右键点击项目--选择Properties。选择Deployment Assembly,在右边点击Add按钮，在弹出的窗口中选择Java Build Path Entries 
 
2. 点击Next，选择Maven Dependencies 
 
3. 点击Finish，然后可以看到已经把Maven Dependencies添加到Web应用结构中了 
 
操作完后，重新部署工程，不再报错了。工程WEB-INF目录下自动生成了lib目录，并且所有的依赖jar包也都已经部署进来。问题因此解决。 
 
网上找的别人发布的原文地址：[https://my.oschina.net/selfdesign/blog/547345](https://my.oschina.net/selfdesign/blog/547345)
