import React from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Controller from "./Controller";

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<Controller />
			</ThemeProvider>
		</div>
	);
}

export default App;
