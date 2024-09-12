import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";
import { Footer } from "@repo/ui/footer"

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard")
  }
  
  return (
    <main className="flex flex-col">
        <section className="w-full h-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="flex justify-center">
            <div className="self-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Simplify Your Payments
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Fast, secure, and seamless transactions for businesses of all
                  sizes.
                </p>
            </div>
          </div>
        </section>
      <Footer />
    </main>
  );
}
