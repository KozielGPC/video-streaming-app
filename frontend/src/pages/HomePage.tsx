import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Play, Clock, Eye, TrendingUp } from "lucide-react";
import { VideoSection } from "@/components/video";
import {
  mockVideos,
  getTrendingVideos,
  getNewReleases,
  getRecommendedVideos,
} from "@/mocks/videos";
import { cn } from "@/lib/utils";

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

export function HomePage(): ReactElement {
  const featuredVideo = mockVideos[0];
  const trendingVideos = getTrendingVideos();
  const newReleases = getNewReleases();
  const recommendedVideos = getRecommendedVideos();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative mb-8">
        <div className="relative aspect-[21/9] max-h-[500px] w-full overflow-hidden rounded-xl">
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0">
            <img
              src={featuredVideo.thumbnailUrl}
              alt={featuredVideo.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="relative h-full flex items-center px-8 md:px-12 lg:px-16">
            <div className="max-w-2xl space-y-4">
              {/* Featured Badge */}
              <div className="inline-flex items-center gap-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-3 py-1 rounded-full text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                Featured Video
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {featuredVideo.title}
              </h1>

              {/* Description */}
              <p className="text-gray-300 text-sm md:text-base line-clamp-2 md:line-clamp-3">
                {featuredVideo.description}
              </p>

              {/* Channel Info */}
              <div className="flex items-center gap-3">
                <img
                  src={featuredVideo.channel.avatarUrl}
                  alt={featuredVideo.channel.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                />
                <div>
                  <p className="text-white font-medium">
                    {featuredVideo.channel.name}
                  </p>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {formatViews(featuredVideo.views)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {formatDuration(featuredVideo.duration)}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center gap-4 pt-2">
                <Link
                  to={`/video/${featuredVideo.id}`}
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 rounded-full",
                    "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
                    "font-semibold text-sm md:text-base",
                    "hover:opacity-90 transition-opacity"
                  )}
                >
                  <Play className="w-5 h-5 fill-current" />
                  Watch Now
                </Link>
                <button
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 rounded-full",
                    "bg-white/10 text-white border border-white/20",
                    "font-semibold text-sm md:text-base",
                    "hover:bg-white/20 transition-colors backdrop-blur-sm"
                  )}
                >
                  + Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Sections */}
      <div className="space-y-8 pb-8">
        <VideoSection
          title="🔥 Trending Now"
          videos={trendingVideos}
        />

        <VideoSection
          title="✨ New Releases"
          videos={newReleases}
        />

        <VideoSection
          title="👤 Recommended For You"
          videos={recommendedVideos}
        />

        {/* All Videos */}
        <VideoSection
          title="📺 Browse All"
          videos={mockVideos.slice(4)}
        />
      </div>
    </div>
  );
}
