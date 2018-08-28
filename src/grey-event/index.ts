/** 添加事件 */
export function addEventListener(element: any, type: string, handler: (e: any) => void) {
    //ele 元素
    //type 事件类型
    //handler 处理事件的函数程序
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + type, handler);
    } else {
        element['on' + type] = handler;
    }
}

/** 删除事件 */
export function removeEventListener(element: any, type: string, handler: (e: any) => void) {
    if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
        element.detachEvent('on' + type, handler);
    } else {
        element['on' + type] = null;
    }
}

/** 兼容event */
export function getEvent(event: any) {
    return event ? event : window.event;
}

/** 获取事件目标 */
export function getElement(event: any) {
    return event.target || event.srcElement;
}

/** 阻止事件冒泡 */
export function preventDefault(event: any) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

/** 阻止事件的默认行为 */
export function stopPropagation(event: any) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancleBubble = true;
    }
}