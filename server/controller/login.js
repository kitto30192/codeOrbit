import jwt from 'jsonwebtoken';
import { pool } from '/Users/pk888/OneDrive/Desktop/REACT/CodeLikePro/src/problemComponent/getProb.js';

const JWT_SECRET = 'Kit2ji999#';

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = rows[0];
        
        if (password === user.password_hash) {
            const token = jwt.sign(
                { 
                    id: user.id,
                    role: user.role,
                    name: user.full_name,
                    username: user.username,
                    problemsolved: user.problems_solved,
                    score: user.total_score,
                    badges: user.badges_earned
                },
                JWT_SECRET
            );

            res.cookie('UID', token, {
                path: '/',
                maxAge: 24 * 60 * 60 * 1000, 
            });

            return res.status(200).json({
                token,
                role: user.role,
                message: 'Login successful',
            });
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

    } catch (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const register = async (req, res) => {
    try {
        const { name, email, username, password, number, country } = req.body;
        const [rows] = await pool.query(
            'INSERT INTO users (full_name,username,email,password_hash,phone_number,country) VALUES (?, ?, ?, ?, ?, ?)',
            [name, username, email, password, number, country]
        );

        return res.status(200).json({ message: 'user successfully registered '});
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};