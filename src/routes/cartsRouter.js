import { Router } from "express";
import { cartManager } from "../index.js";

const cartsRouter = Router()

// Crear un nuevo carrito -- http://localhost:8080/api/carts/
cartsRouter.post('/', async (req, res) => {
    try {
        const response = await cartManager.newCart()
        res.json(response)
    } catch (error) {
        res.send('Error al crear el carrito');
    }
})

cartsRouter.get('/:cid', async (req, res) => {
    const {cid} = req.params;
    try {
        const response = await cartManager.getCartProducts(cid)
        res.json(response)
    } catch (error) {
        res.send('Error al enviar productos del carrito ')
    }
})

cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    const {cid, pid} = req.params;
    try {
        await cartManager.addProductToCart(cid, pid)
        // no devuelvo nada porque la funcion addProductsToCart no retorna nada
        res.send('Producto agregado exitosamente')
    } catch (error) {
        res.send('Error al intentar añadir producto al carrito')
    }
})

export {cartsRouter}