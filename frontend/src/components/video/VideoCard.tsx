import { Link } from "react-router-dom";
import { Clock, Eye } from "lucide-react";
import type { Video } from "@/types";
import { cn } from "@/lib/utils";

export interface VideoCardProps {
  video: Video;
  onClick?: () => void;
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
    return `${(views / 1000000).toFixed(1)}M views`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K views`;
  }
  return `${views} views`;
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}

export function VideoCard({ video, onClick, className }: VideoCardProps) {
  return (
    <Link
      to={`/video/${video.id}`}
      onClick={onClick}
      className={cn(
        "group block rounded-xl overflow-hidden transition-transform hover:scale-[1.02]",
        className
      )}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video bg-[hsl(var(--muted))] overflow-hidden rounded-xl">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {formatDuration(video.duration)}
        </div>
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>

      {/* Video Info */}
      <div className="flex gap-3 mt-3">
        {/* Channel Avatar */}
        <img
          src={video.channel.avatarUrl}
          alt={video.channel.name}
          className="w-9 h-9 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="font-medium text-[hsl(var(--foreground))] line-clamp-2 text-sm leading-5">
            {video.title}
          </h3>
          {/* Channel Name */}
          <p className="text-[hsl(var(--muted-foreground))] text-sm mt-1 hover:text-[hsl(var(--foreground))]">
            {video.channel.name}
          </p>
          {/* Views & Time */}
          <div className="flex items-center gap-1 text-[hsl(var(--muted-foreground))] text-sm">
            <Eye className="w-3.5 h-3.5" />
            <span>{formatViews(video.views)}</span>
            <span>•</span>
            <span>{formatTimeAgo(video.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
