# usage

```javascript
var cp = require('canvas-path')
var LinePath = cp.LinePath;

var path = new LinePath({
    points: [
        [100,200],
        [200,123],
        [300,200]
    ],
    duration: 4000
})

function tick(t){
    var point = path.tick(t);
    // drawPoint(point[0], point[1])  // point[0]:x, point[1]:y
    if(!path.isEnd()) requestAnimationFrames(tick)
}
requestAnimationFrames(tick)
```

# api
```javascript
path.on('start', function(point){
    var _point = path.getCurrentPoint();   //point === point
    // do something
})
.on('end', function(point){
    // do some thing
})
.on('tick', function(point, timestamp){
    // depreciate cause it's takes time.
})
```

# demo

see the test.html in test folder.

![](https://github.com/IAIAE/canvas-path/blob/master/images/demo.gif)

# performance

`new LinePath()` don't hold any timer in it. so, if you donot use it, it will released by the GC, that's makes it easy-to-use, and plain to handle.

![](https://github.com/IAIAE/canvas-path/blob/master/images/perf.png)

# chage note

- v1.0.1 LinePath is available


