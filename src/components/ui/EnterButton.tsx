import React from 'react'

const EnterButton = ({
  ref,
  onClick,
}: {
  ref: React.MutableRefObject<HTMLDivElement | null>
  onClick: () => void
}) => {
  return (
    <div className="absolute z-[100] cursor-pointer" ref={ref} onClick={onClick}>
      <button className="rounded-xl bg-brand p-5 font-mono text-xl font-bold uppercase text-black-100 ring-brand transition-all duration-200 ease-in-out hover:bg-black-100 hover:text-white">
        Click to enter
      </button>
    </div>
  )
}

export default EnterButton
