/* =========================================================
   SUPERBAD — events.js
   Όλα τα στοιχεία του site αλλάζουν ΜΟΝΟ από εδώ.

   NEXT_EVENT  → το επόμενο πάρτυ (αφίσα στην πρώτη οθόνη + εισιτήριο).
   PAST_EVENTS → τα προηγούμενα πάρτυ, με αφίσα και φωτογραφίες.

   ΑΦΙΣΑ: βάλε το αρχείο στο posters/ και γράψε το όνομα στο poster,
          π.χ. poster: "posters/superbad-oct.jpg". Άδειο = προσωρινή κάρτα.
   ΦΩΤΟΓΡΑΦΙΕΣ: photos/<folder>/01.jpg, 02.jpg, ... και photoCount = πόσες.
   ========================================================= */

// Τα social του πάρτυ (μόνο το username, χωρίς @)
const SOCIALS = {
  instagram: "superbadparty",
  tiktok:    "superbadparty",
};

const NEXT_EVENT = {
  name:     "SUPERBAD",
  tagline:  "Η αφίσα βγαίνει τις επόμενες μέρες",
  poster:   "",                                   // π.χ. "posters/superbad-oct.jpg"
  date:     "Σάββατο 17 Οκτωβρίου",
  iso:      "2026-10-17T23:00:00+03:00",           // για την αντίστροφη μέτρηση
  time:     "23:00",
  venue:    "Dunk Bar",
  venueUrl: "https://maps.app.goo.gl/1PA3sMuLdSoFbnFW6",
  address:  "Πανόρμου & Αλέξη Παύλη 13Β",
  onDeck:   ["Tiz", "Frunk"],
  sponsor:  "Moloko",
};

const PAST_EVENTS = [
  {
    folder:     "second-party",
    slug:       "second-party",
    label:      "Second Party",
    name:       "PARA PERA — Second Party",
    date:       "11 July 2026",
    time:       "23:00",
    venue:      "Dunk Bar",
    venueUrl:   "https://maps.app.goo.gl/1PA3sMuLdSoFbnFW6",
    address:    "Πανόρμου & Αλέξη Παύλη 13Β",
    lineup:     "Spaz · Frunk · Staz",
    sponsor:    "Moloko",
    poster:     "posters/poster-july.jpg",
    photoCount: 9,
    photoExt:   "jpg",
  },
  {
    folder:     "first-party",
    slug:       "first-party",
    label:      "First Party",
    name:       "PARA PERA — First Party",
    date:       "18 April 2026",
    time:       "22:00",
    lineup:     "Tiz × Spaz",
    guest:      "Frunk",
    sponsor:    "Moloko",
    poster:     "posters/poster-april.jpg",
    photoCount: 12,
    photoExt:   "jpg",
  },
];

/**
 * Επιστρέφει τα URLs των φωτογραφιών ενός event.
 * Υποστηρίζει είτε αυτόματη αρίθμηση (01.jpg / 01.jpeg)
 * είτε συγκεκριμένη λίστα αρχείων στο event.photos.
 */
function getPhotoUrls(event) {
  if (!event) return [];

  if (Array.isArray(event.photos) && event.photos.length > 0) {
    return event.photos.map(p => {
      if (p.startsWith('photos/') || p.startsWith('http')) return p;
      return `photos/${event.folder}/${p}`;
    });
  }

  const urls = [];
  const count = event.photoCount || 0;
  const ext = (event.photoExt || "jpg").replace(/^\./, '').trim();

  for (let i = 1; i <= count; i++) {
    const num = String(i).padStart(2, "0");
    urls.push(`photos/${event.folder}/${num}.${ext}`);
  }
  return urls;
}

function getEventBySlug(slug) {
  return PAST_EVENTS.find(e => e.slug === slug);
}
