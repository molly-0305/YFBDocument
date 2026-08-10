# 华为计费开通Telnet命令

首先输入打开CDR命令：telnet <span class="red">192.168.6.130（红字是输入华为eSpace网关IP地址）</span>  
<br />
连接成功，执行以下Telnet命令行：  
<br />
[.login    .] Login:>&emsp;<b>admin</b>  
<br />
[.password .] Password:>  &emsp;&emsp;  <span class="red">---（此处是密码，在命令行中是空白）</span>  
<br />
[.result   .] succeed  
<br />
[%eSpace U1911]><b>enable</b>  
<br />
[.password .] Password:> &emsp;&emsp; <span class="red">---（此处是密码，在命令行中是空白）</span>  
<br />
[.result   .] succeed  
<br />
[%eSpace U1911(config)]#config system billserver primaryip <span class="red">X.X.X.X</span> authtype noauth<span class="red">&emsp;&emsp;---（红字处填写的是本机IP地址）</span>
```
config system billserver primaryip X.X.X.X authtype noauth
```
<br />
====  Command executed success !  ====  
<br />
[%eSpace U1911(config)]#config createbill switch on exportinterofficebill yes 
```
config createbill switch on exportinterofficebill yes
```
<br />
Createbill switch turn on! Please connect bill terminal!  
<br />
====  Command executed success !  ====  
<br />

[%eSpace U1911(config)]#config ccm outcallwithlocalright flag on  
```
config ccm outcallwithlocalright flag on
```
<br />

====  Command executed success !  ====  
<br />

[%eSpace U1911(config)]#stop sntpserver  
```
stop sntpserver
```
<br />

====  Command executed success !  ====  
<br />
[%eSpace U1911(config)]#start sntpserver  
```
start sntpserver
```
<br />
====  Command executed success !  ====  
<br />
[%eSpace U1911(config)]#save  
```
save
```
<br />
 This command is being executed in the background, please wait for a moment.  
 <br />
====  Command executed success !  ====  
<br />
Saving data.bin to flash in the background finished!  
<br />
