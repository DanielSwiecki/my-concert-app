import { createRouter, createWebHistory } from "vue-router";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// Lazy loading komponentów
const Home = () => import("./views/Home.vue");
const About = () => import("./views/About.vue");
const Map = () => import("./views/Map.vue");
const Login = () => import("./views/Login.vue");
const Register = () => import("./views/Register.vue");
const AddEvent = () => import("./views/AddEvent.vue"); // Dodajemy nowy komponent

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About, meta: { requiresAuth: false } },
  { path: "/map", component: Map, meta: { requiresAuth: false } },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/add-event",
    component: AddEvent,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Flaga sprawdzania autoryzacji
let isAuthChecked = false;

router.beforeEach(async (to, from, next) => {
  if (!isAuthChecked) {
    await new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        isAuthChecked = true;
        resolve(user);
      });
    });
  }

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);
  const isAuthenticated = auth.currentUser;

  // Sprawdzenie, czy użytkownik jest adminem
  let isAdmin = false;
  if (isAuthenticated) {
    isAdmin = isAuthenticated.email === "admin@gmail.com" || isAuthenticated.displayName === "Admin123"; // Zmiana na displayName
  }

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (requiresAdmin && !isAdmin) {
    next("/"); // Przekierowanie na stronę główną, jeśli użytkownik nie jest adminem
  } else {
    next();
  }
});

export default router;
