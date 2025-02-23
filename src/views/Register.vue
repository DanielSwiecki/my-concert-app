<template>
    <div class="register">
      <h2>Zarejestruj się</h2>
      <form @submit.prevent="register">
        <input type="text" v-model="username" placeholder="Nazwa użytkownika" required />
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Hasło" required />
        <button type="submit">Zarejestruj</button>
      </form>
      <p class="login-link">
        Masz już konto? <router-link to="/login">Zaloguj się</router-link>
      </p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { auth, db } from "../firebase";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
  import { useRouter } from "vue-router";
  
  export default {
    setup() {
      const username = ref("");
      const email = ref("");
      const password = ref("");
      const errorMessage = ref("");
      const router = useRouter();
  
      const register = async () => {
  try {
    if (!username.value.trim()) {
      errorMessage.value = "Podaj nazwę użytkownika!";
      return;
    }

    // Sprawdzanie, czy nazwa użytkownika już istnieje
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("username", "==", username.value));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      errorMessage.value = "Nazwa użytkownika jest już zajęta!";
      return;
    }

    // Tworzenie konta użytkownika
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    // Zapisanie danych użytkownika w Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: email.value,
      username: username.value,
    });

    alert("Konto zostało utworzone!");
    router.push("/login");
  } catch (error) {
    errorMessage.value = error.message;
  }
};
  
      return { username, email, password, register, errorMessage };
    },
  };
  </script>
  
  <style scoped>
   @import "../style/about.css";
  .register {
    max-width: 400px;
    margin: 100px auto;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
    color: white;
  }
  
  .register h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #00bcd4;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
  }
  
  .register form {
    display: flex;
    flex-direction: column;
  }
  
  .register input {
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    border: none;
  }
  
  .register button {
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #00bcd4;
    color: white;
    cursor: pointer;
  }
  
  .register button:hover {
    background-color: #0097a7;
  }
  
  .login-link {
    text-align: center;
    margin-top: 15px;
  }
  
  .login-link a {
    color: #00bcd4;
    text-decoration: none;
  }
  
  .login-link a:hover {
    text-decoration: underline;
  }
  
  .error {
    color: red;
    text-align: center;
    margin-top: 10px;
  }
  </style>