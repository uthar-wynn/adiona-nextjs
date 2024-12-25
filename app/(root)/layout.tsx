import { BreadcrumbHeader } from "@/components/breadcrumb-header";
import { ModeToggle } from "@/components/mode-toggle";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { Separator } from "@/components/ui/separator";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default async function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen">
            <NavigationSidebar />
            <div className="flex flex-col flex-1 min-h-screen">
                <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
                    <BreadcrumbHeader />
                    <div className="flex items-center gap-2">
                        <ModeToggle />
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </header>
                <Separator />
                <div className="overflow-auto">
                    <div className="flex-1 container py-4 text-accent-foreground">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
