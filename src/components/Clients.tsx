import React from 'react'

import AnimatedList from './AnimatedList'
import { ClientType, getClients } from '@/lib/sanity'

export default async function Clients() {
  const clients = (await getClients()) as ClientType[]

  return (
    <section className="my-40">
      <h3 className="text-right text-5xl font-medium">#clients</h3>
      <AnimatedList items={clients} withDate />
    </section>
  )
}
