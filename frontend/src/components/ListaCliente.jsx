
import { useEffect, useState } from "react"
import { api } from "../api"

export const ListaClientes = () => {
  
  const [clientes, setClientes] = useState([])

  useEffect(() => {
  
  api.get("/").then( res => setClientes(res.data) )

}, [clientes])


return (
  <div>
    <h2>Lista de clientes</h2>
    <ul>
  {
    clientes.map( cliente => (
      <li key={cliente._id} >{cliente.nombre} - Grupo: {cliente.grupo}</li>
    ) )
  }
</ul>

  </div>
)

}
