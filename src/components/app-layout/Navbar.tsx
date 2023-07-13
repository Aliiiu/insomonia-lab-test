'use client';

import React from 'react';
import { Container } from './Container';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NavBar = () => {
	const pathname = usePathname();
	return (
		<div className='fixed bg-black w-full z-10 shadow-sm'>
			<div className='border-b py-4 '>
				<Container>
					<div className='max-w-[500px] mx-auto'>
						<div className='flex items-center justify-between gap-3'>
							<Link
								href={'/'}
								className={`font-semibold text-neutral-100/70 hover:text-white ${
									pathname == '/' ? 'text-white' : ''
								}`}
							>
								BPI
							</Link>
							<Link
								href={'/nfts'}
								className={`font-semibold text-neutral-100/70 hover:text-white ${
									pathname == '/nfts' ? 'text-white' : ''
								}`}
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
