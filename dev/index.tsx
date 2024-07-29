import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { azureWorkitemDynamicPlugin, AzureWorkitemDynamicPage } from '../src/plugin';

createDevApp()
  .registerPlugin(azureWorkitemDynamicPlugin)
  .addPage({
    element: <AzureWorkitemDynamicPage />,
    title: 'Root Page',
    path: '/azure-workitem-dynamic',
  })
  .render();
