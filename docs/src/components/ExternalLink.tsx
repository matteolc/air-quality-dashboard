export const ExternalLink = ({
  href,
  name,
}: {
  href: string
  name: string
}) => {
  return (
    <a
      href={href}
      className="text-cornflower-200 hover:ring-offset-cornflower-400 rounded-lg bg-cyan-950 px-2 py-1 hover:bg-cyan-900 hover:ring-1 hover:ring-cyan-950 hover:ring-offset-1"
    >
      {name}
    </a>
  )
}
