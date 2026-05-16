# DT207G Laboration 4 - Uppgift 1 - Autentisering i webbtjänst
Webbtjänst för registrering och autentisering. Byggt med Express, MongoDB Atlas och Mongoose. JWT används för autentisering och bcrypt för hashning av lösenord.

## Installation
Webbtjänsten använder MongoDB Atlas som databas. Efter klonat repository kör kommando npm install för installation av nödvändiga npm paket. Kör kommando npm run start för att starta server.

## Användning
| Metod | Ändpunkt | Beskrivning |
| ----- | -------- | ----------- |
| POST | /users/register | Registrerar ny användare |
| POST | /users/login | Inloggning |
| GET | /users/protected | Skyddad route som kräver token |

En användare lagras i databasen enligt följande format:
```json
{
  "username": "elisaTest",
  "password": "hashat-lösenord",
  "created": "2026-05-10T13:46:18.832+00:00",
}
```

Av Elisa L. 2026