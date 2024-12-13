"use strict";
import constants from "../utils/constants";
import { SettingsInstance } from "../background";
import { BrowserStorage } from "../utils/BrowserStorage";

import { pmt_CleanUpPdfs } from "./pmt/cleanUpPdfs";
import { pmt_HidePmtTutor } from "./pmt/hidePmtTutor";

import { sme_unblockRevisionNotes } from "./savemyexams/unblockRevisionNotes";
import { sme_removePremiumPlanBanners } from "./savemyexams/removePremiumPlanBanners";

import { studocu_HidePremiumBanners } from "./studocu/studocu_HidePremiumBanners";

/* 
TODO: make a MutationObserver function instead of repeating it everywhere
TODO: https://stackoverflow.com/a/39332340
        "Avoid using querySelector and especially the extremely slow querySelectorAll."
*/

(async function () {
    const storage = await BrowserStorage.getAll();

    // if there's still undefined initialise the storage
    if (Object.values(storage).some(s => s === undefined)) {
        await SettingsInstance.initStorage();
    }

    /** URL of the current page */
    const url = window.location.href;

    // TODO: make a url comparison function
    // on load
    addEventListener("load", () => {
        // PMT
        if (constants.urls.pmt.some(testUrl => url.startsWith(testUrl))) {
            if (storage.pmt_CleanUpPdfs) pmt_CleanUpPdfs();
            if (storage.pmt_BlockPmtTutor) pmt_HidePmtTutor();
        }
        // SaveMyExams
        if (constants.urls.sme.some(testUrl => url.startsWith(testUrl))) {
            if (storage.sme_unblockRevisionNotes) sme_unblockRevisionNotes();
            if (storage.sme_removePremiumPlanBanners)
                sme_removePremiumPlanBanners();
        }
        // studocu
        if (constants.urls.studocu.some(testUrl => url.startsWith(testUrl))) {
            if (storage.studocu_HidePremiumBanners)
                studocu_HidePremiumBanners();
        }
    });

    customUrlChangeEvent();
    window.addEventListener("urlchange", () => { });
})();

const customUrlChangeEvent = () => {
    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            //console.log("URL changed to", url);
            // Dispatch custom event
            window.dispatchEvent(new Event("urlchange"));
        }
    }).observe(document, { subtree: true, childList: true });
};
