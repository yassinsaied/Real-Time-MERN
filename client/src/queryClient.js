import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 5000, // Re-fetch every 5 seconds
      refetchOnWindowFocus: true, // Re-fetch when window gains focus
    },
  },
});

export default queryClient;
