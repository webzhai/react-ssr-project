import React from 'react';
import DefaultLayout from '@server/views/layout/default'

const HomePage = (props) => {
  const { assetsManifest } = props;
  const stylesheets = [assetsManifest.index.css]||'';
  const scripts = [assetsManifest.index.js]||'';

  return (
    <DefaultLayout {...props} stylesheets={stylesheets} scripts={scripts} />
  );
};

export default HomePage;
