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
          I am <strong>Thomas Cosialls</strong>, a french <strong>full-stack engineer</strong> and
          world citizen. I am passionate about learning, discovering, connecting with people and
          building things. I am always looking for new challenges, with a strong focus on the{' '}
          <strong>blockchain and web3</strong> spaces.
        </p>
      </div>

      <Clients />
      <Products />
      <Experiences />
      {/* 
      <div className="content__text">
        <p className="right">
          At <strong>Nova</strong>Motion&reg;, our team of creative artists and tech experts work
          together to explore new possibilities. Each project shows our dedication to new ideas and
          high quality, whether it's a commercial, film, or interactive display.
        </p>
        <p className="highlight">
          We believe motion design can tell stories, evoke emotions, and inspire imaginations.
        </p>
        <p>
          Our clients are at the core of everything we do at <strong>Nova</strong>Motion&reg;. We
          pride ourselves on building strong, lasting relationships based on trust, communication,
          and mutual respect. We listen carefully to your needs and goals, ensuring we fully
          understand your vision.{' '}
        </p>
        <p>
          By collaborating closely, we tailor our approach to meet your unique requirements,
          delivering results that exceed expectations. Whether you are a small business or a large
          corporation, we are committed to helping you succeed. With <strong>Nova</strong>
          Motion&reg;, you are not just a client; you are a valued partner in creating exceptional
          visual stories.
        </p>
      </div> */}
      <footer className="content__footer">
        <span>Made by Thomas Cosialls</span>
        <a href="https://tympanus.net/codrops/collective/">Animation inspired by Codrops</a>
      </footer>
    </div>
  )
}
