---
title: PowerDesigner笔记
date: 2018-05-14 20:03:08
category: Java
tags: 'PowerDesigner'
---
# 使用PowerDesigner逆向工程

今天准备把之前做的一个小项目的数据模型整理一下，就想到了用PowerDesigner。安装完成之后，连接数据库，测试连接,提示报错。主要遇到2个错误，记一下解决方法。

<!-- more -->

## 1. Could not Initialize JavaVM!

百度看到有人说是用了64位的jdk，才想到安装的PowerDesigner 16.5是32位的。查看解决办法就是使用32位的jdk。我猜想如果PowerDesigner是64位的话，使用64位jdk也应该没问题，下次有机会试一下。

## 2. Non SQL Error : Could not load class com.mysql.jdbc.Driver

这个问题，以前第一次使用这个功能就遇到过，是找不到MySQL的jdbc驱动，只要将驱动jar的路径加入到系统的环境变量classpath就好了。

## 总结

因为已经安装jdk，再次安装新的jdk会让系统的配置比较乱，特别是环境变量已经配置好的情况下，为了使用PowerDesigner修改环境变量总是觉得不太好。在网上找到个人比较喜欢的方法。

在PowerDesigner的安装目录中新建一个bat文件，写入如下脚本，具体路径根据个人电脑配置决定。

```shell
Set JAVA_HOME=D:\Software\Java_x86\jdk1.8.0_144
Set CLASSPATH=C:\Users\DinGZG\.m2\repository\mysql\mysql-connector-java\5.1.40\mysql-connector-java-5.1.40.jar
pdshell16.exe
```

需要使用连接数据库的时候就通过脚本启动软件即可。