"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { usePathname, redirect } from "next/navigation";
import { Fragment } from "react";

export default function AppBreadCrumb() {
  const tmp: string[] = [];
  const paths = usePathname()
    .split("/")
    .map((item) => {
      tmp.push(item);
      return { title: item === "" ? "home" : item, path: tmp.join("/") };
    });
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((item, index) => (
          <Fragment key={item.path}>
            {Boolean(index) && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
            <BreadcrumbItem className="hidden md:block">
              {index < paths.length - 1 ? (
                <BreadcrumbLink
                  onClick={() => redirect(item.path || "/")}
                  className="capitalize cursor-pointer"
                >
                  {item.title}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="capitalize">
                  {item.title}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
