import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { Medal } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser()

  if (user) redirect("/dashboard")

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <div className="mb-4 flex items-center border shadow-sm p-4 rounded-full uppercase bg-amber-100 text-amber-700">
          <Medal className="size-6 mr-2" />
          Leader in Fuel Management
        </div>
        <h1 className="text-3xl md:text-6xl text-center mb-6">
          Seize Every Moment with Adiona
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-blue-500 to-sky-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
          Drive Smarter. Drive Faster.
        </div>
      </div>
      <div className="text-sm md:text-xl mt-4 max-w-sm md:max-w-2xl text-center mx-auto">
        <p className="text-gray-400">
          &lsquo;The journey of a thousand miles begins with one step.&rsquo;
        </p>
        <p className="text-xs italic">
          - Lao Tzu
        </p>
        <p className="mt-2">
          Ready to take control of your fuel expenses? Get started today - it&lsquo;s free!
        </p>
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">
          Get Started for Free
        </Link>
      </Button>
    </div>
  );
}
