import { useEffect, useRef } from "react";
import * as shaka from "shaka-player/dist/shaka-player.compiled";
import { cn } from "@/lib/utils";

export interface VideoPlayerProps {
  videoUrl: string;
  posterUrl?: string;
  className?: string;
  autoPlay?: boolean;
}

export function VideoPlayer({
  videoUrl,
  posterUrl,
  className,
  autoPlay = true,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<shaka.Player | null>(null);

  useEffect(() => {
    const initPlayer = async () => {
      if (!videoRef.current) return;

      // Install polyfills
      shaka.polyfill.installAll();

      // Check browser support
      if (!shaka.Player.isBrowserSupported()) {
        console.error("Browser not supported for Shaka Player");
        return;
      }

      // Create player instance if not exists
      if (!playerRef.current) {
        playerRef.current = new shaka.Player();

        // Configure error handling
        playerRef.current.addEventListener("error", (event) => {
          console.error("Shaka Player error:", event);
        });
      }

      try {
        // Attach player to video element
        await playerRef.current.attach(videoRef.current);
        console.log("Shaka Player attached successfully");

        // Load the video
        await playerRef.current.load(videoUrl);
        console.log("Video loaded successfully");
      } catch (error) {
        console.error("Error loading video:", error);
      }
    };

    initPlayer();

    // Cleanup on unmount
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy().catch(console.error);
        playerRef.current = null;
      }
    };
  }, [videoUrl]);

  return (
    <div className={cn("relative w-full bg-black rounded-lg overflow-hidden", className)}>
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
        autoPlay={autoPlay}
        poster={posterUrl}
        playsInline
      />
    </div>
  );
}
