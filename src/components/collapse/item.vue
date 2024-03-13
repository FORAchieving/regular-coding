<template>
    <li class="mg-collapse-item" :name="name">
        <h3 @click="handleClick" class="mg-collapse-item__header" :class="{'mg-collapse-item__active':isActive}">
            <slot name="title"></slot>
            <MGIcon icon="chevron-right" :class="{'click-happen': isActive}"/>
        </h3>
        <Transition name="fade" v-on="transitionEvents">
            <article v-show="isActive" class="mg-collapse-item__content" >
                <div class="mg-collapse-item-transition__wrapper">
                    <slot></slot>
                </div>
            </article>
        </Transition>

    </li>
</template>

<script setup lang="ts">
import type { ICollapseItem } from './tyings';
import { inject, ref, watch } from 'vue';
import { collapseKey, NameType } from './tyings';
import MGIcon from "../icon/index.vue";

const props = defineProps<ICollapseItem>();
const collapseContext = inject(collapseKey);
const isActive = ref<boolean>();


defineOptions({
    name: "MGCollapseItem",
});

// computed 监听变化
// const isActive= computed(() => collapseContext?.activeNames.value.includes(props.name));

watch(() => collapseContext?.activeNames,(newNames) => {
    const isArray = newNames?.value instanceof Array;
    if (isArray) {
        isActive.value = (newNames.value as NameType[]).includes(props.name) ;
    } else {
        isActive.value = newNames?.value === props.name;
    }
}, { deep: true,immediate: true });

const handleClick = function () {
    collapseContext?.handleClick(props.name);
};


const transitionEvents:Record<string, (el:HTMLElement) => void> = {
    beforeEnter(el) {
        el.style.cssText = "height: 0px;";
    },
    enter(el) {
        el.style.cssText = `height: ${el.scrollHeight}px;`;
    },
    afterEnter(el) {
        el.style.cssText="";
    },
    beforeLeave(el) {
        el.style.cssText = `height: ${el.scrollHeight}px;`;
    },
    leave(el) {
        el.style.cssText = "height: 0px;";
    },
    afterLeave(el) {
        el.style.height = "";
    }
};

</script>


<style scoped>
</style>

