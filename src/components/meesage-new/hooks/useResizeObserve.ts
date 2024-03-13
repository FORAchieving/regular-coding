import { onMounted } from "vue";
import type { Ref } from 'vue';

export function useResizeObseve(el: Ref<HTMLElement|undefined>, callback?:(height:number)=>void) {
    const observe = new ResizeObserver((entries) => {
        entries.forEach(entrie => {
            callback?.(entrie.target.clientHeight);
        });
    });

    onMounted(() => {
        observe.observe((el.value) as HTMLElement);
    });
    return observe;
}