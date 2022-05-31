---
title: oracle查询not in的子查询结果存在null的时候查询不出结果
date: 2018-12-07 12:12:37
category: work
tags: oracle
---

# 问题：

明明子查询查询不到的数据，使用not in后竟然查不出来。

# 原因：

子查询的结果集还包含其他有null的值。

# 处理：

使用exists或者子查询过滤null值

