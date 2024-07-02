import ExternalLink from '@/components/ui/ExternalLink'
import Projects from '@/components/Projects'
import Clients from '@/components/Clients'
import Experience from '@/components/Experience'

const Home = () => {
  return (
    <>
      <nav className="flex justify-center gap-40 text-xl">
        <ExternalLink title="LinkedIn" />
        <ExternalLink title="Github" />
        <ExternalLink title="Work with me" />
      </nav>
      <div className="justify-left flex items-center gap-10">
        <h2 className="text-9xl font-medium">Welcome</h2>
        <p className="w-80 text-justify text-2xl leading-8">
          I am <strong>Thomas Cosialls</strong>, a french sofware engineer and world citizen. I am
          passionate about learning, discovering and building new things. I am always looking for
          new challenges and opportunities to grow.
        </p>
      </div>
      <Clients />
      {/* <Projects /> */}
      {/* <Experience /> */}
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
      </div>
      <footer className="content__footer">
        <span>
          Made by <a href="https://www.instagram.com/codropsss/">@codrops</a>
        </span>
        <a href="https://tympanus.net/codrops/collective/">Subscribe to our frontend news</a>
      </footer>
    </>
  )
}

export default Home
