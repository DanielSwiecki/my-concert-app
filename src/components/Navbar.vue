<template>
 <nav
  :class="['navbar', 'navbar-expand-lg', theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light']"
  :style="theme === 'light' ? { backgroundColor: '#7F7F7F' } : {}"
>
    <div class="container">
      <router-link :class="['navbar-brand', theme === 'dark' ? 'text-light' : 'text-dark']" to="/">Poznaj Ludzi</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto d-flex align-items-center gap-2">
          <li class="nav-item">
            <router-link :class="['nav-link', theme === 'dark' ? 'text-light' : 'text-dark']" to="/about">Więcej</router-link>
          </li>
          <li class="nav-item">
            <a :class="['nav-link', theme === 'dark' ? 'text-light' : 'text-dark']" href="#">Bezpieczeństwo</a>
          </li>
          <li class="nav-item">
            <router-link :class="['nav-link', theme === 'dark' ? 'text-light' : 'text-dark']" to="/map">Znajdź nas</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <span :class="['nav-link', theme === 'dark' ? 'text-light' : 'text-dark']">Witaj, {{ username || 'Użytkowniku' }}</span>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link :class="['nav-link', theme === 'dark' ? 'text-light' : 'text-dark']" to="/add-event">Dodaj Event</router-link>
          </li>
          <li class="nav-item">
            <a
              v-if="isLoggedIn"
              :class="['nav-link', theme === 'dark' ? 'text-light' : 'text-dark']"
              href="#"
              @click.prevent="logout"
            >
              Wyloguj się
            </a>
            <router-link v-else :class="['nav-link', theme === 'dark' ? 'text-light' : 'text-dark']" to="/login">Zaloguj się</router-link>
          </li>
          <li class="nav-item">
            <DarkMode />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, watchEffect, onMounted } from "vue";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "vue-router";
import DarkMode from "./DarkModeComponent.vue";

export default {
  name: "Navbar",
  components: {
    DarkMode,
  },
  setup() {
    const isLoggedIn = ref(false);
    const username = ref("Użytkowniku");
    const isAdmin = ref(false);
    const router = useRouter();
    const theme = ref("dark");

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
          console.log("Czy użytkownik jest adminem?", isAdmin.value);
        }
      }
    };

    // Aktualizacja stanu logowania i pobranie nazwy użytkownika
    watchEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          isLoggedIn.value = true;
          console.log("Użytkownik zalogowany:", user);
          fetchUsername(user);
        } else {
          isLoggedIn.value = false;
          username.value = "Użytkowniku";
          isAdmin.value = false;
          localStorage.removeItem("username");
          console.log("Użytkownik wylogowany");
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

    // Funkcja do aktualizacji tematu na podstawie klasy body
    function updateTheme() {
      const body = document.body;
      if (body.classList.contains("dark")) {
        theme.value = "dark";
      } else {
        theme.value = "light";
      }
    }

    onMounted(() => {
      updateTheme();

      // Obserwator zmiany klasy na body, aby dynamicznie reagować na zmianę motywu
      const observer = new MutationObserver(() => {
        updateTheme();
      });

      observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    });

    return { isLoggedIn, username, isAdmin, logout, theme };
  },
};
</script>
