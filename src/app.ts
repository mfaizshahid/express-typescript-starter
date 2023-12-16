import app from "@src/app_wrapper";
import { env } from "@src/config";

app.listen(env.port, () => {
  console.log(`Server running on port: ${env.port}`);
});
