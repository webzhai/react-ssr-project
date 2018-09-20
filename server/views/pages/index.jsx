import React from 'react';
import DefaultLayout from '../layout/default'
// import DefaultLayout from '@server/views/layout/default'

const HomePage = (props) => {
  // const { assetsManifest } = props;
  // const stylesheets = [assetsManifest.index.css]||'';
  // const scripts = [assetsManifest.index.js]||'';

  return (
    [<div>hehe</div>,
    // <DefaultLayout {...props} stylesheets={stylesheets} scripts={scripts} />
    <DefaultLayout />]
  );
};

export default HomePage;
