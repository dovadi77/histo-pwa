import { useEffect, useState } from "react";
import Config from "../config";

function API() {
  const [response, setResponse] = useState(null);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const reqAPI = async (config) => {
      try {
        const response = await fetch(
          `${Config.apiBaseURL}${config.url}`,
          config.data
        );
        const data = await response.json();
        console.log(data);
        setResponse(data);
      } catch (err) {
        if (err.success === false) {
          console.log(err);
          setResponse(err);
        } else {
          setResponse({
            success: false,
            message: "Sistem sedang offline",
          });
        }
      }
    };
    if (config) {
      reqAPI(config);
    }
  }, [config]);

  return { response, setConfig };
}

export default API;
