<template>
    <div>
        <MGAlert type="success" center @clickEv="handleClick">
            success
        </MGAlert>

        <MGAlert type="info">
            info
        </MGAlert>

        <MGAlert type="error">
            error
        </MGAlert>

        <MGAlert type="warning">
            warning
        </MGAlert>

        <MGAlert type="warning" effect="light">
            warning
        </MGAlert>
        <MGAlert type="error" effect="light">
            error
        </MGAlert>

        <MGAlert type="success" effect="light" center>
            success
        </MGAlert>
        <MGAlert type="info" effect="light">
            info
        </MGAlert>

    </div>
</template>

<script setup lang="ts">
import MGAlert from "@/components/alert/index.vue";
defineOptions({
    name: "MGAlertViews"
});

function handleClick() {
    window.alert('确定要关闭嘛');
}


</script>

<style scope>
div+div{
    margin-top: 30px
}

</style>