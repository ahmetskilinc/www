import Codepen from "./icons/Codepen";
import Email from "./icons/Email";
import Github from "./icons/Github";
import X from "./icons/X";
import Instagram from "./icons/Instagram";
import LinkedIn from "./icons/LinkedIn";
import Calcom from "./icons/Calcom";
import React, { SVGProps } from "react";
import socialMedia from "@/utilities/socialMedia";
import CustomLink from "./CustomLink";

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

const SocialMedia: React.FC = () => {
  return (
    <div className="flex flex-row items-center gap-5">
      {socialMedia.map((link) => (
        <CustomLink
          key={link.name}
          href={link.link}
          target="_blank"
          className="text-body hover:text-paper transition-colors"
          track={`${link.name}_link_clicked`}
        >
          <p className="sr-only">{link.name}</p>
          <Icon name={link.name} className="h-[18px] w-[18px]" />
        </CustomLink>
      ))}
    </div>
  );
};

export default SocialMedia;
