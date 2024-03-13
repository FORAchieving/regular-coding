
import { onMounted, onBeforeUnmount, watch, isRef } from "vue";
import type { Ref } from "vue";
export function useEventListner(
    target: Ref<HTMLElement | undefined> | EventTarget,
    event: string,
    handler: (e:Event) => void)
{
    if (isRef(target)) {
        watch(target, (newDom, oldDom) => {
            oldDom?.removeEventListener(event, handler);
            newDom?.addEventListener(event, handler);
        });
    } else {
        onMounted(() => {
            target.addEventListener(event, handler);
        });
    }

    onBeforeUnmount(() => {
        (target as EventTarget).addEventListener(event, handler);
    });
}