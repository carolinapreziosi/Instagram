const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Instagram funcionando!');
});

app.listen(PORT, () => console.log('Escuchando server en el puerto '+PORT));
