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

path.on('start', function(point){
    var _point = path.getCurrentPoint();   //point === point
    // do something
})
.on('end', function(point){
    // do some thing
})
.on('tick', function(point, timestamp){
    // depreciate
})


var canvas = document.getElementById('canvas')
var pen = canvas.getContext('2d')

function tick(now){
    var point = path.tick(now);
    // drawPoint(point[0], point[1])
    if(!path.isEnd()) requestAnimationFrames(tick)
}
requestAnimationFrames(tick)
```

# chage note

- v1.0.1 LinePath is available


