function propExtend(dist, source) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            dist[key] = source[key];
        }
    }
}
function oflize(kls) {
    kls.of = function (p) {
        return new kls(p)
    }
}
function method(Constructor, name, fn) {
    function foo() { }
    foo.prototype.method = function (_name, _fn) {
        Constructor.prototype[_name] = _fn;
        return this;
    }
    var f = new foo();
    return f.method(name, fn);
}

var _Math = Math;

/**
 * easing demo see here: http://easings.net/zh-cn
 */
var Easing = {
    Linear: function (t, b, c, d) { return c * t / d + b; },
    easeInQuad: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function (t, b, c, d) {
        return -c * _Math.cos(t / d * (_Math.PI / 2)) + c + b;
    },
    easeOutSine: function (t, b, c, d) {
        return c * _Math.sin(t / d * (_Math.PI / 2)) + b;
    },
    easeInOutSine: function (t, b, c, d) {
        return -c / 2 * (_Math.cos(_Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function (t, b, c, d) {
        return (t == 0) ? b : c * _Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function (t, b, c, d) {
        return (t == d) ? b + c : c * (-_Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function (t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * _Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-_Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (t, b, c, d) {
        return -c * (_Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function (t, b, c, d) {
        return c * _Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (_Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (_Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInBounce: function (t, b, c, d) {
        return c - this.easeOutBounce(d - t, 0, c, d) + b;
    },
    easeOutBounce: function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function (t, b, c, d) {
        if (t < d / 2) {
            return this.easeInBounce(t * 2, 0, c, d) * .5 + b;
        } else {
            return this.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    }
}

    ;[Path, PlainLinePath, LinePath, QuadraticPath].forEach(oflize);



/**
 * Path Class
 * @param {Object} config 
 */
function Path(config) {
    this._isRoot = true;
    propExtend(this, config);
    this.paths = this.genePaths();
    if (this.paths) {
        this.updatePaths();
    }
    this.lastStone = 0;
    this.prevDistance = 0;
    this.isStart = false;
    this._isEnd = false;
    this._cbs = {
        start: [],
        end: [],
        tick: []
    };
}
Path.prototype = {
    updatePaths: function () {
        //  = this.getDistance();
        this.length = this.paths.length;
        var tmp = this.getMileStone();
        this.mileStone = tmp.mileStone;
        this.distance = tmp.distance
    },
    tick: function (now) {
        if (!this.isStart) {
            return this.start(now);
        }
        if (this._isEnd) {
            return this.getEndPoint(true);
        }
        var diff = now - this._startTime;
        if (diff > this.duration) {
            return this.end();
        }
        var diffDistance = this.easing ?
            this.easingDistance(diff)
            : this.distance * diff / this.duration;
        var point = this.getPoint(diffDistance);
        this.triggerSync('tick', point, now);
        return point;
    },
    easingDistance: function (diff) {
        var easing = this.easing;
        if (typeof easing === 'string') {
            if (Easing[easing]) {
                return Easing[easing](diff, 0, this.distance, this.duration);
            } else {
                return Easing['Linear'](diff, 0, this.distance, this.duration);
            }
        } else if (typeof easing === 'function') {
            return easing(diff, 0, this.distance, this.duration);
        } else {
            console.warn('you specified the easing, but not valid easing function there!! use linear instead.');
            return Easing['Linear'](diff, 0, this.distance, this.duration);
        }
    },
    start: function (now) {
        this.isStart = true;
        this._startTime = now
        return this.getStartPoint();
    },
    end: function () {
        this._isEnd = true;
        return this.getEndPoint();
    },
    isEnd: function () {
        if (!this.isStart) return false;
        if (this._isEnd) return true;
        var diff = (new Date) - this.startTime;
        if (diff >= this.duration) {
            this._isEnd = true;
            return true;
        }
        return false;
    },
    getStartPoint: function () {
        var p = this.paths[0].start;
        this.trigger('start', p);
        return p
    },
    getEndPoint: function (notTrigger) {
        var p = this.paths[this.length - 1].end;
        !notTrigger && this.trigger('end', p);
        return p
    },
    renderLine: function (pen) {
        this.paths.map(function (path) {
            path.renderLine(pen);
        })
    },
    trigger: function (name) {
        var self = this;
        var argv = Array.prototype.slice.call(arguments, 1);
        Promise.resolve('').then(function () {
            self._cbs[name].forEach(function (handler) {
                handler.apply(self, argv);
            });
        })
    },
    triggerSync: function (name) {
        var argv = Array.prototype.slice.call(arguments, 1);
        this._cbs[name].forEach(function (handler) {
            handler.apply(self, argv);
        });
    },
    on: function (name, cb) {
        this._cbs[name].push(cb);
    }
}







/**
 * 原子直线路径
 * @param {arr} start 
 * @param {arr} end 
 */
function PlainLinePath(start, end) {
    this._isRoot = false
    this.start = start;
    this.end = end
    this.xdiff = end[0] - start[0];
    this.ydiff = end[1] - start[1];
    this.distance = this.getDistance()
}

method(PlainLinePath, 'getPoint', function (dis) {
    var per = (dis / this.distance)
    var x = this.start[0] + per * this.xdiff
    var y = this.start[1] + per * this.ydiff
    return [x, y];
})
    .method('renderLine', function (pen) {
        pen.beginPath();
        pen.moveTo(this.start[0], this.start[1]);
        pen.lineTo(this.end[0], this.end[1]);
        pen.stroke()
        pen.closePath();
    })
    .method('getDistance', function () {
        var sx = this.start[0]
        var sy = this.start[1]
        var ex = this.end[0]
        var ey = this.end[1]
        return _Math.sqrt(_Math.pow((sx - ex), 2) + _Math.pow((ey - sy), 2))
    })


/**
 * 直线路径
 * @param {Object} config 
 */
function LinePath(config) {
    Path.call(this, config);
    this.type = 'line'
}
propExtend(LinePath.prototype, Path.prototype);
method(LinePath, 'genePaths', function () {
    var points = this.points;
    if (points.length < 2) {
        return null
    }
    var arr = []
    for (var i = 0, len = points.length; i < len - 1; i++) {
        arr.push(new PlainLinePath(points[i], points[i + 1]))
    }
    return arr;
})
    .method('getDistance', function () {
        // depreciate
        if (!this.paths) return null;
        return this.paths.reduce(function (seed, path) {
            return seed + path.getDistance();
        }, 0)
    })
    .method('getPoint', function (diffDistance) {
        // this.lastStone = 0;
        if (this.mileStone[this.lastStone] < diffDistance) {
            this.updateStone(diffDistance, this.lastStone);
        } else {
            if (this.lastStone !== 0) {
                if (this.mileStone[this.lastStone - 1] > diffDistance) {
                    this.updateStone(diffDistance);
                }
            }
        }
        var floor = this.lastStone == 0 ? 0 : this.mileStone[this.lastStone - 1];
        return this.paths[this.lastStone].getPoint(diffDistance - floor);
    })
    .method('updateStone', function (diffDistance, beginIndex) {
        var ms = this.mileStone;
        if (beginIndex == null) {
            if (ms[0] >= diffDistance) {
                this.lastStone = 0;
                return;
            }
            beginIndex = 0;
        }
        for (var i = beginIndex, len = ms.length - 1; i < len; i++) {
            if (diffDistance > ms[i] && diffDistance <= ms[i + 1]) {
                this.lastStone = i + 1;
                break;
            }
        }

        if (i == len) {
            console.warn('diffDistance is out milestone, this is unexcept!!!!')
        }
    })
    .method('getMileStone', function () {
        var arr = this.paths.map(function (path) {
            return path.distance;
        })
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            arr[i] = sum + arr[i]
            sum = arr[i]
        }
        return {
            mileStone: arr,
            distance: sum
        }
    })


function PlainQuadratic(start, controll, end) {
    this.start = start;
    this.end = end;
    this.controll = controll
    this.distance = this.getDistance();
}

method(PlainQuadratic, 'getPoint', function(dis){
    var t = (dis / this.distance);
    var s = this.start;
    var c = this.controll
    var e = this.end
    var x = _Math.pow((1 - t), 2)*s[0] + 2*t*(1-t)*c[0] + _Math.pow(t, 2)*e[0]
    var y = _Math.pow((1 - t), 2)*s[1] + 2*t*(1-t)*c[1] + _Math.pow(t, 2)*e[1]
    return [x, y]
})
.method('renderLine', function(pen){
    var s = this.start;
    var c = this.controll;
    var e = this.end;
    pen.beginPath();
    pen.moveTo(s[0], s[1]);
    pen.quadraticCurveTo(c[0],c[1], e[0], e[1])
    pen.stroke()
    pen.closePath()
})
.method('getDistance', function(){
  var s = this.start
  var c = this.controll
  var e = this.end;
  var ax = s[0] - 2 * c[0] + e[0];
  var ay = s[1] - 2 * c[1] + e[1];
  var bx = 2 * c[0] - 2 * s[0];
  var by = 2 * c[1] - 2 * s[1];
  var A = 4 * (ax * ax + ay * ay);
  var B = 4 * (ax * bx + ay * by);
  var C = bx * bx + by * by;
  var Sabc = 2 * _Math.sqrt(A+B+C);
  var A_2 = _Math.sqrt(A);
  var A_32 = 2 * A * A_2;
  var C_2 = 2 * _Math.sqrt(C);
  var BA = B / A_2;
  return (A_32 * Sabc + A_2 * B * (Sabc - C_2) + (4 * C * A - B * B) * _Math.log((2 * A_2 + BA + Sabc) / (BA + C_2))) / (4 * A_32);
})


function QuadraticPath(config){
  Path.call(this, config)
  this.type = 'quadratic'
}
propExtend(QuadraticPath.prototype, Path.prototype)
method(QuadraticPath, 'genePaths', function() {
  var points = this.points;
  if(points.length < 2){
    return null;
  }
  var arr = [];
  for (var i = 0, len = points.length; i < len; i++) {
        arr.push(new PlainQuadratic(points[i][0], points[i][1], points[i][2]))
    }
    return arr;
})
.method('getPoint', LinePath.prototype.getPoint)
.method('updateStone', LinePath.prototype.updateStone)
.method('getMileStone', LinePath.prototype.getMileStone)

module.exports = {
  LinePath: LinePath,
  QuadraticPath: QuadraticPath
}

