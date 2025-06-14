<script setup>

import { ref } from 'vue'


const props = defineProps({
  nbPostLike: {
    type: Number,
    required: true,
  },
  bounce: {
    type: Boolean,
    required: true,
  },
  postsLike: {
    type: Array,
    required: true,
  },
});

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
}

</script>

<template>
   <nav class="flex justify-between items-center mx-15 h-[4rem]">
      <h1 class="text-4xl text--500 font-bold">Vue blog</h1>
      <div :class="`${props.bounce ? 'active-bounce' : null} relative`">
          <span
          @click="toggleMenu"
            class="text-red-500 text-3xl cursor-pointer relative">
            <div v-if="!isOpen">
                <i class="pi pi-heart-fill"></i>
              <span class="absolute right-0 text-xs text-white bg-green-500 rounded-full left-5 px-2 py-1 w-5 h-5 flex justify-center items-center top-[-0.5rem]">
                {{ props.nbPostLike }}
              </span>
            </div>
            <i  v-else class="pi pi-times-circle"></i>
          </span>

          <div v-if="isOpen" class="absolute top-10 w-[20rem] right-0 bg-blue-400 p-5 rounded-lg">
            <ul>
              <li v-if="postsLike.length > 0" class="text-white flex justify-between" v-for="post in props.postsLike" :key="post.id">
                <span class="ml-2 text-lg uppercase">{{ post.title }}</span>
                <i class="pi pi-times-circle cursor-pointer text-red-600"></i>
              </li>

              <li v-else >
                <div class="text-center text-white">No post like 🤣!!</div>
              </li>
            </ul>
          </div>
      </div>
    </nav>
</template>

<style scoped>
.active-bounce {
  animation: bounce .2s linear;
}

@keyframes bounce {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);


  }
}

</style>
