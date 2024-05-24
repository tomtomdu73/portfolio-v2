import Image from 'next/image'

import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid'
import { gridItems } from '@/data'
import Section from './ui/Section'

const About = () => {
  return (
    <Section id="about" className="w-full pb-20">
      <BentoGrid className="py-20">
        {gridItems.map((item, i) => (
          <BentoGridItem
            id={item.id}
            key={i}
            title={item.title}
            description={item.description}
            className={item.className}
            img={item.img}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
            spareImg={item.spareImg}
          />
        ))}
      </BentoGrid>
      <div className="flex flex-wrap justify-center gap-6">
        <Image src="next.svg" alt="tech stack" width={150} height={50} />
        <Image src="next.svg" alt="tech stack" width={150} height={50} />
        <Image src="next.svg" alt="tech stack" width={150} height={50} />
        <Image src="next.svg" alt="tech stack" width={150} height={50} />
        <Image src="next.svg" alt="tech stack" width={150} height={50} />
        <Image src="next.svg" alt="tech stack" width={150} height={50} />
        <Image src="next.svg" alt="tech stack" width={150} height={50} />
        <Image src="next.svg" alt="tech stack" width={150} height={50} />
        <Image src="next.svg" alt="tech stack" width={150} height={50} />
        <Image src="next.svg" alt="tech stack" width={150} height={50} />
        <Image src="next.svg" alt="tech stack" width={150} height={50} />
        <Image src="next.svg" alt="tech stack" width={150} height={50} />
      </div>
    </Section>
  )
}

export default About
