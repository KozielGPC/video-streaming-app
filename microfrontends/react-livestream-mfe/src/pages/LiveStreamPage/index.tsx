import VideoPlayer from '../../components/VideoPlayer';
import Chat from '../../components/Chat';
import StreamerInfo from '../../components/StreamerInfo';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/ui/resizable';

const LiveStreamPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
        <ResizablePanelGroup direction="horizontal" className="h-full w-full">
            <ResizablePanel defaultSize={75}>
                <div className="flex h-full flex-col gap-4 p-4">
                    <div className="flex-grow">
                        <VideoPlayer />
                    </div>
                    <StreamerInfo />
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={25}>
                 <div className="flex h-full flex-col gap-4 p-4">
                    <div className="flex-grow">
                        <Chat />
                    </div>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    </div>
  );
};

export default LiveStreamPage; 