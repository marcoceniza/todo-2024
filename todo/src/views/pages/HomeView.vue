<template>
    <main class="container mx-auto">
        <div class="w-[500px] mx-auto">
            <div class="text-center flex justify-between items-center mt-5">
                <h2 class="text-3xl font-bold text-[#1f5599]">Todo</h2>
                <ul class="flex gap-2">
                    <li class="text-[#555] text-[14px] cursor-pointer">All</li>
                    <li class="text-[#555] text-[14px] cursor-pointer">Important</li>
                    <li class="text-[#555] text-[14px] cursor-pointer">Done</li>
                </ul>
            </div>
            <div class="flex flex-col">
                <form @submit.prevent="store(formData)">
                    <input type="text" v-model="formData.title" placeholder="Enter New Todo" class="w-full border rounded-[30px] p-3 my-2">
                </form>
                <p v-if="isLoading" class="text-center mt-3 text-gray-500">Loading...</p>
                <TodoList v-else :todos="todos" @is-done="done" />
            </div>
        </div>
    </main>
</template>

<script setup>
import { reactive } from 'vue';
import TodoList from '../../components/TodoList.vue';
import { useTodoStore } from '../../stores/todoStore';
import { storeToRefs } from 'pinia';

const { todos, isLoading } = storeToRefs(useTodoStore());
const { store } = useTodoStore();

const formData = reactive({
    title: ''
});

</script>