import React,{ useContext }  from "react"
import Head from 'next/head'
import { AppBar, Badge, Button, Container, Toolbar, Typography } from "@mui/material"
import {Store} from '../utils/store'
import Link from "../src/Link"
import Cookies from 'js-cookie';

function Layout({title,description,children}){

    const { state , dispatch } = useContext(Store)
    const {cart,userInfo } = state;
    console.log(cart)
    let k = false
    
        if (userInfo) {
            k = true;
        }

    const logOut=()=>{
        // case 'USER_LOGOUT':

        dispatch({ type: 'USER_LOGOUT' });
        Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    Cookies.remove('shippinhAddress');
    // Cookies.remove('paymentMethod');
    }
   
    return(
        <>
        <Head>
            <title>{title?`${title} - Mysite`: "MySite"}</title>
            {description && <meta name="description" content={description}></meta>}
        </Head>
        <AppBar position="static">
            <Toolbar>
                <Link  href="/" sx={{textDecoration:"none",color:"White"}}>
                <Typography sx={{paddingRight:"20px"}}>LOGO</Typography>
                </Link>
                <Link  href="/carts" sx={{textDecoration:"none",color:"White",paddingRight:"20px"}}>
                   {cart.cartItems.length > 0 ? 
                    <Badge color="secondary" badgeContent={cart.cartItems.length}>cart</Badge>
                    :
                    'cart'
                }
                {/* cart */}
                </Link>
                {k?<Button onClick={logOut} variant="contained">
                <Typography >Log out</Typography>
                </Button> :
              <Link  href="/LogIn" sx={{textDecoration:"none",color:"White"}}>
                <Typography >Log in</Typography></Link> 
                }
               
            </Toolbar>
        </AppBar>
         <Container>
             {children}
         </Container>
        </>
    )
}


export default Layout