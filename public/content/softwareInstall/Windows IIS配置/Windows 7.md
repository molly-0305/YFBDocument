# Windows 7

// import NoDependencyDownload from '../../../src/components/NoDependencyDownload';
// import WordWithImagesDownload from '../../../src/components/WordWithImagesDownload';














### 1、IIS配置
<span class="red">
注意：安装WEB查询统计，根据电脑系统的不同，IIS安装配置方法就不同，请按照相应电脑系统先配置好IIS配置，再安装“WEB查询统计”
</span>

<span class="red">
&emsp;&emsp;下面为 Windows 7 系统 IIS配置（Windows 7配置案例，Windows10\11同时适用）
</span>

### （1）设置Internet信息服务
  1）打开“控制面板”---“程序”---“打开或关闭Windows功能”---“Internet信息服务”
<img src="/YFBDocument/content/assets/img/softwareInstall/12.png" alt=""/>
<br /><br /><br />

  2）将Web管理工具和万维网服务二者进行勾选
<img src="/YFBDocument/content/assets/img/softwareInstall/13.png" alt=""/>
<br /><br /><br />

  3）Web管理工具设置如下图所示
<img src="/YFBDocument/content/assets/img/softwareInstall/14.png" alt=""/>
<br /><br /><br />

  4）在“万维网服务-安全性”中按照下图所示进行勾选
<img src="/YFBDocument/content/assets/img/softwareInstall/15.png" alt=""/>
<br /><br /><br />

  5）“万维网服务-应用程序开发功能”设置如下
<img src="/YFBDocument/content/assets/img/softwareInstall/16.png" alt=""/>

### （2）设置Internet信息服务（IIS）管理器

  1）控制面板---系统与安全---Windows工具---InternetInformation Services（IIS）管理器 ---“应用程序池” <br />
 &emsp;&emsp;相应的应用程序池会出现在右边，右键单击修改每个应用程序池，点击 “高级设置”修改
<img src="/YFBDocument/content/assets/img/softwareInstall/17.png" alt=""/>
<br /><br /><br />

  2）在启用32位应用程序在拉菜单中选择“True”，点击确定
<img src="/YFBDocument/content/assets/img/softwareInstall/18.png" alt=""/>
