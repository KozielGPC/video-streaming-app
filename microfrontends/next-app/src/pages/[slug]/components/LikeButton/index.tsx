"use client";

import { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";

export type NumLikeProps = {
  videoId: number;
  likes: number;
};

export function LikeButton(props: NumLikeProps) {
  const { videoId, likes: initialLikes } = props;
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(initialLikes);

  async function onSubmit() {
    const likeChange = isLiked ? -1 : 1;
    const updatedLikes = currentLikes + likeChange;

    window.localStorage.setItem("isLiked", isLiked ? "false" : "true");
    window.localStorage.setItem("currentLikes", updatedLikes.toString());

    setCurrentLikes(updatedLikes);
    setIsLiked(!isLiked);

    const formData = new FormData();
    formData.append("videoId", videoId.toString());
    // !isLiked ? await likeAction(formData) : await unlikeAction(formData);
  }

  useEffect(() => {
    const storedIsLiked = window.localStorage.getItem("isLiked");
    const storedLikesRaw = window.localStorage.getItem("currentLikes");
    setIsLiked(storedIsLiked === "true");
    const storedLikes = storedLikesRaw ? parseInt(storedLikesRaw) : 0;
    setCurrentLikes(storedLikes > initialLikes ? storedLikes : initialLikes);
  }, [initialLikes]);

  return (
    <Button
      type="text"
      icon={
        isLiked ? <LikeFilled style={{ color: "#1890ff" }} /> : <LikeOutlined />
      }
      onClick={onSubmit}
    >
      <Typography.Text>{currentLikes}</Typography.Text>
    </Button>
  );
}
