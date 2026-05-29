import express from 'express';
import articleRoutes from './routes/articleRoutes.js';
const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to EX-2 API. Try /articles');
});
app.use('/articles', articleRoutes);


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});