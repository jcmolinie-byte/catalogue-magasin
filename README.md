# 📦 Catalogue Magasin — GitHub Pages

Application web de consultation du catalogue magasin. Hébergée sur GitHub Pages, lecture seule pour les utilisateurs.

## Structure du repo

```
catalogue-magasin/
├── index.html       ← Application web (ne pas modifier)
├── catalogue.json   ← BASE DE DONNÉES (à mettre à jour)
└── README.md
```

---

## 🚀 Déploiement initial (une seule fois)

1. Créer un repo GitHub : `catalogue-magasin` (public)
2. Uploader les fichiers `index.html`, `catalogue.json` et `README.md`
3. Aller dans **Settings → Pages**
4. Source : **Deploy from a branch** → branche `main` → dossier `/ (root)`
5. Cliquer **Save**
6. L'URL sera : `https://VOTRE-COMPTE.github.io/catalogue-magasin/`

---

## 🔄 Mettre à jour le catalogue

### Option A — Via GitHub (recommandé)

1. Ouvrir `catalogue.json` sur GitHub
2. Cliquer ✏️ (modifier)
3. Modifier les données
4. **Commit changes**
5. L'appli se met à jour en **~1 minute**

### Option B — Générer le JSON depuis Excel

Utiliser ce script Python (à lancer en local) :

```python
import pandas as pd
import json
from datetime import date

df = pd.read_excel('catalogue.xlsx')  # colonnes : ref, label, location
articles = df.rename(columns={
    'Numéro article': 'ref',
    'Désignation': 'label',
    'Emplacement': 'location'
}).to_dict(orient='records')

data = {
    "updated": date.today().strftime("%d/%m/%Y"),
    "articles": articles
}

with open('catalogue.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"{len(articles)} articles exportés.")
```

Puis uploader le `catalogue.json` généré sur GitHub.

---

## Format du fichier catalogue.json

```json
{
  "updated": "22/03/2026",
  "articles": [
    { "ref": "100001", "label": "Roulement à billes SKF 6205", "location": "A01-01" },
    { "ref": "100002", "label": "Joint torique NBR 50x3", "location": "A01-02" }
  ]
}
```

| Champ | Description |
|-------|-------------|
| `ref` | Numéro d'article |
| `label` | Désignation de l'article |
| `location` | Emplacement dans le magasin |
| `updated` | Date de mise à jour (affichée dans l'appli) |

---

## ✅ Performances

- Testé jusqu'à **15 000+ lignes** sans problème
- Pagination 50 lignes par page
- Recherche instantanée (côté navigateur, pas de serveur)
- Taille JSON estimée : ~1-3 Mo pour 15 000 lignes
