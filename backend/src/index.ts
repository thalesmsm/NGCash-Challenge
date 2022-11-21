import app from './app';
import 'dotenv/config';

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.get('/', (_req, res) => {
  res.status(200).json({message: 'acesse a rota /users'});
});
