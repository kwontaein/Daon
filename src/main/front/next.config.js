module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://daon-vta0.onrender.com/api/:path*', // 실제 백엔드 주소
          // destination: 'http://localhost:8080/api/:path*', // 실제 백엔드 주소
        },
      ];
    },
}