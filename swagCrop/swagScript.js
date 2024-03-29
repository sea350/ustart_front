!function (e, t) {
    "function" == typeof define && define.amd ? define(["exports"], t) : t("object" == typeof exports && "string" != typeof exports.nodeName ? exports : e.commonJsStrict = {})
}(this, function (e) {
    function t(e) {
        if (e in T)
            return e;
        for (var t = e[0].toUpperCase() + e.slice(1), n = D.length; n--;)
            if ((e = D[n] + t) in T)
                return e
    }
    function n(e, t) {
        e = e || {};
        for (var i in t)
            t[i] && t[i].constructor && t[i].constructor === Object ? (e[i] = e[i] || {},
                n(e[i], t[i])) : e[i] = t[i];
        return e
    }
    function i(e) {
        if ("createEvent" in document) {
            var t = document.createEvent("HTMLEvents");
            t.initEvent("change", !1, !0),
                e.dispatchEvent(t)
        } else
            e.fireEvent("onchange")
    }
    function o(e, t, n) {
        if ("string" == typeof t) {
            var i = t;
            (t = {})[i] = n
        }
        for (var o in t)
            e.style[o] = t[o]
    }
    function r(e, t) {
        e.classList ? e.classList.add(t) : e.className += " " + t
    }
    function a(e, t) {
        e.classList ? e.classList.remove(t) : e.className = e.className.replace(t, "")
    }
    function l(e) {
        return parseInt(e, 10)
    }
    function s(e, t, n) {
        var i = t || new Image;
        return i.style.opacity = 0,
            new Promise(function (t) {
                function o() {
                    setTimeout(function () {
                        t(i)
                    }, 1)
                }
                i.src !== e ? (i.exifdata = null,
                    i.removeAttribute("crossOrigin"),
                    e.match(/^https?:\/\/|^\/\//) && i.setAttribute("crossOrigin", "anonymous"),
                    i.onload = function () {
                        n ? EXIF.getData(i, function () {
                            o()
                        }) : o()
                    }
                    ,
                    i.src = e) : o()
            }
            )
    }
    function u(e) {
        var t = e.naturalWidth
            , n = e.naturalHeight;
        if (e.exifdata && e.exifdata.Orientation >= 5) {
            var i = t;
            t = n,
                n = i
        }
        return {
            width: t,
            height: n
        }
    }
    function c(e) {
        return e.exifdata.Orientation
    }
    function h(e, t, n) {
        var i = t.width
            , o = t.height
            , r = e.getContext("2d");
        switch (e.width = t.width,
        e.height = t.height,
        r.save(),
        n) {
            case 2:
                r.translate(i, 0),
                    r.scale(-1, 1);
                break;
            case 3:
                r.translate(i, o),
                    r.rotate(180 * Math.PI / 180);
                break;
            case 4:
                r.translate(0, o),
                    r.scale(1, -1);
                break;
            case 5:
                e.width = o,
                    e.height = i,
                    r.rotate(90 * Math.PI / 180),
                    r.scale(1, -1);
                break;
            case 6:
                e.width = o,
                    e.height = i,
                    r.rotate(90 * Math.PI / 180),
                    r.translate(0, -o);
                break;
            case 7:
                e.width = o,
                    e.height = i,
                    r.rotate(-90 * Math.PI / 180),
                    r.translate(-i, o),
                    r.scale(1, -1);
                break;
            case 8:
                e.width = o,
                    e.height = i,
                    r.translate(0, i),
                    r.rotate(-90 * Math.PI / 180)
        }
        r.drawImage(t, 0, 0, i, o),
            r.restore()
    }
    function p() {
        var e, t, n, i, a, l = this, s = l.options.viewport.type ? "cr-vp-" + l.options.viewport.type : null;
        l.options.useCanvas = l.options.enableOrientation || d.call(l),
            l.data = {},
            l.elements = {},
            e = l.elements.boundary = document.createElement("div"),
            t = l.elements.viewport = document.createElement("div"),
            l.elements.img = document.createElement("img"),
            n = l.elements.overlay = document.createElement("div"),
            l.options.useCanvas ? (l.elements.canvas = document.createElement("canvas"),
                l.elements.preview = l.elements.canvas) : l.elements.preview = l.elements.img,
            r(e, "cr-boundary"),
            i = l.options.boundary.width,
            a = l.options.boundary.height,
            o(e, {
                width: i + (isNaN(i) ? "" : "px"),
                height: a + (isNaN(a) ? "" : "px")
            }),
            r(t, "cr-viewport"),
            s && r(t, s),
            o(t, {
                width: l.options.viewport.width + "px",
                height: l.options.viewport.height + "px"
            }),
            t.setAttribute("tabindex", 0),
            r(l.elements.preview, "cr-image"),
            r(n, "cr-overlay"),
            l.element.appendChild(e),
            e.appendChild(l.elements.preview),
            e.appendChild(t),
            e.appendChild(n),
            r(l.element, "croppie-container"),
            l.options.customClass && r(l.element, l.options.customClass),
            b.call(this),
            l.options.enableZoom && v.call(l),
            l.options.enableResize && m.call(l)
    }
    function d() {
        return this.options.enableExif && window.EXIF
    }
    function m() {
        function e(e) {
            if ((void 0 === e.button || 0 === e.button) && (e.preventDefault(),
                !m)) {
                var o = p.elements.overlay.getBoundingClientRect();
                if (m = !0,
                    a = e.pageX,
                    l = e.pageY,
                    i = -1 !== e.currentTarget.className.indexOf("vertical") ? "v" : "h",
                    s = o.width,
                    u = o.height,
                    e.touches) {
                    var r = e.touches[0];
                    a = r.pageX,
                        l = r.pageY
                }
                window.addEventListener("mousemove", t),
                    window.addEventListener("touchmove", t),
                    window.addEventListener("mouseup", n),
                    window.addEventListener("touchend", n),
                    document.body.style[A] = "none"
            }
        }
        function t(e) {
            var t = e.pageX
                , n = e.pageY;
            if (e.preventDefault(),
                e.touches) {
                var r = e.touches[0];
                t = r.pageX,
                    n = r.pageY
            }
            var c = t - a
                , h = n - l
                , m = p.options.viewport.height + h
                , v = p.options.viewport.width + c;
            "v" === i && m >= f && m <= u ? (o(d, {
                height: m + "px"
            }),
                p.options.boundary.height += h,
                o(p.elements.boundary, {
                    height: p.options.boundary.height + "px"
                }),
                p.options.viewport.height += h,
                o(p.elements.viewport, {
                    height: p.options.viewport.height + "px"
                })) : "h" === i && v >= f && v <= s && (o(d, {
                    width: v + "px"
                }),
                    p.options.boundary.width += c,
                    o(p.elements.boundary, {
                        width: p.options.boundary.width + "px"
                    }),
                    p.options.viewport.width += c,
                    o(p.elements.viewport, {
                        width: p.options.viewport.width + "px"
                    })),
                x.call(p),
                L.call(p),
                y.call(p),
                C.call(p),
                l = n,
                a = t
        }
        function n() {
            m = !1,
                window.removeEventListener("mousemove", t),
                window.removeEventListener("touchmove", t),
                window.removeEventListener("mouseup", n),
                window.removeEventListener("touchend", n),
                document.body.style[A] = ""
        }
        var i, a, l, s, u, c, h, p = this, d = document.createElement("div"), m = !1, f = 50;
        r(d, "cr-resizer"),
            o(d, {
                width: this.options.viewport.width + "px",
                height: this.options.viewport.height + "px"
            }),
            this.options.resizeControls.height && (r(c = document.createElement("div"), "cr-resizer-vertical"),
                d.appendChild(c)),
            this.options.resizeControls.width && (r(h = document.createElement("div"), "cr-resizer-horisontal"),
                d.appendChild(h)),
            c && c.addEventListener("mousedown", e),
            h && h.addEventListener("mousedown", e),
            this.elements.boundary.appendChild(d)
    }
    function f(e) {
        if (this.options.enableZoom) {
            var t = this.elements.zoomer
                , n = X(e, 4);
            t.value = Math.max(t.min, Math.min(t.max, n))
        }
    }
    function v() {
        function e() {
            g.call(n, {
                value: parseFloat(o.value),
                origin: new K(n.elements.preview),
                viewportRect: n.elements.viewport.getBoundingClientRect(),
                transform: U.parse(n.elements.preview)
            })
        }
        function t(t) {
            var i, o;
            i = t.wheelDelta ? t.wheelDelta / 1200 : t.deltaY ? t.deltaY / 1060 : t.detail ? t.detail / -60 : 0,
                o = n._currentZoom + i * n._currentZoom,
                t.preventDefault(),
                f.call(n, o),
                e.call(n)
        }
        var n = this
            , i = n.elements.zoomerWrap = document.createElement("div")
            , o = n.elements.zoomer = document.createElement("input");
        r(i, "cr-slider-wrap"),
            r(o, "cr-slider"),
            o.type = "range",
            o.step = "0.0001",
            o.value = 1,
            o.style.display = n.options.showZoomer ? "" : "none",
            n.element.appendChild(i),
            i.appendChild(o),
            n._currentZoom = 1,
            n.elements.zoomer.addEventListener("input", e),
            n.elements.zoomer.addEventListener("change", e),
            n.options.mouseWheelZoom && (n.elements.boundary.addEventListener("mousewheel", t),
                n.elements.boundary.addEventListener("DOMMouseScroll", t))
    }
    function g(e) {
        function t() {
            var e = {};
            e[P] = i.toString(),
                e[N] = a.toString(),
                o(n.elements.preview, e)
        }
        var n = this
            , i = e ? e.transform : U.parse(n.elements.preview)
            , r = e ? e.viewportRect : n.elements.viewport.getBoundingClientRect()
            , a = e ? e.origin : new K(n.elements.preview);
        if (n._currentZoom = e ? e.value : n._currentZoom,
            i.scale = n._currentZoom,
            t(),
            n.options.enforceBoundary) {
            var l = w.call(n, r)
                , s = l.translate
                , u = l.origin;
            i.x >= s.maxX && (a.x = u.minX,
                i.x = s.maxX),
                i.x <= s.minX && (a.x = u.maxX,
                    i.x = s.minX),
                i.y >= s.maxY && (a.y = u.minY,
                    i.y = s.maxY),
                i.y <= s.minY && (a.y = u.maxY,
                    i.y = s.minY)
        }
        t(),
            $.call(n),
            C.call(n)
    }
    function w(e) {
        var t = this
            , n = t._currentZoom
            , i = e.width
            , o = e.height
            , r = t.elements.boundary.clientWidth / 2
            , a = t.elements.boundary.clientHeight / 2
            , l = t.elements.preview.getBoundingClientRect()
            , s = l.width
            , u = l.height
            , c = i / 2
            , h = o / 2
            , p = -1 * (c / n - r)
            , d = -1 * (h / n - a)
            , m = 1 / n * c
            , f = 1 / n * h;
        return {
            translate: {
                maxX: p,
                minX: p - (s * (1 / n) - i * (1 / n)),
                maxY: d,
                minY: d - (u * (1 / n) - o * (1 / n))
            },
            origin: {
                maxX: s * (1 / n) - m,
                minX: m,
                maxY: u * (1 / n) - f,
                minY: f
            }
        }
    }
    function y() {
        var e = this
            , t = e._currentZoom
            , n = e.elements.preview.getBoundingClientRect()
            , i = e.elements.viewport.getBoundingClientRect()
            , r = U.parse(e.elements.preview.style[P])
            , a = new K(e.elements.preview)
            , l = i.top - n.top + i.height / 2
            , s = i.left - n.left + i.width / 2
            , u = {}
            , c = {};
        u.y = l / t,
            u.x = s / t,
            c.y = (u.y - a.y) * (1 - t),
            c.x = (u.x - a.x) * (1 - t),
            r.x -= c.x,
            r.y -= c.y;
        var h = {};
        h[N] = u.x + "px " + u.y + "px",
            h[P] = r.toString(),
            o(e.elements.preview, h)
    }
    function b() {
        function e(e, t) {
            var n = p.elements.preview.getBoundingClientRect()
                , i = h.y + t
                , o = h.x + e;
            p.options.enforceBoundary ? (c.top > n.top + t && c.bottom < n.bottom + t && (h.y = i),
                c.left > n.left + e && c.right < n.right + e && (h.x = o)) : (h.y = i,
                    h.x = o)
        }
        function t(t) {
            var n = {};
            e(t[0], t[1]),
                n[P] = h.toString(),
                o(p.elements.preview, n),
                x.call(p),
                document.body.style[A] = "",
                y.call(p),
                C.call(p),
                u = 0
        }
        function n(e) {
            if ((void 0 === e.button || 0 === e.button) && (e.preventDefault(),
                !d)) {
                if (d = !0,
                    l = e.pageX,
                    s = e.pageY,
                    e.touches) {
                    var t = e.touches[0];
                    l = t.pageX,
                        s = t.pageY
                }
                h = U.parse(p.elements.preview),
                    window.addEventListener("mousemove", r),
                    window.addEventListener("touchmove", r),
                    window.addEventListener("mouseup", a),
                    window.addEventListener("touchend", a),
                    document.body.style[A] = "none",
                    c = p.elements.viewport.getBoundingClientRect()
            }
        }
        function r(t) {
            t.preventDefault();
            var n = t.pageX
                , r = t.pageY;
            if (t.touches) {
                var a = t.touches[0];
                n = a.pageX,
                    r = a.pageY
            }
            var c = n - l
                , d = r - s
                , m = {};
            if ("touchmove" == t.type && t.touches.length > 1) {
                var v = t.touches[0]
                    , g = t.touches[1]
                    , w = Math.sqrt((v.pageX - g.pageX) * (v.pageX - g.pageX) + (v.pageY - g.pageY) * (v.pageY - g.pageY));
                u || (u = w / p._currentZoom);
                var y = w / u;
                return f.call(p, y),
                    void i(p.elements.zoomer)
            }
            e(c, d),
                m[P] = h.toString(),
                o(p.elements.preview, m),
                x.call(p),
                s = r,
                l = n
        }
        function a() {
            d = !1,
                window.removeEventListener("mousemove", r),
                window.removeEventListener("touchmove", r),
                window.removeEventListener("mouseup", a),
                window.removeEventListener("touchend", a),
                document.body.style[A] = "",
                y.call(p),
                C.call(p),
                u = 0
        }
        var l, s, u, c, h, p = this, d = !1;
        p.elements.overlay.addEventListener("mousedown", n),
            p.elements.viewport.addEventListener("keydown", function (e) {
                var n = 37
                    , i = 38
                    , o = 39
                    , r = 40;
                if (!e.shiftKey || e.keyCode != i && e.keyCode != r) {
                    if (p.options.enableKeyMovement && e.keyCode >= 37 && e.keyCode <= 40) {
                        e.preventDefault();
                        var a = function (e) {
                            switch (e) {
                                case n:
                                    return [1, 0];
                                case i:
                                    return [0, 1];
                                case o:
                                    return [-1, 0];
                                case r:
                                    return [0, -1]
                            }
                        }(e.keyCode);
                        h = U.parse(p.elements.preview),
                            document.body.style[A] = "none",
                            c = p.elements.viewport.getBoundingClientRect(),
                            t(a)
                    }
                } else {
                    var l = 0;
                    l = e.keyCode == i ? parseFloat(p.elements.zoomer.value, 10) + parseFloat(p.elements.zoomer.step, 10) : parseFloat(p.elements.zoomer.value, 10) - parseFloat(p.elements.zoomer.step, 10),
                        p.setZoom(l)
                }
            }),
            p.elements.overlay.addEventListener("touchstart", n)
    }
    function x() {
        var e = this
            , t = e.elements.boundary.getBoundingClientRect()
            , n = e.elements.preview.getBoundingClientRect();
        o(e.elements.overlay, {
            width: n.width + "px",
            height: n.height + "px",
            top: n.top - t.top + "px",
            left: n.left - t.left + "px"
        })
    }
    function C() {
        var e = this
            , t = e.get();
        if (E.call(e))
            if (e.options.update.call(e, t),
                e.$ && "undefined" == typeof Prototype)
                e.$(e.element).trigger("update", t);
            else {
                var n;
                window.CustomEvent ? n = new CustomEvent("update", {
                    detail: t
                }) : (n = document.createEvent("CustomEvent")).initCustomEvent("update", !0, !0, t),
                    e.element.dispatchEvent(n)
            }
    }
    function E() {
        return this.elements.preview.offsetHeight > 0 && this.elements.preview.offsetWidth > 0
    }
    function _() {
        var e = this
            , t = {}
            , n = e.elements.preview
            , i = e.elements.preview.getBoundingClientRect()
            , r = new U(0, 0, 1)
            , a = new K;
        E.call(e) && !e.data.bound && (e.data.bound = !0,
            t[P] = r.toString(),
            t[N] = a.toString(),
            t.opacity = 1,
            o(n, t),
            e._originalImageWidth = i.width,
            e._originalImageHeight = i.height,
            e.options.enableZoom ? L.call(e, !0) : e._currentZoom = 1,
            r.scale = e._currentZoom,
            t[P] = r.toString(),
            o(n, t),
            e.data.points.length ? B.call(e, e.data.points) : R.call(e),
            y.call(e),
            x.call(e))
    }
    function L(e) {
        var t, n, o, r, a = this, l = 0, s = 1.5, u = a.elements.zoomer, c = parseFloat(u.value), h = a.elements.boundary.getBoundingClientRect(), p = a.elements.preview.getBoundingClientRect(), d = a.elements.viewport.getBoundingClientRect();
        a.options.enforceBoundary && (o = d.width / (e ? p.width : p.width / c),
            r = d.height / (e ? p.height : p.height / c),
            l = Math.max(o, r)),
            l >= s && (s = l + 1),
            u.min = X(l, 4),
            u.max = X(s, 4),
            e && (n = Math.max(h.width / p.width, h.height / p.height),
                t = null !== a.data.boundZoom ? a.data.boundZoom : n,
                f.call(a, t)),
            i(u)
    }
    function B(e) {
        if (4 != e.length)
            throw "Croppie - Invalid number of points supplied: " + e;
        var t = this
            , n = e[2] - e[0]
            , i = t.elements.viewport.getBoundingClientRect()
            , r = t.elements.boundary.getBoundingClientRect()
            , a = {
                left: i.left - r.left,
                top: i.top - r.top
            }
            , l = i.width / n
            , s = e[1]
            , u = e[0]
            , c = -1 * e[1] + a.top
            , h = -1 * e[0] + a.left
            , p = {};
        p[N] = u + "px " + s + "px",
            p[P] = new U(h, c, l).toString(),
            o(t.elements.preview, p),
            f.call(t, l),
            t._currentZoom = l
    }
    function R() {
        var e = this
            , t = e.elements.preview.getBoundingClientRect()
            , n = e.elements.viewport.getBoundingClientRect()
            , i = e.elements.boundary.getBoundingClientRect()
            , r = n.left - i.left
            , a = n.top - i.top
            , l = r - (t.width - n.width) / 2
            , s = a - (t.height - n.height) / 2
            , u = new U(l, s, e._currentZoom);
        o(e.elements.preview, P, u.toString())
    }
    function I(e) {
        var t = this
            , n = t.elements.canvas
            , i = t.elements.img
            , o = n.getContext("2d")
            , r = d.call(t)
            , e = t.options.enableOrientation && e;
        o.clearRect(0, 0, n.width, n.height),
            n.width = i.width,
            n.height = i.height,
            r && !e ? h(n, i, l(c(i) || 0, 10)) : e && h(n, i, e)
    }
    function M(e) {
        var t = this
            , n = e.points
            , i = l(n[0])
            , o = l(n[1])
            , r = l(n[2])
            , a = l(n[3])
            , s = r - i
            , u = a - o
            , c = e.circle
            , h = document.createElement("canvas")
            , p = h.getContext("2d")
            , d = s
            , m = u
            , f = 0
            , v = 0
            , g = d
            , w = m
            , y = 1;
        return e.outputWidth && e.outputHeight && (g = e.outputWidth,
            w = e.outputHeight,
            y = g / d),
            h.width = g,
            h.height = w,
            e.backgroundColor && (p.fillStyle = e.backgroundColor,
                p.fillRect(0, 0, d, m)),
            t.options.enforceBoundary || (i < 0 && (f = Math.abs(i),
                i = 0),
                o < 0 && (v = Math.abs(o),
                    o = 0),
                r > t._originalImageWidth && (d = s = t._originalImageWidth - i),
                a > t._originalImageHeight && (m = u = t._originalImageHeight - o)),
            1 !== y && (f *= y,
                v *= y,
                d *= y,
                m *= y),
            p.drawImage(this.elements.preview, i, o, Math.min(s, t._originalImageWidth), Math.min(u, t._originalImageHeight), f, v, d, m),
            c && (p.fillStyle = "#fff",
                p.globalCompositeOperation = "destination-in",
                p.beginPath(),
                p.arc(d / 2, m / 2, d / 2, 0, 2 * Math.PI, !0),
                p.closePath(),
                p.fill()),
            h
    }
    function Z(e) {
        var t = e.points
            , n = document.createElement("div")
            , i = document.createElement("img")
            , a = t[2] - t[0]
            , l = t[3] - t[1];
        return r(n, "croppie-result"),
            n.appendChild(i),
            o(i, {
                left: -1 * t[0] + "px",
                top: -1 * t[1] + "px"
            }),
            i.src = e.url,
            o(n, {
                width: a + "px",
                height: l + "px"
            }),
            n
    }
    function z(e) {
        return M.call(this, e).toDataURL(e.format, e.quality)
    }
    function Y(e) {
        var t = this;
        return new Promise(function (n, i) {
            M.call(t, e).toBlob(function (e) {
                n(e)
            }, e.format, e.quality)
        }
        )
    }
    function W(e, t) {
        var n, i = this, o = [], r = null, a = d.call(i);
        if ("string" == typeof e)
            n = e,
                e = {};
        else if (Array.isArray(e))
            o = e.slice();
        else {
            if (void 0 === e && i.data.url)
                return _.call(i),
                    C.call(i),
                    null;
            n = e.url,
                o = e.points || [],
                r = void 0 === e.zoom ? null : e.zoom
        }
        return i.data.bound = !1,
            i.data.url = n || i.data.url,
            i.data.boundZoom = r,
            s(n, i.elements.img, a).then(function (n) {
                if (o.length)
                    i.options.relative && (o = [o[0] * n.naturalWidth / 100, o[1] * n.naturalHeight / 100, o[2] * n.naturalWidth / 100, o[3] * n.naturalHeight / 100]);
                else {
                    var r, a, l = u(n), s = i.elements.viewport.getBoundingClientRect(), c = s.width / s.height;
                    l.width / l.height > c ? r = (a = l.height) * c : a = (r = l.width) / c;
                    var h = (l.width - r) / 2
                        , p = (l.height - a) / 2
                        , d = h + r
                        , m = p + a;
                    i.data.points = [h, p, d, m]
                }
                i.data.points = o.map(function (e) {
                    return parseFloat(e)
                }),
                    i.options.useCanvas && I.call(i, e.orientation || 1),
                    _.call(i),
                    C.call(i),
                    t && t()
            })
    }
    function X(e, t) {
        return parseFloat(e).toFixed(t || 0)
    }
    function F() {
        var e = this
            , t = e.elements.preview.getBoundingClientRect()
            , n = e.elements.viewport.getBoundingClientRect()
            , i = n.left - t.left
            , o = n.top - t.top
            , r = (n.width - e.elements.viewport.offsetWidth) / 2
            , a = (n.height - e.elements.viewport.offsetHeight) / 2
            , l = i + e.elements.viewport.offsetWidth + r
            , s = o + e.elements.viewport.offsetHeight + a
            , u = e._currentZoom;
        (u === 1 / 0 || isNaN(u)) && (u = 1);
        var c = e.options.enforceBoundary ? 0 : Number.NEGATIVE_INFINITY;
        return i = Math.max(c, i / u),
            o = Math.max(c, o / u),
            l = Math.max(c, l / u),
            s = Math.max(c, s / u),
            {
                points: [X(i), X(o), X(l), X(s)],
                zoom: u
            }
    }
    function H(e) {
        var t = this
            , i = F.call(t)
            , o = n(Q, n({}, e))
            , r = "string" == typeof e ? e : o.type || "base64"
            , a = o.size || "viewport"
            , l = o.format
            , s = o.quality
            , u = o.backgroundColor
            , c = "boolean" == typeof o.circle ? o.circle : "circle" === t.options.viewport.type
            , h = t.elements.viewport.getBoundingClientRect()
            , p = h.width / h.height;
        return "viewport" === a ? (i.outputWidth = h.width,
            i.outputHeight = h.height) : "object" == typeof a && (a.width && a.height ? (i.outputWidth = a.width,
                i.outputHeight = a.height) : a.width ? (i.outputWidth = a.width,
                    i.outputHeight = a.width / p) : a.height && (i.outputWidth = a.height * p,
                        i.outputHeight = a.height)),
            G.indexOf(l) > -1 && (i.format = "image/" + l,
                i.quality = s),
            i.circle = c,
            i.url = t.data.url,
            i.backgroundColor = u,
            new Promise(function (e, n) {
                switch (r.toLowerCase()) {
                    case "rawcanvas":
                        e(M.call(t, i));
                        break;
                    case "canvas":
                    case "base64":
                        e(z.call(t, i));
                        break;
                    case "blob":
                        Y.call(t, i).then(e);
                        break;
                    default:
                        e(Z.call(t, i))
                }
            }
            )
    }
    function k() {
        _.call(this)
    }
    function j(e) {
        if (!this.options.useCanvas)
            throw "Croppie: Cannot rotate without enableOrientation";
        var t = this
            , n = t.elements.canvas
            , i = document.createElement("canvas")
            , o = 1;
        i.width = n.width,
            i.height = n.height,
            i.getContext("2d").drawImage(n, 0, 0),
            90 !== e && -270 !== e || (o = 6),
            -90 !== e && 270 !== e || (o = 8),
            180 !== e && -180 !== e || (o = 3),
            h(n, i, o),
            g.call(t),
            i = null
    }
    function S() {
        var e = this;
        e.element.removeChild(e.elements.boundary),
            a(e.element, "croppie-container"),
            e.options.enableZoom && e.element.removeChild(e.elements.zoomerWrap),
            delete e.elements
    }
    function O(e, t) {
        if (this.element = e,
            this.options = n(n({}, O.defaults), t),
            "img" === this.element.tagName.toLowerCase()) {
            var i = this.element;
            r(i, "cr-original-image");
            var o = document.createElement("div");
            this.element.parentNode.appendChild(o),
                o.appendChild(i),
                this.element = o,
                this.options.url = this.options.url || i.src
        }
        if (p.call(this),
            this.options.url) {
            var a = {
                url: this.options.url,
                points: this.options.points
            };
            delete this.options.url,
                delete this.options.points,
                W.call(this, a)
        }
    }
    "function" != typeof Promise && function (e) {
        function t(e, t) {
            return function () {
                e.apply(t, arguments)
            }
        }
        function n(e) {
            if ("object" != typeof this)
                throw new TypeError("Promises must be constructed via new");
            if ("function" != typeof e)
                throw new TypeError("not a function");
            this._state = null,
                this._value = null,
                this._deferreds = [],
                s(e, t(o, this), t(r, this))
        }
        function i(e) {
            var t = this;
            return null === this._state ? void this._deferreds.push(e) : void c(function () {
                var n = t._state ? e.onFulfilled : e.onRejected;
                if (null !== n) {
                    var i;
                    try {
                        i = n(t._value)
                    } catch (t) {
                        return void e.reject(t)
                    }
                    e.resolve(i)
                } else
                    (t._state ? e.resolve : e.reject)(t._value)
            })
        }
        function o(e) {
            try {
                if (e === this)
                    throw new TypeError("A promise cannot be resolved with itself.");
                if (e && ("object" == typeof e || "function" == typeof e)) {
                    var n = e.then;
                    if ("function" == typeof n)
                        return void s(t(n, e), t(o, this), t(r, this))
                }
                this._state = !0,
                    this._value = e,
                    a.call(this)
            } catch (e) {
                r.call(this, e)
            }
        }
        function r(e) {
            this._state = !1,
                this._value = e,
                a.call(this)
        }
        function a() {
            for (var e = 0, t = this._deferreds.length; t > e; e++)
                i.call(this, this._deferreds[e]);
            this._deferreds = null
        }
        function l(e, t, n, i) {
            this.onFulfilled = "function" == typeof e ? e : null,
                this.onRejected = "function" == typeof t ? t : null,
                this.resolve = n,
                this.reject = i
        }
        function s(e, t, n) {
            var i = !1;
            try {
                e(function (e) {
                    i || (i = !0,
                        t(e))
                }, function (e) {
                    i || (i = !0,
                        n(e))
                })
            } catch (e) {
                if (i)
                    return;
                i = !0,
                    n(e)
            }
        }
        var u = setTimeout
            , c = "function" == typeof setImmediate && setImmediate || function (e) {
                u(e, 1)
            }
            , h = Array.isArray || function (e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            }
            ;
        n.prototype.catch = function (e) {
            return this.then(null, e)
        }
            ,
            n.prototype.then = function (e, t) {
                var o = this;
                return new n(function (n, r) {
                    i.call(o, new l(e, t, n, r))
                }
                )
            }
            ,
            n.all = function () {
                var e = Array.prototype.slice.call(1 === arguments.length && h(arguments[0]) ? arguments[0] : arguments);
                return new n(function (t, n) {
                    function i(r, a) {
                        try {
                            if (a && ("object" == typeof a || "function" == typeof a)) {
                                var l = a.then;
                                if ("function" == typeof l)
                                    return void l.call(a, function (e) {
                                        i(r, e)
                                    }, n)
                            }
                            e[r] = a,
                                0 == --o && t(e)
                        } catch (e) {
                            n(e)
                        }
                    }
                    if (0 === e.length)
                        return t([]);
                    for (var o = e.length, r = 0; r < e.length; r++)
                        i(r, e[r])
                }
                )
            }
            ,
            n.resolve = function (e) {
                return e && "object" == typeof e && e.constructor === n ? e : new n(function (t) {
                    t(e)
                }
                )
            }
            ,
            n.reject = function (e) {
                return new n(function (t, n) {
                    n(e)
                }
                )
            }
            ,
            n.race = function (e) {
                return new n(function (t, n) {
                    for (var i = 0, o = e.length; o > i; i++)
                        e[i].then(t, n)
                }
                )
            }
            ,
            n._setImmediateFn = function (e) {
                c = e
            }
            ,
            "undefined" != typeof module && module.exports ? module.exports = n : e.Promise || (e.Promise = n)
    }(this),
        "function" != typeof window.CustomEvent && function () {
            function e(e, t) {
                t = t || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: void 0
                };
                var n = document.createEvent("CustomEvent");
                return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail),
                    n
            }
            e.prototype = window.Event.prototype,
                window.CustomEvent = e
        }(),
        HTMLCanvasElement.prototype.toBlob || Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
            value: function (e, t, n) {
                for (var i = atob(this.toDataURL(t, n).split(",")[1]), o = i.length, r = new Uint8Array(o), a = 0; a < o; a++)
                    r[a] = i.charCodeAt(a);
                e(new Blob([r], {
                    type: t || "image/png"
                }))
            }
        });
    var N, P, A, D = ["Webkit", "Moz", "ms"], T = document.createElement("div").style;
    P = t("transform"),
        N = t("transformOrigin"),
        A = t("userSelect");
    var q = {
        translate3d: {
            suffix: ", 0px"
        },
        translate: {
            suffix: ""
        }
    }
        , U = function (e, t, n) {
            this.x = parseFloat(e),
                this.y = parseFloat(t),
                this.scale = parseFloat(n)
        };
    U.parse = function (e) {
        return e.style ? U.parse(e.style[P]) : e.indexOf("matrix") > -1 || e.indexOf("none") > -1 ? U.fromMatrix(e) : U.fromString(e)
    }
        ,
        U.fromMatrix = function (e) {
            var t = e.substring(7).split(",");
            return t.length && "none" !== e || (t = [1, 0, 0, 1, 0, 0]),
                new U(l(t[4]), l(t[5]), parseFloat(t[0]))
        }
        ,
        U.fromString = function (e) {
            var t = e.split(") ")
                , n = t[0].substring(O.globals.translate.length + 1).split(",")
                , i = t.length > 1 ? t[1].substring(6) : 1
                , o = n.length > 1 ? n[0] : 0
                , r = n.length > 1 ? n[1] : 0;
            return new U(o, r, i)
        }
        ,
        U.prototype.toString = function () {
            var e = q[O.globals.translate].suffix || "";
            return O.globals.translate + "(" + this.x + "px, " + this.y + "px" + e + ") scale(" + this.scale + ")"
        }
        ;
    var K = function (e) {
        if (!e || !e.style[N])
            return this.x = 0,
                void (this.y = 0);
        var t = e.style[N].split(" ");
        this.x = parseFloat(t[0]),
            this.y = parseFloat(t[1])
    };
    K.prototype.toString = function () {
        return this.x + "px " + this.y + "px"
    }
        ;
    var $ = function (e, t, n) {
        var i;
        return function () {
            var o = this
                , r = arguments
                , a = n && !i;
            clearTimeout(i),
                i = setTimeout(function () {
                    i = null,
                        n || e.apply(o, r)
                }, t),
                a && e.apply(o, r)
        }
    }(x, 500)
        , Q = {
            type: "canvas",
            format: "png",
            quality: 1
        }
        , G = ["jpeg", "webp", "png"];
    if (window.jQuery) {
        var J = window.jQuery;
        J.fn.croppie = function (e) {
            if ("string" === typeof e) {
                var t = Array.prototype.slice.call(arguments, 1)
                    , n = J(this).data("croppie");
                return "get" === e ? n.get() : "result" === e ? n.result.apply(n, t) : "bind" === e ? n.bind.apply(n, t) : this.each(function () {
                    var n = J(this).data("croppie");
                    if (n) {
                        var i = n[e];
                        if (!J.isFunction(i))
                            throw "Croppie " + e + " method not found";
                        i.apply(n, t),
                            "destroy" === e && J(this).removeData("croppie")
                    }
                })
            }
            return this.each(function () {
                var t = new O(this, e);
                t.$ = J,
                    J(this).data("croppie", t)
            })
        }
    }
    O.defaults = {
        viewport: {
            width: 100,
            height: 100,
            type: "square"
        },
        boundary: {},
        orientationControls: {
            enabled: !0,
            leftClass: "",
            rightClass: ""
        },
        resizeControls: {
            width: !0,
            height: !0
        },
        customClass: "",
        showZoomer: !0,
        enableZoom: !0,
        enableResize: !1,
        mouseWheelZoom: !0,
        enableExif: !1,
        enforceBoundary: !0,
        enableOrientation: !1,
        enableKeyMovement: !0,
        update: function () { }
    },
        O.globals = {
            translate: "translate3d"
        },
        n(O.prototype, {
            bind: function (e, t) {
                return W.call(this, e, t)
            },
            get: function () {
                var e = F.call(this)
                    , t = e.points;
                return this.options.relative && (t[0] /= this.elements.img.naturalWidth / 100,
                    t[1] /= this.elements.img.naturalHeight / 100,
                    t[2] /= this.elements.img.naturalWidth / 100,
                    t[3] /= this.elements.img.naturalHeight / 100),
                    e
            },
            result: function (e) {
                return H.call(this, e)
            },
            refresh: function () {
                return k.call(this)
            },
            setZoom: function (e) {
                f.call(this, e),
                    i(this.elements.zoomer)
            },
            rotate: function (e) {
                j.call(this, e)
            },
            destroy: function () {
                return S.call(this)
            }
        }),
        e.Croppie = window.Croppie = O,
        "object" == typeof module && module.exports && (module.exports = O)
});

var cropper;
var vanCrop;
document.addEventListener("DOMContentLoaded", function () {
    cropper = document.getElementById("theCropper");
    vanCrop = new Croppie(cropper, {
        viewport: {
            width: 200,
            height: 200
        }
    });
});
function useImageUrl(theUrl) {
    vanCrop.bind({
        url: theUrl
    });
}
function getResult() {
    vanCrop.result({ type: 'rawcanvas' }).then(function (can) {
        document.getElementById("croppie-cont").style.display = 'none';
        document.getElementById("canvasToFill").appendChild(can);
    });
}