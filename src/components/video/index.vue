<template>
    <section class="mg-video">
        <article class="mg-video-save">
            <div class="mg-video-dropzone" @drop="handleDragEnd" @dragover="handleDragOver" v-if="showSaveBox">
                <div></div>
                <p>Drag your video here</p>
            </div>
            <video @error="handleError" @ended="handleEnd" :src="videoUrl" controls class="video" v-else>
                <track kind="captions" :src="vvtUrl" srclang="en" label="English" default/>
            </video>
        </article>
        <ol class="mg-video-file-list">
            <li v-for="file in videoFileList" :title="file.name" :key="file.name">
                <span class="mg-video-file--name" @click="()=> handleFileNameClick(file)">{{ file.name }}</span>
                <MGIcon icon="xmark" class="mg-video-file--icon" @click="() => handleDelFile(file)"></MGIcon>
            </li>
        </ol>
    </section>
</template>

<script lang="ts" setup>
import type { IFileObj } from './typing';
import { message } from '../meesage-new/message.ts';
import MGIcon from "../icon/index.vue";
import { ref, computed } from 'vue';
defineOptions({
    name: "MGCarousel"
});
const videoUrl = ref<string>('');
const showSaveBox = ref<boolean>(true);
const videoFileList = ref<IFileObj[]>([]);
const _videoFileList = ref<string[]>([]);
const vvtUrl = computed(() => {
    return videoUrl.value.split(".")[0] + ".vtt";
});


function handleDragOver(event: DragEvent) {
    event.dataTransfer!.dropEffect = "copy";
    event.preventDefault();
    event.stopPropagation();
}
function handleDragEnd(event:Vue.DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    event.dataTransfer!.dropEffect = "copy";
    const  dataTransferItemsList = event.dataTransfer?.items!;
    let  isDirectory = false;
    for (let index = 0; index < dataTransferItemsList.length; index++) {
        const item = dataTransferItemsList[index];
        if (item.webkitGetAsEntry()?.isDirectory) {
            isDirectory = true;
            break;
        }
    }

    if (isDirectory) {
        message({
            type: "error",
            message: "Directory is not supported"
        });
        return;
    }
    for(let i=0;i<event.dataTransfer?.files.length!; i++){
        const file = event.dataTransfer?.files[i]!;
        _videoFileList.value?.push(URL.createObjectURL(file));
        videoFileList.value?.push({
            url: URL.createObjectURL(file),
            name: file.name
        });
    }
    videoUrl.value = _videoFileList.value?.shift()!;

    showSaveBox.value = false;
}

function handleFileNameClick(file:IFileObj) {
    showSaveBox.value = false;
    console.log('file: ', file);
    videoUrl.value = file.url;
}

function handleDelFile(file:IFileObj) {
    const index = videoFileList.value?.findIndex(item => item.name === file.name)!;
    videoFileList.value?.splice(index, 1);
}

function handleEnd() {
    console.log("end");

}

function handleError () {
    message({
        type: "error",
        message: "Video load failed"
    });
}

</script>

<style>
.mg-video {
    width: 90%;
    height: 500px;
    display: flex;
    justify-content: center;
    margin: auto;
    .video{
        display: block;
        width: 100%;
        height: 100%;
    }
    .mg-video-dropzone{
        height: 100%;
        border: 1px dashed black;
        background-color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;
        div{
            width: 190px;
            height: 140px;
            border: 2px dashed #fff;
            position: relative;
        }
        div::before{
            position: absolute;
            content: "";
            width: 30px;
            border: 1px solid #fff;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        div::after{
            position: absolute;
            content: "";
            width: 25px;
            border: 1px solid #fff;
            top: 50%;
            left: 50%;

            transform: translate(-50%, -50%) rotate(-90deg);
        }
    }
    .mg-video-save{
        width: 50%;
        background-color: #000;
    }
    .mg-video-file-list{
        width: 300px;

        margin-left: 30px;
        background-color: #fff;
        box-shadow: 0.3em 0.3em 1em rgba(204, 204, 204, 0.6);
        padding: 10px 5px;
        list-style-type: decimal;
        list-style-position: inside;
        li{
            cursor: pointer;
            white-space: nowrap;
            display:flex;
            justify-content: center;
            align-items: center;

            .mg-video-file--name{
                width: fit-content;
                max-width: 200px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                display: inline-block;
            }
            .mg-video-file--icon{
                margin-left: 10px;
                color: var( --mg-text-color-primar);
                &:hover{
                    cursor: pointer;
                }
            }


            &:hover{
                color: var(--mg-color-black);
            }
            &:not(:first-child){
                margin-top: 10px;
            }
        }
    }
}
</style>