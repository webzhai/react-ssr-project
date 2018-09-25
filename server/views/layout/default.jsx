import url from 'url';
import React from 'react';
import _ from 'lodash';

const globalStyles = `
  #root {
    background:red
  }
`;

const DefaultLayout = (props) => {
  const assetsManifest = props.assetsManifest;
  const stylesheets = props.stylesheets || [];
  const scripts = props.scripts || [];
  //
  // const styleElements = _.map(stylesheets, (styleSrc, idx) => {
  //   if (!/^(https?:)?\/\//g.test(styleSrc)) {
  //     styleSrc = url.reslove(props.cdn, styleSrc);
  //   }
  //   return (<link key={`styleElement${idx}`} rel="stylesheet" href={styleSrc} />);
  // });
  //
  // const scriptElements = _.map(scripts, (scriptSrc, idx) => {
  //   if (!/^(https?:)?\/\//g.test(scriptSrc)) {
  //     scriptSrc = url.reslove(props.cdn, scriptSrc);
  //   }
  //   return (
  //     <script key={`scriptElement${idx}`} type="text/javascript" src={scriptSrc} charSet="utf-8" />
  //   );
  // });

  const globals = `
    window.__INITIAL__STATE = "${props.initialState}";
  `;

  return (
    <html lang="zh">
    <head>
      <meta name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>{props.title}</title>

      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

      <link rel="stylesheet" href={assetsManifest?.vendor?.css} />
      <link rel="stylesheet" href={assetsManifest?.commons?.css} />

      <script
        type="text/javascript"
        charSet="utf-8"
        dangerouslySetInnerHTML={{ __html: globals }}
      />

      <script type="text/javascript" charSet="utf-8" src={assetsManifest?.runtime?.js} />
      <script type="text/javascript" charSet="unpmnntf-8" src={assetsManifest?.vendor?.js} />
      <script type="text/javascript" charSet="utf-8" src={assetsManifest?.commons?.js} />
      <script type="text/javascript" charSet="utf-8" src={assetsManifest?.index?.js} />
    </head>
    <body>
    {/*{scriptElements}*/}
    <div id="root" dangerouslySetInnerHTML={{ __html: props.children}}></div>
    {/*{scriptElements}*/}
    <script type="text/javascript" src={scripts} charSet="utf-8" />
    </body>
    </html>
  );
};

export default DefaultLayout;
