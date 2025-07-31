import Header from "@/components/resuable/header";
import { AppSidebar } from "@/components/resuable/app-side-bar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { NavData } from "./_nav-data";
import AppBreadCrumb from "@/components/resuable/app-breadcrumb";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res: any = await isAuthenticated();
  if (!res.data) {
    redirect("/sign-in");
    return <></>;
  }

  return (
    <SidebarProvider>
      <AppSidebar data={NavData} />
      <SidebarInset className="!rounded-l-4xl !m-0">
        <Header
          user={{
            id: res.data.id,
            userId: res.data.publicMetadata.userId,
            email: res.data.emailAddresses[0].emailAddresses,
            name: res.data.firstName + " " + res.data.lastName,
            imageUrl: res.data.imageUrl,
          }}
        >
          <div className="flex flex-1 items-center gap-2">
            <SidebarTrigger className="-ms-1" />
            <div className="max-lg:hidden lg:contents">
              <Separator
                orientation="vertical"
                className="me-2 data-[orientation=vertical]:h-4"
              />
              <AppBreadCrumb />
            </div>
          </div>
        </Header>
        <div className="px-4 @container min-h-[80vh]">
          <div className="w-full max-w-6xl mx-auto h-full">
            <div className="flex flex-col w-full h-full items-center !overflow-hidden px-4 md:px-5 py-10">
              <div className="w-full h-full">{children}</div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
