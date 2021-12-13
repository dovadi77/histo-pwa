import { useState } from "react";
import Cookies from "./../utils/Cookies";

function useToken() {
	const { checkCookie, setCookie } = Cookies();
	const getToken = () => {
		const tokenString = checkCookie("token");
		const userToken = JSON.parse(tokenString);
		return userToken?.token;
	};

	const [token, setToken] = useState(getToken());

	const saveToken = (userToken) => {
		if (userToken) {
			setCookie("token", JSON.stringify(userToken), 24);
			setToken(userToken.token);
		} else {
			setToken(userToken);
		}
	};

	return {
		setToken: saveToken,
		token,
	};
}

export default useToken;
