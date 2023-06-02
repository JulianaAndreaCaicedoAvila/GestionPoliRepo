/* global v2.5 - www.nemedi.com */

window._usr = null;
window._conf = null;
window._debug = true;
window._sep = "--------------------------------------------------\n";
window._cnf = {
	Environment: window._env, // La variable "_env" en web.config (Development, Production)
};

// 202212021211: https://stackoverflow.com/a/7228322
let rdnBetween = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

// 202205291039: https://stackoverflow.com/a/38552302
let parseJwt = function (token) {
	var base64Url = token.split(".")[1];
	var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	var jsonPayload = decodeURIComponent(
		atob(base64)
			.split("")
			.map(function (c) {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);
	return JSON.parse(jsonPayload);
};

var gaugePercent = function (el) {
	var p = el.find(".nmd-percent");
	// console.log(_sep + "percent:");
	if (p.length === 0) {
		// console.log(p.length);
		var data = el.data("porcentaje");
		// console.log(data);
		if (typeof data !== "undefined" && typeof data.color !== "undefined" && typeof data.avance !== "undefined") {
			data.color = "#333333";
			p = $("<span class='nmd-percent slide " + data.align + "' style='color:" + data.color + "'>" + data.avance.toString().replace(".", ",") + "</span>");
			el.prepend(p);
			setTimeout(function () {
				var bar = el.find(".dxbg-bar-gauge");
				if (bar.length > 0) {
					var w = bar.width();
					var pos = bar.position();
					var left = bar.offset().left - el.offset().left;
					// console.log("Width:" + w);
					// console.log("Left: " + left);
					// console.log(pos);
					p.css({ width: w + "px", left: left + "px" });
					p.fadeIn(1000, function () {});
				}
			}, 500);
		}
	}
};

var gaugeOptions = {
	color: "#cccccc",
	size: { height: 160, width: 120 },
	backgroundColor: "#eeeeee",
	animation: { duration: 3000 },
	baseValue: 0,
	startValue: 0,
	endValue: 100,
	values: [47.27],
	margin: {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	barSpacing: 0,
	geometry: { startAngle: 90, endAngle: 90 },
	palette: [],
	theme: "none",
	export: { enabled: false },
	relativeInnerRadius: 0.75,
	onDrawn: function (e) {
		// console.clear();
		// console.log(e.element);
		// e.element.hide();
		gaugePercent(e.element);
		// e.element.fadeIn(slideTime);
		// console.log("onDraw");
	},
	label: {
		connectorColor: null,
		connectorWidth: 0,
		customizeText: function (data) {
			return data.valueText + "%";
		},
		font: {
			color: "red",
			family: "Work Sans",
			opacity: 1,
			size: 16,
			weight: 400,
		},
		format: null,
		indent: 20,
		precision: null,
		visible: false,
	},
	title: {
		text: null,
		horizontalAlignment: "center",
		verticalAlignment: "bottom",
		font: {
			size: 14,
			weight: 600,
			family: "Work Sans",
			color: "#333",
		},
		margin: {
			top: 10,
		},
		subtitle: {
			text: null,
			horizontalAlignment: "center",
			verticalAlignment: "bottom",
			font: {
				size: 15,
				weight: 400,
				family: "Work Sans",
				color: "#333",
			},
			margin: {
				top: 25,
			},
		},
	},
};

// 201911251050: Desabilita salidas en producción
if (window._cnf.Environment === "Production") {
	window.console.log = function () {};
	window.console.info = function () {};
	window.console.clear = function () {};
	window.console.warn = function () {};
}

// 201907311327: Format number
function formatNumber(v) {
	return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// 201907170331: Color
// https://stackoverflow.com/a/13542669
// Version 4.0
const pSBC = (p, c0, c1, l) => {
	let r,
		g,
		b,
		P,
		f,
		t,
		h,
		i = parseInt,
		m = Math.round,
		a = typeof c1 == "string";
	if (typeof p != "number" || p < -1 || p > 1 || typeof c0 != "string" || (c0[0] != "r" && c0[0] != "#") || (c1 && !a)) return null;
	if (!this.pSBCr)
		this.pSBCr = (d) => {
			let n = d.length,
				x = {};
			if (n > 9) {
				([r, g, b, a] = d = d.split(",")), (n = d.length);
				if (n < 3 || n > 4) return null;
				(x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4))), (x.g = i(g)), (x.b = i(b)), (x.a = a ? parseFloat(a) : -1);
			} else {
				if (n == 8 || n == 6 || n < 4) return null;
				if (n < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : "");
				d = i(d.slice(1), 16);
				if (n == 9 || n == 5) (x.r = (d >> 24) & 255), (x.g = (d >> 16) & 255), (x.b = (d >> 8) & 255), (x.a = m((d & 255) / 0.255) / 1000);
				else (x.r = d >> 16), (x.g = (d >> 8) & 255), (x.b = d & 255), (x.a = -1);
			}
			return x;
		};
	(h = c0.length > 9),
		(h = a ? (c1.length > 9 ? true : c1 == "c" ? !h : false) : h),
		(f = pSBCr(c0)),
		(P = p < 0),
		(t =
			c1 && c1 != "c"
				? pSBCr(c1)
				: P
				? {
						r: 0,
						g: 0,
						b: 0,
						a: -1,
				  }
				: {
						r: 255,
						g: 255,
						b: 255,
						a: -1,
				  }),
		(p = P ? p * -1 : p),
		(P = 1 - p);
	if (!f || !t) return null;
	if (l) (r = m(P * f.r + p * t.r)), (g = m(P * f.g + p * t.g)), (b = m(P * f.b + p * t.b));
	else (r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5)), (g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5)), (b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5));
	(a = f.a), (t = t.a), (f = a >= 0 || t >= 0), (a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0);
	if (h) return "rgb" + (f ? "a(" : "(") + r + "," + g + "," + b + (f ? "," + m(a * 1000) / 1000 : "") + ")";
	else {
		return "#" + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2);
	}
};

// 201808140739: Limpia texto de Html
function CleanText(text) {
	var el = $(text.replaceAll("<p><br></p>", "").replaceAll("<br></p>", "</p>").replaceAll(' style=""', "").replaceAll("\r\n", "").replaceAll(_bp, "/"));
	el.find("*").removeAttr("style").removeAttr("id").removeAttr("class");
	return el.outerHtml();
}

/* --------------------------------------------------------------------------------------- */
/* Style extensions */

CSSStyleSheet.prototype.getClass = function (cssSelector) {
	var styleSheet = this;
	if (styleSheet !== null) {
		for (var x = 0; x < styleSheet.cssRules.length; x++) {
			var t = styleSheet.cssRules[x].selectorText;
			if (t.indexOf(cssSelector) > -1) {
				return styleSheet.cssRules[x].style;
			}
		}
	}
	return null;
};

var style = {
	contains: function (base, tosearch) {
		return base.length > 0 && base.indexOf(tosearch) > -1;
	},
	get: function (href) {
		for (var x = 0; x < document.styleSheets.length; x++) {
			if (this.contains(document.styleSheets[x].href.toLowerCase(), href)) {
				return document.styleSheets[x];
			}
		}
		return null;
	},
	getClass: function (href, cssSelector) {
		var styleSheet = this.get(href);
		if (styleSheet !== null) {
			for (var x = 0; x < styleSheet.cssRules.length; x++) {
				var cssRule = styleSheet.cssRules[x];
				if (this.contains(cssRule.selectorText, cssSelector)) {
					return cssRule;
				}
			}
		}
		return null;
	},
};

/* --------------------------------------------------------------------------------------- */
/* Object extensions */

function Copy(from, to) {
	if (type.of(from) !== "object") {
		console.warn("Copy(from, to) -> El parámetro 'from' no es un objeto");
		return;
	}
	if (type.of(to) !== "object") {
		console.warn("Copy(from, to) -> El parámetro 'to' no es un objeto");
		return;
	}
	for (var key in to) {
		if (from.hasOwnProperty(key)) to[key] = from[key];
	}
	return Clone(to);
}

function Clone(obj) {
	if (type.of(obj) === "array") {
		var array = [];
		window.jQuery.each(obj, function (idx, item) {
			array.push(Clone(item));
		});
		return array;
	} else if (type.of(obj) === "object") {
		var object = window.jQuery.extend(true, {}, obj);
		for (var key in object) if (object.hasOwnProperty(key)) if (key.toString().contains("$")) delete object[key];
		return object;
	}
}

/* --------------------------------------------------------------------------------------- */
/* Array extensions */
Array.prototype.removeLast = function () {
	return this.pop();
};

Array.prototype.removeByIndex = function (from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

Array.prototype.getIndex = function (val) {
	var arr = this;
	for (var x = 0; x < arr.length; x++) if (arr[x] === val) return x;
	return -1;
};

// 201804252352: Nueva optimizada
// https://stackoverflow.com/a/3955096
Array.prototype.remove = function () {
	var what,
		a = arguments,
		L = a.length,
		ax;
	while (L && this.length) {
		what = a[--L];
		while ((ax = this.indexOf(what)) !== -1) {
			this.splice(ax, 1);
		}
	}
	console.log("Array.prototype.remove: " + JSON.stringify(this));
	return this;
};
Array.prototype.contains = function (val) {
	var arr = this;
	for (var x = 0; x < arr.length; x++) if (arr[x] === val) return true;
	return false;
};
Array.prototype.sortBy = function (key) {
	var array = this;
	return array.sort(function (a, b) {
		var x = a[key];
		var y = b[key];
		return x < y ? -1 : x > y ? 1 : 0;
	});
};
Array.prototype.add = function (value) {
	if (!this.contains(value)) this.push(value);
	return value;
};

/* --------------------------------------------------------------------------------------- */
/* String extensions */

if (!String.prototype.trim)
	(function () {
		var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
		String.prototype.trim = function () {
			return this.replace(rtrim, "");
		};
	})();

String.prototype.padLeft = function (length, padString) {
	var str = this;
	while (str.length < length) str = padString + str;
	return str;
};

String.prototype.contains = function (tosearch) {
	if (this.length > 0) if (this.indexOf(tosearch) > -1) return true;
	return false;
};

String.prototype.reverse = function () {
	return this.split("").reverse().join("");
};

String.prototype.capitalize = function () {
	return this.substring(0, 1).toUpperCase() + this.substring(1).toLowerCase();
};

// 201810231804:
// Parse JSON to receive a Date object in JavaScript \/Date(1293034567877)\/
// https://stackoverflow.com/a/14509447
String.prototype.dateFromJson = function () {
	if (this !== null) {
		var a = /\/Date\((\d*)\)\//.exec(this);
		return a ? new Date(+a[1]) : null;
	}
	return null;
};

// 201810231804:
// Parse JSON to receive a Date object in JavaScript \/Date(1293034567877)\/
// https://stackoverflow.com/a/14509447
Date.prototype.dateFromJson = function () {
	return this;
};

String.prototype.replaceAll = function (buscar, reemplazar) {
	return this.replace(new RegExp(buscar, "g"), reemplazar);
};

String.prototype.capitalizeAll = function () {
	var str = this.toLowerCase();
	var len = str.length;
	if (len > 0)
		for (var x = 0; x < len; x++) {
			var tmpchar;
			var poststr;
			if (x === 0) {
				tmpchar = str.substring(0, 1).toUpperCase();
				poststr = str.substring(1, len);
				str = tmpchar + poststr;
			} else {
				tmpchar = str.substring(x, x + 1);
				if (tmpchar === " " && x < len - 1) {
					tmpchar = str.substring(x + 1, x + 2).toUpperCase();
					var prestr = str.substring(0, x + 1);
					poststr = str.substring(x + 2, len);
					str = prestr + tmpchar + poststr;
				}
			}
		}
	return str;
};

String.prototype.getExtension = function () {
	var re = /(?:\.([^.]+))?$/;
	return re.exec(this.toLowerCase())[1];
};

String.prototype.getIcon = function () {
	var ext = this.getExtension();
	if (ext === "jpeg" || ext === "jpg" || ext === "bmp" || ext === "gif" || ext === "png") ext = "picture";
	else if (ext === "mp3" || ext === "ogg" || ext === "wav") ext = "music";
	else if (ext === "pdf") ext = "pdf";
	else ext = "text2";
	return "icon-file-" + ext;
};

String.prototype.e64 = function () {
	var data = this;
	var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var o1,
		o2,
		o3,
		h1,
		h2,
		h3,
		h4,
		bits,
		i = 0,
		ac = 0,
		enc = "",
		tmp_arr = [];
	if (!data) return data;
	do {
		o1 = data.charCodeAt(i++);
		o2 = data.charCodeAt(i++);
		o3 = data.charCodeAt(i++);
		bits = (o1 << 16) | (o2 << 8) | o3;
		h1 = (bits >> 18) & 0x3f;
		h2 = (bits >> 12) & 0x3f;
		h3 = (bits >> 6) & 0x3f;
		h4 = bits & 0x3f;
		tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
	} while (i < data.length);
	enc = tmp_arr.join("");
	var r = data.length % 3;
	return (r ? enc.slice(0, r - 3) : enc) + "===".slice(r || 3);
};
String.prototype.d64 = function () {
	var data = this;
	var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var o1,
		o2,
		o3,
		h1,
		h2,
		h3,
		h4,
		bits,
		i = 0,
		ac = 0,
		dec = "",
		tmp_arr = [];
	if (!data) return data;
	data += "";
	do {
		h1 = b64.indexOf(data.charAt(i++));
		h2 = b64.indexOf(data.charAt(i++));
		h3 = b64.indexOf(data.charAt(i++));
		h4 = b64.indexOf(data.charAt(i++));
		bits = (h1 << 18) | (h2 << 12) | (h3 << 6) | h4;
		o1 = (bits >> 16) & 0xff;
		o2 = (bits >> 8) & 0xff;
		o3 = bits & 0xff;
		if (h3 === 64) tmp_arr[ac++] = String.fromCharCode(o1);
		else if (h4 === 64) tmp_arr[ac++] = String.fromCharCode(o1, o2);
		else tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
	} while (i < data.length);
	dec = tmp_arr.join("");
	return dec;
};

String.prototype.dc = function () {
	return this.d64().d64().reverse();
};
String.prototype.delRight = function (num) {
	return this.substring(0, this.length - num);
};
String.prototype.delLeft = function (num) {
	return this.substring(num);
};
String.prototype.between = function (start, end) {
	return this.match(start + "(.*)" + end)[1];
};

String.prototype.decodeHtml = function () {
	/*
	// 201703141831: http://stackoverflow.com/a/9609450
    var str = this;
    // this prevents any overhead from creating the object each time
    var element = document.createElement('div');
    function decodeHTMLEntities (){
        if(str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
        }
        return str;
    }
    return decodeHTMLEntities;
	*/

	// 201808190849: https://stackoverflow.com/a/31350391
	var textArea = document.createElement("textarea");
	textArea.innerHTML = this;
	return textArea.value;
};

// 201806080248: https://stackoverflow.com/a/19547843
String.prototype.unwrap = function (tagname, extra) {
	var wrapper = document.createElement("div");
	wrapper.innerHTML = this;
	var root = wrapper.firstChild;
	// this function does the hard work for us
	var elms = root.getElementsByTagName(tagname),
		l = elms.length,
		x;
	console.log("length:" + l);
	for (var x = l - 1; x >= 0; x--) {
		// work backwards to avoid possible complications with nested spans
		while (elms[x].firstChild) elms[x].parentNode.insertBefore(elms[x].firstChild, elms[x]);
		if (extra) extra(elms[x]);
		elms[x].parentNode.removeChild(elms[x]);
	}
	return root.innerHTML;
};

/* Number extensions */

Number.prototype.format = function (decimals, dec_point, thousands_sep) {
	var number = this;
	number = (number + "").replace(/[^0-9+-Ee.]/g, "");
	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = typeof thousands_sep === "undefined" ? "." : thousands_sep,
		dec = typeof dec_point === "undefined" ? "," : dec_point,
		s = "",
		toFixedFix = function (n, prec) {
			var k = Math.pow(10, prec);
			return "" + Math.round(n * k) / k;
		};
	// Fix for IE parseFloat(0.55).toFixed(0) = 0;
	s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
	if (s[0].length > 3) s[0] = s[0].replace(/B(?=(?:d{3})+(?!d))/g, sep);
	if ((s[1] || "").length < prec) {
		s[1] = s[1] || "";
		s[1] += new Array(prec - s[1].length + 1).join("0");
	}
	return s.join(dec);
};

Number.prototype.sizeFormat = function () {
	var filesize = parseInt(this);
	if (filesize >= 1073741824) filesize = (filesize / 1073741824).format(2, ",", ".") + " GB";
	else if (filesize >= 1048576) filesize = (filesize / 1048576).format(2, ",", ".") + " MB";
	else if (filesize >= 1024) filesize = (filesize / 1024).format(0) + " KB";
	else filesize = filesize.format(0) + " Bytes";
	return filesize.replaceAll(",00", "");
};

/* Date extensions */

// 201810221852: Obtiene la fecha en formato dd/mm/yyyy
// https://stackoverflow.com/a/12409344
Date.prototype.getFormatted = function (date) {
	var date = this;
	var dd = date.getDate();
	var mm = date.getMonth() + 1; //January is 0!
	var yyyy = date.getFullYear();
	if (dd < 10) dd = "0" + dd;
	if (mm < 10) mm = "0" + mm;
	return dd + "/" + mm + "/" + yyyy;
};

// Funciones
Date.prototype.getHourAmPm = function (date) {
	var date = this;
	let suffix = "am";
	let hours = date.getHours();
	let minutes = date.getMinutes();
	if (hours > 12) {
		suffix = "pm";
		hours = hours - 12;
	}
	minutes = minutes <= 9 ? `${minutes}`.padStart(2, 0) : minutes;
	return hours + ":" + minutes + suffix;
};

// 202305302059
Date.prototype.getDateTimeAmPm = function (date) {
	var date = this;
	return date.getFormatted() + " " + date.getHourAmPm();
};

// 201612141726: Obtiene un Timestamp formato YYYYMMDDHHMMSS
// http://stackoverflow.com/a/19449076
Object.defineProperty(Date.prototype, "TS", {
	value: function () {
		function pad2(n) {
			// always returns a string
			return (n < 10 ? "0" : "") + n;
		}
		return this.getFullYear() + pad2(this.getMonth() + 1) + pad2(this.getDate()) + pad2(this.getHours()) + pad2(this.getMinutes()) + pad2(this.getSeconds());
	},
});

// 201811160954: Date locale
Date["locale"] = {
	dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
	abbreviatedDayNames: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
	shortestDayNames: ["do", "lu", "ma", "mi", "ju", "vi", "sá"],
	firstLetterDayNames: ["d", "l", "m", "m", "j", "v", "s"],
	monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
	abbreviatedMonthNames: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
	amDesignator: "a.m.",
	pmDesignator: "p.m.",
};

// Funciones
function getAmPm(hours) {
	if (type.of(hours) !== "number") hours = parseInt(hours);
	if (hours === 0 || hours === 24) return "12am";
	else if (hours === 12) return "12pm";
	else if (hours > 12) {
		hours = hours - 12;
		return hours + "pm";
	} else return hours + "am";
}

/* Window extensions */

// http://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen/16861050#16861050
Window.prototype.popup = function (url, name, width, height) {
	var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
	var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
	var clientWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	var clientHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
	var left = clientWidth / 2 - width / 2 + dualScreenLeft;
	var top = clientHeight / 2 - height / 2 + dualScreenTop;
	var newWindow = window.open(url, name, "scrollbars=yes, width=" + width + ", height=" + height + ", top=" + top + ", left=" + left);
	if (window.focus) newWindow.focus();
	return newWindow;
};

// Variables
var gAnalyticsKey = "UA-3173634-23";
var gMapsKey = "AIzaSyBctG1HrS4AvXGRIvOOSmrwZsazOlCqX8E";
var mainColor = "#367FB6"; // TODO: 201608031826 Integrar a "e:/files/scss/sass-to-js.scss"!
var animationEndSelector = "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd";
var tºsitionEndSelector = "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd";
//<div class="list-icons">
//<div class="dropdown">
//<a href="#" class="list-icons-item" data-toggle="dropdown">
//<i class="icon-menu9"></i>
//</a>
//<div class="dropdown-menu dropdown-menu-right">
//<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Export to .pdf</a>
//<a href="#" class="dropdown-item"><i class="icon-file-excel"></i> Export to .csv</a>
//<a href="#" class="dropdown-item"><i class="icon-file-word"></i> Export to .doc</a>
//</div>
//</div>
//</div>
var cmdList = function (s) {
	var r =
		'<div class="list-icons">\r\n<div class="dropdown">\r\n' +
		'<a title="Acciones..." href="#" class="list-icons-item text-main" data-toggle="dropdown">\r\n' +
		'<i class="icon-menu9"></i>\r\n</a>\r\n' +
		//	var r = '<ul class="icons-list">\r\n<li class="dropdown">\r\n'+
		//	'<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="Acciones...">\r\n'+
		//	'<i class="icon-cog7"></i>\r\n<span class="caret"></span>\r\n</a>\r\n'+
		'<div class="dropdown-menu dropdown-menu-right">\r\n';
	if (typeof s.hideDetail === "undefined" || !s.hideDetail)
		r += '<a href="#" title="Detalles..." class="dropdown-item cmd detail"><i class="icon-database-export"></i> Detalles</a>\r\n';
	if (typeof s.hideReport === "undefined" || !s.hideReport)
		r += '<a href="#" title="Reportar avance..." class="dropdown-item cmd report"><i class="icon-database-diff"></i> Avance</a>\r\n';
	if (typeof s.hideEdit === "undefined" || !s.hideEdit)
		r += '<a href="#" title="Editar..." class="dropdown-item cmd edit"><i class="icon-database-edit2"></i> Editar</a>\r\n';
	if (typeof s.hideEnable === "undefined" || !s.hideEnable)
		r += '<a href="#" title="Activar..." class="dropdown-item cmd enable"><i class="icon-database-check"></i> Activar</a>\r\n';
	if (typeof s.hideDisable === "undefined" || !s.hideDisable)
		r += '<a href="#" title="Desactivar..." class="dropdown-item cmd disable"><i class="icon-database-remove"></i> Desactivar</a>\r\n';
	if (typeof s.hideDelete === "undefined" || !s.hideDelete)
		r += '<a href="#" title="Eliminar..." class="dropdown-item cmd delete"><i class="icon-database-remove"></i> Eliminar</a>\r\n';
	if (typeof s.append !== "undefined" && s.append.length > 0) r += s.append;
	return r + "</div>\r\n</div>\r\n</div>";
};

function WelcomeMail(contact, cb) {
	$.ajax({
		data: contact,
		url: window._p + "/admin/WelcomeMail",
		success: Call(cb),
	});
}

var address = {
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

function Call(cb) {
	var args = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : null;
	if (typeof cb === "undefined") return args;
	else if (typeof cb === "function") return cb.apply(this, args);
	else if (typeof cb === "string" && cb.length > 0) return window[cb].apply(this, args);
	else return args;
}

// Plugins

// 201703091829:: Send post
var sendPost = function (url, params) {
	// Crea e inserta la forma
	var frm = $("<form id='_frm' method='post' target='_blank'/>").appendTo("body");

	// La url a llamar
	frm.attr("action", url);

	// Limpia cualquier input
	frm.find("input").each(function () {
		$(this).remove();
	});

	// Agrega los input
	for (var property in params)
		if (params.hasOwnProperty(property)) frm.prepend("<input type='hidden' name='" + property + "' value='" + params[property] + "'/>");

	// Envia y elimina
	// console.log("FRM: "+frm.outerHtml().toString());
	frm.submit().remove();
};

// 201804251228: Using jQuery to center a DIV on the screen
// https://stackoverflow.com/a/210733
// $(element).center();
jQuery.fn.center = function () {
	this.css("position", "absolute");
	this.css("top", Math.max(0, ($(window).height() - $(this).outerHeight()) / 2 + $(window).scrollTop()) + "px");
	this.css("left", Math.max(0, ($(window).width() - $(this).outerWidth()) / 2 + $(window).scrollLeft()) + "px");
	return this;
};

// 201703191807: Animate
// http://stackoverflow.com/a/1145719
var _nolock = true;
$.fn.animateHighlight = function (highlightColor, duration) {
	var highlightBg = highlightColor || "#FFFF9C";
	var animateMs = duration || 1500;
	var originalBg = this.css("backgroundColor");
	if (_nolock) {
		_nolock = false;
		this.stop().css("background-color", highlightBg).animate(
			{
				backgroundColor: originalBg,
			},
			animateMs
		);
		setTimeout(function () {
			_nolock = true;
		}, animateMs);
	}
};

jQuery.fn.getFrom = function (obj) {
	var tpl = $("<div>").append($(this).clone()).html().toString();
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			tpl = tpl.replace(new RegExp("{" + key.toString() + "}", "g"), obj[key]);
		}
	}
	return $(tpl);
};

jQuery.fn.removeClasses = function (prefix) {
	this.each(function (i, el) {
		var classes = el.className.split(" ").filter(function (c) {
			return c.lastIndexOf(prefix, 0) !== 0;
		});
		el.className = $.trim(classes.join(" "));
	});
	return this;
};

jQuery.fn.autoOff = function () {
	return this.each(function () {
		var parent = $(this);
		var els = parent.find("input[type='text']").filter(":visible");
		console.log(_sep + "autoOff() => Els: " + els.length);
		els.attr("autocomplete", "off");
		//			.focus(function() {
		//			var el = $(this);
		//			console.log(el.attr("id") + ": "+ el.val());
		//		});
	});
};

jQuery.fn.disable = function () {
	return this.each(function () {
		var el = $(this);
		el.attr("readonly", "true").attr("disabled", "disabled");
		if (this.tagName.toLowerCase() == "a") $(el).off("click");
		// 201807100514: Disable childs
		var selector = "input[type='text'],input[type='checkbox'],input[type='password'],input[type='radio'],select,textarea,a";
		el.find(selector).each(function (index) {
			$(this).disable();
		});
	});
};

jQuery.fn.enable = function () {
	return this.each(function () {
		var el = $(this);
		el.removeAttr("readonly").removeAttr("disabled");
		if (this.tagName.toLowerCase() == "a") $(el).on("click");
		// 201807100514: Disable childs
		var selector = "input[type='text'],input[type='checkbox'],input[type='password'],input[type='radio'],select,textarea,a";
		el.find(selector).each(function (index) {
			$(this).enable();
		});
	});
};

jQuery.fn.outerHtml = function () {
	return $("<div>").append($(this).clone()).html().toString();
};

jQuery.fn.setValue = function (v) {
	return this.each(function () {
		var el = window.jQuery(this);
		var typo = typeof v;
		var type = this.type;
		var tag = this.tagName.toLowerCase();
		if (v === null) {
			if (type === "text" || type === "password" || tag === "textarea") this.value = "";
			else if (type === "checkbox" || type === "radio") this.checked = false;
			else if (tag === "select") this.selectedIndex = 0;
		} else {
			if (type === "file") this.value = "";
			else if (tag === "select" && v.toString() === "0") this.selectedIndex = 0;
			else if (tag === "select" && typo === "boolean") el.val(v === true ? "1" : "0");
			else el.val(v);
			el.trigger("change");
		}
		// console.log("SetValue => id: "+ el.attr("id") + ", tag: " + tag + ", type: " + type + ", dataType: " + typo + ", value: " + el.val());
	});
};

jQuery.fn.dataFrom = function (object, cb) {
	window.jQuery(this).each(function () {
		if (typeof object !== "undefined") {
			var jqueryEl = window.jQuery(this);
			for (var propertyName in object)
				if (object.hasOwnProperty(propertyName))
					if (!propertyName.contains("$")) {
						var v = object[propertyName];
						var el = jqueryEl.find("#" + propertyName);
						var id = el.attr("id");
						if (typeof el !== "undefined" && el.length > 0) {
							el.setValue(v);
							var tag = el[0].tagName.toLowerCase(); // Obtiene el tag
							if (tag === "select") el.change();
							// Si esta desactivado lo activa, le asigna el valor y vuelve a desactivarlo
							if (el.attr("disabled")) el.removeAttr("disabled").attr("disabled", "disabled");
							// Si es Autonumeric
							if ((el.hasClass("numeric") || el.hasClass("numeric-decimal")) && typeof window.jQuery.fn.autoNumeric !== "undefined")
								el.val(window.jQuery.fn.autoNumeric.Format(el, el.val()));
							// Si es mask
							if (el.hasClass("masked")) el.trigger("keyup");
							// Si es datepick
							if (
								el.hasClass("date_select") &&
								typeof window.jQuery.datepick.parseDate !== "undefined" &&
								typeof window.jQuery.datepick.formatDate !== "undefined" &&
								v !== null
							) {
								var df = el.datepick("options").dateFormat;
								if (type.of(v) !== "date") v = window.jQuery.datepick.parseDate("yyyy-mm-dd", v.left("T"));
								console.log(v + ", typeof: " + typeof v);
								var fd = window.jQuery.datepick.formatDate(df, v);
								el.val(fd);
							}
						}
					} else delete object[propertyName];
		}
		return Call(cb, object);
	});
};

jQuery.fn.dataTo = function (object, callback, copyNulls) {
	copyNulls = typeof copyNulls !== "undefined" ? copyNulls : false;
	if (typeof object !== "undefined") {
		console.log(_sep + "jQuery.fn.dataTo\ncopyNulls: " + copyNulls);
		var obj = window.jQuery(this);
		var propertyName;
		for (propertyName in object)
			if (object.hasOwnProperty(propertyName))
				if (!propertyName.contains("$")) {
					var el = obj.find("#" + propertyName);
					if (el.length > 0) {
						var hasVal = el.val() !== null && el.val().trim().length > 0; // Determina si el campo tiene valor
						var val = hasVal ? el.val() : null; // Obtiene el valor del campo
						console.log(propertyName + ": " + val);
						var tag = el[0].tagName.toLowerCase(); // Obtiene el tag
						var typ = typeof object[propertyName]; // Obtiene el tipo del dato
						// Si el tag es select y el tipo es boolean asigna el valor del boolean a la coincidencia de 1 en el valor del select
						if (tag === "select" && typ === "boolean") val = val !== null ? val === "1" : null;
						// Si tiene le plugin numeric
						if ((el.hasClass("numeric") || el.hasClass("numeric-decimal")) && typeof window.jQuery.fn.autoNumeric != "undefined")
							val = val !== null ? window.jQuery.fn.autoNumeric.Strip(propertyName) : null;
						// Si tiene le plugin data-mask-alias
						if ((el.hasAttr("data-mask-alias") || el.hasAttr("data-mask-alias")) && typeof window.jQuery().inputmask !== "undefined") {
							val = el.inputmask("unmaskedvalue");
							if (el.attr("data-mask-alias") === "decimal" || el.attr("data-mask-alias") === "currency") val = parseFloat(val.replaceAll(",", "."));
							if (el.attr("data-mask-alias") === "integer") val = parseInt(val);
						}
						// Si es datepick
						if (el.hasClass("date_select") && typeof window.jQuery.datepick.parseDate != "undefined")
							val = val !== null ? window.jQuery.datepick.parseDate(el.datepick("options").dateFormat, val) : null;
						// Si se pueden copiar los nulos y su valor NO es nulo lo asigna
						if (val !== null) object[propertyName] = val;
						else if (copyNulls) object[propertyName] = null;
					}
				} else delete object[propertyName];
		return type.of(callback) === "function" ? callback(object) : object;
	}
	return type.of(callback) === "function" ? callback(object) : object;
};

(function ($, window) {
	"use strict";
	var pluginName = "selectSearch",
		defaults = {
			url: null,
			data: "{}",
			source: {},
			inputLength: 3,
			groupField: null,
			sortField: null,
			valueField: null,
			match: "contains",
			selectFormat: null,
			addAllow: false,
			addText: "Ingrese un nuevo ótem...",
			placeHolder: "Seleccione...",
			textField: null,
			log: false,
		};

	function Plugin(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	$.extend(Plugin.prototype, {
		init: function () {
			// 201603100219: Valida que el elemento sea un select
			var tagName = this.element.tagName.toLowerCase();
			if (tagName !== "select") {
				this.log("El elemento '#" + $(this.element).attr("id") + "' no es un select!");
				return false;
			}

			// 201603100343: Carga del objeto o de la url
			var parent = this;
			if (this.settings.url !== null) {
				var url = this.settings.url;
				var data = this.settings.data;
				$.ajax({
					data: data,
					url: url,
					success: function (obj) {
						parent.build(obj);
					},
				});
			} else this.build(this.settings.source);
			return false;
		},
		build: function (source) {
			var e = $(this.element);

			// 201603100237: Variables locales
			var optgroup = null;
			var groupName = null;
			var textField = this.settings.textField;
			var valueField = this.settings.valueField;
			var groupField = this.settings.groupField;
			var sortField = this.settings.sortField;

			// 201603100223: Ordena la fuente por el campo a agrupar
			// 201703171523: Selectivo si viene un campo para ordenar
			// TODO: 201703191854: Verificar el ordenamiento
			console.log("Source: " + JSON.stringify(source));
			source = this.sort(source, sortField !== null ? sortField : groupField);

			// 201703171701: http://stackoverflow.com/a/14945143
			e.append("<option></option>");

			// 201703171733
			if (this.settings.addAllow) {
				var cb = this.settings.addCallback;
				e.one("select2-opening", function () {
					var select2 = $(this).data("select2");
					var c = $(this).select2("container");
					var f = c.find("input.select2-input:first");
					f.keyup(function (e) {
						var code = e.which;
						if (code === 13) {
							Call(cb, $(this).val(), select2);
							select2.close();
							e.preventDefault();
						}
					});
				});
			}

			// 201603100225: Itera por la fuente
			$.each(source, function (idx, item) {
				var id = item[valueField];
				var text = item[textField];

				// 201608042247: Se asegura que existan valores para la opción
				if (id !== null && text !== null) {
					// 201603100234: Adiciona el item
					var opt = $('<option value="' + item[valueField].toString() + '">' + item[textField].toString() + "</option>");

					// 201703191854: Agrega el registro al elemento
					opt.data("item", item);

					// 201608042236: Determina si hay agrupación por algón campo
					if (groupField !== null) {
						// 201603100226: Si el campo de agrupamiento es diferente al anterior lo crea
						var currentGroupName = item[groupField].toString();
						if (currentGroupName !== groupName) {
							groupName = currentGroupName;
							optgroup = $('<optgroup label="' + groupName + '">');
							e.append(optgroup);
						}
						optgroup.append(opt);
						// 201608042238: De lo contrario adiciona el ótem a la raóz
					} else e.append(opt);
				}
			});

			// 201603100306: si existe el plugin
			if (typeof window.jQuery.fn.select2 !== "undefined") {
				// 201603100306: Crea el objeto
				var selectSettings = {
					allowClear: true,
					dropdownCssClass: "uppercase",
					placeholder: this.settings.placeHolder,
					matcher: this.settings.match === "contains" ? this.matchContains : this.matchStart,
					minimumInputLength: this.settings.inputLength,
					escapeMarkup: function (m) {
						return m;
					},
				};

				if (this.settings.addAllow) {
					selectSettings.formatNoMatches = function () {
						var msg = "No se encontraron resultados.<br /><span class='text-bold text-size-mini'>" + "Presione 'ENTER' para crear el ótem...</span>";
						return msg;
					};
				}

				// 201603100300: Si hay un formato para el item seleccionado
				var fmt = this.settings.selectFormat;
				if (fmt !== null)
					selectSettings.formatSelection = function (item) {
						var res = fmt;
						var data = $(item.element).data("item");
						for (var key in data)
							if (data.hasOwnProperty(key)) {
								// console.log(key + ": " + data[key]);
								res = res.replace(new RegExp("{" + key + "}", "g"), data[key]);
							}
						return res;
					};

				// 201603100239: Activa el plugin Select2
				e.select2(selectSettings);
			}
		},
		log: function (text) {
			if (this.settings.log) console.log("%c" + this._name + ": " + text, "color:red; background-color:yellow");
		},
		onFocus: function () {
			console.log("FOCUS!");
			var select2 = $(this).data("select2");
			setTimeout(function () {
				if (!select2.opened()) select2.open();
			}, 0);
		},
		matchStart: function (term, text) {
			return text.toUpperCase().indexOf(term.toUpperCase()) === 0;
		},
		matchContains: function (term, text) {
			return text.toUpperCase().indexOf(term.toUpperCase()) > -1;
		},
		sort: function (array, key) {
			console.log(array);
			return array.sort(function (a, b) {
				var x = a[key];
				var y = b[key];
				return x < y ? -1 : x > y ? 1 : 0;
			});
		},
	});
	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) $.data(this, "plugin_" + pluginName, new Plugin(this, options));
		});
	};
})(jQuery, window, document);

jQuery.fn.validatorReset = function () {
	var el = window.jQuery(this);
	console.log(_sep + "validatorReset('#" + el.attr("id") + "'):\n");
	var selector = "input[type='text'],input[type='hidden'],input[type='checkbox'],input[type='password'],input[type='radio'],select,textarea";

	// 201912190044: Valida la existencia de las formas dinámicas
	var frmSelector = "form#frm-" + el.attr("id");
	window.frm = $(frmSelector);
	if (window.frm.length === 0) {
		el.wrap("<form id='frm-" + el.attr("id") + "'></form>");
		window.frm = $(frmSelector);
	}

	// 201912190048: Destruye cualquier validador preexistente
	if (typeof window.validator !== "undefined") window.validator.destroy();

	console.log("window.frm", window.frm.attr("id"));

	//	if (typeof window.validator === "undefined") {
	//		console.log("window.validator === undefined");
	//		if (typeof window.frm === "undefined") {
	//			console.log("window.frm === undefined");
	//			if (window.jQuery("form:first").length > 0) window.frm = window.jQuery("form:first");
	//			else {
	//
	//			}
	//		}
	//		window.validator = window.frm.validate();
	//	};
	// else window.validator.destroy();

	window.frm.data("validator", null).unbind("validate").validate();
	window.frm.find("label.error").remove();
	window.frm.find(".error").removeClass("error");
	window.frm.find(selector).each(function () {
		var sub = window.jQuery(this);
		var type = this.type;
		var tag = this.tagName.toLowerCase();
		sub.rules("remove");
		sub.removeAttr("tabindex");
		if ((type === "text" || type === "password" || tag === "textarea") && sub.hasAttr("maxlength")) {
			sub.data("nmd-maxlength", sub.attr("maxlength"));
			sub.removeAttr("maxlength");
		}
	});
	if (typeof window.validator !== "undefined") {
		window.validator.resetForm();
	}
	return el;
};

jQuery.fn.isValid = function () {
	// 202205270513: Defaults
	window.jQuery.validator.setDefaults({
		ignore: [],
		onkeyup: false,
		onfocusout: false,
		focusCleanup: true,
		focusInvalid: true,
		errorClass: "error is-invalid",
		errorElementClass: "is-invalid",
		successClass: "valid",
		validClass: "valid",
		success: function (label) {
			label.remove();
			//					label.addClass("validation-valid-label").text("Success.")
		},
		highlight: function (element, errorClass) {
			var el = $(element);
			el.addClass(errorClass);
			if (element.tagName.toLowerCase() === "select" && el.hasClass("select2")) {
				//						console.log(_sep + "SELECT2 HIGH!!");
				var s2 = el.next();
				s2.addClass(errorClass);
			}
		},
		unhighlight: function (element, errorClass) {
			var el = $(element);
			el.removeClass(errorClass);
			if (element.tagName.toLowerCase() === "select" && el.hasClass("select2")) {
				//						console.log(_sep + "SELECT2 UNHIGH!!");
				var s2 = el.next();
				s2.removeClass(errorClass);
			}
		},
		errorPlacement: function (error, element) {
			error.insertBefore(element);
			// console.log(_sep + "validator.errorPlacement:");
			// console.log("error =>", error);
			// console.log("element =>", element);
			if (element.parent("div").hasClass("form-icon")) {
				// console.clear();
				// console.log("HEY!!");
				element.parent("div").after(error);
				// if (element.parents("label").hasClass("checkbox-inline") || element.parents("label").hasClass("radio-inline")) {
				// 	error.appendTo(element.parent());
				// }
			} else {
				element.after(error);
			}
		},
		invalidHandler: function (e, validator) {
			console.log(_sep + "validator.invalidHandler:");
			// 201807261656: https://stackoverflow.com/a/11652922
			//					for (var x=0;x<validator.errorList.length;x++) console.log(validator.errorList[x]);
			for (var x in validator.errorMap) {
				//						var el = $("#"+x);
				//						if (el[0].tagName.toLowerCase()==="select" && el.hasClass("select2")) {
				//							var s2 = el.next();
				//							if (!s2.hasClass("error")) !s2.addClass("error");
				//						}
				console.log("%c" + x + " => " + validator.errorMap[x], "background:yellow;color:red;font-weight:bold;");
			}
		},
	});

	var ts = new Date().TS(); // Timestamp
	var parentEl = window.jQuery(this);

	// Limpia errores
	parentEl.validatorReset();
	parentEl.find(".error").removeClass("error");

	// Selecciona
	var selector = "input[type='text'],input[type='hidden'],input[type='checkbox'],input[type='password'],input[type='radio'],select,textarea";
	var els = parentEl.find(selector).filter("[id]");

	console.log(_sep + "jQuery.fn.isValid('#" + parentEl.attr("id") + "'):\n");

	els.each(function (index) {
		var type = this.type;
		var el = window.jQuery(this);
		var tag = this.tagName.toLowerCase();

		// 201702220644: Condiciones para validar
		// 201807100502: Modificado para usar hasAttr
		var cumple = !el.hasAttr("nonrequired") && !el.attr("id").contains("autogen");
		// var cumple = el.is(":visible") && !el.hasAttr("nonrequired") && !el.attr("id").contains("autogen");
		var msg =
			"#" +
			el.attr("id") +
			", cumple: " +
			cumple +
			", visible: " +
			el.is(":visible") +
			", required: " +
			(typeof el.attr("nonrequired") === "undefined") +
			", autogen: " +
			el.attr("id").contains("autogen");
		console.log(msg);

		//		try {
		if (typeof el !== "undefined" && el !== null && typeof el.rules !== "undefined" && el.rules !== null) el.rules("remove");
		//		} catch (e){}

		if (cumple) {
			// 201612141728: ID temporal para evitar colisiones
			var oid = el.attr("id");
			var tid = oid + "-" + ts;
			console.log("ID temporal: " + tid);
			el.attr("nmd-id", oid)
				.attr("id", tid)
				.attr("name", tid)
				.attr("tabindex", index + 1);

			// Validaciones
			if (type === "hidden" && el.hasAttr("required"))
				el.rules("add", {
					required: true,
				});
			else if ((type === "text" || type === "password" || tag === "textarea") && el.hasDataAttr("nmd-maxlength")) {
				el.attr("maxlength", el.data("nmd-maxlength"));
				el.removeData("maxlength");
			}
			if (this.tagName.toLowerCase() === "select" && el.attr("multiple")) {
				//			    try {
				el.rules("add", {
					hasOptions: true,
				});
				//			    } catch (e) {}
			} else {
				var subEl;
				if (el.hasAttr("equalsTo")) {
					var selector = "#" + el.attr("equalsTo") + "-" + ts;
					subEl = window.jQuery(selector);
					if (!subEl.hasAttr("nonrequired") || subEl.hasValue())
						el.rules("add", {
							equalTo: selector,
						});
				} else if (el.hasAttr("validateif")) {
					subEl = window.jQuery("#" + el.attr("validateif"));
					el.rules("add", {
						required: function () {
							return subEl.val().trim().length > 0;
						},
					});
				} else if (el.hasAttr("atleast"))
					el.rules("add", {
						atL: el.attr("atleast"),
						messages: {
							atL: "Al menos " + el.attr("atleast").split("|")[0] + " requerido",
						},
					});
				else if (el.hasAttr("sum"))
					el.rules("add", {
						sum: el.attr("sum"),
					});
				else if (el.hasAttr("email"))
					el.rules("add", {
						email: true,
						required: true,
					});
				// 201807100456 minlength
				else if (el.hasAttr("minlength")) {
					console.log("minlength!");
					el.rules("add", { minlength: el.attr("minlength"), required: true });
				} else if (el.hasAttr("checkuser"))
					el.rules("add", {
						checkuser: true,
						required: true,
					});
				else if (el.hasAttr("minStrict"))
					el.rules("add", {
						minStrict: parseInt(el.attr("minStrict")),
					});
				else if (el.hasAttr("onAny")) {
					var msgs = {
						required: "Alguno requerido",
					};
					subEl = window.jQuery("#" + el.attr("onAny"));
					if (subEl.length > 0)
						el.rules("add", {
							required: function () {
								// 201702220618: Si el relacionado tiene valor
								var hasVal1 = typeof el.val() !== "undefined" && el.val().trim().length > 0;
								var hasVal2 = typeof subEl.val() !== "undefined" && subEl.val().trim().length > 0;
								if (!hasVal1 && !hasVal2) {
									subEl.rules("add", {
										required: true,
										messages: msgs,
									});
									return true;
								} else {
									subEl.rules("add", {
										required: false,
									});
									return false;
								}
							},
							messages: msgs,
						});
					// el.rules("add", { onAny: el.attr("onAny") + "-" + ts });
					// 202306020201: Password policy
				} else if (el.hasAttr("pwdChk")) {
				} else if (el.hasAttr("dependsOn")) {
					var pEl = window.jQuery("#" + el.attr("dependson") + "-" + ts);
					el.rules("add", {
						required: function () {
							if (pEl.hasAttr("nonrequired")) return false;
							return typeof pEl.val() !== "undefined" && pEl.val().trim().length > 0;
						},
					});
				} else {
					//					try{
					el.rules("add", {
						required: true,
					});
					//					} catch (e) {

					//					}
				}
			}
		}
	});

	// 201505272333: Defecto
	var valid = window.frm.valid();

	if (!valid) {
		var parentDiv = null;
		var hiddens = parentEl.find("input.error:hidden");
		console.log(_sep + "Forma no válida!\nparentEl: #" + parentEl.attr("id") + "\nhiddens.length: " + hiddens.length);
		hiddens.each(function (index) {
			var el = $(this);
			var group = el.parents("div.form-group.file:first");
			var div = group.find("div.file-caption:first");
			if (parentDiv === null) parentDiv = div;
			console.log("div: " + div.attr("class"));
			div.addClass("error");
		});

		// 201807261505: Sin scroll por ahora
		if (typeof window.jQuery.scrollTo !== "undefined") {
			console.log(_sep + "scrollTo en validation!");
			var scrollEl = parentEl.find(".error:first");
			if (typeof scrollEl !== "undefined" && scrollEl.length > 0) {
				if (scrollEl.attr("type") === "hidden") scrollEl = parentDiv;
				else if (scrollEl[0].tagName.toLowerCase() === "select" && scrollEl.hasClass("select2")) scrollEl = scrollEl.next();
				window.jQuery.scrollTo(scrollEl, {
					duration: 500,
					offset: -100,
				});
			}
		}
		// else validator.focusInvalid();
	}

	// 201612141733: Restaura los Ids originales
	els.each(function (index) {
		var sub = window.jQuery(this);
		if (sub.hasAttr("nmd-id")) {
			var oid = sub.attr("nmd-id");
			sub.attr("id", oid).attr("name", oid).removeAttr("nmd-id");
		}
	});

	console.log(_sep + "ES VÁLIDA: " + valid);
	return valid;
};

// jQuery
jQuery.fn.hasValue = function () {
	// 201703181240: http://stackoverflow.com/a/22294210
	return (
		$(window.jQuery(this)).filter(function () {
			return $(this).val();
		}).length > 0
	);
};

jQuery.fn.hasAttr = function (attrName) {
	var attr = window.jQuery(this).attr(attrName);
	return typeof attr !== "undefined" && attr !== false;
};

jQuery.fn.hasDataAttr = function (keyName) {
	return window.jQuery(this).data(keyName) !== undefined && window.jQuery(this).data(keyName) !== null;
};

jQuery.fn.clear = function (clearHidden) {
	return this.each(function () {
		var errors = window.jQuery(this).find("label.error");
		errors.remove();
		var els = window.jQuery(this).find(".dx-invalid");
		els.each(function (index) {
			let el = $(this);
			el.removeClass("dx-invalid");
		});
		els = window.jQuery(this).find("input, textarea, select");
		els.each(function (index) {
			let el = $(this);
			el.removeClass("error");
			el.removeClass("error");
			el.removeClass("is-invalid");
			var type = this.type,
				tag = this.tagName.toLowerCase();
			if (type === "hidden" && clearHidden !== undefined && clearHidden) this.value = "";
			else if (type === "text" || type === "password" || tag === "textarea") this.value = "";
			else if (type === "checkbox" || type === "radio") this.checked = false;
			else if (tag === "select") this.selectedIndex = 0;
			el.trigger("change");
		});
	});
};

// Extensiones
var is = {
	Null: function (a) {
		return a === null;
	},
	Undefined: function (a) {
		return a === undefined;
	},
	nt: function (a) {
		return a === null || a === undefined;
	},
	Function: function (a) {
		return typeof a === "function" ? a.constructor.toString().match(/Function/) !== null : false;
	},
	String: function (a) {
		return typeof a === "string" ? true : typeof a === "object" ? a.constructor.toString().match(/string/i) !== null : false;
	},
	Array: function (a) {
		return typeof a === "object" ? a.constructor.toString().match(/array/i) !== null || a.length !== undefined : false;
	},
	Boolean: function (a) {
		return typeof a === "boolean" ? true : typeof a === "object" ? a.constructor.toString().match(/boolean/i) !== null : false;
	},
	Date: function (a) {
		return typeof a === "object" ? a.constructor.toString().match(/date/i) !== null : false;
	},
	HTML: function (a) {
		return typeof a === "object" ? a.constructor.toString().match(/html/i) !== null : false;
	},
	Number: function (a) {
		return typeof a === "number" ? true : typeof a === "object" ? a.constructor.toString().match(/Number/) !== null : false;
	},
	Object: function (a) {
		return typeof a === "object" ? a.constructor.toString().match(/object/i) !== null : false;
	},
	RegExp: function (a) {
		return typeof a === "function" ? a.constructor.toString().match(/regexp/i) !== null : false;
	},
};

var type = {
	of: function (a) {
		for (var i in is) if (is.hasOwnProperty(i)) if (is[i](a)) return i.toLowerCase();
	},
};

// 201604150623: Eventos on resize
$(window).resize(function () {
	// Obtiene las dimensiones
	window.vpWidth = parseInt($(window).width());
	window.vpHeight = parseInt($(window).height());

	// Establece el dispositivo
	// Bootstrap 3 https://getbootstrap.com/docs/3.3/css/#grid
	var body = $("body");
	if (vpWidth < 768)
		if (!body.hasClass("device-xs")) {
			window.device = "xs";
			body.removeClasses("device-");
			body.addClass("device-xs");
		} else if (vpWidth >= 768 && vpWidth < 992)
			if (!body.hasClass("device-sm")) {
				window.device = "sm";
				body.removeClasses("device-");
				body.addClass("device-sm");
			} else if (vpWidth >= 992 && vpWidth < 1200)
				if (!body.hasClass("device-md")) {
					window.device = "md";
					body.removeClasses("device-");
					body.addClass("device-md");
				} else if (vpWidth >= 1200)
					if (!body.hasClass("device-lg")) {
						window.device = "lg";
						body.removeClasses("device-");
						body.addClass("device-lg");
					}
});

function urlParam(name) {
	return decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.search) || [null, ""])[1].replace(/\+/g, "%20")) || null;
}

function getDTParams(object, columnToSearch, searchTerm) {
	var r = {};
	var counter = 0;
	r["iSortCol_0"] = 0;
	for (var key in object) {
		r["mDataProp_" + counter] = key.toString();
		r["bSearchable_" + counter] = columnToSearch === key.toString();
		r["bSortable_" + counter] = columnToSearch === key.toString();
		if (columnToSearch === key.toString()) r["iSortCol_0"] = counter;
		counter++;
	}
	if (typeof searchTerm !== "undefined") r["sSearch"] = searchTerm;
	r["iDisplayLength"] = 1000000000;
	r["iColumns"] = counter;
	r["iDisplayStart"] = 0;
	r["sSortDir_0"] = "asc";
	r["iSortingCols"] = 1;
	r["sEcho"] = 6;
	return r;
}

var substringMatcher = function (strs) {
	return function findMatches(q, cb) {
		var matches = [];
		var substrRegex = new RegExp(q, "i");
		window.jQuery.each(strs, function (i, str) {
			if (substrRegex.test(str))
				matches.push({
					value: str,
				});
		});
		cb(matches);
	};
};

function getScriptParam(param) {
	var myTag = document.getElementsByTagName("script");
	var src = myTag[myTag.length - 1].src;
	return unescape(src)
		.split(param + "=")[1]
		.split("&")[0];
}

function dtDrawCB(settings) {
	console.log("dtDrawCB!");

	// 201703150107: Settings
	// var api = $("table.datatable").dataTable().api();
	//    console.log(api.rows({ page: 'current' }).data());
	// console.log(api);
	// var oSettings = this.fnSettings();
	var w = $(settings.nTableWrapper);

	if (settings._iRecordsTotal > 0) {
		console.log("DTL: " + w.find(".dataTables_length select").length);

		// 201703150114: Modificado
		w.find("thead tr"); //.addClass("bg-slate-800");
		w.find("tbody tr").slice(-3).find(".dropdown, .btn-group").addClass("dropup");
		w.find(".dataTables_filter input[type=search]").attr("placeholder", "Presione 'ENTER'...");
		// w.find(".dataTables_length select").select2({ minimumResultsForSearch:"-1" });
		// w.find(".select2-container").attr("class", "select2-container");

		// 201703150133: Muestra length y bósqueda
		w.find("div.dataTables_length:first").show();
		//        w.find("div.dataTables_filter:first").show();

		// 201603090350: Solution for version 1.10 http://goo.gl/XwHwcX
		w.find(".dataTables_filter input")
			.unbind()
			.bind("keyup", function (e) {
				var api = $(this).parents("div.dataTables_wrapper:first").find("table.dataTable:first").dataTable().api();
				if (this.value.length >= 3 && e.keyCode === 13) {
					console.log(this.value);
					api.search(this.value).draw();
				} else if (this.value.length <= 0) api.search("").draw();
				return;
			});
	} else {
		// 201703150133: Oculta length y bósqueda
		w.find("div.dataTables_length:first").hide();
		//        w.find("div.dataTables_filter:first").hide();
	}
}

// Formats
function FormatInit() {
	console.log("FormatINIT!");
	$("input.text-uppercase").blur(function () {
		if ($(this).val.length > 0) $(this).val($(this).val().trim().toUpperCase().replace(/\s\s+/g, " "));
	});

	$("input.text-lowercase").blur(function () {
		if ($(this).val.length > 0) $(this).val($(this).val().trim().toLowerCase().replace(/\s\s+/g, " "));
	});

	$("input.text-capitalize").blur(function () {
		if ($(this).val.length > 0) $(this).val($(this).val().trim().replace(/\s\s+/g, " ").capitalizeAll());
	});
}

// BlockUI
// 201804252341: Modificado para almacenar el array de elementos
// 202004240451: Opción para mostrar el spinner
window.jQuery.fn.lock = function (msg, cb, spinner = true) {
	var el = $(this[0]);
	var id = el.attr("id");
	if (typeof id === "undefined") {
		var ts = new Date().TS(); // Timestamp
		id = "lock-" + ts;
		el.attr("id", id);
	}
	if (typeof window._locks === "undefined") window._locks = [];
	console.log(_sep + "lock() start: " + JSON.stringify(window._locks));
	if (msg === null) msg = "Procesando, un momento por favor...";
	msg =
		'<div class="font-weight-semibold block-ui">' +
		(spinner ? '<i class="fa fa-spinner"></i>' : "") +
		'<span class="msg' +
		(spinner ? "" : " mt-0") +
		'">' +
		msg +
		'<span class="font-size-sm">&hellip;</span></span></div>';
	var opts = {
		message: msg,
		overlayCSS: {
			backgroundColor: "#fff",
			opacity: 0.95,
			cursor: "wait",
		},
		css: {
			border: 0,
			padding: 0,
			backgroundColor: "transparent",
			width: "100%",
		},
		onBlock: function () {
			//			window.jQuery("body").css("overflow", "hidden");
			return Call(cb);
		},
	};
	if (this[0] === window) {
		$.blockUI(opts);
		return this;
	}
	// 201804261828: Actualiza solo el mensaje si y esta bloqueado el elemento
	if (window._locks.contains("#" + id)) {
		console.log("lock(" + id + ") existe: " + JSON.stringify(window._locks));
		//		$("div.blockMsg span.msg:first").html(msg);
		$("div.blockMsg").html(msg);
		Call(cb);
	} else {
		window._locks.add("#" + id);
		console.log("lock() end: " + JSON.stringify(window._locks));
		el.block(opts);
	}
};

window.jQuery.fn.unlock = function (cb) {
	if (typeof window._locks !== "undefined" && window._locks.length > 0) {
		var opts = {
			onUnblock: function () {
				//				window.jQuery("body").css("overflow", "visible");
				return Call(cb);
			},
		};
		if (this[0] === window) {
			$.unblockUI(opts);
			return this;
		}
		this.each(function () {
			var el = $(this);
			el.unblock(opts);
			var id = el.attr("id");
			window._locks.remove("#" + id);
			if (id.contains("lock-")) el.removeAttr("id");
			console.log("unlock(): " + JSON.stringify(window._locks));
		});
	}
};

window.jQuery.fn.unlockAll = function (cb) {
	console.log(_sep + "unlockAll:\nwindow._locks:" + window._locks);
	$.each(window._locks, function (idx, item) {
		$(item).unlock();
	});
};

var DataTableColumns = function (oObj, tObj) {
	var cols = [];
	var propertyName;
	var count = Object.keys(oObj).length;
	for (propertyName in oObj)
		if (oObj.hasOwnProperty(propertyName))
			cols.push({
				visible: false,
				data: propertyName.toString(),
				searchable: false,
				orderable: false,
			});
	$.each(cols, function (idx, colB) {
		$.each(tObj, function (idx, colT) {
			if (colB.data === colT.data) {
				console.log("Match!: " + colB.data);
				cols[idx] = colT;
				return false;
			}
		});
	});
	return cols;
};

/*
	201703131510: Versión reescrita de la función
	https://github.com/jquery-boilerplate/jquery-boilerplate
*/
jQuery.fn.setUpload = function (currentOpts) {
	return this.each(function () {
		if (typeof window.jQuery().fileinput !== "undefined") {
			var el = $(this);
			var id = el.attr("id");
			var parent = el.parents("div.form-group.file:first");

			if (parent.length > 0) {
				console.log("setUpload: " + id);

				var tpl =
					'<label>{label}</label>\n<input type="hidden" name="{name}Size" id="{name}Size">\n' +
					'<input type= "hidden" name= "{name}Ext" id= "{name}Ext">\n<input type="file" nonrequired="true" ' +
					'placeholder="{placeholder}" id="{name}" name="{name}" filename="{filename}"><div class="input-group"' +
					' id="{name}Group">\n<input class="form-control" id="{name}Name" name="{name}Name" type="text">' +
					'<span class="input-group-btn"><button class="btn btn btn-primary btn-icon reload" type="button" title="Cambiar archivo...">' +
					'<i class="icon-reload-alt"></i></button><button class="btn btn btn-primary btn-icon link" type="button" title="Observar archivo...">' +
					'<i class="icon-link2"></i></button></span></div><div id="{name}Error" class="label label-block label-danger error">&nbsp;</div>' +
					'<input type="hidden" name="{name}Hidden" id="{name}Hidden"/>';

				var opts = {
					language: "es",
					browseLabel: "",
					removeLabel: "",
					uploadLabel: "",
					showCaption: true,
					showPreview: false,
					showUpload: false,
					maxFileSize: window._mrl,
					removeClass: "btn btn-icon",
					elErrorContainer: "#" + id + "Error",
					initialCaption: "Seleccione un archivo...",
					browseClass: "btn btn-primary btn-icon",
					uploadClass: "btn btn-default btn-icon",
					browseIcon: '<i class="icon-plus22"></i> ',
					uploadIcon: '<i class="icon-file-upload"></i> ',
					removeIcon: '<i class="icon-cancel-square"></i> ',
					uploadUrl: currentOpts.url !== "undefined" ? currentOpts.url : null,
					allowedFileExtensions: currentOpts.ext !== "undefined" ? currentOpts.ext : null,
					msgInvalidFileExtension: 'Sólo se permiten archivos de tipo "{extensions}".',
					msgSizeTooLarge: "El archivo es muy pesado ({customSize}), se permiten archivos de {customMaxSize} como móximo.",
					layoutTemplates: {
						caption:
							'<div tabindex="-1" class="form-control file-caption {class}">\n' +
							'<span class="icon-file-plus kv-caption-icon"></span><div class="file-caption-name"></div>\n' +
							"</div>",
					},
				};

				// 201703131730: Reemplaza el nodo con la plantilla
				var t = tpl.replaceAll("{name}", id).replaceAll("{placeholder}", el.attr("placeholder")).replaceAll("{label}", el.attr("label"));
				if (typeof el.attr("filename") !== "undefined") t = t.replaceAll("{filename}", el.attr("filename"));
				el.replaceWith(t);

				var fileInput = parent.find("input[type='file']:first");

				if (fileInput.length > 0) {
					fileInput.data("parent", parent); // 201703131748: Parent en data para uso interno
					if (opts.allowedFileExtensions !== null) fileInput.attr("accept", "." + opts.allowedFileExtensions.join(",."));

					fileInput
						.on("fileuploaderror", function (event, data, msg) {
							parent.find("div.file-caption:first").removeClass("error");
							parent.find("label.error").remove();

							var file = data.files[0],
								name = data.files[0].name,
								size = data.files[0].size,
								maxFileSize = $(this).data().fileinput.maxFileSize * 1024;
							parent.find("#" + id + "Hidden").val(name);
							msg = msg.replace("{customSize}", size.sizeFormat());
							msg = msg.replace("{customMaxSize}", maxFileSize.sizeFormat());
							console.log("fileuploaderror => " + msg);
							parent.find('li[data-file-id="' + data.id + '"]').html(msg);
						})
						.on("filebatchselected", function (event, files) {
							parent.find("div.file-caption:first").removeClass("error");
							parent.find("label.error").remove();

							if (files.length > 0) {
								var file = files[0];
								var name = file.name;
								var span = parent.find("span.kv-caption-icon:first");
								var fileName = name + " (" + file.size.sizeFormat() + ")";
								span.removeClasses("icon-file-").addClass(file.name.getIcon());
								parent.find("div.file-caption-name:first").text(fileName);
								parent.find("#" + id + "Hidden").val(name);
								console.log("filebatchselected => id: " + id + ", " + fileName);
							}
						})
						.on("fileerror", function (event, data, msg) {
							console.log("fileerror");
						})
						.on("filebatchuploaderror", function (event, data, previewId, index) {
							console.log("filebatchuploaderror");
						})
						.on("filecleared", function (event) {
							parent.find("div.file-caption:first").removeClass("error");
							parent.find("label.error").remove();
							parent.removeClass("has-error");
							console.log("filecleared");
							parent.find("#" + id + "Hidden").val("");
							parent.find("div.file-caption-name:first").text("Seleccione un archivo...");
						})
						.fileinput(opts);
				}
			}
		}
	});
};

// 202206160329: A función
function setSelect2() {
	$("select.select2").each(function (index) {
		var el = $(this);
		console.log("el =>", el);
		var s = el.hasClass("searchable") ? 3 : -1;
		el.select2({
			language: "es",
			allowClear: el.hasClass("clearable"),
			placeholder: "Seleccione...",
			minimumResultsForSearch: s,
		}).on("select2:select", function (e) {
			var data = e.params;
			console.log(data);
			// 201810221608: Elimina la case error -> https://stackoverflow.com/a/39296686
			var element = $(e.currentTarget);
			element.next().removeClass("error");
			var val = element.val();
			console.log(val);
			// 201912052253: Elimina el label error
			element.parent().find("label.error:first").remove();
		});
	});
}

function setTooltips(cssClass = "blue-tooltip") {
	// 202209131954: Tooltips Bootstrap v5.0
	// https://stackoverflow.com/a/66298663
	// https://stackoverflow.com/a/66288369
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
	console.log("tooltipTriggerList =>", tooltipTriggerList);
	tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl, {
			customClass: cssClass,
		});
	});
}

function setHelp(cssClass = "blue-tooltip", delay = 2000) {
	setTimeout(function () {
		// 202209131954: Tooltips Bootstrap v5.0
		// https://stackoverflow.com/a/66298663
		// https://stackoverflow.com/a/66288369
		var tooltipTriggerList = [].slice.call(document.querySelectorAll("label.help"));
		console.log("tooltipTriggerList =>", tooltipTriggerList);
		tooltipTriggerList.map(function (tooltipTriggerEl) {
			return new bootstrap.Tooltip(tooltipTriggerEl, {
				customClass: cssClass,
				html: true,
			});
		});
	}, delay);
}

// Carga
$().ready(function () {
	// Iniciales
	FormatInit();

	// 201702221039: Alerts init
	if (typeof window.swal !== "undefined") {
		console.log(_sep + "swal init");
		window.swal.setDefaults({
			reverseButtons: true,
			cancelButtonClass: "btn btn-main",
			confirmButtonClass: "btn btn-main",
			allowOutsideClick: false,
			allowEscapeKey: false,
			allowEnterKey: false,
			width: "500px",
		});
		window.msg = {
			_defaults: {
				animation: true,
				allowOutsideClick: false,
				showCancelButton: false,
				showCloseButton: false,
				showConfirmButton: false,
				onOpen: function (el) {
					$(".sweet-alert").css({
						padding: "20px",
					});
					$(".sweet-alert .sa-error-container").show();
					$(".sweet-alert .sa-button-container").show();
					$(".sweet-alert p:first").show();
				},
			},
			_open: function () {
				//					window.jQuery("body").css("overflow", "hidden");
				console.log("window.msg._open();");
			},
			_close: function () {
				//                    window.jQuery("body").css("overflow", "visible");
				console.log("window.msg._close();");
			},
			close: function () {
				if (window.swal.isVisible()) {
					window.msg._close();
					window.swal.close();
				}
			},
			process: function (msg) {
				window.msg._open();
				if (msg === null) msg = "Procesando, un momento por favor";
				msg = '<i class="icon-spinner2 spinner"></i><span class="msg">' + msg + '<span class="font-size-sm">…</span></span>';
				var opts = Clone(window.msg._defaults);
				opts.type = null;
				opts.title = msg;
				opts.html = null;
				opts.onOpen = function (el) {
					console.log(el);
				};
				opts.onClose = function (res, o, b) {
					window.msg._close();
				};
				window.swal(opts);
			},
			show: function (message, open, close) {
				return window.swal({
					html: true,
					title: message,
					animation: true,
					showCancelButton: false,
					showConfirmButton: false,
					onOpen: function (el) {
						console.log(el);
						$(".sweet-alert").css({
							padding: "10px",
						});
						$(".sweet-alert .sa-error-container").hide();
						$(".sweet-alert .sa-button-container").hide();
						$(".sweet-alert p:first").hide();
						window.msg._open();
						Call(open);
					},
					onClose: function () {
						$(".sweet-alert").css({
							padding: "20px",
						});
						$(".sweet-alert .sa-error-container").show();
						$(".sweet-alert .sa-button-container").show();
						$(".sweet-alert p:first").show();
						window.msg._close();
						Call(close);
					},
				});
			},
			error: function (title, message, cb) {
				window.msg._open();
				var opts = window.msg._defaults;
				opts.type = "error";
				(opts.showCancelButton = false), (opts.showConfirmButton = true);
				opts.confirmButtonText = "ENTENDIDO";
				opts.html = typeof message === "string" ? message : "";
				opts.title = title.hasOwnProperty("message") ? title["message"] : title;
				opts.onClose = function () {
					window.msg._close();
					Call(cb);
				};
				window.swal(opts);
			},
			success: function (title, message, cb) {
				window.msg._open();
				var opts = window.msg._defaults;
				opts.type = "success";
				(opts.showCancelButton = false), (opts.showConfirmButton = true);
				opts.confirmButtonText = "ENTENDIDO";
				opts.html = typeof message === "string" ? message : "";
				// opts.title = title.hasOwnProperty("message") ? title["message"] : title;
				opts.title = title;
				opts.onClose = function () {
					window.msg._close();
					Call(cb);
				};
				window.swal(opts);
			},
			notice: function (title, msg, cb) {
				window.swal(
					{
						title: title,
						text: msg,
						html: true,
						type: "error",
						showCancelButton: false,
						confirmButtonText: "ENTENDIDO",
					},
					function (res) {
						window.msg._close();
						Call(cb);
					}
				);
			},
			confirm: function (eOpts) {
				window.msg._open();
				var opts = Clone(window.msg._defaults);
				opts.showConfirmButton = true;
				opts.showCancelButton = true;
				opts.type = typeof eOpts.type !== "undefined" && eOpts.type !== null ? eOpts.type : "question";
				opts.confirmButtonText = typeof eOpts.textOk !== "undefined" && eOpts.textOk !== null ? eOpts.textOk : "ENTENDIDO <i class='icon-database-insert'></i>";
				opts.cancelButtonText =
					typeof eOpts.textCancel !== "undefined" && eOpts.textCancel !== null ? eOpts.textCancel : "<i class='icon-database-remove'></i> CANCELAR";
				opts.html = typeof eOpts.text === "string" ? eOpts.text : "";
				opts.title = typeof eOpts.title !== "undefined" && eOpts.title !== null ? eOpts.title : "";
				opts.onClose = function (res, o, b) {
					window.msg._close();
				};
				window.swal(opts).then((result) => {
					Call(result.value ? eOpts.onConfirm : eOpts.onCancel);
				});
			},
		};
	}

	// Validator defaults
	if (typeof window.jQuery.validator !== "undefined") {
		// console.clear();
		console.log("VALIDATOR!");

		// Mensajes
		window.jQuery.extend(window.jQuery.validator.messages, {
			required: "Este campo es requerido",
			remote: "Corrija este campo",
			email: "Ingrese un correo electrónico v&aacute;lido",
			url: "Ingrese una URL v&aacute;lida",
			date: "Ingrese una fecha v&aacute;lida",
			dateISO: "Ingrese una fecha v&aacute;lida (ISO)",
			number: "Ingrese un n&uacute;mero v&aacute;lido",
			digits: "Ingrese s&oacute;lo d&iacute;gitos",
			creditcard: "Ingrese un n&uacute;mero de tarjeta de cr&eacute;dito v&aacute;lido",
			equalTo: "No coinciden",
			maxlength: window.jQuery.validator.format("M&aacute;ximo {0} caract&eacute;res"),
			minlength: window.jQuery.validator.format("M&iacute;nimo {0} caract&eacute;res"),
			rangelength: window.jQuery.validator.format("Ingrese un valor entre {0} y {1} caract&eacute;res"),
			range: window.jQuery.validator.format("Ingrese un valor entre {0} y {1} caract&eacute;res"),
			max: window.jQuery.validator.format("Ingrese un valor menor o igual a {0}"),
			min: window.jQuery.validator.format("Ingrese un valor mayor o igual a {0}"),
		});

		// Tiene opciones
		// 201912051649: Modificado para select2 multiple
		window.jQuery.validator.addMethod(
			"hasOptions",
			function (value, element, params) {
				var valid = false;
				console.log(_sep + "hasOptions validator:");
				var el = window.jQuery(element);
				if (element.tagName.toLowerCase() === "select" && el.hasAttr("multiple")) {
					if (el.hasClass("select2")) {
						var v = el.select2("val");
						valid = v.length > 0;
					} else {
						valid = window.jQuery(element).find("option").length > 0;
					}
				}
				return valid;
			},
			"Requerido"
		);

		// Mayor que
		window.jQuery.validator.addMethod(
			"minStrict",
			function (value, element, params) {
				if (window.jQuery.type(params) === "array") return parseInt(params[0]) <= parseInt(params[1]);
				else return parseInt(value) > parseInt(param);
			},
			window.jQuery.validator.format("El valor no puede ser menor a {0}.")
		);

		// Suma
		window.jQuery.validator.addMethod(
			"sum",
			function (value, element, param) {
				var res = false;
				var total = 0;
				var params = param.split("|");
				var items = window.jQuery("." + params[0]);
				var totalSuma = parseFloat(
					window
						.jQuery("#" + params[1])
						.val()
						.replace(".", "")
						.replace(",", ".")
				);
				items.each(function (index) {
					if (window.jQuery(this).attr("id").toLowerCase().contains("total")) window.jQuery(this).val(total);
					else if (window.jQuery(this).val().trim().length > 0) total += parseFloat(window.jQuery(this).val().replace(".", "").replace(",", "."));
				});
				//			alert(total+"=="+totalSuma+"="+(total === totalSuma));
				if (total > 0) return total === totalSuma;
				else return true;
			},
			"La suma debe ser exacta."
		);

		// Al menos un campo en un grupo
		// 201211271619: http://stackoverflow.com/questions/1300994/jquery-validate-require-at-least-one-field-in-a-group-to-be-filled
		window.jQuery.validator.addMethod(
			"atL",
			function (value, element, param) {
				//			alert(param);
				var opts = param.split("|");
				var groupClass = opts[1];
				var numberRequired = parseInt(opts[0]);
				var fields = window
					.jQuery(element)
					.closest("form")
					.find("." + groupClass);
				var validOrNot =
					fields.filter(function () {
						return window.jQuery(this).val();
					}).length >= numberRequired;
				if (!window.jQuery(element).data("being_validated")) {
					fields.data("being_validated", true);
					fields.valid();
					fields.data("being_validated", false);
				}
				return validOrNot;
			},
			window.jQuery.validator.format("{0} campo requeridos")
		);

		// 201306132240: Verifica el usuario
		window.jQuery.validator.addMethod(
			"checkuser",
			function (value, element) {
				var res = true;
				window.jQuery.ajax({
					async: false, // 201302182124: Esta es la l&iacute;nea clave!!
					data: JSON.stringify({
						un: value,
					}),
					url: _bp + "api/Utils/UsuarioExiste",
					success: function (existe) {
						if (existe) res = false;
					},
				});
				return res;
			},
			"Id de usuario ya registrado."
		);

		// 201505291524
		window.jQuery.validator.addMethod(
			"toleranceOf",
			function (value, element, param) {
				var base = null;
				var params = param.split("*");
				var origin = window.jQuery(element);
				var tolerance = parseInt(params[1]);
				var base = parseFloat(window.jQuery("#" + params[0]).val());
				var val = value.length > 0 ? parseInt(value) : 0;
				//			if (!isNaN(base)) {
				//				console.log("param:"+ param +"id: "+ "#"+params[0] +", base: "+base+", val: "+val);
				//			}
				if (val > base + tolerance || val < base - tolerance) {
					console.log("toleranceOf:");
					console.log(val + ">" + (base + tolerance) + " || " + val + "<" + (base - tolerance));
					console.log("Elemento: " + params[0] + "\nTolerancia:" + params[1] + "\nBase:" + base + "\nValor:" + val);
					return false;
				} else return true;
			},
			function (params, element) {
				var origin = window.jQuery(element);
				return origin.hasAttr("toleranceOfMsg") ? origin.attr("toleranceOfMsg") : "Fuera del rango (+-" + params[1] + ")";
			}
		);

		// 201504230123
		window.jQuery.validator.addMethod(
			"lesserThan",
			function (value, element, param) {
				// Elementos
				var origin = window.jQuery(element);
				var target = window.jQuery("#" + param);

				// Primera validacion, si no hay valores no valida
				if (target.val().length <= 0 && origin.val().length <= 0) return true;

				// Segunda validacion, debe haber un valor en el destino si hay en el origen
				if (target.val().length > 0 && origin.val().length <= 0) return false;

				// Tercera validacion, el destino debe ser mayor al origen
				var originValue =
					(origin.hasClass("numeric") || origin.hasClass("numeric-decimal")) && typeof window.jQuery.fn.autoNumeric !== "undefined"
						? window.jQuery.fn.autoNumeric.Strip(origin.attr("id"))
						: parseFloat(origin.val());
				var targetValue =
					(target.hasClass("numeric") || target.hasClass("numeric-decimal")) && typeof window.jQuery.fn.autoNumeric !== "undefined"
						? window.jQuery.fn.autoNumeric.Strip(target.attr("id"))
						: parseFloat(target.val());

				originValue = +parseFloat(originValue).toFixed(2);
				targetValue = +parseFloat(targetValue).toFixed(2);

				var res = originValue < targetValue;

				if (!res)
					console.log(
						"lesserThan: " +
							originValue +
							">" +
							targetValue +
							"?" +
							res +
							"\njQuery.type(" +
							originValue +
							")=" +
							window.jQuery.type(originValue) +
							"\n" +
							window.jQuery.type(originValue)
					);

				var res = parseFloat(originValue).toFixed(2) < parseFloat(targetValue).toFixed(2);
				return res;
			},
			function (params, element) {
				var origin = window.jQuery(element);
				if (origin.hasAttr("greaterThanMsg")) {
					var cb = origin.attr("greaterThanMsg");
					if (window.jQuery.type(cb) === "function") return cb.call(this, params, element);
					else if (window.jQuery.type(cb) === "string") return cb;
				} else return "Debe ser menor";
			}
		);

		// 201508050255
		window.jQuery.validator.addMethod(
			"lesserOrEqualThan",
			function (value, element, param) {
				// Elementos
				var origin = window.jQuery(element);
				var target = window.jQuery("#" + param);

				// Primera validacion, si no hay valores no valida
				if (target.val().length <= 0 && origin.val().length <= 0) return true;

				// Segunda validacion, debe haber un valor en el destino si hay en el origen
				if (target.val().length > 0 && origin.val().length <= 0) return false;

				// Obtiene los valores para las validaciones siguientes
				var originValue =
					(origin.hasClass("numeric") || origin.hasClass("numeric-decimal")) && typeof window.jQuery.fn.autoNumeric !== "undefined"
						? window.jQuery.fn.autoNumeric.Strip(origin.attr("id"))
						: parseFloat(origin.val());
				var targetValue =
					(target.hasClass("numeric") || target.hasClass("numeric-decimal")) && typeof window.jQuery.fn.autoNumeric !== "undefined"
						? window.jQuery.fn.autoNumeric.Strip(target.attr("id"))
						: parseFloat(target.val());

				originValue = +parseFloat(originValue).toFixed(2);
				targetValue = +parseFloat(targetValue).toFixed(2);

				var res = originValue <= targetValue;

				if (!res)
					console.log(
						"lesserOrEqualThan: " +
							originValue +
							">" +
							targetValue +
							"?" +
							res +
							"\njQuery.type(" +
							originValue +
							")=" +
							window.jQuery.type(originValue) +
							"\n" +
							window.jQuery.type(originValue)
					);

				return res;
			},
			function (params, element) {
				var origin = window.jQuery(element);
				if (origin.hasAttr("lesserOrEqualThanMsg")) {
					var cb = origin.attr("lesserOrEqualThanMsg");
					if (window.jQuery.type(cb) === "function") return cb.call(this, params, element);
					else if (window.jQuery.type(cb) === "string") return cb;
				} else return "Debe ser menor oi igual";
			}
		);

		// 201504230123
		window.jQuery.validator.addMethod(
			"greaterThan",
			function (value, element, param) {
				// Elementos
				var origin = window.jQuery(element);
				var target = window.jQuery("#" + param);

				// Primera validacion, si no hay valores no valida
				if (target.val().length <= 0 && origin.val().length <= 0) return true;

				// Segunda validacion, debe haber un valor en el destino si hay en el origen
				if (target.val().length > 0 && origin.val().length <= 0) return false;

				// Tercera validacion, el destino debe ser mayor al origen
				var originValue =
					(origin.hasClass("numeric") || origin.hasClass("numeric-decimal")) && typeof window.jQuery.fn.autoNumeric !== "undefined"
						? window.jQuery.fn.autoNumeric.Strip(origin.attr("id"))
						: parseFloat(origin.val());
				var targetValue =
					(target.hasClass("numeric") || target.hasClass("numeric-decimal")) && typeof window.jQuery.fn.autoNumeric !== "undefined"
						? window.jQuery.fn.autoNumeric.Strip(target.attr("id"))
						: parseFloat(target.val());

				originValue = +parseFloat(originValue).toFixed(2);
				targetValue = +parseFloat(targetValue).toFixed(2);

				var res = originValue > targetValue;

				if (!res)
					console.log(
						"greaterThan: " +
							originValue +
							">" +
							targetValue +
							"?" +
							res +
							"\njQuery.type(" +
							originValue +
							")=" +
							window.jQuery.type(originValue) +
							"\n" +
							window.jQuery.type(originValue)
					);

				return res;
			},
			function (params, element) {
				var origin = window.jQuery(element);
				if (origin.hasAttr("greaterThanMsg")) {
					var cb = origin.attr("greaterThanMsg");
					if (window.jQuery.type(cb) === "function") return cb.call(this, params, element);
					else if (window.jQuery.type(cb) === "string") return cb;
				} else return "Debe ser mayor";
			}
		);

		// 201508050304
		window.jQuery.validator.addMethod(
			"greaterOrEqualThan",
			function (value, element, param) {
				// Elementos
				var origin = window.jQuery(element);
				var target = window.jQuery("#" + param);

				// Primera validacion, si no hay valores no valida
				if (target.val().length <= 0 && origin.val().length <= 0) return true;

				// Segunda validacion, debe haber un valor en el destino si hay en el origen
				if (target.val().length > 0 && origin.val().length <= 0) return false;

				// Tercera validacion, el destino debe ser mayor al origen
				var originValue =
					(origin.hasClass("numeric") || origin.hasClass("numeric-decimal")) && typeof window.jQuery.fn.autoNumeric !== "undefined"
						? window.jQuery.fn.autoNumeric.Strip(origin.attr("id"))
						: parseFloat(origin.val());
				var targetValue =
					(target.hasClass("numeric") || target.hasClass("numeric-decimal")) && typeof window.jQuery.fn.autoNumeric !== "undefined"
						? window.jQuery.fn.autoNumeric.Strip(target.attr("id"))
						: parseFloat(target.val());

				originValue = +parseFloat(originValue).toFixed(2);
				targetValue = +parseFloat(targetValue).toFixed(2);

				var res = originValue >= targetValue;

				if (!res)
					console.log(
						"greaterOrEqualThan: " +
							originValue +
							">" +
							targetValue +
							"?" +
							res +
							"\njQuery.type(" +
							originValue +
							")=" +
							window.jQuery.type(originValue) +
							"\n" +
							window.jQuery.type(originValue)
					);

				return res;
			},
			function (params, element) {
				var origin = window.jQuery(element);
				if (origin.hasAttr("greaterOrEqualThanMsg")) {
					var cb = origin.attr("greaterOrEqualThanMsg");
					if (window.jQuery.type(cb) === "function") return cb.call(this, params, element);
					else if (window.jQuery.type(cb) === "string") return cb;
				} else return "Debe ser mayor o igual";
			}
		);

		window.jQuery.validator.addMethod(
			"greaterThanZero",
			function (value, element) {
				return this.optional(element) || parseFloat(value) > 0;
			},
			"Debe ser mayor que 0"
		);

		window.jQuery.validator.addMethod(
			"dependsOn",
			function (value, element, param) {
				var target = window.jQuery("#" + param).val();
				console.log("dependsOn");
				return target.length > 0 ? value.length > 0 : true;
			},
			"Requerido"
		);

		// 201702220604: Uno de 2 campos requeridos
		window.jQuery.validator.addMethod(
			"onAnyZ",
			function (value, element, param) {
				var parent = window.jQuery("#" + param);
				if (parent.length > 0)
					if (typeof parent.val() !== "undefined") {
						console.log("onAny: Caracteres en el pariente: " + parent.val().trim().length);
						if (parent.val().trim().length > 0) {
							element.rules("add", {
								required: false,
							});
							return true;
						} else return value.trim().length > 0;
					} else {
						console.error("ERROR 'onAny': El valor del elemento " + param + " no se puede determinar.");
						return false;
					}
				else {
					console.error("ERROR 'onAny': El elemento " + param + " no existe.");
					return false;
				}
			},
			"Requerido"
		);

		// 202306020207: Valida una contraseña
		// https://stackoverflow.com/a/40923568
		window.jQuery.validator.addMethod(
			"pwdChk",
			function (value, element, param) {
				// var target = window.jQuery("#" + param).val();
				console.log("pwdChk");
				console.log("value =>", value);
				console.log("element =>", element);
				console.log("param =>", param);
				if (value.search(/[a-z]/i) < 0) {
					errors.push("Your password must contain at least one letter.");
				}
				if (value.search(/[0-9]/) < 0) {
					errors.push("Your password must contain at least one digit.");
				}
				if (value.search(/[a-z]/) < 0) {
					errors.push("Your password must contain at least one lowercase letter.");
				}
				if (value.search(/[A-Z]/) < 0) {
					errors.push("Your password must contain at least one uppercase letter.");
				}
				if (errors.length > 0) {
					alert(errors.join("\n"));
					return false;
				}
				return true;
			},
			"Requerido"
		);
	}

	// 201806281930: Config
	/*
	$.ajax({
		data: "",
		url: window._baseUrl + "sv/cf",
		success: function (obj) {
			window._conf = obj;
			window._debug = window._conf.Environment === "Development";

			// Console
			// 201702220839: Se mete en la carga
			// 201505290946: desabilita los mensajes informativos si debug esta en false
			if (!(window.console && window.console.log) || !window._debug){
				console.clear();
				window.console = {
					log:function(){},
					debug:function(){},
					info:function(){},
					warn:function(){},
					error:function(){},
					clear:function(){}
				};
			}

			console.log(_sep + "window._conf: " + JSON.stringify(window._conf));

			// 201806281922: Actual user
			$.ajax({
				data: "",
				url: window._baseUrl + "sv/us",
				success: function (obj) {
					window._usr = obj;
					console.log(_sep + "Current user (window._usr):\n" + JSON.stringify(window._usr));
					console.log(window._usr);
				}
			});

		}
	});
	*/
	/*
	// 201807102103: ajax error
	window.jQuery.ajaxError = function (jqXhr, textStatus, errorThrown, cb) {
		var tit = "",
			err = "";
		console.log(_sep + "ERROR:\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown + "\njqXhr.status: " + jqXhr.status + "\n" + _sep);
		if (jqXhr.status === 500) {
			tit = errorThrown;
			var html = $("<div>" + jqXhr.responseText + "</div>");
			var tErr = html.find("title");
			if (tErr.length > 0) err += "<span class='font-weight-semibold'>" + tErr.html().decodeHtml() + "</span>";
			if (window._cnf.Environment === "Development") {
				var res = "";
				var lines = html.html().split("\n");
				$.each(lines, function (idx, line) {
					var l = line.toLowerCase();
					if (l.contains(".cs") && l.contains(" in ")) {
						res = line.replaceAll(" in ", "<br>").trim();
						return false;
					}
				});
				if (res.length > 0) err += "<br><span class='font-weight-semibold font-size-sm'>" + res + "</span>";
				var code = html.find("code pre:first").html().replaceAll("\t", " ").replaceAll("  ", " ");
				if (code.length > 0) err += "<small><pre>" + code + "</pre></small>";
				var code = html.find("ol.highlight:first");
				if (code.length > 0) {
					var line = code.attr("start");
					code = code.find("span:first");
					if (code.length > 0) {
						err += "<span class='font-weight-semibold text-size-mini'>" + line + ". </span>";
						err += "<span class='font-weight-semibold text-size-mini text-danger'>" + code.html() + "</span>";
					}
				}
			}
		} else {
			tit = "Error";
			err += "<span class='font-weight-semibold '>" + errorThrown + "</span>";
			//if (window._conf.Environment === "Development"){
			//				err += "<textarea class='text-size-mini'>"+ jqXhr.responseText +"</textarea>";
			if (jqXhr.responseText.trim().length > 0) {
				err += '<div class="form-group"><div class="col-md-12"><textarea rows="8" class="form-control pt-10 pb-10 text-size-mini">';
				err += jqXhr.responseText + "</textarea></div></div>";
			}
			//}
		}
		window.msg.error(tit, err, function () {
			$().unlockAll();
			Call(cb);
		});
	};

	// Ajax setup
	window.jQuery.ajaxSetup({
		type: "POST",
		contentType: "application/json; charset=utf-8",
		headers: {
			"Content-Type": "application/json",
		},
		error: function (jqXhr, textStatus, errorThrown) {
			window.jQuery.ajaxError(jqXhr, textStatus, errorThrown);
		},
	});

	// 201703270234: Hide Popovers
	// http://stackoverflow.com/a/20468809
	if (typeof window.jQuery().popover !== "undefined") {
		$("body").on("click", function (e) {
			$("[data-toggle=popover]").each(function () {
				// hide any open popovers when the anywhere else in the body is clicked
				if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $(".popover").has(e.target).length === 0) {
					$(this).popover("hide");
				}
			});
		});
	}

	// MaskInit
	if (typeof window.jQuery().inputmask !== "undefined") {
		console.log(_sep + "inputmask init");
		window.Inputmask.options = {
			currency: {
				digits: 0,
				alias: "currency",
				autoGroup: true,
				clearIncomplete: true,
				clearMaskOnLostFocus: true,
				greedy: false,
				groupSeparator: ".",
				radixPoint: ",",
				rightAlign: true,
				showMaskOnFocus: true,
				skipOptionalPartCharacter: " ",
			},
			decimal: {
				digits: 2,
				alias: "decimal",
				autoGroup: true,
				clearIncomplete: true,
				numericInput: true,
				//					clearMaskOnLostFocus: true,
				greedy: false,
				groupSeparator: ".",
				radixPoint: ",",
				rightAlign: false,
				showMaskOnFocus: true,
				skipOptionalPartCharacter: " ",
			},
			integer: {
				alias: "integer",
				autoGroup: true,
				clearIncomplete: true,
				//					clearMaskOnLostFocus: true,
				greedy: false,
				numericInput: true,
				groupSeparator: ".",
				radixPoint: ",",
				rightAlign: true,
				showMaskOnFocus: true,
				skipOptionalPartCharacter: " ",
			},
		};
		console.log(window.Inputmask.options.currency);
		window.Inputmask.extendDefaults({
			greedy: false,
			rightAlign: false,
			clearIncomplete: true,
			showMaskOnHover: false,
			skipOptionalPartCharacter: " ",
			showMaskOnFocus: true,
			clearMaskOnLostFocus: true,
			groupSeparator: ".",
			radixPoint: ",",
		});
		$("input[data-mask],input[data-mask-alias]").each(function (index) {
			var el = $(this);
			if (el.hasAttr("data-mask")) {
				el.inputmask({
					mask: el.attr("data-mask"),
					numericInput: el.hasAttr("data-mask-numeric"),
				});
			} else if (el.hasAttr("data-mask-alias")) {
				if (el.attr("data-mask-alias") === "integer") {
					el.inputmask(window.Inputmask.options.integer);
				} else if (el.attr("data-mask-alias") === "decimal") {
					el.inputmask(window.Inputmask.options.decimal);
				} else if (el.attr("data-mask-alias") === "currency") {
					el.inputmask(window.Inputmask.options.currency);
				}
			} else {
				el.inputmask({
					alias: el.attr("data-mask-alias"),
				});
			}
		});
	}

	// 201608240324: Logout function
	window.logout = function (event) {
		//		if (typeof(event) !== "undefined") event.preventDefault();
		// window.frm.attr("action", window._url_logout);
		// window.frm.submit();
	};

	// 201806281827: Actual section
	$("div.navbar-header a").each(function (index) {
		var el = $(this);
		var text = el.text().trim();
		if (text.length > 0) {
			el.attr("title", text + "...");
			var href = el.attr("href");
			if (href === address.path()) {
				console.log(_sep + "Text: " + text + "\nLink: " + href + "\nCurrent: " + address.path());
				el.removeAttr("title").addClass("current");
				el.click(function (e) {
					e.preventDefault();
				});
			}
		}
	});

	// Autocomplete fix
	// window.frm = window.jQuery("form:first");
	// window.frm.attr("autocomplete","off");

	// 201809190357:  Droppdown fix
	// https://stackoverflow.com/a/32527231
	// hold onto the drop down menu
	var dropdownMenu;

	// And when you show it, move it to the body
	$(window).on("show.bs.dropdown", function (e) {
		dropdownMenu = $(e.target).find(".dropdown-menu");
		$("body").append(dropdownMenu.detach());
		var eOffset = $(e.target).offset();
		dropdownMenu.css({
			display: "block",
			top: eOffset.top + $(e.target).outerHeight(),
			left: eOffset.left,
		});
	});

	// And when you hide it, reattach the drop down, and hide it normally
	$(window).on("hide.bs.dropdown", function (e) {
		$(e.target).append(dropdownMenu.detach());
		dropdownMenu.hide();
	});

	// 201810181200: Disabling Chrome Autofill
	// https://stackoverflow.com/a/29582380
	$("input[type='text'],input[type='password']").attr("autocomplete", "off");
	// setSelect2();
	*/
});
