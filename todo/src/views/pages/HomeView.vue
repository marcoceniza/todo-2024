<template>
    <main class="container mx-auto">
        <div class="w-[500px] mx-auto">
            <div class="text-center flex justify-between items-center mt-5">

                <div v-if="spinner" class="spinner-wrap"><p class="spinner"></p></div>

                <p v-if="msg.success" class="success_msg">{{ msg.success }}</p>
                <p v-else-if="msg.error" class="error_msg">{{ msg.error }}</p>

                <h2 @click="filter = 'default'; currentPage = 1" class="cursor-pointer text-3xl font-bold text-[#1f5599]">Todo</h2>
                <ul class="flex gap-2">
                    <li @click="filter = 'default'; currentPage = 1" class="text-[#555] text-[14px] cursor-pointer hover:underline">All</li>
                    <li @click="filter = 'important'; currentPage = 1" class="text-[#555] text-[14px] cursor-pointer hover:underline">Important</li>
                    <li @click="filter = 'done'; currentPage = 1" class="text-[#555] text-[14px] cursor-pointer hover:underline">Done</li>
                </ul>
            </div>
            <div class="flex flex-col">
                <form @submit.prevent="store(formData)">
                    <input type="text" v-model="formData.title" placeholder="Enter New Todo" class="w-full border rounded-[30px] p-3 my-2">
                </form>
                <p v-if="isLoading && !isStore" class="text-center mt-3 text-gray-500">Loading...</p>
                <p v-else-if="filteredTodos.length === 0 && !isStore" class="text-center mt-3 text-gray-500">No data</p>
                <TodoList v-else :todos="filteredTodos" :class="{ 'opacity-[0.5]': isStore }" />

                <div class="relative flex justify-between mt-3">
                    <section>
                        <span>Page {{ currentPage }} of {{ totalPages }}</span>
                    </section>
                    <section>
                        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="w-[35px] bg-[#b5b5b5] text-center text-gray-500 h-[30px] leading-[30px] rounded-[2px] relative mx-[2px] hover:opacity-[0.7]"><ChevronDoubleLeftIcon class="size-5 block mx-auto" /></button>
                        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="w-[35px] bg-[#b5b5b5] text-center text-gray-500 h-[30px] leading-[30px] rounded-[2px] relative mx-[2px] hover:opacity-[0.7]"><ChevronDoubleRightIcon class="size-5 block mx-auto" /></button>
                    </section>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import TodoList from '@/components/TodoList.vue';
import { onMounted, reactive } from 'vue';
import { useTodoStore } from '@/stores/todoStore';
import { storeToRefs } from 'pinia';
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/vue/24/solid';
import { useAuthStore } from '@/stores/authStore';

const { filteredTodos, isLoading, filter, isStore, currentPage, totalPages } = storeToRefs(useTodoStore());
const { msg, spinner } = storeToRefs(useAuthStore());
const { fetchTodos, store, changePage } = useTodoStore()

const formData = reactive({
    title: ''
});

onMounted(() => {
    fetchTodos();
});
</script>