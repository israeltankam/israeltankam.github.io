/* data.js */

const DATA = {
    fr: {
        home: {
            title: "Maîtrisez le MLOps",
            subtitle: "De l'expérimentation à la production industrielle.",
            desc: "Une formation certifiante, modulaire et adaptée à votre métier. Découvrez votre niveau et le parcours idéal.",
            cta: "Passer le Quiz d'orientation"
        },
        curriculum: {
            title: "Le Cursus MLOps Complet",
            intro: "Une approche progressive, du code Python simple aux architectures distribuées complexes. Chaque parcours repose sur un projet 'Fil Rouge' métier.",
            common_project: "📌 Projet Fil Rouge : Chaque apprenant applique les concepts sur son propre cas d'usage (Finance, Santé, Industrie, etc.) tout au long de la formation.",
            modules: [
                { 
                    id: 0, 
                    title: "Parcours 0 : Fondamentaux Data & ML", 
                    duration: "30-35h",
                    level: "Profane / Débutant",
                    desc: "Le socle indispensable. Comprenez la donnée, manipulez Python et créez vos premiers modèles simples.",
                    tools: ["Python", "Pandas", "Jupyter", "Excel/CSV"],
                    skills: ["Nettoyage de données", "Analyse exploratoire", "Premiers modèles ML"],
                    details: [
                        "Module 0.1 : Introduction Data & ML (CM/TD)",
                        "Module 0.2 : Python pour la data (TP intensif)",
                        "Module 0.3 : Préparation et Qualité des données",
                        "Module 0.4 : Premiers modèles (Régression/Classification)",
                        "Module 0.5 : Interprétation des résultats pour le métier"
                    ]
                },
                { 
                    id: 1, 
                    title: "Parcours 1 : Machine Learning Appliqué", 
                    duration: "40-45h",
                    level: "Débutant confirmé",
                    desc: "Professionnalisez votre approche. Passez du 'bricolage' à une méthodologie rigoureuse de Feature Engineering et de validation.",
                    tools: ["Scikit-learn", "Matplotlib", "Git (bases)"],
                    skills: ["Feature Engineering", "Cross-Validation", "Métriques métier", "Structuration de code"],
                    details: [
                        "Module 1.1 : Cycle de vie ML & Cadrage métier",
                        "Module 1.2 : Feature Engineering avancé",
                        "Module 1.3 : Validation rigoureuse & Overfitting",
                        "Module 1.4 : Structuration de projet (Clean Code)",
                        "Module 1.5 : Introduction aux limites du ML expérimental"
                    ]
                },
                { 
                    id: 2, 
                    title: "Parcours 2 : MLOps Core", 
                    duration: "45-50h",
                    level: "Intermédiaire",
                    desc: "Le cœur du métier MLOps. Automatisez, versionnez et déployez. C'est ici que l'industrialisation commence.",
                    tools: ["MLflow", "DVC", "Docker", "FastAPI", "GitLab/GitHub"],
                    skills: ["Pipelines automatisés", "Versioning Data/Modèle", "Déploiement API", "Monitoring de base"],
                    details: [
                        "Module 2.1 : Pipelines ML automatisés",
                        "Module 2.2 : Versioning total (Code + Data + Modèle)",
                        "Module 2.3 : Déploiement (API vs Batch)",
                        "Module 2.4 : Monitoring & Drift (Introduction)",
                        "Module 2.5 : CI/CD appliqué au Machine Learning"
                    ]
                },
                { 
                    id: 3, 
                    title: "Parcours 3 : MLOps Avancé & Production", 
                    duration: "45-55h",
                    level: "Avancé",
                    desc: "Gérez la complexité à l'échelle. Observabilité, gouvernance et architectures robustes pour les systèmes critiques.",
                    tools: ["Airflow/Prefect", "Evidently AI", "Prometheus", "Grafana", "Kubernetes (concepts)"],
                    skills: ["Observabilité avancée", "Gouvernance & Risques", "Optimisation latence/coût", "Architectures complexes"],
                    details: [
                        "Module 3.1 : Architectures MLOps industrielles",
                        "Module 3.2 : Observabilité avancée & Alerting",
                        "Module 3.3 : Gouvernance, Conformité (IA Act) & Risques",
                        "Module 3.4 : Optimisation (Coûts, Latence)",
                        "Module 3.5 : Produit ML et adoption utilisateur"
                    ]
                },
                { 
                    id: 4, 
                    title: "Parcours 4 : Expert / Fast-track", 
                    duration: "30-40h",
                    level: "Expert",
                    desc: "Pour les leads et architectes. Audit de systèmes existants, stratégie long terme et R&D.",
                    tools: ["Feature Stores", "Outils d'audit", "Architecture Cloud"],
                    skills: ["Audit MLOps", "Stratégie IA", "Design System", "Mentoring"],
                    details: [
                        "Module 4.1 : Audit de maturité MLOps",
                        "Module 4.2 : Design stratégique & Roadmap",
                        "Module 4.3 : Cas complexes & R&D",
                        "Module 4.4 : Projet ouvert & Soutenance finale"
                    ]
                }
            ]
        },
        // ... (Garder la section QUIZ et RESULT telle quelle ou mettre à jour l'anglais de la même façon) ...
        quiz: DATA?.fr?.quiz || { /* Copier l'ancien objet quiz ici si besoin, sinon je peux le réécrire */ },
        result: DATA?.fr?.result || { /* Idem */ }
    },
    en: {
        // ... Il faudrait traduire la structure ci-dessus en Anglais pour être cohérent ...
        // Je mets un placeholder pour l'instant pour ne pas surcharger la réponse
        home: DATA?.en?.home,
        curriculum: {
            title: "The Complete MLOps Curriculum",
            intro: "A progressive approach, from simple Python code to complex distributed architectures.",
            common_project: "📌 Red Thread Project: Each learner applies concepts to their own business case.",
            modules: [
                {
                    id: 0, title: "Path 0: Fundamentals", duration: "30-35h", level: "Beginner",
                    desc: "The essential foundation. Understand data, handle Python, and create your first models.",
                    tools: ["Python", "Pandas", "Jupyter"], skills: ["Data Cleaning", "EDA", "First Models"],
                    details: ["Module 0.1: Intro", "Module 0.2: Python", "Module 0.3: Data Prep", "Module 0.4: First Models", "Module 0.5: Interpretation"]
                },
                // ... (Remplir les autres parcours en EN de la même logique)
                 { id: 1, title: "Path 1: Applied ML", duration: "40h", desc: "Professionalize your approach.", tools:["Scikit-learn"], skills:[], details:[] },
                 { id: 2, title: "Path 2: MLOps Core", duration: "45h", desc: "The core. CI/CD, Docker, MLflow.", tools:["MLflow", "Docker"], skills:[], details:[] },
                 { id: 3, title: "Path 3: Advanced", duration: "50h", desc: "Scale, Monitoring, Governance.", tools:["Airflow", "Grafana"], skills:[], details:[] },
                 { id: 4, title: "Path 4: Expert", duration: "30h", desc: "Audit and Strategy.", tools:["Audit"], skills:[], details:[] }
            ]
        },
        quiz: DATA?.en?.quiz,
        result: DATA?.en?.result
    }
};
const QUIZ_QUESTIONS = [
    // --- NIVEAU PROFANE (1 pt) ---
    {
        id: 1, level: 0, points: 1, 
        text: "À quoi sert un modèle de Machine Learning ?",
        options: [
            { text: "Prendre des décisions à partir de données", correct: true }, // [cite: 295]
            { text: "Stocker des données dans une base", correct: false },
            { text: "Apprendre des relations à partir d’exemples", correct: true }, // [cite: 295]
            { text: "Remplacer complètement un humain", correct: false }
        ]
    },
    {
        id: 2, level: 0, points: 1, 
        text: "Qu’est-ce qu’un jeu de données ?",
        options: [
            { text: "Un ensemble d’exemples", correct: true }, // [cite: 295]
            { text: "Un logiciel de calcul", correct: false },
            { text: "Une collection de données structurées", correct: true }, // [cite: 295]
            { text: "Un algorithme", correct: false }
        ]
    },

    // --- NIVEAU DÉBUTANT (2 pts) ---
    {
        id: 3, level: 1, points: 2, 
        text: "Quelles tâches relèvent du Machine Learning ?",
        options: [
            { text: "Classification", correct: true }, // [cite: 297]
            { text: "Régression", correct: true }, // [cite: 297]
            { text: "Compression de fichiers", correct: false },
            { text: "Clustering", correct: true } // [cite: 297]
        ]
    },
    {
        id: 4, level: 1, points: 2, 
        text: "Pourquoi séparer les données en train et test ?",
        options: [
            { text: "Évaluer la performance réelle", correct: true }, // [cite: 297]
            { text: "Accélérer l’entraînement", correct: false },
            { text: "Éviter le surapprentissage", correct: true }, // [cite: 297]
            { text: "Réduire la taille des données", correct: false }
        ]
    },
    {
        id: 5, level: 1, points: 2, 
        text: "Quelles bibliothèques Python sont couramment utilisées en ML ?",
        options: [
            { text: "NumPy", correct: true }, // [cite: 297]
            { text: "Pandas", correct: true }, // [cite: 297]
            { text: "Scikit-learn", correct: true }, // [cite: 297]
            { text: "Selenium", correct: false }
        ]
    },
    {
        id: 6, level: 1, points: 2, 
        text: "Qu’est-ce qu’une feature ?",
        options: [
            { text: "Une variable d’entrée du modèle", correct: true }, // [cite: 297]
            { text: "Une sortie du modèle", correct: false },
            { text: "Une caractéristique mesurable", correct: true }, // [cite: 297]
            { text: "Un hyperparamètre", correct: false }
        ]
    },
    {
        id: 7, level: 1, points: 2, 
        text: "Qu’est-ce que l’accuracy ?",
        options: [
            { text: "Une métrique de classification", correct: true }, // [cite: 297]
            { text: "Le taux de bonnes prédictions", correct: true }, // [cite: 297]
            { text: "Toujours adaptée aux données déséquilibrées", correct: false },
            { text: "Une fonction de perte", correct: false }
        ]
    },
    {
        id: 8, level: 1, points: 2, 
        text: "Quelles sont des étapes classiques d’un projet ML ?",
        options: [
            { text: "Collecte des données", correct: true }, // [cite: 297]
            { text: "Entraînement du modèle", correct: true }, // [cite: 297]
            { text: "Déploiement", correct: true }, // [cite: 297]
            { text: "Design graphique", correct: false }
        ]
    },
    {
        id: 9, level: 1, points: 2, 
        text: "Qu’est-ce qu’un notebook Jupyter est souvent utilisé pour ?",
        options: [
            { text: "Explorer les données", correct: true }, // [cite: 298]
            { text: "Tester des modèles", correct: true }, // [cite: 298]
            { text: "Déployer en production", correct: false },
            { text: "Documenter des analyses", correct: true } // [cite: 298]
        ]
    },
    {
        id: 10, level: 1, points: 2, 
        text: "Qu’est-ce qu’un hyperparamètre ?",
        options: [
            { text: "Paramètre fixé avant l’entraînement", correct: true }, // [cite: 298]
            { text: "Paramètre appris automatiquement", correct: false },
            { text: "Élément influençant la performance", correct: true }, // [cite: 298]
            { text: "Valeur issue des données", correct: false }
        ]
    },

    // --- NIVEAU INTERMÉDIAIRE (3 pts) ---
    {
        id: 11, level: 2, points: 3, 
        text: "Quelles situations peuvent provoquer du data leakage ?",
        options: [
            { text: "Utiliser des données futures", correct: true }, // [cite: 300]
            { text: "Normaliser avant la séparation train/test", correct: true }, // [cite: 300]
            { text: "Ajouter trop de features", correct: false },
            { text: "Mauvais découpage temporel", correct: true } // [cite: 300]
        ]
    },
    {
        id: 12, level: 2, points: 3, 
        text: "Quelles techniques permettent de réduire l’overfitting ?",
        options: [
            { text: "Régularisation", correct: true }, // [cite: 300]
            { text: "Cross-validation", correct: true }, // [cite: 300]
            { text: "Dropout", correct: true }, // [cite: 300]
            { text: "Augmenter indéfiniment la complexité", correct: false }
        ]
    },
    {
        id: 13, level: 2, points: 3, 
        text: "Quelles métriques sont pertinentes pour un problème de classification déséquilibrée ?",
        options: [
            { text: "Precision", correct: true }, // [cite: 300]
            { text: "Recall", correct: true }, // [cite: 300]
            { text: "Accuracy", correct: false },
            { text: "F1-score", correct: true } // [cite: 300]
        ]
    },
    {
        id: 14, level: 2, points: 3, 
        text: "En MLOps, que permet le versioning des modèles ?",
        options: [
            { text: "Comparer des performances", correct: true }, // [cite: 300]
            { text: "Revenir à une version antérieure", correct: true }, // [cite: 300]
            { text: "Réduire le temps d’inférence", correct: false },
            { text: "Assurer la traçabilité", correct: true } // [cite: 300]
        ]
    },
    {
        id: 15, level: 2, points: 3, 
        text: "Quelles affirmations sur le pipeline ML sont vraies ?",
        options: [
            { text: "Il automatise les étapes du cycle ML", correct: true }, // [cite: 300]
            { text: "Il réduit les erreurs humaines", correct: true }, // [cite: 300]
            { text: "Il remplace le data scientist", correct: false },
            { text: "Il facilite la reproductibilité", correct: true } // [cite: 300]
        ]
    },

    // --- NIVEAU AVANCÉ (4 pts) ---
    {
        id: 16, level: 3, points: 4, 
        text: "Quelles sont des sources de data drift en production ?",
        options: [
            { text: "Changement de comportement utilisateur", correct: true }, // [cite: 302]
            { text: "Saison ou climat", correct: true }, // [cite: 302]
            { text: "Mauvaise initialisation des poids", correct: false },
            { text: "Évolution du contexte métier", correct: true } // [cite: 302]
        ]
    },
    {
        id: 17, level: 3, points: 4, 
        text: "Quelles pratiques relèvent du MLOps mature ?",
        options: [
            { text: "CI/CD pour modèles", correct: true }, // [cite: 302]
            { text: "Monitoring des données et performances", correct: true }, // [cite: 302]
            { text: "Déploiement manuel ponctuel", correct: false },
            { text: "Tests automatisés", correct: true } // [cite: 302]
        ]
    },
    {
        id: 18, level: 3, points: 4, 
        text: "Pourquoi le monitoring des features est-il crucial ?",
        options: [
            { text: "Détecter des changements de distribution", correct: true }, // [cite: 302]
            { text: "Améliorer automatiquement la précision", correct: false },
            { text: "Anticiper une dégradation du modèle", correct: true }, // [cite: 302]
            { text: "Garantir la conformité métier", correct: true } // [cite: 302]
        ]
    },
    {
        id: 19, level: 3, points: 4, 
        text: "Quelles contraintes non techniques influencent un système ML en production ?",
        options: [
            { text: "Réglementation (RGPD, IA Act)", correct: true }, // [cite: 302]
            { text: "Acceptabilité utilisateur", correct: true }, // [cite: 302]
            { text: "Coûts d’infrastructure", correct: true }, // [cite: 302]
            { text: "Choix de l’algorithme", correct: false }
        ]
    },

    // --- NIVEAU EXPERT (6 pts) ---
    {
        id: 20, level: 4, points: 6, 
        text: "Un modèle montre de bonnes métriques globales mais provoque des décisions métier erronées. Quelles causes sont plausibles ?",
        options: [
            { text: "Mauvais alignement entre métrique et objectif métier", correct: true }, // [cite: 304]
            { text: "Concept drift non détecté", correct: true }, // [cite: 304]
            { text: "Biais dans les données d’entraînement", correct: true }, // [cite: 304]
            { text: "Trop peu d’epochs d’entraînement", correct: false }
        ]
    }
];
