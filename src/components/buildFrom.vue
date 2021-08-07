<template>
  <div class="container">
    <div class="left-board">
      <div class="logo-wrapper">
        <a class="logo" href="https://github.com/lizheng0515/buildForm" target="_blank">
          <img :src="logo" alt="logo"> 表单构建
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="20" height="20" class="icon outbound"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg>
        </a>
      </div>
      <el-scrollbar class="left-scrollbar">
        <!-- 选择组件 -->
        <div class="components-list">
          <!-- 输入型组件 -->
          <div class="components-title">
            <svg-icon icon-class="component" />输入型组件
          </div>
          <draggable
            class="components-draggable"
            :list="inputComponents"
            :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
            :clone="cloneComponent"
            draggable=".components-item"
            :sort="false"
            @end="onEnd">
            <div
              v-for="(element, index) in inputComponents" :key="index" class="components-item"
              @click="addComponent(element)" >
              <div class="components-body">
                <svg-icon :icon-class="element.tagIcon" />
                {{ element.label }}
              </div>
            </div>
          </draggable>
          
          <!-- 选择型组件 -->
          <div class="components-title">
            <svg-icon icon-class="component" />选择型组件
          </div>
          <draggable
            class="components-draggable"
            :list="selectComponents"
            :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
            :clone="cloneComponent"
            draggable=".components-item"
            :sort="false"
            @end="onEnd" >
            <div
              v-for="(element, index) in selectComponents"
              :key="index"
              class="components-item"
              @click="addComponent(element)" >
              <div class="components-body">
                <svg-icon :icon-class="element.tagIcon" />
                {{ element.label }}
              </div>
            </div>
          </draggable>

          <!-- 布局型组件 -->
          <div class="components-title layout-components">
            <svg-icon icon-class="component" /> 布局型组件
          </div>
          <draggable
            class="components-draggable" 
            :list="layoutComponents"
            :group="{ name: 'componentsGroup', pull: 'clone', put: false }" 
            :clone="cloneComponent"
            draggable=".components-item" 
            :sort="false" 
            @end="onEnd" >
            <div
              v-for="(element, index) in layoutComponents" :key="index" class="components-item ghostClass"
              @click="addComponent(element)" >
              <div class="components-body layout-item">
                <svg-icon :icon-class="element.tagIcon" />
                {{ element.label }}
              </div>
            </div>            
          </draggable>
          <!-- 组件的附件功能 -->
          <div v-if="activeData.layout" class="box-attribute">
            <div class="components-title title">{{ activeData.label }}_附加功能</div>
            <div class="flex-box">
              <div v-if="['searchBox', 'cusDlg'].includes(activeData.layout) " class="components-item">
                <el-button type="primary" size="mini" @click="addOperationbtn">添加操作按钮</el-button>
              </div>
              <div v-if="activeData.layout == 'tableItem'" class="components-item">
                <el-button type="primary" size="mini" @click="addCol">添加一列</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="center-board">
      <div class="action-bar">
        <el-button icon="el-icon-download" type="text" @click="download">
          导出vue文件
        </el-button>
        <el-button class="copy-btn-main" icon="el-icon-document-copy" type="text" @click="copy">
          复制代码
        </el-button>
        <el-button class="delete-btn" icon="el-icon-delete" type="text" @click="empty">
          清空
        </el-button>
      </div>
      <el-scrollbar class="center-scrollbar">
        <el-row class="center-board-row" :gutter="formConf.gutter">
          <el-form
            :size="formConf.size"
            :label-position="formConf.labelPosition"
            :disabled="formConf.disabled"
            :label-width="formConf.labelWidth + 'px'" >
            <draggable class="drawing-board" :list="drawingList" :animation="340" group="componentsGroup">
              <draggable-item
                :ref="'ele_'+element.layout"
                v-for="(element, index) in drawingList"
                :key="element.renderKey"
                :drawing-list="drawingList"
                :element="element"
                :index="index"
                :active-id="activeId"
                :form-conf="formConf"
                @onEnd="onEnd"
                @activeItem="activeFormItem"
                @copyItem="drawingItemCopy"
                @deleteItem="drawingItemDelete"
                @showMore="showMore"
              />
            </draggable>
            <div v-show="!drawingList.length" class="empty-info">
              从左侧拖入或点选组件进行表单设计
            </div>
          </el-form>
        </el-row>
      </el-scrollbar>
    </div>

    <!-- 属性编辑 -->
    <right-panel
      :active-data="activeData"
      :form-conf="formConf"
      :show-field="!!drawingList.length"
      @tag-change="tagChange" />

    <!-- 用于复制代码 -->
    <input id="copyNode" type="hidden">
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Sortable from 'sortablejs'
import { saveAs } from 'file-saver'
import beautifier from 'js-beautify'
import ClipboardJS from 'clipboard'
import clonedeep from 'lodash.clonedeep'
import RightPanel from './RightPanel'
import { inputComponents, selectComponents, layoutComponents, formConf, inputEle, selectEle, operationBtns } from '@/utils/generator/config'
import drawingDefalut from '@/utils/generator/drawingDefalut'
import { beautifierConf, } from '@/utils/index'
import logo from '@/assets/logo.png'
import DraggableItem from './DraggableItem'
import { tpl } from '@/utils/generator/template'


const emptyActiveData = { style: {}, autosize: {} }
let oldActiveId
let tempActiveData

export default {
  components: {
    draggable,
    RightPanel,
    DraggableItem
  },
  data() {
    return {
      logo,
      idGlobal: 100,
      formConf,
      inputComponents,
      selectComponents,
      layoutComponents,
      labelWidth: 100,
      drawingList: drawingDefalut,
      drawingData: {},
      activeId: drawingDefalut[0].formId,
      drawerVisible: false,
      formData: {},
      activeData: drawingDefalut[0],
      tableColSortable: {},
      lastLayoutComponent: {},
      curLayout: 'searchBox', // 默认为搜索组件
    }
  },
  computed: {
    layoutItemInd() {
      return {
        searchBox: this.drawingList.findIndex(ele => ele.layout == 'searchBox'),
        tableItem: this.drawingList.findIndex(ele => ele.layout == 'tableItem'),
        cusDlg: this.drawingList.findIndex(ele => ele.layout == 'cusDlg'),
      }
    }
  },
  watch: {
    // eslint-disable-next-line func-names
    'activeData.label': function (val, oldVal) {
      if (
        this.activeData.placeholder === undefined
        || !this.activeData.tag
        || oldActiveId !== this.activeId
      ) {
        return
      }
      this.activeData.placeholder = this.activeData.placeholder.replace(oldVal, '') + val
    },
    activeId: {
      handler(val) {
        oldActiveId = val
      },
      immediate: true
    }
  },
  created() {
    // 组装默认数据     
    this.packDefaultData()

  },
  mounted() {
    const clipboard = new ClipboardJS('#copyNode', {
      text: trigger => {
        const codeStr = this.packHtmlStr()
        this.$notify({
          title: '成功',
          message: '代码已复制到剪切板，可粘贴。',
          type: 'success'
        })
        return codeStr
      }
    })
    clipboard.on('error', e => {
      this.$message.error('代码复制失败')
    })
    // 表格列的操作
    // 阻止默认行为
    document.body.ondrop = function (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    // 注册表格列的拖动
    this.columnDrop()
  },
  methods: {
    packDefaultData() {
      const searchBoxEleArr = this.drawingList[this.layoutItemInd.searchBox].children
      if (searchBoxEleArr.length != 0) {
        return
      }
      // 保证 renderKey的唯一, 分批插入
      for (let [index, ele] of [inputEle, selectEle, inputEle, selectEle, selectEle, operationBtns].entries()) {
        (() => {
          setTimeout(() => {
            searchBoxEleArr.push(this.cloneComponent(ele))
          }, index * 50)
        })()
      }
    },
    activeFormItem(element) {
      console.log(element)
      this.activeData = element
      this.activeId = element.formId
      if (element.layout && ['searchBox', 'cusDlg'].includes(element.layout)) {
        this.curLayout = element.layout
      }
    },
    onEnd(obj, a) {
      // console.log(':', obj, a)
      if (obj.from !== obj.to) {
        // 从组件类型往代码编辑框拖拽完成时的事件
        this.activeData = tempActiveData
        this.activeId = this.idGlobal
      }
      if (obj.target.className == 'drag-wrapper') {
        // 组件内移动子元素顺序
        console.log('组件内拖拽:', tempActiveData)
        this.activeData = {}
        this.activeData = this.drawingList[0] // 搜索框组件
        const backTreeArr = clonedeep(this.activeData.children) // 深拷贝布局结构树
        // this.activeData.children = []
        this.activeId = this.activeData.formId
        this.activeData.children = backTreeArr
      }
    },
    // 点击元素, 往 center-scrollbar 容器添加对应的元素
    addComponent(item) {
      // console.log('item:', item);
      if (item.layout && ['searchBox', 'cusDlg'].includes(item.layout)) {
        for (let element of this.drawingList) {
          if (item.layout === element.layout) {
            this.$notify({
              title: '请注意',
              message: `构建器已存在此'${item.label}'`,
              type: 'warning'
            })
            return
          }
        }
      }
      const clone = this.cloneComponent(item)
      // console.log('点击元素_添加:', clone)
      if (clone.layout === 'colFormItem') {
        const index = this.layoutItemInd[this.curLayout]
        this.drawingList[index].children.splice(-1, 0, clone) // 往children数组倒数第二个添加, children数组倒数第一个元素为 operationBtns
      } else {
        // 往布局型组件外添加
        this.drawingList.push(clone)
      }
      if (clone.layout == 'tableItem') {
        this.$set(this, 'tableColSortable', {})
      }
      this.activeFormItem(clone)
    },
    // 拖拽或点击都会触发此函数
    cloneComponent(origin) {
      console.log('>>>:', origin)
      const clone = clonedeep(origin)
      clone.formId = ++this.idGlobal
      clone.label = clone.label + clone.formId
      // clone.span = formConf.span // 复写组件的所占的栅格数
      clone.renderKey = +new Date() // 改变renderKey后可以实现强制更新组件
      if (!clone.layout) {
        clone.layout = 'colFormItem'
      }
      switch (clone.layout) {
        case 'colFormItem': {
          // colFormItem
          clone.vModel = `field${this.idGlobal}`
          clone.placeholder !== undefined && (clone.placeholder += clone.label)
          tempActiveData = clone
          break
        }
        default: {
          // 'rowFormItem' || 'searchBox' || 'tableItem' || 'cusDlg'
          // delete clone.label
          clone.componentName = `row${this.idGlobal}`
          clone.gutter = this.formConf.gutter
          tempActiveData = clone
        }
      }
      return tempActiveData
    },
    execDownload(data) {
      const codeStr = this.generateCode()
      const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, data.fileName)
    },
    // 清空操作
    empty() {
      this.$confirm('确定要清空所有组件吗？', '提示', { type: 'warning' }).then(
        () => {
          this.drawingList = []
        }
      )
    },
    drawingItemCopy(item, parent) {
      let clone = JSON.parse(JSON.stringify(item))
      clone = this.createIdAndKey(clone)
      parent.push(clone)
      this.activeFormItem(clone)
    },
    createIdAndKey(item) {
      item.formId = ++this.idGlobal
      item.renderKey = +new Date()
      switch (item.layout) {
        case 'rowFormItem' || 'searchBox' || 'tableItem': {
          item.componentName = `row${this.idGlobal}`
          break
        }
        default: {
          // colFormItem
          item.vModel = `field${this.idGlobal}`
        }
      }
      if (Array.isArray(item.children)) {
        item.children = item.children.map(childItem => this.createIdAndKey(childItem))
      }
      return item
    },
    drawingItemDelete(index, parent) {
      parent.splice(index, 1)
      this.$nextTick(() => {
        const len = this.drawingList.length
        if (len) {
          this.activeFormItem(this.drawingList[len - 1])
        }
      })
    },
    showMore() {
      // console.log('showMore')
      const searchBox = this.drawingList[this.layoutItemInd.searchBox]
      const tableItem = this.drawingList[this.layoutItemInd.tableItem]
      const searchBoxSpanH = 45
      let searchBoxMinH = '130px'
      let display = 'none'
      const searchBoxEle = document.querySelector('.search-box')
      const eleArr = Array.from(document.querySelectorAll('.drawing-item')).splice(3)
      if (searchBox.showMoreStateTitle == '收起') {
        // 处于展开状态
        searchBox.showMoreStateTitle = '展开'
        tableItem.tableHeight += searchBoxSpanH
      } else {
        searchBox.showMoreStateTitle = '收起'
        tableItem.tableHeight -= searchBoxSpanH
        searchBoxMinH = '175px'
        display = 'block'
      }
      searchBoxEle.querySelector('.drag-wrapper').style.minHeight = searchBoxMinH
      for (let ele of eleArr) {
        ele.style.display = display
      }
    },
    tagChange(newTag) {
      newTag = this.cloneComponent(newTag)
      newTag.vModel = this.activeData.vModel
      newTag.formId = this.activeId
      newTag.span = this.activeData.span
      delete this.activeData.tag
      delete this.activeData.tagIcon
      delete this.activeData.document
      Object.keys(newTag).forEach(key => {
        if (this.activeData[key] !== undefined
          && typeof this.activeData[key] === typeof newTag[key]) {
          newTag[key] = this.activeData[key]
        }
      })
      this.activeData = newTag
      this.updateDrawingList(newTag, this.drawingList)
    },
    updateDrawingList(newTag, list) {
      const index = list.findIndex(item => item.formId === this.activeId)
      if (index > -1) {
        list.splice(index, 1, newTag)
      } else {
        list.forEach(item => {
          if (Array.isArray(item.children)) this.updateDrawingList(newTag, item.children)
        })
      }
    },
    // 添加表格列
    addCol() {
      const children = this.drawingList[this.layoutItemInd.tableItem].children
      const curColNum = ++this.idGlobal
      children.push({
        label: `task${curColNum}`,
        vModel: `col_${curColNum}`,
        renderKey: `${curColNum}`,
        tagIcon: 'input',
      })
      console.log(children)
      if (curColNum > 1 && Object.keys(this.tableColSortable).length == 0) {
        this.columnDrop()
      }
    },
    //列拖拽
    columnDrop() {
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
      this.tableColSortable = Sortable.create(wrapperTr, {
        animation: 380,
        delay: 0,
        onEnd: evt => {
          const children = JSON.parse(JSON.stringify(this.drawingList[this.layoutItemInd.tableItem].children)) // 暂存
          // console.log(evt)
          // const oldItem = children[evt.oldIndex]
          let [oldItem] = children.splice(evt.oldIndex, 1)
          children.splice(evt.newIndex, 0, oldItem)
          this.$set(this.drawingList[this.layoutItemInd.tableItem], 'children', [])
          this.$nextTick(() => {
            // 重绘表格 高耗能
            this.$set(this.drawingList[this.layoutItemInd.tableItem], 'children', children)
          })
        }
      })
    },
    // 搜索 || 弹窗组件添加操作按钮
    addOperationbtn() {
      let eleBox
      if (this.activeData.layout === 'searchBox') {
        eleBox = this.drawingList[this.layoutItemInd.searchBox].children
      } else {
        eleBox = this.drawingList[this.layoutItemInd.cusDlg].children
      }
      const operationBtnArrInd = eleBox.findIndex(ele => ele.tagIcon == 'button')
      if (operationBtnArrInd != -1) {
        const operationBtnArr = eleBox[operationBtnArrInd].children
        operationBtnArr.push({
          label: '按钮',
          type: 'primary',
          size: 'mini',
          tagIcon: 'button',
          vModel: `loadData_${++this.idGlobal}`,
          category: 'default',
        }, )
      }
    },
    /** 生成、复制代码 **/
    // 生成页面内容字符串
    generateCodeStr() {
      console.log(this.drawingList)
      const drawingList = clonedeep(this.drawingList)
      // 取出搜索框操作按钮列
      let operBtnObj = []
      let operBtnInd = -1
      for (let item of drawingList) {
        operBtnInd = item.children.findIndex(ele => ele.layout && ele.layout === 'operationBtnArr')
        if (operBtnInd != -1) {
          [operBtnObj] = item.children.splice(operBtnInd, 1)
        }
      }
      let { operBtnsStr, operBtnsMethodStr } = this.packSearchOperBtnsStr(operBtnObj.children)
      operBtnsStr = beautifier.html(operBtnsStr, beautifierConf.html)
      const packData = (index, cb) => {
        const eleArr = drawingList[index].children
        let eleDataStr = cb(eleArr) // 处理搜索组件、表格列数据组装的回调
        return beautifier.js(eleDataStr, beautifierConf.js)
      }

      return {
        searchDataStr: {
          searchOperBtns: operBtnsStr, // html字符串
          searchItems: packData(this.layoutItemInd.searchBox, this.packSearchItemsStr),
          searchOperBtnsMethod: operBtnsMethodStr // js 字符串
        },
        tableColsStr: packData(this.layoutItemInd.tableItem, this.packTableColsStr),
      }
    },
    // 组装 html 字符串
    packHtmlStr() {
      const { searchDataStr, tableColsStr } = this.generateCodeStr()
      // console.log(searchDataStr.searchOperBtns)
      return tpl(searchDataStr, tableColsStr)
    },
    // 搜索组件
    packSearchItemsStr(searchBoxEleArr) {
      let searchItemsStr = `[`
      // 转换 searchBoxEleArr 的 key
      let converterTmp
      // 输入框、下拉框类型
      const converterObj = {
        label: 'label',
        type: 'tagIcon',
        modelName: 'vModel',
        placeholder: 'placeholder',
      }
      // 时间类型
      const converterDateObj = {
        label: 'label',
        type: 'cusType',
        modelName: 'vModel',
        startTimeName: 'startTimeName',
        endTimeName: 'endTimeName',
      }
      for (let item of searchBoxEleArr) {
        if (item.tagIcon === 'date-range') {
          converterTmp = converterDateObj
        } else {
          converterTmp = converterObj
        }
        searchItemsStr += `{`
        for (let key of Object.keys(converterTmp)) {
          searchItemsStr += `${key}: '${item[converterTmp[key]]}',`
        }
        if (item.tagIcon === 'select') {
          // 下拉框类型 追加
          searchItemsStr += `optionData: [],`
        }
        searchItemsStr += `},`
      }
      return searchItemsStr + ']'
    },
    packSearchOperBtnsStr(operBtnArr) {
      // 拼装 html字符串
      let operBtnsStr = ''
      let operBtnsMethodStr = ''
      // 转换 operBtnArr 的 key
      // const converterObj = {
      //   type: 'type',
      //   size: 'size',
      //   funcName: 'vModel',
      //   label: 'label',
      // }
      for (let item of operBtnArr) {
        let itemStr
        if (item.category === 'upload') {
          itemStr = `<el-upload :limit="1" ref="upload" :action="url.uploadUrl" :show-file-list="false" accept=".xlsx" :before-upload="${item.vModel}" style="display: inline-block; margin: 0 10px" >
          <el-button type="${item.type}" size="${item.size}">${item.label}</el-button>
      </el-upload>`
        } else {
          itemStr = `<el-button type="${item.type}" size="${item.size}" @click="${item.vModel}">${item.label}</el-button>`
        }
        operBtnsStr += itemStr
        operBtnsMethodStr += `    ${item.vModel}(){
      console.log('${item.vModel} func');\n
    },\n`
      }
      return {
        operBtnsStr,
        operBtnsMethodStr
      }
    },
    // 表格列
    packTableColsStr(tableEleArr) {
      let tableColStr = `[`
      // 转换 searchBoxEleArr 的 key
      const converterObj = {
        label: 'label',
        prop: 'vModel',
        width: 'width',
      }
      for (let item of tableEleArr) {
        tableColStr += `{`
        for (let key of Object.keys(converterObj)) {
          if (item[converterObj[key]]) {
            tableColStr += `${key}: '${item[converterObj[key]]}',`
          }
        }
        tableColStr += `},`
      }
      return tableColStr + ']'
    },
    // 生成 .vue文件
    download() {
      const codeStr = this.packHtmlStr()
      const blob = new Blob([codeStr], { type: "text/plain;charset=utf-8" })
      // 获取生成的文件名
      let fileName = 'crudPageTpl.vue'
      this.$prompt('请输入文件名称', '提示', {
        inputValue: fileName,
        inputValidator: name => {
          return name ? true : false
        },
        inputErrorMessage: '请输入文件名',
        closeOnClickModal: false,
      }).then(res => {
        fileName = res.value
        console.log('fileName:', name);
        saveAs(blob, fileName || 'crudPageTpl.vue')
      })
    },
    // 复制代码
    copy() {
      document.getElementById('copyNode').click()
    },
  }
}
</script>

<style lang='scss'>
@import "./style/buildFrom.scss"; // 抽离原有的样式
// 布局型组件 box 样式
.layout-components {
  background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
  padding: 5px 0px;
  border-radius: 5px;
}
.layout-item:hover {
  background-image: linear-gradient(-45deg, #ffc796 0%, #ff6b95 100%);
  border: 1px dashed #66a6ff;
}
// 搜索组件
.search-box {
  position: relative;
  .drawing-row-item {
    background-color: #f0f2f5;
  }
  .drawing-item:last-child {
    margin-bottom: 50px;
  }
  .drag-wrapper {
    min-height: 180px;
    margin-top: 20px;
  }
  // 展示更多
  .show-more {
    position: absolute;
    bottom: 15px;
    .el-button--mini {
      padding: 5px 7px;
      border-radius: 5px;
    }
  }
  // 搜索框的操作按钮
  .footer {
    margin-top: 30px;
  }
}
// 表格组件
.table-box {
  position: relative;
  border: 1px dashed #ccc;
  margin-bottom: 10px;
  &.active-from-item {
    border: 1px dashed $lighterBlue;
  }
  .component-name {
    font-size: 12px;
    color: #bbb;
    display: inline-block;
    padding: 0 6px;
  }
  .drawing-item-copy,
  .drawing-item-delete {
    display: none;
    position: absolute;
    top: -15px;
    width: 22px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    border-radius: 50%;
    font-size: 10px;
    border: 1px solid;
    cursor: pointer;
    z-index: 1;
  }
  .drawing-item-copy {
    right: 56px;
    border-color: $lighterBlue;
    color: $lighterBlue;
    background: #fff;
    &:hover {
      background: $lighterBlue;
      color: #fff;
    }
  }
  .drawing-item-delete {
    right: 24px;
    border-color: #f56c6c;
    color: #f56c6c;
    background: #fff;
    &:hover {
      background: #f56c6c;
      color: #fff;
    }
  }
  // 解决动态添加表格列时,产生的抖动
  .el-table .cell {
    height: 20px !important;
  }
}
// 弹窗组件
.cus-dlg {
  .drawing-row-item {
    background: #fff;
  }
  .drag-wrapper {
    min-height: 175px;
  }
  .drawing-item:last-child {
    margin-bottom: 0px;
  }
  .footer {
    position: sticky;
    margin-top: 75px;
    // bottom: 20px;
  }
}
.box-attribute {
  .title {
    font-weight: bold;
  }
  .flex-box {
    display: flex;
  }
}
// 分页
.pagination {
  .drawing-row-item {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .drag-wrapper {
    margin-top: 10px;
    min-height: 30px;
  }
}
</style>
