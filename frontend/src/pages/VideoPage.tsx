import type { ReactElement } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  BookmarkPlus,
  MoreHorizontal,
  Calendar,
  Eye,
} from "lucide-react";
import { useState } from "react";
import {
  VideoPlayer,
  VideoComments,
  VideoRecommendations,
} from "@/components/video";
import { getVideoById, getRelatedVideos, mockComments } from "@/mocks/videos";
import { cn } from "@/lib/utils";

function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${Math.floor(views / 1000)}K`;
  }
  return views.toString();
}

function formatLikes(likes: number): string {
  if (likes >= 1000000) {
    return `${(likes / 1000000).toFixed(1)}M`;
  }
  if (likes >= 1000) {
    return `${Math.floor(likes / 1000)}K`;
  }
  return likes.toString();
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatSubscribers(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M subscribers`;
  }
  if (count >= 1000) {
    return `${Math.floor(count / 1000)}K subscribers`;
  }
  return `${count} subscribers`;
}

export function VideoPage(): ReactElement {
  const { id } = useParams<{ id: string }>();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const video = getVideoById(id || "1");
  const relatedVideos = getRelatedVideos(id || "1");

  if (!video) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">
            Video not found
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-2">
            The video you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-block mt-4 px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg hover:opacity-90 transition-opacity"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Video Player */}
        <VideoPlayer
          videoUrl={video.videoUrl}
          posterUrl={video.thumbnailUrl}
          className="aspect-video"
        />

        {/* Video Info */}
        <div className="mt-4 space-y-4">
          {/* Title */}
          <h1 className="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))]">
            {video.title}
          </h1>

          {/* Stats & Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Channel Info */}
            <div className="flex items-center gap-3">
              <Link to={`/channel/${video.channel.id}`}>
                <img
                  src={video.channel.avatarUrl}
                  alt={video.channel.name}
                  className="w-12 h-12 rounded-full object-cover hover:ring-2 hover:ring-[hsl(var(--primary))] transition-all"
                />
              </Link>
              <div>
                <Link
                  to={`/channel/${video.channel.id}`}
                  className="font-semibold text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  {video.channel.name}
                </Link>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  {formatSubscribers(video.channel.subscriberCount)}
                </p>
              </div>
              <button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={cn(
                  "ml-2 px-4 py-2 rounded-full font-medium text-sm transition-all",
                  isSubscribed
                    ? "bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]/80"
                    : "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90"
                )}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Like/Dislike */}
              <div className="flex items-center bg-[hsl(var(--muted))] rounded-full">
                <button
                  onClick={handleLike}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-l-full transition-colors",
                    isLiked
                      ? "text-[hsl(var(--primary))]"
                      : "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]/80"
                  )}
                >
                  <ThumbsUp
                    className={cn("w-5 h-5", isLiked && "fill-current")}
                  />
                  <span className="text-sm font-medium">
                    {formatLikes(video.likes + (isLiked ? 1 : 0))}
                  </span>
                </button>
                <div className="w-px h-6 bg-[hsl(var(--border))]" />
                <button
                  onClick={handleDislike}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-r-full transition-colors",
                    isDisliked
                      ? "text-[hsl(var(--destructive))]"
                      : "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]/80"
                  )}
                >
                  <ThumbsDown
                    className={cn("w-5 h-5", isDisliked && "fill-current")}
                  />
                </button>
              </div>

              {/* Share */}
              <button className="flex items-center gap-2 px-4 py-2 bg-[hsl(var(--muted))] rounded-full text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]/80 transition-colors">
                <Share2 className="w-5 h-5" />
                <span className="text-sm font-medium">Share</span>
              </button>

              {/* Save */}
              <button className="flex items-center gap-2 px-4 py-2 bg-[hsl(var(--muted))] rounded-full text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]/80 transition-colors">
                <BookmarkPlus className="w-5 h-5" />
                <span className="text-sm font-medium">Save</span>
              </button>

              {/* More */}
              <button className="p-2 bg-[hsl(var(--muted))] rounded-full text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]/80 transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-[hsl(var(--muted))] rounded-xl p-4">
            {/* Stats */}
            <div className="flex items-center gap-4 text-sm font-medium text-[hsl(var(--foreground))] mb-2">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {formatViews(video.views)} views
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(video.createdAt)}
              </span>
            </div>

            {/* Description */}
            <div
              className={cn(
                "text-sm text-[hsl(var(--foreground))] whitespace-pre-wrap",
                !isDescriptionExpanded && "line-clamp-3"
              )}
            >
              {video.description}
            </div>

            {video.description.length > 150 && (
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-sm font-medium text-[hsl(var(--foreground))] mt-2 hover:text-[hsl(var(--primary))] transition-colors"
              >
                {isDescriptionExpanded ? "Show less" : "Show more"}
              </button>
            )}
          </div>

          {/* Comments Section */}
          <div className="pt-4 border-t border-[hsl(var(--border))]">
            <VideoComments comments={mockComments} />
          </div>
        </div>
      </div>

      {/* Sidebar - Recommendations */}
      <aside className="lg:w-[400px] xl:w-[420px] flex-shrink-0">
        <VideoRecommendations videos={relatedVideos} />
      </aside>
    </div>
  );
}
