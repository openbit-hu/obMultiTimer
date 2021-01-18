class Timer{
    id:string
    dt:number
    t0:number
    timerCallback:()=>void
    constructor(id:string,dt:number,body:()=>void){
        this.id=id
        this.dt=dt
        this.timerCallback=body
    }
    start(millis:number){
        this.t0=millis
    }
    check(t:number){
        if(t-this.t0>this.dt){
            this.timerCallback()
            this.t0=t
        }
    }
}
  
//% color=#008060 weight=100 icon="\uf017" block="obTimer"
namespace obMultiTimer {
    let timers:Timer[]
    let minDt:number=1000
    let res:number=200
    let t0:number
    //% blockId="obTimer_start"
    //% block="start all Timer events || with $resolution ms accuracy"
    export function start(resolution?:number){
        if(resolution)res=resolution
        t0=control.millis()
        for(let timer of timers){
            timer.start(t0)
        }
        control.inBackground(function () {
            while(true){
                basic.pause(res)
                let t1=control.millis()
                for(let timer of timers){
                    timer.check(t1)
                }
            }
        })
    }
    /**
     * Attaches code to run when the timer triggers an event.
     * @param id name of the timer
     * @param dt time difference between calls
     * @param body TODO
     */
    //% blockId="obTimer_onTimerEvent"
    //% block="onTimerEvent $id $dt"
    export function onTimerEvent(id:string, dt:number, body: () => void): void {
        if(dt<100)dt=100
        if(dt<minDt){
            minDt=dt
            res=minDt/2
        }
        if(timers==null)timers=[]
        timers.push(new Timer(id,dt,body))
    }
}
