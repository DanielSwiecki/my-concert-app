<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand">Poznaj Ludzi</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/about" class="nav-link">Więcej</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Bezpieczeństwo</a>
          </li>
          <li class="nav-item">
            <router-link to="/map" class="nav-link">Znajdź nas</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <span class="nav-link">Witaj, {{ username || "Użytkowniku" }}</span>
          </li>
          <!-- PRZYCISK "DODAJ EVENT" WIDOCZNY TYLKO DLA ADMINA -->
          <li class="nav-item" v-if="isAdmin">
            <router-link to="/add-event" class="nav-link">Dodaj Event</router-link>
          </li>
          <li class="nav-item">
            <a v-if="isLoggedIn" class="nav-link" href="#" @click="logout">Wyloguj się</a>
            <router-link v-else to="/login" class="nav-link">Zaloguj się</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, watchEffect } from "vue";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "vue-router";

export default {
  name: "Navbar",
  setup() {
    const isLoggedIn = ref(false);
    const username = ref("Użytkowniku");
    const isAdmin = ref(false);
    const router = useRouter();

    // Pobranie nazwy użytkownika z Firestore
    const fetchUsername = async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          username.value = userSnap.data().username;
          localStorage.setItem("username", username.value);

          // Sprawdzenie, czy użytkownik to admin
          isAdmin.value = username.value === "Admin" || username.value === "Admin123";
        }
      }
    };

    // Obserwujemy zmiany w stanie logowania
    watchEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          isLoggedIn.value = true;
          fetchUsername(user);
        } else {
          isLoggedIn.value = false;
          username.value = "Użytkowniku";
          isAdmin.value = false;
          localStorage.removeItem("username");
        }
      });
    });

    // Wylogowanie użytkownika
    const logout = async () => {
      try {
        await signOut(auth);
        localStorage.removeItem("username");
        isLoggedIn.value = false;
        username.value = "Użytkowniku";
        isAdmin.value = false;
        alert("Wylogowano!");
        router.push("/login");
      } catch (error) {
        console.error("Błąd podczas wylogowywania:", error);
      }
    };

    return { isLoggedIn, username, isAdmin, logout };
  },
};
</script>
