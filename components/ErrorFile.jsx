import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const ErrorFile = ({message}) => {
  return (
    <Alert status='error' position={'fixed'} bottom={'4'} left={'50%'} transform={'translateX(-50%)'} width={'container.lg'}>
      <AlertIcon/>
      {message}
    </Alert>
  )
}

export default ErrorFile
