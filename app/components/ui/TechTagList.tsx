import TechTag from "./TechTag";

export interface TechTagListProps {
  tags: string[];
  ariaLabel?: string;
}

export default function TechTagList({
  tags,
  ariaLabel = "Technologies used",
}: TechTagListProps) {
  return (
    <ul className="mt-4 flex flex-wrap" aria-label={ariaLabel}>
      {tags.map((tag) => (
        <li key={tag} className="mr-1.5 mt-2">
          <TechTag label={tag} />
        </li>
      ))}
    </ul>
  );
}
