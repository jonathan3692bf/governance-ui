import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { preventNegativeNumberInput } from '@utils/helpers'
import { updateUserInput, validateSolAddress } from '@utils/formValidation'

import FormHeader from '@components/NewRealmWizard/components/FormHeader'
import FormField from '@components/NewRealmWizard/components/FormField'
import FormFooter from '@components/NewRealmWizard/components/FormFooter'
import AdvancedOptionsDropdown from '@components/NewRealmWizard/components/AdvancedOptionsDropdown'
import Input, { RadioGroup } from '@components/NewRealmWizard/components/Input'
import { GenericTokenIcon } from '@components/NewRealmWizard/components/TokenInfoTable'
import TokenAddressInput, { TokenWithMintInfo } from '../TokenAddressInput'

export const CommunityTokenSchema = {
  useExistingCommunityToken: yup
    .boolean()
    .oneOf([true, false], 'You must specify whether you have a token already')
    .required('Required'),
  communityTokenMintAddress: yup
    .string()
    .when('useExistingCommunityToken', {
      is: (val) => val == true,
      then: yup.string().required('Required'),
      otherwise: yup.string().optional(),
    })
    .test('is-valid-address', 'Please enter a valid Solana address', (value) =>
      value ? validateSolAddress(value) : true
    ),
  transferCommunityMintAuthority: yup
    .boolean()
    .oneOf(
      [true, false],
      'You must specify whether you which to transfer mint authority'
    )
    .when('useExistingCommunityToken', {
      is: (val) => val == true,
      then: yup.boolean().required('Required'),
      otherwise: yup.boolean().optional(),
    }),
  minimumNumberOfCommunityTokensToGovern: yup
    .number()
    .positive('Must be greater than 0')
    .transform((value) => (isNaN(value) ? undefined : value)),
  communityMintSupplyFactor: yup
    .number()
    .positive('Must be greater than 0')
    .max(1, 'Must not be greater than 1')
    .transform((value) => (isNaN(value) ? undefined : value)),
}

export interface CommunityToken {
  useExistingToken: boolean
  communityTokenMintAddress?: string
  transferCommunityMintAuthority?: boolean
  minimumNumberOfCommunityTokensToGovern?: number
  communityMintSupplyFactor?: number
}

export default function CommunityTokenForm({
  type,
  formData,
  currentStep,
  totalSteps,
  onSubmit,
  onPrevClick,
}) {
  const schema = yup.object(CommunityTokenSchema).required()
  const {
    watch,
    control,
    setValue,
    clearErrors,
    setError,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  })
  const useExistingCommunityToken = watch('useExistingCommunityToken')
  const [communityTokenInfo, setCommunityTokenInfo] = useState<
    TokenWithMintInfo | undefined
  >()
  const [validMintAddress, setValidMintAddress] = useState(false)
  const [showTransferMintAuthority, setShowTransferMintAuthority] = useState(
    false
  )

  useEffect(() => {
    updateUserInput(formData, CommunityTokenSchema, setValue)
  }, [])

  useEffect(() => {
    if (!useExistingCommunityToken) {
      setValue('communityTokenMintAddress', '')
      setValue('transferCommunityMintAuthority', undefined, {
        shouldValidate: true,
      })
    }
  }, [useExistingCommunityToken])

  function handleTokenInput({
    tokenInfo,
    validMintAddress,
    walletIsMintAuthority,
  }) {
    setShowTransferMintAuthority(walletIsMintAuthority)
    setCommunityTokenInfo(tokenInfo)
    setValidMintAddress(validMintAddress && tokenInfo)
    if (walletIsMintAuthority || !validMintAddress) {
      setValue('transferCommunityMintAuthority', undefined, {
        shouldValidate: true,
      })
    } else {
      setValue('transferCommunityMintAuthority', false, {
        shouldValidate: true,
      })
    }

    if (validMintAddress) {
      clearErrors('invalidTokenMintAddress')
    } else {
      setError('invalidTokenMintAddress', {
        type: 'is-valid-address',
        message: 'Not a valid token address',
      })
    }
  }

  function serializeValues(values) {
    const data = {
      transferCommunityMintAuthority: null,
      minimumNumberOfCommunityTokensToGovern: null,
      communityMintSupplyFactor: null,
      ...values,
    }
    if (values.useExistingCommunityToken) {
      data.communityTokenInfo = communityTokenInfo
    } else {
      data.communityTokenMintAddress = null
      data.transferCommunityMintAuthority = null
      data.communityTokenInfo = null
    }

    onSubmit({ step: currentStep, data })
  }

  return (
    <form
      onSubmit={handleSubmit(serializeValues)}
      data-testid="govtoken-details-form"
    >
      <FormHeader
        type={type}
        currentStep={currentStep}
        totalSteps={totalSteps}
        title="Next, determine the community token your DAO will use for governance tasks"
      />
      <div className="mt-16 space-y-10 md:mt-24 md:space-y-20">
        <Controller
          name="useExistingCommunityToken"
          control={control}
          defaultValue={undefined}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { ref, ...field } }) => (
            <div className="pt-3">
              <FormField
                title="Do you have an existing token for your DAO's community?"
                description=""
              >
                <RadioGroup
                  {...field}
                  options={[
                    { label: 'Yes', value: true },
                    { label: 'No, make one for me', value: false },
                  ]}
                />
              </FormField>
            </div>
          )}
        />
        {useExistingCommunityToken && (
          <>
            <Controller
              name="communityTokenMintAddress"
              control={control}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <FormField
                  title="What is the address of the community token you would like to use?"
                  description="You can verify the correct token in the preview below."
                  className="mt-10 md:mt-16"
                >
                  <TokenAddressInput
                    disabled={!useExistingCommunityToken}
                    field={field}
                    error={
                      error?.message || errors.invalidTokenMintAddress?.message
                    }
                    onValidation={handleTokenInput}
                  />
                </FormField>
              )}
            />
            {showTransferMintAuthority && (
              <>
                <Controller
                  name="transferCommunityMintAuthority"
                  control={control}
                  defaultValue={undefined}
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  render={({ field: { ref, ...field } }) => (
                    <FormField
                      title="Do you want to transfer mint authority of the token to the DAO?"
                      description=""
                    >
                      <RadioGroup
                        {...field}
                        options={[
                          { label: 'Yes', value: true },
                          { label: 'No', value: false },
                        ]}
                      />
                    </FormField>
                  )}
                />
              </>
            )}
            <Controller
              name="minimumNumberOfCommunityTokensToGovern"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormField
                  title="What is the minimum number of community tokens needed to govern this DAO?"
                  description="A user will need at least this many of your community token to edit the DAO as well as make proposals."
                  disabled={!validMintAddress}
                  optional
                >
                  <Input
                    type="tel"
                    placeholder="1,000,000"
                    data-testid="dao-name-input"
                    Icon={<GenericTokenIcon />}
                    error={
                      errors.minimumNumberOfCommunityTokensToGovern?.message ||
                      ''
                    }
                    {...field}
                    disabled={!validMintAddress}
                    onChange={(ev) => {
                      preventNegativeNumberInput(ev)
                      field.onChange(ev)
                    }}
                  />
                </FormField>
              )}
            />
          </>
        )}
      </div>
      {useExistingCommunityToken && (
        <AdvancedOptionsDropdown>
          <Controller
            name="communityMintSupplyFactor"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <FormField
                title="Community mint supply factor"
                description='This determines the maximum voting weight of the community token. If set to "1" then total supply of the community governance token is equal to 100% vote.'
                advancedOption
              >
                <Input
                  type="tel"
                  placeholder={`1`}
                  Icon={<GenericTokenIcon />}
                  data-testid="programId-input"
                  error={errors.communityMintSupplyFactor?.message || ''}
                  {...field}
                  onChange={(ev) => {
                    preventNegativeNumberInput(ev)
                    field.onChange(ev)
                  }}
                />
              </FormField>
            )}
          />
        </AdvancedOptionsDropdown>
      )}

      <FormFooter
        isValid={isValid}
        prevClickHandler={() => onPrevClick(currentStep)}
      />
    </form>
  )
}