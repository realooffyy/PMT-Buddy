"use strict";

import constants from "../../utils/constants";
import { URLManager } from "../../utils/URLManager";

/**
 *
 * @param {URLManager} urlObj
 */
export const pmt_redirectToCoUk = (urlObj) => {
	if (!urlObj.isDomain(constants.domains.pmt_com)) return;
	urlObj.changeLink(
		urlObj.link.replace(
			constants.domains.pmt_com,
			constants.domains.pmt_co_uk
		)
	);
};
