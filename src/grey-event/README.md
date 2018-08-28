# 兼容原生事件

解决原生对象的事件兼容

```javascript
/** 添加事件 */
addEventListener(监听对象, 事件, 方法);

/** 删除事件 */
removeEventListener(监听对象, 事件, 方法);

/** 兼容event */
getEvent(event);

/** 获取事件目标 */
getElement(event)

/** 阻止事件冒泡 */
preventDefault(event)

/** 阻止事件的默认行为 */
stopPropagation(event)
```