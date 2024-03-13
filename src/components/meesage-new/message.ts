import type { IMessageType, IInstanceType } from './typings';
import type { ComponentInternalInstance } from 'vue';
import { createVNode, render, shallowReactive } from 'vue';
import messageConstructor from './index.vue';

const instances: IInstanceType[]= shallowReactive([]);
let id:number = 0;


function closeMessage(id:number) {
    const idx = instances.findIndex(instance => instance.id === id);
    if (idx === -1) return;

    const { handler } = instances[idx];
    handler.close();
    instances.splice(idx, 1);
}

function createMessage(options:IMessageType):ComponentInternalInstance {
    const container:HTMLDivElement = document.createElement('div');
    id ++;
    const props = {
        ...options,
        id,
        onClose(id:number) {
            options.userClose?.();
            closeMessage(id);
        },
        onDestroy() {
            render(null, container);
        },
    };
    const vnode = createVNode(messageConstructor, props);
    render(vnode, container);
    // 若使用 v-if, children 不会被渲染到 DOM 树中
    document.body.appendChild((container.firstElementChild) as HTMLElement);
    return vnode.component!;
}

export function message(props:IMessageType) {
    const vm = createMessage(props);

    const instance:IInstanceType = {
        id,
        vm,
        handler: {
            close: () => {
                vm.exposed!.show.value = false;
            }
        },
    };

    instances.push(instance);
    return instance;
}

// 实例相关函数

export function getCurrentIndex(id:number) {
    const idx = instances.findIndex(instance => instance.id === id);
    return idx;
}

export function getVerticalOffset(id:number) {
    const idx = getCurrentIndex(id);
    return idx > 0 ? 20 : 0;
}

export function getPrevMessage(id:number) {
    const idx = getCurrentIndex(id);
    return idx > 0 ? instances[idx - 1] : instances[0];
}

export function getPrevBottomline(id:number) {
    const instance = getPrevMessage(id);
    const index = getCurrentIndex(id);
    return  index > 0 ? instance.vm.exposed!.bottomLine.value: 0;
}