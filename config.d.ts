export interface Config {
    /** Optional configurations for the Azure WorkItem */
    /**
     * The Project for Azure to fetch WorkItems.
     * @visibility frontend
     */
    azureWorkItem?: {
      /**
       * The Project for Azure to fetch WorkItems.
       * @visibility frontend
       */
      project?: string;
    }
}