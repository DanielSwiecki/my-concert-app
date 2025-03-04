<template>
  <div class="add-event">
    <h2>Dodaj nowe wydarzenie</h2>
    <form @submit.prevent="addEvent">
      <div class="form-group">
        <label for="name">Nazwa wydarzenia:</label>
        <input type="text" id="name" v-model="event.name" required />
      </div>
      <div class="form-group">
        <label for="image">Nazwa pliku obrazu (np. hq720.jpg):</label>
        <input type="text" id="image" v-model="event.image" required />
        <small>Obraz musi być ręcznie dodany do folderu public/assets</small>
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
      <button type="submit" class="btn btn-primary">Dodaj wydarzenie</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "vue-router";

export default {
  name: "AddEvent",
  setup() {
    const event = ref({
      name: "",
      image: "", // Przechowujemy tylko nazwę pliku
      description: "",
      date: "",
      location: "",
      price: 0,
    });
    const router = useRouter();

    const addEvent = async () => {
      try {
        await addDoc(collection(db, "events"), event.value);
        alert("Wydarzenie dodane! Pamiętaj, aby dodać obraz do folderu public/assets!");
        router.push("/");
      } catch (error) {
        console.error("Błąd podczas dodawania wydarzenia:", error);
      }
    };

    return { event, addEvent };
  },
};
</script>