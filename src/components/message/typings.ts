
import type { VNode, Ref } from "vue";


// export interface IMessageType {
//     message: string | VNode,
//     type?: 'success' | 'warning' | 'info' | 'error',
//     icon?: string,
//     showClose?: boolean,
//     duration?: number,
// }

export interface IMessageType {
    message: string | VNode,
    type?: 'success' | 'warning' | 'info' | 'error',
    icon?: string,
    showClose?: boolean,
    duration?: number,
    container: HTMLElement,
    id: number,
    show: Ref<boolean>
}

export interface IMessageBox{
    height: number,
    top: number,
    id: number,
    bottomLine: number,
    vnode: VNode
}

export interface ICSSTop{
    top: string
}

export type IMessageForCallProps = Omit<IMessageType, 'container'|'messageInstance'|'vnode'|'id'|'show'>