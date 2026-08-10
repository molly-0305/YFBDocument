# MySQL转SQLServer

## 一、ODBC驱动

### 1、下载ODBC驱动
<a href="/YFBDocument/content/assets/updateSoftware/Other/mysql-connector-odbc-9.4.0-winx64.zip" download="mysql-connector-odbc-9.4.0-winx64.zip">
<p style="color:#2e8555">mysql-connector-odbc-9.4.0-winx64.zip</p>
</a>


### 2、安装ODBC驱动
（1）弹出安装界面，直接点击"Next"
<img src="/YFBDocument/content/assets/img/softwareInstall/WindowsOther/2/1.png" alt=""/><br /><br /> <br />  

（2）点击"我同意"，之后直接下一步即可
<img src="/YFBDocument/content/assets/img/softwareInstall/WindowsOther/2/2.png" alt=""/><br /><br /> <br />  

（3）选择"Custom"自定义安装方式，点击"Next"进行下一步
<img src="/YFBDocument/content/assets/img/softwareInstall/WindowsOther/2/3.png" alt=""/><br /><br /> <br />  

（4）选择好安装位置后，点击"Next"进行下一步
<img src="/YFBDocument/content/assets/img/softwareInstall/WindowsOther/2/4.png" alt=""/><br /><br /> <br />  

（5）此界面为安装成功
<img src="/YFBDocument/content/assets/img/softwareInstall/WindowsOther/2/5.png" alt=""/><br />

### 2、配置ODBC数据源
（1）从控制面板-管理工具，打开你的 数据源(ODBC)，根据系统架构选择
<img src="/YFBDocument/content/assets/img/softwareInstall/WindowsOther/2/6.png" alt=""/><br /><br /> <br />  

（2）根据以下图片添加相应驱动信息
<img src="/YFBDocument/content/assets/img/softwareInstall/WindowsOther/2/7.png" alt=""/><br /><br /> <br />  

（3）完成后会出现MySQL 链接对话框，添加你的 MySQL 数据库账号信息，并确认"root"账号是否有全部的权限，如果你安装MySQL 没有修改的话， 不要改 3306这个端口号。  
如下图所示：
<img src="/YFBDocument/content/assets/img/softwareInstall/WindowsOther/2/8.png" alt=""/><br /><br /> <br /> 

（4）测试成功后，保存即可
<img src="/YFBDocument/content/assets/img/softwareInstall/WindowsOther/2/9.png" alt=""/><br />


## 二、SSMA迁移助手

### 1、下载SSMA迁移助手
<a href="/YFBDocument/content/assets/updateSoftware/Other/SSMAforMySQL_10.4.25315.zip" download="SSMAforMySQL_10.4.25315.zip">
<p style="color:#2e8555">SSMAforMySQL_10.4.25315.zip</p>
</a>


### 2、软件主界面
<img src="/YFBDocument/content/assets/img/softwareInstall/WindowsOther/2/10.png" alt=""/><br /><br /> <br /> 

### 3、迁移步骤

（1）新建Project
<img src="/YFBDocument/content/assets/img/softwareInstall/WindowsOther/2/11.png" alt=""/><br /><br /> <br /> 


（2）连接MySQL和SQL Server
<img src="/YFBDocument/content/assets/img/softwareInstall/WindowsOther/2/12.png" alt=""/><br />
<img src="/YFBDocument/content/assets/img/softwareInstall/WindowsOther/2/13.png" alt=""/><br /><br /> <br /> 

（3）生成迁移报告
<img src="/YFBDocument/content/assets/img/softwareInstall/WindowsOther/2/14.png" alt=""/><br />
<img src="/YFBDocument/content/assets/img/softwareInstall/WindowsOther/2/15.png" alt=""/><br /><br /> <br /> 

（4）在源数据库进行Convert Schema  
这步操作之后将会在目的数据库看到和源数据库同名的数据库，但是没有任何表
<img src="/YFBDocument/content/assets/img/softwareInstall/WindowsOther/2/16.png" alt=""/><br /><br /> <br /> 

（5）在目的数据库同步表结构  
这步操作之后，可以在目的数据库看到所有的表结构（如果全部成功的话）
<img src="/YFBDocument/content/assets/img/softwareInstall/WindowsOther/2/17.png" alt=""/><br /><br /> <br /> 

（6）进行数据迁移  
这步操作将完成数据表记录的迁移
<img src="/YFBDocument/content/assets/img/softwareInstall/WindowsOther/2/18.png" alt=""/><br />
<img src="/YFBDocument/content/assets/img/softwareInstall/WindowsOther/2/19.png" alt=""/><br />
