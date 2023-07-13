'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { chains } from '@/components/config/wagmi';
import NFTPage from '@/components/nftpage';
import WagmiProvider from '@/components/wagmi/WagmiProvider';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

const App = () => {
	return (
		<WagmiProvider>
			<RainbowKitProvider chains={chains}>
				<NFTPage />
			</RainbowKitProvider>
		</WagmiProvider>
	);
};

export default App;
