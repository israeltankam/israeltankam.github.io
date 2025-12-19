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
            modules: [
                { id: 0, title: "Parcours 0: Fondamentaux", desc: "Bases Data & Python (30-35h)" },
                { id: 1, title: "Parcours 1: ML Appliqué", desc: "Cycle de vie & Feature Engineering (40-45h)" },
                { id: 2, title: "Parcours 2: MLOps Core", desc: "Pipelines, Versioning, Déploiement (45-50h)" },
                { id: 3, title: "Parcours 3: Avancé & Prod", desc: "Observabilité, Gouvernance, Scale (45-55h)" },
                { id: 4, title: "Parcours 4: Expert", desc: "Audit & Architecture (30-40h)" }
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
            modules: [
                { id: 0, title: "Path 0: Fundamentals", desc: "Data Basics & Python (30-35h)" },
                { id: 1, title: "Path 1: Applied ML", desc: "Lifecycle & Feature Engineering (40-45h)" },
                { id: 2, title: "Path 2: MLOps Core", desc: "Pipelines, Versioning, Deployment (45-50h)" },
                { id: 3, title: "Path 3: Advanced & Prod", desc: "Observability, Governance, Scale (45-55h)" },
                { id: 4, title: "Path 4: Expert", desc: "Audit & Architecture (30-40h)" }
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

// Questions basées sur quiz.docx
// Format: { id, level (0-4), points, text, options: [{text, correct: bool}] }
const QUIZ_QUESTIONS = [
    // PROFANE (Level 0) - 2 Questions
    {
        id: 1, level: 0, points: 1, text: "À quoi sert un modèle de Machine Learning ?",
        options: [
            { text: "Prendre des décisions à partir de données", correct: true },
            { text: "Stocker des données dans une base", correct: false },
            { text: "Apprendre des relations à partir d’exemples", correct: true },
            { text: "Remplacer complètement un humain", correct: false }
        ]
    },
    {
        id: 2, level: 0, points: 1, text: "Qu’est-ce qu’un jeu de données ?",
        options: [
            { text: "Un ensemble d’exemples", correct: true },
            { text: "Un logiciel de calcul", correct: false },
            { text: "Une collection de données structurées", correct: true },
            { text: "Un algorithme", correct: false }
        ]
    },
    // DEBUTANT (Level 1) - Sample of 2 for brevity (In production, add all 8)
    {
        id: 3, level: 1, points: 2, text: "Quelles tâches relèvent du Machine Learning ?",
        options: [
            { text: "Classification", correct: true },
            { text: "Régression", correct: true },
            { text: "Compression de fichiers", correct: false },
            { text: "Clustering", correct: true }
        ]
    },
     {
        id: 4, level: 1, points: 2, text: "Pourquoi séparer les données en train et test ?",
        options: [
            { text: "Évaluer la performance réelle", correct: true },
            { text: "Accélérer l’entraînement", correct: false },
            { text: "Éviter le surapprentissage (Overfitting)", correct: true },
            { text: "Réduire la taille des données", correct: false }
        ]
    },
    // INTERMEDIAIRE (Level 2) - Sample
    {
        id: 11, level: 2, points: 3, text: "Quelles situations peuvent provoquer du data leakage ?",
        options: [
            { text: "Utiliser des données futures", correct: true },
            { text: "Normaliser avant la séparation train/test", correct: true },
            { text: "Ajouter trop de features", correct: false },
            { text: "Mauvais découpage temporel", correct: true }
        ]
    },
    // AVANCE (Level 3) - Sample
    {
        id: 16, level: 3, points: 4, text: "Quelles sont des sources de data drift en production ?",
        options: [
            { text: "Changement de comportement utilisateur", correct: true },
            { text: "Saison ou climat", correct: true },
            { text: "Mauvaise initialisation des poids", correct: false },
            { text: "Évolution du contexte métier", correct: true }
        ]
    },
    // EXPERT (Level 4) - Sample
    {
        id: 20, level: 4, points: 6, text: "Un modèle a de bonnes métriques mais de mauvaises décisions métier. Causes ?",
        options: [
            { text: "Mauvais alignement métrique/objectif", correct: true },
            { text: "Concept drift non détecté", correct: true },
            { text: "Biais dans les données d’entraînement", correct: true },
            { text: "Trop peu d’epochs", correct: false }
        ]
    }
    // Note: Pour le site réel, copiez toutes les questions du DOCX ici.
];
