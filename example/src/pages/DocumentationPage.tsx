

export const DocumentationPage: React.FC = () => {
  return (
    <div>
      <div className="tech-card">
        <h2 className="tech-subtitle">API 文档</h2>
        <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          YggJS RToast 提供了简洁而强大的API，让您可以轻松地在React应用中添加美观的消息通知。
        </p>
      </div>

      <div className="tech-card">
        <h3 style={{ color: '#00d4ff', marginBottom: '1rem' }}>ToastProvider</h3>
        <p style={{ color: '#ccc', marginBottom: '1rem' }}>
          ToastProvider 是一个React Context Provider，用于管理全局的Toast状态。
        </p>
        
        <div className="tech-code">
{`import { ToastProvider } from 'yggjs_rtoast/tech'

function App() {
  return (
    <ToastProvider
      position="top-right"
      maxToasts={5}
      defaultOptions={{
        duration: 4000,
        closable: true,
        animation: 'slide',
        pauseOnHover: true
      }}
    >
      <YourApp />
    </ToastProvider>
  )
}`}
        </div>

        <h4 style={{ color: '#00d4ff', margin: '1.5rem 0 0.5rem' }}>Props</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#ccc' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>属性</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>类型</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>默认值</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '8px' }}>position</td>
              <td style={{ padding: '8px' }}>ToastPosition</td>
              <td style={{ padding: '8px' }}>'top-right'</td>
              <td style={{ padding: '8px' }}>Toast显示位置</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '8px' }}>maxToasts</td>
              <td style={{ padding: '8px' }}>number</td>
              <td style={{ padding: '8px' }}>5</td>
              <td style={{ padding: '8px' }}>最大显示数量</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '8px' }}>defaultOptions</td>
              <td style={{ padding: '8px' }}>ToastOptions</td>
              <td style={{ padding: '8px' }}>-</td>
              <td style={{ padding: '8px' }}>全局默认配置</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="tech-card">
        <h3 style={{ color: '#00d4ff', marginBottom: '1rem' }}>useToast Hook</h3>
        <p style={{ color: '#ccc', marginBottom: '1rem' }}>
          useToast 是一个自定义Hook，提供了显示和管理Toast的方法。
        </p>
        
        <div className="tech-code">
{`import { useToast } from 'yggjs_rtoast/tech'

function MyComponent() {
  const { toast, success, error, warning, info, dismiss, dismissAll } = useToast()
  
  const handleClick = () => {
    success('操作成功！')
  }
  
  return <button onClick={handleClick}>点击我</button>
}`}
        </div>

        <h4 style={{ color: '#00d4ff', margin: '1.5rem 0 0.5rem' }}>返回值</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#ccc' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>方法</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>类型</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '8px' }}>toast</td>
              <td style={{ padding: '8px' }}>(message, options?) =&gt; string</td>
              <td style={{ padding: '8px' }}>显示自定义Toast</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '8px' }}>success</td>
              <td style={{ padding: '8px' }}>(message, options?) =&gt; string</td>
              <td style={{ padding: '8px' }}>显示成功Toast</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '8px' }}>error</td>
              <td style={{ padding: '8px' }}>(message, options?) =&gt; string</td>
              <td style={{ padding: '8px' }}>显示错误Toast</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '8px' }}>warning</td>
              <td style={{ padding: '8px' }}>(message, options?) =&gt; string</td>
              <td style={{ padding: '8px' }}>显示警告Toast</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '8px' }}>info</td>
              <td style={{ padding: '8px' }}>(message, options?) =&gt; string</td>
              <td style={{ padding: '8px' }}>显示信息Toast</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '8px' }}>dismiss</td>
              <td style={{ padding: '8px' }}>(id: string) =&gt; void</td>
              <td style={{ padding: '8px' }}>关闭指定Toast</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '8px' }}>dismissAll</td>
              <td style={{ padding: '8px' }}>() =&gt; void</td>
              <td style={{ padding: '8px' }}>关闭所有Toast</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="tech-card">
        <h3 style={{ color: '#00d4ff', marginBottom: '1rem' }}>ToastOptions</h3>
        <p style={{ color: '#ccc', marginBottom: '1rem' }}>
          ToastOptions 用于配置单个Toast的行为和外观。
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#ccc' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>属性</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>类型</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>默认值</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '8px' }}>type</td>
              <td style={{ padding: '8px' }}>'success' | 'error' | 'warning' | 'info'</td>
              <td style={{ padding: '8px' }}>'info'</td>
              <td style={{ padding: '8px' }}>Toast类型</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '8px' }}>duration</td>
              <td style={{ padding: '8px' }}>number</td>
              <td style={{ padding: '8px' }}>4000</td>
              <td style={{ padding: '8px' }}>自动关闭时间(ms)，0表示不自动关闭</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '8px' }}>closable</td>
              <td style={{ padding: '8px' }}>boolean</td>
              <td style={{ padding: '8px' }}>true</td>
              <td style={{ padding: '8px' }}>是否显示关闭按钮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '8px' }}>animation</td>
              <td style={{ padding: '8px' }}>'slide' | 'fade' | 'bounce' | 'zoom'</td>
              <td style={{ padding: '8px' }}>'slide'</td>
              <td style={{ padding: '8px' }}>动画类型</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '8px' }}>pauseOnHover</td>
              <td style={{ padding: '8px' }}>boolean</td>
              <td style={{ padding: '8px' }}>true</td>
              <td style={{ padding: '8px' }}>鼠标悬停时暂停自动关闭</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '8px' }}>icon</td>
              <td style={{ padding: '8px' }}>ReactNode</td>
              <td style={{ padding: '8px' }}>-</td>
              <td style={{ padding: '8px' }}>自定义图标</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '8px' }}>onClick</td>
              <td style={{ padding: '8px' }}>() =&gt; void</td>
              <td style={{ padding: '8px' }}>-</td>
              <td style={{ padding: '8px' }}>点击事件回调</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '8px' }}>onClose</td>
              <td style={{ padding: '8px' }}>() =&gt; void</td>
              <td style={{ padding: '8px' }}>-</td>
              <td style={{ padding: '8px' }}>关闭事件回调</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="tech-card">
        <h3 style={{ color: '#00d4ff', marginBottom: '1rem' }}>TypeScript 支持</h3>
        <p style={{ color: '#ccc', marginBottom: '1rem' }}>
          YggJS RToast 完全支持TypeScript，提供了完整的类型定义。
        </p>
        
        <div className="tech-code">
{`import { 
  ToastProvider, 
  useToast, 
  ToastOptions, 
  ToastPosition,
  ToastType 
} from 'yggjs_rtoast/tech'

// 所有类型都有完整的TypeScript支持
const options: ToastOptions = {
  type: 'success',
  duration: 3000,
  closable: true
}`}
        </div>
      </div>
    </div>
  )
}
