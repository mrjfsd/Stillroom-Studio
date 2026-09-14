import Image from "next/image";
import { SITE_LOGO } from "@/config/branding";

interface StudioLogoProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

export default function StudioLogo({
  size = 34,
  className = "",
  priority = false,
}: StudioLogoProps) {
  return (
    <Image
      src={SITE_LOGO.src}
      alt={SITE_LOGO.alt}
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className}`}
      priority={priority}
    />
  );
}

export { StudioLogo as StudioMonogram };
