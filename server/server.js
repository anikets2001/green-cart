import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDb from './configs/db.js';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

await connectDb();

// allow multiple origins for CORS
const allowedOrigins = [
  'http://localhost:5173',
]

// middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

app.get('/', (req, res) => {
  res.send('Api is working');
});

app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});