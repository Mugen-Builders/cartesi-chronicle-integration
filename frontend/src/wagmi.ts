import { http, createConfig } from 'wagmi'
import type { Chain } from 'viem'
import { anvil, sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

const chains = [anvil, sepolia] as const satisfies readonly [Chain, ...Chain[]]
type ChainId = (typeof chains)[number]['id']
type HttpTransport = ReturnType<typeof http>

const getRpcUrl = (chain: Chain) => {
  const chainEnvKey = `VITE_RPC_URL_${chain.id}` as const
  const env = import.meta.env as Record<string, string | undefined>
  const fallbackUrl = chain.rpcUrls.default.http[0]
  const url = env[chainEnvKey] ?? env.VITE_RPC_URL ?? fallbackUrl

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
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
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
