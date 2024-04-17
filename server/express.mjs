import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Define o diretório onde seus arquivos estáticos (como HTML, CSS, imagens, etc.) estão localizados
app.use(express.static(path.join(__dirname, 'public', 'assets')));

// Rota para lidar com a requisição GET na raiz ('/')
app.get('/play', (req, res) => {
    // Envia o arquivo HTML para o cliente
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/', (req, res) => {
    // Envia o arquivo HTML para o cliente
    res.sendFile(path.join(__dirname, 'public','pages','menu.html'));
});
app.get('/configuracoes/changeSkin', (req, res) => {
    // Envia o arquivo HTML para o cliente
    res.sendFile(path.join(__dirname, 'public','pages','config', 'changeSkin.html'));
});
app.get('/configuracoes/changeMapa', (req, res) => {
    // Envia o arquivo HTML para o cliente
    res.sendFile(path.join(__dirname, 'public','pages','config', 'changeMapa.html'));
});
app.get('/lose/lose', (req, res) => {
    // Envia o arquivo HTML para o cliente
    res.sendFile(path.join(__dirname, 'public','pages','lose', 'lose.html'));
});

// Define a porta em que o servidor vai ouvir
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
