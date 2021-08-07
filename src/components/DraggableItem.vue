<script>
import draggable from 'vuedraggable'
import render from '@/utils/generator/render'

const components = {
  itemBtns(h, element, index, parent) {
    const { copyItem, deleteItem } = this.$listeners
    return [
      <span class="drawing-item-copy" title="复制" onClick={event => {
        copyItem(element, parent); event.stopPropagation()
      }}>
        <i class="el-icon-copy-document" />
      </span>,
      <span class="drawing-item-delete" title="删除" onClick={event => {
        deleteItem(index, parent); event.stopPropagation()
      }}>
        <i class="el-icon-delete" />
      </span>
    ]
  }
}
const layouts = {
  colFormItem(h, element, index, parent) {
    const { activeItem } = this.$listeners
    let className = this.activeId === element.formId ? 'drawing-item active-from-item' : 'drawing-item'
    if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered'
    return (
      <el-col span={element.span} class={className}
        nativeOnClick={event => { activeItem(element); event.stopPropagation() }}>
        <el-form-item label-width={element.labelWidth ? `${element.labelWidth}px` : null}
          label={element.label} required={element.required}>
          <render key={element.renderKey} conf={element} onInput={event => {
            this.$set(element, 'defaultValue', event)
          }} />
        </el-form-item>
        {components.itemBtns.apply(this, arguments)}
      </el-col>
    )
  },
  rowFormItem(h, element, index, parent) {
    const { activeItem } = this.$listeners
    const className = this.activeId === element.formId ? 'drawing-row-item active-from-item' : 'drawing-row-item'
    let child = renderChildren.apply(this, arguments)
    if (element.type === 'flex') {
      child = <el-row type={element.type} justify={element.justify} align={element.align}>
        {child}
      </el-row>
    }
    return (
      <el-col span={element.span}>
        <el-row gutter={element.gutter} class={className}
          nativeOnClick={event => { activeItem(element); event.stopPropagation() }}>
          <span class="component-name">{element.componentName}</span>
          <draggable list={element.children} animation={340} group="componentsGroup" class="drag-wrapper">
            {child}
          </draggable>
          {components.itemBtns.apply(this, arguments)}
        </el-row>
      </el-col>
    )
  },
  // 搜索组件
  searchBox(h, element, index, parent) {
    const { activeItem, showMore, onEnd } = this.$listeners
    const className = this.activeId === element.formId ? 'drawing-row-item active-from-item' : 'drawing-row-item'
    let child = renderChildren.apply(this, arguments)
    if (element.type === 'flex') {
      child = <el-row type={element.type} justify={element.justify} align={element.align}>
        {child}
      </el-row>
    }
    return (
      <el-col span={element.span} class="search-box">
        <el-row gutter={element.gutter} class={className}
          nativeOnClick={event => { activeItem(element); event.stopPropagation() }}>
          <span class="component-name">搜索组件</span>
          <draggable list={element.children} animation={340} group="componentsGroup" class="drag-wrapper" onEnd={onEnd}>
            {child}
          </draggable>
          {components.itemBtns.apply(this, arguments)}
        </el-row>
        <div class="show-more">
          <el-button type="primary" size="mini" onClick={event => {
            showMore(element); event.stopPropagation()
          }}>{element.showMoreStateTitle}</el-button>
        </div>
      </el-col>
    )
  },
  operationBtnArr(h, element, index, paratn) {
    const { activeItem, onEnd } = this.$listeners
    const className = this.activeId === element.formId ? 'drawing-row-item active-from-item' : 'drawing-row-item'
    let btnArr = [] // 搜索框组件操作按钮
    if (element.children) {
      btnArr = element.children
    }
    return (
      <el-col span={element.span} class="footer">
        <el-row gutter={element.gutter} class={className}
          nativeOnClick={event => { activeItem(element); event.stopPropagation() }} type="flex" justify={element.justify || 'center'}>
          <span class="component-name">{element.componentName}</span>
          <draggable onEnd={onEnd}>
            {
              btnArr.map(ele => {
                return (
                  <el-button type={ele.type || 'primary'} size={ele.size || 'small'} >{ele.label}</el-button>
                )
              })
            }
          </draggable>
        </el-row>
      </el-col>
    )
  },
  // 表格组件
  tableItem(h, element, index, parent) {
    // console.log('tab:', element)
    // activeItem => 表格组件被点击时的处理函数
    const { activeItem } = this.$listeners
    const className = this.activeId === element.formId ? 'table-box active-from-item' : 'table-box'
    const columnArr = element.children
    let rowInd = 0
    const getRowKey = () => {
      return String(++rowInd)
    }
    return (
      <el-col class={className} nativeOnClick={event => { activeItem(element); event.stopPropagation() }}>
        <span class="component-name">表格组件</span>
        <el-table
          border
          height={element.tableHeight || 400}
          column-key={getRowKey()}
          style="width: 100%;">
          {
            columnArr.map(col => {
              return (
                <el-table-column label={col.label} width={col.width || ''}></el-table-column>
              )
            })
          }
        </el-table>
        {components.itemBtns.apply(this, arguments)}
      </el-col >
    )
  },
  // 分页
  pagination(h, element, index, parent) {
    const { activeItem, onEnd } = this.$listeners
    const className = this.activeId === element.formId ? 'drawing-row-item active-from-item' : 'drawing-row-item'
    return (
      <el-col span={element.span} class="pagination">
        <el-row gutter={element.gutter} class={className}
          nativeOnClick={event => { activeItem(element); event.stopPropagation() }}>
          <span class="component-name">分页</span>
          <draggable animation={340} group="componentsGroup" class="drag-wrapper" onEnd={onEnd}>
            <el-pagination
              current-page={1}
              page-sizes={[100, 200, 300, 500]}
              page-size={100}
              layout="total, sizes, prev, pager, next, jumper"
              total={400} >
            </el-pagination>
          </draggable>
          {components.itemBtns.apply(this, arguments)}
        </el-row>
      </el-col>
    )
  },
  // 弹窗组件
  cusDlg(h, element, index, parent) {
    const { activeItem, onEnd } = this.$listeners
    const className = this.activeId === element.formId ? 'drawing-row-item active-from-item' : 'drawing-row-item'
    let child = renderChildren.apply(this, arguments)
    if (element.type === 'flex') {
      child = <el-row type={element.type} justify={element.justify} align={element.align}>
        {child}
      </el-row>
    }
    return (
      <el-col span={element.span} class="search-box cus-dlg">
        <el-row gutter={element.gutter} class={className}
          nativeOnClick={event => { activeItem(element); event.stopPropagation() }}>
          <span class="component-name">自定义弹窗</span>
          <draggable list={element.children} animation={340} group="componentsGroup" class="drag-wrapper" onEnd={onEnd}>
            {child}
          </draggable>
          {components.itemBtns.apply(this, arguments)}
        </el-row>
      </el-col>
    )
  },
}

function renderChildren(h, element, index, parent) {
  if (!Array.isArray(element.children)) return null
  return element.children.map((el, i) => {
    const layout = layouts[el.layout]
    if (layout) {
      return layout.call(this, h, el, i, element.children)
    }
    return layoutIsNotFound()
  })
}

function layoutIsNotFound() {
  throw new Error(`没有与${this.element.layout}匹配的layout`)
}

export default {
  components: {
    render,
    draggable
  },
  props: [
    'element',
    'index',
    'drawingList',
    'activeId',
    'formConf'
  ],
  render(h) {
    const layout = layouts[this.element.layout]

    if (layout) {
      return layout.call(this, h, this.element, this.index, this.drawingList)
    }
    return layoutIsNotFound()
  }
}
</script>
