import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

function Toast({ color, message, openIt, setOpenIt }) {
	const [open, setOpen] = useState(false);

	// check if openIt value change
	useEffect(() => {
		setOpen(openIt);
	}, [openIt]);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
		setOpenIt();
	};

	const action = (
		<React.Fragment>
			<IconButton
				size="small"
				aria-label="close"
				color={color}
				onClick={handleClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	return (
		<div>
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
				message={message}
				action={action}
			/>
		</div>
	);
}

Toast.propTypes = {
	color: PropTypes.string,
	message: PropTypes.string,
	openIt: PropTypes.bool,
	setOpenIt: PropTypes.func,
};

export default Toast;
