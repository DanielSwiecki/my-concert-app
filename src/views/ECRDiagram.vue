<template>
  <div class="container mt-4">
    <h2 class="mb-3">Diagram ECR</h2>
    <p>Ten diagram pokazuje pełną logikę działania aplikacji (users + events).</p>

    <button @click="copyToClipboard" class="btn btn-primary mb-3">
      Kopiuj diagram ECR do schowka
    </button>

    <pre class="bg-light p-3 border rounded" style="white-space: pre-wrap;">{{ ecrDiagram }}</pre>

    <hr class="my-5" />

    <h2 class="mb-3">Diagram ERD (relacje bazy danych)</h2>
    <p>Struktura kolekcji i relacji w Firestore.</p>

    <button @click="copyERDToClipboard" class="btn btn-primary mb-3">
      Kopiuj diagram ERD do schowka
    </button>

    <pre class="bg-light p-3 border rounded" style="white-space: pre-wrap;">{{ erdDiagram }}</pre>
  </div>
</template>

<script>
export default {
  name: "ECRDiagram",
  data() {
    return {
      ecrDiagram: "",
      erdDiagram: "",
    };
  },
  mounted() {
    // ECR Diagram
    this.ecrDiagram = `@startuml

title ECR Diagram - MyConcertApp

' Rejestracja nowego użytkownika
"User submits Register form" --> "Form valid" --> "Create user in Firebase Auth + Add user to Firestore (users collection)"

' Logowanie użytkownika
"User submits Login form" --> "Credentials correct" --> "Log user in (Firebase Auth)"
"User submits Login form" --> "Credentials incorrect" --> "Show error message"

' Dodanie eventu przez admina
"Admin submits Add Event form" --> "Form valid" --> "Save new event in Firestore (events collection)"

' Polubienie eventu
"User clicks Like on Event" --> "User is logged in" --> "Update likedBy array, increment likes"
"User clicks Like on Event" --> "User is NOT logged in" --> "Show login prompt"

' Wyświetlanie listy eventów
"User visits Home page" --> "Events exist in Firestore" --> "Render events list"
"User visits Home page" --> "No events in Firestore" --> "Show empty state message"

' Wyświetlanie mapy
"User visits Map page" --> "User authenticated" --> "Show map with event locations"

@enduml`;

    // ERD Diagram
    this.erdDiagram = `@startuml

entity "users" {
  * uid : string <<PK>>
  --
  email : string
  username : string
}

entity "events" {
  * id : string <<PK>>
  --
  date : string
  description : string
  genre : string
  image : string
  likedBy : array<string> <<FK to users.uid>>
  likes : number
  location : string
  price : string
  title : string
}

users ||..o{ events : likedBy

@enduml`;
  },
  methods: {
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.ecrDiagram);
        alert("Diagram ECR skopiowany do schowka!");
      } catch (err) {
        alert("Nie udało się skopiować.");
      }
    },
    async copyERDToClipboard() {
      try {
        await navigator.clipboard.writeText(this.erdDiagram);
        alert("Diagram ERD skopiowany do schowka!");
      } catch (err) {
        alert("Nie udało się skopiować.");
      }
    },
  },
};
</script>

<style scoped>
pre {
  font-family: 'Courier New', monospace;
  font-size: 14px;
}
</style>
