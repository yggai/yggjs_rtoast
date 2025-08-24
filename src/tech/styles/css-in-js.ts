/**
 * 高性能CSS-in-JS样式系统
 * 基于原生实现，避免外部依赖，优化性能和缓存
 */

// 样式缓存系统
const styleCache = new Map<string, string>()
const classNameCache = new Map<string, string>()
const semanticClassNames = new Map<string, string>()

// 全局样式计数器，确保类名唯一
let styleCounter = 0

/**
 * 生成语义化或唯一的CSS类名
 * @param prefix - 类名前缀
 * @param semanticName - 语义化名称（可选）
 * @returns CSS类名
 */
const generateClassName = (prefix: string, semanticName?: string): string => {
  if (semanticName) {
    const fullName = `${prefix}-${semanticName}`
    // 对于语义化类名，直接返回，不使用计数器
    if (semanticClassNames.has(fullName)) {
      return fullName
    }
    semanticClassNames.set(fullName, fullName)
    return fullName
  }
  return `${prefix}-${++styleCounter}`
}

/**
 * 插入CSS样式到DOM（兼容测试环境）
 * @param css - CSS样式字符串
 * @param className - CSS类名
 */
const insertStyle = (css: string, className: string): void => {
  // 检查样式是否已存在
  if (styleCache.has(css)) {
    return
  }

  // 在测试环境中跳过DOM操作
  if (typeof document === 'undefined' || process.env.NODE_ENV === 'test') {
    styleCache.set(css, className)
    return
  }

  // 查找或创建样式标签
  let styleElement = document.getElementById('ygg-toast-styles') as HTMLStyleElement
  if (!styleElement) {
    styleElement = document.createElement('style')
    styleElement.id = 'ygg-toast-styles'
    styleElement.type = 'text/css'
    document.head.appendChild(styleElement)
  }

  // 添加样式到样式表
  const rule = `.${className} { ${css} }`
  
  if (styleElement.sheet) {
    try {
      styleElement.sheet.insertRule(rule, styleElement.sheet.cssRules.length)
    } catch (e) {
      // 降级处理
      styleElement.appendChild(document.createTextNode(rule))
    }
  } else {
    styleElement.appendChild(document.createTextNode(rule))
  }

  // 缓存样式
  styleCache.set(css, className)
}

/**
 * CSS-in-JS核心函数
 * @param styles - 样式对象或样式字符串
 * @param prefix - 类名前缀，默认为'ygg'
 * @param semanticName - 语义化类名（可选）
 * @returns CSS类名
 */
export const css = (
  styles: Record<string, string | number> | string,
  prefix: string = 'ygg',
  semanticName?: string
): string => {
  // 如果是字符串，直接使用
  if (typeof styles === 'string') {
    const cacheKey = `${prefix}-${semanticName || 'string'}-${styles}`
    if (classNameCache.has(cacheKey)) {
      return classNameCache.get(cacheKey)!
    }

    const className = generateClassName(prefix, semanticName)
    insertStyle(styles, className)
    classNameCache.set(cacheKey, className)
    return className
  }

  // 将样式对象转换为CSS字符串
  const cssString = Object.entries(styles)
    .map(([property, value]) => {
      // 处理驼峰命名转换为连字符命名
      const cssProperty = property.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
      return `${cssProperty}: ${value}`
    })
    .join('; ')

  // 检查缓存
  const cacheKey = `${prefix}-${semanticName || 'object'}-${cssString}`
  if (classNameCache.has(cacheKey)) {
    return classNameCache.get(cacheKey)!
  }

  const className = generateClassName(prefix, semanticName)
  insertStyle(cssString, className)
  classNameCache.set(cacheKey, className)
  return className
}

/**
 * 创建动态CSS类
 * @param template - CSS模板函数
 * @returns 返回一个函数，接收参数并生成CSS类名
 */
export const styled = <T extends Record<string, unknown>>(
  template: (props: T) => Record<string, string | number> | string
) => {
  return (props: T): string => {
    const styles = template(props)
    return css(styles)
  }
}

/**
 * 合并多个CSS类名
 * @param classes - CSS类名数组
 * @returns 合并后的CSS类名字符串
 */
export const cx = (...classes: (string | undefined | false | null)[]): string => {
  return classes.filter(Boolean).join(' ')
}

/**
 * 创建关键帧动画
 * @param name - 动画名称
 * @param keyframes - 关键帧定义
 * @returns 动画名称
 */
export const keyframes = (name: string, keyframes: string): string => {
  const animationName = `ygg-${name}-${++styleCounter}`
  
  // 在测试环境中跳过DOM操作
  if (typeof document === 'undefined' || process.env.NODE_ENV === 'test') {
    return animationName
  }

  const keyframeCSS = `@keyframes ${animationName} { ${keyframes} }`

  // 插入关键帧动画
  let styleElement = document.getElementById('ygg-toast-styles') as HTMLStyleElement
  if (!styleElement) {
    styleElement = document.createElement('style')
    styleElement.id = 'ygg-toast-styles'
    styleElement.type = 'text/css'
    document.head.appendChild(styleElement)
  }

  if (styleElement.sheet) {
    try {
      styleElement.sheet.insertRule(keyframeCSS, styleElement.sheet.cssRules.length)
    } catch (e) {
      styleElement.appendChild(document.createTextNode(keyframeCSS))
    }
  } else {
    styleElement.appendChild(document.createTextNode(keyframeCSS))
  }

  return animationName
}

/**
 * 媒体查询辅助函数
 * @param query - 媒体查询条件
 * @param styles - 样式对象
 * @returns CSS字符串
 */
export const media = (query: string, styles: Record<string, string | number>): string => {
  const cssString = Object.entries(styles)
    .map(([property, value]) => {
      const cssProperty = property.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
      return `${cssProperty}: ${value}`
    })
    .join('; ')

  return `@media ${query} { ${cssString} }`
}

/**
 * 清理样式缓存（用于测试或内存管理）
 */
export const clearStyleCache = (): void => {
  styleCache.clear()
  classNameCache.clear()
  semanticClassNames.clear()
  styleCounter = 0

  // 在浏览器环境中移除样式元素
  if (typeof document !== 'undefined') {
    const styleElement = document.getElementById('ygg-toast-styles')
    if (styleElement) {
      styleElement.remove()
    }
  }
}