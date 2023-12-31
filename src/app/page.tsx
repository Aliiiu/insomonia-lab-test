'use client';

import { bpiServices } from '@/components/services/bpiservice';
import { useEffect, useState } from 'react';
import { Checkbox, Select } from 'antd';
import useLoading from '../../hooks/useLoading';
import { BounceLoader } from 'react-spinners';
import { IoWarning } from 'react-icons/io5';
import { Container } from '@/components/app-layout/Container';
import Image from 'next/image';
import CurrencyCard from '@/components/widget/CurrencyCard';
import { decodeEntities } from '@/components/utils/helper';

export default function Home() {
	const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([
		'USD',
		'GBP',
		'EUR',
	]);
	const [refreshInterval, setRefreshInterval] = useState<number>(5000);
	const [priceData, setPriceData] = useState<IBitcoinDetails>(
		{} as IBitcoinDetails
	);
	const { loading, startLoading, stopLoading } = useLoading(false);

	const fetchData = () => {
		startLoading();
		bpiServices
			.getCoinDetails()
			.then((res) => {
				// console.log(res.data);
				setPriceData(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				stopLoading();
			});
	};

	useEffect(() => {
		fetchData();
		const interval = setInterval(fetchData, refreshInterval);
		return () => {
			clearInterval(interval);
		};
	}, [refreshInterval]);

	const handleCurrencyToggle = (currency: string) => {
		const updatedCurrencies = selectedCurrencies.includes(currency)
			? selectedCurrencies.filter((c) => c !== currency)
			: [...selectedCurrencies, currency];
		setSelectedCurrencies(updatedCurrencies);

		localStorage.setItem(
			'selectedCurrencies',
			JSON.stringify(updatedCurrencies)
		);
	};

	const handleRefreshIntervalChange = (value: number) => {
		const newInterval = value;
		setRefreshInterval(newInterval);
		localStorage.setItem('refreshInterval', String(newInterval));
	};

	useEffect(() => {
		const storedInterval = localStorage.getItem('refreshInterval');
		if (storedInterval) {
			setRefreshInterval(Number(storedInterval));
		}
	}, []);

	useEffect(() => {
		const storedCurrencies = localStorage.getItem('selectedCurrencies');
		if (storedCurrencies) {
			setSelectedCurrencies(JSON.parse(storedCurrencies));
		}
	}, []);

	// console.log(selectedCurrencies);

	return (
		<Container>
			<div className='flex items-center gap-2 justify-center'>
				<div className='relative w-9 h-9 xl:w-12 xl:h-12'>
					<Image src={'/bitcoin.png'} alt='' layout='fill' />
				</div>
				<h1 className='font-bold text-center text-3xl md:text-4xl'>
					Bitcoin Price Index
				</h1>
			</div>
			{loading ? (
				<div className='flex justify-center items-center h-[30vh] pt-24'>
					<BounceLoader color='#fff' size={100} />
				</div>
			) : (
				<>
					{priceData ? (
						<>
							<p className='text-center mt-2 max-w-3xl mx-auto'>
								{priceData?.disclaimer || ''}
							</p>
							<div className='flex flex-col items-center mt-10'>
								<div className='flex flex-col gap-4'>
									<div className='flex flex-col gap-4 md:flex-row justify-between'>
										<label className='flex gap-1 items-center'>
											<p className='text-white'>Refresh Interval:</p>
											<Select
												value={refreshInterval}
												style={{ color: '#000' }}
												className='w-[120px] placeholder:text-black'
												onChange={handleRefreshIntervalChange}
												options={[
													{ value: 5000, label: '5 seconds' },
													{ value: 10000, label: '10 seconds' },
													{ value: 30000, label: '30 seconds' },
												]}
											/>
										</label>
										<div className='flex flex-col gap-2'>
											<Checkbox
												checked={selectedCurrencies.includes('USD')}
												onChange={() => handleCurrencyToggle('USD')}
											>
												<p className='font-medium'>
													{priceData?.bpi?.USD?.description || ''}
												</p>
											</Checkbox>
											<Checkbox
												checked={selectedCurrencies.includes('GBP')}
												onChange={() => handleCurrencyToggle('GBP')}
											>
												<p className='font-medium'>
													{priceData?.bpi?.GBP?.description || ''}
												</p>
											</Checkbox>
											<Checkbox
												checked={selectedCurrencies.includes('EUR')}
												onChange={() => handleCurrencyToggle('EUR')}
											>
												<p className='font-medium'>
													{priceData?.bpi?.EUR?.description || ''}
												</p>
											</Checkbox>
										</div>
									</div>
									<div className='mt-2 gap-4 grid grid-cols-1 sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3'>
										{selectedCurrencies.includes('USD') && (
											<CurrencyCard
												description={priceData?.bpi?.USD?.description}
												rate={priceData?.bpi?.USD?.rate_float}
												symbol={decodeEntities(priceData?.bpi?.USD?.symbol)}
												updated={priceData?.time?.updated}
											/>
										)}
										{selectedCurrencies.includes('GBP') && (
											<CurrencyCard
												description={priceData?.bpi?.GBP?.description}
												rate={priceData?.bpi?.GBP?.rate_float}
												symbol={decodeEntities(priceData?.bpi?.GBP?.symbol)}
												updated={priceData?.time?.updated}
											/>
										)}
										{selectedCurrencies.includes('EUR') && (
											<CurrencyCard
												description={priceData?.bpi?.EUR?.description}
												rate={priceData?.bpi?.EUR?.rate_float}
												symbol={decodeEntities(priceData?.bpi?.EUR?.symbol)}
												updated={priceData?.time?.updated}
											/>
										)}
									</div>
								</div>
							</div>
						</>
					) : (
						<div className='flex justify-center items-center py-10 px-5'>
							<span className='md:text-sm text-sm px-5 py-3 flex items-center leading-5 rounded-lg bg-gray-50 text-gray-500'>
								<IoWarning size={20} /> There are currently no available data
								for this service
							</span>
						</div>
					)}
				</>
			)}
		</Container>
	);
}
