<template>
    <Transition
    name="message"
    appear
    @after-leave="onTransitionLeave"
    >
        <section
            @mouseover="handleMouseOver(timer)"
            @mouseleave="handleMouseLeave"
            class="mg-message--wrapper"
            :class="{[`mg-message--${type}`]: type}"
            v-show="show"
            ref="msgWrapper"
            :style="cssStyle"
            >
            <MGIcon class="mg-message--icon" :icon="icon"></MGIcon>
            <article class="mg-message--content">{{ message }}</article>
            <MGIcon v-if="showClose" class="mg-message--close" icon="xmark" @click="handleClose"></MGIcon>
        </section>
    </Transition>
</template>

<script lang="ts" setup>
defineOptions({
    name: "MGMessage"
});

import type { IMessageType,ICSSTop } from './typings';
import MGIcon from '../icon/index.vue';
import { onMounted, ref, nextTick, watch, reactive } from 'vue';
import { setMessageTop, setMessageHeight, closeMessage, closeMsgImmediate,closeAllMessage } from "./hooks/useSetCss";
import messageInstance from "./message.ts";
import { useEventListner } from "./hooks/useEvent";


let timer:ReturnType<typeof setTimeout> = null;
let height = 0;
const msgWrapper = ref<HTMLElement>();
const cssStyle=reactive<ICSSTop>({ top: "0px" });

const props = withDefaults(defineProps<IMessageType>(), {
    duration: 3000,
    type: "info",
    icon: "circle-info",
    showClose: false
});


function handleMouseOver(timer:ReturnType<typeof setTimeout>) {
    clearTimeout(timer);
}

async function handleMouseLeave() {
    if (!props.showClose) return;
    timer = closeMessage(props);
}


async function handleClose() {
    closeMsgImmediate(props);
}

useEventListner(document.body, 'keyup', (e:Event) => {
    if ((e as KeyboardEvent).code === 'Escape') {
        closeAllMessage();
    }
});

watch(() => messageInstance.length, (newLen) => {
    if (newLen === 0) return;
    cssStyle.top = setMessageTop(props);
});

onMounted(async () => {
    await nextTick();
    height = Math.round(msgWrapper.value?.getBoundingClientRect().height as number);
    setMessageHeight(props, height);
    cssStyle.top = setMessageTop(props);

    timer = closeMessage(props);
});


</script>