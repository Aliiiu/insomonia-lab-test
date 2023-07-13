'use client';

import { WagmiConfig } from 'wagmi';
import React, { ReactNode } from 'react';
import { config } from '../config/wagmi';

const WagmiProvider = ({ children }: { children: ReactNode }) => {
	return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

export default WagmiProvider;
