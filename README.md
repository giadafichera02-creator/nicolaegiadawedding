# The Wedding Book V2 — Nicola ♡ Giada

## Novità
- busta e carta più realistiche;
- fotografie demo visibili online;
- pagina location con logo provvisorio;
- modulo RSVP;
- campi per accompagnatori, allergie, intolleranze ed esigenze alimentari;
- effetto sfoglio più profondo.

## Ricevere davvero gli RSVP
Apri `config.js` e sostituisci:

`INSERISCI_LA_TUA_EMAIL`

con l'indirizzo email su cui vuoi ricevere le risposte.

Il modulo usa FormSubmit. Al primo invio riceverai un messaggio di attivazione da confermare.

## Inserire le vostre foto
Crea una cartella `assets/foto` e inserisci le immagini, per esempio:

- `prima-foto.jpg`
- `primo-incontro.jpg`
- `proposta.jpg`

Poi in `index.html` sostituisci gli indirizzi Unsplash con:

`assets/foto/prima-foto.jpg`

## Modificare la location
Nel file `config.js` cambia:
- `venueName`
- `venueAddress`
- `mapUrl`
- `weddingDate`

Sostituisci `assets/villa-logo.svg` con il logo reale quando avrete scelto la location.
