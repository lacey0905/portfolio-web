import Image from "next/image";

export interface ProjectImageProps {
  src?: string;
  alt: string;
}

export default function ProjectImage({ src, alt }: ProjectImageProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30">
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-slate-800">
          <span className="text-slate-600 text-sm">No Image</span>
        </div>
      )}
    </div>
  );
}
