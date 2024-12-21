"use strict";

import { URLManager } from "../../utils/URLManager";

/**
 *
 * @param {URLManager} urlObj
 */
export const pmt_CleanUpPdfs = (urlObj) => {
	if (urlObj.path.startsWith("/pdf-pages")) {
		const newLink = decodeURIComponent(urlObj.link.split("?pdf=")[1]);
		urlObj.changeLink(newLink);
	}
};
