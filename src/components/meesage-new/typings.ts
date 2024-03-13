import type { ComponentInternalInstance, VNode } from "vue";

export interface IMessageType {
    id?:number,
    message: string | VNode,
    type?: 'success' | 'warning' | 'info' | 'error',
    icon?: string,
    showClose?: boolean,
    duration?: number,
    userClose?: () => any
}

export interface IVNodeType  extends IMessageType{
    onClose: () => void;
    onDestroy: () => void;
    id:number
}


export type IHandler = {
    close: () => void
}


export interface IInstanceType {
    id: number,
    vm: ComponentInternalInstance,
    handler: IHandler,
}

export interface IEmitsType{
    (e:'close', id:number):any,
    (e:'destroy'):any
}



