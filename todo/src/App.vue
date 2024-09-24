<template>
  <header class="bg-[#348dff] min-h-[45px] leading-[45px]">
    <nav class="container mx-auto flex justify-between">
      <div>
        <RouterLink :to="{ name: 'home' }" class="text-[#fff] hover:underline">Home</RouterLink>
      </div>
      <div v-if="isAuthenticated">
        <a @click="logout" class="text-[#fff] cursor-pointer hover:underline">Logout</a>
      </div>
      <div v-else class="flex space-x-5">
        <RouterLink :to="{ name: 'login' }" class="text-[#fff] hover:underline">Login</RouterLink>
        <RouterLink :to="{ name: 'register' }" class="text-[#fff] hover:underline">Register</RouterLink>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';

const { token } = storeToRefs(useAuthStore());
const { logout } = useAuthStore();

const isAuthenticated = computed(() => token.value != null);
</script>
