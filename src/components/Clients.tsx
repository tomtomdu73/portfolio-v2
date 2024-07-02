import React from 'react'

import AnimatedList from './AnimatedList'
import { ClientType, getClients } from '@/lib/sanity'

export default async function Clients() {
  const clients = (await getClients()) as ClientType[]
  console.log(clients)

  return (
    <section className="my-5 text-right">
      <h3 className="text-5xl font-medium">#clients</h3>
      <AnimatedList items={clients} />
    </section>
  )
}
