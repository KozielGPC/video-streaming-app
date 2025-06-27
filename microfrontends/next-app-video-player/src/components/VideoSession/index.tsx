import { VideosList } from "@/components/VideosList";
import { Flex, Typography } from "antd";

import { ArrowRightOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

const boxStyle: React.CSSProperties = {
  width: "100%",
  height: 80,
};

export const VideoSession = ({ title }: { title: string }) => {
  return (
    <Flex vertical>
      <Flex justify="space-between" style={boxStyle} align="flex-end">
        <Title level={2}>{title}</Title>
        <Text>
          Ver tudo <ArrowRightOutlined />
        </Text>
      </Flex>
      <VideosList search={""} />
    </Flex>
  );
};
