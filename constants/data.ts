
import { LucideIcon } from 'lucide-react-native'; 
import { icons } from 'lucide-react-native';
interface Setting {
    Icon: LucideIcon;
}

export const settings = [
    {
      title: "My Pieces",
      Icon: icons.Amphora,
    },
    {
      title: "Payments",
      Icon: icons.Wallet,
    },
    {
      title: "Notifications",
      Icon: icons.BellRing,
    },
    {
      title: "Security",
      Icon: icons.Shield,
    },
    {
      title: "Language",
      Icon: icons.Languages,
    },
    {
      title: "Help Center",
      Icon: icons.Info,
    },
    {
      title: "Invite Friends",
      Icon: icons.Users,
    },
  ];

  export const categories = [
    { title: "All", category: "All" },
    { title: "Abstract", category: "Abstract" },
    { title: "Geometric", category: "Geometric" },
    { title: "Minimalist", category: "Minimalist" },
    { title: "Surrealist", category: "Surrealist" },
    { title: "Hyperrealism", category: "Hyperrealism" },
    { title: "Impressionist", category: "Impressionist" },
    { title: "Cubist", category: "Cubist" },
    { title: "Others", category: "Others" },
  ];