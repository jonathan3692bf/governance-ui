import { useEffect, useState } from 'react'
import Link from 'next/link'

import ConnectWalletButton from './ConnectWalletButton'
import { ExploreButton, ReadTheDocsButton, CreateDaoButton } from './Button'

const SCROLL_BREAK_POINT = 200

function RealmsLogo() {
  return (
    <Link href="/solana">
      <div className="flex items-center space-x-1 cursor-pointer hover:brightness-110">
        <img
          src="/img/realms-web/icons/logo-realms-blue.png"
          className="w-8 h-8"
        />
        <span>Realms</span>
      </div>
    </Link>
  )
}

export const NavContent = ({ showWalletButton = false, bgOverride }) => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between">
      <RealmsLogo />
      {showWalletButton ? (
        <ConnectWalletButton />
      ) : (
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <ReadTheDocsButton />
          </div>
          <ExploreButton bgOverride={bgOverride} />
        </div>
      )}
    </div>
  )
}

interface NavbarProps {
  showWalletButton?: boolean
}

export default function Navbar(props: NavbarProps) {
  const { showWalletButton } = props
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // just trigger this so that the initial state
    // is updated as soon as the component is mounted
    // related: https://stackoverflow.com/a/63408216
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={`fixed w-full top-0 z-10 pt-5 pb-5 transition-all duration-300 ${
        scrollY > SCROLL_BREAK_POINT
          ? 'bg-[#292833] bg-opacity-90 backdrop-blur-[3px]'
          : ''
      }`}
    >
      {scrollY < SCROLL_BREAK_POINT ? (
        <NavContent
          showWalletButton={showWalletButton}
          bgOverride={'bg-[#201f27]'}
        />
      ) : (
        <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between">
          <RealmsLogo />
          <div>
            {showWalletButton ? <ConnectWalletButton /> : <CreateDaoButton />}
          </div>
        </div>
      )}
    </div>
  )
}
