<script setup lang="ts">
import { useCatStore } from '~/stores/cat';

const cat = useCatStore();

function onLoadMore() {
    const nextPage = cat.page + 1
    if (nextPage > cat.meta.total_pages) return

    cat.page = nextPage
    cat.loadMoreCat(nextPage)
}
</script>

<template>
    <MainHeader />

    <div class="p-8 md:pt-16 md:px-24 min-h-[calc(100vh-154px)]">
        <Alert v-if="cat.list.length === 0 && cat.message" type="danger">{{ cat.message }}</Alert>
        <div v-if="cat.list.length > 0" class="grid gap-4 grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center">
            <CardCat v-for="item in cat.list" :title="item.name" :age="item.age" :breed="item.breed" :color="item.color"
                :image="item.images.map((it) => it.path)" />
        </div>
        <Loading v-if="cat.isLoading" />
        <div class="w-100 text-center p-8">
            <Button type="light" @click.native="onLoadMore" v-if="cat.page < cat.meta.total_pages">Load More</Button>
        </div>
    </div>


    <MainFooter />
</template>