<template>
    <div class="dialog-views">
        <MGButton @click="dialogShow = true">Dialog</MGButton>
        <MGDialog v-model="dialogShow" :show-close="true">
            <template #title>
                <span>show</span>
            </template>
            this is my dialog
            <template #foot>
                <MGButton shape="plain" @click="dialogShow = false"> Cancel </MGButton>
                <MGButton color="primary" @click="dialogShow = false"> OK </MGButton>
            </template>
        </MGDialog>
    </div>
</template>

<script lang="ts" setup>
defineOptions({
    name: "MGDialogViews"
});

import MGButton from "../../components/Button.vue";
import MGDialog from "../../components/dialog/index.vue";
import { ref } from "vue";

const dialogShow = ref(false);
</script>

<style>
.dialog-views{
    height: 1000px;
}
</style>

