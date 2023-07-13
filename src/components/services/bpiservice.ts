import Axios from '../utils/AxiosInstance';

export const bpiServices = {
	getCoinDetails: async () => {
		return Axios().get('');
	},
};
