import MGMessage from "./index.vue";
import { h, render,reactive, ref } from "vue";
import type { VNode } from "vue";
import type { IMessageForCallProps, IMessageBox } from "./typings";
const messageInstance:IMessageBox[] = reactive([]);
let id = 1;

export function Message(props:IMessageForCallProps) {
    const container = document.createElement('div') as HTMLElement;
    const vnode:VNode = h(MGMessage);
    const show = ref<boolean>(true);
    id ++;

    vnode.props = {
        ...props,
        container,
        id,
        show
    };

    messageInstance.push({
        id,
        height: 0,
        top: 0,
        bottomLine: 0,
        vnode
    });
    render(vnode, container);
    document.body.appendChild(container.firstElementChild);
}


export default messageInstance;
