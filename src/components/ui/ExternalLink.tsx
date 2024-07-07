import React from 'react'

import { ArrowUpRightIcon } from '@heroicons/react/24/solid'

export default function ExternalLink({ title, url }: { title: string; url: string | undefined }) {
  return (
    <div className="inline-flex gap-1 align-top">
      <a target="_blank" title={title} href={url}>
        {title}
      </a>
      <span className="-mt-1 text-lg text-black-100">
        <ArrowUpRightIcon className="h-5 w-5" />
      </span>
    </div>
  )
}
