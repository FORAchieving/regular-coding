<template>
    <div>
        <Transition name="fade">
            <article class="mg-alert-wrapper" :class="{[`mg-alert--${type}`]: type, 'is-light': isLight}" v-if="isShow">
                <div :class="{'is-center': center}">
                    <MGIcon  :icon="typeMap[type]" class="mg-alert__icon"/>
                    <slot></slot>
                </div>
                <MGIcon icon="xmark" @click="handleClick" class="mg-alert__closebtn"></MGIcon>
            </article>
        </Transition>
    </div>

</template>

<script lang="ts" setup>
import type { IAlertAttr, TypeEmits, IType } from './typings.ts';
import MGIcon from "../icon/index.vue";
import { ref, computed } from "vue";

defineOptions({
    name: "MGAlert"
});

const props = defineProps<IAlertAttr>();
const isLight = computed(() => props.effect === 'light');

const typeMap:Record<IType, string> = {
    success: "circle-check",
    info: "circle-info",
    warning: "circle-exclamation",
    error: "circle-xmark",
};
const emits = defineEmits<TypeEmits>();
const isShow = ref<boolean>(true);

const handleClick = function handleClick() {
    emits("clickEv");
    isShow.value = false;
};

</script>