import axios from 'axios';

export const Axios = () => {
	return axios.create({
		baseURL: 'https://api.coindesk.com/v1/bpi/currentprice.json',
		timeout: 300000,
	});
};

export default Axios;
