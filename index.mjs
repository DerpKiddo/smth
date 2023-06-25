import http from 'http';
import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';
import kuler from 'kuler';

const server = http.createServer();
const url = "https://now.gg";
const PORT = process.env.PORT || 8080;

// Create the https agent for the residential proxy
const agent = new HttpsProxyAgent('http://xtristannK8NJ:WzuHjcjinTNh3cC4@proxy.speedproxies.net:12321');

server.on('request', async (req, res) => {
  // Pass the agent to the fetch function to route the request through the proxy
  const asset = await fetch(url + req.url, { agent });
  const body = Buffer.from(await asset.arrayBuffer());
  res.writeHead(asset.status, { "Content-Type": asset.headers.get("content-type").split(";")[0] });
  res.end(body);
});

server.on('listening', () => {
  console.log(kuler(`Server has been started! Listening on port ${PORT}`, "green"));
});

server.listen({ port: PORT });
