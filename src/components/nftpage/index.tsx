'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Network, Alchemy, OwnedNftsResponse } from 'alchemy-sdk';
import { Container } from '../app-layout/Container';
import NFTCard from '../widget/NFTCard';
import { BounceLoader } from 'react-spinners';
import { IoWarning } from 'react-icons/io5';

const NFTPage = () => {
	const { address, isConnecting, isDisconnected, isConnected } = useAccount();

	const [data, setData] = useState<OwnedNftsResponse>();

	const settings = {
		apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
		network: Network.ETH_SEPOLIA,
	};

	const alchemy = new Alchemy(settings);

	useEffect(() => {
		const nftLists = async (userAddress: string) => {
			return await alchemy.nft.getNftsForOwner(userAddress);
		};

		if (address) {
			nftLists(address)
				.then((res) => {
					console.log(res);
					setData(res);
				})
				.catch((err) => console.log(err));
		}
	}, [address]);

	return (
		<Container>
			<div className='flex flex-col items-center'>
				<h1 className='font-bold text-center mb-5 text-2xl md:text-4xl'>
					NFT Showcase
				</h1>
				<ConnectButton />
			</div>

			{isConnecting ? (
				<div className='flex justify-center items-center h-[30vh] pt-24'>
					<BounceLoader color='#fff' size={100} />
				</div>
			) : isConnected ? (
				Number(data?.totalCount || 0) > 0 ? (
					<div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8'>
						{data?.ownedNfts.map((nft) => (
							<NFTCard key={nft.tokenId} data={nft} />
						))}
					</div>
				) : (
					<div className='flex justify-center items-center py-10 px-5'>
						<div className='md:text-sm text-sm px-5 py-3 flex items-center leading-5 rounded-lg bg-gray-50 text-gray-500'>
							<IoWarning size={20} /> There are currently no available data for
							this service
						</div>
					</div>
				)
			) : (
				''
			)}
		</Container>
	);
};

export default NFTPage;
