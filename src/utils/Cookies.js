function Cookies() {
	function setCookie(cName, cValue, expTimeinH, del) {
		let expires = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
		if (!del) {
			let d = new Date();
			d.setTime(d.getTime() + expTimeinH * 60 * 60 * 1000);
			expires = "expires=" + d.toUTCString();
		}
		document.cookie = cName + "=" + cValue + ";" + expires + ";path=/";
	}

	function getCookie(cName) {
		let name = cName + "=";
		let ca = document.cookie.split(";");
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === " ") {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return null;
	}

	function checkCookie(cName) {
		let cookie = getCookie(cName);
		if (cookie) {
			return cookie;
		}
		return null;
	}
	return {
		checkCookie,
		setCookie,
	};
}

export default Cookies;
