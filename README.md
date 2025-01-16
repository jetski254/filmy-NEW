# Wypożyczalnia filmów API

## Wprowadzenie
Wypożyczalnia filmów API to aplikacja umożliwiająca zarządzanie danymi o filmach, wypożyczeniach oraz recenzjach użytkowników w systemie, który używa MongoDB jako bazy danych. Umożliwia ona rejestrację, logowanie, dodawanie filmów, recenzji oraz wypożyczeń.


## Technologie
- **Node.js** v18.x
- **Express** v4.18.2
- **MongoDB** v7.2.2
- **Bcrypt** v5.1.0
- **jsonwebtoken** v9.0.0
- **dotenv** v16.4.7
- **morgan** v1.10.0
- **body-parser** v1.20.2

## Uruchomienie

1. Sklonuj repozytorium:
    ```bash
    git clone https://github.com/username/filmy-api.git
    cd filmy-api
    ```

2. Zainstaluj wymagane zależności:
    ```bash
    npm install
    ```

3. Skonfiguruj plik `.env`:
    - W pliku `.env` muszą się znaleźć następujące zmienne:
        ```
        DB_USER=your_database_user
        DB_PASSWORD=your_database_password
        DB_NAME=your_database_name
        JWTkey=your_jwt_secret_key
        ```

4. Uruchom aplikację:
    ```bash
    npm start
    ```

5. Aplikacja będzie działać na porcie **3000** 

## Spis treści
- [Wprowadzenie](#wprowadzenie)
- [Technologie](#technologie)
- [Uruchomienie](#uruchomienie)
- [Funkcjonalności](#funkcjonalności)
- [Przykłady użycia](#przykłady-użycia)
- [Status projektu](#status-projektu)
- [Źródła](#źródła)
- [Licencja](#licencja)

## Funkcjonalności
- **Rejestracja i logowanie użytkowników**: Użytkownicy mogą się zarejestrować i zalogować za pomocą JWT.
- **Zarządzanie filmami**: Możliwość dodawania filmów.
- **Zarządzanie wypożyczeniami**: Użytkownicy mogą wypożyczać filmy.
- **Zarządzanie recenzjami**: Użytkownicy mogą dodawać recenzje filmów, oceniać je oraz dodawać komentarze.


## Przykłady użycia w Postmanie

### **1. Rejestracja użytkownika**
- **Endpoint:** `POST /auth/signup`
- **Opis:** Umożliwia rejestrację nowego użytkownika.
- **Przykładowe dane wejściowe (Body):**
    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "securepassword123"
    }
    ```
- **Przykładowa odpowiedź:**
    ```json
    {
        "message": "Użytkownik utworzony",
        "user": {
            "_id": "64af710af8d26a3e2e9f26b3",
            "email": "john@example.com",
            "name": "John Doe"
        }
    }
    ```

---

### **2. Logowanie użytkownika**
- **Endpoint:** `POST /auth/login`
- **Opis:** Umożliwia zalogowanie się użytkownika i zwraca token JWT.
- **Przykładowe dane wejściowe (Body):**
    ```json
    {
        "email": "john@example.com",
        "password": "securepassword123"
    }
    ```
- **Przykładowa odpowiedź:**
    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

---

### **3. Pobranie wszystkich filmów**
- **Endpoint:** `GET /movies`
- **Opis:** Zwraca listę wszystkich filmów.
- **Przykładowa odpowiedź:**
    ```json
    [
        {
            "_id": "64af7220f8d26a3e2e9f26b4",
            "title": "Inception",
            "genre": "Sci-Fi",
            "releaseYear": 2010
        },
        {
            "_id": "64af7230f8d26a3e2e9f26b5",
            "title": "The Matrix",
            "genre": "Action",
            "releaseYear": 1999
        }
    ]
    ```

---

### **4. Dodanie filmu**
- **Endpoint:** `POST /movies`
    ```
    Authorization: Bearer <token>
    ```
- **Przykładowe dane wejściowe (Body):**
    ```json
    {
        "title": "Inception",
        "genre": "Sci-Fi",
        "releaseYear": 2010
    }
    ```
- **Przykładowa odpowiedź:**
    ```json
    {
        "_id": "64af7305f8d26a3e2e9f26b6",
        "title": "Inception",
        "genre": "Sci-Fi",
        "releaseYear": 2010
    }
    ```

---

### **5. Dodanie recenzji filmu**
- **Endpoint:** `POST /reviews`
    ```
    Authorization: Bearer <token>
    ```
- **Przykładowe dane wejściowe (Body):**
    ```json
    {
        "user": "64af710af8d26a3e2e9f26b3",
        "movie": "64af7305f8d26a3e2e9f26b6",
        "rating": 5,
        "comment": "Fantastyczny film!",
        "dateTime": "2023-07-10T10:00:00.000Z"
    }
    ```
- **Przykładowa odpowiedź:**
    ```json
    {
        "_id": "64af7400f8d26a3e2e9f26b7",
        "user": "64af710af8d26a3e2e9f26b3",
        "movie": "64af7305f8d26a3e2e9f26b6",
        "rating": 5,
        "comment": "Fantastyczny film!",
        "dateTime": "2023-07-10T10:00:00.000Z"
    }
    ```

---

### **6. Pobranie recenzji użytkownika**
- **Endpoint:** `GET /reviews/user/:userId`
    ```
    Authorization: Bearer <token>
    ```
- **Przykładowa odpowiedź:**
    ```json
    {
        "message": "Opinie użytkownika 64af710af8d26a3e2e9f26b3",
        "reviews": [
            {
                "rating": 5,
                "comment": "Fantastyczny film!",
                "dateTime": "2023-07-10T10:00:00.000Z",
                "movie": {
                    "title": "Inception",
                    "genre": "Sci-Fi",
                    "releaseYear": 2010
                }
            }
        ]
    }
    ```

---

### **7. Tworzenie wypożyczenia**
- **Endpoint:** `POST /rentals`
    ```
    Authorization: Bearer <token>
    ```
- **Przykładowe dane wejściowe (Body):**
    ```json
    {
        "userId": "64af710af8d26a3e2e9f26b3",
        "movieId": "64af7305f8d26a3e2e9f26b6",
        "rentalDate": "2023-07-15"
    }
    ```
- **Przykładowa odpowiedź:**
    ```json
    {
        "message": "Wypożyczenie utworzone pomyślnie"
    }
    ```

---

### **8. Pobranie wypożyczeń użytkownika**
- **Endpoint:** `GET /rentals/user/:userId`
    ```
    Authorization: Bearer <token>
    ```
- **Przykładowa odpowiedź:**
    ```json
    {
        "message": "Wypożyczenia użytkownika 64af710af8d26a3e2e9f26b3",
        "rentals": [
            {
                "rentalDate": "2023-07-15",
                "movie": {
                    "title": "Inception",
                    "genre": "Sci-Fi",
                    "releaseYear": 2010
                }
            }
        ]
    }
    ```
