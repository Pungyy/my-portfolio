import Link from "next/link"
function navbar() {
  return (
    <nav>
        <Link className="underline mr-2" href="/contact">Contact</Link>
        <Link className="underline" href="/projects">Projects</Link>
    </nav>
  )
}

export default navbar