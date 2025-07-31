import { NavProp, SideBarProps } from "@/components/resuable/app-side-bar";
import {
  LayoutDashboard,
  MessagesSquare,
  SquareChartGantt,
} from "lucide-react";

export const NavData: NavProp[] = [
  {
    title: "",
    items: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <LayoutDashboard />,
      },
      {
        title: "Interviews",
        path: "/interviews",
        icon: <MessagesSquare />,
      },
      {
        title: "Feedback",
        path: "/feedback",
        icon: <SquareChartGantt />,
      },
    ],
  },
];
