import React, { useEffect, useState } from 'react'
import axios  from 'axios'
import Loader from './/Loader.jsx';
import {server} from '../App.jsx';
import { Button, Container, HStack, RadioGroup,Radio} from '@chakra-ui/react';
import ErrorFile from './ErrorFile.jsx';
import CardCoin from './CardCoin.jsx';
const Coin = () => {
  const [coins,setCoins] = useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]= useState(false);
  const [page,setPage]=useState(1);
  const [currency,setCurrency]=useState("inr");
  const currencySymbol = currency==="inr"? "₹": currency==='usd'? '$': '€';
  const changePage= (page)=>{
        setPage(page);
        setLoading(true);
  }
  const btns= new Array(132).fill(1);
 
  useEffect(()=>{
    const fetchCoin= async()=>{
    try {
      const {data}= await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
    setCoins(data);
    
    setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
    }
    fetchCoin();
    
  },[currency,page])
  if(error){
    return <ErrorFile message={"Error occured in fetching coin"}/>
  }
  return (
    <Container maxW={'container.xl'}>
       {
        loading? <Loader/>:(
          <>
           <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
    <HStack>
      <Radio value={"inr"}>INR</Radio>
      <Radio value={"usd"}>USD</Radio>
      <Radio value={"eur"}>EUR</Radio>
    </HStack>
  </RadioGroup>
           <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {
              coins.map((i)=>{
                return <CardCoin key={i.id} id={i.id} name={i.name} img={i.image}  symbol={i.symbol} price={i.current_price} currencySymbol={currencySymbol} />
              })
            }
           </HStack>
           <HStack w={'full'} overflowX={'auto'} p={'8'}>
            {
            btns.map((value,index)=> {
             return <Button key={index} bgColor={'blackAlpha.900'} color={'white'} onClick={()=>changePage(index+1)}> {index+1}</Button>
            
            })}
           </HStack>

          </>
        )
       }
    </Container>
  )
}



export default Coin
