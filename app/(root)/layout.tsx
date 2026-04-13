import { BreadcrumbHeader } from "@/components/breadcrumb-header";
import { ModeToggle } from "@/components/mode-toggle";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default async function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen">
            <SidebarProvider>
                <NavigationSidebar />
                <SidebarInset>
                    <div className="flex flex-col flex-1 min-h-screen">
                        <header className="flex items-center justify-between p-2 h-[50px]">
                            <SidebarTrigger />
                            <div className="flex items-center justify-between px-6 py-4 container">
                                <BreadcrumbHeader />
                                <div className="flex items-center gap-2">
                                    <ModeToggle />
                                    <SignedIn>
                                        <UserButton />
                                    </SignedIn>
                                </div>
                            </div>
                        </header>
                        <Separator />
                        <div className="overflow-auto">
                            <div className="flex-1 container py-4 text-accent-foreground">
                                {children}
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}
