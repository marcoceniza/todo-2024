<template>
    <main class="container mx-auto">
      <div class="w-[450px] max-w-full mx-auto bg-[#f2f2f2] mt-[50px] rounded-[4px] py-[12px] px-[20px]">
        <h2 class="text-center text-[25px] mb-[30px] mt-[10px]">Register Here</h2>

        <form @submit.prevent="authenticate('register', formData)">
            <section>
                <label for="name">Name:</label>
                <input class="form-control" v-model="formData.name" type="text" name="name" id="name" placeholder="Name">
                <p v-if="errors.name" class="mb-[12px] text-red-500">{{ errors.name[0] }}</p>
            </section>

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

            <section>
                <label for="password_confirmation">Password Confirmation:</label>
                <input class="form-control" v-model="formData.password_confirmation" type="password" name="password_confirmation" id="password_confirmation" placeholder="Password Confirmation">
            </section>

            <section class="mt-4 mb-7">
                <button :class="{ 'opacity-[0.5]' : isLoading }" class="w-full bg-[#085bc6] text-[#fff] min-h-[45px] leading-[45px] rounded-[3px] hover:bg-[#0f78ff]">{{ isLoading ? 'REGISTERING...' : 'REGISTER' }}</button>
            </section>
        </form>
      </div>
    </main>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, reactive } from 'vue';
import { useAuthStore } from '../../stores/authStore';

const { errors, isLoading } = storeToRefs(useAuthStore());
const { authenticate } = useAuthStore();

const formData = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});

onMounted(() => { errors.value = {} });

</script>