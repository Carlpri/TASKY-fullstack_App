import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';
import userRoutes from './routes/user';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: process.env.CLIENT_URL ,
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/user', userRoutes);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: 'Welcome to the tasky api' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; 