<template>
	<div>
		<div class="background-overlay">
			<video autoplay muted loop class="background-video">
				<source src="/assets/481483663_9188448917870235_527274161133306753_n.mp4" type="video/mp4" />
				Twój przeglądarka nie obsługuje tagu wideo.
			</video>
			<main class="content text-center">
				<h1>Poznaj nowych ludzi w swoim mieście</h1>
				<div class="community-stats d-flex justify-content-center flex-wrap">
					<div class="stat mx-3">
						<span class="number">834</span>
						<span class="label">UŻYTKOWNIKÓW</span>
					</div>
					<div class="stat mx-3">
						<span class="number">42</span>
						<span class="label">BARÓW</span>
					</div>
					<div class="stat mx-3">
						<span class="number">6</span>
						<span class="label">KLUBÓW</span>
					</div>
				</div>
				<div class="scroll-indicator mt-3">
					<button class="btn btn-outline-light" @click="scrollToEventWeek">&#9660;</button>
				</div>
			</main>
		</div>

		<!-- Sekcja z kartami (statyczne) -->
		<section class="expanded-content" id="expanded-content">
			<div class="container">
				<div class="row">
					<div class="col-md-4 mb-3" v-for="(event, index) in events" :key="index">
						<a v-if="event.link" :href="event.link" target="_blank" class="card-link">
							<div class="card text-white bg-dark" :style="{ backgroundImage: `url(${getImagePath(event.image)})` }">
								<div class="card-body">
									<p class="card-title">{{ event.name }}</p>
								</div>
							</div>
						</a>
						<div v-else class="card text-white bg-dark" :style="{ backgroundImage: `url(${getImagePath(event.image)})` }">
							<div class="card-body">
								<p class="card-title">{{ event.name }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Event tygodnia (dynamiczny z Firestore) -->
			<EventOfTheWeek />
		</section>

		<!-- Sekcja sponsorów (statyczna) -->
		<section class="sponsors">
			<div class="container">
				<div class="row justify-content-center">
					<div class="col-md-2 mb-3" v-for="(sponsor, index) in sponsors" :key="index">
						<a :href="sponsor.link" target="_blank">
							<img :src="getImagePath(sponsor.image)" :alt="sponsor.name" class="sponsor-logo img-fluid" />
						</a>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import EventOfTheWeek from "../components/EventOfTheWeek.vue";

export default {
	name: "Home",
	components: {
		Navbar,
		EventOfTheWeek,
	},
	data() {
		return {
			events: [
				{
					name: "Slipknot",
					image: "ab6761610000e5ebd0cdb283a7384a0edb665182.jpg",
					link: "https://slipknot1.com/",
				},
				{
					name: "Ice Nine Kills",
					image: "INK_WORK-OF-ART-SINGLE-COVER_FLAT_4printi.jpg",
					link: "https://iceninekills.com/",
				},
				{
					name: "DISCO4",
					image: "81Jmu34n-EL._UF1000,1000_QL80_.jpg",
					link: "https://www.youwillloveeachother.com/",
				},
			],
			sponsors: [
				{
					name: "Coca Cola",
					image: "Coca-Cola_logotyp-1024x576.png",
					link: "https://sponsor1.com",
				},
				{
					name: "Marshall",
					image: "Marshall_logo.svg.png",
					link: "https://sponsor3.com",
				},
			],
		};
	},
	methods: {
		getImagePath(filename) {
			return new URL(`../assets/${filename}`, import.meta.url).href;
		},
		scrollToEventWeek() {
			const element = document.querySelector(".event-week");
			if (element) {
				element.scrollIntoView({ behavior: "smooth", block: "start" });
			} else {
				console.error("Nie znaleziono elementu .event-week");
			}
		},
	},
};
</script>


<style scoped>
/* Pozostawiamy style bez zmian */
.background-overlay {
	position: relative;
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
}

.content {
	z-index: 2;
	position: relative;
	padding: 50px 0;
}

.card {
	background-size: cover;
	background-position: center;
	height: 200px;
	cursor: pointer;
}

.expanded-content {
	padding: 50px 0;
}

.card-link {
	text-decoration: none;
}

.sponsors {
	background-color: #111;
	padding: 20px 0;
}

.sponsor-logo {
	max-width: 100%;
	height: auto;
	object-fit: contain;
}

.sponsors .row {
	display: flex;
	justify-content: space-around;
}

.sponsors .col-md-2 {
	flex: 0 0 20%;
	text-align: center;
}

@media (max-width: 768px) {
	.sponsors .col-md-2 {
		flex: 0 0 45%;
	}
}
</style>