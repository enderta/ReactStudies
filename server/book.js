const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy middleware to avoid CORS issues
app.use('/api', createProxyMiddleware({
    target: 'https://openlibrary.org',
    changeOrigin: true,
}));

// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});