export default class Event {

    public readonly type: string;

    /** 消息发起对象 */
    public target: any;

    /**
     * 构造函数
     */
    constructor(type: string) {
        this.type = type;
    }
}