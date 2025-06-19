// import { Geist, Geist_Mono } from "next/font/google";
// import { StudentPortalSidebar } from "@/components/studentPortal/StudentPortalSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";

// const geistSans = Geist({
//     variable: "--font-geist-sans",
//     subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//     variable: "--font-geist-mono",
//     subsets: ["latin"],
// });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body className={"min-w-screen min-h-screen bg-background font-sans antialiased"}>
                    <SidebarProvider>
                            <main className="flex-1">{children}</main>                        
                    </SidebarProvider>
            </body>
        </html>
    );
}
