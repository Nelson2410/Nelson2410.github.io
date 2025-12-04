# Portfolio Nelson Bandos - Backend API

Backend sécurisé pour l'intégration de l'API Gemini au portfolio.

## 🔒 Sécurité

- ✅ La clé API Gemini est stockée **en variables d'environnement** (fichier `.env`)
- ✅ **Jamais exposée** dans le code ou en production
- ✅ Communication via proxy backend sécurisé
- ✅ CORS configuré pour accepter uniquement votre domaine

## 🚀 Installation locale

### Prérequis
- Node.js 16+ installé
- Clé API Gemini (créer à : https://ai.google.dev/)

### Étapes

1. **Cloner ou télécharger le projet**
```bash
cd /workspaces/Nelson2410.github.io
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer la clé API**
   - Ouvrir le fichier `.env`
   - Remplacer `your_gemini_api_key_here` par votre vraie clé API
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Démarrer le serveur en développement**
```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

5. **Tester localement**
   - Ouvrir `http://localhost:3000` (le serveur sert aussi le site)
   - Cliquer sur "Comprendre le projet" sur une carte de projet
   - La requête passera par le proxy sécurisé

## 📦 Déploiement en production (Render)

### Étape 1 : Créer un compte Render
1. Aller sur https://render.com
2. S'inscrire avec GitHub (gratuit)

### Étape 2 : Connecter le repo GitHub
1. Créer un **Web Service** nouveau
2. Connecter le repo `Nelson2410.github.io`
3. Configurer :
   - **Name** : `nelson-portfolio-api`
   - **Environment** : `Node`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - **Plan** : Free (gratuit, ~0$/mois)

### Étape 3 : Ajouter les variables d'environnement
1. Dans les paramètres du service Render
2. Aller à **Environment**
3. Ajouter une variable :
   - **Key** : `GEMINI_API_KEY`
   - **Value** : Votre clé API Gemini

### Étape 4 : Mettre à jour l'URL dans le HTML
Après le déploiement, Render vous donne une URL comme `https://nelson-portfolio-api.onrender.com`

Mettre à jour dans `index.html` :
```javascript
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api/gemini'
    : 'https://nelson-portfolio-api.onrender.com/api/gemini';
```

### Étape 5 : Pousser les changements
```bash
git add .
git commit -m "Ajout du backend Gemini API proxy"
git push origin main
```

Render redéploiera automatiquement ! ✅

## 🧪 Tester l'API

```bash
curl -X POST http://localhost:3000/api/gemini \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{"parts": [{"text": "Bonjour"}]}],
    "systemInstruction": {"parts": [{"text": "Tu es un assistant utile"}]}
  }'
```

## 📁 Structure du projet

```
.
├── index.html           # Site portfolio
├── server.js            # Backend Express/Node.js
├── package.json         # Dépendances
├── .env                 # Variables d'environnement (LOCAL uniquement)
├── .gitignore           # Ne pas pousser .env sur GitHub
└── README-BACKEND.md    # Ce fichier
```

## ⚠️ Important

- **Ne JAMAIS pousser le fichier `.env` sur GitHub** (déjà dans `.gitignore`)
- **Sur Render** : définir les variables d'environnement via l'interface web, pas via `.env`
- **Clé API** : garder secrète à tout moment

## 🆘 Dépannage

### "GEMINI_API_KEY non configurée"
→ Vérifier que la variable d'environnement est définie dans `.env` (local) ou sur Render (prod)

### "CORS error"
→ Vérifier que le domaine est autorisé dans `server.js` ligne 13

### Le serveur ne démarre pas
```bash
# Vérifier que Node.js est installé
node --version

# Installer les dépendances
npm install

# Relancer
npm run dev
```

---

**Créé par Nelson Bandos** - Décembre 2025
