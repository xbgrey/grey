import { Message, Event } from 'grey-message';
import Heartbeat, { HeartbeatEvent } from 'grey-heartbeat';

/** 完成一次记数 */
export class TimerEvent extends Event {

    public static TYPE: string = Message.createType('HeartbeatEvent');

    constructor() {
        super(TimerEvent.TYPE);
    }
}

/** 计时器 */
export default class Timer extends Message {

    /** 每一次的间隔时间 */
    public interval: number;

    /** 需要执行的次数（0为无限次） */
    public count: number;

    /** 当前已经执行的时间 */
    public currentInterval: number = 0;

    /** 当前已经执行的次数 */
    public currentCount: number = 0;

    /** 计时器 */
    constructor(interval: number, count: number = 1) {
        super();
        this.interval = interval;
        this.count = count;
    }

    /** 开始记时 */
    public start = (): void => {
        Heartbeat.instance.on(HeartbeatEvent.TYPE, this.onHeartbeatHandler);
    }

    /** 停止记时 */
    public stop = (): void => {
        Heartbeat.instance.off(HeartbeatEvent.TYPE, this.onHeartbeatHandler);
    }

    /** 复位停止下来 */
    public reset = (): void => {
        this.stop();
        this.currentCount = 0;
        this.currentInterval = 0;
    }

    /** 复位并马上开始记时 */
    public resetAndStart = (): void => {
        this.reset();
        this.start();
    }

    /** 心跳事件 */
    private onHeartbeatHandler = (e: HeartbeatEvent) => {
        this.currentInterval += e.interval;
        for (; this.currentInterval >= this.interval;) {
            
            this.currentInterval -= this.interval;
            this.currentCount ++;
            this.send(new TimerEvent());

            /** 次数是否完成 */
            if (this.count !== 0 && this.currentCount >= this.count) {
                this.stop();
                break;
            }
        }
    }
}

