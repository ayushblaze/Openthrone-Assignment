const express = require("express");
const cors = require("cors");
const jwt  = require("express-jwt");
const jwks = require("jwks-rsa");
const axios = require("axios");

const app = express();
app.use(cors());

const verifyJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-eetr2xcgmehkm5y5.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "firstApi",
  issuer: "https://dev-eetr2xcgmehkm5y5.us.auth0.com/",
  algorithms: ["RS256"],
}).unless({path: ["/"]});

app.use(verifyJwt);

app.get("/", (req, res) => {
  res.send("Hello from index route");
});

app.get("/protected", (req, res) => {
  res.send("Hello from protected route");
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "internal server error";
  res.status(status).send(message);
});

app.listen(5000, () => console.log("server running on port 5000"));