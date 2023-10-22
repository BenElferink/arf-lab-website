export type StakeKey = string
export type Address = string

export type PolicyId = string
export type TokenId = string
export type TransactionId = string

export interface Utxo {
  address: {
    from: Address
    to: Address
  }
  tokens: {
    tokenId: TokenId
    tokenAmount: number
  }[]
}

export interface TakeoverProject {
  logo: string
  name: string
  description: string
  links: string[]
}
