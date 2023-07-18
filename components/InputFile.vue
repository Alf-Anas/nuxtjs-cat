<script setup lang="ts">

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    info: String,
    accept: String
})
const emit = defineEmits(['onFile'])

function onFileChange(e: Event) {
    if (!e.target) return
    // @ts-ignore
    const files = e.target.files
    if (!files.length) {
        emit("onFile", null)
    } else {
        emit("onFile", files[0])
    }
}

</script>

<template>
    <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">{{ props.title
        }}</label>
        <input
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help" id="file_input" type="file" :accept="props.accept"
            v-on:change="onFileChange">
        <p v-if="props.info" class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">{{ props.info }}</p>
    </div>
</template>