import {AlignType, ButtonType, TableColumnSettings, TemplateNames} from 'ngx-smart-generic-table';


export interface Product {
  id: number;
  name: string;
  code: string;
  barcode: string;
  innerHTML?: string;
  compoundName: string;
  price: number;
  status: boolean;
}

enum ProductsTableColumnKey {
  Id = 'id',
  Name = 'name',
  Code = 'code',
  Price = 'price',
  Status = 'status',
  innerHTML = 'innerHTML'
}


export const PRODUCTTABLESETTINGS: TableColumnSettings[] = [
  {
    key: ProductsTableColumnKey.Code,
    title: 'MODEL.PRODUCT.CODE',
    templateName: TemplateNames.TextTemplate,
    width: 'w-15',
    show: true
  },
  {
    key: ProductsTableColumnKey.innerHTML,
    title: 'MODEL.PRODUCT.BARCODE',
    templateName: TemplateNames.FunctionTemplate,
    width: 'w-15',
    icon: 'font-size-15 fas fa-barcode text-success align-middle',
    separator: '-',
    function: 'setNombre',
    tooltip: 'MODEL.PRODUCT.BARCODE',
    align: AlignType.Center,
    show: true
  },
  {
    key: ProductsTableColumnKey.Name,
    title: 'MODEL.PRODUCT.NAME',
    templateName: TemplateNames.TextTemplate,
    width: 'w-25',
    show: true
  },
  {
    key: ProductsTableColumnKey.Price,
    title: 'MODEL.PRODUCT.PRICE',
    templateName: TemplateNames.CurrencyTemplate,
    width: 'w-15',
    show: true,
    align: AlignType.Right
  },
  {
    key: ProductsTableColumnKey.Status,
    title: 'SHARED.TABLE.STATUS',
    templateName: TemplateNames.StatusTemplate,
    width: 'w-15',
    show: true,
    align: AlignType.Center
  },
  {
    key: ProductsTableColumnKey.Id,
    title: 'SHARED.TABLE.ACTIONS',
    templateName: TemplateNames.ActionsTemplate,
    width: 'w-15',
    show: true,
    align: AlignType.Center,
    extra: [
      {
        type: ButtonType.Modal,
        tooltip: 'MODEL.PRODUCT.DETAIL',
        class: 'btn btn-sm btn-info btn-size-30',
        icon: 'far fa-window-restore'
      },
      {
        type: ButtonType.Swal,
        key: ProductsTableColumnKey.Status,
        enable: {
          tooltip: 'MODEL.PRODUCT.DISABLE',
          class: 'btn btn-sm btn-success btn-size-30',
          icon: 'fas fa-lock-open'
        },
        disable: {
          tooltip: 'MODEL.PRODUCT.ENABLE',
          class: 'btn btn-sm btn-danger btn-size-30',
          icon: 'fas fa-lock'
        },
      }
    ]
  }
];
