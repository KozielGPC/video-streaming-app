import { Skeleton, Card } from "antd";

export type VideoCardSkeletonProps = {
  orientation?: "horizontal" | "vertical";
};

export default function VideoCardSkeleton(props: VideoCardSkeletonProps) {
  const { orientation = "vertical" } = props;
  return orientation === "vertical" ? (
    <Card hoverable>
      <Skeleton.Image />
      <Skeleton active paragraph={{ rows: 2 }} />
    </Card>
  ) : (
    <Card
      hoverable
      style={{ display: "flex", flexDirection: "row", gap: "8px" }}
    >
      <Skeleton.Image style={{ width: "40%", height: 96 }} />
      <Skeleton active paragraph={{ rows: 2 }} />
    </Card>
  );
}
