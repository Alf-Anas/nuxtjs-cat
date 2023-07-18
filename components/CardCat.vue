<script setup lang="ts">
import { PropType } from 'nuxt/dist/app/compat/capi';

const props = defineProps({
    type: String as PropType<"info" | "success" | "danger" | 'warning'>,
    image: Array<string>,
    title: {
        type: String,
        required: true
    },
    age: Number,
    breed: String,
    color: String,
})

function getFirstImage() {
    if (props.image && props.image?.length > 0) {
        return props.image[0]
    }
    return ""
}


</script>

<template>
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img class="rounded-t-lg aspect-[4/3] object-cover max-h-[350px]" :src="getFirstImage()" :alt="props.title" />
        <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ props.title }}</h5>
            <ul class="max-w-md space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
                <li>
                    {{ props.breed }}
                </li>
                <li>
                    {{ props.age }} years old
                </li>
                <li>
                    Color : {{ props.color }}
                </li>
            </ul>
            <div class="text-end w-100">
                <ModalCat :title="props.title" :age="props.age" :breed="props.breed" :color="props.color"
                    :image="props.image" />
            </div>
        </div>
    </div>
</template>