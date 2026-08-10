# CS端安装报错

## 一、Error reading setup initialization file错误

在英文版本的操作系统中安装CS端时，可能会因为区域格式设置为英文而导致安装报错。  
报错提示如下图所示：
<img src="/YFBDocument/content/assets/img/knowledgeBase/CS/2/1.png" alt=""/>
<br /><br /><br />


解决方法如下：  
1、打开控制面板，选择"Clock and Region"---"Region"
<img src="/YFBDocument/content/assets/img/knowledgeBase/CS/2/2.png" alt=""/>
<br /><br /><br />


2、在弹出的窗口中将格式设置为Chinese(Simplified China)，点击确定保存设置，如下图所示：
<img src="/YFBDocument/content/assets/img/knowledgeBase/CS/2/3.png" alt=""/>


## 二、错误-1603 安装时出现致命错误

错误图片如下所示：
<img src="/YFBDocument/content/assets/img/knowledgeBase/CS/2/4.png" alt=""/><br /><br />

错误原因：未将IIS应用程序池中的"启用32位应用程序"修改为True
<img src="/YFBDocument/content/assets/img/knowledgeBase/CS/2/5.png" alt=""/>
