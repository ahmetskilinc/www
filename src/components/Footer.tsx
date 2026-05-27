type FooterProps = {
  domain: string;
};

export default function Footer({ domain }: FooterProps) {
  return (
    <footer className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pt-24 sm:pt-32 text-[10px] sm:text-[11px] font-mono tracking-[0.14em] uppercase text-faint">
      <div className="flex items-center gap-2">
        <span>{domain}</span>
        <span className="text-very-faint">/</span>
        <span>2026</span>
      </div>
      <div className="flex items-center gap-2">
        <span>Set in Fraunces &amp; Geist</span>
        <span className="text-very-faint">/</span>
        <span>Built with Next.js</span>
      </div>
    </footer>
  );
}
