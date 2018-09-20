// import url from 'url';
import React from 'react';
// import _ from 'lodash';

const globalStyles = `
  .loader-container {
    position: fixed;
    left: 0;
    top: 40%;
    width: 100%;
    height: 52px;
    margin-top: -26px;
  }

  .loader,
  .loader:after {
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
  .loader {
    margin: 0 auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 5px solid rgba(219, 182, 124, 0.2);
    border-right: 5px solid rgba(219, 182, 124, 0.2);
    border-bottom: 5px solid rgba(219, 182, 124, 0.2);
    border-left: 5px solid #dbb67c;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const DefaultLayout = (props) => {
  const assetsManifest = props.assetsManifest;
  // const stylesheets = props.stylesheets || [];
  // const scripts = props.scripts || [];
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
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>{props.title}</title>

      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

      {/*<link rel="stylesheet" href={assetsManifest.vendor.css} />*/}
      {/*<link rel="stylesheet" href={assetsManifest?.commons?.css} />*/}

      <script
        type="text/javascript"
        charSet="utf-8"
        dangerouslySetInnerHTML={{ __html: globals }}
      />

      {/*<script type="text/javascript" charSet="utf-8" src={assetsManifest.runtime.js} />*/}
      {/*<script type="text/javascript" charSet="unpmnntf-8" src={assetsManifest.vendor.js} />*/}
      {/*<script type="text/javascript" charSet="utf-8" src={assetsManifest?.commons?.js} />*/}
      <script type="text/javascript" charSet="utf-8" src={assetsManifest.index.js} />
    </head>
    <body>
    <div id="root" style={{ height: '100%' }}>
      <div className="loader-container">
        <div className="loader">加载中...</div>
      </div>
      {props.children}
    </div>
    {/*{scriptElements}*/}
    </body>
    </html>
  );
};

export default DefaultLayout;
