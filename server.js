import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://nelson2410.github.io'],
    methods: ['POST'],
    credentials: true
}));

// Endpoint pour appeler l'API Gemini
app.post('/api/gemini', async (req, res) => {
    try {
        const { contents, systemInstruction } = req.body;

        // Valider les données reçues
        if (!contents || !systemInstruction) {
            return res.status(400).json({ error: 'Données manquantes' });
        }

        // Récupérer la clé API depuis les variables d'environnement
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('GEMINI_API_KEY non configurée');
            return res.status(500).json({ error: 'Clé API non configurée' });
        }

        // Appeler l'API Gemini
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey
            },
            body: JSON.stringify({
                contents,
                systemInstruction
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur API Gemini:', errorData);
            return res.status(response.status).json({ error: 'Erreur API Gemini', details: errorData });
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Erreur serveur:', error.message);
        res.status(500).json({ error: 'Erreur serveur', details: error.message });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`✅ Serveur Gemini Proxy démarré sur le port ${PORT}`);
    console.log(`🔒 Clé API protégée par variable d'environnement`);
});
