# Galleria Foto Unsplash

La Galleria Foto Unsplash è un'esplorazione moderna e sofisticata nell'ambito delle applicazioni web, realizzata con l'intento di fornire un accesso intuitivo e performante a un'estesa collezione di fotografie di alta qualità.

> Demo: https://assessment-dtd.vercel.app

## Panoramica

Questo progetto si avvale dell'API pubblica di **Unsplash** per presentare agli utenti un'interfaccia elegante attraverso cui esplorare, cercare e interagire con una vasta gamma di immagini. Al di là della semplice visualizzazione, l'applicazione permette di marcare immagini come preferite e di commentarle, arricchendo l'esperienza utente con un livello di interazione e personalizzazione. La connessione a **MongoDB** tramite **Mongoose** offre una soluzione robusta per la gestione dei dati, permettendoci di memorizzare e recuperare con efficienza informazioni relative ai preferiti degli utenti e ai commenti, mantenendo la flessibilità necessaria per eventuali espansioni future del dataset.

## Tecnologie e Architettura

- **Next.js**: La scelta di Next.js come framework di base riflette la nostra ricerca continua di prestazioni ottimali, facilità di sviluppo e capacità SEO eccezionali.
- **React**: Utilizziamo React per la sua eccellente gestione dello stato e il suo modello basato su componenti, che insieme facilitano lo sviluppo di un'UI reattiva e modulare.
- **MongoDB**: Per la persistenza dei dati, ci affidiamo a MongoDB, una soluzione scalabile che si adatta perfettamente alla natura dinamica delle informazioni gestite.
- **Axios**: Per le chiamate alle API, Axios offre una soluzione promettente e versatile, garantendo richieste asincrone gestibili e pulite.

### Principi Guida

Nel corso dello sviluppo, ho adottato i principi **SOLID** come bussola. Questa aderenza non solo ha guidato la struttura del codice verso la chiarezza e la manutenibilità ma ha anche assicurato che ogni componente adempiesse a una specifica funzione, senza sovraccarichi o complessità inutili.

### CI/CD e Hosting

Il progetto è integrato con GitHub per il versionamento del codice e utilizza Vercel per l'hosting e la gestione del ciclo di continuous integration e deployment. Questa integrazione garantisce che ogni push su GitHub inneschi automaticamente una nuova build e un deployment dell'applicazione, consentendo un flusso di lavoro di sviluppo agile e reattivo.

### Pattern di Design

L'applicazione si avvale di pattern architetturali consolidati - come **Model-View-Controller (MVC)** per organizzare il codice e **Repository Pattern** per l'astrazione dei dati, ottimizzando l'accesso e la gestione delle informazioni. Inoltre l'intero design si è svolto secondo il principio **Mobile-first**

### Variabili d'Ambiente

**`MONGODB_URI`**: La stringa di connessione al database MongoDB.
<br />
**`UNSPLASH_ACCESS_KEY`**: La API key per accedere alle risorse di Unsplash.

## Avvio del progetto

```bash
1. git clone https://github.com/casiimir/assessment-dtd
2. cd assessment-dtd
3. npm install
4. npm run dev
```
