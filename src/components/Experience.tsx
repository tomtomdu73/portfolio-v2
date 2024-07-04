import AnimatedList from './AnimatedList'
import { ExperienceType, getExperiences } from '@/lib/sanity'

export default async function Experiences() {
  const experiences = (await getExperiences()) as ExperienceType[]

  return (
    <section className="my-40">
      <h3 className=" text-right text-5xl font-medium">#experiences</h3>
      <AnimatedList items={experiences} withDate isExperience />
    </section>
  )
}
