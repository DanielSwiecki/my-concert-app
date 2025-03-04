<template>
	<section class="event-week container my-5" v-if="events.length > 0">
	  <h2 class="text-center">EVENTY TYGODNIA</h2>
	  <div class="event-list">
		<div v-for="(event, index) in events" :key="index" class="event-item">
		  <div class="row align-items-center">
			<div class="col-md-5 text-center">
			  <img :src="getImagePath(event.image)" alt="Artysta" class="img-fluid rounded" />
			</div>
			<div class="col-md-7">
			  <!-- 🔥 Poprawione na event.title zamiast event.name -->
			  <h3 class="text-center text-md-start">{{ event.title || "Brak tytułu" }}</h3>
			  <p>{{ event.description }}</p>
			  <p>
				<strong>Kiedy:</strong> {{ event.date }}<br />
				<strong>Gdzie:</strong> {{ event.location }}<br />
				<strong>Wstęp:</strong> {{ event.price }} zł
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
  import { ref, onMounted } from "vue";
  import { collection, getDocs } from "firebase/firestore";
  import { db } from "../firebase";
  
  export default {
	name: "EventOfTheWeek",
	setup() {
	  const events = ref([]);
  
	  const fetchEvents = async () => {
		const querySnapshot = await getDocs(collection(db, "events"));
		events.value = querySnapshot.docs.map((doc) => doc.data());
	  };
  
	  const getImagePath = (filename) => {
		return new URL(`../assets/${filename}`, import.meta.url).href;
	  };
  
	  onMounted(fetchEvents);
  
	  return { events, getImagePath };
	},
  };
  </script>
  