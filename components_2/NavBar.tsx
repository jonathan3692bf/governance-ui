import Link from 'next/link'

import ConnectWalletButton from './ConnectWalletButton'

function RealmsLogo() {
  return (
    <Link href="/solana">
      <a className="flex items-center space-x-1 cursor-pointer hover:brightness-110">
        <img src="/1-Landing-v2/logo-realms-blue.png" className="w-8 h-8" />
        <span>Realms</span>
      </a>
    </Link>
  )
}

export default function Navbar() {
  return (
    <div className="absolute top-0 z-10 w-full pt-5 pb-5">
      <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between">
        <RealmsLogo />
        <ConnectWalletButton />
      </div>
    </div>
  )
}
