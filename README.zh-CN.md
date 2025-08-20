# YggJS RToast

<div align="center">

![YggJS RToast](https://img.shields.io/badge/YggJS-RToast-blue?style=for-the-badge)
![Version](https://img.shields.io/npm/v/yggjs_rtoast?style=for-the-badge)
![License](https://img.shields.io/npm/l/yggjs_rtoast?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge)

**科技风 React 全局消息通知库**

[English](./README.md) | 中文

</div>

## 🎯 特性

- 🎨 科技风设计：现代化视觉、渐变与发光、顺滑动画
- ⚡ 轻量高效：零外部依赖，打包后体积极小
- 🧰 简单 API：专注“全局用法”，开箱即用
- 🧩 TypeScript 友好：完善的类型、清晰的签名
- ♿ 无障碍设计：role="alert"、aria-live 支持
- 🧪 示例与文档：提供完整示例与使用教程

## 📦 安装

```bash
# npm	npm i yggjs_rtoast
# yarn	yarn add yggjs_rtoast
# pnpm	pnpm add yggjs_rtoast
```

- React 版本：推荐 React 18+（内部默认使用 createRoot）
- 样式：通常会自动注入；若构建未收集到，可手动：

```ts
import 'yggjs_rtoast/dist/style.css'
```

## 🚀 快速开始

```tsx
import { toast } from 'yggjs_rtoast/tech'

// 类型化入口（推荐）
toast.success('操作成功！')
toast.error('操作失败！')

// 通用入口（高度自定义）
const id = toast.toast('这是一条自定义消息', {
  type: 'info',
  duration: 4000,
  closable: true,
  animation: 'slide',
  pauseOnHover: true,
})

// 关闭
toast.dismiss(id)
toast.dismissAll()
```

订阅（只读数组，存入本地状态请浅拷贝）：

```tsx
import React from 'react'
import { toast } from 'yggjs_rtoast/tech'
import type { ToastData } from 'yggjs_rtoast/tech'

export function ToastCounter() {
  const [list, setList] = React.useState<ToastData[]>([])
  React.useEffect(() => {
    const off = toast.subscribe((arr) => setList([...arr]))
    return off
  }, [])
  return <span>当前消息：{list.length}</span>
}
```

## 📚 API

全局实例 toast（ToastAPI）：

- subscribe(listener: (toasts: ReadonlyArray<ToastData>) => void): () => void
- toast(message: React.ReactNode, options?: ToastOptions): string
- success/error/warning/info/debug(message, options?): string
- dismiss(id: string): void
- dismissAll(): void
- getToasts(): ReadonlyArray<ToastData>

### ToastOptions

- type?: 'success' | 'error' | 'warning' | 'info' | 'debug'（默认 'info'）
- duration?: number（默认 4000，0 表示不自动关闭）
- closable?: boolean（默认 true）
- icon?: React.ReactNode
- className?: string
- style?: React.CSSProperties
- onClick?: () => void
- onClose?: () => void
- animation?: 'slide' | 'fade' | 'bounce' | 'zoom'（默认 'slide'）
- pauseOnHover?: boolean（默认 true）

### ToastData（订阅与调试）

- id: string
- message: React.ReactNode
- createdAt: number
- 以及合并后的 ToastOptions 实际值

## 🎨 主题

- 支持通过 className/style 覆盖样式
- 可在后续版本提供 CSS 变量清单以便统一主题

## 📖 教程与示例

- 使用教程（中文）：docs/使用教程/v0.1.0/使用教程.md
- 示例项目：example/

## 🛠️ 开发

```bash
pnpm install
pnpm build
pnpm test
pnpm example # 运行示例
```

## 📄 许可证

MIT © YggJS

