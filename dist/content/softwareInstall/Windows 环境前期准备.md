# Windows 环境前期准备

## 一、防火墙设置

&emsp;&emsp;打开控制面板---系统和安全---Windows Defender 防火墙---启用或关闭Windows Defender 防火墙

<img src="/YFBDocument/content/assets/img/softwareInstall/8.png" alt="" />


## 二、用户账户设置
### 1、更改用户账户设置

控制面板---用户账户---用户账户---更改用户账户控制设置修改为从不通知，点击确定

<img src="/YFBDocument/content/assets/img/softwareInstall/9.png" alt=""/>


### 2、关闭输入用户名密码权限
&emsp;&emsp;打开“运行”---输入“Control Userpasswords2”进入“用户账户”页面，“要使用本计算机，用户输入用户名和密码”默认是勾选的，把勾选去掉。<br />
&emsp;&emsp;点击“应用”---输入服务器登录密码---确定保存即可，举例如下：

<img src="/YFBDocument/content/assets/img/softwareInstall/10.png" alt=""/>
<br />

&emsp;<span class="red">注意：在有些版本的操作系统中可能出现User Account没有复选框的情况，如下图所示：</span>
<img src="/YFBDocument/content/assets/img/softwareInstall/37.png" alt=""/>
<br /><br /><br />



打开注册表并对下面的路径中的数据进行修改：  
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\WindowsNT\CurrentVersion\PasswordLess\Device]  
"DevicePasswordLessBuildVersion"=dword:00000000  
手动修改注册表“dword:00000002”的值为“0”
<img src="/YFBDocument/content/assets/img/softwareInstall/38.png" alt=""/>

<br /><br /><br />
修改后再次打开Control Userpasswords2，复选框就会出现了，如下图所示：
<img src="/YFBDocument/content/assets/img/softwareInstall/39.png" alt=""/>

## 三、操作系统设置

为了使计费软件正常运行，建议服务器系统配置按照下面的要求配置：<br />
&emsp;&emsp;目的是防止服务器因突然断电或自动重启等其他原因重启之后不输入密码进不到系统等原因，导致计费服务器不能正常运行


### 1、禁止Windows 更新

&emsp;&emsp;打开服务把Windows更新服务禁止，“恢复”设置成无操作<br />
&emsp;&emsp;举例截图如下：

<img src="/YFBDocument/content/assets/img/softwareInstall/11.png" alt=""/>

### 2、排查系统升级程序
查看下系统程序里有没有微软易升等软件，要是有卸载掉


### 3、服务器电源休眠状态
服务器电源休眠状态改成从不休眠
