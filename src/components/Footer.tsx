type FooterProps = {
  domain: string;
};

export default function Footer({ domain }: FooterProps) {
  return (
    <footer className="pt-4 text-xs text-zinc-400 dark:text-zinc-500 flex justify-between items-center">
      <div>{domain}</div>
      <div>Built with Next.js</div>
    </footer>
  );
}
