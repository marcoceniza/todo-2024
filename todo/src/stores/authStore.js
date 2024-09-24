import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter();
    const user = ref({});
    const errors = ref({});
    const isLoading = ref(false);
    const token = ref(localStorage.getItem('token') || null);
  
    const authenticate = async (apiRoute, formData) => {
        try {
            isLoading.value = true;
            const res = await axios.post(`/api/${apiRoute}`, formData);

            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                token.value = res.data.token;
                router.push('/');
            }else {
                router.push('/login');
            }
            
            isLoading.value = false;
        } catch (e) {
            isLoading.value = false;
            errors.value = e.response.data.errors;
        }
    };

    const logout = async () => {
        try {
            await axios.post('/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            });
            localStorage.removeItem('token');

            router.push('/login');
            isLoading.value = false;
        } catch (e) {
            isLoading.value = false;
            console.error('Logout failed:', e.response.data);
        }
    };

    return { authenticate, errors, user, isLoading, logout, token };
});