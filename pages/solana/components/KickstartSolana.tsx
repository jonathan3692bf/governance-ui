import Link from 'next/link'
import Button from 'components_2/Button'
import Hero from 'components_2/Hero'
import Header from 'components_2/Header'
import Text from 'components_2/Text'

export default function KickstartSolana() {
  return (
    <Hero>
      <div className="text-center md:text-left">
        <Header as="h1">
          Kickstart your
          <br />
          community on Solana
        </Header>
        <div className="mt-4 mb-11 md:mb-14 text-white">
          <Text as="text-base">
            Create and participate in fully on-chain DAOs of all kinds.
          </Text>
        </div>
      </div>
      <div className="pb-12 space-y-4 text-center md:pb-24 md:text-left">
        <div>
          <Button>
            <Link href="/solana/create_dao">
              <div className="px-14">Create DAO</div>
            </Link>
          </Button>
        </div>
        <div className="block md:hidden">
          <Button tertiary>
            <div className="relative flex items-center justify-center">
              <div className="pl-4 pr-2  border-red">Read the Docs</div>
              <img
                src="/img/realms-web/icons/external-link-thin-white.png"
                className="w-4 h-4 mr-4"
                alt="External link icon"
              />
            </div>
          </Button>
        </div>
      </div>
    </Hero>
  )
}
