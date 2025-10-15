// next.config.js
const makeCSP = () => [
  "default-src 'self'",
  // recaptcha carga JS desde google.com y gstatic.com; algunas libs requieren eval en dev
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.google.com https://www.gstatic.com",
  // el iframe del captcha
  "frame-src https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/",
  // el worker del captcha
  "worker-src 'self' blob: https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/",
  // llamadas a tu API + a donde necesites (añade más si procede)
  "connect-src 'self' http://10.0.32.117:2910 http://10.0.32.54:3004 https://www.google.com https://www.gstatic.com",
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
