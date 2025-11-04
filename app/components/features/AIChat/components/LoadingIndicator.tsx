import Image from "next/image";
import profile from "@/data/profile.json";

export default function LoadingIndicator() {
  return (
    <div className="flex flex-col gap-3 pb-12">
      <div className="flex items-center gap-3">
        <div className="relative h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 overflow-hidden rounded-full">
          <Image
            src="/KIM-HYEON_GYOUN.jpg"
            alt={profile.name}
            fill
            className="object-cover"
          />
        </div>
        <span className="text-sm sm:text-base font-medium text-slate-300">
          {profile.name}
        </span>
      </div>
      <div className="px-3 py-2.5 sm:px-4 sm:py-3">
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-bounce rounded-full bg-[rgb(94,234,212)]/60"></span>
          <span
            className="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-bounce rounded-full bg-[rgb(94,234,212)]/60"
            style={{ animationDelay: "0.2s" }}
          ></span>
          <span
            className="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-bounce rounded-full bg-[rgb(94,234,212)]/60"
            style={{ animationDelay: "0.4s" }}
          ></span>
        </div>
      </div>
    </div>
  );
}
