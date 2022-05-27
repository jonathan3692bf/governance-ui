import { useState } from 'react'
import { useRouter } from 'next/router'

import { getGovernanceProgramVersion } from '@solana/spl-governance'
import { PublicKey } from '@solana/web3.js'
import useWalletStore from 'stores/useWalletStore'
import { createMultisigRealm } from 'actions/createMultisigRealm'
import useQueryContext from '@hooks/useQueryContext'
import useLocalStorageState from '@hooks/useLocalStorageState'
import {
  // DEFAULT_GOVERNANCE_PROGRAM_ID,
  DEFAULT_TEST_GOVERNANCE_PROGRAM_ID,
} from '@components/instructions/tools'

import { notify } from '@utils/notifications'

import FormPage from 'components_2/Wizard/PageTemplate'
import BasicDetailsForm, {
  BasicDetailsSchema,
  BasicDetails,
} from '@forms/BasicDetailsForm'
import GovTokenDetailsForm, {
  GovTokenDetailsSchema,
  GovTokenDetails,
} from '@forms/GovTokenDetailsForm'
import ApprovalThresholdForm, {
  ApprovalThresholdSchema,
  ApprovalThreshold,
} from '@forms/ApprovalThresholdForm'
import AddCouncilForm, {
  AddCouncilSchema,
  AddCouncil,
} from '@forms/AddCouncilForm'
import InviteMembersForm, {
  InviteMembersSchema,
  InviteMembers,
} from '@forms/InviteMembersForm'
import MemberQuorumThresholdForm, {
  MemberQuorumThresholdSchema,
  MemberQuorumThreshold,
} from '@forms/MemberQuorumThresholdForm'

export const SESSION_STORAGE_FORM_KEY = 'govtoken-form-data'
export const FORM_NAME = 'gov-token'

type GovToken =
  | (BasicDetails &
      GovTokenDetails &
      ApprovalThreshold &
      AddCouncil &
      InviteMembers &
      MemberQuorumThreshold)
  | Record<string, never>

export default function GovTokenWizard() {
  const [formData, setFormData] = useLocalStorageState<GovToken>(
    SESSION_STORAGE_FORM_KEY,
    {}
  )
  const { connected, connection, current: wallet } = useWalletStore((s) => s)
  const { push } = useRouter()
  const { fmtUrlWithCluster } = useQueryContext()
  const [requestPending, setRequestPending] = useState(false)
  const steps = [
    { Form: BasicDetailsForm, schema: BasicDetailsSchema, required: 'true' },
    {
      Form: GovTokenDetailsForm,
      schema: GovTokenDetailsSchema,
      required: 'true',
    },
    {
      Form: ApprovalThresholdForm,
      schema: ApprovalThresholdSchema,
      required: 'true',
    },
    { Form: AddCouncilForm, schema: AddCouncilSchema, required: 'true' },
    {
      Form: InviteMembersForm,
      schema: InviteMembersSchema,
      required: 'form.addCouncil',
    },
    {
      Form: MemberQuorumThresholdForm,
      schema: MemberQuorumThresholdSchema,
      required: 'form.addCouncil',
    },
  ]

  async function handleSubmit() {
    console.log('submit clicked')
    try {
      console.log('connection', connected, wallet)
      if (!connected) {
        if (wallet) await wallet.connect()
      }
      if (!wallet?.publicKey) {
        throw new Error('No valid wallet connected')
      }
      // const formData = getFormData()
      // const programId = formData.testDao || true
      // ? DEFAULT_TEST_GOVERNANCE_PROGRAM_ID
      // : DEFAULT_GOVERNANCE_PROGRAM_ID

      const programId = DEFAULT_TEST_GOVERNANCE_PROGRAM_ID

      const governanceProgramId = new PublicKey(programId)
      const programVersion = await getGovernanceProgramVersion(
        connection.current,
        governanceProgramId
      )
      console.log('CREATE REALM Program', {
        governanceProgramId: governanceProgramId.toBase58(),
        programVersion,
      })

      setRequestPending(true)
      const results = await createMultisigRealm(
        connection.current,
        governanceProgramId,
        programVersion,
        formData.name,
        formData.quorumThreshold,
        formData.memberAddresses.map((w) => new PublicKey(w)),
        wallet
      )

      if (results) {
        setFormData({})
        push(
          fmtUrlWithCluster(`/dao/${results.realmPk.toBase58()}`),
          undefined,
          { shallow: true }
        )
      } else {
        throw new Error('Something bad happened during this request.')
      }
    } catch (error) {
      setRequestPending(false)
      const err = error as Error
      console.log(error)
      return notify({
        type: 'error',
        message: err.message,
      })
    }
  }

  return (
    <FormPage
      type={FORM_NAME}
      ssFormKey={SESSION_STORAGE_FORM_KEY}
      steps={steps}
      handleSubmit={handleSubmit}
      submissionPending={requestPending}
    />
  )
}
