# Modul 183: Podcastmanager

Dieses Projekt beinhaltet das **Frontend** und **Backend** für den Podcastmanager, der in den Modulen **295 (Backend)** und **294 (Frontend)** erstellt wird.  
Der Podcastmanager ist eine Webapplikation, welche es ermöglicht, Podcasts zu verwalten.

## Voraussetzungen

- **PostgreSQL**-Datenbank (über Docker oder manuell)
- **Node.js** für das Frontend
- **Java & Maven** für das Backend
- **Docker** für die Authentifizierung (Keycloak)

---

## Installation

### 1. Datenbank erstellen

1. **PostgreSQL konfigurieren**:
    - PGAdmin öffnen
    - Eine neue Datenbank erstellen:
        - **Name:** `podcastmanager`
        - **User:** `postgres`
        - **Passwort:** `postgres`

---

### 2. Backend starten

1. **Projekt öffnen**:
    - Das Backend-Projekt in **IntelliJ IDEA** öffnen.
2. **Dependencies installieren**:
    - In der Maven-Oberfläche `install` ausführen.
3. **Backend starten**:
    - `PodcastmanagerApplication.java` öffnen.
    - Das Projekt über den grünen Play-Button starten.
4. **Prüfen**:
    - Das Backend sollte nun auf **`http://localhost:9090`** erreichbar sein.

---

### 3. Frontend starten

1. **Projekt öffnen**:
    - Das Frontend-Projekt in **Visual Studio Code** öffnen.
2. **Dependencies installieren**:
    - Im Terminal in den Ordner `frontend` navigieren:
      ```bash
      cd frontend
      npm install
      ```
3. **Frontend starten**:
    - Das Frontend starten:
      ```bash
      npm run start
      ```
4. **Prüfen**:
    - Das Frontend sollte nun auf **`http://localhost:4200`** erreichbar sein.

---

### 4. Keycloak starten & konfigurieren

1. **Keycloak starten** (via Docker):
    ```bash
    docker run -d --name keycloak \
      -p 8080:8080 \
      -e KEYCLOAK_ADMIN=admin \
      -e KEYCLOAK_ADMIN_PASSWORD=admin \
      quay.io/keycloak/keycloak:latest \
      start-dev
    ```
2. **Keycloak öffnen**:
    - **URL:** `http://localhost:8080`
    - **Username:** `admin`
    - **Passwort:** `admin`

3. **Realm erstellen**:
    - Einen neuen Realm namens `ILV` erstellen.

4. **Client erstellen**:
    - Client ID: `podcastmanager`
    - Name: `podcastmanager`
    - Valid Redirect URIs: `http://localhost:4200/*`
    - Valid post Logout Redirect URIs: `http://localhost:4200/*`
    - Web Origins: `http://localhost:4200`

5. **Rollen hinzufügen**:
    - Auf dem Client `podcastmanager` folgende Rollen erstellen:
        - `ROLE_admin`
        - `ROLE_staff`
        - `ROLE_user`

6. **User erstellen und konfigurieren**:
    - Einen neuen User hinzufügen:
        - **Username, Email, First Name, Last Name** eintragen.
        - **Email Verified:** `ON`.
    - Passwort setzen:
        - Auf `Credentials` klicken.
        - Passwort eintragen und `Temporary` auf `OFF` setzen.
    - Rollen zuweisen:
        - Auf `Role Mappings` klicken.
        - Nach `ROLE_` suchen.
        - Rolle `ROLE_user` zuweisen.
        - Ggf. `ROLE_staff`, `ROLE_admin` zuweisen.

---

### 5. Anwendung ausprobieren

1. **Anwendung öffnen**:
    - Die Anwendung sollte nun auf **`http://localhost:4200`** erreichbar sein.
2. **Login**:
    - Mit den erstellten Benutzerdaten einloggen.
3. **Podcasts verwalten**:
    - Neue Artists, Topics und Podcasts erstellen, bearbeiten und löschen.

## Troubleshooting

### Häufige Probleme:

- **Datenbankverbindung**:
    - Prüfe, ob die PostgreSQL-Datenbank korrekt läuft und die Zugangsdaten stimmen.
- **Keycloak**:
    - Stelle sicher, dass der Client `podcastmanager` und die Redirect URIs korrekt konfiguriert sind.

# Weitere Informationen

- Swagger UI kann man über http://localhost:9090/ erreichen
- Beispieldaten können auf folgender [Notion-Seite](https://lorenzboss.notion.site/Podcastmanager-7c5220e47616473f8b084ff88ea6fcc2) gefunden werden
- Wenn man Daten über Swagger UI hinzu fügen möchte, sollte man sich an folgende Reihenfolge halten: 
    - Artist Daten hinzufügen
    - Topic Daten hinzufügen
    - Podcast Daten hinzufügen
    - Writer Daten hinzufügen`*`
    - Review Daten hinzufügen`*`
    - `*` nur über Swagger UI möglich, keine Angular Implementierung
