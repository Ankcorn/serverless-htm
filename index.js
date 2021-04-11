const htm = require('./dependencies/htm');
const vhtml = require('./dependencies/vhtml');
const buildCacheHeader = require('./utils/caching');

const html = htm.bind(vhtml);

const defaults = {
	Layout: ({ children}) => html`<html><body>${children}</children></html>`,
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
				body: `<!DOCTYPE html>${html`<${Layout}>${result}<//>`}`
			}
		} catch(e) {
			return {
				statusCode: 500,
				headers: {
					'cache-control': buildCacheHeader(),
					'content-type': 'text/html; charset=utf-8'
				},
				body: `<!DOCTYPE html>${html`<${Layout} body=${e.message} />`}`
			}
		}
	}
}

module.exports = { html, view };

