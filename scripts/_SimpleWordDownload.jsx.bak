import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const WordDownloadWithPrint = () => {
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  const getContentElement = () =>
    document.querySelector('.theme-doc-markdown') ||
    document.querySelector('article .markdown') ||
    document.querySelector('article') ||
    document.querySelector('main');

  // 注意：浏览器「打印 → 另存为 PDF」的页眉/页脚（日期、网址）由浏览器控制，
  // 网页 JS/CSS 无法强制关闭。要自动去掉，只能程序内生成 PDF。
  const handleDownloadPdf = async () => {
    if (typeof document === 'undefined') {
      alert('请在浏览器环境中使用此功能');
      return;
    }

    const source = getContentElement();
    if (!source) {
      alert('未找到可导出的文档内容');
      return;
    }

    setPdfLoading(true);
    const hidden = [];
    const prevScrollX = window.scrollX;
    const prevScrollY = window.scrollY;

    try {
      // 隐藏站点导航/侧栏/下载按钮，只截正文
      document
        .querySelectorAll(
          [
            '.word-download-component',
            '.no-print',
            '.navbar',
            '.theme-doc-sidebar-container',
            '.theme-doc-toc-desktop',
            '.theme-doc-toc-mobile',
            '.pagination-nav',
            '.theme-doc-footer',
            '.theme-doc-breadcrumbs',
            '.breadcrumbs',
            '.footer',
            '.hash-link',
          ].join(',')
        )
        .forEach((el) => {
          hidden.push([el, el.style.display]);
          el.style.display = 'none';
        });

      const [{ default: html2canvas }, jspdfMod] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);
      const JsPDF = jspdfMod.jsPDF || jspdfMod.default;

      // 滚到顶部，直接截取页面上真实可见的正文（避免克隆/透明节点截成白图）
      window.scrollTo(0, 0);
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

      const width = Math.max(source.scrollWidth, source.clientWidth, 600);
      const height = Math.max(source.scrollHeight, source.offsetHeight, 100);

      const canvas = await html2canvas(source, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.clientWidth,
        width,
        height,
        onclone: (_clonedDoc, clonedEl) => {
          if (!clonedEl) return;
          clonedEl.style.background = '#ffffff';
          clonedEl.style.color = '#1f2937';
          clonedEl.style.maxWidth = '100%';
          clonedEl.querySelectorAll('.word-download-component, .no-print, .hash-link, button').forEach((el) => {
            el.remove();
          });
          clonedEl.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((el) => {
            el.style.color = '#111111';
          });
          clonedEl.querySelectorAll('p,li').forEach((el) => {
            el.style.color = '#1f2937';
          });
          clonedEl.querySelectorAll('a, .blue').forEach((el) => {
            el.style.color = '#0b6bcb';
          });
          clonedEl.querySelectorAll('.red').forEach((el) => {
            el.style.color = '#c62828';
          });
          clonedEl.querySelectorAll('img').forEach((img) => {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
          });
        },
      });

      if (!canvas.width || !canvas.height) {
        throw new Error('截图失败（画布为空）');
      }

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new JsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const contentWidth = pageWidth - margin * 2;
      const contentHeight = pageHeight - margin * 2;
      const imgHeight = (canvas.height * contentWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = margin;

      pdf.addImage(imgData, 'JPEG', margin, position, contentWidth, imgHeight);
      heightLeft -= contentHeight;

      while (heightLeft > 1) {
        position = margin - (imgHeight - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', margin, position, contentWidth, imgHeight);
        heightLeft -= contentHeight;
      }

      const documentTitle = getDocumentTitle();
      const safeFileName = documentTitle
        .replace(/[<>:"/\\|?*]/g, '_')
        .replace(/\s+/g, '_')
        .substring(0, 50);
      const now = new Date();
      const stamp = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now
        .getDate()
        .toString()
        .padStart(2, '0')}`;

      pdf.save(`${safeFileName}_${stamp}.pdf`);
    } catch (error) {
      console.error('生成PDF失败:', error);
      alert(`生成PDF失败: ${error.message || '未知错误'}`);
    } finally {
      hidden.forEach(([el, display]) => {
        el.style.display = display;
      });
      window.scrollTo(prevScrollX, prevScrollY);
      setPdfLoading(false);
    }
  };

  // 页面配色（与 brand-docs-portal3 / style.css 一致）
  const PAGE_COLORS = {
    body: '1F2937',
    heading: '0F172A',
    blue: '0B6BCB',
    red: 'C62828',
  };

  const cssColorToHex = (value) => {
    if (!value) return null;
    const v = String(value).trim().toLowerCase();
    if (v === 'red') return PAGE_COLORS.red;
    if (v === 'blue' || v === 'navy') return PAGE_COLORS.blue;
    const hex = v.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (hex) {
      let h = hex[1];
      if (h.length === 3) h = h.split('').map((c) => c + c).join('');
      return h.toUpperCase();
    }
    const rgb = v.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (rgb) {
      return [rgb[1], rgb[2], rgb[3]]
        .map((n) => Number(n).toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase();
    }
    return null;
  };

  const resolveColorFromElement = (el, inherited) => {
    if (!el || el.nodeType !== 1) return inherited;
    if (el.classList?.contains('blue')) return PAGE_COLORS.blue;
    if (el.classList?.contains('red')) return PAGE_COLORS.red;
    const tag = el.tagName?.toLowerCase();
    if (tag === 'a') return PAGE_COLORS.blue;
    const fromStyle = cssColorToHex(el.style?.color);
    if (fromStyle) return fromStyle;
    return inherited;
  };

  // 从 DOM 节点提取带颜色/加粗的文字 runs（贴近页面格式）
  const extractRunsFromElement = (element, defaults = {}) => {
    const runs = [];
    const base = {
      bold: !!defaults.bold,
      color: defaults.color || PAGE_COLORS.body,
      size: defaults.size || '26',
    };

    const walk = (node, state) => {
      if (!node) return;
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (text) runs.push({ ...state, text });
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const tag = node.tagName.toLowerCase();
      if (tag === 'script' || tag === 'style' || tag === 'svg') return;
      if (tag === 'br') {
        runs.push({ ...state, text: '\n' });
        return;
      }
      if (tag === 'img') return;

      const next = {
        ...state,
        bold: state.bold || tag === 'strong' || tag === 'b',
        color: resolveColorFromElement(node, state.color),
      };
      Array.from(node.childNodes).forEach((child) => walk(child, next));
    };

    walk(element, base);
    return runs;
  };

  const createRunsXml = (runs) => {
    if (!runs || !runs.length) {
      return `<w:r><w:rPr><w:rFonts w:ascii="微软雅黑" w:eastAsia="微软雅黑" w:hAnsi="微软雅黑"/><w:sz w:val="26"/><w:szCs w:val="26"/><w:color w:val="${PAGE_COLORS.body}"/></w:rPr><w:t></w:t></w:r>`;
    }
    return runs
      .map((run) => {
        const boldXml = run.bold ? '<w:b/><w:bCs/>' : '';
        const color = run.color || PAGE_COLORS.body;
        const size = run.size || '26';
        const textContent = processTextWithLineBreaks(run.text || '');
        return `<w:r>
    <w:rPr>
      <w:rFonts w:ascii="微软雅黑" w:eastAsia="微软雅黑" w:hAnsi="微软雅黑"/>
      ${boldXml}
      <w:color w:val="${color}"/>
      <w:sz w:val="${size}"/>
      <w:szCs w:val="${size}"/>
    </w:rPr>
    ${textContent}
  </w:r>`;
      })
      .join('');
  };

  // 获取文档标题
  const getDocumentTitle = () => {
    if (typeof document === 'undefined') return "文档手册";
    
    const h1 = document.querySelector('h1');
    if (h1 && h1.textContent && h1.textContent.trim()) {
      return h1.textContent.trim();
    }
    
    return "文档手册";
  };

  // 像素转英制单位（dxa）- 移除缩放因子
  const pixelsToDxa = (pixels) => {
    // 1英寸 = 1440 dxa
    return Math.round((pixels / 96) * 1440);
  };

  // 像素转EMU - 移除缩放因子
  const pixelsToEmu = (pixels) => {
    // 1英寸 = 914400 EMU
    return Math.round((pixels / 96) * 914400);
  };

  // 获取图片数据 - 保持高清但控制Word显示尺寸
  const getImageData = (src, imgElement) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      
      img.onload = () => {
        // 使用原始大图尺寸保证清晰度
        const originalWidth = img.naturalWidth;
        const originalHeight = img.naturalHeight;
        
        console.log(`原始大图尺寸: ${originalWidth}×${originalHeight}像素`);
        
        // 保持高清处理（不缩放或轻微缩放）
        const MAX_WIDTH = 1200;  // 高清处理的最大宽度
        const MAX_HEIGHT = 900;  // 高清处理的最大高度
        
        let finalWidth = originalWidth;
        let finalHeight = originalHeight;
        
        // 只对超过限制的超大图片进行轻微缩小
        if (originalWidth > MAX_WIDTH || originalHeight > MAX_HEIGHT) {
          const widthRatio = MAX_WIDTH / originalWidth;
          const heightRatio = MAX_HEIGHT / originalHeight;
          const scaleRatio = Math.min(widthRatio, heightRatio);
          
          // 等比缩小，但保持高质量（缩放比例>0.5）
          finalWidth = Math.round(originalWidth * scaleRatio);
          finalHeight = Math.round(originalHeight * scaleRatio);
          
          console.log(`高清缩小至: ${finalWidth}×${finalHeight} (缩放: ${scaleRatio.toFixed(2)}倍)`);
        } else {
          console.log(`保持原始高清尺寸: ${finalWidth}×${finalHeight}`);
        }
        
        // 计算Word中的显示尺寸（比处理尺寸小）
        // Word页面可用宽度约15cm = 567像素
        const WORD_DISPLAY_WIDTH = 567; // Word中实际显示宽度
        
        let displayWidth = finalWidth;
        let displayHeight = finalHeight;
        
        // 如果图片宽度超过Word页面宽度，按比例缩小显示尺寸
        if (finalWidth > WORD_DISPLAY_WIDTH) {
          const displayScale = WORD_DISPLAY_WIDTH / finalWidth;
          displayWidth = WORD_DISPLAY_WIDTH;
          displayHeight = Math.round(finalHeight * displayScale);
          console.log(`Word显示尺寸: ${displayWidth}×${displayHeight}像素`);
        }
        
        // 创建高质量画布
        const canvas = document.createElement('canvas');
        canvas.width = finalWidth;      // 保持高清尺寸处理
        canvas.height = finalHeight;
        
        const ctx = canvas.getContext('2d');
        
        // 设置最高质量的图像缩放
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.mozImageSmoothingEnabled = true;
        ctx.webkitImageSmoothingEnabled = true;
        ctx.msImageSmoothingEnabled = true;
        
        // 判断是否是透明图片
        const isTransparentImage = src.toLowerCase().includes('.png') || 
                                  src.toLowerCase().includes('.svg');
        
        if (isTransparentImage) {
          // 透明图片：清空画布
          ctx.clearRect(0, 0, finalWidth, finalHeight);
        } else {
          // 不透明图片：使用白色背景
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, finalWidth, finalHeight);
        }
        
        // 高质量绘制图片
        ctx.drawImage(img, 0, 0, finalWidth, finalHeight);
        
        // 转换为最高质量PNG格式
        const base64 = canvas.toDataURL('image/png', 1.0).split(',')[1];
        
        resolve({
          data: base64,
          width: finalWidth,           // 图片实际处理尺寸（高清）
          height: finalHeight,
          displayWidth: displayWidth,  // Word中显示尺寸（较小）
          displayHeight: displayHeight,
          format: 'png',
          originalWidth: originalWidth,
          originalHeight: originalHeight
        });
      };
      
      img.onerror = () => {
        // 创建高质量占位图片
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 450;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(0, 0, 600, 450);
        
        ctx.fillStyle = '#666';
        ctx.font = 'bold 18px Arial, "Microsoft YaHei"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('图片加载失败', 300, 200);
        
        const base64 = canvas.toDataURL('image/png', 1.0).split(',')[1];
        resolve({
          data: base64,
          width: 600,
          height: 450,
          displayWidth: 500,
          displayHeight: 375,
          format: 'png',
          originalWidth: 600,
          originalHeight: 450
        });
      };
      
      img.src = src;
    });
  };

  // 创建图片关系XML
  const createImageRelationship = (imageId) => {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId${imageId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image${imageId}.png"/>
</Relationships>`;
  };

  // 创建文档关系XML
  const createDocumentRelationship = (imageCount) => {
    let relationships = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>`;
  
    for (let i = 1; i <= imageCount; i++) {
      relationships += `\n  <Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image${i}.png"/>`;
    }
    
    relationships += `\n</Relationships>`;
    return relationships;
  };

  // 创建图片XML内容 - 关键修改：使用display尺寸
  const createImageXml = (imageId, displayWidthEmu, displayHeightEmu, alt) => {
    return `<w:drawing>
  <wp:inline distT="0" distB="0" distL="0" distR="0">
    <wp:extent cx="${displayWidthEmu}" cy="${displayHeightEmu}"/>  <!-- 使用显示尺寸 -->
    <wp:docPr id="${imageId}" name="${alt || '图片'}" descr="${alt || ''}"/>
    <wp:cNvGraphicFramePr>
      <a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/>
    </wp:cNvGraphicFramePr>
    <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
      <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
        <pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
          <pic:nvPicPr>
            <pic:cNvPr id="${imageId}" name="${alt || '图片'}"/>
            <pic:cNvPicPr>
              <a:picLocks noChangeAspect="1" noChangeArrowheads="1"/>
            </pic:cNvPicPr>
          </pic:nvPicPr>
          <pic:blipFill>
            <a:blip r:embed="rId${imageId + 1}" cstate="print">
              <!-- 添加高质量设置 -->
              <a:extLst>
                <a:ext uri="{28A0092B-C50C-407E-A947-70E740481C1C}">
                  <a14:useLocalDpi xmlns:a14="http://schemas.microsoft.com/office/drawing/2010/main" val="0"/>
                </a:ext>
                <!-- 禁用自动压缩，保持高清 -->
                <a:ext uri="{F0B5A9E3-9F6F-4DDD-9B40-2B8F3F929428}">
                  <a14:compat14 xmlns:a14="http://schemas.microsoft.com/office/drawing/2010/main">
                    <a14:autoCompressPictures val="0"/>
                  </a14:compat14>
                </a:ext>
              </a:extLst>
            </a:blip>
            <a:stretch>
              <a:fillRect/>
            </a:stretch>
          </pic:blipFill>
          <pic:spPr bwMode="auto">
            <a:xfrm>
              <a:off x="0" y="0"/>
              <a:ext cx="${displayWidthEmu}" cy="${displayHeightEmu}"/>
            </a:xfrm>
            <a:prstGeom prst="rect">
              <a:avLst/>
            </a:prstGeom>
            <a:ln w="9525">
              <a:noFill/>
            </a:ln>
          </pic:spPr>
        </pic:pic>
      </a:graphicData>
    </a:graphic>
  </wp:inline>
</w:drawing>`;
  };

  // 转义XML特殊字符（增强版，保留换行符）
  const escapeXml = (text) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  // 处理文本中的换行符（关键修复函数）
  const processTextWithLineBreaks = (text, isHeading = false, headingLevel = 1) => {
    if (!text) return '';
    
    const escapedText = escapeXml(text);
    
    // 分割文本行
    const lines = escapedText.split('\n');
    
    // 如果只有一行或没有换行符，直接返回普通文本
    if (lines.length <= 1) {
      return `<w:t>${escapedText}</w:t>`;
    }
    
    // 多行文本，每行之间插入换行符
    let result = '';
    for (let i = 0; i < lines.length; i++) {
      if (lines[i] || i === 0) { // 允许第一行为空（段落开始就换行的情况）
        result += `<w:t>${lines[i]}</w:t>`;
      }
      
      // 如果不是最后一行，添加换行符
      if (i < lines.length - 1) {
        result += '<w:br/>';
      }
    }
    
    return result;
  };

  // 标题字号（半磅）：对齐网页 1.85 / 1.3 / 1.1rem 观感
  const headingFontSize = (level) => {
    if (level === 1) return '40'; // 20pt
    if (level === 2) return '30'; // 15pt
    if (level === 3) return '26'; // 13pt
    return '24';
  };

  // 创建段落XML：支持彩色 runs，版式对齐网页（左对齐、无首行缩进）
  const createParagraphXml = ({
    text = '',
    runs = null,
    isHeading = false,
    headingLevel = 1,
    hasImage = false,
    imageXml = '',
    isCenter = false,
  } = {}) => {
    let styleId = 'Normal';
    let fontSize = '26';

    if (isHeading) {
      styleId = `Heading${Math.min(headingLevel, 3)}`;
      fontSize = headingFontSize(headingLevel);
    }

    if (hasImage) {
      return `<w:p>
  <w:pPr>
    <w:jc w:val="center"/>
    <w:spacing w:before="120" w:after="120"/>
  </w:pPr>
  <w:r>${imageXml}</w:r>
</w:p>`;
    }

    const alignment = isCenter ? 'center' : 'left';
    const effectiveRuns =
      runs && runs.length
        ? runs.map((r) => ({
            ...r,
            size: r.size || fontSize,
            bold: isHeading ? true : r.bold,
            color: isHeading ? PAGE_COLORS.heading : r.color || PAGE_COLORS.body,
          }))
        : [
            {
              text,
              bold: isHeading,
              color: isHeading ? PAGE_COLORS.heading : PAGE_COLORS.body,
              size: fontSize,
            },
          ];

    return `<w:p>
  <w:pPr>
    <w:pStyle w:val="${styleId}"/>
    <w:jc w:val="${alignment}"/>
    <w:ind w:firstLine="0"/>
    <w:spacing w:before="${isHeading ? '200' : '60'}" w:after="${isHeading ? '120' : '100'}" w:line="360" w:lineRule="auto"/>
  </w:pPr>
  ${createRunsXml(effectiveRuns)}
</w:p>`;
  };

  // 创建完整的Word文档
  const createWordDocument = async () => {
    if (typeof document === 'undefined') {
      alert('请在浏览器环境中使用此功能');
      return;
    }
    
    setLoading(true);
    
    try {
      const documentTitle = getDocumentTitle();
      const now = new Date();

      // 只导出正文 markdown，避免导航/面包屑等「抬头」进 Word
      const contentElement = getContentElement() || document.body;
      
      // 提取图片信息
      const images = [];
      const imgElements = contentElement.querySelectorAll('img');
      
      console.log(`发现 ${imgElements.length} 张图片，开始高清处理...`);
      
      // 处理每张图片
      for (let i = 0; i < imgElements.length; i++) {
        const img = imgElements[i];
        console.log(`处理高清图片 ${i + 1}: ${img.src.substring(0, 50)}...`);
        
        try {
          // 传入img元素
          const imageData = await getImageData(img.src, img);
          images.push({
            id: i + 1,
            data: imageData.data,
            width: imageData.width,                // 实际处理尺寸
            height: imageData.height,
            displayWidth: imageData.displayWidth,  // Word显示尺寸
            displayHeight: imageData.displayHeight,
            alt: img.alt || `图片${i + 1}`,
            originalWidth: imageData.originalWidth,
            originalHeight: imageData.originalHeight
          });
          
          console.log(`图片${i + 1}: 处理尺寸 ${imageData.width}×${imageData.height}, 显示尺寸 ${imageData.displayWidth}×${imageData.displayHeight}`);
          
        } catch (error) {
          console.warn(`图片处理失败: ${img.src}`, error);
        }
      }
      
      console.log('所有图片处理完成，开始生成Word文档...');
      
      // 创建ZIP文件
      const zip = new JSZip();
      
      // 添加基本文件结构
      zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Default Extension="png" ContentType="image/png"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>
  <Override PartName="/word/fontTable.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml"/>
  <Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering.xml"/>
</Types>`);
      
      // 创建_rels文件夹
      const relsFolder = zip.folder('_rels');
      relsFolder.file('.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`);
      
      // 创建word文件夹
      const wordFolder = zip.folder('word');
      
      // 创建word/_rels文件夹
      const wordRelsFolder = wordFolder.folder('_rels');
      wordRelsFolder.file('document.xml.rels', createDocumentRelationship(images.length));
      
      // 创建media文件夹并添加图片
      const mediaFolder = wordFolder.folder('media');
      images.forEach((image, index) => {
        const imageData = atob(image.data);
        const byteArray = new Uint8Array(imageData.length);
        for (let i = 0; i < imageData.length; i++) {
          byteArray[i] = imageData.charCodeAt(i);
        }
        mediaFolder.file(`image${image.id}.png`, byteArray);
      });
      
      // 创建styles.xml - 贴近网页：正文灰黑、标题加粗、无首行缩进
      wordFolder.file('styles.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="微软雅黑" w:eastAsia="微软雅黑" w:hAnsi="微软雅黑" w:cs="微软雅黑"/>
        <w:sz w:val="26"/>
        <w:szCs w:val="26"/>
        <w:color w:val="1F2937"/>
        <w:lang w:val="zh-CN" w:eastAsia="zh-CN" w:bidi="ar-SA"/>
      </w:rPr>
    </w:rPrDefault>
    <w:pPrDefault>
      <w:pPr>
        <w:spacing w:after="100" w:line="360" w:lineRule="auto"/>
        <w:ind w:firstLine="0"/>
        <w:jc w:val="left"/>
      </w:pPr>
    </w:pPrDefault>
  </w:docDefaults>
  
  <w:style w:type="paragraph" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:qFormat/>
    <w:pPr>
      <w:spacing w:after="100" w:line="360" w:lineRule="auto"/>
      <w:ind w:firstLine="0"/>
      <w:jc w:val="left"/>
    </w:pPr>
    <w:rPr>
      <w:rFonts w:ascii="微软雅黑" w:eastAsia="微软雅黑" w:hAnsi="微软雅黑"/>
      <w:sz w:val="26"/>
      <w:szCs w:val="26"/>
      <w:color w:val="1F2937"/>
    </w:rPr>
  </w:style>
  
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="Heading 1"/>
    <w:basedOn w:val="Normal"/>
    <w:next w:val="Normal"/>
    <w:qFormat/>
    <w:pPr>
      <w:spacing w:before="240" w:after="160"/>
      <w:ind w:firstLine="0"/>
    </w:pPr>
    <w:rPr>
      <w:rFonts w:ascii="微软雅黑" w:eastAsia="微软雅黑" w:hAnsi="微软雅黑"/>
      <w:b/>
      <w:bCs/>
      <w:sz w:val="44"/>
      <w:szCs w:val="44"/>
      <w:color w:val="111111"/>
    </w:rPr>
  </w:style>
  
  <w:style w:type="paragraph" w:styleId="Heading2">
    <w:name w:val="Heading 2"/>
    <w:basedOn w:val="Normal"/>
    <w:next w:val="Normal"/>
    <w:qFormat/>
    <w:pPr>
      <w:spacing w:before="200" w:after="120"/>
      <w:ind w:firstLine="0"/>
    </w:pPr>
    <w:rPr>
      <w:rFonts w:ascii="微软雅黑" w:eastAsia="微软雅黑" w:hAnsi="微软雅黑"/>
      <w:b/>
      <w:bCs/>
      <w:sz w:val="32"/>
      <w:szCs w:val="32"/>
      <w:color w:val="111111"/>
    </w:rPr>
  </w:style>
  
  <w:style w:type="paragraph" w:styleId="Heading3">
    <w:name w:val="Heading 3"/>
    <w:basedOn w:val="Normal"/>
    <w:next w:val="Normal"/>
    <w:qFormat/>
    <w:pPr>
      <w:spacing w:before="160" w:after="80"/>
      <w:ind w:firstLine="0"/>
    </w:pPr>
    <w:rPr>
      <w:rFonts w:ascii="微软雅黑" w:eastAsia="微软雅黑" w:hAnsi="微软雅黑"/>
      <w:b/>
      <w:bCs/>
      <w:sz w:val="28"/>
      <w:szCs w:val="28"/>
      <w:color w:val="111111"/>
    </w:rPr>
  </w:style>
</w:styles>`);
      
      // 创建document.xml内容 - 添加a14命名空间
      let documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
            xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
            xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"
            xmlns:a14="http://schemas.microsoft.com/office/drawing/2010/main">
  <w:body>`;
      
      // 正文内容（不再插入「生成时间」，与网页一致）
      const elements = contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, img');
      let imageIndex = 0;

      elements.forEach((element) => {
        // 跳过下载按钮等非正文区域
        if (element.closest('.word-download-component') || element.closest('.no-print')) {
          return;
        }

        const tagName = element.tagName.toLowerCase();

        if (tagName === 'img') {
          if (images[imageIndex]) {
            const image = images[imageIndex];
            const displayWidthEmu = pixelsToEmu(image.displayWidth);
            const displayHeightEmu = pixelsToEmu(image.displayHeight);
            const imageXml = createImageXml(image.id, displayWidthEmu, displayHeightEmu, image.alt);
            documentXml += createParagraphXml({ hasImage: true, imageXml });
            if (image.alt && image.alt !== `图片${image.id}`) {
              documentXml += createParagraphXml({
                text: image.alt,
                isCenter: true,
                runs: [
                  {
                    text: image.alt,
                    color: '6B7280',
                    size: '20',
                    bold: false,
                  },
                ],
              });
            }
            imageIndex++;
          }
        } else if (tagName.match(/^h[1-6]$/)) {
          const headingLevel = parseInt(tagName[1], 10);
          const runs = extractRunsFromElement(element, {
            bold: true,
            color: PAGE_COLORS.heading,
            size: headingFontSize(headingLevel),
          });
          documentXml += createParagraphXml({
            runs,
            isHeading: true,
            headingLevel,
          });
        } else if (tagName === 'p' || tagName === 'li') {
          // 跳过仅含图片的空壳段落（图片已单独处理）
          const onlyImg =
            element.childElementCount === 1 &&
            element.querySelector('img') &&
            !(element.textContent || '').trim();
          if (onlyImg) return;

          const runs = extractRunsFromElement(element, {
            bold: false,
            color: PAGE_COLORS.body,
            size: '26',
          });
          if (!runs.length || !runs.some((r) => (r.text || '').trim())) return;

          const prefix = tagName === 'li' ? '• ' : '';
          if (prefix && runs[0]) {
            runs[0] = { ...runs[0], text: prefix + (runs[0].text || '') };
          }
          documentXml += createParagraphXml({ runs });
        }
      });
      
      documentXml += `
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
      <w:cols w:space="720"/>
      <w:docGrid w:linePitch="360"/>
      <w:rPr>
        <w:rFonts w:ascii="微软雅黑" w:eastAsia="微软雅黑" w:hAnsi="微软雅黑"/>
      </w:rPr>
    </w:sectPr>
  </w:body>
</w:document>`;
      
      wordFolder.file('document.xml', documentXml);
      
      // 添加其他必要的XML文件
      wordFolder.file('settings.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:defaultTabStop w:val="720"/>
  <w:autoHyphenation w:val="false"/>
  <w:compat>
    <w:doNotExpandShiftReturn/>
    <w:compatSetting w:name="useWord2013TrackBottomHyphenation" w:uri="http://schemas.microsoft.com/office/word" w:val="1"/>
  </w:compat>
  <!-- 设置中文排版 -->
  <w:autoHyphenation w:val="0"/>
  <w:consecutiveHyphenLimit w:val="0"/>
  <w:hyphenationZone w:val="0"/>
  <w:doNotHyphenateCaps w:val="1"/>
</w:settings>`);
      
      wordFolder.file('fontTable.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:fonts xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:font w:name="微软雅黑">
    <w:altName w:val="Microsoft YaHei"/>
    <w:panose1 w:val="020B0604020202020204"/>
    <w:charset w:val="86"/>
    <w:family w:val="auto"/>
    <w:pitch w:val="variable"/>
    <w:sig w:usb0="A00002EF" w:usb1="38CF7CFA" w:usb2="00000016" w:usb3="00000000" w:csb0="00040001" w:csb1="00000000"/>
  </w:font>
  <w:font w:name="Times New Roman">
    <w:panose1 w:val="02020603050405020304"/>
    <w:charset w:val="00"/>
    <w:family w:val="roman"/>
    <w:pitch w:val="variable"/>
    <w:sig w:usb0="E0002AFF" w:usb1="C0007841" w:usb2="00000009" w:usb3="00000000" w:csb0="000001FF" w:csb1="00000000"/>
  </w:font>
</w:fonts>`);
      
      wordFolder.file('numbering.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:abstractNum w:abstractNumId="0">
    <w:multiLevelType w:val="hybridMultilevel"/>
    <w:lvl w:ilvl="0">
      <w:start w:val="1"/>
      <w:numFmt w:val="bullet"/>
      <w:lvlText w:val="•"/>
      <w:lvlJc w:val="left"/>
      <w:pPr>
        <w:ind w:left="720" w:hanging="360"/>
      </w:pPr>
      <w:rPr>
        <w:rFonts w:ascii="Symbol" w:hAnsi="Symbol" w:hint="default"/>
      </w:rPr>
    </w:lvl>
  </w:abstractNum>
  <w:num w:numId="1">
    <w:abstractNumId w:val="0"/>
  </w:num>
</w:numbering>`);
      
      // 生成ZIP文件
      const content = await zip.generateAsync({ type: 'blob' });
      
      // 保存为Word文档
      const safeFileName = documentTitle
        .replace(/[<>:"/\\|?*]/g, '_')
        .replace(/\s+/g, '_')
        .substring(0, 50);
      
      saveAs(content, `${safeFileName}_${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}.docx`);
      
      console.log('Word文档生成完成！图片高清处理，Word中显示适中');
      
    } catch (error) {
      console.error('生成Word文档失败:', error);
      alert(`生成Word文档失败: ${error.message || '未知错误'}\n请确保页面图片可以正常访问。`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div 
        className="word-download-component no-print" // 添加这两个类名
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginTop: '80px',
          marginLeft: '40px',
        }}
      >
        <div style={{
          display: 'flex',
          gap: '30px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={createWordDocument}
            disabled={loading || pdfLoading}
            style={{
              padding: '14px 28px',
              backgroundColor: loading ? '#bfbfbf' : '#1890ff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '15px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexShrink: 0,
              minWidth: '190px',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              boxShadow: loading ? 'none' : '0 4px 12px rgba(24, 144, 255, 0.3)'
            }}
            onMouseEnter={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
          >
            {loading ? (
              <>
                <div style={{
                  width: '18px',
                  height: '18px',
                  border: '2px solid white',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                正在生成Word文档...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                  <path d="M16 13H8v-2h8v2zm0 4H8v-2h8v2zm-4-8H8V7h4v2z"/>
                </svg>
                下载Word版
              </>
            )}
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={pdfLoading || loading}
            style={{
              padding: '14px 28px',
              backgroundColor: pdfLoading ? '#bfbfbf' : '#52c41a',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: pdfLoading ? 'not-allowed' : 'pointer',
              fontSize: '15px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexShrink: 0,
              minWidth: '180px',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              boxShadow: pdfLoading ? 'none' : '0 4px 12px rgba(82, 196, 26, 0.3)'
            }}
            onMouseEnter={(e) => !pdfLoading && (e.target.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => !pdfLoading && (e.target.style.transform = 'translateY(0)')}
          >
            {pdfLoading ? (
              <>
                <div style={{
                  width: '18px',
                  height: '18px',
                  border: '2px solid white',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                正在生成PDF...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
                </svg>
                下载PDF版
              </>
            )}
          </button>
        </div>
      </div>
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

export default WordDownloadWithPrint;