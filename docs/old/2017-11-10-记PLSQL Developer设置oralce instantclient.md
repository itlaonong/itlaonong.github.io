---
title: 记PLSQL Developer设置oralce instantclient 进行远程连接经历
date: 2017-11-10 19:55:41
category: database
tags: [PL SQL, Oracle]
---

相关软件：

1. PLSQL Developer 12(64bit)
1. oracle instantclient-basic-windows.x64-12.2.0.1.0

都可以去对应的官网上下载。

<!-- more -->

按照网络上博客的教程解压 instantclient-basic-windows.x64-12.2.0.1.0.zip 并配置相应的环境变量以及 PLSQL 设置，发现 PLSQL Developer 没有远程数据库的配置。并且直接点击连接会提示没有正确安装 oracle 客户端。

搜索类似问题，有博客提到 instantclient12_2 需要 vs2013 运行库支持，让我想起来 oracle 的下载页面确实有相关提示。下载运行库进行安装，还是没有远程数据库的配置，但是直接点击连接会报 oracle 的连接错误。这说明现在客户端已经安装正确。应该是相关配置有问题。

重新检查环境变量配置，发现 TNS_ADMIN 配置错了，重新配置，指定到 tnsnames.ora 所在目录。测试发现只要该目录下有 tnsnames.ora 文件即可，不一定非要 network/admin 目录。但是保险起见，还是设置成 network/admin 目录。并在该目录下放置 tnsnames.ora 文件，文件中配置自己的数据库地址信息。

重新打开 PLSQL，可以正常连接 oracle 数据库了。
