'use client';

import { createConfig, configureChains, mainnet } from 'wagmi';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { arbitrum, polygon, avalanche, bsc } from 'wagmi/chains';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)

const projectId = String(process.env.NEXT_PUBLIC_WALLET_CONNECT_ID);

export const { chains, publicClient, webSocketPublicClient } = configureChains(
	[arbitrum, mainnet, polygon, avalanche, bsc],
	[
		alchemyProvider({
			apiKey: String(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY),
		}),
		publicProvider(),
	]
);

const { connectors } = getDefaultWallets({
	appName: 'Web3 test',
	projectId: projectId,
	chains,
});

// Set up wagmi config
export const config = createConfig({
	autoConnect: true,
	connectors: connectors,
	publicClient,
	webSocketPublicClient,
});
