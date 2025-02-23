<template>
    <div class="login">
      <h2>Zaloguj się</h2>
      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Hasło" required />
        <button type="submit">Zaloguj</button>
      </form>
      <p class="register-link">
        Nie masz konta? <router-link to="/register">Zarejestruj się</router-link>
      </p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { auth } from "../firebase";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  
  export default {
    setup() {
      const email = ref("");
      const password = ref("");
      const errorMessage = ref("");
      const router = useRouter();
  
      const login = async () => {
        try {
          await signInWithEmailAndPassword(auth, email.value, password.value);
          alert("Zalogowano!");
          router.push("/");
        } catch (error) {
          errorMessage.value = error.message;
        }
      };
  
      return { email, password, login, errorMessage };
    },
  };
  </script>
  
  <style scoped>
  @import "../style/about.css";
  .login {
    max-width: 400px;
    margin: 100px auto;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
    color: white;
  }
  
  .login h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #00bcd4;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
  }
  
  .login form {
    display: flex;
    flex-direction: column;
  }
  
  .login input {
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    border: none;
  }
  
  .login button {
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #00bcd4;
    color: white;
    cursor: pointer;
  }
  
  .login button:hover {
    background-color: #0097a7;
  }
  
  .register-link {
    text-align: center;
    margin-top: 15px;
  }
  
  .register-link a {
    color: #00bcd4;
    text-decoration: none;
  }
  
  .register-link a:hover {
    text-decoration: underline;
  }
  
  .error {
    color: red;
    text-align: center;
    margin-top: 10px;
  }
  </style>