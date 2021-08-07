// export default [
  
// ]


const defaultInputModile = {
  layout: 'colFormItem',
  tagIcon: 'input',
  label: '手机号',
  vModel: 'mobile',
  formId: 8,
  tag: 'el-input',
  placeholder: '请输入手机号',
  defaultValue: '',
  span: 24,
  style: { width: '100%' },
  clearable: true,
  prepend: '',
  append: '',
  'prefix-icon': 'el-icon-mobile',
  'suffix-icon': '',
  maxlength: 11,
  'show-word-limit': true,
  readonly: false,
  disabled: false,
  required: true,
  changeTag: true,
  regList: [{
    pattern: '/^1(3|4|5|7|8|9)\\d{9}$/',
    message: '手机号格式错误'
  }]
}  

const defaultSearchBox  = {
    layout: 'searchBox',
    vModel: 'search',
    tagIcon: 'row',
    type: 'default',
    justify: 'start',
    align: 'top',
    label: '搜索组件',
    formId: 6,
    layoutTree: true,
    children: [],
    showMoreStateTitle: '收起',
}

const defaultTableBox = {
  layout: 'tableItem',
  vModel: 'plTable',
  tagIcon: 'row',
  type: 'default',
  justify: 'start',
  align: 'top',
  label: '表格组件',
  tableHeight: 570,
  formId: 7,  
  layoutTree: true,
  children: [
    {
      label: '日期1',
      width: '200',
      vModel: 'col_0',
      renderKey: '1',
      tagIcon: 'input',
    },
    {
      label: '姓名2',
      width: '200',
      vModel: 'col_1',
      renderKey: '2',
      tagIcon: 'input',
    },
    {
      label: '地址信息3',
      vModel: 'col_2',
      renderKey: '3',
      tagIcon: 'input',
    }
  ],
}

// 分页
const defaultPagination = {
  layout: 'pagination',
  tagIcon: 'row',
  type: 'default',
  justify: 'start',
  align: 'top',
  label: '分页',
  layoutTree: true,
}

export default [
  defaultSearchBox,
  defaultTableBox,
  // defaultPagination,
  // defaultInputModile,
]
