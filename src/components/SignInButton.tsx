"use client"

import React from 'react'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'

type Props = {
  text: string
  provider?: string
}

const SignInButton = ({text}: Props) => {
  return (
    // TODO: Add a dropdown with google logo/linkedin button logos. 

    <Button onClick={() =>{
      signIn('google').catch(console.error)
    }}>
      {text}
    </Button>
  )
}

export default SignInButton