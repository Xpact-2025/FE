import Link from "next/link";

const SideBar = () => {
  return (
    <aside className="w-64 bg-[#151515] p-6 h-screen">
      <nav>
        <h2 className="text-xl font-bold mb-6">Xpact</h2>
        <ul className="space-y-6">
          <li>
            <Link href="/" className="hover:text-white/80 transition-colors">
              대시보드
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-white/80 transition-colors">
              내 경험
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-white/80 transition-colors">
              성장 가이드
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-white/80 transition-colors">
              AI 성장 가이드
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-white/80 transition-colors">
              마이 페이지
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
