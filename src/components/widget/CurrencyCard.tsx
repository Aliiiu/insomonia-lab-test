import React from 'react';

interface ICurrencyDetails {
	description: string;
	symbol: string;
	rate: number;
	updated: string;
}

const CurrencyCard = ({
	description,
	symbol,
	rate,
	updated,
}: ICurrencyDetails) => {
	return (
		<div className='justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl rounded-xl border bg-gray-200'>
			<div className='p-6'>
				<code className='font-mono text-xs font-bold'>
					{description} ({symbol})
				</code>
				<div className='mt-4'>
					<code className='font-mono text-4xl font-bold'>${rate}</code>
				</div>
				<div className='mt-8 text-right'>
					<code
						suppressHydrationWarning
						className='font-mono text-[10px] font-bold'
					>
						last updated at {updated}
					</code>
				</div>
			</div>
		</div>
	);
};

export default CurrencyCard;
