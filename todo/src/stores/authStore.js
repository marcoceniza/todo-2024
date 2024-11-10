import { defineStore } from 'pinia';
import axios from 'axios';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter();
    const user = ref({});
    const msg = reactive({ success:'', error:'' });
    const errors = ref({});
    const isLoading = ref(false);
    const token = ref(localStorage.getItem('token') || null);
    const isAuthenticated = ref(false);
    const spinner = ref(false);

    const authenticate = async (apiRoute, formData) => {
        try {
            isLoading.value = true;
            const res = await axios.post(`/api-v1/api/${apiRoute}`, formData);

            if(res.data.success && apiRoute === 'login') isAuthenticated.value = true;

            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                token.value = res.data.token;
                msg.success = res.data.message;
                router.push('/');
            }else {
                router.push('/login');
                msg.error = res.data.message;
            }

            isLoading.value = false;
        } catch (e) {
            isLoading.value = false;
            errors.value = e.response.data.errors
        }
    };

    const logout = async () => {
        msg.success = '';
        msg.error = '';
        
        try {
            spinner.value = true;
            const res = await axios.post('/api-v1/api/logout', {}, {
                            headers: {
                                Authorization: `Bearer ${token.value}`
                            }
                        });

            if(res.data.success) {
                token.value = null;
                isAuthenticated.value = false;
                localStorage.removeItem('token');
                msg.error = res.data.message;
                spinner.value = false;

                setTimeout(() => { msg.error = '' }, 3000);
            }

            router.push('/login');
            isLoading.value = false;
        } catch (e) {
            isLoading.value = false;
            spinner.value = false;
            console.log('Logout failed:', e.response.data.errors);
        }
    };

    return {
        // functions
        authenticate, logout, 

        // variables
        token, user, isLoading, errors, msg, isAuthenticated,
        spinner
    };
});