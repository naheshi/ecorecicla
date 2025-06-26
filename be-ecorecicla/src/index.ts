import type  { NextFunction, Request, Response } from "express";
import express from 'express';
import { authRoutes } from './routes/authRoutes';
import { productRoutes } from "./routes/productRoutes";
import helmet from "helmet";
import cors from "cors";
import { profileRoutes } from "./routes/profileRoutes";
import { rankingRoutes } from "./routes/rankingRoutes";
import { barcodeRoutes } from "./routes/barcodeRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { wsRoutes } from "./routes/wsRoutes";
import expressWs from 'express-ws';
import { modelRoutes } from "./routes/modelRoutes";

const app = express();
expressWs(app);
const PORT = Number(process.env.PORT) || 3001;

app.use(express.json());

app.disable('x-powered-by')

app.use(cors({
 origin: process.env.FRONT_BASE_URL,
  credentials: true,
}));

app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
}))

app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/profile', profileRoutes);
app.use('/ranking', rankingRoutes)
app.use('/user', barcodeRoutes)
app.use('/admin', adminRoutes)
app.use('/scan', adminRoutes)

// Rutas WS
app.use('/ws', wsRoutes);

// Rutas Model
app.use('/scan', modelRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log('Server running on port ' + PORT);
});
