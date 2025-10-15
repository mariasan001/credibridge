// next.config.js
const makeCSP = () => [

].join("; ");

module.exports = {
  async headers() {
    const csp = makeCSP();
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp }, // ⚠️ En dev puedes usar Report-Only si prefieres
          // { key: "Content-Security-Policy-Report-Only", value: csp },
        ],
      },
    ];
  },
};
