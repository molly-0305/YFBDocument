import React, { useState } from 'react';

export function IPAddressConfig() {
  const [ipAddress, setIpAddress] = useState('192.168.1.100');

  const endpoints = {
    '注册成功(http://服务器IP地址:39671/Register.aspx?active_url=$active_url)': '/Register.aspx?active_url=$active_url',
    '放下手柄(http://服务器IP地址:39671/Receive.aspx?state=0&call_id=$call_id)': '/Receive.aspx?state=0&call_id=$call_id',
    '拿起手柄(http://服务器IP地址:39671/Receive.aspx?state=4&call_id=$call_id)': '/Receive.aspx?state=4&call_id=$call_id',
    '来电(http://服务器IP地址:39671/Receive.aspx?state=6&remote=$remote&type=1&call_id=$call_id)': '/Receive.aspx?state=6&remote=$remote&type=1&call_id=$call_id',
    '去电(http://服务器IP地址:39671/Receive.aspx?state=5&remote=$remote&call_id=$call_id)': '/Receive.aspx?state=5&remote=$remote&call_id=$call_id',
    '建立会话(http://服务器IP地址:39671/Receive.aspx?state=2&remote=$remote&call_id=$call_id)': '/Receive.aspx?state=2&remote=$remote&call_id=$call_id',
    '结束(http://服务器IP地址:39671/Receive.aspx?state=1&remote=$remote&call_id=$call_id)': '/Receive.aspx?state=1&remote=$remote&call_id=$call_id',
    '保持(http://服务器IP地址:39671/Receive.aspx?state=7&remote=$remote&type=1&call_id=$call_id)': '/Receive.aspx?state=7&remote=$remote&type=1&call_id=$call_id',
    '取消保持(http://服务器IP地址:39671/Receive.aspx?state=8&remote=$remote&type=1&call_id=$call_id)': '/Receive.aspx?state=8&remote=$remote&type=1&call_id=$call_id',
    '未接来电(http://服务器IP地址:39671/Receive.aspx?state=3&remote=$remote)': '/Receive.aspx?state=3&remote=$remote',
    '拒绝来电(http://服务器IP地址:39671/Receive.aspx?state=3&remote=$remote)': '/Receive.aspx?state=3&remote=$remote',
    '取消呼出(http://服务器IP地址:39671/Receive.aspx?state=1&remote=$remote&call_id=$call_id)': '/Receive.aspx?state=1&remote=$remote&call_id=$call_id'
  };

  // 更稳定的复制方法
  const copyToClipboard = async (text) => {
    try {
      // 方法1: 使用现代 clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // 方法2: 使用传统的 execCommand 作为备选
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
      }
    } catch (err) {
      console.error('复制失败:', err);
      return false;
    }
  };

  // 复制单个URL - 修复了event参数问题
  const copySingleURL = async (url, action, event) => {
    const button = event.currentTarget;
    const originalText = button.textContent;
    
    const success = await copyToClipboard(url);
    
    if (success) {
      // 显示复制成功提示
      button.textContent = '✅ 已复制';
      button.style.background = '#52c41a';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '#1890ff';
      }, 2000);
    } else {
      // 如果复制失败，提供手动复制选项
      button.textContent = '❌ 点击手动复制';
      button.style.background = '#ff4d4f';
      
      // 临时保存文本到全局变量，供手动复制使用
      window.tempCopyText = url;
      
      // 修改按钮点击事件为手动复制
      const originalOnClick = button.onclick;
      button.onclick = (e) => {
        manualCopy(url, button);
        setTimeout(() => {
          button.onclick = originalOnClick;
          button.textContent = originalText;
          button.style.background = '#1890ff';
          delete window.tempCopyText;
        }, 2000);
      };
      
      setTimeout(() => {
        if (button.textContent === '❌ 点击手动复制') {
          button.textContent = originalText;
          button.style.background = '#1890ff';
          button.onclick = originalOnClick;
          delete window.tempCopyText;
        }
      }, 5000);
      
      // 提示用户手动复制
      alert(`请手动复制 ${action} 的URL:\n\n${url}`);
    }
  };

  // 手动复制备用函数
  const manualCopy = (text, button) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        button.textContent = '✅ 已复制';
        button.style.background = '#52c41a';
      }
    } catch (err) {
      alert('复制失败，请手动选择文本复制');
    }
    
    document.body.removeChild(textArea);
  };

  // 一键复制所有URL
  const copyAllURLs = async () => {
    const allURLs = Object.entries(endpoints)
      .map(([action, endpoint]) => `${action}:\nhttp://${ipAddress}:39671${endpoint}`)
      .join('\n\n');
    
    const success = await copyToClipboard(allURLs);
    
    if (success) {
      alert('✅ 所有URL已成功复制到剪贴板！');
    } else {
      // 如果一键复制失败，显示所有URL让用户手动复制
      const allURLsText = Object.entries(endpoints)
        .map(([action, endpoint]) => `${action}:\nhttp://${ipAddress}:39671${endpoint}`)
        .join('\n\n');
      
      alert(`📋 请手动复制所有URL:\n\n${allURLsText}`);
    }
  };

  return (
    <>
      {/* IP地址输入控件 */}
      <div style={{ 
        marginBottom: '20px', 
        marginLeft: '2em',
        padding: '15px',
        border: '1px solid #eaecef',
        borderRadius: '8px',
        background: '#f6f8fa'
      }}>
        <label style={{ 
          fontSize: '18px', 
          fontWeight: 'bold', 
          color: 'red',
          display: 'block',
          marginBottom: '10px'
        }}>
          话务台客户端IP地址:
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            style={{
              padding: '8px 12px',
              fontSize: '16px',
              border: '1px solid #d0d7de',
              borderRadius: '4px',
              width: '200px',
              outline: 'none'
            }}
            placeholder="请输入IP地址"
          />
          
        </div>
        <p style={{ marginLeft: '0em', fontSize: '15px', color: '#ff0c0cff', marginTop: '8px', marginBottom: '0' }}>
          提示：可直接复制括号里的内容，再更改IP地址部分。
        </p>
      </div>

      {/* 动态生成的代码块 */}
      {Object.entries(endpoints).map(([action, endpoint]) => {
        const fullURL = `http://${ipAddress}:39671${endpoint}`;
        return (
          <div key={action} style={{ marginBottom: '20px' }}>
            <p style={{ marginLeft: "2em", fontSize: "20px", marginBottom: '8px' }}>
              {action}：
            </p>
            <div style={{ 
              position: 'relative', 
              margin: '0 2em',
              border: '1px solid #e1e4e8',
              borderRadius: '6px',
              overflow: 'hidden'
            }}>
              {/* 复制按钮 */}
              <button
                onClick={(e) => copySingleURL(fullURL, action, e)}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '8px',
                  padding: '4px 8px',
                  fontSize: '12px',
                  background: '#1890ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                复制
              </button>
              
              {/* 代码内容 */}
              <pre
                style={{
                  background: '#f6f8fa',
                  padding: '16px',
                  margin: '0',
                  overflow: 'auto',
                  fontSize: '14px',
                  lineHeight: '1.45',
                  color: '#24292e',
                  paddingRight: '60px'
                }}
              >
                <code>{fullURL}</code>
              </pre>
            </div>
          </div>
        );
      })}
    </>
  );
}
export default IPAddressConfig;
