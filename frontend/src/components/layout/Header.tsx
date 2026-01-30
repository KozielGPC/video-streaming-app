import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, Video, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps): ReactElement {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[hsl(var(--background))] px-4">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-[hsl(var(--accent))] rounded-lg"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Video className="h-6 w-6 text-[hsl(var(--primary))]" />
            <span>StreamHub</span>
          </Link>
        </div>
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            <input
              type="search"
              placeholder="Search videos and streams..."
              className={cn(
                "w-full pl-10 pr-4 py-2 rounded-full",
                "bg-[hsl(var(--secondary))] border border-[hsl(var(--border))]",
                "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
              )}
            />
          </div>
        </div>
        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 hover:bg-[hsl(var(--accent))] rounded-lg"
          >
            <Video className="h-4 w-4" />
            <span>Videos</span>
          </Link>
          <Link
            to="/live"
            className="flex items-center gap-2 px-4 py-2 hover:bg-[hsl(var(--accent))] rounded-lg"
          >
            <Radio className="h-4 w-4 text-red-500" />
            <span>Live</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
