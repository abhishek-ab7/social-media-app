<template>
  <div class="m-4">
    <div class="flex justify-content-between align-items-center mb-3">
      <h2 class="mb-0">📜 Your Timeline</h2>
      <Button label="Logout" icon="pi pi-sign-out" class="p-button-secondary" @click="logout" />
    </div>

    <div class="grid mb-4">
      <!-- Create Post -->
      <div class="col-12 md:col-8">
        <Card class="shadow-4 h-full">
          <template #title>✏️ Create a Post</template>
          <template #content>
            <div class="fluid formgrid grid">
              <div class="field col-12 md:col-5">
                <InputText v-model="title" placeholder="Post Title" />
              </div>
              <div class="field col-12 md:col-5">
                <InputText v-model="description" placeholder="Description" />
              </div>
              <div class="field col-12 md:col-2">
                <Button label="Create" icon="pi pi-plus" class="p-button-success" @click="createPost" />
              </div>
            </div>
          </template>
        </Card>
      </div>

      <!-- People you can follow -->
      <div class="col-12 md:col-4">
        <Card class="shadow-2">
          <template #title>👥 People You Can Follow:</template>
          <template #content>
            <div class="grid">
              <div v-for="u in filteredUsers" :key="u._id" class="col-12">
                <Card>
                  <template #title>{{ u.username }}</template>
                  <template #content>
                    <Button v-if="!isFollowing(u._id)" label="Follow" icon="pi pi-user-plus" class="p-button-sm mr-2" @click="follow(u._id)" />
                    <Button v-else label="Unfollow" icon="pi pi-user-minus" class="p-button-danger p-button-sm" @click="unfollow(u._id)" />
                  </template>
                </Card>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!-- Posts -->
    <Card class="shadow-2">
      <template #title>📝 Posts from People You Follow:</template>
      <template #content>
        <div class="grid">
          <div v-for="post in posts" :key="post._id" class="col-12 sm:col-6 md:col-4">
            <Card class="mb-3">
              <template #title>{{ post.title }}</template>
              <template #content>
                <p class="text-secondary">{{ post.description }}</p>
              </template>
            </Card>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      description: '',
      users: [],
      posts: [],
      currentUserId: '',
      currentUser: null
    };
  },
  computed: {
    filteredUsers() {
      const seen = new Set();
      if (!this.users) return [];
      return this.users.filter(u => {
        if (!u || !u.username) return false;
        if (u._id === this.currentUserId) return false;
        if (seen.has(u._id)) return false;
        seen.add(u._id);
        return true;
      });
    }
  },
  methods: {
    isFollowing(userId) {
      if (!this.currentUser || !this.currentUser.following) return false;
      return this.currentUser.following.some(user => user && user._id === userId);
    },
    async getUsers() {
      const res = await axios.get('http://localhost:3000/users/all', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      this.users = res.data;
      if (this.currentUserId) {
        this.currentUser = this.users.find(u => u._id === this.currentUserId);
      }
    },
    async getProfile() {
      const res = await axios.get('http://localhost:3000/auth/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      this.currentUserId = res.data.userId;
    },
    async follow(id) {
      const userToFollow = this.users.find(u => u._id === id);
      if (userToFollow) {
        this.currentUser.following.push(userToFollow);
      }
      await axios.post(`http://localhost:3000/users/follow/${id}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      this.getPosts();
    },
    async unfollow(id) {
      this.currentUser.following = this.currentUser.following.filter(u => u._id !== id);
      await axios.post(`http://localhost:3000/users/unfollow/${id}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      this.getPosts();
    },
    async getPosts() {
      const res = await axios.get('http://localhost:3000/posts/timeline', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      this.posts = res.data;
    },
    async createPost() {
      await axios.post('http://localhost:3000/posts', {
        title: this.title,
        description: this.description
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      this.getPosts();
      this.title = this.description = '';
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  },
  async mounted() {
    await this.getProfile();
    await this.getUsers();
    await this.getPosts();
  }
};
</script>
