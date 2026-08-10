import { createProxyMiddleware } from 'http-proxy-middleware';

const DOGFOOD_TARGET = 'http://dev.xgjcs.dogfood.lcap.163yun.com';

const apiProxy = createProxyMiddleware({
  target: DOGFOOD_TARGET,
  changeOrigin: true,
  secure: false,
  pathFilter: (pathname) => pathname.startsWith('/api'),
  on: {
    proxyReq: (proxyReq) => {
      proxyReq.setHeader('Cookie', 'wyy_uid=594b21f9-d25b-481f-a6ae-2e355a41824e');
      proxyReq.setHeader('DomainName', 'xgjcs');
      proxyReq.setHeader('LCAP-FRONTEND', 'pc');
      proxyReq.setHeader('TimeZone', 'Asia/Shanghai');
      proxyReq.setHeader('Origin', DOGFOOD_TARGET);
      proxyReq.setHeader('Referer', `${DOGFOOD_TARGET}/dashboard`);
      proxyReq.setHeader('lcap-calllogic-uuid', '/dashboard/0');
    },
  },
});

/** Storybook 下 server.proxy 可能不生效，需把代理插到 middleware 栈最前 */
export function dogfoodApiProxyPlugin() {
  return {
    name: 'storybook-dogfood-api-proxy',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/api')) {
          return apiProxy(req, res, next);
        }
        return next();
      });
    },
  };
}
