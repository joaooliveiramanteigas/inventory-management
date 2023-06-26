import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sweet Delight",
  description: "Best sweet vending service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navigation */}
        <nav className="bg-gray-800 text-white p-3 md:p-5 fixed z-50 w-full md:w-64 h-16 md:h-full">
          <ul className="flex justify-around md:flex-col md:space-y-2">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/inventory">Inventory</Link>
            </li>
            <li>
              <Link href="/transaction">Transactions</Link>
            </li>
          </ul>
        </nav>
        {/* Main Content */}
        <main className="md:ml-64 p-3">
          <div className=" w-full md:mt-0 mt-10">

          {children}
          </div>
        </main>
      </body>
    </html>
  );
}
