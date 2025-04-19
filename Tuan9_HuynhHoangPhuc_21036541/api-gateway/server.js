const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const rateLimit = require("express-rate-limit");
const CircuitBreaker = require("opossum");
const retry = require("async-retry");

const app = express();
const port = 3000;

const limiter = rateLimit({
  windowMs: 1000,
  max: 10,
});
app.use(limiter);

const breakerOptions = {
  timeout: 2000, 
  errorThresholdPercentage: 50, 
  resetTimeout: 1000,
};
const createBreaker = (fn) => new CircuitBreaker(fn, breakerOptions);

const services = {
  customers: "http://customer-service:3001",
  orders: "http://order-service:3002",
  products: "http://product-service:3000",
  payments: "http://payment-service:3003",
  inventory: "http://inventory-service:3004",
  shipping: "http://shipping-service:3005",
};

Object.entries(services).forEach(([service, url]) => {
  const proxy = createProxyMiddleware({
    target: url,
    changeOrigin: true,
  });

  const breakerFn = async (req, res) => {
    return new Promise((resolve, reject) => {
      proxy(req, res, (err) => (err ? reject(err) : resolve()));
    });
  };

  const breaker = createBreaker(breakerFn);

  app.use(`/api/${service}/*`, async (req, res, next) => {
    try {
      await retry(
        async () => {
          await breaker.fire(req, res);
        },
        { retries: 3, minTimeout: 100 }
      );
    } catch (err) {
      res.status(500).json({ error: `Service ${service} unavailable` });
    }
  });
});

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
