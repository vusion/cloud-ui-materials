<template>
  <div class="root" v-loading="loading">
    <div v-show="!showDetail">
      <div class="header">
        <el-input
          class="header-search"
          v-model="search"
          placeholder="请输入图标名称进行搜索"
          @change="handleSearch"
          clearable
          :prefix-icon="Search"
        ></el-input>
      </div>
      <div class="container">
        <div class="cardItem" v-for="{ subjectInfo, iconInfo } in list" :key="subjectInfo?.id" @dblclick="handleDblClick(subjectInfo, iconInfo)">
          <div class="iconList">
            <template v-for="item in sliceIconList(iconInfo, 'intercept')" :key="item.id">
              <img draggable="false" class="iconItem" :src="getIconSrc(item.iconImg)" :alt="item.iconName" />
            </template>
          </div>
          <div class="itemInfo" mt-16>
            <div class="itemInfo-left">
              <img src="@/assets/notebook-2.svg" alt="notebook-2" />
              <div class="itemInfo-left-title" v-tooltip>{{ subjectInfo.subjectName }}</div>
            </div>
            <div class="itemInfo-right">
              <span class="itemInfo-right-title">icons</span>
              <span class="itemInfo-right-count">{{ iconInfo?.length || 0 }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="footer" mt-16>
        <el-pagination
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.size"
          :page-sizes="[10, 50, 100]"
          background
          layout="total, sizes, prev, pager, next"
          :total="pagination.total"
          :hide-on-single-page="false"
          @size-change="handlePaginationChange"
          @current-change="handlePaginationChange"
        />
      </div>
    </div>
    <div v-if="showDetail">
      <div class="detailTitle">
        <span class="detailTitleDecoration"></span>
        <span>{{ detailInfo?.subjectName }}（{{ detailList?.length || 0 }}）</span>
      </div>
      <div class="detail">
        <div
          class="detailItem"
          v-for="item in sliceIconList(detailList, 'all')"
          :key="item.id"
          :select="selectIcon === item.id"
          @click="handleSelect(item)"
        >
          <img draggable="false" class="detailItemImg" :src="getIconSrc(item.iconImg)" :alt="item.iconName" />
          <div class="detailItemName" v-tooltip>{{ item.iconName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { requestApi, getIconList } from '@/apis';
import { iconProductPath } from '@/config';
import { getIconSrc } from '@/utils/handleSvg';

const emits = defineEmits(['showDetail', 'select']);

// header
const search = ref('');
const handleSearch = () => fetchIconList();

// container
const list = ref([]);
const loading = ref(false);
const fetchIconList = () => {
  loading.value = true;
  requestApi(
    getIconList,
    {
      iconName: search.value,
      page: pagination.value.page,
      size: pagination.value.size,
    },
    (res) => {
      list.value = res.data;
      if (res.total) {
        pagination.value.total = res.total;
      }
    },
    (err) => {
      console.log(err);
      pagination.value.total = 0;
    },
    () => {
      loading.value = false;
    }
  );
};
onMounted(() => {
  fetchIconList();
});

const showDetail = ref(false);
const detailInfo = ref(undefined);
const detailList = ref([]);
const handleDblClick = (subjectInfo, iconInfo) => {
  showDetail.value = true;
  detailInfo.value = subjectInfo;
  detailList.value = iconInfo;
  emits('showDetail', subjectInfo);
};

// iconList
const sliceIconList = (iconInfo = [], type = 'intercept') => {
  const temp = type === 'intercept' ? iconInfo.slice(0, 9) : iconInfo;
  return temp.reduce((acc, item) => {
    const target = item?.itgSzhYysdIconInfoBase;
    if (target) {
      acc.push({ id: target.id, iconImg: target.iconImg, iconName: target.iconName });
    }
    return acc;
  }, []);
};

const selectIcon = ref(undefined);
const handleSelect = (item) => {
  selectIcon.value = item.id;
  emits('select', item);
};

// footer
const initialPage = {
  page: 1,
  size: 10,
  total: 0,
};
const pagination = ref(initialPage);
const handlePaginationChange = () => {
  fetchIconList();
};

defineExpose({
  showDetail,
  selectIcon,
});
</script>

<style lang="scss" scoped>
.root {
  .header {
    display: flex;
    justify-content: flex-end;
    .header-search {
      width: 300px;
      margin-bottom: 16px;
    }
  }

  .container {
    // width: 1136px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 243px 243px;
    grid-gap: 16px 24px;

    height: 502px;
    overflow-y: auto;
    @include scrollbar;

    .cardItem {
      box-sizing: border-box;
      height: 243px;
      padding: 16px;
      transition: border-color 0.2s;
      border: 1px solid $border-color;
      // 当前元素和子元素不可选中
      user-select: none;
      &:hover {
        border-color: $primary-color;
      }

      .iconList {
        width: 100%;
        height: 175px;
        box-sizing: border-box;
        background-color: $bg-color;
        border-radius: 4px;
        padding: 24px 16px;

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 16px 16px;
        overflow: hidden;

        .iconItem {
          display: block;
          width: 32px;
          height: 32px;
          font-size: 32px;
        }
      }

      .itemInfo {
        height: 20px;
        font-size: 16px;
        display: flex;
        // 两端对齐
        justify-content: space-between;

        .itemInfo-left {
          display: flex;
          align-items: center;
          max-width: 116px;

          .itemInfo-left-title {
            margin-left: 4px;
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: $title-color;
          }
        }

        .itemInfo-right {
          display: flex;
          align-items: baseline;
          line-height: 20px;
          max-width: 58px;
          .itemInfo-right-title {
            color: $auxiliary-text-color;
            font-size: 14px;
            margin-right: 4px;
          }
          .itemInfo-right-count {
            color: $count-color;
          }
        }
      }
    }
  }

  .detailTitle {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
    height: 44px;
    color: $title-color;
    font-weight: 700;
    font-size: 16px;

    .detailTitleDecoration {
      width: 4px;
      height: 14px;
      background-color: $primary-color;
    }
  }
  .detail {
    height: 490px;
    display: grid;
    grid-template-columns: repeat(8, minmax(126px, 1fr));
    grid-template-rows: 108px 108px;
    grid-gap: 32px 16px;
    overflow-y: auto;
    @include scrollbar;

    .detailItem {
      box-sizing: border-box;
      height: 108px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: border-color 0.2s;
      gap: 4px;
      user-select: none;
      border: 1px solid transparent;
      &:hover,
      &[select='true'] {
        border: 1px solid $primary-color;
      }

      .detailItemImg {
        width: 48px;
        height: 48px;
        font-size: 48px;
        user-select: none;
      }

      .detailItemName {
        max-width: 100%;
        font-size: 16px;
        color: $auxiliary-text-color;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 1px;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
