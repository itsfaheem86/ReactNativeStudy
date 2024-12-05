import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PixelWallpapers from "./components/PexelWallpapers";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PixelWallpapers />
    </QueryClientProvider>
  );
}
