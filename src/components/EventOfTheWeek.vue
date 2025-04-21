<template>
	<section class="event-week container my-5" v-if="filteredAndSortedEvents.length > 0">
	  <h2 :class="theme === 'dark' ? 'text-light' : 'text-dark'">EVENTY TYGODNIA</h2>
  
	<!-- Sortowanie + filtrowanie + checkbox -->
<div class="d-flex flex-wrap justify-content-center align-items-center gap-3 mb-4">
  <!-- Sortowanie -->
  <div class="d-flex align-items-center">
    <label for="sort" class="me-2 fw-bold">Sortuj:</label>
    <select v-model="sortOption" class="form-select w-auto">
      <option value="dateAsc">Data (od najbliższego)</option>
      <option value="dateDesc">Data (od najdalszego)</option>
      <option value="priceAsc">Cena (rosnąco)</option>
      <option value="priceDesc">Cena (malejąco)</option>
      <option value="likesDesc">Najwięcej polubień</option>
    </select>
  </div>

  <!-- Filtrowanie -->
  <div class="d-flex align-items-center">
    <label for="genre" class="me-2 fw-bold">Gatunek:</label>
    <select v-model="selectedGenre" class="form-select w-auto">
      <option value="">Wszystkie</option>
      <option v-for="genre in uniqueGenres" :key="genre" :value="genre">{{ genre }}</option>
    </select>
  </div>

  <!-- Checkbox ulubionych -->
  <div class="form-check d-flex align-items-center">
    <input
      class="form-check-input me-2"
      type="checkbox"
      id="onlyLiked"
      v-model="showOnlyLiked"
    />
    <label class="form-check-label fw-bold" for="onlyLiked">
      Tylko ulubione
    </label>
  </div>
</div>

  
	  <!-- Lista eventów -->
	  <div class="event-list">
		<div
		  v-for="event in filteredAndSortedEvents"
		  :key="event.id"
		  :class="['event-item mb-4 p-3 rounded shadow', theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark']"
		>
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
  
			  <!-- Serduszko -->
			  <div class="d-flex align-items-center gap-2">
				<button
				  class="btn btn-outline-primary"
				  @click="toggleLike(event)"
				  :disabled="!userId"
				  :title="!userId ? 'Zaloguj się, aby polubić' : ''"
				>
				  <span v-if="event.likedBy?.includes(userId)">❤️</span>
				  <span v-else>🤍</span>
				</button>
				<span>{{ event.likes || 0 }} polubień</span>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</section>
  </template>
  
  <script>
  import { ref, computed, onMounted } from "vue";
  import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
  import { db, auth } from "../firebase";
  
  export default {
	name: "EventOfTheWeek",
	setup() {
	  const events = ref([]);
	  const sortOption = ref("dateAsc");
	  const selectedGenre = ref("");
	  const showOnlyLiked = ref(false);
	  const userId = ref(null);
	  const theme = ref("dark");
  
	  const fetchEvents = async () => {
		const querySnapshot = await getDocs(collection(db, "events"));
		events.value = querySnapshot.docs.map((doc) => ({
		  id: doc.id,
		  ...doc.data(),
		  likedBy: doc.data().likedBy || [],
		}));
	  };
  
	  const toggleLike = async (event) => {
		if (!userId.value) {
		  alert("Musisz być zalogowany, aby polubić wydarzenie.");
		  return;
		}
  
		const eventRef = doc(db, "events", event.id);
		const hasLiked = event.likedBy.includes(userId.value);
  
		if (hasLiked) {
		  event.likedBy = event.likedBy.filter((uid) => uid !== userId.value);
		  event.likes = (event.likes || 0) - 1;
		} else {
		  event.likedBy.push(userId.value);
		  event.likes = (event.likes || 0) + 1;
		}
  
		await updateDoc(eventRef, {
		  likedBy: event.likedBy,
		  likes: event.likes,
		});
	  };
  
	  const updateTheme = () => {
		theme.value = document.body.classList.contains("dark") ? "dark" : "light";
	  };
  
	  const getImagePath = (filename) => {
		return new URL(`../assets/${filename}`, import.meta.url).href;
	  };
  
	  const uniqueGenres = computed(() => {
		const genres = events.value.map((event) => event.genre).filter(Boolean);
		return [...new Set(genres)];
	  });
  
	  const filteredAndSortedEvents = computed(() => {
		let filteredEvents = [...events.value];
  
		if (selectedGenre.value) {
		  filteredEvents = filteredEvents.filter((event) => event.genre === selectedGenre.value);
		}
  
		if (showOnlyLiked.value && userId.value) {
		  filteredEvents = filteredEvents.filter((event) =>
			event.likedBy?.includes(userId.value)
		  );
		}
  
		return filteredEvents.sort((a, b) => {
		  if (sortOption.value === "dateAsc") return new Date(a.date) - new Date(b.date);
		  if (sortOption.value === "dateDesc") return new Date(b.date) - new Date(a.date);
		  if (sortOption.value === "priceAsc") return a.price - b.price;
		  if (sortOption.value === "priceDesc") return b.price - a.price;
		  if (sortOption.value === "likesDesc") return (b.likes || 0) - (a.likes || 0);
		});
	  });
  
	  onMounted(() => {
		updateTheme();
		fetchEvents();
  
		auth.onAuthStateChanged((user) => {
		  if (user) {
			userId.value = user.uid;
		  }
		});
  
		const observer = new MutationObserver(updateTheme);
		observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
	  });
  
	  return {
		events,
		sortOption,
		selectedGenre,
		showOnlyLiked,
		filteredAndSortedEvents,
		uniqueGenres,
		getImagePath,
		toggleLike,
		userId,
		theme,
	  };
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
  .event-item img {
	max-height: 250px;
	object-fit: cover;
  }
  .form-check-input:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
}
  </style>
  