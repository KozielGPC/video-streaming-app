import { Link } from "react-router-dom";
import { Clock, Eye, Flame } from "lucide-react";
import type { Video } from "@/types";
import { cn } from "@/lib/utils";

export interface VideoRecommendationsProps {
  videos: Video[];
  className?: string;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(0)}K`;
  }
  return views.toString();
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "yr", seconds: 31536000 },
    { label: "mo", seconds: 2592000 },
    { label: "wk", seconds: 604800 },
    { label: "d", seconds: 86400 },
    { label: "hr", seconds: 3600 },
    { label: "min", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 && interval.label.length > 2 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}

interface RecommendedVideoCardProps {
  video: Video;
  isTrending?: boolean;
}

function RecommendedVideoCard({ video, isTrending }: RecommendedVideoCardProps) {
  return (
    <Link
      to={`/video/${video.id}`}
      className="group flex gap-2 rounded-lg hover:bg-[hsl(var(--muted))] p-2 transition-colors"
    >
      {/* Thumbnail */}
      <div className="relative w-40 flex-shrink-0 aspect-video rounded-lg overflow-hidden bg-[hsl(var(--muted))]">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Duration Badge */}
        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs font-medium px-1 py-0.5 rounded flex items-center gap-0.5">
          <Clock className="w-2.5 h-2.5" />
          {formatDuration(video.duration)}
        </div>
        {/* Trending Badge */}
        {isTrending && (
          <div className="absolute top-1 left-1 bg-red-500 text-white text-xs font-medium px-1.5 py-0.5 rounded flex items-center gap-0.5">
            <Flame className="w-3 h-3" />
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="flex-1 min-w-0 py-0.5">
        <h4 className="font-medium text-[hsl(var(--foreground))] text-sm line-clamp-2 leading-5">
          {video.title}
        </h4>
        <p className="text-[hsl(var(--muted-foreground))] text-xs mt-1">
          {video.channel.name}
        </p>
        <div className="flex items-center gap-1 text-[hsl(var(--muted-foreground))] text-xs mt-0.5">
          <Eye className="w-3 h-3" />
          <span>{formatViews(video.views)} views</span>
          <span>•</span>
          <span>{formatTimeAgo(video.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
}

export function VideoRecommendations({
  videos,
  className,
}: VideoRecommendationsProps) {
  if (videos.length === 0) {
    return null;
  }

  // Consider videos with more than 1M views as trending
  const getTrendingStatus = (video: Video) => video.views > 1000000;

  return (
    <div className={cn("space-y-2", className)}>
      <h3 className="font-semibold text-[hsl(var(--foreground))] px-2">
        Recommended
      </h3>
      <div className="space-y-1">
        {videos.map((video) => (
          <RecommendedVideoCard
            key={video.id}
            video={video}
            isTrending={getTrendingStatus(video)}
          />
        ))}
      </div>
    </div>
  );
}
