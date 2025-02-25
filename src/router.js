import { createRouter, createWebHistory } from "vue-router";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// Lazy loading komponentów
const Home = () => import("./views/Home.vue");
const About = () => import("./views/About.vue");
const Map = () => import("./views/Map.vue");
const Login = () => import("./views/Login.vue");
const Register = () => import("./views/Register.vue");

const routes = [
	{ path: "/", component: Home },
	{ path: "/about", component: About, meta: { requiresAuth: false } }, //true
	{ path: "/map", component: Map, meta: { requiresAuth: false } }, //true
	{ path: "/login", component: Login },
	{ path: "/register", component: Register },
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
	const isAuthenticated = auth.currentUser;

	if (requiresAuth && !isAuthenticated) {
		next("/login");
	} else {
		next();
	}
});

export default router;
