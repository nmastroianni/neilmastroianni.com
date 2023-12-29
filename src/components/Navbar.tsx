import Section from './Section'

const Navbar = () => {
  return (
    <div className="sticky inset-x-0 top-0 z-50 h-16 bg-primary-foreground">
      <Section as="header" width="lg" className="relative">
        Navbar
      </Section>
    </div>
  )
}
export default Navbar
