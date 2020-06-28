import Product from "../models/product";

export type Cart = { products: {id: number, qty: number}[], totalPrice: number }
