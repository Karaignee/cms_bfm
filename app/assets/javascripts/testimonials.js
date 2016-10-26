window.Modernizr = function (t, e, i)
{
	function n(t)
	{
		y.cssText = t
	}
	function o(t, e)
	{
		return typeof t === e
	}
	function r(t, e)
	{
		return !!~ ("" + t).indexOf(e)
	}
	function s(t, e)
	{
		for (var n in t)
		{
			var o = t[n];
			if (!r(o, "-") && y[o] !== i) return "pfx" == e ? o : !0
		}
		return !1
	}
	function a(t, e, n)
	{
		for (var r in t)
		{
			var s = e[t[r]];
			if (s !== i) return n === !1 ? t[r] : o(s, "function") ? s.bind(n || e) : s
		}
		return !1
	}
	function l(t, e, i)
	{
		var n = t.charAt(0).toUpperCase() + t.slice(1),
			r = (t + " " + x.join(n + " ") + n).split(" ");
		return o(e, "string") || o(e, "undefined") ? s(r, e) : (r = (t + " " + k.join(n + " ") + n).split(" "), a(r, e, i))
	}
	var c, u, d, h = "2.8.3",
		p =
		{
		},
		f = !0,
		g = e.documentElement,
		m = "modernizr",
		v = e.createElement(m),
		y = v.style,
		b = (
		{
		}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
		w = "Webkit Moz O ms",
		x = w.split(" "),
		k = w.toLowerCase().split(" "),
		S =
		{
		},
		T = [],
		C = T.slice,
		$ = function (t, i, n, o)
		{
			var r, s, a, l, c = e.createElement("div"),
				u = e.body,
				d = u || e.createElement("body");
			if (parseInt(n, 10)) for (; n--;) a = e.createElement("div"), a.id = o ? o[n] : m + (n + 1), c.appendChild(a);
			return r = ["&#173;", '<style id="s', m, '">', t, "</style>"].join(""), c.id = m, (u ? c : d).innerHTML += r, d.appendChild(c), u || (d.style.background = "", d.style.overflow = "hidden", l = g.style.overflow, g.style.overflow = "hidden", g.appendChild(d)), s = i(c, t), u ? c.parentNode.removeChild(c) : (d.parentNode.removeChild(d), g.style.overflow = l), !! s
		},
		_ = function ()
		{
			function t(t, r)
			{
				r = r || e.createElement(n[t] || "div"), t = "on" + t;
				var s = t in r;
				return s || (r.setAttribute || (r = e.createElement("div")), r.setAttribute && r.removeAttribute && (r.setAttribute(t, ""), s = o(r[t], "function"), o(r[t], "undefined") || (r[t] = i), r.removeAttribute(t))), r = null, s
			}
			var n =
			{
				select: "input",
				change: "input",
				submit: "form",
				reset: "form",
				error: "img",
				load: "img",
				abort: "img"
			};
			return t
		}(),
		E =
		{
		}.hasOwnProperty;
	d = o(E, "undefined") || o(E.call, "undefined") ?
	function (t, e)
	{
		return e in t && o(t.constructor.prototype[e], "undefined")
	} : function (t, e)
	{
		return E.call(t, e)
	}, Function.prototype.bind || (Function.prototype.bind = function (t)
	{
		var e = this;
		if ("function" != typeof e) throw new TypeError;
		var i = C.call(arguments, 1),
			n = function ()
			{
				if (this instanceof n)
				{
					var o = function ()
					{
					};
					o.prototype = e.prototype;
					var r = new o,
						s = e.apply(r, i.concat(C.call(arguments)));
					return Object(s) === s ? s : r
				}
				return e.apply(t, i.concat(C.call(arguments)))
			};
		return n
	}), S.touch = function ()
	{
		var i;
		return "ontouchstart" in t || t.DocumentTouch && e instanceof DocumentTouch ? i = !0 : $(["@media (", b.join("touch-enabled),("), m, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (t)
		{
			i = 9 === t.offsetTop
		}), i
	}, S.cssanimations = function ()
	{
		return l("animationName")
	}, S.csstransforms = function ()
	{
		return !!l("transform")
	}, S.csstransforms3d = function ()
	{
		var t = !! l("perspective");
		return t && "webkitPerspective" in g.style && $("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function (e)
		{
			t = 9 === e.offsetLeft && 3 === e.offsetHeight
		}), t
	}, S.csstransitions = function ()
	{
		return l("transition")
	};
	for (var O in S) d(S, O) && (u = O.toLowerCase(), p[u] = S[O](), T.push((p[u] ? "" : "no-") + u));
	return p.addTest = function (t, e)
	{
		if ("object" == typeof t) for (var n in t) d(t, n) && p.addTest(n, t[n]);
		else
		{
			if (t = t.toLowerCase(), p[t] !== i) return p;
			e = "function" == typeof e ? e() : e, "undefined" != typeof f && f && (g.className += " " + (e ? "" : "no-") + t), p[t] = e
		}
		return p
	}, n(""), v = c = null, function (t, e)
	{
		function i(t, e)
		{
			var i = t.createElement("p"),
				n = t.getElementsByTagName("head")[0] || t.documentElement;
			return i.innerHTML = "x<style>" + e + "</style>", n.insertBefore(i.lastChild, n.firstChild)
		}
		function n()
		{
			var t = y.elements;
			return "string" == typeof t ? t.split(" ") : t
		}
		function o(t)
		{
			var e = v[t[g]];
			return e || (e =
			{
			}, m++, t[g] = m, v[m] = e), e
		}
		function r(t, i, n)
		{
			if (i || (i = e), u) return i.createElement(t);
			n || (n = o(i));
			var r;
			return r = n.cache[t] ? n.cache[t].cloneNode() : f.test(t) ? (n.cache[t] = n.createElem(t)).cloneNode() : n.createElem(t), !r.canHaveChildren || p.test(t) || r.tagUrn ? r : n.frag.appendChild(r)
		}
		function s(t, i)
		{
			if (t || (t = e), u) return t.createDocumentFragment();
			i = i || o(t);
			for (var r = i.frag.cloneNode(), s = 0, a = n(), l = a.length; l > s; s++) r.createElement(a[s]);
			return r
		}
		function a(t, e)
		{
			e.cache || (e.cache =
			{
			}, e.createElem = t.createElement, e.createFrag = t.createDocumentFragment, e.frag = e.createFrag()), t.createElement = function (i)
			{
				return y.shivMethods ? r(i, t, e) : e.createElem(i)
			}, t.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + n().join().replace(/[\w\-]+/g, function (t)
			{
				return e.createElem(t), e.frag.createElement(t), 'c("' + t + '")'
			}) + ");return n}")(y, e.frag)
		}
		function l(t)
		{
			t || (t = e);
			var n = o(t);
			return !y.shivCSS || c || n.hasCSS || (n.hasCSS = !! i(t, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), u || a(t, n), t
		}
		var c, u, d = "3.7.0",
			h = t.html5 || {
			},
			p = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
			f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
			g = "_html5shiv",
			m = 0,
			v =
			{
			};
		!
		function ()
		{
			try
			{
				var t = e.createElement("a");
				t.innerHTML = "<xyz></xyz>", c = "hidden" in t, u = 1 == t.childNodes.length ||
				function ()
				{
					e.createElement("a");
					var t = e.createDocumentFragment();
					return "undefined" == typeof t.cloneNode || "undefined" == typeof t.createDocumentFragment || "undefined" == typeof t.createElement
				}()
			}
			catch (i)
			{
				c = !0, u = !0
			}
		}();
		var y =
		{
			elements: h.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
			version: d,
			shivCSS: h.shivCSS !== !1,
			supportsUnknownElements: u,
			shivMethods: h.shivMethods !== !1,
			type: "default",
			shivDocument: l,
			createElement: r,
			createDocumentFragment: s
		};
		t.html5 = y, l(e)
	}(this, e), p._version = h, p._prefixes = b, p._domPrefixes = k, p._cssomPrefixes = x, p.hasEvent = _, p.testProp = function (t)
	{
		return s([t])
	}, p.testAllProps = l, p.testStyles = $, p.prefixed = function (t, e, i)
	{
		return e ? l(t, e, i) : l(t, "pfx")
	}, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + T.join(" ") : ""), p
}(this, this.document), function (t, e, i)
{
	function n(t)
	{
		return "[object Function]" == m.call(t)
	}
	function o(t)
	{
		return "string" == typeof t
	}
	function r()
	{
	}
	function s(t)
	{
		return !t || "loaded" == t || "complete" == t || "uninitialized" == t
	}
	function a()
	{
		var t = v.shift();
		y = 1, t ? t.t ? f(function ()
		{
			("c" == t.t ? h.injectCss : h.injectJs)(t.s, 0, t.a, t.x, t.e, 1)
		}, 0) : (t(), a()) : y = 0
	}
	function l(t, i, n, o, r, l, c)
	{
		function u(e)
		{
			if (!p && s(d.readyState) && (b.r = p = 1, !y && a(), d.onload = d.onreadystatechange = null, e))
			{
				"img" != t && f(function ()
				{
					x.removeChild(d)
				}, 50);
				for (var n in $[i]) $[i].hasOwnProperty(n) && $[i][n].onload()
			}
		}
		var c = c || h.errorTimeout,
			d = e.createElement(t),
			p = 0,
			m = 0,
			b =
			{
				t: n,
				s: i,
				e: r,
				a: l,
				x: c
			};
		1 === $[i] && (m = 1, $[i] = []), "object" == t ? d.data = i : (d.src = i, d.type = t), d.width = d.height = "0", d.onerror = d.onload = d.onreadystatechange = function ()
		{
			u.call(this, m)
		}, v.splice(o, 0, b), "img" != t && (m || 2 === $[i] ? (x.insertBefore(d, w ? null : g), f(u, c)) : $[i].push(d))
	}
	function c(t, e, i, n, r)
	{
		return y = 0, e = e || "j", o(t) ? l("c" == e ? S : k, t, e, this.i++, i, n, r) : (v.splice(this.i++, 0, t), 1 == v.length && a()), this
	}
	function u()
	{
		var t = h;
		return t.loader =
		{
			load: c,
			i: 0
		}, t
	}
	var d, h, p = e.documentElement,
		f = t.setTimeout,
		g = e.getElementsByTagName("script")[0],
		m =
		{
		}.toString,
		v = [],
		y = 0,
		b = "MozAppearance" in p.style,
		w = b && !! e.createRange().compareNode,
		x = w ? p : g.parentNode,
		p = t.opera && "[object Opera]" == m.call(t.opera),
		p = !! e.attachEvent && !p,
		k = b ? "object" : p ? "script" : "img",
		S = p ? "script" : k,
		T = Array.isArray ||
		function (t)
		{
			return "[object Array]" == m.call(t)
		},
		C = [],
		$ =
		{
		},
		_ =
		{
			timeout: function (t, e)
			{
				return e.length && (t.timeout = e[0]), t
			}
		};
	h = function (t)
	{
		function e(t)
		{
			var e, i, n, t = t.split("!"),
				o = C.length,
				r = t.pop(),
				s = t.length,
				r =
				{
					url: r,
					origUrl: r,
					prefixes: t
				};
			for (i = 0; s > i; i++) n = t[i].split("="), (e = _[n.shift()]) && (r = e(r, n));
			for (i = 0; o > i; i++) r = C[i](r);
			return r
		}
		function s(t, o, r, s, a)
		{
			var l = e(t),
				c = l.autoCallback;
			l.url.split(".").pop().split("?").shift(), l.bypass || (o && (o = n(o) ? o : o[t] || o[s] || o[t.split("/").pop().split("?")[0]]), l.instead ? l.instead(t, o, r, s, a) : ($[l.url] ? l.noexec = !0 : $[l.url] = 1, r.load(l.url, l.forceCSS || !l.forceJS && "css" == l.url.split(".").pop().split("?").shift() ? "c" : i, l.noexec, l.attrs, l.timeout), (n(o) || n(c)) && r.load(function ()
			{
				u(), o && o(l.origUrl, a, s), c && c(l.origUrl, a, s), $[l.url] = 2
			})))
		}
		function a(t, e)
		{
			function i(t, i)
			{
				if (t)
				{
					if (o(t)) i || (d = function ()
					{
						var t = [].slice.call(arguments);
						h.apply(this, t), p()
					}), s(t, d, e, 0, c);
					else if (Object(t) === t) for (l in a = function ()
					{
						var e, i = 0;
						for (e in t) t.hasOwnProperty(e) && i++;
						return i
					}(), t) t.hasOwnProperty(l) && (!i && !--a && (n(d) ? d = function ()
					{
						var t = [].slice.call(arguments);
						h.apply(this, t), p()
					} : d[l] = function (t)
					{
						return function ()
						{
							var e = [].slice.call(arguments);
							t && t.apply(this, e), p()
						}
					}(h[l])), s(t[l], d, e, l, c))
				}
				else!i && p()
			}
			var a, l, c = !! t.test,
				u = t.load || t.both,
				d = t.callback || r,
				h = d,
				p = t.complete || r;
			i(c ? t.yep : t.nope, !! u), u && i(u)
		}
		var l, c, d = this.yepnope.loader;
		if (o(t)) s(t, 0, d, 0);
		else if (T(t)) for (l = 0; l < t.length; l++) c = t[l], o(c) ? s(c, 0, d, 0) : T(c) ? h(c) : Object(c) === c && a(c, d);
		else Object(t) === t && a(t, d)
	}, h.addPrefix = function (t, e)
	{
		_[t] = e
	}, h.addFilter = function (t)
	{
		C.push(t)
	}, h.errorTimeout = 1e4, null == e.readyState && e.addEventListener && (e.readyState = "loading", e.addEventListener("DOMContentLoaded", d = function ()
	{
		e.removeEventListener("DOMContentLoaded", d, 0), e.readyState = "complete"
	}, 0)), t.yepnope = u(), t.yepnope.executeStack = a, t.yepnope.injectJs = function (t, i, n, o, l, c)
	{
		var u, d, p = e.createElement("script"),
			o = o || h.errorTimeout;
		p.src = t;
		for (d in n) p.setAttribute(d, n[d]);
		i = c ? a : i || r, p.onreadystatechange = p.onload = function ()
		{
			!u && s(p.readyState) && (u = 1, i(), p.onload = p.onreadystatechange = null)
		}, f(function ()
		{
			u || (u = 1, i(1))
		}, o), l ? p.onload() : g.parentNode.insertBefore(p, g)
	}, t.yepnope.injectCss = function (t, i, n, o, s, l)
	{
		var c, o = e.createElement("link"),
			i = l ? a : i || r;
		o.href = t, o.rel = "stylesheet", o.type = "text/css";
		for (c in n) o.setAttribute(c, n[c]);
		s || (g.parentNode.insertBefore(o, g), f(i, 0))
	}
}(this, document), Modernizr.load = function ()
{
	yepnope.apply(window, [].slice.call(arguments, 0))
}, function (t, e)
{
	t.rails !== e && t.error("jquery-ujs has already been loaded!");
	var i, n = t(document);
	t.rails = i =
	{
		linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]",
		buttonClickSelector: "button[data-remote]:not(form button), button[data-confirm]:not(form button)",
		inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
		formSubmitSelector: "form",
		formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
		disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
		enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
		requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
		fileInputSelector: "input[type=file]",
		linkDisableSelector: "a[data-disable-with], a[data-disable]",
		buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
		CSRFProtection: function (e)
		{
			var i = t('meta[name="csrf-token"]').attr("content");
			i && e.setRequestHeader("X-CSRF-Token", i)
		},
		refreshCSRFTokens: function ()
		{
			var e = t("meta[name=csrf-token]").attr("content"),
				i = t("meta[name=csrf-param]").attr("content");
			t('form input[name="' + i + '"]').val(e)
		},
		fire: function (e, i, n)
		{
			var o = t.Event(i);
			return e.trigger(o, n), o.result !== !1
		},
		confirm: function (t)
		{
			return confirm(t)
		},
		ajax: function (e)
		{
			return t.ajax(e)
		},
		href: function (t)
		{
			return t.attr("href")
		},
		handleRemote: function (n)
		{
			var o, r, s, a, l, c, u, d;
			if (i.fire(n, "ajax:before"))
			{
				if (a = n.data("cross-domain"), l = a === e ? null : a, c = n.data("with-credentials") || null, u = n.data("type") || t.ajaxSettings && t.ajaxSettings.dataType, n.is("form"))
				{
					o = n.attr("method"), r = n.attr("action"), s = n.serializeArray();
					var h = n.data("ujs:submit-button");
					h && (s.push(h), n.data("ujs:submit-button", null))
				}
				else n.is(i.inputChangeSelector) ? (o = n.data("method"), r = n.data("url"), s = n.serialize(), n.data("params") && (s = s + "&" + n.data("params"))) : n.is(i.buttonClickSelector) ? (o = n.data("method") || "get", r = n.data("url"), s = n.serialize(), n.data("params") && (s = s + "&" + n.data("params"))) : (o = n.data("method"), r = i.href(n), s = n.data("params") || null);
				return d =
				{
					type: o || "GET",
					data: s,
					dataType: u,
					beforeSend: function (t, o)
					{
						return o.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + o.accepts.script), i.fire(n, "ajax:beforeSend", [t, o]) ? void n.trigger("ajax:send", t) : !1
					},
					success: function (t, e, i)
					{
						n.trigger("ajax:success", [t, e, i])
					},
					complete: function (t, e)
					{
						n.trigger("ajax:complete", [t, e])
					},
					error: function (t, e, i)
					{
						n.trigger("ajax:error", [t, e, i])
					},
					crossDomain: l
				}, c && (d.xhrFields =
				{
					withCredentials: c
				}), r && (d.url = r), i.ajax(d)
			}
			return !1
		},
		handleMethod: function (n)
		{
			var o = i.href(n),
				r = n.data("method"),
				s = n.attr("target"),
				a = t("meta[name=csrf-token]").attr("content"),
				l = t("meta[name=csrf-param]").attr("content"),
				c = t('<form method="post" action="' + o + '"></form>'),
				u = '<input name="_method" value="' + r + '" type="hidden" />';
			l !== e && a !== e && (u += '<input name="' + l + '" value="' + a + '" type="hidden" />'), s && c.attr("target", s), c.hide().append(u).appendTo("body"), c.submit()
		},
		formElements: function (e, i)
		{
			return e.is("form") ? t(e[0].elements).filter(i) : e.find(i)
		},
		disableFormElements: function (e)
		{
			i.formElements(e, i.disableSelector).each(function ()
			{
				i.disableFormElement(t(this))
			})
		},
		disableFormElement: function (t)
		{
			var i, n;
			i = t.is("button") ? "html" : "val", n = t.data("disable-with"), t.data("ujs:enable-with", t[i]()), n !== e && t[i](n), t.prop("disabled", !0)
		},
		enableFormElements: function (e)
		{
			i.formElements(e, i.enableSelector).each(function ()
			{
				i.enableFormElement(t(this))
			})
		},
		enableFormElement: function (t)
		{
			var e = t.is("button") ? "html" : "val";
			t.data("ujs:enable-with") && t[e](t.data("ujs:enable-with")), t.prop("disabled", !1)
		},
		allowAction: function (t)
		{
			var e, n = t.data("confirm"),
				o = !1;
			return n ? (i.fire(t, "confirm") && (o = i.confirm(n), e = i.fire(t, "confirm:complete", [o])), o && e) : !0
		},
		blankInputs: function (e, i, n)
		{
			var o, r, s = t(),
				a = i || "input,textarea",
				l = e.find(a);
			return l.each(function ()
			{
				if (o = t(this), r = o.is("input[type=checkbox],input[type=radio]") ? o.is(":checked") : o.val(), !r == !n)
				{
					if (o.is("input[type=radio]") && l.filter('input[type=radio]:checked[name="' + o.attr("name") + '"]').length) return !0;
					s = s.add(o)
				}
			}), s.length ? s : !1
		},
		nonBlankInputs: function (t, e)
		{
			return i.blankInputs(t, e, !0)
		},
		stopEverything: function (e)
		{
			return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
		},
		disableElement: function (t)
		{
			var n = t.data("disable-with");
			t.data("ujs:enable-with", t.html()), n !== e && t.html(n), t.bind("click.railsDisable", function (t)
			{
				return i.stopEverything(t)
			})
		},
		enableElement: function (t)
		{
			t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.unbind("click.railsDisable")
		}
	}, i.fire(n, "rails:attachBindings") && (t.ajaxPrefilter(function (t, e, n)
	{
		t.crossDomain || i.CSRFProtection(n)
	}), n.delegate(i.linkDisableSelector, "ajax:complete", function ()
	{
		i.enableElement(t(this))
	}), n.delegate(i.buttonDisableSelector, "ajax:complete", function ()
	{
		i.enableFormElement(t(this))
	}), n.delegate(i.linkClickSelector, "click.rails", function (n)
	{
		var o = t(this),
			r = o.data("method"),
			s = o.data("params"),
			a = n.metaKey || n.ctrlKey;
		if (!i.allowAction(o)) return i.stopEverything(n);
		if (!a && o.is(i.linkDisableSelector) && i.disableElement(o), o.data("remote") !== e)
		{
			if (a && (!r || "GET" === r) && !s) return !0;
			var l = i.handleRemote(o);
			return l === !1 ? i.enableElement(o) : l.error(function ()
			{
				i.enableElement(o)
			}), !1
		}
		return o.data("method") ? (i.handleMethod(o), !1) : void 0
	}), n.delegate(i.buttonClickSelector, "click.rails", function (e)
	{
		var n = t(this);
		if (!i.allowAction(n)) return i.stopEverything(e);
		n.is(i.buttonDisableSelector) && i.disableFormElement(n);
		var o = i.handleRemote(n);
		return o === !1 ? i.enableFormElement(n) : o.error(function ()
		{
			i.enableFormElement(n)
		}), !1
	}), n.delegate(i.inputChangeSelector, "change.rails", function (e)
	{
		var n = t(this);
		return i.allowAction(n) ? (i.handleRemote(n), !1) : i.stopEverything(e)
	}), n.delegate(i.formSubmitSelector, "submit.rails", function (n)
	{
		var o, r, s = t(this),
			a = s.data("remote") !== e;
		if (!i.allowAction(s)) return i.stopEverything(n);
		if (s.attr("novalidate") == e && (o = i.blankInputs(s, i.requiredInputSelector), o && i.fire(s, "ajax:aborted:required", [o]))) return i.stopEverything(n);
		if (a)
		{
			if (r = i.nonBlankInputs(s, i.fileInputSelector))
			{
				setTimeout(function ()
				{
					i.disableFormElements(s)
				}, 13);
				var l = i.fire(s, "ajax:aborted:file", [r]);
				return l || setTimeout(function ()
				{
					i.enableFormElements(s)
				}, 13), l
			}
			return i.handleRemote(s), !1
		}
		setTimeout(function ()
		{
			i.disableFormElements(s)
		}, 13)
	}), n.delegate(i.formInputClickSelector, "click.rails", function (e)
	{
		var n = t(this);
		if (!i.allowAction(n)) return i.stopEverything(e);
		var o = n.attr("name"),
			r = o ? {
				name: o,
				value: n.val()
			} : null;
		n.closest("form").data("ujs:submit-button", r)
	}), n.delegate(i.formSubmitSelector, "ajax:send.rails", function (e)
	{
		this == e.target && i.disableFormElements(t(this))
	}), n.delegate(i.formSubmitSelector, "ajax:complete.rails", function (e)
	{
		this == e.target && i.enableFormElements(t(this))
	}), t(function ()
	{
		i.refreshCSRFTokens()
	}))
}(jQuery), !
function (t)
{
	function e()
	{
	}
	function i(t)
	{
		function i(e)
		{
			e.prototype.option || (e.prototype.option = function (e)
			{
				t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
			})
		}
		function o(e, i)
		{
			t.fn[e] = function (o)
			{
				if ("string" == typeof o)
				{
					for (var s = n.call(arguments, 1), a = 0, l = this.length; l > a; a++)
					{
						var c = this[a],
							u = t.data(c, e);
						if (u) if (t.isFunction(u[o]) && "_" !== o.charAt(0))
						{
							var d = u[o].apply(u, s);
							if (void 0 !== d) return d
						}
						else r("no such method '" + o + "' for " + e + " instance");
						else r("cannot call methods on " + e + " prior to initialization; attempted to call '" + o + "'")
					}
					return this
				}
				return this.each(function ()
				{
					var n = t.data(this, e);
					n ? (n.option(o), n._init()) : (n = new i(this, o), t.data(this, e, n))
				})
			}
		}
		if (t)
		{
			var r = "undefined" == typeof console ? e : function (t)
			{
				console.error(t)
			};
			return t.bridget = function (t, e)
			{
				i(e), o(t, e)
			}, t.bridget
		}
	}
	var n = Array.prototype.slice;
	"function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], i) : i(t.jQuery)
}(window), function (t)
{
	function e(e)
	{
		var i = t.event;
		return i.target = i.target || i.srcElement || e, i
	}
	var i = document.documentElement,
		n = function ()
		{
		};
	i.addEventListener ? n = function (t, e, i)
	{
		t.addEventListener(e, i, !1)
	} : i.attachEvent && (n = function (t, i, n)
	{
		t[i + n] = n.handleEvent ?
		function ()
		{
			var i = e(t);
			n.handleEvent.call(n, i)
		} : function ()
		{
			var i = e(t);
			n.call(t, i)
		}, t.attachEvent("on" + i, t[i + n])
	});
	var o = function ()
	{
	};
	i.removeEventListener ? o = function (t, e, i)
	{
		t.removeEventListener(e, i, !1)
	} : i.detachEvent && (o = function (t, e, i)
	{
		t.detachEvent("on" + e, t[e + i]);
		try
		{
			delete t[e + i]
		}
		catch (n)
		{
			t[e + i] = void 0
		}
	});
	var r =
	{
		bind: n,
		unbind: o
	};
	"function" == typeof define && define.amd ? define("eventie/eventie", r) : "object" == typeof exports ? module.exports = r : t.eventie = r
}(this), function (t)
{
	function e(t)
	{
		"function" == typeof t && (e.isReady ? t() : r.push(t))
	}
	function i(t)
	{
		var i = "readystatechange" === t.type && "complete" !== o.readyState;
		if (!e.isReady && !i)
		{
			e.isReady = !0;
			for (var n = 0, s = r.length; s > n; n++)
			{
				var a = r[n];
				a()
			}
		}
	}
	function n(n)
	{
		return n.bind(o, "DOMContentLoaded", i), n.bind(o, "readystatechange", i), n.bind(t, "load", i), e
	}
	var o = t.document,
		r = [];
	e.isReady = !1, "function" == typeof define && define.amd ? (e.isReady = "function" == typeof requirejs, define("doc-ready/doc-ready", ["eventie/eventie"], n)) : t.docReady = n(t.eventie)
}(this), function ()
{
	function t()
	{
	}
	function e(t, e)
	{
		for (var i = t.length; i--;) if (t[i].listener === e) return i;
		return -1
	}
	function i(t)
	{
		return function ()
		{
			return this[t].apply(this, arguments)
		}
	}
	var n = t.prototype,
		o = this,
		r = o.EventEmitter;
	n.getListeners = function (t)
	{
		var e, i, n = this._getEvents();
		if (t instanceof RegExp)
		{
			e =
			{
			};
			for (i in n) n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i])
		}
		else e = n[t] || (n[t] = []);
		return e
	}, n.flattenListeners = function (t)
	{
		var e, i = [];
		for (e = 0; e < t.length; e += 1) i.push(t[e].listener);
		return i
	}, n.getListenersAsObject = function (t)
	{
		var e, i = this.getListeners(t);
		return i instanceof Array && (e =
		{
		}, e[t] = i), e || i
	}, n.addListener = function (t, i)
	{
		var n, o = this.getListenersAsObject(t),
			r = "object" == typeof i;
		for (n in o) o.hasOwnProperty(n) && -1 === e(o[n], i) && o[n].push(r ? i : {
			listener: i,
			once: !1
		});
		return this
	}, n.on = i("addListener"), n.addOnceListener = function (t, e)
	{
		return this.addListener(t, {
			listener: e,
			once: !0
		})
	}, n.once = i("addOnceListener"), n.defineEvent = function (t)
	{
		return this.getListeners(t), this
	}, n.defineEvents = function (t)
	{
		for (var e = 0; e < t.length; e += 1) this.defineEvent(t[e]);
		return this
	}, n.removeListener = function (t, i)
	{
		var n, o, r = this.getListenersAsObject(t);
		for (o in r) r.hasOwnProperty(o) && (n = e(r[o], i), -1 !== n && r[o].splice(n, 1));
		return this
	}, n.off = i("removeListener"), n.addListeners = function (t, e)
	{
		return this.manipulateListeners(!1, t, e)
	}, n.removeListeners = function (t, e)
	{
		return this.manipulateListeners(!0, t, e)
	}, n.manipulateListeners = function (t, e, i)
	{
		var n, o, r = t ? this.removeListener : this.addListener,
			s = t ? this.removeListeners : this.addListeners;
		if ("object" != typeof e || e instanceof RegExp) for (n = i.length; n--;) r.call(this, e, i[n]);
		else for (n in e) e.hasOwnProperty(n) && (o = e[n]) && ("function" == typeof o ? r.call(this, n, o) : s.call(this, n, o));
		return this
	}, n.removeEvent = function (t)
	{
		var e, i = typeof t,
			n = this._getEvents();
		if ("string" === i) delete n[t];
		else if (t instanceof RegExp) for (e in n) n.hasOwnProperty(e) && t.test(e) && delete n[e];
		else delete this._events;
		return this
	}, n.removeAllListeners = i("removeEvent"), n.emitEvent = function (t, e)
	{
		var i, n, o, r, s = this.getListenersAsObject(t);
		for (o in s) if (s.hasOwnProperty(o)) for (n = s[o].length; n--;) i = s[o][n], i.once === !0 && this.removeListener(t, i.listener), r = i.listener.apply(this, e || []), r === this._getOnceReturnValue() && this.removeListener(t, i.listener);
		return this
	}, n.trigger = i("emitEvent"), n.emit = function (t)
	{
		var e = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(t, e)
	}, n.setOnceReturnValue = function (t)
	{
		return this._onceReturnValue = t, this
	}, n._getOnceReturnValue = function ()
	{
		return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
	}, n._getEvents = function ()
	{
		return this._events || (this._events =
		{
		})
	}, t.noConflict = function ()
	{
		return o.EventEmitter = r, t
	}, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function ()
	{
		return t
	}) : "object" == typeof module && module.exports ? module.exports = t : this.EventEmitter = t
}.call(this), function (t)
{
	function e(t)
	{
		if (t)
		{
			if ("string" == typeof n[t]) return t;
			t = t.charAt(0).toUpperCase() + t.slice(1);
			for (var e, o = 0, r = i.length; r > o; o++) if (e = i[o] + t, "string" == typeof n[e]) return e
		}
	}
	var i = "Webkit Moz ms Ms O".split(" "),
		n = document.documentElement.style;
	"function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function ()
	{
		return e
	}) : "object" == typeof exports ? module.exports = e : t.getStyleProperty = e
}(window), function (t)
{
	function e(t)
	{
		var e = parseFloat(t),
			i = -1 === t.indexOf("%") && !isNaN(e);
		return i && e
	}
	function i()
	{
		for (var t =
		{
			width: 0,
			height: 0,
			innerWidth: 0,
			innerHeight: 0,
			outerWidth: 0,
			outerHeight: 0
		}, e = 0, i = s.length; i > e; e++)
		{
			var n = s[e];
			t[n] = 0
		}
		return t
	}
	function n(t)
	{
		function n(t)
		{
			if ("string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType)
			{
				var n = r(t);
				if ("none" === n.display) return i();
				var o =
				{
				};
				o.width = t.offsetWidth, o.height = t.offsetHeight;
				for (var u = o.isBorderBox = !(!c || !n[c] || "border-box" !== n[c]), d = 0, h = s.length; h > d; d++)
				{
					var p = s[d],
						f = n[p];
					f = a(t, f);
					var g = parseFloat(f);
					o[p] = isNaN(g) ? 0 : g
				}
				var m = o.paddingLeft + o.paddingRight,
					v = o.paddingTop + o.paddingBottom,
					y = o.marginLeft + o.marginRight,
					b = o.marginTop + o.marginBottom,
					w = o.borderLeftWidth + o.borderRightWidth,
					x = o.borderTopWidth + o.borderBottomWidth,
					k = u && l,
					S = e(n.width);
				S !== !1 && (o.width = S + (k ? 0 : m + w));
				var T = e(n.height);
				return T !== !1 && (o.height = T + (k ? 0 : v + x)), o.innerWidth = o.width - (m + w), o.innerHeight = o.height - (v + x), o.outerWidth = o.width + y, o.outerHeight = o.height + b, o
			}
		}
		function a(t, e)
		{
			if (o || -1 === e.indexOf("%")) return e;
			var i = t.style,
				n = i.left,
				r = t.runtimeStyle,
				s = r && r.left;
			return s && (r.left = t.currentStyle.left), i.left = e, e = i.pixelLeft, i.left = n, s && (r.left = s), e
		}
		var l, c = t("boxSizing");
		return function ()
		{
			if (c)
			{
				var t = document.createElement("div");
				t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style[c] = "border-box";
				var i = document.body || document.documentElement;
				i.appendChild(t);
				var n = r(t);
				l = 200 === e(n.width), i.removeChild(t)
			}
		}(), n
	}
	var o = t.getComputedStyle,
		r = o ?
		function (t)
		{
			return o(t, null)
		} : function (t)
		{
			return t.currentStyle
		},
		s = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
	"function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], n) : "object" == typeof exports ? module.exports = n(require("get-style-property")) : t.getSize = n(t.getStyleProperty)
}(window), function (t, e)
{
	function i(t, e)
	{
		return t[a](e)
	}
	function n(t)
	{
		if (!t.parentNode)
		{
			var e = document.createDocumentFragment();
			e.appendChild(t)
		}
	}
	function o(t, e)
	{
		n(t);
		for (var i = t.parentNode.querySelectorAll(e), o = 0, r = i.length; r > o; o++) if (i[o] === t) return !0;
		return !1
	}
	function r(t, e)
	{
		return n(t), i(t, e)
	}
	var s, a = function ()
	{
		if (e.matchesSelector) return "matchesSelector";
		for (var t = ["webkit", "moz", "ms", "o"], i = 0, n = t.length; n > i; i++)
		{
			var o = t[i],
				r = o + "MatchesSelector";
			if (e[r]) return r
		}
	}();
	if (a)
	{
		var l = document.createElement("div"),
			c = i(l, "div");
		s = c ? i : r
	}
	else s = o;
	"function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function ()
	{
		return s
	}) : window.matchesSelector = s
}(this, Element.prototype), function (t)
{
	function e(t, e)
	{
		for (var i in e) t[i] = e[i];
		return t
	}
	function i(t)
	{
		for (var e in t) return !1;
		return e = null, !0
	}
	function n(t)
	{
		return t.replace(/([A-Z])/g, function (t)
		{
			return "-" + t.toLowerCase()
		})
	}
	function o(t, o, r)
	{
		function a(t, e)
		{
			t && (this.element = t, this.layout = e, this.position =
			{
				x: 0,
				y: 0
			}, this._create())
		}
		var l = r("transition"),
			c = r("transform"),
			u = l && c,
			d = !! r("perspective"),
			h =
			{
				WebkitTransition: "webkitTransitionEnd",
				MozTransition: "transitionend",
				OTransition: "otransitionend",
				transition: "transitionend"
			}[l],
			p = ["transform", "transition", "transitionDuration", "transitionProperty"],
			f = function ()
			{
				for (var t =
				{
				}, e = 0, i = p.length; i > e; e++)
				{
					var n = p[e],
						o = r(n);
					o && o !== n && (t[n] = o)
				}
				return t
			}();
		e(a.prototype, t.prototype), a.prototype._create = function ()
		{
			this._transn =
			{
				ingProperties: {
				},
				clean: {
				},
				onEnd: {
				}
			}, this.css(
			{
				position: "absolute"
			})
		}, a.prototype.handleEvent = function (t)
		{
			var e = "on" + t.type;
			this[e] && this[e](t)
		}, a.prototype.getSize = function ()
		{
			this.size = o(this.element)
		}, a.prototype.css = function (t)
		{
			var e = this.element.style;
			for (var i in t)
			{
				var n = f[i] || i;
				e[n] = t[i]
			}
		}, a.prototype.getPosition = function ()
		{
			var t = s(this.element),
				e = this.layout.options,
				i = e.isOriginLeft,
				n = e.isOriginTop,
				o = parseInt(t[i ? "left" : "right"], 10),
				r = parseInt(t[n ? "top" : "bottom"], 10);
			o = isNaN(o) ? 0 : o, r = isNaN(r) ? 0 : r;
			var a = this.layout.size;
			o -= i ? a.paddingLeft : a.paddingRight, r -= n ? a.paddingTop : a.paddingBottom, this.position.x = o, this.position.y = r
		}, a.prototype.layoutPosition = function ()
		{
			var t = this.layout.size,
				e = this.layout.options,
				i =
				{
				};
			e.isOriginLeft ? (i.left = this.position.x + t.paddingLeft + "px", i.right = "") : (i.right = this.position.x + t.paddingRight + "px", i.left = ""), e.isOriginTop ? (i.top = this.position.y + t.paddingTop + "px", i.bottom = "") : (i.bottom = this.position.y + t.paddingBottom + "px", i.top = ""), this.css(i), this.emitEvent("layout", [this])
		};
		var g = d ?
		function (t, e)
		{
			return "translate3d(" + t + "px, " + e + "px, 0)"
		} : function (t, e)
		{
			return "translate(" + t + "px, " + e + "px)"
		};
		a.prototype._transitionTo = function (t, e)
		{
			this.getPosition();
			var i = this.position.x,
				n = this.position.y,
				o = parseInt(t, 10),
				r = parseInt(e, 10),
				s = o === this.position.x && r === this.position.y;
			if (this.setPosition(t, e), s && !this.isTransitioning) return void this.layoutPosition();
			var a = t - i,
				l = e - n,
				c =
				{
				},
				u = this.layout.options;
			a = u.isOriginLeft ? a : -a, l = u.isOriginTop ? l : -l, c.transform = g(a, l), this.transition(
			{
				to: c,
				onTransitionEnd: {
					transform: this.layoutPosition
				},
				isCleaning: !0
			})
		}, a.prototype.goTo = function (t, e)
		{
			this.setPosition(t, e), this.layoutPosition()
		}, a.prototype.moveTo = u ? a.prototype._transitionTo : a.prototype.goTo, a.prototype.setPosition = function (t, e)
		{
			this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
		}, a.prototype._nonTransition = function (t)
		{
			this.css(t.to), t.isCleaning && this._removeStyles(t.to);
			for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
		}, a.prototype._transition = function (t)
		{
			if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
			var e = this._transn;
			for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
			for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
			if (t.from)
			{
				this.css(t.from);
				var n = this.element.offsetHeight;
				n = null
			}
			this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
		};
		var m = c && n(c) + ",opacity";
		a.prototype.enableTransition = function ()
		{
			this.isTransitioning || (this.css(
			{
				transitionProperty: m,
				transitionDuration: this.layout.options.transitionDuration
			}), this.element.addEventListener(h, this, !1))
		}, a.prototype.transition = a.prototype[l ? "_transition" : "_nonTransition"], a.prototype.onwebkitTransitionEnd = function (t)
		{
			this.ontransitionend(t)
		}, a.prototype.onotransitionend = function (t)
		{
			this.ontransitionend(t)
		};
		var v =
		{
			"-webkit-transform": "transform",
			"-moz-transform": "transform",
			"-o-transform": "transform"
		};
		a.prototype.ontransitionend = function (t)
		{
			if (t.target === this.element)
			{
				var e = this._transn,
					n = v[t.propertyName] || t.propertyName;
				if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd)
				{
					var o = e.onEnd[n];
					o.call(this), delete e.onEnd[n]
				}
				this.emitEvent("transitionEnd", [this])
			}
		}, a.prototype.disableTransition = function ()
		{
			this.removeTransitionStyles(), this.element.removeEventListener(h, this, !1), this.isTransitioning = !1
		}, a.prototype._removeStyles = function (t)
		{
			var e =
			{
			};
			for (var i in t) e[i] = "";
			this.css(e)
		};
		var y =
		{
			transitionProperty: "",
			transitionDuration: ""
		};
		return a.prototype.removeTransitionStyles = function ()
		{
			this.css(y)
		}, a.prototype.removeElem = function ()
		{
			this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
		}, a.prototype.remove = function ()
		{
			if (!l || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
			var t = this;
			this.on("transitionEnd", function ()
			{
				return t.removeElem(), !0
			}), this.hide()
		}, a.prototype.reveal = function ()
		{
			delete this.isHidden, this.css(
			{
				display: ""
			});
			var t = this.layout.options;
			this.transition(
			{
				from: t.hiddenStyle,
				to: t.visibleStyle,
				isCleaning: !0
			})
		}, a.prototype.hide = function ()
		{
			this.isHidden = !0, this.css(
			{
				display: ""
			});
			var t = this.layout.options;
			this.transition(
			{
				from: t.visibleStyle,
				to: t.hiddenStyle,
				isCleaning: !0,
				onTransitionEnd: {
					opacity: function ()
					{
						this.isHidden && this.css(
						{
							display: "none"
						})
					}
				}
			})
		}, a.prototype.destroy = function ()
		{
			this.css(
			{
				position: "",
				left: "",
				right: "",
				top: "",
				bottom: "",
				transition: "",
				transform: ""
			})
		}, a
	}
	var r = t.getComputedStyle,
		s = r ?
		function (t)
		{
			return r(t, null)
		} : function (t)
		{
			return t.currentStyle
		};
	"function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], o) : (t.Outlayer =
	{
	}, t.Outlayer.Item = o(t.EventEmitter, t.getSize, t.getStyleProperty))
}(window), function (t)
{
	function e(t, e)
	{
		for (var i in e) t[i] = e[i];
		return t
	}
	function i(t)
	{
		return "[object Array]" === d.call(t)
	}
	function n(t)
	{
		var e = [];
		if (i(t)) e = t;
		else if (t && "number" == typeof t.length) for (var n = 0, o = t.length; o > n; n++) e.push(t[n]);
		else e.push(t);
		return e
	}
	function o(t, e)
	{
		var i = p(e, t); - 1 !== i && e.splice(i, 1)
	}
	function r(t)
	{
		return t.replace(/(.)([A-Z])/g, function (t, e, i)
		{
			return e + "-" + i
		}).toLowerCase()
	}
	function s(i, s, d, p, f, g)
	{
		function m(t, i)
		{
			if ("string" == typeof t && (t = a.querySelector(t)), !t || !h(t)) return void(l && l.error("Bad " + this.constructor.namespace + " element: " + t));
			this.element = t, this.options = e(
			{
			}, this.constructor.defaults), this.option(i);
			var n = ++v;
			this.element.outlayerGUID = n, y[n] = this, this._create(), this.options.isInitLayout && this.layout()
		}
		var v = 0,
			y =
			{
			};
		return m.namespace = "outlayer", m.Item = g, m.defaults =
		{
			containerStyle: {
				position: "relative"
			},
			isInitLayout: !0,
			isOriginLeft: !0,
			isOriginTop: !0,
			isResizeBound: !0,
			isResizingContainer: !0,
			transitionDuration: "0.4s",
			hiddenStyle: {
				opacity: 0,
				transform: "scale(0.001)"
			},
			visibleStyle: {
				opacity: 1,
				transform: "scale(1)"
			}
		}, e(m.prototype, d.prototype), m.prototype.option = function (t)
		{
			e(this.options, t)
		}, m.prototype._create = function ()
		{
			this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
		}, m.prototype.reloadItems = function ()
		{
			this.items = this._itemize(this.element.children)
		}, m.prototype._itemize = function (t)
		{
			for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0, r = e.length; r > o; o++)
			{
				var s = e[o],
					a = new i(s, this);
				n.push(a)
			}
			return n
		}, m.prototype._filterFindItemElements = function (t)
		{
			t = n(t);
			for (var e = this.options.itemSelector, i = [], o = 0, r = t.length; r > o; o++)
			{
				var s = t[o];
				if (h(s)) if (e)
				{
					f(s, e) && i.push(s);
					for (var a = s.querySelectorAll(e), l = 0, c = a.length; c > l; l++) i.push(a[l])
				}
				else i.push(s)
			}
			return i
		}, m.prototype.getItemElements = function ()
		{
			for (var t = [], e = 0, i = this.items.length; i > e; e++) t.push(this.items[e].element);
			return t
		}, m.prototype.layout = function ()
		{
			this._resetLayout(), this._manageStamps();
			var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
			this.layoutItems(this.items, t), this._isLayoutInited = !0
		}, m.prototype._init = m.prototype.layout, m.prototype._resetLayout = function ()
		{
			this.getSize()
		}, m.prototype.getSize = function ()
		{
			this.size = p(this.element)
		}, m.prototype._getMeasurement = function (t, e)
		{
			var i, n = this.options[t];
			n ? ("string" == typeof n ? i = this.element.querySelector(n) : h(n) && (i = n), this[t] = i ? p(i)[e] : n) : this[t] = 0
		}, m.prototype.layoutItems = function (t, e)
		{
			t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
		}, m.prototype._getItemsForLayout = function (t)
		{
			for (var e = [], i = 0, n = t.length; n > i; i++)
			{
				var o = t[i];
				o.isIgnored || e.push(o)
			}
			return e
		}, m.prototype._layoutItems = function (t, e)
		{
			function i()
			{
				n.emitEvent("layoutComplete", [n, t])
			}
			var n = this;
			if (!t || !t.length) return void i();
			this._itemsOn(t, "layout", i);
			for (var o = [], r = 0, s = t.length; s > r; r++)
			{
				var a = t[r],
					l = this._getItemLayoutPosition(a);
				l.item = a, l.isInstant = e || a.isLayoutInstant, o.push(l)
			}
			this._processLayoutQueue(o)
		}, m.prototype._getItemLayoutPosition = function ()
		{
			return {
				x: 0,
				y: 0
			}
		}, m.prototype._processLayoutQueue = function (t)
		{
			for (var e = 0, i = t.length; i > e; e++)
			{
				var n = t[e];
				this._positionItem(n.item, n.x, n.y, n.isInstant)
			}
		}, m.prototype._positionItem = function (t, e, i, n)
		{
			n ? t.goTo(e, i) : t.moveTo(e, i)
		}, m.prototype._postLayout = function ()
		{
			this.resizeContainer()
		}, m.prototype.resizeContainer = function ()
		{
			if (this.options.isResizingContainer)
			{
				var t = this._getContainerSize();
				t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
			}
		}, m.prototype._getContainerSize = u, m.prototype._setContainerMeasure = function (t, e)
		{
			if (void 0 !== t)
			{
				var i = this.size;
				i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
			}
		}, m.prototype._itemsOn = function (t, e, i)
		{
			function n()
			{
				return o++, o === r && i.call(s), !0
			}
			for (var o = 0, r = t.length, s = this, a = 0, l = t.length; l > a; a++)
			{
				var c = t[a];
				c.on(e, n)
			}
		}, m.prototype.ignore = function (t)
		{
			var e = this.getItem(t);
			e && (e.isIgnored = !0)
		}, m.prototype.unignore = function (t)
		{
			var e = this.getItem(t);
			e && delete e.isIgnored
		}, m.prototype.stamp = function (t)
		{
			if (t = this._find(t))
			{
				this.stamps = this.stamps.concat(t);
				for (var e = 0, i = t.length; i > e; e++)
				{
					var n = t[e];
					this.ignore(n)
				}
			}
		}, m.prototype.unstamp = function (t)
		{
			if (t = this._find(t)) for (var e = 0, i = t.length; i > e; e++)
			{
				var n = t[e];
				o(n, this.stamps), this.unignore(n)
			}
		}, m.prototype._find = function (t)
		{
			return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n(t)) : void 0
		}, m.prototype._manageStamps = function ()
		{
			if (this.stamps && this.stamps.length)
			{
				this._getBoundingRect();
				for (var t = 0, e = this.stamps.length; e > t; t++)
				{
					var i = this.stamps[t];
					this._manageStamp(i)
				}
			}
		}, m.prototype._getBoundingRect = function ()
		{
			var t = this.element.getBoundingClientRect(),
				e = this.size;
			this._boundingRect =
			{
				left: t.left + e.paddingLeft + e.borderLeftWidth,
				top: t.top + e.paddingTop + e.borderTopWidth,
				right: t.right - (e.paddingRight + e.borderRightWidth),
				bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
			}
		}, m.prototype._manageStamp = u, m.prototype._getElementOffset = function (t)
		{
			var e = t.getBoundingClientRect(),
				i = this._boundingRect,
				n = p(t),
				o =
				{
					left: e.left - i.left - n.marginLeft,
					top: e.top - i.top - n.marginTop,
					right: i.right - e.right - n.marginRight,
					bottom: i.bottom - e.bottom - n.marginBottom
				};
			return o
		}, m.prototype.handleEvent = function (t)
		{
			var e = "on" + t.type;
			this[e] && this[e](t)
		}, m.prototype.bindResize = function ()
		{
			this.isResizeBound || (i.bind(t, "resize", this), this.isResizeBound = !0)
		}, m.prototype.unbindResize = function ()
		{
			this.isResizeBound && i.unbind(t, "resize", this), this.isResizeBound = !1
		}, m.prototype.onresize = function ()
		{
			function t()
			{
				e.resize(), delete e.resizeTimeout
			}
			this.resizeTimeout && clearTimeout(this.resizeTimeout);
			var e = this;
			this.resizeTimeout = setTimeout(t, 100)
		}, m.prototype.resize = function ()
		{
			this.isResizeBound && this.needsResizeLayout() && this.layout()
		}, m.prototype.needsResizeLayout = function ()
		{
			var t = p(this.element),
				e = this.size && t;
			return e && t.innerWidth !== this.size.innerWidth
		}, m.prototype.addItems = function (t)
		{
			var e = this._itemize(t);
			return e.length && (this.items = this.items.concat(e)), e
		}, m.prototype.appended = function (t)
		{
			var e = this.addItems(t);
			e.length && (this.layoutItems(e, !0), this.reveal(e))
		}, m.prototype.prepended = function (t)
		{
			var e = this._itemize(t);
			if (e.length)
			{
				var i = this.items.slice(0);
				this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
			}
		}, m.prototype.reveal = function (t)
		{
			var e = t && t.length;
			if (e) for (var i = 0; e > i; i++)
			{
				var n = t[i];
				n.reveal()
			}
		}, m.prototype.hide = function (t)
		{
			var e = t && t.length;
			if (e) for (var i = 0; e > i; i++)
			{
				var n = t[i];
				n.hide()
			}
		}, m.prototype.getItem = function (t)
		{
			for (var e = 0, i = this.items.length; i > e; e++)
			{
				var n = this.items[e];
				if (n.element === t) return n
			}
		}, m.prototype.getItems = function (t)
		{
			if (t && t.length)
			{
				for (var e = [], i = 0, n = t.length; n > i; i++)
				{
					var o = t[i],
						r = this.getItem(o);
					r && e.push(r)
				}
				return e
			}
		}, m.prototype.remove = function (t)
		{
			t = n(t);
			var e = this.getItems(t);
			if (e && e.length)
			{
				this._itemsOn(e, "remove", function ()
				{
					this.emitEvent("removeComplete", [this, e])
				});
				for (var i = 0, r = e.length; r > i; i++)
				{
					var s = e[i];
					s.remove(), o(s, this.items)
				}
			}
		}, m.prototype.destroy = function ()
		{
			var t = this.element.style;
			t.height = "", t.position = "", t.width = "";
			for (var e = 0, i = this.items.length; i > e; e++)
			{
				var n = this.items[e];
				n.destroy()
			}
			this.unbindResize(), delete this.element.outlayerGUID, c && c.removeData(this.element, this.constructor.namespace)
		}, m.data = function (t)
		{
			var e = t && t.outlayerGUID;
			return e && y[e]
		}, m.create = function (t, i)
		{
			function n()
			{
				m.apply(this, arguments)
			}
			return Object.create ? n.prototype = Object.create(m.prototype) : e(n.prototype, m.prototype), n.prototype.constructor = n, n.defaults = e(
			{
			}, m.defaults), e(n.defaults, i), n.prototype.settings =
			{
			}, n.namespace = t, n.data = m.data, n.Item = function ()
			{
				g.apply(this, arguments)
			}, n.Item.prototype = new g, s(function ()
			{
				for (var e = r(t), i = a.querySelectorAll(".js-" + e), o = "data-" + e + "-options", s = 0, u = i.length; u > s; s++)
				{
					var d, h = i[s],
						p = h.getAttribute(o);
					try
					{
						d = p && JSON.parse(p)
					}
					catch (f)
					{
						l && l.error("Error parsing " + o + " on " + h.nodeName.toLowerCase() + (h.id ? "#" + h.id : "") + ": " + f);
						continue
					}
					var g = new n(h, d);
					c && c.data(h, t, g)
				}
			}), c && c.bridget && c.bridget(t, n), n
		}, m.Item = g, m
	}
	var a = t.document,
		l = t.console,
		c = t.jQuery,
		u = function ()
		{
		},
		d = Object.prototype.toString,
		h = "object" == typeof HTMLElement ?
		function (t)
		{
			return t instanceof HTMLElement
		} : function (t)
		{
			return t && "object" == typeof t && 1 === t.nodeType && "string" == typeof t.nodeName
		},
		p = Array.prototype.indexOf ?
		function (t, e)
		{
			return t.indexOf(e)
		} : function (t, e)
		{
			for (var i = 0, n = t.length; n > i; i++) if (t[i] === e) return i;
			return -1
		};
	"function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], s) : t.Outlayer = s(t.eventie, t.docReady, t.EventEmitter, t.getSize, t.matchesSelector, t.Outlayer.Item)
}(window), function (t)
{
	function e(t, e)
	{
		var n = t.create("masonry");
		return n.prototype._resetLayout = function ()
		{
			this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
			var t = this.cols;
			for (this.colYs = []; t--;) this.colYs.push(0);
			this.maxY = 0
		}, n.prototype.measureColumns = function ()
		{
			if (this.getContainerWidth(), !this.columnWidth)
			{
				var t = this.items[0],
					i = t && t.element;
				this.columnWidth = i && e(i).outerWidth || this.containerWidth
			}
			this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1)
		}, n.prototype.getContainerWidth = function ()
		{
			var t = this.options.isFitWidth ? this.element.parentNode : this.element,
				i = e(t);
			this.containerWidth = i && i.innerWidth
		}, n.prototype._getItemLayoutPosition = function (t)
		{
			t.getSize();
			var e = t.size.outerWidth % this.columnWidth,
				n = e && 1 > e ? "round" : "ceil",
				o = Math[n](t.size.outerWidth / this.columnWidth);
			o = Math.min(o, this.cols);
			for (var r = this._getColGroup(o), s = Math.min.apply(Math, r), a = i(r, s), l =
			{
				x: this.columnWidth * a,
				y: s
			}, c = s + t.size.outerHeight, u = this.cols + 1 - r.length, d = 0; u > d; d++) this.colYs[a + d] = c;
			return l
		}, n.prototype._getColGroup = function (t)
		{
			if (2 > t) return this.colYs;
			for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++)
			{
				var o = this.colYs.slice(n, n + t);
				e[n] = Math.max.apply(Math, o)
			}
			return e
		}, n.prototype._manageStamp = function (t)
		{
			var i = e(t),
				n = this._getElementOffset(t),
				o = this.options.isOriginLeft ? n.left : n.right,
				r = o + i.outerWidth,
				s = Math.floor(o / this.columnWidth);
			s = Math.max(0, s);
			var a = Math.floor(r / this.columnWidth);
			a -= r % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
			for (var l = (this.options.isOriginTop ? n.top : n.bottom) + i.outerHeight, c = s; a >= c; c++) this.colYs[c] = Math.max(l, this.colYs[c])
		}, n.prototype._getContainerSize = function ()
		{
			this.maxY = Math.max.apply(Math, this.colYs);
			var t =
			{
				height: this.maxY
			};
			return this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t
		}, n.prototype._getContainerFitWidth = function ()
		{
			for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
			return (this.cols - t) * this.columnWidth - this.gutter
		}, n.prototype.needsResizeLayout = function ()
		{
			var t = this.containerWidth;
			return this.getContainerWidth(), t !== this.containerWidth
		}, n
	}
	var i = Array.prototype.indexOf ?
	function (t, e)
	{
		return t.indexOf(e)
	} : function (t, e)
	{
		for (var i = 0, n = t.length; n > i; i++)
		{
			var o = t[i];
			if (o === e) return i
		}
		return -1
	};
	"function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], e) : t.Masonry = e(t.Outlayer, t.getSize)
}(window), function ()
{
	var t = this,
		e = t._,
		i =
		{
		},
		n = Array.prototype,
		o = Object.prototype,
		r = Function.prototype,
		s = n.push,
		a = n.slice,
		l = n.concat,
		c = o.toString,
		u = o.hasOwnProperty,
		d = n.forEach,
		h = n.map,
		p = n.reduce,
		f = n.reduceRight,
		g = n.filter,
		m = n.every,
		v = n.some,
		y = n.indexOf,
		b = n.lastIndexOf,
		w = Array.isArray,
		x = Object.keys,
		k = r.bind,
		S = function (t)
		{
			return t instanceof S ? t : this instanceof S ? void(this._wrapped = t) : new S(t)
		};
	"undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = S), exports._ = S) : t._ = S, S.VERSION = "1.6.0";
	var T = S.each = S.forEach = function (t, e, n)
	{
		if (null == t) return t;
		if (d && t.forEach === d) t.forEach(e, n);
		else if (t.length === +t.length)
		{
			for (var o = 0, r = t.length; r > o; o++) if (e.call(n, t[o], o, t) === i) return
		}
		else for (var s = S.keys(t), o = 0, r = s.length; r > o; o++) if (e.call(n, t[s[o]], s[o], t) === i) return;
		return t
	};
	S.map = S.collect = function (t, e, i)
	{
		var n = [];
		return null == t ? n : h && t.map === h ? t.map(e, i) : (T(t, function (t, o, r)
		{
			n.push(e.call(i, t, o, r))
		}), n)
	};
	var C = "Reduce of empty array with no initial value";
	S.reduce = S.foldl = S.inject = function (t, e, i, n)
	{
		var o = arguments.length > 2;
		if (null == t && (t = []), p && t.reduce === p) return n && (e = S.bind(e, n)), o ? t.reduce(e, i) : t.reduce(e);
		if (T(t, function (t, r, s)
		{
			o ? i = e.call(n, i, t, r, s) : (i = t, o = !0)
		}), !o) throw new TypeError(C);
		return i
	}, S.reduceRight = S.foldr = function (t, e, i, n)
	{
		var o = arguments.length > 2;
		if (null == t && (t = []), f && t.reduceRight === f) return n && (e = S.bind(e, n)), o ? t.reduceRight(e, i) : t.reduceRight(e);
		var r = t.length;
		if (r !== +r)
		{
			var s = S.keys(t);
			r = s.length
		}
		if (T(t, function (a, l, c)
		{
			l = s ? s[--r] : --r, o ? i = e.call(n, i, t[l], l, c) : (i = t[l], o = !0)
		}), !o) throw new TypeError(C);
		return i
	}, S.find = S.detect = function (t, e, i)
	{
		var n;
		return $(t, function (t, o, r)
		{
			return e.call(i, t, o, r) ? (n = t, !0) : void 0
		}), n
	}, S.filter = S.select = function (t, e, i)
	{
		var n = [];
		return null == t ? n : g && t.filter === g ? t.filter(e, i) : (T(t, function (t, o, r)
		{
			e.call(i, t, o, r) && n.push(t)
		}), n)
	}, S.reject = function (t, e, i)
	{
		return S.filter(t, function (t, n, o)
		{
			return !e.call(i, t, n, o)
		}, i)
	}, S.every = S.all = function (t, e, n)
	{
		e || (e = S.identity);
		var o = !0;
		return null == t ? o : m && t.every === m ? t.every(e, n) : (T(t, function (t, r, s)
		{
			return (o = o && e.call(n, t, r, s)) ? void 0 : i
		}), !! o)
	};
	var $ = S.some = S.any = function (t, e, n)
	{
		e || (e = S.identity);
		var o = !1;
		return null == t ? o : v && t.some === v ? t.some(e, n) : (T(t, function (t, r, s)
		{
			return o || (o = e.call(n, t, r, s)) ? i : void 0
		}), !! o)
	};
	S.contains = S.include = function (t, e)
	{
		return null == t ? !1 : y && t.indexOf === y ? -1 != t.indexOf(e) : $(t, function (t)
		{
			return t === e
		})
	}, S.invoke = function (t, e)
	{
		var i = a.call(arguments, 2),
			n = S.isFunction(e);
		return S.map(t, function (t)
		{
			return (n ? e : t[e]).apply(t, i)
		})
	}, S.pluck = function (t, e)
	{
		return S.map(t, S.property(e))
	}, S.where = function (t, e)
	{
		return S.filter(t, S.matches(e))
	}, S.findWhere = function (t, e)
	{
		return S.find(t, S.matches(e))
	}, S.max = function (t, e, i)
	{
		if (!e && S.isArray(t) && t[0] === +t[0] && t.length < 65535) return Math.max.apply(Math, t);
		var n = -1 / 0,
			o = -1 / 0;
		return T(t, function (t, r, s)
		{
			var a = e ? e.call(i, t, r, s) : t;
			a > o && (n = t, o = a)
		}), n
	}, S.min = function (t, e, i)
	{
		if (!e && S.isArray(t) && t[0] === +t[0] && t.length < 65535) return Math.min.apply(Math, t);
		var n = 1 / 0,
			o = 1 / 0;
		return T(t, function (t, r, s)
		{
			var a = e ? e.call(i, t, r, s) : t;
			o > a && (n = t, o = a)
		}), n
	}, S.shuffle = function (t)
	{
		var e, i = 0,
			n = [];
		return T(t, function (t)
		{
			e = S.random(i++), n[i - 1] = n[e], n[e] = t
		}), n
	}, S.sample = function (t, e, i)
	{
		return null == e || i ? (t.length !== +t.length && (t = S.values(t)), t[S.random(t.length - 1)]) : S.shuffle(t).slice(0, Math.max(0, e))
	};
	var _ = function (t)
	{
		return null == t ? S.identity : S.isFunction(t) ? t : S.property(t)
	};
	S.sortBy = function (t, e, i)
	{
		return e = _(e), S.pluck(S.map(t, function (t, n, o)
		{
			return {
				value: t,
				index: n,
				criteria: e.call(i, t, n, o)
			}
		}).sort(function (t, e)
		{
			var i = t.criteria,
				n = e.criteria;
			if (i !== n)
			{
				if (i > n || void 0 === i) return 1;
				if (n > i || void 0 === n) return -1
			}
			return t.index - e.index
		}), "value")
	};
	var E = function (t)
	{
		return function (e, i, n)
		{
			var o =
			{
			};
			return i = _(i), T(e, function (r, s)
			{
				var a = i.call(n, r, s, e);
				t(o, a, r)
			}), o
		}
	};
	S.groupBy = E(function (t, e, i)
	{
		S.has(t, e) ? t[e].push(i) : t[e] = [i]
	}), S.indexBy = E(function (t, e, i)
	{
		t[e] = i
	}), S.countBy = E(function (t, e)
	{
		S.has(t, e) ? t[e]++ : t[e] = 1
	}), S.sortedIndex = function (t, e, i, n)
	{
		i = _(i);
		for (var o = i.call(n, e), r = 0, s = t.length; s > r;)
		{
			var a = r + s >>> 1;
			i.call(n, t[a]) < o ? r = a + 1 : s = a
		}
		return r
	}, S.toArray = function (t)
	{
		return t ? S.isArray(t) ? a.call(t) : t.length === +t.length ? S.map(t, S.identity) : S.values(t) : []
	}, S.size = function (t)
	{
		return null == t ? 0 : t.length === +t.length ? t.length : S.keys(t).length
	}, S.first = S.head = S.take = function (t, e, i)
	{
		return null == t ? void 0 : null == e || i ? t[0] : 0 > e ? [] : a.call(t, 0, e)
	}, S.initial = function (t, e, i)
	{
		return a.call(t, 0, t.length - (null == e || i ? 1 : e))
	}, S.last = function (t, e, i)
	{
		return null == t ? void 0 : null == e || i ? t[t.length - 1] : a.call(t, Math.max(t.length - e, 0))
	}, S.rest = S.tail = S.drop = function (t, e, i)
	{
		return a.call(t, null == e || i ? 1 : e)
	}, S.compact = function (t)
	{
		return S.filter(t, S.identity)
	};
	var O = function (t, e, i)
	{
		return e && S.every(t, S.isArray) ? l.apply(i, t) : (T(t, function (t)
		{
			S.isArray(t) || S.isArguments(t) ? e ? s.apply(i, t) : O(t, e, i) : i.push(t)
		}), i)
	};
	S.flatten = function (t, e)
	{
		return O(t, e, [])
	}, S.without = function (t)
	{
		return S.difference(t, a.call(arguments, 1))
	}, S.partition = function (t, e)
	{
		var i = [],
			n = [];
		return T(t, function (t)
		{
			(e(t) ? i : n).push(t)
		}), [i, n]
	}, S.uniq = S.unique = function (t, e, i, n)
	{
		S.isFunction(e) && (n = i, i = e, e = !1);
		var o = i ? S.map(t, i, n) : t,
			r = [],
			s = [];
		return T(o, function (i, n)
		{
			(e ? n && s[s.length - 1] === i : S.contains(s, i)) || (s.push(i), r.push(t[n]))
		}), r
	}, S.union = function ()
	{
		return S.uniq(S.flatten(arguments, !0))
	}, S.intersection = function (t)
	{
		var e = a.call(arguments, 1);
		return S.filter(S.uniq(t), function (t)
		{
			return S.every(e, function (e)
			{
				return S.contains(e, t)
			})
		})
	}, S.difference = function (t)
	{
		var e = l.apply(n, a.call(arguments, 1));
		return S.filter(t, function (t)
		{
			return !S.contains(e, t)
		})
	}, S.zip = function ()
	{
		for (var t = S.max(S.pluck(arguments, "length").concat(0)), e = new Array(t), i = 0; t > i; i++) e[i] = S.pluck(arguments, "" + i);
		return e
	}, S.object = function (t, e)
	{
		if (null == t) return {
		};
		for (var i =
		{
		}, n = 0, o = t.length; o > n; n++) e ? i[t[n]] = e[n] : i[t[n][0]] = t[n][1];
		return i
	}, S.indexOf = function (t, e, i)
	{
		if (null == t) return -1;
		var n = 0,
			o = t.length;
		if (i)
		{
			if ("number" != typeof i) return n = S.sortedIndex(t, e), t[n] === e ? n : -1;
			n = 0 > i ? Math.max(0, o + i) : i
		}
		if (y && t.indexOf === y) return t.indexOf(e, i);
		for (; o > n; n++) if (t[n] === e) return n;
		return -1
	}, S.lastIndexOf = function (t, e, i)
	{
		if (null == t) return -1;
		var n = null != i;
		if (b && t.lastIndexOf === b) return n ? t.lastIndexOf(e, i) : t.lastIndexOf(e);
		for (var o = n ? i : t.length; o--;) if (t[o] === e) return o;
		return -1
	}, S.range = function (t, e, i)
	{
		arguments.length <= 1 && (e = t || 0, t = 0), i = arguments[2] || 1;
		for (var n = Math.max(Math.ceil((e - t) / i), 0), o = 0, r = new Array(n); n > o;) r[o++] = t, t += i;
		return r
	};
	var P = function ()
	{
	};
	S.bind = function (t, e)
	{
		var i, n;
		if (k && t.bind === k) return k.apply(t, a.call(arguments, 1));
		if (!S.isFunction(t)) throw new TypeError;
		return i = a.call(arguments, 2), n = function ()
		{
			if (!(this instanceof n)) return t.apply(e, i.concat(a.call(arguments)));
			P.prototype = t.prototype;
			var o = new P;
			P.prototype = null;
			var r = t.apply(o, i.concat(a.call(arguments)));
			return Object(r) === r ? r : o
		}
	}, S.partial = function (t)
	{
		var e = a.call(arguments, 1);
		return function ()
		{
			for (var i = 0, n = e.slice(), o = 0, r = n.length; r > o; o++) n[o] === S && (n[o] = arguments[i++]);
			for (; i < arguments.length;) n.push(arguments[i++]);
			return t.apply(this, n)
		}
	}, S.bindAll = function (t)
	{
		var e = a.call(arguments, 1);
		if (0 === e.length) throw new Error("bindAll must be passed function names");
		return T(e, function (e)
		{
			t[e] = S.bind(t[e], t)
		}), t
	}, S.memoize = function (t, e)
	{
		var i =
		{
		};
		return e || (e = S.identity), function ()
		{
			var n = e.apply(this, arguments);
			return S.has(i, n) ? i[n] : i[n] = t.apply(this, arguments)
		}
	}, S.delay = function (t, e)
	{
		var i = a.call(arguments, 2);
		return setTimeout(function ()
		{
			return t.apply(null, i)
		}, e)
	}, S.defer = function (t)
	{
		return S.delay.apply(S, [t, 1].concat(a.call(arguments, 1)))
	}, S.throttle = function (t, e, i)
	{
		var n, o, r, s = null,
			a = 0;
		i || (i =
		{
		});
		var l = function ()
		{
			a = i.leading === !1 ? 0 : S.now(), s = null, r = t.apply(n, o), n = o = null
		};
		return function ()
		{
			var c = S.now();
			a || i.leading !== !1 || (a = c);
			var u = e - (c - a);
			return n = this, o = arguments, 0 >= u ? (clearTimeout(s), s = null, a = c, r = t.apply(n, o), n = o = null) : s || i.trailing === !1 || (s = setTimeout(l, u)), r
		}
	}, S.debounce = function (t, e, i)
	{
		var n, o, r, s, a, l = function ()
		{
			var c = S.now() - s;
			e > c ? n = setTimeout(l, e - c) : (n = null, i || (a = t.apply(r, o), r = o = null))
		};
		return function ()
		{
			r = this, o = arguments, s = S.now();
			var c = i && !n;
			return n || (n = setTimeout(l, e)), c && (a = t.apply(r, o), r = o = null), a
		}
	}, S.once = function (t)
	{
		var e, i = !1;
		return function ()
		{
			return i ? e : (i = !0, e = t.apply(this, arguments), t = null, e)
		}
	}, S.wrap = function (t, e)
	{
		return S.partial(e, t)
	}, S.compose = function ()
	{
		var t = arguments;
		return function ()
		{
			for (var e = arguments, i = t.length - 1; i >= 0; i--) e = [t[i].apply(this, e)];
			return e[0]
		}
	}, S.after = function (t, e)
	{
		return function ()
		{
			return --t < 1 ? e.apply(this, arguments) : void 0
		}
	}, S.keys = function (t)
	{
		if (!S.isObject(t)) return [];
		if (x) return x(t);
		var e = [];
		for (var i in t) S.has(t, i) && e.push(i);
		return e
	}, S.values = function (t)
	{
		for (var e = S.keys(t), i = e.length, n = new Array(i), o = 0; i > o; o++) n[o] = t[e[o]];
		return n
	}, S.pairs = function (t)
	{
		for (var e = S.keys(t), i = e.length, n = new Array(i), o = 0; i > o; o++) n[o] = [e[o], t[e[o]]];
		return n
	}, S.invert = function (t)
	{
		for (var e =
		{
		}, i = S.keys(t), n = 0, o = i.length; o > n; n++) e[t[i[n]]] = i[n];
		return e
	}, S.functions = S.methods = function (t)
	{
		var e = [];
		for (var i in t) S.isFunction(t[i]) && e.push(i);
		return e.sort()
	}, S.extend = function (t)
	{
		return T(a.call(arguments, 1), function (e)
		{
			if (e) for (var i in e) t[i] = e[i]
		}), t
	}, S.pick = function (t)
	{
		var e =
		{
		},
			i = l.apply(n, a.call(arguments, 1));
		return T(i, function (i)
		{
			i in t && (e[i] = t[i])
		}), e
	}, S.omit = function (t)
	{
		var e =
		{
		},
			i = l.apply(n, a.call(arguments, 1));
		for (var o in t) S.contains(i, o) || (e[o] = t[o]);
		return e
	}, S.defaults = function (t)
	{
		return T(a.call(arguments, 1), function (e)
		{
			if (e) for (var i in e) void 0 === t[i] && (t[i] = e[i])
		}), t
	}, S.clone = function (t)
	{
		return S.isObject(t) ? S.isArray(t) ? t.slice() : S.extend(
		{
		}, t) : t
	}, S.tap = function (t, e)
	{
		return e(t), t
	};
	var A = function (t, e, i, n)
	{
		if (t === e) return 0 !== t || 1 / t == 1 / e;
		if (null == t || null == e) return t === e;
		t instanceof S && (t = t._wrapped), e instanceof S && (e = e._wrapped);
		var o = c.call(t);
		if (o != c.call(e)) return !1;
		switch (o)
		{
		case "[object String]":
			return t == String(e);
		case "[object Number]":
			return t != +t ? e != +e : 0 == t ? 1 / t == 1 / e : t == +e;
		case "[object Date]":
		case "[object Boolean]":
			return +t == +e;
		case "[object RegExp]":
			return t.source == e.source && t.global == e.global && t.multiline == e.multiline && t.ignoreCase == e.ignoreCase
		}
		if ("object" != typeof t || "object" != typeof e) return !1;
		for (var r = i.length; r--;) if (i[r] == t) return n[r] == e;
		var s = t.constructor,
			a = e.constructor;
		if (s !== a && !(S.isFunction(s) && s instanceof s && S.isFunction(a) && a instanceof a) && "constructor" in t && "constructor" in e) return !1;
		i.push(t), n.push(e);
		var l = 0,
			u = !0;
		if ("[object Array]" == o)
		{
			if (l = t.length, u = l == e.length) for (; l-- && (u = A(t[l], e[l], i, n)););
		}
		else
		{
			for (var d in t) if (S.has(t, d) && (l++, !(u = S.has(e, d) && A(t[d], e[d], i, n)))) break;
			if (u)
			{
				for (d in e) if (S.has(e, d) && !l--) break;
				u = !l
			}
		}
		return i.pop(), n.pop(), u
	};
	S.isEqual = function (t, e)
	{
		return A(t, e, [], [])
	}, S.isEmpty = function (t)
	{
		if (null == t) return !0;
		if (S.isArray(t) || S.isString(t)) return 0 === t.length;
		for (var e in t) if (S.has(t, e)) return !1;
		return !0
	}, S.isElement = function (t)
	{
		return !(!t || 1 !== t.nodeType)
	}, S.isArray = w ||
	function (t)
	{
		return "[object Array]" == c.call(t)
	}, S.isObject = function (t)
	{
		return t === Object(t)
	}, T(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (t)
	{
		S["is" + t] = function (e)
		{
			return c.call(e) == "[object " + t + "]"
		}
	}), S.isArguments(arguments) || (S.isArguments = function (t)
	{
		return !(!t || !S.has(t, "callee"))
	}), "function" != typeof / . / && (S.isFunction = function (t)
	{
		return "function" == typeof t
	}), S.isFinite = function (t)
	{
		return isFinite(t) && !isNaN(parseFloat(t))
	}, S.isNaN = function (t)
	{
		return S.isNumber(t) && t != +t
	}, S.isBoolean = function (t)
	{
		return t === !0 || t === !1 || "[object Boolean]" == c.call(t)
	}, S.isNull = function (t)
	{
		return null === t
	}, S.isUndefined = function (t)
	{
		return void 0 === t
	}, S.has = function (t, e)
	{
		return u.call(t, e)
	}, S.noConflict = function ()
	{
		return t._ = e, this
	}, S.identity = function (t)
	{
		return t
	}, S.constant = function (t)
	{
		return function ()
		{
			return t
		}
	}, S.property = function (t)
	{
		return function (e)
		{
			return e[t]
		}
	}, S.matches = function (t)
	{
		return function (e)
		{
			if (e === t) return !0;
			for (var i in t) if (t[i] !== e[i]) return !1;
			return !0
		}
	}, S.times = function (t, e, i)
	{
		for (var n = Array(Math.max(0, t)), o = 0; t > o; o++) n[o] = e.call(i, o);
		return n
	}, S.random = function (t, e)
	{
		return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
	}, S.now = Date.now ||
	function ()
	{
		return (new Date).getTime()
	};
	var j =
	{
		escape: {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#x27;"
		}
	};
	j.unescape = S.invert(j.escape);
	var z =
	{
		escape: new RegExp("[" + S.keys(j.escape).join("") + "]", "g"),
		unescape: new RegExp("(" + S.keys(j.unescape).join("|") + ")", "g")
	};
	S.each(["escape", "unescape"], function (t)
	{
		S[t] = function (e)
		{
			return null == e ? "" : ("" + e).replace(z[t], function (e)
			{
				return j[t][e]
			})
		}
	}), S.result = function (t, e)
	{
		if (null == t) return void 0;
		var i = t[e];
		return S.isFunction(i) ? i.call(t) : i
	}, S.mixin = function (t)
	{
		T(S.functions(t), function (e)
		{
			var i = S[e] = t[e];
			S.prototype[e] = function ()
			{
				var t = [this._wrapped];
				return s.apply(t, arguments), H.call(this, i.apply(S, t))
			}
		})
	};
	var I = 0;
	S.uniqueId = function (t)
	{
		var e = ++I + "";
		return t ? t + e : e
	}, S.templateSettings =
	{
		evaluate: /<%([\s\S]+?)%>/g,
		interpolate: /<%=([\s\S]+?)%>/g,
		escape: /<%-([\s\S]+?)%>/g
	};
	var M = /(.)^/,
		L =
		{
			"'": "'",
			"\\": "\\",
			"\r": "r",
			"\n": "n",
			"	": "t",
			"\u2028": "u2028",
			"\u2029": "u2029"
		},
		R = /\\|'|\r|\n|\t|\u2028|\u2029/g;
	S.template = function (t, e, i)
	{
		var n;
		i = S.defaults(
		{
		}, i, S.templateSettings);
		var o = new RegExp([(i.escape || M).source, (i.interpolate || M).source, (i.evaluate || M).source].join("|") + "|$", "g"),
			r = 0,
			s = "__p+='";
		t.replace(o, function (e, i, n, o, a)
		{
			return s += t.slice(r, a).replace(R, function (t)
			{
				return "\\" + L[t]
			}), i && (s += "'+\n((__t=(" + i + "))==null?'':_.escape(__t))+\n'"), n && (s += "'+\n((__t=(" + n + "))==null?'':__t)+\n'"), o && (s += "';\n" + o + "\n__p+='"), r = a + e.length, e
		}), s += "';\n", i.variable || (s = "with(obj||{}){\n" + s + "}\n"), s = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + s + "return __p;\n";
		try
		{
			n = new Function(i.variable || "obj", "_", s)
		}
		catch (a)
		{
			throw a.source = s, a
		}
		if (e) return n(e, S);
		var l = function (t)
		{
			return n.call(this, t, S)
		};
		return l.source = "function(" + (i.variable || "obj") + "){\n" + s + "}", l
	}, S.chain = function (t)
	{
		return S(t).chain()
	};
	var H = function (t)
	{
		return this._chain ? S(t).chain() : t
	};
	S.mixin(S), T(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (t)
	{
		var e = n[t];
		S.prototype[t] = function ()
		{
			var i = this._wrapped;
			return e.apply(i, arguments), "shift" != t && "splice" != t || 0 !== i.length || delete i[0], H.call(this, i)
		}
	}), T(["concat", "join", "slice"], function (t)
	{
		var e = n[t];
		S.prototype[t] = function ()
		{
			return H.call(this, e.apply(this._wrapped, arguments))
		}
	}), S.extend(S.prototype, {
		chain: function ()
		{
			return this._chain = !0, this
		},
		value: function ()
		{
			return this._wrapped
		}
	}), "function" == typeof define && define.amd && define("underscore", [], function ()
	{
		return S
	})
}.call(this), function (t, e)
{
	if ("function" == typeof define && define.amd) define(["underscore", "jquery", "exports"], function (i, n, o)
	{
		t.Backbone = e(t, o, i, n)
	});
	else if ("undefined" != typeof exports)
	{
		var i = require("underscore");
		e(t, exports, i)
	}
	else t.Backbone = e(t, {
	}, t._, t.jQuery || t.Zepto || t.ender || t.$)
}(this, function (t, e, i, n)
{
	{
		var o = t.Backbone,
			r = [],
			s = (r.push, r.slice);
		r.splice
	}
	e.VERSION = "1.1.2", e.$ = n, e.noConflict = function ()
	{
		return t.Backbone = o, this
	}, e.emulateHTTP = !1, e.emulateJSON = !1;
	var a = e.Events =
	{
		on: function (t, e, i)
		{
			if (!c(this, "on", t, [e, i]) || !e) return this;
			this._events || (this._events =
			{
			});
			var n = this._events[t] || (this._events[t] = []);
			return n.push(
			{
				callback: e,
				context: i,
				ctx: i || this
			}), this
		},
		once: function (t, e, n)
		{
			if (!c(this, "once", t, [e, n]) || !e) return this;
			var o = this,
				r = i.once(function ()
				{
					o.off(t, r), e.apply(this, arguments)
				});
			return r._callback = e, this.on(t, r, n)
		},
		off: function (t, e, n)
		{
			var o, r, s, a, l, u, d, h;
			if (!this._events || !c(this, "off", t, [e, n])) return this;
			if (!t && !e && !n) return this._events = void 0, this;
			for (a = t ? [t] : i.keys(this._events), l = 0, u = a.length; u > l; l++) if (t = a[l], s = this._events[t])
			{
				if (this._events[t] = o = [], e || n) for (d = 0, h = s.length; h > d; d++) r = s[d], (e && e !== r.callback && e !== r.callback._callback || n && n !== r.context) && o.push(r);
				o.length || delete this._events[t]
			}
			return this
		},
		trigger: function (t)
		{
			if (!this._events) return this;
			var e = s.call(arguments, 1);
			if (!c(this, "trigger", t, e)) return this;
			var i = this._events[t],
				n = this._events.all;
			return i && u(i, e), n && u(n, arguments), this
		},
		stopListening: function (t, e, n)
		{
			var o = this._listeningTo;
			if (!o) return this;
			var r = !e && !n;
			n || "object" != typeof e || (n = this), t && ((o =
			{
			})[t._listenId] = t);
			for (var s in o) t = o[s], t.off(e, n, this), (r || i.isEmpty(t._events)) && delete this._listeningTo[s];
			return this
		}
	},
		l = /\s+/,
		c = function (t, e, i, n)
		{
			if (!i) return !0;
			if ("object" == typeof i)
			{
				for (var o in i) t[e].apply(t, [o, i[o]].concat(n));
				return !1
			}
			if (l.test(i))
			{
				for (var r = i.split(l), s = 0, a = r.length; a > s; s++) t[e].apply(t, [r[s]].concat(n));
				return !1
			}
			return !0
		},
		u = function (t, e)
		{
			var i, n = -1,
				o = t.length,
				r = e[0],
				s = e[1],
				a = e[2];
			switch (e.length)
			{
			case 0:
				for (; ++n < o;)(i = t[n]).callback.call(i.ctx);
				return;
			case 1:
				for (; ++n < o;)(i = t[n]).callback.call(i.ctx, r);
				return;
			case 2:
				for (; ++n < o;)(i = t[n]).callback.call(i.ctx, r, s);
				return;
			case 3:
				for (; ++n < o;)(i = t[n]).callback.call(i.ctx, r, s, a);
				return;
			default:
				for (; ++n < o;)(i = t[n]).callback.apply(i.ctx, e);
				return
			}
		},
		d =
		{
			listenTo: "on",
			listenToOnce: "once"
		};
	i.each(d, function (t, e)
	{
		a[e] = function (e, n, o)
		{
			var r = this._listeningTo || (this._listeningTo =
			{
			}),
				s = e._listenId || (e._listenId = i.uniqueId("l"));
			return r[s] = e, o || "object" != typeof n || (o = this), e[t](n, o, this), this
		}
	}), a.bind = a.on, a.unbind = a.off, i.extend(e, a);
	var h = e.Model = function (t, e)
	{
		var n = t || {
		};
		e || (e =
		{
		}), this.cid = i.uniqueId("c"), this.attributes =
		{
		}, e.collection && (this.collection = e.collection), e.parse && (n = this.parse(n, e) || {
		}), n = i.defaults(
		{
		}, n, i.result(this, "defaults")), this.set(n, e), this.changed =
		{
		}, this.initialize.apply(this, arguments)
	};
	i.extend(h.prototype, a, {
		changed: null,
		validationError: null,
		idAttribute: "id",
		initialize: function ()
		{
		},
		toJSON: function ()
		{
			return i.clone(this.attributes)
		},
		sync: function ()
		{
			return e.sync.apply(this, arguments)
		},
		get: function (t)
		{
			return this.attributes[t]
		},
		escape: function (t)
		{
			return i.escape(this.get(t))
		},
		has: function (t)
		{
			return null != this.get(t)
		},
		set: function (t, e, n)
		{
			var o, r, s, a, l, c, u, d;
			if (null == t) return this;
			if ("object" == typeof t ? (r = t, n = e) : (r =
			{
			})[t] = e, n || (n =
			{
			}), !this._validate(r, n)) return !1;
			s = n.unset, l = n.silent, a = [], c = this._changing, this._changing = !0, c || (this._previousAttributes = i.clone(this.attributes), this.changed =
			{
			}), d = this.attributes, u = this._previousAttributes, this.idAttribute in r && (this.id = r[this.idAttribute]);
			for (o in r) e = r[o], i.isEqual(d[o], e) || a.push(o), i.isEqual(u[o], e) ? delete this.changed[o] : this.changed[o] = e, s ? delete d[o] : d[o] = e;
			if (!l)
			{
				a.length && (this._pending = n);
				for (var h = 0, p = a.length; p > h; h++) this.trigger("change:" + a[h], this, d[a[h]], n)
			}
			if (c) return this;
			if (!l) for (; this._pending;) n = this._pending, this._pending = !1, this.trigger("change", this, n);
			return this._pending = !1, this._changing = !1, this
		},
		unset: function (t, e)
		{
			return this.set(t, void 0, i.extend(
			{
			}, e, {
				unset: !0
			}))
		},
		clear: function (t)
		{
			var e =
			{
			};
			for (var n in this.attributes) e[n] = void 0;
			return this.set(e, i.extend(
			{
			}, t, {
				unset: !0
			}))
		},
		hasChanged: function (t)
		{
			return null == t ? !i.isEmpty(this.changed) : i.has(this.changed, t)
		},
		changedAttributes: function (t)
		{
			if (!t) return this.hasChanged() ? i.clone(this.changed) : !1;
			var e, n = !1,
				o = this._changing ? this._previousAttributes : this.attributes;
			for (var r in t) i.isEqual(o[r], e = t[r]) || ((n || (n =
			{
			}))[r] = e);
			return n
		},
		previous: function (t)
		{
			return null != t && this._previousAttributes ? this._previousAttributes[t] : null
		},
		previousAttributes: function ()
		{
			return i.clone(this._previousAttributes)
		},
		fetch: function (t)
		{
			t = t ? i.clone(t) : {
			}, void 0 === t.parse && (t.parse = !0);
			var e = this,
				n = t.success;
			return t.success = function (i)
			{
				return e.set(e.parse(i, t), t) ? (n && n(e, i, t), void e.trigger("sync", e, i, t)) : !1
			}, R(this, t), this.sync("read", this, t)
		},
		save: function (t, e, n)
		{
			var o, r, s, a = this.attributes;
			if (null == t || "object" == typeof t ? (o = t, n = e) : (o =
			{
			})[t] = e, n = i.extend(
			{
				validate: !0
			}, n), o && !n.wait)
			{
				if (!this.set(o, n)) return !1
			}
			else if (!this._validate(o, n)) return !1;
			o && n.wait && (this.attributes = i.extend(
			{
			}, a, o)), void 0 === n.parse && (n.parse = !0);
			var l = this,
				c = n.success;
			return n.success = function (t)
			{
				l.attributes = a;
				var e = l.parse(t, n);
				return n.wait && (e = i.extend(o || {
				}, e)), i.isObject(e) && !l.set(e, n) ? !1 : (c && c(l, t, n), void l.trigger("sync", l, t, n))
			}, R(this, n), r = this.isNew() ? "create" : n.patch ? "patch" : "update", "patch" === r && (n.attrs = o), s = this.sync(r, this, n), o && n.wait && (this.attributes = a), s
		},
		destroy: function (t)
		{
			t = t ? i.clone(t) : {
			};
			var e = this,
				n = t.success,
				o = function ()
				{
					e.trigger("destroy", e, e.collection, t)
				};
			if (t.success = function (i)
			{
				(t.wait || e.isNew()) && o(), n && n(e, i, t), e.isNew() || e.trigger("sync", e, i, t)
			}, this.isNew()) return t.success(), !1;
			R(this, t);
			var r = this.sync("delete", this, t);
			return t.wait || o(), r
		},
		url: function ()
		{
			var t = i.result(this, "urlRoot") || i.result(this.collection, "url") || L();
			return this.isNew() ? t : t.replace(/([^\/])$/, "$1/") + encodeURIComponent(this.id)
		},
		parse: function (t)
		{
			return t
		},
		clone: function ()
		{
			return new this.constructor(this.attributes)
		},
		isNew: function ()
		{
			return !this.has(this.idAttribute)
		},
		isValid: function (t)
		{
			return this._validate(
			{
			}, i.extend(t || {
			}, {
				validate: !0
			}))
		},
		_validate: function (t, e)
		{
			if (!e.validate || !this.validate) return !0;
			t = i.extend(
			{
			}, this.attributes, t);
			var n = this.validationError = this.validate(t, e) || null;
			return n ? (this.trigger("invalid", this, n, i.extend(e, {
				validationError: n
			})), !1) : !0
		}
	});
	var p = ["keys", "values", "pairs", "invert", "pick", "omit"];
	i.each(p, function (t)
	{
		h.prototype[t] = function ()
		{
			var e = s.call(arguments);
			return e.unshift(this.attributes), i[t].apply(i, e)
		}
	});
	var f = e.Collection = function (t, e)
	{
		e || (e =
		{
		}), e.model && (this.model = e.model), void 0 !== e.comparator && (this.comparator = e.comparator), this._reset(), this.initialize.apply(this, arguments), t && this.reset(t, i.extend(
		{
			silent: !0
		}, e))
	},
		g =
		{
			add: !0,
			remove: !0,
			merge: !0
		},
		m =
		{
			add: !0,
			remove: !1
		};
	i.extend(f.prototype, a, {
		model: h,
		initialize: function ()
		{
		},
		toJSON: function (t)
		{
			return this.map(function (e)
			{
				return e.toJSON(t)
			})
		},
		sync: function ()
		{
			return e.sync.apply(this, arguments)
		},
		add: function (t, e)
		{
			return this.set(t, i.extend(
			{
				merge: !1
			}, e, m))
		},
		remove: function (t, e)
		{
			var n = !i.isArray(t);
			t = n ? [t] : i.clone(t), e || (e =
			{
			});
			var o, r, s, a;
			for (o = 0, r = t.length; r > o; o++) a = t[o] = this.get(t[o]), a && (delete this._byId[a.id], delete this._byId[a.cid], s = this.indexOf(a), this.models.splice(s, 1), this.length--, e.silent || (e.index = s, a.trigger("remove", a, this, e)), this._removeReference(a, e));
			return n ? t[0] : t
		},
		set: function (t, e)
		{
			e = i.defaults(
			{
			}, e, g), e.parse && (t = this.parse(t, e));
			var n = !i.isArray(t);
			t = n ? t ? [t] : [] : i.clone(t);
			var o, r, s, a, l, c, u, d = e.at,
				p = this.model,
				f = this.comparator && null == d && e.sort !== !1,
				m = i.isString(this.comparator) ? this.comparator : null,
				v = [],
				y = [],
				b =
				{
				},
				w = e.add,
				x = e.merge,
				k = e.remove,
				S = !f && w && k ? [] : !1;
			for (o = 0, r = t.length; r > o; o++)
			{
				if (l = t[o] || {
				}, s = l instanceof h ? a = l : l[p.prototype.idAttribute || "id"], c = this.get(s)) k && (b[c.cid] = !0), x && (l = l === a ? a.attributes : l, e.parse && (l = c.parse(l, e)), c.set(l, e), f && !u && c.hasChanged(m) && (u = !0)), t[o] = c;
				else if (w)
				{
					if (a = t[o] = this._prepareModel(l, e), !a) continue;
					v.push(a), this._addReference(a, e)
				}
				a = c || a, !S || !a.isNew() && b[a.id] || S.push(a), b[a.id] = !0
			}
			if (k)
			{
				for (o = 0, r = this.length; r > o; ++o) b[(a = this.models[o]).cid] || y.push(a);
				y.length && this.remove(y, e)
			}
			if (v.length || S && S.length) if (f && (u = !0), this.length += v.length, null != d) for (o = 0, r = v.length; r > o; o++) this.models.splice(d + o, 0, v[o]);
			else
			{
				S && (this.models.length = 0);
				var T = S || v;
				for (o = 0, r = T.length; r > o; o++) this.models.push(T[o])
			}
			if (u && this.sort(
			{
				silent: !0
			}), !e.silent)
			{
				for (o = 0, r = v.length; r > o; o++)(a = v[o]).trigger("add", a, this, e);
				(u || S && S.length) && this.trigger("sort", this, e)
			}
			return n ? t[0] : t
		},
		reset: function (t, e)
		{
			e || (e =
			{
			});
			for (var n = 0, o = this.models.length; o > n; n++) this._removeReference(this.models[n], e);
			return e.previousModels = this.models, this._reset(), t = this.add(t, i.extend(
			{
				silent: !0
			}, e)), e.silent || this.trigger("reset", this, e), t
		},
		push: function (t, e)
		{
			return this.add(t, i.extend(
			{
				at: this.length
			}, e))
		},
		pop: function (t)
		{
			var e = this.at(this.length - 1);
			return this.remove(e, t), e
		},
		unshift: function (t, e)
		{
			return this.add(t, i.extend(
			{
				at: 0
			}, e))
		},
		shift: function (t)
		{
			var e = this.at(0);
			return this.remove(e, t), e
		},
		slice: function ()
		{
			return s.apply(this.models, arguments)
		},
		get: function (t)
		{
			return null == t ? void 0 : this._byId[t] || this._byId[t.id] || this._byId[t.cid]
		},
		at: function (t)
		{
			return this.models[t]
		},
		where: function (t, e)
		{
			return i.isEmpty(t) ? e ? void 0 : [] : this[e ? "find" : "filter"](function (e)
			{
				for (var i in t) if (t[i] !== e.get(i)) return !1;
				return !0
			})
		},
		findWhere: function (t)
		{
			return this.where(t, !0)
		},
		sort: function (t)
		{
			if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
			return t || (t =
			{
			}), i.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(i.bind(this.comparator, this)), t.silent || this.trigger("sort", this, t), this
		},
		pluck: function (t)
		{
			return i.invoke(this.models, "get", t)
		},
		fetch: function (t)
		{
			t = t ? i.clone(t) : {
			}, void 0 === t.parse && (t.parse = !0);
			var e = t.success,
				n = this;
			return t.success = function (i)
			{
				var o = t.reset ? "reset" : "set";
				n[o](i, t), e && e(n, i, t), n.trigger("sync", n, i, t)
			}, R(this, t), this.sync("read", this, t)
		},
		create: function (t, e)
		{
			if (e = e ? i.clone(e) : {
			}, !(t = this._prepareModel(t, e))) return !1;
			e.wait || this.add(t, e);
			var n = this,
				o = e.success;
			return e.success = function (t, i)
			{
				e.wait && n.add(t, e), o && o(t, i, e)
			}, t.save(null, e), t
		},
		parse: function (t)
		{
			return t
		},
		clone: function ()
		{
			return new this.constructor(this.models)
		},
		_reset: function ()
		{
			this.length = 0, this.models = [], this._byId =
			{
			}
		},
		_prepareModel: function (t, e)
		{
			if (t instanceof h) return t;
			e = e ? i.clone(e) : {
			}, e.collection = this;
			var n = new this.model(t, e);
			return n.validationError ? (this.trigger("invalid", this, n.validationError, e), !1) : n
		},
		_addReference: function (t)
		{
			this._byId[t.cid] = t, null != t.id && (this._byId[t.id] = t), t.collection || (t.collection = this), t.on("all", this._onModelEvent, this)
		},
		_removeReference: function (t)
		{
			this === t.collection && delete t.collection, t.off("all", this._onModelEvent, this)
		},
		_onModelEvent: function (t, e, i, n)
		{
			("add" !== t && "remove" !== t || i === this) && ("destroy" === t && this.remove(e, n), e && t === "change:" + e.idAttribute && (delete this._byId[e.previous(e.idAttribute)], null != e.id && (this._byId[e.id] = e)), this.trigger.apply(this, arguments))
		}
	});
	var v = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain", "sample"];
	i.each(v, function (t)
	{
		f.prototype[t] = function ()
		{
			var e = s.call(arguments);
			return e.unshift(this.models), i[t].apply(i, e)
		}
	});
	var y = ["groupBy", "countBy", "sortBy", "indexBy"];
	i.each(y, function (t)
	{
		f.prototype[t] = function (e, n)
		{
			var o = i.isFunction(e) ? e : function (t)
			{
				return t.get(e)
			};
			return i[t](this.models, o, n)
		}
	});
	var b = e.View = function (t)
	{
		this.cid = i.uniqueId("view"), t || (t =
		{
		}), i.extend(this, i.pick(t, x)), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
	},
		w = /^(\S+)\s*(.*)$/,
		x = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
	i.extend(b.prototype, a, {
		tagName: "div",
		$: function (t)
		{
			return this.$el.find(t)
		},
		initialize: function ()
		{
		},
		render: function ()
		{
			return this
		},
		remove: function ()
		{
			return this.$el.remove(), this.stopListening(), this
		},
		setElement: function (t, i)
		{
			return this.$el && this.undelegateEvents(), this.$el = t instanceof e.$ ? t : e.$(t), this.el = this.$el[0], i !== !1 && this.delegateEvents(), this
		},
		delegateEvents: function (t)
		{
			if (!t && !(t = i.result(this, "events"))) return this;
			this.undelegateEvents();
			for (var e in t)
			{
				var n = t[e];
				if (i.isFunction(n) || (n = this[t[e]]), n)
				{
					var o = e.match(w),
						r = o[1],
						s = o[2];
					n = i.bind(n, this), r += ".delegateEvents" + this.cid, "" === s ? this.$el.on(r, n) : this.$el.on(r, s, n)
				}
			}
			return this
		},
		undelegateEvents: function ()
		{
			return this.$el.off(".delegateEvents" + this.cid), this
		},
		_ensureElement: function ()
		{
			if (this.el) this.setElement(i.result(this, "el"), !1);
			else
			{
				var t = i.extend(
				{
				}, i.result(this, "attributes"));
				this.id && (t.id = i.result(this, "id")), this.className && (t["class"] = i.result(this, "className"));
				var n = e.$("<" + i.result(this, "tagName") + ">").attr(t);
				this.setElement(n, !1)
			}
		}
	}), e.sync = function (t, n, o)
	{
		var r = S[t];
		i.defaults(o || (o =
		{
		}), {
			emulateHTTP: e.emulateHTTP,
			emulateJSON: e.emulateJSON
		});
		var s =
		{
			type: r,
			dataType: "json"
		};
		if (o.url || (s.url = i.result(n, "url") || L()), null != o.data || !n || "create" !== t && "update" !== t && "patch" !== t || (s.contentType = "application/json", s.data = JSON.stringify(o.attrs || n.toJSON(o))), o.emulateJSON && (s.contentType = "application/x-www-form-urlencoded", s.data = s.data ? {
			model: s.data
		} : {
		}), o.emulateHTTP && ("PUT" === r || "DELETE" === r || "PATCH" === r))
		{
			s.type = "POST", o.emulateJSON && (s.data._method = r);
			var a = o.beforeSend;
			o.beforeSend = function (t)
			{
				return t.setRequestHeader("X-HTTP-Method-Override", r), a ? a.apply(this, arguments) : void 0
			}
		}
		"GET" === s.type || o.emulateJSON || (s.processData = !1), "PATCH" === s.type && k && (s.xhr = function ()
		{
			return new ActiveXObject("Microsoft.XMLHTTP")
		});
		var l = o.xhr = e.ajax(i.extend(s, o));
		return n.trigger("request", n, l, o), l
	};
	var k = !("undefined" == typeof window || !window.ActiveXObject || window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent),
		S =
		{
			create: "POST",
			update: "PUT",
			patch: "PATCH",
			"delete": "DELETE",
			read: "GET"
		};
	e.ajax = function ()
	{
		return e.$.ajax.apply(e.$, arguments)
	};
	var T = e.Router = function (t)
	{
		t || (t =
		{
		}), t.routes && (this.routes = t.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
	},
		C = /\((.*?)\)/g,
		$ = /(\(\?)?:\w+/g,
		_ = /\*\w+/g,
		E = /[\-{}\[\]+?.,\\\^$|#\s]/g;
	i.extend(T.prototype, a, {
		initialize: function ()
		{
		},
		route: function (t, n, o)
		{
			i.isRegExp(t) || (t = this._routeToRegExp(t)), i.isFunction(n) && (o = n, n = ""), o || (o = this[n]);
			var r = this;
			return e.history.route(t, function (i)
			{
				var s = r._extractParameters(t, i);
				r.execute(o, s), r.trigger.apply(r, ["route:" + n].concat(s)), r.trigger("route", n, s), e.history.trigger("route", r, n, s)
			}), this
		},
		execute: function (t, e)
		{
			t && t.apply(this, e)
		},
		navigate: function (t, i)
		{
			return e.history.navigate(t, i), this
		},
		_bindRoutes: function ()
		{
			if (this.routes)
			{
				this.routes = i.result(this, "routes");
				for (var t, e = i.keys(this.routes); null != (t = e.pop());) this.route(t, this.routes[t])
			}
		},
		_routeToRegExp: function (t)
		{
			return t = t.replace(E, "\\$&").replace(C, "(?:$1)?").replace($, function (t, e)
			{
				return e ? t : "([^/?]+)"
			}).replace(_, "([^?]*?)"), new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$")
		},
		_extractParameters: function (t, e)
		{
			var n = t.exec(e).slice(1);
			return i.map(n, function (t, e)
			{
				return e === n.length - 1 ? t || null : t ? decodeURIComponent(t) : null
			})
		}
	});
	var O = e.History = function ()
	{
		this.handlers = [], i.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
	},
		P = /^[#\/]|\s+$/g,
		A = /^\/+|\/+$/g,
		j = /msie [\w.]+/,
		z = /\/$/,
		I = /#.*$/;
	O.started = !1, i.extend(O.prototype, a, {
		interval: 50,
		atRoot: function ()
		{
			return this.location.pathname.replace(/[^\/]$/, "$&/") === this.root
		},
		getHash: function (t)
		{
			var e = (t || this).location.href.match(/#(.*)$/);
			return e ? e[1] : ""
		},
		getFragment: function (t, e)
		{
			if (null == t) if (this._hasPushState || !this._wantsHashChange || e)
			{
				t = decodeURI(this.location.pathname + this.location.search);
				var i = this.root.replace(z, "");
				t.indexOf(i) || (t = t.slice(i.length))
			}
			else t = this.getHash();
			return t.replace(P, "")
		},
		start: function (t)
		{
			if (O.started) throw new Error("Backbone.history has already been started");
			O.started = !0, this.options = i.extend(
			{
				root: "/"
			}, this.options, t), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !! this.options.pushState, this._hasPushState = !! (this.options.pushState && this.history && this.history.pushState);
			var n = this.getFragment(),
				o = document.documentMode,
				r = j.exec(navigator.userAgent.toLowerCase()) && (!o || 7 >= o);
			if (this.root = ("/" + this.root + "/").replace(A, "/"), r && this._wantsHashChange)
			{
				var s = e.$('<iframe src="javascript:0" tabindex="-1">');
				this.iframe = s.hide().appendTo("body")[0].contentWindow, this.navigate(n)
			}
			this._hasPushState ? e.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !r ? e.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = n;
			var a = this.location;
			if (this._wantsHashChange && this._wantsPushState)
			{
				if (!this._hasPushState && !this.atRoot()) return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + "#" + this.fragment), !0;
				this._hasPushState && this.atRoot() && a.hash && (this.fragment = this.getHash().replace(P, ""), this.history.replaceState(
				{
				}, document.title, this.root + this.fragment))
			}
			return this.options.silent ? void 0 : this.loadUrl()
		},
		stop: function ()
		{
			e.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), this._checkUrlInterval && clearInterval(this._checkUrlInterval), O.started = !1
		},
		route: function (t, e)
		{
			this.handlers.unshift(
			{
				route: t,
				callback: e
			})
		},
		checkUrl: function ()
		{
			var t = this.getFragment();
			return t === this.fragment && this.iframe && (t = this.getFragment(this.getHash(this.iframe))), t === this.fragment ? !1 : (this.iframe && this.navigate(t), void this.loadUrl())
		},
		loadUrl: function (t)
		{
			return t = this.fragment = this.getFragment(t), i.any(this.handlers, function (e)
			{
				return e.route.test(t) ? (e.callback(t), !0) : void 0
			})
		},
		navigate: function (t, e)
		{
			if (!O.started) return !1;
			e && e !== !0 || (e =
			{
				trigger: !! e
			});
			var i = this.root + (t = this.getFragment(t || ""));
			if (t = t.replace(I, ""), this.fragment !== t)
			{
				if (this.fragment = t, "" === t && "/" !== i && (i = i.slice(0, -1)), this._hasPushState) this.history[e.replace ? "replaceState" : "pushState"](
				{
				}, document.title, i);
				else
				{
					if (!this._wantsHashChange) return this.location.assign(i);
					this._updateHash(this.location, t, e.replace), this.iframe && t !== this.getFragment(this.getHash(this.iframe)) && (e.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, t, e.replace))
				}
				return e.trigger ? this.loadUrl(t) : void 0
			}
		},
		_updateHash: function (t, e, i)
		{
			if (i)
			{
				var n = t.href.replace(/(javascript:|#).*$/, "");
				t.replace(n + "#" + e)
			}
			else t.hash = "#" + e
		}
	}), e.history = new O;
	var M = function (t, e)
	{
		var n, o = this;
		n = t && i.has(t, "constructor") ? t.constructor : function ()
		{
			return o.apply(this, arguments)
		}, i.extend(n, o, e);
		var r = function ()
		{
			this.constructor = n
		};
		return r.prototype = o.prototype, n.prototype = new r, t && i.extend(n.prototype, t), n.__super__ = o.prototype, n
	};
	h.extend = f.extend = T.extend = b.extend = O.extend = M;
	var L = function ()
	{
		throw new Error('A "url" property or function must be specified')
	},
		R = function (t, e)
		{
			var i = e.error;
			e.error = function (n)
			{
				i && i(t, n, e), t.trigger("error", t, n, e)
			}
		};
	return e
}), function (t, e, i, n)
{
	var o = i(t),
		r = i(e),
		s = i.fancybox = function ()
		{
			s.open.apply(this, arguments)
		},
		a = navigator.userAgent.match(/msie/),
		l = null,
		c = e.createTouch !== n,
		u = function (t)
		{
			return t && t.hasOwnProperty && t instanceof i
		},
		d = function (t)
		{
			return t && "string" === i.type(t)
		},
		h = function (t)
		{
			return d(t) && 0 < t.indexOf("%")
		},
		p = function (t, e)
		{
			var i = parseInt(t, 10) || 0;
			return e && h(t) && (i *= s.getViewport()[e] / 100), Math.ceil(i)
		},
		f = function (t, e)
		{
			return p(t, e) + "px"
		};
	i.extend(s, {
		version: "2.1.4",
		defaults: {
			padding: 15,
			margin: 20,
			width: 800,
			height: 600,
			minWidth: 100,
			minHeight: 100,
			maxWidth: 9999,
			maxHeight: 9999,
			autoSize: !0,
			autoHeight: !1,
			autoWidth: !1,
			autoResize: !0,
			autoCenter: !c,
			fitToView: !0,
			aspectRatio: !1,
			topRatio: .5,
			leftRatio: .5,
			scrolling: "auto",
			wrapCSS: "",
			arrows: !0,
			closeBtn: !0,
			closeClick: !1,
			nextClick: !1,
			mouseWheel: !0,
			autoPlay: !1,
			playSpeed: 3e3,
			preload: 3,
			modal: !1,
			loop: !0,
			ajax: {
				dataType: "html",
				headers: {
					"X-fancyBox": !0
				}
			},
			iframe: {
				scrolling: "auto",
				preload: !0
			},
			swf: {
				wmode: "transparent",
				allowfullscreen: "true",
				allowscriptaccess: "always"
			},
			keys: {
				next: {
					13: "left",
					34: "up",
					39: "left",
					40: "up"
				},
				prev: {
					8: "right",
					33: "down",
					37: "right",
					38: "down"
				},
				close: [27],
				play: [32],
				toggle: [70]
			},
			direction: {
				next: "left",
				prev: "right"
			},
			scrollOutside: !0,
			index: 0,
			type: null,
			href: null,
			content: null,
			title: null,
			tpl: {
				wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
				image: '<img class="fancybox-image" src="{href}" alt="" />',
				iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (a ? ' allowtransparency="true"' : "") + "></iframe>",
				error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
				closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
				next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
				prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
			},
			openEffect: "fade",
			openSpeed: 250,
			openEasing: "swing",
			openOpacity: !0,
			openMethod: "zoomIn",
			closeEffect: "fade",
			closeSpeed: 250,
			closeEasing: "swing",
			closeOpacity: !0,
			closeMethod: "zoomOut",
			nextEffect: "elastic",
			nextSpeed: 250,
			nextEasing: "swing",
			nextMethod: "changeIn",
			prevEffect: "elastic",
			prevSpeed: 250,
			prevEasing: "swing",
			prevMethod: "changeOut",
			helpers: {
				overlay: !0,
				title: !0
			},
			onCancel: i.noop,
			beforeLoad: i.noop,
			afterLoad: i.noop,
			beforeShow: i.noop,
			afterShow: i.noop,
			beforeChange: i.noop,
			beforeClose: i.noop,
			afterClose: i.noop
		},
		group: {
		},
		opts: {
		},
		previous: null,
		coming: null,
		current: null,
		isActive: !1,
		isOpen: !1,
		isOpened: !1,
		wrap: null,
		skin: null,
		outer: null,
		inner: null,
		player: {
			timer: null,
			isActive: !1
		},
		ajaxLoad: null,
		imgPreload: null,
		transitions: {
		},
		helpers: {
		},
		open: function (t, e)
		{
			return t && (i.isPlainObject(e) || (e =
			{
			}), !1 !== s.close(!0)) ? (i.isArray(t) || (t = u(t) ? i(t).get() : [t]), i.each(t, function (o, r)
			{
				var a, l, c, h, p, f =
				{
				};
				"object" === i.type(r) && (r.nodeType && (r = i(r)), u(r) ? (f =
				{
					href: r.data("fancybox-href") || r.attr("href"),
					title: r.data("fancybox-title") || r.attr("title"),
					isDom: !0,
					element: r
				}, i.metadata && i.extend(!0, f, r.metadata())) : f = r), a = e.href || f.href || (d(r) ? r : null), l = e.title !== n ? e.title : f.title || "", h = (c = e.content || f.content) ? "html" : e.type || f.type, !h && f.isDom && (h = r.data("fancybox-type"), h || (h = (h = r.prop("class").match(/fancybox\.(\w+)/)) ? h[1] : null)), d(a) && (h || (s.isImage(a) ? h = "image" : s.isSWF(a) ? h = "swf" : "#" === a.charAt(0) ? h = "inline" : d(r) && (h = "html", c = r)), "ajax" === h && (p = a.split(/\s+/, 2), a = p.shift(), p = p.shift())), c || ("inline" === h ? a ? c = i(d(a) ? a.replace(/.*(?=#[^\s]+$)/, "") : a) : f.isDom && (c = r) : "html" === h ? c = a : !h && !a && f.isDom && (h = "inline", c = r)), i.extend(f, {
					href: a,
					type: h,
					content: c,
					title: l,
					selector: p
				}), t[o] = f
			}), s.opts = i.extend(!0, {
			}, s.defaults, e), e.keys !== n && (s.opts.keys = e.keys ? i.extend(
			{
			}, s.defaults.keys, e.keys) : !1), s.group = t, s._start(s.opts.index)) : void 0
		},
		cancel: function ()
		{
			var t = s.coming;
			t && !1 !== s.trigger("onCancel") && (s.hideLoading(), s.ajaxLoad && s.ajaxLoad.abort(), s.ajaxLoad = null, s.imgPreload && (s.imgPreload.onload = s.imgPreload.onerror = null), t.wrap && t.wrap.stop(!0, !0).trigger("onReset").remove(), s.coming = null, s.current || s._afterZoomOut(t))
		},
		close: function (t)
		{
			s.cancel(), !1 !== s.trigger("beforeClose") && (s.unbindEvents(), s.isActive && (s.isOpen && !0 !== t ? (s.isOpen = s.isOpened = !1, s.isClosing = !0, i(".fancybox-item, .fancybox-nav").remove(), s.wrap.stop(!0, !0).removeClass("fancybox-opened"), s.transitions[s.current.closeMethod]()) : (i(".fancybox-wrap").stop(!0).trigger("onReset").remove(), s._afterZoomOut())))
		},
		play: function (t)
		{
			var e = function ()
			{
				clearTimeout(s.player.timer)
			},
				n = function ()
				{
					e(), s.current && s.player.isActive && (s.player.timer = setTimeout(s.next, s.current.playSpeed))
				},
				o = function ()
				{
					e(), i("body").unbind(".player"), s.player.isActive = !1, s.trigger("onPlayEnd")
				};
			!0 === t || !s.player.isActive && !1 !== t ? s.current && (s.current.loop || s.current.index < s.group.length - 1) && (s.player.isActive = !0, i("body").bind(
			{
				"afterShow.player onUpdate.player": n,
				"onCancel.player beforeClose.player": o,
				"beforeLoad.player": e
			}), n(), s.trigger("onPlayStart")) : o()
		},
		next: function (t)
		{
			var e = s.current;
			e && (d(t) || (t = e.direction.next), s.jumpto(e.index + 1, t, "next"))
		},
		prev: function (t)
		{
			var e = s.current;
			e && (d(t) || (t = e.direction.prev), s.jumpto(e.index - 1, t, "prev"))
		},
		jumpto: function (t, e, i)
		{
			var o = s.current;
			o && (t = p(t), s.direction = e || o.direction[t >= o.index ? "next" : "prev"], s.router = i || "jumpto", o.loop && (0 > t && (t = o.group.length + t % o.group.length), t %= o.group.length), o.group[t] !== n && (s.cancel(), s._start(t)))
		},
		reposition: function (t, e)
		{
			var n, o = s.current,
				r = o ? o.wrap : null;
			r && (n = s._getPosition(e), t && "scroll" === t.type ? (delete n.position, r.stop(!0, !0).animate(n, 200)) : (r.css(n), o.pos = i.extend(
			{
			}, o.dim, n)))
		},
		update: function (t)
		{
			var e = t && t.type,
				i = !e || "orientationchange" === e;
			i && (clearTimeout(l), l = null), s.isOpen && !l && (l = setTimeout(function ()
			{
				var n = s.current;
				n && !s.isClosing && (s.wrap.removeClass("fancybox-tmp"), (i || "load" === e || "resize" === e && n.autoResize) && s._setDimension(), "scroll" === e && n.canShrink || s.reposition(t), s.trigger("onUpdate"), l = null)
			}, i && !c ? 0 : 300))
		},
		toggle: function (t)
		{
			s.isOpen && (s.current.fitToView = "boolean" === i.type(t) ? t : !s.current.fitToView, c && (s.wrap.removeAttr("style").addClass("fancybox-tmp"), s.trigger("onUpdate")), s.update())
		},
		hideLoading: function ()
		{
			r.unbind(".loading"), i("#fancybox-loading").remove()
		},
		showLoading: function ()
		{
			var t, e;
			s.hideLoading(), t = i('<div id="fancybox-loading"><div></div></div>').click(s.cancel).appendTo("body"), r.bind("keydown.loading", function (t)
			{
				27 === (t.which || t.keyCode) && (t.preventDefault(), s.cancel())
			}), s.defaults.fixed || (e = s.getViewport(), t.css(
			{
				position: "absolute",
				top: .5 * e.h + e.y,
				left: .5 * e.w + e.x
			}))
		},
		getViewport: function ()
		{
			var e = s.current && s.current.locked || !1,
				i =
				{
					x: o.scrollLeft(),
					y: o.scrollTop()
				};
			return e ? (i.w = e[0].clientWidth, i.h = e[0].clientHeight) : (i.w = c && t.innerWidth ? t.innerWidth : o.width(), i.h = c && t.innerHeight ? t.innerHeight : o.height()), i
		},
		unbindEvents: function ()
		{
			s.wrap && u(s.wrap) && s.wrap.unbind(".fb"), r.unbind(".fb"), o.unbind(".fb")
		},
		bindEvents: function ()
		{
			var t, e = s.current;
			e && (o.bind("orientationchange.fb" + (c ? "" : " resize.fb") + (e.autoCenter && !e.locked ? " scroll.fb" : ""), s.update), (t = e.keys) && r.bind("keydown.fb", function (o)
			{
				var r = o.which || o.keyCode,
					a = o.target || o.srcElement;
				return 27 === r && s.coming ? !1 : void!(o.ctrlKey || o.altKey || o.shiftKey || o.metaKey || a && (a.type || i(a).is("[contenteditable]")) || !i.each(t, function (t, a)
				{
					return 1 < e.group.length && a[r] !== n ? (s[t](a[r]), o.preventDefault(), !1) : -1 < i.inArray(r, a) ? (s[t](), o.preventDefault(), !1) : void 0
				}))
			}), i.fn.mousewheel && e.mouseWheel && s.wrap.bind("mousewheel.fb", function (t, n, o, r)
			{
				for (var a = i(t.target || null), l = !1; a.length && !l && !a.is(".fancybox-skin") && !a.is(".fancybox-wrap");) l = a[0] && !(a[0].style.overflow && "hidden" === a[0].style.overflow) && (a[0].clientWidth && a[0].scrollWidth > a[0].clientWidth || a[0].clientHeight && a[0].scrollHeight > a[0].clientHeight), a = i(a).parent();
				0 !== n && !l && 1 < s.group.length && !e.canShrink && (r > 0 || o > 0 ? s.prev(r > 0 ? "down" : "left") : (0 > r || 0 > o) && s.next(0 > r ? "up" : "right"), t.preventDefault())
			}))
		},
		trigger: function (t, e)
		{
			var n, o = e || s.coming || s.current;
			if (o)
			{
				if (i.isFunction(o[t]) && (n = o[t].apply(o, Array.prototype.slice.call(arguments, 1))), !1 === n) return !1;
				o.helpers && i.each(o.helpers, function (e, n)
				{
					n && s.helpers[e] && i.isFunction(s.helpers[e][t]) && (n = i.extend(!0, {
					}, s.helpers[e].defaults, n), s.helpers[e][t](n, o))
				}), i.event.trigger(t + ".fb")
			}
		},
		isImage: function (t)
		{
			return d(t) && t.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$)/i)
		},
		isSWF: function (t)
		{
			return d(t) && t.match(/\.(swf)((\?|#).*)?$/i)
		},
		_start: function (t)
		{
			var e, n, o =
			{
			};
			if (t = p(t), e = s.group[t] || null, !e) return !1;
			if (o = i.extend(!0, {
			}, s.opts, e), e = o.margin, n = o.padding, "number" === i.type(e) && (o.margin = [e, e, e, e]), "number" === i.type(n) && (o.padding = [n, n, n, n]), o.modal && i.extend(!0, o, {
				closeBtn: !1,
				closeClick: !1,
				nextClick: !1,
				arrows: !1,
				mouseWheel: !1,
				keys: null,
				helpers: {
					overlay: {
						closeClick: !1
					}
				}
			}), o.autoSize && (o.autoWidth = o.autoHeight = !0), "auto" === o.width && (o.autoWidth = !0), "auto" === o.height && (o.autoHeight = !0), o.group = s.group, o.index = t, s.coming = o, !1 === s.trigger("beforeLoad")) s.coming = null;
			else
			{
				if (n = o.type, e = o.href, !n) return s.coming = null, s.current && s.router && "jumpto" !== s.router ? (s.current.index = t, s[s.router](s.direction)) : !1;
				if (s.isActive = !0, ("image" === n || "swf" === n) && (o.autoHeight = o.autoWidth = !1, o.scrolling = "visible"), "image" === n && (o.aspectRatio = !0), "iframe" === n && c && (o.scrolling = "scroll"), o.wrap = i(o.tpl.wrap).addClass("fancybox-" + (c ? "mobile" : "desktop") + " fancybox-type-" + n + " fancybox-tmp " + o.wrapCSS).appendTo(o.parent || "body"), i.extend(o, {
					skin: i(".fancybox-skin", o.wrap),
					outer: i(".fancybox-outer", o.wrap),
					inner: i(".fancybox-inner", o.wrap)
				}), i.each(["Top", "Right", "Bottom", "Left"], function (t, e)
				{
					o.skin.css("padding" + e, f(o.padding[t]))
				}), s.trigger("onReady"), "inline" === n || "html" === n)
				{
					if (!o.content || !o.content.length) return s._error("content")
				}
				else if (!e) return s._error("href");
				"image" === n ? s._loadImage() : "ajax" === n ? s._loadAjax() : "iframe" === n ? s._loadIframe() : s._afterLoad()
			}
		},
		_error: function (t)
		{
			i.extend(s.coming, {
				type: "html",
				autoWidth: !0,
				autoHeight: !0,
				minWidth: 0,
				minHeight: 0,
				scrolling: "no",
				hasError: t,
				content: s.coming.tpl.error
			}), s._afterLoad()
		},
		_loadImage: function ()
		{
			var t = s.imgPreload = new Image;
			t.onload = function ()
			{
				this.onload = this.onerror = null, s.coming.width = this.width, s.coming.height = this.height, s._afterLoad()
			}, t.onerror = function ()
			{
				this.onload = this.onerror = null, s._error("image")
			}, t.src = s.coming.href, !0 !== t.complete && s.showLoading()
		},
		_loadAjax: function ()
		{
			var t = s.coming;
			s.showLoading(), s.ajaxLoad = i.ajax(i.extend(
			{
			}, t.ajax, {
				url: t.href,
				error: function (t, e)
				{
					s.coming && "abort" !== e ? s._error("ajax", t) : s.hideLoading()
				},
				success: function (e, i)
				{
					"success" === i && (t.content = e, s._afterLoad())
				}
			}))
		},
		_loadIframe: function ()
		{
			var t = s.coming,
				e = i(t.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", c ? "auto" : t.iframe.scrolling).attr("src", t.href);
			i(t.wrap).bind("onReset", function ()
			{
				try
				{
					i(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
				}
				catch (t)
				{
				}
			}), t.iframe.preload && (s.showLoading(), e.one("load", function ()
			{
				i(this).data("ready", 1), c || i(this).bind("load.fb", s.update), i(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), s._afterLoad()
			})), t.content = e.appendTo(t.inner), t.iframe.preload || s._afterLoad()
		},
		_preloadImages: function ()
		{
			var t, e, i = s.group,
				n = s.current,
				o = i.length,
				r = n.preload ? Math.min(n.preload, o - 1) : 0;
			for (e = 1; r >= e; e += 1) t = i[(n.index + e) % o], "image" === t.type && t.href && ((new Image).src = t.href)
		},
		_afterLoad: function ()
		{
			var t, e, n, o, r, a = s.coming,
				l = s.current;
			if (s.hideLoading(), a && !1 !== s.isActive) if (!1 === s.trigger("afterLoad", a, l)) a.wrap.stop(!0).trigger("onReset").remove(), s.coming = null;
			else
			{
				switch (l && (s.trigger("beforeChange", l), l.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), s.unbindEvents(), t = a.content, e = a.type, n = a.scrolling, i.extend(s, {
					wrap: a.wrap,
					skin: a.skin,
					outer: a.outer,
					inner: a.inner,
					current: a,
					previous: l
				}), o = a.href, e)
				{
				case "inline":
				case "ajax":
				case "html":
					a.selector ? t = i("<div>").html(t).find(a.selector) : u(t) && (t.data("fancybox-placeholder") || t.data("fancybox-placeholder", i('<div class="fancybox-placeholder"></div>').insertAfter(t).hide()), t = t.show().detach(), a.wrap.bind("onReset", function ()
					{
						i(this).find(t).length && t.hide().replaceAll(t.data("fancybox-placeholder")).data("fancybox-placeholder", !1)
					}));
					break;
				case "image":
					t = a.tpl.image.replace("{href}", o);
					break;
				case "swf":
					t = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + o + '"></param>', r = "", i.each(a.swf, function (e, i)
					{
						t += '<param name="' + e + '" value="' + i + '"></param>', r += " " + e + '="' + i + '"'
					}), t += '<embed src="' + o + '" type="application/x-shockwave-flash" width="100%" height="100%"' + r + "></embed></object>"
				}(!u(t) || !t.parent().is(a.inner)) && a.inner.append(t), s.trigger("beforeShow"), a.inner.css("overflow", "yes" === n ? "scroll" : "no" === n ? "hidden" : n), s._setDimension(), s.reposition(), s.isOpen = !1, s.coming = null, s.bindEvents(), s.isOpened ? l.prevMethod && s.transitions[l.prevMethod]() : i(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove(), s.transitions[s.isOpened ? a.nextMethod : a.openMethod](), s._preloadImages()
			}
		},
		_setDimension: function ()
		{
			var t, e, n, o, r, a, l, c, u, d = s.getViewport(),
				g = 0,
				m = !1,
				v = !1,
				m = s.wrap,
				y = s.skin,
				b = s.inner,
				w = s.current,
				v = w.width,
				x = w.height,
				k = w.minWidth,
				S = w.minHeight,
				T = w.maxWidth,
				C = w.maxHeight,
				$ = w.scrolling,
				_ = w.scrollOutside ? w.scrollbarWidth : 0,
				E = w.margin,
				O = p(E[1] + E[3]),
				P = p(E[0] + E[2]);
			if (m.add(y).add(b).width("auto").height("auto").removeClass("fancybox-tmp"), E = p(y.outerWidth(!0) - y.width()), t = p(y.outerHeight(!0) - y.height()), e = O + E, n = P + t, o = h(v) ? (d.w - e) * p(v) / 100 : v, r = h(x) ? (d.h - n) * p(x) / 100 : x, "iframe" === w.type)
			{
				if (u = w.content, w.autoHeight && 1 === u.data("ready")) try
				{
					u[0].contentWindow.document.location && (b.width(o).height(9999), a = u.contents().find("body"), _ && a.css("overflow-x", "hidden"), r = a.height())
				}
				catch (A)
				{
				}
			}
			else(w.autoWidth || w.autoHeight) && (b.addClass("fancybox-tmp"), w.autoWidth || b.width(o), w.autoHeight || b.height(r), w.autoWidth && (o = b.width()), w.autoHeight && (r = b.height()), b.removeClass("fancybox-tmp"));
			if (v = p(o), x = p(r), c = o / r, k = p(h(k) ? p(k, "w") - e : k), T = p(h(T) ? p(T, "w") - e : T), S = p(h(S) ? p(S, "h") - n : S), C = p(h(C) ? p(C, "h") - n : C), a = T, l = C, w.fitToView && (T = Math.min(d.w - e, T), C = Math.min(d.h - n, C)), e = d.w - O, P = d.h - P, w.aspectRatio ? (v > T && (v = T, x = p(v / c)), x > C && (x = C, v = p(x * c)), k > v && (v = k, x = p(v / c)), S > x && (x = S, v = p(x * c))) : (v = Math.max(k, Math.min(v, T)), w.autoHeight && "iframe" !== w.type && (b.width(v), x = b.height()), x = Math.max(S, Math.min(x, C))), w.fitToView) if (b.width(v).height(x), m.width(v + E), d = m.width(), O = m.height(), w.aspectRatio) for (;
			(d > e || O > P) && v > k && x > S && !(19 < g++);) x = Math.max(S, Math.min(C, x - 10)), v = p(x * c), k > v && (v = k, x = p(v / c)), v > T && (v = T, x = p(v / c)), b.width(v).height(x), m.width(v + E), d = m.width(), O = m.height();
			else v = Math.max(k, Math.min(v, v - (d - e))), x = Math.max(S, Math.min(x, x - (O - P)));
			_ && "auto" === $ && r > x && e > v + E + _ && (v += _), b.width(v).height(x), m.width(v + E), d = m.width(), O = m.height(), m = (d > e || O > P) && v > k && x > S, v = w.aspectRatio ? a > v && l > x && o > v && r > x : (a > v || l > x) && (o > v || r > x), i.extend(w, {
				dim: {
					width: f(d),
					height: f(O)
				},
				origWidth: o,
				origHeight: r,
				canShrink: m,
				canExpand: v,
				wPadding: E,
				hPadding: t,
				wrapSpace: O - y.outerHeight(!0),
				skinSpace: y.height() - x
			}), !u && w.autoHeight && x > S && C > x && !v && b.height("auto")
		},
		_getPosition: function (t)
		{
			var e = s.current,
				i = s.getViewport(),
				n = e.margin,
				o = s.wrap.width() + n[1] + n[3],
				r = s.wrap.height() + n[0] + n[2],
				n =
				{
					position: "absolute",
					top: n[0],
					left: n[3]
				};
			return e.autoCenter && e.fixed && !t && r <= i.h && o <= i.w ? n.position = "fixed" : e.locked || (n.top += i.y, n.left += i.x), n.top = f(Math.max(n.top, n.top + (i.h - r) * e.topRatio)), n.left = f(Math.max(n.left, n.left + (i.w - o) * e.leftRatio)), n
		},
		_afterZoomIn: function ()
		{
			var t = s.current;
			t && (s.isOpen = s.isOpened = !0, s.wrap.css("overflow", "visible").addClass("fancybox-opened"), s.update(), (t.closeClick || t.nextClick && 1 < s.group.length) && s.inner.css("cursor", "pointer").bind("click.fb", function (e)
			{
				!i(e.target).is("a") && !i(e.target).parent().is("a") && (e.preventDefault(), s[t.closeClick ? "close" : "next"]())
			}), t.closeBtn && i(t.tpl.closeBtn).appendTo(s.skin).bind("click.fb", function (t)
			{
				t.preventDefault(), s.close()
			}), t.arrows && 1 < s.group.length && ((t.loop || 0 < t.index) && i(t.tpl.prev).appendTo(s.outer).bind("click.fb", s.prev), (t.loop || t.index < s.group.length - 1) && i(t.tpl.next).appendTo(s.outer).bind("click.fb", s.next)), s.trigger("afterShow"), t.loop || t.index !== t.group.length - 1 ? s.opts.autoPlay && !s.player.isActive && (s.opts.autoPlay = !1, s.play()) : s.play(!1))
		},
		_afterZoomOut: function (t)
		{
			t = t || s.current, i(".fancybox-wrap").trigger("onReset").remove(), i.extend(s, {
				group: {
				},
				opts: {
				},
				router: !1,
				current: null,
				isActive: !1,
				isOpened: !1,
				isOpen: !1,
				isClosing: !1,
				wrap: null,
				skin: null,
				outer: null,
				inner: null
			}), s.trigger("afterClose", t)
		}
	}), s.transitions =
	{
		getOrigPosition: function ()
		{
			var t = s.current,
				e = t.element,
				i = t.orig,
				n =
				{
				},
				o = 50,
				r = 50,
				a = t.hPadding,
				l = t.wPadding,
				c = s.getViewport();
			return !i && t.isDom && e.is(":visible") && (i = e.find("img:first"), i.length || (i = e)), u(i) ? (n = i.offset(), i.is("img") && (o = i.outerWidth(), r = i.outerHeight())) : (n.top = c.y + (c.h - r) * t.topRatio, n.left = c.x + (c.w - o) * t.leftRatio), ("fixed" === s.wrap.css("position") || t.locked) && (n.top -= c.y, n.left -= c.x), n =
			{
				top: f(n.top - a * t.topRatio),
				left: f(n.left - l * t.leftRatio),
				width: f(o + l),
				height: f(r + a)
			}
		},
		step: function (t, e)
		{
			var i, n, o = e.prop;
			n = s.current;
			var r = n.wrapSpace,
				a = n.skinSpace;
			("width" === o || "height" === o) && (i = e.end === e.start ? 1 : (t - e.start) / (e.end - e.start), s.isClosing && (i = 1 - i), n = "width" === o ? n.wPadding : n.hPadding, n = t - n, s.skin[o](p("width" === o ? n : n - r * i)), s.inner[o](p("width" === o ? n : n - r * i - a * i)))
		},
		zoomIn: function ()
		{
			var t = s.current,
				e = t.pos,
				n = t.openEffect,
				o = "elastic" === n,
				r = i.extend(
				{
					opacity: 1
				}, e);
			delete r.position, o ? (e = this.getOrigPosition(), t.openOpacity && (e.opacity = .1)) : "fade" === n && (e.opacity = .1), s.wrap.css(e).animate(r, {
				duration: "none" === n ? 0 : t.openSpeed,
				easing: t.openEasing,
				step: o ? this.step : null,
				complete: s._afterZoomIn
			})
		},
		zoomOut: function ()
		{
			var t = s.current,
				e = t.closeEffect,
				i = "elastic" === e,
				n =
				{
					opacity: .1
				};
			i && (n = this.getOrigPosition(), t.closeOpacity && (n.opacity = .1)), s.wrap.animate(n, {
				duration: "none" === e ? 0 : t.closeSpeed,
				easing: t.closeEasing,
				step: i ? this.step : null,
				complete: s._afterZoomOut
			})
		},
		changeIn: function ()
		{
			var t, e = s.current,
				i = e.nextEffect,
				n = e.pos,
				o =
				{
					opacity: 1
				},
				r = s.direction;
			n.opacity = .1, "elastic" === i && (t = "down" === r || "up" === r ? "top" : "left", "down" === r || "right" === r ? (n[t] = f(p(n[t]) - 200), o[t] = "+=200px") : (n[t] = f(p(n[t]) + 200), o[t] = "-=200px")), "none" === i ? s._afterZoomIn() : s.wrap.css(n).animate(o, {
				duration: e.nextSpeed,
				easing: e.nextEasing,
				complete: s._afterZoomIn
			})
		},
		changeOut: function ()
		{
			var t = s.previous,
				e = t.prevEffect,
				n =
				{
					opacity: .1
				},
				o = s.direction;
			"elastic" === e && (n["down" === o || "up" === o ? "top" : "left"] = ("up" === o || "left" === o ? "-" : "+") + "=200px"), t.wrap.animate(n, {
				duration: "none" === e ? 0 : t.prevSpeed,
				easing: t.prevEasing,
				complete: function ()
				{
					i(this).trigger("onReset").remove()
				}
			})
		}
	}, s.helpers.overlay =
	{
		defaults: {
			closeClick: !0,
			speedOut: 200,
			showEarly: !0,
			css: {
			},
			locked: !c,
			fixed: !0
		},
		overlay: null,
		fixed: !1,
		create: function (t)
		{
			t = i.extend(
			{
			}, this.defaults, t), this.overlay && this.close(), this.overlay = i('<div class="fancybox-overlay"></div>').appendTo("body"), this.fixed = !1, t.fixed && s.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
		},
		open: function (t)
		{
			var e = this;
			t = i.extend(
			{
			}, this.defaults, t), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(t), this.fixed || (o.bind("resize.overlay", i.proxy(this.update, this)), this.update()), t.closeClick && this.overlay.bind("click.overlay", function (t)
			{
				i(t.target).hasClass("fancybox-overlay") && (s.isActive ? s.close() : e.close())
			}), this.overlay.css(t.css).show()
		},
		close: function ()
		{
			i(".fancybox-overlay").remove(), o.unbind("resize.overlay"), this.overlay = null, !1 !== this.margin && (i("body").css("margin-right", this.margin), this.margin = !1), this.el && this.el.removeClass("fancybox-lock")
		},
		update: function ()
		{
			var t, i = "100%";
			this.overlay.width(i).height("100%"), a ? (t = Math.max(e.documentElement.offsetWidth, e.body.offsetWidth), r.width() > t && (i = r.width())) : r.width() > o.width() && (i = r.width()), this.overlay.width(i).height(r.height())
		},
		onReady: function (t, n)
		{
			i(".fancybox-overlay").stop(!0, !0), this.overlay || (this.margin = r.height() > o.height() || "scroll" === i("body").css("overflow-y") ? i("body").css("margin-right") : !1, this.el = i(e.all && !e.querySelector ? "html" : "body"), this.create(t)), t.locked && this.fixed && (n.locked = this.overlay.append(n.wrap), n.fixed = !1), !0 === t.showEarly && this.beforeShow.apply(this, arguments)
		},
		beforeShow: function (t, e)
		{
			e.locked && (this.el.addClass("fancybox-lock"), !1 !== this.margin && i("body").css("margin-right", p(this.margin) + e.scrollbarWidth)), this.open(t)
		},
		onUpdate: function ()
		{
			this.fixed || this.update()
		},
		afterClose: function (t)
		{
			this.overlay && !s.isActive && this.overlay.fadeOut(t.speedOut, i.proxy(this.close, this))
		}
	}, s.helpers.title =
	{
		defaults: {
			type: "float",
			position: "bottom"
		},
		beforeShow: function (t)
		{
			var e = s.current,
				n = e.title,
				o = t.type;
			if (i.isFunction(n) && (n = n.call(e.element, e)), d(n) && "" !== i.trim(n))
			{
				switch (e = i('<div class="fancybox-title fancybox-title-' + o + '-wrap">' + n + "</div>"), o)
				{
				case "inside":
					o = s.skin;
					break;
				case "outside":
					o = s.wrap;
					break;
				case "over":
					o = s.inner;
					break;
				default:
					o = s.skin, e.appendTo("body"), a && e.width(e.width()), e.wrapInner('<span class="child"></span>'), s.current.margin[2] += Math.abs(p(e.css("margin-bottom")))
				}
				e["top" === t.position ? "prependTo" : "appendTo"](o)
			}
		}
	}, i.fn.fancybox = function (t)
	{
		var e, n = i(this),
			o = this.selector || "",
			a = function (r)
			{
				var a, l, c = i(this).blur(),
					u = e;
				!(r.ctrlKey || r.altKey || r.shiftKey || r.metaKey || c.is(".fancybox-wrap") || (a = t.groupAttr || "data-fancybox-group", l = c.attr(a), l || (a = "rel", l = c.get(0)[a]), l && "" !== l && "nofollow" !== l && (c = o.length ? i(o) : n, c = c.filter("[" + a + '="' + l + '"]'), u = c.index(this)), t.index = u, !1 === s.open(c, t) || !r.preventDefault()))
			};
		return t = t || {
		}, e = t.index || 0, o && !1 !== t.live ? r.undelegate(o, "click.fb-start").delegate(o + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", a) : n.unbind("click.fb-start").bind("click.fb-start", a), this.filter("[data-fancybox-start=1]").trigger("click"), this
	}, r.ready(function ()
	{
		if (i.scrollbarWidth === n && (i.scrollbarWidth = function ()
		{
			var t = i('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
				e = t.children(),
				e = e.innerWidth() - e.height(99).innerWidth();
			return t.remove(), e
		}), i.support.fixedPosition === n)
		{
			var t = i.support,
				e = i('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
				o = 20 === e[0].offsetTop || 15 === e[0].offsetTop;
			e.remove(), t.fixedPosition = o
		}
		i.extend(s.defaults, {
			scrollbarWidth: i.scrollbarWidth(),
			fixed: i.support.fixedPosition,
			parent: i("body")
		})
	})
}(window, document, jQuery), function (t)
{
	"use strict";
	"function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function (t)
{
	"use strict";
	var e = window.Slick || {
	};
	e = function ()
	{
		function e(e, n)
		{
			var o, r, s = this;
			if (s.defaults =
			{
				accessibility: !0,
				adaptiveHeight: !1,
				appendArrows: t(e),
				appendDots: t(e),
				arrows: !0,
				asNavFor: null,
				prevArrow: '<button type="button" data-role="none" class="slick-prev">Previous</button>',
				nextArrow: '<button type="button" data-role="none" class="slick-next">Next</button>',
				autoplay: !1,
				autoplaySpeed: 3e3,
				centerMode: !1,
				centerPadding: "50px",
				cssEase: "ease",
				customPaging: function (t, e)
				{
					return '<button type="button" data-role="none">' + (e + 1) + "</button>"
				},
				dots: !1,
				dotsClass: "slick-dots",
				draggable: !0,
				easing: "linear",
				fade: !1,
				focusOnSelect: !1,
				infinite: !0,
				initialSlide: 0,
				lazyLoad: "ondemand",
				onBeforeChange: null,
				onAfterChange: null,
				onInit: null,
				onReInit: null,
				onSetPosition: null,
				pauseOnHover: !0,
				pauseOnDotsHover: !1,
				respondTo: "window",
				responsive: null,
				rtl: !1,
				slide: "div",
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 500,
				swipe: !0,
				swipeToSlide: !1,
				touchMove: !0,
				touchThreshold: 5,
				useCSS: !0,
				variableWidth: !1,
				vertical: !1,
				waitForAnimate: !0
			}, s.initials =
			{
				animating: !1,
				dragging: !1,
				autoPlayTimer: null,
				currentDirection: 0,
				currentLeft: null,
				currentSlide: 0,
				direction: 1,
				$dots: null,
				listWidth: null,
				listHeight: null,
				loadIndex: 0,
				$nextArrow: null,
				$prevArrow: null,
				slideCount: null,
				slideWidth: null,
				$slideTrack: null,
				$slides: null,
				sliding: !1,
				slideOffset: 0,
				swipeLeft: null,
				$list: null,
				touchObject: {
				},
				transformsEnabled: !1
			}, t.extend(s, s.initials), s.activeBreakpoint = null, s.animType = null, s.animProp = null, s.breakpoints = [], s.breakpointSettings = [], s.cssTransitions = !1, s.paused = !1, s.positionProp = null, s.respondTo = null, s.shouldClick = !0, s.$slider = t(e), s.$slidesCache = null, s.transformType = null, s.transitionType = null, s.windowWidth = 0, s.windowTimer = null, s.options = t.extend(
			{
			}, s.defaults, n), s.currentSlide = s.options.initialSlide, s.originalSettings = s.options, o = s.options.responsive || null, o && o.length > -1)
			{
				s.respondTo = s.options.respondTo || "window";
				for (r in o) o.hasOwnProperty(r) && (s.breakpoints.push(o[r].breakpoint), s.breakpointSettings[o[r].breakpoint] = o[r].settings);
				s.breakpoints.sort(function (t, e)
				{
					return e - t
				})
			}
			s.autoPlay = t.proxy(s.autoPlay, s), s.autoPlayClear = t.proxy(s.autoPlayClear, s), s.changeSlide = t.proxy(s.changeSlide, s), s.clickHandler = t.proxy(s.clickHandler, s), s.selectHandler = t.proxy(s.selectHandler, s), s.setPosition = t.proxy(s.setPosition, s), s.swipeHandler = t.proxy(s.swipeHandler, s), s.dragHandler = t.proxy(s.dragHandler, s), s.keyHandler = t.proxy(s.keyHandler, s), s.autoPlayIterator = t.proxy(s.autoPlayIterator, s), s.instanceUid = i++, s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, s.init(), s.checkResponsive()
		}
		var i = 0;
		return e
	}(), e.prototype.addSlide = function (e, i, n)
	{
		var o = this;
		if ("boolean" == typeof i) n = i, i = null;
		else if (0 > i || i >= o.slideCount) return !1;
		o.unload(), "number" == typeof i ? 0 === i && 0 === o.$slides.length ? t(e).appendTo(o.$slideTrack) : n ? t(e).insertBefore(o.$slides.eq(i)) : t(e).insertAfter(o.$slides.eq(i)) : n === !0 ? t(e).prependTo(o.$slideTrack) : t(e).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function (e, i)
		{
			t(i).attr("index", e)
		}), o.$slidesCache = o.$slides, o.reinit()
	}, e.prototype.animateSlide = function (e, i)
	{
		var n =
		{
		},
			o = this;
		if (1 === o.options.slidesToShow && o.options.adaptiveHeight === !0 && o.options.vertical === !1)
		{
			var r = o.$slides.eq(o.currentSlide).outerHeight(!0);
			o.$list.animate(
			{
				height: r
			}, o.options.speed)
		}
		o.options.rtl === !0 && o.options.vertical === !1 && (e = -e), o.transformsEnabled === !1 ? o.options.vertical === !1 ? o.$slideTrack.animate(
		{
			left: e
		}, o.options.speed, o.options.easing, i) : o.$slideTrack.animate(
		{
			top: e
		}, o.options.speed, o.options.easing, i) : o.cssTransitions === !1 ? t(
		{
			animStart: o.currentLeft
		}).animate(
		{
			animStart: e
		}, {
			duration: o.options.speed,
			easing: o.options.easing,
			step: function (t)
			{
				o.options.vertical === !1 ? (n[o.animType] = "translate(" + t + "px, 0px)", o.$slideTrack.css(n)) : (n[o.animType] = "translate(0px," + t + "px)", o.$slideTrack.css(n))
			},
			complete: function ()
			{
				i && i.call()
			}
		}) : (o.applyTransition(), n[o.animType] = o.options.vertical === !1 ? "translate3d(" + e + "px, 0px, 0px)" : "translate3d(0px," + e + "px, 0px)", o.$slideTrack.css(n), i && setTimeout(function ()
		{
			o.disableTransition(), i.call()
		}, o.options.speed))
	}, e.prototype.asNavFor = function (e)
	{
		var i = this,
			n = null != i.options.asNavFor ? t(i.options.asNavFor).getSlick() : null;
		null != n && n.slideHandler(e, !0)
	}, e.prototype.applyTransition = function (t)
	{
		var e = this,
			i =
			{
			};
		i[e.transitionType] = e.options.fade === !1 ? e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : "opacity " + e.options.speed + "ms " + e.options.cssEase, e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
	}, e.prototype.autoPlay = function ()
	{
		var t = this;
		t.autoPlayTimer && clearInterval(t.autoPlayTimer), t.slideCount > t.options.slidesToShow && t.paused !== !0 && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
	}, e.prototype.autoPlayClear = function ()
	{
		var t = this;
		t.autoPlayTimer && clearInterval(t.autoPlayTimer)
	}, e.prototype.autoPlayIterator = function ()
	{
		var t = this;
		t.options.infinite === !1 ? 1 === t.direction ? (t.currentSlide + 1 === t.slideCount - 1 && (t.direction = 0), t.slideHandler(t.currentSlide + t.options.slidesToScroll)) : (t.currentSlide - 1 === 0 && (t.direction = 1), t.slideHandler(t.currentSlide - t.options.slidesToScroll)) : t.slideHandler(t.currentSlide + t.options.slidesToScroll)
	}, e.prototype.buildArrows = function ()
	{
		var e = this;
		e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow = t(e.options.prevArrow), e.$nextArrow = t(e.options.nextArrow), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.appendTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), e.options.infinite !== !0 && e.$prevArrow.addClass("slick-disabled"))
	}, e.prototype.buildDots = function ()
	{
		var e, i, n = this;
		if (n.options.dots === !0 && n.slideCount > n.options.slidesToShow)
		{
			for (i = '<ul class="' + n.options.dotsClass + '">', e = 0; e <= n.getDotCount(); e += 1) i += "<li>" + n.options.customPaging.call(this, n, e) + "</li>";
			i += "</ul>", n.$dots = t(i).appendTo(n.options.appendDots), n.$dots.find("li").first().addClass("slick-active")
		}
	}, e.prototype.buildOut = function ()
	{
		var e = this;
		e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, i)
		{
			t(i).attr("index", e)
		}), e.$slidesCache = e.$slides, e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), e.options.centerMode === !0 && (e.options.slidesToScroll = 1), t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.options.accessibility === !0 && e.$list.prop("tabIndex", 0), e.setSlideClasses("number" == typeof this.currentSlide ? this.currentSlide : 0), e.options.draggable === !0 && e.$list.addClass("draggable")
	}, e.prototype.checkResponsive = function ()
	{
		var e, i, n, o = this,
			r = o.$slider.width(),
			s = window.innerWidth || t(window).width();
		if ("window" === o.respondTo ? n = s : "slider" === o.respondTo ? n = r : "min" === o.respondTo && (n = Math.min(s, r)), o.originalSettings.responsive && o.originalSettings.responsive.length > -1 && null !== o.originalSettings.responsive)
		{
			i = null;
			for (e in o.breakpoints) o.breakpoints.hasOwnProperty(e) && n < o.breakpoints[e] && (i = o.breakpoints[e]);
			null !== i ? null !== o.activeBreakpoint ? i !== o.activeBreakpoint && (o.activeBreakpoint = i, o.options = t.extend(
			{
			}, o.originalSettings, o.breakpointSettings[i]), o.refresh()) : (o.activeBreakpoint = i, o.options = t.extend(
			{
			}, o.originalSettings, o.breakpointSettings[i]), o.refresh()) : null !== o.activeBreakpoint && (o.activeBreakpoint = null, o.options = o.originalSettings, o.refresh())
		}
	}, e.prototype.changeSlide = function (e, i)
	{
		var n, o, r, s, a, l = this,
			c = t(e.target);
		switch (c.is("a") && e.preventDefault(), r = l.slideCount % l.options.slidesToScroll !== 0, n = r ? 0 : (l.slideCount - l.currentSlide) % l.options.slidesToScroll, e.data.message)
		{
		case "previous":
			o = 0 === n ? l.options.slidesToScroll : l.options.slidesToShow - n, l.slideCount > l.options.slidesToShow && l.slideHandler(l.currentSlide - o, !1, i);
			break;
		case "next":
			o = 0 === n ? l.options.slidesToScroll : n, l.slideCount > l.options.slidesToShow && l.slideHandler(l.currentSlide + o, !1, i);
			break;
		case "index":
			var u = 0 === e.data.index ? 0 : e.data.index || t(e.target).parent().index() * l.options.slidesToScroll;
			if (s = l.getNavigableIndexes(), a = 0, s[u] && s[u] === u) if (u > s[s.length - 1]) u = s[s.length - 1];
			else for (var d in s)
			{
				if (u < s[d])
				{
					u = a;
					break
				}
				a = s[d]
			}
			l.slideHandler(u, !1, i);
		default:
			return
		}
	}, e.prototype.clickHandler = function (t)
	{
		var e = this;
		e.shouldClick === !1 && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
	}, e.prototype.destroy = function ()
	{
		var e = this;
		e.autoPlayClear(), e.touchObject =
		{
		}, t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && "object" != typeof e.options.prevArrow && e.$prevArrow.remove(), e.$nextArrow && "object" != typeof e.options.nextArrow && e.$nextArrow.remove(), e.$slides.parent().hasClass("slick-track") && e.$slides.unwrap().unwrap(), e.$slides.removeClass("slick-slide slick-active slick-center slick-visible").removeAttr("index").css(
		{
			position: "",
			left: "",
			top: "",
			zIndex: "",
			opacity: "",
			width: ""
		}), e.$slider.removeClass("slick-slider"), e.$slider.removeClass("slick-initialized"), e.$list.off(".slick"), t(window).off(".slick-" + e.instanceUid), t(document).off(".slick-" + e.instanceUid)
	}, e.prototype.disableTransition = function (t)
	{
		var e = this,
			i =
			{
			};
		i[e.transitionType] = "", e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
	}, e.prototype.fadeSlide = function (t, e, i)
	{
		var n = this;
		n.cssTransitions === !1 ? (n.$slides.eq(e).css(
		{
			zIndex: 1e3
		}), n.$slides.eq(e).animate(
		{
			opacity: 1
		}, n.options.speed, n.options.easing, i), n.$slides.eq(t).animate(
		{
			opacity: 0
		}, n.options.speed, n.options.easing)) : (n.applyTransition(e), n.applyTransition(t), n.$slides.eq(e).css(
		{
			opacity: 1,
			zIndex: 1e3
		}), n.$slides.eq(t).css(
		{
			opacity: 0
		}), i && setTimeout(function ()
		{
			n.disableTransition(e), n.disableTransition(t), i.call()
		}, n.options.speed))
	}, e.prototype.filterSlides = function (t)
	{
		var e = this;
		null !== t && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
	}, e.prototype.getCurrent = function ()
	{
		var t = this;
		return t.currentSlide
	}, e.prototype.getDotCount = function ()
	{
		var t = this,
			e = 0,
			i = 0,
			n = 0;
		if (t.options.infinite === !0) n = Math.ceil(t.slideCount / t.options.slidesToScroll);
		else for (; e < t.slideCount;)++n, e = i + t.options.slidesToShow, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
		return n - 1
	}, e.prototype.getLeft = function (t)
	{
		var e, i, n, o = this,
			r = 0;
		return o.slideOffset = 0, i = o.$slides.first().outerHeight(), o.options.infinite === !0 ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = o.slideWidth * o.options.slidesToShow * -1, r = i * o.options.slidesToShow * -1), o.slideCount % o.options.slidesToScroll !== 0 && t + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (t > o.slideCount ? (o.slideOffset = (o.options.slidesToShow - (t - o.slideCount)) * o.slideWidth * -1, r = (o.options.slidesToShow - (t - o.slideCount)) * i * -1) : (o.slideOffset = o.slideCount % o.options.slidesToScroll * o.slideWidth * -1, r = o.slideCount % o.options.slidesToScroll * i * -1))) : t + o.options.slidesToShow > o.slideCount && (o.slideOffset = (t + o.options.slidesToShow - o.slideCount) * o.slideWidth, r = (t + o.options.slidesToShow - o.slideCount) * i), o.slideCount <= o.options.slidesToShow && (o.slideOffset = 0, r = 0), o.options.centerMode === !0 && o.options.infinite === !0 ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : o.options.centerMode === !0 && (o.slideOffset = 0, o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), e = o.options.vertical === !1 ? t * o.slideWidth * -1 + o.slideOffset : t * i * -1 + r, o.options.variableWidth === !0 && (n = o.$slideTrack.children(".slick-slide").eq(o.slideCount <= o.options.slidesToShow || o.options.infinite === !1 ? t : t + o.options.slidesToShow), e = n[0] ? -1 * n[0].offsetLeft : 0, o.options.centerMode === !0 && (n = o.$slideTrack.children(".slick-slide").eq(o.options.infinite === !1 ? t : t + o.options.slidesToShow + 1), e = n[0] ? -1 * n[0].offsetLeft : 0, e += (o.$list.width() - n.outerWidth()) / 2)), e
	}, e.prototype.getNavigableIndexes = function ()
	{
		for (var t = this, e = 0, i = 0, n = []; e < t.slideCount;) n.push(e), e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
		return n
	}, e.prototype.getSlideCount = function ()
	{
		var e, i = this;
		if (i.options.swipeToSlide === !0)
		{
			var n = null;
			return i.$slideTrack.find(".slick-slide").each(function (e, o)
			{
				return o.offsetLeft + t(o).outerWidth() / 2 > -1 * i.swipeLeft ? (n = o, !1) : void 0
			}), e = Math.abs(t(n).attr("index") - i.currentSlide)
		}
		return i.options.slidesToScroll
	}, e.prototype.init = function ()
	{
		var e = this;
		t(e.$slider).hasClass("slick-initialized") || (t(e.$slider).addClass("slick-initialized"), e.buildOut(), e.setProps(), e.startLoad(), e.loadSlider(), e.initializeEvents(), e.updateArrows(), e.updateDots()), null !== e.options.onInit && e.options.onInit.call(this, e)
	}, e.prototype.initArrowEvents = function ()
	{
		var t = this;
		t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.on("click.slick", {
			message: "previous"
		}, t.changeSlide), t.$nextArrow.on("click.slick", {
			message: "next"
		}, t.changeSlide))
	}, e.prototype.initDotEvents = function ()
	{
		var e = this;
		e.options.dots === !0 && e.slideCount > e.options.slidesToShow && t("li", e.$dots).on("click.slick", {
			message: "index"
		}, e.changeSlide), e.options.dots === !0 && e.options.pauseOnDotsHover === !0 && e.options.autoplay === !0 && t("li", e.$dots).on("mouseenter.slick", function ()
		{
			e.paused = !0, e.autoPlayClear()
		}).on("mouseleave.slick", function ()
		{
			e.paused = !1, e.autoPlay()
		})
	}, e.prototype.initializeEvents = function ()
	{
		var e = this;
		e.initArrowEvents(), e.initDotEvents(), e.$list.on("touchstart.slick mousedown.slick", {
			action: "start"
		}, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
			action: "move"
		}, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
			action: "end"
		}, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
			action: "end"
		}, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), e.options.pauseOnHover === !0 && e.options.autoplay === !0 && (e.$list.on("mouseenter.slick", function ()
		{
			e.paused = !0, e.autoPlayClear()
		}), e.$list.on("mouseleave.slick", function ()
		{
			e.paused = !1, e.autoPlay()
		})), e.options.accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && t(e.options.slide, e.$slideTrack).on("click.slick", e.selectHandler), t(window).on("orientationchange.slick.slick-" + e.instanceUid, function ()
		{
			e.checkResponsive(), e.setPosition()
		}), t(window).on("resize.slick.slick-" + e.instanceUid, function ()
		{
			t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function ()
			{
				e.windowWidth = t(window).width(), e.checkResponsive(), e.setPosition()
			}, 50))
		}), t("*[draggable!=true]", e.$slideTrack).on("dragstart", function (t)
		{
			t.preventDefault()
		}), t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition)
	}, e.prototype.initUI = function ()
	{
		var t = this;
		t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.show(), t.options.autoplay === !0 && t.autoPlay()
	}, e.prototype.keyHandler = function (t)
	{
		var e = this;
		37 === t.keyCode && e.options.accessibility === !0 ? e.changeSlide(
		{
			data: {
				message: "previous"
			}
		}) : 39 === t.keyCode && e.options.accessibility === !0 && e.changeSlide(
		{
			data: {
				message: "next"
			}
		})
	}, e.prototype.lazyLoad = function ()
	{
		function e(e)
		{
			t("img[data-lazy]", e).each(function ()
			{
				var e = t(this),
					i = t(this).attr("data-lazy");
				e.load(function ()
				{
					e.animate(
					{
						opacity: 1
					}, 200)
				}).css(
				{
					opacity: 0
				}).attr("src", i).removeAttr("data-lazy").removeClass("slick-loading")
			})
		}
		var i, n, o, r, s = this;
		s.options.centerMode === !0 ? s.options.infinite === !0 ? (o = s.currentSlide + (s.options.slidesToShow / 2 + 1), r = o + s.options.slidesToShow + 2) : (o = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1)), r = 2 + (s.options.slidesToShow / 2 + 1) + s.currentSlide) : (o = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide, r = o + s.options.slidesToShow, s.options.fade === !0 && (o > 0 && o--, r <= s.slideCount && r++)), i = s.$slider.find(".slick-slide").slice(o, r), e(i), s.slideCount <= s.options.slidesToShow ? (n = s.$slider.find(".slick-slide"), e(n)) : s.currentSlide >= s.slideCount - s.options.slidesToShow ? (n = s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow), e(n)) : 0 === s.currentSlide && (n = s.$slider.find(".slick-cloned").slice(-1 * s.options.slidesToShow), e(n))
	}, e.prototype.loadSlider = function ()
	{
		var t = this;
		t.setPosition(), t.$slideTrack.css(
		{
			opacity: 1
		}), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
	}, e.prototype.postSlide = function (t)
	{
		var e = this;
		null !== e.options.onAfterChange && e.options.onAfterChange.call(this, e, t), e.animating = !1, e.setPosition(), e.swipeLeft = null, e.options.autoplay === !0 && e.paused === !1 && e.autoPlay()
	}, e.prototype.progressiveLazyLoad = function ()
	{
		var e, i, n = this;
		e = t("img[data-lazy]", n.$slider).length, e > 0 && (i = t("img[data-lazy]", n.$slider).first(), i.attr("src", i.attr("data-lazy")).removeClass("slick-loading").load(function ()
		{
			i.removeAttr("data-lazy"), n.progressiveLazyLoad()
		}).error(function ()
		{
			i.removeAttr("data-lazy"), n.progressiveLazyLoad()
		}))
	}, e.prototype.refresh = function ()
	{
		var e = this,
			i = e.currentSlide;
		e.destroy(), t.extend(e, e.initials), e.init(), e.changeSlide(
		{
			data: {
				message: "index",
				index: i
			}
		}, !0)
	}, e.prototype.reinit = function ()
	{
		var e = this;
		e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.options.focusOnSelect === !0 && t(e.options.slide, e.$slideTrack).on("click.slick", e.selectHandler), e.setSlideClasses(0), e.setPosition(), null !== e.options.onReInit && e.options.onReInit.call(this, e)
	}, e.prototype.removeSlide = function (t, e, i)
	{
		var n = this;
		return "boolean" == typeof t ? (e = t, t = e === !0 ? 0 : n.slideCount - 1) : t = e === !0 ? --t : t, n.slideCount < 1 || 0 > t || t > n.slideCount - 1 ? !1 : (n.unload(), i === !0 ? n.$slideTrack.children().remove() : n.$slideTrack.children(this.options.slide).eq(t).remove(), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slidesCache = n.$slides, void n.reinit())
	}, e.prototype.setCSS = function (t)
	{
		var e, i, n = this,
			o =
			{
			};
		n.options.rtl === !0 && (t = -t), e = "left" == n.positionProp ? t + "px" : "0px", i = "top" == n.positionProp ? t + "px" : "0px", o[n.positionProp] = t, n.transformsEnabled === !1 ? n.$slideTrack.css(o) : (o =
		{
		}, n.cssTransitions === !1 ? (o[n.animType] = "translate(" + e + ", " + i + ")", n.$slideTrack.css(o)) : (o[n.animType] = "translate3d(" + e + ", " + i + ", 0px)", n.$slideTrack.css(o)))
	}, e.prototype.setDimensions = function ()
	{
		var e = this;
		if (e.options.vertical === !1 ? e.options.centerMode === !0 && e.$list.css(
		{
			padding: "0px " + e.options.centerPadding
		}) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), e.options.centerMode === !0 && e.$list.css(
		{
			padding: e.options.centerPadding + " 0px"
		})), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), e.options.vertical === !1 && e.options.variableWidth === !1) e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length));
		else if (e.options.variableWidth === !0)
		{
			var i = 0;
			e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.children(".slick-slide").each(function ()
			{
				i += Math.ceil(t(this).outerWidth(!0))
			}), e.$slideTrack.width(Math.ceil(i) + 1)
		}
		else e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length));
		var n = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
		e.options.variableWidth === !1 && e.$slideTrack.children(".slick-slide").width(e.slideWidth - n)
	}, e.prototype.setFade = function ()
	{
		var e, i = this;
		i.$slides.each(function (n, o)
		{
			e = i.slideWidth * n * -1, t(o).css(i.options.rtl === !0 ? {
				position: "relative",
				right: e,
				top: 0,
				zIndex: 800,
				opacity: 0
			} : {
				position: "relative",
				left: e,
				top: 0,
				zIndex: 800,
				opacity: 0
			})
		}), i.$slides.eq(i.currentSlide).css(
		{
			zIndex: 900,
			opacity: 1
		})
	}, e.prototype.setHeight = function ()
	{
		var t = this;
		if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1)
		{
			var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
			t.$list.css("height", e)
		}
	}, e.prototype.setPosition = function ()
	{
		var t = this;
		t.setDimensions(), t.setHeight(), t.options.fade === !1 ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), null !== t.options.onSetPosition && t.options.onSetPosition.call(this, t)
	}, e.prototype.setProps = function ()
	{
		var t = this,
			e = document.body.style;
		t.positionProp = t.options.vertical === !0 ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), (void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.msTransition) && t.options.useCSS === !0 && (t.cssTransitions = !0), void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), void 0 !== e.transform && t.animType !== !1 && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = null !== t.animType && t.animType !== !1
	}, e.prototype.setSlideClasses = function (t)
	{
		var e, i, n, o, r = this;
		r.$slider.find(".slick-slide").removeClass("slick-active").removeClass("slick-center"), i = r.$slider.find(".slick-slide"), r.options.centerMode === !0 ? (e = Math.floor(r.options.slidesToShow / 2), r.options.infinite === !0 && (t >= e && t <= r.slideCount - 1 - e ? r.$slides.slice(t - e, t + e + 1).addClass("slick-active") : (n = r.options.slidesToShow + t, i.slice(n - e + 1, n + e + 2).addClass("slick-active")), 0 === t ? i.eq(i.length - 1 - r.options.slidesToShow).addClass("slick-center") : t === r.slideCount - 1 && i.eq(r.options.slidesToShow).addClass("slick-center")), r.$slides.eq(t).addClass("slick-center")) : t >= 0 && t <= r.slideCount - r.options.slidesToShow ? r.$slides.slice(t, t + r.options.slidesToShow).addClass("slick-active") : i.length <= r.options.slidesToShow ? i.addClass("slick-active") : (o = r.slideCount % r.options.slidesToShow, n = r.options.infinite === !0 ? r.options.slidesToShow + t : t, r.options.slidesToShow == r.options.slidesToScroll && r.slideCount - t < r.options.slidesToShow ? i.slice(n - (r.options.slidesToShow - o), n + o).addClass("slick-active") : i.slice(n, n + r.options.slidesToShow).addClass("slick-active")), "ondemand" === r.options.lazyLoad && r.lazyLoad()
	}, e.prototype.setupInfinite = function ()
	{
		var e, i, n, o = this;
		if (o.options.fade === !0 && (o.options.centerMode = !1), o.options.infinite === !0 && o.options.fade === !1 && (i = null, o.slideCount > o.options.slidesToShow))
		{
			for (n = o.options.centerMode === !0 ? o.options.slidesToShow + 1 : o.options.slidesToShow, e = o.slideCount; e > o.slideCount - n; e -= 1) i = e - 1, t(o.$slides[i]).clone(!0).attr("id", "").attr("index", i - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
			for (e = 0; n > e; e += 1) i = e, t(o.$slides[i]).clone(!0).attr("id", "").attr("index", i + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
			o.$slideTrack.find(".slick-cloned").find("[id]").each(function ()
			{
				t(this).attr("id", "")
			})
		}
	}, e.prototype.selectHandler = function (e)
	{
		var i = this,
			n = parseInt(t(e.target).parents(".slick-slide").attr("index"));
		return n || (n = 0), i.slideCount <= i.options.slidesToShow ? (i.$slider.find(".slick-slide").removeClass("slick-active"), i.$slides.eq(n).addClass("slick-active"), i.options.centerMode === !0 && (i.$slider.find(".slick-slide").removeClass("slick-center"), i.$slides.eq(n).addClass("slick-center")), void i.asNavFor(n)) : void i.slideHandler(n)
	}, e.prototype.slideHandler = function (t, e, i)
	{
		var n, o, r, s, a = null,
			l = this;
		return e = e || !1, l.animating === !0 && l.options.waitForAnimate === !0 || l.options.fade === !0 && l.currentSlide === t || l.slideCount <= l.options.slidesToShow ? void 0 : (e === !1 && l.asNavFor(t), n = t, a = l.getLeft(n), s = l.getLeft(l.currentSlide), l.currentLeft = null === l.swipeLeft ? s : l.swipeLeft, l.options.infinite === !1 && l.options.centerMode === !1 && (0 > t || t > l.getDotCount() * l.options.slidesToScroll) ? void(l.options.fade === !1 && (n = l.currentSlide, i !== !0 ? l.animateSlide(s, function ()
		{
			l.postSlide(n)
		}) : l.postSlide(n))) : l.options.infinite === !1 && l.options.centerMode === !0 && (0 > t || t > l.slideCount - l.options.slidesToScroll) ? void(l.options.fade === !1 && (n = l.currentSlide, i !== !0 ? l.animateSlide(s, function ()
		{
			l.postSlide(n)
		}) : l.postSlide(n))) : (l.options.autoplay === !0 && clearInterval(l.autoPlayTimer), o = 0 > n ? l.slideCount % l.options.slidesToScroll !== 0 ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + n : n >= l.slideCount ? l.slideCount % l.options.slidesToScroll !== 0 ? 0 : n - l.slideCount : n, l.animating = !0, null !== l.options.onBeforeChange && t !== l.currentSlide && l.options.onBeforeChange.call(this, l, l.currentSlide, o), r = l.currentSlide, l.currentSlide = o, l.setSlideClasses(l.currentSlide), l.updateDots(), l.updateArrows(), l.options.fade === !0 ? void(i !== !0 ? l.fadeSlide(r, o, function ()
		{
			l.postSlide(o)
		}) : l.postSlide(o)) : void(i !== !0 ? l.animateSlide(a, function ()
		{
			l.postSlide(o)
		}) : l.postSlide(o))))
	}, e.prototype.startLoad = function ()
	{
		var t = this;
		t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
	}, e.prototype.swipeDirection = function ()
	{
		var t, e, i, n, o = this;
		return t = o.touchObject.startX - o.touchObject.curX, e = o.touchObject.startY - o.touchObject.curY, i = Math.atan2(e, t), n = Math.round(180 * i / Math.PI), 0 > n && (n = 360 - Math.abs(n)), 45 >= n && n >= 0 ? o.options.rtl === !1 ? "left" : "right" : 360 >= n && n >= 315 ? o.options.rtl === !1 ? "left" : "right" : n >= 135 && 225 >= n ? o.options.rtl === !1 ? "right" : "left" : "vertical"
	}, e.prototype.swipeEnd = function ()
	{
		var t = this;
		if (t.dragging = !1, t.shouldClick = t.touchObject.swipeLength > 10 ? !1 : !0, void 0 === t.touchObject.curX) return !1;
		if (t.touchObject.swipeLength >= t.touchObject.minSwipe) switch (t.swipeDirection())
		{
		case "left":
			t.slideHandler(t.currentSlide + t.getSlideCount()), t.currentDirection = 0, t.touchObject =
			{
			};
			break;
		case "right":
			t.slideHandler(t.currentSlide - t.getSlideCount()), t.currentDirection = 1, t.touchObject =
			{
			}
		}
		else t.touchObject.startX !== t.touchObject.curX && (t.slideHandler(t.currentSlide), t.touchObject =
		{
		})
	}, e.prototype.swipeHandler = function (t)
	{
		var e = this;
		if (!(e.options.swipe === !1 || "ontouchend" in document && e.options.swipe === !1 || e.options.draggable === !1 && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, t.data.action)
		{
		case "start":
			e.swipeStart(t);
			break;
		case "move":
			e.swipeMove(t);
			break;
		case "end":
			e.swipeEnd(t)
		}
	}, e.prototype.swipeMove = function (t)
	{
		var e, i, n, o, r = this;
		return o = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !r.dragging || o && 1 !== o.length ? !1 : (e = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== o ? o[0].pageX : t.clientX, r.touchObject.curY = void 0 !== o ? o[0].pageY : t.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), i = r.swipeDirection(), "vertical" !== i ? (void 0 !== t.originalEvent && r.touchObject.swipeLength > 4 && t.preventDefault(), n = (r.options.rtl === !1 ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), r.swipeLeft = r.options.vertical === !1 ? e + r.touchObject.swipeLength * n : e + r.touchObject.swipeLength * (r.$list.height() / r.listWidth) * n, r.options.fade === !0 || r.options.touchMove === !1 ? !1 : r.animating === !0 ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft)) : void 0)
	}, e.prototype.swipeStart = function (t)
	{
		var e, i = this;
		return 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow ? (i.touchObject =
		{
		}, !1) : (void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, void(i.dragging = !0))
	}, e.prototype.unfilterSlides = function ()
	{
		var t = this;
		null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
	}, e.prototype.unload = function ()
	{
		var e = this;
		t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && "object" != typeof e.options.prevArrow && e.$prevArrow.remove(), e.$nextArrow && "object" != typeof e.options.nextArrow && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible").css("width", "")
	}, e.prototype.updateArrows = function ()
	{
		var t, e = this;
		t = Math.floor(e.options.slidesToShow / 2), e.options.arrows === !0 && e.options.infinite !== !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.removeClass("slick-disabled"), e.$nextArrow.removeClass("slick-disabled"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled"), e.$nextArrow.removeClass("slick-disabled")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1 ? (e.$nextArrow.addClass("slick-disabled"), e.$prevArrow.removeClass("slick-disabled")) : e.currentSlide > e.slideCount - e.options.slidesToShow + t && e.options.centerMode === !0 && (e.$nextArrow.addClass("slick-disabled"), e.$prevArrow.removeClass("slick-disabled")))
	}, e.prototype.updateDots = function ()
	{
		var t = this;
		null !== t.$dots && (t.$dots.find("li").removeClass("slick-active"), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active"))
	}, t.fn.slick = function (t)
	{
		var i = this;
		return i.each(function (i, n)
		{
			n.slick = new e(n, t)
		})
	}, t.fn.slickAdd = function (t, e, i)
	{
		var n = this;
		return n.each(function (n, o)
		{
			o.slick.addSlide(t, e, i)
		})
	}, t.fn.slickCurrentSlide = function ()
	{
		var t = this;
		return t.get(0).slick.getCurrent()
	}, t.fn.slickFilter = function (t)
	{
		var e = this;
		return e.each(function (e, i)
		{
			i.slick.filterSlides(t)
		})
	}, t.fn.slickGoTo = function (t, e)
	{
		var i = this;
		return i.each(function (i, n)
		{
			n.slick.changeSlide(
			{
				data: {
					message: "index",
					index: parseInt(t)
				}
			}, e)
		})
	}, t.fn.slickNext = function ()
	{
		var t = this;
		return t.each(function (t, e)
		{
			e.slick.changeSlide(
			{
				data: {
					message: "next"
				}
			})
		})
	}, t.fn.slickPause = function ()
	{
		var t = this;
		return t.each(function (t, e)
		{
			e.slick.autoPlayClear(), e.slick.paused = !0
		})
	}, t.fn.slickPlay = function ()
	{
		var t = this;
		return t.each(function (t, e)
		{
			e.slick.paused = !1, e.slick.autoPlay()
		})
	}, t.fn.slickPrev = function ()
	{
		var t = this;
		return t.each(function (t, e)
		{
			e.slick.changeSlide(
			{
				data: {
					message: "previous"
				}
			})
		})
	}, t.fn.slickRemove = function (t, e)
	{
		var i = this;
		return i.each(function (i, n)
		{
			n.slick.removeSlide(t, e)
		})
	}, t.fn.slickRemoveAll = function ()
	{
		var t = this;
		return t.each(function (t, e)
		{
			e.slick.removeSlide(null, null, !0)
		})
	}, t.fn.slickGetOption = function (t)
	{
		var e = this;
		return e.get(0).slick.options[t]
	}, t.fn.slickSetOption = function (t, e, i)
	{
		var n = this;
		return n.each(function (n, o)
		{
			o.slick.options[t] = e, i === !0 && (o.slick.unload(), o.slick.reinit())
		})
	}, t.fn.slickUnfilter = function ()
	{
		var t = this;
		return t.each(function (t, e)
		{
			e.slick.unfilterSlides()
		})
	}, t.fn.unslick = function ()
	{
		var t = this;
		return t.each(function (t, e)
		{
			e.slick && e.slick.destroy()
		})
	}, t.fn.getSlick = function ()
	{
		var t = null,
			e = this;
		return e.each(function (e, i)
		{
			t = i.slick
		}), t
	}
}), function (t)
{
	var e = -1,
		i = -1,
		n = function (e)
		{
			var i = 1,
				n = t(e),
				r = null,
				s = [];
			return n.each(function ()
			{
				var e = t(this),
					n = e.offset().top - o(e.css("margin-top")),
					a = s.length > 0 ? s[s.length - 1] : null;
				null === a ? s.push(e) : Math.floor(Math.abs(r - n)) <= i ? s[s.length - 1] = a.add(e) : s.push(e), r = n
			}), s
		},
		o = function (t)
		{
			return parseFloat(t) || 0
		},
		r = t.fn.matchHeight = function (e)
		{
			if ("remove" === e)
			{
				var i = this;
				return this.css("height", ""), t.each(r._groups, function (t, e)
				{
					e.elements = e.elements.not(i)
				}), this
			}
			return this.length <= 1 ? this : (e = "undefined" != typeof e ? e : !0, r._groups.push(
			{
				elements: this,
				byRow: e
			}), r._apply(this, e), this)
		};
	r._groups = [], r._throttle = 80, r._maintainScroll = !1, r._beforeUpdate = null, r._afterUpdate = null, r._apply = function (e, i)
	{
		var s = t(e),
			a = [s],
			l = t(window).scrollTop(),
			c = t("html").outerHeight(!0),
			u = s.parents().filter(":hidden");
		return u.css("display", "block"), i && (s.each(function ()
		{
			var e = t(this),
				i = "inline-block" === e.css("display") ? "inline-block" : "block";
			e.data("style-cache", e.attr("style")), e.css(
			{
				display: i,
				"padding-top": "0",
				"padding-bottom": "0",
				"margin-top": "0",
				"margin-bottom": "0",
				"border-top-width": "0",
				"border-bottom-width": "0",
				height: "100px"
			})
		}), a = n(s), s.each(function ()
		{
			var e = t(this);
			e.attr("style", e.data("style-cache") || "").css("height", "")
		})), t.each(a, function (e, n)
		{
			var r = t(n),
				s = 0;
			i && r.length <= 1 || (r.each(function ()
			{
				var e = t(this),
					i = "inline-block" === e.css("display") ? "inline-block" : "block";
				e.css(
				{
					display: i,
					height: ""
				}), e.outerHeight(!1) > s && (s = e.outerHeight(!1)), e.css("display", "")
			}), r.each(function ()
			{
				var e = t(this),
					i = 0;
				"border-box" !== e.css("box-sizing") && (i += o(e.css("border-top-width")) + o(e.css("border-bottom-width")), i += o(e.css("padding-top")) + o(e.css("padding-bottom"))), e.css("height", s - i)
			}))
		}), u.css("display", ""), r._maintainScroll && t(window).scrollTop(l / c * t("html").outerHeight(!0)), this
	}, r._applyDataApi = function ()
	{
		var e =
		{
		};
		t("[data-match-height], [data-mh]").each(function ()
		{
			var i = t(this),
				n = i.attr("data-match-height") || i.attr("data-mh");
			e[n] = n in e ? e[n].add(i) : i
		}), t.each(e, function ()
		{
			this.matchHeight(!0)
		})
	};
	var s = function (e)
	{
		r._beforeUpdate && r._beforeUpdate(e, r._groups), t.each(r._groups, function ()
		{
			r._apply(this.elements, this.byRow)
		}), r._afterUpdate && r._afterUpdate(e, r._groups)
	};
	r._update = function (n, o)
	{
		if (o && "resize" === o.type)
		{
			var a = t(window).width();
			if (a === e) return;
			e = a
		}
		n ? -1 === i && (i = setTimeout(function ()
		{
			s(o), i = -1
		}, r._throttle)) : s(o)
	}, t(r._applyDataApi), t(window).bind("load", function (t)
	{
		r._update(!1, t)
	}), t(window).bind("resize orientationchange", function (t)
	{
		r._update(!0, t)
	})
}(jQuery);
var __slice = [].slice,
	__indexOf = [].indexOf ||
	function (t)
	{
		for (var e = 0, i = this.length; i > e; e++) if (e in this && this[e] === t) return e;
		return -1
	};
!
function (t)
{
	var e;
	return e = function ()
	{
		function e(e, i)
		{
			var n, o = this;
			this.input = e, this.defaultOptions =
			{
				animate: !0,
				snapMid: !1,
				classPrefix: null,
				classSuffix: null,
				theme: null,
				highlight: !1
			}, this.settings = t.extend(
			{
			}, this.defaultOptions, i), this.settings.theme && (this.settings.classSuffix = "-" + this.settings.theme), this.input.hide(), this.slider = t("<div>").addClass("simple-slider" + (this.settings.classSuffix || "")).css(
			{
				position: "relative",
				userSelect: "none",
				boxSizing: "border-box"
			}).insertBefore(this.input), this.input.attr("id") && this.slider.attr("id", this.input.attr("id") + "-slider"), this.track = this.createDivElement("track").css(
			{
				width: "100%"
			}), this.settings.highlight && (this.highlightTrack = this.createDivElement("highlight-track").css(
			{
				width: "0"
			})), this.dragger = this.createDivElement("dragger").text("III"), this.slider.css(
			{
				minHeight: this.dragger.outerHeight(),
				marginLeft: this.dragger.outerWidth() / 2,
				marginRight: this.dragger.outerWidth() / 2
			}), this.track.css(
			{
				marginTop: this.track.outerHeight() / -2
			}), this.settings.highlight && this.highlightTrack.css(
			{
				marginTop: this.track.outerHeight() / -2
			}), this.dragger.css(
			{
				marginTop: this.dragger.outerHeight() / -2,
				marginLeft: this.dragger.outerWidth() / -2
			}), this.track.mousedown(function (t)
			{
				return o.trackEvent(t)
			}), this.settings.highlight && this.highlightTrack.mousedown(function (t)
			{
				return o.trackEvent(t)
			}), this.dragger.mousedown(function (t)
			{
				return 1 === t.which ? (o.dragging = !0, o.dragger.addClass("dragging"), o.domDrag(t.pageX, t.pageY), !1) : void 0
			}), t("body").mousemove(function (e)
			{
				return o.dragging ? (o.domDrag(e.pageX, e.pageY), t("body").css(
				{
					cursor: "pointer"
				})) : void 0
			}).mouseup(function ()
			{
				return o.dragging ? (o.dragging = !1, o.dragger.removeClass("dragging"), t("body").css(
				{
					cursor: "auto"
				})) : void 0
			}), this.pagePos = 0, "" === this.input.val() ? (this.value = this.getRange().min, this.input.val(this.value)) : this.value = this.nearestValidValue(this.input.val()), this.setSliderPositionFromValue(this.value), n = this.valueToRatio(this.value), this.input.trigger("slider:ready", {
				value: this.value,
				ratio: n,
				position: n * this.slider.outerWidth(),
				el: this.slider
			})
		}
		return e.prototype.createDivElement = function (e)
		{
			var i;
			return i = t("<div>").addClass(e).css(
			{
				position: "absolute",
				top: "50%",
				userSelect: "none",
				cursor: "pointer"
			}).appendTo(this.slider)
		}, e.prototype.setRatio = function (t)
		{
			var e;
			return t = Math.min(1, t), t = Math.max(0, t), e = this.ratioToValue(t), this.setSliderPositionFromValue(e), this.valueChanged(e, t, "setRatio")
		}, e.prototype.setValue = function (t)
		{
			var e;
			return t = this.nearestValidValue(t), e = this.valueToRatio(t), this.setSliderPositionFromValue(t), this.valueChanged(t, e, "setValue")
		}, e.prototype.trackEvent = function (t)
		{
			return 1 === t.which ? (this.domDrag(t.pageX, t.pageY, !0), this.dragging = !0, !1) : void 0
		}, e.prototype.domDrag = function (t, e, i)
		{
			var n, o, r;
			return null == i && (i = !1), n = t - this.slider.offset().left, n = Math.min(this.slider.outerWidth(), n), n = Math.max(0, n), this.pagePos !== n ? (this.pagePos = n, o = n / this.slider.outerWidth(), r = this.ratioToValue(o), this.valueChanged(r, o, "domDrag"), this.settings.snap ? this.setSliderPositionFromValue(r, i) : this.setSliderPosition(n, i)) : void 0
		}, e.prototype.setSliderPosition = function (t, e)
		{
			if (null == e && (e = !1), e && this.settings.animate)
			{
				if (this.dragger.animate(
				{
					left: t
				}, 200), this.settings.highlight) return this.highlightTrack.animate(
				{
					width: t
				}, 200)
			}
			else if (this.dragger.css(
			{
				left: t
			}), this.settings.highlight) return this.highlightTrack.css(
			{
				width: t
			})
		}, e.prototype.setSliderPositionFromValue = function (t, e)
		{
			var i;
			return null == e && (e = !1), i = this.valueToRatio(t), this.setSliderPosition(i * this.slider.outerWidth(), e)
		}, e.prototype.getRange = function ()
		{
			return this.settings.allowedValues ? {
				min: Math.min.apply(Math, this.settings.allowedValues),
				max: Math.max.apply(Math, this.settings.allowedValues)
			} : this.settings.range ? {
				min: parseFloat(this.settings.range[0]),
				max: parseFloat(this.settings.range[1])
			} : {
				min: 0,
				max: 1
			}
		}, e.prototype.nearestValidValue = function (e)
		{
			var i, n, o, r;
			return o = this.getRange(), e = Math.min(o.max, e), e = Math.max(o.min, e), this.settings.allowedValues ? (i = null, t.each(this.settings.allowedValues, function ()
			{
				return null === i || Math.abs(this - e) < Math.abs(i - e) ? i = this : void 0
			}), i) : this.settings.step ? (n = (o.max - o.min) / this.settings.step, r = Math.floor((e - o.min) / this.settings.step), (e - o.min) % this.settings.step > this.settings.step / 2 && n > r && (r += 1), r * this.settings.step + o.min) : e
		}, e.prototype.valueToRatio = function (t)
		{
			var e, i, n, o, r, s, a, l;
			if (this.settings.equalSteps)
			{
				for (l = this.settings.allowedValues, o = s = 0, a = l.length; a > s; o = ++s) e = l[o], ("undefined" == typeof i || null === i || Math.abs(e - t) < Math.abs(i - t)) && (i = e, n = o);
				return this.settings.snapMid ? (n + .5) / this.settings.allowedValues.length : n / (this.settings.allowedValues.length - 1)
			}
			return r = this.getRange(), (t - r.min) / (r.max - r.min)
		}, e.prototype.ratioToValue = function (t)
		{
			var e, i, n, o, r;
			return this.settings.equalSteps ? (r = this.settings.allowedValues.length, o = Math.round(t * r - .5), e = Math.min(o, this.settings.allowedValues.length - 1), this.settings.allowedValues[e]) : (i = this.getRange(), n = t * (i.max - i.min) + i.min, this.nearestValidValue(n))
		}, e.prototype.valueChanged = function (e, i, n)
		{
			var o;
			if (e.toString() !== this.value.toString()) return this.value = e, o =
			{
				value: e,
				ratio: i,
				position: i * this.slider.outerWidth(),
				trigger: n,
				el: this.slider
			}, this.input.val(e).trigger(t.Event("change", o)).trigger("slider:changed", o)
		}, e
	}(), t.extend(t.fn, {
		simpleSlider: function ()
		{
			var i, n, o;
			return o = arguments[0], i = 2 <= arguments.length ? __slice.call(arguments, 1) : [], n = ["setRatio", "setValue"], t(this).each(function ()
			{
				var r, s;
				return o && __indexOf.call(n, o) >= 0 ? (r = t(this).data("slider-object"), r[o].apply(r, i)) : (s = o, t(this).data("slider-object", new e(t(this), s)))
			})
		}
	}), t(function ()
	{
		return t("[data-slider]").each(function ()
		{
			var e, i, n, o;
			return e = t(this), n =
			{
			}, i = e.data("slider-values"), i && (n.allowedValues = function ()
			{
				var t, e, n, r;
				for (n = i.split(","), r = [], t = 0, e = n.length; e > t; t++) o = n[t], r.push(parseFloat(o));
				return r
			}()), e.data("slider-range") && (n.range = e.data("slider-range").split(",")), e.data("slider-step") && (n.step = e.data("slider-step")), n.snap = e.data("slider-snap"), n.equalSteps = e.data("slider-equal-steps"), e.data("slider-theme") && (n.theme = e.data("slider-theme")), e.attr("data-slider-highlight") && (n.highlight = e.data("slider-highlight")), null != e.data("slider-animate") && (n.animate = e.data("slider-animate")), e.simpleSlider(n)
		})
	})
}(this.jQuery || this.Zepto, this), function (t)
{
	"use strict";
	t.smallWidth = 480, t.mediumWidth = 768, t.App =
	{
		fn: {
		},
		events: {
		}
	}
}(this), function (t, e)
{
	"use strict";
	var i = e.App;
	i.events.resize = [];
	var n, o = 500;
	t(e).on("resize.app", function ()
	{
		e.clearTimeout(n), n = e.setTimeout(function ()
		{
			t.each(i.events.resize, function (i, n)
			{
				n(t(e).outerWidth(), t(e).outerHeight())
			})
		}, o)
	})
}(this.jQuery, this, this.document), function (t, e)
{
	"use strict";
	var i = e.App;
	i.fn.carousel = function ()
	{
		t(".module-carousel").each(function ()
		{
			var i, n = t(this);
			n.on("click", ".item", function (o)
			{
				o.preventDefault();
				var r = t(this),
					s = t(t(this).attr("href"));
				e.clearTimeout(i), n.removeClass(function (t, e)
				{
					return (e.match(/(^|\s)active-item-\S+/g) || []).join(" ")
				}), r.addClass("active"), n.find(".item").not(r).removeClass("active"), n.addClass("active-item-" + r.index()), n.find(".carousel-element.active").addClass("fading-out"), i = e.setTimeout(function ()
				{
					n.find(".carousel-element").not(s).removeClass("active"), n.find(".carousel-element.fading-out").removeClass("fading-out"), s.addClass("active"), e.setTimeout(function ()
					{
						n.find(".fading-in").removeClass("fading-in"), s.addClass("fading-in")
					}, e.Modernizr.csstransitions ? 20 : 1)
				}, e.Modernizr.csstransitions ? 200 : 1)
			})
		})
	}, t(function ()
	{
		i.fn.carousel()
	})
}(this.jQuery, this, this.document), function (t, e, i)
{
	"use strict";

	function n(t)
	{
		return r.prefixed(t).replace(/([A-Z])/g, function (t, e)
		{
			return "-" + e.toLowerCase()
		}).replace(/^ms-/, "-ms-")
	}
	var o = e.App,
		r = e.Modernizr;
	o.fn.parallax = function (o, s)
	{
		function a()
		{
			var t = e.scrollY || i.documentElement.scrollTop || e.pageYOffset;
			p.css(h, "translate3d(0, " + (u > t ? t + "px" : "100%") + ", 0)"), f.toggleClass("hero-moving", t > 2 * u)
		}
		t(e).off("scroll.parallax"), t("[data-height]").css("min-height", ""), t("[data-parallax]").css(n("transform"), "").off("click.parallax");
		var l, c = t("body").hasClass("customer-feedback");
		c ? o > 1100 ? l = 816 : o > e.smallWidth && (l = 700) : l = 760;
		var u = s > l ? s : l,
			d = c ? e.smallWidth : e.mediumWidth;
		if (t('[data-parallax="scroll"]').on("click.parallax", function (e)
		{
			t("html, body").animate(
			{
				scrollTop: u
			}, 700), e.preventDefault()
		}), !(d > o) && (t('[data-height="window"]').css("min-height", u + "px"), t('[data-height="window2x"]').css("min-height", 2 * u + "px"), r.csstransforms3d))
		{
			var h = n("transform"),
				p = t('[data-parallax="bottom"]'),
				f = t("body");
			t(e).on("scroll.parallax", a)
		}
	}, t("[data-parallax]").length && (o.events.resize.push(o.fn.parallax), t(function ()
	{
		o.fn.parallax(t(e).outerWidth(), t(e).outerHeight())
	}), t(e).load(function ()
	{
		o.fn.parallax(t(e).outerWidth(), t(e).outerHeight())
	}))
}(this.jQuery, this, this.document), function (t, e, i, n)
{
	"use strict";
	n.SignupApp =
	{
	}, n.SignupApp.AppView = e.View.extend(
	{
		el: "body",
		initialize: function ()
		{
			this.bindOnboardingEmailAddressForms()
		},
		bindOnboardingEmailAddressForms: function ()
		{
			this.onboarding_email_address_form_views = [];
			var e = this;
			i.each(t(".app-signup-form"), function (i)
			{
				var o = new n.SignupApp.OnboardingEmailAddressFormView(
				{
					el: t(i)
				});
				e.onboarding_email_address_form_views.push(o)
			})
		}
	}), t(function ()
	{
		n.signup_app = new n.SignupApp.AppView
	}), n.SignupApp.OnboardingEmailAddress = e.Model.extend(
	{
		validateEmail: function (t)
		{
			var e = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return e.test(t)
		},
		validate: function (t)
		{
			return this.validateEmail(t.email) ? void 0 : {
				invalid_email: !0
			}
		}
	}), n.SignupApp.OnboardingEmailAddressFormView = e.View.extend(
	{
		events: {
			"keypress .onboarding_email": "handleOnboardingEmailKeyPress",
			"keypress .launches_installer": "handleLaunchesInstallerKeyPress",
			"click .launches_installer": "validateOnboardingEmailAddressAndRedirect"
		},
		handleOnboardingEmailKeyPress: function (e)
		{
			13 === e.which && (t(".signup-form-button", this.$el).trigger("click"), e.preventDefault())
		},
		handleLaunchesInstallerKeyPress: function (e)
		{
			32 === e.which && (t(e.target).trigger("click"), e.preventDefault())
		},
		validateOnboardingEmailAddressAndRedirect: function (e)
		{
			e.preventDefault();
			var i = t(".onboarding_email", this.$el).val();
			if (this.onboarding_email_address = new n.SignupApp.OnboardingEmailAddress(
			{
				email: i
			}), this.onboarding_email_address.isValid())
			{
				this.$el.removeClass("signup-form-has-errors"), t(".onboarding_email", this.$el).focus();
				var o = "https://app.intercom.io/a/get_started/choose?email=" + i,
					r = t(e.target).data("package");
				r && (o += "&package=" + r), n.location.href = o
			}
			else this.$el.addClass("signup-form-has-errors"), t(".onboarding_email", this.$el).focus()
		}
	})
}(this.jQuery, this.Backbone, this._, this, this.document), function (t, e, i)
{
	"use strict";

	function n(e)
	{
		var i = t(e).parents(".signup-and-signin-form-wrapper").eq(0);
		if (!i.data("sending"))
		{
			i.data("sending", !0);
			var n = t("input[type=email]", i).val(),
				o = t(".signup-form", i);
			t(".mobile_signup_button", o).html("Sending..."), t.ajax(
			{
				url: "/mobile-signup",
				type: "POST",
				data: {
					email: n
				}
			}).fail(function ()
			{
				o.addClass("signup-form-has-errors")
			}).done(function ()
			{
				i.html("<p>Thanks! We\u2019ll send you an email to help you get started.</p>"), t.ajax(
				{
					url: "https://app.intercom.io/marketing_onboarding/onboarding_email_addresses",
					type: "POST",
					data: {
						email: n
					}
				})
			}), ga("send", "event", "button", "click", "open_installer_mobile")
		}
	}
	t(i).on("keypress", ".mobile_signup_input", function (e)
	{
		t(this).parents(".signup-form").removeClass("signup-form-has-errors"), 13 === e.which && (e.preventDefault(), n(this))
	}), t(i).on("click", ".mobile_signup_button", function (t)
	{
		t.preventDefault(), n(this)
	})
}(this.jQuery, this, this.document), function (t, e, i, n, o)
{
	"use strict";
	var r = e.Model.extend(
	{
		USER_TIER_TO_PRICE: {
			250: {
				fixed_prices: {
					base: 45,
					variable: .4
				},
				marginal_prices: {
					observe: {
						base: -45,
						variable: -.4
					},
					learn: {
						base: 4,
						variable: .3
					},
					support: {
						base: 4,
						variable: .5
					},
					engage: {
						base: 4,
						variable: .7
					},
					platform: {
						base: 12,
						variable: 1.5
					}
				},
				variable_lot_size: 50
			},
			1000: {
				fixed_prices: {
					base: 48,
					variable: 2.8
				},
				marginal_prices: {
					observe: {
						base: -48,
						variable: -2.8
					},
					learn: {
						base: 11,
						variable: .4
					},
					support: {
						base: 13,
						variable: 1
					},
					engage: {
						base: 15,
						variable: 2.4
					},
					platform: {
						base: 39,
						variable: 3.8
					}
				},
				variable_lot_size: 500
			},
			10000: {
				fixed_prices: {
					base: 70,
					variable: 34
				},
				marginal_prices: {
					observe: {
						base: -70,
						variable: -34
					},
					learn: {
						base: 15,
						variable: 7
					},
					support: {
						base: 25,
						variable: 17
					},
					engage: {
						base: 30,
						variable: 27
					},
					platform: {
						base: 70,
						variable: 51
					}
				},
				variable_lot_size: 5e3
			},
			100000: {
				fixed_prices: {
					base: 0,
					variable: 0
				},
				marginal_prices: {
					observe: {
						base: 0,
						variable: 0
					},
					learn: {
						base: 999999,
						variable: 999999
					},
					support: {
						base: 999999,
						variable: 999999
					},
					engage: {
						base: 999999,
						variable: 999999
					},
					platform: {
						base: 999999,
						variable: 999999
					}
				},
				variable_lot_size: 1
			}
		},
		initialize: function ()
		{
			this.listenTo(this, "change:user_count", this.updateCurrentPrices)
		},
		pricesFor: function (t, e)
		{
			if (this.currentPrices)
			{
				var i = this.currentPrices.fixed_prices,
					n = this.currentPrices.marginal_prices[t] || this.currentPrices.marginal_prices[e];
				return {
					base: i.base + n.base,
					variable: i.variable + n.variable,
					variable_lot_size: this.currentPrices.variable_lot_size
				}
			}
			return null
		},
		addSeparators: function (t)
		{
			return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		},
		updateCurrentPrices: function ()
		{
			this.currentPrices = this.USER_TIER_TO_PRICE[this.get("user_count")]
		}
	}),
		s = e.View.extend(
		{
			events: {
				"click li": "handleUserBracketSelected",
				"change .user-count-select": "handleUserSelectChange"
			},
			initialize: function ()
			{
				this.currentlySelected = t(".active", this.$el).data("user-bracket-id")
			},
			handleUserBracketSelected: function (e)
			{
				t(e.currentTarget).data("user-bracket-id") && this.selectUserBracket(t(e.currentTarget).data("user-bracket-id"))
			},
			handleUserSelectChange: function (e)
			{
				this.selectUserBracket(t(e.currentTarget).val())
			},
			selectUserBracket: function (e)
			{
				t("li", this.$el).removeClass("active"), t("li[data-user-bracket-id=" + e + "]", this.$el).addClass("active"), t(".user-count-select").val(e), t("#" + e).removeClass("hidden"), this.currentlySelected = e, this.model.set("user_count", this.currentlySelected)
			}
		}),
		a = e.View.extend(
		{
			events: {
				"click li": "handlePackageSelected"
			},
			initialize: function ()
			{
				this.listenTo(this.model, "change:user_count", this.handleSelectedUserCountChange), this.currentlySelected = t(".active", this.$el).data("package-id")
			},
			handlePackageSelected: function (e)
			{
				this.selectPackage(t(e.currentTarget).data("package-id"))
			},
			selectPackage: function (e)
			{
				t("li", this.$el).removeClass("active"), t("li[data-package-id=" + e + "]", this.$el).addClass("active"), t(".package-description-container").addClass("hidden"), t("#" + e).removeClass("hidden"), this.currentlySelected = e
			},
			handleSelectedUserCountChange: function ()
			{
				this.selectPackage(this.currentlySelected)
			}
		}),
		l = e.View.extend(
		{
			initialize: function ()
			{
				this.packageID = this.$el.parents("[data-package-id]").data("package-id"), this.fallbackID = this.$el.data("fallback"), this.listenTo(this.model, "change:user_count", this.handleSelectedUserCountChange), this.listenTo(this.model, "change:user_count", this.showSelectedUsers)
			},
			handleSelectedUserCountChange: function ()
			{
				var e = this.model.pricesFor(this.packageID, this.fallbackID);
				if (null !== e) if (e.base >= 999999) t(".price-wrap,.price-container.package-summary-price-container, .starting-from, .base-and-variable-price-container").hide(), t(".simple-price-container").html('<a href="/contact">Contact our sales team</a>').show(), t(".max-price-container").show();
				else if (0 === e.variable) switch (t(".price-wrap,.price-container.package-summary-price-container, .simple-price-container").show(), t(".max-price-container, .starting-from, .base-and-variable-price-container").hide(), this.$el[0].className)
				{
				case "simple-price":
					this.$el.html("$ " + e.base);
					break;
				case "simple-price-container":
					this.$el.html("$ " + e.base + " / month")
				}
				else
				{
					switch (this.$el[0].className)
					{
					case "simple-price":
						this.$el.html('<span class="dollar">$</span> ' + e.base);
						break;
					case "base-price":
						this.$el.html('<span class="dollar">$</span> ' + e.base);
						break;
					case "base-users":
						this.$el.html(u(this.model.get("user_count")));
						break;
					case "variable-price":
						this.$el.html('<span class="dollar">$</span> ' + d(e.variable));
						break;
					case "user-lot-size":
						this.$el.html(u(e.variable_lot_size))
					}
					t(".price-wrap,.price-container.package-summary-price-container, .starting-from, .base-and-variable-price-container").show(), t(".max-price-container, .simple-price-container").hide()
				}
			},
			showSelectedUsers: function ()
			{
				var e = t(".users-count");
				e.length && e.text(this.model.addSeparators(this.model.get("user_count")))
			}
		}),
		c = e.View.extend(
		{
			initialize: function ()
			{
				this.packageID = this.$el.parents("[data-package-id]").data("package-id"), this.listenTo(this.model, "change:user_count", this.handleSelectedUserCountChange)
			},
			handleSelectedUserCountChange: function ()
			{
				"observe" !== this.packageID && ("more" === this.model.get("user_count") ? this.$el.addClass("hidden") : this.$el.removeClass("hidden"))
			}
		}),
		u = function (t)
		{
			return 1e3 > t ? t : u(Math.floor(t / 1e3)) + "," + ("00" + t % 1e3).slice(-3)
		},
		d = function (t)
		{
			return t % 1 === 0 ? t : t.toFixed(2)
		};
	t(o).ready(function ()
	{
		t('[data-init="old-pricing"]').length && (n.selected_prices = new r, new s(
		{
			el: t(".customize-pricing"),
			model: n.selected_prices
		}), new a(
		{
			el: t(".package-selector"),
			model: n.selected_prices
		}), i.each(t(".simple-price,.base-price,.variable-price,.base-users,.user-lot-size,.simple-price-container"), function (e)
		{
			new l(
			{
				el: t(e),
				model: n.selected_prices
			})
		}), i.each(t(".signup"), function (e)
		{
			new c(
			{
				el: t(e),
				model: n.selected_prices
			})
		}), n.setTimeout(function ()
		{
			n.selected_prices.set("user_count", 1e3)
		}, 500))
	})
}(this.jQuery, this.Backbone, this._, this, this.document), function (t, e, i, n, o, r)
{
	"use strict";
	var s = function (t)
	{
		return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	},
		a = function (t)
		{
			return t.toFixed(2)
		},
		l = function (t)
		{
			return t.charAt(0).toUpperCase() + t.slice(1)
		},
		c = function (t)
		{
			var e = s(t);
			return "100,000" === e && (e = "> 50,000"), e
		},
		u = function ()
		{
			var e = t(".price-summary"),
				i = t(o).scrollTop(),
				n = t(".pricingv4-hero").outerHeight(),
				r = t(".footer").outerHeight(),
				s = t(o).height(),
				a = 60,
				l = 50,
				c = e.outerHeight();
			i + c + l + a > s - r ? (e.css("top", s - r - l - c), e.removeClass("stuck").addClass("above-footer")) : i > n ? (e.css("top", ""), e.removeClass("above-footer").addClass("stuck")) : (e.css("top", ""), e.removeClass("stuck").removeClass("above-footer"))
		},
		d = e.Model.extend(
		{
			PRICE_DATA_FOR_USER_TIER: {
				250: {
					requiresSales: !1,
					fixedPrices: {
						base: 45,
						variable: .4
					},
					marginalPrices: {
						observe: {
							base: -45,
							variable: -.4
						},
						learn: {
							base: 4,
							variable: .3
						},
						support: {
							base: 4,
							variable: .5
						},
						engage: {
							base: 4,
							variable: .7
						},
						platform: {
							base: 12,
							variable: 1.5
						}
					},
					variableLotSize: 50
				},
				1e3: {
					requiresSales: !1,
					fixedPrices: {
						base: 48,
						variable: 2.8
					},
					marginalPrices: {
						observe: {
							base: -48,
							variable: -2.8
						},
						learn: {
							base: 11,
							variable: .4
						},
						support: {
							base: 13,
							variable: 1
						},
						engage: {
							base: 15,
							variable: 2.4
						},
						platform: {
							base: 39,
							variable: 3.8
						}
					},
					variableLotSize: 500
				},
				1e4: {
					requiresSales: !1,
					fixedPrices: {
						base: 70,
						variable: 34
					},
					marginalPrices: {
						observe: {
							base: -70,
							variable: -34
						},
						learn: {
							base: 15,
							variable: 7
						},
						support: {
							base: 25,
							variable: 17
						},
						engage: {
							base: 30,
							variable: 27
						},
						platform: {
							base: 70,
							variable: 51
						}
					},
					variableLotSize: 5e3
				},
				5e4: {
					requiresSales: !0
				}
			},
			DEFAULT_USER_COUNT: 1e3,
			initialize: function ()
			{
				this.listenTo(this, "change:userCount", this.renderPrice), this.listenTo(this, "change:packageName", this.renderPrice), this.set("userCount", this.DEFAULT_USER_COUNT), t("#slider").simpleSlider("setValue", this.DEFAULT_USER_COUNT)
			},
			userTierForCount: function (t)
			{
				return 1e3 >= t ? 250 : 1e4 >= t ? 1e3 : 5e4 >= t ? 1e4 : 5e4
			},
			currentSelectionPrice: function ()
			{
				var t = this.get("userCount"),
					e = this.get("packageName");
				if (t && e)
				{
					if ("observe" === e) return 0;
					var i = this.userTierForCount(t),
						n = this.PRICE_DATA_FOR_USER_TIER[i];
					if (n.requiresSales) return "custom";
					var o = n.fixedPrices,
						r = n.marginalPrices[e],
						s = o.base + r.base,
						a = o.variable + r.variable,
						l = Math.ceil((t - i) / n.variableLotSize);
					return s + a * l
				}
			},
			renderPrice: function ()
			{
				var e = this.currentSelectionPrice(),
					i = this.get("packageName");
				"custom" === e ? t(".price-summary").removeClass("price-summary-showing-self-serve").addClass("price-summary-showing-sales") : e !== r ? (t(".price-summary").removeClass("price-summary-showing-sales").addClass("price-summary-showing-self-serve"), t(".price-summary-price .figure").html(a(e)), t(".price-summary-user-count").html(c(this.get("userCount"))), "observe" === i ? (t(".price-not-observe").hide(), t(".price-observe").show()) : (t(".price-not-observe").show(), t(".price-observe").hide())) : t(".price-summary").removeClass("price-summary-showing-sales").removeClass("price-summary-showing-self-serve"), i && t(".price-summary-package-name").html(l(i)), u()
			}
		}),
		h = e.View.extend(
		{
			initialize: function ()
			{
				var e = this;
				t("[data-slider]").on("slider:ready slider:changed", function (t, i)
				{
					e.handleSliderChange(t, i)
				})
			},
			handleSliderChange: function (t, e)
			{
				this.setUserCount(e.value)
			},
			setUserCount: function (e)
			{
				t(".user-count-heading span").html(c(e)), this.model.set("userCount", e)
			}
		}),
		p = e.View.extend(
		{
			events: {
				"click .pricing-job-choice": "handlePackageSelected"
			},
			initialize: function ()
			{
				this.currentlySelected = t(".active", this.$el).data("package-id")
			},
			handlePackageSelected: function (e)
			{
				var i = t(e.currentTarget).data("package-id");
				t(".pricing-job-choice").removeClass("pricing-job-choice-selected"), t(e.currentTarget).addClass("pricing-job-choice-selected"), this.model.set("packageName", i)
			}
		});
	t(o).ready(function ()
	{
		t('[data-init="pricing"]').length && (n.suppressFixedHeader = !0, n.selectedPrices = new d, new h(
		{
			el: t(".user-count-selector-section"),
			model: n.selectedPrices
		}), new p(
		{
			el: t(".package-selector-section"),
			model: n.selectedPrices
		}), t(o).on("scroll", u), t(o).on("ajax:success", ".price-summary-sales form", function ()
		{
			t(".price-summary-sales form").hide(), t(".sales-form-success").show(), n.ga("send", "event", "button", "click", "contact_us-submission")
		}), t(".get-started-form").on("submit", function (e)
		{
			e.preventDefault();
			var i = t(e.target).find('input[name="email"]').val(),
				o = "https://app.intercom.io/a/get_started/choose?email=" + i,
				r = n.selectedPrices.packageName;
			r && (o += "&package=" + r), n.location.href = o
		}), u())
	})
}(this.jQuery, this.Backbone, this._, this, this.document), function (t, e, i)
{
	"use strict";
	var n = e.Model.extend(
	{
		USER_COUNT_TO_PRICE: {
			"30,000": "$99",
			"50,000": "$109",
			"100,000": "$149",
			"150,000": "$219",
			"200,000": "$299",
			"250,000": "$399",
			"350,000": "$549",
			"500,000": "$699",
			more: "contact-sales"
		},
		getCurrent: function ()
		{
			return this.USER_COUNT_TO_PRICE[this.get("user_count")]
		}
	}),
		o = e.View.extend(
		{
			events: {
				"click .mobile-user-bracket": "onUserBracketClicked",
				"change .user-count-select": "onUserSelectChanged"
			},
			initialize: function ()
			{
				this.listenTo(this.model, "change:user_count", this.onUserCountChanged), this.$slider = this.$(".mobile-user-selector-slider"), this.$select = this.$(".mobile-user-count-select"), this.createUserBracketIndex(), this.userSliderWidth = this.$slider.outerWidth(), this.bindDraggable()
			},
			createUserBracketIndex: function ()
			{
				this.userBracketCenterPositionIndex =
				{
				}, this.userBracketSizeIndex =
				{
				};
				var e = this.$el.offset().left;
				i.each(this.$(".mobile-user-bracket"), function (i)
				{
					i = t(i);
					var n = i.find("span"),
						o = n.offset().left - e + n.outerWidth() / 2;
					this.userBracketCenterPositionIndex[o] = i, this.userBracketSizeIndex[i.data("user-bracket-size")] = o
				}, this)
			},
			updateSelectedUserCount: function (e, i)
			{
				if (t(".user-count-select").val(e), this.currentUsersCount = e, this.model.set("user_count", e), i)
				{
					var n = this.userBracketSizeIndex[e];
					this.snapSliderToPoint(n)
				}
			},
			bindDraggable: function ()
			{
				this.$slider.draggable(
				{
					axis: "x",
					containment: "parent",
					drag: i.bind(this.onSliderDragged, this, !1),
					stop: i.bind(this.onSliderDragged, this, !0)
				})
			},
			onSliderDragged: function (t, e, n)
			{
				var o, r;
				i.each(this.userBracketCenterPositionIndex, function (t, e)
				{
					var i = Math.abs(e - (n.position.left + this.userSliderWidth / 2));
					(!o || o > i) && (o = i, r = this.userBracketCenterPositionIndex[e])
				}, this), this.updateSelectedUserCount(r.data("user-bracket-size"), t)
			},
			onUserSelectChanged: function (e)
			{
				e.preventDefault();
				var i = t(e.currentTarget).val();
				this.updateSelectedUserCount(i, !0)
			},
			onUserBracketClicked: function (e)
			{
				e.preventDefault();
				var i = t(e.currentTarget).data("user-bracket-size");
				this.updateSelectedUserCount(i, !0)
			},
			onUserCountChanged: function (t)
			{
				var e = t.get("user_count"),
					i = "more" === e;
				this.$(".mobile-users-count").text(e), this.$(".mobile-price-wrap").toggle(!i), this.$(".mobile-contact-sales").toggle(i), this.updateSelectedUserCount(e, e !== this.currentUsersCount)
			},
			snapSliderToPoint: function (t)
			{
				this.$slider.animate(
				{
					left: t - this.userSliderWidth / 2 - 1
				}, "fast")
			}
		}),
		r = e.View.extend(
		{
			initialize: function ()
			{
				this.listenTo(this.model, "change:user_count", this.onPriceChanged)
			},
			onPriceChanged: function ()
			{
				var t = this.model.getCurrent();
				t && this.$el.html(t.replace(/\$/, "<span>$</span>"))
			}
		});
	t(function ()
	{
		var e = new n;
		i.each(t(".mobile-pricing"), function (t)
		{
			new o(
			{
				el: t,
				model: e
			})
		}), i.each(t(".mobile-price-strikethrough"), function (i)
		{
			new r(
			{
				el: t(i),
				model: e
			})
		}), e.set("user_count", "30,000")
	})
}(this.jQuery, this.Backbone, this._, this, this.document), function (t, e, i)
{
	"use strict";

	function n()
	{
		var t = void 0 !== e.pageYOffset ? e.pageYOffset : (i.documentElement || i.body.parentNode || i.body).scrollTop;
		r.recalculateAll(), r.scrollCheck(t)
	}
	var o = function (t, e, i)
	{
		var n;
		return function ()
		{
			var o = this,
				r = arguments,
				s = function ()
				{
					n = null, i || t.apply(o, r)
				},
				a = i && !n;
			clearTimeout(n), n = setTimeout(s, e), a && t.apply(o, r)
		}
	},
		r =
		{
			bindings: {
			},
			counter: 0
		};
	!
	function (t)
	{
		function n(t)
		{
			return parseInt(t, 10) / 100
		}
		var o = 0;
		t.add = function (e, i, n, o)
		{
			void 0 === n && (n = "25%"), void 0 === o && (o = !1), t.bindings[t.counter] =
			{
				el: e,
				fn: i,
				visible: n,
				remove: o
			}, t.refreshScrollInfo(t.counter), t.counter += 1
		}, t.remove = function (e)
		{
			delete t.bindings[e]
		}, t.refreshScrollInfo = function (e)
		{
			var i = t.bindings[e];
			i.height = i.el.outerHeight(), i.top = i.el.offset().top, i.visiblePixels = "string" == typeof i.visible ? i.height * n(i.visible) : i.visible, i.scrolledToFromBottomPoint = Math.floor(i.top + i.visiblePixels), i.scrolledToFromTopPoint = Math.floor(i.top + i.height - i.visiblePixels)
		}, t.recalculateAll = function ()
		{
			t.recalculateBrowserHeight();
			for (var e in t.bindings) t.refreshScrollInfo(e)
		}, t.recalculateBrowserHeight = function ()
		{
			o = e.innerHeight || i.documentElement.clientHeight || i.getElementsByTagName("body")[0].clientHeight
		}, t.inView = function (t, e)
		{
			var i = t.top < e + .2 * o && t.top + t.visiblePixels > e + .8 * o,
				n = e + o > t.scrolledToFromBottomPoint,
				r = e < t.scrolledToFromTopPoint;
			return i || r && n
		}, t.scrollCheck = function (e)
		{
			var i;
			for (var n in t.bindings) i = t.bindings[n], t.inView(i, e) && (i.fn(i.el), i.remove && t.remove(n))
		}
	}(r);
	var s = function (e, i, n)
	{
		e = t(e), 0 !== e.length && r.add(e, i, n)
	};
	t(e).on("resize", o(function ()
	{
		r.recalculateAll()
	}, 250)), t(i).on("ready", function ()
	{
		r.recalculateBrowserHeight(), n()
	}), t(e).on("scroll", o(n, 250)), e.onScrollToDo = s
}(jQuery, window, document), function (t, e)
{
	"use strict";

	function i(e)
	{
		t(e).length && ("undefined" != typeof n && "function" == typeof n.get && "function" == typeof n.get(0).pause && n.each(function ()
		{
			this.pause()
		}), n = t(e).get(0), r = n.hasAttribute("loop"), o = "true" === n.getAttribute("data:hasPlayed"), s || !r && o || (n = t(e), n.each(function ()
		{
			this.play()
		})))
	}
	var n, o, r, s = navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
	t("video:not(.looping-background-video)").on("ended", function ()
	{
		this.setAttribute("data:hasPlayed", "true")
	}), e.playOnlyThisVideo = i
}(jQuery, window, document), $(function ()
{
	"use strict";

	function t(t)
	{
		var e = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return e.test(t)
	}
	function e()
	{
		$(".slider").length > 0 && window.initSlider()
	}
	$(document).on("focus", ".signup-form input", function ()
	{
		$(this).parents(".signup-form").addClass("signup-form-has-focus")
	}), $(document).on("blur", ".signup-form input", function ()
	{
		$(this).parents(".signup-form").removeClass("signup-form-has-focus")
	}), $(document).on("click", "#Pricing", function ()
	{
		try
		{
			window.__adroll.record_user(
			{
				adroll_segments: "use_cases"
			})
		}
		catch (t)
		{
		}
	}), $(document).on("submit", ".ios-signup-wrapper form", function (e)
	{
		var i = $(this),
			n = $("input", i);
		t(n.val()) ? i.removeClass("signup-form-has-errors") : (i.addClass("signup-form-has-errors"), e.preventDefault()), n.focus()
	}), "function" == typeof $.fn.tooltip && $(".pricing-block .tooltip").tooltip(), window.killSlider = function ()
	{
		window.sliderActive = !1
	}, window.initSlider = function ()
	{
		function t()
		{
			for (var t, e = h; e >= 0 && !c[e].shuffled; e--) t = c[e], t.left + b + t.width < 0 && (t.left = t.left + d, t.ref.css("left", t.left), t.shuffled = !0)
		}
		function e()
		{
			if (window.sliderActive)
			{
				t();
				var i, o = (h + 1) % c.length;
				i = c[o].completed ?
				function ()
				{
					n(), e()
				} : e;
				var s = Math.ceil((c[h].width + c[o].width) / 2);
				b -= s, c[h].completed = !0, h = o, r.animate(
				{
					left: b
				}, 150, "linear"), window.setTimeout(i, u)
			}
		}
		function i()
		{
			window.setTimeout(e, u)
		}
		function n()
		{
			r.css("left", 0), b = 0;
			for (var t = 0, e = c.length; e > t; t++) c[t].completed = !1, c[t].shuffled = !1, c[t].left = c[t].original_left, c[t].ref.css("left", c[t].left)
		}
		var o = $(".slider"),
			r = $(".slider-inner", o),
			s = $("img", r),
			a = o.width(),
			l = Math.round(a / 2),
			c = [],
			u = 5e3;
		window.sliderActive = !0, s.each(function (t)
		{
			var e = $(this),
				i =
				{
					width: e.width(),
					height: e.height(),
					ref: e,
					completed: !1,
					shuffled: !1
				};
			c[t] = i, e.width(i.width), e.height(i.height)
		});
		for (var d = 0, h = Math.floor(c.length / 2), p = 0, f = c.length; f > p && l > d; p++) d += c[p].width, d >= l && (h = p);
		var g = 0;
		for (p = 0; h > p; p++) g += c[p].width;
		var m, v = l - Math.floor(c[h].width / 2),
			y = g - v;
		for (d = 0, p = 0, f = c.length; f > p; p++) m = d - y, c[p].ref.css(
		{
			left: m,
			top: 0,
			position: "absolute",
			"float": "none"
		}), c[p].left = m, c[p].original_left = m, d += c[p].width;
		var b = 0;
		o.animate(
		{
			opacity: 1
		}, 500, "linear", i)
	}, $(document).ready(e), $(document).on("page:load", function ()
	{
		window.killSlider(), e()
	}), $(document).on("ajax:success", ".contact-us-form form", function ()
	{
		$(".contact-us-form form").hide(), $(".contact_form_success").show(), window.ga("send", "event", "button", "click", "contact_us-submission")
	}), $(document).on("ajax:error", ".contact-us-form form", function ()
	{
		var t = $(".contact-us-form form .errors");
		t.html("Please fill in all required fields"), t.show()
	}), $(document).on("click", "[data-track-start-tour]", function ()
	{
		try
		{
			window.__adroll.record_user(
			{
				adroll_segments: "start_tour"
			})
		}
		catch (t)
		{
		}
	}), $(document).on("click", ".switcher-buttons .button", function (t)
	{
		t.preventDefault();
		var e = $(this),
			i = e.parents(".switcher").eq(0),
			n = $(".green-button", i),
			o = $(".switching-element-active", i),
			r = $(e.attr("href"), i);
		n.removeClass("green-button").addClass("gray-button"), e.removeClass("gray-button").addClass("green-button");
		var s = $("video", o).get(0);
		return s.currentTime = 1e3, o.removeClass("switching-element-active").addClass("switching-element"), r.removeClass("switching-element").addClass("switching-element-active"), window.playOnlyThisVideo($("video", r)), !1
	}), window.App.fn.loadBlogPosts = function ()
	{
//		$.get("/blog-posts?number=2", function (t)
//		{
//			$("#BlogPosts").html(t)
//		})
	}, window.App.fn.loadBlogPosts(), $('[data-autoplay="contents"]').each(function ()
	{
		window.onScrollToDo(this, function (t)
		{
			window.playOnlyThisVideo($("video", t))
		}, "100%")
	}), $("[data-visible]").each(function ()
	{
		var t = $(this).data("visible") || "100%";
		window.onScrollToDo(this, function (t)
		{
			$(t).addClass("element-visible")
		}, t)
	}), $('video[data-autoplay="this"]').each(function ()
	{
		var t = this.getAttribute("data-autoplay-shown-amount");
		void 0 === t && (t = "100%"), window.onScrollToDo(this, function (t)
		{
			window.playOnlyThisVideo(t)
		}, t)
	}), $("[data-toggle]").on("click.app", function (t)
	{
		t.preventDefault();
		var e = $(this),
			i = e.attr("href");
		e.toggleClass("open"), $(i).toggleClass("collapsed")
	}), navigator.userAgent.match(/Version\/[\d\.]+.*Safari/) && $('[data-poster="no-safari"]').attr("poster", ""), navigator.userAgent.match(/(iPad|iPhone|iPod)/g) && $("body").addClass("ios"), $(".same-height").matchHeight(), $(window).load(function ()
	{
		$('[data-carousel="single"] .module-featured-customer').matchHeight(!1);
		var t = $('[data-carousel="single"]').slick(
		{
			autoplay: !0,
			autoplaySpeed: 1e4,
			dots: !0,
			draggable: !1,
			infinite: !1,
			pauseOnHover: !1,
			slide: ".item",
			slidesToShow: 1,
			speed: 500
		});
		$('[data-carousel="single"]').on("click.app", ".slick-dots li", function ()
		{
			t.slickPause()
		})
	}), $('[data-carousel="multiple"]').slick(
	{
		autoplay: !0,
		autoplaySpeed: 5e3,
		centerPadding: "0",
		infinite: !0,
		slide: ".item",
		slidesToShow: 3,
		responsive: [
		{
			breakpoint: 860,
			settings: {
				slidesToShow: 2
			}}, {
			breakpoint: 480,
			settings: {
				slidesToShow: 1
			}}]
	}), function ()
	{
		var t;
		$("[data-filter]").on("click.app", function (e)
		{
			e.preventDefault();
			var i = $(this),
				n = $(".filter-container .item");
			i.hasClass("active") || ($("[data-filter]").removeClass("active"), i.addClass("active"), n.addClass("fade-out"), window.clearTimeout(t), t = window.setTimeout(function ()
			{
				n.addClass("hidden");
				var t = n.filter(i.data("filter"));
				t.removeClass("hidden"), window.setTimeout(function ()
				{
					t.removeClass("fade-out")
				}, 10)
			}, 300))
		})
	}(), $("[data-popup]").on("click.app", function (t)
	{
		t.preventDefault();
		var e = $(window).width() / 2 - 350,
			i = $(window).height() / 2 - 250;
		window.open($(this).attr("href"), $(this).data("share"), "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=700, height=500, top=" + i + ", left=" + e)
	})
}), $(function ()
{
	"use strict";

	function t()
	{
		l.length && (o = u ? n : l.offset().top, r = l.outerHeight(), e())
	}
	function e()
	{
		var t = $('[data-active-link="true"]'),
			e =
			{
			};
		t.length && (t.each(function ()
		{
			var t = $(this).attr("href").replace(/^\//, ""),
				i = $(t);
			e[t] =
			{
				$el: $(this),
				start: window.Math.floor(i.offset().top) - (r + 2),
				stop: window.Math.floor(i.offset().top + i.outerHeight()) - (r + 2)
			}
		}), d = function (i)
		{
			t.removeClass("active"), $.each(e, function (t, e)
			{
				e.start < i && e.stop > i && e.$el.addClass("active")
			})
		})
	}
	function i()
	{
		function t()
		{
			window.clearInterval(e), c.removeClass("navigation-opened").removeClass("navigation-opened-done"), g.css("max-height", "")
		}
		if ($('[data-toggle="navigation"]').length)
		{
			var e, i;
			if ($('[data-toggle="navigation"]').on("click.navigation", function (t)
			{
				t.preventDefault()
			}), $('[data-toggle="navigation"]').on("click.navigation", function ()
			{
				window.clearInterval(e);
				var t = window.innerHeight - $(".fixed-header-inner").outerHeight() + "px";
				c.removeClass("navigation-opened-done"), c.hasClass("navigation-opened") ? (c.removeClass("navigation-opened"), g.css("max-height", "")) : (c.addClass("navigation-opened"), c.hasClass("fixed-mode") ? g.css("max-height", t) : g.css("max-height", "700px"), e = y(function ()
				{
					c.addClass("navigation-opened-done")
				}, f))
			}), !(window.Modernizr.touch || window.outerWidth <= window.mediumWidth))
			{
				var n, o, r, s = function ()
				{
					n = $('[data-toggle="navigation"]').offset().left + $('[data-toggle="navigation"]').outerWidth() + 20, o = $(".fixed-header-logo").offset().left + $(".fixed-header-logo").outerWidth() + 20, r = $(".header-navigation-wrap").offset().top
				};
				$('[data-toggle="navigation"]').on("mouseover.navigation", function (t)
				{
					t.preventDefault(), "arrow" !== t.originalEvent.target.className && (c.addClass("navigation-opened"), g.css("max-height", "700px"), window.clearInterval(e), window.clearInterval(i), e = y(function ()
					{
						c.addClass("navigation-opened-done")
					}, f))
				}), $(".header-navigation").on("mouseover.navigation", function ()
				{
					window.clearInterval(i)
				}), $(".fixed-header").on("mouseover.navigation", function (e)
				{
					e.preventDefault(), s(), e.pageY < r && (e.pageX < o || e.pageX > n) && (window.clearInterval(i), i = window.setTimeout(t, p))
				}), $(".fixed-header").on("click.navigation", function ()
				{
					c.hasClass("navigation-opened-done") && t()
				}), $(".fixed-header").on("mouseleave.navigation", t)
			}
		}
	}
	var n, o, r, s = window.App,
		a = !1,
		l = $($(".fixed-sub-header-holder").length ? ".fixed-sub-header-holder" : ".fixed-header-holder"),
		c = $("body"),
		u = $(".fixed-sub-header-holder").length ? !1 : !0,
		d = null,
		h = 600,
		p = 200,
		f = 400,
		g = $(".header-navigation");
	n = $(window).outerHeight() > 570 ? $("[data-active-main-header]").data("activeMainHeader") || h : h, $("[data-scroll=true]").on("click", function (t)
	{
		var e = this.href.split("#")[1],
			i = "#" + e,
			n = $(this).data("noHeader"),
			o = (void 0 === n ? r : 0) - 5,
			s = $(i);
		s.length && ($("html, body").animate(
		{
			scrollTop: s.offset().top - o
		}, 500, function ()
		{
			window.location.hash = i
		}), t.preventDefault())
	}), t(), $(window).on("load", t), s.events.resize.push(t), e();
	var m, v, y = function (t, e)
	{
		return e = e ? e : 600, window.setTimeout(t, u && window.Modernizr.cssanimations ? e : 1)
	},
		b = function ()
		{
			return c.hasClass("nav-sliding-out") || c.hasClass("nav-sliding-in")
		};
	$(window).on("scroll", function ()
	{
		if (!window.suppressFixedHeader)
		{
			var t = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
			a ? o >= t && !b() && (c.addClass("faster-sliding-navigation").addClass("nav-sliding-out").removeClass("navigation-opened-done").removeClass("navigation-opened"), g.css("max-height", ""), m = y(function ()
			{
				c.removeClass("faster-sliding-navigation").removeClass("fixed-mode").removeClass("nav-sliding-out"), a = !1
			})) : t > o && !b() && (g.css("max-height", ""), c.addClass("faster-sliding-navigation").removeClass("navigation-opened-done").removeClass("navigation-opened"), v = y(function ()
			{
				c.removeClass("faster-sliding-navigation").addClass("nav-sliding-in").addClass("fixed-mode"), a = !0
			}, 300), v = y(function ()
			{
				c.removeClass("nav-sliding-in")
			}, 900)), d && d(t)
		}
	}), i()
}), $(function ()
{
	"use strict";
	$(".lightbox").fancybox(
	{
		prevEffect: "none",
		nextEffect: "none",
		padding: 0,
		margin: [40, 20, 20, 20],
		helpers: {
			media: {
			},
			overlay: {
				css: {
					background: "rgba(255, 255, 255, 0.95)"
				}
			}
		},
		tpl: {
			wrap: '<div class="fancybox-wrap" tabIndex="-1"><h5></h5><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>'
		},
		afterLoad: function ()
		{
			var t = $(this.element).attr("rel");
			t && this.wrap.find("h5").text(t)
		}
	}), $(".video_lightbox").fancybox(
	{
		autosize: !1,
		type: "iframe",
		prevEffect: "none",
		nextEffect: "none",
		padding: 0,
		margin: 0,
		height: 504,
		width: 896,
		helpers: {
			media: {
			},
			overlay: {
				css: {
					background: "rgba(255, 255, 255, 0.95)"
				}
			}
		},
		tpl: {
			wrap: '<div class="fancybox-wrap" tabIndex="-1"><h5></h5><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>'
		}
	}), $('[data-lightbox="photo"]').fancybox(
	{
		hideOnContentClick: !0,
		padding: 0,
		helpers: {
			media: {
			},
			overlay: {
				css: {
					background: "rgba(255, 255, 255, 0.95)"
				}
			}
		},
		afterLoad: function ()
		{
			$(".fancybox-skin", this.wrap).css("padding-top", "50px")
		}
	}), $('[data-lightbox="inline"]').fancybox(
	{
		hideOnContentClick: !0,
		padding: 0,
		afterLoad: function ()
		{
			window.setTimeout(function ()
			{
				window.playOnlyThisVideo($(this.wrap).find("video"))
			}.bind(this), 100)
		}
	})
}), function (t)
{
	"use strict";
	var e = t.fancybox,
		i = function (e, i, n)
		{
			return n = n || "", "object" === t.type(n) && (n = t.param(n, !0)), t.each(i, function (t, i)
			{
				e = e.replace("$" + t, i || "")
			}), n.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + n), e
		};
	e.helpers.media =
	{
		defaults: {
			youtube: {
				matcher: /(youtube\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
				params: {
					autoplay: 1,
					autohide: 1,
					fs: 1,
					rel: 0,
					hd: 1,
					wmode: "opaque",
					enablejsapi: 1
				},
				type: "iframe",
				url: "//www.youtube.com/embed/$3"
			},
			vimeo: {
				matcher: /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
				params: {
					autoplay: 1,
					hd: 1,
					show_title: 1,
					show_byline: 1,
					show_portrait: 0,
					fullscreen: 1
				},
				type: "iframe",
				url: "//player.vimeo.com/video/$1"
			},
			metacafe: {
				matcher: /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
				params: {
					autoPlay: "yes"
				},
				type: "swf",
				url: function (e, i, n)
				{
					return n.swf.flashVars = "playerVars=" + t.param(i, !0), "//www.metacafe.com/fplayer/" + e[1] + "/.swf"
				}
			},
			dailymotion: {
				matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
				params: {
					additionalInfos: 0,
					autoStart: 1
				},
				type: "swf",
				url: "//www.dailymotion.com/swf/video/$1"
			},
			twitvid: {
				matcher: /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
				params: {
					autoplay: 0
				},
				type: "iframe",
				url: "//www.twitvid.com/embed.php?guid=$1"
			},
			twitpic: {
				matcher: /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
				type: "image",
				url: "//twitpic.com/show/full/$1/"
			},
			instagram: {
				matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
				type: "image",
				url: "//$1/p/$2/media/"
			},
			google_maps: {
				matcher: /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
				type: "iframe",
				url: function (t)
				{
					return "//maps.google." + t[1] + "/" + t[3] + t[4] + "&output=" + (t[4].indexOf("layer=c") > 0 ? "svembed" : "embed")
				}
			}
		},
		beforeLoad: function (e, n)
		{
			var o, r, s, a, l = n.href || "",
				c = !1;
			for (o in e) if (r = e[o], s = l.match(r.matcher))
			{
				c = r.type, a = t.extend(!0, {
				}, r.params, n[o] || (t.isPlainObject(e[o]) ? e[o].params : null)), l = "function" === t.type(r.url) ? r.url.call(this, s, a, n) : i(r.url, s, a);
				break
			}
			c && (n.href = l, n.type = c, n.autoHeight = !1)
		}
	}
}(jQuery), function ()
{
	"use strict";

	function t()
	{
		p = !0, o()
	}
	function e()
	{
		p = !1, n()
	}
	function i()
	{
		s($(this).prevAll(".customer-quotes-indicator").length)
	}
	function n()
	{
		
	}
	function o()
	{
		h && (h = !1, window.clearTimeout(d))
	}
	function r()
	{
		var t = l + 1;
		t > c && (t = 0), s(t)
	}
	function s(t)
	{
		o(), a.animate(
		{
			opacity: 0
		}, {
			duration: 200,
			complete: function ()
			{
				a.removeClass("customer-quote-is-active"), a = $(".customer-quote").eq(t), a.addClass("customer-quote-is-active"), l = t, $(".customer-quotes-indicator").removeClass("customer-quotes-indicator-is-active"), a.animate(
				{
					opacity: 1
				}, {
					duration: 200,
					complete: function ()
					{
						$(".customer-quotes-indicator").eq(l).addClass("customer-quotes-indicator-is-active"), p || n()
					}
				})
			}
		})
	}
	var a, l, c, u, d, h = !1,
		p = !1;
	window.initSlideshow = function ()
	{
		var n = $(".customer-quote");
		n.length < 2 || (u = n.eq(0), a = u, l = 0, c = n.length - 1, $(document).on("mouseenter", ".customer-quotes-inner", t), $(document).on("mouseleave", ".customer-quotes-inner", e), $(document).on("click", ".customer-quotes-indicator", i))
	}, window.resetSlideshow = function ()
	{
		o();
		var t = $(".customer-quote");
		t.removeClass("customer-quote-is-active"), t.eq(0).css("opacity", "1").addClass("customer-quote-is-active")
	}, $(document).on("ready", function ()
	{
		($(window).width() > window.smallWidth || $(".mobile-slideshow").length) && (window.initSlideshow(), window.onScrollToDo(".customer-quotes", n, "25%"))
	})
}(), function ()
{
	"use strict";

	function t()
	{
		r = $(".left-slide"), s = $(".active-slide"), a = $(".right-slide")
	}
	function e()
	{
		c.attr("href", "#" + r.attr("id")), l.attr("href", "#" + a.attr("id")), i()
	}
	function i()
	{
		$(".slideshow-controls .slide-caption").html($(".slide-caption", s).html())
	}
	function n()
	{
		r.removeClass("left-slide").addClass("right-slide"), s.removeClass("active-slide").addClass("left-slide"), a.removeClass("right-slide").addClass("active-slide"), t(), e()
	}
	function o()
	{
		r.removeClass("left-slide").addClass("active-slide"), s.removeClass("active-slide").addClass("right-slide"), a.removeClass("right-slide").addClass("left-slide"), t(), e()
	}
	var r, s, a, l, c;
	$(document).on("click", ".slideshow-controls-prev", function (t)
	{
		t.preventDefault(), o()
	}), $(document).on("click", ".slideshow-controls-next", function (t)
	{
		t.preventDefault(), n()
	}), $(document).on("click", ".slide", function (t)
	{
		t.preventDefault();
		var e = $(this);
		e.hasClass("left-slide") ? o() : e.hasClass("right-slide") && n()
	}), $(document).ready(function ()
	{
		t(), i(), l = $(".slideshow-controls-next"), c = $(".slideshow-controls-prev"), $(".slideshow-controls").addClass("slideshow-controls-active")
	})
}(), $(function ()
{
	"use strict";
	var t = window.App;
	t.fn.sticky =
	{
		settings: {
			init: !1,
			start: null,
			end: null,
			navOffset: 0,
			marginTop: 30,
			scrollingArea: 0,
			breakpoint: $("[data-sticky-breakpoint]").data("stickyBreakpoint") || window.mediumWidth,
			$wrapper: $("[data-sticky]"),
			$main: $(".main-content"),
			$body: $("body")
		},
		reset: function ()
		{
			var e = t.fn.sticky.settings;
			e.pippityOffset = 0, e.$wrapper.css("width", ""), e.$wrapper.css("top", ""), e.$body.removeClass("follow-fixed").removeClass("follow-sticked"), $(window).off("scroll.follow")
		},
		calculateSettings: function ()
		{
			var e = t.fn.sticky.settings;
			e.$wrapper.css("width", e.$wrapper.parent().width() + "px"), e.navOffset = $(".fixed-header").outerHeight(), e.start = e.$wrapper.offset().top - e.navOffset - e.marginTop, e.scrollingArea = e.$wrapper.outerHeight() + e.marginTop + e.navOffset, e.end = e.$main.offset().top + e.$main.outerHeight() - e.scrollingArea - 70
		},
		scroll: function ()
		{
			var e = t.fn.sticky.settings;
			$(window).on("scroll.follow", function ()
			{
				var t = window.scrollY || window.pageYOffset;
				t < e.start && e.$body.removeClass("follow-fixed").removeClass("follow-sticked"), t > e.start && (e.$body.addClass("follow-fixed").removeClass("follow-sticked"), e.$wrapper.css("top", e.navOffset + "px")), t > e.end && (e.$body.addClass("follow-sticked"), e.$wrapper.css("top", ""))
			})
		},
		init: function ()
		{
			var e = t.fn.sticky.settings;
			e.$wrapper.length && (t.fn.sticky.reset(), window.outerWidth < e.breakpoint || window.innerHeight < e.scrollingArea || (t.fn.sticky.calculateSettings(), t.fn.sticky.scroll(), $(window).trigger("scroll.follow")))
		}
	}, t.fn.sticky.init(), $(window).on("load.app", t.fn.sticky.init), t.events.resize.push(t.fn.sticky.init), window.setTimeout(t.fn.sticky.init, 1e3)
});