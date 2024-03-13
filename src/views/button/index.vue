<template>
    <div class="button-club">
        <article class="button-wrapper">
            <MGButton></MGButton>
            <MGButton color="success" icon="user-secret"></MGButton>
            <MGButton color="info" :loading="loading"></MGButton>
            <MGButton color="warning"></MGButton>
            <MGButton color="danger"></MGButton>
            <MGButton color="primary" disabled></MGButton>
        </article>
        <article class="button-wrapper">
            <MGButton shape="plain"></MGButton>
            <MGButton color="success" shape="plain"></MGButton>
            <MGButton color="info" shape="plain"></MGButton>
            <MGButton color="warning" shape="plain"></MGButton>
            <MGButton color="danger" shape="plain"></MGButton>
            <MGButton color="primary" shape="plain" ></MGButton>
            <MGButton color="primary" shape="plain" disabled></MGButton>
        </article>
        <article  class="button-wrapper">
            <MGButton shape="round"></MGButton>
            <MGButton color="success" shape="round"></MGButton>
            <MGButton color="info" shape="round"></MGButton>
            <MGButton color="warning" shape="round"></MGButton>
            <MGButton color="danger" shape="round"></MGButton>
            <MGButton color="primary" shape="round" disabled></MGButton>
        </article>
        <article class="button-wrapper">
            <MGButton shape="circle">cir</MGButton>
            <MGButton color="success" shape="circle">cir</MGButton>
            <MGButton color="info" shape="circle">cir</MGButton>
            <MGButton color="warning" shape="circle">cir</MGButton>
            <MGButton color="danger" shape="circle">cir</MGButton>
            <MGButton color="primary" shape="circle" disabled>cir</MGButton>
        </article>
    </div>
</template>

<script setup lang="ts" >
import MGButton from "@/components/Button.vue";
import { ref } from "vue";

defineOptions({
    name: "MGButtonViews"
});

const loading = ref<boolean>(true);

setTimeout(() => {
    loading.value = false;
}, 1000);

</script>


<style scoped>
.button-club{
    width: 650px;
    margin: auto;

    .button-wrapper{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }
    .button-wrapper+.button-wrapper{
        margin-top:30px
    }
}

</style>