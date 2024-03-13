<template>
    <i class="mg-icon" v-bind="$attrs" :class="{[`mg-icon--${type}`]: type}">
        <FontAwesomeIcon v-bind="iconProps"></FontAwesomeIcon>
    </i>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { useAttrs } from "vue";
import type  { IconType } from "./typings.ts";
import { omit } from 'lodash-es';
import { computed } from "vue";


// const attrs = useAttrs();
// console.log('attrs: ', attrs.type);
const props = defineProps<IconType>();

// 过滤出图标需要的属性,为了保持响应式，需要使用 computed 包裹
const iconProps = computed(() => omit(props, [ "type" ]));

defineOptions({
    name: "MGIcon",
    inheritAttrs: false,
});



</script>