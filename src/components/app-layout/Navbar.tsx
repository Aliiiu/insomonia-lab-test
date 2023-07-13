'use client';

import React from 'react';
import { Container } from './Container';
import Link from 'next/link';

const NavBar = () => {
	return (
		<div className='fixed w-full bg-white z-10 shadow-sm'>
			<div className='border-b py-4 '>
				<Container>
					<div className='max-w-[500px] mx-auto'>
						<div className='flex items-center justify-between gap-3'>
							<Link
								href={'/'}
								className='font-semibold text-neutral-800/70 hover:text-neutral-800'
							>
								BPI
							</Link>
							<Link
								href={'/nfts'}
								className='font-semibold text-neutral-800/70 hover:text-neutral-800'
							>
								NFTs
							</Link>
						</div>
					</div>
				</Container>
			</div>
		</div>
	);
};

export default NavBar;
