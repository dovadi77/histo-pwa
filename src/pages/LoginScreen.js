import React, { useState, useEffect } from "react";
import swal from "sweetalert2";
import useAPI from "../hooks/useAPI";
import Cookies from "../utils/Cookies";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toast from "../components/Toast";

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"Copyright © "}
			<Link color="inherit" href="#">
				Histo
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

export default function LoginScreen({ setToken }) {
	const [message, setMessage] = useState("");
	const [color, setColor] = useState("warning");
	const [open, setOpen] = useState(false);

	const setOpenIt = () => {
		setOpen(false);
	};

	const { setCookie, checkCookie } = Cookies();
	const { response, setConfig } = useAPI();

	let session = checkCookie("token");

	// check token valid or not
	if (session) {
		let sessionResponse = JSON.parse(session);
		// if token null then clear token
		if (!sessionResponse.token) {
			setCookie("token", null, 0, true);
			swal.fire({
				title: "Login Kembali",
				text: "Sesi sudah tidak valid, silahkan login kembali",
				showCloseButton: true,
				showConfirmButton: false,
				icon: "error",
				timer: 3000,
			});
		}
	}

	// if route redirect to login then clear token
	setCookie("token", null, 0, true);

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		data.getAll();
		let email = data.get("email");
		let password = data.get("password");
		if (email === "" || password === "") {
			setMessage("Email / Password tidak boleh kosong !!!");
			setColor("error");
			setOpen(true);
		} else {
			const config = {
				url: "user/login",
				data: {
					method: "post",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				},
			};
			setConfig(config);
		}
	};

	useEffect(() => {
		const login = (res) => {
			if (res.success) {
				setToken(res.data);
			} else {
				setMessage(res.message);
				setColor("error");
				setOpen(true);
			}
		};
		if (response) {
			return () => login(response);
		}
	}, [response, setToken]);

	return (
		<div>
			<CssBaseline />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<div className="centerTitle">
					<Typography component="h1" variant="h1" fontWeight="800">
						HISTO
					</Typography>
					<div style={{ transform: "translate(0,-1em)" }}>
						<Typography component="h2" variant="h4">
							Jasmerah
						</Typography>
					</div>
				</div>
				<div className="userForm">
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1, px: 6 }}
					>
						<div style={{ textAlign: "center", margin: "2em 0" }}>
							<Typography component="h3" variant="h5" fontWeight="500">
								Selamat Datang,
							</Typography>
							<Typography component="h3" variant="h5" fontWeight="500">
								Para Pejuang!
							</Typography>
						</div>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Masukkan email"
							name="email"
							autoComplete="email"
							type="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Masukkan password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							size="large"
							sx={{ mt: 3, mb: 2 }}
						>
							Masuk &#62;
						</Button>
						<Grid
							container
							direction="row"
							justifyContent="center"
							alignItems="center"
						>
							<Grid item>
								<Link href="register" variant="body2">
									{"Belum memiliki akun? Daftar"}
								</Link>
							</Grid>
						</Grid>
					</Box>
					<div style={{ position: "fixed", bottom: "12px", width: "100vw" }}>
						<Copyright />
					</div>
					<Toast
						color={color}
						message={message}
						openIt={open}
						setOpenIt={setOpenIt}
					/>
				</div>
			</Box>
		</div>
	);
}
