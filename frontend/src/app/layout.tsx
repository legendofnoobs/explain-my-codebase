import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "RepoLens",
    description: "AI-powered repository analysis and visualization",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-slate-950 min-h-screen text-slate-100 antialiased`}>
                <AuthProvider>
                    <SmoothScroll>
                        {children}
                    </SmoothScroll>
                    <Toaster position="bottom-right" />
                </AuthProvider>
            </body>
        </html>
    );
}
