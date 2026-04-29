const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/data', (req, res) => {
    console.log(req.body);
    res.json({ message: 'Data received' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});