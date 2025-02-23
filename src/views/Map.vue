<template>
  <div class="map-container">
    <!-- Trójkąty jako znaczniki lokalizacji -->
    <div class="triangle" id="triangle-1" @click="showPopup('Circuit Dreams, ul. Wita Stwosza')"></div>
    <div class="triangle" id="triangle-2" @click="showPopup('The Neural Pit, ul. Gliwicka')"></div>
    <div class="triangle" id="triangle-3" @click="showPopup('Phantom Reverb, ul. Korfantego')"></div>

    <!-- Okno popup -->
    <div v-if="popupVisible" id="popup">
      <div id="popup-text">{{ popupText }}</div>
      <button id="close-popup" @click="closePopup">Zamknij</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MapView",
  data() {
    return {
      popupVisible: false,
      popupText: "",
    };
  },
  methods: {
    showPopup(text) {
      this.popupText = text;
      this.popupVisible = true;
    },
    closePopup() {
      this.popupVisible = false;
    }
  }
};
</script>

<style scoped>
/* Pełny ekran */
html, body {
  height: 100%;
}

/* Tło mapy */
.map-container {
  background-color: black;
  background-image: url("/assets/Mapa123.png"); /* Ścieżka do obrazu w public/assets */
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* Trójkąty - znaczniki na mapie */
.triangle {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid #250a02;
  cursor: pointer;
}

/* Pozycje trójkątów */
#triangle-1 {
  top: 50%;
  left: 50%;
}
#triangle-2 {
  top: 30%;
  left: 60%;
}
#triangle-3 {
  top: 70%;
  left: 45%;
}

/* Popup */
#popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#popup-text {
  margin-bottom: 20px;
}

#close-popup {
  background-color: #0b3a41;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

#close-popup:hover {
  background-color: #440303;
}
</style>
