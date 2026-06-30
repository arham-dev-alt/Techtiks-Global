(() => {
  // node_modules/.pnpm/gsap@3.13.0/node_modules/gsap/gsap-core.js
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  var _config = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
      lineHeight: ""
    }
  };
  var _defaults = {
    duration: 0.5,
    overwrite: false,
    delay: 0
  };
  var _suppressOverwrites;
  var _reverting;
  var _context;
  var _bigNum = 1e8;
  var _tinyNum = 1 / _bigNum;
  var _2PI = Math.PI * 2;
  var _HALF_PI = _2PI / 4;
  var _gsID = 0;
  var _sqrt = Math.sqrt;
  var _cos = Math.cos;
  var _sin = Math.sin;
  var _isString = function _isString2(value) {
    return typeof value === "string";
  };
  var _isFunction = function _isFunction2(value) {
    return typeof value === "function";
  };
  var _isNumber = function _isNumber2(value) {
    return typeof value === "number";
  };
  var _isUndefined = function _isUndefined2(value) {
    return typeof value === "undefined";
  };
  var _isObject = function _isObject2(value) {
    return typeof value === "object";
  };
  var _isNotFalse = function _isNotFalse2(value) {
    return value !== false;
  };
  var _windowExists = function _windowExists2() {
    return typeof window !== "undefined";
  };
  var _isFuncOrString = function _isFuncOrString2(value) {
    return _isFunction(value) || _isString(value);
  };
  var _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function() {
  };
  var _isArray = Array.isArray;
  var _strictNumExp = /(?:-?\.?\d|\.)+/gi;
  var _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g;
  var _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g;
  var _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi;
  var _relExp = /[+-]=-?[.\d]+/;
  var _delimitedValueExp = /[^,'"\[\]\s]+/gi;
  var _unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i;
  var _globalTimeline;
  var _win;
  var _coreInitted;
  var _doc;
  var _globals = {};
  var _installScope = {};
  var _coreReady;
  var _install = function _install2(scope) {
    return (_installScope = _merge(scope, _globals)) && gsap;
  };
  var _missingPlugin = function _missingPlugin2(property, value) {
    return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
  };
  var _warn = function _warn2(message, suppress) {
    return !suppress && console.warn(message);
  };
  var _addGlobal = function _addGlobal2(name, obj) {
    return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
  };
  var _emptyFunc = function _emptyFunc2() {
    return 0;
  };
  var _startAtRevertConfig = {
    suppressEvents: true,
    isStart: true,
    kill: false
  };
  var _revertConfigNoKill = {
    suppressEvents: true,
    kill: false
  };
  var _revertConfig = {
    suppressEvents: true
  };
  var _reservedProps = {};
  var _lazyTweens = [];
  var _lazyLookup = {};
  var _lastRenderedFrame;
  var _plugins = {};
  var _effects = {};
  var _nextGCFrame = 30;
  var _harnessPlugins = [];
  var _callbackNames = "";
  var _harness = function _harness2(targets) {
    var target = targets[0], harnessPlugin, i;
    _isObject(target) || _isFunction(target) || (targets = [targets]);
    if (!(harnessPlugin = (target._gsap || {}).harness)) {
      i = _harnessPlugins.length;
      while (i-- && !_harnessPlugins[i].targetTest(target)) {
      }
      harnessPlugin = _harnessPlugins[i];
    }
    i = targets.length;
    while (i--) {
      targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
    }
    return targets;
  };
  var _getCache = function _getCache2(target) {
    return target._gsap || _harness(toArray(target))[0]._gsap;
  };
  var _getProperty = function _getProperty2(target, property, v) {
    return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
  };
  var _forEachName = function _forEachName2(names, func) {
    return (names = names.split(",")).forEach(func) || names;
  };
  var _round = function _round2(value) {
    return Math.round(value * 1e5) / 1e5 || 0;
  };
  var _roundPrecise = function _roundPrecise2(value) {
    return Math.round(value * 1e7) / 1e7 || 0;
  };
  var _parseRelative = function _parseRelative2(start, value) {
    var operator = value.charAt(0), end = parseFloat(value.substr(2));
    start = parseFloat(start);
    return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
  };
  var _arrayContainsAny = function _arrayContainsAny2(toSearch, toFind) {
    var l = toFind.length, i = 0;
    for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l; ) {
    }
    return i < l;
  };
  var _lazyRender = function _lazyRender2() {
    var l = _lazyTweens.length, a = _lazyTweens.slice(0), i, tween;
    _lazyLookup = {};
    _lazyTweens.length = 0;
    for (i = 0; i < l; i++) {
      tween = a[i];
      tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
    }
  };
  var _isRevertWorthy = function _isRevertWorthy2(animation) {
    return !!(animation._initted || animation._startAt || animation.add);
  };
  var _lazySafeRender = function _lazySafeRender2(animation, time, suppressEvents, force) {
    _lazyTweens.length && !_reverting && _lazyRender();
    animation.render(time, suppressEvents, force || !!(_reverting && time < 0 && _isRevertWorthy(animation)));
    _lazyTweens.length && !_reverting && _lazyRender();
  };
  var _numericIfPossible = function _numericIfPossible2(value) {
    var n = parseFloat(value);
    return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
  };
  var _passThrough = function _passThrough2(p) {
    return p;
  };
  var _setDefaults = function _setDefaults2(obj, defaults4) {
    for (var p in defaults4) {
      p in obj || (obj[p] = defaults4[p]);
    }
    return obj;
  };
  var _setKeyframeDefaults = function _setKeyframeDefaults2(excludeDuration) {
    return function(obj, defaults4) {
      for (var p in defaults4) {
        p in obj || p === "duration" && excludeDuration || p === "ease" || (obj[p] = defaults4[p]);
      }
    };
  };
  var _merge = function _merge2(base, toMerge) {
    for (var p in toMerge) {
      base[p] = toMerge[p];
    }
    return base;
  };
  var _mergeDeep = function _mergeDeep2(base, toMerge) {
    for (var p in toMerge) {
      p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep2(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
    }
    return base;
  };
  var _copyExcluding = function _copyExcluding2(obj, excluding) {
    var copy = {}, p;
    for (p in obj) {
      p in excluding || (copy[p] = obj[p]);
    }
    return copy;
  };
  var _inheritDefaults = function _inheritDefaults2(vars) {
    var parent = vars.parent || _globalTimeline, func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults;
    if (_isNotFalse(vars.inherit)) {
      while (parent) {
        func(vars, parent.vars.defaults);
        parent = parent.parent || parent._dp;
      }
    }
    return vars;
  };
  var _arraysMatch = function _arraysMatch2(a1, a2) {
    var i = a1.length, match = i === a2.length;
    while (match && i-- && a1[i] === a2[i]) {
    }
    return i < 0;
  };
  var _addLinkedListItem = function _addLinkedListItem2(parent, child, firstProp, lastProp, sortBy) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }
    if (lastProp === void 0) {
      lastProp = "_last";
    }
    var prev = parent[lastProp], t;
    if (sortBy) {
      t = child[sortBy];
      while (prev && prev[sortBy] > t) {
        prev = prev._prev;
      }
    }
    if (prev) {
      child._next = prev._next;
      prev._next = child;
    } else {
      child._next = parent[firstProp];
      parent[firstProp] = child;
    }
    if (child._next) {
      child._next._prev = child;
    } else {
      parent[lastProp] = child;
    }
    child._prev = prev;
    child.parent = child._dp = parent;
    return child;
  };
  var _removeLinkedListItem = function _removeLinkedListItem2(parent, child, firstProp, lastProp) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }
    if (lastProp === void 0) {
      lastProp = "_last";
    }
    var prev = child._prev, next = child._next;
    if (prev) {
      prev._next = next;
    } else if (parent[firstProp] === child) {
      parent[firstProp] = next;
    }
    if (next) {
      next._prev = prev;
    } else if (parent[lastProp] === child) {
      parent[lastProp] = prev;
    }
    child._next = child._prev = child.parent = null;
  };
  var _removeFromParent = function _removeFromParent2(child, onlyIfParentHasAutoRemove) {
    child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove && child.parent.remove(child);
    child._act = 0;
  };
  var _uncache = function _uncache2(animation, child) {
    if (animation && (!child || child._end > animation._dur || child._start < 0)) {
      var a = animation;
      while (a) {
        a._dirty = 1;
        a = a.parent;
      }
    }
    return animation;
  };
  var _recacheAncestors = function _recacheAncestors2(animation) {
    var parent = animation.parent;
    while (parent && parent.parent) {
      parent._dirty = 1;
      parent.totalDuration();
      parent = parent.parent;
    }
    return animation;
  };
  var _rewindStartAt = function _rewindStartAt2(tween, totalTime, suppressEvents, force) {
    return tween._startAt && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween.vars.immediateRender && !tween.vars.autoRevert || tween._startAt.render(totalTime, true, force));
  };
  var _hasNoPausedAncestors = function _hasNoPausedAncestors2(animation) {
    return !animation || animation._ts && _hasNoPausedAncestors2(animation.parent);
  };
  var _elapsedCycleDuration = function _elapsedCycleDuration2(animation) {
    return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
  };
  var _animationCycle = function _animationCycle2(tTime, cycleDuration) {
    var whole = Math.floor(tTime = _roundPrecise(tTime / cycleDuration));
    return tTime && whole === tTime ? whole - 1 : whole;
  };
  var _parentToChildTotalTime = function _parentToChildTotalTime2(parentTime, child) {
    return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
  };
  var _setEnd = function _setEnd2(animation) {
    return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
  };
  var _alignPlayhead = function _alignPlayhead2(animation, totalTime) {
    var parent = animation._dp;
    if (parent && parent.smoothChildTiming && animation._ts) {
      animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));
      _setEnd(animation);
      parent._dirty || _uncache(parent, animation);
    }
    return animation;
  };
  var _postAddChecks = function _postAddChecks2(timeline2, child) {
    var t;
    if (child._time || !child._dur && child._initted || child._start < timeline2._time && (child._dur || !child.add)) {
      t = _parentToChildTotalTime(timeline2.rawTime(), child);
      if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
        child.render(t, true);
      }
    }
    if (_uncache(timeline2, child)._dp && timeline2._initted && timeline2._time >= timeline2._dur && timeline2._ts) {
      if (timeline2._dur < timeline2.duration()) {
        t = timeline2;
        while (t._dp) {
          t.rawTime() >= 0 && t.totalTime(t._tTime);
          t = t._dp;
        }
      }
      timeline2._zTime = -_tinyNum;
    }
  };
  var _addToTimeline = function _addToTimeline2(timeline2, child, position, skipChecks) {
    child.parent && _removeFromParent(child);
    child._start = _roundPrecise((_isNumber(position) ? position : position || timeline2 !== _globalTimeline ? _parsePosition(timeline2, position, child) : timeline2._time) + child._delay);
    child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));
    _addLinkedListItem(timeline2, child, "_first", "_last", timeline2._sort ? "_start" : 0);
    _isFromOrFromStart(child) || (timeline2._recent = child);
    skipChecks || _postAddChecks(timeline2, child);
    timeline2._ts < 0 && _alignPlayhead(timeline2, timeline2._tTime);
    return timeline2;
  };
  var _scrollTrigger = function _scrollTrigger2(animation, trigger) {
    return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
  };
  var _attemptInitTween = function _attemptInitTween2(tween, time, force, suppressEvents, tTime) {
    _initTween(tween, time, tTime);
    if (!tween._initted) {
      return 1;
    }
    if (!force && tween._pt && !_reverting && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
      _lazyTweens.push(tween);
      tween._lazy = [tTime, suppressEvents];
      return 1;
    }
  };
  var _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart2(_ref) {
    var parent = _ref.parent;
    return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart2(parent));
  };
  var _isFromOrFromStart = function _isFromOrFromStart2(_ref2) {
    var data = _ref2.data;
    return data === "isFromStart" || data === "isStart";
  };
  var _renderZeroDurationTween = function _renderZeroDurationTween2(tween, totalTime, suppressEvents, force) {
    var prevRatio = tween.ratio, ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1, repeatDelay = tween._rDelay, tTime = 0, pt, iteration, prevIteration;
    if (repeatDelay && tween._repeat) {
      tTime = _clamp(0, tween._tDur, totalTime);
      iteration = _animationCycle(tTime, repeatDelay);
      tween._yoyo && iteration & 1 && (ratio = 1 - ratio);
      if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
        prevRatio = 1 - ratio;
        tween.vars.repeatRefresh && tween._initted && tween.invalidate();
      }
    }
    if (ratio !== prevRatio || _reverting || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
      if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) {
        return;
      }
      prevIteration = tween._zTime;
      tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0);
      suppressEvents || (suppressEvents = totalTime && !prevIteration);
      tween.ratio = ratio;
      tween._from && (ratio = 1 - ratio);
      tween._time = 0;
      tween._tTime = tTime;
      pt = tween._pt;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
      totalTime < 0 && _rewindStartAt(tween, totalTime, suppressEvents, true);
      tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
      tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");
      if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
        ratio && _removeFromParent(tween, 1);
        if (!suppressEvents && !_reverting) {
          _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);
          tween._prom && tween._prom();
        }
      }
    } else if (!tween._zTime) {
      tween._zTime = totalTime;
    }
  };
  var _findNextPauseTween = function _findNextPauseTween2(animation, prevTime, time) {
    var child;
    if (time > prevTime) {
      child = animation._first;
      while (child && child._start <= time) {
        if (child.data === "isPause" && child._start > prevTime) {
          return child;
        }
        child = child._next;
      }
    } else {
      child = animation._last;
      while (child && child._start >= time) {
        if (child.data === "isPause" && child._start < prevTime) {
          return child;
        }
        child = child._prev;
      }
    }
  };
  var _setDuration = function _setDuration2(animation, duration, skipUncache, leavePlayhead) {
    var repeat = animation._repeat, dur = _roundPrecise(duration) || 0, totalProgress = animation._tTime / animation._tDur;
    totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
    animation._dur = dur;
    animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
    totalProgress > 0 && !leavePlayhead && _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress);
    animation.parent && _setEnd(animation);
    skipUncache || _uncache(animation.parent, animation);
    return animation;
  };
  var _onUpdateTotalDuration = function _onUpdateTotalDuration2(animation) {
    return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
  };
  var _zeroPosition = {
    _start: 0,
    endTime: _emptyFunc,
    totalDuration: _emptyFunc
  };
  var _parsePosition = function _parsePosition2(animation, position, percentAnimation) {
    var labels2 = animation.labels, recent = animation._recent || _zeroPosition, clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur, i, offset, isPercent;
    if (_isString(position) && (isNaN(position) || position in labels2)) {
      offset = position.charAt(0);
      isPercent = position.substr(-1) === "%";
      i = position.indexOf("=");
      if (offset === "<" || offset === ">") {
        i >= 0 && (position = position.replace(/=/, ""));
        return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
      }
      if (i < 0) {
        position in labels2 || (labels2[position] = clippedDuration);
        return labels2[position];
      }
      offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));
      if (isPercent && percentAnimation) {
        offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
      }
      return i > 1 ? _parsePosition2(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
    }
    return position == null ? clippedDuration : +position;
  };
  var _createTweenType = function _createTweenType2(type, params2, timeline2) {
    var isLegacy = _isNumber(params2[1]), varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1), vars = params2[varsIndex], irVars, parent;
    isLegacy && (vars.duration = params2[1]);
    vars.parent = timeline2;
    if (type) {
      irVars = vars;
      parent = timeline2;
      while (parent && !("immediateRender" in irVars)) {
        irVars = parent.vars.defaults || {};
        parent = _isNotFalse(parent.vars.inherit) && parent.parent;
      }
      vars.immediateRender = _isNotFalse(irVars.immediateRender);
      type < 2 ? vars.runBackwards = 1 : vars.startAt = params2[varsIndex - 1];
    }
    return new Tween(params2[0], vars, params2[varsIndex + 1]);
  };
  var _conditionalReturn = function _conditionalReturn2(value, func) {
    return value || value === 0 ? func(value) : func;
  };
  var _clamp = function _clamp2(min, max, value) {
    return value < min ? min : value > max ? max : value;
  };
  var getUnit = function getUnit2(value, v) {
    return !_isString(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
  };
  var clamp = function clamp2(min, max, value) {
    return _conditionalReturn(value, function(v) {
      return _clamp(min, max, v);
    });
  };
  var _slice = [].slice;
  var _isArrayLike = function _isArrayLike2(value, nonEmpty) {
    return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
  };
  var _flatten = function _flatten2(ar, leaveStrings, accumulator) {
    if (accumulator === void 0) {
      accumulator = [];
    }
    return ar.forEach(function(value) {
      var _accumulator;
      return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
    }) || accumulator;
  };
  var toArray = function toArray2(value, scope, leaveStrings) {
    return _context && !scope && _context.selector ? _context.selector(value) : _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
  };
  var selector = function selector2(value) {
    value = toArray(value)[0] || _warn("Invalid scope") || {};
    return function(v) {
      var el = value.current || value.nativeElement || value;
      return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc.createElement("div") : value);
    };
  };
  var shuffle = function shuffle2(a) {
    return a.sort(function() {
      return 0.5 - Math.random();
    });
  };
  var distribute = function distribute2(v) {
    if (_isFunction(v)) {
      return v;
    }
    var vars = _isObject(v) ? v : {
      each: v
    }, ease = _parseEase(vars.ease), from = vars.from || 0, base = parseFloat(vars.base) || 0, cache2 = {}, isDecimal = from > 0 && from < 1, ratios = isNaN(from) || isDecimal, axis = vars.axis, ratioX = from, ratioY = from;
    if (_isString(from)) {
      ratioX = ratioY = {
        center: 0.5,
        edges: 0.5,
        end: 1
      }[from] || 0;
    } else if (!isDecimal && ratios) {
      ratioX = from[0];
      ratioY = from[1];
    }
    return function(i, target, a) {
      var l = (a || vars).length, distances = cache2[l], originX, originY, x, y, d, j, max, min, wrapAt;
      if (!distances) {
        wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];
        if (!wrapAt) {
          max = -_bigNum;
          while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {
          }
          wrapAt < l && wrapAt--;
        }
        distances = cache2[l] = [];
        originX = ratios ? Math.min(wrapAt, l) * ratioX - 0.5 : from % wrapAt;
        originY = wrapAt === _bigNum ? 0 : ratios ? l * ratioY / wrapAt - 0.5 : from / wrapAt | 0;
        max = 0;
        min = _bigNum;
        for (j = 0; j < l; j++) {
          x = j % wrapAt - originX;
          y = originY - (j / wrapAt | 0);
          distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
          d > max && (max = d);
          d < min && (min = d);
        }
        from === "random" && shuffle(distances);
        distances.max = max - min;
        distances.min = min;
        distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
        distances.b = l < 0 ? base - l : base;
        distances.u = getUnit(vars.amount || vars.each) || 0;
        ease = ease && l < 0 ? _invertEase(ease) : ease;
      }
      l = (distances[i] - distances.min) / distances.max || 0;
      return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u;
    };
  };
  var _roundModifier = function _roundModifier2(v) {
    var p = Math.pow(10, ((v + "").split(".")[1] || "").length);
    return function(raw) {
      var n = _roundPrecise(Math.round(parseFloat(raw) / v) * v * p);
      return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw));
    };
  };
  var snap = function snap2(snapTo, value) {
    var isArray2 = _isArray(snapTo), radius, is2D;
    if (!isArray2 && _isObject(snapTo)) {
      radius = isArray2 = snapTo.radius || _bigNum;
      if (snapTo.values) {
        snapTo = toArray(snapTo.values);
        if (is2D = !_isNumber(snapTo[0])) {
          radius *= radius;
        }
      } else {
        snapTo = _roundModifier(snapTo.increment);
      }
    }
    return _conditionalReturn(value, !isArray2 ? _roundModifier(snapTo) : _isFunction(snapTo) ? function(raw) {
      is2D = snapTo(raw);
      return Math.abs(is2D - raw) <= radius ? is2D : raw;
    } : function(raw) {
      var x = parseFloat(is2D ? raw.x : raw), y = parseFloat(is2D ? raw.y : 0), min = _bigNum, closest = 0, i = snapTo.length, dx, dy;
      while (i--) {
        if (is2D) {
          dx = snapTo[i].x - x;
          dy = snapTo[i].y - y;
          dx = dx * dx + dy * dy;
        } else {
          dx = Math.abs(snapTo[i] - x);
        }
        if (dx < min) {
          min = dx;
          closest = i;
        }
      }
      closest = !radius || min <= radius ? snapTo[closest] : raw;
      return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
    });
  };
  var random = function random2(min, max, roundingIncrement, returnFunction) {
    return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function() {
      return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * 0.99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
    });
  };
  var pipe = function pipe2() {
    for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
      functions[_key] = arguments[_key];
    }
    return function(value) {
      return functions.reduce(function(v, f) {
        return f(v);
      }, value);
    };
  };
  var unitize = function unitize2(func, unit) {
    return function(value) {
      return func(parseFloat(value)) + (unit || getUnit(value));
    };
  };
  var normalize = function normalize2(min, max, value) {
    return mapRange(min, max, 0, 1, value);
  };
  var _wrapArray = function _wrapArray2(a, wrapper, value) {
    return _conditionalReturn(value, function(index) {
      return a[~~wrapper(index)];
    });
  };
  var wrap = function wrap2(min, max, value) {
    var range = max - min;
    return _isArray(min) ? _wrapArray(min, wrap2(0, min.length), max) : _conditionalReturn(value, function(value2) {
      return (range + (value2 - min) % range) % range + min;
    });
  };
  var wrapYoyo = function wrapYoyo2(min, max, value) {
    var range = max - min, total = range * 2;
    return _isArray(min) ? _wrapArray(min, wrapYoyo2(0, min.length - 1), max) : _conditionalReturn(value, function(value2) {
      value2 = (total + (value2 - min) % total) % total || 0;
      return min + (value2 > range ? total - value2 : value2);
    });
  };
  var _replaceRandom = function _replaceRandom2(value) {
    var prev = 0, s = "", i, nums, end, isArray2;
    while (~(i = value.indexOf("random(", prev))) {
      end = value.indexOf(")", i);
      isArray2 = value.charAt(i + 7) === "[";
      nums = value.substr(i + 7, end - i - 7).match(isArray2 ? _delimitedValueExp : _strictNumExp);
      s += value.substr(prev, i - prev) + random(isArray2 ? nums : +nums[0], isArray2 ? 0 : +nums[1], +nums[2] || 1e-5);
      prev = end + 1;
    }
    return s + value.substr(prev, value.length - prev);
  };
  var mapRange = function mapRange2(inMin, inMax, outMin, outMax, value) {
    var inRange = inMax - inMin, outRange = outMax - outMin;
    return _conditionalReturn(value, function(value2) {
      return outMin + ((value2 - inMin) / inRange * outRange || 0);
    });
  };
  var interpolate = function interpolate2(start, end, progress, mutate) {
    var func = isNaN(start + end) ? 0 : function(p2) {
      return (1 - p2) * start + p2 * end;
    };
    if (!func) {
      var isString2 = _isString(start), master = {}, p, i, interpolators, l, il;
      progress === true && (mutate = 1) && (progress = null);
      if (isString2) {
        start = {
          p: start
        };
        end = {
          p: end
        };
      } else if (_isArray(start) && !_isArray(end)) {
        interpolators = [];
        l = start.length;
        il = l - 2;
        for (i = 1; i < l; i++) {
          interpolators.push(interpolate2(start[i - 1], start[i]));
        }
        l--;
        func = function func2(p2) {
          p2 *= l;
          var i2 = Math.min(il, ~~p2);
          return interpolators[i2](p2 - i2);
        };
        progress = end;
      } else if (!mutate) {
        start = _merge(_isArray(start) ? [] : {}, start);
      }
      if (!interpolators) {
        for (p in end) {
          _addPropTween.call(master, start, p, "get", end[p]);
        }
        func = function func2(p2) {
          return _renderPropTweens(p2, master) || (isString2 ? start.p : start);
        };
      }
    }
    return _conditionalReturn(progress, func);
  };
  var _getLabelInDirection = function _getLabelInDirection2(timeline2, fromTime, backward) {
    var labels2 = timeline2.labels, min = _bigNum, p, distance, label;
    for (p in labels2) {
      distance = labels2[p] - fromTime;
      if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
        label = p;
        min = distance;
      }
    }
    return label;
  };
  var _callback = function _callback2(animation, type, executeLazyFirst) {
    var v = animation.vars, callback = v[type], prevContext = _context, context3 = animation._ctx, params2, scope, result;
    if (!callback) {
      return;
    }
    params2 = v[type + "Params"];
    scope = v.callbackScope || animation;
    executeLazyFirst && _lazyTweens.length && _lazyRender();
    context3 && (_context = context3);
    result = params2 ? callback.apply(scope, params2) : callback.call(scope);
    _context = prevContext;
    return result;
  };
  var _interrupt = function _interrupt2(animation) {
    _removeFromParent(animation);
    animation.scrollTrigger && animation.scrollTrigger.kill(!!_reverting);
    animation.progress() < 1 && _callback(animation, "onInterrupt");
    return animation;
  };
  var _quickTween;
  var _registerPluginQueue = [];
  var _createPlugin = function _createPlugin2(config3) {
    if (!config3)
      return;
    config3 = !config3.name && config3["default"] || config3;
    if (_windowExists() || config3.headless) {
      var name = config3.name, isFunc = _isFunction(config3), Plugin = name && !isFunc && config3.init ? function() {
        this._props = [];
      } : config3, instanceDefaults = {
        init: _emptyFunc,
        render: _renderPropTweens,
        add: _addPropTween,
        kill: _killPropTweensOf,
        modifier: _addPluginModifier,
        rawVars: 0
      }, statics = {
        targetTest: 0,
        get: 0,
        getSetter: _getSetter,
        aliases: {},
        register: 0
      };
      _wake();
      if (config3 !== Plugin) {
        if (_plugins[name]) {
          return;
        }
        _setDefaults(Plugin, _setDefaults(_copyExcluding(config3, instanceDefaults), statics));
        _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config3, statics)));
        _plugins[Plugin.prop = name] = Plugin;
        if (config3.targetTest) {
          _harnessPlugins.push(Plugin);
          _reservedProps[name] = 1;
        }
        name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin";
      }
      _addGlobal(name, Plugin);
      config3.register && config3.register(gsap, Plugin, PropTween);
    } else {
      _registerPluginQueue.push(config3);
    }
  };
  var _255 = 255;
  var _colorLookup = {
    aqua: [0, _255, _255],
    lime: [0, _255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, _255],
    navy: [0, 0, 128],
    white: [_255, _255, _255],
    olive: [128, 128, 0],
    yellow: [_255, _255, 0],
    orange: [_255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [_255, 0, 0],
    pink: [_255, 192, 203],
    cyan: [0, _255, _255],
    transparent: [_255, _255, _255, 0]
  };
  var _hue = function _hue2(h, m1, m2) {
    h += h < 0 ? 1 : h > 1 ? -1 : 0;
    return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < 0.5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + 0.5 | 0;
  };
  var splitColor = function splitColor2(v, toHSL, forceAlpha) {
    var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0, r, g, b, h, s, l, max, min, d, wasHSL;
    if (!a) {
      if (v.substr(-1) === ",") {
        v = v.substr(0, v.length - 1);
      }
      if (_colorLookup[v]) {
        a = _colorLookup[v];
      } else if (v.charAt(0) === "#") {
        if (v.length < 6) {
          r = v.charAt(1);
          g = v.charAt(2);
          b = v.charAt(3);
          v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
        }
        if (v.length === 9) {
          a = parseInt(v.substr(1, 6), 16);
          return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
        }
        v = parseInt(v.substr(1), 16);
        a = [v >> 16, v >> 8 & _255, v & _255];
      } else if (v.substr(0, 3) === "hsl") {
        a = wasHSL = v.match(_strictNumExp);
        if (!toHSL) {
          h = +a[0] % 360 / 360;
          s = +a[1] / 100;
          l = +a[2] / 100;
          g = l <= 0.5 ? l * (s + 1) : l + s - l * s;
          r = l * 2 - g;
          a.length > 3 && (a[3] *= 1);
          a[0] = _hue(h + 1 / 3, r, g);
          a[1] = _hue(h, r, g);
          a[2] = _hue(h - 1 / 3, r, g);
        } else if (~v.indexOf("=")) {
          a = v.match(_numExp);
          forceAlpha && a.length < 4 && (a[3] = 1);
          return a;
        }
      } else {
        a = v.match(_strictNumExp) || _colorLookup.transparent;
      }
      a = a.map(Number);
    }
    if (toHSL && !wasHSL) {
      r = a[0] / _255;
      g = a[1] / _255;
      b = a[2] / _255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      l = (max + min) / 2;
      if (max === min) {
        h = s = 0;
      } else {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        h *= 60;
      }
      a[0] = ~~(h + 0.5);
      a[1] = ~~(s * 100 + 0.5);
      a[2] = ~~(l * 100 + 0.5);
    }
    forceAlpha && a.length < 4 && (a[3] = 1);
    return a;
  };
  var _colorOrderData = function _colorOrderData2(v) {
    var values = [], c = [], i = -1;
    v.split(_colorExp).forEach(function(v2) {
      var a = v2.match(_numWithUnitExp) || [];
      values.push.apply(values, a);
      c.push(i += a.length + 1);
    });
    values.c = c;
    return values;
  };
  var _formatColors = function _formatColors2(s, toHSL, orderMatchData) {
    var result = "", colors = (s + result).match(_colorExp), type = toHSL ? "hsla(" : "rgba(", i = 0, c, shell, d, l;
    if (!colors) {
      return s;
    }
    colors = colors.map(function(color) {
      return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
    });
    if (orderMatchData) {
      d = _colorOrderData(s);
      c = orderMatchData.c;
      if (c.join(result) !== d.c.join(result)) {
        shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
        l = shell.length - 1;
        for (; i < l; i++) {
          result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
        }
      }
    }
    if (!shell) {
      shell = s.split(_colorExp);
      l = shell.length - 1;
      for (; i < l; i++) {
        result += shell[i] + colors[i];
      }
    }
    return result + shell[l];
  };
  var _colorExp = function() {
    var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", p;
    for (p in _colorLookup) {
      s += "|" + p + "\\b";
    }
    return new RegExp(s + ")", "gi");
  }();
  var _hslExp = /hsl[a]?\(/;
  var _colorStringFilter = function _colorStringFilter2(a) {
    var combined = a.join(" "), toHSL;
    _colorExp.lastIndex = 0;
    if (_colorExp.test(combined)) {
      toHSL = _hslExp.test(combined);
      a[1] = _formatColors(a[1], toHSL);
      a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1]));
      return true;
    }
  };
  var _tickerActive;
  var _ticker = function() {
    var _getTime3 = Date.now, _lagThreshold = 500, _adjustedLag = 33, _startTime = _getTime3(), _lastUpdate = _startTime, _gap = 1e3 / 240, _nextTime = _gap, _listeners3 = [], _id2, _req, _raf, _self, _delta, _i2, _tick = function _tick2(v) {
      var elapsed = _getTime3() - _lastUpdate, manual = v === true, overlap, dispatch, time, frame;
      (elapsed > _lagThreshold || elapsed < 0) && (_startTime += elapsed - _adjustedLag);
      _lastUpdate += elapsed;
      time = _lastUpdate - _startTime;
      overlap = time - _nextTime;
      if (overlap > 0 || manual) {
        frame = ++_self.frame;
        _delta = time - _self.time * 1e3;
        _self.time = time = time / 1e3;
        _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
        dispatch = 1;
      }
      manual || (_id2 = _req(_tick2));
      if (dispatch) {
        for (_i2 = 0; _i2 < _listeners3.length; _i2++) {
          _listeners3[_i2](time, _delta, frame, v);
        }
      }
    };
    _self = {
      time: 0,
      frame: 0,
      tick: function tick() {
        _tick(true);
      },
      deltaRatio: function deltaRatio(fps) {
        return _delta / (1e3 / (fps || 60));
      },
      wake: function wake() {
        if (_coreReady) {
          if (!_coreInitted && _windowExists()) {
            _win = _coreInitted = window;
            _doc = _win.document || {};
            _globals.gsap = gsap;
            (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);
            _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});
            _registerPluginQueue.forEach(_createPlugin);
          }
          _raf = typeof requestAnimationFrame !== "undefined" && requestAnimationFrame;
          _id2 && _self.sleep();
          _req = _raf || function(f) {
            return setTimeout(f, _nextTime - _self.time * 1e3 + 1 | 0);
          };
          _tickerActive = 1;
          _tick(2);
        }
      },
      sleep: function sleep() {
        (_raf ? cancelAnimationFrame : clearTimeout)(_id2);
        _tickerActive = 0;
        _req = _emptyFunc;
      },
      lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
        _lagThreshold = threshold || Infinity;
        _adjustedLag = Math.min(adjustedLag || 33, _lagThreshold);
      },
      fps: function fps(_fps) {
        _gap = 1e3 / (_fps || 240);
        _nextTime = _self.time * 1e3 + _gap;
      },
      add: function add(callback, once, prioritize) {
        var func = once ? function(t, d, f, v) {
          callback(t, d, f, v);
          _self.remove(func);
        } : callback;
        _self.remove(callback);
        _listeners3[prioritize ? "unshift" : "push"](func);
        _wake();
        return func;
      },
      remove: function remove2(callback, i) {
        ~(i = _listeners3.indexOf(callback)) && _listeners3.splice(i, 1) && _i2 >= i && _i2--;
      },
      _listeners: _listeners3
    };
    return _self;
  }();
  var _wake = function _wake2() {
    return !_tickerActive && _ticker.wake();
  };
  var _easeMap = {};
  var _customEaseExp = /^[\d.\-M][\d.\-,\s]/;
  var _quotesExp = /["']/g;
  var _parseObjectInString = function _parseObjectInString2(value) {
    var obj = {}, split2 = value.substr(1, value.length - 3).split(":"), key = split2[0], i = 1, l = split2.length, index, val, parsedVal;
    for (; i < l; i++) {
      val = split2[i];
      index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
      parsedVal = val.substr(0, index);
      obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
      key = val.substr(index + 1).trim();
    }
    return obj;
  };
  var _valueInParentheses = function _valueInParentheses2(value) {
    var open = value.indexOf("(") + 1, close = value.indexOf(")"), nested = value.indexOf("(", open);
    return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
  };
  var _configEaseFromString = function _configEaseFromString2(name) {
    var split2 = (name + "").split("("), ease = _easeMap[split2[0]];
    return ease && split2.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split2[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
  };
  var _invertEase = function _invertEase2(ease) {
    return function(p) {
      return 1 - ease(1 - p);
    };
  };
  var _propagateYoyoEase = function _propagateYoyoEase2(timeline2, isYoyo) {
    var child = timeline2._first, ease;
    while (child) {
      if (child instanceof Timeline) {
        _propagateYoyoEase2(child, isYoyo);
      } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
        if (child.timeline) {
          _propagateYoyoEase2(child.timeline, isYoyo);
        } else {
          ease = child._ease;
          child._ease = child._yEase;
          child._yEase = ease;
          child._yoyo = isYoyo;
        }
      }
      child = child._next;
    }
  };
  var _parseEase = function _parseEase2(ease, defaultEase) {
    return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
  };
  var _insertEase = function _insertEase2(names, easeIn, easeOut, easeInOut) {
    if (easeOut === void 0) {
      easeOut = function easeOut2(p) {
        return 1 - easeIn(1 - p);
      };
    }
    if (easeInOut === void 0) {
      easeInOut = function easeInOut2(p) {
        return p < 0.5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
      };
    }
    var ease = {
      easeIn,
      easeOut,
      easeInOut
    }, lowercaseName;
    _forEachName(names, function(name) {
      _easeMap[name] = _globals[name] = ease;
      _easeMap[lowercaseName = name.toLowerCase()] = easeOut;
      for (var p in ease) {
        _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
      }
    });
    return ease;
  };
  var _easeInOutFromOut = function _easeInOutFromOut2(easeOut) {
    return function(p) {
      return p < 0.5 ? (1 - easeOut(1 - p * 2)) / 2 : 0.5 + easeOut((p - 0.5) * 2) / 2;
    };
  };
  var _configElastic = function _configElastic2(type, amplitude, period) {
    var p1 = amplitude >= 1 ? amplitude : 1, p2 = (period || (type ? 0.3 : 0.45)) / (amplitude < 1 ? amplitude : 1), p3 = p2 / _2PI * (Math.asin(1 / p1) || 0), easeOut = function easeOut2(p) {
      return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
    }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
      return 1 - easeOut(1 - p);
    } : _easeInOutFromOut(easeOut);
    p2 = _2PI / p2;
    ease.config = function(amplitude2, period2) {
      return _configElastic2(type, amplitude2, period2);
    };
    return ease;
  };
  var _configBack = function _configBack2(type, overshoot) {
    if (overshoot === void 0) {
      overshoot = 1.70158;
    }
    var easeOut = function easeOut2(p) {
      return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
    }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
      return 1 - easeOut(1 - p);
    } : _easeInOutFromOut(easeOut);
    ease.config = function(overshoot2) {
      return _configBack2(type, overshoot2);
    };
    return ease;
  };
  _forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function(name, i) {
    var power = i < 5 ? i + 1 : i;
    _insertEase(name + ",Power" + (power - 1), i ? function(p) {
      return Math.pow(p, power);
    } : function(p) {
      return p;
    }, function(p) {
      return 1 - Math.pow(1 - p, power);
    }, function(p) {
      return p < 0.5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
    });
  });
  _easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;
  _insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());
  (function(n, c) {
    var n1 = 1 / c, n2 = 2 * n1, n3 = 2.5 * n1, easeOut = function easeOut2(p) {
      return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + 0.75 : p < n3 ? n * (p -= 2.25 / c) * p + 0.9375 : n * Math.pow(p - 2.625 / c, 2) + 0.984375;
    };
    _insertEase("Bounce", function(p) {
      return 1 - easeOut(1 - p);
    }, easeOut);
  })(7.5625, 2.75);
  _insertEase("Expo", function(p) {
    return Math.pow(2, 10 * (p - 1)) * p + p * p * p * p * p * p * (1 - p);
  });
  _insertEase("Circ", function(p) {
    return -(_sqrt(1 - p * p) - 1);
  });
  _insertEase("Sine", function(p) {
    return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
  });
  _insertEase("Back", _configBack("in"), _configBack("out"), _configBack());
  _easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
    config: function config(steps, immediateStart) {
      if (steps === void 0) {
        steps = 1;
      }
      var p1 = 1 / steps, p2 = steps + (immediateStart ? 0 : 1), p3 = immediateStart ? 1 : 0, max = 1 - _tinyNum;
      return function(p) {
        return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
      };
    }
  };
  _defaults.ease = _easeMap["quad.out"];
  _forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(name) {
    return _callbackNames += name + "," + name + "Params,";
  });
  var GSCache = function GSCache2(target, harness) {
    this.id = _gsID++;
    target._gsap = this;
    this.target = target;
    this.harness = harness;
    this.get = harness ? harness.get : _getProperty;
    this.set = harness ? harness.getSetter : _getSetter;
  };
  var Animation = /* @__PURE__ */ function() {
    function Animation2(vars) {
      this.vars = vars;
      this._delay = +vars.delay || 0;
      if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
        this._rDelay = vars.repeatDelay || 0;
        this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
      }
      this._ts = 1;
      _setDuration(this, +vars.duration, 1, 1);
      this.data = vars.data;
      if (_context) {
        this._ctx = _context;
        _context.data.push(this);
      }
      _tickerActive || _ticker.wake();
    }
    var _proto = Animation2.prototype;
    _proto.delay = function delay(value) {
      if (value || value === 0) {
        this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
        this._delay = value;
        return this;
      }
      return this._delay;
    };
    _proto.duration = function duration(value) {
      return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
    };
    _proto.totalDuration = function totalDuration(value) {
      if (!arguments.length) {
        return this._tDur;
      }
      this._dirty = 0;
      return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
    };
    _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
      _wake();
      if (!arguments.length) {
        return this._tTime;
      }
      var parent = this._dp;
      if (parent && parent.smoothChildTiming && this._ts) {
        _alignPlayhead(this, _totalTime);
        !parent._dp || parent.parent || _postAddChecks(parent, this);
        while (parent && parent.parent) {
          if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
            parent.totalTime(parent._tTime, true);
          }
          parent = parent.parent;
        }
        if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
          _addToTimeline(this._dp, this, this._start - this._delay);
        }
      }
      if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
        this._ts || (this._pTime = _totalTime);
        _lazySafeRender(this, _totalTime, suppressEvents);
      }
      return this;
    };
    _proto.time = function time(value, suppressEvents) {
      return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time;
    };
    _proto.totalProgress = function totalProgress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
    };
    _proto.progress = function progress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
    };
    _proto.iteration = function iteration(value, suppressEvents) {
      var cycleDuration = this.duration() + this._rDelay;
      return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
    };
    _proto.timeScale = function timeScale(value, suppressEvents) {
      if (!arguments.length) {
        return this._rts === -_tinyNum ? 0 : this._rts;
      }
      if (this._rts === value) {
        return this;
      }
      var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime;
      this._rts = +value || 0;
      this._ts = this._ps || value === -_tinyNum ? 0 : this._rts;
      this.totalTime(_clamp(-Math.abs(this._delay), this.totalDuration(), tTime), suppressEvents !== false);
      _setEnd(this);
      return _recacheAncestors(this);
    };
    _proto.paused = function paused(value) {
      if (!arguments.length) {
        return this._ps;
      }
      if (this._ps !== value) {
        this._ps = value;
        if (value) {
          this._pTime = this._tTime || Math.max(-this._delay, this.rawTime());
          this._ts = this._act = 0;
        } else {
          _wake();
          this._ts = this._rts;
          this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum));
        }
      }
      return this;
    };
    _proto.startTime = function startTime(value) {
      if (arguments.length) {
        this._start = value;
        var parent = this.parent || this._dp;
        parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
        return this;
      }
      return this._start;
    };
    _proto.endTime = function endTime(includeRepeats) {
      return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
    };
    _proto.rawTime = function rawTime(wrapRepeats) {
      var parent = this.parent || this._dp;
      return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
    };
    _proto.revert = function revert(config3) {
      if (config3 === void 0) {
        config3 = _revertConfig;
      }
      var prevIsReverting = _reverting;
      _reverting = config3;
      if (_isRevertWorthy(this)) {
        this.timeline && this.timeline.revert(config3);
        this.totalTime(-0.01, config3.suppressEvents);
      }
      this.data !== "nested" && config3.kill !== false && this.kill();
      _reverting = prevIsReverting;
      return this;
    };
    _proto.globalTime = function globalTime(rawTime) {
      var animation = this, time = arguments.length ? rawTime : animation.rawTime();
      while (animation) {
        time = animation._start + time / (Math.abs(animation._ts) || 1);
        animation = animation._dp;
      }
      return !this.parent && this._sat ? this._sat.globalTime(rawTime) : time;
    };
    _proto.repeat = function repeat(value) {
      if (arguments.length) {
        this._repeat = value === Infinity ? -2 : value;
        return _onUpdateTotalDuration(this);
      }
      return this._repeat === -2 ? Infinity : this._repeat;
    };
    _proto.repeatDelay = function repeatDelay(value) {
      if (arguments.length) {
        var time = this._time;
        this._rDelay = value;
        _onUpdateTotalDuration(this);
        return time ? this.time(time) : this;
      }
      return this._rDelay;
    };
    _proto.yoyo = function yoyo(value) {
      if (arguments.length) {
        this._yoyo = value;
        return this;
      }
      return this._yoyo;
    };
    _proto.seek = function seek(position, suppressEvents) {
      return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
    };
    _proto.restart = function restart(includeDelay, suppressEvents) {
      this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
      this._dur || (this._zTime = -_tinyNum);
      return this;
    };
    _proto.play = function play(from, suppressEvents) {
      from != null && this.seek(from, suppressEvents);
      return this.reversed(false).paused(false);
    };
    _proto.reverse = function reverse(from, suppressEvents) {
      from != null && this.seek(from || this.totalDuration(), suppressEvents);
      return this.reversed(true).paused(false);
    };
    _proto.pause = function pause(atTime, suppressEvents) {
      atTime != null && this.seek(atTime, suppressEvents);
      return this.paused(true);
    };
    _proto.resume = function resume() {
      return this.paused(false);
    };
    _proto.reversed = function reversed(value) {
      if (arguments.length) {
        !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0));
        return this;
      }
      return this._rts < 0;
    };
    _proto.invalidate = function invalidate() {
      this._initted = this._act = 0;
      this._zTime = -_tinyNum;
      return this;
    };
    _proto.isActive = function isActive() {
      var parent = this.parent || this._dp, start = this._start, rawTime;
      return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
    };
    _proto.eventCallback = function eventCallback(type, callback, params2) {
      var vars = this.vars;
      if (arguments.length > 1) {
        if (!callback) {
          delete vars[type];
        } else {
          vars[type] = callback;
          params2 && (vars[type + "Params"] = params2);
          type === "onUpdate" && (this._onUpdate = callback);
        }
        return this;
      }
      return vars[type];
    };
    _proto.then = function then(onFulfilled) {
      var self = this;
      return new Promise(function(resolve) {
        var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough, _resolve = function _resolve2() {
          var _then = self.then;
          self.then = null;
          _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
          resolve(f);
          self.then = _then;
        };
        if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
          _resolve();
        } else {
          self._prom = _resolve;
        }
      });
    };
    _proto.kill = function kill2() {
      _interrupt(this);
    };
    return Animation2;
  }();
  _setDefaults(Animation.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: false,
    parent: null,
    _initted: false,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -_tinyNum,
    _prom: 0,
    _ps: false,
    _rts: 1
  });
  var Timeline = /* @__PURE__ */ function(_Animation) {
    _inheritsLoose(Timeline2, _Animation);
    function Timeline2(vars, position) {
      var _this;
      if (vars === void 0) {
        vars = {};
      }
      _this = _Animation.call(this, vars) || this;
      _this.labels = {};
      _this.smoothChildTiming = !!vars.smoothChildTiming;
      _this.autoRemoveChildren = !!vars.autoRemoveChildren;
      _this._sort = _isNotFalse(vars.sortChildren);
      _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
      vars.reversed && _this.reverse();
      vars.paused && _this.paused(true);
      vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
      return _this;
    }
    var _proto2 = Timeline2.prototype;
    _proto2.to = function to(targets, vars, position) {
      _createTweenType(0, arguments, this);
      return this;
    };
    _proto2.from = function from(targets, vars, position) {
      _createTweenType(1, arguments, this);
      return this;
    };
    _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
      _createTweenType(2, arguments, this);
      return this;
    };
    _proto2.set = function set2(targets, vars, position) {
      vars.duration = 0;
      vars.parent = this;
      _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
      vars.immediateRender = !!vars.immediateRender;
      new Tween(targets, vars, _parsePosition(this, position), 1);
      return this;
    };
    _proto2.call = function call(callback, params2, position) {
      return _addToTimeline(this, Tween.delayedCall(0, callback, params2), position);
    };
    _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.duration = duration;
      vars.stagger = vars.stagger || stagger;
      vars.onComplete = onCompleteAll;
      vars.onCompleteParams = onCompleteAllParams;
      vars.parent = this;
      new Tween(targets, vars, _parsePosition(this, position));
      return this;
    };
    _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.runBackwards = 1;
      _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
      return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
    };
    _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
      toVars.startAt = fromVars;
      _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
      return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
    };
    _proto2.render = function render5(totalTime, suppressEvents, force) {
      var prevTime = this._time, tDur = this._dirty ? this.totalDuration() : this._tDur, dur = this._dur, tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime), crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur), time, child, next, iteration, cycleDuration, prevPaused, pauseTween, timeScale, prevStart, prevIteration, yoyo, isYoyo;
      this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);
      if (tTime !== this._tTime || force || crossingStart) {
        if (prevTime !== this._time && dur) {
          tTime += this._time - prevTime;
          totalTime += this._time - prevTime;
        }
        time = tTime;
        prevStart = this._start;
        timeScale = this._ts;
        prevPaused = !timeScale;
        if (crossingStart) {
          dur || (prevTime = this._zTime);
          (totalTime || !suppressEvents) && (this._zTime = totalTime);
        }
        if (this._repeat) {
          yoyo = this._yoyo;
          cycleDuration = dur + this._rDelay;
          if (this._repeat < -1 && totalTime < 0) {
            return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
          }
          time = _roundPrecise(tTime % cycleDuration);
          if (tTime === tDur) {
            iteration = this._repeat;
            time = dur;
          } else {
            prevIteration = _roundPrecise(tTime / cycleDuration);
            iteration = ~~prevIteration;
            if (iteration && iteration === prevIteration) {
              time = dur;
              iteration--;
            }
            time > dur && (time = dur);
          }
          prevIteration = _animationCycle(this._tTime, cycleDuration);
          !prevTime && this._tTime && prevIteration !== iteration && this._tTime - prevIteration * cycleDuration - this._dur <= 0 && (prevIteration = iteration);
          if (yoyo && iteration & 1) {
            time = dur - time;
            isYoyo = 1;
          }
          if (iteration !== prevIteration && !this._lock) {
            var rewinding = yoyo && prevIteration & 1, doesWrap = rewinding === (yoyo && iteration & 1);
            iteration < prevIteration && (rewinding = !rewinding);
            prevTime = rewinding ? 0 : tTime % dur ? dur : tTime;
            this._lock = 1;
            this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
            this._tTime = tTime;
            !suppressEvents && this.parent && _callback(this, "onRepeat");
            this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);
            if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
              return this;
            }
            dur = this._dur;
            tDur = this._tDur;
            if (doesWrap) {
              this._lock = 2;
              prevTime = rewinding ? dur : -1e-4;
              this.render(prevTime, true);
              this.vars.repeatRefresh && !isYoyo && this.invalidate();
            }
            this._lock = 0;
            if (!this._ts && !prevPaused) {
              return this;
            }
            _propagateYoyoEase(this, isYoyo);
          }
        }
        if (this._hasPause && !this._forcing && this._lock < 2) {
          pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));
          if (pauseTween) {
            tTime -= time - (time = pauseTween._start);
          }
        }
        this._tTime = tTime;
        this._time = time;
        this._act = !timeScale;
        if (!this._initted) {
          this._onUpdate = this.vars.onUpdate;
          this._initted = 1;
          this._zTime = totalTime;
          prevTime = 0;
        }
        if (!prevTime && tTime && !suppressEvents && !prevIteration) {
          _callback(this, "onStart");
          if (this._tTime !== tTime) {
            return this;
          }
        }
        if (time >= prevTime && totalTime >= 0) {
          child = this._first;
          while (child) {
            next = child._next;
            if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                return this.render(totalTime, suppressEvents, force);
              }
              child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);
              if (time !== this._time || !this._ts && !prevPaused) {
                pauseTween = 0;
                next && (tTime += this._zTime = -_tinyNum);
                break;
              }
            }
            child = next;
          }
        } else {
          child = this._last;
          var adjustedTime = totalTime < 0 ? totalTime : time;
          while (child) {
            next = child._prev;
            if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                return this.render(totalTime, suppressEvents, force);
              }
              child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force || _reverting && _isRevertWorthy(child));
              if (time !== this._time || !this._ts && !prevPaused) {
                pauseTween = 0;
                next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum);
                break;
              }
            }
            child = next;
          }
        }
        if (pauseTween && !suppressEvents) {
          this.pause();
          pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;
          if (this._ts) {
            this._start = prevStart;
            _setEnd(this);
            return this.render(totalTime, suppressEvents, force);
          }
        }
        this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
        if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) {
          if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) {
            if (!this._lock) {
              (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
              if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
                _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);
                this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
              }
            }
          }
        }
      }
      return this;
    };
    _proto2.add = function add(child, position) {
      var _this2 = this;
      _isNumber(position) || (position = _parsePosition(this, position, child));
      if (!(child instanceof Animation)) {
        if (_isArray(child)) {
          child.forEach(function(obj) {
            return _this2.add(obj, position);
          });
          return this;
        }
        if (_isString(child)) {
          return this.addLabel(child, position);
        }
        if (_isFunction(child)) {
          child = Tween.delayedCall(0, child);
        } else {
          return this;
        }
      }
      return this !== child ? _addToTimeline(this, child, position) : this;
    };
    _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
      if (nested === void 0) {
        nested = true;
      }
      if (tweens === void 0) {
        tweens = true;
      }
      if (timelines === void 0) {
        timelines = true;
      }
      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = -_bigNum;
      }
      var a = [], child = this._first;
      while (child) {
        if (child._start >= ignoreBeforeTime) {
          if (child instanceof Tween) {
            tweens && a.push(child);
          } else {
            timelines && a.push(child);
            nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
          }
        }
        child = child._next;
      }
      return a;
    };
    _proto2.getById = function getById2(id) {
      var animations = this.getChildren(1, 1, 1), i = animations.length;
      while (i--) {
        if (animations[i].vars.id === id) {
          return animations[i];
        }
      }
    };
    _proto2.remove = function remove2(child) {
      if (_isString(child)) {
        return this.removeLabel(child);
      }
      if (_isFunction(child)) {
        return this.killTweensOf(child);
      }
      child.parent === this && _removeLinkedListItem(this, child);
      if (child === this._recent) {
        this._recent = this._last;
      }
      return _uncache(this);
    };
    _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
      if (!arguments.length) {
        return this._tTime;
      }
      this._forcing = 1;
      if (!this._dp && this._ts) {
        this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
      }
      _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);
      this._forcing = 0;
      return this;
    };
    _proto2.addLabel = function addLabel(label, position) {
      this.labels[label] = _parsePosition(this, position);
      return this;
    };
    _proto2.removeLabel = function removeLabel(label) {
      delete this.labels[label];
      return this;
    };
    _proto2.addPause = function addPause(position, callback, params2) {
      var t = Tween.delayedCall(0, callback || _emptyFunc, params2);
      t.data = "isPause";
      this._hasPause = 1;
      return _addToTimeline(this, t, _parsePosition(this, position));
    };
    _proto2.removePause = function removePause(position) {
      var child = this._first;
      position = _parsePosition(this, position);
      while (child) {
        if (child._start === position && child.data === "isPause") {
          _removeFromParent(child);
        }
        child = child._next;
      }
    };
    _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      var tweens = this.getTweensOf(targets, onlyActive), i = tweens.length;
      while (i--) {
        _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
      }
      return this;
    };
    _proto2.getTweensOf = function getTweensOf2(targets, onlyActive) {
      var a = [], parsedTargets = toArray(targets), child = this._first, isGlobalTime = _isNumber(onlyActive), children;
      while (child) {
        if (child instanceof Tween) {
          if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
            a.push(child);
          }
        } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
          a.push.apply(a, children);
        }
        child = child._next;
      }
      return a;
    };
    _proto2.tweenTo = function tweenTo(position, vars) {
      vars = vars || {};
      var tl3 = this, endTime = _parsePosition(tl3, position), _vars = vars, startAt = _vars.startAt, _onStart = _vars.onStart, onStartParams = _vars.onStartParams, immediateRender = _vars.immediateRender, initted, tween = Tween.to(tl3, _setDefaults({
        ease: vars.ease || "none",
        lazy: false,
        immediateRender: false,
        time: endTime,
        overwrite: "auto",
        duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl3._time)) / tl3.timeScale()) || _tinyNum,
        onStart: function onStart2() {
          tl3.pause();
          if (!initted) {
            var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl3._time)) / tl3.timeScale());
            tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
            initted = 1;
          }
          _onStart && _onStart.apply(tween, onStartParams || []);
        }
      }, vars));
      return immediateRender ? tween.render(0) : tween;
    };
    _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
      return this.tweenTo(toPosition, _setDefaults({
        startAt: {
          time: _parsePosition(this, fromPosition)
        }
      }, vars));
    };
    _proto2.recent = function recent() {
      return this._recent;
    };
    _proto2.nextLabel = function nextLabel(afterTime) {
      if (afterTime === void 0) {
        afterTime = this._time;
      }
      return _getLabelInDirection(this, _parsePosition(this, afterTime));
    };
    _proto2.previousLabel = function previousLabel(beforeTime) {
      if (beforeTime === void 0) {
        beforeTime = this._time;
      }
      return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
    };
    _proto2.currentLabel = function currentLabel(value) {
      return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
    };
    _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = 0;
      }
      var child = this._first, labels2 = this.labels, p;
      while (child) {
        if (child._start >= ignoreBeforeTime) {
          child._start += amount;
          child._end += amount;
        }
        child = child._next;
      }
      if (adjustLabels) {
        for (p in labels2) {
          if (labels2[p] >= ignoreBeforeTime) {
            labels2[p] += amount;
          }
        }
      }
      return _uncache(this);
    };
    _proto2.invalidate = function invalidate(soft) {
      var child = this._first;
      this._lock = 0;
      while (child) {
        child.invalidate(soft);
        child = child._next;
      }
      return _Animation.prototype.invalidate.call(this, soft);
    };
    _proto2.clear = function clear2(includeLabels) {
      if (includeLabels === void 0) {
        includeLabels = true;
      }
      var child = this._first, next;
      while (child) {
        next = child._next;
        this.remove(child);
        child = next;
      }
      this._dp && (this._time = this._tTime = this._pTime = 0);
      includeLabels && (this.labels = {});
      return _uncache(this);
    };
    _proto2.totalDuration = function totalDuration(value) {
      var max = 0, self = this, child = self._last, prevStart = _bigNum, prev, start, parent;
      if (arguments.length) {
        return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
      }
      if (self._dirty) {
        parent = self.parent;
        while (child) {
          prev = child._prev;
          child._dirty && child.totalDuration();
          start = child._start;
          if (start > prevStart && self._sort && child._ts && !self._lock) {
            self._lock = 1;
            _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
          } else {
            prevStart = start;
          }
          if (start < 0 && child._ts) {
            max -= start;
            if (!parent && !self._dp || parent && parent.smoothChildTiming) {
              self._start += start / self._ts;
              self._time -= start;
              self._tTime -= start;
            }
            self.shiftChildren(-start, false, -Infinity);
            prevStart = 0;
          }
          child._end > max && child._ts && (max = child._end);
          child = prev;
        }
        _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);
        self._dirty = 0;
      }
      return self._tDur;
    };
    Timeline2.updateRoot = function updateRoot(time) {
      if (_globalTimeline._ts) {
        _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));
        _lastRenderedFrame = _ticker.frame;
      }
      if (_ticker.frame >= _nextGCFrame) {
        _nextGCFrame += _config.autoSleep || 120;
        var child = _globalTimeline._first;
        if (!child || !child._ts) {
          if (_config.autoSleep && _ticker._listeners.length < 2) {
            while (child && !child._ts) {
              child = child._next;
            }
            child || _ticker.sleep();
          }
        }
      }
    };
    return Timeline2;
  }(Animation);
  _setDefaults(Timeline.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
  });
  var _addComplexStringPropTween = function _addComplexStringPropTween2(target, prop, start, end, setter, stringFilter, funcParam) {
    var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter), index = 0, matchIndex = 0, result, startNums, color, endNum, chunk, startNum, hasRandom, a;
    pt.b = start;
    pt.e = end;
    start += "";
    end += "";
    if (hasRandom = ~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }
    if (stringFilter) {
      a = [start, end];
      stringFilter(a, target, prop);
      start = a[0];
      end = a[1];
    }
    startNums = start.match(_complexStringNumExp) || [];
    while (result = _complexStringNumExp.exec(end)) {
      endNum = result[0];
      chunk = end.substring(index, result.index);
      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(") {
        color = 1;
      }
      if (endNum !== startNums[matchIndex++]) {
        startNum = parseFloat(startNums[matchIndex - 1]) || 0;
        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          s: startNum,
          c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
          m: color && color < 4 ? Math.round : 0
        };
        index = _complexStringNumExp.lastIndex;
      }
    }
    pt.c = index < end.length ? end.substring(index, end.length) : "";
    pt.fp = funcParam;
    if (_relExp.test(end) || hasRandom) {
      pt.e = 0;
    }
    this._pt = pt;
    return pt;
  };
  var _addPropTween = function _addPropTween2(target, prop, start, end, index, targets, modifier, stringFilter, funcParam, optional) {
    _isFunction(end) && (end = end(index || 0, target, targets));
    var currentValue = target[prop], parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](), setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc, pt;
    if (_isString(end)) {
      if (~end.indexOf("random(")) {
        end = _replaceRandom(end);
      }
      if (end.charAt(1) === "=") {
        pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);
        if (pt || pt === 0) {
          end = pt;
        }
      }
    }
    if (!optional || parsedStart !== end || _forceAllPropTweens) {
      if (!isNaN(parsedStart * end) && end !== "") {
        pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
        funcParam && (pt.fp = funcParam);
        modifier && pt.modifier(modifier, this, target);
        return this._pt = pt;
      }
      !currentValue && !(prop in target) && _missingPlugin(prop, end);
      return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
    }
  };
  var _processVars = function _processVars2(vars, index, target, targets, tween) {
    _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));
    if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
      return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
    }
    var copy = {}, p;
    for (p in vars) {
      copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
    }
    return copy;
  };
  var _checkPlugin = function _checkPlugin2(property, vars, tween, index, target, targets) {
    var plugin, pt, ptLookup, i;
    if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
      tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);
      if (tween !== _quickTween) {
        ptLookup = tween._ptLookup[tween._targets.indexOf(target)];
        i = plugin._props.length;
        while (i--) {
          ptLookup[plugin._props[i]] = pt;
        }
      }
    }
    return plugin;
  };
  var _overwritingTween;
  var _forceAllPropTweens;
  var _initTween = function _initTween2(tween, time, tTime) {
    var vars = tween.vars, ease = vars.ease, startAt = vars.startAt, immediateRender = vars.immediateRender, lazy = vars.lazy, onUpdate = vars.onUpdate, runBackwards = vars.runBackwards, yoyoEase = vars.yoyoEase, keyframes = vars.keyframes, autoRevert = vars.autoRevert, dur = tween._dur, prevStartAt = tween._startAt, targets = tween._targets, parent = tween.parent, fullTargets = parent && parent.data === "nested" ? parent.vars.targets : targets, autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites, tl3 = tween.timeline, cleanVars, i, p, pt, target, hasPriority, gsData, harness, plugin, ptLookup, index, harnessVars, overwritten;
    tl3 && (!keyframes || !ease) && (ease = "none");
    tween._ease = _parseEase(ease, _defaults.ease);
    tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;
    if (yoyoEase && tween._yoyo && !tween._repeat) {
      yoyoEase = tween._yEase;
      tween._yEase = tween._ease;
      tween._ease = yoyoEase;
    }
    tween._from = !tl3 && !!vars.runBackwards;
    if (!tl3 || keyframes && !vars.stagger) {
      harness = targets[0] ? _getCache(targets[0]).harness : 0;
      harnessVars = harness && vars[harness.prop];
      cleanVars = _copyExcluding(vars, _reservedProps);
      if (prevStartAt) {
        prevStartAt._zTime < 0 && prevStartAt.progress(1);
        time < 0 && runBackwards && immediateRender && !autoRevert ? prevStartAt.render(-1, true) : prevStartAt.revert(runBackwards && dur ? _revertConfigNoKill : _startAtRevertConfig);
        prevStartAt._lazy = 0;
      }
      if (startAt) {
        _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
          data: "isStart",
          overwrite: false,
          parent,
          immediateRender: true,
          lazy: !prevStartAt && _isNotFalse(lazy),
          startAt: null,
          delay: 0,
          onUpdate: onUpdate && function() {
            return _callback(tween, "onUpdate");
          },
          stagger: 0
        }, startAt)));
        tween._startAt._dp = 0;
        tween._startAt._sat = tween;
        time < 0 && (_reverting || !immediateRender && !autoRevert) && tween._startAt.revert(_revertConfigNoKill);
        if (immediateRender) {
          if (dur && time <= 0 && tTime <= 0) {
            time && (tween._zTime = time);
            return;
          }
        }
      } else if (runBackwards && dur) {
        if (!prevStartAt) {
          time && (immediateRender = false);
          p = _setDefaults({
            overwrite: false,
            data: "isFromStart",
            lazy: immediateRender && !prevStartAt && _isNotFalse(lazy),
            immediateRender,
            stagger: 0,
            parent
          }, cleanVars);
          harnessVars && (p[harness.prop] = harnessVars);
          _removeFromParent(tween._startAt = Tween.set(targets, p));
          tween._startAt._dp = 0;
          tween._startAt._sat = tween;
          time < 0 && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween._startAt.render(-1, true));
          tween._zTime = time;
          if (!immediateRender) {
            _initTween2(tween._startAt, _tinyNum, _tinyNum);
          } else if (!time) {
            return;
          }
        }
      }
      tween._pt = tween._ptCache = 0;
      lazy = dur && _isNotFalse(lazy) || lazy && !dur;
      for (i = 0; i < targets.length; i++) {
        target = targets[i];
        gsData = target._gsap || _harness(targets)[i]._gsap;
        tween._ptLookup[i] = ptLookup = {};
        _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender();
        index = fullTargets === targets ? i : fullTargets.indexOf(target);
        if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
          tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);
          plugin._props.forEach(function(name) {
            ptLookup[name] = pt;
          });
          plugin.priority && (hasPriority = 1);
        }
        if (!harness || harnessVars) {
          for (p in cleanVars) {
            if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
              plugin.priority && (hasPriority = 1);
            } else {
              ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
            }
          }
        }
        tween._op && tween._op[i] && tween.kill(target, tween._op[i]);
        if (autoOverwrite && tween._pt) {
          _overwritingTween = tween;
          _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time));
          overwritten = !tween.parent;
          _overwritingTween = 0;
        }
        tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
      }
      hasPriority && _sortPropTweensByPriority(tween);
      tween._onInit && tween._onInit(tween);
    }
    tween._onUpdate = onUpdate;
    tween._initted = (!tween._op || tween._pt) && !overwritten;
    keyframes && time <= 0 && tl3.render(_bigNum, true, true);
  };
  var _updatePropTweens = function _updatePropTweens2(tween, property, value, start, startIsRelative, ratio, time, skipRecursion) {
    var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property], pt, rootPT, lookup, i;
    if (!ptCache) {
      ptCache = tween._ptCache[property] = [];
      lookup = tween._ptLookup;
      i = tween._targets.length;
      while (i--) {
        pt = lookup[i][property];
        if (pt && pt.d && pt.d._pt) {
          pt = pt.d._pt;
          while (pt && pt.p !== property && pt.fp !== property) {
            pt = pt._next;
          }
        }
        if (!pt) {
          _forceAllPropTweens = 1;
          tween.vars[property] = "+=0";
          _initTween(tween, time);
          _forceAllPropTweens = 0;
          return skipRecursion ? _warn(property + " not eligible for reset") : 1;
        }
        ptCache.push(pt);
      }
    }
    i = ptCache.length;
    while (i--) {
      rootPT = ptCache[i];
      pt = rootPT._pt || rootPT;
      pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
      pt.c = value - pt.s;
      rootPT.e && (rootPT.e = _round(value) + getUnit(rootPT.e));
      rootPT.b && (rootPT.b = pt.s + getUnit(rootPT.b));
    }
  };
  var _addAliasesToVars = function _addAliasesToVars2(targets, vars) {
    var harness = targets[0] ? _getCache(targets[0]).harness : 0, propertyAliases = harness && harness.aliases, copy, p, i, aliases;
    if (!propertyAliases) {
      return vars;
    }
    copy = _merge({}, vars);
    for (p in propertyAliases) {
      if (p in copy) {
        aliases = propertyAliases[p].split(",");
        i = aliases.length;
        while (i--) {
          copy[aliases[i]] = copy[p];
        }
      }
    }
    return copy;
  };
  var _parseKeyframe = function _parseKeyframe2(prop, obj, allProps, easeEach) {
    var ease = obj.ease || easeEach || "power1.inOut", p, a;
    if (_isArray(obj)) {
      a = allProps[prop] || (allProps[prop] = []);
      obj.forEach(function(value, i) {
        return a.push({
          t: i / (obj.length - 1) * 100,
          v: value,
          e: ease
        });
      });
    } else {
      for (p in obj) {
        a = allProps[p] || (allProps[p] = []);
        p === "ease" || a.push({
          t: parseFloat(prop),
          v: obj[p],
          e: ease
        });
      }
    }
  };
  var _parseFuncOrString = function _parseFuncOrString2(value, tween, i, target, targets) {
    return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
  };
  var _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert";
  var _staggerPropsToSkip = {};
  _forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function(name) {
    return _staggerPropsToSkip[name] = 1;
  });
  var Tween = /* @__PURE__ */ function(_Animation2) {
    _inheritsLoose(Tween2, _Animation2);
    function Tween2(targets, vars, position, skipInherit) {
      var _this3;
      if (typeof vars === "number") {
        position.duration = vars;
        vars = position;
        position = null;
      }
      _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
      var _this3$vars = _this3.vars, duration = _this3$vars.duration, delay = _this3$vars.delay, immediateRender = _this3$vars.immediateRender, stagger = _this3$vars.stagger, overwrite = _this3$vars.overwrite, keyframes = _this3$vars.keyframes, defaults4 = _this3$vars.defaults, scrollTrigger = _this3$vars.scrollTrigger, yoyoEase = _this3$vars.yoyoEase, parent = vars.parent || _globalTimeline, parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets), tl3, i, copy, l, p, curTarget, staggerFunc, staggerVarsToMerge;
      _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://gsap.com", !_config.nullTargetWarn) || [];
      _this3._ptLookup = [];
      _this3._overwrite = overwrite;
      if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
        vars = _this3.vars;
        tl3 = _this3.timeline = new Timeline({
          data: "nested",
          defaults: defaults4 || {},
          targets: parent && parent.data === "nested" ? parent.vars.targets : parsedTargets
        });
        tl3.kill();
        tl3.parent = tl3._dp = _assertThisInitialized(_this3);
        tl3._start = 0;
        if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
          l = parsedTargets.length;
          staggerFunc = stagger && distribute(stagger);
          if (_isObject(stagger)) {
            for (p in stagger) {
              if (~_staggerTweenProps.indexOf(p)) {
                staggerVarsToMerge || (staggerVarsToMerge = {});
                staggerVarsToMerge[p] = stagger[p];
              }
            }
          }
          for (i = 0; i < l; i++) {
            copy = _copyExcluding(vars, _staggerPropsToSkip);
            copy.stagger = 0;
            yoyoEase && (copy.yoyoEase = yoyoEase);
            staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
            curTarget = parsedTargets[i];
            copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
            copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;
            if (!stagger && l === 1 && copy.delay) {
              _this3._delay = delay = copy.delay;
              _this3._start += delay;
              copy.delay = 0;
            }
            tl3.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
            tl3._ease = _easeMap.none;
          }
          tl3.duration() ? duration = delay = 0 : _this3.timeline = 0;
        } else if (keyframes) {
          _inheritDefaults(_setDefaults(tl3.vars.defaults, {
            ease: "none"
          }));
          tl3._ease = _parseEase(keyframes.ease || vars.ease || "none");
          var time = 0, a, kf, v;
          if (_isArray(keyframes)) {
            keyframes.forEach(function(frame) {
              return tl3.to(parsedTargets, frame, ">");
            });
            tl3.duration();
          } else {
            copy = {};
            for (p in keyframes) {
              p === "ease" || p === "easeEach" || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
            }
            for (p in copy) {
              a = copy[p].sort(function(a2, b) {
                return a2.t - b.t;
              });
              time = 0;
              for (i = 0; i < a.length; i++) {
                kf = a[i];
                v = {
                  ease: kf.e,
                  duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
                };
                v[p] = kf.v;
                tl3.to(parsedTargets, v, time);
                time += v.duration;
              }
            }
            tl3.duration() < duration && tl3.to({}, {
              duration: duration - tl3.duration()
            });
          }
        }
        duration || _this3.duration(duration = tl3.duration());
      } else {
        _this3.timeline = 0;
      }
      if (overwrite === true && !_suppressOverwrites) {
        _overwritingTween = _assertThisInitialized(_this3);
        _globalTimeline.killTweensOf(parsedTargets);
        _overwritingTween = 0;
      }
      _addToTimeline(parent, _assertThisInitialized(_this3), position);
      vars.reversed && _this3.reverse();
      vars.paused && _this3.paused(true);
      if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
        _this3._tTime = -_tinyNum;
        _this3.render(Math.max(0, -delay) || 0);
      }
      scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
      return _this3;
    }
    var _proto3 = Tween2.prototype;
    _proto3.render = function render5(totalTime, suppressEvents, force) {
      var prevTime = this._time, tDur = this._tDur, dur = this._dur, isNegative = totalTime < 0, tTime = totalTime > tDur - _tinyNum && !isNegative ? tDur : totalTime < _tinyNum ? 0 : totalTime, time, pt, iteration, cycleDuration, prevIteration, isYoyo, ratio, timeline2, yoyoEase;
      if (!dur) {
        _renderZeroDurationTween(this, totalTime, suppressEvents, force);
      } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== isNegative || this._lazy) {
        time = tTime;
        timeline2 = this.timeline;
        if (this._repeat) {
          cycleDuration = dur + this._rDelay;
          if (this._repeat < -1 && isNegative) {
            return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
          }
          time = _roundPrecise(tTime % cycleDuration);
          if (tTime === tDur) {
            iteration = this._repeat;
            time = dur;
          } else {
            prevIteration = _roundPrecise(tTime / cycleDuration);
            iteration = ~~prevIteration;
            if (iteration && iteration === prevIteration) {
              time = dur;
              iteration--;
            } else if (time > dur) {
              time = dur;
            }
          }
          isYoyo = this._yoyo && iteration & 1;
          if (isYoyo) {
            yoyoEase = this._yEase;
            time = dur - time;
          }
          prevIteration = _animationCycle(this._tTime, cycleDuration);
          if (time === prevTime && !force && this._initted && iteration === prevIteration) {
            this._tTime = tTime;
            return this;
          }
          if (iteration !== prevIteration) {
            timeline2 && this._yEase && _propagateYoyoEase(timeline2, isYoyo);
            if (this.vars.repeatRefresh && !isYoyo && !this._lock && time !== cycleDuration && this._initted) {
              this._lock = force = 1;
              this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
            }
          }
        }
        if (!this._initted) {
          if (_attemptInitTween(this, isNegative ? totalTime : time, force, suppressEvents, tTime)) {
            this._tTime = 0;
            return this;
          }
          if (prevTime !== this._time && !(force && this.vars.repeatRefresh && iteration !== prevIteration)) {
            return this;
          }
          if (dur !== this._dur) {
            return this.render(totalTime, suppressEvents, force);
          }
        }
        this._tTime = tTime;
        this._time = time;
        if (!this._act && this._ts) {
          this._act = 1;
          this._lazy = 0;
        }
        this.ratio = ratio = (yoyoEase || this._ease)(time / dur);
        if (this._from) {
          this.ratio = ratio = 1 - ratio;
        }
        if (!prevTime && tTime && !suppressEvents && !prevIteration) {
          _callback(this, "onStart");
          if (this._tTime !== tTime) {
            return this;
          }
        }
        pt = this._pt;
        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }
        timeline2 && timeline2.render(totalTime < 0 ? totalTime : timeline2._dur * timeline2._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);
        if (this._onUpdate && !suppressEvents) {
          isNegative && _rewindStartAt(this, totalTime, suppressEvents, force);
          _callback(this, "onUpdate");
        }
        this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");
        if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
          isNegative && !this._onUpdate && _rewindStartAt(this, totalTime, true, true);
          (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
          if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
            _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);
            this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
          }
        }
      }
      return this;
    };
    _proto3.targets = function targets() {
      return this._targets;
    };
    _proto3.invalidate = function invalidate(soft) {
      (!soft || !this.vars.runBackwards) && (this._startAt = 0);
      this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
      this._ptLookup = [];
      this.timeline && this.timeline.invalidate(soft);
      return _Animation2.prototype.invalidate.call(this, soft);
    };
    _proto3.resetTo = function resetTo(property, value, start, startIsRelative, skipRecursion) {
      _tickerActive || _ticker.wake();
      this._ts || this.play();
      var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts), ratio;
      this._initted || _initTween(this, time);
      ratio = this._ease(time / this._dur);
      if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time, skipRecursion)) {
        return this.resetTo(property, value, start, startIsRelative, 1);
      }
      _alignPlayhead(this, 0);
      this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
      return this.render(0);
    };
    _proto3.kill = function kill2(targets, vars) {
      if (vars === void 0) {
        vars = "all";
      }
      if (!targets && (!vars || vars === "all")) {
        this._lazy = this._pt = 0;
        this.parent ? _interrupt(this) : this.scrollTrigger && this.scrollTrigger.kill(!!_reverting);
        return this;
      }
      if (this.timeline) {
        var tDur = this.timeline.totalDuration();
        this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this);
        this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1);
        return this;
      }
      var parsedTargets = this._targets, killingTargets = targets ? toArray(targets) : parsedTargets, propTweenLookup = this._ptLookup, firstPT = this._pt, overwrittenProps, curLookup, curOverwriteProps, props, p, pt, i;
      if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
        vars === "all" && (this._pt = 0);
        return _interrupt(this);
      }
      overwrittenProps = this._op = this._op || [];
      if (vars !== "all") {
        if (_isString(vars)) {
          p = {};
          _forEachName(vars, function(name) {
            return p[name] = 1;
          });
          vars = p;
        }
        vars = _addAliasesToVars(parsedTargets, vars);
      }
      i = parsedTargets.length;
      while (i--) {
        if (~killingTargets.indexOf(parsedTargets[i])) {
          curLookup = propTweenLookup[i];
          if (vars === "all") {
            overwrittenProps[i] = vars;
            props = curLookup;
            curOverwriteProps = {};
          } else {
            curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
            props = vars;
          }
          for (p in props) {
            pt = curLookup && curLookup[p];
            if (pt) {
              if (!("kill" in pt.d) || pt.d.kill(p) === true) {
                _removeLinkedListItem(this, pt, "_pt");
              }
              delete curLookup[p];
            }
            if (curOverwriteProps !== "all") {
              curOverwriteProps[p] = 1;
            }
          }
        }
      }
      this._initted && !this._pt && firstPT && _interrupt(this);
      return this;
    };
    Tween2.to = function to(targets, vars) {
      return new Tween2(targets, vars, arguments[2]);
    };
    Tween2.from = function from(targets, vars) {
      return _createTweenType(1, arguments);
    };
    Tween2.delayedCall = function delayedCall(delay, callback, params2, scope) {
      return new Tween2(callback, 0, {
        immediateRender: false,
        lazy: false,
        overwrite: false,
        delay,
        onComplete: callback,
        onReverseComplete: callback,
        onCompleteParams: params2,
        onReverseCompleteParams: params2,
        callbackScope: scope
      });
    };
    Tween2.fromTo = function fromTo(targets, fromVars, toVars) {
      return _createTweenType(2, arguments);
    };
    Tween2.set = function set2(targets, vars) {
      vars.duration = 0;
      vars.repeatDelay || (vars.repeat = 0);
      return new Tween2(targets, vars);
    };
    Tween2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      return _globalTimeline.killTweensOf(targets, props, onlyActive);
    };
    return Tween2;
  }(Animation);
  _setDefaults(Tween.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
  });
  _forEachName("staggerTo,staggerFrom,staggerFromTo", function(name) {
    Tween[name] = function() {
      var tl3 = new Timeline(), params2 = _slice.call(arguments, 0);
      params2.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
      return tl3[name].apply(tl3, params2);
    };
  });
  var _setterPlain = function _setterPlain2(target, property, value) {
    return target[property] = value;
  };
  var _setterFunc = function _setterFunc2(target, property, value) {
    return target[property](value);
  };
  var _setterFuncWithParam = function _setterFuncWithParam2(target, property, value, data) {
    return target[property](data.fp, value);
  };
  var _setterAttribute = function _setterAttribute2(target, property, value) {
    return target.setAttribute(property, value);
  };
  var _getSetter = function _getSetter2(target, property) {
    return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
  };
  var _renderPlain = function _renderPlain2(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e6) / 1e6, data);
  };
  var _renderBoolean = function _renderBoolean2(ratio, data) {
    return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
  };
  var _renderComplexString = function _renderComplexString2(ratio, data) {
    var pt = data._pt, s = "";
    if (!ratio && data.b) {
      s = data.b;
    } else if (ratio === 1 && data.e) {
      s = data.e;
    } else {
      while (pt) {
        s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 1e4) / 1e4) + s;
        pt = pt._next;
      }
      s += data.c;
    }
    data.set(data.t, data.p, s, data);
  };
  var _renderPropTweens = function _renderPropTweens2(ratio, data) {
    var pt = data._pt;
    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }
  };
  var _addPluginModifier = function _addPluginModifier2(modifier, tween, target, property) {
    var pt = this._pt, next;
    while (pt) {
      next = pt._next;
      pt.p === property && pt.modifier(modifier, tween, target);
      pt = next;
    }
  };
  var _killPropTweensOf = function _killPropTweensOf2(property) {
    var pt = this._pt, hasNonDependentRemaining, next;
    while (pt) {
      next = pt._next;
      if (pt.p === property && !pt.op || pt.op === property) {
        _removeLinkedListItem(this, pt, "_pt");
      } else if (!pt.dep) {
        hasNonDependentRemaining = 1;
      }
      pt = next;
    }
    return !hasNonDependentRemaining;
  };
  var _setterWithModifier = function _setterWithModifier2(target, property, value, data) {
    data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
  };
  var _sortPropTweensByPriority = function _sortPropTweensByPriority2(parent) {
    var pt = parent._pt, next, pt2, first, last;
    while (pt) {
      next = pt._next;
      pt2 = first;
      while (pt2 && pt2.pr > pt.pr) {
        pt2 = pt2._next;
      }
      if (pt._prev = pt2 ? pt2._prev : last) {
        pt._prev._next = pt;
      } else {
        first = pt;
      }
      if (pt._next = pt2) {
        pt2._prev = pt;
      } else {
        last = pt;
      }
      pt = next;
    }
    parent._pt = first;
  };
  var PropTween = /* @__PURE__ */ function() {
    function PropTween2(next, target, prop, start, change, renderer, data, setter, priority) {
      this.t = target;
      this.s = start;
      this.c = change;
      this.p = prop;
      this.r = renderer || _renderPlain;
      this.d = data || this;
      this.set = setter || _setterPlain;
      this.pr = priority || 0;
      this._next = next;
      if (next) {
        next._prev = this;
      }
    }
    var _proto4 = PropTween2.prototype;
    _proto4.modifier = function modifier(func, tween, target) {
      this.mSet = this.mSet || this.set;
      this.set = _setterWithModifier;
      this.m = func;
      this.mt = target;
      this.tween = tween;
    };
    return PropTween2;
  }();
  _forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(name) {
    return _reservedProps[name] = 1;
  });
  _globals.TweenMax = _globals.TweenLite = Tween;
  _globals.TimelineLite = _globals.TimelineMax = Timeline;
  _globalTimeline = new Timeline({
    sortChildren: false,
    defaults: _defaults,
    autoRemoveChildren: true,
    id: "root",
    smoothChildTiming: true
  });
  _config.stringFilter = _colorStringFilter;
  var _media = [];
  var _listeners = {};
  var _emptyArray = [];
  var _lastMediaTime = 0;
  var _contextID = 0;
  var _dispatch = function _dispatch2(type) {
    return (_listeners[type] || _emptyArray).map(function(f) {
      return f();
    });
  };
  var _onMediaChange = function _onMediaChange2() {
    var time = Date.now(), matches2 = [];
    if (time - _lastMediaTime > 2) {
      _dispatch("matchMediaInit");
      _media.forEach(function(c) {
        var queries = c.queries, conditions = c.conditions, match, p, anyMatch, toggled;
        for (p in queries) {
          match = _win.matchMedia(queries[p]).matches;
          match && (anyMatch = 1);
          if (match !== conditions[p]) {
            conditions[p] = match;
            toggled = 1;
          }
        }
        if (toggled) {
          c.revert();
          anyMatch && matches2.push(c);
        }
      });
      _dispatch("matchMediaRevert");
      matches2.forEach(function(c) {
        return c.onMatch(c, function(func) {
          return c.add(null, func);
        });
      });
      _lastMediaTime = time;
      _dispatch("matchMedia");
    }
  };
  var Context = /* @__PURE__ */ function() {
    function Context2(func, scope) {
      this.selector = scope && selector(scope);
      this.data = [];
      this._r = [];
      this.isReverted = false;
      this.id = _contextID++;
      func && this.add(func);
    }
    var _proto5 = Context2.prototype;
    _proto5.add = function add(name, func, scope) {
      if (_isFunction(name)) {
        scope = func;
        func = name;
        name = _isFunction;
      }
      var self = this, f = function f2() {
        var prev = _context, prevSelector = self.selector, result;
        prev && prev !== self && prev.data.push(self);
        scope && (self.selector = selector(scope));
        _context = self;
        result = func.apply(self, arguments);
        _isFunction(result) && self._r.push(result);
        _context = prev;
        self.selector = prevSelector;
        self.isReverted = false;
        return result;
      };
      self.last = f;
      return name === _isFunction ? f(self, function(func2) {
        return self.add(null, func2);
      }) : name ? self[name] = f : f;
    };
    _proto5.ignore = function ignore(func) {
      var prev = _context;
      _context = null;
      func(this);
      _context = prev;
    };
    _proto5.getTweens = function getTweens() {
      var a = [];
      this.data.forEach(function(e) {
        return e instanceof Context2 ? a.push.apply(a, e.getTweens()) : e instanceof Tween && !(e.parent && e.parent.data === "nested") && a.push(e);
      });
      return a;
    };
    _proto5.clear = function clear2() {
      this._r.length = this.data.length = 0;
    };
    _proto5.kill = function kill2(revert, matchMedia2) {
      var _this4 = this;
      if (revert) {
        (function() {
          var tweens = _this4.getTweens(), i2 = _this4.data.length, t;
          while (i2--) {
            t = _this4.data[i2];
            if (t.data === "isFlip") {
              t.revert();
              t.getChildren(true, true, false).forEach(function(tween) {
                return tweens.splice(tweens.indexOf(tween), 1);
              });
            }
          }
          tweens.map(function(t2) {
            return {
              g: t2._dur || t2._delay || t2._sat && !t2._sat.vars.immediateRender ? t2.globalTime(0) : -Infinity,
              t: t2
            };
          }).sort(function(a, b) {
            return b.g - a.g || -Infinity;
          }).forEach(function(o) {
            return o.t.revert(revert);
          });
          i2 = _this4.data.length;
          while (i2--) {
            t = _this4.data[i2];
            if (t instanceof Timeline) {
              if (t.data !== "nested") {
                t.scrollTrigger && t.scrollTrigger.revert();
                t.kill();
              }
            } else {
              !(t instanceof Tween) && t.revert && t.revert(revert);
            }
          }
          _this4._r.forEach(function(f) {
            return f(revert, _this4);
          });
          _this4.isReverted = true;
        })();
      } else {
        this.data.forEach(function(e) {
          return e.kill && e.kill();
        });
      }
      this.clear();
      if (matchMedia2) {
        var i = _media.length;
        while (i--) {
          _media[i].id === this.id && _media.splice(i, 1);
        }
      }
    };
    _proto5.revert = function revert(config3) {
      this.kill(config3 || {});
    };
    return Context2;
  }();
  var MatchMedia = /* @__PURE__ */ function() {
    function MatchMedia2(scope) {
      this.contexts = [];
      this.scope = scope;
      _context && _context.data.push(this);
    }
    var _proto6 = MatchMedia2.prototype;
    _proto6.add = function add(conditions, func, scope) {
      _isObject(conditions) || (conditions = {
        matches: conditions
      });
      var context3 = new Context(0, scope || this.scope), cond = context3.conditions = {}, mq, p, active;
      _context && !context3.selector && (context3.selector = _context.selector);
      this.contexts.push(context3);
      func = context3.add("onMatch", func);
      context3.queries = conditions;
      for (p in conditions) {
        if (p === "all") {
          active = 1;
        } else {
          mq = _win.matchMedia(conditions[p]);
          if (mq) {
            _media.indexOf(context3) < 0 && _media.push(context3);
            (cond[p] = mq.matches) && (active = 1);
            mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
          }
        }
      }
      active && func(context3, function(f) {
        return context3.add(null, f);
      });
      return this;
    };
    _proto6.revert = function revert(config3) {
      this.kill(config3 || {});
    };
    _proto6.kill = function kill2(revert) {
      this.contexts.forEach(function(c) {
        return c.kill(revert, true);
      });
    };
    return MatchMedia2;
  }();
  var _gsap = {
    registerPlugin: function registerPlugin() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      args.forEach(function(config3) {
        return _createPlugin(config3);
      });
    },
    timeline: function timeline(vars) {
      return new Timeline(vars);
    },
    getTweensOf: function getTweensOf(targets, onlyActive) {
      return _globalTimeline.getTweensOf(targets, onlyActive);
    },
    getProperty: function getProperty(target, property, unit, uncache) {
      _isString(target) && (target = toArray(target)[0]);
      var getter = _getCache(target || {}).get, format = unit ? _passThrough : _numericIfPossible;
      unit === "native" && (unit = "");
      return !target ? target : !property ? function(property2, unit2, uncache2) {
        return format((_plugins[property2] && _plugins[property2].get || getter)(target, property2, unit2, uncache2));
      } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    },
    quickSetter: function quickSetter(target, property, unit) {
      target = toArray(target);
      if (target.length > 1) {
        var setters = target.map(function(t) {
          return gsap.quickSetter(t, property, unit);
        }), l = setters.length;
        return function(value) {
          var i = l;
          while (i--) {
            setters[i](value);
          }
        };
      }
      target = target[0] || {};
      var Plugin = _plugins[property], cache2 = _getCache(target), p = cache2.harness && (cache2.harness.aliases || {})[property] || property, setter = Plugin ? function(value) {
        var p2 = new Plugin();
        _quickTween._pt = 0;
        p2.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
        p2.render(1, p2);
        _quickTween._pt && _renderPropTweens(1, _quickTween);
      } : cache2.set(target, p);
      return Plugin ? setter : function(value) {
        return setter(target, p, unit ? value + unit : value, cache2, 1);
      };
    },
    quickTo: function quickTo(target, property, vars) {
      var _setDefaults22;
      var tween = gsap.to(target, _setDefaults((_setDefaults22 = {}, _setDefaults22[property] = "+=0.1", _setDefaults22.paused = true, _setDefaults22.stagger = 0, _setDefaults22), vars || {})), func = function func2(value, start, startIsRelative) {
        return tween.resetTo(property, value, start, startIsRelative);
      };
      func.tween = tween;
      return func;
    },
    isTweening: function isTweening(targets) {
      return _globalTimeline.getTweensOf(targets, true).length > 0;
    },
    defaults: function defaults(value) {
      value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
      return _mergeDeep(_defaults, value || {});
    },
    config: function config2(value) {
      return _mergeDeep(_config, value || {});
    },
    registerEffect: function registerEffect(_ref3) {
      var name = _ref3.name, effect = _ref3.effect, plugins = _ref3.plugins, defaults4 = _ref3.defaults, extendTimeline = _ref3.extendTimeline;
      (plugins || "").split(",").forEach(function(pluginName) {
        return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
      });
      _effects[name] = function(targets, vars, tl3) {
        return effect(toArray(targets), _setDefaults(vars || {}, defaults4), tl3);
      };
      if (extendTimeline) {
        Timeline.prototype[name] = function(targets, vars, position) {
          return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
        };
      }
    },
    registerEase: function registerEase(name, ease) {
      _easeMap[name] = _parseEase(ease);
    },
    parseEase: function parseEase(ease, defaultEase) {
      return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
    },
    getById: function getById(id) {
      return _globalTimeline.getById(id);
    },
    exportRoot: function exportRoot(vars, includeDelayedCalls) {
      if (vars === void 0) {
        vars = {};
      }
      var tl3 = new Timeline(vars), child, next;
      tl3.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);
      _globalTimeline.remove(tl3);
      tl3._dp = 0;
      tl3._time = tl3._tTime = _globalTimeline._time;
      child = _globalTimeline._first;
      while (child) {
        next = child._next;
        if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
          _addToTimeline(tl3, child, child._start - child._delay);
        }
        child = next;
      }
      _addToTimeline(_globalTimeline, tl3, 0);
      return tl3;
    },
    context: function context(func, scope) {
      return func ? new Context(func, scope) : _context;
    },
    matchMedia: function matchMedia(scope) {
      return new MatchMedia(scope);
    },
    matchMediaRefresh: function matchMediaRefresh() {
      return _media.forEach(function(c) {
        var cond = c.conditions, found, p;
        for (p in cond) {
          if (cond[p]) {
            cond[p] = false;
            found = 1;
          }
        }
        found && c.revert();
      }) || _onMediaChange();
    },
    addEventListener: function addEventListener(type, callback) {
      var a = _listeners[type] || (_listeners[type] = []);
      ~a.indexOf(callback) || a.push(callback);
    },
    removeEventListener: function removeEventListener(type, callback) {
      var a = _listeners[type], i = a && a.indexOf(callback);
      i >= 0 && a.splice(i, 1);
    },
    utils: {
      wrap,
      wrapYoyo,
      distribute,
      random,
      snap,
      normalize,
      getUnit,
      clamp,
      splitColor,
      toArray,
      selector,
      mapRange,
      pipe,
      unitize,
      interpolate,
      shuffle
    },
    install: _install,
    effects: _effects,
    ticker: _ticker,
    updateRoot: Timeline.updateRoot,
    plugins: _plugins,
    globalTimeline: _globalTimeline,
    core: {
      PropTween,
      globals: _addGlobal,
      Tween,
      Timeline,
      Animation,
      getCache: _getCache,
      _removeLinkedListItem,
      reverting: function reverting() {
        return _reverting;
      },
      context: function context2(toAdd) {
        if (toAdd && _context) {
          _context.data.push(toAdd);
          toAdd._ctx = _context;
        }
        return _context;
      },
      suppressOverwrites: function suppressOverwrites(value) {
        return _suppressOverwrites = value;
      }
    }
  };
  _forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function(name) {
    return _gsap[name] = Tween[name];
  });
  _ticker.add(Timeline.updateRoot);
  _quickTween = _gsap.to({}, {
    duration: 0
  });
  var _getPluginPropTween = function _getPluginPropTween2(plugin, prop) {
    var pt = plugin._pt;
    while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
      pt = pt._next;
    }
    return pt;
  };
  var _addModifiers = function _addModifiers2(tween, modifiers) {
    var targets = tween._targets, p, i, pt;
    for (p in modifiers) {
      i = targets.length;
      while (i--) {
        pt = tween._ptLookup[i][p];
        if (pt && (pt = pt.d)) {
          if (pt._pt) {
            pt = _getPluginPropTween(pt, p);
          }
          pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
        }
      }
    }
  };
  var _buildModifierPlugin = function _buildModifierPlugin2(name, modifier) {
    return {
      name,
      headless: 1,
      rawVars: 1,
      init: function init6(target, vars, tween) {
        tween._onInit = function(tween2) {
          var temp, p;
          if (_isString(vars)) {
            temp = {};
            _forEachName(vars, function(name2) {
              return temp[name2] = 1;
            });
            vars = temp;
          }
          if (modifier) {
            temp = {};
            for (p in vars) {
              temp[p] = modifier(vars[p]);
            }
            vars = temp;
          }
          _addModifiers(tween2, vars);
        };
      }
    };
  };
  var gsap = _gsap.registerPlugin({
    name: "attr",
    init: function init(target, vars, tween, index, targets) {
      var p, pt, v;
      this.tween = tween;
      for (p in vars) {
        v = target.getAttribute(p) || "";
        pt = this.add(target, "setAttribute", (v || 0) + "", vars[p], index, targets, 0, 0, p);
        pt.op = p;
        pt.b = v;
        this._props.push(p);
      }
    },
    render: function render(ratio, data) {
      var pt = data._pt;
      while (pt) {
        _reverting ? pt.set(pt.t, pt.p, pt.b, pt) : pt.r(ratio, pt.d);
        pt = pt._next;
      }
    }
  }, {
    name: "endArray",
    headless: 1,
    init: function init2(target, value) {
      var i = value.length;
      while (i--) {
        this.add(target, i, target[i] || 0, value[i], 0, 0, 0, 0, 0, 1);
      }
    }
  }, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap;
  Tween.version = Timeline.version = gsap.version = "3.13.0";
  _coreReady = 1;
  _windowExists() && _wake();
  var Power0 = _easeMap.Power0;
  var Power1 = _easeMap.Power1;
  var Power2 = _easeMap.Power2;
  var Power3 = _easeMap.Power3;
  var Power4 = _easeMap.Power4;
  var Linear = _easeMap.Linear;
  var Quad = _easeMap.Quad;
  var Cubic = _easeMap.Cubic;
  var Quart = _easeMap.Quart;
  var Quint = _easeMap.Quint;
  var Strong = _easeMap.Strong;
  var Elastic = _easeMap.Elastic;
  var Back = _easeMap.Back;
  var SteppedEase = _easeMap.SteppedEase;
  var Bounce = _easeMap.Bounce;
  var Sine = _easeMap.Sine;
  var Expo = _easeMap.Expo;
  var Circ = _easeMap.Circ;

  // node_modules/.pnpm/gsap@3.13.0/node_modules/gsap/CSSPlugin.js
  var _win2;
  var _doc2;
  var _docElement;
  var _pluginInitted;
  var _tempDiv;
  var _tempDivStyler;
  var _recentSetterPlugin;
  var _reverting2;
  var _windowExists3 = function _windowExists4() {
    return typeof window !== "undefined";
  };
  var _transformProps = {};
  var _RAD2DEG = 180 / Math.PI;
  var _DEG2RAD = Math.PI / 180;
  var _atan2 = Math.atan2;
  var _bigNum2 = 1e8;
  var _capsExp = /([A-Z])/g;
  var _horizontalExp = /(left|right|width|margin|padding|x)/i;
  var _complexExp = /[\s,\(]\S/;
  var _propertyAliases = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity"
  };
  var _renderCSSProp = function _renderCSSProp2(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
  };
  var _renderPropWithEnd = function _renderPropWithEnd2(ratio, data) {
    return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
  };
  var _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning2(ratio, data) {
    return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u : data.b, data);
  };
  var _renderRoundedCSSProp = function _renderRoundedCSSProp2(ratio, data) {
    var value = data.s + data.c * ratio;
    data.set(data.t, data.p, ~~(value + (value < 0 ? -0.5 : 0.5)) + data.u, data);
  };
  var _renderNonTweeningValue = function _renderNonTweeningValue2(ratio, data) {
    return data.set(data.t, data.p, ratio ? data.e : data.b, data);
  };
  var _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd2(ratio, data) {
    return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
  };
  var _setterCSSStyle = function _setterCSSStyle2(target, property, value) {
    return target.style[property] = value;
  };
  var _setterCSSProp = function _setterCSSProp2(target, property, value) {
    return target.style.setProperty(property, value);
  };
  var _setterTransform = function _setterTransform2(target, property, value) {
    return target._gsap[property] = value;
  };
  var _setterScale = function _setterScale2(target, property, value) {
    return target._gsap.scaleX = target._gsap.scaleY = value;
  };
  var _setterScaleWithRender = function _setterScaleWithRender2(target, property, value, data, ratio) {
    var cache2 = target._gsap;
    cache2.scaleX = cache2.scaleY = value;
    cache2.renderTransform(ratio, cache2);
  };
  var _setterTransformWithRender = function _setterTransformWithRender2(target, property, value, data, ratio) {
    var cache2 = target._gsap;
    cache2[property] = value;
    cache2.renderTransform(ratio, cache2);
  };
  var _transformProp = "transform";
  var _transformOriginProp = _transformProp + "Origin";
  var _saveStyle = function _saveStyle2(property, isNotCSS) {
    var _this = this;
    var target = this.target, style = target.style, cache2 = target._gsap;
    if (property in _transformProps && style) {
      this.tfm = this.tfm || {};
      if (property !== "transform") {
        property = _propertyAliases[property] || property;
        ~property.indexOf(",") ? property.split(",").forEach(function(a) {
          return _this.tfm[a] = _get(target, a);
        }) : this.tfm[property] = cache2.x ? cache2[property] : _get(target, property);
        property === _transformOriginProp && (this.tfm.zOrigin = cache2.zOrigin);
      } else {
        return _propertyAliases.transform.split(",").forEach(function(p) {
          return _saveStyle2.call(_this, p, isNotCSS);
        });
      }
      if (this.props.indexOf(_transformProp) >= 0) {
        return;
      }
      if (cache2.svg) {
        this.svgo = target.getAttribute("data-svg-origin");
        this.props.push(_transformOriginProp, isNotCSS, "");
      }
      property = _transformProp;
    }
    (style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
  };
  var _removeIndependentTransforms = function _removeIndependentTransforms2(style) {
    if (style.translate) {
      style.removeProperty("translate");
      style.removeProperty("scale");
      style.removeProperty("rotate");
    }
  };
  var _revertStyle = function _revertStyle2() {
    var props = this.props, target = this.target, style = target.style, cache2 = target._gsap, i, p;
    for (i = 0; i < props.length; i += 3) {
      if (!props[i + 1]) {
        props[i + 2] ? style[props[i]] = props[i + 2] : style.removeProperty(props[i].substr(0, 2) === "--" ? props[i] : props[i].replace(_capsExp, "-$1").toLowerCase());
      } else if (props[i + 1] === 2) {
        target[props[i]](props[i + 2]);
      } else {
        target[props[i]] = props[i + 2];
      }
    }
    if (this.tfm) {
      for (p in this.tfm) {
        cache2[p] = this.tfm[p];
      }
      if (cache2.svg) {
        cache2.renderTransform();
        target.setAttribute("data-svg-origin", this.svgo || "");
      }
      i = _reverting2();
      if ((!i || !i.isStart) && !style[_transformProp]) {
        _removeIndependentTransforms(style);
        if (cache2.zOrigin && style[_transformOriginProp]) {
          style[_transformOriginProp] += " " + cache2.zOrigin + "px";
          cache2.zOrigin = 0;
          cache2.renderTransform();
        }
        cache2.uncache = 1;
      }
    }
  };
  var _getStyleSaver = function _getStyleSaver2(target, properties) {
    var saver = {
      target,
      props: [],
      revert: _revertStyle,
      save: _saveStyle
    };
    target._gsap || gsap.core.getCache(target);
    properties && target.style && target.nodeType && properties.split(",").forEach(function(p) {
      return saver.save(p);
    });
    return saver;
  };
  var _supports3D;
  var _createElement = function _createElement2(type, ns) {
    var e = _doc2.createElementNS ? _doc2.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc2.createElement(type);
    return e && e.style ? e : _doc2.createElement(type);
  };
  var _getComputedProperty = function _getComputedProperty2(target, property, skipPrefixFallback) {
    var cs = getComputedStyle(target);
    return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty2(target, _checkPropPrefix(property) || property, 1) || "";
  };
  var _prefixes = "O,Moz,ms,Ms,Webkit".split(",");
  var _checkPropPrefix = function _checkPropPrefix2(property, element, preferPrefix) {
    var e = element || _tempDiv, s = e.style, i = 5;
    if (property in s && !preferPrefix) {
      return property;
    }
    property = property.charAt(0).toUpperCase() + property.substr(1);
    while (i-- && !(_prefixes[i] + property in s)) {
    }
    return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
  };
  var _initCore = function _initCore2() {
    if (_windowExists3() && window.document) {
      _win2 = window;
      _doc2 = _win2.document;
      _docElement = _doc2.documentElement;
      _tempDiv = _createElement("div") || {
        style: {}
      };
      _tempDivStyler = _createElement("div");
      _transformProp = _checkPropPrefix(_transformProp);
      _transformOriginProp = _transformProp + "Origin";
      _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0";
      _supports3D = !!_checkPropPrefix("perspective");
      _reverting2 = gsap.core.reverting;
      _pluginInitted = 1;
    }
  };
  var _getReparentedCloneBBox = function _getReparentedCloneBBox2(target) {
    var owner = target.ownerSVGElement, svg = _createElement("svg", owner && owner.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), clone2 = target.cloneNode(true), bbox;
    clone2.style.display = "block";
    svg.appendChild(clone2);
    _docElement.appendChild(svg);
    try {
      bbox = clone2.getBBox();
    } catch (e) {
    }
    svg.removeChild(clone2);
    _docElement.removeChild(svg);
    return bbox;
  };
  var _getAttributeFallbacks = function _getAttributeFallbacks2(target, attributesArray) {
    var i = attributesArray.length;
    while (i--) {
      if (target.hasAttribute(attributesArray[i])) {
        return target.getAttribute(attributesArray[i]);
      }
    }
  };
  var _getBBox = function _getBBox2(target) {
    var bounds, cloned;
    try {
      bounds = target.getBBox();
    } catch (error) {
      bounds = _getReparentedCloneBBox(target);
      cloned = 1;
    }
    bounds && (bounds.width || bounds.height) || cloned || (bounds = _getReparentedCloneBBox(target));
    return bounds && !bounds.width && !bounds.x && !bounds.y ? {
      x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
      y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
      width: 0,
      height: 0
    } : bounds;
  };
  var _isSVG = function _isSVG2(e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
  };
  var _removeProperty = function _removeProperty2(target, property) {
    if (property) {
      var style = target.style, first2Chars;
      if (property in _transformProps && property !== _transformOriginProp) {
        property = _transformProp;
      }
      if (style.removeProperty) {
        first2Chars = property.substr(0, 2);
        if (first2Chars === "ms" || property.substr(0, 6) === "webkit") {
          property = "-" + property;
        }
        style.removeProperty(first2Chars === "--" ? property : property.replace(_capsExp, "-$1").toLowerCase());
      } else {
        style.removeAttribute(property);
      }
    }
  };
  var _addNonTweeningPT = function _addNonTweeningPT2(plugin, target, property, beginning, end, onlySetAtEnd) {
    var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
    plugin._pt = pt;
    pt.b = beginning;
    pt.e = end;
    plugin._props.push(property);
    return pt;
  };
  var _nonConvertibleUnits = {
    deg: 1,
    rad: 1,
    turn: 1
  };
  var _nonStandardLayouts = {
    grid: 1,
    flex: 1
  };
  var _convertToUnit = function _convertToUnit2(target, property, value, unit) {
    var curValue = parseFloat(value) || 0, curUnit = (value + "").trim().substr((curValue + "").length) || "px", style = _tempDiv.style, horizontal = _horizontalExp.test(property), isRootSVG = target.tagName.toLowerCase() === "svg", measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"), amount = 100, toPixels = unit === "px", toPercent = unit === "%", px, parent, cache2, isSVG;
    if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
      return curValue;
    }
    curUnit !== "px" && !toPixels && (curValue = _convertToUnit2(target, property, value, "px"));
    isSVG = target.getCTM && _isSVG(target);
    if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
      px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
      return _round(toPercent ? curValue / px * amount : curValue / 100 * px);
    }
    style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
    parent = unit !== "rem" && ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;
    if (isSVG) {
      parent = (target.ownerSVGElement || {}).parentNode;
    }
    if (!parent || parent === _doc2 || !parent.appendChild) {
      parent = _doc2.body;
    }
    cache2 = parent._gsap;
    if (cache2 && toPercent && cache2.width && horizontal && cache2.time === _ticker.time && !cache2.uncache) {
      return _round(curValue / cache2.width * amount);
    } else {
      if (toPercent && (property === "height" || property === "width")) {
        var v = target.style[property];
        target.style[property] = amount + unit;
        px = target[measureProperty];
        v ? target.style[property] = v : _removeProperty(target, property);
      } else {
        (toPercent || curUnit === "%") && !_nonStandardLayouts[_getComputedProperty(parent, "display")] && (style.position = _getComputedProperty(target, "position"));
        parent === target && (style.position = "static");
        parent.appendChild(_tempDiv);
        px = _tempDiv[measureProperty];
        parent.removeChild(_tempDiv);
        style.position = "absolute";
      }
      if (horizontal && toPercent) {
        cache2 = _getCache(parent);
        cache2.time = _ticker.time;
        cache2.width = parent[measureProperty];
      }
    }
    return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
  };
  var _get = function _get2(target, property, unit, uncache) {
    var value;
    _pluginInitted || _initCore();
    if (property in _propertyAliases && property !== "transform") {
      property = _propertyAliases[property];
      if (~property.indexOf(",")) {
        property = property.split(",")[0];
      }
    }
    if (_transformProps[property] && property !== "transform") {
      value = _parseTransform(target, uncache);
      value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
    } else {
      value = target.style[property];
      if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
        value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0);
      }
    }
    return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
  };
  var _tweenComplexCSSString = function _tweenComplexCSSString2(target, prop, start, end) {
    if (!start || start === "none") {
      var p = _checkPropPrefix(prop, target, 1), s = p && _getComputedProperty(target, p, 1);
      if (s && s !== start) {
        prop = p;
        start = s;
      } else if (prop === "borderColor") {
        start = _getComputedProperty(target, "borderTopColor");
      }
    }
    var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString), index = 0, matchIndex = 0, a, result, startValues, startNum, color, startValue, endValue, endNum, chunk, endUnit, startUnit, endValues;
    pt.b = start;
    pt.e = end;
    start += "";
    end += "";
    if (end.substring(0, 6) === "var(--") {
      end = _getComputedProperty(target, end.substring(4, end.indexOf(")")));
    }
    if (end === "auto") {
      startValue = target.style[prop];
      target.style[prop] = end;
      end = _getComputedProperty(target, prop) || end;
      startValue ? target.style[prop] = startValue : _removeProperty(target, prop);
    }
    a = [start, end];
    _colorStringFilter(a);
    start = a[0];
    end = a[1];
    startValues = start.match(_numWithUnitExp) || [];
    endValues = end.match(_numWithUnitExp) || [];
    if (endValues.length) {
      while (result = _numWithUnitExp.exec(end)) {
        endValue = result[0];
        chunk = end.substring(index, result.index);
        if (color) {
          color = (color + 1) % 5;
        } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
          color = 1;
        }
        if (endValue !== (startValue = startValues[matchIndex++] || "")) {
          startNum = parseFloat(startValue) || 0;
          startUnit = startValue.substr((startNum + "").length);
          endValue.charAt(1) === "=" && (endValue = _parseRelative(startNum, endValue) + startUnit);
          endNum = parseFloat(endValue);
          endUnit = endValue.substr((endNum + "").length);
          index = _numWithUnitExp.lastIndex - endUnit.length;
          if (!endUnit) {
            endUnit = endUnit || _config.units[prop] || startUnit;
            if (index === end.length) {
              end += endUnit;
              pt.e += endUnit;
            }
          }
          if (startUnit !== endUnit) {
            startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
          }
          pt._pt = {
            _next: pt._pt,
            p: chunk || matchIndex === 1 ? chunk : ",",
            s: startNum,
            c: endNum - startNum,
            m: color && color < 4 || prop === "zIndex" ? Math.round : 0
          };
        }
      }
      pt.c = index < end.length ? end.substring(index, end.length) : "";
    } else {
      pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
    }
    _relExp.test(end) && (pt.e = 0);
    this._pt = pt;
    return pt;
  };
  var _keywordToPercent = {
    top: "0%",
    bottom: "100%",
    left: "0%",
    right: "100%",
    center: "50%"
  };
  var _convertKeywordsToPercentages = function _convertKeywordsToPercentages2(value) {
    var split2 = value.split(" "), x = split2[0], y = split2[1] || "50%";
    if (x === "top" || x === "bottom" || y === "left" || y === "right") {
      value = x;
      x = y;
      y = value;
    }
    split2[0] = _keywordToPercent[x] || x;
    split2[1] = _keywordToPercent[y] || y;
    return split2.join(" ");
  };
  var _renderClearProps = function _renderClearProps2(ratio, data) {
    if (data.tween && data.tween._time === data.tween._dur) {
      var target = data.t, style = target.style, props = data.u, cache2 = target._gsap, prop, clearTransforms, i;
      if (props === "all" || props === true) {
        style.cssText = "";
        clearTransforms = 1;
      } else {
        props = props.split(",");
        i = props.length;
        while (--i > -1) {
          prop = props[i];
          if (_transformProps[prop]) {
            clearTransforms = 1;
            prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
          }
          _removeProperty(target, prop);
        }
      }
      if (clearTransforms) {
        _removeProperty(target, _transformProp);
        if (cache2) {
          cache2.svg && target.removeAttribute("transform");
          style.scale = style.rotate = style.translate = "none";
          _parseTransform(target, 1);
          cache2.uncache = 1;
          _removeIndependentTransforms(style);
        }
      }
    }
  };
  var _specialProps = {
    clearProps: function clearProps(plugin, target, property, endValue, tween) {
      if (tween.data !== "isFromStart") {
        var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
        pt.u = endValue;
        pt.pr = -10;
        pt.tween = tween;
        plugin._props.push(property);
        return 1;
      }
    }
  };
  var _identity2DMatrix = [1, 0, 0, 1, 0, 0];
  var _rotationalProperties = {};
  var _isNullTransform = function _isNullTransform2(value) {
    return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
  };
  var _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray2(target) {
    var matrixString = _getComputedProperty(target, _transformProp);
    return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
  };
  var _getMatrix = function _getMatrix2(target, force2D) {
    var cache2 = target._gsap || _getCache(target), style = target.style, matrix = _getComputedTransformMatrixAsArray(target), parent, nextSibling, temp, addedToDOM;
    if (cache2.svg && target.getAttribute("transform")) {
      temp = target.transform.baseVal.consolidate().matrix;
      matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
      return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
    } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache2.svg) {
      temp = style.display;
      style.display = "block";
      parent = target.parentNode;
      if (!parent || !target.offsetParent && !target.getBoundingClientRect().width) {
        addedToDOM = 1;
        nextSibling = target.nextElementSibling;
        _docElement.appendChild(target);
      }
      matrix = _getComputedTransformMatrixAsArray(target);
      temp ? style.display = temp : _removeProperty(target, "display");
      if (addedToDOM) {
        nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
      }
    }
    return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
  };
  var _applySVGOrigin = function _applySVGOrigin2(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
    var cache2 = target._gsap, matrix = matrixArray || _getMatrix(target, true), xOriginOld = cache2.xOrigin || 0, yOriginOld = cache2.yOrigin || 0, xOffsetOld = cache2.xOffset || 0, yOffsetOld = cache2.yOffset || 0, a = matrix[0], b = matrix[1], c = matrix[2], d = matrix[3], tx = matrix[4], ty = matrix[5], originSplit = origin.split(" "), xOrigin = parseFloat(originSplit[0]) || 0, yOrigin = parseFloat(originSplit[1]) || 0, bounds, determinant, x, y;
    if (!originIsAbsolute) {
      bounds = _getBBox(target);
      xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
      yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
    } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
      x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
      y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
      xOrigin = x;
      yOrigin = y;
    }
    if (smooth || smooth !== false && cache2.smooth) {
      tx = xOrigin - xOriginOld;
      ty = yOrigin - yOriginOld;
      cache2.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
      cache2.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
    } else {
      cache2.xOffset = cache2.yOffset = 0;
    }
    cache2.xOrigin = xOrigin;
    cache2.yOrigin = yOrigin;
    cache2.smooth = !!smooth;
    cache2.origin = origin;
    cache2.originIsAbsolute = !!originIsAbsolute;
    target.style[_transformOriginProp] = "0px 0px";
    if (pluginToAddPropTweensTo) {
      _addNonTweeningPT(pluginToAddPropTweensTo, cache2, "xOrigin", xOriginOld, xOrigin);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache2, "yOrigin", yOriginOld, yOrigin);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache2, "xOffset", xOffsetOld, cache2.xOffset);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache2, "yOffset", yOffsetOld, cache2.yOffset);
    }
    target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
  };
  var _parseTransform = function _parseTransform2(target, uncache) {
    var cache2 = target._gsap || new GSCache(target);
    if ("x" in cache2 && !uncache && !cache2.uncache) {
      return cache2;
    }
    var style = target.style, invertedScaleX = cache2.scaleX < 0, px = "px", deg = "deg", cs = getComputedStyle(target), origin = _getComputedProperty(target, _transformOriginProp) || "0", x, y, z, scaleX, scaleY, rotation, rotationX, rotationY, skewX, skewY, perspective, xOrigin, yOrigin, matrix, angle, cos, sin, a, b, c, d, a12, a22, t1, t2, t3, a13, a23, a33, a42, a43, a32;
    x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
    scaleX = scaleY = 1;
    cache2.svg = !!(target.getCTM && _isSVG(target));
    if (cs.translate) {
      if (cs.translate !== "none" || cs.scale !== "none" || cs.rotate !== "none") {
        style[_transformProp] = (cs.translate !== "none" ? "translate3d(" + (cs.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (cs.rotate !== "none" ? "rotate(" + cs.rotate + ") " : "") + (cs.scale !== "none" ? "scale(" + cs.scale.split(" ").join(",") + ") " : "") + (cs[_transformProp] !== "none" ? cs[_transformProp] : "");
      }
      style.scale = style.rotate = style.translate = "none";
    }
    matrix = _getMatrix(target, cache2.svg);
    if (cache2.svg) {
      if (cache2.uncache) {
        t2 = target.getBBox();
        origin = cache2.xOrigin - t2.x + "px " + (cache2.yOrigin - t2.y) + "px";
        t1 = "";
      } else {
        t1 = !uncache && target.getAttribute("data-svg-origin");
      }
      _applySVGOrigin(target, t1 || origin, !!t1 || cache2.originIsAbsolute, cache2.smooth !== false, matrix);
    }
    xOrigin = cache2.xOrigin || 0;
    yOrigin = cache2.yOrigin || 0;
    if (matrix !== _identity2DMatrix) {
      a = matrix[0];
      b = matrix[1];
      c = matrix[2];
      d = matrix[3];
      x = a12 = matrix[4];
      y = a22 = matrix[5];
      if (matrix.length === 6) {
        scaleX = Math.sqrt(a * a + b * b);
        scaleY = Math.sqrt(d * d + c * c);
        rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0;
        skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
        skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));
        if (cache2.svg) {
          x -= xOrigin - (xOrigin * a + yOrigin * c);
          y -= yOrigin - (xOrigin * b + yOrigin * d);
        }
      } else {
        a32 = matrix[6];
        a42 = matrix[7];
        a13 = matrix[8];
        a23 = matrix[9];
        a33 = matrix[10];
        a43 = matrix[11];
        x = matrix[12];
        y = matrix[13];
        z = matrix[14];
        angle = _atan2(a32, a33);
        rotationX = angle * _RAD2DEG;
        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a12 * cos + a13 * sin;
          t2 = a22 * cos + a23 * sin;
          t3 = a32 * cos + a33 * sin;
          a13 = a12 * -sin + a13 * cos;
          a23 = a22 * -sin + a23 * cos;
          a33 = a32 * -sin + a33 * cos;
          a43 = a42 * -sin + a43 * cos;
          a12 = t1;
          a22 = t2;
          a32 = t3;
        }
        angle = _atan2(-c, a33);
        rotationY = angle * _RAD2DEG;
        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a * cos - a13 * sin;
          t2 = b * cos - a23 * sin;
          t3 = c * cos - a33 * sin;
          a43 = d * sin + a43 * cos;
          a = t1;
          b = t2;
          c = t3;
        }
        angle = _atan2(b, a);
        rotation = angle * _RAD2DEG;
        if (angle) {
          cos = Math.cos(angle);
          sin = Math.sin(angle);
          t1 = a * cos + b * sin;
          t2 = a12 * cos + a22 * sin;
          b = b * cos - a * sin;
          a22 = a22 * cos - a12 * sin;
          a = t1;
          a12 = t2;
        }
        if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
          rotationX = rotation = 0;
          rotationY = 180 - rotationY;
        }
        scaleX = _round(Math.sqrt(a * a + b * b + c * c));
        scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
        angle = _atan2(a12, a22);
        skewX = Math.abs(angle) > 2e-4 ? angle * _RAD2DEG : 0;
        perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
      }
      if (cache2.svg) {
        t1 = target.getAttribute("transform");
        cache2.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
        t1 && target.setAttribute("transform", t1);
      }
    }
    if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
      if (invertedScaleX) {
        scaleX *= -1;
        skewX += rotation <= 0 ? 180 : -180;
        rotation += rotation <= 0 ? 180 : -180;
      } else {
        scaleY *= -1;
        skewX += skewX <= 0 ? 180 : -180;
      }
    }
    uncache = uncache || cache2.uncache;
    cache2.x = x - ((cache2.xPercent = x && (!uncache && cache2.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache2.xPercent / 100 : 0) + px;
    cache2.y = y - ((cache2.yPercent = y && (!uncache && cache2.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache2.yPercent / 100 : 0) + px;
    cache2.z = z + px;
    cache2.scaleX = _round(scaleX);
    cache2.scaleY = _round(scaleY);
    cache2.rotation = _round(rotation) + deg;
    cache2.rotationX = _round(rotationX) + deg;
    cache2.rotationY = _round(rotationY) + deg;
    cache2.skewX = skewX + deg;
    cache2.skewY = skewY + deg;
    cache2.transformPerspective = perspective + px;
    if (cache2.zOrigin = parseFloat(origin.split(" ")[2]) || !uncache && cache2.zOrigin || 0) {
      style[_transformOriginProp] = _firstTwoOnly(origin);
    }
    cache2.xOffset = cache2.yOffset = 0;
    cache2.force3D = _config.force3D;
    cache2.renderTransform = cache2.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
    cache2.uncache = 0;
    return cache2;
  };
  var _firstTwoOnly = function _firstTwoOnly2(value) {
    return (value = value.split(" "))[0] + " " + value[1];
  };
  var _addPxTranslate = function _addPxTranslate2(target, start, value) {
    var unit = getUnit(start);
    return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
  };
  var _renderNon3DTransforms = function _renderNon3DTransforms2(ratio, cache2) {
    cache2.z = "0px";
    cache2.rotationY = cache2.rotationX = "0deg";
    cache2.force3D = 0;
    _renderCSSTransforms(ratio, cache2);
  };
  var _zeroDeg = "0deg";
  var _zeroPx = "0px";
  var _endParenthesis = ") ";
  var _renderCSSTransforms = function _renderCSSTransforms2(ratio, cache2) {
    var _ref = cache2 || this, xPercent = _ref.xPercent, yPercent = _ref.yPercent, x = _ref.x, y = _ref.y, z = _ref.z, rotation = _ref.rotation, rotationY = _ref.rotationY, rotationX = _ref.rotationX, skewX = _ref.skewX, skewY = _ref.skewY, scaleX = _ref.scaleX, scaleY = _ref.scaleY, transformPerspective = _ref.transformPerspective, force3D = _ref.force3D, target = _ref.target, zOrigin = _ref.zOrigin, transforms = "", use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true;
    if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
      var angle = parseFloat(rotationY) * _DEG2RAD, a13 = Math.sin(angle), a33 = Math.cos(angle), cos;
      angle = parseFloat(rotationX) * _DEG2RAD;
      cos = Math.cos(angle);
      x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
      y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
      z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
    }
    if (transformPerspective !== _zeroPx) {
      transforms += "perspective(" + transformPerspective + _endParenthesis;
    }
    if (xPercent || yPercent) {
      transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
    }
    if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
      transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
    }
    if (rotation !== _zeroDeg) {
      transforms += "rotate(" + rotation + _endParenthesis;
    }
    if (rotationY !== _zeroDeg) {
      transforms += "rotateY(" + rotationY + _endParenthesis;
    }
    if (rotationX !== _zeroDeg) {
      transforms += "rotateX(" + rotationX + _endParenthesis;
    }
    if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
      transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
    }
    if (scaleX !== 1 || scaleY !== 1) {
      transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
    }
    target.style[_transformProp] = transforms || "translate(0, 0)";
  };
  var _renderSVGTransforms = function _renderSVGTransforms2(ratio, cache2) {
    var _ref2 = cache2 || this, xPercent = _ref2.xPercent, yPercent = _ref2.yPercent, x = _ref2.x, y = _ref2.y, rotation = _ref2.rotation, skewX = _ref2.skewX, skewY = _ref2.skewY, scaleX = _ref2.scaleX, scaleY = _ref2.scaleY, target = _ref2.target, xOrigin = _ref2.xOrigin, yOrigin = _ref2.yOrigin, xOffset = _ref2.xOffset, yOffset = _ref2.yOffset, forceCSS = _ref2.forceCSS, tx = parseFloat(x), ty = parseFloat(y), a11, a21, a12, a22, temp;
    rotation = parseFloat(rotation);
    skewX = parseFloat(skewX);
    skewY = parseFloat(skewY);
    if (skewY) {
      skewY = parseFloat(skewY);
      skewX += skewY;
      rotation += skewY;
    }
    if (rotation || skewX) {
      rotation *= _DEG2RAD;
      skewX *= _DEG2RAD;
      a11 = Math.cos(rotation) * scaleX;
      a21 = Math.sin(rotation) * scaleX;
      a12 = Math.sin(rotation - skewX) * -scaleY;
      a22 = Math.cos(rotation - skewX) * scaleY;
      if (skewX) {
        skewY *= _DEG2RAD;
        temp = Math.tan(skewX - skewY);
        temp = Math.sqrt(1 + temp * temp);
        a12 *= temp;
        a22 *= temp;
        if (skewY) {
          temp = Math.tan(skewY);
          temp = Math.sqrt(1 + temp * temp);
          a11 *= temp;
          a21 *= temp;
        }
      }
      a11 = _round(a11);
      a21 = _round(a21);
      a12 = _round(a12);
      a22 = _round(a22);
    } else {
      a11 = scaleX;
      a22 = scaleY;
      a21 = a12 = 0;
    }
    if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
      tx = _convertToUnit(target, "x", x, "px");
      ty = _convertToUnit(target, "y", y, "px");
    }
    if (xOrigin || yOrigin || xOffset || yOffset) {
      tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
      ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
    }
    if (xPercent || yPercent) {
      temp = target.getBBox();
      tx = _round(tx + xPercent / 100 * temp.width);
      ty = _round(ty + yPercent / 100 * temp.height);
    }
    temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
    target.setAttribute("transform", temp);
    forceCSS && (target.style[_transformProp] = temp);
  };
  var _addRotationalPropTween = function _addRotationalPropTween2(plugin, target, property, startNum, endValue) {
    var cap = 360, isString2 = _isString(endValue), endNum = parseFloat(endValue) * (isString2 && ~endValue.indexOf("rad") ? _RAD2DEG : 1), change = endNum - startNum, finalValue = startNum + change + "deg", direction, pt;
    if (isString2) {
      direction = endValue.split("_")[1];
      if (direction === "short") {
        change %= cap;
        if (change !== change % (cap / 2)) {
          change += change < 0 ? cap : -cap;
        }
      }
      if (direction === "cw" && change < 0) {
        change = (change + cap * _bigNum2) % cap - ~~(change / cap) * cap;
      } else if (direction === "ccw" && change > 0) {
        change = (change - cap * _bigNum2) % cap - ~~(change / cap) * cap;
      }
    }
    plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
    pt.e = finalValue;
    pt.u = "deg";
    plugin._props.push(property);
    return pt;
  };
  var _assign = function _assign2(target, source) {
    for (var p in source) {
      target[p] = source[p];
    }
    return target;
  };
  var _addRawTransformPTs = function _addRawTransformPTs2(plugin, transforms, target) {
    var startCache = _assign({}, target._gsap), exclude = "perspective,force3D,transformOrigin,svgOrigin", style = target.style, endCache, p, startValue, endValue, startNum, endNum, startUnit, endUnit;
    if (startCache.svg) {
      startValue = target.getAttribute("transform");
      target.setAttribute("transform", "");
      style[_transformProp] = transforms;
      endCache = _parseTransform(target, 1);
      _removeProperty(target, _transformProp);
      target.setAttribute("transform", startValue);
    } else {
      startValue = getComputedStyle(target)[_transformProp];
      style[_transformProp] = transforms;
      endCache = _parseTransform(target, 1);
      style[_transformProp] = startValue;
    }
    for (p in _transformProps) {
      startValue = startCache[p];
      endValue = endCache[p];
      if (startValue !== endValue && exclude.indexOf(p) < 0) {
        startUnit = getUnit(startValue);
        endUnit = getUnit(endValue);
        startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
        endNum = parseFloat(endValue);
        plugin._pt = new PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
        plugin._pt.u = endUnit || 0;
        plugin._props.push(p);
      }
    }
    _assign(endCache, startCache);
  };
  _forEachName("padding,margin,Width,Radius", function(name, index) {
    var t = "Top", r = "Right", b = "Bottom", l = "Left", props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function(side) {
      return index < 2 ? name + side : "border" + side + name;
    });
    _specialProps[index > 1 ? "border" + name : name] = function(plugin, target, property, endValue, tween) {
      var a, vars;
      if (arguments.length < 4) {
        a = props.map(function(prop) {
          return _get(plugin, prop, property);
        });
        vars = a.join(" ");
        return vars.split(a[0]).length === 5 ? a[0] : vars;
      }
      a = (endValue + "").split(" ");
      vars = {};
      props.forEach(function(prop, i) {
        return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
      });
      plugin.init(target, vars, tween);
    };
  });
  var CSSPlugin = {
    name: "css",
    register: _initCore,
    targetTest: function targetTest(target) {
      return target.style && target.nodeType;
    },
    init: function init3(target, vars, tween, index, targets) {
      var props = this._props, style = target.style, startAt = tween.vars.startAt, startValue, endValue, endNum, startNum, type, specialProp, p, startUnit, endUnit, relative, isTransformRelated, transformPropTween, cache2, smooth, hasPriority, inlineProps;
      _pluginInitted || _initCore();
      this.styles = this.styles || _getStyleSaver(target);
      inlineProps = this.styles.props;
      this.tween = tween;
      for (p in vars) {
        if (p === "autoRound") {
          continue;
        }
        endValue = vars[p];
        if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) {
          continue;
        }
        type = typeof endValue;
        specialProp = _specialProps[p];
        if (type === "function") {
          endValue = endValue.call(tween, index, target, targets);
          type = typeof endValue;
        }
        if (type === "string" && ~endValue.indexOf("random(")) {
          endValue = _replaceRandom(endValue);
        }
        if (specialProp) {
          specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
        } else if (p.substr(0, 2) === "--") {
          startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
          endValue += "";
          _colorExp.lastIndex = 0;
          if (!_colorExp.test(startValue)) {
            startUnit = getUnit(startValue);
            endUnit = getUnit(endValue);
          }
          endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
          this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
          props.push(p);
          inlineProps.push(p, 0, style[p]);
        } else if (type !== "undefined") {
          if (startAt && p in startAt) {
            startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
            _isString(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
            getUnit(startValue + "") || startValue === "auto" || (startValue += _config.units[p] || getUnit(_get(target, p)) || "");
            (startValue + "").charAt(1) === "=" && (startValue = _get(target, p));
          } else {
            startValue = _get(target, p);
          }
          startNum = parseFloat(startValue);
          relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
          relative && (endValue = endValue.substr(2));
          endNum = parseFloat(endValue);
          if (p in _propertyAliases) {
            if (p === "autoAlpha") {
              if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
                startNum = 0;
              }
              inlineProps.push("visibility", 0, style.visibility);
              _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
            }
            if (p !== "scale" && p !== "transform") {
              p = _propertyAliases[p];
              ~p.indexOf(",") && (p = p.split(",")[0]);
            }
          }
          isTransformRelated = p in _transformProps;
          if (isTransformRelated) {
            this.styles.save(p);
            if (type === "string" && endValue.substring(0, 6) === "var(--") {
              endValue = _getComputedProperty(target, endValue.substring(4, endValue.indexOf(")")));
              endNum = parseFloat(endValue);
            }
            if (!transformPropTween) {
              cache2 = target._gsap;
              cache2.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform);
              smooth = vars.smoothOrigin !== false && cache2.smooth;
              transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache2.renderTransform, cache2, 0, -1);
              transformPropTween.dep = 1;
            }
            if (p === "scale") {
              this._pt = new PropTween(this._pt, cache2, "scaleY", cache2.scaleY, (relative ? _parseRelative(cache2.scaleY, relative + endNum) : endNum) - cache2.scaleY || 0, _renderCSSProp);
              this._pt.u = 0;
              props.push("scaleY", p);
              p += "X";
            } else if (p === "transformOrigin") {
              inlineProps.push(_transformOriginProp, 0, style[_transformOriginProp]);
              endValue = _convertKeywordsToPercentages(endValue);
              if (cache2.svg) {
                _applySVGOrigin(target, endValue, 0, smooth, 0, this);
              } else {
                endUnit = parseFloat(endValue.split(" ")[2]) || 0;
                endUnit !== cache2.zOrigin && _addNonTweeningPT(this, cache2, "zOrigin", cache2.zOrigin, endUnit);
                _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
              }
              continue;
            } else if (p === "svgOrigin") {
              _applySVGOrigin(target, endValue, 1, smooth, 0, this);
              continue;
            } else if (p in _rotationalProperties) {
              _addRotationalPropTween(this, cache2, p, startNum, relative ? _parseRelative(startNum, relative + endValue) : endValue);
              continue;
            } else if (p === "smoothOrigin") {
              _addNonTweeningPT(this, cache2, "smooth", cache2.smooth, endValue);
              continue;
            } else if (p === "force3D") {
              cache2[p] = endValue;
              continue;
            } else if (p === "transform") {
              _addRawTransformPTs(this, endValue, target);
              continue;
            }
          } else if (!(p in style)) {
            p = _checkPropPrefix(p) || p;
          }
          if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
            startUnit = (startValue + "").substr((startNum + "").length);
            endNum || (endNum = 0);
            endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
            startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
            this._pt = new PropTween(this._pt, isTransformRelated ? cache2 : style, p, startNum, (relative ? _parseRelative(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
            this._pt.u = endUnit || 0;
            if (startUnit !== endUnit && endUnit !== "%") {
              this._pt.b = startValue;
              this._pt.r = _renderCSSPropWithBeginning;
            }
          } else if (!(p in style)) {
            if (p in target) {
              this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets);
            } else if (p !== "parseTransform") {
              _missingPlugin(p, endValue);
              continue;
            }
          } else {
            _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
          }
          isTransformRelated || (p in style ? inlineProps.push(p, 0, style[p]) : typeof target[p] === "function" ? inlineProps.push(p, 2, target[p]()) : inlineProps.push(p, 1, startValue || target[p]));
          props.push(p);
        }
      }
      hasPriority && _sortPropTweensByPriority(this);
    },
    render: function render2(ratio, data) {
      if (data.tween._time || !_reverting2()) {
        var pt = data._pt;
        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }
      } else {
        data.styles.revert();
      }
    },
    get: _get,
    aliases: _propertyAliases,
    getSetter: function getSetter(target, property, plugin) {
      var p = _propertyAliases[property];
      p && p.indexOf(",") < 0 && (property = p);
      return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
    },
    core: {
      _removeProperty,
      _getMatrix
    }
  };
  gsap.utils.checkPrefix = _checkPropPrefix;
  gsap.core.getStyleSaver = _getStyleSaver;
  (function(positionAndScale, rotation, others, aliases) {
    var all = _forEachName(positionAndScale + "," + rotation + "," + others, function(name) {
      _transformProps[name] = 1;
    });
    _forEachName(rotation, function(name) {
      _config.units[name] = "deg";
      _rotationalProperties[name] = 1;
    });
    _propertyAliases[all[13]] = positionAndScale + "," + rotation;
    _forEachName(aliases, function(name) {
      var split2 = name.split(":");
      _propertyAliases[split2[1]] = all[split2[0]];
    });
  })("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
  _forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(name) {
    _config.units[name] = "px";
  });
  gsap.registerPlugin(CSSPlugin);

  // node_modules/.pnpm/gsap@3.13.0/node_modules/gsap/index.js
  var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap;
  var TweenMaxWithCSS = gsapWithCSS.core.Tween;

  // node_modules/.pnpm/selector-set@1.1.5/node_modules/selector-set/selector-set.next.js
  function SelectorSet() {
    if (!(this instanceof SelectorSet)) {
      return new SelectorSet();
    }
    this.size = 0;
    this.uid = 0;
    this.selectors = [];
    this.selectorObjects = {};
    this.indexes = Object.create(this.indexes);
    this.activeIndexes = [];
  }
  var docElem = window.document.documentElement;
  var matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector;
  SelectorSet.prototype.matchesSelector = function(el, selector3) {
    return matches.call(el, selector3);
  };
  SelectorSet.prototype.querySelectorAll = function(selectors, context3) {
    return context3.querySelectorAll(selectors);
  };
  SelectorSet.prototype.indexes = [];
  var idRe = /^#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
  SelectorSet.prototype.indexes.push({
    name: "ID",
    selector: function matchIdSelector(sel) {
      var m;
      if (m = sel.match(idRe)) {
        return m[0].slice(1);
      }
    },
    element: function getElementId(el) {
      if (el.id) {
        return [el.id];
      }
    }
  });
  var classRe = /^\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
  SelectorSet.prototype.indexes.push({
    name: "CLASS",
    selector: function matchClassSelector(sel) {
      var m;
      if (m = sel.match(classRe)) {
        return m[0].slice(1);
      }
    },
    element: function getElementClassNames(el) {
      var className = el.className;
      if (className) {
        if (typeof className === "string") {
          return className.split(/\s/);
        } else if (typeof className === "object" && "baseVal" in className) {
          return className.baseVal.split(/\s/);
        }
      }
    }
  });
  var tagRe = /^((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
  SelectorSet.prototype.indexes.push({
    name: "TAG",
    selector: function matchTagSelector(sel) {
      var m;
      if (m = sel.match(tagRe)) {
        return m[0].toUpperCase();
      }
    },
    element: function getElementTagName(el) {
      return [el.nodeName.toUpperCase()];
    }
  });
  SelectorSet.prototype.indexes["default"] = {
    name: "UNIVERSAL",
    selector: function() {
      return true;
    },
    element: function() {
      return [true];
    }
  };
  var Map2;
  if (typeof window.Map === "function") {
    Map2 = window.Map;
  } else {
    Map2 = function() {
      function Map3() {
        this.map = {};
      }
      Map3.prototype.get = function(key) {
        return this.map[key + " "];
      };
      Map3.prototype.set = function(key, value) {
        this.map[key + " "] = value;
      };
      return Map3;
    }();
  }
  var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;
  function parseSelectorIndexes(allIndexes, selector3) {
    allIndexes = allIndexes.slice(0).concat(allIndexes["default"]);
    var allIndexesLen = allIndexes.length, i, j, m, dup, rest = selector3, key, index, indexes = [];
    do {
      chunker.exec("");
      if (m = chunker.exec(rest)) {
        rest = m[3];
        if (m[2] || !rest) {
          for (i = 0; i < allIndexesLen; i++) {
            index = allIndexes[i];
            if (key = index.selector(m[1])) {
              j = indexes.length;
              dup = false;
              while (j--) {
                if (indexes[j].index === index && indexes[j].key === key) {
                  dup = true;
                  break;
                }
              }
              if (!dup) {
                indexes.push({ index, key });
              }
              break;
            }
          }
        }
      }
    } while (m);
    return indexes;
  }
  function findByPrototype(ary, proto) {
    var i, len, item;
    for (i = 0, len = ary.length; i < len; i++) {
      item = ary[i];
      if (proto.isPrototypeOf(item)) {
        return item;
      }
    }
  }
  SelectorSet.prototype.logDefaultIndexUsed = function() {
  };
  SelectorSet.prototype.add = function(selector3, data) {
    var obj, i, indexProto, key, index, objs, selectorIndexes, selectorIndex, indexes = this.activeIndexes, selectors = this.selectors, selectorObjects = this.selectorObjects;
    if (typeof selector3 !== "string") {
      return;
    }
    obj = {
      id: this.uid++,
      selector: selector3,
      data
    };
    selectorObjects[obj.id] = obj;
    selectorIndexes = parseSelectorIndexes(this.indexes, selector3);
    for (i = 0; i < selectorIndexes.length; i++) {
      selectorIndex = selectorIndexes[i];
      key = selectorIndex.key;
      indexProto = selectorIndex.index;
      index = findByPrototype(indexes, indexProto);
      if (!index) {
        index = Object.create(indexProto);
        index.map = new Map2();
        indexes.push(index);
      }
      if (indexProto === this.indexes["default"]) {
        this.logDefaultIndexUsed(obj);
      }
      objs = index.map.get(key);
      if (!objs) {
        objs = [];
        index.map.set(key, objs);
      }
      objs.push(obj);
    }
    this.size++;
    selectors.push(selector3);
  };
  SelectorSet.prototype.remove = function(selector3, data) {
    if (typeof selector3 !== "string") {
      return;
    }
    var selectorIndexes, selectorIndex, i, j, k, selIndex, objs, obj, indexes = this.activeIndexes, selectors = this.selectors = [], selectorObjects = this.selectorObjects, removedIds = {}, removeAll = arguments.length === 1;
    selectorIndexes = parseSelectorIndexes(this.indexes, selector3);
    for (i = 0; i < selectorIndexes.length; i++) {
      selectorIndex = selectorIndexes[i];
      j = indexes.length;
      while (j--) {
        selIndex = indexes[j];
        if (selectorIndex.index.isPrototypeOf(selIndex)) {
          objs = selIndex.map.get(selectorIndex.key);
          if (objs) {
            k = objs.length;
            while (k--) {
              obj = objs[k];
              if (obj.selector === selector3 && (removeAll || obj.data === data)) {
                objs.splice(k, 1);
                removedIds[obj.id] = true;
              }
            }
          }
          break;
        }
      }
    }
    for (i in removedIds) {
      delete selectorObjects[i];
      this.size--;
    }
    for (i in selectorObjects) {
      selectors.push(selectorObjects[i].selector);
    }
  };
  function sortById(a, b) {
    return a.id - b.id;
  }
  SelectorSet.prototype.queryAll = function(context3) {
    if (!this.selectors.length) {
      return [];
    }
    var matches2 = {}, results = [];
    var els = this.querySelectorAll(this.selectors.join(", "), context3);
    var i, j, len, len2, el, m, match, obj;
    for (i = 0, len = els.length; i < len; i++) {
      el = els[i];
      m = this.matches(el);
      for (j = 0, len2 = m.length; j < len2; j++) {
        obj = m[j];
        if (!matches2[obj.id]) {
          match = {
            id: obj.id,
            selector: obj.selector,
            data: obj.data,
            elements: []
          };
          matches2[obj.id] = match;
          results.push(match);
        } else {
          match = matches2[obj.id];
        }
        match.elements.push(el);
      }
    }
    return results.sort(sortById);
  };
  SelectorSet.prototype.matches = function(el) {
    if (!el) {
      return [];
    }
    var i, j, k, len, len2, len3, index, keys, objs, obj, id;
    var indexes = this.activeIndexes, matchedIds = {}, matches2 = [];
    for (i = 0, len = indexes.length; i < len; i++) {
      index = indexes[i];
      keys = index.element(el);
      if (keys) {
        for (j = 0, len2 = keys.length; j < len2; j++) {
          if (objs = index.map.get(keys[j])) {
            for (k = 0, len3 = objs.length; k < len3; k++) {
              obj = objs[k];
              id = obj.id;
              if (!matchedIds[id] && this.matchesSelector(el, obj.selector)) {
                matchedIds[id] = true;
                matches2.push(obj);
              }
            }
          }
        }
      }
    }
    return matches2.sort(sortById);
  };

  // node_modules/.pnpm/@unseenco+e@2.5.0/node_modules/@unseenco/e/src/utils.js
  var eventTypes = {};
  var listeners = {};
  var nonBubblers = ["mouseenter", "mouseleave", "pointerenter", "pointerleave", "blur", "focus"];
  function makeBusStack(event2) {
    if (listeners[event2] === void 0) {
      listeners[event2] = /* @__PURE__ */ new Set();
    }
  }
  function triggerBus(event2, args) {
    if (listeners[event2]) {
      listeners[event2].forEach((cb) => {
        cb(...args);
      });
    }
  }
  function maybeRunQuerySelector(el) {
    return typeof el === "string" ? document.querySelectorAll(el) : el;
  }
  function handleDelegation(e) {
    let matches2 = traverse(eventTypes[e.type], e.target);
    if (matches2.length) {
      for (let i = 0; i < matches2.length; i++) {
        for (let i2 = 0; i2 < matches2[i].stack.length; i2++) {
          if (nonBubblers.indexOf(e.type) !== -1) {
            addDelegateTarget(e, matches2[i].delegatedTarget);
            if (e.target === matches2[i].delegatedTarget) {
              matches2[i].stack[i2].data(e);
            }
          } else {
            addDelegateTarget(e, matches2[i].delegatedTarget);
            matches2[i].stack[i2].data(e);
          }
        }
      }
    }
  }
  function traverse(listeners2, target) {
    const queue = [];
    let node = target;
    do {
      if (node.nodeType !== 1) {
        break;
      }
      const matches2 = listeners2.matches(node);
      if (matches2.length) {
        queue.push({ delegatedTarget: node, stack: matches2 });
      }
    } while (node = node.parentElement);
    return queue;
  }
  function addDelegateTarget(event2, delegatedTarget) {
    Object.defineProperty(event2, "currentTarget", {
      configurable: true,
      enumerable: true,
      get: () => delegatedTarget
    });
  }
  function clone(object) {
    const copy = {};
    for (const key in object) {
      copy[key] = [...object[key]];
    }
    return copy;
  }

  // node_modules/.pnpm/@unseenco+e@2.5.0/node_modules/@unseenco/e/src/e.js
  var E = class {
    bindAll(context3, methods) {
      if (!methods) {
        methods = Object.getOwnPropertyNames(Object.getPrototypeOf(context3));
      }
      for (let i = 0; i < methods.length; i++) {
        context3[methods[i]] = context3[methods[i]].bind(context3);
      }
    }
    on(event2, el, callback, options) {
      const events2 = event2.split(" ");
      for (let i = 0; i < events2.length; i++) {
        if (typeof el === "function" && callback === void 0) {
          makeBusStack(events2[i]);
          listeners[events2[i]].add(el);
          continue;
        }
        if (el.nodeType && el.nodeType === 1 || el === window || el === document) {
          el.addEventListener(events2[i], callback, options);
          continue;
        }
        el = maybeRunQuerySelector(el);
        for (let n = 0; n < el.length; n++) {
          el[n].addEventListener(events2[i], callback, options);
        }
      }
    }
    delegate(event2, delegate, callback) {
      const events2 = event2.split(" ");
      for (let i = 0; i < events2.length; i++) {
        let map = eventTypes[events2[i]];
        if (map === void 0) {
          map = new SelectorSet();
          eventTypes[events2[i]] = map;
          if (nonBubblers.indexOf(events2[i]) !== -1) {
            document.addEventListener(events2[i], handleDelegation, true);
          } else {
            document.addEventListener(events2[i], handleDelegation);
          }
        }
        map.add(delegate, callback);
      }
    }
    off(event2, el, callback, options) {
      const events2 = event2.split(" ");
      for (let i = 0; i < events2.length; i++) {
        if (el === void 0) {
          listeners[events2[i]]?.clear();
          continue;
        }
        if (typeof el === "function") {
          makeBusStack(events2[i]);
          listeners[events2[i]].delete(el);
          continue;
        }
        const map = eventTypes[events2[i]];
        if (map !== void 0) {
          map.remove(el, callback);
          if (map.size === 0) {
            delete eventTypes[events2[i]];
            if (nonBubblers.indexOf(events2[i]) !== -1) {
              document.removeEventListener(events2[i], handleDelegation, true);
            } else {
              document.removeEventListener(events2[i], handleDelegation);
            }
            continue;
          }
        }
        if (el.removeEventListener !== void 0) {
          el.removeEventListener(events2[i], callback, options);
          continue;
        }
        el = maybeRunQuerySelector(el);
        for (let n = 0; n < el.length; n++) {
          el[n].removeEventListener(events2[i], callback, options);
        }
      }
    }
    emit(event2, ...args) {
      triggerBus(event2, args);
    }
    debugDelegated() {
      return JSON.parse(JSON.stringify(eventTypes));
    }
    debugBus() {
      return clone(listeners);
    }
    hasBus(event2) {
      return this.debugBus().hasOwnProperty(event2);
    }
  };
  var instance = new E();
  var e_default = instance;

  // node_modules/.pnpm/@unseenco+taxi@1.9.0/node_modules/@unseenco/taxi/src/helpers.js
  var parser = new DOMParser();
  function parseDom(html) {
    return typeof html === "string" ? parser.parseFromString(html, "text/html") : html;
  }
  function processUrl(url) {
    const details = new URL(url, window.location.origin);
    const normalized = details.hash.length ? url.replace(details.hash, "") : null;
    return {
      hasHash: details.hash.length > 0,
      pathname: details.pathname.replace(/\/+$/, ""),
      host: details.host,
      search: details.search,
      raw: url,
      href: normalized || details.href
    };
  }
  function reloadElement(node, elementType) {
    node.parentNode.replaceChild(duplicateElement(node, elementType), node);
  }
  function appendElement(node, elementType) {
    const target = node.parentNode.tagName === "HEAD" ? document.head : document.body;
    target.appendChild(duplicateElement(node, elementType));
  }
  function duplicateElement(node, elementType) {
    const replacement = document.createElement(elementType);
    for (let k = 0; k < node.attributes.length; k++) {
      const attr = node.attributes[k];
      replacement.setAttribute(attr.nodeName, attr.nodeValue);
    }
    if (node.innerHTML) {
      replacement.innerHTML = node.innerHTML;
    }
    return replacement;
  }

  // node_modules/.pnpm/@unseenco+taxi@1.9.0/node_modules/@unseenco/taxi/src/Transition.js
  var Transition = class {
    constructor({ wrapper }) {
      this.wrapper = wrapper;
    }
    leave(props) {
      return new Promise((resolve) => {
        this.onLeave({ ...props, done: resolve });
      });
    }
    enter(props) {
      return new Promise((resolve) => {
        this.onEnter({ ...props, done: resolve });
      });
    }
    onLeave({ from, trigger, done }) {
      done();
    }
    onEnter({ to, trigger, done }) {
      done();
    }
  };

  // node_modules/.pnpm/@unseenco+taxi@1.9.0/node_modules/@unseenco/taxi/src/Renderer.js
  var Renderer = class {
    constructor({ content, page, title, wrapper }) {
      this._contentString = content.outerHTML;
      this._DOM = null;
      this.page = page;
      this.title = title;
      this.wrapper = wrapper;
      this.content = this.wrapper.lastElementChild;
    }
    onEnter() {
    }
    onEnterCompleted() {
    }
    onLeave() {
    }
    onLeaveCompleted() {
    }
    initialLoad() {
      this.onEnter();
      this.onEnterCompleted();
    }
    update() {
      document.title = this.title;
      this.wrapper.appendChild(this._DOM.firstElementChild);
      this.content = this.wrapper.lastElementChild;
      this._DOM = null;
    }
    createDom() {
      if (!this._DOM) {
        this._DOM = document.createElement("div");
        this._DOM.innerHTML = this._contentString;
      }
    }
    remove() {
      this.wrapper.firstElementChild.remove();
    }
    enter(transition2, trigger) {
      return new Promise((resolve) => {
        this.onEnter();
        transition2.enter({ trigger, to: this.content }).then(() => {
          this.onEnterCompleted();
          resolve();
        });
      });
    }
    leave(transition2, trigger, removeOldContent) {
      return new Promise((resolve) => {
        this.onLeave();
        transition2.leave({ trigger, from: this.content }).then(() => {
          if (removeOldContent) {
            this.remove();
          }
          this.onLeaveCompleted();
          resolve();
        });
      });
    }
  };

  // node_modules/.pnpm/@unseenco+taxi@1.9.0/node_modules/@unseenco/taxi/src/RouteStore.js
  var RouteStore = class {
    data = /* @__PURE__ */ new Map();
    regexCache = /* @__PURE__ */ new Map();
    add(fromPattern, toPattern, transition2) {
      if (!this.data.has(fromPattern)) {
        this.data.set(fromPattern, /* @__PURE__ */ new Map());
        this.regexCache.set(fromPattern, new RegExp(`^${fromPattern}$`));
      }
      this.data.get(fromPattern).set(toPattern, transition2);
      this.regexCache.set(toPattern, new RegExp(`^${toPattern}$`));
    }
    findMatch(currentUrl, nextUrl) {
      for (const [fromPattern, potentialMatches] of this.data) {
        if (currentUrl.pathname.match(this.regexCache.get(fromPattern))) {
          for (const [toPattern, transition2] of potentialMatches) {
            if (nextUrl.pathname.match(this.regexCache.get(toPattern))) {
              return transition2;
            }
          }
          break;
        }
      }
      return null;
    }
  };

  // node_modules/.pnpm/@unseenco+taxi@1.9.0/node_modules/@unseenco/taxi/src/Core.js
  var IN_PROGRESS = "A transition is currently in progress";
  var Core = class {
    isTransitioning = false;
    currentCacheEntry = null;
    cache = /* @__PURE__ */ new Map();
    activePromises = /* @__PURE__ */ new Map();
    constructor(parameters = {}) {
      const {
        links = "a[href]:not([target]):not([href^=\\#]):not([data-taxi-ignore])",
        removeOldContent = true,
        allowInterruption = false,
        bypassCache = false,
        enablePrefetch = true,
        renderers = {
          default: Renderer
        },
        transitions = {
          default: Transition
        },
        reloadJsFilter = (element) => element.dataset.taxiReload !== void 0,
        reloadCssFilter = (element) => true
      } = parameters;
      this.renderers = renderers;
      this.transitions = transitions;
      this.defaultRenderer = this.renderers.default || Renderer;
      this.defaultTransition = this.transitions.default || Transition;
      this.wrapper = document.querySelector("[data-taxi]");
      this.reloadJsFilter = reloadJsFilter;
      this.reloadCssFilter = reloadCssFilter;
      this.removeOldContent = removeOldContent;
      this.allowInterruption = allowInterruption;
      this.bypassCache = bypassCache;
      this.enablePrefetch = enablePrefetch;
      this.cache = /* @__PURE__ */ new Map();
      this.isPopping = false;
      this.attachEvents(links);
      this.currentLocation = processUrl(window.location.href);
      this.cache.set(this.currentLocation.href, this.createCacheEntry(document.cloneNode(true), window.location.href));
      this.currentCacheEntry = this.cache.get(this.currentLocation.href);
      this.currentCacheEntry.renderer.initialLoad();
    }
    setDefaultRenderer(renderer) {
      this.defaultRenderer = this.renderers[renderer];
    }
    setDefaultTransition(transition2) {
      this.defaultTransition = this.transitions[transition2];
    }
    addRoute(fromPattern, toPattern, transition2) {
      if (!this.router) {
        this.router = new RouteStore();
      }
      this.router.add(fromPattern, toPattern, transition2);
    }
    preload(url, preloadAssets = false) {
      url = processUrl(url).href;
      if (!this.cache.has(url)) {
        return this.fetch(url, false).then(async (response) => {
          this.cache.set(url, this.createCacheEntry(response.html, response.url));
          if (preloadAssets) {
            this.cache.get(url).renderer.createDom();
          }
        }).catch((err) => console.warn(err));
      }
      return Promise.resolve();
    }
    updateCache(url) {
      const key = processUrl(url || window.location.href).href;
      if (this.cache.has(key)) {
        this.cache.delete(key);
      }
      this.cache.set(key, this.createCacheEntry(document.cloneNode(true), key));
    }
    clearCache(url) {
      const key = processUrl(url || window.location.href).href;
      if (this.cache.has(key)) {
        this.cache.delete(key);
      }
    }
    navigateTo(url, transition2 = false, trigger = false) {
      return new Promise((resolve, reject) => {
        if (!this.allowInterruption && this.isTransitioning) {
          reject(new Error(IN_PROGRESS));
          return;
        }
        this.isTransitioning = true;
        this.isPopping = true;
        this.targetLocation = processUrl(url);
        this.popTarget = window.location.href;
        const TransitionClass = new (this.chooseTransition(transition2))({ wrapper: this.wrapper });
        let navigationPromise;
        if (this.bypassCache || !this.cache.has(this.targetLocation.href) || this.cache.get(this.targetLocation.href).skipCache) {
          const fetched = this.fetch(this.targetLocation.href).then((response) => {
            this.cache.set(this.targetLocation.href, this.createCacheEntry(response.html, response.url));
            this.cache.get(this.targetLocation.href).renderer.createDom();
          }).catch((err) => {
            window.location.href = url;
          });
          navigationPromise = this.beforeFetch(this.targetLocation, TransitionClass, trigger).then(async () => {
            return fetched.then(async () => {
              return await this.afterFetch(this.targetLocation, TransitionClass, this.cache.get(this.targetLocation.href), trigger);
            });
          });
        } else {
          this.cache.get(this.targetLocation.href).renderer.createDom();
          navigationPromise = this.beforeFetch(this.targetLocation, TransitionClass, trigger).then(async () => {
            return await this.afterFetch(this.targetLocation, TransitionClass, this.cache.get(this.targetLocation.href), trigger);
          });
        }
        navigationPromise.then(() => {
          resolve();
        });
      });
    }
    on(event2, callback) {
      e_default.on(event2, callback);
    }
    off(event2, callback) {
      e_default.off(event2, callback);
    }
    beforeFetch(url, TransitionClass, trigger) {
      e_default.emit("NAVIGATE_OUT", {
        from: this.currentCacheEntry,
        trigger
      });
      return new Promise((resolve) => {
        this.currentCacheEntry.renderer.leave(TransitionClass, trigger, this.removeOldContent).then(() => {
          if (trigger !== "popstate") {
            window.history.pushState({}, "", url.raw);
          }
          resolve();
        });
      });
    }
    afterFetch(url, TransitionClass, entry, trigger) {
      this.currentLocation = url;
      this.popTarget = this.currentLocation.href;
      return new Promise((resolve) => {
        entry.renderer.update();
        e_default.emit("NAVIGATE_IN", {
          from: this.currentCacheEntry,
          to: entry,
          trigger
        });
        if (this.reloadJsFilter) {
          this.loadScripts(entry.scripts);
        }
        if (this.reloadCssFilter) {
          this.loadStyles(entry.styles);
        }
        if (trigger !== "popstate" && url.href !== entry.finalUrl) {
          window.history.replaceState({}, "", entry.finalUrl);
        }
        entry.renderer.enter(TransitionClass, trigger).then(() => {
          e_default.emit("NAVIGATE_END", {
            from: this.currentCacheEntry,
            to: entry,
            trigger
          });
          this.currentCacheEntry = entry;
          this.isTransitioning = false;
          this.isPopping = false;
          resolve();
        });
      });
    }
    loadScripts(cachedScripts) {
      const newScripts = [...cachedScripts];
      const currentScripts = Array.from(document.querySelectorAll("script")).filter(this.reloadJsFilter);
      for (let i = 0; i < currentScripts.length; i++) {
        for (let n = 0; n < newScripts.length; n++) {
          if (currentScripts[i].outerHTML === newScripts[n].outerHTML) {
            reloadElement(currentScripts[i], "SCRIPT");
            newScripts.splice(n, 1);
            break;
          }
        }
      }
      for (const script of newScripts) {
        appendElement(script, "SCRIPT");
      }
    }
    loadStyles(cachedStyles) {
      const currentStyles = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).filter(this.reloadCssFilter);
      const currentInlineStyles = Array.from(document.querySelectorAll("style")).filter(this.reloadCssFilter);
      const newInlineStyles = cachedStyles.filter((el) => {
        if (!el.href) {
          return true;
        } else if (!currentStyles.find((link) => link.href === el.href)) {
          document.body.append(el);
          return false;
        }
      });
      for (let i = 0; i < currentInlineStyles.length; i++) {
        for (let n = 0; n < newInlineStyles.length; n++) {
          if (currentInlineStyles[i].outerHTML === newInlineStyles[n].outerHTML) {
            reloadElement(currentInlineStyles[i], "STYLE");
            newInlineStyles.splice(n, 1);
            break;
          }
        }
      }
      for (const style of newInlineStyles) {
        appendElement(style, "STYLE");
      }
    }
    attachEvents(links) {
      e_default.delegate("click", links, this.onClick);
      e_default.on("popstate", window, this.onPopstate);
      if (this.enablePrefetch) {
        e_default.delegate("mouseenter focus", links, this.onPrefetch);
      }
    }
    onClick = (e) => {
      if (!(e.metaKey || e.ctrlKey)) {
        const target = processUrl(e.currentTarget.href);
        this.currentLocation = processUrl(window.location.href);
        if (this.currentLocation.host !== target.host) {
          return;
        }
        if (this.currentLocation.href !== target.href || this.currentLocation.hasHash && !target.hasHash) {
          e.preventDefault();
          this.navigateTo(target.raw, e.currentTarget.dataset.transition || false, e.currentTarget).catch((err) => console.warn(err));
          return;
        }
        if (!this.currentLocation.hasHash && !target.hasHash) {
          e.preventDefault();
        }
      }
    };
    onPopstate = () => {
      const target = processUrl(window.location.href);
      if (target.pathname === this.currentLocation.pathname && target.search === this.currentLocation.search && !this.isPopping) {
        return false;
      }
      if (!this.allowInterruption && (this.isTransitioning || this.isPopping)) {
        window.history.pushState({}, "", this.popTarget);
        console.warn(IN_PROGRESS);
        return false;
      }
      if (!this.isPopping) {
        this.popTarget = window.location.href;
      }
      this.isPopping = true;
      this.navigateTo(window.location.href, false, "popstate");
    };
    onPrefetch = (e) => {
      const target = processUrl(e.currentTarget.href);
      if (this.currentLocation.host !== target.host) {
        return;
      }
      this.preload(e.currentTarget.href, false);
    };
    fetch(url, runFallback = true) {
      if (this.activePromises.has(url)) {
        return this.activePromises.get(url);
      }
      const request3 = new Promise((resolve, reject) => {
        let resolvedUrl;
        fetch(url, {
          mode: "same-origin",
          method: "GET",
          headers: { "X-Requested-With": "Taxi" },
          credentials: "same-origin"
        }).then((response) => {
          if (!response.ok) {
            reject("Taxi encountered a non 2xx HTTP status code");
            if (runFallback) {
              window.location.href = url;
            }
          }
          resolvedUrl = response.url;
          return response.text();
        }).then((htmlString) => {
          resolve({ html: parseDom(htmlString), url: resolvedUrl });
        }).catch((err) => {
          reject(err);
          if (runFallback) {
            window.location.href = url;
          }
        }).finally(() => {
          this.activePromises.delete(url);
        });
      });
      this.activePromises.set(url, request3);
      return request3;
    }
    chooseTransition(transition2) {
      if (transition2) {
        return this.transitions[transition2];
      }
      const routeTransition = this.router?.findMatch(this.currentLocation, this.targetLocation);
      if (routeTransition) {
        return this.transitions[routeTransition];
      }
      return this.defaultTransition;
    }
    createCacheEntry(page, url) {
      const content = page.querySelector("[data-taxi-view]");
      const Renderer2 = content.dataset.taxiView.length ? this.renderers[content.dataset.taxiView] : this.defaultRenderer;
      if (!Renderer2) {
        console.warn(`The Renderer "${content.dataset.taxiView}" was set in the data-taxi-view of the requested page, but not registered in Taxi.`);
      }
      return {
        page,
        content,
        finalUrl: url,
        skipCache: content.hasAttribute("data-taxi-nocache"),
        scripts: this.reloadJsFilter ? Array.from(page.querySelectorAll("script")).filter(this.reloadJsFilter) : [],
        styles: this.reloadCssFilter ? Array.from(page.querySelectorAll('link[rel="stylesheet"], style')).filter(this.reloadCssFilter) : [],
        title: page.title,
        renderer: new Renderer2({
          wrapper: this.wrapper,
          title: page.title,
          content,
          page
        })
      };
    }
  };

  // node_modules/.pnpm/gsap@3.13.0/node_modules/gsap/Observer.js
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  var gsap2;
  var _coreInitted2;
  var _clamp3;
  var _win3;
  var _doc3;
  var _docEl;
  var _body;
  var _isTouch;
  var _pointerType;
  var ScrollTrigger;
  var _root;
  var _normalizer;
  var _eventTypes;
  var _context2;
  var _getGSAP = function _getGSAP2() {
    return gsap2 || typeof window !== "undefined" && (gsap2 = window.gsap) && gsap2.registerPlugin && gsap2;
  };
  var _startup = 1;
  var _observers = [];
  var _scrollers = [];
  var _proxies = [];
  var _getTime = Date.now;
  var _bridge = function _bridge2(name, value) {
    return value;
  };
  var _integrate = function _integrate2() {
    var core = ScrollTrigger.core, data = core.bridge || {}, scrollers = core._scrollers, proxies = core._proxies;
    scrollers.push.apply(scrollers, _scrollers);
    proxies.push.apply(proxies, _proxies);
    _scrollers = scrollers;
    _proxies = proxies;
    _bridge = function _bridge3(name, value) {
      return data[name](value);
    };
  };
  var _getProxyProp = function _getProxyProp2(element, property) {
    return ~_proxies.indexOf(element) && _proxies[_proxies.indexOf(element) + 1][property];
  };
  var _isViewport = function _isViewport2(el) {
    return !!~_root.indexOf(el);
  };
  var _addListener = function _addListener2(element, type, func, passive, capture) {
    return element.addEventListener(type, func, {
      passive: passive !== false,
      capture: !!capture
    });
  };
  var _removeListener = function _removeListener2(element, type, func, capture) {
    return element.removeEventListener(type, func, !!capture);
  };
  var _scrollLeft = "scrollLeft";
  var _scrollTop = "scrollTop";
  var _onScroll = function _onScroll2() {
    return _normalizer && _normalizer.isPressed || _scrollers.cache++;
  };
  var _scrollCacheFunc = function _scrollCacheFunc2(f, doNotCache) {
    var cachingFunc = function cachingFunc2(value) {
      if (value || value === 0) {
        _startup && (_win3.history.scrollRestoration = "manual");
        var isNormalizing = _normalizer && _normalizer.isPressed;
        value = cachingFunc2.v = Math.round(value) || (_normalizer && _normalizer.iOS ? 1 : 0);
        f(value);
        cachingFunc2.cacheID = _scrollers.cache;
        isNormalizing && _bridge("ss", value);
      } else if (doNotCache || _scrollers.cache !== cachingFunc2.cacheID || _bridge("ref")) {
        cachingFunc2.cacheID = _scrollers.cache;
        cachingFunc2.v = f();
      }
      return cachingFunc2.v + cachingFunc2.offset;
    };
    cachingFunc.offset = 0;
    return f && cachingFunc;
  };
  var _horizontal = {
    s: _scrollLeft,
    p: "left",
    p2: "Left",
    os: "right",
    os2: "Right",
    d: "width",
    d2: "Width",
    a: "x",
    sc: _scrollCacheFunc(function(value) {
      return arguments.length ? _win3.scrollTo(value, _vertical.sc()) : _win3.pageXOffset || _doc3[_scrollLeft] || _docEl[_scrollLeft] || _body[_scrollLeft] || 0;
    })
  };
  var _vertical = {
    s: _scrollTop,
    p: "top",
    p2: "Top",
    os: "bottom",
    os2: "Bottom",
    d: "height",
    d2: "Height",
    a: "y",
    op: _horizontal,
    sc: _scrollCacheFunc(function(value) {
      return arguments.length ? _win3.scrollTo(_horizontal.sc(), value) : _win3.pageYOffset || _doc3[_scrollTop] || _docEl[_scrollTop] || _body[_scrollTop] || 0;
    })
  };
  var _getTarget = function _getTarget2(t, self) {
    return (self && self._ctx && self._ctx.selector || gsap2.utils.toArray)(t)[0] || (typeof t === "string" && gsap2.config().nullTargetWarn !== false ? console.warn("Element not found:", t) : null);
  };
  var _isWithin = function _isWithin2(element, list) {
    var i = list.length;
    while (i--) {
      if (list[i] === element || list[i].contains(element)) {
        return true;
      }
    }
    return false;
  };
  var _getScrollFunc = function _getScrollFunc2(element, _ref) {
    var s = _ref.s, sc = _ref.sc;
    _isViewport(element) && (element = _doc3.scrollingElement || _docEl);
    var i = _scrollers.indexOf(element), offset = sc === _vertical.sc ? 1 : 2;
    !~i && (i = _scrollers.push(element) - 1);
    _scrollers[i + offset] || _addListener(element, "scroll", _onScroll);
    var prev = _scrollers[i + offset], func = prev || (_scrollers[i + offset] = _scrollCacheFunc(_getProxyProp(element, s), true) || (_isViewport(element) ? sc : _scrollCacheFunc(function(value) {
      return arguments.length ? element[s] = value : element[s];
    })));
    func.target = element;
    prev || (func.smooth = gsap2.getProperty(element, "scrollBehavior") === "smooth");
    return func;
  };
  var _getVelocityProp = function _getVelocityProp2(value, minTimeRefresh, useDelta) {
    var v1 = value, v2 = value, t1 = _getTime(), t2 = t1, min = minTimeRefresh || 50, dropToZeroTime = Math.max(500, min * 3), update2 = function update3(value2, force) {
      var t = _getTime();
      if (force || t - t1 > min) {
        v2 = v1;
        v1 = value2;
        t2 = t1;
        t1 = t;
      } else if (useDelta) {
        v1 += value2;
      } else {
        v1 = v2 + (value2 - v2) / (t - t2) * (t1 - t2);
      }
    }, reset = function reset2() {
      v2 = v1 = useDelta ? 0 : v1;
      t2 = t1 = 0;
    }, getVelocity = function getVelocity2(latestValue) {
      var tOld = t2, vOld = v2, t = _getTime();
      (latestValue || latestValue === 0) && latestValue !== v1 && update2(latestValue);
      return t1 === t2 || t - t2 > dropToZeroTime ? 0 : (v1 + (useDelta ? vOld : -vOld)) / ((useDelta ? t : t1) - tOld) * 1e3;
    };
    return {
      update: update2,
      reset,
      getVelocity
    };
  };
  var _getEvent = function _getEvent2(e, preventDefault) {
    preventDefault && !e._gsapAllow && e.preventDefault();
    return e.changedTouches ? e.changedTouches[0] : e;
  };
  var _getAbsoluteMax = function _getAbsoluteMax2(a) {
    var max = Math.max.apply(Math, a), min = Math.min.apply(Math, a);
    return Math.abs(max) >= Math.abs(min) ? max : min;
  };
  var _setScrollTrigger = function _setScrollTrigger2() {
    ScrollTrigger = gsap2.core.globals().ScrollTrigger;
    ScrollTrigger && ScrollTrigger.core && _integrate();
  };
  var _initCore3 = function _initCore4(core) {
    gsap2 = core || _getGSAP();
    if (!_coreInitted2 && gsap2 && typeof document !== "undefined" && document.body) {
      _win3 = window;
      _doc3 = document;
      _docEl = _doc3.documentElement;
      _body = _doc3.body;
      _root = [_win3, _doc3, _docEl, _body];
      _clamp3 = gsap2.utils.clamp;
      _context2 = gsap2.core.context || function() {
      };
      _pointerType = "onpointerenter" in _body ? "pointer" : "mouse";
      _isTouch = Observer.isTouch = _win3.matchMedia && _win3.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in _win3 || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0;
      _eventTypes = Observer.eventTypes = ("ontouchstart" in _docEl ? "touchstart,touchmove,touchcancel,touchend" : !("onpointerdown" in _docEl) ? "mousedown,mousemove,mouseup,mouseup" : "pointerdown,pointermove,pointercancel,pointerup").split(",");
      setTimeout(function() {
        return _startup = 0;
      }, 500);
      _setScrollTrigger();
      _coreInitted2 = 1;
    }
    return _coreInitted2;
  };
  _horizontal.op = _vertical;
  _scrollers.cache = 0;
  var Observer = /* @__PURE__ */ function() {
    function Observer3(vars) {
      this.init(vars);
    }
    var _proto = Observer3.prototype;
    _proto.init = function init6(vars) {
      _coreInitted2 || _initCore3(gsap2) || console.warn("Please gsap.registerPlugin(Observer)");
      ScrollTrigger || _setScrollTrigger();
      var tolerance = vars.tolerance, dragMinimum = vars.dragMinimum, type = vars.type, target = vars.target, lineHeight = vars.lineHeight, debounce2 = vars.debounce, preventDefault = vars.preventDefault, onStop = vars.onStop, onStopDelay = vars.onStopDelay, ignore = vars.ignore, wheelSpeed = vars.wheelSpeed, event2 = vars.event, onDragStart = vars.onDragStart, onDragEnd = vars.onDragEnd, onDrag = vars.onDrag, onPress = vars.onPress, onRelease = vars.onRelease, onRight = vars.onRight, onLeft = vars.onLeft, onUp = vars.onUp, onDown = vars.onDown, onChangeX = vars.onChangeX, onChangeY = vars.onChangeY, onChange = vars.onChange, onToggleX = vars.onToggleX, onToggleY = vars.onToggleY, onHover = vars.onHover, onHoverEnd = vars.onHoverEnd, onMove = vars.onMove, ignoreCheck = vars.ignoreCheck, isNormalizer = vars.isNormalizer, onGestureStart = vars.onGestureStart, onGestureEnd = vars.onGestureEnd, onWheel = vars.onWheel, onEnable = vars.onEnable, onDisable = vars.onDisable, onClick2 = vars.onClick, scrollSpeed = vars.scrollSpeed, capture = vars.capture, allowClicks = vars.allowClicks, lockAxis = vars.lockAxis, onLockAxis = vars.onLockAxis;
      this.target = target = _getTarget(target) || _docEl;
      this.vars = vars;
      ignore && (ignore = gsap2.utils.toArray(ignore));
      tolerance = tolerance || 1e-9;
      dragMinimum = dragMinimum || 0;
      wheelSpeed = wheelSpeed || 1;
      scrollSpeed = scrollSpeed || 1;
      type = type || "wheel,touch,pointer";
      debounce2 = debounce2 !== false;
      lineHeight || (lineHeight = parseFloat(_win3.getComputedStyle(_body).lineHeight) || 22);
      var id, onStopDelayedCall, dragged, moved, wheeled, locked, axis, self = this, prevDeltaX = 0, prevDeltaY = 0, passive = vars.passive || !preventDefault && vars.passive !== false, scrollFuncX = _getScrollFunc(target, _horizontal), scrollFuncY = _getScrollFunc(target, _vertical), scrollX = scrollFuncX(), scrollY = scrollFuncY(), limitToTouch = ~type.indexOf("touch") && !~type.indexOf("pointer") && _eventTypes[0] === "pointerdown", isViewport = _isViewport(target), ownerDoc = target.ownerDocument || _doc3, deltaX = [0, 0, 0], deltaY = [0, 0, 0], onClickTime = 0, clickCapture = function clickCapture2() {
        return onClickTime = _getTime();
      }, _ignoreCheck = function _ignoreCheck2(e, isPointerOrTouch) {
        return (self.event = e) && ignore && _isWithin(e.target, ignore) || isPointerOrTouch && limitToTouch && e.pointerType !== "touch" || ignoreCheck && ignoreCheck(e, isPointerOrTouch);
      }, onStopFunc = function onStopFunc2() {
        self._vx.reset();
        self._vy.reset();
        onStopDelayedCall.pause();
        onStop && onStop(self);
      }, update2 = function update3() {
        var dx = self.deltaX = _getAbsoluteMax(deltaX), dy = self.deltaY = _getAbsoluteMax(deltaY), changedX = Math.abs(dx) >= tolerance, changedY = Math.abs(dy) >= tolerance;
        onChange && (changedX || changedY) && onChange(self, dx, dy, deltaX, deltaY);
        if (changedX) {
          onRight && self.deltaX > 0 && onRight(self);
          onLeft && self.deltaX < 0 && onLeft(self);
          onChangeX && onChangeX(self);
          onToggleX && self.deltaX < 0 !== prevDeltaX < 0 && onToggleX(self);
          prevDeltaX = self.deltaX;
          deltaX[0] = deltaX[1] = deltaX[2] = 0;
        }
        if (changedY) {
          onDown && self.deltaY > 0 && onDown(self);
          onUp && self.deltaY < 0 && onUp(self);
          onChangeY && onChangeY(self);
          onToggleY && self.deltaY < 0 !== prevDeltaY < 0 && onToggleY(self);
          prevDeltaY = self.deltaY;
          deltaY[0] = deltaY[1] = deltaY[2] = 0;
        }
        if (moved || dragged) {
          onMove && onMove(self);
          if (dragged) {
            onDragStart && dragged === 1 && onDragStart(self);
            onDrag && onDrag(self);
            dragged = 0;
          }
          moved = false;
        }
        locked && !(locked = false) && onLockAxis && onLockAxis(self);
        if (wheeled) {
          onWheel(self);
          wheeled = false;
        }
        id = 0;
      }, onDelta = function onDelta2(x, y, index) {
        deltaX[index] += x;
        deltaY[index] += y;
        self._vx.update(x);
        self._vy.update(y);
        debounce2 ? id || (id = requestAnimationFrame(update2)) : update2();
      }, onTouchOrPointerDelta = function onTouchOrPointerDelta2(x, y) {
        if (lockAxis && !axis) {
          self.axis = axis = Math.abs(x) > Math.abs(y) ? "x" : "y";
          locked = true;
        }
        if (axis !== "y") {
          deltaX[2] += x;
          self._vx.update(x, true);
        }
        if (axis !== "x") {
          deltaY[2] += y;
          self._vy.update(y, true);
        }
        debounce2 ? id || (id = requestAnimationFrame(update2)) : update2();
      }, _onDrag = function _onDrag2(e) {
        if (_ignoreCheck(e, 1)) {
          return;
        }
        e = _getEvent(e, preventDefault);
        var x = e.clientX, y = e.clientY, dx = x - self.x, dy = y - self.y, isDragging = self.isDragging;
        self.x = x;
        self.y = y;
        if (isDragging || (dx || dy) && (Math.abs(self.startX - x) >= dragMinimum || Math.abs(self.startY - y) >= dragMinimum)) {
          dragged = isDragging ? 2 : 1;
          isDragging || (self.isDragging = true);
          onTouchOrPointerDelta(dx, dy);
        }
      }, _onPress = self.onPress = function(e) {
        if (_ignoreCheck(e, 1) || e && e.button) {
          return;
        }
        self.axis = axis = null;
        onStopDelayedCall.pause();
        self.isPressed = true;
        e = _getEvent(e);
        prevDeltaX = prevDeltaY = 0;
        self.startX = self.x = e.clientX;
        self.startY = self.y = e.clientY;
        self._vx.reset();
        self._vy.reset();
        _addListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, passive, true);
        self.deltaX = self.deltaY = 0;
        onPress && onPress(self);
      }, _onRelease = self.onRelease = function(e) {
        if (_ignoreCheck(e, 1)) {
          return;
        }
        _removeListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
        var isTrackingDrag = !isNaN(self.y - self.startY), wasDragging = self.isDragging, isDragNotClick = wasDragging && (Math.abs(self.x - self.startX) > 3 || Math.abs(self.y - self.startY) > 3), eventData = _getEvent(e);
        if (!isDragNotClick && isTrackingDrag) {
          self._vx.reset();
          self._vy.reset();
          if (preventDefault && allowClicks) {
            gsap2.delayedCall(0.08, function() {
              if (_getTime() - onClickTime > 300 && !e.defaultPrevented) {
                if (e.target.click) {
                  e.target.click();
                } else if (ownerDoc.createEvent) {
                  var syntheticEvent = ownerDoc.createEvent("MouseEvents");
                  syntheticEvent.initMouseEvent("click", true, true, _win3, 1, eventData.screenX, eventData.screenY, eventData.clientX, eventData.clientY, false, false, false, false, 0, null);
                  e.target.dispatchEvent(syntheticEvent);
                }
              }
            });
          }
        }
        self.isDragging = self.isGesturing = self.isPressed = false;
        onStop && wasDragging && !isNormalizer && onStopDelayedCall.restart(true);
        dragged && update2();
        onDragEnd && wasDragging && onDragEnd(self);
        onRelease && onRelease(self, isDragNotClick);
      }, _onGestureStart = function _onGestureStart2(e) {
        return e.touches && e.touches.length > 1 && (self.isGesturing = true) && onGestureStart(e, self.isDragging);
      }, _onGestureEnd = function _onGestureEnd2() {
        return (self.isGesturing = false) || onGestureEnd(self);
      }, onScroll2 = function onScroll3(e) {
        if (_ignoreCheck(e)) {
          return;
        }
        var x = scrollFuncX(), y = scrollFuncY();
        onDelta((x - scrollX) * scrollSpeed, (y - scrollY) * scrollSpeed, 1);
        scrollX = x;
        scrollY = y;
        onStop && onStopDelayedCall.restart(true);
      }, _onWheel = function _onWheel2(e) {
        if (_ignoreCheck(e)) {
          return;
        }
        e = _getEvent(e, preventDefault);
        onWheel && (wheeled = true);
        var multiplier = (e.deltaMode === 1 ? lineHeight : e.deltaMode === 2 ? _win3.innerHeight : 1) * wheelSpeed;
        onDelta(e.deltaX * multiplier, e.deltaY * multiplier, 0);
        onStop && !isNormalizer && onStopDelayedCall.restart(true);
      }, _onMove = function _onMove2(e) {
        if (_ignoreCheck(e)) {
          return;
        }
        var x = e.clientX, y = e.clientY, dx = x - self.x, dy = y - self.y;
        self.x = x;
        self.y = y;
        moved = true;
        onStop && onStopDelayedCall.restart(true);
        (dx || dy) && onTouchOrPointerDelta(dx, dy);
      }, _onHover = function _onHover2(e) {
        self.event = e;
        onHover(self);
      }, _onHoverEnd = function _onHoverEnd2(e) {
        self.event = e;
        onHoverEnd(self);
      }, _onClick = function _onClick2(e) {
        return _ignoreCheck(e) || _getEvent(e, preventDefault) && onClick2(self);
      };
      onStopDelayedCall = self._dc = gsap2.delayedCall(onStopDelay || 0.25, onStopFunc).pause();
      self.deltaX = self.deltaY = 0;
      self._vx = _getVelocityProp(0, 50, true);
      self._vy = _getVelocityProp(0, 50, true);
      self.scrollX = scrollFuncX;
      self.scrollY = scrollFuncY;
      self.isDragging = self.isGesturing = self.isPressed = false;
      _context2(this);
      self.enable = function(e) {
        if (!self.isEnabled) {
          _addListener(isViewport ? ownerDoc : target, "scroll", _onScroll);
          type.indexOf("scroll") >= 0 && _addListener(isViewport ? ownerDoc : target, "scroll", onScroll2, passive, capture);
          type.indexOf("wheel") >= 0 && _addListener(target, "wheel", _onWheel, passive, capture);
          if (type.indexOf("touch") >= 0 && _isTouch || type.indexOf("pointer") >= 0) {
            _addListener(target, _eventTypes[0], _onPress, passive, capture);
            _addListener(ownerDoc, _eventTypes[2], _onRelease);
            _addListener(ownerDoc, _eventTypes[3], _onRelease);
            allowClicks && _addListener(target, "click", clickCapture, true, true);
            onClick2 && _addListener(target, "click", _onClick);
            onGestureStart && _addListener(ownerDoc, "gesturestart", _onGestureStart);
            onGestureEnd && _addListener(ownerDoc, "gestureend", _onGestureEnd);
            onHover && _addListener(target, _pointerType + "enter", _onHover);
            onHoverEnd && _addListener(target, _pointerType + "leave", _onHoverEnd);
            onMove && _addListener(target, _pointerType + "move", _onMove);
          }
          self.isEnabled = true;
          self.isDragging = self.isGesturing = self.isPressed = moved = dragged = false;
          self._vx.reset();
          self._vy.reset();
          scrollX = scrollFuncX();
          scrollY = scrollFuncY();
          e && e.type && _onPress(e);
          onEnable && onEnable(self);
        }
        return self;
      };
      self.disable = function() {
        if (self.isEnabled) {
          _observers.filter(function(o) {
            return o !== self && _isViewport(o.target);
          }).length || _removeListener(isViewport ? ownerDoc : target, "scroll", _onScroll);
          if (self.isPressed) {
            self._vx.reset();
            self._vy.reset();
            _removeListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
          }
          _removeListener(isViewport ? ownerDoc : target, "scroll", onScroll2, capture);
          _removeListener(target, "wheel", _onWheel, capture);
          _removeListener(target, _eventTypes[0], _onPress, capture);
          _removeListener(ownerDoc, _eventTypes[2], _onRelease);
          _removeListener(ownerDoc, _eventTypes[3], _onRelease);
          _removeListener(target, "click", clickCapture, true);
          _removeListener(target, "click", _onClick);
          _removeListener(ownerDoc, "gesturestart", _onGestureStart);
          _removeListener(ownerDoc, "gestureend", _onGestureEnd);
          _removeListener(target, _pointerType + "enter", _onHover);
          _removeListener(target, _pointerType + "leave", _onHoverEnd);
          _removeListener(target, _pointerType + "move", _onMove);
          self.isEnabled = self.isPressed = self.isDragging = false;
          onDisable && onDisable(self);
        }
      };
      self.kill = self.revert = function() {
        self.disable();
        var i = _observers.indexOf(self);
        i >= 0 && _observers.splice(i, 1);
        _normalizer === self && (_normalizer = 0);
      };
      _observers.push(self);
      isNormalizer && _isViewport(target) && (_normalizer = self);
      self.enable(event2);
    };
    _createClass(Observer3, [{
      key: "velocityX",
      get: function get2() {
        return this._vx.getVelocity();
      }
    }, {
      key: "velocityY",
      get: function get2() {
        return this._vy.getVelocity();
      }
    }]);
    return Observer3;
  }();
  Observer.version = "3.13.0";
  Observer.create = function(vars) {
    return new Observer(vars);
  };
  Observer.register = _initCore3;
  Observer.getAll = function() {
    return _observers.slice();
  };
  Observer.getById = function(id) {
    return _observers.filter(function(o) {
      return o.vars.id === id;
    })[0];
  };
  _getGSAP() && gsap2.registerPlugin(Observer);

  // node_modules/.pnpm/gsap@3.13.0/node_modules/gsap/ScrollTrigger.js
  var gsap3;
  var _coreInitted3;
  var _win4;
  var _doc4;
  var _docEl2;
  var _body2;
  var _root2;
  var _resizeDelay;
  var _toArray;
  var _clamp4;
  var _time2;
  var _syncInterval;
  var _refreshing;
  var _pointerIsDown;
  var _transformProp2;
  var _i;
  var _prevWidth;
  var _prevHeight;
  var _autoRefresh;
  var _sort;
  var _suppressOverwrites2;
  var _ignoreResize;
  var _normalizer2;
  var _ignoreMobileResize;
  var _baseScreenHeight;
  var _baseScreenWidth;
  var _fixIOSBug;
  var _context3;
  var _scrollRestoration;
  var _div100vh;
  var _100vh;
  var _isReverted;
  var _clampingMax;
  var _limitCallbacks;
  var _startup2 = 1;
  var _getTime2 = Date.now;
  var _time1 = _getTime2();
  var _lastScrollTime = 0;
  var _enabled = 0;
  var _parseClamp = function _parseClamp2(value, type, self) {
    var clamp4 = _isString3(value) && (value.substr(0, 6) === "clamp(" || value.indexOf("max") > -1);
    self["_" + type + "Clamp"] = clamp4;
    return clamp4 ? value.substr(6, value.length - 7) : value;
  };
  var _keepClamp = function _keepClamp2(value, clamp4) {
    return clamp4 && (!_isString3(value) || value.substr(0, 6) !== "clamp(") ? "clamp(" + value + ")" : value;
  };
  var _rafBugFix = function _rafBugFix2() {
    return _enabled && requestAnimationFrame(_rafBugFix2);
  };
  var _pointerDownHandler = function _pointerDownHandler2() {
    return _pointerIsDown = 1;
  };
  var _pointerUpHandler = function _pointerUpHandler2() {
    return _pointerIsDown = 0;
  };
  var _passThrough3 = function _passThrough4(v) {
    return v;
  };
  var _round3 = function _round4(value) {
    return Math.round(value * 1e5) / 1e5 || 0;
  };
  var _windowExists5 = function _windowExists6() {
    return typeof window !== "undefined";
  };
  var _getGSAP3 = function _getGSAP4() {
    return gsap3 || _windowExists5() && (gsap3 = window.gsap) && gsap3.registerPlugin && gsap3;
  };
  var _isViewport3 = function _isViewport4(e) {
    return !!~_root2.indexOf(e);
  };
  var _getViewportDimension = function _getViewportDimension2(dimensionProperty) {
    return (dimensionProperty === "Height" ? _100vh : _win4["inner" + dimensionProperty]) || _docEl2["client" + dimensionProperty] || _body2["client" + dimensionProperty];
  };
  var _getBoundsFunc = function _getBoundsFunc2(element) {
    return _getProxyProp(element, "getBoundingClientRect") || (_isViewport3(element) ? function() {
      _winOffsets.width = _win4.innerWidth;
      _winOffsets.height = _100vh;
      return _winOffsets;
    } : function() {
      return _getBounds(element);
    });
  };
  var _getSizeFunc = function _getSizeFunc2(scroller, isViewport, _ref) {
    var d = _ref.d, d2 = _ref.d2, a = _ref.a;
    return (a = _getProxyProp(scroller, "getBoundingClientRect")) ? function() {
      return a()[d];
    } : function() {
      return (isViewport ? _getViewportDimension(d2) : scroller["client" + d2]) || 0;
    };
  };
  var _getOffsetsFunc = function _getOffsetsFunc2(element, isViewport) {
    return !isViewport || ~_proxies.indexOf(element) ? _getBoundsFunc(element) : function() {
      return _winOffsets;
    };
  };
  var _maxScroll = function _maxScroll2(element, _ref2) {
    var s = _ref2.s, d2 = _ref2.d2, d = _ref2.d, a = _ref2.a;
    return Math.max(0, (s = "scroll" + d2) && (a = _getProxyProp(element, s)) ? a() - _getBoundsFunc(element)()[d] : _isViewport3(element) ? (_docEl2[s] || _body2[s]) - _getViewportDimension(d2) : element[s] - element["offset" + d2]);
  };
  var _iterateAutoRefresh = function _iterateAutoRefresh2(func, events2) {
    for (var i = 0; i < _autoRefresh.length; i += 3) {
      (!events2 || ~events2.indexOf(_autoRefresh[i + 1])) && func(_autoRefresh[i], _autoRefresh[i + 1], _autoRefresh[i + 2]);
    }
  };
  var _isString3 = function _isString4(value) {
    return typeof value === "string";
  };
  var _isFunction3 = function _isFunction4(value) {
    return typeof value === "function";
  };
  var _isNumber3 = function _isNumber4(value) {
    return typeof value === "number";
  };
  var _isObject3 = function _isObject4(value) {
    return typeof value === "object";
  };
  var _endAnimation = function _endAnimation2(animation, reversed, pause) {
    return animation && animation.progress(reversed ? 0 : 1) && pause && animation.pause();
  };
  var _callback3 = function _callback4(self, func) {
    if (self.enabled) {
      var result = self._ctx ? self._ctx.add(function() {
        return func(self);
      }) : func(self);
      result && result.totalTime && (self.callbackAnimation = result);
    }
  };
  var _abs = Math.abs;
  var _left = "left";
  var _top = "top";
  var _right = "right";
  var _bottom = "bottom";
  var _width = "width";
  var _height = "height";
  var _Right = "Right";
  var _Left = "Left";
  var _Top = "Top";
  var _Bottom = "Bottom";
  var _padding = "padding";
  var _margin = "margin";
  var _Width = "Width";
  var _Height = "Height";
  var _px = "px";
  var _getComputedStyle = function _getComputedStyle2(element) {
    return _win4.getComputedStyle(element);
  };
  var _makePositionable = function _makePositionable2(element) {
    var position = _getComputedStyle(element).position;
    element.style.position = position === "absolute" || position === "fixed" ? position : "relative";
  };
  var _setDefaults3 = function _setDefaults4(obj, defaults4) {
    for (var p in defaults4) {
      p in obj || (obj[p] = defaults4[p]);
    }
    return obj;
  };
  var _getBounds = function _getBounds2(element, withoutTransforms) {
    var tween = withoutTransforms && _getComputedStyle(element)[_transformProp2] !== "matrix(1, 0, 0, 1, 0, 0)" && gsap3.to(element, {
      x: 0,
      y: 0,
      xPercent: 0,
      yPercent: 0,
      rotation: 0,
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0
    }).progress(1), bounds = element.getBoundingClientRect();
    tween && tween.progress(0).kill();
    return bounds;
  };
  var _getSize = function _getSize2(element, _ref3) {
    var d2 = _ref3.d2;
    return element["offset" + d2] || element["client" + d2] || 0;
  };
  var _getLabelRatioArray = function _getLabelRatioArray2(timeline2) {
    var a = [], labels2 = timeline2.labels, duration = timeline2.duration(), p;
    for (p in labels2) {
      a.push(labels2[p] / duration);
    }
    return a;
  };
  var _getClosestLabel = function _getClosestLabel2(animation) {
    return function(value) {
      return gsap3.utils.snap(_getLabelRatioArray(animation), value);
    };
  };
  var _snapDirectional = function _snapDirectional2(snapIncrementOrArray) {
    var snap3 = gsap3.utils.snap(snapIncrementOrArray), a = Array.isArray(snapIncrementOrArray) && snapIncrementOrArray.slice(0).sort(function(a2, b) {
      return a2 - b;
    });
    return a ? function(value, direction, threshold) {
      if (threshold === void 0) {
        threshold = 1e-3;
      }
      var i;
      if (!direction) {
        return snap3(value);
      }
      if (direction > 0) {
        value -= threshold;
        for (i = 0; i < a.length; i++) {
          if (a[i] >= value) {
            return a[i];
          }
        }
        return a[i - 1];
      } else {
        i = a.length;
        value += threshold;
        while (i--) {
          if (a[i] <= value) {
            return a[i];
          }
        }
      }
      return a[0];
    } : function(value, direction, threshold) {
      if (threshold === void 0) {
        threshold = 1e-3;
      }
      var snapped = snap3(value);
      return !direction || Math.abs(snapped - value) < threshold || snapped - value < 0 === direction < 0 ? snapped : snap3(direction < 0 ? value - snapIncrementOrArray : value + snapIncrementOrArray);
    };
  };
  var _getLabelAtDirection = function _getLabelAtDirection2(timeline2) {
    return function(value, st) {
      return _snapDirectional(_getLabelRatioArray(timeline2))(value, st.direction);
    };
  };
  var _multiListener = function _multiListener2(func, element, types, callback) {
    return types.split(",").forEach(function(type) {
      return func(element, type, callback);
    });
  };
  var _addListener3 = function _addListener4(element, type, func, nonPassive, capture) {
    return element.addEventListener(type, func, {
      passive: !nonPassive,
      capture: !!capture
    });
  };
  var _removeListener3 = function _removeListener4(element, type, func, capture) {
    return element.removeEventListener(type, func, !!capture);
  };
  var _wheelListener = function _wheelListener2(func, el, scrollFunc) {
    scrollFunc = scrollFunc && scrollFunc.wheelHandler;
    if (scrollFunc) {
      func(el, "wheel", scrollFunc);
      func(el, "touchmove", scrollFunc);
    }
  };
  var _markerDefaults = {
    startColor: "green",
    endColor: "red",
    indent: 0,
    fontSize: "16px",
    fontWeight: "normal"
  };
  var _defaults2 = {
    toggleActions: "play",
    anticipatePin: 0
  };
  var _keywords = {
    top: 0,
    left: 0,
    center: 0.5,
    bottom: 1,
    right: 1
  };
  var _offsetToPx = function _offsetToPx2(value, size) {
    if (_isString3(value)) {
      var eqIndex = value.indexOf("="), relative = ~eqIndex ? +(value.charAt(eqIndex - 1) + 1) * parseFloat(value.substr(eqIndex + 1)) : 0;
      if (~eqIndex) {
        value.indexOf("%") > eqIndex && (relative *= size / 100);
        value = value.substr(0, eqIndex - 1);
      }
      value = relative + (value in _keywords ? _keywords[value] * size : ~value.indexOf("%") ? parseFloat(value) * size / 100 : parseFloat(value) || 0);
    }
    return value;
  };
  var _createMarker = function _createMarker2(type, name, container, direction, _ref4, offset, matchWidthEl, containerAnimation) {
    var startColor = _ref4.startColor, endColor = _ref4.endColor, fontSize = _ref4.fontSize, indent = _ref4.indent, fontWeight = _ref4.fontWeight;
    var e = _doc4.createElement("div"), useFixedPosition = _isViewport3(container) || _getProxyProp(container, "pinType") === "fixed", isScroller = type.indexOf("scroller") !== -1, parent = useFixedPosition ? _body2 : container, isStart = type.indexOf("start") !== -1, color = isStart ? startColor : endColor, css = "border-color:" + color + ";font-size:" + fontSize + ";color:" + color + ";font-weight:" + fontWeight + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
    css += "position:" + ((isScroller || containerAnimation) && useFixedPosition ? "fixed;" : "absolute;");
    (isScroller || containerAnimation || !useFixedPosition) && (css += (direction === _vertical ? _right : _bottom) + ":" + (offset + parseFloat(indent)) + "px;");
    matchWidthEl && (css += "box-sizing:border-box;text-align:left;width:" + matchWidthEl.offsetWidth + "px;");
    e._isStart = isStart;
    e.setAttribute("class", "gsap-marker-" + type + (name ? " marker-" + name : ""));
    e.style.cssText = css;
    e.innerText = name || name === 0 ? type + "-" + name : type;
    parent.children[0] ? parent.insertBefore(e, parent.children[0]) : parent.appendChild(e);
    e._offset = e["offset" + direction.op.d2];
    _positionMarker(e, 0, direction, isStart);
    return e;
  };
  var _positionMarker = function _positionMarker2(marker, start, direction, flipped) {
    var vars = {
      display: "block"
    }, side = direction[flipped ? "os2" : "p2"], oppositeSide = direction[flipped ? "p2" : "os2"];
    marker._isFlipped = flipped;
    vars[direction.a + "Percent"] = flipped ? -100 : 0;
    vars[direction.a] = flipped ? "1px" : 0;
    vars["border" + side + _Width] = 1;
    vars["border" + oppositeSide + _Width] = 0;
    vars[direction.p] = start + "px";
    gsap3.set(marker, vars);
  };
  var _triggers = [];
  var _ids = {};
  var _rafID;
  var _sync = function _sync2() {
    return _getTime2() - _lastScrollTime > 34 && (_rafID || (_rafID = requestAnimationFrame(_updateAll)));
  };
  var _onScroll3 = function _onScroll4() {
    if (!_normalizer2 || !_normalizer2.isPressed || _normalizer2.startX > _body2.clientWidth) {
      _scrollers.cache++;
      if (_normalizer2) {
        _rafID || (_rafID = requestAnimationFrame(_updateAll));
      } else {
        _updateAll();
      }
      _lastScrollTime || _dispatch3("scrollStart");
      _lastScrollTime = _getTime2();
    }
  };
  var _setBaseDimensions = function _setBaseDimensions2() {
    _baseScreenWidth = _win4.innerWidth;
    _baseScreenHeight = _win4.innerHeight;
  };
  var _onResize = function _onResize2(force) {
    _scrollers.cache++;
    (force === true || !_refreshing && !_ignoreResize && !_doc4.fullscreenElement && !_doc4.webkitFullscreenElement && (!_ignoreMobileResize || _baseScreenWidth !== _win4.innerWidth || Math.abs(_win4.innerHeight - _baseScreenHeight) > _win4.innerHeight * 0.25)) && _resizeDelay.restart(true);
  };
  var _listeners2 = {};
  var _emptyArray2 = [];
  var _softRefresh = function _softRefresh2() {
    return _removeListener3(ScrollTrigger2, "scrollEnd", _softRefresh2) || _refreshAll(true);
  };
  var _dispatch3 = function _dispatch4(type) {
    return _listeners2[type] && _listeners2[type].map(function(f) {
      return f();
    }) || _emptyArray2;
  };
  var _savedStyles = [];
  var _revertRecorded = function _revertRecorded2(media) {
    for (var i = 0; i < _savedStyles.length; i += 5) {
      if (!media || _savedStyles[i + 4] && _savedStyles[i + 4].query === media) {
        _savedStyles[i].style.cssText = _savedStyles[i + 1];
        _savedStyles[i].getBBox && _savedStyles[i].setAttribute("transform", _savedStyles[i + 2] || "");
        _savedStyles[i + 3].uncache = 1;
      }
    }
  };
  var _revertAll = function _revertAll2(kill2, media) {
    var trigger;
    for (_i = 0; _i < _triggers.length; _i++) {
      trigger = _triggers[_i];
      if (trigger && (!media || trigger._ctx === media)) {
        if (kill2) {
          trigger.kill(1);
        } else {
          trigger.revert(true, true);
        }
      }
    }
    _isReverted = true;
    media && _revertRecorded(media);
    media || _dispatch3("revert");
  };
  var _clearScrollMemory = function _clearScrollMemory2(scrollRestoration, force) {
    _scrollers.cache++;
    (force || !_refreshingAll) && _scrollers.forEach(function(obj) {
      return _isFunction3(obj) && obj.cacheID++ && (obj.rec = 0);
    });
    _isString3(scrollRestoration) && (_win4.history.scrollRestoration = _scrollRestoration = scrollRestoration);
  };
  var _refreshingAll;
  var _refreshID = 0;
  var _queueRefreshID;
  var _queueRefreshAll = function _queueRefreshAll2() {
    if (_queueRefreshID !== _refreshID) {
      var id = _queueRefreshID = _refreshID;
      requestAnimationFrame(function() {
        return id === _refreshID && _refreshAll(true);
      });
    }
  };
  var _refresh100vh = function _refresh100vh2() {
    _body2.appendChild(_div100vh);
    _100vh = !_normalizer2 && _div100vh.offsetHeight || _win4.innerHeight;
    _body2.removeChild(_div100vh);
  };
  var _hideAllMarkers = function _hideAllMarkers2(hide) {
    return _toArray(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(el) {
      return el.style.display = hide ? "none" : "block";
    });
  };
  var _refreshAll = function _refreshAll2(force, skipRevert) {
    _docEl2 = _doc4.documentElement;
    _body2 = _doc4.body;
    _root2 = [_win4, _doc4, _docEl2, _body2];
    if (_lastScrollTime && !force && !_isReverted) {
      _addListener3(ScrollTrigger2, "scrollEnd", _softRefresh);
      return;
    }
    _refresh100vh();
    _refreshingAll = ScrollTrigger2.isRefreshing = true;
    _scrollers.forEach(function(obj) {
      return _isFunction3(obj) && ++obj.cacheID && (obj.rec = obj());
    });
    var refreshInits = _dispatch3("refreshInit");
    _sort && ScrollTrigger2.sort();
    skipRevert || _revertAll();
    _scrollers.forEach(function(obj) {
      if (_isFunction3(obj)) {
        obj.smooth && (obj.target.style.scrollBehavior = "auto");
        obj(0);
      }
    });
    _triggers.slice(0).forEach(function(t) {
      return t.refresh();
    });
    _isReverted = false;
    _triggers.forEach(function(t) {
      if (t._subPinOffset && t.pin) {
        var prop = t.vars.horizontal ? "offsetWidth" : "offsetHeight", original = t.pin[prop];
        t.revert(true, 1);
        t.adjustPinSpacing(t.pin[prop] - original);
        t.refresh();
      }
    });
    _clampingMax = 1;
    _hideAllMarkers(true);
    _triggers.forEach(function(t) {
      var max = _maxScroll(t.scroller, t._dir), endClamp = t.vars.end === "max" || t._endClamp && t.end > max, startClamp = t._startClamp && t.start >= max;
      (endClamp || startClamp) && t.setPositions(startClamp ? max - 1 : t.start, endClamp ? Math.max(startClamp ? max : t.start + 1, max) : t.end, true);
    });
    _hideAllMarkers(false);
    _clampingMax = 0;
    refreshInits.forEach(function(result) {
      return result && result.render && result.render(-1);
    });
    _scrollers.forEach(function(obj) {
      if (_isFunction3(obj)) {
        obj.smooth && requestAnimationFrame(function() {
          return obj.target.style.scrollBehavior = "smooth";
        });
        obj.rec && obj(obj.rec);
      }
    });
    _clearScrollMemory(_scrollRestoration, 1);
    _resizeDelay.pause();
    _refreshID++;
    _refreshingAll = 2;
    _updateAll(2);
    _triggers.forEach(function(t) {
      return _isFunction3(t.vars.onRefresh) && t.vars.onRefresh(t);
    });
    _refreshingAll = ScrollTrigger2.isRefreshing = false;
    _dispatch3("refresh");
  };
  var _lastScroll = 0;
  var _direction = 1;
  var _primary;
  var _updateAll = function _updateAll2(force) {
    if (force === 2 || !_refreshingAll && !_isReverted) {
      ScrollTrigger2.isUpdating = true;
      _primary && _primary.update(0);
      var l = _triggers.length, time = _getTime2(), recordVelocity = time - _time1 >= 50, scroll = l && _triggers[0].scroll();
      _direction = _lastScroll > scroll ? -1 : 1;
      _refreshingAll || (_lastScroll = scroll);
      if (recordVelocity) {
        if (_lastScrollTime && !_pointerIsDown && time - _lastScrollTime > 200) {
          _lastScrollTime = 0;
          _dispatch3("scrollEnd");
        }
        _time2 = _time1;
        _time1 = time;
      }
      if (_direction < 0) {
        _i = l;
        while (_i-- > 0) {
          _triggers[_i] && _triggers[_i].update(0, recordVelocity);
        }
        _direction = 1;
      } else {
        for (_i = 0; _i < l; _i++) {
          _triggers[_i] && _triggers[_i].update(0, recordVelocity);
        }
      }
      ScrollTrigger2.isUpdating = false;
    }
    _rafID = 0;
  };
  var _propNamesToCopy = [_left, _top, _bottom, _right, _margin + _Bottom, _margin + _Right, _margin + _Top, _margin + _Left, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"];
  var _stateProps = _propNamesToCopy.concat([_width, _height, "boxSizing", "max" + _Width, "max" + _Height, "position", _margin, _padding, _padding + _Top, _padding + _Right, _padding + _Bottom, _padding + _Left]);
  var _swapPinOut = function _swapPinOut2(pin, spacer, state) {
    _setState(state);
    var cache2 = pin._gsap;
    if (cache2.spacerIsNative) {
      _setState(cache2.spacerState);
    } else if (pin._gsap.swappedIn) {
      var parent = spacer.parentNode;
      if (parent) {
        parent.insertBefore(pin, spacer);
        parent.removeChild(spacer);
      }
    }
    pin._gsap.swappedIn = false;
  };
  var _swapPinIn = function _swapPinIn2(pin, spacer, cs, spacerState) {
    if (!pin._gsap.swappedIn) {
      var i = _propNamesToCopy.length, spacerStyle = spacer.style, pinStyle = pin.style, p;
      while (i--) {
        p = _propNamesToCopy[i];
        spacerStyle[p] = cs[p];
      }
      spacerStyle.position = cs.position === "absolute" ? "absolute" : "relative";
      cs.display === "inline" && (spacerStyle.display = "inline-block");
      pinStyle[_bottom] = pinStyle[_right] = "auto";
      spacerStyle.flexBasis = cs.flexBasis || "auto";
      spacerStyle.overflow = "visible";
      spacerStyle.boxSizing = "border-box";
      spacerStyle[_width] = _getSize(pin, _horizontal) + _px;
      spacerStyle[_height] = _getSize(pin, _vertical) + _px;
      spacerStyle[_padding] = pinStyle[_margin] = pinStyle[_top] = pinStyle[_left] = "0";
      _setState(spacerState);
      pinStyle[_width] = pinStyle["max" + _Width] = cs[_width];
      pinStyle[_height] = pinStyle["max" + _Height] = cs[_height];
      pinStyle[_padding] = cs[_padding];
      if (pin.parentNode !== spacer) {
        pin.parentNode.insertBefore(spacer, pin);
        spacer.appendChild(pin);
      }
      pin._gsap.swappedIn = true;
    }
  };
  var _capsExp2 = /([A-Z])/g;
  var _setState = function _setState2(state) {
    if (state) {
      var style = state.t.style, l = state.length, i = 0, p, value;
      (state.t._gsap || gsap3.core.getCache(state.t)).uncache = 1;
      for (; i < l; i += 2) {
        value = state[i + 1];
        p = state[i];
        if (value) {
          style[p] = value;
        } else if (style[p]) {
          style.removeProperty(p.replace(_capsExp2, "-$1").toLowerCase());
        }
      }
    }
  };
  var _getState = function _getState2(element) {
    var l = _stateProps.length, style = element.style, state = [], i = 0;
    for (; i < l; i++) {
      state.push(_stateProps[i], style[_stateProps[i]]);
    }
    state.t = element;
    return state;
  };
  var _copyState = function _copyState2(state, override, omitOffsets) {
    var result = [], l = state.length, i = omitOffsets ? 8 : 0, p;
    for (; i < l; i += 2) {
      p = state[i];
      result.push(p, p in override ? override[p] : state[i + 1]);
    }
    result.t = state.t;
    return result;
  };
  var _winOffsets = {
    left: 0,
    top: 0
  };
  var _parsePosition3 = function _parsePosition4(value, trigger, scrollerSize, direction, scroll, marker, markerScroller, self, scrollerBounds, borderWidth, useFixedPosition, scrollerMax, containerAnimation, clampZeroProp) {
    _isFunction3(value) && (value = value(self));
    if (_isString3(value) && value.substr(0, 3) === "max") {
      value = scrollerMax + (value.charAt(4) === "=" ? _offsetToPx("0" + value.substr(3), scrollerSize) : 0);
    }
    var time = containerAnimation ? containerAnimation.time() : 0, p1, p2, element;
    containerAnimation && containerAnimation.seek(0);
    isNaN(value) || (value = +value);
    if (!_isNumber3(value)) {
      _isFunction3(trigger) && (trigger = trigger(self));
      var offsets = (value || "0").split(" "), bounds, localOffset, globalOffset, display;
      element = _getTarget(trigger, self) || _body2;
      bounds = _getBounds(element) || {};
      if ((!bounds || !bounds.left && !bounds.top) && _getComputedStyle(element).display === "none") {
        display = element.style.display;
        element.style.display = "block";
        bounds = _getBounds(element);
        display ? element.style.display = display : element.style.removeProperty("display");
      }
      localOffset = _offsetToPx(offsets[0], bounds[direction.d]);
      globalOffset = _offsetToPx(offsets[1] || "0", scrollerSize);
      value = bounds[direction.p] - scrollerBounds[direction.p] - borderWidth + localOffset + scroll - globalOffset;
      markerScroller && _positionMarker(markerScroller, globalOffset, direction, scrollerSize - globalOffset < 20 || markerScroller._isStart && globalOffset > 20);
      scrollerSize -= scrollerSize - globalOffset;
    } else {
      containerAnimation && (value = gsap3.utils.mapRange(containerAnimation.scrollTrigger.start, containerAnimation.scrollTrigger.end, 0, scrollerMax, value));
      markerScroller && _positionMarker(markerScroller, scrollerSize, direction, true);
    }
    if (clampZeroProp) {
      self[clampZeroProp] = value || -1e-3;
      value < 0 && (value = 0);
    }
    if (marker) {
      var position = value + scrollerSize, isStart = marker._isStart;
      p1 = "scroll" + direction.d2;
      _positionMarker(marker, position, direction, isStart && position > 20 || !isStart && (useFixedPosition ? Math.max(_body2[p1], _docEl2[p1]) : marker.parentNode[p1]) <= position + 1);
      if (useFixedPosition) {
        scrollerBounds = _getBounds(markerScroller);
        useFixedPosition && (marker.style[direction.op.p] = scrollerBounds[direction.op.p] - direction.op.m - marker._offset + _px);
      }
    }
    if (containerAnimation && element) {
      p1 = _getBounds(element);
      containerAnimation.seek(scrollerMax);
      p2 = _getBounds(element);
      containerAnimation._caScrollDist = p1[direction.p] - p2[direction.p];
      value = value / containerAnimation._caScrollDist * scrollerMax;
    }
    containerAnimation && containerAnimation.seek(time);
    return containerAnimation ? value : Math.round(value);
  };
  var _prefixExp = /(webkit|moz|length|cssText|inset)/i;
  var _reparent = function _reparent2(element, parent, top, left) {
    if (element.parentNode !== parent) {
      var style = element.style, p, cs;
      if (parent === _body2) {
        element._stOrig = style.cssText;
        cs = _getComputedStyle(element);
        for (p in cs) {
          if (!+p && !_prefixExp.test(p) && cs[p] && typeof style[p] === "string" && p !== "0") {
            style[p] = cs[p];
          }
        }
        style.top = top;
        style.left = left;
      } else {
        style.cssText = element._stOrig;
      }
      gsap3.core.getCache(element).uncache = 1;
      parent.appendChild(element);
    }
  };
  var _interruptionTracker = function _interruptionTracker2(getValueFunc, initialValue, onInterrupt) {
    var last1 = initialValue, last2 = last1;
    return function(value) {
      var current = Math.round(getValueFunc());
      if (current !== last1 && current !== last2 && Math.abs(current - last1) > 3 && Math.abs(current - last2) > 3) {
        value = current;
        onInterrupt && onInterrupt();
      }
      last2 = last1;
      last1 = Math.round(value);
      return last1;
    };
  };
  var _shiftMarker = function _shiftMarker2(marker, direction, value) {
    var vars = {};
    vars[direction.p] = "+=" + value;
    gsap3.set(marker, vars);
  };
  var _getTweenCreator = function _getTweenCreator2(scroller, direction) {
    var getScroll = _getScrollFunc(scroller, direction), prop = "_scroll" + direction.p2, getTween = function getTween2(scrollTo, vars, initialValue, change1, change2) {
      var tween = getTween2.tween, onComplete = vars.onComplete, modifiers = {};
      initialValue = initialValue || getScroll();
      var checkForInterruption = _interruptionTracker(getScroll, initialValue, function() {
        tween.kill();
        getTween2.tween = 0;
      });
      change2 = change1 && change2 || 0;
      change1 = change1 || scrollTo - initialValue;
      tween && tween.kill();
      vars[prop] = scrollTo;
      vars.inherit = false;
      vars.modifiers = modifiers;
      modifiers[prop] = function() {
        return checkForInterruption(initialValue + change1 * tween.ratio + change2 * tween.ratio * tween.ratio);
      };
      vars.onUpdate = function() {
        _scrollers.cache++;
        getTween2.tween && _updateAll();
      };
      vars.onComplete = function() {
        getTween2.tween = 0;
        onComplete && onComplete.call(tween);
      };
      tween = getTween2.tween = gsap3.to(scroller, vars);
      return tween;
    };
    scroller[prop] = getScroll;
    getScroll.wheelHandler = function() {
      return getTween.tween && getTween.tween.kill() && (getTween.tween = 0);
    };
    _addListener3(scroller, "wheel", getScroll.wheelHandler);
    ScrollTrigger2.isTouch && _addListener3(scroller, "touchmove", getScroll.wheelHandler);
    return getTween;
  };
  var ScrollTrigger2 = /* @__PURE__ */ function() {
    function ScrollTrigger3(vars, animation) {
      _coreInitted3 || ScrollTrigger3.register(gsap3) || console.warn("Please gsap.registerPlugin(ScrollTrigger)");
      _context3(this);
      this.init(vars, animation);
    }
    var _proto = ScrollTrigger3.prototype;
    _proto.init = function init6(vars, animation) {
      this.progress = this.start = 0;
      this.vars && this.kill(true, true);
      if (!_enabled) {
        this.update = this.refresh = this.kill = _passThrough3;
        return;
      }
      vars = _setDefaults3(_isString3(vars) || _isNumber3(vars) || vars.nodeType ? {
        trigger: vars
      } : vars, _defaults2);
      var _vars = vars, onUpdate = _vars.onUpdate, toggleClass = _vars.toggleClass, id = _vars.id, onToggle = _vars.onToggle, onRefresh = _vars.onRefresh, scrub = _vars.scrub, trigger = _vars.trigger, pin = _vars.pin, pinSpacing = _vars.pinSpacing, invalidateOnRefresh = _vars.invalidateOnRefresh, anticipatePin = _vars.anticipatePin, onScrubComplete = _vars.onScrubComplete, onSnapComplete = _vars.onSnapComplete, once = _vars.once, snap3 = _vars.snap, pinReparent = _vars.pinReparent, pinSpacer = _vars.pinSpacer, containerAnimation = _vars.containerAnimation, fastScrollEnd = _vars.fastScrollEnd, preventOverlaps = _vars.preventOverlaps, direction = vars.horizontal || vars.containerAnimation && vars.horizontal !== false ? _horizontal : _vertical, isToggle = !scrub && scrub !== 0, scroller = _getTarget(vars.scroller || _win4), scrollerCache = gsap3.core.getCache(scroller), isViewport = _isViewport3(scroller), useFixedPosition = ("pinType" in vars ? vars.pinType : _getProxyProp(scroller, "pinType") || isViewport && "fixed") === "fixed", callbacks = [vars.onEnter, vars.onLeave, vars.onEnterBack, vars.onLeaveBack], toggleActions = isToggle && vars.toggleActions.split(" "), markers = "markers" in vars ? vars.markers : _defaults2.markers, borderWidth = isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0, self = this, onRefreshInit = vars.onRefreshInit && function() {
        return vars.onRefreshInit(self);
      }, getScrollerSize = _getSizeFunc(scroller, isViewport, direction), getScrollerOffsets = _getOffsetsFunc(scroller, isViewport), lastSnap = 0, lastRefresh = 0, prevProgress = 0, scrollFunc = _getScrollFunc(scroller, direction), tweenTo, pinCache, snapFunc, scroll1, scroll2, start, end, markerStart, markerEnd, markerStartTrigger, markerEndTrigger, markerVars, executingOnRefresh, change, pinOriginalState, pinActiveState, pinState, spacer, offset, pinGetter, pinSetter, pinStart, pinChange, spacingStart, spacerState, markerStartSetter, pinMoves, markerEndSetter, cs, snap1, snap22, scrubTween, scrubSmooth, snapDurClamp, snapDelayedCall, prevScroll, prevAnimProgress, caMarkerSetter, customRevertReturn;
      self._startClamp = self._endClamp = false;
      self._dir = direction;
      anticipatePin *= 45;
      self.scroller = scroller;
      self.scroll = containerAnimation ? containerAnimation.time.bind(containerAnimation) : scrollFunc;
      scroll1 = scrollFunc();
      self.vars = vars;
      animation = animation || vars.animation;
      if ("refreshPriority" in vars) {
        _sort = 1;
        vars.refreshPriority === -9999 && (_primary = self);
      }
      scrollerCache.tweenScroll = scrollerCache.tweenScroll || {
        top: _getTweenCreator(scroller, _vertical),
        left: _getTweenCreator(scroller, _horizontal)
      };
      self.tweenTo = tweenTo = scrollerCache.tweenScroll[direction.p];
      self.scrubDuration = function(value) {
        scrubSmooth = _isNumber3(value) && value;
        if (!scrubSmooth) {
          scrubTween && scrubTween.progress(1).kill();
          scrubTween = 0;
        } else {
          scrubTween ? scrubTween.duration(value) : scrubTween = gsap3.to(animation, {
            ease: "expo",
            totalProgress: "+=0",
            inherit: false,
            duration: scrubSmooth,
            paused: true,
            onComplete: function onComplete() {
              return onScrubComplete && onScrubComplete(self);
            }
          });
        }
      };
      if (animation) {
        animation.vars.lazy = false;
        animation._initted && !self.isReverted || animation.vars.immediateRender !== false && vars.immediateRender !== false && animation.duration() && animation.render(0, true, true);
        self.animation = animation.pause();
        animation.scrollTrigger = self;
        self.scrubDuration(scrub);
        snap1 = 0;
        id || (id = animation.vars.id);
      }
      if (snap3) {
        if (!_isObject3(snap3) || snap3.push) {
          snap3 = {
            snapTo: snap3
          };
        }
        "scrollBehavior" in _body2.style && gsap3.set(isViewport ? [_body2, _docEl2] : scroller, {
          scrollBehavior: "auto"
        });
        _scrollers.forEach(function(o) {
          return _isFunction3(o) && o.target === (isViewport ? _doc4.scrollingElement || _docEl2 : scroller) && (o.smooth = false);
        });
        snapFunc = _isFunction3(snap3.snapTo) ? snap3.snapTo : snap3.snapTo === "labels" ? _getClosestLabel(animation) : snap3.snapTo === "labelsDirectional" ? _getLabelAtDirection(animation) : snap3.directional !== false ? function(value, st) {
          return _snapDirectional(snap3.snapTo)(value, _getTime2() - lastRefresh < 500 ? 0 : st.direction);
        } : gsap3.utils.snap(snap3.snapTo);
        snapDurClamp = snap3.duration || {
          min: 0.1,
          max: 2
        };
        snapDurClamp = _isObject3(snapDurClamp) ? _clamp4(snapDurClamp.min, snapDurClamp.max) : _clamp4(snapDurClamp, snapDurClamp);
        snapDelayedCall = gsap3.delayedCall(snap3.delay || scrubSmooth / 2 || 0.1, function() {
          var scroll = scrollFunc(), refreshedRecently = _getTime2() - lastRefresh < 500, tween = tweenTo.tween;
          if ((refreshedRecently || Math.abs(self.getVelocity()) < 10) && !tween && !_pointerIsDown && lastSnap !== scroll) {
            var progress = (scroll - start) / change, totalProgress = animation && !isToggle ? animation.totalProgress() : progress, velocity = refreshedRecently ? 0 : (totalProgress - snap22) / (_getTime2() - _time2) * 1e3 || 0, change1 = gsap3.utils.clamp(-progress, 1 - progress, _abs(velocity / 2) * velocity / 0.185), naturalEnd = progress + (snap3.inertia === false ? 0 : change1), endValue, endScroll, _snap = snap3, onStart2 = _snap.onStart, _onInterrupt = _snap.onInterrupt, _onComplete = _snap.onComplete;
            endValue = snapFunc(naturalEnd, self);
            _isNumber3(endValue) || (endValue = naturalEnd);
            endScroll = Math.max(0, Math.round(start + endValue * change));
            if (scroll <= end && scroll >= start && endScroll !== scroll) {
              if (tween && !tween._initted && tween.data <= _abs(endScroll - scroll)) {
                return;
              }
              if (snap3.inertia === false) {
                change1 = endValue - progress;
              }
              tweenTo(endScroll, {
                duration: snapDurClamp(_abs(Math.max(_abs(naturalEnd - totalProgress), _abs(endValue - totalProgress)) * 0.185 / velocity / 0.05 || 0)),
                ease: snap3.ease || "power3",
                data: _abs(endScroll - scroll),
                onInterrupt: function onInterrupt() {
                  return snapDelayedCall.restart(true) && _onInterrupt && _onInterrupt(self);
                },
                onComplete: function onComplete() {
                  self.update();
                  lastSnap = scrollFunc();
                  if (animation && !isToggle) {
                    scrubTween ? scrubTween.resetTo("totalProgress", endValue, animation._tTime / animation._tDur) : animation.progress(endValue);
                  }
                  snap1 = snap22 = animation && !isToggle ? animation.totalProgress() : self.progress;
                  onSnapComplete && onSnapComplete(self);
                  _onComplete && _onComplete(self);
                }
              }, scroll, change1 * change, endScroll - scroll - change1 * change);
              onStart2 && onStart2(self, tweenTo.tween);
            }
          } else if (self.isActive && lastSnap !== scroll) {
            snapDelayedCall.restart(true);
          }
        }).pause();
      }
      id && (_ids[id] = self);
      trigger = self.trigger = _getTarget(trigger || pin !== true && pin);
      customRevertReturn = trigger && trigger._gsap && trigger._gsap.stRevert;
      customRevertReturn && (customRevertReturn = customRevertReturn(self));
      pin = pin === true ? trigger : _getTarget(pin);
      _isString3(toggleClass) && (toggleClass = {
        targets: trigger,
        className: toggleClass
      });
      if (pin) {
        pinSpacing === false || pinSpacing === _margin || (pinSpacing = !pinSpacing && pin.parentNode && pin.parentNode.style && _getComputedStyle(pin.parentNode).display === "flex" ? false : _padding);
        self.pin = pin;
        pinCache = gsap3.core.getCache(pin);
        if (!pinCache.spacer) {
          if (pinSpacer) {
            pinSpacer = _getTarget(pinSpacer);
            pinSpacer && !pinSpacer.nodeType && (pinSpacer = pinSpacer.current || pinSpacer.nativeElement);
            pinCache.spacerIsNative = !!pinSpacer;
            pinSpacer && (pinCache.spacerState = _getState(pinSpacer));
          }
          pinCache.spacer = spacer = pinSpacer || _doc4.createElement("div");
          spacer.classList.add("pin-spacer");
          id && spacer.classList.add("pin-spacer-" + id);
          pinCache.pinState = pinOriginalState = _getState(pin);
        } else {
          pinOriginalState = pinCache.pinState;
        }
        vars.force3D !== false && gsap3.set(pin, {
          force3D: true
        });
        self.spacer = spacer = pinCache.spacer;
        cs = _getComputedStyle(pin);
        spacingStart = cs[pinSpacing + direction.os2];
        pinGetter = gsap3.getProperty(pin);
        pinSetter = gsap3.quickSetter(pin, direction.a, _px);
        _swapPinIn(pin, spacer, cs);
        pinState = _getState(pin);
      }
      if (markers) {
        markerVars = _isObject3(markers) ? _setDefaults3(markers, _markerDefaults) : _markerDefaults;
        markerStartTrigger = _createMarker("scroller-start", id, scroller, direction, markerVars, 0);
        markerEndTrigger = _createMarker("scroller-end", id, scroller, direction, markerVars, 0, markerStartTrigger);
        offset = markerStartTrigger["offset" + direction.op.d2];
        var content = _getTarget(_getProxyProp(scroller, "content") || scroller);
        markerStart = this.markerStart = _createMarker("start", id, content, direction, markerVars, offset, 0, containerAnimation);
        markerEnd = this.markerEnd = _createMarker("end", id, content, direction, markerVars, offset, 0, containerAnimation);
        containerAnimation && (caMarkerSetter = gsap3.quickSetter([markerStart, markerEnd], direction.a, _px));
        if (!useFixedPosition && !(_proxies.length && _getProxyProp(scroller, "fixedMarkers") === true)) {
          _makePositionable(isViewport ? _body2 : scroller);
          gsap3.set([markerStartTrigger, markerEndTrigger], {
            force3D: true
          });
          markerStartSetter = gsap3.quickSetter(markerStartTrigger, direction.a, _px);
          markerEndSetter = gsap3.quickSetter(markerEndTrigger, direction.a, _px);
        }
      }
      if (containerAnimation) {
        var oldOnUpdate = containerAnimation.vars.onUpdate, oldParams = containerAnimation.vars.onUpdateParams;
        containerAnimation.eventCallback("onUpdate", function() {
          self.update(0, 0, 1);
          oldOnUpdate && oldOnUpdate.apply(containerAnimation, oldParams || []);
        });
      }
      self.previous = function() {
        return _triggers[_triggers.indexOf(self) - 1];
      };
      self.next = function() {
        return _triggers[_triggers.indexOf(self) + 1];
      };
      self.revert = function(revert, temp) {
        if (!temp) {
          return self.kill(true);
        }
        var r = revert !== false || !self.enabled, prevRefreshing = _refreshing;
        if (r !== self.isReverted) {
          if (r) {
            prevScroll = Math.max(scrollFunc(), self.scroll.rec || 0);
            prevProgress = self.progress;
            prevAnimProgress = animation && animation.progress();
          }
          markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function(m) {
            return m.style.display = r ? "none" : "block";
          });
          if (r) {
            _refreshing = self;
            self.update(r);
          }
          if (pin && (!pinReparent || !self.isActive)) {
            if (r) {
              _swapPinOut(pin, spacer, pinOriginalState);
            } else {
              _swapPinIn(pin, spacer, _getComputedStyle(pin), spacerState);
            }
          }
          r || self.update(r);
          _refreshing = prevRefreshing;
          self.isReverted = r;
        }
      };
      self.refresh = function(soft, force, position, pinOffset) {
        if ((_refreshing || !self.enabled) && !force) {
          return;
        }
        if (pin && soft && _lastScrollTime) {
          _addListener3(ScrollTrigger3, "scrollEnd", _softRefresh);
          return;
        }
        !_refreshingAll && onRefreshInit && onRefreshInit(self);
        _refreshing = self;
        if (tweenTo.tween && !position) {
          tweenTo.tween.kill();
          tweenTo.tween = 0;
        }
        scrubTween && scrubTween.pause();
        if (invalidateOnRefresh && animation) {
          animation.revert({
            kill: false
          }).invalidate();
          animation.getChildren && animation.getChildren(true, true, false).forEach(function(t) {
            return t.vars.immediateRender && t.render(0, true, true);
          });
        }
        self.isReverted || self.revert(true, true);
        self._subPinOffset = false;
        var size = getScrollerSize(), scrollerBounds = getScrollerOffsets(), max = containerAnimation ? containerAnimation.duration() : _maxScroll(scroller, direction), isFirstRefresh = change <= 0.01 || !change, offset2 = 0, otherPinOffset = pinOffset || 0, parsedEnd = _isObject3(position) ? position.end : vars.end, parsedEndTrigger = vars.endTrigger || trigger, parsedStart = _isObject3(position) ? position.start : vars.start || (vars.start === 0 || !trigger ? 0 : pin ? "0 0" : "0 100%"), pinnedContainer = self.pinnedContainer = vars.pinnedContainer && _getTarget(vars.pinnedContainer, self), triggerIndex = trigger && Math.max(0, _triggers.indexOf(self)) || 0, i = triggerIndex, cs2, bounds, scroll, isVertical, override, curTrigger, curPin, oppositeScroll, initted, revertedPins, forcedOverflow, markerStartOffset, markerEndOffset;
        if (markers && _isObject3(position)) {
          markerStartOffset = gsap3.getProperty(markerStartTrigger, direction.p);
          markerEndOffset = gsap3.getProperty(markerEndTrigger, direction.p);
        }
        while (i-- > 0) {
          curTrigger = _triggers[i];
          curTrigger.end || curTrigger.refresh(0, 1) || (_refreshing = self);
          curPin = curTrigger.pin;
          if (curPin && (curPin === trigger || curPin === pin || curPin === pinnedContainer) && !curTrigger.isReverted) {
            revertedPins || (revertedPins = []);
            revertedPins.unshift(curTrigger);
            curTrigger.revert(true, true);
          }
          if (curTrigger !== _triggers[i]) {
            triggerIndex--;
            i--;
          }
        }
        _isFunction3(parsedStart) && (parsedStart = parsedStart(self));
        parsedStart = _parseClamp(parsedStart, "start", self);
        start = _parsePosition3(parsedStart, trigger, size, direction, scrollFunc(), markerStart, markerStartTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation, self._startClamp && "_startClamp") || (pin ? -1e-3 : 0);
        _isFunction3(parsedEnd) && (parsedEnd = parsedEnd(self));
        if (_isString3(parsedEnd) && !parsedEnd.indexOf("+=")) {
          if (~parsedEnd.indexOf(" ")) {
            parsedEnd = (_isString3(parsedStart) ? parsedStart.split(" ")[0] : "") + parsedEnd;
          } else {
            offset2 = _offsetToPx(parsedEnd.substr(2), size);
            parsedEnd = _isString3(parsedStart) ? parsedStart : (containerAnimation ? gsap3.utils.mapRange(0, containerAnimation.duration(), containerAnimation.scrollTrigger.start, containerAnimation.scrollTrigger.end, start) : start) + offset2;
            parsedEndTrigger = trigger;
          }
        }
        parsedEnd = _parseClamp(parsedEnd, "end", self);
        end = Math.max(start, _parsePosition3(parsedEnd || (parsedEndTrigger ? "100% 0" : max), parsedEndTrigger, size, direction, scrollFunc() + offset2, markerEnd, markerEndTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation, self._endClamp && "_endClamp")) || -1e-3;
        offset2 = 0;
        i = triggerIndex;
        while (i--) {
          curTrigger = _triggers[i];
          curPin = curTrigger.pin;
          if (curPin && curTrigger.start - curTrigger._pinPush <= start && !containerAnimation && curTrigger.end > 0) {
            cs2 = curTrigger.end - (self._startClamp ? Math.max(0, curTrigger.start) : curTrigger.start);
            if ((curPin === trigger && curTrigger.start - curTrigger._pinPush < start || curPin === pinnedContainer) && isNaN(parsedStart)) {
              offset2 += cs2 * (1 - curTrigger.progress);
            }
            curPin === pin && (otherPinOffset += cs2);
          }
        }
        start += offset2;
        end += offset2;
        self._startClamp && (self._startClamp += offset2);
        if (self._endClamp && !_refreshingAll) {
          self._endClamp = end || -1e-3;
          end = Math.min(end, _maxScroll(scroller, direction));
        }
        change = end - start || (start -= 0.01) && 1e-3;
        if (isFirstRefresh) {
          prevProgress = gsap3.utils.clamp(0, 1, gsap3.utils.normalize(start, end, prevScroll));
        }
        self._pinPush = otherPinOffset;
        if (markerStart && offset2) {
          cs2 = {};
          cs2[direction.a] = "+=" + offset2;
          pinnedContainer && (cs2[direction.p] = "-=" + scrollFunc());
          gsap3.set([markerStart, markerEnd], cs2);
        }
        if (pin && !(_clampingMax && self.end >= _maxScroll(scroller, direction))) {
          cs2 = _getComputedStyle(pin);
          isVertical = direction === _vertical;
          scroll = scrollFunc();
          pinStart = parseFloat(pinGetter(direction.a)) + otherPinOffset;
          if (!max && end > 1) {
            forcedOverflow = (isViewport ? _doc4.scrollingElement || _docEl2 : scroller).style;
            forcedOverflow = {
              style: forcedOverflow,
              value: forcedOverflow["overflow" + direction.a.toUpperCase()]
            };
            if (isViewport && _getComputedStyle(_body2)["overflow" + direction.a.toUpperCase()] !== "scroll") {
              forcedOverflow.style["overflow" + direction.a.toUpperCase()] = "scroll";
            }
          }
          _swapPinIn(pin, spacer, cs2);
          pinState = _getState(pin);
          bounds = _getBounds(pin, true);
          oppositeScroll = useFixedPosition && _getScrollFunc(scroller, isVertical ? _horizontal : _vertical)();
          if (pinSpacing) {
            spacerState = [pinSpacing + direction.os2, change + otherPinOffset + _px];
            spacerState.t = spacer;
            i = pinSpacing === _padding ? _getSize(pin, direction) + change + otherPinOffset : 0;
            if (i) {
              spacerState.push(direction.d, i + _px);
              spacer.style.flexBasis !== "auto" && (spacer.style.flexBasis = i + _px);
            }
            _setState(spacerState);
            if (pinnedContainer) {
              _triggers.forEach(function(t) {
                if (t.pin === pinnedContainer && t.vars.pinSpacing !== false) {
                  t._subPinOffset = true;
                }
              });
            }
            useFixedPosition && scrollFunc(prevScroll);
          } else {
            i = _getSize(pin, direction);
            i && spacer.style.flexBasis !== "auto" && (spacer.style.flexBasis = i + _px);
          }
          if (useFixedPosition) {
            override = {
              top: bounds.top + (isVertical ? scroll - start : oppositeScroll) + _px,
              left: bounds.left + (isVertical ? oppositeScroll : scroll - start) + _px,
              boxSizing: "border-box",
              position: "fixed"
            };
            override[_width] = override["max" + _Width] = Math.ceil(bounds.width) + _px;
            override[_height] = override["max" + _Height] = Math.ceil(bounds.height) + _px;
            override[_margin] = override[_margin + _Top] = override[_margin + _Right] = override[_margin + _Bottom] = override[_margin + _Left] = "0";
            override[_padding] = cs2[_padding];
            override[_padding + _Top] = cs2[_padding + _Top];
            override[_padding + _Right] = cs2[_padding + _Right];
            override[_padding + _Bottom] = cs2[_padding + _Bottom];
            override[_padding + _Left] = cs2[_padding + _Left];
            pinActiveState = _copyState(pinOriginalState, override, pinReparent);
            _refreshingAll && scrollFunc(0);
          }
          if (animation) {
            initted = animation._initted;
            _suppressOverwrites2(1);
            animation.render(animation.duration(), true, true);
            pinChange = pinGetter(direction.a) - pinStart + change + otherPinOffset;
            pinMoves = Math.abs(change - pinChange) > 1;
            useFixedPosition && pinMoves && pinActiveState.splice(pinActiveState.length - 2, 2);
            animation.render(0, true, true);
            initted || animation.invalidate(true);
            animation.parent || animation.totalTime(animation.totalTime());
            _suppressOverwrites2(0);
          } else {
            pinChange = change;
          }
          forcedOverflow && (forcedOverflow.value ? forcedOverflow.style["overflow" + direction.a.toUpperCase()] = forcedOverflow.value : forcedOverflow.style.removeProperty("overflow-" + direction.a));
        } else if (trigger && scrollFunc() && !containerAnimation) {
          bounds = trigger.parentNode;
          while (bounds && bounds !== _body2) {
            if (bounds._pinOffset) {
              start -= bounds._pinOffset;
              end -= bounds._pinOffset;
            }
            bounds = bounds.parentNode;
          }
        }
        revertedPins && revertedPins.forEach(function(t) {
          return t.revert(false, true);
        });
        self.start = start;
        self.end = end;
        scroll1 = scroll2 = _refreshingAll ? prevScroll : scrollFunc();
        if (!containerAnimation && !_refreshingAll) {
          scroll1 < prevScroll && scrollFunc(prevScroll);
          self.scroll.rec = 0;
        }
        self.revert(false, true);
        lastRefresh = _getTime2();
        if (snapDelayedCall) {
          lastSnap = -1;
          snapDelayedCall.restart(true);
        }
        _refreshing = 0;
        animation && isToggle && (animation._initted || prevAnimProgress) && animation.progress() !== prevAnimProgress && animation.progress(prevAnimProgress || 0, true).render(animation.time(), true, true);
        if (isFirstRefresh || prevProgress !== self.progress || containerAnimation || invalidateOnRefresh || animation && !animation._initted) {
          animation && !isToggle && (animation._initted || prevProgress || animation.vars.immediateRender !== false) && animation.totalProgress(containerAnimation && start < -1e-3 && !prevProgress ? gsap3.utils.normalize(start, end, 0) : prevProgress, true);
          self.progress = isFirstRefresh || (scroll1 - start) / change === prevProgress ? 0 : prevProgress;
        }
        pin && pinSpacing && (spacer._pinOffset = Math.round(self.progress * pinChange));
        scrubTween && scrubTween.invalidate();
        if (!isNaN(markerStartOffset)) {
          markerStartOffset -= gsap3.getProperty(markerStartTrigger, direction.p);
          markerEndOffset -= gsap3.getProperty(markerEndTrigger, direction.p);
          _shiftMarker(markerStartTrigger, direction, markerStartOffset);
          _shiftMarker(markerStart, direction, markerStartOffset - (pinOffset || 0));
          _shiftMarker(markerEndTrigger, direction, markerEndOffset);
          _shiftMarker(markerEnd, direction, markerEndOffset - (pinOffset || 0));
        }
        isFirstRefresh && !_refreshingAll && self.update();
        if (onRefresh && !_refreshingAll && !executingOnRefresh) {
          executingOnRefresh = true;
          onRefresh(self);
          executingOnRefresh = false;
        }
      };
      self.getVelocity = function() {
        return (scrollFunc() - scroll2) / (_getTime2() - _time2) * 1e3 || 0;
      };
      self.endAnimation = function() {
        _endAnimation(self.callbackAnimation);
        if (animation) {
          scrubTween ? scrubTween.progress(1) : !animation.paused() ? _endAnimation(animation, animation.reversed()) : isToggle || _endAnimation(animation, self.direction < 0, 1);
        }
      };
      self.labelToScroll = function(label) {
        return animation && animation.labels && (start || self.refresh() || start) + animation.labels[label] / animation.duration() * change || 0;
      };
      self.getTrailing = function(name) {
        var i = _triggers.indexOf(self), a = self.direction > 0 ? _triggers.slice(0, i).reverse() : _triggers.slice(i + 1);
        return (_isString3(name) ? a.filter(function(t) {
          return t.vars.preventOverlaps === name;
        }) : a).filter(function(t) {
          return self.direction > 0 ? t.end <= start : t.start >= end;
        });
      };
      self.update = function(reset, recordVelocity, forceFake) {
        if (containerAnimation && !forceFake && !reset) {
          return;
        }
        var scroll = _refreshingAll === true ? prevScroll : self.scroll(), p = reset ? 0 : (scroll - start) / change, clipped = p < 0 ? 0 : p > 1 ? 1 : p || 0, prevProgress2 = self.progress, isActive, wasActive, toggleState, action, stateChanged, toggled, isAtMax, isTakingAction;
        if (recordVelocity) {
          scroll2 = scroll1;
          scroll1 = containerAnimation ? scrollFunc() : scroll;
          if (snap3) {
            snap22 = snap1;
            snap1 = animation && !isToggle ? animation.totalProgress() : clipped;
          }
        }
        if (anticipatePin && pin && !_refreshing && !_startup2 && _lastScrollTime) {
          if (!clipped && start < scroll + (scroll - scroll2) / (_getTime2() - _time2) * anticipatePin) {
            clipped = 1e-4;
          } else if (clipped === 1 && end > scroll + (scroll - scroll2) / (_getTime2() - _time2) * anticipatePin) {
            clipped = 0.9999;
          }
        }
        if (clipped !== prevProgress2 && self.enabled) {
          isActive = self.isActive = !!clipped && clipped < 1;
          wasActive = !!prevProgress2 && prevProgress2 < 1;
          toggled = isActive !== wasActive;
          stateChanged = toggled || !!clipped !== !!prevProgress2;
          self.direction = clipped > prevProgress2 ? 1 : -1;
          self.progress = clipped;
          if (stateChanged && !_refreshing) {
            toggleState = clipped && !prevProgress2 ? 0 : clipped === 1 ? 1 : prevProgress2 === 1 ? 2 : 3;
            if (isToggle) {
              action = !toggled && toggleActions[toggleState + 1] !== "none" && toggleActions[toggleState + 1] || toggleActions[toggleState];
              isTakingAction = animation && (action === "complete" || action === "reset" || action in animation);
            }
          }
          preventOverlaps && (toggled || isTakingAction) && (isTakingAction || scrub || !animation) && (_isFunction3(preventOverlaps) ? preventOverlaps(self) : self.getTrailing(preventOverlaps).forEach(function(t) {
            return t.endAnimation();
          }));
          if (!isToggle) {
            if (scrubTween && !_refreshing && !_startup2) {
              scrubTween._dp._time - scrubTween._start !== scrubTween._time && scrubTween.render(scrubTween._dp._time - scrubTween._start);
              if (scrubTween.resetTo) {
                scrubTween.resetTo("totalProgress", clipped, animation._tTime / animation._tDur);
              } else {
                scrubTween.vars.totalProgress = clipped;
                scrubTween.invalidate().restart();
              }
            } else if (animation) {
              animation.totalProgress(clipped, !!(_refreshing && (lastRefresh || reset)));
            }
          }
          if (pin) {
            reset && pinSpacing && (spacer.style[pinSpacing + direction.os2] = spacingStart);
            if (!useFixedPosition) {
              pinSetter(_round3(pinStart + pinChange * clipped));
            } else if (stateChanged) {
              isAtMax = !reset && clipped > prevProgress2 && end + 1 > scroll && scroll + 1 >= _maxScroll(scroller, direction);
              if (pinReparent) {
                if (!reset && (isActive || isAtMax)) {
                  var bounds = _getBounds(pin, true), _offset = scroll - start;
                  _reparent(pin, _body2, bounds.top + (direction === _vertical ? _offset : 0) + _px, bounds.left + (direction === _vertical ? 0 : _offset) + _px);
                } else {
                  _reparent(pin, spacer);
                }
              }
              _setState(isActive || isAtMax ? pinActiveState : pinState);
              pinMoves && clipped < 1 && isActive || pinSetter(pinStart + (clipped === 1 && !isAtMax ? pinChange : 0));
            }
          }
          snap3 && !tweenTo.tween && !_refreshing && !_startup2 && snapDelayedCall.restart(true);
          toggleClass && (toggled || once && clipped && (clipped < 1 || !_limitCallbacks)) && _toArray(toggleClass.targets).forEach(function(el) {
            return el.classList[isActive || once ? "add" : "remove"](toggleClass.className);
          });
          onUpdate && !isToggle && !reset && onUpdate(self);
          if (stateChanged && !_refreshing) {
            if (isToggle) {
              if (isTakingAction) {
                if (action === "complete") {
                  animation.pause().totalProgress(1);
                } else if (action === "reset") {
                  animation.restart(true).pause();
                } else if (action === "restart") {
                  animation.restart(true);
                } else {
                  animation[action]();
                }
              }
              onUpdate && onUpdate(self);
            }
            if (toggled || !_limitCallbacks) {
              onToggle && toggled && _callback3(self, onToggle);
              callbacks[toggleState] && _callback3(self, callbacks[toggleState]);
              once && (clipped === 1 ? self.kill(false, 1) : callbacks[toggleState] = 0);
              if (!toggled) {
                toggleState = clipped === 1 ? 1 : 3;
                callbacks[toggleState] && _callback3(self, callbacks[toggleState]);
              }
            }
            if (fastScrollEnd && !isActive && Math.abs(self.getVelocity()) > (_isNumber3(fastScrollEnd) ? fastScrollEnd : 2500)) {
              _endAnimation(self.callbackAnimation);
              scrubTween ? scrubTween.progress(1) : _endAnimation(animation, action === "reverse" ? 1 : !clipped, 1);
            }
          } else if (isToggle && onUpdate && !_refreshing) {
            onUpdate(self);
          }
        }
        if (markerEndSetter) {
          var n = containerAnimation ? scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0) : scroll;
          markerStartSetter(n + (markerStartTrigger._isFlipped ? 1 : 0));
          markerEndSetter(n);
        }
        caMarkerSetter && caMarkerSetter(-scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0));
      };
      self.enable = function(reset, refresh) {
        if (!self.enabled) {
          self.enabled = true;
          _addListener3(scroller, "resize", _onResize);
          isViewport || _addListener3(scroller, "scroll", _onScroll3);
          onRefreshInit && _addListener3(ScrollTrigger3, "refreshInit", onRefreshInit);
          if (reset !== false) {
            self.progress = prevProgress = 0;
            scroll1 = scroll2 = lastSnap = scrollFunc();
          }
          refresh !== false && self.refresh();
        }
      };
      self.getTween = function(snap4) {
        return snap4 && tweenTo ? tweenTo.tween : scrubTween;
      };
      self.setPositions = function(newStart, newEnd, keepClamp, pinOffset) {
        if (containerAnimation) {
          var st = containerAnimation.scrollTrigger, duration = containerAnimation.duration(), _change = st.end - st.start;
          newStart = st.start + _change * newStart / duration;
          newEnd = st.start + _change * newEnd / duration;
        }
        self.refresh(false, false, {
          start: _keepClamp(newStart, keepClamp && !!self._startClamp),
          end: _keepClamp(newEnd, keepClamp && !!self._endClamp)
        }, pinOffset);
        self.update();
      };
      self.adjustPinSpacing = function(amount) {
        if (spacerState && amount) {
          var i = spacerState.indexOf(direction.d) + 1;
          spacerState[i] = parseFloat(spacerState[i]) + amount + _px;
          spacerState[1] = parseFloat(spacerState[1]) + amount + _px;
          _setState(spacerState);
        }
      };
      self.disable = function(reset, allowAnimation) {
        if (self.enabled) {
          reset !== false && self.revert(true, true);
          self.enabled = self.isActive = false;
          allowAnimation || scrubTween && scrubTween.pause();
          prevScroll = 0;
          pinCache && (pinCache.uncache = 1);
          onRefreshInit && _removeListener3(ScrollTrigger3, "refreshInit", onRefreshInit);
          if (snapDelayedCall) {
            snapDelayedCall.pause();
            tweenTo.tween && tweenTo.tween.kill() && (tweenTo.tween = 0);
          }
          if (!isViewport) {
            var i = _triggers.length;
            while (i--) {
              if (_triggers[i].scroller === scroller && _triggers[i] !== self) {
                return;
              }
            }
            _removeListener3(scroller, "resize", _onResize);
            isViewport || _removeListener3(scroller, "scroll", _onScroll3);
          }
        }
      };
      self.kill = function(revert, allowAnimation) {
        self.disable(revert, allowAnimation);
        scrubTween && !allowAnimation && scrubTween.kill();
        id && delete _ids[id];
        var i = _triggers.indexOf(self);
        i >= 0 && _triggers.splice(i, 1);
        i === _i && _direction > 0 && _i--;
        i = 0;
        _triggers.forEach(function(t) {
          return t.scroller === self.scroller && (i = 1);
        });
        i || _refreshingAll || (self.scroll.rec = 0);
        if (animation) {
          animation.scrollTrigger = null;
          revert && animation.revert({
            kill: false
          });
          allowAnimation || animation.kill();
        }
        markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function(m) {
          return m.parentNode && m.parentNode.removeChild(m);
        });
        _primary === self && (_primary = 0);
        if (pin) {
          pinCache && (pinCache.uncache = 1);
          i = 0;
          _triggers.forEach(function(t) {
            return t.pin === pin && i++;
          });
          i || (pinCache.spacer = 0);
        }
        vars.onKill && vars.onKill(self);
      };
      _triggers.push(self);
      self.enable(false, false);
      customRevertReturn && customRevertReturn(self);
      if (animation && animation.add && !change) {
        var updateFunc = self.update;
        self.update = function() {
          self.update = updateFunc;
          _scrollers.cache++;
          start || end || self.refresh();
        };
        gsap3.delayedCall(0.01, self.update);
        change = 0.01;
        start = end = 0;
      } else {
        self.refresh();
      }
      pin && _queueRefreshAll();
    };
    ScrollTrigger3.register = function register3(core) {
      if (!_coreInitted3) {
        gsap3 = core || _getGSAP3();
        _windowExists5() && window.document && ScrollTrigger3.enable();
        _coreInitted3 = _enabled;
      }
      return _coreInitted3;
    };
    ScrollTrigger3.defaults = function defaults4(config3) {
      if (config3) {
        for (var p in config3) {
          _defaults2[p] = config3[p];
        }
      }
      return _defaults2;
    };
    ScrollTrigger3.disable = function disable(reset, kill2) {
      _enabled = 0;
      _triggers.forEach(function(trigger) {
        return trigger[kill2 ? "kill" : "disable"](reset);
      });
      _removeListener3(_win4, "wheel", _onScroll3);
      _removeListener3(_doc4, "scroll", _onScroll3);
      clearInterval(_syncInterval);
      _removeListener3(_doc4, "touchcancel", _passThrough3);
      _removeListener3(_body2, "touchstart", _passThrough3);
      _multiListener(_removeListener3, _doc4, "pointerdown,touchstart,mousedown", _pointerDownHandler);
      _multiListener(_removeListener3, _doc4, "pointerup,touchend,mouseup", _pointerUpHandler);
      _resizeDelay.kill();
      _iterateAutoRefresh(_removeListener3);
      for (var i = 0; i < _scrollers.length; i += 3) {
        _wheelListener(_removeListener3, _scrollers[i], _scrollers[i + 1]);
        _wheelListener(_removeListener3, _scrollers[i], _scrollers[i + 2]);
      }
    };
    ScrollTrigger3.enable = function enable() {
      _win4 = window;
      _doc4 = document;
      _docEl2 = _doc4.documentElement;
      _body2 = _doc4.body;
      if (gsap3) {
        _toArray = gsap3.utils.toArray;
        _clamp4 = gsap3.utils.clamp;
        _context3 = gsap3.core.context || _passThrough3;
        _suppressOverwrites2 = gsap3.core.suppressOverwrites || _passThrough3;
        _scrollRestoration = _win4.history.scrollRestoration || "auto";
        _lastScroll = _win4.pageYOffset || 0;
        gsap3.core.globals("ScrollTrigger", ScrollTrigger3);
        if (_body2) {
          _enabled = 1;
          _div100vh = document.createElement("div");
          _div100vh.style.height = "100vh";
          _div100vh.style.position = "absolute";
          _refresh100vh();
          _rafBugFix();
          Observer.register(gsap3);
          ScrollTrigger3.isTouch = Observer.isTouch;
          _fixIOSBug = Observer.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent);
          _ignoreMobileResize = Observer.isTouch === 1;
          _addListener3(_win4, "wheel", _onScroll3);
          _root2 = [_win4, _doc4, _docEl2, _body2];
          if (gsap3.matchMedia) {
            ScrollTrigger3.matchMedia = function(vars) {
              var mm = gsap3.matchMedia(), p;
              for (p in vars) {
                mm.add(p, vars[p]);
              }
              return mm;
            };
            gsap3.addEventListener("matchMediaInit", function() {
              return _revertAll();
            });
            gsap3.addEventListener("matchMediaRevert", function() {
              return _revertRecorded();
            });
            gsap3.addEventListener("matchMedia", function() {
              _refreshAll(0, 1);
              _dispatch3("matchMedia");
            });
            gsap3.matchMedia().add("(orientation: portrait)", function() {
              _setBaseDimensions();
              return _setBaseDimensions;
            });
          } else {
            console.warn("Requires GSAP 3.11.0 or later");
          }
          _setBaseDimensions();
          _addListener3(_doc4, "scroll", _onScroll3);
          var bodyHasStyle = _body2.hasAttribute("style"), bodyStyle = _body2.style, border = bodyStyle.borderTopStyle, AnimationProto = gsap3.core.Animation.prototype, bounds, i;
          AnimationProto.revert || Object.defineProperty(AnimationProto, "revert", {
            value: function value() {
              return this.time(-0.01, true);
            }
          });
          bodyStyle.borderTopStyle = "solid";
          bounds = _getBounds(_body2);
          _vertical.m = Math.round(bounds.top + _vertical.sc()) || 0;
          _horizontal.m = Math.round(bounds.left + _horizontal.sc()) || 0;
          border ? bodyStyle.borderTopStyle = border : bodyStyle.removeProperty("border-top-style");
          if (!bodyHasStyle) {
            _body2.setAttribute("style", "");
            _body2.removeAttribute("style");
          }
          _syncInterval = setInterval(_sync, 250);
          gsap3.delayedCall(0.5, function() {
            return _startup2 = 0;
          });
          _addListener3(_doc4, "touchcancel", _passThrough3);
          _addListener3(_body2, "touchstart", _passThrough3);
          _multiListener(_addListener3, _doc4, "pointerdown,touchstart,mousedown", _pointerDownHandler);
          _multiListener(_addListener3, _doc4, "pointerup,touchend,mouseup", _pointerUpHandler);
          _transformProp2 = gsap3.utils.checkPrefix("transform");
          _stateProps.push(_transformProp2);
          _coreInitted3 = _getTime2();
          _resizeDelay = gsap3.delayedCall(0.2, _refreshAll).pause();
          _autoRefresh = [_doc4, "visibilitychange", function() {
            var w = _win4.innerWidth, h = _win4.innerHeight;
            if (_doc4.hidden) {
              _prevWidth = w;
              _prevHeight = h;
            } else if (_prevWidth !== w || _prevHeight !== h) {
              _onResize();
            }
          }, _doc4, "DOMContentLoaded", _refreshAll, _win4, "load", _refreshAll, _win4, "resize", _onResize];
          _iterateAutoRefresh(_addListener3);
          _triggers.forEach(function(trigger) {
            return trigger.enable(0, 1);
          });
          for (i = 0; i < _scrollers.length; i += 3) {
            _wheelListener(_removeListener3, _scrollers[i], _scrollers[i + 1]);
            _wheelListener(_removeListener3, _scrollers[i], _scrollers[i + 2]);
          }
        }
      }
    };
    ScrollTrigger3.config = function config3(vars) {
      "limitCallbacks" in vars && (_limitCallbacks = !!vars.limitCallbacks);
      var ms = vars.syncInterval;
      ms && clearInterval(_syncInterval) || (_syncInterval = ms) && setInterval(_sync, ms);
      "ignoreMobileResize" in vars && (_ignoreMobileResize = ScrollTrigger3.isTouch === 1 && vars.ignoreMobileResize);
      if ("autoRefreshEvents" in vars) {
        _iterateAutoRefresh(_removeListener3) || _iterateAutoRefresh(_addListener3, vars.autoRefreshEvents || "none");
        _ignoreResize = (vars.autoRefreshEvents + "").indexOf("resize") === -1;
      }
    };
    ScrollTrigger3.scrollerProxy = function scrollerProxy(target, vars) {
      var t = _getTarget(target), i = _scrollers.indexOf(t), isViewport = _isViewport3(t);
      if (~i) {
        _scrollers.splice(i, isViewport ? 6 : 2);
      }
      if (vars) {
        isViewport ? _proxies.unshift(_win4, vars, _body2, vars, _docEl2, vars) : _proxies.unshift(t, vars);
      }
    };
    ScrollTrigger3.clearMatchMedia = function clearMatchMedia(query) {
      _triggers.forEach(function(t) {
        return t._ctx && t._ctx.query === query && t._ctx.kill(true, true);
      });
    };
    ScrollTrigger3.isInViewport = function isInViewport(element, ratio, horizontal) {
      var bounds = (_isString3(element) ? _getTarget(element) : element).getBoundingClientRect(), offset = bounds[horizontal ? _width : _height] * ratio || 0;
      return horizontal ? bounds.right - offset > 0 && bounds.left + offset < _win4.innerWidth : bounds.bottom - offset > 0 && bounds.top + offset < _win4.innerHeight;
    };
    ScrollTrigger3.positionInViewport = function positionInViewport(element, referencePoint, horizontal) {
      _isString3(element) && (element = _getTarget(element));
      var bounds = element.getBoundingClientRect(), size = bounds[horizontal ? _width : _height], offset = referencePoint == null ? size / 2 : referencePoint in _keywords ? _keywords[referencePoint] * size : ~referencePoint.indexOf("%") ? parseFloat(referencePoint) * size / 100 : parseFloat(referencePoint) || 0;
      return horizontal ? (bounds.left + offset) / _win4.innerWidth : (bounds.top + offset) / _win4.innerHeight;
    };
    ScrollTrigger3.killAll = function killAll(allowListeners) {
      _triggers.slice(0).forEach(function(t) {
        return t.vars.id !== "ScrollSmoother" && t.kill();
      });
      if (allowListeners !== true) {
        var listeners2 = _listeners2.killAll || [];
        _listeners2 = {};
        listeners2.forEach(function(f) {
          return f();
        });
      }
    };
    return ScrollTrigger3;
  }();
  ScrollTrigger2.version = "3.13.0";
  ScrollTrigger2.saveStyles = function(targets) {
    return targets ? _toArray(targets).forEach(function(target) {
      if (target && target.style) {
        var i = _savedStyles.indexOf(target);
        i >= 0 && _savedStyles.splice(i, 5);
        _savedStyles.push(target, target.style.cssText, target.getBBox && target.getAttribute("transform"), gsap3.core.getCache(target), _context3());
      }
    }) : _savedStyles;
  };
  ScrollTrigger2.revert = function(soft, media) {
    return _revertAll(!soft, media);
  };
  ScrollTrigger2.create = function(vars, animation) {
    return new ScrollTrigger2(vars, animation);
  };
  ScrollTrigger2.refresh = function(safe) {
    return safe ? _onResize(true) : (_coreInitted3 || ScrollTrigger2.register()) && _refreshAll(true);
  };
  ScrollTrigger2.update = function(force) {
    return ++_scrollers.cache && _updateAll(force === true ? 2 : 0);
  };
  ScrollTrigger2.clearScrollMemory = _clearScrollMemory;
  ScrollTrigger2.maxScroll = function(element, horizontal) {
    return _maxScroll(element, horizontal ? _horizontal : _vertical);
  };
  ScrollTrigger2.getScrollFunc = function(element, horizontal) {
    return _getScrollFunc(_getTarget(element), horizontal ? _horizontal : _vertical);
  };
  ScrollTrigger2.getById = function(id) {
    return _ids[id];
  };
  ScrollTrigger2.getAll = function() {
    return _triggers.filter(function(t) {
      return t.vars.id !== "ScrollSmoother";
    });
  };
  ScrollTrigger2.isScrolling = function() {
    return !!_lastScrollTime;
  };
  ScrollTrigger2.snapDirectional = _snapDirectional;
  ScrollTrigger2.addEventListener = function(type, callback) {
    var a = _listeners2[type] || (_listeners2[type] = []);
    ~a.indexOf(callback) || a.push(callback);
  };
  ScrollTrigger2.removeEventListener = function(type, callback) {
    var a = _listeners2[type], i = a && a.indexOf(callback);
    i >= 0 && a.splice(i, 1);
  };
  ScrollTrigger2.batch = function(targets, vars) {
    var result = [], varsCopy = {}, interval = vars.interval || 0.016, batchMax = vars.batchMax || 1e9, proxyCallback = function proxyCallback2(type, callback) {
      var elements = [], triggers2 = [], delay = gsap3.delayedCall(interval, function() {
        callback(elements, triggers2);
        elements = [];
        triggers2 = [];
      }).pause();
      return function(self) {
        elements.length || delay.restart(true);
        elements.push(self.trigger);
        triggers2.push(self);
        batchMax <= elements.length && delay.progress(1);
      };
    }, p;
    for (p in vars) {
      varsCopy[p] = p.substr(0, 2) === "on" && _isFunction3(vars[p]) && p !== "onRefreshInit" ? proxyCallback(p, vars[p]) : vars[p];
    }
    if (_isFunction3(batchMax)) {
      batchMax = batchMax();
      _addListener3(ScrollTrigger2, "refresh", function() {
        return batchMax = vars.batchMax();
      });
    }
    _toArray(targets).forEach(function(target) {
      var config3 = {};
      for (p in varsCopy) {
        config3[p] = varsCopy[p];
      }
      config3.trigger = target;
      result.push(ScrollTrigger2.create(config3));
    });
    return result;
  };
  var _clampScrollAndGetDurationMultiplier = function _clampScrollAndGetDurationMultiplier2(scrollFunc, current, end, max) {
    current > max ? scrollFunc(max) : current < 0 && scrollFunc(0);
    return end > max ? (max - current) / (end - current) : end < 0 ? current / (current - end) : 1;
  };
  var _allowNativePanning = function _allowNativePanning2(target, direction) {
    if (direction === true) {
      target.style.removeProperty("touch-action");
    } else {
      target.style.touchAction = direction === true ? "auto" : direction ? "pan-" + direction + (Observer.isTouch ? " pinch-zoom" : "") : "none";
    }
    target === _docEl2 && _allowNativePanning2(_body2, direction);
  };
  var _overflow = {
    auto: 1,
    scroll: 1
  };
  var _nestedScroll = function _nestedScroll2(_ref5) {
    var event2 = _ref5.event, target = _ref5.target, axis = _ref5.axis;
    var node = (event2.changedTouches ? event2.changedTouches[0] : event2).target, cache2 = node._gsap || gsap3.core.getCache(node), time = _getTime2(), cs;
    if (!cache2._isScrollT || time - cache2._isScrollT > 2e3) {
      while (node && node !== _body2 && (node.scrollHeight <= node.clientHeight && node.scrollWidth <= node.clientWidth || !(_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]))) {
        node = node.parentNode;
      }
      cache2._isScroll = node && node !== target && !_isViewport3(node) && (_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]);
      cache2._isScrollT = time;
    }
    if (cache2._isScroll || axis === "x") {
      event2.stopPropagation();
      event2._gsapAllow = true;
    }
  };
  var _inputObserver = function _inputObserver2(target, type, inputs, nested) {
    return Observer.create({
      target,
      capture: true,
      debounce: false,
      lockAxis: true,
      type,
      onWheel: nested = nested && _nestedScroll,
      onPress: nested,
      onDrag: nested,
      onScroll: nested,
      onEnable: function onEnable() {
        return inputs && _addListener3(_doc4, Observer.eventTypes[0], _captureInputs, false, true);
      },
      onDisable: function onDisable() {
        return _removeListener3(_doc4, Observer.eventTypes[0], _captureInputs, true);
      }
    });
  };
  var _inputExp = /(input|label|select|textarea)/i;
  var _inputIsFocused;
  var _captureInputs = function _captureInputs2(e) {
    var isInput = _inputExp.test(e.target.tagName);
    if (isInput || _inputIsFocused) {
      e._gsapAllow = true;
      _inputIsFocused = isInput;
    }
  };
  var _getScrollNormalizer = function _getScrollNormalizer2(vars) {
    _isObject3(vars) || (vars = {});
    vars.preventDefault = vars.isNormalizer = vars.allowClicks = true;
    vars.type || (vars.type = "wheel,touch");
    vars.debounce = !!vars.debounce;
    vars.id = vars.id || "normalizer";
    var _vars2 = vars, normalizeScrollX = _vars2.normalizeScrollX, momentum = _vars2.momentum, allowNestedScroll = _vars2.allowNestedScroll, onRelease = _vars2.onRelease, self, maxY, target = _getTarget(vars.target) || _docEl2, smoother = gsap3.core.globals().ScrollSmoother, smootherInstance = smoother && smoother.get(), content = _fixIOSBug && (vars.content && _getTarget(vars.content) || smootherInstance && vars.content !== false && !smootherInstance.smooth() && smootherInstance.content()), scrollFuncY = _getScrollFunc(target, _vertical), scrollFuncX = _getScrollFunc(target, _horizontal), scale = 1, initialScale = (Observer.isTouch && _win4.visualViewport ? _win4.visualViewport.scale * _win4.visualViewport.width : _win4.outerWidth) / _win4.innerWidth, wheelRefresh = 0, resolveMomentumDuration = _isFunction3(momentum) ? function() {
      return momentum(self);
    } : function() {
      return momentum || 2.8;
    }, lastRefreshID, skipTouchMove, inputObserver = _inputObserver(target, vars.type, true, allowNestedScroll), resumeTouchMove = function resumeTouchMove2() {
      return skipTouchMove = false;
    }, scrollClampX = _passThrough3, scrollClampY = _passThrough3, updateClamps = function updateClamps2() {
      maxY = _maxScroll(target, _vertical);
      scrollClampY = _clamp4(_fixIOSBug ? 1 : 0, maxY);
      normalizeScrollX && (scrollClampX = _clamp4(0, _maxScroll(target, _horizontal)));
      lastRefreshID = _refreshID;
    }, removeContentOffset = function removeContentOffset2() {
      content._gsap.y = _round3(parseFloat(content._gsap.y) + scrollFuncY.offset) + "px";
      content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(content._gsap.y) + ", 0, 1)";
      scrollFuncY.offset = scrollFuncY.cacheID = 0;
    }, ignoreDrag = function ignoreDrag2() {
      if (skipTouchMove) {
        requestAnimationFrame(resumeTouchMove);
        var offset = _round3(self.deltaY / 2), scroll = scrollClampY(scrollFuncY.v - offset);
        if (content && scroll !== scrollFuncY.v + scrollFuncY.offset) {
          scrollFuncY.offset = scroll - scrollFuncY.v;
          var y = _round3((parseFloat(content && content._gsap.y) || 0) - scrollFuncY.offset);
          content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + y + ", 0, 1)";
          content._gsap.y = y + "px";
          scrollFuncY.cacheID = _scrollers.cache;
          _updateAll();
        }
        return true;
      }
      scrollFuncY.offset && removeContentOffset();
      skipTouchMove = true;
    }, tween, startScrollX, startScrollY, onStopDelayedCall, onResize2 = function onResize3() {
      updateClamps();
      if (tween.isActive() && tween.vars.scrollY > maxY) {
        scrollFuncY() > maxY ? tween.progress(1) && scrollFuncY(maxY) : tween.resetTo("scrollY", maxY);
      }
    };
    content && gsap3.set(content, {
      y: "+=0"
    });
    vars.ignoreCheck = function(e) {
      return _fixIOSBug && e.type === "touchmove" && ignoreDrag(e) || scale > 1.05 && e.type !== "touchstart" || self.isGesturing || e.touches && e.touches.length > 1;
    };
    vars.onPress = function() {
      skipTouchMove = false;
      var prevScale = scale;
      scale = _round3((_win4.visualViewport && _win4.visualViewport.scale || 1) / initialScale);
      tween.pause();
      prevScale !== scale && _allowNativePanning(target, scale > 1.01 ? true : normalizeScrollX ? false : "x");
      startScrollX = scrollFuncX();
      startScrollY = scrollFuncY();
      updateClamps();
      lastRefreshID = _refreshID;
    };
    vars.onRelease = vars.onGestureStart = function(self2, wasDragging) {
      scrollFuncY.offset && removeContentOffset();
      if (!wasDragging) {
        onStopDelayedCall.restart(true);
      } else {
        _scrollers.cache++;
        var dur = resolveMomentumDuration(), currentScroll, endScroll;
        if (normalizeScrollX) {
          currentScroll = scrollFuncX();
          endScroll = currentScroll + dur * 0.05 * -self2.velocityX / 0.227;
          dur *= _clampScrollAndGetDurationMultiplier(scrollFuncX, currentScroll, endScroll, _maxScroll(target, _horizontal));
          tween.vars.scrollX = scrollClampX(endScroll);
        }
        currentScroll = scrollFuncY();
        endScroll = currentScroll + dur * 0.05 * -self2.velocityY / 0.227;
        dur *= _clampScrollAndGetDurationMultiplier(scrollFuncY, currentScroll, endScroll, _maxScroll(target, _vertical));
        tween.vars.scrollY = scrollClampY(endScroll);
        tween.invalidate().duration(dur).play(0.01);
        if (_fixIOSBug && tween.vars.scrollY >= maxY || currentScroll >= maxY - 1) {
          gsap3.to({}, {
            onUpdate: onResize2,
            duration: dur
          });
        }
      }
      onRelease && onRelease(self2);
    };
    vars.onWheel = function() {
      tween._ts && tween.pause();
      if (_getTime2() - wheelRefresh > 1e3) {
        lastRefreshID = 0;
        wheelRefresh = _getTime2();
      }
    };
    vars.onChange = function(self2, dx, dy, xArray, yArray) {
      _refreshID !== lastRefreshID && updateClamps();
      dx && normalizeScrollX && scrollFuncX(scrollClampX(xArray[2] === dx ? startScrollX + (self2.startX - self2.x) : scrollFuncX() + dx - xArray[1]));
      if (dy) {
        scrollFuncY.offset && removeContentOffset();
        var isTouch = yArray[2] === dy, y = isTouch ? startScrollY + self2.startY - self2.y : scrollFuncY() + dy - yArray[1], yClamped = scrollClampY(y);
        isTouch && y !== yClamped && (startScrollY += yClamped - y);
        scrollFuncY(yClamped);
      }
      (dy || dx) && _updateAll();
    };
    vars.onEnable = function() {
      _allowNativePanning(target, normalizeScrollX ? false : "x");
      ScrollTrigger2.addEventListener("refresh", onResize2);
      _addListener3(_win4, "resize", onResize2);
      if (scrollFuncY.smooth) {
        scrollFuncY.target.style.scrollBehavior = "auto";
        scrollFuncY.smooth = scrollFuncX.smooth = false;
      }
      inputObserver.enable();
    };
    vars.onDisable = function() {
      _allowNativePanning(target, true);
      _removeListener3(_win4, "resize", onResize2);
      ScrollTrigger2.removeEventListener("refresh", onResize2);
      inputObserver.kill();
    };
    vars.lockAxis = vars.lockAxis !== false;
    self = new Observer(vars);
    self.iOS = _fixIOSBug;
    _fixIOSBug && !scrollFuncY() && scrollFuncY(1);
    _fixIOSBug && gsap3.ticker.add(_passThrough3);
    onStopDelayedCall = self._dc;
    tween = gsap3.to(self, {
      ease: "power4",
      paused: true,
      inherit: false,
      scrollX: normalizeScrollX ? "+=0.1" : "+=0",
      scrollY: "+=0.1",
      modifiers: {
        scrollY: _interruptionTracker(scrollFuncY, scrollFuncY(), function() {
          return tween.pause();
        })
      },
      onUpdate: _updateAll,
      onComplete: onStopDelayedCall.vars.onComplete
    });
    return self;
  };
  ScrollTrigger2.sort = function(func) {
    if (_isFunction3(func)) {
      return _triggers.sort(func);
    }
    var scroll = _win4.pageYOffset || 0;
    ScrollTrigger2.getAll().forEach(function(t) {
      return t._sortY = t.trigger ? scroll + t.trigger.getBoundingClientRect().top : t.start + _win4.innerHeight;
    });
    return _triggers.sort(func || function(a, b) {
      return (a.vars.refreshPriority || 0) * -1e6 + (a.vars.containerAnimation ? 1e6 : a._sortY) - ((b.vars.containerAnimation ? 1e6 : b._sortY) + (b.vars.refreshPriority || 0) * -1e6);
    });
  };
  ScrollTrigger2.observe = function(vars) {
    return new Observer(vars);
  };
  ScrollTrigger2.normalizeScroll = function(vars) {
    if (typeof vars === "undefined") {
      return _normalizer2;
    }
    if (vars === true && _normalizer2) {
      return _normalizer2.enable();
    }
    if (vars === false) {
      _normalizer2 && _normalizer2.kill();
      _normalizer2 = vars;
      return;
    }
    var normalizer = vars instanceof Observer ? vars : _getScrollNormalizer(vars);
    _normalizer2 && _normalizer2.target === normalizer.target && _normalizer2.kill();
    _isViewport3(normalizer.target) && (_normalizer2 = normalizer);
    return normalizer;
  };
  ScrollTrigger2.core = {
    _getVelocityProp,
    _inputObserver,
    _scrollers,
    _proxies,
    bridge: {
      ss: function ss() {
        _lastScrollTime || _dispatch3("scrollStart");
        _lastScrollTime = _getTime2();
      },
      ref: function ref() {
        return _refreshing;
      }
    }
  };
  _getGSAP3() && gsap3.registerPlugin(ScrollTrigger2);

  // node_modules/.pnpm/split-type@0.3.4/node_modules/split-type/dist/index.js
  (function() {
    function append() {
      var length = arguments.length;
      for (var i = 0; i < length; i++) {
        var node = i < 0 || arguments.length <= i ? void 0 : arguments[i];
        if (node.nodeType === 1 || node.nodeType === 11)
          this.appendChild(node);
        else
          this.appendChild(document.createTextNode(String(node)));
      }
    }
    function replaceChildren() {
      while (this.lastChild) {
        this.removeChild(this.lastChild);
      }
      if (arguments.length)
        this.append.apply(this, arguments);
    }
    function replaceWith() {
      var parent = this.parentNode;
      for (var _len = arguments.length, nodes = new Array(_len), _key = 0; _key < _len; _key++) {
        nodes[_key] = arguments[_key];
      }
      var i = nodes.length;
      if (!parent)
        return;
      if (!i)
        parent.removeChild(this);
      while (i--) {
        var node = nodes[i];
        if (typeof node !== "object") {
          node = this.ownerDocument.createTextNode(node);
        } else if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
        if (!i) {
          parent.replaceChild(node, this);
        } else {
          parent.insertBefore(this.previousSibling, node);
        }
      }
    }
    if (typeof Element !== "undefined") {
      if (!Element.prototype.append) {
        Element.prototype.append = append;
        DocumentFragment.prototype.append = append;
      }
      if (!Element.prototype.replaceChildren) {
        Element.prototype.replaceChildren = replaceChildren;
        DocumentFragment.prototype.replaceChildren = replaceChildren;
      }
      if (!Element.prototype.replaceWith) {
        Element.prototype.replaceWith = replaceWith;
        DocumentFragment.prototype.replaceWith = replaceWith;
      }
    }
  })();
  function _classCallCheck(instance2, Constructor) {
    if (!(instance2 instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties2(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass2(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties2(Constructor, staticProps);
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly)
        symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr))
      return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
      return Array.from(iter);
  }
  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = void 0;
    try {
      for (var _i2 = arr[Symbol.iterator](), _s; !(_n = (_s = _i2.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i2["return"] != null)
          _i2["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function extend(target, object) {
    return Object.getOwnPropertyNames(Object(target)).reduce(function(extended, key) {
      var currentValue = Object.getOwnPropertyDescriptor(Object(target), key);
      var newValue = Object.getOwnPropertyDescriptor(Object(object), key);
      return Object.defineProperty(extended, key, newValue || currentValue);
    }, {});
  }
  function isString(value) {
    return typeof value === "string";
  }
  function isArray(value) {
    return Array.isArray(value);
  }
  function parseSettings() {
    var settings = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var object = extend(settings);
    var types;
    if (object.types !== void 0) {
      types = object.types;
    } else if (object.split !== void 0) {
      types = object.split;
    }
    if (types !== void 0) {
      object.types = (isString(types) || isArray(types) ? String(types) : "").split(",").map(function(type) {
        return String(type).trim();
      }).filter(function(type) {
        return /((line)|(word)|(char))/i.test(type);
      });
    }
    if (object.absolute || object.position) {
      object.absolute = object.absolute || /absolute/.test(settings.position);
    }
    return object;
  }
  function parseTypes(value) {
    var types = isString(value) || isArray(value) ? String(value) : "";
    return {
      none: !types,
      lines: /line/i.test(types),
      words: /word/i.test(types),
      chars: /char/i.test(types)
    };
  }
  function isObject(value) {
    return value !== null && typeof value === "object";
  }
  function isNode(input) {
    return isObject(input) && /^(1|3|11)$/.test(input.nodeType);
  }
  function isLength(value) {
    return typeof value === "number" && value > -1 && value % 1 === 0;
  }
  function isArrayLike(value) {
    return isObject(value) && isLength(value.length);
  }
  function toArray3(value) {
    if (isArray(value))
      return value;
    if (value == null)
      return [];
    return isArrayLike(value) ? Array.prototype.slice.call(value) : [value];
  }
  function getTargetElements(target) {
    var elements = target;
    if (isString(target)) {
      if (/^(#[a-z]\w+)$/.test(target.trim())) {
        elements = document.getElementById(target.trim().slice(1));
      } else {
        elements = document.querySelectorAll(target);
      }
    }
    return toArray3(elements).reduce(function(result, element) {
      return [].concat(_toConsumableArray(result), _toConsumableArray(toArray3(element).filter(isNode)));
    }, []);
  }
  var entries = Object.entries;
  var expando = "_splittype";
  var cache = {};
  var uid = 0;
  function set(owner, key, value) {
    if (!isObject(owner)) {
      console.warn("[data.set] owner is not an object");
      return null;
    }
    var id = owner[expando] || (owner[expando] = ++uid);
    var data = cache[id] || (cache[id] = {});
    if (value === void 0) {
      if (!!key && Object.getPrototypeOf(key) === Object.prototype) {
        cache[id] = _objectSpread2(_objectSpread2({}, data), key);
      }
    } else if (key !== void 0) {
      data[key] = value;
    }
    return value;
  }
  function get(owner, key) {
    var id = isObject(owner) ? owner[expando] : null;
    var data = id && cache[id] || {};
    if (key === void 0) {
      return data;
    }
    return data[key];
  }
  function remove(element) {
    var id = element && element[expando];
    if (id) {
      delete element[id];
      delete cache[id];
    }
  }
  function clear() {
    Object.keys(cache).forEach(function(key) {
      delete cache[key];
    });
  }
  function cleanup() {
    entries(cache).forEach(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 2), id = _ref2[0], _ref2$ = _ref2[1], isRoot = _ref2$.isRoot, isSplit = _ref2$.isSplit;
      if (!isRoot || !isSplit) {
        cache[id] = null;
        delete cache[id];
      }
    });
  }
  function toWords(value) {
    var separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : " ";
    var string = value ? String(value) : "";
    return string.trim().replace(/\s+/g, " ").split(separator);
  }
  var rsAstralRange = "\\ud800-\\udfff";
  var rsComboMarksRange = "\\u0300-\\u036f\\ufe20-\\ufe23";
  var rsComboSymbolsRange = "\\u20d0-\\u20f0";
  var rsVarRange = "\\ufe0e\\ufe0f";
  var rsAstral = "[".concat(rsAstralRange, "]");
  var rsCombo = "[".concat(rsComboMarksRange).concat(rsComboSymbolsRange, "]");
  var rsFitz = "\\ud83c[\\udffb-\\udfff]";
  var rsModifier = "(?:".concat(rsCombo, "|").concat(rsFitz, ")");
  var rsNonAstral = "[^".concat(rsAstralRange, "]");
  var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
  var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
  var rsZWJ = "\\u200d";
  var reOptMod = "".concat(rsModifier, "?");
  var rsOptVar = "[".concat(rsVarRange, "]?");
  var rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
  var rsSeq = rsOptVar + reOptMod + rsOptJoin;
  var rsSymbol = "(?:".concat(["".concat(rsNonAstral).concat(rsCombo, "?"), rsCombo, rsRegional, rsSurrPair, rsAstral].join("|"), "\n)");
  var reUnicode = RegExp("".concat(rsFitz, "(?=").concat(rsFitz, ")|").concat(rsSymbol).concat(rsSeq), "g");
  var unicodeRange = [rsZWJ, rsAstralRange, rsComboMarksRange, rsComboSymbolsRange, rsVarRange];
  var reHasUnicode = RegExp("[".concat(unicodeRange.join(""), "]"));
  function asciiToArray(string) {
    return string.split("");
  }
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }
  function stringToArray(string) {
    return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
  }
  function toString(value) {
    return value == null ? "" : String(value);
  }
  function toChars(string) {
    var separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    string = toString(string);
    if (string && isString(string)) {
      if (!separator && hasUnicode(string)) {
        return stringToArray(string);
      }
    }
    return string.split(separator);
  }
  function createElement(name, attributes) {
    var element = document.createElement(name);
    if (!attributes) {
      return element;
    }
    Object.keys(attributes).forEach(function(attribute) {
      var rawValue = attributes[attribute];
      var value = isString(rawValue) ? rawValue.trim() : rawValue;
      if (value === null || value === "")
        return;
      if (attribute === "children") {
        element.append.apply(element, _toConsumableArray(toArray3(value)));
      } else {
        element.setAttribute(attribute, value);
      }
    });
    return element;
  }
  var defaults2 = {
    splitClass: "",
    lineClass: "line",
    wordClass: "word",
    charClass: "char",
    types: ["lines", "words", "chars"],
    absolute: false,
    tagName: "div"
  };
  function splitWordsAndChars(textNode, settings) {
    settings = extend(defaults2, settings);
    var types = parseTypes(settings.types);
    var TAG_NAME = settings.tagName;
    var VALUE = textNode.nodeValue;
    var splitText = document.createDocumentFragment();
    var words = [];
    var chars = [];
    if (/^\s/.test(VALUE)) {
      splitText.append(" ");
    }
    words = toWords(VALUE).reduce(function(result, WORD, idx, arr) {
      var wordElement;
      var characterElementsForCurrentWord;
      if (types.chars) {
        characterElementsForCurrentWord = toChars(WORD).map(function(CHAR) {
          var characterElement = createElement(TAG_NAME, {
            "class": "".concat(settings.splitClass, " ").concat(settings.charClass),
            style: "display: inline-block;",
            children: CHAR
          });
          set(characterElement, "isChar", true);
          chars = [].concat(_toConsumableArray(chars), [characterElement]);
          return characterElement;
        });
      }
      if (types.words || types.lines) {
        wordElement = createElement(TAG_NAME, {
          "class": "".concat(settings.wordClass, " ").concat(settings.splitClass),
          style: "display: inline-block; ".concat(types.words && settings.absolute ? "position: relative;" : ""),
          children: types.chars ? characterElementsForCurrentWord : WORD
        });
        set(wordElement, {
          isWord: true,
          isWordStart: true,
          isWordEnd: true
        });
        splitText.appendChild(wordElement);
      } else {
        characterElementsForCurrentWord.forEach(function(characterElement) {
          splitText.appendChild(characterElement);
        });
      }
      if (idx < arr.length - 1) {
        splitText.append(" ");
      }
      return types.words ? result.concat(wordElement) : result;
    }, []);
    if (/\s$/.test(VALUE)) {
      splitText.append(" ");
    }
    textNode.replaceWith(splitText);
    return {
      words,
      chars
    };
  }
  function split(node, settings) {
    var type = node.nodeType;
    var wordsAndChars = {
      words: [],
      chars: []
    };
    if (!/(1|3|11)/.test(type)) {
      return wordsAndChars;
    }
    if (type === 3 && /\S/.test(node.nodeValue)) {
      return splitWordsAndChars(node, settings);
    }
    var childNodes = toArray3(node.childNodes);
    if (childNodes.length) {
      set(node, "isSplit", true);
      if (!get(node).isRoot) {
        node.style.display = "inline-block";
        node.style.position = "relative";
        var nextSibling = node.nextSibling;
        var prevSibling = node.previousSibling;
        var text = node.textContent || "";
        var textAfter = nextSibling ? nextSibling.textContent : " ";
        var textBefore = prevSibling ? prevSibling.textContent : " ";
        set(node, {
          isWordEnd: /\s$/.test(text) || /^\s/.test(textAfter),
          isWordStart: /^\s/.test(text) || /\s$/.test(textBefore)
        });
      }
    }
    return childNodes.reduce(function(result, child) {
      var _split = split(child, settings), words = _split.words, chars = _split.chars;
      return {
        words: [].concat(_toConsumableArray(result.words), _toConsumableArray(words)),
        chars: [].concat(_toConsumableArray(result.chars), _toConsumableArray(chars))
      };
    }, wordsAndChars);
  }
  function getPosition(node, isWord, settings, scrollPos) {
    if (!settings.absolute) {
      return {
        top: isWord ? node.offsetTop : null
      };
    }
    var parent = node.offsetParent;
    var _scrollPos = _slicedToArray(scrollPos, 2), scrollX = _scrollPos[0], scrollY = _scrollPos[1];
    var parentX = 0;
    var parentY = 0;
    if (parent && parent !== document.body) {
      var parentRect = parent.getBoundingClientRect();
      parentX = parentRect.x + scrollX;
      parentY = parentRect.y + scrollY;
    }
    var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height, x = _node$getBoundingClie.x, y = _node$getBoundingClie.y;
    var top = y + scrollY - parentY;
    var left = x + scrollX - parentX;
    return {
      width,
      height,
      top,
      left
    };
  }
  function unSplitWords(element) {
    if (!get(element).isWord) {
      toArray3(element.children).forEach(function(child) {
        return unSplitWords(child);
      });
    } else {
      remove(element);
      element.replaceWith.apply(element, _toConsumableArray(element.childNodes));
    }
  }
  var createFragment = function createFragment2() {
    return document.createDocumentFragment();
  };
  function repositionAfterSplit(element, settings, scrollPos) {
    var types = parseTypes(settings.types);
    var TAG_NAME = settings.tagName;
    var nodes = element.getElementsByTagName("*");
    var wordsInEachLine = [];
    var wordsInCurrentLine = [];
    var lineOffsetY = null;
    var elementHeight;
    var elementWidth;
    var contentBox;
    var lines = [];
    var parent = element.parentElement;
    var nextSibling = element.nextElementSibling;
    var splitText = createFragment();
    var cs = window.getComputedStyle(element);
    var align = cs.textAlign;
    var fontSize = parseFloat(cs.fontSize);
    var lineThreshold = fontSize * 0.2;
    if (settings.absolute) {
      contentBox = {
        left: element.offsetLeft,
        top: element.offsetTop,
        width: element.offsetWidth
      };
      elementWidth = element.offsetWidth;
      elementHeight = element.offsetHeight;
      set(element, {
        cssWidth: element.style.width,
        cssHeight: element.style.height
      });
    }
    toArray3(nodes).forEach(function(node) {
      var isWordLike = node.parentElement === element;
      var _getPosition3 = getPosition(node, isWordLike, settings, scrollPos), width = _getPosition3.width, height = _getPosition3.height, top = _getPosition3.top, left = _getPosition3.left;
      if (/^br$/i.test(node.nodeName))
        return;
      if (types.lines && isWordLike) {
        if (lineOffsetY === null || top - lineOffsetY >= lineThreshold) {
          lineOffsetY = top;
          wordsInEachLine.push(wordsInCurrentLine = []);
        }
        wordsInCurrentLine.push(node);
      }
      if (settings.absolute) {
        set(node, {
          top,
          left,
          width,
          height
        });
      }
    });
    if (parent) {
      parent.removeChild(element);
    }
    if (types.lines) {
      lines = wordsInEachLine.map(function(wordsInThisLine) {
        var lineElement = createElement(TAG_NAME, {
          "class": "".concat(settings.splitClass, " ").concat(settings.lineClass),
          style: "display: block; text-align: ".concat(align, "; width: 100%;")
        });
        set(lineElement, "isLine", true);
        var lineDimensions = {
          height: 0,
          top: 1e4
        };
        splitText.appendChild(lineElement);
        wordsInThisLine.forEach(function(wordOrElement, idx, arr) {
          var _data$get = get(wordOrElement), isWordEnd = _data$get.isWordEnd, top = _data$get.top, height = _data$get.height;
          var next = arr[idx + 1];
          lineDimensions.height = Math.max(lineDimensions.height, height);
          lineDimensions.top = Math.min(lineDimensions.top, top);
          lineElement.appendChild(wordOrElement);
          if (isWordEnd && get(next).isWordStart) {
            lineElement.append(" ");
          }
        });
        if (settings.absolute) {
          set(lineElement, {
            height: lineDimensions.height,
            top: lineDimensions.top
          });
        }
        return lineElement;
      });
      if (!types.words) {
        unSplitWords(splitText);
      }
      element.replaceChildren(splitText);
    }
    if (settings.absolute) {
      element.style.width = "".concat(element.style.width || elementWidth, "px");
      element.style.height = "".concat(elementHeight, "px");
      toArray3(nodes).forEach(function(node) {
        var _data$get2 = get(node), isLine = _data$get2.isLine, top = _data$get2.top, left = _data$get2.left, width = _data$get2.width, height = _data$get2.height;
        var parentData = get(node.parentElement);
        var isChildOfLineNode = !isLine && parentData.isLine;
        node.style.top = "".concat(isChildOfLineNode ? top - parentData.top : top, "px");
        node.style.left = isLine ? "".concat(contentBox.left, "px") : "".concat(left - (isChildOfLineNode ? contentBox.left : 0), "px");
        node.style.height = "".concat(height, "px");
        node.style.width = isLine ? "".concat(contentBox.width, "px") : "".concat(width, "px");
        node.style.position = "absolute";
      });
    }
    if (parent) {
      if (nextSibling)
        parent.insertBefore(element, nextSibling);
      else
        parent.appendChild(element);
    }
    return lines;
  }
  var _defaults3 = extend(defaults2, {});
  var SplitType = /* @__PURE__ */ function() {
    _createClass2(SplitType2, null, [{
      key: "clearData",
      value: function clearData() {
        clear();
      }
    }, {
      key: "setDefaults",
      value: function setDefaults(options) {
        _defaults3 = extend(_defaults3, parseSettings(options));
        return defaults2;
      }
    }, {
      key: "revert",
      value: function revert(elements) {
        getTargetElements(elements).forEach(function(element) {
          var _data$get = get(element), isSplit = _data$get.isSplit, html = _data$get.html, cssWidth = _data$get.cssWidth, cssHeight = _data$get.cssHeight;
          if (isSplit) {
            element.innerHTML = html;
            element.style.width = cssWidth || "";
            element.style.height = cssHeight || "";
            remove(element);
          }
        });
      }
    }, {
      key: "create",
      value: function create(target, options) {
        return new SplitType2(target, options);
      }
    }, {
      key: "data",
      get: function get2() {
        return cache;
      }
    }, {
      key: "defaults",
      get: function get2() {
        return _defaults3;
      },
      set: function set2(options) {
        _defaults3 = extend(_defaults3, parseSettings(options));
      }
    }]);
    function SplitType2(elements, options) {
      _classCallCheck(this, SplitType2);
      this.isSplit = false;
      this.settings = extend(_defaults3, parseSettings(options));
      this.elements = getTargetElements(elements);
      this.split();
    }
    _createClass2(SplitType2, [{
      key: "split",
      value: function split$1(options) {
        var _this = this;
        this.revert();
        this.elements.forEach(function(element) {
          set(element, "html", element.innerHTML);
        });
        this.lines = [];
        this.words = [];
        this.chars = [];
        var scrollPos = [window.pageXOffset, window.pageYOffset];
        if (options !== void 0) {
          this.settings = extend(this.settings, parseSettings(options));
        }
        var types = parseTypes(this.settings.types);
        if (types.none) {
          return;
        }
        this.elements.forEach(function(element) {
          set(element, "isRoot", true);
          var _split2 = split(element, _this.settings), words = _split2.words, chars = _split2.chars;
          _this.words = [].concat(_toConsumableArray(_this.words), _toConsumableArray(words));
          _this.chars = [].concat(_toConsumableArray(_this.chars), _toConsumableArray(chars));
        });
        this.elements.forEach(function(element) {
          if (types.lines || _this.settings.absolute) {
            var lines = repositionAfterSplit(element, _this.settings, scrollPos);
            _this.lines = [].concat(_toConsumableArray(_this.lines), _toConsumableArray(lines));
          }
        });
        this.isSplit = true;
        window.scrollTo(scrollPos[0], scrollPos[1]);
        cleanup();
      }
    }, {
      key: "revert",
      value: function revert() {
        if (this.isSplit) {
          this.lines = null;
          this.words = null;
          this.chars = null;
          this.isSplit = false;
        }
        SplitType2.revert(this.elements);
      }
    }]);
    return SplitType2;
  }();

  // src/animations.js
  gsapWithCSS.registerPlugin(ScrollTrigger2);
  function setVisuallyHidden(element) {
    Object.assign(element.style, {
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap",
      border: "0"
    });
  }
  function prepareSplitElement(element) {
    if (element.querySelector("[data-split-visible]"))
      return;
    const textContent = element.textContent;
    const htmlContent = element.innerHTML;
    element.setAttribute("aria-label", textContent);
    element.innerHTML = "";
    const hiddenSpan = document.createElement("span");
    hiddenSpan.textContent = textContent;
    setVisuallyHidden(hiddenSpan);
    element.appendChild(hiddenSpan);
    const visibleSpan = document.createElement("span");
    visibleSpan.setAttribute("data-split-visible", "");
    visibleSpan.setAttribute("aria-hidden", "true");
    visibleSpan.setAttribute("data-nosnippet", "");
    visibleSpan.innerHTML = htmlContent;
    element.appendChild(visibleSpan);
  }
  function runSplit(selector3, type) {
    let elements;
    if (typeof selector3 === "string") {
      elements = document.querySelectorAll(selector3);
    } else if (selector3 instanceof NodeList) {
      elements = selector3;
    } else if (selector3 instanceof Element) {
      elements = [selector3];
    } else {
      elements = Array.from(selector3);
    }
    const visibleTargets = [];
    elements.forEach((el) => {
      prepareSplitElement(el);
      const visibleSpan = el.querySelector("[data-split-visible]");
      if (visibleSpan)
        visibleTargets.push(visibleSpan);
    });
    return new SplitType(visibleTargets.length > 0 ? visibleTargets : selector3, {
      types: type
    });
  }
  function staggerScrollWords() {
    const elements = document.querySelectorAll("[stagger-scroll]");
    const animations = [];
    elements.forEach((element) => {
      const words = element.querySelectorAll(".word");
      if (words.length === 0) {
        return;
      }
      const durationAttribute = element.getAttribute("stagger-scroll");
      const durationValue = durationAttribute ? parseFloat(durationAttribute) : 2;
      const anim = gsapWithCSS.from(words, {
        autoAlpha: 0,
        yPercent: -101,
        duration: durationValue,
        ease: "power4.inOut",
        stagger: { each: 0.05, from: "random" },
        scrollTrigger: {
          trigger: element,
          start: "20% bottom",
          once: true,
          onRefresh: (self) => {
            if (!self.isActive) {
              self.animation.pause();
            }
          }
        }
      });
      animations.push(anim);
    });
    return {
      refresh: () => {
        ScrollTrigger2.refresh();
      },
      destroy: () => {
        animations.forEach((animation) => {
          if (animation && typeof animation.kill === "function") {
            animation.kill();
          }
          if (animation && animation.scrollTrigger) {
            let stInstance = ScrollTrigger2.getById(animation.scrollTrigger.id);
            if (stInstance && typeof stInstance.kill === "function") {
              stInstance.kill();
            }
          }
        });
      }
    };
  }
  function staggerScrollLines() {
    const elements = document.querySelectorAll("[stagger-lines]");
    const animations = [];
    elements.forEach((element) => {
      const durationAttribute = element.getAttribute("stagger-lines");
      const durationValue = durationAttribute ? parseFloat(durationAttribute) : 2;
      const anim = gsapWithCSS.from(element.querySelectorAll(".line"), {
        autoAlpha: 0,
        yPercent: -101,
        duration: durationValue,
        ease: "power4.inOut",
        stagger: { each: 0.05, from: "start" },
        scrollTrigger: {
          trigger: element,
          start: "20% bottom",
          once: true,
          onRefresh: (self) => {
            if (!self.isActive) {
              self.animation.pause();
            }
          }
        }
      });
      animations.push(anim);
    });
    return {
      destroy: () => {
        animations.forEach((animation) => {
          if (animation && typeof animation.kill === "function") {
            animation.kill();
          }
          if (animation && animation.scrollTrigger) {
            let stInstance = ScrollTrigger2.getById(animation.scrollTrigger.id);
            if (stInstance && typeof stInstance.kill === "function") {
              stInstance.kill();
            }
          }
        });
      }
    };
  }
  function btnRevealAnimation() {
    const btnElements = document.querySelectorAll("[btn-reveal]");
    const btnAnimations = [];
    btnElements.forEach((btn) => {
      const revealTarget = btn.querySelector("[reveal-target]");
      if (revealTarget) {
        const btnAnim = gsapWithCSS.from(revealTarget, {
          yPercent: 101,
          autoAlpha: 0,
          duration: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: btn,
            start: "20% bottom",
            once: true,
            onRefresh: (self) => {
              if (!self.isActive) {
                self.animation.pause();
              }
            }
          }
        });
        btnAnimations.push(btnAnim);
      }
    });
    return {
      destroyBtnAnimations: () => {
        btnAnimations.forEach((animation) => {
          if (animation && typeof animation.kill === "function") {
            animation.kill();
          }
          if (animation && animation.scrollTrigger) {
            let stInstance = ScrollTrigger2.getById(animation.scrollTrigger.id);
            if (stInstance && typeof stInstance.kill === "function") {
              stInstance.kill();
            }
          }
        });
      }
    };
  }
  function linkRevealAnimation() {
    const linkElements = document.querySelectorAll("[link-reveal]");
    const linkAnimations = [];
    linkElements.forEach((link) => {
      const revealTarget = link.querySelector("[reveal-target]");
      const linkTrack = link.querySelector(".link-track");
      if (revealTarget) {
        const linkAnim = gsapWithCSS.from(revealTarget, {
          yPercent: 101,
          duration: 2,
          ease: "power1.out",
          scrollTrigger: {
            trigger: link,
            start: "20% bottom",
            once: true,
            onRefresh: (self) => {
              if (!self.isActive) {
                self.animation.pause();
              }
            }
          }
        });
        linkAnimations.push(linkAnim);
      }
      if (linkTrack) {
        const trackAnim = gsapWithCSS.from(linkTrack, {
          scaleX: 0,
          duration: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: link,
            start: "20% bottom",
            once: true,
            onRefresh: (self) => {
              if (!self.isActive) {
                self.animation.pause();
              }
            }
          }
        });
        linkAnimations.push(trackAnim);
      }
    });
    return {
      destroyLinkAnimations: () => {
        linkAnimations.forEach((animation) => {
          if (animation && typeof animation.kill === "function") {
            animation.kill();
          }
          if (animation && animation.scrollTrigger) {
            let stInstance = ScrollTrigger2.getById(animation.scrollTrigger.id);
            if (stInstance && typeof stInstance.kill === "function") {
              stInstance.kill();
            }
          }
        });
      }
    };
  }
  function initScrollAnimations() {
    const wordAnimations = staggerScrollWords();
    const lineAnimations = staggerScrollLines();
    const linkAnimations = linkRevealAnimation();
    const btnAnimations = btnRevealAnimation();
    return {
      destroy: () => {
        wordAnimations.destroy();
        lineAnimations.destroy();
        linkAnimations.destroyLinkAnimations();
        btnAnimations.destroyBtnAnimations();
      }
    };
  }
  function initAnimations() {
    const staggerLinks = document.querySelectorAll("[stagger-el]");
    staggerLinks.forEach((link) => {
      link.removeEventListener("mouseenter", onMouseEnter);
      link.removeEventListener("mouseleave", onMouseLeave);
      link.addEventListener("mouseenter", onMouseEnter);
      link.addEventListener("mouseleave", onMouseLeave);
    });
  }
  function onMouseEnter(e) {
    const letters = e.target.querySelectorAll("[stagger-text] .char");
    gsapWithCSS.to(letters, {
      yPercent: -100,
      duration: 0.5,
      ease: "power4.inOut",
      stagger: { each: 0.03, from: "random" },
      overwrite: true
    });
  }
  function onMouseLeave(e) {
    const letters = e.target.querySelectorAll("[stagger-text] .char");
    gsapWithCSS.to(letters, {
      yPercent: 0,
      duration: 0.4,
      ease: "power4.inOut",
      stagger: { each: 0.03, from: "random" }
    });
  }
  function hudUiAnimations() {
    gsapWithCSS.to(".hud-brand-w .hud-brand-link", {
      y: "0%",
      opacity: 1,
      duration: 1,
      ease: "power1.out"
    });
    gsapWithCSS.to(".hud-nav-w .hud-nav-flex", {
      y: "0%",
      opacity: 1,
      duration: 1,
      ease: "power1.out"
    });
    gsapWithCSS.to(".hud-scroll-w", {
      opacity: 1,
      duration: 1,
      ease: "power1.out"
    });
    gsapWithCSS.to(".hud-menu-o .hud-menu-w, .hud-menu-o .hud-menu-bg", {
      y: "0%",
      opacity: 1,
      duration: 1,
      ease: "power1.out"
    });
  }
  function destroyAnimations() {
  }

  // src/utils.js
  var orb1Rotation;
  var orb2Rotation;
  var lastScrollY = 0;
  var request;
  function globalSplit() {
    runSplit("[split-text]", "lines, words, chars");
  }
  function mouseListeners() {
    let cursor = document.querySelector("[data-cursor]");
    let links = document.querySelectorAll("a");
    const mask = document.querySelector('[ent-vid="mask"]');
    const hoverElements = document.querySelectorAll("[hover-anim]");
    links.forEach((link) => {
      link.addEventListener("mouseover", () => cursor.classList.add("hover"));
      link.addEventListener("mouseout", () => cursor.classList.remove("hover"));
    });
    hoverElements.forEach((element) => {
      element.addEventListener("mouseover", () => cursor.classList.add("hover"));
      element.addEventListener(
        "mouseout",
        () => cursor.classList.remove("hover")
      );
    });
    if (mask) {
      mask.addEventListener("mouseover", () => {
        cursor.classList.add("mask");
        cursor.classList.remove("hover");
      });
      mask.addEventListener("mouseout", () => {
        cursor.classList.remove("mask");
        cursor.classList.remove("hover");
      });
    }
  }
  function initCursor() {
    let cursor = document.querySelector("[data-cursor]");
    let links = document.querySelectorAll("a");
    gsapWithCSS.set(cursor, {
      xPercent: -50,
      yPercent: -50
    });
    gsapWithCSS.to(cursor, {
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    });
    document.addEventListener("mousemove", (e) => {
      gsapWithCSS.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        scale: cursor.classList.contains("mask") ? 0 : cursor.classList.contains("hover") ? 0.55 : 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    mouseListeners();
  }
  function resetCursorHoverState() {
    let cursor = document.querySelector("[data-cursor]");
    cursor.classList.remove("hover");
    mouseListeners();
  }
  function initHudMenu() {
    var closeTimeout;
    gsapWithCSS.set(".hud-brand-w .hud-brand-link", { y: "-101%", opacity: 0 });
    gsapWithCSS.set(".hud-nav-w .hud-nav-flex", { y: "-101%", opacity: 0 });
    gsapWithCSS.set(".hud-scroll-w", { opacity: 0 });
    gsapWithCSS.set(".hud-menu-o .hud-menu-w, .hud-menu-o .hud-menu-bg", {
      y: "101%",
      opacity: 0
    });
    function toggleMenu() {
      var hudMenuToggle = document.querySelector(".hud-menu-w");
      var hudMenuOuter2 = document.querySelector(".hud-menu-o");
      var hudMenuContent = document.querySelector(".hud-menu-content");
      var hudMenuBg = document.querySelector(".hud-menu-bg");
      var hudSocLinks = document.querySelectorAll(".hud-social-link");
      var hudMenuL2 = document.querySelectorAll(".o-hidden.menu-l2");
      var hudColorToggle = document.querySelector(".hud-mode-toggle-w");
      var isExpanded = hudMenuToggle.getAttribute("aria-expanded") === "true";
      var hudMenuLetters = document.querySelectorAll(
        ".hud-menu-o [stagger-text] .char"
      );
      hudMenuToggle.setAttribute("aria-expanded", !isExpanded);
      hudMenuToggle.classList.toggle("is-open");
      hudMenuOuter2.classList.toggle("is-open");
      clearTimeout(closeTimeout);
      if (!isExpanded) {
        gsapWithCSS.killTweensOf(hudMenuL2);
        gsapWithCSS.killTweensOf(hudSocLinks);
        gsapWithCSS.killTweensOf(hudMenuBg);
        gsapWithCSS.killTweensOf(hudMenuContent);
        gsapWithCSS.killTweensOf(hudColorToggle);
        gsapWithCSS.to(hudMenuL2, { y: "0%", duration: 0 });
        gsapWithCSS.to(hudColorToggle, { x: "0%", duration: 0 });
        gsapWithCSS.to(hudSocLinks, { y: "0%", duration: 0 });
        gsapWithCSS.to(hudMenuBg, {
          width: "100%",
          height: "100%",
          duration: 0.4
        });
        gsapWithCSS.to(hudMenuContent, {
          opacity: 1,
          duration: 0.8,
          ease: "cubic-bezier(.755, .05, .855, .06)"
        });
        gsapWithCSS.from(hudMenuL2, {
          delay: 0.2,
          y: "-101%",
          duration: 0.3,
          stagger: 0.05,
          ease: "cubic-bezier(.755, .05, .855, .06)",
          onComplete: function() {
            hudMenuContent.setAttribute("pointer-auto", "");
            hudMenuOuter2.setAttribute("pointer-auto", "");
          }
        });
        gsapWithCSS.from(hudSocLinks, {
          delay: 0.4,
          y: "-151%",
          duration: 0.3,
          stagger: 0.05,
          ease: "cubic-bezier(.755, .05, .855, .06)"
        });
        gsapWithCSS.from(hudColorToggle, {
          delay: 0.4,
          x: "-130%",
          duration: 0.3,
          ease: "cubic-bezier(.755, .05, .855, .06)"
        });
      } else {
        gsapWithCSS.killTweensOf(hudMenuL2);
        gsapWithCSS.killTweensOf(hudSocLinks);
        gsapWithCSS.killTweensOf(hudMenuBg);
        gsapWithCSS.killTweensOf(hudMenuContent);
        gsapWithCSS.killTweensOf(hudColorToggle);
        hudMenuContent.removeAttribute("pointer-auto");
        hudMenuOuter2.removeAttribute("pointer-auto");
        let widthValue, heightValue;
        if (window.innerWidth <= 991) {
          widthValue = "3rem";
          heightValue = "3rem";
        } else {
          widthValue = "3em";
          heightValue = "3em";
        }
        gsapWithCSS.to(hudMenuBg, {
          delay: 0.1,
          width: widthValue,
          height: heightValue,
          duration: 0.3,
          ease: "cubic-bezier(.755, .05, .855, .06)"
        });
        gsapWithCSS.to(hudMenuContent, {
          opacity: 0,
          duration: 0.2,
          ease: "cubic-bezier(.755, .05, .855, .06)",
          delay: 0.2
        });
        gsapWithCSS.to(hudMenuL2, {
          y: "101%",
          duration: 0.2,
          ease: "cubic-bezier(.755, .05, .855, .06)"
        });
        gsapWithCSS.to(hudSocLinks, {
          y: "151%",
          duration: 0.2,
          ease: "cubic-bezier(.755, .05, .855, .06)"
        });
        gsapWithCSS.to(hudMenuLetters, {
          yPercent: 0,
          duration: 0.2,
          ease: "power4.inOut",
          stagger: { each: 0.03, from: "end" }
        });
        gsapWithCSS.to(hudColorToggle, {
          x: "130%",
          duration: 0.2,
          ease: "power4.inOut"
        });
      }
      hudSocLinks.forEach((link) => {
        link.addEventListener("click", function() {
          if (window.isTabletOrBelow && hudMenuToggle.getAttribute("aria-expanded") === "true") {
            toggleMenu();
          }
        });
      });
      hudMenuL2.forEach((item) => {
        item.addEventListener("click", function() {
          if (window.isTabletOrBelow && hudMenuToggle.getAttribute("aria-expanded") === "true") {
            toggleMenu();
          }
        });
      });
    }
    function onMouseOut() {
      closeTimeout = setTimeout(function() {
        var hudMenuToggle = document.querySelector(".hud-menu-w");
        var isExpanded = hudMenuToggle.getAttribute("aria-expanded") === "true";
        if (isExpanded) {
          toggleMenu();
        }
      }, 2e3);
    }
    function onMouseOver() {
      clearTimeout(closeTimeout);
    }
    function isClickInsideMenu(event2) {
      var hudMenuOuter2 = document.querySelector(".hud-menu-o");
      var hudMenuToggle = document.querySelector(".hud-menu-w");
      var isExpanded = hudMenuToggle.getAttribute("aria-expanded") === "true";
      if (!hudMenuOuter2.contains(event2.target) && isExpanded) {
        toggleMenu();
      }
    }
    document.addEventListener("click", isClickInsideMenu);
    var hudMenuOuter = document.querySelector(".hud-menu-o");
    hudMenuOuter.addEventListener("mouseout", onMouseOut);
    hudMenuOuter.addEventListener("mouseover", onMouseOver);
    var hudMenuButton = document.querySelector(".hud-menu-w");
    hudMenuButton.addEventListener("click", toggleMenu);
  }
  function updateOrbVelocity() {
    let velocity = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;
    orb1Rotation.timeScale(Math.max(1, Math.abs(velocity) * 1));
    orb2Rotation.timeScale(Math.max(1, Math.abs(velocity) * 1));
    request = requestAnimationFrame(updateOrbVelocity);
  }
  function initializeOrbRotation() {
    const orbOutline1 = document.querySelector('[orb-outline="1"]');
    const orbOutline22 = document.querySelector('[orb-outline="2"]');
    orbOutline1.style.willChange = "transform";
    orbOutline22.style.willChange = "transform";
    orb1Rotation = gsapWithCSS.to(orbOutline1, {
      rotation: 360,
      duration: 100,
      repeat: -1,
      ease: "none",
      force3D: true
    });
    orb2Rotation = gsapWithCSS.to(orbOutline22, {
      rotation: -360,
      duration: 100,
      repeat: -1,
      ease: "none",
      force3D: true
    });
    ScrollTrigger2.scrollerProxy(window, {
      scrollTop(value) {
        return arguments.length ? window.scrollTo(0, value) : window.scrollY;
      }
    });
    request = requestAnimationFrame(updateOrbVelocity);
  }
  function pauseOrbRotation() {
    if (request) {
      cancelAnimationFrame(request);
      request = null;
    }
    if (orb1Rotation)
      orb1Rotation.pause();
    if (orb2Rotation)
      orb2Rotation.pause();
  }
  function resumeOrbRotation() {
    if (orb1Rotation)
      orb1Rotation.resume();
    if (orb2Rotation)
      orb2Rotation.resume();
    if (!request) {
      request = requestAnimationFrame(updateOrbVelocity);
    }
  }
  function handleEditor(onEditorView = null) {
    if (Webflow.env("editor") !== void 0) {
      if (onEditorView !== null)
        onEditorView();
      console.log("Webflow Editor View");
      return true;
    } else {
      return false;
    }
  }
  function injectCSS(string) {
    const style = document.createElement("style");
    style.textContent = string;
    document.head.append(style);
  }
  function pageWipePaths() {
    const paths = document.querySelectorAll(".page-wipe-path");
    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsapWithCSS.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length
      });
      gsapWithCSS.to(path, {
        delay: 0.2,
        strokeDashoffset: 0,
        duration: 0.3,
        ease: "power1.out"
      });
    });
    window.addEventListener("resize", () => {
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsapWithCSS.set(path, {
          strokeDasharray: length,
          strokeDashoffset: gsapWithCSS.getProperty(path, "strokeDashoffset") * length / gsapWithCSS.getProperty(path, "strokeDasharray")
        });
      });
    });
  }
  var currentVideoSelector = null;
  function initVideos(selector3) {
    currentVideoSelector = selector3;
    const videos = document.querySelectorAll(`video[${selector3}]`);
    setTimeout(() => {
      videos.forEach((video) => {
        video.play();
      });
    }, 1500);
  }
  function destroyVideos() {
    if (!currentVideoSelector)
      return;
    const videos = document.querySelectorAll(`video[${currentVideoSelector}]`);
    videos.forEach((video) => {
      video.pause();
    });
    currentVideoSelector = null;
  }

  // node_modules/.pnpm/gsap@3.13.0/node_modules/gsap/utils/paths.js
  var _svgPathExp = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig;
  var _numbersExp = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig;
  var _scientific = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig;
  var _selectorExp = /(^[#\.][a-z]|[a-y][a-z])/i;
  var _DEG2RAD2 = Math.PI / 180;
  var _RAD2DEG2 = 180 / Math.PI;
  var _sin2 = Math.sin;
  var _cos2 = Math.cos;
  var _abs2 = Math.abs;
  var _sqrt2 = Math.sqrt;
  var _isString5 = function _isString6(value) {
    return typeof value === "string";
  };
  var _isNumber5 = function _isNumber6(value) {
    return typeof value === "number";
  };
  var _roundingNum = 1e5;
  var _round5 = function _round6(value) {
    return Math.round(value * _roundingNum) / _roundingNum || 0;
  };
  function getRawPath(value) {
    value = _isString5(value) && _selectorExp.test(value) ? document.querySelector(value) || value : value;
    var e = value.getAttribute ? value : 0, rawPath;
    if (e && (value = value.getAttribute("d"))) {
      if (!e._gsPath) {
        e._gsPath = {};
      }
      rawPath = e._gsPath[value];
      return rawPath && !rawPath._dirty ? rawPath : e._gsPath[value] = stringToRawPath(value);
    }
    return !value ? console.warn("Expecting a <path> element or an SVG path data string") : _isString5(value) ? stringToRawPath(value) : _isNumber5(value[0]) ? [value] : value;
  }
  function reverseSegment(segment) {
    var i = 0, y;
    segment.reverse();
    for (; i < segment.length; i += 2) {
      y = segment[i];
      segment[i] = segment[i + 1];
      segment[i + 1] = y;
    }
    segment.reversed = !segment.reversed;
  }
  var _createPath = function _createPath2(e, ignore) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path"), attr = [].slice.call(e.attributes), i = attr.length, name;
    ignore = "," + ignore + ",";
    while (--i > -1) {
      name = attr[i].nodeName.toLowerCase();
      if (ignore.indexOf("," + name + ",") < 0) {
        path.setAttributeNS(null, name, attr[i].nodeValue);
      }
    }
    return path;
  };
  var _typeAttrs = {
    rect: "rx,ry,x,y,width,height",
    circle: "r,cx,cy",
    ellipse: "rx,ry,cx,cy",
    line: "x1,x2,y1,y2"
  };
  var _attrToObj = function _attrToObj2(e, attrs) {
    var props = attrs ? attrs.split(",") : [], obj = {}, i = props.length;
    while (--i > -1) {
      obj[props[i]] = +e.getAttribute(props[i]) || 0;
    }
    return obj;
  };
  function convertToPath(element, swap) {
    var type = element.tagName.toLowerCase(), circ = 0.552284749831, data, x, y, r, ry, path, rcirc, rycirc, points, w, h, x2, x3, x4, x5, x6, y2, y3, y4, y5, y6, attr;
    if (type === "path" || !element.getBBox) {
      return element;
    }
    path = _createPath(element, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points");
    attr = _attrToObj(element, _typeAttrs[type]);
    if (type === "rect") {
      r = attr.rx;
      ry = attr.ry || r;
      x = attr.x;
      y = attr.y;
      w = attr.width - r * 2;
      h = attr.height - ry * 2;
      if (r || ry) {
        x2 = x + r * (1 - circ);
        x3 = x + r;
        x4 = x3 + w;
        x5 = x4 + r * circ;
        x6 = x4 + r;
        y2 = y + ry * (1 - circ);
        y3 = y + ry;
        y4 = y3 + h;
        y5 = y4 + ry * circ;
        y6 = y4 + ry;
        data = "M" + x6 + "," + y3 + " V" + y4 + " C" + [x6, y5, x5, y6, x4, y6, x4 - (x4 - x3) / 3, y6, x3 + (x4 - x3) / 3, y6, x3, y6, x2, y6, x, y5, x, y4, x, y4 - (y4 - y3) / 3, x, y3 + (y4 - y3) / 3, x, y3, x, y2, x2, y, x3, y, x3 + (x4 - x3) / 3, y, x4 - (x4 - x3) / 3, y, x4, y, x5, y, x6, y2, x6, y3].join(",") + "z";
      } else {
        data = "M" + (x + w) + "," + y + " v" + h + " h" + -w + " v" + -h + " h" + w + "z";
      }
    } else if (type === "circle" || type === "ellipse") {
      if (type === "circle") {
        r = ry = attr.r;
        rycirc = r * circ;
      } else {
        r = attr.rx;
        ry = attr.ry;
        rycirc = ry * circ;
      }
      x = attr.cx;
      y = attr.cy;
      rcirc = r * circ;
      data = "M" + (x + r) + "," + y + " C" + [x + r, y + rycirc, x + rcirc, y + ry, x, y + ry, x - rcirc, y + ry, x - r, y + rycirc, x - r, y, x - r, y - rycirc, x - rcirc, y - ry, x, y - ry, x + rcirc, y - ry, x + r, y - rycirc, x + r, y].join(",") + "z";
    } else if (type === "line") {
      data = "M" + attr.x1 + "," + attr.y1 + " L" + attr.x2 + "," + attr.y2;
    } else if (type === "polyline" || type === "polygon") {
      points = (element.getAttribute("points") + "").match(_numbersExp) || [];
      x = points.shift();
      y = points.shift();
      data = "M" + x + "," + y + " L" + points.join(",");
      if (type === "polygon") {
        data += "," + x + "," + y + "z";
      }
    }
    path.setAttribute("d", rawPathToString(path._gsRawPath = stringToRawPath(data)));
    if (swap && element.parentNode) {
      element.parentNode.insertBefore(path, element);
      element.parentNode.removeChild(element);
    }
    return path;
  }
  function transformRawPath(rawPath, a, b, c, d, tx, ty) {
    var j = rawPath.length, segment, l, i, x, y;
    while (--j > -1) {
      segment = rawPath[j];
      l = segment.length;
      for (i = 0; i < l; i += 2) {
        x = segment[i];
        y = segment[i + 1];
        segment[i] = x * a + y * c + tx;
        segment[i + 1] = x * b + y * d + ty;
      }
    }
    rawPath._dirty = 1;
    return rawPath;
  }
  function arcToSegment(lastX, lastY, rx, ry, angle, largeArcFlag, sweepFlag, x, y) {
    if (lastX === x && lastY === y) {
      return;
    }
    rx = _abs2(rx);
    ry = _abs2(ry);
    var angleRad = angle % 360 * _DEG2RAD2, cosAngle = _cos2(angleRad), sinAngle = _sin2(angleRad), PI = Math.PI, TWOPI = PI * 2, dx2 = (lastX - x) / 2, dy2 = (lastY - y) / 2, x1 = cosAngle * dx2 + sinAngle * dy2, y1 = -sinAngle * dx2 + cosAngle * dy2, x1_sq = x1 * x1, y1_sq = y1 * y1, radiiCheck = x1_sq / (rx * rx) + y1_sq / (ry * ry);
    if (radiiCheck > 1) {
      rx = _sqrt2(radiiCheck) * rx;
      ry = _sqrt2(radiiCheck) * ry;
    }
    var rx_sq = rx * rx, ry_sq = ry * ry, sq = (rx_sq * ry_sq - rx_sq * y1_sq - ry_sq * x1_sq) / (rx_sq * y1_sq + ry_sq * x1_sq);
    if (sq < 0) {
      sq = 0;
    }
    var coef = (largeArcFlag === sweepFlag ? -1 : 1) * _sqrt2(sq), cx1 = coef * (rx * y1 / ry), cy1 = coef * -(ry * x1 / rx), sx2 = (lastX + x) / 2, sy2 = (lastY + y) / 2, cx = sx2 + (cosAngle * cx1 - sinAngle * cy1), cy = sy2 + (sinAngle * cx1 + cosAngle * cy1), ux = (x1 - cx1) / rx, uy = (y1 - cy1) / ry, vx = (-x1 - cx1) / rx, vy = (-y1 - cy1) / ry, temp = ux * ux + uy * uy, angleStart = (uy < 0 ? -1 : 1) * Math.acos(ux / _sqrt2(temp)), angleExtent = (ux * vy - uy * vx < 0 ? -1 : 1) * Math.acos((ux * vx + uy * vy) / _sqrt2(temp * (vx * vx + vy * vy)));
    isNaN(angleExtent) && (angleExtent = PI);
    if (!sweepFlag && angleExtent > 0) {
      angleExtent -= TWOPI;
    } else if (sweepFlag && angleExtent < 0) {
      angleExtent += TWOPI;
    }
    angleStart %= TWOPI;
    angleExtent %= TWOPI;
    var segments = Math.ceil(_abs2(angleExtent) / (TWOPI / 4)), rawPath = [], angleIncrement = angleExtent / segments, controlLength = 4 / 3 * _sin2(angleIncrement / 2) / (1 + _cos2(angleIncrement / 2)), ma = cosAngle * rx, mb = sinAngle * rx, mc = sinAngle * -ry, md = cosAngle * ry, i;
    for (i = 0; i < segments; i++) {
      angle = angleStart + i * angleIncrement;
      x1 = _cos2(angle);
      y1 = _sin2(angle);
      ux = _cos2(angle += angleIncrement);
      uy = _sin2(angle);
      rawPath.push(x1 - controlLength * y1, y1 + controlLength * x1, ux + controlLength * uy, uy - controlLength * ux, ux, uy);
    }
    for (i = 0; i < rawPath.length; i += 2) {
      x1 = rawPath[i];
      y1 = rawPath[i + 1];
      rawPath[i] = x1 * ma + y1 * mc + cx;
      rawPath[i + 1] = x1 * mb + y1 * md + cy;
    }
    rawPath[i - 2] = x;
    rawPath[i - 1] = y;
    return rawPath;
  }
  function stringToRawPath(d) {
    var a = (d + "").replace(_scientific, function(m) {
      var n = +m;
      return n < 1e-4 && n > -1e-4 ? 0 : n;
    }).match(_svgPathExp) || [], path = [], relativeX = 0, relativeY = 0, twoThirds = 2 / 3, elements = a.length, points = 0, errorMessage = "ERROR: malformed path: " + d, i, j, x, y, command, isRelative, segment, startX, startY, difX, difY, beziers, prevCommand, flag1, flag2, line = function line2(sx, sy, ex, ey) {
      difX = (ex - sx) / 3;
      difY = (ey - sy) / 3;
      segment.push(sx + difX, sy + difY, ex - difX, ey - difY, ex, ey);
    };
    if (!d || !isNaN(a[0]) || isNaN(a[1])) {
      console.log(errorMessage);
      return path;
    }
    for (i = 0; i < elements; i++) {
      prevCommand = command;
      if (isNaN(a[i])) {
        command = a[i].toUpperCase();
        isRelative = command !== a[i];
      } else {
        i--;
      }
      x = +a[i + 1];
      y = +a[i + 2];
      if (isRelative) {
        x += relativeX;
        y += relativeY;
      }
      if (!i) {
        startX = x;
        startY = y;
      }
      if (command === "M") {
        if (segment) {
          if (segment.length < 8) {
            path.length -= 1;
          } else {
            points += segment.length;
          }
        }
        relativeX = startX = x;
        relativeY = startY = y;
        segment = [x, y];
        path.push(segment);
        i += 2;
        command = "L";
      } else if (command === "C") {
        if (!segment) {
          segment = [0, 0];
        }
        if (!isRelative) {
          relativeX = relativeY = 0;
        }
        segment.push(x, y, relativeX + a[i + 3] * 1, relativeY + a[i + 4] * 1, relativeX += a[i + 5] * 1, relativeY += a[i + 6] * 1);
        i += 6;
      } else if (command === "S") {
        difX = relativeX;
        difY = relativeY;
        if (prevCommand === "C" || prevCommand === "S") {
          difX += relativeX - segment[segment.length - 4];
          difY += relativeY - segment[segment.length - 3];
        }
        if (!isRelative) {
          relativeX = relativeY = 0;
        }
        segment.push(difX, difY, x, y, relativeX += a[i + 3] * 1, relativeY += a[i + 4] * 1);
        i += 4;
      } else if (command === "Q") {
        difX = relativeX + (x - relativeX) * twoThirds;
        difY = relativeY + (y - relativeY) * twoThirds;
        if (!isRelative) {
          relativeX = relativeY = 0;
        }
        relativeX += a[i + 3] * 1;
        relativeY += a[i + 4] * 1;
        segment.push(difX, difY, relativeX + (x - relativeX) * twoThirds, relativeY + (y - relativeY) * twoThirds, relativeX, relativeY);
        i += 4;
      } else if (command === "T") {
        difX = relativeX - segment[segment.length - 4];
        difY = relativeY - segment[segment.length - 3];
        segment.push(relativeX + difX, relativeY + difY, x + (relativeX + difX * 1.5 - x) * twoThirds, y + (relativeY + difY * 1.5 - y) * twoThirds, relativeX = x, relativeY = y);
        i += 2;
      } else if (command === "H") {
        line(relativeX, relativeY, relativeX = x, relativeY);
        i += 1;
      } else if (command === "V") {
        line(relativeX, relativeY, relativeX, relativeY = x + (isRelative ? relativeY - relativeX : 0));
        i += 1;
      } else if (command === "L" || command === "Z") {
        if (command === "Z") {
          x = startX;
          y = startY;
          segment.closed = true;
        }
        if (command === "L" || _abs2(relativeX - x) > 0.5 || _abs2(relativeY - y) > 0.5) {
          line(relativeX, relativeY, x, y);
          if (command === "L") {
            i += 2;
          }
        }
        relativeX = x;
        relativeY = y;
      } else if (command === "A") {
        flag1 = a[i + 4];
        flag2 = a[i + 5];
        difX = a[i + 6];
        difY = a[i + 7];
        j = 7;
        if (flag1.length > 1) {
          if (flag1.length < 3) {
            difY = difX;
            difX = flag2;
            j--;
          } else {
            difY = flag2;
            difX = flag1.substr(2);
            j -= 2;
          }
          flag2 = flag1.charAt(1);
          flag1 = flag1.charAt(0);
        }
        beziers = arcToSegment(relativeX, relativeY, +a[i + 1], +a[i + 2], +a[i + 3], +flag1, +flag2, (isRelative ? relativeX : 0) + difX * 1, (isRelative ? relativeY : 0) + difY * 1);
        i += j;
        if (beziers) {
          for (j = 0; j < beziers.length; j++) {
            segment.push(beziers[j]);
          }
        }
        relativeX = segment[segment.length - 2];
        relativeY = segment[segment.length - 1];
      } else {
        console.log(errorMessage);
      }
    }
    i = segment.length;
    if (i < 6) {
      path.pop();
      i = 0;
    } else if (segment[0] === segment[i - 2] && segment[1] === segment[i - 1]) {
      segment.closed = true;
    }
    path.totalPoints = points + i;
    return path;
  }
  function rawPathToString(rawPath) {
    if (_isNumber5(rawPath[0])) {
      rawPath = [rawPath];
    }
    var result = "", l = rawPath.length, sl, s, i, segment;
    for (s = 0; s < l; s++) {
      segment = rawPath[s];
      result += "M" + _round5(segment[0]) + "," + _round5(segment[1]) + " C";
      sl = segment.length;
      for (i = 2; i < sl; i++) {
        result += _round5(segment[i++]) + "," + _round5(segment[i++]) + " " + _round5(segment[i++]) + "," + _round5(segment[i++]) + " " + _round5(segment[i++]) + "," + _round5(segment[i]) + " ";
      }
      if (segment.closed) {
        result += "z";
      }
    }
    return result;
  }

  // node_modules/.pnpm/gsap@3.13.0/node_modules/gsap/MorphSVGPlugin.js
  var gsap4;
  var _toArray2;
  var _lastLinkedAnchor;
  var _doc5;
  var _coreInitted4;
  var PluginClass;
  var _getGSAP5 = function _getGSAP6() {
    return gsap4 || typeof window !== "undefined" && (gsap4 = window.gsap) && gsap4.registerPlugin && gsap4;
  };
  var _isFunction5 = function _isFunction6(value) {
    return typeof value === "function";
  };
  var _atan22 = Math.atan2;
  var _cos3 = Math.cos;
  var _sin3 = Math.sin;
  var _sqrt3 = Math.sqrt;
  var _PI = Math.PI;
  var _2PI2 = _PI * 2;
  var _angleMin = _PI * 0.3;
  var _angleMax = _PI * 0.7;
  var _bigNum3 = 1e20;
  var _numExp2 = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi;
  var _selectorExp2 = /(^[#\.][a-z]|[a-y][a-z])/i;
  var _commands = /[achlmqstvz]/i;
  var _log = function _log2(message) {
    return console && console.warn(message);
  };
  var _bonusValidated = 1;
  var _getAverageXY = function _getAverageXY2(segment) {
    var l = segment.length, x = 0, y = 0, i;
    for (i = 0; i < l; i++) {
      x += segment[i++];
      y += segment[i];
    }
    return [x / (l / 2), y / (l / 2)];
  };
  var _getSize3 = function _getSize4(segment) {
    var l = segment.length, xMax = segment[0], xMin = xMax, yMax = segment[1], yMin = yMax, x, y, i;
    for (i = 6; i < l; i += 6) {
      x = segment[i];
      y = segment[i + 1];
      if (x > xMax) {
        xMax = x;
      } else if (x < xMin) {
        xMin = x;
      }
      if (y > yMax) {
        yMax = y;
      } else if (y < yMin) {
        yMin = y;
      }
    }
    segment.centerX = (xMax + xMin) / 2;
    segment.centerY = (yMax + yMin) / 2;
    return segment.size = (xMax - xMin) * (yMax - yMin);
  };
  var _getTotalSize = function _getTotalSize2(rawPath, samplesPerBezier) {
    if (samplesPerBezier === void 0) {
      samplesPerBezier = 3;
    }
    var j = rawPath.length, xMax = rawPath[0][0], xMin = xMax, yMax = rawPath[0][1], yMin = yMax, inc = 1 / samplesPerBezier, l, x, y, i, segment, k, t, inv, x1, y1, x2, x3, x4, y2, y3, y4;
    while (--j > -1) {
      segment = rawPath[j];
      l = segment.length;
      for (i = 6; i < l; i += 6) {
        x1 = segment[i];
        y1 = segment[i + 1];
        x2 = segment[i + 2] - x1;
        y2 = segment[i + 3] - y1;
        x3 = segment[i + 4] - x1;
        y3 = segment[i + 5] - y1;
        x4 = segment[i + 6] - x1;
        y4 = segment[i + 7] - y1;
        k = samplesPerBezier;
        while (--k > -1) {
          t = inc * k;
          inv = 1 - t;
          x = (t * t * x4 + 3 * inv * (t * x3 + inv * x2)) * t + x1;
          y = (t * t * y4 + 3 * inv * (t * y3 + inv * y2)) * t + y1;
          if (x > xMax) {
            xMax = x;
          } else if (x < xMin) {
            xMin = x;
          }
          if (y > yMax) {
            yMax = y;
          } else if (y < yMin) {
            yMin = y;
          }
        }
      }
    }
    rawPath.centerX = (xMax + xMin) / 2;
    rawPath.centerY = (yMax + yMin) / 2;
    rawPath.left = xMin;
    rawPath.width = xMax - xMin;
    rawPath.top = yMin;
    rawPath.height = yMax - yMin;
    return rawPath.size = (xMax - xMin) * (yMax - yMin);
  };
  var _sortByComplexity = function _sortByComplexity2(a, b) {
    return b.length - a.length;
  };
  var _sortBySize = function _sortBySize2(a, b) {
    var sizeA = a.size || _getSize3(a), sizeB = b.size || _getSize3(b);
    return Math.abs(sizeB - sizeA) < (sizeA + sizeB) / 20 ? b.centerX - a.centerX || b.centerY - a.centerY : sizeB - sizeA;
  };
  var _offsetSegment = function _offsetSegment2(segment, shapeIndex) {
    var a = segment.slice(0), l = segment.length, wrap3 = l - 2, i, index;
    shapeIndex = shapeIndex | 0;
    for (i = 0; i < l; i++) {
      index = (i + shapeIndex) % wrap3;
      segment[i++] = a[index];
      segment[i] = a[index + 1];
    }
  };
  var _getTotalMovement = function _getTotalMovement2(sb, eb, shapeIndex, offsetX, offsetY) {
    var l = sb.length, d = 0, wrap3 = l - 2, index, i, x, y;
    shapeIndex *= 6;
    for (i = 0; i < l; i += 6) {
      index = (i + shapeIndex) % wrap3;
      y = sb[index] - (eb[i] - offsetX);
      x = sb[index + 1] - (eb[i + 1] - offsetY);
      d += _sqrt3(x * x + y * y);
    }
    return d;
  };
  var _getClosestShapeIndex = function _getClosestShapeIndex2(sb, eb, checkReverse) {
    var l = sb.length, sCenter = _getAverageXY(sb), eCenter = _getAverageXY(eb), offsetX = eCenter[0] - sCenter[0], offsetY = eCenter[1] - sCenter[1], min = _getTotalMovement(sb, eb, 0, offsetX, offsetY), minIndex = 0, copy, d, i;
    for (i = 6; i < l; i += 6) {
      d = _getTotalMovement(sb, eb, i / 6, offsetX, offsetY);
      if (d < min) {
        min = d;
        minIndex = i;
      }
    }
    if (checkReverse) {
      copy = sb.slice(0);
      reverseSegment(copy);
      for (i = 6; i < l; i += 6) {
        d = _getTotalMovement(copy, eb, i / 6, offsetX, offsetY);
        if (d < min) {
          min = d;
          minIndex = -i;
        }
      }
    }
    return minIndex / 6;
  };
  var _getClosestAnchor = function _getClosestAnchor2(rawPath, x, y) {
    var j = rawPath.length, closestDistance = _bigNum3, closestX = 0, closestY = 0, segment, dx, dy, d, i, l;
    while (--j > -1) {
      segment = rawPath[j];
      l = segment.length;
      for (i = 0; i < l; i += 6) {
        dx = segment[i] - x;
        dy = segment[i + 1] - y;
        d = _sqrt3(dx * dx + dy * dy);
        if (d < closestDistance) {
          closestDistance = d;
          closestX = segment[i];
          closestY = segment[i + 1];
        }
      }
    }
    return [closestX, closestY];
  };
  var _getClosestSegment = function _getClosestSegment2(bezier, pool, startIndex, sortRatio, offsetX, offsetY) {
    var l = pool.length, index = 0, minSize = Math.min(bezier.size || _getSize3(bezier), pool[startIndex].size || _getSize3(pool[startIndex])) * sortRatio, min = _bigNum3, cx = bezier.centerX + offsetX, cy = bezier.centerY + offsetY, size, i, dx, dy, d;
    for (i = startIndex; i < l; i++) {
      size = pool[i].size || _getSize3(pool[i]);
      if (size < minSize) {
        break;
      }
      dx = pool[i].centerX - cx;
      dy = pool[i].centerY - cy;
      d = _sqrt3(dx * dx + dy * dy);
      if (d < min) {
        index = i;
        min = d;
      }
    }
    d = pool[index];
    pool.splice(index, 1);
    return d;
  };
  var _subdivideSegmentQty = function _subdivideSegmentQty2(segment, quantity) {
    var tally = 0, max = 0.999999, l = segment.length, newPointsPerSegment = quantity / ((l - 2) / 6), ax, ay, cp1x, cp1y, cp2x, cp2y, bx, by, x1, y1, x2, y2, i, t;
    for (i = 2; i < l; i += 6) {
      tally += newPointsPerSegment;
      while (tally > max) {
        ax = segment[i - 2];
        ay = segment[i - 1];
        cp1x = segment[i];
        cp1y = segment[i + 1];
        cp2x = segment[i + 2];
        cp2y = segment[i + 3];
        bx = segment[i + 4];
        by = segment[i + 5];
        t = 1 / ((Math.floor(tally) || 1) + 1);
        x1 = ax + (cp1x - ax) * t;
        x2 = cp1x + (cp2x - cp1x) * t;
        x1 += (x2 - x1) * t;
        x2 += (cp2x + (bx - cp2x) * t - x2) * t;
        y1 = ay + (cp1y - ay) * t;
        y2 = cp1y + (cp2y - cp1y) * t;
        y1 += (y2 - y1) * t;
        y2 += (cp2y + (by - cp2y) * t - y2) * t;
        segment.splice(
          i,
          4,
          ax + (cp1x - ax) * t,
          ay + (cp1y - ay) * t,
          x1,
          y1,
          x1 + (x2 - x1) * t,
          y1 + (y2 - y1) * t,
          x2,
          y2,
          cp2x + (bx - cp2x) * t,
          cp2y + (by - cp2y) * t
        );
        i += 6;
        l += 6;
        tally--;
      }
    }
    return segment;
  };
  var _equalizeSegmentQuantity = function _equalizeSegmentQuantity2(start, end, shapeIndex, map, fillSafe) {
    var dif = end.length - start.length, longer = dif > 0 ? end : start, shorter = dif > 0 ? start : end, added = 0, sortMethod = map === "complexity" ? _sortByComplexity : _sortBySize, sortRatio = map === "position" ? 0 : typeof map === "number" ? map : 0.8, i = shorter.length, shapeIndices = typeof shapeIndex === "object" && shapeIndex.push ? shapeIndex.slice(0) : [shapeIndex], reverse = shapeIndices[0] === "reverse" || shapeIndices[0] < 0, log = shapeIndex === "log", eb, sb, b, x, y, offsetX, offsetY;
    if (!shorter[0]) {
      return;
    }
    if (longer.length > 1) {
      start.sort(sortMethod);
      end.sort(sortMethod);
      offsetX = longer.size || _getTotalSize(longer);
      offsetX = shorter.size || _getTotalSize(shorter);
      offsetX = longer.centerX - shorter.centerX;
      offsetY = longer.centerY - shorter.centerY;
      if (sortMethod === _sortBySize) {
        for (i = 0; i < shorter.length; i++) {
          longer.splice(i, 0, _getClosestSegment(shorter[i], longer, i, sortRatio, offsetX, offsetY));
        }
      }
    }
    if (dif) {
      if (dif < 0) {
        dif = -dif;
      }
      if (longer[0].length > shorter[0].length) {
        _subdivideSegmentQty(shorter[0], (longer[0].length - shorter[0].length) / 6 | 0);
      }
      i = shorter.length;
      while (added < dif) {
        x = longer[i].size || _getSize3(longer[i]);
        b = _getClosestAnchor(shorter, longer[i].centerX, longer[i].centerY);
        x = b[0];
        y = b[1];
        shorter[i++] = [x, y, x, y, x, y, x, y];
        shorter.totalPoints += 8;
        added++;
      }
    }
    for (i = 0; i < start.length; i++) {
      eb = end[i];
      sb = start[i];
      dif = eb.length - sb.length;
      if (dif < 0) {
        _subdivideSegmentQty(eb, -dif / 6 | 0);
      } else if (dif > 0) {
        _subdivideSegmentQty(sb, dif / 6 | 0);
      }
      if (reverse && fillSafe !== false && !sb.reversed) {
        reverseSegment(sb);
      }
      shapeIndex = shapeIndices[i] || shapeIndices[i] === 0 ? shapeIndices[i] : "auto";
      if (shapeIndex) {
        if (sb.closed || Math.abs(sb[0] - sb[sb.length - 2]) < 0.5 && Math.abs(sb[1] - sb[sb.length - 1]) < 0.5) {
          if (shapeIndex === "auto" || shapeIndex === "log") {
            shapeIndices[i] = shapeIndex = _getClosestShapeIndex(sb, eb, !i || fillSafe === false);
            if (shapeIndex < 0) {
              reverse = true;
              reverseSegment(sb);
              shapeIndex = -shapeIndex;
            }
            _offsetSegment(sb, shapeIndex * 6);
          } else if (shapeIndex !== "reverse") {
            if (i && shapeIndex < 0) {
              reverseSegment(sb);
            }
            _offsetSegment(sb, (shapeIndex < 0 ? -shapeIndex : shapeIndex) * 6);
          }
        } else if (!reverse && (shapeIndex === "auto" && Math.abs(eb[0] - sb[0]) + Math.abs(eb[1] - sb[1]) + Math.abs(eb[eb.length - 2] - sb[sb.length - 2]) + Math.abs(eb[eb.length - 1] - sb[sb.length - 1]) > Math.abs(eb[0] - sb[sb.length - 2]) + Math.abs(eb[1] - sb[sb.length - 1]) + Math.abs(eb[eb.length - 2] - sb[0]) + Math.abs(eb[eb.length - 1] - sb[1]) || shapeIndex % 2)) {
          reverseSegment(sb);
          shapeIndices[i] = -1;
          reverse = true;
        } else if (shapeIndex === "auto") {
          shapeIndices[i] = 0;
        } else if (shapeIndex === "reverse") {
          shapeIndices[i] = -1;
        }
        if (sb.closed !== eb.closed) {
          sb.closed = eb.closed = false;
        }
      }
    }
    log && _log("shapeIndex:[" + shapeIndices.join(",") + "]");
    start.shapeIndex = shapeIndices;
    return shapeIndices;
  };
  var _pathFilter = function _pathFilter2(a, shapeIndex, map, precompile, fillSafe) {
    var start = stringToRawPath(a[0]), end = stringToRawPath(a[1]);
    if (!_equalizeSegmentQuantity(start, end, shapeIndex || shapeIndex === 0 ? shapeIndex : "auto", map, fillSafe)) {
      return;
    }
    a[0] = rawPathToString(start);
    a[1] = rawPathToString(end);
    if (precompile === "log" || precompile === true) {
      _log('precompile:["' + a[0] + '","' + a[1] + '"]');
    }
  };
  var _offsetPoints = function _offsetPoints2(text, offset) {
    if (!offset) {
      return text;
    }
    var a = text.match(_numExp2) || [], l = a.length, s = "", inc, i, j;
    if (offset === "reverse") {
      i = l - 1;
      inc = -2;
    } else {
      i = ((parseInt(offset, 10) || 0) * 2 + 1 + l * 100) % l;
      inc = 2;
    }
    for (j = 0; j < l; j += 2) {
      s += a[i - 1] + "," + a[i] + " ";
      i = (i + inc) % l;
    }
    return s;
  };
  var _equalizePointQuantity = function _equalizePointQuantity2(a, quantity) {
    var tally = 0, x = parseFloat(a[0]), y = parseFloat(a[1]), s = x + "," + y + " ", max = 0.999999, newPointsPerSegment, i, l, j, factor, nextX, nextY;
    l = a.length;
    newPointsPerSegment = quantity * 0.5 / (l * 0.5 - 1);
    for (i = 0; i < l - 2; i += 2) {
      tally += newPointsPerSegment;
      nextX = parseFloat(a[i + 2]);
      nextY = parseFloat(a[i + 3]);
      if (tally > max) {
        factor = 1 / (Math.floor(tally) + 1);
        j = 1;
        while (tally > max) {
          s += (x + (nextX - x) * factor * j).toFixed(2) + "," + (y + (nextY - y) * factor * j).toFixed(2) + " ";
          tally--;
          j++;
        }
      }
      s += nextX + "," + nextY + " ";
      x = nextX;
      y = nextY;
    }
    return s;
  };
  var _pointsFilter = function _pointsFilter2(a) {
    var startNums = a[0].match(_numExp2) || [], endNums = a[1].match(_numExp2) || [], dif = endNums.length - startNums.length;
    if (dif > 0) {
      a[0] = _equalizePointQuantity(startNums, dif);
    } else {
      a[1] = _equalizePointQuantity(endNums, -dif);
    }
  };
  var _buildPointsFilter = function _buildPointsFilter2(shapeIndex) {
    return !isNaN(shapeIndex) ? function(a) {
      _pointsFilter(a);
      a[1] = _offsetPoints(a[1], parseInt(shapeIndex, 10));
    } : _pointsFilter;
  };
  var _parseShape = function _parseShape2(shape, forcePath, target) {
    var isString2 = typeof shape === "string", e, type;
    if (!isString2 || _selectorExp2.test(shape) || (shape.match(_numExp2) || []).length < 3) {
      e = _toArray2(shape)[0];
      if (e) {
        type = (e.nodeName + "").toUpperCase();
        if (forcePath && type !== "PATH") {
          e = convertToPath(e, false);
          type = "PATH";
        }
        shape = e.getAttribute(type === "PATH" ? "d" : "points") || "";
        if (e === target) {
          shape = e.getAttributeNS(null, "data-original") || shape;
        }
      } else {
        _log("WARNING: invalid morph to: " + shape);
        shape = false;
      }
    }
    return shape;
  };
  var _populateSmoothData = function _populateSmoothData2(rawPath, tolerance) {
    var j = rawPath.length, limit = 0.2 * (tolerance || 1), smooth, segment, x, y, x2, y2, i, l, a, a2, isSmooth, smoothData;
    while (--j > -1) {
      segment = rawPath[j];
      isSmooth = segment.isSmooth = segment.isSmooth || [0, 0, 0, 0];
      smoothData = segment.smoothData = segment.smoothData || [0, 0, 0, 0];
      isSmooth.length = 4;
      l = segment.length - 2;
      for (i = 6; i < l; i += 6) {
        x = segment[i] - segment[i - 2];
        y = segment[i + 1] - segment[i - 1];
        x2 = segment[i + 2] - segment[i];
        y2 = segment[i + 3] - segment[i + 1];
        a = _atan22(y, x);
        a2 = _atan22(y2, x2);
        smooth = Math.abs(a - a2) < limit;
        if (smooth) {
          smoothData[i - 2] = a;
          smoothData[i + 2] = a2;
          smoothData[i - 1] = _sqrt3(x * x + y * y);
          smoothData[i + 3] = _sqrt3(x2 * x2 + y2 * y2);
        }
        isSmooth.push(smooth, smooth, 0, 0, smooth, smooth);
      }
      if (segment[l] === segment[0] && segment[l + 1] === segment[1]) {
        x = segment[0] - segment[l - 2];
        y = segment[1] - segment[l - 1];
        x2 = segment[2] - segment[0];
        y2 = segment[3] - segment[1];
        a = _atan22(y, x);
        a2 = _atan22(y2, x2);
        if (Math.abs(a - a2) < limit) {
          smoothData[l - 2] = a;
          smoothData[2] = a2;
          smoothData[l - 1] = _sqrt3(x * x + y * y);
          smoothData[3] = _sqrt3(x2 * x2 + y2 * y2);
          isSmooth[l - 2] = isSmooth[l - 1] = true;
        }
      }
    }
    return rawPath;
  };
  var _parseOriginFactors = function _parseOriginFactors2(v) {
    var a = v.trim().split(" "), x = ~v.indexOf("left") ? 0 : ~v.indexOf("right") ? 100 : isNaN(parseFloat(a[0])) ? 50 : parseFloat(a[0]), y = ~v.indexOf("top") ? 0 : ~v.indexOf("bottom") ? 100 : isNaN(parseFloat(a[1])) ? 50 : parseFloat(a[1]);
    return {
      x: x / 100,
      y: y / 100
    };
  };
  var _shortAngle = function _shortAngle2(dif) {
    return dif !== dif % _PI ? dif + (dif < 0 ? _2PI2 : -_2PI2) : dif;
  };
  var _morphMessage = "Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.";
  var _tweenRotation = function _tweenRotation2(start, end, i, linkedPT) {
    var so = this._origin, eo = this._eOrigin, dx = start[i] - so.x, dy = start[i + 1] - so.y, d = _sqrt3(dx * dx + dy * dy), sa = _atan22(dy, dx), angleDif, _short;
    dx = end[i] - eo.x;
    dy = end[i + 1] - eo.y;
    angleDif = _atan22(dy, dx) - sa;
    _short = _shortAngle(angleDif);
    if (!linkedPT && _lastLinkedAnchor && Math.abs(_short + _lastLinkedAnchor.ca) < _angleMin) {
      linkedPT = _lastLinkedAnchor;
    }
    return this._anchorPT = _lastLinkedAnchor = {
      _next: this._anchorPT,
      t: start,
      sa,
      ca: linkedPT && _short * linkedPT.ca < 0 && Math.abs(_short) > _angleMax ? angleDif : _short,
      sl: d,
      cl: _sqrt3(dx * dx + dy * dy) - d,
      i
    };
  };
  var _initCore5 = function _initCore6(required) {
    gsap4 = _getGSAP5();
    PluginClass = PluginClass || gsap4 && gsap4.plugins.morphSVG;
    if (gsap4 && PluginClass) {
      _toArray2 = gsap4.utils.toArray;
      _doc5 = document;
      PluginClass.prototype._tweenRotation = _tweenRotation;
      _coreInitted4 = 1;
    } else if (required) {
      _log("Please gsap.registerPlugin(MorphSVGPlugin)");
    }
  };
  var MorphSVGPlugin = {
    version: "3.13.0",
    name: "morphSVG",
    rawVars: 1,
    register: function register(core, Plugin) {
      gsap4 = core;
      PluginClass = Plugin;
      _initCore5();
    },
    init: function init4(target, value, tween, index, targets) {
      _coreInitted4 || _initCore5(1);
      if (!value) {
        _log("invalid shape");
        return false;
      }
      _isFunction5(value) && (value = value.call(tween, index, target, targets));
      var type, p, pt, shape, isPoly, shapeIndex, map, startSmooth, endSmooth, start, end, i, j, l, startSeg, endSeg, precompiled, sData, eData, originFactors, useRotation, offset;
      if (typeof value === "string" || value.getBBox || value[0]) {
        value = {
          shape: value
        };
      } else if (typeof value === "object") {
        type = {};
        for (p in value) {
          type[p] = _isFunction5(value[p]) && p !== "render" ? value[p].call(tween, index, target, targets) : value[p];
        }
        value = type;
      }
      var cs = target.nodeType ? window.getComputedStyle(target) : {}, fill = cs.fill + "", fillSafe = !(fill === "none" || (fill.match(_numExp2) || [])[3] === "0" || cs.fillRule === "evenodd"), origins = (value.origin || "50 50").split(",");
      type = (target.nodeName + "").toUpperCase();
      isPoly = type === "POLYLINE" || type === "POLYGON";
      if (type !== "PATH" && !isPoly && !value.prop) {
        _log("Cannot morph a <" + type + "> element. " + _morphMessage);
        return false;
      }
      p = type === "PATH" ? "d" : "points";
      if (!value.prop && !_isFunction5(target.setAttribute)) {
        return false;
      }
      shape = _parseShape(value.shape || value.d || value.points || "", p === "d", target);
      if (isPoly && _commands.test(shape)) {
        _log("A <" + type + "> cannot accept path data. " + _morphMessage);
        return false;
      }
      shapeIndex = value.shapeIndex || value.shapeIndex === 0 ? value.shapeIndex : "auto";
      map = value.map || MorphSVGPlugin.defaultMap;
      this._prop = value.prop;
      this._render = value.render || MorphSVGPlugin.defaultRender;
      this._apply = "updateTarget" in value ? value.updateTarget : MorphSVGPlugin.defaultUpdateTarget;
      this._rnd = Math.pow(10, isNaN(value.precision) ? 2 : +value.precision);
      this._tween = tween;
      if (shape) {
        this._target = target;
        precompiled = typeof value.precompile === "object";
        start = this._prop ? target[this._prop] : target.getAttribute(p);
        if (!this._prop && !target.getAttributeNS(null, "data-original")) {
          target.setAttributeNS(null, "data-original", start);
        }
        if (p === "d" || this._prop) {
          start = stringToRawPath(precompiled ? value.precompile[0] : start);
          end = stringToRawPath(precompiled ? value.precompile[1] : shape);
          if (!precompiled && !_equalizeSegmentQuantity(start, end, shapeIndex, map, fillSafe)) {
            return false;
          }
          if (value.precompile === "log" || value.precompile === true) {
            _log('precompile:["' + rawPathToString(start) + '","' + rawPathToString(end) + '"]');
          }
          useRotation = (value.type || MorphSVGPlugin.defaultType) !== "linear";
          if (useRotation) {
            start = _populateSmoothData(start, value.smoothTolerance);
            end = _populateSmoothData(end, value.smoothTolerance);
            if (!start.size) {
              _getTotalSize(start);
            }
            if (!end.size) {
              _getTotalSize(end);
            }
            originFactors = _parseOriginFactors(origins[0]);
            this._origin = start.origin = {
              x: start.left + originFactors.x * start.width,
              y: start.top + originFactors.y * start.height
            };
            if (origins[1]) {
              originFactors = _parseOriginFactors(origins[1]);
            }
            this._eOrigin = {
              x: end.left + originFactors.x * end.width,
              y: end.top + originFactors.y * end.height
            };
          }
          this._rawPath = target._gsRawPath = start;
          j = start.length;
          while (--j > -1) {
            startSeg = start[j];
            endSeg = end[j];
            startSmooth = startSeg.isSmooth || [];
            endSmooth = endSeg.isSmooth || [];
            l = startSeg.length;
            _lastLinkedAnchor = 0;
            for (i = 0; i < l; i += 2) {
              if (endSeg[i] !== startSeg[i] || endSeg[i + 1] !== startSeg[i + 1]) {
                if (useRotation) {
                  if (startSmooth[i] && endSmooth[i]) {
                    sData = startSeg.smoothData;
                    eData = endSeg.smoothData;
                    offset = i + (i === l - 4 ? 7 - l : 5);
                    this._controlPT = {
                      _next: this._controlPT,
                      i,
                      j,
                      l1s: sData[i + 1],
                      l1c: eData[i + 1] - sData[i + 1],
                      l2s: sData[offset],
                      l2c: eData[offset] - sData[offset]
                    };
                    pt = this._tweenRotation(startSeg, endSeg, i + 2);
                    this._tweenRotation(startSeg, endSeg, i, pt);
                    this._tweenRotation(startSeg, endSeg, offset - 1, pt);
                    i += 4;
                  } else {
                    this._tweenRotation(startSeg, endSeg, i);
                  }
                } else {
                  pt = this.add(startSeg, i, startSeg[i], endSeg[i], 0, 0, 0, 0, 0, 1);
                  pt = this.add(startSeg, i + 1, startSeg[i + 1], endSeg[i + 1], 0, 0, 0, 0, 0, 1) || pt;
                }
              }
            }
          }
        } else {
          pt = this.add(target, "setAttribute", target.getAttribute(p) + "", shape + "", index, targets, 0, _buildPointsFilter(shapeIndex), p);
        }
        if (useRotation) {
          this.add(this._origin, "x", this._origin.x, this._eOrigin.x, 0, 0, 0, 0, 0, 1);
          pt = this.add(this._origin, "y", this._origin.y, this._eOrigin.y, 0, 0, 0, 0, 0, 1);
        }
        if (pt) {
          this._props.push("morphSVG");
          pt.end = shape;
          pt.endProp = p;
        }
      }
      return _bonusValidated;
    },
    render: function render3(ratio, data) {
      var rawPath = data._rawPath, controlPT = data._controlPT, anchorPT = data._anchorPT, rnd = data._rnd, target = data._target, pt = data._pt, s, space, easeInOut, segment, l, angle, i, j, x, y, sin, cos, offset;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
      if (ratio === 1 && data._apply) {
        pt = data._pt;
        while (pt) {
          if (pt.end) {
            if (data._prop) {
              target[data._prop] = pt.end;
            } else {
              target.setAttribute(pt.endProp, pt.end);
            }
          }
          pt = pt._next;
        }
      } else if (rawPath) {
        while (anchorPT) {
          angle = anchorPT.sa + ratio * anchorPT.ca;
          l = anchorPT.sl + ratio * anchorPT.cl;
          anchorPT.t[anchorPT.i] = data._origin.x + _cos3(angle) * l;
          anchorPT.t[anchorPT.i + 1] = data._origin.y + _sin3(angle) * l;
          anchorPT = anchorPT._next;
        }
        easeInOut = ratio < 0.5 ? 2 * ratio * ratio : (4 - 2 * ratio) * ratio - 1;
        while (controlPT) {
          i = controlPT.i;
          segment = rawPath[controlPT.j];
          offset = i + (i === segment.length - 4 ? 7 - segment.length : 5);
          angle = _atan22(segment[offset] - segment[i + 1], segment[offset - 1] - segment[i]);
          sin = _sin3(angle);
          cos = _cos3(angle);
          x = segment[i + 2];
          y = segment[i + 3];
          l = controlPT.l1s + easeInOut * controlPT.l1c;
          segment[i] = x - cos * l;
          segment[i + 1] = y - sin * l;
          l = controlPT.l2s + easeInOut * controlPT.l2c;
          segment[offset - 1] = x + cos * l;
          segment[offset] = y + sin * l;
          controlPT = controlPT._next;
        }
        target._gsRawPath = rawPath;
        if (data._apply) {
          s = "";
          space = " ";
          for (j = 0; j < rawPath.length; j++) {
            segment = rawPath[j];
            l = segment.length;
            s += "M" + (segment[0] * rnd | 0) / rnd + space + (segment[1] * rnd | 0) / rnd + " C";
            for (i = 2; i < l; i++) {
              s += (segment[i] * rnd | 0) / rnd + space;
            }
          }
          if (data._prop) {
            target[data._prop] = s;
          } else {
            target.setAttribute("d", s);
          }
        }
      }
      data._render && rawPath && data._render.call(data._tween, rawPath, target);
    },
    kill: function kill(property) {
      this._pt = this._rawPath = 0;
    },
    getRawPath,
    stringToRawPath,
    rawPathToString,
    normalizeStrings: function normalizeStrings(shape1, shape2, _ref) {
      var shapeIndex = _ref.shapeIndex, map = _ref.map;
      var result = [shape1, shape2];
      _pathFilter(result, shapeIndex, map);
      return result;
    },
    pathFilter: _pathFilter,
    pointsFilter: _pointsFilter,
    getTotalSize: _getTotalSize,
    equalizeSegmentQuantity: _equalizeSegmentQuantity,
    convertToPath: function convertToPath2(targets, swap) {
      return _toArray2(targets).map(function(target) {
        return convertToPath(target, swap !== false);
      });
    },
    defaultType: "linear",
    defaultUpdateTarget: true,
    defaultMap: "size"
  };
  _getGSAP5() && gsap4.registerPlugin(MorphSVGPlugin);

  // src/page/home.js
  gsapWithCSS.registerPlugin(ScrollTrigger2, MorphSVGPlugin);
  var gridWrap = document.querySelector("[grid-anim]");
  var gridTimeline;
  var wordsTimeline;
  var hhLetters;
  var tl2;
  var tlOut12;
  var tlOut22;
  var logoReveal;
  function orbHomePath() {
    const orbObj = document.querySelector("[data-orb]");
    const orbOutline3 = document.querySelector('[orb-out-w="1"]');
    const orbOutline22 = document.querySelector('[orb-out-w="2"]');
    tl2 = gsapWithCSS.timeline({
      scrollTrigger: {
        trigger: ".page-w",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        immediateRender: false
      }
    });
    tlOut12 = gsapWithCSS.timeline({
      scrollTrigger: {
        trigger: ".page-w",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        immediateRender: false
      }
    });
    tlOut22 = gsapWithCSS.timeline({
      scrollTrigger: {
        trigger: ".page-w",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        immediateRender: false
      }
    });
    tl2.to(orbObj, { x: "50vw", scale: 2, duration: 0.15, ease: "power2.out" }).to(orbObj, {
      x: "-50vw",
      y: "-20vh",
      scale: 1.5,
      duration: 0.15,
      ease: "power2.inOut"
    }).to(orbObj, {
      x: "0vw",
      y: "50vh",
      scale: 0,
      duration: 0.05
    }).to(orbObj, {
      x: "0vw",
      scale: 0,
      duration: 0.025
    }).to(orbObj, { x: "0vw", y: "0vh", scale: 1, duration: 0.125 }).to(orbObj, { x: "-25vw", y: "20vh", scale: 1.5, duration: 0.1 }).to(orbObj, {
      x: "-60vw",
      y: "-75vh",
      scale: 0,
      ease: "power1.out",
      duration: 0.05
    }).to(orbObj, { x: "0vw", y: "0vh", scale: 0, duration: 0.3 });
    tlOut12.to(orbOutline3, {
      x: "10vw",
      y: "0vh",
      scale: 1.2,
      duration: 0.15,
      overwrite: "auto"
    }).to(orbOutline3, { x: "-30vw", y: "0vh", scale: 1.3, duration: 0.15 }).to(orbOutline3, { x: "0vw", y: "50vh", scale: 1, duration: 0.05 }).to(orbOutline3, { x: "0vw", y: "50vh", scale: 0.8, duration: 0.025 }).to(orbOutline3, { x: "0vw", y: "0vh", scale: 1, duration: 0.125 }).to(orbOutline3, { x: "30vw", y: "-20vh", scale: 0.7, duration: 0.15 }).to(orbOutline3, { x: "0vw", y: "0vh", scale: 1, duration: 0.05 }).to(orbOutline3, { x: "0vw", y: "0vh", scale: 0, duration: 0.25 }).to(orbOutline3, { x: "49vw", y: "0vh", scale: 1, duration: 0.05 });
    tlOut22.to(orbOutline22, {
      x: "25vw",
      y: "0vh",
      scale: 1.3,
      duration: 0.15,
      overwrite: "auto"
    }).to(orbOutline22, { x: "-9vw", y: "32vh", scale: 0.6, duration: 0.15 }).to(orbOutline22, { x: "0vw", y: "50vh", scale: 1, duration: 0.05 }).to(orbOutline22, { x: "0vw", y: "50vh", scale: 0.8, duration: 0.025 }).to(orbOutline22, { x: "0vw", y: "0vh", scale: 1, duration: 0.125 }).to(orbOutline22, { x: "0vw", y: "14vh", scale: 1.2, duration: 0.15 }).to(orbOutline22, { x: "0vw", y: "0vh", scale: 0.6, duration: 0.05 }).to(orbOutline22, { x: "0vw", y: "0vh", scale: 0, duration: 0.25 }).to(orbOutline22, { x: "29vw", y: "0vh", scale: 1.5, duration: 0.05 });
  }
  function destroyOrbHomePath() {
    if (tl2)
      tl2.kill();
    if (tlOut12)
      tlOut12.kill();
    if (tlOut22)
      tlOut22.kill();
  }
  function homeHero(mode = "") {
    const orbElement = document.querySelector("[data-orb]");
    const orbOutline3 = document.querySelector('[orb-outline="1"]');
    const orbOutline22 = document.querySelector('[orb-outline="2"]');
    const selector3 = document.querySelectorAll(".c.is-home-hero [split-hero]");
    document.body.style.cursor = "progress";
    setTimeout(() => {
      window.SScroll.stop();
    }, 50);
    hhLetters = runSplit(selector3, "chars");
    let hhDuration = "1";
    if (!window.isTabletOrBelow) {
      gsapWithCSS.set(hhLetters.chars, {
        y: "-101%"
      });
      gsapWithCSS.to(".hh-text-block .char", {
        y: "0%",
        duration: 1,
        ease: "power4.inOut",
        stagger: { each: 0.03, from: "random" }
      });
      gsapWithCSS.to(".home-hero-tablet-text .char", {
        y: "0%",
        duration: 1,
        ease: "power4.inOut",
        stagger: { each: 0.03, from: "random" }
      });
    } else {
      gsapWithCSS.set(hhLetters.chars, {
        y: "-101%",
        autoAlpha: 0
      });
      gsapWithCSS.to(".hh-text-block .char", {
        y: "0%",
        autoAlpha: 1,
        duration: 1,
        ease: "power4.inOut",
        stagger: { each: 0.03, from: "random" }
      });
      gsapWithCSS.to(".home-hero-tablet-text .char", {
        y: "0%",
        autoAlpha: 1,
        duration: 1,
        ease: "power4.inOut",
        stagger: { each: 0.03, from: "random" }
      });
    }
    if (mode !== "transition") {
      gsapWithCSS.set(orbElement, {
        autoAlpha: 0,
        width: "0em",
        height: "0em",
        minHeight: "auto",
        minWidth: "auto"
      });
      gsapWithCSS.set(orbOutline3, {
        autoAlpha: 0,
        scale: 0
      });
      gsapWithCSS.set(orbOutline22, {
        autoAlpha: 0,
        scale: 0
      });
      gsapWithCSS.to(orbElement, {
        autoAlpha: 1,
        width: "4.3em",
        height: "4.3em",
        duration: 1
      });
      gsapWithCSS.to(orbOutline3, {
        autoAlpha: 1,
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      });
      gsapWithCSS.to(orbOutline22, {
        delay: 1,
        autoAlpha: 1,
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      });
      if (!window.isTabletOrBelow) {
        gsapWithCSS.to(orbOutline3, {
          scale: 1.3,
          duration: 2,
          ease: "power2.inOut",
          delay: 2,
          onComplete: function() {
            gsapWithCSS.to(orbOutline3, {
              autoAlpha: 1,
              scale: 1.2,
              duration: 2,
              ease: "power2.inOut"
            });
          }
        });
        gsapWithCSS.to(orbOutline22, {
          scale: 0.9,
          duration: 2.5,
          ease: "power2.inOut",
          delay: 3,
          onComplete: function() {
            gsapWithCSS.to(orbOutline3, {
              autoAlpha: 1,
              scale: 1.2,
              duration: 2,
              ease: "power2.inOut"
            });
          }
        });
        gsapWithCSS.to(orbElement, {
          transform: "translate(0em, 0em)",
          width: "80vh",
          height: "80vh",
          minHeight: "45em",
          minWidth: "45em",
          duration: 1,
          ease: "power2.inOut",
          delay: 1
        });
      } else {
        gsapWithCSS.to(orbOutline3, {
          scale: 1,
          duration: 1,
          ease: "power2.inOut",
          delay: 2,
          onComplete: function() {
            gsapWithCSS.to(orbOutline3, {
              autoAlpha: 1,
              scale: 1.2,
              duration: 2,
              ease: "power2.inOut"
            });
          }
        });
        gsapWithCSS.to(orbOutline22, {
          scale: 0.9,
          duration: 1,
          ease: "power2.inOut",
          delay: 3,
          onComplete: function() {
            gsapWithCSS.to(orbOutline3, {
              autoAlpha: 1,
              scale: 0.9,
              duration: 2,
              ease: "power2.inOut"
            });
          }
        });
        gsapWithCSS.to(orbElement, {
          transform: "translate(0vw, 14vh)",
          width: "150vw",
          height: "150vw",
          duration: 1,
          ease: "power2.inOut",
          delay: 1
        });
      }
    }
    gsapWithCSS.from('[hh-tb="1"]', {
      delay: 1,
      x: "10em",
      duration: hhDuration,
      ease: "power2.inOut"
    });
    gsapWithCSS.from('[hh-tb="2"]', {
      delay: 1.1,
      x: "-10em",
      duration: hhDuration,
      ease: "power2.inOut"
    });
    gsapWithCSS.from('[hh-tb="3"]', {
      delay: 1.2,
      x: "10em",
      duration: hhDuration,
      ease: "power2.inOut",
      onComplete: function() {
        document.body.style.cursor = "auto";
        window.SScroll.start();
        if (!window.isTabletOrBelow) {
          heroScrollTrigger();
          orbHomePath();
        }
      }
    });
  }
  function heroScrollTrigger() {
    const homeSection = document.querySelector("[home-hero]");
    gsapWithCSS.to('[hh-tb="1"]', {
      x: "-20em",
      ease: "power2.out",
      scrollTrigger: {
        trigger: homeSection,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    gsapWithCSS.to('[hh-tb="2"]', {
      x: "-10em",
      ease: "power2.out",
      scrollTrigger: {
        trigger: homeSection,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    gsapWithCSS.to('[hh-tb="3"]', {
      x: "-5em",
      ease: "power2.out",
      scrollTrigger: {
        trigger: homeSection,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    const elementsToAnimate = document.querySelectorAll("[split-hero] .char");
    gsapWithCSS.to(elementsToAnimate, {
      y: "101%",
      autoAlpha: 0,
      stagger: { each: 0.03, from: "random" },
      scrollTrigger: {
        trigger: homeSection,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }
  function destroyHeroScrollTrigger() {
    gsapWithCSS.killTweensOf('[hh-tb="1"]');
    gsapWithCSS.killTweensOf('[hh-tb="2"]');
    gsapWithCSS.killTweensOf('[hh-tb="3"]');
    const elementsToAnimate = document.querySelectorAll("[split-hero] .char");
    gsapWithCSS.killTweensOf(elementsToAnimate);
    ScrollTrigger2.getAll().forEach((st) => st.kill());
  }
  var gridAnim = (gridWrap2) => {
    const gridItems = gridWrap2.querySelectorAll(".hg-grid-item");
    const gridItemsInner = [...gridItems].map(
      (item) => item.querySelector(".hg-grid-inner")
    );
    const wordElems = document.querySelectorAll(
      ".hg-grid-overlay [split-text] .word"
    );
    const gridTexts = gridWrap2.querySelectorAll(".text-small");
    gsapWithCSS.set(gridTexts, {
      fontSize: "3em"
    });
    const wordAnimationPropsFrom = {
      autoAlpha: 0,
      yPercent: 101,
      duration: 2,
      ease: "power4.inOut"
    };
    const wordAnimationPropsTo = {
      autoAlpha: 1,
      yPercent: 0,
      stagger: { each: 0.05, from: "random" },
      duration: 2,
      ease: "power4.inOut"
    };
    const gridTimeline2 = gsapWithCSS.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: gridWrap2,
        start: "top bottom+=5%",
        end: "bottom top-=5%",
        scrub: true,
        id: "gridTimelineTrigger"
      }
    });
    gridTimeline2.set(gridItems, {
      transformOrigin: "50% 0%",
      z: () => gsapWithCSS.utils.random(-6e3, -100),
      rotationX: () => gsapWithCSS.utils.random(-65, -25),
      autoAlpha: 0.5
    }).to(
      gridWrap2,
      {
        scale: 0.8
      },
      0
    ).to(
      gridItems,
      {
        xPercent: () => gsapWithCSS.utils.random(-150, 150),
        yPercent: () => gsapWithCSS.utils.random(-300, 300),
        rotationX: 0,
        autoAlpha: 2
      },
      0
    ).to(
      gridWrap2,
      {
        z: 6500
      },
      0
    ).fromTo(
      gridItemsInner,
      {
        scale: 2
      },
      {
        scale: 1
      },
      0
    ).fromTo(
      gridTexts,
      {
        fontSize: "1.2em"
      },
      {
        fontSize: "0.7em"
      },
      0
    );
    const wordsTimeline2 = gsapWithCSS.timeline({
      scrollTrigger: {
        trigger: gridWrap2,
        start: "top bottom-=40%",
        end: "center top",
        scrub: true,
        id: "wordsTimelineTrigger"
      }
    });
    wordsTimeline2.fromTo(wordElems, wordAnimationPropsFrom, wordAnimationPropsTo).to(wordElems, {
      ...wordAnimationPropsFrom,
      stagger: { each: 0.05, from: "start" }
    });
  };
  function destroyHomeGrid() {
    if (gridTimeline)
      gridTimeline.kill();
    if (wordsTimeline)
      wordsTimeline.kill();
    const gridTrigger = ScrollTrigger2.getById("gridTimelineTrigger");
    const wordsTrigger = ScrollTrigger2.getById("wordsTimelineTrigger");
    if (gridTrigger)
      gridTrigger.kill();
    if (wordsTrigger)
      wordsTrigger.kill();
  }
  function logoRevealScroll() {
    const triggers2 = [];
    const scaleTrigger = gsapWithCSS.to("[hsc-scale]", {
      scale: 29,
      scrollTrigger: {
        trigger: "[hsc-track]",
        scrub: true,
        start: "top top",
        end: "bottom top"
      }
    });
    triggers2.push(scaleTrigger);
    const fixImgTrigger = gsapWithCSS.to("[hsc-img]", {
      width: "20.5em",
      height: "20.5em",
      scrollTrigger: {
        trigger: "[hsc-track]",
        scrub: true,
        start: "top top",
        end: "bottom top"
      }
    });
    triggers2.push(fixImgTrigger);
    const rotateTrigger = gsapWithCSS.to("[hsc-rotate]", {
      rotation: 180,
      scrollTrigger: {
        trigger: "[hsc-track]",
        scrub: true,
        start: "top top",
        end: "bottom top"
      }
    });
    triggers2.push(rotateTrigger);
    const textAnim = gsapWithCSS.fromTo(
      "[hsc-text]",
      { x: "50vw" },
      {
        x: "0vw",
        scrollTrigger: {
          trigger: "[hsc-track]",
          scrub: true,
          start: "top top",
          end: "bottom-=100 bottom"
        }
      }
    );
    triggers2.push(textAnim);
    const sectionScale = ScrollTrigger2.create({
      trigger: "[hsc-track]",
      scrub: true,
      start: "bottom center",
      end: "bottom top",
      onUpdate: (self) => {
        gsapWithCSS.to(".s.is-hsc", {
          scale: 1 - 0.1 * self.progress,
          boxShadow: `0 0 0 ${1.5 * self.progress}px var(--light-grey)`
        });
      }
    });
    triggers2.push(sectionScale);
    const imgScaleAnim = gsapWithCSS.fromTo(
      "[hsc-img]",
      {
        scale: 0,
        rotation: 0
      },
      {
        scale: 1,
        rotation: 45,
        scrollTrigger: {
          trigger: "[hsc-track]",
          scrub: true,
          start: "top center",
          end: "top top"
        }
      }
    );
    triggers2.push(imgScaleAnim);
    const wordElements = gsapWithCSS.utils.toArray("[hsc-track] .word");
    wordElements.forEach((el, index) => {
      const isEven = index % 2 === 0;
      const yPercentValue = isEven ? -101 : 101;
      gsapWithCSS.fromTo(
        el,
        {
          yPercent: 0
        },
        {
          yPercent: yPercentValue,
          scrollTrigger: {
            trigger: "[hsc-track]",
            scrub: true,
            start: "bottom bottom-=100",
            end: "bottom center-=100"
          }
        }
      );
    });
    const textAnimDown = gsapWithCSS.fromTo(
      "[hsc-text]",
      {
        y: "0vh"
      },
      {
        y: "20vh",
        scrollTrigger: {
          trigger: "[hsc-track]",
          scrub: true,
          start: "bottom bottom",
          end: "bottom+=100 center"
        }
      }
    );
    triggers2.push(textAnimDown);
    return {
      destroy: () => {
        triggers2.forEach((trigger) => {
          if (trigger && trigger.scrollTrigger) {
            trigger.scrollTrigger.kill();
          }
          trigger.kill();
        });
      }
    };
  }
  function initializeLogoReveal() {
    logoReveal = logoRevealScroll();
  }
  var hcsItems = document.querySelectorAll(".hcs-item-w");
  var stInstances = [];
  function initializeMorph() {
    const hcsItems2 = document.querySelectorAll(".hcs-item-w");
    hcsItems2.forEach((item, index) => {
      item.addEventListener("mouseover", morphMouseOver);
      item.addEventListener("mouseleave", morphMouseLeave);
      if ((index + 1) % 2 !== 0) {
        let st = ScrollTrigger2.create({
          trigger: "[home-work]",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            gsapWithCSS.to(item, {
              y: gsapWithCSS.utils.interpolate("10em", "0em", self.progress),
              overwrite: "auto"
            });
          }
        });
        stInstances.push(st);
      } else {
        let st = ScrollTrigger2.create({
          trigger: "[home-work]",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            gsapWithCSS.to(item, {
              y: gsapWithCSS.utils.interpolate("-10em", "0em", self.progress),
              overwrite: "auto"
            });
          }
        });
        stInstances.push(st);
      }
    });
  }
  function morphMouseOver(event2) {
    const item = event2.currentTarget;
    const svgPath = item.querySelector(".hcs-cross-svg");
    const words = item.querySelectorAll(".hcs-title-w .word");
    gsapWithCSS.to(svgPath, {
      morphSVG: "M69.4 148.3 125 90.7H4.8c-1 0-1.8-.8-1.8-2V73.8c0-1.2.8-2 1.8-2h120.5L69.4 13.7c-1.3-1.5-.5-2.5 1-2.5H90c1 0 1.8.3 2.5 1L158 80.6v1l-65.4 67.9c-.8.7-1.5 1.3-2.5 1.3H70.4c-1.5 0-2.2-1.2-1-2.5z",
      duration: 0.6
    });
    gsapWithCSS.killTweensOf(words);
    gsapWithCSS.to(words, {
      y: 0,
      stagger: 0.1,
      duration: 0.3
    });
  }
  function morphMouseLeave(event2) {
    const item = event2.currentTarget;
    const svgPath = item.querySelector(".hcs-cross-svg");
    const words = item.querySelectorAll(".hcs-title-w .word");
    gsapWithCSS.to(svgPath, {
      morphSVG: svgPath,
      duration: 0.6
    });
    gsapWithCSS.killTweensOf(words);
    gsapWithCSS.to(words, {
      y: "0.75em",
      stagger: 0.05,
      duration: 0.6
    });
  }
  function destroyMorph() {
    const hcsItems2 = document.querySelectorAll(".hcs-item-w");
    hcsItems2.forEach((item) => {
      item.removeEventListener("mouseover", morphMouseOver);
      item.removeEventListener("mouseleave", morphMouseLeave);
    });
    stInstances.forEach((st) => st.kill());
    stInstances = [];
  }
  function initClientGrid() {
    const section = document.querySelector("[data-client-section]");
    const clientTag = section?.querySelector("[data-client-tag]");
    const items = section?.querySelectorAll("[data-client-item]");
    if (!section || !clientTag || !items.length)
      return;
    const baseText = clientTag.textContent;
    function handleMouseEnter(e) {
      items.forEach((item) => {
        item.style.opacity = "0.4";
      });
      e.currentTarget.style.opacity = "1";
      const itemText = e.currentTarget.getAttribute("data-client-item");
      if (itemText) {
        clientTag.textContent = itemText;
      }
    }
    function handleSectionMouseLeave() {
      items.forEach((item) => {
        item.style.opacity = "1";
      });
      clientTag.textContent = baseText;
    }
    items.forEach((item) => {
      item.addEventListener("mouseenter", handleMouseEnter);
    });
    section.addEventListener("mouseleave", handleSectionMouseLeave);
    section._clientGridData = {
      items,
      clientTag,
      baseText,
      handleMouseEnter,
      handleSectionMouseLeave
    };
  }
  function destroyClientGrid() {
    const section = document.querySelector("[data-client-section]");
    if (!section || !section._clientGridData)
      return;
    const {
      items,
      clientTag,
      baseText,
      handleMouseEnter,
      handleSectionMouseLeave
    } = section._clientGridData;
    items.forEach((item) => {
      item.removeEventListener("mouseenter", handleMouseEnter);
      item.style.opacity = "1";
    });
    section.removeEventListener("mouseleave", handleSectionMouseLeave);
    if (clientTag) {
      clientTag.textContent = baseText;
    }
    delete section._clientGridData;
  }
  function destroyHome() {
    destroyHeroScrollTrigger();
    destroyOrbHomePath();
    destroyHomeGrid();
    destroyMorph();
    destroyClientGrid();
    if (logoReveal) {
      logoReveal.destroy();
    }
    gsapWithCSS.killTweensOf('[hh-tb="3"]');
  }

  // src/page/work.js
  gsapWithCSS.registerPlugin(ScrollTrigger2, MorphSVGPlugin);
  var stInstances2 = [];
  var heroLetters2;
  function workHero(mode = "") {
    const hcsItems2 = document.querySelectorAll(".hcs-item-w");
    const orbElement = document.querySelector("[data-orb]");
    const orbOutline3 = document.querySelector('[orb-outline="1"]');
    const orbOutline22 = document.querySelector('[orb-outline="2"]');
    const orbOutlineIn1 = document.querySelector('[orb-out-w="1"]');
    const orbOutlineIn2 = document.querySelector('[orb-out-w="2"]');
    const selector3 = document.querySelectorAll("[split-hero]");
    heroLetters2 = runSplit(selector3, "words, chars");
    document.body.style.cursor = "progress";
    setTimeout(() => {
      window.SScroll.stop();
    }, 50);
    gsapWithCSS.set(hcsItems2, {
      autoAlpha: 0,
      yPercent: "100"
    });
    gsapWithCSS.set(heroLetters2.chars, {
      y: "-101%"
    });
    let duration = "1";
    gsapWithCSS.to(heroLetters2.chars, {
      y: "0%",
      duration,
      ease: "power4.inOut",
      stagger: { each: 0.03, from: "random" }
    });
    if (mode !== "transition") {
      gsapWithCSS.set(orbElement, {
        autoAlpha: 0,
        width: "0em",
        height: "0em",
        minHeight: "auto",
        minWidth: "auto"
      });
      gsapWithCSS.set(orbOutline3, {
        autoAlpha: 0,
        scale: 0
      });
      gsapWithCSS.set(orbOutline22, {
        autoAlpha: 0,
        scale: 0
      });
      gsapWithCSS.to(orbElement, {
        autoAlpha: 1,
        width: "4.3em",
        height: "4.3em",
        duration: 1
      });
      gsapWithCSS.to(orbOutline3, {
        autoAlpha: 1,
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      });
      gsapWithCSS.to(orbOutline22, {
        delay: 0.5,
        autoAlpha: 1,
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      });
      gsapWithCSS.to(orbOutlineIn1, {
        x: "0vw",
        y: "-35vh",
        scale: 0.3,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 1
      });
      gsapWithCSS.to(orbOutlineIn2, {
        x: "0vw",
        y: "5vh",
        scale: 1,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 1
      });
      gsapWithCSS.to(orbElement, {
        width: "80vh",
        height: "80vh",
        minHeight: "45em",
        minWidth: "45em",
        x: "0vw",
        y: "25vh",
        scale: 1,
        duration: 1,
        ease: "power2.inOut",
        delay: 1
      });
      document.querySelector("[data-orb-wrap]").style.position = "absolute";
    }
    gsapWithCSS.from('[hh-tb="1"]', {
      delay: 1,
      x: "10em",
      duration,
      ease: "power2.inOut"
    });
    gsapWithCSS.from('[hh-tb="2"]', {
      delay: 1.1,
      x: "-10em",
      duration,
      ease: "power2.inOut",
      onComplete: function() {
        workHeroScroll;
        document.body.style.cursor = "auto";
        window.SScroll.start();
      }
    });
    gsapWithCSS.to(hcsItems2, {
      delay: 1,
      autoAlpha: 1,
      yPercent: 0,
      duration,
      stagger: 0.2,
      ease: "power2.inOut"
    });
  }
  function workHeroScroll() {
    if (window.innerWidth > 991) {
      const heroSection = document.querySelector("[work-hero]");
      gsapWithCSS.to('[hh-tb="1"]', {
        x: "-20em",
        ease: "power2.out",
        scrollTrigger: {
          id: "st1",
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      gsapWithCSS.to('[hh-tb="2"]', {
        x: "10em",
        ease: "power2.out",
        scrollTrigger: {
          id: "st2",
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      const elementsToAnimate = document.querySelectorAll("[split-hero] .char");
      gsapWithCSS.to(elementsToAnimate, {
        y: "101%",
        autoAlpha: 0,
        stagger: { each: 0.03, from: "random" },
        scrollTrigger: {
          id: "st3",
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }
  function workScrollMorph() {
    const hcsItems2 = document.querySelectorAll(".hcs-item-w");
    gsapWithCSS.set(hcsItems2, { y: "0em" });
    if (window.innerWidth > 991) {
      hcsItems2.forEach((item, index) => {
        item.addEventListener("mouseover", morphMouseOver2);
        item.addEventListener("mouseleave", morphMouseLeave2);
        if ((index + 1) % 2 !== 0) {
          let st = ScrollTrigger2.create({
            id: "st4",
            trigger: "[home-work]",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
              gsapWithCSS.to(item, {
                y: gsapWithCSS.utils.interpolate("0em", "-10em", self.progress),
                overwrite: "auto"
              });
            }
          });
          stInstances2.push(st);
        } else {
          let st = ScrollTrigger2.create({
            id: "st5",
            trigger: "[home-work]",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
              gsapWithCSS.to(item, {
                y: gsapWithCSS.utils.interpolate("0em", "10em", self.progress),
                overwrite: "auto"
              });
            }
          });
          stInstances2.push(st);
        }
      });
    }
  }
  function morphMouseOver2(event2) {
    const item = event2.currentTarget;
    const svgPath = item.querySelector(".hcs-cross-svg");
    const words = item.querySelectorAll(".hcs-title-w .word");
    gsapWithCSS.to(svgPath, {
      morphSVG: "M69.4 148.3 125 90.7H4.8c-1 0-1.8-.8-1.8-2V73.8c0-1.2.8-2 1.8-2h120.5L69.4 13.7c-1.3-1.5-.5-2.5 1-2.5H90c1 0 1.8.3 2.5 1L158 80.6v1l-65.4 67.9c-.8.7-1.5 1.3-2.5 1.3H70.4c-1.5 0-2.2-1.2-1-2.5z",
      duration: 0.6
    });
    gsapWithCSS.killTweensOf(words);
    gsapWithCSS.to(words, {
      y: 0,
      stagger: 0.1,
      duration: 0.3
    });
  }
  function morphMouseLeave2(event2) {
    const item = event2.currentTarget;
    const svgPath = item.querySelector(".hcs-cross-svg");
    const words = item.querySelectorAll(".hcs-title-w .word");
    gsapWithCSS.to(svgPath, {
      morphSVG: svgPath,
      duration: 0.6
    });
    gsapWithCSS.killTweensOf(words);
    gsapWithCSS.to(words, {
      y: "0.75em",
      stagger: 0.05,
      duration: 0.6
    });
  }
  function destroyWorkScrollMorph() {
    const hcsItems2 = document.querySelectorAll(".hcs-item-w");
    hcsItems2.forEach((item) => {
      item.removeEventListener("mouseover", morphMouseOver2);
      item.removeEventListener("mouseleave", morphMouseLeave2);
    });
    stInstances2.forEach((st) => st.kill());
    stInstances2 = [];
  }
  function destroyWork() {
    if (ScrollTrigger2.getById("st1")) {
      ScrollTrigger2.getById("st1").kill();
    }
    if (ScrollTrigger2.getById("st2")) {
      ScrollTrigger2.getById("st2").kill();
    }
    if (ScrollTrigger2.getById("st3")) {
      ScrollTrigger2.getById("st3").kill();
    }
    if (ScrollTrigger2.getById("st4")) {
      ScrollTrigger2.getById("st4").kill();
    }
    if (ScrollTrigger2.getById("st5")) {
      ScrollTrigger2.getById("st5").kill();
    }
    destroyWorkScrollMorph();
    gsapWithCSS.killTweensOf("[hh-tb='1']");
    gsapWithCSS.killTweensOf("[hh-tb='2']");
    gsapWithCSS.killTweensOf("[split-hero] .char");
  }

  // src/page/case.js
  gsapWithCSS.registerPlugin(ScrollTrigger2);
  var triggers = [];
  function caseHero(mode = "") {
    const orbElement = document.querySelector("[data-orb]");
    const orbOutline3 = document.querySelector('[orb-outline="1"]');
    const orbOutline22 = document.querySelector('[orb-outline="2"]');
    const orbOutlineIn1 = document.querySelector('[orb-out-w="1"]');
    const orbOutlineIn2 = document.querySelector('[orb-out-w="2"]');
    const selector3 = document.querySelectorAll("[split-hero]");
    const caseHeroImg = document.querySelector("[case-hero-img]");
    const caseStats = document.querySelectorAll("[case-stats] .text-mini");
    heroLetters = runSplit(selector3, "words, chars");
    document.body.style.cursor = "progress";
    setTimeout(() => {
      window.SScroll.stop();
    }, 50);
    gsapWithCSS.set(heroLetters.chars, {
      y: "-101%"
    });
    if (caseHeroImg) {
      gsapWithCSS.set("[case-hero-img]", {
        x: "10em",
        clipPath: "inset(0% 0% 100% 0%)"
      });
    }
    if (caseStats) {
      gsapWithCSS.set(caseStats, {
        y: "101%"
      });
    }
    let duration = "1";
    gsapWithCSS.to(heroLetters.chars, {
      delay: 1,
      y: "0%",
      duration,
      ease: "power4.inOut",
      stagger: { each: 0.03, from: "random" }
    });
    if (mode !== "transition") {
      gsapWithCSS.set(orbElement, {
        autoAlpha: 0,
        width: "0em",
        height: "0em",
        minHeight: "auto",
        minWidth: "auto"
      });
      gsapWithCSS.set(orbOutline3, {
        autoAlpha: 0,
        scale: 0
      });
      gsapWithCSS.set(orbOutline22, {
        autoAlpha: 0,
        scale: 0
      });
      gsapWithCSS.to(orbElement, {
        autoAlpha: 1,
        width: "4.3em",
        height: "4.3em",
        duration: 1
      });
      gsapWithCSS.to(orbOutline3, {
        autoAlpha: 1,
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      });
      gsapWithCSS.to(orbOutline22, {
        delay: 0.2,
        autoAlpha: 1,
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      });
      gsapWithCSS.to(orbElement, {
        x: "0vw",
        y: "0vh",
        width: "80vh",
        height: "80vh",
        minHeight: "45em",
        minWidth: "45em",
        scale: 0,
        duration: 1,
        ease: "power2.inOut",
        delay: 1
      });
      gsapWithCSS.to(orbOutlineIn1, {
        x: "0vw",
        y: "-35vh",
        scale: 0.3,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 1
      });
      gsapWithCSS.to(orbOutlineIn2, {
        x: "0vw",
        y: "5vh",
        scale: 1,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 1
      });
      document.querySelector("[data-orb-wrap]").style.position = "absolute";
    }
    gsapWithCSS.from('[hh-tb="1"]', {
      delay: 2,
      x: "10em",
      duration: 1,
      ease: "power2.inOut",
      onComplete: function() {
        document.body.style.cursor = "auto";
        window.SScroll.start();
      }
    });
    gsapWithCSS.to("[case-hero-img]", {
      delay: 1.5,
      x: "0em",
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.5,
      ease: "power2.inOut"
    });
    gsapWithCSS.to(caseStats, {
      delay: 2,
      y: "0%",
      duration: 0.5,
      stagger: 0.05
    });
  }
  function initScaleFeature() {
    const elements = document.querySelectorAll("[scale-up-feature]");
    if (elements.length === 0)
      return;
    elements.forEach((el) => {
      const scaleValue = el.getAttribute("scale-up-feature");
      const shouldAnimateBorderRadius = !el.hasAttribute("scale-border-feature");
      const animationProperties = {
        scale: parseFloat(scaleValue) || 0.9,
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "top top",
          scrub: true,
          onUpdate: (self) => {
            if (self.isActive && !el.classList.contains("active")) {
              el.classList.add("active");
            } else if (!self.isActive && el.classList.contains("active")) {
              el.classList.remove("active");
            }
          }
        }
      };
      if (shouldAnimateBorderRadius) {
        animationProperties.borderRadius = "0.625em";
      }
      const animation = gsapWithCSS.from(el, animationProperties);
      triggers.push(animation.scrollTrigger);
    });
  }
  function destroyScaleFeature() {
    triggers.forEach((trigger) => trigger.kill());
    triggers = [];
  }
  function initCase() {
    initScaleFeature();
  }
  function destroyCase() {
    destroyScaleFeature();
  }

  // node_modules/.pnpm/gsap@3.13.0/node_modules/gsap/utils/matrix.js
  var _doc6;
  var _win5;
  var _docElement2;
  var _body3;
  var _divContainer;
  var _svgContainer;
  var _identityMatrix;
  var _gEl;
  var _transformProp3 = "transform";
  var _transformOriginProp2 = _transformProp3 + "Origin";
  var _hasOffsetBug;
  var _setDoc = function _setDoc2(element) {
    var doc = element.ownerDocument || element;
    if (!(_transformProp3 in element.style) && "msTransform" in element.style) {
      _transformProp3 = "msTransform";
      _transformOriginProp2 = _transformProp3 + "Origin";
    }
    while (doc.parentNode && (doc = doc.parentNode)) {
    }
    _win5 = window;
    _identityMatrix = new Matrix2D();
    if (doc) {
      _doc6 = doc;
      _docElement2 = doc.documentElement;
      _body3 = doc.body;
      _gEl = _doc6.createElementNS("http://www.w3.org/2000/svg", "g");
      _gEl.style.transform = "none";
      var d1 = doc.createElement("div"), d2 = doc.createElement("div"), root = doc && (doc.body || doc.firstElementChild);
      if (root && root.appendChild) {
        root.appendChild(d1);
        d1.appendChild(d2);
        d1.setAttribute("style", "position:static;transform:translate3d(0,0,1px)");
        _hasOffsetBug = d2.offsetParent !== d1;
        root.removeChild(d1);
      }
    }
    return doc;
  };
  var _forceNonZeroScale = function _forceNonZeroScale2(e) {
    var a, cache2;
    while (e && e !== _body3) {
      cache2 = e._gsap;
      cache2 && cache2.uncache && cache2.get(e, "x");
      if (cache2 && !cache2.scaleX && !cache2.scaleY && cache2.renderTransform) {
        cache2.scaleX = cache2.scaleY = 1e-4;
        cache2.renderTransform(1, cache2);
        a ? a.push(cache2) : a = [cache2];
      }
      e = e.parentNode;
    }
    return a;
  };
  var _svgTemps = [];
  var _divTemps = [];
  var _getDocScrollTop = function _getDocScrollTop2() {
    return _win5.pageYOffset || _doc6.scrollTop || _docElement2.scrollTop || _body3.scrollTop || 0;
  };
  var _getDocScrollLeft = function _getDocScrollLeft2() {
    return _win5.pageXOffset || _doc6.scrollLeft || _docElement2.scrollLeft || _body3.scrollLeft || 0;
  };
  var _svgOwner = function _svgOwner2(element) {
    return element.ownerSVGElement || ((element.tagName + "").toLowerCase() === "svg" ? element : null);
  };
  var _isFixed = function _isFixed2(element) {
    if (_win5.getComputedStyle(element).position === "fixed") {
      return true;
    }
    element = element.parentNode;
    if (element && element.nodeType === 1) {
      return _isFixed2(element);
    }
  };
  var _createSibling = function _createSibling2(element, i) {
    if (element.parentNode && (_doc6 || _setDoc(element))) {
      var svg = _svgOwner(element), ns = svg ? svg.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", type = svg ? i ? "rect" : "g" : "div", x = i !== 2 ? 0 : 100, y = i === 3 ? 100 : 0, css = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;", e = _doc6.createElementNS ? _doc6.createElementNS(ns.replace(/^https/, "http"), type) : _doc6.createElement(type);
      if (i) {
        if (!svg) {
          if (!_divContainer) {
            _divContainer = _createSibling2(element);
            _divContainer.style.cssText = css;
          }
          e.style.cssText = css + "width:0.1px;height:0.1px;top:" + y + "px;left:" + x + "px";
          _divContainer.appendChild(e);
        } else {
          _svgContainer || (_svgContainer = _createSibling2(element));
          e.setAttribute("width", 0.01);
          e.setAttribute("height", 0.01);
          e.setAttribute("transform", "translate(" + x + "," + y + ")");
          _svgContainer.appendChild(e);
        }
      }
      return e;
    }
    throw "Need document and parent.";
  };
  var _consolidate = function _consolidate2(m) {
    var c = new Matrix2D(), i = 0;
    for (; i < m.numberOfItems; i++) {
      c.multiply(m.getItem(i).matrix);
    }
    return c;
  };
  var _getCTM = function _getCTM2(svg) {
    var m = svg.getCTM(), transform;
    if (!m) {
      transform = svg.style[_transformProp3];
      svg.style[_transformProp3] = "none";
      svg.appendChild(_gEl);
      m = _gEl.getCTM();
      svg.removeChild(_gEl);
      transform ? svg.style[_transformProp3] = transform : svg.style.removeProperty(_transformProp3.replace(/([A-Z])/g, "-$1").toLowerCase());
    }
    return m || _identityMatrix.clone();
  };
  var _placeSiblings = function _placeSiblings2(element, adjustGOffset) {
    var svg = _svgOwner(element), isRootSVG = element === svg, siblings = svg ? _svgTemps : _divTemps, parent = element.parentNode, appendToEl = parent && !svg && parent.shadowRoot && parent.shadowRoot.appendChild ? parent.shadowRoot : parent, container, m, b, x, y, cs;
    if (element === _win5) {
      return element;
    }
    siblings.length || siblings.push(_createSibling(element, 1), _createSibling(element, 2), _createSibling(element, 3));
    container = svg ? _svgContainer : _divContainer;
    if (svg) {
      if (isRootSVG) {
        b = _getCTM(element);
        x = -b.e / b.a;
        y = -b.f / b.d;
        m = _identityMatrix;
      } else if (element.getBBox) {
        b = element.getBBox();
        m = element.transform ? element.transform.baseVal : {};
        m = !m.numberOfItems ? _identityMatrix : m.numberOfItems > 1 ? _consolidate(m) : m.getItem(0).matrix;
        x = m.a * b.x + m.c * b.y;
        y = m.b * b.x + m.d * b.y;
      } else {
        m = new Matrix2D();
        x = y = 0;
      }
      if (adjustGOffset && element.tagName.toLowerCase() === "g") {
        x = y = 0;
      }
      (isRootSVG ? svg : parent).appendChild(container);
      container.setAttribute("transform", "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + (m.e + x) + "," + (m.f + y) + ")");
    } else {
      x = y = 0;
      if (_hasOffsetBug) {
        m = element.offsetParent;
        b = element;
        while (b && (b = b.parentNode) && b !== m && b.parentNode) {
          if ((_win5.getComputedStyle(b)[_transformProp3] + "").length > 4) {
            x = b.offsetLeft;
            y = b.offsetTop;
            b = 0;
          }
        }
      }
      cs = _win5.getComputedStyle(element);
      if (cs.position !== "absolute" && cs.position !== "fixed") {
        m = element.offsetParent;
        while (parent && parent !== m) {
          x += parent.scrollLeft || 0;
          y += parent.scrollTop || 0;
          parent = parent.parentNode;
        }
      }
      b = container.style;
      b.top = element.offsetTop - y + "px";
      b.left = element.offsetLeft - x + "px";
      b[_transformProp3] = cs[_transformProp3];
      b[_transformOriginProp2] = cs[_transformOriginProp2];
      b.position = cs.position === "fixed" ? "fixed" : "absolute";
      appendToEl.appendChild(container);
    }
    return container;
  };
  var _setMatrix = function _setMatrix2(m, a, b, c, d, e, f) {
    m.a = a;
    m.b = b;
    m.c = c;
    m.d = d;
    m.e = e;
    m.f = f;
    return m;
  };
  var Matrix2D = /* @__PURE__ */ function() {
    function Matrix2D2(a, b, c, d, e, f) {
      if (a === void 0) {
        a = 1;
      }
      if (b === void 0) {
        b = 0;
      }
      if (c === void 0) {
        c = 0;
      }
      if (d === void 0) {
        d = 1;
      }
      if (e === void 0) {
        e = 0;
      }
      if (f === void 0) {
        f = 0;
      }
      _setMatrix(this, a, b, c, d, e, f);
    }
    var _proto = Matrix2D2.prototype;
    _proto.inverse = function inverse() {
      var a = this.a, b = this.b, c = this.c, d = this.d, e = this.e, f = this.f, determinant = a * d - b * c || 1e-10;
      return _setMatrix(this, d / determinant, -b / determinant, -c / determinant, a / determinant, (c * f - d * e) / determinant, -(a * f - b * e) / determinant);
    };
    _proto.multiply = function multiply(matrix) {
      var a = this.a, b = this.b, c = this.c, d = this.d, e = this.e, f = this.f, a2 = matrix.a, b2 = matrix.c, c2 = matrix.b, d2 = matrix.d, e2 = matrix.e, f2 = matrix.f;
      return _setMatrix(this, a2 * a + c2 * c, a2 * b + c2 * d, b2 * a + d2 * c, b2 * b + d2 * d, e + e2 * a + f2 * c, f + e2 * b + f2 * d);
    };
    _proto.clone = function clone2() {
      return new Matrix2D2(this.a, this.b, this.c, this.d, this.e, this.f);
    };
    _proto.equals = function equals(matrix) {
      var a = this.a, b = this.b, c = this.c, d = this.d, e = this.e, f = this.f;
      return a === matrix.a && b === matrix.b && c === matrix.c && d === matrix.d && e === matrix.e && f === matrix.f;
    };
    _proto.apply = function apply(point, decoratee) {
      if (decoratee === void 0) {
        decoratee = {};
      }
      var x = point.x, y = point.y, a = this.a, b = this.b, c = this.c, d = this.d, e = this.e, f = this.f;
      decoratee.x = x * a + y * c + e || 0;
      decoratee.y = x * b + y * d + f || 0;
      return decoratee;
    };
    return Matrix2D2;
  }();
  function getGlobalMatrix(element, inverse, adjustGOffset, includeScrollInFixed) {
    if (!element || !element.parentNode || (_doc6 || _setDoc(element)).documentElement === element) {
      return new Matrix2D();
    }
    var zeroScales = _forceNonZeroScale(element), svg = _svgOwner(element), temps = svg ? _svgTemps : _divTemps, container = _placeSiblings(element, adjustGOffset), b1 = temps[0].getBoundingClientRect(), b2 = temps[1].getBoundingClientRect(), b3 = temps[2].getBoundingClientRect(), parent = container.parentNode, isFixed = !includeScrollInFixed && _isFixed(element), m = new Matrix2D((b2.left - b1.left) / 100, (b2.top - b1.top) / 100, (b3.left - b1.left) / 100, (b3.top - b1.top) / 100, b1.left + (isFixed ? 0 : _getDocScrollLeft()), b1.top + (isFixed ? 0 : _getDocScrollTop()));
    parent.removeChild(container);
    if (zeroScales) {
      b1 = zeroScales.length;
      while (b1--) {
        b2 = zeroScales[b1];
        b2.scaleX = b2.scaleY = 0;
        b2.renderTransform(1, b2);
      }
    }
    return inverse ? m.inverse() : m;
  }

  // node_modules/.pnpm/gsap@3.13.0/node_modules/gsap/Flip.js
  var _id = 1;
  var _toArray3;
  var gsap5;
  var _batch;
  var _batchAction;
  var _body4;
  var _closestTenth;
  var _getStyleSaver3;
  var _forEachBatch = function _forEachBatch2(batch, name) {
    return batch.actions.forEach(function(a) {
      return a.vars[name] && a.vars[name](a);
    });
  };
  var _batchLookup = {};
  var _RAD2DEG3 = 180 / Math.PI;
  var _DEG2RAD3 = Math.PI / 180;
  var _emptyObj = {};
  var _dashedNameLookup = {};
  var _memoizedRemoveProps = {};
  var _listToArray = function _listToArray2(list) {
    return typeof list === "string" ? list.split(" ").join("").split(",") : list;
  };
  var _callbacks = _listToArray("onStart,onUpdate,onComplete,onReverseComplete,onInterrupt");
  var _removeProps = _listToArray("transform,transformOrigin,width,height,position,top,left,opacity,zIndex,maxWidth,maxHeight,minWidth,minHeight");
  var _getEl = function _getEl2(target) {
    return _toArray3(target)[0] || console.warn("Element not found:", target);
  };
  var _round7 = function _round8(value) {
    return Math.round(value * 1e4) / 1e4 || 0;
  };
  var _toggleClass = function _toggleClass2(targets, className, action) {
    return targets.forEach(function(el) {
      return el.classList[action](className);
    });
  };
  var _reserved = {
    zIndex: 1,
    kill: 1,
    simple: 1,
    spin: 1,
    clearProps: 1,
    targets: 1,
    toggleClass: 1,
    onComplete: 1,
    onUpdate: 1,
    onInterrupt: 1,
    onStart: 1,
    delay: 1,
    repeat: 1,
    repeatDelay: 1,
    yoyo: 1,
    scale: 1,
    fade: 1,
    absolute: 1,
    props: 1,
    onEnter: 1,
    onLeave: 1,
    custom: 1,
    paused: 1,
    nested: 1,
    prune: 1,
    absoluteOnLeave: 1
  };
  var _fitReserved = {
    zIndex: 1,
    simple: 1,
    clearProps: 1,
    scale: 1,
    absolute: 1,
    fitChild: 1,
    getVars: 1,
    props: 1
  };
  var _camelToDashed = function _camelToDashed2(p) {
    return p.replace(/([A-Z])/g, "-$1").toLowerCase();
  };
  var _copy = function _copy2(obj, exclude) {
    var result = {}, p;
    for (p in obj) {
      exclude[p] || (result[p] = obj[p]);
    }
    return result;
  };
  var _memoizedProps = {};
  var _memoizeProps = function _memoizeProps2(props) {
    var p = _memoizedProps[props] = _listToArray(props);
    _memoizedRemoveProps[props] = p.concat(_removeProps);
    return p;
  };
  var _getInverseGlobalMatrix = function _getInverseGlobalMatrix2(el) {
    var cache2 = el._gsap || gsap5.core.getCache(el);
    if (cache2.gmCache === gsap5.ticker.frame) {
      return cache2.gMatrix;
    }
    cache2.gmCache = gsap5.ticker.frame;
    return cache2.gMatrix = getGlobalMatrix(el, true, false, true);
  };
  var _getDOMDepth = function _getDOMDepth2(el, invert, level) {
    if (level === void 0) {
      level = 0;
    }
    var parent = el.parentNode, inc = 1e3 * Math.pow(10, level) * (invert ? -1 : 1), l = invert ? -inc * 900 : 0;
    while (el) {
      l += inc;
      el = el.previousSibling;
    }
    return parent ? l + _getDOMDepth2(parent, invert, level + 1) : l;
  };
  var _orderByDOMDepth = function _orderByDOMDepth2(comps, invert, isElStates) {
    comps.forEach(function(comp) {
      return comp.d = _getDOMDepth(isElStates ? comp.element : comp.t, invert);
    });
    comps.sort(function(c1, c2) {
      return c1.d - c2.d;
    });
    return comps;
  };
  var _recordInlineStyles = function _recordInlineStyles2(elState, props) {
    var style = elState.element.style, a = elState.css = elState.css || [], i = props.length, p, v;
    while (i--) {
      p = props[i];
      v = style[p] || style.getPropertyValue(p);
      a.push(v ? p : _dashedNameLookup[p] || (_dashedNameLookup[p] = _camelToDashed(p)), v);
    }
    return style;
  };
  var _applyInlineStyles = function _applyInlineStyles2(state) {
    var css = state.css, style = state.element.style, i = 0;
    state.cache.uncache = 1;
    for (; i < css.length; i += 2) {
      css[i + 1] ? style[css[i]] = css[i + 1] : style.removeProperty(css[i]);
    }
    if (!css[css.indexOf("transform") + 1] && style.translate) {
      style.removeProperty("translate");
      style.removeProperty("scale");
      style.removeProperty("rotate");
    }
  };
  var _setFinalStates = function _setFinalStates2(comps, onlyTransforms) {
    comps.forEach(function(c) {
      return c.a.cache.uncache = 1;
    });
    onlyTransforms || comps.finalStates.forEach(_applyInlineStyles);
  };
  var _absoluteProps = "paddingTop,paddingRight,paddingBottom,paddingLeft,gridArea,transition".split(",");
  var _makeAbsolute = function _makeAbsolute2(elState, fallbackNode, ignoreBatch) {
    var element = elState.element, width = elState.width, height = elState.height, uncache = elState.uncache, getProp = elState.getProp, style = element.style, i = 4, result, displayIsNone, cs;
    typeof fallbackNode !== "object" && (fallbackNode = elState);
    if (_batch && ignoreBatch !== 1) {
      _batch._abs.push({
        t: element,
        b: elState,
        a: elState,
        sd: 0
      });
      _batch._final.push(function() {
        return (elState.cache.uncache = 1) && _applyInlineStyles(elState);
      });
      return element;
    }
    displayIsNone = getProp("display") === "none";
    if (!elState.isVisible || displayIsNone) {
      displayIsNone && (_recordInlineStyles(elState, ["display"]).display = fallbackNode.display);
      elState.matrix = fallbackNode.matrix;
      elState.width = width = elState.width || fallbackNode.width;
      elState.height = height = elState.height || fallbackNode.height;
    }
    _recordInlineStyles(elState, _absoluteProps);
    cs = window.getComputedStyle(element);
    while (i--) {
      style[_absoluteProps[i]] = cs[_absoluteProps[i]];
    }
    style.gridArea = "1 / 1 / 1 / 1";
    style.transition = "none";
    style.position = "absolute";
    style.width = width + "px";
    style.height = height + "px";
    style.top || (style.top = "0px");
    style.left || (style.left = "0px");
    if (uncache) {
      result = new ElementState(element);
    } else {
      result = _copy(elState, _emptyObj);
      result.position = "absolute";
      if (elState.simple) {
        var bounds = element.getBoundingClientRect();
        result.matrix = new Matrix2D(1, 0, 0, 1, bounds.left + _getDocScrollLeft(), bounds.top + _getDocScrollTop());
      } else {
        result.matrix = getGlobalMatrix(element, false, false, true);
      }
    }
    result = _fit(result, elState, true);
    elState.x = _closestTenth(result.x, 0.01);
    elState.y = _closestTenth(result.y, 0.01);
    return element;
  };
  var _filterComps = function _filterComps2(comps, targets) {
    if (targets !== true) {
      targets = _toArray3(targets);
      comps = comps.filter(function(c) {
        if (targets.indexOf((c.sd < 0 ? c.b : c.a).element) !== -1) {
          return true;
        } else {
          c.t._gsap.renderTransform(1);
          if (c.b.isVisible) {
            c.t.style.width = c.b.width + "px";
            c.t.style.height = c.b.height + "px";
          }
        }
      });
    }
    return comps;
  };
  var _makeCompsAbsolute = function _makeCompsAbsolute2(comps) {
    return _orderByDOMDepth(comps, true).forEach(function(c) {
      return (c.a.isVisible || c.b.isVisible) && _makeAbsolute(c.sd < 0 ? c.b : c.a, c.b, 1);
    });
  };
  var _findElStateInState = function _findElStateInState2(state, other) {
    return other && state.idLookup[_parseElementState(other).id] || state.elementStates[0];
  };
  var _parseElementState = function _parseElementState2(elOrNode, props, simple, other) {
    return elOrNode instanceof ElementState ? elOrNode : elOrNode instanceof FlipState ? _findElStateInState(elOrNode, other) : new ElementState(typeof elOrNode === "string" ? _getEl(elOrNode) || console.warn(elOrNode + " not found") : elOrNode, props, simple);
  };
  var _recordProps = function _recordProps2(elState, props) {
    var getProp = gsap5.getProperty(elState.element, null, "native"), obj = elState.props = {}, i = props.length;
    while (i--) {
      obj[props[i]] = (getProp(props[i]) + "").trim();
    }
    obj.zIndex && (obj.zIndex = parseFloat(obj.zIndex) || 0);
    return elState;
  };
  var _applyProps = function _applyProps2(element, props) {
    var style = element.style || element, p;
    for (p in props) {
      style[p] = props[p];
    }
  };
  var _getID = function _getID2(el) {
    var id = el.getAttribute("data-flip-id");
    id || el.setAttribute("data-flip-id", id = "auto-" + _id++);
    return id;
  };
  var _elementsFromElementStates = function _elementsFromElementStates2(elStates) {
    return elStates.map(function(elState) {
      return elState.element;
    });
  };
  var _handleCallback = function _handleCallback2(callback, elStates, tl3) {
    return callback && elStates.length && tl3.add(callback(_elementsFromElementStates(elStates), tl3, new FlipState(elStates, 0, true)), 0);
  };
  var _fit = function _fit2(fromState, toState, scale, applyProps, fitChild, vars) {
    var element = fromState.element, cache2 = fromState.cache, parent = fromState.parent, x = fromState.x, y = fromState.y, width = toState.width, height = toState.height, scaleX = toState.scaleX, scaleY = toState.scaleY, rotation = toState.rotation, bounds = toState.bounds, styles = vars && _getStyleSaver3 && _getStyleSaver3(element, "transform,width,height"), dimensionState = fromState, _toState$matrix = toState.matrix, e = _toState$matrix.e, f = _toState$matrix.f, deep = fromState.bounds.width !== bounds.width || fromState.bounds.height !== bounds.height || fromState.scaleX !== scaleX || fromState.scaleY !== scaleY || fromState.rotation !== rotation, simple = !deep && fromState.simple && toState.simple && !fitChild, skewX, fromPoint, toPoint, getProp, parentMatrix, matrix, bbox;
    if (simple || !parent) {
      scaleX = scaleY = 1;
      rotation = skewX = 0;
    } else {
      parentMatrix = _getInverseGlobalMatrix(parent);
      matrix = parentMatrix.clone().multiply(toState.ctm ? toState.matrix.clone().multiply(toState.ctm) : toState.matrix);
      rotation = _round7(Math.atan2(matrix.b, matrix.a) * _RAD2DEG3);
      skewX = _round7(Math.atan2(matrix.c, matrix.d) * _RAD2DEG3 + rotation) % 360;
      scaleX = Math.sqrt(Math.pow(matrix.a, 2) + Math.pow(matrix.b, 2));
      scaleY = Math.sqrt(Math.pow(matrix.c, 2) + Math.pow(matrix.d, 2)) * Math.cos(skewX * _DEG2RAD3);
      if (fitChild) {
        fitChild = _toArray3(fitChild)[0];
        getProp = gsap5.getProperty(fitChild);
        bbox = fitChild.getBBox && typeof fitChild.getBBox === "function" && fitChild.getBBox();
        dimensionState = {
          scaleX: getProp("scaleX"),
          scaleY: getProp("scaleY"),
          width: bbox ? bbox.width : Math.ceil(parseFloat(getProp("width", "px"))),
          height: bbox ? bbox.height : parseFloat(getProp("height", "px"))
        };
      }
      cache2.rotation = rotation + "deg";
      cache2.skewX = skewX + "deg";
    }
    if (scale) {
      scaleX *= width === dimensionState.width || !dimensionState.width ? 1 : width / dimensionState.width;
      scaleY *= height === dimensionState.height || !dimensionState.height ? 1 : height / dimensionState.height;
      cache2.scaleX = scaleX;
      cache2.scaleY = scaleY;
    } else {
      width = _closestTenth(width * scaleX / dimensionState.scaleX, 0);
      height = _closestTenth(height * scaleY / dimensionState.scaleY, 0);
      element.style.width = width + "px";
      element.style.height = height + "px";
    }
    applyProps && _applyProps(element, toState.props);
    if (simple || !parent) {
      x += e - fromState.matrix.e;
      y += f - fromState.matrix.f;
    } else if (deep || parent !== toState.parent) {
      cache2.renderTransform(1, cache2);
      matrix = getGlobalMatrix(fitChild || element, false, false, true);
      fromPoint = parentMatrix.apply({
        x: matrix.e,
        y: matrix.f
      });
      toPoint = parentMatrix.apply({
        x: e,
        y: f
      });
      x += toPoint.x - fromPoint.x;
      y += toPoint.y - fromPoint.y;
    } else {
      parentMatrix.e = parentMatrix.f = 0;
      toPoint = parentMatrix.apply({
        x: e - fromState.matrix.e,
        y: f - fromState.matrix.f
      });
      x += toPoint.x;
      y += toPoint.y;
    }
    x = _closestTenth(x, 0.02);
    y = _closestTenth(y, 0.02);
    if (vars && !(vars instanceof ElementState)) {
      styles && styles.revert();
    } else {
      cache2.x = x + "px";
      cache2.y = y + "px";
      cache2.renderTransform(1, cache2);
    }
    if (vars) {
      vars.x = x;
      vars.y = y;
      vars.rotation = rotation;
      vars.skewX = skewX;
      if (scale) {
        vars.scaleX = scaleX;
        vars.scaleY = scaleY;
      } else {
        vars.width = width;
        vars.height = height;
      }
    }
    return vars || cache2;
  };
  var _parseState = function _parseState2(targetsOrState, vars) {
    return targetsOrState instanceof FlipState ? targetsOrState : new FlipState(targetsOrState, vars);
  };
  var _getChangingElState = function _getChangingElState2(toState, fromState, id) {
    var to1 = toState.idLookup[id], to2 = toState.alt[id];
    return to2.isVisible && (!(fromState.getElementState(to2.element) || to2).isVisible || !to1.isVisible) ? to2 : to1;
  };
  var _bodyMetrics = [];
  var _bodyProps = "width,height,overflowX,overflowY".split(",");
  var _bodyLocked;
  var _lockBodyScroll = function _lockBodyScroll2(lock) {
    if (lock !== _bodyLocked) {
      var s = _body4.style, w = _body4.clientWidth === window.outerWidth, h = _body4.clientHeight === window.outerHeight, i = 4;
      if (lock && (w || h)) {
        while (i--) {
          _bodyMetrics[i] = s[_bodyProps[i]];
        }
        if (w) {
          s.width = _body4.clientWidth + "px";
          s.overflowY = "hidden";
        }
        if (h) {
          s.height = _body4.clientHeight + "px";
          s.overflowX = "hidden";
        }
        _bodyLocked = lock;
      } else if (_bodyLocked) {
        while (i--) {
          _bodyMetrics[i] ? s[_bodyProps[i]] = _bodyMetrics[i] : s.removeProperty(_camelToDashed(_bodyProps[i]));
        }
        _bodyLocked = lock;
      }
    }
  };
  var _fromTo = function _fromTo2(fromState, toState, vars, relative) {
    fromState instanceof FlipState && toState instanceof FlipState || console.warn("Not a valid state object.");
    vars = vars || {};
    var _vars = vars, clearProps2 = _vars.clearProps, onEnter = _vars.onEnter, onLeave = _vars.onLeave, absolute = _vars.absolute, absoluteOnLeave = _vars.absoluteOnLeave, custom = _vars.custom, delay = _vars.delay, paused = _vars.paused, repeat = _vars.repeat, repeatDelay = _vars.repeatDelay, yoyo = _vars.yoyo, toggleClass = _vars.toggleClass, nested = _vars.nested, _zIndex = _vars.zIndex, scale = _vars.scale, fade = _vars.fade, stagger = _vars.stagger, spin = _vars.spin, prune = _vars.prune, props = ("props" in vars ? vars : fromState).props, tweenVars = _copy(vars, _reserved), animation = gsap5.timeline({
      delay,
      paused,
      repeat,
      repeatDelay,
      yoyo,
      data: "isFlip"
    }), remainingProps = tweenVars, entering = [], leaving = [], comps = [], swapOutTargets = [], spinNum = spin === true ? 1 : spin || 0, spinFunc = typeof spin === "function" ? spin : function() {
      return spinNum;
    }, interrupted = fromState.interrupted || toState.interrupted, addFunc = animation[relative !== 1 ? "to" : "from"], v, p, endTime, i, el, comp, state, targets, finalStates, fromNode, toNode, run, a, b;
    for (p in toState.idLookup) {
      toNode = !toState.alt[p] ? toState.idLookup[p] : _getChangingElState(toState, fromState, p);
      el = toNode.element;
      fromNode = fromState.idLookup[p];
      fromState.alt[p] && el === fromNode.element && (fromState.alt[p].isVisible || !toNode.isVisible) && (fromNode = fromState.alt[p]);
      if (fromNode) {
        comp = {
          t: el,
          b: fromNode,
          a: toNode,
          sd: fromNode.element === el ? 0 : toNode.isVisible ? 1 : -1
        };
        comps.push(comp);
        if (comp.sd) {
          if (comp.sd < 0) {
            comp.b = toNode;
            comp.a = fromNode;
          }
          interrupted && _recordInlineStyles(comp.b, props ? _memoizedRemoveProps[props] : _removeProps);
          fade && comps.push(comp.swap = {
            t: fromNode.element,
            b: comp.b,
            a: comp.a,
            sd: -comp.sd,
            swap: comp
          });
        }
        el._flip = fromNode.element._flip = _batch ? _batch.timeline : animation;
      } else if (toNode.isVisible) {
        comps.push({
          t: el,
          b: _copy(toNode, {
            isVisible: 1
          }),
          a: toNode,
          sd: 0,
          entering: 1
        });
        el._flip = _batch ? _batch.timeline : animation;
      }
    }
    props && (_memoizedProps[props] || _memoizeProps(props)).forEach(function(p2) {
      return tweenVars[p2] = function(i2) {
        return comps[i2].a.props[p2];
      };
    });
    comps.finalStates = finalStates = [];
    run = function run2() {
      _orderByDOMDepth(comps);
      _lockBodyScroll(true);
      for (i = 0; i < comps.length; i++) {
        comp = comps[i];
        a = comp.a;
        b = comp.b;
        if (prune && !a.isDifferent(b) && !comp.entering) {
          comps.splice(i--, 1);
        } else {
          el = comp.t;
          nested && !(comp.sd < 0) && i && (a.matrix = getGlobalMatrix(el, false, false, true));
          if (b.isVisible && a.isVisible) {
            if (comp.sd < 0) {
              state = new ElementState(el, props, fromState.simple);
              _fit(state, a, scale, 0, 0, state);
              state.matrix = getGlobalMatrix(el, false, false, true);
              state.css = comp.b.css;
              comp.a = a = state;
              fade && (el.style.opacity = interrupted ? b.opacity : a.opacity);
              stagger && swapOutTargets.push(el);
            } else if (comp.sd > 0 && fade) {
              el.style.opacity = interrupted ? a.opacity - b.opacity : "0";
            }
            _fit(a, b, scale, props);
          } else if (b.isVisible !== a.isVisible) {
            if (!b.isVisible) {
              a.isVisible && entering.push(a);
              comps.splice(i--, 1);
            } else if (!a.isVisible) {
              b.css = a.css;
              leaving.push(b);
              comps.splice(i--, 1);
              absolute && nested && _fit(a, b, scale, props);
            }
          }
          if (!scale) {
            el.style.maxWidth = Math.max(a.width, b.width) + "px";
            el.style.maxHeight = Math.max(a.height, b.height) + "px";
            el.style.minWidth = Math.min(a.width, b.width) + "px";
            el.style.minHeight = Math.min(a.height, b.height) + "px";
          }
          nested && toggleClass && el.classList.add(toggleClass);
        }
        finalStates.push(a);
      }
      var classTargets;
      if (toggleClass) {
        classTargets = finalStates.map(function(s) {
          return s.element;
        });
        nested && classTargets.forEach(function(e) {
          return e.classList.remove(toggleClass);
        });
      }
      _lockBodyScroll(false);
      if (scale) {
        tweenVars.scaleX = function(i2) {
          return comps[i2].a.scaleX;
        };
        tweenVars.scaleY = function(i2) {
          return comps[i2].a.scaleY;
        };
      } else {
        tweenVars.width = function(i2) {
          return comps[i2].a.width + "px";
        };
        tweenVars.height = function(i2) {
          return comps[i2].a.height + "px";
        };
        tweenVars.autoRound = vars.autoRound || false;
      }
      tweenVars.x = function(i2) {
        return comps[i2].a.x + "px";
      };
      tweenVars.y = function(i2) {
        return comps[i2].a.y + "px";
      };
      tweenVars.rotation = function(i2) {
        return comps[i2].a.rotation + (spin ? spinFunc(i2, targets[i2], targets) * 360 : 0);
      };
      tweenVars.skewX = function(i2) {
        return comps[i2].a.skewX;
      };
      targets = comps.map(function(c) {
        return c.t;
      });
      if (_zIndex || _zIndex === 0) {
        tweenVars.modifiers = {
          zIndex: function zIndex() {
            return _zIndex;
          }
        };
        tweenVars.zIndex = _zIndex;
        tweenVars.immediateRender = vars.immediateRender !== false;
      }
      fade && (tweenVars.opacity = function(i2) {
        return comps[i2].sd < 0 ? 0 : comps[i2].sd > 0 ? comps[i2].a.opacity : "+=0";
      });
      if (swapOutTargets.length) {
        stagger = gsap5.utils.distribute(stagger);
        var dummyArray = targets.slice(swapOutTargets.length);
        tweenVars.stagger = function(i2, el2) {
          return stagger(~swapOutTargets.indexOf(el2) ? targets.indexOf(comps[i2].swap.t) : i2, el2, dummyArray);
        };
      }
      _callbacks.forEach(function(name) {
        return vars[name] && animation.eventCallback(name, vars[name], vars[name + "Params"]);
      });
      if (custom && targets.length) {
        remainingProps = _copy(tweenVars, _reserved);
        if ("scale" in custom) {
          custom.scaleX = custom.scaleY = custom.scale;
          delete custom.scale;
        }
        for (p in custom) {
          v = _copy(custom[p], _fitReserved);
          v[p] = tweenVars[p];
          !("duration" in v) && "duration" in tweenVars && (v.duration = tweenVars.duration);
          v.stagger = tweenVars.stagger;
          addFunc.call(animation, targets, v, 0);
          delete remainingProps[p];
        }
      }
      if (targets.length || leaving.length || entering.length) {
        toggleClass && animation.add(function() {
          return _toggleClass(classTargets, toggleClass, animation._zTime < 0 ? "remove" : "add");
        }, 0) && !paused && _toggleClass(classTargets, toggleClass, "add");
        targets.length && addFunc.call(animation, targets, remainingProps, 0);
      }
      _handleCallback(onEnter, entering, animation);
      _handleCallback(onLeave, leaving, animation);
      var batchTl = _batch && _batch.timeline;
      if (batchTl) {
        batchTl.add(animation, 0);
        _batch._final.push(function() {
          return _setFinalStates(comps, !clearProps2);
        });
      }
      endTime = animation.duration();
      animation.call(function() {
        var forward = animation.time() >= endTime;
        forward && !batchTl && _setFinalStates(comps, !clearProps2);
        toggleClass && _toggleClass(classTargets, toggleClass, forward ? "remove" : "add");
      });
    };
    absoluteOnLeave && (absolute = comps.filter(function(comp2) {
      return !comp2.sd && !comp2.a.isVisible && comp2.b.isVisible;
    }).map(function(comp2) {
      return comp2.a.element;
    }));
    if (_batch) {
      var _batch$_abs;
      absolute && (_batch$_abs = _batch._abs).push.apply(_batch$_abs, _filterComps(comps, absolute));
      _batch._run.push(run);
    } else {
      absolute && _makeCompsAbsolute(_filterComps(comps, absolute));
      run();
    }
    var anim = _batch ? _batch.timeline : animation;
    anim.revert = function() {
      return _killFlip(anim, 1, 1);
    };
    return anim;
  };
  var _interrupt3 = function _interrupt4(tl3) {
    tl3.vars.onInterrupt && tl3.vars.onInterrupt.apply(tl3, tl3.vars.onInterruptParams || []);
    tl3.getChildren(true, false, true).forEach(_interrupt4);
  };
  var _killFlip = function _killFlip2(tl3, action, force) {
    if (tl3 && tl3.progress() < 1 && (!tl3.paused() || force)) {
      if (action) {
        _interrupt3(tl3);
        action < 2 && tl3.progress(1);
        tl3.kill();
      }
      return true;
    }
  };
  var _createLookup = function _createLookup2(state) {
    var lookup = state.idLookup = {}, alt = state.alt = {}, elStates = state.elementStates, i = elStates.length, elState;
    while (i--) {
      elState = elStates[i];
      lookup[elState.id] ? alt[elState.id] = elState : lookup[elState.id] = elState;
    }
  };
  var FlipState = /* @__PURE__ */ function() {
    function FlipState2(targets, vars, targetsAreElementStates) {
      this.props = vars && vars.props;
      this.simple = !!(vars && vars.simple);
      if (targetsAreElementStates) {
        this.targets = _elementsFromElementStates(targets);
        this.elementStates = targets;
        _createLookup(this);
      } else {
        this.targets = _toArray3(targets);
        var soft = vars && (vars.kill === false || vars.batch && !vars.kill);
        _batch && !soft && _batch._kill.push(this);
        this.update(soft || !!_batch);
      }
    }
    var _proto = FlipState2.prototype;
    _proto.update = function update2(soft) {
      var _this = this;
      this.elementStates = this.targets.map(function(el) {
        return new ElementState(el, _this.props, _this.simple);
      });
      _createLookup(this);
      this.interrupt(soft);
      this.recordInlineStyles();
      return this;
    };
    _proto.clear = function clear2() {
      this.targets.length = this.elementStates.length = 0;
      _createLookup(this);
      return this;
    };
    _proto.fit = function fit(state, scale, nested) {
      var elStatesInOrder = _orderByDOMDepth(this.elementStates.slice(0), false, true), toElStates = (state || this).idLookup, i = 0, fromNode, toNode;
      for (; i < elStatesInOrder.length; i++) {
        fromNode = elStatesInOrder[i];
        nested && (fromNode.matrix = getGlobalMatrix(fromNode.element, false, false, true));
        toNode = toElStates[fromNode.id];
        toNode && _fit(fromNode, toNode, scale, true, 0, fromNode);
        fromNode.matrix = getGlobalMatrix(fromNode.element, false, false, true);
      }
      return this;
    };
    _proto.getProperty = function getProperty2(element, property) {
      var es = this.getElementState(element) || _emptyObj;
      return (property in es ? es : es.props || _emptyObj)[property];
    };
    _proto.add = function add(state) {
      var i = state.targets.length, lookup = this.idLookup, alt = this.alt, index, es, es2;
      while (i--) {
        es = state.elementStates[i];
        es2 = lookup[es.id];
        if (es2 && (es.element === es2.element || alt[es.id] && alt[es.id].element === es.element)) {
          index = this.elementStates.indexOf(es.element === es2.element ? es2 : alt[es.id]);
          this.targets.splice(index, 1, state.targets[i]);
          this.elementStates.splice(index, 1, es);
        } else {
          this.targets.push(state.targets[i]);
          this.elementStates.push(es);
        }
      }
      state.interrupted && (this.interrupted = true);
      state.simple || (this.simple = false);
      _createLookup(this);
      return this;
    };
    _proto.compare = function compare(state) {
      var l1 = state.idLookup, l2 = this.idLookup, unchanged = [], changed = [], enter = [], leave = [], targets = [], a1 = state.alt, a2 = this.alt, place = function place2(s12, s22, el2) {
        return (s12.isVisible !== s22.isVisible ? s12.isVisible ? enter : leave : s12.isVisible ? changed : unchanged).push(el2) && targets.push(el2);
      }, placeIfDoesNotExist = function placeIfDoesNotExist2(s12, s22, el2) {
        return targets.indexOf(el2) < 0 && place(s12, s22, el2);
      }, s1, s2, p, el, s1Alt, s2Alt, c1, c2;
      for (p in l1) {
        s1Alt = a1[p];
        s2Alt = a2[p];
        s1 = !s1Alt ? l1[p] : _getChangingElState(state, this, p);
        el = s1.element;
        s2 = l2[p];
        if (s2Alt) {
          c2 = s2.isVisible || !s2Alt.isVisible && el === s2.element ? s2 : s2Alt;
          c1 = s1Alt && !s1.isVisible && !s1Alt.isVisible && c2.element === s1Alt.element ? s1Alt : s1;
          if (c1.isVisible && c2.isVisible && c1.element !== c2.element) {
            (c1.isDifferent(c2) ? changed : unchanged).push(c1.element, c2.element);
            targets.push(c1.element, c2.element);
          } else {
            place(c1, c2, c1.element);
          }
          s1Alt && c1.element === s1Alt.element && (s1Alt = l1[p]);
          placeIfDoesNotExist(c1.element !== s2.element && s1Alt ? s1Alt : c1, s2, s2.element);
          placeIfDoesNotExist(s1Alt && s1Alt.element === s2Alt.element ? s1Alt : c1, s2Alt, s2Alt.element);
          s1Alt && placeIfDoesNotExist(s1Alt, s2Alt.element === s1Alt.element ? s2Alt : s2, s1Alt.element);
        } else {
          !s2 ? enter.push(el) : !s2.isDifferent(s1) ? unchanged.push(el) : place(s1, s2, el);
          s1Alt && placeIfDoesNotExist(s1Alt, s2, s1Alt.element);
        }
      }
      for (p in l2) {
        if (!l1[p]) {
          leave.push(l2[p].element);
          a2[p] && leave.push(a2[p].element);
        }
      }
      return {
        changed,
        unchanged,
        enter,
        leave
      };
    };
    _proto.recordInlineStyles = function recordInlineStyles() {
      var props = _memoizedRemoveProps[this.props] || _removeProps, i = this.elementStates.length;
      while (i--) {
        _recordInlineStyles(this.elementStates[i], props);
      }
    };
    _proto.interrupt = function interrupt(soft) {
      var _this2 = this;
      var timelines = [];
      this.targets.forEach(function(t) {
        var tl3 = t._flip, foundInProgress = _killFlip(tl3, soft ? 0 : 1);
        soft && foundInProgress && timelines.indexOf(tl3) < 0 && tl3.add(function() {
          return _this2.updateVisibility();
        });
        foundInProgress && timelines.push(tl3);
      });
      !soft && timelines.length && this.updateVisibility();
      this.interrupted || (this.interrupted = !!timelines.length);
    };
    _proto.updateVisibility = function updateVisibility() {
      this.elementStates.forEach(function(es) {
        var b = es.element.getBoundingClientRect();
        es.isVisible = !!(b.width || b.height || b.top || b.left);
        es.uncache = 1;
      });
    };
    _proto.getElementState = function getElementState(element) {
      return this.elementStates[this.targets.indexOf(_getEl(element))];
    };
    _proto.makeAbsolute = function makeAbsolute() {
      return _orderByDOMDepth(this.elementStates.slice(0), true, true).map(_makeAbsolute);
    };
    return FlipState2;
  }();
  var ElementState = /* @__PURE__ */ function() {
    function ElementState2(element, props, simple) {
      this.element = element;
      this.update(props, simple);
    }
    var _proto2 = ElementState2.prototype;
    _proto2.isDifferent = function isDifferent(state) {
      var b1 = this.bounds, b2 = state.bounds;
      return b1.top !== b2.top || b1.left !== b2.left || b1.width !== b2.width || b1.height !== b2.height || !this.matrix.equals(state.matrix) || this.opacity !== state.opacity || this.props && state.props && JSON.stringify(this.props) !== JSON.stringify(state.props);
    };
    _proto2.update = function update2(props, simple) {
      var self = this, element = self.element, getProp = gsap5.getProperty(element), cache2 = gsap5.core.getCache(element), bounds = element.getBoundingClientRect(), bbox = element.getBBox && typeof element.getBBox === "function" && element.nodeName.toLowerCase() !== "svg" && element.getBBox(), m = simple ? new Matrix2D(1, 0, 0, 1, bounds.left + _getDocScrollLeft(), bounds.top + _getDocScrollTop()) : getGlobalMatrix(element, false, false, true);
      cache2.uncache = 1;
      self.getProp = getProp;
      self.element = element;
      self.id = _getID(element);
      self.matrix = m;
      self.cache = cache2;
      self.bounds = bounds;
      self.isVisible = !!(bounds.width || bounds.height || bounds.left || bounds.top);
      self.display = getProp("display");
      self.position = getProp("position");
      self.parent = element.parentNode;
      self.x = getProp("x");
      self.y = getProp("y");
      self.scaleX = cache2.scaleX;
      self.scaleY = cache2.scaleY;
      self.rotation = getProp("rotation");
      self.skewX = getProp("skewX");
      self.opacity = getProp("opacity");
      self.width = bbox ? bbox.width : _closestTenth(getProp("width", "px"), 0.04);
      self.height = bbox ? bbox.height : _closestTenth(getProp("height", "px"), 0.04);
      props && _recordProps(self, _memoizedProps[props] || _memoizeProps(props));
      self.ctm = element.getCTM && element.nodeName.toLowerCase() === "svg" && _getCTM(element).inverse();
      self.simple = simple || _round7(m.a) === 1 && !_round7(m.b) && !_round7(m.c) && _round7(m.d) === 1;
      self.uncache = 0;
    };
    return ElementState2;
  }();
  var FlipAction = /* @__PURE__ */ function() {
    function FlipAction2(vars, batch) {
      this.vars = vars;
      this.batch = batch;
      this.states = [];
      this.timeline = batch.timeline;
    }
    var _proto3 = FlipAction2.prototype;
    _proto3.getStateById = function getStateById(id) {
      var i = this.states.length;
      while (i--) {
        if (this.states[i].idLookup[id]) {
          return this.states[i];
        }
      }
    };
    _proto3.kill = function kill2() {
      this.batch.remove(this);
    };
    return FlipAction2;
  }();
  var FlipBatch = /* @__PURE__ */ function() {
    function FlipBatch2(id) {
      this.id = id;
      this.actions = [];
      this._kill = [];
      this._final = [];
      this._abs = [];
      this._run = [];
      this.data = {};
      this.state = new FlipState();
      this.timeline = gsap5.timeline();
    }
    var _proto4 = FlipBatch2.prototype;
    _proto4.add = function add(config3) {
      var result = this.actions.filter(function(action) {
        return action.vars === config3;
      });
      if (result.length) {
        return result[0];
      }
      result = new FlipAction(typeof config3 === "function" ? {
        animate: config3
      } : config3, this);
      this.actions.push(result);
      return result;
    };
    _proto4.remove = function remove2(action) {
      var i = this.actions.indexOf(action);
      i >= 0 && this.actions.splice(i, 1);
      return this;
    };
    _proto4.getState = function getState(merge) {
      var _this3 = this;
      var prevBatch = _batch, prevAction = _batchAction;
      _batch = this;
      this.state.clear();
      this._kill.length = 0;
      this.actions.forEach(function(action) {
        if (action.vars.getState) {
          action.states.length = 0;
          _batchAction = action;
          action.state = action.vars.getState(action);
        }
        merge && action.states.forEach(function(s) {
          return _this3.state.add(s);
        });
      });
      _batchAction = prevAction;
      _batch = prevBatch;
      this.killConflicts();
      return this;
    };
    _proto4.animate = function animate() {
      var _this4 = this;
      var prevBatch = _batch, tl3 = this.timeline, i = this.actions.length, finalStates, endTime;
      _batch = this;
      tl3.clear();
      this._abs.length = this._final.length = this._run.length = 0;
      this.actions.forEach(function(a) {
        a.vars.animate && a.vars.animate(a);
        var onEnter = a.vars.onEnter, onLeave = a.vars.onLeave, targets = a.targets, s, result;
        if (targets && targets.length && (onEnter || onLeave)) {
          s = new FlipState();
          a.states.forEach(function(state) {
            return s.add(state);
          });
          result = s.compare(Flip.getState(targets));
          result.enter.length && onEnter && onEnter(result.enter);
          result.leave.length && onLeave && onLeave(result.leave);
        }
      });
      _makeCompsAbsolute(this._abs);
      this._run.forEach(function(f) {
        return f();
      });
      endTime = tl3.duration();
      finalStates = this._final.slice(0);
      tl3.add(function() {
        if (endTime <= tl3.time()) {
          finalStates.forEach(function(f) {
            return f();
          });
          _forEachBatch(_this4, "onComplete");
        }
      });
      _batch = prevBatch;
      while (i--) {
        this.actions[i].vars.once && this.actions[i].kill();
      }
      _forEachBatch(this, "onStart");
      tl3.restart();
      return this;
    };
    _proto4.loadState = function loadState(done) {
      done || (done = function done2() {
        return 0;
      });
      var queue = [];
      this.actions.forEach(function(c) {
        if (c.vars.loadState) {
          var i, f = function f2(targets) {
            targets && (c.targets = targets);
            i = queue.indexOf(f2);
            if (~i) {
              queue.splice(i, 1);
              queue.length || done();
            }
          };
          queue.push(f);
          c.vars.loadState(f);
        }
      });
      queue.length || done();
      return this;
    };
    _proto4.setState = function setState() {
      this.actions.forEach(function(c) {
        return c.targets = c.vars.setState && c.vars.setState(c);
      });
      return this;
    };
    _proto4.killConflicts = function killConflicts(soft) {
      this.state.interrupt(soft);
      this._kill.forEach(function(state) {
        return state.interrupt(soft);
      });
      return this;
    };
    _proto4.run = function run(skipGetState, merge) {
      var _this5 = this;
      if (this !== _batch) {
        skipGetState || this.getState(merge);
        this.loadState(function() {
          if (!_this5._killed) {
            _this5.setState();
            _this5.animate();
          }
        });
      }
      return this;
    };
    _proto4.clear = function clear2(stateOnly) {
      this.state.clear();
      stateOnly || (this.actions.length = 0);
    };
    _proto4.getStateById = function getStateById(id) {
      var i = this.actions.length, s;
      while (i--) {
        s = this.actions[i].getStateById(id);
        if (s) {
          return s;
        }
      }
      return this.state.idLookup[id] && this.state;
    };
    _proto4.kill = function kill2() {
      this._killed = 1;
      this.clear();
      delete _batchLookup[this.id];
    };
    return FlipBatch2;
  }();
  var Flip = /* @__PURE__ */ function() {
    function Flip2() {
    }
    Flip2.getState = function getState(targets, vars) {
      var state = _parseState(targets, vars);
      _batchAction && _batchAction.states.push(state);
      vars && vars.batch && Flip2.batch(vars.batch).state.add(state);
      return state;
    };
    Flip2.from = function from(state, vars) {
      vars = vars || {};
      "clearProps" in vars || (vars.clearProps = true);
      return _fromTo(state, _parseState(vars.targets || state.targets, {
        props: vars.props || state.props,
        simple: vars.simple,
        kill: !!vars.kill
      }), vars, -1);
    };
    Flip2.to = function to(state, vars) {
      return _fromTo(state, _parseState(vars.targets || state.targets, {
        props: vars.props || state.props,
        simple: vars.simple,
        kill: !!vars.kill
      }), vars, 1);
    };
    Flip2.fromTo = function fromTo(fromState, toState, vars) {
      return _fromTo(fromState, toState, vars);
    };
    Flip2.fit = function fit(fromEl, toEl, vars) {
      var v = vars ? _copy(vars, _fitReserved) : {}, _ref = vars || v, absolute = _ref.absolute, scale = _ref.scale, getVars = _ref.getVars, props = _ref.props, runBackwards = _ref.runBackwards, onComplete = _ref.onComplete, simple = _ref.simple, fitChild = vars && vars.fitChild && _getEl(vars.fitChild), before = _parseElementState(toEl, props, simple, fromEl), after = _parseElementState(fromEl, 0, simple, before), inlineProps = props ? _memoizedRemoveProps[props] : _removeProps, ctx = gsap5.context();
      props && _applyProps(v, before.props);
      _recordInlineStyles(after, inlineProps);
      if (runBackwards) {
        "immediateRender" in v || (v.immediateRender = true);
        v.onComplete = function() {
          _applyInlineStyles(after);
          onComplete && onComplete.apply(this, arguments);
        };
      }
      absolute && _makeAbsolute(after, before);
      v = _fit(after, before, scale || fitChild, !v.duration && props, fitChild, v.duration || getVars ? v : 0);
      typeof vars === "object" && "zIndex" in vars && (v.zIndex = vars.zIndex);
      ctx && !getVars && ctx.add(function() {
        return function() {
          return _applyInlineStyles(after);
        };
      });
      return getVars ? v : v.duration ? gsap5.to(after.element, v) : null;
    };
    Flip2.makeAbsolute = function makeAbsolute(targetsOrStates, vars) {
      return (targetsOrStates instanceof FlipState ? targetsOrStates : new FlipState(targetsOrStates, vars)).makeAbsolute();
    };
    Flip2.batch = function batch(id) {
      id || (id = "default");
      return _batchLookup[id] || (_batchLookup[id] = new FlipBatch(id));
    };
    Flip2.killFlipsOf = function killFlipsOf(targets, complete) {
      (targets instanceof FlipState ? targets.targets : _toArray3(targets)).forEach(function(t) {
        return t && _killFlip(t._flip, complete !== false ? 1 : 2);
      });
    };
    Flip2.isFlipping = function isFlipping(target) {
      var f = Flip2.getByTarget(target);
      return !!f && f.isActive();
    };
    Flip2.getByTarget = function getByTarget(target) {
      return (_getEl(target) || _emptyObj)._flip;
    };
    Flip2.getElementState = function getElementState(target, props) {
      return new ElementState(_getEl(target), props);
    };
    Flip2.convertCoordinates = function convertCoordinates(fromElement, toElement, point) {
      var m = getGlobalMatrix(toElement, true, true).multiply(getGlobalMatrix(fromElement));
      return point ? m.apply(point) : m;
    };
    Flip2.register = function register3(core) {
      _body4 = typeof document !== "undefined" && document.body;
      if (_body4) {
        gsap5 = core;
        _setDoc(_body4);
        _toArray3 = gsap5.utils.toArray;
        _getStyleSaver3 = gsap5.core.getStyleSaver;
        var snap3 = gsap5.utils.snap(0.1);
        _closestTenth = function _closestTenth2(value, add) {
          return snap3(parseFloat(value) + add);
        };
      }
    };
    return Flip2;
  }();
  Flip.version = "3.13.0";
  typeof window !== "undefined" && window.gsap && window.gsap.registerPlugin(Flip);

  // src/page/contact.js
  gsapWithCSS.registerPlugin(ScrollTrigger2, Flip);
  var heroLetters3;
  var observers = [];
  var contactTriggerClickListener;
  var formSubmitObserver;
  var loadingTimeout;
  function contactHero(mode = "") {
    const formItem = document.querySelector("[contact-form]");
    const orbElement = document.querySelector("[data-orb]");
    const orbOutline3 = document.querySelector('[orb-outline="1"]');
    const orbOutline22 = document.querySelector('[orb-outline="2"]');
    const orbOutlineIn1 = document.querySelector('[orb-out-w="1"]');
    const orbOutlineIn2 = document.querySelector('[orb-out-w="2"]');
    const selector3 = document.querySelectorAll("[split-hero]");
    heroLetters3 = runSplit(selector3, "words, chars");
    document.body.style.cursor = "progress";
    setTimeout(() => {
      window.SScroll.stop();
    }, 50);
    gsapWithCSS.set(formItem, {
      autoAlpha: 0,
      yPercent: "100"
    });
    gsapWithCSS.set(heroLetters3.chars, {
      y: "-101%"
    });
    let duration = "1";
    gsapWithCSS.to(heroLetters3.chars, {
      y: "0%",
      duration,
      ease: "power4.inOut",
      stagger: { each: 0.03, from: "random" }
    });
    if (mode !== "transition") {
      gsapWithCSS.set(orbElement, {
        autoAlpha: 0,
        width: "0em",
        height: "0em",
        minHeight: "auto",
        minWidth: "auto"
      });
      gsapWithCSS.set(orbOutline3, {
        autoAlpha: 0,
        scale: 0
      });
      gsapWithCSS.set(orbOutline22, {
        autoAlpha: 0,
        scale: 0
      });
      gsapWithCSS.to(orbElement, {
        autoAlpha: 1,
        width: "4.3em",
        height: "4.3em",
        duration: 1
      });
      gsapWithCSS.to(orbOutline3, {
        autoAlpha: 1,
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      });
      gsapWithCSS.to(orbOutline22, {
        delay: 0.5,
        autoAlpha: 1,
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      });
      gsapWithCSS.to(orbOutlineIn1, {
        x: "-25vw",
        y: "-25vh",
        scale: 0.6,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 1
      });
      gsapWithCSS.to(orbOutlineIn2, {
        x: "0vw",
        y: "11vh",
        scale: 1,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 1
      });
      gsapWithCSS.to(orbElement, {
        width: "80vh",
        height: "80vh",
        minHeight: "45em",
        minWidth: "45em",
        x: "25vw",
        y: "50vh",
        scale: 2,
        duration: 1,
        ease: "power2.inOut",
        delay: 1
      });
    }
    gsapWithCSS.from('[hh-tb="1"]', {
      delay: 1,
      x: "10em",
      duration,
      ease: "power2.inOut"
    });
    gsapWithCSS.from('[hh-tb="2"]', {
      delay: 1.1,
      x: "-10em",
      duration,
      ease: "power2.inOut",
      onComplete: function() {
        document.body.style.cursor = "auto";
        window.SScroll.start();
      }
    });
    gsapWithCSS.to(formItem, {
      delay: 1,
      autoAlpha: 1,
      yPercent: 0,
      duration,
      stagger: 0.2,
      ease: "power2.inOut",
      onComplete: function() {
        SScroll.resize();
      }
    });
  }
  function updateCheckboxColors(checkboxToggle) {
    let parentBox;
    if (window.innerWidth <= 767) {
      parentBox = checkboxToggle.closest(".checkbox-box");
    } else {
      parentBox = checkboxToggle.closest(".checkbox-box:not(.is-range)");
    }
    if (!parentBox)
      return;
    if (checkboxToggle.classList.contains("w--redirected-checked")) {
      parentBox.setAttribute("data-check", "true");
    } else {
      parentBox.removeAttribute("data-check");
    }
  }
  function observeCheckbox(checkboxToggle) {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.attributeName === "class" && mutation.target === checkboxToggle) {
          updateCheckboxColors(checkboxToggle);
        }
      }
    });
    observer.observe(checkboxToggle, {
      attributes: true,
      attributeFilter: ["class"]
    });
    observers.push(observer);
  }
  function initCheckboxColors() {
    const toggles = document.querySelectorAll(".checkbox-toggle");
    toggles.forEach(observeCheckbox);
  }
  function destroyCheckboxColors() {
    observers.forEach((observer) => observer.disconnect());
    observers = [];
  }
  function manageRequiredCheckboxes() {
    const checkboxGroups = document.querySelectorAll("[checkbox-group]");
    checkboxGroups.forEach((group) => {
      const checkboxesInGroup = group.querySelectorAll(
        'input[type="checkbox"][required]'
      );
      const checkboxChangeHandler = function() {
        if (Array.from(checkboxesInGroup).some((cb) => cb.checked)) {
          checkboxesInGroup.forEach((cb) => cb.removeAttribute("required"));
        } else {
          checkboxesInGroup.forEach(
            (cb) => cb.setAttribute("required", "required")
          );
        }
      };
      checkboxesInGroup.forEach((checkbox) => {
        checkbox.addEventListener("change", checkboxChangeHandler);
      });
    });
  }
  function destroyManageRequiredCheckboxes() {
    const checkboxGroups = document.querySelectorAll("[checkbox-group]");
    checkboxGroups.forEach((group) => {
      const checkboxesInGroup = group.querySelectorAll(
        'input[type="checkbox"][required]'
      );
      const checkboxChangeHandler = function() {
      };
      checkboxesInGroup.forEach((checkbox) => {
        checkbox.removeEventListener("change", checkboxChangeHandler);
      });
    });
  }
  function checkboxesValidForGroup(group) {
    const checkboxesInGroup = group.querySelectorAll(
      'input[type="checkbox"][required]'
    );
    return Array.from(checkboxesInGroup).some((cb) => cb.checked);
  }
  function handleFormSubmission(event2) {
    const checkboxGroups = document.querySelectorAll("[checkbox-group]");
    for (let group of checkboxGroups) {
      if (!checkboxesValidForGroup(group)) {
        event2.preventDefault();
        return;
      }
    }
    const form = event2.target;
    form.dispatchEvent(new Event("formSubmitted", { bubbles: true }));
  }
  function resetCustomElement(customElement) {
    const inputElement = customElement.nextSibling;
    if (inputElement.checked) {
      customElement.classList.add("w--redirected-checked");
    } else {
      customElement.classList.remove("w--redirected-checked");
    }
  }
  function resetFormAfterSubmission(form) {
    const successDiv = form.nextSibling;
    const observer = new MutationObserver(function(mutations) {
      if (form.style.display === "none") {
        setTimeout(() => {
          form.reset();
          document.querySelectorAll(".w-checkbox-input--inputType-custom").forEach(resetCustomElement);
          document.querySelectorAll(".w-form-formradioinput--inputType-custom").forEach(resetCustomElement);
          form.style.display = "block";
          successDiv.style.display = "none";
        }, 5e3);
      }
    });
    observer.observe(form, { attributes: true, attributeFilter: ["style"] });
  }
  function initFormReset() {
    const form = document.querySelector("#wf-form-Contact-Form");
    form.addEventListener("submit", (event2) => {
      handleFormSubmission(event2);
    });
    resetFormAfterSubmission(form);
  }
  function destroyFormReset() {
    const form = document.querySelector("#wf-form-Contact-Form");
    form.removeEventListener("submit", handleFormSubmission);
    form.removeEventListener("formSubmitted", resetFormAfterSubmission);
  }
  function setButtonLoading(triggerEl, loading) {
    const btnTxt = triggerEl.querySelector("[split-text]");
    if (!btnTxt)
      return;
    const splitVisible = btnTxt.querySelector("[data-split-visible]");
    if (loading) {
      if (splitVisible && !splitVisible._origHTML) {
        splitVisible._origHTML = splitVisible.innerHTML;
      }
      if (splitVisible)
        splitVisible.textContent = "Please wait...";
      btnTxt.setAttribute("aria-label", "Please wait...");
      triggerEl.style.pointerEvents = "none";
    } else {
      if (splitVisible && splitVisible._origHTML) {
        splitVisible.innerHTML = splitVisible._origHTML;
        delete splitVisible._origHTML;
      }
      btnTxt.setAttribute("aria-label", "Submit");
      triggerEl.style.pointerEvents = "";
    }
  }
  function setupContactTrigger() {
    const contactTrigger = document.querySelector("[contact-trigger]");
    const contactTarget = document.querySelector("[contact-target]");
    const form = contactTarget.closest("form");
    contactTriggerClickListener = function() {
      if (form && form.checkValidity() && !contactTarget.disabled) {
        setButtonLoading(contactTrigger, true);
        clearTimeout(loadingTimeout);
        loadingTimeout = setTimeout(() => {
          setButtonLoading(contactTrigger, false);
        }, 1e4);
      }
      contactTarget.click();
    };
    contactTrigger.addEventListener("click", contactTriggerClickListener);
    if (form) {
      const formBlock = form.closest(".w-form");
      const errorDiv = formBlock ? formBlock.querySelector(".w-form-fail") : null;
      formSubmitObserver = new MutationObserver(() => {
        if (form.style.display === "none" || errorDiv && errorDiv.style.display === "block") {
          clearTimeout(loadingTimeout);
          setButtonLoading(contactTrigger, false);
        }
      });
      formSubmitObserver.observe(form, {
        attributes: true,
        attributeFilter: ["style"]
      });
      if (errorDiv) {
        formSubmitObserver.observe(errorDiv, {
          attributes: true,
          attributeFilter: ["style", "class"]
        });
      }
    }
  }
  function destroyContactTrigger() {
    const contactTrigger = document.querySelector("[contact-trigger]");
    if (contactTriggerClickListener) {
      contactTrigger.removeEventListener("click", contactTriggerClickListener);
    }
    if (formSubmitObserver) {
      formSubmitObserver.disconnect();
      formSubmitObserver = null;
    }
    clearTimeout(loadingTimeout);
    if (contactTrigger) {
      setButtonLoading(contactTrigger, false);
    }
  }
  var rangeClickListener = [];
  var rangeMouseEnter = [];
  var rangeMouseLeave = [];
  var serviceCheckboxListeners = [];
  var deadlineRadioListeners = [];
  function initRangeSlider() {
    if (window.innerWidth <= 767) {
      return;
    }
    const rangeBoxes = document.querySelectorAll(".checkbox-box.is-range");
    const rangeActive = document.querySelector(".range-active");
    rangeBoxes.forEach(function(box) {
      const clickListener = function() {
        rangeBoxes.forEach(function(innerBox) {
          innerBox.classList.remove("is--active");
        });
        this.classList.add("is--active");
      };
      box.addEventListener("click", clickListener);
      rangeClickListener.push(clickListener);
      const mouseEnterListener = function() {
        const state = Flip.getState(rangeActive);
        this.querySelector(".range-icon-w").appendChild(rangeActive);
        Flip.from(state, {
          duration: 0.4,
          ease: "power1.inOut"
        });
      };
      box.addEventListener("mouseenter", mouseEnterListener);
      rangeMouseEnter.push(mouseEnterListener);
      const mouseLeaveListener = function() {
        const state = Flip.getState(rangeActive);
        const activeBox = document.querySelector(
          ".checkbox-box.is--active .range-icon-w"
        );
        if (activeBox) {
          activeBox.appendChild(rangeActive);
          rangeActive.style.opacity = "1";
          Flip.from(state, {
            duration: 0.4,
            ease: "power1.inOut"
          });
        } else {
          rangeActive.style.opacity = "0";
        }
      };
      box.addEventListener("mouseleave", mouseLeaveListener);
      rangeMouseLeave.push(mouseLeaveListener);
    });
  }
  function destroyRangeSlider() {
    const rangeBoxes = document.querySelectorAll(".checkbox-box.is-range");
    rangeBoxes.forEach(function(box, index) {
      box.removeEventListener("click", rangeClickListener[index]);
      box.removeEventListener("mouseenter", rangeMouseEnter[index]);
      box.removeEventListener("mouseleave", rangeMouseLeave[index]);
    });
    rangeClickListener = [];
    rangeMouseEnter = [];
    rangeMouseLeave = [];
  }
  function updateBudgetRestriction() {
    const serviceCheckboxes = document.querySelectorAll(
      '[data-form-services] input[type="checkbox"]'
    );
    const checkedServices = Array.from(serviceCheckboxes).filter(
      (cb) => cb.checked
    ).length;
    const budget20To30Input = document.querySelector('input[id="20-30K"]');
    const budget20To30Label = budget20To30Input ? budget20To30Input.closest(".checkbox-box.is-range") : null;
    const budgetError = document.querySelector(".budget-error");
    const budgetRangeLow = document.querySelector("[data-range-low]");
    const budgetGrid = document.querySelector(".checkboxes-w.is-grid.is-range");
    if (checkedServices >= 2) {
      if (budgetRangeLow) {
        budgetRangeLow.style.display = "none";
      }
      if (budgetGrid) {
        budgetGrid.style.gridTemplateColumns = "1fr 1fr 1fr";
      }
      if (budgetError) {
        budgetError.style.display = "block";
      }
      if (budget20To30Input && budget20To30Input.checked) {
        budget20To30Input.checked = false;
        const customCheckbox20To30 = budget20To30Label.querySelector(".checkbox-toggle");
        if (customCheckbox20To30) {
          customCheckbox20To30.classList.remove("w--redirected-checked");
        }
        const budget30To50Input = document.querySelector('input[id="30-50K"]');
        const budget30To50Label = budget30To50Input ? budget30To50Input.closest(".checkbox-box.is-range") : null;
        if (budget30To50Input) {
          budget30To50Input.checked = true;
          const customCheckbox30To50 = budget30To50Label ? budget30To50Label.querySelector(".checkbox-toggle") : null;
          if (customCheckbox30To50) {
            customCheckbox30To50.classList.add("w--redirected-checked");
          }
          if (window.innerWidth > 767) {
            const rangeActive = document.querySelector(".range-active");
            if (budget20To30Label) {
              budget20To30Label.classList.remove("is--active");
            }
            if (budget30To50Label) {
              budget30To50Label.classList.add("is--active");
              if (rangeActive) {
                const state = Flip.getState(rangeActive);
                const target30To50IconW = budget30To50Label.querySelector(".range-icon-w");
                if (target30To50IconW) {
                  target30To50IconW.appendChild(rangeActive);
                  rangeActive.style.opacity = "1";
                  Flip.from(state, {
                    duration: 0.4,
                    ease: "power1.inOut"
                  });
                }
              }
            }
          }
        }
      }
    } else {
      if (budgetRangeLow) {
        budgetRangeLow.style.display = "flex";
      }
      if (budgetGrid) {
        budgetGrid.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
      }
      if (budgetError) {
        budgetError.style.display = "none";
      }
    }
  }
  function initServiceBudgetValidation() {
    const serviceCheckboxes = document.querySelectorAll(
      '[data-form-services] input[type="checkbox"]'
    );
    serviceCheckboxes.forEach((checkbox) => {
      const listener = function() {
        updateBudgetRestriction();
      };
      checkbox.addEventListener("change", listener);
      serviceCheckboxListeners.push({ element: checkbox, listener });
    });
    updateBudgetRestriction();
  }
  function destroyServiceBudgetValidation() {
    serviceCheckboxListeners.forEach(({ element, listener }) => {
      element.removeEventListener("change", listener);
    });
    serviceCheckboxListeners = [];
    const budgetRangeLow = document.querySelector("[data-range-low]");
    const budgetGrid = document.querySelector(".checkboxes-w.is-grid.is-range");
    const budgetError = document.querySelector(".budget-error");
    if (budgetRangeLow) {
      budgetRangeLow.style.display = "flex";
    }
    if (budgetGrid) {
      budgetGrid.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
    }
    if (budgetError) {
      budgetError.style.display = "none";
    }
  }
  function updateDeadlineFieldVisibility() {
    const deadlineYesRadio = document.querySelector('input[id="deadlineYes"]');
    const deadlineTextField = document.querySelector(".form-field-w.is-deadline-text");
    if (deadlineYesRadio && deadlineTextField) {
      if (deadlineYesRadio.checked) {
        deadlineTextField.style.display = "flex";
      } else {
        deadlineTextField.style.display = "none";
      }
    }
  }
  function initDeadlineFieldVisibility() {
    const deadlineRadios = document.querySelectorAll(
      'input[name="deadlineGroup"]'
    );
    deadlineRadios.forEach((radio) => {
      const listener = function() {
        updateDeadlineFieldVisibility();
      };
      radio.addEventListener("change", listener);
      deadlineRadioListeners.push({ element: radio, listener });
    });
    updateDeadlineFieldVisibility();
  }
  function destroyDeadlineFieldVisibility() {
    deadlineRadioListeners.forEach(({ element, listener }) => {
      element.removeEventListener("change", listener);
    });
    deadlineRadioListeners = [];
    const deadlineTextField = document.querySelector(".form-field-w.is-deadline-text");
    if (deadlineTextField) {
      deadlineTextField.style.display = "none";
    }
  }
  function initContact() {
    initCheckboxColors();
    setupContactTrigger();
    manageRequiredCheckboxes();
    initFormReset();
    initRangeSlider();
    initServiceBudgetValidation();
    initDeadlineFieldVisibility();
  }
  function destroyContact() {
    destroyManageRequiredCheckboxes();
    destroyContactTrigger();
    destroyCheckboxColors();
    destroyFormReset();
    destroyRangeSlider();
    destroyServiceBudgetValidation();
    destroyDeadlineFieldVisibility();
  }

  // src/page/services.js
  var gridItemClickListeners = [];
  function servicesHero(mode = "") {
    const serviceBlock = document.querySelectorAll(".ser-grid-item");
    const orbElement = document.querySelector("[data-orb]");
    const orbOutline3 = document.querySelector('[orb-outline="1"]');
    const orbOutline22 = document.querySelector('[orb-outline="2"]');
    const orbOutlineIn1 = document.querySelector('[orb-out-w="1"]');
    const orbOutlineIn2 = document.querySelector('[orb-out-w="2"]');
    const selector3 = document.querySelectorAll("[split-hero]");
    heroLetters = runSplit(selector3, "words, chars");
    document.body.style.cursor = "progress";
    setTimeout(() => {
      window.SScroll.stop();
    }, 50);
    gsapWithCSS.set(serviceBlock, {
      autoAlpha: 0,
      yPercent: "100"
    });
    gsapWithCSS.set(heroLetters.chars, {
      y: "-101%"
    });
    let duration = "1";
    gsapWithCSS.to(heroLetters.chars, {
      y: "0%",
      duration,
      ease: "power4.inOut",
      stagger: { each: 0.03, from: "random" }
    });
    if (mode !== "transition") {
      gsapWithCSS.set(orbElement, {
        autoAlpha: 0,
        width: "0em",
        height: "0em",
        minHeight: "auto",
        minWidth: "auto"
      });
      gsapWithCSS.set(orbOutline3, {
        autoAlpha: 0,
        scale: 0
      });
      gsapWithCSS.set(orbOutline22, {
        autoAlpha: 0,
        scale: 0
      });
      gsapWithCSS.to(orbElement, {
        autoAlpha: 1,
        width: "4.3em",
        height: "4.3em",
        duration: 1
      });
      gsapWithCSS.to(orbOutline3, {
        autoAlpha: 1,
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      });
      gsapWithCSS.to(orbOutline22, {
        delay: 0.5,
        autoAlpha: 1,
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      });
      gsapWithCSS.to(orbElement, {
        width: "80vh",
        height: "80vh",
        minHeight: "45em",
        minWidth: "45em",
        x: "-25vw",
        y: "50vh",
        scale: 1.5,
        duration: 1,
        ease: "power2.inOut",
        delay: 1
      });
      gsapWithCSS.to(orbOutlineIn1, {
        x: "0vw",
        y: "-vh",
        scale: 0.6,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 1
      });
      gsapWithCSS.to(orbOutlineIn2, {
        x: "0vw",
        y: "0vh",
        scale: 1,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 1
      });
    }
    gsapWithCSS.from('[hh-tb="1"]', {
      delay: 1,
      x: "10em",
      duration,
      ease: "power2.inOut"
    });
    gsapWithCSS.from('[hh-tb="2"]', {
      delay: 1.1,
      x: "-10em",
      duration,
      ease: "power2.inOut",
      onComplete: function() {
        document.body.style.cursor = "auto";
        window.SScroll.start();
      }
    });
    gsapWithCSS.to(serviceBlock, {
      delay: 1,
      autoAlpha: 1,
      yPercent: 0,
      duration,
      stagger: 0.2,
      ease: "power2.inOut"
    });
  }
  function repositionItems(clickedItem) {
    if (window.innerWidth <= 991) {
      if (clickedItem.classList.contains("is--active")) {
        clickedItem.classList.remove("is--active");
        gsapWithCSS.to(clickedItem, {
          height: "8rem",
          duration: 1,
          ease: "power1.out",
          onComplete: function() {
            SScroll.resize();
          }
        });
        gsapWithCSS.to(clickedItem.querySelector(".ser-vid-ul"), {
          height: "100%",
          transformOrigin: "center right",
          duration: 0.6,
          ease: "power1.in",
          onComplete: function() {
            gsapWithCSS.set(clickedItem.querySelector(".ser-vid-ul"), {
              top: "0%",
              bottom: "auto"
            });
          }
        });
        gsapWithCSS.to(clickedItem.querySelector(".is-ser-title"), {
          scale: 1,
          duration: 0.6,
          ease: "power1.out"
        });
        gsapWithCSS.to(clickedItem.querySelector(".ser-cross"), {
          rotate: "0deg",
          duration: 0.4,
          ease: "power1.out"
        });
        gsapWithCSS.to(clickedItem.querySelector(".ser-info-w"), {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.4,
          ease: "power1.out"
        });
        return;
      } else {
        clickedItem.classList.add("is--active");
        gsapWithCSS.to(clickedItem, {
          height: "auto",
          duration: 1,
          ease: "power1.in",
          onComplete: function() {
            SScroll.resize();
          }
        });
        gsapWithCSS.to(clickedItem.querySelector(".ser-vid-ul"), {
          height: "0%",
          transformOrigin: "center left",
          duration: 0.6,
          ease: "power1.out",
          onComplete: function() {
            gsapWithCSS.set(clickedItem.querySelector(".ser-vid-ul"), {
              top: "auto",
              bottom: "0%"
            });
          }
        });
        gsapWithCSS.to(clickedItem.querySelector(".is-ser-title"), {
          scale: 0.6,
          duration: 0.6,
          ease: "power1.in"
        });
        gsapWithCSS.to(clickedItem.querySelector(".ser-cross"), {
          rotate: "45deg",
          duration: 0.4,
          ease: "power1.in"
        });
        gsapWithCSS.to(clickedItem.querySelector(".ser-info-w"), {
          delay: 0.2,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.6,
          ease: "power1.in",
          overwrite: "auto"
        });
        return;
      }
    }
    const currentState = Flip.getState(".ser-grid-item");
    const slot1 = document.querySelector('[ser-slot="1"]');
    const slot2 = document.querySelector('[ser-slot="2"]');
    const slot3 = document.querySelector('[ser-slot="3"]');
    const slot4 = document.querySelector('[ser-slot="4"]');
    const currSlot1Item = slot1.querySelector(".ser-grid-item");
    const currSlot2Item = slot2.querySelector(".ser-grid-item");
    const currSlot3Item = slot3.querySelector(".ser-grid-item");
    const currSlot4Item = slot4.querySelector(".ser-grid-item");
    if (clickedItem === currSlot1Item) {
      return;
    }
    slot1.appendChild(clickedItem);
    clickedItem.classList.add("is--active");
    if (currSlot1Item) {
      slot4.appendChild(currSlot1Item);
    }
    if (currSlot4Item && clickedItem !== currSlot4Item) {
      slot3.appendChild(currSlot4Item);
    } else if (currSlot3Item && clickedItem !== currSlot3Item) {
      slot3.appendChild(currSlot3Item);
    }
    if (currSlot3Item && clickedItem !== currSlot3Item && clickedItem !== currSlot4Item) {
      slot2.appendChild(currSlot3Item);
    } else if (currSlot2Item && clickedItem !== currSlot2Item) {
      slot2.appendChild(currSlot2Item);
    }
    Flip.from(currentState, {
      duration: 0.6,
      ease: "power1.inOut"
    });
    document.querySelectorAll(".ser-grid-item").forEach((item) => {
      if (item !== slot1.querySelector(".ser-grid-item")) {
        item.classList.remove("is--active");
        gsapWithCSS.to(item.querySelector(".ser-vid-ul"), {
          height: "100%",
          transformOrigin: "center right",
          duration: 0.6,
          ease: "power1.in",
          onComplete: function() {
            gsapWithCSS.set(item.querySelector(".ser-vid-ul"), {
              top: "0%",
              bottom: "auto"
            });
          }
        });
        gsapWithCSS.to(item.querySelector(".is-ser-title"), {
          scale: 1,
          duration: 0.6,
          ease: "power1.out"
        });
        gsapWithCSS.to(item.querySelector(".ser-cross"), {
          rotate: "0deg",
          duration: 0.4,
          ease: "power1.out"
        });
        gsapWithCSS.to(item.querySelector(".ser-info-w"), {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.4,
          ease: "power1.out"
        });
      }
    });
    gsapWithCSS.to(clickedItem.querySelector(".ser-vid-ul"), {
      height: "0%",
      transformOrigin: "center left",
      duration: 0.6,
      ease: "power1.out",
      onComplete: function() {
        gsapWithCSS.set(clickedItem.querySelector(".ser-vid-ul"), {
          top: "auto",
          bottom: "0%"
        });
      }
    });
    gsapWithCSS.to(clickedItem.querySelector(".is-ser-title"), {
      scale: 0.6,
      duration: 0.6,
      ease: "power1.in"
    });
    gsapWithCSS.to(clickedItem.querySelector(".ser-cross"), {
      rotate: "45deg",
      duration: 0.4,
      ease: "power1.in"
    });
    gsapWithCSS.to(clickedItem.querySelector(".ser-info-w"), {
      delay: 0.2,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.6,
      ease: "power1.in",
      overwrite: "auto"
    });
  }
  function initServGrid() {
    if (window.innerWidth <= 991) {
      gsapWithCSS.set(".ser-grid-item:not(.is--active)", {
        height: "8rem"
      });
    }
    gsapWithCSS.set(".ser-grid-item.is--active .is-ser-title", {
      scale: 0.6
    });
    gsapWithCSS.set(".ser-grid-item.is--active .ser-vid-ul", {
      height: "0%"
    });
    gsapWithCSS.set(".ser-grid-item.is--active .ser-info-w", {
      clipPath: "inset(0% 0% 0% 0%)"
    });
    gsapWithCSS.set(".ser-grid-item:not(.is--active) .ser-info-w", {
      clipPath: "inset(0% 0% 100% 0%)"
    });
    gsapWithCSS.set(".ser-grid-item.is--active .ser-cross", {
      rotate: "45deg"
    });
    const gridItems = document.querySelectorAll(".ser-grid-item");
    gridItems.forEach((item) => {
      const clickListener = function() {
        repositionItems(item);
      };
      item.addEventListener("click", clickListener);
      gridItemClickListeners.push(clickListener);
    });
  }
  function destroyServGrid() {
    const gridItems = document.querySelectorAll(".ser-grid-item");
    gridItems.forEach((item, index) => {
      item.removeEventListener("click", gridItemClickListeners[index]);
    });
    gridItemClickListeners = [];
  }
  function initServices() {
    initServGrid();
  }
  function destroyServices() {
    destroyServGrid();
  }

  // node_modules/.pnpm/gsap@3.13.0/node_modules/gsap/DrawSVGPlugin.js
  var gsap6;
  var _toArray4;
  var _doc7;
  var _win6;
  var _isEdge;
  var _coreInitted5;
  var _warned;
  var _getStyleSaver4;
  var _reverting3;
  var _windowExists7 = function _windowExists8() {
    return typeof window !== "undefined";
  };
  var _getGSAP7 = function _getGSAP8() {
    return gsap6 || _windowExists7() && (gsap6 = window.gsap) && gsap6.registerPlugin && gsap6;
  };
  var _numExp3 = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi;
  var _types = {
    rect: ["width", "height"],
    circle: ["r", "r"],
    ellipse: ["rx", "ry"],
    line: ["x2", "y2"]
  };
  var _round9 = function _round10(value) {
    return Math.round(value * 1e4) / 1e4;
  };
  var _parseNum = function _parseNum2(value) {
    return parseFloat(value) || 0;
  };
  var _parseSingleVal = function _parseSingleVal2(value, length) {
    var num = _parseNum(value);
    return ~value.indexOf("%") ? num / 100 * length : num;
  };
  var _getAttributeAsNumber = function _getAttributeAsNumber2(target, attr) {
    return _parseNum(target.getAttribute(attr));
  };
  var _sqrt4 = Math.sqrt;
  var _getDistance = function _getDistance2(x1, y1, x2, y2, scaleX, scaleY) {
    return _sqrt4(Math.pow((_parseNum(x2) - _parseNum(x1)) * scaleX, 2) + Math.pow((_parseNum(y2) - _parseNum(y1)) * scaleY, 2));
  };
  var _warn3 = function _warn4(message) {
    return console.warn(message);
  };
  var _hasNonScalingStroke = function _hasNonScalingStroke2(target) {
    return target.getAttribute("vector-effect") === "non-scaling-stroke";
  };
  var _bonusValidated2 = 1;
  var _parse = function _parse2(value, length, defaultStart) {
    var i = value.indexOf(" "), s, e;
    if (i < 0) {
      s = defaultStart !== void 0 ? defaultStart + "" : value;
      e = value;
    } else {
      s = value.substr(0, i);
      e = value.substr(i + 1);
    }
    s = _parseSingleVal(s, length);
    e = _parseSingleVal(e, length);
    return s > e ? [e, s] : [s, e];
  };
  var _getLength = function _getLength2(target) {
    target = _toArray4(target)[0];
    if (!target) {
      return 0;
    }
    var type = target.tagName.toLowerCase(), style = target.style, scaleX = 1, scaleY = 1, length, bbox, points, prevPoint, i, rx, ry;
    if (_hasNonScalingStroke(target)) {
      scaleY = target.getScreenCTM();
      scaleX = _sqrt4(scaleY.a * scaleY.a + scaleY.b * scaleY.b);
      scaleY = _sqrt4(scaleY.d * scaleY.d + scaleY.c * scaleY.c);
    }
    try {
      bbox = target.getBBox();
    } catch (e) {
      _warn3("Some browsers won't measure invisible elements (like display:none or masks inside defs).");
    }
    var _ref = bbox || {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    }, x = _ref.x, y = _ref.y, width = _ref.width, height = _ref.height;
    if ((!bbox || !width && !height) && _types[type]) {
      width = _getAttributeAsNumber(target, _types[type][0]);
      height = _getAttributeAsNumber(target, _types[type][1]);
      if (type !== "rect" && type !== "line") {
        width *= 2;
        height *= 2;
      }
      if (type === "line") {
        x = _getAttributeAsNumber(target, "x1");
        y = _getAttributeAsNumber(target, "y1");
        width = Math.abs(width - x);
        height = Math.abs(height - y);
      }
    }
    if (type === "path") {
      prevPoint = style.strokeDasharray;
      style.strokeDasharray = "none";
      length = target.getTotalLength() || 0;
      _round9(scaleX) !== _round9(scaleY) && !_warned && (_warned = 1) && _warn3("Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled.");
      length *= (scaleX + scaleY) / 2;
      style.strokeDasharray = prevPoint;
    } else if (type === "rect") {
      length = width * 2 * scaleX + height * 2 * scaleY;
    } else if (type === "line") {
      length = _getDistance(x, y, x + width, y + height, scaleX, scaleY);
    } else if (type === "polyline" || type === "polygon") {
      points = target.getAttribute("points").match(_numExp3) || [];
      type === "polygon" && points.push(points[0], points[1]);
      length = 0;
      for (i = 2; i < points.length; i += 2) {
        length += _getDistance(points[i - 2], points[i - 1], points[i], points[i + 1], scaleX, scaleY) || 0;
      }
    } else if (type === "circle" || type === "ellipse") {
      rx = width / 2 * scaleX;
      ry = height / 2 * scaleY;
      length = Math.PI * (3 * (rx + ry) - _sqrt4((3 * rx + ry) * (rx + 3 * ry)));
    }
    return length || 0;
  };
  var _getPosition = function _getPosition2(target, length) {
    target = _toArray4(target)[0];
    if (!target) {
      return [0, 0];
    }
    length || (length = _getLength(target) + 1);
    var cs = _win6.getComputedStyle(target), dash = cs.strokeDasharray || "", offset = _parseNum(cs.strokeDashoffset), i = dash.indexOf(",");
    i < 0 && (i = dash.indexOf(" "));
    dash = i < 0 ? length : _parseNum(dash.substr(0, i));
    dash > length && (dash = length);
    return [-offset || 0, dash - offset || 0];
  };
  var _initCore7 = function _initCore8() {
    if (_windowExists7()) {
      _doc7 = document;
      _win6 = window;
      _coreInitted5 = gsap6 = _getGSAP7();
      _toArray4 = gsap6.utils.toArray;
      _getStyleSaver4 = gsap6.core.getStyleSaver;
      _reverting3 = gsap6.core.reverting || function() {
      };
      _isEdge = ((_win6.navigator || {}).userAgent || "").indexOf("Edge") !== -1;
    }
  };
  var DrawSVGPlugin = {
    version: "3.13.0",
    name: "drawSVG",
    register: function register2(core) {
      gsap6 = core;
      _initCore7();
    },
    init: function init5(target, value, tween, index, targets) {
      if (!target.getBBox) {
        return false;
      }
      _coreInitted5 || _initCore7();
      var length = _getLength(target), start, end, cs;
      this.styles = _getStyleSaver4 && _getStyleSaver4(target, "strokeDashoffset,strokeDasharray,strokeMiterlimit");
      this.tween = tween;
      this._style = target.style;
      this._target = target;
      if (value + "" === "true") {
        value = "0 100%";
      } else if (!value) {
        value = "0 0";
      } else if ((value + "").indexOf(" ") === -1) {
        value = "0 " + value;
      }
      start = _getPosition(target, length);
      end = _parse(value, length, start[0]);
      this._length = _round9(length);
      this._dash = _round9(start[1] - start[0]);
      this._offset = _round9(-start[0]);
      this._dashPT = this.add(this, "_dash", this._dash, _round9(end[1] - end[0]), 0, 0, 0, 0, 0, 1);
      this._offsetPT = this.add(this, "_offset", this._offset, _round9(-end[0]), 0, 0, 0, 0, 0, 1);
      if (_isEdge) {
        cs = _win6.getComputedStyle(target);
        if (cs.strokeLinecap !== cs.strokeLinejoin) {
          end = _parseNum(cs.strokeMiterlimit);
          this.add(target.style, "strokeMiterlimit", end, end + 0.01);
        }
      }
      this._live = _hasNonScalingStroke(target) || ~(value + "").indexOf("live");
      this._nowrap = ~(value + "").indexOf("nowrap");
      this._props.push("drawSVG");
      return _bonusValidated2;
    },
    render: function render4(ratio, data) {
      if (data.tween._time || !_reverting3()) {
        var pt = data._pt, style = data._style, length, lengthRatio, dash, offset;
        if (pt) {
          if (data._live) {
            length = _getLength(data._target);
            if (length !== data._length) {
              lengthRatio = length / data._length;
              data._length = length;
              if (data._offsetPT) {
                data._offsetPT.s *= lengthRatio;
                data._offsetPT.c *= lengthRatio;
              }
              if (data._dashPT) {
                data._dashPT.s *= lengthRatio;
                data._dashPT.c *= lengthRatio;
              } else {
                data._dash *= lengthRatio;
              }
            }
          }
          while (pt) {
            pt.r(ratio, pt.d);
            pt = pt._next;
          }
          dash = data._dash || ratio && ratio !== 1 && 1e-4 || 0;
          length = data._length - dash + 0.1;
          offset = data._offset;
          dash && offset && dash + Math.abs(offset % data._length) > data._length - 0.05 && (offset += offset < 0 ? 5e-3 : -5e-3) && (length += 5e-3);
          style.strokeDashoffset = dash ? offset : offset + 1e-3;
          style.strokeDasharray = length < 0.1 ? "none" : dash ? dash + "px," + (data._nowrap ? 999999 : length) + "px" : "0px, 999999px";
        }
      } else {
        data.styles.revert();
      }
    },
    getLength: _getLength,
    getPosition: _getPosition
  };
  _getGSAP7() && gsap6.registerPlugin(DrawSVGPlugin);

  // src/page/about.js
  gsapWithCSS.registerPlugin(ScrollTrigger2, DrawSVGPlugin);
  var teamClicks = [];
  var aboutLineST;
  var stickyMenuRowListeners = [];
  var heroLetters4;
  var mutationObserver;
  var lastScrollY2 = 0;
  var request2;
  var labels;
  var rotator;
  var totalLabels;
  var rotationIncrement;
  var rotatorRotation = 0;
  var rafID;
  function aboutHero(mode = "") {
    const orbElement = document.querySelector("[data-orb]");
    const orbOutline3 = document.querySelector('[orb-outline="1"]');
    const orbOutline22 = document.querySelector('[orb-outline="2"]');
    const orbOutlineIn1 = document.querySelector('[orb-out-w="1"]');
    const orbOutlineIn2 = document.querySelector('[orb-out-w="2"]');
    const selector3 = document.querySelectorAll("[split-hero]");
    heroLetters4 = runSplit(selector3, "chars");
    document.body.style.cursor = "progress";
    setTimeout(() => {
      window.SScroll.stop();
    }, 50);
    if (!window.isTabletOrBelow) {
      gsapWithCSS.set(heroLetters4.chars, {
        y: "-101%"
      });
    } else {
      gsapWithCSS.set(heroLetters4.chars, {
        y: "-101%",
        autoAlpha: 0
      });
    }
    gsapWithCSS.set(".abt-sticky-menu-row", {
      y: "101%"
    });
    gsapWithCSS.set("[abt-intro] .line", {
      autoAlpha: 0,
      yPercent: -101
    });
    let duration = "1";
    if (!window.isTabletOrBelow) {
      gsapWithCSS.to(heroLetters4.chars, {
        y: "0%",
        duration,
        ease: "power4.inOut",
        stagger: { each: 0.03, from: "random" }
      });
    } else {
      gsapWithCSS.to(heroLetters4.chars, {
        y: "0%",
        autoAlpha: 1,
        duration,
        ease: "power4.inOut",
        stagger: { each: 0.03, from: "random" }
      });
    }
    if (mode !== "transition") {
      gsapWithCSS.set(orbElement, {
        autoAlpha: 0,
        width: "0em",
        height: "0em",
        minHeight: "auto",
        minWidth: "auto"
      });
      gsapWithCSS.set(orbOutline3, {
        autoAlpha: 0,
        scale: 0
      });
      gsapWithCSS.set(orbOutline22, {
        autoAlpha: 0,
        scale: 0
      });
      gsapWithCSS.to(orbElement, {
        autoAlpha: 1,
        width: "4.3em",
        height: "4.3em",
        duration: 1
      });
      gsapWithCSS.to(orbOutline3, {
        autoAlpha: 1,
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      });
      gsapWithCSS.to(orbOutline22, {
        delay: 0.2,
        autoAlpha: 1,
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      });
      if (!window.isTabletOrBelow) {
        gsapWithCSS.to(orbElement, {
          x: "25vw",
          y: "0vh",
          width: "80vh",
          height: "80vh",
          minHeight: "45em",
          minWidth: "45em",
          scale: 1,
          duration: 1,
          ease: "power2.inOut",
          delay: 1
        });
        gsapWithCSS.to(orbOutlineIn1, {
          x: "-25vw",
          y: "0vh",
          scale: 0.6,
          duration: 1.5,
          ease: "power2.inOut",
          delay: 1
        });
        gsapWithCSS.to(orbOutlineIn2, {
          x: "0vw",
          y: "0vh",
          scale: 1,
          duration: 1.5,
          ease: "power2.inOut",
          delay: 1
        });
      } else {
        gsapWithCSS.to(orbElement, {
          x: "25vw",
          y: "0vh",
          width: "90vw",
          height: "90vw",
          scale: 1,
          duration: 1,
          ease: "power2.inOut",
          delay: 1
        });
        gsapWithCSS.to(orbOutlineIn1, {
          x: "-25vw",
          y: "0vh",
          scale: 0.4,
          duration: 1.3,
          ease: "power2.inOut",
          delay: 1
        });
        gsapWithCSS.to(orbOutlineIn2, {
          x: "0vw",
          y: "0vh",
          scale: 0.8,
          duration: 1.3,
          ease: "power2.inOut",
          delay: 1
        });
      }
    }
    gsapWithCSS.from('[hh-tb="1"]', {
      delay: 1,
      x: "5em",
      duration,
      ease: "power2.inOut"
    });
    gsapWithCSS.from('[hh-tb="2"]', {
      delay: 1.1,
      x: "-5em",
      duration,
      ease: "power2.inOut",
      onComplete: function() {
        document.body.style.cursor = "auto";
        window.SScroll.start();
        if (!window.isTabletOrBelow) {
          orbAboutPath();
        }
      }
    });
    gsapWithCSS.to(".abt-sticky-menu-row", {
      delay: 1,
      y: "0%",
      stagger: 0.1,
      duration: 1
    });
    gsapWithCSS.to("[abt-intro] .line", {
      delay: 1,
      autoAlpha: 1,
      yPercent: 0,
      duration: 1,
      ease: "power4.inOut",
      stagger: { each: 0.05, from: "random" }
    });
  }
  function orbAboutPath() {
    const orbObj = document.querySelector("[data-orb]");
    const orbOutline3 = document.querySelector('[orb-out-w="1"]');
    const orbOutline22 = document.querySelector('[orb-out-w="2"]');
    tl = gsapWithCSS.timeline({
      scrollTrigger: {
        trigger: ".page-w",
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });
    tlOut1 = gsapWithCSS.timeline({
      scrollTrigger: {
        trigger: ".page-w",
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });
    tlOut2 = gsapWithCSS.timeline({
      scrollTrigger: {
        trigger: ".page-w",
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });
    tl.to(orbObj, { x: "50vw", scale: 2, duration: 0.2 }).to(orbObj, {
      x: "100vw",
      scale: 0.01,
      duration: 0.6,
      ease: "power2.inOut"
    }).to(orbObj, { x: "25vw", y: "0vh", scale: 1.5, duration: 0.1 }).to(orbObj, { x: "25vw", y: "-50vh", scale: 1.5, duration: 0.1 });
    tlOut1.to(orbOutline3, { x: "-50vw", scale: 1, duration: 0.2 }).to(orbOutline3, {
      x: "-100vw",
      scale: 0.6,
      duration: 0.6,
      ease: "power2.inOut"
    }).to(orbOutline3, { x: "0vw", y: "0vh", scale: 1, duration: 0.1 }).to(orbOutline3, {
      x: "10vw",
      y: "0vh",
      scale: 1,
      duration: 0.1,
      ease: "power2.inOut"
    });
    tlOut2.to(orbOutline22, { x: "-25vw", scale: 0.6, duration: 0.2 }).to(orbOutline22, {
      x: "-100vw",
      y: "-100vh",
      scale: 0,
      duration: 0.6,
      ease: "power2.inOut"
    }).to(orbOutline22, {
      x: "0vw",
      y: "0vh",
      scale: 1.5,
      duration: 0.1,
      ease: "power2.out"
    }).to(orbOutline22, { x: "-25vw", y: "0vh", scale: 1.5, duration: 0.1 });
  }
  function destroyOrbAboutPath() {
    if (tl)
      tl.kill();
    if (tlOut1)
      tlOut1.kill();
    if (tlOut2)
      tlOut2.kill();
  }
  function updateCurrentRowOpacity() {
    gsapWithCSS.set(".abt-sticky-menu-row", { opacity: 0.6 });
    document.querySelectorAll(".abt-link.w--current").forEach((link) => {
      const siblingRow = link.previousElementSibling;
      if (siblingRow && siblingRow.classList.contains("abt-sticky-menu-row")) {
        gsapWithCSS.to(siblingRow, { opacity: 1, duration: 0.3 });
      }
    });
  }
  function initAboutStickyMenu() {
    updateCurrentRowOpacity();
    document.querySelectorAll(".abt-sticky-menu-row").forEach((row) => {
      const enterHandler = function() {
        gsapWithCSS.to(row, { opacity: 1, duration: 0.3 });
        gsapWithCSS.to(".abt-sticky-menu-row:not(:hover)", {
          opacity: 0.6,
          duration: 0.3
        });
      };
      const leaveHandler = function() {
        updateCurrentRowOpacity();
      };
      row.addEventListener("mouseenter", enterHandler);
      row.addEventListener("mouseleave", leaveHandler);
      stickyMenuRowListeners.push({ element: row, enterHandler, leaveHandler });
    });
    mutationObserver = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          updateCurrentRowOpacity();
        }
      }
    });
    document.querySelectorAll(".abt-link").forEach((link) => {
      mutationObserver.observe(link, {
        attributes: true,
        attributeFilter: ["class"]
      });
    });
  }
  function destroyAboutStickyMenu() {
    gsapWithCSS.killTweensOf(".abt-sticky-menu-row");
    stickyMenuRowListeners.forEach((item) => {
      item.element.removeEventListener("mouseenter", item.enterHandler);
      item.element.removeEventListener("mouseleave", item.leaveHandler);
    });
    stickyMenuRowListeners = [];
    mutationObserver.disconnect();
  }
  function initAboutTeam() {
    gsapWithCSS.set(".team-info-trans", { y: "-101%" });
    gsapWithCSS.set(".team-img-overlay", { autoAlpha: 0.4 });
    document.querySelectorAll(".team-item-w").forEach((item) => {
      const listener = (event2) => {
        const target = event2.currentTarget;
        const abtTxt = target.querySelector(".abt-txt");
        const teamRoleW = target.querySelector(".team-role-w");
        const translationValue = teamRoleW.offsetWidth - abtTxt.offsetWidth;
        if (target.classList.contains("is--active")) {
          gsapWithCSS.to(target.querySelector(".team-img-overlay"), {
            autoAlpha: 0.4,
            duration: 0.6,
            ease: "power2.inOut"
          });
          gsapWithCSS.to(target.querySelector(".team-info-trans"), {
            y: "-101%",
            duration: 0.6,
            ease: "power2.inOut"
          });
          gsapWithCSS.to(abtTxt, {
            x: 0,
            duration: 0.6,
            ease: "power2.inOut"
          });
          target.classList.remove("is--active");
        } else {
          target.classList.add("is--active");
          gsapWithCSS.to(target.querySelector(".team-img-overlay"), {
            autoAlpha: 0.8,
            duration: 0.6,
            ease: "power2.inOut"
          });
          gsapWithCSS.to(target.querySelector(".team-info-trans"), {
            y: "0%",
            duration: 0.6,
            ease: "power2.inOut"
          });
          gsapWithCSS.to(abtTxt, {
            x: -translationValue,
            duration: 0.6,
            ease: "power2.inOut"
          });
        }
      };
      item.addEventListener("click", listener);
      teamClicks.push({ item, listener });
    });
  }
  function destroyAboutTeam() {
    teamClicks.forEach(({ item, listener }) => {
      item.removeEventListener("click", listener);
    });
    teamClicks = [];
  }
  function initAboutLine() {
    const path = document.querySelector("[about-line]");
    const section = document.querySelector("[about-line-section]");
    gsapWithCSS.set(path, {
      drawSVG: "100% 100%"
    });
    aboutLineST = gsapWithCSS.to(path, {
      drawSVG: "0% 100%",
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        end: "bottom bottom",
        scrub: true
      }
    });
  }
  function destroyAboutLine() {
    if (aboutLineST) {
      aboutLineST.kill();
    }
  }
  function initAboutRotator() {
    const textRotator = document.querySelector(".abt-anim-text-rotator");
    rotatorRotation = gsapWithCSS.to(textRotator, {
      rotation: 360,
      duration: 100,
      repeat: -1,
      ease: "none"
    });
    ScrollTrigger2.scrollerProxy(window, {
      scrollTop(value) {
        return arguments.length ? window.scrollTo(0, value) : window.scrollY;
      }
    });
    const updateVelocity = () => {
      let velocity = window.scrollY - lastScrollY2;
      lastScrollY2 = window.scrollY;
      const speedMultiplier = 3;
      rotatorRotation.timeScale(
        Math.min(Math.max(2, Math.abs(velocity) * speedMultiplier), 10)
      );
      request2 = requestAnimationFrame(updateVelocity);
    };
    request2 = requestAnimationFrame(updateVelocity);
  }
  function destroyAboutRotator() {
    if (rotatorRotation) {
      rotatorRotation.kill();
    }
    if (request2) {
      cancelAnimationFrame(request2);
    }
    const textRotator = document.querySelector(".abt-anim-text-rotator");
    if (textRotator) {
      gsapWithCSS.set(textRotator, { rotation: 0, clearProps: "all" });
    }
  }
  function initAboutRotateMonitor() {
    labels = document.querySelectorAll(".abt-anim-label");
    rotator = document.querySelector(".abt-anim-text-rotator");
    totalLabels = labels.length;
    rotationIncrement = 360 / totalLabels;
    labels.forEach((label, index) => {
      const rotationDegree = index * rotationIncrement;
      label.style.transform = `rotate(${rotationDegree}deg)`;
      if (rotationDegree > 90 && rotationDegree < 270) {
        const textElement = label.querySelector(".text-small");
        textElement.classList.add("flip-text");
      }
    });
    function updateLabels() {
      const currentRotation = rotatorRotation.progress() * 360;
      labels.forEach((label, index) => {
        const baseRotation = index * (360 / labels.length);
        const totalRotation = (baseRotation + currentRotation) % 360;
        const textElement = label.querySelector(".text-small");
        if (totalRotation > 120 && totalRotation < 300 && !textElement.classList.contains("flip-text")) {
          textElement.classList.add("flip-text");
        } else if ((totalRotation <= 120 || totalRotation >= 300) && textElement.classList.contains("flip-text")) {
          textElement.classList.remove("flip-text");
        }
      });
      rafID = requestAnimationFrame(updateLabels);
    }
    updateLabels();
  }
  function destroyAboutRotateMonitor() {
    if (rafID) {
      cancelAnimationFrame(rafID);
    }
    if (labels) {
      labels.forEach((label) => {
        label.style.transform = "";
        const textElement = label.querySelector(".text-small");
        textElement.classList.remove("flip-text");
      });
    }
  }
  function initAbout() {
    initAboutTeam();
    if (!window.isTabletOrBelow) {
      initAboutLine();
    }
    initAboutStickyMenu();
    initAboutRotator();
    initAboutRotateMonitor();
  }
  function destroyAbout() {
    destroyAboutTeam();
    destroyAboutLine();
    destroyAboutStickyMenu();
    destroyAboutRotator();
    destroyAboutRotateMonitor();
    destroyOrbAboutPath();
    gsapWithCSS.killTweensOf('[hh-tb="2"]');
  }

  // src/page/careers.js
  gsapWithCSS.registerPlugin(ScrollTrigger2);
  function careersHero(mode = "") {
    const orbElement = document.querySelector("[data-orb]");
    const orbOutline3 = document.querySelector('[orb-outline="1"]');
    const orbOutline22 = document.querySelector('[orb-outline="2"]');
    const orbOutlineIn1 = document.querySelector('[orb-out-w="1"]');
    const orbOutlineIn2 = document.querySelector('[orb-out-w="2"]');
    const selector3 = document.querySelectorAll("[split-hero]");
    heroLetters = runSplit(selector3, "words, chars");
    document.body.style.cursor = "progress";
    setTimeout(() => {
      window.SScroll.stop();
    }, 50);
    gsapWithCSS.set(heroLetters.chars, {
      y: "-101%"
    });
    let duration = "1";
    gsapWithCSS.to(heroLetters.chars, {
      y: "0%",
      duration,
      ease: "power4.inOut",
      stagger: { each: 0.03, from: "random" }
    });
    if (mode !== "transition") {
      gsapWithCSS.set(orbElement, {
        autoAlpha: 0,
        width: "0em",
        height: "0em",
        minHeight: "auto",
        minWidth: "auto"
      });
      gsapWithCSS.set(orbOutline3, {
        autoAlpha: 0,
        scale: 0
      });
      gsapWithCSS.set(orbOutline22, {
        autoAlpha: 0,
        scale: 0
      });
      gsapWithCSS.to(orbElement, {
        autoAlpha: 1,
        width: "4.3em",
        height: "4.3em",
        duration: 1
      });
      gsapWithCSS.to(orbOutline3, {
        autoAlpha: 1,
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      });
      gsapWithCSS.to(orbOutline22, {
        delay: 0.2,
        autoAlpha: 1,
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      });
      gsapWithCSS.to(orbElement, {
        x: "25vw",
        y: "0vh",
        width: "80vh",
        height: "80vh",
        minHeight: "45em",
        minWidth: "45em",
        scale: 2,
        duration: 1,
        ease: "power2.inOut",
        delay: 1
      });
      gsapWithCSS.to(orbOutlineIn1, {
        x: "-25vw",
        y: "0vh",
        scale: 0.6,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 1
      });
      gsapWithCSS.to(orbOutlineIn2, {
        x: "0vw",
        y: "0vh",
        scale: 1,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 1
      });
    }
    gsapWithCSS.from('[hh-tb="1"]', {
      delay: 1,
      x: "5em",
      duration,
      ease: "power2.inOut",
      onComplete: function() {
        document.body.style.cursor = "auto";
        window.SScroll.start();
      }
    });
    gsapWithCSS.from('[hh-tb="2"]', {
      delay: 1.1,
      x: "-5em",
      duration,
      ease: "power2.inOut"
    });
  }
  function initCareerCards() {
    const careerCards = document.querySelectorAll("[data-career-item]");
    gsapWithCSS.set(careerCards, {
      y: "4rem",
      autoAlpha: 0
    });
    gsapWithCSS.to(careerCards, {
      y: "0rem",
      duration: 1,
      ease: "power2.inOut",
      autoAlpha: 1,
      stagger: 0.1
    });
  }
  function initCareers() {
    initCareerCards();
  }

  // src/page/careers-article.js
  gsapWithCSS.registerPlugin(ScrollTrigger2);
  var contactTriggerClickListener2;
  var formSubmitObserver2;
  var loadingTimeout2;
  function careersArticleHero(mode = "") {
    const orbElement = document.querySelector("[data-orb]");
    const orbOutline3 = document.querySelector('[orb-outline="1"]');
    const orbOutline22 = document.querySelector('[orb-outline="2"]');
    const orbOutlineIn1 = document.querySelector('[orb-out-w="1"]');
    const orbOutlineIn2 = document.querySelector('[orb-out-w="2"]');
    document.body.style.cursor = "progress";
    setTimeout(() => {
      window.SScroll.stop();
    }, 50);
    let duration = 1;
    initCareerCard();
    if (mode !== "transition") {
      gsapWithCSS.set(orbElement, {
        autoAlpha: 0,
        width: "0em",
        height: "0em",
        minHeight: "auto",
        minWidth: "auto"
      });
      gsapWithCSS.set(orbOutline3, {
        autoAlpha: 0,
        scale: 0
      });
      gsapWithCSS.set(orbOutline22, {
        autoAlpha: 0,
        scale: 0
      });
      gsapWithCSS.to(orbElement, {
        autoAlpha: 1,
        width: "4.3em",
        height: "4.3em",
        duration: 1
      });
      gsapWithCSS.to(orbOutline3, {
        autoAlpha: 1,
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      });
      gsapWithCSS.to(orbOutline22, {
        delay: 0.2,
        autoAlpha: 1,
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      });
      gsapWithCSS.to(orbElement, {
        x: "25vw",
        y: "0vh",
        width: "80vh",
        height: "80vh",
        minHeight: "45em",
        minWidth: "45em",
        scale: 2,
        duration: 1,
        ease: "power2.inOut",
        delay: 1
      });
      gsapWithCSS.to(orbOutlineIn1, {
        x: "-25vw",
        y: "0vh",
        scale: 0.6,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 1
      });
      gsapWithCSS.to(orbOutlineIn2, {
        x: "0vw",
        y: "0vh",
        scale: 1,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 1
      });
    }
    gsapWithCSS.delayedCall(duration, () => {
      document.body.style.cursor = "auto";
      window.SScroll.start();
    });
  }
  function initCareerCard() {
    const careerCard = document.querySelectorAll("[data-career-card]");
    const carBack = document.querySelector(".car-back-w");
    gsapWithCSS.set(careerCard, {
      y: "4rem",
      autoAlpha: 0
    });
    gsapWithCSS.set(carBack, {
      y: "4rem",
      autoAlpha: 0
    });
    gsapWithCSS.to(carBack, {
      y: "0rem",
      duration: 1,
      ease: "power2.inOut",
      autoAlpha: 1
    });
    gsapWithCSS.to(careerCard, {
      y: "0rem",
      duration: 1,
      ease: "power2.inOut",
      autoAlpha: 1,
      delay: 0.1
    });
  }
  function setButtonLoading2(triggerEl, loading) {
    const btnTxt = triggerEl.querySelector("[split-text]");
    if (!btnTxt)
      return;
    const splitVisible = btnTxt.querySelector("[data-split-visible]");
    if (loading) {
      if (splitVisible && !splitVisible._origHTML) {
        splitVisible._origHTML = splitVisible.innerHTML;
      }
      if (splitVisible)
        splitVisible.textContent = "Please wait...";
      btnTxt.setAttribute("aria-label", "Please wait...");
      triggerEl.style.pointerEvents = "none";
    } else {
      if (splitVisible && splitVisible._origHTML) {
        splitVisible.innerHTML = splitVisible._origHTML;
        delete splitVisible._origHTML;
      }
      btnTxt.setAttribute("aria-label", "Submit");
      triggerEl.style.pointerEvents = "";
    }
  }
  function setupContactTrigger2() {
    const contactTrigger = document.querySelector("[contact-trigger]");
    const contactTarget = document.querySelector("[contact-target]");
    const form = contactTarget.closest("form");
    contactTriggerClickListener2 = function() {
      if (form && form.checkValidity() && !contactTarget.disabled) {
        setButtonLoading2(contactTrigger, true);
        clearTimeout(loadingTimeout2);
        loadingTimeout2 = setTimeout(() => {
          setButtonLoading2(contactTrigger, false);
        }, 1e4);
      }
      contactTarget.click();
    };
    contactTrigger.addEventListener("click", contactTriggerClickListener2);
    if (form) {
      const formBlock = form.closest(".w-form");
      const errorDiv = formBlock ? formBlock.querySelector(".w-form-fail") : null;
      formSubmitObserver2 = new MutationObserver(() => {
        if (form.style.display === "none" || errorDiv && errorDiv.style.display === "block") {
          clearTimeout(loadingTimeout2);
          setButtonLoading2(contactTrigger, false);
        }
      });
      formSubmitObserver2.observe(form, {
        attributes: true,
        attributeFilter: ["style"]
      });
      if (errorDiv) {
        formSubmitObserver2.observe(errorDiv, {
          attributes: true,
          attributeFilter: ["style", "class"]
        });
      }
    }
  }
  function destroyContactTrigger2() {
    const contactTrigger = document.querySelector("[contact-trigger]");
    if (contactTriggerClickListener2) {
      contactTrigger.removeEventListener("click", contactTriggerClickListener2);
    }
    if (formSubmitObserver2) {
      formSubmitObserver2.disconnect();
      formSubmitObserver2 = null;
    }
    clearTimeout(loadingTimeout2);
    if (contactTrigger) {
      setButtonLoading2(contactTrigger, false);
    }
  }
  function resetFormAfterSubmission2(form) {
    const successDiv = form.nextSibling;
    const observer = new MutationObserver(function() {
      if (form.style.display === "none") {
        setTimeout(() => {
          form.reset();
          form.style.display = "block";
          successDiv.style.display = "none";
        }, 5e3);
      }
    });
    observer.observe(form, { attributes: true, attributeFilter: ["style"] });
  }
  function getApplicationForm() {
    return document.querySelector('form[data-name^="Application Form"]');
  }
  function initFormReset2() {
    const form = getApplicationForm();
    if (!form)
      return;
    resetFormAfterSubmission2(form);
  }
  function destroyFormReset2() {
    const form = getApplicationForm();
    if (!form)
      return;
  }
  function appendFormDeclaration() {
    const declaration = document.querySelector("[data-form-declaration]");
    const form = document.querySelector("#wf-form-Application-Form");
    if (!declaration || !form)
      return;
    const role = declaration.textContent.trim();
    const newName = `Application Form - ${role}`;
    form.setAttribute("name", `wf-form-${newName}`);
    form.setAttribute("data-name", newName);
    form.setAttribute("aria-label", newName);
    form.id = `wf-form-${newName}`;
  }
  function initCareersArticle() {
    appendFormDeclaration();
    setupContactTrigger2();
    initFormReset2();
  }
  function destroyCareersArticle() {
    destroyContactTrigger2();
    destroyFormReset2();
  }

  // src/page/privacy.js
  function privacyHero(mode = "") {
    const orbElement = document.querySelector("[data-orb]");
    const orbOutline3 = document.querySelector('[orb-outline="1"]');
    const orbOutline22 = document.querySelector('[orb-outline="2"]');
    const orbOutlineIn1 = document.querySelector('[orb-out-w="1"]');
    const orbOutlineIn2 = document.querySelector('[orb-out-w="2"]');
    const selector3 = document.querySelectorAll("[split-hero]");
    const privacyText = document.querySelector("[data-privacy-text]");
    heroLetters = runSplit(selector3, "words, chars");
    document.body.style.cursor = "progress";
    setTimeout(() => {
      window.SScroll.stop();
    }, 50);
    gsapWithCSS.set(heroLetters.chars, {
      y: "-101%"
    });
    if (privacyText) {
      gsapWithCSS.set(privacyText, {
        y: "10rem",
        autoAlpha: 0
      });
    }
    let duration = "1";
    gsapWithCSS.to(heroLetters.chars, {
      delay: 1,
      y: "0%",
      duration,
      ease: "power4.inOut",
      stagger: { each: 0.03, from: "random" }
    });
    if (mode !== "transition") {
      gsapWithCSS.set(orbElement, {
        autoAlpha: 0,
        width: "0em",
        height: "0em",
        minHeight: "auto",
        minWidth: "auto"
      });
      gsapWithCSS.set(orbOutline3, {
        autoAlpha: 0,
        scale: 0
      });
      gsapWithCSS.set(orbOutline22, {
        autoAlpha: 0,
        scale: 0
      });
      gsapWithCSS.to(orbElement, {
        autoAlpha: 1,
        width: "4.3em",
        height: "4.3em",
        duration: 1
      });
      gsapWithCSS.to(orbOutline3, {
        autoAlpha: 1,
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      });
      gsapWithCSS.to(orbOutline22, {
        delay: 0.2,
        autoAlpha: 1,
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      });
      gsapWithCSS.to(orbElement, {
        x: "0vw",
        y: "0vh",
        width: "80vh",
        height: "80vh",
        minHeight: "45em",
        minWidth: "45em",
        scale: 0,
        duration: 1,
        ease: "power2.inOut",
        delay: 1
      });
      gsapWithCSS.to(orbOutlineIn1, {
        x: "0vw",
        y: "-35vh",
        scale: 0.3,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 1
      });
      gsapWithCSS.to(orbOutlineIn2, {
        x: "0vw",
        y: "5vh",
        scale: 1,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 1
      });
      document.querySelector("[data-orb-wrap]").style.position = "absolute";
    }
    gsapWithCSS.from('[hh-tb="1"]', {
      delay: 2,
      x: "10em",
      duration: 1,
      ease: "power2.inOut",
      onComplete: function() {
        document.body.style.cursor = "auto";
        window.SScroll.start();
      }
    });
    gsapWithCSS.to("[case-hero-img]", {
      delay: 1.5,
      x: "0em",
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.5,
      ease: "power2.inOut"
    });
    gsapWithCSS.to(privacyText, {
      delay: 2,
      y: "0rem",
      autoAlpha: 1,
      duration: 0.5
    });
  }

  // node_modules/.pnpm/swiper@11.2.10/node_modules/swiper/shared/ssr-window.esm.mjs
  function isObject2(obj) {
    return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
  }
  function extend2(target, src) {
    if (target === void 0) {
      target = {};
    }
    if (src === void 0) {
      src = {};
    }
    const noExtend = ["__proto__", "constructor", "prototype"];
    Object.keys(src).filter((key) => noExtend.indexOf(key) < 0).forEach((key) => {
      if (typeof target[key] === "undefined")
        target[key] = src[key];
      else if (isObject2(src[key]) && isObject2(target[key]) && Object.keys(src[key]).length > 0) {
        extend2(target[key], src[key]);
      }
    });
  }
  var ssrDocument = {
    body: {},
    addEventListener() {
    },
    removeEventListener() {
    },
    activeElement: {
      blur() {
      },
      nodeName: ""
    },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    getElementById() {
      return null;
    },
    createEvent() {
      return {
        initEvent() {
        }
      };
    },
    createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {
        },
        getElementsByTagName() {
          return [];
        }
      };
    },
    createElementNS() {
      return {};
    },
    importNode() {
      return null;
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
    }
  };
  function getDocument() {
    const doc = typeof document !== "undefined" ? document : {};
    extend2(doc, ssrDocument);
    return doc;
  }
  var ssrWindow = {
    document: ssrDocument,
    navigator: {
      userAgent: ""
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
    },
    history: {
      replaceState() {
      },
      pushState() {
      },
      go() {
      },
      back() {
      }
    },
    CustomEvent: function CustomEvent2() {
      return this;
    },
    addEventListener() {
    },
    removeEventListener() {
    },
    getComputedStyle() {
      return {
        getPropertyValue() {
          return "";
        }
      };
    },
    Image() {
    },
    Date() {
    },
    screen: {},
    setTimeout() {
    },
    clearTimeout() {
    },
    matchMedia() {
      return {};
    },
    requestAnimationFrame(callback) {
      if (typeof setTimeout === "undefined") {
        callback();
        return null;
      }
      return setTimeout(callback, 0);
    },
    cancelAnimationFrame(id) {
      if (typeof setTimeout === "undefined") {
        return;
      }
      clearTimeout(id);
    }
  };
  function getWindow() {
    const win = typeof window !== "undefined" ? window : {};
    extend2(win, ssrWindow);
    return win;
  }

  // node_modules/.pnpm/swiper@11.2.10/node_modules/swiper/shared/utils.mjs
  function classesToTokens(classes2) {
    if (classes2 === void 0) {
      classes2 = "";
    }
    return classes2.trim().split(" ").filter((c) => !!c.trim());
  }
  function deleteProps(obj) {
    const object = obj;
    Object.keys(object).forEach((key) => {
      try {
        object[key] = null;
      } catch (e) {
      }
      try {
        delete object[key];
      } catch (e) {
      }
    });
  }
  function nextTick(callback, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return setTimeout(callback, delay);
  }
  function now() {
    return Date.now();
  }
  function getComputedStyle2(el) {
    const window2 = getWindow();
    let style;
    if (window2.getComputedStyle) {
      style = window2.getComputedStyle(el, null);
    }
    if (!style && el.currentStyle) {
      style = el.currentStyle;
    }
    if (!style) {
      style = el.style;
    }
    return style;
  }
  function getTranslate(el, axis) {
    if (axis === void 0) {
      axis = "x";
    }
    const window2 = getWindow();
    let matrix;
    let curTransform;
    let transformMatrix;
    const curStyle = getComputedStyle2(el);
    if (window2.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;
      if (curTransform.split(",").length > 6) {
        curTransform = curTransform.split(", ").map((a) => a.replace(",", ".")).join(", ");
      }
      transformMatrix = new window2.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
    } else {
      transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
      matrix = transformMatrix.toString().split(",");
    }
    if (axis === "x") {
      if (window2.WebKitCSSMatrix)
        curTransform = transformMatrix.m41;
      else if (matrix.length === 16)
        curTransform = parseFloat(matrix[12]);
      else
        curTransform = parseFloat(matrix[4]);
    }
    if (axis === "y") {
      if (window2.WebKitCSSMatrix)
        curTransform = transformMatrix.m42;
      else if (matrix.length === 16)
        curTransform = parseFloat(matrix[13]);
      else
        curTransform = parseFloat(matrix[5]);
    }
    return curTransform || 0;
  }
  function isObject3(o) {
    return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
  }
  function isNode2(node) {
    if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") {
      return node instanceof HTMLElement;
    }
    return node && (node.nodeType === 1 || node.nodeType === 11);
  }
  function extend3() {
    const to = Object(arguments.length <= 0 ? void 0 : arguments[0]);
    const noExtend = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < arguments.length; i += 1) {
      const nextSource = i < 0 || arguments.length <= i ? void 0 : arguments[i];
      if (nextSource !== void 0 && nextSource !== null && !isNode2(nextSource)) {
        const keysArray = Object.keys(Object(nextSource)).filter((key) => noExtend.indexOf(key) < 0);
        for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          const nextKey = keysArray[nextIndex];
          const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== void 0 && desc.enumerable) {
            if (isObject3(to[nextKey]) && isObject3(nextSource[nextKey])) {
              if (nextSource[nextKey].__swiper__) {
                to[nextKey] = nextSource[nextKey];
              } else {
                extend3(to[nextKey], nextSource[nextKey]);
              }
            } else if (!isObject3(to[nextKey]) && isObject3(nextSource[nextKey])) {
              to[nextKey] = {};
              if (nextSource[nextKey].__swiper__) {
                to[nextKey] = nextSource[nextKey];
              } else {
                extend3(to[nextKey], nextSource[nextKey]);
              }
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }
    return to;
  }
  function setCSSProperty(el, varName, varValue) {
    el.style.setProperty(varName, varValue);
  }
  function animateCSSModeScroll(_ref) {
    let {
      swiper,
      targetPosition,
      side
    } = _ref;
    const window2 = getWindow();
    const startPosition = -swiper.translate;
    let startTime = null;
    let time;
    const duration = swiper.params.speed;
    swiper.wrapperEl.style.scrollSnapType = "none";
    window2.cancelAnimationFrame(swiper.cssModeFrameID);
    const dir = targetPosition > startPosition ? "next" : "prev";
    const isOutOfBound = (current, target) => {
      return dir === "next" && current >= target || dir === "prev" && current <= target;
    };
    const animate = () => {
      time = new Date().getTime();
      if (startTime === null) {
        startTime = time;
      }
      const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
      const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
      let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
      if (isOutOfBound(currentPosition, targetPosition)) {
        currentPosition = targetPosition;
      }
      swiper.wrapperEl.scrollTo({
        [side]: currentPosition
      });
      if (isOutOfBound(currentPosition, targetPosition)) {
        swiper.wrapperEl.style.overflow = "hidden";
        swiper.wrapperEl.style.scrollSnapType = "";
        setTimeout(() => {
          swiper.wrapperEl.style.overflow = "";
          swiper.wrapperEl.scrollTo({
            [side]: currentPosition
          });
        });
        window2.cancelAnimationFrame(swiper.cssModeFrameID);
        return;
      }
      swiper.cssModeFrameID = window2.requestAnimationFrame(animate);
    };
    animate();
  }
  function elementChildren(element, selector3) {
    if (selector3 === void 0) {
      selector3 = "";
    }
    const window2 = getWindow();
    const children = [...element.children];
    if (window2.HTMLSlotElement && element instanceof HTMLSlotElement) {
      children.push(...element.assignedElements());
    }
    if (!selector3) {
      return children;
    }
    return children.filter((el) => el.matches(selector3));
  }
  function elementIsChildOfSlot(el, slot) {
    const elementsQueue = [slot];
    while (elementsQueue.length > 0) {
      const elementToCheck = elementsQueue.shift();
      if (el === elementToCheck) {
        return true;
      }
      elementsQueue.push(...elementToCheck.children, ...elementToCheck.shadowRoot ? elementToCheck.shadowRoot.children : [], ...elementToCheck.assignedElements ? elementToCheck.assignedElements() : []);
    }
  }
  function elementIsChildOf(el, parent) {
    const window2 = getWindow();
    let isChild = parent.contains(el);
    if (!isChild && window2.HTMLSlotElement && parent instanceof HTMLSlotElement) {
      const children = [...parent.assignedElements()];
      isChild = children.includes(el);
      if (!isChild) {
        isChild = elementIsChildOfSlot(el, parent);
      }
    }
    return isChild;
  }
  function showWarning(text) {
    try {
      console.warn(text);
      return;
    } catch (err) {
    }
  }
  function createElement2(tag, classes2) {
    if (classes2 === void 0) {
      classes2 = [];
    }
    const el = document.createElement(tag);
    el.classList.add(...Array.isArray(classes2) ? classes2 : classesToTokens(classes2));
    return el;
  }
  function elementOffset(el) {
    const window2 = getWindow();
    const document2 = getDocument();
    const box = el.getBoundingClientRect();
    const body = document2.body;
    const clientTop = el.clientTop || body.clientTop || 0;
    const clientLeft = el.clientLeft || body.clientLeft || 0;
    const scrollTop = el === window2 ? window2.scrollY : el.scrollTop;
    const scrollLeft = el === window2 ? window2.scrollX : el.scrollLeft;
    return {
      top: box.top + scrollTop - clientTop,
      left: box.left + scrollLeft - clientLeft
    };
  }
  function elementPrevAll(el, selector3) {
    const prevEls = [];
    while (el.previousElementSibling) {
      const prev = el.previousElementSibling;
      if (selector3) {
        if (prev.matches(selector3))
          prevEls.push(prev);
      } else
        prevEls.push(prev);
      el = prev;
    }
    return prevEls;
  }
  function elementNextAll(el, selector3) {
    const nextEls = [];
    while (el.nextElementSibling) {
      const next = el.nextElementSibling;
      if (selector3) {
        if (next.matches(selector3))
          nextEls.push(next);
      } else
        nextEls.push(next);
      el = next;
    }
    return nextEls;
  }
  function elementStyle(el, prop) {
    const window2 = getWindow();
    return window2.getComputedStyle(el, null).getPropertyValue(prop);
  }
  function elementIndex(el) {
    let child = el;
    let i;
    if (child) {
      i = 0;
      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1)
          i += 1;
      }
      return i;
    }
    return void 0;
  }
  function elementParents(el, selector3) {
    const parents = [];
    let parent = el.parentElement;
    while (parent) {
      if (selector3) {
        if (parent.matches(selector3))
          parents.push(parent);
      } else {
        parents.push(parent);
      }
      parent = parent.parentElement;
    }
    return parents;
  }
  function elementOuterSize(el, size, includeMargins) {
    const window2 = getWindow();
    if (includeMargins) {
      return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
    }
    return el.offsetWidth;
  }
  function makeElementsArray(el) {
    return (Array.isArray(el) ? el : [el]).filter((e) => !!e);
  }

  // node_modules/.pnpm/swiper@11.2.10/node_modules/swiper/shared/swiper-core.mjs
  var support;
  function calcSupport() {
    const window2 = getWindow();
    const document2 = getDocument();
    return {
      smoothScroll: document2.documentElement && document2.documentElement.style && "scrollBehavior" in document2.documentElement.style,
      touch: !!("ontouchstart" in window2 || window2.DocumentTouch && document2 instanceof window2.DocumentTouch)
    };
  }
  function getSupport() {
    if (!support) {
      support = calcSupport();
    }
    return support;
  }
  var deviceCached;
  function calcDevice(_temp) {
    let {
      userAgent
    } = _temp === void 0 ? {} : _temp;
    const support2 = getSupport();
    const window2 = getWindow();
    const platform = window2.navigator.platform;
    const ua = userAgent || window2.navigator.userAgent;
    const device = {
      ios: false,
      android: false
    };
    const screenWidth = window2.screen.width;
    const screenHeight = window2.screen.height;
    const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
    const windows = platform === "Win32";
    let macos = platform === "MacIntel";
    const iPadScreens = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
    if (!ipad && macos && support2.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
      ipad = ua.match(/(Version)\/([\d.]+)/);
      if (!ipad)
        ipad = [0, 1, "13_0_0"];
      macos = false;
    }
    if (android && !windows) {
      device.os = "android";
      device.android = true;
    }
    if (ipad || iphone || ipod) {
      device.os = "ios";
      device.ios = true;
    }
    return device;
  }
  function getDevice(overrides) {
    if (overrides === void 0) {
      overrides = {};
    }
    if (!deviceCached) {
      deviceCached = calcDevice(overrides);
    }
    return deviceCached;
  }
  var browser;
  function calcBrowser() {
    const window2 = getWindow();
    const device = getDevice();
    let needPerspectiveFix = false;
    function isSafari() {
      const ua = window2.navigator.userAgent.toLowerCase();
      return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
    }
    if (isSafari()) {
      const ua = String(window2.navigator.userAgent);
      if (ua.includes("Version/")) {
        const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num) => Number(num));
        needPerspectiveFix = major < 16 || major === 16 && minor < 2;
      }
    }
    const isWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window2.navigator.userAgent);
    const isSafariBrowser = isSafari();
    const need3dFix = isSafariBrowser || isWebView && device.ios;
    return {
      isSafari: needPerspectiveFix || isSafariBrowser,
      needPerspectiveFix,
      need3dFix,
      isWebView
    };
  }
  function getBrowser() {
    if (!browser) {
      browser = calcBrowser();
    }
    return browser;
  }
  function Resize(_ref) {
    let {
      swiper,
      on,
      emit
    } = _ref;
    const window2 = getWindow();
    let observer = null;
    let animationFrame = null;
    const resizeHandler = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized)
        return;
      emit("beforeResize");
      emit("resize");
    };
    const createObserver = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized)
        return;
      observer = new ResizeObserver((entries2) => {
        animationFrame = window2.requestAnimationFrame(() => {
          const {
            width,
            height
          } = swiper;
          let newWidth = width;
          let newHeight = height;
          entries2.forEach((_ref2) => {
            let {
              contentBoxSize,
              contentRect,
              target
            } = _ref2;
            if (target && target !== swiper.el)
              return;
            newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
            newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
          });
          if (newWidth !== width || newHeight !== height) {
            resizeHandler();
          }
        });
      });
      observer.observe(swiper.el);
    };
    const removeObserver = () => {
      if (animationFrame) {
        window2.cancelAnimationFrame(animationFrame);
      }
      if (observer && observer.unobserve && swiper.el) {
        observer.unobserve(swiper.el);
        observer = null;
      }
    };
    const orientationChangeHandler = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized)
        return;
      emit("orientationchange");
    };
    on("init", () => {
      if (swiper.params.resizeObserver && typeof window2.ResizeObserver !== "undefined") {
        createObserver();
        return;
      }
      window2.addEventListener("resize", resizeHandler);
      window2.addEventListener("orientationchange", orientationChangeHandler);
    });
    on("destroy", () => {
      removeObserver();
      window2.removeEventListener("resize", resizeHandler);
      window2.removeEventListener("orientationchange", orientationChangeHandler);
    });
  }
  function Observer2(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    const observers2 = [];
    const window2 = getWindow();
    const attach = function(target, options) {
      if (options === void 0) {
        options = {};
      }
      const ObserverFunc = window2.MutationObserver || window2.WebkitMutationObserver;
      const observer = new ObserverFunc((mutations) => {
        if (swiper.__preventObserver__)
          return;
        if (mutations.length === 1) {
          emit("observerUpdate", mutations[0]);
          return;
        }
        const observerUpdate = function observerUpdate2() {
          emit("observerUpdate", mutations[0]);
        };
        if (window2.requestAnimationFrame) {
          window2.requestAnimationFrame(observerUpdate);
        } else {
          window2.setTimeout(observerUpdate, 0);
        }
      });
      observer.observe(target, {
        attributes: typeof options.attributes === "undefined" ? true : options.attributes,
        childList: swiper.isElement || (typeof options.childList === "undefined" ? true : options).childList,
        characterData: typeof options.characterData === "undefined" ? true : options.characterData
      });
      observers2.push(observer);
    };
    const init6 = () => {
      if (!swiper.params.observer)
        return;
      if (swiper.params.observeParents) {
        const containerParents = elementParents(swiper.hostEl);
        for (let i = 0; i < containerParents.length; i += 1) {
          attach(containerParents[i]);
        }
      }
      attach(swiper.hostEl, {
        childList: swiper.params.observeSlideChildren
      });
      attach(swiper.wrapperEl, {
        attributes: false
      });
    };
    const destroy = () => {
      observers2.forEach((observer) => {
        observer.disconnect();
      });
      observers2.splice(0, observers2.length);
    };
    extendParams({
      observer: false,
      observeParents: false,
      observeSlideChildren: false
    });
    on("init", init6);
    on("destroy", destroy);
  }
  var eventsEmitter = {
    on(events2, handler, priority) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (typeof handler !== "function")
        return self;
      const method = priority ? "unshift" : "push";
      events2.split(" ").forEach((event2) => {
        if (!self.eventsListeners[event2])
          self.eventsListeners[event2] = [];
        self.eventsListeners[event2][method](handler);
      });
      return self;
    },
    once(events2, handler, priority) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (typeof handler !== "function")
        return self;
      function onceHandler() {
        self.off(events2, onceHandler);
        if (onceHandler.__emitterProxy) {
          delete onceHandler.__emitterProxy;
        }
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        handler.apply(self, args);
      }
      onceHandler.__emitterProxy = handler;
      return self.on(events2, onceHandler, priority);
    },
    onAny(handler, priority) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (typeof handler !== "function")
        return self;
      const method = priority ? "unshift" : "push";
      if (self.eventsAnyListeners.indexOf(handler) < 0) {
        self.eventsAnyListeners[method](handler);
      }
      return self;
    },
    offAny(handler) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (!self.eventsAnyListeners)
        return self;
      const index = self.eventsAnyListeners.indexOf(handler);
      if (index >= 0) {
        self.eventsAnyListeners.splice(index, 1);
      }
      return self;
    },
    off(events2, handler) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (!self.eventsListeners)
        return self;
      events2.split(" ").forEach((event2) => {
        if (typeof handler === "undefined") {
          self.eventsListeners[event2] = [];
        } else if (self.eventsListeners[event2]) {
          self.eventsListeners[event2].forEach((eventHandler, index) => {
            if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
              self.eventsListeners[event2].splice(index, 1);
            }
          });
        }
      });
      return self;
    },
    emit() {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (!self.eventsListeners)
        return self;
      let events2;
      let data;
      let context3;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      if (typeof args[0] === "string" || Array.isArray(args[0])) {
        events2 = args[0];
        data = args.slice(1, args.length);
        context3 = self;
      } else {
        events2 = args[0].events;
        data = args[0].data;
        context3 = args[0].context || self;
      }
      data.unshift(context3);
      const eventsArray = Array.isArray(events2) ? events2 : events2.split(" ");
      eventsArray.forEach((event2) => {
        if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
          self.eventsAnyListeners.forEach((eventHandler) => {
            eventHandler.apply(context3, [event2, ...data]);
          });
        }
        if (self.eventsListeners && self.eventsListeners[event2]) {
          self.eventsListeners[event2].forEach((eventHandler) => {
            eventHandler.apply(context3, data);
          });
        }
      });
      return self;
    }
  };
  function updateSize() {
    const swiper = this;
    let width;
    let height;
    const el = swiper.el;
    if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) {
      width = swiper.params.width;
    } else {
      width = el.clientWidth;
    }
    if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) {
      height = swiper.params.height;
    } else {
      height = el.clientHeight;
    }
    if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
      return;
    }
    width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
    height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
    if (Number.isNaN(width))
      width = 0;
    if (Number.isNaN(height))
      height = 0;
    Object.assign(swiper, {
      width,
      height,
      size: swiper.isHorizontal() ? width : height
    });
  }
  function updateSlides() {
    const swiper = this;
    function getDirectionPropertyValue(node, label) {
      return parseFloat(node.getPropertyValue(swiper.getDirectionLabel(label)) || 0);
    }
    const params2 = swiper.params;
    const {
      wrapperEl,
      slidesEl,
      size: swiperSize,
      rtlTranslate: rtl,
      wrongRTL
    } = swiper;
    const isVirtual = swiper.virtual && params2.virtual.enabled;
    const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
    const slides = elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
    const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
    let snapGrid = [];
    const slidesGrid = [];
    const slidesSizesGrid = [];
    let offsetBefore = params2.slidesOffsetBefore;
    if (typeof offsetBefore === "function") {
      offsetBefore = params2.slidesOffsetBefore.call(swiper);
    }
    let offsetAfter = params2.slidesOffsetAfter;
    if (typeof offsetAfter === "function") {
      offsetAfter = params2.slidesOffsetAfter.call(swiper);
    }
    const previousSnapGridLength = swiper.snapGrid.length;
    const previousSlidesGridLength = swiper.slidesGrid.length;
    let spaceBetween = params2.spaceBetween;
    let slidePosition = -offsetBefore;
    let prevSlideSize = 0;
    let index = 0;
    if (typeof swiperSize === "undefined") {
      return;
    }
    if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
    } else if (typeof spaceBetween === "string") {
      spaceBetween = parseFloat(spaceBetween);
    }
    swiper.virtualSize = -spaceBetween;
    slides.forEach((slideEl) => {
      if (rtl) {
        slideEl.style.marginLeft = "";
      } else {
        slideEl.style.marginRight = "";
      }
      slideEl.style.marginBottom = "";
      slideEl.style.marginTop = "";
    });
    if (params2.centeredSlides && params2.cssMode) {
      setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
      setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
    }
    const gridEnabled = params2.grid && params2.grid.rows > 1 && swiper.grid;
    if (gridEnabled) {
      swiper.grid.initSlides(slides);
    } else if (swiper.grid) {
      swiper.grid.unsetSlides();
    }
    let slideSize;
    const shouldResetSlideSize = params2.slidesPerView === "auto" && params2.breakpoints && Object.keys(params2.breakpoints).filter((key) => {
      return typeof params2.breakpoints[key].slidesPerView !== "undefined";
    }).length > 0;
    for (let i = 0; i < slidesLength; i += 1) {
      slideSize = 0;
      let slide2;
      if (slides[i])
        slide2 = slides[i];
      if (gridEnabled) {
        swiper.grid.updateSlide(i, slide2, slides);
      }
      if (slides[i] && elementStyle(slide2, "display") === "none")
        continue;
      if (params2.slidesPerView === "auto") {
        if (shouldResetSlideSize) {
          slides[i].style[swiper.getDirectionLabel("width")] = ``;
        }
        const slideStyles = getComputedStyle(slide2);
        const currentTransform = slide2.style.transform;
        const currentWebKitTransform = slide2.style.webkitTransform;
        if (currentTransform) {
          slide2.style.transform = "none";
        }
        if (currentWebKitTransform) {
          slide2.style.webkitTransform = "none";
        }
        if (params2.roundLengths) {
          slideSize = swiper.isHorizontal() ? elementOuterSize(slide2, "width", true) : elementOuterSize(slide2, "height", true);
        } else {
          const width = getDirectionPropertyValue(slideStyles, "width");
          const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
          const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
          const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
          const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
          const boxSizing = slideStyles.getPropertyValue("box-sizing");
          if (boxSizing && boxSizing === "border-box") {
            slideSize = width + marginLeft + marginRight;
          } else {
            const {
              clientWidth,
              offsetWidth
            } = slide2;
            slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
          }
        }
        if (currentTransform) {
          slide2.style.transform = currentTransform;
        }
        if (currentWebKitTransform) {
          slide2.style.webkitTransform = currentWebKitTransform;
        }
        if (params2.roundLengths)
          slideSize = Math.floor(slideSize);
      } else {
        slideSize = (swiperSize - (params2.slidesPerView - 1) * spaceBetween) / params2.slidesPerView;
        if (params2.roundLengths)
          slideSize = Math.floor(slideSize);
        if (slides[i]) {
          slides[i].style[swiper.getDirectionLabel("width")] = `${slideSize}px`;
        }
      }
      if (slides[i]) {
        slides[i].swiperSlideSize = slideSize;
      }
      slidesSizesGrid.push(slideSize);
      if (params2.centeredSlides) {
        slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
        if (prevSlideSize === 0 && i !== 0)
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (i === 0)
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (Math.abs(slidePosition) < 1 / 1e3)
          slidePosition = 0;
        if (params2.roundLengths)
          slidePosition = Math.floor(slidePosition);
        if (index % params2.slidesPerGroup === 0)
          snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
      } else {
        if (params2.roundLengths)
          slidePosition = Math.floor(slidePosition);
        if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0)
          snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
        slidePosition = slidePosition + slideSize + spaceBetween;
      }
      swiper.virtualSize += slideSize + spaceBetween;
      prevSlideSize = slideSize;
      index += 1;
    }
    swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
    if (rtl && wrongRTL && (params2.effect === "slide" || params2.effect === "coverflow")) {
      wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
    }
    if (params2.setWrapperSize) {
      wrapperEl.style[swiper.getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
    }
    if (gridEnabled) {
      swiper.grid.updateWrapperSize(slideSize, snapGrid);
    }
    if (!params2.centeredSlides) {
      const newSlidesGrid = [];
      for (let i = 0; i < snapGrid.length; i += 1) {
        let slidesGridItem = snapGrid[i];
        if (params2.roundLengths)
          slidesGridItem = Math.floor(slidesGridItem);
        if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
          newSlidesGrid.push(slidesGridItem);
        }
      }
      snapGrid = newSlidesGrid;
      if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
        snapGrid.push(swiper.virtualSize - swiperSize);
      }
    }
    if (isVirtual && params2.loop) {
      const size = slidesSizesGrid[0] + spaceBetween;
      if (params2.slidesPerGroup > 1) {
        const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params2.slidesPerGroup);
        const groupSize = size * params2.slidesPerGroup;
        for (let i = 0; i < groups; i += 1) {
          snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
        }
      }
      for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
        if (params2.slidesPerGroup === 1) {
          snapGrid.push(snapGrid[snapGrid.length - 1] + size);
        }
        slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
        swiper.virtualSize += size;
      }
    }
    if (snapGrid.length === 0)
      snapGrid = [0];
    if (spaceBetween !== 0) {
      const key = swiper.isHorizontal() && rtl ? "marginLeft" : swiper.getDirectionLabel("marginRight");
      slides.filter((_, slideIndex) => {
        if (!params2.cssMode || params2.loop)
          return true;
        if (slideIndex === slides.length - 1) {
          return false;
        }
        return true;
      }).forEach((slideEl) => {
        slideEl.style[key] = `${spaceBetween}px`;
      });
    }
    if (params2.centeredSlides && params2.centeredSlidesBounds) {
      let allSlidesSize = 0;
      slidesSizesGrid.forEach((slideSizeValue) => {
        allSlidesSize += slideSizeValue + (spaceBetween || 0);
      });
      allSlidesSize -= spaceBetween;
      const maxSnap = allSlidesSize > swiperSize ? allSlidesSize - swiperSize : 0;
      snapGrid = snapGrid.map((snap3) => {
        if (snap3 <= 0)
          return -offsetBefore;
        if (snap3 > maxSnap)
          return maxSnap + offsetAfter;
        return snap3;
      });
    }
    if (params2.centerInsufficientSlides) {
      let allSlidesSize = 0;
      slidesSizesGrid.forEach((slideSizeValue) => {
        allSlidesSize += slideSizeValue + (spaceBetween || 0);
      });
      allSlidesSize -= spaceBetween;
      const offsetSize = (params2.slidesOffsetBefore || 0) + (params2.slidesOffsetAfter || 0);
      if (allSlidesSize + offsetSize < swiperSize) {
        const allSlidesOffset = (swiperSize - allSlidesSize - offsetSize) / 2;
        snapGrid.forEach((snap3, snapIndex) => {
          snapGrid[snapIndex] = snap3 - allSlidesOffset;
        });
        slidesGrid.forEach((snap3, snapIndex) => {
          slidesGrid[snapIndex] = snap3 + allSlidesOffset;
        });
      }
    }
    Object.assign(swiper, {
      slides,
      snapGrid,
      slidesGrid,
      slidesSizesGrid
    });
    if (params2.centeredSlides && params2.cssMode && !params2.centeredSlidesBounds) {
      setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
      setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
      const addToSnapGrid = -swiper.snapGrid[0];
      const addToSlidesGrid = -swiper.slidesGrid[0];
      swiper.snapGrid = swiper.snapGrid.map((v) => v + addToSnapGrid);
      swiper.slidesGrid = swiper.slidesGrid.map((v) => v + addToSlidesGrid);
    }
    if (slidesLength !== previousSlidesLength) {
      swiper.emit("slidesLengthChange");
    }
    if (snapGrid.length !== previousSnapGridLength) {
      if (swiper.params.watchOverflow)
        swiper.checkOverflow();
      swiper.emit("snapGridLengthChange");
    }
    if (slidesGrid.length !== previousSlidesGridLength) {
      swiper.emit("slidesGridLengthChange");
    }
    if (params2.watchSlidesProgress) {
      swiper.updateSlidesOffset();
    }
    swiper.emit("slidesUpdated");
    if (!isVirtual && !params2.cssMode && (params2.effect === "slide" || params2.effect === "fade")) {
      const backFaceHiddenClass = `${params2.containerModifierClass}backface-hidden`;
      const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
      if (slidesLength <= params2.maxBackfaceHiddenSlides) {
        if (!hasClassBackfaceClassAdded)
          swiper.el.classList.add(backFaceHiddenClass);
      } else if (hasClassBackfaceClassAdded) {
        swiper.el.classList.remove(backFaceHiddenClass);
      }
    }
  }
  function updateAutoHeight(speed) {
    const swiper = this;
    const activeSlides = [];
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    let newHeight = 0;
    let i;
    if (typeof speed === "number") {
      swiper.setTransition(speed);
    } else if (speed === true) {
      swiper.setTransition(swiper.params.speed);
    }
    const getSlideByIndex = (index) => {
      if (isVirtual) {
        return swiper.slides[swiper.getSlideIndexByData(index)];
      }
      return swiper.slides[index];
    };
    if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) {
      if (swiper.params.centeredSlides) {
        (swiper.visibleSlides || []).forEach((slide2) => {
          activeSlides.push(slide2);
        });
      } else {
        for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
          const index = swiper.activeIndex + i;
          if (index > swiper.slides.length && !isVirtual)
            break;
          activeSlides.push(getSlideByIndex(index));
        }
      }
    } else {
      activeSlides.push(getSlideByIndex(swiper.activeIndex));
    }
    for (i = 0; i < activeSlides.length; i += 1) {
      if (typeof activeSlides[i] !== "undefined") {
        const height = activeSlides[i].offsetHeight;
        newHeight = height > newHeight ? height : newHeight;
      }
    }
    if (newHeight || newHeight === 0)
      swiper.wrapperEl.style.height = `${newHeight}px`;
  }
  function updateSlidesOffset() {
    const swiper = this;
    const slides = swiper.slides;
    const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
    for (let i = 0; i < slides.length; i += 1) {
      slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
    }
  }
  var toggleSlideClasses$1 = (slideEl, condition, className) => {
    if (condition && !slideEl.classList.contains(className)) {
      slideEl.classList.add(className);
    } else if (!condition && slideEl.classList.contains(className)) {
      slideEl.classList.remove(className);
    }
  };
  function updateSlidesProgress(translate2) {
    if (translate2 === void 0) {
      translate2 = this && this.translate || 0;
    }
    const swiper = this;
    const params2 = swiper.params;
    const {
      slides,
      rtlTranslate: rtl,
      snapGrid
    } = swiper;
    if (slides.length === 0)
      return;
    if (typeof slides[0].swiperSlideOffset === "undefined")
      swiper.updateSlidesOffset();
    let offsetCenter = -translate2;
    if (rtl)
      offsetCenter = translate2;
    swiper.visibleSlidesIndexes = [];
    swiper.visibleSlides = [];
    let spaceBetween = params2.spaceBetween;
    if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size;
    } else if (typeof spaceBetween === "string") {
      spaceBetween = parseFloat(spaceBetween);
    }
    for (let i = 0; i < slides.length; i += 1) {
      const slide2 = slides[i];
      let slideOffset = slide2.swiperSlideOffset;
      if (params2.cssMode && params2.centeredSlides) {
        slideOffset -= slides[0].swiperSlideOffset;
      }
      const slideProgress = (offsetCenter + (params2.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
      const originalSlideProgress = (offsetCenter - snapGrid[0] + (params2.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
      const slideBefore = -(offsetCenter - slideOffset);
      const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
      const isFullyVisible = slideBefore >= 0 && slideBefore <= swiper.size - swiper.slidesSizesGrid[i];
      const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
      if (isVisible) {
        swiper.visibleSlides.push(slide2);
        swiper.visibleSlidesIndexes.push(i);
      }
      toggleSlideClasses$1(slide2, isVisible, params2.slideVisibleClass);
      toggleSlideClasses$1(slide2, isFullyVisible, params2.slideFullyVisibleClass);
      slide2.progress = rtl ? -slideProgress : slideProgress;
      slide2.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
    }
  }
  function updateProgress(translate2) {
    const swiper = this;
    if (typeof translate2 === "undefined") {
      const multiplier = swiper.rtlTranslate ? -1 : 1;
      translate2 = swiper && swiper.translate && swiper.translate * multiplier || 0;
    }
    const params2 = swiper.params;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    let {
      progress,
      isBeginning,
      isEnd,
      progressLoop
    } = swiper;
    const wasBeginning = isBeginning;
    const wasEnd = isEnd;
    if (translatesDiff === 0) {
      progress = 0;
      isBeginning = true;
      isEnd = true;
    } else {
      progress = (translate2 - swiper.minTranslate()) / translatesDiff;
      const isBeginningRounded = Math.abs(translate2 - swiper.minTranslate()) < 1;
      const isEndRounded = Math.abs(translate2 - swiper.maxTranslate()) < 1;
      isBeginning = isBeginningRounded || progress <= 0;
      isEnd = isEndRounded || progress >= 1;
      if (isBeginningRounded)
        progress = 0;
      if (isEndRounded)
        progress = 1;
    }
    if (params2.loop) {
      const firstSlideIndex = swiper.getSlideIndexByData(0);
      const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
      const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
      const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
      const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
      const translateAbs = Math.abs(translate2);
      if (translateAbs >= firstSlideTranslate) {
        progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
      } else {
        progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
      }
      if (progressLoop > 1)
        progressLoop -= 1;
    }
    Object.assign(swiper, {
      progress,
      progressLoop,
      isBeginning,
      isEnd
    });
    if (params2.watchSlidesProgress || params2.centeredSlides && params2.autoHeight)
      swiper.updateSlidesProgress(translate2);
    if (isBeginning && !wasBeginning) {
      swiper.emit("reachBeginning toEdge");
    }
    if (isEnd && !wasEnd) {
      swiper.emit("reachEnd toEdge");
    }
    if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
      swiper.emit("fromEdge");
    }
    swiper.emit("progress", progress);
  }
  var toggleSlideClasses = (slideEl, condition, className) => {
    if (condition && !slideEl.classList.contains(className)) {
      slideEl.classList.add(className);
    } else if (!condition && slideEl.classList.contains(className)) {
      slideEl.classList.remove(className);
    }
  };
  function updateSlidesClasses() {
    const swiper = this;
    const {
      slides,
      params: params2,
      slidesEl,
      activeIndex
    } = swiper;
    const isVirtual = swiper.virtual && params2.virtual.enabled;
    const gridEnabled = swiper.grid && params2.grid && params2.grid.rows > 1;
    const getFilteredSlide = (selector3) => {
      return elementChildren(slidesEl, `.${params2.slideClass}${selector3}, swiper-slide${selector3}`)[0];
    };
    let activeSlide;
    let prevSlide;
    let nextSlide;
    if (isVirtual) {
      if (params2.loop) {
        let slideIndex = activeIndex - swiper.virtual.slidesBefore;
        if (slideIndex < 0)
          slideIndex = swiper.virtual.slides.length + slideIndex;
        if (slideIndex >= swiper.virtual.slides.length)
          slideIndex -= swiper.virtual.slides.length;
        activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
      } else {
        activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`);
      }
    } else {
      if (gridEnabled) {
        activeSlide = slides.find((slideEl) => slideEl.column === activeIndex);
        nextSlide = slides.find((slideEl) => slideEl.column === activeIndex + 1);
        prevSlide = slides.find((slideEl) => slideEl.column === activeIndex - 1);
      } else {
        activeSlide = slides[activeIndex];
      }
    }
    if (activeSlide) {
      if (!gridEnabled) {
        nextSlide = elementNextAll(activeSlide, `.${params2.slideClass}, swiper-slide`)[0];
        if (params2.loop && !nextSlide) {
          nextSlide = slides[0];
        }
        prevSlide = elementPrevAll(activeSlide, `.${params2.slideClass}, swiper-slide`)[0];
        if (params2.loop && !prevSlide === 0) {
          prevSlide = slides[slides.length - 1];
        }
      }
    }
    slides.forEach((slideEl) => {
      toggleSlideClasses(slideEl, slideEl === activeSlide, params2.slideActiveClass);
      toggleSlideClasses(slideEl, slideEl === nextSlide, params2.slideNextClass);
      toggleSlideClasses(slideEl, slideEl === prevSlide, params2.slidePrevClass);
    });
    swiper.emitSlidesClasses();
  }
  var processLazyPreloader = (swiper, imageEl) => {
    if (!swiper || swiper.destroyed || !swiper.params)
      return;
    const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
    const slideEl = imageEl.closest(slideSelector());
    if (slideEl) {
      let lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
      if (!lazyEl && swiper.isElement) {
        if (slideEl.shadowRoot) {
          lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
        } else {
          requestAnimationFrame(() => {
            if (slideEl.shadowRoot) {
              lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
              if (lazyEl)
                lazyEl.remove();
            }
          });
        }
      }
      if (lazyEl)
        lazyEl.remove();
    }
  };
  var unlazy = (swiper, index) => {
    if (!swiper.slides[index])
      return;
    const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
    if (imageEl)
      imageEl.removeAttribute("loading");
  };
  var preload = (swiper) => {
    if (!swiper || swiper.destroyed || !swiper.params)
      return;
    let amount = swiper.params.lazyPreloadPrevNext;
    const len = swiper.slides.length;
    if (!len || !amount || amount < 0)
      return;
    amount = Math.min(amount, len);
    const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
    const activeIndex = swiper.activeIndex;
    if (swiper.params.grid && swiper.params.grid.rows > 1) {
      const activeColumn = activeIndex;
      const preloadColumns = [activeColumn - amount];
      preloadColumns.push(...Array.from({
        length: amount
      }).map((_, i) => {
        return activeColumn + slidesPerView + i;
      }));
      swiper.slides.forEach((slideEl, i) => {
        if (preloadColumns.includes(slideEl.column))
          unlazy(swiper, i);
      });
      return;
    }
    const slideIndexLastInView = activeIndex + slidesPerView - 1;
    if (swiper.params.rewind || swiper.params.loop) {
      for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
        const realIndex = (i % len + len) % len;
        if (realIndex < activeIndex || realIndex > slideIndexLastInView)
          unlazy(swiper, realIndex);
      }
    } else {
      for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) {
        if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) {
          unlazy(swiper, i);
        }
      }
    }
  };
  function getActiveIndexByTranslate(swiper) {
    const {
      slidesGrid,
      params: params2
    } = swiper;
    const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    let activeIndex;
    for (let i = 0; i < slidesGrid.length; i += 1) {
      if (typeof slidesGrid[i + 1] !== "undefined") {
        if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
          activeIndex = i;
        } else if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1]) {
          activeIndex = i + 1;
        }
      } else if (translate2 >= slidesGrid[i]) {
        activeIndex = i;
      }
    }
    if (params2.normalizeSlideIndex) {
      if (activeIndex < 0 || typeof activeIndex === "undefined")
        activeIndex = 0;
    }
    return activeIndex;
  }
  function updateActiveIndex(newActiveIndex) {
    const swiper = this;
    const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    const {
      snapGrid,
      params: params2,
      activeIndex: previousIndex,
      realIndex: previousRealIndex,
      snapIndex: previousSnapIndex
    } = swiper;
    let activeIndex = newActiveIndex;
    let snapIndex;
    const getVirtualRealIndex = (aIndex) => {
      let realIndex2 = aIndex - swiper.virtual.slidesBefore;
      if (realIndex2 < 0) {
        realIndex2 = swiper.virtual.slides.length + realIndex2;
      }
      if (realIndex2 >= swiper.virtual.slides.length) {
        realIndex2 -= swiper.virtual.slides.length;
      }
      return realIndex2;
    };
    if (typeof activeIndex === "undefined") {
      activeIndex = getActiveIndexByTranslate(swiper);
    }
    if (snapGrid.indexOf(translate2) >= 0) {
      snapIndex = snapGrid.indexOf(translate2);
    } else {
      const skip = Math.min(params2.slidesPerGroupSkip, activeIndex);
      snapIndex = skip + Math.floor((activeIndex - skip) / params2.slidesPerGroup);
    }
    if (snapIndex >= snapGrid.length)
      snapIndex = snapGrid.length - 1;
    if (activeIndex === previousIndex && !swiper.params.loop) {
      if (snapIndex !== previousSnapIndex) {
        swiper.snapIndex = snapIndex;
        swiper.emit("snapIndexChange");
      }
      return;
    }
    if (activeIndex === previousIndex && swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
      swiper.realIndex = getVirtualRealIndex(activeIndex);
      return;
    }
    const gridEnabled = swiper.grid && params2.grid && params2.grid.rows > 1;
    let realIndex;
    if (swiper.virtual && params2.virtual.enabled && params2.loop) {
      realIndex = getVirtualRealIndex(activeIndex);
    } else if (gridEnabled) {
      const firstSlideInColumn = swiper.slides.find((slideEl) => slideEl.column === activeIndex);
      let activeSlideIndex = parseInt(firstSlideInColumn.getAttribute("data-swiper-slide-index"), 10);
      if (Number.isNaN(activeSlideIndex)) {
        activeSlideIndex = Math.max(swiper.slides.indexOf(firstSlideInColumn), 0);
      }
      realIndex = Math.floor(activeSlideIndex / params2.grid.rows);
    } else if (swiper.slides[activeIndex]) {
      const slideIndex = swiper.slides[activeIndex].getAttribute("data-swiper-slide-index");
      if (slideIndex) {
        realIndex = parseInt(slideIndex, 10);
      } else {
        realIndex = activeIndex;
      }
    } else {
      realIndex = activeIndex;
    }
    Object.assign(swiper, {
      previousSnapIndex,
      snapIndex,
      previousRealIndex,
      realIndex,
      previousIndex,
      activeIndex
    });
    if (swiper.initialized) {
      preload(swiper);
    }
    swiper.emit("activeIndexChange");
    swiper.emit("snapIndexChange");
    if (swiper.initialized || swiper.params.runCallbacksOnInit) {
      if (previousRealIndex !== realIndex) {
        swiper.emit("realIndexChange");
      }
      swiper.emit("slideChange");
    }
  }
  function updateClickedSlide(el, path) {
    const swiper = this;
    const params2 = swiper.params;
    let slide2 = el.closest(`.${params2.slideClass}, swiper-slide`);
    if (!slide2 && swiper.isElement && path && path.length > 1 && path.includes(el)) {
      [...path.slice(path.indexOf(el) + 1, path.length)].forEach((pathEl) => {
        if (!slide2 && pathEl.matches && pathEl.matches(`.${params2.slideClass}, swiper-slide`)) {
          slide2 = pathEl;
        }
      });
    }
    let slideFound = false;
    let slideIndex;
    if (slide2) {
      for (let i = 0; i < swiper.slides.length; i += 1) {
        if (swiper.slides[i] === slide2) {
          slideFound = true;
          slideIndex = i;
          break;
        }
      }
    }
    if (slide2 && slideFound) {
      swiper.clickedSlide = slide2;
      if (swiper.virtual && swiper.params.virtual.enabled) {
        swiper.clickedIndex = parseInt(slide2.getAttribute("data-swiper-slide-index"), 10);
      } else {
        swiper.clickedIndex = slideIndex;
      }
    } else {
      swiper.clickedSlide = void 0;
      swiper.clickedIndex = void 0;
      return;
    }
    if (params2.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) {
      swiper.slideToClickedSlide();
    }
  }
  var update = {
    updateSize,
    updateSlides,
    updateAutoHeight,
    updateSlidesOffset,
    updateSlidesProgress,
    updateProgress,
    updateSlidesClasses,
    updateActiveIndex,
    updateClickedSlide
  };
  function getSwiperTranslate(axis) {
    if (axis === void 0) {
      axis = this.isHorizontal() ? "x" : "y";
    }
    const swiper = this;
    const {
      params: params2,
      rtlTranslate: rtl,
      translate: translate2,
      wrapperEl
    } = swiper;
    if (params2.virtualTranslate) {
      return rtl ? -translate2 : translate2;
    }
    if (params2.cssMode) {
      return translate2;
    }
    let currentTranslate = getTranslate(wrapperEl, axis);
    currentTranslate += swiper.cssOverflowAdjustment();
    if (rtl)
      currentTranslate = -currentTranslate;
    return currentTranslate || 0;
  }
  function setTranslate(translate2, byController) {
    const swiper = this;
    const {
      rtlTranslate: rtl,
      params: params2,
      wrapperEl,
      progress
    } = swiper;
    let x = 0;
    let y = 0;
    const z = 0;
    if (swiper.isHorizontal()) {
      x = rtl ? -translate2 : translate2;
    } else {
      y = translate2;
    }
    if (params2.roundLengths) {
      x = Math.floor(x);
      y = Math.floor(y);
    }
    swiper.previousTranslate = swiper.translate;
    swiper.translate = swiper.isHorizontal() ? x : y;
    if (params2.cssMode) {
      wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y;
    } else if (!params2.virtualTranslate) {
      if (swiper.isHorizontal()) {
        x -= swiper.cssOverflowAdjustment();
      } else {
        y -= swiper.cssOverflowAdjustment();
      }
      wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
    }
    let newProgress;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (translate2 - swiper.minTranslate()) / translatesDiff;
    }
    if (newProgress !== progress) {
      swiper.updateProgress(translate2);
    }
    swiper.emit("setTranslate", swiper.translate, byController);
  }
  function minTranslate() {
    return -this.snapGrid[0];
  }
  function maxTranslate() {
    return -this.snapGrid[this.snapGrid.length - 1];
  }
  function translateTo(translate2, speed, runCallbacks, translateBounds, internal) {
    if (translate2 === void 0) {
      translate2 = 0;
    }
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (translateBounds === void 0) {
      translateBounds = true;
    }
    const swiper = this;
    const {
      params: params2,
      wrapperEl
    } = swiper;
    if (swiper.animating && params2.preventInteractionOnTransition) {
      return false;
    }
    const minTranslate2 = swiper.minTranslate();
    const maxTranslate2 = swiper.maxTranslate();
    let newTranslate;
    if (translateBounds && translate2 > minTranslate2)
      newTranslate = minTranslate2;
    else if (translateBounds && translate2 < maxTranslate2)
      newTranslate = maxTranslate2;
    else
      newTranslate = translate2;
    swiper.updateProgress(newTranslate);
    if (params2.cssMode) {
      const isH = swiper.isHorizontal();
      if (speed === 0) {
        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
      } else {
        if (!swiper.support.smoothScroll) {
          animateCSSModeScroll({
            swiper,
            targetPosition: -newTranslate,
            side: isH ? "left" : "top"
          });
          return true;
        }
        wrapperEl.scrollTo({
          [isH ? "left" : "top"]: -newTranslate,
          behavior: "smooth"
        });
      }
      return true;
    }
    if (speed === 0) {
      swiper.setTransition(0);
      swiper.setTranslate(newTranslate);
      if (runCallbacks) {
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.emit("transitionEnd");
      }
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(newTranslate);
      if (runCallbacks) {
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.emit("transitionStart");
      }
      if (!swiper.animating) {
        swiper.animating = true;
        if (!swiper.onTranslateToWrapperTransitionEnd) {
          swiper.onTranslateToWrapperTransitionEnd = function transitionEnd2(e) {
            if (!swiper || swiper.destroyed)
              return;
            if (e.target !== this)
              return;
            swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
            swiper.onTranslateToWrapperTransitionEnd = null;
            delete swiper.onTranslateToWrapperTransitionEnd;
            swiper.animating = false;
            if (runCallbacks) {
              swiper.emit("transitionEnd");
            }
          };
        }
        swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
      }
    }
    return true;
  }
  var translate = {
    getTranslate: getSwiperTranslate,
    setTranslate,
    minTranslate,
    maxTranslate,
    translateTo
  };
  function setTransition(duration, byController) {
    const swiper = this;
    if (!swiper.params.cssMode) {
      swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
      swiper.wrapperEl.style.transitionDelay = duration === 0 ? `0ms` : "";
    }
    swiper.emit("setTransition", duration, byController);
  }
  function transitionEmit(_ref) {
    let {
      swiper,
      runCallbacks,
      direction,
      step
    } = _ref;
    const {
      activeIndex,
      previousIndex
    } = swiper;
    let dir = direction;
    if (!dir) {
      if (activeIndex > previousIndex)
        dir = "next";
      else if (activeIndex < previousIndex)
        dir = "prev";
      else
        dir = "reset";
    }
    swiper.emit(`transition${step}`);
    if (runCallbacks && dir === "reset") {
      swiper.emit(`slideResetTransition${step}`);
    } else if (runCallbacks && activeIndex !== previousIndex) {
      swiper.emit(`slideChangeTransition${step}`);
      if (dir === "next") {
        swiper.emit(`slideNextTransition${step}`);
      } else {
        swiper.emit(`slidePrevTransition${step}`);
      }
    }
  }
  function transitionStart(runCallbacks, direction) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper = this;
    const {
      params: params2
    } = swiper;
    if (params2.cssMode)
      return;
    if (params2.autoHeight) {
      swiper.updateAutoHeight();
    }
    transitionEmit({
      swiper,
      runCallbacks,
      direction,
      step: "Start"
    });
  }
  function transitionEnd(runCallbacks, direction) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper = this;
    const {
      params: params2
    } = swiper;
    swiper.animating = false;
    if (params2.cssMode)
      return;
    swiper.setTransition(0);
    transitionEmit({
      swiper,
      runCallbacks,
      direction,
      step: "End"
    });
  }
  var transition = {
    setTransition,
    transitionStart,
    transitionEnd
  };
  function slideTo(index, speed, runCallbacks, internal, initial) {
    if (index === void 0) {
      index = 0;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (typeof index === "string") {
      index = parseInt(index, 10);
    }
    const swiper = this;
    let slideIndex = index;
    if (slideIndex < 0)
      slideIndex = 0;
    const {
      params: params2,
      snapGrid,
      slidesGrid,
      previousIndex,
      activeIndex,
      rtlTranslate: rtl,
      wrapperEl,
      enabled
    } = swiper;
    if (!enabled && !internal && !initial || swiper.destroyed || swiper.animating && params2.preventInteractionOnTransition) {
      return false;
    }
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
    let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
    if (snapIndex >= snapGrid.length)
      snapIndex = snapGrid.length - 1;
    const translate2 = -snapGrid[snapIndex];
    if (params2.normalizeSlideIndex) {
      for (let i = 0; i < slidesGrid.length; i += 1) {
        const normalizedTranslate = -Math.floor(translate2 * 100);
        const normalizedGrid = Math.floor(slidesGrid[i] * 100);
        const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
        if (typeof slidesGrid[i + 1] !== "undefined") {
          if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
            slideIndex = i;
          } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
            slideIndex = i + 1;
          }
        } else if (normalizedTranslate >= normalizedGrid) {
          slideIndex = i;
        }
      }
    }
    if (swiper.initialized && slideIndex !== activeIndex) {
      if (!swiper.allowSlideNext && (rtl ? translate2 > swiper.translate && translate2 > swiper.minTranslate() : translate2 < swiper.translate && translate2 < swiper.minTranslate())) {
        return false;
      }
      if (!swiper.allowSlidePrev && translate2 > swiper.translate && translate2 > swiper.maxTranslate()) {
        if ((activeIndex || 0) !== slideIndex) {
          return false;
        }
      }
    }
    if (slideIndex !== (previousIndex || 0) && runCallbacks) {
      swiper.emit("beforeSlideChangeStart");
    }
    swiper.updateProgress(translate2);
    let direction;
    if (slideIndex > activeIndex)
      direction = "next";
    else if (slideIndex < activeIndex)
      direction = "prev";
    else
      direction = "reset";
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    const isInitialVirtual = isVirtual && initial;
    if (!isInitialVirtual && (rtl && -translate2 === swiper.translate || !rtl && translate2 === swiper.translate)) {
      swiper.updateActiveIndex(slideIndex);
      if (params2.autoHeight) {
        swiper.updateAutoHeight();
      }
      swiper.updateSlidesClasses();
      if (params2.effect !== "slide") {
        swiper.setTranslate(translate2);
      }
      if (direction !== "reset") {
        swiper.transitionStart(runCallbacks, direction);
        swiper.transitionEnd(runCallbacks, direction);
      }
      return false;
    }
    if (params2.cssMode) {
      const isH = swiper.isHorizontal();
      const t = rtl ? translate2 : -translate2;
      if (speed === 0) {
        if (isVirtual) {
          swiper.wrapperEl.style.scrollSnapType = "none";
          swiper._immediateVirtual = true;
        }
        if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
          swiper._cssModeVirtualInitialSet = true;
          requestAnimationFrame(() => {
            wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
          });
        } else {
          wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
        }
        if (isVirtual) {
          requestAnimationFrame(() => {
            swiper.wrapperEl.style.scrollSnapType = "";
            swiper._immediateVirtual = false;
          });
        }
      } else {
        if (!swiper.support.smoothScroll) {
          animateCSSModeScroll({
            swiper,
            targetPosition: t,
            side: isH ? "left" : "top"
          });
          return true;
        }
        wrapperEl.scrollTo({
          [isH ? "left" : "top"]: t,
          behavior: "smooth"
        });
      }
      return true;
    }
    const browser2 = getBrowser();
    const isSafari = browser2.isSafari;
    if (isVirtual && !initial && isSafari && swiper.isElement) {
      swiper.virtual.update(false, false, slideIndex);
    }
    swiper.setTransition(speed);
    swiper.setTranslate(translate2);
    swiper.updateActiveIndex(slideIndex);
    swiper.updateSlidesClasses();
    swiper.emit("beforeTransitionStart", speed, internal);
    swiper.transitionStart(runCallbacks, direction);
    if (speed === 0) {
      swiper.transitionEnd(runCallbacks, direction);
    } else if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onSlideToWrapperTransitionEnd) {
        swiper.onSlideToWrapperTransitionEnd = function transitionEnd2(e) {
          if (!swiper || swiper.destroyed)
            return;
          if (e.target !== this)
            return;
          swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
          swiper.onSlideToWrapperTransitionEnd = null;
          delete swiper.onSlideToWrapperTransitionEnd;
          swiper.transitionEnd(runCallbacks, direction);
        };
      }
      swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
    }
    return true;
  }
  function slideToLoop(index, speed, runCallbacks, internal) {
    if (index === void 0) {
      index = 0;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (typeof index === "string") {
      const indexAsNumber = parseInt(index, 10);
      index = indexAsNumber;
    }
    const swiper = this;
    if (swiper.destroyed)
      return;
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    const gridEnabled = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
    let newIndex = index;
    if (swiper.params.loop) {
      if (swiper.virtual && swiper.params.virtual.enabled) {
        newIndex = newIndex + swiper.virtual.slidesBefore;
      } else {
        let targetSlideIndex;
        if (gridEnabled) {
          const slideIndex = newIndex * swiper.params.grid.rows;
          targetSlideIndex = swiper.slides.find((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex).column;
        } else {
          targetSlideIndex = swiper.getSlideIndexByData(newIndex);
        }
        const cols = gridEnabled ? Math.ceil(swiper.slides.length / swiper.params.grid.rows) : swiper.slides.length;
        const {
          centeredSlides
        } = swiper.params;
        let slidesPerView = swiper.params.slidesPerView;
        if (slidesPerView === "auto") {
          slidesPerView = swiper.slidesPerViewDynamic();
        } else {
          slidesPerView = Math.ceil(parseFloat(swiper.params.slidesPerView, 10));
          if (centeredSlides && slidesPerView % 2 === 0) {
            slidesPerView = slidesPerView + 1;
          }
        }
        let needLoopFix = cols - targetSlideIndex < slidesPerView;
        if (centeredSlides) {
          needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2);
        }
        if (internal && centeredSlides && swiper.params.slidesPerView !== "auto" && !gridEnabled) {
          needLoopFix = false;
        }
        if (needLoopFix) {
          const direction = centeredSlides ? targetSlideIndex < swiper.activeIndex ? "prev" : "next" : targetSlideIndex - swiper.activeIndex - 1 < swiper.params.slidesPerView ? "next" : "prev";
          swiper.loopFix({
            direction,
            slideTo: true,
            activeSlideIndex: direction === "next" ? targetSlideIndex + 1 : targetSlideIndex - cols + 1,
            slideRealIndex: direction === "next" ? swiper.realIndex : void 0
          });
        }
        if (gridEnabled) {
          const slideIndex = newIndex * swiper.params.grid.rows;
          newIndex = swiper.slides.find((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex).column;
        } else {
          newIndex = swiper.getSlideIndexByData(newIndex);
        }
      }
    }
    requestAnimationFrame(() => {
      swiper.slideTo(newIndex, speed, runCallbacks, internal);
    });
    return swiper;
  }
  function slideNext(speed, runCallbacks, internal) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper = this;
    const {
      enabled,
      params: params2,
      animating
    } = swiper;
    if (!enabled || swiper.destroyed)
      return swiper;
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    let perGroup = params2.slidesPerGroup;
    if (params2.slidesPerView === "auto" && params2.slidesPerGroup === 1 && params2.slidesPerGroupAuto) {
      perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
    }
    const increment = swiper.activeIndex < params2.slidesPerGroupSkip ? 1 : perGroup;
    const isVirtual = swiper.virtual && params2.virtual.enabled;
    if (params2.loop) {
      if (animating && !isVirtual && params2.loopPreventsSliding)
        return false;
      swiper.loopFix({
        direction: "next"
      });
      swiper._clientLeft = swiper.wrapperEl.clientLeft;
      if (swiper.activeIndex === swiper.slides.length - 1 && params2.cssMode) {
        requestAnimationFrame(() => {
          swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
        });
        return true;
      }
    }
    if (params2.rewind && swiper.isEnd) {
      return swiper.slideTo(0, speed, runCallbacks, internal);
    }
    return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
  }
  function slidePrev(speed, runCallbacks, internal) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper = this;
    const {
      params: params2,
      snapGrid,
      slidesGrid,
      rtlTranslate,
      enabled,
      animating
    } = swiper;
    if (!enabled || swiper.destroyed)
      return swiper;
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    const isVirtual = swiper.virtual && params2.virtual.enabled;
    if (params2.loop) {
      if (animating && !isVirtual && params2.loopPreventsSliding)
        return false;
      swiper.loopFix({
        direction: "prev"
      });
      swiper._clientLeft = swiper.wrapperEl.clientLeft;
    }
    const translate2 = rtlTranslate ? swiper.translate : -swiper.translate;
    function normalize3(val) {
      if (val < 0)
        return -Math.floor(Math.abs(val));
      return Math.floor(val);
    }
    const normalizedTranslate = normalize3(translate2);
    const normalizedSnapGrid = snapGrid.map((val) => normalize3(val));
    const isFreeMode = params2.freeMode && params2.freeMode.enabled;
    let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
    if (typeof prevSnap === "undefined" && (params2.cssMode || isFreeMode)) {
      let prevSnapIndex;
      snapGrid.forEach((snap3, snapIndex) => {
        if (normalizedTranslate >= snap3) {
          prevSnapIndex = snapIndex;
        }
      });
      if (typeof prevSnapIndex !== "undefined") {
        prevSnap = isFreeMode ? snapGrid[prevSnapIndex] : snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
      }
    }
    let prevIndex = 0;
    if (typeof prevSnap !== "undefined") {
      prevIndex = slidesGrid.indexOf(prevSnap);
      if (prevIndex < 0)
        prevIndex = swiper.activeIndex - 1;
      if (params2.slidesPerView === "auto" && params2.slidesPerGroup === 1 && params2.slidesPerGroupAuto) {
        prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
        prevIndex = Math.max(prevIndex, 0);
      }
    }
    if (params2.rewind && swiper.isBeginning) {
      const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
      return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
    } else if (params2.loop && swiper.activeIndex === 0 && params2.cssMode) {
      requestAnimationFrame(() => {
        swiper.slideTo(prevIndex, speed, runCallbacks, internal);
      });
      return true;
    }
    return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
  }
  function slideReset(speed, runCallbacks, internal) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper = this;
    if (swiper.destroyed)
      return;
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
  }
  function slideToClosest(speed, runCallbacks, internal, threshold) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (threshold === void 0) {
      threshold = 0.5;
    }
    const swiper = this;
    if (swiper.destroyed)
      return;
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    let index = swiper.activeIndex;
    const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
    const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
    const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    if (translate2 >= swiper.snapGrid[snapIndex]) {
      const currentSnap = swiper.snapGrid[snapIndex];
      const nextSnap = swiper.snapGrid[snapIndex + 1];
      if (translate2 - currentSnap > (nextSnap - currentSnap) * threshold) {
        index += swiper.params.slidesPerGroup;
      }
    } else {
      const prevSnap = swiper.snapGrid[snapIndex - 1];
      const currentSnap = swiper.snapGrid[snapIndex];
      if (translate2 - prevSnap <= (currentSnap - prevSnap) * threshold) {
        index -= swiper.params.slidesPerGroup;
      }
    }
    index = Math.max(index, 0);
    index = Math.min(index, swiper.slidesGrid.length - 1);
    return swiper.slideTo(index, speed, runCallbacks, internal);
  }
  function slideToClickedSlide() {
    const swiper = this;
    if (swiper.destroyed)
      return;
    const {
      params: params2,
      slidesEl
    } = swiper;
    const slidesPerView = params2.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params2.slidesPerView;
    let slideToIndex = swiper.getSlideIndexWhenGrid(swiper.clickedIndex);
    let realIndex;
    const slideSelector = swiper.isElement ? `swiper-slide` : `.${params2.slideClass}`;
    const isGrid = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
    if (params2.loop) {
      if (swiper.animating)
        return;
      realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
      if (params2.centeredSlides) {
        swiper.slideToLoop(realIndex);
      } else if (slideToIndex > (isGrid ? (swiper.slides.length - slidesPerView) / 2 - (swiper.params.grid.rows - 1) : swiper.slides.length - slidesPerView)) {
        swiper.loopFix();
        slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
        nextTick(() => {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else {
      swiper.slideTo(slideToIndex);
    }
  }
  var slide = {
    slideTo,
    slideToLoop,
    slideNext,
    slidePrev,
    slideReset,
    slideToClosest,
    slideToClickedSlide
  };
  function loopCreate(slideRealIndex, initial) {
    const swiper = this;
    const {
      params: params2,
      slidesEl
    } = swiper;
    if (!params2.loop || swiper.virtual && swiper.params.virtual.enabled)
      return;
    const initSlides = () => {
      const slides = elementChildren(slidesEl, `.${params2.slideClass}, swiper-slide`);
      slides.forEach((el, index) => {
        el.setAttribute("data-swiper-slide-index", index);
      });
    };
    const clearBlankSlides = () => {
      const slides = elementChildren(slidesEl, `.${params2.slideBlankClass}`);
      slides.forEach((el) => {
        el.remove();
      });
      if (slides.length > 0) {
        swiper.recalcSlides();
        swiper.updateSlides();
      }
    };
    const gridEnabled = swiper.grid && params2.grid && params2.grid.rows > 1;
    if (params2.loopAddBlankSlides && (params2.slidesPerGroup > 1 || gridEnabled)) {
      clearBlankSlides();
    }
    const slidesPerGroup = params2.slidesPerGroup * (gridEnabled ? params2.grid.rows : 1);
    const shouldFillGroup = swiper.slides.length % slidesPerGroup !== 0;
    const shouldFillGrid = gridEnabled && swiper.slides.length % params2.grid.rows !== 0;
    const addBlankSlides = (amountOfSlides) => {
      for (let i = 0; i < amountOfSlides; i += 1) {
        const slideEl = swiper.isElement ? createElement2("swiper-slide", [params2.slideBlankClass]) : createElement2("div", [params2.slideClass, params2.slideBlankClass]);
        swiper.slidesEl.append(slideEl);
      }
    };
    if (shouldFillGroup) {
      if (params2.loopAddBlankSlides) {
        const slidesToAdd = slidesPerGroup - swiper.slides.length % slidesPerGroup;
        addBlankSlides(slidesToAdd);
        swiper.recalcSlides();
        swiper.updateSlides();
      } else {
        showWarning("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
      }
      initSlides();
    } else if (shouldFillGrid) {
      if (params2.loopAddBlankSlides) {
        const slidesToAdd = params2.grid.rows - swiper.slides.length % params2.grid.rows;
        addBlankSlides(slidesToAdd);
        swiper.recalcSlides();
        swiper.updateSlides();
      } else {
        showWarning("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
      }
      initSlides();
    } else {
      initSlides();
    }
    swiper.loopFix({
      slideRealIndex,
      direction: params2.centeredSlides ? void 0 : "next",
      initial
    });
  }
  function loopFix(_temp) {
    let {
      slideRealIndex,
      slideTo: slideTo2 = true,
      direction,
      setTranslate: setTranslate2,
      activeSlideIndex,
      initial,
      byController,
      byMousewheel
    } = _temp === void 0 ? {} : _temp;
    const swiper = this;
    if (!swiper.params.loop)
      return;
    swiper.emit("beforeLoopFix");
    const {
      slides,
      allowSlidePrev,
      allowSlideNext,
      slidesEl,
      params: params2
    } = swiper;
    const {
      centeredSlides,
      initialSlide
    } = params2;
    swiper.allowSlidePrev = true;
    swiper.allowSlideNext = true;
    if (swiper.virtual && params2.virtual.enabled) {
      if (slideTo2) {
        if (!params2.centeredSlides && swiper.snapIndex === 0) {
          swiper.slideTo(swiper.virtual.slides.length, 0, false, true);
        } else if (params2.centeredSlides && swiper.snapIndex < params2.slidesPerView) {
          swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true);
        } else if (swiper.snapIndex === swiper.snapGrid.length - 1) {
          swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
        }
      }
      swiper.allowSlidePrev = allowSlidePrev;
      swiper.allowSlideNext = allowSlideNext;
      swiper.emit("loopFix");
      return;
    }
    let slidesPerView = params2.slidesPerView;
    if (slidesPerView === "auto") {
      slidesPerView = swiper.slidesPerViewDynamic();
    } else {
      slidesPerView = Math.ceil(parseFloat(params2.slidesPerView, 10));
      if (centeredSlides && slidesPerView % 2 === 0) {
        slidesPerView = slidesPerView + 1;
      }
    }
    const slidesPerGroup = params2.slidesPerGroupAuto ? slidesPerView : params2.slidesPerGroup;
    let loopedSlides = centeredSlides ? Math.max(slidesPerGroup, Math.ceil(slidesPerView / 2)) : slidesPerGroup;
    if (loopedSlides % slidesPerGroup !== 0) {
      loopedSlides += slidesPerGroup - loopedSlides % slidesPerGroup;
    }
    loopedSlides += params2.loopAdditionalSlides;
    swiper.loopedSlides = loopedSlides;
    const gridEnabled = swiper.grid && params2.grid && params2.grid.rows > 1;
    if (slides.length < slidesPerView + loopedSlides || swiper.params.effect === "cards" && slides.length < slidesPerView + loopedSlides * 2) {
      showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters");
    } else if (gridEnabled && params2.grid.fill === "row") {
      showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
    }
    const prependSlidesIndexes = [];
    const appendSlidesIndexes = [];
    const cols = gridEnabled ? Math.ceil(slides.length / params2.grid.rows) : slides.length;
    const isInitialOverflow = initial && cols - initialSlide < slidesPerView && !centeredSlides;
    let activeIndex = isInitialOverflow ? initialSlide : swiper.activeIndex;
    if (typeof activeSlideIndex === "undefined") {
      activeSlideIndex = swiper.getSlideIndex(slides.find((el) => el.classList.contains(params2.slideActiveClass)));
    } else {
      activeIndex = activeSlideIndex;
    }
    const isNext = direction === "next" || !direction;
    const isPrev = direction === "prev" || !direction;
    let slidesPrepended = 0;
    let slidesAppended = 0;
    const activeColIndex = gridEnabled ? slides[activeSlideIndex].column : activeSlideIndex;
    const activeColIndexWithShift = activeColIndex + (centeredSlides && typeof setTranslate2 === "undefined" ? -slidesPerView / 2 + 0.5 : 0);
    if (activeColIndexWithShift < loopedSlides) {
      slidesPrepended = Math.max(loopedSlides - activeColIndexWithShift, slidesPerGroup);
      for (let i = 0; i < loopedSlides - activeColIndexWithShift; i += 1) {
        const index = i - Math.floor(i / cols) * cols;
        if (gridEnabled) {
          const colIndexToPrepend = cols - index - 1;
          for (let i2 = slides.length - 1; i2 >= 0; i2 -= 1) {
            if (slides[i2].column === colIndexToPrepend)
              prependSlidesIndexes.push(i2);
          }
        } else {
          prependSlidesIndexes.push(cols - index - 1);
        }
      }
    } else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
      slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup);
      if (isInitialOverflow) {
        slidesAppended = Math.max(slidesAppended, slidesPerView - cols + initialSlide + 1);
      }
      for (let i = 0; i < slidesAppended; i += 1) {
        const index = i - Math.floor(i / cols) * cols;
        if (gridEnabled) {
          slides.forEach((slide2, slideIndex) => {
            if (slide2.column === index)
              appendSlidesIndexes.push(slideIndex);
          });
        } else {
          appendSlidesIndexes.push(index);
        }
      }
    }
    swiper.__preventObserver__ = true;
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
    if (swiper.params.effect === "cards" && slides.length < slidesPerView + loopedSlides * 2) {
      if (appendSlidesIndexes.includes(activeSlideIndex)) {
        appendSlidesIndexes.splice(appendSlidesIndexes.indexOf(activeSlideIndex), 1);
      }
      if (prependSlidesIndexes.includes(activeSlideIndex)) {
        prependSlidesIndexes.splice(prependSlidesIndexes.indexOf(activeSlideIndex), 1);
      }
    }
    if (isPrev) {
      prependSlidesIndexes.forEach((index) => {
        slides[index].swiperLoopMoveDOM = true;
        slidesEl.prepend(slides[index]);
        slides[index].swiperLoopMoveDOM = false;
      });
    }
    if (isNext) {
      appendSlidesIndexes.forEach((index) => {
        slides[index].swiperLoopMoveDOM = true;
        slidesEl.append(slides[index]);
        slides[index].swiperLoopMoveDOM = false;
      });
    }
    swiper.recalcSlides();
    if (params2.slidesPerView === "auto") {
      swiper.updateSlides();
    } else if (gridEnabled && (prependSlidesIndexes.length > 0 && isPrev || appendSlidesIndexes.length > 0 && isNext)) {
      swiper.slides.forEach((slide2, slideIndex) => {
        swiper.grid.updateSlide(slideIndex, slide2, swiper.slides);
      });
    }
    if (params2.watchSlidesProgress) {
      swiper.updateSlidesOffset();
    }
    if (slideTo2) {
      if (prependSlidesIndexes.length > 0 && isPrev) {
        if (typeof slideRealIndex === "undefined") {
          const currentSlideTranslate = swiper.slidesGrid[activeIndex];
          const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
          const diff = newSlideTranslate - currentSlideTranslate;
          if (byMousewheel) {
            swiper.setTranslate(swiper.translate - diff);
          } else {
            swiper.slideTo(activeIndex + Math.ceil(slidesPrepended), 0, false, true);
            if (setTranslate2) {
              swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
              swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
            }
          }
        } else {
          if (setTranslate2) {
            const shift = gridEnabled ? prependSlidesIndexes.length / params2.grid.rows : prependSlidesIndexes.length;
            swiper.slideTo(swiper.activeIndex + shift, 0, false, true);
            swiper.touchEventsData.currentTranslate = swiper.translate;
          }
        }
      } else if (appendSlidesIndexes.length > 0 && isNext) {
        if (typeof slideRealIndex === "undefined") {
          const currentSlideTranslate = swiper.slidesGrid[activeIndex];
          const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
          const diff = newSlideTranslate - currentSlideTranslate;
          if (byMousewheel) {
            swiper.setTranslate(swiper.translate - diff);
          } else {
            swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
            if (setTranslate2) {
              swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
              swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
            }
          }
        } else {
          const shift = gridEnabled ? appendSlidesIndexes.length / params2.grid.rows : appendSlidesIndexes.length;
          swiper.slideTo(swiper.activeIndex - shift, 0, false, true);
        }
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    if (swiper.controller && swiper.controller.control && !byController) {
      const loopParams = {
        slideRealIndex,
        direction,
        setTranslate: setTranslate2,
        activeSlideIndex,
        byController: true
      };
      if (Array.isArray(swiper.controller.control)) {
        swiper.controller.control.forEach((c) => {
          if (!c.destroyed && c.params.loop)
            c.loopFix({
              ...loopParams,
              slideTo: c.params.slidesPerView === params2.slidesPerView ? slideTo2 : false
            });
        });
      } else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) {
        swiper.controller.control.loopFix({
          ...loopParams,
          slideTo: swiper.controller.control.params.slidesPerView === params2.slidesPerView ? slideTo2 : false
        });
      }
    }
    swiper.emit("loopFix");
  }
  function loopDestroy() {
    const swiper = this;
    const {
      params: params2,
      slidesEl
    } = swiper;
    if (!params2.loop || !slidesEl || swiper.virtual && swiper.params.virtual.enabled)
      return;
    swiper.recalcSlides();
    const newSlidesOrder = [];
    swiper.slides.forEach((slideEl) => {
      const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
      newSlidesOrder[index] = slideEl;
    });
    swiper.slides.forEach((slideEl) => {
      slideEl.removeAttribute("data-swiper-slide-index");
    });
    newSlidesOrder.forEach((slideEl) => {
      slidesEl.append(slideEl);
    });
    swiper.recalcSlides();
    swiper.slideTo(swiper.realIndex, 0);
  }
  var loop = {
    loopCreate,
    loopFix,
    loopDestroy
  };
  function setGrabCursor(moving) {
    const swiper = this;
    if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode)
      return;
    const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
    if (swiper.isElement) {
      swiper.__preventObserver__ = true;
    }
    el.style.cursor = "move";
    el.style.cursor = moving ? "grabbing" : "grab";
    if (swiper.isElement) {
      requestAnimationFrame(() => {
        swiper.__preventObserver__ = false;
      });
    }
  }
  function unsetGrabCursor() {
    const swiper = this;
    if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
      return;
    }
    if (swiper.isElement) {
      swiper.__preventObserver__ = true;
    }
    swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
    if (swiper.isElement) {
      requestAnimationFrame(() => {
        swiper.__preventObserver__ = false;
      });
    }
  }
  var grabCursor = {
    setGrabCursor,
    unsetGrabCursor
  };
  function closestElement(selector3, base) {
    if (base === void 0) {
      base = this;
    }
    function __closestFrom(el) {
      if (!el || el === getDocument() || el === getWindow())
        return null;
      if (el.assignedSlot)
        el = el.assignedSlot;
      const found = el.closest(selector3);
      if (!found && !el.getRootNode) {
        return null;
      }
      return found || __closestFrom(el.getRootNode().host);
    }
    return __closestFrom(base);
  }
  function preventEdgeSwipe(swiper, event2, startX) {
    const window2 = getWindow();
    const {
      params: params2
    } = swiper;
    const edgeSwipeDetection = params2.edgeSwipeDetection;
    const edgeSwipeThreshold = params2.edgeSwipeThreshold;
    if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window2.innerWidth - edgeSwipeThreshold)) {
      if (edgeSwipeDetection === "prevent") {
        event2.preventDefault();
        return true;
      }
      return false;
    }
    return true;
  }
  function onTouchStart(event2) {
    const swiper = this;
    const document2 = getDocument();
    let e = event2;
    if (e.originalEvent)
      e = e.originalEvent;
    const data = swiper.touchEventsData;
    if (e.type === "pointerdown") {
      if (data.pointerId !== null && data.pointerId !== e.pointerId) {
        return;
      }
      data.pointerId = e.pointerId;
    } else if (e.type === "touchstart" && e.targetTouches.length === 1) {
      data.touchId = e.targetTouches[0].identifier;
    }
    if (e.type === "touchstart") {
      preventEdgeSwipe(swiper, e, e.targetTouches[0].pageX);
      return;
    }
    const {
      params: params2,
      touches,
      enabled
    } = swiper;
    if (!enabled)
      return;
    if (!params2.simulateTouch && e.pointerType === "mouse")
      return;
    if (swiper.animating && params2.preventInteractionOnTransition) {
      return;
    }
    if (!swiper.animating && params2.cssMode && params2.loop) {
      swiper.loopFix();
    }
    let targetEl = e.target;
    if (params2.touchEventsTarget === "wrapper") {
      if (!elementIsChildOf(targetEl, swiper.wrapperEl))
        return;
    }
    if ("which" in e && e.which === 3)
      return;
    if ("button" in e && e.button > 0)
      return;
    if (data.isTouched && data.isMoved)
      return;
    const swipingClassHasValue = !!params2.noSwipingClass && params2.noSwipingClass !== "";
    const eventPath = e.composedPath ? e.composedPath() : e.path;
    if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
      targetEl = eventPath[0];
    }
    const noSwipingSelector = params2.noSwipingSelector ? params2.noSwipingSelector : `.${params2.noSwipingClass}`;
    const isTargetShadow = !!(e.target && e.target.shadowRoot);
    if (params2.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
      swiper.allowClick = true;
      return;
    }
    if (params2.swipeHandler) {
      if (!targetEl.closest(params2.swipeHandler))
        return;
    }
    touches.currentX = e.pageX;
    touches.currentY = e.pageY;
    const startX = touches.currentX;
    const startY = touches.currentY;
    if (!preventEdgeSwipe(swiper, e, startX)) {
      return;
    }
    Object.assign(data, {
      isTouched: true,
      isMoved: false,
      allowTouchCallbacks: true,
      isScrolling: void 0,
      startMoving: void 0
    });
    touches.startX = startX;
    touches.startY = startY;
    data.touchStartTime = now();
    swiper.allowClick = true;
    swiper.updateSize();
    swiper.swipeDirection = void 0;
    if (params2.threshold > 0)
      data.allowThresholdMove = false;
    let preventDefault = true;
    if (targetEl.matches(data.focusableElements)) {
      preventDefault = false;
      if (targetEl.nodeName === "SELECT") {
        data.isTouched = false;
      }
    }
    if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== targetEl && (e.pointerType === "mouse" || e.pointerType !== "mouse" && !targetEl.matches(data.focusableElements))) {
      document2.activeElement.blur();
    }
    const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params2.touchStartPreventDefault;
    if ((params2.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) {
      e.preventDefault();
    }
    if (params2.freeMode && params2.freeMode.enabled && swiper.freeMode && swiper.animating && !params2.cssMode) {
      swiper.freeMode.onTouchStart();
    }
    swiper.emit("touchStart", e);
  }
  function onTouchMove(event2) {
    const document2 = getDocument();
    const swiper = this;
    const data = swiper.touchEventsData;
    const {
      params: params2,
      touches,
      rtlTranslate: rtl,
      enabled
    } = swiper;
    if (!enabled)
      return;
    if (!params2.simulateTouch && event2.pointerType === "mouse")
      return;
    let e = event2;
    if (e.originalEvent)
      e = e.originalEvent;
    if (e.type === "pointermove") {
      if (data.touchId !== null)
        return;
      const id = e.pointerId;
      if (id !== data.pointerId)
        return;
    }
    let targetTouch;
    if (e.type === "touchmove") {
      targetTouch = [...e.changedTouches].find((t) => t.identifier === data.touchId);
      if (!targetTouch || targetTouch.identifier !== data.touchId)
        return;
    } else {
      targetTouch = e;
    }
    if (!data.isTouched) {
      if (data.startMoving && data.isScrolling) {
        swiper.emit("touchMoveOpposite", e);
      }
      return;
    }
    const pageX = targetTouch.pageX;
    const pageY = targetTouch.pageY;
    if (e.preventedByNestedSwiper) {
      touches.startX = pageX;
      touches.startY = pageY;
      return;
    }
    if (!swiper.allowTouchMove) {
      if (!e.target.matches(data.focusableElements)) {
        swiper.allowClick = false;
      }
      if (data.isTouched) {
        Object.assign(touches, {
          startX: pageX,
          startY: pageY,
          currentX: pageX,
          currentY: pageY
        });
        data.touchStartTime = now();
      }
      return;
    }
    if (params2.touchReleaseOnEdges && !params2.loop) {
      if (swiper.isVertical()) {
        if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
          data.isTouched = false;
          data.isMoved = false;
          return;
        }
      } else if (rtl && (pageX > touches.startX && -swiper.translate <= swiper.maxTranslate() || pageX < touches.startX && -swiper.translate >= swiper.minTranslate())) {
        return;
      } else if (!rtl && (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate())) {
        return;
      }
    }
    if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== e.target && e.pointerType !== "mouse") {
      document2.activeElement.blur();
    }
    if (document2.activeElement) {
      if (e.target === document2.activeElement && e.target.matches(data.focusableElements)) {
        data.isMoved = true;
        swiper.allowClick = false;
        return;
      }
    }
    if (data.allowTouchCallbacks) {
      swiper.emit("touchMove", e);
    }
    touches.previousX = touches.currentX;
    touches.previousY = touches.currentY;
    touches.currentX = pageX;
    touches.currentY = pageY;
    const diffX = touches.currentX - touches.startX;
    const diffY = touches.currentY - touches.startY;
    if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold)
      return;
    if (typeof data.isScrolling === "undefined") {
      let touchAngle;
      if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
        data.isScrolling = false;
      } else {
        if (diffX * diffX + diffY * diffY >= 25) {
          touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
          data.isScrolling = swiper.isHorizontal() ? touchAngle > params2.touchAngle : 90 - touchAngle > params2.touchAngle;
        }
      }
    }
    if (data.isScrolling) {
      swiper.emit("touchMoveOpposite", e);
    }
    if (typeof data.startMoving === "undefined") {
      if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
        data.startMoving = true;
      }
    }
    if (data.isScrolling || e.type === "touchmove" && data.preventTouchMoveFromPointerMove) {
      data.isTouched = false;
      return;
    }
    if (!data.startMoving) {
      return;
    }
    swiper.allowClick = false;
    if (!params2.cssMode && e.cancelable) {
      e.preventDefault();
    }
    if (params2.touchMoveStopPropagation && !params2.nested) {
      e.stopPropagation();
    }
    let diff = swiper.isHorizontal() ? diffX : diffY;
    let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
    if (params2.oneWayMovement) {
      diff = Math.abs(diff) * (rtl ? 1 : -1);
      touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
    }
    touches.diff = diff;
    diff *= params2.touchRatio;
    if (rtl) {
      diff = -diff;
      touchesDiff = -touchesDiff;
    }
    const prevTouchesDirection = swiper.touchesDirection;
    swiper.swipeDirection = diff > 0 ? "prev" : "next";
    swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
    const isLoop = swiper.params.loop && !params2.cssMode;
    const allowLoopFix = swiper.touchesDirection === "next" && swiper.allowSlideNext || swiper.touchesDirection === "prev" && swiper.allowSlidePrev;
    if (!data.isMoved) {
      if (isLoop && allowLoopFix) {
        swiper.loopFix({
          direction: swiper.swipeDirection
        });
      }
      data.startTranslate = swiper.getTranslate();
      swiper.setTransition(0);
      if (swiper.animating) {
        const evt = new window.CustomEvent("transitionend", {
          bubbles: true,
          cancelable: true,
          detail: {
            bySwiperTouchMove: true
          }
        });
        swiper.wrapperEl.dispatchEvent(evt);
      }
      data.allowMomentumBounce = false;
      if (params2.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(true);
      }
      swiper.emit("sliderFirstMove", e);
    }
    let loopFixed;
    new Date().getTime();
    if (params2._loopSwapReset !== false && data.isMoved && data.allowThresholdMove && prevTouchesDirection !== swiper.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY,
        startTranslate: data.currentTranslate
      });
      data.loopSwapReset = true;
      data.startTranslate = data.currentTranslate;
      return;
    }
    swiper.emit("sliderMove", e);
    data.isMoved = true;
    data.currentTranslate = diff + data.startTranslate;
    let disableParentSwiper = true;
    let resistanceRatio = params2.resistanceRatio;
    if (params2.touchReleaseOnEdges) {
      resistanceRatio = 0;
    }
    if (diff > 0) {
      if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate > (params2.centeredSlides ? swiper.minTranslate() - swiper.slidesSizesGrid[swiper.activeIndex + 1] - (params2.slidesPerView !== "auto" && swiper.slides.length - params2.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.activeIndex + 1] + swiper.params.spaceBetween : 0) - swiper.params.spaceBetween : swiper.minTranslate())) {
        swiper.loopFix({
          direction: "prev",
          setTranslate: true,
          activeSlideIndex: 0
        });
      }
      if (data.currentTranslate > swiper.minTranslate()) {
        disableParentSwiper = false;
        if (params2.resistance) {
          data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
        }
      }
    } else if (diff < 0) {
      if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate < (params2.centeredSlides ? swiper.maxTranslate() + swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween + (params2.slidesPerView !== "auto" && swiper.slides.length - params2.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween : 0) : swiper.maxTranslate())) {
        swiper.loopFix({
          direction: "next",
          setTranslate: true,
          activeSlideIndex: swiper.slides.length - (params2.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params2.slidesPerView, 10)))
        });
      }
      if (data.currentTranslate < swiper.maxTranslate()) {
        disableParentSwiper = false;
        if (params2.resistance) {
          data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
        }
      }
    }
    if (disableParentSwiper) {
      e.preventedByNestedSwiper = true;
    }
    if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }
    if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }
    if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
      data.currentTranslate = data.startTranslate;
    }
    if (params2.threshold > 0) {
      if (Math.abs(diff) > params2.threshold || data.allowThresholdMove) {
        if (!data.allowThresholdMove) {
          data.allowThresholdMove = true;
          touches.startX = touches.currentX;
          touches.startY = touches.currentY;
          data.currentTranslate = data.startTranslate;
          touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
          return;
        }
      } else {
        data.currentTranslate = data.startTranslate;
        return;
      }
    }
    if (!params2.followFinger || params2.cssMode)
      return;
    if (params2.freeMode && params2.freeMode.enabled && swiper.freeMode || params2.watchSlidesProgress) {
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    if (params2.freeMode && params2.freeMode.enabled && swiper.freeMode) {
      swiper.freeMode.onTouchMove();
    }
    swiper.updateProgress(data.currentTranslate);
    swiper.setTranslate(data.currentTranslate);
  }
  function onTouchEnd(event2) {
    const swiper = this;
    const data = swiper.touchEventsData;
    let e = event2;
    if (e.originalEvent)
      e = e.originalEvent;
    let targetTouch;
    const isTouchEvent = e.type === "touchend" || e.type === "touchcancel";
    if (!isTouchEvent) {
      if (data.touchId !== null)
        return;
      if (e.pointerId !== data.pointerId)
        return;
      targetTouch = e;
    } else {
      targetTouch = [...e.changedTouches].find((t) => t.identifier === data.touchId);
      if (!targetTouch || targetTouch.identifier !== data.touchId)
        return;
    }
    if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(e.type)) {
      const proceed = ["pointercancel", "contextmenu"].includes(e.type) && (swiper.browser.isSafari || swiper.browser.isWebView);
      if (!proceed) {
        return;
      }
    }
    data.pointerId = null;
    data.touchId = null;
    const {
      params: params2,
      touches,
      rtlTranslate: rtl,
      slidesGrid,
      enabled
    } = swiper;
    if (!enabled)
      return;
    if (!params2.simulateTouch && e.pointerType === "mouse")
      return;
    if (data.allowTouchCallbacks) {
      swiper.emit("touchEnd", e);
    }
    data.allowTouchCallbacks = false;
    if (!data.isTouched) {
      if (data.isMoved && params2.grabCursor) {
        swiper.setGrabCursor(false);
      }
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    if (params2.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(false);
    }
    const touchEndTime = now();
    const timeDiff = touchEndTime - data.touchStartTime;
    if (swiper.allowClick) {
      const pathTree = e.path || e.composedPath && e.composedPath();
      swiper.updateClickedSlide(pathTree && pathTree[0] || e.target, pathTree);
      swiper.emit("tap click", e);
      if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
        swiper.emit("doubleTap doubleClick", e);
      }
    }
    data.lastClickTime = now();
    nextTick(() => {
      if (!swiper.destroyed)
        swiper.allowClick = true;
    });
    if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 && !data.loopSwapReset || data.currentTranslate === data.startTranslate && !data.loopSwapReset) {
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    let currentPos;
    if (params2.followFinger) {
      currentPos = rtl ? swiper.translate : -swiper.translate;
    } else {
      currentPos = -data.currentTranslate;
    }
    if (params2.cssMode) {
      return;
    }
    if (params2.freeMode && params2.freeMode.enabled) {
      swiper.freeMode.onTouchEnd({
        currentPos
      });
      return;
    }
    const swipeToLast = currentPos >= -swiper.maxTranslate() && !swiper.params.loop;
    let stopIndex = 0;
    let groupSize = swiper.slidesSizesGrid[0];
    for (let i = 0; i < slidesGrid.length; i += i < params2.slidesPerGroupSkip ? 1 : params2.slidesPerGroup) {
      const increment2 = i < params2.slidesPerGroupSkip - 1 ? 1 : params2.slidesPerGroup;
      if (typeof slidesGrid[i + increment2] !== "undefined") {
        if (swipeToLast || currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment2]) {
          stopIndex = i;
          groupSize = slidesGrid[i + increment2] - slidesGrid[i];
        }
      } else if (swipeToLast || currentPos >= slidesGrid[i]) {
        stopIndex = i;
        groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
      }
    }
    let rewindFirstIndex = null;
    let rewindLastIndex = null;
    if (params2.rewind) {
      if (swiper.isBeginning) {
        rewindLastIndex = params2.virtual && params2.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
      } else if (swiper.isEnd) {
        rewindFirstIndex = 0;
      }
    }
    const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
    const increment = stopIndex < params2.slidesPerGroupSkip - 1 ? 1 : params2.slidesPerGroup;
    if (timeDiff > params2.longSwipesMs) {
      if (!params2.longSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (swiper.swipeDirection === "next") {
        if (ratio >= params2.longSwipesRatio)
          swiper.slideTo(params2.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);
        else
          swiper.slideTo(stopIndex);
      }
      if (swiper.swipeDirection === "prev") {
        if (ratio > 1 - params2.longSwipesRatio) {
          swiper.slideTo(stopIndex + increment);
        } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params2.longSwipesRatio) {
          swiper.slideTo(rewindLastIndex);
        } else {
          swiper.slideTo(stopIndex);
        }
      }
    } else {
      if (!params2.shortSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
      if (!isNavButtonTarget) {
        if (swiper.swipeDirection === "next") {
          swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
        }
        if (swiper.swipeDirection === "prev") {
          swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
        }
      } else if (e.target === swiper.navigation.nextEl) {
        swiper.slideTo(stopIndex + increment);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  }
  function onResize() {
    const swiper = this;
    const {
      params: params2,
      el
    } = swiper;
    if (el && el.offsetWidth === 0)
      return;
    if (params2.breakpoints) {
      swiper.setBreakpoint();
    }
    const {
      allowSlideNext,
      allowSlidePrev,
      snapGrid
    } = swiper;
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateSlidesClasses();
    const isVirtualLoop = isVirtual && params2.loop;
    if ((params2.slidesPerView === "auto" || params2.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) {
      swiper.slideTo(swiper.slides.length - 1, 0, false, true);
    } else {
      if (swiper.params.loop && !isVirtual) {
        swiper.slideToLoop(swiper.realIndex, 0, false, true);
      } else {
        swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
    }
    if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
      clearTimeout(swiper.autoplay.resizeTimeout);
      swiper.autoplay.resizeTimeout = setTimeout(() => {
        if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
          swiper.autoplay.resume();
        }
      }, 500);
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
  }
  function onClick(e) {
    const swiper = this;
    if (!swiper.enabled)
      return;
    if (!swiper.allowClick) {
      if (swiper.params.preventClicks)
        e.preventDefault();
      if (swiper.params.preventClicksPropagation && swiper.animating) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
  }
  function onScroll() {
    const swiper = this;
    const {
      wrapperEl,
      rtlTranslate,
      enabled
    } = swiper;
    if (!enabled)
      return;
    swiper.previousTranslate = swiper.translate;
    if (swiper.isHorizontal()) {
      swiper.translate = -wrapperEl.scrollLeft;
    } else {
      swiper.translate = -wrapperEl.scrollTop;
    }
    if (swiper.translate === 0)
      swiper.translate = 0;
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
    let newProgress;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
    }
    if (newProgress !== swiper.progress) {
      swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
    }
    swiper.emit("setTranslate", swiper.translate, false);
  }
  function onLoad(e) {
    const swiper = this;
    processLazyPreloader(swiper, e.target);
    if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) {
      return;
    }
    swiper.update();
  }
  function onDocumentTouchStart() {
    const swiper = this;
    if (swiper.documentTouchHandlerProceeded)
      return;
    swiper.documentTouchHandlerProceeded = true;
    if (swiper.params.touchReleaseOnEdges) {
      swiper.el.style.touchAction = "auto";
    }
  }
  var events = (swiper, method) => {
    const document2 = getDocument();
    const {
      params: params2,
      el,
      wrapperEl,
      device
    } = swiper;
    const capture = !!params2.nested;
    const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
    const swiperMethod = method;
    if (!el || typeof el === "string")
      return;
    document2[domMethod]("touchstart", swiper.onDocumentTouchStart, {
      passive: false,
      capture
    });
    el[domMethod]("touchstart", swiper.onTouchStart, {
      passive: false
    });
    el[domMethod]("pointerdown", swiper.onTouchStart, {
      passive: false
    });
    document2[domMethod]("touchmove", swiper.onTouchMove, {
      passive: false,
      capture
    });
    document2[domMethod]("pointermove", swiper.onTouchMove, {
      passive: false,
      capture
    });
    document2[domMethod]("touchend", swiper.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointerup", swiper.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointercancel", swiper.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("touchcancel", swiper.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointerout", swiper.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointerleave", swiper.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("contextmenu", swiper.onTouchEnd, {
      passive: true
    });
    if (params2.preventClicks || params2.preventClicksPropagation) {
      el[domMethod]("click", swiper.onClick, true);
    }
    if (params2.cssMode) {
      wrapperEl[domMethod]("scroll", swiper.onScroll);
    }
    if (params2.updateOnWindowResize) {
      swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true);
    } else {
      swiper[swiperMethod]("observerUpdate", onResize, true);
    }
    el[domMethod]("load", swiper.onLoad, {
      capture: true
    });
  };
  function attachEvents() {
    const swiper = this;
    const {
      params: params2
    } = swiper;
    swiper.onTouchStart = onTouchStart.bind(swiper);
    swiper.onTouchMove = onTouchMove.bind(swiper);
    swiper.onTouchEnd = onTouchEnd.bind(swiper);
    swiper.onDocumentTouchStart = onDocumentTouchStart.bind(swiper);
    if (params2.cssMode) {
      swiper.onScroll = onScroll.bind(swiper);
    }
    swiper.onClick = onClick.bind(swiper);
    swiper.onLoad = onLoad.bind(swiper);
    events(swiper, "on");
  }
  function detachEvents() {
    const swiper = this;
    events(swiper, "off");
  }
  var events$1 = {
    attachEvents,
    detachEvents
  };
  var isGridEnabled = (swiper, params2) => {
    return swiper.grid && params2.grid && params2.grid.rows > 1;
  };
  function setBreakpoint() {
    const swiper = this;
    const {
      realIndex,
      initialized,
      params: params2,
      el
    } = swiper;
    const breakpoints2 = params2.breakpoints;
    if (!breakpoints2 || breakpoints2 && Object.keys(breakpoints2).length === 0)
      return;
    const document2 = getDocument();
    const breakpointsBase = params2.breakpointsBase === "window" || !params2.breakpointsBase ? params2.breakpointsBase : "container";
    const breakpointContainer = ["window", "container"].includes(params2.breakpointsBase) || !params2.breakpointsBase ? swiper.el : document2.querySelector(params2.breakpointsBase);
    const breakpoint = swiper.getBreakpoint(breakpoints2, breakpointsBase, breakpointContainer);
    if (!breakpoint || swiper.currentBreakpoint === breakpoint)
      return;
    const breakpointOnlyParams = breakpoint in breakpoints2 ? breakpoints2[breakpoint] : void 0;
    const breakpointParams = breakpointOnlyParams || swiper.originalParams;
    const wasMultiRow = isGridEnabled(swiper, params2);
    const isMultiRow = isGridEnabled(swiper, breakpointParams);
    const wasGrabCursor = swiper.params.grabCursor;
    const isGrabCursor = breakpointParams.grabCursor;
    const wasEnabled = params2.enabled;
    if (wasMultiRow && !isMultiRow) {
      el.classList.remove(`${params2.containerModifierClass}grid`, `${params2.containerModifierClass}grid-column`);
      swiper.emitContainerClasses();
    } else if (!wasMultiRow && isMultiRow) {
      el.classList.add(`${params2.containerModifierClass}grid`);
      if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params2.grid.fill === "column") {
        el.classList.add(`${params2.containerModifierClass}grid-column`);
      }
      swiper.emitContainerClasses();
    }
    if (wasGrabCursor && !isGrabCursor) {
      swiper.unsetGrabCursor();
    } else if (!wasGrabCursor && isGrabCursor) {
      swiper.setGrabCursor();
    }
    ["navigation", "pagination", "scrollbar"].forEach((prop) => {
      if (typeof breakpointParams[prop] === "undefined")
        return;
      const wasModuleEnabled = params2[prop] && params2[prop].enabled;
      const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
      if (wasModuleEnabled && !isModuleEnabled) {
        swiper[prop].disable();
      }
      if (!wasModuleEnabled && isModuleEnabled) {
        swiper[prop].enable();
      }
    });
    const directionChanged = breakpointParams.direction && breakpointParams.direction !== params2.direction;
    const needsReLoop = params2.loop && (breakpointParams.slidesPerView !== params2.slidesPerView || directionChanged);
    const wasLoop = params2.loop;
    if (directionChanged && initialized) {
      swiper.changeDirection();
    }
    extend3(swiper.params, breakpointParams);
    const isEnabled = swiper.params.enabled;
    const hasLoop = swiper.params.loop;
    Object.assign(swiper, {
      allowTouchMove: swiper.params.allowTouchMove,
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev
    });
    if (wasEnabled && !isEnabled) {
      swiper.disable();
    } else if (!wasEnabled && isEnabled) {
      swiper.enable();
    }
    swiper.currentBreakpoint = breakpoint;
    swiper.emit("_beforeBreakpoint", breakpointParams);
    if (initialized) {
      if (needsReLoop) {
        swiper.loopDestroy();
        swiper.loopCreate(realIndex);
        swiper.updateSlides();
      } else if (!wasLoop && hasLoop) {
        swiper.loopCreate(realIndex);
        swiper.updateSlides();
      } else if (wasLoop && !hasLoop) {
        swiper.loopDestroy();
      }
    }
    swiper.emit("breakpoint", breakpointParams);
  }
  function getBreakpoint(breakpoints2, base, containerEl) {
    if (base === void 0) {
      base = "window";
    }
    if (!breakpoints2 || base === "container" && !containerEl)
      return void 0;
    let breakpoint = false;
    const window2 = getWindow();
    const currentHeight = base === "window" ? window2.innerHeight : containerEl.clientHeight;
    const points = Object.keys(breakpoints2).map((point) => {
      if (typeof point === "string" && point.indexOf("@") === 0) {
        const minRatio = parseFloat(point.substr(1));
        const value = currentHeight * minRatio;
        return {
          value,
          point
        };
      }
      return {
        value: point,
        point
      };
    });
    points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
    for (let i = 0; i < points.length; i += 1) {
      const {
        point,
        value
      } = points[i];
      if (base === "window") {
        if (window2.matchMedia(`(min-width: ${value}px)`).matches) {
          breakpoint = point;
        }
      } else if (value <= containerEl.clientWidth) {
        breakpoint = point;
      }
    }
    return breakpoint || "max";
  }
  var breakpoints = {
    setBreakpoint,
    getBreakpoint
  };
  function prepareClasses(entries2, prefix) {
    const resultClasses = [];
    entries2.forEach((item) => {
      if (typeof item === "object") {
        Object.keys(item).forEach((classNames) => {
          if (item[classNames]) {
            resultClasses.push(prefix + classNames);
          }
        });
      } else if (typeof item === "string") {
        resultClasses.push(prefix + item);
      }
    });
    return resultClasses;
  }
  function addClasses() {
    const swiper = this;
    const {
      classNames,
      params: params2,
      rtl,
      el,
      device
    } = swiper;
    const suffixes = prepareClasses(["initialized", params2.direction, {
      "free-mode": swiper.params.freeMode && params2.freeMode.enabled
    }, {
      "autoheight": params2.autoHeight
    }, {
      "rtl": rtl
    }, {
      "grid": params2.grid && params2.grid.rows > 1
    }, {
      "grid-column": params2.grid && params2.grid.rows > 1 && params2.grid.fill === "column"
    }, {
      "android": device.android
    }, {
      "ios": device.ios
    }, {
      "css-mode": params2.cssMode
    }, {
      "centered": params2.cssMode && params2.centeredSlides
    }, {
      "watch-progress": params2.watchSlidesProgress
    }], params2.containerModifierClass);
    classNames.push(...suffixes);
    el.classList.add(...classNames);
    swiper.emitContainerClasses();
  }
  function removeClasses() {
    const swiper = this;
    const {
      el,
      classNames
    } = swiper;
    if (!el || typeof el === "string")
      return;
    el.classList.remove(...classNames);
    swiper.emitContainerClasses();
  }
  var classes = {
    addClasses,
    removeClasses
  };
  function checkOverflow() {
    const swiper = this;
    const {
      isLocked: wasLocked,
      params: params2
    } = swiper;
    const {
      slidesOffsetBefore
    } = params2;
    if (slidesOffsetBefore) {
      const lastSlideIndex = swiper.slides.length - 1;
      const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
      swiper.isLocked = swiper.size > lastSlideRightEdge;
    } else {
      swiper.isLocked = swiper.snapGrid.length === 1;
    }
    if (params2.allowSlideNext === true) {
      swiper.allowSlideNext = !swiper.isLocked;
    }
    if (params2.allowSlidePrev === true) {
      swiper.allowSlidePrev = !swiper.isLocked;
    }
    if (wasLocked && wasLocked !== swiper.isLocked) {
      swiper.isEnd = false;
    }
    if (wasLocked !== swiper.isLocked) {
      swiper.emit(swiper.isLocked ? "lock" : "unlock");
    }
  }
  var checkOverflow$1 = {
    checkOverflow
  };
  var defaults3 = {
    init: true,
    direction: "horizontal",
    oneWayMovement: false,
    swiperElementNodeName: "SWIPER-CONTAINER",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: false,
    updateOnWindowResize: true,
    resizeObserver: true,
    nested: false,
    createElements: false,
    eventsPrefix: "swiper",
    enabled: true,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: false,
    userAgent: null,
    url: null,
    edgeSwipeDetection: false,
    edgeSwipeThreshold: 20,
    autoHeight: false,
    setWrapperSize: false,
    virtualTranslate: false,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: false,
    centeredSlides: false,
    centeredSlidesBounds: false,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: true,
    centerInsufficientSlides: false,
    watchOverflow: true,
    roundLengths: false,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    allowTouchMove: true,
    threshold: 5,
    touchMoveStopPropagation: false,
    touchStartPreventDefault: true,
    touchStartForcePreventDefault: false,
    touchReleaseOnEdges: false,
    uniqueNavElements: true,
    resistance: true,
    resistanceRatio: 0.85,
    watchSlidesProgress: false,
    grabCursor: false,
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,
    loop: false,
    loopAddBlankSlides: true,
    loopAdditionalSlides: 0,
    loopPreventsSliding: true,
    rewind: false,
    allowSlidePrev: true,
    allowSlideNext: true,
    swipeHandler: null,
    noSwiping: true,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: true,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: true,
    _emitClasses: false
  };
  function moduleExtendParams(params2, allModulesParams) {
    return function extendParams(obj) {
      if (obj === void 0) {
        obj = {};
      }
      const moduleParamName = Object.keys(obj)[0];
      const moduleParams = obj[moduleParamName];
      if (typeof moduleParams !== "object" || moduleParams === null) {
        extend3(allModulesParams, obj);
        return;
      }
      if (params2[moduleParamName] === true) {
        params2[moduleParamName] = {
          enabled: true
        };
      }
      if (moduleParamName === "navigation" && params2[moduleParamName] && params2[moduleParamName].enabled && !params2[moduleParamName].prevEl && !params2[moduleParamName].nextEl) {
        params2[moduleParamName].auto = true;
      }
      if (["pagination", "scrollbar"].indexOf(moduleParamName) >= 0 && params2[moduleParamName] && params2[moduleParamName].enabled && !params2[moduleParamName].el) {
        params2[moduleParamName].auto = true;
      }
      if (!(moduleParamName in params2 && "enabled" in moduleParams)) {
        extend3(allModulesParams, obj);
        return;
      }
      if (typeof params2[moduleParamName] === "object" && !("enabled" in params2[moduleParamName])) {
        params2[moduleParamName].enabled = true;
      }
      if (!params2[moduleParamName])
        params2[moduleParamName] = {
          enabled: false
        };
      extend3(allModulesParams, obj);
    };
  }
  var prototypes = {
    eventsEmitter,
    update,
    translate,
    transition,
    slide,
    loop,
    grabCursor,
    events: events$1,
    breakpoints,
    checkOverflow: checkOverflow$1,
    classes
  };
  var extendedDefaults = {};
  var Swiper = class {
    constructor() {
      let el;
      let params2;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") {
        params2 = args[0];
      } else {
        [el, params2] = args;
      }
      if (!params2)
        params2 = {};
      params2 = extend3({}, params2);
      if (el && !params2.el)
        params2.el = el;
      const document2 = getDocument();
      if (params2.el && typeof params2.el === "string" && document2.querySelectorAll(params2.el).length > 1) {
        const swipers = [];
        document2.querySelectorAll(params2.el).forEach((containerEl) => {
          const newParams = extend3({}, params2, {
            el: containerEl
          });
          swipers.push(new Swiper(newParams));
        });
        return swipers;
      }
      const swiper = this;
      swiper.__swiper__ = true;
      swiper.support = getSupport();
      swiper.device = getDevice({
        userAgent: params2.userAgent
      });
      swiper.browser = getBrowser();
      swiper.eventsListeners = {};
      swiper.eventsAnyListeners = [];
      swiper.modules = [...swiper.__modules__];
      if (params2.modules && Array.isArray(params2.modules)) {
        swiper.modules.push(...params2.modules);
      }
      const allModulesParams = {};
      swiper.modules.forEach((mod) => {
        mod({
          params: params2,
          swiper,
          extendParams: moduleExtendParams(params2, allModulesParams),
          on: swiper.on.bind(swiper),
          once: swiper.once.bind(swiper),
          off: swiper.off.bind(swiper),
          emit: swiper.emit.bind(swiper)
        });
      });
      const swiperParams = extend3({}, defaults3, allModulesParams);
      swiper.params = extend3({}, swiperParams, extendedDefaults, params2);
      swiper.originalParams = extend3({}, swiper.params);
      swiper.passedParams = extend3({}, params2);
      if (swiper.params && swiper.params.on) {
        Object.keys(swiper.params.on).forEach((eventName) => {
          swiper.on(eventName, swiper.params.on[eventName]);
        });
      }
      if (swiper.params && swiper.params.onAny) {
        swiper.onAny(swiper.params.onAny);
      }
      Object.assign(swiper, {
        enabled: swiper.params.enabled,
        el,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return swiper.params.direction === "horizontal";
        },
        isVertical() {
          return swiper.params.direction === "vertical";
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: true,
        isEnd: false,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: false,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
        },
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: swiper.params.focusableElements,
          lastClickTime: 0,
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          pointerId: null,
          touchId: null
        },
        allowClick: true,
        allowTouchMove: swiper.params.allowTouchMove,
        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0
        },
        imagesToLoad: [],
        imagesLoaded: 0
      });
      swiper.emit("_swiper");
      if (swiper.params.init) {
        swiper.init();
      }
      return swiper;
    }
    getDirectionLabel(property) {
      if (this.isHorizontal()) {
        return property;
      }
      return {
        "width": "height",
        "margin-top": "margin-left",
        "margin-bottom ": "margin-right",
        "margin-left": "margin-top",
        "margin-right": "margin-bottom",
        "padding-left": "padding-top",
        "padding-right": "padding-bottom",
        "marginRight": "marginBottom"
      }[property];
    }
    getSlideIndex(slideEl) {
      const {
        slidesEl,
        params: params2
      } = this;
      const slides = elementChildren(slidesEl, `.${params2.slideClass}, swiper-slide`);
      const firstSlideIndex = elementIndex(slides[0]);
      return elementIndex(slideEl) - firstSlideIndex;
    }
    getSlideIndexByData(index) {
      return this.getSlideIndex(this.slides.find((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === index));
    }
    getSlideIndexWhenGrid(index) {
      if (this.grid && this.params.grid && this.params.grid.rows > 1) {
        if (this.params.grid.fill === "column") {
          index = Math.floor(index / this.params.grid.rows);
        } else if (this.params.grid.fill === "row") {
          index = index % Math.ceil(this.slides.length / this.params.grid.rows);
        }
      }
      return index;
    }
    recalcSlides() {
      const swiper = this;
      const {
        slidesEl,
        params: params2
      } = swiper;
      swiper.slides = elementChildren(slidesEl, `.${params2.slideClass}, swiper-slide`);
    }
    enable() {
      const swiper = this;
      if (swiper.enabled)
        return;
      swiper.enabled = true;
      if (swiper.params.grabCursor) {
        swiper.setGrabCursor();
      }
      swiper.emit("enable");
    }
    disable() {
      const swiper = this;
      if (!swiper.enabled)
        return;
      swiper.enabled = false;
      if (swiper.params.grabCursor) {
        swiper.unsetGrabCursor();
      }
      swiper.emit("disable");
    }
    setProgress(progress, speed) {
      const swiper = this;
      progress = Math.min(Math.max(progress, 0), 1);
      const min = swiper.minTranslate();
      const max = swiper.maxTranslate();
      const current = (max - min) * progress + min;
      swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    emitContainerClasses() {
      const swiper = this;
      if (!swiper.params._emitClasses || !swiper.el)
        return;
      const cls = swiper.el.className.split(" ").filter((className) => {
        return className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
      });
      swiper.emit("_containerClasses", cls.join(" "));
    }
    getSlideClasses(slideEl) {
      const swiper = this;
      if (swiper.destroyed)
        return "";
      return slideEl.className.split(" ").filter((className) => {
        return className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0;
      }).join(" ");
    }
    emitSlidesClasses() {
      const swiper = this;
      if (!swiper.params._emitClasses || !swiper.el)
        return;
      const updates = [];
      swiper.slides.forEach((slideEl) => {
        const classNames = swiper.getSlideClasses(slideEl);
        updates.push({
          slideEl,
          classNames
        });
        swiper.emit("_slideClass", slideEl, classNames);
      });
      swiper.emit("_slideClasses", updates);
    }
    slidesPerViewDynamic(view, exact) {
      if (view === void 0) {
        view = "current";
      }
      if (exact === void 0) {
        exact = false;
      }
      const swiper = this;
      const {
        params: params2,
        slides,
        slidesGrid,
        slidesSizesGrid,
        size: swiperSize,
        activeIndex
      } = swiper;
      let spv = 1;
      if (typeof params2.slidesPerView === "number")
        return params2.slidesPerView;
      if (params2.centeredSlides) {
        let slideSize = slides[activeIndex] ? Math.ceil(slides[activeIndex].swiperSlideSize) : 0;
        let breakLoop;
        for (let i = activeIndex + 1; i < slides.length; i += 1) {
          if (slides[i] && !breakLoop) {
            slideSize += Math.ceil(slides[i].swiperSlideSize);
            spv += 1;
            if (slideSize > swiperSize)
              breakLoop = true;
          }
        }
        for (let i = activeIndex - 1; i >= 0; i -= 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize)
              breakLoop = true;
          }
        }
      } else {
        if (view === "current") {
          for (let i = activeIndex + 1; i < slides.length; i += 1) {
            const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
            if (slideInView) {
              spv += 1;
            }
          }
        } else {
          for (let i = activeIndex - 1; i >= 0; i -= 1) {
            const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
            if (slideInView) {
              spv += 1;
            }
          }
        }
      }
      return spv;
    }
    update() {
      const swiper = this;
      if (!swiper || swiper.destroyed)
        return;
      const {
        snapGrid,
        params: params2
      } = swiper;
      if (params2.breakpoints) {
        swiper.setBreakpoint();
      }
      [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
        if (imageEl.complete) {
          processLazyPreloader(swiper, imageEl);
        }
      });
      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();
      function setTranslate2() {
        const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
        const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
        swiper.setTranslate(newTranslate);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      let translated;
      if (params2.freeMode && params2.freeMode.enabled && !params2.cssMode) {
        setTranslate2();
        if (params2.autoHeight) {
          swiper.updateAutoHeight();
        }
      } else {
        if ((params2.slidesPerView === "auto" || params2.slidesPerView > 1) && swiper.isEnd && !params2.centeredSlides) {
          const slides = swiper.virtual && params2.virtual.enabled ? swiper.virtual.slides : swiper.slides;
          translated = swiper.slideTo(slides.length - 1, 0, false, true);
        } else {
          translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
        }
        if (!translated) {
          setTranslate2();
        }
      }
      if (params2.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }
      swiper.emit("update");
    }
    changeDirection(newDirection, needUpdate) {
      if (needUpdate === void 0) {
        needUpdate = true;
      }
      const swiper = this;
      const currentDirection = swiper.params.direction;
      if (!newDirection) {
        newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
      }
      if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") {
        return swiper;
      }
      swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
      swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
      swiper.emitContainerClasses();
      swiper.params.direction = newDirection;
      swiper.slides.forEach((slideEl) => {
        if (newDirection === "vertical") {
          slideEl.style.width = "";
        } else {
          slideEl.style.height = "";
        }
      });
      swiper.emit("changeDirection");
      if (needUpdate)
        swiper.update();
      return swiper;
    }
    changeLanguageDirection(direction) {
      const swiper = this;
      if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr")
        return;
      swiper.rtl = direction === "rtl";
      swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
      if (swiper.rtl) {
        swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
        swiper.el.dir = "rtl";
      } else {
        swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
        swiper.el.dir = "ltr";
      }
      swiper.update();
    }
    mount(element) {
      const swiper = this;
      if (swiper.mounted)
        return true;
      let el = element || swiper.params.el;
      if (typeof el === "string") {
        el = document.querySelector(el);
      }
      if (!el) {
        return false;
      }
      el.swiper = swiper;
      if (el.parentNode && el.parentNode.host && el.parentNode.host.nodeName === swiper.params.swiperElementNodeName.toUpperCase()) {
        swiper.isElement = true;
      }
      const getWrapperSelector = () => {
        return `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
      };
      const getWrapper = () => {
        if (el && el.shadowRoot && el.shadowRoot.querySelector) {
          const res = el.shadowRoot.querySelector(getWrapperSelector());
          return res;
        }
        return elementChildren(el, getWrapperSelector())[0];
      };
      let wrapperEl = getWrapper();
      if (!wrapperEl && swiper.params.createElements) {
        wrapperEl = createElement2("div", swiper.params.wrapperClass);
        el.append(wrapperEl);
        elementChildren(el, `.${swiper.params.slideClass}`).forEach((slideEl) => {
          wrapperEl.append(slideEl);
        });
      }
      Object.assign(swiper, {
        el,
        wrapperEl,
        slidesEl: swiper.isElement && !el.parentNode.host.slideSlots ? el.parentNode.host : wrapperEl,
        hostEl: swiper.isElement ? el.parentNode.host : el,
        mounted: true,
        rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
        rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
        wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
      });
      return true;
    }
    init(el) {
      const swiper = this;
      if (swiper.initialized)
        return swiper;
      const mounted = swiper.mount(el);
      if (mounted === false)
        return swiper;
      swiper.emit("beforeInit");
      if (swiper.params.breakpoints) {
        swiper.setBreakpoint();
      }
      swiper.addClasses();
      swiper.updateSize();
      swiper.updateSlides();
      if (swiper.params.watchOverflow) {
        swiper.checkOverflow();
      }
      if (swiper.params.grabCursor && swiper.enabled) {
        swiper.setGrabCursor();
      }
      if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
        swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true);
      } else {
        swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
      }
      if (swiper.params.loop) {
        swiper.loopCreate(void 0, true);
      }
      swiper.attachEvents();
      const lazyElements = [...swiper.el.querySelectorAll('[loading="lazy"]')];
      if (swiper.isElement) {
        lazyElements.push(...swiper.hostEl.querySelectorAll('[loading="lazy"]'));
      }
      lazyElements.forEach((imageEl) => {
        if (imageEl.complete) {
          processLazyPreloader(swiper, imageEl);
        } else {
          imageEl.addEventListener("load", (e) => {
            processLazyPreloader(swiper, e.target);
          });
        }
      });
      preload(swiper);
      swiper.initialized = true;
      preload(swiper);
      swiper.emit("init");
      swiper.emit("afterInit");
      return swiper;
    }
    destroy(deleteInstance, cleanStyles) {
      if (deleteInstance === void 0) {
        deleteInstance = true;
      }
      if (cleanStyles === void 0) {
        cleanStyles = true;
      }
      const swiper = this;
      const {
        params: params2,
        el,
        wrapperEl,
        slides
      } = swiper;
      if (typeof swiper.params === "undefined" || swiper.destroyed) {
        return null;
      }
      swiper.emit("beforeDestroy");
      swiper.initialized = false;
      swiper.detachEvents();
      if (params2.loop) {
        swiper.loopDestroy();
      }
      if (cleanStyles) {
        swiper.removeClasses();
        if (el && typeof el !== "string") {
          el.removeAttribute("style");
        }
        if (wrapperEl) {
          wrapperEl.removeAttribute("style");
        }
        if (slides && slides.length) {
          slides.forEach((slideEl) => {
            slideEl.classList.remove(params2.slideVisibleClass, params2.slideFullyVisibleClass, params2.slideActiveClass, params2.slideNextClass, params2.slidePrevClass);
            slideEl.removeAttribute("style");
            slideEl.removeAttribute("data-swiper-slide-index");
          });
        }
      }
      swiper.emit("destroy");
      Object.keys(swiper.eventsListeners).forEach((eventName) => {
        swiper.off(eventName);
      });
      if (deleteInstance !== false) {
        if (swiper.el && typeof swiper.el !== "string") {
          swiper.el.swiper = null;
        }
        deleteProps(swiper);
      }
      swiper.destroyed = true;
      return null;
    }
    static extendDefaults(newDefaults) {
      extend3(extendedDefaults, newDefaults);
    }
    static get extendedDefaults() {
      return extendedDefaults;
    }
    static get defaults() {
      return defaults3;
    }
    static installModule(mod) {
      if (!Swiper.prototype.__modules__)
        Swiper.prototype.__modules__ = [];
      const modules = Swiper.prototype.__modules__;
      if (typeof mod === "function" && modules.indexOf(mod) < 0) {
        modules.push(mod);
      }
    }
    static use(module) {
      if (Array.isArray(module)) {
        module.forEach((m) => Swiper.installModule(m));
        return Swiper;
      }
      Swiper.installModule(module);
      return Swiper;
    }
  };
  Object.keys(prototypes).forEach((prototypeGroup) => {
    Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
      Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
    });
  });
  Swiper.use([Resize, Observer2]);

  // node_modules/.pnpm/swiper@11.2.10/node_modules/swiper/modules/keyboard.mjs
  function Keyboard(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    const document2 = getDocument();
    const window2 = getWindow();
    swiper.keyboard = {
      enabled: false
    };
    extendParams({
      keyboard: {
        enabled: false,
        onlyInViewport: true,
        pageUpDown: true
      }
    });
    function handle(event2) {
      if (!swiper.enabled)
        return;
      const {
        rtlTranslate: rtl
      } = swiper;
      let e = event2;
      if (e.originalEvent)
        e = e.originalEvent;
      const kc = e.keyCode || e.charCode;
      const pageUpDown = swiper.params.keyboard.pageUpDown;
      const isPageUp = pageUpDown && kc === 33;
      const isPageDown = pageUpDown && kc === 34;
      const isArrowLeft = kc === 37;
      const isArrowRight = kc === 39;
      const isArrowUp = kc === 38;
      const isArrowDown = kc === 40;
      if (!swiper.allowSlideNext && (swiper.isHorizontal() && isArrowRight || swiper.isVertical() && isArrowDown || isPageDown)) {
        return false;
      }
      if (!swiper.allowSlidePrev && (swiper.isHorizontal() && isArrowLeft || swiper.isVertical() && isArrowUp || isPageUp)) {
        return false;
      }
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
        return void 0;
      }
      if (document2.activeElement && (document2.activeElement.isContentEditable || document2.activeElement.nodeName && (document2.activeElement.nodeName.toLowerCase() === "input" || document2.activeElement.nodeName.toLowerCase() === "textarea"))) {
        return void 0;
      }
      if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
        let inView = false;
        if (elementParents(swiper.el, `.${swiper.params.slideClass}, swiper-slide`).length > 0 && elementParents(swiper.el, `.${swiper.params.slideActiveClass}`).length === 0) {
          return void 0;
        }
        const el = swiper.el;
        const swiperWidth = el.clientWidth;
        const swiperHeight = el.clientHeight;
        const windowWidth = window2.innerWidth;
        const windowHeight = window2.innerHeight;
        const swiperOffset = elementOffset(el);
        if (rtl)
          swiperOffset.left -= el.scrollLeft;
        const swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiperWidth, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiperHeight], [swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight]];
        for (let i = 0; i < swiperCoord.length; i += 1) {
          const point = swiperCoord[i];
          if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
            if (point[0] === 0 && point[1] === 0)
              continue;
            inView = true;
          }
        }
        if (!inView)
          return void 0;
      }
      if (swiper.isHorizontal()) {
        if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
          if (e.preventDefault)
            e.preventDefault();
          else
            e.returnValue = false;
        }
        if ((isPageDown || isArrowRight) && !rtl || (isPageUp || isArrowLeft) && rtl)
          swiper.slideNext();
        if ((isPageUp || isArrowLeft) && !rtl || (isPageDown || isArrowRight) && rtl)
          swiper.slidePrev();
      } else {
        if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
          if (e.preventDefault)
            e.preventDefault();
          else
            e.returnValue = false;
        }
        if (isPageDown || isArrowDown)
          swiper.slideNext();
        if (isPageUp || isArrowUp)
          swiper.slidePrev();
      }
      emit("keyPress", kc);
      return void 0;
    }
    function enable() {
      if (swiper.keyboard.enabled)
        return;
      document2.addEventListener("keydown", handle);
      swiper.keyboard.enabled = true;
    }
    function disable() {
      if (!swiper.keyboard.enabled)
        return;
      document2.removeEventListener("keydown", handle);
      swiper.keyboard.enabled = false;
    }
    on("init", () => {
      if (swiper.params.keyboard.enabled) {
        enable();
      }
    });
    on("destroy", () => {
      if (swiper.keyboard.enabled) {
        disable();
      }
    });
    Object.assign(swiper.keyboard, {
      enable,
      disable
    });
  }

  // node_modules/.pnpm/swiper@11.2.10/node_modules/swiper/shared/create-element-if-not-defined.mjs
  function createElementIfNotDefined(swiper, originalParams, params2, checkProps) {
    if (swiper.params.createElements) {
      Object.keys(checkProps).forEach((key) => {
        if (!params2[key] && params2.auto === true) {
          let element = elementChildren(swiper.el, `.${checkProps[key]}`)[0];
          if (!element) {
            element = createElement2("div", checkProps[key]);
            element.className = checkProps[key];
            swiper.el.append(element);
          }
          params2[key] = element;
          originalParams[key] = element;
        }
      });
    }
    return params2;
  }

  // node_modules/.pnpm/swiper@11.2.10/node_modules/swiper/modules/navigation.mjs
  function Navigation(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    extendParams({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: false,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled"
      }
    });
    swiper.navigation = {
      nextEl: null,
      prevEl: null
    };
    function getEl(el) {
      let res;
      if (el && typeof el === "string" && swiper.isElement) {
        res = swiper.el.querySelector(el) || swiper.hostEl.querySelector(el);
        if (res)
          return res;
      }
      if (el) {
        if (typeof el === "string")
          res = [...document.querySelectorAll(el)];
        if (swiper.params.uniqueNavElements && typeof el === "string" && res && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) {
          res = swiper.el.querySelector(el);
        } else if (res && res.length === 1) {
          res = res[0];
        }
      }
      if (el && !res)
        return el;
      return res;
    }
    function toggleEl(el, disabled) {
      const params2 = swiper.params.navigation;
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        if (subEl) {
          subEl.classList[disabled ? "add" : "remove"](...params2.disabledClass.split(" "));
          if (subEl.tagName === "BUTTON")
            subEl.disabled = disabled;
          if (swiper.params.watchOverflow && swiper.enabled) {
            subEl.classList[swiper.isLocked ? "add" : "remove"](params2.lockClass);
          }
        }
      });
    }
    function update2() {
      const {
        nextEl,
        prevEl
      } = swiper.navigation;
      if (swiper.params.loop) {
        toggleEl(prevEl, false);
        toggleEl(nextEl, false);
        return;
      }
      toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
      toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
    }
    function onPrevClick(e) {
      e.preventDefault();
      if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind)
        return;
      swiper.slidePrev();
      emit("navigationPrev");
    }
    function onNextClick(e) {
      e.preventDefault();
      if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind)
        return;
      swiper.slideNext();
      emit("navigationNext");
    }
    function init6() {
      const params2 = swiper.params.navigation;
      swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
        nextEl: "swiper-button-next",
        prevEl: "swiper-button-prev"
      });
      if (!(params2.nextEl || params2.prevEl))
        return;
      let nextEl = getEl(params2.nextEl);
      let prevEl = getEl(params2.prevEl);
      Object.assign(swiper.navigation, {
        nextEl,
        prevEl
      });
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const initButton = (el, dir) => {
        if (el) {
          el.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
        }
        if (!swiper.enabled && el) {
          el.classList.add(...params2.lockClass.split(" "));
        }
      };
      nextEl.forEach((el) => initButton(el, "next"));
      prevEl.forEach((el) => initButton(el, "prev"));
    }
    function destroy() {
      let {
        nextEl,
        prevEl
      } = swiper.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const destroyButton = (el, dir) => {
        el.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
        el.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
      };
      nextEl.forEach((el) => destroyButton(el, "next"));
      prevEl.forEach((el) => destroyButton(el, "prev"));
    }
    on("init", () => {
      if (swiper.params.navigation.enabled === false) {
        disable();
      } else {
        init6();
        update2();
      }
    });
    on("toEdge fromEdge lock unlock", () => {
      update2();
    });
    on("destroy", () => {
      destroy();
    });
    on("enable disable", () => {
      let {
        nextEl,
        prevEl
      } = swiper.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      if (swiper.enabled) {
        update2();
        return;
      }
      [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.add(swiper.params.navigation.lockClass));
    });
    on("click", (_s, e) => {
      let {
        nextEl,
        prevEl
      } = swiper.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const targetEl = e.target;
      let targetIsButton = prevEl.includes(targetEl) || nextEl.includes(targetEl);
      if (swiper.isElement && !targetIsButton) {
        const path = e.path || e.composedPath && e.composedPath();
        if (path) {
          targetIsButton = path.find((pathEl) => nextEl.includes(pathEl) || prevEl.includes(pathEl));
        }
      }
      if (swiper.params.navigation.hideOnClick && !targetIsButton) {
        if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl)))
          return;
        let isHidden;
        if (nextEl.length) {
          isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass);
        } else if (prevEl.length) {
          isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
        }
        if (isHidden === true) {
          emit("navigationShow");
        } else {
          emit("navigationHide");
        }
        [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.toggle(swiper.params.navigation.hiddenClass));
      }
    });
    const enable = () => {
      swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(" "));
      init6();
      update2();
    };
    const disable = () => {
      swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(" "));
      destroy();
    };
    Object.assign(swiper.navigation, {
      enable,
      disable,
      update: update2,
      init: init6,
      destroy
    });
  }

  // node_modules/.pnpm/swiper@11.2.10/node_modules/swiper/shared/classes-to-selector.mjs
  function classesToSelector(classes2) {
    if (classes2 === void 0) {
      classes2 = "";
    }
    return `.${classes2.trim().replace(/([\.:!+\/()[\]])/g, "\\$1").replace(/ /g, ".")}`;
  }

  // node_modules/.pnpm/swiper@11.2.10/node_modules/swiper/modules/scrollbar.mjs
  function Scrollbar(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    const document2 = getDocument();
    let isTouched = false;
    let timeout = null;
    let dragTimeout = null;
    let dragStartPos;
    let dragSize;
    let trackSize;
    let divider;
    extendParams({
      scrollbar: {
        el: null,
        dragSize: "auto",
        hide: false,
        draggable: false,
        snapOnRelease: true,
        lockClass: "swiper-scrollbar-lock",
        dragClass: "swiper-scrollbar-drag",
        scrollbarDisabledClass: "swiper-scrollbar-disabled",
        horizontalClass: `swiper-scrollbar-horizontal`,
        verticalClass: `swiper-scrollbar-vertical`
      }
    });
    swiper.scrollbar = {
      el: null,
      dragEl: null
    };
    function setTranslate2() {
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el)
        return;
      const {
        scrollbar,
        rtlTranslate: rtl
      } = swiper;
      const {
        dragEl,
        el
      } = scrollbar;
      const params2 = swiper.params.scrollbar;
      const progress = swiper.params.loop ? swiper.progressLoop : swiper.progress;
      let newSize = dragSize;
      let newPos = (trackSize - dragSize) * progress;
      if (rtl) {
        newPos = -newPos;
        if (newPos > 0) {
          newSize = dragSize - newPos;
          newPos = 0;
        } else if (-newPos + dragSize > trackSize) {
          newSize = trackSize + newPos;
        }
      } else if (newPos < 0) {
        newSize = dragSize + newPos;
        newPos = 0;
      } else if (newPos + dragSize > trackSize) {
        newSize = trackSize - newPos;
      }
      if (swiper.isHorizontal()) {
        dragEl.style.transform = `translate3d(${newPos}px, 0, 0)`;
        dragEl.style.width = `${newSize}px`;
      } else {
        dragEl.style.transform = `translate3d(0px, ${newPos}px, 0)`;
        dragEl.style.height = `${newSize}px`;
      }
      if (params2.hide) {
        clearTimeout(timeout);
        el.style.opacity = 1;
        timeout = setTimeout(() => {
          el.style.opacity = 0;
          el.style.transitionDuration = "400ms";
        }, 1e3);
      }
    }
    function setTransition2(duration) {
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el)
        return;
      swiper.scrollbar.dragEl.style.transitionDuration = `${duration}ms`;
    }
    function updateSize2() {
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el)
        return;
      const {
        scrollbar
      } = swiper;
      const {
        dragEl,
        el
      } = scrollbar;
      dragEl.style.width = "";
      dragEl.style.height = "";
      trackSize = swiper.isHorizontal() ? el.offsetWidth : el.offsetHeight;
      divider = swiper.size / (swiper.virtualSize + swiper.params.slidesOffsetBefore - (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));
      if (swiper.params.scrollbar.dragSize === "auto") {
        dragSize = trackSize * divider;
      } else {
        dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
      }
      if (swiper.isHorizontal()) {
        dragEl.style.width = `${dragSize}px`;
      } else {
        dragEl.style.height = `${dragSize}px`;
      }
      if (divider >= 1) {
        el.style.display = "none";
      } else {
        el.style.display = "";
      }
      if (swiper.params.scrollbar.hide) {
        el.style.opacity = 0;
      }
      if (swiper.params.watchOverflow && swiper.enabled) {
        scrollbar.el.classList[swiper.isLocked ? "add" : "remove"](swiper.params.scrollbar.lockClass);
      }
    }
    function getPointerPosition(e) {
      return swiper.isHorizontal() ? e.clientX : e.clientY;
    }
    function setDragPosition(e) {
      const {
        scrollbar,
        rtlTranslate: rtl
      } = swiper;
      const {
        el
      } = scrollbar;
      let positionRatio;
      positionRatio = (getPointerPosition(e) - elementOffset(el)[swiper.isHorizontal() ? "left" : "top"] - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
      positionRatio = Math.max(Math.min(positionRatio, 1), 0);
      if (rtl) {
        positionRatio = 1 - positionRatio;
      }
      const position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
      swiper.updateProgress(position);
      swiper.setTranslate(position);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    function onDragStart(e) {
      const params2 = swiper.params.scrollbar;
      const {
        scrollbar,
        wrapperEl
      } = swiper;
      const {
        el,
        dragEl
      } = scrollbar;
      isTouched = true;
      dragStartPos = e.target === dragEl ? getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? "left" : "top"] : null;
      e.preventDefault();
      e.stopPropagation();
      wrapperEl.style.transitionDuration = "100ms";
      dragEl.style.transitionDuration = "100ms";
      setDragPosition(e);
      clearTimeout(dragTimeout);
      el.style.transitionDuration = "0ms";
      if (params2.hide) {
        el.style.opacity = 1;
      }
      if (swiper.params.cssMode) {
        swiper.wrapperEl.style["scroll-snap-type"] = "none";
      }
      emit("scrollbarDragStart", e);
    }
    function onDragMove(e) {
      const {
        scrollbar,
        wrapperEl
      } = swiper;
      const {
        el,
        dragEl
      } = scrollbar;
      if (!isTouched)
        return;
      if (e.preventDefault && e.cancelable)
        e.preventDefault();
      else
        e.returnValue = false;
      setDragPosition(e);
      wrapperEl.style.transitionDuration = "0ms";
      el.style.transitionDuration = "0ms";
      dragEl.style.transitionDuration = "0ms";
      emit("scrollbarDragMove", e);
    }
    function onDragEnd(e) {
      const params2 = swiper.params.scrollbar;
      const {
        scrollbar,
        wrapperEl
      } = swiper;
      const {
        el
      } = scrollbar;
      if (!isTouched)
        return;
      isTouched = false;
      if (swiper.params.cssMode) {
        swiper.wrapperEl.style["scroll-snap-type"] = "";
        wrapperEl.style.transitionDuration = "";
      }
      if (params2.hide) {
        clearTimeout(dragTimeout);
        dragTimeout = nextTick(() => {
          el.style.opacity = 0;
          el.style.transitionDuration = "400ms";
        }, 1e3);
      }
      emit("scrollbarDragEnd", e);
      if (params2.snapOnRelease) {
        swiper.slideToClosest();
      }
    }
    function events2(method) {
      const {
        scrollbar,
        params: params2
      } = swiper;
      const el = scrollbar.el;
      if (!el)
        return;
      const target = el;
      const activeListener = params2.passiveListeners ? {
        passive: false,
        capture: false
      } : false;
      const passiveListener = params2.passiveListeners ? {
        passive: true,
        capture: false
      } : false;
      if (!target)
        return;
      const eventMethod = method === "on" ? "addEventListener" : "removeEventListener";
      target[eventMethod]("pointerdown", onDragStart, activeListener);
      document2[eventMethod]("pointermove", onDragMove, activeListener);
      document2[eventMethod]("pointerup", onDragEnd, passiveListener);
    }
    function enableDraggable() {
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el)
        return;
      events2("on");
    }
    function disableDraggable() {
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el)
        return;
      events2("off");
    }
    function init6() {
      const {
        scrollbar,
        el: swiperEl
      } = swiper;
      swiper.params.scrollbar = createElementIfNotDefined(swiper, swiper.originalParams.scrollbar, swiper.params.scrollbar, {
        el: "swiper-scrollbar"
      });
      const params2 = swiper.params.scrollbar;
      if (!params2.el)
        return;
      let el;
      if (typeof params2.el === "string" && swiper.isElement) {
        el = swiper.el.querySelector(params2.el);
      }
      if (!el && typeof params2.el === "string") {
        el = document2.querySelectorAll(params2.el);
        if (!el.length)
          return;
      } else if (!el) {
        el = params2.el;
      }
      if (swiper.params.uniqueNavElements && typeof params2.el === "string" && el.length > 1 && swiperEl.querySelectorAll(params2.el).length === 1) {
        el = swiperEl.querySelector(params2.el);
      }
      if (el.length > 0)
        el = el[0];
      el.classList.add(swiper.isHorizontal() ? params2.horizontalClass : params2.verticalClass);
      let dragEl;
      if (el) {
        dragEl = el.querySelector(classesToSelector(swiper.params.scrollbar.dragClass));
        if (!dragEl) {
          dragEl = createElement2("div", swiper.params.scrollbar.dragClass);
          el.append(dragEl);
        }
      }
      Object.assign(scrollbar, {
        el,
        dragEl
      });
      if (params2.draggable) {
        enableDraggable();
      }
      if (el) {
        el.classList[swiper.enabled ? "remove" : "add"](...classesToTokens(swiper.params.scrollbar.lockClass));
      }
    }
    function destroy() {
      const params2 = swiper.params.scrollbar;
      const el = swiper.scrollbar.el;
      if (el) {
        el.classList.remove(...classesToTokens(swiper.isHorizontal() ? params2.horizontalClass : params2.verticalClass));
      }
      disableDraggable();
    }
    on("changeDirection", () => {
      if (!swiper.scrollbar || !swiper.scrollbar.el)
        return;
      const params2 = swiper.params.scrollbar;
      let {
        el
      } = swiper.scrollbar;
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        subEl.classList.remove(params2.horizontalClass, params2.verticalClass);
        subEl.classList.add(swiper.isHorizontal() ? params2.horizontalClass : params2.verticalClass);
      });
    });
    on("init", () => {
      if (swiper.params.scrollbar.enabled === false) {
        disable();
      } else {
        init6();
        updateSize2();
        setTranslate2();
      }
    });
    on("update resize observerUpdate lock unlock changeDirection", () => {
      updateSize2();
    });
    on("setTranslate", () => {
      setTranslate2();
    });
    on("setTransition", (_s, duration) => {
      setTransition2(duration);
    });
    on("enable disable", () => {
      const {
        el
      } = swiper.scrollbar;
      if (el) {
        el.classList[swiper.enabled ? "remove" : "add"](...classesToTokens(swiper.params.scrollbar.lockClass));
      }
    });
    on("destroy", () => {
      destroy();
    });
    const enable = () => {
      swiper.el.classList.remove(...classesToTokens(swiper.params.scrollbar.scrollbarDisabledClass));
      if (swiper.scrollbar.el) {
        swiper.scrollbar.el.classList.remove(...classesToTokens(swiper.params.scrollbar.scrollbarDisabledClass));
      }
      init6();
      updateSize2();
      setTranslate2();
    };
    const disable = () => {
      swiper.el.classList.add(...classesToTokens(swiper.params.scrollbar.scrollbarDisabledClass));
      if (swiper.scrollbar.el) {
        swiper.scrollbar.el.classList.add(...classesToTokens(swiper.params.scrollbar.scrollbarDisabledClass));
      }
      destroy();
    };
    Object.assign(swiper.scrollbar, {
      enable,
      disable,
      updateSize: updateSize2,
      setTranslate: setTranslate2,
      init: init6,
      destroy
    });
  }

  // node_modules/.pnpm/lenis@1.3.11/node_modules/lenis/dist/lenis.mjs
  var version = "1.3.11";
  function clamp3(min, input, max) {
    return Math.max(min, Math.min(input, max));
  }
  function lerp(x, y, t) {
    return (1 - t) * x + t * y;
  }
  function damp(x, y, lambda, deltaTime) {
    return lerp(x, y, 1 - Math.exp(-lambda * deltaTime));
  }
  function modulo(n, d) {
    return (n % d + d) % d;
  }
  var Animate = class {
    isRunning = false;
    value = 0;
    from = 0;
    to = 0;
    currentTime = 0;
    lerp;
    duration;
    easing;
    onUpdate;
    advance(deltaTime) {
      if (!this.isRunning)
        return;
      let completed = false;
      if (this.duration && this.easing) {
        this.currentTime += deltaTime;
        const linearProgress = clamp3(0, this.currentTime / this.duration, 1);
        completed = linearProgress >= 1;
        const easedProgress = completed ? 1 : this.easing(linearProgress);
        this.value = this.from + (this.to - this.from) * easedProgress;
      } else if (this.lerp) {
        this.value = damp(this.value, this.to, this.lerp * 60, deltaTime);
        if (Math.round(this.value) === this.to) {
          this.value = this.to;
          completed = true;
        }
      } else {
        this.value = this.to;
        completed = true;
      }
      if (completed) {
        this.stop();
      }
      this.onUpdate?.(this.value, completed);
    }
    stop() {
      this.isRunning = false;
    }
    fromTo(from, to, { lerp: lerp2, duration, easing, onStart: onStart2, onUpdate }) {
      this.from = this.value = from;
      this.to = to;
      this.lerp = lerp2;
      this.duration = duration;
      this.easing = easing;
      this.currentTime = 0;
      this.isRunning = true;
      onStart2?.();
      this.onUpdate = onUpdate;
    }
  };
  function debounce(callback, delay) {
    let timer;
    return function(...args) {
      let context3 = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = void 0;
        callback.apply(context3, args);
      }, delay);
    };
  }
  var Dimensions = class {
    constructor(wrapper, content, { autoResize = true, debounce: debounceValue = 250 } = {}) {
      this.wrapper = wrapper;
      this.content = content;
      if (autoResize) {
        this.debouncedResize = debounce(this.resize, debounceValue);
        if (this.wrapper instanceof Window) {
          window.addEventListener("resize", this.debouncedResize, false);
        } else {
          this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize);
          this.wrapperResizeObserver.observe(this.wrapper);
        }
        this.contentResizeObserver = new ResizeObserver(this.debouncedResize);
        this.contentResizeObserver.observe(this.content);
      }
      this.resize();
    }
    width = 0;
    height = 0;
    scrollHeight = 0;
    scrollWidth = 0;
    debouncedResize;
    wrapperResizeObserver;
    contentResizeObserver;
    destroy() {
      this.wrapperResizeObserver?.disconnect();
      this.contentResizeObserver?.disconnect();
      if (this.wrapper === window && this.debouncedResize) {
        window.removeEventListener("resize", this.debouncedResize, false);
      }
    }
    resize = () => {
      this.onWrapperResize();
      this.onContentResize();
    };
    onWrapperResize = () => {
      if (this.wrapper instanceof Window) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
      } else {
        this.width = this.wrapper.clientWidth;
        this.height = this.wrapper.clientHeight;
      }
    };
    onContentResize = () => {
      if (this.wrapper instanceof Window) {
        this.scrollHeight = this.content.scrollHeight;
        this.scrollWidth = this.content.scrollWidth;
      } else {
        this.scrollHeight = this.wrapper.scrollHeight;
        this.scrollWidth = this.wrapper.scrollWidth;
      }
    };
    get limit() {
      return {
        x: this.scrollWidth - this.width,
        y: this.scrollHeight - this.height
      };
    }
  };
  var Emitter = class {
    events = {};
    emit(event2, ...args) {
      let callbacks = this.events[event2] || [];
      for (let i = 0, length = callbacks.length; i < length; i++) {
        callbacks[i]?.(...args);
      }
    }
    on(event2, cb) {
      this.events[event2]?.push(cb) || (this.events[event2] = [cb]);
      return () => {
        this.events[event2] = this.events[event2]?.filter((i) => cb !== i);
      };
    }
    off(event2, callback) {
      this.events[event2] = this.events[event2]?.filter((i) => callback !== i);
    }
    destroy() {
      this.events = {};
    }
  };
  var LINE_HEIGHT = 100 / 6;
  var listenerOptions = { passive: false };
  var VirtualScroll = class {
    constructor(element, options = { wheelMultiplier: 1, touchMultiplier: 1 }) {
      this.element = element;
      this.options = options;
      window.addEventListener("resize", this.onWindowResize, false);
      this.onWindowResize();
      this.element.addEventListener("wheel", this.onWheel, listenerOptions);
      this.element.addEventListener(
        "touchstart",
        this.onTouchStart,
        listenerOptions
      );
      this.element.addEventListener(
        "touchmove",
        this.onTouchMove,
        listenerOptions
      );
      this.element.addEventListener("touchend", this.onTouchEnd, listenerOptions);
    }
    touchStart = {
      x: 0,
      y: 0
    };
    lastDelta = {
      x: 0,
      y: 0
    };
    window = {
      width: 0,
      height: 0
    };
    emitter = new Emitter();
    on(event2, callback) {
      return this.emitter.on(event2, callback);
    }
    destroy() {
      this.emitter.destroy();
      window.removeEventListener("resize", this.onWindowResize, false);
      this.element.removeEventListener("wheel", this.onWheel, listenerOptions);
      this.element.removeEventListener(
        "touchstart",
        this.onTouchStart,
        listenerOptions
      );
      this.element.removeEventListener(
        "touchmove",
        this.onTouchMove,
        listenerOptions
      );
      this.element.removeEventListener(
        "touchend",
        this.onTouchEnd,
        listenerOptions
      );
    }
    onTouchStart = (event2) => {
      const { clientX, clientY } = event2.targetTouches ? event2.targetTouches[0] : event2;
      this.touchStart.x = clientX;
      this.touchStart.y = clientY;
      this.lastDelta = {
        x: 0,
        y: 0
      };
      this.emitter.emit("scroll", {
        deltaX: 0,
        deltaY: 0,
        event: event2
      });
    };
    onTouchMove = (event2) => {
      const { clientX, clientY } = event2.targetTouches ? event2.targetTouches[0] : event2;
      const deltaX = -(clientX - this.touchStart.x) * this.options.touchMultiplier;
      const deltaY = -(clientY - this.touchStart.y) * this.options.touchMultiplier;
      this.touchStart.x = clientX;
      this.touchStart.y = clientY;
      this.lastDelta = {
        x: deltaX,
        y: deltaY
      };
      this.emitter.emit("scroll", {
        deltaX,
        deltaY,
        event: event2
      });
    };
    onTouchEnd = (event2) => {
      this.emitter.emit("scroll", {
        deltaX: this.lastDelta.x,
        deltaY: this.lastDelta.y,
        event: event2
      });
    };
    onWheel = (event2) => {
      let { deltaX, deltaY, deltaMode } = event2;
      const multiplierX = deltaMode === 1 ? LINE_HEIGHT : deltaMode === 2 ? this.window.width : 1;
      const multiplierY = deltaMode === 1 ? LINE_HEIGHT : deltaMode === 2 ? this.window.height : 1;
      deltaX *= multiplierX;
      deltaY *= multiplierY;
      deltaX *= this.options.wheelMultiplier;
      deltaY *= this.options.wheelMultiplier;
      this.emitter.emit("scroll", { deltaX, deltaY, event: event2 });
    };
    onWindowResize = () => {
      this.window = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    };
  };
  var defaultEasing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
  var Lenis = class {
    _isScrolling = false;
    _isStopped = false;
    _isLocked = false;
    _preventNextNativeScrollEvent = false;
    _resetVelocityTimeout = null;
    __rafID = null;
    isTouching;
    time = 0;
    userData = {};
    lastVelocity = 0;
    velocity = 0;
    direction = 0;
    options;
    targetScroll;
    animatedScroll;
    animate = new Animate();
    emitter = new Emitter();
    dimensions;
    virtualScroll;
    constructor({
      wrapper = window,
      content = document.documentElement,
      eventsTarget = wrapper,
      smoothWheel = true,
      syncTouch = false,
      syncTouchLerp = 0.075,
      touchInertiaExponent = 1.7,
      duration,
      easing,
      lerp: lerp2 = 0.1,
      infinite = false,
      orientation = "vertical",
      gestureOrientation = orientation === "horizontal" ? "both" : "vertical",
      touchMultiplier = 1,
      wheelMultiplier = 1,
      autoResize = true,
      prevent,
      virtualScroll,
      overscroll = true,
      autoRaf = false,
      anchors = false,
      autoToggle = false,
      allowNestedScroll = false,
      __experimental__naiveDimensions = false
    } = {}) {
      window.lenisVersion = version;
      if (!wrapper || wrapper === document.documentElement) {
        wrapper = window;
      }
      if (typeof duration === "number" && typeof easing !== "function") {
        easing = defaultEasing;
      } else if (typeof easing === "function" && typeof duration !== "number") {
        duration = 1;
      }
      this.options = {
        wrapper,
        content,
        eventsTarget,
        smoothWheel,
        syncTouch,
        syncTouchLerp,
        touchInertiaExponent,
        duration,
        easing,
        lerp: lerp2,
        infinite,
        gestureOrientation,
        orientation,
        touchMultiplier,
        wheelMultiplier,
        autoResize,
        prevent,
        virtualScroll,
        overscroll,
        autoRaf,
        anchors,
        autoToggle,
        allowNestedScroll,
        __experimental__naiveDimensions
      };
      this.dimensions = new Dimensions(wrapper, content, { autoResize });
      this.updateClassName();
      this.targetScroll = this.animatedScroll = this.actualScroll;
      this.options.wrapper.addEventListener("scroll", this.onNativeScroll, false);
      this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, {
        capture: true
      });
      if (this.options.anchors && this.options.wrapper === window) {
        this.options.wrapper.addEventListener(
          "click",
          this.onClick,
          false
        );
      }
      this.options.wrapper.addEventListener(
        "pointerdown",
        this.onPointerDown,
        false
      );
      this.virtualScroll = new VirtualScroll(eventsTarget, {
        touchMultiplier,
        wheelMultiplier
      });
      this.virtualScroll.on("scroll", this.onVirtualScroll);
      if (this.options.autoToggle) {
        this.rootElement.addEventListener("transitionend", this.onTransitionEnd, {
          passive: true
        });
      }
      if (this.options.autoRaf) {
        this.__rafID = requestAnimationFrame(this.raf);
      }
    }
    destroy() {
      this.emitter.destroy();
      this.options.wrapper.removeEventListener(
        "scroll",
        this.onNativeScroll,
        false
      );
      this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, {
        capture: true
      });
      this.options.wrapper.removeEventListener(
        "pointerdown",
        this.onPointerDown,
        false
      );
      if (this.options.anchors && this.options.wrapper === window) {
        this.options.wrapper.removeEventListener(
          "click",
          this.onClick,
          false
        );
      }
      this.virtualScroll.destroy();
      this.dimensions.destroy();
      this.cleanUpClassName();
      if (this.__rafID) {
        cancelAnimationFrame(this.__rafID);
      }
    }
    on(event2, callback) {
      return this.emitter.on(event2, callback);
    }
    off(event2, callback) {
      return this.emitter.off(event2, callback);
    }
    onScrollEnd = (e) => {
      if (!(e instanceof CustomEvent)) {
        if (this.isScrolling === "smooth" || this.isScrolling === false) {
          e.stopPropagation();
        }
      }
    };
    dispatchScrollendEvent = () => {
      this.options.wrapper.dispatchEvent(
        new CustomEvent("scrollend", {
          bubbles: this.options.wrapper === window,
          detail: {
            lenisScrollEnd: true
          }
        })
      );
    };
    onTransitionEnd = (event2) => {
      if (event2.propertyName.includes("overflow")) {
        const property = this.isHorizontal ? "overflow-x" : "overflow-y";
        const overflow = getComputedStyle(this.rootElement)[property];
        if (["hidden", "clip"].includes(overflow)) {
          this.internalStop();
        } else {
          this.internalStart();
        }
      }
    };
    setScroll(scroll) {
      if (this.isHorizontal) {
        this.options.wrapper.scrollTo({ left: scroll, behavior: "instant" });
      } else {
        this.options.wrapper.scrollTo({ top: scroll, behavior: "instant" });
      }
    }
    onClick = (event2) => {
      const path = event2.composedPath();
      const anchor = path.find(
        (node) => node instanceof HTMLAnchorElement && (node.getAttribute("href")?.startsWith("#") || node.getAttribute("href")?.startsWith("/#") || node.getAttribute("href")?.startsWith("./#"))
      );
      if (anchor) {
        const id = anchor.getAttribute("href");
        if (id) {
          const options = typeof this.options.anchors === "object" && this.options.anchors ? this.options.anchors : void 0;
          let target = `#${id.split("#")[1]}`;
          if (["#", "/#", "./#", "#top", "/#top", "./#top"].includes(id)) {
            target = 0;
          }
          this.scrollTo(target, options);
        }
      }
    };
    onPointerDown = (event2) => {
      if (event2.button === 1) {
        this.reset();
      }
    };
    onVirtualScroll = (data) => {
      if (typeof this.options.virtualScroll === "function" && this.options.virtualScroll(data) === false)
        return;
      const { deltaX, deltaY, event: event2 } = data;
      this.emitter.emit("virtual-scroll", { deltaX, deltaY, event: event2 });
      if (event2.ctrlKey)
        return;
      if (event2.lenisStopPropagation)
        return;
      const isTouch = event2.type.includes("touch");
      const isWheel = event2.type.includes("wheel");
      this.isTouching = event2.type === "touchstart" || event2.type === "touchmove";
      const isClickOrTap = deltaX === 0 && deltaY === 0;
      const isTapToStop = this.options.syncTouch && isTouch && event2.type === "touchstart" && isClickOrTap && !this.isStopped && !this.isLocked;
      if (isTapToStop) {
        this.reset();
        return;
      }
      const isUnknownGesture = this.options.gestureOrientation === "vertical" && deltaY === 0 || this.options.gestureOrientation === "horizontal" && deltaX === 0;
      if (isClickOrTap || isUnknownGesture) {
        return;
      }
      let composedPath = event2.composedPath();
      composedPath = composedPath.slice(0, composedPath.indexOf(this.rootElement));
      const prevent = this.options.prevent;
      if (!!composedPath.find(
        (node) => node instanceof HTMLElement && (typeof prevent === "function" && prevent?.(node) || node.hasAttribute?.("data-lenis-prevent") || isTouch && node.hasAttribute?.("data-lenis-prevent-touch") || isWheel && node.hasAttribute?.("data-lenis-prevent-wheel") || this.options.allowNestedScroll && this.checkNestedScroll(node, { deltaX, deltaY }))
      ))
        return;
      if (this.isStopped || this.isLocked) {
        if (event2.cancelable) {
          event2.preventDefault();
        }
        return;
      }
      const isSmooth = this.options.syncTouch && isTouch || this.options.smoothWheel && isWheel;
      if (!isSmooth) {
        this.isScrolling = "native";
        this.animate.stop();
        event2.lenisStopPropagation = true;
        return;
      }
      let delta = deltaY;
      if (this.options.gestureOrientation === "both") {
        delta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX;
      } else if (this.options.gestureOrientation === "horizontal") {
        delta = deltaX;
      }
      if (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && this.limit > 0 && (this.animatedScroll > 0 && this.animatedScroll < this.limit || this.animatedScroll === 0 && deltaY > 0 || this.animatedScroll === this.limit && deltaY < 0)) {
        event2.lenisStopPropagation = true;
      }
      if (event2.cancelable) {
        event2.preventDefault();
      }
      const isSyncTouch = isTouch && this.options.syncTouch;
      const isTouchEnd = isTouch && event2.type === "touchend";
      const hasTouchInertia = isTouchEnd;
      if (hasTouchInertia) {
        delta = Math.sign(this.velocity) * Math.pow(Math.abs(this.velocity), this.options.touchInertiaExponent);
      }
      this.scrollTo(this.targetScroll + delta, {
        programmatic: false,
        ...isSyncTouch ? {
          lerp: hasTouchInertia ? this.options.syncTouchLerp : 1
        } : {
          lerp: this.options.lerp,
          duration: this.options.duration,
          easing: this.options.easing
        }
      });
    };
    resize() {
      this.dimensions.resize();
      this.animatedScroll = this.targetScroll = this.actualScroll;
      this.emit();
    }
    emit() {
      this.emitter.emit("scroll", this);
    }
    onNativeScroll = () => {
      if (this._resetVelocityTimeout !== null) {
        clearTimeout(this._resetVelocityTimeout);
        this._resetVelocityTimeout = null;
      }
      if (this._preventNextNativeScrollEvent) {
        this._preventNextNativeScrollEvent = false;
        return;
      }
      if (this.isScrolling === false || this.isScrolling === "native") {
        const lastScroll = this.animatedScroll;
        this.animatedScroll = this.targetScroll = this.actualScroll;
        this.lastVelocity = this.velocity;
        this.velocity = this.animatedScroll - lastScroll;
        this.direction = Math.sign(
          this.animatedScroll - lastScroll
        );
        if (!this.isStopped) {
          this.isScrolling = "native";
        }
        this.emit();
        if (this.velocity !== 0) {
          this._resetVelocityTimeout = setTimeout(() => {
            this.lastVelocity = this.velocity;
            this.velocity = 0;
            this.isScrolling = false;
            this.emit();
          }, 400);
        }
      }
    };
    reset() {
      this.isLocked = false;
      this.isScrolling = false;
      this.animatedScroll = this.targetScroll = this.actualScroll;
      this.lastVelocity = this.velocity = 0;
      this.animate.stop();
    }
    start() {
      if (!this.isStopped)
        return;
      if (this.options.autoToggle) {
        this.rootElement.style.removeProperty("overflow");
        return;
      }
      this.internalStart();
    }
    internalStart() {
      if (!this.isStopped)
        return;
      this.reset();
      this.isStopped = false;
      this.emit();
    }
    stop() {
      if (this.isStopped)
        return;
      if (this.options.autoToggle) {
        this.rootElement.style.setProperty("overflow", "clip");
        return;
      }
      this.internalStop();
    }
    internalStop() {
      if (this.isStopped)
        return;
      this.reset();
      this.isStopped = true;
      this.emit();
    }
    raf = (time) => {
      const deltaTime = time - (this.time || time);
      this.time = time;
      this.animate.advance(deltaTime * 1e-3);
      if (this.options.autoRaf) {
        this.__rafID = requestAnimationFrame(this.raf);
      }
    };
    scrollTo(target, {
      offset = 0,
      immediate = false,
      lock = false,
      duration = this.options.duration,
      easing = this.options.easing,
      lerp: lerp2 = this.options.lerp,
      onStart: onStart2,
      onComplete,
      force = false,
      programmatic = true,
      userData
    } = {}) {
      if ((this.isStopped || this.isLocked) && !force)
        return;
      if (typeof target === "string" && ["top", "left", "start"].includes(target)) {
        target = 0;
      } else if (typeof target === "string" && ["bottom", "right", "end"].includes(target)) {
        target = this.limit;
      } else {
        let node;
        if (typeof target === "string") {
          node = document.querySelector(target);
        } else if (target instanceof HTMLElement && target?.nodeType) {
          node = target;
        }
        if (node) {
          if (this.options.wrapper !== window) {
            const wrapperRect = this.rootElement.getBoundingClientRect();
            offset -= this.isHorizontal ? wrapperRect.left : wrapperRect.top;
          }
          const rect = node.getBoundingClientRect();
          target = (this.isHorizontal ? rect.left : rect.top) + this.animatedScroll;
        }
      }
      if (typeof target !== "number")
        return;
      target += offset;
      target = Math.round(target);
      if (this.options.infinite) {
        if (programmatic) {
          this.targetScroll = this.animatedScroll = this.scroll;
          const distance = target - this.animatedScroll;
          if (distance > this.limit / 2) {
            target = target - this.limit;
          } else if (distance < -this.limit / 2) {
            target = target + this.limit;
          }
        }
      } else {
        target = clamp3(0, target, this.limit);
      }
      if (target === this.targetScroll) {
        onStart2?.(this);
        onComplete?.(this);
        return;
      }
      this.userData = userData ?? {};
      if (immediate) {
        this.animatedScroll = this.targetScroll = target;
        this.setScroll(this.scroll);
        this.reset();
        this.preventNextNativeScrollEvent();
        this.emit();
        onComplete?.(this);
        this.userData = {};
        requestAnimationFrame(() => {
          this.dispatchScrollendEvent();
        });
        return;
      }
      if (!programmatic) {
        this.targetScroll = target;
      }
      if (typeof duration === "number" && typeof easing !== "function") {
        easing = defaultEasing;
      } else if (typeof easing === "function" && typeof duration !== "number") {
        duration = 1;
      }
      this.animate.fromTo(this.animatedScroll, target, {
        duration,
        easing,
        lerp: lerp2,
        onStart: () => {
          if (lock)
            this.isLocked = true;
          this.isScrolling = "smooth";
          onStart2?.(this);
        },
        onUpdate: (value, completed) => {
          this.isScrolling = "smooth";
          this.lastVelocity = this.velocity;
          this.velocity = value - this.animatedScroll;
          this.direction = Math.sign(this.velocity);
          this.animatedScroll = value;
          this.setScroll(this.scroll);
          if (programmatic) {
            this.targetScroll = value;
          }
          if (!completed)
            this.emit();
          if (completed) {
            this.reset();
            this.emit();
            onComplete?.(this);
            this.userData = {};
            requestAnimationFrame(() => {
              this.dispatchScrollendEvent();
            });
            this.preventNextNativeScrollEvent();
          }
        }
      });
    }
    preventNextNativeScrollEvent() {
      this._preventNextNativeScrollEvent = true;
      requestAnimationFrame(() => {
        this._preventNextNativeScrollEvent = false;
      });
    }
    checkNestedScroll(node, { deltaX, deltaY }) {
      const time = Date.now();
      const cache2 = node._lenis ??= {};
      let hasOverflowX, hasOverflowY, isScrollableX, isScrollableY, scrollWidth, scrollHeight, clientWidth, clientHeight;
      const gestureOrientation = this.options.gestureOrientation;
      if (time - (cache2.time ?? 0) > 2e3) {
        cache2.time = Date.now();
        const computedStyle = window.getComputedStyle(node);
        cache2.computedStyle = computedStyle;
        const overflowXString = computedStyle.overflowX;
        const overflowYString = computedStyle.overflowY;
        hasOverflowX = ["auto", "overlay", "scroll"].includes(overflowXString);
        hasOverflowY = ["auto", "overlay", "scroll"].includes(overflowYString);
        cache2.hasOverflowX = hasOverflowX;
        cache2.hasOverflowY = hasOverflowY;
        if (!hasOverflowX && !hasOverflowY)
          return false;
        if (gestureOrientation === "vertical" && !hasOverflowY)
          return false;
        if (gestureOrientation === "horizontal" && !hasOverflowX)
          return false;
        scrollWidth = node.scrollWidth;
        scrollHeight = node.scrollHeight;
        clientWidth = node.clientWidth;
        clientHeight = node.clientHeight;
        isScrollableX = scrollWidth > clientWidth;
        isScrollableY = scrollHeight > clientHeight;
        cache2.isScrollableX = isScrollableX;
        cache2.isScrollableY = isScrollableY;
        cache2.scrollWidth = scrollWidth;
        cache2.scrollHeight = scrollHeight;
        cache2.clientWidth = clientWidth;
        cache2.clientHeight = clientHeight;
      } else {
        isScrollableX = cache2.isScrollableX;
        isScrollableY = cache2.isScrollableY;
        hasOverflowX = cache2.hasOverflowX;
        hasOverflowY = cache2.hasOverflowY;
        scrollWidth = cache2.scrollWidth;
        scrollHeight = cache2.scrollHeight;
        clientWidth = cache2.clientWidth;
        clientHeight = cache2.clientHeight;
      }
      if (!hasOverflowX && !hasOverflowY || !isScrollableX && !isScrollableY) {
        return false;
      }
      if (gestureOrientation === "vertical" && (!hasOverflowY || !isScrollableY))
        return false;
      if (gestureOrientation === "horizontal" && (!hasOverflowX || !isScrollableX))
        return false;
      let orientation;
      if (gestureOrientation === "horizontal") {
        orientation = "x";
      } else if (gestureOrientation === "vertical") {
        orientation = "y";
      } else {
        const isScrollingX = deltaX !== 0;
        const isScrollingY = deltaY !== 0;
        if (isScrollingX && hasOverflowX && isScrollableX) {
          orientation = "x";
        }
        if (isScrollingY && hasOverflowY && isScrollableY) {
          orientation = "y";
        }
      }
      if (!orientation)
        return false;
      let scroll, maxScroll, delta, hasOverflow, isScrollable;
      if (orientation === "x") {
        scroll = node.scrollLeft;
        maxScroll = scrollWidth - clientWidth;
        delta = deltaX;
        hasOverflow = hasOverflowX;
        isScrollable = isScrollableX;
      } else if (orientation === "y") {
        scroll = node.scrollTop;
        maxScroll = scrollHeight - clientHeight;
        delta = deltaY;
        hasOverflow = hasOverflowY;
        isScrollable = isScrollableY;
      } else {
        return false;
      }
      const willScroll = delta > 0 ? scroll < maxScroll : scroll > 0;
      return willScroll && hasOverflow && isScrollable;
    }
    get rootElement() {
      return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
    }
    get limit() {
      if (this.options.__experimental__naiveDimensions) {
        if (this.isHorizontal) {
          return this.rootElement.scrollWidth - this.rootElement.clientWidth;
        } else {
          return this.rootElement.scrollHeight - this.rootElement.clientHeight;
        }
      } else {
        return this.dimensions.limit[this.isHorizontal ? "x" : "y"];
      }
    }
    get isHorizontal() {
      return this.options.orientation === "horizontal";
    }
    get actualScroll() {
      const wrapper = this.options.wrapper;
      return this.isHorizontal ? wrapper.scrollX ?? wrapper.scrollLeft : wrapper.scrollY ?? wrapper.scrollTop;
    }
    get scroll() {
      return this.options.infinite ? modulo(this.animatedScroll, this.limit) : this.animatedScroll;
    }
    get progress() {
      return this.limit === 0 ? 1 : this.scroll / this.limit;
    }
    get isScrolling() {
      return this._isScrolling;
    }
    set isScrolling(value) {
      if (this._isScrolling !== value) {
        this._isScrolling = value;
        this.updateClassName();
      }
    }
    get isStopped() {
      return this._isStopped;
    }
    set isStopped(value) {
      if (this._isStopped !== value) {
        this._isStopped = value;
        this.updateClassName();
      }
    }
    get isLocked() {
      return this._isLocked;
    }
    set isLocked(value) {
      if (this._isLocked !== value) {
        this._isLocked = value;
        this.updateClassName();
      }
    }
    get isSmooth() {
      return this.isScrolling === "smooth";
    }
    get className() {
      let className = "lenis";
      if (this.options.autoToggle)
        className += " lenis-autoToggle";
      if (this.isStopped)
        className += " lenis-stopped";
      if (this.isLocked)
        className += " lenis-locked";
      if (this.isScrolling)
        className += " lenis-scrolling";
      if (this.isScrolling === "smooth")
        className += " lenis-smooth";
      return className;
    }
    updateClassName() {
      this.cleanUpClassName();
      this.rootElement.className = `${this.rootElement.className} ${this.className}`.trim();
    }
    cleanUpClassName() {
      this.rootElement.className = this.rootElement.className.replace(/lenis(-\w+)?/g, "").trim();
    }
  };

  // src/lenis.js
  var customcss = injectCSS(`
    .lenis.lenis-smooth {
      scroll-behavior: auto;  
    }
    html.lenis {
      height: auto;
    }
`);
  var params = {
    wrapper: window,
    duration: 1.5,
    easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    orientation: "vertical",
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 1.5,
    infinite: false,
    useOverscroll: true,
    useControls: true,
    useAnchor: true,
    useRaf: true,
    autoResize: false
  };
  var Scroll = class extends Lenis {
    constructor(params2) {
      super({
        params: params2
      });
      this.params = params2;
      this.isActive = true;
      this.init();
      this.call = {
        stop: () => this.stop(),
        start: () => this.start()
      };
    }
    init() {
      this.config();
      this.render();
      if (this.params.useRaf) {
        this.y = window.scrollY;
        this.max = window.innerHeight;
        this.speed = 0;
        this.percent = this.y / (document.body.scrollHeight - window.innerHeight);
        this.direction = 0;
        this.on("scroll", (e) => this.outScroll(e));
      }
      handleEditor(this.destroy);
    }
    reconfig() {
      if (this.scrollinks)
        this.scrollinks.forEach((item) => item.onclick = null);
      this.config();
    }
    config() {
      if (this.params.useAnchor)
        this.scrolllinks = [
          ...document.querySelectorAll("[data-scrolllink]")
        ].map((item) => {
          const target = document.querySelector(item.dataset.scrolllink);
          if (target) {
            item.onclick = (e) => {
              e.preventDefault();
              this.scrollTo(target);
            };
          }
          return item;
        });
      if (this.params.useOverscroll)
        [...document.querySelectorAll('[data-scroll="overscroll"]')].forEach(
          (item) => item.setAttribute("onwheel", "event.stopPropagation()")
        );
      if (this.params.useControls) {
        [...document.querySelectorAll('[data-scroll="stop"]')].forEach((item) => {
          item.onclick = () => {
            this.stop();
            this.isActive = false;
          };
        });
        [...document.querySelectorAll('[data-scroll="start"]')].forEach(
          (item) => {
            item.onclick = () => {
              this.start();
              this.isActive = true;
            };
          }
        );
        [...document.querySelectorAll('[data-scroll="toggle"]')].forEach(
          (item) => {
            item.onclick = () => {
              if (this.isActive) {
                this.stop();
                this.isActive = false;
              } else {
                this.start();
                this.isActive = true;
              }
            };
          }
        );
      }
    }
    render(time) {
      this.raf(time);
      window.requestAnimationFrame(this.render.bind(this));
    }
    outScroll({ scroll, limit, velocity, progress, direction }) {
      this.y = scroll || 0;
      this.max = limit || window.innerHeight;
      this.speed = velocity || 0;
      this.percent = progress || 0;
      this.direction = 0;
      if (this.params.useRaf) {
        window.dispatchEvent(
          new CustomEvent("sscroll", {
            detail: {
              y: this.y,
              max: this.max,
              speed: this.speed,
              percent: this.percent,
              direction: this.direction
            }
          })
        );
      }
    }
    renderWebflow(time) {
    }
  };
  window.SScroll = new Scroll(params);
  function lenisResize() {
    window.SScroll.resize();
  }
  function lenisToTop(duration = 0) {
    const options = {};
    if (duration === 0) {
      options.immediate = true;
    } else {
      options.duration = duration;
    }
    window.SScroll.scrollTo(0, options);
  }

  // src/page/enterprise.js
  gsapWithCSS.registerPlugin(ScrollTrigger2);
  var heroLetters5;
  function enterpriseHero(mode = "") {
    const formItem = document.querySelector("[contact-form]");
    const orbElement = document.querySelector("[data-orb]");
    const orbOutline3 = document.querySelector('[orb-outline="1"]');
    const orbOutline22 = document.querySelector('[orb-outline="2"]');
    const orbOutlineIn1 = document.querySelector('[orb-out-w="1"]');
    const orbOutlineIn2 = document.querySelector('[orb-out-w="2"]');
    const selector3 = document.querySelectorAll("[split-hero]");
    heroLetters5 = runSplit(selector3, "words, chars");
    document.body.style.cursor = "progress";
    setTimeout(() => {
      window.SScroll.stop();
    }, 50);
    gsapWithCSS.set(heroLetters5.chars, {
      y: "-101%"
    });
    let duration = "1";
    gsapWithCSS.to(heroLetters5.chars, {
      y: "0%",
      duration,
      ease: "power4.inOut",
      stagger: { each: 0.03, from: "random" }
    });
    if (mode !== "transition") {
      gsapWithCSS.set(orbElement, {
        autoAlpha: 0,
        width: "0em",
        height: "0em",
        minHeight: "auto",
        minWidth: "auto"
      });
      gsapWithCSS.set(orbOutline3, {
        autoAlpha: 0,
        scale: 0
      });
      gsapWithCSS.set(orbOutline22, {
        autoAlpha: 0,
        scale: 0
      });
      gsapWithCSS.to(orbElement, {
        autoAlpha: 1,
        width: "4.3em",
        height: "4.3em",
        duration: 1
      });
      gsapWithCSS.to(orbOutline3, {
        autoAlpha: 1,
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      });
      gsapWithCSS.to(orbOutline22, {
        delay: 0.5,
        autoAlpha: 1,
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      });
      gsapWithCSS.to(orbOutlineIn1, {
        x: "-25vw",
        y: "-25vh",
        scale: 0.6,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 1
      });
      gsapWithCSS.to(orbOutlineIn2, {
        x: "0vw",
        y: "11vh",
        scale: 1,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 1
      });
      gsapWithCSS.to(orbElement, {
        width: "80vh",
        height: "80vh",
        minHeight: "45em",
        minWidth: "45em",
        x: "25vw",
        y: "50vh",
        scale: 2,
        duration: 1,
        ease: "power2.inOut",
        delay: 1
      });
    }
    gsapWithCSS.from('[hh-tb="1"]', {
      delay: 1,
      x: "10em",
      duration,
      ease: "power2.inOut"
    });
    gsapWithCSS.from('[hh-tb="2"]', {
      delay: 1.1,
      x: "-10em",
      duration,
      ease: "power2.inOut",
      onComplete: function() {
        document.body.style.cursor = "auto";
        window.SScroll.start();
      }
    });
    gsapWithCSS.delayedCall(1, animateEntHeroVideos);
  }
  function initEntHeroVideo() {
    const heroVideos = document.querySelectorAll("._wf-ent-hero__item--w");
    const entHeroButton = document.querySelectorAll("[ent-hero-btn]");
    const entHeroPara = document.querySelectorAll("[ent-hero-para] .line");
    const radius = "1.375em";
    heroVideos.forEach((video, index) => {
      const isOdd = index % 2 !== 0;
      gsapWithCSS.set(video, {
        clipPath: isOdd ? `inset(0% 100% 0% 0% round ${radius})` : `inset(0% 0% 0% 100% round ${radius})`,
        autoAlpha: 0,
        x: isOdd ? `3.5rem` : `-3.5rem`
      });
    });
    gsapWithCSS.set(entHeroButton, {
      autoAlpha: 0,
      yPercent: 101
    });
    gsapWithCSS.set(entHeroPara, {
      autoAlpha: 0,
      yPercent: 101
    });
  }
  function animateEntHeroVideos() {
    const heroVideos = document.querySelectorAll("._wf-ent-hero__item--w");
    const entHeroPara = document.querySelectorAll("[ent-hero-para] .line");
    const entHeroButton = document.querySelectorAll("[ent-hero-btn]");
    const radius = "1.375em";
    gsapWithCSS.to(heroVideos, {
      clipPath: `inset(0% 0% 0% 0% round ${radius})`,
      autoAlpha: 1,
      y: 0,
      x: "0rem",
      duration: 1,
      ease: "power2.inOut",
      stagger: 0.1
    });
    gsapWithCSS.to(entHeroPara, {
      autoAlpha: 1,
      yPercent: 0,
      duration: 1,
      ease: "power4.inOut",
      stagger: { each: 0.05, from: "start" }
    });
    gsapWithCSS.to(entHeroButton, {
      autoAlpha: 1,
      yPercent: 0,
      duration: 1,
      ease: "power4.inOut",
      stagger: { each: 0.1, from: "start" }
    });
  }
  function initEntWhy() {
    const wrap3 = document.querySelector("._wf-ent__why--w");
    const items = wrap3.querySelectorAll("._wf-ent__why--card");
    const duration = 0.6;
    const ease = "power2.inOut";
    const stagger = 0.1;
    gsapWithCSS.set(items, {
      y: "3rem",
      autoAlpha: 0
    });
    items.forEach((item) => {
      const para = item.querySelector("._wf-ent__why-para--w");
      gsapWithCSS.set(para, {
        height: 0
      });
      item.addEventListener("mouseenter", () => {
        gsapWithCSS.to(para, {
          height: "auto",
          duration,
          ease
        });
      });
      item.addEventListener("mouseleave", () => {
        gsapWithCSS.to(para, {
          height: 0,
          duration,
          ease
        });
      });
    });
    ScrollTrigger2.create({
      trigger: wrap3,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsapWithCSS.to(items, {
          y: 0,
          autoAlpha: 1,
          stagger,
          ease,
          duration
        });
      }
    });
  }
  function testimonialSlider() {
    const sliderComponents = document.querySelectorAll(".slider-main_component");
    sliderComponents.forEach((component) => {
      let loopMode = component.getAttribute("loop-mode") === "true";
      let sliderDuration = component.hasAttribute("slider-duration") ? parseInt(component.getAttribute("slider-duration"), 10) : 300;
      const swiper = new Swiper(component.querySelector(".swiper"), {
        modules: [Navigation, Scrollbar, Keyboard],
        speed: sliderDuration,
        loop: loopMode,
        autoHeight: false,
        centeredSlides: loopMode,
        followFinger: true,
        freeMode: false,
        slideToClickedSlide: false,
        slidesPerView: 1,
        spaceBetween: "4%",
        rewind: false,
        keyboard: {
          enabled: true,
          onlyInViewport: true
        },
        breakpoints: {
          480: {
            slidesPerView: 1,
            spaceBetween: "4%"
          },
          768: {
            slidesPerView: 2,
            spaceBetween: "4%"
          },
          992: {
            slidesPerView: 3,
            spaceBetween: "2%"
          }
        },
        navigation: {
          nextEl: component.querySelector(".swiper-next"),
          prevEl: component.querySelector(".swiper-prev"),
          disabledClass: "is-disabled"
        },
        scrollbar: {
          el: component.querySelector(".swiper-drag-wrapper"),
          draggable: true,
          dragClass: "swiper-drag",
          snapOnRelease: true
        },
        slideActiveClass: "is-active",
        slideDuplicateActiveClass: "is-active"
      });
    });
  }
  function initFaq() {
    const wrap3 = document.querySelector("[faq-wrap]");
    const items = wrap3?.querySelectorAll("[faq-item]");
    const duration = 0.6;
    const ease = "power2.inOut";
    const stagger = 0.1;
    if (!wrap3 || !items.length)
      return;
    gsapWithCSS.set(items, {
      y: "3rem",
      autoAlpha: 0
    });
    items[0].classList.add("is--active");
    setTimeout(lenisResize, 500);
    items.forEach((item, index) => {
      const para = item.querySelector("[faq-para]");
      const svg = item.querySelector("[faq-svg]");
      gsapWithCSS.set(para, { height: index === 0 ? "auto" : 0 });
      gsapWithCSS.set(svg, { rotation: index === 0 ? 45 : 0 });
      item.addEventListener("click", () => toggleItem(item));
    });
    ScrollTrigger2.create({
      trigger: wrap3,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsapWithCSS.to(items, {
          y: 0,
          autoAlpha: 1,
          stagger,
          ease,
          duration
        });
      }
    });
    function toggleItem(clickedItem) {
      setTimeout(lenisResize, 1e3);
      items.forEach((item) => {
        const para = item.querySelector("[faq-para]");
        const svg = item.querySelector("[faq-svg]");
        if (item === clickedItem && !item.classList.contains("is--active")) {
          gsapWithCSS.to(para, { height: "auto", duration, ease });
          gsapWithCSS.to(svg, { rotation: 45, duration, ease });
          item.classList.add("is--active");
        } else {
          gsapWithCSS.to(para, { height: 0, duration, ease });
          gsapWithCSS.to(svg, { rotation: 0, duration, ease });
          item.classList.remove("is--active");
        }
      });
    }
  }
  function clientCards() {
    const stickyTrack = document.querySelector('[ps-anim="track"]');
    const container = document.querySelector(".ps__slider--w");
    const slider = document.querySelector(".ps__slider--track");
    const slides = Array.from(document.querySelectorAll(".ps__slider--slide"));
    const totalSlides = slides.length;
    const slideWidth = slides[0].offsetWidth;
    const containerWidth = container.offsetWidth;
    const gapBetweenSlides = 32;
    const activeThreshold = 32;
    let slidePositions = slides.map(
      (_, index) => index * (slideWidth + gapBetweenSlides)
    );
    function initializeCardPositions() {
      slides.forEach((slide2, index) => {
        gsapWithCSS.set(slide2, {
          zIndex: (index + 1) * 10,
          scale: 1,
          autoAlpha: 1,
          x: slidePositions[index] + "px",
          y: 0
        });
      });
      gsapWithCSS.set(slider, {
        width: totalSlides * (slideWidth + gapBetweenSlides) - gapBetweenSlides + "px"
      });
    }
    function animateCardsIn() {
      gsapWithCSS.from(slides, {
        y: "10rem",
        autoAlpha: 0,
        stagger: {
          each: 0.1,
          from: "end"
        },
        ease: "cubic-bezier(0.38,0.005,0.215,1)",
        onComplete: () => {
          slides[0].classList.add("active");
        },
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    }
    function updateSlides2(progress) {
      const totalMove = (totalSlides - 1) * (slideWidth + gapBetweenSlides);
      const currentMove = totalMove * progress;
      slidePositions = slidePositions.map(
        (pos, index) => Math.max(0, index * (slideWidth + gapBetweenSlides) - currentMove)
      );
      let activeIndex = -1;
      const transitionStartThreshold = activeThreshold + slideWidth * 0.2;
      slides.forEach((slide2, index) => {
        const slideX = slidePositions[index];
        const isActive = slideX <= activeThreshold;
        const nextSlideX = index < totalSlides - 1 ? slidePositions[index + 1] : -Infinity;
        if (isActive) {
          activeIndex = index;
          slide2.classList.add("active");
        } else {
          slide2.classList.remove("active");
        }
        const transitionProgress = isActive && index < totalSlides - 1 ? Math.max(
          0,
          Math.min(
            1,
            (transitionStartThreshold - nextSlideX) / (transitionStartThreshold - activeThreshold)
          )
        ) : 0;
        gsapWithCSS.to(slide2, {
          scale: isActive ? 1 - 0.2 * transitionProgress : 1,
          autoAlpha: isActive ? 1 - transitionProgress : 1,
          duration: 0.5,
          ease: "power2.out"
        });
        if (slideX <= 0) {
          const stackPosition = Math.max(
            0,
            Math.floor(-slideX / (slideWidth + gapBetweenSlides))
          );
          const offset = stackPosition * 0.2;
          gsapWithCSS.to(slide2, {
            x: offset + "rem",
            y: -stackPosition * 1 + "px",
            duration: 0.5,
            ease: "power2.out"
          });
        } else {
          gsapWithCSS.to(slide2, {
            x: slideX + "px",
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
    }
    initializeCardPositions();
    animateCardsIn();
    ScrollTrigger2.create({
      trigger: stickyTrack,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        updateSlides2(self.progress);
      }
    });
    window.addEventListener("resize", () => {
      const newSlideWidth = slides[0].offsetWidth;
      slidePositions = slides.map(
        (_, index) => index * (newSlideWidth + gapBetweenSlides)
      );
      initializeCardPositions();
      updateSlides2(ScrollTrigger2.getById(stickyTrack).progress);
    });
  }
  function playVideos() {
    const videos = document.querySelectorAll("video[ent-video]");
    videos.forEach((video) => {
      if (video.readyState >= 2) {
        video.play().catch((error) => {
          console.warn(`Error playing video: ${error.message}`);
        });
      } else {
        video.addEventListener("loadeddata", () => {
          video.play().catch((error) => {
            console.warn(`Error playing video: ${error.message}`);
          });
        });
      }
      video.loop = true;
      video.muted = true;
    });
  }
  var videoHasBeenClicked = false;
  var isVideoPlaying = false;
  function showreelMask() {
    const track = document.querySelector('[ent-vid="track"]');
    const mask = track?.querySelector('[ent-vid="mask"]');
    const video = track?.querySelector("[ent-video-showreel]");
    if (!track || !mask || !video)
      return;
    let tl3 = gsapWithCSS.timeline({
      scrollTrigger: {
        trigger: track,
        start: "-25% center",
        end: "bottom bottom",
        scrub: true
      }
    });
    tl3.fromTo(
      mask,
      { clipPath: "inset(50% 50% 50% 50% round 0rem)" },
      { clipPath: "inset(0% 0% 0% 0% round 1.25rem)", ease: "none" }
    );
    const observerCallback = (entries2) => {
      entries2.forEach((entry) => {
        if (entry.isIntersecting && isVideoPlaying) {
          video.play();
        } else {
          video.pause();
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    });
    observer.observe(track);
    const handleClick = (event2) => {
      event2.preventDefault();
      if (!videoHasBeenClicked) {
        video.currentTime = 0;
        video.muted = false;
        video.volume = 0.01;
        video.play();
        videoHasBeenClicked = true;
        isVideoPlaying = true;
        document.dispatchEvent(new CustomEvent("videoFirstClick"));
      } else {
        if (video.paused) {
          video.play();
          video.volume = 0.1;
          isVideoPlaying = true;
        } else {
          video.pause();
          video.volume = 0.1;
          isVideoPlaying = false;
        }
        document.dispatchEvent(
          new CustomEvent("videoPlayStateChanged", {
            detail: { isPlaying: isVideoPlaying }
          })
        );
      }
    };
    video.addEventListener("click", handleClick);
    video.muted = true;
    track._observer = observer;
    track._clickHandler = handleClick;
  }
  function showreelTooltip() {
    const mask = document.querySelector('[ent-vid="mask"]');
    const tooltip = document.querySelector('[ent-vid="tt"]');
    const tooltipInner = document.querySelector('[ent-vid="tt-inner"]');
    const tooltipText1 = document.querySelectorAll('[ent-vid="text1"] .char');
    const tooltipText2 = document.querySelectorAll('[ent-vid="text2"] .char');
    const video = document.querySelector("._wf-ent-hero__emb-y video");
    if (!mask || !tooltip || !tooltipInner || !tooltipText1.length || !tooltipText2.length || !video)
      return;
    const ease = "power2.inOut";
    const duration = 0.5;
    gsapWithCSS.set(tooltip, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    gsapWithCSS.set(tooltipInner, { y: "3rem", autoAlpha: 0 });
    gsapWithCSS.set([tooltipText1, tooltipText2], { y: "101%", autoAlpha: 0 });
    const tl3 = gsapWithCSS.timeline({ paused: true });
    tl3.to(tooltip, { autoAlpha: 1, duration, ease }).to(
      tooltipInner,
      { y: 0, autoAlpha: 1, duration, ease },
      "<"
    );
    const text1Tl = gsapWithCSS.timeline({ paused: true });
    text1Tl.to(tooltipText1, {
      y: 0,
      autoAlpha: 1,
      duration,
      stagger: 0.02,
      ease
    });
    const text2Tl = gsapWithCSS.timeline({ paused: true });
    text2Tl.to(tooltipText2, {
      y: 0,
      autoAlpha: 1,
      duration,
      stagger: 0.02,
      ease
    });
    function updateTooltipPosition(e) {
      const rect = video.getBoundingClientRect();
      const isOverControls = e.clientY > rect.bottom - 100;
      if (isOverControls) {
        gsapWithCSS.to(tooltip, { autoAlpha: 0, duration: 0.2 });
      } else {
        gsapWithCSS.to(tooltip, {
          x: e.clientX,
          y: e.clientY,
          autoAlpha: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
    function showTooltip() {
      tl3.play();
      if (videoHasBeenClicked) {
        if (isVideoPlaying) {
          text1Tl.reverse();
          text2Tl.play();
        } else {
          text2Tl.reverse();
          text1Tl.play();
        }
      } else {
        text2Tl.reverse();
        text1Tl.play();
      }
      document.addEventListener("mousemove", updateTooltipPosition);
    }
    function hideTooltip() {
      tl3.reverse();
      text1Tl.pause();
      text2Tl.pause();
      document.removeEventListener("mousemove", updateTooltipPosition);
    }
    mask.addEventListener("mouseenter", showTooltip);
    mask.addEventListener("mouseleave", hideTooltip);
    document.addEventListener("videoFirstClick", () => {
      text1Tl.reverse();
      text2Tl.play();
    });
    document.addEventListener("videoPlayStateChanged", (event2) => {
      if (event2.detail.isPlaying) {
        text1Tl.reverse();
        text2Tl.play();
      } else {
        text2Tl.reverse();
        text1Tl.play();
      }
    });
    gsapWithCSS.set(tooltip, { x: -9999, y: -9999 });
  }
  function initEnterprise() {
    clientCards();
    initEntHeroVideo();
    initEntWhy();
    testimonialSlider();
    initFaq();
    showreelMask();
    if (!window.isTabletOrBelow) {
      showreelTooltip();
    }
    document.querySelector("[data-orb-wrap]").style.position = "absolute";
    setTimeout(playVideos, 1e3);
  }

  // src/orb.js
  var orb = document.querySelector("[data-orb]");
  var orbOutline = document.querySelector('[orb-out-w="1"]');
  var orbOutline2 = document.querySelector('[orb-out-w="2"]');
  var orbInst;
  var currentTexture = null;
  var darkModeTexture = "https://assets.itsoffbrand.io/ob/textures/ob_texture-old-2.jpg";
  var lightModeTexture = "https://assets.itsoffbrand.io/ob/textures/ob_texture-old.webp";
  function initOrbLoad() {
    orbInst = new Orb(document.querySelector("[data-orb]"));
    if (orb)
      orb.style.willChange = "transform";
    if (orbOutline)
      orbOutline.style.willChange = "transform";
    if (orbOutline2)
      orbOutline2.style.willChange = "transform";
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains("dark")) {
      currentTexture = darkModeTexture;
    } else {
      currentTexture = lightModeTexture;
    }
    orbInst.setTexture(currentTexture);
    const darkModeObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          let newTexture;
          if (htmlElement.classList.contains("dark")) {
            newTexture = darkModeTexture;
          } else if (htmlElement.classList.contains("light")) {
            newTexture = lightModeTexture;
          }
          if (newTexture && newTexture !== currentTexture) {
            currentTexture = newTexture;
            orbInst.setTexture(currentTexture);
          }
        }
      }
    });
    darkModeObserver.observe(htmlElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    window.addEventListener("beforeunload", function() {
      const orbElement = document.querySelector("[data-orb]");
      if (orbElement) {
        orbElement.style.display = "none";
      }
    });
  }
  function orbChange(xPos, yPos, scale, duration = 1, xPosOut1 = xPos, yPosOut1 = yPos, scaleOut1 = scale, durationOut1 = duration, xPosOut2 = xPos, yPosOut2 = yPos, scaleOut2 = scale, durationOut2 = duration) {
    const tl3 = gsapWithCSS.timeline();
    tl3.to(
      orb,
      {
        x: xPos,
        y: yPos,
        scale,
        duration,
        force3D: true
      },
      0
    ).to(
      orbOutline,
      {
        x: xPosOut1,
        y: yPosOut1,
        scale: scaleOut1,
        duration: durationOut1,
        force3D: true
      },
      0
    ).to(
      orbOutline2,
      {
        x: xPosOut2,
        y: yPosOut2,
        scale: scaleOut2,
        duration: durationOut2,
        force3D: true
      },
      0
    );
    return tl3;
  }

  // node_modules/.pnpm/gsap@3.13.0/node_modules/gsap/CustomEase.js
  var gsap7;
  var _coreInitted6;
  var _getGSAP9 = function _getGSAP10() {
    return gsap7 || typeof window !== "undefined" && (gsap7 = window.gsap) && gsap7.registerPlugin && gsap7;
  };
  var _initCore9 = function _initCore10() {
    gsap7 = _getGSAP9();
    if (gsap7) {
      gsap7.registerEase("_CE", CustomEase.create);
      _coreInitted6 = 1;
    } else {
      console.warn("Please gsap.registerPlugin(CustomEase)");
    }
  };
  var _bigNum4 = 1e20;
  var _round11 = function _round12(value) {
    return ~~(value * 1e3 + (value < 0 ? -0.5 : 0.5)) / 1e3;
  };
  var _bonusValidated3 = 1;
  var _numExp4 = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/gi;
  var _needsParsingExp = /[cLlsSaAhHvVtTqQ]/g;
  var _findMinimum = function _findMinimum2(values) {
    var l = values.length, min = _bigNum4, i;
    for (i = 1; i < l; i += 6) {
      +values[i] < min && (min = +values[i]);
    }
    return min;
  };
  var _normalize = function _normalize2(values, height, originY) {
    if (!originY && originY !== 0) {
      originY = Math.max(+values[values.length - 1], +values[1]);
    }
    var tx = +values[0] * -1, ty = -originY, l = values.length, sx = 1 / (+values[l - 2] + tx), sy = -height || (Math.abs(+values[l - 1] - +values[1]) < 0.01 * (+values[l - 2] - +values[0]) ? _findMinimum(values) + ty : +values[l - 1] + ty), i;
    if (sy) {
      sy = 1 / sy;
    } else {
      sy = -sx;
    }
    for (i = 0; i < l; i += 2) {
      values[i] = (+values[i] + tx) * sx;
      values[i + 1] = (+values[i + 1] + ty) * sy;
    }
  };
  var _bezierToPoints = function _bezierToPoints2(x1, y1, x2, y2, x3, y3, x4, y4, threshold, points, index) {
    var x12 = (x1 + x2) / 2, y12 = (y1 + y2) / 2, x23 = (x2 + x3) / 2, y23 = (y2 + y3) / 2, x34 = (x3 + x4) / 2, y34 = (y3 + y4) / 2, x123 = (x12 + x23) / 2, y123 = (y12 + y23) / 2, x234 = (x23 + x34) / 2, y234 = (y23 + y34) / 2, x1234 = (x123 + x234) / 2, y1234 = (y123 + y234) / 2, dx = x4 - x1, dy = y4 - y1, d2 = Math.abs((x2 - x4) * dy - (y2 - y4) * dx), d3 = Math.abs((x3 - x4) * dy - (y3 - y4) * dx), length;
    if (!points) {
      points = [{
        x: x1,
        y: y1
      }, {
        x: x4,
        y: y4
      }];
      index = 1;
    }
    points.splice(index || points.length - 1, 0, {
      x: x1234,
      y: y1234
    });
    if ((d2 + d3) * (d2 + d3) > threshold * (dx * dx + dy * dy)) {
      length = points.length;
      _bezierToPoints2(x1, y1, x12, y12, x123, y123, x1234, y1234, threshold, points, index);
      _bezierToPoints2(x1234, y1234, x234, y234, x34, y34, x4, y4, threshold, points, index + 1 + (points.length - length));
    }
    return points;
  };
  var CustomEase = /* @__PURE__ */ function() {
    function CustomEase2(id, data, config3) {
      _coreInitted6 || _initCore9();
      this.id = id;
      _bonusValidated3 && this.setData(data, config3);
    }
    var _proto = CustomEase2.prototype;
    _proto.setData = function setData(data, config3) {
      config3 = config3 || {};
      data = data || "0,0,1,1";
      var values = data.match(_numExp4), closest = 1, points = [], lookup = [], precision = config3.precision || 1, fast = precision <= 1, l, a1, a2, i, inc, j, point, prevPoint, p;
      this.data = data;
      if (_needsParsingExp.test(data) || ~data.indexOf("M") && data.indexOf("C") < 0) {
        values = stringToRawPath(data)[0];
      }
      l = values.length;
      if (l === 4) {
        values.unshift(0, 0);
        values.push(1, 1);
        l = 8;
      } else if ((l - 2) % 6) {
        throw "Invalid CustomEase";
      }
      if (+values[0] !== 0 || +values[l - 2] !== 1) {
        _normalize(values, config3.height, config3.originY);
      }
      this.segment = values;
      for (i = 2; i < l; i += 6) {
        a1 = {
          x: +values[i - 2],
          y: +values[i - 1]
        };
        a2 = {
          x: +values[i + 4],
          y: +values[i + 5]
        };
        points.push(a1, a2);
        _bezierToPoints(a1.x, a1.y, +values[i], +values[i + 1], +values[i + 2], +values[i + 3], a2.x, a2.y, 1 / (precision * 2e5), points, points.length - 1);
      }
      l = points.length;
      for (i = 0; i < l; i++) {
        point = points[i];
        prevPoint = points[i - 1] || point;
        if ((point.x > prevPoint.x || prevPoint.y !== point.y && prevPoint.x === point.x || point === prevPoint) && point.x <= 1) {
          prevPoint.cx = point.x - prevPoint.x;
          prevPoint.cy = point.y - prevPoint.y;
          prevPoint.n = point;
          prevPoint.nx = point.x;
          if (fast && i > 1 && Math.abs(prevPoint.cy / prevPoint.cx - points[i - 2].cy / points[i - 2].cx) > 2) {
            fast = 0;
          }
          if (prevPoint.cx < closest) {
            if (!prevPoint.cx) {
              prevPoint.cx = 1e-3;
              if (i === l - 1) {
                prevPoint.x -= 1e-3;
                closest = Math.min(closest, 1e-3);
                fast = 0;
              }
            } else {
              closest = prevPoint.cx;
            }
          }
        } else {
          points.splice(i--, 1);
          l--;
        }
      }
      l = 1 / closest + 1 | 0;
      inc = 1 / l;
      j = 0;
      point = points[0];
      if (fast) {
        for (i = 0; i < l; i++) {
          p = i * inc;
          if (point.nx < p) {
            point = points[++j];
          }
          a1 = point.y + (p - point.x) / point.cx * point.cy;
          lookup[i] = {
            x: p,
            cx: inc,
            y: a1,
            cy: 0,
            nx: 9
          };
          if (i) {
            lookup[i - 1].cy = a1 - lookup[i - 1].y;
          }
        }
        j = points[points.length - 1];
        lookup[l - 1].cy = j.y - a1;
        lookup[l - 1].cx = j.x - lookup[lookup.length - 1].x;
      } else {
        for (i = 0; i < l; i++) {
          if (point.nx < i * inc) {
            point = points[++j];
          }
          lookup[i] = point;
        }
        if (j < points.length - 1) {
          lookup[i - 1] = points[points.length - 2];
        }
      }
      this.ease = function(p2) {
        var point2 = lookup[p2 * l | 0] || lookup[l - 1];
        if (point2.nx < p2) {
          point2 = point2.n;
        }
        return point2.y + (p2 - point2.x) / point2.cx * point2.cy;
      };
      this.ease.custom = this;
      this.id && gsap7 && gsap7.registerEase(this.id, this.ease);
      return this;
    };
    _proto.getSVGData = function getSVGData(config3) {
      return CustomEase2.getSVGData(this, config3);
    };
    CustomEase2.create = function create(id, data, config3) {
      return new CustomEase2(id, data, config3).ease;
    };
    CustomEase2.register = function register3(core) {
      gsap7 = core;
      _initCore9();
    };
    CustomEase2.get = function get2(id) {
      return gsap7.parseEase(id);
    };
    CustomEase2.getSVGData = function getSVGData(ease, config3) {
      config3 = config3 || {};
      var width = config3.width || 100, height = config3.height || 100, x = config3.x || 0, y = (config3.y || 0) + height, e = gsap7.utils.toArray(config3.path)[0], a, slope, i, inc, tx, ty, precision, threshold, prevX, prevY;
      if (config3.invert) {
        height = -height;
        y = 0;
      }
      if (typeof ease === "string") {
        ease = gsap7.parseEase(ease);
      }
      if (ease.custom) {
        ease = ease.custom;
      }
      if (ease instanceof CustomEase2) {
        a = rawPathToString(transformRawPath([ease.segment], width, 0, 0, -height, x, y));
      } else {
        a = [x, y];
        precision = Math.max(5, (config3.precision || 1) * 200);
        inc = 1 / precision;
        precision += 2;
        threshold = 5 / precision;
        prevX = _round11(x + inc * width);
        prevY = _round11(y + ease(inc) * -height);
        slope = (prevY - y) / (prevX - x);
        for (i = 2; i < precision; i++) {
          tx = _round11(x + i * inc * width);
          ty = _round11(y + ease(i * inc) * -height);
          if (Math.abs((ty - prevY) / (tx - prevX) - slope) > threshold || i === precision - 1) {
            a.push(prevX, prevY);
            slope = (ty - prevY) / (tx - prevX);
          }
          prevX = tx;
          prevY = ty;
        }
        a = "M" + a.join(",");
      }
      e && e.setAttribute("d", a);
      return a;
    };
    return CustomEase2;
  }();
  CustomEase.version = "3.13.0";
  CustomEase.headless = true;
  _getGSAP9() && gsap7.registerPlugin(CustomEase);

  // src/preloader.js
  function runPreloaderAnimations(callback) {
    document.body.style.cursor = "progress";
    runSplit("[split-hero]", "chars");
    window.SScroll.stop();
    gsapWithCSS.registerPlugin(CustomEase);
    let loadEase = "M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1";
    let loaderDuration = "4";
    if (localStorage.getItem("visited") !== null) {
      loaderDuration = 1;
    }
    localStorage.setItem("visited", "true");
    const hasRunBefore = sessionStorage.getItem("preloaderHasRun");
    if (hasRunBefore)
      return;
    const pathElements = document.querySelectorAll(".st-x, .st-c");
    const fillElement = document.querySelector(".ob-fill-fill");
    const orbElement = document.querySelector("[data-orb]");
    const orbOutline3 = document.querySelector('[orb-outline="1"]');
    const orbOutline22 = document.querySelector('[orb-outline="2"]');
    const orbOutlineIn1 = document.querySelector('[orb-out-w="1"]');
    const orbOutlineIn2 = document.querySelector('[orb-out-w="2"]');
    const pageName = document.querySelector("[data-page]").dataset.page;
    const preloader = document.querySelector("[preloader]");
    const prePercent = document.querySelector("[pre-percent]");
    const preText = document.querySelectorAll("[pre-text] .char");
    const hhLetters2 = document.querySelectorAll("[split-hero] .char");
    const hcsItems2 = document.querySelectorAll(".hcs-item-w:not(.is-cs)");
    const caseHeroImg = document.querySelectorAll("[case-hero-img]");
    const caseStats = document.querySelectorAll("[case-stats] .text-mini");
    const formItem = document.querySelectorAll("[contact-form]");
    const serviceBlock = document.querySelectorAll(".ser-grid-item");
    const aboutIntroText = document.querySelectorAll("[abt-intro] .line");
    const aboutMenuRows = document.querySelectorAll(".abt-sticky-menu-row");
    const careerCards = document.querySelectorAll("[data-career-item]");
    const privacyText = document.querySelectorAll("[data-privacy-text]");
    gsapWithCSS.set(preloader, {
      autoAlpha: 1
    });
    gsapWithCSS.set(orbElement, {
      autoAlpha: 0,
      width: "0em",
      height: "0em",
      minHeight: "auto",
      minWidth: "auto",
      transform: "translate(8em, 8.1em)"
    });
    gsapWithCSS.set(orbOutline3, {
      autoAlpha: 0,
      scale: 0
    });
    gsapWithCSS.set(orbOutline22, {
      autoAlpha: 0,
      scale: 0
    });
    if (!window.isTabletOrBelow) {
      gsapWithCSS.set(hhLetters2, {
        y: "-101%"
      });
    } else {
      gsapWithCSS.set(hhLetters2, {
        y: "-101%",
        autoAlpha: 0
      });
    }
    gsapWithCSS.set(preText, {
      yPercent: 101
    });
    gsapWithCSS.set(prePercent, {
      yPercent: 101
    });
    function toArray4(nodeList) {
      if (!nodeList)
        return [];
      return [].slice.call(nodeList);
    }
    const hcsItemsArray = toArray4(hcsItems2);
    if (hcsItemsArray.length) {
      gsapWithCSS.set(hcsItemsArray, {
        autoAlpha: 0,
        yPercent: "100"
      });
    }
    const formItemArray = toArray4(formItem);
    if (formItemArray.length) {
      gsapWithCSS.set(formItemArray, {
        autoAlpha: 0,
        y: "10rem"
      });
    }
    const serviceBlockArray = toArray4(serviceBlock);
    if (serviceBlockArray.length) {
      gsapWithCSS.set(serviceBlockArray, {
        autoAlpha: 0,
        yPercent: 100
      });
    }
    const aboutMenuRowsArray = toArray4(aboutMenuRows);
    if (aboutMenuRowsArray.length) {
      gsapWithCSS.set(aboutMenuRowsArray, {
        autoAlpha: 0,
        y: "101%"
      });
    }
    const aboutIntroTextArray = toArray4(aboutIntroText);
    if (aboutIntroTextArray.length) {
      gsapWithCSS.set(aboutIntroTextArray, {
        autoAlpha: 0,
        yPercent: -101
      });
    }
    const caseHeroImgElements = toArray4(caseHeroImg);
    if (caseHeroImgElements.length) {
      gsapWithCSS.set(caseHeroImgElements, {
        x: "10em",
        clipPath: "inset(0% 0% 100% 0%)"
      });
    }
    const caseStatsArray = toArray4(caseStats);
    if (caseStatsArray.length) {
      gsapWithCSS.set(caseStatsArray, {
        y: "101%"
      });
    }
    const careerCardsArray = toArray4(careerCards);
    if (careerCardsArray.length) {
      gsapWithCSS.set(careerCardsArray, {
        y: "4rem",
        autoAlpha: 0
      });
    }
    const careerArticleCards = document.querySelectorAll("[data-career-card]");
    const careerArticleCardsArray = toArray4(careerArticleCards);
    if (careerArticleCardsArray.length) {
      gsapWithCSS.set(careerArticleCardsArray, {
        y: "4rem",
        autoAlpha: 0
      });
    }
    const carBack = document.querySelector(".car-back-w");
    if (carBack) {
      gsapWithCSS.set(carBack, {
        y: "4rem",
        autoAlpha: 0
      });
    }
    const privacyArray = toArray4(privacyText);
    if (privacyArray.length) {
      gsapWithCSS.set(privacyArray, {
        y: "10rem",
        autoAlpha: 0
      });
    }
    pathElements.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      gsapWithCSS.fromTo(
        path,
        {
          strokeDashoffset: length
        },
        {
          strokeDashoffset: 0,
          duration: 1,
          ease: "power1.inOut"
        }
      );
    });
    gsapWithCSS.to(preText, {
      delay: 0.5,
      yPercent: 0,
      duration: 1,
      ease: "power4.inOut",
      stagger: { each: 0.03, from: "random" }
    });
    gsapWithCSS.to(prePercent, {
      delay: 0.5,
      yPercent: 0,
      duration: 1,
      ease: "power4.inOut"
    });
    const fillAnimation = gsapWithCSS.fromTo(
      fillElement,
      {
        scaleY: 0
      },
      {
        scaleY: 1,
        duration: loaderDuration,
        ease: CustomEase.create("custom", loadEase),
        delay: 1.5,
        onComplete: function() {
          gsapWithCSS.to(preText, {
            delay: 0.5,
            yPercent: -101,
            duration: 1,
            ease: "power4.inOut",
            stagger: { each: 0.03, from: "random" }
          });
          gsapWithCSS.to(".ob-fill-mask", {
            delay: 0.5,
            duration: 0.8,
            ease: "power2.inOut",
            clipPath: "inset(0% 0% 100% 0%)"
          });
          pathElements.forEach((path) => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            gsapWithCSS.fromTo(
              path,
              {
                strokeDashoffset: 0
              },
              {
                strokeDashoffset: length,
                delay: 0.5,
                duration: 1,
                ease: "power1.inOut"
              }
            );
          });
          gsapWithCSS.to(prePercent, {
            delay: 0.5,
            yPercent: 100,
            duration: 1,
            ease: "power4.inOut"
          });
          gsapWithCSS.to(orbElement, {
            autoAlpha: 1,
            width: "4.3em",
            height: "4.3em",
            duration: 1
          });
          gsapWithCSS.to(orbOutline3, {
            autoAlpha: 1,
            scale: 1,
            duration: 2,
            ease: "power2.inOut"
          });
          let hhDuration = "1";
          if (pageName === "home") {
            gsapWithCSS.to(orbOutline22, {
              delay: 1,
              autoAlpha: 1,
              scale: 1,
              duration: 2,
              ease: "power2.inOut"
            });
            if (!window.isTabletOrBelow) {
              gsapWithCSS.to(orbOutline3, {
                scale: 1.3,
                duration: 2,
                ease: "power2.inOut",
                delay: 2,
                onComplete: function() {
                  gsapWithCSS.to(orbOutline3, {
                    autoAlpha: 1,
                    scale: 1.2,
                    duration: 2,
                    ease: "power2.inOut"
                  });
                }
              });
              gsapWithCSS.to(orbOutline22, {
                scale: 0.9,
                duration: 2.5,
                ease: "power2.inOut",
                delay: 3,
                onComplete: function() {
                  gsapWithCSS.to(orbOutline3, {
                    autoAlpha: 1,
                    scale: 1.2,
                    duration: 2,
                    ease: "power2.inOut"
                  });
                }
              });
              gsapWithCSS.to(orbElement, {
                transform: "translate(0em, 0em)",
                width: "80vh",
                height: "80vh",
                minHeight: "45em",
                minWidth: "45em",
                duration: 1,
                ease: "power2.inOut",
                delay: 1,
                onComplete: function() {
                  gsapWithCSS.to(preloader, {
                    autoAlpha: 0,
                    duration: 0.2
                  });
                  if (callback)
                    callback();
                  hudUiAnimations();
                }
              });
            } else {
              gsapWithCSS.to(orbOutline3, {
                scale: 1,
                duration: 2,
                ease: "power2.inOut",
                delay: 2,
                onComplete: function() {
                  gsapWithCSS.to(orbOutline3, {
                    autoAlpha: 1,
                    scale: 0.9,
                    duration: 2,
                    ease: "power2.inOut"
                  });
                }
              });
              gsapWithCSS.to(orbOutline22, {
                scale: 0.6,
                duration: 2.5,
                ease: "power2.inOut",
                delay: 3,
                onComplete: function() {
                  gsapWithCSS.to(orbOutline3, {
                    autoAlpha: 1,
                    scale: 0.9,
                    duration: 2,
                    ease: "power2.inOut"
                  });
                }
              });
              gsapWithCSS.to(orbElement, {
                transform: "translate(0em, 0em)",
                width: "90vw",
                height: "90vw",
                duration: 1,
                ease: "power2.inOut",
                delay: 1,
                onComplete: function() {
                  gsapWithCSS.to(preloader, {
                    autoAlpha: 0,
                    duration: 0.2
                  });
                  if (callback)
                    callback();
                  hudUiAnimations();
                }
              });
            }
            if (!window.isTabletOrBelow) {
              gsapWithCSS.to(".hh-text-block .char", {
                delay: 1,
                y: "0%",
                duration: 1,
                ease: "power4.inOut",
                stagger: { each: 0.03, from: "random" }
              });
              gsapWithCSS.to(".home-hero-tablet-text .char", {
                delay: 1,
                y: "0%",
                duration: 1,
                ease: "power4.inOut",
                stagger: { each: 0.03, from: "random" }
              });
            } else {
              gsapWithCSS.to(".hh-text-block .char", {
                delay: 1,
                y: "0%",
                autoAlpha: 1,
                duration: 1,
                ease: "power4.inOut",
                stagger: { each: 0.03, from: "random" }
              });
              gsapWithCSS.to(".home-hero-tablet-text .char", {
                delay: 1,
                y: "0%",
                autoAlpha: 1,
                duration: 1,
                ease: "power4.inOut",
                stagger: { each: 0.03, from: "random" }
              });
            }
            gsapWithCSS.from('[hh-tb="1"]', {
              delay: 2,
              x: "10em",
              duration: hhDuration,
              ease: "power2.inOut"
            });
            gsapWithCSS.from('[hh-tb="2"]', {
              delay: 2.1,
              x: "-10em",
              duration: hhDuration,
              ease: "power2.inOut"
            });
            gsapWithCSS.from('[hh-tb="3"]', {
              delay: 2.2,
              x: "10em",
              duration: hhDuration,
              ease: "power2.inOut",
              onComplete: function() {
                document.body.style.cursor = "auto";
                window.SScroll.start();
                if (!window.isTabletOrBelow) {
                  heroScrollTrigger();
                  orbHomePath();
                }
              }
            });
            gsapWithCSS.to(hcsItems2, {
              delay: 1,
              autoAlpha: 1,
              yPercent: 0,
              duration: 1,
              stagger: 0.2,
              ease: "power2.inOut"
            });
          } else if (pageName === "work") {
            gsapWithCSS.to(orbOutline22, {
              delay: 0.5,
              autoAlpha: 1,
              scale: 1,
              duration: 2,
              ease: "power2.inOut"
            });
            gsapWithCSS.to(orbOutlineIn1, {
              x: "0vw",
              y: "-35vh",
              scale: 0.3,
              duration: 1.5,
              ease: "power2.inOut",
              delay: 1
            });
            gsapWithCSS.to(orbOutlineIn2, {
              x: "0vw",
              y: "5vh",
              scale: 1,
              duration: 1.5,
              ease: "power2.inOut",
              delay: 1
            });
            gsapWithCSS.to(orbElement, {
              width: "80vh",
              height: "80vh",
              minHeight: "45em",
              minWidth: "45em",
              x: "0vw",
              y: "25vh",
              scale: 1,
              duration: 1,
              ease: "power2.inOut",
              delay: 1,
              onComplete: function() {
                if (callback)
                  callback();
                hudUiAnimations();
              }
            });
            if (!window.isTabletOrBelow) {
              gsapWithCSS.to(hhLetters2, {
                delay: 1,
                y: "0%",
                duration: 1,
                ease: "power4.inOut",
                stagger: { each: 0.03, from: "random" }
              });
            } else {
              gsapWithCSS.to(hhLetters2, {
                delay: 1,
                autoAlpha: 1,
                y: "0%",
                duration: 1,
                ease: "power4.inOut",
                stagger: { each: 0.03, from: "random" }
              });
            }
            gsapWithCSS.from('[hh-tb="1"]', {
              delay: 2,
              x: "10em",
              duration: hhDuration,
              ease: "power2.inOut"
            });
            gsapWithCSS.from('[hh-tb="2"]', {
              delay: 2.1,
              x: "-10em",
              duration: hhDuration,
              ease: "power2.inOut",
              onComplete: function() {
                document.body.style.cursor = "auto";
                window.SScroll.start();
                workHeroScroll();
              }
            });
            gsapWithCSS.to(hcsItems2, {
              delay: 1,
              autoAlpha: 1,
              yPercent: 0,
              duration: hhDuration,
              stagger: 0.2,
              ease: "power2.inOut"
            });
            document.querySelector("[data-orb-wrap]").style.position = "absolute";
          } else if (pageName === "case") {
            gsapWithCSS.to(orbOutline22, {
              delay: 0.5,
              autoAlpha: 1,
              scale: 1,
              duration: 2,
              ease: "power2.inOut"
            });
            gsapWithCSS.to(orbOutlineIn1, {
              x: "0vw",
              y: "-35vh",
              scale: 0.3,
              duration: 1.5,
              ease: "power2.inOut",
              delay: 1
            });
            gsapWithCSS.to(orbOutlineIn2, {
              x: "0vw",
              y: "5vh",
              scale: 1,
              duration: 1.5,
              ease: "power2.inOut",
              delay: 1
            });
            gsapWithCSS.to(orbElement, {
              width: "80vh",
              height: "80vh",
              minHeight: "45em",
              minWidth: "45em",
              x: "0vw",
              y: "0vh",
              scale: 0,
              duration: 1,
              ease: "power2.inOut",
              delay: 1,
              onComplete: function() {
                if (callback)
                  callback();
                document.body.style.cursor = "auto";
                window.SScroll.start();
                hudUiAnimations();
              }
            });
            if (!window.isTabletOrBelow) {
              gsapWithCSS.to(hhLetters2, {
                delay: 1,
                y: "0%",
                duration: 1,
                ease: "power4.inOut",
                stagger: { each: 0.03, from: "random" }
              });
            } else {
              gsapWithCSS.to(hhLetters2, {
                delay: 1,
                autoAlpha: 1,
                y: "0%",
                duration: 1,
                ease: "power4.inOut",
                stagger: { each: 0.03, from: "random" }
              });
            }
            gsapWithCSS.from('[hh-tb="1"]', {
              delay: 2,
              x: "10em",
              duration: hhDuration,
              ease: "power2.inOut"
            });
            gsapWithCSS.to("[case-hero-img]", {
              delay: 1.5,
              x: "0em",
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.5,
              ease: "power2.inOut"
            });
            gsapWithCSS.to(caseStats, {
              delay: 2,
              y: "0%",
              duration: 0.5,
              stagger: 0.05
            });
            document.querySelector("[data-orb-wrap]").style.position = "absolute";
          } else if (pageName === "privacy") {
            gsapWithCSS.to(orbOutline22, {
              delay: 0.5,
              autoAlpha: 1,
              scale: 1,
              duration: 2,
              ease: "power2.inOut"
            });
            gsapWithCSS.to(orbOutlineIn1, {
              x: "0vw",
              y: "-35vh",
              scale: 0.3,
              duration: 1.5,
              ease: "power2.inOut",
              delay: 1
            });
            gsapWithCSS.to(orbOutlineIn2, {
              x: "0vw",
              y: "5vh",
              scale: 1,
              duration: 1.5,
              ease: "power2.inOut",
              delay: 1
            });
            gsapWithCSS.to(orbElement, {
              width: "80vh",
              height: "80vh",
              minHeight: "45em",
              minWidth: "45em",
              x: "0vw",
              y: "0vh",
              scale: 0,
              duration: 1,
              ease: "power2.inOut",
              delay: 1,
              onComplete: function() {
                document.body.style.cursor = "auto";
                window.SScroll.start();
                if (callback)
                  callback();
                hudUiAnimations();
              }
            });
            if (!window.isTabletOrBelow) {
              gsapWithCSS.to(hhLetters2, {
                delay: 1,
                y: "0%",
                duration: 1,
                ease: "power4.inOut",
                stagger: { each: 0.03, from: "random" }
              });
            } else {
              gsapWithCSS.to(hhLetters2, {
                delay: 1,
                autoAlpha: 1,
                y: "0%",
                duration: 1,
                ease: "power4.inOut",
                stagger: { each: 0.03, from: "random" }
              });
            }
            gsapWithCSS.from('[hh-tb="1"]', {
              delay: 2,
              x: "10em",
              duration: hhDuration,
              ease: "power2.inOut"
            });
            gsapWithCSS.to(privacyText, {
              delay: 2,
              y: "0rem",
              autoAlpha: 1,
              duration: 0.5,
              stagger: 0.05
            });
            document.querySelector("[data-orb-wrap]").style.position = "absolute";
          } else if (pageName === "contact") {
            gsapWithCSS.to(orbOutline22, {
              delay: 0.5,
              autoAlpha: 1,
              scale: 1,
              duration: 2,
              ease: "power2.inOut"
            });
            gsapWithCSS.to(orbOutlineIn1, {
              x: "-25vw",
              y: "-25vh",
              scale: 0.6,
              duration: 1.5,
              ease: "power2.inOut",
              delay: 1
            });
            gsapWithCSS.to(orbOutlineIn2, {
              x: "0vw",
              y: "11vh",
              scale: 1,
              duration: 1.5,
              ease: "power2.inOut",
              delay: 1
            });
            gsapWithCSS.to(orbElement, {
              width: "80vh",
              height: "80vh",
              minHeight: "45em",
              minWidth: "45em",
              x: "25vw",
              y: "50vh",
              scale: 2,
              duration: 1,
              ease: "power2.inOut",
              delay: 1,
              onComplete: function() {
                document.body.style.cursor = "auto";
                window.SScroll.start();
                if (callback)
                  callback();
                hudUiAnimations();
              }
            });
            if (!window.isTabletOrBelow) {
              gsapWithCSS.to(hhLetters2, {
                delay: 1,
                y: "0%",
                duration: 1,
                ease: "power4.inOut",
                stagger: { each: 0.03, from: "random" }
              });
            } else {
              gsapWithCSS.to(hhLetters2, {
                delay: 1,
                autoAlpha: 1,
                y: "0%",
                duration: 1,
                ease: "power4.inOut",
                stagger: { each: 0.03, from: "random" }
              });
            }
            gsapWithCSS.from('[hh-tb="1"]', {
              delay: 2,
              x: "10em",
              duration: hhDuration,
              ease: "power2.inOut"
            });
            gsapWithCSS.from('[hh-tb="2"]', {
              delay: 2.1,
              x: "-10em",
              duration: hhDuration,
              ease: "power2.inOut"
            });
            gsapWithCSS.to(formItem, {
              delay: 1,
              autoAlpha: 1,
              y: "0rem",
              duration: hhDuration,
              stagger: 0.2,
              ease: "power2.inOut"
            });
          } else if (pageName === "services") {
            gsapWithCSS.set(".ser-grid-item.is--active .is-ser-title", {
              scale: 0.6
            });
            gsapWithCSS.set(".ser-grid-item.is--active .ser-vid-ul", {
              height: "0%"
            });
            gsapWithCSS.set(".ser-grid-item.is--active .ser-info-w", {
              clipPath: "inset(0% 0% 0% 0%)"
            });
            gsapWithCSS.set(".ser-grid-item:not(.is--active) .ser-info-w", {
              clipPath: "inset(0% 0% 100% 0%)"
            });
            gsapWithCSS.set(".ser-grid-item.is--active .ser-cross", {
              rotate: "45deg"
            });
            gsapWithCSS.to(orbOutline22, {
              delay: 0.5,
              autoAlpha: 1,
              scale: 1,
              duration: 2,
              ease: "power2.inOut"
            });
            gsapWithCSS.to(orbOutlineIn1, {
              x: "0vw",
              y: "-vh",
              scale: 0.6,
              duration: 1.5,
              ease: "power2.inOut",
              delay: 1
            });
            gsapWithCSS.to(orbOutlineIn2, {
              x: "0vw",
              y: "0vh",
              scale: 1,
              duration: 1.5,
              ease: "power2.inOut",
              delay: 1
            });
            gsapWithCSS.to(orbElement, {
              width: "80vh",
              height: "80vh",
              minHeight: "45em",
              minWidth: "45em",
              x: "-25vw",
              y: "50vh",
              scale: 1.5,
              duration: 1,
              ease: "power2.inOut",
              delay: 1,
              onComplete: function() {
                document.body.style.cursor = "auto";
                window.SScroll.start();
                if (callback)
                  callback();
                hudUiAnimations();
              }
            });
            if (!window.isTabletOrBelow) {
              gsapWithCSS.to(hhLetters2, {
                delay: 1,
                y: "0%",
                duration: 1,
                ease: "power4.inOut",
                stagger: { each: 0.03, from: "random" }
              });
            } else {
              gsapWithCSS.to(hhLetters2, {
                delay: 1,
                autoAlpha: 1,
                y: "0%",
                duration: 1,
                ease: "power4.inOut",
                stagger: { each: 0.03, from: "random" }
              });
            }
            gsapWithCSS.from('[hh-tb="1"]', {
              delay: 2,
              x: "10em",
              duration: hhDuration,
              ease: "power2.inOut"
            });
            gsapWithCSS.from('[hh-tb="2"]', {
              delay: 2.1,
              x: "-10em",
              duration: hhDuration,
              ease: "power2.inOut"
            });
            gsapWithCSS.to(serviceBlock, {
              delay: 1,
              autoAlpha: 1,
              yPercent: 0,
              duration: hhDuration,
              stagger: 0.2,
              ease: "power2.inOut"
            });
          } else if (pageName === "about") {
            gsapWithCSS.to(orbOutline22, {
              delay: 0.5,
              autoAlpha: 1,
              scale: 1,
              duration: 2,
              ease: "power2.inOut"
            });
            if (!window.isTabletOrBelow) {
              gsapWithCSS.to(orbOutlineIn1, {
                x: "-25vw",
                y: "0vh",
                scale: 0.6,
                duration: 1.5,
                ease: "power2.inOut",
                delay: 1
              });
              gsapWithCSS.to(orbOutlineIn2, {
                x: "0vw",
                y: "0vh",
                scale: 1,
                duration: 1.5,
                ease: "power2.inOut",
                delay: 1
              });
              gsapWithCSS.to(orbElement, {
                width: "80vh",
                height: "80vh",
                minHeight: "45em",
                minWidth: "45em",
                x: "25vw",
                y: "0vh",
                scale: 2,
                duration: 1,
                ease: "power2.inOut",
                delay: 1,
                onComplete: function() {
                  document.body.style.cursor = "auto";
                  window.SScroll.start();
                  if (callback)
                    callback();
                  if (!window.isTabletOrBelow) {
                    orbAboutPath();
                  }
                  hudUiAnimations();
                }
              });
            } else {
              gsapWithCSS.to(orbOutlineIn1, {
                x: "-25vw",
                y: "0vh",
                scale: 0.4,
                duration: 1.3,
                ease: "power2.inOut",
                delay: 1
              });
              gsapWithCSS.to(orbOutlineIn2, {
                x: "0vw",
                y: "0vh",
                scale: 0.8,
                duration: 1.3,
                ease: "power2.inOut",
                delay: 1
              });
              gsapWithCSS.to(orbElement, {
                width: "90vw",
                height: "90vw",
                x: "25vw",
                y: "0vh",
                scale: 1,
                duration: 1,
                ease: "power2.inOut",
                delay: 1,
                onComplete: function() {
                  document.body.style.cursor = "auto";
                  window.SScroll.start();
                  if (callback)
                    callback();
                  if (!window.isTabletOrBelow) {
                    orbAboutPath();
                  }
                  hudUiAnimations();
                }
              });
            }
            if (!window.isTabletOrBelow) {
              gsapWithCSS.to(hhLetters2, {
                delay: 1,
                y: "0%",
                duration: 1,
                ease: "power4.inOut",
                stagger: { each: 0.03, from: "random" }
              });
            } else {
              gsapWithCSS.to(hhLetters2, {
                delay: 1,
                autoAlpha: 1,
                y: "0%",
                duration: 1,
                ease: "power4.inOut",
                stagger: { each: 0.03, from: "random" }
              });
            }
            gsapWithCSS.from('[hh-tb="1"]', {
              delay: 2,
              x: "5em",
              duration: hhDuration,
              ease: "power2.inOut"
            });
            gsapWithCSS.from('[hh-tb="2"]', {
              delay: 2.1,
              x: "-5em",
              duration: hhDuration,
              ease: "power2.inOut"
            });
            gsapWithCSS.to(aboutMenuRows, {
              delay: 2,
              autoAlpha: 1,
              y: "0",
              stagger: 0.1,
              duration: 1
            });
            gsapWithCSS.to(aboutIntroText, {
              delay: 2,
              autoAlpha: 1,
              yPercent: 0,
              duration: 1,
              ease: "power4.inOut",
              stagger: { each: 0.05, from: "random" }
            });
          } else if (pageName === "careers") {
            gsapWithCSS.to(orbOutline22, {
              delay: 0.5,
              autoAlpha: 1,
              scale: 1,
              duration: 2,
              ease: "power2.inOut"
            });
            gsapWithCSS.to(orbOutlineIn1, {
              x: "-25vw",
              y: "0vh",
              scale: 0.6,
              duration: 1.5,
              ease: "power2.inOut",
              delay: 1
            });
            gsapWithCSS.to(orbOutlineIn2, {
              x: "0vw",
              y: "0vh",
              scale: 1,
              duration: 1.5,
              ease: "power2.inOut",
              delay: 1
            });
            gsapWithCSS.to(orbElement, {
              width: "80vh",
              height: "80vh",
              minHeight: "45em",
              minWidth: "45em",
              x: "25vw",
              y: "0vh",
              scale: 2,
              duration: 1,
              ease: "power2.inOut",
              delay: 1,
              onComplete: function() {
                document.body.style.cursor = "auto";
                window.SScroll.start();
                if (callback)
                  callback();
                hudUiAnimations();
              }
            });
            if (!window.isTabletOrBelow) {
              gsapWithCSS.to(hhLetters2, {
                delay: 1,
                y: "0%",
                duration: 1,
                ease: "power4.inOut",
                stagger: { each: 0.03, from: "random" }
              });
            } else {
              gsapWithCSS.to(hhLetters2, {
                delay: 1,
                autoAlpha: 1,
                y: "0%",
                duration: 1,
                ease: "power4.inOut",
                stagger: { each: 0.03, from: "random" }
              });
            }
            gsapWithCSS.from('[hh-tb="1"]', {
              delay: 2,
              x: "5em",
              duration: hhDuration,
              ease: "power2.inOut"
            });
            gsapWithCSS.from('[hh-tb="2"]', {
              delay: 2.1,
              x: "-5em",
              duration: hhDuration,
              ease: "power2.inOut"
            });
            document.querySelector("[data-orb-wrap]").style.position = "absolute";
          } else if (pageName === "careers-article") {
            gsapWithCSS.to(orbOutline22, {
              delay: 0.5,
              autoAlpha: 1,
              scale: 1,
              duration: 2,
              ease: "power2.inOut"
            });
            gsapWithCSS.to(orbOutlineIn1, {
              x: "-25vw",
              y: "0vh",
              scale: 0.6,
              duration: 1.5,
              ease: "power2.inOut",
              delay: 1
            });
            gsapWithCSS.to(orbOutlineIn2, {
              x: "0vw",
              y: "0vh",
              scale: 1,
              duration: 1.5,
              ease: "power2.inOut",
              delay: 1
            });
            gsapWithCSS.to(orbElement, {
              width: "80vh",
              height: "80vh",
              minHeight: "45em",
              minWidth: "45em",
              x: "25vw",
              y: "0vh",
              scale: 2,
              duration: 1,
              ease: "power2.inOut",
              delay: 1,
              onComplete: function() {
                document.body.style.cursor = "auto";
                window.SScroll.start();
                if (callback)
                  callback();
                hudUiAnimations();
              }
            });
            if (carBack) {
              gsapWithCSS.to(carBack, {
                delay: 1.5,
                autoAlpha: 1,
                y: "0rem",
                duration: 1,
                ease: "power2.inOut"
              });
            }
            gsapWithCSS.to(careerArticleCards, {
              delay: 1.6,
              autoAlpha: 1,
              y: "0rem",
              duration: 1,
              ease: "power2.inOut"
            });
            document.querySelector("[data-orb-wrap]").style.position = "absolute";
          } else if (pageName === "enterprise") {
            gsapWithCSS.to(orbOutline22, {
              delay: 0.5,
              autoAlpha: 1,
              scale: 1,
              duration: 2,
              ease: "power2.inOut"
            });
            gsapWithCSS.to(orbOutlineIn1, {
              x: "-25vw",
              y: "-25vh",
              scale: 0.6,
              duration: 1.5,
              ease: "power2.inOut",
              delay: 1
            });
            gsapWithCSS.to(orbOutlineIn2, {
              x: "0vw",
              y: "11vh",
              scale: 1,
              duration: 1.5,
              ease: "power2.inOut",
              delay: 1
            });
            gsapWithCSS.to(orbElement, {
              width: "80vh",
              height: "80vh",
              minHeight: "45em",
              minWidth: "45em",
              x: "25vw",
              y: "50vh",
              scale: 2,
              duration: 1,
              ease: "power2.inOut",
              delay: 1,
              onComplete: function() {
                document.body.style.cursor = "auto";
                window.SScroll.start();
                if (callback)
                  callback();
                hudUiAnimations();
                animateEntHeroVideos();
              }
            });
            if (!window.isTabletOrBelow) {
              gsapWithCSS.to(hhLetters2, {
                delay: 1,
                y: "0%",
                duration: 1,
                ease: "power4.inOut",
                stagger: { each: 0.03, from: "random" }
              });
            } else {
              gsapWithCSS.to(hhLetters2, {
                delay: 1,
                autoAlpha: 1,
                y: "0%",
                duration: 1,
                ease: "power4.inOut",
                stagger: { each: 0.03, from: "random" }
              });
            }
            gsapWithCSS.from('[hh-tb="1"]', {
              delay: 2,
              x: "10em",
              duration: hhDuration,
              ease: "power2.inOut"
            });
            gsapWithCSS.from('[hh-tb="2"]', {
              delay: 2.1,
              x: "-10em",
              duration: hhDuration,
              ease: "power2.inOut"
            });
          }
        }
      }
    );
    gsapWithCSS.ticker.add(function() {
      const percentage = Math.round(fillAnimation.progress() * 100);
      prePercent.textContent = `${percentage}`;
    });
    sessionStorage.setItem("preloaderHasRun", "true");
  }
  function destroyPreloaderAnimations() {
  }

  // src/transitions.js
  var initScrollAnimGroup;
  var tabletMediaQuery = window.matchMedia("(max-width: 991px)");
  window.isTabletOrBelow = tabletMediaQuery.matches;
  tabletMediaQuery.addEventListener("change", (event2) => {
    window.isTabletOrBelow = event2.matches;
  });
  function transInPersist(pageName) {
    window.SScroll.reconfig();
    const hidePreText = document.querySelectorAll("[pre-text]");
    hidePreText.forEach((el) => {
      el.style.display = "none";
    });
    resetCursorHoverState();
    setTimeout(() => {
      globalSplit();
      initAnimations();
      if (!window.isTabletOrBelow) {
        initScrollAnimGroup = initScrollAnimations();
      }
      resumeOrbRotation();
    }, 600);
    setTimeout(lenisResize, 1e3);
    if (pageName === "home") {
      const refreshedGridWrap = document.querySelector("[grid-anim]");
      homeHero("transition");
      gridAnim(refreshedGridWrap);
      initializeLogoReveal();
      initClientGrid();
      if (!window.isTabletOrBelow) {
        initVideos("home-vid");
        initializeMorph();
      }
      orbChange(
        "0vw",
        "0vh",
        1,
        1,
        "0vw",
        "0vh",
        1,
        1.5,
        "0vw",
        "0vh",
        1,
        2
      );
      if (!window.isTabletOrBelow) {
        document.querySelector("[data-orb-wrap]").style.position = "fixed";
      } else {
        document.querySelector("[data-orb-wrap]").style.position = "absolute";
        gsapWithCSS.to(document.querySelector("[data-orb]"), {
          transform: "translate(0vw, 16vh)",
          width: "150vw",
          height: "150vw",
          duration: 1,
          ease: "power2.inOut"
        });
      }
    } else if (pageName === "contact") {
      const w = window.Webflow;
      w.destroy();
      w.ready();
      w.require("forms").preview();
      if (window.turnstile) {
        document.querySelectorAll(".w-form form").forEach((form) => {
          const sitekey = form.getAttribute("data-turnstile-sitekey");
          if (!sitekey)
            return;
          form.querySelectorAll('[id^="cf-chl-widget"]').forEach((el) => el.remove());
          form.querySelectorAll(".cf-turnstile").forEach((el) => el.remove());
          const container = document.createElement("div");
          form.appendChild(container);
          window.turnstile.render(container, { sitekey });
        });
      }
      document.querySelectorAll("[contact-trigger]").forEach((trigger) => {
        trigger.addEventListener("click", (e) => {
          e.preventDefault();
          const form = trigger.closest("form");
          if (form)
            form.requestSubmit();
        });
      });
      contactHero("transition");
      initContact();
      orbChange(
        "25vw",
        "50vh",
        2,
        1,
        "-25vw",
        "-25vh",
        0.6,
        1.5,
        "0vw",
        "11vh",
        1,
        1.5
      );
      document.querySelector("[data-orb-wrap]").style.position = "absolute";
    } else if (pageName === "work") {
      workHero("transition");
      workScrollMorph();
      orbChange(
        "0vw",
        "25vh",
        1,
        1,
        "0vw",
        "-35vh",
        0.3,
        1.5,
        "0vw",
        "5vh",
        1,
        1.5
      );
      document.querySelector("[data-orb-wrap]").style.position = "absolute";
    } else if (pageName === "case") {
      caseHero("transition");
      initCase();
      initVideos("case-vid");
      orbChange(
        "0vw",
        "25vh",
        0,
        1,
        "0vw",
        "-35vh",
        0.3,
        1.5,
        "0vw",
        "5vh",
        1,
        1.5
      );
      document.querySelector("[data-orb-wrap]").style.position = "absolute";
    } else if (pageName === "privacy") {
      privacyHero("transition");
      orbChange(
        "0vw",
        "25vh",
        0,
        1,
        "0vw",
        "-35vh",
        0.3,
        1.5,
        "0vw",
        "5vh",
        1,
        1.5
      );
      document.querySelector("[data-orb-wrap]").style.position = "absolute";
    } else if (pageName === "services") {
      servicesHero("transition");
      initServices();
      initVideos("ser-vid");
      orbChange(
        "-25vw",
        "50vh",
        2,
        1,
        "0vw",
        "0vh",
        0.6,
        1.5,
        "0vw",
        "0vh",
        1,
        1.5
      );
      document.querySelector("[data-orb-wrap]").style.position = "absolute";
    } else if (pageName === "about") {
      const w = window.Webflow;
      w.destroy();
      w.ready();
      aboutHero("transition");
      initAbout();
      orbChange(
        "25vw",
        "0vh",
        1,
        1,
        "-25vw",
        "0vh",
        0.6,
        1.5,
        "0vw",
        "0vh",
        1,
        1.5
      );
      if (!window.isTabletOrBelow) {
        document.querySelector("[data-orb-wrap]").style.position = "fixed";
      } else {
        document.querySelector("[data-orb-wrap]").style.position = "absolute";
      }
    } else if (pageName === "careers") {
      careersHero("transition");
      initCareers();
      orbChange(
        "25vw",
        "0vh",
        2,
        1,
        "-25vw",
        "0vh",
        0.6,
        1.5,
        "0vw",
        "0vh",
        1,
        1.5
      );
      document.querySelector("[data-orb-wrap]").style.position = "absolute";
    } else if (pageName === "careers-article") {
      const w = window.Webflow;
      w.destroy();
      w.ready();
      w.require("forms").preview();
      if (window.turnstile) {
        console.log("turnstile");
        document.querySelectorAll(".w-form form").forEach((form) => {
          const sitekey = form.getAttribute("data-turnstile-sitekey");
          if (!sitekey)
            return;
          form.querySelectorAll('[id^="cf-chl-widget"]').forEach((el) => el.remove());
          form.querySelectorAll(".cf-turnstile").forEach((el) => el.remove());
          const container = document.createElement("div");
          form.appendChild(container);
          window.turnstile.render(container, { sitekey });
        });
      }
      document.querySelectorAll("[contact-trigger]").forEach((trigger) => {
        trigger.addEventListener("click", (e) => {
          e.preventDefault();
          const form = trigger.closest("form");
          if (form)
            form.requestSubmit();
        });
      });
      careersArticleHero("transition");
      initCareersArticle();
      orbChange(
        "25vw",
        "0vh",
        2,
        1,
        "-25vw",
        "0vh",
        0.6,
        1.5,
        "0vw",
        "0vh",
        1,
        1.5
      );
      document.querySelector("[data-orb-wrap]").style.position = "absolute";
    } else if (pageName === "enterprise") {
      const w = window.Webflow;
      w.destroy();
      w.ready();
      enterpriseHero("transition");
      initEnterprise();
      orbChange(
        "25vw",
        "50vh",
        2,
        1,
        "-25vw",
        "-25vh",
        0.6,
        1.5,
        "0vw",
        "11vh",
        1,
        1.5
      );
      document.querySelector("[data-orb-wrap]").style.position = "absolute";
    }
    window.OBFormMonitor.rebind();
  }
  function transOutPersist(pageName) {
    pauseOrbRotation();
    setTimeout(() => {
      resetCursorHoverState();
      destroyAnimations();
      destroyPreloaderAnimations();
      destroyVideos();
      if (initScrollAnimGroup && initScrollAnimGroup.destroy) {
        initScrollAnimGroup.destroy();
      }
      if (pageName === "home") {
        destroyHome();
      } else if (pageName === "contact") {
        destroyContact();
      } else if (pageName === "work") {
        destroyWork();
      } else if (pageName === "case") {
        destroyCase();
      } else if (pageName === "services") {
        destroyServices();
      } else if (pageName === "about") {
        destroyAbout();
      } else if (pageName === "careers-article") {
        destroyCareersArticle();
      }
    }, 500);
  }
  function onStart() {
    const initPage = document.querySelector("[data-page]").dataset.page;
    const initStart = document.querySelector('[data-start="hidden"]');
    const preloaderHasRun = sessionStorage.getItem("preloaderHasRun");
    globalSplit();
    initHudMenu();
    initAnimations();
    if (!window.isTabletOrBelow) {
      initScrollAnimGroup = initScrollAnimations();
    }
    initializeOrbRotation();
    if (initPage === "enterprise") {
      initEnterprise();
    }
    if (preloaderHasRun) {
      if (initPage === "home") {
        hudUiAnimations();
        homeHero();
        initClientGrid();
        if (!window.isTabletOrBelow) {
          initializeLogoReveal();
          gridAnim(gridWrap);
          initializeMorph();
        }
      } else if (initPage === "contact") {
        contactHero();
        hudUiAnimations();
        initContact();
      } else if (initPage === "work") {
        hudUiAnimations();
        workHero();
        if (!window.isTabletOrBelow) {
          workScrollMorph();
        }
      } else if (initPage === "case") {
        hudUiAnimations();
        initCase();
        caseHero();
      } else if (initPage === "services") {
        hudUiAnimations();
        initServices();
        servicesHero();
      } else if (initPage === "about") {
        aboutHero();
        hudUiAnimations();
        initAbout();
      } else if (initPage === "careers") {
        careersHero();
        hudUiAnimations();
        initCareers();
      } else if (initPage === "careers-article") {
        careersArticleHero();
        hudUiAnimations();
        initCareersArticle();
      } else if (initPage === "privacy") {
        privacyHero();
        hudUiAnimations();
      } else if (initPage === "enterprise") {
        enterpriseHero();
        hudUiAnimations();
      }
    }
    if (!preloaderHasRun) {
      runPreloaderAnimations(() => {
        if (initPage === "home") {
          gridAnim(gridWrap);
          initializeLogoReveal();
          if (!window.isTabletOrBelow) {
            initializeMorph();
          }
        } else if (initPage === "contact") {
          initContact();
        } else if (initPage === "work") {
          if (!window.isTabletOrBelow) {
            workScrollMorph();
          }
        } else if (initPage === "case") {
          initCase();
        } else if (initPage === "services") {
          initServices();
        } else if (initPage === "about") {
          initAbout();
        } else if (initPage === "careers") {
          initCareers();
        } else if (initPage === "careers-article") {
          initCareersArticle();
        } else if (initPage === "enterprise") {
        }
      });
    }
    gsapWithCSS.to(initStart, {
      autoAlpha: 1,
      duration: 0.3
    });
  }

  // src/form-monitor.js
  window.OBFormMonitor = function() {
    const ENABLED = false;
    const MONITOR_ENDPOINT = window.location.origin + "/api/monitor/report";
    let _initialised = false;
    function report(type, extras = {}) {
      const payload = {
        type,
        page: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        ...extras
      };
      try {
        const body = JSON.stringify(payload);
        const blob = new Blob([body], { type: "application/json" });
        const sent = navigator.sendBeacon(MONITOR_ENDPOINT, blob);
        if (!sent) {
          fetch(MONITOR_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            keepalive: true
          }).catch(() => {
          });
        }
      } catch (e) {
      }
    }
    function watchFormErrors() {
      document.querySelectorAll(".w-form").forEach((wrapper) => {
        if (wrapper.dataset.monitorBound)
          return;
        wrapper.dataset.monitorBound = "true";
        const failEl = wrapper.querySelector(".w-form-fail");
        if (!failEl)
          return;
        const observer = new MutationObserver(() => {
          if (!failEl.classList.contains("w-hidden")) {
            const form = wrapper.querySelector("form");
            report("webflow_form_error", {
              form: form?.getAttribute("data-name") || "Unknown"
            });
          }
        });
        observer.observe(failEl, {
          attributes: true,
          attributeFilter: ["class", "style"]
        });
      });
    }
    function watchNetworkFailures() {
      if (window.__obFetchPatched)
        return;
      window.__obFetchPatched = true;
      const originalFetch = window.fetch;
      window.fetch = async function(...args) {
        const url = typeof args[0] === "string" ? args[0] : args[0]?.url || "";
        const method = (args[1]?.method || "GET").toUpperCase();
        const isWebflowForm = method === "POST" && (url.includes("webflow.com/api/v1/form") || url.includes("webflow.com/api/v2/form"));
        if (!isWebflowForm) {
          return originalFetch.apply(this, args);
        }
        try {
          const response = await originalFetch.apply(this, args);
          if (!response.ok) {
            const activeForm = document.querySelector("form:focus-within") || document.querySelector(".w-form form");
            report("network_failure", {
              form: activeForm?.getAttribute("data-name") || "Unknown",
              status: response.status,
              error: `HTTP ${response.status} ${response.statusText}`
            });
          }
          return response;
        } catch (error) {
          report("network_failure", {
            form: "Unknown",
            status: 0,
            error: error.message || "Network error"
          });
          throw error;
        }
      };
    }
    function watchSubmissionTimeouts() {
      document.querySelectorAll(".w-form form").forEach((form) => {
        if (form.dataset.timeoutBound)
          return;
        form.dataset.timeoutBound = "true";
        form.addEventListener("submit", () => {
          const wrapper = form.closest(".w-form");
          if (!wrapper)
            return;
          const successEl = wrapper.querySelector(".w-form-done");
          const failEl = wrapper.querySelector(".w-form-fail");
          const timeout = setTimeout(() => {
            const succeeded = successEl && !successEl.classList.contains("w-hidden");
            const failed = failEl && !failEl.classList.contains("w-hidden");
            if (!succeeded && !failed) {
              report("submit_timeout", {
                form: form.getAttribute("data-name") || "Unknown",
                error: "No success or error state after 15s"
              });
            }
          }, 15e3);
          const clearOnResult = new MutationObserver(() => {
            const succeeded = successEl && !successEl.classList.contains("w-hidden");
            const failed = failEl && !failEl.classList.contains("w-hidden");
            if (succeeded || failed) {
              clearTimeout(timeout);
              clearOnResult.disconnect();
            }
          });
          if (wrapper) {
            clearOnResult.observe(wrapper, {
              attributes: true,
              attributeFilter: ["class", "style"],
              subtree: true
            });
          }
        });
      });
    }
    function runHealthChecks() {
      if (!window.Webflow?.require) {
        report("webflow_forms_missing", {
          error: "Webflow.require not available"
        });
        return;
      }
      try {
        const formsModule = window.Webflow.require("forms");
        if (!formsModule) {
          report("webflow_forms_missing", {
            error: "Webflow forms module returned falsy"
          });
        }
      } catch (e) {
        report("webflow_forms_missing", {
          error: e.message
        });
      }
      setTimeout(() => {
        document.querySelectorAll(".w-form form").forEach((form) => {
          const sitekey = form.getAttribute("data-turnstile-sitekey");
          if (sitekey) {
            const hasTurnstile = form.querySelector(
              '.cf-turnstile, [id^="cf-chl-widget"]'
            );
            if (!hasTurnstile) {
              report("turnstile_missing", {
                form: form.getAttribute("data-name") || "Unknown",
                error: "Form has turnstile sitekey but no widget rendered"
              });
            }
          }
        });
      }, 5e3);
    }
    function init6() {
      if (!ENABLED || _initialised)
        return;
      _initialised = true;
      watchNetworkFailures();
      rebind();
    }
    function rebind() {
      if (!ENABLED)
        return;
      watchFormErrors();
      watchSubmissionTimeouts();
      runHealthChecks();
    }
    return { init: init6, rebind };
  }();

  // src/colorMode.js
  function setMode(mode) {
    document.documentElement.className = mode;
    document.querySelector("[mode-toggle]").setAttribute("mode-toggle", mode);
    document.querySelector("[mode-toggle]").setAttribute("aria-pressed", mode === "dark");
  }
  document.querySelector("[mode-toggle]").addEventListener("click", function() {
    var currentMode = localStorage.getItem("mode") || "light";
    var newMode = currentMode === "light" ? "dark" : "light";
    localStorage.setItem("mode", newMode);
    setMode(newMode);
  });
  var initialMode = localStorage.getItem("mode") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  setMode(initialMode);

  // index.js
  var pageWipe = document.querySelector("[page-wipe-block]");
  var pageWipeObject = document.querySelector("[page-wipe-object]");
  gsapWithCSS.set(pageWipe, {
    y: "101%",
    scale: 0.9
  });
  gsapWithCSS.set(pageWipeObject, {
    y: "-101%",
    scale: 1.11111111111
  });
  initCursor();
  initOrbLoad();
  var MyTransition = class extends Transition {
    onLeave({ from, trigger, done }) {
      transOutPersist(from.dataset.page);
      gsapWithCSS.to(pageWipe, {
        y: "0%",
        scale: 1,
        duration: 0.5,
        ease: "power1.in",
        onComplete: function() {
          lenisToTop(0);
        }
      });
      gsapWithCSS.to(pageWipeObject, {
        y: "0%",
        scale: 1,
        duration: 0.5,
        ease: "power1.in"
      });
      pageWipePaths();
      setTimeout(() => {
        done();
      }, 500);
    }
    onEnter({ to, trigger, done }) {
      transInPersist(to.dataset.page);
      gsapWithCSS.to(pageWipe, {
        y: "-101%",
        scale: 0.9,
        duration: 0.5,
        ease: "power1.in",
        onComplete: function() {
          gsapWithCSS.set(pageWipe, {
            y: "101%"
          });
        }
      });
      gsapWithCSS.to(pageWipeObject, {
        y: "101%",
        duration: 0.5,
        scale: 1.11111111111,
        ease: "power1.in",
        onComplete: function() {
          gsapWithCSS.set(pageWipeObject, {
            y: "-101%"
          });
        }
      });
      done();
    }
  };
  var CustomRenderer = class extends Renderer {
    initialLoad() {
      onStart();
    }
    onLeave() {
    }
    onLeaveCompleted() {
    }
    onEnter() {
    }
    onEnterCompleted() {
    }
  };
  var taxi = new Core({
    renderers: {
      default: CustomRenderer
    },
    transitions: {
      default: MyTransition
    }
  });
  console.log("local shout out to all the console sniffers from ob.");
})();
/*!
 * CSSPlugin 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
/*!
 * CustomEase 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
/*!
 * DrawSVGPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
/*!
 * Flip 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
/*!
 * GSAP 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
/*!
 * MorphSVGPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
/*!
 * Observer 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
/*!
 * ScrollTrigger 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
/*!
 * matrix 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
/*!
 * paths 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
