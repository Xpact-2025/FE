import pretendard from "../utils/font";
import type { Metadata } from "next";
import "./../globals.css";
import SideBar from "../components/SideBar";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

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
        <Header />
        {children}
      </div>
    </div>
  );
}
