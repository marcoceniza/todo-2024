<template>
    <ul class="mt-[15px]" :class="filter === 'done' ? 'pl-[5px]' : ''">
        <li :class="{ 'line-through': todo.done === 1, 'text-red-500': todo.done === 1 }" class="mb-[10px] pb-[10px] border-b-[1px] border-gray-300 relative" v-for="todo in todos" :key="todo.id">
            <input v-if="filter !== 'done'" @click="status('done', todo.id)" type="checkbox" class="mr-[10px]">{{ todo.title }} 
            <StarIcon v-if="filter !== 'done'" @click="status('important', todo.id)" :class="todo.important === 1 ? 'text-yellow-500' : 'text-gray-500'" class="size-5 absolute right-0 top-0 cursor-pointer hover:opacity-[0.5]" />
            <ArrowPathIcon v-if="filter === 'done'" @click="retrieveTodo(todo.id)" class="size-5 text-[#2463b2] absolute right-7 top-0 cursor-pointer hover:opacity-[0.5]" />
            <TrashIcon v-if="filter === 'done'" @click="deleteTodo(todo.id)" class="size-5 absolute right-0 top-0 cursor-pointer hover:opacity-[0.5]" />
        </li>
    </ul>
</template>

<script setup>
import { useTodoStore } from '@/stores/todoStore';
import { StarIcon, TrashIcon, ArrowPathIcon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';

const { filter } = storeToRefs(useTodoStore());
const { status, deleteTodo, retrieveTodo } = useTodoStore();
const props = defineProps({
    todos: Object
});

</script>