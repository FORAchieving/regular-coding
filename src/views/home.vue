<template>
    <section class="mg-components-home">
        <ul>
            <li class="mg-components-home__list">
                <router-link v-for="(route, index) in _routesList" :to="route.path" :key="index">
                    {{ route.name }}
                </router-link>
            </li>
        </ul>
    </section>
</template>

<script setup lang="ts">
import RoutesList from "../routers/index";

const _routesList = RoutesList.filter(route => route.meta?.show);

defineOptions({
    name: "MGHomeViews"
});

// import MGIcon from "@/components/icon/index.vue"
// import { ref } from "vue";
// type IconSize =  '2xs' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x'
// type IconType = "primary" | "success" | "error"|"danger" | "info"
// const iconSize = ref<IconSize>('2xs');
// const iconType = ref<IconType>("primary");
// setTimeout(() => {
//     iconType.value = "success";
//     iconSize.value = "2xl";
// }, 1000);

</script>


<style scoped>
.mg-components-home{
    .mg-components-home__list{
        display: flex;
        flex-direction: column;
        a{
            font-size: 18px;
        }
        a+a{
            margin-top: 25px;
        }
    }
}

</style>