import React,{ useContext }  from "react"
import Head from 'next/head'
import { AppBar, Badge, Container, Toolbar, Typography } from "@mui/material"
import {Store} from '../utils/store'
import Link from "../src/Link"


function Layout({title,description,children}){

    const { state , dispatch } = useContext(Store)
    const {cart } = state;
    console.log(cart)
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
                <Link  href="/LogIn" sx={{textDecoration:"none",color:"White"}}>
                <Typography >Log in</Typography>
                </Link>
            </Toolbar>
        </AppBar>
         <Container>
             {children}
         </Container>
        </>
    )
}


export default Layout