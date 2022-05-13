import { createElement } from 'react'
import useIsSmallScreen from './Utils'

export default function Header({
  as = 'h2',
  withGradient = false,
  className = '',
  children,
}) {
  const isSmall = useIsSmallScreen()

  let classNames = `landing-page font-light ${isSmall ? `small` : ''}`
  if (as === 'h1') {
    classNames += ` `
  } else if (as === 'h2') {
    classNames += ` mobile sm:small md:medium lg:desktop`
  } else if (as === 'h3') {
    classNames += ` `
  } else if (as === 'h4') {
    classNames += ` `
  }

  classNames += ` ${className}`

  if (withGradient) {
    classNames += ` bg-gradient-to-r from-[#00C2FF] via-[#00E4FF] to-[#87F2FF] bg-clip-text text-transparent`
  }

  return createElement(as, { className: classNames }, children)
}
