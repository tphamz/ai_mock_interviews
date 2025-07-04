import Header from "@/components/resuable/header";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res: any = await isAuthenticated();
  if (!res.user) {
    redirect("/sign-in");
    return <></>;
  }
  return (
    <div className="flex flex-col w-full h-full">
      <Header user={res.user} />
      <div className="px-4 md:px-20 lg:px-30 py-5 w-full h-full">
        {children}
      </div>
    </div>
  );
}
