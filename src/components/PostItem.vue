<script setup>

import { ref} from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  postEdit: {
    type: Object,
    required: false,
  }
});

const newCateg = ref(props.postEdit.category ?? '');
const newTitle = ref(props.postEdit.title ?? '');
const newDesc = ref(props.postEdit.description ?? '');


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


const emit = defineEmits([
  'delete-post',
  'like-post',
  'edit-post',
  'reset-post',
  'update-post'
]);

const handleDeletePost = () => {
  emit('delete-post', props.post.id);
}

const hadleLikePost = () => {
  emit('like-post', props.post.id);
  console.log(props.post.id);
}

const handleEditPost = () => {
   newTitle.value = props.post.title;
   newDesc.value = props.post.description;
   newCateg.value = props.post.category;
   emit('edit-post', props.post);
}

const handleResetPost = () => {
  emit('reset-post', {});
}

const handleUpdatePost = () => {
   const newPost = {
      id: props.post.id,
      title: newTitle.value,
      description: newDesc.value,
      category: newCateg.value,
   }

   emit('update-post', newPost);
}


</script>

<template>
    <div  class="bg-white hover:border-green-500 rounded-lg border-1 border-gray-300 p-2">
      <div class="flex justify-between items-center">
        <select v-if="postEdit === post" v-model="newCateg" :selected="newCateg" class="w-full mb-2 mt-2 p-1 border-1 border-gray-300">
           <option value="">Select category</option>
           <option v-for="category in categories" :value="category.name" >
            {{ category.name }}
           </option>
        </select>

          <span v-else class="text-sm px-2 py-1 rounded-xl bg-blue-400 text-white">{{ post.category }}</span>
          <span
           @click="hadleLikePost"
          :class="`${post.isLike ? 'text-red-500' : 'text-gray-500'} text-xl cursor-pointer`">
            <i class="pi pi-heart-fill"></i>
          </span>
        </div>
        <input v-model="newTitle" v-if="postEdit === post"  type="text" class="w-full mb-2 mt-2 p-1 border-1 border-gray-300">
        <h3 v-else class="text-xl font-bold text-gray-600">
                {{ post.title }}
        </h3>
        <textarea name="" v-if="postEdit === post" v-model="newDesc" class="w-full border-1 border-gray-300 p-2"></textarea>
        <p v-else class="text-gray-600 text-sm">
          {{ post.description }}
        </p>

        <div class="flex justify-start gap-3 mt-2">
              <span
                @click="handleDeletePost"
                 class="text-green-500 text-xl cursor-pointer">
                <i class="pi pi-times-circle"></i>
              </span>
              <span
                  @click="handleEditPost"
                  class="text-green-500 text-xl cursor-pointer">
                  <i class="pi pi-pen-to-square"></i>
              </span>

              <div v-if="postEdit === post">
                <span
                @click="handleResetPost"
                    class="text-red-500 text-xl cursor-pointer">
                    reset
                </span>
                <span
                @click="handleUpdatePost"
                    class="text-blue-500 text-xl cursor-pointer">
                    save
                </span>
              </div>
        </div>
    </div>
</template>

<style scoped>
</style>
