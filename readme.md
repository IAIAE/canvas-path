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

# chage note

- v1.0.1 LinePath is available


