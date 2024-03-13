<template>
    <Transition name="dialog">
        <section
            class="mg-dialog-overlay"
            v-show="modelValue"
        >
            <MGContent
                ref="dialogRef"
                arai-modal="true"
                role="dialog"
                v-bind="$attrs"
                :center="center"
                :showClose="showClose"
                :title="title"
                @close="handleClose"
            >
                <template #header>
                    <slot name="header" v-if="!$slots.title"></slot>
                    <slot name="title" v-else></slot>
                </template>
                <slot></slot>
                <template #foot v-if="$slots.foot">
                    <slot name="foot"></slot>
                </template>
        </MGContent>
        </section>
    </Transition>
</template>

<script lang="ts" setup>
defineOptions({
    name: "MGDialog",
    inheritAttrs: false
});

import MGContent from "./content.vue";
import type { IDialogType, IDialogEmits } from "./typings";
import { ref } from "vue";

defineProps<IDialogType>();
const dialogRef = ref();
const emits = defineEmits<IDialogEmits>();
const handleClose = function handleClose() {
    emits('update:modelValue', false);
};

</script>