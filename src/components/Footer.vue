<template>
    <footer class="footer" :class="theme">
      <div class="container text-center">
        <img src="../assets/logo.png" alt="Logo Klubu" class="footer-logo mb-3" />
  
        <p>Plac Wolności 7<br />50-071 Wrocław<br />730-992-808</p>
        <p>(Godziny pracy biura – poniedziałek, środa, czwartek, piątek od 8:00 do 14:00)</p>
  
        <div class="footer-socials d-flex justify-content-center gap-4 my-3">
          <a href="https://facebook.com" target="_blank" class="fs-3"><i class="bi bi-facebook"></i></a>
          <a href="https://instagram.com" target="_blank" class="fs-3"><i class="bi bi-instagram"></i></a>
          <a href="https://vimeo.com" target="_blank" class="fs-3"><i class="bi bi-vimeo"></i></a>
          <a href="https://soundcloud.com" target="_blank" class="fs-3"><i class="bi bi-cloud"></i></a>
        </div>
  
        <div class="footer-contact mt-2">
          <p>Masz pytania? <a href="mailto:kontakt@twojklub.pl">Wyślij maila</a></p>
        </div>
  
        <!-- Karuzela sponsorów -->
        <div class="sponsor-carousel mt-5">
          <div class="carousel-track">
            <div v-for="(sponsor, index) in duplicatedSponsors" :key="index" class="sponsor-item">
              <img :src="getImagePath(sponsor)" :alt="sponsor" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "Footer",
    data() {
      return {
        sponsors: [
          "Cola.png",
          "Diablo.png",
          "Xbox.png",
          "Ing.png",
          "Helios.png",
          "Kindome.png",
          "Brewery.png",
        ],
        theme: "dark", // domyślnie dark, ale aktualizowane poniżej
      };
    },
    computed: {
      duplicatedSponsors() {
        return [...this.sponsors, ...this.sponsors];
      },
    },
    methods: {
      getImagePath(filename) {
        return new URL(`../assets/${filename}`, import.meta.url).href;
      },
      updateTheme() {
        const body = document.body;
        this.theme = body.classList.contains("light") ? "light" : "dark";
      },
    },
    mounted() {
      this.updateTheme();
      const observer = new MutationObserver(() => this.updateTheme());
      observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    },
  };
  </script>
  
  <style scoped>
  .footer {
    padding: 40px 20px;
    font-size: 0.95rem;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  .footer.dark {
    background-color: #404040;
    color: white;
  }
  .footer.light {
    background-color: #f0f0f0;
    color: #111;
  }
  .footer-logo {
    height: 125px;
    transition: transform 0.3s ease;
  }
  .footer-logo:hover {
    transform: scale(1.1);
  }
  .footer-socials a {
    color: inherit;
    transition: transform 0.3s, color 0.3s;
  }
  .footer-socials a:hover {
    transform: scale(1.2);
    color: #00bcd4;
  }
  .footer-contact a {
    text-decoration: underline;
    color: #00bcd4;
  }
  
  /* Karuzela sponsorów */
  .sponsor-carousel {
    overflow: hidden;
    width: 100%;
    margin-top: 40px;
  }
  .carousel-track {
    display: flex;
    gap: 60px;
    animation: scrollLeft 30s linear infinite;
    width: max-content;
  }
  .sponsor-item img {
    height: 95px;
    max-width: 150px;
    object-fit: contain;
    transition: transform 0.3s;
  }
  .sponsor-item img:hover {
    transform: scale(1.15);
  }
  
  /* Animacja płynna w lewo */
  @keyframes scrollLeft {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .sponsor-item img {
      height: 50px;
      max-width: 100px;
    }
    .footer-logo {
      height: 70px;
    }
  }
  </style>
  