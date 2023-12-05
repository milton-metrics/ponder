"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { useForm } from 'react-hook-form'
import { questionsCreationSchema } from '@/schemas/form/questions'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage  } from './ui/form'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { CopyCheck } from 'lucide-react'
import { Separator } from './ui/separator'

type Props = {}

type Input = Zod.infer<typeof questionsCreationSchema>

const QuestionsCreation = (props: Props) => {
  const form = useForm<Input>({
    resolver: zodResolver(questionsCreationSchema),
    defaultValues: {
      amount: 3,
      topic: "",
      type: "open_ended"
    }
  })  

  function onSubmit (input: Input) {
    alert(JSON.stringify(input, null, 2))
  } 

  // Re-renders form when type is changed.
  form.watch()

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card>
        <CardHeader>
          <CardTitle className='text-2x font-bold'>Questions Creation</CardTitle>
          <CardDescription>Choose a topic</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a topic..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Please provide a topic to generate your question set
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Questions</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter an amount..." 
                        {...field} 
                        type='number'
                        min={1}
                        max={10}
                        onChange={e => {
                          form.setValue('amount', parseInt(e.target.value))
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Please provide an amount of questions to generate
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                {/* TODO: Decrease button text size or increase button size to accomodate text. */}
                <Button 
                  onClick={() => {
                    form.setValue('type', 'multiple_choice')
                  }}
                  className='w-1/2 rounded-none rounded-l-lg' 
                  variant={form.getValues("type") === "multiple_choice" ? "default" : "secondary"}
                >
                  <CopyCheck className='w-4 h-4 mr-2' />Multiple Choice
                </Button>
                <Separator orientation="vertical" /> 
                <Button 
                  onClick={() => {
                    form.setValue('type', 'open_ended')
                  }}
                  className='w-1/2 rounded-none rounded-r-lg'
                  variant={form.getValues("type") === "open_ended" ? "default" : "secondary"}
                >
                  <CopyCheck className='w-4 h-4 mr-2' />Open Ended
                </Button>
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default QuestionsCreation