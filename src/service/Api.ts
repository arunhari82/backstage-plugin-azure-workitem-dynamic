import {
  createApiRef,
  FetchApi,
  ConfigApi
} from '@backstage/core-plugin-api';
import { WorkItem } from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";

export interface AzureWorkItemApi {
    getWorkItems(project: string): Promise<WorkItem[]>
}

type Options = {
    configApi: ConfigApi;
    fetchApi: FetchApi;
  };

export const azureWorkItemApiRef = createApiRef<AzureWorkItemApi>({
  id: 'plugin.azure-workitem-backend-dynamic.service'
});

export class AzureWorkItemApiClient implements AzureWorkItemApi {

    private readonly configApi: ConfigApi;
    private readonly fetchApi: FetchApi;

    constructor(options: Options)
    {
        this.configApi = options.configApi;
        this.fetchApi = options.fetchApi;
    }

    async getWorkItems(project: string): Promise<WorkItem[]> {
        const backendUrl = this.configApi.getString('backend.baseUrl');
        const res = await this.fetchApi.fetch(
            `${backendUrl}/api/azure-workitem/workitems/${project}`,
        {
            method: 'GET'
        })
        return res.json();
    }
    
}