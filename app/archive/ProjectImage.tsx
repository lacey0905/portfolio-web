"use client";

interface ProjectImageProps {
  src: string;
  alt: string;
}

export default function ProjectImage({ src, alt }: ProjectImageProps) {
  return (
    <div className="project-image">
      <img
        src={src}
        alt={alt}
        onError={(e) => {
          e.currentTarget.src = "/images/placeholder.jpg";
        }}
      />
    </div>
  );
}
