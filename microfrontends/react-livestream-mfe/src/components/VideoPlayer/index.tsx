import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Users, Circle } from 'lucide-react';

const VideoPlayer = () => {
  const isLive = true; // In a real app, this would come from props or state

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Stream</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <video controls width="100%" className="rounded-lg">
          {/* In a real app, the source would be dynamic */}
          <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
        
        {/* Live indicator - top right */}
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
          <Circle 
            className={`h-3 w-3 fill-current ${isLive ? 'text-red-500' : 'text-gray-400'}`} 
          />
          <span>{isLive ? 'LIVE' : 'OFFLINE'}</span>
        </div>

        {/* Viewer count - bottom right */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          <Users className="h-4 w-4" />
          <span>1,234</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer; 