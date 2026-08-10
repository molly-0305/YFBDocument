---
title: 计费Config说明
sidebar_position: 1
---# 计费Config说明

<style>
  .config-row {
    transition: all 0.3s ease;
  }
  .config-row:target {
    background-color: #fff3cd !important;
    box-shadow: 0 0 10px rgba(255, 193, 7, 0.5);
    border-radius: 4px;
    animation: highlight-pulse 1.5s ease;
  }
  @keyframes highlight-pulse {
    0% { background-color: #fff3cd; }
    50% { background-color: #ffe69c; }
    100% { background-color: #fff3cd; }
  }
  .box {
    padding: 10px 0;
  }
  .box ul {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 6px 20px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .box li {
    margin: 0;
    break-inside: avoid;
    overflow-wrap: anywhere;
  }
  .scroll-margin-top {
    scroll-margin-top: calc(50vh - 100px);
    scroll-margin-bottom: calc(50vh - 100px);
  }
  @media (max-width: 1100px) {
    .box ul { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  }
  @media (max-width: 900px) {
    .box ul { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }
  @media (max-width: 640px) {
    .box ul { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  .markdown > table {
    display: table;
    width: 100% !important;
    max-width: 1200px;
    margin: 0 auto;
    table-layout: fixed;
  }
  .markdown > table td:first-child,
  .markdown > table th:first-child {
    width: 20%;
    overflow-wrap: anywhere;
    word-break: break-word;
  }
  .markdown > table td:nth-child(2),
  .markdown > table th:nth-child(2) {
    width: 35%;
  }
  .markdown > table td:last-child,
  .markdown > table th:last-child {
    width: 45%;
  }
</style>

### 快捷跳转  
<div class="box">
<ul>
  <li><a href="#1-row">1</a></li>
  <li><a href="#2-row">2</a></li>
  <li><a href="#3-row">3</a></li>
  <li><a href="#AppKey-row">AppKey</a></li>
  <li><a href="#AttendantNum-row">AttendantNum</a></li>
  <li><a href="#AuthAPIURL-row">AuthAPIURL</a></li>
  <li><a href="#AuthorizationCode-row">AuthorizationCode</a></li>
  <li><a href="#AutoHangUpJX-row">AutoHangUpJX</a></li>
  <li><a href="#AutoHangUpLD-row">AutoHangUpLD</a></li>
  <li><a href="#AutoHangUpLY-row">AutoHangUpLY</a></li>
  <li><a href="#AutomaticLogin-row">AutomaticLogin</a></li>
  <li><a href="#avayaCutOutCount-row">avayaCutOutCount</a></li>
  <li><a href="#BeepDuration-row">BeepDuration</a></li>
  <li><a href="#BeepPath-row">BeepPath</a></li>
  <li><a href="#BeepType-row">BeepType</a></li>
  <li><a href="#BillExtension-row">BillExtension</a></li>
  <li><a href="#BlackListSleep-row">BlackListSleep</a></li>
  <li><a href="#BlackListVoice-row">BlackListVoice</a></li>
  <li><a href="#CiscoVersion-row">CiscoVersion</a></li>
  <li><a href="#comingnum-row">comingnum</a></li>
  <li><a href="#CommunicationOne-row">CommunicationOne</a></li>
  <li><a href="#CommunicationTwo-row">CommunicationTwo</a></li>
  <li><a href="#ConnectionType-row">ConnectionType</a></li>
  <li><a href="#Cookie-row">Cookie</a></li>
  <li><a href="#CTIIpAddress-row">CTIIpAddress</a></li>
  <li><a href="#DataBaseIP-row">DataBaseIP</a></li>
  <li><a href="#DataBaseName-row">DataBaseName</a></li>
  <li><a href="#DataBasePassword-row">DataBasePassword</a></li>
  <li><a href="#DataBaseUser-row">DataBaseUser</a></li>
  <li><a href="#DataType-row">DataType</a></li>
  <li><a href="#DefaultCallOutNum-row">DefaultCallOutNum</a></li>
  <li><a href="#destDeviceName-row">destDeviceName</a></li>
  <li><a href="#ECIPAddressPort-row">ECIPAddressPort</a></li>
  <li><a href="#ECPassWord-row">ECPassWord</a></li>
  <li><a href="#ECUserName-row">ECUserName</a></li>
  <li><a href="#ECVersionNumber-row">ECVersionNumber</a></li>
  <li><a href="#employeenumberlength-row">employeenumberlength</a></li>
  <li><a href="#employeepasswordlength-row">employeepasswordlength</a></li>
  <li><a href="#EncryptionCode-row">EncryptionCode</a></li>
  <li><a href="#ExtensionBits-row">ExtensionBits</a></li>
  <li><a href="#ExtensionConversion-row">ExtensionConversion</a></li>
  <li><a href="#ExtensionFilterNum-row">ExtensionFilterNum</a></li>
  <li><a href="#FastCallBill-row">FastCallBill</a></li>
  <li><a href="#FTMNBFJHN-row">FTMNBFJHN</a></li>
  <li><a href="#FTP-row">FTP</a></li>
  <li><a href="#FTPIPAddress-row">FTPIPAddress</a></li>
  <li><a href="#FTPPassWord-row">FTPPassWord</a></li>
  <li><a href="#FTPPath-row">FTPPath</a></li>
  <li><a href="#FTPport-row">FTPport</a></li>
  <li><a href="#FTPUserName-row">FTPUserName</a></li>
  <li><a href="#GJDXTIME-row">GJDXTIME</a></li>
  <li><a href="#goodscountlength-row">goodscountlength</a></li>
  <li><a href="#goodsnumberlength-row">goodsnumberlength</a></li>
  <li><a href="#hold_music-row">hold_music</a></li>
  <li><a href="#HttpListenerUrl-row">HttpListenerUrl</a></li>
  <li><a href="#HuaWeiBillServer-row">HuaWeiBillServer</a></li>
  <li><a href="#HUAWEIGradeStatus-row">HUAWEIGradeStatus</a></li>
  <li><a href="#HWPBXConnection-row">HWPBXConnection</a></li>
  <li><a href="#HWPBXThread-row">HWPBXThread</a></li>
  <li><a href="#IsAutoHangUp-row">IsAutoHangUp</a></li>
  <li><a href="#IsDayOfWeek-row">IsDayOfWeek</a></li>
  <li><a href="#isFast-row">isFast</a></li>
  <li><a href="#IsFilterABC-row">IsFilterABC</a></li>
  <li><a href="#IsFTP-row">IsFTP</a></li>
  <li><a href="#IsFXO-row">IsFXO</a></li>
  <li><a href="#IsGuide-row">IsGuide</a></li>
  <li><a href="#ISINTERNAL-row">ISINTERNAL</a></li>
  <li><a href="#IsInterstitialVoice-row">IsInterstitialVoice</a></li>
  <li><a href="#isLogin-row">isLogin</a></li>
  <li><a href="#isMonthlyRent-row">isMonthlyRent</a></li>
  <li><a href="#IsOMCdr-row">IsOMCdr</a></li>
  <li><a href="#IsOpenDebuglog-row">IsOpenDebuglog</a></li>
  <li><a href="#IsOpera-row">IsOpera</a></li>
  <li><a href="#IsPrefix-row">IsPrefix</a></li>
  <li><a href="#IsResume-row">IsResume</a></li>
  <li><a href="#IsSV8300Auto-row">IsSV8300Auto</a></li>
  <li><a href="#isYCJF-row">isYCJF</a></li>
  <li><a href="#JXTrunkAvaya-row">JXTrunkAvaya</a></li>
  <li><a href="#LearnPassWord-row">LearnPassWord</a></li>
  <li><a href="#LightingCode-row">LightingCode</a></li>
  <li><a href="#LightsoffCode-row">LightsoffCode</a></li>
  <li><a href="#LightsWay-row">LightsWay</a></li>
  <li><a href="#LocalAreaNum-row">LocalAreaNum</a></li>
  <li><a href="#LocalPath-row">LocalPath</a></li>
  <li><a href="#LoginUserName-row">LoginUserName</a></li>
  <li><a href="#MMsgURL-row">MMsgURL</a></li>
  <li><a href="#MNBSend-row">MNBSend</a></li>
  <li><a href="#MsgURL-row">MsgURL</a></li>
  <li><a href="#NECDTMF-row">NECDTMF</a></li>
  <li><a href="#NECWake-row">NECWake</a></li>
  <li><a href="#NumberChangePrefix-row">NumberChangePrefix</a></li>
  <li><a href="#NumberShow-row">NumberShow</a></li>
  <li><a href="#OMIPaddress-row">OMIPaddress</a></li>
  <li><a href="#OMSendIPOrPort-row">OMSendIPOrPort</a></li>
  <li><a href="#OMVoicemail-row">OMVoicemail</a></li>
  <li><a href="#OutputMode-row">OutputMode</a></li>
  <li><a href="#OXEAPI-row">OXEAPI</a></li>
  <li><a href="#P-row">P</a></li>
  <li><a href="#PanasonicPwd-row">PanasonicPwd</a></li>
  <li><a href="#Port-row">Port</a></li>
  <li><a href="#Q-row">Q</a></li>
  <li><a href="#rcdID-row">rcdID</a></li>
  <li><a href="#RCount-row">RCount</a></li>
  <li><a href="#ReceiveIP-row">ReceiveIP</a></li>
  <li><a href="#RecordFileType-row">RecordFileType</a></li>
  <li><a href="#RecordForceinCode-row">RecordForceinCode</a></li>
  <li><a href="#RecordIIS-row">RecordIIS</a></li>
  <li><a href="#RecordingDTMF-row">RecordingDTMF</a></li>
  <li><a href="#RecordingPath-row">RecordingPath</a></li>
  <li><a href="#RecordInsistCode-row">RecordInsistCode</a></li>
  <li><a href="#RecordInterval-row">RecordInterval</a></li>
  <li><a href="#RecordMatch-row">RecordMatch</a></li>
  <li><a href="#RecordTelephoneNumber-row">RecordTelephoneNumber</a></li>
  <li><a href="#RecordType-row">RecordType</a></li>
  <li><a href="#RID-row">RID</a></li>
  <li><a href="#roomnumberlength-row">roomnumberlength</a></li>
  <li><a href="#roomstatenumberlength-row">roomstatenumberlength</a></li>
  <li><a href="#SecretKey-row">SecretKey</a></li>
  <li><a href="#SMSNumber-row">SMSNumber</a></li>
  <li><a href="#SSLTLS-row">SSLTLS</a></li>
  <li><a href="#TCPPort-row">TCPPort</a></li>
  <li><a href="#TimeOne-row">TimeOne</a></li>
  <li><a href="#TimeOutS-row">TimeOutS</a></li>
  <li><a href="#TransferNUM-row">TransferNUM</a></li>
  <li><a href="#TransferNUMBefore-row">TransferNUMBefore</a></li>
  <li><a href="#UDPLocalIP-row">UDPLocalIP</a></li>
  <li><a href="#UDPPort-row">UDPPort</a></li>
  <li><a href="#UnusualTransferNum-row">UnusualTransferNum</a></li>
  <li><a href="#URLRequest-row">URLRequest</a></li>
  <li><a href="#voicemailcomingnum-row">voicemailcomingnum</a></li>
  <li><a href="#voicemailpasswordlength-row">voicemailpasswordlength</a></li>
  <li><a href="#voicemailroomnumberlength-row">voicemailroomnumberlength</a></li>
  <li><a href="#VoicemailWhere-row">VoicemailWhere</a></li>
  <li><a href="#WakeNumber-row">WakeNumber</a></li>
  <li><a href="#WakePBXConnection-row">WakePBXConnection</a></li>
  <li><a href="#WGIPAddress-row">WGIPAddress</a></li>
  <li><a href="#WGPort-row">WGPort</a></li>
  <li><a href="#WinetubeIntegrated-row">WinetubeIntegrated</a></li>
  <li><a href="#YealinkIP-row">YealinkIP</a></li>
  <li><a href="#YeastarFTP-row">YeastarFTP</a></li>
  <li><a href="#YeastarMBNum-row">YeastarMBNum</a></li>
  <li><a href="#YeastarRSNum-row">YeastarRSNum</a></li>
  <li><a href="#ZLRecordIndex-row">ZLRecordIndex</a></li>
</ul>
</div>

| config | 说明 | 是否可以加到页面里面 |
| :------: | :------: |:------:|
| <span id="IsResume-row" class="config-row scroll-margin-top">\<add key="IsResume" value="N" /></span>| 判断是否组网版 | 不可加到页面 |
|<span id="DataBaseName-row" class="config-row scroll-margin-top">\<add key="DataBaseName" value="BillCommonStandard"  /></span> | 数据库名称 | 已加到页面 |
|<span id="DataType-row" class="config-row scroll-margin-top">\<add key="DataType" value="MySqlData" /></span> | 数据库类型 | 已加到页面 |
|<span id="DataBaseIP-row" class="config-row scroll-margin-top">\<add key="DataBaseIP" value="localhost" /> </span>| 数据库地址 | 已加到页面 |
|<span id="DataBaseUser-row" class="config-row scroll-margin-top">\<add key="DataBaseUser" value="root" /></span>|数据库用户名|已加到页面|
|<span id="DataBasePassword-row" class="config-row scroll-margin-top">\<add key="DataBasePassword" value="sa" /></span>|数据库密码|已加到页面|
|<span id="Port-row" class="config-row scroll-margin-top">\<add key="Port" value="33566"/></span>|数据库端口号|已加到页面|
|<span id="LocalAreaNum-row" class="config-row scroll-margin-top">\<add key="LocalAreaNum" value="010" /></span>|本地区号|已加到页面|
|<span id="DefaultCallOutNum-row" class="config-row scroll-margin-top">\<add key="DefaultCallOutNum" value="9" /></span>|默认出局码|不可加到页面|
|<span id="IsGuide-row" class="config-row scroll-margin-top">\<add key="IsGuide" value="true"/></span>|是否首次弹出使用向导|不可加到页面|
|<span id="avayaCutOutCount-row" class="config-row scroll-margin-top">\<add key="avayaCutOutCount" value="3"/></span>|Avaya截取话单长度|不可加到页面|
|<span id="isLogin-row" class="config-row scroll-margin-top">\<add key="isLogin" value="true"/></span>|是否第一次登录|不可加到页面|
|<span id="IsOpenDebuglog-row" class="config-row scroll-margin-top">\<add key="IsOpenDebuglog" value="true"/></span>|是否开启调试日志|不可加到页面|
|<span id="UDPPort-row" class="config-row scroll-margin-top">\<add key="UDPPort" value="2556"/></span>|UDP默认发送端口号|可以加到页面|
|<span id="1-row" class="config-row scroll-margin-top">\<add key="1" value="02 71 FF 53 54 53 46 46 20 20 03 D9"/></span>|AvayaCM发送等级命令的参数|不可加到页面|
|<span id="2-row" class="config-row scroll-margin-top">\<add key="2" value="71 FF 53 54 53 33 46 20 20 03"/></span>|AvayaCM发送等级命令的参数|不可加到页面|
|<span id="3-row" class="config-row scroll-margin-top">\<add key="3" value="71 FF 53 54 53 34 46 20 20 03"/></span>|AvayaCM发送等级命令的参数|不可加到页面|
|<span id="employeenumberlength-row" class="config-row scroll-margin-top">\<add key="employeenumberlength" value="4"/></span>|房态迷你吧-员工编号按键位长|已加到页面|
|<span id="employeepasswordlength-row" class="config-row scroll-margin-top">\<add key="employeepasswordlength" value="4"/></span>|房态迷你吧-员工密码按键位长|已加到页面|
|<span id="roomnumberlength-row" class="config-row scroll-margin-top">\<add key="roomnumberlength" value="4"/></span>|房态迷你吧-房间号码按键位长|已加到页面|
|<span id="roomstatenumberlength-row" class="config-row scroll-margin-top">\<add key="roomstatenumberlength" value="1"/></span>|房态迷你吧-房态号码按键位长|已加到页面|
|<span id="goodsnumberlength-row" class="config-row scroll-margin-top">\<add key="goodsnumberlength" value="4"/></span>|房态迷你吧-商品编号按键位长|已加到页面|
|<span id="goodscountlength-row" class="config-row scroll-margin-top">\<add key="goodscountlength" value="1"/></span>|房态迷你吧-商品数量按键位长|已加到页面|
|<span id="comingnum-row" class="config-row scroll-margin-top">\<add key="comingnum" value="8000"/></span>|房态迷你吧-语音来电分机|已加到页面|
|<span id="WakePBXConnection-row" class="config-row scroll-margin-top">\<add key="WakePBXConnection" value=",80,admin,admin"/></span>|迅时OM网关通讯连接设置|已加到页面|
|<span id="WGIPAddress-row" class="config-row scroll-margin-top">\<add key="WGIPAddress" value=""/></span>|本地IP地址|已加到页面|
|<span id="WGPort-row" class="config-row scroll-margin-top">\<add key="WGPort" value="8989"/></span>|迅时OM网关监听端口号|已加到页面|
|<span id="GJDXTIME-row" class="config-row scroll-margin-top">\<add key="GJDXTIME" value=""/></span>|挂机短信的发送时间|不可加到页面|
|<span id="TCPPort-row" class="config-row scroll-margin-top">\<add key="TCPPort" value="12333"/></span>|对接酒店管理程序的TCP发送端口号|可以加到页面|
|<span id="rcdID-row" class="config-row scroll-margin-top">\<add key="rcdID" value="0"/></span>|云翌交换机的话单ID索引|不可加到页面|
|<span id="voicemailcomingnum-row" class="config-row scroll-margin-top">\<add key="voicemailcomingnum" value="8001"/></span>|语音信箱语音来电分机|已加到页面|
|<span id="voicemailroomnumberlength-row" class="config-row scroll-margin-top">\<add key="voicemailroomnumberlength" value="4"/></span>|房间号码按键位长|已加到页面|
|<span id="voicemailpasswordlength-row" class="config-row scroll-margin-top">\<add key="voicemailpasswordlength" value="4"/></span>|信息密码按键位长|已加到页面|
|<span id="LightsWay-row" class="config-row scroll-margin-top">\<add key="LightsWay" value="0"/></span>|点灯方式；0：功能码 1：接口|已加到页面|
|<span id="LightingCode-row" class="config-row scroll-margin-top">\<add key="LightingCode" value=""/></span>|点灯码|已加到页面|
|<span id="LightsoffCode-row" class="config-row scroll-margin-top">\<add key="LightsoffCode" value=""/></span>|灭灯码|已加到页面|
|<span id="Q-row" class="config-row scroll-margin-top">\<add key="Q" value="5999"/></span>|语音信箱的转接目标号码|已加到页面|
|<span id="P-row" class="config-row scroll-margin-top">\<add key="P" value=""/></span>|测试连接是否成功-暂时无用|不可加到页面|
|<span id="ZLRecordIndex-row" class="config-row scroll-margin-top">\<add key="ZLRecordIndex" value="0"/></span>|恒捷直联E800交换机话单索引|不可加到页面|
|<span id="ExtensionBits-row" class="config-row scroll-margin-top">\<add key="ExtensionBits" value="3"/></span>|客房分机位数-接收DTMF的位数|已加到页面|
|<span id="WakeNumber-row" class="config-row scroll-margin-top">\<add key="WakeNumber" value=""/></span>|叫醒号码|已加到页面|
|<span id="NECDTMF-row" class="config-row scroll-margin-top">\<add key="NECDTMF" value="*"/></span>|迅时的版本号为102时 接收到的为**5  后面的版本为001208|不可加到页面|
|<span id="TransferNUM-row" class="config-row scroll-margin-top">\<add key="TransferNUM" value="5999"/></span>|华为语音信箱无应答和忙线转接码|不可加到页面|
|<span id="IsAutoHangUp-row" class="config-row scroll-margin-top">\<add key="IsAutoHangUp" value="true"/></span>|是否开启自动挂断|可以加到页面|
|<span id="AutoHangUpJX-row" class="config-row scroll-margin-top">\<add key="AutoHangUpJX" value="120"/></span>|叫醒挂断时间的判断|可以加到页面|
|<span id="AutoHangUpLY-row" class="config-row scroll-margin-top">\<add key="AutoHangUpLY" value="30"/></span>|	留言挂断时间的判断|	可以加到页面|
|<span id="AutoHangUpLD-row" class="config-row scroll-margin-top">\<add key="AutoHangUpLD" value="60"/></span>|	听留言或房态迷你吧挂断时间的判断|	可以加到页面|
|<span id="IsSV8300Auto-row" class="config-row scroll-margin-top">\<add key="IsSV8300Auto" value="false"/></span>|	SV8300是否判断自动挂断Thread	|不可加到页面|
|<span id="MsgURL-row" class="config-row scroll-margin-top">\<add key="MsgURL" value="htt&#8203;p://139.224.36.226:1082/wgws/OrderServlet"/></span>|	行业短信|	可以加到页面|
|<span id="MMsgURL-row" class="config-row scroll-margin-top">\<add key="MMsgURL" value="htt&#8203;p://218.66.5.250:5004/ZWXWS/OrderServlet"/></span>|	营销短信|	可以加到页面|
|<span id="LearnPassWord-row" class="config-row scroll-margin-top">\<add key="LearnPassWord" value="false"/></span>|	是否记住密码	|已加到页面|
|<span id="AutomaticLogin-row" class="config-row scroll-margin-top">\<add key="AutomaticLogin" value="false"/></span>|	是否自动登录|	已加到页面|
|<span id="LoginUserName-row" class="config-row scroll-margin-top">\<add key="LoginUserName" value=""/>	</span>|自动登录记住用户名|	已加到页面|
|<span id="HWPBXConnection-row" class="config-row scroll-margin-top">\<add key="HWPBXConnection" value=",23,,,"/>	</span>|华为录音交换机连接信息|	已加到页面|
|<span id="HWPBXThread-row" class="config-row scroll-margin-top">\<add key="HWPBXThread" value="5000"/>	</span>|华为录音匹配等待时长|	可以加到页面|
|<span id="ISINTERNAL-row" class="config-row scroll-margin-top">\<add key="ISINTERNAL" value="true"/></span>|是否处理电话号码前加0（话单输出）|	可以加到页面|
|<span id="OutputMode-row" class="config-row scroll-margin-top">\<add key="OutputMode" value="0"/>	</span>|话单输出方式 0:自定义输出 1:原始话单输出	已加到页面|
|<span id="ConnectionType-row" class="config-row scroll-margin-top">\<add key="ConnectionType" value="UDP"/>	</span>|输出连接类型	|已加到页面|
|<span id="HUAWEIGradeStatus-row" class="config-row scroll-margin-top">\<add key="HUAWEIGradeStatus" value="false"/></span>|	华为等级状态类型-客户专用|	不可加到页面|
|<span id="IsPrefix-row" class="config-row scroll-margin-top">\<add key="IsPrefix" value="false">\</add></span>|	叫醒时模拟分机添加前缀项|	可以加到页面|
|<span id="IsFXO-row" class="config-row scroll-margin-top">\<add key="IsFXO" value="false"/>	</span>|叫醒是否模拟外线	|可以加到页面|
|<span id="IsDayOfWeek-row" class="config-row scroll-margin-top">\<add key="IsDayOfWeek" value="true"/>	</span>|是否当天还是一周重启 true:一周 false:当天	|不可加到页面|
|<span id="IsFTP-row" class="config-row scroll-margin-top">\<add key="IsFTP" value="false" /></span>|是否FTP通讯 true:是 false:否	|已加到页面|
|<span id="LocalPath-row" class="config-row scroll-margin-top">\<add key="LocalPath" value="" /></span>|	FTP本地路径	|已加到页面|
|<span id="FTPIPAddress-row" class="config-row scroll-margin-top">\<add key="FTPIPAddress" value="" /></span>|FTPIP地址	|已加到页面|
|<span id="FTPport-row" class="config-row scroll-margin-top">\<add key="FTPport" value="" />	</span>|FTP端口号|	已加到页面|
|<span id="FTPUserName-row" class="config-row scroll-margin-top">\<add key="FTPUserName" value="" />	</span>|FTP用户名	|已加到页面|
|<span id="FTPPassWord-row" class="config-row scroll-margin-top">\<add key="FTPPassWord" value="" /></span>|	FTP密码	|已加到页面|
|<span id="FTPPath-row" class="config-row scroll-margin-top">\<add key="FTPPath" value="" /></span>|	FTP远程路径	|已加到页面|
|<span id="JXTrunkAvaya-row" class="config-row scroll-margin-top">\<add key="JXTrunkAvaya" value="" /></span>|	Avaya叫醒分机设置	|不可加到页面|
|<span id="SMSNumber-row" class="config-row scroll-margin-top">\<add key="SMSNumber" value="0.05" /></span>|	短信剩余条数	|已加到页面|
|<span id="IsFilterABC-row" class="config-row scroll-margin-top">\<add key="IsFilterABC" value="false" /></span>|	是否过滤电话号码的字母 true:是 false:否	|不可加到页面|
|<span id="RecordTelephoneNumber-row" class="config-row scroll-margin-top">\<add key="RecordTelephoneNumber" value="" /></span>|	CTI录音电话号码（OM SIP外线）|	已加到页面|
|<span id="RecordInsistCode-row" class="config-row scroll-margin-top">\<add key="RecordInsistCode" value="" /></span>|	CTI录音强插码（OM SIP外线）	|已加到页面|
|<span id="isPopups-row" class="config-row scroll-margin-top">\<add key="isPopups" value="false" />	</span>|是否提示维保到期提示 true:是 false:否|	不可加到页面|
|<span id="RecordType-row" class="config-row scroll-margin-top">\<add key="RecordType" value="去电,来电,内线" /></span>|	录音的类型---暂时没用到|	不可加到页面|
|<span id="ExtensionConversion-row" class="config-row scroll-margin-top">\<add key="ExtensionConversion" value="" /></span>|	分机转换(匹配用到)，参数中包含目标号码将目标号码转为分机号	|不可加到页面|
|<span id="RecordFileType-row" class="config-row scroll-margin-top">\<add key="RecordFileType" value="mp3" /></span>	|录音文件类型 mp3和wav	|已加到页面|
|<span id="CTIIpAddress-row" class="config-row scroll-margin-top">\<add key="CTIIpAddress" value="" />	</span>|CTIServer IP地址 192.168.6.105:8000|	不可加到页面|
|<span id="RecordMatch-row" class="config-row scroll-margin-top">\<add key="RecordMatch" value="" /></span>|	迅时录音中用到，参数值为NO时挂断来去电|	不可加到页面|
|<span id="RecordInterval-row" class="config-row scroll-margin-top">\<add key="RecordInterval" value="20" /></span>|	录音间隔---暂时没用到|	不可加到页面|
|<span id="OMSendIPOrPort-row" class="config-row scroll-margin-top">\<add key="OMSendIPOrPort" value="" /></span>|	发送另外一台系统的地址 格式：IP地址,端口号|	不可加到页面|
|<span id="AttendantNum-row" class="config-row scroll-margin-top">\<add key="AttendantNum" value="" /></span>	|话务台语音号码	|已加到页面|
|<span id="OMIPaddress-row" class="config-row scroll-margin-top">\<add key="OMIPaddress" value="" />	</span>|OM远程存储录音的IP路径地址|	可以加到页面|
|<span id="OMVoicemail-row" class="config-row scroll-margin-top">\<add key="OMVoicemail" value="false" /></span>|	语音信箱话单接收到的文件名称和目录里的名称不相同---暂时没用到|`	不可加到页面|
|<span id="VoicemailWhere-row" class="config-row scroll-margin-top">\<add key="VoicemailWhere" value="" />	</span>|查听语音信箱的sql语句 默认语句为and ListenStatus='未听'|	不可加到页面|
|<span id="FastCallBill-row" class="config-row scroll-margin-top">\<add key="FastCallBill" value="false" />	</span>|暂时没用到	|不可加到页面|
|<span id="ECIPAddressPort-row" class="config-row scroll-margin-top">\<add key="ECIPAddressPort" value="" />	</span>|华为BMU设置 htt&#8203;ps://192.168.6.38:18543/	|可以加到页面|
|<span id="ECVersionNumber-row" class="config-row scroll-margin-top">\<add key="ECVersionNumber" value="EC3.0" /></span>	|UC2.3.1,EC3.0	|可以加到页面|
|<span id="ECUserName-row" class="config-row scroll-margin-top">\<add key="ECUserName" value="esdk_user" /></span>|	华为BMU用户名	|可以加到页面|
|<span id="ECPassWord-row" class="config-row scroll-margin-top">\<add key="ECPassWord" value="Huawei@123" />	</span>|华为BMU密码	|可以加到页面|
|<span id="TransferNUMBefore-row" class="config-row scroll-margin-top">\<add key="TransferNUMBefore" value="4144" /></span>|	华为修改语音信箱前转号码	|可以加到页面|
|<span id="ExtensionFilterNum-row" class="config-row scroll-margin-top">\<add key="ExtensionFilterNum" value="" /></span>	|Alcatel-OXO 接收DTMF码处理	|不可加到页面|
|<span id="BillExtension-row" class="config-row scroll-margin-top">\<add key="BillExtension" value="false" /></span>	|插入话单后是否要查询分机是否存在（false不存在，true存在）|	可以加到页面|
|<span id="HuaWeiBillServer-row" class="config-row scroll-margin-top">\<add key="HuaWeiBillServer" value="" /></span>	|华为BillServer设置|	已加到页面|
|<span id="PanasonicPwd-row" class="config-row scroll-margin-top">\<add key="PanasonicPwd" value="451k=kSw450k=kZx449k=kTy448k=kLz447k=kAa" /></span>|	Panasonic KX-NS系列停复机控制接口登录密码	|不可加到页面|
|<span id="SSLTLS-row" class="config-row scroll-margin-top">\<add key="SSLTLS" value="Tls" /></span>|	Cisco-CallManager 停复机控制 TLS设置	|不可加到页面|
|<span id="CiscoVersion-row" class="config-row scroll-margin-top">\<add key="CiscoVersion" value="8.5" /></span>|	Cisco-CallManager 停复机控制 版本号设置|	不可加到页面|
|<span id="URLRequest-row" class="config-row scroll-margin-top">\<add key="URLRequest" value="" /></span>|	暂时没用到|	不可加到页面|
|<span id="IsOMCdr-row" class="config-row scroll-margin-top">\<add key="IsOMCdr" value="false" /></span>	|是否读取OMCdr|	可以加到页面|
|<span id="YealinkIP-row" class="config-row scroll-margin-top">\<add key="YealinkIP" value="" /></span>	|亿联话机IP集合  ping亿联话机	|不可加到页面|
|<span id="UnusualTransferNum-row" class="config-row scroll-margin-top">\<add key="UnusualTransferNum" value="" /></span>|	ping不通亿联话机就转到这个参数上|	不可加到页面|
|<span id="UDPLocalIP-row" class="config-row scroll-margin-top">\<add key="UDPLocalIP" value="" />	</span>|酒管通讯连接UDP的IP地址	|已加到页面|
|<span id="ReceiveIP-row" class="config-row scroll-margin-top">\<add key="ReceiveIP" value="" /></span>	|暂时没用到	|不可加到页面|
|<span id="destDeviceName-row" class="config-row scroll-margin-top">\<add key="destDeviceName" value="" /></span>	|暂时没用到	|不可加到页面|
|<span id="YeastarFTP-row" class="config-row scroll-margin-top">\<add key="YeastarFTP" value="" /></span>|	YeastarS FTP设置	|已加到页面|
|<span id="YeastarRSNum-row" class="config-row scroll-margin-top">\<add key="YeastarRSNum" value="777" /></span>|	YeastarS 房态号码|	已加到页面|
|<span id="YeastarMBNum-row" class="config-row scroll-margin-top">\<add key="YeastarMBNum" value="778" /></span>|	YeastarS 迷你吧号码|	已加到页面|
|<span id="AuthorizationCode-row" class="config-row scroll-margin-top">\<add key="AuthorizationCode" value="AuthorizationCode" />	</span>|第二台电脑连接到同一个数据库中的授权码写AuthorizationCodeS	|不可加到页面|
|<span id="EncryptionCode-row" class="config-row scroll-margin-top">\<add key="EncryptionCode" value="EncryptionCode" /></span>	|同上 写EncryptionCodeS	|不可加到页面|
|<span id="IsInterstitialVoice-row" class="config-row scroll-margin-top">\<add key="IsInterstitialVoice" value="false" />	</span>|星网锐捷和华为录音，接通后插播语音 false:不插播 true:插播	|可以加到页面|
|<span id="WinetubeIntegrated-row" class="config-row scroll-margin-top">\<add key="WinetubeIntegrated" value="UDP;" /></span>|	输出集成通讯参数 第二个输出集成通讯	|不可加到页面|
|<span id="CommunicationOne-row" class="config-row scroll-margin-top">\<add key="CommunicationOne" value="" /></span>	|输出集成通讯1	|不可加到页面|
|<span id="CommunicationTwo-row" class="config-row scroll-margin-top">\<add key="CommunicationTwo" value="" />	</span>|输出集成通讯2|	不可加到页面|
|<span id="HttpListenerUrl-row" class="config-row scroll-margin-top">\<add key="HttpListenerUrl" value="" /></span>	|监听亿联话机URL	|不可加到页面|
|<span id="IsOpera-row" class="config-row scroll-margin-top">\<add key="IsOpera" value="false" />	</span>|是否对接Opera酒管 true:是 false:否	|可以加到页面|
|<span id="AppKey-row" class="config-row scroll-margin-top">\<add key="AppKey" value="5b4557b9" /></span>	|讯飞AppKey	|可以加到页面|
|<span id="SecretKey-row" class="config-row scroll-margin-top">\<add key="SecretKey" value="3f7d42bbad68fc3875dbc13898f344a6" />	</span>|讯飞SecretKey|	可以加到页面|
|<span id="AuthAPIURL-row" class="config-row scroll-margin-top">\<add key="AuthAPIURL" value="htt&#8203;p://raasr.xfyun.cn/api" /></span>|	讯飞语音转写地址	|可以加到页面|
|<span id="isMonthlyRent-row" class="config-row scroll-margin-top">\<add key="isMonthlyRent" value="false" /></span>|	是否月租 true:是 false:否	|不可加到页面|
|<span id="TimeOutS-row" class="config-row scroll-margin-top">\<add key="TimeOutS" value="500" /></span>	|OM接口接收暂停时间 因为有时候INCOMING在BYE后|	不可加到页面|
|<span id="isFast-row" class="config-row scroll-margin-top">\<add key="isFast" value="false" /></span>	|是否快速存储通话记录	|不可加到页面|
|<span id="RecordForceinCode-row" class="config-row scroll-margin-top">\<add key="RecordForceinCode" value="" /></span>	|CTI录音 强插码|	已加到页面|
|<span id="BeepType-row" class="config-row scroll-margin-top">\<add key="BeepType" value="No" />	</span>|CTI录音 是否有提示音 true:是 false:否	|已加到页面|
|<span id="BeepPath-row" class="config-row scroll-margin-top">\<add key="BeepPath" value="" />	</span>|CTI录音 提示音地址|	已加到页面|
|<span id="BeepDuration-row" class="config-row scroll-margin-top">\<add key="BeepDuration" value="4" /></span>	|CTI录音 提示音时长	|可以加到页面|
|<span id="RecordingPath-row" class="config-row scroll-margin-top">\<add key="RecordingPath" value="" /></span>	|OM录音路径的IP地址|	可以加到页面|
|<span id="FTMNBFJHN-row" class="config-row scroll-margin-top">\<add key="FTMNBFJHN" value="false" /></span>	|NEC-SV8300房态迷你吧特殊处理 判断开头号码不是8补8 true:是 false:否	|不可加到页面|
|<span id="hold_music-row" class="config-row scroll-margin-top">\<add key="hold_music" value="default" /></span>|	星网锐捷来电排队的语音	|可以加到页面|
|<span id="NumberShow-row" class="config-row scroll-margin-top">\<add key="NumberShow" value="" />	</span>|华为话务台 来电排队开头号码|	可以加到页面|
|<span id="RecordingDTMF-row" class="config-row scroll-margin-top">\<add key="RecordingDTMF" value="99" /></span>|	星网锐捷按需录音的按键参数	|可以加到页面|
|<span id="NumberChangePrefix-row" class="config-row scroll-margin-top">\<add key="NumberChangePrefix" value="" /></span>|	暂时没用到	|不可加到页面|
|<span id="BlackListVoice-row" class="config-row scroll-margin-top">\<add key="BlackListVoice" value="" />	</span>|迅时话务台黑名单语音|不可加到页面|
|<span id="BlackListSleep-row" class="config-row scroll-margin-top">\<add key="BlackListSleep" value="5" />	</span>|迅时话务台黑名单语音暂停5秒后挂断当前号码|不可加到页面|
|<span id="Cookie-row" class="config-row scroll-margin-top">\<add key="Cookie" value="" />	</span>|	会话凭证||
|<span id="isYCJF-row" class="config-row scroll-margin-top">\<add key="isYCJF" value="false" />	</span>|是否隐藏话单管理|	|
|<span id="RID-row" class="config-row scroll-margin-top">\<add key="RID" value="0" />	</span>|通话记录ID||
|<span id="TimeOne-row" class="config-row scroll-margin-top">\<add key="TimeOne" value="10" />	</span>|查询录音时间范围||
|<span id="FTP-row" class="config-row scroll-margin-top">\<add key="FTP" value="" /><br /><span class="blue">举例如下：\<add key="FTP" value="192.168.6.27,admin,88888" /></span></span>|FTP设置 FTPServerIP,FTPUser,FTPPassWord||
|<span id="RCount-row" class="config-row scroll-margin-top">\<add key="RCount" value="100" />	</span>|通话记录上传条数||
|<span id="RecordIIS-row" class="config-row scroll-margin-top">\<add key="RecordIIS" value="ht&#8203;tp://127.0.0.1:10806" />	</span>|录音网页访问地址:端口||
|<span id="OXEAPI-row" class="config-row scroll-margin-top">\<add key="OXEAPI" value=",,,," /><br /><span class="blue">举例如下：\<add key="OXEAPI" value="192.168.6.27,13:35,32,admin,88888" /></span></span>|对接阿尔卡特朗讯OXE电话交换机的API配置：地址,同步时间(HH:mm),HotelCode,UserName,Password||
|<span id="MNBSend-row" class="config-row scroll-margin-top">\<add key="MNBSend" value="false" />	</span>|迷你吧发送开关||
|<span id="NECWake-row" class="config-row scroll-margin-top">\<add key="NECWake" value="" />	</span>|NEC电话交换机叫醒服务配置||
