import React, { useEffect, useState } from 'react'
import { toast } from 'yggjs_rtoast/tech'
import type { ToastData } from 'yggjs_rtoast/tech'

export const ToastDemoPage: React.FC = () => {
  const [toasts, setToasts] = useState<ToastData[]>([])
  const { success, error, warning, info } = toast
  const [customMessage, setCustomMessage] = useState('这是一条自定义消息')
  const [duration, setDuration] = useState(4000)

  useEffect(() => {
    // 订阅全局 toast 变化，仅用于示例展示数量
    const unsubscribe = toast.subscribe((list) => setToasts([...list]))
    return unsubscribe
  }, [])

  const handleBasicToasts = () => {
    success('操作成功！数据已保存')
    setTimeout(() => error('网络连接失败，请检查网络设置'), 500)
    setTimeout(() => warning('磁盘空间不足，建议清理缓存'), 1000)
    setTimeout(() => info('系统将在5分钟后进行维护'), 1500)
  }

  const handleSimpleTest = () => {
    console.log('点击了测试按钮')
    const id = success('测试消息 - ' + new Date().toLocaleTimeString())
    console.log('创建了Toast，ID:', id)
  }

  const handleCustomToast = () => {
    toast.toast(customMessage, {
      type: 'info',
      duration: duration,
      closable: true,
      animation: 'bounce',
      pauseOnHover: true,
    })
  }

  const handlePersistentToast = () => {
    toast.toast('这是一个持久化消息，不会自动消失', {
      type: 'warning',
      duration: 0,
      closable: true,
    })
  }

  const handleCustomIcon = () => {
    success('自定义图标消息', {
      icon: <span style={{ fontSize: '20px' }}>🎉</span>,
    })
  }

  const handleLongMessage = () => {
    info(
      '这是一条很长的消息内容，用来测试组件在处理长文本时的表现。消息内容可能包含多行文本，组件应该能够正确地显示和处理这些内容。',
      { duration: 6000 }
    )
  }

  const handleClickableToast = () => {
    toast.toast('点击这条消息查看详情', {
      type: 'info',
      onClick: () => {
        alert('您点击了消息！')
      },
      duration: 8000,
    })
  }

  const demoSections = [
    {
      title: '基本类型',
      description: '展示四种基本的消息类型',
      action: handleBasicToasts,
      buttonText: '显示基本类型',
      buttonClass: 'tech-button',
    },
    {
      title: '自定义消息',
      description: '自定义消息内容和持续时间',
      action: handleCustomToast,
      buttonText: '显示自定义消息',
      buttonClass: 'tech-button',
      customControls: (
        <div style={{ marginTop: '16px' }}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', color: '#ccc' }}>
              消息内容：
            </label>
            <input
              type="text"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '4px',
                color: '#fff',
                fontSize: '14px',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', color: '#ccc' }}>
              持续时间：{duration}ms
            </label>
            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      ),
    },
    {
      title: '持久化消息',
      description: '不会自动消失的消息，需要手动关闭',
      action: handlePersistentToast,
      buttonText: '显示持久化消息',
      buttonClass: 'tech-button--warning',
    },
    {
      title: '自定义图标',
      description: '使用自定义图标的消息',
      action: handleCustomIcon,
      buttonText: '显示自定义图标',
      buttonClass: 'tech-button--success',
    },
    {
      title: '长消息内容',
      description: '测试长文本内容的显示效果',
      action: handleLongMessage,
      buttonText: '显示长消息',
      buttonClass: 'tech-button',
    },
    {
      title: '可点击消息',
      description: '点击消息可以触发自定义事件',
      action: handleClickableToast,
      buttonText: '显示可点击消息',
      buttonClass: 'tech-button',
    },
  ]

  return (
    <div>
      <div className="tech-card">
        <h2 className="tech-subtitle">Toast 组件演示</h2>
        <p style={{ marginBottom: '1.5rem', color: '#ccc', lineHeight: '1.6' }}>
          这里展示了 YggJS RToast 组件的各种功能和用法。
          点击下面的按钮来体验不同类型的消息通知。
        </p>
        
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <button className="tech-button tech-button--success" onClick={handleSimpleTest}>
            🧪 简单测试
          </button>
          <button className="tech-button--error" onClick={() => toast.dismissAll()}>
            清除所有消息
          </button>
          <div style={{ color: '#00d4ff', fontSize: '14px' }}>
            当前Toast数量: {toasts.length}
          </div>
        </div>

        {/* 调试信息 */}
        {toasts.length > 0 && (
          <div className="tech-card" style={{ margin: '16px 0', background: 'rgba(0, 212, 255, 0.1)' }}>
            <h4 style={{ color: '#00d4ff', marginBottom: '8px' }}>调试信息</h4>
            <pre style={{ fontSize: '12px', color: '#ccc', overflow: 'auto' }}>
              {JSON.stringify(toasts.map(t => ({ id: t.id, type: t.type, message: t.message })), null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div className="tech-grid">
        {demoSections.map((section, index) => (
          <div key={index} className="tech-card" style={{ margin: 0 }}>
            <h3 style={{ color: '#00d4ff', marginBottom: '0.5rem' }}>
              {section.title}
            </h3>
            <p style={{ color: '#ccc', lineHeight: '1.5', marginBottom: '1rem' }}>
              {section.description}
            </p>
            
            {section.customControls}
            
            <button
              className={section.buttonClass}
              onClick={section.action}
              style={{ marginTop: section.customControls ? '16px' : '0' }}
            >
              {section.buttonText}
            </button>
          </div>
        ))}
      </div>

      <div className="tech-card">
        <h2 className="tech-subtitle">使用提示</h2>
        <ul style={{ color: '#ccc', lineHeight: '1.6', paddingLeft: '20px' }}>
          <li>消息默认会在4秒后自动消失</li>
          <li>鼠标悬停在消息上时会暂停自动消失计时</li>
          <li>点击消息右上角的 × 按钮可以手动关闭</li>
          <li>消息支持多种动画效果：滑入、淡入、弹跳、缩放</li>
          <li>可以同时显示多条消息，支持堆叠显示</li>
          <li>支持自定义图标、样式和点击事件</li>
        </ul>
      </div>
    </div>
  )
}
