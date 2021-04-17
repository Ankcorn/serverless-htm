<h1 align="center">
  Serverless HTM (Hyperscript Tagged Markup)
</h1>
<p align="center">
  <img src="https://i.postimg.cc/DftdB9dt/code.png" width="572" alt="hyperscript tagged markup demo">
</p>

Render html components from aws lambdas by combining [htm](https://github.com/developit) and [vhtml](https://github.com/developit/vhtml).

* **Component Based** - Create reusable snippets of html that can be used together
* **Minimalistic** - Render these snippets of HTML in an AWS lambda function not the client for an optimum user experience
* **Explainable** - No mysterious build steps required that make debugging impossible
* **Accessible** - Create things that can run on any device "For [The Next Billion](https://nextbillionusers.google/) web users"

If you want to learn more about building websites with serverless-htm message me on [twitter](https://twitter.com/thomasankcorn)
## Installation

Download the [serverless-htm](https://www.npmjs.com/package/serverless-htm) from npm

```bash
npm i serverless-htm
```

Serverless HTM wraps the lambda function code and passes the return value into a template to be rendered by a browser.

```javascript
const http = require('tiny-json-http');
const { html, view } = require('serverless-htm');

exports.handler = view(async(event) => {
  const { body } = await http.get('https://ghibliapi.herokuapp.com/films');
  return html`
    <h1>Studio Gibli Films</h1>
    <ul>
      ${body.map(({ name }) => html`<li>${name}</li>`)}
    </ul>
  `;
});
```

## Usage

## API


