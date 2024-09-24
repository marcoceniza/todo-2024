import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useTodoStore = defineStore('todo', () => {
    const router = useRouter();
    const errors = ref({});
    const isLoading = ref(false);
    const todos = ref({});

    const index = async () => {
        try {
            isLoading.value = true;
            const res = await axios.get('/api/todo', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if(res.data.success) {
                todos.value = res.data.result;
                isLoading.value = false;
            }
        }catch(e) {
            isLoading.value = false;
            console.error('Error fetching todo:', e.response.data.errors.message);
        }
    }

    index();
  
    const store = async (formData) => {
        try {
            const res = await axios.post('/api/todo', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if(res.data.success) {
                formData.title = '';
                index();
            }
        } catch (e) {
            console.error('Error creating todo:', e.response.data.errors);
        }
    };    

    return { store, errors, isLoading, todos }
});