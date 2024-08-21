import express from 'express';
import { connectDB } from './config/db';
import userRoutes from './routes/userRoutes';
import storeRoutes from './routes/storeRoutes';
import eventRoutes from './routes/eventRoutes';

const app = express();

connectDB();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/events', eventRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
