import express from 'express'
import { Router } from 'express'
import Cliente from '../models/cliente.model.js'

const router = Router()

//Crear el cliente
router.post("/", async (req, res) => {
    const nuevoCliente = new Cliente( req.body )
    await nuevoCliente.save()
    res.json(nuevoCliente)
})

//Obtener todos los clientes
router.get( "/", async (req, res) => {
    const clientes = await Cliente.find()
    res.json(clientes)
})

//Actualizar cliente
router.put( "/:id", async (req, res) => {
    const clienteActualizado = await Cliente.findByIdAndUpdate( req.params.id, req.body, {new: true} )
    res.json(clienteActualizado)
})

//Eliminar alumno
router.delete( "/:id", async (req, res) => {
    await Cliente.findByIdAndDelete( req.params.id )
    res.json({message: "Cliente eliminado"})
})

export default router