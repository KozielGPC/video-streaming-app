// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   ThumbsUp,
//   ThumbsDown,
//   MoreHorizontal,
//   ChevronDown,
//   MessageSquare,
// } from "lucide-react";

import { Avatar, Button, Input } from "antd";
import { CommentItem } from "../CommentsItem";

export function VideoComments() {
  return (
    <div className="space-y-6">
      {/* Comment Input */}
      <div className="flex gap-4">
        <Avatar className="h-10 w-10">
          {/* <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@you" /> */}
          {/* <AvatarFallback>YO</AvatarFallback> */}
        </Avatar>
        <div className="flex-1 space-y-2">
          <Input
            type="textarea"
            placeholder="Add a comment..."
            className="resize-none min-h-[80px] bg-background border border-border focus:border-vista-blue focus:ring-1 focus:ring-vista-blue/20 transition-all"
          />
          <div className="flex justify-end gap-2">
            <Button variant="link">Cancel</Button>
            <Button className="vista-button">Comment</Button>
          </div>
        </div>
      </div>

      {/* Comment Sorting */}
      <div className="flex items-center gap-2 text-sm">
        <span className="font-medium">1,245 Comments</span>
        <Button variant="link" size="small" className="gap-1">
          <span>Sort by</span>
          {/* <ChevronDown className="h-4 w-4" /> */}
        </Button>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        <CommentItem
          author="GameMaster"
          avatar="/placeholder.svg?height=40&width=40"
          time="2 days ago"
          likes={245}
          content="This video was incredibly helpful! I've been struggling with my aim in FPS games for months, and after applying these techniques, I've already seen a noticeable improvement. The section on crosshair placement was particularly eye-opening."
          replies={2}
        />

        <CommentItem
          author="ProGamer123"
          avatar="/placeholder.svg?height=40&width=40"
          time="1 week ago"
          likes={189}
          content="Great content as always! One thing I'd add is that different games require slightly different approaches to movement. For example, in Valorant, you want to counter-strafe to reset accuracy, while in Apex Legends, you want to maintain momentum with slide jumps."
          replies={5}
        />

        <CommentItem
          author="NewbiePlayer"
          avatar="/placeholder.svg?height=40&width=40"
          time="3 days ago"
          likes={56}
          content="As someone who's just getting into competitive gaming, this was exactly what I needed. The explanations were clear and the examples really helped me understand the concepts. Looking forward to more tutorials like this!"
          replies={0}
        />

        <CommentItem
          author="TechEnthusiast"
          avatar="/placeholder.svg?height=40&width=40"
          time="5 days ago"
          likes={42}
          content="I appreciate how you broke down the technical aspects of aiming. The explanation of sensitivity settings and how they affect muscle memory was particularly useful. Have you considered doing a video specifically on hardware optimization for competitive gaming?"
          replies={3}
        />

        <CommentItem
          author="CasualGamer"
          avatar="/placeholder.svg?height=40&width=40"
          time="1 day ago"
          likes={18}
          content="These tips work even for casual players like me! I don't have much time to practice, but implementing just a few of these techniques has made my gaming sessions much more enjoyable. Thanks for making this accessible to players of all skill levels."
          replies={1}
        />

        {/* Load More Button */}
        <div className="flex justify-center">
          <Button variant="link" className="rounded-full px-6">
            Load more comments
          </Button>
        </div>
      </div>
    </div>
  );
}


