import type { Video } from "@/types";
import { VideoCard } from "./VideoCard";
import { cn } from "@/lib/utils";

export interface VideoGridProps {
  videos: Video[];
  title?: string;
  className?: string;
}

export function VideoGrid({ videos, title, className }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[hsl(var(--muted-foreground))]">No videos found</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {title && (
        <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
