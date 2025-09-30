const app = require('./app');
const path = require('path');

app.use(express.static(path.join(__dirname, '../public')));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
