// tests go here; this will not be compiled when this package is used as an extension.
let p1=0
let p2=0
obMultiTimer.onTimerEvent("egyik", 200, function () {
    led.plotBrightness(0, 0, p1=~p1&0xff)
})
obMultiTimer.onTimerEvent("másik", 500, function () {
    led.plotBrightness(4, 4, p2=~p2&0xff)
})
obMultiTimer.start()