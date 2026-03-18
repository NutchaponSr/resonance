import { 
  BsArrowUpCircleFill, 
  BsArrowUpRightSquare, 
  BsBell, 
  BsBuilding, 
  BsDownload, 
  BsEmojiSmile, 
  BsGear, 
  BsGlobe, 
  BsPeople, 
  BsPlugin, 
  BsSliders 
} from "react-icons/bs";
import { IconType } from "react-icons/lib";

export enum DialogType {
  ACCOUNT = "ACCOUNT",
  PREFERENCES = "PREFERENCES",
  NOTIFICATIONS = "NOTIFICATIONS",
  CONNECTIONS = "CONNECTIONS",
  GENERAL = "GENERAL",
  PEOPLE = "PEOPLE",
  IMPORT = "IMPORT",
  PUBLIC_PAGES = "PUBLIC_PAGES",
  EMOJI = "EMOJI",
  INTEGRATIONS = "INTEGRATIONS",
  TEAMSPACES = "TEAMSPACES",
  BILLING = "BILLING",
}

export const categoryTypes = ["account", "organization", "billing"] as const;
export type CategoryType = (typeof categoryTypes)[number];

export const categories: Record<CategoryType, string> = {
  account: "Account",
  organization: "Organization",
  billing: "Billing",
}

type SettingDialog = {
  title: string;
  icon?: IconType;
  description: string;
  category: CategoryType;
  richIcon?: boolean;
  hasDocs?: boolean;
}

export const settingDialogs: Record<DialogType, SettingDialog> = {
  [DialogType.ACCOUNT]: {
    title: "Account",
    description: "Manage your account settings",
    category: "account",
  },
  [DialogType.PREFERENCES]: {
    title: "Preferences",
    icon: BsSliders,
    description: "Choose how you want Resonance to look and behave",
    category: "account",
  },
  [DialogType.NOTIFICATIONS]: {
    title: "Notifications",
    icon: BsBell,
    description: "Choose how you want Resonance to look and behave",
    category: "account",
  },
  [DialogType.CONNECTIONS]: {
    title: "Connections",
    icon: BsPlugin,
    description: "Choose how you want Resonance to look and behave",
    category: "account",
  },
  [DialogType.GENERAL]: {
    title: "General",
    icon: BsGear,
    description: "General settings",
    category: "organization",
  },
  [DialogType.PEOPLE]: {
    title: "People",
    icon: BsPeople,
    description: "Manage people in your workspace and their roles",
    category: "organization",
    hasDocs: true,
  },
  [DialogType.IMPORT]: {
    title: "Import",
    icon: BsDownload,
    description: "Import data",
    category: "organization",
  },
  [DialogType.PUBLIC_PAGES]: {
    title: "Public Pages",
    icon: BsGlobe,
    description: "Public page settings",
    category: "organization",
  },
  [DialogType.EMOJI]: {
    title: "Emoji",
    icon: BsEmojiSmile,
    description: "Emoji settings",
    category: "organization",
  },
  [DialogType.INTEGRATIONS]: {
    title: "Integrations",
    icon: BsArrowUpRightSquare,
    description: "Manage integrations",
    category: "organization",
  },
  [DialogType.TEAMSPACES]: {
    title: "Teamspaces",
    icon: BsBuilding,
    description: "Teamspace settings",
    category: "organization",
  },
  [DialogType.BILLING]: {
    title: "Upgrade plan",
    icon: BsArrowUpCircleFill,
    description: "Billing and subscription",
    category: "billing",
    richIcon: true,
  },
};