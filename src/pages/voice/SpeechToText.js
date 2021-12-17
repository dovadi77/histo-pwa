import React from "react";
import { Button, Grid, Paper } from "@mui/material";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import Stack from "@mui/material/Stack";

function SpeechToText() {
	const [open, setOpen] = React.useState(false);

	//MARK: -Show or Hidden  PopUp
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	//MARK: -Command Speech Recognition
	const commands = [
		{
			command:
				"Kami bangsa Indonesia dengan ini menyatakan kemerdekaan Indonesia hal-hal yang mengenai pemindahan kekuasaan dan lain-lain diselenggarakan dengan cara seksama dan dalam tempo yang sesingkat-singkatnya",
			callback: () => handleClickOpen(),
		},
	];

	const { transcript, resetTranscript } = useSpeechRecognition({ commands });

	if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
		return null;
	}

	//MARK: -Component UI
	const paperStyle1 = {
		padding: 20,
		height: "40vh",
		width: 300,
		margin: "20px auto",
	};
	const paperStyle2 = {
		padding: 20,
		height: "30vh",
		width: 300,
		margin: "30px auto",
	};
	const btnStyleStart = {
		padding: 20,
		height: "7vh",
		width: 170,
		margin: "20px 15px",
	};
	const btnStyleStop = {
		padding: 20,
		height: "7vh",
		width: 170,
		margin: "20px auto",
	};
	const btnStyleReset = {
		padding: 20,
		height: "2vh",
		width: 20,
		margin: "20px 50px",
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"MERDEKA"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Pada hari Proklamasi Kemerdekaan yakni hari Jumat tanggal 17 Agustus
						1945 pukul 10.00 WIB., teks ini dibacakan oleh Soekarno didampingi
						Mohammad Hatta di serambi depan rumah Soekarno yang terletak di Jl.
						Pegangsaan Timur Nomor 56, Jakarta (sekarang Jl. Proklamasi Nomor 5,
						Jakarta Pusat).
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Lanjutkan</Button>
				</DialogActions>
			</Dialog>

			<Grid>
				<Paper elevation={10} style={paperStyle1}>
					<Grid align="center">
						<h2>Teks Proklamasi</h2>
					</Grid>
					<label>
						{" "}
						Kami bangsa Indonesia dengan ini menyatakan Kemerdekaan Indonesia.
						Hal-hal yang mengenai pemindahan kekuasaan dan lain lain, di
						selenggarakan dengan cara seksama dan dalam tempo yang
						sesingkat-singkatnya.{" "}
					</label>
				</Paper>
				<Paper elevation={10} style={paperStyle2}>
					<Grid align="center">
						<Stack spacing={1} direction="row">
							<h2>Hasil Input</h2>
							<Button
								onClick={resetTranscript}
								type="submit"
								color="primary"
								variant="contained"
								style={btnStyleReset}
							>
								Reset
							</Button>
						</Stack>
					</Grid>
					<p>{transcript}</p>
				</Paper>
				<Stack spacing={1} direction="row">
					<Button
						onClick={() =>
							SpeechRecognition.startListening({
								continuous: true,
								language: "id",
							})
						}
						type="submit"
						color="primary"
						variant="contained"
						style={btnStyleStart}
					>
						Start
					</Button>
					<Button
						onClick={SpeechRecognition.stopListening}
						type="submit"
						color="primary"
						variant="contained"
						style={btnStyleStop}
					>
						Stop
					</Button>
				</Stack>
			</Grid>
		</div>
	);
}

export default SpeechToText;