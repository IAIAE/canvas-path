function propExtend(dist, source){
    for(var key in source){
        if(source.hasOwnProperty(key)){
            dist[key] = source[key];
        }
    }
}

function oflize(kls){
  kls.of = function(p){
    return new kls(p)
  }
}
function method(Constructor, name, fn){
    function foo(){}
    foo.prototype.method = function(_name, _fn){
        Constructor.prototype[_name] = _fn;
        return this;
    }
    var f = new foo();
    return f.method(name, fn);
}

function sMethod(source, dist){
    for(let key in dist){
        if(dist.hasOwnProperty(key)){
            source[key] = dist[key];
        }
    }
}

/**
 * easing demo see here: http://easings.net/zh-cn
 */
var Easing = {
    Linear: function(t, b, c, d) { return c*t/d + b; },
    easeInQuad: function(t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function(t, b, c, d) {
        return -c *(t /= d)*(t-2) + b;
    },
    easeInOutQuad: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t-2) - 1) + b;
    },
    easeInCubic: function(t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function(t, b, c, d) {
        return c * ((t = t/d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t*t + b;
        return c / 2*((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function(t, b, c, d) {
        return c * (t /= d) * t * t*t + b;
    },
    easeOutQuart: function(t, b, c, d) {
        return -c * ((t = t/d - 1) * t * t*t - 1) + b;
    },
    easeInOutQuart: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t*t - 2) + b;
    },
    easeInQuint: function(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(t, b, c, d) {
        return c * ((t = t/d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2*((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function(t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOutSine: function(t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOutSine: function(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
    },
    easeInExpo: function(t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOutExpo: function(t, b, c, d) {
        return (t==d) ? b + c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOutExpo: function(t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function(t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(t, b, c, d) {
        return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
    },
    easeInOutCirc: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInBounce: function(t, b, c, d) {
        return c - this.easeOutBounce(d-t, 0, c, d) + b;
    },
    easeOutBounce: function(t, b, c, d) {
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
    easeInOutBounce: function(t, b, c, d) {
        if (t < d / 2) {
            return this.easeInBounce(t * 2, 0, c, d) * .5 + b;
        } else {
            return this.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    }
}

;[Path, PlainLinePath, LinePath].forEach(oflize);



/**
 * Path Class
 * @param {Object} config 
 */
function Path(config){
    this._isRoot = true;
    propExtend(this, config);
    this.paths = this.genePaths();
    if(this.paths){
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
  updatePaths: function(){
      //  = this.getDistance();
      this.length = this.paths.length;
      var tmp  = this.getMileStone();
      this.mileStone = tmp.mileStone;
      this.distance = tmp.distance
  },
  tick: function(now){
    if(!this.isStart){
      return this.start(now);
    }
    if(this._isEnd){
       return this.getEndPoint(true);
    }
    var diff = now - this._startTime;
    if(diff > this.duration){
      return this.end();
    }
    var diffDistance = this.easing?
      this.easingDistance(diff) 
      : this.distance * diff/this.duration;
    var point = this.getPoint(diffDistance);
    this.triggerSync('tick', point, now);
    return point;
  },
  easingDistance: function(diff){
    var easing = this.easing;
    if(typeof easing === 'string'){
      if(Easing[easing]){
        return Easing[easing](diff, 0, this.distance, this.duration);
      }else{
        return Easing['Linear'](diff, 0, this.distance, this.duration);
      }
    }else if(typeof easing === 'function'){
      return easing(diff, 0, this.distance, this.duration);
    }else{
      console.warn('you specified the easing, but not valid easing function there!!');
      return Easing['Linear'](diff, 0, this.distance, this.duration);
    }
  },
  start: function(now){
    this.isStart = true;
    this._startTime = now
    return this.getStartPoint();
  },
  end: function(){
      this._isEnd = true;
      return this.getEndPoint();
  },
  isEnd: function() {
    if(!this.isStart) return false;
    if(this._isEnd) return true;
    var diff = (new Date) - this.startTime;
    if(diff >= this.duration){
      this._isEnd = true;
      return true;
    }
    return false;
  },
  getStartPoint: function(){
    var p = this.paths[0].start;
    this.trigger('start', p);
    return p
  },
  getEndPoint: function(notTrigger){
    var p = this.paths[this.length-1].end;
    !notTrigger && this.trigger('end', p);
    return p
  },
  renderLine: function(pen){
    this.paths.map(function(path){
      path.renderLine(pen);
    })
  },
  trigger: function(name){
    var self = this;
    var argv = Array.prototype.slice.call(arguments, 1);
    Promise.resolve('').then(function(){
        self._cbs[name].forEach(function(handler){
          handler.apply(self, argv);
        });
    })
  },
  triggerSync: function(name){
    var argv = Array.prototype.slice.call(arguments, 1);
    this._cbs[name].forEach(function(handler){
      handler.apply(self, argv);
    });
  },
  on: function(name, cb){
    this._cbs[name].push(cb);
  }
}







/**
 * 原子直线路径
 * @param {arr} start 
 * @param {arr} end 
 */
function PlainLinePath(start, end){
  this._isRoot = false
  this.start = start;
  this.end = end
  this.xdiff = end[0] - start[0];
  this.ydiff = end[1] - start[1];
  this.distance = this.getDistance()
}

method(PlainLinePath, 'getPoint', function(dis){
  var per = (dis/this.distance)
  var x = this.start[0] + per* this.xdiff
  var y = this.start[1] + per * this.ydiff
  return [x, y];
})
.method('renderLine', function(pen){
  pen.beginPath();
  pen.moveTo(this.start[0], this.start[1]);
  pen.lineTo(this.end[0], this.end[1]);
  pen.stroke()
  pen.closePath();
})
.method('getDistance', function(){
  var sx = this.start[0]
  var sy = this.start[1]
  var ex = this.end[0]
  var ey = this.end[1]
  return Math.sqrt(Math.pow((sx-ex),2) + Math.pow((ey-sy),2))
})


/**
 * 直线路径
 * @param {Object} config 
 */
function LinePath(config){
    Path.call(this, config);
    this.type = 'line'
}
propExtend(LinePath.prototype, Path.prototype);
method(LinePath, 'genePaths', function(){
  var points = this.points;
  if(points.length < 2){
    return null
  }
  var arr = []
  for(var i=0, len = points.length;i<len-1;i++){
    arr.push(new PlainLinePath(points[i], points[i+1]))
  }
  return arr;
})
.method('getDistance', function(){
  // depreciate
    if(!this.paths) return null;
    return this.paths.reduce(function(seed, path){
      return seed + path.getDistance();
    },0 )
})
.method('getPoint', function(diffDistance){
    // this.lastStone = 0;
    if(this.mileStone[this.lastStone] < diffDistance){
      this.updateStone(diffDistance, this.lastStone);
    }else{
      if(this.lastStone !== 0){
        if(this.mileStone[this.lastStone - 1] > diffDistance){
          this.updateStone(diffDistance);
        }
      }
    }
    var floor = this.lastStone == 0?0:this.mileStone[this.lastStone - 1];
    return this.paths[this.lastStone].getPoint(diffDistance - floor);
})
.method('updateStone', function(diffDistance, beginIndex){
    var ms = this.mileStone;
    if(beginIndex == null){
      if(ms[0] >= diffDistance){
        this.lastStone = 0;
        return;
      }
      beginIndex = 0;
    }
    for(var i = beginIndex, len = ms.length-1; i<len; i++){
      if(diffDistance > ms[i] && diffDistance <= ms[i+1]){
        this.lastStone = i + 1;
        break;
      }
    }
    
    if(i == len){
      console.warn('diffDistance is out milestone, this is unexcept!!!!')
    }
})
.method('getMileStone', function(){
  var arr = this.paths.map(function(path){
    return path.distance;
  })
  var sum = 0;
  for(var i=0;i<arr.length;i++){
    arr[i] = sum + arr[i]
    sum = arr[i]
  }
  return {
    mileStone: arr,
    distance: sum
  }
})


module.exports = {
  LinePath: LinePath
}

