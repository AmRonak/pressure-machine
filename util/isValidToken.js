import { jwtDecode } from "jwt-decode";

export const jwtTokenValidate = (token) => {
	try {
		const decodedToken = jwtDecode(token);
		const currentTime = Date.now() / 1000;
    const isValid = decodedToken.exp > currentTime;
		return isValid;
	} catch (error) {
		return false;
	}
};
