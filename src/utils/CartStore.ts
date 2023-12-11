import { ActionTypes, CartType } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
    products:[],
    totalPrice:0,
    totalItems:0
}

export const useCartStore = create(persist<CartType & ActionTypes>((set,get)=>({
    products:INITIAL_STATE.products,
    totalPrice:INITIAL_STATE.totalPrice,
    totalItems:INITIAL_STATE.totalItems,
    addToCart(item) {
        const products = get().products
        const productInState = products.find((product)=>product.id===item.id && product.optionTitle===item.optionTitle)

        if(productInState){
            const updatedProducts = products.map((product)=>
                product.id===productInState.id && product.optionTitle===item.optionTitle ? {
                    ...item,
                    quantity:product.quantity + item.quantity,
                    price:product.price + item.price
                }
                : product
            )
            set((state)=>({
                products:updatedProducts,
                totalPrice:state.totalPrice+item.price,
                totalItems:state.totalItems + item.quantity
            }))
        }
        else{            
            set((state)=>({
                products:[...state.products,item],
                totalPrice:state.totalPrice + item.price,
                totalItems:state.totalItems + item.quantity
            }))
        }
    },
    removeFromCart(item){
        const products = get().products;
        const receivedProduct = products.find((product)=>product.id===item.id && product.optionTitle===item.optionTitle)
        set((state)=>({
            products:state.products.filter((product)=>product!=receivedProduct),
            totalPrice:state.totalPrice - receivedProduct!.price,
            totalItems:state.totalItems - receivedProduct!.quantity
        }))
    },
    resetCart(){
        set(()=> INITIAL_STATE)
    }
}),{name:"cart",skipHydration:true}))