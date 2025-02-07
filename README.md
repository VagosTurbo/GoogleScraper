# GoogleScraper

GoogleScraper je webová aplikácia, ktorá umožňuje používateľom vyhľadávať na Google a získať výsledky vyhľadávania. Aplikácia pozostáva z backendového servera, ktorý spracováva požiadavky na vyhľadávanie, a frontendového rozhrania, kde môžu používatelia zadávať svoje vyhľadávacie dotazy a zobrazovať výsledky.

## Funkcie

- Vyhľadávanie na Google a získavanie výsledkov vyhľadávania.
- Zobrazenie výsledkov vyhľadávania s názvami, odkazmi a úryvkami.
- Stiahnutie výsledkov vyhľadávania ako JSON súbor.

## Použité technológie

- **Backend**: Node.js, Express, Axios, CORS, dotenv
- **Frontend**: HTML, CSS, JavaScript
- **Testovanie**: Jest, Supertest
- **API**: SerpApi

## Lokálne spustenie pomocou Docker

1. V root adresári projektu spustiť príkaz

   ```
   docker-compose up --build
   ```

2. Následne bude BE bežať na localhost:3000 a FE na localhost:8080
