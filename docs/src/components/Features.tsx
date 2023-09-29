import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'

export function Features() {
  return (
    <section
      id="table-of-contents"
      aria-labelledby="table-of-contents-title"
      className="scroll-mt-12 py-12"
    >
      <Container>
        <SectionHeading number="1" id="table-of-contents-title">
          Features
        </SectionHeading>
        <p className="mt-8 font-display text-4xl font-bold tracking-tight text-slate-900">
          Get a look at all of the content covered in the book. Everything you
          need to know is inside.
        </p>
        <p className="mt-4 text-lg tracking-tight text-slate-700">
          “Everything Starts as a Square” is comprised of 240 tightly edited,
          highly visual pages designed to teach you everything you need to know
          about icon design with no unnecessary filler.
        </p>
      </Container>
    </section>
  )
}
