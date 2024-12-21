/**
 * the url stuff
 */
export class URLManager {
	constructor(link = "") {
		/**
		 * @type {string} - the full link
		 */
		this.link = null;
		/**
		 * @type {string} - url protocol ('http', 'https')
		 */
		this.protocol = null;
		/**
		 * @type {string} - The domain of the URL (e.g., 'example.com').
		 */
		this.domain = null;
		/**
		 * @type {string} - The path of the URL (e.g., '/path/to/resource').
		 */
		this.path = null;

		this.init(link === "" ? window.location.href : link);
	}

	/**
	 * Sets the object's URL properties
	 *
	 * @param {string} url - The URL to extract information from.
	 * @returns {Object} url info
	 * @returns {string} return.protocol - url protocol ('http', 'https')
	 * @returns {string} return.domain - The domain of the URL (e.g., 'example.com').
	 * @returns {string} return.path - The path of the URL (e.g., '/path/to/resource').
	 */
	init = (url) => {
		const re = /^(https?):\/\/(?:www\.)?([^\/]+)(.*)/m;
		const match = re.exec(url);

		this.link = url;
		this.protocol = match[1];
		this.domain = match[2];
		this.path = match[3];
	};

	// --------------
	// Getters
	// --------------

	/**
	 * check if this object's URL matches certain domains.
	 * @param {string|string[]} domain - domains
	 * @returns {boolean} - true if domain matches url, null if domains is not an array
	 * */
	isDomain = (domains) => {
		if (typeof domains === "string") {
			return (
				this.domain.endsWith("." + domains) || this.domain == domains
			);
		}
		if (Array.isArray(domains)) {
			return domains.some((testDomain) => {
				return (
					this.domain.endsWith("." + testDomain) ||
					this.domain == testDomain
				);
			});
		}
		return null;
	};

	// --------------
	// Setters
	// --------------

	/**
	 * updates the URL of the current tab
	 * @param {string} newLink - new url
	 */
	changeLink = (newLink) => {
		window.location.href = newLink;
		this.init(newLink);
	};
}
