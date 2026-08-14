export default function Navbar() {
  return (
    <div className="h-screen max-w-1/2">
      <nav className="bg-primary h-full rounded-r-xl">
        <header className="flex flex-row justify-between">
          <img src="/bucko-white.svg" className="h-auto w-22" />
        </header>
        <ul className="text-secondary flex flex-col p-5">
          <li className="hover:bg-secondary hover:text-primary rounded-md px-2 py-3">
            <a> </a>
          </li>
          <li className="hover:bg-secondary hover:text-primary rounded-md px-2 py-3">
            <a> </a>
          </li>
          <li className="hover:bg-secondary hover:text-primary rounded-md px-2 py-3">
            <a> Teste </a>
          </li>
          <li className="hover:bg-secondary hover:text-primary rounded-md px-2 py-3">
            <a> Teste </a>
          </li>
        </ul>
        <footer></footer>
      </nav>
    </div>
  );
}
