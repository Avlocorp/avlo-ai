import { Circle, Flag, PieChart, Rss, Sparkles, Users } from "lucide-react";

export const navigation = [
  {
    href: "/",
    label: "Dashboard",
    icon: PieChart,
  },
  {
    href: "/roadmap",
    label: "Roadmap",
    icon: Flag,
  },
  {
    href: "/dhikr",
    label: "Zikr",
    icon: Circle,
  },
  {
    href: "/sahabah",
    label: "Sahabah",
    icon: Users,
  },
  {
    href: "/achievements",
    label: "Achievements",
    icon: Sparkles,
  },
  {
    href: "/news",
    label: "News",
    icon: Rss,
  },
];
