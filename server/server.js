import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDb from './configs/db.js';
import connectCloudinary from './configs/cloudinary.js';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';

// configure environment variables
dotenv.config(); 

// initialize express app and set port
const app = express();
const PORT = process.env.PORT || 4000;

// connect to database and cloudinary
await connectDb();
await connectCloudinary();

// allow multiple origins for CORS
const allowedOrigins = [
  'http://localhost:5173',
]

app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks);

// middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

// test route
app.get('/', (req, res) => {
  res.send('Api is working');
});

// routes
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)


// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});