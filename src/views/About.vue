<template>
  <div class="background-overlay">
    <!-- Nagłówek -->
    <header class="header">
      <h1>Aplikacja do Wyszukiwania Imprez w Mieście</h1>
      <p class="tagline">Znajdź najlepsze wydarzenia w swoim mieście!</p>
    </header>

    <!-- Opis aplikacji -->
    <section class="app-description">
      <h2>O Aplikacji</h2>
      <p>
        Nasza aplikacja została zaprojektowana, aby ułatwić Ci życie i pomóc
        znaleźć wydarzenia w Twoim mieście. Dzięki intuicyjnemu interfejsowi
        możesz szybko przeszukać nadchodzące imprezy, koncerty, festiwale oraz
        inne wydarzenia kulturalne w wybranym miejscu i czasie. 
      </p>
      <p>
        Nasza aplikacja zbiera informacje z różnych źródeł, co pozwala na szybki
        dostęp do najnowszych wydarzeń, które spełniają Twoje zainteresowania.
      </p>
      <p>
        Oferujemy również opcję zapisywania ulubionych wydarzeń i otrzymywania
        powiadomień o nadchodzących imprezach. Niezależnie od tego, czy
        szukasz koncertu, imprezy klubowej czy festiwalu, nasza aplikacja
        pomoże Ci w znalezieniu tego, co Cię interesuje!
      </p>
    </section>

    <!-- Informacje o autorze -->
    <section class="author">
      <h2>O Autorze</h2>
      <p>
        Autor aplikacji to młody programista z pasją do tworzenia nowoczesnych
        aplikacji. Wierzy, że technologia powinna upraszczać życie ludzi i
        umożliwiać im łatwy dostęp do ważnych informacji. 
      </p>
      <p>
        Aplikacja do wyszukiwania imprez jest wynikiem chęci poprawy sposobu, 
        w jaki ludzie odkrywają wydarzenia w swoich miastach.
      </p>
    </section>

    <!-- Stopka -->
    <footer class="footer">
      <p>&copy; 2024 Aplikacja Wyszukiwania Imprez. Wszystkie prawa zastrzeżone.</p>
    </footer>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue"; // Import nawigacji
export default {
  name: "AboutView",
  components: {
    Navbar // Rejestrujemy komponent
  }
};
</script>

<style>
@import "../style/about.css";
</style>
