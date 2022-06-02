---
title: oracle查询not in的子查询结果存在null的时候查询不出结果
date: 2018-12-07 12:12:37
category: work
tags:
  - Oracle
permalink: /pages/055aef/
categories:
  - 历史文章
author:
  name: itlaonong
  link: https://github.com/itlaonong
---

# 问题：

明明子查询查询不到的数据，使用 not in 后竟然查不出来。

# 原因：

子查询的结果集还包含其他有 null 的值。

# 处理：

使用 exists 或者子查询过滤 null 值
