import axios from 'axios';
//import { env } from '../config/env';

export function deploySmartContract(request) {
	return () => axios('http://localhost:5000/smart-contract', {
		method: 'POST',
		data: request,
		headers: {
			'Content-Type': 'application/json'
		},
	});
}