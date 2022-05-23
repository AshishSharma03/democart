import Cookies from 'js-cookie';
import { createContext,useReducer } from "react"
export const Store = createContext()


const initialState = {
    cart:{
        cartItems:Cookies.get('cartItems')
        ? JSON.parse(Cookies.get('cartItems'))
        : [],
    },
     userInfo: Cookies.get('userInfo')
        ? JSON.parse(Cookies.get('userInfo'))
        : null,
}

function reducer(state , action){
    
    switch (action.type){
        case 'CART_ADD_ITEM' :{
            const newItems = action.payload;
            const existItem = state.cart.cartItems.find((item) => item._id === newItems._id); 
            const cartItems = existItem ? state.cart.cartItems.map((item) => item.name === existItem.name ? newItems : item)
            : [...state.cart.cartItems,newItems];
            Cookies.set('cartItems',JSON.stringify(cartItems));
            return {...state,cart:{...state.cart.cartItems,cartItems}}

        }

        case 'CART_REMOVE_ITEM':{
            const cartItems = state.cart.cartItems.filter(
                (item ) => item._id !== action.payload._id            
                );

                Cookies.set('cartItems',JSON.stringify(cartItems));
                return {...state , cart : { ...state.cart,cartItems}}
        }

        case 'USER_LOGIN':
            return { ...state, userInfo: action.payload };
            
        case 'USER_LOGOUT':
            return { ...state, userInfo: null, cart: { cartItems: [] } };
        default:
            return state;
    }

}

export function StoreProvider(props){
    const [state, dispatch] = useReducer(reducer,initialState)
    const value = {state,dispatch};
    return <Store.Provider value = {value}> {props.children}</Store.Provider>
}
