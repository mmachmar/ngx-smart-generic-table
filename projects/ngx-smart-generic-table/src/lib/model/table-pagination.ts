export class TablePagination<T> {
  from = 0;
  list: Array<T> = [];
  pages = 0;
  to = 0;
  total = 0;
}
