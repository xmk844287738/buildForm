
export const tpl = (searchData, columnData) =>
`<template>
  <div class="container">
    <!--搜索-->
    <search-com
      id="searchBox"
      ref="searchBox"
      :showMoreSearch="showMoreSearch"
      :searchData="searchData"
      :queryParam="queryParam"
      @switchShowMoreSearchState="switchShowMoreSearchState"
    >
		<div slot="btn">
    <!--操作按钮-->
			${searchData.searchOperBtns}
		</div>	
	</search-com>
    <!--表格-->
    <pltable-com
      v-if="tableHeight"
      :tableHeight="tableHeight"
      :loading="loading"
      :columnData="columnData"
      :dataSource="dataSource"
    >
	<template v-slot:data="slotProps">
        <div>{{ slotProps.scope.row[slotProps.item.prop] }}</div>
    </template>
	</pltable-com>
    <!--分页-->
    <pagination
      :ipagination="ipagination"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></pagination>
  </div>
</template>
<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin2'
import searchCom from '@/components/czyCom/SearchCom'
import pltableCom from '@/components/czyCom/pltableCom'
import pagination from '@/components/czyCom/paginationCom'
import { postAction, getAction } from '@/api/manage'
export default {
  mixins: [JeecgListMixin],
  components: { searchCom, pltableCom, pagination },
  data() {
    return {
      tableHeight: null,
      // 搜索
      searchData: ${searchData.searchItems},
      // 表格行标题
      columnData: ${columnData},
      url: {
        list: \`\`,
        selectData: \`\`,
      },
    }
  },
  methods: {
${searchData.searchOperBtnsMethod}
  },
}
</script>
<style lang="scss" scoped>
.container {
}
</style>
`