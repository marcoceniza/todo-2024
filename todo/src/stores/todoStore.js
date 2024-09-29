import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed } from 'vue';

export const useTodoStore = defineStore('todo', () => {
    const errors = ref({});
    const todos = ref({});
    const allTodos = ref([]);
    const isLoading = ref(false);
    const isStore = ref(false);
    const filter = ref('default');
    const currentPage = ref(1);
    const itemsPerPage = ref(5);

    const fetchTodos = async () => {
        try {
            isLoading.value = true;
            const res = await axios.get('/api/todo', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (res.data.success) {
                allTodos.value = res.data.result;
                isLoading.value = false; 
            }
        } catch (e) {
            isLoading.value = false;
            console.log('Error fetching todo:', e.response.data.errors);
        }
    };

    const totalFilteredTodos = computed(() => {
        let filtered = allTodos.value;
        switch (filter.value) {
            case 'important':
                filtered = filtered.filter(todo => todo.important === 1);
                break;
            case 'done':
                filtered = filtered.filter(todo => todo.done === 1);
                break;
            default:
                filtered = filtered.filter(todo => todo.done === 0 && todo.important === 0);
        }
        return filtered;
    });
    
    const totalPages = computed(() => {
        return Math.ceil(totalFilteredTodos.value.length / itemsPerPage.value);
    });
    
    const filteredTodos = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return totalFilteredTodos.value.slice(start, end);
    });

    const changePage = (page) => {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page;
        }
    };

    const store = async (formData) => {
        try {
            isStore.value = true;
            const res = await axios.post('/api/todo', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if(res.data.success) {
                formData.title = '';
                await fetchTodos();
                isStore.value = false;
            }
        } catch (e) {
            isStore.value = false;
            console.log('Error creating todo:', e.response.data.errors);
        }
    };

    const status = async (apiRoute, id) => {
        try {
            isStore.value = true;
            await axios.post(`/api/${apiRoute}/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            await fetchTodos();
            isStore.value = false;
        } catch (e) {
            isStore.value = false;
            console.log('Error creating todo:', e.response.data.errors);
        }
    }

    const deleteTodo = async (id) => {
        try {
            isStore.value = true;
            const res = await axios.delete(`/api/todo/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if(res.data.success) {
                await fetchTodos();
                isStore.value = false;
            }
        } catch (e) {
            isStore.value = false;
            console.log('Error deleting todo:', e.response.data.errors);
        }
    }

    const retrieveTodo = async (id) => {
        try {
            isStore.value = true;
            const res = await axios.put(`/api/retrieve/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if(res.data.success) {
                await fetchTodos();
                isStore.value = false;
            }
        } catch (e) {
            isStore.value = false;
            console.log('Error deleting todo:', e.response.data.errors);
        }
    }

    return {
        // functions
        store, status, fetchTodos, changePage, deleteTodo,
        retrieveTodo,

        // variables
        errors, isLoading, todos, allTodos, filter,
        filteredTodos, isStore, currentPage, itemsPerPage, totalPages
    };
});