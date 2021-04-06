import { refresh } from "./instance"
import qs from 'qs';

export const getAccessToken = () => {
	const response = refresh.post(
		'oauth/check_token', 
		qs.stringify(
		{ 
			grant_type: "refresh_token", 
			refresh_token: localStorage.getItem('refresh_token') 
		})  
	);
	console.log(response);
}