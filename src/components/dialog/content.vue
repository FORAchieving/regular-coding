<template>
    <section class="mg-dialog" :class="{'mg-dialog-center': center}">
        <header class="mg-dialog-content--header">
            <slot name="header">
                {{ title }}
            </slot>
            <MGIcon
                icon="xmark"
                v-if="showClose"
                @click="$emit('close')"
            ></MGIcon>
        </header>
        <article class="mg-dialog-content--main">
            <slot></slot>
        </article>
        <footer class="mg-dialog-content--footer">
            <slot name="foot"></slot>
        </footer>
    </section>
</template>

<script lang="ts" setup>
defineOptions({
    name: "MGDialogContent"
});

import type { IDialogContentType } from "./typings";
import MGIcon from "../icon/index.vue";
withDefaults(defineProps<IDialogContentType>(), {
    title: ""
});

</script>