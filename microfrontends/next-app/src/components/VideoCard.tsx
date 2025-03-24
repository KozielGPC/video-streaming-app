import Image from "next/image";
import { Card, Typography } from "antd";

export type VideoCardProps = {
  title: string;
  thumbnail: string;
  views: number;
  likes?: number;
  orientation?: "vertical" | "horizontal";
};

export function VideoCard(props: VideoCardProps) {
  const { title, thumbnail, views, likes, orientation = "vertical" } = props;
  const isHorizontal = orientation === "horizontal";

  return (
    <Card
      hoverable
      cover={
        <Image
          src={thumbnail}
          priority={true}
          alt="Video Thumbnail"
          // fill={true}
          sizes="100%"
          className="object-cover"
          width={100}
          height={isHorizontal ? 96 : 160}
          // style={{ height: isHorizontal ? 96 : 160, width: "100%" }}
        />
      }
      style={{
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
      }}
    >
      <Card.Meta
        title={<Typography.Title level={5}>{title}</Typography.Title>}
        description={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.875rem",
            }}
          >
            {/* <span>{views} visualizações</span> */}
            <span>1273812738 views</span>
            {likes !== undefined && <span>{likes} likes</span>}
          </div>
        }
      />
    </Card>
  );
}
