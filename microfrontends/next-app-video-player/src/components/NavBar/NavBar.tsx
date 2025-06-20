import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { Layout, Typography } from "antd";

const { Header } = Layout;
const { Title } = Typography;

export function Navbar() {
  return (
    <Header style={{ background: "#001529", padding: "0 16px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/">
          <Title level={2} style={{ color: "#ffcd00", margin: 0 }}>
            KoziTube
          </Title>
        </Link>

        <div style={{ flex: 1, maxWidth: "50%" }}>
          <SearchBar />
        </div>

        <Link href="#" style={{ color: "#fff", fontSize: "16px" }}>
          Login
        </Link>
      </div>
    </Header>
  );
}
