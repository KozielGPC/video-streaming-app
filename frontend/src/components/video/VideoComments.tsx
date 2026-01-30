import { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageSquare, Send } from "lucide-react";
import type { Comment } from "@/types";
import { cn } from "@/lib/utils";

export interface VideoCommentsProps {
  comments: Comment[];
  onAddComment?: (content: string) => void;
  className?: string;
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

interface CommentItemProps {
  comment: Comment;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onReply: (id: string, content: string) => void;
  depth?: number;
}

function CommentItem({
  comment,
  onLike,
  onDislike,
  onReply,
  depth = 0,
}: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      onLike(comment.id);
      setLiked(true);
      if (disliked) setDisliked(false);
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      onDislike(comment.id);
      setDisliked(true);
      if (liked) setLiked(false);
    }
  };

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent);
      setReplyContent("");
      setIsReplying(false);
    }
  };

  return (
    <div className={cn("flex gap-3", depth > 0 && "ml-12 mt-4")}>
      <img
        src={comment.author.avatarUrl}
        alt={comment.author.name}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-[hsl(var(--foreground))] text-sm">
            {comment.author.name}
          </span>
          <span className="text-[hsl(var(--muted-foreground))] text-xs">
            {formatTimeAgo(comment.createdAt)}
          </span>
        </div>
        <p className="text-[hsl(var(--foreground))] text-sm mt-1 whitespace-pre-wrap">
          {comment.content}
        </p>
        {/* Actions */}
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={handleLike}
            className={cn(
              "flex items-center gap-1 text-sm transition-colors",
              liked
                ? "text-[hsl(var(--primary))]"
                : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            )}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{comment.likes + (liked ? 1 : 0)}</span>
          </button>
          <button
            onClick={handleDislike}
            className={cn(
              "flex items-center gap-1 text-sm transition-colors",
              disliked
                ? "text-[hsl(var(--destructive))]"
                : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            )}
          >
            <ThumbsDown className="w-4 h-4" />
            <span>{comment.dislikes + (disliked ? 1 : 0)}</span>
          </button>
          {depth < 2 && (
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center gap-1 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Reply</span>
            </button>
          )}
        </div>
        {/* Reply Input */}
        {isReplying && (
          <div className="flex gap-2 mt-3">
            <input
              type="text"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Add a reply..."
              className="flex-1 bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] rounded-full px-4 py-2 text-sm border border-[hsl(var(--border))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleReplySubmit();
              }}
            />
            <button
              onClick={handleReplySubmit}
              disabled={!replyContent.trim()}
              className="p-2 rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        )}
        {/* Nested Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                onLike={onLike}
                onDislike={onDislike}
                onReply={onReply}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function VideoComments({
  comments: initialComments,
  onAddComment,
  className,
}: VideoCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLike = (id: string) => {
    const updateComments = (commentList: Comment[]): Comment[] => {
      return commentList.map((comment) => {
        if (comment.id === id) {
          return { ...comment, likes: comment.likes + 1 };
        }
        if (comment.replies) {
          return { ...comment, replies: updateComments(comment.replies) };
        }
        return comment;
      });
    };
    setComments(updateComments(comments));
  };

  const handleDislike = (id: string) => {
    const updateComments = (commentList: Comment[]): Comment[] => {
      return commentList.map((comment) => {
        if (comment.id === id) {
          return { ...comment, dislikes: comment.dislikes + 1 };
        }
        if (comment.replies) {
          return { ...comment, replies: updateComments(comment.replies) };
        }
        return comment;
      });
    };
    setComments(updateComments(comments));
  };

  const handleReply = (id: string, content: string) => {
    const newReply: Comment = {
      id: `reply-${Date.now()}`,
      content,
      author: {
        id: "current-user",
        name: "You",
        avatarUrl: "https://picsum.photos/seed/currentuser/100/100",
      },
      likes: 0,
      dislikes: 0,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    const addReply = (commentList: Comment[]): Comment[] => {
      return commentList.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }
        if (comment.replies) {
          return { ...comment, replies: addReply(comment.replies) };
        }
        return comment;
      });
    };

    setComments(addReply(comments));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newCommentObj: Comment = {
        id: `comment-${Date.now()}`,
        content: newComment,
        author: {
          id: "current-user",
          name: "You",
          avatarUrl: "https://picsum.photos/seed/currentuser/100/100",
        },
        likes: 0,
        dislikes: 0,
        createdAt: new Date().toISOString(),
        replies: [],
      };

      setComments([newCommentObj, ...comments]);
      setNewComment("");
      setIsSubmitting(false);
      onAddComment?.(newComment);
    }, 500);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
        {comments.length} Comments
      </h3>

      {/* Add Comment Form */}
      <div className="flex gap-3">
        <img
          src="https://picsum.photos/seed/currentuser/100/100"
          alt="Your avatar"
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 space-y-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            className="w-full bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] rounded-lg px-4 py-3 text-sm border border-[hsl(var(--border))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] resize-none"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setNewComment("")}
              className="px-4 py-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim() || isSubmitting}
              className="px-4 py-2 text-sm bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              {isSubmitting ? "Posting..." : "Comment"}
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onLike={handleLike}
            onDislike={handleDislike}
            onReply={handleReply}
          />
        ))}
      </div>
    </div>
  );
}
