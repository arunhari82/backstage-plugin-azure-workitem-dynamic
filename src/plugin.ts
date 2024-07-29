import {
  createPlugin,
  createRoutableExtension,
  configApiRef,
  fetchApiRef,
  createApiFactory
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

import { azureWorkItemApiRef,AzureWorkItemApiClient } from './service/Api';

export const azureWorkitemDynamicPlugin = createPlugin({
  id: 'azure-workitem-dynamic',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: azureWorkItemApiRef,
      deps: {
        configApi: configApiRef,
        fetchApi: fetchApiRef
      },
      factory: ({ configApi, fetchApi }) => {
       return new AzureWorkItemApiClient({ configApi, fetchApi });
      }
    })
  ]
});

export const AzureWorkitemDynamicPage = azureWorkitemDynamicPlugin.provide(
  createRoutableExtension({
    name: 'AzureWorkitemDynamicPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
