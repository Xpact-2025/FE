import pretendard from '../utils/font';
import './../globals.css';
import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${pretendard.variable} flex`}>
      <div className="flex-none">
        <SideBar />
      </div>
      <div className="flex-1">
        <TopBar />
        {children}
      </div>
    </div>
  );
}
