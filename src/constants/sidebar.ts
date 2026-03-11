import { BsTrash3 } from "react-icons/bs";
import { GoChecklist, GoGear, GoHome, GoInbox, GoRepo, GoSearch } from "react-icons/go";

export const menus = [
  {
    label: "Search",
    icon: GoSearch,
    tooltip: {
      content: "Find pages & information from your workspace",
      description: "Ctrl+K",
    },
  },
  {
    label: "Home",
    icon: GoHome,
    tooltip: {
      content: "See recent pages, upcoming tasks & more",
    },
  },
  {
    label: "Meeting",
    icon: GoChecklist,
    tooltip: {
      content: "Create & mange meeting notes in one place",
    },
  },
  {
    label: "Inbox",
    icon: GoInbox,
    tooltip: {
      content: "Review notifications & updates",
    },
  },
  {
    label: "Library",
    icon: GoRepo,
    tooltip: {
      content: "View all the pages related to you",
    },
  },
  {
    label: "Settings",
    icon: GoGear,
    tooltip: {
      content: "Manage your account and settings",
    },
  },
  {
    label: "Trash",
    icon: BsTrash3,
    tooltip: {
      content: "View & restore deleted pages",
    },
  },
]