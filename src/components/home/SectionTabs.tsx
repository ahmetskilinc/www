import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Section = { value: string; label: string; content: React.ReactNode };

const triggerClassName = cn(
  "!bg-transparent !border-none !shadow-none",
  "!font-light data-[state=active]:!font-bold transition-all duration-300 ease-out",
  "!text-neutral-400 dark:!text-neutral-400",
  "data-[state=active]:!text-neutral-800 dark:data-[state=active]:!text-neutral-100",
);

export default function SectionTabs({ sections }: { sections: Section[] }) {
  return (
    <Tabs defaultValue={sections[0]?.value}>
      <TabsList className="mb-4 border-none bg-transparent p-0 -ml-[8px]">
        {sections.map(({ value, label }) => (
          <TabsTrigger key={value} value={value} className={triggerClassName}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {sections.map(({ value, content }) => (
        <TabsContent key={value} value={value}>
          <section className="mb-12">{content}</section>
        </TabsContent>
      ))}
    </Tabs>
  );
}
