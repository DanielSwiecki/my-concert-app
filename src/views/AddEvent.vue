<template>
  <div class="background-overlay">
    <div class="add-event">
      <h2>Dodaj nowe wydarzenie</h2>
      <form @submit.prevent="addEvent">
        <div class="form-group">
          <label for="title">Tytuł wydarzenia:</label>
          <input type="text" id="title" v-model="event.title" required />
        </div>
        <div class="form-group">
          <label for="image">Zdjęcie wydarzenia:</label>
          <input type="file" id="image" @change="onFileChange" accept="image/*" required />
          <small>Wybierz zdjęcie, które zostanie dodane do wydarzenia.</small>
          <div v-if="imageUrl" class="image-preview">
            <img :src="imageUrl" alt="Podgląd zdjęcia" style="max-width: 200px; margin-top: 10px;" />
          </div>
        </div>
        <div class="form-group">
          <label for="description">Opis:</label>
          <textarea id="description" v-model="event.description" required></textarea>
        </div>
        <div class="form-group">
          <label for="date">Data:</label>
          <input type="text" id="date" v-model="event.date" required />
        </div>
        <div class="form-group">
          <label for="location">Lokalizacja:</label>
          <input type="text" id="location" v-model="event.location" required />
        </div>
        <div class="form-group">
          <label for="price">Cena:</label>
          <input type="number" id="price" v-model="event.price" required />
        </div>
        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
          <span v-if="!isSubmitting">Dodaj wydarzenie</span>
          <span v-else>Dodawanie...</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // Firebase Firestore
import { useRouter } from "vue-router";

export default {
  name: "AddEvent",
  setup() {
    const event = ref({
      title: "", // 🔄 Zmienione z `name` na `title`
      image: "", // Przechowuje nazwę pliku
      description: "",
      date: "",
      location: "",
      price: 0,
    });

    const router = useRouter();
    const selectedFile = ref(null);
    const imageUrl = ref(null);
    const isSubmitting = ref(false);

    const onFileChange = (e) => {
      selectedFile.value = e.target.files[0];
      if (selectedFile.value) {
        event.value.image = selectedFile.value.name; // Zapisujemy tylko nazwę pliku
        imageUrl.value = URL.createObjectURL(selectedFile.value); // Podgląd zdjęcia
      } else {
        imageUrl.value = null;
      }
    };

    const addEvent = async () => {
      isSubmitting.value = true;
      try {
        await addDoc(collection(db, "events"), event.value);
        alert("Wydarzenie dodane!");
        router.push("/");
      } catch (error) {
        console.error("Błąd podczas dodawania wydarzenia:", error);
        alert("Błąd podczas dodawania wydarzenia: " + error.message);
      } finally {
        isSubmitting.value = false;
      }
    };

    return { event, addEvent, onFileChange, imageUrl, isSubmitting };
  },
};
</script>

<style scoped>
@import "../style/event.css";
</style>
