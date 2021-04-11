const htm = require('./dependencies/htm');
const vhtml = require('./dependencies/vhtml');
const buildCacheHeader = require('./utils/caching');

const html = htm.bind(vhtml);

const defaults = {
	Layout: ({ children, scripts = [], styles = [] }) => html`
<html>
	<head>
		${styles.map(stylesheet => html`<link rel="stylesheet" href=${stylesheet} />`)}

	</head>
	<body>
		${scripts.map(script => html`<script src=${script} async></script>`)}
		${children}
	</body>
</html>`,
}

function view(fn, options = {}) {
	return async function handler(event, context) {
		const Layout = options.Layout || defaults.Layout;

		try {
			const result = await fn(event, context);
			return {
				statusCode: 200,
				headers: {
					'cache-control': buildCacheHeader(options.caching),
					'content-type': 'text/html; charset=utf-8'
				},
				body: `<!DOCTYPE html>${html`<${Layout} 
	scripts=${options.scripts}  
	styles=${options.styles}
>${result}<//>`}`
			}
		} catch(e) {
			return {
				statusCode: 500,
				headers: {
					'cache-control': buildCacheHeader(),
					'content-type': 'text/html; charset=utf-8'
				},
				body: `<!DOCTYPE html>${html`<${Layout}>${e.message}<//>`}`
			}
		}
	}
}

module.exports = { html, view };

