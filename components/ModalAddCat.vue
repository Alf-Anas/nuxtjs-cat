<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { useCatStore } from '~/stores/cat';

const open = ref<boolean>(false)
const error = ref<string>("")
function handleOpen() {
    open.value = true
}
function handleClose() {
    open.value = false
}

const cat = useCatStore();

const name = ref<string>('')
const age = ref<string>('')
const color = ref<string>('')
const breed = ref<string>('')
const file1 = ref<File | null>(null)
const file2 = ref<File | null>(null)

function handleFile1(f: File | null) {
    file1.value = f
}
function handleFile2(f: File | null) {
    file2.value = f
}

function onSave() {
    if (!name.value || Number(age.value) < 0 || !color.value || !breed.value || !file1.value || !file2.value) {
        error.value = "Please fill all the data!!"
        return
    }
    error.value = ""
    cat.addCat(name.value, Number(age.value), color.value, breed.value, file1.value, file2.value)
        .then(() => {
            handleClose()
        })
        .catch(() => {
            error.value = "Failed to add new cat!"
        })
}

</script>


<template>
    <Button @click.native="handleOpen" type="light" size="xs">
        + Add Cat
    </Button>

    <!-- Main modal -->
    <div v-if="open"
        class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full bg-gray-900 bg-opacity-40">
        <div class="top-[5%] m-auto relative w-full max-w-2xl max-h-full text-start">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        + Add Cat
                    </h3>
                    <button type="button" @click="handleClose"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="defaultModal">
                        <XMarkIcon />
                        <span class="sr-only">Close</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                    <form>
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <InputText title="Name" v-model:value="name" />
                            <InputText title="Age" type="number" v-model:value="age" />
                            <InputText title="Breed" v-model:value="color" />
                            <InputText title="Color" v-model:value="breed" />
                            <InputFile title="Picture 1" accept="image/*" @on-file="handleFile1" />
                            <InputFile title="Picture 2" accept="image/*" @on-file="handleFile2" />
                        </div>
                    </form>
                    <Alert v-if="error" type="danger">{{ error }}</Alert>
                </div>

                <div
                    class="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <Button type="light" @click.native="onSave">Save</Button>
                </div>
            </div>
        </div>
    </div>
</template>