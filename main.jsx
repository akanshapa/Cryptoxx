import { render } from 'preact';
import  App  from './App.jsx';
import React from 'react'
import { ChakraProvider, theme } from '@chakra-ui/react';

render(
<ChakraProvider theme={theme}>  
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </ChakraProvider>
, document.getElementById('app'))
