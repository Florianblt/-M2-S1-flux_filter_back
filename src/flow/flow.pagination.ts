import { PaginationOptions } from './../pagination';

export class FlowPagination extends PaginationOptions {
  name: string;
  description: string;
  technologies: string;
  sourceAppName: string;
  targetAppName: string;
}
