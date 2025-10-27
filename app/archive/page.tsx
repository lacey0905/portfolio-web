"use client";

import archiveData from "@/data/archive.json";
import Spotlight from "@/app/components/ui/Spotlight";
import BackLink from "./components/BackLink";
import ArchiveHeader from "./components/ArchiveHeader";
import ArchiveTable from "./components/ArchiveTable";

export default function Archive() {
  const projects = archiveData.projects;

  return (
    <div className="relative min-h-screen">
      <Spotlight />
      <div className="box-border bg-navy-500 min-h-screen px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16 max-w-[1280px] mx-auto">
        <BackLink />
        <ArchiveHeader />
        <ArchiveTable projects={projects} />
      </div>
    </div>
  );
}
