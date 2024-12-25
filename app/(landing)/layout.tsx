import { Navbar } from "./_components/navbar";


const LandingLayout = ({
    children
}: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <Navbar />
            <main className="pt-40 pb-20">
                {children}
            </main>
        </div>
    );
}

export default LandingLayout;