# Windows 2008

### 1、程序

  点击“开始-控制面板”后显示界面如下图所示
<img src="/YFBDocument/content/assets/img/softwareInstall/IIS/24.png" alt=""/>

### 2、角色

  &emsp;点击“程序—打开或关闭Windows功能”,点击左边菜单栏“角色”调出“角色”界面，如下图所示，接着点击“添加角色”，弹出“添加角色向导”
<img src="/YFBDocument/content/assets/img/softwareInstall/IIS/25.png" alt=""/>

### 3、角色添加

  接着点击“添加角色”，弹出“添加角色向导”
<img src="/YFBDocument/content/assets/img/softwareInstall/IIS/26.png" alt=""/>

### 4、添加IIS

  点击“下一步”进入服务器角色选项
<img src="/YFBDocument/content/assets/img/softwareInstall/IIS/27.png" alt=""/>

### 5、勾选内容

  &emsp;接下来，会出现IIS需要安装的一些组件，因为我们的WEB服务端，使用ASP程序，所以我们必须勾选“应用程序开发”和安全性下面的“基本身份验证”和“windows身份验证”也勾选上，下图红色部分都是默认不勾选的。
<img src="/YFBDocument/content/assets/img/softwareInstall/IIS/28.png" alt=""/>

### 6、添加完成

  &emsp;然后点“下一步”，再点击“安装”，等待安装完成。安装完后，就可以在“服务器管理器—角色”中看到WEB服务器（IIS）
<img src="/YFBDocument/content/assets/img/softwareInstall/IIS/29.png" alt=""/>
