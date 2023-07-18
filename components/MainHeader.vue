<script setup lang="ts">
import { MagnifyingGlassIcon, ArrowPathIcon } from '@heroicons/vue/24/solid'
import { useCatStore } from '~/stores/cat';


const cat = useCatStore();
const search = useState<string>('search', () => "")

function onSearch() {
    cat.query = search.value
    cat.searchCat(search.value)
}

onMounted(() => {
    onSearch()
})

</script>

<template>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" class="flex items-center">
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CATS</span>
            </a>
            <div class="flex md:order-2 gap-2">
                <div class="relative">
                    <div v-if="!cat.isLoading" class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MagnifyingGlassIcon class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span class="sr-only">Search icon</span>
                    </div>
                    <div v-if="cat.isLoading" class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <ArrowPathIcon class="w-4 h-4 text-gray-500 dark:text-gray-400 animate-spin fill-blue-600" />
                        <span class="sr-only">Loading...</span>
                    </div>
                    <input type="text" id="search-navbar"
                        class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search..." v-model="search" v-on:keyup.enter="onSearch">
                </div>
                <ModalAddCat />
            </div>

        </div>
    </nav>
</template>