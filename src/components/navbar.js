import Link from "next/link";

function Navbar() {
  return (
    <nav className="flex justify-center items-center h-16">
      <ul className="flex space-x-8">
        <li>
          <Link className="text-white hover:underline" href="/">Accueil</Link>
        </li>
        <li>
          <Link className="text-white hover:underline" href="/projects">Projects</Link>
        </li>
        <li>
          <Link className="text-white hover:underline" href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;