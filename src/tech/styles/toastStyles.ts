/**
 * Toast组件样式工厂
 * 使用CSS-in-JS生成高性能的动态样式
 */

import { css, styled, keyframes } from './css-in-js'
import { theme } from './theme'
import type { ToastData } from '../types'

// 创建动画关键帧
const createAnimations = () => {
  // 滑动动画
  const slideInRight = keyframes('slide-in-right', `
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  `)

  const slideOutRight = keyframes('slide-out-right', `
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `)

  const slideInLeft = keyframes('slide-in-left', `
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  `)

  const slideOutLeft = keyframes('slide-out-left', `
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(-100%);
      opacity: 0;
    }
  `)

  // 淡入淡出动画
  const fadeIn = keyframes('fade-in', `
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  `)

  const fadeOut = keyframes('fade-out', `
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.9);
    }
  `)

  // 弹跳动画
  const bounceIn = keyframes('bounce-in', `
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  `)

  // 缩放动画
  const zoomIn = keyframes('zoom-in', `
    from {
      opacity: 0;
      transform: scale(0.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  `)

  return {
    slideInRight,
    slideOutRight,
    slideInLeft,
    slideOutLeft,
    fadeIn,
    fadeOut,
    bounceIn,
    zoomIn,
  }
}

// 创建并缓存动画
const animations = createAnimations()

/**
 * 获取Toast类型对应的颜色配置
 */
const getToastColors = (type: ToastData['type']) => {
  const colorMap = {
    success: theme.colors.success,
    error: theme.colors.error,
    warning: theme.colors.warning,
    info: theme.colors.info,
    debug: theme.colors.debug,
  }
  return colorMap[type] || colorMap.info
}

/**
 * 创建ToastContainer样式
 */
export const createContainerStyles = styled<{
  position: string
}>((props) => {
  const baseStyles: Record<string, string | number> = {
    position: 'fixed',
    zIndex: theme.zIndex.toast,
    pointerEvents: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.sizes.container.gap,
    padding: theme.sizes.container.padding,
    maxWidth: theme.sizes.container.maxWidth,
    width: '100%',
  }

  // 根据位置添加定位样式
  const positionStyles = getPositionStyles(props.position)
  
  return { ...baseStyles, ...positionStyles }
})

/**
 * 获取容器的语义化类名
 */
export const getContainerClassName = (position: string): string => {
  return `ygg-toast-container ygg-toast-container--${position}`
}

/**
 * 获取位置样式
 */
const getPositionStyles = (position: string): Record<string, string | number> => {
  const styles: Record<string, string | number> = {}

  if (position.includes('top')) {
    styles.top = 0
  }
  if (position.includes('bottom')) {
    styles.bottom = 0
  }
  if (position.includes('left')) {
    styles.left = 0
  }
  if (position.includes('right')) {
    styles.right = 0
  }
  if (position.includes('center')) {
    styles.left = '50%'
    styles.transform = 'translateX(-50%)'
  }

  return styles
}

/**
 * 创建Toast基础样式
 */
export const createToastStyles = styled<{
  type: ToastData['type']
  isHovered?: boolean
}>((props) => {
  const colors = getToastColors(props.type)
  
  const baseStyles: Record<string, string> = {
    position: 'relative',
    pointerEvents: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: theme.sizes.spacing.md,
    padding: theme.sizes.toast.padding,
    borderRadius: theme.sizes.radius.md,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${colors.border}`,
    background: `linear-gradient(135deg, ${colors.primary}e6 0%, ${colors.secondary}e6 100%)`,
    boxShadow: props.isHovered ? theme.shadows.toast.hover : theme.shadows.toast.default,
    fontFamily: theme.fonts.family,
    fontSize: theme.sizes.fontSize.md,
    lineHeight: theme.fonts.lineHeight.normal,
    color: theme.colors.white,
    cursor: 'pointer',
    transition: theme.transitions.default,
    overflow: 'hidden',
    transform: props.isHovered ? 'translateY(-2px)' : 'translateY(0)',
  }

  return baseStyles
})

// 导出语义化类名生成函数以兼容测试
export const getToastClassNames = (type: ToastData['type']): string => {
  return `ygg-toast ygg-toast--${type}`
}

/**
 * 创建Toast伪元素样式
 */
export const createToastBeforeStyles = css(`
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, ${theme.colors.whiteAlpha[10]} 0%, ${theme.colors.whiteAlpha[5]} 100%);
  pointer-events: none;
`)

/**
 * 创建图标样式
 */
export const createIconStyles = css({
  flexShrink: 0,
  width: theme.sizes.toast.iconSize,
  height: theme.sizes.toast.iconSize,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}, 'ygg', 'toast__icon')

/**
 * 创建消息样式
 */
export const createMessageStyles = css({
  flex: 1,
  fontWeight: theme.fonts.weight.medium,
  textShadow: `0 1px 2px ${theme.colors.blackAlpha[30]}`,
}, 'ygg', 'toast__message')

/**
 * 创建关闭按钮样式
 */
export const createCloseButtonStyles = styled<{
  isHovered?: boolean
}>((props) => ({
  flexShrink: 0,
  width: theme.sizes.toast.closeButtonSize,
  height: theme.sizes.toast.closeButtonSize,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: props.isHovered ? theme.colors.whiteAlpha[20] : theme.colors.whiteAlpha[10],
  border: 'none',
  borderRadius: theme.sizes.radius.sm,
  color: props.isHovered ? theme.colors.white : theme.colors.whiteAlpha[80],
  cursor: 'pointer',
  transition: theme.transitions.fast,
  fontSize: theme.sizes.fontSize.lg,
  lineHeight: theme.fonts.lineHeight.tight,
  transform: props.isHovered ? 'scale(1.1)' : 'scale(1)',
}))

/**
 * 获取关闭按钮的语义化类名
 */
export const getCloseButtonClassName = (): string => {
  return 'ygg-toast__close'
}

/**
 * 创建进度条样式
 */
export const createProgressStyles = styled<{
  width: string
}>((props) => {
  const styles = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: theme.sizes.toast.progressHeight,
    width: props.width,
    background: `linear-gradient(90deg, ${theme.colors.whiteAlpha[80]} 0%, ${theme.colors.whiteAlpha[40]} 100%)`,
    borderRadius: `0 0 ${theme.sizes.radius.md} ${theme.sizes.radius.md}`,
    transition: 'width linear',
    boxShadow: theme.shadows.progress,
  }
  
  return css(styles, 'ygg', 'toast__progress')
})

/**
 * 创建动画样式
 */
export const createAnimationStyles = styled<{
  animation: string
  isEntering?: boolean
  isExiting?: boolean
}>((props) => {
  let animationName = ''
  let duration: string = theme.transitions.duration.normal
  let easing: string = theme.transitions.easing.ease
  let semanticClass = ''

  if (props.isEntering) {
    semanticClass = `toast--${props.animation}-enter`
    switch (props.animation) {
      case 'slide':
        animationName = animations.slideInRight
        break
      case 'fade':
        animationName = animations.fadeIn
        break
      case 'bounce':
        animationName = animations.bounceIn
        duration = '0.5s'
        easing = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        break
      case 'zoom':
        animationName = animations.zoomIn
        break
      default:
        animationName = animations.slideInRight
    }
  } else if (props.isExiting) {
    semanticClass = `toast--${props.animation}-exit`
    switch (props.animation) {
      case 'slide':
        animationName = animations.slideOutRight
        break
      case 'fade':
        animationName = animations.fadeOut
        break
      case 'zoom':
        animationName = animations.fadeOut // 缩放退出使用淡出
        break
      default:
        animationName = animations.slideOutRight
    }
  }

  if (animationName && semanticClass) {
    const styles = {
      animation: `${animationName} ${duration} ${easing}`,
    }
    
    const className = css(styles, 'ygg', semanticClass)
    return `ygg-${semanticClass} ${className}`
  }

  return ''
})

/**
 * 创建响应式样式（懒加载）
 */
let responsiveStylesLoaded = false
export const loadResponsiveStyles = (): void => {
  if (responsiveStylesLoaded || typeof document === 'undefined' || process.env.NODE_ENV === 'test') {
    return
  }
  
  css(`
    @media (max-width: ${theme.breakpoints.mobile}) {
      .ygg-toast-container {
        left: ${theme.sizes.mobile.containerPadding} !important;
        right: ${theme.sizes.mobile.containerPadding} !important;
        max-width: none;
        padding: ${theme.sizes.mobile.containerPadding};
      }
      
      .ygg-toast-container--top-center,
      .ygg-toast-container--bottom-center {
        transform: none;
      }
      
      .ygg-toast {
        padding: ${theme.sizes.mobile.toastPadding};
        font-size: ${theme.sizes.fontSize.sm};
      }
    }
  `, 'ygg', 'responsive-styles')
  
  responsiveStylesLoaded = true
}

// 在ToastContainer首次渲染时加载响应式样式