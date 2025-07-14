class Service {
  constructor(id, name, description, duration) {
    this.id = id; // Identificativo univoco del servizio
    this.name = name; // Nome del servizio
    this.description = description; // Descrizione del servizio
    this.duration = duration; // Durata del servizio in minuti (obbligatoria)
  }
}

const servicesData = [
  {
    id: 1,
    name: "Taglio Donna",
    services: [
      new Service("Servizio 1.1", "Taglio Donna Art Director", "", 30),
      new Service("Servizio 1.2", "Taglio Donna Collaboratore", "", 30),
      new Service("Servizio 1.3", "Taglio Frangia", "", 15),
    ],
  },
  {
    id: 2,
    name: "Colore",
    services: [
      new Service(
        "Servizio 2.1",
        "Colore",
        "Servizio di colorazione per capelli",
        15
      ),
      new Service(
        "Servizio 2.2",
        "Color Matching",
        "Colorazione alla base abbinata alla tonalizzazione delle lunghezze, per un risultato naturale ed extra luminoso.",
        15
      ),
      new Service("Servizio 2.3", "Gloss", "", 15),
      new Service("Servizio 2.4", "Gloss e Tonalizzanti", "", 15),
    ],
  },
  {
    id: 3,
    name: "Colpi Di Sole",
    services: [new Service("Servizio 3.1", "Balayage", "", 45)],
  },
  {
    id: 4,
    name: "Piega",
    services: [
      new Service(
        "Servizio 4.1",
        "Piega",
        "Servizio di piega e styling finale.",
        45
      ),
      new Service(
        "Servizio 4.2",
        "Piega Waves",
        "Servizio di piega e styling finale.",
        45
      ),
    ],
  },
  {
    id: 5,
    name: "Acconciatura",
    services: [
      new Service(
        "Servizio 5.1",
        "Acconciatura",
        "Acconciatura per eventi speciali e celebrazioni.",
        45
      ),
      new Service("Servizio 5.2", "Acconciatura Sposa", "", 135),
    ],
  },
  {
    id: 6,
    name: "Trattamenti Per Cute e Capello",
    services: [
      new Service(
        "Servizio 6.1",
        "Laminazione Capelli",
        "La laminazione capelli è un servizio per la bellezza e per la cura di ogni tipologia di capello, in grado di apportare estrema luminosità e riflessi alla chioma. Questo procedimento avviene grazie all'applicazione di una mistura di oli, gelatina e cheratina che, a seguito del tempo di posa sotto fonte di calore, si legano al capello sigillandone le cuticole esterne: le proteine, bloccate al suo interno, svolgono un'azione riparatrice su radici e fusto; la pellicola esterna appena fissata conferisce alla chioma un aspetto glossy e dai riflessi multisfaccettati.",
        "",
        30
      ),
      new Service(
        "Servizio 6.2",
        "Kerastase Tattamento Premier",
        "Trattamento Ristrutturante Decalcificante, capelli più sani fino al 90% in una sola seduta.",
        "",
        30
      ),
    ],
  },
  {
    id: 7,
    name: "Taglio Bambini e Bambine",
    services: [
      new Service("Servizio 7.1", "Taglio bambina", "Taglio e piega bimba", 45),
      new Service(
        "Servizio 7.2",
        "Taglio Bimbo",
        "Taglio bimbo è un servizio stilistico dedicato ai capelli dei clienti più giovani. Seguendone le richieste, i trend della moda e la fisionomia, viene effettuato il taglio più adatto a donare nuova forma e lunghezza ai capelli dei bambini.",
        30
      ),
    ],
  },
  {
    id: 8,
    name: "Taglio Uomo",
    services: [
      new Service("Servizio 8.1", "Taglio Uomo", "", 30),
      new Service("Servizio 8.2", "Taglio Uomo Art Director", "", 30),
    ],
  },
  {
    id: 9,
    name: "Stiratura Capelli",
    services: [
      new Service("Servizio 9.1", "Stiratura alla Cheratina", "", 165),
    ],
  },
  {
    id: 10,
    name: "Permanente",
    services: [new Service("Servizio 10.1", "Ondulazione", "", 30)],
  },
  {
    id: 11,
    name: "Extension Capelli",
    services: [new Service("Servizio 11.1", "Extension Capelli", "", 150)],
  },
];

export default servicesData;
