import { Router } from 'express'
import ProductManager from '../controllers/ProductManager.js'

const ProdRouter = Router()
const product = new ProductManager()

ProdRouter.get("/", async (req, res) =>{
    let limit = parseInt(req.query.limit);
    if(!limit) return res.send(await product.readProducts())
    let allProd = await product.readProducts()
    let productLimit = allProd.slice(0, limit)
    res.send(productLimit)
})

ProdRouter.get("/:id", async (req, res) =>{
    let id = req.params.id
    res.send(await product.getProductsById(id))
})

ProdRouter.post("/", async (req, res) =>{
    let newProduct = req.body
    res.send(await product.addProducts(newProduct))
})

ProdRouter.put("/:id", async (req, res)=>{
    let id = req.params.id
    let putBody = req.body
    res.send(await product.updateProduct(id, putBody))
})

ProdRouter.delete("/:id", async (req, res)=>{
    let id = req.params.id
    res.send(await product.deleteProducts(id))
})

export default ProdRouter