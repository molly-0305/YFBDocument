---
title: Windows 7
sidebar_position: 2
---
### 1、IIS配置
<p style={{marginLeft:"2em" ,fontSize:"20px" ,color:"red"}}>
注意：安装WEB查询统计，根据电脑系统的不同，IIS安装配置方法就不同，请按照相应电脑系统先配置好IIS配置，再安装“WEB查询统计”
</p>

<p style={{marginLeft:"2em" ,fontSize:"20px" ,color:"red"}}>
下面为 Windows 7 系统 IIS配置（Windows 7配置案例，Windows10\11同时适用）
</p>

### （1）设置Internet信息服务
<p style={{ marginLeft:"2em" ,fontSize:"20px"}}>
  1）打开“控制面板”---“程序”---“打开或关闭Windows功能”---“Internet信息服务”
</p> 
<img src="/img/softwareInstall/12.png" alt="步骤2" style={{ marginLeft: "4em"}} />

<p style={{ marginLeft:"2em" ,fontSize:"20px"}}>
  2）将Web管理工具和万维网服务二者进行勾选
</p> 
<img src="/img/softwareInstall/13.png" alt="步骤2" style={{ marginLeft: "4em"}} />

<p style={{ marginLeft:"2em" ,fontSize:"20px"}}>
  3）Web管理工具设置如下图所示
</p> 
<img src="/img/softwareInstall/14.png" alt="步骤2" style={{ marginLeft: "4em"}} />

<p style={{ marginLeft:"2em" ,fontSize:"20px"}}>
  4）在“万维网服务-安全性”中按照下图所示进行勾选
</p> 
<img src="/img/softwareInstall/15.png" alt="步骤2" style={{ marginLeft: "4em"}} />

<p style={{ marginLeft:"2em" ,fontSize:"20px"}}>
  5）“万维网服务-应用程序开发功能”设置如下
</p> 
<img src="/img/softwareInstall/16.png" alt="步骤2" style={{ marginLeft: "4em"}} />

### （2）设置Internet信息服务（IIS）管理器
<p style={{ marginLeft:"2em" ,fontSize:"20px"}}>
  1）控制面板---系统与安全---Windows工具---InternetInformation Services（IIS）管理器 ---“应用程序池” <br />
相应的应用程序池会出现在右边<br />
右键单击修改每个应用程序池，点击 “高级设置”修改
</p> 
<img src="/img/softwareInstall/17.png" alt="步骤2" style={{ marginLeft: "4em"}} />

<p style={{ marginLeft:"2em" ,fontSize:"20px"}}>
  2）在启用32位应用程序在拉菜单中选择“True”，点击确定
</p> 
<img src="/img/softwareInstall/18.png" alt="步骤2" style={{ marginLeft: "4em"}} />