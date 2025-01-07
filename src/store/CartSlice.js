import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalAmount: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart:(state, action)=>{
            console.log("Reducer triggered with payload:", action.payload);
            console.log("Previous state:", state);
            const newItem = action.payload
            const existingItem = state.cartItems.find(item => item.id === newItem.id)
            if(!existingItem){
                state.cartItems.push({
                    id: newItem.id,
                    title: newItem.title,
                    description: newItem.description,
                    category: newItem.category,
                    singlePrice : newItem.price,
                    totalPrice: newItem.price,
                    quantity: newItem.quantity,
                    image: newItem.image
                })
                state.totalQuantity++
                state.totalAmount += newItem.price
            //console.log("Total Quantity : ", existingItem.quantity);
            
                
            }
            else{
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
                state.totalQuantity++;
                state.totalAmount += newItem.price;
            }
        },
        removeFromCart:(state, action)=>{
            const id = action.payload
            const existingItem = state.cartItems.find(item => item.id === id)
            if(existingItem){
                state.totalQuantity -= existingItem.quantity
                state.totalAmount -= existingItem.totalPrice
                state.cartItems = state.cartItems.filter(item=> item.id !== id)
                
            }
        },
        decreaseQuantity:(state, action)=>{
            const id = action.payload
            const existingItem = state.cartItems.find(item=> item.id === id)
            if(existingItem.quantity === 1){
                state.totalQuantity--
                state.totalAmount-= existingItem.singlePrice
                state.cartItems.filter(item => item.id !== id)
            }
            else{
                existingItem.quantity --
                existingItem.totalPrice -= existingItem.singlePrice
                state.totalQuantity--
                state.totalAmount-= existingItem.singlePrice
            }
        },
        increaseQuantity: (state, action)=>{
            const { id, price } = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id)
            if(existingItem){
                console.log('Existing Item:', price);
                existingItem.quantity ++
                existingItem.totalPrice += existingItem.singlePrice
                state.totalAmount += existingItem.singlePrice
                state.totalQuantity ++
            }
            else{
                console.log('Nothing Found');
                
            }
        },
        addCourierAmount: (state, action)=>{
            const {amount} = action.payload
            state.totalAmount += amount
        }
    }
})

export const {addToCart, removeFromCart, decreaseQuantity, increaseQuantity, addCourierAmount} = cartSlice.actions
export default cartSlice.reducer
