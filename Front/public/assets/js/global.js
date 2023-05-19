export const funInGlob = () => {
	return "funInGlob!";
};
export const address = {
	protocol: window.location.protocol, // http
	host: window.location.host, // www.css-tricks.com
	path: window.location.pathname, // example/index.html
	port: window.location.port, // :88
	origin: window.location.origin, // http://css-tricks.com:88
	hash: window.location.hash, // #some
	href: window.location.href,
	path: function () {
		var href = window.location.href.split("/");
		var b_url = href[0] + "//" + href[2] + "/";
		return "/" + window.location.href.replace(b_url, "");
	},
	base_url: function () {
		var href = window.location.href.split("/");
		return href[0] + "//" + href[2] + "/";
	},
	param: function (name) {
		return decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.search) || [null, ""])[1].replace(/\+/g, "%20")) || null;
	},
};
