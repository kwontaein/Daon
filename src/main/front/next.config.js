module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://daon-vta0.onrender.com/api/:path*',
        },
      ];
    },
  };