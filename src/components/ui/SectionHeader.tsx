type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <h2 className="font-display text-4xl leading-tight text-[#f8ecd0] md:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-[#f8ecd0]/70 md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
