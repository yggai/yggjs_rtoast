# YggJS RToast

<div align="center">

![YggJS RToast](https://img.shields.io/badge/YggJS-RToast-blue?style=for-the-badge)
![Version](https://img.shields.io/npm/v/yggjs_rtoast?style=for-the-badge)
![License](https://img.shields.io/npm/l/yggjs_rtoast?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge)

**专为React打造的科技风消息通知组件库**

[📚 文档](#文档) • [🚀 快速开始](#快速开始) • [💡 示例](#示例) • [🎨 特性](#特性)

</div>

## 🎯 特性

- 🎨 **科技风设计** - 现代化的科技风格UI，支持渐变、发光效果和流畅动画
- ⚡ **高性能** - 轻量级设计，零依赖，打包后仅几KB大小
- 🔧 **易于使用** - 简单的API设计，支持TypeScript，开箱即用
- 🎯 **功能丰富** - 支持多种类型、位置、动画效果和自定义配置
- 📱 **响应式** - 完美适配移动端和桌面端，支持触摸操作
- ♿ **无障碍** - 遵循WCAG标准，支持键盘导航和屏幕阅读器
- 🌈 **主题支持** - 内置科技风主题，支持自定义主题扩展

## 📦 安装

```bash
# 使用 npm
npm install yggjs_rtoast

# 使用 yarn
yarn add yggjs_rtoast

# 使用 pnpm
pnpm add yggjs_rtoast
```

## 🚀 快速开始

### 1. 基本使用

```tsx
import { ToastProvider, useToast } from 'yggjs_rtoast/tech'

// 1. 在应用根组件中添加 ToastProvider
function App() {
  return (
    <ToastProvider>
      <YourComponent />
    </ToastProvider>
  )
}

// 2. 在组件中使用 useToast Hook
function YourComponent() {
  const { success, error, warning, info } = useToast()

  return (
    <div>
      <button onClick={() => success('操作成功！')}>
        显示成功消息
      </button>
      <button onClick={() => error('操作失败！')}>
        显示错误消息
      </button>
      <button onClick={() => warning('请注意！')}>
        显示警告消息
      </button>
      <button onClick={() => info('提示信息')}>
        显示信息消息
      </button>
    </div>
  )
}
```

### 2. 高级配置

```tsx
import { ToastProvider, useToast } from 'yggjs_rtoast/tech'

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
}

function YourComponent() {
  const { toast, dismissAll } = useToast()

  const showCustomToast = () => {
    toast('自定义消息', {
      type: 'success',
      duration: 6000,
      icon: <span>🎉</span>,
      onClick: () => console.log('Toast clicked!'),
      onClose: () => console.log('Toast closed!'),
      animation: 'bounce'
    })
  }

  return (
    <div>
      <button onClick={showCustomToast}>
        显示自定义Toast
      </button>
      <button onClick={dismissAll}>
        清除所有Toast
      </button>
    </div>
  )
}
```

## 📚 API 文档

### ToastProvider

ToastProvider 是一个React Context Provider，用于管理全局的Toast状态。

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `position` | `ToastPosition` | `'top-right'` | Toast显示位置 |
| `maxToasts` | `number` | `5` | 最大显示数量 |
| `className` | `string` | - | 容器样式类名 |
| `style` | `React.CSSProperties` | - | 容器内联样式 |
| `defaultOptions` | `Partial<ToastOptions>` | - | 全局默认配置 |

#### ToastPosition 类型

```typescript
type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
```

### useToast Hook

useToast 是一个自定义Hook，提供了显示和管理Toast的方法。

#### 返回值

| 方法 | 类型 | 说明 |
|------|------|------|
| `toast` | `(message: ReactNode, options?: ToastOptions) => string` | 显示自定义Toast |
| `success` | `(message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string` | 显示成功Toast |
| `error` | `(message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string` | 显示错误Toast |
| `warning` | `(message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string` | 显示警告Toast |
| `info` | `(message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string` | 显示信息Toast |
| `dismiss` | `(id: string) => void` | 关闭指定Toast |
| `dismissAll` | `() => void` | 关闭所有Toast |
| `toasts` | `ToastData[]` | 当前Toast列表 |

### ToastOptions

Toast配置选项，用于自定义单个Toast的行为和外观。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` | Toast类型 |
| `duration` | `number` | `4000` | 自动关闭时间(ms)，0表示不自动关闭 |
| `closable` | `boolean` | `true` | 是否显示关闭按钮 |
| `animation` | `'slide' \| 'fade' \| 'bounce' \| 'zoom'` | `'slide'` | 动画类型 |
| `pauseOnHover` | `boolean` | `true` | 鼠标悬停时暂停自动关闭 |
| `icon` | `ReactNode` | - | 自定义图标 |
| `className` | `string` | - | 自定义样式类名 |
| `style` | `React.CSSProperties` | - | 自定义内联样式 |
| `onClick` | `() => void` | - | 点击事件回调 |
| `onClose` | `() => void` | - | 关闭事件回调 |

## 💡 示例

### 基本类型

```tsx
function BasicExample() {
  const { success, error, warning, info } = useToast()

  return (
    <div>
      <button onClick={() => success('操作成功！')}>成功</button>
      <button onClick={() => error('操作失败！')}>错误</button>
      <button onClick={() => warning('请注意！')}>警告</button>
      <button onClick={() => info('提示信息')}>信息</button>
    </div>
  )
}
```

### 自定义配置

```tsx
function CustomExample() {
  const { toast } = useToast()

  const showCustomToast = () => {
    toast('这是一个自定义Toast', {
      type: 'success',
      duration: 6000,
      animation: 'bounce',
      icon: <span>🎉</span>,
      onClick: () => alert('Toast被点击了！'),
      style: { background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)' }
    })
  }

  return <button onClick={showCustomToast}>自定义Toast</button>
}
```

### 持久化消息

```tsx
function PersistentExample() {
  const { toast, dismiss } = useToast()

  const showPersistentToast = () => {
    const id = toast('这条消息不会自动消失', {
      type: 'warning',
      duration: 0, // 不自动关闭
      closable: true
    })

    // 5秒后手动关闭
    setTimeout(() => dismiss(id), 5000)
  }

  return <button onClick={showPersistentToast}>持久化Toast</button>
}
```

### 批量操作

```tsx
function BatchExample() {
  const { success, error, dismissAll } = useToast()

  const showMultipleToasts = () => {
    success('第一条消息')
    setTimeout(() => success('第二条消息'), 500)
    setTimeout(() => error('第三条消息'), 1000)
  }

  return (
    <div>
      <button onClick={showMultipleToasts}>显示多条消息</button>
      <button onClick={dismissAll}>清除所有消息</button>
    </div>
  )
}
```

## 🎨 主题定制

YggJS RToast 使用CSS变量，您可以轻松自定义主题：

```css
:root {
  /* 成功类型 */
  --ygg-toast-success-bg: linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.9) 100%);
  --ygg-toast-success-border: rgba(16, 185, 129, 0.3);

  /* 错误类型 */
  --ygg-toast-error-bg: linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(220, 38, 38, 0.9) 100%);
  --ygg-toast-error-border: rgba(239, 68, 68, 0.3);

  /* 警告类型 */
  --ygg-toast-warning-bg: linear-gradient(135deg, rgba(245, 158, 11, 0.9) 0%, rgba(217, 119, 6, 0.9) 100%);
  --ygg-toast-warning-border: rgba(245, 158, 11, 0.3);

  /* 信息类型 */
  --ygg-toast-info-bg: linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(37, 99, 235, 0.9) 100%);
  --ygg-toast-info-border: rgba(59, 130, 246, 0.3);
}
```

## 🛠️ 开发

### 本地开发

```bash
# 克隆项目
git clone https://github.com/yuangungun/yggjs_rtoast.git
cd yggjs_rtoast

# 安装依赖
pnpm install

# 运行测试
pnpm test

# 构建项目
pnpm build

# 运行示例项目
pnpm example
```

### 项目结构

```
yggjs_rtoast/
├── src/                    # 源码目录
│   ├── tech/              # 科技风主题
│   │   ├── components/    # 组件
│   │   ├── hooks/         # Hooks
│   │   ├── types/         # 类型定义
│   │   └── styles/        # 样式文件
│   └── index.ts           # 主入口
├── __tests__/             # 测试文件
├── example/               # 示例项目
├── dist/                  # 构建输出
└── docs/                  # 文档
```

### 运行测试

```bash
# 运行所有测试
pnpm test

# 运行测试并生成覆盖率报告
pnpm test:coverage

# 监听模式运行测试
pnpm test:watch
```

## 🤝 贡献

我们欢迎所有形式的贡献！请查看 [贡献指南](CONTRIBUTING.md) 了解详细信息。

### 贡献方式

1. Fork 本项目
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

### 开发规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 规则
- 编写单元测试
- 更新相关文档

## 📄 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

## 📞 联系我们

- 作者：源滚滚
- GitHub：[https://github.com/yuangungun/yggjs_rtoast](https://github.com/yuangungun/yggjs_rtoast)
- 问题反馈：[https://github.com/yuangungun/yggjs_rtoast/issues](https://github.com/yuangungun/yggjs_rtoast/issues)

---

<div align="center">

**如果这个项目对您有帮助，请给我们一个 ⭐️**

Made with ❤️ by [源滚滚](https://github.com/yuangungun)

</div>
