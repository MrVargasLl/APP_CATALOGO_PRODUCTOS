import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { config } from 'dotenv'
import clientesRouter from '../routes/clientes.routes.js'

config()

const app = express()
const PORT = process.env.PORT || 3001 // Fallback por si process.env.PORT no carga

// 1. MIDDLEWARES
app.use( express.json() )
app.use( cors() )

// Solución al error de Content Security Policy (CSP)
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        `default-src 'self'; connect-src 'self' http://localhost:${PORT} ws://localhost:${PORT};`
    );
    next();
});

// 2. RUTAS DE TU API
app.use( '/api/clientes', clientesRouter )

// 3. RUTAS DE CONTROL (Para limpiar los errores de la consola)

// Evita el error 404 de la raíz (http://localhost:3001/)
app.get('/', (req, res) => {
    res.send('🚀 Servidor de la API corriendo correctamente');
});

// Evita el error 404 y CSP de Google Chrome DevTools
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
    res.json({});
});

// 4. CONEXIÓN A BASE DE DATOS
mongoose.connect( process.env.MONGO_URI )
    .then( () => console.log("Conectado a MongoDB") )
    .catch( (err) => console.error("Error en MongoDB:", err) ); // Es buena práctica atrapar errores aquí

// 5. ENCENDER SERVIDOR
app.listen( PORT, () => {
    console.log(`El servidor está corriendo en http://localhost:${PORT}`)
} )


