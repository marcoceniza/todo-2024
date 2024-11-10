<template>
  <main class="container mx-auto">
    <p v-if="msg.success" class="success_msg">{{ msg.success }}</p>
    <p v-else-if="msg.error" class="error_msg">{{ msg.error }}</p>
    
    <div class="w-[400px] max-w-full mx-auto bg-[#f2f2f2] rounded-[4px] py-[12px] px-[20px] absolute left-0 right-0 top-[50%] translate-y-[-50%]">
      <h2 class="text-center text-[25px] mb-[30px] mt-[10px]">Login Here</h2>

      <form @submit.prevent="authenticate('login', formData); errors = {}">
        <section>
            <label for="email">Email:</label>
            <input class="form-control" v-model="formData.email" type="text" name="email" id="email" placeholder="Email">
            <p v-if="errors.email" class="mb-[12px] text-red-500">{{ errors.email[0] }}</p>
        </section>

        <section>
            <label for="password">Password:</label>
            <input class="form-control" v-model="formData.password" type="password" name="password" id="password" placeholder="Password">
            <p v-if="errors.password" class="mb-[12px] text-red-500">{{ errors.password[0] }}</p>
        </section>

        <section class="mt-4 mb-7">
            <button :class="{ 'opacity-[0.5]' : isLoading }" class="w-full bg-[#085bc6] text-[#fff] min-h-[45px] leading-[45px] rounded-[3px] hover:bg-[#0f78ff]">{{ isLoading ? 'LOGGING IN...' : 'LOGIN' }}</button>
        </section>
      </form>
    </div>
  </main>
</template>

<script setup>
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { onMounted, reactive } from 'vue';
import { useAuthStore } from '../../stores/authStore';

const { errors, isLoading, msg } = storeToRefs(useAuthStore());
const { authenticate } = useAuthStore();

const formData = reactive({
  email: '',
  password: ''
})

onMounted(() =>{ errors.value = {} });

</script>