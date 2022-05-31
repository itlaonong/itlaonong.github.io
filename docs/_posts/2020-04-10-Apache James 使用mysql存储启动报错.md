---
title: Apache James 使用mysql存储启动报错
date: 2020-04-10 14:13:52
tags: Apache
---

# Apache James 使用 mysql 存储启动报错 Specified key was too long; max key length is 3072 bytes

没事捣鼓自建 mail 服务，作为 java 开发，肯定想到了 java 实现。刚好 apache 就有开源的[James（Java Apache Mail Enterprise Server）](http://james.apache.org/index.html)。[下载](http://james.apache.org/download.cgi)下来准备试试。

目前最新版是 3.4.0 版本。

下载完成后网上找到[教程](https://blog.csdn.net/hjnth/article/details/82931569)进行配置。

因为针对 mysql 报错的问题。只记录数据源配置点。

<!-- more -->

## 修改数据源

修改 conf/james-database.properties 中

```
# Use derby as default
# database.driverClassName=org.apache.derby.jdbc.EmbeddedDriver
# database.url=jdbc:derby:../var/store/derby;create=true
# database.username=app
# database.password=app
database.driverClassName=com.mysql.jdbc.Driver
database.url=jdbc:mysql://127.0.0.1:3306/james?rewriteBatchedStatements=true&useUnicode=true&characterEncoding=utf8
database.username=james#账密自行修改即可
database.password=james

# Supported adapters are:
# DB2, DERBY, H2, HSQL, INFORMIX, MYSQL, ORACLE, POSTGRESQL, SQL_SERVER, SYBASE
# vendorAdapter.database=DERBY
vendorAdapter.database=MYSQL
```

因为教程中提示可能会报错，我提前在数据库中执行了下面脚本。

```sql
SET GLOBAL innodb_file_format = BARRACUDA;
SET GLOBAL innodb_large_prefix = ON;
```

## 报错

在 bin 目录下执行`run.bat`(win10)。

启动报错。

```
org.apache.openjpa.persistence.PersistenceException: Specified key was too long; max key length is 3072 bytes {stmnt 2076356118 CREATE TABLE JAMES_MAIL_REPOS (MAIL_REPO_NAME VARCHAR(1024) NOT NULL, PRIMARY KEY (MAIL_REPO_NAME)) ENGINE = innodb} [code=1071, state=42000]
```

## 分析

这个问题和教程中提到的类似，网上查找是 MySQL 主键索引长度不够。

找到很多资料后得知：mysql 默认索引长度最大长度是 767bytes，如果是[utf8 编码（MySQL 的 utf8 编码最长 3byte）](https://blog.csdn.net/wjxbj/article/details/84737812)。只能用 varchar(255)。开启`innodb_large_prefix=on`后索引长度最大长度是 3072bytes，如果是 utf8 编码。应该能用 varchar(1024)。而日志中的 sql 显示字段长度为 1024。理论上不应该报错。

## 解决

问题就在这编码上，按照上面的逻辑，字段长度乘以编码最大字节长度小于等于 3072 就可以。但是我使用的 utf8mb4 编码（MySQL 独有的，最长 4byte）。所以 varchar(1024)最长就是 4096>3074。我删除原来的数据库，以 utf8 重新创建，启动不再报错。

这里要吐槽一下，其实 uft8 编码字符理论上可以最多到 6 个字节长，通常 uft8 使用 1~4 字节为每个字符编码（utf8 是变长编码-霍夫曼编码）。但是 MySQL 最开始支持 utf8 的时候只做了最长 3 个字节（MySQL 中的 uft8）。后面为了兼容 4 个字节，又增加了 uft8mb4（旧版本没有）。所以其实 MySQL 中 utf8mb4 才是真正的 utf8。之前公司项目中为了支持 emoji 表情（4 字节 utf8 编码），了解过 MySQL 的这段编码故事，所以 MySQL 中喜欢使用 utf8mb4。结果就遇到了这个坑爹的问题。
