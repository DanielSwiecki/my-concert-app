import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Import Bootstrapa - upewnij się, że ścieżki są poprawne!
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Upewnij się, że JS Bootstrapa jest zaimportowany
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);
app.use(router);
app.mount("#app");
