# City Events Hub

Aplikacja webowa do odkrywania koncertów i imprez w mieście. Użytkownik przegląda wydarzenia, filtruje je i oznacza ulubione, a administrator dodaje nowe eventy. Frontend to SPA w Vue 3, dane i konta trzyma Firebase.

[![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Vue Router](https://img.shields.io/badge/Vue_Router-4-42b883?logo=vuedotjs&logoColor=white)](https://router.vuejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ESM-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Firebase](https://img.shields.io/badge/Firebase-11-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Cloud Firestore](https://img.shields.io/badge/Cloud_Firestore-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/docs/firestore)
[![Firebase Auth](https://img.shields.io/badge/Firebase_Auth-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/docs/auth)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Bootstrap Icons](https://img.shields.io/badge/Bootstrap_Icons-1.11-7952B3?logo=bootstrap&logoColor=white)](https://icons.getbootstrap.com/)
[![Firebase Hosting](https://img.shields.io/badge/Firebase_Hosting-deploy-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/docs/hosting)

## O projekcie

City Events Hub pokazuje, jak złożyć interfejs wydarzeń kulturalnych z kontami użytkowników i bazą w chmurze. Strona główna łączy statyczną wizytówkę (wideo w tle, karty artystów) z listą eventów pobieraną z Firestore. Trasy wymagające logowania i panel administratora są chronione guardem w Vue Router.

Zakres, który widać w kodzie:

- rejestracja i logowanie e-mailem (Firebase Authentication) oraz profil w kolekcji `users`,
- lista eventów tygodnia z sortowaniem (data, cena, polubienia), filtrem gatunku i widokiem samych ulubionych,
- polubienia zapisywane w dokumencie wydarzenia (`likedBy`, licznik `likes`),
- formularz dodawania wydarzenia dla administratora (tytuł, opis, data, lokalizacja, cena, gatunek, zdjęcie),
- mapa lokali z markerami i oknem szczegółów,
- przełącznik motywu jasny / ciemny zapamiętywany w `localStorage`,
- leniwe ładowanie widoków i hosting SPA na Firebase Hosting.

## Stack

| Warstwa | Technologia |
| --- | --- |
| UI | Vue 3, Bootstrap 5, Bootstrap Icons |
| Routing | Vue Router 4, `createWebHistory`, lazy import widoków |
| Build | Vite 6 |
| Auth i dane | Firebase Authentication, Cloud Firestore |
| Deploy | Firebase Hosting (`dist`, rewrite na `index.html`) |
| CI | GitHub Actions (`.github/workflows/main.yml`) |

## Funkcje i trasy

| Ścieżka | Dostęp | Co robi |
| --- | --- | --- |
| `/` | publiczna | Hero, karty artystów, eventy tygodnia |
| `/login`, `/register` | publiczne | Logowanie i rejestracja |
| `/about` | zalogowany | Opis aplikacji |
| `/map` | zalogowany | Mapa lokali z popupami |
| `/add-event` | administrator | Formularz nowego wydarzenia |
| `/ecr-diagram` | administrator | Diagramy ECR i ERD (PlantUML) do schowka |

Guard w `src/router.js` czeka na stan Firebase Auth, a następnie przepuszcza trasę, kieruje na `/login` albo wraca na stronę główną, gdy brakuje roli administratora.

## Model danych

**`users`**

- `uid` — identyfikator z Firebase Auth
- `email`, `username`

**`events`**

- `title`, `description`, `date`, `location`, `price`, `genre`
- `image` — ścieżka lub adres zdjęcia
- `likes` — licznik
- `likedBy` — tablica identyfikatorów użytkowników

## Uruchomienie

Wymagany Node.js 18+.

```bash
npm install
npm run dev
```

Aplikacja startuje na adresie pokazanym przez Vite (domyślnie `http://localhost:5173`).

Konfiguracja projektu Firebase znajduje się w `src/firebase.js` (Auth, Firestore, Storage). Bez działającego projektu Firebase logowanie i lista eventów nie połączą się z bazą.

```bash
npm run build    # build produkcyjny do dist/
npm run preview  # podgląd buildu
```

Deploy hostingu (po zalogowaniu Firebase CLI i wybraniu projektu):

```bash
npm run build
firebase deploy --only hosting
```

`firebase.json` serwuje katalog `dist` i przekierowuje nieznane ścieżki na `index.html`, żeby odświeżenie podstrony SPA nie zwracało 404.

## Struktura

```text
src/
  main.js                 # Vue, router, Bootstrap
  App.vue                 # Navbar + router-view
  router.js               # trasy i guard auth / admin
  firebase.js             # Auth, Firestore, polubienia
  components/
    Navbar.vue
    EventOfTheWeek.vue    # lista, filtry, polubienia
    DarkModeComponent.vue
    Footer.vue
  views/
    Home.vue
    Login.vue
    Register.vue
    About.vue
    Map.vue
    AddEvent.vue
    ECRDiagram.vue
  style/                  # style globalne i widoków
public/                   # assety statyczne (wideo, mapa, zdjęcia)
```

## Na co zwrócić uwagę w kodzie

- **Stan sesji.** Navbar czyta `onAuthStateChanged` i dokument użytkownika z Firestore, żeby pokazać nick oraz linki administratora.
- **Listy po stronie klienta.** `EventOfTheWeek` sortuje i filtruje pobraną kolekcję bez dodatkowego zapytania przy każdej zmianie selecta.
- **Spójność polubień.** `likeEvent` / `unlikeEvent` aktualizują tablicę `likedBy` i licznik w jednej operacji `updateDoc`.
- **Motyw.** Klasa `light` albo `dark` na `body` plus zapis preferencji w `localStorage`.
