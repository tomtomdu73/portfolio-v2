import React from 'react'

export default function ExternalLink({ title, url }: { title: string; url: string | undefined }) {
  return (
    <div className="inline-flex gap-1 align-top">
      <a target="_blank" title={title} href={url}>
        {title}
      </a>
      <span className="-mt-1 text-lg text-black-100">&#x2197;</span>
    </div>
  )
}
