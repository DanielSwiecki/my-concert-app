<template>
    <div>
      <!-- Główna zawartość -->
      <div class="background-overlay">
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
  
      <!-- Sekcja z kartami -->
      <section class="expanded-content" id="expanded-content">
        <div class="container">
          <div class="row">
            <div class="col-md-4 mb-3" v-for="(event, index) in events" :key="index">
              <div class="card text-white bg-dark" :style="{ backgroundImage: `url(${event.image})` }">
                <div class="card-body">
                  <p class="card-title">{{ event.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Event tygodnia -->
        <section class="event-week container my-5">
          <h2 class="text-center">EVENT TYGODNIA</h2>
          <div class="row align-items-center">
            <div class="col-md-5 text-center mb-3 mb-md-0">
              <img :src="eventWeek.image" alt="Artysta" class="img-fluid rounded">
            </div>
  
            <div class="col-md-7">
              <h3 class="text-center text-md-start">{{ eventWeek.title }}</h3>
              <p>{{ eventWeek.description }}</p>
              <p>
                <strong>Kiedy:</strong> {{ eventWeek.date }}<br />
                <strong>Gdzie:</strong> {{ eventWeek.location }}<br />
                <strong>Wstęp:</strong> {{ eventWeek.price }} zł
              </p>
              <div class="text-center text-md-start">
                <button class="btn btn-primary buy-ticket">Kup bilet</button>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  </template>
  
  <script>
  import Navbar from "../components/Navbar.vue"; // Import nawigacji
  export default {
    name: "Home",
    components: {
    Navbar // Rejestracja komponentu
  },
    data() {
  return {
    events: [
      {
        name: "Slipknot",
        image: "/assets/ab6761610000e5ebd0cdb283a7384a0edb665182.jpg"
      },
      {
        name: "Ice Nine Kills",
        image: "/assets/INK_WORK-OF-ART-SINGLE-COVER_FLAT_4printi.jpg"
      },
      {
        name: "DISCO4",
        image: "/assets/81Jmu34n-EL._UF1000,1000_QL80_.jpg"
      }
    ],
    eventWeek: {
      title: "STUDENCKIE ŚLĄSKA",
      image: "/assets/hq720.jpg",
      description: "To The Rats And Wolves to niemiecki zespół metalcore'owy, który łączy agresywne riffy i scream z elektronicznymi brzmieniami oraz chwytliwymi refrenami. Ich muzyka przyciąga uwagę energicznymi utworami, które balansują między ciężkimi dźwiękami a melodią. Zespół zdobył popularność dzięki wydaniu albumów takich jak Neverland i Cheap Love, a ich koncerty cieszą się dużym uznaniem za intensywność i emocjonalny ładunek.",
      date: "14 grudnia 2024, godz. 21:00",
      location: "Klub SPIS, Śląska 24",
      price: 45
    }
  };
},
methods: {
  scrollToEventWeek() {
    console.log('Kliknięto przycisk scroll');
    const element = document.querySelector('.event-week');
    console.log('Znaleziony element:', element);
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      console.error('Nie znaleziono elementu .event-week');
    }
  }
}
  };
  </script>
  
  
  <style scoped>

  
  /* Naprawa nachodzących elementów */
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
  
  /* Naprawa stylów kart */
  .card {
    background-size: cover;
    background-position: center;
    height: 200px;
  }
  
  .expanded-content {
    padding: 50px 0;
  }
  </style>
  