import QuestionsCreation from '@/components/QuestionsCreation'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

export const metadata = {
  title: "Questions | Quiz",
}

const QuestionsPage = async (props: Props) => {
  const session = await getAuthSession()

  if(!session?.user) {
    return redirect('/')
  }

  return <QuestionsCreation />
}

export default QuestionsPage
