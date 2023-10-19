import { Select, Typography, Space, Divider } from "antd";
import Chat from "../components/chat";

const { Option } = Select;
const { Title } = Typography;

export default function Home() {
  return (
    <>
      <section style={{ textAlign: "center", marginTop: 48, marginBottom: 40 }}>
        <Space align="start">
          <Title level={2} style={{ marginBottom: 0 }}>
            Chat App
          </Title>
        </Space>
      </section>
      <Divider style={{ marginBottom: 60 }} />
      <Chat />
    </>
  );
}
