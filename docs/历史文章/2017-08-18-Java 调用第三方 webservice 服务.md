---
title: Java 调用第三方 webservice 服务
date: 2017-08-18 15:55:27
category: Java
tags:
  - Java
  - webservice
permalink: /pages/df44aa/
categories:
  - 历史文章
author:
  name: itlaonong
  link: https://github.com/itlaonong
---

# 原由

公司要求我们的系统要和第三方系统同步数据。跟第三方沟通之后发现对方提供的是 webservice 接口，作为没有接触过 webservice 的小白，表示有点慌。

<!-- more -->

下面是请求接口 "http://www.xxxx.com/webservice/service/baseInfo?wsdl" 的 XML 结果。

```xml
<?xml version='1.0' encoding='UTF-8'?>
<wsdl:definitions xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                  xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"
                  xmlns:tns="http://webservice.baseInfo.webservice.xxxx.com/"
                  xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
                  xmlns:ns1="http://schemas.xmlsoap.org/soap/http"
                  name="BaseInfoWebServiceImplService"
                  targetNamespace="http://webservice.baseInfo.webservice.xxxx.com/">
    <wsdl:types>
        <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
                   xmlns:tns="http://webservice.baseInfo.webservice.xxxx.com/"
                   elementFormDefault="unqualified"
                   targetNamespace="http://webservice.baseInfo.webservice.xxxx.com/"
                   version="1.0">
            <xs:element name="getOrgListByCode" type="tns:getOrgListByCode"/>
            <xs:element name="getOrgListByCodeResponse" type="tns:getOrgListByCodeResponse"/>
            <xs:element name="getOrgListByTime" type="tns:getOrgListByTime"/>
            <xs:element name="getOrgListByTimeResponse" type="tns:getOrgListByTimeResponse"/>
            <xs:element name="getUserListByTime" type="tns:getUserListByTime"/>
            <xs:element name="getUserListByTimeResponse" type="tns:getUserListByTimeResponse"/>
            <xs:complexType name="getOrgListByCode">
                <xs:sequence>
                    <xs:element minOccurs="0" name="arg0" type="xs:string"/>
                    <xs:element minOccurs="0" name="arg1" type="xs:string"/>
                    <xs:element minOccurs="0" name="arg2" type="xs:string"/>
                    <xs:element minOccurs="0" name="arg3" type="xs:string"/>
                    <xs:element minOccurs="0" name="arg4" type="xs:string"/>
                    <xs:element minOccurs="0" name="arg5" type="xs:string"/>
                </xs:sequence>
            </xs:complexType>
            <xs:complexType name="getOrgListByCodeResponse">
                <xs:sequence>
                    <xs:element minOccurs="0" name="return" type="xs:string"/>
                </xs:sequence>
            </xs:complexType>
            <xs:complexType name="getUserListByTime">
                <xs:sequence>
                    <xs:element minOccurs="0" name="arg0" type="xs:string"/>
                    <xs:element minOccurs="0" name="arg1" type="xs:string"/>
                    <xs:element minOccurs="0" name="arg2" type="xs:string"/>
                    <xs:element minOccurs="0" name="arg3" type="xs:string"/>
                    <xs:element minOccurs="0" name="arg4" type="xs:string"/>
                    <xs:element minOccurs="0" name="arg5" type="xs:string"/>
                    <xs:element minOccurs="0" name="arg6" type="xs:string"/>
                    <xs:element minOccurs="0" name="arg7" type="xs:string"/>
                </xs:sequence>
            </xs:complexType>
            <xs:complexType name="getUserListByTimeResponse">
                <xs:sequence>
                    <xs:element minOccurs="0" name="return" type="xs:string"/>
                </xs:sequence>
            </xs:complexType>
            <xs:complexType name="getOrgListByTime">
                <xs:sequence>
                    <xs:element minOccurs="0" name="arg0" type="xs:string"/>
                    <xs:element minOccurs="0" name="arg1" type="xs:string"/>
                    <xs:element minOccurs="0" name="arg2" type="xs:string"/>
                    <xs:element minOccurs="0" name="arg3" type="xs:string"/>
                    <xs:element minOccurs="0" name="arg4" type="xs:string"/>
                    <xs:element minOccurs="0" name="arg5" type="xs:string"/>
                    <xs:element minOccurs="0" name="arg6" type="xs:string"/>
                    <xs:element minOccurs="0" name="arg7" type="xs:string"/>
                </xs:sequence>
            </xs:complexType>
            <xs:complexType name="getOrgListByTimeResponse">
                <xs:sequence>
                    <xs:element minOccurs="0" name="return" type="xs:string"/>
                </xs:sequence>
            </xs:complexType>
        </xs:schema>
    </wsdl:types>
    <wsdl:message name="getOrgListByTime">
        <wsdl:part element="tns:getOrgListByTime" name="parameters"/>
    </wsdl:message>
    <wsdl:message name="getOrgListByCodeResponse">
        <wsdl:part element="tns:getOrgListByCodeResponse" name="parameters"/>
    </wsdl:message>
    <wsdl:message name="getOrgListByCode">
        <wsdl:part element="tns:getOrgListByCode" name="parameters"/>
    </wsdl:message>
    <wsdl:message name="getUserListByTimeResponse">
        <wsdl:part element="tns:getUserListByTimeResponse" name="parameters"/>
    </wsdl:message>
    <wsdl:message name="getUserListByTime">
        <wsdl:part element="tns:getUserListByTime" name="parameters"/>
    </wsdl:message>
    <wsdl:message name="getOrgListByTimeResponse">
        <wsdl:part element="tns:getOrgListByTimeResponse" name="parameters"/>
    </wsdl:message>
    <wsdl:portType name="BaseInfoWebService">
        <wsdl:operation name="getOrgListByCode">
            <wsdl:input message="tns:getOrgListByCode" name="getOrgListByCode"/>
            <wsdl:output message="tns:getOrgListByCodeResponse" name="getOrgListByCodeResponse"/>
        </wsdl:operation>
        <wsdl:operation name="getUserListByTime">
            <wsdl:input message="tns:getUserListByTime" name="getUserListByTime"/>
            <wsdl:output message="tns:getUserListByTimeResponse" name="getUserListByTimeResponse"/>
        </wsdl:operation>
        <wsdl:operation name="getOrgListByTime">
            <wsdl:input message="tns:getOrgListByTime" name="getOrgListByTime"/>
            <wsdl:output message="tns:getOrgListByTimeResponse" name="getOrgListByTimeResponse"/>
        </wsdl:operation>
    </wsdl:portType>
    <wsdl:binding name="BaseInfoWebServiceImplServiceSoapBinding" type="tns:BaseInfoWebService">
        <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
        <wsdl:operation name="getOrgListByCode">
            <soap:operation soapAction="" style="document"/>
            <wsdl:input name="getOrgListByCode">
                <soap:body use="literal"/>
            </wsdl:input>
            <wsdl:output name="getOrgListByCodeResponse">
                <soap:body use="literal"/>
            </wsdl:output>
        </wsdl:operation>
        <wsdl:operation name="getUserListByTime">
            <soap:operation soapAction="" style="document"/>
            <wsdl:input name="getUserListByTime">
                <soap:body use="literal"/>
            </wsdl:input>
            <wsdl:output name="getUserListByTimeResponse">
                <soap:body use="literal"/>
            </wsdl:output>
        </wsdl:operation>
        <wsdl:operation name="getOrgListByTime">
            <soap:operation soapAction="" style="document"/>
            <wsdl:input name="getOrgListByTime">
                <soap:body use="literal"/>
            </wsdl:input>
            <wsdl:output name="getOrgListByTimeResponse">
                <soap:body use="literal"/>
            </wsdl:output>
        </wsdl:operation>
    </wsdl:binding>
    <wsdl:service name="BaseInfoWebServiceImplService">
        <wsdl:port binding="tns:BaseInfoWebServiceImplServiceSoapBinding" name="BaseInfoWebServiceImplPort">
            <soap:address location="http://www.xxxx.com/webservice/services/baseInfo"/>
        </wsdl:port>
    </wsdl:service>
</wsdl:definitions>
```

> 注：因为涉及客户的具体信息，接口以及 XML 中 location、schema 等地址是假的。

# 过程

## axis2

遇到不会的东西当然是上网搜索找资料了，找了一个博客看了一下，使用 axis2 开发 webservice 客户端代码，但是当我按照博客的教程引入了依赖写好 demo 代码测试，一直报错。这个方法没成功，也没详细了解，就不赘述了。因为搜索的时候看到还有别的方式，所以还是继续找资料。

## wsimport

这次是用 Java 自带的 wsimport 工具分析 webservice 来生成代码，将 webservice 转化成 Java 服务来直接调用。

wsimport.exe 文件在 JDK 的 bin 目录下，可以在这个目录下直接启动命令行，输入命令

```bash
wsimport -keep -p com.loanon.client.wsimport http://www.xxxx.com/webservice/service/baseInfo?wsdl
```

就会在 bin 目录下按照包名路径生成代码。

![images](/uploads/java-webservice-wsimport1.PNG)

![images](/uploads/java-webservice-wsimport2.PNG)

这里简单说一下 wsimport 的参数

```bash
-keep //在生成class文件，或者jar包时，同时保留java源文件
-p <pkg> //指定生成文件的包结构
```

所以上面的文件夹里面会有 .java 和 .class 两种文件。有了这些文件可以直接将 class 文件打成 jar 包作为依赖引入到项目中。也可以把 .java 源码放到项目中。我选择的是第二种。

我先写了一个单机的 demo 进行测试。其实第一次看到这些生成的代码是不知所措的，网上找到了的博客中，别人的描述和我生成的代码根本不一样，可以说没有联系。也许是 Java 版本的原因，也许是 webservice 接口差异的原因。看别人写的 main 方法中调用代码的方式在我的代码中没有办法做到。于是就点开源码挨个查看。终于有点头绪。

## HttpConnection

实在没办法了。按道理来说使用 wsimport 工具已经是最简单的方法了，而且写的 demo 可以运行，但是放到公司项目中就报错（Expection 报的是 XML Namespace 之类的，具体原因我没有去找，要是有类似问题知道原因 可以告知讨论一下）。

不过现在我已经对 webservice 有了一些了解。知道它就是一个 http 请求。只是需要按照指定的格式来传递数据（XML 报文）。通过 webservice 工具和 Fiddler 已经抓取了这个请求的报文，是一个 xml。所以我决定自己直接通过 Java 的 http 请求发送报文来请求对于数据。这次可以成功返回数据，只是返回的数据还是 xml，需要自己解析。
