import { Flex } from "antd";
import { CustomHeader } from "./Header/Header";
import { PageFooter } from "./Footer/Footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex vertical>
      <CustomHeader />
      {children}
      <PageFooter />
    </Flex>
  );
};
