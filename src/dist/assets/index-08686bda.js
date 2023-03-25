var Ev = Object.defineProperty;
var Cv = (e, t, n) =>
  t in e
    ? Ev(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (e[t] = n);
var df = (e, t, n) => (Cv(e, typeof t != "symbol" ? t + "" : t, n), n);
function Ov(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const i in r)
        if (i !== "default" && !(i in e)) {
          const o = Object.getOwnPropertyDescriptor(r, i);
          o &&
            Object.defineProperty(
              e,
              i,
              o.get ? o : { enumerable: !0, get: () => r[i] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" })
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === "childList")
        for (const s of o.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = n(i);
    fetch(i.href, o);
  }
})();
function Th(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
function Pv(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      if (this instanceof r) {
        var i = [null];
        i.push.apply(i, arguments);
        var o = Function.bind.apply(t, i);
        return new o();
      }
      return t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return (
    Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.keys(e).forEach(function (r) {
      var i = Object.getOwnPropertyDescriptor(e, r);
      Object.defineProperty(
        n,
        r,
        i.get
          ? i
          : {
              enumerable: !0,
              get: function () {
                return e[r];
              },
            }
      );
    }),
    n
  );
}
var li = {},
  xv = {
    get exports() {
      return li;
    },
    set exports(e) {
      li = e;
    },
  },
  $s = {},
  O = {},
  kv = {
    get exports() {
      return O;
    },
    set exports(e) {
      O = e;
    },
  },
  L = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Di = Symbol.for("react.element"),
  bv = Symbol.for("react.portal"),
  _v = Symbol.for("react.fragment"),
  Tv = Symbol.for("react.strict_mode"),
  Rv = Symbol.for("react.profiler"),
  Nv = Symbol.for("react.provider"),
  Av = Symbol.for("react.context"),
  $v = Symbol.for("react.forward_ref"),
  Dv = Symbol.for("react.suspense"),
  Fv = Symbol.for("react.memo"),
  Lv = Symbol.for("react.lazy"),
  hf = Symbol.iterator;
function Iv(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (hf && e[hf]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Rh = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Nh = Object.assign,
  Ah = {};
function Pr(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Ah),
    (this.updater = n || Rh);
}
Pr.prototype.isReactComponent = {};
Pr.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Pr.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function $h() {}
$h.prototype = Pr.prototype;
function Ul(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Ah),
    (this.updater = n || Rh);
}
var Bl = (Ul.prototype = new $h());
Bl.constructor = Ul;
Nh(Bl, Pr.prototype);
Bl.isPureReactComponent = !0;
var pf = Array.isArray,
  Dh = Object.prototype.hasOwnProperty,
  zl = { current: null },
  Fh = { key: !0, ref: !0, __self: !0, __source: !0 };
function Lh(e, t, n) {
  var r,
    i = {},
    o = null,
    s = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (s = t.ref),
    t.key !== void 0 && (o = "" + t.key),
    t))
      Dh.call(t, r) && !Fh.hasOwnProperty(r) && (i[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) i.children = n;
  else if (1 < a) {
    for (var u = Array(a), l = 0; l < a; l++) u[l] = arguments[l + 2];
    i.children = u;
  }
  if (e && e.defaultProps)
    for (r in ((a = e.defaultProps), a)) i[r] === void 0 && (i[r] = a[r]);
  return {
    $$typeof: Di,
    type: e,
    key: o,
    ref: s,
    props: i,
    _owner: zl.current,
  };
}
function Mv(e, t) {
  return {
    $$typeof: Di,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Vl(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Di;
}
function jv(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var mf = /\/+/g;
function xa(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? jv("" + e.key)
    : t.toString(36);
}
function mo(e, t, n, r, i) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var s = !1;
  if (e === null) s = !0;
  else
    switch (o) {
      case "string":
      case "number":
        s = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case Di:
          case bv:
            s = !0;
        }
    }
  if (s)
    return (
      (s = e),
      (i = i(s)),
      (e = r === "" ? "." + xa(s, 0) : r),
      pf(i)
        ? ((n = ""),
          e != null && (n = e.replace(mf, "$&/") + "/"),
          mo(i, t, n, "", function (l) {
            return l;
          }))
        : i != null &&
          (Vl(i) &&
            (i = Mv(
              i,
              n +
                (!i.key || (s && s.key === i.key)
                  ? ""
                  : ("" + i.key).replace(mf, "$&/") + "/") +
                e
            )),
          t.push(i)),
      1
    );
  if (((s = 0), (r = r === "" ? "." : r + ":"), pf(e)))
    for (var a = 0; a < e.length; a++) {
      o = e[a];
      var u = r + xa(o, a);
      s += mo(o, t, n, u, i);
    }
  else if (((u = Iv(e)), typeof u == "function"))
    for (e = u.call(e), a = 0; !(o = e.next()).done; )
      (o = o.value), (u = r + xa(o, a++)), (s += mo(o, t, n, u, i));
  else if (o === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return s;
}
function Wi(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    mo(e, r, "", "", function (o) {
      return t.call(n, o, i++);
    }),
    r
  );
}
function Uv(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Re = { current: null },
  yo = { transition: null },
  Bv = {
    ReactCurrentDispatcher: Re,
    ReactCurrentBatchConfig: yo,
    ReactCurrentOwner: zl,
  };
L.Children = {
  map: Wi,
  forEach: function (e, t, n) {
    Wi(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Wi(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Wi(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Vl(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
L.Component = Pr;
L.Fragment = _v;
L.Profiler = Rv;
L.PureComponent = Ul;
L.StrictMode = Tv;
L.Suspense = Dv;
L.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Bv;
L.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = Nh({}, e.props),
    i = e.key,
    o = e.ref,
    s = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (s = zl.current)),
      t.key !== void 0 && (i = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var a = e.type.defaultProps;
    for (u in t)
      Dh.call(t, u) &&
        !Fh.hasOwnProperty(u) &&
        (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    a = Array(u);
    for (var l = 0; l < u; l++) a[l] = arguments[l + 2];
    r.children = a;
  }
  return { $$typeof: Di, type: e.type, key: i, ref: o, props: r, _owner: s };
};
L.createContext = function (e) {
  return (
    (e = {
      $$typeof: Av,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Nv, _context: e }),
    (e.Consumer = e)
  );
};
L.createElement = Lh;
L.createFactory = function (e) {
  var t = Lh.bind(null, e);
  return (t.type = e), t;
};
L.createRef = function () {
  return { current: null };
};
L.forwardRef = function (e) {
  return { $$typeof: $v, render: e };
};
L.isValidElement = Vl;
L.lazy = function (e) {
  return { $$typeof: Lv, _payload: { _status: -1, _result: e }, _init: Uv };
};
L.memo = function (e, t) {
  return { $$typeof: Fv, type: e, compare: t === void 0 ? null : t };
};
L.startTransition = function (e) {
  var t = yo.transition;
  yo.transition = {};
  try {
    e();
  } finally {
    yo.transition = t;
  }
};
L.unstable_act = function () {
  throw Error("act(...) is not supported in production builds of React.");
};
L.useCallback = function (e, t) {
  return Re.current.useCallback(e, t);
};
L.useContext = function (e) {
  return Re.current.useContext(e);
};
L.useDebugValue = function () {};
L.useDeferredValue = function (e) {
  return Re.current.useDeferredValue(e);
};
L.useEffect = function (e, t) {
  return Re.current.useEffect(e, t);
};
L.useId = function () {
  return Re.current.useId();
};
L.useImperativeHandle = function (e, t, n) {
  return Re.current.useImperativeHandle(e, t, n);
};
L.useInsertionEffect = function (e, t) {
  return Re.current.useInsertionEffect(e, t);
};
L.useLayoutEffect = function (e, t) {
  return Re.current.useLayoutEffect(e, t);
};
L.useMemo = function (e, t) {
  return Re.current.useMemo(e, t);
};
L.useReducer = function (e, t, n) {
  return Re.current.useReducer(e, t, n);
};
L.useRef = function (e) {
  return Re.current.useRef(e);
};
L.useState = function (e) {
  return Re.current.useState(e);
};
L.useSyncExternalStore = function (e, t, n) {
  return Re.current.useSyncExternalStore(e, t, n);
};
L.useTransition = function () {
  return Re.current.useTransition();
};
L.version = "18.2.0";
(function (e) {
  e.exports = L;
})(kv);
const ee = Th(O),
  fu = Ov({ __proto__: null, default: ee }, [O]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var zv = O,
  Vv = Symbol.for("react.element"),
  Qv = Symbol.for("react.fragment"),
  qv = Object.prototype.hasOwnProperty,
  Hv = zv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Wv = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ih(e, t, n) {
  var r,
    i = {},
    o = null,
    s = null;
  n !== void 0 && (o = "" + n),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (s = t.ref);
  for (r in t) qv.call(t, r) && !Wv.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
  return {
    $$typeof: Vv,
    type: e,
    key: o,
    ref: s,
    props: i,
    _owner: Hv.current,
  };
}
$s.Fragment = Qv;
$s.jsx = Ih;
$s.jsxs = Ih;
(function (e) {
  e.exports = $s;
})(xv);
const In = li.Fragment,
  w = li.jsx,
  N = li.jsxs;
var du = {},
  ci = {},
  Kv = {
    get exports() {
      return ci;
    },
    set exports(e) {
      ci = e;
    },
  },
  Qe = {},
  hu = {},
  Gv = {
    get exports() {
      return hu;
    },
    set exports(e) {
      hu = e;
    },
  },
  Mh = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(S, _) {
    var D = S.length;
    S.push(_);
    e: for (; 0 < D; ) {
      var z = (D - 1) >>> 1,
        W = S[z];
      if (0 < i(W, _)) (S[z] = _), (S[D] = W), (D = z);
      else break e;
    }
  }
  function n(S) {
    return S.length === 0 ? null : S[0];
  }
  function r(S) {
    if (S.length === 0) return null;
    var _ = S[0],
      D = S.pop();
    if (D !== _) {
      S[0] = D;
      e: for (var z = 0, W = S.length, Qn = W >>> 1; z < Qn; ) {
        var Pt = 2 * (z + 1) - 1,
          qi = S[Pt],
          En = Pt + 1,
          Hi = S[En];
        if (0 > i(qi, D))
          En < W && 0 > i(Hi, qi)
            ? ((S[z] = Hi), (S[En] = D), (z = En))
            : ((S[z] = qi), (S[Pt] = D), (z = Pt));
        else if (En < W && 0 > i(Hi, D)) (S[z] = Hi), (S[En] = D), (z = En);
        else break e;
      }
    }
    return _;
  }
  function i(S, _) {
    var D = S.sortIndex - _.sortIndex;
    return D !== 0 ? D : S.id - _.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var s = Date,
      a = s.now();
    e.unstable_now = function () {
      return s.now() - a;
    };
  }
  var u = [],
    l = [],
    c = 1,
    f = null,
    d = 3,
    y = !1,
    p = !1,
    v = !1,
    C = typeof setTimeout == "function" ? setTimeout : null,
    m = typeof clearTimeout == "function" ? clearTimeout : null,
    h = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function g(S) {
    for (var _ = n(l); _ !== null; ) {
      if (_.callback === null) r(l);
      else if (_.startTime <= S)
        r(l), (_.sortIndex = _.expirationTime), t(u, _);
      else break;
      _ = n(l);
    }
  }
  function E(S) {
    if (((v = !1), g(S), !p))
      if (n(u) !== null) (p = !0), ye(x);
      else {
        var _ = n(l);
        _ !== null && We(E, _.startTime - S);
      }
  }
  function x(S, _) {
    (p = !1), v && ((v = !1), m(A), (A = -1)), (y = !0);
    var D = d;
    try {
      for (
        g(_), f = n(u);
        f !== null && (!(f.expirationTime > _) || (S && !B()));

      ) {
        var z = f.callback;
        if (typeof z == "function") {
          (f.callback = null), (d = f.priorityLevel);
          var W = z(f.expirationTime <= _);
          (_ = e.unstable_now()),
            typeof W == "function" ? (f.callback = W) : f === n(u) && r(u),
            g(_);
        } else r(u);
        f = n(u);
      }
      if (f !== null) var Qn = !0;
      else {
        var Pt = n(l);
        Pt !== null && We(E, Pt.startTime - _), (Qn = !1);
      }
      return Qn;
    } finally {
      (f = null), (d = D), (y = !1);
    }
  }
  var k = !1,
    T = null,
    A = -1,
    F = 5,
    R = -1;
  function B() {
    return !(e.unstable_now() - R < F);
  }
  function Se() {
    if (T !== null) {
      var S = e.unstable_now();
      R = S;
      var _ = !0;
      try {
        _ = T(!0, S);
      } finally {
        _ ? Ee() : ((k = !1), (T = null));
      }
    } else k = !1;
  }
  var Ee;
  if (typeof h == "function")
    Ee = function () {
      h(Se);
    };
  else if (typeof MessageChannel < "u") {
    var Ae = new MessageChannel(),
      rt = Ae.port2;
    (Ae.port1.onmessage = Se),
      (Ee = function () {
        rt.postMessage(null);
      });
  } else
    Ee = function () {
      C(Se, 0);
    };
  function ye(S) {
    (T = S), k || ((k = !0), Ee());
  }
  function We(S, _) {
    A = C(function () {
      S(e.unstable_now());
    }, _);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (S) {
      S.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      p || y || ((p = !0), ye(x));
    }),
    (e.unstable_forceFrameRate = function (S) {
      0 > S || 125 < S
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (F = 0 < S ? Math.floor(1e3 / S) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return d;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(u);
    }),
    (e.unstable_next = function (S) {
      switch (d) {
        case 1:
        case 2:
        case 3:
          var _ = 3;
          break;
        default:
          _ = d;
      }
      var D = d;
      d = _;
      try {
        return S();
      } finally {
        d = D;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (S, _) {
      switch (S) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          S = 3;
      }
      var D = d;
      d = S;
      try {
        return _();
      } finally {
        d = D;
      }
    }),
    (e.unstable_scheduleCallback = function (S, _, D) {
      var z = e.unstable_now();
      switch (
        (typeof D == "object" && D !== null
          ? ((D = D.delay), (D = typeof D == "number" && 0 < D ? z + D : z))
          : (D = z),
        S)
      ) {
        case 1:
          var W = -1;
          break;
        case 2:
          W = 250;
          break;
        case 5:
          W = 1073741823;
          break;
        case 4:
          W = 1e4;
          break;
        default:
          W = 5e3;
      }
      return (
        (W = D + W),
        (S = {
          id: c++,
          callback: _,
          priorityLevel: S,
          startTime: D,
          expirationTime: W,
          sortIndex: -1,
        }),
        D > z
          ? ((S.sortIndex = D),
            t(l, S),
            n(u) === null &&
              S === n(l) &&
              (v ? (m(A), (A = -1)) : (v = !0), We(E, D - z)))
          : ((S.sortIndex = W), t(u, S), p || y || ((p = !0), ye(x))),
        S
      );
    }),
    (e.unstable_shouldYield = B),
    (e.unstable_wrapCallback = function (S) {
      var _ = d;
      return function () {
        var D = d;
        d = _;
        try {
          return S.apply(this, arguments);
        } finally {
          d = D;
        }
      };
    });
})(Mh);
(function (e) {
  e.exports = Mh;
})(Gv);
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var jh = O,
  ze = hu;
function b(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Uh = new Set(),
  fi = {};
function Mn(e, t) {
  mr(e, t), mr(e + "Capture", t);
}
function mr(e, t) {
  for (fi[e] = t, e = 0; e < t.length; e++) Uh.add(t[e]);
}
var At = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  pu = Object.prototype.hasOwnProperty,
  Yv =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  yf = {},
  vf = {};
function Jv(e) {
  return pu.call(vf, e)
    ? !0
    : pu.call(yf, e)
    ? !1
    : Yv.test(e)
    ? (vf[e] = !0)
    : ((yf[e] = !0), !1);
}
function Xv(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Zv(e, t, n, r) {
  if (t === null || typeof t > "u" || Xv(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function Ne(e, t, n, r, i, o, s) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = s);
}
var we = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    we[e] = new Ne(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  we[t] = new Ne(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  we[e] = new Ne(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  we[e] = new Ne(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    we[e] = new Ne(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  we[e] = new Ne(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  we[e] = new Ne(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  we[e] = new Ne(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  we[e] = new Ne(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Ql = /[\-:]([a-z])/g;
function ql(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Ql, ql);
    we[t] = new Ne(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Ql, ql);
    we[t] = new Ne(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Ql, ql);
  we[t] = new Ne(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  we[e] = new Ne(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
we.xlinkHref = new Ne(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  we[e] = new Ne(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Hl(e, t, n, r) {
  var i = we.hasOwnProperty(t) ? we[t] : null;
  (i !== null
    ? i.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Zv(t, n, i, r) && (n = null),
    r || i === null
      ? Jv(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : i.mustUseProperty
      ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
      : ((t = i.attributeName),
        (r = i.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((i = i.type),
            (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Mt = jh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Ki = Symbol.for("react.element"),
  Kn = Symbol.for("react.portal"),
  Gn = Symbol.for("react.fragment"),
  Wl = Symbol.for("react.strict_mode"),
  mu = Symbol.for("react.profiler"),
  Bh = Symbol.for("react.provider"),
  zh = Symbol.for("react.context"),
  Kl = Symbol.for("react.forward_ref"),
  yu = Symbol.for("react.suspense"),
  vu = Symbol.for("react.suspense_list"),
  Gl = Symbol.for("react.memo"),
  zt = Symbol.for("react.lazy"),
  Vh = Symbol.for("react.offscreen"),
  gf = Symbol.iterator;
function Dr(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (gf && e[gf]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var ne = Object.assign,
  ka;
function qr(e) {
  if (ka === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      ka = (t && t[1]) || "";
    }
  return (
    `
` +
    ka +
    e
  );
}
var ba = !1;
function _a(e, t) {
  if (!e || ba) return "";
  ba = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (l) {
          var r = l;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (l) {
          r = l;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (l) {
        r = l;
      }
      e();
    }
  } catch (l) {
    if (l && r && typeof l.stack == "string") {
      for (
        var i = l.stack.split(`
`),
          o = r.stack.split(`
`),
          s = i.length - 1,
          a = o.length - 1;
        1 <= s && 0 <= a && i[s] !== o[a];

      )
        a--;
      for (; 1 <= s && 0 <= a; s--, a--)
        if (i[s] !== o[a]) {
          if (s !== 1 || a !== 1)
            do
              if ((s--, a--, 0 > a || i[s] !== o[a])) {
                var u =
                  `
` + i[s].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    u.includes("<anonymous>") &&
                    (u = u.replace("<anonymous>", e.displayName)),
                  u
                );
              }
            while (1 <= s && 0 <= a);
          break;
        }
    }
  } finally {
    (ba = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? qr(e) : "";
}
function eg(e) {
  switch (e.tag) {
    case 5:
      return qr(e.type);
    case 16:
      return qr("Lazy");
    case 13:
      return qr("Suspense");
    case 19:
      return qr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = _a(e.type, !1)), e;
    case 11:
      return (e = _a(e.type.render, !1)), e;
    case 1:
      return (e = _a(e.type, !0)), e;
    default:
      return "";
  }
}
function gu(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Gn:
      return "Fragment";
    case Kn:
      return "Portal";
    case mu:
      return "Profiler";
    case Wl:
      return "StrictMode";
    case yu:
      return "Suspense";
    case vu:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case zh:
        return (e.displayName || "Context") + ".Consumer";
      case Bh:
        return (e._context.displayName || "Context") + ".Provider";
      case Kl:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Gl:
        return (
          (t = e.displayName || null), t !== null ? t : gu(e.type) || "Memo"
        );
      case zt:
        (t = e._payload), (e = e._init);
        try {
          return gu(e(t));
        } catch {}
    }
  return null;
}
function tg(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return gu(t);
    case 8:
      return t === Wl ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function dn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Qh(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function ng(e) {
  var t = Qh(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var i = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (s) {
          (r = "" + s), o.call(this, s);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (s) {
          r = "" + s;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function Gi(e) {
  e._valueTracker || (e._valueTracker = ng(e));
}
function qh(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Qh(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Bo(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function wu(e, t) {
  var n = t.checked;
  return ne({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function wf(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = dn(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function Hh(e, t) {
  (t = t.checked), t != null && Hl(e, "checked", t, !1);
}
function Su(e, t) {
  Hh(e, t);
  var n = dn(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? Eu(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Eu(e, t.type, dn(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function Sf(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function Eu(e, t, n) {
  (t !== "number" || Bo(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Hr = Array.isArray;
function sr(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      (i = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + dn(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        (e[i].selected = !0), r && (e[i].defaultSelected = !0);
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function Cu(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(b(91));
  return ne({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Ef(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(b(92));
      if (Hr(n)) {
        if (1 < n.length) throw Error(b(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: dn(n) };
}
function Wh(e, t) {
  var n = dn(t.value),
    r = dn(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function Cf(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Kh(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Ou(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Kh(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var Yi,
  Gh = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, i);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        Yi = Yi || document.createElement("div"),
          Yi.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Yi.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function di(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Zr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  rg = ["Webkit", "ms", "Moz", "O"];
Object.keys(Zr).forEach(function (e) {
  rg.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Zr[t] = Zr[e]);
  });
});
function Yh(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Zr.hasOwnProperty(e) && Zr[e])
    ? ("" + t).trim()
    : t + "px";
}
function Jh(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        i = Yh(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : (e[n] = i);
    }
}
var ig = ne(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function Pu(e, t) {
  if (t) {
    if (ig[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(b(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(b(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(b(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(b(62));
  }
}
function xu(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var ku = null;
function Yl(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var bu = null,
  ar = null,
  ur = null;
function Of(e) {
  if ((e = Ii(e))) {
    if (typeof bu != "function") throw Error(b(280));
    var t = e.stateNode;
    t && ((t = Ms(t)), bu(e.stateNode, e.type, t));
  }
}
function Xh(e) {
  ar ? (ur ? ur.push(e) : (ur = [e])) : (ar = e);
}
function Zh() {
  if (ar) {
    var e = ar,
      t = ur;
    if (((ur = ar = null), Of(e), t)) for (e = 0; e < t.length; e++) Of(t[e]);
  }
}
function ep(e, t) {
  return e(t);
}
function tp() {}
var Ta = !1;
function np(e, t, n) {
  if (Ta) return e(t, n);
  Ta = !0;
  try {
    return ep(e, t, n);
  } finally {
    (Ta = !1), (ar !== null || ur !== null) && (tp(), Zh());
  }
}
function hi(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Ms(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(b(231, t, typeof n));
  return n;
}
var _u = !1;
if (At)
  try {
    var Fr = {};
    Object.defineProperty(Fr, "passive", {
      get: function () {
        _u = !0;
      },
    }),
      window.addEventListener("test", Fr, Fr),
      window.removeEventListener("test", Fr, Fr);
  } catch {
    _u = !1;
  }
function og(e, t, n, r, i, o, s, a, u) {
  var l = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, l);
  } catch (c) {
    this.onError(c);
  }
}
var ei = !1,
  zo = null,
  Vo = !1,
  Tu = null,
  sg = {
    onError: function (e) {
      (ei = !0), (zo = e);
    },
  };
function ag(e, t, n, r, i, o, s, a, u) {
  (ei = !1), (zo = null), og.apply(sg, arguments);
}
function ug(e, t, n, r, i, o, s, a, u) {
  if ((ag.apply(this, arguments), ei)) {
    if (ei) {
      var l = zo;
      (ei = !1), (zo = null);
    } else throw Error(b(198));
    Vo || ((Vo = !0), (Tu = l));
  }
}
function jn(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function rp(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Pf(e) {
  if (jn(e) !== e) throw Error(b(188));
}
function lg(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = jn(e)), t === null)) throw Error(b(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var i = n.return;
    if (i === null) break;
    var o = i.alternate;
    if (o === null) {
      if (((r = i.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === o.child) {
      for (o = i.child; o; ) {
        if (o === n) return Pf(i), e;
        if (o === r) return Pf(i), t;
        o = o.sibling;
      }
      throw Error(b(188));
    }
    if (n.return !== r.return) (n = i), (r = o);
    else {
      for (var s = !1, a = i.child; a; ) {
        if (a === n) {
          (s = !0), (n = i), (r = o);
          break;
        }
        if (a === r) {
          (s = !0), (r = i), (n = o);
          break;
        }
        a = a.sibling;
      }
      if (!s) {
        for (a = o.child; a; ) {
          if (a === n) {
            (s = !0), (n = o), (r = i);
            break;
          }
          if (a === r) {
            (s = !0), (r = o), (n = i);
            break;
          }
          a = a.sibling;
        }
        if (!s) throw Error(b(189));
      }
    }
    if (n.alternate !== r) throw Error(b(190));
  }
  if (n.tag !== 3) throw Error(b(188));
  return n.stateNode.current === n ? e : t;
}
function ip(e) {
  return (e = lg(e)), e !== null ? op(e) : null;
}
function op(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = op(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var sp = ze.unstable_scheduleCallback,
  xf = ze.unstable_cancelCallback,
  cg = ze.unstable_shouldYield,
  fg = ze.unstable_requestPaint,
  oe = ze.unstable_now,
  dg = ze.unstable_getCurrentPriorityLevel,
  Jl = ze.unstable_ImmediatePriority,
  ap = ze.unstable_UserBlockingPriority,
  Qo = ze.unstable_NormalPriority,
  hg = ze.unstable_LowPriority,
  up = ze.unstable_IdlePriority,
  Ds = null,
  wt = null;
function pg(e) {
  if (wt && typeof wt.onCommitFiberRoot == "function")
    try {
      wt.onCommitFiberRoot(Ds, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var dt = Math.clz32 ? Math.clz32 : vg,
  mg = Math.log,
  yg = Math.LN2;
function vg(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((mg(e) / yg) | 0)) | 0;
}
var Ji = 64,
  Xi = 4194304;
function Wr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function qo(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    o = e.pingedLanes,
    s = n & 268435455;
  if (s !== 0) {
    var a = s & ~i;
    a !== 0 ? (r = Wr(a)) : ((o &= s), o !== 0 && (r = Wr(o)));
  } else (s = n & ~i), s !== 0 ? (r = Wr(s)) : o !== 0 && (r = Wr(o));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & i) &&
    ((i = r & -r), (o = t & -t), i >= o || (i === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - dt(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
  return r;
}
function gg(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wg(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      i = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;

  ) {
    var s = 31 - dt(o),
      a = 1 << s,
      u = i[s];
    u === -1
      ? (!(a & n) || a & r) && (i[s] = gg(a, t))
      : u <= t && (e.expiredLanes |= a),
      (o &= ~a);
  }
}
function Ru(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function lp() {
  var e = Ji;
  return (Ji <<= 1), !(Ji & 4194240) && (Ji = 64), e;
}
function Ra(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Fi(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - dt(t)),
    (e[t] = n);
}
function Sg(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - dt(n),
      o = 1 << i;
    (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~o);
  }
}
function Xl(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - dt(n),
      i = 1 << r;
    (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
  }
}
var V = 0;
function cp(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var fp,
  Zl,
  dp,
  hp,
  pp,
  Nu = !1,
  Zi = [],
  Zt = null,
  en = null,
  tn = null,
  pi = new Map(),
  mi = new Map(),
  qt = [],
  Eg =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function kf(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Zt = null;
      break;
    case "dragenter":
    case "dragleave":
      en = null;
      break;
    case "mouseover":
    case "mouseout":
      tn = null;
      break;
    case "pointerover":
    case "pointerout":
      pi.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      mi.delete(t.pointerId);
  }
}
function Lr(e, t, n, r, i, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [i],
      }),
      t !== null && ((t = Ii(t)), t !== null && Zl(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function Cg(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return (Zt = Lr(Zt, e, t, n, r, i)), !0;
    case "dragenter":
      return (en = Lr(en, e, t, n, r, i)), !0;
    case "mouseover":
      return (tn = Lr(tn, e, t, n, r, i)), !0;
    case "pointerover":
      var o = i.pointerId;
      return pi.set(o, Lr(pi.get(o) || null, e, t, n, r, i)), !0;
    case "gotpointercapture":
      return (
        (o = i.pointerId), mi.set(o, Lr(mi.get(o) || null, e, t, n, r, i)), !0
      );
  }
  return !1;
}
function mp(e) {
  var t = xn(e.target);
  if (t !== null) {
    var n = jn(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = rp(n)), t !== null)) {
          (e.blockedOn = t),
            pp(e.priority, function () {
              dp(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function vo(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Au(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (ku = r), n.target.dispatchEvent(r), (ku = null);
    } else return (t = Ii(n)), t !== null && Zl(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function bf(e, t, n) {
  vo(e) && n.delete(t);
}
function Og() {
  (Nu = !1),
    Zt !== null && vo(Zt) && (Zt = null),
    en !== null && vo(en) && (en = null),
    tn !== null && vo(tn) && (tn = null),
    pi.forEach(bf),
    mi.forEach(bf);
}
function Ir(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Nu ||
      ((Nu = !0),
      ze.unstable_scheduleCallback(ze.unstable_NormalPriority, Og)));
}
function yi(e) {
  function t(i) {
    return Ir(i, e);
  }
  if (0 < Zi.length) {
    Ir(Zi[0], e);
    for (var n = 1; n < Zi.length; n++) {
      var r = Zi[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Zt !== null && Ir(Zt, e),
      en !== null && Ir(en, e),
      tn !== null && Ir(tn, e),
      pi.forEach(t),
      mi.forEach(t),
      n = 0;
    n < qt.length;
    n++
  )
    (r = qt[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < qt.length && ((n = qt[0]), n.blockedOn === null); )
    mp(n), n.blockedOn === null && qt.shift();
}
var lr = Mt.ReactCurrentBatchConfig,
  Ho = !0;
function Pg(e, t, n, r) {
  var i = V,
    o = lr.transition;
  lr.transition = null;
  try {
    (V = 1), ec(e, t, n, r);
  } finally {
    (V = i), (lr.transition = o);
  }
}
function xg(e, t, n, r) {
  var i = V,
    o = lr.transition;
  lr.transition = null;
  try {
    (V = 4), ec(e, t, n, r);
  } finally {
    (V = i), (lr.transition = o);
  }
}
function ec(e, t, n, r) {
  if (Ho) {
    var i = Au(e, t, n, r);
    if (i === null) Ua(e, t, r, Wo, n), kf(e, r);
    else if (Cg(i, e, t, n, r)) r.stopPropagation();
    else if ((kf(e, r), t & 4 && -1 < Eg.indexOf(e))) {
      for (; i !== null; ) {
        var o = Ii(i);
        if (
          (o !== null && fp(o),
          (o = Au(e, t, n, r)),
          o === null && Ua(e, t, r, Wo, n),
          o === i)
        )
          break;
        i = o;
      }
      i !== null && r.stopPropagation();
    } else Ua(e, t, r, null, n);
  }
}
var Wo = null;
function Au(e, t, n, r) {
  if (((Wo = null), (e = Yl(r)), (e = xn(e)), e !== null))
    if (((t = jn(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = rp(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Wo = e), null;
}
function yp(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (dg()) {
        case Jl:
          return 1;
        case ap:
          return 4;
        case Qo:
        case hg:
          return 16;
        case up:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Gt = null,
  tc = null,
  go = null;
function vp() {
  if (go) return go;
  var e,
    t = tc,
    n = t.length,
    r,
    i = "value" in Gt ? Gt.value : Gt.textContent,
    o = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++);
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === i[o - r]; r++);
  return (go = i.slice(e, 1 < r ? 1 - r : void 0));
}
function wo(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function eo() {
  return !0;
}
function _f() {
  return !1;
}
function qe(e) {
  function t(n, r, i, o, s) {
    (this._reactName = n),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = s),
      (this.currentTarget = null);
    for (var a in e)
      e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(o) : o[a]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? eo
        : _f),
      (this.isPropagationStopped = _f),
      this
    );
  }
  return (
    ne(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = eo));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = eo));
      },
      persist: function () {},
      isPersistent: eo,
    }),
    t
  );
}
var xr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  nc = qe(xr),
  Li = ne({}, xr, { view: 0, detail: 0 }),
  kg = qe(Li),
  Na,
  Aa,
  Mr,
  Fs = ne({}, Li, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: rc,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== Mr &&
            (Mr && e.type === "mousemove"
              ? ((Na = e.screenX - Mr.screenX), (Aa = e.screenY - Mr.screenY))
              : (Aa = Na = 0),
            (Mr = e)),
          Na);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Aa;
    },
  }),
  Tf = qe(Fs),
  bg = ne({}, Fs, { dataTransfer: 0 }),
  _g = qe(bg),
  Tg = ne({}, Li, { relatedTarget: 0 }),
  $a = qe(Tg),
  Rg = ne({}, xr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Ng = qe(Rg),
  Ag = ne({}, xr, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  $g = qe(Ag),
  Dg = ne({}, xr, { data: 0 }),
  Rf = qe(Dg),
  Fg = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Lg = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Ig = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Mg(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Ig[e]) ? !!t[e] : !1;
}
function rc() {
  return Mg;
}
var jg = ne({}, Li, {
    key: function (e) {
      if (e.key) {
        var t = Fg[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = wo(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? Lg[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: rc,
    charCode: function (e) {
      return e.type === "keypress" ? wo(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? wo(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  Ug = qe(jg),
  Bg = ne({}, Fs, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Nf = qe(Bg),
  zg = ne({}, Li, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: rc,
  }),
  Vg = qe(zg),
  Qg = ne({}, xr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  qg = qe(Qg),
  Hg = ne({}, Fs, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Wg = qe(Hg),
  Kg = [9, 13, 27, 32],
  ic = At && "CompositionEvent" in window,
  ti = null;
At && "documentMode" in document && (ti = document.documentMode);
var Gg = At && "TextEvent" in window && !ti,
  gp = At && (!ic || (ti && 8 < ti && 11 >= ti)),
  Af = String.fromCharCode(32),
  $f = !1;
function wp(e, t) {
  switch (e) {
    case "keyup":
      return Kg.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Sp(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var Yn = !1;
function Yg(e, t) {
  switch (e) {
    case "compositionend":
      return Sp(t);
    case "keypress":
      return t.which !== 32 ? null : (($f = !0), Af);
    case "textInput":
      return (e = t.data), e === Af && $f ? null : e;
    default:
      return null;
  }
}
function Jg(e, t) {
  if (Yn)
    return e === "compositionend" || (!ic && wp(e, t))
      ? ((e = vp()), (go = tc = Gt = null), (Yn = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return gp && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Xg = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Df(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Xg[e.type] : t === "textarea";
}
function Ep(e, t, n, r) {
  Xh(r),
    (t = Ko(t, "onChange")),
    0 < t.length &&
      ((n = new nc("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var ni = null,
  vi = null;
function Zg(e) {
  Ap(e, 0);
}
function Ls(e) {
  var t = Zn(e);
  if (qh(t)) return e;
}
function e0(e, t) {
  if (e === "change") return t;
}
var Cp = !1;
if (At) {
  var Da;
  if (At) {
    var Fa = "oninput" in document;
    if (!Fa) {
      var Ff = document.createElement("div");
      Ff.setAttribute("oninput", "return;"),
        (Fa = typeof Ff.oninput == "function");
    }
    Da = Fa;
  } else Da = !1;
  Cp = Da && (!document.documentMode || 9 < document.documentMode);
}
function Lf() {
  ni && (ni.detachEvent("onpropertychange", Op), (vi = ni = null));
}
function Op(e) {
  if (e.propertyName === "value" && Ls(vi)) {
    var t = [];
    Ep(t, vi, e, Yl(e)), np(Zg, t);
  }
}
function t0(e, t, n) {
  e === "focusin"
    ? (Lf(), (ni = t), (vi = n), ni.attachEvent("onpropertychange", Op))
    : e === "focusout" && Lf();
}
function n0(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Ls(vi);
}
function r0(e, t) {
  if (e === "click") return Ls(t);
}
function i0(e, t) {
  if (e === "input" || e === "change") return Ls(t);
}
function o0(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var pt = typeof Object.is == "function" ? Object.is : o0;
function gi(e, t) {
  if (pt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!pu.call(t, i) || !pt(e[i], t[i])) return !1;
  }
  return !0;
}
function If(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Mf(e, t) {
  var n = If(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = If(n);
  }
}
function Pp(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? Pp(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function xp() {
  for (var e = window, t = Bo(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Bo(e.document);
  }
  return t;
}
function oc(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function s0(e) {
  var t = xp(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Pp(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && oc(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var i = n.textContent.length,
          o = Math.min(r.start, i);
        (r = r.end === void 0 ? o : Math.min(r.end, i)),
          !e.extend && o > r && ((i = r), (r = o), (o = i)),
          (i = Mf(n, o));
        var s = Mf(n, r);
        i &&
          s &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== s.node ||
            e.focusOffset !== s.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(s.node, s.offset))
            : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var a0 = At && "documentMode" in document && 11 >= document.documentMode,
  Jn = null,
  $u = null,
  ri = null,
  Du = !1;
function jf(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Du ||
    Jn == null ||
    Jn !== Bo(r) ||
    ((r = Jn),
    "selectionStart" in r && oc(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (ri && gi(ri, r)) ||
      ((ri = r),
      (r = Ko($u, "onSelect")),
      0 < r.length &&
        ((t = new nc("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = Jn))));
}
function to(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Xn = {
    animationend: to("Animation", "AnimationEnd"),
    animationiteration: to("Animation", "AnimationIteration"),
    animationstart: to("Animation", "AnimationStart"),
    transitionend: to("Transition", "TransitionEnd"),
  },
  La = {},
  kp = {};
At &&
  ((kp = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Xn.animationend.animation,
    delete Xn.animationiteration.animation,
    delete Xn.animationstart.animation),
  "TransitionEvent" in window || delete Xn.transitionend.transition);
function Is(e) {
  if (La[e]) return La[e];
  if (!Xn[e]) return e;
  var t = Xn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in kp) return (La[e] = t[n]);
  return e;
}
var bp = Is("animationend"),
  _p = Is("animationiteration"),
  Tp = Is("animationstart"),
  Rp = Is("transitionend"),
  Np = new Map(),
  Uf =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function vn(e, t) {
  Np.set(e, t), Mn(t, [e]);
}
for (var Ia = 0; Ia < Uf.length; Ia++) {
  var Ma = Uf[Ia],
    u0 = Ma.toLowerCase(),
    l0 = Ma[0].toUpperCase() + Ma.slice(1);
  vn(u0, "on" + l0);
}
vn(bp, "onAnimationEnd");
vn(_p, "onAnimationIteration");
vn(Tp, "onAnimationStart");
vn("dblclick", "onDoubleClick");
vn("focusin", "onFocus");
vn("focusout", "onBlur");
vn(Rp, "onTransitionEnd");
mr("onMouseEnter", ["mouseout", "mouseover"]);
mr("onMouseLeave", ["mouseout", "mouseover"]);
mr("onPointerEnter", ["pointerout", "pointerover"]);
mr("onPointerLeave", ["pointerout", "pointerover"]);
Mn(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
Mn(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
Mn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Mn(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
Mn(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
Mn(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Kr =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  c0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Kr));
function Bf(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), ug(r, t, void 0, e), (e.currentTarget = null);
}
function Ap(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var s = r.length - 1; 0 <= s; s--) {
          var a = r[s],
            u = a.instance,
            l = a.currentTarget;
          if (((a = a.listener), u !== o && i.isPropagationStopped())) break e;
          Bf(i, a, l), (o = u);
        }
      else
        for (s = 0; s < r.length; s++) {
          if (
            ((a = r[s]),
            (u = a.instance),
            (l = a.currentTarget),
            (a = a.listener),
            u !== o && i.isPropagationStopped())
          )
            break e;
          Bf(i, a, l), (o = u);
        }
    }
  }
  if (Vo) throw ((e = Tu), (Vo = !1), (Tu = null), e);
}
function G(e, t) {
  var n = t[ju];
  n === void 0 && (n = t[ju] = new Set());
  var r = e + "__bubble";
  n.has(r) || ($p(t, e, 2, !1), n.add(r));
}
function ja(e, t, n) {
  var r = 0;
  t && (r |= 4), $p(n, e, r, t);
}
var no = "_reactListening" + Math.random().toString(36).slice(2);
function wi(e) {
  if (!e[no]) {
    (e[no] = !0),
      Uh.forEach(function (n) {
        n !== "selectionchange" && (c0.has(n) || ja(n, !1, e), ja(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[no] || ((t[no] = !0), ja("selectionchange", !1, t));
  }
}
function $p(e, t, n, r) {
  switch (yp(t)) {
    case 1:
      var i = Pg;
      break;
    case 4:
      i = xg;
      break;
    default:
      i = ec;
  }
  (n = i.bind(null, t, n, e)),
    (i = void 0),
    !_u ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: i })
        : e.addEventListener(t, n, !0)
      : i !== void 0
      ? e.addEventListener(t, n, { passive: i })
      : e.addEventListener(t, n, !1);
}
function Ua(e, t, n, r, i) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var s = r.tag;
      if (s === 3 || s === 4) {
        var a = r.stateNode.containerInfo;
        if (a === i || (a.nodeType === 8 && a.parentNode === i)) break;
        if (s === 4)
          for (s = r.return; s !== null; ) {
            var u = s.tag;
            if (
              (u === 3 || u === 4) &&
              ((u = s.stateNode.containerInfo),
              u === i || (u.nodeType === 8 && u.parentNode === i))
            )
              return;
            s = s.return;
          }
        for (; a !== null; ) {
          if (((s = xn(a)), s === null)) return;
          if (((u = s.tag), u === 5 || u === 6)) {
            r = o = s;
            continue e;
          }
          a = a.parentNode;
        }
      }
      r = r.return;
    }
  np(function () {
    var l = o,
      c = Yl(n),
      f = [];
    e: {
      var d = Np.get(e);
      if (d !== void 0) {
        var y = nc,
          p = e;
        switch (e) {
          case "keypress":
            if (wo(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = Ug;
            break;
          case "focusin":
            (p = "focus"), (y = $a);
            break;
          case "focusout":
            (p = "blur"), (y = $a);
            break;
          case "beforeblur":
          case "afterblur":
            y = $a;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            y = Tf;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = _g;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = Vg;
            break;
          case bp:
          case _p:
          case Tp:
            y = Ng;
            break;
          case Rp:
            y = qg;
            break;
          case "scroll":
            y = kg;
            break;
          case "wheel":
            y = Wg;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = $g;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = Nf;
        }
        var v = (t & 4) !== 0,
          C = !v && e === "scroll",
          m = v ? (d !== null ? d + "Capture" : null) : d;
        v = [];
        for (var h = l, g; h !== null; ) {
          g = h;
          var E = g.stateNode;
          if (
            (g.tag === 5 &&
              E !== null &&
              ((g = E),
              m !== null && ((E = hi(h, m)), E != null && v.push(Si(h, E, g)))),
            C)
          )
            break;
          h = h.return;
        }
        0 < v.length &&
          ((d = new y(d, p, null, n, c)), f.push({ event: d, listeners: v }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((d = e === "mouseover" || e === "pointerover"),
          (y = e === "mouseout" || e === "pointerout"),
          d &&
            n !== ku &&
            (p = n.relatedTarget || n.fromElement) &&
            (xn(p) || p[$t]))
        )
          break e;
        if (
          (y || d) &&
          ((d =
            c.window === c
              ? c
              : (d = c.ownerDocument)
              ? d.defaultView || d.parentWindow
              : window),
          y
            ? ((p = n.relatedTarget || n.toElement),
              (y = l),
              (p = p ? xn(p) : null),
              p !== null &&
                ((C = jn(p)), p !== C || (p.tag !== 5 && p.tag !== 6)) &&
                (p = null))
            : ((y = null), (p = l)),
          y !== p)
        ) {
          if (
            ((v = Tf),
            (E = "onMouseLeave"),
            (m = "onMouseEnter"),
            (h = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((v = Nf),
              (E = "onPointerLeave"),
              (m = "onPointerEnter"),
              (h = "pointer")),
            (C = y == null ? d : Zn(y)),
            (g = p == null ? d : Zn(p)),
            (d = new v(E, h + "leave", y, n, c)),
            (d.target = C),
            (d.relatedTarget = g),
            (E = null),
            xn(c) === l &&
              ((v = new v(m, h + "enter", p, n, c)),
              (v.target = g),
              (v.relatedTarget = C),
              (E = v)),
            (C = E),
            y && p)
          )
            t: {
              for (v = y, m = p, h = 0, g = v; g; g = qn(g)) h++;
              for (g = 0, E = m; E; E = qn(E)) g++;
              for (; 0 < h - g; ) (v = qn(v)), h--;
              for (; 0 < g - h; ) (m = qn(m)), g--;
              for (; h--; ) {
                if (v === m || (m !== null && v === m.alternate)) break t;
                (v = qn(v)), (m = qn(m));
              }
              v = null;
            }
          else v = null;
          y !== null && zf(f, d, y, v, !1),
            p !== null && C !== null && zf(f, C, p, v, !0);
        }
      }
      e: {
        if (
          ((d = l ? Zn(l) : window),
          (y = d.nodeName && d.nodeName.toLowerCase()),
          y === "select" || (y === "input" && d.type === "file"))
        )
          var x = e0;
        else if (Df(d))
          if (Cp) x = i0;
          else {
            x = n0;
            var k = t0;
          }
        else
          (y = d.nodeName) &&
            y.toLowerCase() === "input" &&
            (d.type === "checkbox" || d.type === "radio") &&
            (x = r0);
        if (x && (x = x(e, l))) {
          Ep(f, x, n, c);
          break e;
        }
        k && k(e, d, l),
          e === "focusout" &&
            (k = d._wrapperState) &&
            k.controlled &&
            d.type === "number" &&
            Eu(d, "number", d.value);
      }
      switch (((k = l ? Zn(l) : window), e)) {
        case "focusin":
          (Df(k) || k.contentEditable === "true") &&
            ((Jn = k), ($u = l), (ri = null));
          break;
        case "focusout":
          ri = $u = Jn = null;
          break;
        case "mousedown":
          Du = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (Du = !1), jf(f, n, c);
          break;
        case "selectionchange":
          if (a0) break;
        case "keydown":
        case "keyup":
          jf(f, n, c);
      }
      var T;
      if (ic)
        e: {
          switch (e) {
            case "compositionstart":
              var A = "onCompositionStart";
              break e;
            case "compositionend":
              A = "onCompositionEnd";
              break e;
            case "compositionupdate":
              A = "onCompositionUpdate";
              break e;
          }
          A = void 0;
        }
      else
        Yn
          ? wp(e, n) && (A = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (A = "onCompositionStart");
      A &&
        (gp &&
          n.locale !== "ko" &&
          (Yn || A !== "onCompositionStart"
            ? A === "onCompositionEnd" && Yn && (T = vp())
            : ((Gt = c),
              (tc = "value" in Gt ? Gt.value : Gt.textContent),
              (Yn = !0))),
        (k = Ko(l, A)),
        0 < k.length &&
          ((A = new Rf(A, e, null, n, c)),
          f.push({ event: A, listeners: k }),
          T ? (A.data = T) : ((T = Sp(n)), T !== null && (A.data = T)))),
        (T = Gg ? Yg(e, n) : Jg(e, n)) &&
          ((l = Ko(l, "onBeforeInput")),
          0 < l.length &&
            ((c = new Rf("onBeforeInput", "beforeinput", null, n, c)),
            f.push({ event: c, listeners: l }),
            (c.data = T)));
    }
    Ap(f, t);
  });
}
function Si(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Ko(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var i = e,
      o = i.stateNode;
    i.tag === 5 &&
      o !== null &&
      ((i = o),
      (o = hi(e, n)),
      o != null && r.unshift(Si(e, o, i)),
      (o = hi(e, t)),
      o != null && r.push(Si(e, o, i))),
      (e = e.return);
  }
  return r;
}
function qn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function zf(e, t, n, r, i) {
  for (var o = t._reactName, s = []; n !== null && n !== r; ) {
    var a = n,
      u = a.alternate,
      l = a.stateNode;
    if (u !== null && u === r) break;
    a.tag === 5 &&
      l !== null &&
      ((a = l),
      i
        ? ((u = hi(n, o)), u != null && s.unshift(Si(n, u, a)))
        : i || ((u = hi(n, o)), u != null && s.push(Si(n, u, a)))),
      (n = n.return);
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var f0 = /\r\n?/g,
  d0 = /\u0000|\uFFFD/g;
function Vf(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      f0,
      `
`
    )
    .replace(d0, "");
}
function ro(e, t, n) {
  if (((t = Vf(t)), Vf(e) !== t && n)) throw Error(b(425));
}
function Go() {}
var Fu = null,
  Lu = null;
function Iu(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Mu = typeof setTimeout == "function" ? setTimeout : void 0,
  h0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Qf = typeof Promise == "function" ? Promise : void 0,
  p0 =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Qf < "u"
      ? function (e) {
          return Qf.resolve(null).then(e).catch(m0);
        }
      : Mu;
function m0(e) {
  setTimeout(function () {
    throw e;
  });
}
function Ba(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(i), yi(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = i;
  } while (n);
  yi(t);
}
function nn(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function qf(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var kr = Math.random().toString(36).slice(2),
  vt = "__reactFiber$" + kr,
  Ei = "__reactProps$" + kr,
  $t = "__reactContainer$" + kr,
  ju = "__reactEvents$" + kr,
  y0 = "__reactListeners$" + kr,
  v0 = "__reactHandles$" + kr;
function xn(e) {
  var t = e[vt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[$t] || n[vt])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = qf(e); e !== null; ) {
          if ((n = e[vt])) return n;
          e = qf(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function Ii(e) {
  return (
    (e = e[vt] || e[$t]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Zn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(b(33));
}
function Ms(e) {
  return e[Ei] || null;
}
var Uu = [],
  er = -1;
function gn(e) {
  return { current: e };
}
function Y(e) {
  0 > er || ((e.current = Uu[er]), (Uu[er] = null), er--);
}
function K(e, t) {
  er++, (Uu[er] = e.current), (e.current = t);
}
var hn = {},
  be = gn(hn),
  Fe = gn(!1),
  Nn = hn;
function yr(e, t) {
  var n = e.type.contextTypes;
  if (!n) return hn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    o;
  for (o in n) i[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  );
}
function Le(e) {
  return (e = e.childContextTypes), e != null;
}
function Yo() {
  Y(Fe), Y(be);
}
function Hf(e, t, n) {
  if (be.current !== hn) throw Error(b(168));
  K(be, t), K(Fe, n);
}
function Dp(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(b(108, tg(e) || "Unknown", i));
  return ne({}, n, r);
}
function Jo(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || hn),
    (Nn = be.current),
    K(be, e),
    K(Fe, Fe.current),
    !0
  );
}
function Wf(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(b(169));
  n
    ? ((e = Dp(e, t, Nn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      Y(Fe),
      Y(be),
      K(be, e))
    : Y(Fe),
    K(Fe, n);
}
var bt = null,
  js = !1,
  za = !1;
function Fp(e) {
  bt === null ? (bt = [e]) : bt.push(e);
}
function g0(e) {
  (js = !0), Fp(e);
}
function wn() {
  if (!za && bt !== null) {
    za = !0;
    var e = 0,
      t = V;
    try {
      var n = bt;
      for (V = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (bt = null), (js = !1);
    } catch (i) {
      throw (bt !== null && (bt = bt.slice(e + 1)), sp(Jl, wn), i);
    } finally {
      (V = t), (za = !1);
    }
  }
  return null;
}
var tr = [],
  nr = 0,
  Xo = null,
  Zo = 0,
  Ke = [],
  Ge = 0,
  An = null,
  _t = 1,
  Tt = "";
function Cn(e, t) {
  (tr[nr++] = Zo), (tr[nr++] = Xo), (Xo = e), (Zo = t);
}
function Lp(e, t, n) {
  (Ke[Ge++] = _t), (Ke[Ge++] = Tt), (Ke[Ge++] = An), (An = e);
  var r = _t;
  e = Tt;
  var i = 32 - dt(r) - 1;
  (r &= ~(1 << i)), (n += 1);
  var o = 32 - dt(t) + i;
  if (30 < o) {
    var s = i - (i % 5);
    (o = (r & ((1 << s) - 1)).toString(32)),
      (r >>= s),
      (i -= s),
      (_t = (1 << (32 - dt(t) + i)) | (n << i) | r),
      (Tt = o + e);
  } else (_t = (1 << o) | (n << i) | r), (Tt = e);
}
function sc(e) {
  e.return !== null && (Cn(e, 1), Lp(e, 1, 0));
}
function ac(e) {
  for (; e === Xo; )
    (Xo = tr[--nr]), (tr[nr] = null), (Zo = tr[--nr]), (tr[nr] = null);
  for (; e === An; )
    (An = Ke[--Ge]),
      (Ke[Ge] = null),
      (Tt = Ke[--Ge]),
      (Ke[Ge] = null),
      (_t = Ke[--Ge]),
      (Ke[Ge] = null);
}
var Be = null,
  je = null,
  X = !1,
  ct = null;
function Ip(e, t) {
  var n = Je(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Kf(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Be = e), (je = nn(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Be = e), (je = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = An !== null ? { id: _t, overflow: Tt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Je(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Be = e),
            (je = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Bu(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function zu(e) {
  if (X) {
    var t = je;
    if (t) {
      var n = t;
      if (!Kf(e, t)) {
        if (Bu(e)) throw Error(b(418));
        t = nn(n.nextSibling);
        var r = Be;
        t && Kf(e, t)
          ? Ip(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (X = !1), (Be = e));
      }
    } else {
      if (Bu(e)) throw Error(b(418));
      (e.flags = (e.flags & -4097) | 2), (X = !1), (Be = e);
    }
  }
}
function Gf(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Be = e;
}
function io(e) {
  if (e !== Be) return !1;
  if (!X) return Gf(e), (X = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Iu(e.type, e.memoizedProps))),
    t && (t = je))
  ) {
    if (Bu(e)) throw (Mp(), Error(b(418)));
    for (; t; ) Ip(e, t), (t = nn(t.nextSibling));
  }
  if ((Gf(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(b(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              je = nn(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      je = null;
    }
  } else je = Be ? nn(e.stateNode.nextSibling) : null;
  return !0;
}
function Mp() {
  for (var e = je; e; ) e = nn(e.nextSibling);
}
function vr() {
  (je = Be = null), (X = !1);
}
function uc(e) {
  ct === null ? (ct = [e]) : ct.push(e);
}
var w0 = Mt.ReactCurrentBatchConfig;
function st(e, t) {
  if (e && e.defaultProps) {
    (t = ne({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var es = gn(null),
  ts = null,
  rr = null,
  lc = null;
function cc() {
  lc = rr = ts = null;
}
function fc(e) {
  var t = es.current;
  Y(es), (e._currentValue = t);
}
function Vu(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function cr(e, t) {
  (ts = e),
    (lc = rr = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (De = !0), (e.firstContext = null));
}
function et(e) {
  var t = e._currentValue;
  if (lc !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), rr === null)) {
      if (ts === null) throw Error(b(308));
      (rr = e), (ts.dependencies = { lanes: 0, firstContext: e });
    } else rr = rr.next = e;
  return t;
}
var kn = null;
function dc(e) {
  kn === null ? (kn = [e]) : kn.push(e);
}
function jp(e, t, n, r) {
  var i = t.interleaved;
  return (
    i === null ? ((n.next = n), dc(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    Dt(e, r)
  );
}
function Dt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var Vt = !1;
function hc(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Up(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Rt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function rn(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), j & 2)) {
    var i = r.pending;
    return (
      i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
      (r.pending = t),
      Dt(e, n)
    );
  }
  return (
    (i = r.interleaved),
    i === null ? ((t.next = t), dc(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    Dt(e, n)
  );
}
function So(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Xl(e, n);
  }
}
function Yf(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var i = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var s = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        o === null ? (i = o = s) : (o = o.next = s), (n = n.next);
      } while (n !== null);
      o === null ? (i = o = t) : (o = o.next = t);
    } else i = o = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function ns(e, t, n, r) {
  var i = e.updateQueue;
  Vt = !1;
  var o = i.firstBaseUpdate,
    s = i.lastBaseUpdate,
    a = i.shared.pending;
  if (a !== null) {
    i.shared.pending = null;
    var u = a,
      l = u.next;
    (u.next = null), s === null ? (o = l) : (s.next = l), (s = u);
    var c = e.alternate;
    c !== null &&
      ((c = c.updateQueue),
      (a = c.lastBaseUpdate),
      a !== s &&
        (a === null ? (c.firstBaseUpdate = l) : (a.next = l),
        (c.lastBaseUpdate = u)));
  }
  if (o !== null) {
    var f = i.baseState;
    (s = 0), (c = l = u = null), (a = o);
    do {
      var d = a.lane,
        y = a.eventTime;
      if ((r & d) === d) {
        c !== null &&
          (c = c.next =
            {
              eventTime: y,
              lane: 0,
              tag: a.tag,
              payload: a.payload,
              callback: a.callback,
              next: null,
            });
        e: {
          var p = e,
            v = a;
          switch (((d = t), (y = n), v.tag)) {
            case 1:
              if (((p = v.payload), typeof p == "function")) {
                f = p.call(y, f, d);
                break e;
              }
              f = p;
              break e;
            case 3:
              p.flags = (p.flags & -65537) | 128;
            case 0:
              if (
                ((p = v.payload),
                (d = typeof p == "function" ? p.call(y, f, d) : p),
                d == null)
              )
                break e;
              f = ne({}, f, d);
              break e;
            case 2:
              Vt = !0;
          }
        }
        a.callback !== null &&
          a.lane !== 0 &&
          ((e.flags |= 64),
          (d = i.effects),
          d === null ? (i.effects = [a]) : d.push(a));
      } else
        (y = {
          eventTime: y,
          lane: d,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null,
        }),
          c === null ? ((l = c = y), (u = f)) : (c = c.next = y),
          (s |= d);
      if (((a = a.next), a === null)) {
        if (((a = i.shared.pending), a === null)) break;
        (d = a),
          (a = d.next),
          (d.next = null),
          (i.lastBaseUpdate = d),
          (i.shared.pending = null);
      }
    } while (1);
    if (
      (c === null && (u = f),
      (i.baseState = u),
      (i.firstBaseUpdate = l),
      (i.lastBaseUpdate = c),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t;
      do (s |= i.lane), (i = i.next);
      while (i !== t);
    } else o === null && (i.shared.lanes = 0);
    (Dn |= s), (e.lanes = s), (e.memoizedState = f);
  }
}
function Jf(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != "function"))
          throw Error(b(191, i));
        i.call(r);
      }
    }
}
var Bp = new jh.Component().refs;
function Qu(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : ne({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Us = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? jn(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Te(),
      i = sn(e),
      o = Rt(r, i);
    (o.payload = t),
      n != null && (o.callback = n),
      (t = rn(e, o, i)),
      t !== null && (ht(t, e, i, r), So(t, e, i));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Te(),
      i = sn(e),
      o = Rt(r, i);
    (o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = rn(e, o, i)),
      t !== null && (ht(t, e, i, r), So(t, e, i));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Te(),
      r = sn(e),
      i = Rt(n, r);
    (i.tag = 2),
      t != null && (i.callback = t),
      (t = rn(e, i, r)),
      t !== null && (ht(t, e, r, n), So(t, e, r));
  },
};
function Xf(e, t, n, r, i, o, s) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, o, s)
      : t.prototype && t.prototype.isPureReactComponent
      ? !gi(n, r) || !gi(i, o)
      : !0
  );
}
function zp(e, t, n) {
  var r = !1,
    i = hn,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = et(o))
      : ((i = Le(t) ? Nn : be.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? yr(e, i) : hn)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Us),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function Zf(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Us.enqueueReplaceState(t, t.state, null);
}
function qu(e, t, n, r) {
  var i = e.stateNode;
  (i.props = n), (i.state = e.memoizedState), (i.refs = Bp), hc(e);
  var o = t.contextType;
  typeof o == "object" && o !== null
    ? (i.context = et(o))
    : ((o = Le(t) ? Nn : be.current), (i.context = yr(e, o))),
    (i.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (Qu(e, t, o, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function" ||
      (typeof i.UNSAFE_componentWillMount != "function" &&
        typeof i.componentWillMount != "function") ||
      ((t = i.state),
      typeof i.componentWillMount == "function" && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == "function" &&
        i.UNSAFE_componentWillMount(),
      t !== i.state && Us.enqueueReplaceState(i, i.state, null),
      ns(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function jr(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(b(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(b(147, e));
      var i = r,
        o = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (s) {
            var a = i.refs;
            a === Bp && (a = i.refs = {}),
              s === null ? delete a[o] : (a[o] = s);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(b(284));
    if (!n._owner) throw Error(b(290, e));
  }
  return e;
}
function oo(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      b(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function ed(e) {
  var t = e._init;
  return t(e._payload);
}
function Vp(e) {
  function t(m, h) {
    if (e) {
      var g = m.deletions;
      g === null ? ((m.deletions = [h]), (m.flags |= 16)) : g.push(h);
    }
  }
  function n(m, h) {
    if (!e) return null;
    for (; h !== null; ) t(m, h), (h = h.sibling);
    return null;
  }
  function r(m, h) {
    for (m = new Map(); h !== null; )
      h.key !== null ? m.set(h.key, h) : m.set(h.index, h), (h = h.sibling);
    return m;
  }
  function i(m, h) {
    return (m = an(m, h)), (m.index = 0), (m.sibling = null), m;
  }
  function o(m, h, g) {
    return (
      (m.index = g),
      e
        ? ((g = m.alternate),
          g !== null
            ? ((g = g.index), g < h ? ((m.flags |= 2), h) : g)
            : ((m.flags |= 2), h))
        : ((m.flags |= 1048576), h)
    );
  }
  function s(m) {
    return e && m.alternate === null && (m.flags |= 2), m;
  }
  function a(m, h, g, E) {
    return h === null || h.tag !== 6
      ? ((h = Ga(g, m.mode, E)), (h.return = m), h)
      : ((h = i(h, g)), (h.return = m), h);
  }
  function u(m, h, g, E) {
    var x = g.type;
    return x === Gn
      ? c(m, h, g.props.children, E, g.key)
      : h !== null &&
        (h.elementType === x ||
          (typeof x == "object" &&
            x !== null &&
            x.$$typeof === zt &&
            ed(x) === h.type))
      ? ((E = i(h, g.props)), (E.ref = jr(m, h, g)), (E.return = m), E)
      : ((E = ko(g.type, g.key, g.props, null, m.mode, E)),
        (E.ref = jr(m, h, g)),
        (E.return = m),
        E);
  }
  function l(m, h, g, E) {
    return h === null ||
      h.tag !== 4 ||
      h.stateNode.containerInfo !== g.containerInfo ||
      h.stateNode.implementation !== g.implementation
      ? ((h = Ya(g, m.mode, E)), (h.return = m), h)
      : ((h = i(h, g.children || [])), (h.return = m), h);
  }
  function c(m, h, g, E, x) {
    return h === null || h.tag !== 7
      ? ((h = Rn(g, m.mode, E, x)), (h.return = m), h)
      : ((h = i(h, g)), (h.return = m), h);
  }
  function f(m, h, g) {
    if ((typeof h == "string" && h !== "") || typeof h == "number")
      return (h = Ga("" + h, m.mode, g)), (h.return = m), h;
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case Ki:
          return (
            (g = ko(h.type, h.key, h.props, null, m.mode, g)),
            (g.ref = jr(m, null, h)),
            (g.return = m),
            g
          );
        case Kn:
          return (h = Ya(h, m.mode, g)), (h.return = m), h;
        case zt:
          var E = h._init;
          return f(m, E(h._payload), g);
      }
      if (Hr(h) || Dr(h))
        return (h = Rn(h, m.mode, g, null)), (h.return = m), h;
      oo(m, h);
    }
    return null;
  }
  function d(m, h, g, E) {
    var x = h !== null ? h.key : null;
    if ((typeof g == "string" && g !== "") || typeof g == "number")
      return x !== null ? null : a(m, h, "" + g, E);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Ki:
          return g.key === x ? u(m, h, g, E) : null;
        case Kn:
          return g.key === x ? l(m, h, g, E) : null;
        case zt:
          return (x = g._init), d(m, h, x(g._payload), E);
      }
      if (Hr(g) || Dr(g)) return x !== null ? null : c(m, h, g, E, null);
      oo(m, g);
    }
    return null;
  }
  function y(m, h, g, E, x) {
    if ((typeof E == "string" && E !== "") || typeof E == "number")
      return (m = m.get(g) || null), a(h, m, "" + E, x);
    if (typeof E == "object" && E !== null) {
      switch (E.$$typeof) {
        case Ki:
          return (m = m.get(E.key === null ? g : E.key) || null), u(h, m, E, x);
        case Kn:
          return (m = m.get(E.key === null ? g : E.key) || null), l(h, m, E, x);
        case zt:
          var k = E._init;
          return y(m, h, g, k(E._payload), x);
      }
      if (Hr(E) || Dr(E)) return (m = m.get(g) || null), c(h, m, E, x, null);
      oo(h, E);
    }
    return null;
  }
  function p(m, h, g, E) {
    for (
      var x = null, k = null, T = h, A = (h = 0), F = null;
      T !== null && A < g.length;
      A++
    ) {
      T.index > A ? ((F = T), (T = null)) : (F = T.sibling);
      var R = d(m, T, g[A], E);
      if (R === null) {
        T === null && (T = F);
        break;
      }
      e && T && R.alternate === null && t(m, T),
        (h = o(R, h, A)),
        k === null ? (x = R) : (k.sibling = R),
        (k = R),
        (T = F);
    }
    if (A === g.length) return n(m, T), X && Cn(m, A), x;
    if (T === null) {
      for (; A < g.length; A++)
        (T = f(m, g[A], E)),
          T !== null &&
            ((h = o(T, h, A)), k === null ? (x = T) : (k.sibling = T), (k = T));
      return X && Cn(m, A), x;
    }
    for (T = r(m, T); A < g.length; A++)
      (F = y(T, m, A, g[A], E)),
        F !== null &&
          (e && F.alternate !== null && T.delete(F.key === null ? A : F.key),
          (h = o(F, h, A)),
          k === null ? (x = F) : (k.sibling = F),
          (k = F));
    return (
      e &&
        T.forEach(function (B) {
          return t(m, B);
        }),
      X && Cn(m, A),
      x
    );
  }
  function v(m, h, g, E) {
    var x = Dr(g);
    if (typeof x != "function") throw Error(b(150));
    if (((g = x.call(g)), g == null)) throw Error(b(151));
    for (
      var k = (x = null), T = h, A = (h = 0), F = null, R = g.next();
      T !== null && !R.done;
      A++, R = g.next()
    ) {
      T.index > A ? ((F = T), (T = null)) : (F = T.sibling);
      var B = d(m, T, R.value, E);
      if (B === null) {
        T === null && (T = F);
        break;
      }
      e && T && B.alternate === null && t(m, T),
        (h = o(B, h, A)),
        k === null ? (x = B) : (k.sibling = B),
        (k = B),
        (T = F);
    }
    if (R.done) return n(m, T), X && Cn(m, A), x;
    if (T === null) {
      for (; !R.done; A++, R = g.next())
        (R = f(m, R.value, E)),
          R !== null &&
            ((h = o(R, h, A)), k === null ? (x = R) : (k.sibling = R), (k = R));
      return X && Cn(m, A), x;
    }
    for (T = r(m, T); !R.done; A++, R = g.next())
      (R = y(T, m, A, R.value, E)),
        R !== null &&
          (e && R.alternate !== null && T.delete(R.key === null ? A : R.key),
          (h = o(R, h, A)),
          k === null ? (x = R) : (k.sibling = R),
          (k = R));
    return (
      e &&
        T.forEach(function (Se) {
          return t(m, Se);
        }),
      X && Cn(m, A),
      x
    );
  }
  function C(m, h, g, E) {
    if (
      (typeof g == "object" &&
        g !== null &&
        g.type === Gn &&
        g.key === null &&
        (g = g.props.children),
      typeof g == "object" && g !== null)
    ) {
      switch (g.$$typeof) {
        case Ki:
          e: {
            for (var x = g.key, k = h; k !== null; ) {
              if (k.key === x) {
                if (((x = g.type), x === Gn)) {
                  if (k.tag === 7) {
                    n(m, k.sibling),
                      (h = i(k, g.props.children)),
                      (h.return = m),
                      (m = h);
                    break e;
                  }
                } else if (
                  k.elementType === x ||
                  (typeof x == "object" &&
                    x !== null &&
                    x.$$typeof === zt &&
                    ed(x) === k.type)
                ) {
                  n(m, k.sibling),
                    (h = i(k, g.props)),
                    (h.ref = jr(m, k, g)),
                    (h.return = m),
                    (m = h);
                  break e;
                }
                n(m, k);
                break;
              } else t(m, k);
              k = k.sibling;
            }
            g.type === Gn
              ? ((h = Rn(g.props.children, m.mode, E, g.key)),
                (h.return = m),
                (m = h))
              : ((E = ko(g.type, g.key, g.props, null, m.mode, E)),
                (E.ref = jr(m, h, g)),
                (E.return = m),
                (m = E));
          }
          return s(m);
        case Kn:
          e: {
            for (k = g.key; h !== null; ) {
              if (h.key === k)
                if (
                  h.tag === 4 &&
                  h.stateNode.containerInfo === g.containerInfo &&
                  h.stateNode.implementation === g.implementation
                ) {
                  n(m, h.sibling),
                    (h = i(h, g.children || [])),
                    (h.return = m),
                    (m = h);
                  break e;
                } else {
                  n(m, h);
                  break;
                }
              else t(m, h);
              h = h.sibling;
            }
            (h = Ya(g, m.mode, E)), (h.return = m), (m = h);
          }
          return s(m);
        case zt:
          return (k = g._init), C(m, h, k(g._payload), E);
      }
      if (Hr(g)) return p(m, h, g, E);
      if (Dr(g)) return v(m, h, g, E);
      oo(m, g);
    }
    return (typeof g == "string" && g !== "") || typeof g == "number"
      ? ((g = "" + g),
        h !== null && h.tag === 6
          ? (n(m, h.sibling), (h = i(h, g)), (h.return = m), (m = h))
          : (n(m, h), (h = Ga(g, m.mode, E)), (h.return = m), (m = h)),
        s(m))
      : n(m, h);
  }
  return C;
}
var gr = Vp(!0),
  Qp = Vp(!1),
  Mi = {},
  St = gn(Mi),
  Ci = gn(Mi),
  Oi = gn(Mi);
function bn(e) {
  if (e === Mi) throw Error(b(174));
  return e;
}
function pc(e, t) {
  switch ((K(Oi, t), K(Ci, e), K(St, Mi), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Ou(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Ou(t, e));
  }
  Y(St), K(St, t);
}
function wr() {
  Y(St), Y(Ci), Y(Oi);
}
function qp(e) {
  bn(Oi.current);
  var t = bn(St.current),
    n = Ou(t, e.type);
  t !== n && (K(Ci, e), K(St, n));
}
function mc(e) {
  Ci.current === e && (Y(St), Y(Ci));
}
var Z = gn(0);
function rs(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var Va = [];
function yc() {
  for (var e = 0; e < Va.length; e++)
    Va[e]._workInProgressVersionPrimary = null;
  Va.length = 0;
}
var Eo = Mt.ReactCurrentDispatcher,
  Qa = Mt.ReactCurrentBatchConfig,
  $n = 0,
  te = null,
  le = null,
  de = null,
  is = !1,
  ii = !1,
  Pi = 0,
  S0 = 0;
function Ce() {
  throw Error(b(321));
}
function vc(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!pt(e[n], t[n])) return !1;
  return !0;
}
function gc(e, t, n, r, i, o) {
  if (
    (($n = o),
    (te = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Eo.current = e === null || e.memoizedState === null ? P0 : x0),
    (e = n(r, i)),
    ii)
  ) {
    o = 0;
    do {
      if (((ii = !1), (Pi = 0), 25 <= o)) throw Error(b(301));
      (o += 1),
        (de = le = null),
        (t.updateQueue = null),
        (Eo.current = k0),
        (e = n(r, i));
    } while (ii);
  }
  if (
    ((Eo.current = os),
    (t = le !== null && le.next !== null),
    ($n = 0),
    (de = le = te = null),
    (is = !1),
    t)
  )
    throw Error(b(300));
  return e;
}
function wc() {
  var e = Pi !== 0;
  return (Pi = 0), e;
}
function yt() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return de === null ? (te.memoizedState = de = e) : (de = de.next = e), de;
}
function tt() {
  if (le === null) {
    var e = te.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = le.next;
  var t = de === null ? te.memoizedState : de.next;
  if (t !== null) (de = t), (le = e);
  else {
    if (e === null) throw Error(b(310));
    (le = e),
      (e = {
        memoizedState: le.memoizedState,
        baseState: le.baseState,
        baseQueue: le.baseQueue,
        queue: le.queue,
        next: null,
      }),
      de === null ? (te.memoizedState = de = e) : (de = de.next = e);
  }
  return de;
}
function xi(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function qa(e) {
  var t = tt(),
    n = t.queue;
  if (n === null) throw Error(b(311));
  n.lastRenderedReducer = e;
  var r = le,
    i = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (i !== null) {
      var s = i.next;
      (i.next = o.next), (o.next = s);
    }
    (r.baseQueue = i = o), (n.pending = null);
  }
  if (i !== null) {
    (o = i.next), (r = r.baseState);
    var a = (s = null),
      u = null,
      l = o;
    do {
      var c = l.lane;
      if (($n & c) === c)
        u !== null &&
          (u = u.next =
            {
              lane: 0,
              action: l.action,
              hasEagerState: l.hasEagerState,
              eagerState: l.eagerState,
              next: null,
            }),
          (r = l.hasEagerState ? l.eagerState : e(r, l.action));
      else {
        var f = {
          lane: c,
          action: l.action,
          hasEagerState: l.hasEagerState,
          eagerState: l.eagerState,
          next: null,
        };
        u === null ? ((a = u = f), (s = r)) : (u = u.next = f),
          (te.lanes |= c),
          (Dn |= c);
      }
      l = l.next;
    } while (l !== null && l !== o);
    u === null ? (s = r) : (u.next = a),
      pt(r, t.memoizedState) || (De = !0),
      (t.memoizedState = r),
      (t.baseState = s),
      (t.baseQueue = u),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    i = e;
    do (o = i.lane), (te.lanes |= o), (Dn |= o), (i = i.next);
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Ha(e) {
  var t = tt(),
    n = t.queue;
  if (n === null) throw Error(b(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    o = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var s = (i = i.next);
    do (o = e(o, s.action)), (s = s.next);
    while (s !== i);
    pt(o, t.memoizedState) || (De = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o);
  }
  return [o, r];
}
function Hp() {}
function Wp(e, t) {
  var n = te,
    r = tt(),
    i = t(),
    o = !pt(r.memoizedState, i);
  if (
    (o && ((r.memoizedState = i), (De = !0)),
    (r = r.queue),
    Sc(Yp.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (de !== null && de.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      ki(9, Gp.bind(null, n, r, i, t), void 0, null),
      pe === null)
    )
      throw Error(b(349));
    $n & 30 || Kp(n, t, i);
  }
  return i;
}
function Kp(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = te.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (te.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function Gp(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), Jp(t) && Xp(e);
}
function Yp(e, t, n) {
  return n(function () {
    Jp(t) && Xp(e);
  });
}
function Jp(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !pt(e, n);
  } catch {
    return !0;
  }
}
function Xp(e) {
  var t = Dt(e, 1);
  t !== null && ht(t, e, 1, -1);
}
function td(e) {
  var t = yt();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: xi,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = O0.bind(null, te, e)),
    [t.memoizedState, e]
  );
}
function ki(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = te.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (te.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function Zp() {
  return tt().memoizedState;
}
function Co(e, t, n, r) {
  var i = yt();
  (te.flags |= e),
    (i.memoizedState = ki(1 | t, n, void 0, r === void 0 ? null : r));
}
function Bs(e, t, n, r) {
  var i = tt();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (le !== null) {
    var s = le.memoizedState;
    if (((o = s.destroy), r !== null && vc(r, s.deps))) {
      i.memoizedState = ki(t, n, o, r);
      return;
    }
  }
  (te.flags |= e), (i.memoizedState = ki(1 | t, n, o, r));
}
function nd(e, t) {
  return Co(8390656, 8, e, t);
}
function Sc(e, t) {
  return Bs(2048, 8, e, t);
}
function em(e, t) {
  return Bs(4, 2, e, t);
}
function tm(e, t) {
  return Bs(4, 4, e, t);
}
function nm(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function rm(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), Bs(4, 4, nm.bind(null, t, e), n)
  );
}
function Ec() {}
function im(e, t) {
  var n = tt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && vc(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function om(e, t) {
  var n = tt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && vc(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function sm(e, t, n) {
  return $n & 21
    ? (pt(n, t) || ((n = lp()), (te.lanes |= n), (Dn |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (De = !0)), (e.memoizedState = n));
}
function E0(e, t) {
  var n = V;
  (V = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = Qa.transition;
  Qa.transition = {};
  try {
    e(!1), t();
  } finally {
    (V = n), (Qa.transition = r);
  }
}
function am() {
  return tt().memoizedState;
}
function C0(e, t, n) {
  var r = sn(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    um(e))
  )
    lm(t, n);
  else if (((n = jp(e, t, n, r)), n !== null)) {
    var i = Te();
    ht(n, e, r, i), cm(n, t, r);
  }
}
function O0(e, t, n) {
  var r = sn(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (um(e)) lm(t, i);
  else {
    var o = e.alternate;
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var s = t.lastRenderedState,
          a = o(s, n);
        if (((i.hasEagerState = !0), (i.eagerState = a), pt(a, s))) {
          var u = t.interleaved;
          u === null
            ? ((i.next = i), dc(t))
            : ((i.next = u.next), (u.next = i)),
            (t.interleaved = i);
          return;
        }
      } catch {
      } finally {
      }
    (n = jp(e, t, i, r)),
      n !== null && ((i = Te()), ht(n, e, r, i), cm(n, t, r));
  }
}
function um(e) {
  var t = e.alternate;
  return e === te || (t !== null && t === te);
}
function lm(e, t) {
  ii = is = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function cm(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Xl(e, n);
  }
}
var os = {
    readContext: et,
    useCallback: Ce,
    useContext: Ce,
    useEffect: Ce,
    useImperativeHandle: Ce,
    useInsertionEffect: Ce,
    useLayoutEffect: Ce,
    useMemo: Ce,
    useReducer: Ce,
    useRef: Ce,
    useState: Ce,
    useDebugValue: Ce,
    useDeferredValue: Ce,
    useTransition: Ce,
    useMutableSource: Ce,
    useSyncExternalStore: Ce,
    useId: Ce,
    unstable_isNewReconciler: !1,
  },
  P0 = {
    readContext: et,
    useCallback: function (e, t) {
      return (yt().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: et,
    useEffect: nd,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Co(4194308, 4, nm.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Co(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Co(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = yt();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = yt();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = C0.bind(null, te, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = yt();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: td,
    useDebugValue: Ec,
    useDeferredValue: function (e) {
      return (yt().memoizedState = e);
    },
    useTransition: function () {
      var e = td(!1),
        t = e[0];
      return (e = E0.bind(null, e[1])), (yt().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = te,
        i = yt();
      if (X) {
        if (n === void 0) throw Error(b(407));
        n = n();
      } else {
        if (((n = t()), pe === null)) throw Error(b(349));
        $n & 30 || Kp(r, t, n);
      }
      i.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (i.queue = o),
        nd(Yp.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        ki(9, Gp.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = yt(),
        t = pe.identifierPrefix;
      if (X) {
        var n = Tt,
          r = _t;
        (n = (r & ~(1 << (32 - dt(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = Pi++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = S0++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  x0 = {
    readContext: et,
    useCallback: im,
    useContext: et,
    useEffect: Sc,
    useImperativeHandle: rm,
    useInsertionEffect: em,
    useLayoutEffect: tm,
    useMemo: om,
    useReducer: qa,
    useRef: Zp,
    useState: function () {
      return qa(xi);
    },
    useDebugValue: Ec,
    useDeferredValue: function (e) {
      var t = tt();
      return sm(t, le.memoizedState, e);
    },
    useTransition: function () {
      var e = qa(xi)[0],
        t = tt().memoizedState;
      return [e, t];
    },
    useMutableSource: Hp,
    useSyncExternalStore: Wp,
    useId: am,
    unstable_isNewReconciler: !1,
  },
  k0 = {
    readContext: et,
    useCallback: im,
    useContext: et,
    useEffect: Sc,
    useImperativeHandle: rm,
    useInsertionEffect: em,
    useLayoutEffect: tm,
    useMemo: om,
    useReducer: Ha,
    useRef: Zp,
    useState: function () {
      return Ha(xi);
    },
    useDebugValue: Ec,
    useDeferredValue: function (e) {
      var t = tt();
      return le === null ? (t.memoizedState = e) : sm(t, le.memoizedState, e);
    },
    useTransition: function () {
      var e = Ha(xi)[0],
        t = tt().memoizedState;
      return [e, t];
    },
    useMutableSource: Hp,
    useSyncExternalStore: Wp,
    useId: am,
    unstable_isNewReconciler: !1,
  };
function Sr(e, t) {
  try {
    var n = "",
      r = t;
    do (n += eg(r)), (r = r.return);
    while (r);
    var i = n;
  } catch (o) {
    i =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function Wa(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Hu(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var b0 = typeof WeakMap == "function" ? WeakMap : Map;
function fm(e, t, n) {
  (n = Rt(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      as || ((as = !0), (nl = r)), Hu(e, t);
    }),
    n
  );
}
function dm(e, t, n) {
  (n = Rt(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    (n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        Hu(e, t);
      });
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (n.callback = function () {
        Hu(e, t),
          typeof r != "function" &&
            (on === null ? (on = new Set([this])) : on.add(this));
        var s = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: s !== null ? s : "",
        });
      }),
    n
  );
}
function rd(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new b0();
    var i = new Set();
    r.set(t, i);
  } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
  i.has(n) || (i.add(n), (e = B0.bind(null, e, t, n)), t.then(e, e));
}
function id(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function od(e, t, n, r, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Rt(-1, 1)), (t.tag = 2), rn(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var _0 = Mt.ReactCurrentOwner,
  De = !1;
function _e(e, t, n, r) {
  t.child = e === null ? Qp(t, null, n, r) : gr(t, e.child, n, r);
}
function sd(e, t, n, r, i) {
  n = n.render;
  var o = t.ref;
  return (
    cr(t, i),
    (r = gc(e, t, n, r, o, i)),
    (n = wc()),
    e !== null && !De
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Ft(e, t, i))
      : (X && n && sc(t), (t.flags |= 1), _e(e, t, r, i), t.child)
  );
}
function ad(e, t, n, r, i) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" &&
      !Tc(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), hm(e, t, o, r, i))
      : ((e = ko(n.type, null, r, t, t.mode, i)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((o = e.child), !(e.lanes & i))) {
    var s = o.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : gi), n(s, r) && e.ref === t.ref)
    )
      return Ft(e, t, i);
  }
  return (
    (t.flags |= 1),
    (e = an(o, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function hm(e, t, n, r, i) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (gi(o, r) && e.ref === t.ref)
      if (((De = !1), (t.pendingProps = r = o), (e.lanes & i) !== 0))
        e.flags & 131072 && (De = !0);
      else return (t.lanes = e.lanes), Ft(e, t, i);
  }
  return Wu(e, t, n, r, i);
}
function pm(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        K(or, Me),
        (Me |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          K(or, Me),
          (Me |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        K(or, Me),
        (Me |= r);
    }
  else
    o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
      K(or, Me),
      (Me |= r);
  return _e(e, t, i, n), t.child;
}
function mm(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Wu(e, t, n, r, i) {
  var o = Le(n) ? Nn : be.current;
  return (
    (o = yr(t, o)),
    cr(t, i),
    (n = gc(e, t, n, r, o, i)),
    (r = wc()),
    e !== null && !De
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Ft(e, t, i))
      : (X && r && sc(t), (t.flags |= 1), _e(e, t, n, i), t.child)
  );
}
function ud(e, t, n, r, i) {
  if (Le(n)) {
    var o = !0;
    Jo(t);
  } else o = !1;
  if ((cr(t, i), t.stateNode === null))
    Oo(e, t), zp(t, n, r), qu(t, n, r, i), (r = !0);
  else if (e === null) {
    var s = t.stateNode,
      a = t.memoizedProps;
    s.props = a;
    var u = s.context,
      l = n.contextType;
    typeof l == "object" && l !== null
      ? (l = et(l))
      : ((l = Le(n) ? Nn : be.current), (l = yr(t, l)));
    var c = n.getDerivedStateFromProps,
      f =
        typeof c == "function" ||
        typeof s.getSnapshotBeforeUpdate == "function";
    f ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
        typeof s.componentWillReceiveProps != "function") ||
      ((a !== r || u !== l) && Zf(t, s, r, l)),
      (Vt = !1);
    var d = t.memoizedState;
    (s.state = d),
      ns(t, r, s, i),
      (u = t.memoizedState),
      a !== r || d !== u || Fe.current || Vt
        ? (typeof c == "function" && (Qu(t, n, c, r), (u = t.memoizedState)),
          (a = Vt || Xf(t, n, a, r, d, u, l))
            ? (f ||
                (typeof s.UNSAFE_componentWillMount != "function" &&
                  typeof s.componentWillMount != "function") ||
                (typeof s.componentWillMount == "function" &&
                  s.componentWillMount(),
                typeof s.UNSAFE_componentWillMount == "function" &&
                  s.UNSAFE_componentWillMount()),
              typeof s.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = u)),
          (s.props = r),
          (s.state = u),
          (s.context = l),
          (r = a))
        : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (s = t.stateNode),
      Up(e, t),
      (a = t.memoizedProps),
      (l = t.type === t.elementType ? a : st(t.type, a)),
      (s.props = l),
      (f = t.pendingProps),
      (d = s.context),
      (u = n.contextType),
      typeof u == "object" && u !== null
        ? (u = et(u))
        : ((u = Le(n) ? Nn : be.current), (u = yr(t, u)));
    var y = n.getDerivedStateFromProps;
    (c =
      typeof y == "function" ||
      typeof s.getSnapshotBeforeUpdate == "function") ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
        typeof s.componentWillReceiveProps != "function") ||
      ((a !== f || d !== u) && Zf(t, s, r, u)),
      (Vt = !1),
      (d = t.memoizedState),
      (s.state = d),
      ns(t, r, s, i);
    var p = t.memoizedState;
    a !== f || d !== p || Fe.current || Vt
      ? (typeof y == "function" && (Qu(t, n, y, r), (p = t.memoizedState)),
        (l = Vt || Xf(t, n, l, r, d, p, u) || !1)
          ? (c ||
              (typeof s.UNSAFE_componentWillUpdate != "function" &&
                typeof s.componentWillUpdate != "function") ||
              (typeof s.componentWillUpdate == "function" &&
                s.componentWillUpdate(r, p, u),
              typeof s.UNSAFE_componentWillUpdate == "function" &&
                s.UNSAFE_componentWillUpdate(r, p, u)),
            typeof s.componentDidUpdate == "function" && (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof s.componentDidUpdate != "function" ||
              (a === e.memoizedProps && d === e.memoizedState) ||
              (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate != "function" ||
              (a === e.memoizedProps && d === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = p)),
        (s.props = r),
        (s.state = p),
        (s.context = u),
        (r = l))
      : (typeof s.componentDidUpdate != "function" ||
          (a === e.memoizedProps && d === e.memoizedState) ||
          (t.flags |= 4),
        typeof s.getSnapshotBeforeUpdate != "function" ||
          (a === e.memoizedProps && d === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Ku(e, t, n, r, o, i);
}
function Ku(e, t, n, r, i, o) {
  mm(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return i && Wf(t, n, !1), Ft(e, t, o);
  (r = t.stateNode), (_0.current = t);
  var a =
    s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && s
      ? ((t.child = gr(t, e.child, null, o)), (t.child = gr(t, null, a, o)))
      : _e(e, t, a, o),
    (t.memoizedState = r.state),
    i && Wf(t, n, !0),
    t.child
  );
}
function ym(e) {
  var t = e.stateNode;
  t.pendingContext
    ? Hf(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Hf(e, t.context, !1),
    pc(e, t.containerInfo);
}
function ld(e, t, n, r, i) {
  return vr(), uc(i), (t.flags |= 256), _e(e, t, n, r), t.child;
}
var Gu = { dehydrated: null, treeContext: null, retryLane: 0 };
function Yu(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function vm(e, t, n) {
  var r = t.pendingProps,
    i = Z.current,
    o = !1,
    s = (t.flags & 128) !== 0,
    a;
  if (
    ((a = s) ||
      (a = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    a
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (i |= 1),
    K(Z, i & 1),
    e === null)
  )
    return (
      zu(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((s = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (s = { mode: "hidden", children: s }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = s))
                : (o = Qs(s, r, 0, null)),
              (e = Rn(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = Yu(n)),
              (t.memoizedState = Gu),
              e)
            : Cc(t, s))
    );
  if (((i = e.memoizedState), i !== null && ((a = i.dehydrated), a !== null)))
    return T0(e, t, s, r, a, i, n);
  if (o) {
    (o = r.fallback), (s = t.mode), (i = e.child), (a = i.sibling);
    var u = { mode: "hidden", children: r.children };
    return (
      !(s & 1) && t.child !== i
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = u),
          (t.deletions = null))
        : ((r = an(i, u)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
      a !== null ? (o = an(a, o)) : ((o = Rn(o, s, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (s = e.child.memoizedState),
      (s =
        s === null
          ? Yu(n)
          : {
              baseLanes: s.baseLanes | n,
              cachePool: null,
              transitions: s.transitions,
            }),
      (o.memoizedState = s),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = Gu),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = an(o, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Cc(e, t) {
  return (
    (t = Qs({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function so(e, t, n, r) {
  return (
    r !== null && uc(r),
    gr(t, e.child, null, n),
    (e = Cc(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function T0(e, t, n, r, i, o, s) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Wa(Error(b(422)))), so(e, t, s, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((o = r.fallback),
        (i = t.mode),
        (r = Qs({ mode: "visible", children: r.children }, i, 0, null)),
        (o = Rn(o, i, s, null)),
        (o.flags |= 2),
        (r.return = t),
        (o.return = t),
        (r.sibling = o),
        (t.child = r),
        t.mode & 1 && gr(t, e.child, null, s),
        (t.child.memoizedState = Yu(s)),
        (t.memoizedState = Gu),
        o);
  if (!(t.mode & 1)) return so(e, t, s, null);
  if (i.data === "$!") {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var a = r.dgst;
    return (r = a), (o = Error(b(419))), (r = Wa(o, r, void 0)), so(e, t, s, r);
  }
  if (((a = (s & e.childLanes) !== 0), De || a)) {
    if (((r = pe), r !== null)) {
      switch (s & -s) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      (i = i & (r.suspendedLanes | s) ? 0 : i),
        i !== 0 &&
          i !== o.retryLane &&
          ((o.retryLane = i), Dt(e, i), ht(r, e, i, -1));
    }
    return _c(), (r = Wa(Error(b(421)))), so(e, t, s, r);
  }
  return i.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = z0.bind(null, e)),
      (i._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (je = nn(i.nextSibling)),
      (Be = t),
      (X = !0),
      (ct = null),
      e !== null &&
        ((Ke[Ge++] = _t),
        (Ke[Ge++] = Tt),
        (Ke[Ge++] = An),
        (_t = e.id),
        (Tt = e.overflow),
        (An = t)),
      (t = Cc(t, r.children)),
      (t.flags |= 4096),
      t);
}
function cd(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Vu(e.return, t, n);
}
function Ka(e, t, n, r, i) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = i));
}
function gm(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    o = r.tail;
  if ((_e(e, t, r.children, n), (r = Z.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && cd(e, n, t);
        else if (e.tag === 19) cd(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((K(Z, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          (e = n.alternate),
            e !== null && rs(e) === null && (i = n),
            (n = n.sibling);
        (n = i),
          n === null
            ? ((i = t.child), (t.child = null))
            : ((i = n.sibling), (n.sibling = null)),
          Ka(t, !1, i, n, o);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && rs(e) === null)) {
            t.child = i;
            break;
          }
          (e = i.sibling), (i.sibling = n), (n = i), (i = e);
        }
        Ka(t, !0, n, null, o);
        break;
      case "together":
        Ka(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Oo(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Ft(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Dn |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(b(153));
  if (t.child !== null) {
    for (
      e = t.child, n = an(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = an(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function R0(e, t, n) {
  switch (t.tag) {
    case 3:
      ym(t), vr();
      break;
    case 5:
      qp(t);
      break;
    case 1:
      Le(t.type) && Jo(t);
      break;
    case 4:
      pc(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      K(es, r._currentValue), (r._currentValue = i);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (K(Z, Z.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? vm(e, t, n)
          : (K(Z, Z.current & 1),
            (e = Ft(e, t, n)),
            e !== null ? e.sibling : null);
      K(Z, Z.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return gm(e, t, n);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null &&
          ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        K(Z, Z.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), pm(e, t, n);
  }
  return Ft(e, t, n);
}
var wm, Ju, Sm, Em;
wm = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
Ju = function () {};
Sm = function (e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    (e = t.stateNode), bn(St.current);
    var o = null;
    switch (n) {
      case "input":
        (i = wu(e, i)), (r = wu(e, r)), (o = []);
        break;
      case "select":
        (i = ne({}, i, { value: void 0 })),
          (r = ne({}, r, { value: void 0 })),
          (o = []);
        break;
      case "textarea":
        (i = Cu(e, i)), (r = Cu(e, r)), (o = []);
        break;
      default:
        typeof i.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = Go);
    }
    Pu(n, r);
    var s;
    n = null;
    for (l in i)
      if (!r.hasOwnProperty(l) && i.hasOwnProperty(l) && i[l] != null)
        if (l === "style") {
          var a = i[l];
          for (s in a) a.hasOwnProperty(s) && (n || (n = {}), (n[s] = ""));
        } else
          l !== "dangerouslySetInnerHTML" &&
            l !== "children" &&
            l !== "suppressContentEditableWarning" &&
            l !== "suppressHydrationWarning" &&
            l !== "autoFocus" &&
            (fi.hasOwnProperty(l)
              ? o || (o = [])
              : (o = o || []).push(l, null));
    for (l in r) {
      var u = r[l];
      if (
        ((a = i != null ? i[l] : void 0),
        r.hasOwnProperty(l) && u !== a && (u != null || a != null))
      )
        if (l === "style")
          if (a) {
            for (s in a)
              !a.hasOwnProperty(s) ||
                (u && u.hasOwnProperty(s)) ||
                (n || (n = {}), (n[s] = ""));
            for (s in u)
              u.hasOwnProperty(s) &&
                a[s] !== u[s] &&
                (n || (n = {}), (n[s] = u[s]));
          } else n || (o || (o = []), o.push(l, n)), (n = u);
        else
          l === "dangerouslySetInnerHTML"
            ? ((u = u ? u.__html : void 0),
              (a = a ? a.__html : void 0),
              u != null && a !== u && (o = o || []).push(l, u))
            : l === "children"
            ? (typeof u != "string" && typeof u != "number") ||
              (o = o || []).push(l, "" + u)
            : l !== "suppressContentEditableWarning" &&
              l !== "suppressHydrationWarning" &&
              (fi.hasOwnProperty(l)
                ? (u != null && l === "onScroll" && G("scroll", e),
                  o || a === u || (o = []))
                : (o = o || []).push(l, u));
    }
    n && (o = o || []).push("style", n);
    var l = o;
    (t.updateQueue = l) && (t.flags |= 4);
  }
};
Em = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Ur(e, t) {
  if (!X)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function Oe(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags & 14680064),
        (r |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling);
  else
    for (i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function N0(e, t, n) {
  var r = t.pendingProps;
  switch ((ac(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Oe(t), null;
    case 1:
      return Le(t.type) && Yo(), Oe(t), null;
    case 3:
      return (
        (r = t.stateNode),
        wr(),
        Y(Fe),
        Y(be),
        yc(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (io(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), ct !== null && (ol(ct), (ct = null)))),
        Ju(e, t),
        Oe(t),
        null
      );
    case 5:
      mc(t);
      var i = bn(Oi.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        Sm(e, t, n, r, i),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(b(166));
          return Oe(t), null;
        }
        if (((e = bn(St.current)), io(t))) {
          (r = t.stateNode), (n = t.type);
          var o = t.memoizedProps;
          switch (((r[vt] = t), (r[Ei] = o), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              G("cancel", r), G("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              G("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < Kr.length; i++) G(Kr[i], r);
              break;
            case "source":
              G("error", r);
              break;
            case "img":
            case "image":
            case "link":
              G("error", r), G("load", r);
              break;
            case "details":
              G("toggle", r);
              break;
            case "input":
              wf(r, o), G("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!o.multiple }),
                G("invalid", r);
              break;
            case "textarea":
              Ef(r, o), G("invalid", r);
          }
          Pu(n, o), (i = null);
          for (var s in o)
            if (o.hasOwnProperty(s)) {
              var a = o[s];
              s === "children"
                ? typeof a == "string"
                  ? r.textContent !== a &&
                    (o.suppressHydrationWarning !== !0 &&
                      ro(r.textContent, a, e),
                    (i = ["children", a]))
                  : typeof a == "number" &&
                    r.textContent !== "" + a &&
                    (o.suppressHydrationWarning !== !0 &&
                      ro(r.textContent, a, e),
                    (i = ["children", "" + a]))
                : fi.hasOwnProperty(s) &&
                  a != null &&
                  s === "onScroll" &&
                  G("scroll", r);
            }
          switch (n) {
            case "input":
              Gi(r), Sf(r, o, !0);
              break;
            case "textarea":
              Gi(r), Cf(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Go);
          }
          (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (s = i.nodeType === 9 ? i : i.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Kh(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = s.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = s.createElement(n, { is: r.is }))
                : ((e = s.createElement(n)),
                  n === "select" &&
                    ((s = e),
                    r.multiple
                      ? (s.multiple = !0)
                      : r.size && (s.size = r.size)))
              : (e = s.createElementNS(e, n)),
            (e[vt] = t),
            (e[Ei] = r),
            wm(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((s = xu(n, r)), n)) {
              case "dialog":
                G("cancel", e), G("close", e), (i = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                G("load", e), (i = r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < Kr.length; i++) G(Kr[i], e);
                i = r;
                break;
              case "source":
                G("error", e), (i = r);
                break;
              case "img":
              case "image":
              case "link":
                G("error", e), G("load", e), (i = r);
                break;
              case "details":
                G("toggle", e), (i = r);
                break;
              case "input":
                wf(e, r), (i = wu(e, r)), G("invalid", e);
                break;
              case "option":
                i = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = ne({}, r, { value: void 0 })),
                  G("invalid", e);
                break;
              case "textarea":
                Ef(e, r), (i = Cu(e, r)), G("invalid", e);
                break;
              default:
                i = r;
            }
            Pu(n, i), (a = i);
            for (o in a)
              if (a.hasOwnProperty(o)) {
                var u = a[o];
                o === "style"
                  ? Jh(e, u)
                  : o === "dangerouslySetInnerHTML"
                  ? ((u = u ? u.__html : void 0), u != null && Gh(e, u))
                  : o === "children"
                  ? typeof u == "string"
                    ? (n !== "textarea" || u !== "") && di(e, u)
                    : typeof u == "number" && di(e, "" + u)
                  : o !== "suppressContentEditableWarning" &&
                    o !== "suppressHydrationWarning" &&
                    o !== "autoFocus" &&
                    (fi.hasOwnProperty(o)
                      ? u != null && o === "onScroll" && G("scroll", e)
                      : u != null && Hl(e, o, u, s));
              }
            switch (n) {
              case "input":
                Gi(e), Sf(e, r, !1);
                break;
              case "textarea":
                Gi(e), Cf(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + dn(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? sr(e, !!r.multiple, o, !1)
                    : r.defaultValue != null &&
                      sr(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = Go);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return Oe(t), null;
    case 6:
      if (e && t.stateNode != null) Em(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(b(166));
        if (((n = bn(Oi.current)), bn(St.current), io(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[vt] = t),
            (o = r.nodeValue !== n) && ((e = Be), e !== null))
          )
            switch (e.tag) {
              case 3:
                ro(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  ro(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[vt] = t),
            (t.stateNode = r);
      }
      return Oe(t), null;
    case 13:
      if (
        (Y(Z),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (X && je !== null && t.mode & 1 && !(t.flags & 128))
          Mp(), vr(), (t.flags |= 98560), (o = !1);
        else if (((o = io(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(b(318));
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(b(317));
            o[vt] = t;
          } else
            vr(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          Oe(t), (o = !1);
        } else ct !== null && (ol(ct), (ct = null)), (o = !0);
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || Z.current & 1 ? ce === 0 && (ce = 3) : _c())),
          t.updateQueue !== null && (t.flags |= 4),
          Oe(t),
          null);
    case 4:
      return (
        wr(), Ju(e, t), e === null && wi(t.stateNode.containerInfo), Oe(t), null
      );
    case 10:
      return fc(t.type._context), Oe(t), null;
    case 17:
      return Le(t.type) && Yo(), Oe(t), null;
    case 19:
      if ((Y(Z), (o = t.memoizedState), o === null)) return Oe(t), null;
      if (((r = (t.flags & 128) !== 0), (s = o.rendering), s === null))
        if (r) Ur(o, !1);
        else {
          if (ce !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((s = rs(e)), s !== null)) {
                for (
                  t.flags |= 128,
                    Ur(o, !1),
                    r = s.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (s = o.alternate),
                    s === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = s.childLanes),
                        (o.lanes = s.lanes),
                        (o.child = s.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = s.memoizedProps),
                        (o.memoizedState = s.memoizedState),
                        (o.updateQueue = s.updateQueue),
                        (o.type = s.type),
                        (e = s.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return K(Z, (Z.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null &&
            oe() > Er &&
            ((t.flags |= 128), (r = !0), Ur(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = rs(s)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Ur(o, !0),
              o.tail === null && o.tailMode === "hidden" && !s.alternate && !X)
            )
              return Oe(t), null;
          } else
            2 * oe() - o.renderingStartTime > Er &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Ur(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((s.sibling = t.child), (t.child = s))
          : ((n = o.last),
            n !== null ? (n.sibling = s) : (t.child = s),
            (o.last = s));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = oe()),
          (t.sibling = null),
          (n = Z.current),
          K(Z, r ? (n & 1) | 2 : n & 1),
          t)
        : (Oe(t), null);
    case 22:
    case 23:
      return (
        bc(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Me & 1073741824 && (Oe(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : Oe(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(b(156, t.tag));
}
function A0(e, t) {
  switch ((ac(t), t.tag)) {
    case 1:
      return (
        Le(t.type) && Yo(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        wr(),
        Y(Fe),
        Y(be),
        yc(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return mc(t), null;
    case 13:
      if ((Y(Z), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(b(340));
        vr();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return Y(Z), null;
    case 4:
      return wr(), null;
    case 10:
      return fc(t.type._context), null;
    case 22:
    case 23:
      return bc(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var ao = !1,
  ke = !1,
  $0 = typeof WeakSet == "function" ? WeakSet : Set,
  $ = null;
function ir(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        re(e, t, r);
      }
    else n.current = null;
}
function Xu(e, t, n) {
  try {
    n();
  } catch (r) {
    re(e, t, r);
  }
}
var fd = !1;
function D0(e, t) {
  if (((Fu = Ho), (e = xp()), oc(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var s = 0,
            a = -1,
            u = -1,
            l = 0,
            c = 0,
            f = e,
            d = null;
          t: for (;;) {
            for (
              var y;
              f !== n || (i !== 0 && f.nodeType !== 3) || (a = s + i),
                f !== o || (r !== 0 && f.nodeType !== 3) || (u = s + r),
                f.nodeType === 3 && (s += f.nodeValue.length),
                (y = f.firstChild) !== null;

            )
              (d = f), (f = y);
            for (;;) {
              if (f === e) break t;
              if (
                (d === n && ++l === i && (a = s),
                d === o && ++c === r && (u = s),
                (y = f.nextSibling) !== null)
              )
                break;
              (f = d), (d = f.parentNode);
            }
            f = y;
          }
          n = a === -1 || u === -1 ? null : { start: a, end: u };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Lu = { focusedElem: e, selectionRange: n }, Ho = !1, $ = t; $ !== null; )
    if (((t = $), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), ($ = e);
    else
      for (; $ !== null; ) {
        t = $;
        try {
          var p = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (p !== null) {
                  var v = p.memoizedProps,
                    C = p.memoizedState,
                    m = t.stateNode,
                    h = m.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? v : st(t.type, v),
                      C
                    );
                  m.__reactInternalSnapshotBeforeUpdate = h;
                }
                break;
              case 3:
                var g = t.stateNode.containerInfo;
                g.nodeType === 1
                  ? (g.textContent = "")
                  : g.nodeType === 9 &&
                    g.documentElement &&
                    g.removeChild(g.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(b(163));
            }
        } catch (E) {
          re(t, t.return, E);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), ($ = e);
          break;
        }
        $ = t.return;
      }
  return (p = fd), (fd = !1), p;
}
function oi(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var o = i.destroy;
        (i.destroy = void 0), o !== void 0 && Xu(t, n, o);
      }
      i = i.next;
    } while (i !== r);
  }
}
function zs(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Zu(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Cm(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), Cm(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[vt], delete t[Ei], delete t[ju], delete t[y0], delete t[v0])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function Om(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function dd(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Om(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function el(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Go));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (el(e, t, n), e = e.sibling; e !== null; ) el(e, t, n), (e = e.sibling);
}
function tl(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (tl(e, t, n), e = e.sibling; e !== null; ) tl(e, t, n), (e = e.sibling);
}
var ve = null,
  ut = !1;
function Ut(e, t, n) {
  for (n = n.child; n !== null; ) Pm(e, t, n), (n = n.sibling);
}
function Pm(e, t, n) {
  if (wt && typeof wt.onCommitFiberUnmount == "function")
    try {
      wt.onCommitFiberUnmount(Ds, n);
    } catch {}
  switch (n.tag) {
    case 5:
      ke || ir(n, t);
    case 6:
      var r = ve,
        i = ut;
      (ve = null),
        Ut(e, t, n),
        (ve = r),
        (ut = i),
        ve !== null &&
          (ut
            ? ((e = ve),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : ve.removeChild(n.stateNode));
      break;
    case 18:
      ve !== null &&
        (ut
          ? ((e = ve),
            (n = n.stateNode),
            e.nodeType === 8
              ? Ba(e.parentNode, n)
              : e.nodeType === 1 && Ba(e, n),
            yi(e))
          : Ba(ve, n.stateNode));
      break;
    case 4:
      (r = ve),
        (i = ut),
        (ve = n.stateNode.containerInfo),
        (ut = !0),
        Ut(e, t, n),
        (ve = r),
        (ut = i);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ke &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        i = r = r.next;
        do {
          var o = i,
            s = o.destroy;
          (o = o.tag),
            s !== void 0 && (o & 2 || o & 4) && Xu(n, t, s),
            (i = i.next);
        } while (i !== r);
      }
      Ut(e, t, n);
      break;
    case 1:
      if (
        !ke &&
        (ir(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (a) {
          re(n, t, a);
        }
      Ut(e, t, n);
      break;
    case 21:
      Ut(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((ke = (r = ke) || n.memoizedState !== null), Ut(e, t, n), (ke = r))
        : Ut(e, t, n);
      break;
    default:
      Ut(e, t, n);
  }
}
function hd(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new $0()),
      t.forEach(function (r) {
        var i = V0.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
  }
}
function it(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var o = e,
          s = t,
          a = s;
        e: for (; a !== null; ) {
          switch (a.tag) {
            case 5:
              (ve = a.stateNode), (ut = !1);
              break e;
            case 3:
              (ve = a.stateNode.containerInfo), (ut = !0);
              break e;
            case 4:
              (ve = a.stateNode.containerInfo), (ut = !0);
              break e;
          }
          a = a.return;
        }
        if (ve === null) throw Error(b(160));
        Pm(o, s, i), (ve = null), (ut = !1);
        var u = i.alternate;
        u !== null && (u.return = null), (i.return = null);
      } catch (l) {
        re(i, t, l);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) xm(t, e), (t = t.sibling);
}
function xm(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((it(t, e), mt(e), r & 4)) {
        try {
          oi(3, e, e.return), zs(3, e);
        } catch (v) {
          re(e, e.return, v);
        }
        try {
          oi(5, e, e.return);
        } catch (v) {
          re(e, e.return, v);
        }
      }
      break;
    case 1:
      it(t, e), mt(e), r & 512 && n !== null && ir(n, n.return);
      break;
    case 5:
      if (
        (it(t, e),
        mt(e),
        r & 512 && n !== null && ir(n, n.return),
        e.flags & 32)
      ) {
        var i = e.stateNode;
        try {
          di(i, "");
        } catch (v) {
          re(e, e.return, v);
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var o = e.memoizedProps,
          s = n !== null ? n.memoizedProps : o,
          a = e.type,
          u = e.updateQueue;
        if (((e.updateQueue = null), u !== null))
          try {
            a === "input" && o.type === "radio" && o.name != null && Hh(i, o),
              xu(a, s);
            var l = xu(a, o);
            for (s = 0; s < u.length; s += 2) {
              var c = u[s],
                f = u[s + 1];
              c === "style"
                ? Jh(i, f)
                : c === "dangerouslySetInnerHTML"
                ? Gh(i, f)
                : c === "children"
                ? di(i, f)
                : Hl(i, c, f, l);
            }
            switch (a) {
              case "input":
                Su(i, o);
                break;
              case "textarea":
                Wh(i, o);
                break;
              case "select":
                var d = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var y = o.value;
                y != null
                  ? sr(i, !!o.multiple, y, !1)
                  : d !== !!o.multiple &&
                    (o.defaultValue != null
                      ? sr(i, !!o.multiple, o.defaultValue, !0)
                      : sr(i, !!o.multiple, o.multiple ? [] : "", !1));
            }
            i[Ei] = o;
          } catch (v) {
            re(e, e.return, v);
          }
      }
      break;
    case 6:
      if ((it(t, e), mt(e), r & 4)) {
        if (e.stateNode === null) throw Error(b(162));
        (i = e.stateNode), (o = e.memoizedProps);
        try {
          i.nodeValue = o;
        } catch (v) {
          re(e, e.return, v);
        }
      }
      break;
    case 3:
      if (
        (it(t, e), mt(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          yi(t.containerInfo);
        } catch (v) {
          re(e, e.return, v);
        }
      break;
    case 4:
      it(t, e), mt(e);
      break;
    case 13:
      it(t, e),
        mt(e),
        (i = e.child),
        i.flags & 8192 &&
          ((o = i.memoizedState !== null),
          (i.stateNode.isHidden = o),
          !o ||
            (i.alternate !== null && i.alternate.memoizedState !== null) ||
            (xc = oe())),
        r & 4 && hd(e);
      break;
    case 22:
      if (
        ((c = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((ke = (l = ke) || c), it(t, e), (ke = l)) : it(t, e),
        mt(e),
        r & 8192)
      ) {
        if (
          ((l = e.memoizedState !== null),
          (e.stateNode.isHidden = l) && !c && e.mode & 1)
        )
          for ($ = e, c = e.child; c !== null; ) {
            for (f = $ = c; $ !== null; ) {
              switch (((d = $), (y = d.child), d.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  oi(4, d, d.return);
                  break;
                case 1:
                  ir(d, d.return);
                  var p = d.stateNode;
                  if (typeof p.componentWillUnmount == "function") {
                    (r = d), (n = d.return);
                    try {
                      (t = r),
                        (p.props = t.memoizedProps),
                        (p.state = t.memoizedState),
                        p.componentWillUnmount();
                    } catch (v) {
                      re(r, n, v);
                    }
                  }
                  break;
                case 5:
                  ir(d, d.return);
                  break;
                case 22:
                  if (d.memoizedState !== null) {
                    md(f);
                    continue;
                  }
              }
              y !== null ? ((y.return = d), ($ = y)) : md(f);
            }
            c = c.sibling;
          }
        e: for (c = null, f = e; ; ) {
          if (f.tag === 5) {
            if (c === null) {
              c = f;
              try {
                (i = f.stateNode),
                  l
                    ? ((o = i.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((a = f.stateNode),
                      (u = f.memoizedProps.style),
                      (s =
                        u != null && u.hasOwnProperty("display")
                          ? u.display
                          : null),
                      (a.style.display = Yh("display", s)));
              } catch (v) {
                re(e, e.return, v);
              }
            }
          } else if (f.tag === 6) {
            if (c === null)
              try {
                f.stateNode.nodeValue = l ? "" : f.memoizedProps;
              } catch (v) {
                re(e, e.return, v);
              }
          } else if (
            ((f.tag !== 22 && f.tag !== 23) ||
              f.memoizedState === null ||
              f === e) &&
            f.child !== null
          ) {
            (f.child.return = f), (f = f.child);
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            c === f && (c = null), (f = f.return);
          }
          c === f && (c = null), (f.sibling.return = f.return), (f = f.sibling);
        }
      }
      break;
    case 19:
      it(t, e), mt(e), r & 4 && hd(e);
      break;
    case 21:
      break;
    default:
      it(t, e), mt(e);
  }
}
function mt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Om(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(b(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (di(i, ""), (r.flags &= -33));
          var o = dd(e);
          tl(e, o, i);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo,
            a = dd(e);
          el(e, a, s);
          break;
        default:
          throw Error(b(161));
      }
    } catch (u) {
      re(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function F0(e, t, n) {
  ($ = e), km(e);
}
function km(e, t, n) {
  for (var r = (e.mode & 1) !== 0; $ !== null; ) {
    var i = $,
      o = i.child;
    if (i.tag === 22 && r) {
      var s = i.memoizedState !== null || ao;
      if (!s) {
        var a = i.alternate,
          u = (a !== null && a.memoizedState !== null) || ke;
        a = ao;
        var l = ke;
        if (((ao = s), (ke = u) && !l))
          for ($ = i; $ !== null; )
            (s = $),
              (u = s.child),
              s.tag === 22 && s.memoizedState !== null
                ? yd(i)
                : u !== null
                ? ((u.return = s), ($ = u))
                : yd(i);
        for (; o !== null; ) ($ = o), km(o), (o = o.sibling);
        ($ = i), (ao = a), (ke = l);
      }
      pd(e);
    } else
      i.subtreeFlags & 8772 && o !== null ? ((o.return = i), ($ = o)) : pd(e);
  }
}
function pd(e) {
  for (; $ !== null; ) {
    var t = $;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ke || zs(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ke)
                if (n === null) r.componentDidMount();
                else {
                  var i =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : st(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    i,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var o = t.updateQueue;
              o !== null && Jf(t, o, r);
              break;
            case 3:
              var s = t.updateQueue;
              if (s !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Jf(t, s, n);
              }
              break;
            case 5:
              var a = t.stateNode;
              if (n === null && t.flags & 4) {
                n = a;
                var u = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    u.autoFocus && n.focus();
                    break;
                  case "img":
                    u.src && (n.src = u.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var l = t.alternate;
                if (l !== null) {
                  var c = l.memoizedState;
                  if (c !== null) {
                    var f = c.dehydrated;
                    f !== null && yi(f);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(b(163));
          }
        ke || (t.flags & 512 && Zu(t));
      } catch (d) {
        re(t, t.return, d);
      }
    }
    if (t === e) {
      $ = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), ($ = n);
      break;
    }
    $ = t.return;
  }
}
function md(e) {
  for (; $ !== null; ) {
    var t = $;
    if (t === e) {
      $ = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), ($ = n);
      break;
    }
    $ = t.return;
  }
}
function yd(e) {
  for (; $ !== null; ) {
    var t = $;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            zs(4, t);
          } catch (u) {
            re(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              re(t, i, u);
            }
          }
          var o = t.return;
          try {
            Zu(t);
          } catch (u) {
            re(t, o, u);
          }
          break;
        case 5:
          var s = t.return;
          try {
            Zu(t);
          } catch (u) {
            re(t, s, u);
          }
      }
    } catch (u) {
      re(t, t.return, u);
    }
    if (t === e) {
      $ = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      (a.return = t.return), ($ = a);
      break;
    }
    $ = t.return;
  }
}
var L0 = Math.ceil,
  ss = Mt.ReactCurrentDispatcher,
  Oc = Mt.ReactCurrentOwner,
  Xe = Mt.ReactCurrentBatchConfig,
  j = 0,
  pe = null,
  se = null,
  ge = 0,
  Me = 0,
  or = gn(0),
  ce = 0,
  bi = null,
  Dn = 0,
  Vs = 0,
  Pc = 0,
  si = null,
  $e = null,
  xc = 0,
  Er = 1 / 0,
  kt = null,
  as = !1,
  nl = null,
  on = null,
  uo = !1,
  Yt = null,
  us = 0,
  ai = 0,
  rl = null,
  Po = -1,
  xo = 0;
function Te() {
  return j & 6 ? oe() : Po !== -1 ? Po : (Po = oe());
}
function sn(e) {
  return e.mode & 1
    ? j & 2 && ge !== 0
      ? ge & -ge
      : w0.transition !== null
      ? (xo === 0 && (xo = lp()), xo)
      : ((e = V),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : yp(e.type))),
        e)
    : 1;
}
function ht(e, t, n, r) {
  if (50 < ai) throw ((ai = 0), (rl = null), Error(b(185)));
  Fi(e, n, r),
    (!(j & 2) || e !== pe) &&
      (e === pe && (!(j & 2) && (Vs |= n), ce === 4 && Ht(e, ge)),
      Ie(e, r),
      n === 1 && j === 0 && !(t.mode & 1) && ((Er = oe() + 500), js && wn()));
}
function Ie(e, t) {
  var n = e.callbackNode;
  wg(e, t);
  var r = qo(e, e === pe ? ge : 0);
  if (r === 0)
    n !== null && xf(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && xf(n), t === 1))
      e.tag === 0 ? g0(vd.bind(null, e)) : Fp(vd.bind(null, e)),
        p0(function () {
          !(j & 6) && wn();
        }),
        (n = null);
    else {
      switch (cp(r)) {
        case 1:
          n = Jl;
          break;
        case 4:
          n = ap;
          break;
        case 16:
          n = Qo;
          break;
        case 536870912:
          n = up;
          break;
        default:
          n = Qo;
      }
      n = Dm(n, bm.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function bm(e, t) {
  if (((Po = -1), (xo = 0), j & 6)) throw Error(b(327));
  var n = e.callbackNode;
  if (fr() && e.callbackNode !== n) return null;
  var r = qo(e, e === pe ? ge : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ls(e, r);
  else {
    t = r;
    var i = j;
    j |= 2;
    var o = Tm();
    (pe !== e || ge !== t) && ((kt = null), (Er = oe() + 500), Tn(e, t));
    do
      try {
        j0();
        break;
      } catch (a) {
        _m(e, a);
      }
    while (1);
    cc(),
      (ss.current = o),
      (j = i),
      se !== null ? (t = 0) : ((pe = null), (ge = 0), (t = ce));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((i = Ru(e)), i !== 0 && ((r = i), (t = il(e, i)))), t === 1)
    )
      throw ((n = bi), Tn(e, 0), Ht(e, r), Ie(e, oe()), n);
    if (t === 6) Ht(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !I0(i) &&
          ((t = ls(e, r)),
          t === 2 && ((o = Ru(e)), o !== 0 && ((r = o), (t = il(e, o)))),
          t === 1))
      )
        throw ((n = bi), Tn(e, 0), Ht(e, r), Ie(e, oe()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(b(345));
        case 2:
          On(e, $e, kt);
          break;
        case 3:
          if (
            (Ht(e, r), (r & 130023424) === r && ((t = xc + 500 - oe()), 10 < t))
          ) {
            if (qo(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              Te(), (e.pingedLanes |= e.suspendedLanes & i);
              break;
            }
            e.timeoutHandle = Mu(On.bind(null, e, $e, kt), t);
            break;
          }
          On(e, $e, kt);
          break;
        case 4:
          if ((Ht(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var s = 31 - dt(r);
            (o = 1 << s), (s = t[s]), s > i && (i = s), (r &= ~o);
          }
          if (
            ((r = i),
            (r = oe() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * L0(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Mu(On.bind(null, e, $e, kt), r);
            break;
          }
          On(e, $e, kt);
          break;
        case 5:
          On(e, $e, kt);
          break;
        default:
          throw Error(b(329));
      }
    }
  }
  return Ie(e, oe()), e.callbackNode === n ? bm.bind(null, e) : null;
}
function il(e, t) {
  var n = si;
  return (
    e.current.memoizedState.isDehydrated && (Tn(e, t).flags |= 256),
    (e = ls(e, t)),
    e !== 2 && ((t = $e), ($e = n), t !== null && ol(t)),
    e
  );
}
function ol(e) {
  $e === null ? ($e = e) : $e.push.apply($e, e);
}
function I0(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            o = i.getSnapshot;
          i = i.value;
          try {
            if (!pt(o(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function Ht(e, t) {
  for (
    t &= ~Pc,
      t &= ~Vs,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - dt(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function vd(e) {
  if (j & 6) throw Error(b(327));
  fr();
  var t = qo(e, 0);
  if (!(t & 1)) return Ie(e, oe()), null;
  var n = ls(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ru(e);
    r !== 0 && ((t = r), (n = il(e, r)));
  }
  if (n === 1) throw ((n = bi), Tn(e, 0), Ht(e, t), Ie(e, oe()), n);
  if (n === 6) throw Error(b(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    On(e, $e, kt),
    Ie(e, oe()),
    null
  );
}
function kc(e, t) {
  var n = j;
  j |= 1;
  try {
    return e(t);
  } finally {
    (j = n), j === 0 && ((Er = oe() + 500), js && wn());
  }
}
function Fn(e) {
  Yt !== null && Yt.tag === 0 && !(j & 6) && fr();
  var t = j;
  j |= 1;
  var n = Xe.transition,
    r = V;
  try {
    if (((Xe.transition = null), (V = 1), e)) return e();
  } finally {
    (V = r), (Xe.transition = n), (j = t), !(j & 6) && wn();
  }
}
function bc() {
  (Me = or.current), Y(or);
}
function Tn(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), h0(n)), se !== null))
    for (n = se.return; n !== null; ) {
      var r = n;
      switch ((ac(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && Yo();
          break;
        case 3:
          wr(), Y(Fe), Y(be), yc();
          break;
        case 5:
          mc(r);
          break;
        case 4:
          wr();
          break;
        case 13:
          Y(Z);
          break;
        case 19:
          Y(Z);
          break;
        case 10:
          fc(r.type._context);
          break;
        case 22:
        case 23:
          bc();
      }
      n = n.return;
    }
  if (
    ((pe = e),
    (se = e = an(e.current, null)),
    (ge = Me = t),
    (ce = 0),
    (bi = null),
    (Pc = Vs = Dn = 0),
    ($e = si = null),
    kn !== null)
  ) {
    for (t = 0; t < kn.length; t++)
      if (((n = kn[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var i = r.next,
          o = n.pending;
        if (o !== null) {
          var s = o.next;
          (o.next = i), (r.next = s);
        }
        n.pending = r;
      }
    kn = null;
  }
  return e;
}
function _m(e, t) {
  do {
    var n = se;
    try {
      if ((cc(), (Eo.current = os), is)) {
        for (var r = te.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), (r = r.next);
        }
        is = !1;
      }
      if (
        (($n = 0),
        (de = le = te = null),
        (ii = !1),
        (Pi = 0),
        (Oc.current = null),
        n === null || n.return === null)
      ) {
        (ce = 1), (bi = t), (se = null);
        break;
      }
      e: {
        var o = e,
          s = n.return,
          a = n,
          u = t;
        if (
          ((t = ge),
          (a.flags |= 32768),
          u !== null && typeof u == "object" && typeof u.then == "function")
        ) {
          var l = u,
            c = a,
            f = c.tag;
          if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var d = c.alternate;
            d
              ? ((c.updateQueue = d.updateQueue),
                (c.memoizedState = d.memoizedState),
                (c.lanes = d.lanes))
              : ((c.updateQueue = null), (c.memoizedState = null));
          }
          var y = id(s);
          if (y !== null) {
            (y.flags &= -257),
              od(y, s, a, o, t),
              y.mode & 1 && rd(o, l, t),
              (t = y),
              (u = l);
            var p = t.updateQueue;
            if (p === null) {
              var v = new Set();
              v.add(u), (t.updateQueue = v);
            } else p.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              rd(o, l, t), _c();
              break e;
            }
            u = Error(b(426));
          }
        } else if (X && a.mode & 1) {
          var C = id(s);
          if (C !== null) {
            !(C.flags & 65536) && (C.flags |= 256),
              od(C, s, a, o, t),
              uc(Sr(u, a));
            break e;
          }
        }
        (o = u = Sr(u, a)),
          ce !== 4 && (ce = 2),
          si === null ? (si = [o]) : si.push(o),
          (o = s);
        do {
          switch (o.tag) {
            case 3:
              (o.flags |= 65536), (t &= -t), (o.lanes |= t);
              var m = fm(o, u, t);
              Yf(o, m);
              break e;
            case 1:
              a = u;
              var h = o.type,
                g = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof h.getDerivedStateFromError == "function" ||
                  (g !== null &&
                    typeof g.componentDidCatch == "function" &&
                    (on === null || !on.has(g))))
              ) {
                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                var E = dm(o, a, t);
                Yf(o, E);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Nm(n);
    } catch (x) {
      (t = x), se === n && n !== null && (se = n = n.return);
      continue;
    }
    break;
  } while (1);
}
function Tm() {
  var e = ss.current;
  return (ss.current = os), e === null ? os : e;
}
function _c() {
  (ce === 0 || ce === 3 || ce === 2) && (ce = 4),
    pe === null || (!(Dn & 268435455) && !(Vs & 268435455)) || Ht(pe, ge);
}
function ls(e, t) {
  var n = j;
  j |= 2;
  var r = Tm();
  (pe !== e || ge !== t) && ((kt = null), Tn(e, t));
  do
    try {
      M0();
      break;
    } catch (i) {
      _m(e, i);
    }
  while (1);
  if ((cc(), (j = n), (ss.current = r), se !== null)) throw Error(b(261));
  return (pe = null), (ge = 0), ce;
}
function M0() {
  for (; se !== null; ) Rm(se);
}
function j0() {
  for (; se !== null && !cg(); ) Rm(se);
}
function Rm(e) {
  var t = $m(e.alternate, e, Me);
  (e.memoizedProps = e.pendingProps),
    t === null ? Nm(e) : (se = t),
    (Oc.current = null);
}
function Nm(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = A0(n, t)), n !== null)) {
        (n.flags &= 32767), (se = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (ce = 6), (se = null);
        return;
      }
    } else if (((n = N0(n, t, Me)), n !== null)) {
      se = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      se = t;
      return;
    }
    se = t = e;
  } while (t !== null);
  ce === 0 && (ce = 5);
}
function On(e, t, n) {
  var r = V,
    i = Xe.transition;
  try {
    (Xe.transition = null), (V = 1), U0(e, t, n, r);
  } finally {
    (Xe.transition = i), (V = r);
  }
  return null;
}
function U0(e, t, n, r) {
  do fr();
  while (Yt !== null);
  if (j & 6) throw Error(b(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(b(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var o = n.lanes | n.childLanes;
  if (
    (Sg(e, o),
    e === pe && ((se = pe = null), (ge = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      uo ||
      ((uo = !0),
      Dm(Qo, function () {
        return fr(), null;
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    (o = Xe.transition), (Xe.transition = null);
    var s = V;
    V = 1;
    var a = j;
    (j |= 4),
      (Oc.current = null),
      D0(e, n),
      xm(n, e),
      s0(Lu),
      (Ho = !!Fu),
      (Lu = Fu = null),
      (e.current = n),
      F0(n),
      fg(),
      (j = a),
      (V = s),
      (Xe.transition = o);
  } else e.current = n;
  if (
    (uo && ((uo = !1), (Yt = e), (us = i)),
    (o = e.pendingLanes),
    o === 0 && (on = null),
    pg(n.stateNode),
    Ie(e, oe()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest });
  if (as) throw ((as = !1), (e = nl), (nl = null), e);
  return (
    us & 1 && e.tag !== 0 && fr(),
    (o = e.pendingLanes),
    o & 1 ? (e === rl ? ai++ : ((ai = 0), (rl = e))) : (ai = 0),
    wn(),
    null
  );
}
function fr() {
  if (Yt !== null) {
    var e = cp(us),
      t = Xe.transition,
      n = V;
    try {
      if (((Xe.transition = null), (V = 16 > e ? 16 : e), Yt === null))
        var r = !1;
      else {
        if (((e = Yt), (Yt = null), (us = 0), j & 6)) throw Error(b(331));
        var i = j;
        for (j |= 4, $ = e.current; $ !== null; ) {
          var o = $,
            s = o.child;
          if ($.flags & 16) {
            var a = o.deletions;
            if (a !== null) {
              for (var u = 0; u < a.length; u++) {
                var l = a[u];
                for ($ = l; $ !== null; ) {
                  var c = $;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      oi(8, c, o);
                  }
                  var f = c.child;
                  if (f !== null) (f.return = c), ($ = f);
                  else
                    for (; $ !== null; ) {
                      c = $;
                      var d = c.sibling,
                        y = c.return;
                      if ((Cm(c), c === l)) {
                        $ = null;
                        break;
                      }
                      if (d !== null) {
                        (d.return = y), ($ = d);
                        break;
                      }
                      $ = y;
                    }
                }
              }
              var p = o.alternate;
              if (p !== null) {
                var v = p.child;
                if (v !== null) {
                  p.child = null;
                  do {
                    var C = v.sibling;
                    (v.sibling = null), (v = C);
                  } while (v !== null);
                }
              }
              $ = o;
            }
          }
          if (o.subtreeFlags & 2064 && s !== null) (s.return = o), ($ = s);
          else
            e: for (; $ !== null; ) {
              if (((o = $), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    oi(9, o, o.return);
                }
              var m = o.sibling;
              if (m !== null) {
                (m.return = o.return), ($ = m);
                break e;
              }
              $ = o.return;
            }
        }
        var h = e.current;
        for ($ = h; $ !== null; ) {
          s = $;
          var g = s.child;
          if (s.subtreeFlags & 2064 && g !== null) (g.return = s), ($ = g);
          else
            e: for (s = h; $ !== null; ) {
              if (((a = $), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      zs(9, a);
                  }
                } catch (x) {
                  re(a, a.return, x);
                }
              if (a === s) {
                $ = null;
                break e;
              }
              var E = a.sibling;
              if (E !== null) {
                (E.return = a.return), ($ = E);
                break e;
              }
              $ = a.return;
            }
        }
        if (
          ((j = i), wn(), wt && typeof wt.onPostCommitFiberRoot == "function")
        )
          try {
            wt.onPostCommitFiberRoot(Ds, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (V = n), (Xe.transition = t);
    }
  }
  return !1;
}
function gd(e, t, n) {
  (t = Sr(n, t)),
    (t = fm(e, t, 1)),
    (e = rn(e, t, 1)),
    (t = Te()),
    e !== null && (Fi(e, 1, t), Ie(e, t));
}
function re(e, t, n) {
  if (e.tag === 3) gd(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        gd(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (on === null || !on.has(r)))
        ) {
          (e = Sr(n, e)),
            (e = dm(t, e, 1)),
            (t = rn(t, e, 1)),
            (e = Te()),
            t !== null && (Fi(t, 1, e), Ie(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function B0(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = Te()),
    (e.pingedLanes |= e.suspendedLanes & n),
    pe === e &&
      (ge & n) === n &&
      (ce === 4 || (ce === 3 && (ge & 130023424) === ge && 500 > oe() - xc)
        ? Tn(e, 0)
        : (Pc |= n)),
    Ie(e, t);
}
function Am(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Xi), (Xi <<= 1), !(Xi & 130023424) && (Xi = 4194304))
      : (t = 1));
  var n = Te();
  (e = Dt(e, t)), e !== null && (Fi(e, t, n), Ie(e, n));
}
function z0(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Am(e, n);
}
function V0(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(b(314));
  }
  r !== null && r.delete(t), Am(e, n);
}
var $m;
$m = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Fe.current) De = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (De = !1), R0(e, t, n);
      De = !!(e.flags & 131072);
    }
  else (De = !1), X && t.flags & 1048576 && Lp(t, Zo, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      Oo(e, t), (e = t.pendingProps);
      var i = yr(t, be.current);
      cr(t, n), (i = gc(null, t, r, e, i, n));
      var o = wc();
      return (
        (t.flags |= 1),
        typeof i == "object" &&
        i !== null &&
        typeof i.render == "function" &&
        i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Le(r) ? ((o = !0), Jo(t)) : (o = !1),
            (t.memoizedState =
              i.state !== null && i.state !== void 0 ? i.state : null),
            hc(t),
            (i.updater = Us),
            (t.stateNode = i),
            (i._reactInternals = t),
            qu(t, r, e, n),
            (t = Ku(null, t, r, !0, o, n)))
          : ((t.tag = 0), X && o && sc(t), _e(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Oo(e, t),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = q0(r)),
          (e = st(r, e)),
          i)
        ) {
          case 0:
            t = Wu(null, t, r, e, n);
            break e;
          case 1:
            t = ud(null, t, r, e, n);
            break e;
          case 11:
            t = sd(null, t, r, e, n);
            break e;
          case 14:
            t = ad(null, t, r, st(r.type, e), n);
            break e;
        }
        throw Error(b(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : st(r, i)),
        Wu(e, t, r, i, n)
      );
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : st(r, i)),
        ud(e, t, r, i, n)
      );
    case 3:
      e: {
        if ((ym(t), e === null)) throw Error(b(387));
        (r = t.pendingProps),
          (o = t.memoizedState),
          (i = o.element),
          Up(e, t),
          ns(t, r, null, n);
        var s = t.memoizedState;
        if (((r = s.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: s.cache,
              pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
              transitions: s.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            (i = Sr(Error(b(423)), t)), (t = ld(e, t, r, n, i));
            break e;
          } else if (r !== i) {
            (i = Sr(Error(b(424)), t)), (t = ld(e, t, r, n, i));
            break e;
          } else
            for (
              je = nn(t.stateNode.containerInfo.firstChild),
                Be = t,
                X = !0,
                ct = null,
                n = Qp(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((vr(), r === i)) {
            t = Ft(e, t, n);
            break e;
          }
          _e(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        qp(t),
        e === null && zu(t),
        (r = t.type),
        (i = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (s = i.children),
        Iu(r, i) ? (s = null) : o !== null && Iu(r, o) && (t.flags |= 32),
        mm(e, t),
        _e(e, t, s, n),
        t.child
      );
    case 6:
      return e === null && zu(t), null;
    case 13:
      return vm(e, t, n);
    case 4:
      return (
        pc(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = gr(t, null, r, n)) : _e(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : st(r, i)),
        sd(e, t, r, i, n)
      );
    case 7:
      return _e(e, t, t.pendingProps, n), t.child;
    case 8:
      return _e(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return _e(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (o = t.memoizedProps),
          (s = i.value),
          K(es, r._currentValue),
          (r._currentValue = s),
          o !== null)
        )
          if (pt(o.value, s)) {
            if (o.children === i.children && !Fe.current) {
              t = Ft(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var a = o.dependencies;
              if (a !== null) {
                s = o.child;
                for (var u = a.firstContext; u !== null; ) {
                  if (u.context === r) {
                    if (o.tag === 1) {
                      (u = Rt(-1, n & -n)), (u.tag = 2);
                      var l = o.updateQueue;
                      if (l !== null) {
                        l = l.shared;
                        var c = l.pending;
                        c === null
                          ? (u.next = u)
                          : ((u.next = c.next), (c.next = u)),
                          (l.pending = u);
                      }
                    }
                    (o.lanes |= n),
                      (u = o.alternate),
                      u !== null && (u.lanes |= n),
                      Vu(o.return, n, t),
                      (a.lanes |= n);
                    break;
                  }
                  u = u.next;
                }
              } else if (o.tag === 10) s = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((s = o.return), s === null)) throw Error(b(341));
                (s.lanes |= n),
                  (a = s.alternate),
                  a !== null && (a.lanes |= n),
                  Vu(s, n, t),
                  (s = o.sibling);
              } else s = o.child;
              if (s !== null) s.return = o;
              else
                for (s = o; s !== null; ) {
                  if (s === t) {
                    s = null;
                    break;
                  }
                  if (((o = s.sibling), o !== null)) {
                    (o.return = s.return), (s = o);
                    break;
                  }
                  s = s.return;
                }
              o = s;
            }
        _e(e, t, i.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        cr(t, n),
        (i = et(i)),
        (r = r(i)),
        (t.flags |= 1),
        _e(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (i = st(r, t.pendingProps)),
        (i = st(r.type, i)),
        ad(e, t, r, i, n)
      );
    case 15:
      return hm(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : st(r, i)),
        Oo(e, t),
        (t.tag = 1),
        Le(r) ? ((e = !0), Jo(t)) : (e = !1),
        cr(t, n),
        zp(t, r, i),
        qu(t, r, i, n),
        Ku(null, t, r, !0, e, n)
      );
    case 19:
      return gm(e, t, n);
    case 22:
      return pm(e, t, n);
  }
  throw Error(b(156, t.tag));
};
function Dm(e, t) {
  return sp(e, t);
}
function Q0(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Je(e, t, n, r) {
  return new Q0(e, t, n, r);
}
function Tc(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function q0(e) {
  if (typeof e == "function") return Tc(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Kl)) return 11;
    if (e === Gl) return 14;
  }
  return 2;
}
function an(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Je(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function ko(e, t, n, r, i, o) {
  var s = 2;
  if (((r = e), typeof e == "function")) Tc(e) && (s = 1);
  else if (typeof e == "string") s = 5;
  else
    e: switch (e) {
      case Gn:
        return Rn(n.children, i, o, t);
      case Wl:
        (s = 8), (i |= 8);
        break;
      case mu:
        return (
          (e = Je(12, n, t, i | 2)), (e.elementType = mu), (e.lanes = o), e
        );
      case yu:
        return (e = Je(13, n, t, i)), (e.elementType = yu), (e.lanes = o), e;
      case vu:
        return (e = Je(19, n, t, i)), (e.elementType = vu), (e.lanes = o), e;
      case Vh:
        return Qs(n, i, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Bh:
              s = 10;
              break e;
            case zh:
              s = 9;
              break e;
            case Kl:
              s = 11;
              break e;
            case Gl:
              s = 14;
              break e;
            case zt:
              (s = 16), (r = null);
              break e;
          }
        throw Error(b(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Je(s, n, t, i)), (t.elementType = e), (t.type = r), (t.lanes = o), t
  );
}
function Rn(e, t, n, r) {
  return (e = Je(7, e, r, t)), (e.lanes = n), e;
}
function Qs(e, t, n, r) {
  return (
    (e = Je(22, e, r, t)),
    (e.elementType = Vh),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Ga(e, t, n) {
  return (e = Je(6, e, null, t)), (e.lanes = n), e;
}
function Ya(e, t, n) {
  return (
    (t = Je(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function H0(e, t, n, r, i) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Ra(0)),
    (this.expirationTimes = Ra(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Ra(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null);
}
function Rc(e, t, n, r, i, o, s, a, u) {
  return (
    (e = new H0(e, t, n, a, u)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = Je(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    hc(o),
    e
  );
}
function W0(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Kn,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function Fm(e) {
  if (!e) return hn;
  e = e._reactInternals;
  e: {
    if (jn(e) !== e || e.tag !== 1) throw Error(b(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Le(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(b(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Le(n)) return Dp(e, n, t);
  }
  return t;
}
function Lm(e, t, n, r, i, o, s, a, u) {
  return (
    (e = Rc(n, r, !0, e, i, o, s, a, u)),
    (e.context = Fm(null)),
    (n = e.current),
    (r = Te()),
    (i = sn(n)),
    (o = Rt(r, i)),
    (o.callback = t ?? null),
    rn(n, o, i),
    (e.current.lanes = i),
    Fi(e, i, r),
    Ie(e, r),
    e
  );
}
function qs(e, t, n, r) {
  var i = t.current,
    o = Te(),
    s = sn(i);
  return (
    (n = Fm(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Rt(o, s)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = rn(i, t, s)),
    e !== null && (ht(e, i, s, o), So(e, i, s)),
    s
  );
}
function cs(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function wd(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Nc(e, t) {
  wd(e, t), (e = e.alternate) && wd(e, t);
}
function K0() {
  return null;
}
var Im =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Ac(e) {
  this._internalRoot = e;
}
Hs.prototype.render = Ac.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(b(409));
  qs(e, t, null, null);
};
Hs.prototype.unmount = Ac.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Fn(function () {
      qs(null, e, null, null);
    }),
      (t[$t] = null);
  }
};
function Hs(e) {
  this._internalRoot = e;
}
Hs.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = hp();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < qt.length && t !== 0 && t < qt[n].priority; n++);
    qt.splice(n, 0, e), n === 0 && mp(e);
  }
};
function $c(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Ws(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Sd() {}
function G0(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var l = cs(s);
        o.call(l);
      };
    }
    var s = Lm(t, r, e, 0, null, !1, !1, "", Sd);
    return (
      (e._reactRootContainer = s),
      (e[$t] = s.current),
      wi(e.nodeType === 8 ? e.parentNode : e),
      Fn(),
      s
    );
  }
  for (; (i = e.lastChild); ) e.removeChild(i);
  if (typeof r == "function") {
    var a = r;
    r = function () {
      var l = cs(u);
      a.call(l);
    };
  }
  var u = Rc(e, 0, !1, null, null, !1, !1, "", Sd);
  return (
    (e._reactRootContainer = u),
    (e[$t] = u.current),
    wi(e.nodeType === 8 ? e.parentNode : e),
    Fn(function () {
      qs(t, u, n, r);
    }),
    u
  );
}
function Ks(e, t, n, r, i) {
  var o = n._reactRootContainer;
  if (o) {
    var s = o;
    if (typeof i == "function") {
      var a = i;
      i = function () {
        var u = cs(s);
        a.call(u);
      };
    }
    qs(t, s, e, i);
  } else s = G0(n, t, e, i, r);
  return cs(s);
}
fp = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Wr(t.pendingLanes);
        n !== 0 &&
          (Xl(t, n | 1), Ie(t, oe()), !(j & 6) && ((Er = oe() + 500), wn()));
      }
      break;
    case 13:
      Fn(function () {
        var r = Dt(e, 1);
        if (r !== null) {
          var i = Te();
          ht(r, e, 1, i);
        }
      }),
        Nc(e, 1);
  }
};
Zl = function (e) {
  if (e.tag === 13) {
    var t = Dt(e, 134217728);
    if (t !== null) {
      var n = Te();
      ht(t, e, 134217728, n);
    }
    Nc(e, 134217728);
  }
};
dp = function (e) {
  if (e.tag === 13) {
    var t = sn(e),
      n = Dt(e, t);
    if (n !== null) {
      var r = Te();
      ht(n, e, t, r);
    }
    Nc(e, t);
  }
};
hp = function () {
  return V;
};
pp = function (e, t) {
  var n = V;
  try {
    return (V = e), t();
  } finally {
    V = n;
  }
};
bu = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Su(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = Ms(r);
            if (!i) throw Error(b(90));
            qh(r), Su(r, i);
          }
        }
      }
      break;
    case "textarea":
      Wh(e, n);
      break;
    case "select":
      (t = n.value), t != null && sr(e, !!n.multiple, t, !1);
  }
};
ep = kc;
tp = Fn;
var Y0 = { usingClientEntryPoint: !1, Events: [Ii, Zn, Ms, Xh, Zh, kc] },
  Br = {
    findFiberByHostInstance: xn,
    bundleType: 0,
    version: "18.2.0",
    rendererPackageName: "react-dom",
  },
  J0 = {
    bundleType: Br.bundleType,
    version: Br.version,
    rendererPackageName: Br.rendererPackageName,
    rendererConfig: Br.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Mt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = ip(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: Br.findFiberByHostInstance || K0,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var lo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!lo.isDisabled && lo.supportsFiber)
    try {
      (Ds = lo.inject(J0)), (wt = lo);
    } catch {}
}
Qe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Y0;
Qe.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!$c(t)) throw Error(b(200));
  return W0(e, t, null, n);
};
Qe.createRoot = function (e, t) {
  if (!$c(e)) throw Error(b(299));
  var n = !1,
    r = "",
    i = Im;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = Rc(e, 1, !1, null, null, n, !1, r, i)),
    (e[$t] = t.current),
    wi(e.nodeType === 8 ? e.parentNode : e),
    new Ac(t)
  );
};
Qe.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(b(188))
      : ((e = Object.keys(e).join(",")), Error(b(268, e)));
  return (e = ip(t)), (e = e === null ? null : e.stateNode), e;
};
Qe.flushSync = function (e) {
  return Fn(e);
};
Qe.hydrate = function (e, t, n) {
  if (!Ws(t)) throw Error(b(200));
  return Ks(null, e, t, !0, n);
};
Qe.hydrateRoot = function (e, t, n) {
  if (!$c(e)) throw Error(b(405));
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    o = "",
    s = Im;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
    (t = Lm(t, null, e, 1, n ?? null, i, !1, o, s)),
    (e[$t] = t.current),
    wi(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i);
  return new Hs(t);
};
Qe.render = function (e, t, n) {
  if (!Ws(t)) throw Error(b(200));
  return Ks(null, e, t, !1, n);
};
Qe.unmountComponentAtNode = function (e) {
  if (!Ws(e)) throw Error(b(40));
  return e._reactRootContainer
    ? (Fn(function () {
        Ks(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[$t] = null);
        });
      }),
      !0)
    : !1;
};
Qe.unstable_batchedUpdates = kc;
Qe.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Ws(n)) throw Error(b(200));
  if (e == null || e._reactInternals === void 0) throw Error(b(38));
  return Ks(e, t, n, !1, r);
};
Qe.version = "18.2.0-next-9e3b772b8-20220608";
(function (e) {
  function t() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (n) {
        console.error(n);
      }
  }
  t(), (e.exports = Qe);
})(Kv);
const Mm = Th(ci);
var Ed = ci;
(du.createRoot = Ed.createRoot), (du.hydrateRoot = Ed.hydrateRoot);
/**
 * @remix-run/router v1.4.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function _i() {
  return (
    (_i = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    _i.apply(this, arguments)
  );
}
var Jt;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(Jt || (Jt = {}));
const Cd = "popstate";
function X0(e) {
  e === void 0 && (e = {});
  function t(r, i) {
    let { pathname: o, search: s, hash: a } = r.location;
    return sl(
      "",
      { pathname: o, search: s, hash: a },
      (i.state && i.state.usr) || null,
      (i.state && i.state.key) || "default"
    );
  }
  function n(r, i) {
    return typeof i == "string" ? i : fs(i);
  }
  return e1(t, n, null, e);
}
function ue(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Dc(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function Z0() {
  return Math.random().toString(36).substr(2, 8);
}
function Od(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function sl(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    _i(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? br(t) : t,
      { state: n, key: (t && t.key) || r || Z0() }
    )
  );
}
function fs(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function br(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function e1(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: i = document.defaultView, v5Compat: o = !1 } = r,
    s = i.history,
    a = Jt.Pop,
    u = null,
    l = c();
  l == null && ((l = 0), s.replaceState(_i({}, s.state, { idx: l }), ""));
  function c() {
    return (s.state || { idx: null }).idx;
  }
  function f() {
    a = Jt.Pop;
    let C = c(),
      m = C == null ? null : C - l;
    (l = C), u && u({ action: a, location: v.location, delta: m });
  }
  function d(C, m) {
    a = Jt.Push;
    let h = sl(v.location, C, m);
    n && n(h, C), (l = c() + 1);
    let g = Od(h, l),
      E = v.createHref(h);
    try {
      s.pushState(g, "", E);
    } catch {
      i.location.assign(E);
    }
    o && u && u({ action: a, location: v.location, delta: 1 });
  }
  function y(C, m) {
    a = Jt.Replace;
    let h = sl(v.location, C, m);
    n && n(h, C), (l = c());
    let g = Od(h, l),
      E = v.createHref(h);
    s.replaceState(g, "", E),
      o && u && u({ action: a, location: v.location, delta: 0 });
  }
  function p(C) {
    let m = i.location.origin !== "null" ? i.location.origin : i.location.href,
      h = typeof C == "string" ? C : fs(C);
    return (
      ue(
        m,
        "No window.location.(origin|href) available to create URL for href: " +
          h
      ),
      new URL(h, m)
    );
  }
  let v = {
    get action() {
      return a;
    },
    get location() {
      return e(i, s);
    },
    listen(C) {
      if (u) throw new Error("A history only accepts one active listener");
      return (
        i.addEventListener(Cd, f),
        (u = C),
        () => {
          i.removeEventListener(Cd, f), (u = null);
        }
      );
    },
    createHref(C) {
      return t(i, C);
    },
    createURL: p,
    encodeLocation(C) {
      let m = p(C);
      return { pathname: m.pathname, search: m.search, hash: m.hash };
    },
    push: d,
    replace: y,
    go(C) {
      return s.go(C);
    },
  };
  return v;
}
var Pd;
(function (e) {
  (e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error");
})(Pd || (Pd = {}));
function t1(e, t, n) {
  n === void 0 && (n = "/");
  let r = typeof t == "string" ? br(t) : t,
    i = Fc(r.pathname || "/", n);
  if (i == null) return null;
  let o = jm(e);
  n1(o);
  let s = null;
  for (let a = 0; s == null && a < o.length; ++a) s = f1(o[a], p1(i));
  return s;
}
function jm(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let i = (o, s, a) => {
    let u = {
      relativePath: a === void 0 ? o.path || "" : a,
      caseSensitive: o.caseSensitive === !0,
      childrenIndex: s,
      route: o,
    };
    u.relativePath.startsWith("/") &&
      (ue(
        u.relativePath.startsWith(r),
        'Absolute route path "' +
          u.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes."
      ),
      (u.relativePath = u.relativePath.slice(r.length)));
    let l = un([r, u.relativePath]),
      c = n.concat(u);
    o.children &&
      o.children.length > 0 &&
      (ue(
        o.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + l + '".')
      ),
      jm(o.children, t, c, l)),
      !(o.path == null && !o.index) &&
        t.push({ path: l, score: l1(l, o.index), routesMeta: c });
  };
  return (
    e.forEach((o, s) => {
      var a;
      if (o.path === "" || !((a = o.path) != null && a.includes("?"))) i(o, s);
      else for (let u of Um(o.path)) i(o, s, u);
    }),
    t
  );
}
function Um(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    i = n.endsWith("?"),
    o = n.replace(/\?$/, "");
  if (r.length === 0) return i ? [o, ""] : [o];
  let s = Um(r.join("/")),
    a = [];
  return (
    a.push(...s.map((u) => (u === "" ? o : [o, u].join("/")))),
    i && a.push(...s),
    a.map((u) => (e.startsWith("/") && u === "" ? "/" : u))
  );
}
function n1(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : c1(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
const r1 = /^:\w+$/,
  i1 = 3,
  o1 = 2,
  s1 = 1,
  a1 = 10,
  u1 = -2,
  xd = (e) => e === "*";
function l1(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(xd) && (r += u1),
    t && (r += o1),
    n
      .filter((i) => !xd(i))
      .reduce((i, o) => i + (r1.test(o) ? i1 : o === "" ? s1 : a1), r)
  );
}
function c1(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, i) => r === t[i])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function f1(e, t) {
  let { routesMeta: n } = e,
    r = {},
    i = "/",
    o = [];
  for (let s = 0; s < n.length; ++s) {
    let a = n[s],
      u = s === n.length - 1,
      l = i === "/" ? t : t.slice(i.length) || "/",
      c = d1(
        { path: a.relativePath, caseSensitive: a.caseSensitive, end: u },
        l
      );
    if (!c) return null;
    Object.assign(r, c.params);
    let f = a.route;
    o.push({
      params: r,
      pathname: un([i, c.pathname]),
      pathnameBase: g1(un([i, c.pathnameBase])),
      route: f,
    }),
      c.pathnameBase !== "/" && (i = un([i, c.pathnameBase]));
  }
  return o;
}
function d1(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = h1(e.path, e.caseSensitive, e.end),
    i = t.match(n);
  if (!i) return null;
  let o = i[0],
    s = o.replace(/(.)\/+$/, "$1"),
    a = i.slice(1);
  return {
    params: r.reduce((l, c, f) => {
      if (c === "*") {
        let d = a[f] || "";
        s = o.slice(0, o.length - d.length).replace(/(.)\/+$/, "$1");
      }
      return (l[c] = m1(a[f] || "", c)), l;
    }, {}),
    pathname: o,
    pathnameBase: s,
    pattern: e,
  };
}
function h1(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    Dc(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".')
    );
  let r = [],
    i =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&")
        .replace(/\/:(\w+)/g, (s, a) => (r.push(a), "/([^\\/]+)"));
  return (
    e.endsWith("*")
      ? (r.push("*"),
        (i += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
      ? (i += "\\/*$")
      : e !== "" && e !== "/" && (i += "(?:(?=\\/|$))"),
    [new RegExp(i, t ? void 0 : "i"), r]
  );
}
function p1(e) {
  try {
    return decodeURI(e);
  } catch (t) {
    return (
      Dc(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ").")
      ),
      e
    );
  }
}
function m1(e, t) {
  try {
    return decodeURIComponent(e);
  } catch (n) {
    return (
      Dc(
        !1,
        'The value for the URL param "' +
          t +
          '" will not be decoded because' +
          (' the string "' +
            e +
            '" is a malformed URL segment. This is probably') +
          (" due to a bad percent encoding (" + n + ").")
      ),
      e
    );
  }
}
function Fc(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function y1(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: i = "",
  } = typeof e == "string" ? br(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : v1(n, t)) : t,
    search: w1(r),
    hash: S1(i),
  };
}
function v1(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((i) => {
      i === ".." ? n.length > 1 && n.pop() : i !== "." && n.push(i);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function Ja(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function Bm(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0)
  );
}
function zm(e, t, n, r) {
  r === void 0 && (r = !1);
  let i;
  typeof e == "string"
    ? (i = br(e))
    : ((i = _i({}, e)),
      ue(
        !i.pathname || !i.pathname.includes("?"),
        Ja("?", "pathname", "search", i)
      ),
      ue(
        !i.pathname || !i.pathname.includes("#"),
        Ja("#", "pathname", "hash", i)
      ),
      ue(!i.search || !i.search.includes("#"), Ja("#", "search", "hash", i)));
  let o = e === "" || i.pathname === "",
    s = o ? "/" : i.pathname,
    a;
  if (r || s == null) a = n;
  else {
    let f = t.length - 1;
    if (s.startsWith("..")) {
      let d = s.split("/");
      for (; d[0] === ".."; ) d.shift(), (f -= 1);
      i.pathname = d.join("/");
    }
    a = f >= 0 ? t[f] : "/";
  }
  let u = y1(i, a),
    l = s && s !== "/" && s.endsWith("/"),
    c = (o || s === ".") && n.endsWith("/");
  return !u.pathname.endsWith("/") && (l || c) && (u.pathname += "/"), u;
}
const un = (e) => e.join("/").replace(/\/\/+/g, "/"),
  g1 = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  w1 = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  S1 = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function E1(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
/**
 * React Router v6.9.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function C1(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
const O1 = typeof Object.is == "function" ? Object.is : C1,
  { useState: P1, useEffect: x1, useLayoutEffect: k1, useDebugValue: b1 } = fu;
function _1(e, t, n) {
  const r = t(),
    [{ inst: i }, o] = P1({ inst: { value: r, getSnapshot: t } });
  return (
    k1(() => {
      (i.value = r), (i.getSnapshot = t), Xa(i) && o({ inst: i });
    }, [e, r, t]),
    x1(
      () => (
        Xa(i) && o({ inst: i }),
        e(() => {
          Xa(i) && o({ inst: i });
        })
      ),
      [e]
    ),
    b1(r),
    r
  );
}
function Xa(e) {
  const t = e.getSnapshot,
    n = e.value;
  try {
    const r = t();
    return !O1(n, r);
  } catch {
    return !0;
  }
}
function T1(e, t, n) {
  return t();
}
const R1 =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  N1 = !R1,
  A1 = N1 ? T1 : _1;
"useSyncExternalStore" in fu && ((e) => e.useSyncExternalStore)(fu);
const Vm = O.createContext(null),
  Lc = O.createContext(null),
  ji = O.createContext(null),
  Gs = O.createContext(null),
  Un = O.createContext({ outlet: null, matches: [] }),
  Qm = O.createContext(null);
function al() {
  return (
    (al = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    al.apply(this, arguments)
  );
}
function $1(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  _r() || ue(!1);
  let { basename: r, navigator: i } = O.useContext(ji),
    { hash: o, pathname: s, search: a } = Hm(e, { relative: n }),
    u = s;
  return (
    r !== "/" && (u = s === "/" ? r : un([r, s])),
    i.createHref({ pathname: u, search: a, hash: o })
  );
}
function _r() {
  return O.useContext(Gs) != null;
}
function Tr() {
  return _r() || ue(!1), O.useContext(Gs).location;
}
function qm() {
  _r() || ue(!1);
  let { basename: e, navigator: t } = O.useContext(ji),
    { matches: n } = O.useContext(Un),
    { pathname: r } = Tr(),
    i = JSON.stringify(Bm(n).map((a) => a.pathnameBase)),
    o = O.useRef(!1);
  return (
    O.useEffect(() => {
      o.current = !0;
    }),
    O.useCallback(
      function (a, u) {
        if ((u === void 0 && (u = {}), !o.current)) return;
        if (typeof a == "number") {
          t.go(a);
          return;
        }
        let l = zm(a, JSON.parse(i), r, u.relative === "path");
        e !== "/" &&
          (l.pathname = l.pathname === "/" ? e : un([e, l.pathname])),
          (u.replace ? t.replace : t.push)(l, u.state, u);
      },
      [e, t, i, r]
    )
  );
}
function D1() {
  let { matches: e } = O.useContext(Un),
    t = e[e.length - 1];
  return t ? t.params : {};
}
function Hm(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { matches: r } = O.useContext(Un),
    { pathname: i } = Tr(),
    o = JSON.stringify(Bm(r).map((s) => s.pathnameBase));
  return O.useMemo(() => zm(e, JSON.parse(o), i, n === "path"), [e, o, i, n]);
}
function F1(e, t) {
  _r() || ue(!1);
  let { navigator: n } = O.useContext(ji),
    r = O.useContext(Lc),
    { matches: i } = O.useContext(Un),
    o = i[i.length - 1],
    s = o ? o.params : {};
  o && o.pathname;
  let a = o ? o.pathnameBase : "/";
  o && o.route;
  let u = Tr(),
    l;
  if (t) {
    var c;
    let v = typeof t == "string" ? br(t) : t;
    a === "/" || ((c = v.pathname) != null && c.startsWith(a)) || ue(!1),
      (l = v);
  } else l = u;
  let f = l.pathname || "/",
    d = a === "/" ? f : f.slice(a.length) || "/",
    y = t1(e, { pathname: d }),
    p = j1(
      y &&
        y.map((v) =>
          Object.assign({}, v, {
            params: Object.assign({}, s, v.params),
            pathname: un([
              a,
              n.encodeLocation
                ? n.encodeLocation(v.pathname).pathname
                : v.pathname,
            ]),
            pathnameBase:
              v.pathnameBase === "/"
                ? a
                : un([
                    a,
                    n.encodeLocation
                      ? n.encodeLocation(v.pathnameBase).pathname
                      : v.pathnameBase,
                  ]),
          })
        ),
      i,
      r || void 0
    );
  return t && p
    ? O.createElement(
        Gs.Provider,
        {
          value: {
            location: al(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              l
            ),
            navigationType: Jt.Pop,
          },
        },
        p
      )
    : p;
}
function L1() {
  let e = V1(),
    t = E1(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
      ? e.message
      : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    i = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" },
    o = null;
  return O.createElement(
    O.Fragment,
    null,
    O.createElement("h2", null, "Unexpected Application Error!"),
    O.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? O.createElement("pre", { style: i }, n) : null,
    o
  );
}
class I1 extends O.Component {
  constructor(t) {
    super(t), (this.state = { location: t.location, error: t.error });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location
      ? { error: t.error, location: t.location }
      : { error: t.error || n.error, location: n.location };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n
    );
  }
  render() {
    return this.state.error
      ? O.createElement(
          Un.Provider,
          { value: this.props.routeContext },
          O.createElement(Qm.Provider, {
            value: this.state.error,
            children: this.props.component,
          })
        )
      : this.props.children;
  }
}
function M1(e) {
  let { routeContext: t, match: n, children: r } = e,
    i = O.useContext(Vm);
  return (
    i &&
      i.static &&
      i.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (i.staticContext._deepestRenderedBoundaryId = n.route.id),
    O.createElement(Un.Provider, { value: t }, r)
  );
}
function j1(e, t, n) {
  if ((t === void 0 && (t = []), e == null))
    if (n != null && n.errors) e = n.matches;
    else return null;
  let r = e,
    i = n == null ? void 0 : n.errors;
  if (i != null) {
    let o = r.findIndex(
      (s) => s.route.id && (i == null ? void 0 : i[s.route.id])
    );
    o >= 0 || ue(!1), (r = r.slice(0, Math.min(r.length, o + 1)));
  }
  return r.reduceRight((o, s, a) => {
    let u = s.route.id ? (i == null ? void 0 : i[s.route.id]) : null,
      l = null;
    n &&
      (s.route.ErrorBoundary
        ? (l = O.createElement(s.route.ErrorBoundary, null))
        : s.route.errorElement
        ? (l = s.route.errorElement)
        : (l = O.createElement(L1, null)));
    let c = t.concat(r.slice(0, a + 1)),
      f = () => {
        let d = o;
        return (
          u
            ? (d = l)
            : s.route.Component
            ? (d = O.createElement(s.route.Component, null))
            : s.route.element && (d = s.route.element),
          O.createElement(M1, {
            match: s,
            routeContext: { outlet: o, matches: c },
            children: d,
          })
        );
      };
    return n && (s.route.ErrorBoundary || s.route.errorElement || a === 0)
      ? O.createElement(I1, {
          location: n.location,
          component: l,
          error: u,
          children: f(),
          routeContext: { outlet: null, matches: c },
        })
      : f();
  }, null);
}
var kd;
(function (e) {
  (e.UseBlocker = "useBlocker"), (e.UseRevalidator = "useRevalidator");
})(kd || (kd = {}));
var ds;
(function (e) {
  (e.UseBlocker = "useBlocker"),
    (e.UseLoaderData = "useLoaderData"),
    (e.UseActionData = "useActionData"),
    (e.UseRouteError = "useRouteError"),
    (e.UseNavigation = "useNavigation"),
    (e.UseRouteLoaderData = "useRouteLoaderData"),
    (e.UseMatches = "useMatches"),
    (e.UseRevalidator = "useRevalidator");
})(ds || (ds = {}));
function U1(e) {
  let t = O.useContext(Lc);
  return t || ue(!1), t;
}
function B1(e) {
  let t = O.useContext(Un);
  return t || ue(!1), t;
}
function z1(e) {
  let t = B1(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || ue(!1), n.route.id;
}
function V1() {
  var e;
  let t = O.useContext(Qm),
    n = U1(ds.UseRouteError),
    r = z1(ds.UseRouteError);
  return t || ((e = n.errors) == null ? void 0 : e[r]);
}
function hs(e) {
  let { to: t, replace: n, state: r, relative: i } = e;
  _r() || ue(!1);
  let o = O.useContext(Lc),
    s = qm();
  return (
    O.useEffect(() => {
      (o && o.navigation.state !== "idle") ||
        s(t, { replace: n, state: r, relative: i });
    }),
    null
  );
}
function Hn(e) {
  ue(!1);
}
function Q1(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: i = Jt.Pop,
    navigator: o,
    static: s = !1,
  } = e;
  _r() && ue(!1);
  let a = t.replace(/^\/*/, "/"),
    u = O.useMemo(() => ({ basename: a, navigator: o, static: s }), [a, o, s]);
  typeof r == "string" && (r = br(r));
  let {
      pathname: l = "/",
      search: c = "",
      hash: f = "",
      state: d = null,
      key: y = "default",
    } = r,
    p = O.useMemo(() => {
      let v = Fc(l, a);
      return v == null
        ? null
        : {
            location: { pathname: v, search: c, hash: f, state: d, key: y },
            navigationType: i,
          };
    }, [a, l, c, f, d, y, i]);
  return p == null
    ? null
    : O.createElement(
        ji.Provider,
        { value: u },
        O.createElement(Gs.Provider, { children: n, value: p })
      );
}
function q1(e) {
  let { children: t, location: n } = e,
    r = O.useContext(Vm),
    i = r && !t ? r.router.routes : ul(t);
  return F1(i, n);
}
var bd;
(function (e) {
  (e[(e.pending = 0)] = "pending"),
    (e[(e.success = 1)] = "success"),
    (e[(e.error = 2)] = "error");
})(bd || (bd = {}));
new Promise(() => {});
function ul(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    O.Children.forEach(e, (r, i) => {
      if (!O.isValidElement(r)) return;
      if (r.type === O.Fragment) {
        n.push.apply(n, ul(r.props.children, t));
        return;
      }
      r.type !== Hn && ue(!1), !r.props.index || !r.props.children || ue(!1);
      let o = [...t, i],
        s = {
          id: r.props.id || o.join("-"),
          caseSensitive: r.props.caseSensitive,
          element: r.props.element,
          Component: r.props.Component,
          index: r.props.index,
          path: r.props.path,
          loader: r.props.loader,
          action: r.props.action,
          errorElement: r.props.errorElement,
          ErrorBoundary: r.props.ErrorBoundary,
          hasErrorBoundary:
            r.props.ErrorBoundary != null || r.props.errorElement != null,
          shouldRevalidate: r.props.shouldRevalidate,
          handle: r.props.handle,
          lazy: r.props.lazy,
        };
      r.props.children && (s.children = ul(r.props.children, o)), n.push(s);
    }),
    n
  );
}
/**
 * React Router DOM v6.9.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function ll() {
  return (
    (ll = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    ll.apply(this, arguments)
  );
}
function H1(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    o;
  for (o = 0; o < r.length; o++)
    (i = r[o]), !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function W1(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function K1(e, t) {
  return e.button === 0 && (!t || t === "_self") && !W1(e);
}
const G1 = [
  "onClick",
  "relative",
  "reloadDocument",
  "replace",
  "state",
  "target",
  "to",
  "preventScrollReset",
];
function Y1(e) {
  let { basename: t, children: n, window: r } = e,
    i = O.useRef();
  i.current == null && (i.current = X0({ window: r, v5Compat: !0 }));
  let o = i.current,
    [s, a] = O.useState({ action: o.action, location: o.location });
  return (
    O.useLayoutEffect(() => o.listen(a), [o]),
    O.createElement(Q1, {
      basename: t,
      children: n,
      location: s.location,
      navigationType: s.action,
      navigator: o,
    })
  );
}
const J1 =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  X1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Gr = O.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: i,
        reloadDocument: o,
        replace: s,
        state: a,
        target: u,
        to: l,
        preventScrollReset: c,
      } = t,
      f = H1(t, G1),
      { basename: d } = O.useContext(ji),
      y,
      p = !1;
    if (typeof l == "string" && X1.test(l) && ((y = l), J1)) {
      let h = new URL(window.location.href),
        g = l.startsWith("//") ? new URL(h.protocol + l) : new URL(l),
        E = Fc(g.pathname, d);
      g.origin === h.origin && E != null
        ? (l = E + g.search + g.hash)
        : (p = !0);
    }
    let v = $1(l, { relative: i }),
      C = Z1(l, {
        replace: s,
        state: a,
        target: u,
        preventScrollReset: c,
        relative: i,
      });
    function m(h) {
      r && r(h), h.defaultPrevented || C(h);
    }
    return O.createElement(
      "a",
      ll({}, f, { href: y || v, onClick: p || o ? r : m, ref: n, target: u })
    );
  });
var _d;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmitImpl = "useSubmitImpl"),
    (e.UseFetcher = "useFetcher");
})(_d || (_d = {}));
var Td;
(function (e) {
  (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration");
})(Td || (Td = {}));
function Z1(e, t) {
  let {
      target: n,
      replace: r,
      state: i,
      preventScrollReset: o,
      relative: s,
    } = t === void 0 ? {} : t,
    a = qm(),
    u = Tr(),
    l = Hm(e, { relative: s });
  return O.useCallback(
    (c) => {
      if (K1(c, n)) {
        c.preventDefault();
        let f = r !== void 0 ? r : fs(u) === fs(l);
        a(e, { replace: f, state: i, preventScrollReset: o, relative: s });
      }
    },
    [u, a, l, r, i, n, e, o, s]
  );
}
var cl = {},
  ew = {
    get exports() {
      return cl;
    },
    set exports(e) {
      cl = e;
    },
  },
  Wm = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Cr = O;
function tw(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var nw = typeof Object.is == "function" ? Object.is : tw,
  rw = Cr.useState,
  iw = Cr.useEffect,
  ow = Cr.useLayoutEffect,
  sw = Cr.useDebugValue;
function aw(e, t) {
  var n = t(),
    r = rw({ inst: { value: n, getSnapshot: t } }),
    i = r[0].inst,
    o = r[1];
  return (
    ow(
      function () {
        (i.value = n), (i.getSnapshot = t), Za(i) && o({ inst: i });
      },
      [e, n, t]
    ),
    iw(
      function () {
        return (
          Za(i) && o({ inst: i }),
          e(function () {
            Za(i) && o({ inst: i });
          })
        );
      },
      [e]
    ),
    sw(n),
    n
  );
}
function Za(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !nw(e, n);
  } catch {
    return !0;
  }
}
function uw(e, t) {
  return t();
}
var lw =
  typeof window > "u" ||
  typeof window.document > "u" ||
  typeof window.document.createElement > "u"
    ? uw
    : aw;
Wm.useSyncExternalStore =
  Cr.useSyncExternalStore !== void 0 ? Cr.useSyncExternalStore : lw;
(function (e) {
  e.exports = Wm;
})(ew);
var fl = {},
  cw = {
    get exports() {
      return fl;
    },
    set exports(e) {
      fl = e;
    },
  },
  Km = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ys = O,
  fw = cl;
function dw(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var hw = typeof Object.is == "function" ? Object.is : dw,
  pw = fw.useSyncExternalStore,
  mw = Ys.useRef,
  yw = Ys.useEffect,
  vw = Ys.useMemo,
  gw = Ys.useDebugValue;
Km.useSyncExternalStoreWithSelector = function (e, t, n, r, i) {
  var o = mw(null);
  if (o.current === null) {
    var s = { hasValue: !1, value: null };
    o.current = s;
  } else s = o.current;
  o = vw(
    function () {
      function u(y) {
        if (!l) {
          if (((l = !0), (c = y), (y = r(y)), i !== void 0 && s.hasValue)) {
            var p = s.value;
            if (i(p, y)) return (f = p);
          }
          return (f = y);
        }
        if (((p = f), hw(c, y))) return p;
        var v = r(y);
        return i !== void 0 && i(p, v) ? p : ((c = y), (f = v));
      }
      var l = !1,
        c,
        f,
        d = n === void 0 ? null : n;
      return [
        function () {
          return u(t());
        },
        d === null
          ? void 0
          : function () {
              return u(d());
            },
      ];
    },
    [t, n, r, i]
  );
  var a = pw(e, o[0], o[1]);
  return (
    yw(
      function () {
        (s.hasValue = !0), (s.value = a);
      },
      [a]
    ),
    gw(a),
    a
  );
};
(function (e) {
  e.exports = Km;
})(cw);
function ww(e) {
  e();
}
let Gm = ww;
const Sw = (e) => (Gm = e),
  Ew = () => Gm,
  pn = O.createContext(null);
function Ym() {
  return O.useContext(pn);
}
const Cw = () => {
  throw new Error("uSES not initialized!");
};
let Jm = Cw;
const Ow = (e) => {
    Jm = e;
  },
  Pw = (e, t) => e === t;
function xw(e = pn) {
  const t = e === pn ? Ym : () => O.useContext(e);
  return function (r, i = Pw) {
    const { store: o, subscription: s, getServerState: a } = t(),
      u = Jm(s.addNestedSub, o.getState, a || o.getState, r, i);
    return O.useDebugValue(u), u;
  };
}
const Ze = xw();
function U() {
  return (
    (U = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    U.apply(this, arguments)
  );
}
var dl = {},
  kw = {
    get exports() {
      return dl;
    },
    set exports(e) {
      dl = e;
    },
  },
  Q = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var me = typeof Symbol == "function" && Symbol.for,
  Ic = me ? Symbol.for("react.element") : 60103,
  Mc = me ? Symbol.for("react.portal") : 60106,
  Js = me ? Symbol.for("react.fragment") : 60107,
  Xs = me ? Symbol.for("react.strict_mode") : 60108,
  Zs = me ? Symbol.for("react.profiler") : 60114,
  ea = me ? Symbol.for("react.provider") : 60109,
  ta = me ? Symbol.for("react.context") : 60110,
  jc = me ? Symbol.for("react.async_mode") : 60111,
  na = me ? Symbol.for("react.concurrent_mode") : 60111,
  ra = me ? Symbol.for("react.forward_ref") : 60112,
  ia = me ? Symbol.for("react.suspense") : 60113,
  bw = me ? Symbol.for("react.suspense_list") : 60120,
  oa = me ? Symbol.for("react.memo") : 60115,
  sa = me ? Symbol.for("react.lazy") : 60116,
  _w = me ? Symbol.for("react.block") : 60121,
  Tw = me ? Symbol.for("react.fundamental") : 60117,
  Rw = me ? Symbol.for("react.responder") : 60118,
  Nw = me ? Symbol.for("react.scope") : 60119;
function He(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Ic:
        switch (((e = e.type), e)) {
          case jc:
          case na:
          case Js:
          case Zs:
          case Xs:
          case ia:
            return e;
          default:
            switch (((e = e && e.$$typeof), e)) {
              case ta:
              case ra:
              case sa:
              case oa:
              case ea:
                return e;
              default:
                return t;
            }
        }
      case Mc:
        return t;
    }
  }
}
function Xm(e) {
  return He(e) === na;
}
Q.AsyncMode = jc;
Q.ConcurrentMode = na;
Q.ContextConsumer = ta;
Q.ContextProvider = ea;
Q.Element = Ic;
Q.ForwardRef = ra;
Q.Fragment = Js;
Q.Lazy = sa;
Q.Memo = oa;
Q.Portal = Mc;
Q.Profiler = Zs;
Q.StrictMode = Xs;
Q.Suspense = ia;
Q.isAsyncMode = function (e) {
  return Xm(e) || He(e) === jc;
};
Q.isConcurrentMode = Xm;
Q.isContextConsumer = function (e) {
  return He(e) === ta;
};
Q.isContextProvider = function (e) {
  return He(e) === ea;
};
Q.isElement = function (e) {
  return typeof e == "object" && e !== null && e.$$typeof === Ic;
};
Q.isForwardRef = function (e) {
  return He(e) === ra;
};
Q.isFragment = function (e) {
  return He(e) === Js;
};
Q.isLazy = function (e) {
  return He(e) === sa;
};
Q.isMemo = function (e) {
  return He(e) === oa;
};
Q.isPortal = function (e) {
  return He(e) === Mc;
};
Q.isProfiler = function (e) {
  return He(e) === Zs;
};
Q.isStrictMode = function (e) {
  return He(e) === Xs;
};
Q.isSuspense = function (e) {
  return He(e) === ia;
};
Q.isValidElementType = function (e) {
  return (
    typeof e == "string" ||
    typeof e == "function" ||
    e === Js ||
    e === na ||
    e === Zs ||
    e === Xs ||
    e === ia ||
    e === bw ||
    (typeof e == "object" &&
      e !== null &&
      (e.$$typeof === sa ||
        e.$$typeof === oa ||
        e.$$typeof === ea ||
        e.$$typeof === ta ||
        e.$$typeof === ra ||
        e.$$typeof === Tw ||
        e.$$typeof === Rw ||
        e.$$typeof === Nw ||
        e.$$typeof === _w))
  );
};
Q.typeOf = He;
(function (e) {
  e.exports = Q;
})(kw);
var Zm = dl,
  Aw = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
  },
  $w = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0,
  },
  ey = {};
ey[Zm.ForwardRef] = Aw;
ey[Zm.Memo] = $w;
var Rd = {},
  Dw = {
    get exports() {
      return Rd;
    },
    set exports(e) {
      Rd = e;
    },
  },
  q = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Uc = Symbol.for("react.element"),
  Bc = Symbol.for("react.portal"),
  aa = Symbol.for("react.fragment"),
  ua = Symbol.for("react.strict_mode"),
  la = Symbol.for("react.profiler"),
  ca = Symbol.for("react.provider"),
  fa = Symbol.for("react.context"),
  Fw = Symbol.for("react.server_context"),
  da = Symbol.for("react.forward_ref"),
  ha = Symbol.for("react.suspense"),
  pa = Symbol.for("react.suspense_list"),
  ma = Symbol.for("react.memo"),
  ya = Symbol.for("react.lazy"),
  Lw = Symbol.for("react.offscreen"),
  ty;
ty = Symbol.for("react.module.reference");
function nt(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Uc:
        switch (((e = e.type), e)) {
          case aa:
          case la:
          case ua:
          case ha:
          case pa:
            return e;
          default:
            switch (((e = e && e.$$typeof), e)) {
              case Fw:
              case fa:
              case da:
              case ya:
              case ma:
              case ca:
                return e;
              default:
                return t;
            }
        }
      case Bc:
        return t;
    }
  }
}
q.ContextConsumer = fa;
q.ContextProvider = ca;
q.Element = Uc;
q.ForwardRef = da;
q.Fragment = aa;
q.Lazy = ya;
q.Memo = ma;
q.Portal = Bc;
q.Profiler = la;
q.StrictMode = ua;
q.Suspense = ha;
q.SuspenseList = pa;
q.isAsyncMode = function () {
  return !1;
};
q.isConcurrentMode = function () {
  return !1;
};
q.isContextConsumer = function (e) {
  return nt(e) === fa;
};
q.isContextProvider = function (e) {
  return nt(e) === ca;
};
q.isElement = function (e) {
  return typeof e == "object" && e !== null && e.$$typeof === Uc;
};
q.isForwardRef = function (e) {
  return nt(e) === da;
};
q.isFragment = function (e) {
  return nt(e) === aa;
};
q.isLazy = function (e) {
  return nt(e) === ya;
};
q.isMemo = function (e) {
  return nt(e) === ma;
};
q.isPortal = function (e) {
  return nt(e) === Bc;
};
q.isProfiler = function (e) {
  return nt(e) === la;
};
q.isStrictMode = function (e) {
  return nt(e) === ua;
};
q.isSuspense = function (e) {
  return nt(e) === ha;
};
q.isSuspenseList = function (e) {
  return nt(e) === pa;
};
q.isValidElementType = function (e) {
  return (
    typeof e == "string" ||
    typeof e == "function" ||
    e === aa ||
    e === la ||
    e === ua ||
    e === ha ||
    e === pa ||
    e === Lw ||
    (typeof e == "object" &&
      e !== null &&
      (e.$$typeof === ya ||
        e.$$typeof === ma ||
        e.$$typeof === ca ||
        e.$$typeof === fa ||
        e.$$typeof === da ||
        e.$$typeof === ty ||
        e.getModuleId !== void 0))
  );
};
q.typeOf = nt;
(function (e) {
  e.exports = q;
})(Dw);
function Iw() {
  const e = Ew();
  let t = null,
    n = null;
  return {
    clear() {
      (t = null), (n = null);
    },
    notify() {
      e(() => {
        let r = t;
        for (; r; ) r.callback(), (r = r.next);
      });
    },
    get() {
      let r = [],
        i = t;
      for (; i; ) r.push(i), (i = i.next);
      return r;
    },
    subscribe(r) {
      let i = !0,
        o = (n = { callback: r, next: null, prev: n });
      return (
        o.prev ? (o.prev.next = o) : (t = o),
        function () {
          !i ||
            t === null ||
            ((i = !1),
            o.next ? (o.next.prev = o.prev) : (n = o.prev),
            o.prev ? (o.prev.next = o.next) : (t = o.next));
        }
      );
    },
  };
}
const Nd = { notify() {}, get: () => [] };
function Mw(e, t) {
  let n,
    r = Nd;
  function i(f) {
    return u(), r.subscribe(f);
  }
  function o() {
    r.notify();
  }
  function s() {
    c.onStateChange && c.onStateChange();
  }
  function a() {
    return Boolean(n);
  }
  function u() {
    n || ((n = t ? t.addNestedSub(s) : e.subscribe(s)), (r = Iw()));
  }
  function l() {
    n && (n(), (n = void 0), r.clear(), (r = Nd));
  }
  const c = {
    addNestedSub: i,
    notifyNestedSubs: o,
    handleChangeWrapper: s,
    isSubscribed: a,
    trySubscribe: u,
    tryUnsubscribe: l,
    getListeners: () => r,
  };
  return c;
}
const jw =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  Uw = jw ? O.useLayoutEffect : O.useEffect;
function Bw({ store: e, context: t, children: n, serverState: r }) {
  const i = O.useMemo(() => {
      const a = Mw(e);
      return {
        store: e,
        subscription: a,
        getServerState: r ? () => r : void 0,
      };
    }, [e, r]),
    o = O.useMemo(() => e.getState(), [e]);
  Uw(() => {
    const { subscription: a } = i;
    return (
      (a.onStateChange = a.notifyNestedSubs),
      a.trySubscribe(),
      o !== e.getState() && a.notifyNestedSubs(),
      () => {
        a.tryUnsubscribe(), (a.onStateChange = void 0);
      }
    );
  }, [i, o]);
  const s = t || pn;
  return ee.createElement(s.Provider, { value: i }, n);
}
function ny(e = pn) {
  const t = e === pn ? Ym : () => O.useContext(e);
  return function () {
    const { store: r } = t();
    return r;
  };
}
const zw = ny();
function Vw(e = pn) {
  const t = e === pn ? zw : ny(e);
  return function () {
    return t().dispatch;
  };
}
const Bn = Vw();
Ow(fl.useSyncExternalStoreWithSelector);
Sw(ci.unstable_batchedUpdates);
function ft(e) {
  for (
    var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1;
    r < t;
    r++
  )
    n[r - 1] = arguments[r];
  throw Error(
    "[Immer] minified error nr: " +
      e +
      (n.length
        ? " " +
          n
            .map(function (i) {
              return "'" + i + "'";
            })
            .join(",")
        : "") +
      ". Find the full error at: https://bit.ly/3cXEKWf"
  );
}
function mn(e) {
  return !!e && !!e[J];
}
function Lt(e) {
  var t;
  return (
    !!e &&
    ((function (n) {
      if (!n || typeof n != "object") return !1;
      var r = Object.getPrototypeOf(n);
      if (r === null) return !0;
      var i = Object.hasOwnProperty.call(r, "constructor") && r.constructor;
      return (
        i === Object ||
        (typeof i == "function" && Function.toString.call(i) === Xw)
      );
    })(e) ||
      Array.isArray(e) ||
      !!e[Md] ||
      !!(!((t = e.constructor) === null || t === void 0) && t[Md]) ||
      zc(e) ||
      Vc(e))
  );
}
function Ln(e, t, n) {
  n === void 0 && (n = !1),
    Rr(e) === 0
      ? (n ? Object.keys : hr)(e).forEach(function (r) {
          (n && typeof r == "symbol") || t(r, e[r], e);
        })
      : e.forEach(function (r, i) {
          return t(i, r, e);
        });
}
function Rr(e) {
  var t = e[J];
  return t
    ? t.i > 3
      ? t.i - 4
      : t.i
    : Array.isArray(e)
    ? 1
    : zc(e)
    ? 2
    : Vc(e)
    ? 3
    : 0;
}
function dr(e, t) {
  return Rr(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function Qw(e, t) {
  return Rr(e) === 2 ? e.get(t) : e[t];
}
function ry(e, t, n) {
  var r = Rr(e);
  r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : (e[t] = n);
}
function iy(e, t) {
  return e === t ? e !== 0 || 1 / e == 1 / t : e != e && t != t;
}
function zc(e) {
  return Yw && e instanceof Map;
}
function Vc(e) {
  return Jw && e instanceof Set;
}
function Pn(e) {
  return e.o || e.t;
}
function Qc(e) {
  if (Array.isArray(e)) return Array.prototype.slice.call(e);
  var t = sy(e);
  delete t[J];
  for (var n = hr(t), r = 0; r < n.length; r++) {
    var i = n[r],
      o = t[i];
    o.writable === !1 && ((o.writable = !0), (o.configurable = !0)),
      (o.get || o.set) &&
        (t[i] = {
          configurable: !0,
          writable: !0,
          enumerable: o.enumerable,
          value: e[i],
        });
  }
  return Object.create(Object.getPrototypeOf(e), t);
}
function qc(e, t) {
  return (
    t === void 0 && (t = !1),
    Hc(e) ||
      mn(e) ||
      !Lt(e) ||
      (Rr(e) > 1 && (e.set = e.add = e.clear = e.delete = qw),
      Object.freeze(e),
      t &&
        Ln(
          e,
          function (n, r) {
            return qc(r, !0);
          },
          !0
        )),
    e
  );
}
function qw() {
  ft(2);
}
function Hc(e) {
  return e == null || typeof e != "object" || Object.isFrozen(e);
}
function Et(e) {
  var t = yl[e];
  return t || ft(18, e), t;
}
function Hw(e, t) {
  yl[e] || (yl[e] = t);
}
function hl() {
  return Ti;
}
function eu(e, t) {
  t && (Et("Patches"), (e.u = []), (e.s = []), (e.v = t));
}
function ps(e) {
  pl(e), e.p.forEach(Ww), (e.p = null);
}
function pl(e) {
  e === Ti && (Ti = e.l);
}
function Ad(e) {
  return (Ti = { p: [], l: Ti, h: e, m: !0, _: 0 });
}
function Ww(e) {
  var t = e[J];
  t.i === 0 || t.i === 1 ? t.j() : (t.O = !0);
}
function tu(e, t) {
  t._ = t.p.length;
  var n = t.p[0],
    r = e !== void 0 && e !== n;
  return (
    t.h.g || Et("ES5").S(t, e, r),
    r
      ? (n[J].P && (ps(t), ft(4)),
        Lt(e) && ((e = ms(t, e)), t.l || ys(t, e)),
        t.u && Et("Patches").M(n[J].t, e, t.u, t.s))
      : (e = ms(t, n, [])),
    ps(t),
    t.u && t.v(t.u, t.s),
    e !== oy ? e : void 0
  );
}
function ms(e, t, n) {
  if (Hc(t)) return t;
  var r = t[J];
  if (!r)
    return (
      Ln(
        t,
        function (a, u) {
          return $d(e, r, t, a, u, n);
        },
        !0
      ),
      t
    );
  if (r.A !== e) return t;
  if (!r.P) return ys(e, r.t, !0), r.t;
  if (!r.I) {
    (r.I = !0), r.A._--;
    var i = r.i === 4 || r.i === 5 ? (r.o = Qc(r.k)) : r.o,
      o = i,
      s = !1;
    r.i === 3 && ((o = new Set(i)), i.clear(), (s = !0)),
      Ln(o, function (a, u) {
        return $d(e, r, i, a, u, n, s);
      }),
      ys(e, i, !1),
      n && e.u && Et("Patches").N(r, n, e.u, e.s);
  }
  return r.o;
}
function $d(e, t, n, r, i, o, s) {
  if (mn(i)) {
    var a = ms(e, i, o && t && t.i !== 3 && !dr(t.R, r) ? o.concat(r) : void 0);
    if ((ry(n, r, a), !mn(a))) return;
    e.m = !1;
  } else s && n.add(i);
  if (Lt(i) && !Hc(i)) {
    if (!e.h.D && e._ < 1) return;
    ms(e, i), (t && t.A.l) || ys(e, i);
  }
}
function ys(e, t, n) {
  n === void 0 && (n = !1), !e.l && e.h.D && e.m && qc(t, n);
}
function nu(e, t) {
  var n = e[J];
  return (n ? Pn(n) : e)[t];
}
function Dd(e, t) {
  if (t in e)
    for (var n = Object.getPrototypeOf(e); n; ) {
      var r = Object.getOwnPropertyDescriptor(n, t);
      if (r) return r;
      n = Object.getPrototypeOf(n);
    }
}
function Wt(e) {
  e.P || ((e.P = !0), e.l && Wt(e.l));
}
function ru(e) {
  e.o || (e.o = Qc(e.t));
}
function ml(e, t, n) {
  var r = zc(t)
    ? Et("MapSet").F(t, n)
    : Vc(t)
    ? Et("MapSet").T(t, n)
    : e.g
    ? (function (i, o) {
        var s = Array.isArray(i),
          a = {
            i: s ? 1 : 0,
            A: o ? o.A : hl(),
            P: !1,
            I: !1,
            R: {},
            l: o,
            t: i,
            k: null,
            o: null,
            j: null,
            C: !1,
          },
          u = a,
          l = Ri;
        s && ((u = [a]), (l = Yr));
        var c = Proxy.revocable(u, l),
          f = c.revoke,
          d = c.proxy;
        return (a.k = d), (a.j = f), d;
      })(t, n)
    : Et("ES5").J(t, n);
  return (n ? n.A : hl()).p.push(r), r;
}
function Kw(e) {
  return (
    mn(e) || ft(22, e),
    (function t(n) {
      if (!Lt(n)) return n;
      var r,
        i = n[J],
        o = Rr(n);
      if (i) {
        if (!i.P && (i.i < 4 || !Et("ES5").K(i))) return i.t;
        (i.I = !0), (r = Fd(n, o)), (i.I = !1);
      } else r = Fd(n, o);
      return (
        Ln(r, function (s, a) {
          (i && Qw(i.t, s) === a) || ry(r, s, t(a));
        }),
        o === 3 ? new Set(r) : r
      );
    })(e)
  );
}
function Fd(e, t) {
  switch (t) {
    case 2:
      return new Map(e);
    case 3:
      return Array.from(e);
  }
  return Qc(e);
}
function Gw() {
  function e(o, s) {
    var a = i[o];
    return (
      a
        ? (a.enumerable = s)
        : (i[o] = a =
            {
              configurable: !0,
              enumerable: s,
              get: function () {
                var u = this[J];
                return Ri.get(u, o);
              },
              set: function (u) {
                var l = this[J];
                Ri.set(l, o, u);
              },
            }),
      a
    );
  }
  function t(o) {
    for (var s = o.length - 1; s >= 0; s--) {
      var a = o[s][J];
      if (!a.P)
        switch (a.i) {
          case 5:
            r(a) && Wt(a);
            break;
          case 4:
            n(a) && Wt(a);
        }
    }
  }
  function n(o) {
    for (var s = o.t, a = o.k, u = hr(a), l = u.length - 1; l >= 0; l--) {
      var c = u[l];
      if (c !== J) {
        var f = s[c];
        if (f === void 0 && !dr(s, c)) return !0;
        var d = a[c],
          y = d && d[J];
        if (y ? y.t !== f : !iy(d, f)) return !0;
      }
    }
    var p = !!s[J];
    return u.length !== hr(s).length + (p ? 0 : 1);
  }
  function r(o) {
    var s = o.k;
    if (s.length !== o.t.length) return !0;
    var a = Object.getOwnPropertyDescriptor(s, s.length - 1);
    if (a && !a.get) return !0;
    for (var u = 0; u < s.length; u++) if (!s.hasOwnProperty(u)) return !0;
    return !1;
  }
  var i = {};
  Hw("ES5", {
    J: function (o, s) {
      var a = Array.isArray(o),
        u = (function (c, f) {
          if (c) {
            for (var d = Array(f.length), y = 0; y < f.length; y++)
              Object.defineProperty(d, "" + y, e(y, !0));
            return d;
          }
          var p = sy(f);
          delete p[J];
          for (var v = hr(p), C = 0; C < v.length; C++) {
            var m = v[C];
            p[m] = e(m, c || !!p[m].enumerable);
          }
          return Object.create(Object.getPrototypeOf(f), p);
        })(a, o),
        l = {
          i: a ? 5 : 4,
          A: s ? s.A : hl(),
          P: !1,
          I: !1,
          R: {},
          l: s,
          t: o,
          k: u,
          o: null,
          O: !1,
          C: !1,
        };
      return Object.defineProperty(u, J, { value: l, writable: !0 }), u;
    },
    S: function (o, s, a) {
      a
        ? mn(s) && s[J].A === o && t(o.p)
        : (o.u &&
            (function u(l) {
              if (l && typeof l == "object") {
                var c = l[J];
                if (c) {
                  var f = c.t,
                    d = c.k,
                    y = c.R,
                    p = c.i;
                  if (p === 4)
                    Ln(d, function (g) {
                      g !== J &&
                        (f[g] !== void 0 || dr(f, g)
                          ? y[g] || u(d[g])
                          : ((y[g] = !0), Wt(c)));
                    }),
                      Ln(f, function (g) {
                        d[g] !== void 0 || dr(d, g) || ((y[g] = !1), Wt(c));
                      });
                  else if (p === 5) {
                    if ((r(c) && (Wt(c), (y.length = !0)), d.length < f.length))
                      for (var v = d.length; v < f.length; v++) y[v] = !1;
                    else for (var C = f.length; C < d.length; C++) y[C] = !0;
                    for (
                      var m = Math.min(d.length, f.length), h = 0;
                      h < m;
                      h++
                    )
                      d.hasOwnProperty(h) || (y[h] = !0),
                        y[h] === void 0 && u(d[h]);
                  }
                }
              }
            })(o.p[0]),
          t(o.p));
    },
    K: function (o) {
      return o.i === 4 ? n(o) : r(o);
    },
  });
}
var Ld,
  Ti,
  Wc = typeof Symbol < "u" && typeof Symbol("x") == "symbol",
  Yw = typeof Map < "u",
  Jw = typeof Set < "u",
  Id = typeof Proxy < "u" && Proxy.revocable !== void 0 && typeof Reflect < "u",
  oy = Wc
    ? Symbol.for("immer-nothing")
    : (((Ld = {})["immer-nothing"] = !0), Ld),
  Md = Wc ? Symbol.for("immer-draftable") : "__$immer_draftable",
  J = Wc ? Symbol.for("immer-state") : "__$immer_state",
  Xw = "" + Object.prototype.constructor,
  hr =
    typeof Reflect < "u" && Reflect.ownKeys
      ? Reflect.ownKeys
      : Object.getOwnPropertySymbols !== void 0
      ? function (e) {
          return Object.getOwnPropertyNames(e).concat(
            Object.getOwnPropertySymbols(e)
          );
        }
      : Object.getOwnPropertyNames,
  sy =
    Object.getOwnPropertyDescriptors ||
    function (e) {
      var t = {};
      return (
        hr(e).forEach(function (n) {
          t[n] = Object.getOwnPropertyDescriptor(e, n);
        }),
        t
      );
    },
  yl = {},
  Ri = {
    get: function (e, t) {
      if (t === J) return e;
      var n = Pn(e);
      if (!dr(n, t))
        return (function (i, o, s) {
          var a,
            u = Dd(o, s);
          return u
            ? "value" in u
              ? u.value
              : (a = u.get) === null || a === void 0
              ? void 0
              : a.call(i.k)
            : void 0;
        })(e, n, t);
      var r = n[t];
      return e.I || !Lt(r)
        ? r
        : r === nu(e.t, t)
        ? (ru(e), (e.o[t] = ml(e.A.h, r, e)))
        : r;
    },
    has: function (e, t) {
      return t in Pn(e);
    },
    ownKeys: function (e) {
      return Reflect.ownKeys(Pn(e));
    },
    set: function (e, t, n) {
      var r = Dd(Pn(e), t);
      if (r != null && r.set) return r.set.call(e.k, n), !0;
      if (!e.P) {
        var i = nu(Pn(e), t),
          o = i == null ? void 0 : i[J];
        if (o && o.t === n) return (e.o[t] = n), (e.R[t] = !1), !0;
        if (iy(n, i) && (n !== void 0 || dr(e.t, t))) return !0;
        ru(e), Wt(e);
      }
      return (
        (e.o[t] === n && (n !== void 0 || t in e.o)) ||
          (Number.isNaN(n) && Number.isNaN(e.o[t])) ||
          ((e.o[t] = n), (e.R[t] = !0)),
        !0
      );
    },
    deleteProperty: function (e, t) {
      return (
        nu(e.t, t) !== void 0 || t in e.t
          ? ((e.R[t] = !1), ru(e), Wt(e))
          : delete e.R[t],
        e.o && delete e.o[t],
        !0
      );
    },
    getOwnPropertyDescriptor: function (e, t) {
      var n = Pn(e),
        r = Reflect.getOwnPropertyDescriptor(n, t);
      return (
        r && {
          writable: !0,
          configurable: e.i !== 1 || t !== "length",
          enumerable: r.enumerable,
          value: n[t],
        }
      );
    },
    defineProperty: function () {
      ft(11);
    },
    getPrototypeOf: function (e) {
      return Object.getPrototypeOf(e.t);
    },
    setPrototypeOf: function () {
      ft(12);
    },
  },
  Yr = {};
Ln(Ri, function (e, t) {
  Yr[e] = function () {
    return (arguments[0] = arguments[0][0]), t.apply(this, arguments);
  };
}),
  (Yr.deleteProperty = function (e, t) {
    return Yr.set.call(this, e, t, void 0);
  }),
  (Yr.set = function (e, t, n) {
    return Ri.set.call(this, e[0], t, n, e[0]);
  });
var Zw = (function () {
    function e(n) {
      var r = this;
      (this.g = Id),
        (this.D = !0),
        (this.produce = function (i, o, s) {
          if (typeof i == "function" && typeof o != "function") {
            var a = o;
            o = i;
            var u = r;
            return function (v) {
              var C = this;
              v === void 0 && (v = a);
              for (
                var m = arguments.length, h = Array(m > 1 ? m - 1 : 0), g = 1;
                g < m;
                g++
              )
                h[g - 1] = arguments[g];
              return u.produce(v, function (E) {
                var x;
                return (x = o).call.apply(x, [C, E].concat(h));
              });
            };
          }
          var l;
          if (
            (typeof o != "function" && ft(6),
            s !== void 0 && typeof s != "function" && ft(7),
            Lt(i))
          ) {
            var c = Ad(r),
              f = ml(r, i, void 0),
              d = !0;
            try {
              (l = o(f)), (d = !1);
            } finally {
              d ? ps(c) : pl(c);
            }
            return typeof Promise < "u" && l instanceof Promise
              ? l.then(
                  function (v) {
                    return eu(c, s), tu(v, c);
                  },
                  function (v) {
                    throw (ps(c), v);
                  }
                )
              : (eu(c, s), tu(l, c));
          }
          if (!i || typeof i != "object") {
            if (
              ((l = o(i)) === void 0 && (l = i),
              l === oy && (l = void 0),
              r.D && qc(l, !0),
              s)
            ) {
              var y = [],
                p = [];
              Et("Patches").M(i, l, y, p), s(y, p);
            }
            return l;
          }
          ft(21, i);
        }),
        (this.produceWithPatches = function (i, o) {
          if (typeof i == "function")
            return function (l) {
              for (
                var c = arguments.length, f = Array(c > 1 ? c - 1 : 0), d = 1;
                d < c;
                d++
              )
                f[d - 1] = arguments[d];
              return r.produceWithPatches(l, function (y) {
                return i.apply(void 0, [y].concat(f));
              });
            };
          var s,
            a,
            u = r.produce(i, o, function (l, c) {
              (s = l), (a = c);
            });
          return typeof Promise < "u" && u instanceof Promise
            ? u.then(function (l) {
                return [l, s, a];
              })
            : [u, s, a];
        }),
        typeof (n == null ? void 0 : n.useProxies) == "boolean" &&
          this.setUseProxies(n.useProxies),
        typeof (n == null ? void 0 : n.autoFreeze) == "boolean" &&
          this.setAutoFreeze(n.autoFreeze);
    }
    var t = e.prototype;
    return (
      (t.createDraft = function (n) {
        Lt(n) || ft(8), mn(n) && (n = Kw(n));
        var r = Ad(this),
          i = ml(this, n, void 0);
        return (i[J].C = !0), pl(r), i;
      }),
      (t.finishDraft = function (n, r) {
        var i = n && n[J],
          o = i.A;
        return eu(o, r), tu(void 0, o);
      }),
      (t.setAutoFreeze = function (n) {
        this.D = n;
      }),
      (t.setUseProxies = function (n) {
        n && !Id && ft(20), (this.g = n);
      }),
      (t.applyPatches = function (n, r) {
        var i;
        for (i = r.length - 1; i >= 0; i--) {
          var o = r[i];
          if (o.path.length === 0 && o.op === "replace") {
            n = o.value;
            break;
          }
        }
        i > -1 && (r = r.slice(i + 1));
        var s = Et("Patches").$;
        return mn(n)
          ? s(n, r)
          : this.produce(n, function (a) {
              return s(a, r);
            });
      }),
      e
    );
  })(),
  Ve = new Zw(),
  ay = Ve.produce;
Ve.produceWithPatches.bind(Ve);
Ve.setAutoFreeze.bind(Ve);
Ve.setUseProxies.bind(Ve);
Ve.applyPatches.bind(Ve);
Ve.createDraft.bind(Ve);
Ve.finishDraft.bind(Ve);
function Ni(e) {
  return (
    (Ni =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Ni(e)
  );
}
function eS(e, t) {
  if (Ni(e) !== "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (Ni(r) !== "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function tS(e) {
  var t = eS(e, "string");
  return Ni(t) === "symbol" ? t : String(t);
}
function nS(e, t, n) {
  return (
    (t = tS(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function jd(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Ud(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? jd(Object(n), !0).forEach(function (r) {
          nS(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : jd(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function Pe(e) {
  return (
    "Minified Redux error #" +
    e +
    "; visit https://redux.js.org/Errors?code=" +
    e +
    " for the full message or use the non-minified dev environment for full errors. "
  );
}
var Bd = (function () {
    return (typeof Symbol == "function" && Symbol.observable) || "@@observable";
  })(),
  iu = function () {
    return Math.random().toString(36).substring(7).split("").join(".");
  },
  vs = {
    INIT: "@@redux/INIT" + iu(),
    REPLACE: "@@redux/REPLACE" + iu(),
    PROBE_UNKNOWN_ACTION: function () {
      return "@@redux/PROBE_UNKNOWN_ACTION" + iu();
    },
  };
function rS(e) {
  if (typeof e != "object" || e === null) return !1;
  for (var t = e; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
function uy(e, t, n) {
  var r;
  if (
    (typeof t == "function" && typeof n == "function") ||
    (typeof n == "function" && typeof arguments[3] == "function")
  )
    throw new Error(Pe(0));
  if (
    (typeof t == "function" && typeof n > "u" && ((n = t), (t = void 0)),
    typeof n < "u")
  ) {
    if (typeof n != "function") throw new Error(Pe(1));
    return n(uy)(e, t);
  }
  if (typeof e != "function") throw new Error(Pe(2));
  var i = e,
    o = t,
    s = [],
    a = s,
    u = !1;
  function l() {
    a === s && (a = s.slice());
  }
  function c() {
    if (u) throw new Error(Pe(3));
    return o;
  }
  function f(v) {
    if (typeof v != "function") throw new Error(Pe(4));
    if (u) throw new Error(Pe(5));
    var C = !0;
    return (
      l(),
      a.push(v),
      function () {
        if (C) {
          if (u) throw new Error(Pe(6));
          (C = !1), l();
          var h = a.indexOf(v);
          a.splice(h, 1), (s = null);
        }
      }
    );
  }
  function d(v) {
    if (!rS(v)) throw new Error(Pe(7));
    if (typeof v.type > "u") throw new Error(Pe(8));
    if (u) throw new Error(Pe(9));
    try {
      (u = !0), (o = i(o, v));
    } finally {
      u = !1;
    }
    for (var C = (s = a), m = 0; m < C.length; m++) {
      var h = C[m];
      h();
    }
    return v;
  }
  function y(v) {
    if (typeof v != "function") throw new Error(Pe(10));
    (i = v), d({ type: vs.REPLACE });
  }
  function p() {
    var v,
      C = f;
    return (
      (v = {
        subscribe: function (h) {
          if (typeof h != "object" || h === null) throw new Error(Pe(11));
          function g() {
            h.next && h.next(c());
          }
          g();
          var E = C(g);
          return { unsubscribe: E };
        },
      }),
      (v[Bd] = function () {
        return this;
      }),
      v
    );
  }
  return (
    d({ type: vs.INIT }),
    (r = { dispatch: d, subscribe: f, getState: c, replaceReducer: y }),
    (r[Bd] = p),
    r
  );
}
function iS(e) {
  Object.keys(e).forEach(function (t) {
    var n = e[t],
      r = n(void 0, { type: vs.INIT });
    if (typeof r > "u") throw new Error(Pe(12));
    if (typeof n(void 0, { type: vs.PROBE_UNKNOWN_ACTION() }) > "u")
      throw new Error(Pe(13));
  });
}
function oS(e) {
  for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
    var i = t[r];
    typeof e[i] == "function" && (n[i] = e[i]);
  }
  var o = Object.keys(n),
    s;
  try {
    iS(n);
  } catch (a) {
    s = a;
  }
  return function (u, l) {
    if ((u === void 0 && (u = {}), s)) throw s;
    for (var c = !1, f = {}, d = 0; d < o.length; d++) {
      var y = o[d],
        p = n[y],
        v = u[y],
        C = p(v, l);
      if (typeof C > "u") throw (l && l.type, new Error(Pe(14)));
      (f[y] = C), (c = c || C !== v);
    }
    return (c = c || o.length !== Object.keys(u).length), c ? f : u;
  };
}
function gs() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return t.length === 0
    ? function (r) {
        return r;
      }
    : t.length === 1
    ? t[0]
    : t.reduce(function (r, i) {
        return function () {
          return r(i.apply(void 0, arguments));
        };
      });
}
function sS() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function (r) {
    return function () {
      var i = r.apply(void 0, arguments),
        o = function () {
          throw new Error(Pe(15));
        },
        s = {
          getState: i.getState,
          dispatch: function () {
            return o.apply(void 0, arguments);
          },
        },
        a = t.map(function (u) {
          return u(s);
        });
      return (
        (o = gs.apply(void 0, a)(i.dispatch)),
        Ud(Ud({}, i), {}, { dispatch: o })
      );
    };
  };
}
function ly(e) {
  var t = function (r) {
    var i = r.dispatch,
      o = r.getState;
    return function (s) {
      return function (a) {
        return typeof a == "function" ? a(i, o, e) : s(a);
      };
    };
  };
  return t;
}
var cy = ly();
cy.withExtraArgument = ly;
const zd = cy;
var aS =
    (globalThis && globalThis.__extends) ||
    (function () {
      var e = function (t, n) {
        return (
          (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (r, i) {
                r.__proto__ = i;
              }) ||
            function (r, i) {
              for (var o in i)
                Object.prototype.hasOwnProperty.call(i, o) && (r[o] = i[o]);
            }),
          e(t, n)
        );
      };
      return function (t, n) {
        if (typeof n != "function" && n !== null)
          throw new TypeError(
            "Class extends value " + String(n) + " is not a constructor or null"
          );
        e(t, n);
        function r() {
          this.constructor = t;
        }
        t.prototype =
          n === null
            ? Object.create(n)
            : ((r.prototype = n.prototype), new r());
      };
    })(),
  uS =
    (globalThis && globalThis.__generator) ||
    function (e, t) {
      var n = {
          label: 0,
          sent: function () {
            if (o[0] & 1) throw o[1];
            return o[1];
          },
          trys: [],
          ops: [],
        },
        r,
        i,
        o,
        s;
      return (
        (s = { next: a(0), throw: a(1), return: a(2) }),
        typeof Symbol == "function" &&
          (s[Symbol.iterator] = function () {
            return this;
          }),
        s
      );
      function a(l) {
        return function (c) {
          return u([l, c]);
        };
      }
      function u(l) {
        if (r) throw new TypeError("Generator is already executing.");
        for (; n; )
          try {
            if (
              ((r = 1),
              i &&
                (o =
                  l[0] & 2
                    ? i.return
                    : l[0]
                    ? i.throw || ((o = i.return) && o.call(i), 0)
                    : i.next) &&
                !(o = o.call(i, l[1])).done)
            )
              return o;
            switch (((i = 0), o && (l = [l[0] & 2, o.value]), l[0])) {
              case 0:
              case 1:
                o = l;
                break;
              case 4:
                return n.label++, { value: l[1], done: !1 };
              case 5:
                n.label++, (i = l[1]), (l = [0]);
                continue;
              case 7:
                (l = n.ops.pop()), n.trys.pop();
                continue;
              default:
                if (
                  ((o = n.trys),
                  !(o = o.length > 0 && o[o.length - 1]) &&
                    (l[0] === 6 || l[0] === 2))
                ) {
                  n = 0;
                  continue;
                }
                if (l[0] === 3 && (!o || (l[1] > o[0] && l[1] < o[3]))) {
                  n.label = l[1];
                  break;
                }
                if (l[0] === 6 && n.label < o[1]) {
                  (n.label = o[1]), (o = l);
                  break;
                }
                if (o && n.label < o[2]) {
                  (n.label = o[2]), n.ops.push(l);
                  break;
                }
                o[2] && n.ops.pop(), n.trys.pop();
                continue;
            }
            l = t.call(e, n);
          } catch (c) {
            (l = [6, c]), (i = 0);
          } finally {
            r = o = 0;
          }
        if (l[0] & 5) throw l[1];
        return { value: l[0] ? l[1] : void 0, done: !0 };
      }
    },
  ws =
    (globalThis && globalThis.__spreadArray) ||
    function (e, t) {
      for (var n = 0, r = t.length, i = e.length; n < r; n++, i++) e[i] = t[n];
      return e;
    },
  lS = Object.defineProperty,
  cS = Object.defineProperties,
  fS = Object.getOwnPropertyDescriptors,
  Vd = Object.getOwnPropertySymbols,
  dS = Object.prototype.hasOwnProperty,
  hS = Object.prototype.propertyIsEnumerable,
  Qd = function (e, t, n) {
    return t in e
      ? lS(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n);
  },
  ln = function (e, t) {
    for (var n in t || (t = {})) dS.call(t, n) && Qd(e, n, t[n]);
    if (Vd)
      for (var r = 0, i = Vd(t); r < i.length; r++) {
        var n = i[r];
        hS.call(t, n) && Qd(e, n, t[n]);
      }
    return e;
  },
  ou = function (e, t) {
    return cS(e, fS(t));
  },
  pS = function (e, t, n) {
    return new Promise(function (r, i) {
      var o = function (u) {
          try {
            a(n.next(u));
          } catch (l) {
            i(l);
          }
        },
        s = function (u) {
          try {
            a(n.throw(u));
          } catch (l) {
            i(l);
          }
        },
        a = function (u) {
          return u.done ? r(u.value) : Promise.resolve(u.value).then(o, s);
        };
      a((n = n.apply(e, t)).next());
    });
  },
  mS =
    typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : function () {
          if (arguments.length !== 0)
            return typeof arguments[0] == "object"
              ? gs
              : gs.apply(null, arguments);
        };
function yS(e) {
  if (typeof e != "object" || e === null) return !1;
  var t = Object.getPrototypeOf(e);
  if (t === null) return !0;
  for (var n = t; Object.getPrototypeOf(n) !== null; )
    n = Object.getPrototypeOf(n);
  return t === n;
}
var vS = (function (e) {
  aS(t, e);
  function t() {
    for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
    var i = e.apply(this, n) || this;
    return Object.setPrototypeOf(i, t.prototype), i;
  }
  return (
    Object.defineProperty(t, Symbol.species, {
      get: function () {
        return t;
      },
      enumerable: !1,
      configurable: !0,
    }),
    (t.prototype.concat = function () {
      for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
      return e.prototype.concat.apply(this, n);
    }),
    (t.prototype.prepend = function () {
      for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
      return n.length === 1 && Array.isArray(n[0])
        ? new (t.bind.apply(t, ws([void 0], n[0].concat(this))))()
        : new (t.bind.apply(t, ws([void 0], n.concat(this))))();
    }),
    t
  );
})(Array);
function vl(e) {
  return Lt(e) ? ay(e, function () {}) : e;
}
function gS(e) {
  return typeof e == "boolean";
}
function wS() {
  return function (t) {
    return SS(t);
  };
}
function SS(e) {
  e === void 0 && (e = {});
  var t = e.thunk,
    n = t === void 0 ? !0 : t;
  e.immutableCheck, e.serializableCheck;
  var r = new vS();
  return (
    n && (gS(n) ? r.push(zd) : r.push(zd.withExtraArgument(n.extraArgument))), r
  );
}
var ES = !0;
function CS(e) {
  var t = wS(),
    n = e || {},
    r = n.reducer,
    i = r === void 0 ? void 0 : r,
    o = n.middleware,
    s = o === void 0 ? t() : o,
    a = n.devTools,
    u = a === void 0 ? !0 : a,
    l = n.preloadedState,
    c = l === void 0 ? void 0 : l,
    f = n.enhancers,
    d = f === void 0 ? void 0 : f,
    y;
  if (typeof i == "function") y = i;
  else if (yS(i)) y = oS(i);
  else
    throw new Error(
      '"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers'
    );
  var p = s;
  typeof p == "function" && (p = p(t));
  var v = sS.apply(void 0, p),
    C = gs;
  u && (C = mS(ln({ trace: !ES }, typeof u == "object" && u)));
  var m = [v];
  Array.isArray(d) ? (m = ws([v], d)) : typeof d == "function" && (m = d(m));
  var h = C.apply(void 0, m);
  return uy(y, c, h);
}
function cn(e, t) {
  function n() {
    for (var r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
    if (t) {
      var o = t.apply(void 0, r);
      if (!o) throw new Error("prepareAction did not return an object");
      return ln(
        ln({ type: e, payload: o.payload }, "meta" in o && { meta: o.meta }),
        "error" in o && { error: o.error }
      );
    }
    return { type: e, payload: r[0] };
  }
  return (
    (n.toString = function () {
      return "" + e;
    }),
    (n.type = e),
    (n.match = function (r) {
      return r.type === e;
    }),
    n
  );
}
function fy(e) {
  var t = {},
    n = [],
    r,
    i = {
      addCase: function (o, s) {
        var a = typeof o == "string" ? o : o.type;
        if (a in t)
          throw new Error(
            "addCase cannot be called with two reducers for the same action type"
          );
        return (t[a] = s), i;
      },
      addMatcher: function (o, s) {
        return n.push({ matcher: o, reducer: s }), i;
      },
      addDefaultCase: function (o) {
        return (r = o), i;
      },
    };
  return e(i), [t, n, r];
}
function OS(e) {
  return typeof e == "function";
}
function PS(e, t, n, r) {
  n === void 0 && (n = []);
  var i = typeof t == "function" ? fy(t) : [t, n, r],
    o = i[0],
    s = i[1],
    a = i[2],
    u;
  if (OS(e))
    u = function () {
      return vl(e());
    };
  else {
    var l = vl(e);
    u = function () {
      return l;
    };
  }
  function c(f, d) {
    f === void 0 && (f = u());
    var y = ws(
      [o[d.type]],
      s
        .filter(function (p) {
          var v = p.matcher;
          return v(d);
        })
        .map(function (p) {
          var v = p.reducer;
          return v;
        })
    );
    return (
      y.filter(function (p) {
        return !!p;
      }).length === 0 && (y = [a]),
      y.reduce(function (p, v) {
        if (v)
          if (mn(p)) {
            var C = p,
              m = v(C, d);
            return m === void 0 ? p : m;
          } else {
            if (Lt(p))
              return ay(p, function (h) {
                return v(h, d);
              });
            var m = v(p, d);
            if (m === void 0) {
              if (p === null) return p;
              throw Error(
                "A case reducer on a non-draftable value must not return undefined"
              );
            }
            return m;
          }
        return p;
      }, f)
    );
  }
  return (c.getInitialState = u), c;
}
function xS(e, t) {
  return e + "/" + t;
}
function Kc(e) {
  var t = e.name;
  if (!t) throw new Error("`name` is a required option for createSlice");
  typeof process < "u";
  var n =
      typeof e.initialState == "function" ? e.initialState : vl(e.initialState),
    r = e.reducers || {},
    i = Object.keys(r),
    o = {},
    s = {},
    a = {};
  i.forEach(function (c) {
    var f = r[c],
      d = xS(t, c),
      y,
      p;
    "reducer" in f ? ((y = f.reducer), (p = f.prepare)) : (y = f),
      (o[c] = y),
      (s[d] = y),
      (a[c] = p ? cn(d, p) : cn(d));
  });
  function u() {
    var c =
        typeof e.extraReducers == "function"
          ? fy(e.extraReducers)
          : [e.extraReducers],
      f = c[0],
      d = f === void 0 ? {} : f,
      y = c[1],
      p = y === void 0 ? [] : y,
      v = c[2],
      C = v === void 0 ? void 0 : v,
      m = ln(ln({}, d), s);
    return PS(n, function (h) {
      for (var g in m) h.addCase(g, m[g]);
      for (var E = 0, x = p; E < x.length; E++) {
        var k = x[E];
        h.addMatcher(k.matcher, k.reducer);
      }
      C && h.addDefaultCase(C);
    });
  }
  var l;
  return {
    name: t,
    reducer: function (c, f) {
      return l || (l = u()), l(c, f);
    },
    actions: a,
    caseReducers: o,
    getInitialState: function () {
      return l || (l = u()), l.getInitialState();
    },
  };
}
var kS = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",
  bS = function (e) {
    e === void 0 && (e = 21);
    for (var t = "", n = e; n--; ) t += kS[(Math.random() * 64) | 0];
    return t;
  },
  _S = ["name", "message", "stack", "code"],
  su = (function () {
    function e(t, n) {
      (this.payload = t), (this.meta = n);
    }
    return e;
  })(),
  qd = (function () {
    function e(t, n) {
      (this.payload = t), (this.meta = n);
    }
    return e;
  })(),
  TS = function (e) {
    if (typeof e == "object" && e !== null) {
      for (var t = {}, n = 0, r = _S; n < r.length; n++) {
        var i = r[n];
        typeof e[i] == "string" && (t[i] = e[i]);
      }
      return t;
    }
    return { message: String(e) };
  };
(function () {
  function e(t, n, r) {
    var i = cn(t + "/fulfilled", function (l, c, f, d) {
        return {
          payload: l,
          meta: ou(ln({}, d || {}), {
            arg: f,
            requestId: c,
            requestStatus: "fulfilled",
          }),
        };
      }),
      o = cn(t + "/pending", function (l, c, f) {
        return {
          payload: void 0,
          meta: ou(ln({}, f || {}), {
            arg: c,
            requestId: l,
            requestStatus: "pending",
          }),
        };
      }),
      s = cn(t + "/rejected", function (l, c, f, d, y) {
        return {
          payload: d,
          error: ((r && r.serializeError) || TS)(l || "Rejected"),
          meta: ou(ln({}, y || {}), {
            arg: f,
            requestId: c,
            rejectedWithValue: !!d,
            requestStatus: "rejected",
            aborted: (l == null ? void 0 : l.name) === "AbortError",
            condition: (l == null ? void 0 : l.name) === "ConditionError",
          }),
        };
      }),
      a =
        typeof AbortController < "u"
          ? AbortController
          : (function () {
              function l() {
                this.signal = {
                  aborted: !1,
                  addEventListener: function () {},
                  dispatchEvent: function () {
                    return !1;
                  },
                  onabort: function () {},
                  removeEventListener: function () {},
                  reason: void 0,
                  throwIfAborted: function () {},
                };
              }
              return (l.prototype.abort = function () {}), l;
            })();
    function u(l) {
      return function (c, f, d) {
        var y = r != null && r.idGenerator ? r.idGenerator(l) : bS(),
          p = new a(),
          v;
        function C(h) {
          (v = h), p.abort();
        }
        var m = (function () {
          return pS(this, null, function () {
            var h, g, E, x, k, T, A;
            return uS(this, function (F) {
              switch (F.label) {
                case 0:
                  return (
                    F.trys.push([0, 4, , 5]),
                    (x =
                      (h = r == null ? void 0 : r.condition) == null
                        ? void 0
                        : h.call(r, l, { getState: f, extra: d })),
                    NS(x) ? [4, x] : [3, 2]
                  );
                case 1:
                  (x = F.sent()), (F.label = 2);
                case 2:
                  if (x === !1 || p.signal.aborted)
                    throw {
                      name: "ConditionError",
                      message:
                        "Aborted due to condition callback returning false.",
                    };
                  return (
                    (k = new Promise(function (R, B) {
                      return p.signal.addEventListener("abort", function () {
                        return B({
                          name: "AbortError",
                          message: v || "Aborted",
                        });
                      });
                    })),
                    c(
                      o(
                        y,
                        l,
                        (g = r == null ? void 0 : r.getPendingMeta) == null
                          ? void 0
                          : g.call(
                              r,
                              { requestId: y, arg: l },
                              { getState: f, extra: d }
                            )
                      )
                    ),
                    [
                      4,
                      Promise.race([
                        k,
                        Promise.resolve(
                          n(l, {
                            dispatch: c,
                            getState: f,
                            extra: d,
                            requestId: y,
                            signal: p.signal,
                            abort: C,
                            rejectWithValue: function (R, B) {
                              return new su(R, B);
                            },
                            fulfillWithValue: function (R, B) {
                              return new qd(R, B);
                            },
                          })
                        ).then(function (R) {
                          if (R instanceof su) throw R;
                          return R instanceof qd
                            ? i(R.payload, y, l, R.meta)
                            : i(R, y, l);
                        }),
                      ]),
                    ]
                  );
                case 3:
                  return (E = F.sent()), [3, 5];
                case 4:
                  return (
                    (T = F.sent()),
                    (E =
                      T instanceof su
                        ? s(null, y, l, T.payload, T.meta)
                        : s(T, y, l)),
                    [3, 5]
                  );
                case 5:
                  return (
                    (A =
                      r &&
                      !r.dispatchConditionRejection &&
                      s.match(E) &&
                      E.meta.condition),
                    A || c(E),
                    [2, E]
                  );
              }
            });
          });
        })();
        return Object.assign(m, {
          abort: C,
          requestId: y,
          arg: l,
          unwrap: function () {
            return m.then(RS);
          },
        });
      };
    }
    return Object.assign(u, {
      pending: o,
      rejected: s,
      fulfilled: i,
      typePrefix: t,
    });
  }
  return (
    (e.withTypes = function () {
      return e;
    }),
    e
  );
})();
function RS(e) {
  if (e.meta && e.meta.rejectedWithValue) throw e.payload;
  if (e.error) throw e.error;
  return e.payload;
}
function NS(e) {
  return e !== null && typeof e == "object" && typeof e.then == "function";
}
var Gc = "listenerMiddleware";
cn(Gc + "/add");
cn(Gc + "/removeAll");
cn(Gc + "/remove");
var Hd;
typeof queueMicrotask == "function" &&
  queueMicrotask.bind(
    typeof window < "u" ? window : typeof global < "u" ? global : globalThis
  );
Gw();
const AS = {
    chosenCurrency: { currency: "USD", symbol: "$" },
    account: { username: "Username" },
    banners: JSON.parse(localStorage.getItem("banners")) || [
      { name: "freetrial", enabled: !0 },
      { name: "note", enabled: !0 },
    ],
    prompts: [
      { name: "nosignin", enabled: !1 },
      { name: "nofunds", enabled: !1 },
      { name: "minbet", enabled: !1 },
    ],
  },
  dy = Kc({
    name: "main",
    initialState: AS,
    reducers: {
      changeCurrency: (e, t) => {
        e.chosenCurrency = t.payload;
      },
      closeBanner: (e, t) => {
        const n = e.banners.find((r) => r.name === t.payload);
        n && (n.enabled = !1),
          localStorage.setItem("banners", JSON.stringify(e.banners));
      },
      changePrompt: (e, t) => {
        const n = e.prompts.find((r) => r.name === t.payload.name);
        n && (n.enabled = t.payload.enabled),
          localStorage.setItem("prompts", JSON.stringify(e.prompts));
      },
    },
  }),
  { changeCurrency: $S, closeBanner: Wd, changePrompt: pr } = dy.actions,
  DS = dy.reducer;
var hy = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  Kd = ee.createContext && ee.createContext(hy),
  fn =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (fn =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
              t = arguments[n];
              for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
          }),
        fn.apply(this, arguments)
      );
    },
  FS =
    (globalThis && globalThis.__rest) ||
    function (e, t) {
      var n = {};
      for (var r in e)
        Object.prototype.hasOwnProperty.call(e, r) &&
          t.indexOf(r) < 0 &&
          (n[r] = e[r]);
      if (e != null && typeof Object.getOwnPropertySymbols == "function")
        for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
          t.indexOf(r[i]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
            (n[r[i]] = e[r[i]]);
      return n;
    };
function py(e) {
  return (
    e &&
    e.map(function (t, n) {
      return ee.createElement(t.tag, fn({ key: n }, t.attr), py(t.child));
    })
  );
}
function Nr(e) {
  return function (t) {
    return ee.createElement(LS, fn({ attr: fn({}, e.attr) }, t), py(e.child));
  };
}
function LS(e) {
  var t = function (n) {
    var r = e.attr,
      i = e.size,
      o = e.title,
      s = FS(e, ["attr", "size", "title"]),
      a = i || n.size || "1em",
      u;
    return (
      n.className && (u = n.className),
      e.className && (u = (u ? u + " " : "") + e.className),
      ee.createElement(
        "svg",
        fn(
          { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
          n.attr,
          r,
          s,
          {
            className: u,
            style: fn(fn({ color: e.color || n.color }, n.style), e.style),
            height: a,
            width: a,
            xmlns: "http://www.w3.org/2000/svg",
          }
        ),
        o && ee.createElement("title", null, o),
        e.children
      )
    );
  };
  return Kd !== void 0
    ? ee.createElement(Kd.Consumer, null, function (n) {
        return t(n);
      })
    : t(hy);
}
function IS(e) {
  return Nr({
    tag: "svg",
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M395.5 177.5c0 33.8-27.5 61-61 61-33.8 0-61-27.3-61-61s27.3-61 61-61c33.5 0 61 27.2 61 61zm52.5.2c0 63-51 113.8-113.7 113.8L225 371.3c-4 43-40.5 76.8-84.5 76.8-40.5 0-74.7-28.8-83-67L0 358V250.7L97.2 290c15.1-9.2 32.2-13.3 52-11.5l71-101.7c.5-62.3 51.5-112.8 114-112.8C397 64 448 115 448 177.7zM203 363c0-34.7-27.8-62.5-62.5-62.5-4.5 0-9 .5-13.5 1.5l26 10.5c25.5 10.2 38 39 27.7 64.5-10.2 25.5-39.2 38-64.7 27.5-10.2-4-20.5-8.3-30.7-12.2 10.5 19.7 31.2 33.2 55.2 33.2 34.7 0 62.5-27.8 62.5-62.5zm207.5-185.3c0-42-34.3-76.2-76.2-76.2-42.3 0-76.5 34.2-76.5 76.2 0 42.2 34.3 76.2 76.5 76.2 41.9.1 76.2-33.9 76.2-76.2z",
        },
      },
    ],
  })(e);
}
function Xt(e) {
  return Nr({
    tag: "svg",
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M0 405.3V448c0 35.3 86 64 192 64s192-28.7 192-64v-42.7C342.7 434.4 267.2 448 192 448S41.3 434.4 0 405.3zM320 128c106 0 192-28.7 192-64S426 0 320 0 128 28.7 128 64s86 64 192 64zM0 300.4V352c0 35.3 86 64 192 64s192-28.7 192-64v-51.6c-41.3 34-116.9 51.6-192 51.6S41.3 334.4 0 300.4zm416 11c57.3-11.1 96-31.7 96-55.4v-42.7c-23.2 16.4-57.3 27.6-96 34.5v63.6zM192 160C86 160 0 195.8 0 240s86 80 192 80 192-35.8 192-80-86-80-192-80zm219.3 56.3c60-10.8 100.7-32 100.7-56.3v-42.7c-35.5 25.1-96.5 38.6-160.7 41.8 29.5 14.3 51.2 33.5 60 57.2z",
        },
      },
    ],
  })(e);
}
function MS(e) {
  return Nr({
    tag: "svg",
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M256 64C110.06 64 0 125.91 0 208v98.13C0 384.48 114.62 448 256 448s256-63.52 256-141.87V208c0-82.09-110.06-144-256-144zm0 64c106.04 0 192 35.82 192 80 0 9.26-3.97 18.12-10.91 26.39C392.15 208.21 328.23 192 256 192s-136.15 16.21-181.09 42.39C67.97 226.12 64 217.26 64 208c0-44.18 85.96-80 192-80zM120.43 264.64C155.04 249.93 201.64 240 256 240s100.96 9.93 135.57 24.64C356.84 279.07 308.93 288 256 288s-100.84-8.93-135.57-23.36z",
        },
      },
    ],
  })(e);
}
var Yc = {},
  gl =
    (globalThis && globalThis.__assign) ||
    function () {
      return (gl =
        Object.assign ||
        function (e) {
          for (var t, n = 1, r = arguments.length; n < r; n++)
            for (var i in (t = arguments[n]))
              Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
          return e;
        }).apply(this, arguments);
    },
  jS = (function () {
    function e(t, n, r) {
      var i = this;
      (this.endVal = n),
        (this.options = r),
        (this.version = "2.6.0"),
        (this.defaults = {
          startVal: 0,
          decimalPlaces: 0,
          duration: 2,
          useEasing: !0,
          useGrouping: !0,
          useIndianSeparators: !1,
          smartEasingThreshold: 999,
          smartEasingAmount: 333,
          separator: ",",
          decimal: ".",
          prefix: "",
          suffix: "",
          enableScrollSpy: !1,
          scrollSpyDelay: 200,
          scrollSpyOnce: !1,
        }),
        (this.finalEndVal = null),
        (this.useEasing = !0),
        (this.countDown = !1),
        (this.error = ""),
        (this.startVal = 0),
        (this.paused = !0),
        (this.once = !1),
        (this.count = function (o) {
          i.startTime || (i.startTime = o);
          var s = o - i.startTime;
          (i.remaining = i.duration - s),
            i.useEasing
              ? i.countDown
                ? (i.frameVal =
                    i.startVal -
                    i.easingFn(s, 0, i.startVal - i.endVal, i.duration))
                : (i.frameVal = i.easingFn(
                    s,
                    i.startVal,
                    i.endVal - i.startVal,
                    i.duration
                  ))
              : (i.frameVal =
                  i.startVal + (i.endVal - i.startVal) * (s / i.duration));
          var a = i.countDown ? i.frameVal < i.endVal : i.frameVal > i.endVal;
          (i.frameVal = a ? i.endVal : i.frameVal),
            (i.frameVal = Number(i.frameVal.toFixed(i.options.decimalPlaces))),
            i.printValue(i.frameVal),
            s < i.duration
              ? (i.rAF = requestAnimationFrame(i.count))
              : i.finalEndVal !== null
              ? i.update(i.finalEndVal)
              : i.options.onCompleteCallback && i.options.onCompleteCallback();
        }),
        (this.formatNumber = function (o) {
          var s,
            a,
            u,
            l,
            c = o < 0 ? "-" : "";
          s = Math.abs(o).toFixed(i.options.decimalPlaces);
          var f = (s += "").split(".");
          if (
            ((a = f[0]),
            (u = f.length > 1 ? i.options.decimal + f[1] : ""),
            i.options.useGrouping)
          ) {
            l = "";
            for (var d = 3, y = 0, p = 0, v = a.length; p < v; ++p)
              i.options.useIndianSeparators && p === 4 && ((d = 2), (y = 1)),
                p !== 0 && y % d == 0 && (l = i.options.separator + l),
                y++,
                (l = a[v - p - 1] + l);
            a = l;
          }
          return (
            i.options.numerals &&
              i.options.numerals.length &&
              ((a = a.replace(/[0-9]/g, function (C) {
                return i.options.numerals[+C];
              })),
              (u = u.replace(/[0-9]/g, function (C) {
                return i.options.numerals[+C];
              }))),
            c + i.options.prefix + a + u + i.options.suffix
          );
        }),
        (this.easeOutExpo = function (o, s, a, u) {
          return (a * (1 - Math.pow(2, (-10 * o) / u)) * 1024) / 1023 + s;
        }),
        (this.options = gl(gl({}, this.defaults), r)),
        (this.formattingFn = this.options.formattingFn
          ? this.options.formattingFn
          : this.formatNumber),
        (this.easingFn = this.options.easingFn
          ? this.options.easingFn
          : this.easeOutExpo),
        (this.startVal = this.validateValue(this.options.startVal)),
        (this.frameVal = this.startVal),
        (this.endVal = this.validateValue(n)),
        (this.options.decimalPlaces = Math.max(this.options.decimalPlaces)),
        this.resetDuration(),
        (this.options.separator = String(this.options.separator)),
        (this.useEasing = this.options.useEasing),
        this.options.separator === "" && (this.options.useGrouping = !1),
        (this.el = typeof t == "string" ? document.getElementById(t) : t),
        this.el
          ? this.printValue(this.startVal)
          : (this.error = "[CountUp] target is null or undefined"),
        typeof window < "u" &&
          this.options.enableScrollSpy &&
          (this.error
            ? console.error(this.error, t)
            : ((window.onScrollFns = window.onScrollFns || []),
              window.onScrollFns.push(function () {
                return i.handleScroll(i);
              }),
              (window.onscroll = function () {
                window.onScrollFns.forEach(function (o) {
                  return o();
                });
              }),
              this.handleScroll(this)));
    }
    return (
      (e.prototype.handleScroll = function (t) {
        if (t && window && !t.once) {
          var n = window.innerHeight + window.scrollY,
            r = t.el.getBoundingClientRect(),
            i = r.top + window.pageYOffset,
            o = r.top + r.height + window.pageYOffset;
          o < n && o > window.scrollY && t.paused
            ? ((t.paused = !1),
              setTimeout(function () {
                return t.start();
              }, t.options.scrollSpyDelay),
              t.options.scrollSpyOnce && (t.once = !0))
            : (window.scrollY > o || i > n) && !t.paused && t.reset();
        }
      }),
      (e.prototype.determineDirectionAndSmartEasing = function () {
        var t = this.finalEndVal ? this.finalEndVal : this.endVal;
        this.countDown = this.startVal > t;
        var n = t - this.startVal;
        if (
          Math.abs(n) > this.options.smartEasingThreshold &&
          this.options.useEasing
        ) {
          this.finalEndVal = t;
          var r = this.countDown ? 1 : -1;
          (this.endVal = t + r * this.options.smartEasingAmount),
            (this.duration = this.duration / 2);
        } else (this.endVal = t), (this.finalEndVal = null);
        this.finalEndVal !== null
          ? (this.useEasing = !1)
          : (this.useEasing = this.options.useEasing);
      }),
      (e.prototype.start = function (t) {
        this.error ||
          (t && (this.options.onCompleteCallback = t),
          this.duration > 0
            ? (this.determineDirectionAndSmartEasing(),
              (this.paused = !1),
              (this.rAF = requestAnimationFrame(this.count)))
            : this.printValue(this.endVal));
      }),
      (e.prototype.pauseResume = function () {
        this.paused
          ? ((this.startTime = null),
            (this.duration = this.remaining),
            (this.startVal = this.frameVal),
            this.determineDirectionAndSmartEasing(),
            (this.rAF = requestAnimationFrame(this.count)))
          : cancelAnimationFrame(this.rAF),
          (this.paused = !this.paused);
      }),
      (e.prototype.reset = function () {
        cancelAnimationFrame(this.rAF),
          (this.paused = !0),
          this.resetDuration(),
          (this.startVal = this.validateValue(this.options.startVal)),
          (this.frameVal = this.startVal),
          this.printValue(this.startVal);
      }),
      (e.prototype.update = function (t) {
        cancelAnimationFrame(this.rAF),
          (this.startTime = null),
          (this.endVal = this.validateValue(t)),
          this.endVal !== this.frameVal &&
            ((this.startVal = this.frameVal),
            this.finalEndVal == null && this.resetDuration(),
            (this.finalEndVal = null),
            this.determineDirectionAndSmartEasing(),
            (this.rAF = requestAnimationFrame(this.count)));
      }),
      (e.prototype.printValue = function (t) {
        var n;
        if (this.el) {
          var r = this.formattingFn(t);
          (n = this.options.plugin) !== null && n !== void 0 && n.render
            ? this.options.plugin.render(this.el, r)
            : this.el.tagName === "INPUT"
            ? (this.el.value = r)
            : this.el.tagName === "text" || this.el.tagName === "tspan"
            ? (this.el.textContent = r)
            : (this.el.innerHTML = r);
        }
      }),
      (e.prototype.ensureNumber = function (t) {
        return typeof t == "number" && !isNaN(t);
      }),
      (e.prototype.validateValue = function (t) {
        var n = Number(t);
        return this.ensureNumber(n)
          ? n
          : ((this.error = "[CountUp] invalid start or end value: ".concat(t)),
            null);
      }),
      (e.prototype.resetDuration = function () {
        (this.startTime = null),
          (this.duration = 1e3 * Number(this.options.duration)),
          (this.remaining = this.duration);
      }),
      e
    );
  })();
const US = Object.freeze(
    Object.defineProperty(
      { __proto__: null, CountUp: jS },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  BS = Pv(US);
Object.defineProperty(Yc, "__esModule", { value: !0 });
var he = O,
  zS = BS;
function VS(e, t) {
  var n =
    e == null
      ? null
      : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (n != null) {
    var r,
      i,
      o,
      s,
      a = [],
      u = !0,
      l = !1;
    try {
      if (((o = (n = n.call(e)).next), t === 0)) {
        if (Object(n) !== n) return;
        u = !1;
      } else
        for (
          ;
          !(u = (r = o.call(n)).done) && (a.push(r.value), a.length !== t);
          u = !0
        );
    } catch (c) {
      (l = !0), (i = c);
    } finally {
      try {
        if (!u && n.return != null && ((s = n.return()), Object(s) !== s))
          return;
      } finally {
        if (l) throw i;
      }
    }
    return a;
  }
}
function Gd(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Ss(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Gd(Object(n), !0).forEach(function (r) {
          QS(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : Gd(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function QS(e, t, n) {
  return (
    (t = JS(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function wl() {
  return (
    (wl = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    wl.apply(this, arguments)
  );
}
function qS(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    o;
  for (o = 0; o < r.length; o++)
    (i = r[o]), !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function my(e, t) {
  if (e == null) return {};
  var n = qS(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (r = o[i]),
        !(t.indexOf(r) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, r) &&
          (n[r] = e[r]);
  }
  return n;
}
function HS(e, t) {
  return WS(e) || VS(e, t) || KS(e, t) || GS();
}
function WS(e) {
  if (Array.isArray(e)) return e;
}
function KS(e, t) {
  if (e) {
    if (typeof e == "string") return Yd(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (n === "Object" && e.constructor && (n = e.constructor.name),
      n === "Map" || n === "Set")
    )
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Yd(e, t);
  }
}
function Yd(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function GS() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function YS(e, t) {
  if (typeof e != "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function JS(e) {
  var t = YS(e, "string");
  return typeof t == "symbol" ? t : String(t);
}
var XS =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u"
    ? he.useLayoutEffect
    : he.useEffect;
function at(e) {
  var t = he.useRef(e);
  return (
    XS(function () {
      t.current = e;
    }),
    he.useCallback(function () {
      for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++)
        r[i] = arguments[i];
      return t.current.apply(void 0, r);
    }, [])
  );
}
var ZS = function (t, n) {
    var r = n.decimal,
      i = n.decimals,
      o = n.duration,
      s = n.easingFn,
      a = n.end,
      u = n.formattingFn,
      l = n.numerals,
      c = n.prefix,
      f = n.separator,
      d = n.start,
      y = n.suffix,
      p = n.useEasing,
      v = n.useGrouping,
      C = n.useIndianSeparators,
      m = n.enableScrollSpy,
      h = n.scrollSpyDelay,
      g = n.scrollSpyOnce;
    return new zS.CountUp(t, a, {
      startVal: d,
      duration: o,
      decimal: r,
      decimalPlaces: i,
      easingFn: s,
      formattingFn: u,
      numerals: l,
      separator: f,
      prefix: c,
      suffix: y,
      useEasing: p,
      useIndianSeparators: C,
      useGrouping: v,
      enableScrollSpy: m,
      scrollSpyDelay: h,
      scrollSpyOnce: g,
    });
  },
  eE = [
    "ref",
    "startOnMount",
    "enableReinitialize",
    "delay",
    "onEnd",
    "onStart",
    "onPauseResume",
    "onReset",
    "onUpdate",
  ],
  tE = {
    decimal: ".",
    separator: ",",
    delay: null,
    prefix: "",
    suffix: "",
    duration: 2,
    start: 0,
    decimals: 0,
    startOnMount: !0,
    enableReinitialize: !0,
    useEasing: !0,
    useGrouping: !0,
    useIndianSeparators: !1,
  },
  yy = function (t) {
    var n = Object.fromEntries(
        Object.entries(t).filter(function (F) {
          var R = HS(F, 2),
            B = R[1];
          return B !== void 0;
        })
      ),
      r = he.useMemo(
        function () {
          return Ss(Ss({}, tE), n);
        },
        [t]
      ),
      i = r.ref,
      o = r.startOnMount,
      s = r.enableReinitialize,
      a = r.delay,
      u = r.onEnd,
      l = r.onStart,
      c = r.onPauseResume,
      f = r.onReset,
      d = r.onUpdate,
      y = my(r, eE),
      p = he.useRef(),
      v = he.useRef(),
      C = he.useRef(!1),
      m = at(function () {
        return ZS(typeof i == "string" ? i : i.current, y);
      }),
      h = at(function (F) {
        var R = p.current;
        if (R && !F) return R;
        var B = m();
        return (p.current = B), B;
      }),
      g = at(function () {
        var F = function () {
          return h(!0).start(function () {
            u == null || u({ pauseResume: E, reset: x, start: T, update: k });
          });
        };
        a && a > 0 ? (v.current = setTimeout(F, a * 1e3)) : F(),
          l == null || l({ pauseResume: E, reset: x, update: k });
      }),
      E = at(function () {
        h().pauseResume(), c == null || c({ reset: x, start: T, update: k });
      }),
      x = at(function () {
        h().el &&
          (v.current && clearTimeout(v.current),
          h().reset(),
          f == null || f({ pauseResume: E, start: T, update: k }));
      }),
      k = at(function (F) {
        h().update(F), d == null || d({ pauseResume: E, reset: x, start: T });
      }),
      T = at(function () {
        x(), g();
      }),
      A = at(function (F) {
        o && (F && x(), g());
      });
    return (
      he.useEffect(
        function () {
          C.current ? s && A(!0) : ((C.current = !0), A());
        },
        [
          s,
          C,
          A,
          a,
          t.start,
          t.suffix,
          t.prefix,
          t.duration,
          t.separator,
          t.decimals,
          t.decimal,
          t.formattingFn,
        ]
      ),
      he.useEffect(
        function () {
          return function () {
            x();
          };
        },
        [x]
      ),
      { start: T, pauseResume: E, reset: x, update: k, getCountUp: h }
    );
  },
  nE = ["className", "redraw", "containerProps", "children", "style"],
  rE = function (t) {
    var n = t.className,
      r = t.redraw,
      i = t.containerProps,
      o = t.children,
      s = t.style,
      a = my(t, nE),
      u = he.useRef(null),
      l = he.useRef(!1),
      c = yy(
        Ss(
          Ss({}, a),
          {},
          {
            ref: u,
            startOnMount: typeof o != "function" || t.delay === 0,
            enableReinitialize: !1,
          }
        )
      ),
      f = c.start,
      d = c.reset,
      y = c.update,
      p = c.pauseResume,
      v = c.getCountUp,
      C = at(function () {
        f();
      }),
      m = at(function (E) {
        t.preserveValue || d(), y(E);
      }),
      h = at(function () {
        if (
          typeof t.children == "function" &&
          !(u.current instanceof Element)
        ) {
          console.error(
            `Couldn't find attached element to hook the CountUp instance into! Try to attach "containerRef" from the render prop to a an Element, eg. <span ref={containerRef} />.`
          );
          return;
        }
        v();
      });
    he.useEffect(
      function () {
        h();
      },
      [h]
    ),
      he.useEffect(
        function () {
          l.current && m(t.end);
        },
        [t.end, m]
      );
    var g = r && t;
    return (
      he.useEffect(
        function () {
          r && l.current && C();
        },
        [C, r, g]
      ),
      he.useEffect(
        function () {
          !r && l.current && C();
        },
        [
          C,
          r,
          t.start,
          t.suffix,
          t.prefix,
          t.duration,
          t.separator,
          t.decimals,
          t.decimal,
          t.className,
          t.formattingFn,
        ]
      ),
      he.useEffect(function () {
        l.current = !0;
      }, []),
      typeof o == "function"
        ? o({
            countUpRef: u,
            start: f,
            reset: d,
            update: y,
            pauseResume: p,
            getCountUp: v,
          })
        : he.createElement(
            "span",
            wl({ className: n, ref: u, style: s }, i),
            typeof t.start < "u" ? v().formattingFn(t.start) : ""
          )
    );
  },
  bo = (Yc.default = rE);
Yc.useCountUp = yy;
function iE(e) {
  return Nr({
    tag: "svg",
    attr: { viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
    child: [
      {
        tag: "path",
        attr: {
          fillRule: "evenodd",
          d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
          clipRule: "evenodd",
        },
      },
    ],
  })(e);
}
function oE(e) {
  return Nr({
    tag: "svg",
    attr: { viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
    child: [
      {
        tag: "path",
        attr: {
          fillRule: "evenodd",
          d: "M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z",
          clipRule: "evenodd",
        },
      },
    ],
  })(e);
}
function Ai(e) {
  return Nr({
    tag: "svg",
    attr: { viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
    child: [
      {
        tag: "path",
        attr: {
          fillRule: "evenodd",
          d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
          clipRule: "evenodd",
        },
      },
    ],
  })(e);
}
const sE = ({ options: e, value: t, active: n, setActive: r }) =>
  N("div", {
    className: `dropdown ${n && "active"}`,
    children: [
      N("span", {
        onClick: () => r((i) => !i),
        className: "title",
        children: [t, w(iE, { className: "chev" })],
      }),
      w("div", {
        className: "dropdownContent",
        children: w("div", {
          className: "dropdownItems",
          children: e.map((i, o) =>
            w(
              "div",
              {
                className: "dropdownOption",
                onClick: i.onClick,
                children: w("span", { children: i.title }),
              },
              o
            )
          ),
        }),
      }),
    ],
  });
const zn = "https://retrac.site";
function Sl(e, t) {
  return (
    (Sl = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    Sl(e, t)
  );
}
function Ui(e, t) {
  (e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    Sl(e, t);
}
var Bi = (function () {
    function e() {
      this.listeners = [];
    }
    var t = e.prototype;
    return (
      (t.subscribe = function (r) {
        var i = this,
          o = r || function () {};
        return (
          this.listeners.push(o),
          this.onSubscribe(),
          function () {
            (i.listeners = i.listeners.filter(function (s) {
              return s !== o;
            })),
              i.onUnsubscribe();
          }
        );
      }),
      (t.hasListeners = function () {
        return this.listeners.length > 0;
      }),
      (t.onSubscribe = function () {}),
      (t.onUnsubscribe = function () {}),
      e
    );
  })(),
  Es = typeof window > "u";
function xe() {}
function aE(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function El(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function Cs(e) {
  return Array.isArray(e) ? e : [e];
}
function vy(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function _o(e, t, n) {
  return va(e)
    ? typeof t == "function"
      ? U({}, n, { queryKey: e, queryFn: t })
      : U({}, t, { queryKey: e })
    : e;
}
function Qt(e, t, n) {
  return va(e) ? [U({}, t, { queryKey: e }), n] : [e || {}, t];
}
function uE(e, t) {
  if ((e === !0 && t === !0) || (e == null && t == null)) return "all";
  if (e === !1 && t === !1) return "none";
  var n = e ?? !t;
  return n ? "active" : "inactive";
}
function Jd(e, t) {
  var n = e.active,
    r = e.exact,
    i = e.fetching,
    o = e.inactive,
    s = e.predicate,
    a = e.queryKey,
    u = e.stale;
  if (va(a)) {
    if (r) {
      if (t.queryHash !== Jc(a, t.options)) return !1;
    } else if (!Os(t.queryKey, a)) return !1;
  }
  var l = uE(n, o);
  if (l === "none") return !1;
  if (l !== "all") {
    var c = t.isActive();
    if ((l === "active" && !c) || (l === "inactive" && c)) return !1;
  }
  return !(
    (typeof u == "boolean" && t.isStale() !== u) ||
    (typeof i == "boolean" && t.isFetching() !== i) ||
    (s && !s(t))
  );
}
function Xd(e, t) {
  var n = e.exact,
    r = e.fetching,
    i = e.predicate,
    o = e.mutationKey;
  if (va(o)) {
    if (!t.options.mutationKey) return !1;
    if (n) {
      if (_n(t.options.mutationKey) !== _n(o)) return !1;
    } else if (!Os(t.options.mutationKey, o)) return !1;
  }
  return !(
    (typeof r == "boolean" && (t.state.status === "loading") !== r) ||
    (i && !i(t))
  );
}
function Jc(e, t) {
  var n = (t == null ? void 0 : t.queryKeyHashFn) || _n;
  return n(e);
}
function _n(e) {
  var t = Cs(e);
  return lE(t);
}
function lE(e) {
  return JSON.stringify(e, function (t, n) {
    return Cl(n)
      ? Object.keys(n)
          .sort()
          .reduce(function (r, i) {
            return (r[i] = n[i]), r;
          }, {})
      : n;
  });
}
function Os(e, t) {
  return gy(Cs(e), Cs(t));
}
function gy(e, t) {
  return e === t
    ? !0
    : typeof e != typeof t
    ? !1
    : e && t && typeof e == "object" && typeof t == "object"
    ? !Object.keys(t).some(function (n) {
        return !gy(e[n], t[n]);
      })
    : !1;
}
function Ps(e, t) {
  if (e === t) return e;
  var n = Array.isArray(e) && Array.isArray(t);
  if (n || (Cl(e) && Cl(t))) {
    for (
      var r = n ? e.length : Object.keys(e).length,
        i = n ? t : Object.keys(t),
        o = i.length,
        s = n ? [] : {},
        a = 0,
        u = 0;
      u < o;
      u++
    ) {
      var l = n ? u : i[u];
      (s[l] = Ps(e[l], t[l])), s[l] === e[l] && a++;
    }
    return r === o && a === r ? e : s;
  }
  return t;
}
function cE(e, t) {
  if ((e && !t) || (t && !e)) return !1;
  for (var n in e) if (e[n] !== t[n]) return !1;
  return !0;
}
function Cl(e) {
  if (!Zd(e)) return !1;
  var t = e.constructor;
  if (typeof t > "u") return !0;
  var n = t.prototype;
  return !(!Zd(n) || !n.hasOwnProperty("isPrototypeOf"));
}
function Zd(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function va(e) {
  return typeof e == "string" || Array.isArray(e);
}
function fE(e) {
  return new Promise(function (t) {
    setTimeout(t, e);
  });
}
function eh(e) {
  Promise.resolve()
    .then(e)
    .catch(function (t) {
      return setTimeout(function () {
        throw t;
      });
    });
}
function wy() {
  if (typeof AbortController == "function") return new AbortController();
}
var dE = (function (e) {
    Ui(t, e);
    function t() {
      var r;
      return (
        (r = e.call(this) || this),
        (r.setup = function (i) {
          var o;
          if (!Es && (o = window) != null && o.addEventListener) {
            var s = function () {
              return i();
            };
            return (
              window.addEventListener("visibilitychange", s, !1),
              window.addEventListener("focus", s, !1),
              function () {
                window.removeEventListener("visibilitychange", s),
                  window.removeEventListener("focus", s);
              }
            );
          }
        }),
        r
      );
    }
    var n = t.prototype;
    return (
      (n.onSubscribe = function () {
        this.cleanup || this.setEventListener(this.setup);
      }),
      (n.onUnsubscribe = function () {
        if (!this.hasListeners()) {
          var i;
          (i = this.cleanup) == null || i.call(this), (this.cleanup = void 0);
        }
      }),
      (n.setEventListener = function (i) {
        var o,
          s = this;
        (this.setup = i),
          (o = this.cleanup) == null || o.call(this),
          (this.cleanup = i(function (a) {
            typeof a == "boolean" ? s.setFocused(a) : s.onFocus();
          }));
      }),
      (n.setFocused = function (i) {
        (this.focused = i), i && this.onFocus();
      }),
      (n.onFocus = function () {
        this.listeners.forEach(function (i) {
          i();
        });
      }),
      (n.isFocused = function () {
        return typeof this.focused == "boolean"
          ? this.focused
          : typeof document > "u"
          ? !0
          : [void 0, "visible", "prerender"].includes(document.visibilityState);
      }),
      t
    );
  })(Bi),
  ui = new dE(),
  hE = (function (e) {
    Ui(t, e);
    function t() {
      var r;
      return (
        (r = e.call(this) || this),
        (r.setup = function (i) {
          var o;
          if (!Es && (o = window) != null && o.addEventListener) {
            var s = function () {
              return i();
            };
            return (
              window.addEventListener("online", s, !1),
              window.addEventListener("offline", s, !1),
              function () {
                window.removeEventListener("online", s),
                  window.removeEventListener("offline", s);
              }
            );
          }
        }),
        r
      );
    }
    var n = t.prototype;
    return (
      (n.onSubscribe = function () {
        this.cleanup || this.setEventListener(this.setup);
      }),
      (n.onUnsubscribe = function () {
        if (!this.hasListeners()) {
          var i;
          (i = this.cleanup) == null || i.call(this), (this.cleanup = void 0);
        }
      }),
      (n.setEventListener = function (i) {
        var o,
          s = this;
        (this.setup = i),
          (o = this.cleanup) == null || o.call(this),
          (this.cleanup = i(function (a) {
            typeof a == "boolean" ? s.setOnline(a) : s.onOnline();
          }));
      }),
      (n.setOnline = function (i) {
        (this.online = i), i && this.onOnline();
      }),
      (n.onOnline = function () {
        this.listeners.forEach(function (i) {
          i();
        });
      }),
      (n.isOnline = function () {
        return typeof this.online == "boolean"
          ? this.online
          : typeof navigator > "u" || typeof navigator.onLine > "u"
          ? !0
          : navigator.onLine;
      }),
      t
    );
  })(Bi),
  To = new hE();
function pE(e) {
  return Math.min(1e3 * Math.pow(2, e), 3e4);
}
function xs(e) {
  return typeof (e == null ? void 0 : e.cancel) == "function";
}
var Sy = function (t) {
  (this.revert = t == null ? void 0 : t.revert),
    (this.silent = t == null ? void 0 : t.silent);
};
function Ro(e) {
  return e instanceof Sy;
}
var Ey = function (t) {
    var n = this,
      r = !1,
      i,
      o,
      s,
      a;
    (this.abort = t.abort),
      (this.cancel = function (d) {
        return i == null ? void 0 : i(d);
      }),
      (this.cancelRetry = function () {
        r = !0;
      }),
      (this.continueRetry = function () {
        r = !1;
      }),
      (this.continue = function () {
        return o == null ? void 0 : o();
      }),
      (this.failureCount = 0),
      (this.isPaused = !1),
      (this.isResolved = !1),
      (this.isTransportCancelable = !1),
      (this.promise = new Promise(function (d, y) {
        (s = d), (a = y);
      }));
    var u = function (y) {
        n.isResolved ||
          ((n.isResolved = !0),
          t.onSuccess == null || t.onSuccess(y),
          o == null || o(),
          s(y));
      },
      l = function (y) {
        n.isResolved ||
          ((n.isResolved = !0),
          t.onError == null || t.onError(y),
          o == null || o(),
          a(y));
      },
      c = function () {
        return new Promise(function (y) {
          (o = y), (n.isPaused = !0), t.onPause == null || t.onPause();
        }).then(function () {
          (o = void 0),
            (n.isPaused = !1),
            t.onContinue == null || t.onContinue();
        });
      },
      f = function d() {
        if (!n.isResolved) {
          var y;
          try {
            y = t.fn();
          } catch (p) {
            y = Promise.reject(p);
          }
          (i = function (v) {
            if (
              !n.isResolved &&
              (l(new Sy(v)), n.abort == null || n.abort(), xs(y))
            )
              try {
                y.cancel();
              } catch {}
          }),
            (n.isTransportCancelable = xs(y)),
            Promise.resolve(y)
              .then(u)
              .catch(function (p) {
                var v, C;
                if (!n.isResolved) {
                  var m = (v = t.retry) != null ? v : 3,
                    h = (C = t.retryDelay) != null ? C : pE,
                    g = typeof h == "function" ? h(n.failureCount, p) : h,
                    E =
                      m === !0 ||
                      (typeof m == "number" && n.failureCount < m) ||
                      (typeof m == "function" && m(n.failureCount, p));
                  if (r || !E) {
                    l(p);
                    return;
                  }
                  n.failureCount++,
                    t.onFail == null || t.onFail(n.failureCount, p),
                    fE(g)
                      .then(function () {
                        if (!ui.isFocused() || !To.isOnline()) return c();
                      })
                      .then(function () {
                        r ? l(p) : d();
                      });
                }
              });
        }
      };
    f();
  },
  mE = (function () {
    function e() {
      (this.queue = []),
        (this.transactions = 0),
        (this.notifyFn = function (n) {
          n();
        }),
        (this.batchNotifyFn = function (n) {
          n();
        });
    }
    var t = e.prototype;
    return (
      (t.batch = function (r) {
        var i;
        this.transactions++;
        try {
          i = r();
        } finally {
          this.transactions--, this.transactions || this.flush();
        }
        return i;
      }),
      (t.schedule = function (r) {
        var i = this;
        this.transactions
          ? this.queue.push(r)
          : eh(function () {
              i.notifyFn(r);
            });
      }),
      (t.batchCalls = function (r) {
        var i = this;
        return function () {
          for (var o = arguments.length, s = new Array(o), a = 0; a < o; a++)
            s[a] = arguments[a];
          i.schedule(function () {
            r.apply(void 0, s);
          });
        };
      }),
      (t.flush = function () {
        var r = this,
          i = this.queue;
        (this.queue = []),
          i.length &&
            eh(function () {
              r.batchNotifyFn(function () {
                i.forEach(function (o) {
                  r.notifyFn(o);
                });
              });
            });
      }),
      (t.setNotifyFunction = function (r) {
        this.notifyFn = r;
      }),
      (t.setBatchNotifyFunction = function (r) {
        this.batchNotifyFn = r;
      }),
      e
    );
  })(),
  ie = new mE(),
  Cy = console;
function ks() {
  return Cy;
}
function yE(e) {
  Cy = e;
}
var vE = (function () {
    function e(n) {
      (this.abortSignalConsumed = !1),
        (this.hadObservers = !1),
        (this.defaultOptions = n.defaultOptions),
        this.setOptions(n.options),
        (this.observers = []),
        (this.cache = n.cache),
        (this.queryKey = n.queryKey),
        (this.queryHash = n.queryHash),
        (this.initialState = n.state || this.getDefaultState(this.options)),
        (this.state = this.initialState),
        (this.meta = n.meta),
        this.scheduleGc();
    }
    var t = e.prototype;
    return (
      (t.setOptions = function (r) {
        var i;
        (this.options = U({}, this.defaultOptions, r)),
          (this.meta = r == null ? void 0 : r.meta),
          (this.cacheTime = Math.max(
            this.cacheTime || 0,
            (i = this.options.cacheTime) != null ? i : 5 * 60 * 1e3
          ));
      }),
      (t.setDefaultOptions = function (r) {
        this.defaultOptions = r;
      }),
      (t.scheduleGc = function () {
        var r = this;
        this.clearGcTimeout(),
          El(this.cacheTime) &&
            (this.gcTimeout = setTimeout(function () {
              r.optionalRemove();
            }, this.cacheTime));
      }),
      (t.clearGcTimeout = function () {
        this.gcTimeout &&
          (clearTimeout(this.gcTimeout), (this.gcTimeout = void 0));
      }),
      (t.optionalRemove = function () {
        this.observers.length ||
          (this.state.isFetching
            ? this.hadObservers && this.scheduleGc()
            : this.cache.remove(this));
      }),
      (t.setData = function (r, i) {
        var o,
          s,
          a = this.state.data,
          u = aE(r, a);
        return (
          (o = (s = this.options).isDataEqual) != null && o.call(s, a, u)
            ? (u = a)
            : this.options.structuralSharing !== !1 && (u = Ps(a, u)),
          this.dispatch({
            data: u,
            type: "success",
            dataUpdatedAt: i == null ? void 0 : i.updatedAt,
          }),
          u
        );
      }),
      (t.setState = function (r, i) {
        this.dispatch({ type: "setState", state: r, setStateOptions: i });
      }),
      (t.cancel = function (r) {
        var i,
          o = this.promise;
        return (
          (i = this.retryer) == null || i.cancel(r),
          o ? o.then(xe).catch(xe) : Promise.resolve()
        );
      }),
      (t.destroy = function () {
        this.clearGcTimeout(), this.cancel({ silent: !0 });
      }),
      (t.reset = function () {
        this.destroy(), this.setState(this.initialState);
      }),
      (t.isActive = function () {
        return this.observers.some(function (r) {
          return r.options.enabled !== !1;
        });
      }),
      (t.isFetching = function () {
        return this.state.isFetching;
      }),
      (t.isStale = function () {
        return (
          this.state.isInvalidated ||
          !this.state.dataUpdatedAt ||
          this.observers.some(function (r) {
            return r.getCurrentResult().isStale;
          })
        );
      }),
      (t.isStaleByTime = function (r) {
        return (
          r === void 0 && (r = 0),
          this.state.isInvalidated ||
            !this.state.dataUpdatedAt ||
            !vy(this.state.dataUpdatedAt, r)
        );
      }),
      (t.onFocus = function () {
        var r,
          i = this.observers.find(function (o) {
            return o.shouldFetchOnWindowFocus();
          });
        i && i.refetch(), (r = this.retryer) == null || r.continue();
      }),
      (t.onOnline = function () {
        var r,
          i = this.observers.find(function (o) {
            return o.shouldFetchOnReconnect();
          });
        i && i.refetch(), (r = this.retryer) == null || r.continue();
      }),
      (t.addObserver = function (r) {
        this.observers.indexOf(r) === -1 &&
          (this.observers.push(r),
          (this.hadObservers = !0),
          this.clearGcTimeout(),
          this.cache.notify({
            type: "observerAdded",
            query: this,
            observer: r,
          }));
      }),
      (t.removeObserver = function (r) {
        this.observers.indexOf(r) !== -1 &&
          ((this.observers = this.observers.filter(function (i) {
            return i !== r;
          })),
          this.observers.length ||
            (this.retryer &&
              (this.retryer.isTransportCancelable || this.abortSignalConsumed
                ? this.retryer.cancel({ revert: !0 })
                : this.retryer.cancelRetry()),
            this.cacheTime ? this.scheduleGc() : this.cache.remove(this)),
          this.cache.notify({
            type: "observerRemoved",
            query: this,
            observer: r,
          }));
      }),
      (t.getObserversCount = function () {
        return this.observers.length;
      }),
      (t.invalidate = function () {
        this.state.isInvalidated || this.dispatch({ type: "invalidate" });
      }),
      (t.fetch = function (r, i) {
        var o = this,
          s,
          a,
          u;
        if (this.state.isFetching) {
          if (this.state.dataUpdatedAt && i != null && i.cancelRefetch)
            this.cancel({ silent: !0 });
          else if (this.promise) {
            var l;
            return (
              (l = this.retryer) == null || l.continueRetry(), this.promise
            );
          }
        }
        if ((r && this.setOptions(r), !this.options.queryFn)) {
          var c = this.observers.find(function (h) {
            return h.options.queryFn;
          });
          c && this.setOptions(c.options);
        }
        var f = Cs(this.queryKey),
          d = wy(),
          y = { queryKey: f, pageParam: void 0, meta: this.meta };
        Object.defineProperty(y, "signal", {
          enumerable: !0,
          get: function () {
            if (d) return (o.abortSignalConsumed = !0), d.signal;
          },
        });
        var p = function () {
            return o.options.queryFn
              ? ((o.abortSignalConsumed = !1), o.options.queryFn(y))
              : Promise.reject("Missing queryFn");
          },
          v = {
            fetchOptions: i,
            options: this.options,
            queryKey: f,
            state: this.state,
            fetchFn: p,
            meta: this.meta,
          };
        if ((s = this.options.behavior) != null && s.onFetch) {
          var C;
          (C = this.options.behavior) == null || C.onFetch(v);
        }
        if (
          ((this.revertState = this.state),
          !this.state.isFetching ||
            this.state.fetchMeta !==
              ((a = v.fetchOptions) == null ? void 0 : a.meta))
        ) {
          var m;
          this.dispatch({
            type: "fetch",
            meta: (m = v.fetchOptions) == null ? void 0 : m.meta,
          });
        }
        return (
          (this.retryer = new Ey({
            fn: v.fetchFn,
            abort: d == null || (u = d.abort) == null ? void 0 : u.bind(d),
            onSuccess: function (g) {
              o.setData(g),
                o.cache.config.onSuccess == null ||
                  o.cache.config.onSuccess(g, o),
                o.cacheTime === 0 && o.optionalRemove();
            },
            onError: function (g) {
              (Ro(g) && g.silent) || o.dispatch({ type: "error", error: g }),
                Ro(g) ||
                  (o.cache.config.onError == null ||
                    o.cache.config.onError(g, o),
                  ks().error(g)),
                o.cacheTime === 0 && o.optionalRemove();
            },
            onFail: function () {
              o.dispatch({ type: "failed" });
            },
            onPause: function () {
              o.dispatch({ type: "pause" });
            },
            onContinue: function () {
              o.dispatch({ type: "continue" });
            },
            retry: v.options.retry,
            retryDelay: v.options.retryDelay,
          })),
          (this.promise = this.retryer.promise),
          this.promise
        );
      }),
      (t.dispatch = function (r) {
        var i = this;
        (this.state = this.reducer(this.state, r)),
          ie.batch(function () {
            i.observers.forEach(function (o) {
              o.onQueryUpdate(r);
            }),
              i.cache.notify({ query: i, type: "queryUpdated", action: r });
          });
      }),
      (t.getDefaultState = function (r) {
        var i =
            typeof r.initialData == "function"
              ? r.initialData()
              : r.initialData,
          o = typeof r.initialData < "u",
          s = o
            ? typeof r.initialDataUpdatedAt == "function"
              ? r.initialDataUpdatedAt()
              : r.initialDataUpdatedAt
            : 0,
          a = typeof i < "u";
        return {
          data: i,
          dataUpdateCount: 0,
          dataUpdatedAt: a ? s ?? Date.now() : 0,
          error: null,
          errorUpdateCount: 0,
          errorUpdatedAt: 0,
          fetchFailureCount: 0,
          fetchMeta: null,
          isFetching: !1,
          isInvalidated: !1,
          isPaused: !1,
          status: a ? "success" : "idle",
        };
      }),
      (t.reducer = function (r, i) {
        var o, s;
        switch (i.type) {
          case "failed":
            return U({}, r, { fetchFailureCount: r.fetchFailureCount + 1 });
          case "pause":
            return U({}, r, { isPaused: !0 });
          case "continue":
            return U({}, r, { isPaused: !1 });
          case "fetch":
            return U(
              {},
              r,
              {
                fetchFailureCount: 0,
                fetchMeta: (o = i.meta) != null ? o : null,
                isFetching: !0,
                isPaused: !1,
              },
              !r.dataUpdatedAt && { error: null, status: "loading" }
            );
          case "success":
            return U({}, r, {
              data: i.data,
              dataUpdateCount: r.dataUpdateCount + 1,
              dataUpdatedAt: (s = i.dataUpdatedAt) != null ? s : Date.now(),
              error: null,
              fetchFailureCount: 0,
              isFetching: !1,
              isInvalidated: !1,
              isPaused: !1,
              status: "success",
            });
          case "error":
            var a = i.error;
            return Ro(a) && a.revert && this.revertState
              ? U({}, this.revertState)
              : U({}, r, {
                  error: a,
                  errorUpdateCount: r.errorUpdateCount + 1,
                  errorUpdatedAt: Date.now(),
                  fetchFailureCount: r.fetchFailureCount + 1,
                  isFetching: !1,
                  isPaused: !1,
                  status: "error",
                });
          case "invalidate":
            return U({}, r, { isInvalidated: !0 });
          case "setState":
            return U({}, r, i.state);
          default:
            return r;
        }
      }),
      e
    );
  })(),
  gE = (function (e) {
    Ui(t, e);
    function t(r) {
      var i;
      return (
        (i = e.call(this) || this),
        (i.config = r || {}),
        (i.queries = []),
        (i.queriesMap = {}),
        i
      );
    }
    var n = t.prototype;
    return (
      (n.build = function (i, o, s) {
        var a,
          u = o.queryKey,
          l = (a = o.queryHash) != null ? a : Jc(u, o),
          c = this.get(l);
        return (
          c ||
            ((c = new vE({
              cache: this,
              queryKey: u,
              queryHash: l,
              options: i.defaultQueryOptions(o),
              state: s,
              defaultOptions: i.getQueryDefaults(u),
              meta: o.meta,
            })),
            this.add(c)),
          c
        );
      }),
      (n.add = function (i) {
        this.queriesMap[i.queryHash] ||
          ((this.queriesMap[i.queryHash] = i),
          this.queries.push(i),
          this.notify({ type: "queryAdded", query: i }));
      }),
      (n.remove = function (i) {
        var o = this.queriesMap[i.queryHash];
        o &&
          (i.destroy(),
          (this.queries = this.queries.filter(function (s) {
            return s !== i;
          })),
          o === i && delete this.queriesMap[i.queryHash],
          this.notify({ type: "queryRemoved", query: i }));
      }),
      (n.clear = function () {
        var i = this;
        ie.batch(function () {
          i.queries.forEach(function (o) {
            i.remove(o);
          });
        });
      }),
      (n.get = function (i) {
        return this.queriesMap[i];
      }),
      (n.getAll = function () {
        return this.queries;
      }),
      (n.find = function (i, o) {
        var s = Qt(i, o),
          a = s[0];
        return (
          typeof a.exact > "u" && (a.exact = !0),
          this.queries.find(function (u) {
            return Jd(a, u);
          })
        );
      }),
      (n.findAll = function (i, o) {
        var s = Qt(i, o),
          a = s[0];
        return Object.keys(a).length > 0
          ? this.queries.filter(function (u) {
              return Jd(a, u);
            })
          : this.queries;
      }),
      (n.notify = function (i) {
        var o = this;
        ie.batch(function () {
          o.listeners.forEach(function (s) {
            s(i);
          });
        });
      }),
      (n.onFocus = function () {
        var i = this;
        ie.batch(function () {
          i.queries.forEach(function (o) {
            o.onFocus();
          });
        });
      }),
      (n.onOnline = function () {
        var i = this;
        ie.batch(function () {
          i.queries.forEach(function (o) {
            o.onOnline();
          });
        });
      }),
      t
    );
  })(Bi),
  wE = (function () {
    function e(n) {
      (this.options = U({}, n.defaultOptions, n.options)),
        (this.mutationId = n.mutationId),
        (this.mutationCache = n.mutationCache),
        (this.observers = []),
        (this.state = n.state || SE()),
        (this.meta = n.meta);
    }
    var t = e.prototype;
    return (
      (t.setState = function (r) {
        this.dispatch({ type: "setState", state: r });
      }),
      (t.addObserver = function (r) {
        this.observers.indexOf(r) === -1 && this.observers.push(r);
      }),
      (t.removeObserver = function (r) {
        this.observers = this.observers.filter(function (i) {
          return i !== r;
        });
      }),
      (t.cancel = function () {
        return this.retryer
          ? (this.retryer.cancel(), this.retryer.promise.then(xe).catch(xe))
          : Promise.resolve();
      }),
      (t.continue = function () {
        return this.retryer
          ? (this.retryer.continue(), this.retryer.promise)
          : this.execute();
      }),
      (t.execute = function () {
        var r = this,
          i,
          o = this.state.status === "loading",
          s = Promise.resolve();
        return (
          o ||
            (this.dispatch({
              type: "loading",
              variables: this.options.variables,
            }),
            (s = s
              .then(function () {
                r.mutationCache.config.onMutate == null ||
                  r.mutationCache.config.onMutate(r.state.variables, r);
              })
              .then(function () {
                return r.options.onMutate == null
                  ? void 0
                  : r.options.onMutate(r.state.variables);
              })
              .then(function (a) {
                a !== r.state.context &&
                  r.dispatch({
                    type: "loading",
                    context: a,
                    variables: r.state.variables,
                  });
              }))),
          s
            .then(function () {
              return r.executeMutation();
            })
            .then(function (a) {
              (i = a),
                r.mutationCache.config.onSuccess == null ||
                  r.mutationCache.config.onSuccess(
                    i,
                    r.state.variables,
                    r.state.context,
                    r
                  );
            })
            .then(function () {
              return r.options.onSuccess == null
                ? void 0
                : r.options.onSuccess(i, r.state.variables, r.state.context);
            })
            .then(function () {
              return r.options.onSettled == null
                ? void 0
                : r.options.onSettled(
                    i,
                    null,
                    r.state.variables,
                    r.state.context
                  );
            })
            .then(function () {
              return r.dispatch({ type: "success", data: i }), i;
            })
            .catch(function (a) {
              return (
                r.mutationCache.config.onError == null ||
                  r.mutationCache.config.onError(
                    a,
                    r.state.variables,
                    r.state.context,
                    r
                  ),
                ks().error(a),
                Promise.resolve()
                  .then(function () {
                    return r.options.onError == null
                      ? void 0
                      : r.options.onError(
                          a,
                          r.state.variables,
                          r.state.context
                        );
                  })
                  .then(function () {
                    return r.options.onSettled == null
                      ? void 0
                      : r.options.onSettled(
                          void 0,
                          a,
                          r.state.variables,
                          r.state.context
                        );
                  })
                  .then(function () {
                    throw (r.dispatch({ type: "error", error: a }), a);
                  })
              );
            })
        );
      }),
      (t.executeMutation = function () {
        var r = this,
          i;
        return (
          (this.retryer = new Ey({
            fn: function () {
              return r.options.mutationFn
                ? r.options.mutationFn(r.state.variables)
                : Promise.reject("No mutationFn found");
            },
            onFail: function () {
              r.dispatch({ type: "failed" });
            },
            onPause: function () {
              r.dispatch({ type: "pause" });
            },
            onContinue: function () {
              r.dispatch({ type: "continue" });
            },
            retry: (i = this.options.retry) != null ? i : 0,
            retryDelay: this.options.retryDelay,
          })),
          this.retryer.promise
        );
      }),
      (t.dispatch = function (r) {
        var i = this;
        (this.state = EE(this.state, r)),
          ie.batch(function () {
            i.observers.forEach(function (o) {
              o.onMutationUpdate(r);
            }),
              i.mutationCache.notify(i);
          });
      }),
      e
    );
  })();
function SE() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    isPaused: !1,
    status: "idle",
    variables: void 0,
  };
}
function EE(e, t) {
  switch (t.type) {
    case "failed":
      return U({}, e, { failureCount: e.failureCount + 1 });
    case "pause":
      return U({}, e, { isPaused: !0 });
    case "continue":
      return U({}, e, { isPaused: !1 });
    case "loading":
      return U({}, e, {
        context: t.context,
        data: void 0,
        error: null,
        isPaused: !1,
        status: "loading",
        variables: t.variables,
      });
    case "success":
      return U({}, e, {
        data: t.data,
        error: null,
        status: "success",
        isPaused: !1,
      });
    case "error":
      return U({}, e, {
        data: void 0,
        error: t.error,
        failureCount: e.failureCount + 1,
        isPaused: !1,
        status: "error",
      });
    case "setState":
      return U({}, e, t.state);
    default:
      return e;
  }
}
var CE = (function (e) {
  Ui(t, e);
  function t(r) {
    var i;
    return (
      (i = e.call(this) || this),
      (i.config = r || {}),
      (i.mutations = []),
      (i.mutationId = 0),
      i
    );
  }
  var n = t.prototype;
  return (
    (n.build = function (i, o, s) {
      var a = new wE({
        mutationCache: this,
        mutationId: ++this.mutationId,
        options: i.defaultMutationOptions(o),
        state: s,
        defaultOptions: o.mutationKey
          ? i.getMutationDefaults(o.mutationKey)
          : void 0,
        meta: o.meta,
      });
      return this.add(a), a;
    }),
    (n.add = function (i) {
      this.mutations.push(i), this.notify(i);
    }),
    (n.remove = function (i) {
      (this.mutations = this.mutations.filter(function (o) {
        return o !== i;
      })),
        i.cancel(),
        this.notify(i);
    }),
    (n.clear = function () {
      var i = this;
      ie.batch(function () {
        i.mutations.forEach(function (o) {
          i.remove(o);
        });
      });
    }),
    (n.getAll = function () {
      return this.mutations;
    }),
    (n.find = function (i) {
      return (
        typeof i.exact > "u" && (i.exact = !0),
        this.mutations.find(function (o) {
          return Xd(i, o);
        })
      );
    }),
    (n.findAll = function (i) {
      return this.mutations.filter(function (o) {
        return Xd(i, o);
      });
    }),
    (n.notify = function (i) {
      var o = this;
      ie.batch(function () {
        o.listeners.forEach(function (s) {
          s(i);
        });
      });
    }),
    (n.onFocus = function () {
      this.resumePausedMutations();
    }),
    (n.onOnline = function () {
      this.resumePausedMutations();
    }),
    (n.resumePausedMutations = function () {
      var i = this.mutations.filter(function (o) {
        return o.state.isPaused;
      });
      return ie.batch(function () {
        return i.reduce(function (o, s) {
          return o.then(function () {
            return s.continue().catch(xe);
          });
        }, Promise.resolve());
      });
    }),
    t
  );
})(Bi);
function OE() {
  return {
    onFetch: function (t) {
      t.fetchFn = function () {
        var n,
          r,
          i,
          o,
          s,
          a,
          u =
            (n = t.fetchOptions) == null || (r = n.meta) == null
              ? void 0
              : r.refetchPage,
          l =
            (i = t.fetchOptions) == null || (o = i.meta) == null
              ? void 0
              : o.fetchMore,
          c = l == null ? void 0 : l.pageParam,
          f = (l == null ? void 0 : l.direction) === "forward",
          d = (l == null ? void 0 : l.direction) === "backward",
          y = ((s = t.state.data) == null ? void 0 : s.pages) || [],
          p = ((a = t.state.data) == null ? void 0 : a.pageParams) || [],
          v = wy(),
          C = v == null ? void 0 : v.signal,
          m = p,
          h = !1,
          g =
            t.options.queryFn ||
            function () {
              return Promise.reject("Missing queryFn");
            },
          E = function (Ae, rt, ye, We) {
            return (
              (m = We ? [rt].concat(m) : [].concat(m, [rt])),
              We ? [ye].concat(Ae) : [].concat(Ae, [ye])
            );
          },
          x = function (Ae, rt, ye, We) {
            if (h) return Promise.reject("Cancelled");
            if (typeof ye > "u" && !rt && Ae.length) return Promise.resolve(Ae);
            var S = {
                queryKey: t.queryKey,
                signal: C,
                pageParam: ye,
                meta: t.meta,
              },
              _ = g(S),
              D = Promise.resolve(_).then(function (W) {
                return E(Ae, ye, W, We);
              });
            if (xs(_)) {
              var z = D;
              z.cancel = _.cancel;
            }
            return D;
          },
          k;
        if (!y.length) k = x([]);
        else if (f) {
          var T = typeof c < "u",
            A = T ? c : th(t.options, y);
          k = x(y, T, A);
        } else if (d) {
          var F = typeof c < "u",
            R = F ? c : PE(t.options, y);
          k = x(y, F, R, !0);
        } else
          (function () {
            m = [];
            var Ee = typeof t.options.getNextPageParam > "u",
              Ae = u && y[0] ? u(y[0], 0, y) : !0;
            k = Ae ? x([], Ee, p[0]) : Promise.resolve(E([], p[0], y[0]));
            for (
              var rt = function (S) {
                  k = k.then(function (_) {
                    var D = u && y[S] ? u(y[S], S, y) : !0;
                    if (D) {
                      var z = Ee ? p[S] : th(t.options, _);
                      return x(_, Ee, z);
                    }
                    return Promise.resolve(E(_, p[S], y[S]));
                  });
                },
                ye = 1;
              ye < y.length;
              ye++
            )
              rt(ye);
          })();
        var B = k.then(function (Ee) {
            return { pages: Ee, pageParams: m };
          }),
          Se = B;
        return (
          (Se.cancel = function () {
            (h = !0), v == null || v.abort(), xs(k) && k.cancel();
          }),
          B
        );
      };
    },
  };
}
function th(e, t) {
  return e.getNextPageParam == null
    ? void 0
    : e.getNextPageParam(t[t.length - 1], t);
}
function PE(e, t) {
  return e.getPreviousPageParam == null
    ? void 0
    : e.getPreviousPageParam(t[0], t);
}
var xE = (function () {
    function e(n) {
      n === void 0 && (n = {}),
        (this.queryCache = n.queryCache || new gE()),
        (this.mutationCache = n.mutationCache || new CE()),
        (this.defaultOptions = n.defaultOptions || {}),
        (this.queryDefaults = []),
        (this.mutationDefaults = []);
    }
    var t = e.prototype;
    return (
      (t.mount = function () {
        var r = this;
        (this.unsubscribeFocus = ui.subscribe(function () {
          ui.isFocused() &&
            To.isOnline() &&
            (r.mutationCache.onFocus(), r.queryCache.onFocus());
        })),
          (this.unsubscribeOnline = To.subscribe(function () {
            ui.isFocused() &&
              To.isOnline() &&
              (r.mutationCache.onOnline(), r.queryCache.onOnline());
          }));
      }),
      (t.unmount = function () {
        var r, i;
        (r = this.unsubscribeFocus) == null || r.call(this),
          (i = this.unsubscribeOnline) == null || i.call(this);
      }),
      (t.isFetching = function (r, i) {
        var o = Qt(r, i),
          s = o[0];
        return (s.fetching = !0), this.queryCache.findAll(s).length;
      }),
      (t.isMutating = function (r) {
        return this.mutationCache.findAll(U({}, r, { fetching: !0 })).length;
      }),
      (t.getQueryData = function (r, i) {
        var o;
        return (o = this.queryCache.find(r, i)) == null ? void 0 : o.state.data;
      }),
      (t.getQueriesData = function (r) {
        return this.getQueryCache()
          .findAll(r)
          .map(function (i) {
            var o = i.queryKey,
              s = i.state,
              a = s.data;
            return [o, a];
          });
      }),
      (t.setQueryData = function (r, i, o) {
        var s = _o(r),
          a = this.defaultQueryOptions(s);
        return this.queryCache.build(this, a).setData(i, o);
      }),
      (t.setQueriesData = function (r, i, o) {
        var s = this;
        return ie.batch(function () {
          return s
            .getQueryCache()
            .findAll(r)
            .map(function (a) {
              var u = a.queryKey;
              return [u, s.setQueryData(u, i, o)];
            });
        });
      }),
      (t.getQueryState = function (r, i) {
        var o;
        return (o = this.queryCache.find(r, i)) == null ? void 0 : o.state;
      }),
      (t.removeQueries = function (r, i) {
        var o = Qt(r, i),
          s = o[0],
          a = this.queryCache;
        ie.batch(function () {
          a.findAll(s).forEach(function (u) {
            a.remove(u);
          });
        });
      }),
      (t.resetQueries = function (r, i, o) {
        var s = this,
          a = Qt(r, i, o),
          u = a[0],
          l = a[1],
          c = this.queryCache,
          f = U({}, u, { active: !0 });
        return ie.batch(function () {
          return (
            c.findAll(u).forEach(function (d) {
              d.reset();
            }),
            s.refetchQueries(f, l)
          );
        });
      }),
      (t.cancelQueries = function (r, i, o) {
        var s = this,
          a = Qt(r, i, o),
          u = a[0],
          l = a[1],
          c = l === void 0 ? {} : l;
        typeof c.revert > "u" && (c.revert = !0);
        var f = ie.batch(function () {
          return s.queryCache.findAll(u).map(function (d) {
            return d.cancel(c);
          });
        });
        return Promise.all(f).then(xe).catch(xe);
      }),
      (t.invalidateQueries = function (r, i, o) {
        var s,
          a,
          u,
          l = this,
          c = Qt(r, i, o),
          f = c[0],
          d = c[1],
          y = U({}, f, {
            active:
              (s = (a = f.refetchActive) != null ? a : f.active) != null
                ? s
                : !0,
            inactive: (u = f.refetchInactive) != null ? u : !1,
          });
        return ie.batch(function () {
          return (
            l.queryCache.findAll(f).forEach(function (p) {
              p.invalidate();
            }),
            l.refetchQueries(y, d)
          );
        });
      }),
      (t.refetchQueries = function (r, i, o) {
        var s = this,
          a = Qt(r, i, o),
          u = a[0],
          l = a[1],
          c = ie.batch(function () {
            return s.queryCache.findAll(u).map(function (d) {
              return d.fetch(
                void 0,
                U({}, l, {
                  meta: { refetchPage: u == null ? void 0 : u.refetchPage },
                })
              );
            });
          }),
          f = Promise.all(c).then(xe);
        return (l != null && l.throwOnError) || (f = f.catch(xe)), f;
      }),
      (t.fetchQuery = function (r, i, o) {
        var s = _o(r, i, o),
          a = this.defaultQueryOptions(s);
        typeof a.retry > "u" && (a.retry = !1);
        var u = this.queryCache.build(this, a);
        return u.isStaleByTime(a.staleTime)
          ? u.fetch(a)
          : Promise.resolve(u.state.data);
      }),
      (t.prefetchQuery = function (r, i, o) {
        return this.fetchQuery(r, i, o).then(xe).catch(xe);
      }),
      (t.fetchInfiniteQuery = function (r, i, o) {
        var s = _o(r, i, o);
        return (s.behavior = OE()), this.fetchQuery(s);
      }),
      (t.prefetchInfiniteQuery = function (r, i, o) {
        return this.fetchInfiniteQuery(r, i, o).then(xe).catch(xe);
      }),
      (t.cancelMutations = function () {
        var r = this,
          i = ie.batch(function () {
            return r.mutationCache.getAll().map(function (o) {
              return o.cancel();
            });
          });
        return Promise.all(i).then(xe).catch(xe);
      }),
      (t.resumePausedMutations = function () {
        return this.getMutationCache().resumePausedMutations();
      }),
      (t.executeMutation = function (r) {
        return this.mutationCache.build(this, r).execute();
      }),
      (t.getQueryCache = function () {
        return this.queryCache;
      }),
      (t.getMutationCache = function () {
        return this.mutationCache;
      }),
      (t.getDefaultOptions = function () {
        return this.defaultOptions;
      }),
      (t.setDefaultOptions = function (r) {
        this.defaultOptions = r;
      }),
      (t.setQueryDefaults = function (r, i) {
        var o = this.queryDefaults.find(function (s) {
          return _n(r) === _n(s.queryKey);
        });
        o
          ? (o.defaultOptions = i)
          : this.queryDefaults.push({ queryKey: r, defaultOptions: i });
      }),
      (t.getQueryDefaults = function (r) {
        var i;
        return r
          ? (i = this.queryDefaults.find(function (o) {
              return Os(r, o.queryKey);
            })) == null
            ? void 0
            : i.defaultOptions
          : void 0;
      }),
      (t.setMutationDefaults = function (r, i) {
        var o = this.mutationDefaults.find(function (s) {
          return _n(r) === _n(s.mutationKey);
        });
        o
          ? (o.defaultOptions = i)
          : this.mutationDefaults.push({ mutationKey: r, defaultOptions: i });
      }),
      (t.getMutationDefaults = function (r) {
        var i;
        return r
          ? (i = this.mutationDefaults.find(function (o) {
              return Os(r, o.mutationKey);
            })) == null
            ? void 0
            : i.defaultOptions
          : void 0;
      }),
      (t.defaultQueryOptions = function (r) {
        if (r != null && r._defaulted) return r;
        var i = U(
          {},
          this.defaultOptions.queries,
          this.getQueryDefaults(r == null ? void 0 : r.queryKey),
          r,
          { _defaulted: !0 }
        );
        return (
          !i.queryHash && i.queryKey && (i.queryHash = Jc(i.queryKey, i)), i
        );
      }),
      (t.defaultQueryObserverOptions = function (r) {
        return this.defaultQueryOptions(r);
      }),
      (t.defaultMutationOptions = function (r) {
        return r != null && r._defaulted
          ? r
          : U(
              {},
              this.defaultOptions.mutations,
              this.getMutationDefaults(r == null ? void 0 : r.mutationKey),
              r,
              { _defaulted: !0 }
            );
      }),
      (t.clear = function () {
        this.queryCache.clear(), this.mutationCache.clear();
      }),
      e
    );
  })(),
  kE = (function (e) {
    Ui(t, e);
    function t(r, i) {
      var o;
      return (
        (o = e.call(this) || this),
        (o.client = r),
        (o.options = i),
        (o.trackedProps = []),
        (o.selectError = null),
        o.bindMethods(),
        o.setOptions(i),
        o
      );
    }
    var n = t.prototype;
    return (
      (n.bindMethods = function () {
        (this.remove = this.remove.bind(this)),
          (this.refetch = this.refetch.bind(this));
      }),
      (n.onSubscribe = function () {
        this.listeners.length === 1 &&
          (this.currentQuery.addObserver(this),
          nh(this.currentQuery, this.options) && this.executeFetch(),
          this.updateTimers());
      }),
      (n.onUnsubscribe = function () {
        this.listeners.length || this.destroy();
      }),
      (n.shouldFetchOnReconnect = function () {
        return Ol(
          this.currentQuery,
          this.options,
          this.options.refetchOnReconnect
        );
      }),
      (n.shouldFetchOnWindowFocus = function () {
        return Ol(
          this.currentQuery,
          this.options,
          this.options.refetchOnWindowFocus
        );
      }),
      (n.destroy = function () {
        (this.listeners = []),
          this.clearTimers(),
          this.currentQuery.removeObserver(this);
      }),
      (n.setOptions = function (i, o) {
        var s = this.options,
          a = this.currentQuery;
        if (
          ((this.options = this.client.defaultQueryObserverOptions(i)),
          typeof this.options.enabled < "u" &&
            typeof this.options.enabled != "boolean")
        )
          throw new Error("Expected enabled to be a boolean");
        this.options.queryKey || (this.options.queryKey = s.queryKey),
          this.updateQuery();
        var u = this.hasListeners();
        u && rh(this.currentQuery, a, this.options, s) && this.executeFetch(),
          this.updateResult(o),
          u &&
            (this.currentQuery !== a ||
              this.options.enabled !== s.enabled ||
              this.options.staleTime !== s.staleTime) &&
            this.updateStaleTimeout();
        var l = this.computeRefetchInterval();
        u &&
          (this.currentQuery !== a ||
            this.options.enabled !== s.enabled ||
            l !== this.currentRefetchInterval) &&
          this.updateRefetchInterval(l);
      }),
      (n.getOptimisticResult = function (i) {
        var o = this.client.defaultQueryObserverOptions(i),
          s = this.client.getQueryCache().build(this.client, o);
        return this.createResult(s, o);
      }),
      (n.getCurrentResult = function () {
        return this.currentResult;
      }),
      (n.trackResult = function (i, o) {
        var s = this,
          a = {},
          u = function (c) {
            s.trackedProps.includes(c) || s.trackedProps.push(c);
          };
        return (
          Object.keys(i).forEach(function (l) {
            Object.defineProperty(a, l, {
              configurable: !1,
              enumerable: !0,
              get: function () {
                return u(l), i[l];
              },
            });
          }),
          (o.useErrorBoundary || o.suspense) && u("error"),
          a
        );
      }),
      (n.getNextResult = function (i) {
        var o = this;
        return new Promise(function (s, a) {
          var u = o.subscribe(function (l) {
            l.isFetching ||
              (u(),
              l.isError && i != null && i.throwOnError ? a(l.error) : s(l));
          });
        });
      }),
      (n.getCurrentQuery = function () {
        return this.currentQuery;
      }),
      (n.remove = function () {
        this.client.getQueryCache().remove(this.currentQuery);
      }),
      (n.refetch = function (i) {
        return this.fetch(
          U({}, i, {
            meta: { refetchPage: i == null ? void 0 : i.refetchPage },
          })
        );
      }),
      (n.fetchOptimistic = function (i) {
        var o = this,
          s = this.client.defaultQueryObserverOptions(i),
          a = this.client.getQueryCache().build(this.client, s);
        return a.fetch().then(function () {
          return o.createResult(a, s);
        });
      }),
      (n.fetch = function (i) {
        var o = this;
        return this.executeFetch(i).then(function () {
          return o.updateResult(), o.currentResult;
        });
      }),
      (n.executeFetch = function (i) {
        this.updateQuery();
        var o = this.currentQuery.fetch(this.options, i);
        return (i != null && i.throwOnError) || (o = o.catch(xe)), o;
      }),
      (n.updateStaleTimeout = function () {
        var i = this;
        if (
          (this.clearStaleTimeout(),
          !(Es || this.currentResult.isStale || !El(this.options.staleTime)))
        ) {
          var o = vy(this.currentResult.dataUpdatedAt, this.options.staleTime),
            s = o + 1;
          this.staleTimeoutId = setTimeout(function () {
            i.currentResult.isStale || i.updateResult();
          }, s);
        }
      }),
      (n.computeRefetchInterval = function () {
        var i;
        return typeof this.options.refetchInterval == "function"
          ? this.options.refetchInterval(
              this.currentResult.data,
              this.currentQuery
            )
          : (i = this.options.refetchInterval) != null
          ? i
          : !1;
      }),
      (n.updateRefetchInterval = function (i) {
        var o = this;
        this.clearRefetchInterval(),
          (this.currentRefetchInterval = i),
          !(
            Es ||
            this.options.enabled === !1 ||
            !El(this.currentRefetchInterval) ||
            this.currentRefetchInterval === 0
          ) &&
            (this.refetchIntervalId = setInterval(function () {
              (o.options.refetchIntervalInBackground || ui.isFocused()) &&
                o.executeFetch();
            }, this.currentRefetchInterval));
      }),
      (n.updateTimers = function () {
        this.updateStaleTimeout(),
          this.updateRefetchInterval(this.computeRefetchInterval());
      }),
      (n.clearTimers = function () {
        this.clearStaleTimeout(), this.clearRefetchInterval();
      }),
      (n.clearStaleTimeout = function () {
        this.staleTimeoutId &&
          (clearTimeout(this.staleTimeoutId), (this.staleTimeoutId = void 0));
      }),
      (n.clearRefetchInterval = function () {
        this.refetchIntervalId &&
          (clearInterval(this.refetchIntervalId),
          (this.refetchIntervalId = void 0));
      }),
      (n.createResult = function (i, o) {
        var s = this.currentQuery,
          a = this.options,
          u = this.currentResult,
          l = this.currentResultState,
          c = this.currentResultOptions,
          f = i !== s,
          d = f ? i.state : this.currentQueryInitialState,
          y = f ? this.currentResult : this.previousQueryResult,
          p = i.state,
          v = p.dataUpdatedAt,
          C = p.error,
          m = p.errorUpdatedAt,
          h = p.isFetching,
          g = p.status,
          E = !1,
          x = !1,
          k;
        if (o.optimisticResults) {
          var T = this.hasListeners(),
            A = !T && nh(i, o),
            F = T && rh(i, s, o, a);
          (A || F) && ((h = !0), v || (g = "loading"));
        }
        if (
          o.keepPreviousData &&
          !p.dataUpdateCount &&
          y != null &&
          y.isSuccess &&
          g !== "error"
        )
          (k = y.data), (v = y.dataUpdatedAt), (g = y.status), (E = !0);
        else if (o.select && typeof p.data < "u")
          if (
            u &&
            p.data === (l == null ? void 0 : l.data) &&
            o.select === this.selectFn
          )
            k = this.selectResult;
          else
            try {
              (this.selectFn = o.select),
                (k = o.select(p.data)),
                o.structuralSharing !== !1 &&
                  (k = Ps(u == null ? void 0 : u.data, k)),
                (this.selectResult = k),
                (this.selectError = null);
            } catch (Se) {
              ks().error(Se), (this.selectError = Se);
            }
        else k = p.data;
        if (
          typeof o.placeholderData < "u" &&
          typeof k > "u" &&
          (g === "loading" || g === "idle")
        ) {
          var R;
          if (
            u != null &&
            u.isPlaceholderData &&
            o.placeholderData === (c == null ? void 0 : c.placeholderData)
          )
            R = u.data;
          else if (
            ((R =
              typeof o.placeholderData == "function"
                ? o.placeholderData()
                : o.placeholderData),
            o.select && typeof R < "u")
          )
            try {
              (R = o.select(R)),
                o.structuralSharing !== !1 &&
                  (R = Ps(u == null ? void 0 : u.data, R)),
                (this.selectError = null);
            } catch (Se) {
              ks().error(Se), (this.selectError = Se);
            }
          typeof R < "u" && ((g = "success"), (k = R), (x = !0));
        }
        this.selectError &&
          ((C = this.selectError),
          (k = this.selectResult),
          (m = Date.now()),
          (g = "error"));
        var B = {
          status: g,
          isLoading: g === "loading",
          isSuccess: g === "success",
          isError: g === "error",
          isIdle: g === "idle",
          data: k,
          dataUpdatedAt: v,
          error: C,
          errorUpdatedAt: m,
          failureCount: p.fetchFailureCount,
          errorUpdateCount: p.errorUpdateCount,
          isFetched: p.dataUpdateCount > 0 || p.errorUpdateCount > 0,
          isFetchedAfterMount:
            p.dataUpdateCount > d.dataUpdateCount ||
            p.errorUpdateCount > d.errorUpdateCount,
          isFetching: h,
          isRefetching: h && g !== "loading",
          isLoadingError: g === "error" && p.dataUpdatedAt === 0,
          isPlaceholderData: x,
          isPreviousData: E,
          isRefetchError: g === "error" && p.dataUpdatedAt !== 0,
          isStale: Xc(i, o),
          refetch: this.refetch,
          remove: this.remove,
        };
        return B;
      }),
      (n.shouldNotifyListeners = function (i, o) {
        if (!o) return !0;
        var s = this.options,
          a = s.notifyOnChangeProps,
          u = s.notifyOnChangePropsExclusions;
        if ((!a && !u) || (a === "tracked" && !this.trackedProps.length))
          return !0;
        var l = a === "tracked" ? this.trackedProps : a;
        return Object.keys(i).some(function (c) {
          var f = c,
            d = i[f] !== o[f],
            y =
              l == null
                ? void 0
                : l.some(function (v) {
                    return v === c;
                  }),
            p =
              u == null
                ? void 0
                : u.some(function (v) {
                    return v === c;
                  });
          return d && !p && (!l || y);
        });
      }),
      (n.updateResult = function (i) {
        var o = this.currentResult;
        if (
          ((this.currentResult = this.createResult(
            this.currentQuery,
            this.options
          )),
          (this.currentResultState = this.currentQuery.state),
          (this.currentResultOptions = this.options),
          !cE(this.currentResult, o))
        ) {
          var s = { cache: !0 };
          (i == null ? void 0 : i.listeners) !== !1 &&
            this.shouldNotifyListeners(this.currentResult, o) &&
            (s.listeners = !0),
            this.notify(U({}, s, i));
        }
      }),
      (n.updateQuery = function () {
        var i = this.client.getQueryCache().build(this.client, this.options);
        if (i !== this.currentQuery) {
          var o = this.currentQuery;
          (this.currentQuery = i),
            (this.currentQueryInitialState = i.state),
            (this.previousQueryResult = this.currentResult),
            this.hasListeners() &&
              (o == null || o.removeObserver(this), i.addObserver(this));
        }
      }),
      (n.onQueryUpdate = function (i) {
        var o = {};
        i.type === "success"
          ? (o.onSuccess = !0)
          : i.type === "error" && !Ro(i.error) && (o.onError = !0),
          this.updateResult(o),
          this.hasListeners() && this.updateTimers();
      }),
      (n.notify = function (i) {
        var o = this;
        ie.batch(function () {
          i.onSuccess
            ? (o.options.onSuccess == null ||
                o.options.onSuccess(o.currentResult.data),
              o.options.onSettled == null ||
                o.options.onSettled(o.currentResult.data, null))
            : i.onError &&
              (o.options.onError == null ||
                o.options.onError(o.currentResult.error),
              o.options.onSettled == null ||
                o.options.onSettled(void 0, o.currentResult.error)),
            i.listeners &&
              o.listeners.forEach(function (s) {
                s(o.currentResult);
              }),
            i.cache &&
              o.client
                .getQueryCache()
                .notify({
                  query: o.currentQuery,
                  type: "observerResultsUpdated",
                });
        });
      }),
      t
    );
  })(Bi);
function bE(e, t) {
  return (
    t.enabled !== !1 &&
    !e.state.dataUpdatedAt &&
    !(e.state.status === "error" && t.retryOnMount === !1)
  );
}
function nh(e, t) {
  return bE(e, t) || (e.state.dataUpdatedAt > 0 && Ol(e, t, t.refetchOnMount));
}
function Ol(e, t, n) {
  if (t.enabled !== !1) {
    var r = typeof n == "function" ? n(e) : n;
    return r === "always" || (r !== !1 && Xc(e, t));
  }
  return !1;
}
function rh(e, t, n, r) {
  return (
    n.enabled !== !1 &&
    (e !== t || r.enabled === !1) &&
    (!n.suspense || e.state.status !== "error") &&
    Xc(e, n)
  );
}
function Xc(e, t) {
  return e.isStaleByTime(t.staleTime);
}
var _E = Mm.unstable_batchedUpdates;
ie.setBatchNotifyFunction(_E);
var TE = console;
yE(TE);
var ih = ee.createContext(void 0),
  Oy = ee.createContext(!1);
function Py(e) {
  return e && typeof window < "u"
    ? (window.ReactQueryClientContext || (window.ReactQueryClientContext = ih),
      window.ReactQueryClientContext)
    : ih;
}
var Zc = function () {
    var t = ee.useContext(Py(ee.useContext(Oy)));
    if (!t)
      throw new Error("No QueryClient set, use QueryClientProvider to set one");
    return t;
  },
  RE = function (t) {
    var n = t.client,
      r = t.contextSharing,
      i = r === void 0 ? !1 : r,
      o = t.children;
    ee.useEffect(
      function () {
        return (
          n.mount(),
          function () {
            n.unmount();
          }
        );
      },
      [n]
    );
    var s = Py(i);
    return ee.createElement(
      Oy.Provider,
      { value: i },
      ee.createElement(s.Provider, { value: n }, o)
    );
  };
function NE() {
  var e = !1;
  return {
    clearReset: function () {
      e = !1;
    },
    reset: function () {
      e = !0;
    },
    isReset: function () {
      return e;
    },
  };
}
var AE = ee.createContext(NE()),
  $E = function () {
    return ee.useContext(AE);
  };
function DE(e, t, n) {
  return typeof t == "function"
    ? t.apply(void 0, n)
    : typeof t == "boolean"
    ? t
    : !!e;
}
function FE(e, t) {
  var n = ee.useRef(!1),
    r = ee.useState(0),
    i = r[1],
    o = Zc(),
    s = $E(),
    a = o.defaultQueryObserverOptions(e);
  (a.optimisticResults = !0),
    a.onError && (a.onError = ie.batchCalls(a.onError)),
    a.onSuccess && (a.onSuccess = ie.batchCalls(a.onSuccess)),
    a.onSettled && (a.onSettled = ie.batchCalls(a.onSettled)),
    a.suspense &&
      (typeof a.staleTime != "number" && (a.staleTime = 1e3),
      a.cacheTime === 0 && (a.cacheTime = 1)),
    (a.suspense || a.useErrorBoundary) &&
      (s.isReset() || (a.retryOnMount = !1));
  var u = ee.useState(function () {
      return new t(o, a);
    }),
    l = u[0],
    c = l.getOptimisticResult(a);
  if (
    (ee.useEffect(
      function () {
        (n.current = !0), s.clearReset();
        var f = l.subscribe(
          ie.batchCalls(function () {
            n.current &&
              i(function (d) {
                return d + 1;
              });
          })
        );
        return (
          l.updateResult(),
          function () {
            (n.current = !1), f();
          }
        );
      },
      [s, l]
    ),
    ee.useEffect(
      function () {
        l.setOptions(a, { listeners: !1 });
      },
      [a, l]
    ),
    a.suspense && c.isLoading)
  )
    throw l
      .fetchOptimistic(a)
      .then(function (f) {
        var d = f.data;
        a.onSuccess == null || a.onSuccess(d),
          a.onSettled == null || a.onSettled(d, null);
      })
      .catch(function (f) {
        s.clearReset(),
          a.onError == null || a.onError(f),
          a.onSettled == null || a.onSettled(void 0, f);
      });
  if (
    c.isError &&
    !s.isReset() &&
    !c.isFetching &&
    DE(a.suspense, a.useErrorBoundary, [c.error, l.getCurrentQuery()])
  )
    throw c.error;
  return a.notifyOnChangeProps === "tracked" && (c = l.trackResult(c, a)), c;
}
function bs(e, t, n) {
  var r = _o(e, t, n);
  return FE(r, kE);
}
function xy(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: ky } = Object.prototype,
  { getPrototypeOf: ef } = Object,
  tf = ((e) => (t) => {
    const n = ky.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  jt = (e) => ((e = e.toLowerCase()), (t) => tf(t) === e),
  ga = (e) => (t) => typeof t === e,
  { isArray: Ar } = Array,
  $i = ga("undefined");
function LE(e) {
  return (
    e !== null &&
    !$i(e) &&
    e.constructor !== null &&
    !$i(e.constructor) &&
    yn(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const by = jt("ArrayBuffer");
function IE(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && by(e.buffer)),
    t
  );
}
const ME = ga("string"),
  yn = ga("function"),
  _y = ga("number"),
  nf = (e) => e !== null && typeof e == "object",
  jE = (e) => e === !0 || e === !1,
  No = (e) => {
    if (tf(e) !== "object") return !1;
    const t = ef(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Symbol.toStringTag in e) &&
      !(Symbol.iterator in e)
    );
  },
  UE = jt("Date"),
  BE = jt("File"),
  zE = jt("Blob"),
  VE = jt("FileList"),
  QE = (e) => nf(e) && yn(e.pipe),
  qE = (e) => {
    const t = "[object FormData]";
    return (
      e &&
      ((typeof FormData == "function" && e instanceof FormData) ||
        ky.call(e) === t ||
        (yn(e.toString) && e.toString() === t))
    );
  },
  HE = jt("URLSearchParams"),
  WE = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function zi(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let r, i;
  if ((typeof e != "object" && (e = [e]), Ar(e)))
    for (r = 0, i = e.length; r < i; r++) t.call(null, e[r], r, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      s = o.length;
    let a;
    for (r = 0; r < s; r++) (a = o[r]), t.call(null, e[a], a, e);
  }
}
function Ty(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length,
    i;
  for (; r-- > 0; ) if (((i = n[r]), t === i.toLowerCase())) return i;
  return null;
}
const Ry = (() =>
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : global)(),
  Ny = (e) => !$i(e) && e !== Ry;
function Pl() {
  const { caseless: e } = (Ny(this) && this) || {},
    t = {},
    n = (r, i) => {
      const o = (e && Ty(t, i)) || i;
      No(t[o]) && No(r)
        ? (t[o] = Pl(t[o], r))
        : No(r)
        ? (t[o] = Pl({}, r))
        : Ar(r)
        ? (t[o] = r.slice())
        : (t[o] = r);
    };
  for (let r = 0, i = arguments.length; r < i; r++)
    arguments[r] && zi(arguments[r], n);
  return t;
}
const KE = (e, t, n, { allOwnKeys: r } = {}) => (
    zi(
      t,
      (i, o) => {
        n && yn(i) ? (e[o] = xy(i, n)) : (e[o] = i);
      },
      { allOwnKeys: r }
    ),
    e
  ),
  GE = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  YE = (e, t, n, r) => {
    (e.prototype = Object.create(t.prototype, r)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, "super", { value: t.prototype }),
      n && Object.assign(e.prototype, n);
  },
  JE = (e, t, n, r) => {
    let i, o, s;
    const a = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (i = Object.getOwnPropertyNames(e), o = i.length; o-- > 0; )
        (s = i[o]), (!r || r(s, e, t)) && !a[s] && ((t[s] = e[s]), (a[s] = !0));
      e = n !== !1 && ef(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  XE = (e, t, n) => {
    (e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length);
    const r = e.indexOf(t, n);
    return r !== -1 && r === n;
  },
  ZE = (e) => {
    if (!e) return null;
    if (Ar(e)) return e;
    let t = e.length;
    if (!_y(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  eC = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && ef(Uint8Array)),
  tC = (e, t) => {
    const r = (e && e[Symbol.iterator]).call(e);
    let i;
    for (; (i = r.next()) && !i.done; ) {
      const o = i.value;
      t.call(e, o[0], o[1]);
    }
  },
  nC = (e, t) => {
    let n;
    const r = [];
    for (; (n = e.exec(t)) !== null; ) r.push(n);
    return r;
  },
  rC = jt("HTMLFormElement"),
  iC = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, i) {
      return r.toUpperCase() + i;
    }),
  oh = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  oC = jt("RegExp"),
  Ay = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {};
    zi(n, (i, o) => {
      t(i, o, e) !== !1 && (r[o] = i);
    }),
      Object.defineProperties(e, r);
  },
  sC = (e) => {
    Ay(e, (t, n) => {
      if (yn(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
        return !1;
      const r = e[n];
      if (yn(r)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  aC = (e, t) => {
    const n = {},
      r = (i) => {
        i.forEach((o) => {
          n[o] = !0;
        });
      };
    return Ar(e) ? r(e) : r(String(e).split(t)), n;
  },
  uC = () => {},
  lC = (e, t) => ((e = +e), Number.isFinite(e) ? e : t),
  au = "abcdefghijklmnopqrstuvwxyz",
  sh = "0123456789",
  $y = { DIGIT: sh, ALPHA: au, ALPHA_DIGIT: au + au.toUpperCase() + sh },
  cC = (e = 16, t = $y.ALPHA_DIGIT) => {
    let n = "";
    const { length: r } = t;
    for (; e--; ) n += t[(Math.random() * r) | 0];
    return n;
  };
function fC(e) {
  return !!(
    e &&
    yn(e.append) &&
    e[Symbol.toStringTag] === "FormData" &&
    e[Symbol.iterator]
  );
}
const dC = (e) => {
    const t = new Array(10),
      n = (r, i) => {
        if (nf(r)) {
          if (t.indexOf(r) >= 0) return;
          if (!("toJSON" in r)) {
            t[i] = r;
            const o = Ar(r) ? [] : {};
            return (
              zi(r, (s, a) => {
                const u = n(s, i + 1);
                !$i(u) && (o[a] = u);
              }),
              (t[i] = void 0),
              o
            );
          }
        }
        return r;
      };
    return n(e, 0);
  },
  P = {
    isArray: Ar,
    isArrayBuffer: by,
    isBuffer: LE,
    isFormData: qE,
    isArrayBufferView: IE,
    isString: ME,
    isNumber: _y,
    isBoolean: jE,
    isObject: nf,
    isPlainObject: No,
    isUndefined: $i,
    isDate: UE,
    isFile: BE,
    isBlob: zE,
    isRegExp: oC,
    isFunction: yn,
    isStream: QE,
    isURLSearchParams: HE,
    isTypedArray: eC,
    isFileList: VE,
    forEach: zi,
    merge: Pl,
    extend: KE,
    trim: WE,
    stripBOM: GE,
    inherits: YE,
    toFlatObject: JE,
    kindOf: tf,
    kindOfTest: jt,
    endsWith: XE,
    toArray: ZE,
    forEachEntry: tC,
    matchAll: nC,
    isHTMLForm: rC,
    hasOwnProperty: oh,
    hasOwnProp: oh,
    reduceDescriptors: Ay,
    freezeMethods: sC,
    toObjectSet: aC,
    toCamelCase: iC,
    noop: uC,
    toFiniteNumber: lC,
    findKey: Ty,
    global: Ry,
    isContextDefined: Ny,
    ALPHABET: $y,
    generateString: cC,
    isSpecCompliantForm: fC,
    toJSONObject: dC,
  };
function M(e, t, n, r, i) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = "AxiosError"),
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    i && (this.response = i);
}
P.inherits(M, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: P.toJSONObject(this.config),
      code: this.code,
      status:
        this.response && this.response.status ? this.response.status : null,
    };
  },
});
const Dy = M.prototype,
  Fy = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((e) => {
  Fy[e] = { value: e };
});
Object.defineProperties(M, Fy);
Object.defineProperty(Dy, "isAxiosError", { value: !0 });
M.from = (e, t, n, r, i, o) => {
  const s = Object.create(Dy);
  return (
    P.toFlatObject(
      e,
      s,
      function (u) {
        return u !== Error.prototype;
      },
      (a) => a !== "isAxiosError"
    ),
    M.call(s, e.message, t, n, r, i),
    (s.cause = e),
    (s.name = e.name),
    o && Object.assign(s, o),
    s
  );
};
const hC = null;
function xl(e) {
  return P.isPlainObject(e) || P.isArray(e);
}
function Ly(e) {
  return P.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function ah(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (i, o) {
          return (i = Ly(i)), !n && o ? "[" + i + "]" : i;
        })
        .join(n ? "." : "")
    : t;
}
function pC(e) {
  return P.isArray(e) && !e.some(xl);
}
const mC = P.toFlatObject(P, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function wa(e, t, n) {
  if (!P.isObject(e)) throw new TypeError("target must be an object");
  (t = t || new FormData()),
    (n = P.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (v, C) {
        return !P.isUndefined(C[v]);
      }
    ));
  const r = n.metaTokens,
    i = n.visitor || c,
    o = n.dots,
    s = n.indexes,
    u = (n.Blob || (typeof Blob < "u" && Blob)) && P.isSpecCompliantForm(t);
  if (!P.isFunction(i)) throw new TypeError("visitor must be a function");
  function l(p) {
    if (p === null) return "";
    if (P.isDate(p)) return p.toISOString();
    if (!u && P.isBlob(p))
      throw new M("Blob is not supported. Use a Buffer instead.");
    return P.isArrayBuffer(p) || P.isTypedArray(p)
      ? u && typeof Blob == "function"
        ? new Blob([p])
        : Buffer.from(p)
      : p;
  }
  function c(p, v, C) {
    let m = p;
    if (p && !C && typeof p == "object") {
      if (P.endsWith(v, "{}"))
        (v = r ? v : v.slice(0, -2)), (p = JSON.stringify(p));
      else if (
        (P.isArray(p) && pC(p)) ||
        ((P.isFileList(p) || P.endsWith(v, "[]")) && (m = P.toArray(p)))
      )
        return (
          (v = Ly(v)),
          m.forEach(function (g, E) {
            !(P.isUndefined(g) || g === null) &&
              t.append(
                s === !0 ? ah([v], E, o) : s === null ? v : v + "[]",
                l(g)
              );
          }),
          !1
        );
    }
    return xl(p) ? !0 : (t.append(ah(C, v, o), l(p)), !1);
  }
  const f = [],
    d = Object.assign(mC, {
      defaultVisitor: c,
      convertValue: l,
      isVisitable: xl,
    });
  function y(p, v) {
    if (!P.isUndefined(p)) {
      if (f.indexOf(p) !== -1)
        throw Error("Circular reference detected in " + v.join("."));
      f.push(p),
        P.forEach(p, function (m, h) {
          (!(P.isUndefined(m) || m === null) &&
            i.call(t, m, P.isString(h) ? h.trim() : h, v, d)) === !0 &&
            y(m, v ? v.concat(h) : [h]);
        }),
        f.pop();
    }
  }
  if (!P.isObject(e)) throw new TypeError("data must be an object");
  return y(e), t;
}
function uh(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
    return t[r];
  });
}
function rf(e, t) {
  (this._pairs = []), e && wa(e, this, t);
}
const Iy = rf.prototype;
Iy.append = function (t, n) {
  this._pairs.push([t, n]);
};
Iy.toString = function (t) {
  const n = t
    ? function (r) {
        return t.call(this, r, uh);
      }
    : uh;
  return this._pairs
    .map(function (i) {
      return n(i[0]) + "=" + n(i[1]);
    }, "")
    .join("&");
};
function yC(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function My(e, t, n) {
  if (!t) return e;
  const r = (n && n.encode) || yC,
    i = n && n.serialize;
  let o;
  if (
    (i
      ? (o = i(t, n))
      : (o = P.isURLSearchParams(t) ? t.toString() : new rf(t, n).toString(r)),
    o)
  ) {
    const s = e.indexOf("#");
    s !== -1 && (e = e.slice(0, s)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + o);
  }
  return e;
}
class vC {
  constructor() {
    this.handlers = [];
  }
  use(t, n, r) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    P.forEach(this.handlers, function (r) {
      r !== null && t(r);
    });
  }
}
const lh = vC,
  jy = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  gC = typeof URLSearchParams < "u" ? URLSearchParams : rf,
  wC = typeof FormData < "u" ? FormData : null,
  SC = typeof Blob < "u" ? Blob : null,
  EC = (() => {
    let e;
    return typeof navigator < "u" &&
      ((e = navigator.product) === "ReactNative" ||
        e === "NativeScript" ||
        e === "NS")
      ? !1
      : typeof window < "u" && typeof document < "u";
  })(),
  CC = (() =>
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function")(),
  gt = {
    isBrowser: !0,
    classes: { URLSearchParams: gC, FormData: wC, Blob: SC },
    isStandardBrowserEnv: EC,
    isStandardBrowserWebWorkerEnv: CC,
    protocols: ["http", "https", "file", "blob", "url", "data"],
  };
function OC(e, t) {
  return wa(
    e,
    new gt.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (n, r, i, o) {
          return gt.isNode && P.isBuffer(n)
            ? (this.append(r, n.toString("base64")), !1)
            : o.defaultVisitor.apply(this, arguments);
        },
      },
      t
    )
  );
}
function PC(e) {
  return P.matchAll(/\w+|\[(\w*)]/g, e).map((t) =>
    t[0] === "[]" ? "" : t[1] || t[0]
  );
}
function xC(e) {
  const t = {},
    n = Object.keys(e);
  let r;
  const i = n.length;
  let o;
  for (r = 0; r < i; r++) (o = n[r]), (t[o] = e[o]);
  return t;
}
function Uy(e) {
  function t(n, r, i, o) {
    let s = n[o++];
    const a = Number.isFinite(+s),
      u = o >= n.length;
    return (
      (s = !s && P.isArray(i) ? i.length : s),
      u
        ? (P.hasOwnProp(i, s) ? (i[s] = [i[s], r]) : (i[s] = r), !a)
        : ((!i[s] || !P.isObject(i[s])) && (i[s] = []),
          t(n, r, i[s], o) && P.isArray(i[s]) && (i[s] = xC(i[s])),
          !a)
    );
  }
  if (P.isFormData(e) && P.isFunction(e.entries)) {
    const n = {};
    return (
      P.forEachEntry(e, (r, i) => {
        t(PC(r), i, n, 0);
      }),
      n
    );
  }
  return null;
}
const kC = { "Content-Type": void 0 };
function bC(e, t, n) {
  if (P.isString(e))
    try {
      return (t || JSON.parse)(e), P.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError") throw r;
    }
  return (n || JSON.stringify)(e);
}
const Sa = {
  transitional: jy,
  adapter: ["xhr", "http"],
  transformRequest: [
    function (t, n) {
      const r = n.getContentType() || "",
        i = r.indexOf("application/json") > -1,
        o = P.isObject(t);
      if ((o && P.isHTMLForm(t) && (t = new FormData(t)), P.isFormData(t)))
        return i && i ? JSON.stringify(Uy(t)) : t;
      if (
        P.isArrayBuffer(t) ||
        P.isBuffer(t) ||
        P.isStream(t) ||
        P.isFile(t) ||
        P.isBlob(t)
      )
        return t;
      if (P.isArrayBufferView(t)) return t.buffer;
      if (P.isURLSearchParams(t))
        return (
          n.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          t.toString()
        );
      let a;
      if (o) {
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return OC(t, this.formSerializer).toString();
        if ((a = P.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
          const u = this.env && this.env.FormData;
          return wa(
            a ? { "files[]": t } : t,
            u && new u(),
            this.formSerializer
          );
        }
      }
      return o || i ? (n.setContentType("application/json", !1), bC(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || Sa.transitional,
        r = n && n.forcedJSONParsing,
        i = this.responseType === "json";
      if (t && P.isString(t) && ((r && !this.responseType) || i)) {
        const s = !(n && n.silentJSONParsing) && i;
        try {
          return JSON.parse(t);
        } catch (a) {
          if (s)
            throw a.name === "SyntaxError"
              ? M.from(a, M.ERR_BAD_RESPONSE, this, null, this.response)
              : a;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: gt.classes.FormData, Blob: gt.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: { common: { Accept: "application/json, text/plain, */*" } },
};
P.forEach(["delete", "get", "head"], function (t) {
  Sa.headers[t] = {};
});
P.forEach(["post", "put", "patch"], function (t) {
  Sa.headers[t] = P.merge(kC);
});
const of = Sa,
  _C = P.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  TC = (e) => {
    const t = {};
    let n, r, i;
    return (
      e &&
        e
          .split(
            `
`
          )
          .forEach(function (s) {
            (i = s.indexOf(":")),
              (n = s.substring(0, i).trim().toLowerCase()),
              (r = s.substring(i + 1).trim()),
              !(!n || (t[n] && _C[n])) &&
                (n === "set-cookie"
                  ? t[n]
                    ? t[n].push(r)
                    : (t[n] = [r])
                  : (t[n] = t[n] ? t[n] + ", " + r : r));
          }),
      t
    );
  },
  ch = Symbol("internals");
function zr(e) {
  return e && String(e).trim().toLowerCase();
}
function Ao(e) {
  return e === !1 || e == null ? e : P.isArray(e) ? e.map(Ao) : String(e);
}
function RC(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = n.exec(e)); ) t[r[1]] = r[2];
  return t;
}
function NC(e) {
  return /^[-_a-zA-Z]+$/.test(e.trim());
}
function uu(e, t, n, r, i) {
  if (P.isFunction(r)) return r.call(this, t, n);
  if ((i && (t = n), !!P.isString(t))) {
    if (P.isString(r)) return t.indexOf(r) !== -1;
    if (P.isRegExp(r)) return r.test(t);
  }
}
function AC(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function $C(e, t) {
  const n = P.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function (i, o, s) {
        return this[r].call(this, t, i, o, s);
      },
      configurable: !0,
    });
  });
}
class Ea {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const i = this;
    function o(a, u, l) {
      const c = zr(u);
      if (!c) throw new Error("header name must be a non-empty string");
      const f = P.findKey(i, c);
      (!f || i[f] === void 0 || l === !0 || (l === void 0 && i[f] !== !1)) &&
        (i[f || u] = Ao(a));
    }
    const s = (a, u) => P.forEach(a, (l, c) => o(l, c, u));
    return (
      P.isPlainObject(t) || t instanceof this.constructor
        ? s(t, n)
        : P.isString(t) && (t = t.trim()) && !NC(t)
        ? s(TC(t), n)
        : t != null && o(n, t, r),
      this
    );
  }
  get(t, n) {
    if (((t = zr(t)), t)) {
      const r = P.findKey(this, t);
      if (r) {
        const i = this[r];
        if (!n) return i;
        if (n === !0) return RC(i);
        if (P.isFunction(n)) return n.call(this, i, r);
        if (P.isRegExp(n)) return n.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (((t = zr(t)), t)) {
      const r = P.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || uu(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let i = !1;
    function o(s) {
      if (((s = zr(s)), s)) {
        const a = P.findKey(r, s);
        a && (!n || uu(r, r[a], a, n)) && (delete r[a], (i = !0));
      }
    }
    return P.isArray(t) ? t.forEach(o) : o(t), i;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length,
      i = !1;
    for (; r--; ) {
      const o = n[r];
      (!t || uu(this, this[o], o, t, !0)) && (delete this[o], (i = !0));
    }
    return i;
  }
  normalize(t) {
    const n = this,
      r = {};
    return (
      P.forEach(this, (i, o) => {
        const s = P.findKey(r, o);
        if (s) {
          (n[s] = Ao(i)), delete n[o];
          return;
        }
        const a = t ? AC(o) : String(o).trim();
        a !== o && delete n[o], (n[a] = Ao(i)), (r[a] = !0);
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = Object.create(null);
    return (
      P.forEach(this, (r, i) => {
        r != null && r !== !1 && (n[i] = t && P.isArray(r) ? r.join(", ") : r);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((i) => r.set(i)), r;
  }
  static accessor(t) {
    const r = (this[ch] = this[ch] = { accessors: {} }).accessors,
      i = this.prototype;
    function o(s) {
      const a = zr(s);
      r[a] || ($C(i, s), (r[a] = !0));
    }
    return P.isArray(t) ? t.forEach(o) : o(t), this;
  }
}
Ea.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
P.freezeMethods(Ea.prototype);
P.freezeMethods(Ea);
const Nt = Ea;
function lu(e, t) {
  const n = this || of,
    r = t || n,
    i = Nt.from(r.headers);
  let o = r.data;
  return (
    P.forEach(e, function (a) {
      o = a.call(n, o, i.normalize(), t ? t.status : void 0);
    }),
    i.normalize(),
    o
  );
}
function By(e) {
  return !!(e && e.__CANCEL__);
}
function Vi(e, t, n) {
  M.call(this, e ?? "canceled", M.ERR_CANCELED, t, n),
    (this.name = "CanceledError");
}
P.inherits(Vi, M, { __CANCEL__: !0 });
function DC(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new M(
          "Request failed with status code " + n.status,
          [M.ERR_BAD_REQUEST, M.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n
        )
      );
}
const FC = gt.isStandardBrowserEnv
  ? (function () {
      return {
        write: function (n, r, i, o, s, a) {
          const u = [];
          u.push(n + "=" + encodeURIComponent(r)),
            P.isNumber(i) && u.push("expires=" + new Date(i).toGMTString()),
            P.isString(o) && u.push("path=" + o),
            P.isString(s) && u.push("domain=" + s),
            a === !0 && u.push("secure"),
            (document.cookie = u.join("; "));
        },
        read: function (n) {
          const r = document.cookie.match(
            new RegExp("(^|;\\s*)(" + n + ")=([^;]*)")
          );
          return r ? decodeURIComponent(r[3]) : null;
        },
        remove: function (n) {
          this.write(n, "", Date.now() - 864e5);
        },
      };
    })()
  : (function () {
      return {
        write: function () {},
        read: function () {
          return null;
        },
        remove: function () {},
      };
    })();
function LC(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function IC(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function zy(e, t) {
  return e && !LC(t) ? IC(e, t) : t;
}
const MC = gt.isStandardBrowserEnv
  ? (function () {
      const t = /(msie|trident)/i.test(navigator.userAgent),
        n = document.createElement("a");
      let r;
      function i(o) {
        let s = o;
        return (
          t && (n.setAttribute("href", s), (s = n.href)),
          n.setAttribute("href", s),
          {
            href: n.href,
            protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
            host: n.host,
            search: n.search ? n.search.replace(/^\?/, "") : "",
            hash: n.hash ? n.hash.replace(/^#/, "") : "",
            hostname: n.hostname,
            port: n.port,
            pathname:
              n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname,
          }
        );
      }
      return (
        (r = i(window.location.href)),
        function (s) {
          const a = P.isString(s) ? i(s) : s;
          return a.protocol === r.protocol && a.host === r.host;
        }
      );
    })()
  : (function () {
      return function () {
        return !0;
      };
    })();
function jC(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
function UC(e, t) {
  e = e || 10;
  const n = new Array(e),
    r = new Array(e);
  let i = 0,
    o = 0,
    s;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (u) {
      const l = Date.now(),
        c = r[o];
      s || (s = l), (n[i] = u), (r[i] = l);
      let f = o,
        d = 0;
      for (; f !== i; ) (d += n[f++]), (f = f % e);
      if (((i = (i + 1) % e), i === o && (o = (o + 1) % e), l - s < t)) return;
      const y = c && l - c;
      return y ? Math.round((d * 1e3) / y) : void 0;
    }
  );
}
function fh(e, t) {
  let n = 0;
  const r = UC(50, 250);
  return (i) => {
    const o = i.loaded,
      s = i.lengthComputable ? i.total : void 0,
      a = o - n,
      u = r(a),
      l = o <= s;
    n = o;
    const c = {
      loaded: o,
      total: s,
      progress: s ? o / s : void 0,
      bytes: a,
      rate: u || void 0,
      estimated: u && s && l ? (s - o) / u : void 0,
      event: i,
    };
    (c[t ? "download" : "upload"] = !0), e(c);
  };
}
const BC = typeof XMLHttpRequest < "u",
  zC =
    BC &&
    function (e) {
      return new Promise(function (n, r) {
        let i = e.data;
        const o = Nt.from(e.headers).normalize(),
          s = e.responseType;
        let a;
        function u() {
          e.cancelToken && e.cancelToken.unsubscribe(a),
            e.signal && e.signal.removeEventListener("abort", a);
        }
        P.isFormData(i) &&
          (gt.isStandardBrowserEnv || gt.isStandardBrowserWebWorkerEnv) &&
          o.setContentType(!1);
        let l = new XMLHttpRequest();
        if (e.auth) {
          const y = e.auth.username || "",
            p = e.auth.password
              ? unescape(encodeURIComponent(e.auth.password))
              : "";
          o.set("Authorization", "Basic " + btoa(y + ":" + p));
        }
        const c = zy(e.baseURL, e.url);
        l.open(e.method.toUpperCase(), My(c, e.params, e.paramsSerializer), !0),
          (l.timeout = e.timeout);
        function f() {
          if (!l) return;
          const y = Nt.from(
              "getAllResponseHeaders" in l && l.getAllResponseHeaders()
            ),
            v = {
              data:
                !s || s === "text" || s === "json"
                  ? l.responseText
                  : l.response,
              status: l.status,
              statusText: l.statusText,
              headers: y,
              config: e,
              request: l,
            };
          DC(
            function (m) {
              n(m), u();
            },
            function (m) {
              r(m), u();
            },
            v
          ),
            (l = null);
        }
        if (
          ("onloadend" in l
            ? (l.onloadend = f)
            : (l.onreadystatechange = function () {
                !l ||
                  l.readyState !== 4 ||
                  (l.status === 0 &&
                    !(l.responseURL && l.responseURL.indexOf("file:") === 0)) ||
                  setTimeout(f);
              }),
          (l.onabort = function () {
            l &&
              (r(new M("Request aborted", M.ECONNABORTED, e, l)), (l = null));
          }),
          (l.onerror = function () {
            r(new M("Network Error", M.ERR_NETWORK, e, l)), (l = null);
          }),
          (l.ontimeout = function () {
            let p = e.timeout
              ? "timeout of " + e.timeout + "ms exceeded"
              : "timeout exceeded";
            const v = e.transitional || jy;
            e.timeoutErrorMessage && (p = e.timeoutErrorMessage),
              r(
                new M(
                  p,
                  v.clarifyTimeoutError ? M.ETIMEDOUT : M.ECONNABORTED,
                  e,
                  l
                )
              ),
              (l = null);
          }),
          gt.isStandardBrowserEnv)
        ) {
          const y =
            (e.withCredentials || MC(c)) &&
            e.xsrfCookieName &&
            FC.read(e.xsrfCookieName);
          y && o.set(e.xsrfHeaderName, y);
        }
        i === void 0 && o.setContentType(null),
          "setRequestHeader" in l &&
            P.forEach(o.toJSON(), function (p, v) {
              l.setRequestHeader(v, p);
            }),
          P.isUndefined(e.withCredentials) ||
            (l.withCredentials = !!e.withCredentials),
          s && s !== "json" && (l.responseType = e.responseType),
          typeof e.onDownloadProgress == "function" &&
            l.addEventListener("progress", fh(e.onDownloadProgress, !0)),
          typeof e.onUploadProgress == "function" &&
            l.upload &&
            l.upload.addEventListener("progress", fh(e.onUploadProgress)),
          (e.cancelToken || e.signal) &&
            ((a = (y) => {
              l &&
                (r(!y || y.type ? new Vi(null, e, l) : y),
                l.abort(),
                (l = null));
            }),
            e.cancelToken && e.cancelToken.subscribe(a),
            e.signal &&
              (e.signal.aborted ? a() : e.signal.addEventListener("abort", a)));
        const d = jC(c);
        if (d && gt.protocols.indexOf(d) === -1) {
          r(new M("Unsupported protocol " + d + ":", M.ERR_BAD_REQUEST, e));
          return;
        }
        l.send(i || null);
      });
    },
  $o = { http: hC, xhr: zC };
P.forEach($o, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const VC = {
  getAdapter: (e) => {
    e = P.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    for (
      let i = 0;
      i < t && ((n = e[i]), !(r = P.isString(n) ? $o[n.toLowerCase()] : n));
      i++
    );
    if (!r)
      throw r === !1
        ? new M(
            `Adapter ${n} is not supported by the environment`,
            "ERR_NOT_SUPPORT"
          )
        : new Error(
            P.hasOwnProp($o, n)
              ? `Adapter '${n}' is not available in the build`
              : `Unknown adapter '${n}'`
          );
    if (!P.isFunction(r)) throw new TypeError("adapter is not a function");
    return r;
  },
  adapters: $o,
};
function cu(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Vi(null, e);
}
function dh(e) {
  return (
    cu(e),
    (e.headers = Nt.from(e.headers)),
    (e.data = lu.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    VC.getAdapter(e.adapter || of.adapter)(e).then(
      function (r) {
        return (
          cu(e),
          (r.data = lu.call(e, e.transformResponse, r)),
          (r.headers = Nt.from(r.headers)),
          r
        );
      },
      function (r) {
        return (
          By(r) ||
            (cu(e),
            r &&
              r.response &&
              ((r.response.data = lu.call(e, e.transformResponse, r.response)),
              (r.response.headers = Nt.from(r.response.headers)))),
          Promise.reject(r)
        );
      }
    )
  );
}
const hh = (e) => (e instanceof Nt ? e.toJSON() : e);
function Or(e, t) {
  t = t || {};
  const n = {};
  function r(l, c, f) {
    return P.isPlainObject(l) && P.isPlainObject(c)
      ? P.merge.call({ caseless: f }, l, c)
      : P.isPlainObject(c)
      ? P.merge({}, c)
      : P.isArray(c)
      ? c.slice()
      : c;
  }
  function i(l, c, f) {
    if (P.isUndefined(c)) {
      if (!P.isUndefined(l)) return r(void 0, l, f);
    } else return r(l, c, f);
  }
  function o(l, c) {
    if (!P.isUndefined(c)) return r(void 0, c);
  }
  function s(l, c) {
    if (P.isUndefined(c)) {
      if (!P.isUndefined(l)) return r(void 0, l);
    } else return r(void 0, c);
  }
  function a(l, c, f) {
    if (f in t) return r(l, c);
    if (f in e) return r(void 0, l);
  }
  const u = {
    url: o,
    method: o,
    data: o,
    baseURL: s,
    transformRequest: s,
    transformResponse: s,
    paramsSerializer: s,
    timeout: s,
    timeoutMessage: s,
    withCredentials: s,
    adapter: s,
    responseType: s,
    xsrfCookieName: s,
    xsrfHeaderName: s,
    onUploadProgress: s,
    onDownloadProgress: s,
    decompress: s,
    maxContentLength: s,
    maxBodyLength: s,
    beforeRedirect: s,
    transport: s,
    httpAgent: s,
    httpsAgent: s,
    cancelToken: s,
    socketPath: s,
    responseEncoding: s,
    validateStatus: a,
    headers: (l, c) => i(hh(l), hh(c), !0),
  };
  return (
    P.forEach(Object.keys(e).concat(Object.keys(t)), function (c) {
      const f = u[c] || i,
        d = f(e[c], t[c], c);
      (P.isUndefined(d) && f !== a) || (n[c] = d);
    }),
    n
  );
}
const Vy = "1.3.4",
  sf = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    sf[e] = function (r) {
      return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  }
);
const ph = {};
sf.transitional = function (t, n, r) {
  function i(o, s) {
    return (
      "[Axios v" +
      Vy +
      "] Transitional option '" +
      o +
      "'" +
      s +
      (r ? ". " + r : "")
    );
  }
  return (o, s, a) => {
    if (t === !1)
      throw new M(
        i(s, " has been removed" + (n ? " in " + n : "")),
        M.ERR_DEPRECATED
      );
    return (
      n &&
        !ph[s] &&
        ((ph[s] = !0),
        console.warn(
          i(
            s,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future"
          )
        )),
      t ? t(o, s, a) : !0
    );
  };
};
function QC(e, t, n) {
  if (typeof e != "object")
    throw new M("options must be an object", M.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let i = r.length;
  for (; i-- > 0; ) {
    const o = r[i],
      s = t[o];
    if (s) {
      const a = e[o],
        u = a === void 0 || s(a, o, e);
      if (u !== !0)
        throw new M("option " + o + " must be " + u, M.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new M("Unknown option " + o, M.ERR_BAD_OPTION);
  }
}
const kl = { assertOptions: QC, validators: sf },
  Bt = kl.validators;
class _s {
  constructor(t) {
    (this.defaults = t),
      (this.interceptors = { request: new lh(), response: new lh() });
  }
  request(t, n) {
    typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = Or(this.defaults, n));
    const { transitional: r, paramsSerializer: i, headers: o } = n;
    r !== void 0 &&
      kl.assertOptions(
        r,
        {
          silentJSONParsing: Bt.transitional(Bt.boolean),
          forcedJSONParsing: Bt.transitional(Bt.boolean),
          clarifyTimeoutError: Bt.transitional(Bt.boolean),
        },
        !1
      ),
      i !== void 0 &&
        kl.assertOptions(
          i,
          { encode: Bt.function, serialize: Bt.function },
          !0
        ),
      (n.method = (n.method || this.defaults.method || "get").toLowerCase());
    let s;
    (s = o && P.merge(o.common, o[n.method])),
      s &&
        P.forEach(
          ["delete", "get", "head", "post", "put", "patch", "common"],
          (p) => {
            delete o[p];
          }
        ),
      (n.headers = Nt.concat(s, o));
    const a = [];
    let u = !0;
    this.interceptors.request.forEach(function (v) {
      (typeof v.runWhen == "function" && v.runWhen(n) === !1) ||
        ((u = u && v.synchronous), a.unshift(v.fulfilled, v.rejected));
    });
    const l = [];
    this.interceptors.response.forEach(function (v) {
      l.push(v.fulfilled, v.rejected);
    });
    let c,
      f = 0,
      d;
    if (!u) {
      const p = [dh.bind(this), void 0];
      for (
        p.unshift.apply(p, a),
          p.push.apply(p, l),
          d = p.length,
          c = Promise.resolve(n);
        f < d;

      )
        c = c.then(p[f++], p[f++]);
      return c;
    }
    d = a.length;
    let y = n;
    for (f = 0; f < d; ) {
      const p = a[f++],
        v = a[f++];
      try {
        y = p(y);
      } catch (C) {
        v.call(this, C);
        break;
      }
    }
    try {
      c = dh.call(this, y);
    } catch (p) {
      return Promise.reject(p);
    }
    for (f = 0, d = l.length; f < d; ) c = c.then(l[f++], l[f++]);
    return c;
  }
  getUri(t) {
    t = Or(this.defaults, t);
    const n = zy(t.baseURL, t.url);
    return My(n, t.params, t.paramsSerializer);
  }
}
P.forEach(["delete", "get", "head", "options"], function (t) {
  _s.prototype[t] = function (n, r) {
    return this.request(
      Or(r || {}, { method: t, url: n, data: (r || {}).data })
    );
  };
});
P.forEach(["post", "put", "patch"], function (t) {
  function n(r) {
    return function (o, s, a) {
      return this.request(
        Or(a || {}, {
          method: t,
          headers: r ? { "Content-Type": "multipart/form-data" } : {},
          url: o,
          data: s,
        })
      );
    };
  }
  (_s.prototype[t] = n()), (_s.prototype[t + "Form"] = n(!0));
});
const Do = _s;
class af {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function (o) {
      n = o;
    });
    const r = this;
    this.promise.then((i) => {
      if (!r._listeners) return;
      let o = r._listeners.length;
      for (; o-- > 0; ) r._listeners[o](i);
      r._listeners = null;
    }),
      (this.promise.then = (i) => {
        let o;
        const s = new Promise((a) => {
          r.subscribe(a), (o = a);
        }).then(i);
        return (
          (s.cancel = function () {
            r.unsubscribe(o);
          }),
          s
        );
      }),
      t(function (o, s, a) {
        r.reason || ((r.reason = new Vi(o, s, a)), n(r.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  static source() {
    let t;
    return {
      token: new af(function (i) {
        t = i;
      }),
      cancel: t,
    };
  }
}
const qC = af;
function HC(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function WC(e) {
  return P.isObject(e) && e.isAxiosError === !0;
}
const bl = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(bl).forEach(([e, t]) => {
  bl[t] = e;
});
const KC = bl;
function Qy(e) {
  const t = new Do(e),
    n = xy(Do.prototype.request, t);
  return (
    P.extend(n, Do.prototype, t, { allOwnKeys: !0 }),
    P.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (i) {
      return Qy(Or(e, i));
    }),
    n
  );
}
const fe = Qy(of);
fe.Axios = Do;
fe.CanceledError = Vi;
fe.CancelToken = qC;
fe.isCancel = By;
fe.VERSION = Vy;
fe.toFormData = wa;
fe.AxiosError = M;
fe.Cancel = fe.CanceledError;
fe.all = function (t) {
  return Promise.all(t);
};
fe.spread = HC;
fe.isAxiosError = WC;
fe.mergeConfig = Or;
fe.AxiosHeaders = Nt;
fe.formToJSON = (e) => Uy(P.isHTMLForm(e) ? new FormData(e) : e);
fe.HttpStatusCode = KC;
fe.default = fe;
const Ca = fe,
  uf = (e) =>
    Ca.get(zn + "/api/account", {
      headers: {
        Authorization: "Bearer " + e || localStorage.getItem("token"),
      },
    }),
  GC = { token: localStorage.getItem("token") },
  qy = Kc({
    name: "account",
    initialState: GC,
    reducers: {
      login: (e, t) => {
        (e.token = t.payload), localStorage.setItem("token", t.payload);
      },
      setId: (e, t) => {
        e.id = t.payload;
      },
      logout: (e) => {
        (e.token = void 0),
          localStorage.removeItem("token"),
          localStorage.removeItem("banners");
      },
    },
  }),
  { login: YC, logout: Ts, setId: JC } = qy.actions,
  XC = qy.reducer,
  ZC = [
    { title: "£ GBP" },
    { title: "$ USD" },
    { title: "€ EUR" },
    { title: "₿ BTC" },
    { title: "R$ RBX" },
  ],
  eO = () => {
    const e = Zc(),
      n = Tr().pathname.split("/")[1],
      [r, i] = O.useState(!1),
      [o, s] = O.useState(!1),
      a = Bn(),
      u = Ze((d) => d.mainState.chosenCurrency);
    Ze((d) => d.betsState);
    const l = Ze((d) => d.accountState),
      c = ZC.filter((d) => d.title !== `${u.symbol} ${u.currency}`).map(
        (d) => ({
          title: d.title,
          onClick: () => {
            const [y, p] = d.title.split(" ");
            a($S({ symbol: y, currency: p })), i(!1);
          },
        })
      ),
      { data: f } = bs({
        queryKey: ["account"],
        queryFn: () => uf(l.token),
        onError: () => a(Ts()),
        onSuccess: (d) => a(JC(d.data.id)),
        enabled: l.token !== null,
      });
    return N("div", {
      className: "navigationBar",
      children: [
        w(oE, {
          onClick: () => s((d) => !d),
          className: `menu ${o && "active"}`,
        }),
        N("div", {
          className: `menuContent ${o && "show"}`,
          children: [
            w("div", {
              className: "info",
              children: N("h1", {
                className: "navigationTitle",
                children: [
                  "retrac ",
                  w("span", {
                    className: "navigationTitleAlternate",
                    children: "site",
                  }),
                ],
              }),
            }),
            N(Gr, {
              to: "/roulette",
              className: `menuButton ${n === "roulette" && "active"}`,
              children: [
                w(MS, {}),
                w("span", {
                  className: "menuButtonTitle",
                  children: "ROULETTE",
                }),
              ],
            }),
            N(Gr, {
              to: "/flip",
              className: `menuButton ${n === "flip" && "active"}`,
              children: [
                w(Xt, {}),
                w("span", {
                  className: "menuButtonTitle",
                  children: "COIN FLIP",
                }),
              ],
            }),
          ],
        }),
        N("h1", {
          className: "navigationTitle",
          children: [
            "retrac ",
            w("span", {
              className: "navigationTitleAlternate",
              children: "site",
            }),
          ],
        }),
        N(Gr, {
          to: "/roulette",
          className: `navigationTab ${n === "roulette" && "active"}`,
          children: [
            w("div", { className: "navigationTabBar" }),
            w("span", {
              className: "navigationTabTitle",
              children: "ROULETTE",
            }),
          ],
        }),
        w("div", { className: "splitter" }),
        w(sE, {
          options: c,
          value: `${u.symbol} ${u.currency}`,
          active: r,
          setActive: i,
        }),
        l.token
          ? N(In, {
              children: [
                N("div", {
                  className: "coinarea",
                  children: [
                    w(Xt, {}),
                    w(bo, {
                      className: "coinareaText",
                      start:
                        (f == null ? void 0 : f.data.coins) -
                        (f == null ? void 0 : f.data.newCoins),
                      end: f == null ? void 0 : f.data.coins,
                      duration: 0.75,
                      decimals: 2,
                      smartEasingThreshold: 0,
                      smartEasingAmount: 0,
                      onCompleteCallback: () => {
                        e.invalidateQueries("account");
                      },
                    }),
                  ],
                }),
                w("button", {
                  className: "default usernameButton",
                  children: N(Gr, {
                    to: "/account",
                    children: [
                      w("img", {
                        src: f == null ? void 0 : f.data.avatarUrl,
                        alt: "",
                      }),
                      f == null ? void 0 : f.data.personaName,
                    ],
                  }),
                }),
              ],
            })
          : N("a", {
              href: `${zn}/api/steam`,
              className: "navigationSteamButton",
              children: [w(IS, {}), "SIGN IN VIA STEAM"],
            }),
      ],
    });
  },
  _l = O.createContext(null),
  Hy = () => {
    if (!_l)
      throw new Error(
        "useEventListener must be used within a EventListenerProvider"
      );
    return O.useContext(_l);
  };
class tO {
  constructor() {
    df(this, "listeners", {});
  }
  on(t, n) {
    this.listeners[t] || (this.listeners[t] = []), this.listeners[t].push(n);
  }
  off(t, n) {
    this.listeners[t] &&
      (this.listeners[t] = this.listeners[t].filter((r) => r !== n));
  }
  emit(t, ...n) {
    this.listeners[t] && this.listeners[t].forEach((r) => r(...n));
  }
}
var Tl = ((e) => ((e.JOIN_ROOM = "JOIN_ROOM"), e))(Tl || {}),
  ot = ((e) => (
    (e.COUNTDOWN = "COUNTDOWN"),
    (e.SPIN = "SPIN"),
    (e.BET = "BET"),
    (e.WINNER = "WINNER"),
    (e.COMPLETE = "COMPLETE"),
    e
  ))(ot || {}),
  H = {},
  nO = {
    get exports() {
      return H;
    },
    set exports(e) {
      H = e;
    },
  },
  rO = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
  iO = rO,
  oO = iO;
function Wy() {}
function Ky() {}
Ky.resetWarningCache = Wy;
var sO = function () {
  function e(r, i, o, s, a, u) {
    if (u !== oO) {
      var l = new Error(
        "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
      );
      throw ((l.name = "Invariant Violation"), l);
    }
  }
  e.isRequired = e;
  function t() {
    return e;
  }
  var n = {
    array: e,
    bigint: e,
    bool: e,
    func: e,
    number: e,
    object: e,
    string: e,
    symbol: e,
    any: e,
    arrayOf: t,
    element: e,
    elementType: e,
    instanceOf: t,
    node: e,
    objectOf: t,
    oneOf: t,
    oneOfType: t,
    shape: t,
    exact: t,
    checkPropTypes: Ky,
    resetWarningCache: Wy,
  };
  return (n.PropTypes = n), n;
};
nO.exports = sO();
function Gy(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function mh(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, r.key, r);
  }
}
function Yy(e, t, n) {
  return t && mh(e.prototype, t), n && mh(e, n), e;
}
function Jy(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    t && Rl(e, t);
}
function Rs(e) {
  return (
    (Rs = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    Rs(e)
  );
}
function Rl(e, t) {
  return (
    (Rl =
      Object.setPrototypeOf ||
      function (r, i) {
        return (r.__proto__ = i), r;
      }),
    Rl(e, t)
  );
}
function aO() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return (
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {})),
      !0
    );
  } catch {
    return !1;
  }
}
function uO(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function lO(e, t) {
  return t && (typeof t == "object" || typeof t == "function") ? t : uO(e);
}
function Xy(e) {
  var t = aO();
  return function () {
    var r = Rs(e),
      i;
    if (t) {
      var o = Rs(this).constructor;
      i = Reflect.construct(r, arguments, o);
    } else i = r.apply(this, arguments);
    return lO(this, i);
  };
}
function cO(e) {
  return fO(e) || dO(e) || hO(e) || pO();
}
function fO(e) {
  if (Array.isArray(e)) return Nl(e);
}
function dO(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function hO(e, t) {
  if (e) {
    if (typeof e == "string") return Nl(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (n === "Object" && e.constructor && (n = e.constructor.name),
      n === "Map" || n === "Set")
    )
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Nl(e, t);
  }
}
function Nl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function pO() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Vr(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2,
    n = String(e);
  if (t === 0) return n;
  var r = n.match(/(.*?)([0-9]+)(.*)/),
    i = r ? r[1] : "",
    o = r ? r[3] : "",
    s = r ? r[2] : n,
    a =
      s.length >= t
        ? s
        : (
            cO(Array(t))
              .map(function () {
                return "0";
              })
              .join("") + s
          ).slice(t * -1);
  return "".concat(i).concat(a).concat(o);
}
var Zy = { daysInHours: !1, zeroPadTime: 2 };
function mO(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    n = t.now,
    r = n === void 0 ? Date.now : n,
    i = t.precision,
    o = i === void 0 ? 0 : i,
    s = t.controlled,
    a = t.offsetTime,
    u = a === void 0 ? 0 : a,
    l = t.overtime,
    c;
  typeof e == "string"
    ? (c = new Date(e).getTime())
    : e instanceof Date
    ? (c = e.getTime())
    : (c = e),
    s || (c += u);
  var f = s ? c : c - r(),
    d = Math.min(20, Math.max(0, o)),
    y = Math.round(
      parseFloat(((l ? f : Math.max(0, f)) / 1e3).toFixed(d)) * 1e3
    ),
    p = Math.abs(y) / 1e3;
  return {
    total: y,
    days: Math.floor(p / (3600 * 24)),
    hours: Math.floor((p / 3600) % 24),
    minutes: Math.floor((p / 60) % 60),
    seconds: Math.floor(p % 60),
    milliseconds: Number(((p % 1) * 1e3).toFixed()),
    completed: y <= 0,
  };
}
function yO(e, t) {
  var n = e.days,
    r = e.hours,
    i = e.minutes,
    o = e.seconds,
    s = Object.assign(Object.assign({}, Zy), t),
    a = s.daysInHours,
    u = s.zeroPadTime,
    l = s.zeroPadDays,
    c = l === void 0 ? u : l,
    f = Math.min(2, u),
    d = a ? Vr(r + n * 24, u) : Vr(r, f);
  return {
    days: a ? "" : Vr(n, c),
    hours: d,
    minutes: Vr(i, f),
    seconds: Vr(o, f),
  };
}
var ev = (function (e) {
  Jy(n, e);
  var t = Xy(n);
  function n() {
    var r;
    return (
      Gy(this, n),
      (r = t.apply(this, arguments)),
      (r.state = { count: r.props.count || 3 }),
      (r.startCountdown = function () {
        r.interval = window.setInterval(function () {
          var i = r.state.count - 1;
          i === 0
            ? (r.stopCountdown(), r.props.onComplete && r.props.onComplete())
            : r.setState(function (o) {
                return { count: o.count - 1 };
              });
        }, 1e3);
      }),
      (r.stopCountdown = function () {
        clearInterval(r.interval);
      }),
      (r.addTime = function (i) {
        r.stopCountdown(),
          r.setState(function (o) {
            return { count: o.count + i };
          }, r.startCountdown);
      }),
      r
    );
  }
  return (
    Yy(n, [
      {
        key: "componentDidMount",
        value: function () {
          this.startCountdown();
        },
      },
      {
        key: "componentWillUnmount",
        value: function () {
          clearInterval(this.interval);
        },
      },
      {
        key: "render",
        value: function () {
          return this.props.children
            ? O.cloneElement(this.props.children, { count: this.state.count })
            : null;
        },
      },
    ]),
    n
  );
})(O.Component);
ev.propTypes = { count: H.number, children: H.element, onComplete: H.func };
var lf = (function (e) {
  Jy(n, e);
  var t = Xy(n);
  function n(r) {
    var i;
    if (
      (Gy(this, n),
      (i = t.call(this, r)),
      (i.mounted = !1),
      (i.initialTimestamp = i.calcOffsetStartTimestamp()),
      (i.offsetStartTimestamp = i.props.autoStart ? 0 : i.initialTimestamp),
      (i.offsetTime = 0),
      (i.legacyMode = !1),
      (i.legacyCountdownRef = O.createRef()),
      (i.tick = function () {
        var s = i.calcTimeDelta(),
          a = s.completed && !i.props.overtime ? void 0 : i.props.onTick;
        i.setTimeDeltaState(s, void 0, a);
      }),
      (i.start = function () {
        if (!i.isStarted()) {
          var s = i.offsetStartTimestamp;
          (i.offsetStartTimestamp = 0),
            (i.offsetTime += s ? i.calcOffsetStartTimestamp() - s : 0);
          var a = i.calcTimeDelta();
          i.setTimeDeltaState(a, "STARTED", i.props.onStart),
            !i.props.controlled &&
              (!a.completed || i.props.overtime) &&
              (i.clearTimer(),
              (i.interval = window.setInterval(i.tick, i.props.intervalDelay)));
        }
      }),
      (i.pause = function () {
        i.isPaused() ||
          (i.clearTimer(),
          (i.offsetStartTimestamp = i.calcOffsetStartTimestamp()),
          i.setTimeDeltaState(i.state.timeDelta, "PAUSED", i.props.onPause));
      }),
      (i.stop = function () {
        i.isStopped() ||
          (i.clearTimer(),
          (i.offsetStartTimestamp = i.calcOffsetStartTimestamp()),
          (i.offsetTime = i.offsetStartTimestamp - i.initialTimestamp),
          i.setTimeDeltaState(i.calcTimeDelta(), "STOPPED", i.props.onStop));
      }),
      (i.isStarted = function () {
        return i.isStatus("STARTED");
      }),
      (i.isPaused = function () {
        return i.isStatus("PAUSED");
      }),
      (i.isStopped = function () {
        return i.isStatus("STOPPED");
      }),
      (i.isCompleted = function () {
        return i.isStatus("COMPLETED");
      }),
      r.date)
    ) {
      var o = i.calcTimeDelta();
      i.state = { timeDelta: o, status: o.completed ? "COMPLETED" : "STOPPED" };
    } else i.legacyMode = !0;
    return i;
  }
  return (
    Yy(n, [
      {
        key: "componentDidMount",
        value: function () {
          this.legacyMode ||
            ((this.mounted = !0),
            this.props.onMount && this.props.onMount(this.calcTimeDelta()),
            this.props.autoStart && this.start());
        },
      },
      {
        key: "componentDidUpdate",
        value: function (i) {
          this.legacyMode ||
            (this.props.date !== i.date &&
              ((this.initialTimestamp = this.calcOffsetStartTimestamp()),
              (this.offsetStartTimestamp = this.initialTimestamp),
              (this.offsetTime = 0),
              this.setTimeDeltaState(this.calcTimeDelta())));
        },
      },
      {
        key: "componentWillUnmount",
        value: function () {
          this.legacyMode || ((this.mounted = !1), this.clearTimer());
        },
      },
      {
        key: "calcTimeDelta",
        value: function () {
          var i = this.props,
            o = i.date,
            s = i.now,
            a = i.precision,
            u = i.controlled,
            l = i.overtime;
          return mO(o, {
            now: s,
            precision: a,
            controlled: u,
            offsetTime: this.offsetTime,
            overtime: l,
          });
        },
      },
      {
        key: "calcOffsetStartTimestamp",
        value: function () {
          return Date.now();
        },
      },
      {
        key: "addTime",
        value: function (i) {
          this.legacyCountdownRef.current.addTime(i);
        },
      },
      {
        key: "clearTimer",
        value: function () {
          window.clearInterval(this.interval);
        },
      },
      {
        key: "isStatus",
        value: function (i) {
          return this.state.status === i;
        },
      },
      {
        key: "setTimeDeltaState",
        value: function (i, o, s) {
          var a = this;
          if (this.mounted) {
            var u = i.completed && !this.state.timeDelta.completed,
              l = i.completed && o === "STARTED";
            u && !this.props.overtime && this.clearTimer();
            var c = function () {
              s && s(a.state.timeDelta),
                a.props.onComplete && (u || l) && a.props.onComplete(i, l);
            };
            return this.setState(function (f) {
              var d = o || f.status;
              return (
                i.completed && !a.props.overtime
                  ? (d = "COMPLETED")
                  : !o && d === "COMPLETED" && (d = "STOPPED"),
                { timeDelta: i, status: d }
              );
            }, c);
          }
        },
      },
      {
        key: "getApi",
        value: function () {
          return (this.api = this.api || {
            start: this.start,
            pause: this.pause,
            stop: this.stop,
            isStarted: this.isStarted,
            isPaused: this.isPaused,
            isStopped: this.isStopped,
            isCompleted: this.isCompleted,
          });
        },
      },
      {
        key: "getRenderProps",
        value: function () {
          var i = this.props,
            o = i.daysInHours,
            s = i.zeroPadTime,
            a = i.zeroPadDays,
            u = this.state.timeDelta;
          return Object.assign(Object.assign({}, u), {
            api: this.getApi(),
            props: this.props,
            formatted: yO(u, {
              daysInHours: o,
              zeroPadTime: s,
              zeroPadDays: a,
            }),
          });
        },
      },
      {
        key: "render",
        value: function () {
          if (this.legacyMode) {
            var i = this.props,
              o = i.count,
              s = i.children,
              a = i.onComplete;
            return O.createElement(
              ev,
              { ref: this.legacyCountdownRef, count: o, onComplete: a },
              s
            );
          }
          var u = this.props,
            l = u.className,
            c = u.overtime,
            f = u.children,
            d = u.renderer,
            y = this.getRenderProps();
          if (d) return d(y);
          if (f && this.state.timeDelta.completed && !c)
            return O.cloneElement(f, { countdown: y });
          var p = y.formatted,
            v = p.days,
            C = p.hours,
            m = p.minutes,
            h = p.seconds;
          return O.createElement(
            "span",
            { className: l },
            y.total < 0 ? "-" : "",
            v,
            v ? ":" : "",
            C,
            ":",
            m,
            ":",
            h
          );
        },
      },
    ]),
    n
  );
})(O.Component);
lf.defaultProps = Object.assign(Object.assign({}, Zy), {
  controlled: !1,
  intervalDelay: 1e3,
  precision: 0,
  autoStart: !0,
});
lf.propTypes = {
  date: H.oneOfType([H.instanceOf(Date), H.string, H.number]),
  daysInHours: H.bool,
  zeroPadTime: H.number,
  zeroPadDays: H.number,
  controlled: H.bool,
  intervalDelay: H.number,
  precision: H.number,
  autoStart: H.bool,
  overtime: H.bool,
  className: H.string,
  children: H.element,
  renderer: H.func,
  now: H.func,
  onMount: H.func,
  onStart: H.func,
  onPause: H.func,
  onStop: H.func,
  onTick: H.func,
  onComplete: H.func,
};
const vO = () => Ca.get(zn + "/api/round"),
  gO = (e, t, n) =>
    Ca.put(
      zn + "/api/round/bet",
      { betAmount: e, betFor: t },
      { headers: { Authorization: "Bearer " + n } }
    );
var wO = {
  cm: !0,
  mm: !0,
  in: !0,
  px: !0,
  pt: !0,
  pc: !0,
  em: !0,
  ex: !0,
  ch: !0,
  rem: !0,
  vw: !0,
  vh: !0,
  vmin: !0,
  vmax: !0,
  "%": !0,
};
function SO(e) {
  if (typeof e == "number") return { value: e, unit: "px" };
  var t,
    n = (e.match(/^[0-9.]*/) || "").toString();
  n.includes(".") ? (t = parseFloat(n)) : (t = parseInt(n, 10));
  var r = (e.match(/[^0-9]*$/) || "").toString();
  return wO[r]
    ? { value: t, unit: r }
    : (console.warn(
        "React Spinners: "
          .concat(e, " is not a valid css value. Defaulting to ")
          .concat(t, "px.")
      ),
      { value: t, unit: "px" });
}
function co(e) {
  var t = SO(e);
  return "".concat(t.value).concat(t.unit);
}
var yh = function (e, t, n) {
    var r = "react-spinners-".concat(e, "-").concat(n);
    if (typeof window > "u" || !window.document) return r;
    var i = document.createElement("style");
    document.head.appendChild(i);
    var o = i.sheet,
      s = `
    @keyframes `
        .concat(
          r,
          ` {
      `
        )
        .concat(
          t,
          `
    }
  `
        );
    return o && o.insertRule(s, 0), r;
  },
  Ns =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (Ns =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
              t = arguments[n];
              for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
          }),
        Ns.apply(this, arguments)
      );
    },
  EO =
    (globalThis && globalThis.__rest) ||
    function (e, t) {
      var n = {};
      for (var r in e)
        Object.prototype.hasOwnProperty.call(e, r) &&
          t.indexOf(r) < 0 &&
          (n[r] = e[r]);
      if (e != null && typeof Object.getOwnPropertySymbols == "function")
        for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
          t.indexOf(r[i]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
            (n[r[i]] = e[r[i]]);
      return n;
    },
  vh = [
    yh(
      "PuffLoader",
      "0% {transform: scale(0)} 100% {transform: scale(1.0)}",
      "puff-1"
    ),
    yh("PuffLoader", "0% {opacity: 1} 100% {opacity: 0}", "puff-2"),
  ];
function tv(e) {
  var t = e.loading,
    n = t === void 0 ? !0 : t,
    r = e.color,
    i = r === void 0 ? "#000000" : r,
    o = e.speedMultiplier,
    s = o === void 0 ? 1 : o,
    a = e.cssOverride,
    u = a === void 0 ? {} : a,
    l = e.size,
    c = l === void 0 ? 60 : l,
    f = EO(e, ["loading", "color", "speedMultiplier", "cssOverride", "size"]),
    d = Ns(
      { display: "inherit", position: "relative", width: co(c), height: co(c) },
      u
    ),
    y = function (p) {
      return {
        position: "absolute",
        height: co(c),
        width: co(c),
        border: "thick solid ".concat(i),
        borderRadius: "50%",
        opacity: "1",
        top: "0",
        left: "0",
        animationFillMode: "both",
        animation: "".concat(vh[0], ", ").concat(vh[1]),
        animationDuration: "".concat(2 / s, "s"),
        animationIterationCount: "infinite",
        animationTimingFunction:
          "cubic-bezier(0.165, 0.84, 0.44, 1), cubic-bezier(0.3, 0.61, 0.355, 1)",
        animationDelay: p === 1 ? "-1s" : "0s",
      };
    };
  return n
    ? O.createElement(
        "span",
        Ns({ style: d }, f),
        O.createElement("span", { style: y(1) }),
        O.createElement("span", { style: y(2) })
      )
    : null;
}
const Jr = 100,
  CO = 15,
  gh = Jr * CO,
  OO = { 3: [15], 1: [1, 3, 5, 7, 9, 11, 13], 2: [2, 4, 6, 8, 10, 12, 14] },
  PO = () => {
    var rt, ye, We;
    const e = Bn(),
      t = Zc(),
      n = Hy(),
      [r, i] = O.useState(!1),
      [o, s] = O.useState(0),
      [a, u] = O.useState(0),
      [l, c] = O.useState(1),
      [f, d] = O.useState(null),
      y = Ze((S) => S.accountState),
      p = Ze((S) => S.mainState.banners),
      { data: v } = bs({
        queryKey: ["round"],
        queryFn: vO,
        initialData: {
          data: {
            spinTime: 0,
            pauseTime: 0,
            countdownTime: 0,
            dateNow: 0,
            bets: [],
          },
        },
        onSettled: () => c((S) => S + 1),
      }),
      { data: C } = bs({
        queryKey: ["account"],
        queryFn: () => uf(y.token),
        onError: () => e(Ts()),
      }),
      m = v == null ? void 0 : v.data.bets.filter((S) => S.for === 2),
      h = v == null ? void 0 : v.data.bets.filter((S) => S.for === 1),
      g = v == null ? void 0 : v.data.bets.filter((S) => S.for === 3),
      E =
        m == null
          ? void 0
          : m.some((S) => S.user.id === (C == null ? void 0 : C.data.id)),
      x =
        h == null
          ? void 0
          : h.some((S) => S.user.id === (C == null ? void 0 : C.data.id)),
      k =
        g == null
          ? void 0
          : g.some((S) => S.user.id === (C == null ? void 0 : C.data.id)),
      T = (S) => {
        const _ = Math.floor(Math.random() * 3) + 5,
          D = gh * _,
          z = Math.floor((Math.random() * Jr) / 2) - Jr / 2,
          W = OO[S],
          Qn = W[Math.floor(Math.random() * W.length)];
        i(!0), s((Pt) => Pt + (D - 8 * Jr + Qn * Jr) + z);
      },
      A = (S) => {
        c((_) => _ + 1),
          i(!1),
          s(0),
          d(null),
          t.setQueriesData(["round"], () => ({ data: { ...S } }));
      },
      F = ({ seconds: S, milliseconds: _ }) =>
        `${S}.${_.toString().slice(0, 2).padEnd(2, "0")}`,
      R = (S) => {
        if (!y.token) return e(pr({ name: "nosignin", enabled: !0 }));
        if (a <= 0) return e(pr({ name: "minbet", enabled: !0 }));
        if (a > (C == null ? void 0 : C.data.coins))
          return e(pr({ name: "nofunds", enabled: !0 }));
        gO(a, S, y.token),
          u(0),
          t.setQueriesData(["account"], (_) => ({
            data: { ..._.data, coins: _.data.coins - a, newCoins: a },
          }));
      },
      B = (S) => {
        t.setQueriesData(["round"], (_) => ({
          data: { ..._.data, bets: [..._.data.bets, S] },
        }));
      },
      Se = (S) => {
        T(S.coinToBe);
      },
      Ee = (S) => {
        const { bet: _, multiplier: D } = S,
          z = _.betAmount * D;
        t.setQueriesData(["account"], (W) => ({
          data: { ...W.data, coins: W.data.coins + z, newCoins: -z },
        }));
      },
      Ae = (S) => {
        const { winner: _ } = S;
        d(_);
      };
    return (
      O.useEffect(
        () => (
          n.on(ot.BET, B),
          n.on(ot.COUNTDOWN, A),
          n.on(ot.SPIN, Se),
          n.on(ot.WINNER, Ee),
          n.on(ot.COMPLETE, Ae),
          () => {
            n.off(ot.BET, B),
              n.off(ot.COUNTDOWN, A),
              n.off(ot.SPIN, Se),
              n.off(ot.WINNER, Ee),
              n.off(ot.COMPLETE, Ae);
          }
        ),
        [n]
      ),
      N("div", {
        className: "dashboard roulette",
        children: [
          N("div", {
            className: "banners",
            children: [
              p.some((S) => S.name === "freetrial" && S.enabled) &&
                y.token &&
                N("div", {
                  className: "banner",
                  children: [
                    N("div", {
                      className: "col",
                      children: [
                        w("span", {
                          className: "trialTitle",
                          children: "Claim your free $5 bonus!",
                        }),
                        N("span", {
                          className: "trialDesc",
                          children: [
                            "Use code: ",
                            w("b", { children: "FREE5" }),
                            " when depositing $50 or more.",
                          ],
                        }),
                      ],
                    }),
                    w(Ai, {
                      onClick: () => e(Wd("freetrial")),
                      className: "closeBanner",
                    }),
                  ],
                }),
              p.some((S) => S.name === "note" && S.enabled) &&
                y.token &&
                N("div", {
                  className: "banner note",
                  children: [
                    N("div", {
                      className: "col",
                      children: [
                        w("span", {
                          className: "trialTitle",
                          children: "This site is still in development.",
                        }),
                        w("span", {
                          className: "trialDesc",
                          children:
                            "If you find any bugs, please report them to us. We will compensate you for your time.",
                        }),
                      ],
                    }),
                    w(Ai, {
                      onClick: () => e(Wd("note")),
                      className: "closeBanner",
                    }),
                  ],
                }),
            ],
          }),
          w("div", {
            className: "rouletteContainer",
            children: w("div", {
              className: `rouletteArea ${r && "spinning"}`,
              style: {
                backgroundPositionX: `-${o}px`,
                transition: r
                  ? `background-position ${v.data.spinTime}s`
                  : "background-position 1s",
                backgroundSize: `${gh}px`,
              },
              children: N("div", {
                className: "rouletteWaitText",
                children: [
                  !r &&
                    v.data.dateNow + v.data.countdownTime * 1e3 > Date.now() &&
                    w("span", {
                      className: "waitTextHeader",
                      children: "ROLLING",
                    }),
                  N("span", {
                    className: "rollingTimeText",
                    children: [
                      !r &&
                        v.data.dateNow + v.data.countdownTime * 1e3 >
                          Date.now() &&
                        w(
                          lf,
                          {
                            date: v.data.dateNow + v.data.countdownTime * 1e3,
                            precision: 2,
                            intervalDelay: 0,
                            renderer: F,
                            autoStart: !0,
                          },
                          l
                        ),
                      !r &&
                        v.data.dateNow + v.data.countdownTime * 1e3 <
                          Date.now() &&
                        w(tv, { color: "#fff" }),
                    ],
                  }),
                  w("div", { className: "rollingBar" }),
                ],
              }),
            }),
          }),
          N("div", {
            className: "betInputContainer",
            children: [
              N("div", {
                className: "betInputArea",
                children: [
                  w(Xt, {}),
                  w("input", {
                    type: "number",
                    step: 0.01,
                    className: "betInput",
                    placeholder: "Enter bet amount...",
                    value: a.toFixed(2),
                    onChange: (S) => {
                      u(parseFloat(S.target.value));
                    },
                    onBlur: (S) => S.target.value === "" && u(0),
                  }),
                ],
              }),
              N("div", {
                className: "betIncrements",
                children: [
                  w("button", {
                    onClick: () => u(0),
                    className: "betIncrementButton",
                    children: "CLEAR",
                  }),
                  w("button", {
                    onClick: () => u((S) => S + 0.01),
                    className: "betIncrementButton",
                    children: "+0.01",
                  }),
                  w("button", {
                    onClick: () => u((S) => S + 0.1),
                    className: "betIncrementButton",
                    children: "+0.1",
                  }),
                  w("button", {
                    onClick: () => u((S) => S + 1),
                    className: "betIncrementButton",
                    children: "+1",
                  }),
                  w("button", {
                    onClick: () => u((S) => S + 10),
                    className: "betIncrementButton",
                    children: "+10",
                  }),
                  w("button", {
                    onClick: () => u((S) => S + 100),
                    className: "betIncrementButton",
                    children: "+100",
                  }),
                  w("button", {
                    onClick: () => u((S) => S / 2),
                    className: "betIncrementButton",
                    children: "1/2",
                  }),
                  w("button", {
                    onClick: () => u((S) => S * 2),
                    className: "betIncrementButton",
                    children: "X2",
                  }),
                  w("button", {
                    onClick: () =>
                      u((S) => (C == null ? void 0 : C.data.coins)),
                    className: "betIncrementButton",
                    children: "MAX",
                  }),
                ],
              }),
            ],
          }),
          N("div", {
            className: "informationContainer",
            children: [
              N("div", {
                className: "rouletteBets",
                children: [
                  w("div", {
                    className: "rouletteBetPanel",
                    children: N("button", {
                      onClick: () => R(2),
                      className: `default betButton ${
                        f === 2 ? "won" : f !== null ? "lost" : ""
                      } ${E && "betted"} ${r && "rolling"}`,
                      disabled:
                        r ||
                        E ||
                        (!r &&
                          v.data.dateNow + v.data.countdownTime * 1e3 <
                            Date.now()),
                      children: [
                        w("img", { src: "/t.png", alt: "" }),
                        w("span", {
                          className: "title",
                          children: "PLACE BET",
                        }),
                        w("span", { className: "return", children: "WIN 2X" }),
                      ],
                    }),
                  }),
                  w("div", {
                    className: "rouletteBetPanel",
                    children: N("button", {
                      onClick: () => R(3),
                      className: `default betButton ${
                        f === 3 ? "won" : f !== null ? "lost" : ""
                      } ${k && "betted"} ${r && "rolling"}`,
                      disabled:
                        r ||
                        k ||
                        (!r &&
                          v.data.dateNow + v.data.countdownTime * 1e3 <
                            Date.now()),
                      children: [
                        w("img", { src: "/test.png", alt: "" }),
                        w("span", {
                          className: "title",
                          children: "PLACE BET",
                        }),
                        w("span", { className: "return", children: "WIN 16X" }),
                      ],
                    }),
                  }),
                  w("div", {
                    className: "rouletteBetPanel",
                    children: N("button", {
                      onClick: () => R(1),
                      className: `default betButton ${
                        f === 1 ? "won" : f !== null ? "lost" : ""
                      } ${x && "betted"} ${r && "rolling"}`,
                      disabled:
                        r ||
                        x ||
                        (!r &&
                          v.data.dateNow + v.data.countdownTime * 1e3 <
                            Date.now()),
                      children: [
                        w("img", { src: "/ct.png", alt: "" }),
                        w("span", {
                          className: "title",
                          children: "PLACE BET",
                        }),
                        w("span", { className: "return", children: "WIN 2X" }),
                      ],
                    }),
                  }),
                ],
              }),
              N("div", {
                className: "rouletteTables",
                children: [
                  w("div", {
                    className: `rouletteTablesPanel ${
                      f === 2 ? "won" : f !== null ? "lost" : ""
                    } ${
                      (r ||
                        (!r &&
                          v.data.dateNow + v.data.countdownTime * 1e3 <
                            Date.now())) &&
                      "disabled"
                    }`,
                    children: N("div", {
                      className: `betTable ${m.length > 0 && "border"}`,
                      children: [
                        N("div", {
                          className: "tableHeaderSection",
                          children: [
                            w("img", { src: "/t.png", alt: "" }),
                            N("span", {
                              className: "betTableHeader",
                              children: [m.length, " Bets Total"],
                            }),
                            N("span", {
                              className: "betTableHeader end",
                              children: [
                                w(Xt, {}),
                                w(bo, {
                                  className: "counter",
                                  start:
                                    parseFloat(
                                      m
                                        .reduce((S, _) => S + _.betAmount, 0)
                                        .toFixed(2)
                                    ) -
                                      ((rt = m[m.length - 1]) == null
                                        ? void 0
                                        : rt.betAmount) || 0,
                                  end: parseFloat(
                                    m
                                      .reduce((S, _) => S + _.betAmount, 0)
                                      .toFixed(2)
                                  ),
                                  duration: 0.75,
                                  decimals: 2,
                                  smartEasingThreshold: 0,
                                  smartEasingAmount: 0,
                                }),
                              ],
                            }),
                          ],
                        }),
                        m.length > 0 &&
                          w("div", {
                            className: `betsSection ${
                              m.length > 9 && "moreThanTenBets"
                            }`,
                            children: m.map((S, _) =>
                              N(
                                "div",
                                {
                                  className: "bet",
                                  children: [
                                    w("img", {
                                      src: S.user.avatarUrl,
                                      alt: "",
                                    }),
                                    w("span", {
                                      className: "name",
                                      children: S.user.personaName,
                                    }),
                                    w("span", {
                                      className: "bet",
                                      children: S.betAmount.toFixed(2),
                                    }),
                                  ],
                                },
                                _
                              )
                            ),
                          }),
                      ],
                    }),
                  }),
                  w("div", {
                    className: `rouletteTablesPanel ${
                      f === 3 ? "won" : f !== null ? "lost" : ""
                    } ${
                      (r ||
                        (!r &&
                          v.data.dateNow + v.data.countdownTime * 1e3 <
                            Date.now())) &&
                      "disabled"
                    }`,
                    children: N("div", {
                      className: `betTable ${g.length > 0 && "border"}`,
                      children: [
                        N("div", {
                          className: "tableHeaderSection",
                          children: [
                            w("img", { src: "/test.png", alt: "" }),
                            N("span", {
                              className: "betTableHeader",
                              children: [g.length, " Bets Total"],
                            }),
                            N("span", {
                              className: "betTableHeader end",
                              children: [
                                w(Xt, {}),
                                w(bo, {
                                  className: "counter",
                                  start:
                                    parseFloat(
                                      g
                                        .reduce((S, _) => S + _.betAmount, 0)
                                        .toFixed(2)
                                    ) -
                                      ((ye = g[g.length - 1]) == null
                                        ? void 0
                                        : ye.betAmount) || 0,
                                  end: parseFloat(
                                    g
                                      .reduce((S, _) => S + _.betAmount, 0)
                                      .toFixed(2)
                                  ),
                                  duration: 0.75,
                                  decimals: 2,
                                  smartEasingThreshold: 0,
                                  smartEasingAmount: 0,
                                }),
                              ],
                            }),
                          ],
                        }),
                        g.length > 0 &&
                          w("div", {
                            className: `betsSection ${
                              g.length > 9 && "moreThanTenBets"
                            }`,
                            children: g.map((S, _) =>
                              N(
                                "div",
                                {
                                  className: "bet",
                                  children: [
                                    w("img", {
                                      src: S.user.avatarUrl,
                                      alt: "",
                                    }),
                                    w("span", {
                                      className: "name",
                                      children: S.user.personaName,
                                    }),
                                    w("span", {
                                      className: "bet",
                                      children: S.betAmount.toFixed(2),
                                    }),
                                  ],
                                },
                                _
                              )
                            ),
                          }),
                      ],
                    }),
                  }),
                  w("div", {
                    className: `rouletteTablesPanel ${
                      f === 1 ? "won" : f !== null ? "lost" : ""
                    } ${
                      (r ||
                        (!r &&
                          v.data.dateNow + v.data.countdownTime * 1e3 <
                            Date.now())) &&
                      "disabled"
                    }`,
                    children: N("div", {
                      className: `betTable ${h.length > 0 && "border"}`,
                      children: [
                        N("div", {
                          className: "tableHeaderSection",
                          children: [
                            w("img", { src: "/ct.png", alt: "" }),
                            N("span", {
                              className: "betTableHeader",
                              children: [h.length, " Bets Total"],
                            }),
                            N("span", {
                              className: "betTableHeader end",
                              children: [
                                w(Xt, {}),
                                w(bo, {
                                  className: "counter",
                                  start:
                                    parseFloat(
                                      h
                                        .reduce((S, _) => S + _.betAmount, 0)
                                        .toFixed(2)
                                    ) -
                                      ((We = h[h.length - 1]) == null
                                        ? void 0
                                        : We.betAmount) || 0,
                                  end: parseFloat(
                                    h
                                      .reduce((S, _) => S + _.betAmount, 0)
                                      .toFixed(2)
                                  ),
                                  duration: 0.75,
                                  decimals: 2,
                                  smartEasingThreshold: 0,
                                  smartEasingAmount: 0,
                                }),
                              ],
                            }),
                          ],
                        }),
                        h.length > 0 &&
                          w("div", {
                            className: `betsSection ${
                              h.length > 9 && "moreThanTenBets"
                            }`,
                            children: h.map((S, _) =>
                              N(
                                "div",
                                {
                                  className: "bet",
                                  children: [
                                    w("img", {
                                      src: S.user.avatarUrl,
                                      alt: "",
                                    }),
                                    w("span", {
                                      className: "name",
                                      children: S.user.personaName,
                                    }),
                                    w("span", {
                                      className: "bet",
                                      children: S.betAmount.toFixed(2),
                                    }),
                                  ],
                                },
                                _
                              )
                            ),
                          }),
                      ],
                    }),
                  }),
                ],
              }),
            ],
          }),
          N("div", {
            className: "circles",
            children: [
              w("li", {}),
              w("li", {}),
              w("li", {}),
              w("li", {}),
              w("li", {}),
              w("li", {}),
              w("li", {}),
              w("li", {}),
              w("li", {}),
              w("li", {}),
            ],
          }),
        ],
      })
    );
  },
  xO = () =>
    w(In, {
      children: w("div", { className: "innerPage", children: w(PO, {}) }),
    }),
  kO = () => {
    const e = Ze((i) => i.accountState),
      t = Tr().search,
      n = new URLSearchParams(t).get("d"),
      r = Bn();
    return (
      O.useEffect(() => {
        r(YC(n));
      }, [n]),
      e.token
        ? w(In, {
            children: w("div", {
              className: "innerPage",
              children: w("div", {
                className: "dashboard",
                style: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
                children: w(tv, { color: "#333" }),
              }),
            }),
          })
        : w(hs, { to: "/roulette" })
    );
  };
const bO = (e) =>
  Ca.get(zn + "/api/account/link", {
    headers: { Authorization: "Bearer " + e || localStorage.getItem("token") },
  });
let _O = { data: "" },
  TO = (e) =>
    typeof window == "object"
      ? (
          (e ? e.querySelector("#_goober") : window._goober) ||
          Object.assign(
            (e || document.head).appendChild(document.createElement("style")),
            { innerHTML: " ", id: "_goober" }
          )
        ).firstChild
      : e || _O,
  RO = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,
  NO = /\/\*[^]*?\*\/|  +/g,
  wh = /\n+/g,
  Kt = (e, t) => {
    let n = "",
      r = "",
      i = "";
    for (let o in e) {
      let s = e[o];
      o[0] == "@"
        ? o[1] == "i"
          ? (n = o + " " + s + ";")
          : (r +=
              o[1] == "f"
                ? Kt(s, o)
                : o + "{" + Kt(s, o[1] == "k" ? "" : t) + "}")
        : typeof s == "object"
        ? (r += Kt(
            s,
            t
              ? t.replace(/([^,])+/g, (a) =>
                  o.replace(/(^:.*)|([^,])+/g, (u) =>
                    /&/.test(u) ? u.replace(/&/g, a) : a ? a + " " + u : u
                  )
                )
              : o
          ))
        : s != null &&
          ((o = /^--/.test(o) ? o : o.replace(/[A-Z]/g, "-$&").toLowerCase()),
          (i += Kt.p ? Kt.p(o, s) : o + ":" + s + ";"));
    }
    return n + (t && i ? t + "{" + i + "}" : i) + r;
  },
  xt = {},
  nv = (e) => {
    if (typeof e == "object") {
      let t = "";
      for (let n in e) t += n + nv(e[n]);
      return t;
    }
    return e;
  },
  AO = (e, t, n, r, i) => {
    let o = nv(e),
      s =
        xt[o] ||
        (xt[o] = ((u) => {
          let l = 0,
            c = 11;
          for (; l < u.length; ) c = (101 * c + u.charCodeAt(l++)) >>> 0;
          return "go" + c;
        })(o));
    if (!xt[s]) {
      let u =
        o !== e
          ? e
          : ((l) => {
              let c,
                f,
                d = [{}];
              for (; (c = RO.exec(l.replace(NO, ""))); )
                c[4]
                  ? d.shift()
                  : c[3]
                  ? ((f = c[3].replace(wh, " ").trim()),
                    d.unshift((d[0][f] = d[0][f] || {})))
                  : (d[0][c[1]] = c[2].replace(wh, " ").trim());
              return d[0];
            })(e);
      xt[s] = Kt(i ? { ["@keyframes " + s]: u } : u, n ? "" : "." + s);
    }
    let a = n && xt.g ? xt.g : null;
    return (
      n && (xt.g = xt[s]),
      ((u, l, c, f) => {
        f
          ? (l.data = l.data.replace(f, u))
          : l.data.indexOf(u) === -1 && (l.data = c ? u + l.data : l.data + u);
      })(xt[s], t, r, a),
      s
    );
  },
  $O = (e, t, n) =>
    e.reduce((r, i, o) => {
      let s = t[o];
      if (s && s.call) {
        let a = s(n),
          u = (a && a.props && a.props.className) || (/^go/.test(a) && a);
        s = u
          ? "." + u
          : a && typeof a == "object"
          ? a.props
            ? ""
            : Kt(a, "")
          : a === !1
          ? ""
          : a;
      }
      return r + i + (s ?? "");
    }, "");
function Oa(e) {
  let t = this || {},
    n = e.call ? e(t.p) : e;
  return AO(
    n.unshift
      ? n.raw
        ? $O(n, [].slice.call(arguments, 1), t.p)
        : n.reduce((r, i) => Object.assign(r, i && i.call ? i(t.p) : i), {})
      : n,
    TO(t.target),
    t.g,
    t.o,
    t.k
  );
}
let rv, Al, $l;
Oa.bind({ g: 1 });
let It = Oa.bind({ k: 1 });
function DO(e, t, n, r) {
  (Kt.p = t), (rv = e), (Al = n), ($l = r);
}
function Sn(e, t) {
  let n = this || {};
  return function () {
    let r = arguments;
    function i(o, s) {
      let a = Object.assign({}, o),
        u = a.className || i.className;
      (n.p = Object.assign({ theme: Al && Al() }, a)),
        (n.o = / *go\d+/.test(u)),
        (a.className = Oa.apply(n, r) + (u ? " " + u : "")),
        t && (a.ref = s);
      let l = e;
      return (
        e[0] && ((l = a.as || e), delete a.as), $l && l[0] && $l(a), rv(l, a)
      );
    }
    return t ? t(i) : i;
  };
}
var FO = (e) => typeof e == "function",
  As = (e, t) => (FO(e) ? e(t) : e),
  LO = (() => {
    let e = 0;
    return () => (++e).toString();
  })(),
  iv = (() => {
    let e;
    return () => {
      if (e === void 0 && typeof window < "u") {
        let t = matchMedia("(prefers-reduced-motion: reduce)");
        e = !t || t.matches;
      }
      return e;
    };
  })(),
  IO = 20,
  Fo = new Map(),
  MO = 1e3,
  Sh = (e) => {
    if (Fo.has(e)) return;
    let t = setTimeout(() => {
      Fo.delete(e), Vn({ type: 4, toastId: e });
    }, MO);
    Fo.set(e, t);
  },
  jO = (e) => {
    let t = Fo.get(e);
    t && clearTimeout(t);
  },
  Dl = (e, t) => {
    switch (t.type) {
      case 0:
        return { ...e, toasts: [t.toast, ...e.toasts].slice(0, IO) };
      case 1:
        return (
          t.toast.id && jO(t.toast.id),
          {
            ...e,
            toasts: e.toasts.map((o) =>
              o.id === t.toast.id ? { ...o, ...t.toast } : o
            ),
          }
        );
      case 2:
        let { toast: n } = t;
        return e.toasts.find((o) => o.id === n.id)
          ? Dl(e, { type: 1, toast: n })
          : Dl(e, { type: 0, toast: n });
      case 3:
        let { toastId: r } = t;
        return (
          r
            ? Sh(r)
            : e.toasts.forEach((o) => {
                Sh(o.id);
              }),
          {
            ...e,
            toasts: e.toasts.map((o) =>
              o.id === r || r === void 0 ? { ...o, visible: !1 } : o
            ),
          }
        );
      case 4:
        return t.toastId === void 0
          ? { ...e, toasts: [] }
          : { ...e, toasts: e.toasts.filter((o) => o.id !== t.toastId) };
      case 5:
        return { ...e, pausedAt: t.time };
      case 6:
        let i = t.time - (e.pausedAt || 0);
        return {
          ...e,
          pausedAt: void 0,
          toasts: e.toasts.map((o) => ({
            ...o,
            pauseDuration: o.pauseDuration + i,
          })),
        };
    }
  },
  Lo = [],
  Io = { toasts: [], pausedAt: void 0 },
  Vn = (e) => {
    (Io = Dl(Io, e)),
      Lo.forEach((t) => {
        t(Io);
      });
  },
  UO = { blank: 4e3, error: 4e3, success: 2e3, loading: 1 / 0, custom: 4e3 },
  BO = (e = {}) => {
    let [t, n] = O.useState(Io);
    O.useEffect(
      () => (
        Lo.push(n),
        () => {
          let i = Lo.indexOf(n);
          i > -1 && Lo.splice(i, 1);
        }
      ),
      [t]
    );
    let r = t.toasts.map((i) => {
      var o, s;
      return {
        ...e,
        ...e[i.type],
        ...i,
        duration:
          i.duration ||
          ((o = e[i.type]) == null ? void 0 : o.duration) ||
          (e == null ? void 0 : e.duration) ||
          UO[i.type],
        style: {
          ...e.style,
          ...((s = e[i.type]) == null ? void 0 : s.style),
          ...i.style,
        },
      };
    });
    return { ...t, toasts: r };
  },
  zO = (e, t = "blank", n) => ({
    createdAt: Date.now(),
    visible: !0,
    type: t,
    ariaProps: { role: "status", "aria-live": "polite" },
    message: e,
    pauseDuration: 0,
    ...n,
    id: (n == null ? void 0 : n.id) || LO(),
  }),
  Qi = (e) => (t, n) => {
    let r = zO(t, e, n);
    return Vn({ type: 2, toast: r }), r.id;
  },
  Ue = (e, t) => Qi("blank")(e, t);
Ue.error = Qi("error");
Ue.success = Qi("success");
Ue.loading = Qi("loading");
Ue.custom = Qi("custom");
Ue.dismiss = (e) => {
  Vn({ type: 3, toastId: e });
};
Ue.remove = (e) => Vn({ type: 4, toastId: e });
Ue.promise = (e, t, n) => {
  let r = Ue.loading(t.loading, { ...n, ...(n == null ? void 0 : n.loading) });
  return (
    e
      .then(
        (i) => (
          Ue.success(As(t.success, i), {
            id: r,
            ...n,
            ...(n == null ? void 0 : n.success),
          }),
          i
        )
      )
      .catch((i) => {
        Ue.error(As(t.error, i), {
          id: r,
          ...n,
          ...(n == null ? void 0 : n.error),
        });
      }),
    e
  );
};
var VO = (e, t) => {
    Vn({ type: 1, toast: { id: e, height: t } });
  },
  QO = () => {
    Vn({ type: 5, time: Date.now() });
  },
  qO = (e) => {
    let { toasts: t, pausedAt: n } = BO(e);
    O.useEffect(() => {
      if (n) return;
      let o = Date.now(),
        s = t.map((a) => {
          if (a.duration === 1 / 0) return;
          let u = (a.duration || 0) + a.pauseDuration - (o - a.createdAt);
          if (u < 0) {
            a.visible && Ue.dismiss(a.id);
            return;
          }
          return setTimeout(() => Ue.dismiss(a.id), u);
        });
      return () => {
        s.forEach((a) => a && clearTimeout(a));
      };
    }, [t, n]);
    let r = O.useCallback(() => {
        n && Vn({ type: 6, time: Date.now() });
      }, [n]),
      i = O.useCallback(
        (o, s) => {
          let {
              reverseOrder: a = !1,
              gutter: u = 8,
              defaultPosition: l,
            } = s || {},
            c = t.filter(
              (y) => (y.position || l) === (o.position || l) && y.height
            ),
            f = c.findIndex((y) => y.id === o.id),
            d = c.filter((y, p) => p < f && y.visible).length;
          return c
            .filter((y) => y.visible)
            .slice(...(a ? [d + 1] : [0, d]))
            .reduce((y, p) => y + (p.height || 0) + u, 0);
        },
        [t]
      );
    return {
      toasts: t,
      handlers: {
        updateHeight: VO,
        startPause: QO,
        endPause: r,
        calculateOffset: i,
      },
    };
  },
  HO = It`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,
  WO = It`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,
  KO = It`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,
  GO = Sn("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e) => e.primary || "#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${HO} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${WO} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${(e) => e.secondary || "#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${KO} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,
  YO = It`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,
  JO = Sn("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${(e) => e.secondary || "#e0e0e0"};
  border-right-color: ${(e) => e.primary || "#616161"};
  animation: ${YO} 1s linear infinite;
`,
  XO = It`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,
  ZO = It`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,
  eP = Sn("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e) => e.primary || "#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${XO} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${ZO} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${(e) => e.secondary || "#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,
  tP = Sn("div")`
  position: absolute;
`,
  nP = Sn("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,
  rP = It`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,
  iP = Sn("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${rP} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,
  oP = ({ toast: e }) => {
    let { icon: t, type: n, iconTheme: r } = e;
    return t !== void 0
      ? typeof t == "string"
        ? O.createElement(iP, null, t)
        : t
      : n === "blank"
      ? null
      : O.createElement(
          nP,
          null,
          O.createElement(JO, { ...r }),
          n !== "loading" &&
            O.createElement(
              tP,
              null,
              n === "error"
                ? O.createElement(GO, { ...r })
                : O.createElement(eP, { ...r })
            )
        );
  },
  sP = (e) => `
0% {transform: translate3d(0,${e * -200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,
  aP = (e) => `
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e * -150}%,-1px) scale(.6); opacity:0;}
`,
  uP = "0%{opacity:0;} 100%{opacity:1;}",
  lP = "0%{opacity:1;} 100%{opacity:0;}",
  cP = Sn("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,
  fP = Sn("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,
  dP = (e, t) => {
    let n = e.includes("top") ? 1 : -1,
      [r, i] = iv() ? [uP, lP] : [sP(n), aP(n)];
    return {
      animation: t
        ? `${It(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`
        : `${It(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`,
    };
  },
  hP = O.memo(({ toast: e, position: t, style: n, children: r }) => {
    let i = e.height
        ? dP(e.position || t || "top-center", e.visible)
        : { opacity: 0 },
      o = O.createElement(oP, { toast: e }),
      s = O.createElement(fP, { ...e.ariaProps }, As(e.message, e));
    return O.createElement(
      cP,
      { className: e.className, style: { ...i, ...n, ...e.style } },
      typeof r == "function"
        ? r({ icon: o, message: s })
        : O.createElement(O.Fragment, null, o, s)
    );
  });
DO(O.createElement);
var pP = ({
    id: e,
    className: t,
    style: n,
    onHeightUpdate: r,
    children: i,
  }) => {
    let o = O.useCallback(
      (s) => {
        if (s) {
          let a = () => {
            let u = s.getBoundingClientRect().height;
            r(e, u);
          };
          a(),
            new MutationObserver(a).observe(s, {
              subtree: !0,
              childList: !0,
              characterData: !0,
            });
        }
      },
      [e, r]
    );
    return O.createElement("div", { ref: o, className: t, style: n }, i);
  },
  mP = (e, t) => {
    let n = e.includes("top"),
      r = n ? { top: 0 } : { bottom: 0 },
      i = e.includes("center")
        ? { justifyContent: "center" }
        : e.includes("right")
        ? { justifyContent: "flex-end" }
        : {};
    return {
      left: 0,
      right: 0,
      display: "flex",
      position: "absolute",
      transition: iv() ? void 0 : "all 230ms cubic-bezier(.21,1.02,.73,1)",
      transform: `translateY(${t * (n ? 1 : -1)}px)`,
      ...r,
      ...i,
    };
  },
  yP = Oa`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,
  fo = 16,
  vP = ({
    reverseOrder: e,
    position: t = "top-center",
    toastOptions: n,
    gutter: r,
    children: i,
    containerStyle: o,
    containerClassName: s,
  }) => {
    let { toasts: a, handlers: u } = qO(n);
    return O.createElement(
      "div",
      {
        style: {
          position: "fixed",
          zIndex: 9999,
          top: fo,
          left: fo,
          right: fo,
          bottom: fo,
          pointerEvents: "none",
          ...o,
        },
        className: s,
        onMouseEnter: u.startPause,
        onMouseLeave: u.endPause,
      },
      a.map((l) => {
        let c = l.position || t,
          f = u.calculateOffset(l, {
            reverseOrder: e,
            gutter: r,
            defaultPosition: t,
          }),
          d = mP(c, f);
        return O.createElement(
          pP,
          {
            id: l.id,
            key: l.id,
            onHeightUpdate: u.updateHeight,
            className: l.visible ? yP : "",
            style: d,
          },
          l.type === "custom"
            ? As(l.message, l)
            : i
            ? i(l)
            : O.createElement(hP, { toast: l, position: c })
        );
      })
    );
  },
  gP = Ue;
const wP = () => {
    const e = Bn(),
      t = Ze((r) => r.accountState),
      { data: n } = bs({
        queryKey: ["account"],
        queryFn: () => uf(t.token),
        onError: () => e(Ts()),
        enabled: t.token !== null,
      });
    return t.token
      ? N(In, {
          children: [
            w("div", {
              className: "accountTabContent",
              children: N("div", {
                className: "accountDetails",
                children: [
                  w("img", {
                    src: n == null ? void 0 : n.data.avatarUrl,
                    alt: "",
                  }),
                  N("div", {
                    className: "displayInformation",
                    children: [
                      N("span", {
                        className: "accountName",
                        children: [
                          n == null ? void 0 : n.data.personaName,
                          N("span", {
                            className: "steamId",
                            children: [
                              "(",
                              n == null ? void 0 : n.data.steamId,
                              ")",
                            ],
                          }),
                        ],
                      }),
                      w("span", {
                        className: "accountRealName",
                        children: n == null ? void 0 : n.data.realName,
                      }),
                    ],
                  }),
                ],
              }),
            }),
            N("div", {
              className: "accountTabContent removeBottomPadding",
              children: [
                w("h3", { children: "Bet Statistics" }),
                w("div", { className: "divider" }),
                N("div", {
                  className: "betStat",
                  children: [
                    w("span", { className: "left", children: "Total Bets" }),
                    N("span", {
                      className: "right",
                      children: [w(Xt, {}), " 0.00"],
                    }),
                  ],
                }),
                N("div", {
                  className: "betStat noGap",
                  children: [
                    w("span", { className: "left", children: "Bet Profits" }),
                    N("span", {
                      className: "right",
                      children: [w(Xt, {}), " 0.00"],
                    }),
                  ],
                }),
              ],
            }),
            N("div", {
              className: "accountTabContent",
              children: [
                w("h3", { children: "Security" }),
                N("div", {
                  className: "buttonList",
                  children: [
                    w("button", {
                      onClick: () => {
                        e(Ts());
                      },
                      className: "default red",
                      children: "Log Out",
                    }),
                    w("button", {
                      onClick: () => {
                        bO(t.token).then((r) => {
                          navigator.clipboard.writeText(
                            `${zn}/api/account/link/login?l=${r.data.link.id}`
                          ),
                            gP("Copied to clipboard!");
                        });
                      },
                      className: "default grey",
                      children: "Generate One-Time Login Link",
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
      : w(hs, { to: "/" });
  },
  SP = () => {
    const { accountPage: e } = D1();
    return w(In, {
      children: w("div", {
        className: "innerPage",
        children: w("div", {
          className: "dashboard accountDashboard",
          children: N("div", {
            className: "innerAccountDashboard",
            children: [
              w("h2", { children: "Account" }),
              N("div", {
                className: "accountTabContainer",
                children: [
                  w("div", {
                    className: "accountTabs",
                    children: w(Gr, {
                      to: "/account/details",
                      className: `accountTab ${e === "details" && "active"}`,
                      children: "Details",
                    }),
                  }),
                  w("div", {
                    className: "accountContentContainer",
                    children: e === "details" && w(wP, {}),
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
    });
  };
const EP = ({ children: e }) => {
    const n = Ze((r) => r.mainState.prompts).some((r) => r.enabled);
    return Mm.createPortal(
      w("div", { className: `prompt-container ${!n && "none"}`, children: e }),
      document.getElementById("prompt-container")
    );
  },
  CP = () => {
    var i;
    const e = Bn(),
      n =
        (i = Ze((o) => o.mainState.prompts).find(
          (o) => o.name === "nofunds"
        )) == null
          ? void 0
          : i.enabled,
      r = () => e(pr({ name: "nofunds", enabled: !1 }));
    return N("div", {
      className: `prompt ${n && "show"}`,
      children: [
        w("div", { onClick: r, className: "close", children: w(Ai, {}) }),
        w("h1", { children: "Encountered Error!" }),
        w("span", {
          children:
            "You do not have enough funds to place this bet. Please deposit more funds.",
        }),
        w("button", { onClick: r, className: "default ok", children: "OK" }),
      ],
    });
  },
  OP = () => {
    var i;
    const e = Bn(),
      n =
        (i = Ze((o) => o.mainState.prompts).find(
          (o) => o.name === "nosignin"
        )) == null
          ? void 0
          : i.enabled,
      r = () => e(pr({ name: "nosignin", enabled: !1 }));
    return N("div", {
      className: `prompt ${n && "show"}`,
      children: [
        w("div", { onClick: r, className: "close", children: w(Ai, {}) }),
        w("h1", { children: "Encountered Error!" }),
        w("span", {
          children:
            "You are currently not signed in. Please sign in via steam to place bets.",
        }),
        w("button", { onClick: r, className: "default ok", children: "OK" }),
      ],
    });
  },
  PP = () => {
    var i;
    const e = Bn(),
      n =
        (i = Ze((o) => o.mainState.prompts).find((o) => o.name === "minbet")) ==
        null
          ? void 0
          : i.enabled,
      r = () => e(pr({ name: "minbet", enabled: !1 }));
    return N("div", {
      className: `prompt ${n && "show"}`,
      children: [
        w("div", { onClick: r, className: "close", children: w(Ai, {}) }),
        w("h1", { children: "Encountered Error!" }),
        w("span", {
          children:
            "The minimum bet is 0.01. Please place a bet higher than this amount for it to be accepted.",
        }),
        w("button", { onClick: r, className: "default ok", children: "OK" }),
      ],
    });
  },
  xP = () =>
    N(In, {
      children: [
        N(EP, { children: [w(CP, {}), w(OP, {}), w(PP, {})] }),
        w(eO, {}),
        w("div", {
          className: "page",
          children: N(q1, {
            children: [
              w(Hn, { path: "/login", element: w(kO, {}) }),
              w(Hn, { path: "/roulette", element: w(xO, {}) }),
              w(Hn, { path: "/account/:accountPage", element: w(SP, {}) }),
              w(Hn, {
                path: "/account",
                element: w(hs, { to: "/account/details" }),
              }),
              w(Hn, { path: "/*", element: w(hs, { to: "/roulette" }) }),
            ],
          }),
        }),
      ],
    }),
  Ot = Object.create(null);
Ot.open = "0";
Ot.close = "1";
Ot.ping = "2";
Ot.pong = "3";
Ot.message = "4";
Ot.upgrade = "5";
Ot.noop = "6";
const Mo = Object.create(null);
Object.keys(Ot).forEach((e) => {
  Mo[Ot[e]] = e;
});
const kP = { type: "error", data: "parser error" },
  bP =
    typeof Blob == "function" ||
    (typeof Blob < "u" &&
      Object.prototype.toString.call(Blob) === "[object BlobConstructor]"),
  _P = typeof ArrayBuffer == "function",
  TP = (e) =>
    typeof ArrayBuffer.isView == "function"
      ? ArrayBuffer.isView(e)
      : e && e.buffer instanceof ArrayBuffer,
  ov = ({ type: e, data: t }, n, r) =>
    bP && t instanceof Blob
      ? n
        ? r(t)
        : Eh(t, r)
      : _P && (t instanceof ArrayBuffer || TP(t))
      ? n
        ? r(t)
        : Eh(new Blob([t]), r)
      : r(Ot[e] + (t || "")),
  Eh = (e, t) => {
    const n = new FileReader();
    return (
      (n.onload = function () {
        const r = n.result.split(",")[1];
        t("b" + (r || ""));
      }),
      n.readAsDataURL(e)
    );
  },
  Ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  Xr = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let e = 0; e < Ch.length; e++) Xr[Ch.charCodeAt(e)] = e;
const RP = (e) => {
    let t = e.length * 0.75,
      n = e.length,
      r,
      i = 0,
      o,
      s,
      a,
      u;
    e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--);
    const l = new ArrayBuffer(t),
      c = new Uint8Array(l);
    for (r = 0; r < n; r += 4)
      (o = Xr[e.charCodeAt(r)]),
        (s = Xr[e.charCodeAt(r + 1)]),
        (a = Xr[e.charCodeAt(r + 2)]),
        (u = Xr[e.charCodeAt(r + 3)]),
        (c[i++] = (o << 2) | (s >> 4)),
        (c[i++] = ((s & 15) << 4) | (a >> 2)),
        (c[i++] = ((a & 3) << 6) | (u & 63));
    return l;
  },
  NP = typeof ArrayBuffer == "function",
  sv = (e, t) => {
    if (typeof e != "string") return { type: "message", data: av(e, t) };
    const n = e.charAt(0);
    return n === "b"
      ? { type: "message", data: AP(e.substring(1), t) }
      : Mo[n]
      ? e.length > 1
        ? { type: Mo[n], data: e.substring(1) }
        : { type: Mo[n] }
      : kP;
  },
  AP = (e, t) => {
    if (NP) {
      const n = RP(e);
      return av(n, t);
    } else return { base64: !0, data: e };
  },
  av = (e, t) => {
    switch (t) {
      case "blob":
        return e instanceof ArrayBuffer ? new Blob([e]) : e;
      case "arraybuffer":
      default:
        return e;
    }
  },
  uv = String.fromCharCode(30),
  $P = (e, t) => {
    const n = e.length,
      r = new Array(n);
    let i = 0;
    e.forEach((o, s) => {
      ov(o, !1, (a) => {
        (r[s] = a), ++i === n && t(r.join(uv));
      });
    });
  },
  DP = (e, t) => {
    const n = e.split(uv),
      r = [];
    for (let i = 0; i < n.length; i++) {
      const o = sv(n[i], t);
      if ((r.push(o), o.type === "error")) break;
    }
    return r;
  },
  lv = 4;
function ae(e) {
  if (e) return FP(e);
}
function FP(e) {
  for (var t in ae.prototype) e[t] = ae.prototype[t];
  return e;
}
ae.prototype.on = ae.prototype.addEventListener = function (e, t) {
  return (
    (this._callbacks = this._callbacks || {}),
    (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t),
    this
  );
};
ae.prototype.once = function (e, t) {
  function n() {
    this.off(e, n), t.apply(this, arguments);
  }
  return (n.fn = t), this.on(e, n), this;
};
ae.prototype.off =
  ae.prototype.removeListener =
  ae.prototype.removeAllListeners =
  ae.prototype.removeEventListener =
    function (e, t) {
      if (((this._callbacks = this._callbacks || {}), arguments.length == 0))
        return (this._callbacks = {}), this;
      var n = this._callbacks["$" + e];
      if (!n) return this;
      if (arguments.length == 1) return delete this._callbacks["$" + e], this;
      for (var r, i = 0; i < n.length; i++)
        if (((r = n[i]), r === t || r.fn === t)) {
          n.splice(i, 1);
          break;
        }
      return n.length === 0 && delete this._callbacks["$" + e], this;
    };
ae.prototype.emit = function (e) {
  this._callbacks = this._callbacks || {};
  for (
    var t = new Array(arguments.length - 1),
      n = this._callbacks["$" + e],
      r = 1;
    r < arguments.length;
    r++
  )
    t[r - 1] = arguments[r];
  if (n) {
    n = n.slice(0);
    for (var r = 0, i = n.length; r < i; ++r) n[r].apply(this, t);
  }
  return this;
};
ae.prototype.emitReserved = ae.prototype.emit;
ae.prototype.listeners = function (e) {
  return (
    (this._callbacks = this._callbacks || {}), this._callbacks["$" + e] || []
  );
};
ae.prototype.hasListeners = function (e) {
  return !!this.listeners(e).length;
};
const Ye = (() =>
  typeof self < "u"
    ? self
    : typeof window < "u"
    ? window
    : Function("return this")())();
function cv(e, ...t) {
  return t.reduce((n, r) => (e.hasOwnProperty(r) && (n[r] = e[r]), n), {});
}
const LP = Ye.setTimeout,
  IP = Ye.clearTimeout;
function Pa(e, t) {
  t.useNativeTimers
    ? ((e.setTimeoutFn = LP.bind(Ye)), (e.clearTimeoutFn = IP.bind(Ye)))
    : ((e.setTimeoutFn = Ye.setTimeout.bind(Ye)),
      (e.clearTimeoutFn = Ye.clearTimeout.bind(Ye)));
}
const MP = 1.33;
function jP(e) {
  return typeof e == "string"
    ? UP(e)
    : Math.ceil((e.byteLength || e.size) * MP);
}
function UP(e) {
  let t = 0,
    n = 0;
  for (let r = 0, i = e.length; r < i; r++)
    (t = e.charCodeAt(r)),
      t < 128
        ? (n += 1)
        : t < 2048
        ? (n += 2)
        : t < 55296 || t >= 57344
        ? (n += 3)
        : (r++, (n += 4));
  return n;
}
class BP extends Error {
  constructor(t, n, r) {
    super(t),
      (this.description = n),
      (this.context = r),
      (this.type = "TransportError");
  }
}
class fv extends ae {
  constructor(t) {
    super(),
      (this.writable = !1),
      Pa(this, t),
      (this.opts = t),
      (this.query = t.query),
      (this.socket = t.socket);
  }
  onError(t, n, r) {
    return super.emitReserved("error", new BP(t, n, r)), this;
  }
  open() {
    return (this.readyState = "opening"), this.doOpen(), this;
  }
  close() {
    return (
      (this.readyState === "opening" || this.readyState === "open") &&
        (this.doClose(), this.onClose()),
      this
    );
  }
  send(t) {
    this.readyState === "open" && this.write(t);
  }
  onOpen() {
    (this.readyState = "open"),
      (this.writable = !0),
      super.emitReserved("open");
  }
  onData(t) {
    const n = sv(t, this.socket.binaryType);
    this.onPacket(n);
  }
  onPacket(t) {
    super.emitReserved("packet", t);
  }
  onClose(t) {
    (this.readyState = "closed"), super.emitReserved("close", t);
  }
  pause(t) {}
}
const dv =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(
      ""
    ),
  Fl = 64,
  zP = {};
let Oh = 0,
  ho = 0,
  Ph;
function xh(e) {
  let t = "";
  do (t = dv[e % Fl] + t), (e = Math.floor(e / Fl));
  while (e > 0);
  return t;
}
function hv() {
  const e = xh(+new Date());
  return e !== Ph ? ((Oh = 0), (Ph = e)) : e + "." + xh(Oh++);
}
for (; ho < Fl; ho++) zP[dv[ho]] = ho;
function pv(e) {
  let t = "";
  for (let n in e)
    e.hasOwnProperty(n) &&
      (t.length && (t += "&"),
      (t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n])));
  return t;
}
function VP(e) {
  let t = {},
    n = e.split("&");
  for (let r = 0, i = n.length; r < i; r++) {
    let o = n[r].split("=");
    t[decodeURIComponent(o[0])] = decodeURIComponent(o[1]);
  }
  return t;
}
let mv = !1;
try {
  mv = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {}
const QP = mv;
function yv(e) {
  const t = e.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!t || QP)) return new XMLHttpRequest();
  } catch {}
  if (!t)
    try {
      return new Ye[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {}
}
function qP() {}
const HP = (function () {
  return new yv({ xdomain: !1 }).responseType != null;
})();
class WP extends fv {
  constructor(t) {
    if ((super(t), (this.polling = !1), typeof location < "u")) {
      const r = location.protocol === "https:";
      let i = location.port;
      i || (i = r ? "443" : "80"),
        (this.xd =
          (typeof location < "u" && t.hostname !== location.hostname) ||
          i !== t.port),
        (this.xs = t.secure !== r);
    }
    const n = t && t.forceBase64;
    this.supportsBinary = HP && !n;
  }
  get name() {
    return "polling";
  }
  doOpen() {
    this.poll();
  }
  pause(t) {
    this.readyState = "pausing";
    const n = () => {
      (this.readyState = "paused"), t();
    };
    if (this.polling || !this.writable) {
      let r = 0;
      this.polling &&
        (r++,
        this.once("pollComplete", function () {
          --r || n();
        })),
        this.writable ||
          (r++,
          this.once("drain", function () {
            --r || n();
          }));
    } else n();
  }
  poll() {
    (this.polling = !0), this.doPoll(), this.emitReserved("poll");
  }
  onData(t) {
    const n = (r) => {
      if (
        (this.readyState === "opening" && r.type === "open" && this.onOpen(),
        r.type === "close")
      )
        return (
          this.onClose({ description: "transport closed by the server" }), !1
        );
      this.onPacket(r);
    };
    DP(t, this.socket.binaryType).forEach(n),
      this.readyState !== "closed" &&
        ((this.polling = !1),
        this.emitReserved("pollComplete"),
        this.readyState === "open" && this.poll());
  }
  doClose() {
    const t = () => {
      this.write([{ type: "close" }]);
    };
    this.readyState === "open" ? t() : this.once("open", t);
  }
  write(t) {
    (this.writable = !1),
      $P(t, (n) => {
        this.doWrite(n, () => {
          (this.writable = !0), this.emitReserved("drain");
        });
      });
  }
  uri() {
    let t = this.query || {};
    const n = this.opts.secure ? "https" : "http";
    let r = "";
    this.opts.timestampRequests !== !1 && (t[this.opts.timestampParam] = hv()),
      !this.supportsBinary && !t.sid && (t.b64 = 1),
      this.opts.port &&
        ((n === "https" && Number(this.opts.port) !== 443) ||
          (n === "http" && Number(this.opts.port) !== 80)) &&
        (r = ":" + this.opts.port);
    const i = pv(t),
      o = this.opts.hostname.indexOf(":") !== -1;
    return (
      n +
      "://" +
      (o ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
      r +
      this.opts.path +
      (i.length ? "?" + i : "")
    );
  }
  request(t = {}) {
    return (
      Object.assign(t, { xd: this.xd, xs: this.xs }, this.opts),
      new Ct(this.uri(), t)
    );
  }
  doWrite(t, n) {
    const r = this.request({ method: "POST", data: t });
    r.on("success", n),
      r.on("error", (i, o) => {
        this.onError("xhr post error", i, o);
      });
  }
  doPoll() {
    const t = this.request();
    t.on("data", this.onData.bind(this)),
      t.on("error", (n, r) => {
        this.onError("xhr poll error", n, r);
      }),
      (this.pollXhr = t);
  }
}
class Ct extends ae {
  constructor(t, n) {
    super(),
      Pa(this, n),
      (this.opts = n),
      (this.method = n.method || "GET"),
      (this.uri = t),
      (this.async = n.async !== !1),
      (this.data = n.data !== void 0 ? n.data : null),
      this.create();
  }
  create() {
    const t = cv(
      this.opts,
      "agent",
      "pfx",
      "key",
      "passphrase",
      "cert",
      "ca",
      "ciphers",
      "rejectUnauthorized",
      "autoUnref"
    );
    (t.xdomain = !!this.opts.xd), (t.xscheme = !!this.opts.xs);
    const n = (this.xhr = new yv(t));
    try {
      n.open(this.method, this.uri, this.async);
      try {
        if (this.opts.extraHeaders) {
          n.setDisableHeaderCheck && n.setDisableHeaderCheck(!0);
          for (let r in this.opts.extraHeaders)
            this.opts.extraHeaders.hasOwnProperty(r) &&
              n.setRequestHeader(r, this.opts.extraHeaders[r]);
        }
      } catch {}
      if (this.method === "POST")
        try {
          n.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch {}
      try {
        n.setRequestHeader("Accept", "*/*");
      } catch {}
      "withCredentials" in n && (n.withCredentials = this.opts.withCredentials),
        this.opts.requestTimeout && (n.timeout = this.opts.requestTimeout),
        (n.onreadystatechange = () => {
          n.readyState === 4 &&
            (n.status === 200 || n.status === 1223
              ? this.onLoad()
              : this.setTimeoutFn(() => {
                  this.onError(typeof n.status == "number" ? n.status : 0);
                }, 0));
        }),
        n.send(this.data);
    } catch (r) {
      this.setTimeoutFn(() => {
        this.onError(r);
      }, 0);
      return;
    }
    typeof document < "u" &&
      ((this.index = Ct.requestsCount++), (Ct.requests[this.index] = this));
  }
  onError(t) {
    this.emitReserved("error", t, this.xhr), this.cleanup(!0);
  }
  cleanup(t) {
    if (!(typeof this.xhr > "u" || this.xhr === null)) {
      if (((this.xhr.onreadystatechange = qP), t))
        try {
          this.xhr.abort();
        } catch {}
      typeof document < "u" && delete Ct.requests[this.index],
        (this.xhr = null);
    }
  }
  onLoad() {
    const t = this.xhr.responseText;
    t !== null &&
      (this.emitReserved("data", t),
      this.emitReserved("success"),
      this.cleanup());
  }
  abort() {
    this.cleanup();
  }
}
Ct.requestsCount = 0;
Ct.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function") attachEvent("onunload", kh);
  else if (typeof addEventListener == "function") {
    const e = "onpagehide" in Ye ? "pagehide" : "unload";
    addEventListener(e, kh, !1);
  }
}
function kh() {
  for (let e in Ct.requests)
    Ct.requests.hasOwnProperty(e) && Ct.requests[e].abort();
}
const vv = (() =>
    typeof Promise == "function" && typeof Promise.resolve == "function"
      ? (t) => Promise.resolve().then(t)
      : (t, n) => n(t, 0))(),
  po = Ye.WebSocket || Ye.MozWebSocket,
  bh = !0,
  KP = "arraybuffer",
  _h =
    typeof navigator < "u" &&
    typeof navigator.product == "string" &&
    navigator.product.toLowerCase() === "reactnative";
class GP extends fv {
  constructor(t) {
    super(t), (this.supportsBinary = !t.forceBase64);
  }
  get name() {
    return "websocket";
  }
  doOpen() {
    if (!this.check()) return;
    const t = this.uri(),
      n = this.opts.protocols,
      r = _h
        ? {}
        : cv(
            this.opts,
            "agent",
            "perMessageDeflate",
            "pfx",
            "key",
            "passphrase",
            "cert",
            "ca",
            "ciphers",
            "rejectUnauthorized",
            "localAddress",
            "protocolVersion",
            "origin",
            "maxPayload",
            "family",
            "checkServerIdentity"
          );
    this.opts.extraHeaders && (r.headers = this.opts.extraHeaders);
    try {
      this.ws = bh && !_h ? (n ? new po(t, n) : new po(t)) : new po(t, n, r);
    } catch (i) {
      return this.emitReserved("error", i);
    }
    (this.ws.binaryType = this.socket.binaryType || KP),
      this.addEventListeners();
  }
  addEventListeners() {
    (this.ws.onopen = () => {
      this.opts.autoUnref && this.ws._socket.unref(), this.onOpen();
    }),
      (this.ws.onclose = (t) =>
        this.onClose({
          description: "websocket connection closed",
          context: t,
        })),
      (this.ws.onmessage = (t) => this.onData(t.data)),
      (this.ws.onerror = (t) => this.onError("websocket error", t));
  }
  write(t) {
    this.writable = !1;
    for (let n = 0; n < t.length; n++) {
      const r = t[n],
        i = n === t.length - 1;
      ov(r, this.supportsBinary, (o) => {
        const s = {};
        try {
          bh && this.ws.send(o);
        } catch {}
        i &&
          vv(() => {
            (this.writable = !0), this.emitReserved("drain");
          }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    typeof this.ws < "u" && (this.ws.close(), (this.ws = null));
  }
  uri() {
    let t = this.query || {};
    const n = this.opts.secure ? "wss" : "ws";
    let r = "";
    this.opts.port &&
      ((n === "wss" && Number(this.opts.port) !== 443) ||
        (n === "ws" && Number(this.opts.port) !== 80)) &&
      (r = ":" + this.opts.port),
      this.opts.timestampRequests && (t[this.opts.timestampParam] = hv()),
      this.supportsBinary || (t.b64 = 1);
    const i = pv(t),
      o = this.opts.hostname.indexOf(":") !== -1;
    return (
      n +
      "://" +
      (o ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
      r +
      this.opts.path +
      (i.length ? "?" + i : "")
    );
  }
  check() {
    return !!po;
  }
}
const YP = { websocket: GP, polling: WP },
  JP =
    /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
  XP = [
    "source",
    "protocol",
    "authority",
    "userInfo",
    "user",
    "password",
    "host",
    "port",
    "relative",
    "path",
    "directory",
    "file",
    "query",
    "anchor",
  ];
function Ll(e) {
  const t = e,
    n = e.indexOf("["),
    r = e.indexOf("]");
  n != -1 &&
    r != -1 &&
    (e =
      e.substring(0, n) +
      e.substring(n, r).replace(/:/g, ";") +
      e.substring(r, e.length));
  let i = JP.exec(e || ""),
    o = {},
    s = 14;
  for (; s--; ) o[XP[s]] = i[s] || "";
  return (
    n != -1 &&
      r != -1 &&
      ((o.source = t),
      (o.host = o.host.substring(1, o.host.length - 1).replace(/;/g, ":")),
      (o.authority = o.authority
        .replace("[", "")
        .replace("]", "")
        .replace(/;/g, ":")),
      (o.ipv6uri = !0)),
    (o.pathNames = ZP(o, o.path)),
    (o.queryKey = ex(o, o.query)),
    o
  );
}
function ZP(e, t) {
  const n = /\/{2,9}/g,
    r = t.replace(n, "/").split("/");
  return (
    (t.slice(0, 1) == "/" || t.length === 0) && r.splice(0, 1),
    t.slice(-1) == "/" && r.splice(r.length - 1, 1),
    r
  );
}
function ex(e, t) {
  const n = {};
  return (
    t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (r, i, o) {
      i && (n[i] = o);
    }),
    n
  );
}
let gv = class Wn extends ae {
  constructor(t, n = {}) {
    super(),
      (this.writeBuffer = []),
      t && typeof t == "object" && ((n = t), (t = null)),
      t
        ? ((t = Ll(t)),
          (n.hostname = t.host),
          (n.secure = t.protocol === "https" || t.protocol === "wss"),
          (n.port = t.port),
          t.query && (n.query = t.query))
        : n.host && (n.hostname = Ll(n.host).host),
      Pa(this, n),
      (this.secure =
        n.secure != null
          ? n.secure
          : typeof location < "u" && location.protocol === "https:"),
      n.hostname && !n.port && (n.port = this.secure ? "443" : "80"),
      (this.hostname =
        n.hostname ||
        (typeof location < "u" ? location.hostname : "localhost")),
      (this.port =
        n.port ||
        (typeof location < "u" && location.port
          ? location.port
          : this.secure
          ? "443"
          : "80")),
      (this.transports = n.transports || ["polling", "websocket"]),
      (this.writeBuffer = []),
      (this.prevBufferLen = 0),
      (this.opts = Object.assign(
        {
          path: "/engine.io",
          agent: !1,
          withCredentials: !1,
          upgrade: !0,
          timestampParam: "t",
          rememberUpgrade: !1,
          addTrailingSlash: !0,
          rejectUnauthorized: !0,
          perMessageDeflate: { threshold: 1024 },
          transportOptions: {},
          closeOnBeforeunload: !0,
        },
        n
      )),
      (this.opts.path =
        this.opts.path.replace(/\/$/, "") +
        (this.opts.addTrailingSlash ? "/" : "")),
      typeof this.opts.query == "string" &&
        (this.opts.query = VP(this.opts.query)),
      (this.id = null),
      (this.upgrades = null),
      (this.pingInterval = null),
      (this.pingTimeout = null),
      (this.pingTimeoutTimer = null),
      typeof addEventListener == "function" &&
        (this.opts.closeOnBeforeunload &&
          ((this.beforeunloadEventListener = () => {
            this.transport &&
              (this.transport.removeAllListeners(), this.transport.close());
          }),
          addEventListener("beforeunload", this.beforeunloadEventListener, !1)),
        this.hostname !== "localhost" &&
          ((this.offlineEventListener = () => {
            this.onClose("transport close", {
              description: "network connection lost",
            });
          }),
          addEventListener("offline", this.offlineEventListener, !1))),
      this.open();
  }
  createTransport(t) {
    const n = Object.assign({}, this.opts.query);
    (n.EIO = lv), (n.transport = t), this.id && (n.sid = this.id);
    const r = Object.assign({}, this.opts.transportOptions[t], this.opts, {
      query: n,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port,
    });
    return new YP[t](r);
  }
  open() {
    let t;
    if (
      this.opts.rememberUpgrade &&
      Wn.priorWebsocketSuccess &&
      this.transports.indexOf("websocket") !== -1
    )
      t = "websocket";
    else if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    } else t = this.transports[0];
    this.readyState = "opening";
    try {
      t = this.createTransport(t);
    } catch {
      this.transports.shift(), this.open();
      return;
    }
    t.open(), this.setTransport(t);
  }
  setTransport(t) {
    this.transport && this.transport.removeAllListeners(),
      (this.transport = t),
      t
        .on("drain", this.onDrain.bind(this))
        .on("packet", this.onPacket.bind(this))
        .on("error", this.onError.bind(this))
        .on("close", (n) => this.onClose("transport close", n));
  }
  probe(t) {
    let n = this.createTransport(t),
      r = !1;
    Wn.priorWebsocketSuccess = !1;
    const i = () => {
      r ||
        (n.send([{ type: "ping", data: "probe" }]),
        n.once("packet", (f) => {
          if (!r)
            if (f.type === "pong" && f.data === "probe") {
              if (
                ((this.upgrading = !0), this.emitReserved("upgrading", n), !n)
              )
                return;
              (Wn.priorWebsocketSuccess = n.name === "websocket"),
                this.transport.pause(() => {
                  r ||
                    (this.readyState !== "closed" &&
                      (c(),
                      this.setTransport(n),
                      n.send([{ type: "upgrade" }]),
                      this.emitReserved("upgrade", n),
                      (n = null),
                      (this.upgrading = !1),
                      this.flush()));
                });
            } else {
              const d = new Error("probe error");
              (d.transport = n.name), this.emitReserved("upgradeError", d);
            }
        }));
    };
    function o() {
      r || ((r = !0), c(), n.close(), (n = null));
    }
    const s = (f) => {
      const d = new Error("probe error: " + f);
      (d.transport = n.name), o(), this.emitReserved("upgradeError", d);
    };
    function a() {
      s("transport closed");
    }
    function u() {
      s("socket closed");
    }
    function l(f) {
      n && f.name !== n.name && o();
    }
    const c = () => {
      n.removeListener("open", i),
        n.removeListener("error", s),
        n.removeListener("close", a),
        this.off("close", u),
        this.off("upgrading", l);
    };
    n.once("open", i),
      n.once("error", s),
      n.once("close", a),
      this.once("close", u),
      this.once("upgrading", l),
      n.open();
  }
  onOpen() {
    if (
      ((this.readyState = "open"),
      (Wn.priorWebsocketSuccess = this.transport.name === "websocket"),
      this.emitReserved("open"),
      this.flush(),
      this.readyState === "open" && this.opts.upgrade)
    ) {
      let t = 0;
      const n = this.upgrades.length;
      for (; t < n; t++) this.probe(this.upgrades[t]);
    }
  }
  onPacket(t) {
    if (
      this.readyState === "opening" ||
      this.readyState === "open" ||
      this.readyState === "closing"
    )
      switch (
        (this.emitReserved("packet", t), this.emitReserved("heartbeat"), t.type)
      ) {
        case "open":
          this.onHandshake(JSON.parse(t.data));
          break;
        case "ping":
          this.resetPingTimeout(),
            this.sendPacket("pong"),
            this.emitReserved("ping"),
            this.emitReserved("pong");
          break;
        case "error":
          const n = new Error("server error");
          (n.code = t.data), this.onError(n);
          break;
        case "message":
          this.emitReserved("data", t.data),
            this.emitReserved("message", t.data);
          break;
      }
  }
  onHandshake(t) {
    this.emitReserved("handshake", t),
      (this.id = t.sid),
      (this.transport.query.sid = t.sid),
      (this.upgrades = this.filterUpgrades(t.upgrades)),
      (this.pingInterval = t.pingInterval),
      (this.pingTimeout = t.pingTimeout),
      (this.maxPayload = t.maxPayload),
      this.onOpen(),
      this.readyState !== "closed" && this.resetPingTimeout();
  }
  resetPingTimeout() {
    this.clearTimeoutFn(this.pingTimeoutTimer),
      (this.pingTimeoutTimer = this.setTimeoutFn(() => {
        this.onClose("ping timeout");
      }, this.pingInterval + this.pingTimeout)),
      this.opts.autoUnref && this.pingTimeoutTimer.unref();
  }
  onDrain() {
    this.writeBuffer.splice(0, this.prevBufferLen),
      (this.prevBufferLen = 0),
      this.writeBuffer.length === 0 ? this.emitReserved("drain") : this.flush();
  }
  flush() {
    if (
      this.readyState !== "closed" &&
      this.transport.writable &&
      !this.upgrading &&
      this.writeBuffer.length
    ) {
      const t = this.getWritablePackets();
      this.transport.send(t),
        (this.prevBufferLen = t.length),
        this.emitReserved("flush");
    }
  }
  getWritablePackets() {
    if (
      !(
        this.maxPayload &&
        this.transport.name === "polling" &&
        this.writeBuffer.length > 1
      )
    )
      return this.writeBuffer;
    let n = 1;
    for (let r = 0; r < this.writeBuffer.length; r++) {
      const i = this.writeBuffer[r].data;
      if ((i && (n += jP(i)), r > 0 && n > this.maxPayload))
        return this.writeBuffer.slice(0, r);
      n += 2;
    }
    return this.writeBuffer;
  }
  write(t, n, r) {
    return this.sendPacket("message", t, n, r), this;
  }
  send(t, n, r) {
    return this.sendPacket("message", t, n, r), this;
  }
  sendPacket(t, n, r, i) {
    if (
      (typeof n == "function" && ((i = n), (n = void 0)),
      typeof r == "function" && ((i = r), (r = null)),
      this.readyState === "closing" || this.readyState === "closed")
    )
      return;
    (r = r || {}), (r.compress = r.compress !== !1);
    const o = { type: t, data: n, options: r };
    this.emitReserved("packetCreate", o),
      this.writeBuffer.push(o),
      i && this.once("flush", i),
      this.flush();
  }
  close() {
    const t = () => {
        this.onClose("forced close"), this.transport.close();
      },
      n = () => {
        this.off("upgrade", n), this.off("upgradeError", n), t();
      },
      r = () => {
        this.once("upgrade", n), this.once("upgradeError", n);
      };
    return (
      (this.readyState === "opening" || this.readyState === "open") &&
        ((this.readyState = "closing"),
        this.writeBuffer.length
          ? this.once("drain", () => {
              this.upgrading ? r() : t();
            })
          : this.upgrading
          ? r()
          : t()),
      this
    );
  }
  onError(t) {
    (Wn.priorWebsocketSuccess = !1),
      this.emitReserved("error", t),
      this.onClose("transport error", t);
  }
  onClose(t, n) {
    (this.readyState === "opening" ||
      this.readyState === "open" ||
      this.readyState === "closing") &&
      (this.clearTimeoutFn(this.pingTimeoutTimer),
      this.transport.removeAllListeners("close"),
      this.transport.close(),
      this.transport.removeAllListeners(),
      typeof removeEventListener == "function" &&
        (removeEventListener(
          "beforeunload",
          this.beforeunloadEventListener,
          !1
        ),
        removeEventListener("offline", this.offlineEventListener, !1)),
      (this.readyState = "closed"),
      (this.id = null),
      this.emitReserved("close", t, n),
      (this.writeBuffer = []),
      (this.prevBufferLen = 0));
  }
  filterUpgrades(t) {
    const n = [];
    let r = 0;
    const i = t.length;
    for (; r < i; r++) ~this.transports.indexOf(t[r]) && n.push(t[r]);
    return n;
  }
};
gv.protocol = lv;
function tx(e, t = "", n) {
  let r = e;
  (n = n || (typeof location < "u" && location)),
    e == null && (e = n.protocol + "//" + n.host),
    typeof e == "string" &&
      (e.charAt(0) === "/" &&
        (e.charAt(1) === "/" ? (e = n.protocol + e) : (e = n.host + e)),
      /^(https?|wss?):\/\//.test(e) ||
        (typeof n < "u" ? (e = n.protocol + "//" + e) : (e = "https://" + e)),
      (r = Ll(e))),
    r.port ||
      (/^(http|ws)$/.test(r.protocol)
        ? (r.port = "80")
        : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")),
    (r.path = r.path || "/");
  const o = r.host.indexOf(":") !== -1 ? "[" + r.host + "]" : r.host;
  return (
    (r.id = r.protocol + "://" + o + ":" + r.port + t),
    (r.href =
      r.protocol + "://" + o + (n && n.port === r.port ? "" : ":" + r.port)),
    r
  );
}
const nx = typeof ArrayBuffer == "function",
  rx = (e) =>
    typeof ArrayBuffer.isView == "function"
      ? ArrayBuffer.isView(e)
      : e.buffer instanceof ArrayBuffer,
  wv = Object.prototype.toString,
  ix =
    typeof Blob == "function" ||
    (typeof Blob < "u" && wv.call(Blob) === "[object BlobConstructor]"),
  ox =
    typeof File == "function" ||
    (typeof File < "u" && wv.call(File) === "[object FileConstructor]");
function cf(e) {
  return (
    (nx && (e instanceof ArrayBuffer || rx(e))) ||
    (ix && e instanceof Blob) ||
    (ox && e instanceof File)
  );
}
function jo(e, t) {
  if (!e || typeof e != "object") return !1;
  if (Array.isArray(e)) {
    for (let n = 0, r = e.length; n < r; n++) if (jo(e[n])) return !0;
    return !1;
  }
  if (cf(e)) return !0;
  if (e.toJSON && typeof e.toJSON == "function" && arguments.length === 1)
    return jo(e.toJSON(), !0);
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && jo(e[n])) return !0;
  return !1;
}
function sx(e) {
  const t = [],
    n = e.data,
    r = e;
  return (
    (r.data = Il(n, t)), (r.attachments = t.length), { packet: r, buffers: t }
  );
}
function Il(e, t) {
  if (!e) return e;
  if (cf(e)) {
    const n = { _placeholder: !0, num: t.length };
    return t.push(e), n;
  } else if (Array.isArray(e)) {
    const n = new Array(e.length);
    for (let r = 0; r < e.length; r++) n[r] = Il(e[r], t);
    return n;
  } else if (typeof e == "object" && !(e instanceof Date)) {
    const n = {};
    for (const r in e)
      Object.prototype.hasOwnProperty.call(e, r) && (n[r] = Il(e[r], t));
    return n;
  }
  return e;
}
function ax(e, t) {
  return (e.data = Ml(e.data, t)), delete e.attachments, e;
}
function Ml(e, t) {
  if (!e) return e;
  if (e && e._placeholder === !0) {
    if (typeof e.num == "number" && e.num >= 0 && e.num < t.length)
      return t[e.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(e))
    for (let n = 0; n < e.length; n++) e[n] = Ml(e[n], t);
  else if (typeof e == "object")
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (e[n] = Ml(e[n], t));
  return e;
}
const ux = 5;
var I;
(function (e) {
  (e[(e.CONNECT = 0)] = "CONNECT"),
    (e[(e.DISCONNECT = 1)] = "DISCONNECT"),
    (e[(e.EVENT = 2)] = "EVENT"),
    (e[(e.ACK = 3)] = "ACK"),
    (e[(e.CONNECT_ERROR = 4)] = "CONNECT_ERROR"),
    (e[(e.BINARY_EVENT = 5)] = "BINARY_EVENT"),
    (e[(e.BINARY_ACK = 6)] = "BINARY_ACK");
})(I || (I = {}));
class lx {
  constructor(t) {
    this.replacer = t;
  }
  encode(t) {
    return (t.type === I.EVENT || t.type === I.ACK) && jo(t)
      ? this.encodeAsBinary({
          type: t.type === I.EVENT ? I.BINARY_EVENT : I.BINARY_ACK,
          nsp: t.nsp,
          data: t.data,
          id: t.id,
        })
      : [this.encodeAsString(t)];
  }
  encodeAsString(t) {
    let n = "" + t.type;
    return (
      (t.type === I.BINARY_EVENT || t.type === I.BINARY_ACK) &&
        (n += t.attachments + "-"),
      t.nsp && t.nsp !== "/" && (n += t.nsp + ","),
      t.id != null && (n += t.id),
      t.data != null && (n += JSON.stringify(t.data, this.replacer)),
      n
    );
  }
  encodeAsBinary(t) {
    const n = sx(t),
      r = this.encodeAsString(n.packet),
      i = n.buffers;
    return i.unshift(r), i;
  }
}
class ff extends ae {
  constructor(t) {
    super(), (this.reviver = t);
  }
  add(t) {
    let n;
    if (typeof t == "string") {
      if (this.reconstructor)
        throw new Error("got plaintext data when reconstructing a packet");
      n = this.decodeString(t);
      const r = n.type === I.BINARY_EVENT;
      r || n.type === I.BINARY_ACK
        ? ((n.type = r ? I.EVENT : I.ACK),
          (this.reconstructor = new cx(n)),
          n.attachments === 0 && super.emitReserved("decoded", n))
        : super.emitReserved("decoded", n);
    } else if (cf(t) || t.base64)
      if (this.reconstructor)
        (n = this.reconstructor.takeBinaryData(t)),
          n && ((this.reconstructor = null), super.emitReserved("decoded", n));
      else throw new Error("got binary data when not reconstructing a packet");
    else throw new Error("Unknown type: " + t);
  }
  decodeString(t) {
    let n = 0;
    const r = { type: Number(t.charAt(0)) };
    if (I[r.type] === void 0) throw new Error("unknown packet type " + r.type);
    if (r.type === I.BINARY_EVENT || r.type === I.BINARY_ACK) {
      const o = n + 1;
      for (; t.charAt(++n) !== "-" && n != t.length; );
      const s = t.substring(o, n);
      if (s != Number(s) || t.charAt(n) !== "-")
        throw new Error("Illegal attachments");
      r.attachments = Number(s);
    }
    if (t.charAt(n + 1) === "/") {
      const o = n + 1;
      for (; ++n && !(t.charAt(n) === "," || n === t.length); );
      r.nsp = t.substring(o, n);
    } else r.nsp = "/";
    const i = t.charAt(n + 1);
    if (i !== "" && Number(i) == i) {
      const o = n + 1;
      for (; ++n; ) {
        const s = t.charAt(n);
        if (s == null || Number(s) != s) {
          --n;
          break;
        }
        if (n === t.length) break;
      }
      r.id = Number(t.substring(o, n + 1));
    }
    if (t.charAt(++n)) {
      const o = this.tryParse(t.substr(n));
      if (ff.isPayloadValid(r.type, o)) r.data = o;
      else throw new Error("invalid payload");
    }
    return r;
  }
  tryParse(t) {
    try {
      return JSON.parse(t, this.reviver);
    } catch {
      return !1;
    }
  }
  static isPayloadValid(t, n) {
    switch (t) {
      case I.CONNECT:
        return typeof n == "object";
      case I.DISCONNECT:
        return n === void 0;
      case I.CONNECT_ERROR:
        return typeof n == "string" || typeof n == "object";
      case I.EVENT:
      case I.BINARY_EVENT:
        return Array.isArray(n) && n.length > 0;
      case I.ACK:
      case I.BINARY_ACK:
        return Array.isArray(n);
    }
  }
  destroy() {
    this.reconstructor &&
      (this.reconstructor.finishedReconstruction(),
      (this.reconstructor = null));
  }
}
class cx {
  constructor(t) {
    (this.packet = t), (this.buffers = []), (this.reconPack = t);
  }
  takeBinaryData(t) {
    if (
      (this.buffers.push(t), this.buffers.length === this.reconPack.attachments)
    ) {
      const n = ax(this.reconPack, this.buffers);
      return this.finishedReconstruction(), n;
    }
    return null;
  }
  finishedReconstruction() {
    (this.reconPack = null), (this.buffers = []);
  }
}
const fx = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      Decoder: ff,
      Encoder: lx,
      get PacketType() {
        return I;
      },
      protocol: ux,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
function lt(e, t, n) {
  return (
    e.on(t, n),
    function () {
      e.off(t, n);
    }
  );
}
const dx = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  newListener: 1,
  removeListener: 1,
});
class Sv extends ae {
  constructor(t, n, r) {
    super(),
      (this.connected = !1),
      (this.recovered = !1),
      (this.receiveBuffer = []),
      (this.sendBuffer = []),
      (this._queue = []),
      (this._queueSeq = 0),
      (this.ids = 0),
      (this.acks = {}),
      (this.flags = {}),
      (this.io = t),
      (this.nsp = n),
      r && r.auth && (this.auth = r.auth),
      (this._opts = Object.assign({}, r)),
      this.io._autoConnect && this.open();
  }
  get disconnected() {
    return !this.connected;
  }
  subEvents() {
    if (this.subs) return;
    const t = this.io;
    this.subs = [
      lt(t, "open", this.onopen.bind(this)),
      lt(t, "packet", this.onpacket.bind(this)),
      lt(t, "error", this.onerror.bind(this)),
      lt(t, "close", this.onclose.bind(this)),
    ];
  }
  get active() {
    return !!this.subs;
  }
  connect() {
    return this.connected
      ? this
      : (this.subEvents(),
        this.io._reconnecting || this.io.open(),
        this.io._readyState === "open" && this.onopen(),
        this);
  }
  open() {
    return this.connect();
  }
  send(...t) {
    return t.unshift("message"), this.emit.apply(this, t), this;
  }
  emit(t, ...n) {
    if (dx.hasOwnProperty(t))
      throw new Error('"' + t.toString() + '" is a reserved event name');
    if (
      (n.unshift(t),
      this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
    )
      return this._addToQueue(n), this;
    const r = { type: I.EVENT, data: n };
    if (
      ((r.options = {}),
      (r.options.compress = this.flags.compress !== !1),
      typeof n[n.length - 1] == "function")
    ) {
      const s = this.ids++,
        a = n.pop();
      this._registerAckCallback(s, a), (r.id = s);
    }
    const i =
      this.io.engine &&
      this.io.engine.transport &&
      this.io.engine.transport.writable;
    return (
      (this.flags.volatile && (!i || !this.connected)) ||
        (this.connected
          ? (this.notifyOutgoingListeners(r), this.packet(r))
          : this.sendBuffer.push(r)),
      (this.flags = {}),
      this
    );
  }
  _registerAckCallback(t, n) {
    var r;
    const i =
      (r = this.flags.timeout) !== null && r !== void 0
        ? r
        : this._opts.ackTimeout;
    if (i === void 0) {
      this.acks[t] = n;
      return;
    }
    const o = this.io.setTimeoutFn(() => {
      delete this.acks[t];
      for (let s = 0; s < this.sendBuffer.length; s++)
        this.sendBuffer[s].id === t && this.sendBuffer.splice(s, 1);
      n.call(this, new Error("operation has timed out"));
    }, i);
    this.acks[t] = (...s) => {
      this.io.clearTimeoutFn(o), n.apply(this, [null, ...s]);
    };
  }
  emitWithAck(t, ...n) {
    const r = this.flags.timeout !== void 0 || this._opts.ackTimeout !== void 0;
    return new Promise((i, o) => {
      n.push((s, a) => (r ? (s ? o(s) : i(a)) : i(s))), this.emit(t, ...n);
    });
  }
  _addToQueue(t) {
    let n;
    typeof t[t.length - 1] == "function" && (n = t.pop());
    const r = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: !1,
      args: t,
      flags: Object.assign({ fromQueue: !0 }, this.flags),
    };
    t.push((i, ...o) =>
      r !== this._queue[0]
        ? void 0
        : (i !== null
            ? r.tryCount > this._opts.retries &&
              (this._queue.shift(), n && n(i))
            : (this._queue.shift(), n && n(null, ...o)),
          (r.pending = !1),
          this._drainQueue())
    ),
      this._queue.push(r),
      this._drainQueue();
  }
  _drainQueue(t = !1) {
    if (!this.connected || this._queue.length === 0) return;
    const n = this._queue[0];
    (n.pending && !t) ||
      ((n.pending = !0),
      n.tryCount++,
      (this.flags = n.flags),
      this.emit.apply(this, n.args));
  }
  packet(t) {
    (t.nsp = this.nsp), this.io._packet(t);
  }
  onopen() {
    typeof this.auth == "function"
      ? this.auth((t) => {
          this._sendConnectPacket(t);
        })
      : this._sendConnectPacket(this.auth);
  }
  _sendConnectPacket(t) {
    this.packet({
      type: I.CONNECT,
      data: this._pid
        ? Object.assign({ pid: this._pid, offset: this._lastOffset }, t)
        : t,
    });
  }
  onerror(t) {
    this.connected || this.emitReserved("connect_error", t);
  }
  onclose(t, n) {
    (this.connected = !1),
      delete this.id,
      this.emitReserved("disconnect", t, n);
  }
  onpacket(t) {
    if (t.nsp === this.nsp)
      switch (t.type) {
        case I.CONNECT:
          t.data && t.data.sid
            ? this.onconnect(t.data.sid, t.data.pid)
            : this.emitReserved(
                "connect_error",
                new Error(
                  "It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"
                )
              );
          break;
        case I.EVENT:
        case I.BINARY_EVENT:
          this.onevent(t);
          break;
        case I.ACK:
        case I.BINARY_ACK:
          this.onack(t);
          break;
        case I.DISCONNECT:
          this.ondisconnect();
          break;
        case I.CONNECT_ERROR:
          this.destroy();
          const r = new Error(t.data.message);
          (r.data = t.data.data), this.emitReserved("connect_error", r);
          break;
      }
  }
  onevent(t) {
    const n = t.data || [];
    t.id != null && n.push(this.ack(t.id)),
      this.connected
        ? this.emitEvent(n)
        : this.receiveBuffer.push(Object.freeze(n));
  }
  emitEvent(t) {
    if (this._anyListeners && this._anyListeners.length) {
      const n = this._anyListeners.slice();
      for (const r of n) r.apply(this, t);
    }
    super.emit.apply(this, t),
      this._pid &&
        t.length &&
        typeof t[t.length - 1] == "string" &&
        (this._lastOffset = t[t.length - 1]);
  }
  ack(t) {
    const n = this;
    let r = !1;
    return function (...i) {
      r || ((r = !0), n.packet({ type: I.ACK, id: t, data: i }));
    };
  }
  onack(t) {
    const n = this.acks[t.id];
    typeof n == "function" && (n.apply(this, t.data), delete this.acks[t.id]);
  }
  onconnect(t, n) {
    (this.id = t),
      (this.recovered = n && this._pid === n),
      (this._pid = n),
      (this.connected = !0),
      this.emitBuffered(),
      this.emitReserved("connect"),
      this._drainQueue(!0);
  }
  emitBuffered() {
    this.receiveBuffer.forEach((t) => this.emitEvent(t)),
      (this.receiveBuffer = []),
      this.sendBuffer.forEach((t) => {
        this.notifyOutgoingListeners(t), this.packet(t);
      }),
      (this.sendBuffer = []);
  }
  ondisconnect() {
    this.destroy(), this.onclose("io server disconnect");
  }
  destroy() {
    this.subs && (this.subs.forEach((t) => t()), (this.subs = void 0)),
      this.io._destroy(this);
  }
  disconnect() {
    return (
      this.connected && this.packet({ type: I.DISCONNECT }),
      this.destroy(),
      this.connected && this.onclose("io client disconnect"),
      this
    );
  }
  close() {
    return this.disconnect();
  }
  compress(t) {
    return (this.flags.compress = t), this;
  }
  get volatile() {
    return (this.flags.volatile = !0), this;
  }
  timeout(t) {
    return (this.flags.timeout = t), this;
  }
  onAny(t) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.push(t),
      this
    );
  }
  prependAny(t) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.unshift(t),
      this
    );
  }
  offAny(t) {
    if (!this._anyListeners) return this;
    if (t) {
      const n = this._anyListeners;
      for (let r = 0; r < n.length; r++)
        if (t === n[r]) return n.splice(r, 1), this;
    } else this._anyListeners = [];
    return this;
  }
  listenersAny() {
    return this._anyListeners || [];
  }
  onAnyOutgoing(t) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.push(t),
      this
    );
  }
  prependAnyOutgoing(t) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.unshift(t),
      this
    );
  }
  offAnyOutgoing(t) {
    if (!this._anyOutgoingListeners) return this;
    if (t) {
      const n = this._anyOutgoingListeners;
      for (let r = 0; r < n.length; r++)
        if (t === n[r]) return n.splice(r, 1), this;
    } else this._anyOutgoingListeners = [];
    return this;
  }
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  notifyOutgoingListeners(t) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const n = this._anyOutgoingListeners.slice();
      for (const r of n) r.apply(this, t.data);
    }
  }
}
function $r(e) {
  (e = e || {}),
    (this.ms = e.min || 100),
    (this.max = e.max || 1e4),
    (this.factor = e.factor || 2),
    (this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0),
    (this.attempts = 0);
}
$r.prototype.duration = function () {
  var e = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var t = Math.random(),
      n = Math.floor(t * this.jitter * e);
    e = Math.floor(t * 10) & 1 ? e + n : e - n;
  }
  return Math.min(e, this.max) | 0;
};
$r.prototype.reset = function () {
  this.attempts = 0;
};
$r.prototype.setMin = function (e) {
  this.ms = e;
};
$r.prototype.setMax = function (e) {
  this.max = e;
};
$r.prototype.setJitter = function (e) {
  this.jitter = e;
};
class jl extends ae {
  constructor(t, n) {
    var r;
    super(),
      (this.nsps = {}),
      (this.subs = []),
      t && typeof t == "object" && ((n = t), (t = void 0)),
      (n = n || {}),
      (n.path = n.path || "/socket.io"),
      (this.opts = n),
      Pa(this, n),
      this.reconnection(n.reconnection !== !1),
      this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0),
      this.reconnectionDelay(n.reconnectionDelay || 1e3),
      this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3),
      this.randomizationFactor(
        (r = n.randomizationFactor) !== null && r !== void 0 ? r : 0.5
      ),
      (this.backoff = new $r({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor(),
      })),
      this.timeout(n.timeout == null ? 2e4 : n.timeout),
      (this._readyState = "closed"),
      (this.uri = t);
    const i = n.parser || fx;
    (this.encoder = new i.Encoder()),
      (this.decoder = new i.Decoder()),
      (this._autoConnect = n.autoConnect !== !1),
      this._autoConnect && this.open();
  }
  reconnection(t) {
    return arguments.length
      ? ((this._reconnection = !!t), this)
      : this._reconnection;
  }
  reconnectionAttempts(t) {
    return t === void 0
      ? this._reconnectionAttempts
      : ((this._reconnectionAttempts = t), this);
  }
  reconnectionDelay(t) {
    var n;
    return t === void 0
      ? this._reconnectionDelay
      : ((this._reconnectionDelay = t),
        (n = this.backoff) === null || n === void 0 || n.setMin(t),
        this);
  }
  randomizationFactor(t) {
    var n;
    return t === void 0
      ? this._randomizationFactor
      : ((this._randomizationFactor = t),
        (n = this.backoff) === null || n === void 0 || n.setJitter(t),
        this);
  }
  reconnectionDelayMax(t) {
    var n;
    return t === void 0
      ? this._reconnectionDelayMax
      : ((this._reconnectionDelayMax = t),
        (n = this.backoff) === null || n === void 0 || n.setMax(t),
        this);
  }
  timeout(t) {
    return arguments.length ? ((this._timeout = t), this) : this._timeout;
  }
  maybeReconnectOnOpen() {
    !this._reconnecting &&
      this._reconnection &&
      this.backoff.attempts === 0 &&
      this.reconnect();
  }
  open(t) {
    if (~this._readyState.indexOf("open")) return this;
    this.engine = new gv(this.uri, this.opts);
    const n = this.engine,
      r = this;
    (this._readyState = "opening"), (this.skipReconnect = !1);
    const i = lt(n, "open", function () {
        r.onopen(), t && t();
      }),
      o = lt(n, "error", (s) => {
        r.cleanup(),
          (r._readyState = "closed"),
          this.emitReserved("error", s),
          t ? t(s) : r.maybeReconnectOnOpen();
      });
    if (this._timeout !== !1) {
      const s = this._timeout;
      s === 0 && i();
      const a = this.setTimeoutFn(() => {
        i(), n.close(), n.emit("error", new Error("timeout"));
      }, s);
      this.opts.autoUnref && a.unref(),
        this.subs.push(function () {
          clearTimeout(a);
        });
    }
    return this.subs.push(i), this.subs.push(o), this;
  }
  connect(t) {
    return this.open(t);
  }
  onopen() {
    this.cleanup(), (this._readyState = "open"), this.emitReserved("open");
    const t = this.engine;
    this.subs.push(
      lt(t, "ping", this.onping.bind(this)),
      lt(t, "data", this.ondata.bind(this)),
      lt(t, "error", this.onerror.bind(this)),
      lt(t, "close", this.onclose.bind(this)),
      lt(this.decoder, "decoded", this.ondecoded.bind(this))
    );
  }
  onping() {
    this.emitReserved("ping");
  }
  ondata(t) {
    try {
      this.decoder.add(t);
    } catch (n) {
      this.onclose("parse error", n);
    }
  }
  ondecoded(t) {
    vv(() => {
      this.emitReserved("packet", t);
    }, this.setTimeoutFn);
  }
  onerror(t) {
    this.emitReserved("error", t);
  }
  socket(t, n) {
    let r = this.nsps[t];
    return (
      r
        ? this._autoConnect && !r.active && r.connect()
        : ((r = new Sv(this, t, n)), (this.nsps[t] = r)),
      r
    );
  }
  _destroy(t) {
    const n = Object.keys(this.nsps);
    for (const r of n) if (this.nsps[r].active) return;
    this._close();
  }
  _packet(t) {
    const n = this.encoder.encode(t);
    for (let r = 0; r < n.length; r++) this.engine.write(n[r], t.options);
  }
  cleanup() {
    this.subs.forEach((t) => t()),
      (this.subs.length = 0),
      this.decoder.destroy();
  }
  _close() {
    (this.skipReconnect = !0),
      (this._reconnecting = !1),
      this.onclose("forced close"),
      this.engine && this.engine.close();
  }
  disconnect() {
    return this._close();
  }
  onclose(t, n) {
    this.cleanup(),
      this.backoff.reset(),
      (this._readyState = "closed"),
      this.emitReserved("close", t, n),
      this._reconnection && !this.skipReconnect && this.reconnect();
  }
  reconnect() {
    if (this._reconnecting || this.skipReconnect) return this;
    const t = this;
    if (this.backoff.attempts >= this._reconnectionAttempts)
      this.backoff.reset(),
        this.emitReserved("reconnect_failed"),
        (this._reconnecting = !1);
    else {
      const n = this.backoff.duration();
      this._reconnecting = !0;
      const r = this.setTimeoutFn(() => {
        t.skipReconnect ||
          (this.emitReserved("reconnect_attempt", t.backoff.attempts),
          !t.skipReconnect &&
            t.open((i) => {
              i
                ? ((t._reconnecting = !1),
                  t.reconnect(),
                  this.emitReserved("reconnect_error", i))
                : t.onreconnect();
            }));
      }, n);
      this.opts.autoUnref && r.unref(),
        this.subs.push(function () {
          clearTimeout(r);
        });
    }
  }
  onreconnect() {
    const t = this.backoff.attempts;
    (this._reconnecting = !1),
      this.backoff.reset(),
      this.emitReserved("reconnect", t);
  }
}
const Qr = {};
function Uo(e, t) {
  typeof e == "object" && ((t = e), (e = void 0)), (t = t || {});
  const n = tx(e, t.path || "/socket.io"),
    r = n.source,
    i = n.id,
    o = n.path,
    s = Qr[i] && o in Qr[i].nsps,
    a = t.forceNew || t["force new connection"] || t.multiplex === !1 || s;
  let u;
  return (
    a ? (u = new jl(r, t)) : (Qr[i] || (Qr[i] = new jl(r, t)), (u = Qr[i])),
    n.query && !t.query && (t.query = n.queryKey),
    u.socket(n.path, t)
  );
}
Object.assign(Uo, { Manager: jl, Socket: Sv, io: Uo, connect: Uo });
const hx = O.createContext(null),
  px = (e) => {
    const [t, n] = O.useState(),
      r = Hy(),
      { token: i } = Ze((o) => o.accountState);
    return (
      O.useEffect(
        () => (
          n(Uo(zn, { auth: { token: i || "" } })),
          () => {
            t && t.disconnect();
          }
        ),
        [i]
      ),
      O.useEffect(() => {
        if (t)
          return (
            t.on(Tl.JOIN_ROOM, (o) => t.emit("JOIN_ROOM", o)),
            t.onAny((o, ...s) => {
              r && r.emit(o, ...s);
            }),
            () => {
              t.off(Tl.JOIN_ROOM), t.offAny();
            }
          );
      }, [t]),
      t
        ? w(hx.Provider, { value: t, children: e.children })
        : w(In, { children: "socket error" })
    );
  },
  mx = {
    currentCoins: 100,
    betsCoinOne: [],
    betsCoinTwo: [],
    betsCoinThree: [],
  },
  yx = Kc({
    name: "bets",
    initialState: mx,
    reducers: {
      addBetCoinOne: (e, t) => {
        e.currentCoins -= t.payload.bet;
        const n = e.betsCoinOne.find((r) => r.username === t.payload.username);
        n && (n.bet += t.payload.bet), n || e.betsCoinOne.push(t.payload);
      },
      addBetCoinTwo: (e, t) => {
        e.currentCoins -= t.payload.bet;
        const n = e.betsCoinTwo.find((r) => r.username === t.payload.username);
        n && (n.bet += t.payload.bet), n || e.betsCoinTwo.push(t.payload);
      },
      addBetCoinThree: (e, t) => {
        e.currentCoins -= t.payload.bet;
        const n = e.betsCoinThree.find(
          (r) => r.username === t.payload.username
        );
        n && (n.bet += t.payload.bet), n || e.betsCoinThree.push(t.payload);
      },
      rollFinished: (e, t) => {
        const n = t.payload.selectedCoin === 15,
          r = t.payload.selectedCoin % 2 === 0 && !n,
          i = t.payload.selectedCoin % 2 === 1 && !n;
        r &&
          e.betsCoinOne.forEach((o) => {
            o.username === t.payload.username && (e.currentCoins += o.bet * 2);
          }),
          n &&
            e.betsCoinTwo.forEach((o) => {
              o.username === t.payload.username &&
                (e.currentCoins += o.bet * 16);
            }),
          i &&
            e.betsCoinThree.forEach((o) => {
              o.username === t.payload.username &&
                (e.currentCoins += o.bet * 2);
            }),
          (e.betsCoinOne = []),
          (e.betsCoinTwo = []),
          (e.betsCoinThree = []);
      },
      setLocalCoins: (e, t) => {
        e.currentCoins = t.payload;
      },
    },
  }),
  vx = yx.reducer,
  gx = CS({
    reducer: { mainState: DS, betsState: vx, accountState: XC },
    middleware: (e) => e({ serializableCheck: !1 }),
  });
du.createRoot(document.getElementById("root")).render(
  w(Bw, {
    store: gx,
    children: w(_l.Provider, {
      value: new tO(),
      children: w(RE, {
        client: new xE(),
        children: w(Y1, {
          children: N(px, {
            children: [
              w(vP, {
                toastOptions: {
                  style: {
                    background: "#111",
                    color: "#fff",
                    fontSize: "1rem",
                    fontWeight: 100,
                    fontFamily: "Inter !important",
                  },
                  duration: 1e3,
                },
              }),
              w(xP, {}),
            ],
          }),
        }),
      }),
    }),
  })
);
