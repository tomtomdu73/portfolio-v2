import Image from 'next/image'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline'

import { socialMedia } from '@/data'
import MagicButton from './MagicButton'

const currentYear = new Date().getFullYear()

const Footer = () => {
  return (
    <footer className="w-full pb-10 pt-20" id="contact">
      {/* background grid */}
      <div className="absolute bottom-0 left-0 z-0 min-h-96 w-full">
        <Image
          width={1500}
          height={500}
          src="/footer-grid.svg"
          alt="grid"
          className="max-h-[90vh] w-full opacity-50"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-sunflower-600">your</span> digital presence to the
          next level?
        </h1>
        <p className="my-5 text-center text-white-200 md:mt-10">
          Reach out to me today and let&apos;s discuss how I can help you achieve your goals.
        </p>
        <a href="mailto:contact@jsmastery.pro">
          <MagicButton
            title="Let's get in touch"
            icon={<ArrowLeftEndOnRectangleIcon className="h-6 w-6" />}
            position="right"
          />
        </a>
      </div>
      <div className="z-10 mt-16 flex flex-col items-center justify-between md:flex-row">
        <p className="text-sm font-light md:text-base md:font-normal">
          Copyright © {currentYear} Thomas Cosialls
        </p>

        <div className="flex items-center gap-6 md:gap-3">
          {socialMedia.map((info) => (
            <div
              key={info.id}
              className="saturate-180 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-black-300 bg-black-200 bg-opacity-75 backdrop-blur-lg backdrop-filter"
            >
              <img src={info.img} alt="icons" width={20} height={20} />
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
