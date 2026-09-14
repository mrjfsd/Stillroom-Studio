export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Studio", href: "#studio" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];


export interface ProjectCardData {
  chip: string;
  title: string;
  sub: string;
  year: string;
}
