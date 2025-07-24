import cors from 'cors';
const corsOptions = {
  origin: 'http://localhost:5173'
};

const corsMiddleware = () => {
  return cors(corsOptions);
};

export default corsMiddleware;