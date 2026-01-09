require('dotenv').config();
const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
let db;
async function connectDB() {
    try {
        db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });
        console.log('Connected to Cloud SQL Database');

        // Ensure table exists
        await db.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                google_id VARCHAR(255) UNIQUE NOT NULL,
                display_name VARCHAR(255),
                email VARCHAR(255) UNIQUE NOT NULL,
                profile_pic TEXT,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
    } catch (err) {
        console.error('Database connection failed:', err.message);
        console.log('Proceeding without database for login verification only...');
    }
}

connectDB();

// Verification Route
app.post('/api/auth/google', async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub, name, email, picture } = payload;

        console.log(`User verified: ${name} (${email})`);

        // Save to Database if connected
        if (db) {
            await db.execute(`
                INSERT INTO users (google_id, display_name, email, profile_pic)
                VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE 
                display_name = VALUES(display_name),
                profile_pic = VALUES(profile_pic)
            `, [sub, name, email, picture]);
        }

        res.status(200).json({
            success: true,
            user: {
                id: sub,
                name: name,
                email: email,
                photo: picture
            }
        });

    } catch (error) {
        console.error('Auth Error:', error);
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
});

app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
