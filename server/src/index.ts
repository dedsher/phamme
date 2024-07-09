import server from "./app";

const port = process.env.NODE_PORT || 3000;

try {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error("Error connecting server:", error);
}
