<template>
    <MgCollapse v-model="modelValue" @change-ev="handleChange">
        <template v-for="(item, index) in itemList" :key="index">
            <MgItem :name="item.name">
                <template #title>{{ item.title }}</template>
                <article>
                    {{ item.content }}
                </article>
            </MgItem>
        </template>
    </MgCollapse>
</template>

<script lang="ts" setup>
import MgCollapse from "@/components/collapse/index.vue";
import MgItem from "@/components/collapse/item.vue";
import type { IItems, IUnionType } from './typing.ts';
import { ref } from 'vue';

const modelValue = ref<IUnionType>([ 1 ]);

const itemList:IItems = [ {
    name: 1,
    title: "Line 1",
    content: "this is the line 1 content"
}, {
    name: 2,
    title: "Line 2",
    content: "this is the line 2 content"
}, {
    name: 3,
    title: "Line 3",
    content: "this is the line 3 content"
} ];

defineOptions({
    name: "MgCollapseViews"
});

function handleChange(activeNames:IUnionType) {
    console.log('activeNames: ', activeNames);

}

</script>