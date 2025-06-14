<script setup>


import { ref} from 'vue'

const props = defineProps({
  posts: {
    type: Array,
    required: true,
  }
});

const emit = defineEmits(['search-post']);

const search = ref('');

const handleSearch = () => {
  emit('search-post', search.value);
}

</script>

<template>
    <div class="grid grid-cols-2 gap-4">
      <h2 class="text-2xl text-gray-600">Posts ({{ posts.length }})</h2>
      <input
            @keyup="handleSearch"
            v-model="search"
            type="text"
            class="bg-white w-full border-1 border-gray-300 p-2 rounded-lg outline-none focus:border-green-500 focus:bg-green-50 border-l-4 focus:border-l-4 focus:outline-none"
            placeholder="search...">
    </div>
</template>

<style scoped>
</style>
