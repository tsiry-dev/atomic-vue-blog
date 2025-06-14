<script setup>

import { ref , computed} from 'vue'


import 'primeicons/primeicons.css'

import Form from '@/components/Form.vue'
import Filter from '@/components/Filter.vue'
import PostItem from '@/components/PostItem.vue';
import Nav from '@/components/Nav.vue';
import Search from '@/components/Search.vue';
import { toast } from "vue3-toastify";

import { data } from '@/data/post.js';

const posts = ref(data);
const originalPosts = ref(data); // Ajout d'une copie de la liste originale


const postEdit = ref({});
const bounce = ref(false);
const query = ref('');
const postsLike = computed(() => posts.value.filter(post => post.isLike));

const createPost = (obj) => {
    posts.value.push(obj);
    originalPosts.value = posts.value.slice();

}

const deletePost = (id) => {

  const confirm = window.confirm("Are you sure you want to delete this post?");

  if(!confirm) {
    return;
  }

  toast("Post deleted successfully!!", {
      "type": "success",
      "dangerouslyHTMLString": true
  });
  const index = posts.value.findIndex(post => post.id === id);
  posts.value.splice(index, 1);

}

const likePost = (id) => {
  const post = posts.value.find(post => post.id === id);
  post.isLike = !post.isLike;
}

const nbPostLike = computed(() => {
  bounce.value = true;
  setTimeout(() => {
    bounce.value = false;
  }, 500);
  return posts.value.filter(post => post.isLike).length;
})

const editPost = (post) => {
  postEdit.value = post;
  console.log(post);
}

const resetPost = (data) => {
    postEdit.value = data;
}

const updatePost = (newPost) => {
  const index = posts.value.findIndex(post => post.id === newPost.id);
  posts.value[index] = {...posts.value[index], ...newPost};
  toast("Post updated successfully!!", {
      "type": "success",
      "dangerouslyHTMLString": true
  });
}

const searchPost = (query) => {
    if (!query) {
        posts.value = [...originalPosts.value];
    } else {
        posts.value = originalPosts.value.filter(post =>
            post.title.toLowerCase().includes(query.toLowerCase())
        );

        postEdit.value = {};

    }
};


</script>

<template>
  <div class="mt-5 w-[96%] lg:max-w-6xl m-auto">
    <Nav  :nbPostLike="nbPostLike" :bounce="bounce" :postsLike="postsLike" />
    <div class="grid grid-cols-1  md:grid-cols-3 gap-4">
      <div class="col-span-1 ">
          <h2 class="text-2xl text-gray-600 text-center sm:text-center md:text-left">New post</h2>

          <Form @create-post="createPost" />
          <Filter />

      </div>
      <div class="col-span-2">

          <Search @search-post="searchPost" :posts="posts" />

          <div v-if="posts.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4  mt-5">
              <PostItem
                  @delete-post="deletePost"
                  @like-post="likePost"
                  @edit-post="editPost"
                  @reset-post="resetPost"
                  @update-post="updatePost"
                  :postEdit="postEdit"
                  v-for="(post, index) in posts" :post="post" :key="index"  />
          </div>

          <div class="text-center mt-15 text-black rounded-lg px-4 py-2 text-sm cursor-pointer" v-else>
              <h2 class="text-3xl">Aucun post pour le moment! ❌</h2>
          </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>
