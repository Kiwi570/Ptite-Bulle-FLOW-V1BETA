# 🫀 PULSE V1 - L'Expérience Business Ultime

> *"Tout est connecté, tout réagit, tout a du sens"*

## 🚀 Lancement rapide

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build production
npm run build
```

Ouvre **http://localhost:5173** dans ton navigateur.

---

## ✨ Nouveautés V1

### 🔗 Modules Connectés
Les modules se parlent ! Une action dans un module impacte les autres :

- **Tribe → Flow** : "Envoyer email" ouvre l'email composer pré-rempli
- **Vault → Flow** : "Relancer facture" envoie automatiquement l'email
- **Flow → Score** : Chaque email envoyé augmente le score (+2 points)
- **Actions → Luna** : Luna réagit et commente tes actions

### 🤖 Luna Intelligente
20+ réponses contextuelles basées sur les mots-clés :

- Parle de "clients" → Stats et suggestions personnalisées
- Parle de "dormants" → Liste des clients à réactiver
- Parle de "factures" → État de ta trésorerie
- Parle de "emails" → Conseils et templates
- Et bien plus !

### ✨ Feedback Partout
Chaque action génère une réponse visuelle :

- **Toasts** : Notifications élégantes pour chaque action
- **Score animé** : Le score monte/descend en temps réel
- **Luna insights** : L'IA commente tes actions
- **Animations** : Transitions fluides partout

---

## 🏗️ Architecture

```
src/
├── App.jsx                 # Point d'entrée avec routing
├── main.jsx               # Mount React
├── stores/
│   └── pulseStore.js      # 🏪 État global Zustand (CONNECTÉ)
├── components/
│   ├── layout/
│   │   └── Layout.jsx     # Sidebar, header, splash
│   ├── luna/
│   │   └── Luna.jsx       # 🤖 IA copilote (20+ réponses)
│   └── ui/
│       ├── index.jsx      # Design system
│       └── Toast.jsx      # 🔔 Notifications
├── pages/
│   ├── Dashboard.jsx      # Score dynamique + widgets
│   ├── Vision.jsx         # Analytics + Ghost Mode
│   ├── Tribe.jsx          # CRM avec cercles
│   ├── Flow.jsx           # Email composer
│   └── Vault.jsx          # Finances + factures
└── data/
    ├── clients.js         # 12 personas narratifs
    └── finances.js        # Données financières
```

---

## 🎯 Les 12 Clients Narratifs

Chaque client a une histoire cohérente :

| Client | Segment | CA | Histoire |
|--------|---------|-----|----------|
| Marie Dupont | 👑 Ambassador | 4 850€ | Meilleure cliente, recommande partout |
| Thomas Bernard | 👑 Ambassador | 8 200€ | Directeur tech, achète pour son équipe |
| Sophie Martin | 💜 Fan | 1 890€ | Parrainée par Marie, active LinkedIn |
| Lucas Petit | 💜 Fan | 2 450€ | Agence web, forme son équipe |
| Pierre Lambert | 😴 Dormant | 3 200€ | **PRIORITÉ** - 4 mois sans nouvelles |
| Camille Roux | 😴 Dormant | 560€ | A visité le site récemment |
| Nicolas Garcia | 😴 Dormant | 1 450€ | Email peut-être invalide |
| Léa Fournier | 🌟 Nouveau | 149€ | Très engagée, potentiel |
| Hugo Martinez | 🌟 Nouveau | 49€ | Étudiant, actif réseaux |

---

## 💬 Commandes Luna

Essaie ces phrases dans le chat Luna :

```
"Mes clients"          → Vue d'ensemble segments
"Dormants"             → Liste et suggestions réactivation
"Factures"             → État trésorerie
"Emails"               → Stats et conseils
"Score"                → Décomposition du score
"Aide"                 → Actions prioritaires
"Merci"                → Easter egg 😄
```

---

## 🔥 Scénarios de Démo

### Scénario 1 : Réactiver un dormant
1. Dashboard → Voir "8 clients dormants"
2. Clic → Navigation vers Tribe
3. Filtrer sur Dormants (cercle jaune)
4. Clic sur Pierre Lambert
5. "Envoyer email" → Ouvre Flow
6. Template "Réactivation" pré-sélectionné
7. Envoyer → Toast + Score +2

### Scénario 2 : Relancer une facture
1. Dashboard → Voir "Factures en retard"
2. Clic → Navigation vers Vault
3. Voir les 3 factures en retard
4. Clic "Relancer" sur Creative Studio
5. Toast + Luna commente
6. Score +1

### Scénario 3 : Parler à Luna
1. Ouvrir Luna (bulle en bas à droite)
2. Taper "Mes clients dormants"
3. Luna répond avec stats et actions
4. Cliquer sur l'action suggérée
5. Navigation contextuelle

---

## 🛠️ Technologies

- **React 18** + Vite
- **Tailwind CSS** + Design tokens custom
- **Framer Motion** - Animations fluides
- **Zustand** - État global avec persist
- **React Router** - Navigation SPA
- **Lucide Icons** - Icônes cohérentes

---

## 📱 Responsive

- **Desktop** : Sidebar complète, grilles 4 colonnes
- **Tablet** : Sidebar collapsible, grilles 2 colonnes  
- **Mobile** : Bottom nav, cards empilées

---

## 🎨 Palette de Couleurs

| Module | Couleur | Usage |
|--------|---------|-------|
| CORE | #F472B6 | Score, accents principaux |
| VISION | #22D3EE | Analytics, trafic |
| TRIBE | #A78BFA | Clients, CRM |
| FLOW | #34D399 | Emails, marketing |
| VAULT | #FBBF24 | Finances, argent |

---

## 🐛 Debug

```javascript
// Dans la console browser
localStorage.removeItem('pulse-v1-storage')  // Reset état
sessionStorage.removeItem('pulse_splash_shown')  // Revoir splash
```

---

## 📈 Métriques de Succès

- ✅ Temps avant "Wow" : < 30 secondes
- ✅ Actions sans feedback : 0
- ✅ Modules isolés : 0
- ✅ Réponses Luna identiques : 0
- ✅ Score réactif : Oui

---

## 🫀 Fait avec amour par l'équipe PULSE

*"Le cœur de ton business"*
