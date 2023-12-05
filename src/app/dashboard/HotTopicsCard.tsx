import WordCloud from '@/components/WordCloud'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

interface Props {
  
}

const HotTopicsCard = (props: Props) => {
  return (
    <Card className='col-span-4'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>Hot Topics</CardTitle>
        <CardDescription>
          Click on a topic to start a question set on it. 
        </CardDescription>
      </CardHeader>
      <CardContent className='pl-2'>
        <WordCloud />
      </CardContent>
    </Card>
  )
}

export default HotTopicsCard
