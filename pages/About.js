import { Button, Container, Stack } from '@mui/material'
import Head from 'next/head';
import React from 'react'
import Link from '../src/Link';
function About() {
  return (
    <>
    <Head>
        <title>Second page</title>
    </Head>
    <Container>
    <Stack  p={2} >
    <Link href="/" sx={{textDecoration:"none"}}>
    <Button variant='outlined' color='error'>
    Click to back 
    </Button> 
    </Link>
    </Stack>
    </Container>
    </>
  )
}

export default About