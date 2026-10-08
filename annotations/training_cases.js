window.TRAINING_CASES = [
  {
    "id": "TRAIN-01",
    "title": "Horaires de bibliothèque",
    "case_type": "claim",
    "claim": {
      "fr": "La bibliothèque municipale ferme à 18 h le samedi.",
      "en": "The municipal library closes at 6 p.m. on Saturdays."
    },
    "evidence": [
      {
        "id": "A",
        "source_title": {
          "fr": "Horaires actuels de la bibliothèque",
          "en": "Current library hours"
        },
        "source_type": {
          "fr": "Site officiel",
          "en": "Official website"
        },
        "text": {
          "fr": "Le samedi, la bibliothèque accueille le public de 9 h à 18 h.",
          "en": "On Saturdays, the library is open to the public from 9 a.m. to 6 p.m."
        }
      },
      {
        "id": "B",
        "source_title": {
          "fr": "Sortir en ville",
          "en": "Going out in town"
        },
        "source_type": {
          "fr": "Blog local",
          "en": "Local blog"
        },
        "text": {
          "fr": "La bibliothèque est ouverte le week-end.",
          "en": "The library is open on weekends."
        }
      },
      {
        "id": "C",
        "source_title": {
          "fr": "Horaires 2023",
          "en": "2023 hours"
        },
        "source_type": {
          "fr": "Ancienne affiche",
          "en": "Old notice"
        },
        "text": {
          "fr": "Samedi : 9 h – 17 h.",
          "en": "Saturday: 9 a.m.–5 p.m."
        }
      }
    ],
    "answer": {
      "verdict": "SUPPORT",
      "relevant": [
        "A",
        "C"
      ],
      "warrants": [
        [
          "A"
        ]
      ],
      "contradictions": [
        "C"
      ],
      "dependencies": [],
      "action": "CERTIFY",
      "explanation_fr": "A suffit à lui seul : c’est la source officielle actuelle et elle donne exactement l’heure de fermeture. B est trop vague pour établir 18 h. C va dans le sens contraire, mais il s’agit explicitement d’anciens horaires. Il ne faut pas inventer de dépendance entre les sources."
    }
  },
  {
    "id": "TRAIN-02",
    "title": "Corrélation et causalité",
    "case_type": "claim",
    "claim": {
      "fr": "Boire deux tasses de café par jour réduit directement le risque de dépression.",
      "en": "Drinking two cups of coffee a day directly reduces the risk of depression."
    },
    "evidence": [
      {
        "id": "A",
        "source_title": {
          "fr": "Étude observationnelle sur 8 000 adultes",
          "en": "Observational study of 8,000 adults"
        },
        "source_type": {
          "fr": "Article scientifique",
          "en": "Scientific paper"
        },
        "text": {
          "fr": "Les personnes déclarant boire environ deux tasses de café par jour présentaient moins de symptômes dépressifs. L’étude ne permet pas d’établir un lien de causalité.",
          "en": "People reporting about two cups of coffee per day had fewer depressive symptoms. The study cannot establish causality."
        }
      },
      {
        "id": "B",
        "source_title": {
          "fr": "Commentaire éditorial",
          "en": "Editorial commentary"
        },
        "source_type": {
          "fr": "Éditorial",
          "en": "Editorial"
        },
        "text": {
          "fr": "De nombreux facteurs de mode de vie pourraient expliquer cette association.",
          "en": "Many lifestyle factors could explain this association."
        }
      }
    ],
    "answer": {
      "verdict": "INSUFFICIENT",
      "relevant": [
        "A",
        "B"
      ],
      "warrants": [],
      "contradictions": [],
      "dependencies": [],
      "action": "SEARCH_MORE",
      "explanation_fr": "Les textes décrivent une association, pas un effet causal démontré. L’affirmation emploie « réduit directement », ce qui est plus fort que les preuves disponibles. Il faut donc chercher davantage plutôt que certifier."
    }
  },
  {
    "id": "TRAIN-03",
    "title": "Sources dépendantes",
    "case_type": "claim",
    "claim": {
      "fr": "Le traitement X réduit la durée moyenne des symptômes.",
      "en": "Treatment X reduces the average duration of symptoms."
    },
    "evidence": [
      {
        "id": "A",
        "source_title": {
          "fr": "Essai clinique Alpha",
          "en": "Alpha clinical trial"
        },
        "source_type": {
          "fr": "Étude originale",
          "en": "Original study"
        },
        "text": {
          "fr": "Dans l’essai randomisé Alpha, le traitement X a réduit la durée moyenne des symptômes de 2,1 jours par rapport au placebo.",
          "en": "In the randomized Alpha trial, treatment X reduced mean symptom duration by 2.1 days compared with placebo."
        }
      },
      {
        "id": "B",
        "source_title": {
          "fr": "Revue du mois",
          "en": "Monthly review"
        },
        "source_type": {
          "fr": "Article de synthèse",
          "en": "Review article"
        },
        "text": {
          "fr": "Cette revue présente l’essai Alpha comme l’étude récente de référence sur le traitement X. Elle ne rapporte pas de nouvelles données.",
          "en": "This review presents the Alpha trial as the key recent study of treatment X. It reports no new data."
        }
      },
      {
        "id": "C",
        "source_title": {
          "fr": "Essai clinique Bêta",
          "en": "Beta clinical trial"
        },
        "source_type": {
          "fr": "Étude originale indépendante",
          "en": "Independent original study"
        },
        "text": {
          "fr": "Dans un second essai randomisé mené dans un autre centre, le traitement X a réduit la durée moyenne des symptômes de 1,8 jour.",
          "en": "In a second randomized trial at another centre, treatment X reduced mean symptom duration by 1.8 days."
        }
      }
    ],
    "answer": {
      "verdict": "SUPPORT",
      "relevant": [
        "A",
        "B",
        "C"
      ],
      "warrants": [
        [
          "A"
        ],
        [
          "C"
        ]
      ],
      "contradictions": [],
      "dependencies": [
        {
          "a": "A",
          "b": "B"
        }
      ],
      "action": "CERTIFY",
      "explanation_fr": "A et C apportent chacun un résultat direct et peuvent chacun suffire. B est pertinent pour comprendre le dossier mais n’apporte pas de nouvelles données ; il dépend explicitement de l’essai Alpha. Le fait que deux sources soient d’accord ne suffit jamais, à lui seul, à dire qu’elles sont dépendantes : ici, la dépendance est écrite noir sur blanc."
    }
  },
  {
    "id": "TRAIN-04",
    "title": "Deux extraits nécessaires ensemble",
    "case_type": "claim",
    "claim": {
      "fr": "La nouvelle agence de l’entreprise a ouvert à Douala en 2020.",
      "en": "The company’s new branch opened in Douala in 2020."
    },
    "evidence": [
      {
        "id": "A",
        "source_title": {
          "fr": "Rapport annuel 2020",
          "en": "2020 annual report"
        },
        "source_type": {
          "fr": "Rapport de l’entreprise",
          "en": "Company report"
        },
        "text": {
          "fr": "La nouvelle agence a ouvert ses portes en septembre 2020.",
          "en": "The new branch opened in September 2020."
        }
      },
      {
        "id": "B",
        "source_title": {
          "fr": "Annuaire des implantations",
          "en": "Office directory"
        },
        "source_type": {
          "fr": "Page institutionnelle",
          "en": "Corporate page"
        },
        "text": {
          "fr": "L’agence de Douala est la plus récente implantation de l’entreprise.",
          "en": "The Douala branch is the company’s newest location."
        }
      },
      {
        "id": "C",
        "source_title": {
          "fr": "Archive 2019",
          "en": "2019 archive"
        },
        "source_type": {
          "fr": "Communiqué",
          "en": "Press release"
        },
        "text": {
          "fr": "L’agence de Yaoundé a été inaugurée en 2019.",
          "en": "The Yaoundé branch was inaugurated in 2019."
        }
      }
    ],
    "answer": {
      "verdict": "SUPPORT",
      "relevant": [
        "A",
        "B"
      ],
      "warrants": [
        [
          "A",
          "B"
        ]
      ],
      "contradictions": [],
      "dependencies": [],
      "action": "CERTIFY",
      "explanation_fr": "A donne l’année mais pas la ville. B donne la ville et identifie cette agence comme la nouvelle implantation, mais pas l’année. A et B sont donc nécessaires ensemble. C concerne une autre agence et n’aide pas à justifier l’affirmation."
    }
  },
  {
    "id": "TRAIN-05",
    "title": "Quand un résumé scientifique ne répond pas à la question",
    "case_type": "claim",
    "claim": {
      "fr": "La protéine C-réactive (CRP) ne permet pas de prédire la mortalité après un pontage coronarien.",
      "en": "C-reactive protein (CRP) does not predict mortality after coronary artery bypass surgery."
    },
    "evidence": [
      {
        "id": "A",
        "source_title": {
          "fr": "Biomarqueurs et priorisation avant chirurgie",
          "en": "Biomarkers and prioritisation before surgery"
        },
        "source_type": {
          "fr": "Article scientifique (résumé)",
          "en": "Scientific article (abstract)"
        },
        "text": {
          "fr": "L’étude compare le rapport coût-efficacité de stratégies de priorisation utilisant la CRP, le débit de filtration glomérulaire estimé, ou les deux. Elle conclut que les stratégies fondées sur la CRP sont peu susceptibles d’être coût-efficaces. Le résumé ne dit pas si la CRP prédit ou non la mortalité postopératoire.",
          "en": "The study compares the cost-effectiveness of prioritisation strategies using CRP, estimated glomerular filtration rate, or both. It concludes that CRP-based strategies are unlikely to be cost-effective. The abstract does not state whether CRP predicts postoperative mortality."
        }
      }
    ],
    "answer": {
      "verdict": "INSUFFICIENT",
      "relevant": [
        "A"
      ],
      "warrants": [],
      "contradictions": [],
      "dependencies": [],
      "action": "SEARCH_MORE",
      "explanation_fr": "Le résumé parle bien de la CRP et du pontage coronarien, mais il répond à une question de coût-efficacité, pas à l’affirmation précise sur la mortalité postopératoire. Un texte peut donc être très proche du sujet sans suffire à justifier le claim."
    }
  }
];
