
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