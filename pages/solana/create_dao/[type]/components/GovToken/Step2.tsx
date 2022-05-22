import { useEffect, useState, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PublicKey } from '@solana/web3.js'
import { TokenListProvider, TokenInfo } from '@solana/spl-token-registry'
import * as yup from 'yup'

// import { notify } from '@utils/notifications'

// import { RadioGroup } from '@headlessui/react'
import FormHeader from '../FormHeader'
import FormField from '../FormField'
import FormFooter from '../FormFooter'
import AdvancedOptionsDropdown from '../AdvancedOptionsDropdown'
import Input, { RadioGroup } from '../Input'

import {
  STEP1_SCHEMA,
  STEP2_SCHEMA,
  getFormData,
  updateUserInput,
} from './Wizard'
import Header from 'components_2/Header'
import Text from 'components_2/Text'

const PENDING_COIN = {
  chainId: 1,
  address: 'pending',
  symbol: 'finding symbol...',
  name: 'finding name...',
  decimals: 9,
  logoURI: '',
  tags: [''],
  extensions: {
    facebook: '',
    twitter: '',
    website: '',
  },
}

const NOTFOUND_COIN = {
  ...PENDING_COIN,
  name: '(Token has no name)',
  symbol: '(Token has no symbol)',
}

function validateSolAddress(address: string) {
  try {
    const pubkey = new PublicKey(address)
    const isSolana = PublicKey.isOnCurve(pubkey.toBuffer())
    return isSolana
  } catch (error) {
    return false
  }
}

export default function Step2({ onSubmit, onPrevClick }) {
  const [tokenList, setTokenList] = useState<TokenInfo[] | undefined>()
  const schema = yup.object(STEP2_SCHEMA).required()
  const {
    watch,
    control,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    // mode: 'all',
    resolver: yupResolver(schema),
  })
  const useExistingToken = watch('useExistingToken')
  const tokenAddress = watch('tokenAddress')
  const tokenInfo: TokenInfo | undefined = useMemo(() => {
    if (!tokenList) {
      return PENDING_COIN
    } else if (tokenAddress && validateSolAddress(tokenAddress)) {
      const tokenInfo = tokenList.find(
        (token) => token.address === tokenAddress
      )
      return tokenInfo || NOTFOUND_COIN
    } else {
      return undefined
    }
  }, [tokenAddress, tokenList])

  useEffect(() => {
    const formData = getFormData()
    yup
      .object(STEP1_SCHEMA)
      .isValid(formData)
      .then((valid) => {
        if (valid) {
          updateUserInput(STEP2_SCHEMA, setValue)
        } else {
          onPrevClick(2)
        }
      })
  }, [])

  useEffect(() => {
    // TODO: wire up to cluster
    async function getTokenList() {
      const tokenList = await new TokenListProvider().resolve()
      const filteredTokenList = tokenList
        .filterByClusterSlug('mainnet-beta')
        .getList()
      setTokenList(filteredTokenList)
    }

    getTokenList()
  }, [])

  useEffect(() => {
    // This handles the case where the user is inputting an address so we want to do
    // the quickest look up, but not throw a validation error until onBlur occurs,
    // as well as when the user inputs an address, but the tokenList hasn't resolved
    clearErrors('tokenAddress')
    //   console.log('tokenlist exists', !!tokenList, 'token address', tokenAddress)
    //   if (!tokenList) {
    //     setTokenFromAddress(PENDING_COIN)
    //   } else if (tokenAddress && validateSolAddress(tokenAddress)) {
    //     const tokenInfo = tokenList.find(
    //       (token) => token.address === tokenAddress
    //     )
    //     setTokenFromAddress(tokenInfo || NOTFOUND_COIN)
    //   } else {
    //     setTokenFromAddress(undefined)
    //   }
    //   // setValidatingTokenAddress(false)
  }, [tokenAddress])

  async function validateTokenAddress(address) {
    if (address && !validateSolAddress(address)) {
      setError('tokenAddress', {
        type: 'custom',
        message: 'Please enter a valid Solana address.',
      })
    }
  }

  function serializeValues(values) {
    onSubmit({ step: 2, data: values })
  }

  return (
    <form
      onSubmit={handleSubmit(serializeValues)}
      data-testid="gov-token-step-2"
    >
      <FormHeader
        currentStep={2}
        totalSteps={5}
        stepDescription="Determine Token"
        title="Next, determine the token your DAO will use for dovernance tasks."
        imgSrc="/1-Landing-v2/dao-type-medium-govtoken.png"
        imgAlt="circles spirling"
      />
      <div className="pt-10 space-y-10 md:space-y-12">
        <FormField
          title="Do you have an existing token for your DAO's community?"
          description=""
        >
          <Controller
            name="useExistingToken"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <RadioGroup
                onChange={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                options={[
                  { label: 'Yes I do', value: true },
                  { label: "No, let's create one", value: false },
                ]}
              />
            )}
          />
        </FormField>
        {useExistingToken === true && (
          <>
            <Controller
              name="tokenAddress"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormField
                  title="What is the address of the token you would like to use?"
                  description="You can verify the correct token in the preview below."
                >
                  <Input
                    placeholder="e.g. CwvWQWt5m..."
                    data-testid="dao-name-input"
                    error={errors.tokenAddress?.message}
                    {...field}
                    onBlur={(ev) => {
                      validateTokenAddress(ev.target.value)
                      field.onBlur()
                    }}
                  />
                </FormField>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#201F27] py-5 px-6 flex flex-col rounded-md space-y-5">
                <Text className="text-white/30">Token Name</Text>
                <div className="flex items-center space-x-2">
                  <div className="w-10">
                    <img
                      src={
                        tokenInfo?.logoURI ||
                        '/1-Landing-v2/icon-token-generic-gradient.png'
                      }
                      alt="token"
                      className="h-full"
                    />
                  </div>
                  {tokenInfo?.name ? (
                    <Header as="h4">{tokenInfo.name}</Header>
                  ) : (
                    <Text className="text-white/30">
                      <div
                        className="text-[22px] font-bold"
                        dangerouslySetInnerHTML={{
                          __html: `&#8212;`,
                        }}
                      ></div>
                    </Text>
                  )}
                </div>
              </div>
              <div className="bg-[#201F27] py-5 px-6 flex flex-col rounded-md space-y-5">
                <Text className="text-white/30">Token Symbol</Text>
                <div className="flex items-center h-10">
                  <Text className="flex space-x-2 ">
                    <div className="text-[28px] font-normal text-white/30">
                      #
                    </div>
                    {tokenInfo?.symbol ? (
                      <Header as="h4">{tokenInfo.symbol}</Header>
                    ) : (
                      <div
                        className="text-[22px] font-bold text-white/30"
                        dangerouslySetInnerHTML={{
                          __html: `&#8212;`,
                        }}
                      ></div>
                    )}
                  </Text>
                </div>
              </div>
            </div>
          </>
        )}
        {useExistingToken === false && (
          <>
            <Header as="h4" className="pb-6 text-center">
              Good news: we can mint you a brand new one!
            </Header>
            <Controller
              name="tokenName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormField
                  title="What would you like to name your token?"
                  description="Your generated token will be used for voting power."
                  optional
                >
                  <Input
                    placeholder="e.g. RealmsCoin"
                    data-testid="dao-name-input"
                    error={errors.tokenName?.message || ''}
                    {...field}
                  />
                </FormField>
              )}
            />

            <Controller
              name="tokenSymbol"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormField
                  title="What should your token's symbol be?"
                  description="A token's symbol is used in wallets to denote the token."
                  optional
                >
                  <Input
                    placeholder="e.g. REALM"
                    data-testid="dao-name-input"
                    error={errors.tokenSymbol?.message || ''}
                    {...field}
                  />
                </FormField>
              )}
            />
          </>
        )}
        {typeof useExistingToken !== 'undefined' && (
          <>
            <Controller
              name="minimumNumberOfTokensToEditDao"
              control={control}
              defaultValue={Number()}
              render={({ field }) => (
                <FormField
                  title="What is the minimum number of tokens needed to edit this DAO's info?"
                  description="A user will need at least this many of your governance token to edit and maintain this DAO."
                  disabled={useExistingToken && tokenAddress === ''}
                  optional
                >
                  <Input
                    type="number"
                    step={1}
                    // min={0}
                    placeholder="1,000,000"
                    data-testid="dao-name-input"
                    error={errors.minimumNumberOfTokensToEditDao?.message || ''}
                    {...field}
                    disabled={useExistingToken && tokenAddress === ''}
                  />
                </FormField>
              )}
            />
            <AdvancedOptionsDropdown>
              <Controller
                name="mintSupplyFactor"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <FormField
                    title="Community mint supply factor"
                    description='This determines the maximum voting weight of the community token. If set to "1" then total supply of the community governance token is equal to 100% vote.'
                    advancedOption
                  >
                    <Input
                      placeholder={`1`}
                      data-testid="programId-input"
                      error={errors.mintSupplyFactor?.message || ''}
                      {...field}
                    />
                  </FormField>
                )}
              />
            </AdvancedOptionsDropdown>
          </>
        )}
      </div>

      <FormFooter
        isValid={isValid}
        prevClickHandler={() => onPrevClick(2)}
        faqTitle="About Governance Tokens"
      />
    </form>
  )
}
