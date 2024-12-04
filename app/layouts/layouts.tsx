"use client";
import { useUser } from "@clerk/clerk-react";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Accounts", href: "/accounts" },
  { name: "Transaction", href: "/transactions" },
];

const userNavigation = [
  { name: "Your Profile", href: "/dashboard" },
  { name: "Settings", href: "/dashboard" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface BudgetLayoutProps {
  children: ReactNode;
}

export const BudgetLayout = ({ children }: BudgetLayoutProps) => {
  const pathname = usePathname();
  const { user } = useUser();
  console.log(user);
  return (
    <>
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="flex items-center justify-between p-4">
          <div>
            <img src="logo.png" alt="Budget Planner" className="h-8" />
          </div>

          {/* Profile Section */}
          <div className="relative group">
            <button className="flex items-center space-x-2 focus:outline-none">
              <img
                src={user?.imageUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
            </button>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <ul className="py-2">
                <li className="block px-4 py-2 text-sm text-gray-700">
                  
                    {user?.fullName}
                 
                </li>
                <hr className="border-gray-200" />
                {userNavigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300">
                  <SignOutButton>
                    <button>Sign Out</button>
                  </SignOutButton>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-sky-50 text-black">
          <nav className="p-4">
            <ul>
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={classNames(
                      pathname === item.href
                        ? "bg-sky-600 text-white border-l-4 border-sky-600"
                        : "text-sky-800 hover:bg-sky-600 hover:text-white",
                      "block py-2 px-3 rounded"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-grow bg-gray-50 p-6 text-black">{children}</main>
      </div>
    </div>
    <ToastContainer />
    </>
  );
};
