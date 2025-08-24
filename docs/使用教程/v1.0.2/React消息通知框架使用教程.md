# React消息通知框架使用教程

> 版本：v1.0.2  
> 作者：源滚滚  
> 最后更新：2025年8月

## 📖 目录

- [简介](#简介)
- [快速开始](#快速开始)
- [基础使用](#基础使用)
- [高级配置](#高级配置)
- [API详解](#api详解)
- [样式定制](#样式定制)
- [最佳实践](#最佳实践)
- [常见问题](#常见问题)
- [更新日志](#更新日志)

## 🎯 简介

**yggjs_rtoast** 是一个专为React应用打造的现代化消息通知组件库，具有以下特点：

### ✨ 核心特性

- 🚀 **零依赖**：不依赖任何第三方库，包体积小
- 💎 **TypeScript支持**：完整的类型定义，开发体验极佳
- 🎨 **高度可定制**：支持自定义样式、动画、位置等
- 📱 **响应式设计**：完美适配移动端和桌面端
- ⚡ **高性能**：内置缓存机制和性能优化
- 🌈 **科技主题**：内置酷炫的科技风格设计
- 🛡️ **可靠稳定**：100%测试覆盖率，生产就绪

### 🎪 支持的功能

- **5种消息类型**：success、error、warning、info、debug
- **6种显示位置**：顶部/底部 × 左中右
- **4种动画效果**：滑动、淡入、弹跳、缩放
- **智能交互**：自动关闭、手动关闭、悬停暂停
- **无障碍支持**：符合ARIA标准，屏幕阅读器友好

## 🚀 快速开始

### 安装

使用 npm：
```bash
npm install yggjs_rtoast
```

使用 yarn：
```bash
yarn add yggjs_rtoast
```

使用 pnpm：
```bash
pnpm add yggjs_rtoast
```

### 最简单的例子

只需要2行代码，即可在你的React应用中显示消息通知：

```tsx
import { toast } from 'yggjs_rtoast/tech'

// 显示一条成功消息
toast.success('操作成功！')
```

就是这么简单！🎉

## 📚 基础使用

### 1. 导入方式

```tsx
// 方式一：导入全局toast实例（推荐）
import { toast } from 'yggjs_rtoast/tech'

// 方式二：导入默认实例
import toast from 'yggjs_rtoast/tech'

// 方式三：导入类型（TypeScript用户）
import { ToastType, ToastOptions } from 'yggjs_rtoast/tech'
```

### 2. 基本消息类型

```tsx
import { toast } from 'yggjs_rtoast/tech'

function MyComponent() {
  const handleClick = () => {
    // 成功消息（绿色）
    toast.success('保存成功！')
    
    // 错误消息（红色）
    toast.error('网络错误，请重试')
    
    // 警告消息（橙色）
    toast.warning('磁盘空间不足')
    
    // 信息消息（蓝色）
    toast.info('有新版本可用')
    
    // 调试消息（灰色）
    toast.debug('调试信息：API响应时间 125ms')
  }

  return (
    <button onClick={handleClick}>
      显示消息通知
    </button>
  )
}
```

### 3. 通用方法

除了类型化的方法，还可以使用通用的 `toast()` 方法：

```tsx
import { toast } from 'yggjs_rtoast/tech'

// 使用通用方法，手动指定类型
toast('自定义消息', { type: 'success' })
toast('这是一条信息', { type: 'info' })
```

### 4. 设置持续时间

```tsx
import { toast } from 'yggjs_rtoast/tech'

// 3秒后自动关闭
toast.success('3秒后消失', { duration: 3000 })

// 永不自动关闭（需要手动关闭）
toast.info('需要手动关闭', { duration: 0 })

// 使用预设的持续时间常量
import { SHORT_DURATION, MEDIUM_DURATION, LONG_DURATION } from 'yggjs_rtoast/tech'

toast.success('短时间显示', { duration: SHORT_DURATION })  // 3秒
toast.info('中等时间显示', { duration: MEDIUM_DURATION })   // 5秒
toast.warning('长时间显示', { duration: LONG_DURATION })   // 8秒
```

### 5. 控制关闭按钮

```tsx
import { toast } from 'yggjs_rtoast/tech'

// 显示关闭按钮（默认）
toast.success('可以手动关闭')

// 不显示关闭按钮
toast.info('不能手动关闭', { closable: false })
```

## ⚙️ 高级配置

### 1. 自定义动画效果

```tsx
import { toast } from 'yggjs_rtoast/tech'

// 滑动动画（默认）
toast.success('滑动进入', { animation: 'slide' })

// 淡入动画
toast.info('淡入效果', { animation: 'fade' })

// 弹跳动画
toast.success('弹跳效果', { animation: 'bounce' })

// 缩放动画
toast.warning('缩放效果', { animation: 'zoom' })
```

### 2. 自定义图标

```tsx
import { toast } from 'yggjs_rtoast/tech'

// 使用自定义图标
toast.success('支付成功', {
  icon: <span>💰</span>
})

// 使用React组件作为图标
const CustomIcon = () => <svg>...</svg>

toast.info('自定义图标', {
  icon: <CustomIcon />
})

// 不显示图标
toast.info('无图标消息', {
  icon: null
})
```

### 3. 添加交互事件

```tsx
import { toast } from 'yggjs_rtoast/tech'

// 点击事件
toast.info('点击查看详情', {
  onClick: () => {
    console.log('用户点击了消息')
    // 跳转到详情页
    window.open('/details')
  }
})

// 关闭事件
toast.success('操作完成', {
  onClose: () => {
    console.log('消息被关闭了')
    // 执行清理工作
  }
})

// 组合使用
toast.warning('确认删除？', {
  duration: 0,  // 不自动关闭
  onClick: () => {
    // 执行删除操作
    performDelete()
  },
  onClose: () => {
    console.log('用户取消了删除')
  }
})
```

### 4. 悬停控制

```tsx
import { toast } from 'yggjs_rtoast/tech'

// 鼠标悬停时暂停自动关闭（默认开启）
toast.success('悬停暂停', { pauseOnHover: true })

// 禁用悬停暂停
toast.info('不会暂停', { pauseOnHover: false })
```

### 5. 自定义样式

```tsx
import { toast } from 'yggjs_rtoast/tech'

// 使用CSS类名
toast.success('自定义样式', {
  className: 'my-custom-toast'
})

// 使用内联样式
toast.info('内联样式', {
  style: {
    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
    color: 'white',
    fontWeight: 'bold'
  }
})
```

### 6. 手动控制消息

```tsx
import { toast } from 'yggjs_rtoast/tech'

// 获取消息ID
const toastId = toast.success('这条消息可以手动关闭')

// 手动关闭指定消息
setTimeout(() => {
  toast.dismiss(toastId)
}, 2000)

// 关闭所有消息
const handleClearAll = () => {
  toast.dismissAll()
}
```

## 📋 API详解

### Toast实例方法

| 方法 | 参数 | 返回值 | 描述 |
|------|------|--------|------|
| `toast(message, options?)` | `message: ReactNode`, `options?: ToastOptions` | `string` | 显示通用消息 |
| `success(message, options?)` | `message: ReactNode`, `options?: Omit<ToastOptions, 'type'>` | `string` | 显示成功消息 |
| `error(message, options?)` | `message: ReactNode`, `options?: Omit<ToastOptions, 'type'>` | `string` | 显示错误消息 |
| `warning(message, options?)` | `message: ReactNode`, `options?: Omit<ToastOptions, 'type'>` | `string` | 显示警告消息 |
| `info(message, options?)` | `message: ReactNode`, `options?: Omit<ToastOptions, 'type'>` | `string` | 显示信息消息 |
| `debug(message, options?)` | `message: ReactNode`, `options?: Omit<ToastOptions, 'type'>` | `string` | 显示调试消息 |
| `dismiss(id)` | `id: string` | `void` | 关闭指定消息 |
| `dismissAll()` | - | `void` | 关闭所有消息 |
| `getToasts()` | - | `ReadonlyArray<ToastData>` | 获取当前消息列表 |

### ToastOptions 配置项

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `type` | `'success' \| 'error' \| 'warning' \| 'info' \| 'debug'` | `'info'` | 消息类型 |
| `duration` | `number` | `4000` | 自动关闭时间（毫秒），0表示不自动关闭 |
| `closable` | `boolean` | `true` | 是否显示关闭按钮 |
| `animation` | `'slide' \| 'fade' \| 'bounce' \| 'zoom'` | `'slide'` | 动画效果 |
| `pauseOnHover` | `boolean` | `true` | 悬停时是否暂停自动关闭 |
| `icon` | `ReactNode` | - | 自定义图标 |
| `className` | `string` | - | 自定义CSS类名 |
| `style` | `React.CSSProperties` | - | 自定义内联样式 |
| `onClick` | `() => void` | - | 点击事件回调 |
| `onClose` | `() => void` | - | 关闭事件回调 |

### 位置选项

| 位置 | 描述 |
|------|------|
| `'top-left'` | 左上角 |
| `'top-center'` | 顶部居中 |
| `'top-right'` | 右上角（默认） |
| `'bottom-left'` | 左下角 |
| `'bottom-center'` | 底部居中 |
| `'bottom-right'` | 右下角 |

### 预设持续时间常量

```tsx
import { 
  SHORT_DURATION,   // 3000ms
  DEFAULT_DURATION, // 4000ms
  MEDIUM_DURATION,  // 5000ms
  LONG_DURATION     // 8000ms
} from 'yggjs_rtoast/tech'
```

## 🎨 样式定制

### 1. 使用CSS变量

框架内置了CSS-in-JS系统，你可以通过CSS类名进行样式覆盖：

```css
/* 自定义成功消息样式 */
.ygg-toast--success {
  background: linear-gradient(45deg, #4CAF50, #45A049) !important;
  border-color: #4CAF50 !important;
}

/* 自定义错误消息样式 */
.ygg-toast--error {
  background: linear-gradient(45deg, #F44336, #E53935) !important;
  border-color: #F44336 !important;
}

/* 自定义容器样式 */
.ygg-toast-container {
  z-index: 10000 !important;
}

/* 自定义动画持续时间 */
.ygg-toast--slide-enter {
  animation-duration: 0.5s !important;
}
```

### 2. 主题色彩系统

框架内置了科技主题的配色方案：

```tsx
// 成功色：绿色渐变
// 错误色：红色渐变  
// 警告色：橙色渐变
// 信息色：蓝色渐变
// 调试色：灰色渐变
```

### 3. 响应式设计

框架自动适配不同屏幕尺寸：

- **桌面端**：标准尺寸和间距
- **移动端**：自动调整为全宽显示，优化触摸体验

## 🔧 最佳实践

### 1. 错误处理

```tsx
import { toast } from 'yggjs_rtoast/tech'

// API调用错误处理
async function fetchData() {
  try {
    const response = await api.getData()
    toast.success('数据加载成功')
    return response
  } catch (error) {
    toast.error('数据加载失败，请重试')
    throw error
  }
}

// 表单验证错误
function validateForm(data) {
  if (!data.email) {
    toast.warning('请填写邮箱地址')
    return false
  }
  
  if (!data.password) {
    toast.warning('请填写密码')
    return false
  }
  
  return true
}
```

### 2. 用户操作反馈

```tsx
import { toast } from 'yggjs_rtoast/tech'

// 保存操作
async function handleSave() {
  const saveToastId = toast.info('正在保存...', { duration: 0 })
  
  try {
    await api.save(data)
    toast.dismiss(saveToastId)
    toast.success('保存成功')
  } catch (error) {
    toast.dismiss(saveToastId)
    toast.error('保存失败')
  }
}

// 删除确认
function handleDelete() {
  toast.warning('确认删除这个项目？', {
    duration: 0,
    onClick: async () => {
      try {
        await api.delete(itemId)
        toast.success('删除成功')
      } catch (error) {
        toast.error('删除失败')
      }
    }
  })
}
```

### 3. 防止消息泛滥

```tsx
import { toast } from 'yggjs_rtoast/tech'

// 使用防抖避免重复消息
let lastMessageTime = 0
const MESSAGE_THROTTLE = 1000 // 1秒内不重复显示

function showThrottledMessage(message, type = 'info') {
  const now = Date.now()
  if (now - lastMessageTime < MESSAGE_THROTTLE) {
    return
  }
  
  lastMessageTime = now
  toast[type](message)
}

// 限制消息数量
function showLimitedMessage(message, type = 'info') {
  const currentToasts = toast.getToasts()
  
  // 如果当前消息太多，先清理一些
  if (currentToasts.length >= 3) {
    toast.dismissAll()
  }
  
  toast[type](message)
}
```

### 4. 国际化支持

```tsx
import { toast } from 'yggjs_rtoast/tech'

// 定义消息字典
const messages = {
  'en': {
    SAVE_SUCCESS: 'Saved successfully',
    SAVE_ERROR: 'Save failed',
    DELETE_CONFIRM: 'Confirm deletion?'
  },
  'zh': {
    SAVE_SUCCESS: '保存成功',
    SAVE_ERROR: '保存失败',  
    DELETE_CONFIRM: '确认删除？'
  }
}

const currentLang = 'zh' // 从应用状态获取当前语言

function t(key) {
  return messages[currentLang][key] || key
}

// 使用国际化消息
toast.success(t('SAVE_SUCCESS'))
toast.error(t('SAVE_ERROR'))
```

## 🆘 常见问题

### Q1: 如何修改消息的默认位置？

A: 当前版本的消息位置是固定在右上角的。如果需要修改位置，可以通过CSS覆盖：

```css
.ygg-toast-container {
  top: auto !important;
  right: auto !important;
  bottom: 20px !important;
  left: 20px !important;
}
```

### Q2: 如何在服务端渲染(SSR)中使用？

A: 框架已经内置了SSR支持，会自动检测环境。在服务端渲染时，DOM操作会被跳过，不会产生错误。

### Q3: 如何集成到现有的状态管理中？

A: 可以使用订阅功能监听消息变化：

```tsx
import { toast } from 'yggjs_rtoast/tech'

// 订阅消息变化
const unsubscribe = toast.subscribe((toasts) => {
  console.log('当前消息列表：', toasts)
  // 可以同步到Redux、Zustand等状态管理中
})

// 取消订阅
unsubscribe()
```

### Q4: 如何调试消息不显示的问题？

A: 请检查以下几点：

1. 确认已正确导入：`import { toast } from 'yggjs_rtoast/tech'`
2. 确认在浏览器环境中使用（不是服务端）
3. 检查CSS样式是否被其他样式覆盖
4. 查看控制台是否有JavaScript错误

### Q5: 如何优化性能？

A: 框架已经内置了多种性能优化：

- 样式缓存机制
- React.memo优化
- 事件处理器缓存
- 按需加载响应式样式

如果需要进一步优化，可以：

```tsx
// 限制最大消息数量
const MAX_TOASTS = 3
if (toast.getToasts().length >= MAX_TOASTS) {
  toast.dismissAll()
}
```

### Q6: 能否自定义消息容器？

A: 当前版本使用全局单例模式，容器是自动创建的。如果需要高度定制，建议：

1. 使用CSS覆盖样式
2. 通过`className`和`style`属性定制单个消息
3. 关注后续版本的容器组件支持

## 📝 更新日志

### v1.0.2 (2025-08-24)

**🚀 新增功能**
- ✨ 全新的CSS-in-JS样式系统，零外部依赖
- 🎨 科技主题UI设计，视觉效果大幅提升
- ⚡ 性能优化：样式缓存、组件memo化
- 📱 完善的响应式设计支持

**🔧 优化改进**
- 📦 包体积优化，移除不必要的依赖
- 🛡️ 增强TypeScript类型定义
- 🎯 改进打包配置，支持Tree Shaking
- ♿ 增加无障碍访问支持（ARIA标签）

**🐛 修复问题**
- 修复动画在某些情况下不生效的问题
- 修复测试环境下的样式注入问题
- 优化内存使用，防止内存泄漏

**📚 文档更新**
- 完善使用教程和API文档
- 增加更多使用示例
- 添加最佳实践指南

---

## 💪 技术支持

- **GitHub**: [yggjs_rtoast](https://github.com/yuangungun/yggjs_rtoast)
- **Issues**: [问题反馈](https://github.com/yuangungun/yggjs_rtoast/issues)
- **作者**: 源滚滚

## 📄 开源协议

本项目采用 [MIT License](https://opensource.org/licenses/MIT) 开源协议。

---

**🎉 感谢使用 yggjs_rtoast！如果觉得好用，请给我们一个 ⭐️**