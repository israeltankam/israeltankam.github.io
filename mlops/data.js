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
            title: "Nos Parcours Modulaires",
            // Basé sur [cite: 7, 49, 84, 115, 142]
            modules: [
                { id: 0, title: "Parcours 0: Fondamentaux Data & ML", desc: "Durée: 30–35h. Introduction à la data, Python, premiers modèles et interprétation." },
                { id: 1, title: "Parcours 1: Machine Learning appliqué", desc: "Durée: 40–45h. Cycle de vie ML, feature engineering, validation et métriques." },
                { id: 2, title: "Parcours 2: MLOps Core", desc: "Durée: 45–50h. Pipelines automatisés, versioning (DVC/MLflow), déploiement API/Batch et monitoring." },
                { id: 3, title: "Parcours 3: MLOps Avancé & Production", desc: "Durée: 45–55h. Architectures industrielles, observabilité avancée, gouvernance et optimisation." },
                { id: 4, title: "Parcours 4: Expert / Fast-track", desc: "Durée: 30–40h. Audit MLOps, design stratégique, cas complexes et R&D." }
            ]
        },
        quiz: {
            title: "Quiz d'Orientation MLOps",
            intro: "20 questions pour évaluer votre niveau et définir votre parcours idéal. Difficulté progressive.",
            submit: "Voir mes résultats",
            next: "Suivant",
            levels: ["Profane", "Débutant", "Intermédiaire", "Avancé", "Expert"]
        },
        result: {
            title: "Votre Profil MLOps",
            score: "Votre score : ",
            recommendation: "Parcours Recommandé : ",
            cta_apply: "Demander mon inscription à ce parcours",
            form_title: "Finaliser l'inscription",
            form_desc: "Envoyez votre résultat et votre motivation directement à Israel Tankam."
        }
    },
    en: {
        home: {
            title: "Master MLOps",
            subtitle: "From experimentation to industrial production.",
            desc: "A certified, modular training adapted to your industry. Discover your level and the ideal path.",
            cta: "Take the Placement Quiz"
        },
        curriculum: {
            title: "Our Modular Paths",
            // Traduction basée sur [cite: 7, 49, 84, 115, 142]
            modules: [
                { id: 0, title: "Path 0: Data & ML Fundamentals", desc: "Duration: 30–35h. Intro to data, Python, first models, and interpretation." },
                { id: 1, title: "Path 1: Applied Machine Learning", desc: "Duration: 40–45h. ML lifecycle, feature engineering, validation, and metrics." },
                { id: 2, title: "Path 2: MLOps Core", desc: "Duration: 45–50h. Automated pipelines, versioning (DVC/MLflow), API/Batch deployment, and monitoring." },
                { id: 3, title: "Path 3: Advanced MLOps & Production", desc: "Duration: 45–55h. Industrial architectures, advanced observability, governance, and optimization." },
                { id: 4, title: "Path 4: Expert / Fast-track", desc: "Duration: 30–40h. MLOps audit, strategic design, complex cases, and R&D." }
            ]
        },
        quiz: {
            title: "MLOps Placement Quiz",
            intro: "20 questions to assess your level and define your ideal path. Progressive difficulty.",
            submit: "See Results",
            next: "Next",
            levels: ["Layman", "Beginner", "Intermediate", "Advanced", "Expert"]
        },
        result: {
            title: "Your MLOps Profile",
            score: "Your score: ",
            recommendation: "Recommended Path: ",
            cta_apply: "Apply for this path",
            form_title: "Finalize Enrollment",
            form_desc: "Send your results and motivation directly to Israel Tankam."
        }
    }
};

/* QUESTIONS DU QUIZ
   Sources: [cite: 251-290] pour les questions/options.
   Sources: [cite: 292-304] pour le corrigé.
   Barème: [cite: 242]
*/
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
