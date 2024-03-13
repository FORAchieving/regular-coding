
import { onMounted, onBeforeUnmount, watch, isRef } from "vue";
import type { Ref } from "vue";

interface IOptions {
    handler: (e:Event) => void;
    eventOptions?: boolean | AddEventListenerOptions | undefined
}
export function useEventListner(
    target: Ref<HTMLElement | undefined> | EventTarget,
    event: string,
    options: IOptions)
{
    if (isRef(target)) {
        watch(target, (newDom, oldDom) => {
            oldDom?.removeEventListener(event, options.handler);
            newDom?.addEventListener(event, options.handler, options.eventOptions);
        });
    } else {
        onMounted(() => {
            target.addEventListener(event, options.handler, options.eventOptions);
        });
    }

    onBeforeUnmount(() => {
        (target as EventTarget).addEventListener(event, options.handler, options.eventOptions);
    });
}