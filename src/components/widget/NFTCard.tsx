'use client';

import { OwnedNft } from 'alchemy-sdk';
import Image from 'next/image';
import React from 'react';

const NFTCard = ({ data }: { data: OwnedNft }) => {
	return (
		<div className='col-span-1 shadow-xl bg-gray-100 rounded-xl p-4 cursor-pointer group'>
			<div className='flex flex-col gap-1 w-full'>
				<div className='aspect-square w-full bg-gray-300 relative overflow-hidden rounded-xl'>
					<Image
						fill
						className='object-cover h-full w-full group-hover:scale-110 transition'
						src={data?.media[0]?.gateway}
						alt='Listing'
					/>
				</div>
				<p className='text-sm font-semibold mt-3 capitalize'>{data.title}</p>
				<p className='text-sm capitalize'>{data.description}</p>
				<p className='text-sm'>{data.tokenId}</p>
				<p className='text-sm'>{data.contract.address}</p>
			</div>
		</div>
	);
};

export default NFTCard;
