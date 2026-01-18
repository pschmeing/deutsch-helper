# Zeeg Setup (Strato + Google Kalender)

Diese Datei beschreibt die minimalen Schritte, um die Zeeg-Einbettung mit
Google Kalender zu verbinden und die Demo durch euren echten Link zu ersetzen.

## 1) Zeeg vorbereiten
- Zeeg Konto anlegen
- Event Types erstellen (z.B. "Haarschnitt", "Faerben")
- Verfuegbarkeit/oeffnungszeiten einstellen
- Google Kalender verbinden (Settings -> Calendar Connections)

## 2) Link in der Website setzen
- In `.env` den echten Link hinterlegen:

```env
VITE_ZEEG_URL=https://zeeg.me/dein-salon/beratung
```

- Wenn `.env` nicht existiert, kopiere `.env.example` und passe den Link an.

## 3) Deploy auf Strato
- Projekt bauen (z.B. `npm run build`)
- Build-Output auf Strato hochladen (meist `dist/`)

## Demo vs. Live
- Ohne `VITE_ZEEG_URL` wird eine Demo-Ansicht angezeigt.
- Mit echtem Link zeigt die Seite direkt euren Zeeg-Kalender.
