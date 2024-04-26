const express = require('express');
const cors = require('cors'); // Importe o pacote cors
const app = express();
const PORT = 5000;

// Adicione o middleware cors
app.use(cors());

// Importar rotas do cliente
const clientesRoutes = require('./routes/clientes');

// Importar rotas do técnico
const tecnicosRoutes = require('./routes/tecnicos');

// Importar rotas do produto
const produtosRoutes = require('./routes/produtos');

// Importar rotas da categoria
const categoriasRoutes = require('./routes/categorias');

// Importar rotas da ordem
const ordensRoutes = require('./routes/ordens');

// Middleware para permitir que o Express analise solicitações JSON
app.use(express.json());

// Montar as rotas do cliente no aplicativo Express
app.use('/clientes', clientesRoutes);

// Montar as rotas do técnico no aplicativo Express
app.use('/tecnicos', tecnicosRoutes);

// Montar as rotas do produto no aplicativo Express
app.use('/produtos', produtosRoutes);

// Montar as rotas da categoria no aplicativo Express
app.use('/categorias', categoriasRoutes);

// Montar as rotas da ordem no aplicativo Express
app.use('/ordens', ordensRoutes);



// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
