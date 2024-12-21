"use strict";

export const pmt_HideUnnecessaryElements = () => {
	// top white bar
	document.getElementById("PMT_Top")?.remove();
	// advertisement
	document.getElementById("pmt_eoc_parrent")?.remove();
};
