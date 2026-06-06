import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { config } from 'dotenv'
import clienteRouter from '../routes/clientes.routes.js'
import authRoutes from '../routes/auth.routes.js'

config()

const app = express()
const PORT = process.env.PORT

app.use( express.json() )
app.use( cors() )
app.use( '/api/clientes', clienteRouter )
app.use( '/api', authRoutes )

/* mongoose.connect( process.env.MONGO_URI.then( () => console.log("Conectado a MongoDB") ) )
 */

/* mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err)); */

  mongoose.connect( process.env.MONGO_URI ).then( () => console.log("Conectado a MongoDB") )

  
app.listen( PORT, () => {
    console.log(`El servidor está corriendo en http://localhost:${PORT}`)
} )
