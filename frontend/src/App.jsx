import { FormularioCliente } from "./components/FormularioCliente.jsx"
import { ListaClientes } from "./components/ListaCliente.jsx"


export const App = () => {
  return (
    <div>
  <h1>Aplicación de gestión de clientes</h1>
  <ListaClientes />
  <FormularioCliente />
</div>
  )
}

