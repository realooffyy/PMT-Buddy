"use strict";

// TODO: use MutationObserver

export const pmt_HidePmtTutor = () => {
	// top banner
	document.querySelectorAll(".info-banner").forEach((banner) => {
		const link = banner.querySelector(".info-button")?.href ?? "";
		if (/https:\/\/www\.pmt\.education\/tutor\/.*/.test(link))
			banner.remove();
	});

	// tutor buttons
	document.getElementById("menu-item-23502")?.remove(); // revision courses
	document.getElementById("menu-item-44285")?.remove(); // find a tutor

	// ads
	const ads = document.getElementsByTagName("pmt_eoc_parrent");
	console.log(ads.length);

	// tutor profile box(es)
	const tutors = document.querySelectorAll(".tutor-profile-box");
	tutors.forEach((el) => el.remove());

	// preparation courses
	const courses = document.querySelectorAll(".dropshadowboxes-container");
	courses.forEach((el) => {
		const links = el.getElementsByTagName("a");
		if (links)
			Array.from(links).forEach((link) => {
				const literalLink = link?.href ?? "";
				console.log(literalLink);
				if (
					/https:\/\/www\.pmt\.education\/(courses|tutor)\/.*/.test(
						literalLink
					)
				)
					el.remove();
				return;
			});
	});
};
