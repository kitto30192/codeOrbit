import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Routes from './routes/index.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/v1/', Routes);
// app.use('', questionRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});