import React from 'react'

import AnimatedList from '@/components/ui/AnimatedList'
import { ClientType, getClients } from '@/lib/sanity'

export default async function Clients() {
  const clients = (await getClients()) as ClientType[]

  return (
    <section className="my-40">
      <h3 className="text-right font-mono text-5xl font-semibold">#clients</h3>
      <AnimatedList items={clients} withDate />
    </section>
  )
}
