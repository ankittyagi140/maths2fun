import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
};

export default nextConfig;
const withPWA = require('next-pwa')({
  dest: 'public',
  
});

module.exports = withPWA({
 
});