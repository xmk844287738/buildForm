<template>
  <div class="right-board">
    <el-tabs v-model="currentTab" class="center-tabs">
      <el-tab-pane label="组件属性" name="field" />
      <el-tab-pane label="表单属性" name="form" />
    </el-tabs>
    <div class="field-box">
      <!-- 跳转链接 -->
      <a class="document-link" target="_blank" :href="documentLink" title="查看组件文档">
        <i class="el-icon-link" />
      </a>
      <el-scrollbar class="right-scrollbar">
        <!-- 组件属性 -->
        <el-form v-show="currentTab==='field' && showField" size="small" label-width="90px">
          <el-form-item v-if="activeData.changeTag" label="组件类型">
            <el-select
              v-model="activeData.tagIcon"
              placeholder="请选择组件类型"
              :style="{width: '100%'}"
              @change="tagChange"
            >
              <el-option-group v-for="group in tagList" :key="group.label" :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.label"
                  :label="item.label"
                  :value="item.tagIcon"
                >
                  <svg-icon class="node-icon" :icon-class="item.tagIcon" />
                  <span> {{ item.label }}</span>
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item v-if="activeData.vModel!==undefined" label="字段名">
            <el-input v-model="activeData.vModel" placeholder="请输入字段名（v-model）" />
          </el-form-item>
          <template v-if="activeData.type !== undefined && 'el-date-picker' === activeData.tag">
            <el-form-item  label="时间类型">
              <el-select
                v-model="activeData.type"
                placeholder="请选择时间类型"
                :style="{ width: '100%' }"
                @change="dateTypeChange"
              >
                <el-option
                  v-for="(item, index) in dateOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间prop">
              <el-input v-model="activeData.startTimeName" placeholder="请输入开始时间字段名" />
            </el-form-item>
            <el-form-item label="结束时间prop">
              <el-input v-model="activeData.endTimeName" placeholder="请输入结束时间字段名" />
            </el-form-item>
          </template>
          <el-form-item v-if="activeData.componentName!==undefined" label="组件名">
            {{ activeData.componentName }}
          </el-form-item>
          <el-form-item v-if="activeData.label!==undefined" label="标题">
            <el-input v-model="activeData.label" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item v-if="activeData.placeholder!==undefined" label="占位提示">
            <el-input v-model="activeData.placeholder" placeholder="请输入占位提示" />
          </el-form-item>
          <el-form-item v-if="activeData['start-placeholder']!==undefined" label="开始占位">
            <el-input v-model="activeData['start-placeholder']" placeholder="请输入占位提示" />
          </el-form-item>
          <el-form-item v-if="activeData['end-placeholder']!==undefined" label="结束占位">
            <el-input v-model="activeData['end-placeholder']" placeholder="请输入占位提示" />
          </el-form-item>
          <el-form-item v-if="activeData.span!==undefined" label="表单栅格">
            <el-slider v-model="activeData.span" :max="24" :min="1" :marks="{12:''}" @change="spanChange" />
          </el-form-item>
          <el-form-item v-if="activeData.layout==='rowFormItem'" label="栅格间隔">
            <el-input-number v-model="activeData.gutter" :min="0" placeholder="栅格间隔" />
          </el-form-item>
          <el-form-item v-if="activeData.layout==='rowFormItem'" label="布局模式">
            <el-radio-group v-model="activeData.type">
              <el-radio-button label="default" />
              <el-radio-button label="flex" />
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="activeData.justify!==undefined&&activeData.type==='flex'" label="水平排列">
            <el-select v-model="activeData.justify" placeholder="请选择水平排列" :style="{width: '100%'}">
              <el-option
                v-for="(item, index) in justifyOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="activeData.align!==undefined&&activeData.type==='flex'" label="垂直排列">
            <el-radio-group v-model="activeData.align">
              <el-radio-button label="top" />
              <el-radio-button label="middle" />
              <el-radio-button label="bottom" />
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="activeData.labelWidth!==undefined" label="标签宽度">
            <el-input v-model.number="activeData.labelWidth" type="number" placeholder="请输入标签宽度" />
          </el-form-item>
          <el-form-item v-if="activeData.style&&activeData.style.width!==undefined" label="组件宽度">
            <el-input v-model="activeData.style.width" placeholder="请输入组件宽度" clearable />
          </el-form-item>
          <el-form-item v-if="activeData.vModel!==undefined" label="默认值">
            <el-input
              :value="setDefaultValue(activeData.defaultValue)"
              placeholder="请输入默认值"
              @input="onDefaultValueInput"
            />
          </el-form-item>
          <el-form-item v-if="activeData.tag==='el-checkbox-group'" label="至少应选">
            <el-input-number
              :value="activeData.min"
              :min="0"
              placeholder="至少应选"
              @input="$set(activeData, 'min', $event?$event:undefined)"
            />
          </el-form-item>
          <el-form-item v-if="activeData.tag==='el-checkbox-group'" label="最多可选">
            <el-input-number
              :value="activeData.max"
              :min="0"
              placeholder="最多可选"
              @input="$set(activeData, 'max', $event?$event:undefined)"
            />
          </el-form-item>
          <el-form-item v-if="activeData.prepend!==undefined" label="前缀">
            <el-input v-model="activeData.prepend" placeholder="请输入前缀" />
          </el-form-item>
          <el-form-item v-if="activeData.append!==undefined" label="后缀">
            <el-input v-model="activeData.append" placeholder="请输入后缀" />
          </el-form-item>
          <el-form-item v-if="activeData['prefix-icon']!==undefined" label="前图标">
            <el-input v-model="activeData['prefix-icon']" placeholder="请输入前图标名称">
              <el-button slot="append" icon="el-icon-thumb" @click="openIconsDialog('prefix-icon')">
                选择
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item v-if="activeData['suffix-icon'] !== undefined" label="后图标">
            <el-input v-model="activeData['suffix-icon']" placeholder="请输入后图标名称">
              <el-button slot="append" icon="el-icon-thumb" @click="openIconsDialog('suffix-icon')">
                选择
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item v-if="activeData.tag === 'el-cascader'" label="选项分隔符">
            <el-input v-model="activeData.separator" placeholder="请输入选项分隔符" />
          </el-form-item>
          <el-form-item v-if="activeData.autosize !== undefined" label="最小行数">
            <el-input-number v-model="activeData.autosize.minRows" :min="1" placeholder="最小行数" />
          </el-form-item>
          <el-form-item v-if="activeData.autosize !== undefined" label="最大行数">
            <el-input-number v-model="activeData.autosize.maxRows" :min="1" placeholder="最大行数" />
          </el-form-item>
          <el-form-item v-if="activeData.min !== undefined" label="最小值">
            <el-input-number v-model="activeData.min" placeholder="最小值" />
          </el-form-item>
          <el-form-item v-if="activeData.max !== undefined" label="最大值">
            <el-input-number v-model="activeData.max" placeholder="最大值" />
          </el-form-item>
          <el-form-item v-if="activeData.step !== undefined" label="步长">
            <el-input-number v-model="activeData.step" placeholder="步数" />
          </el-form-item>
          <el-form-item v-if="activeData.tag === 'el-input-number'" label="精度">
            <el-input-number v-model="activeData.precision" :min="0" placeholder="精度" />
          </el-form-item>
          <el-form-item v-if="activeData.tag === 'el-input-number'" label="按钮位置">
            <el-radio-group v-model="activeData['controls-position']">
              <el-radio-button label="">
                默认
              </el-radio-button>
              <el-radio-button label="right">
                右侧
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="activeData.maxlength !== undefined" label="最多输入">
            <el-input v-model="activeData.maxlength" placeholder="请输入字符长度">
              <template slot="append">
                个字符
              </template>
            </el-input>
          </el-form-item>
          <el-form-item v-if="activeData['active-text'] !== undefined" label="开启提示">
            <el-input v-model="activeData['active-text']" placeholder="请输入开启提示" />
          </el-form-item>
          <el-form-item v-if="activeData['inactive-text'] !== undefined" label="关闭提示">
            <el-input v-model="activeData['inactive-text']" placeholder="请输入关闭提示" />
          </el-form-item>
          <el-form-item v-if="activeData['active-value'] !== undefined" label="开启值">
            <el-input
              :value="setDefaultValue(activeData['active-value'])"
              placeholder="请输入开启值"
              @input="onSwitchValueInput($event, 'active-value')"
            />
          </el-form-item>
          <el-form-item v-if="activeData['inactive-value'] !== undefined" label="关闭值">
            <el-input
              :value="setDefaultValue(activeData['inactive-value'])"
              placeholder="请输入关闭值"
              @input="onSwitchValueInput($event, 'inactive-value')"
            />
          </el-form-item>          
          <el-form-item v-if="activeData.readonly !== undefined" label="是否只读">
            <el-switch v-model="activeData.readonly" />
          </el-form-item>
          <el-form-item v-if="activeData.disabled !== undefined" label="是否禁用">
            <el-switch v-model="activeData.disabled" />
          </el-form-item>
          <el-form-item v-if="activeData.tag === 'el-select'" label="是否可搜索">
            <el-switch v-model="activeData.filterable" />
          </el-form-item>
          <el-form-item v-if="activeData.tag === 'el-select'" label="是否多选">
            <el-switch v-model="activeData.multiple" @change="multipleChange" />
          </el-form-item>
          <el-form-item v-if="activeData.required !== undefined" label="是否必填">
            <el-switch v-model="activeData.required" />
          </el-form-item>

          <template v-if="showOperaBtnAttr">
              <el-form-item label="按钮标题">
                  <el-input v-model="curOperationBtn.label" placeholder="请输入按钮标题" />
              </el-form-item>
              <el-form-item label="按钮颜色" class="btn-color">
                  <el-select v-model="curOperationBtn.type" placeholder="请选择按钮颜色" style="width: 100%;" >
                    <el-option
                      v-for="(item) in operationBtnColor"
                      :key="item.type"
                      :label="item.label" 
                      :value="item.type"
                      :style="{background:item.color || '#fff', color: '#000', borderRadius: '5px'}">
                     </el-option>
                  </el-select>
              </el-form-item>              
              <el-form-item label="按钮方法">
                  <el-input v-model="curOperationBtn.vModel" placeholder="请输入按钮方法名称" />
              </el-form-item>
              <template v-if=" activeData.layout === 'cusDlg' ">
                <!-- 弹窗组件 -->
                <el-form-item label="按钮大小">
                  <el-select v-model="curOperationBtn.size" placeholder="请选择按钮大小" style="width: 100%;" >
                    <el-option
                      v-for="(item) in operationBtnSize"
                      :key="item.size"
                      :label="item.label" 
                      :value="item.size">
                     </el-option>
                  </el-select>
              </el-form-item>
              </template>
              <template v-else>
                <!-- 搜索组件 -->
                <el-form-item label="按钮种类">
                  <el-select v-model="curOperationBtn.category" placeholder="请选择按钮种类" style="width: 100%;" >
                    <el-option
                      v-for="(item) in operationBtnCategrories"
                      :key="item.type"
                      :label="item.label" 
                      :value="item.category">
                     </el-option>
                  </el-select>
              </el-form-item> 
              </template>
          </template>

          <template v-if="activeData.layout == 'tableItem'">
            <el-form-item label="表格高度">
                  <el-input v-model="activeData.tableHeight" placeholder="请输入表格的高度" />
              </el-form-item>
            <template v-if="Object.keys(curColumn).length != 0">
              <el-form-item label="列名">
                  <el-input v-model="curColumn.label" placeholder="请输入列的名称" />
              </el-form-item>
              <el-form-item label="列的prop">
                  <el-input v-model="curColumn.vModel" placeholder="请输入列的prop" />
              </el-form-item>
              <el-form-item label="列的宽度">
                  <el-input v-model="curColumn.width" placeholder="请输入列的宽度" />
              </el-form-item>
            </template>
          </template>          

          <template v-if="activeData.layoutTree">
            <el-divider>布局结构树</el-divider>
            <el-tree
              :data="[activeData]"
              :props="layoutTreeProps"
              node-key="renderKey"
              default-expand-all
              draggable
            >
              <span class="custom-tree-node" slot-scope="{ node, data }" @click="itemClick(node, data)">
                <span class="node-label">
                  <svg-icon class="node-icon" :icon-class="data.tagIcon" />
                  {{ node.label }}
                </span>
                <!-- 删除当前元素 -->
                <span @click="e => {deleteItem(node, data); e.stopPropagation()}">
                  <span v-if="data.children" class="empty">清空</span>
                  <i v-else class="el-icon-circle-close"></i>
                </span>
              </span>
            </el-tree>
          </template>

          <template v-if="activeData.layout === 'colFormItem'">
            <el-divider>正则校验</el-divider>
            <div
              v-for="(item, index) in activeData.regList"
              :key="index"
              class="reg-item"
            >
              <span class="close-btn" @click="activeData.regList.splice(index, 1)">
                <i class="el-icon-close" />
              </span>
              <el-form-item label="表达式">
                <el-input v-model="item.pattern" placeholder="请输入正则" />
              </el-form-item>
              <el-form-item label="错误提示" style="margin-bottom:0">
                <el-input v-model="item.message" placeholder="请输入错误提示" />
              </el-form-item>
            </div>
            <div style="margin-left: 20px">
              <el-button icon="el-icon-circle-plus-outline" type="text" @click="addReg">
                添加规则
              </el-button>
            </div>
          </template>
        </el-form>

        <!-- 表单属性 -->
        <el-form v-show="currentTab === 'form'" size="small" label-width="90px">
          <el-form-item label="表单名">
            <el-input v-model="formConf.formRef" placeholder="请输入表单名（ref）" />
          </el-form-item>
          <el-form-item label="表单模型">
            <el-input v-model="formConf.formModel" placeholder="请输入数据模型" />
          </el-form-item>
          <el-form-item label="校验模型">
            <el-input v-model="formConf.formRules" placeholder="请输入校验模型" />
          </el-form-item>
          <el-form-item label="表单尺寸">
            <el-radio-group v-model="formConf.size">
              <el-radio-button label="medium">
                中等
              </el-radio-button>
              <el-radio-button label="small">
                较小
              </el-radio-button>
              <el-radio-button label="mini">
                迷你
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签对齐">
            <el-radio-group v-model="formConf.labelPosition">
              <el-radio-button label="left">
                左对齐
              </el-radio-button>
              <el-radio-button label="right">
                右对齐
              </el-radio-button>
              <el-radio-button label="top">
                顶部对齐
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签宽度">
            <el-input-number v-model="formConf.labelWidth" placeholder="标签宽度" />
          </el-form-item>
          <el-form-item label="栅格间隔">
            <el-input-number v-model="formConf.gutter" :min="0" placeholder="栅格间隔" />
          </el-form-item>
          <el-form-item label="禁用表单">
            <el-switch v-model="formConf.disabled" />
          </el-form-item>
          <el-form-item label="表单按钮">
            <el-switch v-model="formConf.formBtns" />
          </el-form-item>
          <el-form-item label="显示未选中组件边框">
            <el-switch v-model="formConf.unFocusedComponentBorder" />
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>

    <treeNode-dialog :visible.sync="dialogVisible" title="添加选项" @commit="addNode" />
    <icons-dialog :visible.sync="iconsVisible" :current="activeData[currentIconModel]" @select="setIcon" />
  </div>
</template>

<script>
import { isArray } from 'util'
import TreeNodeDialog from './TreeNodeDialog'
import { isNumberStr } from '@/utils/index'
import IconsDialog from './IconsDialog'
import { inputComponents, selectComponents, layoutComponents } from '@/utils/generator/config'
import draggable from 'vuedraggable'
import treeVue from 'element-ui/packages/tree/src/tree.vue';

const dateTimeFormat = {
  date: 'yyyy-MM-dd',
  week: 'yyyy 第 WW 周',
  month: 'yyyy-MM',
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  monthrange: 'yyyy-MM',
  datetimerange: 'yyyy-MM-dd HH:mm:ss'
}

export default {
  components: {
    TreeNodeDialog,
    IconsDialog,
    draggable
  },
  props: ['showField', 'activeData', 'formConf'],
  data() {
    return {
      currentTab: 'field',
      currentNode: null,
      dialogVisible: false,
      iconsVisible: false,
      currentIconModel: null,
      dateTypeOptions: [
        {
          label: '日(date)',
          value: 'date'
        },
        {
          label: '周(week)',
          value: 'week'
        },
        {
          label: '月(month)',
          value: 'month'
        },
        {
          label: '年(year)',
          value: 'year'
        },
        {
          label: '日期时间(datetime)',
          value: 'datetime'
        }
      ],
      dateRangeTypeOptions: [
        {
          label: '日期范围(daterange)',
          value: 'daterange'
        },
        {
          label: '月范围(monthrange)',
          value: 'monthrange'
        },
        {
          label: '日期时间范围(datetimerange)',
          value: 'datetimerange'
        }
      ],
      colorFormatOptions: [
        {
          label: 'hex',
          value: 'hex'
        },
        {
          label: 'rgb',
          value: 'rgb'
        },
        {
          label: 'rgba',
          value: 'rgba'
        },
        {
          label: 'hsv',
          value: 'hsv'
        },
        {
          label: 'hsl',
          value: 'hsl'
        }
      ],
      justifyOptions: [
        {
          label: 'start',
          value: 'start'
        },
        {
          label: 'end',
          value: 'end'
        },
        {
          label: 'center',
          value: 'center'
        },
        {
          label: 'space-around',
          value: 'space-around'
        },
        {
          label: 'space-between',
          value: 'space-between'
        }
      ],
      curColumn: {},
      curOperationBtn: {},
      operationBtnColor: [
        { label: '默认--白色', type: 'default' },
        { label: '主要--蓝色', type: 'primary', color: '#409EFF' },
        { label: '成功--绿色', type: 'success', color: '#67C23A' },
        { label: '信息--灰色', type: 'info', color: '#909399' },
        { label: '警告--黄色', type: 'warning', color: '#E6A23C', },
        { label: '危险--红色', type: 'danger', color: '#F56C6C', },
      ],
      operationBtnSize: [
        { label: '默认', size: 'default' },
        { label: '中', size: 'medium' },
        { label: '小', size: 'small' },
        { label: '迷你', size: 'mini' },
      ],
      operationBtnCategrories: [
        { label: '增删改查', category: 'default' },
        { label: '上传', category: 'upload' },
      ]
    }
  },
  computed: {
    documentLink() {
      return (
        this.activeData.document
        || 'https://element.eleme.cn/#/zh-CN/component/installation'
      )
    },
    dateOptions() {
      if (
        this.activeData.type !== undefined
        && this.activeData.tag === 'el-date-picker'
      ) {
        if (this.activeData['start-placeholder'] === undefined) {
          return this.dateTypeOptions
        }
        return this.dateRangeTypeOptions
      }
      return []
    },
    tagList() {
      return [
        {
          label: '输入型组件',
          options: inputComponents
        },
        {
          label: '选择型组件',
          options: selectComponents
        }
      ]
    },
    layoutTreeProps() {
      return {
        label: (data, node) => {
          return data.componentName || `${data.label}: ${data.vModel}`
        },
        children: 'children'
      }
    },
    showOperaBtnAttr() {
      return (['searchBox', 'cusDlg'].includes(this.activeData.layout)) && Object.keys(this.curOperationBtn).length != 0
    }
  },
  methods: {
    addReg() {
      this.activeData.regList.push({
        pattern: '',
        message: ''
      })
    },
    addSelectItem() {
      this.activeData.options.push({
        label: '',
        value: ''
      })
    },
    addTreeItem() {
      ++this.idGlobal
      this.dialogVisible = true
      this.currentNode = this.activeData.options
    },
    renderContent(h, { node, data, store }) {
      return (
        <div class="custom-tree-node">
          <span>{node.label}</span>
          <span class="node-operation">
            <i on-click={() => this.append(data)}
              class="el-icon-plus"
              title="添加"
            ></i>
            <i on-click={() => this.remove(node, data)}
              class="el-icon-delete"
              title="删除"
            ></i>
          </span>
        </div>
      )
    },
    append(data) {
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      this.dialogVisible = true
      this.currentNode = data.children
    },
    remove(node, data) {
      const { parent } = node
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    addNode(data) {
      this.currentNode.push(data)
    },
    setOptionValue(item, val) {
      item.value = isNumberStr(val) ? +val : val
    },
    setDefaultValue(val) {
      if (Array.isArray(val)) {
        return val.join(',')
      }
      if (['string', 'number'].indexOf(val) > -1) {
        return val
      }
      if (typeof val === 'boolean') {
        return `${val}`
      }
      return val
    },
    onDefaultValueInput(str) {
      if (isArray(this.activeData.defaultValue)) {
        // 数组
        this.$set(
          this.activeData,
          'defaultValue',
          str.split(',').map(val => (isNumberStr(val) ? +val : val))
        )
      } else if (['true', 'false'].indexOf(str) > -1) {
        // 布尔
        this.$set(this.activeData, 'defaultValue', JSON.parse(str))
      } else {
        // 字符串和数字
        this.$set(
          this.activeData,
          'defaultValue',
          isNumberStr(str) ? +str : str
        )
      }
    },
    onSwitchValueInput(val, name) {
      if (['true', 'false'].indexOf(val) > -1) {
        this.$set(this.activeData, name, JSON.parse(val))
      } else {
        this.$set(this.activeData, name, isNumberStr(val) ? +val : val)
      }
    },
    setTimeValue(val, type) {
      const valueFormat = type === 'week' ? dateTimeFormat.date : val
      this.$set(this.activeData, 'defaultValue', null)
      this.$set(this.activeData, 'value-format', valueFormat)
      this.$set(this.activeData, 'format', val)
    },
    spanChange(val) {
      this.formConf.span = val
    },
    multipleChange(val) {
      this.$set(this.activeData, 'defaultValue', val ? [] : '')
    },
    dateTypeChange(val) {
      this.setTimeValue(dateTimeFormat[val], val)
    },
    rangeChange(val) {
      this.$set(
        this.activeData,
        'defaultValue',
        val ? [this.activeData.min, this.activeData.max] : this.activeData.min
      )
    },
    rateTextChange(val) {
      if (val) this.activeData['show-score'] = false
    },
    rateScoreChange(val) {
      if (val) this.activeData['show-text'] = false
    },
    colorFormatChange(val) {
      this.activeData.defaultValue = null
      this.activeData['show-alpha'] = val.indexOf('a') > -1
      this.activeData.renderKey = +new Date() // 更新renderKey,重新渲染该组件
    },
    openIconsDialog(model) {
      this.iconsVisible = true
      this.currentIconModel = model
    },
    setIcon(val) {
      this.activeData[this.currentIconModel] = val
    },
    tagChange(tagIcon) {
      let target = inputComponents.find(item => item.tagIcon === tagIcon)
      if (!target) target = selectComponents.find(item => item.tagIcon === tagIcon)
      this.$emit('tag-change', target)
    },
    // 布局结构相关操作
    deleteItem(node, data) {
      // 根据data的 vModel 字段进行删除
      console.log(node, data)
      switch (node.level) {
        case 2: {
          // 层级为2时, 的操作          
          const childInd = this.activeData.children.findIndex(ele => ele.vModel == data.vModel)
          if (childInd == -1) {
            console.log('节点删除失败')
            return
          }
          if (data.tagIcon === 'button') {
            // 保留操作按钮的子数组, 方便添加操作按钮
            this.$set(this.activeData.children[childInd], 'children', [])
            return
          }
          const [deletedItem] = this.activeData.children.splice(childInd, 1)
          if (deletedItem.vModel == this.curColumn.vModel) {
            this.curColumn = {}
          }
          break
        }
        case 3: {
          // 层级为3时, 的操作
          const pInd = this.activeData.children.findIndex(ele => ele.layout == 'operationBtnArr')
          if (pInd != -1) {
            const operationBtnArr = this.activeData.children[pInd].children
            const childInd = operationBtnArr.findIndex(ele => ele.vModel == data.vModel)
            const [deletedItem] = operationBtnArr.splice(childInd, 1)
            if (deletedItem.vModel == this.curColumn.vModel) {
              this.curColumn = {}
            }
          }
          break
        }
        default: {
          // node.level == 1 层级为1时, 的操作
          let defaultChild = []  // 保留操作按钮的子数组, 方便添加操作按钮
          if (['searchBox', 'cusDlg'].includes(data.layout)) {
            const operationBtns = this.activeData.children.pop()
            operationBtns.children = []
            defaultChild = [operationBtns]
          }
          this.$set(this.activeData, 'children', defaultChild)
        }
      }
    },
    itemClick(node, data) {
      console.log('node,data:', node, data)
      switch (node.level) {
        case 2: {
          const index = this.activeData.children.findIndex(ele => ele.vModel == data.vModel)
          // console.log(this.activeData.children[index])
          this.curColumn = this.activeData.children[index]
          break
        }
        case 3: {
          const pInd = this.activeData.children.findIndex(ele => ele.layout == 'operationBtnArr')
          if (pInd != -1) {
            const operationBtnArr = this.activeData.children[pInd].children
            const childInd = operationBtnArr.findIndex(ele => ele.vModel == data.vModel)
            this.curOperationBtn = operationBtnArr[childInd]
          }
          break
        }
        default: {
          // node.level == 1
          this.curColumn = {}
        }
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.el-select-dropdown__item.selected {
  &::after {
    content: "✔";
    position: absolute;
    right: 20px;
    font-size: 16px;
  }
}
// 布局结构树
.custom-tree-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
  .empty {
    font-size: 12px;
    color: #409eff;
  }
  .el-icon-circle-close {
    font-size: 15px;
    &:hover {
      color: #409eff;
      font-weight: bold;
    }
  }
}
.right-board {
  width: 350px;
  position: absolute;
  right: 0;
  top: 0;
  padding-top: 3px;
  .field-box {
    position: relative;
    height: calc(100vh - 42px);
    box-sizing: border-box;
    overflow: hidden;
  }
  .el-scrollbar {
    height: 100%;
  }
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
}
.select-item {
  display: flex;
  border: 1px dashed #fff;
  box-sizing: border-box;
  & .close-btn {
    cursor: pointer;
    color: #f56c6c;
  }
  & .el-input + .el-input {
    margin-left: 4px;
  }
}
.select-item + .select-item {
  margin-top: 4px;
}
.select-item.sortable-chosen {
  border: 1px dashed #409eff;
}
.select-line-icon {
  line-height: 32px;
  font-size: 22px;
  padding: 0 4px;
  color: #777;
}
.option-drag {
  cursor: move;
}
.time-range {
  .el-date-editor {
    width: 227px;
  }
  ::v-deep .el-icon-time {
    display: none;
  }
}
.document-link {
  position: absolute;
  display: block;
  width: 26px;
  height: 26px;
  top: 0;
  left: 0;
  cursor: pointer;
  background: #409eff;
  z-index: 1;
  border-radius: 0 0 6px 0;
  text-align: center;
  line-height: 26px;
  color: #fff;
  font-size: 18px;
}
.node-label {
  font-size: 14px;
}
.node-icon {
  color: #bebfc3;
}
</style>
