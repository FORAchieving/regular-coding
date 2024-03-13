<template>
    <transition name="message"
    @enter="(el) => {console.log('enter: '); console.log(el.classList)}"
    @after-enter="(el) => {console.log('after-enter: '); console.log(el.classList)}"
    @before-enter="(el) => {console.log('before-enter: '); console.log(el.classList)}"
    @after-leave="(el) => {console.log('after-leave: '); console.log(el.classList); $emit('destroy');}"
    @before-leave="(el) => {console.log('before-leave: '); handleMessageBeforeLeave(el);console.log(el.classList)}"
    @leave="(el) => {console.log('leave: '); console.log(el.classList)}"
    >
        <section
            class="mg-message--wrapper"
            :class="{[`mg-message--${type}`]: type}"
            v-show="show"
            :id="id"
            ref="messageRef"
            :style="cssStyle"
            @mouseenter="mouseEnter"
            @mouseleave="mouseLeave"
            >
            <MGIcon class="mg-message--icon" :icon="icon"></MGIcon>
            <article class="mg-message--content">{{ message }}</article>
            <MGIcon v-if="showClose" class="mg-message--close" icon="xmark" @click="closeMessage"></MGIcon>
        </section>
    </transition>
</template>

<script lang="ts" setup>
import type { IMessageType, IEmitsType } from "./typings";

import { ref, computed, onMounted, onUnmounted, nextTick, onUpdated } from "vue";
import MGIcon from '../icon/index.vue';
import { useResizeObseve } from './hooks/useResizeObserve';
import { getVerticalOffset, getPrevBottomline, getCurrentIndex } from './message';
import { closeMsgfor, cancelCloseMsg } from './methods';
import { useEventListner } from './hooks/useEvent';
import { useZindex } from "./hooks/useZindex";

defineOptions({
    name: "MGMessage"
});
const emits = defineEmits<IEmitsType>();

const props = withDefaults(defineProps<IMessageType>(), {
    type: "info",
    icon: "circle-info",
    showClose: false,
    duration: 3000
});

const show = ref<boolean>(false);

const height = ref<number>(0);
const messageRef = ref<HTMLElement|undefined>();
let timer:ReturnType<typeof setTimeout>;
const index = computed(() => {
    return getCurrentIndex((props.id) as number);
});

const offset = computed(() => {
    return getVerticalOffset((props.id) as number);
});
const bottomLine = computed(() => {
    return getPrevBottomline((props.id) as number) + height.value + offset.value;
});

const top = computed(() => {
    if(index.value === 0) return 0;
    return getPrevBottomline((props.id) as number) + offset.value;
});
const cssStyle = computed(() => {
    return {
        top: top.value + "px",
        zIndex: useZindex()
    };
});


function closeMessage() {
    show.value = false;
}
function mouseEnter() {
    cancelCloseMsg(timer);
}
function mouseLeave() {
    timer = closeMsgfor(props.duration, closeMessage);
}

function handleMessageBeforeLeave(el:HTMLElement) {
    observe.unobserve(el);
    emits('close', (props.id) as number);
}

const observe = useResizeObseve(messageRef, (msgHeight) => {
    height.value = msgHeight;
});

useEventListner(document.body, 'keyup', {
    handler: closeMessage
});

onMounted(() => {
    show.value = true;
    timer = closeMsgfor(props.duration, closeMessage);
});


defineExpose({
    show,
    height,
    bottomLine
});


</script>