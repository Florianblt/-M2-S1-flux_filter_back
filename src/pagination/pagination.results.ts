export abstract class PaginationResult<PaginationEntity> {
  results: PaginationEntity[];
  total: number;
  next?: string;
  previous?: string;
}
