import {Request, Response} from "express";
import Product from "../models/product.model";

export const getAddProduct = (req: Request, res: Response) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
}

export const getEditProduct = async (req: Request<{ edit: string, productId: string }>, res: Response) => {
    const editMode = req.query.edit;
    if (!editMode) res.redirect('/')
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) res.redirect('/');
    res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product
    })
}

export const postAddProduct = async (req: Request<any, any, Product>, res: Response) => {
    const {title, imageUrl, price, description} = req.body;
    const user = req.user;
    const product = new Product(title, price, description, imageUrl, null, user._id!.toHexString());
    await product.save();
    res.redirect('/admin/products');
}

export const postEditProduct = async (req: Request<any, any, Product>, res: Response) => {
    const {_id, title, price, description, imageUrl} = req.body;
    const product = new Product(title, price, description, imageUrl, _id?.toHexString());
    await product.save();
    res.redirect('/admin/products');
}

export const postDeleteProduct = async (req: Request<any, any, { productId: string }>, res: Response) => {
    const prodId = req.body.productId;
    await Product.deleteById(prodId);
    res.redirect('/admin/products');
}

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.fetchAll();
    res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
    });
}
