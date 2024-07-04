import ExternalLink from '@/components/ui/ExternalLink'
import Clients from '@/components/Clients'
import Products from '@/components/Products'
import Experiences from '@/components/Experience'

function NavBar() {
  return (
    <nav className="text-md my-5 flex justify-center gap-4 sm:my-0 sm:gap-40 sm:text-xl">
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

      <div className="my-20 flex flex-col items-center justify-center gap-10 sm:flex-row">
        <h2 className="text-8xl font-medium sm:text-9xl">Welcome</h2>
        <p className="w-full text-pretty text-justify text-2xl leading-9 tracking-wide sm:w-[500px]">
          Hi, I am <strong>Thomas Cosialls</strong>, a french <strong>full-stack engineer</strong>{' '}
          and world citizen. I am passionate about learning, discovering, connecting with people and
          building things. I am always looking for new challenges, with a strong focus on the{' '}
          <strong>blockchain and web3</strong> spaces.
        </p>
      </div>

      <Clients />
      <Products />
      <Experiences />

      <footer className="content__footer">
        <span>Made by Thomas Cosialls</span>
        <ExternalLink title="Animation inspired by Codrops" url="https://tympanus.net/codrops/" />
      </footer>
    </div>
  )
}
