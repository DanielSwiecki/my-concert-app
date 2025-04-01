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

        

          <!-- Pole do wpisania własnego gatunku -->
                  <div class="form-group genre-selection">
          <label for="genre">Gatunek muzyczny:</label>
          <select id="genre" v-model="event.genre">
            <option value="">Wybierz gatunek...</option>
            <option v-for="genre in predefinedGenres" :key="genre" :value="genre">{{ genre }}</option>
            <option value="custom">Inny...</option>
          </select>

          <!-- Pole do wpisania własnego gatunku -->
          <input
            v-if="event.genre === 'custom'"
            type="text"
            class="custom-genre"
            v-model="customGenre"
            placeholder="Wpisz własny gatunek"
          />
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
      title: "",
      image: "",
      description: "",
      date: "",
      location: "",
      price: 0,
      genre: "", // Nowe pole do przechowywania gatunku
    });

    const predefinedGenres = [
      "Rock",
      "Pop",
      "Jazz",
      "Hip-Hop",
      "Elektronika",
      "Klasyczna",
      "Metal",
      "Reggae",
    ];

    const customGenre = ref("");
    const router = useRouter();
    const selectedFile = ref(null);
    const imageUrl = ref(null);
    const isSubmitting = ref(false);

    const onFileChange = (e) => {
      selectedFile.value = e.target.files[0];
      if (selectedFile.value) {
        event.value.image = selectedFile.value.name;
        imageUrl.value = URL.createObjectURL(selectedFile.value);
      } else {
        imageUrl.value = null;
      }
    };

    const addEvent = async () => {
      isSubmitting.value = true;

      // Jeśli użytkownik wybrał "Inny..." i wpisał własny gatunek, używamy go zamiast "custom"
      if (event.value.genre === "custom" && customGenre.value.trim()) {
        event.value.genre = customGenre.value.trim();
      }

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

    return {
      event,
      addEvent,
      onFileChange,
      imageUrl,
      isSubmitting,
      predefinedGenres,
      customGenre,
    };
  },
};
</script>

<style scoped>
@import "../style/event.css";
</style>
