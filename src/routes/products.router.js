import { Router } from "express";
import { productManager } from "../index.js";

const productsRouter = Router()

// GET PRODUCTS
productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const productos = await productManager.getProducts()

        if(limit) {
            const limitedProducts = productos.slice(0, limit)
            return res.json(limitedProducts)
        }

        return res.json(productos)

    } catch (error) {
        console.log(error);
        res.send('Error al intentar recibir los productos')
    }
})

// GET PRODUCT BY ID
productsRouter.get('/:pid', async (req, res) => {
    const {pid} = req.params;
    try {
        const products = await productManager.getProductsById(pid)
        res.json(products)
    } catch (error) {
        console.log(error);
        res.send(`Error al intentar recibir los productos con el id ${pid}`)
    }
})

// ADD PRODUCT
productsRouter.post('/', async (req, res) => {
    try {
        const {title, description, price, thumbnail, code, status = true, category} = req.body;
        const response = await productManager.addProduct({title, description, price, thumbnail, code, status, category})
        res.json(response)

    } catch (error) {
        console.log(error);
        res.send('Error al intentar agregar producto')
    }
})

// UPDATE PRODUCT
productsRouter.put('/:pid', async (req, res) => {
    const {pid} = req.params;
    try {
        const {title, description, price, thumbnail, code, status = true, category} = req.body;
        const response = await productManager.updateProduct(pid, {title, description, price, thumbnail, code, status, category})
        res.json(response)
    } catch (error) {
        res.send(`Error al intentar actualizar producto con ID ${pid}`)
        
    }
})

// DELETE PRODUCT
productsRouter.delete('/:pid', async (req, res) => {
    const {pid} = req.params;
    
    try {
        await productManager.deleteProduct(pid)
        res.send('Producto eliminado')    
    } catch (error) {
        console.log(error);
        res.send(`Error al eliminar producto con ID ${pid}`)
    }
})


export {productsRouter}