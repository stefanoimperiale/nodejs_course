import {Request, Response} from "express";
import Product from "../models/product";

export const getAddProduct = (req: Request, res: Response) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
}

export const getEditProduct = async (req: Request<{edit: string, productId: string} >, res: Response) => {
    const editMode = req.query.edit;
    if (!editMode) res.redirect('/')
    const productId = +req.params.productId;
    const products = await req.user.getProducts({where:productId});
    if (!productId) res.redirect('/');
    res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: products[0]
    })
}

export const postAddProduct = async (req: Request<any, any, Product>, res: Response) => {
    const {title, imageUrl, price, description} = req.body;
    req.user.createProduct({
        title,
        price,
        imageUrl,
        description,
    });
    res.redirect('/admin/products');
}

export const postEditProduct = async (req: Request<any, any, Product>, res: Response) => {
    const {id, title, price, description, imageUrl} = req.body;
    const product = await Product.findByPk(id);
    product.title = title;
    product.price = price;
    product.descroption = description;
    product.imageUrl = imageUrl;
    await product?.save();
    res.redirect('/admin/products');
}

export const postDeleteProduct = async (req: Request<any, any, { productId: string }>, res: Response) => {
    const prodId = req.body.productId;
    const product = await Product.findByPk(prodId);
    await product?.destroy();
    res.redirect('/admin/products');
}

export const getProducts = async (req: Request, res: Response) => {
    const products = await req.user.getProducts();
    res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
    });
}
