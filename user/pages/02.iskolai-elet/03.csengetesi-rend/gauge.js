var opts = {
        angle: 0, // The span of the gauge arc
        lineWidth: 0.2, // The line thickness
        radiusScale: 0.9, // Relative radius
        pointer: {
                  length: 0.54, // // Relative to gauge radius
                  strokeWidth: 0.053, // The thickness
                  color: '#000000' // Fill color
                },
        limitMax: false,     // If false, max value increases automatically if value > maxValue
        limitMin: false,     // If true, the min value of the gauge will be fixed
        colorStart: '#6FADCF',   // Colors
        colorStop: '#8FC0DA',    // just experiment with them
        strokeColor: '#E0E0E0',  // to see which ones work best for you
        generateGradient: true,
        highDpiSupport: true,     // High resolution support
        staticZones: [
                    {strokeStyle: "#FF0000", min: 0, max: 45},
                    {strokeStyle: "#00FF00", min: 45, max: 60},
                    {strokeStyle: "#FF0000", min: 60, max: 105},
                    {strokeStyle: "#00FF00", min: 105, max: 115},
                    {strokeStyle: "#FF0000", min: 115, max: 160},
                    {strokeStyle: "#00FF00", min: 160, max: 175},
                    {strokeStyle: "#FF0000", min: 175, max: 220},
                    {strokeStyle: "#00FF00", min: 220, max: 230},
                    {strokeStyle: "#FF0000", min: 230, max: 275},
                    {strokeStyle: "#00FF00", min: 275, max: 280},
                    {strokeStyle: "#FF0000", min: 280, max: 325},
                 ]
      };
var target = document.getElementById('foo'); // your canvas element
var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
gauge.maxValue = 325; // set max gauge value
gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
gauge.animationSpeed = 50; // set animation speed (32 is default value)
var ref = new Date('1970-01-01 08:00:00');
var cur = new Date();
if (cur.getHours() >= 8 && cur.getHours()<=14) {
var refmins = ref.getHours()*60 + ref.getMinutes();
var mins = cur.getHours()*60 + cur.getMinutes();
gauge.set(mins-refmins); // set actual value
}
else gauge.set(0);
document.getElementById("hour").innerHTML = cur.getHours() + ":" + cur.getMinutes();
