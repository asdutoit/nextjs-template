import Image from "next/image";
import Link from "next/link";
import { signIn, auth, providerMap } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to Sign up for an account
            </p>
          </div>
          <form
            action={async (formData) => {
              "use server";
              await signIn("sendgrid", formData);
            }}
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div>
            {Object.values(providerMap).map((provider) => {
              if (provider.id === "sendgrid") return null;
              return (
                <form
                  action={async () => {
                    "use server";
                    await signIn(provider.id);
                  }}
                  key={provider.id}
                >
                  <Button type="submit" variant={"outline"} className="w-full">
                    <span className="mr-2">
                      <Icons.google className="mr-2 h-4 w-4" />
                    </span>
                    <span>Sign Up with {provider.name}</span>
                  </Button>
                </form>
              );
            })}
          </div>
          <div className="mt-4 text-center text-sm">
            Alread have an account?{" "}
            <Link href="/signin" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <Image
          src="/images/signin_image.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        <div className="absolute bg-slate-200/50 bottom-0 right-0 text-black px-2 text-xs">
          Photo by{" "}
          <a href="https://unsplash.com/@rarchitecture_melbourne?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            <span className="font-medium underline">R ARCHITECTURE</span>
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/brown-and-white-wooden-house-near-green-trees-during-daytime-2gDwlIim3Uw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            <span className="font-medium underline">Unsplash</span>
          </a>
        </div>
      </div>
    </div>
  );
}
