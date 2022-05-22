import  React ,{useState} from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import data from '../utils/data';
import Link from '../src/Link';
import dbConnect from '../utils/db';
import Product from '../model/Product';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Store } from '../utils/store';

 function Index(props) {
   const router = useRouter();
   const { state, dispatch } = useContext(Store);  
   const {products } = props

  const addToCartHandler = async (product)=>{
 
    const {data} = await axios.get(`/api/products/`)
    const ss =  data.find(k => k._id === product._id ? k._id : '')
    console.log(ss)

       
       if(data.countInStock <=0){
      window.alert('Sorry. product is out of stock');
      return;
    }
    dispatch({type: 'CART_ADD_ITEM',payload:{...product,quantity: 1}});
      // router.push('/carts')
  }
  return (
    <div>
    <Layout>
      <div>
        <h1></h1>
    
        <Grid container spacing={2}>
          {products.map((product)=>{
            return(<>
              {console.log(product.key)}
                {/* <spam key={product._id}> */}
                    <Grid item md={4} key={product._id} >
                        <Card>
                          <Link  href={`/product/${product.slug}`} sx={{textDecoration:"none"}}>
                          <CardActionArea>
                              <CardMedia
                              component="img"
                              image={product.image}
                              title={products.name}
                              >
                              </CardMedia>
                              <CardContent>
                                <Typography>
                                  {product.name}
                                </Typography>
                              </CardContent>
                          </CardActionArea>
                          </Link>
                          <CardActions>
                            <Typography sx={{fontWeight:"bold",fontSize:"20px"}}>{product.price * 10}₹</Typography>
                          </CardActions>
                          <Button onClick={()=> addToCartHandler(product)}>
                            Add to cart
                          </Button>
                        </Card>
                    </Grid>
                    {/* </spam> */}
                    </>)
          })}
      
        </Grid>
      </div>
    </Layout>
  </div>
  );
}

function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
}



export async function getServerSideProps(){
  await dbConnect();
  const product = await Product.find({}).lean()
  //  product.map((e) =>  console.log(e.name))
  // console.log(product.name)
  return {props : {products : product.map(convertDocToObj)}};
}

export default Index;