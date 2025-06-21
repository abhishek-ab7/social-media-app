<template>
  <div class="p-d-flex p-jc-center p-ai-center" style="height: 100vh">
    <Card style="width: 400px">
      <template #title>📝 Signup</template>
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
          <Button label="Signup" icon="pi pi-user-plus" class="p-button-info p-mb-2" @click="signup" />
          <p class="p-mt-3">Already have an account? <router-link to="/">Login here</router-link></p>
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
    async signup() {
      await axios.post('http://localhost:3000/auth/signup', {
        username: this.username,
        password: this.password
      });
      alert('Signup successful!');
      this.$router.push('/');
    }
  }
};
</script>
