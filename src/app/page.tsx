import SignInButton from "@/components/SignInButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession()
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
  <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>Welcome to Ponder</CardTitle>
        <CardDescription>
          Ponder is a question generation that allows you to create and share question sets.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInButton text="Sign In with Google."/>
        {/* <SignInButton text="Sign In with Linked In."/> */}
      </CardContent>
    </Card>
  </div>
  )
}
