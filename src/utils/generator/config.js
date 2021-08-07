export const formConf = {
  formRef: 'elForm',
  formModel: 'formData',
  size: 'mini',
  labelPosition: 'right',
  labelWidth: 130,
  formRules: 'rules',
  gutter: 0,
  disabled: false,
  span: 24,
  formBtns: true
}

export const inputEle = {
    label: '单行文本',
    tag: 'el-input',
    tagIcon: 'input',
    placeholder: '请输入',
    defaultValue: undefined,
    span: 8, // 默认占8个栅格
    labelWidth: null,
    style: { width: '100%' },
    clearable: true,
    prepend: '',
    append: '',
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false,
    required: false,
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/input'
  }

export const selectEle = {
    label: '下拉选择',
    tag: 'el-select',
    tagIcon: 'select',
    placeholder: '请选择',
    defaultValue: undefined,
    span: 8, // 默认占8个栅格
    labelWidth: null,
    style: { width: '100%' },
    clearable: true,
    disabled: false,
    required: false,
    filterable: false,
    multiple: false,
    options: [{
      label: '选项一',
      value: 1
    }, {
      label: '选项二',
      value: 2
    }],
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/select'
  }

export const operationBtns = {
  label: '按钮组',
  layout: 'operationBtnArr',
  tagIcon: 'button',
  justify: 'center',
  children: [
    {
      label: '增',
      type: 'success',
      size: 'mini',
      tagIcon: 'button',
      vModel: 'add',
      category: 'default',
    },
    {
      label: '删',
      type: 'danger',
      size: 'mini',
      tagIcon: 'button',
      vModel: 'removeFunc',
      category: 'default',
    },
    {
      label: '改',
      type: 'warning',
      size: 'mini',
      tagIcon: 'button',
      vModel: 'update',
      category: 'default',
    },
    {
      label: '查',
      type: 'primary',
      size: 'mini',
      tagIcon: 'button',
      vModel: 'loadData',
      category: 'default',
    }
  ]
}

// 输入型组件
export const inputComponents = [
  inputEle,
  {
    label: '多行文本',
    tag: 'el-input',
    tagIcon: 'textarea',
    type: 'textarea',
    placeholder: '请输入',
    defaultValue: undefined,
    span: 8,
    labelWidth: null,
    autosize: {
      minRows: 4,
      maxRows: 4
    },
    style: { width: '100%' },
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false,
    required: true,
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/input'
  },
  {
    label: '密码',
    tag: 'el-input',
    tagIcon: 'password',
    placeholder: '请输入',
    defaultValue: undefined,
    span: 8,
    'show-password': true,
    labelWidth: null,
    style: { width: '100%' },
    clearable: true,
    prepend: '',
    append: '',
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false,
    required: true,
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/input'
  },
  {
    label: '计数器',
    tag: 'el-input-number',
    tagIcon: 'number',
    placeholder: '',
    defaultValue: undefined,
    span: 8,
    labelWidth: null,
    min: undefined,
    max: undefined,
    step: undefined,
    'step-strictly': false,
    precision: undefined,
    'controls-position': '',
    disabled: false,
    required: true,
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/input-number'
  }
]

// 选择型组件
export const selectComponents = [
  selectEle,
  {
    label: '级联选择',
    tag: 'el-cascader',
    tagIcon: 'cascader',
    placeholder: '请选择',
    defaultValue: [],
    span: 8,
    labelWidth: null,
    style: { width: '100%' },
    props: {
      props: {
        multiple: false
      }
    },
    'show-all-levels': true,
    disabled: false,
    clearable: true,
    filterable: false,
    required: true,
    options: [{
      id: 1,
      value: 1,
      label: '选项1',
      children: [{
        id: 2,
        value: 2,
        label: '选项1-1'
      }]
    }],
    dataType: 'dynamic',
    labelKey: 'label',
    valueKey: 'value',
    childrenKey: 'children',
    separator: '/',
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/cascader'
  },
  {
    label: '单选框组',
    tag: 'el-radio-group',
    tagIcon: 'radio',
    defaultValue: undefined,
    span: 8,
    labelWidth: null,
    style: {},
    optionType: 'default',
    border: false,
    size: 'medium',
    disabled: false,
    required: true,
    options: [{
      label: '选项一',
      value: 1
    }, {
      label: '选项二',
      value: 2
    }],
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/radio'
  },
  {
    label: '多选框组',
    tag: 'el-checkbox-group',
    tagIcon: 'checkbox',
    defaultValue: [],
    span: 8,
    labelWidth: null,
    style: {},
    optionType: 'default',
    border: false,
    size: 'medium',
    disabled: false,
    required: true,
    options: [{
      label: '选项一',
      value: 1
    }, {
      label: '选项二',
      value: 2
    }],
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/checkbox'
  },
  {
    label: '开关',
    tag: 'el-switch',
    tagIcon: 'switch',
    defaultValue: false,
    span: 8,
    labelWidth: null,
    style: {},
    disabled: false,
    required: true,
    'active-text': '',
    'inactive-text': '',
    'active-color': null,
    'inactive-color': null,
    'active-value': true,
    'inactive-value': false,
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/switch'
  },
  {
    label: '滑块',
    tag: 'el-slider',
    tagIcon: 'slider',
    defaultValue: null,
    span: 8,
    labelWidth: null,
    disabled: false,
    required: true,
    min: 0,
    max: 100,
    step: 1,
    'show-stops': false,
    range: false,
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/slider'
  },
  {
    label: '时间选择',
    tag: 'el-time-picker',
    tagIcon: 'time',
    placeholder: '请选择',
    defaultValue: null,
    span: 8,
    labelWidth: null,
    style: { width: '100%' },
    disabled: false,
    clearable: true,
    required: true,
    'picker-options': {
      selectableRange: '00:00:00-23:59:59'
    },
    format: 'HH:mm:ss',
    'value-format': 'HH:mm:ss',
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/time-picker'
  },
  {
    label: '时间范围',
    tag: 'el-time-picker',
    tagIcon: 'time-range',
    defaultValue: null,
    span: 8,
    labelWidth: null,
    style: { width: '100%' },
    disabled: false,
    clearable: true,
    required: true,
    'is-range': true,
    'range-separator': '至',
    'start-placeholder': '开始时间',
    'end-placeholder': '结束时间',
    format: 'HH:mm:ss',
    'value-format': 'HH:mm:ss',
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/time-picker'
  },
  {
    label: '日期选择',
    tag: 'el-date-picker',
    tagIcon: 'date',
    placeholder: '请选择',
    defaultValue: null,
    type: 'date',
    span: 8,
    labelWidth: null,
    style: { width: '100%' },
    disabled: false,
    clearable: true,
    required: true,
    format: 'yyyy-MM-dd',
    'value-format': 'yyyy-MM-dd',
    readonly: false,
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/date-picker'
  },
  {
    label: '日期范围',
    tag: 'el-date-picker',
    tagIcon: 'date-range',
    defaultValue: null,
    span: 8,
    labelWidth: null,
    style: { width: '100%' },
    type: 'datetimerange',
    'range-separator': '至',
    'start-placeholder': '开始日期',
    'end-placeholder': '结束日期',
    disabled: false,
    clearable: true,
    required: true,
    format: 'yyyy-MM-dd HH:mm:ss',
    'value-format': 'yyyy-MM-dd HH:mm:ss',
    readonly: false,
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/date-picker',
    cusType: 'date',
    startTimeName: 'startTimeName',
    endTimeName: 'endTimeName',
  },
  {
    label: '评分',
    tag: 'el-rate',
    tagIcon: 'rate',
    defaultValue: 0,
    span: 8,
    labelWidth: null,
    style: {},
    max: 5,
    'allow-half': false,
    'show-text': false,
    'show-score': false,
    disabled: false,
    required: true,
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/rate'
  },
  // {
  //   label: '颜色选择',
  //   tag: 'el-color-picker',
  //   tagIcon: 'color',
  //   span:8,
  //   defaultValue: null,
  //   labelWidth: null,
  //   'show-alpha': false,
  //   'color-format': '',
  //   disabled: false,
  //   required: true,
  //   size: 'medium',
  //   regList: [],
  //   changeTag: true,
  //   document: 'https://element.eleme.cn/#/zh-CN/component/color-picker'
  // },
  {
    label: '上传',
    tag: 'el-upload',
    tagIcon: 'upload',
    span:8,
    action: 'https://jsonplaceholder.typicode.com/posts/',
    defaultValue: null,
    labelWidth: null,
    disabled: false,
    required: true,
    accept: '',
    name: 'file',
    'auto-upload': true,
    showTip: false,
    buttonText: '点击上传',
    fileSize: 2,
    sizeUnit: 'MB',
    'list-type': 'text',
    multiple: false,
    regList: [],
    changeTag: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/upload'
  }
]

// 布局型组件
export const layoutComponents = [
  {
    layout: 'rowFormItem',
    tagIcon: 'row',
    type: 'default',
    justify: 'start',
    align: 'top',
    label: '行容器',
    layoutTree: true,
    children: [],
    document: 'https://element.eleme.cn/#/zh-CN/component/layout'
  },
  // 搜索
  {
    layout: 'searchBox',
    tagIcon: 'row',
    type: 'default',
    justify: 'start',
    align: 'top',
    label: '搜索组件',
    layoutTree: true,
    children: [operationBtns,],
    showMoreStateTitle: '收起',
  },
  // 表格
  {
    layout: 'tableItem',
    tagIcon: 'row',
    type: 'default',
    justify: 'start',
    align: 'top',
    label: '表格组件',
    layoutTree: true,
    children: [{ label: '序号', width: '70', tagIcon: 'index' }],
  },
  // 分页
  {
    layout: 'pagination',
    tagIcon: 'row',
    type: 'default',
    justify: 'start',
    align: 'top',
    label: '分页',
    layoutTree: true,
  },
  // 弹窗
  {
    layout: 'cusDlg',
    tagIcon: 'row',
    type: 'default',
    justify: 'start',
    align: 'top',
    label: '弹窗组件',
    layoutTree: true,
    children: [
      {
        label: '弹窗按钮组',
        layout: 'operationBtnArr',
        tagIcon: 'button',
        justify: 'end',
        children: [
          {
            label: '确 定',
            type: 'primary',
            size: 'medium',
            tagIcon: 'button',
            vModel: 'confirm',
          },
          {
            label: '取 消',
            type: 'default',
            size: 'medium',
            tagIcon: 'button',
            vModel: 'cancel',
          },
        ]
      }
    ],
  },

]

// 组件rule的触发方式，无触发方式的组件不生成rule
export const trigger = {
  'el-input': 'blur',
  'el-input-number': 'blur',
  'el-select': 'change',
  'el-radio-group': 'change',
  'el-checkbox-group': 'change',
  'el-cascader': 'change',
  'el-time-picker': 'change',
  'el-date-picker': 'change',
  'el-rate': 'change'
}
