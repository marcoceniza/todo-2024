import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const useCustomStore = defineStore('custom', () => {
    const errors = ref({});
  
    const authenticate = async (apiRoute, formData) => {
        try {
            const res = await axios.post(`/api/${apiRoute}`, formData);
            console.log(res.data.message);
        } catch (error) {
            errors.value = error.response.data.errors;
        }
    }

  return { authenticate, errors }
})
