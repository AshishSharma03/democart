import  React ,{useState} from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import data from '../utils/data';
import Link from '../src/Link';
import dbConnect from '../utils/db';
import Product from '../model/Product';


 function Index(props) {
  const {products } = props

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
                          <Button>
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