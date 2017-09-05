! function () {
    function e(e, o) {
        return n[e] || (r[e] = {
            exports: {},
            loaded: !1
        }, n[e] = !0, 0 === e ? require.main = r[0] : r[e].parent = r[o], t[e](r[e], r[e].exports), r[e].loaded = !0), r[e].exports
    }
    var t = {},
        r = {},
        n = {};
    t[0] = function (t, r) {
        var n = e(1, 0);
        n.setLogLevel(n.levels.Warn);
        var o = e(2, 0);
        const i = "0.5.0";
        var s = s || {};
        return s.utilities = s.utilities || {}, s.configuration = s.configuration || {}, s.configuration.logLevels = n.levels, s.configuration.setLogLevel = n.setLogLevel, s.CredentialAuthentication = e(3, 0), s.TokenAuthentication = e(4, 0), s.GoogleAuthentication = e(5, 0), s.AuthenticationToken = e(6, 0), s.ServiceConnection = e(7, 0), s.WorkflowManager = e(8, 0), s.ContentManager = e(9, 0), s.UserManager = e(10, 0), s.version = i, s.minServiceVersion = "1.0", s.browser = {}, s.browser.createObjectUrl = o.getObjectUrlForBrowser, n.write(n.levels.verbose, "sdk loaded"), t.exports = s, t.exports
    }, t[1] = function (e, t) {
        "use strict";
        var r = function () {
            function e(e, t) {
                if (a >= e) {
                    var r = Array.prototype.slice.call(arguments, 2),
                        n = s(t, r);
                    console.log(n)
                }
            }

            function t(t, r) {
                Array.prototype.unshift.call(arguments, c.Verbose), e.apply(this, arguments)
            }

            function r(t) {
                Array.prototype.unshift.call(arguments, c.Info), e.apply(this, arguments)
            }

            function n(t) {
                Array.prototype.unshift.call(arguments, c.Warn), e.apply(this, arguments)
            }

            function o(t) {
                Array.prototype.unshift.call(arguments, c.Error), e.apply(this, arguments)
            }

            function i(e) {
                for (var t = !1, r = Object.keys(c), n = 0; n < r.length; n++) {
                    var o = c[r[n]];
                    if (o === e) {
                        t = !0;
                        break
                    }
                }
                if (!t) throw new Error("Not existing log level.");
                a = e
            }

            function s(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    "string" != typeof t[r] && (n = JSON.stringify(t[r]));
                    var o = "{" + r + "}",
                        i = "%" + r + "%";
                    e.indexOf(o) < 0 && e.indexOf(i) < 0 && (e += " --> " + t[r]), e = e.replace(o, n), e = e.replace(i, n)
                }
                return e
            }
            var c = {
                None: 0,
                Error: 1,
                error: 1,
                Warn: 2,
                warn: 2,
                Info: 3,
                info: 3,
                Debug: 4,
                debug: 4,
                Verbose: 5,
                verbose: 5
            },
                a = c.Error;
            return {
                levels: c,
                setLogLevel: i,
                write: e,
                verbose: t,
                info: r,
                warn: n,
                error: o
            }
        }();
        return e.exports = r, e.exports
    }, t[2] = function (e, t) {
        "use strict";

        function r(e) {
            return new Buffer(e).toString("base64")
        }

        function n(e) {
            return new Buffer(e, "base64").toString("ascii")
        }

        function o() {
            return "undefined" == typeof window
        }

        function i() {
            return !o()
        }

        function s(e, t) {
            if (o()) throw new Error("function is only supported in browser mode");
            void 0 === t && (t = "application/octet-stream");
            var r = new Uint8Array(e),
                n = new Blob([r], {
                    type: t
                }),
                i = window.URL || window.webkitURL,
                s = i.createObjectURL(n);
            return s
        }
        return e.exports = {}, e.exports.toBase64 = r, e.exports.fromBase64 = n, e.exports.isNodeJs = o, e.exports.isBrowser = i, e.exports.getObjectUrlForBrowser = s, e.exports
    }, t[3] = function (t, r) {
        "use strict";

        function n(e, t, r, s, a) {
            if (!e) throw new Error("parameter authServiceUrl is missing");
            if (!t) throw new Error("parameter user is missing");
            if (!r) throw new Error("parameter pass is missing");
            a || (a = "SYSTEM"), s || (s = "index");
            var u = 0;
            if (void 0 !== Number.isInteger && Number.isInteger(s) && (u = s), 0 === u) switch (s) {
                case "admin":
                case "3":
                    u = 3;
                    break;
                case "query":
                case "2":
                    u = 2;
                    break;
                case "index":
                case "1":
                    u = 1
            }
            if (u < 1 || u > 3) throw new Error('invalid license. "' + s + '" is not allowed. Please use one of these: \n' + JSON.stringify(n.licenses, null, 2));
            var f, d = "Basic " + i.toBase64(t + ":" + r);
            Object.defineProperty(this, "authServiceUrl", {
                get: function () {
                    return e
                }
            }), Object.defineProperty(this, "_innerAuthProvider", {
                get: function () {
                    return f
                }
            }), this._applyNewToken = function (t) {
                o.info("CredentialAuthProvider._applyNewToken"), f = new c(e, t)
            }, this.applyAuthentication = function (e) {
                void 0 !== f ? f.applyAuthentication(e) : (o.info("CredentialAuthProvider.applyAuthentication"), e.setHeader("Authorization", d), e.setHeader("X-ECM-LicenseType", u), e.setHeader("X-ECM-Tenant", a))
            }
        }
        var o = e(1, 3),
            i = e(2, 3),
            s = e(6, 3),
            c = e(4, 3),
            a = (e(11, 3), e(12, 3));
        return n.licenses = {
            admin: 3,
            query: 2,
            index: 1
        }, Object.freeze(n.licenses), n.prototype.getToken = function () {
            if (o.info("CredentialAuthProvider.getToken"), void 0 !== this._innerAuthProvider) return this._innerAuthProvider.getToken();
            var e = this;
            return new Promise(function (t, r) {
                try {
                    a.executeHttpCall(e.authServiceUrl, a.endpoints.auth.token.generate, "GET", null, !1, e.applyAuthentication).then(function (n) {
                        try {
                            n.token && n.expiresIn || r(new Error("no token received, login failed"));
                            var i = new s(n);
                            e._applyNewToken(i), t(i)
                        } catch (c) {
                            o.error(c), r(c)
                        }
                    }, function (e) {
                        o.error(e), r(e)
                    })
                } catch (n) {
                    o.error(n), r(n)
                }
            })
        }, n.prototype.validateToken = function () {
            if (o.info("CredentialAuthProvider.validateToken"), void 0 !== this._innerAuthProvider) return this._innerAuthProvider.validateToken();
            throw new Error("please execute getToken() before checking the validity.")
        }, t.exports = n, t.exports
    }, t[11] = function (t, r) {
        "use strict";

        function n(e, t) {
            function r(e) {
                o.verbose("create user from json {0}", JSON.stringify(e));
                try {
                    if (void 0 !== e) {
                        if (void 0 === e.reference) throw new Error("provided json will not match ecm service model");
                        if ("USER" !== e.type) throw new Error("no user object received");
                        d = e.reference.id || d, h = e.reference.objectId, n = e.reference.self, s = e.name || e.fullName || s, c = e.shortName || c, a = e.description || a, f = e.distinguishedName || f, u = e.emailAddress || u, l = e.technicalUser || l, y = e.synchronizedUser || y, v = e.locked || v, p = e.deleted || p
                    }
                } catch (t) {
                    throw o.error("merge error for user: {0}", t), t
                }
            }
            if (!e) throw new Error("serviceConnection is not set");
            i.validateServiceConnection(e);
            var n, s, c, a, u, f, d = "",
                h = "",
                p = !1,
                v = !1,
                l = !1,
                y = !1;
            this.serviceConnection = e, void 0 !== t && r(t), this.merge = r, Object.defineProperty(this, "id", {
                get: function () {
                    return h
                }
            }), Object.defineProperty(this, "saperionId", {
                get: function () {
                    return d
                }
            }), Object.defineProperty(this, "referenceUrl", {
                get: function () {
                    return n
                }
            }), Object.defineProperty(this, "fullName", {
                get: function () {
                    return s
                },
                set: function (e) {
                    if (void 0 === e) throw new Error("value is not defined");
                    s = e
                }
            }), Object.defineProperty(this, "shortName", {
                get: function () {
                    return c
                },
                set: function (e) {
                    if (void 0 === e) throw new Error("value is not defined");
                    c = e
                }
            }), Object.defineProperty(this, "distinguishedName", {
                get: function () {
                    return f
                },
                set: function (e) {
                    if (void 0 === e) throw new Error("value is not defined");
                    f = e
                }
            }), Object.defineProperty(this, "description", {
                get: function () {
                    return a
                },
                set: function (e) {
                    if (void 0 === e) throw new Error("value is not defined");
                    a = e
                }
            }), Object.defineProperty(this, "email", {
                get: function () {
                    return u
                },
                set: function (e) {
                    if (void 0 === e) throw new Error("value is not defined");
                    u = e
                }
            }), Object.defineProperty(this, "isTechnicalUser", {
                get: function () {
                    return l
                },
                set: function (e) {
                    if (void 0 === e) throw new Error("value is not defined");
                    l = e
                }
            }), Object.defineProperty(this, "isSynchronizedUser", {
                get: function () {
                    return y
                },
                set: function (e) {
                    if (void 0 === e) throw new Error("value is not defined");
                    y = e
                }
            }), Object.defineProperty(this, "isDeleted", {
                get: function () {
                    return p
                },
                set: function (e) {
                    if (void 0 === e) throw new Error("value is not defined");
                    p = e
                }
            }), Object.defineProperty(this, "isLocked", {
                get: function () {
                    return v
                },
                set: function (e) {
                    if (void 0 === e) throw new Error("value is not defined");
                    v = e
                }
            }), Object.defineProperty(this, "isReduced", {
                get: function () {
                    return void 0 === c && void 0 === u
                }
            })
        }
        var o = e(1, 11),
            i = e(12, 11),
            s = (e(2, 11), e(13, 11));
        return n.prototype.toServiceActorReference = function () {
            return {
                id: this.id,
                type: "USER"
            }
        }, n.prototype["delete"] = function () {
            throw Error("not implemented")
        }, n.prototype.toString = function () {
            var e = this.fullName;
            return e += this.isReduced ? " - reduced -" : " (" + this.shortName + ")"
        }, n.prototype.refresh = function () {
            var e = "User.refresh",
                t = this;
            return new Promise(function (r, n) {
                try {
                    o.info(e), i.getJson(t.serviceConnection, t.referenceUrl).then(function (i) {
                        try {
                            o.verbose("received user: {0}", i), t.merge(i), r(t)
                        } catch (s) {
                            o.error(e, s), n(s)
                        }
                    }, function (t) {
                        o.error(e, t), n(t)
                    })
                } catch (s) {
                    o.error(e, s), n(s)
                }
            })
        }, n.getUsers = function (e, t, r, c) {
            var a = "User.getUsers";
            return void 0 === t && (t = 1), new Promise(function (u, f) {
                try {
                    o.info(a), i.getJson(e, i.endpoints.management.users.all + (c || ""), t).then(function (t) {
                        try {
                            if (!t.items) return o.verbose("received data: {0}", JSON.stringify(t)), void f(new Error("no items collection received"));
                            var i = [],
                                c = [];
                            t.items.forEach(function (t) {
                                var o = new n(e, t);
                                c.push(o), r && i.push(o.refresh())
                            }), Promise.all(i).then(function (e) {
                                u({
                                    data: c,
                                    pageInfo: new s(t)
                                })
                            }, function (e) {
                                o.error(a, e), f(e)
                            })
                        } catch (d) {
                            o.error(a, d), f(d)
                        }
                    }, function (e) {
                        o.error(a, e), f(e)
                    })
                } catch (d) {
                    o.error(a, d), f(d)
                }
            })
        }, n.getUserByName = function (e, t) {
            var r = "User.getUserByName";
            return new Promise(function (s, c) {
                try {
                    o.info(r), i.getJson(e, i.endpoints.management.users.byShortName.replace("{userName}", t)).then(function (t) {
                        try {
                            o.verbose("received user: {0}", t), "USER" !== t.type && c(new Error("no user object received"));
                            var r = new n(e, t);
                            s(r)
                        } catch (i) {
                            o.error(i), c(i)
                        }
                    }, function (e) {
                        o.error(r, e), c(e)
                    })
                } catch (a) {
                    o.error(r, a), c(a)
                }
            })
        }, n.getUserById = function (e, t) {
            var r = "User.getUserById";
            return new Promise(function (s, c) {
                try {
                    o.info(r), i.getJson(e, i.endpoints.management.users.byId.replace("{id}", t)).then(function (t) {
                        try {
                            o.verbose("received user: {0}", t), "USER" !== t.type && c(new Error("no user object received"));
                            var i = new n(e, t);
                            s(i)
                        } catch (a) {
                            o.error(r, a), c(a)
                        }
                    }, function (e) {
                        o.error(r, e), c(e)
                    })
                } catch (a) {
                    o.error(r, a), c(a)
                }
            })
        }, t.exports = n, t.exports
    }, t[13] = function (e, t) {
        "use strict";

        function r(e) {
            var t = 1,
                r = 0,
                n = !1;
            if (void 0 !== e) {
                if (t = e.number || t, void 0 !== e.pageDefinition) {
                    r = e.pageDefinition.pageSize || r;
                    var o = e.pageDefinition.offset || 0;
                    r > 0 && (t = Math.round(o / r) + 1)
                }
                n = e.hasMoreItems || n
            }
            Object.defineProperty(this, "page", {
                get: function () {
                    return t
                }
            }), Object.defineProperty(this, "pageSize", {
                get: function () {
                    return r
                }
            }), Object.defineProperty(this, "hasMoreItems", {
                get: function () {
                    return n
                }
            })
        }
        return e.exports = r, e.exports
    }, t[12] = function (t, r) {
        "use strict";

        function n() {
            return Math.floor(899999 * Math.random() + 1e5).toString()
        }
        var o, i = e(1, 12),
            s = e(14, 12),
            c = require("http"),
            a = require("https"),
            u = require("url"),
            f = function (e) {
                var t = [];
                if (!e) return [];
                for (var r = 0, n = 1, o = 0; o < e.length; o++) {
                    var i = e[o].split(": ");
                    t[i[r].trim()] = i[n].trim()
                }
                return t
            },
            d = function (e) {
                if (!e.serviceUrl) throw new Error("serviceConnection.serviceUrl is not defined");
                if (!e._applyAuthentication) throw new Error("serviceConnection does not support applyAuthentication")
            },
            h = function (e, t, r, s, d, h, p) {
                r || (r = "GET");
                var v = n();
                return new Promise(function (n, l) {
                    try {
                        var y = u.parse(e + t);
                        i.verbose("{0} - prepare {1} request for {2}", v, r, y.href);
                        var w = {};
                        w.method = r, w.host = y.hostname, w.path = y.path, w.protocol = y.protocol, w.port = y.port, i.verbose("{0} create request with options: {1}", v, JSON.stringify(w)), o = "http:" === y.protocol ? c : a, d ? (i.verbose("{0} set accept header to application/octet-stream", v), w.Headers = {
                            Accept: "application/octet-stream"
                        }) : (i.verbose("{0} set accept header to application/json", v), w.Headers = {
                            Accept: "application/json"
                        });
                        var m = o.request(w, function (e) {
                            void 0 === e.setEncoding || d || e.setEncoding("utf8"), i.verbose("{0} received response with status code {2} ({3}) for {1}", v, y.href, e.statusCode, e.statusMessage), i.verbose("{0} response headers {1}", v, JSON.stringify(e.headers, null, 2));
                            var t = !0;
                            switch (e.statusCode) {
                                case 200:
                                case 201:
                                case 202:
                                case 203:
                                case 204:
                                case 205:
                                case 206:
                                case 226:
                                    break;
                                case 304:
                                    break;
                                case 401:
                                    if (void 0 !== p) try {
                                        p(y.href)
                                    } catch (r) {
                                        i.error("{0} unauthorizedNotifier callback failed {1}", v, r)
                                    }
                                    t = !1, l("user is not authorized. try to relogin. ServerError: " + e.statusMessage + " (" + e.statusCode + ") at request " + v);
                                    break;
                                default:
                                    t = !1;
                                    var o = f(e.headers)["x-ecms-error-message"] || "";
                                    l("http error " + e.statusMessage + " (" + e.statusCode + ") " + o + " at request " + v)
                            }
                            var s = [];
                            e.on("data", function (e) {
                                s.push(e)
                            }), e.on("end", function () {
                                if (i.verbose("{0} sending received data to caller", v), t) {
                                    var r, o = 0,
                                        c = "utf8";
                                    if (d && (c = "binary"), s.forEach(function (e) {
                                            r = void 0 === r ? new Buffer(e, c) : Buffer.concat([r, new Buffer(e, c)]), o += e.length
                                    }), d) {
                                        var a = "application/octet-stream";
                                        try {
                                            var a = e.headers["content-type"]
                                        } catch (u) {
                                            i.verbose("no content-type availible in response header")
                                        }
                                        var f = {
                                            data: r,
                                            dataInfo: {
                                                contentType: a,
                                                size: o,
                                                binaryUrl: y.href
                                            }
                                        };
                                        n(f)
                                    } else {
                                        var h = {};
                                        try {
                                            void 0 !== r && (h = JSON.parse(r.toString()))
                                        } catch (p) {
                                            throw new Error('json parsing failed for data: "' + h + '" at request ' + v + " with Error: " + p)
                                        }
                                        n(h)
                                    }
                                }
                            })
                        }).on("error", function (e) {
                            var t = "problem with request " + v + " Message: " + e.message;
                            i.error(t), l(new Error(t))
                        });
                        void 0 !== h && h instanceof Function ? h(m) : i.warn("{0} no authentication handler is available. no authentication applied", v), i.verbose("{0} request header {1}", v, w.Headers), null === s || "POST" !== r && "UPDATE" !== r && "PUT" !== r || (i.verbose("{0} write {1} bytes to service", v, s.length), d ? (m.setHeader("Content-Type", "application/octet-stream"), m.write(s)) : (m.setHeader("Content-Type", "application/json"), m.write(s, "utf8"))), i.info("{0} execute {1} request to {2}", v, m.method, m.path), m.end()
                    } catch (g) {
                        i.error(g), l(g)
                    }
                })
            },
            p = function (e, t, r, n, o) {
                return h(e.serviceUrl, t, r, n, o, e._applyAuthentication, e._unauthorizedCallback)
            },
            v = function (e, t) {
                return p(e, t, "GET", null, !1)
            },
            l = function (e, t) {
                return p(e, t, "GET", null, !0)
            },
            y = function (e, t, r) {
                return p(e, t, "POST", JSON.stringify(r), !1)
            },
            w = function (e, t, r) {
                return p(e, t, "POST", JSON.stringify(r), !0)
            },
            m = function (e, t, r) {
                return p(e, t, "PUT", JSON.stringify(r), !1)
            },
            g = function (e, t) {
                return p(e, t, "PUT", null, !1)
            },
            b = function (e) {
                return encodeURIComponent(e)
            },
            k = function (e) {
                return decodeURIComponent(e)
            },
            P = function (e) {
                return encodeURI(e)
            },
            O = function (e) {
                return decodeURI(e)
            },
            g = function (e, t) {
                return p(e, t, "PUT", null, !1)
            };
        return t.exports = {
            validateServiceConnection: d,
            executeHttpCall: h,
            getJson: v,
            getBinary: l,
            postJson: y,
            postBinary: w,
            putJson: m,
            startAction: g,
            endpoints: s,
            encodeUriComponent: b,
            decodeUriComponent: k,
            encodeUri: P,
            decodeUri: O
        }, t.exports
    }, t[14] = function (e, t) {
        var t = {},
            r = "api/",
            n = "api/";
        return t.auth = {}, t.auth.token = {}, t.auth.token.generate = n + "token", t.auth.token.renew = n + "token/renewed", t.auth.token.validate = n + "token/validity", t.management = {}, t.management.users = {}, t.management.users.all = r + "management/users", t.management.users.create = r + "management/users", t.management.users.byId = r + "management/users/{id}", t.management.users.byName = r + "management/users/named/{userName}", t.management.users.byShortName = r + "management/users?query=WHERE%20displayName%20EQ%20%22{userName}%22", t.workflow = {}, t.workflow.inboxes = {}, t.workflow.inboxes.all = r + "workflow/inboxes/", t.workflow.inboxes.byId = r + "workflow/inboxes/{inbox}", t.workflow.inboxes.tasks = r + "workflow/inboxes/{inbox}/items", t.workflow.task = {}, t.workflow.task.details = r + "workflow/tasks/{task}", t.workflow.task.transitions = r + "workflow/tasks/{task}/transitions", t.workflow.task.index = r + "workflow/tasks/{task}/index", t.workflow.task.comments = r + "workflow/tasks/{task}/comments", t.workflow.task.takeOwnership = r + "workflow/tasks/{task}/ownership/acquire", t.workflow.task.revokeOwnership = r + "workflow/tasks/{task}/ownership/revoke", t.workflow.task.forward = r + "workflow/tasks/{task}/forward", t.workflow.process = r + "workflow/tasks/{task}", t.content = {}, t.content.archives = {}, t.content.archives.all = r + "archives", t.content.archives.documents = {}, t.content.archives.documents.all = r + "archive/documents/{archive}/content", t.content.document = {}, t.content.document.details = r + "documents/{document}", t.content.document.revision = r + "documents/revisions/{revision}", t.content.document.element = r + "documents/revisions/{revision}/element/{element}", Object.freeze(t), e.exports = t, e.exports
    }, t[4] = function (t, r) {
        "use strict";

        function n(e, t) {
            if (!t) throw new Error("parameter token is missing");
            if (!e) throw new Error("parameter authServiceUrl is missing");
            var r, n;
            Object.defineProperty(this, "authServiceUrl", {
                get: function () {
                    return e
                }
            }), this._applyNewToken = function (e) {
                if (o.info("TokenAuthProvider._applyNewToken"), e instanceof s) n = e;
                else try {
                    n = s.deserialize(e)
                } catch (t) {
                    n = new s({
                        token: e,
                        expiresIn: 60
                    })
                }
                r = "Bearer " + n.token
            }, this.applyAuthentication = function (e) {
                o.info("TokenAuthProvider.applyAuthentication"), e.setHeader("Authorization", r)
            }, this._applyNewToken(t)
        }
        var o = e(1, 4),
            i = e(12, 4),
            s = e(6, 4);
        return n.prototype.getToken = function () {
            o.info("TokenAuthProvider.getToken");
            var e = this;
            return new Promise(function (t, r) {
                try {
                    i.executeHttpCall(e.authServiceUrl, i.endpoints.auth.token.renew, "GET", null, !1, e.applyAuthentication).then(function (n) {
                        try {
                            n.token && n.expiresIn || r(new Error("no token received. login failed!"));
                            var i = new s(n);
                            e._applyNewToken(i), t(i)
                        } catch (c) {
                            o.error(c), r(c)
                        }
                    }, function (e) {
                        o.error(e), r(e)
                    })
                } catch (n) {
                    o.error(n), r(n)
                }
            })
        }, n.prototype.validateToken = function () {
            o.info("TokenAuthProvider.validateToken");
            var e = this;
            return new Promise(function (t, r) {
                try {
                    i.executeHttpCall(e.authServiceUrl, i.endpoints.auth.token.validate, "GET", null, !1, e.applyAuthentication).then(function (e) {
                        try {
                            t({
                                login: e.ecmsUser,
                                tenant: e.ecmsTenant,
                                license: e.ecmsLicense,
                                loginBy: e.ecmsUserIdentification
                            })
                        } catch (n) {
                            o.error(n), r(n)
                        }
                    }, function (e) {
                        r(e)
                    })
                } catch (n) {
                    o.error(n), r(n)
                }
            })
        }, t.exports = n, t.exports
    }, t[5] = function (t, r) {
        "use strict";

        function n(e, t, r, i) {
            if (!e) throw new Error("parameter authServiceUrl is missing");
            if (!t) throw new Error("parameter user is missing");
            i || (i = "SYSTEM"), r || (r = "index");
            var c = 0;
            if (void 0 !== Number.isInteger && Number.isInteger(r) && (c = r), 0 === c) switch (r) {
                case "admin":
                case "3":
                    c = 3;
                    break;
                case "query":
                case "2":
                    c = 2;
                    break;
                case "index":
                case "1":
                    c = 1
            }
            if (c < 1 || c > 3) throw new Error('invalid license. "' + r + '" is not allowed. Please use one of these: \n' + JSON.stringify(n.licenses, null, 2));
            var a, u = "google " + t;
            Object.defineProperty(this, "authServiceUrl", {
                get: function () {
                    return e
                }
            }), Object.defineProperty(this, "_innerAuthProvider", {
                get: function () {
                    return a
                }
            }), this._applyNewToken = function (t) {
                o.info("CredentialAuthProvider._applyNewToken"), a = new s(e, t)
            }, this.applyAuthentication = function (e) {
                void 0 !== a ? a.applyAuthentication(e) : (o.info("CredentialAuthProvider.applyAuthentication"), e.setHeader("Authorization", u), e.setHeader("X-ECM-LicenseType", c), e.setHeader("X-ECM-Tenant", i))
            }
        }
        var o = e(1, 5),
            i = (e(2, 5), e(6, 5)),
            s = e(4, 5),
            c = (e(11, 5), e(12, 5));
        return n.licenses = {
            admin: 3,
            query: 2,
            index: 1
        }, Object.freeze(n.licenses), n.prototype.getToken = function () {
            if (o.info("CredentialAuthProvider.getToken"), void 0 !== this._innerAuthProvider) return this._innerAuthProvider.getToken();
            var e = this;
            return new Promise(function (t, r) {
                try {
                    c.executeHttpCall(e.authServiceUrl, c.endpoints.auth.token.generate, "GET", null, !1, e.applyAuthentication).then(function (n) {
                        try {
                            n.token && n.expiresIn || r(new Error("no token received, login failed"));
                            var s = new i(n);
                            e._applyNewToken(s), t(s)
                        } catch (c) {
                            o.error(c), r(c)
                        }
                    }, function (e) {
                        o.error(e), r(e)
                    })
                } catch (n) {
                    o.error(n), r(n)
                }
            })
        }, n.prototype.validateToken = function () {
            if (o.info("CredentialAuthProvider.validateToken"), void 0 !== this._innerAuthProvider) return this._innerAuthProvider.validateToken();
            throw new Error("please execute getToken() before checking the validity.")
        }, t.exports = n, t.exports
    }, t[6] = function (t, r) {
        "use strict";

        function n(e) {
            if (void 0 === e) throw new Error("unable to create instance of AuthenticationToken without json");
            if (void 0 === e.token) throw new Error("service token is invalid. token part is missing.");
            var t = e.expiresAt || new Date,
                r = e.refreshAt || new Date;
            e.expiresIn && (t = new Date, t.setSeconds(t.getSeconds() + e.expiresIn), r.setSeconds(r.getSeconds() + .75 * e.expiresIn)), Object.defineProperty(this, "token", {
                get: function () {
                    return e.token
                }
            }), Object.defineProperty(this, "expiresAt", {
                get: function () {
                    return t
                }
            }), Object.defineProperty(this, "refreshAt", {
                get: function () {
                    return r
                }
            }), Object.defineProperty(this, "isExpired", {
                get: function () {
                    return t < Date.now
                }
            }), Object.defineProperty(this, "needsRefresh", {
                get: function () {
                    return r < Date.now
                }
            })
        }
        e(1, 6);
        return n.prototype.serialize = function () {
            var e = {
                token: this.token,
                expiresAt: this.expiresAt,
                refreshAt: this.refreshAt
            };
            return JSON.stringify(e)
        }, n.prototype.toJson = function () {
            return this.serialize()
        }, n.deserialize = function (e) {
            var t = JSON.parse(e);
            return new n(t)
        }, t.exports = n, t.exports
    }, t[7] = function (t, r) {
        "use strict";

        function n(e, t, r) {
            if (!e) throw new Error("url is not set");
            if (!t) throw new Error("authProvider is not defined");
            if (!t.applyAuthentication) throw new Error("authProvider does not support applyAuthentication");
            Object.defineProperty(this, "serviceUrl", {
                get: function () {
                    return e
                }
            }), Object.defineProperty(this, "_authProvider", {
                get: function () {
                    return t
                }
            }), this._unauthorizedCallback = r, this._applyAuthentication = t.applyAuthentication
        }
        var o = e(1, 7),
            i = e(11, 7);
        return n.prototype.isServiceCompatible = function () {
            return !0
        }, n.prototype.login = function () {
            return o.info("ServiceConnection.login"), this._authProvider.getToken()
        }, n.prototype.getCurrentUser = function () {
            var e = "ServiceConnection.getCurrentUser";
            o.info(e);
            var t = this;
            return new Promise(function (r, n) {
                t._authProvider.validateToken().then(function (s) {
                    try {
                        o.verbose("using the following data to identify current user:", s), i.getUsers(t, 1, !0, "?query=WHERE%20displayName%20EQ%20%22{login}%22".replace("{login}", s.login)).then(function (e) {
                            var t;
                            1 === e.data.length && (t = e.data[0]), r(t)
                        }, function (t) {
                            o.error(e, t), n(t)
                        })
                    } catch (c) {
                        o.error(e, c), n(c)
                    }
                }, function (t) {
                    o.error(e, t), n(t)
                })
            })
        }, t.exports = n, t.exports
    }, t[8] = function (t, r) {
        "use strict";

        function n(e) {
            if (!e) throw new Error("serviceConnection is not set");
            o.validateServiceConnection(e), Object.defineProperty(this, "serviceConnection", {
                get: function () {
                    return e
                }
            })
        }
        var o = (e(2, 8), e(12, 8)),
            i = e(15, 8),
            s = e(16, 8);
        return n.prototype.getInboxes = function (e) {
            return i.getAllInboxes(this.serviceConnection, e)
        }, n.prototype.getInboxById = function (e) {
            return i.getInboxById(this.serviceConnection, e)
        }, n.prototype.getTaskById = function (e) {
            return s.getTaskById(this.serviceConnection, e)
        }, n.prototype.getWorkflowDefinitions = function (e) {
            throw new Error("not implemented yet")
        }, t.exports = n, t.exports
    }, t[15] = function (t, r) {
        "use strict";

        function n(e, t) {
            function r(t) {
                var r = "Document.merge";
                if (o.verbose(r, "create Inbox from json {0}", JSON.stringify(t)), void 0 !== t)
                    if (void 0 === t.reference) {
                        if (void 0 === t.id) throw new Error("provided json will not match ecm service model");
                        a = t.id
                    } else c = t.reference.id || c, a = t.reference.objectId, u = t.reference.self, f = t.name || f, d = t.type || d, h = t.unreadCount || h, p = t.totalCount || p, void 0 !== t.owner && (n = new s(e, t.owner))
            }
            if (!e) throw new Error("serviceConnection is not set");
            i.validateServiceConnection(e);
            var n, c = 0,
                a = "",
                u = "",
                f = "",
                d = "",
                h = 0,
                p = 0;
            this.serviceConnection = e, void 0 !== t && r(t), this.merge = r, Object.defineProperty(this, "id", {
                get: function () {
                    return a
                }
            }), Object.defineProperty(this, "saperionId", {
                get: function () {
                    return c
                }
            }), Object.defineProperty(this, "name", {
                get: function () {
                    return f
                },
                set: function (e) {
                    if (void 0 === e) throw new Error("value is not defined");
                    f = e
                }
            }), Object.defineProperty(this, "type", {
                get: function () {
                    return d
                },
                set: function (e) {
                    if (void 0 === e) throw new Error("value is not defined");
                    d = e
                }
            }), Object.defineProperty(this, "unreadCount", {
                get: function () {
                    return h
                },
                set: function (e) {
                    if (void 0 === e || !Number.isInteger(e)) throw new Error("value is not a integer");
                    h = e
                }
            }), Object.defineProperty(this, "totalCount", {
                get: function () {
                    return p
                },
                set: function (e) {
                    if (void 0 === e || !Number.isInteger(e)) throw new Error("value is not a integer");
                    p = e
                }
            }), Object.defineProperty(this, "owner", {
                get: function () {
                    return n
                },
                set: function (e) {
                    if (void 0 === e) throw new Error("value is not defined");
                    n = e
                }
            }), Object.defineProperty(this, "isReduced", {
                get: function () {
                    return void 0 === a
                }
            })
        }
        var o = e(1, 15),
            i = e(12, 15),
            s = (e(2, 15), e(17, 15)),
            c = e(13, 15),
            a = e(16, 15);
        return n.prototype.refresh = function () {
            var e = "Inbox.refresh",
                t = this;
            return new Promise(function (r, n) {
                try {
                    o.info(e), i.getJson(t.serviceConnection, i.endpoints.workflow.inboxes.byId.replace("{inbox}", t.id)).then(function (i) {
                        try {
                            o.verbose("received data: {0}", i), i || n(new Error("no data received")), t.merge(i), r(t)
                        } catch (s) {
                            o.error(e, s), n(s)
                        }
                    }, function (t) {
                        o.error(e, t), n(t)
                    })
                } catch (s) {
                    o.error(e, s), n(s)
                }
            })
        }, n.prototype.getWorkflowTasks = function (e, t) {
            return a.getTasks(this, e, t)
        }, n.prototype.toString = function () {
            var e = this.name + " / " + this.type + " (ID " + this.id + ")";
            return e
        }, n.getAllInboxes = function (e, t) {
            return void 0 === t && (t = 1), o.verbose("getAllInboxes"), new Promise(function (t, r) {
                try {
                    i.getJson(e, i.endpoints.workflow.inboxes.all).then(function (i) {
                        try {
                            o.verbose("inboxes {0}", i), i.items || r(new Error("no items collection received"));
                            var s = [];
                            i.items.forEach(function (t) {
                                var r = new n(e, t);
                                s.push(r)
                            }), t({
                                data: s,
                                pageInfo: new c(i)
                            })
                        } catch (a) {
                            o.error(a), r(a)
                        }
                    }, function (e) {
                        o.error(e), r(e)
                    })
                } catch (s) {
                    o.error(s), r(s)
                }
            })
        }, n.getInboxById = function (e, t) {
            var r = "Inbox.getInboxById";
            try {
                o.info(r);
                var i = new n(e, {
                    id: t
                });
                return i
            } catch (s) {
                throw o.error(r, s), s
            }
        }, t.exports = n, t.exports
    }, t[17] = function (t, r) {
        "use strict";

        function n(e, t) {
            if (void 0 === e) throw new Error("missing connection parameter");
            this.serviceConnection = e;
            var r = "",
                n = "",
                o = "",
                i = "",
                s = "";
            void 0 !== t && (r = t.id || r, n = t.objectId || n, o = t.self || o, i = t.type || i, s = t.name || s, void 0 !== t.reference && (r = t.reference.id || r, n = t.reference.objectId || n, i = t.reference.type || i)), Object.defineProperty(this, "id", {
                get: function () {
                    return r
                }
            }), Object.defineProperty(this, "objectId", {
                get: function () {
                    return n
                }
            }), Object.defineProperty(this, "type", {
                get: function () {
                    return i
                }
            }), Object.defineProperty(this, "name", {
                get: function () {
                    return s
                }
            })
        }
        var o = e(11, 17);
        return n.prototype.isUser = function () {
            return "USER" === this.type
        }, n.prototype.isGroup = function () {
            return "GROUP" === this.type
        }, n.prototype.getDetails = function () {
            return this.isUser ? o.getUserById(this.serviceConnection, this.id) : new Promise(function (e, t) {
                this.isGroup() ? e({
                    name: "administrators",
                    isMocked: !0
                }) : t("unsupported owner type " + this.type)
            })
        }, n.prototype.toServiceActorReference = function () {
            return {
                id: this.id,
                type: this.type
            }
        }, t.exports = n, t.exports
    }, t[16] = function (t, r) {
        "use strict";

        function n(e, t, r) {
            function n(t) {
                o.verbose("create task from json {0}", JSON.stringify(t));
                try {
                    if (void 0 !== t)
                        if (void 0 === t.reference) {
                            if (void 0 === t.id) throw new Error("provided json will not match ecm service model");
                            l = t.id
                        } else v = t.reference.id || v, l = t.reference.objectId, y = t.reference.self, w = t.description || w, g = t.priority || g, void 0 !== t.actor && (a = new c(e, t.actor)), void 0 !== t.previousActor && (u = new c(e, t.previousActor)), void 0 !== t.process && (d = new s(e, t.process), void 0 !== t.process.documentReference && (p = t.process.documentReference)), b = t.receiveDate || b, k = t.subject || k, P = t.userFields || P, h = t.capabilities || []
                } catch (r) {
                    throw o.error("merge error for workflow task: {0}", r), r
                }
            }
            if (!e) throw new Error("serviceConnection is not set");
            i.validateServiceConnection(e);
            var a, u, d, h, p, v = 0,
                l = "",
                y = "",
                w = "",
                m = !1,
                g = 0,
                b = t.receiveDate,
                k = t.subject,
                P = t.userFields;
            this.serviceConnection = e, void 0 !== t && n(t), this.merge = n, Object.defineProperty(this, "id", {
                get: function () {
                    return l
                }
            }), Object.defineProperty(this, "saperionId", {
                get: function () {
                    return v
                }
            }), Object.defineProperty(this, "referenceUrl", {
                get: function () {
                    return y
                }
            }), Object.defineProperty(this, "description", {
                get: function () {
                    return w
                },
                set: function (e) {
                    if (void 0 === e) throw new Error("value is not defined");
                    w = e
                }
            }), Object.defineProperty(this, "isRead", {
                get: function () {
                    return m
                },
                set: function (e) {
                    if (void 0 === e) throw new Error("value is not defined");
                    m = e
                }
            }), Object.defineProperty(this, "priority", {
                get: function () {
                    return g
                },
                set: function (e) {
                    if (void 0 === e) throw new Error("value is not defined");
                    g = e
                }
            }), Object.defineProperty(this, "actor", {
                get: function () {
                    return a
                },
                set: function (e) {
                    if (void 0 === e) throw new Error("value is not defined");
                    a = e
                }
            }), Object.defineProperty(this, "previousActor", {
                get: function () {
                    return u
                }
            }), Object.defineProperty(this, "process", {
                get: function () {
                    return d
                }
            }), Object.defineProperty(this, "receiveDate", {
                get: function () {
                    return new Date(b)
                }
            }), Object.defineProperty(this, "subject", {
                get: function () {
                    return k
                },
                set: function (e) {
                    if (void 0 === e) throw new Error("value is not defined");
                    k = e
                }
            }), Object.defineProperty(this, "isReduced", {
                get: function () {
                    return void 0 === d
                }
            }), Object.defineProperty(this, "userFields", {
                get: function () {
                    return P
                }
            }), Object.defineProperty(this, "document", {
                get: function () {
                    return new f(this.serviceConnection, p)
                }
            }), Object.defineProperty(this, "hasDocument", {
                get: function () {
                    return void 0 !== p
                }
            }), Object.defineProperty(this, "canMoveToMyInbox", {
                get: function () {
                    return h.indexOf("CAN_TAKE") !== -1
                }
            }), Object.defineProperty(this, "canMoveToPreviousInbox", {
                get: function () {
                    return h.indexOf("CAN_PUT_BACK") !== -1
                }
            })
        }
        var o = e(1, 16),
            i = e(12, 16),
            s = (e(2, 16), e(18, 16)),
            c = e(17, 16),
            a = e(13, 16),
            u = e(19, 16),
            f = e(20, 16);
        return n.prototype.toString = function () {
            var e = this.description + " / " + this.subject;
            return void 0 !== this.actor && (e += " / " + this.actor.name), e += " (ID " + this.id + ")"
        }, n.prototype.refresh = function () {
            var e = "WorkflowTask.refresh",
                t = this;
            return new Promise(function (r, n) {
                try {
                    o.info(e);
                    var s;
                    s = t.referenceUrl ? t.referenceUrl : i.endpoints.workflow.task.details.replace("{task}", i.encodeUriComponent(t.id)), i.getJson(t.serviceConnection, s).then(function (i) {
                        try {
                            o.verbose("received task: {0}", i), i || n(new Error("no data received")), t.merge(i), r(t)
                        } catch (s) {
                            o.error(e, s), n(s)
                        }
                    }, function (t) {
                        o.error(e, t), n(t)
                    })
                } catch (c) {
                    o.error(e, c), n(c)
                }
            })
        }, n.prototype.moveToMyInbox = function () {
            var e = "WorkflowTask.moveToMyInbox",
                t = this;
            if (!this.canMoveToMyInbox) throw new Error("operation not allowed");
            return new Promise(function (r, n) {
                try {
                    o.info(e), i.startAction(t.serviceConnection, i.endpoints.workflow.task.takeOwnership.replace("{task}", i.encodeUriComponent(t.id))).then(function () {
                        o.info("{0} for {1} executed", e, t.toString()), t.refresh().then(function () {
                            r(t)
                        }, function (t) {
                            o.error(e, t), n(t)
                        })
                    }, function (t) {
                        o.error(e, t), n(t)
                    })
                } catch (s) {
                    o.error(e, s), n(s)
                }
            })
        }, n.prototype.moveToPreviousInbox = function () {
            var e = "WorkflowTask.moveToPreviousInbox",
                t = this;
            if (!this.canMoveToPreviousInbox) throw new Error("operation not allowed");
            return new Promise(function (r, n) {
                try {
                    o.info(e), i.startAction(t.serviceConnection, i.endpoints.workflow.task.revokeOwnership.replace("{task}", i.encodeUriComponent(t.id))).then(function () {
                        o.info("{0} for {1} executed", e, t.toString()), t.refresh().then(function () {
                            r(t)
                        }, function (t) {
                            o.error(e, t), n(t)
                        })
                    }, function (t) {
                        o.error(e, t), n(t)
                    })
                } catch (s) {
                    o.error(e, s), n(s)
                }
            })
        }, n.prototype.getTransitions = function () {
            return u.getTransitions(this)
        }, n.getTasks = function (e, t, r) {
            var s = "WorkflowTask.getTasks";
            return void 0 === r && (r = !1), void 0 === t && (t = 1), new Promise(function (t, c) {
                try {
                    o.info(s), i.getJson(e.serviceConnection, i.endpoints.workflow.inboxes.tasks.replace("{inbox}", e.id)).then(function (i) {
                        try {
                            if (!i.items) return o.verbose("received data: {0}", JSON.stringify(i, null, 2)), void c(new Error("no items collection received"));
                            var u = [],
                                f = [];
                            i.items.forEach(function (t) {
                                var o = new n(e.serviceConnection, t, e);
                                f.push(o), r && u.push(o.refresh())
                            }), Promise.all(u).then(function (e) {
                                t({
                                    data: f,
                                    pageInfo: new a(i)
                                })
                            }, function (e) {
                                o.error(s, e), c(e)
                            })
                        } catch (d) {
                            o.error(s, d), c(d)
                        }
                    }, function (e) {
                        o.error(s, e), c(e)
                    })
                } catch (u) {
                    o.error(s, u), c(u)
                }
            })
        }, n.getTaskById = function (e, t) {
            var r = "WorkflowTask.getTaskById";
            try {
                o.info(r);
                var i = new n(e, {
                    id: t
                });
                return i
            } catch (s) {
                throw o.error(r, s), s
            }
        }, t.exports = n, t.exports
    }, t[18] = function (t, r) {
        "use strict";

        function n(e, t) {
            function r(t) {
                if (o.verbose("create workflow process from json {0}", t), void 0 === t) throw new Error("json is empty or undefined");
                if (void 0 === t.reference) throw new Error("provided json will not match ecm service model");
                f = t.reference.id || f, d = t.reference.objectId, h = t.reference.self, p = t.description || p, p = t.name, n = new c(e, process.owner), s = {}, a = t.state, u = t.timeInformation
            }
            if (!e) throw new Error("serviceConnection is not set");
            i.validateServiceConnection(e);
            var n, s, a, u, f = 0,
                d = "",
                h = "",
                p = "";
            this.serviceConnection = e, void 0 !== t && r(t), this.merge = r, Object.defineProperty(this, "id", {
                get: function () {
                    return d
                }
            }), Object.defineProperty(this, "saperionId", {
                get: function () {
                    return f
                }
            }), Object.defineProperty(this, "name", {
                get: function () {
                    return p
                },
                set: function (e) {
                    if (void 0 === e) throw new Error("value is not defined");
                    p = e
                }
            }), Object.defineProperty(this, "isReduced", {
                get: function () {
                    return void 0 === _definition
                }
            })
        }
        var o = e(1, 18),
            i = e(12, 18),
            s = (e(2, 18), e(13, 18)),
            c = e(17, 18);
        return n.prototype.update = function () {
            var e = this;
            return new Promise(function (t, r) {
                try {
                    o.info("WorkflowTask.update"), i.getJson(e.serviceConnection, i.endpoints.workflow.task.replace("{task}", e.id)).then(function (n) {
                        try {
                            n || r(new Error("no json received")), e.merge(n), t(e)
                        } catch (i) {
                            o.error(i), r(i)
                        }
                    }, function (e) {
                        o.error(e), r(e)
                    })
                } catch (n) {
                    o.error(n), r(n)
                }
            })
        }, n.prototype.toString = function () {
            var e = this.description + " / " + this.subject + " / " + this.actor.name + " (ID " + this.id + ")";
            return e
        }, n.getTasks = function (e, t, r) {
            return void 0 === r && (r = !1), void 0 === t && (t = 1), new Promise(function (t, n) {
                try {
                    o.info("getTasks"), i.getJson(e.serviceConnection, i.endpoints.workflow.inboxes.tasks.replace("{inbox}", e.id)).then(function (i) {
                        try {
                            o.verbose("received tasks: {0}", i), i.items || n(new Error("no items collection received"));
                            var c = [];
                            if (i.items.forEach(function (t) {
                                    var r = new WorkflowTask(e.serviceConnection, t, e);
                                    c.push(r)
                            }), r) {
                                var a = [];
                                c.forEach(function (e) {
                                    a.push(e.update())
                                }), Promise.all(a).then(function (e) {
                                    o.info("all tasks received"), t({
                                        data: e,
                                        pageInfo: new s(i)
                                    })
                                })
                            } else t({
                                data: c,
                                pageInfo: new s(i)
                            })
                        } catch (u) {
                            o.error(u), n(u)
                        }
                    }, function (e) {
                        o.error(e), n(e)
                    })
                } catch (c) {
                    n(c)
                }
            })
        }, t.exports = n, t.exports
    }, t[19] = function (t, r) {
        "use strict";

        function n(e, t, r) {
            function n(e) {
                o.verbose("create transition from json {0}", JSON.stringify(e));
                try {
                    void 0 !== e && (u = e.id || u, d = e.description || d, f = e.commentRequired || f, void 0 !== e.recipientSelection && (s = [], c = {}))
                } catch (t) {
                    throw o.error("merge error for workflow task transition: {0}", t), t
                }
            }
            if (!e) throw new Error("serviceConnection is not set");
            i.validateServiceConnection(e);
            var s, c, a = r,
                u = 0,
                f = !1,
                d = "";
            this.serviceConnection = e, void 0 !== t && n(t), this.merge = n, Object.defineProperty(this, "id", {
                get: function () {
                    return u
                }
            }), Object.defineProperty(this, "commentRequired", {
                get: function () {
                    return f
                }
            }), Object.defineProperty(this, "description", {
                get: function () {
                    return d
                }
            }), Object.defineProperty(this, "potentialRecipients", {
                get: function () {
                    return s || []
                }
            }), Object.defineProperty(this, "recipientSelectionRule", {
                get: function () {
                    return c
                }
            }), Object.defineProperty(this, "task", {
                get: function () {
                    return a
                }
            })
        }
        var o = e(1, 19),
            i = e(12, 19),
            s = (e(2, 19), e(18, 19), e(17, 19), e(13, 19));
        return n.prototype.toString = function () {
            var e = this.description + " (ID " + this.id + ")";
            return e
        }, n.prototype.apply = function (e, t) {
            var r = "WorkflowTaskTransition.apply",
                n = this;
            return new Promise(function (s, c) {
                try {
                    o.info(r);
                    var a = {};
                    if (a.transitionId = n.id, e && (a.comment = e), Array.isArray(t)) {
                        var u = [];
                        t.forEach(function (e) {
                            u.push(e.toServiceActorReference())
                        }), a.recipients = u
                    }
                    o.verbose("{0} data to send : {1}", r, a), i.postJson(n.serviceConnection, i.endpoints.workflow.task.forward.replace("{task}", n.task.id), a).then(function () {
                        o.info("{0} for {1} executed", r, n.toString()), s(n)
                    }, function (e) {
                        o.error(r, e), c(e)
                    })
                } catch (f) {
                    o.error(r, f), c(f)
                }
            })
        }, n.getTransitions = function (e) {
            var t = "WorkflowTaskTransition.getTransitions";
            return new Promise(function (r, c) {
                try {
                    o.info(t), i.getJson(e.serviceConnection, i.endpoints.workflow.task.transitions.replace("{task}", e.id)).then(function (i) {
                        try {
                            var a = [];
                            i.forEach(function (t) {
                                var r = new n(e.serviceConnection, t, e);
                                a.push(r)
                            }), r({
                                data: a,
                                pageInfo: new s
                            })
                        } catch (u) {
                            o.error(t, u), c(u)
                        }
                    }, function (e) {
                        o.error(t, e), c(e)
                    })
                } catch (a) {
                    o.error(t, a), c(a)
                }
            })
        }, t.exports = n, t.exports
    }, t[20] = function (t, r) {
        "use strict";

        function n(e, t, r) {
            function n(e) {
                var t = "Document.merge";
                o.verbose(t, "create document from json {0}", JSON.stringify(e));
                try {
                    void 0 !== e && (void 0 !== e.reference ? (d = e.reference.objectId, f = e.reference.self) : f = e.self, void 0 !== e.documentId && (u = e.documentId.objectId), void 0 !== e.previousRevisionId && (h = e.previousRevisionId.objectId || u), void 0 !== e.archiveReference && void 0 === l, p = e.indexData || p, void 0 !== e.modificationMetaData && (y = e.modificationMetaData.creationDate, w = new a(b.serviceConnection, e.modificationMetaData.creationUser), m = e.modificationMetaData.lastModificationDate, g = new a(b.serviceConnection, e.modificationMetaData.lastModificationUser)), void 0 !== e.documentElement && (v = e.documentElement, s = new c(b.serviceConnection, e.documentElement, b)))
                } catch (r) {
                    throw o.error(t, "merge error for document: {0}", r), r
                }
            }
            if (!e) throw new Error("serviceConnection is not set");
            i.validateServiceConnection(e), this.serviceConnection = e;
            var s, u = "",
                f = "",
                d = "",
                h = "",
                p = {},
                v = "",
                l = {};
            void 0 !== r && (l = r);
            var y, w, m, g, b = this;
            void 0 !== t && n(t), this.merge = n, Object.defineProperty(this, "id", {
                get: function () {
                    return u
                }
            }), Object.defineProperty(this, "referenceUrl", {
                get: function () {
                    return f
                }
            }), Object.defineProperty(this, "revisionId", {
                get: function () {
                    return d
                }
            }), Object.defineProperty(this, "previousRevisionId", {
                get: function () {
                    return h
                }
            }), Object.defineProperty(this, "hasPreviousRevision", {
                get: function () {
                    return void 0 !== h && h.length > 0
                }
            }), Object.defineProperty(this, "indexData", {
                get: function () {
                    return p
                }
            }), Object.defineProperty(this, "creationDate", {
                get: function () {
                    return new Date(y)
                }
            }), Object.defineProperty(this, "creator", {
                get: function () {
                    return w
                }
            }), Object.defineProperty(this, "lastModificationDate", {
                get: function () {
                    return new Date(m)
                }
            }), Object.defineProperty(this, "lastModifier", {
                get: function () {
                    return g
                }
            }), Object.defineProperty(this, "archive", {
                get: function () {
                    return l
                }
            }), Object.defineProperty(this, "hasContent", {
                get: function () {
                    return void 0 !== s
                }
            }), Object.defineProperty(this, "content", {
                get: function () {
                    return this.hasContent ? s : {}
                }
            }), Object.defineProperty(this, "contentList", {
                get: function () {
                    return this.hasContent ? this.content.elementType === c.elementTypes.FILE ? [this.content] : s.childrenFilesList : []
                }
            }), Object.defineProperty(this, "isReduced", {
                get: function () {
                    return this.hasContent === !1
                }
            })
        }
        var o = e(1, 20),
            i = e(12, 20),
            s = (e(2, 20), e(13, 20)),
            c = e(21, 20),
            a = e(17, 20);
        return n.prototype.toString = function () {
            return "Document: (ID " + this.id + "  | from archive: " + this.archive.name + ")"
        }, n.prototype.refresh = function () {
            var e = "Document.refresh",
                t = this;
            return new Promise(function (r, n) {
                try {
                    o.info(e);
                    var s = t.referenceUrl;
                    void 0 !== s && 0 !== s.length || (o.error(e, "invalid url: " + s), n(new Error("Error on url information"))), i.getJson(t.serviceConnection, s).then(function (i) {
                        try {
                            o.verbose(e, "received document: {0}", JSON.stringify(i)), i || n(new Error("no json received")), t.merge(i), r(t)
                        } catch (s) {
                            o.error(e, s), n(s)
                        }
                    }, function (t) {
                        o.error(e, t), n(t)
                    })
                } catch (c) {
                    o.error(e, c), n(c)
                }
            })
        }, n.prototype.getPreviousRevision = function () {
            var e = "Document.getPreviousRevision";
            if (o.info(e), !this.hasPreviousRevision) throw o.info(e, "no previous revision available"), Error("no previous revision available");
            return n.getDocumentByRevisionId(this.previousRevisionId)
        }, n.getDocumentById = function (e, t) {
            var r = "Document.getDocumentById";
            o.info(r);
            var s = i.endpoints.content.document.details.replace("{document}", t);
            return n.getDocumentByUrl(e, s)
        }, n.getDocumentByRevisionId = function (e, t) {
            var r = "Document.getDocumentByRevisionId";
            o.info(r);
            var s = i.endpoints.content.document.revision.replace("{revision}", t);
            return n.getDocumentByUrl(e, s)
        }, n.getDocumentByUrl = function (e, t) {
            var r = "Document.getDocumentByObjectUrl";
            return new Promise(function (s, c) {
                try {
                    o.info(r), void 0 !== t && 0 !== t.length || (o.error(r, "invalid url: " + t), c(new Error("Error on url"))), i.getJson(e, t).then(function (t) {
                        try {
                            o.verbose("received json: {0}", JSON.stringify(t)), t || c(new Error("no json received"));
                            var i = new n(e, t);
                            s(i)
                        } catch (a) {
                            o.error(r, a), c(a)
                        }
                    }, function (e) {
                        o.error(r, e), c(e)
                    })
                } catch (a) {
                    o.error(r, a), c(a)
                }
            })
        }, n.getDocumentsFromArchive = function (e, t, r) {
            var c = "Document.getDocumentsFromArchive";
            return void 0 === t && (t = 1), void 0 === r && (r = !1), new Promise(function (t, a) {
                try {
                    o.info(c), i.getJson(e.serviceConnection, i.endpoints.content.archives.documents.all.replace("{archive}", i.encodeUriComponent(e.id))).then(function (i) {
                        try {
                            o.verbose(c, "received documents: {0}", JSON.stringify(i)), i.items || a(new Error("no items collection received"));
                            var u = [],
                                f = [];
                            i.items.forEach(function (t) {
                                var o = new n(e.serviceConnection, t, e);
                                u.push(o), r && f.push(o.refresh())
                            }), Promise.all(f).then(function (e) {
                                o.info(c, "all documents received"), t({
                                    data: u,
                                    pageInfo: new s(i)
                                })
                            }, function (e) {
                                o.error(c, e), a(e)
                            })
                        } catch (d) {
                            o.error(c, d), a(d)
                        }
                    }, function (e) {
                        o.error(c, e), a(e)
                    })
                } catch (u) {
                    o.error(c, u), a(u)
                }
            })
        }, t.exports = n, t.exports
    }, t[21] = function (t, r) {
        "use strict";

        function n(e, t, r, s) {
            function c(e) {
                var t = "ContentElement.merge";
                o.verbose(t, "create ContentElement from json {0}", JSON.stringify(e));
                try {
                    if (void 0 !== e) {
                        if (f = a(e.element_type), f === n.elementTypes.UNKNOWN) throw o.error("merge JSON on ElementType not file or structure is not supported"), new Error("provided json will not match ecm service model: element_type not parseable");
                        if (void 0 === e.reference) throw new Error("provided json will not match ecm service model: reference not available");
                        if (u = e.reference.objectId, d = e.creationDate || d, h = e.variables || h, f === n.elementTypes.STRUCTURE) {
                            var r = e.children,
                                i = E;
                            r.forEach(function (e) {
                                o.verbose("found childElementJson {0}", e);
                                var t = new n(i.serviceConnection, e, g, i);
                                v.push(t)
                            })
                        } else if (f === n.elementTypes.FILE) {
                            if (l = e.annotations || l, void 0 === e.contentMetaData) throw new Error("provided json will not match ecm service model: contentMetaData not available");
                            y.alorithm = e.contentMetaData.hashAlgorithm || y.alorithm, y.value = e.contentMetaData.hash || y.value, w = e.contentMetaData.uncompressedSize, m = e.contentMetaData.compressedSize, b = e.fileName, k = e.picture, P = e.chunkedOnMedium, O = e.originalFormat
                        } else f === n.elementTypes.LINK && o.info(t, "Handling for ContentElement LINK not yet handled")
                    }
                } catch (s) {
                    throw o.error("merge error for Element: {0}", s), s
                }
            }

            function a(e) {
                return e === n.elementTypes.FILE ? n.elementTypes.FILE : e === n.elementTypes.STRUCTURE ? n.elementTypes.STRUCTURE : e === n.elementTypes.LINK ? n.elementTypes.LINK : n.elementTypes.UNKNOWN
            }
            if (!e) throw new Error("serviceConnection is not set");
            i.validateServiceConnection(e), this.serviceConnection = e;
            var u = "",
                f = n.elementTypes.UNKNOWN,
                d = "",
                h = {},
                p = {},
                v = [],
                l = [],
                y = {};
            y.alorithm = "", y.value = "";
            var w, m, g, b = "",
                k = !1,
                P = !1,
                O = !1;
            void 0 !== r && (g = r), void 0 !== s && (p = s);
            var E = this;
            void 0 !== t && c(t), this.merge = c, Object.defineProperty(this, "id", {
                get: function () {
                    return u
                }
            }), Object.defineProperty(this, "document", {
                get: function () {
                    return g
                }
            }), Object.defineProperty(this, "elementType", {
                get: function () {
                    return f
                }
            }), Object.defineProperty(this, "isFile", {
                get: function () {
                    return f === n.elementTypes.FILE
                }
            }), Object.defineProperty(this, "isStructure", {
                get: function () {
                    return f === n.elementTypes.STRUCTURE
                }
            }), Object.defineProperty(this, "isLink", {
                get: function () {
                    return f === n.elementTypes.LINK
                }
            }), Object.defineProperty(this, "fileName", {
                get: function () {
                    var e = b,
                        t = e.lastIndexOf("/");
                    return t >= 0 && (e = e.substring(t + 1)), t = e.lastIndexOf("\\"), t >= 0 && (e = e.substring(t + 1)), t = e.lastIndexOf("@"), t >= 0 && (e = e.substring(0, t)), e
                }
            }), Object.defineProperty(this, "size", {
                get: function () {
                    return w
                }
            }), Object.defineProperty(this, "hasParent", {
                get: function () {
                    return !(void 0 === p || void 0 === p.keys || 0 === p.keys.length)
                }
            }), Object.defineProperty(this, "parent", {
                get: function () {
                    return this.hasParent ? p : void 0
                }
            }), Object.defineProperty(this, "hasChildren", {
                get: function () {
                    return void 0 !== v && v.length > 0
                }
            }), Object.defineProperty(this, "children", {
                get: function () {
                    return this.hasChildren ? v : []
                }
            }), Object.defineProperty(this, "childrenFilesList", {
                get: function () {
                    var e = [];
                    return v.forEach(function (t) {
                        t.elementType === n.elementTypes.FILE && e.push(t), t.elementType === n.elementTypes.STRUCTURE && (e = e.concat(t.childrenFilesList))
                    }), e
                }
            }), Object.defineProperty(this, "hash", {
                get: function () {
                    return this.isFile ? y : void 0
                }
            })
        }
        var o = e(1, 21),
            i = e(12, 21);
        e(2, 21), e(13, 21);
        return n.prototype.toString = function () {
            return this.elementType === n.elementTypes.FILE ? "File: " + this.fileName + "(Size: " + this.size + " Bytes | ID: " + this.id + ")" : "Element: " + this.elementType + "( ID: " + this.id + ")"
        }, n.prototype.getBinary = function () {
            var e = "ContentElement.getBinary",
                t = this;
            return new Promise(function (r, s) {
                if (t.elementType !== n.elementTypes.FILE) return void s("get Binary not supported on element NOT file");
                try {
                    o.info(e), i.getBinary(t.serviceConnection, i.endpoints.content.document.element.replace("{revision}", t.document.revisionId).replace("{element}", t.id)).then(function (t) {
                        try {
                            o.verbose(e, "received binary with length: {0}", t.length), t || s(new Error("no data received")), r(t)
                        } catch (n) {
                            o.error(e, n), s(n)
                        }
                    }, function (t) {
                        o.error(e, t), s(t)
                    })
                } catch (c) {
                    o.error(e, c), s(c)
                }
            })
        }, n.elementTypes = {
            FILE: "file",
            STRUCTURE: "structure",
            LINK: "link",
            UNKNOWN: "UNKNOWN"
        }, Object.freeze(n.elementTypes), t.exports = n, t.exports
    }, t[9] = function (t, r) {
        "use strict";

        function n(e) {
            if (!e) throw new Error("serviceConnection is not set");
            o.validateServiceConnection(e), Object.defineProperty(this, "serviceConnection", {
                get: function () {
                    return e
                }
            })
        }
        var o = e(12, 9),
            i = e(22, 9),
            s = e(20, 9);
        return n.prototype.getArchives = function (e) {
            return i.getAllArchives(this.serviceConnection, e)
        }, n.prototype.getDocumentById = function (e) {
            return s.getDocumentById(this.serviceConnection, e)
        }, n.prototype.getDocumentByRevisionId = function (e) {
            return s.getDocumentByRevisionId(this.serviceConnection, e)
        }, n.prototype.getDocumentByUrl = function (e) {
            return s.getDocumentByUrl(this.serviceConnection, e)
        }, t.exports = n, t.exports
    }, t[22] = function (t, r) {
        "use strict";

        function n(e, t) {
            function r(e) {
                o.verbose("create archive from json {0}", e);
                try {
                    if (void 0 !== e) {
                        if (void 0 === e.reference) throw new Error("provided json will not match ecm service model");
                        a = e.reference.objectId, u = e.reference.self, f = e.reference.contentType, n = e.reference.name, s = e.version || s, c = e.isolation || c
                    }
                } catch (t) {
                    throw o.error("merge error for archive: {0}", t), t
                }
            }
            if (!e) throw new Error("serviceConnection is not set");
            i.validateServiceConnection(e);
            var n, s, c, a = "",
                u = "",
                f = "";
            this.serviceConnection = e, void 0 !== t && r(t), this.merge = r, Object.defineProperty(this, "id", {
                get: function () {
                    return a
                }
            }), Object.defineProperty(this, "referenceUrl", {
                get: function () {
                    return u
                }
            }), Object.defineProperty(this, "name", {
                get: function () {
                    return n
                }
            }), Object.defineProperty(this, "contentType", {
                get: function () {
                    return f
                }
            }), Object.defineProperty(this, "version", {
                get: function () {
                    return s
                }
            }), Object.defineProperty(this, "isolation", {
                get: function () {
                    return c
                }
            })
        }
        var o = e(1, 22),
            i = e(12, 22),
            s = (e(2, 22), e(13, 22)),
            c = e(20, 22);
        return n.prototype.getDocuments = function (e, t) {
            return c.getDocumentsFromArchive(this, e, t)
        }, n.prototype.toString = function () {
            var e = this.name + " (ID " + this.id + " | contentType: " + this.contentType + "  | referenceUrl: " + this.referenceUrl + ")";
            return e
        }, n.getAllArchives = function (e, t) {
            return void 0 === t && (t = 1), o.verbose("getAllArchives"), new Promise(function (t, r) {
                try {
                    i.getJson(e, i.endpoints.content.archives.all).then(function (i) {
                        try {
                            o.verbose("archives {0}", i), i.items || r(new Error("no items collection received"));
                            var c = [];
                            i.items.forEach(function (t) {
                                var r = new n(e, t);
                                r.contentType === n.contentTypes.DOCUMENT && c.push(r)
                            }), t({
                                data: c,
                                pageInfo: new s(i)
                            })
                        } catch (a) {
                            o.error(a), r(a)
                        }
                    }, function (e) {
                        o.error(e), r(e)
                    })
                } catch (c) {
                    o.error(c), r(c)
                }
            })
        }, n.contentTypes = {
            DOCUMENT: "DOCUMENT",
            LOOKUP: "LOOKUP",
            FOLDER: "FOLDER",
            UNKNOWN: "UNKNOWN"
        }, Object.freeze(n.contentTypes), t.exports = n, t.exports
    }, t[10] = function (t, r) {
        "use strict";

        function n(e) {
            if (!e) throw new Error("serviceConnection is not set");
            Object.defineProperty(this, "serviceConnection", {
                get: function () {
                    return e
                }
            })
        }
        var o = e(11, 10);
        return n.prototype.getAllUsers = function (e) {
            return o.getUsers(this.serviceConnection, e, !1)
        }, n.prototype.getAllUsersDetailed = function (e) {
            return o.getUsers(this.serviceConnection, e, !0)
        }, n.prototype.getUserById = function (e) {
            return o.getUserById(this.serviceConnection, e)
        }, n.prototype.getUserByName = function (e) {
            return o.getUserByName(this.serviceConnection, e)
        }, n.prototype.getUserByShortName = function (e) {
            return o.getUserByShortName(this.serviceConnection, e)
        }, n.prototype.createUser = function () {
            return new o(this.serviceConnection)
        }, t.exports = n, t.exports
    }, module.exports = e(0)
}();