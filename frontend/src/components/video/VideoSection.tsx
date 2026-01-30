import type { Video } from "@/types";
import { VideoGrid } from "./VideoGrid";
import { cn } from "@/lib/utils";

export interface VideoSectionProps {
  title: string;
  videos: Video[];
  className?: string;
}

export function VideoSection({ title, videos, className }: VideoSectionProps) {
  return (
    <section className={cn("mb-8", className)}>
      <VideoGrid videos={videos} title={title} />
    </section>
  );
}
