import { Avatar, Tooltip, Typography } from "antd";
import {
  LikeOutlined,
  LikeFilled,
  DislikeOutlined,
  DislikeFilled,
} from "@ant-design/icons";
import React, { useState } from "react";
import { CommentEditor } from "../CommentEditor";

const { Text, Paragraph } = Typography;

export interface CommentData {
  id: number;
  author: string;
  avatar: string;
  content: React.ReactNode;
  datetime: string;
  likes: number;
  dislikes: number;
  replies?: CommentData[];
}

interface CommentItemProps {
  comment: CommentData;
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  onReply: (id: number, content: string) => void;
  children?: React.ReactNode;
}

export function CommentItem({
  comment,
  onLike,
  onDislike,
  onReply,
  children,
}: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [action, setAction] = useState<"liked" | "disliked" | null>(null);

  const handleLike = () => {
    onLike(comment.id);
    setAction("liked");
  };

  const handleDislike = () => {
    onDislike(comment.id);
    setAction("disliked");
  };

  const handleReplySubmit = () => {
    onReply(comment.id, replyContent);
    setReplyContent("");
    setIsReplying(false);
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={handleLike} style={{ cursor: "pointer" }}>
        {action === "liked" ? <LikeFilled /> : <LikeOutlined />}
        <span style={{ paddingLeft: 8 }}>{comment.likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={handleDislike} style={{ cursor: "pointer" }}>
        {action === "disliked" ? <DislikeFilled /> : <DislikeOutlined />}
        <span style={{ paddingLeft: 8 }}>{comment.dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to" onClick={() => setIsReplying(!isReplying)}>
      Reply to
    </span>,
  ];

  return (
    <div style={{ display: "flex", marginBottom: "16px" }}>
      <Avatar
        src={comment.avatar}
        alt={comment.author}
        style={{ marginRight: "12px" }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Text strong style={{ marginRight: "8px" }}>
            {comment.author}
          </Text>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            {comment.datetime}
          </Text>
        </div>
        <Paragraph>{comment.content}</Paragraph>
        <div style={{ display: "flex", gap: "16px" }}>{actions}</div>

        {isReplying && (
          <div style={{ marginTop: "16px" }}>
            <CommentEditor
              onChange={(e) => setReplyContent(e.target.value)}
              onSubmit={handleReplySubmit}
              submitting={false}
              value={replyContent}
            />
          </div>
        )}
        {children && <div style={{ marginTop: "16px" }}>{children}</div>}
      </div>
    </div>
  );
} 