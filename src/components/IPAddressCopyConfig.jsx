import React, { useState } from 'react';

export default function IPAddressCopyConfig() {
  const [ipAddress, setIpAddress] = useState('192.168.6.27');

  const commands = [
    `config system billserver primaryip ${ipAddress} authtype noauth`,
    'config createbill switch on exportinterofficebill yes',
    'config ccm outcallwithlocalright flag on',
    'stop sntpserver',
    'start sntpserver',
    'save'
  ];

  // 复制到剪贴板函数
  const copyToClipboard = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
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

  // 复制单条命令
  const copySingleCommand = async (command, index, event) => {
    const button = event.currentTarget;
    const originalText = button.textContent;
    
    const success = await copyToClipboard(command);
    
    if (success) {
      button.textContent = '✅ 已复制';
      button.style.background = '#52c41a';
      
      setTimeout(() => {
        button.textContent = '复制';
        button.style.background = '#1890ff';
      }, 2000);
    } else {
      button.textContent = '❌ 失败';
      button.style.background = '#ff4d4f';
      
      setTimeout(() => {
        button.textContent = '复制';
        button.style.background = '#1890ff';
      }, 2000);
      
      alert(`请手动复制命令 ${index + 1}:\n\n${command}`);
    }
  };

  // 复制所有命令
  const copyAllCommands = async () => {
    const allCommands = commands.join('\n');
    const success = await copyToClipboard(allCommands);
    
    if (success) {
      alert('✅ 所有命令已成功复制到剪贴板！');
    } else {
      alert(`📋 请手动复制所有命令:\n\n${allCommands}`);
    }
  };

  return (
    <div style={{ marginLeft: "2em" }}>
      <p style={{ fontSize: "20px", marginBottom: '20px' }}>
        输入以下几条命令：
      </p>

      {/* IP地址配置区域 */}
      <div style={{ 
        marginBottom: '20px',
        padding: '15px',
        border: '1px solid #eaecef',
        borderRadius: '8px',
        background: '#f6f8fa'
      }}>
        <label style={{ 
          fontSize: '16px', 
          fontWeight: 'bold',
          display: 'block',
          marginBottom: '10px'
        }}>
          软件安装电脑IP地址:
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
          <span style={{ color: "red", fontSize: '14px' }}>
            （此IP地址为安装软件的电脑IP地址）
          </span>
          {/* 一键复制所有按钮 */}
      <div style={{ textAlign: 'center', marginTop: '1px' }}>
        <button
          onClick={copyAllCommands}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            background: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          一键复制所有命令
        </button>
      </div>
        </div>
      </div>

      {/* 命令列表 */}
      {commands.map((command, index) => (
        <div key={index} style={{ 
          marginBottom: '15px',
          position: 'relative'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}>
            <span style={{ 
              minWidth: '30px',
              padding: '4px 8px',
              background: '#f0f0f0',
              borderRadius: '4px',
              fontSize: '14px',
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              {index + 1}
            </span>
            <div style={{ 
              flex: 1,
              position: 'relative',
              border: '1px solid #e1e4e8',
              borderRadius: '6px',
              overflow: 'hidden',
              background: '#f6f8fa'
            }}>
              {/* 复制按钮 */}
              <button
                onClick={(e) => copySingleCommand(command, index, e)}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '8px',
                  padding: '4px 12px',
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
              
              {/* 命令内容 */}
              <pre
                style={{
                  background: 'transparent',
                  padding: '16px',
                  margin: '0',
                  overflow: 'auto',
                  fontSize: '14px',
                  lineHeight: '1.45',
                  color: '#24292e',
                  paddingRight: '80px',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all'
                }}
              >
                <code>{command}</code>
              </pre>
            </div>
          </div>
        </div>
      ))}

      {/* 一键复制所有按钮 */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={copyAllCommands}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            background: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          一键复制所有命令
        </button>
      </div>
    </div>
  );
}