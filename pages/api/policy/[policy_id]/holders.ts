import type { NextApiRequest, NextApiResponse } from 'next'
import blockfrost from '@/utils/blockfrost'
import { firestore } from '@/utils/firebase'
import type { PolicyId, StakeKey } from '@/@types'
import { POLICY_IDS } from '@/constants'

export const config = {
  api: {
    responseLimit: false,
  },
}

export interface PolicyHoldersResponse {
  policyId: PolicyId
  stakeKeys: StakeKey[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<PolicyHoldersResponse>) => {
  const { method, query } = req

  const policyId = query.policy_id?.toString()

  if (!policyId) {
    return res.status(400).end()
  }

  if (![POLICY_IDS['LAB_PASS'].includes(policyId)]) {
    return res.status(400).end('that policy id is not allowed')
  }

  try {
    switch (method) {
      case 'GET': {
        console.log('Handling DB data')

        const collection = firestore.collection('policy-holders')
        const { docs } = await collection.where('policyId', '==', policyId).get()

        console.log('Successfully handled DB data')

        if (docs.length) {
          return res.status(200).json({
            policyId,
            stakeKeys: docs[0].data().stakeKeys,
          })
        } else {
          return res.status(200).json({
            policyId,
            stakeKeys: [],
          })
        }
      }

      case 'HEAD': {
        console.log('Fetching tokens of Policy ID:', policyId)

        const fetchedTokens = await blockfrost.assetsPolicyByIdAll(policyId)

        console.log('Fetched tokens:', fetchedTokens.length)

        const stakeKeys: StakeKey[] = []

        for await (const { asset: tokenId } of fetchedTokens) {
          console.log('Fetching addresses of Token ID:', tokenId)

          const assetAddresses = await blockfrost.assetsAddresses(tokenId)

          console.log('Fetched addresses:', assetAddresses.length)

          for await (const { address } of assetAddresses) {
            console.log('Fetching wallet of address:', address)

            const wallet = await blockfrost.addresses(address)
            const stakeKey = wallet.stake_address || ''

            console.log('Fetched wallet:', stakeKey)

            if (!!stakeKey && !stakeKeys.find((str) => str === stakeKey)) stakeKeys.push(stakeKey)
          }
        }

        console.log('Handling DB data')

        const collection = firestore.collection('policy-holders')
        const { docs } = await collection.where('policyId', '==', policyId).get()

        if (docs.length) {
          await collection.doc(docs[0].id).set({
            policyId,
            stakeKeys,
          })
        } else {
          await collection.add({
            policyId,
            stakeKeys,
          })
        }

        console.log('Successfully handled DB data')

        return res.status(204).end()
      }

      default: {
        res.setHeader('Allow', 'GET')
        res.setHeader('Allow', 'HEAD')
        return res.status(405).end()
      }
    }
  } catch (error: any) {
    console.error(error)
    return res.status(500).end()
  }
}

export default handler
