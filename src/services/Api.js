import axios from "axios";

let headers = {}
// if (localStorage.jwtToken) {
// 	headers['Authorization'] = 'Token ' + localStorage.jwtToken;
// }

export default () => {
	return axios.create({
		baseURL: "https://conduit.productionready.io/api",
		headers: headers
	});
};
