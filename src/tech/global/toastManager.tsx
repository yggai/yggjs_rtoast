import React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { ToastContainer } from '../components/ToastContainer'
import type { ToastData, ToastOptions, ToastType, ToastPosition, ToastAPI } from '../types'

// 默认配置（与之前 Provider 行为一致）
const DEFAULT_OPTIONS: Required<Omit<ToastOptions, 'icon' | 'className' | 'style' | 'onClick' | 'onClose'>> = {
  type: 'info',
  duration: 4000,
  closable: true,
  animation: 'slide',
  pauseOnHover: true,
}

// 生成唯一ID
const generateId = (): string => `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

class ToastManager implements ToastAPI {
  private toasts: ToastData[] = []
  private root: Root | null = null
  private containerEl: HTMLElement | null = null
  private position: ToastPosition = 'top-right'
  private maxToasts: number = 5
  private className?: string
  private style?: React.CSSProperties
  private listeners: Set<(toasts: ReadonlyArray<ToastData>) => void> = new Set()

  private ensureContainer() {
    if (typeof document === 'undefined') return // SSR 保护
    if (this.containerEl && this.root) return

    const existing = document.getElementById('ygg-toast-root')
    this.containerEl = existing || document.createElement('div')
    if (!existing) {
      this.containerEl.id = 'ygg-toast-root'
      document.body.appendChild(this.containerEl)
    }
    this.root = createRoot(this.containerEl)
    this.render()
  }

  private render() {
    if (!this.root) return
    this.root.render(
      <ToastContainer
        toasts={this.toasts}
        position={this.position}
        maxToasts={this.maxToasts}
        className={this.className}
        style={this.style}
        onDismiss={(id) => this.dismiss(id)}
      />
    )
    this.notify()
  }

  private notify() {
    const snapshot: ReadonlyArray<ToastData> = [...this.toasts]
    this.listeners.forEach((fn) => {
      try { 
        fn(snapshot) 
      } catch (error) {
        console.warn('Toast listener error:', error)
      }
    })
  }

  subscribe(listener: (toasts: ReadonlyArray<ToastData>) => void) {
    this.listeners.add(listener)
    // 初始推送一次
    listener([...this.toasts])
    return () => {
      this.listeners.delete(listener)
    }
  }

  private add(message: React.ReactNode, options: ToastOptions = {}): string {
    this.ensureContainer()

    const id = generateId()
    const merged = { ...DEFAULT_OPTIONS, ...options }

    const newToast: ToastData = {
      id,
      message,
      createdAt: Date.now(),
      ...merged,
    }

    // 新的在最前
    this.toasts = [newToast, ...this.toasts]
    this.render()

    return id
  }

  dismiss(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id)
    this.render()
  }

  dismissAll() {
    this.toasts = []
    this.render()
  }

  // 通用入口（保持与旧API命名一致）
  toast(message: React.ReactNode, options: ToastOptions = {}) {
    return this.add(message, options)
  }

  private typed(type: ToastType) {
    return (message: React.ReactNode, options: Omit<ToastOptions, 'type'> = {}) =>
      this.add(message, { ...options, type })
  }

  success = this.typed('success')
  error = this.typed('error')
  warning = this.typed('warning')
  info = this.typed('info')
  debug = this.typed('debug' as ToastType)

  // 只读获取当前列表（非响应式）
  getToasts(): ReadonlyArray<ToastData> {
    return [...this.toasts]
  }
}

const toast = new ToastManager()

export default toast

