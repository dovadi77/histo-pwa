import React from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Controller from "./Controller";
import { BrowserRouter } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Controller />
				</BrowserRouter>
			</ThemeProvider>
		</div>
	);
}

export default App;
