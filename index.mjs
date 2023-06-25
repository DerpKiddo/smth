import express from "express";
import axios from "axios";

const app = express();

const proxyConfig = {
  host: "proxy.speedproxies.net",
  port: 12321,
  auth: "xtristannK8NJ:WzuHjcjinTNh3cC4",
};

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("http://now.gg", {
      proxy: {
        host: proxyConfig.host,
        port: proxyConfig.port,
        auth: {
          username: proxyConfig.auth.split(":")[0],
          password: proxyConfig.auth.split(":")[1],
        },
      },
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Error fetching website");
  }
});

app.listen(3000, () => {
  console.log("Web proxy listening on port 3000");
});
