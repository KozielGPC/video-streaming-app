"use client";

import VideoCard from "@/components/VideoCard/VideoCard";
import { Tabs, Card, Row, Col } from "antd";
import { useState } from "react";

const { TabPane } = Tabs;

export const VideoTabs = () => {
  const [activeTab, setActiveTab] = useState("recommended");

  return (
    <Card variant="outlined">
      <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
        <TabPane tab="Recommended" key="recommended">
          <Row gutter={[16, 16]}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Col key={i} xs={24} sm={12} md={8} lg={6}>
                <VideoCard />
              </Col>
            ))}
          </Row>
        </TabPane>

        <TabPane tab="Trending" key="trending">
          <Row gutter={[16, 16]}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Col key={i} xs={24} sm={12} md={8} lg={6}>
                <VideoCard trending />
              </Col>
            ))}
          </Row>
        </TabPane>

        <TabPane tab="Following" key="following">
          <Row gutter={[16, 16]}>
            {[1, 2, 3, 4].map((i) => (
              <Col key={i} xs={24} sm={12} md={8} lg={6}>
                <VideoCard />
              </Col>
            ))}
          </Row>
        </TabPane>
      </Tabs>
    </Card>
  );
};
