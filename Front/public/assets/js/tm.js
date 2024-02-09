/*! Theme v1.0.20220420 */
window.themeInit = () => {
	function t() {
		$(window).width() < 1950
			? $(".shape-divider svg[preserveAspectRatio]").each(function () {
					$(this).parent().hasClass("shape-divider-horizontal-animation")
						? $(this).attr("preserveAspectRatio", "none")
						: $(this).attr("preserveAspectRatio", "xMinYMin");
			  })
			: $(".shape-divider svg[preserveAspectRatio]").each(function () {
					$(this).attr("preserveAspectRatio", "none");
			  });
	}
	(window.theme = {}),
		(window.theme.fn = {
			getOptions: function (t) {
				if ("object" == typeof t) return t;
				if ("string" != typeof t) return {};
				try {
					return JSON.parse(t.replace(/'/g, '"').replace(";", ""));
				} catch (t) {
					return {};
				}
			},
			execPluginFunction: function (t, e) {
				for (var i = Array.prototype.slice.call(arguments, 2), n = t.split("."), o = n.pop(), a = 0; a < n.length; a++) e = e[n[a]];
				return e[o].apply(e, i);
			},
			intObs: function (t, e, i, n) {
				var o = document.querySelectorAll(t),
					a = { rootMargin: "0px 0px 200px 0px" };
				Object.keys(i).length && (a = $.extend(a, i));
				var s = new IntersectionObserver(function (t) {
					for (var i = 0; i < t.length; i++) {
						var o = t[i];
						if (o.intersectionRatio > 0) {
							if ("string" == typeof e) Function("return " + e)();
							else {
								var a = e;
								a.call($(o.target));
							}
							n || s.unobserve(o.target);
						}
					}
				}, a);
				$(o).each(function () {
					s.observe($(this)[0]);
				});
			},
			intObsInit: function (t, e) {
				var i = document.querySelectorAll(t),
					n = { rootMargin: "200px" },
					o = new IntersectionObserver(function (t) {
						for (var i = 0; i < t.length; i++) {
							var n = t[i];
							if (n.intersectionRatio > 0) {
								var a,
									s = $(n.target),
									r = theme.fn.getOptions(s.data("plugin-options"));
								r && (a = r), theme.fn.execPluginFunction(e, s, a), o.unobserve(n.target);
							}
						}
					}, n);
				$(i).each(function () {
					o.observe($(this)[0]);
				});
			},
			dynIntObsInit: function (t, e, i) {
				var n = document.querySelectorAll(t);
				$(n).each(function () {
					var t,
						n = $(this),
						o = theme.fn.getOptions(n.data("plugin-options"));
					o && (t = o);
					var a = theme.fn.mergeOptions(i, t),
						s = { rootMargin: theme.fn.getRootMargin(e, a), threshold: 0 };
					if (a.forceInit) theme.fn.execPluginFunction(e, n, a);
					else {
						var r = new IntersectionObserver(function (t) {
							for (var i = 0; i < t.length; i++) {
								var o = t[i];
								o.intersectionRatio > 0 && (theme.fn.execPluginFunction(e, n, a), r.unobserve(o.target));
							}
						}, s);
						r.observe(n[0]);
					}
				});
			},
			getRootMargin: function (t, e) {
				switch (t) {
					case "themePluginCounter":
					case "themePluginAnimate":
					case "themePluginIcon":
					case "themePluginRandomImages":
						return e.accY ? "0px 0px " + e.accY + "px 0px" : "0px 0px 200px 0px";
					default:
						return "0px 0px 200px 0px";
				}
			},
			mergeOptions: function (t, e) {
				var i = {};
				for (var n in t) i[n] = t[n];
				for (var n in e) i[n] = e[n];
				return i;
			},
			execOnceTroughEvent: function (t, e, i) {
				var n = this,
					o = n.formatDataName(e);
				return (
					$(t).on(e, function () {
						$(this).data(o) || (i.call($(this)), $(this).data(o, !0), $(this).off(e));
					}),
					this
				);
			},
			execOnceTroughWindowEvent: function (t, e, i) {
				var n = this,
					o = n.formatDataName(e);
				return (
					$(t).on(e, function () {
						$(this).data(o) || (i(), $(this).data(o, !0), $(this).off(e));
					}),
					this
				);
			},
			formatDataName: function (t) {
				return (t = t.replace(".", "")), t;
			},
			isElementInView: function (t) {
				var e = t[0].getBoundingClientRect();
				return e.top <= window.innerHeight / 3;
			},
			getScripts: function (t, e) {
				var i = $.map(t, function (t) {
					return $.getScript((e || "") + t);
				});
				return (
					i.push(
						$.Deferred(function (t) {
							$(t.resolve);
						})
					),
					$.when.apply($, i)
				);
			},
		});
	try {
		$(document).ready(function () {
			if ("file://" === location.origin && ($("[data-icon]").length || $("iframe").length)) {
				$(".modalLocalEnvironment").remove(),
					$("body").append(
						'<div class="modal fade" id="modalLocalEnvironment" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalToggleLabel">Local Environment Warning</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">SVG Objects, Icons, YouTube and Vimeo Videos might not show correctly on local environment. For better result, please preview on a server.</div><div class="modal-footer"><button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button></div></div></div></div>'
					);
				var t = document.getElementById("modalLocalEnvironment");
				t = bootstrap.Modal.getOrCreateInstance(t);
				t.show();
			}
		});
	} catch (t) {}
	if (
		((function () {
			"use strict";
			function t(t) {
				try {
					return (t.defaultView && t.defaultView.frameElement) || null;
				} catch (t) {
					return null;
				}
			}
			function e(t) {
				(this.time = t.time),
					(this.target = t.target),
					(this.rootBounds = s(t.rootBounds)),
					(this.boundingClientRect = s(t.boundingClientRect)),
					(this.intersectionRect = s(t.intersectionRect || { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 })),
					(this.isIntersecting = !!t.intersectionRect);
				var e = this.boundingClientRect,
					i = e.width * e.height,
					n = this.intersectionRect,
					o = n.width * n.height;
				this.intersectionRatio = i ? Number((o / i).toFixed(4)) : this.isIntersecting ? 1 : 0;
			}
			function i(t, e) {
				var i,
					n,
					o,
					a = e || {};
				if ("function" != typeof t) throw new Error("callback must be a function");
				if (a.root && 1 != a.root.nodeType && 9 != a.root.nodeType) throw new Error("root must be a Document or Element");
				(this._checkForIntersections =
					((i = this._checkForIntersections.bind(this)),
					(n = this.THROTTLE_TIMEOUT),
					(o = null),
					function () {
						o ||
							(o = setTimeout(function () {
								i(), (o = null);
							}, n));
					})),
					(this._callback = t),
					(this._observationTargets = []),
					(this._queuedEntries = []),
					(this._rootMarginValues = this._parseRootMargin(a.rootMargin)),
					(this.thresholds = this._initThresholds(a.threshold)),
					(this.root = a.root || null),
					(this.rootMargin = this._rootMarginValues
						.map(function (t) {
							return t.value + t.unit;
						})
						.join(" ")),
					(this._monitoringDocuments = []),
					(this._monitoringUnsubscribes = []);
			}
			function n(t, e, i, n) {
				"function" == typeof t.addEventListener ? t.addEventListener(e, i, n || !1) : "function" == typeof t.attachEvent && t.attachEvent("on" + e, i);
			}
			function o(t, e, i, n) {
				"function" == typeof t.removeEventListener ? t.removeEventListener(e, i, n || !1) : "function" == typeof t.detatchEvent && t.detatchEvent("on" + e, i);
			}
			function a(t) {
				var e;
				try {
					e = t.getBoundingClientRect();
				} catch (t) {}
				return e
					? ((e.width && e.height) || (e = { top: e.top, right: e.right, bottom: e.bottom, left: e.left, width: e.right - e.left, height: e.bottom - e.top }),
					  e)
					: { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
			}
			function s(t) {
				return !t || "x" in t ? t : { top: t.top, y: t.top, bottom: t.bottom, left: t.left, x: t.left, right: t.right, width: t.width, height: t.height };
			}
			function r(t, e) {
				var i = e.top - t.top,
					n = e.left - t.left;
				return { top: i, left: n, height: e.height, width: e.width, bottom: i + e.height, right: n + e.width };
			}
			function l(t, e) {
				for (var i = e; i; ) {
					if (i == t) return !0;
					i = d(i);
				}
				return !1;
			}
			function d(e) {
				var i = e.parentNode;
				return 9 == e.nodeType && e != h ? t(e) : (i && i.assignedSlot && (i = i.assignedSlot.parentNode), i && 11 == i.nodeType && i.host ? i.host : i);
			}
			function c(t) {
				return t && 9 === t.nodeType;
			}
			if ("object" == typeof window)
				if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype)
					"isIntersecting" in window.IntersectionObserverEntry.prototype ||
						Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
							get: function () {
								return this.intersectionRatio > 0;
							},
						});
				else {
					var h = (function (e) {
							for (var i = window.document, n = t(i); n; ) n = t((i = n.ownerDocument));
							return i;
						})(),
						u = [],
						p = null,
						f = null;
					(i.prototype.THROTTLE_TIMEOUT = 100),
						(i.prototype.POLL_INTERVAL = null),
						(i.prototype.USE_MUTATION_OBSERVER = !0),
						(i._setupCrossOriginUpdater = function () {
							return (
								p ||
									(p = function (t, e) {
										(f = t && e ? r(t, e) : { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 }),
											u.forEach(function (t) {
												t._checkForIntersections();
											});
									}),
								p
							);
						}),
						(i._resetCrossOriginUpdater = function () {
							(p = null), (f = null);
						}),
						(i.prototype.observe = function (t) {
							if (
								!this._observationTargets.some(function (e) {
									return e.element == t;
								})
							) {
								if (!t || 1 != t.nodeType) throw new Error("target must be an Element");
								this._registerInstance(),
									this._observationTargets.push({ element: t, entry: null }),
									this._monitorIntersections(t.ownerDocument),
									this._checkForIntersections();
							}
						}),
						(i.prototype.unobserve = function (t) {
							(this._observationTargets = this._observationTargets.filter(function (e) {
								return e.element != t;
							})),
								this._unmonitorIntersections(t.ownerDocument),
								0 == this._observationTargets.length && this._unregisterInstance();
						}),
						(i.prototype.disconnect = function () {
							(this._observationTargets = []), this._unmonitorAllIntersections(), this._unregisterInstance();
						}),
						(i.prototype.takeRecords = function () {
							var t = this._queuedEntries.slice();
							return (this._queuedEntries = []), t;
						}),
						(i.prototype._initThresholds = function (t) {
							var e = t || [0];
							return (
								Array.isArray(e) || (e = [e]),
								e.sort().filter(function (t, e, i) {
									if ("number" != typeof t || isNaN(t) || t < 0 || t > 1) throw new Error("threshold must be a number between 0 and 1 inclusively");
									return t !== i[e - 1];
								})
							);
						}),
						(i.prototype._parseRootMargin = function (t) {
							var e = (t || "0px").split(/\s+/).map(function (t) {
								var e = /^(-?\d*\.?\d+)(px|%)$/.exec(t);
								if (!e) throw new Error("rootMargin must be specified in pixels or percent");
								return { value: parseFloat(e[1]), unit: e[2] };
							});
							return (e[1] = e[1] || e[0]), (e[2] = e[2] || e[0]), (e[3] = e[3] || e[1]), e;
						}),
						(i.prototype._monitorIntersections = function (e) {
							var i = e.defaultView;
							if (i && -1 == this._monitoringDocuments.indexOf(e)) {
								var a = this._checkForIntersections,
									s = null,
									r = null;
								this.POLL_INTERVAL
									? (s = i.setInterval(a, this.POLL_INTERVAL))
									: (n(i, "resize", a, !0),
									  n(e, "scroll", a, !0),
									  this.USE_MUTATION_OBSERVER &&
											"MutationObserver" in i &&
											(r = new i.MutationObserver(a)).observe(e, { attributes: !0, childList: !0, characterData: !0, subtree: !0 })),
									this._monitoringDocuments.push(e),
									this._monitoringUnsubscribes.push(function () {
										var t = e.defaultView;
										t && (s && t.clearInterval(s), o(t, "resize", a, !0)), o(e, "scroll", a, !0), r && r.disconnect();
									});
								var l = (this.root && (this.root.ownerDocument || this.root)) || h;
								if (e != l) {
									var d = t(e);
									d && this._monitorIntersections(d.ownerDocument);
								}
							}
						}),
						(i.prototype._unmonitorIntersections = function (e) {
							var i = this._monitoringDocuments.indexOf(e);
							if (-1 != i) {
								var n = (this.root && (this.root.ownerDocument || this.root)) || h;
								if (
									!this._observationTargets.some(function (i) {
										var o = i.element.ownerDocument;
										if (o == e) return !0;
										for (; o && o != n; ) {
											var a = t(o);
											if ((o = a && a.ownerDocument) == e) return !0;
										}
										return !1;
									})
								) {
									var o = this._monitoringUnsubscribes[i];
									if ((this._monitoringDocuments.splice(i, 1), this._monitoringUnsubscribes.splice(i, 1), o(), e != n)) {
										var a = t(e);
										a && this._unmonitorIntersections(a.ownerDocument);
									}
								}
							}
						}),
						(i.prototype._unmonitorAllIntersections = function () {
							var t = this._monitoringUnsubscribes.slice(0);
							(this._monitoringDocuments.length = 0), (this._monitoringUnsubscribes.length = 0);
							for (var e = 0; e < t.length; e++) t[e]();
						}),
						(i.prototype._checkForIntersections = function () {
							if (this.root || !p || f) {
								var t = this._rootIsInDom(),
									i = t ? this._getRootRect() : { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
								this._observationTargets.forEach(function (n) {
									var o = n.element,
										s = a(o),
										r = this._rootContainsTarget(o),
										l = n.entry,
										d = t && r && this._computeTargetAndRootIntersection(o, s, i),
										c = null;
									this._rootContainsTarget(o) ? (p && !this.root) || (c = i) : (c = { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 });
									var h = (n.entry = new e({
										time: window.performance && performance.now && performance.now(),
										target: o,
										boundingClientRect: s,
										rootBounds: c,
										intersectionRect: d,
									}));
									l
										? t && r
											? this._hasCrossedThreshold(l, h) && this._queuedEntries.push(h)
											: l && l.isIntersecting && this._queuedEntries.push(h)
										: this._queuedEntries.push(h);
								}, this),
									this._queuedEntries.length && this._callback(this.takeRecords(), this);
							}
						}),
						(i.prototype._computeTargetAndRootIntersection = function (t, e, i) {
							if ("none" != window.getComputedStyle(t).display) {
								for (var n, o, s, l, c, u, g, m, v = e, w = d(t), y = !1; !y && w; ) {
									var b = null,
										_ = 1 == w.nodeType ? window.getComputedStyle(w) : {};
									if ("none" == _.display) return null;
									if (w == this.root || 9 == w.nodeType)
										if (((y = !0), w == this.root || w == h))
											p && !this.root ? (!f || (0 == f.width && 0 == f.height) ? ((w = null), (b = null), (v = null)) : (b = f)) : (b = i);
										else {
											var C = d(w),
												x = C && a(C),
												k = C && this._computeTargetAndRootIntersection(C, x, i);
											x && k ? ((w = C), (b = r(x, k))) : ((w = null), (v = null));
										}
									else {
										var T = w.ownerDocument;
										w != T.body && w != T.documentElement && "visible" != _.overflow && (b = a(w));
									}
									if (
										(b &&
											((n = b),
											(o = v),
											(s = void 0),
											(l = void 0),
											(c = void 0),
											(u = void 0),
											(g = void 0),
											(m = void 0),
											(s = Math.max(n.top, o.top)),
											(l = Math.min(n.bottom, o.bottom)),
											(c = Math.max(n.left, o.left)),
											(u = Math.min(n.right, o.right)),
											(m = l - s),
											(v = ((g = u - c) >= 0 && m >= 0 && { top: s, bottom: l, left: c, right: u, width: g, height: m }) || null)),
										!v)
									)
										break;
									w = w && d(w);
								}
								return v;
							}
						}),
						(i.prototype._getRootRect = function () {
							var t;
							if (this.root && !c(this.root)) t = a(this.root);
							else {
								var e = c(this.root) ? this.root : h,
									i = e.documentElement,
									n = e.body;
								t = {
									top: 0,
									left: 0,
									right: i.clientWidth || n.clientWidth,
									width: i.clientWidth || n.clientWidth,
									bottom: i.clientHeight || n.clientHeight,
									height: i.clientHeight || n.clientHeight,
								};
							}
							return this._expandRectByRootMargin(t);
						}),
						(i.prototype._expandRectByRootMargin = function (t) {
							var e = this._rootMarginValues.map(function (e, i) {
									return "px" == e.unit ? e.value : (e.value * (i % 2 ? t.width : t.height)) / 100;
								}),
								i = { top: t.top - e[0], right: t.right + e[1], bottom: t.bottom + e[2], left: t.left - e[3] };
							return (i.width = i.right - i.left), (i.height = i.bottom - i.top), i;
						}),
						(i.prototype._hasCrossedThreshold = function (t, e) {
							var i = t && t.isIntersecting ? t.intersectionRatio || 0 : -1,
								n = e.isIntersecting ? e.intersectionRatio || 0 : -1;
							if (i !== n)
								for (var o = 0; o < this.thresholds.length; o++) {
									var a = this.thresholds[o];
									if (a == i || a == n || a < i != a < n) return !0;
								}
						}),
						(i.prototype._rootIsInDom = function () {
							return !this.root || l(h, this.root);
						}),
						(i.prototype._rootContainsTarget = function (t) {
							var e = (this.root && (this.root.ownerDocument || this.root)) || h;
							return l(e, t) && (!this.root || e == t.ownerDocument);
						}),
						(i.prototype._registerInstance = function () {
							u.indexOf(this) < 0 && u.push(this);
						}),
						(i.prototype._unregisterInstance = function () {
							var t = u.indexOf(this);
							-1 != t && u.splice(t, 1);
						}),
						(window.IntersectionObserver = i),
						(window.IntersectionObserverEntry = e);
				}
		})(),
		(function (e) {
			e.extend({
				browserSelector: function () {
					var t;
					(t = navigator.userAgent || navigator.vendor || window.opera),
						((jQuery.browser = jQuery.browser || {}).mobile =
							/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
								t
							) ||
							/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
								t.substr(0, 4)
							));
					var i = "ontouchstart" in window || navigator.msMaxTouchPoints,
						n = navigator.userAgent,
						o = n.toLowerCase(),
						a = function (t) {
							return o.indexOf(t) > -1;
						},
						s = "gecko",
						r = "webkit",
						l = "safari",
						d = "opera",
						h = document.documentElement,
						u = [
							!/opera|webtv/i.test(o) && /msie\s(\d)/.test(o)
								? "ie ie" + parseFloat(navigator.appVersion.split("MSIE")[1])
								: a("firefox/2")
								? s + " ff2"
								: a("firefox/3.5")
								? s + " ff3 ff3_5"
								: a("firefox/3")
								? s + " ff3"
								: a("gecko/")
								? s
								: a("opera")
								? d + (/version\/(\d+)/.test(o) ? " " + d + RegExp.jQuery1 : /opera(\s|\/)(\d+)/.test(o) ? " " + d + RegExp.jQuery2 : "")
								: a("konqueror")
								? "konqueror"
								: a("chrome")
								? r + " chrome"
								: a("iron")
								? r + " iron"
								: a("applewebkit/")
								? r + " " + l + (/version\/(\d+)/.test(o) ? " " + l + RegExp.jQuery1 : "")
								: a("mozilla/")
								? s
								: "",
							a("j2me")
								? "mobile"
								: a("iphone")
								? "iphone"
								: a("ipod")
								? "ipod"
								: a("mac")
								? "mac"
								: a("darwin")
								? "mac"
								: a("webtv")
								? "webtv"
								: a("win")
								? "win"
								: a("freebsd")
								? "freebsd"
								: a("x11") || a("linux")
								? "linux"
								: "",
							"js",
						];
					(c = u.join(" ")), e.browser.mobile && (c += " mobile"), i && (c += " touch"), (h.className += " " + c);
					var p = /Edge/.test(navigator.userAgent);
					p && e("html").removeClass("chrome").addClass("edge");
					var f = !window.ActiveXObject && "ActiveXObject" in window;
					f
						? e("html").removeClass("gecko").addClass("ie ie11")
						: (e("body").hasClass("dark") && e("html").addClass("dark"), e("body").hasClass("boxed") && e("html").addClass("boxed"));
				},
			}),
				e.browserSelector(),
				(theme.globalWindowWidth = e(window).width());
			e(window).width();
			(window.onresize = function () {
				theme.globalWindowWidth = e(window).width();
			}),
				/iPad|iPhone|iPod/.test(navigator.platform) &&
					e(document).ready(function (t) {
						t(".thumb-info").attr("onclick", "return true");
					}),
				e('a[data-bs-toggle="tab"]').length &&
					(e('a[data-bs-toggle="tab"]').on("shown.bs.tab", function (t) {
						var i = e(e(t.target).attr("href"));
						i.length && i.find(".owl-carousel").trigger("refresh.owl.carousel"),
							e(this).parents(".nav-tabs").find(".active").removeClass("active"),
							e(this).addClass("active").parent().addClass("active");
					}),
					window.location.hash &&
						e(window).on("load", function () {
							"*" !== window.location.hash &&
								e(window.location.hash).get(0) &&
								new bootstrap.Tab(e('a.nav-link[href="' + window.location.hash + '"]:not([data-hash])')[0]).show();
						})),
				e("html").hasClass("disable-onload-scroll") ||
					!window.location.hash ||
					["#*"].includes(window.location.hash) ||
					(window.scrollTo(0, 0),
					e(window).on("load", function () {
						setTimeout(function () {
							var t = window.location.hash,
								i = e(window).width() < 768 ? 180 : 90;
							e(t).length &&
								(e("a[href$='" + window.location.hash + "']").is("[data-hash-offset]")
									? (i = parseInt(
											e("a[href$='" + window.location.hash + "']")
												.first()
												.attr("data-hash-offset")
									  ))
									: e("html").is("[data-hash-offset]") && (i = parseInt(e("html").attr("data-hash-offset"))),
								isNaN(i) && (i = 0),
								e("body").addClass("scrolling"),
								e("html, body").animate({ scrollTop: e(t).offset().top - i }, 600, "easeOutQuad", function () {
									e("body").removeClass("scrolling");
								}));
						}, 1);
					})),
				e.fn.extend({
					textRotator: function (t) {
						var i = { fadeSpeed: 500, pauseSpeed: 100, child: null };
						t = e.extend(i, t);
						return this.each(function () {
							var i = t,
								n = e(this),
								o = e(n.children(), n);
							if (
								(o.each(function () {
									e(this).hide();
								}),
								i.child)
							)
								a = i.child;
							else var a = e(n).children(":first");
							e(a).fadeIn(i.fadeSpeed, function () {
								e(a)
									.delay(i.pauseSpeed)
									.fadeOut(i.fadeSpeed, function () {
										var t = e(this).next();
										0 == t.length && (t = e(n).children(":first")), e(n).textRotator({ child: t, fadeSpeed: i.fadeSpeed, pauseSpeed: i.pauseSpeed });
									});
							});
						});
					},
				});
			var i = {
				$wrapper: e(".notice-top-bar"),
				$closeBtn: e(".notice-top-bar-close"),
				$header: e("#header"),
				$body: e(".body"),
				init: function () {
					var t = this;
					return (
						e.cookie("portoNoticeTopBarClose")
							? (t.$wrapper.parent().prepend("<!-- Notice Top Bar removed by cookie -->"), t.$wrapper.remove())
							: t.build().events(),
						this
					);
				},
				build: function () {
					var t = this;
					return (
						e(window).on("load", function () {
							setTimeout(function () {
								t.$body.css({ "margin-top": t.$wrapper.outerHeight(), transition: "ease margin 300ms" }),
									e("#noticeTopBarContent").textRotator({ fadeSpeed: 500, pauseSpeed: 5e3 }),
									["absolute", "fixed"].includes(t.$header.css("position")) && t.$header.css({ top: t.$wrapper.outerHeight(), transition: "ease top 300ms" }),
									e(window).trigger("notice.top.bar.opened");
							}, 1e3);
						}),
						this
					);
				},
				events: function () {
					var t = this;
					return (
						t.$closeBtn.on("click", function (i) {
							i.preventDefault(),
								t.$body.animate({ "margin-top": 0 }, 300, function () {
									t.$wrapper.remove(), t.saveCookie();
								}),
								["absolute", "fixed"].includes(t.$header.css("position")) && t.$header.animate({ top: 0 }, 300),
								t.$header.hasClass("header-effect-shrink") && t.$header.find(".header-body").animate({ top: 0 }, 300),
								e(window).trigger("notice.top.bar.closed");
						}),
						this
					);
				},
				checkCookie: function () {
					return !!e.cookie("portoNoticeTopBarClose");
				},
				saveCookie: function () {
					return e.cookie("portoNoticeTopBarClose", !0), this;
				},
			};
			if (
				(e(".notice-top-bar").length && i.init(),
				e(".image-hotspot").length && e(".image-hotspot").append('<span class="ring"></span>').append('<span class="circle"></span>'),
				e("body[data-plugin-page-transition]").length)
			) {
				var n = !1;
				e(document).on("click", "a", function (t) {
					n = e(this);
				}),
					e(window).on("beforeunload", function (t) {
						if ("object" == typeof n) {
							var i = n.attr("href");
							0 == i.indexOf("mailto:") || 0 == i.indexOf("tel:") || n.data("rm-from-transition") || e("body").addClass("page-transition-active");
						}
					}),
					e(window).on("pageshow", function (t) {
						t.persisted && (e("html").hasClass("safari") && window.location.reload(), e("body").removeClass("page-transition-active"));
					});
			}
			e(".thumb-info-floating-caption").each(function () {
				e(this)
					.addClass("thumb-info-floating-element-wrapper")
					.append('<span class="thumb-info-floating-element thumb-info-floating-caption-title d-none">' + e(this).data("title") + "</span>"),
					e(this).data("type") &&
						e(".thumb-info-floating-caption-title", e(this))
							.append('<div class="thumb-info-floating-caption-type">' + e(this).data("type") + "</div>")
							.css({ "padding-bottom": 22 }),
					e(this).hasClass("thumb-info-floating-caption-clean") && e(".thumb-info-floating-element", e(this)).addClass("bg-transparent");
			}),
				e(".thumb-info-floating-element-wrapper").length &&
					e(".thumb-info-floating-element-wrapper")
						.on("mouseenter", function (t) {
							e(this).data("offset") || e(this).data("offset", 0);
							var i = parseInt(e(this).data("offset"));
							e(".thumb-info-floating-element-clone").remove(),
								e(".thumb-info-floating-element", e(this))
									.clone()
									.addClass("thumb-info-floating-element-clone p-fixed p-events-none")
									.attr("style", "transform: scale(0.1);")
									.removeClass("d-none")
									.appendTo("body"),
								e(".thumb-info-floating-element-clone")
									.css({ left: t.clientX + i, top: t.clientY + i })
									.fadeIn(300),
								gsap.to(".thumb-info-floating-element-clone", 0.5, { css: { scaleX: 1, scaleY: 1 } }),
								e(document)
									.off("mousemove")
									.on("mousemove", function (t) {
										gsap.to(".thumb-info-floating-element-clone", 0.5, { css: { left: t.clientX + i, top: t.clientY + i } });
									});
						})
						.on("mouseout", function () {
							gsap.to(".thumb-info-floating-element-clone", 0.5, { css: { scaleX: 0.5, scaleY: 0.5, opacity: 0 } });
						}),
				e(window).on("load", function () {
					e(".thumb-info-wrapper-direction-aware").each(function () {
						e(this).hoverdir({ speed: 300, easing: "ease", hoverDelay: 0, inverse: !1, hoverElem: ".thumb-info-wrapper-overlay" });
					});
				}),
				e("[data-toggle-text-click]").on("click", function () {
					e(this).text(function (t, i) {
						return i === e(this).attr("data-toggle-text-click") ? e(this).attr("data-toggle-text-click-alt") : e(this).attr("data-toggle-text-click");
					});
				}),
				e(".shape-divider").length &&
					(t(),
					e(window).on("resize", function () {
						t();
					})),
				e(".shape-divider-horizontal-animation").length &&
					theme.fn.intObs(
						".shape-divider-horizontal-animation",
						function () {
							for (var t = 0; t <= 1; t++) {
								var i = e(this).find("svg:nth-child(1)").clone();
								e(this).append(i);
							}
							e(this).addClass("start");
						},
						{}
					),
				e("[data-porto-toggle-class]").on("click", function (t) {
					t.preventDefault(), e(this).toggleClass(e(this).data("porto-toggle-class"));
				});
			var o = e(window);
			o.on("resize dynamic.height.resize", function () {
				e("[data-dynamic-height]").each(function () {
					var t = e(this),
						i = JSON.parse(t.data("dynamic-height").replace(/'/g, '"').replace(";", ""));
					o.width() < 576 && t.height(i[4]),
						o.width() > 575 && o.width() < 768 && t.height(i[3]),
						o.width() > 767 && o.width() < 992 && t.height(i[2]),
						o.width() > 991 && o.width() < 1200 && t.height(i[1]),
						o.width() > 1199 && t.height(i[0]);
				});
			}),
				o.width() < 992 && o.trigger("dynamic.height.resize"),
				e("[data-trigger-play-video]").length &&
					theme.fn.execOnceTroughEvent("[data-trigger-play-video]", "mouseover.trigger.play.video", function () {
						var t = e(e(this).data("trigger-play-video"));
						e(this).on("click", function (i) {
							i.preventDefault(),
								"yes" == e(this).data("trigger-play-video-remove")
									? e(this).animate({ opacity: 0 }, 300, function () {
											t[0].play(), e(this).remove();
									  })
									: setTimeout(function () {
											t[0].play();
									  }, 300);
						});
					}),
				e("video[data-auto-play]").length &&
					e(window).on("load", function () {
						e("video[data-auto-play]").each(function () {
							var t = e(this);
							setTimeout(function () {
								e("#" + t.attr("id")).length &&
									("yes" == e('[data-trigger-play-video="#' + t.attr("id") + '"]').data("trigger-play-video-remove")
										? e('[data-trigger-play-video="#' + t.attr("id") + '"]').animate({ opacity: 0 }, 300, function () {
												t[0].play(), e('[data-trigger-play-video="#' + t.attr("id") + '"]').remove();
										  })
										: setTimeout(function () {
												t[0].play();
										  }, 300));
							}, 100);
						});
					}),
				e("[data-remove-min-height]").length &&
					e(window).on("load", function () {
						e("[data-remove-min-height]").each(function () {
							e(this).css({ "min-height": 0 });
						});
					}),
				e(".style-switcher-open-loader").length &&
					e(".style-switcher-open-loader").on("click", function (t) {
						t.preventDefault();
						var i = e(this);
						i.addClass("style-switcher-open-loader-loading");
						var n = e(this).data("base-path"),
							o = e(this).data("skin-src"),
							a = document.createElement("script");
						a.src = n + "master/style-switcher/style.switcher.localStorage.js";
						var s = document.createElement("script");
						(s.src = n + "master/style-switcher/style.switcher.js"),
							(s.id = "styleSwitcherScript"),
							s.setAttribute("data-base-path", n),
							s.setAttribute("data-skin-src", o),
							(s.onload = function () {
								setTimeout(function () {
									function t() {
										e(".style-switcher-open").length ? e(".style-switcher-open").trigger("click") : window.setTimeout(t, 100);
									}
									t();
								}, 500);
							}),
							document.body.appendChild(a),
							document.body.appendChild(s);
					});
		})(jQuery),
		document.addEventListener("lazybeforeunveil", function (t) {
			var e = t.target.getAttribute("data-bg-src");
			e && (t.target.style.backgroundImage = "url(" + e + ")");
		}),
		(function (t) {
			"function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? t(require("jquery")) : t(jQuery);
		})(function (t) {
			function e(t, e) {
				return t.toFixed(e.decimals);
			}
			var i = function (e, n) {
				(this.$element = t(e)), (this.options = t.extend({}, i.DEFAULTS, this.dataOptions(), n)), this.init();
			};
			(i.DEFAULTS = { from: 0, to: 0, speed: 1e3, refreshInterval: 100, decimals: 0, formatter: e, onUpdate: null, onComplete: null }),
				(i.prototype.init = function () {
					(this.value = this.options.from),
						(this.loops = Math.ceil(this.options.speed / this.options.refreshInterval)),
						(this.loopCount = 0),
						(this.increment = (this.options.to - this.options.from) / this.loops);
				}),
				(i.prototype.dataOptions = function () {
					var t = {
							from: this.$element.data("from"),
							to: this.$element.data("to"),
							speed: this.$element.data("speed"),
							refreshInterval: this.$element.data("refresh-interval"),
							decimals: this.$element.data("decimals"),
						},
						e = Object.keys(t);
					for (var i in e) {
						var n = e[i];
						void 0 === t[n] && delete t[n];
					}
					return t;
				}),
				(i.prototype.update = function () {
					(this.value += this.increment),
						this.loopCount++,
						this.render(),
						"function" == typeof this.options.onUpdate && this.options.onUpdate.call(this.$element, this.value),
						this.loopCount >= this.loops &&
							(clearInterval(this.interval),
							(this.value = this.options.to),
							"function" == typeof this.options.onComplete && this.options.onComplete.call(this.$element, this.value));
				}),
				(i.prototype.render = function () {
					var t = this.options.formatter.call(this.$element, this.value, this.options);
					this.$element.text(t);
				}),
				(i.prototype.restart = function () {
					this.stop(), this.init(), this.start();
				}),
				(i.prototype.start = function () {
					this.stop(), this.render(), (this.interval = setInterval(this.update.bind(this), this.options.refreshInterval));
				}),
				(i.prototype.stop = function () {
					this.interval && clearInterval(this.interval);
				}),
				(i.prototype.toggle = function () {
					this.interval ? this.stop() : this.start();
				}),
				(t.fn.countTo = function (e) {
					return this.each(function () {
						var n = t(this),
							o = n.data("countTo"),
							a = !o || "object" == typeof e,
							s = "object" == typeof e ? e : {},
							r = "string" == typeof e ? e : "start";
						a && (o && o.stop(), n.data("countTo", (o = new i(this, s)))), o[r].call(o);
					});
				});
		}),
		(function (t) {
			t.fn.visible = function (e, i, n, o) {
				if (!(this.length < 1)) {
					var a = this.length > 1 ? this.eq(0) : this,
						s = null != o,
						r = t(s ? o : window),
						l = s ? r.position() : 0,
						d = a.get(0),
						c = r.outerWidth(),
						h = r.outerHeight(),
						u = ((n = n || "both"), !0 !== i || d.offsetWidth * d.offsetHeight);
					if ("function" == typeof d.getBoundingClientRect) {
						var p = d.getBoundingClientRect(),
							f = s ? p.top - l.top >= 0 && p.top < h + l.top : p.top >= 0 && p.top < h,
							g = s ? p.bottom - l.top > 0 && p.bottom <= h + l.top : p.bottom > 0 && p.bottom <= h,
							m = s ? p.left - l.left >= 0 && p.left < c + l.left : p.left >= 0 && p.left < c,
							v = s ? p.right - l.left > 0 && p.right < c + l.left : p.right > 0 && p.right <= c,
							w = e ? f || g : f && g,
							y = e ? m || v : m && v;
						if ("both" === n) return u && w && y;
						if ("vertical" === n) return u && w;
						if ("horizontal" === n) return u && y;
					} else {
						var b = s ? 0 : l,
							_ = b + h,
							C = r.scrollLeft(),
							x = C + c,
							k = a.position(),
							T = k.top,
							O = T + a.height(),
							$ = k.left,
							S = $ + a.width(),
							P = !0 === e ? O : T,
							I = !0 === e ? T : O,
							D = !0 === e ? S : $,
							z = !0 === e ? $ : S;
						if ("both" === n) return !!u && I <= _ && P >= b && z <= x && D >= C;
						if ("vertical" === n) return !!u && I <= _ && P >= b;
						if ("horizontal" === n) return !!u && z <= x && D >= C;
					}
				}
			};
		})(jQuery),
		(function (t) {
			"use strict";
			"function" == typeof define && define.amd
				? define(["jquery"], t)
				: "undefined" != typeof module && module.exports
				? (module.exports = t(require("jquery")))
				: t(jQuery);
		})(function (t) {
			var e = -1,
				i = -1,
				n = function (t) {
					return parseFloat(t) || 0;
				},
				o = function (e) {
					var i = 1,
						o = t(e),
						a = null,
						s = [];
					return (
						o.each(function () {
							var e = t(this),
								o = e.offset().top - n(e.css("margin-top")),
								r = s.length > 0 ? s[s.length - 1] : null;
							null === r ? s.push(e) : Math.floor(Math.abs(a - o)) <= i ? (s[s.length - 1] = r.add(e)) : s.push(e), (a = o);
						}),
						s
					);
				},
				a = function (e) {
					var i = { byRow: !0, property: "height", target: null, remove: !1 };
					return "object" == typeof e ? t.extend(i, e) : ("boolean" == typeof e ? (i.byRow = e) : "remove" === e && (i.remove = !0), i);
				},
				s = (t.fn.matchHeight = function (e) {
					var i = a(e);
					if (i.remove) {
						var n = this;
						return (
							this.css(i.property, ""),
							t.each(s._groups, function (t, e) {
								e.elements = e.elements.not(n);
							}),
							this
						);
					}
					return this.length <= 1 && !i.target ? this : (s._groups.push({ elements: this, options: i }), s._apply(this, i), this);
				});
			(s.version = "0.7.2"),
				(s._groups = []),
				(s._throttle = 80),
				(s._maintainScroll = !1),
				(s._beforeUpdate = null),
				(s._afterUpdate = null),
				(s._rows = o),
				(s._parse = n),
				(s._parseOptions = a),
				(s._apply = function (e, i) {
					var r = a(i),
						l = t(e),
						d = [l],
						c = t(window).scrollTop(),
						h = t("html").outerHeight(!0),
						u = l.parents().filter(":hidden");
					return (
						u.each(function () {
							var e = t(this);
							e.data("style-cache", e.attr("style"));
						}),
						u.css("display", "block"),
						r.byRow &&
							!r.target &&
							(l.each(function () {
								var e = t(this),
									i = e.css("display");
								"inline-block" !== i && "flex" !== i && "inline-flex" !== i && (i = "block"),
									e.data("style-cache", e.attr("style")),
									e.css({
										display: i,
										"padding-top": "0",
										"padding-bottom": "0",
										"margin-top": "0",
										"margin-bottom": "0",
										"border-top-width": "0",
										"border-bottom-width": "0",
										height: "100px",
										overflow: "hidden",
									});
							}),
							(d = o(l)),
							l.each(function () {
								var e = t(this);
								e.attr("style", e.data("style-cache") || "");
							})),
						t.each(d, function (e, i) {
							var o = t(i),
								a = 0;
							if (r.target) a = r.target.outerHeight(!1);
							else {
								if (r.byRow && o.length <= 1) return void o.css(r.property, "");
								o.each(function () {
									var e = t(this),
										i = e.attr("style"),
										n = e.css("display");
									"inline-block" !== n && "flex" !== n && "inline-flex" !== n && (n = "block");
									var o = { display: n };
									(o[r.property] = ""), e.css(o), e.outerHeight(!1) > a && (a = e.outerHeight(!1)), i ? e.attr("style", i) : e.css("display", "");
								});
							}
							o.each(function () {
								var e = t(this),
									i = 0;
								(r.target && e.is(r.target)) ||
									("border-box" !== e.css("box-sizing") &&
										((i += n(e.css("border-top-width")) + n(e.css("border-bottom-width"))), (i += n(e.css("padding-top")) + n(e.css("padding-bottom")))),
									e.css(r.property, a - i + "px"));
							});
						}),
						u.each(function () {
							var e = t(this);
							e.attr("style", e.data("style-cache") || null);
						}),
						s._maintainScroll && t(window).scrollTop((c / h) * t("html").outerHeight(!0)),
						this
					);
				}),
				(s._applyDataApi = function () {
					var e = {};
					t("[data-match-height], [data-mh]").each(function () {
						var i = t(this),
							n = i.attr("data-mh") || i.attr("data-match-height");
						e[n] = n in e ? e[n].add(i) : i;
					}),
						t.each(e, function () {
							this.matchHeight(!0);
						});
				});
			var r = function (e) {
				s._beforeUpdate && s._beforeUpdate(e, s._groups),
					t.each(s._groups, function () {
						s._apply(this.elements, this.options);
					}),
					s._afterUpdate && s._afterUpdate(e, s._groups);
			};
			(s._update = function (n, o) {
				if (o && "resize" === o.type) {
					var a = t(window).width();
					if (a === e) return;
					e = a;
				}
				n
					? -1 === i &&
					  (i = setTimeout(function () {
							r(o), (i = -1);
					  }, s._throttle))
					: r(o);
			}),
				t(s._applyDataApi);
			var l = t.fn.on ? "on" : "bind";
			t(window)[l]("load", function (t) {
				s._update(!1, t);
			}),
				t(window)[l]("resize orientationchange", function (t) {
					s._update(!0, t);
				});
		}),
		(function (t) {
			"function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? (module.exports = t(require("jquery"))) : t(jQuery);
		})(function (t) {
			var e,
				i = "waitForImages",
				n = ((e = new Image()), e.srcset && e.sizes);
			(t.waitForImages = {
				hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor"],
				hasImageAttributes: ["srcset"],
			}),
				(t.expr.pseudos["has-src"] = function (e) {
					return t(e).is('img[src][src!=""]');
				}),
				(t.expr.pseudos.uncached = function (e) {
					return !!t(e).is(":has-src") && !e.complete;
				}),
				(t.fn.waitForImages = function () {
					var e,
						o,
						a,
						s = 0,
						r = 0,
						l = t.Deferred(),
						d = this,
						c = [],
						h = t.waitForImages.hasImageProperties || [],
						u = t.waitForImages.hasImageAttributes || [],
						p = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
					if (
						(t.isPlainObject(arguments[0])
							? ((a = arguments[0].waitForAll), (o = arguments[0].each), (e = arguments[0].finished))
							: 1 === arguments.length && "boolean" === t.type(arguments[0])
							? (a = arguments[0])
							: ((e = arguments[0]), (o = arguments[1]), (a = arguments[2])),
						(e = e || t.noop),
						(o = o || t.noop),
						(a = !!a),
						!t.isFunction(e) || !t.isFunction(o))
					)
						throw new TypeError("An invalid callback was supplied.");
					return (
						this.each(function () {
							var e = t(this);
							a
								? e
										.find("*")
										.addBack()
										.each(function () {
											var e = t(this);
											e.is("img:has-src") && !e.is("[srcset]") && c.push({ src: e.attr("src"), element: e[0] }),
												t.each(h, function (t, i) {
													var n,
														o = e.css(i);
													if (!o) return !0;
													for (; (n = p.exec(o)); ) c.push({ src: n[2], element: e[0] });
												}),
												t.each(u, function (t, i) {
													var n = e.attr(i);
													if (!n) return !0;
													c.push({ src: e.attr("src"), srcset: e.attr("srcset"), element: e[0] });
												});
										})
								: e.find("img:has-src").each(function () {
										c.push({ src: this.src, element: this });
								  });
						}),
						(s = c.length),
						(r = 0),
						0 === s && (e.call(d), l.resolveWith(d)),
						t.each(c, function (a, c) {
							var h = new Image(),
								u = "load." + i + " error." + i;
							t(h).one(u, function i(n) {
								var a = [r, s, "load" == n.type];
								if ((r++, o.apply(c.element, a), l.notifyWith(c.element, a), t(this).off(u, i), r == s)) return e.call(d[0]), l.resolveWith(d[0]), !1;
							}),
								n && c.srcset && ((h.srcset = c.srcset), (h.sizes = c.sizes)),
								(h.src = c.src);
						}),
						l.promise()
					);
				});
		}),
		(function (t, e) {
			fontSpy = function (t, i) {
				var n = e("html"),
					o = e("body"),
					a = t;
				if ("string" != typeof a || "" === a) throw "A valid fontName is required. fontName must be a string and must not be an empty string.";
				var s = {
						font: a,
						fontClass: a.toLowerCase().replace(/\s/g, ""),
						success: function () {},
						failure: function () {},
						testFont: "Courier New",
						testString: "QW@HhsXJ",
						glyphs: "",
						delay: 50,
						timeOut: 1e3,
						callback: e.noop,
					},
					r = e.extend(s, i),
					l = e("<span>" + r.testString + r.glyphs + "</span>")
						.css("position", "absolute")
						.css("top", "-9999px")
						.css("left", "-9999px")
						.css("visibility", "hidden")
						.css("fontFamily", r.testFont)
						.css("fontSize", "250px");
				o.append(l);
				var d = l.outerWidth();
				l.css("fontFamily", r.font + "," + r.testFont);
				var c = function () {
						n.addClass("no-" + r.fontClass), r && r.failure && r.failure(), r.callback(new Error("FontSpy timeout")), l.remove();
					},
					h = function () {
						r.callback(), n.addClass(r.fontClass), r && r.success && r.success(), l.remove();
					},
					u = function () {
						setTimeout(p, r.delay), (r.timeOut = r.timeOut - r.delay);
					},
					p = function () {
						var t = l.outerWidth();
						d !== t ? h() : r.timeOut < 0 ? c() : u();
					};
				p();
			};
		})(0, jQuery),
		(function (t) {
			"use strict";
			t.fn.pin = function (e) {
				var i = 0,
					n = [],
					o = !1,
					a = t(window);
				e = e || {};
				var s = function () {
						for (var i = 0, s = n.length; i < s; i++) {
							var r = n[i];
							if (e.minWidth && a.outerWidth() <= e.minWidth)
								r.parent().is(".pin-wrapper") && r.unwrap(),
									r.css({ width: "", left: "", top: "", position: "" }),
									e.activeClass && r.removeClass(e.activeClass),
									(o = !0);
							else {
								o = !1;
								var l = e.containerSelector ? r.closest(e.containerSelector) : t(document.body),
									d = r.offset(),
									c = l.offset(),
									h = r.parent().offset();
								r.parent().is(".pin-wrapper") || r.wrap("<div class='pin-wrapper'>");
								var u = t.extend({ top: 0, bottom: 0 }, e.padding || {});
								r.data("pin", {
									pad: u,
									from: (e.containerSelector ? c.top : d.top) - u.top,
									to: c.top + l.height() - r.outerHeight() - u.bottom,
									end: c.top + l.height(),
									parentTop: h.top,
								}),
									r.css({ width: r.outerWidth() }),
									r.parent().css("height", r.outerHeight());
							}
						}
					},
					r = function () {
						if (!o) {
							i = a.scrollTop();
							for (var s = [], r = 0, l = n.length; r < l; r++) {
								var d = t(n[r]),
									c = d.data("pin");
								if (c) {
									s.push(d);
									var h = c.from - c.pad.bottom,
										u = c.to - c.pad.top;
									h + d.outerHeight() > c.end
										? d.css("position", "")
										: h < i && u > i
										? ("fixed" != d.css("position") && d.css({ left: d.offset().left, top: c.pad.top }).css("position", "fixed"),
										  e.activeClass && d.addClass(e.activeClass))
										: i >= u
										? (d.css({ left: "", top: u - c.parentTop + c.pad.top }).css("position", "absolute"), e.activeClass && d.addClass(e.activeClass))
										: (d.css({ position: "", top: "", left: "" }), e.activeClass && d.removeClass(e.activeClass));
								}
							}
							n = s;
						}
					},
					l = function () {
						s(), r();
					};
				return (
					this.each(function () {
						var e = t(this),
							i = t(this).data("pin") || {};
						(i && i.update) || (n.push(e), t("img", this).one("load", s), (i.update = l), t(this).data("pin", i));
					}),
					a.scroll(r),
					a.resize(function () {
						s();
					}),
					s(),
					a.on("load", l),
					this
				);
			};
		})(jQuery),
		(function (t) {
			"use strict";
			var e,
				i = { action: function () {}, runOnLoad: !1, duration: 500 },
				n = i,
				o = !1,
				a = {
					init: function () {
						for (var e = 0; e <= arguments.length; e++) {
							var i = arguments[e];
							switch (typeof i) {
								case "function":
									n.action = i;
									break;
								case "boolean":
									n.runOnLoad = i;
									break;
								case "number":
									n.duration = i;
							}
						}
						return this.each(function () {
							n.runOnLoad && n.action(),
								t(this).resize(function () {
									a.timedAction.call(this);
								});
						});
					},
					timedAction: function (t, i) {
						var a = function () {
								var t = n.duration;
								if (o) {
									var i = new Date() - e;
									if (((t = n.duration - i), t <= 0)) return clearTimeout(o), (o = !1), void n.action();
								}
								s(t);
							},
							s = function (t) {
								o = setTimeout(a, t);
							};
						(e = new Date()), "number" == typeof i && (n.duration = i), "function" == typeof t && (n.action = t), o || a();
					},
				};
			t.fn.afterResize = function (t) {
				return a[t] ? a[t].apply(this, Array.prototype.slice.call(arguments, 1)) : a.init.apply(this, arguments);
			};
		})(jQuery),
		jQuery(document).ready(function (t) {
			function e() {
				n(".word-rotator", ".word-rotator.letters");
			}
			function n(e) {
				var n = c;
				theme.fn.intObs(
					e,
					function () {
						t(this).hasClass("letters") &&
							t(this)
								.find("b")
								.each(function () {
									var e = t(this),
										n = e.text().split(""),
										o = e.hasClass("is-visible");
									for (i in n)
										e.parents(".rotate-2").length > 0 && (n[i] = "<em>" + n[i] + "</em>"),
											(n[i] = o ? '<i class="in">' + n[i] + "</i>" : "<i>" + n[i] + "</i>");
									var a = n.join("");
									e.html(a).css("opacity", 1);
								});
						var e = t(this);
						if (e.hasClass("loading-bar"))
							(n = h),
								setTimeout(function () {
									e.find(".word-rotator-words").addClass("is-loading");
								}, u);
						else if (e.hasClass("clip")) {
							var a = e.find(".word-rotator-words"),
								s = a.outerWidth() + 10;
							a.css("width", s);
						} else if (!e.hasClass("type")) {
							var r = e.find(".word-rotator-words b"),
								l = 0;
							r.each(function () {
								var e = t(this).outerWidth();
								e > l && (l = e);
							}),
								e.find(".word-rotator-words").css("width", l);
						}
						setTimeout(function () {
							o(e.find(".is-visible").eq(0));
						}, n);
					},
					{}
				);
			}
			function o(t) {
				var e = l(t);
				if (t.parents(".word-rotator").hasClass("type")) {
					var i = t.parent(".word-rotator-words");
					i.addClass("selected").removeClass("waiting"),
						setTimeout(function () {
							i.removeClass("selected"), t.removeClass("is-visible").addClass("is-hidden").children("i").removeClass("in").addClass("out");
						}, g),
						setTimeout(function () {
							a(e, f);
						}, m);
				} else if (t.parents(".word-rotator").hasClass("letters")) {
					var n = t.children("i").length >= e.children("i").length;
					s(t.find("i").eq(0), t, n, p), r(e.find("i").eq(0), e, n, p);
				} else
					t.parents(".word-rotator").hasClass("clip")
						? t
								.parents(".word-rotator-words")
								.stop(!0, !0)
								.animate({ width: "2px" }, v, function () {
									d(t, e), a(e);
								})
						: t.parents(".word-rotator").hasClass("loading-bar")
						? (t.parents(".word-rotator-words").removeClass("is-loading"),
						  d(t, e),
						  setTimeout(function () {
								o(e);
						  }, h),
						  setTimeout(function () {
								t.parents(".word-rotator-words").addClass("is-loading");
						  }, u))
						: (d(t, e),
						  setTimeout(function () {
								o(e);
						  }, c));
			}
			function a(t, e) {
				t.parents(".word-rotator").hasClass("type")
					? (r(t.find("i").eq(0), t, !1, e), t.addClass("is-visible").removeClass("is-hidden"))
					: t.parents(".word-rotator").hasClass("clip") &&
					  (document.hasFocus()
							? t
									.parents(".word-rotator-words")
									.stop(!0, !0)
									.animate({ width: t.outerWidth() + 10 }, v, function () {
										setTimeout(function () {
											o(t);
										}, w);
									})
							: (t
									.parents(".word-rotator-words")
									.stop(!0, !0)
									.animate({ width: t.outerWidth() + 10 }),
							  setTimeout(function () {
									o(t);
							  }, w)));
			}
			function s(e, i, n, a) {
				if (
					(e.removeClass("in").addClass("out"),
					e.is(":last-child")
						? n &&
						  setTimeout(function () {
								o(l(i));
						  }, c)
						: setTimeout(function () {
								s(e.next(), i, n, a);
						  }, a),
					e.is(":last-child") && t("html").hasClass("no-csstransitions"))
				) {
					var r = l(i);
					d(i, r);
				}
			}
			function r(t, e, i, n) {
				t.addClass("in").removeClass("out"),
					t.is(":last-child")
						? (e.parents(".word-rotator").hasClass("type") &&
								setTimeout(function () {
									e.parents(".word-rotator-words").addClass("waiting");
								}, 200),
						  i ||
								setTimeout(function () {
									o(e);
								}, c),
						  e.closest(".word-rotator").hasClass("type") || e.closest(".word-rotator-words").stop(!0, !0).animate({ width: e.outerWidth() }))
						: setTimeout(function () {
								r(t.next(), e, i, n);
						  }, n);
			}
			function l(t) {
				return t.is(":last-child") ? t.parent().children().eq(0) : t.next();
			}
			function d(t, e) {
				if (
					(t.removeClass("is-visible").addClass("is-hidden"), e.removeClass("is-hidden").addClass("is-visible"), !e.closest(".word-rotator").hasClass("clip"))
				) {
					var i = 0,
						n = e.outerWidth() > t.outerWidth() ? 0 : 600;
					(e.closest(".word-rotator").hasClass("loading-bar") || e.closest(".word-rotator").hasClass("slide")) && ((i = 3), (n = 0)),
						setTimeout(function () {
							e.closest(".word-rotator-words")
								.stop(!0, !0)
								.animate({ width: e.outerWidth() + i });
						}, n);
				}
			}
			var c = 2500,
				h = 3800,
				u = h - 3e3,
				p = 50,
				f = 150,
				g = 500,
				m = g + 800,
				v = 600,
				w = 1500;
			e();
		}),
		(function (t) {
			t.fn.hover3d = function (e) {
				var i = t.extend(
					{
						selector: null,
						perspective: 1e3,
						sensitivity: 20,
						invert: !1,
						shine: !1,
						hoverInClass: "hover-in",
						hoverOutClass: "hover-out",
						hoverClass: "hover-3d",
					},
					e
				);
				return this.each(function () {
					function e(t) {
						s.addClass(i.hoverInClass + " " + i.hoverClass),
							(currentX = currentY = 0),
							setTimeout(function () {
								s.removeClass(i.hoverInClass);
							}, 1e3);
					}
					function n(t) {
						var e = s.innerWidth(),
							n = s.innerHeight(),
							o = Math.round(t.pageX - s.offset().left),
							a = Math.round(t.pageY - s.offset().top),
							l = i.invert ? (e / 2 - o) / i.sensitivity : -(e / 2 - o) / i.sensitivity,
							d = i.invert ? -(n / 2 - a) / i.sensitivity : (n / 2 - a) / i.sensitivity,
							c = o - e / 2,
							h = a - n / 2,
							u = Math.atan2(h, c),
							p = (180 * u) / Math.PI - 90;
						p < 0 && (p += 360),
							s.css({ perspective: i.perspective + "px", transformStyle: "preserve-3d", transform: "rotateY(" + l + "deg) rotateX(" + d + "deg)" }),
							r.css("background", "linear-gradient(" + p + "deg, rgba(255,255,255," + (t.offsetY / n) * 0.5 + ") 0%,rgba(255,255,255,0) 80%)");
					}
					function o() {
						s.addClass(i.hoverOutClass + " " + i.hoverClass),
							s.css({ perspective: i.perspective + "px", transformStyle: "preserve-3d", transform: "rotateX(0) rotateY(0)" }),
							setTimeout(function () {
								s.removeClass(i.hoverOutClass + " " + i.hoverClass), (currentX = currentY = 0);
							}, 1e3);
					}
					var a = t(this),
						s = a.find(i.selector);
					(currentX = 0), (currentY = 0), i.shine && s.append('<div class="shine"></div>');
					var r = t(this).find(".shine");
					a.css({ perspective: i.perspective + "px", transformStyle: "preserve-3d" }),
						s.css({ perspective: i.perspective + "px", transformStyle: "preserve-3d" }),
						r.css({ position: "absolute", top: 0, left: 0, bottom: 0, right: 0, transform: "translateZ(1px)", "z-index": 9 }),
						a.on("mouseenter", function () {
							return e();
						}),
						a.on("mousemove", function (t) {
							return n(t);
						}),
						a.on("mouseleave", function () {
							return o();
						});
				});
			};
		})(jQuery),
		(function (t, e, i) {
			"use strict";
			(t.HoverDir = function (e, i) {
				(this.$el = t(i)), this._init(e);
			}),
				(t.HoverDir.defaults = { speed: 300, easing: "ease", hoverDelay: 0, inverse: !1, hoverElem: ".thumb-info-wrapper-overlay" }),
				(t.HoverDir.prototype = {
					_init: function (e) {
						(this.options = t.extend(!0, {}, t.HoverDir.defaults, e)),
							(this.transitionProp = "all " + this.options.speed + "ms " + this.options.easing),
							(this.support = Modernizr.csstransitions),
							this._loadEvents();
					},
					_loadEvents: function () {
						var e = this;
						this.$el.on("mouseenter.hoverdir, mouseleave.hoverdir", function (i) {
							var n = t(this),
								o = n.find(e.options.hoverElem),
								a = e._getDir(n, { x: i.pageX, y: i.pageY }),
								s = e._getStyle(a);
							"mouseenter" === i.type
								? (o.hide().css(s.from),
								  clearTimeout(e.tmhover),
								  (e.tmhover = setTimeout(function () {
										o.show(0, function () {
											var i = t(this);
											e.support && i.css("transition", e.transitionProp), e._applyAnimation(i, s.to, e.options.speed);
										});
								  }, e.options.hoverDelay)))
								: (e.support && o.css("transition", e.transitionProp), clearTimeout(e.tmhover), e._applyAnimation(o, s.from, e.options.speed));
						});
					},
					_getDir: function (t, e) {
						var i = t.width(),
							n = t.height(),
							o = (e.x - t.offset().left - i / 2) * (i > n ? n / i : 1),
							a = (e.y - t.offset().top - n / 2) * (n > i ? i / n : 1),
							s = Math.round((Math.atan2(a, o) * (180 / Math.PI) + 180) / 90 + 3) % 4;
						return s;
					},
					_getStyle: function (t) {
						var e,
							i,
							n = { left: "0px", top: "-100%" },
							o = { left: "0px", top: "100%" },
							a = { left: "-100%", top: "0px" },
							s = { left: "100%", top: "0px" },
							r = { top: "0px" },
							l = { left: "0px" };
						switch (t) {
							case 0:
								(e = this.options.inverse ? o : n), (i = r);
								break;
							case 1:
								(e = this.options.inverse ? a : s), (i = l);
								break;
							case 2:
								(e = this.options.inverse ? n : o), (i = r);
								break;
							case 3:
								(e = this.options.inverse ? s : a), (i = l);
						}
						return { from: e, to: i };
					},
					_applyAnimation: function (e, i, n) {
						(t.fn.applyStyle = this.support ? t.fn.css : t.fn.animate), e.stop().applyStyle(i, t.extend(!0, [], { duration: n + "ms" }));
					},
				});
			var n = function (t) {
				e.console && e.console.error(t);
			};
			t.fn.hoverdir = function (e) {
				var i = t.data(this, "hoverdir");
				if ("string" == typeof e) {
					var o = Array.prototype.slice.call(arguments, 1);
					this.each(function () {
						i
							? t.isFunction(i[e]) && "_" !== e.charAt(0)
								? i[e].apply(i, o)
								: n("no such method '" + e + "' for hoverdir instance")
							: n("cannot call methods on hoverdir prior to initialization; attempted to call method '" + e + "'");
					});
				} else
					this.each(function () {
						i ? i._init() : (i = t.data(this, "hoverdir", new t.HoverDir(e, this)));
					});
				return i;
			};
		})(jQuery, window),
		(function (t, e) {
			"object" == typeof exports && "undefined" != typeof module
				? e(exports)
				: "function" == typeof define && define.amd
				? define(["exports"], e)
				: e(((t = t || self).window = t.window || {}));
		})(this, function (t) {
			"use strict";
			function e(t, e) {
				(t.prototype = Object.create(e.prototype)), ((t.prototype.constructor = t).__proto__ = e);
			}
			function i(t) {
				if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return t;
			}
			function n(t) {
				return "string" == typeof t;
			}
			function o(t) {
				return "function" == typeof t;
			}
			function a(t) {
				return "number" == typeof t;
			}
			function s(t) {
				return void 0 === t;
			}
			function r(t) {
				return "object" == typeof t;
			}
			function l(t) {
				return !1 !== t;
			}
			function d() {
				return "undefined" != typeof window;
			}
			function c(t) {
				return o(t) || n(t);
			}
			function h(t) {
				return (de = oi(t, Xe)) && Xi;
			}
			function u(t, e) {
				return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
			}
			function p(t, e) {
				return !e && console.warn(t);
			}
			function f(t, e) {
				return (t && (Xe[t] = e) && de && (de[t] = e)) || Xe;
			}
			function g() {
				return 0;
			}
			function m(t) {
				var e,
					i,
					n = t[0];
				if ((r(n) || o(n) || (t = [t]), !(e = (n._gsap || {}).harness))) {
					for (i = ii.length; i-- && !ii[i].targetTest(n); );
					e = ii[i];
				}
				for (i = t.length; i--; ) (t[i] && (t[i]._gsap || (t[i]._gsap = new Oi(t[i], e)))) || t.splice(i, 1);
				return t;
			}
			function v(t) {
				return t._gsap || m(hi(t))[0]._gsap;
			}
			function w(t, e, i) {
				return (i = t[e]) && o(i) ? t[e]() : (s(i) && t.getAttribute && t.getAttribute(e)) || i;
			}
			function y(t, e) {
				return (t = t.split(",")).forEach(e) || t;
			}
			function b(t) {
				return Math.round(1e5 * t) / 1e5 || 0;
			}
			function _(t) {
				return Math.round(1e7 * t) / 1e7 || 0;
			}
			function C(t, e) {
				for (var i = e.length, n = 0; t.indexOf(e[n]) < 0 && ++n < i; );
				return n < i;
			}
			function x() {
				var t,
					e,
					i = Ze.length,
					n = Ze.slice(0);
				for (Je = {}, t = Ze.length = 0; t < i; t++) (e = n[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
			}
			function k(t, e, i, n) {
				Ze.length && x(), t.render(e, i, n), Ze.length && x();
			}
			function T(t) {
				var e = parseFloat(t);
				return (e || 0 === e) && (t + "").match(Qe).length < 2 ? e : n(t) ? t.trim() : t;
			}
			function O(t) {
				return t;
			}
			function $(t, e) {
				for (var i in e) i in t || (t[i] = e[i]);
				return t;
			}
			function S(t, e) {
				for (var i in e) "__proto__" !== i && "constructor" !== i && "prototype" !== i && (t[i] = r(e[i]) ? S(t[i] || (t[i] = {}), e[i]) : e[i]);
				return t;
			}
			function P(t, e) {
				var i,
					n = {};
				for (i in t) i in e || (n[i] = t[i]);
				return n;
			}
			function I(t) {
				var e = t.parent || ae,
					i = t.keyframes
						? (function (t) {
								return function (e, i) {
									for (var n in i) n in e || ("duration" === n && t) || "ease" === n || (e[n] = i[n]);
								};
						  })(je(t.keyframes))
						: $;
				if (l(t.inherit)) for (; e; ) i(t, e.vars.defaults), (e = e.parent || e._dp);
				return t;
			}
			function D(t, e, i, n) {
				void 0 === i && (i = "_first"), void 0 === n && (n = "_last");
				var o = e._prev,
					a = e._next;
				o ? (o._next = a) : t[i] === e && (t[i] = a), a ? (a._prev = o) : t[n] === e && (t[n] = o), (e._next = e._prev = e.parent = null);
			}
			function z(t, e) {
				!t.parent || (e && !t.parent.autoRemoveChildren) || t.parent.remove(t), (t._act = 0);
			}
			function A(t, e) {
				if (t && (!e || e._end > t._dur || e._start < 0)) for (var i = t; i; ) (i._dirty = 1), (i = i.parent);
				return t;
			}
			function M(t) {
				return t._repeat ? ai(t._tTime, (t = t.duration() + t._rDelay)) * t : 0;
			}
			function E(t, e) {
				return (t - e._start) * e._ts + (0 <= e._ts ? 0 : e._dirty ? e.totalDuration() : e._tDur);
			}
			function R(t) {
				return (t._end = _(t._start + (t._tDur / Math.abs(t._ts || t._rts || Ae) || 0)));
			}
			function L(t, e) {
				var i = t._dp;
				return (
					i &&
						i.smoothChildTiming &&
						t._ts &&
						((t._start = _(i._time - (0 < t._ts ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts))), R(t), i._dirty || A(i, t)),
					t
				);
			}
			function F(t, e) {
				var i;
				if (
					((e._time || (e._initted && !e._dur)) && ((i = E(t.rawTime(), e)), (!e._dur || di(0, e.totalDuration(), i) - e._tTime > Ae) && e.render(i, !0)),
					A(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
				) {
					if (t._dur < t.duration()) for (i = t; i._dp; ) 0 <= i.rawTime() && i.totalTime(i._tTime), (i = i._dp);
					t._zTime = -Ae;
				}
			}
			function H(t, e, i, n) {
				return (
					e.parent && z(e),
					(e._start = _((a(i) ? i : i || t !== ae ? li(t, i, e) : t._time) + e._delay)),
					(e._end = _(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0))),
					(function (t, e, i, n, o) {
						void 0 === i && (i = "_first"), void 0 === n && (n = "_last");
						var a,
							s = t[n];
						if (o) for (a = e[o]; s && s[o] > a; ) s = s._prev;
						s ? ((e._next = s._next), (s._next = e)) : ((e._next = t[i]), (t[i] = e)),
							e._next ? (e._next._prev = e) : (t[n] = e),
							(e._prev = s),
							(e.parent = e._dp = t);
					})(t, e, "_first", "_last", t._sort ? "_start" : 0),
					si(e) || (t._recent = e),
					n || F(t, e),
					t
				);
			}
			function B(t, e) {
				return (Xe.ScrollTrigger || u("scrollTrigger", e)) && Xe.ScrollTrigger.create(e, t);
			}
			function j(t, e, i, n) {
				return (
					Di(t, e),
					t._initted
						? !i && t._pt && ((t._dur && !1 !== t.vars.lazy) || (!t._dur && t.vars.lazy)) && he !== wi.frame
							? (Ze.push(t), (t._lazy = [e, n]), 1)
							: void 0
						: 1
				);
			}
			function N(t, e, i, n) {
				var o = t._repeat,
					a = _(e) || 0,
					s = t._tTime / t._tDur;
				return (
					s && !n && (t._time *= a / t._dur),
					(t._dur = a),
					(t._tDur = o ? (o < 0 ? 1e10 : _(a * (o + 1) + t._rDelay * o)) : a),
					0 < s && !n ? L(t, (t._tTime = t._tDur * s)) : t.parent && R(t),
					i || A(t.parent, t),
					t
				);
			}
			function q(t) {
				return t instanceof Si ? A(t) : N(t, t._dur);
			}
			function V(t, e, i) {
				var n,
					o,
					s = a(e[1]),
					r = (s ? 2 : 1) + (t < 2 ? 0 : 1),
					d = e[r];
				if ((s && (d.duration = e[1]), (d.parent = i), t)) {
					for (n = d, o = i; o && !("immediateRender" in n); ) (n = o.vars.defaults || {}), (o = l(o.vars.inherit) && o.parent);
					(d.immediateRender = l(n.immediateRender)), t < 2 ? (d.runBackwards = 1) : (d.startAt = e[r - 1]);
				}
				return new Ei(e[0], d, e[1 + r]);
			}
			function W(t, e) {
				return t || 0 === t ? e(t) : e;
			}
			function U(t, e) {
				return n(t) && (e = Ye.exec(t)) ? t.substr(e.index + e[0].length) : "";
			}
			function Q(t, e) {
				return t && r(t) && "length" in t && ((!e && !t.length) || (t.length - 1 in t && r(t[0]))) && !t.nodeType && t !== se;
			}
			function Y(t) {
				return t.sort(function () {
					return 0.5 - Math.random();
				});
			}
			function X(t) {
				if (o(t)) return t;
				var e = r(t) ? t : { each: t },
					i = ki(e.ease),
					a = e.from || 0,
					s = parseFloat(e.base) || 0,
					l = {},
					d = 0 < a && a < 1,
					c = isNaN(a) || d,
					h = e.axis,
					u = a,
					p = a;
				return (
					n(a) ? (u = p = { center: 0.5, edges: 0.5, end: 1 }[a] || 0) : !d && c && ((u = a[0]), (p = a[1])),
					function (t, n, o) {
						var r,
							d,
							f,
							g,
							m,
							v,
							w,
							y,
							b,
							C = (o || e).length,
							x = l[C];
						if (!x) {
							if (!(b = "auto" === e.grid ? 0 : (e.grid || [1, ze])[1])) {
								for (w = -ze; w < (w = o[b++].getBoundingClientRect().left) && b < C; );
								b--;
							}
							for (
								x = l[C] = [], r = c ? Math.min(b, C) * u - 0.5 : a % b, d = b === ze ? 0 : c ? (C * p) / b - 0.5 : (a / b) | 0, y = ze, v = w = 0;
								v < C;
								v++
							)
								(f = (v % b) - r),
									(g = d - ((v / b) | 0)),
									(x[v] = m = h ? Math.abs("y" === h ? g : f) : Le(f * f + g * g)),
									w < m && (w = m),
									m < y && (y = m);
							"random" === a && Y(x),
								(x.max = w - y),
								(x.min = y),
								(x.v = C =
									(parseFloat(e.amount) || parseFloat(e.each) * (C < b ? C - 1 : h ? ("y" === h ? C / b : b) : Math.max(b, C / b)) || 0) *
									("edges" === a ? -1 : 1)),
								(x.b = C < 0 ? s - C : s),
								(x.u = U(e.amount || e.each) || 0),
								(i = i && C < 0 ? xi(i) : i);
						}
						return (C = (x[t] - x.min) / x.max || 0), _(x.b + (i ? i(C) : C) * x.v) + x.u;
					}
				);
			}
			function G(t) {
				var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
				return function (i) {
					var n = Math.round(parseFloat(i) / t) * t * e;
					return (n - (n % 1)) / e + (a(i) ? 0 : U(i));
				};
			}
			function Z(t, e) {
				var i,
					n,
					s = je(t);
				return (
					!s && r(t) && ((i = s = t.radius || ze), t.values ? ((t = hi(t.values)), (n = !a(t[0])) && (i *= i)) : (t = G(t.increment))),
					W(
						e,
						s
							? o(t)
								? function (e) {
										return (n = t(e)), Math.abs(n - e) <= i ? n : e;
								  }
								: function (e) {
										for (var o, s, r = parseFloat(n ? e.x : e), l = parseFloat(n ? e.y : 0), d = ze, c = 0, h = t.length; h--; )
											(o = n ? (o = t[h].x - r) * o + (s = t[h].y - l) * s : Math.abs(t[h] - r)) < d && ((d = o), (c = h));
										return (c = !i || d <= i ? t[c] : e), n || c === e || a(e) ? c : c + U(e);
								  }
							: G(t)
					)
				);
			}
			function J(t, e, i, n) {
				return W(je(t) ? !e : !0 === i ? !!(i = 0) : !n, function () {
					return je(t)
						? t[~~(Math.random() * t.length)]
						: (i = i || 1e-5) &&
								(n = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) &&
								Math.floor(Math.round((t - i / 2 + Math.random() * (e - t + 0.99 * i)) / i) * i * n) / n;
				});
			}
			function K(t, e, i) {
				return W(i, function (i) {
					return t[~~e(i)];
				});
			}
			function tt(t) {
				for (var e, i, n, o, a = 0, s = ""; ~(e = t.indexOf("random(", a)); )
					(n = t.indexOf(")", e)),
						(o = "[" === t.charAt(e + 7)),
						(i = t.substr(e + 7, n - e - 7).match(o ? Qe : Ne)),
						(s += t.substr(a, e - a) + J(o ? i : +i[0], o ? 0 : +i[1], +i[2] || 1e-5)),
						(a = n + 1);
				return s + t.substr(a, t.length - a);
			}
			function et(t, e, i) {
				var n,
					o,
					a,
					s = t.labels,
					r = ze;
				for (n in s) (o = s[n] - e) < 0 == !!i && o && r > (o = Math.abs(o)) && ((a = n), (r = o));
				return a;
			}
			function it(t) {
				return z(t), t.scrollTrigger && t.scrollTrigger.kill(!1), t.progress() < 1 && pi(t, "onInterrupt"), t;
			}
			function nt(t, e, i) {
				return ((6 * (t += t < 0 ? 1 : 1 < t ? -1 : 0) < 1 ? e + (i - e) * t * 6 : t < 0.5 ? i : 3 * t < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) * fi + 0.5) | 0;
			}
			function ot(t, e, i) {
				var n,
					o,
					s,
					r,
					l,
					d,
					c,
					h,
					u,
					p,
					f = t ? (a(t) ? [t >> 16, (t >> 8) & fi, t & fi] : 0) : gi.black;
				if (!f) {
					if (("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), gi[t])) f = gi[t];
					else if ("#" === t.charAt(0)) {
						if (
							(t.length < 6 &&
								(t = "#" + (n = t.charAt(1)) + n + (o = t.charAt(2)) + o + (s = t.charAt(3)) + s + (5 === t.length ? t.charAt(4) + t.charAt(4) : "")),
							9 === t.length)
						)
							return [(f = parseInt(t.substr(1, 6), 16)) >> 16, (f >> 8) & fi, f & fi, parseInt(t.substr(7), 16) / 255];
						f = [(t = parseInt(t.substr(1), 16)) >> 16, (t >> 8) & fi, t & fi];
					} else if ("hsl" === t.substr(0, 3))
						if (((f = p = t.match(Ne)), e)) {
							if (~t.indexOf("=")) return (f = t.match(qe)), i && f.length < 4 && (f[3] = 1), f;
						} else
							(r = (+f[0] % 360) / 360),
								(l = f[1] / 100),
								(n = 2 * (d = f[2] / 100) - (o = d <= 0.5 ? d * (l + 1) : d + l - d * l)),
								3 < f.length && (f[3] *= 1),
								(f[0] = nt(r + 1 / 3, n, o)),
								(f[1] = nt(r, n, o)),
								(f[2] = nt(r - 1 / 3, n, o));
					else f = t.match(Ne) || gi.transparent;
					f = f.map(Number);
				}
				return (
					e &&
						!p &&
						((n = f[0] / fi),
						(o = f[1] / fi),
						(s = f[2] / fi),
						(d = ((c = Math.max(n, o, s)) + (h = Math.min(n, o, s))) / 2),
						c === h
							? (r = l = 0)
							: ((u = c - h),
							  (l = 0.5 < d ? u / (2 - c - h) : u / (c + h)),
							  (r = c === n ? (o - s) / u + (o < s ? 6 : 0) : c === o ? (s - n) / u + 2 : (n - o) / u + 4),
							  (r *= 60)),
						(f[0] = ~~(r + 0.5)),
						(f[1] = ~~(100 * l + 0.5)),
						(f[2] = ~~(100 * d + 0.5))),
					i && f.length < 4 && (f[3] = 1),
					f
				);
			}
			function at(t) {
				var e = [],
					i = [],
					n = -1;
				return (
					t.split(mi).forEach(function (t) {
						var o = t.match(Ve) || [];
						e.push.apply(e, o), i.push((n += o.length + 1));
					}),
					(e.c = i),
					e
				);
			}
			function st(t, e, i) {
				var n,
					o,
					a,
					s,
					r = "",
					l = (t + r).match(mi),
					d = e ? "hsla(" : "rgba(",
					c = 0;
				if (!l) return t;
				if (
					((l = l.map(function (t) {
						return (t = ot(t, e, 1)) && d + (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) + ")";
					})),
					i && ((a = at(t)), (n = i.c).join(r) !== a.c.join(r)))
				)
					for (s = (o = t.replace(mi, "1").split(Ve)).length - 1; c < s; c++)
						r += o[c] + (~n.indexOf(c) ? l.shift() || d + "0,0,0,0)" : (a.length ? a : l.length ? l : i).shift());
				if (!o) for (s = (o = t.split(mi)).length - 1; c < s; c++) r += o[c] + l[c];
				return r + o[s];
			}
			function rt(t) {
				var e,
					i = t.join(" ");
				if (((mi.lastIndex = 0), mi.test(i))) return (e = vi.test(i)), (t[1] = st(t[1], e)), (t[0] = st(t[0], e, at(t[1]))), !0;
			}
			function lt(t) {
				var e = (t + "").split("("),
					i = bi[e[0]];
				return i && 1 < e.length && i.config
					? i.config.apply(
							null,
							~t.indexOf("{")
								? [
										(function (t) {
											for (var e, i, n, o = {}, a = t.substr(1, t.length - 3).split(":"), s = a[0], r = 1, l = a.length; r < l; r++)
												(i = a[r]),
													(e = r !== l - 1 ? i.lastIndexOf(",") : i.length),
													(n = i.substr(0, e)),
													(o[s] = isNaN(n) ? n.replace(Ci, "").trim() : +n),
													(s = i.substr(e + 1).trim());
											return o;
										})(e[1]),
								  ]
								: (function (t) {
										var e = t.indexOf("(") + 1,
											i = t.indexOf(")"),
											n = t.indexOf("(", e);
										return t.substring(e, ~n && n < i ? t.indexOf(")", i + 1) : i);
								  })(t)
										.split(",")
										.map(T)
					  )
					: bi._CE && _i.test(t)
					? bi._CE("", t)
					: i;
			}
			function dt(t, e) {
				for (var i, n = t._first; n; )
					n instanceof Si
						? dt(n, e)
						: !n.vars.yoyoEase ||
						  (n._yoyo && n._repeat) ||
						  n._yoyo === e ||
						  (n.timeline ? dt(n.timeline, e) : ((i = n._ease), (n._ease = n._yEase), (n._yEase = i), (n._yoyo = e))),
						(n = n._next);
			}
			function ct(t, e, i, n) {
				void 0 === i &&
					(i = function (t) {
						return 1 - e(1 - t);
					}),
					void 0 === n &&
						(n = function (t) {
							return t < 0.5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2;
						});
				var o,
					a = { easeIn: e, easeOut: i, easeInOut: n };
				return (
					y(t, function (t) {
						for (var e in ((bi[t] = Xe[t] = a), (bi[(o = t.toLowerCase())] = i), a))
							bi[o + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = bi[t + "." + e] = a[e];
					}),
					a
				);
			}
			function ht(t) {
				return function (e) {
					return e < 0.5 ? (1 - t(1 - 2 * e)) / 2 : 0.5 + t(2 * (e - 0.5)) / 2;
				};
			}
			function ut(t, e, i) {
				function n(t) {
					return 1 === t ? 1 : o * Math.pow(2, -10 * t) * He((t - s) * a) + 1;
				}
				var o = 1 <= e ? e : 1,
					a = (i || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1),
					s = (a / Me) * (Math.asin(1 / o) || 0),
					r =
						"out" === t
							? n
							: "in" === t
							? function (t) {
									return 1 - n(1 - t);
							  }
							: ht(n);
				return (
					(a = Me / a),
					(r.config = function (e, i) {
						return ut(t, e, i);
					}),
					r
				);
			}
			function pt(t, e) {
				function i(t) {
					return t ? --t * t * ((e + 1) * t + e) + 1 : 0;
				}
				void 0 === e && (e = 1.70158);
				var n =
					"out" === t
						? i
						: "in" === t
						? function (t) {
								return 1 - i(1 - t);
						  }
						: ht(i);
				return (
					(n.config = function (e) {
						return pt(t, e);
					}),
					n
				);
			}
			function ft(t) {
				var e,
					i,
					n,
					o,
					a = be() - ke,
					s = !0 === t;
				if (
					(_e < a && (xe += a - Ce),
					(0 < (e = (n = (ke += a) - xe) - Oe) || s) &&
						((o = ++ve.frame), (we = n - 1e3 * ve.time), (ve.time = n /= 1e3), (Oe += e + (Te <= e ? 4 : Te - e)), (i = 1)),
					s || (fe = ge(ft)),
					i)
				)
					for (ye = 0; ye < $e.length; ye++) $e[ye](n, we, o, t);
			}
			function gt(t) {
				return t < Pe
					? Se * t * t
					: t < 0.7272727272727273
					? Se * Math.pow(t - 1.5 / 2.75, 2) + 0.75
					: t < 0.9090909090909092
					? Se * (t -= 2.25 / 2.75) * t + 0.9375
					: Se * Math.pow(t - 2.625 / 2.75, 2) + 0.984375;
			}
			function mt(t) {
				(this.vars = t),
					(this._delay = +t.delay || 0),
					(this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && ((this._rDelay = t.repeatDelay || 0), (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
					(this._ts = 1),
					N(this, +t.duration, 1, 1),
					(this.data = t.data),
					pe || wi.wake();
			}
			function vt(t, e, i, a, s, l) {
				var d, c, h, u;
				if (
					Ke[t] &&
					!1 !==
						(d = new Ke[t]()).init(
							s,
							d.rawVars
								? e[t]
								: (function (t, e, i, a, s) {
										if ((o(t) && (t = zi(t, s, e, i, a)), !r(t) || (t.style && t.nodeType) || je(t) || Be(t))) return n(t) ? zi(t, s, e, i, a) : t;
										var l,
											d = {};
										for (l in t) d[l] = zi(t[l], s, e, i, a);
										return d;
								  })(e[t], a, s, l, i),
							i,
							a,
							l
						) &&
					((i._pt = c = new Qi(i._pt, s, t, 0, 1, d.render, d, 0, d.priority)), i !== ue)
				)
					for (h = i._ptLookup[i._targets.indexOf(s)], u = d._props.length; u--; ) h[d._props[u]] = c;
				return d;
			}
			function wt(t, e, i, n) {
				var o,
					a,
					s = e.ease || n || "power1.inOut";
				if (je(e))
					(a = i[t] || (i[t] = [])),
						e.forEach(function (t, i) {
							return a.push({ t: (i / (e.length - 1)) * 100, v: t, e: s });
						});
				else for (o in e) (a = i[o] || (i[o] = [])), "ease" === o || a.push({ t: parseFloat(t), v: e[o], e: s });
			}
			function yt(t, e, i) {
				return t.setAttribute(e, i);
			}
			function bt(t, e, i, n) {
				n.mSet(t, e, n.m.call(n.tween, i, n.mt), n);
			}
			function _t(t, e, i, n, o, a, s, r, l) {
				(this.t = e),
					(this.s = n),
					(this.c = o),
					(this.p = i),
					(this.r = a || Bi),
					(this.d = s || this),
					(this.set = r || Ri),
					(this.pr = l || 0),
					(this._next = t) && (t._prev = this);
			}
			function Ct(t, e) {
				for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; ) i = i._next;
				return i;
			}
			function xt(t, e) {
				return {
					name: t,
					rawVars: 1,
					init: function (t, i, o) {
						o._onInit = function (t) {
							var o, a;
							if (
								(n(i) &&
									((o = {}),
									y(i, function (t) {
										return (o[t] = 1);
									}),
									(i = o)),
								e)
							) {
								for (a in ((o = {}), i)) o[a] = e(i[a]);
								i = o;
							}
							!(function (t, e) {
								var i,
									n,
									o,
									a = t._targets;
								for (i in e)
									for (n = a.length; n--; ) (o = (o = t._ptLookup[n][i]) && o.d) && (o._pt && (o = Ct(o, i)), o && o.modifier && o.modifier(e[i], t, a[n], i));
							})(t, i);
						};
					},
				};
			}
			function kt(t, e) {
				return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e);
			}
			function Tt(t, e) {
				return e.set(e.t, e.p, 1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e);
			}
			function Ot(t, e) {
				return e.set(e.t, e.p, t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b, e);
			}
			function $t(t, e) {
				var i = e.s + e.c * t;
				e.set(e.t, e.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + e.u, e);
			}
			function St(t, e) {
				return e.set(e.t, e.p, t ? e.e : e.b, e);
			}
			function Pt(t, e) {
				return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
			}
			function It(t, e, i) {
				return (t.style[e] = i);
			}
			function Dt(t, e, i) {
				return t.style.setProperty(e, i);
			}
			function zt(t, e, i) {
				return (t._gsap[e] = i);
			}
			function At(t, e, i) {
				return (t._gsap.scaleX = t._gsap.scaleY = i);
			}
			function Mt(t, e, i, n, o) {
				var a = t._gsap;
				(a.scaleX = a.scaleY = i), a.renderTransform(o, a);
			}
			function Et(t, e, i, n, o) {
				var a = t._gsap;
				(a[e] = i), a.renderTransform(o, a);
			}
			function Rt(t, e) {
				var i = Zi.createElementNS ? Zi.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : Zi.createElement(t);
				return i.style ? i : Zi.createElement(t);
			}
			function Lt(t, e, i) {
				var n = getComputedStyle(t);
				return n[e] || n.getPropertyValue(e.replace(On, "-$1").toLowerCase()) || n.getPropertyValue(e) || (!i && Lt(t, An(e) || e, 1)) || "";
			}
			function Ft() {
				"undefined" != typeof window &&
					window.document &&
					((Gi = window),
					(Zi = Gi.document),
					(Ji = Zi.documentElement),
					(tn = Rt("div") || { style: {} }),
					Rt("div"),
					(In = An(In)),
					(Dn = In + "Origin"),
					(tn.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"),
					(nn = !!An("perspective")),
					(Ki = 1));
			}
			function Ht(t) {
				var e,
					i = Rt("svg", (this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns")) || "http://www.w3.org/2000/svg"),
					n = this.parentNode,
					o = this.nextSibling,
					a = this.style.cssText;
				if ((Ji.appendChild(i), i.appendChild(this), (this.style.display = "block"), t))
					try {
						(e = this.getBBox()), (this._gsapBBox = this.getBBox), (this.getBBox = Ht);
					} catch (t) {}
				else this._gsapBBox && (e = this._gsapBBox());
				return n && (o ? n.insertBefore(this, o) : n.appendChild(this)), Ji.removeChild(i), (this.style.cssText = a), e;
			}
			function Bt(t, e) {
				for (var i = e.length; i--; ) if (t.hasAttribute(e[i])) return t.getAttribute(e[i]);
			}
			function jt(t) {
				var e;
				try {
					e = t.getBBox();
				} catch (i) {
					e = Ht.call(t, !0);
				}
				return (
					(e && (e.width || e.height)) || t.getBBox === Ht || (e = Ht.call(t, !0)),
					!e || e.width || e.x || e.y ? e : { x: +Bt(t, ["x", "cx", "x1"]) || 0, y: +Bt(t, ["y", "cy", "y1"]) || 0, width: 0, height: 0 }
				);
			}
			function Nt(t) {
				return !(!t.getCTM || (t.parentNode && !t.ownerSVGElement) || !jt(t));
			}
			function qt(t, e) {
				if (e) {
					var i = t.style;
					e in Cn && e !== Dn && (e = In),
						i.removeProperty
							? (("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6)) || (e = "-" + e), i.removeProperty(e.replace(On, "-$1").toLowerCase()))
							: i.removeAttribute(e);
				}
			}
			function Vt(t, e, i, n, o, a) {
				var s = new Qi(t._pt, e, i, 0, 1, a ? Pt : St);
				return ((t._pt = s).b = n), (s.e = o), t._props.push(i), s;
			}
			function Wt(t, e, i, n) {
				var o,
					a,
					s,
					r,
					l = parseFloat(i) || 0,
					d = (i + "").trim().substr((l + "").length) || "px",
					c = tn.style,
					h = $n.test(e),
					u = "svg" === t.tagName.toLowerCase(),
					p = (u ? "client" : "offset") + (h ? "Width" : "Height"),
					f = "px" === n,
					g = "%" === n;
				return n === d || !l || Mn[n] || Mn[d]
					? l
					: ("px" === d || f || (l = Wt(t, e, i, "px")),
					  (r = t.getCTM && Nt(t)),
					  (!g && "%" !== d) || (!Cn[e] && !~e.indexOf("adius"))
							? ((c[h ? "width" : "height"] = 100 + (f ? d : n)),
							  (a = ~e.indexOf("adius") || ("em" === n && t.appendChild && !u) ? t : t.parentNode),
							  r && (a = (t.ownerSVGElement || {}).parentNode),
							  (a && a !== Zi && a.appendChild) || (a = Zi.body),
							  (s = a._gsap) && g && s.width && h && s.time === wi.time
									? b((l / s.width) * 100)
									: ((!g && "%" !== d) || (c.position = Lt(t, "position")),
									  a === t && (c.position = "static"),
									  a.appendChild(tn),
									  (o = tn[p]),
									  a.removeChild(tn),
									  (c.position = "absolute"),
									  h && g && (((s = v(a)).time = wi.time), (s.width = a[p])),
									  b(f ? (o * l) / 100 : o && l ? (100 / o) * l : 0)))
							: ((o = r ? t.getBBox()[h ? "width" : "height"] : t[p]), b(g ? (l / o) * 100 : (l / 100) * o)));
			}
			function Ut(t, e, i, n) {
				var o;
				return (
					Ki || Ft(),
					e in Pn && "transform" !== e && ~(e = Pn[e]).indexOf(",") && (e = e.split(",")[0]),
					Cn[e] && "transform" !== e
						? ((o = Hn(t, n)), (o = "transformOrigin" !== e ? o[e] : o.svg ? o.origin : Bn(Lt(t, Dn)) + " " + o.zOrigin + "px"))
						: ((o = t.style[e]) && "auto" !== o && !n && !~(o + "").indexOf("calc(")) ||
						  (o = (Rn[e] && Rn[e](t, e, i)) || Lt(t, e) || w(t, e) || ("opacity" === e ? 1 : 0)),
					i && !~(o + "").trim().indexOf(" ") ? Wt(t, e, o, i) + i : o
				);
			}
			function Qt(t, e, i, n) {
				if (!i || "none" === i) {
					var o = An(e, t, 1),
						a = o && Lt(t, o, 1);
					a && a !== i ? ((e = o), (i = a)) : "borderColor" === e && (i = Lt(t, "borderTopColor"));
				}
				var s,
					r,
					l,
					d,
					c,
					h,
					u,
					p,
					f,
					g,
					m,
					v,
					w = new Qi(this._pt, t.style, e, 0, 1, Ni),
					y = 0,
					b = 0;
				if (
					((w.b = i),
					(w.e = n),
					(i += ""),
					"auto" == (n += "") && ((t.style[e] = n), (n = Lt(t, e) || n), (t.style[e] = i)),
					rt((s = [i, n])),
					(n = s[1]),
					(l = (i = s[0]).match(Ve) || []),
					(n.match(Ve) || []).length)
				) {
					for (; (r = Ve.exec(n)); )
						(u = r[0]),
							(f = n.substring(y, r.index)),
							c ? (c = (c + 1) % 5) : ("rgba(" !== f.substr(-5) && "hsla(" !== f.substr(-5)) || (c = 1),
							u !== (h = l[b++] || "") &&
								((d = parseFloat(h) || 0),
								(m = h.substr((d + "").length)),
								(v = "=" === u.charAt(1) ? +(u.charAt(0) + "1") : 0) && (u = u.substr(2)),
								(p = parseFloat(u)),
								(g = u.substr((p + "").length)),
								(y = Ve.lastIndex - g.length),
								g || ((g = g || Ie.units[e] || m), y === n.length && ((n += g), (w.e += g))),
								m !== g && (d = Wt(t, e, h, g) || 0),
								(w._pt = { _next: w._pt, p: f || 1 === b ? f : ",", s: d, c: v ? v * p : p - d, m: (c && c < 4) || "zIndex" === e ? Math.round : 0 }));
					w.c = y < n.length ? n.substring(y, n.length) : "";
				} else w.r = "display" === e && "none" === n ? Pt : St;
				return Ue.test(n) && (w.e = 0), (this._pt = w);
			}
			function Yt(t) {
				var e = t.split(" "),
					i = e[0],
					n = e[1] || "50%";
				return (
					("top" !== i && "bottom" !== i && "left" !== n && "right" !== n) || ((t = i), (i = n), (n = t)), (e[0] = En[i] || i), (e[1] = En[n] || n), e.join(" ")
				);
			}
			function Xt(t, e) {
				if (e.tween && e.tween._time === e.tween._dur) {
					var i,
						n,
						o,
						a = e.t,
						s = a.style,
						r = e.u,
						l = a._gsap;
					if ("all" === r || !0 === r) (s.cssText = ""), (n = 1);
					else for (o = (r = r.split(",")).length; -1 < --o; ) (i = r[o]), Cn[i] && ((n = 1), (i = "transformOrigin" === i ? Dn : In)), qt(a, i);
					n && (qt(a, In), l && (l.svg && a.removeAttribute("transform"), Hn(a, 1), (l.uncache = 1)));
				}
			}
			function Gt(t) {
				return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
			}
			function Zt(t) {
				var e = Lt(t, In);
				return Gt(e) ? Ln : e.substr(7).match(qe).map(b);
			}
			function Jt(t, e) {
				var i,
					n,
					o,
					a,
					s = t._gsap || v(t),
					r = t.style,
					l = Zt(t);
				return s.svg && t.getAttribute("transform")
					? "1,0,0,1,0,0" === (l = [(o = t.transform.baseVal.consolidate().matrix).a, o.b, o.c, o.d, o.e, o.f]).join(",")
						? Ln
						: l
					: (l !== Ln ||
							t.offsetParent ||
							t === Ji ||
							s.svg ||
							((o = r.display),
							(r.display = "block"),
							((i = t.parentNode) && t.offsetParent) || ((a = 1), (n = t.nextSibling), Ji.appendChild(t)),
							(l = Zt(t)),
							o ? (r.display = o) : qt(t, "display"),
							a && (n ? i.insertBefore(t, n) : i ? i.appendChild(t) : Ji.removeChild(t))),
					  e && 6 < l.length ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l);
			}
			function Kt(t, e, i, n, o, a) {
				var s,
					r,
					l,
					d = t._gsap,
					c = o || Jt(t, !0),
					h = d.xOrigin || 0,
					u = d.yOrigin || 0,
					p = d.xOffset || 0,
					f = d.yOffset || 0,
					g = c[0],
					m = c[1],
					v = c[2],
					w = c[3],
					y = c[4],
					b = c[5],
					_ = e.split(" "),
					C = parseFloat(_[0]) || 0,
					x = parseFloat(_[1]) || 0;
				i
					? c !== Ln &&
					  (r = g * w - m * v) &&
					  ((l = C * (-m / r) + x * (g / r) - (g * b - m * y) / r), (C = C * (w / r) + x * (-v / r) + (v * b - w * y) / r), (x = l))
					: ((C = (s = jt(t)).x + (~_[0].indexOf("%") ? (C / 100) * s.width : C)), (x = s.y + (~(_[1] || _[0]).indexOf("%") ? (x / 100) * s.height : x))),
					n || (!1 !== n && d.smooth)
						? ((y = C - h), (b = x - u), (d.xOffset = p + (y * g + b * v) - y), (d.yOffset = f + (y * m + b * w) - b))
						: (d.xOffset = d.yOffset = 0),
					(d.xOrigin = C),
					(d.yOrigin = x),
					(d.smooth = !!n),
					(d.origin = e),
					(d.originIsAbsolute = !!i),
					(t.style[Dn] = "0px 0px"),
					a && (Vt(a, d, "xOrigin", h, C), Vt(a, d, "yOrigin", u, x), Vt(a, d, "xOffset", p, d.xOffset), Vt(a, d, "yOffset", f, d.yOffset)),
					t.setAttribute("data-svg-origin", C + " " + x);
			}
			function te(t, e, i) {
				var n = U(e);
				return b(parseFloat(e) + parseFloat(Wt(t, "x", i + "px", n))) + n;
			}
			function ee(t, e, i, o, a, s) {
				var r,
					l,
					d = 360,
					c = n(a),
					h = parseFloat(a) * (c && ~a.indexOf("rad") ? xn : 1),
					u = s ? h * s : h - o,
					p = o + u + "deg";
				return (
					c &&
						("short" === (r = a.split("_")[1]) && (u %= d) != u % 180 && (u += u < 0 ? d : -d),
						"cw" === r && u < 0 ? (u = ((u + 36e9) % d) - ~~(u / d) * d) : "ccw" === r && 0 < u && (u = ((u - 36e9) % d) - ~~(u / d) * d)),
					(t._pt = l = new Qi(t._pt, e, i, o, u, Tt)),
					(l.e = p),
					(l.u = "deg"),
					t._props.push(i),
					l
				);
			}
			function ie(t, e) {
				for (var i in e) t[i] = e[i];
				return t;
			}
			function ne(t, e, i) {
				var n,
					o,
					a,
					s,
					r,
					l,
					d,
					c = ie({}, i._gsap),
					h = i.style;
				for (o in (c.svg
					? ((a = i.getAttribute("transform")), i.setAttribute("transform", ""), (h[In] = e), (n = Hn(i, 1)), qt(i, In), i.setAttribute("transform", a))
					: ((a = getComputedStyle(i)[In]), (h[In] = e), (n = Hn(i, 1)), (h[In] = a)),
				Cn))
					(a = c[o]) !== (s = n[o]) &&
						"perspective,force3D,transformOrigin,svgOrigin".indexOf(o) < 0 &&
						((r = U(a) !== (d = U(s)) ? Wt(i, o, a, d) : parseFloat(a)),
						(l = parseFloat(s)),
						(t._pt = new Qi(t._pt, n, o, r, l - r, kt)),
						(t._pt.u = d || 0),
						t._props.push(o));
				ie(n, c);
			}
			var oe,
				ae,
				se,
				re,
				le,
				de,
				ce,
				he,
				ue,
				pe,
				fe,
				ge,
				me,
				ve,
				we,
				ye,
				be,
				_e,
				Ce,
				xe,
				ke,
				Te,
				Oe,
				$e,
				Se,
				Pe,
				Ie = { autoSleep: 120, force3D: "auto", nullTargetWarn: 1, units: { lineHeight: "" } },
				De = { duration: 0.5, overwrite: !1, delay: 0 },
				ze = 1e8,
				Ae = 1 / ze,
				Me = 2 * Math.PI,
				Ee = Me / 4,
				Re = 0,
				Le = Math.sqrt,
				Fe = Math.cos,
				He = Math.sin,
				Be = ("function" == typeof ArrayBuffer && ArrayBuffer.isView) || function () {},
				je = Array.isArray,
				Ne = /(?:-?\.?\d|\.)+/gi,
				qe = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
				Ve = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
				We = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
				Ue = /[+-]=-?[.\d]+/,
				Qe = /[^,'"\[\]\s]+/gi,
				Ye = /[\d.+\-=]+(?:e[-+]\d*)*/i,
				Xe = {},
				Ge = {},
				Ze = [],
				Je = {},
				Ke = {},
				ti = {},
				ei = 30,
				ii = [],
				ni = "",
				oi = function (t, e) {
					for (var i in e) t[i] = e[i];
					return t;
				},
				ai = function (t, e) {
					var i = Math.floor((t /= e));
					return t && i === t ? i - 1 : i;
				},
				si = function (t) {
					var e = t.data;
					return "isFromStart" === e || "isStart" === e;
				},
				ri = { _start: 0, endTime: g, totalDuration: g },
				li = function t(e, i, o) {
					var a,
						s,
						r,
						l = e.labels,
						d = e._recent || ri,
						c = e.duration() >= ze ? d.endTime(!1) : e._dur;
					return n(i) && (isNaN(i) || i in l)
						? ((s = i.charAt(0)),
						  (r = "%" === i.substr(-1)),
						  (a = i.indexOf("=")),
						  "<" === s || ">" === s
								? (0 <= a && (i = i.replace(/=/, "")),
								  ("<" === s ? d._start : d.endTime(0 <= d._repeat)) + (parseFloat(i.substr(1)) || 0) * (r ? (a < 0 ? d : o).totalDuration() / 100 : 1))
								: a < 0
								? (i in l || (l[i] = c), l[i])
								: ((s = parseFloat(i.charAt(a - 1) + i.substr(a + 1))),
								  r && o && (s = (s / 100) * (je(o) ? o[0] : o).totalDuration()),
								  1 < a ? t(e, i.substr(0, a - 1), o) + s : c + s))
						: null == i
						? c
						: +i;
				},
				di = function (t, e, i) {
					return i < t ? t : e < i ? e : i;
				},
				ci = [].slice,
				hi = function (t, e, i) {
					return !n(t) || i || (!re && yi())
						? je(t)
							? (function (t, e, i) {
									return (
										void 0 === i && (i = []),
										t.forEach(function (t) {
											return (n(t) && !e) || Q(t, 1) ? i.push.apply(i, hi(t)) : i.push(t);
										}) || i
									);
							  })(t, i)
							: Q(t)
							? ci.call(t, 0)
							: t
							? [t]
							: []
						: ci.call((e || le).querySelectorAll(t), 0);
				},
				ui = function (t, e, i, n, o) {
					var a = e - t,
						s = n - i;
					return W(o, function (e) {
						return i + (((e - t) / a) * s || 0);
					});
				},
				pi = function (t, e, i) {
					var n,
						o,
						a = t.vars,
						s = a[e];
					if (s) return (n = a[e + "Params"]), (o = a.callbackScope || t), i && Ze.length && x(), n ? s.apply(o, n) : s.call(o);
				},
				fi = 255,
				gi = {
					aqua: [0, fi, fi],
					lime: [0, fi, 0],
					silver: [192, 192, 192],
					black: [0, 0, 0],
					maroon: [128, 0, 0],
					teal: [0, 128, 128],
					blue: [0, 0, fi],
					navy: [0, 0, 128],
					white: [fi, fi, fi],
					olive: [128, 128, 0],
					yellow: [fi, fi, 0],
					orange: [fi, 165, 0],
					gray: [128, 128, 128],
					purple: [128, 0, 128],
					green: [0, 128, 0],
					red: [fi, 0, 0],
					pink: [fi, 192, 203],
					cyan: [0, fi, fi],
					transparent: [fi, fi, fi, 0],
				},
				mi = (function () {
					var t,
						e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
					for (t in gi) e += "|" + t + "\\b";
					return new RegExp(e + ")", "gi");
				})(),
				vi = /hsl[a]?\(/,
				wi =
					((be = Date.now),
					(_e = 500),
					(Ce = 33),
					(xe = be()),
					(ke = xe),
					(Oe = Te = 1e3 / 240),
					(ve = {
						time: 0,
						frame: 0,
						tick: function () {
							ft(!0);
						},
						deltaRatio: function (t) {
							return we / (1e3 / (t || 60));
						},
						wake: function () {
							ce &&
								(!re &&
									d() &&
									((se = re = window),
									(le = se.document || {}),
									(Xe.gsap = Xi),
									(se.gsapVersions || (se.gsapVersions = [])).push(Xi.version),
									h(de || se.GreenSockGlobals || (!se.gsap && se) || {}),
									(me = se.requestAnimationFrame)),
								fe && ve.sleep(),
								(ge =
									me ||
									function (t) {
										return setTimeout(t, (Oe - 1e3 * ve.time + 1) | 0);
									}),
								(pe = 1),
								ft(2));
						},
						sleep: function () {
							(me ? se.cancelAnimationFrame : clearTimeout)(fe), (pe = 0), (ge = g);
						},
						lagSmoothing: function (t, e) {
							(_e = t || 1e8), (Ce = Math.min(e, _e, 0));
						},
						fps: function (t) {
							(Te = 1e3 / (t || 240)), (Oe = 1e3 * ve.time + Te);
						},
						add: function (t) {
							$e.indexOf(t) < 0 && $e.push(t), yi();
						},
						remove: function (t, e) {
							~(e = $e.indexOf(t)) && $e.splice(e, 1) && e <= ye && ye--;
						},
						_listeners: ($e = []),
					})),
				yi = function () {
					return !pe && wi.wake();
				},
				bi = {},
				_i = /^[\d.\-M][\d.\-,\s]/,
				Ci = /["']/g,
				xi = function (t) {
					return function (e) {
						return 1 - t(1 - e);
					};
				},
				ki = function (t, e) {
					return (t && (o(t) ? t : bi[t] || lt(t))) || e;
				};
			y("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
				var i = e < 5 ? e + 1 : e;
				ct(
					t + ",Power" + (i - 1),
					e
						? function (t) {
								return Math.pow(t, i);
						  }
						: function (t) {
								return t;
						  },
					function (t) {
						return 1 - Math.pow(1 - t, i);
					},
					function (t) {
						return t < 0.5 ? Math.pow(2 * t, i) / 2 : 1 - Math.pow(2 * (1 - t), i) / 2;
					}
				);
			}),
				(bi.Linear.easeNone = bi.none = bi.Linear.easeIn),
				ct("Elastic", ut("in"), ut("out"), ut()),
				(Se = 7.5625),
				(Pe = 1 / 2.75),
				ct(
					"Bounce",
					function (t) {
						return 1 - gt(1 - t);
					},
					gt
				),
				ct("Expo", function (t) {
					return t ? Math.pow(2, 10 * (t - 1)) : 0;
				}),
				ct("Circ", function (t) {
					return -(Le(1 - t * t) - 1);
				}),
				ct("Sine", function (t) {
					return 1 === t ? 1 : 1 - Fe(t * Ee);
				}),
				ct("Back", pt("in"), pt("out"), pt()),
				(bi.SteppedEase =
					bi.steps =
					Xe.SteppedEase =
						{
							config: function (t, e) {
								void 0 === t && (t = 1);
								var i = 1 / t,
									n = t + (e ? 0 : 1),
									o = e ? 1 : 0;
								return function (t) {
									return (((n * di(0, 0.99999999, t)) | 0) + o) * i;
								};
							},
						}),
				(De.ease = bi["quad.out"]),
				y("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (t) {
					return (ni += t + "," + t + "Params,");
				});
			var Ti,
				Oi = function (t, e) {
					(this.id = Re++), ((t._gsap = this).target = t), (this.harness = e), (this.get = e ? e.get : w), (this.set = e ? e.getSetter : Hi);
				},
				$i =
					(((Ti = mt.prototype).delay = function (t) {
						return t || 0 === t
							? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + t - this._delay), (this._delay = t), this)
							: this._delay;
					}),
					(Ti.duration = function (t) {
						return arguments.length ? this.totalDuration(0 < this._repeat ? t + (t + this._rDelay) * this._repeat : t) : this.totalDuration() && this._dur;
					}),
					(Ti.totalDuration = function (t) {
						return arguments.length ? ((this._dirty = 0), N(this, this._repeat < 0 ? t : (t - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
					}),
					(Ti.totalTime = function (t, e) {
						if ((yi(), !arguments.length)) return this._tTime;
						var i = this._dp;
						if (i && i.smoothChildTiming && this._ts) {
							for (L(this, t), !i._dp || i.parent || F(i, this); i && i.parent; )
								i.parent._time !== i._start + (0 <= i._ts ? i._tTime / i._ts : (i.totalDuration() - i._tTime) / -i._ts) && i.totalTime(i._tTime, !0),
									(i = i.parent);
							!this.parent &&
								this._dp.autoRemoveChildren &&
								((0 < this._ts && t < this._tDur) || (this._ts < 0 && 0 < t) || (!this._tDur && !t)) &&
								H(this._dp, this, this._start - this._delay);
						}
						return (
							(this._tTime !== t ||
								(!this._dur && !e) ||
								(this._initted && Math.abs(this._zTime) === Ae) ||
								(!t && !this._initted && (this.add || this._ptLookup))) &&
								(this._ts || (this._pTime = t), k(this, t, e)),
							this
						);
					}),
					(Ti.time = function (t, e) {
						return arguments.length
							? this.totalTime(Math.min(this.totalDuration(), t + M(this)) % (this._dur + this._rDelay) || (t ? this._dur : 0), e)
							: this._time;
					}),
					(Ti.totalProgress = function (t, e) {
						return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
					}),
					(Ti.progress = function (t, e) {
						return arguments.length
							? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? t : 1 - t) + M(this), e)
							: this.duration()
							? Math.min(1, this._time / this._dur)
							: this.ratio;
					}),
					(Ti.iteration = function (t, e) {
						var i = this.duration() + this._rDelay;
						return arguments.length ? this.totalTime(this._time + (t - 1) * i, e) : this._repeat ? ai(this._tTime, i) + 1 : 1;
					}),
					(Ti.timeScale = function (t) {
						if (!arguments.length) return this._rts === -Ae ? 0 : this._rts;
						if (this._rts === t) return this;
						var e = this.parent && this._ts ? E(this.parent._time, this) : this._tTime;
						return (
							(this._rts = +t || 0),
							(this._ts = this._ps || t === -Ae ? 0 : this._rts),
							(function (t) {
								for (var e = t.parent; e && e.parent; ) (e._dirty = 1), e.totalDuration(), (e = e.parent);
							})(this.totalTime(di(-this._delay, this._tDur, e), !0)),
							R(this),
							this
						);
					}),
					(Ti.paused = function (t) {
						return arguments.length
							? (this._ps !== t &&
									((this._ps = t)
										? ((this._pTime = this._tTime || Math.max(-this._delay, this.rawTime())), (this._ts = this._act = 0))
										: (yi(),
										  (this._ts = this._rts),
										  this.totalTime(
												this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime,
												1 === this.progress() && Math.abs(this._zTime) !== Ae && (this._tTime -= Ae)
										  ))),
							  this)
							: this._ps;
					}),
					(Ti.startTime = function (t) {
						if (arguments.length) {
							this._start = t;
							var e = this.parent || this._dp;
							return !e || (!e._sort && this.parent) || H(e, this, t - this._delay), this;
						}
						return this._start;
					}),
					(Ti.endTime = function (t) {
						return this._start + (l(t) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
					}),
					(Ti.rawTime = function (t) {
						var e = this.parent || this._dp;
						return e
							? t && (!this._ts || (this._repeat && this._time && this.totalProgress() < 1))
								? this._tTime % (this._dur + this._rDelay)
								: this._ts
								? E(e.rawTime(t), this)
								: this._tTime
							: this._tTime;
					}),
					(Ti.globalTime = function (t) {
						for (var e = this, i = arguments.length ? t : e.rawTime(); e; ) (i = e._start + i / (e._ts || 1)), (e = e._dp);
						return i;
					}),
					(Ti.repeat = function (t) {
						return arguments.length ? ((this._repeat = t === 1 / 0 ? -2 : t), q(this)) : -2 === this._repeat ? 1 / 0 : this._repeat;
					}),
					(Ti.repeatDelay = function (t) {
						if (arguments.length) {
							var e = this._time;
							return (this._rDelay = t), q(this), e ? this.time(e) : this;
						}
						return this._rDelay;
					}),
					(Ti.yoyo = function (t) {
						return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
					}),
					(Ti.seek = function (t, e) {
						return this.totalTime(li(this, t), l(e));
					}),
					(Ti.restart = function (t, e) {
						return this.play().totalTime(t ? -this._delay : 0, l(e));
					}),
					(Ti.play = function (t, e) {
						return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
					}),
					(Ti.reverse = function (t, e) {
						return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1);
					}),
					(Ti.pause = function (t, e) {
						return null != t && this.seek(t, e), this.paused(!0);
					}),
					(Ti.resume = function () {
						return this.paused(!1);
					}),
					(Ti.reversed = function (t) {
						return arguments.length ? (!!t !== this.reversed() && this.timeScale(-this._rts || (t ? -Ae : 0)), this) : this._rts < 0;
					}),
					(Ti.invalidate = function () {
						return (this._initted = this._act = 0), (this._zTime = -Ae), this;
					}),
					(Ti.isActive = function () {
						var t,
							e = this.parent || this._dp,
							i = this._start;
						return !(e && !(this._ts && this._initted && e.isActive() && (t = e.rawTime(!0)) >= i && t < this.endTime(!0) - Ae));
					}),
					(Ti.eventCallback = function (t, e, i) {
						var n = this.vars;
						return 1 < arguments.length ? (e ? ((n[t] = e), i && (n[t + "Params"] = i), "onUpdate" === t && (this._onUpdate = e)) : delete n[t], this) : n[t];
					}),
					(Ti.then = function (t) {
						var e = this;
						return new Promise(function (i) {
							function n() {
								var t = e.then;
								(e.then = null), o(a) && (a = a(e)) && (a.then || a === e) && (e.then = t), i(a), (e.then = t);
							}
							var a = o(t) ? t : O;
							(e._initted && 1 === e.totalProgress() && 0 <= e._ts) || (!e._tTime && e._ts < 0) ? n() : (e._prom = n);
						});
					}),
					(Ti.kill = function () {
						it(this);
					}),
					mt);
			$($i.prototype, {
				_time: 0,
				_start: 0,
				_end: 0,
				_tTime: 0,
				_tDur: 0,
				_dirty: 0,
				_repeat: 0,
				_yoyo: !1,
				parent: null,
				_initted: !1,
				_rDelay: 0,
				_ts: 1,
				_dp: 0,
				ratio: 0,
				_zTime: -Ae,
				_prom: 0,
				_ps: !1,
				_rts: 1,
			});
			var Si = (function (t) {
				function s(e, n) {
					var o;
					return (
						void 0 === e && (e = {}),
						((o = t.call(this, e) || this).labels = {}),
						(o.smoothChildTiming = !!e.smoothChildTiming),
						(o.autoRemoveChildren = !!e.autoRemoveChildren),
						(o._sort = l(e.sortChildren)),
						ae && H(e.parent || ae, i(o), n),
						e.reversed && o.reverse(),
						e.paused && o.paused(!0),
						e.scrollTrigger && B(i(o), e.scrollTrigger),
						o
					);
				}
				e(s, t);
				var r = s.prototype;
				return (
					(r.to = function (t, e, i) {
						return V(0, arguments, this), this;
					}),
					(r.from = function (t, e, i) {
						return V(1, arguments, this), this;
					}),
					(r.fromTo = function (t, e, i, n) {
						return V(2, arguments, this), this;
					}),
					(r.set = function (t, e, i) {
						return (
							(e.duration = 0),
							(e.parent = this),
							I(e).repeatDelay || (e.repeat = 0),
							(e.immediateRender = !!e.immediateRender),
							new Ei(t, e, li(this, i), 1),
							this
						);
					}),
					(r.call = function (t, e, i) {
						return H(this, Ei.delayedCall(0, t, e), i);
					}),
					(r.staggerTo = function (t, e, i, n, o, a, s) {
						return (
							(i.duration = e), (i.stagger = i.stagger || n), (i.onComplete = a), (i.onCompleteParams = s), (i.parent = this), new Ei(t, i, li(this, o)), this
						);
					}),
					(r.staggerFrom = function (t, e, i, n, o, a, s) {
						return (i.runBackwards = 1), (I(i).immediateRender = l(i.immediateRender)), this.staggerTo(t, e, i, n, o, a, s);
					}),
					(r.staggerFromTo = function (t, e, i, n, o, a, s, r) {
						return (n.startAt = i), (I(n).immediateRender = l(n.immediateRender)), this.staggerTo(t, e, n, o, a, s, r);
					}),
					(r.render = function (t, e, i) {
						var n,
							o,
							a,
							s,
							r,
							l,
							d,
							c,
							h,
							u,
							p,
							f,
							g = this._time,
							m = this._dirty ? this.totalDuration() : this._tDur,
							v = this._dur,
							w = t <= 0 ? 0 : _(t),
							y = this._zTime < 0 != t < 0 && (this._initted || !v);
						if ((this !== ae && m < w && 0 <= t && (w = m), w !== this._tTime || i || y)) {
							if (
								(g !== this._time && v && ((w += this._time - g), (t += this._time - g)),
								(n = w),
								(h = this._start),
								(l = !(c = this._ts)),
								y && (v || (g = this._zTime), (!t && e) || (this._zTime = t)),
								this._repeat)
							) {
								if (((p = this._yoyo), (r = v + this._rDelay), this._repeat < -1 && t < 0)) return this.totalTime(100 * r + t, e, i);
								if (
									((n = _(w % r)),
									w === m ? ((s = this._repeat), (n = v)) : ((s = ~~(w / r)) && s === w / r && ((n = v), s--), v < n && (n = v)),
									(u = ai(this._tTime, r)),
									!g && this._tTime && u !== s && (u = s),
									p && 1 & s && ((n = v - n), (f = 1)),
									s !== u && !this._lock)
								) {
									var b = p && 1 & u,
										C = b === (p && 1 & s);
									if (
										(s < u && (b = !b),
										(g = b ? 0 : v),
										(this._lock = 1),
										(this.render(g || (f ? 0 : _(s * r)), e, !v)._lock = 0),
										(this._tTime = w),
										!e && this.parent && pi(this, "onRepeat"),
										this.vars.repeatRefresh && !f && (this.invalidate()._lock = 1),
										(g && g !== this._time) || l != !this._ts || (this.vars.onRepeat && !this.parent && !this._act))
									)
										return this;
									if (
										((v = this._dur),
										(m = this._tDur),
										C && ((this._lock = 2), (g = b ? v : -1e-4), this.render(g, !0), this.vars.repeatRefresh && !f && this.invalidate()),
										(this._lock = 0),
										!this._ts && !l)
									)
										return this;
									dt(this, f);
								}
							}
							if (
								(this._hasPause &&
									!this._forcing &&
									this._lock < 2 &&
									(d = (function (t, e, i) {
										var n;
										if (e < i)
											for (n = t._first; n && n._start <= i; ) {
												if ("isPause" === n.data && n._start > e) return n;
												n = n._next;
											}
										else
											for (n = t._last; n && n._start >= i; ) {
												if ("isPause" === n.data && n._start < e) return n;
												n = n._prev;
											}
									})(this, _(g), _(n))) &&
									(w -= n - (n = d._start)),
								(this._tTime = w),
								(this._time = n),
								(this._act = !c),
								this._initted || ((this._onUpdate = this.vars.onUpdate), (this._initted = 1), (this._zTime = t), (g = 0)),
								!g && n && !e && (pi(this, "onStart"), this._tTime !== w))
							)
								return this;
							if (g <= n && 0 <= t)
								for (o = this._first; o; ) {
									if (((a = o._next), (o._act || n >= o._start) && o._ts && d !== o)) {
										if (o.parent !== this) return this.render(t, e, i);
										if (
											(o.render(0 < o._ts ? (n - o._start) * o._ts : (o._dirty ? o.totalDuration() : o._tDur) + (n - o._start) * o._ts, e, i),
											n !== this._time || (!this._ts && !l))
										) {
											(d = 0), a && (w += this._zTime = -Ae);
											break;
										}
									}
									o = a;
								}
							else {
								o = this._last;
								for (var x = t < 0 ? t : n; o; ) {
									if (((a = o._prev), (o._act || x <= o._end) && o._ts && d !== o)) {
										if (o.parent !== this) return this.render(t, e, i);
										if (
											(o.render(0 < o._ts ? (x - o._start) * o._ts : (o._dirty ? o.totalDuration() : o._tDur) + (x - o._start) * o._ts, e, i),
											n !== this._time || (!this._ts && !l))
										) {
											(d = 0), a && (w += this._zTime = x ? -Ae : Ae);
											break;
										}
									}
									o = a;
								}
							}
							if (d && !e && (this.pause(), (d.render(g <= n ? 0 : -Ae)._zTime = g <= n ? 1 : -1), this._ts))
								return (this._start = h), R(this), this.render(t, e, i);
							this._onUpdate && !e && pi(this, "onUpdate", !0),
								((w === m && m >= this.totalDuration()) || (!w && g)) &&
									((h !== this._start && Math.abs(c) === Math.abs(this._ts)) ||
										this._lock ||
										((!t && v) || !((w === m && 0 < this._ts) || (!w && this._ts < 0)) || z(this, 1),
										e ||
											(t < 0 && !g) ||
											(!w && !g && m) ||
											(pi(this, w === m && 0 <= t ? "onComplete" : "onReverseComplete", !0), !this._prom || (w < m && 0 < this.timeScale()) || this._prom())));
						}
						return this;
					}),
					(r.add = function (t, e) {
						var i = this;
						if ((a(e) || (e = li(this, e, t)), !(t instanceof $i))) {
							if (je(t))
								return (
									t.forEach(function (t) {
										return i.add(t, e);
									}),
									this
								);
							if (n(t)) return this.addLabel(t, e);
							if (!o(t)) return this;
							t = Ei.delayedCall(0, t);
						}
						return this !== t ? H(this, t, e) : this;
					}),
					(r.getChildren = function (t, e, i, n) {
						void 0 === t && (t = !0), void 0 === e && (e = !0), void 0 === i && (i = !0), void 0 === n && (n = -ze);
						for (var o = [], a = this._first; a; )
							a._start >= n && (a instanceof Ei ? e && o.push(a) : (i && o.push(a), t && o.push.apply(o, a.getChildren(!0, e, i)))), (a = a._next);
						return o;
					}),
					(r.getById = function (t) {
						for (var e = this.getChildren(1, 1, 1), i = e.length; i--; ) if (e[i].vars.id === t) return e[i];
					}),
					(r.remove = function (t) {
						return n(t) ? this.removeLabel(t) : o(t) ? this.killTweensOf(t) : (D(this, t), t === this._recent && (this._recent = this._last), A(this));
					}),
					(r.totalTime = function (e, i) {
						return arguments.length
							? ((this._forcing = 1),
							  !this._dp && this._ts && (this._start = _(wi.time - (0 < this._ts ? e / this._ts : (this.totalDuration() - e) / -this._ts))),
							  t.prototype.totalTime.call(this, e, i),
							  (this._forcing = 0),
							  this)
							: this._tTime;
					}),
					(r.addLabel = function (t, e) {
						return (this.labels[t] = li(this, e)), this;
					}),
					(r.removeLabel = function (t) {
						return delete this.labels[t], this;
					}),
					(r.addPause = function (t, e, i) {
						var n = Ei.delayedCall(0, e || g, i);
						return (n.data = "isPause"), (this._hasPause = 1), H(this, n, li(this, t));
					}),
					(r.removePause = function (t) {
						var e = this._first;
						for (t = li(this, t); e; ) e._start === t && "isPause" === e.data && z(e), (e = e._next);
					}),
					(r.killTweensOf = function (t, e, i) {
						for (var n = this.getTweensOf(t, i), o = n.length; o--; ) Pi !== n[o] && n[o].kill(t, e);
						return this;
					}),
					(r.getTweensOf = function (t, e) {
						for (var i, n = [], o = hi(t), s = this._first, r = a(e); s; )
							s instanceof Ei
								? C(s._targets, o) &&
								  (r ? (!Pi || (s._initted && s._ts)) && s.globalTime(0) <= e && s.globalTime(s.totalDuration()) > e : !e || s.isActive()) &&
								  n.push(s)
								: (i = s.getTweensOf(o, e)).length && n.push.apply(n, i),
								(s = s._next);
						return n;
					}),
					(r.tweenTo = function (t, e) {
						e = e || {};
						var i,
							n = this,
							o = li(n, t),
							a = e.startAt,
							s = e.onStart,
							r = e.onStartParams,
							l = e.immediateRender,
							d = Ei.to(
								n,
								$(
									{
										ease: e.ease || "none",
										lazy: !1,
										immediateRender: !1,
										time: o,
										overwrite: "auto",
										duration: e.duration || Math.abs((o - (a && "time" in a ? a.time : n._time)) / n.timeScale()) || Ae,
										onStart: function () {
											if ((n.pause(), !i)) {
												var t = e.duration || Math.abs((o - (a && "time" in a ? a.time : n._time)) / n.timeScale());
												d._dur !== t && N(d, t, 0, 1).render(d._time, !0, !0), (i = 1);
											}
											s && s.apply(d, r || []);
										},
									},
									e
								)
							);
						return l ? d.render(0) : d;
					}),
					(r.tweenFromTo = function (t, e, i) {
						return this.tweenTo(e, $({ startAt: { time: li(this, t) } }, i));
					}),
					(r.recent = function () {
						return this._recent;
					}),
					(r.nextLabel = function (t) {
						return void 0 === t && (t = this._time), et(this, li(this, t));
					}),
					(r.previousLabel = function (t) {
						return void 0 === t && (t = this._time), et(this, li(this, t), 1);
					}),
					(r.currentLabel = function (t) {
						return arguments.length ? this.seek(t, !0) : this.previousLabel(this._time + Ae);
					}),
					(r.shiftChildren = function (t, e, i) {
						void 0 === i && (i = 0);
						for (var n, o = this._first, a = this.labels; o; ) o._start >= i && ((o._start += t), (o._end += t)), (o = o._next);
						if (e) for (n in a) a[n] >= i && (a[n] += t);
						return A(this);
					}),
					(r.invalidate = function () {
						var e = this._first;
						for (this._lock = 0; e; ) e.invalidate(), (e = e._next);
						return t.prototype.invalidate.call(this);
					}),
					(r.clear = function (t) {
						void 0 === t && (t = !0);
						for (var e, i = this._first; i; ) (e = i._next), this.remove(i), (i = e);
						return this._dp && (this._time = this._tTime = this._pTime = 0), t && (this.labels = {}), A(this);
					}),
					(r.totalDuration = function (t) {
						var e,
							i,
							n,
							o = 0,
							a = this,
							s = a._last,
							r = ze;
						if (arguments.length) return a.timeScale((a._repeat < 0 ? a.duration() : a.totalDuration()) / (a.reversed() ? -t : t));
						if (a._dirty) {
							for (n = a.parent; s; )
								(e = s._prev),
									s._dirty && s.totalDuration(),
									r < (i = s._start) && a._sort && s._ts && !a._lock ? ((a._lock = 1), (H(a, s, i - s._delay, 1)._lock = 0)) : (r = i),
									i < 0 &&
										s._ts &&
										((o -= i),
										((!n && !a._dp) || (n && n.smoothChildTiming)) && ((a._start += i / a._ts), (a._time -= i), (a._tTime -= i)),
										a.shiftChildren(-i, !1, -1 / 0),
										(r = 0)),
									s._end > o && s._ts && (o = s._end),
									(s = e);
							N(a, a === ae && a._time > o ? a._time : o, 1, 1), (a._dirty = 0);
						}
						return a._tDur;
					}),
					(s.updateRoot = function (t) {
						if ((ae._ts && (k(ae, E(t, ae)), (he = wi.frame)), wi.frame >= ei)) {
							ei += Ie.autoSleep || 120;
							var e = ae._first;
							if ((!e || !e._ts) && Ie.autoSleep && wi._listeners.length < 2) {
								for (; e && !e._ts; ) e = e._next;
								e || wi.sleep();
							}
						}
					}),
					s
				);
			})($i);
			$(Si.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
			var Pi,
				Ii = function (t, e, i, a, s, r, l, d, c) {
					o(a) && (a = a(s || 0, t, r));
					var h,
						p = t[e],
						f = "get" !== i ? i : o(p) ? (c ? t[e.indexOf("set") || !o(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](c) : t[e]()) : p,
						g = o(p) ? (c ? Fi : Li) : Ri;
					if (
						(n(a) &&
							(~a.indexOf("random(") && (a = tt(a)),
							"=" === a.charAt(1) && ((!(h = parseFloat(f) + parseFloat(a.substr(2)) * ("-" === a.charAt(0) ? -1 : 1) + (U(f) || 0)) && 0 !== h) || (a = h))),
						f !== a)
					)
						return isNaN(f * a) || "" === a
							? (p || e in t || u(e, a),
							  function (t, e, i, n, o, a, s) {
									var r,
										l,
										d,
										c,
										h,
										u,
										p,
										f,
										g = new Qi(this._pt, t, e, 0, 1, Ni, null, o),
										m = 0,
										v = 0;
									for (
										g.b = i,
											g.e = n,
											i += "",
											(p = ~(n += "").indexOf("random(")) && (n = tt(n)),
											a && (a((f = [i, n]), t, e), (i = f[0]), (n = f[1])),
											l = i.match(We) || [];
										(r = We.exec(n));

									)
										(c = r[0]),
											(h = n.substring(m, r.index)),
											d ? (d = (d + 1) % 5) : "rgba(" === h.substr(-5) && (d = 1),
											c !== l[v++] &&
												((u = parseFloat(l[v - 1]) || 0),
												(g._pt = {
													_next: g._pt,
													p: h || 1 === v ? h : ",",
													s: u,
													c: "=" === c.charAt(1) ? parseFloat(c.substr(2)) * ("-" === c.charAt(0) ? -1 : 1) : parseFloat(c) - u,
													m: d && d < 4 ? Math.round : 0,
												}),
												(m = We.lastIndex));
									return (g.c = m < n.length ? n.substring(m, n.length) : ""), (g.fp = s), (Ue.test(n) || p) && (g.e = 0), (this._pt = g);
							  }.call(this, t, e, f, a, g, d || Ie.stringFilter, c))
							: ((h = new Qi(this._pt, t, e, +f || 0, a - (f || 0), "boolean" == typeof p ? ji : Bi, 0, g)),
							  c && (h.fp = c),
							  l && h.modifier(l, this, t),
							  (this._pt = h));
				},
				Di = function t(e, i) {
					var n,
						o,
						a,
						s,
						r,
						d,
						c,
						h,
						u,
						p,
						f,
						g,
						w,
						y = e.vars,
						b = y.ease,
						_ = y.startAt,
						C = y.immediateRender,
						k = y.lazy,
						T = y.onUpdate,
						O = y.onUpdateParams,
						S = y.callbackScope,
						I = y.runBackwards,
						D = y.yoyoEase,
						A = y.keyframes,
						M = y.autoRevert,
						E = e._dur,
						R = e._startAt,
						L = e._targets,
						F = e.parent,
						H = F && "nested" === F.data ? F.parent._targets : L,
						B = "auto" === e._overwrite && !oe,
						j = e.timeline;
					if (
						(!j || (A && b) || (b = "none"),
						(e._ease = ki(b, De.ease)),
						(e._yEase = D ? xi(ki(!0 === D ? b : D, De.ease)) : 0),
						D && e._yoyo && !e._repeat && ((D = e._yEase), (e._yEase = e._ease), (e._ease = D)),
						(e._from = !j && !!y.runBackwards),
						!j || (A && !y.stagger))
					) {
						if (((g = (h = L[0] ? v(L[0]).harness : 0) && y[h.prop]), (n = P(y, Ge)), R && z(R.render(-1, !0)), _))
							if (
								(z(
									(e._startAt = Ei.set(
										L,
										$(
											{
												data: "isStart",
												overwrite: !1,
												parent: F,
												immediateRender: !0,
												lazy: l(k),
												startAt: null,
												delay: 0,
												onUpdate: T,
												onUpdateParams: O,
												callbackScope: S,
												stagger: 0,
											},
											_
										)
									))
								),
								i < 0 && !C && !M && e._startAt.render(-1, !0),
								C)
							) {
								if ((0 < i && !M && (e._startAt = 0), E && i <= 0)) return void (i && (e._zTime = i));
							} else !1 === M && (e._startAt = 0);
						else if (I && E)
							if (R) M || (e._startAt = 0);
							else if (
								(i && (C = !1),
								(a = $({ overwrite: !1, data: "isFromStart", lazy: C && l(k), immediateRender: C, stagger: 0, parent: F }, n)),
								g && (a[h.prop] = g),
								z((e._startAt = Ei.set(L, a))),
								i < 0 && e._startAt.render(-1, !0),
								(e._zTime = i),
								C)
							) {
								if (!i) return;
							} else t(e._startAt, Ae);
						for (e._pt = 0, k = (E && l(k)) || (k && !E), o = 0; o < L.length; o++) {
							if (
								((c = (r = L[o])._gsap || m(L)[o]._gsap),
								(e._ptLookup[o] = p = {}),
								Je[c.id] && Ze.length && x(),
								(f = H === L ? o : H.indexOf(r)),
								h &&
									!1 !== (u = new h()).init(r, g || n, e, f, H) &&
									((e._pt = s = new Qi(e._pt, r, u.name, 0, 1, u.render, u, 0, u.priority)),
									u._props.forEach(function (t) {
										p[t] = s;
									}),
									u.priority && (d = 1)),
								!h || g)
							)
								for (a in n) Ke[a] && (u = vt(a, n, e, f, r, H)) ? u.priority && (d = 1) : (p[a] = s = Ii.call(e, r, a, "get", n[a], f, H, 0, y.stringFilter));
							e._op && e._op[o] && e.kill(r, e._op[o]),
								B && e._pt && ((Pi = e), ae.killTweensOf(r, p, e.globalTime(i)), (w = !e.parent), (Pi = 0)),
								e._pt && k && (Je[c.id] = 1);
						}
						d && Ui(e), e._onInit && e._onInit(e);
					}
					(e._onUpdate = T), (e._initted = (!e._op || e._pt) && !w), A && i <= 0 && j.render(ze, !0, !0);
				},
				zi = function (t, e, i, a, s) {
					return o(t) ? t.call(e, i, a, s) : n(t) && ~t.indexOf("random(") ? tt(t) : t;
				},
				Ai = ni + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
				Mi = {};
			y(Ai + ",id,stagger,delay,duration,paused,scrollTrigger", function (t) {
				return (Mi[t] = 1);
			});
			var Ei = (function (t) {
				function o(e, n, o, s) {
					var d;
					"number" == typeof n && ((o.duration = n), (n = o), (o = null));
					var h,
						u,
						f,
						g,
						v,
						w,
						y,
						b,
						C = (d = t.call(this, s ? n : I(n)) || this).vars,
						x = C.duration,
						k = C.delay,
						T = C.immediateRender,
						O = C.stagger,
						S = C.overwrite,
						D = C.keyframes,
						z = C.defaults,
						A = C.scrollTrigger,
						M = C.yoyoEase,
						E = n.parent || ae,
						R = (je(e) || Be(e) ? a(e[0]) : "length" in n) ? [e] : hi(e);
					if (
						((d._targets = R.length ? m(R) : p("GSAP target " + e + " not found. https://greensock.com", !Ie.nullTargetWarn) || []),
						(d._ptLookup = []),
						(d._overwrite = S),
						D || O || c(x) || c(k))
					) {
						if (
							((n = d.vars),
							(h = d.timeline = new Si({ data: "nested", defaults: z || {} })).kill(),
							(h.parent = h._dp = i(d)),
							(h._start = 0),
							O || c(x) || c(k))
						) {
							if (((g = R.length), (y = O && X(O)), r(O))) for (v in O) ~Ai.indexOf(v) && ((b = b || {})[v] = O[v]);
							for (u = 0; u < g; u++)
								((f = P(n, Mi)).stagger = 0),
									M && (f.yoyoEase = M),
									b && oi(f, b),
									(w = R[u]),
									(f.duration = +zi(x, i(d), u, w, R)),
									(f.delay = (+zi(k, i(d), u, w, R) || 0) - d._delay),
									!O && 1 === g && f.delay && ((d._delay = k = f.delay), (d._start += k), (f.delay = 0)),
									h.to(w, f, y ? y(u, w, R) : 0),
									(h._ease = bi.none);
							h.duration() ? (x = k = 0) : (d.timeline = 0);
						} else if (D) {
							I($(h.vars.defaults, { ease: "none" })), (h._ease = ki(D.ease || n.ease || "none"));
							var L,
								F,
								j,
								N = 0;
							if (je(D))
								D.forEach(function (t) {
									return h.to(R, t, ">");
								});
							else {
								for (v in ((f = {}), D)) "ease" === v || "easeEach" === v || wt(v, D[v], f, D.easeEach);
								for (v in f)
									for (
										L = f[v].sort(function (t, e) {
											return t.t - e.t;
										}),
											u = N = 0;
										u < L.length;
										u++
									)
										((j = { ease: (F = L[u]).e, duration: ((F.t - (u ? L[u - 1].t : 0)) / 100) * x })[v] = F.v), h.to(R, j, N), (N += j.duration);
								h.duration() < x && h.to({}, { duration: x - h.duration() });
							}
						}
						x || d.duration((x = h.duration()));
					} else d.timeline = 0;
					return (
						!0 !== S || oe || ((Pi = i(d)), ae.killTweensOf(R), (Pi = 0)),
						H(E, i(d), o),
						n.reversed && d.reverse(),
						n.paused && d.paused(!0),
						(T ||
							(!x &&
								!D &&
								d._start === _(E._time) &&
								l(T) &&
								(function t(e) {
									return !e || (e._ts && t(e.parent));
								})(i(d)) &&
								"nested" !== E.data)) &&
							((d._tTime = -Ae), d.render(Math.max(0, -k))),
						A && B(i(d), A),
						d
					);
				}
				e(o, t);
				var s = o.prototype;
				return (
					(s.render = function (t, e, i) {
						var n,
							o,
							a,
							s,
							r,
							l,
							d,
							c,
							h,
							u = this._time,
							p = this._tDur,
							f = this._dur,
							g = p - Ae < t && 0 <= t ? p : t < Ae ? 0 : t;
						if (f) {
							if (g !== this._tTime || !t || i || (!this._initted && this._tTime) || (this._startAt && this._zTime < 0 != t < 0)) {
								if (((n = g), (c = this.timeline), this._repeat)) {
									if (((s = f + this._rDelay), this._repeat < -1 && t < 0)) return this.totalTime(100 * s + t, e, i);
									if (
										((n = _(g % s)),
										g === p ? ((a = this._repeat), (n = f)) : ((a = ~~(g / s)) && a === g / s && ((n = f), a--), f < n && (n = f)),
										(l = this._yoyo && 1 & a) && ((h = this._yEase), (n = f - n)),
										(r = ai(this._tTime, s)),
										n === u && !i && this._initted)
									)
										return this;
									a !== r &&
										(c && this._yEase && dt(c, l),
										!this.vars.repeatRefresh || l || this._lock || ((this._lock = i = 1), (this.render(_(s * a), !0).invalidate()._lock = 0)));
								}
								if (!this._initted) {
									if (j(this, t < 0 ? t : n, i, e)) return (this._tTime = 0), this;
									if (f !== this._dur) return this.render(t, e, i);
								}
								if (
									((this._tTime = g),
									(this._time = n),
									!this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
									(this.ratio = d = (h || this._ease)(n / f)),
									this._from && (this.ratio = d = 1 - d),
									n && !u && !e && (pi(this, "onStart"), this._tTime !== g))
								)
									return this;
								for (o = this._pt; o; ) o.r(d, o.d), (o = o._next);
								(c && c.render(t < 0 ? t : !n && l ? -Ae : c._dur * c._ease(n / this._dur), e, i)) || (this._startAt && (this._zTime = t)),
									this._onUpdate && !e && (t < 0 && this._startAt && this._startAt.render(t, !0, i), pi(this, "onUpdate")),
									this._repeat && a !== r && this.vars.onRepeat && !e && this.parent && pi(this, "onRepeat"),
									(g !== this._tDur && g) ||
										this._tTime !== g ||
										(t < 0 && this._startAt && !this._onUpdate && this._startAt.render(t, !0, !0),
										(!t && f) || !((g === this._tDur && 0 < this._ts) || (!g && this._ts < 0)) || z(this, 1),
										e ||
											(t < 0 && !u) ||
											(!g && !u) ||
											(pi(this, g === p ? "onComplete" : "onReverseComplete", !0), !this._prom || (g < p && 0 < this.timeScale()) || this._prom()));
							}
						} else
							!(function (t, e, i, n) {
								var o,
									a,
									s,
									r = t.ratio,
									l =
										e < 0 ||
										(!e &&
											((!t._start &&
												(function t(e) {
													var i = e.parent;
													return i && i._ts && i._initted && !i._lock && (i.rawTime() < 0 || t(i));
												})(t) &&
												(t._initted || !si(t))) ||
												((t._ts < 0 || t._dp._ts < 0) && !si(t))))
											? 0
											: 1,
									d = t._rDelay,
									c = 0;
								if (
									(d &&
										t._repeat &&
										((c = di(0, t._tDur, e)),
										(a = ai(c, d)),
										t._yoyo && 1 & a && (l = 1 - l),
										a !== ai(t._tTime, d) && ((r = 1 - l), t.vars.repeatRefresh && t._initted && t.invalidate())),
									l !== r || n || t._zTime === Ae || (!e && t._zTime))
								) {
									if (!t._initted && j(t, e, n, i)) return;
									for (
										s = t._zTime, t._zTime = e || (i ? Ae : 0), i = i || (e && !s), t.ratio = l, t._from && (l = 1 - l), t._time = 0, t._tTime = c, o = t._pt;
										o;

									)
										o.r(l, o.d), (o = o._next);
									t._startAt && e < 0 && t._startAt.render(e, !0, !0),
										t._onUpdate && !i && pi(t, "onUpdate"),
										c && t._repeat && !i && t.parent && pi(t, "onRepeat"),
										(e >= t._tDur || e < 0) && t.ratio === l && (l && z(t, 1), i || (pi(t, l ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
								} else t._zTime || (t._zTime = e);
							})(this, t, e, i);
						return this;
					}),
					(s.targets = function () {
						return this._targets;
					}),
					(s.invalidate = function () {
						return (
							(this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0),
							(this._ptLookup = []),
							this.timeline && this.timeline.invalidate(),
							t.prototype.invalidate.call(this)
						);
					}),
					(s.kill = function (t, e) {
						if ((void 0 === e && (e = "all"), !(t || (e && "all" !== e)))) return (this._lazy = this._pt = 0), this.parent ? it(this) : this;
						if (this.timeline) {
							var i = this.timeline.totalDuration();
							return (
								this.timeline.killTweensOf(t, e, Pi && !0 !== Pi.vars.overwrite)._first || it(this),
								this.parent && i !== this.timeline.totalDuration() && N(this, (this._dur * this.timeline._tDur) / i, 0, 1),
								this
							);
						}
						var o,
							a,
							s,
							r,
							l,
							d,
							c,
							h = this._targets,
							u = t ? hi(t) : h,
							p = this._ptLookup,
							f = this._pt;
						if (
							(!e || "all" === e) &&
							(function (t, e) {
								for (var i = t.length, n = i === e.length; n && i-- && t[i] === e[i]; );
								return i < 0;
							})(h, u)
						)
							return "all" === e && (this._pt = 0), it(this);
						for (
							o = this._op = this._op || [],
								"all" !== e &&
									(n(e) &&
										((l = {}),
										y(e, function (t) {
											return (l[t] = 1);
										}),
										(e = l)),
									(e = (function (t, e) {
										var i,
											n,
											o,
											a,
											s = t[0] ? v(t[0]).harness : 0,
											r = s && s.aliases;
										if (!r) return e;
										for (n in ((i = oi({}, e)), r)) if ((n in i)) for (o = (a = r[n].split(",")).length; o--; ) i[a[o]] = i[n];
										return i;
									})(h, e))),
								c = h.length;
							c--;

						)
							if (~u.indexOf(h[c]))
								for (l in ((a = p[c]), "all" === e ? ((o[c] = e), (r = a), (s = {})) : ((s = o[c] = o[c] || {}), (r = e)), r))
									(d = a && a[l]) && (("kill" in d.d && !0 !== d.d.kill(l)) || D(this, d, "_pt"), delete a[l]), "all" !== s && (s[l] = 1);
						return this._initted && !this._pt && f && it(this), this;
					}),
					(o.to = function (t, e, i) {
						return new o(t, e, i);
					}),
					(o.from = function (t, e) {
						return V(1, arguments);
					}),
					(o.delayedCall = function (t, e, i, n) {
						return new o(e, 0, {
							immediateRender: !1,
							lazy: !1,
							overwrite: !1,
							delay: t,
							onComplete: e,
							onReverseComplete: e,
							onCompleteParams: i,
							onReverseCompleteParams: i,
							callbackScope: n,
						});
					}),
					(o.fromTo = function (t, e, i) {
						return V(2, arguments);
					}),
					(o.set = function (t, e) {
						return (e.duration = 0), e.repeatDelay || (e.repeat = 0), new o(t, e);
					}),
					(o.killTweensOf = function (t, e, i) {
						return ae.killTweensOf(t, e, i);
					}),
					o
				);
			})($i);
			$(Ei.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }),
				y("staggerTo,staggerFrom,staggerFromTo", function (t) {
					Ei[t] = function () {
						var e = new Si(),
							i = ci.call(arguments, 0);
						return i.splice("staggerFromTo" === t ? 5 : 4, 0, 0), e[t].apply(e, i);
					};
				});
			var Ri = function (t, e, i) {
					return (t[e] = i);
				},
				Li = function (t, e, i) {
					return t[e](i);
				},
				Fi = function (t, e, i, n) {
					return t[e](n.fp, i);
				},
				Hi = function (t, e) {
					return o(t[e]) ? Li : s(t[e]) && t.setAttribute ? yt : Ri;
				},
				Bi = function (t, e) {
					return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e);
				},
				ji = function (t, e) {
					return e.set(e.t, e.p, !!(e.s + e.c * t), e);
				},
				Ni = function (t, e) {
					var i = e._pt,
						n = "";
					if (!t && e.b) n = e.b;
					else if (1 === t && e.e) n = e.e;
					else {
						for (; i; ) (n = i.p + (i.m ? i.m(i.s + i.c * t) : Math.round(1e4 * (i.s + i.c * t)) / 1e4) + n), (i = i._next);
						n += e.c;
					}
					e.set(e.t, e.p, n, e);
				},
				qi = function (t, e) {
					for (var i = e._pt; i; ) i.r(t, i.d), (i = i._next);
				},
				Vi = function (t, e, i, n) {
					for (var o, a = this._pt; a; ) (o = a._next), a.p === n && a.modifier(t, e, i), (a = o);
				},
				Wi = function (t) {
					for (var e, i, n = this._pt; n; ) (i = n._next), (n.p === t && !n.op) || n.op === t ? D(this, n, "_pt") : n.dep || (e = 1), (n = i);
					return !e;
				},
				Ui = function (t) {
					for (var e, i, n, o, a = t._pt; a; ) {
						for (e = a._next, i = n; i && i.pr > a.pr; ) i = i._next;
						(a._prev = i ? i._prev : o) ? (a._prev._next = a) : (n = a), (a._next = i) ? (i._prev = a) : (o = a), (a = e);
					}
					t._pt = n;
				},
				Qi =
					((_t.prototype.modifier = function (t, e, i) {
						(this.mSet = this.mSet || this.set), (this.set = bt), (this.m = t), (this.mt = i), (this.tween = e);
					}),
					_t);
			y(
				ni +
					"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
				function (t) {
					return (Ge[t] = 1);
				}
			),
				(Xe.TweenMax = Xe.TweenLite = Ei),
				(Xe.TimelineLite = Xe.TimelineMax = Si),
				(ae = new Si({ sortChildren: !1, defaults: De, autoRemoveChildren: !0, id: "root", smoothChildTiming: !0 })),
				(Ie.stringFilter = rt);
			var Yi = {
				registerPlugin: function () {
					for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
					e.forEach(function (t) {
						return (function (t) {
							var e = (t = (!t.name && t.default) || t).name,
								i = o(t),
								n =
									e && !i && t.init
										? function () {
												this._props = [];
										  }
										: t,
								a = { init: g, render: qi, add: Ii, kill: Wi, modifier: Vi, rawVars: 0 },
								s = { targetTest: 0, get: 0, getSetter: Hi, aliases: {}, register: 0 };
							if ((yi(), t !== n)) {
								if (Ke[e]) return;
								$(n, $(P(t, a), s)),
									oi(n.prototype, oi(a, P(t, s))),
									(Ke[(n.prop = e)] = n),
									t.targetTest && (ii.push(n), (Ge[e] = 1)),
									(e = ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin");
							}
							f(e, n), t.register && t.register(Xi, n, Qi);
						})(t);
					});
				},
				timeline: function (t) {
					return new Si(t);
				},
				getTweensOf: function (t, e) {
					return ae.getTweensOf(t, e);
				},
				getProperty: function (t, e, i, o) {
					n(t) && (t = hi(t)[0]);
					var a = v(t || {}).get,
						s = i ? O : T;
					return (
						"native" === i && (i = ""),
						t
							? e
								? s(((Ke[e] && Ke[e].get) || a)(t, e, i, o))
								: function (e, i, n) {
										return s(((Ke[e] && Ke[e].get) || a)(t, e, i, n));
								  }
							: t
					);
				},
				quickSetter: function (t, e, i) {
					if (1 < (t = hi(t)).length) {
						var n = t.map(function (t) {
								return Xi.quickSetter(t, e, i);
							}),
							o = n.length;
						return function (t) {
							for (var e = o; e--; ) n[e](t);
						};
					}
					t = t[0] || {};
					var a = Ke[e],
						s = v(t),
						r = (s.harness && (s.harness.aliases || {})[e]) || e,
						l = a
							? function (e) {
									var n = new a();
									(ue._pt = 0), n.init(t, i ? e + i : e, ue, 0, [t]), n.render(1, n), ue._pt && qi(1, ue);
							  }
							: s.set(t, r);
					return a
						? l
						: function (e) {
								return l(t, r, i ? e + i : e, s, 1);
						  };
				},
				isTweening: function (t) {
					return 0 < ae.getTweensOf(t, !0).length;
				},
				defaults: function (t) {
					return t && t.ease && (t.ease = ki(t.ease, De.ease)), S(De, t || {});
				},
				config: function (t) {
					return S(Ie, t || {});
				},
				registerEffect: function (t) {
					var e = t.name,
						i = t.effect,
						n = t.plugins,
						o = t.defaults,
						a = t.extendTimeline;
					(n || "").split(",").forEach(function (t) {
						return t && !Ke[t] && !Xe[t] && p(e + " effect requires " + t + " plugin.");
					}),
						(ti[e] = function (t, e, n) {
							return i(hi(t), $(e || {}, o), n);
						}),
						a &&
							(Si.prototype[e] = function (t, i, n) {
								return this.add(ti[e](t, r(i) ? i : (n = i) && {}, this), n);
							});
				},
				registerEase: function (t, e) {
					bi[t] = ki(e);
				},
				parseEase: function (t, e) {
					return arguments.length ? ki(t, e) : bi;
				},
				getById: function (t) {
					return ae.getById(t);
				},
				exportRoot: function (t, e) {
					void 0 === t && (t = {});
					var i,
						n,
						o = new Si(t);
					for (o.smoothChildTiming = l(t.smoothChildTiming), ae.remove(o), o._dp = 0, o._time = o._tTime = ae._time, i = ae._first; i; )
						(n = i._next), (!e && !i._dur && i instanceof Ei && i.vars.onComplete === i._targets[0]) || H(o, i, i._start - i._delay), (i = n);
					return H(ae, o, 0), o;
				},
				utils: {
					wrap: function t(e, i, n) {
						var o = i - e;
						return je(e)
							? K(e, t(0, e.length), i)
							: W(n, function (t) {
									return ((o + ((t - e) % o)) % o) + e;
							  });
					},
					wrapYoyo: function t(e, i, n) {
						var o = i - e,
							a = 2 * o;
						return je(e)
							? K(e, t(0, e.length - 1), i)
							: W(n, function (t) {
									return e + (o < (t = (a + ((t - e) % a)) % a || 0) ? a - t : t);
							  });
					},
					distribute: X,
					random: J,
					snap: Z,
					normalize: function (t, e, i) {
						return ui(t, e, 0, 1, i);
					},
					getUnit: U,
					clamp: function (t, e, i) {
						return W(i, function (i) {
							return di(t, e, i);
						});
					},
					splitColor: ot,
					toArray: hi,
					selector: function (t) {
						return (
							(t = hi(t)[0] || p("Invalid scope") || {}),
							function (e) {
								var i = t.current || t.nativeElement || t;
								return hi(e, i.querySelectorAll ? i : i === t ? p("Invalid scope") || le.createElement("div") : t);
							}
						);
					},
					mapRange: ui,
					pipe: function () {
						for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
						return function (t) {
							return e.reduce(function (t, e) {
								return e(t);
							}, t);
						};
					},
					unitize: function (t, e) {
						return function (i) {
							return t(parseFloat(i)) + (e || U(i));
						};
					},
					interpolate: function t(e, i, o, a) {
						var s = isNaN(e + i)
							? 0
							: function (t) {
									return (1 - t) * e + t * i;
							  };
						if (!s) {
							var r,
								l,
								d,
								c,
								h,
								u = n(e),
								p = {};
							if ((!0 === o && (a = 1) && (o = null), u)) (e = { p: e }), (i = { p: i });
							else if (je(e) && !je(i)) {
								for (d = [], c = e.length, h = c - 2, l = 1; l < c; l++) d.push(t(e[l - 1], e[l]));
								c--,
									(s = function (t) {
										t *= c;
										var e = Math.min(h, ~~t);
										return d[e](t - e);
									}),
									(o = i);
							} else a || (e = oi(je(e) ? [] : {}, e));
							if (!d) {
								for (r in i) Ii.call(p, e, r, "get", i[r]);
								s = function (t) {
									return qi(t, p) || (u ? e.p : e);
								};
							}
						}
						return W(o, s);
					},
					shuffle: Y,
				},
				install: h,
				effects: ti,
				ticker: wi,
				updateRoot: Si.updateRoot,
				plugins: Ke,
				globalTimeline: ae,
				core: {
					PropTween: Qi,
					globals: f,
					Tween: Ei,
					Timeline: Si,
					Animation: $i,
					getCache: v,
					_removeLinkedListItem: D,
					suppressOverwrites: function (t) {
						return (oe = t);
					},
				},
			};
			y("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
				return (Yi[t] = Ei[t]);
			}),
				wi.add(Si.updateRoot),
				(ue = Yi.to({}, { duration: 0 }));
			var Xi =
				Yi.registerPlugin(
					{
						name: "attr",
						init: function (t, e, i, n, o) {
							var a, s;
							for (a in e) (s = this.add(t, "setAttribute", (t.getAttribute(a) || 0) + "", e[a], n, o, 0, 0, a)) && (s.op = a), this._props.push(a);
						},
					},
					{
						name: "endArray",
						init: function (t, e) {
							for (var i = e.length; i--; ) this.add(t, i, t[i] || 0, e[i]);
						},
					},
					xt("roundProps", G),
					xt("modifiers"),
					xt("snap", Z)
				) || Yi;
			(Ei.version = Si.version = Xi.version = "3.9.1"), (ce = 1), d() && yi();
			var Gi,
				Zi,
				Ji,
				Ki,
				tn,
				en,
				nn,
				on = bi.Power0,
				an = bi.Power1,
				sn = bi.Power2,
				rn = bi.Power3,
				ln = bi.Power4,
				dn = bi.Linear,
				cn = bi.Quad,
				hn = bi.Cubic,
				un = bi.Quart,
				pn = bi.Quint,
				fn = bi.Strong,
				gn = bi.Elastic,
				mn = bi.Back,
				vn = bi.SteppedEase,
				wn = bi.Bounce,
				yn = bi.Sine,
				bn = bi.Expo,
				_n = bi.Circ,
				Cn = {},
				xn = 180 / Math.PI,
				kn = Math.PI / 180,
				Tn = Math.atan2,
				On = /([A-Z])/g,
				$n = /(?:left|right|width|margin|padding|x)/i,
				Sn = /[\s,\(]\S/,
				Pn = { autoAlpha: "opacity,visibility", scale: "scaleX,scaleY", alpha: "opacity" },
				In = "transform",
				Dn = In + "Origin",
				zn = "O,Moz,ms,Ms,Webkit".split(","),
				An = function (t, e, i) {
					var n = (e || tn).style,
						o = 5;
					if (t in n && !i) return t;
					for (t = t.charAt(0).toUpperCase() + t.substr(1); o-- && !(zn[o] + t in n); );
					return o < 0 ? null : (3 === o ? "ms" : 0 <= o ? zn[o] : "") + t;
				},
				Mn = { deg: 1, rad: 1, turn: 1 },
				En = { top: "0%", bottom: "100%", left: "0%", right: "100%", center: "50%" },
				Rn = {
					clearProps: function (t, e, i, n, o) {
						if ("isFromStart" !== o.data) {
							var a = (t._pt = new Qi(t._pt, e, i, 0, 0, Xt));
							return (a.u = n), (a.pr = -10), (a.tween = o), t._props.push(i), 1;
						}
					},
				},
				Ln = [1, 0, 0, 1, 0, 0],
				Fn = {},
				Hn = function (t, e) {
					var i = t._gsap || new Oi(t);
					if ("x" in i && !e && !i.uncache) return i;
					var n,
						o,
						a,
						s,
						r,
						l,
						d,
						c,
						h,
						u,
						p,
						f,
						g,
						m,
						v,
						w,
						y,
						_,
						C,
						x,
						k,
						T,
						O,
						$,
						S,
						P,
						I,
						D,
						z,
						A,
						M,
						E,
						R = t.style,
						L = i.scaleX < 0,
						F = "deg",
						H = Lt(t, Dn) || "0";
					return (
						(n = o = a = l = d = c = h = u = p = 0),
						(s = r = 1),
						(i.svg = !(!t.getCTM || !Nt(t))),
						(m = Jt(t, i.svg)),
						i.svg &&
							(($ = (!i.uncache || "0px 0px" === H) && !e && t.getAttribute("data-svg-origin")), Kt(t, $ || H, !!$ || i.originIsAbsolute, !1 !== i.smooth, m)),
						(f = i.xOrigin || 0),
						(g = i.yOrigin || 0),
						m !== Ln &&
							((_ = m[0]),
							(C = m[1]),
							(x = m[2]),
							(k = m[3]),
							(n = T = m[4]),
							(o = O = m[5]),
							6 === m.length
								? ((s = Math.sqrt(_ * _ + C * C)),
								  (r = Math.sqrt(k * k + x * x)),
								  (l = _ || C ? Tn(C, _) * xn : 0),
								  (h = x || k ? Tn(x, k) * xn + l : 0) && (r *= Math.abs(Math.cos(h * kn))),
								  i.svg && ((n -= f - (f * _ + g * x)), (o -= g - (f * C + g * k))))
								: ((E = m[6]),
								  (A = m[7]),
								  (I = m[8]),
								  (D = m[9]),
								  (z = m[10]),
								  (M = m[11]),
								  (n = m[12]),
								  (o = m[13]),
								  (a = m[14]),
								  (d = (v = Tn(E, z)) * xn),
								  v &&
										(($ = T * (w = Math.cos(-v)) + I * (y = Math.sin(-v))),
										(S = O * w + D * y),
										(P = E * w + z * y),
										(I = T * -y + I * w),
										(D = O * -y + D * w),
										(z = E * -y + z * w),
										(M = A * -y + M * w),
										(T = $),
										(O = S),
										(E = P)),
								  (c = (v = Tn(-x, z)) * xn),
								  v && ((w = Math.cos(-v)), (M = k * (y = Math.sin(-v)) + M * w), (_ = $ = _ * w - I * y), (C = S = C * w - D * y), (x = P = x * w - z * y)),
								  (l = (v = Tn(C, _)) * xn),
								  v && (($ = _ * (w = Math.cos(v)) + C * (y = Math.sin(v))), (S = T * w + O * y), (C = C * w - _ * y), (O = O * w - T * y), (_ = $), (T = S)),
								  d && 359.9 < Math.abs(d) + Math.abs(l) && ((d = l = 0), (c = 180 - c)),
								  (s = b(Math.sqrt(_ * _ + C * C + x * x))),
								  (r = b(Math.sqrt(O * O + E * E))),
								  (v = Tn(T, O)),
								  (h = 2e-4 < Math.abs(v) ? v * xn : 0),
								  (p = M ? 1 / (M < 0 ? -M : M) : 0)),
							i.svg &&
								(($ = t.getAttribute("transform")), (i.forceCSS = t.setAttribute("transform", "") || !Gt(Lt(t, In))), $ && t.setAttribute("transform", $))),
						90 < Math.abs(h) &&
							Math.abs(h) < 270 &&
							(L ? ((s *= -1), (h += l <= 0 ? 180 : -180), (l += l <= 0 ? 180 : -180)) : ((r *= -1), (h += h <= 0 ? 180 : -180))),
						(i.x =
							n -
							((i.xPercent = n && (i.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-n) ? -50 : 0))) ? (t.offsetWidth * i.xPercent) / 100 : 0) +
							"px"),
						(i.y =
							o -
							((i.yPercent = o && (i.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-o) ? -50 : 0))) ? (t.offsetHeight * i.yPercent) / 100 : 0) +
							"px"),
						(i.z = a + "px"),
						(i.scaleX = b(s)),
						(i.scaleY = b(r)),
						(i.rotation = b(l) + F),
						(i.rotationX = b(d) + F),
						(i.rotationY = b(c) + F),
						(i.skewX = h + F),
						(i.skewY = u + F),
						(i.transformPerspective = p + "px"),
						(i.zOrigin = parseFloat(H.split(" ")[2]) || 0) && (R[Dn] = Bn(H)),
						(i.xOffset = i.yOffset = 0),
						(i.force3D = Ie.force3D),
						(i.renderTransform = i.svg ? Un : nn ? Wn : jn),
						(i.uncache = 0),
						i
					);
				},
				Bn = function (t) {
					return (t = t.split(" "))[0] + " " + t[1];
				},
				jn = function (t, e) {
					(e.z = "0px"), (e.rotationY = e.rotationX = "0deg"), (e.force3D = 0), Wn(t, e);
				},
				Nn = "0deg",
				qn = "0px",
				Vn = ") ",
				Wn = function (t, e) {
					var i = e || this,
						n = i.xPercent,
						o = i.yPercent,
						a = i.x,
						s = i.y,
						r = i.z,
						l = i.rotation,
						d = i.rotationY,
						c = i.rotationX,
						h = i.skewX,
						u = i.skewY,
						p = i.scaleX,
						f = i.scaleY,
						g = i.transformPerspective,
						m = i.force3D,
						v = i.target,
						w = i.zOrigin,
						y = "",
						b = ("auto" === m && t && 1 !== t) || !0 === m;
					if (w && (c !== Nn || d !== Nn)) {
						var _,
							C = parseFloat(d) * kn,
							x = Math.sin(C),
							k = Math.cos(C);
						(C = parseFloat(c) * kn), (_ = Math.cos(C)), (a = te(v, a, x * _ * -w)), (s = te(v, s, -Math.sin(C) * -w)), (r = te(v, r, k * _ * -w + w));
					}
					g !== qn && (y += "perspective(" + g + Vn),
						(n || o) && (y += "translate(" + n + "%, " + o + "%) "),
						(!b && a === qn && s === qn && r === qn) ||
							(y += r !== qn || b ? "translate3d(" + a + ", " + s + ", " + r + ") " : "translate(" + a + ", " + s + Vn),
						l !== Nn && (y += "rotate(" + l + Vn),
						d !== Nn && (y += "rotateY(" + d + Vn),
						c !== Nn && (y += "rotateX(" + c + Vn),
						(h === Nn && u === Nn) || (y += "skew(" + h + ", " + u + Vn),
						(1 === p && 1 === f) || (y += "scale(" + p + ", " + f + Vn),
						(v.style[In] = y || "translate(0, 0)");
				},
				Un = function (t, e) {
					var i,
						n,
						o,
						a,
						s,
						r = e || this,
						l = r.xPercent,
						d = r.yPercent,
						c = r.x,
						h = r.y,
						u = r.rotation,
						p = r.skewX,
						f = r.skewY,
						g = r.scaleX,
						m = r.scaleY,
						v = r.target,
						w = r.xOrigin,
						y = r.yOrigin,
						_ = r.xOffset,
						C = r.yOffset,
						x = r.forceCSS,
						k = parseFloat(c),
						T = parseFloat(h);
					(u = parseFloat(u)),
						(p = parseFloat(p)),
						(f = parseFloat(f)) && ((p += f = parseFloat(f)), (u += f)),
						u || p
							? ((u *= kn),
							  (p *= kn),
							  (i = Math.cos(u) * g),
							  (n = Math.sin(u) * g),
							  (o = Math.sin(u - p) * -m),
							  (a = Math.cos(u - p) * m),
							  p &&
									((f *= kn),
									(s = Math.tan(p - f)),
									(o *= s = Math.sqrt(1 + s * s)),
									(a *= s),
									f && ((s = Math.tan(f)), (i *= s = Math.sqrt(1 + s * s)), (n *= s))),
							  (i = b(i)),
							  (n = b(n)),
							  (o = b(o)),
							  (a = b(a)))
							: ((i = g), (a = m), (n = o = 0)),
						((k && !~(c + "").indexOf("px")) || (T && !~(h + "").indexOf("px"))) && ((k = Wt(v, "x", c, "px")), (T = Wt(v, "y", h, "px"))),
						(w || y || _ || C) && ((k = b(k + w - (w * i + y * o) + _)), (T = b(T + y - (w * n + y * a) + C))),
						(l || d) && ((s = v.getBBox()), (k = b(k + (l / 100) * s.width)), (T = b(T + (d / 100) * s.height))),
						(s = "matrix(" + i + "," + n + "," + o + "," + a + "," + k + "," + T + ")"),
						v.setAttribute("transform", s),
						x && (v.style[In] = s);
				};
			y("padding,margin,Width,Radius", function (t, e) {
				var i = "Right",
					n = "Bottom",
					o = "Left",
					a = (e < 3 ? ["Top", i, n, o] : ["Top" + o, "Top" + i, n + i, n + o]).map(function (i) {
						return e < 2 ? t + i : "border" + i + t;
					});
				Rn[1 < e ? "border" + t : t] = function (t, e, i, n, o) {
					var s, r;
					if (arguments.length < 4)
						return (
							(s = a.map(function (e) {
								return Ut(t, e, i);
							})),
							5 === (r = s.join(" ")).split(s[0]).length ? s[0] : r
						);
					(s = (n + "").split(" ")),
						(r = {}),
						a.forEach(function (t, e) {
							return (r[t] = s[e] = s[e] || s[((e - 1) / 2) | 0]);
						}),
						t.init(e, r, o);
				};
			});
			var Qn,
				Yn,
				Xn,
				Gn = {
					name: "css",
					register: Ft,
					targetTest: function (t) {
						return t.style && t.nodeType;
					},
					init: function (t, e, i, o, a) {
						var s,
							r,
							l,
							d,
							c,
							h,
							p,
							f,
							g,
							m,
							v,
							w,
							y,
							b,
							_,
							C = this._props,
							x = t.style,
							k = i.vars.startAt;
						for (p in (Ki || Ft(), e))
							if ("autoRound" !== p && ((r = e[p]), !Ke[p] || !vt(p, e, i, o, t, a)))
								if (
									((c = typeof r),
									(h = Rn[p]),
									"function" === c && (c = typeof (r = r.call(i, o, t, a))),
									"string" === c && ~r.indexOf("random(") && (r = tt(r)),
									h)
								)
									h(this, t, p, r, i) && (_ = 1);
								else if ("--" === p.substr(0, 2))
									(s = (getComputedStyle(t).getPropertyValue(p) + "").trim()),
										(r += ""),
										(mi.lastIndex = 0),
										mi.test(s) || ((f = U(s)), (g = U(r))),
										g ? f !== g && (s = Wt(t, p, s, g) + g) : f && (r += f),
										this.add(x, "setProperty", s, r, o, a, 0, 0, p),
										C.push(p);
								else if ("undefined" !== c) {
									if (
										(k && p in k
											? ((s = "function" == typeof k[p] ? k[p].call(i, o, t, a) : k[p]),
											  n(s) && ~s.indexOf("random(") && (s = tt(s)),
											  U(s + "") || (s += Ie.units[p] || U(Ut(t, p)) || ""),
											  "=" === (s + "").charAt(1) && (s = Ut(t, p)))
											: (s = Ut(t, p)),
										(d = parseFloat(s)),
										(m = "string" === c && "=" === r.charAt(1) ? +(r.charAt(0) + "1") : 0) && (r = r.substr(2)),
										(l = parseFloat(r)),
										p in Pn &&
											("autoAlpha" === p &&
												(1 === d && "hidden" === Ut(t, "visibility") && l && (d = 0),
												Vt(this, x, "visibility", d ? "inherit" : "hidden", l ? "inherit" : "hidden", !l)),
											"scale" !== p && "transform" !== p && ~(p = Pn[p]).indexOf(",") && (p = p.split(",")[0])),
										(v = p in Cn))
									)
										if (
											(w ||
												(((y = t._gsap).renderTransform && !e.parseTransform) || Hn(t, e.parseTransform),
												(b = !1 !== e.smoothOrigin && y.smooth),
												((w = this._pt = new Qi(this._pt, x, In, 0, 1, y.renderTransform, y, 0, -1)).dep = 1)),
											"scale" === p)
										)
											(this._pt = new Qi(this._pt, y, "scaleY", y.scaleY, (m ? m * l : l - y.scaleY) || 0)), C.push("scaleY", p), (p += "X");
										else {
											if ("transformOrigin" === p) {
												(r = Yt(r)),
													y.svg
														? Kt(t, r, 0, b, 0, this)
														: ((g = parseFloat(r.split(" ")[2]) || 0) !== y.zOrigin && Vt(this, y, "zOrigin", y.zOrigin, g), Vt(this, x, p, Bn(s), Bn(r)));
												continue;
											}
											if ("svgOrigin" === p) {
												Kt(t, r, 1, b, 0, this);
												continue;
											}
											if (p in Fn) {
												ee(this, y, p, d, r, m);
												continue;
											}
											if ("smoothOrigin" === p) {
												Vt(this, y, "smooth", y.smooth, r);
												continue;
											}
											if ("force3D" === p) {
												y[p] = r;
												continue;
											}
											if ("transform" === p) {
												ne(this, r, t);
												continue;
											}
										}
									else p in x || (p = An(p) || p);
									if (v || ((l || 0 === l) && (d || 0 === d) && !Sn.test(r) && p in x))
										(l = l || 0),
											(f = (s + "").substr((d + "").length)) !== (g = U(r) || (p in Ie.units ? Ie.units[p] : f)) && (d = Wt(t, p, s, g)),
											(this._pt = new Qi(this._pt, v ? y : x, p, d, m ? m * l : l - d, v || ("px" !== g && "zIndex" !== p) || !1 === e.autoRound ? kt : $t)),
											(this._pt.u = g || 0),
											f !== g && "%" !== g && ((this._pt.b = s), (this._pt.r = Ot));
									else if (p in x) Qt.call(this, t, p, s, r);
									else {
										if (!(p in t)) {
											u(p, r);
											continue;
										}
										this.add(t, p, s || t[p], r, o, a);
									}
									C.push(p);
								}
						_ && Ui(this);
					},
					get: Ut,
					aliases: Pn,
					getSetter: function (t, e, i) {
						var n = Pn[e];
						return (
							n && n.indexOf(",") < 0 && (e = n),
							e in Cn && e !== Dn && (t._gsap.x || Ut(t, "x"))
								? i && en === i
									? "scale" === e
										? At
										: zt
									: (en = i || {}) && ("scale" === e ? Mt : Et)
								: t.style && !s(t.style[e])
								? It
								: ~e.indexOf("-")
								? Dt
								: Hi(t, e)
						);
					},
					core: { _removeProperty: qt, _getMatrix: Jt },
				};
			(Xi.utils.checkPrefix = An),
				(Xn = y(
					(Qn = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") +
						"," +
						(Yn = "rotation,rotationX,rotationY,skewX,skewY") +
						",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
					function (t) {
						Cn[t] = 1;
					}
				)),
				y(Yn, function (t) {
					(Ie.units[t] = "deg"), (Fn[t] = 1);
				}),
				(Pn[Xn[13]] = Qn + "," + Yn),
				y("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", function (t) {
					var e = t.split(":");
					Pn[e[1]] = Xn[e[0]];
				}),
				y("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (t) {
					Ie.units[t] = "px";
				}),
				Xi.registerPlugin(Gn);
			var Zn = Xi.registerPlugin(Gn) || Xi,
				Jn = Zn.core.Tween;
			(t.Back = mn),
				(t.Bounce = wn),
				(t.CSSPlugin = Gn),
				(t.Circ = _n),
				(t.Cubic = hn),
				(t.Elastic = gn),
				(t.Expo = bn),
				(t.Linear = dn),
				(t.Power0 = on),
				(t.Power1 = an),
				(t.Power2 = sn),
				(t.Power3 = rn),
				(t.Power4 = ln),
				(t.Quad = cn),
				(t.Quart = un),
				(t.Quint = pn),
				(t.Sine = yn),
				(t.SteppedEase = vn),
				(t.Strong = fn),
				(t.TimelineLite = Si),
				(t.TimelineMax = Si),
				(t.TweenLite = Ei),
				(t.TweenMax = Jn),
				(t.default = Zn),
				(t.gsap = Zn),
				"undefined" == typeof window || window !== t ? Object.defineProperty(t, "__esModule", { value: !0 }) : delete t.default;
		}),
		$("[data-title-border]").length)
	) {
		var e = $('<span class="page-header-title-border"></span>'),
			n = $("[data-title-border]"),
			o = $(window);
		n.before(e);
		var a = function () {
			e.width(n.width());
		};
		o.afterResize(function () {
			a();
		}),
			a(),
			e.addClass("visible");
	}
	(function (t) {
		var e = {
			$wrapper: t(".footer-reveal"),
			init: function () {
				var t = this;
				t.build(), t.events();
			},
			build: function () {
				var e = this,
					i = e.$wrapper.outerHeight(!0),
					n = t(window).height() - t(".header-body").height();
				i > n
					? (t("#footer").removeClass("footer-reveal"), t("body").css("margin-bottom", 0))
					: (t("#footer").addClass("footer-reveal"), t("body").css("margin-bottom", i));
			},
			events: function () {
				var e = this,
					i = t(window);
				i.on("load", function () {
					i.afterResize(function () {
						e.build();
					});
				});
			},
		};
		t(".footer-reveal").length && e.init();
	})(jQuery),
		$("[data-reinit-plugin]").length &&
			$("[data-reinit-plugin]").on("click", function (t) {
				t.preventDefault();
				var e = $(this).data("reinit-plugin"),
					i = $(this).data("reinit-plugin-function"),
					n = $(this).data("reinit-plugin-element"),
					o = theme.fn.getOptions($(this).data("reinit-plugin-options"));
				$(n).data(e).destroy(),
					setTimeout(function () {
						theme.fn.execPluginFunction(i, $(n), o);
					}, 1e3);
			}),
		$("[data-copy-to-clipboard]").length &&
			theme.fn.intObs(
				"[data-copy-to-clipboard]",
				function () {
					var t = $(this);
					t.wrap('<div class="copy-to-clipboard-wrapper position-relative"></div>');
					var e = $('<a href="#" class="btn btn-primary btn-px-2 py-1 text-0 position-absolute top-8 right-8">COPY</a>');
					t.parent().prepend(e),
						e.on("click", function (e) {
							e.preventDefault();
							var i = $(this),
								n = $('<textarea class="d-block opacity-0" style="height: 0;">');
							i.parent().append(n),
								n.val(t.text()),
								n[0].select(),
								n[0].setSelectionRange(0, 99999),
								document.execCommand("copy"),
								i.addClass("copied"),
								setTimeout(function () {
									i.removeClass("copied");
								}, 1e3),
								n.remove();
						});
				},
				{ rootMargin: "0px 0px 0px 0px" }
			),
		function (t, e) {
			t = t || {};
			var i = "__animate",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = { accX: 0, accY: -80, delay: 100, duration: "750ms", minWindowWidth: 767, forceAnimation: !1, flagClassOnly: !1 }),
				(n.prototype = {
					initialize: function (t, e) {
						return t.data(i) ? this : ((this.$el = t), this.setData().setOptions(e).build(), this);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						var t = this;
						if (t.options.flagClassOnly) {
							var i = t.options.wrapper.attr("data-appear-animation-delay") ? t.options.wrapper.attr("data-appear-animation-delay") : t.options.delay;
							return (
								t.options.wrapper.css({ "animation-delay": i + "ms", "transition-delay": i + "ms" }),
								t.options.wrapper.addClass(t.options.wrapper.attr("data-appear-animation")),
								this
							);
						}
						return (
							e("body").hasClass("loading-overlay-showing")
								? e(window).on("loading.overlay.ready", function () {
										t.animate();
								  })
								: t.animate(),
							this
						);
					},
					animate: function () {
						var i = this,
							n = this.options.wrapper,
							o = 0,
							a = this.options.duration,
							s = n.offset().top,
							r = e(window).scrollTop();
						return n.data("appear-animation-svg")
							? (n.find("[data-appear-animation]").each(function () {
									var i,
										n = e(this),
										o = t.fn.getOptions(n.data("plugin-options"));
									o && (i = o), n.themePluginAnimate(i);
							  }),
							  this)
							: i.options.firstLoadNoAnim
							? (n.removeClass("appear-animation"),
							  n.closest(".owl-carousel").get(0) &&
									setTimeout(function () {
										n.closest(".owl-carousel").on("change.owl.carousel", function () {
											(i.options.firstLoadNoAnim = !1), n.removeData("__animate"), n.themePluginAnimate(i.options);
										});
									}, 500),
							  this)
							: (n.addClass("appear-animation animated"),
							  (!e("html").hasClass("no-csstransitions") && e(window).width() > i.options.minWindowWidth && s >= r) || 1 == i.options.forceAnimation
									? ((o = n.attr("data-appear-animation-delay") ? n.attr("data-appear-animation-delay") : i.options.delay),
									  (a = n.attr("data-appear-animation-duration") ? n.attr("data-appear-animation-duration") : i.options.duration),
									  "750ms" != a && n.css("animation-duration", a),
									  n.css("animation-delay", o + "ms"),
									  n.addClass(n.attr("data-appear-animation") + " appear-animation-visible"),
									  n.trigger("animation:show"))
									: n.addClass("appear-animation-visible"),
							  this);
					},
				}),
				e.extend(t, { PluginAnimate: n }),
				(e.fn.themePluginAnimate = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__animatedLetters",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = { animationName: "fadeIn", animationSpeed: 50, startDelay: 500, minWindowWidth: 768, letterClass: "" }),
				(n.prototype = {
					initialize: function (t, e) {
						if (t.data(i)) return this;
						return (this.$el = t), (this.initialText = t.text()), this.setData().setOptions(e).build().events(), this;
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						var t = this,
							i = t.$el.text().split("");
						if (e(window).width() < t.options.minWindowWidth) return this;
						if (t.options.firstLoadNoAnim)
							return (
								t.$el.css({ visibility: "visible" }),
								t.$el.closest(".owl-carousel").get(0) &&
									setTimeout(function () {
										t.$el.closest(".owl-carousel").on("change.owl.carousel", function () {
											(t.options.firstLoadNoAnim = !1), t.build();
										});
									}, 500),
								this
							);
						if ((t.$el.addClass("initialized"), t.setMinHeight(), t.$el.text(""), "typeWriter" == t.options.animationName)) {
							t.$el.append('<span class="letters-wrapper"></span><span class="typeWriter"></pre>');
							var n = 0;
							setTimeout(function () {
								var e = function () {
									var o = setTimeout(function () {
										var o = i[n];
										t.$el
											.find(".letters-wrapper")
											.append('<span class="letter ' + (t.options.letterClass ? t.options.letterClass + " " : "") + '">' + o + "</span>"),
											n++,
											e();
									}, t.options.animationSpeed);
									n >= i.length && clearTimeout(o);
								};
								e();
							}, t.options.startDelay);
						} else
							setTimeout(function () {
								for (var e = 0; e < i.length; e++) {
									var n = i[e];
									t.$el.append(
										'<span class="letter ' +
											(t.options.letterClass ? t.options.letterClass + " " : "") +
											t.options.animationName +
											' animated" style="animation-delay: ' +
											e * t.options.animationSpeed +
											'ms;">' +
											n +
											"</span>"
									);
								}
							}, t.options.startDelay);
						return this;
					},
					setMinHeight: function () {
						var t = this;
						return (
							t.$el.closest(".owl-carousel").get(0)
								? (t.$el.closest(".owl-carousel").addClass("d-block"),
								  t.$el.css("min-height", t.$el.height()),
								  t.$el.closest(".owl-carousel").removeClass("d-block"))
								: t.$el.css("min-height", t.$el.height()),
							this
						);
					},
					destroy: function () {
						var t = this;
						return t.$el.html(t.initialText).css("min-height", ""), this;
					},
					events: function () {
						var t = this;
						return (
							t.$el.on("animated.letters.destroy", function () {
								t.destroy();
							}),
							t.$el.on("animated.letters.initialize", function () {
								t.build();
							}),
							this
						);
					},
				}),
				e.extend(t, { PluginAnimatedLetters: n }),
				(e.fn.themePluginAnimatedLetters = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__beforeafter",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = {
				default_offset_pct: 0.5,
				orientation: "horizontal",
				before_label: "Before",
				after_label: "After",
				no_overlay: !1,
				move_slider_on_hover: !1,
				move_with_handle_only: !0,
				click_to_move: !1,
			}),
				(n.prototype = {
					initialize: function (t, e) {
						return (this.$el = t), this.setData().setOptions(e).build(), this;
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						if (!e.isFunction(e.fn.twentytwenty)) return this;
						var t = this;
						return t.options.wrapper.twentytwenty(t.options), this;
					},
				}),
				e.extend(t, { PluginBeforeAfter: n }),
				(e.fn.themePluginBeforeAfter = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__carouselLight",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = { autoplay: !0, autoplayTimeout: 7e3, disableAutoPlayOnClick: !0 }),
				(n.prototype = {
					initialize: function (t, e) {
						return t.data(i)
							? this
							: ((this.$el = t), (this.clickFlag = !0), this.setData().setOptions(e).build().owlNav().owlDots().autoPlay().events(), this);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						var t = this;
						return (
							t.$el.css("opacity", 1).find(".owl-item:first-child").addClass("active"), t.$el.trigger("initialized.owl.carousel"), t.carouselNavigate(), this
						);
					},
					changeSlide: function (t) {
						var e = this,
							i = e.$el.find(".owl-item.active");
						e.$el.find(".owl-item.active").addClass("removing"),
							i.removeClass("fadeIn").addClass("fadeOut animated"),
							setTimeout(function () {
								setTimeout(function () {
									i.removeClass("active");
								}, 400),
									t.addClass("active").removeClass("fadeOut").addClass("fadeIn animated");
							}, 200),
							e.$el.find(".owl-dot").removeClass("active").eq(t.index()).addClass("active"),
							e.$el.trigger({ type: "change.owl.carousel", nextSlideIndex: t.index(), prevSlideIndex: i.index() }),
							setTimeout(function () {
								e.$el.trigger({ type: "changed.owl.carousel", nextSlideIndex: t.index(), prevSlideIndex: i.index() });
							}, 500);
					},
					owlNav: function () {
						var t = this,
							e = t.$el.find(".owl-next"),
							i = t.$el.find(".owl-prev");
						return (
							i.on("click", function (e) {
								if ((e.preventDefault(), t.options.disableAutoPlayOnClick && window.clearInterval(t.autoPlayInterval), t.avoidMultipleClicks())) return !1;
								t.owlPrev();
							}),
							e.on("click", function (e) {
								if ((e.preventDefault(), t.options.disableAutoPlayOnClick && window.clearInterval(t.autoPlayInterval), t.avoidMultipleClicks())) return !1;
								t.owlNext();
							}),
							this
						);
					},
					owlDots: function () {
						var t = this,
							i = t.$el.find(".owl-dot");
						return (
							i.on("click", function (i) {
								if (
									(($this = e(this)), i.preventDefault(), t.options.disableAutoPlayOnClick && window.clearInterval(t.autoPlayInterval), t.avoidMultipleClicks())
								)
									return !1;
								var n = e(this).index();
								if ($this.hasClass("active")) return !1;
								t.changeSlide(t.$el.find(".owl-item").eq(n));
							}),
							this
						);
					},
					owlPrev: function () {
						var t = this;
						t.$el.find(".owl-item.active").prev().get(0)
							? t.changeSlide(t.$el.find(".owl-item.active").prev())
							: t.changeSlide(t.$el.find(".owl-item:last-child"));
					},
					owlNext: function () {
						var t = this;
						t.$el.find(".owl-item.active").next().get(0) ? t.changeSlide(t.$el.find(".owl-item.active").next()) : t.changeSlide(t.$el.find(".owl-item").eq(0));
					},
					avoidMultipleClicks: function () {
						var t = this;
						return (
							!t.clickFlag ||
							(t.clickFlag &&
								((t.clickFlag = !1),
								setTimeout(function () {
									t.clickFlag = !0;
								}, 1e3)),
							!1)
						);
					},
					autoPlay: function () {
						var t = this;
						this.options.wrapper;
						return (
							t.options.autoplay &&
								(t.autoPlayInterval = window.setInterval(function () {
									t.owlNext();
								}, t.options.autoplayTimeout)),
							this
						);
					},
					carouselNavigate: function () {
						var t = this,
							i = this.options.wrapper;
						return (
							e("[data-carousel-navigate]").get(0) &&
								(e('[data-carousel-navigate-id="#' + i.attr("id") + '"]').each(function () {
									var i = e(this),
										n = e(i.data("carousel-navigate-id")).get(0),
										o = i.data("carousel-navigate-to");
									n &&
										i.on("click", function () {
											t.options.disableAutoPlayOnClick && window.clearInterval(t.autoPlayInterval), t.changeSlide(t.$el.find(".owl-item").eq(parseInt(o) - 1));
										});
								}),
								i.on("change.owl.carousel", function (t) {
									e('[data-carousel-navigate-id="#' + i.attr("id") + '"]').removeClass("active");
								}),
								i.on("changed.owl.carousel", function (t) {
									e('[data-carousel-navigate-id="#' + i.attr("id") + '"][data-carousel-navigate-to="' + (t.nextSlideIndex + 1) + '"]').addClass("active");
								})),
							this
						);
					},
					events: function () {
						var i = this;
						i.$el.on("change.owl.carousel", function (t) {
							i.$el.find("[data-appear-animation]:not(.background-image-wrapper), [data-plugin-animated-letters]").addClass("invisible"),
								i.$el.find("[data-plugin-animated-letters]").trigger("animated.letters.destroy"),
								i.$el.find(".owl-item:not(.active) [data-carousel-onchange-show]").removeClass("d-none");
						}),
							i.$el.on("changed.owl.carousel", function (n) {
								setTimeout(function () {
									i.$el.find(".owl-item.cloned [data-appear-animation]").get(0) &&
										i.$el.find(".owl-item.cloned [data-appear-animation]").each(function () {
											var i,
												n = e(this),
												o = t.fn.getOptions(n.data("plugin-options"));
											o && (i = o), n.themePluginAnimate(i);
										}),
										i.$el
											.find(".owl-item.active [data-appear-animation]:not(.background-image-wrapper), [data-plugin-animated-letters]")
											.removeClass("invisible"),
										i.$el.find(".owl-item.active [data-plugin-animated-letters]").trigger("animated.letters.initialize"),
										i.$el.find(".owl-item.cloned.active [data-plugin-video-background]").trigger("video.background.initialize");
								}, 500);
							});
					},
				}),
				e.extend(t, { PluginCarouselLight: n }),
				(e.fn.themePluginCarouselLight = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__carousel",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = {
				loop: !0,
				responsive: { 0: { items: 1 }, 479: { items: 1 }, 768: { items: 2 }, 979: { items: 3 }, 1199: { items: 4 } },
				navText: [],
				refresh: !1,
			}),
				(n.prototype = {
					initialize: function (t, n) {
						if (t.data(i)) return this;
						if (((this.$el = t), t.find("[data-icon]").get(0))) {
							var o = this;
							return (
								e(window).on("icon.rendered", function () {
									if (t.data(i)) return this;
									setTimeout(function () {
										o.setData().setOptions(n).build();
									}, 1e3);
								}),
								this
							);
						}
						return this.setData().setOptions(n).build(), this;
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						if (!e.isFunction(e.fn.owlCarousel)) return this;
						var i = this,
							n = this.options.wrapper;
						if (
							(n.addClass("owl-theme"),
							n.addClass("owl-loading"),
							"rtl" == e("html").attr("dir") && (this.options = e.extend(!0, {}, this.options, { rtl: !0 })),
							1 == this.options.items && (this.options.responsive = {}),
							this.options.items > 4 && (this.options = e.extend(!0, {}, this.options, { responsive: { 1199: { items: this.options.items } } })),
							this.options.autoHeight)
						) {
							var o = [];
							n.find(".owl-item").each(function () {
								e(this).hasClass("active") && o.push(e(this).height());
							}),
								e(window).afterResize(function () {
									n.find(".owl-stage-outer").height(Math.max.apply(null, o));
								}),
								e(window).on("load", function () {
									n.find(".owl-stage-outer").height(Math.max.apply(null, o));
								});
						}
						if (
							(n.owlCarousel(this.options).addClass("owl-carousel-init animated fadeIn"),
							setTimeout(function () {
								n.removeClass("animated fadeIn");
							}, 1e3),
							n.closest(".owl-carousel-wrapper").get(0) &&
								setTimeout(function () {
									n.closest(".owl-carousel-wrapper").css({ height: "" });
								}, 500),
							n.prev().hasClass("owl-carousel-loader") && n.prev().remove(),
							i.navigationOffsets(),
							n.hasClass("nav-outside") &&
								(e(window).on("owl.carousel.nav.outside", function () {
									e(window).width() < 992
										? ((i.options.stagePadding = 40), n.addClass("stage-margin"))
										: ((i.options.stagePadding = 0), n.removeClass("stage-margin")),
										n.owlCarousel("destroy").owlCarousel(i.options),
										i.navigationOffsets();
								}),
								e(window).on("load", function () {
									e(window).afterResize(function () {
										e(window).trigger("owl.carousel.nav.outside");
									});
								}),
								e(window).trigger("owl.carousel.nav.outside")),
							n.hasClass("nav-svg-arrows-1"))
						) {
							var a =
								'<svg version="1.1" viewBox="0 0 15.698 8.706" width="17" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon stroke="#212121" stroke-width="0.1" fill="#212121" points="11.354,0 10.646,0.706 13.786,3.853 0,3.853 0,4.853 13.786,4.853 10.646,8 11.354,8.706 15.698,4.353 "/></svg>';
							n.find(".owl-next, .owl-prev").append(a);
						}
						if (
							(n.attr("data-sync") &&
								n.on("change.owl.carousel", function (t) {
									if (t.namespace && "position" === t.property.name) {
										var i = t.relatedTarget.relative(t.property.value, !0);
										e(n.data("sync")).owlCarousel("to", i, 300, !0);
									}
								}),
							n.hasClass("carousel-center-active-item"))
						) {
							var s = n.find(".owl-item.active"),
								r = Math.floor((n.find(".owl-item.active").length - 1) / 2),
								l = s.eq(r);
							l.addClass("current"),
								n.on("change.owl.carousel", function (t) {
									n.find(".owl-item").removeClass("current"),
										setTimeout(function () {
											var t = n.find(".owl-item.active"),
												e = Math.floor((n.find(".owl-item.active").length - 1) / 2),
												i = t.eq(e);
											i.addClass("current");
										}, 100);
								}),
								n.trigger("refresh.owl.carousel");
						}
						return (
							(i.options.animateIn || i.options.animateOut) &&
								(n.on("change.owl.carousel", function (t) {
									n.find("[data-appear-animation], [data-plugin-animated-letters]").addClass("d-none"),
										n.find("[data-plugin-animated-letters]").trigger("animated.letters.destroy"),
										n.find(".owl-item:not(.active) [data-carousel-onchange-show]").removeClass("d-none");
								}),
								n.on("changed.owl.carousel", function (i) {
									setTimeout(function () {
										n.find("[data-appear-animation]").each(function () {
											var i,
												n = e(this),
												o = t.fn.getOptions(n.data("plugin-options"));
											o && (i = o), n.themePluginAnimate(i);
										}),
											n.find(".owl-item.active [data-appear-animation], [data-plugin-animated-letters]").removeClass("d-none"),
											n.find(".owl-item.active [data-plugin-animated-letters]").trigger("animated.letters.initialize"),
											n.find(".owl-item.cloned.active [data-plugin-video-background]").trigger("video.background.initialize");
									}, 10);
								})),
							n.find("[data-icon]").length &&
								n.on("change.owl.carousel drag.owl.carousel", function () {
									n.find(".owl-item.cloned [data-icon]").each(function () {
										var i,
											n = e(this),
											o = t.fn.getOptions(n.data("plugin-options"));
										o && (i = o), n.themePluginIcon(i);
									});
								}),
							n.find("[data-plugin-video-background]").get(0) && e(window).resize(),
							n.removeClass("owl-loading"),
							n.css("height", "auto"),
							i.carouselNavigate(),
							i.options.refresh && n.owlCarousel("refresh"),
							this
						);
					},
					navigationOffsets: function () {
						var t = this,
							e = this.options.wrapper,
							i = "none" != e.find(".owl-nav").css("transform"),
							n = "none" != e.find(".owl-dots").css("transform");
						return (
							t.options.navHorizontalOffset &&
								!t.options.navVerticalOffset &&
								(i
									? e.find(".owl-nav").css({ left: t.options.navHorizontalOffset })
									: e.find(".owl-nav").css({ transform: "translate3d(" + t.options.navHorizontalOffset + ", 0, 0)" })),
							t.options.navVerticalOffset &&
								!t.options.navHorizontalOffset &&
								(i
									? e.find(".owl-nav").css({ top: "calc( 50% - " + t.options.navVerticalOffset + " )" })
									: e.find(".owl-nav").css({ transform: "translate3d(0, " + t.options.navVerticalOffset + ", 0)" })),
							t.options.navVerticalOffset &&
								t.options.navHorizontalOffset &&
								(i
									? e.find(".owl-nav").css({ top: "calc( 50% - " + t.options.navVerticalOffset + " )", left: t.options.navHorizontalOffset })
									: e.find(".owl-nav").css({ transform: "translate3d(" + t.options.navHorizontalOffset + ", " + t.options.navVerticalOffset + ", 0)" })),
							t.options.dotsHorizontalOffset &&
								!t.options.dotsVerticalOffset &&
								e.find(".owl-dots").css({ transform: "translate3d(" + t.options.dotsHorizontalOffset + ", 0, 0)" }),
							t.options.dotsVerticalOffset &&
								!t.options.dotsHorizontalOffset &&
								(n
									? e.find(".owl-dots").css({ top: "calc( 50% - " + t.options.dotsVerticalOffset + " )" })
									: e.find(".owl-dots").css({ transform: "translate3d(0, " + t.options.dotsVerticalOffset + ", 0)" })),
							t.options.dotsVerticalOffset &&
								t.options.dotsHorizontalOffset &&
								e.find(".owl-dots").css({ transform: "translate3d(" + t.options.dotsHorizontalOffset + ", " + t.options.dotsVerticalOffset + ", 0)" }),
							this
						);
					},
					carouselNavigate: function () {
						var t = this.options.wrapper,
							i = t.data("owl.carousel");
						return (
							e("[data-carousel-navigate]").get(0) &&
								(e('[data-carousel-navigate-id="#' + t.attr("id") + '"]').each(function () {
									var t = e(this),
										n = e(t.data("carousel-navigate-id")).get(0),
										o = t.data("carousel-navigate-to");
									n &&
										t.on("click", function () {
											i.to(parseInt(o) - 1);
										});
								}),
								t.on("change.owl.carousel", function () {
									e('[data-carousel-navigate-id="#' + t.attr("id") + '"]').removeClass("active");
								}),
								t.on("changed.owl.carousel", function (i) {
									e('[data-carousel-navigate-id="#' + t.attr("id") + '"][data-carousel-navigate-to="' + (i.item.index + 1) + '"]').addClass("active");
								})),
							this
						);
					},
				}),
				e.extend(t, { PluginCarousel: n }),
				(e.fn.themePluginCarousel = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__chartCircular",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = {
				accX: 0,
				accY: -150,
				delay: 1,
				barColor: "#0088CC",
				trackColor: "#f2f2f2",
				scaleColor: !1,
				scaleLength: 5,
				lineCap: "round",
				lineWidth: 13,
				size: 175,
				rotate: 0,
				animate: { duration: 2500, enabled: !0 },
			}),
				(n.prototype = {
					initialize: function (t, e) {
						return t.data(i) ? this : ((this.$el = t), this.setData().setOptions(e).build(), this);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						if (!e.isFunction(e.fn.easyPieChart)) return this;
						var t = this,
							i = this.options.wrapper,
							n = i.attr("data-percent") ? i.attr("data-percent") : 0,
							o = i.find(".percent");
						return (
							e.extend(!0, t.options, {
								onStep: function (t, e, i) {
									o.html(parseInt(i));
								},
							}),
							i.attr("data-percent", 0),
							i.easyPieChart(t.options),
							setTimeout(function () {
								i.data("easyPieChart").update(n), i.attr("data-percent", n);
							}, t.options.delay),
							this
						);
					},
				}),
				e.extend(t, { PluginChartCircular: n }),
				(e.fn.themePluginChartCircular = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__countdown",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = {
				date: "2030/06/10 12:00:00",
				textDay: "DAYS",
				textHour: "HRS",
				textMin: "MIN",
				textSec: "SEC",
				uppercase: !0,
				numberClass: "",
				wrapperClass: "",
				insertHTMLbefore: "",
				insertHTMLafter: "",
			}),
				(n.prototype = {
					initialize: function (t, e) {
						return t.data(i) ? this : ((this.$el = t), this.setData().setOptions(e).build(), this);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						if (!e.isFunction(e.fn.countTo)) return this;
						var t = this,
							i = this.options.wrapper,
							n = t.options.numberClass ? " " + t.options.numberClass : "",
							o = t.options.wrapperClass ? " " + t.options.wrapperClass : "";
						return (
							t.options.uppercase,
							i.countdown(t.options.date).on("update.countdown", function (i) {
								e(this).html(
									i.strftime(
										t.options.insertHTMLbefore +
											'<span class="days' +
											o +
											'"><span class="' +
											n +
											'">%D</span> ' +
											t.options.textDay +
											'</span> <span class="hours' +
											o +
											'"><span class="' +
											n +
											'">%H</span> ' +
											t.options.textHour +
											'</span> <span class="minutes' +
											o +
											'"><span class="' +
											n +
											'">%M</span> ' +
											t.options.textMin +
											'</span> <span class="seconds' +
											o +
											'"><span class="' +
											n +
											'">%S</span> ' +
											t.options.textSec +
											"</span> " +
											t.options.insertHTMLafter
									)
								);
							}),
							this
						);
					},
				}),
				e.extend(t, { PluginCountdown: n }),
				(e.fn.themePluginCountdown = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__counter",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = {
				accX: 0,
				accY: 0,
				appendWrapper: !1,
				prependWrapper: !1,
				speed: 3e3,
				refreshInterval: 100,
				decimals: 0,
				onUpdate: null,
				onComplete: null,
			}),
				(n.prototype = {
					initialize: function (t, e) {
						return t.data(i) ? this : ((this.$el = t), this.setData().setOptions(e).build(), this);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						if (!e.isFunction(e.fn.countTo)) return this;
						var t = this,
							i = this.options.wrapper;
						return (
							e.extend(t.options, {
								onComplete: function () {
									if (i.data("append"))
										if (t.options.appendWrapper) {
											var n = e(t.options.appendWrapper);
											n.append(i.data("append")), i.html(i.html() + n[0].outerHTML);
										} else i.html(i.html() + i.data("append"));
									if (i.data("prepend"))
										if (t.options.prependWrapper) {
											var o = e(t.options.prependWrapper);
											o.append(i.data("prepend")), i.html(i.html() + o[0].outerHTML);
										} else i.html(i.data("prepend") + i.html());
								},
							}),
							i.countTo(t.options),
							this
						);
					},
				}),
				e.extend(t, { PluginCounter: n }),
				(e.fn.themePluginCounter = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__cursorEffect",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = {}),
				(n.prototype = {
					initialize: function (t, e) {
						return t.data(i) ? this : ((this.$el = t), this.setData().setOptions(e).build().events(), this);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						var t = this;
						(t.clientX = -100), (t.clientY = -100), t.options.hideMouseCursor && t.$el.addClass("hide-mouse-cursor");
						var e = document.createElement("DIV");
						e.className = "cursor-outer";
						var i = document.createElement("DIV");
						if (
							((i.className = "cursor-inner"),
							t.options.cursorOuterColor && (e.style = "border-color: " + t.options.cursorOuterColor + ";"),
							t.options.cursorInnerColor && (i.style = "background-color: " + t.options.cursorInnerColor + ";"),
							t.options.size)
						)
							switch (t.options.size) {
								case "small":
									t.$el.addClass("cursor-effect-size-small");
									break;
								case "big":
									t.$el.addClass("cursor-effect-size-big");
							}
						t.options.style && t.$el.addClass(t.options.style), document.body.prepend(e), document.body.prepend(i);
						var n = function () {
							(e.style.transform = "translate(" + t.clientX + "px, " + t.clientY + "px)"),
								(i.style.transform = "translate(" + t.clientX + "px, " + t.clientY + "px)"),
								(t.loopInside = requestAnimationFrame(n));
						};
						return (t.loop = requestAnimationFrame(n)), this;
					},
					events: function () {
						var t = this,
							i = e(".cursor-outer"),
							n = e(".cursor-inner"),
							o = i[0].getBoundingClientRect(),
							a = i.css("border-radius");
						return (
							document.addEventListener("mousemove", function (e) {
								t.isStuck || ((t.clientX = e.clientX - 20), (t.clientY = e.clientY - 20)), i.removeClass("opacity-0");
							}),
							(t.isStuck = !1),
							e("[data-cursor-effect-hover]").on("mouseenter", function (o) {
								i.addClass("cursor-outer-hover"), n.addClass("cursor-inner-hover");
								var a = e(this).data("cursor-effect-hover-color");
								switch ((i.addClass("cursor-color-" + a), n.addClass("cursor-color-" + a), e(this).data("cursor-effect-hover"))) {
									case "fit":
										var s = e(this)[0].getBoundingClientRect();
										(t.clientX = s.x),
											(t.clientY = s.y),
											i.css({ width: s.width, height: s.height, "border-radius": e(this).css("border-radius") }).addClass("cursor-outer-fit"),
											n.addClass("opacity-0"),
											(t.isStuck = !0);
										break;
									case "plus":
										n.addClass("cursor-inner-plus");
								}
							}),
							e("[data-cursor-effect-hover]").on("mouseleave", function () {
								i.removeClass("cursor-outer-hover"), n.removeClass("cursor-inner-hover");
								var s = e(this).data("cursor-effect-hover-color");
								switch ((i.removeClass("cursor-color-" + s), n.removeClass("cursor-color-" + s), e(this).data("cursor-effect-hover"))) {
									case "fit":
										i.css({ width: o.width, height: o.height, "border-radius": a }).removeClass("cursor-outer-fit"),
											n.removeClass("opacity-0"),
											(t.isStuck = !1);
										break;
									case "plus":
										n.removeClass("cursor-inner-plus");
								}
							}),
							e(window).on("scroll", function () {
								i.hasClass("cursor-outer-fit") && i.addClass("opacity-0").removeClass("cursor-outer-fit");
							}),
							this
						);
					},
					destroy: function () {
						var t = this;
						t.$el.removeClass("hide-mouse-cursor cursor-effect-size-small cursor-effect-size-big cursor-effect-style-square"),
							cancelAnimationFrame(t.loop),
							cancelAnimationFrame(t.loopInside),
							document.querySelector(".cursor-outer").remove(),
							document.querySelector(".cursor-inner").remove(),
							t.$el.removeData(i, t);
					},
				}),
				e.extend(t, { PluginCursorEffect: n }),
				(e.fn.themePluginCursorEffect = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			"use strict";
			t = t || {};
			var i = "__floatElement",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = { startPos: "top", speed: 3, horizontal: !1, isInsideSVG: !1, transition: !1, transitionDelay: 0, transitionDuration: 500 }),
				(n.prototype = {
					initialize: function (t, e) {
						return t.data(i) ? this : ((this.$el = t), this.setData().setOptions(e).build(), this);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						var i,
							n = this,
							o = this.options.wrapper,
							a = e(window);
						return o.data("plugin-float-element-svg")
							? (o.find("[data-plugin-float-element]").each(function () {
									var i,
										n = e(this),
										o = t.fn.getOptions(n.data("plugin-options"));
									o && (i = o), n.themePluginFloatElement(i);
							  }),
							  this)
							: (n.options.style && o.attr("style", n.options.style),
							  a.width() > 767 &&
									("none" == n.options.startPos ? (i = "") : "top" == n.options.startPos ? (o.css({ top: 0 }), (i = "")) : (o.css({ bottom: 0 }), (i = "-")),
									n.options.transition &&
										o.css({ transition: "ease-out transform " + n.options.transitionDuration + "ms " + n.options.transitionDelay + "ms" }),
									n.movement(i),
									a.on("scroll", function () {
										n.movement(i);
									})),
							  this);
					},
					movement: function (t) {
						var i = this,
							n = this.options.wrapper,
							o = e(window),
							a = o.scrollTop(),
							s = n.offset().top,
							r = s - a,
							l = i.options.isInsideSVG ? 2 : 100,
							d = (l * r) / o.height();
						n.visible(!0) &&
							(i.options.horizontal
								? n.css({ transform: "translate3d(" + t + d / i.options.speed + "%, " + t + d / i.options.speed + "%, 0)" })
								: n.css({ transform: "translate3d(0, " + t + d / i.options.speed + "%, 0)" }));
					},
				}),
				e.extend(t, { PluginFloatElement: n }),
				(e.fn.themePluginFloatElement = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__gdpr",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = { cookieBarShowDelay: 3e3 }),
				(n.prototype = {
					initialize: function (t, e) {
						return (this.$el = t), this.setData().setOptions(e).build().events(), this;
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						var t = this;
						if (
							(e.cookie("porto-privacy-bar") ||
								setTimeout(function () {
									t.options.wrapper.addClass("show");
								}, t.options.cookieBarShowDelay),
							e.cookie("porto-gdpr-preferences"))
						)
							for (var i = e.cookie("porto-gdpr-preferences").split(","), n = 0; n < i.length; n++)
								e('input[value="' + i[n] + '"]').get(0) &&
									e('input[value="' + i[n] + '"]').is(":checkbox") &&
									e('input[value="' + i[n] + '"]').prop("checked", !0);
						return this;
					},
					events: function () {
						var i = this;
						return (
							i.options.wrapper.find(".gdpr-agree-trigger").on("click", function (t) {
								t.preventDefault(),
									e(".gdpr-preferences-form")
										.find(".gdpr-input")
										.each(function () {
											(e(this).is(":checkbox") || e(this).is(":hidden")) && e(this).prop("checked", !0);
										}),
									e(".gdpr-preferences-form").trigger("submit").removeClass("show"),
									i.removeCookieBar();
							}),
							i.options.wrapper.find(".gdpr-preferences-trigger").on("click", function (t) {
								t.preventDefault(), e(".gdpr-preferences-popup").addClass("show");
							}),
							e(".gdpr-close-popup").on("click", function (t) {
								t.preventDefault(), e(".gdpr-preferences-popup").removeClass("show");
							}),
							e(".gdpr-preferences-popup").on("click", function (t) {
								e(t.target).closest(".gdpr-preferences-popup-content").get(0) || e(".gdpr-preferences-popup").removeClass("show");
							}),
							e(".gdpr-preferences-form").on("submit", function (n) {
								n.preventDefault();
								var o = e(this);
								o.find('button[type="submit"]').text("SAVING...");
								var a = [];
								o.find(".gdpr-input").each(function () {
									((e(this).is(":checkbox") && e(this).is(":checked")) || e(this).is(":hidden")) && a.push(e(this).val());
								}),
									e.cookie("porto-privacy-bar", !0),
									setTimeout(function () {
										o.find('button[type="submit"]').text("SAVED!").removeClass("btn-primary").addClass("btn-success"),
											setTimeout(function () {
												e(".gdpr-preferences-popup").removeClass("show"),
													i.removeCookieBar(),
													o.find('button[type="submit"]').text("SAVE PREFERENCES").removeClass("btn-success").addClass("btn-primary"),
													e.cookie("porto-gdpr-preferences")
														? (e.cookie("porto-gdpr-preferences", a), location.reload())
														: (e.cookie("porto-gdpr-preferences", a),
														  e.isFunction(e.fn.themePluginGDPRWrapper) &&
																e("[data-plugin-gdpr-wrapper]").length &&
																e(function () {
																	e("[data-plugin-gdpr-wrapper]:not(.manual)").each(function () {
																		var i,
																			n = e(this);
																		n.removeData("__gdprwrapper");
																		var o = t.fn.getOptions(n.data("plugin-options"));
																		o && (i = o), n.themePluginGDPRWrapper(i);
																	});
																}));
											}, 500);
									}, 1e3);
							}),
							e(".gdpr-reset-cookies").on("click", function (t) {
								t.preventDefault(), i.clearCookies(), location.reload();
							}),
							e(".gdpr-open-preferences").on("click", function (t) {
								t.preventDefault(), e(".gdpr-preferences-popup").toggleClass("show");
							}),
							this
						);
					},
					removeCookieBar: function () {
						var t = this;
						return (
							t.options.wrapper.addClass("removing").on("transitionend", function () {
								setTimeout(function () {
									t.options.wrapper.removeClass("show removing");
								}, 500);
							}),
							this
						);
					},
					clearCookies: function () {
						return e.removeCookie("porto-privacy-bar"), e.removeCookie("porto-gdpr-preferences"), this;
					},
				}),
				e.extend(t, { PluginGDPR: n }),
				(e.fn.themePluginGDPR = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__gdprwrapper",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = {}),
				(n.prototype = {
					initialize: function (t, e) {
						return (this.$el = t), this.setData().setOptions(e).build(), this;
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						var t = this;
						return (
							e.cookie("porto-gdpr-preferences") && -1 != e.cookie("porto-gdpr-preferences").indexOf(t.options.checkCookie)
								? e.ajax({
										url: t.options.ajaxURL,
										cache: !1,
										complete: function (e) {
											setTimeout(function () {
												t.options.wrapper.html(e.responseText).addClass("show");
											}, 1e3);
										},
								  })
								: t.options.wrapper.addClass("show"),
							this
						);
					},
				}),
				e.extend(t, { PluginGDPRWrapper: n }),
				(e.fn.themePluginGDPRWrapper = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__hoverEffect",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = {
				effect: "magnetic",
				magneticMx: 0.15,
				magneticMy: 0.3,
				magneticDeg: 12,
				selector: ".thumb-info, .hover-effect-3d-wrapper",
				sensitivity: 20,
			}),
				(n.prototype = {
					initialize: function (t, e) {
						return t.data(i) ? this : ((this.$el = t), this.setData().setOptions(e).build(), this);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						var t = this;
						return (
							t.$el.hasClass("hover-effect-3d") && (t.options.effect = "3d"),
							"magnetic" == t.options.effect && t.magnetic(),
							"3d" == t.options.effect && t.hover3d(),
							this
						);
					},
					magnetic: function () {
						var t = this;
						return (
							t.$el.mousemove(function (e) {
								const i = this.getBoundingClientRect(),
									n = e.clientX - i.left - i.width / 2,
									o = e.clientY - i.top - i.height / 2;
								this.style.transform = "translate(" + n * t.options.magneticMx + "px, " + o * t.options.magneticMx + "px)";
							}),
							t.$el.mouseleave(function (t) {
								this.style.transform = "translate3d(0px, 0px, 0px)";
							}),
							this
						);
					},
					hover3d: function () {
						var t = this;
						return e.isFunction(e.fn.hover3d) && t.$el.hover3d({ selector: t.options.selector, sensitivity: t.options.sensitivity }), this;
					},
				}),
				e.extend(t, { PluginHoverEffect: n }),
				(e.fn.themePluginHoverEffect = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			"use strict";
			t = t || {};
			var i = "__icon",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = { color: "#2388ED", animated: !1, delay: 300, onlySVG: !1, removeClassAfterInit: !1, fadeIn: !0, accY: 0 }),
				(n.prototype = {
					initialize: function (t, e) {
						return t.data(i) ? this : ((this.$el = t), this.setData().setOptions(e).build(), this);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						var t = this,
							i = this.options.wrapper,
							n = t.options.color,
							o = i.offset().top,
							a = e(window).scrollTop(),
							s = t.options.animated && !t.options.strokeBased ? 200 : 100;
						if ("file:" === window.location.protocol)
							return (
								i.css({ opacity: 1, width: i.attr("width") }),
								t.options.extraClass && i.addClass(t.options.extraClass),
								t.options.extraClass.indexOf("-color-light") > 0 && i.css({ filter: "invert(1)" }),
								void e(window).trigger("icon.rendered")
							);
						t.options.duration && (s = t.options.duration);
						e.get({
							url: i.attr("src"),
							success: function (r, l, d) {
								var c = t.options.fadeIn
										? e('<div class="animated-icon animated fadeIn">' + d.responseText + "</div>")
										: e('<div class="animated-icon animated">' + d.responseText + "</div>"),
									h = "icon_" + Math.floor(26 * Math.random()) + Date.now();
								if (
									(c.find("svg").attr("id", h),
									c.find("svg").attr(
										"data-filename",
										i
											.attr("src")
											.split(/(\\|\/)/g)
											.pop()
									),
									i.attr("width") && c.find("svg").attr("width", i.attr("width")).attr("height", i.attr("width")),
									i.attr("height") && c.find("svg").attr("height", i.attr("height")),
									t.options.svgViewBox && c.find("svg").attr("viewBox", t.options.svgViewBox),
									i.replaceWith(c),
									t.options.extraClass && c.addClass(t.options.extraClass),
									t.options.removeClassAfterInit && c.removeClass(t.options.removeClassAfterInit),
									t.options.onlySVG)
								)
									return e(window).trigger("icon.rendered"), this;
								i = c;
								var u = new Vivus(h, {
									start: "manual",
									type: "sync",
									selfDestroy: !0,
									duration: s,
									onReady: function (i) {
										var o = document.createElementNS("http://www.w3.org/2000/svg", "style"),
											a = "";
										((t.options.animated && !t.options.strokeBased) || (!t.options.animated && n && !t.options.strokeBased)) &&
											((a = "stroke-width: 0.1px; fill-opacity: 0; transition: ease fill-opacity 300ms;"),
											(o.textContent =
												"#" +
												h +
												" path, #" +
												h +
												" line, #" +
												h +
												" rect, #" +
												h +
												" circle, #" +
												h +
												" polyline { fill: " +
												n +
												"; stroke: " +
												n +
												"; " +
												a +
												(t.options.svgStyle ? t.options.svgStyle : "") +
												" } .finished path { fill-opacity: 1; }"),
											i.el.appendChild(o)),
											((t.options.animated && t.options.strokeBased) || (!t.options.animated && n && t.options.strokeBased)) &&
												((o.textContent =
													"#" +
													h +
													" path, #" +
													h +
													" line, #" +
													h +
													" rect, #" +
													h +
													" circle, #" +
													h +
													" polyline { stroke: " +
													n +
													"; " +
													(t.options.svgStyle ? t.options.svgStyle : "") +
													"}"),
												i.el.appendChild(o)),
											e.event.trigger("theme.plugin.icon.svg.ready");
									},
								});
								t.options.animated ||
									(setTimeout(function () {
										u.finish();
									}, 10),
									i.css({ opacity: 1 })),
									t.options.animated && e(window).width() > 767
										? (i.visible(!0) ? t.startIconAnimation(u, i) : o < a && t.startIconAnimation(u, i),
										  e(window).on("scroll", function () {
												i.visible(!0) && t.startIconAnimation(u, i);
										  }))
										: (i.css({ opacity: 1 }),
										  u.finish(),
										  e(window).on("theme.plugin.icon.svg.ready", function () {
												setTimeout(function () {
													u.el.setAttribute("class", "finished"), u.finish();
												}, 300);
										  })),
									e(window).trigger("icon.rendered");
							},
						});
						return this;
					},
					startIconAnimation: function (t, i) {
						var n = this;
						e({ to: 0 }).animate({ to: 1 }, n.options.strokeBased ? n.options.delay : n.options.delay + 300, function () {
							i.css({ opacity: 1 });
						}),
							e({ to: 0 }).animate({ to: 1 }, n.options.delay, function () {
								t.play(1),
									setTimeout(function () {
										t.el.setAttribute("class", "finished");
									}, 5 * t.duration);
							});
					},
				}),
				e.extend(t, { PluginIcon: n }),
				(e.fn.themePluginIcon = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__lightbox",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = {
				tClose: "Close (Esc)",
				tLoading: "Loading...",
				gallery: { tPrev: "Previous (Left arrow key)", tNext: "Next (Right arrow key)", tCounter: "%curr% of %total%" },
				image: { tError: '<a href="%url%">The image</a> could not be loaded.' },
				ajax: { tError: '<a href="%url%">The content</a> could not be loaded.' },
				callbacks: {
					open: function () {
						e("html").addClass("lightbox-opened");
					},
					close: function () {
						e("html").removeClass("lightbox-opened");
					},
				},
			}),
				(n.prototype = {
					initialize: function (t, e) {
						return t.data(i) ? this : ((this.$el = t), this.setData().setOptions(e).build(), this);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						return e.isFunction(e.fn.magnificPopup) ? (this.options.wrapper.magnificPopup(this.options), this) : this;
					},
				}),
				e.extend(t, { PluginLightbox: n }),
				(e.fn.themePluginLightbox = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			"use strict";
			t = t || {};
			var i = [
					'<div class="loading-overlay">',
					'<div class="bounce-loader"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>',
					"</div>",
				].join(""),
				n = [
					'<div class="loading-overlay loading-overlay-percentage">',
					'<div class="page-loader-progress-wrapper"><span class="page-loader-progress">0</span><span class="page-loader-progress-symbol">%</span></div>',
					"</div>",
				].join(""),
				o = [
					'<div class="loading-overlay">',
					'<div class="bounce-loader"><div class="cssload-thecube"><div class="cssload-cube cssload-c1"></div><div class="cssload-cube cssload-c2"></div><div class="cssload-cube cssload-c4"></div><div class="cssload-cube cssload-c3"></div></div></div>',
					"</div>",
				].join(""),
				a = [
					'<div class="loading-overlay">',
					'<div class="bounce-loader"><span class="cssload-cube-progress"><span class="cssload-cube-progress-inner"></span></span></div>',
					"</div>",
				].join(""),
				s = [
					'<div class="loading-overlay">',
					'<div class="bounce-loader"><div class="cssload-float-rings-loader"><div class="cssload-float-rings-inner cssload-one"></div><div class="cssload-float-rings-inner cssload-two"></div><div class="cssload-float-rings-inner cssload-three"></div></div></div>',
					"</div>",
				].join(""),
				r = [
					'<div class="loading-overlay">',
					'<div class="bounce-loader"><div class="cssload-float-bars-container"><ul class="cssload-float-bars-flex-container"><li><span class="cssload-float-bars-loading"></span></li></div></div></div>',
					"</div>",
				].join(""),
				l = [
					'<div class="loading-overlay">',
					'<div class="bounce-loader"><div class="cssload-speeding-wheel-container"><div class="cssload-speeding-wheel"></div></div></div>',
					"</div>",
				].join(""),
				d = [
					'<div class="loading-overlay">',
					'<div class="bounce-loader"><div class="cssload-zenith-container"><div class="cssload-zenith"></div></div></div>',
					"</div>",
				].join(""),
				c = ['<div class="loading-overlay">', '<div class="bounce-loader"><div class="cssload-spinning-square-loading"></div></div>', "</div>"].join(""),
				h = [
					'<div class="loading-overlay">',
					'<div class="bounce-loader"><div class="wrapper-pulse"><div class="cssload-pulse-loader"></div></div></div>',
					"</div>",
				].join(""),
				u = function (t, e, i) {
					return this.initialize(t, e, i);
				};
			(u.prototype = {
				options: { css: {}, hideDelay: 500, progressMinTimeout: 0, effect: "default" },
				initialize: function (t, e, i) {
					(this.$wrapper = t), this.setVars().setOptions(e, i).build().events().dynamicShowHideEvents(), this.$wrapper.data("loadingOverlay", this);
				},
				setVars: function () {
					return (
						(this.$overlay = this.$wrapper.find(".loading-overlay")), (this.pageStatus = null), (this.progress = null), (this.animationInterval = 33), this
					);
				},
				setOptions: function (i, n) {
					return (
						this.$overlay.get(0) || this.matchProperties(),
						(this.options = n ? e.extend(!0, {}, this.options, i) : e.extend(!0, {}, this.options, i, t.fn.getOptions(this.$wrapper.data("plugin-options")))),
						(this.loaderClass = this.getLoaderClass(this.options.css.backgroundColor)),
						this
					);
				},
				build: function () {
					var t = this;
					if (!this.$overlay.closest(document.documentElement).get(0)) {
						if (this.$cachedOverlay) this.$overlay = this.$cachedOverlay.clone();
						else {
							switch (t.options.effect) {
								case "percentageProgress1":
									this.$overlay = e(n).clone();
									break;
								case "percentageProgress2":
									(this.$overlay = e(n).clone()),
										this.$overlay.addClass("loading-overlay-percentage-effect-2").prepend('<div class="loading-overlay-background-layer"></div>');
									break;
								case "cubes":
									this.$overlay = e(o).clone();
									break;
								case "cubeProgress":
									this.$overlay = e(a).clone();
									break;
								case "floatRings":
									this.$overlay = e(s).clone();
									break;
								case "floatBars":
									this.$overlay = e(r).clone();
									break;
								case "speedingWheel":
									this.$overlay = e(l).clone();
									break;
								case "zenith":
									this.$overlay = e(d).clone();
									break;
								case "spinningSquare":
									this.$overlay = e(c).clone();
									break;
								case "pulse":
									this.$overlay = e(h).clone();
									break;
								case "default":
								default:
									this.$overlay = e(i).clone();
							}
							this.options.css && (this.$overlay.css(this.options.css), this.$overlay.find(".loader").addClass(this.loaderClass));
						}
						this.$wrapper.prepend(this.$overlay);
					}
					return (
						this.$cachedOverlay || (this.$cachedOverlay = this.$overlay.clone()),
						["percentageProgress1", "percentageProgress2"].includes(t.options.effect) &&
							(t.updateProgress(),
							t.options.isDynamicHideShow &&
								setTimeout(function () {
									(t.progress = "complete"),
										e(".page-loader-progress").text(100),
										["percentageProgress2"].includes(t.options.effect) && e(".loading-overlay-background-layer").css({ width: "100%" });
								}, 2800)),
						this
					);
				},
				events: function () {
					var t = this;
					return (
						this.options.startShowing && t.show(),
						(this.$wrapper.is("body") || this.options.hideOnWindowLoad) &&
							e(window).on("load error", function () {
								setTimeout(function () {
									t.hide();
								}, t.options.progressMinTimeout);
							}),
						this.options.listenOn &&
							e(this.options.listenOn)
								.on("loading-overlay:show beforeSend.ic", function (e) {
									e.stopPropagation(), t.show();
								})
								.on("loading-overlay:hide complete.ic", function (e) {
									e.stopPropagation(), t.hide();
								}),
						this.$wrapper
							.on("loading-overlay:show beforeSend.ic", function (e) {
								return e.target === t.$wrapper.get(0) && (e.stopPropagation(), t.show(), !0);
							})
							.on("loading-overlay:hide complete.ic", function (e) {
								return e.target === t.$wrapper.get(0) && (e.stopPropagation(), t.hide(), !0);
							}),
						["percentageProgress1", "percentageProgress2"].includes(t.options.effect) &&
							e(window).on("load", function () {
								setTimeout(function () {
									(t.pageStatus = "complete"),
										e(".page-loader-progress").text(100),
										["percentageProgress2"].includes(t.options.effect) && e(".loading-overlay-background-layer").css({ width: "100%" });
								}, t.options.progressMinTimeout);
							}),
						this
					);
				},
				show: function () {
					this.build(),
						(this.position = this.$wrapper.css("position").toLowerCase()),
						("relative" == this.position && "absolute" == this.position && "fixed" == this.position) || this.$wrapper.css({ position: "relative" }),
						this.$wrapper.addClass("loading-overlay-showing");
				},
				hide: function () {
					var t = this;
					setTimeout(function () {
						t.$wrapper.removeClass("loading-overlay-showing"),
							("relative" == this.position && "absolute" == this.position && "fixed" == this.position) || t.$wrapper.css({ position: "" }),
							e(window).trigger("loading.overlay.ready");
					}, t.options.hideDelay);
				},
				updateProgress: function () {
					var t = this,
						i = function () {
							"complete" == t.pageStatus
								? (e(".page-loader-progress").text(100),
								  setTimeout(function () {
										e(".page-loader-progress").addClass("d-none");
								  }, 700))
								: (null == t.progress && (t.progress = 1),
								  (t.progress = t.progress + 1),
								  t.progress >= 0 && t.progress <= 30
										? ((t.animationInterval += 1), e(".page-loader-progress").text(t.progress))
										: t.progress > 30 && t.progress <= 60
										? ((t.animationInterval += 2), e(".page-loader-progress").text(t.progress))
										: t.progress > 60 && t.progress <= 80
										? ((t.animationInterval += 40), e(".page-loader-progress").text(t.progress))
										: t.progress > 80 && t.progress <= 90
										? ((t.animationInterval += 80), e(".page-loader-progress").text(t.progress))
										: t.progress > 90 && t.progress <= 95
										? ((t.animationInterval += 150), e(".page-loader-progress").text(t.progress))
										: t.progress > 95 && t.progress <= 99
										? ((t.animationInterval += 400), e(".page-loader-progress").text(t.progress))
										: t.progress >= 100 && e(".page-loader-progress").text(99),
								  ["percentageProgress2"].includes(t.options.effect) && e(".loading-overlay-background-layer").css({ width: t.progress + "%" }),
								  (self.loopInside = setTimeout(i, t.animationInterval)));
						};
					return i(), this;
				},
				matchProperties: function () {
					var t, i, n;
					for (n = ["backgroundColor", "borderRadius"], i = n.length, t = 0; t < i; t++) {
						var o = {};
						(o[n[t]] = this.$wrapper.css(n[t])), e.extend(this.options.css, o);
					}
				},
				getLoaderClass: function (t) {
					if (!t || "transparent" === t || "inherit" === t) return "black";
					var e,
						i,
						n,
						o,
						a,
						s = function (t) {
							var e, i;
							return (
								t.indexOf("#") > -1
									? (e = t.replace("#", ""))
									: ((i = t.match(/\d+/g)),
									  (e =
											("0" + parseInt(i[0], 10).toString(16)).slice(-2) +
											("0" + parseInt(i[1], 10).toString(16)).slice(-2) +
											("0" + parseInt(i[2], 10).toString(16)).slice(-2))),
								3 === e.length && (e += e),
								e
							);
						};
					return (
						(e = s(t)),
						(i = parseInt(e.substr(0, 2), 16)),
						(n = parseInt(e.substr(2, 2), 16)),
						(o = parseInt(e.substr(4, 2), 16)),
						(a = (299 * i + 587 * n + 114 * o) / 1e3),
						a >= 128 ? "black" : "white"
					);
				},
				dynamicShowHide: function (t) {
					return (
						e("body").removeData("loadingOverlay"),
						e(".loading-overlay").remove(),
						"" == t
							? this
							: (e("body").loadingOverlay({ effect: t || "pulse", isDynamicHideShow: !0 }, !0),
							  e("body").data("loadingOverlay").show(),
							  setTimeout(function () {
									e("body").data("loadingOverlay").hide();
							  }, 3e3),
							  this)
					);
				},
				dynamicShowHideEvents: function () {
					var t = this;
					return (
						e(document)
							.off("click.loading-overlay-button")
							.on("click.loading-overlay-button", ".loading-overlay-button", function (i) {
								i.preventDefault(), t.dynamicShowHide(e(this).data("effect"));
							}),
						e(document)
							.off("change.loading-overlay-select")
							.on("change.loading-overlay-select", ".loading-overlay-select", function () {
								t.dynamicShowHide(e(this).val());
							}),
						this
					);
				},
			}),
				e.extend(t, { LoadingOverlay: u }),
				(e.fn.loadingOverlay = function (t, i) {
					return this.each(function () {
						var n = e(this),
							o = n.data("loadingOverlay");
						if (o) return o;
						var a = t || n.data("loading-overlay-options") || {};
						return new u(n, a, i);
					});
				}),
				e("[data-loading-overlay]").loadingOverlay();
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__masonry",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = {}),
				(n.prototype = {
					initialize: function (t, e) {
						return t.data(i) ? this : ((this.$el = t), this.setData().setOptions(e).build(), this);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						if (!e.isFunction(e.fn.isotope)) return this;
						var t = this;
						e(window);
						if (
							((t.$loader = !1),
							t.options.wrapper.parents(".masonry-loader").get(0) && ((t.$loader = t.options.wrapper.parents(".masonry-loader")), t.createLoader()),
							t.options.wrapper.one("layoutComplete", function (e, i) {
								t.removeLoader();
							}),
							t.options.wrapper.waitForImages(function () {
								t.options.wrapper.isotope(t.options);
							}),
							e("html").hasClass("ie10") || e("html").hasClass("ie11"))
						)
							parseInt(t.options.wrapper.children().css("padding-left")), parseInt(t.options.wrapper.children().css("padding-right"));
						return (
							e(window).on("resize", function () {
								setTimeout(function () {
									t.options.wrapper.isotope("layout");
								}, 300);
							}),
							setTimeout(function () {
								t.removeLoader();
							}, 3e3),
							this
						);
					},
					createLoader: function () {
						var t = this,
							e = ['<div class="bounce-loader">', '<div class="bounce1"></div>', '<div class="bounce2"></div>', '<div class="bounce3"></div>', "</div>"].join(
								""
							);
						return t.$loader.append(e), this;
					},
					removeLoader: function () {
						var t = this;
						t.$loader &&
							(t.$loader.removeClass("masonry-loader-showing"),
							setTimeout(function () {
								t.$loader.addClass("masonry-loader-loaded");
							}, 300));
					},
				}),
				e.extend(t, { PluginMasonry: n }),
				(e.fn.themePluginMasonry = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__matchHeight",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = { byRow: !0, property: "height", target: null, remove: !1 }),
				(n.prototype = {
					initialize: function (t, e) {
						return t.data(i) ? this : ((this.$el = t), this.setData().setOptions(e).build(), this);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						if (!e.isFunction(e.fn.matchHeight)) return this;
						var t = this;
						return t.options.wrapper.matchHeight(t.options), this;
					},
				}),
				e.extend(t, { PluginMatchHeight: n }),
				(e.fn.themePluginMatchHeight = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__parallax",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = {
				speed: 1.5,
				horizontalPosition: "50%",
				offset: 0,
				parallaxDirection: "top",
				parallaxHeight: "180%",
				scrollableParallax: !1,
				scrollableParallaxMinWidth: 991,
				startOffset: 7,
				transitionDuration: "200ms",
				cssProperty: "width",
				cssValueStart: 40,
				cssValueEnd: 100,
				cssValueUnit: "vw",
				mouseParallax: !1,
			}),
				(n.prototype = {
					initialize: function (t, e) {
						return t.data(i) ? this : ((this.$el = t), this.setData().setOptions(e).build(), this);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						var t,
							i,
							n,
							o,
							a = this,
							s = e(window);
						if (a.options.mouseParallax)
							return (
								s.mousemove(function (t) {
									e(".parallax-mouse-object", a.options.wrapper).each(function () {
										var i = e(this).attr("data-value"),
											n = (t.clientX * i) / 250,
											o = (t.clientY * i) / 250;
										e(this).css("transform", "translateX(" + n + "px) translateY(" + o + "px)");
									});
								}),
								this
							);
						if (!(a.options.scrollableParallax && e(window).width() > a.options.scrollableParallaxMinWidth)) {
							(n = a.options.fadeIn ? e('<div class="parallax-background fadeIn animated"></div>') : e('<div class="parallax-background"></div>')),
								n.css({
									"background-image": "url(" + a.options.wrapper.data("image-src") + ")",
									"background-size": "cover",
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									height: a.options.parallaxHeight,
								}),
								a.options.wrapper.prepend(n),
								a.options.wrapper.css({ position: "relative", overflow: "hidden" });
							var r = function () {
								s.on("scroll resize", function () {
									(t = a.options.wrapper.offset()),
										(i = -(s.scrollTop() - (t.top - 100)) / (a.options.speed + 2)),
										(plxPos = i < 0 ? Math.abs(i) : -Math.abs(i)),
										(o = e('html[dir="rtl"]').get(0) ? " rotateY(180deg)" : ""),
										"bottom" == a.options.parallaxDirection && (a.options.offset = 250);
									var r = plxPos - 50 + a.options.offset;
									"bottom" == a.options.parallaxDirection && (r = r < 0 ? Math.abs(r) : -Math.abs(r)),
										n.css({ transform: "translate3d(0, " + r + "px, 0)" + o, "background-position-x": a.options.horizontalPosition });
								}),
									s.trigger("scroll");
							};
							return e.browser.mobile ? (1 == a.options.enableOnMobile ? r() : a.options.wrapper.addClass("parallax-disabled")) : r(), this;
						}
						var l = a.options.wrapper.find(".scrollable-parallax-wrapper");
						if (l.get(0)) {
							var d = e(window).scrollTop() > a.options.wrapper.offset().top + e(window).outerHeight() ? a.options.cssValueEnd : a.options.cssValueStart,
								c = a.options.cssValueUnit ? a.options.cssValueUnit : "";
							l.css({
								"background-image": "url(" + a.options.wrapper.data("image-src") + ")",
								"background-size": "cover",
								"background-position": "center",
								"background-attachment": "fixed",
								transition: "ease " + a.options.cssProperty + " " + a.options.transitionDuration,
								width: d + "%",
							}),
								e(window).on("scroll", function (t) {
									if (a.options.wrapper.visible(!0)) {
										var i = e(window),
											n = i.scrollTop(),
											o = a.options.wrapper.offset().top,
											s = o - n,
											r = Math.abs(+(s - i.height()) / (a.options.startOffset ? a.options.startOffset : 7));
										r <= a.options.cssValueEnd && d <= a.options.cssValueEnd && (d = a.options.cssValueStart + r),
											d > a.options.cssValueEnd && (d = a.options.cssValueEnd),
											d < a.options.cssValueStart && (d = a.options.cssValueStart);
										var h = {};
										(h[a.options.cssProperty] = d + c), l.css(h);
									}
								});
						}
					},
				}),
				e.extend(t, { PluginParallax: n }),
				(e.fn.themePluginParallax = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__progressBar",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = { accX: 0, accY: -50, delay: 1 }),
				(n.prototype = {
					initialize: function (t, e) {
						return t.data(i) ? this : ((this.$el = t), this.setData().setOptions(e).build(), this);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						var t = this,
							e = this.options.wrapper,
							i = 1;
						return (
							(i = e.attr("data-appear-animation-delay") ? e.attr("data-appear-animation-delay") : t.options.delay),
							e.addClass(e.attr("data-appear-animation")),
							setTimeout(function () {
								e.animate({ width: e.attr("data-appear-progress-animation") }, 1500, "easeOutQuad", function () {
									e.find(".progress-bar-tooltip").animate({ opacity: 1 }, 500, "easeOutQuad");
								});
							}, i),
							this
						);
					},
				}),
				e.extend(t, { PluginProgressBar: n }),
				(e.fn.themePluginProgressBar = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__randomimages",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = {
				minWindowWidth: 0,
				random: !0,
				imagesListURL: null,
				lightboxImagesListURL: null,
				delay: null,
				animateIn: "fadeIn",
				animateOut: "fadeOut",
				stopAtImageIndex: !1,
				stopAfterFewSeconds: !1,
				stopAfterXTimes: !1,
				accY: 0,
			}),
				(n.prototype = {
					initialize: function (t, e) {
						return (
							(this.$el = t),
							(this.st = ""),
							(this.times = 0),
							(this.perImageIndex = 0),
							(!t.is("img") || void 0 !== e.imagesListURL) && (this.setData().setOptions(e).build(), this)
						);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						var t = this;
						return (
							!(e(window).width() < t.options.minWindowWidth) &&
							(t.$el.is("img")
								? ((t.isInsideLightbox = !!t.$el.closest(".lightbox").length),
								  t.isInsideLightbox && t.options.lightboxImagesListURL && t.options.lightboxImagesListURL.push(t.$el.closest(".lightbox").attr("href")),
								  t.options.imagesListURL.push(t.$el.attr("src")),
								  (t.lastIndex = t.options.imagesListURL.length - 1),
								  0 == t.options.random &&
										e(".plugin-random-images").each(function (t) {
											t == e(".plugin-random-images").length - 1 && e(this).addClass("the-last");
										}),
								  setTimeout(
										function () {
											t.recursiveTimeout(t.perImageTag, null == t.options.delay ? 3e3 : t.options.delay);
										},
										null == t.options.delay ? 300 : t.options.delay / 3
								  ))
								: setTimeout(t.recursiveTimeout(t.perWrapper, t.options.delay ? t.options.delay : getPerWrapperHighDelay(), !1), 300),
							t.options.stopAfterFewSeconds &&
								setTimeout(function () {
									clearTimeout(t.st);
								}, t.options.stopAfterFewSeconds),
							this)
						);
					},
					perImageTag: function () {
						var t = this,
							e = t.options.random ? Math.floor(Math.random() * t.options.imagesListURL.length) : t.lastIndex;
						if ("" !== t.lastIndex && t.lastIndex == e)
							if (t.options.random) for (; e == t.lastIndex; ) e = Math.floor(Math.random() * t.options.imagesListURL.length);
							else (e -= 1), -1 == e && (e = t.options.imagesListURL.length - 1);
						return (
							t.$el.addClass("animated"),
							t.$el.removeClass(t.options.animateIn).addClass(t.options.animateOut),
							setTimeout(function () {
								t.$el.attr("src", t.options.imagesListURL[e]).removeClass(t.options.animateOut).addClass(t.options.animateIn),
									t.isInsideLightbox && t.options.lightboxImagesListURL && t.$el.closest(".lightbox").attr("href", t.options.lightboxImagesListURL[e]);
							}, 1e3),
							(t.lastIndex = e),
							t.times++,
							(t.perImageIndex = e),
							this
						);
					},
					getPerWrapperHighDelay: function () {
						var t = this,
							i = t.$el,
							n = 0;
						return (
							i.find("img").each(function () {
								var t = e(this);
								t.data("rimage-delay") && parseInt(t.data("rimage-delay")) > n && (n = parseInt(t.data("rimage-delay")));
							}),
							n
						);
					},
					perWrapper: function () {
						var t = this,
							i = t.$el;
						return (
							(t.options.imagesListURL = []),
							i.find("img").each(function () {
								var i = e(this);
								t.options.imagesListURL.push(i.attr("src"));
							}),
							(t.options.imagesListURL = t.shuffle(t.options.imagesListURL)),
							i.find("img").each(function (i) {
								var n = e(this),
									o = n.data("rimage-animate-in") ? n.data("rimage-animate-in") : t.options.animateIn,
									a = n.data("rimage-animate-out") ? n.data("rimage-animate-out") : t.options.animateOut,
									s = n.data("rimage-delay") ? n.data("rimage-delay") : 2e3;
								n.addClass("animated"),
									setTimeout(function () {
										n.removeClass(o).addClass(a);
									}, s / 2),
									setTimeout(function () {
										n.attr("src", t.options.imagesListURL[i]).removeClass(a).addClass(o);
									}, s);
							}),
							t.times++,
							this
						);
					},
					recursiveTimeout: function (t, i) {
						var n = this,
							o = function () {
								null !== t && t.call(n),
									(n.st = setTimeout(o, null == i ? 1e3 : i)),
									0 == n.options.random && (n.$el.hasClass("the-last") ? e(".plugin-random-images").trigger("rimages.start") : clearTimeout(n.st)),
									n.options.stopAtImageIndex && parseInt(n.options.stopAtImageIndex) == n.perImageIndex && clearTimeout(n.st),
									n.options.stopAfterXTimes == n.times && clearTimeout(n.st);
							};
						o(),
							n.$el.on("rimages.start", function () {
								clearTimeout(n.st), (n.st = setTimeout(o, null == i ? 1e3 : i));
							});
					},
					shuffle: function (t) {
						for (var e = t.length - 1; e > 0; e--) {
							var i = Math.floor(Math.random() * (e + 1)),
								n = t[e];
							(t[e] = t[i]), (t[i] = n);
						}
						return t;
					},
				}),
				e.extend(t, { PluginRandomImages: n }),
				(e.fn.themePluginRandomImages = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__readmore",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = {
				buttonOpenLabel: 'Read More <i class="fas fa-chevron-down text-2 ms-1"></i>',
				buttonCloseLabel: 'Read Less <i class="fas fa-chevron-up text-2 ms-1"></i>',
				enableToggle: !0,
				maxHeight: 110,
				overlayColor: "#FFF",
				overlayHeight: 100,
				startOpened: !1,
				align: "left",
			}),
				(n.prototype = {
					initialize: function (t, e) {
						var i = this;
						return (
							(this.$el = t),
							this.setData().setOptions(e).build().events(),
							i.options.startOpened && i.options.wrapper.find(".readmore-button-wrapper > a").trigger("click"),
							this
						);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						var t = this;
						t.options.wrapper.addClass("position-relative"), t.options.wrapper.append('<div class="readmore-overlay"></div>');
						var i = "linear-gradient(180deg, rgba(2, 0, 36, 0) 0%, " + t.options.overlayColor + " 100%)";
						switch (
							(e("html").hasClass("safari") && (i = "-webkit-linear-gradient(top, rgba(2, 0, 36, 0) 0%, " + t.options.overlayColor + " 100%)"),
							t.options.wrapper
								.find(".readmore-overlay")
								.css({ background: i, position: "absolute", bottom: 0, left: 0, width: "100%", height: t.options.overlayHeight, "z-index": 1 }),
							t.options.wrapper
								.find(".readmore-button-wrapper")
								.removeClass("d-none")
								.css({ position: "absolute", bottom: 0, left: 0, width: "100%", "z-index": 2 }),
							t.options.wrapper.find(".readmore-button-wrapper > a").html(t.options.buttonOpenLabel),
							t.options.wrapper.css({ height: t.options.maxHeight, "overflow-y": "hidden" }),
							t.options.align)
						) {
							case "center":
								t.options.wrapper.find(".readmore-button-wrapper").addClass("text-center");
								break;
							case "right":
								t.options.wrapper.find(".readmore-button-wrapper").addClass("text-right");
								break;
							case "left":
							default:
								t.options.wrapper.find(".readmore-button-wrapper").addClass("text-left");
						}
						return this;
					},
					events: function () {
						var t = this;
						return (
							(t.readMore = function () {
								t.options.wrapper.find(".readmore-button-wrapper > a:not(.readless)").on("click", function (i) {
									i.preventDefault();
									var n = e(this);
									setTimeout(function () {
										t.options.wrapper.animate({ height: t.options.wrapper[0].scrollHeight }, function () {
											t.options.enableToggle || n.fadeOut(),
												n.html(t.options.buttonCloseLabel).addClass("readless").off("click"),
												t.readLess(),
												t.options.wrapper.find(".readmore-overlay").fadeOut(),
												t.options.wrapper.css({ "max-height": "none", overflow: "visible" }),
												t.options.wrapper.find(".readmore-button-wrapper").animate({ bottom: -20 });
										});
									}, 200);
								});
							}),
							(t.readLess = function () {
								t.options.wrapper.find(".readmore-button-wrapper > a.readless").on("click", function (i) {
									i.preventDefault();
									var n = e(this);
									t.options.wrapper.find(".readmore-button-wrapper").animate({ bottom: 0 }),
										t.options.wrapper.find(".readmore-overlay").fadeIn(),
										setTimeout(function () {
											t.options.wrapper.height(t.options.wrapper[0].scrollHeight).animate({ height: t.options.maxHeight }, function () {
												n.html(t.options.buttonOpenLabel).removeClass("readless").off("click"), t.readMore(), t.options.wrapper.css({ overflow: "hidden" });
											});
										}, 200);
								});
							}),
							t.readMore(),
							this
						);
					},
				}),
				e.extend(t, { PluginReadMore: n }),
				(e.fn.themePluginReadMore = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__revolution",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = {
				sliderType: "standard",
				sliderLayout: "fullwidth",
				delay: 9e3,
				gridwidth: 1170,
				gridheight: 500,
				spinner: "spinner3",
				disableProgressBar: "on",
				parallax: { type: "off", bgparallax: "off" },
				navigation: {
					keyboardNavigation: "off",
					keyboard_direction: "horizontal",
					mouseScrollNavigation: "off",
					onHoverStop: "off",
					touch: { touchenabled: "on", swipe_threshold: 75, swipe_min_touches: 1, swipe_direction: "horizontal", drag_block_vertical: !1 },
					arrows: {
						enable: !0,
						hide_onmobile: !1,
						hide_under: 0,
						hide_onleave: !0,
						hide_delay: 200,
						hide_delay_mobile: 1200,
						left: { h_align: "left", v_align: "center", h_offset: 30, v_offset: 0 },
						right: { h_align: "right", v_align: "center", h_offset: 30, v_offset: 0 },
					},
				},
				addOnTypewriter: { enable: !1 },
				addOnWhiteboard: { enable: !1 },
				whiteboard: {
					movehand: {
						src: "../vendor/rs-plugin/revolution-addons/whiteboard/assets/images/hand_point_right.png",
						width: 400,
						height: 1e3,
						handtype: "right",
						transform: { transformX: 50, transformY: 50 },
						jittering: { distance: "80", distance_horizontal: "100", repeat: "5", offset: "10", offset_horizontal: "0" },
						rotation: { angle: "10", repeat: "3" },
					},
					writehand: {
						src: "../vendor/rs-plugin/revolution-addons/whiteboard/assets/images/write_right_angle.png",
						width: 572,
						height: 691,
						handtype: "right",
						transform: { transformX: 50, transformY: 50 },
						jittering: { distance: "80", distance_horizontal: "100", repeat: "5", offset: "10", offset_horizontal: "0" },
						rotation: { angle: "10", repeat: "3" },
					},
				},
				addOnParticles: { enable: !1 },
				particles: {
					startSlide: "first",
					endSlide: "last",
					zIndex: "1",
					particles: {
						number: { value: 80 },
						color: { value: "#ffffff" },
						shape: { type: "circle", stroke: { width: 0, color: "#ffffff", opacity: 1 }, image: { src: "" } },
						opacity: { value: 0.5, random: !0, min: 0.25, anim: { enable: !1, speed: 3, opacity_min: 0, sync: !1 } },
						size: { value: 2, random: !1, min: 30, anim: { enable: !1, speed: 40, size_min: 1, sync: !1 } },
						line_linked: { enable: !0, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
						move: { enable: !0, speed: 6, direction: "none", random: !0, min_speed: 6, straight: !1, out_mode: "out" },
					},
					interactivity: {
						events: { onhover: { enable: !1, mode: "repulse" }, onclick: { enable: !1, mode: "repulse" } },
						modes: { grab: { distance: 400, line_linked: { opacity: 0.5 } }, bubble: { distance: 400, size: 40, opacity: 0.4 }, repulse: { distance: 200 } },
					},
				},
				addOnCountdown: { enable: !1, targetdate: new Date().getTime() + 864e6, slidechanges: [{ days: 0, hours: 0, minutes: 0, seconds: 0, slide: 2 }] },
				addOnSlicey: { enable: !1 },
				addOnFilmstrip: { enable: !1 },
				addOnBeforeAfter: {
					enable: !1,
					options: {
						cursor: "move",
						carousel: !1,
						arrowStyles: {
							leftIcon: "fa-icon-caret-left",
							rightIcon: "fa-icon-caret-right",
							topIcon: "fa-icon-caret-up",
							bottomIcon: "fa-icon-caret-down",
							size: "35",
							color: "#ffffff",
							spacing: "10",
							bgColor: "transparent",
							padding: "0",
							borderRadius: "0",
						},
						dividerStyles: { width: "1", color: "rgba(255, 255, 255, 0.5)" },
					},
				},
				addOnPanorama: { enable: !1 },
				addOnRevealer: { enable: !1 },
				revealer: {
					direction: "open_horizontal",
					color: "#ffffff",
					duration: "1500",
					delay: "0",
					easing: "Power2.easeInOut",
					overlay_enabled: !0,
					overlay_color: "#000000",
					overlay_duration: "1500",
					overlay_delay: "0",
					overlay_easing: "Power2.easeInOut",
					spinner: "1",
					spinnerColor: "#006dd2",
					spinnerHtml:
						"<div class='rsaddon-revealer-spinner rsaddon-revealer-spinner-1'><div class='rsaddon-revealer-1'><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span></div></div />",
				},
				addOnDuotone: { enable: !1 },
				addOnBubblemorph: { enable: !1 },
				addOnDistortion: { enable: !1 },
			}),
				(n.prototype = {
					initialize: function (t, e) {
						return t.data(i) ? this : ((this.$el = t), this.setData().setOptions(e).build().events(), this);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						return e.isFunction(e.fn.revolution)
							? (1 == this.options.wrapper.find("> ul > li").length &&
									(this.options.wrapper.addClass("slider-single-slide"), e.extend(this.options.navigation, { bullets: { enable: !1 } })),
							  "fullscreen" == this.options.sliderLayout && this.options.wrapper.closest(".slider-container").addClass("fullscreen-slider"),
							  this.options.wrapper.revolution(this.options),
							  this.options.addOnTypewriter.enable && RsTypewriterAddOn(e, this.options.wrapper),
							  this.options.addOnWhiteboard.enable && this.options.wrapper.rsWhiteBoard(),
							  this.options.addOnParticles.enable && RsParticlesAddOn(this.options.wrapper),
							  this.options.addOnCountdown.enable &&
									tp_countdown(this.options.wrapper, this.options.addOnCountdown.targetdate, this.options.addOnCountdown.slidechanges),
							  this.options.addOnSlicey.enable && this.options.wrapper.revSliderSlicey(),
							  this.options.addOnFilmstrip.enable && RsFilmstripAddOn(e, this.options.wrapper, "../vendor/rs-plugin/revolution-addons/filmstrip/", !1),
							  this.options.addOnBeforeAfter.enable && RevSliderBeforeAfter(e, this.options.wrapper, this.options.addOnBeforeAfter.options),
							  this.options.addOnPanorama.enable && RsAddonPanorama(e, this.options.wrapper),
							  this.options.addOnRevealer.enable && RsRevealerAddOn(e, this.options.wrapper, this.options.revealer.spinnerHtml),
							  this.options.addOnDuotone.enable && RsAddonDuotone(e, this.options.wrapper, !0, "cubic-bezier(0.645, 0.045, 0.355, 1.000)", "1000"),
							  this.options.addOnBubblemorph.enable && BubbleMorphAddOn(e, this.options.wrapper, !1),
							  this.options.addOnDistortion.enable && RsLiquideffectAddOn(e, this.options.wrapper),
							  this)
							: this;
					},
					events: function () {
						return this;
					},
				}),
				e.extend(t, { PluginRevolutionSlider: n }),
				(e.fn.themePluginRevolutionSlider = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__scrollSpy",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = { target: "#header", debugMode: !1 }),
				(n.prototype = {
					initialize: function (t, e) {
						return (
							null != document.querySelector(e.target) &&
							((this.$el = t), this.setData().setOptions(e), this.options.debugMode && this.debugMode(), this.build(), this)
						);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						var t = this,
							i = null != document.querySelector(t.options.target) && document.querySelector(t.options.target),
							n = "#header" == i || ".wrapper-spy" == i ? i.querySelectorAll(".header-nav .nav > li a") : i.querySelectorAll(".nav > li a"),
							o = Object.keys(n).map(function (t, e) {
								return n[t].hash;
							});
						(o = o.filter(function (t) {
							return "" != t;
						})),
							(t.sectionIDs = o);
						for (var a = 0; a < o.length; a++) {
							var s = "-20% 0px -79.9% 0px";
							if (e(o[a]).data("spy-offset")) {
								var r = e(o[a]).data("spy-offset"),
									l = parseInt(r) < 0;
								s = s
									.split(" ")
									.map(function (t, e) {
										if (t.indexOf("%") > 0) {
											var i = parseInt(t.replace("%", "")),
												n = 0;
											switch (e) {
												case 0:
													n = l ? i - r : Math.abs(i) + r;
													break;
												case 2:
													n = l ? i + r : Math.abs(i) - r;
											}
											return l ? (n += "%") : (n = "-" + n + "%"), n;
										}
										return t;
									})
									.join(" ");
							}
							var d = o[a],
								c = function () {
									var t = e(this);
									"#header" == i || ".wrapper-spy" == i
										? (e("#header .header-nav .nav > li a").removeClass("active"),
										  e('#header .header-nav .nav > li a[href="#' + t[0].id + '"]').addClass("active"))
										: (e(i).find(".nav > li a").removeClass("active"),
										  e(i)
												.find('.nav > li a[href="#' + t[0].id + '"]')
												.addClass("active"));
								};
							this.scrollSpyIntObs(d, c, { rootMargin: s, threshold: 0 }, !0, a, !0);
						}
						return this;
					},
					scrollSpyIntObs: function (t, i, n, o, a, s) {
						var r = this,
							l = document.querySelectorAll(t),
							d = { rootMargin: "0px 0px 200px 0px" };
						Object.keys(n).length && (d = e.extend(d, n));
						var c = new IntersectionObserver(function (t) {
							for (var n = 0; n < t.length; n++) {
								var l = t[n];
								if (l.intersectionRatio > 0) {
									if ("string" == typeof i) Function("return " + i)();
									else {
										var d = i;
										d.call(e(l.target));
									}
									o || c.unobserve(l.target);
								} else
									0 == s &&
										a == r.sectionIDs.length - 1 &&
										(e("#header .header-nav .nav > li a").removeClass("active"),
										e('#header .header-nav .nav > li a[href="#' + l.target.id + '"]')
											.parent()
											.prev()
											.find("a")
											.addClass("active")),
										(s = !1);
							}
						}, d);
						return (
							e(l).each(function () {
								c.observe(e(this)[0]);
							}),
							this
						);
					},
					debugMode: function () {
						function t(t) {
							return (...e) => n(t, ...e);
						}
						function e(t, e = {}, i) {
							const { width: n, left: o, height: a, top: s } = t,
								r = document.createElement("div");
							if (
								((r.style.position = "fixed"),
								(r.style.width = n + "px"),
								(r.style.left = o + "px"),
								(r.style.top = s + "px"),
								(r.style.height = a + "px"),
								(r.style.pointerEvents = "none"),
								(r.style.transition = "opacity 2s ease-in"),
								(r.style.zIndex = 9999999999),
								Object.assign(r.style, e),
								requestAnimationFrame(() =>
									requestAnimationFrame(() => {
										r.style.opacity = 0;
									})
								),
								r.addEventListener("transitionend", () => {
									document.body.removeChild(r);
								}),
								document.body.appendChild(r),
								i)
							) {
								var l = document.createElement("div");
								(l.style.backgroundColor = "#000"),
									(l.style.color = "#FFF"),
									(l.style.paddingTop = "10px"),
									(l.style.paddingRight = "10px"),
									(l.style.paddingLeft = "10px"),
									(l.style.paddingBottom = "10px"),
									(l.innerHTML = i.target.id),
									r.appendChild(l);
							}
							return r;
						}
						function i(t) {
							e(t.rootBounds, { border: `${Math.min(10, t.rootBounds.height / 2)}px solid ${o.rootColor}`, overflow: "hidden", boxSizing: "border-box" }, t);
						}
						function n(t, e, n) {
							return e.forEach(i), t(e, n);
						}
						const o = { rootColor: "#9428AB", enterColor: "#B35C00", exitColor: "#035570", interColor: "#9CAF00BB" };
						return (
							"undefined" != typeof window &&
								(window.IntersectionObserver = class extends IntersectionObserver {
									constructor(e, i) {
										super(t(e), i);
									}
								}),
							this
						);
					},
				}),
				e.extend(t, { PluginScrollSpy: n }),
				(e.fn.themePluginScrollSpy = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			(t = t || {}),
				e.extend(t, {
					PluginScrollToTop: {
						defaults: {
							wrapper: e("body"),
							offset: 150,
							buttonClass: "scroll-to-top",
							iconClass: "fas fa-chevron-up",
							delay: 1e3,
							visibleMobile: !1,
							label: !1,
							easing: "easeOutBack",
						},
						initialize: function (t) {
							if (((initialized = !0), !e("body[data-plugin-section-scroll]").get(0))) return this.setOptions(t).build().events(), this;
						},
						setOptions: function (t) {
							return (this.options = e.extend(!0, {}, this.defaults, t)), this;
						},
						build: function () {
							var t,
								i = this;
							return (
								(t = e("<a />").addClass(i.options.buttonClass).attr({ href: "#" }).append(e("<i />").addClass(i.options.iconClass))),
								i.options.visibleMobile || t.addClass("hidden-mobile"),
								i.options.label && t.append(e("<span />").html(i.options.label)),
								this.options.wrapper.append(t),
								(this.$el = t),
								this
							);
						},
						events: function () {
							var t = this,
								i = !1;
							return (
								t.$el.on("click", function (i) {
									return i.preventDefault(), e("html").animate({ scrollTop: 0 }, t.options.delay, t.options.easing), !1;
								}),
								e(window).scroll(function () {
									i ||
										((i = !0),
										e(window).scrollTop() > t.options.offset
											? (t.$el.stop(!0, !0).addClass("visible"), (i = !1))
											: (t.$el.stop(!0, !0).removeClass("visible"), (i = !1)));
								}),
								this
							);
						},
					},
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__scrollable",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.updateModals = function () {
				n.updateBootstrapModal();
			}),
				(n.updateBootstrapModal = function () {
					var t;
					if (
						((t = void 0 !== e.fn.modal),
						(t = t && void 0 !== e.fn.modal.Constructor),
						(t = t && void 0 !== e.fn.modal.Constructor.prototype),
						(t = t && void 0 !== e.fn.modal.Constructor.prototype.enforceFocus),
						!t)
					)
						return !1;
					var i = e.fn.modal.Constructor.prototype.enforceFocus;
					e.fn.modal.Constructor.prototype.enforceFocus = function () {
						i.apply(this);
						var t = this.$element.find(".scrollable");
						t && (e.isFunction(e.fn.themePluginScrollable) && t.themePluginScrollable(), e.isFunction(e.fn.nanoScroller) && t.nanoScroller());
					};
				}),
				(n.defaults = {
					contentClass: "scrollable-content",
					paneClass: "scrollable-pane",
					sliderClass: "scrollable-slider",
					alwaysVisible: !0,
					preventPageScrolling: !0,
				}),
				(n.prototype = {
					initialize: function (t, e) {
						return t.data(i) ? this : ((this.$el = t), this.setData().setOptions(e).build(), this);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						return this.options.wrapper.nanoScroller(this.options), this;
					},
				}),
				e.extend(t, { PluginScrollable: n }),
				(e.fn.themePluginScrollable = function (t) {
					return this.each(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				}),
				e(function () {
					n.updateModals();
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__sectionScroll",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = {
				targetClass: ".section",
				dotsNav: !0,
				changeHeaderLogo: !0,
				headerLogoDark: "img/logo-default-slim.png",
				headerLogoLight: "img/logo-default-slim-dark.png",
			}),
				(n.prototype = {
					initialize: function (t, e) {
						return t.data(i) ? this : ((this.$el = t), this.setData().setOptions(e).build().events(), this);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						var t = this;
						this.options.wrapper;
						e("html").hasClass("side-header-overlay-full-screen") ? (t.$header = e(".sticky-wrapper")) : (t.$header = e("#header")),
							t.updateSectionsHeight(),
							e(this.options.targetClass).wrap('<div class="section-wrapper"></div>'),
							e(".section-wrapper").each(function () {
								e(this).height(e(this).find(".section-scroll").outerHeight());
							}),
							e(".section-wrapper").first().addClass("active");
						var i = !1,
							n = !1,
							o = "",
							a = 0,
							s = 0;
						e(window).on("touchstart", function (t) {
							a = t.changedTouches[0].screenY;
						});
						var r = "onwheel" in document ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll";
						return (
							e(window).width() < 992 &&
								e("html").hasClass("touch") &&
								(r = "onwheel" in document ? "wheel touchend" : void 0 !== document.onmousewheel ? "mousewheel touchend" : "DOMMouseScroll touchend"),
							e(window).width() < 992 &&
								(e("html").removeClass("overflow-hidden"),
								e(window).on("scroll", function () {
									var t = 0;
									e(".section-scroll").each(function () {
										if (e(this).offset().top <= e(window).scrollTop() + 50) {
											var i = e(".section-wrapper").eq(t).find(".section-scroll");
											e(".section-scroll-dots-navigation > ul > li").removeClass("active"),
												e(".section-scroll-dots-navigation > ul > li").eq(t).addClass("active"),
												e(window).trigger({ type: "section.scroll.mobile.change.header.color", currentSection: i });
										}
										t++;
									});
								}),
								e(window).on("section.scroll.mobile.change.header.color", function (i) {
									if (void 0 !== i.currentSection) {
										var n = i.currentSection,
											o = n.data("section-scroll-header-color");
										e("#header .header-nav")
											.removeClass("header-nav-light-text header-nav-dark-text")
											.addClass("header-nav-" + o + "-text"),
											e("#header .header-nav-features")
												.removeClass("header-nav-features-dark header-nav-features-light")
												.addClass("header-nav-features-" + o),
											e("#header .header-social-icons")
												.removeClass("social-icons-icon-dark social-icons-icon-light")
												.addClass("social-icons-icon-" + o),
											t.options.changeHeaderLogo &&
												null != o &&
												("light" == o
													? e("#header .header-logo img").attr("src", t.options.headerLogoLight)
													: "dark" == o && e("#header .header-logo img").attr("src", t.options.headerLogoDark)),
											t.$header.css({ opacity: 1 });
									}
								})),
							e(window).on(r, function (r) {
								if (
									!(
										e(window).width() < 992 ||
										(e(window).width() < 992 &&
											e("html").hasClass("touch") &&
											(e(r.target).closest(".section-scroll-dots-navigation").get(0) ||
												e(r.target).closest(".header-body").get(0) ||
												e(r.target).closest(".owl-carousel").get(0))) ||
										e("html.side-header-overlay-full-screen.side-header-hide").get(0)
									)
								) {
									var l = null == r.originalEvent.wheelDelta ? r.originalEvent.deltaY > 0 : r.originalEvent.wheelDelta < 0;
									if (
										!(
											e(window).width() < 992 &&
											e("html").hasClass("touch") &&
											((s = event.changedTouches[0].screenY), s <= a && (o = "up"), s >= a && (o = "down"), s == a)
										)
									) {
										var d,
											c = e(".section-wrapper").eq(t.getCurrentIndex()).find(".section-scroll"),
											h = t.getNextSection(l, o);
										if (
											((d = t.getCurrentIndex() == e(".section-wrapper").length - 1 ? e(document).height() : h.offset().top),
											e(window).width() < 992 &&
												e("html").hasClass("touch") &&
												setTimeout(function () {
													e(".section-wrapper").eq(t.getCurrentIndex()).find(".section-scroll").hasClass("section-scroll-scrollable")
														? e("html").removeClass("overflow-hidden")
														: e("html").addClass("overflow-hidden");
												}, 1200),
											!c.hasClass("section-scroll-scrollable") || i || n)
										) {
											if (!i && !n) {
												if (l || "up" == o) {
													if (t.getCurrentIndex() == e(".section-wrapper").length - 1) return !1;
													t.changeSectionActiveState(h),
														setTimeout(function () {
															t.moveTo(h.offset().top);
														}, 150);
												} else {
													if (0 == t.getCurrentIndex()) return !1;
													t.changeSectionActiveState(h),
														h.height() > e(window).height()
															? t.moveTo(c.offset().top - e(window).height())
															: setTimeout(function () {
																	t.moveTo(h.offset().top);
															  }, 150);
												}
												t.changeDotsActiveState(),
													t.$header.css({ opacity: 0, transition: "ease opacity 500ms" }),
													h.css({ position: "relative", opacity: 1, "z-index": 1, transform: "translate3d(0,0,0) scale(1)" }),
													c.css({
														position: "fixed",
														width: "100%",
														top: 0,
														left: 0,
														opacity: 0,
														"z-index": 0,
														transform: "translate3d(0,0,-10px) scale(0.7)",
														transition: "ease transform 600ms, ease opacity 600ms",
													}),
													setTimeout(function () {
														c.css({ position: "relative", opacity: 1, transform: "translate3d(0,0,-10px) scale(1)" }),
															e(window).trigger("section.scroll.change.header.color"),
															setTimeout(function () {
																i = !1;
															}, 500);
													}, 1e3),
													(i = !0);
											}
										} else {
											if (l || "up" == o) {
												if (e(window).scrollTop() + e(window).height() >= d) {
													if (
														((i = !0),
														setTimeout(function () {
															e(window).trigger("section.scroll.change.header.color"),
																setTimeout(function () {
																	i = !1;
																}, 500);
														}, 1e3),
														t.getCurrentIndex() == e(".section-wrapper").length - 1)
													)
														return !1;
													t.moveTo(c.offset().top + c.outerHeight()),
														t.changeSectionActiveState(h),
														t.$header.css({ opacity: 0, transition: "ease opacity 500ms" });
												}
												if (!e("html").hasClass("touch"))
													for (var u = 1; u < 100; u++)
														if ((e("body, html").scrollTop(e(window).scrollTop() + 1), e(window).scrollTop() + e(window).height() >= d)) {
															(n = !0),
																setTimeout(function () {
																	e(window).trigger("section.scroll.change.header.color"), (n = !1);
																}, 500);
															break;
														}
											} else {
												if (e(window).scrollTop() <= c.offset().top) {
													if (
														((i = !0),
														setTimeout(function () {
															e(window).trigger("section.scroll.change.header.color"),
																setTimeout(function () {
																	i = !1;
																}, 500);
														}, 1e3),
														0 == t.getCurrentIndex())
													)
														return !1;
													t.moveTo(c.offset().top - e(window).height()),
														t.changeSectionActiveState(h),
														t.$header.css({ opacity: 0, transition: "ease opacity 500ms" });
												}
												if (!e("html").hasClass("touch"))
													for (u = 1; u < 100; u++)
														if ((e("body, html").scrollTop(e(window).scrollTop() - 1), e(window).scrollTop() <= c.offset().top)) {
															(n = !0),
																setTimeout(function () {
																	e(window).trigger("section.scroll.change.header.color"), (n = !1);
																}, 500);
															break;
														}
											}
											t.changeDotsActiveState();
										}
									}
								}
							}),
							this.options.dotsNav && t.dotsNavigation(),
							setTimeout(function () {
								if (e(window.location.hash).get(0))
									t.moveTo(e(window.location.hash).parent().offset().top),
										t.changeSectionActiveState(e(window.location.hash)),
										t.changeDotsActiveState(),
										t.updateHash(!0);
								else {
									var i = window.location.hash,
										n = i.replace("#", "");
									i || (n = 1),
										t.moveTo(
											e(".section-wrapper")
												.eq(n - 1)
												.offset().top
										),
										t.changeSectionActiveState(
											e(".section-wrapper")
												.eq(n - 1)
												.find(".section-scroll")
										),
										t.changeDotsActiveState(),
										t.updateHash(!0);
								}
								e(window).trigger("section.scroll.ready"), e(window).trigger("section.scroll.change.header.color");
							}, 500),
							this
						);
					},
					updateSectionsHeight: function () {
						return (
							e(".section-scroll").css({ height: "" }),
							e(".section-scroll").each(function () {
								e(this).outerHeight() < e(window).height() + 3 ? e(this).css({ height: "100vh" }) : e(this).addClass("section-scroll-scrollable");
							}),
							e(".section-wrapper").each(function () {
								e(this).height(e(this).find(".section-scroll").outerHeight());
							}),
							this
						);
					},
					updateHash: function (t) {
						var i = this;
						if (window.location.hash) {
							if (!t) {
								var n = e(".section-wrapper").eq(i.getCurrentIndex()).find(".section-scroll"),
									o = n.attr("id") ? n.attr("id") : n.parent().index() + 1;
								window.location.hash = o;
							}
						} else window.location.hash = 1;
						return this;
					},
					getCurrentIndex: function () {
						var t = 0;
						return (t = e(".section-wrapper.active").index()), t;
					},
					moveTo: function (t, i) {
						var n = this;
						return (
							e("body, html").animate({ scrollTop: t }, 1e3, "easeOutQuint"),
							setTimeout(function () {
								n.updateHash();
							}, 500),
							this
						);
					},
					getNextSection: function (t, i) {
						var n = this,
							o = "";
						return (
							(o =
								t || "up" == i
									? e(".section-wrapper")
											.eq(n.getCurrentIndex() + 1)
											.find(".section-scroll")
									: e(".section-wrapper")
											.eq(n.getCurrentIndex() - 1)
											.find(".section-scroll")),
							o
						);
					},
					changeSectionActiveState: function (t) {
						return e(".section-wrapper").removeClass("active"), t.parent().addClass("active"), this;
					},
					changeDotsActiveState: function () {
						var t = this;
						return (
							e(".section-scroll-dots-navigation > ul > li").removeClass("active"),
							e(".section-scroll-dots-navigation > ul > li").eq(t.getCurrentIndex()).addClass("active"),
							this
						);
					},
					dotsNavigation: function () {
						var t = this,
							i = e('<div class="section-scroll-dots-navigation"><ul class="list list-unstyled"></ul></div>'),
							n = t.getCurrentIndex();
						t.options.dotsClass && i.addClass(t.options.dotsClass);
						for (var o = 0; o < e(".section-scroll").length; o++) {
							var a = e(".section-wrapper").eq(o).find(".section-scroll").data("section-scroll-title");
							i.find("> ul").append(
								"<li" + (n == o ? ' class="active"' : "") + '><a href="#' + o + '" data-nav-id="' + o + '"><span>' + a + "</span></a></li>"
							);
						}
						return (
							e(".body").append(i),
							i.find("a[data-nav-id]").on("click touchstart", function (i) {
								i.preventDefault();
								var n = e(this);
								e(".section-scroll").css({ opacity: 0, transition: "ease opacity 300ms" }),
									t.$header.css({ opacity: 0, transition: "ease opacity 500ms" }),
									setTimeout(function () {
										t.moveTo(e(".section-wrapper").eq(n.data("nav-id")).offset().top),
											e(".section-wrapper").removeClass("active"),
											e(".section-wrapper").eq(n.data("nav-id")).addClass("active"),
											e(".section-wrapper").eq(t.getCurrentIndex()).find(".section-scroll").css({ opacity: 1 }),
											setTimeout(function () {
												e(".section-scroll").css({ opacity: 1 }), e(window).trigger("section.scroll.change.header.color");
											}, 500),
											e(window).width() > 991 && t.changeDotsActiveState();
									}, 500);
							}),
							this
						);
					},
					events: function () {
						var t = this;
						return (
							e(window).on("section.scroll.ready", function () {
								e(window).scrollTop(0);
							}),
							e(window).on("section.scroll.change.header.color", function () {
								var i = e(".section-wrapper").eq(t.getCurrentIndex()).find(".section-scroll").data("section-scroll-header-color");
								e("#header .header-nav")
									.removeClass("header-nav-light-text header-nav-dark-text")
									.addClass("header-nav-" + i + "-text"),
									e("#header .header-nav-features")
										.removeClass("header-nav-features-dark header-nav-features-light")
										.addClass("header-nav-features-" + i),
									e("#header .header-social-icons")
										.removeClass("social-icons-icon-dark social-icons-icon-light")
										.addClass("social-icons-icon-" + i),
									t.options.changeHeaderLogo &&
										null != i &&
										("light" == i
											? e("#header .header-logo img").attr("src", t.options.headerLogoLight)
											: "dark" == i && e("#header .header-logo img").attr("src", t.options.headerLogoDark)),
									t.$header.css({ opacity: 1 });
							}),
							e(document).ready(function () {
								e(window).afterResize(function () {
									t.updateSectionsHeight(), e(window).width() < 992 && e("html").removeClass("overflow-hidden");
								});
							}),
							this
						);
					},
				}),
				e.extend(t, { PluginSectionScroll: n }),
				(e.fn.themePluginSectionScroll = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__sort",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = {
				useHash: !0,
				itemSelector: ".isotope-item",
				layoutMode: "masonry",
				filter: "*",
				hiddenStyle: { opacity: 0 },
				visibleStyle: { opacity: 1 },
				stagger: 30,
				isOriginLeft: "rtl" != e("html").attr("dir"),
			}),
				(n.prototype = {
					initialize: function (t, e) {
						return t.data(i) ? this : ((this.$el = t), this.setData().setOptions(e).build(), this);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						if (!e.isFunction(e.fn.isotope)) return this;
						var t = this,
							i = this.options.wrapper,
							n = e('.sort-destination[data-sort-id="' + i.attr("data-sort-id") + '"]');
						e(window);
						if (n.get(0)) {
							if (
								((t.$source = i),
								(t.$destination = n),
								(t.$loader = !1),
								t.setParagraphHeight(n),
								t.$destination.parents(".sort-destination-loader").get(0) &&
									((t.$loader = t.$destination.parents(".sort-destination-loader")), t.createLoader()),
								n.attr("data-filter", "*"),
								n.one("layoutComplete", function (i, n) {
									t.removeLoader(),
										e("[data-plugin-sticky]").length &&
											setTimeout(function () {
												e("[data-plugin-sticky]").each(function () {
													e(this).data("__sticky").build(), e(window).trigger("resize");
												});
											}, 500);
								}),
								e("html").hasClass("ie10") || e("html").hasClass("ie11"))
							)
								parseInt(t.options.wrapper.children().css("padding-left")), parseInt(t.options.wrapper.children().css("padding-right"));
							n.waitForImages(function () {
								n.isotope(t.options), t.events();
							}),
								setTimeout(function () {
									t.removeLoader();
								}, 3e3);
						}
						return this;
					},
					events: function () {
						var t = this,
							i = null,
							n = e(window);
						return (
							t.$source.find("a").click(function (n) {
								return n.preventDefault(), (i = e(this).parent().data("option-value")), t.setFilter(i), n.originalEvent && t.$source.trigger("filtered"), this;
							}),
							t.$destination.trigger("filtered"),
							t.$source.trigger("filtered"),
							t.options.useHash && t.hashEvents(),
							n.on("resize sort.resize", function () {
								setTimeout(function () {
									t.$destination.isotope("layout");
								}, 300);
							}),
							setTimeout(function () {
								n.trigger("sort.resize");
							}, 300),
							this
						);
					},
					setFilter: function (t) {
						var i = this,
							n = t;
						return (
							i.$source.find(".active").removeClass("active"),
							i.$source.find('li[data-option-value="' + t + '"], li[data-option-value="' + t + '"] > a').addClass("active"),
							(i.options.filter = n),
							i.$destination.attr("data-current-page") && (n = n + "[data-page-rel=" + i.$destination.attr("data-current-page") + "]"),
							i.$destination
								.attr("data-filter", t)
								.isotope({ filter: n })
								.one("arrangeComplete", function (t, n) {
									i.options.useHash &&
										(("" == window.location.hash && "*" == i.options.filter.replace(".", "")) || (window.location.hash = i.options.filter.replace(".", ""))),
										e(window).trigger("scroll");
								})
								.trigger("filtered"),
							this
						);
					},
					hashEvents: function () {
						var t = this,
							i = null,
							n = null,
							o = "." + location.hash.replace("#", "");
						return (
							e(location.hash).length && (o = "."),
							"." != o && ".*" != o && t.setFilter(o),
							e(window).on("hashchange", function (e) {
								(n = "." + location.hash.replace("#", "")), (i = "." == n || ".*" == n ? "*" : n), t.setFilter(i);
							}),
							this
						);
					},
					setParagraphHeight: function () {
						var t = this,
							i = 0,
							n = e("span.thumb-info-caption p", t.$destination);
						return (
							n.each(function () {
								e(this).height() > i && (i = e(this).height() + 10);
							}),
							n.height(i),
							this
						);
					},
					createLoader: function () {
						var t = this,
							e = ['<div class="bounce-loader">', '<div class="bounce1"></div>', '<div class="bounce2"></div>', '<div class="bounce3"></div>', "</div>"].join(
								""
							);
						return t.$loader.append(e), this;
					},
					removeLoader: function () {
						var t = this;
						t.$loader &&
							(t.$loader.removeClass("sort-destination-loader-showing"),
							setTimeout(function () {
								t.$loader.addClass("sort-destination-loader-loaded");
							}, 300));
					},
				}),
				e.extend(t, { PluginSort: n }),
				(e.fn.themePluginSort = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__starrating",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = { theme: "krajee-fas", color: "primary", showClear: !1, showCaption: !1 }),
				(n.prototype = {
					initialize: function (t, e) {
						return (this.$el = t), this.setData().setOptions(e).build(), this;
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						if (!e.isFunction(e.fn.rating)) return this;
						var t = this;
						return (
							t.options.wrapper.rating(t.options),
							t.options.wrapper.parents(".rating-container").addClass("rating-" + t.options.color),
							t.options.extraClass && t.options.wrapper.parents(".rating-container").addClass(t.options.extraClass),
							this
						);
					},
				}),
				e.extend(t, { PluginStarRating: n }),
				(e.fn.themePluginStarRating = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__sticky",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = { minWidth: 991, activeClass: "sticky-active" }),
				(n.prototype = {
					initialize: function (t, e) {
						return t.data(i) ? this : ((this.$el = t), this.setData().setOptions(e).build().events(), this);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						if (!e.isFunction(e.fn.pin)) return this;
						var t = this,
							i = e(window);
						if (
							(t.options.wrapper.pin(t.options),
							t.options.wrapper.hasClass("sticky-wrapper-transparent") && t.options.wrapper.parent().addClass("position-absolute w-100"),
							i.afterResize(function () {
								t.options.wrapper.removeAttr("style").removeData("pin"), t.options.wrapper.pin(t.options), i.trigger("scroll");
							}),
							t.options.wrapper.find("img").attr("data-change-src"))
						) {
							var n = t.options.wrapper.find("img"),
								o = n.attr("src"),
								a = n.attr("data-change-src");
							t.changeLogoSrc = function (t) {
								t ? n.attr("src", a) : n.attr("src", o);
							};
						}
						return this;
					},
					events: function () {
						var t = this,
							i = e(window),
							n = t.options.wrapper.find("img"),
							o = !0,
							a = !1,
							s = t.options.wrapper.hasClass("sticky-wrapper-effect-1") ? "sticky-effect-active" : "sticky-active";
						i.on("scroll sticky.effect.active", function () {
							t.options.wrapper.hasClass(s)
								? o && (n.attr("data-change-src") && t.changeLogoSrc(!0), (o = !1), (a = !0))
								: a && (n.attr("data-change-src") && t.changeLogoSrc(!1), (a = !1), (o = !0));
						});
						var r = !1;
						t.options.stickyStartEffectAt &&
							(t.options.stickyStartEffectAt < i.scrollTop() && (t.options.wrapper.addClass("sticky-effect-active"), i.trigger("sticky.effect.active")),
							i.on("scroll", function () {
								t.options.stickyStartEffectAt < i.scrollTop()
									? (t.options.wrapper.addClass("sticky-effect-active"), (r = !0), i.trigger("sticky.effect.active"))
									: (r && (t.options.wrapper.find(".sticky-body").addClass("position-fixed"), (r = !1)),
									  0 == i.scrollTop() && t.options.wrapper.find(".sticky-body").removeClass("position-fixed"),
									  t.options.wrapper.removeClass("sticky-effect-active"));
							})),
							e('[data-bs-toggle="collapse"]').get(0) &&
								e('[data-bs-toggle="collapse"]').on("click", function () {
									setTimeout(function () {
										t.build(), e(window).trigger("scroll");
									}, 1e3);
								});
					},
				}),
				e.extend(t, { PluginSticky: n }),
				(e.fn.themePluginSticky = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__toggle",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = { duration: 350, isAccordion: !1 }),
				(n.prototype = {
					initialize: function (t, e) {
						return t.data(i) ? this : ((this.$el = t), this.setData().setOptions(e).build(), this);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						var t = this,
							i = this.options.wrapper,
							n = i.find("> .toggle"),
							o = null;
						return (
							n.each(function () {
								(o = e(this)),
									o.hasClass("active") && (o.find("> p").addClass("preview-active"), o.find("> .toggle-content").slideDown(t.options.duration)),
									t.events(o);
							}),
							t.options.isAccordion && (t.options.duration = t.options.duration / 2),
							this
						);
					},
					events: function (t) {
						var i = this,
							n = 0,
							o = 0,
							a = null;
						t.find("> label, > .toggle-title").click(function (t) {
							var s = e(this),
								r = s.parent(),
								l = s.parents(".toggle"),
								d = null,
								c = null;
							(i.options.isAccordion && void 0 !== t.originalEvent && ((c = l.find(".toggle.active > label, .toggle.active > .toggle-title")), c[0] == s[0])) ||
								(r.toggleClass("active"),
								r.find("> p").get(0) && ((d = r.find("> p")), (n = d.css("height")), d.css("height", "auto"), (o = d.css("height")), d.css("height", n)),
								(a = r.find("> .toggle-content")),
								r.hasClass("active")
									? (e(d).animate({ height: o }, i.options.duration, function () {
											e(this).addClass("preview-active");
									  }),
									  a.slideDown(i.options.duration, function () {
											c && c.trigger("click");
									  }))
									: (e(d).animate({ height: 0 }, i.options.duration, function () {
											e(this).removeClass("preview-active");
									  }),
									  a.slideUp(i.options.duration)));
						});
					},
				}),
				e.extend(t, { PluginToggle: n }),
				(e.fn.themePluginToggle = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__tweets",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = { username: null, count: 2, URL: "php/twitter-feed.php", iconColor: !1 }),
				(n.prototype = {
					initialize: function (t, e) {
						return t.data(i) ? this : ((this.$el = t), this.setData().setOptions(e).build(), this);
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { wrapper: this.$el })), this;
					},
					build: function () {
						if (null == this.options.username || "" == this.options.username) return this;
						var t = this,
							i = this.options.wrapper;
						return (
							e
								.ajax({
									type: "GET",
									data: { twitter_screen_name: t.options.username, tweets_to_display: t.options.count, icon_color: t.options.iconColor },
									url: t.options.URL,
								})
								.done(function (t) {
									i.html(t).find("a").attr("target", "_blank");
								}),
							this
						);
					},
				}),
				e.extend(t, { PluginTweets: n }),
				(e.fn.themePluginTweets = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			(t = t || {}),
				e.extend(t, {
					PluginValidation: {
						defaults: {
							formClass: "needs-validation",
							validator: {
								highlight: function (t) {
									e(t).addClass("is-invalid").removeClass("is-valid").parent().removeClass("has-success").addClass("has-danger");
								},
								success: function (t, i) {
									e(i).removeClass("is-invalid").addClass("is-valid").parent().removeClass("has-danger").addClass("has-success").find("label.error").remove();
								},
								errorPlacement: function (t, e) {
									"radio" == e.attr("type") || "checkbox" == e.attr("type") ? t.appendTo(e.parent().parent()) : t.insertAfter(e);
								},
							},
						},
						initialize: function (t) {
							return (initialized = !0), this.setOptions(t).build(), this;
						},
						setOptions: function (t) {
							return (this.options = e.extend(!0, {}, this.defaults, t)), this;
						},
						build: function () {
							var t = this;
							return e.isFunction(e.validator)
								? (t.setMessageGroups(), e.validator.setDefaults(t.options.validator), e("." + t.options.formClass).validate(), this)
								: this;
						},
						setMessageGroups: function () {
							e(".checkbox-group[data-msg-required], .radio-group[data-msg-required]").each(function () {
								var t = e(this).data("msg-required");
								e(this).find("input").attr("data-msg-required", t);
							});
						},
					},
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = "__videobackground",
				n = function (t, e) {
					return this.initialize(t, e);
				};
			(n.defaults = {
				overlay: !1,
				volume: 1,
				playbackRate: 1,
				muted: !0,
				loop: !0,
				autoplay: !0,
				position: "50% 50%",
				posterType: "detect",
				className: "vide-video-wrapper",
			}),
				(n.prototype = {
					initialize: function (t, e) {
						return (this.$el = t), this.setData().setOptions(e).build().events(), this;
					},
					setData: function () {
						return this.$el.data(i, this), this;
					},
					setOptions: function (t) {
						return (this.options = e.extend(!0, {}, n.defaults, t, { path: this.$el.data("video-path"), wrapper: this.$el })), this;
					},
					build: function () {
						var t = this;
						if (!e.isFunction(e.fn.vide) || !this.options.path) return this;
						if (this.options.overlay) {
							var i = this.options.overlayClass;
							this.options.wrapper.prepend(e("<div />").addClass(i));
						}
						this.options.wrapper.vide(this.options.path, this.options).first().css("z-index", 0),
							t.changePoster(),
							t.options.wrapper.closest(".owl-carousel").get(0) &&
								t.options.wrapper.closest(".owl-carousel").on("initialized.owl.carousel", function () {
									e(".owl-item.cloned").find("[data-plugin-video-background] .vide-video-wrapper").remove(),
										e(".owl-item.cloned").find("[data-plugin-video-background]").vide(t.options.path, t.options).first().css("z-index", 0),
										t.changePoster(t.options.wrapper.closest(".owl-carousel"));
								});
						var n = t.options.wrapper.find(".video-background-play");
						if (n.get(0)) {
							var o = t.options.wrapper.find(".video-background-play-wrapper");
							t.options.wrapper.find(".video-background-play").on("click", function (e) {
								e.preventDefault(),
									o.get(0)
										? o.animate({ opacity: 0 }, 300, function () {
												o.parent().height(o.outerHeight()), o.remove();
										  })
										: n.animate({ opacity: 0 }, 300, function () {
												n.remove();
										  }),
									setTimeout(function () {
										t.options.wrapper.find("video")[0].play();
									}, 500);
							});
						}
						return e(window).trigger("vide.video.inserted.on.dom"), this;
					},
					changePoster: function (t) {
						var e = this;
						return t && e.options.changePoster
							? (t.find(".owl-item [data-plugin-video-background] .vide-video-wrapper").css({ "background-image": "url(" + e.options.changePoster + ")" }),
							  this)
							: (e.options.changePoster && e.options.wrapper.find(".vide-video-wrapper").css({ "background-image": "url(" + e.options.changePoster + ")" }),
							  this);
					},
					events: function () {
						var t = this;
						return (
							t.options.wrapper.on("video.background.initialize", function () {
								t.build();
							}),
							this
						);
					},
				}),
				e.extend(t, { PluginVideoBackground: n }),
				(e.fn.themePluginVideoBackground = function (t) {
					return this.map(function () {
						var o = e(this);
						return o.data(i) ? o.data(i) : new n(o, t);
					});
				});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = !1;
			e.extend(t, {
				Account: {
					defaults: { wrapper: e("#headerAccount") },
					initialize: function (t, e) {
						return i ? this : ((i = !0), (this.$wrapper = t || this.defaults.wrapper), this.setOptions(e).events(), this);
					},
					setOptions: function (i) {
						return (this.options = e.extend(!0, {}, this.defaults, i, t.fn.getOptions(this.$wrapper.data("plugin-options")))), this;
					},
					events: function () {
						var t = this;
						e(window).on("load", function () {
							e(document).ready(function () {
								setTimeout(function () {
									t.$wrapper.find("input").on("focus", function () {
										t.$wrapper.addClass("open"),
											e(document).mouseup(function (e) {
												t.$wrapper.is(e.target) || 0 !== t.$wrapper.has(e.target).length || t.$wrapper.removeClass("open");
											});
									});
								}, 1500);
							});
						}),
							e("#headerSignUp").on("click", function (e) {
								e.preventDefault(),
									t.$wrapper.addClass("signup").removeClass("signin").removeClass("recover"),
									t.$wrapper.find(".signup-form input:first").focus();
							}),
							e("#headerSignIn").on("click", function (e) {
								e.preventDefault(),
									t.$wrapper.addClass("signin").removeClass("signup").removeClass("recover"),
									t.$wrapper.find(".signin-form input:first").focus();
							}),
							e("#headerRecover").on("click", function (e) {
								e.preventDefault(),
									t.$wrapper.addClass("recover").removeClass("signup").removeClass("signin"),
									t.$wrapper.find(".recover-form input:first").focus();
							}),
							e("#headerRecoverCancel").on("click", function (e) {
								e.preventDefault(),
									t.$wrapper.addClass("signin").removeClass("signup").removeClass("recover"),
									t.$wrapper.find(".signin-form input:first").focus();
							});
					},
				},
			});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var n = !1;
			e.extend(t, {
				Nav: {
					defaults: { wrapper: e("#mainNav"), scrollDelay: 600, scrollAnimation: "easeOutQuad" },
					initialize: function (t, e) {
						return n ? this : ((n = !0), (this.$wrapper = t || this.defaults.wrapper), this.setOptions(e).build().events(), this);
					},
					setOptions: function (i) {
						return (this.options = e.extend(!0, {}, this.defaults, i, t.fn.getOptions(this.$wrapper.data("plugin-options")))), this;
					},
					build: function () {
						var t,
							n = this,
							o = e("html"),
							a = e("#header"),
							s = e("#header .header-nav-main");
						if (
							(n.$wrapper.find("a[data-thumb-preview]").length &&
								n.$wrapper.find("a[data-thumb-preview]").each(function () {
									(t = e("<span />")
										.addClass("thumb-info thumb-info-preview")
										.append(
											e("<span />")
												.addClass("thumb-info-wrapper")
												.append(
													e("<span />")
														.addClass("thumb-info-image")
														.css("background-image", "url(" + e(this).data("thumb-preview") + ")")
												)
										)),
										e(this).append(t);
								}),
							o.hasClass("side-header") || o.hasClass("side-header-hamburguer-sidebar"))
						)
							(o.hasClass("side-header-right") || o.hasClass("side-header-hamburguer-sidebar-right")) &&
								(o.hasClass("side-header-right-no-reverse") || a.find(".dropdown-submenu").addClass("dropdown-reverse"));
						else {
							var r = !1;
							(n.checkReverse = function () {
								r ||
									(n.$wrapper.find(".dropdown, .dropdown-submenu").removeClass("dropdown-reverse"),
									n.$wrapper.find(".dropdown:not(.manual):not(.dropdown-mega), .dropdown-submenu:not(.manual)").each(function () {
										e(this).find(".dropdown-menu").visible(!1, !0, "horizontal") || e(this).addClass("dropdown-reverse");
									}),
									(r = !0));
							}),
								e(window).on("resize", function () {
									r = !1;
								}),
								a.on("mouseover", function () {
									n.checkReverse();
								});
						}
						if (
							(s.hasClass("header-nav-main-clone-items") &&
								s.find("nav > ul > li > a").each(function () {
									var t = e(this).parent(),
										i = e(this).clone(),
										n = e(this).clone(),
										o = e('<span class="wrapper-items-cloned"></span>');
									e(this).addClass("item-original"), n.addClass("item-two"), t.prepend(o), o.append(i).append(n);
								}),
							e("#header.header-floating-icons").length && e(window).width() > 991)
						) {
							var l = {
								$menuFloating: e("#header.header-floating-icons .header-container > .header-row"),
								build: function () {
									var t = this;
									t.init();
								},
								init: function () {
									var t = this,
										i = 0;
									e(window).scroll(function () {
										var n = (100 * e(window).scrollTop()) / (e(document).height() - e(window).height()),
											o = e(this).scrollTop();
										(i = e(document).height() / e(window).height()),
											t.$menuFloating.find(".header-column > .header-row").css({ transform: "translateY( calc(" + n + "vh - " + o / i + "px) )" });
									});
								},
							};
							l.build();
						}
						if (e(".header-nav-links-vertical-slide").length) {
							var d = {
								$mainNav: e("#mainNav"),
								$mainNavItem: e("#mainNav li"),
								build: function () {
									var t = this;
									t.menuNav();
								},
								menuNav: function () {
									var t = this;
									t.$mainNavItem.on("click", function (t) {
										var n = e(this),
											o = e(this).parent(),
											a = e(this).find("ul").first(),
											s = e(this).closest(".next-menu"),
											r = n.hasClass("dropdown") || n.hasClass("dropdown-submenu"),
											l = n.hasClass("back-button"),
											d = a.find("> li").length * a.find("> li").outerHeight() - a.outerHeight(),
											c = s.find("> li").length * s.find("> li").outerHeight() - s.outerHeight();
										if (r) {
											for (
												o.addClass("next-menu"),
													a.addClass("visible"),
													o.css({ overflow: "visible", "overflow-y": "visible" }),
													d > 0 && a.css({ overflow: "hidden", "overflow-y": "scroll" }),
													i = 0;
												i < a.find("> li").length;
												i++
											)
												a.outerHeight() < e(".header-row-side-header").outerHeight() - 100 && a.css({ height: a.outerHeight() + a.find("> li").outerHeight() });
											a.css({ "padding-top": d + "px" });
										}
										l &&
											(o.parent().parent().removeClass("next-menu"), o.removeClass("visible"), c > 0 && s.css({ overflow: "hidden", "overflow-y": "scroll" })),
											t.stopPropagation();
									});
								},
							};
							e(window).trigger("resize"),
								e(window).width() > 991 && d.build(),
								e(document).ready(function () {
									e(window).afterResize(function () {
										e(window).width() > 991 && d.build();
									});
								});
						}
						if (
							(e(".header-nav-main-mobile-dark").length &&
								e("#header:not(.header-transparent-dark-bottom-border):not(.header-transparent-light-bottom-border)").addClass("header-no-border-bottom"),
							e(window).width() > 991)
						) {
							var c = !1;
							a.find(".header-nav-main nav > ul > li > a").on("focus", function () {
								e(window).width() > 991 && (c || ((c = !0), e(this).trigger("blur"), n.focusMenuWithChildren()));
							});
						}
						return this;
					},
					focusMenuWithChildren: function () {
						function t() {
							for (var t = this; -1 === t.className.indexOf("header-nav-main"); )
								"li" === t.tagName.toLowerCase() &&
									(-1 !== t.className.indexOf("accessibility-open")
										? (t.className = t.className.replace(" accessibility-open", ""))
										: (t.className += " accessibility-open")),
									(t = t.parentElement);
						}
						var e,
							i,
							n,
							o = document.querySelector(
								"html:not(.side-header):not(.side-header-hamburguer-sidebar):not(.side-header-overlay-full-screen) .header-nav-main > nav"
							);
						if (!o) return !1;
						for (e = o.getElementsByTagName("a"), i = 0, n = e.length; i < n; i++) e[i].addEventListener("focus", t, !0), e[i].addEventListener("blur", t, !0);
					},
					events: function () {
						var i = this,
							n = e("html"),
							o = e("#header"),
							a = e(window),
							s = e(".header-body").outerHeight();
						o.hasClass("header") && (o = e(".header")),
							o.find('a[href="#"]').on("click", function (t) {
								t.preventDefault();
							}),
							n.hasClass("side-header-hamburguer-sidebar")
								? o.find(".dropdown-toggle, .dropdown-submenu > a").append('<i class="fas fa-chevron-down fa-chevron-right"></i>')
								: o.find(".dropdown-toggle, .dropdown-submenu > a").append('<i class="fas fa-chevron-down"></i>'),
							o
								.find(
									'.dropdown-toggle[href="#"], .dropdown-submenu a[href="#"], .dropdown-toggle[href!="#"] .fa-chevron-down, .dropdown-submenu a[href!="#"] .fa-chevron-down'
								)
								.on("click", function (i) {
									if ((i.preventDefault(), a.width() < 992)) {
										e(this).closest("li").toggleClass("open");
										var r = o.hasClass("header-effect-shrink") && n.hasClass("sticky-header-active") ? t.StickyHeader.options.stickyHeaderContainerHeight : s;
										e(".header-body").animate({ height: e(".header-nav-main nav").outerHeight(!0) + r + 10 }, 0);
									}
								}),
							o.find("li a.active").addClass("current-page-active"),
							o
								.find(
									'.header-nav-click-to-open .dropdown-toggle[href="#"], .header-nav-click-to-open .dropdown-submenu a[href="#"], .header-nav-click-to-open .dropdown-toggle > i'
								)
								.on("click", function (t) {
									if (
										(!e("html").hasClass("side-header-hamburguer-sidebar") && a.width() > 991 && (t.preventDefault(), t.stopPropagation()), a.width() > 991)
									) {
										if (
											(t.preventDefault(),
											t.stopPropagation(),
											o.find("li a.active").removeClass("active"),
											"I" == e(this).prop("tagName") ? e(this).parent().addClass("active") : e(this).addClass("active"),
											e(this).closest("li").hasClass("open"))
										)
											e(this).closest("li").removeClass("open"),
												o.find("li a.active").removeClass("active"),
												o.find("li a.current-page-active").addClass("active");
										else {
											var i = e(this).closest("li"),
												n = !1;
											"I" == e(this).prop("tagName") &&
												(e("#header .dropdown.open").removeClass("open"), e("#header .dropdown-menu .dropdown-submenu.open").removeClass("open")),
												e(this).parent().hasClass("dropdown-submenu") && (n = !0),
												e(this).closest(".dropdown-menu").find(".dropdown-submenu.open").removeClass("open"),
												e(this).parent(".dropdown").parent().find(".dropdown.open").removeClass("open"),
												n || e(this).parent().find(".dropdown-submenu.open").removeClass("open"),
												i.addClass("open"),
												e(document)
													.off("click.nav-click-to-open")
													.on("click.nav-click-to-open", function (t) {
														i.is(t.target) ||
															0 !== i.has(t.target).length ||
															(i.removeClass("open"),
															i.parents(".open").removeClass("open"),
															o.find("li a.active").removeClass("active"),
															o.find("li a.current-page-active").addClass("active"));
													});
										}
										a.trigger({ type: "resize", from: "header-nav-click-to-open" });
									}
								}),
							o.find("[data-collapse-nav]").on("click", function (t) {
								e(this).parents(".collapse").removeClass("show");
							}),
							o.find(".header-nav-features-toggle").on("click", function (t) {
								t.preventDefault();
								var i = e(this).parent();
								if (e(this).siblings(".header-nav-features-dropdown").hasClass("show")) e(this).siblings(".header-nav-features-dropdown").removeClass("show");
								else {
									var n = e(this).siblings(".header-nav-features-dropdown");
									e(".header-nav-features-dropdown.show").removeClass("show"),
										n.addClass("show"),
										e(document)
											.off("click.header-nav-features-toggle")
											.on("click.header-nav-features-toggle", function (t) {
												i.is(t.target) || 0 !== i.has(t.target).length || e(".header-nav-features-dropdown.show").removeClass("show");
											}),
										e(this).attr("data-focus") && e("#" + e(this).attr("data-focus")).focus();
								}
							});
						var r = e(".hamburguer-btn:not(.side-panel-toggle)"),
							l = e("#header.side-header, #header.side-header-overlay-full-screen");
						if (
							(r.on("click", function () {
								"false" != e(this).attr("data-set-active") && e(this).toggleClass("active"),
									l.toggleClass("side-header-hide"),
									n.toggleClass("side-header-hide"),
									a.trigger("resize");
							}),
							e(".hamburguer-close:not(.side-panel-toggle)").on("click", function () {
								e(".hamburguer-btn:not(.hamburguer-btn-side-header-mobile-show)").trigger("click");
							}),
							e(".header-nav-main nav").on("show.bs.collapse", function () {
								e(this).removeClass("closed"),
									e("html").addClass("mobile-menu-opened"),
									e(".header-body").animate({ height: e(".header-body").outerHeight() + e(".header-nav-main nav").outerHeight(!0) + 10 }),
									e("#header").is(".header-bottom-slider, .header-below-slider") &&
										!e("html").hasClass("sticky-header-active") &&
										i.scrollToTarget(e("#header"), 0);
							}),
							e(".header-nav-main nav").on("hide.bs.collapse", function () {
								e(this).addClass("closed"),
									e("html").removeClass("mobile-menu-opened"),
									e(".header-body").animate({ height: e(".header-body").outerHeight() - e(".header-nav-main nav").outerHeight(!0) }, function () {
										e(this).height("auto");
									});
							}),
							a.on("stickyHeader.activate", function () {
								a.width() < 992 &&
									o.hasClass("header-effect-shrink") &&
									"true" == e(".header-btn-collapse-nav").attr("aria-expanded") &&
									e(".header-body").animate({
										height:
											e(".header-nav-main nav").outerHeight(!0) +
											t.StickyHeader.options.stickyHeaderContainerHeight +
											(e(".header-nav-bar").length ? e(".header-nav-bar").outerHeight() : 0),
									});
							}),
							a.on("stickyHeader.deactivate", function () {
								a.width() < 992 &&
									o.hasClass("header-effect-shrink") &&
									"true" == e(".header-btn-collapse-nav").attr("aria-expanded") &&
									e(".header-body").animate({ height: s + e(".header-nav-main nav").outerHeight(!0) + 10 });
							}),
							a.on("resize.removeOpen", function (t) {
								"header-nav-click-to-open" != t.from &&
									setTimeout(function () {
										a.width() > 991 && o.find(".dropdown.open").removeClass("open");
									}, 100);
							}),
							e(document).ready(function () {
								if (a.width() > 991) {
									var t = !1;
									a.on("resize", function (i) {
										"header-nav-click-to-open" != i.from &&
											(o.find(".dropdown.open").removeClass("open"),
											a.width() < 992 &&
												0 == t &&
												((s = e(".header-body").outerHeight()),
												(t = !0),
												setTimeout(function () {
													t = !1;
												}, 500)));
									});
								}
							}),
							n.hasClass("side-header") &&
								(a.width() < 992 &&
									o.css({
										height:
											e(".header-body .header-container").outerHeight() +
											(parseInt(e(".header-body").css("border-top-width")) + parseInt(e(".header-body").css("border-bottom-width"))),
									}),
								e(document).ready(function () {
									a.afterResize(function () {
										a.width() < 992
											? o.css({
													height:
														e(".header-body .header-container").outerHeight() +
														(parseInt(e(".header-body").css("border-top-width")) + parseInt(e(".header-body").css("border-bottom-width"))),
											  })
											: o.css({ height: "" });
									});
								})),
							e("[data-hash]").length &&
								e("[data-hash]").on("mouseover", function () {
									var t = e(this);
									if (!t.data("__dataHashBinded")) {
										var o = t.attr("href"),
											s = t.is("[data-hash-offset]") ? t.data("hash-offset") : 0,
											r = t.is("[data-hash-delay]") ? t.data("hash-delay") : 0,
											d = !!t.is("[data-hash-force]"),
											c = e(window).width();
										t.is("[data-hash-offset-sm]") && c > 576 && (s = t.data("hash-offset-sm")),
											t.is("[data-hash-offset-md]") && c > 768 && (s = t.data("hash-offset-md")),
											t.is("[data-hash-offset-lg]") && c > 992 && (s = t.data("hash-offset-lg")),
											t.is("[data-hash-offset-xl]") && c > 1200 && (s = t.data("hash-offset-xl")),
											t.is("[data-hash-offset-xxl]") && c > 1400 && (s = t.data("hash-offset-xxl")),
											e(o).length || ((o = o.split("#")), (o = "#" + o[1])),
											-1 != o.indexOf("#") &&
												e(o).length &&
												t.on("click", function (c) {
													c.preventDefault(),
														(e(c.target).is("i") && !d) ||
															setTimeout(function () {
																if (
																	(t.parents(".collapse.show").collapse("hide"),
																	l.addClass("side-header-hide"),
																	n.addClass("side-header-hide"),
																	a.trigger("resize"),
																	i.scrollToTarget(o, s),
																	t.data("hash-trigger-click"))
																) {
																	var r = e(t.data("hash-trigger-click")),
																		d = t.data("hash-trigger-click-delay") ? t.data("hash-trigger-click-delay") : 0;
																	r.length &&
																		setTimeout(function () {
																			r.closest(".nav-tabs").length ? new bootstrap.Tab(r[0]).show() : r.trigger("click");
																		}, d);
																}
															}, r);
												}),
											e(this).data("__dataHashBinded", !0);
									}
								}),
							e("#header.header-floating-icons").length &&
								e("#header.header-floating-icons [data-hash]")
									.off()
									.each(function () {
										var t = e(this).attr("href"),
											i = e(this).is("[data-hash-offset]") ? e(this).data("hash-offset") : 0;
										e(t).length &&
											e(this).on("click", function (n) {
												n.preventDefault(), e("html, body").animate({ scrollTop: e(t).offset().top - i }, 600, "easeOutQuad", function () {});
											});
									}),
							e(".side-panel-toggle").length)
						) {
							var d = e("html").attr("class");
							e(".side-panel-toggle").on("click", function (t) {
								var i = e(this).data("extra-class"),
									n = i ? 100 : 0,
									o = !!e(this).data("is-active") && e(this).data("is-active");
								if ((t.preventDefault(), o)) return e("html").removeClass("side-panel-open"), e(this).data("is-active", !1), !1;
								i && (e(".side-panel-wrapper").css("transition", "none"), e("html").removeClass().addClass(d).addClass(i)),
									setTimeout(function () {
										e(".side-panel-wrapper").css("transition", ""), e("html").toggleClass("side-panel-open");
									}, n),
									e(this).data("is-active", !0);
							}),
								e(document).on("click", function (t) {
									e(t.target).closest(".side-panel-wrapper").length ||
										e(t.target).hasClass("side-panel-toggle") ||
										(e(".hamburguer-btn.side-panel-toggle:not(.side-panel-close)").removeClass("active"),
										e("html").removeClass("side-panel-open"),
										e(".side-panel-toggle").data("is-active", !1));
								});
						}
						return this;
					},
					scrollToTarget: function (t, i) {
						var n = this,
							o = e(t).offset().top;
						return (
							e("body").addClass("scrolling"),
							e("html, body").animate({ scrollTop: e(t).offset().top - i }, n.options.scrollDelay, n.options.scrollAnimation, function () {
								e("body").removeClass("scrolling"),
									e(t).offset().top != o && e("html, body").animate({ scrollTop: e(t).offset().top - i }, 1, n.options.scrollAnimation, function () {});
							}),
							this
						);
					},
				},
			});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = !1;
			e.extend(t, {
				Newsletter: {
					defaults: { wrapper: e("#newsletterForm") },
					initialize: function (t, e) {
						return i ? this : ((i = !0), (this.$wrapper = t || this.defaults.wrapper), this.setOptions(e).build(), this);
					},
					setOptions: function (i) {
						return (this.options = e.extend(!0, {}, this.defaults, i, t.fn.getOptions(this.$wrapper.data("plugin-options")))), this;
					},
					build: function () {
						if (!e.isFunction(e.fn.validate)) return this;
						var t = this,
							i = t.$wrapper.find("#newsletterEmail"),
							n = e("#newsletterSuccess"),
							o = e("#newsletterError");
						return (
							t.$wrapper.validate({
								submitHandler: function (a) {
									e.ajax({
										type: "POST",
										url: t.$wrapper.attr("action"),
										data: { email: i.val() },
										dataType: "json",
										success: function (t) {
											"success" == t.response
												? (n.removeClass("d-none"),
												  o.addClass("d-none"),
												  i.val("").blur().closest(".control-group").removeClass("success").removeClass("error"))
												: (o.html(t.message),
												  o.removeClass("d-none"),
												  n.addClass("d-none"),
												  i.blur().closest(".control-group").removeClass("success").addClass("error"));
										},
									});
								},
								rules: { newsletterEmail: { required: !0, email: !0 } },
								errorPlacement: function (t, e) {},
							}),
							this
						);
					},
				},
			});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = !1;
			e.extend(t, {
				Search: {
					defaults: { wrapper: e("#searchForm") },
					initialize: function (t, e) {
						return i ? this : ((i = !0), (this.$wrapper = t || this.defaults.wrapper), this.setOptions(e).build(), this);
					},
					setOptions: function (i) {
						return (this.options = e.extend(!0, {}, this.defaults, i, t.fn.getOptions(this.$wrapper.data("plugin-options")))), this;
					},
					build: function () {
						return e.isFunction(e.fn.validate)
							? (this.$wrapper.validate({ errorPlacement: function (t, e) {} }),
							  t.fn.execOnceTroughEvent("#header", "mouseover.search.reveal", function () {
									e(".header-nav-features-search-reveal").each(function () {
										var t = e(this),
											i = e("#header"),
											n = e("html");
										t.find(".header-nav-features-search-show-icon").on("click", function () {
											t.addClass("show"), i.addClass("search-show"), n.addClass("search-show"), e("#headerSearch").focus();
										}),
											t.find(".header-nav-features-search-hide-icon").on("click", function () {
												t.removeClass("show"), i.removeClass("search-show"), n.removeClass("search-show");
											});
									});
							  }),
							  this)
							: this;
					},
				},
			});
		}.apply(this, [window.theme, jQuery]),
		function (t, e) {
			t = t || {};
			var i = !1;
			e.extend(t, {
				StickyHeader: {
					defaults: {
						wrapper: e("#header"),
						headerBody: e("#header .header-body"),
						stickyEnabled: !0,
						stickyEnableOnBoxed: !0,
						stickyEnableOnMobile: !1,
						stickyStartAt: 0,
						stickyStartAtElement: !1,
						stickySetTop: 0,
						stickyEffect: "",
						stickyHeaderContainerHeight: !1,
						stickyChangeLogo: !1,
						stickyChangeLogoWrapper: !0,
						stickyForce: !1,
						stickyScrollUp: !1,
						stickyScrollValue: 0,
					},
					initialize: function (t, n) {
						return i
							? this
							: ((i = !0),
							  (this.$wrapper = t || this.defaults.wrapper),
							  this.$wrapper.hasClass("header") && (this.$wrapper = e(".header[data-plugin-options]")),
							  this.setOptions(n).build().events(),
							  this);
					},
					setOptions: function (i) {
						return (this.options = e.extend(!0, {}, this.defaults, i, t.fn.getOptions(this.$wrapper.data("plugin-options")))), this;
					},
					build: function () {
						if (e(window).width() < 992 && 0 == this.options.stickyEnableOnMobile) return e("html").addClass("sticky-header-mobile-disabled"), this;
						if (
							(!this.options.stickyEnableOnBoxed && e("html").hasClass("boxed")) ||
							(e("html").hasClass("side-header-hamburguer-sidebar") && !this.options.stickyForce) ||
							!this.options.stickyEnabled
						)
							return this;
						var i = this;
						i.options.wrapper.hasClass("header") && ((i.options.wrapper = e(".header")), (i.options.headerBody = e(".header .header-body")));
						var n = e("html"),
							o = e(window),
							a = n.hasClass("side-header"),
							s = i.options.wrapper.find(".header-top").outerHeight(),
							r = i.options.wrapper.find(".header-container").outerHeight();
						if (
							(n.addClass("sticky-header-enabled"),
							parseInt(i.options.stickySetTop) < 0 && n.addClass("sticky-header-negative"),
							i.options.stickyScrollUp && n.addClass("sticky-header-scroll-direction"),
							e(".notice-top-bar").get(0) &&
								((1 != parseInt(i.options.stickySetTop) && "shrink" != i.options.stickyEffect) ||
									e(".body").on("transitionend webkitTransitionEnd oTransitionEnd", function () {
										setTimeout(function () {
											n.hasClass("sticky-header-active") ||
												i.options.headerBody.animate({ top: e(".notice-top-bar").outerHeight() }, 300, function () {
													n.hasClass("sticky-header-active") && i.options.headerBody.css("top", 0);
												});
										}, 0);
									})),
							i.options.stickyStartAtElement)
						) {
							var l = e(i.options.stickyStartAtElement);
							e(window).on("scroll resize sticky.header.resize", function () {
								i.options.stickyStartAt = l.offset().top;
							}),
								e(window).trigger("sticky.header.resize");
						}
						i.options.wrapper.find(".header-top").get(0),
							a ||
								(e(".header-logo-sticky-change").get(0)
									? o.on("stickyChangeLogo.loaded", function () {
											i.options.wrapper.css("height", i.options.headerBody.outerHeight());
									  })
									: i.options.wrapper.css("height", i.options.headerBody.outerHeight()),
								"shrink" == i.options.stickyEffect &&
									(e(document).ready(function () {
										o.scrollTop() >= i.options.stickyStartAt
											? i.options.wrapper.find(".header-container").on("transitionend webkitTransitionEnd oTransitionEnd", function () {
													i.options.headerBody.css("position", "fixed");
											  })
											: n.hasClass("boxed") || i.options.headerBody.css("position", "fixed");
									}),
									i.options.wrapper.find(".header-container").css("height", r),
									i.options.wrapper.find(".header-top").css("height", s))),
							i.options.stickyHeaderContainerHeight &&
								i.options.wrapper.find(".header-container").css("height", i.options.wrapper.find(".header-container").outerHeight()),
							n.hasClass("boxed") && "shrink" == i.options.stickyEffect && i.boxedLayout();
						var d = !0,
							c = !1,
							h = i.options.stickyStartAt;
						if (
							((i.checkStickyHeader = function () {
								var t = e(".notice-top-bar");
								if (
									(t.get(0)
										? (i.options.stickyStartAt = t.data("sticky-start-at") ? t.data("sticky-start-at") : e(".notice-top-bar").outerHeight())
										: n.hasClass("boxed")
										? (i.options.stickyStartAt = h + 25)
										: (i.options.stickyStartAt = h),
									o.width() > 991 && n.hasClass("side-header"))
								)
									return n.removeClass("sticky-header-active"), void (d = !0);
								o.scrollTop() >= parseInt(i.options.stickyStartAt)
									? d && (i.activateStickyHeader(), (d = !1), (c = !0))
									: c && (i.deactivateStickyHeader(), (c = !1), (d = !0)),
									i.options.stickyScrollUp &&
										((i.options.stickyScrollNewValue = window.pageYOffset),
										i.options.stickyScrollValue - i.options.stickyScrollNewValue < 0
											? n.removeClass("sticky-header-scroll-up").addClass("sticky-header-scroll-down")
											: i.options.stickyScrollValue - i.options.stickyScrollNewValue > 0 &&
											  n.removeClass("sticky-header-scroll-down").addClass("sticky-header-scroll-up"),
										(i.options.stickyScrollValue = i.options.stickyScrollNewValue));
							}),
							(i.activateStickyHeader = function () {
								if (o.width() < 992) {
									if (0 == i.options.stickyEnableOnMobile) return i.deactivateStickyHeader(), i.options.headerBody.css({ position: "relative" }), !1;
								} else if (a) return void i.deactivateStickyHeader();
								if (
									(n.addClass("sticky-header-active"),
									"reveal" == i.options.stickyEffect &&
										(i.options.headerBody.css("top", "-" + i.options.stickyStartAt + "px"),
										i.options.headerBody.animate({ top: i.options.stickySetTop }, 400, function () {})),
									"shrink" == i.options.stickyEffect)
								)
									if (
										(i.options.wrapper.find(".header-top").get(0) &&
											i.options.wrapper.find(".header-top").css({ height: 0, "min-height": 0, overflow: "hidden" }),
										i.options.stickyHeaderContainerHeight)
									)
										i.options.wrapper.find(".header-container").css({ height: i.options.stickyHeaderContainerHeight, "min-height": 0 });
									else {
										i.options.wrapper.find(".header-container").css({ height: (r / 3) * 2, "min-height": 0 });
										var s = r - (r / 3) * 2;
										e(".main")
											.css({ transform: "translate3d(0, -" + s + "px, 0)", transition: "ease transform 300ms" })
											.addClass("has-sticky-header-transform"),
											n.hasClass("boxed") && i.options.headerBody.css("position", "fixed");
									}
								i.options.headerBody.css("top", i.options.stickySetTop),
									i.options.stickyChangeLogo && i.changeLogo(!0),
									e("[data-sticky-header-style]").length &&
										e("[data-sticky-header-style]").each(function () {
											var i = e(this),
												n = t.fn.getOptions(i.data("sticky-header-style-active")),
												a = t.fn.getOptions(i.data("sticky-header-style"));
											o.width() > a.minResolution && i.css(n);
										}),
									e.event.trigger({ type: "stickyHeader.activate" });
							}),
							(i.deactivateStickyHeader = function () {
								if ((n.removeClass("sticky-header-active"), e(window).width() < 992 && 0 == i.options.stickyEnableOnMobile)) return !1;
								"shrink" == i.options.stickyEffect &&
									(n.hasClass("boxed")
										? (i.options.headerBody.css("position", "absolute"),
										  o.scrollTop() > e(".body").offset().top && i.options.headerBody.css("position", "fixed"))
										: i.options.headerBody.css("position", "fixed"),
									i.options.wrapper.find(".header-top").get(0) &&
										(i.options.wrapper.find(".header-top").css({ height: s, overflow: "visible" }),
										i.options.wrapper.find(".header-top [data-icon]").length &&
											t.fn.intObsInit(".header-top [data-icon]:not(.svg-inline--fa)", "themePluginIcon")),
									i.options.wrapper.find(".header-container").css({ height: r })),
									i.options.headerBody.css("top", 0),
									i.options.stickyChangeLogo && i.changeLogo(!1),
									e("[data-sticky-header-style]").length &&
										e("[data-sticky-header-style]").each(function () {
											var i = e(this),
												n = t.fn.getOptions(i.data("sticky-header-style-deactive")),
												a = t.fn.getOptions(i.data("sticky-header-style"));
											o.width() > a.minResolution && i.css(n);
										}),
									e.event.trigger({ type: "stickyHeader.deactivate" });
							}),
							parseInt(i.options.stickyStartAt) <= 0 && i.activateStickyHeader(),
							i.options.stickyChangeLogo)
						) {
							var u = i.options.wrapper.find(".header-logo"),
								p = u.find("img"),
								f = p.attr("width"),
								g = p.attr("height"),
								m = parseInt(p.attr("data-sticky-top") ? p.attr("data-sticky-top") : 0),
								v = parseInt(p.attr("data-sticky-width") ? p.attr("data-sticky-width") : "auto"),
								w = parseInt(p.attr("data-sticky-height") ? p.attr("data-sticky-height") : "auto");
							i.options.stickyChangeLogoWrapper && u.css({ width: p.outerWidth(!0), height: p.outerHeight(!0) }),
								(i.changeLogo = function (t) {
									t ? p.css({ top: m, width: v, height: w }) : p.css({ top: 0, width: f, height: g });
								}),
								e.event.trigger({ type: "stickyChangeLogo.loaded" });
						}
						var y,
							b = !1;
						return (
							(i.checkSideHeader = function () {
								o.width() < 992 && 0 == b && ((y = i.options.headerBody.height()), (b = !0)),
									0 == i.options.stickyStartAt && a && i.options.wrapper.css("min-height", 0),
									i.options.stickyStartAt > 0 && a && o.width() < 992 && i.options.wrapper.css("min-height", y);
							}),
							this
						);
					},
					events: function () {
						var t = this;
						return e(window).width() < 992 && 0 == this.options.stickyEnableOnMobile
							? this
							: (!this.options.stickyEnableOnBoxed && e("body").hasClass("boxed")) ||
							  (e("html").hasClass("side-header-hamburguer-sidebar") && !this.options.stickyForce) ||
							  !this.options.stickyEnabled
							? this
							: (t.options.alwaysStickyEnabled
									? t.activateStickyHeader()
									: e(window).on("scroll resize", function () {
											e(window).width() < 992 && 0 == t.options.stickyEnableOnMobile
												? (t.options.headerBody.css({ position: "" }),
												  "shrink" == t.options.stickyEffect && t.options.wrapper.find(".header-top").css({ height: "" }),
												  t.deactivateStickyHeader())
												: t.checkStickyHeader();
									  }),
							  e(window).on("load resize", function () {
									t.checkSideHeader();
							  }),
							  e(window).on("layout.boxed", function () {
									t.boxedLayout();
							  }),
							  this);
					},
					boxedLayout: function () {
						var t = this,
							i = e(window);
						return (
							e("html").hasClass("boxed") &&
								"shrink" == t.options.stickyEffect &&
								(0 == parseInt(t.options.stickyStartAt) && i.width() > 991 && (t.options.stickyStartAt = 30),
								t.options.headerBody.css({ position: "absolute", top: 0 }),
								i.on("scroll", function () {
									i.scrollTop() > e(".body").offset().top
										? t.options.headerBody.css({ position: "fixed", top: 0 })
										: t.options.headerBody.css({ position: "absolute", top: 0 });
								})),
							this
						);
					},
				},
			});
		}.apply(this, [window.theme, jQuery]),
		function (t) {
			"use strict";
			setTimeout(function () {
				console.log("WTF!!"), void 0 !== theme.PluginScrollToTop && theme.PluginScrollToTop.initialize();
				var e = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')),
					i =
						(e.map(function (t) {
							return new bootstrap.Tooltip(t);
						}),
						[].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')));
				i.map(function (t) {
					return new bootstrap.Popover(t);
				});
				t.isFunction(t.validator) && void 0 !== theme.PluginValidation && theme.PluginValidation.initialize(),
					t.isFunction(t.fn.themePluginAnimate) &&
						t("[data-appear-animation]").length &&
						theme.fn.dynIntObsInit("[data-appear-animation], [data-appear-animation-svg]", "themePluginAnimate", theme.PluginAnimate.defaults),
					t.isFunction(t.fn.themePluginAnimatedLetters) &&
						(t("[data-plugin-animated-letters]").length || t(".animated-letters").length) &&
						theme.fn.intObsInit("[data-plugin-animated-letters]:not(.manual), .animated-letters", "themePluginAnimatedLetters"),
					t.isFunction(t.fn.themePluginBeforeAfter) &&
						t("[data-plugin-before-after]").length &&
						theme.fn.intObsInit("[data-plugin-before-after]:not(.manual)", "themePluginBeforeAfter"),
					t.isFunction(t.fn.themePluginCarouselLight) &&
						t(".owl-carousel-light").length &&
						theme.fn.intObsInit(".owl-carousel-light", "themePluginCarouselLight"),
					t.isFunction(t.fn.themePluginCarousel) &&
						t("[data-plugin-carousel]:not(.manual), .owl-carousel:not(.manual)").length &&
						theme.fn.intObsInit("[data-plugin-carousel]:not(.manual), .owl-carousel:not(.manual)", "themePluginCarousel"),
					t.isFunction(t.fn.themePluginChartCircular) &&
						(t("[data-plugin-chart-circular]").length || t(".circular-bar-chart").length) &&
						theme.fn.dynIntObsInit(
							"[data-plugin-chart-circular]:not(.manual), .circular-bar-chart:not(.manual)",
							"themePluginChartCircular",
							theme.PluginChartCircular.defaults
						),
					t.isFunction(t.fn.themePluginCountdown) &&
						(t("[data-plugin-countdown]").length || t(".countdown").length) &&
						theme.fn.intObsInit("[data-plugin-countdown]:not(.manual), .countdown", "themePluginCountdown"),
					t.isFunction(t.fn.themePluginCounter) &&
						(t("[data-plugin-counter]").length || t(".counters [data-to]").length) &&
						theme.fn.dynIntObsInit("[data-plugin-counter]:not(.manual), .counters [data-to]", "themePluginCounter", theme.PluginCounter.defaults),
					t.isFunction(t.fn.themePluginCursorEffect) &&
						t("[data-plugin-cursor-effect]").length &&
						theme.fn.intObsInit("[data-plugin-cursor-effect]:not(.manual)", "themePluginCursorEffect"),
					t.isFunction(t.fn.themePluginFloatElement) &&
						t("[data-plugin-float-element]").length &&
						theme.fn.intObsInit("[data-plugin-float-element], [data-plugin-float-element-svg]", "themePluginFloatElement"),
					t.isFunction(t.fn.themePluginGDPR) &&
						t("[data-plugin-gdpr]").length &&
						t(function () {
							t("[data-plugin-gdpr]:not(.manual)").each(function () {
								var e,
									i = t(this),
									n = theme.fn.getOptions(i.data("plugin-options"));
								n && (e = n), i.themePluginGDPR(e);
							});
						}),
					t.isFunction(t.fn.themePluginGDPRWrapper) &&
						t("[data-plugin-gdpr-wrapper]").length &&
						t(function () {
							t("[data-plugin-gdpr-wrapper]:not(.manual)").each(function () {
								var e,
									i = t(this),
									n = theme.fn.getOptions(i.data("plugin-options"));
								n && (e = n), i.themePluginGDPRWrapper(e);
							});
						}),
					t.isFunction(t.fn.themePluginHoverEffect) &&
						t("[data-plugin-hover-effect], .hover-effect-3d").length &&
						theme.fn.intObsInit("[data-plugin-hover-effect]:not(.manual), .hover-effect-3d:not(.manual)", "themePluginHoverEffect"),
					t.isFunction(t.fn.themePluginIcon) &&
						t("[data-icon]").length &&
						theme.fn.dynIntObsInit("[data-icon]:not(.svg-inline--fa)", "themePluginIcon", theme.PluginIcon.defaults),
					t.isFunction(t.fn.themePluginLightbox) &&
						(t("[data-plugin-lightbox]").length || t(".lightbox").length) &&
						theme.fn.execOnceTroughEvent("[data-plugin-lightbox]:not(.manual), .lightbox:not(.manual)", "mouseover.trigger.lightbox", function () {
							var e,
								i = t(this),
								n = theme.fn.getOptions(i.data("plugin-options"));
							n && (e = n), i.themePluginLightbox(e);
						}),
					t.isFunction(t.fn.themePluginMasonry) &&
						t("[data-plugin-masonry]").length &&
						t(function () {
							t("[data-plugin-masonry]:not(.manual)").each(function () {
								var e,
									i = t(this),
									n = theme.fn.getOptions(i.data("plugin-options"));
								n && (e = n), i.themePluginMasonry(e);
							});
						}),
					t.isFunction(t.fn.themePluginMatchHeight) &&
						t("[data-plugin-match-height]").length &&
						t(function () {
							t("[data-plugin-match-height]:not(.manual)").each(function () {
								var e,
									i = t(this),
									n = theme.fn.getOptions(i.data("plugin-options"));
								n && (e = n), i.themePluginMatchHeight(e);
							});
						}),
					t.isFunction(t.fn.themePluginParallax) &&
						t("[data-plugin-parallax]").length &&
						theme.fn.intObsInit("[data-plugin-parallax]:not(.manual)", "themePluginParallax"),
					t.isFunction(t.fn.themePluginProgressBar) &&
						(t("[data-plugin-progress-bar]") || t("[data-appear-progress-animation]").length) &&
						theme.fn.dynIntObsInit(
							"[data-plugin-progress-bar]:not(.manual), [data-appear-progress-animation]",
							"themePluginProgressBar",
							theme.PluginProgressBar.defaults
						),
					t.isFunction(t.fn.themePluginRandomImages) &&
						t("[data-plugin-random-images]").length &&
						theme.fn.dynIntObsInit(".plugin-random-images", "themePluginRandomImages", theme.PluginRandomImages.defaults),
					t.isFunction(t.fn.themePluginReadMore) &&
						t("[data-plugin-readmore]").length &&
						theme.fn.intObsInit("[data-plugin-readmore]:not(.manual)", "themePluginReadMore"),
					t.isFunction(t.fn.themePluginRevolutionSlider) &&
						(t("[data-plugin-revolution-slider]").length || t(".slider-container .slider").length) &&
						t(function () {
							t("[data-plugin-revolution-slider]:not(.manual), .slider-container .slider:not(.manual)").each(function () {
								var e,
									i = t(this),
									n = theme.fn.getOptions(i.data("plugin-options"));
								n && (e = n), i.themePluginRevolutionSlider(e);
							});
						}),
					t.isFunction(t.fn.themePluginScrollSpy) &&
						t("[data-plugin-scroll-spy]").length &&
						t(function () {
							t("[data-plugin-scroll-spy]:not(.manual)").each(function () {
								var e,
									i = t(this),
									n = theme.fn.getOptions(i.data("plugin-options"));
								n && (e = n), i.themePluginScrollSpy(e);
							});
						}),
					t.isFunction(t.fn.nanoScroller) && t("[data-plugin-scrollable]").length && theme.fn.intObsInit("[data-plugin-scrollable]", "themePluginScrollable"),
					t.isFunction(t.fn.themePluginSectionScroll) &&
						t("[data-plugin-section-scroll]").length &&
						t(function () {
							t("[data-plugin-section-scroll]:not(.manual)").each(function () {
								var e,
									i = t(this),
									n = theme.fn.getOptions(i.data("plugin-options"));
								n && (e = n), i.themePluginSectionScroll(e);
							});
						}),
					t.isFunction(t.fn.themePluginSort) &&
						(t("[data-plugin-sort]").length || t(".sort-source").length) &&
						theme.fn.intObsInit("[data-plugin-sort]:not(.manual), .sort-source:not(.manual)", "themePluginSort"),
					t.isFunction(t.fn.themePluginStarRating) &&
						t("[data-plugin-star-rating]").length &&
						theme.fn.intObsInit("[data-plugin-star-rating]:not(.manual)", "themePluginStarRating"),
					t.isFunction(t.fn.themePluginSticky) &&
						t("[data-plugin-sticky]").length &&
						theme.fn.execOnceTroughWindowEvent(window, "scroll.trigger.sticky", function () {
							t("[data-plugin-sticky]:not(.manual)").each(function () {
								var e,
									i = t(this),
									n = theme.fn.getOptions(i.data("plugin-options"));
								n && (e = n), i.themePluginSticky(e);
							});
						}),
					t.isFunction(t.fn.themePluginToggle) &&
						t("[data-plugin-toggle]").length &&
						theme.fn.intObsInit("[data-plugin-toggle]:not(.manual)", "themePluginToggle"),
					t.isFunction(t.fn.themePluginTweets) &&
						t("[data-plugin-tweets]").length &&
						t(function () {
							t("[data-plugin-tweets]:not(.manual)").each(function () {
								var e,
									i = t(this),
									n = theme.fn.getOptions(i.data("plugin-options"));
								n && (e = n), i.themePluginTweets(e);
							});
						}),
					t.isFunction(t.fn.themePluginVideoBackground) &&
						t("[data-plugin-video-background]").length &&
						theme.fn.intObsInit("[data-plugin-video-background]:not(.manual)", "themePluginVideoBackground"),
					void 0 !== theme.StickyHeader && theme.StickyHeader.initialize(),
					void 0 !== theme.Nav && theme.Nav.initialize(),
					void 0 !== theme.Search && (t("#searchForm").length || t(".header-nav-features-search-reveal").length) && theme.Search.initialize(),
					void 0 !== theme.Newsletter && t("#newsletterForm").length && theme.fn.intObs("#newsletterForm", "theme.Newsletter.initialize();", {}),
					void 0 !== theme.Account &&
						(t("#headerAccount").length ||
							t("#headerSignUp").length ||
							t("#headerSignIn").length ||
							t("#headerRecover").length ||
							t("#headerRecoverCancel").length) &&
						theme.Account.initialize();
			}, 1e3);
		}.apply(this, [jQuery]);
};
