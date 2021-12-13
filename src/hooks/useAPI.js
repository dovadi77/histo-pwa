import { useEffect, useState } from "react";
import Config from "../config";

function API() {
	const [response, setResponse] = useState(null);
	const [config, setConfig] = useState(null);

	useEffect(() => {
		const reqAPI = async (config) => {
			const response = await fetch(
				`${Config.apiBaseURL}${config.url}`,
				config.data
			);
			const data = await response.json();
			setResponse(data);
		};
		if (config) {
			reqAPI(config);
		}
	}, [config]);

	return { response, setConfig };
}

export default API;
