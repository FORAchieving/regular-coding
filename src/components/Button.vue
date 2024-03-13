<script setup lang="ts">
import type { IProps, IEmits } from '@/typing/Button.ts';
import { ref } from 'vue';
import MGIcon from "./icon/index.vue";
defineOptions({
    name: "MGButton"
});

withDefaults(defineProps<IProps>(), {
    type: "button",
    disabled: false
});

const emits = defineEmits<IEmits>();
const handleClick = () => {
    emits('btnClick');
};

const dom = ref(null);
defineExpose({
    ref: dom
});

</script>

<template>
    <button
    ref="dom"
    class="mg-button"
    :class = "{
        [`mg-button-${shape}`]:shape,
        [`mg-button-${color}`]: color,
        [`mg-button-${size}`]:size,
    }"
    :disabled="disabled || loading"
    :type="type"
    @click="handleClick"
    >
    <MGIcon :icon="icon" v-if="icon"></MGIcon>
    <MGIcon icon="spinner" v-if="loading" spin></MGIcon>
    <slot>
        <span>button</span>
    </slot>
    </button>
</template>

<style scoped>
</style>
