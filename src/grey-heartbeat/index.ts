import { Message, Event } from 'grey-message';

/** 心跳消息 */
export class HeartbeatEvent extends Event{
    
    /** 消息类型 */
    public static readonly TYPE: string = Message.createType('HeartbeatEvent');

    private _interval: number = 0;

    /** 心跳间隔 */
    public get interval(): number {
        return this._interval;
    }

    /**
     * 心跳消息
     */
    constructor(interval: number) {
        super(HeartbeatEvent.TYPE);
        this._interval = interval;
    }
}

export default class Heartbeat extends Message {

    private static _instance: Heartbeat;

    /** 上一次心跳时间戳 */
    private oldT:number = new Date().getTime();

    /** 获取心跳实例 */
    public static get instance(): Heartbeat {
        if (Heartbeat._instance) {
            return Heartbeat._instance;
        } else {
            return new Heartbeat();
        }
    }

    constructor() {
        super();
        if (Heartbeat._instance) {
            throw '对象为单利';
        } else {
            Heartbeat._instance = this;
            this.initialization();
        }
    }

    /** 初始化 */
    private initialization(){
        setInterval(()=>{
            const newT: number = new Date().getTime();
            const interval: number = newT-this.oldT;
            this.oldT = newT;
            this.send(new HeartbeatEvent(interval));
        }, 30);
    }
}