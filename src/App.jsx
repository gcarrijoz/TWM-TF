import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from "./components/layout/Navbar"
import Container from './components/layout/Container'

import Home from './components/pages/Home'
import Clientes from './components/pages/clientes/Clientes'
import Produtos from './components/pages/produtos/Produtos'
import Tecnicos from './components/pages/tecnicos/Tecnicos'
import Ordens from './components/pages/ordens/Ordens'
import ClienteCadastro from './components/pages/clientes/ClienteCadastro'
import ClienteEditar from './components/pages/clientes/ClienteEditar'
import ProdutoCadastro from './components/pages/produtos/ProdutoCadastro'
import ProdutoEditar from './components/pages/produtos/ProdutoEditar'
import TecnicoCadastro from './components/pages/tecnicos/TecnicoCadastro'
import TecnicoEditar from './components/pages/tecnicos/TecnicoEditar'
import OrdemCadastro from './components/pages/ordens/OrdemCadastro'
import OrdemEditar from './components/pages/ordens/OrdemEditar'
import Gabriel from './components/pages/Gabriel'


function App() {
  return ( 
    <Router>
        <Navbar/>
        <Container customClass="min_height">
            <Routes>     
                <Route path="/" element={<Home/>}></Route>       
                <Route path="/clientes" element={<Clientes/>}></Route>
                <Route path="/produtos" element={<Produtos/>}></Route>
                <Route path="/tecnicos" element={<Tecnicos/>}></Route>
                <Route path="/ordens" element={<Ordens/>}></Route>
                <Route  path="/gabriel" element={<Gabriel/>}></Route>
                <Route path="/cadastro-cliente" element={<ClienteCadastro/>}></Route>
                <Route path="/cadastro-produto" element={<ProdutoCadastro/>}></Route>
                <Route path="/cadastro-tecnico" element={<TecnicoCadastro/>}></Route>
                <Route path="/cadastro-ordem" element={<OrdemCadastro/>}></Route>
                <Route path="/editar-produto/:id" element={<ProdutoEditar/>}></Route>
                <Route path="/editar-cliente/:id" element={<ClienteEditar/>}></Route>
                <Route path="/editar-tecnico/:id" element={<TecnicoEditar/>}></Route>
                <Route path="/editar-ordem/:id" element={<OrdemEditar/>}></Route>


            </Routes>
        </Container>
    </Router>

  )
}

export default App
