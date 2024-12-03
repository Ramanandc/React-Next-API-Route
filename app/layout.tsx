"use client";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({
  children,
  req,
}: Readonly<{
  children: React.ReactNode;
  req: any;
}>) {
  

  return (
    
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Budget Planner - 2024</title>
          <meta
            name="description"
            content="
            A budget planner for 2024
          "
          />
        </head>
        <body>
         {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
