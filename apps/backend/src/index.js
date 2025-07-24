import express from 'express';
import userRouter from './Web/Routes/User.js';
import corsMiddleware from './Web/Middlewares/Cors.js';

const app = express();

app.use(express.json());
app.use(corsMiddleware());
app.use(userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;