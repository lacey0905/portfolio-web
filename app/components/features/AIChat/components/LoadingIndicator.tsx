import Image from "next/image";
import profile from "@/data/profile.json";

export default function LoadingIndicator() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
          <Image
            src="/KIM-HYOUN_GYOUN.jpg"
            alt={profile.name}
            fill
            className="object-cover"
          />
        </div>
        <span className="text-sm font-medium text-slate-300">
          {profile.name}
        </span>
      </div>
      <div className="px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[rgb(94,234,212)]/60"></span>
          <span
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-[rgb(94,234,212)]/60"
            style={{ animationDelay: "0.2s" }}
          ></span>
          <span
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-[rgb(94,234,212)]/60"
            style={{ animationDelay: "0.4s" }}
          ></span>
        </div>
      </div>
    </div>
  );
}
