import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "RepoLens | AI Repository Analyst",
        template: "%s | RepoLens"
    },
    description: "The definitive intelligence layer for your engineering team. Context-aware repository analysis and visualization powered by Gemini 2.5 Flash.",
    keywords: ["AI", "Code Analysis", "RepoLens", "GitHub", "Developer Tools", "Codebase Visualization", "Gemini AI", "Software Architecture"],
    authors: [{ name: "RepoLens Team" }],
    icons: {
        icon: "/favicon.png",
        apple: "/favicon.png",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://repolens.ai",
        siteName: "RepoLens",
        title: "RepoLens | AI Repository Analyst",
        description: "Transform how you understand code. Instant architectural insights and visualization for any GitHub repository.",
        images: [
            {
                url: "/ai_insight.png",
                width: 1200,
                height: 630,
                alt: "RepoLens AI Insight Dashboard Preview",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "RepoLens | AI Repository Analyst",
        description: "Instant architectural insights and visualization for any GitHub repository.",
        images: ["/ai_insight.png"],
    },
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
