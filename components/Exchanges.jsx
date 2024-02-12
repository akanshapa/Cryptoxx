import React, { useEffect, useState } from 'react'
import axios  from 'axios'
import Loader from './Loader';
import {server} from '../App.jsx';
import { Container, HStack, Heading, Image, Text, VStack} from '@chakra-ui/react';
import ErrorFile from './ErrorFile';
const Exchanges = () => {
  const [exchanges,setExchanges] = useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]= useState(false);
  useEffect(()=>{
    const fetchExchanges= async()=>{
    try {
      const {data}= await axios.get(`${server}/exchanges`);
    setExchanges(data);
    setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
    }
    fetchExchanges();
    
  })
  if(error){
    return <ErrorFile message={"Error occured in exchange"}/>
  }
  return (
    <Container maxW={'container.xl'} >
       {
        loading? <Loader/>:(
          <>
           <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {
              exchanges.map((i)=>{
                return <CardExchange key={i.id} name={i.name} img={i.image} url={i.url} rank={i.trust_score_rank} />
              })
            }
           </HStack>

          </>
        )
       }
    </Container>
  )
}
const CardExchange = ({name,img,url,rank})=>{
  return (
  <a href={url} target={'blank'}>
     <VStack w={'52'} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={"all 0.3s"}
     m={'4'}
     css={{
      "&:hover":{
        transform:"scale(1.1)",
      },
     }}
     >
        <Image src={img} w={'10'} h={'10'} objectFit={'contain'} alt='exchanges'/>
        <Heading size={'md'} noOfLines={'1'}>{rank}</Heading>
        <Text noOfLines={'1'}>{name}</Text>
     </VStack>
  </a>
  )
}
export default Exchanges
