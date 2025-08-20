## 使用教程 v0.1.0（详细教学）

本教程将带你从零开始使用 YggJS RToast（科技风全局消息通知库）。内容涵盖安装、主题、示例、API 解释与最佳实践，帮助你快速上手并在真实项目中稳定落地。

---

### 项目介绍

- YggJS RToast 是一个面向 React 应用的消息通知库，聚焦“全局用法”，开箱即用、类型完备、主题科技风。
- 核心理念：简单一致的 API、良好的默认体验、可渐进式定制。
- 适用场景：表单提交反馈、网络异常提示、操作成功/失败提醒、调试信息等。

---

### 安装

- 使用包管理器安装（发布包场景）：
  - pnpm add yggjs_rtoast
  - npm i yggjs_rtoast
  - yarn add yggjs_rtoast

- React 版本
  - 推荐 React 18+（内部默认使用 createRoot）。如需支持更低版本，请在仓库 issue 反馈或自定义适配。

- 样式引入
  - 默认情况下，tech 入口会注入样式。如果你的构建环境未自动纳入，可手动导入：
    - import 'yggjs_rtoast/dist/style.css'

- Workspace 本地开发（本仓库示例）
  - 示例工程通过 Vite alias 与 TS paths 将 yggjs_rtoast 指向本仓库 src，开发时无需先构建 dist。
  - 一般业务工程使用发布包即可，无需此步骤。

---

### 科技主题

- 位置（position）
  - 由“垂直方向 + 水平对齐”组合：top|bottom × left|center|right
  - 可选值：top-left、top-center、top-right、bottom-left、bottom-center、bottom-right

- 动画（animation）
  - 可选：slide（默认）、fade、bounce、zoom

- 自定义样式
  - 每条消息支持 className/style 参数。建议通过 CSS 变量/覆盖类名实现品牌化主题。

---

### 示例代码

#### 1) 基本调用（类型化入口推荐）

```tsx
import React from 'react'
import { toast } from 'yggjs_rtoast/tech'

export function DemoButtons() {
  return (
    <div>
      <button onClick={() => toast.success('保存成功！')}>成功</button>
      <button onClick={() => toast.error('保存失败，请重试')}>失败</button>
      <button onClick={() => toast.warning('磁盘空间不足')}>警告</button>
      <button onClick={() => toast.info('系统将在5分钟后维护')}>信息</button>
      <button onClick={() => toast.debug('Debug 信息，仅用于调试')}>调试</button>
    </div>
  )
}
```

#### 2) 通用入口 + 选项（自定义时长/动画/可关闭等）

```tsx
import { toast } from 'yggjs_rtoast/tech'

toast.toast('这是一条自定义消息', {
  type: 'info',
  duration: 6000,
  closable: true,
  animation: 'bounce',
  pauseOnHover: true,
})
```

#### 3) 订阅数量变化（只读数组，拷贝后存入本地状态）

```tsx
import React from 'react'
import { toast } from 'yggjs_rtoast/tech'
import type { ToastData } from 'yggjs_rtoast/tech'

export function ToastCounter() {
  const [toasts, setToasts] = React.useState<ToastData[]>([])

  React.useEffect(() => {
    const unsubscribe = toast.subscribe((list) => setToasts([...list]))
    return unsubscribe
  }, [])

  return <div>当前消息数量：{toasts.length}</div>
}
```

提示：subscribe 返回“取消订阅函数”，请在组件卸载或 effect 清理阶段调用。

---

### 代码解释

- 全局 API（toast 实例）
  - success/error/warning/info/debug(message, options?): 按类型展示消息，简单语义化，推荐使用。
  - toast(message, options?): 通用入口，适合高度自定义场景。
  - dismiss(id): 关闭指定消息；dismissAll(): 关闭所有消息。
  - subscribe(listener): 订阅消息列表变化；返回取消订阅函数。
  - getToasts(): 获取当前消息列表（ReadonlyArray）。

- 常用选项（ToastOptions）
  - type：消息类型，默认 'info'
  - duration：自动关闭毫秒数，默认 4000；0 表示不自动关闭
  - closable：是否允许手动关闭，默认 true
  - animation：动画类型，默认 'slide'
  - pauseOnHover：鼠标悬停时是否暂停自动关闭，默认 true
  - icon：自定义图标（ReactNode）
  - className/style：覆盖样式
  - onClick/onClose：点击与关闭回调

- 位置与堆叠
  - position 决定显示位置及堆叠方向；maxToasts 控制同屏最大显示条数（默认 5）。

---

### 属性

- ToastOptions（创建时可选项）
  - type?: 'success' | 'error' | 'warning' | 'info' | 'debug'（默认 'info'）
  - duration?: number（默认 4000；0 表示不自动关闭）
  - closable?: boolean（默认 true）
  - icon?: React.ReactNode
  - className?: string
  - style?: React.CSSProperties
  - onClick?: () => void
  - onClose?: () => void
  - animation?: 'slide' | 'fade' | 'bounce' | 'zoom'（默认 'slide'）
  - pauseOnHover?: boolean（默认 true）

- ToastData（展示中的消息结构，供订阅/调试使用）
  - id: string
  - message: React.ReactNode
  - createdAt: number
  - 以及合并后的 ToastOptions 实际值（含默认值）

---

### 方法

- 全局 API（ToastAPI）
  - subscribe(listener: (toasts: ReadonlyArray<ToastData>) => void): () => void
  - toast(message: React.ReactNode, options?: ToastOptions): string
  - success/error/warning/info/debug(message, options?): string
  - dismiss(id: string): void
  - dismissAll(): void
  - getToasts(): ReadonlyArray<ToastData>

使用建议：
- 优先使用类型化入口（success/error 等）以获得更语义化的调用；通用入口适合一次性高定制。
- 订阅场景中，回调 toasts 为只读数组；如需入本地状态请浅拷贝：setState([...toasts])。
- 注意取消订阅，避免内存泄漏。

---

### 总结

- YggJS RToast 提供统一、稳定且可扩展的全局消息能力，贴合现代 React 项目需求。
- “默认好用 + 渐进式增强”：默认配置开箱即用，复杂需求可以通过 options 与样式覆盖实现。
- 建议在项目初始化阶段即引入，统一提示风格与交互行为，提升整体一致性与用户体验。

