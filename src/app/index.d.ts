interface IBitcoinDetails {
	time: {
		updated: string;
		updatedISO: string;
		updateduk: string;
	};
	disclaimer: string;
	chartName: string;
	bpi: {
		[currencyCode: string]: {
			code: string;
			symbol: string;
			rate: string;
			description: string;
			rate_float: number;
		};
	};
}
