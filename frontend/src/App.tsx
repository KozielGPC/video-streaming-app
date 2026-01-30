import type { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/HomePage";
import { VideoPage } from "@/pages/VideoPage";
import { LivestreamListPage } from "@/pages/LivestreamListPage";
import { LivestreamPage } from "@/pages/LivestreamPage";

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="video/:id" element={<VideoPage />} />
          <Route path="live" element={<LivestreamListPage />} />
          <Route path="live/:id" element={<LivestreamPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
