<template>
    <section>
        <MGButton @click="handleClick">message</MGButton>
        <MGButton @click="handleClickNew">message-new</MGButton>
    </section>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'MgMessageViews'
});

import MGButton from "../../components/Button.vue";
import { Message } from '../../components/message/message.ts';
import { message } from '../../components/meesage-new/message';

let id:number = 0;

function handleClick() {
    id++;
    Message({
        message: `this is a messagie   ${id}`,
        duration: 0,
        showClose: true,
        type: "warning"
    });
}

function handleClickNew() {

    message({
        message: `this is the new message ${id++}`,
        showClose:true,
        type: "info",
        duration: 0
    });
}


// message({
//     message: "this is the new message2, forever",
//     duration: 0,
//     type: 'error'
// });
// message({
//     message: "this is the new message3",
//     showClose:true,
//     type: "success"
// });
// message({
//     message: "this is the new message4",
//     type: "warning"
// });


</script>