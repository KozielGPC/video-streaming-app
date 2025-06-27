import { Avatar, Typography } from "antd";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { CommentEditor } from "../CommentEditor";
import { CommentItem, CommentData } from "../CommentItem";

const { Title } = Typography;

const initialComments: CommentData[] = [
  {
    id: 1,
    author: "GameMaster",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    content:
      "This video was incredibly helpful! I have been struggling with my aim in FPS games for months, and after applying these techniques, I have already seen a noticeable improvement.",
    datetime: formatDistance(new Date("2024-08-10T10:00:00Z"), new Date(), {
      locale: ptBR,
    }),
    likes: 245,
    dislikes: 2,
    replies: [
      {
        id: 3,
        author: "NewbiePlayer",
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content: "Could not agree more! This is a game-changer.",
        datetime: formatDistance(
          new Date("2024-08-10T11:30:00Z"),
          new Date(),
          {
            locale: ptBR,
          }
        ),
        likes: 56,
        dislikes: 1,
        replies: [],
      },
    ],
  },
  {
    id: 2,
    author: "ProGamer123",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    content:
      "Great content as always! One thing I would add is that different games require slightly different approaches to movement.",
    datetime: formatDistance(new Date("2024-08-05T15:30:00Z"), new Date(), {
      locale: ptBR,
    }),
    likes: 189,
    dislikes: 5,
    replies: [],
  },
];

const updateComment = (
  id: number,
  update: (comment: CommentData) => CommentData,
  comments: CommentData[]
): CommentData[] => {
  return comments.map((comment) => {
    if (comment.id === id) {
      return update(comment);
    }
    if (comment.replies) {
      return {
        ...comment,
        replies: updateComment(id, update, comment.replies),
      };
    }
    return comment;
  });
};

export function VideoComments() {
  const [comments, setComments] = useState(initialComments);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");

  const handleLike = (id: number) => {
    setComments((prev) =>
      updateComment(id, (c) => ({ ...c, likes: c.likes + 1 }), prev)
    );
  };

  const handleDislike = (id: number) => {
    setComments((prev) =>
      updateComment(id, (c) => ({ ...c, dislikes: c.dislikes + 1 }), prev)
    );
  };

  const handleReply = (id: number, content: string) => {
    const newReply: CommentData = {
      id: Date.now(),
      author: "You",
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content,
      datetime: formatDistance(new Date(), new Date(), { locale: ptBR }),
      likes: 0,
      dislikes: 0,
      replies: [],
    };
    setComments((prev) =>
      updateComment(id, (c) => ({ ...c, replies: [...(c.replies || []), newReply] }), prev)
    );
  };

  const handleCommentSubmit = () => {
    if (!value) return;

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComments([
        {
          id: Date.now(),
          author: "You",
          avatar:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          content: value,
          datetime: formatDistance(new Date(), new Date(), {
            locale: ptBR,
          }),
          likes: 0,
          dislikes: 0,
          replies: [],
        },
        ...comments,
      ]);
    }, 1000);
  };

  const renderComments = (commentList: CommentData[]) => {
    return commentList.map((comment) => (
      <CommentItem
        key={comment.id}
        comment={comment}
        onLike={handleLike}
        onDislike={handleDislike}
        onReply={handleReply}
      >
        {comment.replies &&
          comment.replies.length > 0 &&
          renderComments(comment.replies)}
      </CommentItem>
    ));
  };

  return (
    <div>
      <Title level={4} style={{ marginBottom: "16px" }}>
        {initialComments.length} Comments
      </Title>
      <div style={{ display: "flex", marginBottom: "24px" }}>
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="You"
          style={{ marginRight: "12px" }}
        />
        <div style={{ flex: 1 }}>
          <CommentEditor
            onChange={(e) => setValue(e.target.value)}
            onSubmit={handleCommentSubmit}
            submitting={submitting}
            value={value}
          />
        </div>
      </div>

      <div>{renderComments(comments)}</div>
    </div>
  );
}


