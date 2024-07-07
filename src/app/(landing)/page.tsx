import ExternalLink from '@/components/ui/ExternalLink'
import Clients from '@/components/Clients'
import Products from '@/components/Products'
import Experiences from '@/components/Experience'
import { FadeIn } from '@/components/ui/FadeIn'

function NavBar() {
  return (
    <nav className="text-md my-5 flex justify-center gap-4 font-mono sm:my-0 sm:gap-40 sm:text-xl">
      <ExternalLink title="LinkedIn" url={process.env.NEXT_PUBLIC_LINKEDIN_URL} />
      <ExternalLink title="Github" url={process.env.NEXT_PUBLIC_GITHUB_URL} />
      <ExternalLink title="Work with me" url={process.env.NEXT_PUBLIC_AGENCY_URL} />
    </nav>
  )
}

export default function Home() {
  return (
    <div className="mx-10">
      <NavBar />

      <div className="my-20 flex flex-col items-center justify-center gap-10 xl:flex-row">
        <h2 className="xl:text-10xl 2xl:text-12xl font-sans text-7xl font-medium sm:text-8xl">
          Welcome
        </h2>
        <p className="w-full max-w-2xl text-pretty text-justify font-mono text-2xl leading-9 tracking-wide xl:w-[500px]">
          Hi, I am <strong>Thomas Cosialls</strong>, a french <strong>full-stack engineer</strong>{' '}
          and world citizen. I am passionate about <strong>learning</strong>,{' '}
          <strong>exploring</strong>, <strong>connecting with people</strong> and{' '}
          <strong>going outside my comfort zone</strong>. I am always looking for new challenges,
          with a particular focus on building in the <strong>blockchain and web3</strong> spaces.
        </p>
      </div>

      <FadeIn>
        <Clients />
      </FadeIn>
      <FadeIn>
        <Products />
      </FadeIn>

      <FadeIn>
        <Experiences />
      </FadeIn>

      <footer className="content__footer font-mono">
        <span>Made by Thomas Cosialls</span>
        <ExternalLink title="Animation inspired by Codrops" url="https://tympanus.net/codrops/" />
      </footer>
    </div>
  )
}
