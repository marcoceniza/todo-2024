<template>
    <ul class=" mt-[15px]">
        <li class="mb-[10px] pb-[10px] border-b-[1px] border-gray-300 relative" v-for="todo in props.todos" :key="todo.id"><input @click="$emit('is-done')" type="checkbox" class="mr-[10px]">{{ todo.title }} <StarIcon @click="importantHandler" :class="setColor" class="size-5 absolute right-0 top-0 cursor-pointer" /></li>
    </ul>
</template>

<script setup>
import { StarIcon } from '@heroicons/vue/24/solid';
import { computed, ref } from 'vue';

const props = defineProps({
    todos: Object
});
const isImportant = ref(true)
const setColor = computed(() => {
    return isImportant.value ? 'text-gray-500' : 'text-yellow-500'
})

const importantHandler = () => {
    isImportant.value = !isImportant.value;
}

</script>