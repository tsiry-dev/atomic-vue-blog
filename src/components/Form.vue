<script setup>

import { ref} from 'vue'
import { toast } from "vue3-toastify";

const title = ref('');
const description = ref('');
const category = ref('');

const emit = defineEmits(['create-post']);

const handleCreatePost = () => {

  if(!title.value || !description.value || !category.value) {
    toast("All inputs required!!", {
      "type": "error",
      "dangerouslyHTMLString": true
    })
    return;
  }

  const obj = {
    id: crypto.randomUUID(),
    title: title.value,
    description: description.value,
    category: category.value,
    isLike: false
  }

  emit('create-post', obj);
  toast("Post created successfully!!", {
      "type": "success",
      "dangerouslyHTMLString": true,
      "position": "top-left"
  });

  title.value = '';
  description.value = '';
  category.value = '';
}


const categories = ref([
  { id: 1, name: 'Web' },
  { id: 2, name: 'Mobile' },
  { id: 3, name: 'Design' },
  { id: 4, name: 'Photography' },
  { id: 5, name: 'Lifestyle' },
  { id: 6, name: 'Travel to the tours' },
  { id: 7, name: 'Photography' },
  { id: 8, name: 'Lifestyle' },
]);
</script>

<template>

  <form class="max-w-sm mx-auto mt-5" @submit.prevent="handleCreatePost">
    <div class="mb-5">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-600">Post title</label>
      <input
          type="text"
          v-model="title"
          class="w-full border-1 bg-white border-gray-300 p-2 rounded-lg outline-none focus:border-green-500 focus:bg-green-50 border-l-4 focus:border-l-4 focus:outline-none"
          placeholder="title...">
    </div>

    <div class="mb-5">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-600">
        Select category
      </label>
      <select
      v-model="category"
            class="w-full bg-white border-1 border-gray-300 p-2 rounded-lg outline-none focus:border-green-500 focus:bg-green-50 border-l-4 focus:border-l-4 focus:outline-none"
      >
        <option value="">Select category</option>
        <option v-for="(category, index) in categories" :key="index" :value="category.name">
           {{ category.name }}
        </option>

      </select>
    </div>

    <div class="mb-5">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-600">
        Description
      </label>
      <textarea
           v-model="description"
          class="bg-white w-full border-1 border-gray-300 p-2 rounded-lg outline-none focus:border-green-500 focus:bg-green-50 border-l-4 focus:border-l-4 focus:outline-none"
          placeholder="description..."
      ></textarea>
    </div>

    <button type="submit" class="text-white bg-green-500 rounded-lg px-4 py-2 text-sm cursor-pointer">Add post</button>
  </form>
</template>

<style scoped>
</style>
