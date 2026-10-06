# Human Warrant Annotation — site statique GitHub Pages

Site d'annotation entièrement statique. Aucune base de données ni serveur n'est nécessaire.

## Déploiement sur GitHub Pages

1. Créer un nouveau dépôt GitHub, par exemple `human-warrant-annotation`.
2. Copier tous les fichiers de ce dossier à la racine du dépôt.
3. Dans GitHub : **Settings → Pages**.
4. Sous **Build and deployment**, choisir **Deploy from a branch**.
5. Sélectionner `main` et `/ (root)` puis enregistrer.
6. GitHub fournit une URL du type `https://nom-utilisateur.github.io/human-warrant-annotation/`.

## Comment les annotations sont récupérées

Le site ne transmet rien automatiquement. Chaque annotateur :

1. remplit les cas ;
2. ouvre la section **Exporter** ;
3. télécharge le fichier `.json` ;
4. te renvoie ce fichier.

Le JSON doit être conservé pour l'analyse complète. Le CSV n'est qu'un résumé.

## Ajouter les vrais cas

Modifier `cases.js` et remplacer le tableau d'exemple par les cas à annoter.

Format minimal :

```js
window.ANNOTATION_CASES = [
  {
    id: "SCI-001",
    domain: "Sciences biomédicales",
    claim: "Une affirmation à évaluer.",
    evidence: [
      {
        id: "A",
        source_id: "paper-123",
        source_title: "Titre de la source",
        source_type: "Article scientifique",
        text: "Extrait présenté à l'annotateur."
      }
    ]
  }
];
```

Ne pas mettre dans `cases.js` :

- le label officiel du benchmark ;
- les supporting facts gold ;
- la prédiction d'Agentic Warrant ;
- les scores d'Agentic Warrant ;
- toute information permettant de deviner la réponse attendue.

## Import JSON alternatif

Le site permet aussi d'importer un lot de cas via la page **Exporter**. Le JSON peut être :

```json
[
  {
    "id": "CASE-001",
    "domain": "Sciences biomédicales",
    "claim": "...",
    "evidence": [
      {"id": "A", "source_id": "s1", "source_title": "...", "source_type": "...", "text": "..."}
    ]
  }
]
```

ou :

```json
{"cases": [ ... ]}
```

## Données enregistrées

Pour chaque cas :

- verdict global : SUPPORT / CONTRADICT / INSUFFICIENT / UNCERTAIN ;
- preuves pertinentes ;
- zéro, un ou plusieurs warrants ;
- suffisance et minimalité de chaque warrant ;
- preuves contradictoires ;
- dépendances entre sources ;
- action recommandée : CERTIFY / SEARCH_MORE / ABSTAIN / ESCALATE ;
- confiance 1–5 ;
- commentaire facultatif ;
- horodatages de début et mise à jour.

## Conseil pour le protocole scientifique

Utiliser au moins deux annotateurs indépendants par cas. Les annotateurs ne doivent pas voir les annotations du benchmark ni les prédictions d'Agentic Warrant avant de terminer. Les désaccords importants peuvent ensuite être arbitrés par un troisième annotateur.
