<template>
  <div class="p-d-flex p-jc-center p-ai-center" style="height: 100vh">
    <Card style="width: 400px">
      <template #title>🔐 Login</template>
      <template #content>
        <div class="p-fluid">
          <div class="p-field p-mb-3">
            <label>Username</label>
            <InputText v-model="username" placeholder="Username" />
          </div>
          <div class="p-field p-mb-3">
            <label>Password</label>
            <Password v-model="password" toggleMask feedback="false" />
          </div>
          <Button label="Login" icon="pi pi-sign-in" class="p-button-success p-mb-2" @click="login" />
          <p class="p-mt-3">New here? <router-link to="/signup">Create an account</router-link></p>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import axios from 'axios';
import Password from 'primevue/password';

export default {
  components: { Password },
  data() {
    return { username: '', password: '' };
  },
  methods: {
    async login() {
      const res = await axios.post('http://localhost:3000/auth/login', {
        username: this.username,
        password: this.password
      });
      localStorage.setItem('token', res.data.access_token);
      this.$router.push('/timeline');
    }
  }
};
</script>
