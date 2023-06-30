import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import {
  RiHome2Line,
  RiDashboardLine,
  RiShoppingCartLine,
  RiExchangeDollarLine,
} from "react-icons/ri";

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
        <nav className="bg-gray-800 text-white p-3 md:p-5 fixed z-50 md:w-64 md:h-full hidden md:block">
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
            <li>
              <Link href="/parties">Parties</Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="md:ml-64 p-3">
          <div className=" w-full md:mt-0 mt-10">{children}</div>
        </main>

        <nav className="fixed bottom-0 left-0 w-full md:hidden bg-gray-800 h-12">
          <ul className="flex justify-around py-2 h-full">
            <li className="text-white self-center">
              <Link href="/">
                <RiHome2Line size={24} />
              </Link>
            </li>
            <li className="text-white self-center">
              <Link href="/dashboard">
                <RiDashboardLine size={24} />
              </Link>
            </li>
            <li className="text-white self-center">
              <Link href="/inventory">
                <RiShoppingCartLine size={24} />
              </Link>
            </li>
            <li className="text-white self-center">
              <Link href="/transaction/create">
                <RiExchangeDollarLine size={24} />
              </Link>
            </li>
          </ul>
        </nav>
      </body>
    </html>
  );
}
