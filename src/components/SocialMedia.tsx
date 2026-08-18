import Codepen from "./icons/Codepen";
import Email from "./icons/Email";
import Github from "./icons/Github";
import X from "./icons/X";
import Instagram from "./icons/Instagram";
import LinkedIn from "./icons/LinkedIn";
import Calcom from "./icons/Calcom";
import React, { SVGProps } from "react";
import CustomLink from "./CustomLink";
import type { Profile } from "@/payload-types";

type IconProps = SVGProps<SVGSVGElement> & { name: string };

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const icons: { [key: string]: React.JSX.Element } = {
    instagram: <Instagram {...props} />,
    linkedin: <LinkedIn {...props} />,
    codepen: <Codepen {...props} />,
    email: <Email {...props} />,
    github: <Github {...props} />,
    x: <X {...props} />,
    calcom: <Calcom {...props} />,
  };

  return icons[name];
};

type SocialMediaProps = {
  socials: NonNullable<Profile["socials"]>;
};

const SocialMedia: React.FC<SocialMediaProps> = ({ socials }) => {
  return (
    <div className="flex flex-row gap-4">
      {socials.map((social) => (
        <CustomLink
          key={social.id ?? social.platform}
          href={social.url}
          target="_blank"
          className="overflow-hidden transition-all text-zinc-900/60 dark:text-zinc-100/60 hover:text-zinc-900/100 dark:hover:text-zinc-100/100"
          track={`${social.platform}_link_clicked`}
        >
          <p className="sr-only">{social.platform}</p>
          <Icon name={social.platform} className="transition-all h-5 w-5" />
        </CustomLink>
      ))}
    </div>
  );
};

export default SocialMedia;
