"use strict";

export const pmt_CleanUpPdfs = () => {
	const url = window.location.href;
	if (!url.startsWith("https://www.physicsandmathstutor.com/pdf-pages/"))
		return;
	window.location.href = decodeURIComponent(url.split("?pdf=")[1]);
};