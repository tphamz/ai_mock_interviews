import React, { ReactNode } from "react";

type Props = React.ComponentProps<"div"> & {
  children: ReactNode;
  action?: ReactNode;
};
export default function EmptyList({
  children,
  action = <></>,
  ...rest
}: Props) {
  return (
    <div
      className={`w-full h-full flex flex-col justify-center items-center p-20 relative`}
      {...rest}
    >
      <div className="w-full h-full opacity-[0.15] bg-black absolute top-0 left-0 rounded-4xl"></div>
      {children}
      {action}
    </div>
  );
}
