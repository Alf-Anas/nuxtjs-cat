<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
    image: Array<string>,
    title: {
        type: String,
        required: true
    },
    age: Number,
    breed: String,
    color: String,
})

const open = ref<boolean>(false)

function handleOpen() {
    open.value = true
}
function handleClose() {
    open.value = false
}

</script>


<template>
    <Button @click.native="handleOpen" type="light">Detail</Button>

    <!-- Main modal -->
    <div v-if="open"
        class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full bg-gray-900 bg-opacity-40">
        <div class="top-[5%] m-auto relative w-full max-w-2xl max-h-full text-start">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        {{ props.title }}
                    </h3>
                    <button type="button" @click="handleClose"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="defaultModal">
                        <XMarkIcon />
                        <span class="sr-only">Close</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div>
                    <Carousel :image-list="props.image" />

                    <div class="p-6 space-y-6">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ props.title }}
                        </h5>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>