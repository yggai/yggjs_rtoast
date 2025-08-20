
import { Link } from 'react-router-dom'

export const HomePage: React.FC = () => {
  const features = [
    {
      title: '🎨 科技风设计',
      description: '采用现代科技风格设计，支持渐变、发光效果和流畅动画',
    },
    {
      title: '⚡ 高性能',
      description: '轻量级设计，零依赖，打包后仅几KB大小',
    },
    {
      title: '🔧 易于使用',
      description: '简单的API设计，支持TypeScript，开箱即用',
    },
    {
      title: '🎯 功能丰富',
      description: '支持多种类型、位置、动画效果和自定义配置',
    },
    {
      title: '📱 响应式',
      description: '完美适配移动端和桌面端，支持触摸操作',
    },
    {
      title: '♿ 无障碍',
      description: '遵循WCAG标准，支持键盘导航和屏幕阅读器',
    },
  ]

  const quickLinks = [
    {
      title: 'GitHub',
      url: 'https://github.com/yuangungun/yggjs_rtoast',
      icon: '📦',
      description: '查看源码和贡献代码',
    },
    {
      title: 'NPM',
      url: 'https://www.npmjs.com/package/yggjs_rtoast',
      icon: '📋',
      description: '下载和安装包',
    },
    {
      title: '问题反馈',
      url: 'https://github.com/yuangungun/yggjs_rtoast/issues',
      icon: '🐛',
      description: '报告问题和建议',
    },
    {
      title: '更新日志',
      url: 'https://github.com/yuangungun/yggjs_rtoast/releases',
      icon: '📝',
      description: '查看版本更新记录',
    },
  ]

  return (
    <div>
      <div className="tech-card">
        <h2 className="tech-subtitle">欢迎使用 YggJS RToast</h2>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
          YggJS RToast 是一个专为React应用设计的现代化消息通知组件库。
          它采用科技风格的视觉设计，提供丰富的功能和优秀的用户体验。
        </p>
        
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/demo" className="tech-button">
            🚀 开始体验
          </Link>
          <Link to="/docs" className="tech-button">
            📚 查看文档
          </Link>
        </div>
      </div>

      <div className="tech-card">
        <h2 className="tech-subtitle">核心特性</h2>
        <div className="tech-grid">
          {features.map((feature, index) => (
            <div key={index} className="tech-card" style={{ margin: 0 }}>
              <h3 style={{ color: '#00d4ff', marginBottom: '0.5rem' }}>
                {feature.title}
              </h3>
              <p style={{ color: '#ccc', lineHeight: '1.5' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="tech-card">
        <h2 className="tech-subtitle">快速链接</h2>
        <div className="tech-grid">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tech-card"
              style={{ 
                margin: 0, 
                textDecoration: 'none', 
                color: 'inherit',
                display: 'block'
              }}
            >
              <h3 style={{ color: '#00d4ff', marginBottom: '0.5rem' }}>
                <span style={{ marginRight: '8px' }}>{link.icon}</span>
                {link.title}
              </h3>
              <p style={{ color: '#ccc', lineHeight: '1.5' }}>
                {link.description}
              </p>
            </a>
          ))}
        </div>
      </div>

      <div className="tech-card">
        <h2 className="tech-subtitle">快速开始</h2>
        <div className="tech-code">
          {`# 安装
npm install yggjs_rtoast

# 或使用 yarn
yarn add yggjs_rtoast

# 或使用 pnpm
pnpm add yggjs_rtoast`}
        </div>
        
        <div className="tech-code">
          {`// 基本使用
import { ToastProvider, useToast } from 'yggjs_rtoast/tech'

function App() {
  return (
    <ToastProvider>
      <YourComponent />
    </ToastProvider>
  )
}

function YourComponent() {
  const { success, error, warning, info } = useToast()
  
  return (
    <div>
      <button onClick={() => success('操作成功！')}>
        显示成功消息
      </button>
    </div>
  )
}`}
        </div>
      </div>
    </div>
  )
}
