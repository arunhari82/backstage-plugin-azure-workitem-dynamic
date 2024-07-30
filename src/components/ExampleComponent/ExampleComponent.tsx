import React, { useState } from 'react';
import { Grid, Link } from '@material-ui/core';
import {
  Page,
  Content,
  TableColumn,
  Table,
  Header,
  HeaderLabel,
} from '@backstage/core-components';
import { TableData } from '../../types';
import { azureWorkItemApiRef } from '../../service/Api';
import { configApiRef, useApi } from '@backstage/core-plugin-api';
import { useAsync } from 'react-use';


export const ExampleComponent = () => {

  const config = useApi(configApiRef);
  var project = config.getOptionalString("azureWorkItem.project");
  const azureWorkItemApi = useApi(azureWorkItemApiRef);

  const [currentProject] = useState(project);

  const columns: TableColumn[] = [
    { title: 'Id', field: 'id' },
    { title: 'Title', field: 'title',render(data: Partial<TableData>) {
      return( <Link href={data.url} target="_blank" style={{
        display: 'flex',
      }}> {data.title!}        
        </Link>) }},
    { title: 'WorkItem Type', field: 'workItemType', },    
    { title: 'State', field: 'state' },
    { title: 'Reason', field: 'reason' },
    { title: 'Assigned To', field: 'assignedTo' },
    { title: 'Created Date', field: 'createdDate'}
  ];


  const { value: workitem } = useAsync(async () => {
      return await azureWorkItemApi.getWorkItems(project!);
  },[project])

  console.log(workitem);
  var data: any[] = [];
  if(workitem) {
      data = workitem.map(workitem => {
          return {  
            id: workitem.id,
            url: workitem.url,
            assignedTo: workitem.fields!["System.AssignedTo"].displayName,
            title: workitem.fields!["System.Title"],
            state: workitem.fields!["System.State"],
            workItemType: workitem.fields!["System.WorkItemType"],
            createdDate: workitem.fields!["System.CreatedDate"],
            reason: workitem.fields!["System.Reason"],
          }
      });
  }
  
  return (

    <Page themeId="tool">
    {<Header title="Welcome to Azure Boards Custom Plugin Demo!" subtitle="Fetch Workitems from Azure Devops Project">
      {/* <HeaderLabel label="Owner" value="Team X" />
      <HeaderLabel label="Lifecycle" value="Alpha" /> */}
    </Header> }
    <Content>
      <Grid container spacing={3} direction="column">
        <Grid item>
         
            <h1>Azure Devops Project : {currentProject}</h1>
          <Table 
              title="Work Items"
              options={{ search: true, paging: false }}
              columns={columns}
              data={data}
            />
        
        </Grid>
      </Grid>
    </Content>
  </Page>
  )

}
