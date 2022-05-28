import SocialIcons from './SocialIcons'
import { ReadTheDocsButton } from 'pages/solana'
import { NavContent } from './MarketingNavBar'

export default function Footer() {
  return (
    <div className="w-full pt-6 pb-10 bg-night-grey md:pt-12 md:pb-12">
      <NavContent />
      <div className="max-w-[1440px] md:mx-auto mx-4 mt-5 border-t md:px-4 border-white/20 md:border-0 ">
        <div className="md:hidden">
          <ReadTheDocsButton />
        </div>
        <div className="inline-flex flex-wrap space-x-2 text-sm opacity-70">
          <a href="">© 2022 Realms</a>
          <span>|</span>
          <a href="">Security</a>
          <span>|</span>
          <a href="">Your Privacy</a>
          <span>|</span>
          <a href="">Terms</a>
        </div>
        <div className="pt-7">
          <SocialIcons className="flex gap-x-4 md:gap-x-5" />
        </div>
      </div>
    </div>
  )
}
