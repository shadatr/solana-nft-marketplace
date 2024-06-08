// next.config.js
module.exports = {
    images: {
      domains: ["arweave.net"],
    },
    webpack: (config) => {
      config.externals.push("pino-pretty", "lokijs", "encoding");
      return config;
    },
    // async headers() {
    //   return [
    //     {
    //       source: "/(.*)",
    //       headers: [
    //         {
    //           key: "Content-Security-Policy",
    //           value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data:; connect-src 'self' https://still-attentive-mountain.solana-devnet.quiknode.pro; font-src 'self' https://fonts.gstatic.com;",
    //         },
    //       ],
    //     },
    //   ];
    // },
  };
  