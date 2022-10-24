export default function Header() {
  return (
    <header className="flex items-center justify-between py-2">
      <h1 className="text-2xl text-white font-primaryFont font-semibold hover:text-cyan-500 hover:cursor-pointer">
        To-deeds
      </h1>
      <nav>
        <ul className="flex items-center gap-x-4 font-secondaryFont">
          <li className="text-white font-semibold text-sm hover:text-cyan-500 hover:cursor-pointer">
            New Bucket
          </li>
          <li className="text-white font-semibold text-sm hover:text-cyan-500 hover:cursor-pointer">
            Buckets
          </li>
          <li className="text-white font-semibold text-sm hover:text-cyan-500 hover:cursor-pointer">
            About
          </li>
        </ul>
      </nav>
    </header>
  );
}
