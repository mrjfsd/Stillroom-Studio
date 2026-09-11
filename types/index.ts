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


export interface Publication {
  name: string;
  /** Render function for the monochrome SVG icon */
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface ProjectCardData {
  chip: string;
  title: string;
  sub: string;
  year: string;
}
