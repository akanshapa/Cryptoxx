import { Badge, Box, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from './Loader'
import {server} from '../App.jsx';
import ErrorFile from './ErrorFile.jsx';

const CoinDetail = () => {
     const [coin,setCoin] = useState({});
     const [loading,setLoading]=useState(true);
     const [error,setError]= useState(false);
    
     const [currency,setCurrency]=useState("inr");
     const currencySymbol = currency==="inr"? "₹": currency==='usd'? '$': '€';
     const params= useParams();
     useEffect(()=>{
      const fetchCoin= async()=>{
      try {
        const {data}= await axios.get(`${server}/coins/${params.id}`);
        

        console.log(data);  
      setCoin(data);
      
      setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
      }
      fetchCoin();
      
    },[params.id]);
    if(error){
        return <ErrorFile message={"Error occured in fetching coin"}/>
      }
  return (
    <Container maxW={'container.xl'}>
        {
          loading?<Loader/>:(
            <>
            <Box width={'full'} borderWidth={1}>
             

             
            </Box>
            



            <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
    <HStack>
      <Radio value={"inr"}>INR</Radio>
      <Radio value={"usd"}>USD</Radio>
      <Radio value={"eur"}>EUR</Radio>
    </HStack>
  </RadioGroup>
  <VStack spacing={'4'} p={'16'} alignItems={'flex-start'}>
    <Text fontSize={'small'} alignSelf={'center'} opacity={'0.7'}>
      Last Update On {Date(coin.market_data.last_updated).split('G')[0]}
    </Text>
    <Image src={coin.image.large} width={'16'} height={'16'} objectFit={'contain'} />
    <Stat>
        <StatLabel>{coin.name}</StatLabel>
        <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
        <StatHelpText>
            <StatArrow type= {coin.market_data.price_change_percentage_24h > 0?"increase": "decrease"}  />
            {coin.market_data.price_change_percentage_24h}%
        </StatHelpText>
    </Stat>
    <Badge fontSize={'2xl'} bgColor={'blackAlpha.900'} color={'white'}>
        {`#${coin.market_cap_rank}`}
    </Badge>
     <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}/>
  </VStack>
        <Box w={'full'} p={'4'}>
            <Item item={'Max Supply'} value={coin.market_data.max_supply}/>
            <Item item={'Circulating Supply'} value={coin.market_data.circulating_supply}/>
            <Item item={'Market Cap'} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}/>
            <Item item={'All Time High'} value={`${currencySymbol}${coin.market_data.atl[currency]}`}/>
            <Item item={'All Time Low'} value={`${currencySymbol}${coin.market_data.ath[currency]}`}/>
        </Box>
            </>
          )
        }
      
      
    </Container>
  )
}
const Item =({item,value})=>{
   return <HStack w={'full'} my={'4'} justifyContent={'space-between'}>
        <Text fontFamily={'sans-serif'} letterSpacing={'widest'} fontWeight={'semibold'}>{item}</Text>
        <Text fontFamily={'Noto Sans'}>{value}</Text>
    </HStack>
}
const CustomBar= ({high,low})=>{
    return       <VStack width={'full'} >
            <Progress value={50} colorScheme={'teal'} w={'full'} />
            <HStack justifyContent={'space-between'} w={'full'}>
               <Badge colorScheme={'red'}> {high}</Badge>
               <Text fontSize={'sm'}>24 hour range</Text>
               <Badge colorScheme={'green'}> {low}</Badge>
            </HStack>
        </VStack>
        
}
export default CoinDetail
