import { CreateDaoButton, ReadTheDocsButton } from 'components_2/Button'
import Hero from 'components_2/Hero'
import Header from 'components_2/Header'
// import BtnWithLoader from 'components_2/BtnWithLoader'

export default function KickstartSolana() {
  return (
    <Hero>
      <div className="text-center md:text-left">
        <Header as="h1" className="hero">
          Kickstart your
          <br />
          community on Solana
        </Header>
        <div className="mt-4 text-base font-light tracking-tight text-center text-white mb-11 md:mb-14 md:text-left">
          Create and participate in fully on-chain DAOs of all kinds.
        </div>
      </div>
      <div className="pb-12 space-y-4 text-center md:pb-24 md:text-left">
        <div>
          <CreateDaoButton inNavBar={false} />
        </div>
        <div className="block md:hidden">
          <ReadTheDocsButton />
        </div>
        {/* <BtnWithLoader /> */}
      </div>
    </Hero>
  )
}
