//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region node_modules/@vue/shared/dist/shared.esm-bundler.js
/**
* @vue/shared v3.5.38
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
	const map = /* @__PURE__ */ Object.create(null);
	for (const key of str.split(",")) map[key] = 1;
	return (val) => val in map;
}
var EMPTY_OBJ = {};
var EMPTY_ARR = [];
var NOOP = () => {};
var NO = () => false;
var isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
var isModelListener = (key) => key.startsWith("onUpdate:");
var extend = Object.assign;
var remove = (arr, el) => {
	const i = arr.indexOf(el);
	if (i > -1) arr.splice(i, 1);
};
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
var isArray$1 = Array.isArray;
var isMap = (val) => toTypeString(val) === "[object Map]";
var isSet = (val) => toTypeString(val) === "[object Set]";
var isDate = (val) => toTypeString(val) === "[object Date]";
var isFunction = (val) => typeof val === "function";
var isString = (val) => typeof val === "string";
var isSymbol = (val) => typeof val === "symbol";
var isObject = (val) => val !== null && typeof val === "object";
var isPromise = (val) => {
	return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var toRawType = (value) => {
	return toTypeString(value).slice(8, -1);
};
var isPlainObject = (val) => toTypeString(val) === "[object Object]";
var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
var isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
var cacheStringFunction = (fn) => {
	const cache = /* @__PURE__ */ Object.create(null);
	return ((str) => {
		return cache[str] || (cache[str] = fn(str));
	});
};
var camelizeRE = /-\w/g;
var camelize = cacheStringFunction((str) => {
	return str.replace(camelizeRE, (c) => c.slice(1).toUpperCase());
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
var capitalize = cacheStringFunction((str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
});
var toHandlerKey = cacheStringFunction((str) => {
	return str ? `on${capitalize(str)}` : ``;
});
var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
var invokeArrayFns = (fns, ...arg) => {
	for (let i = 0; i < fns.length; i++) fns[i](...arg);
};
var def = (obj, key, value, writable = false) => {
	Object.defineProperty(obj, key, {
		configurable: true,
		enumerable: false,
		writable,
		value
	});
};
var looseToNumber = (val) => {
	const n = parseFloat(val);
	return isNaN(n) ? val : n;
};
var _globalThis;
var getGlobalThis = () => {
	return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
	if (isArray$1(value)) {
		const res = {};
		for (let i = 0; i < value.length; i++) {
			const item = value[i];
			const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
			if (normalized) for (const key in normalized) res[key] = normalized[key];
		}
		return res;
	} else if (isString(value) || isObject(value)) return value;
}
var listDelimiterRE = /;(?![^(]*\))/g;
var propertyDelimiterRE = /:([^]+)/;
var styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
	const ret = {};
	cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
		if (item) {
			const tmp = item.split(propertyDelimiterRE);
			tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
		}
	});
	return ret;
}
function normalizeClass(value) {
	let res = "";
	if (isString(value)) res = value;
	else if (isArray$1(value)) for (let i = 0; i < value.length; i++) {
		const normalized = normalizeClass(value[i]);
		if (normalized) res += normalized + " ";
	}
	else if (isObject(value)) {
		for (const name in value) if (value[name]) res += name + " ";
	}
	return res.trim();
}
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
specialBooleanAttrs + "";
function includeBooleanAttr(value) {
	return !!value || value === "";
}
function looseCompareArrays(a, b) {
	if (a.length !== b.length) return false;
	let equal = true;
	for (let i = 0; equal && i < a.length; i++) equal = looseEqual(a[i], b[i]);
	return equal;
}
function looseEqual(a, b) {
	if (a === b) return true;
	let aValidType = isDate(a);
	let bValidType = isDate(b);
	if (aValidType || bValidType) return aValidType && bValidType ? a.getTime() === b.getTime() : false;
	aValidType = isSymbol(a);
	bValidType = isSymbol(b);
	if (aValidType || bValidType) return a === b;
	aValidType = isArray$1(a);
	bValidType = isArray$1(b);
	if (aValidType || bValidType) return aValidType && bValidType ? looseCompareArrays(a, b) : false;
	aValidType = isObject(a);
	bValidType = isObject(b);
	if (aValidType || bValidType) {
		if (!aValidType || !bValidType) return false;
		if (Object.keys(a).length !== Object.keys(b).length) return false;
		for (const key in a) {
			const aHasKey = a.hasOwnProperty(key);
			const bHasKey = b.hasOwnProperty(key);
			if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) return false;
		}
	}
	return String(a) === String(b);
}
function looseIndexOf(arr, val) {
	return arr.findIndex((item) => looseEqual(item, val));
}
var isRef$1 = (val) => {
	return !!(val && val["__v_isRef"] === true);
};
var toDisplayString = (val) => {
	return isString(val) ? val : val == null ? "" : isArray$1(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef$1(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
};
var replacer = (_key, val) => {
	if (isRef$1(val)) return replacer(_key, val.value);
	else if (isMap(val)) return { [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2], i) => {
		entries[stringifySymbol(key, i) + " =>"] = val2;
		return entries;
	}, {}) };
	else if (isSet(val)) return { [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v)) };
	else if (isSymbol(val)) return stringifySymbol(val);
	else if (isObject(val) && !isArray$1(val) && !isPlainObject(val)) return String(val);
	return val;
};
var stringifySymbol = (v, i = "") => {
	var _a;
	return isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v;
};
function normalizeCssVarValue(value) {
	if (value == null) return "initial";
	if (typeof value === "string") return value === "" ? " " : value;
	if (typeof value !== "number" || !Number.isFinite(value)) {}
	return String(value);
}
//#endregion
//#region node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
/**
* @vue/reactivity v3.5.38
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
var activeEffectScope;
var EffectScope = class {
	constructor(detached = false) {
		this.detached = detached;
		/**
		* @internal
		*/
		this._active = true;
		/**
		* @internal track `on` calls, allow `on` call multiple times
		*/
		this._on = 0;
		/**
		* @internal
		*/
		this.effects = [];
		/**
		* @internal
		*/
		this.cleanups = [];
		this._isPaused = false;
		this._warnOnRun = true;
		this.__v_skip = true;
		if (!detached && activeEffectScope) if (activeEffectScope.active) {
			this.parent = activeEffectScope;
			this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
		} else {
			this._active = false;
			this._warnOnRun = false;
		}
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = true;
			let i, l;
			if (this.scopes) for (i = 0, l = this.scopes.length; i < l; i++) this.scopes[i].pause();
			for (i = 0, l = this.effects.length; i < l; i++) this.effects[i].pause();
		}
	}
	/**
	* Resumes the effect scope, including all child scopes and effects.
	*/
	resume() {
		if (this._active) {
			if (this._isPaused) {
				this._isPaused = false;
				let i, l;
				if (this.scopes) for (i = 0, l = this.scopes.length; i < l; i++) this.scopes[i].resume();
				for (i = 0, l = this.effects.length; i < l; i++) this.effects[i].resume();
			}
		}
	}
	run(fn) {
		if (this._active) {
			const currentEffectScope = activeEffectScope;
			try {
				activeEffectScope = this;
				return fn();
			} finally {
				activeEffectScope = currentEffectScope;
			}
		}
	}
	/**
	* This should only be called on non-detached scopes
	* @internal
	*/
	on() {
		if (++this._on === 1) {
			this.prevScope = activeEffectScope;
			activeEffectScope = this;
		}
	}
	/**
	* This should only be called on non-detached scopes
	* @internal
	*/
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (activeEffectScope === this) activeEffectScope = this.prevScope;
			else {
				let current = activeEffectScope;
				while (current) {
					if (current.prevScope === this) {
						current.prevScope = this.prevScope;
						break;
					}
					current = current.prevScope;
				}
			}
			this.prevScope = void 0;
		}
	}
	stop(fromParent) {
		if (this._active) {
			this._active = false;
			let i, l;
			for (i = 0, l = this.effects.length; i < l; i++) this.effects[i].stop();
			this.effects.length = 0;
			for (i = 0, l = this.cleanups.length; i < l; i++) this.cleanups[i]();
			this.cleanups.length = 0;
			if (this.scopes) {
				for (i = 0, l = this.scopes.length; i < l; i++) this.scopes[i].stop(true);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !fromParent) {
				const last = this.parent.scopes.pop();
				if (last && last !== this) {
					this.parent.scopes[this.index] = last;
					last.index = this.index;
				}
			}
			this.parent = void 0;
		}
	}
};
function getCurrentScope() {
	return activeEffectScope;
}
var activeSub;
var pausedQueueEffects = /* @__PURE__ */ new WeakSet();
var ReactiveEffect = class {
	constructor(fn) {
		this.fn = fn;
		/**
		* @internal
		*/
		this.deps = void 0;
		/**
		* @internal
		*/
		this.depsTail = void 0;
		/**
		* @internal
		*/
		this.flags = 5;
		/**
		* @internal
		*/
		this.next = void 0;
		/**
		* @internal
		*/
		this.cleanup = void 0;
		this.scheduler = void 0;
		if (activeEffectScope) if (activeEffectScope.active) activeEffectScope.effects.push(this);
		else this.flags &= -2;
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		if (this.flags & 64) {
			this.flags &= -65;
			if (pausedQueueEffects.has(this)) {
				pausedQueueEffects.delete(this);
				this.trigger();
			}
		}
	}
	/**
	* @internal
	*/
	notify() {
		if (this.flags & 2 && !(this.flags & 32)) return;
		if (!(this.flags & 8)) batch(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2;
		cleanupEffect(this);
		prepareDeps(this);
		const prevEffect = activeSub;
		const prevShouldTrack = shouldTrack;
		activeSub = this;
		shouldTrack = true;
		try {
			return this.fn();
		} finally {
			cleanupDeps(this);
			activeSub = prevEffect;
			shouldTrack = prevShouldTrack;
			this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let link = this.deps; link; link = link.nextDep) removeSub(link);
			this.deps = this.depsTail = void 0;
			cleanupEffect(this);
			this.onStop && this.onStop();
			this.flags &= -2;
		}
	}
	trigger() {
		if (this.flags & 64) pausedQueueEffects.add(this);
		else if (this.scheduler) this.scheduler();
		else this.runIfDirty();
	}
	/**
	* @internal
	*/
	runIfDirty() {
		if (isDirty(this)) this.run();
	}
	get dirty() {
		return isDirty(this);
	}
};
var batchDepth = 0;
var batchedSub;
var batchedComputed;
function batch(sub, isComputed = false) {
	sub.flags |= 8;
	if (isComputed) {
		sub.next = batchedComputed;
		batchedComputed = sub;
		return;
	}
	sub.next = batchedSub;
	batchedSub = sub;
}
function startBatch() {
	batchDepth++;
}
function endBatch() {
	if (--batchDepth > 0) return;
	if (batchedComputed) {
		let e = batchedComputed;
		batchedComputed = void 0;
		while (e) {
			const next = e.next;
			e.next = void 0;
			e.flags &= -9;
			e = next;
		}
	}
	let error;
	while (batchedSub) {
		let e = batchedSub;
		batchedSub = void 0;
		while (e) {
			const next = e.next;
			e.next = void 0;
			e.flags &= -9;
			if (e.flags & 1) try {
				e.trigger();
			} catch (err) {
				if (!error) error = err;
			}
			e = next;
		}
	}
	if (error) throw error;
}
function prepareDeps(sub) {
	for (let link = sub.deps; link; link = link.nextDep) {
		link.version = -1;
		link.prevActiveLink = link.dep.activeLink;
		link.dep.activeLink = link;
	}
}
function cleanupDeps(sub) {
	let head;
	let tail = sub.depsTail;
	let link = tail;
	while (link) {
		const prev = link.prevDep;
		if (link.version === -1) {
			if (link === tail) tail = prev;
			removeSub(link);
			removeDep(link);
		} else head = link;
		link.dep.activeLink = link.prevActiveLink;
		link.prevActiveLink = void 0;
		link = prev;
	}
	sub.deps = head;
	sub.depsTail = tail;
}
function isDirty(sub) {
	for (let link = sub.deps; link; link = link.nextDep) if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) return true;
	if (sub._dirty) return true;
	return false;
}
function refreshComputed(computed) {
	if (computed.flags & 4 && !(computed.flags & 16)) return;
	computed.flags &= -17;
	if (computed.globalVersion === globalVersion) return;
	computed.globalVersion = globalVersion;
	if (!computed.isSSR && computed.flags & 128 && (!computed.deps && !computed._dirty || !isDirty(computed))) return;
	computed.flags |= 2;
	const dep = computed.dep;
	const prevSub = activeSub;
	const prevShouldTrack = shouldTrack;
	activeSub = computed;
	shouldTrack = true;
	try {
		prepareDeps(computed);
		const value = computed.fn(computed._value);
		if (dep.version === 0 || hasChanged(value, computed._value)) {
			computed.flags |= 128;
			computed._value = value;
			dep.version++;
		}
	} catch (err) {
		dep.version++;
		throw err;
	} finally {
		activeSub = prevSub;
		shouldTrack = prevShouldTrack;
		cleanupDeps(computed);
		computed.flags &= -3;
	}
}
function removeSub(link, soft = false) {
	const { dep, prevSub, nextSub } = link;
	if (prevSub) {
		prevSub.nextSub = nextSub;
		link.prevSub = void 0;
	}
	if (nextSub) {
		nextSub.prevSub = prevSub;
		link.nextSub = void 0;
	}
	if (dep.subs === link) {
		dep.subs = prevSub;
		if (!prevSub && dep.computed) {
			dep.computed.flags &= -5;
			for (let l = dep.computed.deps; l; l = l.nextDep) removeSub(l, true);
		}
	}
	if (!soft && !--dep.sc && dep.map) dep.map.delete(dep.key);
}
function removeDep(link) {
	const { prevDep, nextDep } = link;
	if (prevDep) {
		prevDep.nextDep = nextDep;
		link.prevDep = void 0;
	}
	if (nextDep) {
		nextDep.prevDep = prevDep;
		link.nextDep = void 0;
	}
}
var shouldTrack = true;
var trackStack = [];
function pauseTracking() {
	trackStack.push(shouldTrack);
	shouldTrack = false;
}
function resetTracking() {
	const last = trackStack.pop();
	shouldTrack = last === void 0 ? true : last;
}
function cleanupEffect(e) {
	const { cleanup } = e;
	e.cleanup = void 0;
	if (cleanup) {
		const prevSub = activeSub;
		activeSub = void 0;
		try {
			cleanup();
		} finally {
			activeSub = prevSub;
		}
	}
}
var globalVersion = 0;
var Link = class {
	constructor(sub, dep) {
		this.sub = sub;
		this.dep = dep;
		this.version = dep.version;
		this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
};
var Dep = class {
	constructor(computed) {
		this.computed = computed;
		this.version = 0;
		/**
		* Link between this dep and the current active effect
		*/
		this.activeLink = void 0;
		/**
		* Doubly linked list representing the subscribing effects (tail)
		*/
		this.subs = void 0;
		/**
		* For object property deps cleanup
		*/
		this.map = void 0;
		this.key = void 0;
		/**
		* Subscriber counter
		*/
		this.sc = 0;
		/**
		* @internal
		*/
		this.__v_skip = true;
	}
	track(debugInfo) {
		if (!activeSub || !shouldTrack || activeSub === this.computed) return;
		let link = this.activeLink;
		if (link === void 0 || link.sub !== activeSub) {
			link = this.activeLink = new Link(activeSub, this);
			if (!activeSub.deps) activeSub.deps = activeSub.depsTail = link;
			else {
				link.prevDep = activeSub.depsTail;
				activeSub.depsTail.nextDep = link;
				activeSub.depsTail = link;
			}
			addSub(link);
		} else if (link.version === -1) {
			link.version = this.version;
			if (link.nextDep) {
				const next = link.nextDep;
				next.prevDep = link.prevDep;
				if (link.prevDep) link.prevDep.nextDep = next;
				link.prevDep = activeSub.depsTail;
				link.nextDep = void 0;
				activeSub.depsTail.nextDep = link;
				activeSub.depsTail = link;
				if (activeSub.deps === link) activeSub.deps = next;
			}
		}
		return link;
	}
	trigger(debugInfo) {
		this.version++;
		globalVersion++;
		this.notify(debugInfo);
	}
	notify(debugInfo) {
		startBatch();
		try {
			for (let link = this.subs; link; link = link.prevSub) if (link.sub.notify()) link.sub.dep.notify();
		} finally {
			endBatch();
		}
	}
};
function addSub(link) {
	link.dep.sc++;
	if (link.sub.flags & 4) {
		const computed = link.dep.computed;
		if (computed && !link.dep.subs) {
			computed.flags |= 20;
			for (let l = computed.deps; l; l = l.nextDep) addSub(l);
		}
		const currentTail = link.dep.subs;
		if (currentTail !== link) {
			link.prevSub = currentTail;
			if (currentTail) currentTail.nextSub = link;
		}
		link.dep.subs = link;
	}
}
var targetMap = /* @__PURE__ */ new WeakMap();
var ITERATE_KEY = /* @__PURE__ */ Symbol("");
var MAP_KEY_ITERATE_KEY = /* @__PURE__ */ Symbol("");
var ARRAY_ITERATE_KEY = /* @__PURE__ */ Symbol("");
function track(target, type, key) {
	if (shouldTrack && activeSub) {
		let depsMap = targetMap.get(target);
		if (!depsMap) targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
		let dep = depsMap.get(key);
		if (!dep) {
			depsMap.set(key, dep = new Dep());
			dep.map = depsMap;
			dep.key = key;
		}
		dep.track();
	}
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
	const depsMap = targetMap.get(target);
	if (!depsMap) {
		globalVersion++;
		return;
	}
	const run = (dep) => {
		if (dep) dep.trigger();
	};
	startBatch();
	if (type === "clear") depsMap.forEach(run);
	else {
		const targetIsArray = isArray$1(target);
		const isArrayIndex = targetIsArray && isIntegerKey(key);
		if (targetIsArray && key === "length") {
			const newLength = Number(newValue);
			depsMap.forEach((dep, key2) => {
				if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) run(dep);
			});
		} else {
			if (key !== void 0 || depsMap.has(void 0)) run(depsMap.get(key));
			if (isArrayIndex) run(depsMap.get(ARRAY_ITERATE_KEY));
			switch (type) {
				case "add":
					if (!targetIsArray) {
						run(depsMap.get(ITERATE_KEY));
						if (isMap(target)) run(depsMap.get(MAP_KEY_ITERATE_KEY));
					} else if (isArrayIndex) run(depsMap.get("length"));
					break;
				case "delete":
					if (!targetIsArray) {
						run(depsMap.get(ITERATE_KEY));
						if (isMap(target)) run(depsMap.get(MAP_KEY_ITERATE_KEY));
					}
					break;
				case "set":
					if (isMap(target)) run(depsMap.get(ITERATE_KEY));
					break;
			}
		}
	}
	endBatch();
}
function reactiveReadArray(array) {
	const raw = /* @__PURE__ */ toRaw(array);
	if (raw === array) return raw;
	track(raw, "iterate", ARRAY_ITERATE_KEY);
	return /* @__PURE__ */ isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
	track(arr = /* @__PURE__ */ toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
	return arr;
}
function toWrapped(target, item) {
	if (/* @__PURE__ */ isReadonly(target)) return /* @__PURE__ */ isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
	return toReactive(item);
}
var arrayInstrumentations = {
	__proto__: null,
	[Symbol.iterator]() {
		return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
	},
	concat(...args) {
		return reactiveReadArray(this).concat(...args.map((x) => isArray$1(x) ? reactiveReadArray(x) : x));
	},
	entries() {
		return iterator(this, "entries", (value) => {
			value[1] = toWrapped(this, value[1]);
			return value;
		});
	},
	every(fn, thisArg) {
		return apply(this, "every", fn, thisArg, void 0, arguments);
	},
	filter(fn, thisArg) {
		return apply(this, "filter", fn, thisArg, (v) => v.map((item) => toWrapped(this, item)), arguments);
	},
	find(fn, thisArg) {
		return apply(this, "find", fn, thisArg, (item) => toWrapped(this, item), arguments);
	},
	findIndex(fn, thisArg) {
		return apply(this, "findIndex", fn, thisArg, void 0, arguments);
	},
	findLast(fn, thisArg) {
		return apply(this, "findLast", fn, thisArg, (item) => toWrapped(this, item), arguments);
	},
	findLastIndex(fn, thisArg) {
		return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
	},
	forEach(fn, thisArg) {
		return apply(this, "forEach", fn, thisArg, void 0, arguments);
	},
	includes(...args) {
		return searchProxy(this, "includes", args);
	},
	indexOf(...args) {
		return searchProxy(this, "indexOf", args);
	},
	join(separator) {
		return reactiveReadArray(this).join(separator);
	},
	lastIndexOf(...args) {
		return searchProxy(this, "lastIndexOf", args);
	},
	map(fn, thisArg) {
		return apply(this, "map", fn, thisArg, void 0, arguments);
	},
	pop() {
		return noTracking(this, "pop");
	},
	push(...args) {
		return noTracking(this, "push", args);
	},
	reduce(fn, ...args) {
		return reduce(this, "reduce", fn, args);
	},
	reduceRight(fn, ...args) {
		return reduce(this, "reduceRight", fn, args);
	},
	shift() {
		return noTracking(this, "shift");
	},
	some(fn, thisArg) {
		return apply(this, "some", fn, thisArg, void 0, arguments);
	},
	splice(...args) {
		return noTracking(this, "splice", args);
	},
	toReversed() {
		return reactiveReadArray(this).toReversed();
	},
	toSorted(comparer) {
		return reactiveReadArray(this).toSorted(comparer);
	},
	toSpliced(...args) {
		return reactiveReadArray(this).toSpliced(...args);
	},
	unshift(...args) {
		return noTracking(this, "unshift", args);
	},
	values() {
		return iterator(this, "values", (item) => toWrapped(this, item));
	}
};
function iterator(self, method, wrapValue) {
	const arr = shallowReadArray(self);
	const iter = arr[method]();
	if (arr !== self && !/* @__PURE__ */ isShallow(self)) {
		iter._next = iter.next;
		iter.next = () => {
			const result = iter._next();
			if (!result.done) result.value = wrapValue(result.value);
			return result;
		};
	}
	return iter;
}
var arrayProto = Array.prototype;
function apply(self, method, fn, thisArg, wrappedRetFn, args) {
	const arr = shallowReadArray(self);
	const needsWrap = arr !== self && !/* @__PURE__ */ isShallow(self);
	const methodFn = arr[method];
	if (methodFn !== arrayProto[method]) {
		const result2 = methodFn.apply(self, args);
		return needsWrap ? toReactive(result2) : result2;
	}
	let wrappedFn = fn;
	if (arr !== self) {
		if (needsWrap) wrappedFn = function(item, index) {
			return fn.call(this, toWrapped(self, item), index, self);
		};
		else if (fn.length > 2) wrappedFn = function(item, index) {
			return fn.call(this, item, index, self);
		};
	}
	const result = methodFn.call(arr, wrappedFn, thisArg);
	return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self, method, fn, args) {
	const arr = shallowReadArray(self);
	const needsWrap = arr !== self && !/* @__PURE__ */ isShallow(self);
	let wrappedFn = fn;
	let wrapInitialAccumulator = false;
	if (arr !== self) {
		if (needsWrap) {
			wrapInitialAccumulator = args.length === 0;
			wrappedFn = function(acc, item, index) {
				if (wrapInitialAccumulator) {
					wrapInitialAccumulator = false;
					acc = toWrapped(self, acc);
				}
				return fn.call(this, acc, toWrapped(self, item), index, self);
			};
		} else if (fn.length > 3) wrappedFn = function(acc, item, index) {
			return fn.call(this, acc, item, index, self);
		};
	}
	const result = arr[method](wrappedFn, ...args);
	return wrapInitialAccumulator ? toWrapped(self, result) : result;
}
function searchProxy(self, method, args) {
	const arr = /* @__PURE__ */ toRaw(self);
	track(arr, "iterate", ARRAY_ITERATE_KEY);
	const res = arr[method](...args);
	if ((res === -1 || res === false) && /* @__PURE__ */ isProxy(args[0])) {
		args[0] = /* @__PURE__ */ toRaw(args[0]);
		return arr[method](...args);
	}
	return res;
}
function noTracking(self, method, args = []) {
	pauseTracking();
	startBatch();
	const res = (/* @__PURE__ */ toRaw(self))[method].apply(self, args);
	endBatch();
	resetTracking();
	return res;
}
var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
var builtInSymbols = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol));
function hasOwnProperty(key) {
	if (!isSymbol(key)) key = String(key);
	const obj = /* @__PURE__ */ toRaw(this);
	track(obj, "has", key);
	return obj.hasOwnProperty(key);
}
var BaseReactiveHandler = class {
	constructor(_isReadonly = false, _isShallow = false) {
		this._isReadonly = _isReadonly;
		this._isShallow = _isShallow;
	}
	get(target, key, receiver) {
		if (key === "__v_skip") return target["__v_skip"];
		const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
		if (key === "__v_isReactive") return !isReadonly2;
		else if (key === "__v_isReadonly") return isReadonly2;
		else if (key === "__v_isShallow") return isShallow2;
		else if (key === "__v_raw") {
			if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) return target;
			return;
		}
		const targetIsArray = isArray$1(target);
		if (!isReadonly2) {
			let fn;
			if (targetIsArray && (fn = arrayInstrumentations[key])) return fn;
			if (key === "hasOwnProperty") return hasOwnProperty;
		}
		const res = Reflect.get(target, key, /* @__PURE__ */ isRef(target) ? target : receiver);
		if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) return res;
		if (!isReadonly2) track(target, "get", key);
		if (isShallow2) return res;
		if (/* @__PURE__ */ isRef(res)) {
			const value = targetIsArray && isIntegerKey(key) ? res : res.value;
			return isReadonly2 && isObject(value) ? /* @__PURE__ */ readonly(value) : value;
		}
		if (isObject(res)) return isReadonly2 ? /* @__PURE__ */ readonly(res) : /* @__PURE__ */ reactive(res);
		return res;
	}
};
var MutableReactiveHandler = class extends BaseReactiveHandler {
	constructor(isShallow2 = false) {
		super(false, isShallow2);
	}
	set(target, key, value, receiver) {
		let oldValue = target[key];
		const isArrayWithIntegerKey = isArray$1(target) && isIntegerKey(key);
		if (!this._isShallow) {
			const isOldValueReadonly = /* @__PURE__ */ isReadonly(oldValue);
			if (!/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
				oldValue = /* @__PURE__ */ toRaw(oldValue);
				value = /* @__PURE__ */ toRaw(value);
			}
			if (!isArrayWithIntegerKey && /* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) if (isOldValueReadonly) return true;
			else {
				oldValue.value = value;
				return true;
			}
		}
		const hadKey = isArrayWithIntegerKey ? Number(key) < target.length : hasOwn(target, key);
		const result = Reflect.set(target, key, value, /* @__PURE__ */ isRef(target) ? target : receiver);
		if (target === /* @__PURE__ */ toRaw(receiver)) {
			if (!hadKey) trigger(target, "add", key, value);
			else if (hasChanged(value, oldValue)) trigger(target, "set", key, value, oldValue);
		}
		return result;
	}
	deleteProperty(target, key) {
		const hadKey = hasOwn(target, key);
		const oldValue = target[key];
		const result = Reflect.deleteProperty(target, key);
		if (result && hadKey) trigger(target, "delete", key, void 0, oldValue);
		return result;
	}
	has(target, key) {
		const result = Reflect.has(target, key);
		if (!isSymbol(key) || !builtInSymbols.has(key)) track(target, "has", key);
		return result;
	}
	ownKeys(target) {
		track(target, "iterate", isArray$1(target) ? "length" : ITERATE_KEY);
		return Reflect.ownKeys(target);
	}
};
var ReadonlyReactiveHandler = class extends BaseReactiveHandler {
	constructor(isShallow2 = false) {
		super(true, isShallow2);
	}
	set(target, key) {
		return true;
	}
	deleteProperty(target, key) {
		return true;
	}
};
var mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
var readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
var shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
var toShallow = (value) => value;
var getProto = (v) => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly2, isShallow2) {
	return function(...args) {
		const target = this["__v_raw"];
		const rawTarget = /* @__PURE__ */ toRaw(target);
		const targetIsMap = isMap(rawTarget);
		const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
		const isKeyOnly = method === "keys" && targetIsMap;
		const innerIterator = target[method](...args);
		const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
		!isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
		return extend(Object.create(innerIterator), { next() {
			const { value, done } = innerIterator.next();
			return done ? {
				value,
				done
			} : {
				value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
				done
			};
		} });
	};
}
function createReadonlyMethod(type) {
	return function(...args) {
		return type === "delete" ? false : type === "clear" ? void 0 : this;
	};
}
function createInstrumentations(readonly, shallow) {
	const instrumentations = {
		get(key) {
			const target = this["__v_raw"];
			const rawTarget = /* @__PURE__ */ toRaw(target);
			const rawKey = /* @__PURE__ */ toRaw(key);
			if (!readonly) {
				if (hasChanged(key, rawKey)) track(rawTarget, "get", key);
				track(rawTarget, "get", rawKey);
			}
			const { has } = getProto(rawTarget);
			const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
			if (has.call(rawTarget, key)) return wrap(target.get(key));
			else if (has.call(rawTarget, rawKey)) return wrap(target.get(rawKey));
			else if (target !== rawTarget) target.get(key);
		},
		get size() {
			const target = this["__v_raw"];
			!readonly && track(/* @__PURE__ */ toRaw(target), "iterate", ITERATE_KEY);
			return target.size;
		},
		has(key) {
			const target = this["__v_raw"];
			const rawTarget = /* @__PURE__ */ toRaw(target);
			const rawKey = /* @__PURE__ */ toRaw(key);
			if (!readonly) {
				if (hasChanged(key, rawKey)) track(rawTarget, "has", key);
				track(rawTarget, "has", rawKey);
			}
			return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
		},
		forEach(callback, thisArg) {
			const observed = this;
			const target = observed["__v_raw"];
			const rawTarget = /* @__PURE__ */ toRaw(target);
			const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
			!readonly && track(rawTarget, "iterate", ITERATE_KEY);
			return target.forEach((value, key) => {
				return callback.call(thisArg, wrap(value), wrap(key), observed);
			});
		}
	};
	extend(instrumentations, readonly ? {
		add: createReadonlyMethod("add"),
		set: createReadonlyMethod("set"),
		delete: createReadonlyMethod("delete"),
		clear: createReadonlyMethod("clear")
	} : {
		add(value) {
			const target = /* @__PURE__ */ toRaw(this);
			const proto = getProto(target);
			const rawValue = /* @__PURE__ */ toRaw(value);
			const valueToAdd = !shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value) ? rawValue : value;
			if (!(proto.has.call(target, valueToAdd) || hasChanged(value, valueToAdd) && proto.has.call(target, value) || hasChanged(rawValue, valueToAdd) && proto.has.call(target, rawValue))) {
				target.add(valueToAdd);
				trigger(target, "add", valueToAdd, valueToAdd);
			}
			return this;
		},
		set(key, value) {
			if (!shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) value = /* @__PURE__ */ toRaw(value);
			const target = /* @__PURE__ */ toRaw(this);
			const { has, get } = getProto(target);
			let hadKey = has.call(target, key);
			if (!hadKey) {
				key = /* @__PURE__ */ toRaw(key);
				hadKey = has.call(target, key);
			}
			const oldValue = get.call(target, key);
			target.set(key, value);
			if (!hadKey) trigger(target, "add", key, value);
			else if (hasChanged(value, oldValue)) trigger(target, "set", key, value, oldValue);
			return this;
		},
		delete(key) {
			const target = /* @__PURE__ */ toRaw(this);
			const { has, get } = getProto(target);
			let hadKey = has.call(target, key);
			if (!hadKey) {
				key = /* @__PURE__ */ toRaw(key);
				hadKey = has.call(target, key);
			}
			const oldValue = get ? get.call(target, key) : void 0;
			const result = target.delete(key);
			if (hadKey) trigger(target, "delete", key, void 0, oldValue);
			return result;
		},
		clear() {
			const target = /* @__PURE__ */ toRaw(this);
			const hadItems = target.size !== 0;
			const oldTarget = void 0;
			const result = target.clear();
			if (hadItems) trigger(target, "clear", void 0, void 0, oldTarget);
			return result;
		}
	});
	[
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((method) => {
		instrumentations[method] = createIterableMethod(method, readonly, shallow);
	});
	return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
	const instrumentations = createInstrumentations(isReadonly2, shallow);
	return (target, key, receiver) => {
		if (key === "__v_isReactive") return !isReadonly2;
		else if (key === "__v_isReadonly") return isReadonly2;
		else if (key === "__v_raw") return target;
		return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
	};
}
var mutableCollectionHandlers = { get: /* @__PURE__ */ createInstrumentationGetter(false, false) };
var shallowCollectionHandlers = { get: /* @__PURE__ */ createInstrumentationGetter(false, true) };
var readonlyCollectionHandlers = { get: /* @__PURE__ */ createInstrumentationGetter(true, false) };
var reactiveMap = /* @__PURE__ */ new WeakMap();
var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
var readonlyMap = /* @__PURE__ */ new WeakMap();
var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
	switch (rawType) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
// @__NO_SIDE_EFFECTS__
function reactive(target) {
	if (/* @__PURE__ */ isReadonly(target)) return target;
	return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
// @__NO_SIDE_EFFECTS__
function shallowReactive(target) {
	return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
// @__NO_SIDE_EFFECTS__
function readonly(target) {
	return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
	if (!isObject(target)) return target;
	if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) return target;
	if (target["__v_skip"] || !Object.isExtensible(target)) return target;
	const existingProxy = proxyMap.get(target);
	if (existingProxy) return existingProxy;
	const targetType = targetTypeMap(toRawType(target));
	if (targetType === 0) return target;
	const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
	proxyMap.set(target, proxy);
	return proxy;
}
// @__NO_SIDE_EFFECTS__
function isReactive(value) {
	if (/* @__PURE__ */ isReadonly(value)) return /* @__PURE__ */ isReactive(value["__v_raw"]);
	return !!(value && value["__v_isReactive"]);
}
// @__NO_SIDE_EFFECTS__
function isReadonly(value) {
	return !!(value && value["__v_isReadonly"]);
}
// @__NO_SIDE_EFFECTS__
function isShallow(value) {
	return !!(value && value["__v_isShallow"]);
}
// @__NO_SIDE_EFFECTS__
function isProxy(value) {
	return value ? !!value["__v_raw"] : false;
}
// @__NO_SIDE_EFFECTS__
function toRaw(observed) {
	const raw = observed && observed["__v_raw"];
	return raw ? /* @__PURE__ */ toRaw(raw) : observed;
}
function markRaw(value) {
	if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) def(value, "__v_skip", true);
	return value;
}
var toReactive = (value) => isObject(value) ? /* @__PURE__ */ reactive(value) : value;
var toReadonly = (value) => isObject(value) ? /* @__PURE__ */ readonly(value) : value;
// @__NO_SIDE_EFFECTS__
function isRef(r) {
	return r ? r["__v_isRef"] === true : false;
}
// @__NO_SIDE_EFFECTS__
function ref(value) {
	return createRef(value, false);
}
// @__NO_SIDE_EFFECTS__
function shallowRef(value) {
	return createRef(value, true);
}
function createRef(rawValue, shallow) {
	if (/* @__PURE__ */ isRef(rawValue)) return rawValue;
	return new RefImpl(rawValue, shallow);
}
var RefImpl = class {
	constructor(value, isShallow2) {
		this.dep = new Dep();
		this["__v_isRef"] = true;
		this["__v_isShallow"] = false;
		this._rawValue = isShallow2 ? value : /* @__PURE__ */ toRaw(value);
		this._value = isShallow2 ? value : toReactive(value);
		this["__v_isShallow"] = isShallow2;
	}
	get value() {
		this.dep.track();
		return this._value;
	}
	set value(newValue) {
		const oldValue = this._rawValue;
		const useDirectValue = this["__v_isShallow"] || /* @__PURE__ */ isShallow(newValue) || /* @__PURE__ */ isReadonly(newValue);
		newValue = useDirectValue ? newValue : /* @__PURE__ */ toRaw(newValue);
		if (hasChanged(newValue, oldValue)) {
			this._rawValue = newValue;
			this._value = useDirectValue ? newValue : toReactive(newValue);
			this.dep.trigger();
		}
	}
};
function unref(ref2) {
	return /* @__PURE__ */ isRef(ref2) ? ref2.value : ref2;
}
var shallowUnwrapHandlers = {
	get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
	set: (target, key, value, receiver) => {
		const oldValue = target[key];
		if (/* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
			oldValue.value = value;
			return true;
		} else return Reflect.set(target, key, value, receiver);
	}
};
function proxyRefs(objectWithRefs) {
	return /* @__PURE__ */ isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
var ComputedRefImpl = class {
	constructor(fn, setter, isSSR) {
		this.fn = fn;
		this.setter = setter;
		/**
		* @internal
		*/
		this._value = void 0;
		/**
		* @internal
		*/
		this.dep = new Dep(this);
		/**
		* @internal
		*/
		this.__v_isRef = true;
		/**
		* @internal
		*/
		this.deps = void 0;
		/**
		* @internal
		*/
		this.depsTail = void 0;
		/**
		* @internal
		*/
		this.flags = 16;
		/**
		* @internal
		*/
		this.globalVersion = globalVersion - 1;
		/**
		* @internal
		*/
		this.next = void 0;
		this.effect = this;
		this["__v_isReadonly"] = !setter;
		this.isSSR = isSSR;
	}
	/**
	* @internal
	*/
	notify() {
		this.flags |= 16;
		if (!(this.flags & 8) && activeSub !== this) {
			batch(this, true);
			return true;
		}
	}
	get value() {
		const link = this.dep.track();
		refreshComputed(this);
		if (link) link.version = this.dep.version;
		return this._value;
	}
	set value(newValue) {
		if (this.setter) this.setter(newValue);
	}
};
// @__NO_SIDE_EFFECTS__
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
	let getter;
	let setter;
	if (isFunction(getterOrOptions)) getter = getterOrOptions;
	else {
		getter = getterOrOptions.get;
		setter = getterOrOptions.set;
	}
	return new ComputedRefImpl(getter, setter, isSSR);
}
var INITIAL_WATCHER_VALUE = {};
var cleanupMap = /* @__PURE__ */ new WeakMap();
var activeWatcher = void 0;
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
	if (owner) {
		let cleanups = cleanupMap.get(owner);
		if (!cleanups) cleanupMap.set(owner, cleanups = []);
		cleanups.push(cleanupFn);
	}
}
function watch$1(source, cb, options = EMPTY_OBJ) {
	const { immediate, deep, once, scheduler, augmentJob, call } = options;
	const reactiveGetter = (source2) => {
		if (deep) return source2;
		if (/* @__PURE__ */ isShallow(source2) || deep === false || deep === 0) return traverse(source2, 1);
		return traverse(source2);
	};
	let effect;
	let getter;
	let cleanup;
	let boundCleanup;
	let forceTrigger = false;
	let isMultiSource = false;
	if (/* @__PURE__ */ isRef(source)) {
		getter = () => source.value;
		forceTrigger = /* @__PURE__ */ isShallow(source);
	} else if (/* @__PURE__ */ isReactive(source)) {
		getter = () => reactiveGetter(source);
		forceTrigger = true;
	} else if (isArray$1(source)) {
		isMultiSource = true;
		forceTrigger = source.some((s) => /* @__PURE__ */ isReactive(s) || /* @__PURE__ */ isShallow(s));
		getter = () => source.map((s) => {
			if (/* @__PURE__ */ isRef(s)) return s.value;
			else if (/* @__PURE__ */ isReactive(s)) return reactiveGetter(s);
			else if (isFunction(s)) return call ? call(s, 2) : s();
		});
	} else if (isFunction(source)) if (cb) getter = call ? () => call(source, 2) : source;
	else getter = () => {
		if (cleanup) {
			pauseTracking();
			try {
				cleanup();
			} finally {
				resetTracking();
			}
		}
		const currentEffect = activeWatcher;
		activeWatcher = effect;
		try {
			return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
		} finally {
			activeWatcher = currentEffect;
		}
	};
	else getter = NOOP;
	if (cb && deep) {
		const baseGetter = getter;
		const depth = deep === true ? Infinity : deep;
		getter = () => traverse(baseGetter(), depth);
	}
	const scope = getCurrentScope();
	const watchHandle = () => {
		effect.stop();
		if (scope && scope.active) remove(scope.effects, effect);
	};
	if (once && cb) {
		const _cb = cb;
		cb = (...args) => {
			const res = _cb(...args);
			watchHandle();
			return res;
		};
	}
	let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
	const job = (immediateFirstRun) => {
		if (!(effect.flags & 1) || !effect.dirty && !immediateFirstRun) return;
		if (cb) {
			const newValue = effect.run();
			if (immediateFirstRun || deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
				if (cleanup) cleanup();
				const currentWatcher = activeWatcher;
				activeWatcher = effect;
				try {
					const args = [
						newValue,
						oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
						boundCleanup
					];
					oldValue = newValue;
					call ? call(cb, 3, args) : cb(...args);
				} finally {
					activeWatcher = currentWatcher;
				}
			}
		} else effect.run();
	};
	if (augmentJob) augmentJob(job);
	effect = new ReactiveEffect(getter);
	effect.scheduler = scheduler ? () => scheduler(job, false) : job;
	boundCleanup = (fn) => onWatcherCleanup(fn, false, effect);
	cleanup = effect.onStop = () => {
		const cleanups = cleanupMap.get(effect);
		if (cleanups) {
			if (call) call(cleanups, 4);
			else for (const cleanup2 of cleanups) cleanup2();
			cleanupMap.delete(effect);
		}
	};
	if (cb) if (immediate) job(true);
	else oldValue = effect.run();
	else if (scheduler) scheduler(job.bind(null, true), true);
	else effect.run();
	watchHandle.pause = effect.pause.bind(effect);
	watchHandle.resume = effect.resume.bind(effect);
	watchHandle.stop = watchHandle;
	return watchHandle;
}
function traverse(value, depth = Infinity, seen) {
	if (depth <= 0 || !isObject(value) || value["__v_skip"]) return value;
	seen = seen || /* @__PURE__ */ new Map();
	if ((seen.get(value) || 0) >= depth) return value;
	seen.set(value, depth);
	depth--;
	if (/* @__PURE__ */ isRef(value)) traverse(value.value, depth, seen);
	else if (isArray$1(value)) for (let i = 0; i < value.length; i++) traverse(value[i], depth, seen);
	else if (isSet(value) || isMap(value)) value.forEach((v) => {
		traverse(v, depth, seen);
	});
	else if (isPlainObject(value)) {
		for (const key in value) traverse(value[key], depth, seen);
		for (const key of Object.getOwnPropertySymbols(value)) if (Object.prototype.propertyIsEnumerable.call(value, key)) traverse(value[key], depth, seen);
	}
	return value;
}
//#endregion
//#region node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
/**
* @vue/runtime-core v3.5.38
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function callWithErrorHandling(fn, instance, type, args) {
	try {
		return args ? fn(...args) : fn();
	} catch (err) {
		handleError(err, instance, type);
	}
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
	if (isFunction(fn)) {
		const res = callWithErrorHandling(fn, instance, type, args);
		if (res && isPromise(res)) res.catch((err) => {
			handleError(err, instance, type);
		});
		return res;
	}
	if (isArray$1(fn)) {
		const values = [];
		for (let i = 0; i < fn.length; i++) values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
		return values;
	}
}
function handleError(err, instance, type, throwInDev = true) {
	const contextVNode = instance ? instance.vnode : null;
	const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
	if (instance) {
		let cur = instance.parent;
		const exposedInstance = instance.proxy;
		const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
		while (cur) {
			const errorCapturedHooks = cur.ec;
			if (errorCapturedHooks) {
				for (let i = 0; i < errorCapturedHooks.length; i++) if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) return;
			}
			cur = cur.parent;
		}
		if (errorHandler) {
			pauseTracking();
			callWithErrorHandling(errorHandler, null, 10, [
				err,
				exposedInstance,
				errorInfo
			]);
			resetTracking();
			return;
		}
	}
	logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
}
function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
	if (throwInProd) throw err;
	else console.error(err);
}
var queue = [];
var flushIndex = -1;
var pendingPostFlushCbs = [];
var activePostFlushCbs = null;
var postFlushIndex = 0;
var resolvedPromise = /* @__PURE__ */ Promise.resolve();
var currentFlushPromise = null;
function nextTick(fn) {
	const p = currentFlushPromise || resolvedPromise;
	return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
function findInsertionIndex$1(id) {
	let start = flushIndex + 1;
	let end = queue.length;
	while (start < end) {
		const middle = start + end >>> 1;
		const middleJob = queue[middle];
		const middleJobId = getId(middleJob);
		if (middleJobId < id || middleJobId === id && middleJob.flags & 2) start = middle + 1;
		else end = middle;
	}
	return start;
}
function queueJob(job) {
	if (!(job.flags & 1)) {
		const jobId = getId(job);
		const lastJob = queue[queue.length - 1];
		if (!lastJob || !(job.flags & 2) && jobId >= getId(lastJob)) queue.push(job);
		else queue.splice(findInsertionIndex$1(jobId), 0, job);
		job.flags |= 1;
		queueFlush();
	}
}
function queueFlush() {
	if (!currentFlushPromise) currentFlushPromise = resolvedPromise.then(flushJobs);
}
function queuePostFlushCb(cb) {
	if (!isArray$1(cb)) {
		if (activePostFlushCbs && cb.id === -1) activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
		else if (!(cb.flags & 1)) {
			pendingPostFlushCbs.push(cb);
			cb.flags |= 1;
		}
	} else pendingPostFlushCbs.push(...cb);
	queueFlush();
}
function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
	for (; i < queue.length; i++) {
		const cb = queue[i];
		if (cb && cb.flags & 2) {
			if (instance && cb.id !== instance.uid) continue;
			queue.splice(i, 1);
			i--;
			if (cb.flags & 4) cb.flags &= -2;
			cb();
			if (!(cb.flags & 4)) cb.flags &= -2;
		}
	}
}
function flushPostFlushCbs(seen) {
	if (pendingPostFlushCbs.length) {
		const deduped = [...new Set(pendingPostFlushCbs)].sort((a, b) => getId(a) - getId(b));
		pendingPostFlushCbs.length = 0;
		if (activePostFlushCbs) {
			activePostFlushCbs.push(...deduped);
			return;
		}
		activePostFlushCbs = deduped;
		for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
			const cb = activePostFlushCbs[postFlushIndex];
			if (cb.flags & 4) cb.flags &= -2;
			if (!(cb.flags & 8)) cb();
			cb.flags &= -2;
		}
		activePostFlushCbs = null;
		postFlushIndex = 0;
	}
}
var getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
function flushJobs(seen) {
	try {
		for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
			const job = queue[flushIndex];
			if (job && !(job.flags & 8)) {
				if (job.flags & 4) job.flags &= -2;
				callWithErrorHandling(job, job.i, job.i ? 15 : 14);
				if (!(job.flags & 4)) job.flags &= -2;
			}
		}
	} finally {
		for (; flushIndex < queue.length; flushIndex++) {
			const job = queue[flushIndex];
			if (job) job.flags &= -2;
		}
		flushIndex = -1;
		queue.length = 0;
		flushPostFlushCbs(seen);
		currentFlushPromise = null;
		if (queue.length || pendingPostFlushCbs.length) flushJobs(seen);
	}
}
var currentRenderingInstance = null;
var currentScopeId = null;
function setCurrentRenderingInstance(instance) {
	const prev = currentRenderingInstance;
	currentRenderingInstance = instance;
	currentScopeId = instance && instance.type.__scopeId || null;
	return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
	if (!ctx) return fn;
	if (fn._n) return fn;
	const renderFnWithContext = (...args) => {
		if (renderFnWithContext._d) setBlockTracking(-1);
		const prevInstance = setCurrentRenderingInstance(ctx);
		let res;
		try {
			res = fn(...args);
		} finally {
			setCurrentRenderingInstance(prevInstance);
			if (renderFnWithContext._d) setBlockTracking(1);
		}
		return res;
	};
	renderFnWithContext._n = true;
	renderFnWithContext._c = true;
	renderFnWithContext._d = true;
	return renderFnWithContext;
}
function withDirectives(vnode, directives) {
	if (currentRenderingInstance === null) return vnode;
	const instance = getComponentPublicInstance(currentRenderingInstance);
	const bindings = vnode.dirs || (vnode.dirs = []);
	for (let i = 0; i < directives.length; i++) {
		let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
		if (dir) {
			if (isFunction(dir)) dir = {
				mounted: dir,
				updated: dir
			};
			if (dir.deep) traverse(value);
			bindings.push({
				dir,
				instance,
				value,
				oldValue: void 0,
				arg,
				modifiers
			});
		}
	}
	return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
	const bindings = vnode.dirs;
	const oldBindings = prevVNode && prevVNode.dirs;
	for (let i = 0; i < bindings.length; i++) {
		const binding = bindings[i];
		if (oldBindings) binding.oldValue = oldBindings[i].value;
		let hook = binding.dir[name];
		if (hook) {
			pauseTracking();
			callWithAsyncErrorHandling(hook, instance, 8, [
				vnode.el,
				binding,
				vnode,
				prevVNode
			]);
			resetTracking();
		}
	}
}
function provide(key, value) {
	if (currentInstance) {
		let provides = currentInstance.provides;
		const parentProvides = currentInstance.parent && currentInstance.parent.provides;
		if (parentProvides === provides) provides = currentInstance.provides = Object.create(parentProvides);
		provides[key] = value;
	}
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
	const instance = getCurrentInstance();
	if (instance || currentApp) {
		let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
		if (provides && key in provides) return provides[key];
		else if (arguments.length > 1) return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
	}
}
var ssrContextKey = /* @__PURE__ */ Symbol.for("v-scx");
var useSSRContext = () => {
	{
		const ctx = inject(ssrContextKey);
		if (!ctx) {}
		return ctx;
	}
};
function watch(source, cb, options) {
	return doWatch(source, cb, options);
}
function doWatch(source, cb, options = EMPTY_OBJ) {
	const { immediate, deep, flush, once } = options;
	const baseWatchOptions = extend({}, options);
	const runsImmediately = cb && immediate || !cb && flush !== "post";
	let ssrCleanup;
	if (isInSSRComponentSetup) {
		if (flush === "sync") {
			const ctx = useSSRContext();
			ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
		} else if (!runsImmediately) {
			const watchStopHandle = () => {};
			watchStopHandle.stop = NOOP;
			watchStopHandle.resume = NOOP;
			watchStopHandle.pause = NOOP;
			return watchStopHandle;
		}
	}
	const instance = currentInstance;
	baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
	let isPre = false;
	if (flush === "post") baseWatchOptions.scheduler = (job) => {
		queuePostRenderEffect(job, instance && instance.suspense);
	};
	else if (flush !== "sync") {
		isPre = true;
		baseWatchOptions.scheduler = (job, isFirstRun) => {
			if (isFirstRun) job();
			else queueJob(job);
		};
	}
	baseWatchOptions.augmentJob = (job) => {
		if (cb) job.flags |= 4;
		if (isPre) {
			job.flags |= 2;
			if (instance) {
				job.id = instance.uid;
				job.i = instance;
			}
		}
	};
	const watchHandle = watch$1(source, cb, baseWatchOptions);
	if (isInSSRComponentSetup) {
		if (ssrCleanup) ssrCleanup.push(watchHandle);
		else if (runsImmediately) watchHandle();
	}
	return watchHandle;
}
function instanceWatch(source, value, options) {
	const publicThis = this.proxy;
	const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
	let cb;
	if (isFunction(value)) cb = value;
	else {
		cb = value.handler;
		options = value;
	}
	const reset = setCurrentInstance(this);
	const res = doWatch(getter, cb.bind(publicThis), options);
	reset();
	return res;
}
function createPathGetter(ctx, path) {
	const segments = path.split(".");
	return () => {
		let cur = ctx;
		for (let i = 0; i < segments.length && cur; i++) cur = cur[segments[i]];
		return cur;
	};
}
var TeleportEndKey = /* @__PURE__ */ Symbol("_vte");
var isTeleport = (type) => type.__isTeleport;
var leaveCbKey = /* @__PURE__ */ Symbol("_leaveCb");
function setTransitionHooks(vnode, hooks) {
	if (vnode.shapeFlag & 6 && vnode.component) {
		vnode.transition = hooks;
		setTransitionHooks(vnode.component.subTree, hooks);
	} else if (vnode.shapeFlag & 128) {
		vnode.ssContent.transition = hooks.clone(vnode.ssContent);
		vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
	} else vnode.transition = hooks;
}
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
	return isFunction(options) ? /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))() : options;
}
function markAsyncBoundary(instance) {
	instance.ids = [
		instance.ids[0] + instance.ids[2]++ + "-",
		0,
		0
	];
}
function isTemplateRefKey(refs, key) {
	let desc;
	return !!((desc = Object.getOwnPropertyDescriptor(refs, key)) && !desc.configurable);
}
var pendingSetRefMap = /* @__PURE__ */ new WeakMap();
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
	if (isArray$1(rawRef)) {
		rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
		return;
	}
	if (isAsyncWrapper(vnode) && !isUnmount) {
		if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
		return;
	}
	const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
	const value = isUnmount ? null : refValue;
	const { i: owner, r: ref } = rawRef;
	const oldRef = oldRawRef && oldRawRef.r;
	const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
	const setupState = owner.setupState;
	const rawSetupState = /* @__PURE__ */ toRaw(setupState);
	const canSetSetupRef = setupState === EMPTY_OBJ ? NO : (key) => {
		if (isTemplateRefKey(refs, key)) return false;
		return hasOwn(rawSetupState, key);
	};
	const canSetRef = (ref2, key) => {
		if (key && isTemplateRefKey(refs, key)) return false;
		return true;
	};
	if (oldRef != null && oldRef !== ref) {
		invalidatePendingSetRef(oldRawRef);
		if (isString(oldRef)) {
			refs[oldRef] = null;
			if (canSetSetupRef(oldRef)) setupState[oldRef] = null;
		} else if (/* @__PURE__ */ isRef(oldRef)) {
			const oldRawRefAtom = oldRawRef;
			if (canSetRef(oldRef, oldRawRefAtom.k)) oldRef.value = null;
			if (oldRawRefAtom.k) refs[oldRawRefAtom.k] = null;
		}
	}
	if (isFunction(ref)) callWithErrorHandling(ref, owner, 12, [value, refs]);
	else {
		const _isString = isString(ref);
		const _isRef = /* @__PURE__ */ isRef(ref);
		if (_isString || _isRef) {
			const doSet = () => {
				if (rawRef.f) {
					const existing = _isString ? canSetSetupRef(ref) ? setupState[ref] : refs[ref] : canSetRef(ref) || !rawRef.k ? ref.value : refs[rawRef.k];
					if (isUnmount) isArray$1(existing) && remove(existing, refValue);
					else if (!isArray$1(existing)) if (_isString) {
						refs[ref] = [refValue];
						if (canSetSetupRef(ref)) setupState[ref] = refs[ref];
					} else {
						const newVal = [refValue];
						if (canSetRef(ref, rawRef.k)) ref.value = newVal;
						if (rawRef.k) refs[rawRef.k] = newVal;
					}
					else if (!existing.includes(refValue)) existing.push(refValue);
				} else if (_isString) {
					refs[ref] = value;
					if (canSetSetupRef(ref)) setupState[ref] = value;
				} else if (_isRef) {
					if (canSetRef(ref, rawRef.k)) ref.value = value;
					if (rawRef.k) refs[rawRef.k] = value;
				}
			};
			if (value) {
				const job = () => {
					doSet();
					pendingSetRefMap.delete(rawRef);
				};
				job.id = -1;
				pendingSetRefMap.set(rawRef, job);
				queuePostRenderEffect(job, parentSuspense);
			} else {
				invalidatePendingSetRef(rawRef);
				doSet();
			}
		}
	}
}
function invalidatePendingSetRef(rawRef) {
	const pendingSetRef = pendingSetRefMap.get(rawRef);
	if (pendingSetRef) {
		pendingSetRef.flags |= 8;
		pendingSetRefMap.delete(rawRef);
	}
}
getGlobalThis().requestIdleCallback;
getGlobalThis().cancelIdleCallback;
var isAsyncWrapper = (i) => !!i.type.__asyncLoader;
var isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
	registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
	registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
	const wrappedHook = hook.__wdc || (hook.__wdc = () => {
		let current = target;
		while (current) {
			if (current.isDeactivated) return;
			current = current.parent;
		}
		return hook();
	});
	injectHook(type, wrappedHook, target);
	if (target) {
		let current = target.parent;
		while (current && current.parent) {
			if (isKeepAlive(current.parent.vnode)) injectToKeepAliveRoot(wrappedHook, type, target, current);
			current = current.parent;
		}
	}
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
	const injected = injectHook(type, hook, keepAliveRoot, true);
	onUnmounted(() => {
		remove(keepAliveRoot[type], injected);
	}, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
	if (target) {
		const hooks = target[type] || (target[type] = []);
		const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
			pauseTracking();
			const reset = setCurrentInstance(target);
			const res = callWithAsyncErrorHandling(hook, target, type, args);
			reset();
			resetTracking();
			return res;
		});
		if (prepend) hooks.unshift(wrappedHook);
		else hooks.push(wrappedHook);
		return wrappedHook;
	}
}
var createHook = (lifecycle) => (hook, target = currentInstance) => {
	if (!isInSSRComponentSetup || lifecycle === "sp") injectHook(lifecycle, (...args) => hook(...args), target);
};
var onBeforeMount = createHook("bm");
var onMounted = createHook("m");
var onBeforeUpdate = createHook("bu");
var onUpdated = createHook("u");
var onBeforeUnmount = createHook("bum");
var onUnmounted = createHook("um");
var onServerPrefetch = createHook("sp");
var onRenderTriggered = createHook("rtg");
var onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
	injectHook("ec", hook, target);
}
var COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
	return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
var NULL_DYNAMIC_COMPONENT = /* @__PURE__ */ Symbol.for("v-ndc");
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
	const instance = currentRenderingInstance || currentInstance;
	if (instance) {
		const Component = instance.type;
		if (type === COMPONENTS) {
			const selfName = getComponentName(Component, false);
			if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) return Component;
		}
		const res = resolve(instance[type] || Component[type], name) || resolve(instance.appContext[type], name);
		if (!res && maybeSelfReference) return Component;
		return res;
	}
}
function resolve(registry, name) {
	return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
function renderList(source, renderItem, cache, index) {
	let ret;
	const cached = cache && cache[index];
	const sourceIsArray = isArray$1(source);
	if (sourceIsArray || isString(source)) {
		const sourceIsReactiveArray = sourceIsArray && /* @__PURE__ */ isReactive(source);
		let needsWrap = false;
		let isReadonlySource = false;
		if (sourceIsReactiveArray) {
			needsWrap = !/* @__PURE__ */ isShallow(source);
			isReadonlySource = /* @__PURE__ */ isReadonly(source);
			source = shallowReadArray(source);
		}
		ret = new Array(source.length);
		for (let i = 0, l = source.length; i < l; i++) ret[i] = renderItem(needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i])) : toReactive(source[i]) : source[i], i, void 0, cached && cached[i]);
	} else if (typeof source === "number") {
		ret = new Array(source);
		for (let i = 0; i < source; i++) ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
	} else if (isObject(source)) if (source[Symbol.iterator]) ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
	else {
		const keys = Object.keys(source);
		ret = new Array(keys.length);
		for (let i = 0, l = keys.length; i < l; i++) {
			const key = keys[i];
			ret[i] = renderItem(source[key], key, i, cached && cached[i]);
		}
	}
	else ret = [];
	if (cache) cache[index] = ret;
	return ret;
}
var getPublicInstance = (i) => {
	if (!i) return null;
	if (isStatefulComponent(i)) return getComponentPublicInstance(i);
	return getPublicInstance(i.parent);
};
var publicPropertiesMap = /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
	$: (i) => i,
	$el: (i) => i.vnode.el,
	$data: (i) => i.data,
	$props: (i) => i.props,
	$attrs: (i) => i.attrs,
	$slots: (i) => i.slots,
	$refs: (i) => i.refs,
	$parent: (i) => getPublicInstance(i.parent),
	$root: (i) => getPublicInstance(i.root),
	$host: (i) => i.ce,
	$emit: (i) => i.emit,
	$options: (i) => resolveMergedOptions(i),
	$forceUpdate: (i) => i.f || (i.f = () => {
		queueJob(i.update);
	}),
	$nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
	$watch: (i) => instanceWatch.bind(i)
});
var hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
var PublicInstanceProxyHandlers = {
	get({ _: instance }, key) {
		if (key === "__v_skip") return true;
		const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
		if (key[0] !== "$") {
			const n = accessCache[key];
			if (n !== void 0) switch (n) {
				case 1: return setupState[key];
				case 2: return data[key];
				case 4: return ctx[key];
				case 3: return props[key];
			}
			else if (hasSetupBinding(setupState, key)) {
				accessCache[key] = 1;
				return setupState[key];
			} else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
				accessCache[key] = 2;
				return data[key];
			} else if (hasOwn(props, key)) {
				accessCache[key] = 3;
				return props[key];
			} else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
				accessCache[key] = 4;
				return ctx[key];
			} else if (shouldCacheAccess) accessCache[key] = 0;
		}
		const publicGetter = publicPropertiesMap[key];
		let cssModule, globalProperties;
		if (publicGetter) {
			if (key === "$attrs") track(instance.attrs, "get", "");
			return publicGetter(instance);
		} else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) return cssModule;
		else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
			accessCache[key] = 4;
			return ctx[key];
		} else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) return globalProperties[key];
	},
	set({ _: instance }, key, value) {
		const { data, setupState, ctx } = instance;
		if (hasSetupBinding(setupState, key)) {
			setupState[key] = value;
			return true;
		} else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
			data[key] = value;
			return true;
		} else if (hasOwn(instance.props, key)) return false;
		if (key[0] === "$" && key.slice(1) in instance) return false;
		else ctx[key] = value;
		return true;
	},
	has({ _: { data, setupState, accessCache, ctx, appContext, props, type } }, key) {
		let cssModules;
		return !!(accessCache[key] || data !== EMPTY_OBJ && key[0] !== "$" && hasOwn(data, key) || hasSetupBinding(setupState, key) || hasOwn(props, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key) || (cssModules = type.__cssModules) && cssModules[key]);
	},
	defineProperty(target, key, descriptor) {
		if (descriptor.get != null) target._.accessCache[key] = 0;
		else if (hasOwn(descriptor, "value")) this.set(target, key, descriptor.value, null);
		return Reflect.defineProperty(target, key, descriptor);
	}
};
function normalizePropsOrEmits(props) {
	return isArray$1(props) ? props.reduce((normalized, p) => (normalized[p] = null, normalized), {}) : props;
}
var shouldCacheAccess = true;
function applyOptions(instance) {
	const options = resolveMergedOptions(instance);
	const publicThis = instance.proxy;
	const ctx = instance.ctx;
	shouldCacheAccess = false;
	if (options.beforeCreate) callHook(options.beforeCreate, instance, "bc");
	const { data: dataOptions, computed: computedOptions, methods, watch: watchOptions, provide: provideOptions, inject: injectOptions, created, beforeMount, mounted, beforeUpdate, updated, activated, deactivated, beforeDestroy, beforeUnmount, destroyed, unmounted, render, renderTracked, renderTriggered, errorCaptured, serverPrefetch, expose, inheritAttrs, components, directives, filters } = options;
	const checkDuplicateProperties = null;
	if (injectOptions) resolveInjections(injectOptions, ctx, checkDuplicateProperties);
	if (methods) for (const key in methods) {
		const methodHandler = methods[key];
		if (isFunction(methodHandler)) ctx[key] = methodHandler.bind(publicThis);
	}
	if (dataOptions) {
		const data = dataOptions.call(publicThis, publicThis);
		if (!isObject(data)) {} else instance.data = /* @__PURE__ */ reactive(data);
	}
	shouldCacheAccess = true;
	if (computedOptions) for (const key in computedOptions) {
		const opt = computedOptions[key];
		const c = computed({
			get: isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP,
			set: !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP
		});
		Object.defineProperty(ctx, key, {
			enumerable: true,
			configurable: true,
			get: () => c.value,
			set: (v) => c.value = v
		});
	}
	if (watchOptions) for (const key in watchOptions) createWatcher(watchOptions[key], ctx, publicThis, key);
	if (provideOptions) {
		const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
		Reflect.ownKeys(provides).forEach((key) => {
			provide(key, provides[key]);
		});
	}
	if (created) callHook(created, instance, "c");
	function registerLifecycleHook(register, hook) {
		if (isArray$1(hook)) hook.forEach((_hook) => register(_hook.bind(publicThis)));
		else if (hook) register(hook.bind(publicThis));
	}
	registerLifecycleHook(onBeforeMount, beforeMount);
	registerLifecycleHook(onMounted, mounted);
	registerLifecycleHook(onBeforeUpdate, beforeUpdate);
	registerLifecycleHook(onUpdated, updated);
	registerLifecycleHook(onActivated, activated);
	registerLifecycleHook(onDeactivated, deactivated);
	registerLifecycleHook(onErrorCaptured, errorCaptured);
	registerLifecycleHook(onRenderTracked, renderTracked);
	registerLifecycleHook(onRenderTriggered, renderTriggered);
	registerLifecycleHook(onBeforeUnmount, beforeUnmount);
	registerLifecycleHook(onUnmounted, unmounted);
	registerLifecycleHook(onServerPrefetch, serverPrefetch);
	if (isArray$1(expose)) {
		if (expose.length) {
			const exposed = instance.exposed || (instance.exposed = {});
			expose.forEach((key) => {
				Object.defineProperty(exposed, key, {
					get: () => publicThis[key],
					set: (val) => publicThis[key] = val,
					enumerable: true
				});
			});
		} else if (!instance.exposed) instance.exposed = {};
	}
	if (render && instance.render === NOOP) instance.render = render;
	if (inheritAttrs != null) instance.inheritAttrs = inheritAttrs;
	if (components) instance.components = components;
	if (directives) instance.directives = directives;
	if (serverPrefetch) markAsyncBoundary(instance);
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
	if (isArray$1(injectOptions)) injectOptions = normalizeInject(injectOptions);
	for (const key in injectOptions) {
		const opt = injectOptions[key];
		let injected;
		if (isObject(opt)) if ("default" in opt) injected = inject(opt.from || key, opt.default, true);
		else injected = inject(opt.from || key);
		else injected = inject(opt);
		if (/* @__PURE__ */ isRef(injected)) Object.defineProperty(ctx, key, {
			enumerable: true,
			configurable: true,
			get: () => injected.value,
			set: (v) => injected.value = v
		});
		else ctx[key] = injected;
	}
}
function callHook(hook, instance, type) {
	callWithAsyncErrorHandling(isArray$1(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
	let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
	if (isString(raw)) {
		const handler = ctx[raw];
		if (isFunction(handler)) watch(getter, handler);
	} else if (isFunction(raw)) watch(getter, raw.bind(publicThis));
	else if (isObject(raw)) if (isArray$1(raw)) raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
	else {
		const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
		if (isFunction(handler)) watch(getter, handler, raw);
	}
}
function resolveMergedOptions(instance) {
	const base = instance.type;
	const { mixins, extends: extendsOptions } = base;
	const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
	const cached = cache.get(base);
	let resolved;
	if (cached) resolved = cached;
	else if (!globalMixins.length && !mixins && !extendsOptions) resolved = base;
	else {
		resolved = {};
		if (globalMixins.length) globalMixins.forEach((m) => mergeOptions$1(resolved, m, optionMergeStrategies, true));
		mergeOptions$1(resolved, base, optionMergeStrategies);
	}
	if (isObject(base)) cache.set(base, resolved);
	return resolved;
}
function mergeOptions$1(to, from, strats, asMixin = false) {
	const { mixins, extends: extendsOptions } = from;
	if (extendsOptions) mergeOptions$1(to, extendsOptions, strats, true);
	if (mixins) mixins.forEach((m) => mergeOptions$1(to, m, strats, true));
	for (const key in from) if (asMixin && key === "expose") {} else {
		const strat = internalOptionMergeStrats[key] || strats && strats[key];
		to[key] = strat ? strat(to[key], from[key]) : from[key];
	}
	return to;
}
var internalOptionMergeStrats = {
	data: mergeDataFn,
	props: mergeEmitsOrPropsOptions,
	emits: mergeEmitsOrPropsOptions,
	methods: mergeObjectOptions,
	computed: mergeObjectOptions,
	beforeCreate: mergeAsArray,
	created: mergeAsArray,
	beforeMount: mergeAsArray,
	mounted: mergeAsArray,
	beforeUpdate: mergeAsArray,
	updated: mergeAsArray,
	beforeDestroy: mergeAsArray,
	beforeUnmount: mergeAsArray,
	destroyed: mergeAsArray,
	unmounted: mergeAsArray,
	activated: mergeAsArray,
	deactivated: mergeAsArray,
	errorCaptured: mergeAsArray,
	serverPrefetch: mergeAsArray,
	components: mergeObjectOptions,
	directives: mergeObjectOptions,
	watch: mergeWatchOptions,
	provide: mergeDataFn,
	inject: mergeInject
};
function mergeDataFn(to, from) {
	if (!from) return to;
	if (!to) return from;
	return function mergedDataFn() {
		return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
	};
}
function mergeInject(to, from) {
	return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
	if (isArray$1(raw)) {
		const res = {};
		for (let i = 0; i < raw.length; i++) res[raw[i]] = raw[i];
		return res;
	}
	return raw;
}
function mergeAsArray(to, from) {
	return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
	return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
	if (to) {
		if (isArray$1(to) && isArray$1(from)) return [.../* @__PURE__ */ new Set([...to, ...from])];
		return extend(/* @__PURE__ */ Object.create(null), normalizePropsOrEmits(to), normalizePropsOrEmits(from != null ? from : {}));
	} else return from;
}
function mergeWatchOptions(to, from) {
	if (!to) return from;
	if (!from) return to;
	const merged = extend(/* @__PURE__ */ Object.create(null), to);
	for (const key in from) merged[key] = mergeAsArray(to[key], from[key]);
	return merged;
}
function createAppContext() {
	return {
		app: null,
		config: {
			isNativeTag: NO,
			performance: false,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {}
		},
		mixins: [],
		components: {},
		directives: {},
		provides: /* @__PURE__ */ Object.create(null),
		optionsCache: /* @__PURE__ */ new WeakMap(),
		propsCache: /* @__PURE__ */ new WeakMap(),
		emitsCache: /* @__PURE__ */ new WeakMap()
	};
}
var uid$1 = 0;
function createAppAPI(render, hydrate) {
	return function createApp(rootComponent, rootProps = null) {
		if (!isFunction(rootComponent)) rootComponent = extend({}, rootComponent);
		if (rootProps != null && !isObject(rootProps)) rootProps = null;
		const context = createAppContext();
		const installedPlugins = /* @__PURE__ */ new WeakSet();
		const pluginCleanupFns = [];
		let isMounted = false;
		const app = context.app = {
			_uid: uid$1++,
			_component: rootComponent,
			_props: rootProps,
			_container: null,
			_context: context,
			_instance: null,
			version,
			get config() {
				return context.config;
			},
			set config(v) {},
			use(plugin, ...options) {
				if (installedPlugins.has(plugin)) {} else if (plugin && isFunction(plugin.install)) {
					installedPlugins.add(plugin);
					plugin.install(app, ...options);
				} else if (isFunction(plugin)) {
					installedPlugins.add(plugin);
					plugin(app, ...options);
				}
				return app;
			},
			mixin(mixin) {
				if (!context.mixins.includes(mixin)) context.mixins.push(mixin);
				return app;
			},
			component(name, component) {
				if (!component) return context.components[name];
				context.components[name] = component;
				return app;
			},
			directive(name, directive) {
				if (!directive) return context.directives[name];
				context.directives[name] = directive;
				return app;
			},
			mount(rootContainer, isHydrate, namespace) {
				if (!isMounted) {
					const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
					vnode.appContext = context;
					if (namespace === true) namespace = "svg";
					else if (namespace === false) namespace = void 0;
					if (isHydrate && hydrate) hydrate(vnode, rootContainer);
					else render(vnode, rootContainer, namespace);
					isMounted = true;
					app._container = rootContainer;
					rootContainer.__vue_app__ = app;
					return getComponentPublicInstance(vnode.component);
				}
			},
			onUnmount(cleanupFn) {
				pluginCleanupFns.push(cleanupFn);
			},
			unmount() {
				if (isMounted) {
					callWithAsyncErrorHandling(pluginCleanupFns, app._instance, 16);
					render(null, app._container);
					delete app._container.__vue_app__;
				}
			},
			provide(key, value) {
				context.provides[key] = value;
				return app;
			},
			runWithContext(fn) {
				const lastApp = currentApp;
				currentApp = app;
				try {
					return fn();
				} finally {
					currentApp = lastApp;
				}
			}
		};
		return app;
	};
}
var currentApp = null;
var getModelModifiers = (props, modelName) => {
	return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
};
function emit(instance, event, ...rawArgs) {
	if (instance.isUnmounted) return;
	const props = instance.vnode.props || EMPTY_OBJ;
	let args = rawArgs;
	const isModelListener = event.startsWith("update:");
	const modifiers = isModelListener && getModelModifiers(props, event.slice(7));
	if (modifiers) {
		if (modifiers.trim) args = rawArgs.map((a) => isString(a) ? a.trim() : a);
		if (modifiers.number) args = rawArgs.map(looseToNumber);
	}
	let handlerName;
	let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
	if (!handler && isModelListener) handler = props[handlerName = toHandlerKey(hyphenate(event))];
	if (handler) callWithAsyncErrorHandling(handler, instance, 6, args);
	const onceHandler = props[handlerName + `Once`];
	if (onceHandler) {
		if (!instance.emitted) instance.emitted = {};
		else if (instance.emitted[handlerName]) return;
		instance.emitted[handlerName] = true;
		callWithAsyncErrorHandling(onceHandler, instance, 6, args);
	}
}
var mixinEmitsCache = /* @__PURE__ */ new WeakMap();
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
	const cache = asMixin ? mixinEmitsCache : appContext.emitsCache;
	const cached = cache.get(comp);
	if (cached !== void 0) return cached;
	const raw = comp.emits;
	let normalized = {};
	let hasExtends = false;
	if (!isFunction(comp)) {
		const extendEmits = (raw2) => {
			const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
			if (normalizedFromExtend) {
				hasExtends = true;
				extend(normalized, normalizedFromExtend);
			}
		};
		if (!asMixin && appContext.mixins.length) appContext.mixins.forEach(extendEmits);
		if (comp.extends) extendEmits(comp.extends);
		if (comp.mixins) comp.mixins.forEach(extendEmits);
	}
	if (!raw && !hasExtends) {
		if (isObject(comp)) cache.set(comp, null);
		return null;
	}
	if (isArray$1(raw)) raw.forEach((key) => normalized[key] = null);
	else extend(normalized, raw);
	if (isObject(comp)) cache.set(comp, normalized);
	return normalized;
}
function isEmitListener(options, key) {
	if (!options || !isOn(key)) return false;
	key = key.slice(2).replace(/Once$/, "");
	return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
function renderComponentRoot(instance) {
	const { type: Component, vnode, proxy, withProxy, propsOptions: [propsOptions], slots, attrs, emit, render, renderCache, props, data, setupState, ctx, inheritAttrs } = instance;
	const prev = setCurrentRenderingInstance(instance);
	let result;
	let fallthroughAttrs;
	try {
		if (vnode.shapeFlag & 4) {
			const proxyToUse = withProxy || proxy;
			const thisProxy = proxyToUse;
			result = normalizeVNode(render.call(thisProxy, proxyToUse, renderCache, props, setupState, data, ctx));
			fallthroughAttrs = attrs;
		} else {
			const render2 = Component;
			result = normalizeVNode(render2.length > 1 ? render2(props, {
				attrs,
				slots,
				emit
			}) : render2(props, null));
			fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
		}
	} catch (err) {
		blockStack.length = 0;
		handleError(err, instance, 1);
		result = createVNode(Comment);
	}
	let root = result;
	if (fallthroughAttrs && inheritAttrs !== false) {
		const keys = Object.keys(fallthroughAttrs);
		const { shapeFlag } = root;
		if (keys.length) {
			if (shapeFlag & 7) {
				if (propsOptions && keys.some(isModelListener)) fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
				root = cloneVNode(root, fallthroughAttrs, false, true);
			}
		}
	}
	if (vnode.dirs) {
		root = cloneVNode(root, null, false, true);
		root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
	}
	if (vnode.transition) setTransitionHooks(root, vnode.transition);
	result = root;
	setCurrentRenderingInstance(prev);
	return result;
}
var getFunctionalFallthrough = (attrs) => {
	let res;
	for (const key in attrs) if (key === "class" || key === "style" || isOn(key)) (res || (res = {}))[key] = attrs[key];
	return res;
};
var filterModelListeners = (attrs, props) => {
	const res = {};
	for (const key in attrs) if (!isModelListener(key) || !(key.slice(9) in props)) res[key] = attrs[key];
	return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
	const { props: prevProps, children: prevChildren, component } = prevVNode;
	const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
	const emits = component.emitsOptions;
	if (nextVNode.dirs || nextVNode.transition) return true;
	if (optimized && patchFlag >= 0) {
		if (patchFlag & 1024) return true;
		if (patchFlag & 16) {
			if (!prevProps) return !!nextProps;
			return hasPropsChanged(prevProps, nextProps, emits);
		} else if (patchFlag & 8) {
			const dynamicProps = nextVNode.dynamicProps;
			for (let i = 0; i < dynamicProps.length; i++) {
				const key = dynamicProps[i];
				if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emits, key)) return true;
			}
		}
	} else {
		if (prevChildren || nextChildren) {
			if (!nextChildren || !nextChildren.$stable) return true;
		}
		if (prevProps === nextProps) return false;
		if (!prevProps) return !!nextProps;
		if (!nextProps) return true;
		return hasPropsChanged(prevProps, nextProps, emits);
	}
	return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
	const nextKeys = Object.keys(nextProps);
	if (nextKeys.length !== Object.keys(prevProps).length) return true;
	for (let i = 0; i < nextKeys.length; i++) {
		const key = nextKeys[i];
		if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emitsOptions, key)) return true;
	}
	return false;
}
function hasPropValueChanged(nextProps, prevProps, key) {
	const nextProp = nextProps[key];
	const prevProp = prevProps[key];
	if (key === "style" && isObject(nextProp) && isObject(prevProp)) return !looseEqual(nextProp, prevProp);
	return nextProp !== prevProp;
}
function updateHOCHostEl({ vnode, parent, suspense }, el) {
	while (parent) {
		const root = parent.subTree;
		if (root.suspense && root.suspense.activeBranch === vnode) {
			root.suspense.vnode.el = root.el = el;
			vnode = root;
		}
		if (root === vnode) {
			(vnode = parent.vnode).el = el;
			parent = parent.parent;
		} else break;
	}
	if (suspense && suspense.activeBranch === vnode) suspense.vnode.el = el;
}
var internalObjectProto = {};
var createInternalObject = () => Object.create(internalObjectProto);
var isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
function initProps(instance, rawProps, isStateful, isSSR = false) {
	const props = {};
	const attrs = createInternalObject();
	instance.propsDefaults = /* @__PURE__ */ Object.create(null);
	setFullProps(instance, rawProps, props, attrs);
	for (const key in instance.propsOptions[0]) if (!(key in props)) props[key] = void 0;
	if (isStateful) instance.props = isSSR ? props : /* @__PURE__ */ shallowReactive(props);
	else if (!instance.type.props) instance.props = attrs;
	else instance.props = props;
	instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
	const { props, attrs, vnode: { patchFlag } } = instance;
	const rawCurrentProps = /* @__PURE__ */ toRaw(props);
	const [options] = instance.propsOptions;
	let hasAttrsChanged = false;
	if ((optimized || patchFlag > 0) && !(patchFlag & 16)) {
		if (patchFlag & 8) {
			const propsToUpdate = instance.vnode.dynamicProps;
			for (let i = 0; i < propsToUpdate.length; i++) {
				let key = propsToUpdate[i];
				if (isEmitListener(instance.emitsOptions, key)) continue;
				const value = rawProps[key];
				if (options) if (hasOwn(attrs, key)) {
					if (value !== attrs[key]) {
						attrs[key] = value;
						hasAttrsChanged = true;
					}
				} else {
					const camelizedKey = camelize(key);
					props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
				}
				else if (value !== attrs[key]) {
					attrs[key] = value;
					hasAttrsChanged = true;
				}
			}
		}
	} else {
		if (setFullProps(instance, rawProps, props, attrs)) hasAttrsChanged = true;
		let kebabKey;
		for (const key in rawCurrentProps) if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) if (options) {
			if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
		} else delete props[key];
		if (attrs !== rawCurrentProps) {
			for (const key in attrs) if (!rawProps || !hasOwn(rawProps, key) && true) {
				delete attrs[key];
				hasAttrsChanged = true;
			}
		}
	}
	if (hasAttrsChanged) trigger(instance.attrs, "set", "");
}
function setFullProps(instance, rawProps, props, attrs) {
	const [options, needCastKeys] = instance.propsOptions;
	let hasAttrsChanged = false;
	let rawCastValues;
	if (rawProps) for (let key in rawProps) {
		if (isReservedProp(key)) continue;
		const value = rawProps[key];
		let camelKey;
		if (options && hasOwn(options, camelKey = camelize(key))) if (!needCastKeys || !needCastKeys.includes(camelKey)) props[camelKey] = value;
		else (rawCastValues || (rawCastValues = {}))[camelKey] = value;
		else if (!isEmitListener(instance.emitsOptions, key)) {
			if (!(key in attrs) || value !== attrs[key]) {
				attrs[key] = value;
				hasAttrsChanged = true;
			}
		}
	}
	if (needCastKeys) {
		const rawCurrentProps = /* @__PURE__ */ toRaw(props);
		const castValues = rawCastValues || EMPTY_OBJ;
		for (let i = 0; i < needCastKeys.length; i++) {
			const key = needCastKeys[i];
			props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
		}
	}
	return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
	const opt = options[key];
	if (opt != null) {
		const hasDefault = hasOwn(opt, "default");
		if (hasDefault && value === void 0) {
			const defaultValue = opt.default;
			if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
				const { propsDefaults } = instance;
				if (key in propsDefaults) value = propsDefaults[key];
				else {
					const reset = setCurrentInstance(instance);
					value = propsDefaults[key] = defaultValue.call(null, props);
					reset();
				}
			} else value = defaultValue;
			if (instance.ce) instance.ce._setProp(key, value);
		}
		if (opt[0]) {
			if (isAbsent && !hasDefault) value = false;
			else if (opt[1] && (value === "" || value === hyphenate(key))) value = true;
		}
	}
	return value;
}
var mixinPropsCache = /* @__PURE__ */ new WeakMap();
function normalizePropsOptions(comp, appContext, asMixin = false) {
	const cache = asMixin ? mixinPropsCache : appContext.propsCache;
	const cached = cache.get(comp);
	if (cached) return cached;
	const raw = comp.props;
	const normalized = {};
	const needCastKeys = [];
	let hasExtends = false;
	if (!isFunction(comp)) {
		const extendProps = (raw2) => {
			hasExtends = true;
			const [props, keys] = normalizePropsOptions(raw2, appContext, true);
			extend(normalized, props);
			if (keys) needCastKeys.push(...keys);
		};
		if (!asMixin && appContext.mixins.length) appContext.mixins.forEach(extendProps);
		if (comp.extends) extendProps(comp.extends);
		if (comp.mixins) comp.mixins.forEach(extendProps);
	}
	if (!raw && !hasExtends) {
		if (isObject(comp)) cache.set(comp, EMPTY_ARR);
		return EMPTY_ARR;
	}
	if (isArray$1(raw)) for (let i = 0; i < raw.length; i++) {
		const normalizedKey = camelize(raw[i]);
		if (validatePropName(normalizedKey)) normalized[normalizedKey] = EMPTY_OBJ;
	}
	else if (raw) for (const key in raw) {
		const normalizedKey = camelize(key);
		if (validatePropName(normalizedKey)) {
			const opt = raw[key];
			const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
			const propType = prop.type;
			let shouldCast = false;
			let shouldCastTrue = true;
			if (isArray$1(propType)) for (let index = 0; index < propType.length; ++index) {
				const type = propType[index];
				const typeName = isFunction(type) && type.name;
				if (typeName === "Boolean") {
					shouldCast = true;
					break;
				} else if (typeName === "String") shouldCastTrue = false;
			}
			else shouldCast = isFunction(propType) && propType.name === "Boolean";
			prop[0] = shouldCast;
			prop[1] = shouldCastTrue;
			if (shouldCast || hasOwn(prop, "default")) needCastKeys.push(normalizedKey);
		}
	}
	const res = [normalized, needCastKeys];
	if (isObject(comp)) cache.set(comp, res);
	return res;
}
function validatePropName(key) {
	if (key[0] !== "$" && !isReservedProp(key)) return true;
	return false;
}
var isInternalKey = (key) => key === "_" || key === "_ctx" || key === "$stable";
var normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
var normalizeSlot$1 = (key, rawSlot, ctx) => {
	if (rawSlot._n) return rawSlot;
	const normalized = withCtx((...args) => {
		return normalizeSlotValue(rawSlot(...args));
	}, ctx);
	normalized._c = false;
	return normalized;
};
var normalizeObjectSlots = (rawSlots, slots, instance) => {
	const ctx = rawSlots._ctx;
	for (const key in rawSlots) {
		if (isInternalKey(key)) continue;
		const value = rawSlots[key];
		if (isFunction(value)) slots[key] = normalizeSlot$1(key, value, ctx);
		else if (value != null) {
			const normalized = normalizeSlotValue(value);
			slots[key] = () => normalized;
		}
	}
};
var normalizeVNodeSlots = (instance, children) => {
	const normalized = normalizeSlotValue(children);
	instance.slots.default = () => normalized;
};
var assignSlots = (slots, children, optimized) => {
	for (const key in children) if (optimized || !isInternalKey(key)) slots[key] = children[key];
};
var initSlots = (instance, children, optimized) => {
	const slots = instance.slots = createInternalObject();
	if (instance.vnode.shapeFlag & 32) {
		const type = children._;
		if (type) {
			assignSlots(slots, children, optimized);
			if (optimized) def(slots, "_", type, true);
		} else normalizeObjectSlots(children, slots);
	} else if (children) normalizeVNodeSlots(instance, children);
};
var updateSlots = (instance, children, optimized) => {
	const { vnode, slots } = instance;
	let needDeletionCheck = true;
	let deletionComparisonTarget = EMPTY_OBJ;
	if (vnode.shapeFlag & 32) {
		const type = children._;
		if (type) if (optimized && type === 1) needDeletionCheck = false;
		else assignSlots(slots, children, optimized);
		else {
			needDeletionCheck = !children.$stable;
			normalizeObjectSlots(children, slots);
		}
		deletionComparisonTarget = children;
	} else if (children) {
		normalizeVNodeSlots(instance, children);
		deletionComparisonTarget = { default: 1 };
	}
	if (needDeletionCheck) {
		for (const key in slots) if (!isInternalKey(key) && deletionComparisonTarget[key] == null) delete slots[key];
	}
};
var queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
	return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
	const target = getGlobalThis();
	target.__VUE__ = true;
	const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, insertStaticContent: hostInsertStaticContent } = options;
	const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
		if (n1 === n2) return;
		if (n1 && !isSameVNodeType(n1, n2)) {
			anchor = getNextHostNode(n1);
			unmount(n1, parentComponent, parentSuspense, true);
			n1 = null;
		}
		if (n2.patchFlag === -2) {
			optimized = false;
			n2.dynamicChildren = null;
		}
		const { type, ref, shapeFlag } = n2;
		switch (type) {
			case Text:
				processText(n1, n2, container, anchor);
				break;
			case Comment:
				processCommentNode(n1, n2, container, anchor);
				break;
			case Static:
				if (n1 == null) mountStaticNode(n2, container, anchor, namespace);
				break;
			case Fragment:
				processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				break;
			default: if (shapeFlag & 1) processElement(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else if (shapeFlag & 6) processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else if (shapeFlag & 64) type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
			else if (shapeFlag & 128) type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
		}
		if (ref != null && parentComponent) setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
		else if (ref == null && n1 && n1.ref != null) setRef(n1.ref, null, parentSuspense, n1, true);
	};
	const processText = (n1, n2, container, anchor) => {
		if (n1 == null) hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
		else {
			const el = n2.el = n1.el;
			if (n2.children !== n1.children) hostSetText(el, n2.children);
		}
	};
	const processCommentNode = (n1, n2, container, anchor) => {
		if (n1 == null) hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
		else n2.el = n1.el;
	};
	const mountStaticNode = (n2, container, anchor, namespace) => {
		[n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace, n2.el, n2.anchor);
	};
	const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
		let next;
		while (el && el !== anchor) {
			next = hostNextSibling(el);
			hostInsert(el, container, nextSibling);
			el = next;
		}
		hostInsert(anchor, container, nextSibling);
	};
	const removeStaticNode = ({ el, anchor }) => {
		let next;
		while (el && el !== anchor) {
			next = hostNextSibling(el);
			hostRemove(el);
			el = next;
		}
		hostRemove(anchor);
	};
	const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		if (n2.type === "svg") namespace = "svg";
		else if (n2.type === "math") namespace = "mathml";
		if (n1 == null) mountElement(n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		else {
			const customElement = n1.el && n1.el._isVueCE ? n1.el : null;
			try {
				if (customElement) customElement._beginPatch();
				patchElement(n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			} finally {
				if (customElement) customElement._endPatch();
			}
		}
	};
	const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		let el;
		let vnodeHook;
		const { props, shapeFlag, transition, dirs } = vnode;
		el = vnode.el = hostCreateElement(vnode.type, namespace, props && props.is, props);
		if (shapeFlag & 8) hostSetElementText(el, vnode.children);
		else if (shapeFlag & 16) mountChildren(vnode.children, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(vnode, namespace), slotScopeIds, optimized);
		if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "created");
		setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
		if (props) {
			for (const key in props) if (key !== "value" && !isReservedProp(key)) hostPatchProp(el, key, null, props[key], namespace, parentComponent);
			if ("value" in props) hostPatchProp(el, "value", null, props.value, namespace);
			if (vnodeHook = props.onVnodeBeforeMount) invokeVNodeHook(vnodeHook, parentComponent, vnode);
		}
		if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
		const needCallTransitionHooks = needTransition(parentSuspense, transition);
		if (needCallTransitionHooks) transition.beforeEnter(el);
		hostInsert(el, container, anchor);
		if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) queuePostRenderEffect(() => {
			try {
				vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
				needCallTransitionHooks && transition.enter(el);
				dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
			} finally {}
		}, parentSuspense);
	};
	const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
		if (scopeId) hostSetScopeId(el, scopeId);
		if (slotScopeIds) for (let i = 0; i < slotScopeIds.length; i++) hostSetScopeId(el, slotScopeIds[i]);
		if (parentComponent) {
			let subTree = parentComponent.subTree;
			if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
				const parentVNode = parentComponent.vnode;
				setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
			}
		}
	};
	const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
		for (let i = start; i < children.length; i++) patch(null, children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]), container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
	};
	const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		const el = n2.el = n1.el;
		let { patchFlag, dynamicChildren, dirs } = n2;
		patchFlag |= n1.patchFlag & 16;
		const oldProps = n1.props || EMPTY_OBJ;
		const newProps = n2.props || EMPTY_OBJ;
		let vnodeHook;
		parentComponent && toggleRecurse(parentComponent, false);
		if (vnodeHook = newProps.onVnodeBeforeUpdate) invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
		if (dirs) invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
		parentComponent && toggleRecurse(parentComponent, true);
		if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) hostSetElementText(el, "");
		if (dynamicChildren) patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds);
		else if (!optimized) patchChildren(n1, n2, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds, false);
		if (patchFlag > 0) {
			if (patchFlag & 16) patchProps(el, oldProps, newProps, parentComponent, namespace);
			else {
				if (patchFlag & 2) {
					if (oldProps.class !== newProps.class) hostPatchProp(el, "class", null, newProps.class, namespace);
				}
				if (patchFlag & 4) hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
				if (patchFlag & 8) {
					const propsToUpdate = n2.dynamicProps;
					for (let i = 0; i < propsToUpdate.length; i++) {
						const key = propsToUpdate[i];
						const prev = oldProps[key];
						const next = newProps[key];
						if (next !== prev || key === "value") hostPatchProp(el, key, prev, next, namespace, parentComponent);
					}
				}
			}
			if (patchFlag & 1) {
				if (n1.children !== n2.children) hostSetElementText(el, n2.children);
			}
		} else if (!optimized && dynamicChildren == null) patchProps(el, oldProps, newProps, parentComponent, namespace);
		if ((vnodeHook = newProps.onVnodeUpdated) || dirs) queuePostRenderEffect(() => {
			vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
			dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
		}, parentSuspense);
	};
	const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
		for (let i = 0; i < newChildren.length; i++) {
			const oldVNode = oldChildren[i];
			const newVNode = newChildren[i];
			patch(oldVNode, newVNode, oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & 198) ? hostParentNode(oldVNode.el) : fallbackContainer, null, parentComponent, parentSuspense, namespace, slotScopeIds, true);
		}
	};
	const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
		if (oldProps !== newProps) {
			if (oldProps !== EMPTY_OBJ) {
				for (const key in oldProps) if (!isReservedProp(key) && !(key in newProps)) hostPatchProp(el, key, oldProps[key], null, namespace, parentComponent);
			}
			for (const key in newProps) {
				if (isReservedProp(key)) continue;
				const next = newProps[key];
				const prev = oldProps[key];
				if (next !== prev && key !== "value") hostPatchProp(el, key, prev, next, namespace, parentComponent);
			}
			if ("value" in newProps) hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
		}
	};
	const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
		const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
		let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
		if (fragmentSlotScopeIds) slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
		if (n1 == null) {
			hostInsert(fragmentStartAnchor, container, anchor);
			hostInsert(fragmentEndAnchor, container, anchor);
			mountChildren(n2.children || [], container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		} else if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren && n1.dynamicChildren.length === dynamicChildren.length) {
			patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, namespace, slotScopeIds);
			if (n2.key != null || parentComponent && n2 === parentComponent.subTree) traverseStaticChildren(n1, n2, true);
		} else patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
	};
	const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		n2.slotScopeIds = slotScopeIds;
		if (n1 == null) if (n2.shapeFlag & 512) parentComponent.ctx.activate(n2, container, anchor, namespace, optimized);
		else mountComponent(n2, container, anchor, parentComponent, parentSuspense, namespace, optimized);
		else updateComponent(n1, n2, optimized);
	};
	const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
		const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
		if (isKeepAlive(initialVNode)) instance.ctx.renderer = internals;
		setupComponent(instance, false, optimized);
		if (instance.asyncDep) {
			parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
			if (!initialVNode.el) {
				const placeholder = instance.subTree = createVNode(Comment);
				processCommentNode(null, placeholder, container, anchor);
				initialVNode.placeholder = placeholder.el;
			}
		} else setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, namespace, optimized);
	};
	const updateComponent = (n1, n2, optimized) => {
		const instance = n2.component = n1.component;
		if (shouldUpdateComponent(n1, n2, optimized)) if (instance.asyncDep && !instance.asyncResolved) {
			updateComponentPreRender(instance, n2, optimized);
			return;
		} else {
			instance.next = n2;
			instance.update();
		}
		else {
			n2.el = n1.el;
			instance.vnode = n2;
		}
	};
	const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
		const componentUpdateFn = () => {
			if (!instance.isMounted) {
				let vnodeHook;
				const { el, props } = initialVNode;
				const { bm, m, parent, root, type } = instance;
				const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
				toggleRecurse(instance, false);
				if (bm) invokeArrayFns(bm);
				if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) invokeVNodeHook(vnodeHook, parent, initialVNode);
				toggleRecurse(instance, true);
				if (el && hydrateNode) {
					const hydrateSubTree = () => {
						instance.subTree = renderComponentRoot(instance);
						hydrateNode(el, instance.subTree, instance, parentSuspense, null);
					};
					if (isAsyncWrapperVNode && type.__asyncHydrate) type.__asyncHydrate(el, instance, hydrateSubTree);
					else hydrateSubTree();
				} else {
					if (root.ce && root.ce._hasShadowRoot()) root.ce._injectChildStyle(type, instance.parent ? instance.parent.type : void 0);
					const subTree = instance.subTree = renderComponentRoot(instance);
					patch(null, subTree, container, anchor, instance, parentSuspense, namespace);
					initialVNode.el = subTree.el;
				}
				if (m) queuePostRenderEffect(m, parentSuspense);
				if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
					const scopedInitialVNode = initialVNode;
					queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
				}
				if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) instance.a && queuePostRenderEffect(instance.a, parentSuspense);
				instance.isMounted = true;
				initialVNode = container = anchor = null;
			} else {
				let { next, bu, u, parent, vnode } = instance;
				{
					const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
					if (nonHydratedAsyncRoot) {
						if (next) {
							next.el = vnode.el;
							updateComponentPreRender(instance, next, optimized);
						}
						nonHydratedAsyncRoot.asyncDep.then(() => {
							queuePostRenderEffect(() => {
								if (!instance.isUnmounted) update();
							}, parentSuspense);
						});
						return;
					}
				}
				let originNext = next;
				let vnodeHook;
				toggleRecurse(instance, false);
				if (next) {
					next.el = vnode.el;
					updateComponentPreRender(instance, next, optimized);
				} else next = vnode;
				if (bu) invokeArrayFns(bu);
				if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) invokeVNodeHook(vnodeHook, parent, next, vnode);
				toggleRecurse(instance, true);
				const nextTree = renderComponentRoot(instance);
				const prevTree = instance.subTree;
				instance.subTree = nextTree;
				patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, namespace);
				next.el = nextTree.el;
				if (originNext === null) updateHOCHostEl(instance, nextTree.el);
				if (u) queuePostRenderEffect(u, parentSuspense);
				if (vnodeHook = next.props && next.props.onVnodeUpdated) queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
			}
		};
		instance.scope.on();
		const effect = instance.effect = new ReactiveEffect(componentUpdateFn);
		instance.scope.off();
		const update = instance.update = effect.run.bind(effect);
		const job = instance.job = effect.runIfDirty.bind(effect);
		job.i = instance;
		job.id = instance.uid;
		effect.scheduler = () => queueJob(job);
		toggleRecurse(instance, true);
		update();
	};
	const updateComponentPreRender = (instance, nextVNode, optimized) => {
		nextVNode.component = instance;
		const prevProps = instance.vnode.props;
		instance.vnode = nextVNode;
		instance.next = null;
		updateProps(instance, nextVNode.props, prevProps, optimized);
		updateSlots(instance, nextVNode.children, optimized);
		pauseTracking();
		flushPreFlushCbs(instance);
		resetTracking();
	};
	const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
		const c1 = n1 && n1.children;
		const prevShapeFlag = n1 ? n1.shapeFlag : 0;
		const c2 = n2.children;
		const { patchFlag, shapeFlag } = n2;
		if (patchFlag > 0) {
			if (patchFlag & 128) {
				patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				return;
			} else if (patchFlag & 256) {
				patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				return;
			}
		}
		if (shapeFlag & 8) {
			if (prevShapeFlag & 16) unmountChildren(c1, parentComponent, parentSuspense);
			if (c2 !== c1) hostSetElementText(container, c2);
		} else if (prevShapeFlag & 16) if (shapeFlag & 16) patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		else unmountChildren(c1, parentComponent, parentSuspense, true);
		else {
			if (prevShapeFlag & 8) hostSetElementText(container, "");
			if (shapeFlag & 16) mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		}
	};
	const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		c1 = c1 || EMPTY_ARR;
		c2 = c2 || EMPTY_ARR;
		const oldLength = c1.length;
		const newLength = c2.length;
		const commonLength = Math.min(oldLength, newLength);
		let i;
		for (i = 0; i < commonLength; i++) {
			const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
			patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		}
		if (oldLength > newLength) unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
		else mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, commonLength);
	};
	const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		let i = 0;
		const l2 = c2.length;
		let e1 = c1.length - 1;
		let e2 = l2 - 1;
		while (i <= e1 && i <= e2) {
			const n1 = c1[i];
			const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
			if (isSameVNodeType(n1, n2)) patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else break;
			i++;
		}
		while (i <= e1 && i <= e2) {
			const n1 = c1[e1];
			const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
			if (isSameVNodeType(n1, n2)) patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else break;
			e1--;
			e2--;
		}
		if (i > e1) {
			if (i <= e2) {
				const nextPos = e2 + 1;
				const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
				while (i <= e2) {
					patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
					i++;
				}
			}
		} else if (i > e2) while (i <= e1) {
			unmount(c1[i], parentComponent, parentSuspense, true);
			i++;
		}
		else {
			const s1 = i;
			const s2 = i;
			const keyToNewIndexMap = /* @__PURE__ */ new Map();
			for (i = s2; i <= e2; i++) {
				const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
				if (nextChild.key != null) keyToNewIndexMap.set(nextChild.key, i);
			}
			let j;
			let patched = 0;
			const toBePatched = e2 - s2 + 1;
			let moved = false;
			let maxNewIndexSoFar = 0;
			const newIndexToOldIndexMap = new Array(toBePatched);
			for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
			for (i = s1; i <= e1; i++) {
				const prevChild = c1[i];
				if (patched >= toBePatched) {
					unmount(prevChild, parentComponent, parentSuspense, true);
					continue;
				}
				let newIndex;
				if (prevChild.key != null) newIndex = keyToNewIndexMap.get(prevChild.key);
				else for (j = s2; j <= e2; j++) if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
					newIndex = j;
					break;
				}
				if (newIndex === void 0) unmount(prevChild, parentComponent, parentSuspense, true);
				else {
					newIndexToOldIndexMap[newIndex - s2] = i + 1;
					if (newIndex >= maxNewIndexSoFar) maxNewIndexSoFar = newIndex;
					else moved = true;
					patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
					patched++;
				}
			}
			const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
			j = increasingNewIndexSequence.length - 1;
			for (i = toBePatched - 1; i >= 0; i--) {
				const nextIndex = s2 + i;
				const nextChild = c2[nextIndex];
				const anchorVNode = c2[nextIndex + 1];
				const anchor = nextIndex + 1 < l2 ? anchorVNode.el || resolveAsyncComponentPlaceholder(anchorVNode) : parentAnchor;
				if (newIndexToOldIndexMap[i] === 0) patch(null, nextChild, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				else if (moved) if (j < 0 || i !== increasingNewIndexSequence[j]) move(nextChild, container, anchor, 2);
				else j--;
			}
		}
	};
	const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
		const { el, type, transition, children, shapeFlag } = vnode;
		if (shapeFlag & 6) {
			move(vnode.component.subTree, container, anchor, moveType);
			return;
		}
		if (shapeFlag & 128) {
			vnode.suspense.move(container, anchor, moveType);
			return;
		}
		if (shapeFlag & 64) {
			type.move(vnode, container, anchor, internals);
			return;
		}
		if (type === Fragment) {
			hostInsert(el, container, anchor);
			for (let i = 0; i < children.length; i++) move(children[i], container, anchor, moveType);
			hostInsert(vnode.anchor, container, anchor);
			return;
		}
		if (type === Static) {
			moveStaticNode(vnode, container, anchor);
			return;
		}
		if (moveType !== 2 && shapeFlag & 1 && transition) if (moveType === 0) if (transition.persisted && !el[leaveCbKey]) hostInsert(el, container, anchor);
		else {
			transition.beforeEnter(el);
			hostInsert(el, container, anchor);
			queuePostRenderEffect(() => transition.enter(el), parentSuspense);
		}
		else {
			const { leave, delayLeave, afterLeave } = transition;
			const remove2 = () => {
				if (vnode.ctx.isUnmounted) hostRemove(el);
				else hostInsert(el, container, anchor);
			};
			const performLeave = () => {
				const wasLeaving = el._isLeaving || !!el[leaveCbKey];
				if (el._isLeaving) el[leaveCbKey](true);
				if (transition.persisted && !wasLeaving) remove2();
				else leave(el, () => {
					remove2();
					afterLeave && afterLeave();
				});
			};
			if (delayLeave) delayLeave(el, remove2, performLeave);
			else performLeave();
		}
		else hostInsert(el, container, anchor);
	};
	const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
		const { type, props, ref, children, dynamicChildren, shapeFlag, patchFlag, dirs, cacheIndex, memo } = vnode;
		if (patchFlag === -2) optimized = false;
		if (ref != null) {
			pauseTracking();
			setRef(ref, null, parentSuspense, vnode, true);
			resetTracking();
		}
		if (cacheIndex != null) parentComponent.renderCache[cacheIndex] = void 0;
		if (shapeFlag & 256) {
			parentComponent.ctx.deactivate(vnode);
			return;
		}
		const shouldInvokeDirs = shapeFlag & 1 && dirs;
		const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
		let vnodeHook;
		if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) invokeVNodeHook(vnodeHook, parentComponent, vnode);
		if (shapeFlag & 6) unmountComponent(vnode.component, parentSuspense, doRemove);
		else {
			if (shapeFlag & 128) {
				vnode.suspense.unmount(parentSuspense, doRemove);
				return;
			}
			if (shouldInvokeDirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
			if (shapeFlag & 64) vnode.type.remove(vnode, parentComponent, parentSuspense, internals, doRemove);
			else if (dynamicChildren && !dynamicChildren.hasOnce && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
			else if (type === Fragment && patchFlag & 384 || !optimized && shapeFlag & 16) unmountChildren(children, parentComponent, parentSuspense);
			if (doRemove) remove(vnode);
		}
		const shouldInvalidateMemo = memo != null && cacheIndex == null;
		if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs || shouldInvalidateMemo) queuePostRenderEffect(() => {
			vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
			shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
			if (shouldInvalidateMemo) vnode.el = null;
		}, parentSuspense);
	};
	const remove = (vnode) => {
		const { type, el, anchor, transition } = vnode;
		if (type === Fragment) {
			removeFragment(el, anchor);
			return;
		}
		if (type === Static) {
			removeStaticNode(vnode);
			return;
		}
		const performRemove = () => {
			hostRemove(el);
			if (transition && !transition.persisted && transition.afterLeave) transition.afterLeave();
		};
		if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
			const { leave, delayLeave } = transition;
			const performLeave = () => leave(el, performRemove);
			if (delayLeave) delayLeave(vnode.el, performRemove, performLeave);
			else performLeave();
		} else performRemove();
	};
	const removeFragment = (cur, end) => {
		let next;
		while (cur !== end) {
			next = hostNextSibling(cur);
			hostRemove(cur);
			cur = next;
		}
		hostRemove(end);
	};
	const unmountComponent = (instance, parentSuspense, doRemove) => {
		const { bum, scope, job, subTree, um, m, a } = instance;
		invalidateMount(m);
		invalidateMount(a);
		if (bum) invokeArrayFns(bum);
		scope.stop();
		if (job) {
			job.flags |= 8;
			unmount(subTree, instance, parentSuspense, doRemove);
		}
		if (um) queuePostRenderEffect(um, parentSuspense);
		queuePostRenderEffect(() => {
			instance.isUnmounted = true;
		}, parentSuspense);
	};
	const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
		for (let i = start; i < children.length; i++) unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
	};
	const getNextHostNode = (vnode) => {
		if (vnode.shapeFlag & 6) return getNextHostNode(vnode.component.subTree);
		if (vnode.shapeFlag & 128) return vnode.suspense.next();
		const el = hostNextSibling(vnode.anchor || vnode.el);
		const teleportEnd = el && el[TeleportEndKey];
		return teleportEnd ? hostNextSibling(teleportEnd) : el;
	};
	let isFlushing = false;
	const render = (vnode, container, namespace) => {
		let instance;
		if (vnode == null) {
			if (container._vnode) {
				unmount(container._vnode, null, null, true);
				instance = container._vnode.component;
			}
		} else patch(container._vnode || null, vnode, container, null, null, null, namespace);
		container._vnode = vnode;
		if (!isFlushing) {
			isFlushing = true;
			flushPreFlushCbs(instance);
			flushPostFlushCbs();
			isFlushing = false;
		}
	};
	const internals = {
		p: patch,
		um: unmount,
		m: move,
		r: remove,
		mt: mountComponent,
		mc: mountChildren,
		pc: patchChildren,
		pbc: patchBlockChildren,
		n: getNextHostNode,
		o: options
	};
	let hydrate;
	let hydrateNode;
	if (createHydrationFns) [hydrate, hydrateNode] = createHydrationFns(internals);
	return {
		render,
		hydrate,
		createApp: createAppAPI(render, hydrate)
	};
}
function resolveChildrenNamespace({ type, props }, currentNamespace) {
	return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect, job }, allowed) {
	if (allowed) {
		effect.flags |= 32;
		job.flags |= 4;
	} else {
		effect.flags &= -33;
		job.flags &= -5;
	}
}
function needTransition(parentSuspense, transition) {
	return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
	const ch1 = n1.children;
	const ch2 = n2.children;
	if (isArray$1(ch1) && isArray$1(ch2)) for (let i = 0; i < ch1.length; i++) {
		const c1 = ch1[i];
		let c2 = ch2[i];
		if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
			if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
				c2 = ch2[i] = cloneIfMounted(ch2[i]);
				c2.el = c1.el;
			}
			if (!shallow && c2.patchFlag !== -2) traverseStaticChildren(c1, c2);
		}
		if (c2.type === Text) {
			if (c2.patchFlag === -1) c2 = ch2[i] = cloneIfMounted(c2);
			c2.el = c1.el;
		}
		if (c2.type === Comment && !c2.el) c2.el = c1.el;
	}
}
function getSequence(arr) {
	const p = arr.slice();
	const result = [0];
	let i, j, u, v, c;
	const len = arr.length;
	for (i = 0; i < len; i++) {
		const arrI = arr[i];
		if (arrI !== 0) {
			j = result[result.length - 1];
			if (arr[j] < arrI) {
				p[i] = j;
				result.push(i);
				continue;
			}
			u = 0;
			v = result.length - 1;
			while (u < v) {
				c = u + v >> 1;
				if (arr[result[c]] < arrI) u = c + 1;
				else v = c;
			}
			if (arrI < arr[result[u]]) {
				if (u > 0) p[i] = result[u - 1];
				result[u] = i;
			}
		}
	}
	u = result.length;
	v = result[u - 1];
	while (u-- > 0) {
		result[u] = v;
		v = p[v];
	}
	return result;
}
function locateNonHydratedAsyncRoot(instance) {
	const subComponent = instance.subTree.component;
	if (subComponent) if (subComponent.asyncDep && !subComponent.asyncResolved) return subComponent;
	else return locateNonHydratedAsyncRoot(subComponent);
}
function invalidateMount(hooks) {
	if (hooks) for (let i = 0; i < hooks.length; i++) hooks[i].flags |= 8;
}
function resolveAsyncComponentPlaceholder(anchorVnode) {
	if (anchorVnode.placeholder) return anchorVnode.placeholder;
	const instance = anchorVnode.component;
	if (instance) return resolveAsyncComponentPlaceholder(instance.subTree);
	return null;
}
var isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
	if (suspense && suspense.pendingBranch) if (isArray$1(fn)) suspense.effects.push(...fn);
	else suspense.effects.push(fn);
	else queuePostFlushCb(fn);
}
var Fragment = /* @__PURE__ */ Symbol.for("v-fgt");
var Text = /* @__PURE__ */ Symbol.for("v-txt");
var Comment = /* @__PURE__ */ Symbol.for("v-cmt");
var Static = /* @__PURE__ */ Symbol.for("v-stc");
var blockStack = [];
var currentBlock = null;
function openBlock(disableTracking = false) {
	blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
	blockStack.pop();
	currentBlock = blockStack[blockStack.length - 1] || null;
}
var isBlockTreeEnabled = 1;
function setBlockTracking(value, inVOnce = false) {
	isBlockTreeEnabled += value;
	if (value < 0 && currentBlock && inVOnce) currentBlock.hasOnce = true;
}
function setupBlock(vnode) {
	vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
	closeBlock();
	if (isBlockTreeEnabled > 0 && currentBlock) currentBlock.push(vnode);
	return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
	return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
	return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
}
function isVNode(value) {
	return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
	return n1.type === n2.type && n1.key === n2.key;
}
var normalizeKey = ({ key }) => key != null ? key : null;
var normalizeRef = ({ ref, ref_key, ref_for }) => {
	if (typeof ref === "number") ref = "" + ref;
	return ref != null ? isString(ref) || /* @__PURE__ */ isRef(ref) || isFunction(ref) ? {
		i: currentRenderingInstance,
		r: ref,
		k: ref_key,
		f: !!ref_for
	} : ref : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
	const vnode = {
		__v_isVNode: true,
		__v_skip: true,
		type,
		props,
		key: props && normalizeKey(props),
		ref: props && normalizeRef(props),
		scopeId: currentScopeId,
		slotScopeIds: null,
		children,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetStart: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag,
		patchFlag,
		dynamicProps,
		dynamicChildren: null,
		appContext: null,
		ctx: currentRenderingInstance
	};
	if (needFullChildrenNormalization) {
		normalizeChildren(vnode, children);
		if (shapeFlag & 128) type.normalize(vnode);
	} else if (children) vnode.shapeFlag |= isString(children) ? 8 : 16;
	if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) currentBlock.push(vnode);
	return vnode;
}
var createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
	if (!type || type === NULL_DYNAMIC_COMPONENT) type = Comment;
	if (isVNode(type)) {
		const cloned = cloneVNode(type, props, true);
		if (children) normalizeChildren(cloned, children);
		if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) if (cloned.shapeFlag & 6) currentBlock[currentBlock.indexOf(type)] = cloned;
		else currentBlock.push(cloned);
		cloned.patchFlag = -2;
		return cloned;
	}
	if (isClassComponent(type)) type = type.__vccOpts;
	if (props) {
		props = guardReactiveProps(props);
		let { class: klass, style } = props;
		if (klass && !isString(klass)) props.class = normalizeClass(klass);
		if (isObject(style)) {
			if (/* @__PURE__ */ isProxy(style) && !isArray$1(style)) style = extend({}, style);
			props.style = normalizeStyle(style);
		}
	}
	const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
	return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props) {
	if (!props) return null;
	return /* @__PURE__ */ isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
	const { props, ref, patchFlag, children, transition } = vnode;
	const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
	const cloned = {
		__v_isVNode: true,
		__v_skip: true,
		type: vnode.type,
		props: mergedProps,
		key: mergedProps && normalizeKey(mergedProps),
		ref: extraProps && extraProps.ref ? mergeRef && ref ? isArray$1(ref) ? ref.concat(normalizeRef(extraProps)) : [ref, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref,
		scopeId: vnode.scopeId,
		slotScopeIds: vnode.slotScopeIds,
		children,
		target: vnode.target,
		targetStart: vnode.targetStart,
		targetAnchor: vnode.targetAnchor,
		staticCount: vnode.staticCount,
		shapeFlag: vnode.shapeFlag,
		patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
		dynamicProps: vnode.dynamicProps,
		dynamicChildren: vnode.dynamicChildren,
		appContext: vnode.appContext,
		dirs: vnode.dirs,
		transition,
		component: vnode.component,
		suspense: vnode.suspense,
		ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
		ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
		placeholder: vnode.placeholder,
		el: vnode.el,
		anchor: vnode.anchor,
		ctx: vnode.ctx,
		ce: vnode.ce
	};
	if (transition && cloneTransition) setTransitionHooks(cloned, transition.clone(cloned));
	return cloned;
}
function createTextVNode(text = " ", flag = 0) {
	return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
	const vnode = createVNode(Static, null, content);
	vnode.staticCount = numberOfNodes;
	return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
	return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
	if (child == null || typeof child === "boolean") return createVNode(Comment);
	else if (isArray$1(child)) return createVNode(Fragment, null, child.slice());
	else if (isVNode(child)) return cloneIfMounted(child);
	else return createVNode(Text, null, String(child));
}
function cloneIfMounted(child) {
	return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
	let type = 0;
	const { shapeFlag } = vnode;
	if (children == null) children = null;
	else if (isArray$1(children)) type = 16;
	else if (typeof children === "object") if (shapeFlag & 65) {
		const slot = children.default;
		if (slot) {
			slot._c && (slot._d = false);
			normalizeChildren(vnode, slot());
			slot._c && (slot._d = true);
		}
		return;
	} else {
		type = 32;
		const slotFlag = children._;
		if (!slotFlag && !isInternalObject(children)) children._ctx = currentRenderingInstance;
		else if (slotFlag === 3 && currentRenderingInstance) if (currentRenderingInstance.slots._ === 1) children._ = 1;
		else {
			children._ = 2;
			vnode.patchFlag |= 1024;
		}
	}
	else if (isFunction(children)) {
		children = {
			default: children,
			_ctx: currentRenderingInstance
		};
		type = 32;
	} else {
		children = String(children);
		if (shapeFlag & 64) {
			type = 16;
			children = [createTextVNode(children)];
		} else type = 8;
	}
	vnode.children = children;
	vnode.shapeFlag |= type;
}
function mergeProps(...args) {
	const ret = {};
	for (let i = 0; i < args.length; i++) {
		const toMerge = args[i];
		for (const key in toMerge) if (key === "class") {
			if (ret.class !== toMerge.class) ret.class = normalizeClass([ret.class, toMerge.class]);
		} else if (key === "style") ret.style = normalizeStyle([ret.style, toMerge.style]);
		else if (isOn(key)) {
			const existing = ret[key];
			const incoming = toMerge[key];
			if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) ret[key] = existing ? [].concat(existing, incoming) : incoming;
			else if (incoming == null && existing == null && !isModelListener(key)) ret[key] = incoming;
		} else if (key !== "") ret[key] = toMerge[key];
	}
	return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
	callWithAsyncErrorHandling(hook, instance, 7, [vnode, prevVNode]);
}
var emptyAppContext = createAppContext();
var uid = 0;
function createComponentInstance(vnode, parent, suspense) {
	const type = vnode.type;
	const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
	const instance = {
		uid: uid++,
		vnode,
		type,
		parent,
		appContext,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new EffectScope(true),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: parent ? parent.provides : Object.create(appContext.provides),
		ids: parent ? parent.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: normalizePropsOptions(type, appContext),
		emitsOptions: normalizeEmitsOptions(type, appContext),
		emit: null,
		emitted: null,
		propsDefaults: EMPTY_OBJ,
		inheritAttrs: type.inheritAttrs,
		ctx: EMPTY_OBJ,
		data: EMPTY_OBJ,
		props: EMPTY_OBJ,
		attrs: EMPTY_OBJ,
		slots: EMPTY_OBJ,
		refs: EMPTY_OBJ,
		setupState: EMPTY_OBJ,
		setupContext: null,
		suspense,
		suspenseId: suspense ? suspense.pendingId : 0,
		asyncDep: null,
		asyncResolved: false,
		isMounted: false,
		isUnmounted: false,
		isDeactivated: false,
		bc: null,
		c: null,
		bm: null,
		m: null,
		bu: null,
		u: null,
		um: null,
		bum: null,
		da: null,
		a: null,
		rtg: null,
		rtc: null,
		ec: null,
		sp: null
	};
	instance.ctx = { _: instance };
	instance.root = parent ? parent.root : instance;
	instance.emit = emit.bind(null, instance);
	if (vnode.ce) vnode.ce(instance);
	return instance;
}
var currentInstance = null;
var getCurrentInstance = () => currentInstance || currentRenderingInstance;
var internalSetCurrentInstance;
var setInSSRSetupState;
{
	const g = getGlobalThis();
	const registerGlobalSetter = (key, setter) => {
		let setters;
		if (!(setters = g[key])) setters = g[key] = [];
		setters.push(setter);
		return (v) => {
			if (setters.length > 1) setters.forEach((set) => set(v));
			else setters[0](v);
		};
	};
	internalSetCurrentInstance = registerGlobalSetter(`__VUE_INSTANCE_SETTERS__`, (v) => currentInstance = v);
	setInSSRSetupState = registerGlobalSetter(`__VUE_SSR_SETTERS__`, (v) => isInSSRComponentSetup = v);
}
var setCurrentInstance = (instance) => {
	const prev = currentInstance;
	internalSetCurrentInstance(instance);
	instance.scope.on();
	return () => {
		instance.scope.off();
		internalSetCurrentInstance(prev);
	};
};
var unsetCurrentInstance = () => {
	currentInstance && currentInstance.scope.off();
	internalSetCurrentInstance(null);
};
function isStatefulComponent(instance) {
	return instance.vnode.shapeFlag & 4;
}
var isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false, optimized = false) {
	isSSR && setInSSRSetupState(isSSR);
	const { props, children } = instance.vnode;
	const isStateful = isStatefulComponent(instance);
	initProps(instance, props, isStateful, isSSR);
	initSlots(instance, children, optimized || isSSR);
	const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
	isSSR && setInSSRSetupState(false);
	return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
	const Component = instance.type;
	instance.accessCache = /* @__PURE__ */ Object.create(null);
	instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
	const { setup } = Component;
	if (setup) {
		pauseTracking();
		const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
		const reset = setCurrentInstance(instance);
		const setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
		const isAsyncSetup = isPromise(setupResult);
		resetTracking();
		reset();
		if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) markAsyncBoundary(instance);
		if (isAsyncSetup) {
			setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
			if (isSSR) return setupResult.then((resolvedResult) => {
				handleSetupResult(instance, resolvedResult, isSSR);
			}).catch((e) => {
				handleError(e, instance, 0);
			});
			else instance.asyncDep = setupResult;
		} else handleSetupResult(instance, setupResult, isSSR);
	} else finishComponentSetup(instance, isSSR);
}
function handleSetupResult(instance, setupResult, isSSR) {
	if (isFunction(setupResult)) if (instance.type.__ssrInlineRender) instance.ssrRender = setupResult;
	else instance.render = setupResult;
	else if (isObject(setupResult)) instance.setupState = proxyRefs(setupResult);
	finishComponentSetup(instance, isSSR);
}
var compile;
var installWithProxy;
function finishComponentSetup(instance, isSSR, skipOptions) {
	const Component = instance.type;
	if (!instance.render) {
		if (!isSSR && compile && !Component.render) {
			const template = Component.template || resolveMergedOptions(instance).template;
			if (template) {
				const { isCustomElement, compilerOptions } = instance.appContext.config;
				const { delimiters, compilerOptions: componentCompilerOptions } = Component;
				Component.render = compile(template, extend(extend({
					isCustomElement,
					delimiters
				}, compilerOptions), componentCompilerOptions));
			}
		}
		instance.render = Component.render || NOOP;
		if (installWithProxy) installWithProxy(instance);
	}
	{
		const reset = setCurrentInstance(instance);
		pauseTracking();
		try {
			applyOptions(instance);
		} finally {
			resetTracking();
			reset();
		}
	}
}
var attrsProxyHandlers = { get(target, key) {
	track(target, "get", "");
	return target[key];
} };
function createSetupContext(instance) {
	const expose = (exposed) => {
		instance.exposed = exposed || {};
	};
	return {
		attrs: new Proxy(instance.attrs, attrsProxyHandlers),
		slots: instance.slots,
		emit: instance.emit,
		expose
	};
}
function getComponentPublicInstance(instance) {
	if (instance.exposed) return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
		get(target, key) {
			if (key in target) return target[key];
			else if (key in publicPropertiesMap) return publicPropertiesMap[key](instance);
		},
		has(target, key) {
			return key in target || key in publicPropertiesMap;
		}
	}));
	else return instance.proxy;
}
function getComponentName(Component, includeInferred = true) {
	return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function isClassComponent(value) {
	return isFunction(value) && "__vccOpts" in value;
}
var computed = (getterOrOptions, debugOptions) => {
	return /* @__PURE__ */ computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
function h(type, propsOrChildren, children) {
	try {
		setBlockTracking(-1);
		const l = arguments.length;
		if (l === 2) if (isObject(propsOrChildren) && !isArray$1(propsOrChildren)) {
			if (isVNode(propsOrChildren)) return createVNode(type, null, [propsOrChildren]);
			return createVNode(type, propsOrChildren);
		} else return createVNode(type, null, propsOrChildren);
		else {
			if (l > 3) children = Array.prototype.slice.call(arguments, 2);
			else if (l === 3 && isVNode(children)) children = [children];
			return createVNode(type, propsOrChildren, children);
		}
	} finally {
		setBlockTracking(1);
	}
}
var version = "3.5.38";
//#endregion
//#region node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
/**
* @vue/runtime-dom v3.5.38
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
var policy = void 0;
var tt = typeof window !== "undefined" && window.trustedTypes;
if (tt) try {
	policy = /* @__PURE__ */ tt.createPolicy("vue", { createHTML: (val) => val });
} catch (e) {}
var unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
var svgNS = "http://www.w3.org/2000/svg";
var mathmlNS = "http://www.w3.org/1998/Math/MathML";
var doc = typeof document !== "undefined" ? document : null;
var templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
var nodeOps = {
	insert: (child, parent, anchor) => {
		parent.insertBefore(child, anchor || null);
	},
	remove: (child) => {
		const parent = child.parentNode;
		if (parent) parent.removeChild(child);
	},
	createElement: (tag, namespace, is, props) => {
		const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
		if (tag === "select" && props && props.multiple != null) el.setAttribute("multiple", props.multiple);
		return el;
	},
	createText: (text) => doc.createTextNode(text),
	createComment: (text) => doc.createComment(text),
	setText: (node, text) => {
		node.nodeValue = text;
	},
	setElementText: (el, text) => {
		el.textContent = text;
	},
	parentNode: (node) => node.parentNode,
	nextSibling: (node) => node.nextSibling,
	querySelector: (selector) => doc.querySelector(selector),
	setScopeId(el, id) {
		el.setAttribute(id, "");
	},
	insertStaticContent(content, parent, anchor, namespace, start, end) {
		const before = anchor ? anchor.previousSibling : parent.lastChild;
		if (start && (start === end || start.nextSibling)) while (true) {
			parent.insertBefore(start.cloneNode(true), anchor);
			if (start === end || !(start = start.nextSibling)) break;
		}
		else {
			templateContainer.innerHTML = unsafeToTrustedHTML(namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content);
			const template = templateContainer.content;
			if (namespace === "svg" || namespace === "mathml") {
				const wrapper = template.firstChild;
				while (wrapper.firstChild) template.appendChild(wrapper.firstChild);
				template.removeChild(wrapper);
			}
			parent.insertBefore(template, anchor);
		}
		return [before ? before.nextSibling : parent.firstChild, anchor ? anchor.previousSibling : parent.lastChild];
	}
};
var vtcKey = /* @__PURE__ */ Symbol("_vtc");
function patchClass(el, value, isSVG) {
	const transitionClasses = el[vtcKey];
	if (transitionClasses) value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
	if (value == null) el.removeAttribute("class");
	else if (isSVG) el.setAttribute("class", value);
	else el.className = value;
}
var vShowOriginalDisplay = /* @__PURE__ */ Symbol("_vod");
var vShowHidden = /* @__PURE__ */ Symbol("_vsh");
var vShow = {
	name: "show",
	beforeMount(el, { value }, { transition }) {
		el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
		if (transition && value) transition.beforeEnter(el);
		else setDisplay(el, value);
	},
	mounted(el, { value }, { transition }) {
		if (transition && value) transition.enter(el);
	},
	updated(el, { value, oldValue }, { transition }) {
		if (!value === !oldValue) return;
		if (transition) if (value) {
			transition.beforeEnter(el);
			setDisplay(el, true);
			transition.enter(el);
		} else transition.leave(el, () => {
			setDisplay(el, false);
		});
		else setDisplay(el, value);
	},
	beforeUnmount(el, { value }) {
		setDisplay(el, value);
	}
};
function setDisplay(el, value) {
	el.style.display = value ? el[vShowOriginalDisplay] : "none";
	el[vShowHidden] = !value;
}
var CSS_VAR_TEXT = /* @__PURE__ */ Symbol("");
function useCssVars(getter) {
	const instance = getCurrentInstance();
	if (!instance) return;
	const updateTeleports = instance.ut = (vars = getter(instance.proxy)) => {
		Array.from(document.querySelectorAll(`[data-v-owner="${instance.uid}"]`)).forEach((node) => setVarsOnNode(node, vars));
	};
	const setVars = () => {
		const vars = getter(instance.proxy);
		if (instance.ce) setVarsOnNode(instance.ce, vars);
		else setVarsOnVNode(instance.subTree, vars);
		updateTeleports(vars);
	};
	onBeforeUpdate(() => {
		queuePostFlushCb(setVars);
	});
	onMounted(() => {
		watch(setVars, NOOP, { flush: "post" });
		const ob = new MutationObserver(setVars);
		ob.observe(instance.subTree.el.parentNode, { childList: true });
		onUnmounted(() => ob.disconnect());
	});
}
function setVarsOnVNode(vnode, vars) {
	if (vnode.shapeFlag & 128) {
		const suspense = vnode.suspense;
		vnode = suspense.activeBranch;
		if (suspense.pendingBranch && !suspense.isHydrating) suspense.effects.push(() => {
			setVarsOnVNode(suspense.activeBranch, vars);
		});
	}
	while (vnode.component) vnode = vnode.component.subTree;
	if (vnode.shapeFlag & 1 && vnode.el) setVarsOnNode(vnode.el, vars);
	else if (vnode.type === Fragment) vnode.children.forEach((c) => setVarsOnVNode(c, vars));
	else if (vnode.type === Static) {
		let { el, anchor } = vnode;
		while (el) {
			setVarsOnNode(el, vars);
			if (el === anchor) break;
			el = el.nextSibling;
		}
	}
}
function setVarsOnNode(el, vars) {
	if (el.nodeType === 1) {
		const style = el.style;
		let cssText = "";
		for (const key in vars) {
			const value = normalizeCssVarValue(vars[key]);
			style.setProperty(`--${key}`, value);
			cssText += `--${key}: ${value};`;
		}
		style[CSS_VAR_TEXT] = cssText;
	}
}
var displayRE = /(?:^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
	const style = el.style;
	const isCssString = isString(next);
	let hasControlledDisplay = false;
	if (next && !isCssString) {
		if (prev) if (!isString(prev)) {
			for (const key in prev) if (next[key] == null) setStyle(style, key, "");
		} else for (const prevStyle of prev.split(";")) {
			const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
			if (next[key] == null) setStyle(style, key, "");
		}
		for (const key in next) {
			if (key === "display") hasControlledDisplay = true;
			const value = next[key];
			if (value != null) {
				if (!shouldPreserveTextareaResizeStyle(el, key, !isString(prev) && prev ? prev[key] : void 0, value)) setStyle(style, key, value);
			} else setStyle(style, key, "");
		}
	} else if (isCssString) {
		if (prev !== next) {
			const cssVarText = style[CSS_VAR_TEXT];
			if (cssVarText) next += ";" + cssVarText;
			style.cssText = next;
			hasControlledDisplay = displayRE.test(next);
		}
	} else if (prev) el.removeAttribute("style");
	if (vShowOriginalDisplay in el) {
		el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
		if (el[vShowHidden]) style.display = "none";
	}
}
var importantRE = /\s*!important$/;
function setStyle(style, name, val) {
	if (isArray$1(val)) val.forEach((v) => setStyle(style, name, v));
	else {
		if (val == null) val = "";
		if (name.startsWith("--")) style.setProperty(name, val);
		else {
			const prefixed = autoPrefix(style, name);
			if (importantRE.test(val)) style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
			else style[prefixed] = val;
		}
	}
}
var prefixes = [
	"Webkit",
	"Moz",
	"ms"
];
var prefixCache = {};
function autoPrefix(style, rawName) {
	const cached = prefixCache[rawName];
	if (cached) return cached;
	let name = camelize(rawName);
	if (name !== "filter" && name in style) return prefixCache[rawName] = name;
	name = capitalize(name);
	for (let i = 0; i < prefixes.length; i++) {
		const prefixed = prefixes[i] + name;
		if (prefixed in style) return prefixCache[rawName] = prefixed;
	}
	return rawName;
}
function shouldPreserveTextareaResizeStyle(el, key, prev, next) {
	return el.tagName === "TEXTAREA" && (key === "width" || key === "height") && isString(next) && prev === next;
}
var xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
	if (isSVG && key.startsWith("xlink:")) if (value == null) el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
	else el.setAttributeNS(xlinkNS, key, value);
	else if (value == null || isBoolean && !includeBooleanAttr(value)) el.removeAttribute(key);
	else el.setAttribute(key, isBoolean ? "" : isSymbol(value) ? String(value) : value);
}
function patchDOMProp(el, key, value, parentComponent, attrName) {
	if (key === "innerHTML" || key === "textContent") {
		if (value != null) el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
		return;
	}
	const tag = el.tagName;
	if (key === "value" && tag !== "PROGRESS" && !tag.includes("-")) {
		const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
		const newValue = value == null ? el.type === "checkbox" ? "on" : "" : String(value);
		if (oldValue !== newValue || !("_value" in el)) el.value = newValue;
		if (value == null) el.removeAttribute(key);
		el._value = value;
		return;
	}
	let needRemove = false;
	if (value === "" || value == null) {
		const type = typeof el[key];
		if (type === "boolean") value = includeBooleanAttr(value);
		else if (value == null && type === "string") {
			value = "";
			needRemove = true;
		} else if (type === "number") {
			value = 0;
			needRemove = true;
		}
	}
	try {
		el[key] = value;
	} catch (e) {}
	needRemove && el.removeAttribute(attrName || key);
}
function addEventListener(el, event, handler, options) {
	el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
	el.removeEventListener(event, handler, options);
}
var veiKey = /* @__PURE__ */ Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
	const invokers = el[veiKey] || (el[veiKey] = {});
	const existingInvoker = invokers[rawName];
	if (nextValue && existingInvoker) existingInvoker.value = nextValue;
	else {
		const [name, options] = parseName(rawName);
		if (nextValue) addEventListener(el, name, invokers[rawName] = createInvoker(nextValue, instance), options);
		else if (existingInvoker) {
			removeEventListener(el, name, existingInvoker, options);
			invokers[rawName] = void 0;
		}
	}
}
var optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
	let options;
	if (optionsModifierRE.test(name)) {
		options = {};
		let m;
		while (m = name.match(optionsModifierRE)) {
			name = name.slice(0, name.length - m[0].length);
			options[m[0].toLowerCase()] = true;
		}
	}
	return [name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2)), options];
}
var cachedNow = 0;
var p = /* @__PURE__ */ Promise.resolve();
var getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
	const invoker = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= invoker.attached) return;
		const value = invoker.value;
		if (isArray$1(value)) {
			const originalStop = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				originalStop.call(e);
				e._stopped = true;
			};
			const handlers = value.slice();
			const args = [e];
			for (let i = 0; i < handlers.length; i++) {
				if (e._stopped) break;
				const handler = handlers[i];
				if (handler) callWithAsyncErrorHandling(handler, instance, 5, args);
			}
		} else callWithAsyncErrorHandling(value, instance, 5, [e]);
	};
	invoker.value = initialValue;
	invoker.attached = getNow();
	return invoker;
}
var isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
var patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
	const isSVG = namespace === "svg";
	if (key === "class") patchClass(el, nextValue, isSVG);
	else if (key === "style") patchStyle(el, prevValue, nextValue);
	else if (isOn(key)) {
		if (!isModelListener(key)) patchEvent(el, key, prevValue, nextValue, parentComponent);
	} else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
		patchDOMProp(el, key, nextValue);
		if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
	} else if (el._isVueCE && (shouldSetAsPropForVueCE(el, key) || el._def.__asyncLoader && (/[A-Z]/.test(key) || !isString(nextValue)))) patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
	else {
		if (key === "true-value") el._trueValue = nextValue;
		else if (key === "false-value") el._falseValue = nextValue;
		patchAttr(el, key, nextValue, isSVG);
	}
};
function shouldSetAsProp(el, key, value, isSVG) {
	if (isSVG) {
		if (key === "innerHTML" || key === "textContent") return true;
		if (key in el && isNativeOn(key) && isFunction(value)) return true;
		return false;
	}
	if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") return false;
	if (key === "sandbox" && el.tagName === "IFRAME") return false;
	if (key === "form") return false;
	if (key === "list" && el.tagName === "INPUT") return false;
	if (key === "type" && el.tagName === "TEXTAREA") return false;
	if (key === "width" || key === "height") {
		const tag = el.tagName;
		if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") return false;
	}
	if (isNativeOn(key) && isString(value)) return false;
	return key in el;
}
function shouldSetAsPropForVueCE(el, key) {
	const props = el._def.props;
	if (!props) return false;
	const camelKey = camelize(key);
	return Array.isArray(props) ? props.some((prop) => camelize(prop) === camelKey) : Object.keys(props).some((prop) => camelize(prop) === camelKey);
}
var getModelAssigner = (vnode) => {
	const fn = vnode.props["onUpdate:modelValue"] || false;
	return isArray$1(fn) ? (value) => invokeArrayFns(fn, value) : fn;
};
function onCompositionStart(e) {
	e.target.composing = true;
}
function onCompositionEnd(e) {
	const target = e.target;
	if (target.composing) {
		target.composing = false;
		target.dispatchEvent(new Event("input"));
	}
}
var assignKey = /* @__PURE__ */ Symbol("_assign");
function castValue(value, trim, number) {
	if (trim) value = value.trim();
	if (number) value = looseToNumber(value);
	return value;
}
var vModelText = {
	created(el, { modifiers: { lazy, trim, number } }, vnode) {
		el[assignKey] = getModelAssigner(vnode);
		const castToNumber = number || vnode.props && vnode.props.type === "number";
		addEventListener(el, lazy ? "change" : "input", (e) => {
			if (e.target.composing) return;
			el[assignKey](castValue(el.value, trim, castToNumber));
		});
		if (trim || castToNumber) addEventListener(el, "change", () => {
			el.value = castValue(el.value, trim, castToNumber);
		});
		if (!lazy) {
			addEventListener(el, "compositionstart", onCompositionStart);
			addEventListener(el, "compositionend", onCompositionEnd);
			addEventListener(el, "change", onCompositionEnd);
		}
	},
	mounted(el, { value }) {
		el.value = value == null ? "" : value;
	},
	beforeUpdate(el, { value, oldValue, modifiers: { lazy, trim, number } }, vnode) {
		el[assignKey] = getModelAssigner(vnode);
		if (el.composing) return;
		const elValue = (number || el.type === "number") && !/^0\d/.test(el.value) ? looseToNumber(el.value) : el.value;
		const newValue = value == null ? "" : value;
		if (elValue === newValue) return;
		const rootNode = el.getRootNode();
		if ((rootNode instanceof Document || rootNode instanceof ShadowRoot) && rootNode.activeElement === el && el.type !== "range") {
			if (lazy && value === oldValue) return;
			if (trim && el.value.trim() === newValue) return;
		}
		el.value = newValue;
	}
};
var vModelSelect = {
	deep: true,
	created(el, { value, modifiers: { number } }, vnode) {
		const isSetModel = isSet(value);
		addEventListener(el, "change", () => {
			const selectedVal = Array.prototype.filter.call(el.options, (o) => o.selected).map((o) => number ? looseToNumber(getValue(o)) : getValue(o));
			el[assignKey](el.multiple ? isSetModel ? new Set(selectedVal) : selectedVal : selectedVal[0]);
			el._assigning = true;
			nextTick(() => {
				el._assigning = false;
			});
		});
		el[assignKey] = getModelAssigner(vnode);
	},
	mounted(el, { value }) {
		setSelected(el, value);
	},
	beforeUpdate(el, _binding, vnode) {
		el[assignKey] = getModelAssigner(vnode);
	},
	updated(el, { value }) {
		if (!el._assigning) setSelected(el, value);
	}
};
function setSelected(el, value) {
	const isMultiple = el.multiple;
	const isArrayValue = isArray$1(value);
	if (isMultiple && !isArrayValue && !isSet(value)) return;
	for (let i = 0, l = el.options.length; i < l; i++) {
		const option = el.options[i];
		const optionValue = getValue(option);
		if (isMultiple) if (isArrayValue) {
			const optionType = typeof optionValue;
			if (optionType === "string" || optionType === "number") option.selected = value.some((v) => String(v) === String(optionValue));
			else option.selected = looseIndexOf(value, optionValue) > -1;
		} else option.selected = value.has(optionValue);
		else if (looseEqual(getValue(option), value)) {
			if (el.selectedIndex !== i) el.selectedIndex = i;
			return;
		}
	}
	if (!isMultiple && el.selectedIndex !== -1) el.selectedIndex = -1;
}
function getValue(el) {
	return "_value" in el ? el._value : el.value;
}
var systemModifiers = [
	"ctrl",
	"shift",
	"alt",
	"meta"
];
var modifierGuards = {
	stop: (e) => e.stopPropagation(),
	prevent: (e) => e.preventDefault(),
	self: (e) => e.target !== e.currentTarget,
	ctrl: (e) => !e.ctrlKey,
	shift: (e) => !e.shiftKey,
	alt: (e) => !e.altKey,
	meta: (e) => !e.metaKey,
	left: (e) => "button" in e && e.button !== 0,
	middle: (e) => "button" in e && e.button !== 1,
	right: (e) => "button" in e && e.button !== 2,
	exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
};
var withModifiers = (fn, modifiers) => {
	if (!fn) return fn;
	const cache = fn._withMods || (fn._withMods = {});
	const cacheKey = modifiers.join(".");
	return cache[cacheKey] || (cache[cacheKey] = ((event, ...args) => {
		for (let i = 0; i < modifiers.length; i++) {
			const guard = modifierGuards[modifiers[i]];
			if (guard && guard(event, modifiers)) return;
		}
		return fn(event, ...args);
	}));
};
var rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
var renderer;
function ensureRenderer() {
	return renderer || (renderer = createRenderer(rendererOptions));
}
var createApp = ((...args) => {
	const app = ensureRenderer().createApp(...args);
	const { mount } = app;
	app.mount = (containerOrSelector) => {
		const container = normalizeContainer(containerOrSelector);
		if (!container) return;
		const component = app._component;
		if (!isFunction(component) && !component.render && !component.template) component.template = container.innerHTML;
		if (container.nodeType === 1) container.textContent = "";
		const proxy = mount(container, false, resolveRootNamespace(container));
		if (container instanceof Element) {
			container.removeAttribute("v-cloak");
			container.setAttribute("data-v-app", "");
		}
		return proxy;
	};
	return app;
});
function resolveRootNamespace(container) {
	if (container instanceof SVGElement) return "svg";
	if (typeof MathMLElement === "function" && container instanceof MathMLElement) return "mathml";
}
function normalizeContainer(container) {
	if (isString(container)) return document.querySelector(container);
	return container;
}
//#endregion
//#region \0plugin-vue:export-helper
var _plugin_vue_export_helper_default = (sfc, props) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props) target[key] = val;
	return target;
};
//#endregion
//#region src/components/Checkbox.vue
var _hoisted_1$38 = {
	key: 0,
	class: "checkbox__fill"
};
var Checkbox_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "Checkbox",
	props: { isActive: {
		type: Boolean,
		default: false
	} },
	emits: ["toggle"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const toggleCheckbox = () => {
			emit("toggle");
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(["checkbox", { "checkbox--active": __props.isActive }]),
				onClick: toggleCheckbox
			}, [__props.isActive ? (openBlock(), createElementBlock("div", _hoisted_1$38)) : createCommentVNode("", true)], 2);
		};
	}
}, [["__scopeId", "data-v-b58e0f62"]]);
//#endregion
//#region src/components/FormBig.vue
var _hoisted_1$37 = { class: "form-big__overlay" };
var _hoisted_2$35 = { class: "form-big__title" };
var _hoisted_3$33 = { class: "form-big__select-wrapper" };
var _hoisted_4$28 = ["value"];
var _hoisted_5$21 = { class: "form-big__input-wrapper" };
var _hoisted_6$21 = {
	key: 0,
	class: "form-big__error"
};
var _hoisted_7$17 = { class: "form-big__input-wrapper" };
var _hoisted_8$12 = {
	key: 0,
	class: "form-big__error"
};
var _hoisted_9$11 = { class: "form-big__input-wrapper" };
var _hoisted_10$8 = {
	key: 0,
	class: "form-big__error"
};
var _hoisted_11$6 = { class: "form-big__input-wrapper" };
var _hoisted_12$4 = {
	key: 0,
	class: "form-big__error"
};
var _hoisted_13$4 = { class: "form-big__agreement" };
var FormBig_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "FormBig",
	props: {
		title: {
			type: String,
			default: "СОЕДИНЯТЬ ЗАКАЗ"
		},
		backgroundImage: {
			type: String,
			required: true
		},
		options: {
			type: Array,
			default: () => [
				"Разработка сайта",
				"Продвижение",
				"Реклама",
				"Дизайн"
			]
		}
	},
	setup(__props) {
		const isAgreed = /* @__PURE__ */ ref(false);
		const selectedService = /* @__PURE__ */ ref("");
		const fio = /* @__PURE__ */ ref("");
		const email = /* @__PURE__ */ ref("");
		const phone = /* @__PURE__ */ ref("");
		const wishes = /* @__PURE__ */ ref("");
		const errors = /* @__PURE__ */ reactive({
			fio: "",
			email: "",
			phone: "",
			wishes: ""
		});
		const validateFio = () => {
			if (!fio.value.trim()) errors.fio = "Поле обязательно для заполнения";
			else if (fio.value.trim().length < 3) errors.fio = "ФИО должно содержать минимум 3 символа";
			else if (fio.value.trim().length > 100) errors.fio = "ФИО не должно превышать 100 символов";
			else errors.fio = "";
		};
		const validateEmail = () => {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!email.value.trim()) errors.email = "Поле обязательно для заполнения";
			else if (!emailRegex.test(email.value.trim())) errors.email = "Введите корректный email";
			else errors.email = "";
		};
		const validatePhone = () => {
			const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
			if (!phone.value.trim()) errors.phone = "Поле обязательно для заполнения";
			else if (!phoneRegex.test(phone.value.trim())) errors.phone = "Введите корректный номер телефона";
			else errors.phone = "";
		};
		const validateWishes = () => {
			if (wishes.value.trim().length > 500) errors.wishes = "Пожелания не должны превышать 500 символов";
			else errors.wishes = "";
		};
		const submitForm = () => {
			validateFio();
			validateEmail();
			validatePhone();
			validateWishes();
			if (!isAgreed.value) {
				alert("Необходимо согласиться на обработку персональных данных");
				return;
			}
			if (errors.fio || errors.email || errors.phone || errors.wishes) {
				alert("Заполните все поля корректно");
				return;
			}
			if (!selectedService.value) {
				alert("Выберите услугу");
				return;
			}
			console.log("Форма отправлена:", {
				service: selectedService.value,
				fio: fio.value,
				email: email.value,
				phone: phone.value,
				wishes: wishes.value
			});
			alert("Заявка отправлена!");
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: "form-big",
				style: normalizeStyle({ backgroundImage: `url(${__props.backgroundImage})` })
			}, [createBaseVNode("div", _hoisted_1$37, [
				createBaseVNode("h2", _hoisted_2$35, toDisplayString(__props.title), 1),
				createBaseVNode("div", _hoisted_3$33, [withDirectives(createBaseVNode("select", {
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedService.value = $event),
					class: "form-big__select"
				}, [_cache[6] || (_cache[6] = createBaseVNode("option", {
					value: "",
					disabled: "",
					selected: ""
				}, "Выберите услугу", -1)), (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (option) => {
					return openBlock(), createElementBlock("option", {
						key: option,
						value: option
					}, toDisplayString(option), 9, _hoisted_4$28);
				}), 128))], 512), [[vModelSelect, selectedService.value]]), _cache[7] || (_cache[7] = createBaseVNode("svg", {
					class: "form-big__select-arrow",
					width: "33",
					height: "19",
					viewBox: "0 0 33 19",
					fill: "none",
					xmlns: "http://www.w3.org/2000/svg"
				}, [createBaseVNode("path", {
					d: "M31 2L16.1081 16L2 2",
					stroke: "white",
					"stroke-width": "4",
					"stroke-linecap": "round"
				})], -1))]),
				createBaseVNode("div", _hoisted_5$21, [withDirectives(createBaseVNode("input", {
					type: "text",
					class: normalizeClass(["form-big__input", { "form-big__input--error": errors.fio }]),
					placeholder: "Введите ФИО",
					"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => fio.value = $event),
					onBlur: validateFio
				}, null, 34), [[vModelText, fio.value]]), errors.fio ? (openBlock(), createElementBlock("span", _hoisted_6$21, toDisplayString(errors.fio), 1)) : createCommentVNode("", true)]),
				createBaseVNode("div", _hoisted_7$17, [withDirectives(createBaseVNode("input", {
					type: "email",
					class: normalizeClass(["form-big__input", { "form-big__input--error": errors.email }]),
					placeholder: "Введите email",
					"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => email.value = $event),
					onBlur: validateEmail
				}, null, 34), [[vModelText, email.value]]), errors.email ? (openBlock(), createElementBlock("span", _hoisted_8$12, toDisplayString(errors.email), 1)) : createCommentVNode("", true)]),
				createBaseVNode("div", _hoisted_9$11, [withDirectives(createBaseVNode("input", {
					type: "tel",
					class: normalizeClass(["form-big__input", { "form-big__input--error": errors.phone }]),
					placeholder: "Введите номер телефона",
					"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => phone.value = $event),
					onBlur: validatePhone
				}, null, 34), [[vModelText, phone.value]]), errors.phone ? (openBlock(), createElementBlock("span", _hoisted_10$8, toDisplayString(errors.phone), 1)) : createCommentVNode("", true)]),
				createBaseVNode("div", _hoisted_11$6, [withDirectives(createBaseVNode("textarea", {
					class: normalizeClass(["form-big__textarea", { "form-big__input--error": errors.wishes }]),
					placeholder: "Ваши особые пожелания",
					"onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => wishes.value = $event),
					onBlur: validateWishes
				}, null, 34), [[vModelText, wishes.value]]), errors.wishes ? (openBlock(), createElementBlock("span", _hoisted_12$4, toDisplayString(errors.wishes), 1)) : createCommentVNode("", true)]),
				createBaseVNode("div", _hoisted_13$4, [createVNode(Checkbox_default, {
					"is-active": isAgreed.value,
					onToggle: _cache[5] || (_cache[5] = ($event) => isAgreed.value = !isAgreed.value)
				}, null, 8, ["is-active"]), _cache[8] || (_cache[8] = createBaseVNode("span", { class: "form-big__agreement-text" }, [
					createTextVNode(" Я соглашаюсь на обработку ваших персональных данных. С условиями "),
					createBaseVNode("a", {
						href: "/policy",
						class: "form-big__agreement-link"
					}, "Политики и Согласия"),
					createTextVNode(" ознакомлен. ")
				], -1))]),
				createBaseVNode("button", {
					class: "form-big__button",
					onClick: submitForm
				}, "ОТПРАВИТЬ")
			])], 4);
		};
	}
}, [["__scopeId", "data-v-8d66de3f"]]);
//#endregion
//#region src/components/FormMiddle.vue
var _hoisted_1$36 = { class: "form-big__overlay" };
var _hoisted_2$34 = { class: "form-big__title" };
var _hoisted_3$32 = { class: "form-big__input-wrapper" };
var _hoisted_4$27 = {
	key: 0,
	class: "form-big__error"
};
var _hoisted_5$20 = { class: "form-big__input-wrapper" };
var _hoisted_6$20 = {
	key: 0,
	class: "form-big__error"
};
var _hoisted_7$16 = { class: "form-big__input-wrapper" };
var _hoisted_8$11 = {
	key: 0,
	class: "form-big__error"
};
var _hoisted_9$10 = { class: "form-big__input-wrapper" };
var _hoisted_10$7 = {
	key: 0,
	class: "form-big__error"
};
var _hoisted_11$5 = { class: "form-big__agreement" };
var FormMiddle_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "FormMiddle",
	props: {
		title: {
			type: String,
			default: "СОЕДИНЯТЬ ЗАКАЗ"
		},
		backgroundImage: {
			type: String,
			required: true
		}
	},
	setup(__props) {
		const isAgreed = /* @__PURE__ */ ref(false);
		const fio = /* @__PURE__ */ ref("");
		const email = /* @__PURE__ */ ref("");
		const phone = /* @__PURE__ */ ref("");
		const wishes = /* @__PURE__ */ ref("");
		const errors = /* @__PURE__ */ reactive({
			fio: "",
			email: "",
			phone: "",
			wishes: ""
		});
		const validateFio = () => {
			if (!fio.value.trim()) errors.fio = "Поле обязательно для заполнения";
			else if (fio.value.trim().length < 3) errors.fio = "ФИО должно содержать минимум 3 символа";
			else if (fio.value.trim().length > 100) errors.fio = "ФИО не должно превышать 100 символов";
			else errors.fio = "";
		};
		const validateEmail = () => {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!email.value.trim()) errors.email = "Поле обязательно для заполнения";
			else if (!emailRegex.test(email.value.trim())) errors.email = "Введите корректный email";
			else errors.email = "";
		};
		const validatePhone = () => {
			const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
			if (!phone.value.trim()) errors.phone = "Поле обязательно для заполнения";
			else if (!phoneRegex.test(phone.value.trim())) errors.phone = "Введите корректный номер телефона";
			else errors.phone = "";
		};
		const validateWishes = () => {
			if (wishes.value.trim().length > 500) errors.wishes = "Пожелания не должны превышать 500 символов";
			else errors.wishes = "";
		};
		const submitForm = () => {
			validateFio();
			validateEmail();
			validatePhone();
			validateWishes();
			if (!isAgreed.value) {
				alert("Необходимо согласиться на обработку персональных данных");
				return;
			}
			if (errors.fio || errors.email || errors.phone || errors.wishes) {
				alert("Заполните все поля корректно");
				return;
			}
			console.log("Форма отправлена:", {
				fio: fio.value,
				email: email.value,
				phone: phone.value,
				wishes: wishes.value
			});
			alert("Заявка отправлена!");
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: "form-big",
				style: normalizeStyle({ backgroundImage: `url(${__props.backgroundImage})` })
			}, [createBaseVNode("div", _hoisted_1$36, [
				createBaseVNode("h2", _hoisted_2$34, toDisplayString(__props.title), 1),
				createBaseVNode("div", _hoisted_3$32, [withDirectives(createBaseVNode("input", {
					type: "text",
					class: normalizeClass(["form-big__input", { "form-big__input--error": errors.fio }]),
					placeholder: "Введите ФИО",
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => fio.value = $event),
					onBlur: validateFio
				}, null, 34), [[vModelText, fio.value]]), errors.fio ? (openBlock(), createElementBlock("span", _hoisted_4$27, toDisplayString(errors.fio), 1)) : createCommentVNode("", true)]),
				createBaseVNode("div", _hoisted_5$20, [withDirectives(createBaseVNode("input", {
					type: "email",
					class: normalizeClass(["form-big__input", { "form-big__input--error": errors.email }]),
					placeholder: "Введите email",
					"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => email.value = $event),
					onBlur: validateEmail
				}, null, 34), [[vModelText, email.value]]), errors.email ? (openBlock(), createElementBlock("span", _hoisted_6$20, toDisplayString(errors.email), 1)) : createCommentVNode("", true)]),
				createBaseVNode("div", _hoisted_7$16, [withDirectives(createBaseVNode("input", {
					type: "tel",
					class: normalizeClass(["form-big__input", { "form-big__input--error": errors.phone }]),
					placeholder: "Введите номер телефона",
					"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => phone.value = $event),
					onBlur: validatePhone
				}, null, 34), [[vModelText, phone.value]]), errors.phone ? (openBlock(), createElementBlock("span", _hoisted_8$11, toDisplayString(errors.phone), 1)) : createCommentVNode("", true)]),
				createBaseVNode("div", _hoisted_9$10, [withDirectives(createBaseVNode("textarea", {
					class: normalizeClass(["form-big__textarea", { "form-big__input--error": errors.wishes }]),
					placeholder: "Ваши особые пожелания",
					"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => wishes.value = $event),
					onBlur: validateWishes
				}, null, 34), [[vModelText, wishes.value]]), errors.wishes ? (openBlock(), createElementBlock("span", _hoisted_10$7, toDisplayString(errors.wishes), 1)) : createCommentVNode("", true)]),
				createBaseVNode("div", _hoisted_11$5, [createVNode(Checkbox_default, {
					"is-active": isAgreed.value,
					onToggle: _cache[4] || (_cache[4] = ($event) => isAgreed.value = !isAgreed.value)
				}, null, 8, ["is-active"]), _cache[5] || (_cache[5] = createBaseVNode("span", { class: "form-big__agreement-text" }, [
					createTextVNode(" Я соглашаюсь на обработку ваших персональных данных. С условиями "),
					createBaseVNode("a", {
						href: "/policy",
						class: "form-big__agreement-link"
					}, "Политики и Согласия"),
					createTextVNode(" ознакомлен. ")
				], -1))]),
				createBaseVNode("button", {
					class: "form-big__button",
					onClick: submitForm
				}, "ОТПРАВИТЬ")
			])], 4);
		};
	}
}, [["__scopeId", "data-v-0a0932ef"]]);
//#endregion
//#region src/components/FormSmall.vue
var _hoisted_1$35 = { class: "form-big__overlay" };
var _hoisted_2$33 = { class: "form-big__title" };
var _hoisted_3$31 = { class: "form-big__input-wrapper" };
var _hoisted_4$26 = {
	key: 0,
	class: "form-big__error"
};
var _hoisted_5$19 = { class: "form-big__input-wrapper" };
var _hoisted_6$19 = {
	key: 0,
	class: "form-big__error"
};
var _hoisted_7$15 = { class: "form-big__input-wrapper" };
var _hoisted_8$10 = {
	key: 0,
	class: "form-big__error"
};
var _hoisted_9$9 = { class: "form-big__agreement" };
var FormSmall_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "FormSmall",
	props: {
		title: {
			type: String,
			default: "СОЕДИНЯТЬ ЗАКАЗ"
		},
		backgroundImage: {
			type: String,
			required: true
		}
	},
	setup(__props) {
		const isAgreed = /* @__PURE__ */ ref(false);
		const fio = /* @__PURE__ */ ref("");
		const email = /* @__PURE__ */ ref("");
		const phone = /* @__PURE__ */ ref("");
		const errors = /* @__PURE__ */ reactive({
			fio: "",
			email: "",
			phone: "",
			wishes: ""
		});
		const validateFio = () => {
			if (!fio.value.trim()) errors.fio = "Поле обязательно для заполнения";
			else if (fio.value.trim().length < 3) errors.fio = "ФИО должно содержать минимум 3 символа";
			else if (fio.value.trim().length > 100) errors.fio = "ФИО не должно превышать 100 символов";
			else errors.fio = "";
		};
		const validateEmail = () => {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!email.value.trim()) errors.email = "Поле обязательно для заполнения";
			else if (!emailRegex.test(email.value.trim())) errors.email = "Введите корректный email";
			else errors.email = "";
		};
		const validatePhone = () => {
			const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
			if (!phone.value.trim()) errors.phone = "Поле обязательно для заполнения";
			else if (!phoneRegex.test(phone.value.trim())) errors.phone = "Введите корректный номер телефона";
			else errors.phone = "";
		};
		const submitForm = () => {
			validateFio();
			validateEmail();
			validatePhone();
			if (!isAgreed.value) {
				alert("Необходимо согласиться на обработку персональных данных");
				return;
			}
			if (errors.fio || errors.email || errors.phone || errors.wishes) {
				alert("Заполните все поля корректно");
				return;
			}
			console.log("Форма отправлена:", {
				fio: fio.value,
				email: email.value,
				phone: phone.value
			});
			alert("Заявка отправлена!");
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: "form-big",
				style: normalizeStyle({ backgroundImage: `url(${__props.backgroundImage})` })
			}, [createBaseVNode("div", _hoisted_1$35, [
				createBaseVNode("h2", _hoisted_2$33, toDisplayString(__props.title), 1),
				createBaseVNode("div", _hoisted_3$31, [withDirectives(createBaseVNode("input", {
					type: "text",
					class: normalizeClass(["form-big__input", { "form-big__input--error": errors.fio }]),
					placeholder: "Введите ФИО",
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => fio.value = $event),
					onBlur: validateFio
				}, null, 34), [[vModelText, fio.value]]), errors.fio ? (openBlock(), createElementBlock("span", _hoisted_4$26, toDisplayString(errors.fio), 1)) : createCommentVNode("", true)]),
				createBaseVNode("div", _hoisted_5$19, [withDirectives(createBaseVNode("input", {
					type: "email",
					class: normalizeClass(["form-big__input", { "form-big__input--error": errors.email }]),
					placeholder: "Введите email",
					"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => email.value = $event),
					onBlur: validateEmail
				}, null, 34), [[vModelText, email.value]]), errors.email ? (openBlock(), createElementBlock("span", _hoisted_6$19, toDisplayString(errors.email), 1)) : createCommentVNode("", true)]),
				createBaseVNode("div", _hoisted_7$15, [withDirectives(createBaseVNode("input", {
					type: "tel",
					class: normalizeClass(["form-big__input", { "form-big__input--error": errors.phone }]),
					placeholder: "Введите номер телефона",
					"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => phone.value = $event),
					onBlur: validatePhone
				}, null, 34), [[vModelText, phone.value]]), errors.phone ? (openBlock(), createElementBlock("span", _hoisted_8$10, toDisplayString(errors.phone), 1)) : createCommentVNode("", true)]),
				createBaseVNode("div", _hoisted_9$9, [createVNode(Checkbox_default, {
					"is-active": isAgreed.value,
					onToggle: _cache[3] || (_cache[3] = ($event) => isAgreed.value = !isAgreed.value)
				}, null, 8, ["is-active"]), _cache[4] || (_cache[4] = createBaseVNode("span", { class: "form-big__agreement-text" }, [
					createTextVNode(" Я соглашаюсь на обработку ваших персональных данных. С условиями "),
					createBaseVNode("a", {
						href: "/policy",
						class: "form-big__agreement-link"
					}, "Политики и Согласия"),
					createTextVNode(" ознакомлен. ")
				], -1))]),
				createBaseVNode("button", {
					class: "form-big__button",
					onClick: submitForm
				}, "ОТПРАВИТЬ")
			])], 4);
		};
	}
}, [["__scopeId", "data-v-b9ebcb1f"]]);
//#endregion
//#region src/components/Header.vue
var _hoisted_1$34 = { class: "header" };
var _hoisted_2$32 = { class: "header__container" };
var _hoisted_3$30 = { class: "header__inner" };
var _hoisted_4$25 = {
	key: 0,
	class: "dropdown-menu"
};
var _hoisted_5$18 = {
	key: 1,
	class: "dropdown-menu dropdown-menu--contact"
};
var _hoisted_6$18 = { class: "dropdown-menu__inner" };
var _hoisted_7$14 = { class: "dropdown-menu__list" };
var Header_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "Header",
	setup(__props) {
		const isDropdownOpen = /* @__PURE__ */ ref(false);
		const toggleMenu = () => {
			isDropdownOpen.value = !isDropdownOpen.value;
			isContactMenuOpen.value = false;
		};
		const closeMenu = () => {
			isDropdownOpen.value = false;
		};
		const isContactMenuOpen = /* @__PURE__ */ ref(false);
		const toggleContactMenu = () => {
			isContactMenuOpen.value = !isContactMenuOpen.value;
			isDropdownOpen.value = false;
		};
		const isFormOpen = /* @__PURE__ */ ref(false);
		const activeForm = /* @__PURE__ */ ref("");
		const openForm = (type) => {
			isContactMenuOpen.value = false;
			activeForm.value = type;
			isFormOpen.value = true;
		};
		const closeForm = () => {
			isFormOpen.value = false;
			activeForm.value = "";
		};
		return (_ctx, _cache) => {
			const _component_router_link = resolveComponent("router-link");
			return openBlock(), createElementBlock("header", _hoisted_1$34, [
				createBaseVNode("div", _hoisted_2$32, [createBaseVNode("div", _hoisted_3$30, [
					createVNode(_component_router_link, {
						to: "/",
						class: "header__logo"
					}, {
						default: withCtx(() => [..._cache[4] || (_cache[4] = [createBaseVNode("img", {
							src: "/my-vue-app/image/logo.png",
							alt: "Логотип",
							class: "logo__img"
						}, null, -1), createBaseVNode("div", { class: "logo__text" }, [createBaseVNode("div", { class: "logo__subtitle" }, "АГЕНТСТВО ИНТЕРНЕТ-МАРКЕТИНГА"), createBaseVNode("div", { class: "logo__title" }, "ВЕБРАЗРАБОТКА")], -1)])]),
						_: 1
					}),
					createBaseVNode("nav", { class: "header__nav" }, [_cache[6] || (_cache[6] = createBaseVNode("a", {
						href: "/",
						class: "nav__icon"
					}, [createBaseVNode("svg", {
						width: "48",
						height: "48",
						viewBox: "0 0 48 48",
						fill: "none"
					}, [createBaseVNode("path", {
						d: "M16 34.0004H32M22.0354 5.52848L8.47078 16.0787C7.56404 16.784 7.11068 17.1366 6.78406 17.5782C6.49474 17.9694 6.2792 18.4101 6.14806 18.8786C6 19.4075 6 19.9819 6 21.1306V35.6004C6 37.8406 6 38.9608 6.43598 39.8164C6.81946 40.569 7.43138 41.181 8.18404 41.5644C9.03968 42.0004 10.1598 42.0004 12.4 42.0004H35.6C37.8402 42.0004 38.9604 42.0004 39.816 41.5644C40.5686 41.181 41.1806 40.569 41.564 39.8164C42 38.9608 42 37.8406 42 35.6004V21.1306C42 19.9819 42 19.4075 41.852 18.8786C41.7208 18.4101 41.5052 17.9694 41.216 17.5782C40.8894 17.1366 40.436 16.784 39.5292 16.0787L25.9646 5.52848C25.262 4.98198 24.9106 4.70872 24.5226 4.60368C24.1804 4.511 23.8196 4.511 23.4774 4.60368C23.0894 4.70872 22.738 4.98198 22.0354 5.52848Z",
						stroke: "white",
						"stroke-width": "4",
						"stroke-linecap": "round",
						"stroke-linejoin": "round"
					})])], -1)), createBaseVNode("div", {
						class: "nav__menu-icon",
						onClick: toggleMenu
					}, [..._cache[5] || (_cache[5] = [createBaseVNode("svg", {
						width: "77",
						height: "68",
						viewBox: "0 0 77 68",
						fill: "none"
					}, [createBaseVNode("path", {
						d: "M36.5 44H52.5M24.5 34H52.5M36.5 24H52.5",
						stroke: "white",
						"stroke-width": "4",
						"stroke-linecap": "round",
						"stroke-linejoin": "round"
					})], -1)])])]),
					createBaseVNode("div", { class: "header__links" }, [_cache[7] || (_cache[7] = createBaseVNode("a", { href: "/calcul" }, "Калькулятор", -1)), createBaseVNode("a", { onClick: toggleContactMenu }, "Связаться")])
				])]),
				isDropdownOpen.value ? (openBlock(), createElementBlock("div", _hoisted_4$25, [createBaseVNode("div", { class: "dropdown-menu__inner" }, [createBaseVNode("ul", { class: "dropdown-menu__list" }, [
					createBaseVNode("li", null, [createBaseVNode("a", {
						href: "/about",
						onClick: closeMenu
					}, "О компании")]),
					createBaseVNode("li", null, [createBaseVNode("a", {
						href: "/cases",
						onClick: closeMenu
					}, "Кейсы")]),
					createBaseVNode("li", null, [createBaseVNode("a", {
						href: "/calcul",
						onClick: closeMenu
					}, "Калькулятор")]),
					createBaseVNode("li", null, [createBaseVNode("a", {
						href: "/contact",
						onClick: closeMenu
					}, "Контакты")])
				])])])) : createCommentVNode("", true),
				isContactMenuOpen.value ? (openBlock(), createElementBlock("div", _hoisted_5$18, [createBaseVNode("div", _hoisted_6$18, [createBaseVNode("ul", _hoisted_7$14, [
					createBaseVNode("li", null, [createBaseVNode("a", { onClick: _cache[0] || (_cache[0] = ($event) => openForm("order")) }, "Сделать заказ")]),
					createBaseVNode("li", null, [createBaseVNode("a", { onClick: _cache[1] || (_cache[1] = ($event) => openForm("offer")) }, "Узнать предложения для малого и крупного бизнеса")]),
					createBaseVNode("li", null, [createBaseVNode("a", { onClick: _cache[2] || (_cache[2] = ($event) => openForm("contact")) }, "Перезвоните мне")])
				])])])) : createCommentVNode("", true),
				isFormOpen.value ? (openBlock(), createElementBlock("div", {
					key: 2,
					class: "form-modal",
					onClick: closeForm
				}, [createBaseVNode("div", {
					class: "form-modal__content",
					onClick: _cache[3] || (_cache[3] = withModifiers(() => {}, ["stop"]))
				}, [createBaseVNode("button", {
					class: "form-modal__close",
					onClick: closeForm
				}, "✕"), activeForm.value === "order" ? (openBlock(), createBlock(FormBig_default, {
					key: 0,
					title: "СДЕЛАТЬ ЗАКАЗ",
					"background-image": "/image/form.jpg",
					options: [
						"Разработка сайта",
						"Продвижение",
						"Реклама",
						"Дизайн"
					]
				})) : activeForm.value === "offer" ? (openBlock(), createBlock(FormMiddle_default, {
					key: 1,
					title: "УЗНАТЬ ПРЕДЛОЖЕНИЯ",
					"background-image": "/image/form.jpg"
				})) : activeForm.value === "contact" ? (openBlock(), createBlock(FormSmall_default, {
					key: 2,
					title: "ПЕРЕЗВОНИТЕ МНЕ",
					"background-image": "/image/form.jpg"
				})) : createCommentVNode("", true)])])) : createCommentVNode("", true)
			]);
		};
	}
}, [["__scopeId", "data-v-36ab1a6b"]]);
//#endregion
//#region src/components/Footer.vue
var _hoisted_1$33 = { class: "footer" };
var _hoisted_2$31 = { class: "footer__container" };
var _hoisted_3$29 = { class: "footer__inner" };
var Footer_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "Footer",
	setup(__props) {
		return (_ctx, _cache) => {
			const _component_router_link = resolveComponent("router-link");
			return openBlock(), createElementBlock("footer", _hoisted_1$33, [createBaseVNode("div", _hoisted_2$31, [createBaseVNode("div", _hoisted_3$29, [createVNode(_component_router_link, {
				to: "/",
				class: "footer__logo"
			}, {
				default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("img", {
					src: "/my-vue-app/image/logo.png",
					alt: "Логотип",
					class: "logo__img"
				}, null, -1), createBaseVNode("div", { class: "logo__text" }, [createBaseVNode("div", { class: "logo__subtitle" }, "АГЕНТСТВО ИНТЕРНЕТ-МАРКЕТИНГА"), createBaseVNode("div", { class: "logo__title" }, "ВЕБРАЗРАБОТКА")], -1)])]),
				_: 1
			}), _cache[1] || (_cache[1] = createStaticVNode("<div class=\"footer__contacts\" data-v-5d18141a><div class=\"footer__contacts-title\" data-v-5d18141a>Контакты</div><ul class=\"footer__contacts-list\" data-v-5d18141a><li data-v-5d18141a><a href=\"tel:+79056611860\" data-v-5d18141a>Заказать сайт: +7 (905) 661 18-60</a></li><li data-v-5d18141a><a href=\"tel:+78314228559\" data-v-5d18141a>Техподдержка: +7 (831) 422 85-59</a></li><li data-v-5d18141a><a href=\"tel:+78314228599\" data-v-5d18141a>Отдел Дизайна: +7 (831) 422 85-99</a></li><li data-v-5d18141a><a href=\"tel:+78314228509\" data-v-5d18141a>Контент/каталоги: +7 (831) 422 85-09</a></li><li data-v-5d18141a>г. Нижний новгород, ул. Родионова, д. 193 к. 6</li></ul></div><div class=\"footer__nav\" data-v-5d18141a><ul class=\"footer__nav-list\" data-v-5d18141a><li data-v-5d18141a><a href=\"/\" data-v-5d18141a>Главная</a></li><li data-v-5d18141a><a href=\"/about\" data-v-5d18141a>О компании</a></li><li data-v-5d18141a><a href=\"/contact\" data-v-5d18141a>Контакты</a></li><li data-v-5d18141a><a href=\"/calcul\" data-v-5d18141a>Калькулятор</a></li><li data-v-5d18141a><a href=\"/cases\" data-v-5d18141a>Кейсы</a></li></ul></div>", 2))])])]);
		};
	}
}, [["__scopeId", "data-v-5d18141a"]]);
//#endregion
//#region src/App.vue
var _hoisted_1$32 = { id: "app" };
var _hoisted_2$30 = {
	key: 0,
	class: "background-images"
};
var _hoisted_3$28 = {
	key: 1,
	class: "background-images"
};
var _hoisted_4$24 = {
	key: 2,
	class: "background-images"
};
var _hoisted_5$17 = {
	key: 3,
	class: "background-images"
};
var _hoisted_6$17 = {
	key: 4,
	class: "background-images"
};
var _hoisted_7$13 = {
	key: 5,
	class: "background-images"
};
var _hoisted_8$9 = {
	key: 6,
	class: "background-images"
};
var _hoisted_9$8 = {
	key: 7,
	class: "background-images"
};
var _hoisted_10$6 = {
	key: 8,
	class: "background-images"
};
var _hoisted_11$4 = {
	key: 9,
	class: "background-images"
};
var _hoisted_12$3 = {
	key: 10,
	class: "background-images"
};
var _hoisted_13$3 = {
	key: 11,
	class: "background-images"
};
var _hoisted_14$2 = { class: "content" };
var _hoisted_15$2 = { class: "main-content" };
var _sfc_main$33 = {
	__name: "App",
	setup(__props) {
		return (_ctx, _cache) => {
			const _component_router_view = resolveComponent("router-view");
			return openBlock(), createElementBlock("div", _hoisted_1$32, [
				_ctx.$route.name === "home" ? (openBlock(), createElementBlock("div", _hoisted_2$30, [..._cache[0] || (_cache[0] = [createBaseVNode("img", {
					src: "/my-vue-app/image/main.jpg",
					class: "back",
					alt: "main1"
				}, null, -1), createBaseVNode("img", {
					src: "/my-vue-app/image/main2.jpg",
					class: "back",
					alt: "main2"
				}, null, -1)])])) : _ctx.$route.name === "about" ? (openBlock(), createElementBlock("div", _hoisted_3$28, [..._cache[1] || (_cache[1] = [createBaseVNode("img", {
					src: "/my-vue-app/image/main2.jpg",
					class: "back",
					alt: "main"
				}, null, -1)])])) : _ctx.$route.name === "cases" ? (openBlock(), createElementBlock("div", _hoisted_4$24, [..._cache[2] || (_cache[2] = [createBaseVNode("img", {
					src: "/my-vue-app/image/main3.jpg",
					class: "back",
					alt: "main1"
				}, null, -1), createBaseVNode("img", {
					src: "/my-vue-app/image/main4.jpg",
					class: "back",
					alt: "main2"
				}, null, -1)])])) : _ctx.$route.name === "marketing" ? (openBlock(), createElementBlock("div", _hoisted_5$17, [..._cache[3] || (_cache[3] = [createBaseVNode("img", {
					src: "/my-vue-app/image/main3.jpg",
					class: "back",
					alt: "main"
				}, null, -1)])])) : _ctx.$route.name === "promo" ? (openBlock(), createElementBlock("div", _hoisted_6$17, [..._cache[4] || (_cache[4] = [createBaseVNode("img", {
					src: "/my-vue-app/image/main2.jpg",
					class: "back",
					alt: "main"
				}, null, -1)])])) : _ctx.$route.name === "shop" ? (openBlock(), createElementBlock("div", _hoisted_7$13, [..._cache[5] || (_cache[5] = [createBaseVNode("img", {
					src: "/my-vue-app/image/main3.jpg",
					class: "back",
					alt: "main"
				}, null, -1), createBaseVNode("img", {
					src: "/my-vue-app/image/main4.jpg",
					class: "back",
					alt: "main2"
				}, null, -1)])])) : createCommentVNode("", true),
				_ctx.$route.name === "develop" ? (openBlock(), createElementBlock("div", _hoisted_8$9, [..._cache[6] || (_cache[6] = [createBaseVNode("img", {
					src: "/my-vue-app/image/main.jpg",
					class: "back",
					alt: "main1"
				}, null, -1), createBaseVNode("img", {
					src: "/my-vue-app/image/main2.jpg",
					class: "back",
					alt: "main2"
				}, null, -1)])])) : _ctx.$route.name === "contact" ? (openBlock(), createElementBlock("div", _hoisted_9$8, [..._cache[7] || (_cache[7] = [createBaseVNode("img", {
					src: "/my-vue-app/image/main.jpg",
					class: "back",
					alt: "main"
				}, null, -1), createBaseVNode("img", {
					src: "/my-vue-app/image/main2.jpg",
					class: "back",
					alt: "main2"
				}, null, -1)])])) : createCommentVNode("", true),
				_ctx.$route.name === "calcul" ? (openBlock(), createElementBlock("div", _hoisted_10$6, [..._cache[8] || (_cache[8] = [createBaseVNode("img", {
					src: "/my-vue-app/image/main.jpg",
					class: "back",
					alt: "main1"
				}, null, -1), createBaseVNode("img", {
					src: "/my-vue-app/image/main2.jpg",
					class: "back",
					alt: "main2"
				}, null, -1)])])) : createCommentVNode("", true),
				_ctx.$route.name === "theory" ? (openBlock(), createElementBlock("div", _hoisted_11$4, [..._cache[9] || (_cache[9] = [createBaseVNode("img", {
					src: "/my-vue-app/image/main2.jpg",
					class: "back",
					alt: "main2"
				}, null, -1)])])) : createCommentVNode("", true),
				_ctx.$route.name === "theory2" ? (openBlock(), createElementBlock("div", _hoisted_12$3, [..._cache[10] || (_cache[10] = [createBaseVNode("img", {
					src: "/my-vue-app/image/main3.jpg",
					class: "back",
					alt: "main"
				}, null, -1)])])) : createCommentVNode("", true),
				_ctx.$route.name === "policy" ? (openBlock(), createElementBlock("div", _hoisted_13$3, [..._cache[11] || (_cache[11] = [createBaseVNode("img", {
					src: "/my-vue-app/image/main3.jpg",
					class: "back",
					alt: "main"
				}, null, -1)])])) : createCommentVNode("", true),
				createBaseVNode("div", _hoisted_14$2, [
					createVNode(Header_default),
					createBaseVNode("main", _hoisted_15$2, [createVNode(_component_router_view)]),
					createVNode(Footer_default)
				])
			]);
		};
	}
};
//#endregion
//#region node_modules/vue-router/dist/useApi-s_02lHjl.js
/*!
* vue-router v5.1.0
* (c) 2026 Eduardo San Martin Morote
* @license MIT
*/
var isBrowser = typeof document !== "undefined";
/**
* Allows differentiating lazy components from functional components and vue-class-component
* @internal
*
* @param component
*/
function isRouteComponent(component) {
	return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function isESModule(obj) {
	return obj.__esModule || obj[Symbol.toStringTag] === "Module" || obj.default && isRouteComponent(obj.default);
}
var assign = Object.assign;
function applyToParams(fn, params) {
	const newParams = {};
	for (const key in params) {
		const value = params[key];
		newParams[key] = isArray(value) ? value.map(fn) : fn(value);
	}
	return newParams;
}
var noop = () => {};
/**
* Typesafe alternative to Array.isArray
* https://github.com/microsoft/TypeScript/pull/48228
*
* @internal
*/
var isArray = Array.isArray;
function mergeOptions(defaults, partialOptions) {
	const options = {};
	for (const key in defaults) options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
	return options;
}
var NavigationFailureSymbol = Symbol("");
/**
* Creates a typed NavigationFailure object.
* @internal
* @param type - NavigationFailureType
* @param params - { from, to }
*/
function createRouterError(type, params) {
	return assign(/* @__PURE__ */ new Error(), {
		type,
		[NavigationFailureSymbol]: true
	}, params);
}
function isNavigationFailure(error, type) {
	return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
/**
* RouteRecord being rendered by the closest ancestor Router View. Used for
* `onBeforeRouteUpdate` and `onBeforeRouteLeave`. rvlm stands for Router View
* Location Matched
*
* @internal
*/
var matchedRouteKey = Symbol("");
/**
* Allows overriding the router view depth to control which component in
* `matched` is rendered. rvd stands for Router View Depth
*
* @internal
*/
var viewDepthKey = Symbol("");
/**
* Allows overriding the router instance returned by `useRouter` in tests. r
* stands for router
*
* @internal
*/
var routerKey = Symbol("");
/**
* Allows overriding the current route returned by `useRoute` in tests. rl
* stands for route location
*
* @internal
*/
var routeLocationKey = Symbol("");
/**
* Allows overriding the current route used by router-view. Internally this is
* used when the `route` prop is passed.
*
* @internal
*/
var routerViewLocationKey = Symbol("");
//#endregion
//#region node_modules/vue-router/dist/devtools-DCoWQoU_.js
/*!
* vue-router v5.1.0
* (c) 2026 Eduardo San Martin Morote
* @license MIT
*/
/**
* Encoding Rules (␣ = Space)
* - Path: ␣ " < > # ? { }
* - Query: ␣ " < > # & =
* - Hash: ␣ " < > `
*
* On top of that, the RFC3986 (https://tools.ietf.org/html/rfc3986#section-2.2)
* defines some extra characters to be encoded. Most browsers do not encode them
* in encodeURI https://github.com/whatwg/url/issues/369, so it may be safer to
* also encode `!'()*`. Leaving un-encoded only ASCII alphanumeric(`a-zA-Z0-9`)
* plus `-._~`. This extra safety should be applied to query by patching the
* string returned by encodeURIComponent encodeURI also encodes `[\]^`. `\`
* should be encoded to avoid ambiguity. Browsers (IE, FF, C) transform a `\`
* into a `/` if directly typed in. The _backtick_ (`````) should also be
* encoded everywhere because some browsers like FF encode it when directly
* written while others don't. Safari and IE don't encode ``"<>{}``` in hash.
*/
var HASH_RE = /#/g;
var AMPERSAND_RE = /&/g;
var SLASH_RE = /\//g;
var EQUAL_RE = /=/g;
var IM_RE = /\?/g;
var PLUS_RE = /\+/g;
/**
* NOTE: It's not clear to me if we should encode the + symbol in queries, it
* seems to be less flexible than not doing so and I can't find out the legacy
* systems requiring this for regular requests like text/html. In the standard,
* the encoding of the plus character is only mentioned for
* application/x-www-form-urlencoded
* (https://url.spec.whatwg.org/#urlencoded-parsing) and most browsers seems lo
* leave the plus character as is in queries. To be more flexible, we allow the
* plus character on the query, but it can also be manually encoded by the user.
*
* Resources:
* - https://url.spec.whatwg.org/#urlencoded-parsing
* - https://stackoverflow.com/questions/1634271/url-encoding-the-space-character-or-20
*/
var ENC_BRACKET_OPEN_RE = /%5B/g;
var ENC_BRACKET_CLOSE_RE = /%5D/g;
var ENC_CARET_RE = /%5E/g;
var ENC_BACKTICK_RE = /%60/g;
var ENC_CURLY_OPEN_RE = /%7B/g;
var ENC_PIPE_RE = /%7C/g;
var ENC_CURLY_CLOSE_RE = /%7D/g;
var ENC_SPACE_RE = /%20/g;
/**
* Encode characters that need to be encoded on the path, search and hash
* sections of the URL.
*
* @internal
* @param text - string to encode
* @returns encoded string
*/
function commonEncode(text) {
	return text == null ? "" : encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
/**
* Encode characters that need to be encoded on the hash section of the URL.
*
* @param text - string to encode
* @returns encoded string
*/
function encodeHash(text) {
	return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
/**
* Encode characters that need to be encoded query values on the query
* section of the URL.
*
* @param text - string to encode
* @returns encoded string
*/
function encodeQueryValue(text) {
	return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
/**
* Like `encodeQueryValue` but also encodes the `=` character.
*
* @param text - string to encode
*/
function encodeQueryKey(text) {
	return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
/**
* Encode characters that need to be encoded on the path section of the URL.
*
* @param text - string to encode
* @returns encoded string
*/
function encodePath(text) {
	return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
/**
* Encode characters that need to be encoded on the path section of the URL as a
* param. This function encodes everything {@link encodePath} does plus the
* slash (`/`) character. If `text` is `null` or `undefined`, returns an empty
* string instead.
*
* @param text - string to encode
* @returns encoded string
*/
function encodeParam(text) {
	return encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
	if (text == null) return null;
	try {
		return decodeURIComponent("" + text);
	} catch {}
	return "" + text;
}
var TRAILING_SLASH_RE = /\/$/;
var removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
/**
* Transforms a URI into a normalized history location
*
* @param parseQuery
* @param location - URI to normalize
* @param currentLocation - current absolute location. Allows resolving relative
* paths. Must start with `/`. Defaults to `/`
* @returns a normalized history location
*/
function parseURL(parseQuery, location, currentLocation = "/") {
	let path, query = {}, searchString = "", hash = "";
	const hashPos = location.indexOf("#");
	let searchPos = location.indexOf("?");
	searchPos = hashPos >= 0 && searchPos > hashPos ? -1 : searchPos;
	if (searchPos >= 0) {
		path = location.slice(0, searchPos);
		searchString = location.slice(searchPos, hashPos > 0 ? hashPos : location.length);
		query = parseQuery(searchString.slice(1));
	}
	if (hashPos >= 0) {
		path = path || location.slice(0, hashPos);
		hash = location.slice(hashPos, location.length);
	}
	path = resolveRelativePath(path != null ? path : location, currentLocation);
	return {
		fullPath: path + searchString + hash,
		path,
		query,
		hash: decode(hash)
	};
}
/**
* Stringifies a URL object
*
* @param stringifyQuery
* @param location
*/
function stringifyURL(stringifyQuery, location) {
	const query = location.query ? stringifyQuery(location.query) : "";
	return location.path + (query && "?") + query + (location.hash || "");
}
/**
* Strips off the base from the beginning of a location.pathname in a non-case-sensitive way.
*
* @param pathname - location.pathname
* @param base - base to strip off
*/
function stripBase(pathname, base) {
	if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase())) return pathname;
	return pathname.slice(base.length) || "/";
}
/**
* Checks if two RouteLocation are equal. This means that both locations are
* pointing towards the same {@link RouteRecord} and that all `params`, `query`
* parameters and `hash` are the same
*
* @param stringifyQuery - A function that takes a query object of type LocationQueryRaw and returns a string representation of it.
* @param a - first {@link RouteLocation}
* @param b - second {@link RouteLocation}
*/
function isSameRouteLocation(stringifyQuery, a, b) {
	const aLastIndex = a.matched.length - 1;
	const bLastIndex = b.matched.length - 1;
	return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery(a.query) === stringifyQuery(b.query) && a.hash === b.hash;
}
/**
* Check if two `RouteRecords` are equal. Takes into account aliases: they are
* considered equal to the `RouteRecord` they are aliasing.
*
* @param a - first {@link RouteRecord}
* @param b - second {@link RouteRecord}
*/
function isSameRouteRecord(a, b) {
	return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
	if (Object.keys(a).length !== Object.keys(b).length) return false;
	for (var key in a) if (!isSameRouteLocationParamsValue(a[key], b[key])) return false;
	return true;
}
function isSameRouteLocationParamsValue(a, b) {
	return isArray(a) ? isEquivalentArray(a, b) : isArray(b) ? isEquivalentArray(b, a) : (a && a.valueOf()) === (b && b.valueOf());
}
/**
* Check if two arrays are the same or if an array with one single entry is the
* same as another primitive value. Used to check query and parameters
*
* @param a - array of values
* @param b - array of values or a single value
*/
function isEquivalentArray(a, b) {
	return isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
/**
* Resolves a relative path that starts with `.`.
*
* @param to - path location we are resolving
* @param from - currentLocation.path, should start with `/`
*/
function resolveRelativePath(to, from) {
	if (to.startsWith("/")) return to;
	if (!to) return from;
	const fromSegments = from.split("/");
	const toSegments = to.split("/");
	const lastToSegment = toSegments[toSegments.length - 1];
	if (lastToSegment === ".." || lastToSegment === ".") toSegments.push("");
	let position = fromSegments.length - 1;
	let toPosition;
	let segment;
	for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
		segment = toSegments[toPosition];
		if (segment === ".") continue;
		if (segment === "..") {
			if (position > 1) position--;
		} else break;
	}
	return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition).join("/");
}
/**
* Initial route location where the router is. Can be used in navigation guards
* to differentiate the initial navigation.
*
* @example
* ```js
* import { START_LOCATION } from 'vue-router'
*
* router.beforeEach((to, from) => {
*   if (from === START_LOCATION) {
*     // initial navigation
*   }
* })
* ```
*/
var START_LOCATION_NORMALIZED = {
	path: "/",
	name: void 0,
	params: {},
	query: {},
	hash: "",
	fullPath: "/",
	matched: [],
	meta: {},
	redirectedFrom: void 0
};
/**
* Normalizes a base by removing any trailing slash and reading the base tag if
* present.
*
* @param base - base to normalize
*/
function normalizeBase(base) {
	if (!base) if (isBrowser) {
		const baseEl = document.querySelector("base");
		base = baseEl && baseEl.getAttribute("href") || "/";
		base = base.replace(/^\w+:\/\/[^/]+/, "");
	} else base = "/";
	if (base[0] !== "/" && base[0] !== "#") base = "/" + base;
	return removeTrailingSlash(base);
}
var BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location) {
	return base.replace(BEFORE_HASH_RE, "#") + location;
}
function getElementPosition(el, offset) {
	const docRect = document.documentElement.getBoundingClientRect();
	const elRect = el.getBoundingClientRect();
	return {
		behavior: offset.behavior,
		left: elRect.left - docRect.left - (offset.left || 0),
		top: elRect.top - docRect.top - (offset.top || 0)
	};
}
var computeScrollPosition = () => ({
	left: window.scrollX,
	top: window.scrollY
});
function scrollToPosition(position) {
	let scrollToOptions;
	if ("el" in position) {
		const positionEl = position.el;
		const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
		const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
		if (!el) return;
		scrollToOptions = getElementPosition(el, position);
	} else scrollToOptions = position;
	if ("scrollBehavior" in document.documentElement.style) window.scrollTo(scrollToOptions);
	else window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.scrollX, scrollToOptions.top != null ? scrollToOptions.top : window.scrollY);
}
function getScrollKey(path, delta) {
	return (history.state ? history.state.position - delta : -1) + path;
}
var scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key, scrollPosition) {
	scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
	const scroll = scrollPositions.get(key);
	scrollPositions.delete(key);
	return scroll;
}
/**
* ScrollBehavior instance used by the router to compute and restore the scroll
* position when navigating.
*/
function isRouteLocation(route) {
	return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
	return typeof name === "string" || typeof name === "symbol";
}
/**
* Transforms a queryString into a {@link LocationQuery} object. Accept both, a
* version with the leading `?` and without Should work as URLSearchParams

* @internal
*
* @param search - search string to parse
* @returns a query object
*/
function parseQuery(search) {
	const query = {};
	if (search === "" || search === "?") return query;
	const searchParams = (search[0] === "?" ? search.slice(1) : search).split("&");
	for (let i = 0; i < searchParams.length; ++i) {
		const searchParam = searchParams[i].replace(PLUS_RE, " ");
		const eqPos = searchParam.indexOf("=");
		const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
		const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
		if (key in query) {
			let currentValue = query[key];
			if (!isArray(currentValue)) currentValue = query[key] = [currentValue];
			currentValue.push(value);
		} else query[key] = value;
	}
	return query;
}
/**
* Stringifies a {@link LocationQueryRaw} object. Like `URLSearchParams`, it
* doesn't prepend a `?`
*
* @internal
*
* @param query - query object to stringify
* @returns string version of the query without the leading `?`
*/
function stringifyQuery(query) {
	let search = "";
	for (let key in query) {
		const value = query[key];
		key = encodeQueryKey(key);
		if (value == null) {
			if (value !== void 0) search += (search.length ? "&" : "") + key;
			continue;
		}
		(isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)]).forEach((value) => {
			if (value !== void 0) {
				search += (search.length ? "&" : "") + key;
				if (value != null) search += "=" + value;
			}
		});
	}
	return search;
}
/**
* Transforms a {@link LocationQueryRaw} into a {@link LocationQuery} by casting
* numbers into strings, removing keys with an undefined value and replacing
* undefined with null in arrays
*
* @param query - query object to normalize
* @returns a normalized query object
*/
function normalizeQuery(query) {
	const normalizedQuery = {};
	for (const key in query) {
		const value = query[key];
		if (value !== void 0) normalizedQuery[key] = isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
	}
	return normalizedQuery;
}
/**
* Create a list of callbacks that can be reset. Used to create before and after navigation guards list
*/
function useCallbacks() {
	let handlers = [];
	function add(handler) {
		handlers.push(handler);
		return () => {
			const i = handlers.indexOf(handler);
			if (i > -1) handlers.splice(i, 1);
		};
	}
	function reset() {
		handlers = [];
	}
	return {
		add,
		list: () => handlers.slice(),
		reset
	};
}
function guardToPromiseFn(guard, to, from, record, name, runWithContext = (fn) => fn()) {
	const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
	return () => new Promise((resolve, reject) => {
		const next = (valid) => {
			if (valid === false) reject(createRouterError(4, {
				from,
				to
			}));
			else if (valid instanceof Error) reject(valid);
			else if (isRouteLocation(valid)) reject(createRouterError(2, {
				from: to,
				to: valid
			}));
			else {
				if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") enterCallbackArray.push(valid);
				resolve();
			}
		};
		const guardReturn = runWithContext(() => guard.call(record && record.instances[name], to, from, next));
		let guardCall = Promise.resolve(guardReturn);
		if (guard.length < 3) guardCall = guardCall.then(next);
		guardCall.catch((err) => reject(err));
	});
}
function extractComponentsGuards(matched, guardType, to, from, runWithContext = (fn) => fn()) {
	const guards = [];
	for (const record of matched) for (const name in record.components) {
		let rawComponent = record.components[name];
		if (guardType !== "beforeRouteEnter" && !record.instances[name]) continue;
		if (isRouteComponent(rawComponent)) {
			const guard = (rawComponent.__vccOpts || rawComponent)[guardType];
			guard && guards.push(guardToPromiseFn(guard, to, from, record, name, runWithContext));
		} else {
			let componentPromise = rawComponent();
			guards.push(() => componentPromise.then((resolved) => {
				if (!resolved) throw new Error(`Couldn't resolve component "${name}" at "${record.path}"`);
				const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
				record.mods[name] = resolved;
				record.components[name] = resolvedComponent;
				const guard = (resolvedComponent.__vccOpts || resolvedComponent)[guardType];
				return guard && guardToPromiseFn(guard, to, from, record, name, runWithContext)();
			}));
		}
	}
	return guards;
}
/**
* Split the leaving, updating, and entering records.
* @internal
*
* @param  to - Location we are navigating to
* @param from - Location we are navigating from
*/
function extractChangingRecords(to, from) {
	const leavingRecords = [];
	const updatingRecords = [];
	const enteringRecords = [];
	const len = Math.max(from.matched.length, to.matched.length);
	for (let i = 0; i < len; i++) {
		const recordFrom = from.matched[i];
		if (recordFrom) if (to.matched.find((record) => isSameRouteRecord(record, recordFrom))) updatingRecords.push(recordFrom);
		else leavingRecords.push(recordFrom);
		const recordTo = to.matched[i];
		if (recordTo) {
			if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) enteringRecords.push(recordTo);
		}
	}
	return [
		leavingRecords,
		updatingRecords,
		enteringRecords
	];
}
//#endregion
//#region node_modules/vue-router/dist/vue-router.js
/*!
* vue-router v5.1.0
* (c) 2026 Eduardo San Martin Morote
* @license MIT
*/
var createBaseLocation = () => location.protocol + "//" + location.host;
/**
* Creates a normalized history location from a window.location object
* @param base - The base path
* @param location - The window.location object
*/
function createCurrentLocation(base, location) {
	const { pathname, search, hash } = location;
	const hashPos = base.indexOf("#");
	if (hashPos > -1) {
		let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
		let pathFromHash = hash.slice(slicePos);
		if (pathFromHash[0] !== "/") pathFromHash = "/" + pathFromHash;
		return stripBase(pathFromHash, "");
	}
	return stripBase(pathname, base) + search + hash;
}
function useHistoryListeners(base, historyState, currentLocation, replace) {
	let listeners = [];
	let teardowns = [];
	let pauseState = null;
	const popStateHandler = ({ state }) => {
		const to = createCurrentLocation(base, location);
		const from = currentLocation.value;
		const fromState = historyState.value;
		let delta = 0;
		if (state) {
			currentLocation.value = to;
			historyState.value = state;
			if (pauseState && pauseState === from) {
				pauseState = null;
				return;
			}
			delta = fromState ? state.position - fromState.position : 0;
		} else replace(to);
		listeners.forEach((listener) => {
			listener(currentLocation.value, from, {
				delta,
				type: "pop",
				direction: delta ? delta > 0 ? "forward" : "back" : ""
			});
		});
	};
	function pauseListeners() {
		pauseState = currentLocation.value;
	}
	function listen(callback) {
		listeners.push(callback);
		const teardown = () => {
			const index = listeners.indexOf(callback);
			if (index > -1) listeners.splice(index, 1);
		};
		teardowns.push(teardown);
		return teardown;
	}
	function beforeUnloadListener() {
		if (document.visibilityState === "hidden") {
			const { history } = window;
			if (!history.state) return;
			history.replaceState(assign({}, history.state, { scroll: computeScrollPosition() }), "");
		}
	}
	function destroy() {
		for (const teardown of teardowns) teardown();
		teardowns = [];
		window.removeEventListener("popstate", popStateHandler);
		window.removeEventListener("pagehide", beforeUnloadListener);
		document.removeEventListener("visibilitychange", beforeUnloadListener);
	}
	window.addEventListener("popstate", popStateHandler);
	window.addEventListener("pagehide", beforeUnloadListener);
	document.addEventListener("visibilitychange", beforeUnloadListener);
	return {
		pauseListeners,
		listen,
		destroy
	};
}
/**
* Creates a state object
*/
function buildState(back, current, forward, replaced = false, computeScroll = false) {
	return {
		back,
		current,
		forward,
		replaced,
		position: window.history.length,
		scroll: computeScroll ? computeScrollPosition() : null
	};
}
function useHistoryStateNavigation(base) {
	const { history, location } = window;
	const currentLocation = { value: createCurrentLocation(base, location) };
	const historyState = { value: history.state };
	if (!historyState.value) changeLocation(currentLocation.value, {
		back: null,
		current: currentLocation.value,
		forward: null,
		position: history.length - 1,
		replaced: true,
		scroll: null
	}, true);
	function changeLocation(to, state, replace) {
		/**
		* if a base tag is provided, and we are on a normal domain, we have to
		* respect the provided `base` attribute because pushState() will use it and
		* potentially erase anything before the `#` like at
		* https://github.com/vuejs/router/issues/685 where a base of
		* `/folder/#` but a base of `/` would erase the `/folder/` section. If
		* there is no host, the `<base>` tag makes no sense and if there isn't a
		* base tag we can just use everything after the `#`.
		*/
		const hashIndex = base.indexOf("#");
		const url = hashIndex > -1 ? (location.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
		try {
			history[replace ? "replaceState" : "pushState"](state, "", url);
			historyState.value = state;
		} catch (err) {
			console.error(err);
			location[replace ? "replace" : "assign"](url);
		}
	}
	function replace(to, data) {
		changeLocation(to, assign({}, history.state, buildState(historyState.value.back, to, historyState.value.forward, true), data, { position: historyState.value.position }), true);
		currentLocation.value = to;
	}
	function push(to, data) {
		const currentState = assign({}, historyState.value, history.state, {
			forward: to,
			scroll: computeScrollPosition()
		});
		changeLocation(currentState.current, currentState, true);
		changeLocation(to, assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data), false);
		currentLocation.value = to;
	}
	return {
		location: currentLocation,
		state: historyState,
		push,
		replace
	};
}
/**
* Creates an HTML5 history. Most common history for single page applications.
*
* @param base -
*/
function createWebHistory(base) {
	base = normalizeBase(base);
	const historyNavigation = useHistoryStateNavigation(base);
	const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
	function go(delta, triggerListeners = true) {
		if (!triggerListeners) historyListeners.pauseListeners();
		history.go(delta);
	}
	const routerHistory = assign({
		location: "",
		base,
		go,
		createHref: createHref.bind(null, base)
	}, historyNavigation, historyListeners);
	Object.defineProperty(routerHistory, "location", {
		enumerable: true,
		get: () => historyNavigation.location.value
	});
	Object.defineProperty(routerHistory, "state", {
		enumerable: true,
		get: () => historyNavigation.state.value
	});
	return routerHistory;
}
/**
* Creates a hash history. Useful for web applications with no host (e.g. `file://`) or when configuring a server to
* handle any URL is not possible.
*
* @param base - optional base to provide. Defaults to `location.pathname + location.search` If there is a `<base>` tag
* in the `head`, its value will be ignored in favor of this parameter **but note it affects all the history.pushState()
* calls**, meaning that if you use a `<base>` tag, it's `href` value **has to match this parameter** (ignoring anything
* after the `#`).
*
* @example
* ```js
* // at https://example.com/folder
* createWebHashHistory() // gives a url of `https://example.com/folder#`
* createWebHashHistory('/folder/') // gives a url of `https://example.com/folder/#`
* // if the `#` is provided in the base, it won't be added by `createWebHashHistory`
* createWebHashHistory('/folder/#/app/') // gives a url of `https://example.com/folder/#/app/`
* // you should avoid doing this because it changes the original url and breaks copying urls
* createWebHashHistory('/other-folder/') // gives a url of `https://example.com/other-folder/#`
*
* // at file:///usr/etc/folder/index.html
* // for locations with no `host`, the base is ignored
* createWebHashHistory('/iAmIgnored') // gives a url of `file:///usr/etc/folder/index.html#`
* ```
*/
function createWebHashHistory(base) {
	base = location.host ? base || location.pathname + location.search : "";
	if (!base.includes("#")) base += "#";
	return createWebHistory(base);
}
var ROOT_TOKEN = {
	type: 0,
	value: ""
};
var VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
	if (!path) return [[]];
	if (path === "/") return [[ROOT_TOKEN]];
	if (!path.startsWith("/")) throw new Error(`Invalid path "${path}"`);
	function crash(message) {
		throw new Error(`ERR (${state})/"${buffer}": ${message}`);
	}
	let state = 0;
	let previousState = state;
	const tokens = [];
	let segment;
	function finalizeSegment() {
		if (segment) tokens.push(segment);
		segment = [];
	}
	let i = 0;
	let char;
	let buffer = "";
	let customRe = "";
	function consumeBuffer() {
		if (!buffer) return;
		if (state === 0) segment.push({
			type: 0,
			value: buffer
		});
		else if (state === 1 || state === 2 || state === 3) {
			if (segment.length > 1 && (char === "*" || char === "+")) crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
			segment.push({
				type: 1,
				value: buffer,
				regexp: customRe,
				repeatable: char === "*" || char === "+",
				optional: char === "*" || char === "?"
			});
		} else crash("Invalid state to consume buffer");
		buffer = "";
	}
	function addCharToBuffer() {
		buffer += char;
	}
	while (i < path.length) {
		char = path[i++];
		switch (state) {
			case 0:
				if (char === "\\") {
					previousState = state;
					state = 4;
				} else if (char === "/") {
					if (buffer) consumeBuffer();
					finalizeSegment();
				} else if (char === ":") {
					consumeBuffer();
					state = 1;
				} else addCharToBuffer();
				break;
			case 4:
				addCharToBuffer();
				state = previousState;
				break;
			case 1:
				if (char === "(") state = 2;
				else if (VALID_PARAM_RE.test(char)) addCharToBuffer();
				else {
					consumeBuffer();
					state = 0;
					if (char !== "*" && char !== "?" && char !== "+") i--;
				}
				break;
			case 2:
				if (char === ")") if (customRe[customRe.length - 1] == "\\") customRe = customRe.slice(0, -1) + char;
				else state = 3;
				else customRe += char;
				break;
			case 3:
				consumeBuffer();
				state = 0;
				if (char !== "*" && char !== "?" && char !== "+") i--;
				customRe = "";
				break;
			default:
				crash("Unknown state");
				break;
		}
	}
	if (state === 2) crash(`Unfinished custom RegExp for param "${buffer}"`);
	consumeBuffer();
	finalizeSegment();
	return tokens;
}
var BASE_PARAM_PATTERN = "[^/]+?";
var BASE_PATH_PARSER_OPTIONS = {
	sensitive: false,
	strict: false,
	start: true,
	end: true
};
var REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
/**
* Creates a path parser from an array of Segments (a segment is an array of Tokens)
*
* @param segments - array of segments returned by tokenizePath
* @param extraOptions - optional options for the regexp
* @returns a PathParser
*/
function tokensToParser(segments, extraOptions) {
	const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
	const score = [];
	let pattern = options.start ? "^" : "";
	const keys = [];
	for (const segment of segments) {
		const segmentScores = segment.length ? [] : [90];
		if (options.strict && !segment.length) pattern += "/";
		for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
			const token = segment[tokenIndex];
			let subSegmentScore = 40 + (options.sensitive ? .25 : 0);
			if (token.type === 0) {
				if (!tokenIndex) pattern += "/";
				pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
				subSegmentScore += 40;
			} else if (token.type === 1) {
				const { value, repeatable, optional, regexp } = token;
				keys.push({
					name: value,
					repeatable,
					optional
				});
				const re = regexp ? regexp : BASE_PARAM_PATTERN;
				if (re !== BASE_PARAM_PATTERN) {
					subSegmentScore += 10;
					try {
						new RegExp(`(${re})`);
					} catch (err) {
						throw new Error(`Invalid custom RegExp for param "${value}" (${re}): ` + err.message);
					}
				}
				let subPattern = repeatable ? `((?:${re})(?:/(?:${re}))*)` : `(${re})`;
				if (!tokenIndex) subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
				if (optional) subPattern += "?";
				pattern += subPattern;
				subSegmentScore += 20;
				if (optional) subSegmentScore += -8;
				if (repeatable) subSegmentScore += -20;
				if (re === ".*") subSegmentScore += -50;
			}
			segmentScores.push(subSegmentScore);
		}
		score.push(segmentScores);
	}
	if (options.strict && options.end) {
		const i = score.length - 1;
		score[i][score[i].length - 1] += .7000000000000001;
	}
	if (!options.strict) pattern += "/?";
	if (options.end) pattern += "$";
	else if (options.strict && !pattern.endsWith("/")) pattern += "(?:/|$)";
	const re = new RegExp(pattern, options.sensitive ? "" : "i");
	function parse(path) {
		const match = path.match(re);
		const params = {};
		if (!match) return null;
		for (let i = 1; i < match.length; i++) {
			const value = match[i] || "";
			const key = keys[i - 1];
			params[key.name] = value && key.repeatable ? value.split("/") : value;
		}
		return params;
	}
	function stringify(params) {
		let path = "";
		let avoidDuplicatedSlash = false;
		for (const segment of segments) {
			if (!avoidDuplicatedSlash || !path.endsWith("/")) path += "/";
			avoidDuplicatedSlash = false;
			for (const token of segment) if (token.type === 0) path += token.value;
			else if (token.type === 1) {
				const { value, repeatable, optional } = token;
				const param = value in params ? params[value] : "";
				if (isArray(param) && !repeatable) throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
				const text = isArray(param) ? param.join("/") : param;
				if (!text) if (optional) {
					if (segment.length < 2) if (path.endsWith("/")) path = path.slice(0, -1);
					else avoidDuplicatedSlash = true;
				} else throw new Error(`Missing required param "${value}"`);
				path += text;
			}
		}
		return path || "/";
	}
	return {
		re,
		score,
		keys,
		parse,
		stringify
	};
}
/**
* Compares an array of numbers as used in PathParser.score and returns a
* number. This function can be used to `sort` an array
*
* @param a - first array of numbers
* @param b - second array of numbers
* @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
* should be sorted first
*/
function compareScoreArray(a, b) {
	let i = 0;
	while (i < a.length && i < b.length) {
		const diff = b[i] - a[i];
		if (diff) return diff;
		i++;
	}
	if (a.length < b.length) return a.length === 1 && a[0] === 80 ? -1 : 1;
	else if (a.length > b.length) return b.length === 1 && b[0] === 80 ? 1 : -1;
	return 0;
}
/**
* Compare function that can be used with `sort` to sort an array of PathParser
*
* @param a - first PathParser
* @param b - second PathParser
* @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
*/
function comparePathParserScore(a, b) {
	let i = 0;
	const aScore = a.score;
	const bScore = b.score;
	while (i < aScore.length && i < bScore.length) {
		const comp = compareScoreArray(aScore[i], bScore[i]);
		if (comp) return comp;
		i++;
	}
	if (Math.abs(bScore.length - aScore.length) === 1) {
		if (isLastScoreNegative(aScore)) return 1;
		if (isLastScoreNegative(bScore)) return -1;
	}
	return bScore.length - aScore.length;
}
/**
* This allows detecting splats at the end of a path: /home/:id(.*)*
*
* @param score - score to check
* @returns true if the last entry is negative
*/
function isLastScoreNegative(score) {
	const last = score[score.length - 1];
	return score.length > 0 && last[last.length - 1] < 0;
}
var PATH_PARSER_OPTIONS_DEFAULTS = {
	strict: false,
	end: true,
	sensitive: false
};
function createRouteRecordMatcher(record, parent, options) {
	const matcher = assign(tokensToParser(tokenizePath(record.path), options), {
		record,
		parent,
		children: [],
		alias: []
	});
	if (parent) {
		if (!matcher.record.aliasOf === !parent.record.aliasOf) parent.children.push(matcher);
	}
	return matcher;
}
/**
* Creates a Router Matcher.
*
* @internal
* @param routes - array of initial routes
* @param globalOptions - global route options
*/
function createRouterMatcher(routes, globalOptions) {
	const matchers = [];
	const matcherMap = /* @__PURE__ */ new Map();
	globalOptions = mergeOptions(PATH_PARSER_OPTIONS_DEFAULTS, globalOptions);
	function getRecordMatcher(name) {
		return matcherMap.get(name);
	}
	function addRoute(record, parent, originalRecord) {
		const isRootAdd = !originalRecord;
		const mainNormalizedRecord = normalizeRouteRecord(record);
		mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
		const options = mergeOptions(globalOptions, record);
		const normalizedRecords = [mainNormalizedRecord];
		if ("alias" in record) {
			const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
			for (const alias of aliases) normalizedRecords.push(normalizeRouteRecord(assign({}, mainNormalizedRecord, {
				components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
				path: alias,
				aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
			})));
		}
		let matcher;
		let originalMatcher;
		for (const normalizedRecord of normalizedRecords) {
			const { path } = normalizedRecord;
			if (parent && path[0] !== "/") {
				const parentPath = parent.record.path;
				const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
				normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
			}
			matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
			if (originalRecord) originalRecord.alias.push(matcher);
			else {
				originalMatcher = originalMatcher || matcher;
				if (originalMatcher !== matcher) originalMatcher.alias.push(matcher);
				if (isRootAdd && record.name && !isAliasRecord(matcher)) removeRoute(record.name);
			}
			if (isMatchable(matcher)) insertMatcher(matcher);
			if (mainNormalizedRecord.children) {
				const children = mainNormalizedRecord.children;
				for (let i = 0; i < children.length; i++) addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
			}
			originalRecord = originalRecord || matcher;
		}
		return originalMatcher ? () => {
			removeRoute(originalMatcher);
		} : noop;
	}
	function removeRoute(matcherRef) {
		if (isRouteName(matcherRef)) {
			const matcher = matcherMap.get(matcherRef);
			if (matcher) {
				matcherMap.delete(matcherRef);
				matchers.splice(matchers.indexOf(matcher), 1);
				matcher.children.forEach(removeRoute);
				matcher.alias.forEach(removeRoute);
			}
		} else {
			const index = matchers.indexOf(matcherRef);
			if (index > -1) {
				matchers.splice(index, 1);
				if (matcherRef.record.name) matcherMap.delete(matcherRef.record.name);
				matcherRef.children.forEach(removeRoute);
				matcherRef.alias.forEach(removeRoute);
			}
		}
	}
	function getRoutes() {
		return matchers;
	}
	function insertMatcher(matcher) {
		const index = findInsertionIndex(matcher, matchers);
		matchers.splice(index, 0, matcher);
		if (matcher.record.name && !isAliasRecord(matcher)) matcherMap.set(matcher.record.name, matcher);
	}
	function resolve(location, currentLocation) {
		let matcher;
		let params = {};
		let path;
		let name;
		if ("name" in location && location.name) {
			matcher = matcherMap.get(location.name);
			if (!matcher) throw createRouterError(1, { location });
			name = matcher.record.name;
			params = assign(pickParams(currentLocation.params, matcher.keys.filter((k) => !k.optional).concat(matcher.parent ? matcher.parent.keys.filter((k) => k.optional) : []).map((k) => k.name)), location.params && pickParams(location.params, matcher.keys.map((k) => k.name)));
			path = matcher.stringify(params);
		} else if (location.path != null) {
			path = location.path;
			matcher = matchers.find((m) => m.re.test(path));
			if (matcher) {
				params = matcher.parse(path);
				name = matcher.record.name;
				matcher.keys.forEach((key) => {
					if (key.optional && !params[key.name]) delete params[key.name];
				});
			}
		} else {
			matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
			if (!matcher) throw createRouterError(1, {
				location,
				currentLocation
			});
			name = matcher.record.name;
			params = assign({}, currentLocation.params, location.params);
			path = matcher.stringify(params);
		}
		const matched = [];
		let parentMatcher = matcher;
		while (parentMatcher) {
			matched.unshift(parentMatcher.record);
			parentMatcher = parentMatcher.parent;
		}
		return {
			name,
			path,
			params,
			matched,
			meta: mergeMetaFields(matched)
		};
	}
	routes.forEach((route) => addRoute(route));
	function clearRoutes() {
		matchers.length = 0;
		matcherMap.clear();
	}
	return {
		addRoute,
		resolve,
		removeRoute,
		clearRoutes,
		getRoutes,
		getRecordMatcher
	};
}
/**
* Picks an object param to contain only specified keys.
*
* @param params - params object to pick from
* @param keys - keys to pick
*/
function pickParams(params, keys) {
	const newParams = {};
	for (const key of keys) if (key in params) newParams[key] = params[key];
	return newParams;
}
/**
* Normalizes a RouteRecordRaw. Creates a copy
*
* @param record
* @returns the normalized version
*/
function normalizeRouteRecord(record) {
	const normalized = {
		path: record.path,
		redirect: record.redirect,
		name: record.name,
		meta: record.meta || {},
		aliasOf: record.aliasOf,
		beforeEnter: record.beforeEnter,
		props: normalizeRecordProps(record),
		children: record.children || [],
		instances: {},
		leaveGuards: /* @__PURE__ */ new Set(),
		updateGuards: /* @__PURE__ */ new Set(),
		enterCallbacks: {},
		components: "components" in record ? record.components || null : record.component && { default: record.component }
	};
	Object.defineProperty(normalized, "mods", { value: {} });
	return normalized;
}
/**
* Normalize the optional `props` in a record to always be an object similar to
* components. Also accept a boolean for components.
* @param record
*/
function normalizeRecordProps(record) {
	const propsObject = {};
	const props = record.props || false;
	if ("component" in record) propsObject.default = props;
	else for (const name in record.components) propsObject[name] = typeof props === "object" ? props[name] : props;
	return propsObject;
}
/**
* Checks if a record or any of its parent is an alias
* @param record
*/
function isAliasRecord(record) {
	while (record) {
		if (record.record.aliasOf) return true;
		record = record.parent;
	}
	return false;
}
/**
* Merge meta fields of an array of records
*
* @param matched - array of matched records
*/
function mergeMetaFields(matched) {
	return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
/**
* Performs a binary search to find the correct insertion index for a new matcher.
*
* Matchers are primarily sorted by their score. If scores are tied then we also consider parent/child relationships,
* with descendants coming before ancestors. If there's still a tie, new routes are inserted after existing routes.
*
* @param matcher - new matcher to be inserted
* @param matchers - existing matchers
*/
function findInsertionIndex(matcher, matchers) {
	let lower = 0;
	let upper = matchers.length;
	while (lower !== upper) {
		const mid = lower + upper >> 1;
		if (comparePathParserScore(matcher, matchers[mid]) < 0) upper = mid;
		else lower = mid + 1;
	}
	const insertionAncestor = getInsertionAncestor(matcher);
	if (insertionAncestor) upper = matchers.lastIndexOf(insertionAncestor, upper - 1);
	return upper;
}
function getInsertionAncestor(matcher) {
	let ancestor = matcher;
	while (ancestor = ancestor.parent) if (isMatchable(ancestor) && comparePathParserScore(matcher, ancestor) === 0) return ancestor;
}
/**
* Checks if a matcher can be reachable. This means if it's possible to reach it as a route. For example, routes without
* a component, or name, or redirect, are just used to group other routes.
* @param matcher
* @param matcher.record record of the matcher
* @returns
*/
function isMatchable({ record }) {
	return !!(record.name || record.components && Object.keys(record.components).length || record.redirect);
}
/**
* Returns the internal behavior of a {@link RouterLink} without the rendering part.
*
* @param props - a `to` location and an optional `replace` flag
*/
function useLink(props) {
	const router = inject(routerKey);
	const currentRoute = inject(routeLocationKey);
	const route = computed(() => {
		const to = unref(props.to);
		return router.resolve(to);
	});
	const activeRecordIndex = computed(() => {
		const { matched } = route.value;
		const { length } = matched;
		const routeMatched = matched[length - 1];
		const currentMatched = currentRoute.matched;
		if (!routeMatched || !currentMatched.length) return -1;
		const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
		if (index > -1) return index;
		const parentRecordPath = getOriginalPath(matched[length - 2]);
		return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
	});
	const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
	const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
	function navigate(e = {}) {
		if (guardEvent(e)) {
			const p = router[unref(props.replace) ? "replace" : "push"](unref(props.to)).catch(noop);
			if (props.viewTransition && typeof document !== "undefined" && "startViewTransition" in document) document.startViewTransition(() => p);
			return p;
		}
		return Promise.resolve();
	}
	/**
	* NOTE: update {@link _RouterLinkI}'s `$slots` type when updating this
	*/
	return {
		route,
		href: computed(() => route.value.href),
		isActive,
		isExactActive,
		navigate
	};
}
function preferSingleVNode(vnodes) {
	return vnodes.length === 1 ? vnodes[0] : vnodes;
}
/**
* Component to render a link that triggers a navigation on click.
*/
var RouterLink = /* @__PURE__ */ defineComponent({
	name: "RouterLink",
	compatConfig: { MODE: 3 },
	props: {
		to: {
			type: [String, Object],
			required: true
		},
		replace: Boolean,
		activeClass: String,
		exactActiveClass: String,
		custom: Boolean,
		ariaCurrentValue: {
			type: String,
			default: "page"
		},
		viewTransition: Boolean
	},
	useLink,
	setup(props, { slots }) {
		const link = /* @__PURE__ */ reactive(useLink(props));
		const { options } = inject(routerKey);
		const elClass = computed(() => ({
			[getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
			[getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
		}));
		return () => {
			const children = slots.default && preferSingleVNode(slots.default(link));
			return props.custom ? children : h("a", {
				"aria-current": link.isExactActive ? props.ariaCurrentValue : null,
				href: link.href,
				onClick: link.navigate,
				class: elClass.value
			}, children);
		};
	}
});
function guardEvent(e) {
	if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
	if (e.defaultPrevented) return;
	if (e.button !== void 0 && e.button !== 0) return;
	if (e.currentTarget && e.currentTarget.getAttribute) {
		const target = e.currentTarget.getAttribute("target");
		if (/\b_blank\b/i.test(target)) return;
	}
	if (e.preventDefault) e.preventDefault();
	return true;
}
function includesParams(outer, inner) {
	for (const key in inner) {
		const innerValue = inner[key];
		const outerValue = outer[key];
		if (typeof innerValue === "string") {
			if (innerValue !== outerValue) return false;
		} else if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value.valueOf() !== outerValue[i].valueOf())) return false;
	}
	return true;
}
/**
* Get the original path value of a record by following its aliasOf
* @param record
*/
function getOriginalPath(record) {
	return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
/**
* Utility class to get the active class based on defaults.
* @param propClass
* @param globalClass
* @param defaultClass
*/
var getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
var RouterViewImpl = /* @__PURE__ */ defineComponent({
	name: "RouterView",
	inheritAttrs: false,
	props: {
		name: {
			type: String,
			default: "default"
		},
		route: Object
	},
	compatConfig: { MODE: 3 },
	setup(props, { attrs, slots }) {
		const injectedRoute = inject(routerViewLocationKey);
		const routeToDisplay = computed(() => props.route || injectedRoute.value);
		const injectedDepth = inject(viewDepthKey, 0);
		const depth = computed(() => {
			let initialDepth = unref(injectedDepth);
			const { matched } = routeToDisplay.value;
			let matchedRoute;
			while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) initialDepth++;
			return initialDepth;
		});
		const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
		provide(viewDepthKey, computed(() => depth.value + 1));
		provide(matchedRouteKey, matchedRouteRef);
		provide(routerViewLocationKey, routeToDisplay);
		const viewRef = /* @__PURE__ */ ref();
		watch(() => [
			viewRef.value,
			matchedRouteRef.value,
			props.name
		], ([instance, to, name], [oldInstance, from, _oldName]) => {
			if (to) {
				to.instances[name] = instance;
				if (from && from !== to && instance && instance === oldInstance) {
					if (!to.leaveGuards.size) to.leaveGuards = from.leaveGuards;
					if (!to.updateGuards.size) to.updateGuards = from.updateGuards;
				}
			}
			if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
		}, { flush: "post" });
		return () => {
			const route = routeToDisplay.value;
			const currentName = props.name;
			const matchedRoute = matchedRouteRef.value;
			const ViewComponent = matchedRoute && matchedRoute.components[currentName];
			if (!ViewComponent) return normalizeSlot(slots.default, {
				Component: ViewComponent,
				route
			});
			const routePropsOption = matchedRoute.props[currentName];
			const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
			const onVnodeUnmounted = (vnode) => {
				if (vnode.component.isUnmounted) matchedRoute.instances[currentName] = null;
			};
			const component = h(ViewComponent, assign({}, routeProps, attrs, {
				onVnodeUnmounted,
				ref: viewRef
			}));
			return normalizeSlot(slots.default, {
				Component: component,
				route
			}) || component;
		};
	}
});
function normalizeSlot(slot, data) {
	if (!slot) return null;
	const slotContent = slot(data);
	return slotContent.length === 1 ? slotContent[0] : slotContent;
}
/**
* Component to display the current route the user is at.
*/
var RouterView = RouterViewImpl;
/**
* Creates a Router instance that can be used by a Vue app.
*
* @param options - {@link RouterOptions}
*/
function createRouter(options) {
	const matcher = createRouterMatcher(options.routes, options);
	const parseQuery$1 = options.parseQuery || parseQuery;
	const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
	const routerHistory = options.history;
	const beforeGuards = useCallbacks();
	const beforeResolveGuards = useCallbacks();
	const afterGuards = useCallbacks();
	const currentRoute = /* @__PURE__ */ shallowRef(START_LOCATION_NORMALIZED);
	let pendingLocation = START_LOCATION_NORMALIZED;
	if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) history.scrollRestoration = "manual";
	const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
	const encodeParams = applyToParams.bind(null, encodeParam);
	const decodeParams = applyToParams.bind(null, decode);
	function addRoute(parentOrRoute, route) {
		let parent;
		let record;
		if (isRouteName(parentOrRoute)) {
			parent = matcher.getRecordMatcher(parentOrRoute);
			record = route;
		} else record = parentOrRoute;
		return matcher.addRoute(record, parent);
	}
	function removeRoute(name) {
		const recordMatcher = matcher.getRecordMatcher(name);
		if (recordMatcher) matcher.removeRoute(recordMatcher);
	}
	function getRoutes() {
		return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
	}
	function hasRoute(name) {
		return !!matcher.getRecordMatcher(name);
	}
	function resolve(rawLocation, currentLocation) {
		currentLocation = assign({}, currentLocation || currentRoute.value);
		if (typeof rawLocation === "string") {
			const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
			const matchedRoute = matcher.resolve({ path: locationNormalized.path }, currentLocation);
			const href = routerHistory.createHref(locationNormalized.fullPath);
			return assign(locationNormalized, matchedRoute, {
				params: decodeParams(matchedRoute.params),
				redirectedFrom: void 0,
				href
			});
		}
		let matcherLocation;
		if (rawLocation.path != null) matcherLocation = assign({}, rawLocation, { path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path });
		else {
			const targetParams = assign({}, rawLocation.params);
			for (const key in targetParams) if (targetParams[key] == null) delete targetParams[key];
			matcherLocation = assign({}, rawLocation, { params: encodeParams(targetParams) });
			currentLocation.params = encodeParams(currentLocation.params);
		}
		const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
		const hash = rawLocation.hash || "";
		matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
		const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
			hash: encodeHash(hash),
			path: matchedRoute.path
		}));
		const href = routerHistory.createHref(fullPath);
		return assign({
			fullPath,
			hash,
			query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
		}, matchedRoute, {
			redirectedFrom: void 0,
			href
		});
	}
	function locationAsObject(to) {
		return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
	}
	function checkCanceledNavigation(to, from) {
		if (pendingLocation !== to) return createRouterError(8, {
			from,
			to
		});
	}
	function push(to) {
		return pushWithRedirect(to);
	}
	function replace(to) {
		return push(assign(locationAsObject(to), { replace: true }));
	}
	function handleRedirectRecord(to, from) {
		const lastMatched = to.matched[to.matched.length - 1];
		if (lastMatched && lastMatched.redirect) {
			const { redirect } = lastMatched;
			let newTargetLocation = typeof redirect === "function" ? redirect(to, from) : redirect;
			if (typeof newTargetLocation === "string") {
				newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
				newTargetLocation.params = {};
			}
			return assign({
				query: to.query,
				hash: to.hash,
				params: newTargetLocation.path != null ? {} : to.params
			}, newTargetLocation);
		}
	}
	function pushWithRedirect(to, redirectedFrom) {
		const targetLocation = pendingLocation = resolve(to);
		const from = currentRoute.value;
		const data = to.state;
		const force = to.force;
		const replace = to.replace === true;
		const shouldRedirect = handleRedirectRecord(targetLocation, from);
		if (shouldRedirect) return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
			state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
			force,
			replace
		}), redirectedFrom || targetLocation);
		const toLocation = targetLocation;
		toLocation.redirectedFrom = redirectedFrom;
		let failure;
		if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
			failure = createRouterError(16, {
				to: toLocation,
				from
			});
			handleScroll(from, from, true, false);
		}
		return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? isNavigationFailure(error, 2) ? error : markAsReady(error) : triggerError(error, toLocation, from)).then((failure) => {
			if (failure) {
				if (isNavigationFailure(failure, 2)) return pushWithRedirect(assign({ replace }, locationAsObject(failure.to), {
					state: typeof failure.to === "object" ? assign({}, data, failure.to.state) : data,
					force
				}), redirectedFrom || toLocation);
			} else failure = finalizeNavigation(toLocation, from, true, replace, data);
			triggerAfterEach(toLocation, from, failure);
			return failure;
		});
	}
	/**
	* Helper to reject and skip all navigation guards if a new navigation happened
	* @param to
	* @param from
	*/
	function checkCanceledNavigationAndReject(to, from) {
		const error = checkCanceledNavigation(to, from);
		return error ? Promise.reject(error) : Promise.resolve();
	}
	function runWithContext(fn) {
		const app = installedApps.values().next().value;
		return app && typeof app.runWithContext === "function" ? app.runWithContext(fn) : fn();
	}
	function navigate(to, from) {
		let guards;
		const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
		guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
		for (const record of leavingRecords) record.leaveGuards.forEach((guard) => {
			guards.push(guardToPromiseFn(guard, to, from));
		});
		const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
		guards.push(canceledNavigationCheck);
		return runGuardQueue(guards).then(() => {
			guards = [];
			for (const guard of beforeGuards.list()) guards.push(guardToPromiseFn(guard, to, from));
			guards.push(canceledNavigationCheck);
			return runGuardQueue(guards);
		}).then(() => {
			guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
			for (const record of updatingRecords) record.updateGuards.forEach((guard) => {
				guards.push(guardToPromiseFn(guard, to, from));
			});
			guards.push(canceledNavigationCheck);
			return runGuardQueue(guards);
		}).then(() => {
			guards = [];
			for (const record of enteringRecords) if (record.beforeEnter) if (isArray(record.beforeEnter)) for (const beforeEnter of record.beforeEnter) guards.push(guardToPromiseFn(beforeEnter, to, from));
			else guards.push(guardToPromiseFn(record.beforeEnter, to, from));
			guards.push(canceledNavigationCheck);
			return runGuardQueue(guards);
		}).then(() => {
			to.matched.forEach((record) => record.enterCallbacks = {});
			guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from, runWithContext);
			guards.push(canceledNavigationCheck);
			return runGuardQueue(guards);
		}).then(() => {
			guards = [];
			for (const guard of beforeResolveGuards.list()) guards.push(guardToPromiseFn(guard, to, from));
			guards.push(canceledNavigationCheck);
			return runGuardQueue(guards);
		}).catch((err) => isNavigationFailure(err, 8) ? err : Promise.reject(err));
	}
	function triggerAfterEach(to, from, failure) {
		afterGuards.list().forEach((guard) => runWithContext(() => guard(to, from, failure)));
	}
	/**
	* - Cleans up any navigation guards
	* - Changes the url if necessary
	* - Calls the scrollBehavior
	*/
	function finalizeNavigation(toLocation, from, isPush, replace, data) {
		const error = checkCanceledNavigation(toLocation, from);
		if (error) return error;
		const isFirstNavigation = from === START_LOCATION_NORMALIZED;
		const state = !isBrowser ? {} : history.state;
		if (isPush) if (replace || isFirstNavigation) routerHistory.replace(toLocation.fullPath, assign({ scroll: isFirstNavigation && state && state.scroll }, data));
		else routerHistory.push(toLocation.fullPath, data);
		currentRoute.value = toLocation;
		handleScroll(toLocation, from, isPush, isFirstNavigation);
		markAsReady();
	}
	let removeHistoryListener;
	function setupListeners() {
		if (removeHistoryListener) return;
		removeHistoryListener = routerHistory.listen((to, _from, info) => {
			if (!router.listening) return;
			const toLocation = resolve(to);
			const shouldRedirect = handleRedirectRecord(toLocation, router.currentRoute.value);
			if (shouldRedirect) {
				pushWithRedirect(assign(shouldRedirect, {
					replace: true,
					force: true
				}), toLocation).catch(noop);
				return;
			}
			pendingLocation = toLocation;
			const from = currentRoute.value;
			if (isBrowser) saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
			navigate(toLocation, from).catch((error) => {
				if (isNavigationFailure(error, 12)) return error;
				if (isNavigationFailure(error, 2)) {
					pushWithRedirect(assign(locationAsObject(error.to), { force: true }), toLocation).then((failure) => {
						if (isNavigationFailure(failure, 20) && !info.delta && info.type === "pop") routerHistory.go(-1, false);
					}).catch(noop);
					return Promise.reject();
				}
				if (info.delta) routerHistory.go(-info.delta, false);
				return triggerError(error, toLocation, from);
			}).then((failure) => {
				failure = failure || finalizeNavigation(toLocation, from, false);
				if (failure) {
					if (info.delta && !isNavigationFailure(failure, 8)) routerHistory.go(-info.delta, false);
					else if (info.type === "pop" && isNavigationFailure(failure, 20)) routerHistory.go(-1, false);
				}
				triggerAfterEach(toLocation, from, failure);
			}).catch(noop);
		});
	}
	let readyHandlers = useCallbacks();
	let errorListeners = useCallbacks();
	let ready;
	/**
	* Trigger errorListeners added via onError and throws the error as well
	*
	* @param error - error to throw
	* @param to - location we were navigating to when the error happened
	* @param from - location we were navigating from when the error happened
	* @returns the error as a rejected promise
	*/
	function triggerError(error, to, from) {
		markAsReady(error);
		const list = errorListeners.list();
		if (list.length) list.forEach((handler) => handler(error, to, from));
		else console.error(error);
		return Promise.reject(error);
	}
	function isReady() {
		if (ready && currentRoute.value !== START_LOCATION_NORMALIZED) return Promise.resolve();
		return new Promise((resolve, reject) => {
			readyHandlers.add([resolve, reject]);
		});
	}
	function markAsReady(err) {
		if (!ready) {
			ready = !err;
			setupListeners();
			readyHandlers.list().forEach(([resolve, reject]) => err ? reject(err) : resolve());
			readyHandlers.reset();
		}
		return err;
	}
	function handleScroll(to, from, isPush, isFirstNavigation) {
		const { scrollBehavior } = options;
		if (!isBrowser || !scrollBehavior) return Promise.resolve();
		const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
		return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
	}
	const go = (delta) => routerHistory.go(delta);
	let started;
	const installedApps = /* @__PURE__ */ new Set();
	const router = {
		currentRoute,
		listening: true,
		addRoute,
		removeRoute,
		clearRoutes: matcher.clearRoutes,
		hasRoute,
		getRoutes,
		resolve,
		options,
		push,
		replace,
		go,
		back: () => go(-1),
		forward: () => go(1),
		beforeEach: beforeGuards.add,
		beforeResolve: beforeResolveGuards.add,
		afterEach: afterGuards.add,
		onError: errorListeners.add,
		isReady,
		install(app) {
			app.component("RouterLink", RouterLink);
			app.component("RouterView", RouterView);
			app.config.globalProperties.$router = router;
			Object.defineProperty(app.config.globalProperties, "$route", {
				enumerable: true,
				get: () => unref(currentRoute)
			});
			if (isBrowser && !started && currentRoute.value === START_LOCATION_NORMALIZED) {
				started = true;
				push(routerHistory.location).catch((err) => {});
			}
			const reactiveRoute = {};
			for (const key in START_LOCATION_NORMALIZED) Object.defineProperty(reactiveRoute, key, {
				get: () => currentRoute.value[key],
				enumerable: true
			});
			app.provide(routerKey, router);
			app.provide(routeLocationKey, /* @__PURE__ */ shallowReactive(reactiveRoute));
			app.provide(routerViewLocationKey, currentRoute);
			const unmountApp = app.unmount;
			installedApps.add(app);
			app.unmount = function() {
				installedApps.delete(app);
				if (installedApps.size < 1) {
					pendingLocation = START_LOCATION_NORMALIZED;
					removeHistoryListener && removeHistoryListener();
					removeHistoryListener = null;
					currentRoute.value = START_LOCATION_NORMALIZED;
					started = false;
					ready = false;
				}
				unmountApp();
			};
		}
	};
	function runGuardQueue(guards) {
		return guards.reduce((promise, guard) => promise.then(() => runWithContext(guard)), Promise.resolve());
	}
	return router;
}
var Button_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "Button",
	props: {
		text: {
			type: String,
			default: "Кнопка"
		},
		width: {
			type: String,
			default: "12px 24px"
		},
		height: {
			type: String,
			default: "16px"
		},
		link: {
			type: String,
			default: "/"
		}
	},
	setup(__props) {
		useCssVars((_ctx) => ({
			"v1a894fe2": __props.width,
			"v1cd1b28b": __props.height
		}));
		const buttonStyle = computed(() => ({}));
		return (_ctx, _cache) => {
			const _component_router_link = resolveComponent("router-link");
			return openBlock(), createBlock(_component_router_link, {
				to: __props.link,
				class: "button-link"
			}, {
				default: withCtx(() => [createBaseVNode("button", {
					class: "gradient-btn",
					style: normalizeStyle(buttonStyle.value)
				}, toDisplayString(__props.text), 5)]),
				_: 1
			}, 8, ["to"]);
		};
	}
}, [["__scopeId", "data-v-015a0a2b"]]);
//#endregion
//#region src/components/Info.vue
var _hoisted_1$31 = { class: "service-card" };
var _hoisted_2$29 = { class: "service-card__title" };
var _hoisted_3$27 = { class: "service-card__list" };
var _hoisted_4$23 = {
	href: "#",
	class: "service-card__link"
};
var Info_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "Info",
	props: {
		title: {
			type: String,
			default: "ЗАГОЛОВОК"
		},
		items: {
			type: Array,
			default: () => []
		},
		buttonText: {
			type: String,
			default: "Подробнее"
		},
		link: {
			type: String,
			default: "/"
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$31, [
				createBaseVNode("h2", _hoisted_2$29, toDisplayString(__props.title), 1),
				createBaseVNode("ul", _hoisted_3$27, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (item) => {
					return openBlock(), createElementBlock("li", { key: item }, [createBaseVNode("a", _hoisted_4$23, toDisplayString(item), 1)]);
				}), 128))]),
				createVNode(Button_default, {
					text: __props.buttonText,
					width: "143px",
					height: "40px",
					link: __props.link
				}, null, 8, ["text", "link"])
			]);
		};
	}
}, [["__scopeId", "data-v-0d1cda40"]]);
//#endregion
//#region src/components/SectionCard.vue
var _hoisted_1$30 = { class: "section-card__overlay" };
var _hoisted_2$28 = { class: "section-card__content" };
var _hoisted_3$26 = { class: "section-card__title" };
var _hoisted_4$22 = { class: "section-card__text" };
var SectionCard_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "SectionCard",
	props: {
		title: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		},
		image: {
			type: String,
			required: true
		},
		link: {
			type: String,
			required: true,
			default: "/"
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			const _component_router_link = resolveComponent("router-link");
			return openBlock(), createElementBlock("div", {
				class: "section-card",
				style: normalizeStyle({ backgroundImage: `url(${__props.image})` })
			}, [createBaseVNode("div", _hoisted_1$30, [createBaseVNode("div", _hoisted_2$28, [createBaseVNode("h2", _hoisted_3$26, toDisplayString(__props.title), 1), createBaseVNode("p", _hoisted_4$22, toDisplayString(__props.text), 1)]), createVNode(_component_router_link, {
				to: __props.link,
				class: "section-card__arrow"
			}, {
				default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("svg", {
					width: "35",
					height: "58",
					viewBox: "0 0 35 58",
					fill: "none",
					xmlns: "http://www.w3.org/2000/svg"
				}, [createBaseVNode("path", {
					d: "M3.5 3.5L29.5 29.6892L3.5 54.5",
					stroke: "white",
					"stroke-width": "7",
					"stroke-linecap": "round"
				})], -1)])]),
				_: 1
			}, 8, ["to"])])], 4);
		};
	}
}, [["__scopeId", "data-v-8f75ec4b"]]);
//#endregion
//#region src/components/StatsBlock.vue
var _hoisted_1$29 = { class: "stats-block" };
var _hoisted_2$27 = { class: "stats-block__line stats-block__line--top" };
var _hoisted_3$25 = { class: "stats-block__line stats-block__line--middle" };
var _hoisted_4$21 = { class: "stats-block__line stats-block__line--bottom" };
var StatsBlock_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "StatsBlock",
	props: {
		top: {
			type: String,
			required: true
		},
		middle: {
			type: String,
			required: true
		},
		bottom: {
			type: String,
			required: true
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$29, [
				createBaseVNode("div", _hoisted_2$27, toDisplayString(__props.top), 1),
				createBaseVNode("div", _hoisted_3$25, toDisplayString(__props.middle), 1),
				createBaseVNode("div", _hoisted_4$21, toDisplayString(__props.bottom), 1)
			]);
		};
	}
}, [["__scopeId", "data-v-f70ce090"]]);
//#endregion
//#region src/components/ServiceCard.vue
var _hoisted_1$28 = { class: "service-card" };
var _hoisted_2$26 = { class: "service-card__text" };
var _hoisted_3$24 = { class: "modal-content__title" };
var _hoisted_4$20 = ["innerHTML"];
var _hoisted_5$16 = {
	key: 0,
	class: "modal-content__images"
};
var _hoisted_6$16 = ["src"];
var ServiceCard_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "ServiceCard",
	props: {
		text: {
			type: String,
			required: true,
			default: "Сайт по шаблону"
		},
		modalTitle: {
			type: String,
			required: true,
			default: "ЗАГОЛОВОК"
		},
		modalText: {
			type: String,
			required: true,
			default: ""
		},
		modalImages: {
			type: Array,
			default: () => []
		}
	},
	setup(__props) {
		const isModalOpen = /* @__PURE__ */ ref(false);
		const openModal = () => {
			isModalOpen.value = true;
		};
		const closeModal = () => {
			isModalOpen.value = false;
		};
		const handleEscape = (e) => {
			if (e.key === "Escape") closeModal();
		};
		onMounted(() => {
			document.addEventListener("keydown", handleEscape);
		});
		onBeforeUnmount(() => {
			document.removeEventListener("keydown", handleEscape);
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createBaseVNode("div", _hoisted_1$28, [createBaseVNode("span", _hoisted_2$26, toDisplayString(__props.text), 1), createBaseVNode("div", {
				class: "service-card__arrow",
				onClick: openModal
			}, [..._cache[1] || (_cache[1] = [createBaseVNode("svg", {
				width: "28",
				height: "16",
				viewBox: "0 0 28 16",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg"
			}, [createBaseVNode("path", {
				d: "M26.5 1.5L13.6622 13.5L1.5 1.5",
				stroke: "white",
				"stroke-width": "3",
				"stroke-linecap": "round"
			})], -1)])])]), isModalOpen.value ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: "modal-overlay",
				onClick: closeModal
			}, [createBaseVNode("div", {
				class: "modal-content",
				onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"]))
			}, [
				_cache[2] || (_cache[2] = createBaseVNode("img", {
					src: "/my-vue-app/image/pitno.png",
					class: "modal-content__bg",
					alt: ""
				}, null, -1)),
				createBaseVNode("h2", _hoisted_3$24, toDisplayString(__props.modalTitle), 1),
				createBaseVNode("div", {
					class: "modal-content__text",
					innerHTML: __props.modalText
				}, null, 8, _hoisted_4$20),
				__props.modalImages && __props.modalImages.length ? (openBlock(), createElementBlock("div", _hoisted_5$16, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.modalImages, (img, index) => {
					return openBlock(), createElementBlock("img", {
						key: index,
						src: img,
						class: "modal-content__image",
						alt: ""
					}, null, 8, _hoisted_6$16);
				}), 128))])) : createCommentVNode("", true),
				createBaseVNode("button", {
					class: "modal-content__close",
					onClick: closeModal
				}, "✕")
			])])) : createCommentVNode("", true)], 64);
		};
	}
}, [["__scopeId", "data-v-8b556679"]]);
//#endregion
//#region src/views/HomePage.vue
var _hoisted_1$27 = { class: "home-page" };
var _hoisted_2$25 = { class: "page-content" };
var _hoisted_3$23 = { class: "hello" };
var _hoisted_4$19 = { class: "numbers" };
var _hoisted_5$15 = { class: "sections" };
var _hoisted_6$15 = { class: "tabs-block" };
var _hoisted_7$12 = { class: "tabs-block__left" };
var _hoisted_8$8 = { class: "tabs-block__list" };
var _hoisted_9$7 = ["onClick"];
var _hoisted_10$5 = { class: "tabs-block__text" };
var _hoisted_11$3 = { class: "tabs-block__right" };
var _hoisted_12$2 = {
	key: 0,
	class: "tabs-block__content"
};
var _hoisted_13$2 = {
	key: 1,
	class: "tabs-block__content"
};
var _hoisted_14$1 = {
	key: 2,
	class: "tabs-block__content"
};
var _hoisted_15$1 = {
	key: 3,
	class: "tabs-block__content"
};
var _hoisted_16$1 = {
	key: 4,
	class: "tabs-block__content"
};
var _hoisted_17$1 = {
	key: 5,
	class: "tabs-block__content"
};
var _hoisted_18$1 = {
	key: 6,
	class: "tabs-block__content"
};
var _hoisted_19$1 = {
	key: 7,
	class: "tabs-block__content"
};
var _hoisted_20$1 = { class: "teoria" };
var HomePage_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "HomePage",
	setup(__props) {
		const promotionItems1 = [
			"Создание сайта на Bitrix",
			"Перенос сайта с Joomla Woardpress",
			"Создание сайта-визитки под ключ"
		];
		const promotionItems2 = [
			"Поисковое продвижение",
			"Продвижение сайта в Яндексе",
			"SEO-аудит сайта"
		];
		const tabs = [
			{
				id: "sites",
				name: "САЙТЫ"
			},
			{
				id: "shops",
				name: "МАГАЗИНЫ"
			},
			{
				id: "addons",
				name: "ДОПОЛНЕНИЯ"
			},
			{
				id: "advertising",
				name: "РЕКЛАМА"
			},
			{
				id: "promotion",
				name: "ПРОДВИЖЕНИЕ"
			},
			{
				id: "hosting",
				name: "ХОСТИНГ"
			},
			{
				id: "copywriting",
				name: "КОПИРАЙТ"
			},
			{
				id: "programming",
				name: "ПРОГРАММИРОВАНИЕ"
			}
		];
		const activeTab = /* @__PURE__ */ ref("sites");
		const isFormOpen = /* @__PURE__ */ ref(false);
		const openForm = () => {
			isFormOpen.value = true;
		};
		const closeForm = () => {
			isFormOpen.value = false;
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$27, [createBaseVNode("div", _hoisted_2$25, [
				createBaseVNode("div", _hoisted_3$23, [_cache[1] || (_cache[1] = createBaseVNode("div", { class: "title" }, [createBaseVNode("h2", { class: "hello__title" }, "Веб-маркетинг, который работает"), createBaseVNode("p", { class: "hello__text" }, "Создание сайтов, продвижение и реклама в Нижнем Новгороде с 17-летним опытом")], -1)), createBaseVNode("div", _hoisted_4$19, [
					createVNode(StatsBlock_default, {
						top: "17",
						middle: "ЛЕТ",
						bottom: "НА РЫНКЕ"
					}),
					createVNode(StatsBlock_default, {
						top: "1000",
						middle: "САЙТОВ",
						bottom: "НА ПОДДЕРЖКЕ"
					}),
					createVNode(StatsBlock_default, {
						top: "2000+",
						middle: "КОМПАНИЙ",
						bottom: "РЕКЛАМЫ"
					}),
					createVNode(StatsBlock_default, {
						top: "2500",
						middle: "САЙТОВ",
						bottom: "СОЗДАНО"
					})
				])]),
				createBaseVNode("div", _hoisted_5$15, [
					createVNode(SectionCard_default, {
						title: "РАЗРАБОТКА САЙТОВ",
						text: "Создаём сайты на Bitrix, Joomla, WordPress. Индивидуальный дизайн, понятная структура, адаптация под любой экран.",
						image: `@/image/razdel1.jpg`,
						link: "/develop"
					}),
					createVNode(SectionCard_default, {
						title: "РЕКЛАМА",
						text: "Запускаем и ведём рекламу в Яндексе, VK и Avito. Привлекаем целевых клиентов, считаем результат.",
						image: `@/image/razdel2.jpg`,
						link: "/marketing"
					}),
					createVNode(SectionCard_default, {
						title: "ПРОДВИЖЕНИЕ САЙТОВ",
						text: "Выводим сайт в топ поисковой выдачи. Работаем на долгий рост и стабильное количество заявок.",
						image: `@/image/razdel3.jpg`,
						link: "/promo"
					}),
					createVNode(SectionCard_default, {
						title: "СОЗДАНИЕ ИНТЕРНЕТ-МАГАЗИНА",
						text: "Разрабатываем удобные интернет-магазины с каталогами, корзиной и приёмом платежей. Всё для продаж онлайн.",
						image: `@/image/razdel4.jpg`,
						link: "/shop"
					})
				]),
				createBaseVNode("div", { class: "buttons" }, [createBaseVNode("button", {
					class: "service-btn",
					onClick: openForm
				}, "Узнать предложения для среднего и малого бизнеса"), createBaseVNode("button", {
					class: "service-btn",
					onClick: openForm
				}, "Узнать предложения для крупного бизнеса")]),
				isFormOpen.value ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: "form-modal",
					onClick: closeForm
				}, [createBaseVNode("div", {
					class: "form-modal__content",
					onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"]))
				}, [createBaseVNode("button", {
					class: "form-modal__close",
					onClick: closeForm
				}, "✕"), createVNode(FormSmall_default, {
					title: "ЗАКАЗАТЬ САЙТ",
					"background-image": "@/image/form.jpg"
				})])])) : createCommentVNode("", true),
				createBaseVNode("div", _hoisted_6$15, [createBaseVNode("div", _hoisted_7$12, [createBaseVNode("ul", _hoisted_8$8, [(openBlock(), createElementBlock(Fragment, null, renderList(tabs, (tab) => {
					return createBaseVNode("li", {
						key: tab.id,
						class: normalizeClass(["tabs-block__item", { "tabs-block__item--active": activeTab.value === tab.id }]),
						onClick: ($event) => activeTab.value = tab.id
					}, [createBaseVNode("span", _hoisted_10$5, toDisplayString(tab.name), 1)], 10, _hoisted_9$7);
				}), 64))])]), createBaseVNode("div", _hoisted_11$3, [activeTab.value === "sites" ? (openBlock(), createElementBlock("div", _hoisted_12$2, [
					createVNode(ServiceCard_default, {
						text: "Сайт по шаблону",
						"modal-title": "САЙТ ПО ШАБЛОНУ",
						"modal-text": "<p>Шаблон сайта\xA0- это макет страницы готового сайта. Из более 3 000 шаблонов вы можете выбрать\r\n                наиболее понравившийся лично Вам, а наши дизайнеры доработают его в соответствии с направлением деятельности и\r\n                 вашими предпочтениями. Макет включает в себя расположение различных элементов на сайте, художественный стиль и\r\n                  способ отображения страниц.</p>",
						"modal-images": ["@/image/examp1.jpg", "@/image/examp2.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Эксклюзивный сайт",
						"modal-title": "Эксклюзивный сайт",
						"modal-text": "<p>Дизайн эксклюзивного сайта создается с нуля с учетом всех Ваших пожеланий, направлений деятельности\r\n                и предпочтений. Включает в себя разработку оригинальной концепции веб-страниц с использованием разнообразных приемов\r\n                графического дизайна для достижения эффекта индивидуализации и узнаваемости, а также повышения имиджа Вашей компании. </p>",
						"modal-images": ["@/image/examp3.jpg", "@/image/examp4.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Landing page",
						"modal-title": "Landing page",
						"modal-text": "<p>Landing page— веб-страница, основной задачей которой является сбор контактных данных целевой\r\n                аудитории. Используется для усиления эффективности рекламы, увеличения аудитории. Целевая страница обычно\r\n                содержит информацию о товаре или услуге.</p>",
						"modal-images": ["@/image/examp5.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Сайт Витрина",
						"modal-title": "Сайт Витрина",
						"modal-text": "<p>Сайт Витрина - это веб-сайт, главной целью которого является интернет-реклама. Виртуальная витрина\r\n                представляет собой как online магазин, так и интернет-площадку, позволяющую рекламировать и продвигать offline\r\n                магазины. Главная задача виртуальной витрины заключается в обеспечении более информативной и продуктивной связи\r\n                между продавцом и покупателем посредством трёх важных инструментов: создание имиджа Вашей компании, представление\r\n                товара, подталкивание клиента к действию.</p>",
						"modal-images": ["@/image/examp6.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Mini-Витрина без системы и инструментов",
						"modal-title": "Mini-Витрина без системы и инструментов",
						"modal-text": "<p>Мини-витрина представляет собой презентацию текста о компании или продукции в виде инфографики (товары\r\n                со скидками, схема работы, баннеры с партнёрами, баннеры с продукцией и пр.). Кроме того, такой тип сайта создаёт имидж\r\n                фирмы и подталкивает клиента к действию.</p>",
						"modal-images": ["@/image/examp7.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Mini-Landing без системы и инструментов",
						"modal-title": "Mini-Landing без системы и инструментов",
						"modal-text": "<p>Мини-Landing создается для одного товара или услуги и представляет собой презентацию текста о\r\n                продукции в виде инфографики (схемы, баннеры, слайдеры и пр.). В отличие от мини-витрины, на таком сайте не\r\n                создаётся имидж компании. Главное - максимально, но сжато, тезисно представить всю необходимую для клиента\r\n                текстовую информацию о конкретном товаре в виде инфографики - баннеров, схем, изображений, анимации.\r\n                Мини-лендинг подстраивается под дизайн имеющегося сайта (то есть дизайн не создаётся специально для одной\r\n                такой страницы). Таким образом, мини-ленгдинг хорош тем, что с его помощью можно презентовать один или несколько\r\n                товаров наиболее подробно, что в конечном счёте сподвигнет клиента к действию – покупке или заказу.</p>",
						"modal-images": ["@/image/examp8.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Панель увеличения продаж от 4 до 10 раз",
						"modal-title": "Панель увеличения продаж от 4 до 10 раз",
						"modal-text": "<p>Панель продаж – мощный инструмент, который можно встроить почти в любой тип сайта, отлично подходит\r\n                для компаний с ограниченными финансами или начинающих компаний, которые при ограниченном бюджете хотели бы выйти на\r\n                получение ощутимой прибыли. Недорогую витрину с панелью продаж легко можно рекламировать в поисковых системах и\r\n                привлекать клиентов из разных источников.</p>",
						"modal-images": ["@/image/examp9.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Редизайн Joomla 1.5, Wordpress, Bitrix на Joomla 3.9",
						"modal-title": "Редизайн Joomla 1.5, Wordpress, Bitrix на Joomla 3.9",
						"modal-text": "<p>Дизайн сайта должен обеспечивать высокое качество юзабилити и удобство пользования ресурсом.\r\n                Современный дизайн веб-ресурса повышает позиции сайта в поисковиках и уровень лояльности со стороны клиентов.\r\n                Все это на 100 процентов увеличивает: продажи товаров и услуг с сайта; защиту позиций сайта; лояльность к компании.</p>",
						"modal-images": ["@/image/examp10.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Обновление Joomla c 1.5/2.5 до 3.9",
						"modal-title": "Обновление Joomla c 1.5/2.5 до 3.9",
						"modal-text": "<p>В обновлениях исправляются найденные ошибки. Как правило, разработчики добавляют новые возможности по\r\n                созданию и управлению сайта, а также улучшают работу старых функций. Во время обновления устаревшие файлы заменяются,\r\n                чтобы обеспечить корректную работу новых опций. </p>",
						"modal-images": ["@/image/examp11.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Создание дизайна сайта без сборки",
						"modal-title": "Создание дизайна сайта без сборки",
						"modal-text": "<p>Дизайн-макет сайта — это графический прототип будущего интернет-ресурса. Картинка может быть общей,\r\n                а может быть детально прорисованной на различных уровнях, давать представление обо всем структурном наполнении сайта,\r\n                навигации и даже наполнении. Дизайн сайта имеет ряд обязательных элементов: шапка, расположение меню, контакты,\r\n                навигация, цветовая гамма, шрифты и т. д. На выходе получится многослойная раскладка, полностью готовая к верстке\r\n                и кодированию.</p>",
						"modal-images": ["@/image/examp12.jpg", "@/image/examp13.jpg"]
					})
				])) : activeTab.value === "shops" ? (openBlock(), createElementBlock("div", _hoisted_13$2, [
					createVNode(ServiceCard_default, {
						text: "Шаблон + панель продаж",
						"modal-title": "Шаблон + панель продаж",
						"modal-text": "<p>Самый демократичный вариант для тех, кому нужен продающий сайт.\r\n                Шаблон - готовый макет сайта, наши дизайнеры помогут его сделать эксклюзивным,\r\n                а также впишут в общую стилистику сайта такой мощный инструмент, как панель продаж.\r\n                Она имеет вид магазина, хотя у Вас и не будет отдельых страниц для товаров, и выполняет\r\n                важнейшую функцию подталкивания покупателя к действию: панель продаж содержит перечень\r\n                товаров с ценами, каждый товар связан с кнопкой обратной связи. Таким образом, данный вариант\r\n                сверхэкономичен, но выполняет функции интернет-магазина на 100%.</p>",
						"modal-images": ["@/image/examp14.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Сайт по 500 шаблонам + интернет-магазин",
						"modal-title": "Сайт по 500 шаблонам + интернет-магазин",
						"modal-text": "<p>Самый оптимальный вариант для тех, кому нужен продающий сайт. Шаблон -\r\n                готовый макет сайта, наши дизайнеры помогут его сделать эксклюзивным, а также впишут в общую\r\n                стилистику сайта интернет-магазин.\r\nДля установки магазина использутся расширение JoomShopping, которое устанавливается на платформу Joomla! 3.7.\r\nJoomShopping имеет множество возможностей, среди которых такие, как:\r\nвозможность добавления товаров в список предпочтений;\r\nбольшое количество дополнительных характеристик;\r\nудобство в настройке и управлении магазином;\r\nхорошая руссификация всего компонента и доступность установки нескольких языков;\r\nвозможность создания заголовка и описания сразу на двух языках;\r\nимпорт и экспорт сторонних CSV-файлов;\r\nдобавление специальных стикеров (Новый, Распродажа и др.);\r\nустановка мета-тегов на товары;\r\nлотам на продажу может быть присвоено несколько изображений, видео- и звуковых файлов;\r\nвозможность установить опцию «Посмотреть, есть ли в наличии»;\r\nпривязка к Paypal и другим платформам;\r\nособенно чистые исходные коды для быстрой настройки и хорошего поиска и многое другое.\r\nБлагодаря отлично реализованному функционалу, настройка и управление интернет-магазином не вызовет\r\nзначительных трудностей. По сравнению с известным VirtueMart, компонент JoomShopping значительно проще в освоении.\r\nПосле установки компонента будут доступны 8 основных вкладок: Категории, Товары,\r\nЗаказы, Клиенты, Опции, Настройки, Установка и Обновление, Инфо.</p>",
						"modal-images": ["@/image/examp15.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Интернет-магазин полноценный",
						"modal-title": "Интернет-магазин полноценный",
						"modal-text": "<p>Если у Вас уже есть сайт, мы поможем добавить на него функциональный и удобный\r\n                интернет-магазин JoomShopping на базе Joomla! 3.7. JoomShopping имеет множество возможностей,\r\n                среди которых такие, как:\r\nвозможность добавления товаров в список предпочтений;\r\nбольшое количество дополнительных характеристик;\r\nудобство в настройке и управлении магазином;\r\nхорошая руссификация всего компонента и доступность установки нескольких языков;\r\nвозможность создания заголовка и описания сразу на двух языках;\r\nимпорт и экспорт сторонних CSV-файлов;\r\nдобавление специальных стикеров (Новый, Распродажа и др.);\r\nустановка мета-тегов на товары;\r\nлотам на продажу может быть присвоено несколько изображений, видео- и звуковых файлов;\r\nвозможность установить опцию «Посмотреть, есть ли в наличии»;\r\nпривязка к Paypal и другим платформам;\r\nособенно чистые исходные коды для быстрой настройки и хорошего поиска и многое другое.\r\nБлагодаря отлично реализованному функционалу, настройка и управление интернет-магазином не вызовет значительных трудностей.\r\nПо сравнению с известным VirtueMart, компонент JoomShopping значительно проще в освоении.\r\nПосле установки компонента будут доступны 8 основных вкладок: Категории, Товары,\r\nЗаказы, Клиенты, Опции, Настройки, Установка и Обновление, Инфо.\r\nПри создании интернет-магазина будет полностью учтена стилистика Вашего сайта.</p>",
						"modal-images": ["@/image/examp16.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Эксклюзивный сайт + интернет-магазин",
						"modal-title": "Эксклюзивный сайт + интернет-магазин",
						"modal-text": "<p>Дизайн эксклюзивного сайта создается с нуля с учетом всех Ваших пожеланий,\r\n                направлений деятельности и предпочтений. Включает в себя разработку оригинальной концепции\r\n                веб-страниц с использованием разнообразных приемов графического дизайна для достижения\r\n                индивидуальности и узнаваемости, а также повышения имиджа Вашей компании.\r\nНа такой сайт с нуля особенно выгодно ставить функциональный и удобный интернет-магазин JoomShopping на базе Joomla! 3.7.\r\nJoomShopping имеет множество возможностей, среди которых такие, как:\r\n            возможность добавления товаров в список предпочтений;\r\n            большое количество дополнительных характеристик;\r\n            удобство в настройке и управлении магазином;\r\n            хорошая руссификация всего компонента и доступность установки нескольких языков;\r\n            возможность создания заголовка и описания сразу на двух языках;\r\n            импорт и экспорт сторонних CSV-файлов;\r\n            добавление специальных стикеров (Новый, Распродажа и др.);\r\n            установка мета-тегов на товары;\r\n            лотам на продажу может быть присвоено несколько изображений, видео- и звуковых файлов;\r\n            возможность установить опцию «Посмотреть, есть ли в наличии»;\r\n            привязка к Paypal и другим платформам;\r\n            особенно чистые исходные коды для быстрой настройки и хорошего поиска и многое другое.\r\n            Благодаря отлично реализованному функционалу, настройка и управление интернет-магазином не вызовет\r\n            значительных трудностей. По сравнению с известным VirtueMart, компонент JoomShopping значительно проще в освоении.\r\n            После установки компонента будут доступны 8 основных вкладок: Категории, Товары, Заказы,\r\n            Клиенты, Опции, Настройки, Установка и Обновление, Инфо.</p>",
						"modal-images": ["@/image/examp17.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Сайт витрина + интернет-магазин",
						"modal-title": "Сайт витрина + интернет-магазин",
						"modal-text": "<p>Сайт Витрина - это веб-сайт, главной целью которого является интернет-реклама.\r\n                Виртуальная витрина представляет собой как online магазин, так и интернет-площадку, позволяющую\r\n                рекламировать и продвигать товары. Главная задача виртуальной витрины заключается в обеспечении\r\n                более информативной и продуктивной связи между продавцом и покупателем посредством трёх важных\r\n                инструментов: создание имиджа Вашей компании, представление товара, подталкивание клиента к действию.\r\nВитрина - самый правильный вариант для установки функционального интернет-магазина JoomShopping на базе Joomla! 3.7.\r\nJoomShopping имеет множество возможностей, среди которых такие, как:\r\n            возможность добавления товаров в список предпочтений;\r\n            большое количество дополнительных характеристик;\r\n            удобство в настройке и управлении магазином;\r\n            хорошая руссификация всего компонента и доступность установки нескольких языков;\r\n            возможность создания заголовка и описания сразу на двух языках;\r\n            импорт и экспорт сторонних CSV-файлов;\r\n            добавление специальных стикеров (Новый, Распродажа и др.);\r\n            установка мета-тегов на товары;\r\n            лотам на продажу может быть присвоено несколько изображений, видео- и звуковых файлов;\r\n            возможность установить опцию «Посмотреть, есть ли в наличии»;\r\n            привязка к Paypal и другим платформам;\r\n            особенно чистые исходные коды для быстрой настройки и хорошего поиска и многое другое.\r\n            Благодаря отлично реализованному функционалу, настройка и управление интернет-магазином не вызовет значительных\r\n            трудностей. По сравнению с известным VirtueMart, компонент JoomShopping значительно проще в освоении.\r\n            После установки компонента будут доступны 8 основных вкладок: Категории, Товары, Заказы, Клиенты, Опции,\r\n            Настройки, Установка и Обновление, Инфо.</p>",
						"modal-images": ["@/image/examp18.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Выборки для магазина",
						"modal-title": "Выборки для магазина",
						"modal-text": "<p>Выборки - это комбинация фильтров для поиска товаров по интернет-магазину.</p>",
						"modal-images": ["@/image/examp19.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Интеграция платежных систем",
						"modal-title": "Интеграция платежных систем",
						"modal-text": "<p>Возможности нтеграции платёжной системы на сайт:\r\nПрием платежей осуществляется независимо от того, в какой стране компания была зарегистрирована Местонахождение клиентов не имеет значения;\r\nМногообразие способов оплаты; Мгновенное подтверждение и зачисление осуществляемого платежа</p>",
						"modal-images": ["@/image/examp20.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "1С Битрикс",
						"modal-title": "1С Битрикс",
						"modal-text": "<p>Битрикс представляет собой интернет-платформу, на базе которой можно получить новый сайт с\r\n                понятным интерфейсом и простой интеграцией с ПО и мобильными приложениями, а также другими сервисами интернета.\r\n                Функционал позволяет поддерживать и развивать уже существующие интернет-ресурсы такие, как:\r\nинтернет-магазины; информационные сайты; частные блоги; корпоративные порталы. Чтобы заказать услугу, заполните форму\r\nобратной связи или звоните по телефону: +7 (902) 687-71-41.</p>",
						"modal-images": ["@/image/examp21.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Эксклюзивная карточка товаров",
						"modal-title": "Эксклюзивная карточка товаров",
						"modal-text": "<p>Шаблон товара - это макет карточки товара в интернет-магазине, отражающий расположение всех\r\n                информационных составляющих о товаре: фотографии, описания, характеристик, цен, количества на складе,\r\n                вариантов расцветок и т. д.</p>",
						"modal-images": ["@/image/examp22.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Экспорт в Yandex Market",
						"modal-title": "Экспорт в Yandex Market",
						"modal-text": "<p>Предлагаем услугу выгрузки товаров из Вашего магазина в Яндекс-Маркет.\r\nЗачем это нужно:\r\nНа Яндекс-маркете гарантированная аудитория. Выборка идёт по всем продавцам. Всё что от Вас требуется это конкурентные цены.\r\nЕсли цена вашего товара рыночная, то вероятность продаж в десятки раз выше, чем на сайте при минимальных затратах.\r\nКак это работает: Для загрузки товаров из магазина в Яндекс Маркет мы создадим специальную программу-парсер. Программа\r\nвыгрузит товары из вашего магазина в файл одним кликом. Далее нужно будет сделать 2-й клик, чтобы загрузить все товары в Яндекс-маркет.\r\nЧтобы заказать услугу, заполните форму обратной связи или звоните по телефону: +7 (902) 687-71-41.</p>",
						"modal-images": ["@/image/examp23.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Панель продаж",
						"modal-title": "Панель продаж",
						"modal-text": "<p>Панель продаж – мощный инструмент, который можно встроить почти в любой\r\n                тип сайта, отлично подходит для компаний с ограниченными финансами или начинающих компаний,\r\n                которые при ограниченном бюджете хотели бы выйти на получение ощутимой прибыли. Недорогую витрину\r\n                с панелью продаж легко можно рекламировать в поисковых системах и привлекать клиентов из разных источников.</p>",
						"modal-images": ["@/image/examp24.jpg"]
					})
				])) : activeTab.value === "addons" ? (openBlock(), createElementBlock("div", _hoisted_14$1, [
					createVNode(ServiceCard_default, {
						text: "Разработка логотипа – от 5 000 руб.",
						"modal-title": "Разработка логотипа – от 5 000 руб.",
						"modal-text": "<p>Логотип – это важная составляющая имиджа компании. Он делает бренд узнаваемым, выделяет его среди конкурентов, повышает доверие\r\n                клиента к компании. Важно, что при создании сайта, если логотип разработан, наши дизайнеры применяют его элементы, цвет и шрифт в дизайне.\r\n                Сайт становится узнаваемым, а компания приобретает своё лицо, продукция или услуги продаются намного лучше т.к. подобный сайт вызывает доверие.\r\n                Доработка имеющегося логотипа: 5000 (перевод в цифровой формат для печати, цвета)\r\n  Разработка нового логотипа при заказе сайта: 8000. Разработка нового логотипа без сайта: 15000\r\nКомпания «Вебразработка» предлагает свои услуги для разработки оригинального, современного лого.</p>",
						"modal-images": ["@/image/examp25.jpg", "@/image/examp26.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Заполнение каталога – 8 000 руб. (25 страниц)",
						"modal-title": "Заполнение каталога – 8 000 руб. (25 страниц)",
						"modal-text": "<p>Если у Вас нет возможности самостоятельно заполнить все страницы Вашего сайта – обратитесь в компанию «Вебразработка».\r\n                Профессиональный контент-менеджер создаст грамотные описания товаров (услуг и пр.) и разместит их на страницах ресурса, что поспособствует\r\n                его развитию.</p>",
						"modal-images": ["@/image/examp27.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Онлайн-консультант – от 8 000 руб.",
						"modal-title": "Онлайн-консультант – от 8 000 руб.",
						"modal-text": "<p>Возможности:\r\nвозможность перезвонить в течении 10 секунд; запись переговоров менеджеров в админ-панели; выведение списка оставивших контакты клиентов по датам;\r\nинструмент – указка.. демонстрация экрана нужной страниц клиенту и подсветка элементов; настройка всплывающего баннера-тизера со спец предложением по времени;\r\nнастройка робота для начала беседы; расположение в разных частях сайта; настройка дизайна под стиль сайта; возможность загрузки фотографии-аватара менеджера;\r\nприложение для смартфона ( андроид и IOS ) с уведомлениями; приложение для ПК с уведомлениями; возможность просматривать кто сейчас на сайте и напрямую писать им.</p>",
						"modal-images": ["@/image/examp28.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Калькуляторы - от 8 000 руб.",
						"modal-title": "Калькуляторы - от 8 000 руб.",
						"modal-text": "<p>Возможности:\r\nПрограммирование сложных конфигураторов, например для кирпичного завода для демонстрации заливки зданий кирпичом, брусчаткой и меж-шовной смесью;\r\nПрограммирование интерактивных карт для коттеджных посёлков с возможностью при наведении показывать данные по участку, а так же продан он или нет;\r\nПрограммирования конфигураторов с калькулятором для демонстрации заливок натяжного потолка; Программирование заказа столиков в кафе;\r\nКалькуляторы для расчёта доставки сыпучих материалов; Калькуляторы для расчёта тепла, батарей необходимых для помещений; Калькуляторы металлопроката;\r\nПеренос калькулятора с одного сайта на другой; Калькулятор-конфигуратор металлочерепицы и домов.</p>",
						"modal-images": ["@/image/examp29.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Конструкторы - от 4 000 руб.",
						"modal-title": "Конструкторы - от 4 000 руб.",
						"modal-text": "<p>Разработка конструкторов, калькуляторов, конфигураторов и калькуляторов совмещённых с конструкторами для сайта\r\nСпециальные предложения и цены на конструкторы и калькуляторы для сайта:\r\nРазработка конструктора для кирпичного завода или завода по производству брусчатки;\r\nЗаливка зданий спроектированных в 3д Макс различными вариантами кирпича и меж шовной смесью, заливка прилегающей территории брусчатки;\r\nРазработка конструкторов для демонстрации различных вариантов при строительстве коттеджей. Фон зима, лето, осень. Блок Хаус, Бревно.\r\nЦвет дверей, отделки, черепицы; Интерактивная карта для коттеджного посёлка. Всплывающие подсказки при наведении. Демонстрация статуса – продан, не продан, размер, цена за сотку, карта посёлка;\r\nКонструктор потолков. Демонстрация глянца, сатина. Расстановка спотов и люстр. Выступы;\r\nКалькулятор потолков. Расчёт стоимости, углов, материала, комнат; Калькулятор металлопроката. Расчёт вместительности. Уголок, квадрат, круг, пруток;\r\nКалькулятор расчёта доставки сыпучих материалов: песок, щебень и т.д. с демонстрацией маршрута на карте;\r\nКалькулятор расчёта отопления для много-комнатных помещений; Калькулятор расчёта остекления и отделки балкона и тому подобное.\r\nИмеются демонстрационные варианты готовых калькуляторов.</p>",
						"modal-images": ["@/image/examp30.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Брошюра – от 8 000 руб.",
						"modal-title": "Брошюра – от 8 000 руб.",
						"modal-text": "<p>Разработка презентаций на основе фирменного стиля или сайта в форме Брошюры формата А3,А4,А5 в том числе в цифровом формате .pdf для рассылки.\r\nразработка презентаций для рассылки в формате .pdf на основе содержания сайта;\r\nстоимость рассчитывается от количества страниц презентации, от того разрабатывается ли презентация с нуля или используется за основу сайт,\r\nот способа презентации: с отрисовкой дизайнером и с обычным форматированием текста;\r\nэкономия времени менеджеров при рассылке коммерческих предложений;\r\nпрезентации моментально окупаются за счёт высокого имиджа и хорошего представления товаров или услуг;\r\nраспечатанные презентации могут быть использованы для раздачи клиентам в точках продаж или встреч;\r\nпрезентации в цифровом формате могут быть использованы для рассылки;\r\nраспечатанные презентации можно раскладывать под стекло автомобиля, в почтовые ящики и в бизнес-центры.</p>",
						"modal-images": ["@/image/examp31.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Функциональная анимация на сайт - от 10 000 руб.",
						"modal-title": "Функциональная анимация на сайт - от 10 000 руб.",
						"modal-text": "<p>Специальное предложение\r\nФункциональная анимация элементов сайта с целью оживления и создания имиджа – элементы оживления: подсветка картинок при наведении\r\n( от черно-белого к цветному или увеличение ); анимация иконок при наведении( приподнимаются, прокручиваются );\r\nсъезжающиеся текстовые блоки при движении сайта сверху внизу; появление пояснений при наведении; эффект паралакс – движущиеся в разных плоскостях объекты в шапке или на фоне.</p>",
						"modal-images": ["@/image/examp31.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Карта коттеджного поселка - индивидуально",
						"modal-title": "Карта коттеджного поселка - индивидуально",
						"modal-text": "<p>Анимационная карта коттеджного поселка – программирование информационных окон и отрисовка посёлка\r\nУточнить стоимость разработки карты коттеджного поселка можно по телефонам на сайте.\r\nПример 1: https://bereg-nn.ru/.\r\nПример 2: http://www.yantarniy-nn.ru/index.php?option=com_content&view=article&id=243&Itemid=285</p>",
						"modal-images": ["@/image/examp32.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Автоматический перевод – 8000 руб.",
						"modal-title": "Автоматический перевод – 8000 руб.",
						"modal-text": "<p>Достоинства: недорогое решение; быстрота изготовления; большое количество языков. Недостатки: картинки не переводятся; перевод машинный, т.е. не всегда точный.</p>",
						"modal-images": ["@/image/examp33.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Ручной перевод сайта – 15000 руб.",
						"modal-title": "Ручной перевод сайта – 15000 руб.",
						"modal-text": "<p>Достоинства: перевод получается точный, литературный, картинки и программы тоже возможно перевести вручную.\r\nНедостатки: очень долго, т.к. делается вручную, особенно тяжело в реализации, если речь идёт о многих языках на одном сайте. Сайт становится тяжёлым.\r\nТехнология: устанавливаем специальное программное обеспечение, которое позволяет создать разделение всех страниц, разделов и программ вручную.\r\n! Внимание - компания Вебразработка не выполняет ручных переводов. Тексты с переводом предоставляет заказчик.</p>",
						"modal-images": ["@/image/examp34.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Разработка этикеток",
						"modal-title": "Разработка этикеток",
						"modal-text": "<p>Первое, на что обращает внимание покупатель при поиске интересующего его товара – этикетка.\r\n                С огромной долей вероятности он не обратит внимание на продукт с обычной, неуникальной наклейкой и в то же время, если\r\n                этикетка будет броской, оригинальной, привлекающей – это заставит клиента присмотреться к товару, обратить на него внимание.\r\n                Кроме того, уникальная, красивая этикетка лучше запоминается, а это увеличивает шанс того, что потребитель во второй раз вернется\r\n                именно за этим товаром. Компания «Вебразработка» предлагает свои услуги для создания этикеток. Наши дизайнеры обладают богатым\r\n                опытом работ и гарантируют высокое качество результата.</p>",
						"modal-images": ["@/image/examp35.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Разработка визиток",
						"modal-title": "Разработка визиток",
						"modal-text": "<p>Практически каждое деловое знакомство или бизнес-встреча с потенциальными партнерами заканчивается обменом\r\n                визитными карточками. Вручив собеседнику свою визитку Вы будете уверены в том, что у него останутся Ваши контакты и в случае\r\n                необходимости он свяжется с Вами. Но при этом визитная карточка не должна быть безликой, лучше отдать предпочтение оригинальному дизайну,\r\n                тогда он сильнее врежется в память Вашим партнерам и подсознательно они будут делать выбор в Вашу пользу. Компания «Вебразработка» предлагает\r\n                свои услуги для разработки визиток. Гарантируем ответственный подход и высокое качество результата.</p>",
						"modal-images": ["@/image/examp36.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Изготовление рекламных щитов",
						"modal-title": "Изготовление рекламных щитов",
						"modal-text": "<p>Рекламный щит – это в первую очередь широкий охват аудитории. При его грамотном размещении, рекламу компании ежедневно\r\n                будут видеть тысячи людей, что делает билборд очень сильным рекламным инструментом. Но для привлечения потенциальных покупателей,\r\n                повышения их интереса к бренду, очень важно не просто грамотно разместить щит, но и составить интересный, привлекательный дизайн.\r\n                Компания «Вебразработка» предлагает свои услуги для изготовления наружной рекламы./p>",
						"modal-images": ["@/image/examp37.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Разработка фирменного стиля",
						"modal-title": "Разработка фирменного стиля",
						"modal-text": "<p>Если человека встречают по одежде, то компанию – по ее фирменному стилю. В абсолютном большинстве случаев потенциальные\r\n                партнеры и клиенты отдадут предпочтение той фирме, где будет досконально продумана айдентика (фирменный стиль). Это вызывает доверие\r\n                даже на подсознательном уровне. Компания «Вебразработка» предлагает свои услуги для разработки фирменного стиля компании.\r\n                Опытные дизайнеры досконально углубятся в тему и разработают айдентику, которая будет идеально отображать характер компании.\r\nРазработка фирменного стиля от «Вебразработка» – это путь к повышению узнаваемости бренда.</p>",
						"modal-images": ["@/image/examp38.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Разработка баннеров и слайдеров на сайт",
						"modal-title": "Разработка баннеров и слайдеров на сайт",
						"modal-text": "<p>Верхняя часть главной страницы – это наиболее важный элемент сайта с точки зрения его дизайна.\r\n                Это первое, что видит на своем мониторе пользователь, еще до того, как он воспользуется колесом прокрутки.\r\n                В первые секунды его взгляд будет цепляться за картинки, слова и фразы, которые он здесь увидит и, если содержимое не будет достаточно\r\n                полезным – пользователь может уйти со страницы. Поэтому важно сделать эту часть сайта одновременно красочной, эффектной и информативной.\r\nКомпания «Вебразработка» предлагает размещение баннеров и слайдеров на сайте. Наши дизайнеры обладают богатым опытом таких работ и помогут\r\nВам привлечь новых клиентов для Вашего бизнеса.</p>",
						"modal-images": ["@/image/examp39.jpg", "@/image/examp40.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Эксклюзивная форма заказа услуг",
						"modal-title": "Эксклюзивная форма заказа услуг",
						"modal-text": "<p>Одной из самых важных функций сайта является общение с посетителями. У потенциальных клиентов и партнеров в любой момент\r\n                могут возникнуть вопросы, касаемо условий сотрудничества с компанией, стоимости товара, времени доставки и т.д. Для облегчения\r\n                такого общения компания «Вебразработка» предлагает заказать услугу - форму обратной связи. А для интернет-магазинов мы также предлагаем форму\r\n                быстрого заказа. Форма обратной связи (быстрый заказ) – это отдельный модуль, который приобретается за дополнительную плату. А после\r\n                покупки он будет требовать настройки и оформления.</p>",
						"modal-images": ["@/image/examp41.jpg"]
					})
				])) : activeTab.value === "advertising" ? (openBlock(), createElementBlock("div", _hoisted_15$1, [
					createVNode(ServiceCard_default, {
						text: "Контекстная реклама в Яндекс Директ",
						"modal-title": "Контекстная реклама в Яндекс Директ",
						"modal-text": "<p>При создании рекламы делаем качественный анализ сайтов на пример улучшения продающих качеств и имиджа сайта.\r\n                При необходимости пишем уникальные продающие тексты, чтобы получить максимальную отдачу от рекламы.\r\nРазработана эксклюзивная методика рекламных кампаний с комплексным подходом, которые позволяют охватить интернет со всех сторон.\r\nЭкономия за счет комплексного подхода от 2 до 10 раз. Мы являемся партнерами Яндекс и составляем рекламные кампании бесплатно, так как\r\nЯндекс платит нам ежемесячные и ежеквартальные проценты за оборот. Ежеминутный контроль по Яндекс Метрике, где видно все возможные переходы.\r\nИмеется опыт работы с крупными производителями. Реклама по городам миллионникам и в радиусе до 400 км от них. Реклама в ближнем зарубежье (Беларусь, Казахстан).\r\nПредлагаем баннерную рекламу на главной странице Яндекса по наименьшей цене, имеющую большую эффективность по сравнению с Яндекс.Директом.\r\nСоставляем объявление таким образом, чтобы в них присутствовали цены, термины, точные наименования и подталкивания к действию.\r\nЭто позволяет снизить цены на рекламу в несколько раз. Работаем с сразными категориями бизнеса как с начинающим, так со средним и крупным.</p>",
						"modal-images": ["@/image/examp14.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Поведенческая реклама в Яндекс Директ",
						"modal-title": "Поведенческая реклама в Яндекс Директ",
						"modal-text": "<p>При создании рекламы делаем качественный анализ сайтов на пример улучшения продающих качеств и имиджа сайта.\r\n                При необходимости пишем уникальные продающие тексты, чтобы получить максимальную отдачу от рекламы.\r\nРазработана эксклюзивная методика рекламных кампаний с комплексным подходом, которые позволяют охватить интернет со всех сторон.\r\nЭкономия за счет комплексного подхода от 2 до 10 раз. Мы являемся партнерами Яндекс и составляем рекламные кампании бесплатно,\r\nтак как Яндекс платит нам ежемесячные и ежеквартальные проценты за оборот. Ежеминутный контроль по Яндекс Метрике, где видно все возможные переходы.\r\nИмеется опыт работы с крупными производителями. Реклама по городам миллионникам и в радиусе до 400 км от них. Реклама в ближнем зарубежье (Беларусь, Казахстан).\r\nПредлагаем баннерную рекламу на главной странице Яндекса по наименьшей цене, имеющую большую эффективность по сравнению с Яндекс.Директом.\r\nСоставляем объявление таким образом, чтобы в них присутствовали цены, термины, точные наименования и подталкивания к действию. Это позволяет снизить цены на рекламу в несколько раз.\r\nРаботаем с сразными категориями бизнеса как с начинающим, так со средним и крупным.</p>",
						"modal-images": ["@/image/examp14.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Реклама в Яндекс Директ по городам",
						"modal-title": "Реклама в Яндекс Директ по городам",
						"modal-text": "<p>При создании рекламы делаем качественный анализ сайтов на пример улучшения продающих качеств и имиджа сайта.\r\n                При необходимости пишем уникальные продающие тексты, чтобы получить максимальную отдачу от рекламы.\r\nРазработана эксклюзивная методика рекламных кампаний с комплексным подходом, которые позволяют охватить интернет со всех сторон.\r\nЭкономия за счет комплексного подхода от 2 до 10 раз.\r\nМы являемся партнерами Яндекс и составляем рекламные кампании бесплатно, так как Яндекс платит нам ежемесячные и ежеквартальные проценты за оборот.\r\nЕжеминутный контроль по Яндекс Метрике, где видно все возможные переходы. Имеется опыт работы с крупными производителями.\r\nРеклама по городам миллионникам и в радиусе до 400 км от них. Реклама в ближнем зарубежье (Беларусь, Казахстан).\r\nПредлагаем баннерную рекламу на главной странице Яндекса по наименьшей цене, имеющую большую эффективность по сравнению с Яндекс.Директом.\r\nСоставляем объявление таким образом, чтобы в них присутствовали цены, термины, точные наименования и подталкивания к действию.\r\nЭто позволяет снизить цены на рекламу в несколько раз. Работаем с сразными категориями бизнеса как с начинающим, так со средним и крупным.</p>",
						"modal-images": ["@/image/examp14.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Реклама в Google AdWords",
						"modal-title": "Реклама в Google AdWords",
						"modal-text": "<p>При создании рекламы делаем качественный анализ сайтов на пример улучшения продающих качеств и имиджа сайта.\r\n                При необходимости пишем уникальные продающие тексты, чтобы получить максимальную отдачу от рекламы.\r\nРазработана эксклюзивная методика рекламных кампаний с комплексным подходом, которые позволяют охватить интернет со всех сторон.\r\nЭкономия за счет комплексного подхода от 2 до 10 раз.\r\nМы являемся партнерами Яндекс и составляем рекламные кампании бесплатно, так как Яндекс платит нам ежемесячные и ежеквартальные проценты за оборот.\r\nЕжеминутный контроль по Яндекс Метрике, где видно все возможные переходы. Имеется опыт работы с крупными производителями.\r\nРеклама по городам миллионникам и в радиусе до 400 км от них. Реклама в ближнем зарубежье (Беларусь, Казахстан).\r\nПредлагаем баннерную рекламу на главной странице Яндекса по наименьшей цене, имеющую большую эффективность по сравнению с Яндекс.Директом.\r\nСоставляем объявление таким образом, чтобы в них присутствовали цены, термины, точные наименования и подталкивания к действию. Это позволяет снизить цены на рекламу в несколько раз.\r\nРаботаем с сразными категориями бизнеса как с начинающим, так со средним и крупным.</p>",
						"modal-images": ["@/image/examp14.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Контекстная + поведенческая реклама в Яндекс Директ",
						"modal-title": "Контекстная + поведенческая реклама в Яндекс Директ",
						"modal-text": "<p>Основная (контекстная) реклама: делается от 50 до 500 объявлений с 1 фразой на 1 объявление.\r\n                Такая кампания даёт дешёвых клиентов при широком охвате интернета.\r\nПоведенческая реклама преследует посетителей на различных сайтах-партнёрах Яндекса: Авито, Мейл и другие крупные площадки.\r\nПоведенческая реклама нужна, чтобы подтолкнуть клиента к действию, т.к. она показывается на различных сайтах, которые он посещает 1-3 дня после того,\r\nкак искал информацию о товаре в Яндексе. Контекстная + поведенческая реклама по городам позволяет выводить тексты объявлений не только в\r\nгороде присутствия фирмы, товаров или услуг, но и за его пределами - вплоть до неограниченного числа городов, однако преимущество\r\nв выборе городов показа нужно отдавать исходя из целей и направленности рекламируемых услуг/товаров.</p>",
						"modal-images": ["@/image/examp14.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Контекстная + поведенческая + по городам реклама в Яндекс Директ",
						"modal-title": "Контекстная + поведенческая + по городам реклама в Яндекс Директ",
						"modal-text": "<p>Основная (контекстная) реклама: делается от 50 до 500 объявлений с 1 фразой на 1 объявление. Такая кампания даёт дешёвых\r\n                клиентов при широком охвате интернета. Поведенческая реклама преследует посетителей на различных сайтах-партнёрах Яндекса: Авито,\r\n                Мейл и другие крупные площадки. Поведенческая реклама нужна, чтобы подтолкнуть клиента к действию, т.к. она показывается на различных сайтах,\r\n                которые он посещает 1-3 дня после того, как искал информацию о товаре в Яндексе. Контекстная + поведенческая реклама по городам позволяет\r\n                выводить тексты объявлений не только в городе присутствия фирмы, товаров или услуг, но и за его пределами - вплоть до неограниченного\r\n                числа городов, однако преимущество в выборе городов показа нужно отдавать исходя из целей и направленности рекламируемых услуг/товаров.</p>",
						"modal-images": ["@/image/examp14.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Контекстная + по городам реклама в Яндекс Директ",
						"modal-title": "Контекстная + по городам реклама в Яндекс Директ",
						"modal-text": "<p>Основная (контекстная) реклама: делается от 50 до 500 объявлений с 1 фразой на 1 объявление.\r\n                Такая кампания даёт дешёвых клиентов при широком охвате интернета. Контекстная реклама по городам позволяет выводить тексты объявлений\r\n                не только в городе присутствия фирмы, товаров или услуг, но и за его пределами - вплоть до неограниченного числа городов,\r\n                однако преимущество в выборе городов показа нужно отдавать исходя из целей и направленности рекламируемых услуг/товаров.</p>",
						"modal-images": ["@/image/examp14.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Контекстная реклама в Яндекс Директ + реклама в Google AdWords",
						"modal-title": "Контекстная реклама в Яндекс Директ + реклама в Google AdWords",
						"modal-text": "<p>Основная (контекстная) реклама: делается от 50 до 500 объявлений с 1 фразой на 1 объявление.\r\n                Такая кампания даёт дешёвых клиентов при широком охвате интернета. Суть работы AdWords та же самая, что и Директа, – показ объявлений\r\n                по заданным целевым ключам. Однако заказывая показ рекламы и в Яндексе, и в Google, можно убить двух зайцев: Яндекс обеспечит\r\n                просмотр объявлений количественно - охватывает 70% всех поисковых запросов, Гугл - качественно, т. к. в нём больше деловых людей с деньгами,\r\n                он открывается автоматически на миникомпьютерах и Аpple.</p>",
						"modal-images": ["@/image/examp14.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Контекстная + поведенческая + по городам реклама в Яндекс Директ + Google AdWords",
						"modal-title": "Контекстная + поведенческая + по городам реклама в Яндекс Директ + Google AdWords",
						"modal-text": "<p>Логотип – это важная составляющая имиджа компании. Он делает бренд узнаваемым, выделяет его среди конкурентов, повышает доверие\r\n                клиента к компании. Важно, что при создании сайта, если логотип разработан, наши дизайнеры применяют его элементы, цвет и шрифт в дизайне.\r\n                Сайт становится узнаваемым, а компания приобретает своё лицо, продукция или услуги продаются намного лучше т.к. подобный сайт вызывает доверие.\r\n                Доработка имеющегося логотипа: 5000 (перевод в цифровой формат для печати, цвета)\r\n  Разработка нового логотипа при заказе сайта: 8000. Разработка нового логотипа без сайта: 15000\r\nКомпания «Вебразработка» предлагает свои услуги для разработки оригинального, современного лого.</p>",
						"modal-images": ["@/image/examp14.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Составление рекламных объявлений",
						"modal-title": "Составление рекламных объявлений",
						"modal-text": "<p>Основная (контекстная) реклама: делается от 50 до 500 объявлений с 1 фразой на 1 объявление.\r\n                Такая кампания даёт дешёвых клиентов при широком охвате интернета. Поведенческая реклама преследует посетителей на различных сайтах-партнёрах\r\n                Яндекса: Авито, Мейл и другие крупные площадки. Поведенческая реклама нужна, чтобы подтолкнуть клиента к действию, т.к. она показывается на\r\n                различных сайтах, которые он посещает 1-3 дня после того, как искал информацию о товаре в Яндексе. Контекстная + поведенческая реклама по\r\n                городам позволяет выводить тексты объявлений не только в городе присутствия фирмы, товаров или услуг, но и за его пределами - вплоть до\r\n                неограниченного числа городов, однако преимущество в выборе городов показа нужно отдавать исходя из целей и направленности рекламируемых\r\n                услуг/товаров. Суть работы AdWords та же самая, что и Директа, – показ объявлений по заданным целевым ключам. Однако заказывая показ рекламы и\r\n                в Яндексе, и в Google, можно убить двух зайцев: Яндекс обеспечит просмотр объявлений количественно - охватывает 70% всех поисковых запросов,\r\n                Гугл - качественно, т. к. в нём больше деловых людей с деньгами, он открывается автоматически на миникомпьютерах и Аpple.</p>",
						"modal-images": ["@/image/examp14.jpg"]
					})
				])) : activeTab.value === "promotion" ? (openBlock(), createElementBlock("div", _hoisted_16$1, [
					createVNode(ServiceCard_default, {
						text: "По ключевым фразам",
						"modal-title": "По ключевым фразам",
						"modal-text": "<p>В этом случае тексты не оплачиваются. Seo-специалист подбирает наиболее важные для Вас фразы\r\n                с указанием цены за каждую фразу, в зависимости от частотности запросов. Вы выбираете фразы для продвижения и платите поквартально</p>",
						"modal-images": ["@/image/examp14.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Качественная годовая раскрутка без гарантии",
						"modal-title": "Качественная годовая раскрутка без гарантии",
						"modal-text": "<p>В результате многие фразы могут оказаться в топе, но гарантия не даётся. От 50 фраз. Подбираются тексты на все ключи.\r\n                Обычно 1 - 2 ключа на текст. Оплата осуществляется в зависимости от количества текстов.</p>",
						"modal-images": ["@/image/examp14.jpg"]
					}),
					createVNode(ServiceCard_default, {
						text: "Написание Seo-статей для раскрутки по ключевым фразам",
						"modal-title": "Написание Seo-статей для раскрутки по ключевым фразам",
						"modal-text": "<p>Проектирование газоснабжения в Нижнем Новгороде. Применение чугунных канализационных труб. Услуги ООО ПКФ «МонолитСтрой».\r\n                </p>",
						"modal-images": ["@/image/examp14.jpg"]
					})
				])) : activeTab.value === "hosting" ? (openBlock(), createElementBlock("div", _hoisted_17$1, [
					createVNode(ServiceCard_default, {
						text: "Хостинг 1 год – 6 000 руб.",
						"modal-title": "Хостинг 1 год – 6 000 руб.",
						"modal-text": "<p>Хостинг включает:\r\nХостинг 10 000 мегабайт под сайт и неограниченные размеры ящиков почты; Фирменная почта для сотрудников типа info@vashsait.ru; База данных SQL последних версий;\r\nПоддержка всех скриптов PHP, java, curl и т.д.; Apache сервер последних версий;\r\nБыстрое открытие страниц сайта: Быстрые сервера – всего по 1 сайту на виртуальный сервер обеспечивает большую скорость открытия страниц. Обслуживание включает:\r\nОбучение заполнению сайта и технические консультации по телефону. Изменения по запросу: координаты, смена лого, реквизитов, адреса, карты, мелких недочётов и ошибок.\r\nЕжедневное копирование сайта и восстановление в случае атак хакеров по первому требованию. Восстановление сбоя микропрограмм и модулей в течении года по первому требованию.\r\nРегулярные обновления системы безопасности и системы сайта для совместимости с новыми скриптами.</p>",
						"modal-images": []
					}),
					createVNode(ServiceCard_default, {
						text: "Турбо-хостинг на 1 год – 10 000 руб.",
						"modal-title": "Турбо-хостинг на 1 год – 10 000 руб.",
						"modal-text": "<p>В этом случае тексты не оплачиваются. Seo-специалист подбирает наиболее важные для Вас фразы\r\n                с указанием цены за каждую фразу, в зависимости от частотности запросов. Вы выбираете фразы для продвижения и платите поквартально</p>",
						"modal-images": []
					}),
					createVNode(ServiceCard_default, {
						text: "Регистрация домена",
						"modal-title": "Регистрация домена",
						"modal-text": "<p>Регистрация домена начинается с подбора запоминающегося, соответствующего деятельности компании свободного доменного имени\r\n                сайта, а затем переходит в этап хостинга - размещения выбранного адреса на серверах. Хостинг также включает в себя обучение заполнению\r\n                сайта и технические консультации по телефону, ежедневное копирование сайта и восстановление в случае атак хакеров по первому требованию,\r\n                изменения по запросу координат, логотипа, реквизитов, адреса, карты, мелких недочётов и ошибок; восстановление сбоя микропрограмм и модулей\r\n                в течение года по первому требованию; 10 Гб места под Ваш сайт; ОЗУ - 500 МБ; неограниченные почтовые ящики и многое другое.\r\n            Домен регистрируется бесплатно при заказе хостинга.</p>",
						"modal-images": []
					}),
					createVNode(ServiceCard_default, {
						text: "Перенаправление домена",
						"modal-title": "Перенаправление домена",
						"modal-text": "<p>Услуга по перенаправлению домена позволяет настроить переадресацию с одного домена на другой, а также на веб-страницу с другим адресом.\r\nУслуга переадресации актуальна только в тех случаях, когда Вы обладаете делегированным доменом. Для этого ему необходимы DNS-серверы (не менее 2-ух),\r\nкоторые предоставляют пользователям информацию о Вашем домене. Помимо 2х DNS серверов нужно еще обладать юридическими правами на управление доменом,\r\nиначе регистратор снимает домен с делегации вне зависимости есть у него 2 DNS сервера или нет.</p>",
						"modal-images": []
					})
				])) : activeTab.value === "copywriting" ? (openBlock(), createElementBlock("div", _hoisted_18$1, [
					createVNode(ServiceCard_default, {
						text: "Написание журнальных статей",
						"modal-title": "Написание журнальных статей с имиджевой информацией и информацией о товаре",
						"modal-text": "<p>Написание журнальных статей с имиджевой информацией и информацией о товаре</p>",
						"modal-images": []
					}),
					createVNode(ServiceCard_default, {
						text: "Заполнение каталога интернет-магазина",
						"modal-title": "Заполнение каталога интернет-магазина",
						"modal-text": "<p>Заполнение каталога интернет-магазина</p>",
						"modal-images": []
					}),
					createVNode(ServiceCard_default, {
						text: "Название с ценой или без",
						"modal-title": "Название с ценой или без",
						"modal-text": "<p>Название с ценой + картинка	-  100 р.<br>\r\nНазвание с ценой + картинка + краткое описание  -	150 р.<br>\r\nНазвание с ценой + картинка + краткое описание +длин.описание	 -  300 р.</p>",
						"modal-images": []
					}),
					createVNode(ServiceCard_default, {
						text: "Уникальные Seo-статьи для раскрутки и главная страница",
						"modal-title": "Уникальные Seo-статьи для раскрутки и главная страница",
						"modal-text": "<p>Уникальная захватывающая внимание клиентов журналистская статья с ключевым\r\nядром для главной страницы сайта (2500 знаков) - 	4 000 р.<br>\r\nОформление журнальной статьи инфографикой	- 11 000 р.<br>\r\nУникальные СЕО-статьи под раскрутку конкретной фразы: 1 стр.  (1000 знаков) -	1 000 р.</p>",
						"modal-images": []
					}),
					createVNode(ServiceCard_default, {
						text: "Заполнение каталога",
						"modal-title": "Заполнение каталога",
						"modal-text": "<p>от 1 стр. до 100 стр. (перенос с сайта на сайт) -	300р.<br>\r\nот 100 стр. до 300 стр. (перенос с сайта на сайт)	- 250р.<br>\r\nот 300 стр. и выше (перенос с сайта на сайт)	- 200р.<br>\r\nпри переходе к нам и переносе каталога с другого сайта на нашу систему	- 150р.<br>\r\nперепечатка текста вручную при переносе из EXCEL или рукописного текста	- 500р.<br>\r\nперенос текста с картинками со сканера	500р.</p>",
						"modal-images": []
					})
				])) : activeTab.value === "programming" ? (openBlock(), createElementBlock("div", _hoisted_19$1, [
					createVNode(ServiceCard_default, {
						text: "Парсинг сайта, интернет-магазина",
						"modal-title": "Парсинг сайта, интернет-магазина",
						"modal-text": "<p>Как это работает: наши программисты пишут специальную программу, которая собирает информацию с указанного сайта и\r\n                раскладывает по ячейкам базы данных. На втором этапе данная информация загружается в соответствующие поля магазина вашего сайта.</p>",
						"modal-images": []
					}),
					createVNode(ServiceCard_default, {
						text: "Подключение Вашего проекта к сервисам через API",
						"modal-title": "Подключение Вашего проекта к сервисам через API",
						"modal-text": "<p>Для многих компаний разработка собственного программного обеспечения для обмена данными с удаленными серверами является\r\n                сложной и дорогостоящей задачей. Использование API – один из лучших способов решения вопроса. С технической точки зрения API представляет\r\n                собой внешний интерфейс программирования, с помощью которого клиенты обращаются к сервисам для получения необходимой информации.\r\nДля пользователя не важна технология решения задачи, пути прохождения запросов и ответов на них. С помощью API можно подключиться\r\nк любому сервису и получить нужные данные максимально оперативно. Наша компания предлагает воспользоваться услугой подключения сайта к выбранному сервису.\r\nСтоимость услуги зависит от сложности интеграции систем и затраченного нашими специалистами времени.</p>",
						"modal-images": []
					}),
					createVNode(ServiceCard_default, {
						text: "Ускорение загрузки Вашего сайта",
						"modal-title": "Ускорение загрузки Вашего сайта",
						"modal-text": "<p>Чтобы сайт высоко ранжировался поисковыми системами, он должен быть быстрым. Чем ниже скорость загрузки, тем сайт менее\r\n                интересен поисковикам. И уход недождавшихся посетителей со страницы оценивается как негативный поведенческий фактор, что тоже сдвигает\r\n                ресурс на нижние позиции поисковой выдачи.</p>",
						"modal-images": []
					}),
					createVNode(ServiceCard_default, {
						text: "Электронные платежные системы для оплаты",
						"modal-title": "Электронные платежные системы для оплаты",
						"modal-text": "<p>Включены все возможные системы оплаты: Apple Pay и Samsung Pay, Mastercard, VISA, МИР, QIWI-кошелек, Альфа-Банк, МТС,\r\n                Евросеть, viber-кошелек, ВТБ, Билайн, Связной, Элекснет-онлайн, Промсвязьбанк, Московский Идустриальный банк, tele-2, webmoney,\r\n                Yandex деньги и другие Приблизительный процент агрегаторов в зависимости от суммы от 1% до 5%</p>",
						"modal-images": []
					}),
					createVNode(ServiceCard_default, {
						text: "Скрипт генерции файла YML для Яндекс-маркета",
						"modal-title": "Скрипт, генерирующий файл YML для Яндекс-маркета",
						"modal-text": "<p>Предлагаем услугу выгрузки товаров из Вашего магазина в Яндекс-Маркет.\r\nЗачем это нужно: На Яндекс-маркете гарантированная аудитория. Выборка идёт по всем продавцам. Всё что от Вас требуется это конкурентные цены.\r\nЕсли цена вашего товара рыночная, то вероятность продаж в десятки раз выше, чем на сайте при минимальных затратах. Как это работает:\r\nДля загрузки товаров из магазина в Яндекс Маркет мы создадим специальную программу-парсер. Программа выгрузит товары из вашего магазина в\r\nфайл одним кликом. Далее нужно будет сделать 2-й клик, чтобы загрузить все товары в Яндекс-маркет.</p>",
						"modal-images": []
					}),
					createVNode(ServiceCard_default, {
						text: "Чистка сайта от вирусов",
						"modal-title": "Чистка сайта от вирусов",
						"modal-text": "<p>Компания «Вебразработка» предлагает услуги по очистке сайта от вирусов. Перед началом «лечения» мы делаем полный backup сайта,\r\n                чтобы исключить вероятность потери данных. Мы удалим вредоносный код и предоставим отчет о проделанной работе. Если вам необходимо почистить\r\n                сайт от вирусов, обращайтесь к нам. Мы быстро устраним все неисправности.</p>",
						"modal-images": []
					}),
					createVNode(ServiceCard_default, {
						text: "Установка Яндекс-метрики / Гугл-аналитики. Настройка целей",
						"modal-title": "Установка Яндекс-метрики / Гугл-аналитики. Настройка целей",
						"modal-text": "<p>Сбор информации о количестве посетителей сайта и их способах взаимодействия с ним важен на каждом этапе анализа бизнеса.\r\n                Для этих целей существуют аналитические системы, среди которых наибольшей популярностью пользуются Яндекс.Метрика и Google Analytics.</p>",
						"modal-images": []
					}),
					createVNode(ServiceCard_default, {
						text: "Разработка удобных ботов для Telegram",
						"modal-title": "Разработка удобных ботов для Telegram",
						"modal-text": "<p>Viber, Telegram, Instagram, ВК<br> Соцсети и мессенджеры давно стали эффективными инструментами для продвижения бизнеса.\r\n                Используя прогрессивные технологии, вы сможете автоматизировать многие процессы и существенно увеличить количество клиентов.\r\n                Чат-боты в Telegram становятся хорошей альтернативой call-центрам, обслуживая потенциальных клиентов с молниеносной скоростью в\r\n                любое время суток.</p>",
						"modal-images": []
					}),
					createVNode(ServiceCard_default, {
						text: "Поиск на сайте",
						"modal-title": "Поиск на сайте",
						"modal-text": "<p>Специальные предложения:\r\nУстановка расширенного фильтра для моментального поиска по любому количеству товаров.\r\nФильтр поиска по товарам устанавливается при наличии интернет-магазина. Так же если на вашем сайте нет интернет-магазина.\r\nНаша компания может интегрировать магазин на ваш сайт и затем установить фильтр товаров.<br>\r\nПоиск по сайту по параметрам встраивается в дизайн сайта.<br>\r\nПоиск может быть как горизонтальным, так и вертикальным.<br>\r\nФильтр по товарам может иметь любое количество полей: варианты полей – чек-бокс, радио-баттон, полоса выбора<br>\r\nВ каждом разделе продукции будет появляться фильтр с параметрами соответствующий данной категории<br>\r\nОкупаемость фильтра товаров моментальная т.к. посетители не будут выбирать товар из десятка страниц листая и открывая каждую позицию.<br>\r\nВнешне фильтр не отличается от фильтра на Яндекс Маркете<br>\r\nОсобенно удобно, что при выборе одного из параметров сразу показывается количество<br>\r\nВозможные параметры: длина, ширина, цвет, цена от до, производитель, диагональ, размер, страна, пол, и т.д. ограничением может быть только Ваша фантазия</p>",
						"modal-images": []
					}),
					createVNode(ServiceCard_default, {
						text: "Работа с VK api",
						"modal-title": "Работа с VK api",
						"modal-text": "<p>Работа в интерфейсе VK API – тяжёлый труд, требующей необходимых знаний и хотя бы минимального опыта общения с аналогичными\r\n                средами разработки. Быстро овладеть навыками в этой сфере, а также самостоятельно написать работающий полезный скрипт,\r\n                для рядового пользователя этой социальной сети задача непосильная. Также осложнить задачу может документация по VK API, в которой\r\n                достаточно тяжело ориентироваться неопытному программисту. Особенно, если до этого он не имел опыта в написании скриптов на любом\r\n                другом языке, не говоря уже об оптимизации самого кода.</p>",
						"modal-images": []
					}),
					createVNode(ServiceCard_default, {
						text: "Установка капчи для защиты от спама",
						"modal-title": "Установка капчи для защиты от спама",
						"modal-text": "<p>Распространение массового спама через веб-формы при помощи различных ботов – распространенный способ. С неприятной\r\n                ситуацией сталкиваются все сайты, но от спамеров можно защититься. Простой, но эффективный способ защиты от ботов – использование капчи\r\n                (CAPTHA). Обычные пользователи легко проходят через проверку, а роботы не могут ее преодолеть. Суть использования капчи простая.\r\n                Посетителю сайта предлагает при заполнении web-формы выполнить легкое действие, которое не способен сделать бот: ввести буквы,\r\n                изображенные на картинке, выбрать несколько изображений, объединенных конкретным признаком и т. д.</p>",
						"modal-images": []
					}),
					createVNode(ServiceCard_default, {
						text: "CRM – система",
						"modal-title": "CRM – система",
						"modal-text": "<p>На выходе Вы получаете уникальный, разработанный исключительно под специфику Вашей работы, имеющий только требуемый функционал\r\n                веб-инструмент для управления бизнесом.</p>",
						"modal-images": []
					}),
					createVNode(ServiceCard_default, {
						text: "Отправка SMS-сообщений с сайта",
						"modal-title": "Отправка SMS-сообщений с сайта",
						"modal-text": "<p>Например, при покупке товара или услуги.</p>",
						"modal-images": []
					})
				])) : createCommentVNode("", true)])]),
				_cache[2] || (_cache[2] = createBaseVNode("div", { class: "big-title" }, [createBaseVNode("h1", null, "УЗНАТЬ ПОДРОБНЕЕ")], -1)),
				createBaseVNode("div", _hoisted_20$1, [createVNode(Info_default, {
					title: "РАЗРАБОТКА САЙТОВ",
					items: promotionItems1,
					"button-text": "Подробнее",
					link: "/theory"
				}), createVNode(Info_default, {
					title: "ПРОДВИЖЕНИЕ САЙТОВ",
					items: promotionItems2,
					"button-text": "Подробнее",
					link: "/theory2"
				})])
			])]);
		};
	}
}, [["__scopeId", "data-v-b0621ef7"]]);
//#endregion
//#region src/views/AboutPage.vue
var _hoisted_1$26 = { class: "about-page" };
var _hoisted_2$24 = { class: "page-content" };
var _hoisted_3$22 = { class: "hello" };
var _hoisted_4$18 = { class: "numbers" };
var AboutPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "AboutPage",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$26, [createBaseVNode("div", _hoisted_2$24, [
				_cache[1] || (_cache[1] = createBaseVNode("div", { class: "big-title" }, [createBaseVNode("h1", null, "О КОМПАНИИ")], -1)),
				createBaseVNode("div", _hoisted_3$22, [_cache[0] || (_cache[0] = createBaseVNode("p", null, [
					createTextVNode("Мы уже 17 лет на рынке, все наши дизайнеры и программисты обладают огромным опытом и внушительным портфолио."),
					createBaseVNode("br"),
					createBaseVNode("br"),
					createTextVNode(" ООО «Вебразработка» работает на рынке интернет-маркетинга с 2008 года. За это время мы прошли путь от небольших сайтов-визиток до сложных интернет-магазинов и полноценных маркетинговых стратегий. Нами движет не просто желание сделать сайт, а искреннее желание помочь бизнесу расти. Мы до сих пор помним первого клиента и до сих пор поддерживаем с ним связь — это и есть наша главная ценность: надёжность, человечность и результат, который видно.")
				], -1)), createBaseVNode("div", _hoisted_4$18, [
					createVNode(StatsBlock_default, {
						top: "17",
						middle: "ЛЕТ",
						bottom: "НА РЫНКЕ"
					}),
					createVNode(StatsBlock_default, {
						top: "1000",
						middle: "САЙТОВ",
						bottom: "НА ПОДДЕРЖКЕ"
					}),
					createVNode(StatsBlock_default, {
						top: "2000+",
						middle: "КОМПАНИЙ",
						bottom: "РЕКЛАМЫ"
					}),
					createVNode(StatsBlock_default, {
						top: "2500",
						middle: "САЙТОВ",
						bottom: "СОЗДАНО"
					})
				])]),
				_cache[2] || (_cache[2] = createStaticVNode("<div class=\"we\" data-v-df3a2cf3><div class=\"we-img\" data-v-df3a2cf3><img src=\"/my-vue-app/assets/we.B0IwJFnW.png\" data-v-df3a2cf3></div><div class=\"we-content\" data-v-df3a2cf3><div class=\"we-text\" data-v-df3a2cf3><p data-v-df3a2cf3>Делаем старые сайты эксклюзивными: добавляем фантазию, аккуратные анимации и хорошее настроение</p></div><div class=\"we-text\" data-v-df3a2cf3><p data-v-df3a2cf3>Воспроизводим сайт на удобной системе: редактор как в MS Word, массовая загрузка картинок, продуманная система раскрутки</p></div><div class=\"we-text\" data-v-df3a2cf3><p data-v-df3a2cf3>Неограниченные возможности для расширения функционала (и для клиентов, и для администратора)</p></div><div class=\"we-text\" data-v-df3a2cf3><p data-v-df3a2cf3>Разрабатываем на Bitrix, Joomla и WordPress</p></div><div class=\"we-text\" data-v-df3a2cf3><p data-v-df3a2cf3>Не работаем по шаблонам (только если клиент сам этого хочет)</p></div><div class=\"we-text\" data-v-df3a2cf3><p data-v-df3a2cf3>Витрина повышает прибыль с сайта в 5–10 раз</p></div><div class=\"we-text\" data-v-df3a2cf3><p data-v-df3a2cf3>Каждый сайт создаётся с учётом фирменного стиля и требований заказчика</p></div><div class=\"we-text\" data-v-df3a2cf3><p data-v-df3a2cf3>Проанализировали самые продающие сайты Москвы и Санкт-Петербурга и создали уникальную витрину</p></div><div class=\"we-text\" data-v-df3a2cf3><p data-v-df3a2cf3>Три цели витрины: повышение имиджа компании, представление товара, подталкивание к действию</p></div><div class=\"we-text\" data-v-df3a2cf3><p data-v-df3a2cf3>Все сайты имеют удобную структуру и направлены на активные продажи</p></div><div class=\"we-text\" data-v-df3a2cf3><p data-v-df3a2cf3>Комплексный подход: от создания до поддержки и рекламы в Яндекс, VK, Avito</p></div><div class=\"we-text\" data-v-df3a2cf3><p data-v-df3a2cf3>Дополнительная выгода от нашего хостинга: домен + сервер + обслуживание в одном пакете</p></div></div></div><div class=\"second-title\" data-v-df3a2cf3><h1 data-v-df3a2cf3>ОСЛУЖИВАНИЕ</h1><p class=\"text-title\" data-v-df3a2cf3>в течение года входит:</p></div><div class=\"settings\" data-v-df3a2cf3><img src=\"/my-vue-app/assets/prof.kvA3dQTo.png\" class=\"settings-img\" data-v-df3a2cf3><div class=\"settings-block\" data-v-df3a2cf3><div class=\"set\" data-v-df3a2cf3><p data-v-df3a2cf3>Регулярные обновления системы безопасности и системы сайта для совместимости с новыми скриптами</p></div><div class=\"set\" data-v-df3a2cf3><p data-v-df3a2cf3>Изменения по запросу: координаты, смена лого, реквизитов, адреса, карты, мелких недочётов и ошибок</p></div></div><div class=\"settings-block\" data-v-df3a2cf3><div class=\"set\" data-v-df3a2cf3><p data-v-df3a2cf3>Восстановление сбоя микропрограмм и модулей в течение года по первому требованию</p></div><svg class=\"settings-block__icon\" width=\"185\" height=\"185\" viewBox=\"0 0 185 185\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" data-v-df3a2cf3><path d=\"M173.952 71.6475H167.967C165.943 71.5033 164.002 70.7859 162.372 69.5792C160.741 68.3725 159.488 66.7263 158.758 64.8333V64.465C157.884 62.5528 157.61 60.4207 157.972 58.3495C158.333 56.2784 159.314 54.3653 160.784 52.8625L165.02 48.6266C166.921 46.6824 167.985 44.0712 167.985 41.3521C167.985 38.6329 166.921 36.0217 165.02 34.0775L150.01 19.7125C148.066 17.8114 145.455 16.747 142.736 16.747C140.017 16.747 137.405 17.8114 135.461 19.7125L131.225 23.9483C129.73 25.3997 127.834 26.3687 125.781 26.7299C123.729 27.0911 121.616 26.8278 119.715 25.9741C117.822 25.2448 116.176 23.9914 114.969 22.3607C113.762 20.73 113.045 18.7893 112.901 16.7658V10.2279C112.902 8.85405 112.626 7.49413 112.089 6.2294C111.553 4.96466 110.767 3.82107 109.778 2.86697C108.79 1.91286 107.619 1.16782 106.336 0.676364C105.053 0.18491 103.684 -0.0428688 102.311 0.00663924H81.8687C79.1579 0.00663924 76.5581 1.08352 74.6412 3.00037C72.7243 4.91723 71.6475 7.51704 71.6475 10.2279V16.2133C71.5033 18.2368 70.7859 20.1775 69.5792 21.8082C68.3725 23.4389 66.7263 24.6923 64.8333 25.4216H64.465C62.617 26.3469 60.5353 26.7009 58.4853 26.4385C56.4353 26.1761 54.5099 25.3092 52.9546 23.9483L48.7187 19.7125C46.7745 17.8114 44.1633 16.747 41.4441 16.747C38.725 16.747 36.1138 17.8114 34.1696 19.7125L19.7125 34.1696C17.8114 36.1138 16.747 38.725 16.747 41.4441C16.747 44.1633 17.8114 46.7745 19.7125 48.7187L23.9483 52.9546C25.3997 54.4497 26.3687 56.3463 26.7299 58.3985C27.0911 60.4507 26.8278 62.5641 25.9741 64.465C25.2448 66.358 23.9914 68.0041 22.3607 69.2109C20.73 70.4176 18.7893 71.135 16.7658 71.2791H10.2279C8.85405 71.2783 7.49413 71.5543 6.2294 72.0909C4.96466 72.6274 3.82107 73.4134 2.86697 74.4019C1.91286 75.3904 1.16782 76.5611 0.676364 77.844C0.18491 79.1269 -0.0428688 80.4958 0.00663924 81.8687V102.311C0.00663924 105.022 1.08352 107.622 3.00037 109.539C4.91723 111.456 7.51704 112.532 10.2279 112.532H16.2133C18.2368 112.677 20.1775 113.394 21.8082 114.601C23.4389 115.807 24.6923 117.454 25.4216 119.347C26.2957 121.259 26.57 123.391 26.2083 125.462C25.8467 127.533 24.8661 129.446 23.3958 130.949L19.16 135.185C17.2589 137.129 16.1945 139.74 16.1945 142.46C16.1945 145.179 17.2589 147.79 19.16 149.734L33.6171 164.191C35.5613 166.092 38.1725 167.157 40.8916 167.157C43.6108 167.157 46.222 166.092 48.1662 164.191L52.4021 159.955C53.9734 158.432 55.9849 157.444 58.1505 157.129C60.3162 156.815 62.5257 157.192 64.465 158.206C66.358 158.935 68.0041 160.189 69.2109 161.819C70.4176 163.45 71.135 165.391 71.2791 167.414V173.4C71.2013 174.819 71.4205 176.239 71.9226 177.569C72.4248 178.9 73.1989 180.11 74.1955 181.124C75.1921 182.138 76.3893 182.933 77.7105 183.458C79.0318 183.983 80.448 184.227 81.8687 184.173H102.311C105.022 184.173 107.622 183.096 109.539 181.18C111.456 179.263 112.532 176.663 112.532 173.952V167.967C112.677 165.943 113.394 164.002 114.601 162.372C115.807 160.741 117.454 159.488 119.347 158.758C121.259 157.884 123.391 157.61 125.462 157.972C127.533 158.333 129.446 159.314 130.949 160.784L135.185 165.02C137.129 166.921 139.74 167.985 142.46 167.985C145.179 167.985 147.79 166.921 149.734 165.02L164.191 150.563C166.092 148.619 167.157 146.007 167.157 143.288C167.157 140.569 166.092 137.958 164.191 136.014L159.955 131.778C158.432 130.207 157.444 128.195 157.129 126.029C156.815 123.864 157.192 121.654 158.206 119.715C158.935 117.822 160.189 116.176 161.819 114.969C163.45 113.762 165.391 113.045 167.414 112.901H173.4C174.819 112.979 176.239 112.76 177.569 112.257C178.9 111.755 180.11 110.981 181.124 109.984C182.138 108.988 182.933 107.791 183.458 106.469C183.983 105.148 184.227 103.732 184.173 102.311V81.8687C184.173 79.1579 183.096 76.5581 181.18 74.6412C179.263 72.7243 176.663 71.6475 173.952 71.6475ZM92.09 128.923C84.805 128.923 77.6837 126.763 71.6265 122.716C65.5693 118.668 60.8482 112.916 58.0604 106.185C55.2726 99.4551 54.5432 92.0491 55.9644 84.9042C57.3856 77.7592 60.8936 71.1961 66.0449 66.0449C71.1961 60.8936 77.7592 57.3856 84.9042 55.9644C92.0491 54.5432 99.4551 55.2726 106.185 58.0604C112.916 60.8482 118.668 65.5693 122.716 71.6265C126.763 77.6837 128.923 84.805 128.923 92.09C128.923 101.859 125.043 111.227 118.135 118.135C111.227 125.043 101.859 128.923 92.09 128.923Z\" fill=\"url(#paint0_linear_2057_285)\" data-v-df3a2cf3></path><defs data-v-df3a2cf3><linearGradient id=\"paint0_linear_2057_285\" x1=\"144.09\" y1=\"17.59\" x2=\"136.59\" y2=\"166.09\" gradientUnits=\"userSpaceOnUse\" data-v-df3a2cf3><stop stop-color=\"#C6272B\" data-v-df3a2cf3></stop><stop offset=\"0.514484\" stop-color=\"#701618\" data-v-df3a2cf3></stop><stop offset=\"1\" stop-color=\"#380507\" data-v-df3a2cf3></stop></linearGradient></defs></svg><div class=\"set\" data-v-df3a2cf3><p data-v-df3a2cf3>Обучение заполнению сайта и технические консультации по телефону</p></div></div><div class=\"settings-block\" data-v-df3a2cf3><div class=\"set\" data-v-df3a2cf3><p data-v-df3a2cf3>Ежедневное копирование сайта и по первому требованию</p></div><div class=\"set\" data-v-df3a2cf3><p data-v-df3a2cf3>Лечение сайта в случае заражения и по первому требованию</p></div></div></div>", 3))
			])]);
		};
	}
}, [["__scopeId", "data-v-df3a2cf3"]]);
//#endregion
//#region src/components/Case.vue
var _hoisted_1$25 = { class: "case" };
var _hoisted_2$23 = { class: "case__title" };
var _hoisted_3$21 = { class: "case__text" };
var _hoisted_4$17 = { class: "case__block" };
var _hoisted_5$14 = { class: "case__image-wrapper" };
var _hoisted_6$14 = ["src"];
var _hoisted_7$11 = ["href"];
var Case_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "Case",
	props: {
		title: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		},
		image: {
			type: String,
			required: true
		},
		link: {
			type: String,
			required: true,
			default: "#"
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$25, [
				createBaseVNode("h2", _hoisted_2$23, toDisplayString(__props.title), 1),
				createBaseVNode("p", _hoisted_3$21, toDisplayString(__props.text), 1),
				createBaseVNode("div", _hoisted_4$17, [createBaseVNode("div", _hoisted_5$14, [createBaseVNode("img", {
					src: __props.image,
					alt: "Проект",
					class: "case__image"
				}, null, 8, _hoisted_6$14)]), createBaseVNode("a", {
					href: __props.link,
					target: "_blank",
					class: "case__button"
				}, "Смотреть", 8, _hoisted_7$11)])
			]);
		};
	}
}, [["__scopeId", "data-v-5918aaee"]]);
//#endregion
//#region src/views/CasesPage.vue
var _hoisted_1$24 = { class: "cases-page" };
var _hoisted_2$22 = { class: "page-content" };
var _hoisted_3$20 = { class: "cases-title" };
var _hoisted_4$16 = { class: "cases" };
var CasesPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "CasesPage",
	setup(__props) {
		return (_ctx, _cache) => {
			const _component_router_link = resolveComponent("router-link");
			return openBlock(), createElementBlock("div", _hoisted_1$24, [createBaseVNode("div", _hoisted_2$22, [
				createBaseVNode("div", _hoisted_3$20, [createVNode(_component_router_link, { to: "/" }, {
					default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("svg", {
						width: "35",
						height: "58",
						viewBox: "0 0 35 58",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg"
					}, [createBaseVNode("path", {
						d: "M30.999 54.5L4.99902 28.3108L30.999 3.5",
						stroke: "white",
						"stroke-width": "7",
						"stroke-linecap": "round"
					})], -1)])]),
					_: 1
				}), _cache[1] || (_cache[1] = createBaseVNode("div", { class: "title" }, [createBaseVNode("h1", null, "КЕЙСЫ")], -1))]),
				_cache[2] || (_cache[2] = createBaseVNode("p", null, "Сделали уже много. Сделаем и для вас. Добро пожаловать в портфолио!", -1)),
				createBaseVNode("div", _hoisted_4$16, [
					createVNode(Case_default, {
						title: "ЦНТР ПСИХОЛОГИИ «РАВНОВЕСИЕ»",
						text: "Создали сайт центра психологии и кинезиологи “Равновесие” и взяли его на Seo продвижение.\r\nЗа несколько месяцев с сайта клиенту пришли десятки заявок на оказание услуг и прохождение онлайн-курсов.",
						image: "@/image/case1.png",
						link: "https://ravnovesie-nn.ru/"
					}),
					createVNode(Case_default, {
						title: "МЕДИЦИНСКАЯ КЛИНИКА «ЗОЛОТОЕ СЕЧЕНИЕ»",
						text: "Сайт медицинской клиники с обширным спектром услуг.\r\n            Заказчик также обратился\r\n            за Seo продвижением. После первых двух месяцев работы число ежедневных посетителей превысило 100 человек.",
						image: "@/image/case2.png",
						link: "https://zs.clinic/"
					}),
					createVNode(Case_default, {
						title: "СЕТЬ МАГАЗИНОВ «PROКРЕПЁЖ»",
						text: "Мультибрендовая сеть магазинов крепежа и инструментов обратилась\r\n            за услугой Seo-продвижения. После второго квартала работ посещаемость выросла более чем на 100%.",
						image: "@/image/case3.png",
						link: "https://prokrep.ru/?utm_referrer=https%3A//webrazrabotka.ru/"
					}),
					createVNode(Case_default, {
						title: "БАНИ И СПА «ПОБЕРЕЖЬЕ»",
						text: "Стильный и уникальный сайт, ставший визитной карточкой организации.\r\n            Базовая Seo-оптимизация помогла получить высокие позиции в Яндексе и Google.",
						image: "@/image/case4.png",
						link: "https://bereg-nn.ru/"
					}),
					createVNode(Case_default, {
						title: "СКЛАДСКАЯ ТЕХНИКА «АВТОКАРМАРКЕТ»",
						text: "За счёт глубокой технической оптимизации и ускорения нагрузки сайта мы значительно\r\n            улучшили поведенческие факторы. Это дало мощный импульс для роста ранжирования по сотне\r\n            коммерческих запросов. В итоге, конверсия в заявки с органического трафика увеличилась в 2 раза.",
						image: "@/image/case5.png",
						link: "https://akm-52.ru/"
					}),
					createVNode(Case_default, {
						title: "ПРОИЗВОДСТВО УФ-ПОЛИМЕРОВ «СПЕКТР»",
						text: "Сайт пришёл на Seo-продвижение по регионам. Склеенные поддомены удалось\r\n            расклеить и направить в индексации по своим регионам. Результат - стабильные рост\r\n            видимости и +80% к лидам с поиска за квартал.",
						image: "@/image/case6.png",
						link: "https://nipg.ru//"
					}),
					createVNode(Case_default, {
						title: "СТРОИТЕЛЬСТВО «ДОМА БАНИ 52»",
						text: "Сайт по строительству каркасных домов и бань создан под ключ.\r\n            Seo-работы позволили добиться результата в десятки заявок на строительство ежемесячно.\r\n            Сайт уверенно держится в топе по ключевым фразам.",
						image: "@/image/case7.png",
						link: "https://domabani52.ru/"
					}),
					createVNode(Case_default, {
						title: "КОМПАНИЯ «ЭЙРГАЗ»",
						text: "Комплексная работа по внутренней оптимизации, включающая улучшение UX и пути клика,\r\n            значительно повысила вовлеченность пользователей. Рост поведенческих факторов положительно\r\n            оценился поисковыми системами. В результате, видимость сайта по всему ядру выросла с 30% до 85%.",
						image: "@/image/case8.png",
						link: "https://airgaz-nn.ru/"
					}),
					createVNode(Case_default, {
						title: "КЛИНИНГ «ГИР НН»",
						text: "Сайт клининговой компании создавался с учётом всех просьб клиента.\r\n            Качественно проработанная семантика и грамотные технические настройки дали свой результат -\r\n            десятки заявок с сайта ежедневно.",
						image: "@/image/case9.png",
						link: "https://girnn.ru/"
					}),
					createVNode(Case_default, {
						title: "ПРОИЗВОДСТВО ОБОРУДОВАНИЯ «ИРБИС»",
						text: "Проблема дублей и плохой индексации тысяч товарных карточек была решена за счёт грамотной технической настройки.\r\n            После внедрения уникальных описаний и структурированных данных трафик по коммерческим запросам вырос в 3 раза.",
						image: "@/image/case10.png",
						link: "https://irbismetall.ru/"
					})
				])
			])]);
		};
	}
}, [["__scopeId", "data-v-3eb115e9"]]);
//#endregion
//#region src/components/SalesBlock.vue
var _hoisted_1$23 = { class: "sales-block" };
var _hoisted_2$21 = { class: "sales-block__line1" };
var _hoisted_3$19 = { class: "sales-block__line2" };
var SalesBlock_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "SalesBlock",
	props: {
		line1: {
			type: String,
			required: true,
			default: "УВЕЛИЧИМ"
		},
		line2: {
			type: String,
			required: true,
			default: "ПРОДАЖИ С САЙТА"
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$23, [createBaseVNode("p", _hoisted_2$21, toDisplayString(__props.line1), 1), createBaseVNode("p", _hoisted_3$19, toDisplayString(__props.line2), 1)]);
		};
	}
}, [["__scopeId", "data-v-573ce31b"]]);
//#endregion
//#region src/components/GradientBlock.vue
var _hoisted_1$22 = { class: "gradient-block" };
var _hoisted_2$20 = { class: "gradient-block__text" };
var GradientBlock_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "GradientBlock",
	props: { text: {
		type: String,
		required: true,
		default: "ЗВОНКИ И ЗАЯВКИ ОТ КЛИЕНТОВ"
	} },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$22, [createBaseVNode("p", _hoisted_2$20, toDisplayString(__props.text), 1)]);
		};
	}
}, [["__scopeId", "data-v-2eeb3d56"]]);
//#endregion
//#region src/components/Plus.vue
var _hoisted_1$21 = { class: "plus__sign" };
var _hoisted_2$19 = { class: "plus__text" };
var Plus_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "Plus",
	props: {
		text: {
			type: String,
			required: true,
			default: ""
		},
		symbol: {
			type: String,
			required: true,
			default: ""
		},
		width: {
			type: String,
			default: "490px"
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: "plus",
				style: normalizeStyle({ width: __props.width })
			}, [createBaseVNode("span", _hoisted_1$21, toDisplayString(__props.symbol), 1), createBaseVNode("span", _hoisted_2$19, toDisplayString(__props.text), 1)], 4);
		};
	}
}, [["__scopeId", "data-v-a100ce62"]]);
//#endregion
//#region src/components/Stage.vue
var _hoisted_1$20 = { class: "stage" };
var _hoisted_2$18 = { class: "stage__left" };
var _hoisted_3$18 = { class: "stage__number" };
var _hoisted_4$15 = { class: "stage__right" };
var _hoisted_5$13 = { class: "stage__title" };
var _hoisted_6$13 = { class: "stage__list" };
var _hoisted_7$10 = { class: "stage__item-text" };
var Stage_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "Stage",
	props: {
		number: {
			type: [String, Number],
			required: true
		},
		title: {
			type: String,
			required: true
		},
		items: {
			type: Array,
			required: true,
			default: () => []
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$20, [createBaseVNode("div", _hoisted_2$18, [createBaseVNode("span", _hoisted_3$18, toDisplayString(__props.number), 1)]), createBaseVNode("div", _hoisted_4$15, [createBaseVNode("h3", _hoisted_5$13, toDisplayString(__props.title), 1), createBaseVNode("ul", _hoisted_6$13, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (item) => {
				return openBlock(), createElementBlock("li", {
					key: item,
					class: "stage__item"
				}, [_cache[0] || (_cache[0] = createBaseVNode("span", { class: "stage__bullet" }, null, -1)), createBaseVNode("span", _hoisted_7$10, toDisplayString(item), 1)]);
			}), 128))])])]);
		};
	}
}, [["__scopeId", "data-v-82dc911e"]]);
//#endregion
//#region src/components/Round.vue
var _hoisted_1$19 = { class: "round" };
var _hoisted_2$17 = { class: "round__image-wrapper" };
var _hoisted_3$17 = ["src"];
var _hoisted_4$14 = { class: "round__text-wrapper" };
var _hoisted_5$12 = { class: "round__list" };
var _hoisted_6$12 = { class: "round__item-text" };
var Round_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "Round",
	props: {
		image: {
			type: String,
			required: true
		},
		items: {
			type: Array,
			required: true,
			default: () => []
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$19, [createBaseVNode("div", _hoisted_2$17, [createBaseVNode("img", {
				src: __props.image,
				alt: "Иконка",
				class: "round__image"
			}, null, 8, _hoisted_3$17)]), createBaseVNode("div", _hoisted_4$14, [createBaseVNode("ul", _hoisted_5$12, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (item) => {
				return openBlock(), createElementBlock("li", {
					key: item,
					class: "round__item"
				}, [_cache[0] || (_cache[0] = createBaseVNode("span", { class: "round__bullet" }, null, -1)), createBaseVNode("span", _hoisted_6$12, toDisplayString(item), 1)]);
			}), 128))])])]);
		};
	}
}, [["__scopeId", "data-v-fd450047"]]);
//#endregion
//#region src/components/Ads.vue
var _hoisted_1$18 = { class: "ads" };
var _hoisted_2$16 = { class: "ads__left" };
var _hoisted_3$16 = { class: "ads__count" };
var _hoisted_4$13 = { class: "ads__count-number" };
var _hoisted_5$11 = { class: "ads__right" };
var _hoisted_6$11 = { class: "ads__price" };
var Ads_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "Ads",
	props: {
		count: {
			type: [String, Number],
			required: true
		},
		price: {
			type: [String, Number],
			required: true
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$18, [createBaseVNode("div", _hoisted_2$16, [_cache[1] || (_cache[1] = createBaseVNode("h3", { class: "ads__title" }, "КОЛ-ВО ОБЪЯВЛЕНИЙ", -1)), createBaseVNode("div", _hoisted_3$16, [_cache[0] || (_cache[0] = createBaseVNode("span", { class: "ads__count-label" }, "ДО", -1)), createBaseVNode("span", _hoisted_4$13, toDisplayString(__props.count), 1)])]), createBaseVNode("div", _hoisted_5$11, [createBaseVNode("span", _hoisted_6$11, [createTextVNode(toDisplayString(__props.price), 1), _cache[2] || (_cache[2] = createBaseVNode("span", { class: "ads__currency" }, "₽", -1))])])]);
		};
	}
}, [["__scopeId", "data-v-e6bd15f2"]]);
//#endregion
//#region src/views/MarketingPage.vue
var _hoisted_1$17 = { class: "marketing-page" };
var _hoisted_2$15 = { class: "page-content" };
var _hoisted_3$15 = { class: "marketing-title" };
var _hoisted_4$12 = { class: "hello" };
var _hoisted_5$10 = { class: "slogans" };
var _hoisted_6$10 = { class: "pluses" };
var _hoisted_7$9 = { class: "pluses-block" };
var _hoisted_8$7 = { class: "plus-mini" };
var _hoisted_9$6 = { class: "stages" };
var _hoisted_10$4 = { class: "rounds" };
var _hoisted_11$2 = { class: "info" };
var _hoisted_12$1 = { class: "price" };
var _hoisted_13$1 = { class: "price-block" };
var MarketingPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "MarketingPage",
	setup(__props) {
		const isFormOpen = /* @__PURE__ */ ref(false);
		const openForm = () => {
			isFormOpen.value = true;
		};
		const closeForm = () => {
			isFormOpen.value = false;
		};
		return (_ctx, _cache) => {
			const _component_router_link = resolveComponent("router-link");
			return openBlock(), createElementBlock("div", _hoisted_1$17, [createBaseVNode("div", _hoisted_2$15, [
				createBaseVNode("div", _hoisted_3$15, [createVNode(_component_router_link, { to: "/" }, {
					default: withCtx(() => [..._cache[1] || (_cache[1] = [createBaseVNode("svg", {
						width: "35",
						height: "58",
						viewBox: "0 0 35 58",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg"
					}, [createBaseVNode("path", {
						d: "M30.999 54.5L4.99902 28.3108L30.999 3.5",
						stroke: "white",
						"stroke-width": "7",
						"stroke-linecap": "round"
					})], -1)])]),
					_: 1
				}), _cache[2] || (_cache[2] = createBaseVNode("div", { class: "title" }, [createBaseVNode("h1", null, "РЕКЛАМА")], -1))]),
				createBaseVNode("div", _hoisted_4$12, [_cache[3] || (_cache[3] = createBaseVNode("div", { class: "hello-content" }, [createBaseVNode("h2", { class: "hello__title" }, "Вебразработка, которая приводит клиентов"), createBaseVNode("p", { class: "hello__text" }, "настраивает и сопровождает контекстную рекламу в Google AdWords, Yandex и Mail")], -1)), createBaseVNode("div", _hoisted_5$10, [
					createVNode(SalesBlock_default, {
						line1: "УВЕЛИЧИМ",
						line2: "ПРОДАЖИ С САЙТА"
					}),
					createVNode(SalesBlock_default, {
						line1: "ПОВЫСИМ",
						line2: "ЭФФЕКТИВНОСТЬ САЙТА"
					}),
					createVNode(SalesBlock_default, {
						line1: "ПРИВЛЕКАЕМ",
						line2: "НОВЫХ ЗАИНТЕРЕСОВАННЫХ КЛИЕНТОВ"
					})
				])]),
				_cache[8] || (_cache[8] = createStaticVNode("<div class=\"banners\" data-v-80fa456b><img src=\"/my-vue-app/assets/ban1.DhGXur83.png\" class=\"banner\" data-v-80fa456b><img src=\"/my-vue-app/assets/ban2.2zfV0yno.png\" class=\"banner\" data-v-80fa456b><img src=\"/my-vue-app/assets/ban3.CSN3aBi5.png\" class=\"banner\" data-v-80fa456b></div><h2 class=\"mini-title\" data-v-80fa456b>вы получите:</h2>", 2)),
				createBaseVNode("div", _hoisted_6$10, [
					_cache[4] || (_cache[4] = createBaseVNode("img", {
						src: "/my-vue-app/assets/sound.BiglwqCN.png",
						class: "pluses-back"
					}, null, -1)),
					createBaseVNode("div", _hoisted_7$9, [
						createVNode(GradientBlock_default, { text: "Звонки и заявки от клиентов" }),
						createVNode(GradientBlock_default, { text: "Повышение узнаваемости бренда" }),
						createVNode(GradientBlock_default, { text: "Эффективные кампании" }),
						createVNode(GradientBlock_default, { text: "Постоянное обновление" }),
						createVNode(GradientBlock_default, { text: "Помощь экспертов" }),
						createVNode(GradientBlock_default, { text: "Круглосуточный мониторинг" }),
						createVNode(GradientBlock_default, { text: "Индивидуальный отчет" }),
						createVNode(GradientBlock_default, { text: "Рекомендации по работе и наполнению сайта" })
					]),
					createBaseVNode("div", _hoisted_8$7, [
						createVNode(Plus_default, {
							width: "250px",
							symbol: "+",
							text: "Высокая смотрибельность"
						}),
						createVNode(Plus_default, {
							width: "250px",
							symbol: "+",
							text: "Гибкость и экономия бюджета"
						}),
						createVNode(Plus_default, {
							width: "250px",
							symbol: "+",
							text: "Результат сразу"
						}),
						createVNode(Plus_default, {
							width: "250px",
							symbol: "+",
							text: "Оптимальная стоимость настройки"
						}),
						createVNode(Plus_default, {
							width: "250px",
							symbol: "+",
							text: "Большая аудитория"
						}),
						createVNode(Plus_default, {
							width: "250px",
							symbol: "+",
							text: "Рост посещаемости"
						}),
						createVNode(Plus_default, {
							width: "250px",
							symbol: "+",
							text: "Растет узнаваемость вашей компании"
						}),
						createVNode(Plus_default, {
							width: "250px",
							symbol: "+",
							text: "Повышение дохода"
						}),
						createVNode(Plus_default, {
							width: "250px",
							symbol: "+",
							text: "Работа с целевой аудиторией"
						}),
						createVNode(Plus_default, {
							width: "250px",
							symbol: "+",
							text: "Честная статистика"
						})
					])
				]),
				_cache[9] || (_cache[9] = createBaseVNode("h2", { class: "mini-title" }, "Наша работа включает:", -1)),
				createBaseVNode("div", _hoisted_9$6, [
					createVNode(Stage_default, {
						number: "1",
						title: "ПРОВЕДЕНИЕ АНАЛИТИЧЕСКОГО РАЗБОРА",
						items: ["проводим подбор наиболее эффективных фраз с помощью специальных сервисов;", "выбираем целевые фразы путем анализа полученных данных, предыдущих кампаний и работы конкурентов."]
					}),
					createVNode(Stage_default, {
						number: "2",
						title: "ФОРМИРОВАНИЕ СТРАТЕГИИ",
						items: ["разрабатываем четкий план для создания качественной контекстной рекламы и проведения акцентной, основной, поведенческой кампании в поисковиках и по городам;", "заключаем договор и формируем бюджет."]
					}),
					createVNode(Stage_default, {
						number: "3",
						title: "ПОДБОР ЦЕЛЕВЫХ ФРАЗ",
						items: ["с помощью технологии «сладких» предложений и подталкивания к действию создаем объявления с повышенной кликабельностью."]
					}),
					createVNode(Stage_default, {
						number: "4",
						title: "ЗАПУСК",
						items: ["запускаем объявления с точными данными, ссылками на страницы сайта и контакты (до 4-х ссылок на ваши координаты, время работы и телефоны);", "предоставляем статистику с отслеживанием динамики посещений в течение 2-3 минут, сразу же по вашей просьбе."]
					}),
					createVNode(Stage_default, {
						number: "5",
						title: "МОНИТОРИНГ ЭФФЕКТИВНОСТИ И ФОРМИРОВАНИЕ НОВЫХ ЗАДАЧ",
						items: ["для повышения эффективности формируем дополнительные объявления с часто запрашиваемыми фразами и выносим отдельно;", "осуществляем оптимизацию расходов"]
					})
				]),
				createBaseVNode("div", _hoisted_10$4, [
					createVNode(Round_default, {
						image: `@/image/yandex.png`,
						items: [
							"Один из самых популярных поисковиков в России и СНГ",
							"Настройка таргетинга по географии, полу, возрасту и другим параметрам",
							"РСЯ анализирует поведение пользователей за последний месяц",
							"Look Alike находит похожую аудиторию",
							"Яндекс.Аудитория — показы по email или телефону",
							"Ретаргетинг на товары, которые уже посмотрели",
							"Яндекс.Метрика бесплатно: трафик, поведение, конверсия, путь от поиска до оплаты"
						]
					}),
					createVNode(Round_default, {
						image: `@/image/google.webp`,
						items: [
							"Подходит для России и других стран СНГ (клик может быть дешевле, чем в Яндексе)",
							"Таргетинг по географии, демографии, интересам",
							"Настройка радиуса до 1,5 км от точки на карте",
							"Поиск похожей аудитории, показы в почте",
							"Google Analytics: аналитика поведения, эффективности рекламы, конверсии, электронной коммерции"
						]
					}),
					createVNode(Round_default, {
						image: `@/image/mail.png`,
						items: [
							"Охватывает Одноклассники и Мой Мир (миллионы пользователей)",
							"Подходит для рекламы групп, пабликов и разделов сайта",
							"Настройка по географии, интересам, доходу, демографии, радиусу",
							"Ретаргетинг доступен",
							"Товары@mail.ru\xA0— для интернет-магазинов"
						]
					})
				]),
				_cache[10] || (_cache[10] = createBaseVNode("div", { class: "second-title" }, [createBaseVNode("h1", null, "БАННЕРНАЯ РЕКЛАМА")], -1)),
				createBaseVNode("div", _hoisted_11$2, [
					createVNode(GradientBlock_default, { text: "Дешевле, чем реклама на щитах вдоль дорог" }),
					createVNode(GradientBlock_default, { text: "Показывается заинтересованной аудитории" }),
					createVNode(GradientBlock_default, { text: "Настройка по полу, возрасту, географии (вплоть до улицы)" }),
					createVNode(GradientBlock_default, { text: "Размещение сразу на трёх популярных поисковиках" }),
					createVNode(GradientBlock_default, { text: "На странице только один баннер — выше шанс клика" }),
					createVNode(GradientBlock_default, { text: "Выраженный имиджевый эффект" }),
					createVNode(GradientBlock_default, { text: "Оплата раз в месяц целиком" }),
					createVNode(GradientBlock_default, { text: "Пользователь может сразу позвонить, не заходя на сайт" })
				]),
				createBaseVNode("div", { class: "button" }, [createBaseVNode("button", {
					class: "btn",
					onClick: openForm
				}, "Заказать рекламу")]),
				isFormOpen.value ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: "form-modal",
					onClick: closeForm
				}, [createBaseVNode("div", {
					class: "form-modal__content",
					onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"]))
				}, [createBaseVNode("button", {
					class: "form-modal__close",
					onClick: closeForm
				}, "✕"), createVNode(FormSmall_default, {
					title: "ЗАКАЗАТЬ РЕКЛАМУ",
					"background-image": "@/image/form.jpg"
				})])])) : createCommentVNode("", true),
				_cache[11] || (_cache[11] = createBaseVNode("div", { class: "second-title" }, [createBaseVNode("h1", null, "ВЕДЕНИЕ АВИТО")], -1)),
				_cache[12] || (_cache[12] = createBaseVNode("div", { class: "avito" }, [createBaseVNode("img", {
					src: "/my-vue-app/assets/avito.D0JnOure.png",
					class: "avito-img"
				}), createBaseVNode("div", { class: "avito-text" }, [createBaseVNode("p", null, [
					createTextVNode("Сайт-витрина с объявлениями на Авито – самая актуальная реклама. Авито приносит часто больше клиентов, чем Яндекс: десятки миллионов горячих покупателей. После блокировки рекламы в Google и Instagram поток клиентов вырос ещё сильнее. Сейчас лучшее время использовать трафик этого медиагиганта."),
					createBaseVNode("br"),
					createBaseVNode("br"),
					createTextVNode(" Мы создадим сайт-витрину с вашими объявлениями на Авито. Фирменная страница с логотипом, стилизованная под вашу компанию. Все объявления участвуют в поиске не только на Авито, но и в Яндексе, Google и других системах.")
				])])], -1)),
				createBaseVNode("div", _hoisted_12$1, [_cache[7] || (_cache[7] = createStaticVNode("<div class=\"price-text\" data-v-80fa456b><ul class=\"round-list\" data-v-80fa456b><li data-v-80fa456b>Объявления от 20 до 200 штук</li><li data-v-80fa456b>Информация о компании</li><li data-v-80fa456b>Заполнение карточек товаров</li><li data-v-80fa456b>Грамотный подбор фраз и текста</li><li data-v-80fa456b>Отрисовка фона и плашки</li><li data-v-80fa456b>Мгновенная реакция на заявки в сообщениях Авито</li><li data-v-80fa456b>Передача контакта клиента менеджеру</li><li data-v-80fa456b>Редактирование объявлений в течение месяца по желанию клиента</li><li data-v-80fa456b>Выгрузка статистики раз в месяц</li><li data-v-80fa456b>Поддержание объявлений в приоритетном размещении</li><li data-v-80fa456b>Логотип и информация о магазине в объявлениях</li><li data-v-80fa456b>Блок с новостями</li><li data-v-80fa456b>Только свои объявления в рекомендуемых</li><li data-v-80fa456b>Участие в поиске Авито, Яндекса и других систем</li></ul></div>", 1)), createBaseVNode("div", _hoisted_13$1, [
					_cache[5] || (_cache[5] = createBaseVNode("h2", {
						class: "price-dop",
						style: { "color": "white" }
					}, "цена в месяц за 1 город", -1)),
					createVNode(Ads_default, {
						count: "20",
						price: "20 000"
					}),
					createVNode(Ads_default, {
						count: "50",
						price: "30 000"
					}),
					createVNode(Ads_default, {
						count: "100",
						price: "40 000"
					}),
					createVNode(Ads_default, {
						count: "200",
						price: "50 000"
					}),
					_cache[6] || (_cache[6] = createBaseVNode("h2", {
						class: "price-dop",
						style: { "color": "#C6272B" }
					}, "+ 10 тысяч за каждый доп. город", -1))
				])])
			])]);
		};
	}
}, [["__scopeId", "data-v-80fa456b"]]);
//#endregion
//#region src/components/Number.vue
var _hoisted_1$16 = { class: "number__left" };
var _hoisted_2$14 = { class: "number__number" };
var _hoisted_3$14 = { class: "number__right" };
var _hoisted_4$11 = { class: "number-text" };
var Number_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "Number",
	props: {
		number: {
			type: [String, Number],
			required: true
		},
		text: {
			type: String,
			required: true,
			default: ""
		},
		width: {
			type: String,
			default: "490px"
		},
		height: {
			type: String,
			default: "136px"
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: "number",
				style: normalizeStyle({
					width: __props.width,
					minHeight: __props.height
				})
			}, [createBaseVNode("div", _hoisted_1$16, [createBaseVNode("span", _hoisted_2$14, toDisplayString(__props.number), 1)]), createBaseVNode("div", _hoisted_3$14, [createBaseVNode("span", _hoisted_4$11, toDisplayString(__props.text), 1)])], 4);
		};
	}
}, [["__scopeId", "data-v-3024a9cc"]]);
//#endregion
//#region src/components/Smm.vue
var _hoisted_1$15 = { class: "smm" };
var _hoisted_2$13 = { class: "smm__top" };
var _hoisted_3$13 = { class: "smm__left" };
var _hoisted_4$10 = { class: "smm__title" };
var _hoisted_5$9 = { class: "smm__list" };
var _hoisted_6$9 = { class: "smm__item-text" };
var _hoisted_7$8 = { class: "smm__right" };
var _hoisted_8$6 = { class: "smm__price" };
var _hoisted_9$5 = { class: "smm__label" };
var Smm_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "Smm",
	props: {
		title: {
			type: String,
			required: true
		},
		items: {
			type: Array,
			required: true,
			default: () => []
		},
		price: {
			type: [String, Number],
			required: true
		},
		label: {
			type: String,
			required: true,
			default: "за 1 соц. сеть"
		}
	},
	setup(__props) {
		const isFormOpen = /* @__PURE__ */ ref(false);
		const openForm = () => {
			isFormOpen.value = true;
		};
		const closeForm = () => {
			isFormOpen.value = false;
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$15, [
				createBaseVNode("div", _hoisted_2$13, [createBaseVNode("div", _hoisted_3$13, [createBaseVNode("h3", _hoisted_4$10, toDisplayString(__props.title), 1), createBaseVNode("ul", _hoisted_5$9, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (item) => {
					return openBlock(), createElementBlock("li", {
						key: item,
						class: "smm__item"
					}, [_cache[1] || (_cache[1] = createBaseVNode("span", { class: "smm__bullet" }, null, -1)), createBaseVNode("span", _hoisted_6$9, toDisplayString(item), 1)]);
				}), 128))])]), createBaseVNode("div", _hoisted_7$8, [createBaseVNode("span", _hoisted_8$6, [createTextVNode(toDisplayString(__props.price), 1), _cache[2] || (_cache[2] = createBaseVNode("span", { class: "smm__currency" }, "₽", -1))]), createBaseVNode("span", _hoisted_9$5, toDisplayString(__props.label), 1)])]),
				createBaseVNode("div", { class: "smm__button-wrapper" }, [createBaseVNode("button", {
					class: "smm__btn",
					onClick: openForm
				}, "Заказать")]),
				isFormOpen.value ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: "form-modal",
					onClick: closeForm
				}, [createBaseVNode("div", {
					class: "form-modal__content",
					onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"]))
				}, [createBaseVNode("button", {
					class: "form-modal__close",
					onClick: closeForm
				}, "✕"), createVNode(FormSmall_default, {
					title: "ЗАКАЗАТЬ ПРОДВИЖЕНИЕ",
					"background-image": "/my-vue-app/image/form.jpg"
				})])])) : createCommentVNode("", true)
			]);
		};
	}
}, [["__scopeId", "data-v-726534a8"]]);
//#endregion
//#region src/views/PromoPage.vue
var _hoisted_1$14 = { class: "promo-page" };
var _hoisted_2$12 = { class: "page-content" };
var _hoisted_3$12 = { class: "promo-title" };
var _hoisted_4$9 = { class: "hello" };
var _hoisted_5$8 = { class: "slogans" };
var _hoisted_6$8 = { class: "numbers" };
var _hoisted_7$7 = { class: "we" };
var _hoisted_8$5 = { class: "we-text" };
var _hoisted_9$4 = { class: "smm" };
var _hoisted_10$3 = { class: "chart" };
var PromoPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "PromoPage",
	setup(__props) {
		return (_ctx, _cache) => {
			const _component_router_link = resolveComponent("router-link");
			return openBlock(), createElementBlock("div", _hoisted_1$14, [createBaseVNode("div", _hoisted_2$12, [
				createBaseVNode("div", _hoisted_3$12, [createVNode(_component_router_link, { to: "/" }, {
					default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("svg", {
						width: "35",
						height: "58",
						viewBox: "0 0 35 58",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg"
					}, [createBaseVNode("path", {
						d: "M30.999 54.5L4.99902 28.3108L30.999 3.5",
						stroke: "white",
						"stroke-width": "7",
						"stroke-linecap": "round"
					})], -1)])]),
					_: 1
				}), _cache[1] || (_cache[1] = createBaseVNode("div", { class: "title" }, [createBaseVNode("h1", null, "ПРОДВИЖЕНИЕ САЙТОВ")], -1))]),
				createBaseVNode("div", _hoisted_4$9, [_cache[2] || (_cache[2] = createBaseVNode("div", { class: "hello-content" }, [createBaseVNode("h2", { class: "hello__title" }, "Вебразработка выведет ваш сайт в ТОП"), createBaseVNode("p", { class: "hello__text" }, "Мы гарантируем узнаваемость вашего бренда")], -1)), createBaseVNode("div", _hoisted_5$8, [
					createVNode(SalesBlock_default, {
						line1: "СОЗДАДИМ",
						line2: "ИМИДЖ"
					}),
					createVNode(SalesBlock_default, {
						line1: "ПОВЫСИМ",
						line2: "ПРОДАЖИ"
					}),
					createVNode(SalesBlock_default, {
						line1: "РАЗОВЬЁМ",
						line2: "ЛОЯЛЬНОСТЬ"
					})
				])]),
				_cache[6] || (_cache[6] = createBaseVNode("div", { class: "promo-text" }, [createBaseVNode("p", null, "Мы не просто занимаемся SEO продвижением сайтов в Нижнем Новгороде, но осуществляем комплексный подход, что помогает конвертировать обычных визитеров в потенциальных заказчиков и наполняем источник интересной клиенту информацией. Занимать первые места в нашем регионе достаточно сложно. Большая конкуренция обязывает каждый раз придумывать индивидуальный план по раскрутке.")], -1)),
				_cache[7] || (_cache[7] = createBaseVNode("h2", { class: "mini-title" }, "Что такое SEO-продвижение?", -1)),
				_cache[8] || (_cache[8] = createBaseVNode("div", { class: "promo-text" }, [createBaseVNode("p", null, "SEO — комплексное развитие сайта и его продвижение для поднятия на одну из топовых позиций в выдаче поисковиков. Основной целью СЕО является достижения лидерства в поисковой выдаче. Любой бизнесмен будет рад привлечь такое внимание к своей компании (бренду, товару), поэтому важно приложить все усилия для попадания в лидеры поисковой выдачи.")], -1)),
				_cache[9] || (_cache[9] = createBaseVNode("h2", { class: "mini-title" }, "Наши направления:", -1)),
				createBaseVNode("div", _hoisted_6$8, [
					createVNode(Number_default, {
						width: "490px",
						height: "136px",
						number: "1",
						text: "Многократное увеличение фраз и трафика без роста ежемесячного платежа. Фразы добавляем ежемесячно."
					}),
					createVNode(Number_default, {
						width: "490px",
						height: "136px",
						number: "2",
						text: "Анализ сайта при проблемах с конверсией: имидж, товар, подталкивание к действию, функциональность"
					}),
					createVNode(Number_default, {
						width: "490px",
						height: "136px",
						number: "3",
						text: "Мини-сайты на тематических ТОП-досках и каталогах с уникальным текстом, картинками и товарами."
					}),
					createVNode(Number_default, {
						width: "490px",
						height: "136px",
						number: "4",
						text: "Подключение Яндекс.Директ по фразам с продвижения."
					}),
					createVNode(Number_default, {
						width: "490px",
						height: "136px",
						number: "5",
						text: "Размещение товаров в Яндекс.Услугах."
					})
				]),
				createBaseVNode("div", _hoisted_7$7, [_cache[3] || (_cache[3] = createBaseVNode("div", { class: "we-img" }, [createBaseVNode("img", {
					src: "/my-vue-app/assets/pro.C618LDjj.jpg",
					class: "we-image"
				})], -1)), createBaseVNode("div", _hoisted_8$5, [
					createVNode(Plus_default, {
						width: "auto",
						symbol: "!",
						text: "Помогли проектам более 500 компаний"
					}),
					createVNode(Plus_default, {
						width: "auto",
						symbol: "!",
						text: "Ведём более 70 клиентов"
					}),
					createVNode(Plus_default, {
						width: "auto",
						symbol: "!",
						text: "Наша главная цель - повысить продажи"
					}),
					createVNode(Plus_default, {
						width: "auto",
						symbol: "!",
						text: "Выкладываемся на все 100%"
					}),
					createVNode(Plus_default, {
						width: "auto",
						symbol: "!",
						text: "Первые результаты уже через несколько недель"
					})
				])]),
				createVNode(_component_router_link, {
					to: "/cases",
					class: "link"
				}, {
					default: withCtx(() => [..._cache[4] || (_cache[4] = [createBaseVNode("div", { class: "button" }, [createBaseVNode("button", { class: "btn" }, "Смотреть кейсы")], -1)])]),
					_: 1
				}),
				_cache[10] || (_cache[10] = createBaseVNode("div", { class: "second-title" }, [createBaseVNode("h1", null, "SMM-ПРОДВИЖЕНИЕ")], -1)),
				createBaseVNode("div", _hoisted_9$4, [
					createVNode(Smm_default, {
						title: "ОФОРМЛЕНИЕ СООБЩЕСТВА/АККАУНТА В ВКОНТАКТЕ, INSTAGRAM, FACEBOOK",
						items: [
							"Составление портрета ЦА;",
							"Анализ конкурентов;",
							"Визуальное оформление: добавление описания компании, создание аватара, обложки, карточек для товаров, обсуждений, фотоальбомов, добавление видео, виджетов, меню и т.п.",
							"Заполнение контактной информации;",
							"Написание контент-плана.",
							"Написание двух постов."
						],
						price: "15 000",
						label: "за 1 соц. сеть"
					}),
					createVNode(Smm_default, {
						title: "ВЕДЕНИЕ СООБЩЕСТВА/АККАУНТА",
						items: [
							"Модерация (работа с комментариями, спамом, негативом, отзывами)",
							"Написание и публикация от 2 постов в неделю (8-9 в месяц)",
							"Составление рекомендаций, генерация идей относительно контента, стратегии ведения групп/аккаунтов в соцсетях",
							"Поддержание, стимулирование активности в группах/аккаунтах в соц. сетях."
						],
						price: "от 10 000",
						label: "в месяц"
					}),
					createVNode(Smm_default, {
						title: "ТАРГЕТИРОВАННАЯ РЕКЛАМА В ВКонтакте,\xA0Instagram,\xA0Facebook",
						items: [
							"Анализ группы/сайта, анализ конкурентов;",
							"Разработка стратегии рекламы;",
							"Построение портрета ЦА на основе брифа, Сбор ЦА;",
							"Создание креативов разных форматов;",
							"А/В тестирование;",
							"Анализ тестовой рекламной кампании;",
							"Выявление успешных объявлений и аудиторий;",
							"Регулярный мониторинг объявлений;",
							"Обновление креативов по мере необходимости;",
							"Отчеты."
						],
						price: "15 000",
						label: "за первый месяц, далее 10 000₽"
					})
				]),
				_cache[11] || (_cache[11] = createBaseVNode("h2", { class: "mini-title" }, "этапы SMM:", -1)),
				createBaseVNode("div", _hoisted_10$3, [
					_cache[5] || (_cache[5] = createBaseVNode("img", {
						src: "/my-vue-app/assets/smm-logo.CCmR0OfM.png",
						class: "chart-img"
					}, null, -1)),
					createVNode(Number_default, {
						width: "390px",
						height: "195px",
						number: "1",
						text: "Аудит. Проводим анализ Вашего бизнеса с точки зрения возможностей маркетинга."
					}),
					createVNode(Number_default, {
						width: "580px",
						height: "195px",
						number: "2",
						text: "Осуществляем анализ конкурентной среды. Аудит конкурентов позволяет понять, какие решения\r\n            действительно работают в Вашем сегменте бизнеса."
					}),
					createVNode(Number_default, {
						width: "780px",
						height: "195px",
						number: "3",
						text: "Ставим задачи SMM, составляем контент-план. Определяем пакет инструментов, которые лучше всего использовать."
					}),
					createVNode(Number_default, {
						width: "1020px",
						height: "195px",
						number: "4",
						text: "Разрабатываем стратегию размещения постов и дизайнерского контента, запускаем таргетированную\r\n            рекламу на основе проведенного аудита. Выделяем компанию среди конкурентов."
					}),
					createVNode(Number_default, {
						width: "100%",
						height: "195px",
						number: "5",
						text: "Разрабатываем стратегию размещения постов и дизайнерского контента, запускаем таргетированную\r\n            рекламу на основе проведенного аудита. Выделяем компанию среди конкурентов."
					})
				])
			])]);
		};
	}
}, [["__scopeId", "data-v-be489678"]]);
//#endregion
//#region src/views/ShopPage.vue
var _hoisted_1$13 = { class: "shop-page" };
var _hoisted_2$11 = { class: "page-content" };
var _hoisted_3$11 = { class: "shop-title" };
var _hoisted_4$8 = { class: "hello" };
var _hoisted_5$7 = { class: "slogans" };
var _hoisted_6$7 = { class: "numbers" };
var _hoisted_7$6 = { class: "pluses" };
var ShopPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "ShopPage",
	setup(__props) {
		const steps = [
			{
				number: "1",
				text: "Консультация и обсуждение проекта с клиентом"
			},
			{
				number: "2",
				text: "Заключение договора и согласование оплаты"
			},
			{
				number: "3",
				text: "Подбор материала и разработка привлекающего дизайна"
			},
			{
				number: "4",
				text: "Выполнение отрисовки макета"
			},
			{
				number: "5",
				text: "Согласование с клиентом и внесение правок"
			},
			{
				number: "6",
				text: "Верстка утвержденного дизайна"
			},
			{
				number: "7",
				text: "Программирование сайта и реализация функционала"
			},
			{
				number: "8",
				text: "Написание текстов и заполнение сайта материалами."
			},
			{
				number: "9",
				text: "Проверка и тестирование сайт"
			},
			{
				number: "10",
				text: "Запуск"
			},
			{
				number: "11",
				text: "Обучение клиента работе с магазином"
			},
			{
				number: "12",
				text: "Подписание акта об окончании работ"
			}
		];
		let interval = null;
		const activeIndex = /* @__PURE__ */ ref(0);
		onMounted(() => {
			interval = setInterval(() => {
				activeIndex.value = (activeIndex.value + 1) % steps.length;
			}, 600);
		});
		onBeforeUnmount(() => {
			if (interval) clearInterval(interval);
		});
		return (_ctx, _cache) => {
			const _component_router_link = resolveComponent("router-link");
			return openBlock(), createElementBlock("div", _hoisted_1$13, [createBaseVNode("div", _hoisted_2$11, [
				createBaseVNode("div", _hoisted_3$11, [createVNode(_component_router_link, { to: "/" }, {
					default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("svg", {
						width: "35",
						height: "58",
						viewBox: "0 0 35 58",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg"
					}, [createBaseVNode("path", {
						d: "M30.999 54.5L4.99902 28.3108L30.999 3.5",
						stroke: "white",
						"stroke-width": "7",
						"stroke-linecap": "round"
					})], -1)])]),
					_: 1
				}), _cache[1] || (_cache[1] = createBaseVNode("div", { class: "title" }, [createBaseVNode("h1", null, "ИНТЕРНЕТ-МАГАЗИН")], -1))]),
				createBaseVNode("div", _hoisted_4$8, [_cache[2] || (_cache[2] = createBaseVNode("div", { class: "hello-content" }, [createBaseVNode("h2", { class: "hello__title" }, "Вебразработка — откроем продажи онлайн"), createBaseVNode("p", { class: "hello__text" }, "Создаём продающие интернет-магазины")], -1)), createBaseVNode("div", _hoisted_5$7, [
					createVNode(SalesBlock_default, {
						line1: "ПОВЫСИМ",
						line2: "ДОВЕРИЕ К ВАШЕМУ БРЕНДУ"
					}),
					createVNode(SalesBlock_default, {
						line1: "ПРОДВИНЕМ",
						line2: "ВАШ МАГАЗИН В ИНТЕРНЕТЕ"
					}),
					createVNode(SalesBlock_default, {
						line1: "ПРИНЕСЁМ",
						line2: "БОЛЬШОЙ ДОХОД"
					})
				])]),
				_cache[3] || (_cache[3] = createBaseVNode("div", { class: "shop-text" }, [createBaseVNode("p", null, "Цены создания интернет магазина и цены на другие сайты зависят от наполнения, интеграции, необходимости мобильной версии и других параметров. Наша компания предлагает полный комплекс услуг, включая дополнительный домен и хостинг. Мы наполняем дизайн разными важными опциями, а также внедряем автоматический перенос баз поставщика, рекламу в Яндексе и Google.")], -1)),
				_cache[4] || (_cache[4] = createBaseVNode("h2", { class: "mini-title" }, "этапы создания:", -1)),
				createBaseVNode("div", _hoisted_6$7, [(openBlock(), createElementBlock(Fragment, null, renderList(steps, (item, index) => {
					return createBaseVNode("div", {
						key: index,
						class: normalizeClass(["number-wrapper", { "number-wrapper--active": index === activeIndex.value }])
					}, [createVNode(Number_default, {
						width: "300px",
						height: "129px",
						number: item.number,
						text: item.text
					}, null, 8, ["number", "text"])], 2);
				}), 64))]),
				createBaseVNode("div", _hoisted_7$6, [
					createVNode(Plus_default, {
						width: "380px",
						symbol: "+",
						text: "Поднимем ваши сайты на верхние строки поисковиков"
					}),
					createVNode(Plus_default, {
						width: "380px",
						symbol: "+",
						text: "Добавим необходимые модули"
					}),
					createVNode(Plus_default, {
						width: "380px",
						symbol: "+",
						text: "Gривлечем трафик для запуска потока клиентов"
					})
				]),
				_cache[5] || (_cache[5] = createStaticVNode("<h2 class=\"mini-title\" data-v-e953a13e>Наши преимещуства:</h2><div class=\"settings\" data-v-e953a13e><img src=\"/my-vue-app/assets/crown.BrYsyMzo.png\" class=\"settings-img\" data-v-e953a13e><div class=\"set\" data-v-e953a13e><p data-v-e953a13e>Работаем на CMS Bitrix, WordPress, Joomla</p></div><div class=\"settings-block\" data-v-e953a13e><div class=\"setting-block-ver\" data-v-e953a13e><div class=\"set\" data-v-e953a13e><p data-v-e953a13e>Обучаем клиента работать с сайтом</p></div><div class=\"set\" data-v-e953a13e><p data-v-e953a13e>Обеспечиваем корректную работу на всех устройствах</p></div></div><svg class=\"settings-block__icon\" width=\"258\" height=\"258\" viewBox=\"0 0 258 258\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" data-v-e953a13e><rect x=\"128.693\" width=\"86\" height=\"86\" rx=\"20\" transform=\"rotate(45 128.693 0)\" fill=\"#631315\" fill-opacity=\"0.5\" data-v-e953a13e></rect><rect x=\"60.8115\" y=\"67.8823\" width=\"86\" height=\"86\" rx=\"20\" transform=\"rotate(45 60.8115 67.8823)\" fill=\"#631315\" data-v-e953a13e></rect><rect x=\"196.575\" y=\"67.8823\" width=\"86\" height=\"86\" rx=\"20\" transform=\"rotate(45 196.575 67.8823)\" fill=\"#631315\" data-v-e953a13e></rect><rect x=\"128.693\" y=\"135.765\" width=\"86\" height=\"86\" rx=\"20\" transform=\"rotate(45 128.693 135.765)\" fill=\"#631315\" fill-opacity=\"0.5\" data-v-e953a13e></rect></svg><div class=\"setting-block-ver\" data-v-e953a13e><div class=\"set\" data-v-e953a13e><p data-v-e953a13e>Проводим базовую SEO-оптимизацию для роста в будущем</p></div><div class=\"set\" data-v-e953a13e><p data-v-e953a13e>Помогаем с продвижением и раскруткой готового магазина</p></div></div></div><div class=\"set\" data-v-e953a13e><p data-v-e953a13e>Внедряем удобную панель управления с нужным уровнем доступа</p></div></div>", 2))
			])]);
		};
	}
}, [["__scopeId", "data-v-e953a13e"]]);
//#endregion
//#region src/components/Price.vue
var _hoisted_1$12 = { class: "price" };
var _hoisted_2$10 = { class: "price__top" };
var _hoisted_3$10 = { class: "price__left" };
var _hoisted_4$7 = { class: "price__title" };
var _hoisted_5$6 = { class: "price__text" };
var _hoisted_6$6 = { class: "price__right" };
var _hoisted_7$5 = { class: "price__amount" };
var _hoisted_8$4 = {
	key: 0,
	class: "price__discount"
};
var _hoisted_9$3 = { class: "price__discount-text" };
var Price_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "Price",
	props: {
		title: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		},
		price: {
			type: [String, Number],
			required: true
		},
		discount: {
			type: [String, Number],
			default: null
		}
	},
	setup(__props) {
		const isFormOpen = /* @__PURE__ */ ref(false);
		const openForm = () => {
			isFormOpen.value = true;
		};
		const closeForm = () => {
			isFormOpen.value = false;
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$12, [
				createBaseVNode("div", _hoisted_2$10, [createBaseVNode("div", _hoisted_3$10, [createBaseVNode("h3", _hoisted_4$7, toDisplayString(__props.title), 1), createBaseVNode("p", _hoisted_5$6, toDisplayString(__props.text), 1)]), createBaseVNode("div", _hoisted_6$6, [createBaseVNode("span", _hoisted_7$5, [createTextVNode(toDisplayString(__props.price), 1), _cache[1] || (_cache[1] = createBaseVNode("span", { class: "price__currency" }, "₽", -1))]), __props.discount ? (openBlock(), createElementBlock("div", _hoisted_8$4, [createBaseVNode("span", _hoisted_9$3, "-" + toDisplayString(__props.discount) + "%", 1)])) : createCommentVNode("", true)])]),
				createBaseVNode("div", { class: "price__button-wrapper" }, [createBaseVNode("button", {
					class: "price__btn",
					onClick: openForm
				}, "Заказать")]),
				isFormOpen.value ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: "form-modal",
					onClick: closeForm
				}, [createBaseVNode("div", {
					class: "form-modal__content",
					onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"]))
				}, [createBaseVNode("button", {
					class: "form-modal__close",
					onClick: closeForm
				}, "✕"), createVNode(FormSmall_default, {
					title: "ЗАКАЗАТЬ САЙТ",
					"background-image": "/my-vue-app/image/form.jpg"
				})])])) : createCommentVNode("", true)
			]);
		};
	}
}, [["__scopeId", "data-v-9bc7b19b"]]);
//#endregion
//#region src/views/DevelopPage.vue
var _hoisted_1$11 = { class: "develop-page" };
var _hoisted_2$9 = { class: "page-content" };
var _hoisted_3$9 = { class: "develop-title" };
var _hoisted_4$6 = { class: "hello" };
var _hoisted_5$5 = { class: "slogans" };
var _hoisted_6$5 = { class: "list" };
var _hoisted_7$4 = { class: "list-blocks" };
var _hoisted_8$3 = { class: "list-price" };
var DevelopPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "DevelopPage",
	setup(__props) {
		return (_ctx, _cache) => {
			const _component_router_link = resolveComponent("router-link");
			return openBlock(), createElementBlock("div", _hoisted_1$11, [createBaseVNode("div", _hoisted_2$9, [
				createBaseVNode("div", _hoisted_3$9, [createVNode(_component_router_link, { to: "/" }, {
					default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("svg", {
						width: "35",
						height: "58",
						viewBox: "0 0 35 58",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg"
					}, [createBaseVNode("path", {
						d: "M30.999 54.5L4.99902 28.3108L30.999 3.5",
						stroke: "white",
						"stroke-width": "7",
						"stroke-linecap": "round"
					})], -1)])]),
					_: 1
				}), _cache[1] || (_cache[1] = createBaseVNode("div", { class: "title" }, [createBaseVNode("h1", null, "РАЗРАБОТКА САЙТОВ")], -1))]),
				createBaseVNode("div", _hoisted_4$6, [_cache[2] || (_cache[2] = createBaseVNode("div", { class: "hello-content" }, [createBaseVNode("h2", { class: "hello__title" }, "Вебразработка — Технологии будущего"), createBaseVNode("p", { class: "hello__text" }, "Мы увеличим прибыль от вашего сайта до 10 раз!")], -1)), createBaseVNode("div", _hoisted_5$5, [
					createVNode(SalesBlock_default, {
						line1: "СОЗДАДИМ",
						line2: "ПРОДАЮЩИЙ САЙТ"
					}),
					createVNode(SalesBlock_default, {
						line1: "СДЕЛАЕМ",
						line2: "ВАШ САЙТ ПРОДАЮЩИМ"
					}),
					createVNode(SalesBlock_default, {
						line1: "УВЕЛИЧИМ",
						line2: "ПРИБЫЛЬ, ЭФФЕКТИВНОСТЬ, ПОТОК КЛИЕНТОВ"
					})
				])]),
				createBaseVNode("div", _hoisted_6$5, [createBaseVNode("div", _hoisted_7$4, [
					createVNode(GradientBlock_default, { text: "Лучшие дизайнеры города" }),
					createVNode(GradientBlock_default, { text: "За 10 лет ни одного отказа" }),
					createVNode(GradientBlock_default, { text: "Лучшая система Joomla 3.5." }),
					createVNode(GradientBlock_default, { text: "Не меняем цены уже 6 лет!" }),
					createVNode(GradientBlock_default, { text: "Мы не работаем по шаблонам" }),
					createVNode(GradientBlock_default, { text: "Делаем до 30 сайтов в месяц" }),
					createVNode(GradientBlock_default, { text: "Бесплатное обучение управлению сайтом" }),
					createVNode(GradientBlock_default, { text: "Бесплатные консультации по телефону" }),
					createVNode(GradientBlock_default, { text: "Бесплатно вносим даже мелкие изменение на сайт" })
				]), createBaseVNode("div", _hoisted_8$3, [
					createVNode(Price_default, {
						title: "Эксклюзивный сайт",
						text: "Только индивидуальный, неповторимый дизайн. Мы гарантируем, что этот дизайн не получит больше никто.",
						price: "15 000"
					}),
					createVNode(Price_default, {
						title: "Эксклюзивный + Витрина",
						text: "Витрина это уникальная разработка нашей компании, включающая 3 больших блока инструментов и целый комплекс эксклюзивных баннеров.",
						price: "45 000",
						discount: "5"
					}),
					createVNode(Price_default, {
						title: "Эксклюзивный + Витрина + Интернет-магазин",
						text: "Функциональный удобный интернет-магазин, с неограниченным колличеством позиций, удобным добавлением новых товаров и многое другое.",
						price: "70 000",
						discount: "10"
					}),
					createVNode(Price_default, {
						title: "ИНТЕРНЕТ МАГАЗИН + ИНТЕРГРАЦИЯ 1С",
						text: "Возможность одним кликом перенести 10000 тысяч позиций и более в магазин. Большая экономия. (Требуется предварительная интеграция интернет-магазина)",
						price: "50 000",
						discount: "15"
					})
				])])
			])]);
		};
	}
}, [["__scopeId", "data-v-e5bc0772"]]);
//#endregion
//#region src/components/Person.vue
var _hoisted_1$10 = { class: "person" };
var _hoisted_2$8 = { class: "person__image-wrapper" };
var _hoisted_3$8 = ["src"];
var _hoisted_4$5 = { class: "person__right" };
var _hoisted_5$4 = { class: "person__contact" };
var _hoisted_6$4 = { class: "person__name" };
var _hoisted_7$3 = ["href"];
var _hoisted_8$2 = { class: "person__social" };
var _hoisted_9$2 = ["href"];
var _hoisted_10$2 = ["href"];
var Person_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "Person",
	props: {
		image: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		phone: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		telegramLink: {
			type: String,
			default: null
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$10, [createBaseVNode("div", _hoisted_2$8, [createBaseVNode("img", {
				src: __props.image,
				alt: "Фото",
				class: "person__image"
			}, null, 8, _hoisted_3$8)]), createBaseVNode("div", _hoisted_4$5, [createBaseVNode("div", _hoisted_5$4, [createBaseVNode("h3", _hoisted_6$4, toDisplayString(__props.name), 1), createBaseVNode("a", {
				href: `tel:${__props.phone.replace(/\s/g, "")}`,
				class: "person__phone"
			}, toDisplayString(__props.phone), 9, _hoisted_7$3)]), createBaseVNode("div", _hoisted_8$2, [createBaseVNode("a", {
				href: `mailto:${__props.email}`,
				class: "person__email"
			}, [_cache[0] || (_cache[0] = createBaseVNode("span", { class: "person__at" }, "@", -1)), createTextVNode(toDisplayString(__props.email), 1)], 8, _hoisted_9$2), createBaseVNode("a", {
				href: __props.telegramLink,
				target: "_blank",
				class: "person__telegram"
			}, [..._cache[1] || (_cache[1] = [createBaseVNode("svg", {
				width: "19",
				height: "16",
				viewBox: "0 0 19 16",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg"
			}, [createBaseVNode("path", {
				d: "M17.4576 0.18176L0.624451 6.70657C-0.0529367 7.01041 -0.282053 7.61892 0.460697 7.94915L4.77915 9.3286L15.2205 2.84227C15.7906 2.43506 16.3743 2.54365 15.8721 2.99158L6.90432 11.1532L6.62261 14.6072C6.88354 15.1405 7.36129 15.143 7.66602 14.878L10.1471 12.5182L14.3963 15.7165C15.3832 16.3038 15.9202 15.9248 16.1325 14.8484L18.9197 1.58293C19.209 0.257909 18.7155 -0.325894 17.4576 0.18176Z",
				fill: "white"
			})], -1), createBaseVNode("span", { class: "person__telegram-text" }, "Телеграм", -1)])], 8, _hoisted_10$2)])])]);
		};
	}
}, [["__scopeId", "data-v-a7ee54a0"]]);
//#endregion
//#region src/components/Time.vue
var _hoisted_1$9 = { class: "time" };
var _hoisted_2$7 = { class: "time__title" };
var _hoisted_3$7 = { class: "two" };
var _hoisted_4$4 = ["href"];
var _hoisted_5$3 = { class: "time__schedule-wrapper" };
var _hoisted_6$3 = { class: "time__days" };
var _hoisted_7$2 = { class: "time__hours" };
var _hoisted_8$1 = { class: "time__hours-top" };
var _hoisted_9$1 = { class: "time__hours-sup" };
var _hoisted_10$1 = { class: "time__hours-top" };
var _hoisted_11$1 = { class: "time__hours-sup" };
var Time_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "Time",
	props: {
		title: {
			type: String,
			required: true
		},
		phone: {
			type: String,
			required: true
		},
		schedule: {
			type: Array,
			required: true,
			default: () => []
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$9, [createBaseVNode("h3", _hoisted_2$7, toDisplayString(__props.title), 1), createBaseVNode("div", _hoisted_3$7, [createBaseVNode("a", {
				href: `tel:${__props.phone.replace(/\s/g, "")}`,
				class: "time__phone"
			}, toDisplayString(__props.phone), 9, _hoisted_4$4), createBaseVNode("div", _hoisted_5$3, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.schedule, (item, index) => {
				return openBlock(), createElementBlock("div", {
					key: index,
					class: "time__schedule-item"
				}, [createBaseVNode("span", _hoisted_6$3, toDisplayString(item.days), 1), createBaseVNode("span", _hoisted_7$2, [
					createBaseVNode("span", _hoisted_8$1, toDisplayString(item.hoursStartTop), 1),
					createBaseVNode("span", _hoisted_9$1, toDisplayString(item.hoursStartBottom), 1),
					_cache[0] || (_cache[0] = createBaseVNode("span", { class: "time__hours-separator" }, "-", -1)),
					createBaseVNode("span", _hoisted_10$1, toDisplayString(item.hoursEndTop), 1),
					createBaseVNode("span", _hoisted_11$1, toDisplayString(item.hoursEndBottom), 1)
				])]);
			}), 128))])])]);
		};
	}
}, [["__scopeId", "data-v-1d6e1f22"]]);
//#endregion
//#region src/views/ContactPage.vue
var _hoisted_1$8 = { class: "contact-page" };
var _hoisted_2$6 = { class: "page-content" };
var _hoisted_3$6 = { class: "contact-title" };
var _hoisted_4$3 = { class: "info" };
var _hoisted_5$2 = { class: "person-list" };
var _hoisted_6$2 = { class: "time-list" };
var ContactPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "ContactPage",
	setup(__props) {
		const isFormOpen = /* @__PURE__ */ ref(false);
		const openForm = () => {
			isFormOpen.value = true;
		};
		const closeForm = () => {
			isFormOpen.value = false;
		};
		return (_ctx, _cache) => {
			const _component_router_link = resolveComponent("router-link");
			return openBlock(), createElementBlock("div", _hoisted_1$8, [createBaseVNode("div", _hoisted_2$6, [
				createBaseVNode("div", _hoisted_3$6, [createVNode(_component_router_link, { to: "/" }, {
					default: withCtx(() => [..._cache[1] || (_cache[1] = [createBaseVNode("svg", {
						width: "35",
						height: "58",
						viewBox: "0 0 35 58",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg"
					}, [createBaseVNode("path", {
						d: "M30.999 54.5L4.99902 28.3108L30.999 3.5",
						stroke: "white",
						"stroke-width": "7",
						"stroke-linecap": "round"
					})], -1)])]),
					_: 1
				}), _cache[2] || (_cache[2] = createBaseVNode("div", { class: "title" }, [createBaseVNode("h1", null, "КОНТАКТЫ")], -1))]),
				_cache[4] || (_cache[4] = createBaseVNode("h2", { class: "mini-title" }, "наши менеджеры:", -1)),
				createBaseVNode("div", _hoisted_4$3, [createBaseVNode("div", _hoisted_5$2, [
					createVNode(Person_default, {
						image: "@/image/men1.jpg",
						name: "АЛЁНА ФОМИНЬІХ",
						phone: "+7 (908) 167 06-03",
						email: "alena@webrazrabotka.ru"
					}),
					createVNode(Person_default, {
						image: "@/image/men2.jpeg",
						name: "светлана мозговая",
						phone: "+7 (910) 388 45-49",
						email: "sveta@webrazrabotka.ru",
						"telegram-link": "https://t.me/mozsveta"
					}),
					createVNode(Person_default, {
						image: "@/image/men3.jpg",
						name: "маргарита мататова",
						phone: "+7 (908) 161 20-62",
						email: "rita@webrazrabotka.ru"
					}),
					createVNode(Person_default, {
						image: "@/image/men4.png",
						name: "юлия зейналова",
						phone: "+7 (908) 231 84-18",
						email: "julia@webrazrabotka.ru",
						"telegram-link": "https://t.me/Pelmeh0"
					}),
					createVNode(Person_default, {
						image: "@/image/men5.jpg",
						name: "кристина Куль",
						phone: "+7 (999) 079 30-09",
						email: "Kristina@webrazrabotka.ru",
						"telegram-link": "https://t.me/kul_kris"
					})
				]), createBaseVNode("div", _hoisted_6$2, [
					createVNode(Time_default, {
						title: "ЗАКАЗАТЬ САЙТ",
						phone: "+7 (905) 661 18-60",
						schedule: [{
							days: "ПН-ВС",
							hoursStartTop: "9",
							hoursStartBottom: "00",
							hoursEndTop: "21",
							hoursEndBottom: "00"
						}]
					}),
					createVNode(Time_default, {
						title: "тех.поддержка",
						phone: "+7 (831) 422 85-59",
						schedule: [{
							days: "ПН-ЧТ",
							hoursStartTop: "9",
							hoursStartBottom: "00",
							hoursEndTop: "18",
							hoursEndBottom: "00"
						}, {
							days: "ПТ",
							hoursStartTop: "10",
							hoursStartBottom: "00",
							hoursEndTop: "16",
							hoursEndBottom: "00"
						}]
					}),
					createVNode(Time_default, {
						title: "отдел дизайна",
						phone: "+7 (831) 422 85-99",
						schedule: [{
							days: "ПН-ЧТ",
							hoursStartTop: "9",
							hoursStartBottom: "00",
							hoursEndTop: "18",
							hoursEndBottom: "00"
						}, {
							days: "ПТ",
							hoursStartTop: "10",
							hoursStartBottom: "00",
							hoursEndTop: "16",
							hoursEndBottom: "00"
						}]
					}),
					createVNode(Time_default, {
						title: "контент / каталоги",
						phone: "+7 (831) 422 85-09",
						schedule: [{
							days: "ПН-ВС",
							hoursStartTop: "9",
							hoursStartBottom: "00",
							hoursEndTop: "21",
							hoursEndBottom: "00"
						}]
					}),
					createBaseVNode("div", { class: "btn" }, [createBaseVNode("a", {
						class: "case__button",
						onClick: openForm
					}, "Перезвонить мне")]),
					isFormOpen.value ? (openBlock(), createElementBlock("div", {
						key: 0,
						class: "form-modal",
						onClick: closeForm
					}, [createBaseVNode("div", {
						class: "form-modal__content",
						onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"]))
					}, [createBaseVNode("button", {
						class: "form-modal__close",
						onClick: closeForm
					}, "✕"), createVNode(FormSmall_default, {
						title: "ЗАКАЗАТЬ САЙТ",
						"background-image": "@/image/form.jpg"
					})])])) : createCommentVNode("", true),
					_cache[3] || (_cache[3] = createBaseVNode("div", { class: "geo" }, [createBaseVNode("p", null, "603000, г. Нижний новгород, ул. Родионова, д. 193 к. 6")], -1))
				])]),
				_cache[5] || (_cache[5] = createBaseVNode("h2", { class: "mini-title" }, "мы на картах:", -1)),
				_cache[6] || (_cache[6] = createBaseVNode("div", { class: "map-container" }, [createBaseVNode("iframe", {
					src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2216.123456789!2d44.0072!3d56.3262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTbCsDE5JzM0LjMiTiA0NMKwMDAnMjUuOSJF!5e0!3m2!1sru!2sru!4v1234567890",
					width: "100%",
					height: "100%",
					style: { "border": "0" },
					allowfullscreen: "",
					loading: "lazy",
					referrerpolicy: "no-referrer-when-downgrade"
				})], -1))
			])]);
		};
	}
}, [["__scopeId", "data-v-3fdd4cc3"]]);
//#endregion
//#region src/components/Package.vue
var _hoisted_1$7 = { class: "package__title" };
var _hoisted_2$5 = { class: "package__text" };
var _hoisted_3$5 = { class: "package__price" };
var Package_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "Package",
	props: {
		title: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		},
		price: {
			type: [String, Number],
			required: true
		},
		isActive: {
			type: Boolean,
			default: false
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const selectPackage = () => {
			emit("select");
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(["package", { "package--active": __props.isActive }]),
				onClick: selectPackage
			}, [
				createBaseVNode("h3", _hoisted_1$7, toDisplayString(__props.title), 1),
				createBaseVNode("p", _hoisted_2$5, toDisplayString(__props.text), 1),
				createBaseVNode("span", _hoisted_3$5, [createTextVNode(toDisplayString(__props.price), 1), _cache[0] || (_cache[0] = createBaseVNode("span", { class: "package__currency" }, "₽", -1))])
			], 2);
		};
	}
}, [["__scopeId", "data-v-b55a309a"]]);
//#endregion
//#region src/components/Choice.vue
var _hoisted_1$6 = { class: "choice__title" };
var _hoisted_2$4 = { class: "choice__text" };
var _hoisted_3$4 = { class: "choice__price" };
var Choice_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "Choice",
	props: {
		title: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		},
		price: {
			type: [String, Number],
			required: true
		},
		isActive: {
			type: Boolean,
			default: false
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const selectChoice = () => {
			emit("select");
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(["choice", { "choice--active": __props.isActive }]),
				onClick: selectChoice
			}, [
				createBaseVNode("h3", _hoisted_1$6, toDisplayString(__props.title), 1),
				createBaseVNode("p", _hoisted_2$4, toDisplayString(__props.text), 1),
				createBaseVNode("span", _hoisted_3$4, [createTextVNode(toDisplayString(__props.price), 1), _cache[0] || (_cache[0] = createBaseVNode("span", { class: "choice__currency" }, "₽", -1))])
			], 2);
		};
	}
}, [["__scopeId", "data-v-07320903"]]);
//#endregion
//#region src/components/Radio.vue
var _hoisted_1$5 = {
	key: 0,
	class: "radio__dot"
};
var Radio_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "Radio",
	props: { isActive: {
		type: Boolean,
		default: false
	} },
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const selectRadio = () => {
			emit("select");
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(["radio", { "radio--active": __props.isActive }]),
				onClick: selectRadio
			}, [__props.isActive ? (openBlock(), createElementBlock("div", _hoisted_1$5)) : createCommentVNode("", true)], 2);
		};
	}
}, [["__scopeId", "data-v-45eb4d86"]]);
//#endregion
//#region src/views/CalculPage.vue
var _hoisted_1$4 = { class: "calcul-page" };
var _hoisted_2$3 = { class: "page-content" };
var _hoisted_3$3 = { class: "calcul-title" };
var _hoisted_4$2 = { class: "result" };
var _hoisted_5$1 = { class: "cost" };
var _hoisted_6$1 = { class: "cost-price" };
var _hoisted_7$1 = { class: "cost-itog" };
var _hoisted_8 = { class: "tabs-block" };
var _hoisted_9 = { class: "tabs-block__left" };
var _hoisted_10 = { class: "tabs-block__list" };
var _hoisted_11 = ["onClick"];
var _hoisted_12 = { class: "tabs-block__text" };
var _hoisted_13 = { class: "tabs-block__right" };
var _hoisted_14 = {
	key: 0,
	class: "tabs-block__content"
};
var _hoisted_15 = { class: "packages" };
var _hoisted_16 = { class: "choice-wrapper" };
var _hoisted_17 = { class: "choice-wrapper" };
var _hoisted_18 = { class: "choice-wrapper" };
var _hoisted_19 = { class: "choice-wrapper" };
var _hoisted_20 = { class: "choice-wrapper" };
var _hoisted_21 = { class: "choice-wrapper" };
var _hoisted_22 = { class: "choice-wrapper" };
var _hoisted_23 = { class: "choice-wrapper" };
var _hoisted_24 = { class: "choice-wrapper" };
var _hoisted_25 = { class: "choice-wrapper" };
var _hoisted_26 = { class: "choice-wrapper" };
var _hoisted_27 = { class: "choice-wrapper" };
var _hoisted_28 = { class: "choice-wrapper" };
var _hoisted_29 = { class: "choice-wrapper" };
var _hoisted_30 = { class: "choice-wrapper" };
var _hoisted_31 = { class: "choice-wrapper" };
var _hoisted_32 = { class: "choice-wrapper" };
var _hoisted_33 = { class: "choice-wrapper" };
var _hoisted_34 = { class: "choice-wrapper" };
var _hoisted_35 = { class: "choice-wrapper" };
var _hoisted_36 = { class: "choice-wrapper" };
var _hoisted_37 = { class: "choice-wrapper" };
var _hoisted_38 = { class: "choice-wrapper" };
var _hoisted_39 = { class: "choice-wrapper" };
var _hoisted_40 = { class: "choice-wrapper" };
var _hoisted_41 = { class: "choice-wrapper" };
var _hoisted_42 = { class: "choice-wrapper" };
var _hoisted_43 = { class: "choice-wrapper" };
var _hoisted_44 = { class: "choice-wrapper" };
var _hoisted_45 = { class: "choice-wrapper" };
var _hoisted_46 = { class: "choice-wrapper" };
var _hoisted_47 = { class: "choice-wrapper" };
var _hoisted_48 = { class: "choice-wrapper" };
var _hoisted_49 = { class: "choice-wrapper" };
var _hoisted_50 = { class: "choice-wrapper" };
var _hoisted_51 = { class: "choice-wrapper" };
var _hoisted_52 = { class: "choice-wrapper" };
var _hoisted_53 = { class: "choice-wrapper" };
var _hoisted_54 = { class: "choice-wrapper" };
var _hoisted_55 = { class: "choice-wrapper" };
var _hoisted_56 = { class: "choice-wrapper" };
var _hoisted_57 = { class: "choice-wrapper" };
var _hoisted_58 = { class: "choice-wrapper" };
var _hoisted_59 = { class: "choice-wrapper" };
var _hoisted_60 = { class: "choice-wrapper" };
var _hoisted_61 = { class: "choice-wrapper" };
var _hoisted_62 = { class: "choice-wrapper" };
var _hoisted_63 = { class: "choice-wrapper" };
var _hoisted_64 = { class: "choice-wrapper" };
var _hoisted_65 = { class: "choice-wrapper" };
var _hoisted_66 = { class: "choice-wrapper" };
var _hoisted_67 = { class: "choice-wrapper" };
var _hoisted_68 = { class: "choice-wrapper" };
var _hoisted_69 = {
	key: 1,
	class: "tabs-block__content"
};
var _hoisted_70 = { class: "choice-wrapper" };
var _hoisted_71 = { class: "choice-wrapper" };
var _hoisted_72 = { class: "choice-wrapper" };
var _hoisted_73 = { class: "choice-wrapper" };
var _hoisted_74 = { class: "choice-wrapper" };
var _hoisted_75 = { class: "choice-wrapper" };
var _hoisted_76 = {
	key: 2,
	class: "tabs-block__content"
};
var _hoisted_77 = { class: "choice-wrapper" };
var _hoisted_78 = { class: "choice-wrapper" };
var _hoisted_79 = { class: "choice-wrapper" };
var _hoisted_80 = { class: "choice-wrapper" };
var _hoisted_81 = { class: "choice-wrapper" };
var _hoisted_82 = { class: "choice-wrapper" };
var _hoisted_83 = { class: "choice-wrapper" };
var _hoisted_84 = { class: "choice-wrapper" };
var _hoisted_85 = { class: "choice-wrapper" };
var _hoisted_86 = { class: "choice-wrapper" };
var _hoisted_87 = { class: "choice-wrapper" };
var _hoisted_88 = { class: "choice-wrapper" };
var _hoisted_89 = { class: "choice-wrapper" };
var _hoisted_90 = { class: "choice-wrapper" };
var _hoisted_91 = { class: "choice-wrapper" };
var _hoisted_92 = { class: "choice-wrapper" };
var _hoisted_93 = {
	key: 3,
	class: "tabs-block__content"
};
var _hoisted_94 = { class: "choice-wrapper" };
var _hoisted_95 = { class: "choice-wrapper" };
var _hoisted_96 = { class: "choice-wrapper" };
var _hoisted_97 = { class: "choice-wrapper" };
var _hoisted_98 = { class: "choice-wrapper" };
var _hoisted_99 = { class: "choice-wrapper" };
var _hoisted_100 = { class: "choice-wrapper" };
var _hoisted_101 = { class: "choice-wrapper" };
var _hoisted_102 = { class: "choice-wrapper" };
var _hoisted_103 = { class: "choice-wrapper" };
var _hoisted_104 = { class: "choice-wrapper" };
var _hoisted_105 = { class: "choice-wrapper" };
var _hoisted_106 = {
	key: 4,
	class: "tabs-block__content"
};
var _hoisted_107 = { class: "choice-wrapper" };
var _hoisted_108 = { class: "choice-wrapper" };
var _hoisted_109 = { class: "choice-wrapper" };
var _hoisted_110 = { class: "choice-wrapper" };
var _hoisted_111 = { class: "choice-wrapper" };
var _hoisted_112 = { class: "choice-wrapper" };
var _hoisted_113 = { class: "choice-wrapper" };
var _hoisted_114 = { class: "choice-wrapper" };
var _hoisted_115 = { class: "choice-wrapper" };
var _hoisted_116 = { class: "choice-wrapper" };
var _hoisted_117 = { class: "choice-wrapper" };
var _hoisted_118 = { class: "choice-wrapper" };
var _hoisted_119 = { class: "choice-wrapper" };
var _hoisted_120 = { class: "choice-wrapper" };
var _hoisted_121 = {
	key: 5,
	class: "tabs-block__content"
};
var _hoisted_122 = { class: "choice-wrapper" };
var _hoisted_123 = { class: "choice-wrapper" };
var _hoisted_124 = { class: "choice-wrapper" };
var _hoisted_125 = { class: "choice-wrapper" };
var _hoisted_126 = { class: "choice-wrapper" };
var _hoisted_127 = {
	key: 6,
	class: "tabs-block__content"
};
var _hoisted_128 = { class: "choice-wrapper" };
var _hoisted_129 = { class: "choice-wrapper" };
var _hoisted_130 = { class: "choice-wrapper" };
var _hoisted_131 = { class: "choice-wrapper" };
var _hoisted_132 = { class: "choice-wrapper" };
var _hoisted_133 = { class: "choice-wrapper" };
var _hoisted_134 = { class: "choice-wrapper" };
var _hoisted_135 = { class: "choice-wrapper" };
var _hoisted_136 = { class: "choice-wrapper" };
var _hoisted_137 = { class: "choice-wrapper" };
var _hoisted_138 = {
	key: 7,
	class: "tabs-block__content"
};
var _hoisted_139 = { class: "choice-wrapper" };
var _hoisted_140 = { class: "choice-wrapper" };
var _hoisted_141 = { class: "choice-wrapper" };
var _hoisted_142 = { class: "choice-wrapper" };
var _hoisted_143 = { class: "choice-wrapper" };
var _hoisted_144 = { class: "choice-wrapper" };
var _hoisted_145 = { class: "choice-wrapper" };
var CalculPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "CalculPage",
	setup(__props) {
		const tabs = [
			{
				id: "sites",
				name: "САЙТЫ"
			},
			{
				id: "mobile",
				name: "МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ"
			},
			{
				id: "programming",
				name: "ПРОГРАММИРОВАНИЕ"
			},
			{
				id: "content",
				name: "КОНТЕНТ"
			},
			{
				id: "smm",
				name: "РЕКЛАМА И SMM"
			},
			{
				id: "seo",
				name: "SEO-ПРОДВИЖЕНИЕ"
			},
			{
				id: "design",
				name: "ДИЗАЙН"
			},
			{
				id: "services",
				name: "УСЛУГИ"
			}
		];
		const activeTab = /* @__PURE__ */ ref("sites");
		const selectedPackage = /* @__PURE__ */ ref(null);
		const packagePrice = /* @__PURE__ */ ref(0);
		const selectPackage = (id, price) => {
			selectedType.value = null;
			selectedShop.value = null;
			selectedMobile.value = null;
			typePrice.value = 0;
			shopPrice.value = 0;
			mobilePrice.value = 0;
			selectedPackage.value = id;
			packagePrice.value = price;
		};
		const selectedType = /* @__PURE__ */ ref(null);
		const typePrice = /* @__PURE__ */ ref(0);
		const selectType = (id, price) => {
			selectedPackage.value = null;
			packagePrice.value = 0;
			selectedType.value = id;
			typePrice.value = price;
		};
		const selectedSize = /* @__PURE__ */ ref(null);
		const sizePrice = /* @__PURE__ */ ref(0);
		const selectSize = (id, price) => {
			selectedPackage.value = null;
			packagePrice.value = 0;
			selectedType.value = id;
			sizePrice.value = price;
		};
		const selectedPack = /* @__PURE__ */ ref(null);
		const packPrice = /* @__PURE__ */ ref(0);
		const selectPack = (id, price) => {
			selectedPackage.value = null;
			packagePrice.value = 0;
			selectedPack.value = id;
			packPrice.value = price;
		};
		const selectedDop = /* @__PURE__ */ ref(null);
		const dopPrice = /* @__PURE__ */ ref(0);
		const selectDop = (id, price) => {
			selectedPackage.value = null;
			packagePrice.value = 0;
			selectedDop.value = id;
			dopPrice.value = price;
		};
		const selectedMobiles = /* @__PURE__ */ ref(null);
		const mobilesPrice = /* @__PURE__ */ ref(0);
		const selectMobiles = (id, price) => {
			selectedPackage.value = null;
			packagePrice.value = 0;
			selectedMobiles.value = id;
			mobilesPrice.value = price;
		};
		const selectedContent = /* @__PURE__ */ ref(null);
		const contentPrice = /* @__PURE__ */ ref(0);
		const selectContent = (id, price) => {
			selectedPackage.value = null;
			packagePrice.value = 0;
			selectedContent.value = id;
			contentPrice.value = price;
		};
		const selectedMobile = /* @__PURE__ */ ref(null);
		const mobilePrice = /* @__PURE__ */ ref(0);
		const selectMobile = (id, price) => {
			selectedPackage.value = null;
			packagePrice.value = 0;
			selectedMobile.value = id;
			mobilePrice.value = price;
		};
		const selectedShop = /* @__PURE__ */ ref(null);
		const shopPrice = /* @__PURE__ */ ref(0);
		const selectShop = (id, price) => {
			selectedPackage.value = null;
			packagePrice.value = 0;
			if (selectedShop.value === id) {
				selectedShop.value = null;
				shopPrice.value = 0;
			} else {
				selectedShop.value = id;
				shopPrice.value = price;
			}
		};
		const isOpen = /* @__PURE__ */ ref(false);
		const togglePackages = () => {
			isOpen.value = !isOpen.value;
		};
		const selectedServices = /* @__PURE__ */ ref([]);
		const toggleService = (id, price) => {
			const index = selectedServices.value.findIndex((item) => item.id === id);
			if (index !== -1) selectedServices.value.splice(index, 1);
			else selectedServices.value.push({
				id,
				price
			});
		};
		const clearAll = () => {
			selectedPackage.value = null;
			packagePrice.value = 0;
			selectedType.value = null;
			selectedMobiles.value = null;
			selectedContent.value = null;
			selectedPack.value = null;
			selectedDop.value = null;
			selectedSize.value = null;
			typePrice.value = 0;
			sizePrice.value = 0;
			dopPrice.value = 0;
			contentPrice.value = 0;
			packPrice.value = 0;
			selectedShop.value = null;
			shopPrice.value = 0;
			selectedServices.value = [];
		};
		const totalPrice = computed(() => {
			let total = 0;
			total += packagePrice.value;
			total += typePrice.value;
			total += shopPrice.value;
			total += mobilesPrice.value;
			total += contentPrice.value;
			total += packPrice.value;
			total += dopPrice.value;
			total += sizePrice.value;
			selectedServices.value.forEach((item) => {
				total += item.price;
			});
			return total;
		});
		const isFormOpen = /* @__PURE__ */ ref(false);
		const openForm = () => {
			isFormOpen.value = true;
		};
		const closeForm = () => {
			isFormOpen.value = false;
		};
		return (_ctx, _cache) => {
			const _component_router_link = resolveComponent("router-link");
			return openBlock(), createElementBlock("div", _hoisted_1$4, [createBaseVNode("div", _hoisted_2$3, [
				createBaseVNode("div", _hoisted_3$3, [createVNode(_component_router_link, { to: "/" }, {
					default: withCtx(() => [..._cache[130] || (_cache[130] = [createBaseVNode("svg", {
						width: "35",
						height: "58",
						viewBox: "0 0 35 58",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg"
					}, [createBaseVNode("path", {
						d: "M30.999 54.5L4.99902 28.3108L30.999 3.5",
						stroke: "white",
						"stroke-width": "7",
						"stroke-linecap": "round"
					})], -1)])]),
					_: 1
				}), _cache[131] || (_cache[131] = createBaseVNode("div", { class: "title" }, [createBaseVNode("h1", null, "КАЛЬКУЛЯТОР")], -1))]),
				createBaseVNode("div", _hoisted_4$2, [createBaseVNode("div", {
					class: "btn",
					onClick: clearAll
				}, [..._cache[132] || (_cache[132] = [createBaseVNode("span", { class: "del-text" }, "Очистить", -1)])]), createBaseVNode("div", _hoisted_5$1, [
					createBaseVNode("div", _hoisted_6$1, [
						_cache[133] || (_cache[133] = createBaseVNode("span", { class: "cost-title" }, "ЦЕНА:", -1)),
						createBaseVNode("span", _hoisted_7$1, toDisplayString(totalPrice.value), 1),
						_cache[134] || (_cache[134] = createBaseVNode("span", { class: "cost-title" }, "₽", -1))
					]),
					createBaseVNode("div", {
						class: "btn",
						onClick: openForm
					}, [..._cache[135] || (_cache[135] = [createBaseVNode("span", { class: "cost-text" }, "ДАЛЕЕ", -1)])]),
					isFormOpen.value ? (openBlock(), createElementBlock("div", {
						key: 0,
						class: "form-modal",
						onClick: closeForm
					}, [createBaseVNode("div", {
						class: "form-modal__content",
						onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"]))
					}, [createBaseVNode("button", {
						class: "form-modal__close",
						onClick: closeForm
					}, "✕"), createVNode(FormMiddle_default, {
						title: "СДЕЛАТЬ ЗАКАЗ",
						"background-image": "@/image/form.jpg"
					})])])) : createCommentVNode("", true)
				])]),
				createBaseVNode("div", _hoisted_8, [createBaseVNode("div", _hoisted_9, [createBaseVNode("ul", _hoisted_10, [(openBlock(), createElementBlock(Fragment, null, renderList(tabs, (tab) => {
					return createBaseVNode("li", {
						key: tab.id,
						class: normalizeClass(["tabs-block__item", { "tabs-block__item--active": activeTab.value === tab.id }]),
						onClick: ($event) => activeTab.value = tab.id
					}, [createBaseVNode("span", _hoisted_12, toDisplayString(tab.name), 1)], 10, _hoisted_11);
				}), 64))])]), createBaseVNode("div", _hoisted_13, [activeTab.value === "sites" ? (openBlock(), createElementBlock("div", _hoisted_14, [
					createBaseVNode("div", {
						class: "package-down",
						onClick: togglePackages
					}, [_cache[137] || (_cache[137] = createBaseVNode("span", { class: "mini-title" }, "Выбрать готовый пакет", -1)), (openBlock(), createElementBlock("svg", {
						width: "33",
						height: "19",
						class: normalizeClass({ "package-down__arrow--open": isOpen.value }),
						viewBox: "0 0 33 19",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg"
					}, [..._cache[136] || (_cache[136] = [createBaseVNode("path", {
						d: "M31 2L16.1081 16L2 2",
						stroke: "white",
						"stroke-width": "4",
						"stroke-linecap": "round"
					}, null, -1)])], 2))]),
					withDirectives(createBaseVNode("div", _hoisted_15, [
						createVNode(Package_default, {
							title: "ЭКОНОМ",
							text: "Сайт без адаптива по макету без возможности заказывать и оплачивать товары и услуги; хостинг + домен.RU",
							price: "31 000",
							"is-active": selectedPackage.value === "econom",
							onSelect: _cache[1] || (_cache[1] = ($event) => selectPackage("econom", 31e3))
						}, null, 8, ["is-active"]),
						createVNode(Package_default, {
							title: "ЭКСКЛЮЗИВ",
							text: "Эксклюзивный сайт без адаптива без возможности заказывать и оплачивать товары и услуги; хостинг + домен.RU",
							price: "41 000",
							"is-active": selectedPackage.value === "exclusive",
							onSelect: _cache[2] || (_cache[2] = ($event) => selectPackage("exclusive", 41e3))
						}, null, 8, ["is-active"]),
						createVNode(Package_default, {
							title: "ВИТРИНА",
							text: "Эксклюзивный сайт без адаптива без возможности заказывать и оплачивать товары и услуги; панель продаж",
							price: "45 000",
							"is-active": selectedPackage.value === "showcase",
							onSelect: _cache[3] || (_cache[3] = ($event) => selectPackage("showcase", 45e3))
						}, null, 8, ["is-active"]),
						createVNode(Package_default, {
							title: "МАГАЗИН",
							text: "Эксклюзивный сайт (интернет-магазин) без адаптива с возможностью заказывать и оплачивать товары и услуги",
							price: "70 000",
							"is-active": selectedPackage.value === "shop",
							onSelect: _cache[4] || (_cache[4] = ($event) => selectPackage("shop", 7e4))
						}, null, 8, ["is-active"]),
						createVNode(Package_default, {
							title: "МАГАЗИН 1С",
							text: "Эксклюзивный интернет-магазин 1С Битрикс без адаптива с возможностью заказывать и оплачивать товары и услуги",
							price: "105 000",
							"is-active": selectedPackage.value === "shop1с",
							onSelect: _cache[5] || (_cache[5] = ($event) => selectPackage("shop1с", 105e3))
						}, null, 8, ["is-active"]),
						createVNode(Package_default, {
							title: "VIP",
							text: "Эксклюзивный адаптивный интернет-магазин 1С Битрикс; платёжная система; интеграция с Яндекс Маркет; фильтр, корзина, поиск-фильтр товаров, топ и сравнение, избранное",
							price: "227 000",
							"is-active": selectedPackage.value === "vip",
							onSelect: _cache[6] || (_cache[6] = ($event) => selectPackage("vip", 227e3))
						}, null, 8, ["is-active"])
					], 512), [[vShow, isOpen.value]]),
					createBaseVNode("div", _hoisted_16, [createVNode(Radio_default, {
						"is-active": selectedType.value === "maket",
						onSelect: _cache[7] || (_cache[7] = ($event) => selectType("maket", 25e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "сайт по макету",
						text: "1 из 300 макетов на выбор, замена текста и картинок, сборка сайта, сборка системы",
						price: "25 000"
					})]),
					createBaseVNode("div", _hoisted_17, [createVNode(Radio_default, {
						"is-active": selectedType.value === "exclusive",
						onSelect: _cache[8] || (_cache[8] = ($event) => selectType("exclusive", 35e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "ЭКСКЛЮЗИВНЫЙ САЙТ",
						text: "Эксклюзивный дизайн, сборка сайта, сборка системы",
						price: "35 000"
					})]),
					_cache[138] || (_cache[138] = createBaseVNode("span", { class: "mini-title" }, "магазин:", -1)),
					createBaseVNode("div", _hoisted_18, [createVNode(Radio_default, {
						"is-active": selectedShop.value === "online-shop",
						onSelect: _cache[9] || (_cache[9] = ($event) => selectShop("online-shop", 25e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "интернет магазин",
						text: "на CMS Joomla / Wordpress, предоставляет возможность заказывать товары и услуги",
						price: "25 000"
					})]),
					createBaseVNode("div", _hoisted_19, [createVNode(Radio_default, {
						"is-active": selectedShop.value === "online-shop1c",
						onSelect: _cache[10] || (_cache[10] = ($event) => selectShop("online-shop1c", 6e4))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Интернет-магазин 1С Битрикс",
						text: "на CMS 1C Bitrix, предоставляет возможность заказывать товары и услуги",
						price: "60 000"
					})]),
					createBaseVNode("div", _hoisted_20, [createVNode(Radio_default, {
						"is-active": selectedShop.value === "online-shop1c2",
						onSelect: _cache[11] || (_cache[11] = ($event) => selectShop("online-shop1c2", 85e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Интернет-магазин 1С Битрикс (с интеграцией 1С)",
						text: "на CMS 1C Bitrix + интеграция с 1С пакетами, предоставляет возможность заказывать товары и услуги, а так же синхронизировать все товары и заказы с вашей 1С",
						price: "85 000"
					})]),
					createBaseVNode("div", _hoisted_21, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "yandex"),
						onToggle: _cache[12] || (_cache[12] = ($event) => toggleService("yandex", 25e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "интеграция с Яндекс Маркет",
						text: "",
						price: "25 000"
					})]),
					createBaseVNode("div", _hoisted_22, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "pay"),
						onToggle: _cache[13] || (_cache[13] = ($event) => toggleService("pay", 1e4))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "платёжная система",
						text: "Сбербанк, Яндекс.Касса, РобоКасса, Платрон",
						price: "10 000"
					})]),
					createBaseVNode("div", _hoisted_23, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "filtr"),
						onToggle: _cache[14] || (_cache[14] = ($event) => toggleService("filtr", 25e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "фильтр",
						text: "Умная фильтрация товаров в списке",
						price: "25 000"
					})]),
					createBaseVNode("div", _hoisted_24, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "cap"),
						onToggle: _cache[15] || (_cache[15] = ($event) => toggleService("cap", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Корзина на AJAX",
						text: "Возможность добавления товаров и услуг в корзину без перезагрузки страницы, в реальном времени.",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_25, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "search"),
						onToggle: _cache[16] || (_cache[16] = ($event) => toggleService("search", 6e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Поиск-фильтр на AJAX",
						text: "Поиск и показ товаров и услуг без перезагрузки страницы",
						price: "6 000"
					})]),
					createBaseVNode("div", _hoisted_26, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "top"),
						onToggle: _cache[17] || (_cache[17] = ($event) => toggleService("top", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Топ товаров",
						text: "Вывод отдельного списка необходимых товаров: популярные, акционные, сортировка по различным полям",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_27, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "compari"),
						onToggle: _cache[18] || (_cache[18] = ($event) => toggleService("compari", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Сравнение товаров",
						text: "Возможность сравнения нескольких выбранных товаров",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_28, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "like"),
						onToggle: _cache[19] || (_cache[19] = ($event) => toggleService("like", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Избранные товары",
						text: "Возможность добавлять товары и услуги в избранные",
						price: "4 000"
					})]),
					_cache[139] || (_cache[139] = createBaseVNode("span", { class: "mini-title" }, "Мобильная версия:", -1)),
					createBaseVNode("div", _hoisted_29, [createVNode(Radio_default, {
						"is-active": selectedMobile.value === "adaptive",
						onSelect: _cache[20] || (_cache[20] = ($event) => selectMobile("adaptive", 25e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "интернет магазин",
						text: "на CMS Joomla / Wordpress, предоставляет возможность заказывать товары и услуги",
						price: "25 000"
					})]),
					createBaseVNode("div", _hoisted_30, [createVNode(Radio_default, {
						"is-active": selectedMobile.value === "not-adaptive",
						onSelect: _cache[21] || (_cache[21] = ($event) => selectMobile("not-adaptive", 25e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "интернет магазин",
						text: "на CMS Joomla / Wordpress, предоставляет возможность заказывать товары и услуги",
						price: "25 000"
					})]),
					_cache[140] || (_cache[140] = createBaseVNode("span", { class: "mini-title" }, "Дополнительный функционал:", -1)),
					createBaseVNode("div", _hoisted_31, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "panel"),
						onToggle: _cache[22] || (_cache[22] = ($event) => toggleService("panel", 1e4))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Панель продаж",
						text: "Панель с вашими товарами и услугами, направленные на продажу. Грамотно структурированная и красиво оформленная.",
						price: "10 000"
					})]),
					createBaseVNode("div", _hoisted_32, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "animation"),
						onToggle: _cache[23] || (_cache[23] = ($event) => toggleService("animation", 1e4))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Функциональная анимация",
						text: "Динамическое разнообразие в интерфейсе, реактивные элементы, приятное взаимодействие",
						price: "10 000"
					})]),
					createBaseVNode("div", _hoisted_33, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "turbo"),
						onToggle: _cache[24] || (_cache[24] = ($event) => toggleService("turbo", 1e4))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Турбо-страница (прайс-лист)",
						text: "HTML-страница с прайс-листом продвигаемых товаров и услуг",
						price: "10 000"
					})]),
					_cache[141] || (_cache[141] = createBaseVNode("span", { class: "mini-title" }, "Инструменты имиджа:", -1)),
					createBaseVNode("div", _hoisted_34, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "banner"),
						onToggle: _cache[25] || (_cache[25] = ($event) => toggleService("banner", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Схемы и баннеры с преимуществами фирмы",
						text: "",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_35, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "banners2"),
						onToggle: _cache[26] || (_cache[26] = ($event) => toggleService("banners2", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Схема работы фирмы в виде баннеров",
						text: "",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_36, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "slider"),
						onToggle: _cache[27] || (_cache[27] = ($event) => toggleService("slider", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Слайдер с партнёрами",
						text: "",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_37, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "portfolio"),
						onToggle: _cache[28] || (_cache[28] = ($event) => toggleService("portfolio", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Презентация работ в галерее или слайдере",
						text: "+ описание для каждой работы",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_38, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "video"),
						onToggle: _cache[29] || (_cache[29] = ($event) => toggleService("video", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Видео-отчёт об объектах в галерее",
						text: "",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_39, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "sertif"),
						onToggle: _cache[30] || (_cache[30] = ($event) => toggleService("sertif", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Всплывающие сертификаты",
						text: "или награды, или рейтинги",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_40, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "head"),
						onToggle: _cache[31] || (_cache[31] = ($event) => toggleService("head", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Закреплённая шапка с контактами",
						text: "Остается на экране при прокрутке сайта",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_41, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "modal"),
						onToggle: _cache[32] || (_cache[32] = ($event) => toggleService("modal", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Кнопка с модальным окном",
						text: "с Видео-обращение директора, с рекламой фирмы, с ТВ передачей и прочим",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_42, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "otziv"),
						onToggle: _cache[33] || (_cache[33] = ($event) => toggleService("otziv", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Отзывы с админ-панелью",
						text: "Включать/отключать, редактировать, удалять",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_43, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "video-otziv"),
						onToggle: _cache[34] || (_cache[34] = ($event) => toggleService("video-otziv", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Видео-отзывы",
						text: "",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_44, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "audio"),
						onToggle: _cache[35] || (_cache[35] = ($event) => toggleService("audio", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Аудио-отзывы",
						text: "",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_45, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "hello"),
						onToggle: _cache[36] || (_cache[36] = ($event) => toggleService("hello", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Видеоряд на фон первого блока",
						text: "Нарезка, подбор",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_46, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "desk"),
						onToggle: _cache[37] || (_cache[37] = ($event) => toggleService("desk", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Доска почёта",
						text: "Показывает работников, их стаж и достижения",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_47, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "info"),
						onToggle: _cache[38] || (_cache[38] = ($event) => toggleService("info", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Инфографика блока о компании",
						text: "Обращение директора с достижениями и шкалой по годам",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_48, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "plus"),
						onToggle: _cache[39] || (_cache[39] = ($event) => toggleService("plus", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Слайдеры с плюсами фирмы",
						text: "До 4 слайдеров",
						price: "4 000"
					})]),
					_cache[142] || (_cache[142] = createBaseVNode("span", { class: "mini-title" }, "Инструменты представления товаров и услуг:", -1)),
					createBaseVNode("div", _hoisted_49, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "spec"),
						onToggle: _cache[40] || (_cache[40] = ($event) => toggleService("spec", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Презентация спецпредложений товаров",
						text: "До 4 слайдеров, новинок или схем преимуществ товара, возможна форма связи",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_50, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "spec-baner"),
						onToggle: _cache[41] || (_cache[41] = ($event) => toggleService("spec-baner", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "До 3-х подталкивающих имиджевых баннеров-спецпредложений",
						text: "Предоставляются по основным 3-м товарам на всю ширину. Разбросаны по странице. Для акцентирования на конкретных товарах.",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_51, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "price"),
						onToggle: _cache[42] || (_cache[42] = ($event) => toggleService("price", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Минимальные цены - прайс (выдвижной слайдер)",
						text: "Предоставляется при отсутствии панели продаж.",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_52, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "sale"),
						onToggle: _cache[43] || (_cache[43] = ($event) => toggleService("sale", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "До 4 баннеров с акциями, спецпредложениями и скидками",
						text: "Добавляются с кнопкой, подталкивающей к действию и всплывающей формой.",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_53, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "block"),
						onToggle: _cache[44] || (_cache[44] = ($event) => toggleService("block", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Блок для улучшения поведенческих факторов",
						text: "Фишки - интересные вопросы по услугам, возникающие у клиентов, форма связи",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_54, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "slide-new"),
						onToggle: _cache[45] || (_cache[45] = ($event) => toggleService("slide-new", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Слайдеры- товары со скидками, новинки, популярные внутри сайта",
						text: "",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_55, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "cart"),
						onToggle: _cache[46] || (_cache[46] = ($event) => toggleService("cart", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Отрисовка карточки товара",
						text: "Производится при отсутствии магазина для представления товаров до 8 штук",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_56, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "photo"),
						onToggle: _cache[47] || (_cache[47] = ($event) => toggleService("photo", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Фотогалерея имиджевых объектов или продуции с подписями",
						text: "",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_57, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "promo"),
						onToggle: _cache[48] || (_cache[48] = ($event) => toggleService("promo", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Видео-презентация продукции",
						text: "Создается в виде блоков, а также всплывающих окон с видео.",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_58, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "draw"),
						onToggle: _cache[49] || (_cache[49] = ($event) => toggleService("draw", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Отрисовка баннеров с разделами продукции",
						text: "",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_59, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "reverse"),
						onToggle: _cache[50] || (_cache[50] = ($event) => toggleService("reverse", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Акция распродажа - Обратный отсчёт",
						text: "",
						price: "4 000"
					})]),
					_cache[143] || (_cache[143] = createBaseVNode("span", { class: "mini-title" }, "Инструменты подталкивающие к действиям:", -1)),
					createBaseVNode("div", _hoisted_60, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "important"),
						onToggle: _cache[51] || (_cache[51] = ($event) => toggleService("important", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Важная информация в шапке+закреплённая шапка при движении страницы вниз",
						text: "Вся контактная информация копируемая в шапке",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_61, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "btn"),
						onToggle: _cache[52] || (_cache[52] = ($event) => toggleService("btn", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Сквозные кнопки вызывающие формы заказа около всех баннеров",
						text: "Предлагается оставить телефон или почту",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_62, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "form"),
						onToggle: _cache[53] || (_cache[53] = ($event) => toggleService("form", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Сквозные интегрированные формы связи-заказа вверху, по середине, в низу сайта",
						text: "",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_63, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "lang"),
						onToggle: _cache[54] || (_cache[54] = ($event) => toggleService("lang", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Язычки закреплённые справа или слева вызывают форму заказа по клику на спецпредлложениям",
						text: "",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_64, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "chat"),
						onToggle: _cache[55] || (_cache[55] = ($event) => toggleService("chat", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Онлайн общение - чат с посетителями с роботом начинающим разговор",
						text: "",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_65, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "email"),
						onToggle: _cache[56] || (_cache[56] = ($event) => toggleService("email", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "До 3х всплывающих форм-тизеров с предложениями с целью получить почту или телефон",
						text: "",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_66, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "city"),
						onToggle: _cache[57] || (_cache[57] = ($event) => toggleService("city", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Стилизованная интерактивная карта с точками продаж в городах или офисы по городу",
						text: "",
						price: "4 000"
					})]),
					_cache[144] || (_cache[144] = createBaseVNode("span", { class: "mini-title" }, "Сервер:", -1)),
					createBaseVNode("div", _hoisted_67, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "domain"),
						onToggle: _cache[58] || (_cache[58] = ($event) => toggleService("domain", 1e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Дополнительный домен",
						text: "",
						price: "1 000"
					})]),
					createBaseVNode("div", _hoisted_68, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "domain2"),
						onToggle: _cache[59] || (_cache[59] = ($event) => toggleService("domain2", 6e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Хостинг + Домен .RU",
						text: "",
						price: "6 000"
					})])
				])) : activeTab.value === "mobile" ? (openBlock(), createElementBlock("div", _hoisted_69, [
					createBaseVNode("div", _hoisted_70, [createVNode(Radio_default, {
						"is-active": selectedMobiles.value === "ios",
						onSelect: _cache[60] || (_cache[60] = ($event) => selectMobiles("ios", 15e4))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "iOS (без админ-панели)",
						text: "",
						price: "150 000"
					})]),
					createBaseVNode("div", _hoisted_71, [createVNode(Radio_default, {
						"is-active": selectedMobiles.value === "android",
						onSelect: _cache[61] || (_cache[61] = ($event) => selectMobiles("android", 15e4))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Android (без админ-панели)",
						text: "",
						price: "150 000"
					})]),
					createBaseVNode("div", _hoisted_72, [createVNode(Radio_default, {
						"is-active": selectedMobiles.value === "ios-android",
						onSelect: _cache[62] || (_cache[62] = ($event) => selectMobiles("ios-android", 25e4))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "iOS & Android (без админ-панели)",
						text: "",
						price: "250 000"
					})]),
					createBaseVNode("div", _hoisted_73, [createVNode(Radio_default, {
						"is-active": selectedMobiles.value === "ios2",
						onSelect: _cache[63] || (_cache[63] = ($event) => selectMobiles("ios2", 3e5))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "iOS (с админ-панелью)",
						text: "",
						price: "300 000"
					})]),
					createBaseVNode("div", _hoisted_74, [createVNode(Radio_default, {
						"is-active": selectedMobiles.value === "android2",
						onSelect: _cache[64] || (_cache[64] = ($event) => selectMobiles("android2", 3e5))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Android (с админ-панелью)",
						text: "",
						price: "300 000"
					})]),
					createBaseVNode("div", _hoisted_75, [createVNode(Radio_default, {
						"is-active": selectedMobiles.value === "ios-android2",
						onSelect: _cache[65] || (_cache[65] = ($event) => selectMobiles("ios-android2", 5e5))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "iOS & Android (с админ-панелью)",
						text: "",
						price: "500 000"
					})])
				])) : activeTab.value === "programming" ? (openBlock(), createElementBlock("div", _hoisted_76, [
					createBaseVNode("div", _hoisted_77, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "develop"),
						onToggle: _cache[66] || (_cache[66] = ($event) => toggleService("develop", 1e5))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Разработка уникальных систем",
						text: "",
						price: "100 000"
					})]),
					createBaseVNode("div", _hoisted_78, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "spid"),
						onToggle: _cache[67] || (_cache[67] = ($event) => toggleService("spid", 8e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Оптимизация скорости сайта",
						text: "Web-мастеринг",
						price: "8 000"
					})]),
					createBaseVNode("div", _hoisted_79, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "develop2"),
						onToggle: _cache[68] || (_cache[68] = ($event) => toggleService("develop2", 1e4))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Разработка модулей и компонентов",
						text: "",
						price: "10 000"
					})]),
					createBaseVNode("div", _hoisted_80, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "calc"),
						onToggle: _cache[69] || (_cache[69] = ($event) => toggleService("calc", 8e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Калькуляторы",
						text: "",
						price: "8 000"
					})]),
					createBaseVNode("div", _hoisted_81, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "analysis"),
						onToggle: _cache[70] || (_cache[70] = ($event) => toggleService("analysis", 0))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Анализ сайта",
						text: "",
						price: "0"
					})]),
					createBaseVNode("div", _hoisted_82, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "modification"),
						onToggle: _cache[71] || (_cache[71] = ($event) => toggleService("modification", 5e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Доработка функционала",
						text: "",
						price: "5 000"
					})]),
					createBaseVNode("div", _hoisted_83, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "import"),
						onToggle: _cache[72] || (_cache[72] = ($event) => toggleService("import", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Импорт/Экспорт",
						text: "Фид-файлы для сервисов",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_84, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "api"),
						onToggle: _cache[73] || (_cache[73] = ($event) => toggleService("api", 1e4))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Интеграция через API",
						text: "",
						price: "10 000"
					})]),
					createBaseVNode("div", _hoisted_85, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "pdf"),
						onToggle: _cache[74] || (_cache[74] = ($event) => toggleService("pdf", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Генерация PDF",
						text: "",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_86, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "pars"),
						onToggle: _cache[75] || (_cache[75] = ($event) => toggleService("pars", 5e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Парсинг сайтов",
						text: "",
						price: "5 000"
					})]),
					createBaseVNode("div", _hoisted_87, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "SMS"),
						onToggle: _cache[76] || (_cache[76] = ($event) => toggleService("SMS", 1e4))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Подключение SMS-рассылки",
						text: "",
						price: "10 000"
					})]),
					createBaseVNode("div", _hoisted_88, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "email2"),
						onToggle: _cache[77] || (_cache[77] = ($event) => toggleService("email2", 8e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Подключение E-mail-рассылки",
						text: "",
						price: "8 000"
					})]),
					createBaseVNode("div", _hoisted_89, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "develop"),
						onToggle: _cache[78] || (_cache[78] = ($event) => toggleService("like", 1e5))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Разработка уникальных систем",
						text: "",
						price: "100 000"
					})]),
					createBaseVNode("div", _hoisted_90, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "mikro"),
						onToggle: _cache[79] || (_cache[79] = ($event) => toggleService("mikro", 5e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Внедрение микроразметки",
						text: "(schema.org, openGraph)",
						price: "5 000"
					})]),
					createBaseVNode("div", _hoisted_91, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "doc"),
						onToggle: _cache[80] || (_cache[80] = ($event) => toggleService("doc", 5e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Лечение сайта",
						text: "",
						price: "5 000"
					})]),
					createBaseVNode("div", _hoisted_92, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "capcha"),
						onToggle: _cache[81] || (_cache[81] = ($event) => toggleService("capcha", 2e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Установка капчи",
						text: "",
						price: "2 000"
					})])
				])) : activeTab.value === "content" ? (openBlock(), createElementBlock("div", _hoisted_93, [
					_cache[145] || (_cache[145] = createBaseVNode("p", null, "1 страница А4 составляет до 28 строк и от 1 до 5 фото. Стоимость указана за страницу", -1)),
					_cache[146] || (_cache[146] = createBaseVNode("span", { class: "mini-title" }, "Заполнение страниц:", -1)),
					createBaseVNode("div", _hoisted_94, [createVNode(Radio_default, {
						"is-active": selectedContent.value === "1-100",
						onSelect: _cache[82] || (_cache[82] = ($event) => selectContent("1-100", 300))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "от 1 до 100 страниц",
						text: "(перенос с сайта)",
						price: "300"
					})]),
					createBaseVNode("div", _hoisted_95, [createVNode(Radio_default, {
						"is-active": selectedContent.value === "100-300",
						onSelect: _cache[83] || (_cache[83] = ($event) => selectContent("100-300", 250))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "от 100 до 300 страниц",
						text: "(перенос с сайта)",
						price: "250"
					})]),
					createBaseVNode("div", _hoisted_96, [createVNode(Radio_default, {
						"is-active": selectedContent.value === "300+",
						onSelect: _cache[84] || (_cache[84] = ($event) => selectContent("300+", 200))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "от 300 страниц",
						text: "(перенос с сайта)",
						price: "200"
					})]),
					createBaseVNode("div", _hoisted_97, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "scaner"),
						onToggle: _cache[85] || (_cache[85] = ($event) => toggleService("scaner", 500))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Перенос текста с картинками со сканера",
						text: "",
						price: "500"
					})]),
					createBaseVNode("div", _hoisted_98, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "katalog"),
						onToggle: _cache[86] || (_cache[86] = ($event) => toggleService("katalog", 150))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Перенос каталога с другого сайта",
						text: "при переходе к нам на нашу систему",
						price: "150"
					})]),
					createBaseVNode("div", _hoisted_99, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "print"),
						onToggle: _cache[87] || (_cache[87] = ($event) => toggleService("print", 500))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Печать текста вручную",
						text: "При переносе из Excel или рукописного текста",
						price: "500"
					})]),
					createBaseVNode("div", _hoisted_100, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "gallery"),
						onToggle: _cache[88] || (_cache[88] = ($event) => toggleService("gallery", 1e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Галерея без подписей",
						text: "Стандартная, всплывающая, до 20 картинок",
						price: "1 000"
					})]),
					createBaseVNode("div", _hoisted_101, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "gallery2"),
						onToggle: _cache[89] || (_cache[89] = ($event) => toggleService("gallery2", 2e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Галерея с подписями",
						text: "Стандартная, всплывающая, до 20 картинок",
						price: "2 000"
					})]),
					_cache[147] || (_cache[147] = createBaseVNode("span", { class: "mini-title" }, "Заполнение каталога:", -1)),
					createBaseVNode("div", _hoisted_102, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "S"),
						onToggle: _cache[90] || (_cache[90] = ($event) => toggleService("S", 50))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Карточка каталога S",
						text: "Название с ценой и без",
						price: "50"
					})]),
					createBaseVNode("div", _hoisted_103, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "M"),
						onToggle: _cache[91] || (_cache[91] = ($event) => toggleService("M", 100))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Карточка каталога M",
						text: "Название с ценой + картинка",
						price: "100"
					})]),
					createBaseVNode("div", _hoisted_104, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "L"),
						onToggle: _cache[92] || (_cache[92] = ($event) => toggleService("L", 150))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Карточка каталога L",
						text: "Название с ценой + картинка + краткое описание",
						price: "150"
					})]),
					createBaseVNode("div", _hoisted_105, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "XL"),
						onToggle: _cache[93] || (_cache[93] = ($event) => toggleService("XL", 300))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Карточка каталога XL",
						text: "Название с ценой + картинка + краткое и полное описание",
						price: "300"
					})])
				])) : activeTab.value === "smm" ? (openBlock(), createElementBlock("div", _hoisted_106, [
					_cache[148] || (_cache[148] = createBaseVNode("span", { class: "mini-title" }, "Пакеты:", -1)),
					createBaseVNode("div", _hoisted_107, [createVNode(Radio_default, {
						"is-active": selectedPack.value === "baze",
						onSelect: _cache[94] || (_cache[94] = ($event) => selectPack("baze", 0))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Базовый",
						text: "",
						price: "0"
					})]),
					createBaseVNode("div", _hoisted_108, [createVNode(Radio_default, {
						"is-active": selectedPack.value === "advanc",
						onSelect: _cache[95] || (_cache[95] = ($event) => selectPack("advanc", 0))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Продвинутый",
						text: "",
						price: "0"
					})]),
					_cache[149] || (_cache[149] = createBaseVNode("span", { class: "mini-title" }, "Реклама Яндекс и Google:", -1)),
					createBaseVNode("div", _hoisted_109, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "google"),
						onToggle: _cache[96] || (_cache[96] = ($event) => toggleService("google", 7e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Создание РК Яндекс & Google",
						text: "",
						price: "7 000"
					})]),
					createBaseVNode("div", _hoisted_110, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "pk"),
						onToggle: _cache[97] || (_cache[97] = ($event) => toggleService("pk", 3500))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Ведение РК Яндекс & Google",
						text: "",
						price: "3 500"
					})]),
					createBaseVNode("div", _hoisted_111, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "budget"),
						onToggle: _cache[98] || (_cache[98] = ($event) => toggleService("budget", 12e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Бюджет Яндекс",
						text: "",
						price: "12 000"
					})]),
					createBaseVNode("div", _hoisted_112, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "google2"),
						onToggle: _cache[99] || (_cache[99] = ($event) => toggleService("google2", 12e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Бюджет Google",
						text: "",
						price: "12 000"
					})]),
					_cache[150] || (_cache[150] = createBaseVNode("span", { class: "mini-title" }, "Дополнительно по рекламе:", -1)),
					createBaseVNode("div", _hoisted_113, [createVNode(Radio_default, {
						"is-active": selectedDop.value === "5-1",
						onSelect: _cache[100] || (_cache[100] = ($event) => selectDop("5-1", 15e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Акцентный баннер Яндекса (до 5 фраз, 1 баннер)",
						text: "",
						price: "15 000"
					})]),
					createBaseVNode("div", _hoisted_114, [createVNode(Radio_default, {
						"is-active": selectedDop.value === "10-3",
						onSelect: _cache[101] || (_cache[101] = ($event) => selectDop("10-3", 25e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Акцентный баннер Яндекса (до 10 фраз, до 3 баннеров)",
						text: "",
						price: "25 000"
					})]),
					_cache[151] || (_cache[151] = createBaseVNode("span", { class: "mini-title" }, "SMM:", -1)),
					createBaseVNode("div", _hoisted_115, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "create"),
						onToggle: _cache[102] || (_cache[102] = ($event) => toggleService("create", 1e4))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Создание сообщества",
						text: "ВКонтакте, Instagram, Facebook с нуля",
						price: "10 000"
					})]),
					createBaseVNode("div", _hoisted_116, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "post"),
						onToggle: _cache[103] || (_cache[103] = ($event) => toggleService("post", 1e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Пост в соц.сети",
						text: "В одну соц. сеть. Дублирование в другую соц.сеть - +33%",
						price: "1 000"
					})]),
					createBaseVNode("div", _hoisted_117, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "dubl"),
						onToggle: _cache[104] || (_cache[104] = ($event) => toggleService("dubl", 300))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Дублирование поста в соц.сети",
						text: "",
						price: "300"
					})]),
					createBaseVNode("div", _hoisted_118, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "create2"),
						onToggle: _cache[105] || (_cache[105] = ($event) => toggleService("create2", 1e4))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Создание РК с соц. сетях",
						text: "ВКонтакте, Instagram, Facebook, настройка РК, подбор целевой аудитории, анализ конкурентов",
						price: "10 000"
					})]),
					createBaseVNode("div", _hoisted_119, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "conduction"),
						onToggle: _cache[106] || (_cache[106] = ($event) => toggleService("conduction", 5e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Ведение РК в соц.сетях",
						text: "+10% к стоимости от бюджета РК.",
						price: "5 000"
					})]),
					createBaseVNode("div", _hoisted_120, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "budjet2"),
						onToggle: _cache[107] || (_cache[107] = ($event) => toggleService("budjet2", 1))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Бюджет РК в соц.сетях",
						text: "Бюджет",
						price: "от 1"
					})])
				])) : activeTab.value === "seo" ? (openBlock(), createElementBlock("div", _hoisted_121, [
					_cache[152] || (_cache[152] = createBaseVNode("span", { class: "mini-title" }, "Пакеты:", -1)),
					createBaseVNode("div", _hoisted_122, [createVNode(Radio_default, {
						"is-active": selectedSize.value === "size-S",
						onSelect: _cache[108] || (_cache[108] = ($event) => selectSize("size-S", 1e4))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Пакет S",
						text: "",
						price: "10 000"
					})]),
					createBaseVNode("div", _hoisted_123, [createVNode(Radio_default, {
						"is-active": selectedSize.value === "size-M",
						onSelect: _cache[109] || (_cache[109] = ($event) => selectSize("size-M", 2e4))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Пакет M",
						text: "",
						price: "20 000"
					})]),
					createBaseVNode("div", _hoisted_124, [createVNode(Radio_default, {
						"is-active": selectedSize.value === "size-L",
						onSelect: _cache[110] || (_cache[110] = ($event) => selectSize("size-L", 3e4))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Пакет L",
						text: "",
						price: "30 000"
					})]),
					_cache[153] || (_cache[153] = createBaseVNode("span", { class: "mini-title" }, "Оптимизация:", -1)),
					createBaseVNode("div", _hoisted_125, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "desks"),
						onToggle: _cache[111] || (_cache[111] = ($event) => toggleService("desks", 3e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Доски",
						text: "Доски объявлений",
						price: "3 000"
					})]),
					createBaseVNode("div", _hoisted_126, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "inner"),
						onToggle: _cache[112] || (_cache[112] = ($event) => toggleService("inner", 15e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Внутренняя оптимизация",
						text: "",
						price: "15 000"
					})])
				])) : activeTab.value === "design" ? (openBlock(), createElementBlock("div", _hoisted_127, [
					_cache[154] || (_cache[154] = createBaseVNode("span", { class: "mini-title" }, "Полиграфия:", -1)),
					createBaseVNode("div", _hoisted_128, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "card"),
						onToggle: _cache[113] || (_cache[113] = ($event) => toggleService("card", 3e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Визитка",
						text: "Разработка дизайна визитки",
						price: "3 000"
					})]),
					createBaseVNode("div", _hoisted_129, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "Booklets"),
						onToggle: _cache[114] || (_cache[114] = ($event) => toggleService("Booklets", 8e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Буклеты",
						text: "Разработка дизайна буклетов",
						price: "8 000"
					})]),
					createBaseVNode("div", _hoisted_130, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "calendars"),
						onToggle: _cache[115] || (_cache[115] = ($event) => toggleService("calendars", 1e4))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Календари",
						text: "Разработка дизайна календарей",
						price: "10 000"
					})]),
					createBaseVNode("div", _hoisted_131, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "Flyers"),
						onToggle: _cache[116] || (_cache[116] = ($event) => toggleService("Flyers", 1e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Флаеры",
						text: "Разработка дизайна флаеров",
						price: "1 000"
					})]),
					_cache[155] || (_cache[155] = createBaseVNode("span", { class: "mini-title" }, "Брендирование:", -1)),
					createBaseVNode("div", _hoisted_132, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "Packaging"),
						onToggle: _cache[117] || (_cache[117] = ($event) => toggleService("Packaging", 1))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Упаковка соц. сетей",
						text: "Внешнее оформление сообщества",
						price: "1"
					})]),
					createBaseVNode("div", _hoisted_133, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "banners-pk"),
						onToggle: _cache[118] || (_cache[118] = ($event) => toggleService("banners-pk", 1e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Баннеры на РК",
						text: "Оформление рекламных компаний",
						price: "1 000"
					})]),
					createBaseVNode("div", _hoisted_134, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "banner-byl"),
						onToggle: _cache[119] || (_cache[119] = ($event) => toggleService("banner-byl", 6e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Баннер на билборды",
						text: "",
						price: "6 000"
					})]),
					createBaseVNode("div", _hoisted_135, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "identity"),
						onToggle: _cache[120] || (_cache[120] = ($event) => toggleService("identity", 25e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Фирменный стиль",
						text: "Фирменное представление требуемых вещей. От ручек до одежды с вашим логотипом",
						price: "25 000"
					})]),
					createBaseVNode("div", _hoisted_136, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "logo"),
						onToggle: _cache[121] || (_cache[121] = ($event) => toggleService("logo", 15e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Логотип без сайта",
						text: "",
						price: "15 000"
					})]),
					createBaseVNode("div", _hoisted_137, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "banner-site"),
						onToggle: _cache[122] || (_cache[122] = ($event) => toggleService("banner-site", 1e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Баннер на сайт",
						text: "",
						price: "1 000"
					})])
				])) : activeTab.value === "services" ? (openBlock(), createElementBlock("div", _hoisted_138, [
					_cache[156] || (_cache[156] = createBaseVNode("span", { class: "mini-title" }, "Анимации:", -1)),
					createBaseVNode("div", _hoisted_139, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "promo3"),
						onToggle: _cache[123] || (_cache[123] = ($event) => toggleService("promo3", 8e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Промо-ролик",
						text: "",
						price: "8 000"
					})]),
					createBaseVNode("div", _hoisted_140, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "animation"),
						onToggle: _cache[124] || (_cache[124] = ($event) => toggleService("animation", 8e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Анимация шапки",
						text: "",
						price: "8 000"
					})]),
					createBaseVNode("div", _hoisted_141, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "animation-dinam"),
						onToggle: _cache[125] || (_cache[125] = ($event) => toggleService("animation-dinam", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Динамическая анимация",
						text: "",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_142, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "aiimatioin-mod"),
						onToggle: _cache[126] || (_cache[126] = ($event) => toggleService("aiimatioin-mod", 4e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Анимация модуля",
						text: "",
						price: "4 000"
					})]),
					createBaseVNode("div", _hoisted_143, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "animation-site"),
						onToggle: _cache[127] || (_cache[127] = ($event) => toggleService("animation-site", 1e4))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Анимация сайта",
						text: "",
						price: "10 000"
					})]),
					_cache[157] || (_cache[157] = createBaseVNode("span", { class: "mini-title" }, "Прочее:", -1)),
					createBaseVNode("div", _hoisted_144, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "hand"),
						onToggle: _cache[128] || (_cache[128] = ($event) => toggleService("hand", 15e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Ручной перевод сайта на другой язык",
						text: "Установка компонентов для ручной подмены текста из админ-панели сайта",
						price: "15 000"
					})]),
					createBaseVNode("div", _hoisted_145, [createVNode(Checkbox_default, {
						"is-active": selectedServices.value.some((item) => item.id === "auto-translate"),
						onToggle: _cache[129] || (_cache[129] = ($event) => toggleService("auto-translate", 8e3))
					}, null, 8, ["is-active"]), createVNode(Choice_default, {
						title: "Автоматический перевод сайта на другой язык",
						text: "Средствами Google",
						price: "8 000"
					})])
				])) : createCommentVNode("", true)])])
			])]);
		};
	}
}, [["__scopeId", "data-v-ff0f059b"]]);
//#endregion
//#region src/components/Point.vue
var _hoisted_1$3 = { class: "point" };
var _hoisted_2$2 = { class: "point__icon-wrapper" };
var _hoisted_3$2 = ["src"];
var _hoisted_4$1 = { class: "point__text" };
var Point_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "Point",
	props: {
		icon: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$3, [createBaseVNode("div", _hoisted_2$2, [createBaseVNode("img", {
				src: __props.icon,
				alt: "Иконка",
				class: "point__icon"
			}, null, 8, _hoisted_3$2)]), createBaseVNode("p", _hoisted_4$1, toDisplayString(__props.text), 1)]);
		};
	}
}, [["__scopeId", "data-v-e42f5657"]]);
//#endregion
//#region src/views/TheoryPage.vue
var _hoisted_1$2 = { class: "theory-page" };
var _hoisted_2$1 = { class: "page-content" };
var _hoisted_3$1 = { class: "point-block" };
var _hoisted_4 = { class: "points" };
var _hoisted_5 = { class: "blocks" };
var _hoisted_6 = { class: "stages" };
var _hoisted_7 = { class: "numbers" };
var TheoryPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "TheoryPage",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$2, [createBaseVNode("div", _hoisted_2$1, [
				_cache[0] || (_cache[0] = createBaseVNode("h1", null, "РАЗРАБОТКА САЙТОВ", -1)),
				_cache[1] || (_cache[1] = createBaseVNode("div", { class: "big-title" }, [createBaseVNode("h2", null, "СОЗДАНИЕ САЙТА НА BITRIX")], -1)),
				_cache[2] || (_cache[2] = createBaseVNode("div", { class: "text" }, [createBaseVNode("p", null, "Платформа Битрикс сочетает в себе высокую производительность и гибкость настроек, что позволяет создавать проекты любой сложности — от простых корпоративных сайтов до крупных интернет-магазинов и порталов с интеграцией CRM и учетными системами. Интернет-магазины на Bitrix отлично справляются с большой нагрузкой и быстро загружаются, что улучшает пользовательский опыт и позицию в поисковой выдаче.")], -1)),
				createBaseVNode("div", _hoisted_3$1, [createBaseVNode("div", _hoisted_4, [
					createVNode(Point_default, {
						icon: "@/image/check.png",
						text: "Используем лучшие практики и возможности платформы для создания эффективных сайтов"
					}),
					createVNode(Point_default, {
						icon: "@/image/calendar.png",
						text: "Гарантируем соблюдение сроков и качество результата"
					}),
					createVNode(Point_default, {
						icon: "@/image/wrench.png",
						text: "Имеем большой опыт в комплексных проектах на Bitrix с разными отраслями бизнеса"
					}),
					createVNode(Point_default, {
						icon: "@/image/rubel.png",
						text: "Предлагаем прозрачные цены и индивидуальный подход"
					})
				]), createBaseVNode("div", _hoisted_5, [
					createVNode(GradientBlock_default, { text: "Индивидуальный дизайн под стиль и задачи бизнеса" }),
					createVNode(GradientBlock_default, { text: "Логичная структура для удобной навигации" }),
					createVNode(GradientBlock_default, { text: "Интеграция с 1С, CRM, кассами и платёжными системами" }),
					createVNode(GradientBlock_default, { text: "SEO-настройка: URL, метатеги, структура" }),
					createVNode(GradientBlock_default, { text: "Адаптивная вёрстка под все устройства" }),
					createVNode(GradientBlock_default, { text: "Обучение работе с админкой сайта" }),
					createVNode(GradientBlock_default, { text: "Техподдержка и регулярные обновления" })
				])]),
				_cache[3] || (_cache[3] = createBaseVNode("div", { class: "big-title" }, [createBaseVNode("h2", null, "ПЕРЕНОС САЙТА С JOOMLA WORDPRESS")], -1)),
				_cache[4] || (_cache[4] = createBaseVNode("div", { class: "text" }, [createBaseVNode("p", null, [
					createTextVNode("Наша компания предлагает полный перенос сайта с Joomla или WordPress на 1C-Bitrix под ключ.Мы мигрируем контент, структуру, функционал и SEO-позиции без простоя. За 5-10 дней проект работает на мощной CMS с интеграцией 1C, CRM и аналитикой. Сотни успешных миграций для e-commerce, корпоративных порталов и сервисов."),
					createBaseVNode("br"),
					createBaseVNode("br"),
					createTextVNode(" Joomla сложна в масштабировании, расширения конфликтуют при обновлениях. WordPress уязвим к хакерам, плагины тормозят скорость. Bitrix — корпоративный стандарт: встроенная безопасность, 1C-интеграция, высокая нагрузка до 100к посетителей. Модули для инфоблоков, форм, каталогов упрощают управление. SEO-инструменты лучше: автогенерация мета-тегов, sitemap, микроразметка."),
					createBaseVNode("br"),
					createBaseVNode("br"),
					createTextVNode("Клиенты фиксируют рост конверсии на 15-30% после переноса. Скорость вырастает в 2 раза благодаря кэшированию. E-commerce с полноценным магазином заменяет WooCommerce. Корпоративные сайты получают права доступа, workflow. Мы проводим бесплатный аудит: анализируем текущую CMS, объем данных, рекомендации по оптимизации.")
				])], -1)),
				_cache[5] || (_cache[5] = createBaseVNode("div", { class: "mini-title" }, "СОЗДАНИЕ САЙТА НА BITRIX", -1)),
				createBaseVNode("div", _hoisted_6, [
					createVNode(Stage_default, {
						number: "1",
						title: "Выполняем все этапы",
						items: [
							"Создаем резервную копию исходного сайта: файлы, база, изображения. ",
							"Устанавливаем Bitrix на вашем хостинге или нашем VPS с оптимизацией. ",
							"Переносим страницы, статьи, товары, категории через специализированные скрипты и модули импорта."
						]
					}),
					createVNode(Stage_default, {
						number: "2",
						title: "Из Joomla экспортируем K2, VirtueMart",
						items: ["С WordPress — посты, WooCommerce-каталог, ACF-поля. Настраиваем 301-редиректы для старых URL.", "Реконструируем дизайн в визуальном редакторе Bitrix. Интегрируем CRM, Яндекс.Метрику."]
					}),
					createVNode(Stage_default, {
						number: "3",
						title: "Оптимизируем",
						items: ["Композитный режим, ленивая загрузка, сжатие. Тестируем безопасность, нагрузку, мобильность.", "Обучаем администраторам. Гарантия 12 месяцев с бесплатными доработками."]
					})
				]),
				_cache[6] || (_cache[6] = createStaticVNode("<div class=\"text\" data-v-187588a2><p data-v-187588a2>Аудит занимает 1-2 дня: оценка сложности, расчет цены. Договор с фиксированной суммой. Staging-версия для тестов без риска. Импорт данных поэтапно: контент, медиа, пользователи. Настройка модулей: магазин, блог, формы.<br data-v-187588a2><br data-v-187588a2> SEO-миграция: перенос title, description, H1, alt-атрибутов. Проверка индексации в поисковиках. Запуск на продакшен с мониторингом. Для сложных проектов с мультиязычностью или API сохраняем все интеграции.</p></div><div class=\"big-title\" data-v-187588a2><h2 data-v-187588a2>СОЗДАНИЕ САЙТА-ВИЗИТКИ ПОД КЛЮЧ</h2></div><div class=\"text\" data-v-187588a2><p data-v-187588a2>Создание сайта-визитки под ключ — это быстрый и эффективный способ запустить онлайн-присутствие вашего бизнеса. Если вы уже планируете SEO-продвижение, такой сайт станет идеальной базой: компактный, быстрый и готовый к индексации в Яндексе и Google. Наша SEO-студия создаст ресурс, который не только представит компанию, но и сразу начнет привлекать клиентов из поиска.</p></div><div class=\"pluses\" data-v-187588a2><div class=\"plus\" data-v-187588a2>Цена: гибко, скидки, комплексно</div><div class=\"plus\" data-v-187588a2>Скорость: 3–10 дней</div><div class=\"plus\" data-v-187588a2>SEO: адаптив, метатеги, быстрая загрузка</div></div><div class=\"mini-title\" data-v-187588a2>Этапы создания сайта-визитки под ключ:</div>", 5)),
				createBaseVNode("div", _hoisted_7, [
					createVNode(Number_default, {
						width: "535px",
						height: "176px",
						number: "1",
						text: "Изучаем нишу, конкурентов и цели. Помогаем определить специфику продвижения бренда и тренды."
					}),
					createVNode(Number_default, {
						width: "535px",
						height: "176px",
						number: "2",
						text: "Разрабатываем уникальный дизайн в Figma. Учитываем брендбук. Прототип утверждаем за несколько дней — изменения бесплатно."
					}),
					createVNode(Number_default, {
						width: "535px",
						height: "176px",
						number: "3",
						text: "Чистый HTML/CSS/JS + CMS (Bitrix или WordPress). Интеграции: формы заявок, чат, аналитика. Полная адаптивность."
					}),
					createVNode(Number_default, {
						width: "535px",
						height: "176px",
						number: "4",
						text: "Размещение на хостинге, домен, SSL- защищенный сертификат. Инструкции по работе с административной панелью. Постоянная поддержка."
					})
				])
			])]);
		};
	}
}, [["__scopeId", "data-v-187588a2"]]);
//#endregion
//#region src/views/Theory2Page.vue
var _hoisted_1$1 = { class: "theory-page" };
var _hoisted_2 = { class: "page-content" };
var _hoisted_3 = { class: "stages" };
var Theory2Page_default = /*#__PURE__*/ _plugin_vue_export_helper_default({
	__name: "Theory2Page",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$1, [createBaseVNode("div", _hoisted_2, [
				_cache[0] || (_cache[0] = createBaseVNode("h1", null, "ПРОДВИЖЕНИЕ САЙТОВ", -1)),
				_cache[1] || (_cache[1] = createBaseVNode("div", { class: "big-title" }, [createBaseVNode("h2", null, "ПОИСКОВОЕ ПРОДВИЖЕНИЕ")], -1)),
				_cache[2] || (_cache[2] = createBaseVNode("div", { class: "text" }, [createBaseVNode("p", null, [
					createTextVNode("Поисковое продвижение — это ваш билет в топ Яндекса и Google без переплат за рекламу. В нашей SEO-студии мы повышаем органический трафик на 200-500% за 3-6 месяцев. Если сайт в Нижнем Новгороде не приносит лидов, пора действовать: мы знаем, как обойти конкурентов и привлечь реальных клиентов."),
					createBaseVNode("br"),
					createBaseVNode("br"),
					createTextVNode(" SEO — не эксперимент, а проверенная стратегия. 70% пользователей кликают по первым 5 позициям выдачи. Органический трафик бесплатный и «горячий»: люди ищут именно ваши услуги. В отличие от контекста, эффект держится годами.")
				])], -1)),
				_cache[3] || (_cache[3] = createBaseVNode("div", { class: "mini-title" }, "Этапы поискового продвижения:", -1)),
				createBaseVNode("div", _hoisted_3, [
					createVNode(Stage_default, {
						number: "1",
						title: "Полный аудит (1-3 дня)",
						items: [
							"Первый шаг — комплексный аудит.",
							"Используем Google Search Console, Яндекс.Вебмастер, Ahrefs.",
							"Проверяем: индексацию страниц, скорость (PageSpeed >90), мобильную адаптацию, уникальность контента (>90%)."
						]
					}),
					createVNode(Stage_default, {
						number: "2",
						title: "Сбор семантики",
						items: [
							"Поисковое продвижение начинается с ключей.",
							"Собираем в Wordstat, Key Collector: высокочастотные («SEO Нижний Новгород»), средние, низкочастотные («SEO-аудит сайта в Автозаводском районе»).",
							"Кластеризуем, распределяем по страницам."
						]
					}),
					createVNode(Stage_default, {
						number: "3",
						title: "Техническая оптимизация",
						items: [
							"Создаем резервную копию исходного сайта: файлы, база, изображения. ",
							"Устанавливаем Bitrix на вашем хостинге или нашем VPS с оптимизацией. ",
							"Устраняем дубли, битые ссылки (Screaming Frog). HTTPS, Core Web Vitals — обязательно.",
							"Результат: отказы падают на 30%, сессия растет до 3+ минут."
						]
					}),
					createVNode(Stage_default, {
						number: "4",
						title: "Контент и ссылки",
						items: ["Пишем уникальные тексты с E-E-A-T. H1-H3 с ключами, таблицы сравнений, инфографика.", "Мы проводим облачный анализ каждой страницы продвигаемого сайта, определяем релевантность ключей."]
					}),
					createVNode(Stage_default, {
						number: "5",
						title: "Мониторинг",
						items: ["Ежемесячные отчеты с показателями конверсии"]
					})
				]),
				_cache[4] || (_cache[4] = createStaticVNode("<div class=\"pluses\" data-v-da494fe1><div class=\"plus\" data-v-da494fe1>Рост позиций по запросам</div><div class=\"plus\" data-v-da494fe1>Увеличение заявок на 40-60% уже через 4 месяца</div><div class=\"plus\" data-v-da494fe1>Экономия бюджета: CAC в 3-5 раз ниже рекламы</div><div class=\"plus\" data-v-da494fe1>Локальный фокус: топ в Нижегородской области</div></div><div class=\"big-title\" data-v-da494fe1><h2 data-v-da494fe1>ПРОДВИЖЕНИЕ САЙТА В ЯНДЕКСЕ</h2></div><div class=\"image\" data-v-da494fe1><img src=\"/my-vue-app/assets/yandex.CEGL0mFB.png\" class=\"img\" data-v-da494fe1></div><div class=\"text\" data-v-da494fe1><p data-v-da494fe1>SEO-продвижение в Яндексе — это комплекс мер по оптимизации сайта для высоких позиций в поисковой выдаче, включающий техническую доработку, сбор семантики через Wordstat, создание контента и улучшение поведенческих факторов. Алгоритмы Яндекса, такие как «Палех» и «Королев», учитывают релевантность, скорость загрузки, мобильную адаптацию и глубину просмотра.<br data-v-da494fe1><br data-v-da494fe1> Локальное продвижение через Яндекс.Бизнес усиливает позиции по географическим запросам, а голосовой поиск Алисы требует разговорных формулировок. SEO в Яндексе даёт бизнесу стабильный органический трафик 24/7, высокое доверие аудитории и долгосрочный эффект при минимальном обслуживании, а также эффективно дополняет контекстную рекламу, снижая общие затраты на привлечение клиентов.</p></div><div class=\"mini-title\" data-v-da494fe1>Технический аудит:</div><div class=\"text\" data-v-da494fe1><p data-v-da494fe1>Проверка индексации через Яндекс.Вебмастер, ошибок сканирования, дублей, robots.txt, статусов страниц. Анализируется скорость загрузки (LCP &lt; 2.5 с, FID &lt; 100 мс, CLS &lt; 0.1), мобильная адаптивность, метатеги (Title до 60 символов, Description до 160, H1), хлебные крошки, микроразметка chema.org. Проверяются битые ссылки, редиректы, канонические теги, sitemap.xml, HTTPS, сжатие GZIP, alt у картинок, оптимизация изображений и JS-блокировки. <strong data-v-da494fe1>Итог</strong> — отчёт с приоритетами: критические ошибки (1–3 дня), важные (1 неделя), рекомендации.</p></div><div class=\"mini-title\" data-v-da494fe1>Сбор семантики:</div><div class=\"text\" data-v-da494fe1><p data-v-da494fe1>Сбор семантики начинается с анализа конкурентов из топ-10 Яндекса по основным запросам. Используются сервисы Wordstat, Yandex.Wordselect и Key Collector для сбора базовой семантики.<br data-v-da494fe1><br data-v-da494fe1> Семантика распределяется по структуре: главная — высокие коммерческие, среднечастотные и низкочастотные. Учитывается сезонность и прочие факторы. Итог — семкор в таблице Excel с частотностью, конкурентами и типом страницы.</p></div><div class=\"mini-title\" data-v-da494fe1>Контентная оптимизация:</div><div class=\"text\" data-v-da494fe1><p data-v-da494fe1>Создание экспертных материалов под E-E-A-T. Для ЛПД — продающие тексты 2000–4000 знаков с оффером, преимуществами, CTA и отзывами. Информационные статьи от 3000 знаков с таблицами, инструкциями, инфографикой, экспертными фото, кейсами, сертификатами. Микроразметка FAQ, HowTo, Breadcrumb. Уникальность &gt;95%, читабельность &gt;60, регулярное обновление 1–2 статьи в месяц.</p></div><div class=\"mini-title\" data-v-da494fe1>Внутренняя перелинковка:</div><div class=\"text\" data-v-da494fe1><p data-v-da494fe1>Распределение ссылочного веса и навигация через семантическое ядро. Анкоры с точными вхождениями, 2–4 ссылки на страницу, не более 1 на 300 знаков. Карта перелинковки: страница-донор - приёмник - анкор - тип (хлебные крошки, контекст, меню). Кластеризация по темам для создания тематических парков.</p></div><div class=\"mini-title\" data-v-da494fe1>Работа с поведением:</div><div class=\"text\" data-v-da494fe1><p data-v-da494fe1>Работа с поведением фокусируется на удержании посетителей. A/B-тесты проверяют варианты заголовков, кнопок CTA, форм заявок через Яндекс.Метрику. Ускоряют сайт: ленивая загрузка изображений, минификация CSS/JS, CDN. Улучшают UX: sticky-меню, прогресс-бар чтения, попапы с отложенным показом.<br data-v-da494fe1><br data-v-da494fe1> Карта кликов Метрики показывает проблемные зоны — дорабатывают навигацию, добавляют якорные ссылки. Цель — время на сайте &gt;2 минут, глубина &gt;3 страницы, отказы &lt;40%. Персонализация контента под гео и устройство повышает релевантность. Регулярный анализ целей (заявки, звонки) корректирует поведение.</p></div><div class=\"mini-title\" data-v-da494fe1>Внешнее продвижение:</div><div class=\"text\" data-v-da494fe1><p data-v-da494fe1>Внешнее продвижение включает регистрацию в Яндекс.Бизнес с фото, отзывами и часами работы. Крауд-ссылки размещают в профилях, форумах, отзывах. Доноры подбирают с РИФ &gt;60 (MegaIndex): каталоги компаний, тематические ресурсы. Ссылочный профиль естественный: 60% нофоллоу, 40% dofollow, анкоры разнообразные.</p></div>", 16))
			])]);
		};
	}
}, [["__scopeId", "data-v-da494fe1"]]);
//#endregion
//#region src/views/PolicyPage.vue
var _sfc_main = {};
var _hoisted_1 = { class: "policy-page" };
function _sfc_render(_ctx, _cache) {
	return openBlock(), createElementBlock("div", _hoisted_1, [..._cache[0] || (_cache[0] = [createStaticVNode("<div class=\"page-content\" data-v-869bcf4d><div class=\"big-title\" data-v-869bcf4d><h2 data-v-869bcf4d>Политика в отношении обработки персональных данных</h2></div><section class=\"policy__section\" data-v-869bcf4d><h2 class=\"policy__subtitle\" data-v-869bcf4d>1. Термины и принятые сокращения</h2><ul class=\"policy__list\" data-v-869bcf4d><li data-v-869bcf4d><strong data-v-869bcf4d>Персональные данные (ПД)</strong> – любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу (субъекту ПД).</li><li data-v-869bcf4d><strong data-v-869bcf4d>Обработка персональных данных</strong> – любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных.</li><li data-v-869bcf4d><strong data-v-869bcf4d>Автоматизированная обработка персональных данных</strong> – обработка персональных данных с помощью средств вычислительной техники.</li><li data-v-869bcf4d><strong data-v-869bcf4d>Информационная система персональных данных (ИСПД)</strong> – совокупность содержащихся в базах данных персональных данных и обеспечивающих их обработку информационных технологий и технических средств.</li><li data-v-869bcf4d><strong data-v-869bcf4d>Персональные данные, сделанные общедоступными субъектом персональных данных</strong> – ПД, доступ неограниченного круга лиц к которым предоставлен субъектом персональных данных либо по его просьбе.</li><li data-v-869bcf4d><strong data-v-869bcf4d>Блокирование персональных данных</strong> – временное прекращение обработки персональных данных (за исключением случаев, если обработка необходима для уточнения персональных данных).</li><li data-v-869bcf4d><strong data-v-869bcf4d>Уничтожение персональных данных</strong> – действия, в результате которых становится невозможным восстановить содержание персональных данных в информационной системе персональных данных и (или) в результате которых уничтожаются материальные носители персональных данных.</li><li data-v-869bcf4d><strong data-v-869bcf4d>Cookie</strong> – это часть данных, автоматически располагающаяся на жестком диске компьютера при каждом посещении веб-сайта. Таким образом, cookie – это уникальный идентификатор браузера для веб-сайта. Cookie дают возможность хранить информацию на сервере и помогают легче ориентироваться в веб-пространстве, а также позволяют осуществлять анализ сайта и оценку результатов. Большинство веб-браузеров разрешают использование cookie, однако можно изменить настройки для отказа от работы с cookie или отслеживания пути их рассылки. При этом некоторые ресурсы могут работать некорректно, если работа cookie в браузере будет запрещена.</li><li data-v-869bcf4d><strong data-v-869bcf4d>Веб-отметки</strong> – на определенных веб-страницах или электронных письмах Оператор может использовать распространенную в Интернете технологию «веб-отметки» (также известную как «тэги» или «точная GIF-технология»). Веб-отметки помогают анализировать эффективность веб-сайтов, например, с помощью измерения числа посетителей сайта или количества «кликов», сделанных на ключевых позициях страницы сайта.</li><li data-v-869bcf4d><strong data-v-869bcf4d>Оператор</strong> – организация, самостоятельно или совместно с другими лицами организующая и (или) осуществляющая обработку персональных данных, а также определяющая цели обработки персональных данных, состав персональных данных, подлежащих обработке, действия (операции), совершаемые с персональными данными.</li><li data-v-869bcf4d><strong data-v-869bcf4d>Пользователь</strong> – пользователь сети Интернет.</li><li data-v-869bcf4d><strong data-v-869bcf4d>Сайт</strong> – любой из сайтов, в том числе https://webrazrabotka.ru/, сервисов, служб, программ “Вебразработка”.</li></ul></section><section class=\"policy__section\" data-v-869bcf4d><h2 class=\"policy__subtitle\" data-v-869bcf4d>2. Общие положения</h2><ul class=\"policy__list\" data-v-869bcf4d><li data-v-869bcf4d>Настоящая Политика в отношении обработки персональных данных (далее – Политика) составлена в соответствии с пунктом 2 статьи 18.1 Федерального закона «О персональных данных» №152-ФЗ от 27 июля 2006 г., а также иными нормативно-правовыми актами Российской Федерации в области защиты и обработки персональных данных и действует в отношении всех персональных данных, которые Оператор может получить от Пользователя во время использования им в сети Интернет Сайта.</li><li data-v-869bcf4d>Оператор обеспечивает защиту обрабатываемых персональных данных от несанкционированного доступа и разглашения, неправомерного использования или утраты в соответствии с требованиями Федерального закона от 27 июля 2006 г. №152-ФЗ «О персональных данных».</li><li data-v-869bcf4d>Оператор имеет право вносить изменения в настоящую Политику. При внесении изменений в заголовке Политики указывается дата последнего обновления редакции. Новая редакция Политики вступает в силу с момента ее размещения на сайте, если иное не предусмотрено новой редакцией Политики.</li><li data-v-869bcf4d>Оператор обязан опубликовать или иным образом обеспечить неограниченный доступ к настоящей Политике обработки персональных данных в соответствии с ч. 2 ст. 18.1. ФЗ-152.</li></ul></section><section class=\"policy__section\" data-v-869bcf4d><h2 class=\"policy__subtitle\" data-v-869bcf4d>3. Принципы обработки персональных данных</h2><ul class=\"policy__list\" data-v-869bcf4d><li data-v-869bcf4d>законности и справедливой основы;</li><li data-v-869bcf4d>ограничения обработки персональных данных достижением конкретных, заранее определенных и законных целей;</li><li data-v-869bcf4d>недопущения обработки персональных данных, несовместимой с целями сбора персональных данных;</li><li data-v-869bcf4d>недопущения объединения баз данных, содержащих персональные данные, обработка которых осуществляется в целях, несовместимых между собой;</li><li data-v-869bcf4d>обработки только тех персональных данных, которые отвечают целям их обработки;</li><li data-v-869bcf4d>соответствия содержания и объема обрабатываемых персональных данных заявленным целям обработки;</li><li data-v-869bcf4d>недопущения обработки персональных данных, избыточных по отношению к заявленным целям их обработки;</li><li data-v-869bcf4d>обеспечения точности, достаточности и актуальности персональных данных по отношению к целям обработки персональных данных;</li><li data-v-869bcf4d>уничтожения либо обезличивания персональных данных по достижении целей их обработки или в случае утраты необходимости в достижении этих целей, при невозможности устранения Оператором допущенных нарушений персональных данных, если иное не предусмотрено федеральным законом.</li></ul></section><section class=\"policy__section\" data-v-869bcf4d><h2 class=\"policy__subtitle\" data-v-869bcf4d>4. Обработка персональных данных</h2><h3 class=\"policy__subsubtitle\" data-v-869bcf4d>4.1. Получение ПД</h3><ul class=\"policy__list\" data-v-869bcf4d><li data-v-869bcf4d>Все ПД следует получать от самого субъекта ПД. Если ПД субъекта можно получить только у третьей стороны, то субъект должен быть уведомлен об этом или от него должно быть получено согласие.</li><li data-v-869bcf4d>Оператор должен сообщить субъекту ПД о целях, предполагаемых источниках и способах получения ПД, характере подлежащих получению ПД, перечне действий с ПД, сроке, в течение которого действует согласие, и порядке его отзыва, а также о последствиях отказа субъекта ПД дать письменное согласие на их получение.</li><li data-v-869bcf4d>Документы, содержащие ПД, создаются путем получения ПД по сети Интернет от субъекта ПД во время использования им Сайта;</li><li data-v-869bcf4d>Получения ПД по сети Интернет, от оператора получившего ПД и согласие на их обработку от субъекта ПД, с соблюдением требований действующего законодательства.</li></ul><h3 class=\"policy__subsubtitle\" data-v-869bcf4d>4.2. Условия обработки ПД</h3><ul class=\"policy__list\" data-v-869bcf4d><li data-v-869bcf4d>Обработка персональных данных осуществляется с согласия субъекта персональных данных на обработку его персональных данных;</li><li data-v-869bcf4d>Обработка персональных данных необходима для достижения целей, предусмотренных международным договором Российской Федерации или законом, для осуществления и выполнения возложенных законодательством Российской Федерации на оператора функций, полномочий и обязанностей;</li><li data-v-869bcf4d>Обработка персональных данных необходима для осуществления правосудия, исполнения судебного акта, акта другого органа или должностного лица, подлежащих исполнению в соответствии с законодательством Российской Федерации об исполнительном производстве;</li><li data-v-869bcf4d>Обработка персональных данных необходима для исполнения договора, стороной которого либо выгодоприобретателем или поручителем по которому является субъект персональных данных, а также для заключения договора по инициативе субъекта персональных данных или договора, по которому субъект персональных данных будет являться выгодоприобретателем или поручителем;</li><li data-v-869bcf4d>Обработка персональных данных необходима для осуществления прав и законных интересов оператора или третьих лиц либо для достижения общественно значимых целей при условии, что при этом не нарушаются права и свободы субъекта персональных данных;</li><li data-v-869bcf4d>Осуществляется обработка персональных данных, доступ неограниченного круга лиц к которым предоставлен субъектом персональных данных либо по его просьбе (далее - общедоступные персональные данные);</li><li data-v-869bcf4d>Осуществляется обработка персональных данных, подлежащих опубликованию или обязательному раскрытию в соответствии с федеральным законом.</li></ul><h3 class=\"policy__subsubtitle\" data-v-869bcf4d>4.3. Цели обработки ПД</h3><ul class=\"policy__list\" data-v-869bcf4d><li data-v-869bcf4d>повышения осведомленности субъекта ПД о продуктах и услугах Оператора;</li><li data-v-869bcf4d>заключения с субъектом ПД договоров и их исполнения;</li><li data-v-869bcf4d>информирования субъекта ПД о новостях и предложениях Оператора;</li><li data-v-869bcf4d>идентификации субъекта ПД на Сайте;</li><li data-v-869bcf4d>обеспечение соблюдения законов и иных нормативных правовых актов в области персональных данных;</li><li data-v-869bcf4d>Исполнения договоров – поручений операторов ПД, для ПД которые обрабатываются в интересах третьих лиц – операторов ПД на основании договора (поручения операторов ПД).</li></ul><h3 class=\"policy__subsubtitle\" data-v-869bcf4d>4.4. Категории субъектов персональных данных</h3><ul class=\"policy__list\" data-v-869bcf4d><li data-v-869bcf4d>Физические лица, состоящие с Оператором в гражданско-правовых отношениях;</li><li data-v-869bcf4d>Физические лица, являющиеся Пользователями Сайта;</li><li data-v-869bcf4d>Физические лица, данные которых переданы Оператору другими операторами, на основании договора (поручения операторов ПД), с соблюдением требований действующего законодательства.</li></ul><h3 class=\"policy__subsubtitle\" data-v-869bcf4d>4.5. ПД, обрабатываемые Оператором</h3><ul class=\"policy__list\" data-v-869bcf4d><li data-v-869bcf4d>данные, полученные от Пользователей Сайта;</li><li data-v-869bcf4d>данные, полученные от других операторов.</li></ul><h3 class=\"policy__subsubtitle\" data-v-869bcf4d>4.6. Способы обработки ПД</h3><ul class=\"policy__list\" data-v-869bcf4d><li data-v-869bcf4d>с использованием средств автоматизации;</li><li data-v-869bcf4d>без использования средств автоматизации.</li></ul><h3 class=\"policy__subsubtitle\" data-v-869bcf4d>4.7. Хранение ПД</h3><ul class=\"policy__list\" data-v-869bcf4d><li data-v-869bcf4d>ПД субъектов могут быть получены, проходить дальнейшую обработку и передаваться на хранение как на бумажных носителях, так и в электронном виде.</li><li data-v-869bcf4d>ПД, зафиксированные на бумажных носителях, хранятся в запираемых шкафах либо в запираемых помещениях с ограниченным правом доступа.</li><li data-v-869bcf4d>ПД субъектов, обрабатываемые с использованием средств автоматизации в разных целях, хранятся в разных папках.</li><li data-v-869bcf4d>Не допускается хранение и размещение документов, содержащих ПД, в открытых электронных каталогах (файлообменниках) в ИСПД.</li><li data-v-869bcf4d>Хранение ПД в форме, позволяющей определить субъекта ПД, осуществляется не дольше, чем этого требуют цели их обработки, и они подлежат уничтожению по достижении целей обработки или в случае утраты необходимости в их достижении.</li></ul><h3 class=\"policy__subsubtitle\" data-v-869bcf4d>4.8. Уничтожение ПД</h3><ul class=\"policy__list\" data-v-869bcf4d><li data-v-869bcf4d>Уничтожение документов (носителей), содержащих ПД, производится путем сожжения, дробления (измельчения), химического разложения, превращения в бесформенную массу или порошок. Для уничтожения бумажных документов допускается применение шредера.</li><li data-v-869bcf4d>ПД на электронных носителях уничтожаются путем стирания или форматирования носителя.</li><li data-v-869bcf4d>Факт уничтожения ПД подтверждается документально актом об уничтожении носителей.</li></ul><h3 class=\"policy__subsubtitle\" data-v-869bcf4d>4.9. Передача ПД</h3><ul class=\"policy__list\" data-v-869bcf4d><li data-v-869bcf4d>Оператор передает ПД третьим лицам в следующих случаях:<br data-v-869bcf4d> – субъект выразил свое согласие на такие действия;<br data-v-869bcf4d> – передача предусмотрена российским или иным применимым законодательством в рамках установленной законодательством процедуры. </li><li data-v-869bcf4d><strong data-v-869bcf4d>Перечень лиц, которым передаются ПД:</strong> Оператор не передает ПД третьим лицам.</li></ul></section><section class=\"policy__section\" data-v-869bcf4d><h2 class=\"policy__subtitle\" data-v-869bcf4d>5. Защита персональных данных</h2><ul class=\"policy__list\" data-v-869bcf4d><li data-v-869bcf4d>В соответствии с требованиями нормативных документов Оператором создана система защиты персональных данных (СЗПД), состоящая из подсистем правовой, организационной и технической защиты.</li><li data-v-869bcf4d>Подсистема правовой защиты представляет собой комплекс правовых, организационно-распорядительных и нормативных документов, обеспечивающих создание, функционирование и совершенствование СЗПД.</li><li data-v-869bcf4d>Подсистема организационной защиты включает в себя организацию структуры управления СЗПД, разрешительной системы, защиты информации при работе с сотрудниками, партнерами и сторонними лицами.</li><li data-v-869bcf4d>Подсистема технической защиты включает в себя комплекс технических, программных, программно-аппаратных средств, обеспечивающих защиту ПД.</li><li data-v-869bcf4d><strong data-v-869bcf4d>Основными мерами защиты ПД, используемыми Оператором, являются:</strong></li><li data-v-869bcf4d>Назначение лица, ответственного за обработку ПД, которое осуществляет организацию обработки ПД, обучение и инструктаж, внутренний контроль за соблюдением учреждения и его работниками требований к защите ПД.</li><li data-v-869bcf4d>Определение актуальных угроз безопасности ПД при их обработке в ИСПД и разработка мер и мероприятий по защите ПД.</li><li data-v-869bcf4d>Разработка политики в отношении обработки персональных данных.</li><li data-v-869bcf4d>Установление правил доступа к ПД, обрабатываемым в ИСПД, а также обеспечение регистрации и учета всех действий, совершаемых с ПД в ИСПД.</li><li data-v-869bcf4d>Установление индивидуальных паролей доступа сотрудников в информационную систему в соответствии с их производственными обязанностями.</li><li data-v-869bcf4d>Применение средств защиты информации, прошедших в установленном порядке процедуру оценки соответствия.</li><li data-v-869bcf4d>Сертифицированное антивирусное программное обеспечение с регулярно обновляемыми базами.</li><li data-v-869bcf4d>Соблюдение условий, обеспечивающих сохранность ПД и исключающих несанкционированный к ним доступ.</li><li data-v-869bcf4d>Обнаружение фактов несанкционированного доступа к персональным данным и принятие мер.</li><li data-v-869bcf4d>Восстановление ПД, модифицированных или уничтоженных вследствие несанкционированного доступа к ним.</li><li data-v-869bcf4d>Обучение работников Оператора, непосредственно осуществляющих обработку персональных данных, положениям законодательства РФ о персональных данных, в том числе требованиям к защите персональных данных, документам, определяющим политику Оператора в отношении обработки персональных данных, локальным актам по вопросам обработки персональных данных.</li><li data-v-869bcf4d>Осуществление внутреннего контроля и аудита.</li></ul></section><section class=\"policy__section\" data-v-869bcf4d><h2 class=\"policy__subtitle\" data-v-869bcf4d>6. Основные права субъекта ПД и обязанности Оператора</h2><h3 class=\"policy__subsubtitle\" data-v-869bcf4d>6.1. Основные права субъекта ПД</h3><ul class=\"policy__list\" data-v-869bcf4d><li data-v-869bcf4d>подтверждение факта обработки ПД Оператором;</li><li data-v-869bcf4d>правовые основания и цели обработки ПД;</li><li data-v-869bcf4d>цели и применяемые Оператором способы обработки ПД;</li><li data-v-869bcf4d>наименование и местонахождения Оператора, сведения о лицах (за исключением работников Оператора), которые имеют доступ к ПД или которым могут быть раскрыты ПД на основании договора с Оператором или на основании федерального закона;</li><li data-v-869bcf4d>сроки обработки персональных данных, в том числе сроки их хранения;</li><li data-v-869bcf4d>порядок осуществления субъектом ПД прав, предусмотренных настоящим Федеральным законом;</li><li data-v-869bcf4d>наименование или фамилия, имя, отчество и адрес лица, осуществляющего обработку ПД по поручению Оператора, если обработка поручена или будет поручена такому лицу;</li><li data-v-869bcf4d>обращение к Оператору и направление ему запросов;</li><li data-v-869bcf4d>обжалование действий или бездействия Оператора.</li><li data-v-869bcf4d>Пользователь Сайта может в любое время отозвать свое согласие на обработку ПД, направив электронное сообщение по адресу электронной почты, либо направив письменное уведомление по адресу: г. Нижний Новгород, ул. Родионова, д. 193 к. 6. После получения такого сообщения обработка ПД Пользователя будет прекращена, а его ПД будут удалены, за исключением случаев, когда обработка может быть продолжена в соответствии с законодательством.</li></ul><h3 class=\"policy__subsubtitle\" data-v-869bcf4d>6.2. Обязанности Оператора</h3><ul class=\"policy__list\" data-v-869bcf4d><li data-v-869bcf4d>при сборе ПД предоставить информацию об обработке ПД;</li><li data-v-869bcf4d>в случаях если ПД были получены не от субъекта ПД, уведомить субъекта;</li><li data-v-869bcf4d>при отказе субъекта в предоставлении ПД субъекту разъясняются последствия такого отказа;</li><li data-v-869bcf4d>опубликовать или иным образом обеспечить неограниченный доступ к документу, определяющему его политику в отношении обработки ПД, к сведениям о реализуемых требованиях к защите ПД;</li><li data-v-869bcf4d>принимать необходимые правовые, организационные и технические меры или обеспечивать их принятие для защиты ПД от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования, предоставления, распространения ПД, а также от иных неправомерных действий в отношении ПД;</li><li data-v-869bcf4d>давать ответы на запросы и обращения субъектов ПД, их представителей и уполномоченного органа по защите прав субъектов ПД.</li></ul></section><section class=\"policy__section\" data-v-869bcf4d><h2 class=\"policy__subtitle\" data-v-869bcf4d>7. Особенности обработки и защиты данных, собираемых с использованием сети Интернет</h2><ul class=\"policy__list\" data-v-869bcf4d><li data-v-869bcf4d><strong data-v-869bcf4d>Способы получения данных:</strong></li><li data-v-869bcf4d>Предоставление ПД субъектами ПД путем заполнения форм Сайта;</li><li data-v-869bcf4d>Автоматически собираемая информация.</li><li data-v-869bcf4d><strong data-v-869bcf4d>Оператор может собирать и обрабатывать сведения, не являющимися ПД:</strong></li><li data-v-869bcf4d>информацию об интересах Пользователей на Сайте на основе введенных поисковых запросов пользователей Сайта о реализуемых и предлагаемых к продаже услуг, товаров с целью предоставления актуальной информации Пользователям при использовании Сайта, а также обобщения и анализа информации, о том какие разделы Сайта, услуги, товары пользуются наибольшим спросом у Пользователей Сайта;</li><li data-v-869bcf4d>обработка и хранение поисковых запросов Пользователей Сайта с целью обобщения и создания статистики об использовании разделов Сайта.</li><li data-v-869bcf4d>Оператор автоматически получает некоторые виды информации, получаемой в процессе взаимодействия Пользователей с Сайтом, переписки по электронной почте и т. п. Речь идет о технологиях и сервисах, таких как сookie, Веб-отметки, а также приложения и инструменты Пользователя.</li><li data-v-869bcf4d>При этом Веб-отметки, сookie и другие мониторинговые технологии не дают возможность автоматически получать ПД. Если Пользователь Сайта по своему усмотрению предоставляет свои ПД, например, при заполнении формы обратной связи, то только тогда запускаются процессы автоматического сбора подробной информации для удобства пользования Сайтом и/или для совершенствования взаимодействия с Пользователями.</li></ul></section><section class=\"policy__section\" data-v-869bcf4d><h2 class=\"policy__subtitle\" data-v-869bcf4d>8. Заключительные положения</h2><ul class=\"policy__list\" data-v-869bcf4d><li data-v-869bcf4d>Настоящая Политика является локальным нормативным актом Оператора.</li><li data-v-869bcf4d>Настоящая Политика является общедоступной. Общедоступность настоящей Политики обеспечивается публикацией на Сайте Оператора.</li><li data-v-869bcf4d>Настоящая Политика может быть пересмотрена в любом из следующих случаев:<br data-v-869bcf4d> – при изменении законодательства Российской Федерации в области обработки и защиты персональных данных;<br data-v-869bcf4d> – в случаях получения предписаний от компетентных государственных органов на устранение несоответствий, затрагивающих область действия Политики;<br data-v-869bcf4d> – по решению Оператора;<br data-v-869bcf4d> – при изменении целей и сроков обработки ПД;<br data-v-869bcf4d> – при изменении организационной структуры, структуры информационных и/или телекоммуникационных систем (или введении новых);<br data-v-869bcf4d> – при применении новых технологий обработки и защиты ПД (в т. ч. передачи, хранения);<br data-v-869bcf4d> – при появлении необходимости в изменении процесса обработки ПД, связанной с деятельностью Оператора. </li><li data-v-869bcf4d>В случае неисполнения положений настоящей Политики Компания и ее работники несут ответственность в соответствии с действующим законодательством Российской Федерации.</li><li data-v-869bcf4d>Контроль исполнения требований настоящей Политики осуществляется лицами, ответственными за организацию обработки Данных Компании, а также за безопасность персональных данных.</li></ul></section><div class=\"big-title\" data-v-869bcf4d><h2 data-v-869bcf4d>Согласие посетителя сайта на обработку персональных данных</h2></div><p class=\"consent__text\" data-v-869bcf4d> Настоящим выражаю свое согласие на автоматизированную и неавтоматизированную обработку моих персональных данных, переданных мною лично Оператору посредством заполнения форм на сайте в телекоммуникационной сети Интернет (далее Сайт), в соответствии со следующим перечнем: </p><ul class=\"consent__list\" data-v-869bcf4d><li data-v-869bcf4d>Фамилия;</li><li data-v-869bcf4d>Имя;</li><li data-v-869bcf4d>Телефон;</li><li data-v-869bcf4d>Email;</li><li data-v-869bcf4d>Отчество.</li></ul><p class=\"consent__text\" data-v-869bcf4d> Оператор может обрабатывать мои персональные данные в следующих целях: </p><ul class=\"consent__list\" data-v-869bcf4d><li data-v-869bcf4d>повышения моей осведомленности о продуктах и услугах Оператора;</li><li data-v-869bcf4d>заключения со мной договоров и их исполнения;</li><li data-v-869bcf4d>информирование меня о новостях и предложениях Оператора;</li><li data-v-869bcf4d>идентификации меня на Сайте;</li><li data-v-869bcf4d>обеспечение соблюдения законов и иных нормативных правовых актов в области персональных данных.</li></ul><p class=\"consent__text\" data-v-869bcf4d> Обработка Оператором моих персональных данных (на бумажных носителях, в информационных системах персональных данных и без использования средств автоматизации, а также смешанным способом) должна осуществляться в соответствии с требованиями Федерального закона от 27.07.2006 г. №152-ФЗ «О персональных данных», Политики в отношении обработки персональных данных &quot;Вебразработка&quot;. </p><p class=\"consent__text\" data-v-869bcf4d> Также даю свое согласие на предоставление Оператором моих персональных данных третьим лицам: <strong data-v-869bcf4d>&quot;Вебразработка&quot;</strong> (находится по адресу: г. Нижний Новгород, ул. Родионова, д. 193 к. 6). </p><p class=\"consent__text\" data-v-869bcf4d> Оператор вправе осуществлять обработку моих персональных данных следующими способами: сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), использование, передача (распространение, предоставление, доступ), обезличивание, блокирование, уничтожение. </p><p class=\"consent__text\" data-v-869bcf4d> Настоящее согласие вступает в силу с момента передачи моих персональных данных Оператору посредством заполнения форм на Сайте и действует до дня отзыва в письменной форме. </p><p class=\"consent__text\" data-v-869bcf4d> Настоящее согласие может быть отозвано письменным заявлением на e-mail <a href=\"mailto:info@webrazrabotka.ru\" class=\"consent__link\" data-v-869bcf4d>info@webrazrabotka.ru</a> или письменным уведомлением по адресу: <strong data-v-869bcf4d>г. Нижний Новгород, ул. Родионова, д. 193 к. 6</strong>. </p></div>", 1)])]);
}
//#endregion
//#region src/router/index.js
var routes = [
	{
		path: "/",
		name: "home",
		component: HomePage_default
	},
	{
		path: "/about",
		name: "about",
		component: AboutPage_default
	},
	{
		path: "/cases",
		name: "cases",
		component: CasesPage_default
	},
	{
		path: "/marketing",
		name: "marketing",
		component: MarketingPage_default
	},
	{
		path: "/promo",
		name: "promo",
		component: PromoPage_default
	},
	{
		path: "/shop",
		name: "shop",
		component: ShopPage_default
	},
	{
		path: "/develop",
		name: "develop",
		component: DevelopPage_default
	},
	{
		path: "/contact",
		name: "contact",
		component: ContactPage_default
	},
	{
		path: "/calcul",
		name: "calcul",
		component: CalculPage_default
	},
	{
		path: "/theory",
		name: "theory",
		component: TheoryPage_default
	},
	{
		path: "/theory2",
		name: "theory2",
		component: Theory2Page_default
	},
	{
		path: "/policy",
		name: "policy",
		component: /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-869bcf4d"]])
	}
];
var router = createRouter({
	history: createWebHashHistory(),
	routes
});
//#endregion
//#region src/main.js
createApp(_sfc_main$33).use(router).mount("#app");
//#endregion
