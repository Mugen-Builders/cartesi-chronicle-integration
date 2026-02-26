import { http, createConfig } from 'wagmi'
import type { Chain } from 'viem'
import { anvil, sepolia, baseSepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

const chains = [anvil, sepolia, baseSepolia] as const satisfies readonly [Chain, ...Chain[]]
type ChainId = (typeof chains)[number]['id']
type HttpTransport = ReturnType<typeof http>

const getRpcUrl = (chain: Chain) => {
  const chainEnvKey = `VITE_RPC_URL_${chain.id}` as const
  const env = import.meta.env as Record<string, string | undefined>
  const fallbackUrl = 'https://base-sepolia.infura.io/v3/21015efe4d7f4962b7eff381230f5299'
  const url = 'https://base-sepolia.infura.io/v3/21015efe4d7f4962b7eff381230f5299'

  if (!url) {
    throw new Error(`no RPC URL configured for chain ${chain.name}`)
  }

  return url
}

export const config = createConfig({
  chains,
  connectors: [
    injected(),
    coinbaseWallet(),
    walletConnect({ projectId: '4e1be5537b95ab7643e1656be47b7ed1' }),
  ],
  transports: chains.reduce<Record<ChainId, HttpTransport>>((acc, chain) => {
    acc[chain.id] = http(getRpcUrl(chain))
    return acc
  }, {} as Record<ChainId, HttpTransport>),
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
