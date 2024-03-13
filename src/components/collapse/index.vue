
<template>
    <ul class="mg-collapse-wrapper">
        <slot></slot>
    </ul>
</template>

<script lang="ts" setup>
import { Ref,ref,provide } from 'vue';
import type { NameType, IModelEmits, ICollapseProps, IUnionType } from './tyings';
import { collapseKey } from './tyings';

defineOptions({
    name: "MGCollapse"
});

const props = defineProps<ICollapseProps>();
const activeNames = ref<IUnionType>(props.modelValue || []);
const emits = defineEmits<IModelEmits>();

if (props.accordion &&  props.modelValue instanceof Array) {
    console.warn("modelValue can't be a array in the accordion mode.");
}
// activeNames.value = props.accordion ? props.modelValue : [ props.modelValue ];


const handleClick = function handleClick(name:NameType) {
    if (props.accordion || (!props.accordion && !(activeNames.value instanceof Array))) {
        activeNames.value = activeNames.value === name ? "" : name;
    } else {
        const index = activeNames.value.indexOf(name);
        index !== -1 ? activeNames.value.splice(index, 1): activeNames.value.push(name);
    }
    emits('update:modelValue', activeNames.value);
    emits('changeEv', activeNames.value);
};

provide(collapseKey,
    {
        activeNames,
        handleClick
    }
);

</script>