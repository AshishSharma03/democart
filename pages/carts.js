import React , {useContext} from 'react'
import {Store} from '../utils/store'
import Layout from  '../components/Layout'
import Link from '../src/Link'
import Image from 'next/image'
import  {Grid, Typography , TableContainer, Table, TableHead ,TableRow ,TableCell,TableBody,Card,List,ListItem,Button,MenuItem,Select} from '@mui/material'

export default function Carts() {
   const { state } = useContext(Store)
 const {
     cart: { cartItems} 
 } = state;


  return (
    <Layout title="Shopping Cart">
            <Typography component={"h1"} variant="h1 ">Your Cart items  </Typography>
            {cartItems.length === 0 ?(<>
                cart is empty
            </>):(
                <>
                 <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        
                          <Link href={`/product/${item.slug}`} >
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                          </Link>
                     
                      </TableCell>

                      <TableCell>
               
                          <Link  href={`/product/${item.slug}`} >
                            <Typography>{item.name}</Typography>
                          </Link>
                    
                      </TableCell>
                      <TableCell align="right">
                        <Select value={item.quantity}>
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="right">
                        <Button variant="contained" color="secondary" >
                          x
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h6">
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : $
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button variant="contained" color="primary" fullWidth>
                    Check Out
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
                </>
            )}
    </Layout>
  )
}
