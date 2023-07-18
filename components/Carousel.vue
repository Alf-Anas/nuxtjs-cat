<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
    imageList: Array<string>,
})

const show = ref<number>(0)

function handleNext() {
    const next = show.value + 1
    if (!props.imageList) return
    if (next >= props.imageList?.length) {
        show.value = 0
    } else {
        show.value = next
    }
}
function handlePrev() {
    const prev = show.value - 1
    if (!props.imageList) return
    if (prev < 0) {
        show.value = props.imageList.length - 1
    } else {
        show.value = prev
    }
}
function handleSet(idx: number) {
    show.value = idx
}


</script>

<template>
    <div id="carousel" class="relative w-full" data-carousel="slide">
        <!-- Carousel wrapper -->
        <div class="relative h-56 overflow-hidden rounded-lg md:h-96 bg-white bg-opacity-20">
            <div v-for="(item, idx) in props.imageList" class="duration-700 ease-in-out transition-2" data-carousel-item>
                <img :src="item" v-if="show === idx"
                    class="absolute block -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" :alt="item">
            </div>
        </div>

        <!-- Slider indicators -->
        <div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
            <button v-for="(item, idx) in props.imageList" type="button" class="w-5 h-5 rounded-full"
                :class="idx === show ? 'bg-blue-900 bg-opacity-50' : 'bg-blue-200 bg-opacity-20'" aria-current="true"
                :aria-label="item" @click="() => handleSet(idx)"></button>
        </div>

        <!-- Slider controls -->
        <button @click="handlePrev" type="button"
            class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev>
            <span
                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <ChevronLeftIcon />
                <span class="sr-only">Previous</span>
            </span>
        </button>
        <button @click="handleNext" type="button"
            class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next>
            <span
                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <ChevronRightIcon />
                <span class="sr-only">Next</span>
            </span>
        </button>
    </div>
</template>