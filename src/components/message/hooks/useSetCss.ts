import type { IMessageType, IMessageBox } from "../typings";
import messageInstance from "../message.ts";
import { render, nextTick } from 'vue';
import type{ Ref } from 'vue';


export function getMessageIndex(id:number) {
    const index = messageInstance.findIndex((message:IMessageBox) => message.id === id);
    return  index;
}


export function getPrevMessage(id:number) {
    const index = getMessageIndex(id);
    const prevMessage = index > 0 ? messageInstance[index - 1] : messageInstance[0];
    const prevIndex = index > 0 ? index - 1 : -1;

    return { prevMessage, prevIndex };
}

export function setMessageTop (props:IMessageType) {
    const { prevMessage, prevIndex } = getPrevMessage(props.id);
    const currentIndex = prevIndex + 1;
    const height = messageInstance[currentIndex].height;

    const top = currentIndex && (prevMessage.bottomLine + 20);
    messageInstance[currentIndex].top = top;
    messageInstance[currentIndex].bottomLine = top + height;

    return messageInstance[currentIndex].top + "px";
}

export function setMessageHeight(props:IMessageType, height: number) {
    const { prevIndex } = getPrevMessage(props.id);
    const currentIndex = prevIndex + 1;

    messageInstance[currentIndex].height = height;
}

export function removeMessage(id:number) {
    const currentIndex = getMessageIndex(id);
    messageInstance.splice(currentIndex, 1);
}

export function closeMsgImmediate(props:IMessageType) {
    removeMessage(props.id);
    props.show.value = false;
    render(null, props.container);
}

export function closeMessage(props:IMessageType) {
    if (props.duration === 0) return;
    const timer = setTimeout(() => {
        closeMsgImmediate(props);
    }, props.duration);

    return timer;
}

export function closeAllMessage() {
    messageInstance.forEach((message) => {
        closeMsgImmediate(message.vnode.props);
    });
}