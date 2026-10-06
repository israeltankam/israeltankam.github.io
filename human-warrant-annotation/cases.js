// Remplace ce tableau par les cas réels à annoter.
// Ne mets jamais les gold labels / supporting facts de référence dans ce fichier public.
window.ANNOTATION_CASES = [
  {
    id: "DEMO-SCI-001",
    domain: "Sciences biomédicales",
    difficulty: "Exemple",
    claim: "Une augmentation de la protéine Z améliore la survie après une lésion cardiaque.",
    evidence: [
      {
        id: "A",
        source_id: "paper-alpha",
        source_title: "Étude Alpha",
        source_type: "Étude animale",
        text: "Chez la souris, la surexpression de Z est associée à une meilleure fonction ventriculaire après lésion cardiaque."
      },
      {
        id: "B",
        source_id: "review-beta",
        source_title: "Revue Beta",
        source_type: "Revue narrative",
        text: "Une revue décrit Z comme prometteuse, en citant principalement l'étude Alpha."
      },
      {
        id: "C",
        source_id: "cohort-gamma",
        source_title: "Cohorte Gamma",
        source_type: "Cohorte humaine",
        text: "Dans une cohorte humaine, les niveaux élevés de Z ne sont pas associés à une amélioration significative de la survie."
      }
    ]
  },
  {
    id: "DEMO-GEN-002",
    domain: "Connaissances générales",
    difficulty: "Exemple",
    claim: "La ville d'Arcadia a accueilli l'université fréquentée par la scientifique N. Dorian.",
    evidence: [
      {
        id: "A",
        source_id: "bio-dorian",
        source_title: "Biographie de N. Dorian",
        source_type: "Biographie",
        text: "N. Dorian a étudié à l'Université Meridian de 1998 à 2002."
      },
      {
        id: "B",
        source_id: "uni-meridian",
        source_title: "Université Meridian",
        source_type: "Fiche institutionnelle",
        text: "L'Université Meridian est située dans la ville d'Arcadia."
      },
      {
        id: "C",
        source_id: "arcadia-tourism",
        source_title: "Guide touristique d'Arcadia",
        source_type: "Guide",
        text: "Arcadia est connue pour son vieux port et ses musées."
      }
    ]
  }
];
