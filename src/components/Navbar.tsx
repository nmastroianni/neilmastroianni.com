import { createClient } from '@/prismicio'
import Section from './Section'
import { asText } from '@prismicio/client'

const Navbar = async () => {
  const client = createClient()
  const settings = await client.getSingle('settings')
  return (
    <div className="sticky inset-x-0 top-0 z-50 h-16 bg-primary-foreground">
      <Section
        as="header"
        width="xl"
        className="justify-start py-4 md:py-4 lg:py-6"
      >
        <div className="flex items-center">
          {asText(settings.data.site_title)}
        </div>
      </Section>
    </div>
  )
}
export default Navbar
