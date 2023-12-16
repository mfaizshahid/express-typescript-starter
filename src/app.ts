import app from "@src/app_wrapper";
const nodePort = process.env.PORT || 3000;

app.listen(nodePort, () => {
  console.log(`Server running on port: ${nodePort}`);
});
