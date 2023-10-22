import type { NextApiRequest, NextApiResponse } from 'next'
import blockfrost from '@/utils/blockfrost'
import { firebase, firestore } from '@/utils/firebase'
import resolveUtxos from '@/functions/resolveUtxos'
import type { Address, StakeKey } from '@/@types'
import { POLICY_IDS } from '@/constants'

export const config = {
  api: {
    responseLimit: false,
  },
}

interface BlockfrostBody {
  id: string
  webhook_id: string
  created: number
  api_version: number
  type: 'transaction'
  payload: {
    tx: {
      hash: string
      block: string
      block_height: number
      block_time: number
      slot: number
      index: number
      output_amount: { unit: string; quantity: string }[]
      fees: string
      deposit: string
      size: number
      invalid_before: string
      invalid_hereafter: string
      utxo_count: number
      withdrawal_count: number
      mir_cert_count: number
      delegation_count: number
      stake_cert_count: number
      pool_update_count: number
      pool_retire_count: number
      asset_mint_or_burn_count: number
      redeemer_count: number
      valid_contract: boolean
    }
    inputs: {
      address: string
      amount: { unit: string; quantity: string }[]
      tx_hash: string
      output_index: number
      data_hash: string | null
      inline_datum: string | null
      reference_script_hash: string | null
      collateral: boolean
      reference: boolean
    }[]
    outputs: {
      address: string
      amount: { unit: string; quantity: string }[]
      tx_hash: string
      output_index: number
      data_hash: string | null
      inline_datum: string | null
      reference_script_hash: string | null
      collateral: boolean
      reference: boolean
    }[]
  }[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req

  const policyId = POLICY_IDS['LAB_PASS']

  try {
    switch (method) {
      case 'POST': {
        const fromAddresses: Address[] = []
        const toAddresses: Address[] = []

        for await (const payload of (body as BlockfrostBody).payload) {
          const utxos = await resolveUtxos([policyId], payload.tx.hash, payload)

          utxos.forEach(({ address }) => {
            if (!fromAddresses.includes(address.from)) fromAddresses.push(address.from)
            if (!toAddresses.includes(address.to)) toAddresses.push(address.to)
          })
        }

        const addHolderStakeKeys: StakeKey[] = []
        const removeHolderStakeKeys: StakeKey[] = []

        for await (const address of fromAddresses) {
          console.log('Fetching wallet of address:', address)

          const wallet = await blockfrost.addresses(address)
          const stakeKey = wallet.stake_address || ''

          console.log('Fetched wallet:', stakeKey)
          console.log('Fetching tokens of wallet:', stakeKey)

          const tokens = await blockfrost.accountsAddressesAssetsAll(stakeKey)

          console.log('Fetched tokens:', tokens.length)

          const isHolder = !!tokens.find(({ unit }) => unit.indexOf(policyId) === 0)

          if (isHolder && !!stakeKey && !addHolderStakeKeys.find((str) => str === stakeKey)) addHolderStakeKeys.push(stakeKey)
          if (!isHolder && !!stakeKey && !removeHolderStakeKeys.find((str) => str === stakeKey)) removeHolderStakeKeys.push(stakeKey)
        }

        for await (const address of toAddresses) {
          console.log('Fetching wallet of address:', address)

          const wallet = await blockfrost.addresses(address)
          const stakeKey = wallet.stake_address || ''

          console.log('Fetched wallet:', stakeKey)

          if (!!stakeKey && !addHolderStakeKeys.find((str) => str === stakeKey)) addHolderStakeKeys.push(stakeKey)
        }

        console.log('Handling DB data')

        const { FieldValue } = firebase.firestore
        const collection = firestore.collection('policy-holders')
        const { docs } = await collection.where('policyId', '==', policyId).get()

        if (docs.length) {
          const docId = docs[0].id

          await collection.doc(docId).update({
            stakeKeys: FieldValue.arrayRemove(...removeHolderStakeKeys.concat(addHolderStakeKeys)),
          })

          await collection.doc(docId).update({
            stakeKeys: FieldValue.arrayUnion(...addHolderStakeKeys),
          })
        } else {
          await collection.add({
            policyId,
            stakeKeys: addHolderStakeKeys,
          })
        }

        console.log('Successfully handled DB data')

        return res.status(204).end()
      }

      default: {
        res.setHeader('Allow', 'POST')
        return res.status(405).end()
      }
    }
  } catch (error: any) {
    console.error(error)
    return res.status(500).end()
  }
}

export default handler
