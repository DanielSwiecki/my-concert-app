<template>
	<section class="event-week container my-5" v-if="filteredAndSortedEvents.length > 0">
	  <h2 class="text-center">EVENTY TYGODNIA</h2>
  
	  <!-- Sortowanie -->
	  <div class="d-flex justify-content-center mb-3">
		<label for="sort" class="me-2">Sortuj według:</label>
		<select v-model="sortOption" class="form-select w-auto">
		  <option value="dateAsc">Data (od najbliższego)</option>
		  <option value="dateDesc">Data (od najdalszego)</option>
		  <option value="priceAsc">Cena (rosnąco)</option>
		  <option value="priceDesc">Cena (malejąco)</option>
		</select>
	  </div>
  
	  <!-- Filtrowanie -->
	  <div class="d-flex justify-content-center mb-3">
		<label for="genre" class="me-2">Filtruj według gatunku:</label>
		<select v-model="selectedGenre" class="form-select w-auto">
		  <option value="">Wszystkie</option>
		  <option v-for="genre in uniqueGenres" :key="genre" :value="genre">{{ genre }}</option>
		</select>
	  </div>
  
	  <div class="event-list">
		<div v-for="(event, index) in filteredAndSortedEvents" :key="index" class="event-item">
		  <div class="row align-items-center">
			<div class="col-md-5 text-center">
			  <img :src="getImagePath(event.image)" alt="Artysta" class="img-fluid rounded" />
			</div>
			<div class="col-md-7">
			  <h3 class="text-center text-md-start">{{ event.title || "Brak tytułu" }}</h3>
			  <p>{{ event.description }}</p>
			  <p>
				<strong>Kiedy:</strong> {{ event.date }}<br />
				<strong>Gdzie:</strong> {{ event.location }}<br />
				<strong>Wstęp:</strong> {{ event.price }} zł<br />
				<strong>Gatunek:</strong> {{ event.genre || "Nieznany" }}
			  </p>
			  <div class="text-center text-md-start">
				<button class="btn btn-primary buy-ticket">Kup bilet</button>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</section>
  </template>
  
  <script>
  import { ref, computed, onMounted } from "vue";
  import { collection, getDocs } from "firebase/firestore";
  import { db } from "../firebase";
  
  export default {
	name: "EventOfTheWeek",
	setup() {
	  const events = ref([]);
	  const sortOption = ref("dateAsc");
	  const selectedGenre = ref("");
  
	  // Pobieranie eventów z Firebase
	  const fetchEvents = async () => {
		const querySnapshot = await getDocs(collection(db, "events"));
		events.value = querySnapshot.docs.map((doc) => ({
		  id: doc.id,
		  ...doc.data(),
		}));
	  };
  
	  onMounted(fetchEvents);
  
	  // Pobieranie ścieżki obrazu
	  const getImagePath = (filename) => {
		return new URL(`../assets/${filename}`, import.meta.url).href;
	  };
  
	  // Unikalne gatunki muzyki do filtrowania
	  const uniqueGenres = computed(() => {
		const genres = events.value.map((event) => event.genre).filter(Boolean);
		return [...new Set(genres)];
	  });
  
	  // Sortowanie i filtrowanie eventów
	  const filteredAndSortedEvents = computed(() => {
		let filteredEvents = events.value;
  
		// Filtrowanie po gatunku
		if (selectedGenre.value) {
		  filteredEvents = filteredEvents.filter((event) => event.genre === selectedGenre.value);
		}
  
		// Sortowanie
		return filteredEvents.sort((a, b) => {
		  if (sortOption.value === "dateAsc") {
			return new Date(a.date) - new Date(b.date);
		  } else if (sortOption.value === "dateDesc") {
			return new Date(b.date) - new Date(a.date);
		  } else if (sortOption.value === "priceAsc") {
			return a.price - b.price;
		  } else if (sortOption.value === "priceDesc") {
			return b.price - a.price;
		  }
		});
	  });
  
	  return { events, sortOption, selectedGenre, filteredAndSortedEvents, uniqueGenres, getImagePath };
	},
  };
  </script>
  
  <style scoped>
  h2 {
	margin-bottom: 20px;
  }
  label {
	font-weight: bold;
  }
  select {
	margin: 0 10px;
  }
  ul {
	list-style-type: none;
	padding: 0;
  }
  .event-item {
	border: 1px solid #ccc;
	padding: 15px;
	margin-bottom: 15px;
	border-radius: 10px;
  }
  </style>
  