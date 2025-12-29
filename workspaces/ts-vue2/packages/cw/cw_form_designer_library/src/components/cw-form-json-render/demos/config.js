export const initLayout = `<template>
<u-linear-layout style="height:100%; background:#fff;  --custom-start: auto; min-height: 400px;" type="root" gap="none">
  <u-form style="min-height:100%; padding:16px; --custom-start: auto; align-content: flex-start;" formTemplateRenderRef layout="inline-flex" :repeat="2" labelLayout="inline" bindEntity="Form_482bd3cd">
    <u-form-item layout="center" :rules="[{validate: 'required',message: \`表单项不得为空\`,trigger: 'input+blur',required: true}]" :required="true">
      <template #label>
        <u-text text="单行输入"></u-text>
      </template>
      <u-input placeholder="请输入" :emptyValueIsNull="true" :value.sync="Form_482bd3cd.property1"></u-input>
    </u-form-item>
    <u-form-item layout="center">
      <template #label>
        <u-text text="整数输入"></u-text>
      </template>
      <u-number-input :decimalPlacesOmitZero="true" unitType="suffix" :value.sync="Form_482bd3cd.property2"></u-number-input>
    </u-form-item>
    <u-form-item layout="center">
      <template #label>
        <u-text text="小数输入"></u-text>
      </template>
      <u-number-input-decimal :decimalPlacesOmitZero="true" :decimalPlacesValue="2" :decimalLength="2" unitType="suffix" :value.sync="Form_482bd3cd.property3"></u-number-input-decimal>
    </u-form-item>
    <u-form-item layout="center" :rules="[{validate: 'required',message: \`表单项不得为空\`,trigger: 'input+blur',required: true}]" :required="true">
      <template #label>
        <u-text text="多行输入"></u-text>
      </template>
      <u-textarea style="--custom-start: auto;min-width:initial;
max-width:min(240px,100%);" placeholder="请输入" limitPosition="outside" :emptyValueIsNull="true" :value.sync="Form_482bd3cd.property4"></u-textarea>
    </u-form-item>
    <u-form-item layout="center">
      <template #label>
        <u-text text="单选组"></u-text>
      </template>
      <u-radios :value.sync="Form_482bd3cd.property5">
        <u-radio label="1">
          <template #item>
            <u-text text="选项1"></u-text>
          </template>
        </u-radio>
        <u-radio label="2">
          <template #item>
            <u-text text="选项2"></u-text>
          </template>
        </u-radio>
      </u-radios>
    </u-form-item>
    <u-form-item layout="center">
      <template #label>
        <u-text text="多选组"></u-text>
      </template>
      <u-checkboxes :value.sync="Form_482bd3cd.property6">
        <u-checkbox label="1">
          <template #item>
            <u-text text="选项1"></u-text>
          </template>
        </u-checkbox>
        <u-checkbox label="2">
          <template #item>
            <u-text text="选项2"></u-text>
          </template>
        </u-checkbox>
      </u-checkboxes>
    </u-form-item>
    <u-form-item layout="center" :span="2">
      <template #label>
        <u-text text="文件上传"></u-text>
      </template>
      <u-uploader display="inline" url="/upload" urlField="filePath" :limit="10" :fileIconSwitcher="true" :downloadIconSwitcher="true" :fileSize="true" maxSize="50MB" converter="json" :multiple="true" :multipleOnce="true" fileConnectionGroup="lcap_default_connection" :value.sync="Form_482bd3cd.property7">
        <template #file-list>
          <i-ico style="margin: 0px 8px 0px 0px;" flag="file-icon" name="file-default" icotype="only"></i-ico>
          <u-text style="margin: 0px 8px 0px 0px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: inherit;" flag="file-name" text="文件名称"></u-text>
          <u-text style="margin: 0px 8px 0px 0px;" flag="file-size" text="文件大小"></u-text>
          <i-ico style="margin: 0px 8px 0px 0px;" flag="download-icon" name="download" icotype="only"></i-ico>
        </template>
        <u-button color="primary" icon="upload" text="文件上传"></u-button>
        <template #dragDescription></template>
      </u-uploader>
    </u-form-item>
    <u-form-item layout="center">
      <template #label>
        <u-text text="选择器"></u-text>
      </template>
      <u-select placeholder="请选择" :pagination="true" :pageSize="50" :emptyValueIsNull="true" appendTo="body" :value.sync="Form_482bd3cd.property8">
        <template #option="current"></template>
        <template #renderFooter></template>
      </u-select>
    </u-form-item>
    <u-form-item layout="center">
      <template #label>
        <u-text text="地区选择"></u-text>
      </template>
      <u-region-select converter="name" placeholder="请选择地区" :value.sync="Form_482bd3cd.property9"></u-region-select>
    </u-form-item>
    <u-form-item layout="center">
      <template #label>
        <u-text text="日期选择"></u-text>
      </template>
      <u-date-picker :emptyValueIsNull="true" placeholder="请选择日期" :value.sync="Form_482bd3cd.property10"></u-date-picker>
    </u-form-item>
    <u-form-item layout="center">
      <template #label>
        <u-text text="时间选择"></u-text>
      </template>
      <u-time-picker style="--custom-start: auto;min-width:initial;
max-width:min(240px,100%);" placeholder="请选择时间" :value.sync="Form_482bd3cd.property11"></u-time-picker>
    </u-form-item>
    <u-form-item layout="center" :span="2">
      <template #label>
        <u-text text="日期时间选择"></u-text>
      </template>
      <u-date-time-picker :emptyValueIsNull="true" converter="json" placeholder="请选择时间" :value.sync="Form_482bd3cd.property12"></u-date-time-picker>
    </u-form-item>
    <u-form-item labelLayout="block" layout="center" :span="2">
      <template #label>
        <u-text text="子表单" :subFormLabel="true"></u-text>
      </template>
      <u-linear-layout :wrap="true" mode="flex" direction="vertical" justify="start" alignment="start" :subFormLayout="true" subFormBindEntity="Form_482bd3cd_sub_form_info">
        <u-linear-layout direction="horizontal" :wrap="true" operateType="operateRowList">
          <u-button color="primary" text="添 加" subFormBtnType="addBtn" @click="button_4_click($event)"></u-button>
          <u-button style="--custom-start: auto; display: none;" color="default" text="导 出" subFormBtnType="exportBtn"></u-button>
        </u-linear-layout>
        <u-validator style="width:100%;" label="子表单">
          <u-table-view style="--custom-start: auto; width: min(2020px, 100%);" :pageSize="20" :pageNumber="1" :subForm="true" :pagination="false" :showSizer="true" :dataSource="Form_482bd3cd_sub_form" subFormBindEntity="Form_482bd3cd_sub_form_info">
            <u-table-view-column type="index" width="60" subFormInitialColumn="index" :fixed="true">
              <template #title>
                <u-text text="序号"></u-text>
              </template>
              <template #cell="current"></template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
              <template #editcell="current"></template>
              <template #expand-content="current"></template>
            </u-table-view-column>
            <u-table-view-column width="180" field="property1">
              <template #title>
                <u-text style="color: red;" text="*"></u-text>
                <u-text text="单行输入"></u-text>
              </template>
              <template #cell="current">
                <u-validator style="width:100%;" label="单行输入" appendTo="body" :rules="[{validate: 'required',message: \`表单项不得为空\`,trigger: 'input+blur',required: true}]">
                  <u-input placeholder="请输入" :emptyValueIsNull="true" :value.sync="current.item.property1"></u-input>
                </u-validator>
              </template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
            </u-table-view-column>
            <u-table-view-column width="180" field="property2">
              <template #title>
                <u-text text="整数输入"></u-text>
              </template>
              <template #cell="current">
                <u-validator style="width:100%;" label="整数输入" appendTo="body">
                  <u-number-input :decimalPlacesOmitZero="true" unitType="suffix" :value.sync="current.item.property2"></u-number-input>
                </u-validator>
              </template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
            </u-table-view-column>
            <u-table-view-column width="180" field="property3">
              <template #title>
                <u-text text="小数输入"></u-text>
              </template>
              <template #cell="current">
                <u-validator style="width:100%;" label="小数输入" appendTo="body">
                  <u-number-input-decimal :decimalPlacesOmitZero="true" :decimalPlacesValue="2" :decimalLength="2" unitType="suffix" :value.sync="current.item.property3"></u-number-input-decimal>
                </u-validator>
              </template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
            </u-table-view-column>
            <u-table-view-column width="180" field="property4">
              <template #title>
                <u-text text="多行输入"></u-text>
              </template>
              <template #cell="current">
                <u-validator style="width:100%;" label="多行输入" appendTo="body">
                  <u-textarea style="--custom-start: auto;min-width:initial;
max-width:min(240px,100%);" placeholder="请输入" limitPosition="outside" :emptyValueIsNull="true" :value.sync="current.item.property4"></u-textarea>
                </u-validator>
              </template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
            </u-table-view-column>
            <u-table-view-column width="180" field="property5">
              <template #title>
                <u-text text="单选组"></u-text>
              </template>
              <template #cell="current">
                <u-validator style="width:100%;" label="单选组" appendTo="body">
                  <u-radios :value.sync="current.item.property5">
                    <u-radio label="1">
                      <template #item>
                        <u-text text="选项1"></u-text>
                      </template>
                    </u-radio>
                    <u-radio label="2">
                      <template #item>
                        <u-text text="选项2"></u-text>
                      </template>
                    </u-radio>
                  </u-radios>
                </u-validator>
              </template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
            </u-table-view-column>
            <u-table-view-column width="180" field="property6">
              <template #title>
                <u-text text="多选组"></u-text>
              </template>
              <template #cell="current">
                <u-validator style="width:100%;" label="多选组" appendTo="body">
                  <u-checkboxes :value.sync="current.item.property6">
                    <u-checkbox label="1">
                      <template #item>
                        <u-text text="选项1"></u-text>
                      </template>
                    </u-checkbox>
                    <u-checkbox label="2">
                      <template #item>
                        <u-text text="选项2"></u-text>
                      </template>
                    </u-checkbox>
                  </u-checkboxes>
                </u-validator>
              </template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
            </u-table-view-column>
            <u-table-view-column width="180" field="property7">
              <template #title>
                <u-text text="选择器"></u-text>
              </template>
              <template #cell="current">
                <u-validator style="width:100%;" label="选择器" appendTo="body">
                  <u-select placeholder="请选择" :pagination="true" :pageSize="50" :emptyValueIsNull="true" appendTo="body" :value.sync="current.item.property7">
                    <template #option="current"></template>
                    <template #renderFooter></template>
                  </u-select>
                </u-validator>
              </template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
            </u-table-view-column>
            <u-table-view-column width="180" field="property8">
              <template #title>
                <u-text text="日期选择"></u-text>
              </template>
              <template #cell="current">
                <u-validator style="width:100%;" label="日期选择" appendTo="body">
                  <u-date-picker :emptyValueIsNull="true" placeholder="请选择日期" :value.sync="current.item.property8"></u-date-picker>
                </u-validator>
              </template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
            </u-table-view-column>
            <u-table-view-column width="180" field="property9">
              <template #title>
                <u-text text="时间选择"></u-text>
              </template>
              <template #cell="current">
                <u-validator style="width:100%;" label="时间选择" appendTo="body">
                  <u-time-picker style="--custom-start: auto;min-width:initial;
max-width:min(240px,100%);" placeholder="请选择时间" :value.sync="current.item.property9"></u-time-picker>
                </u-validator>
              </template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
            </u-table-view-column>
            <u-table-view-column width="180" field="property10">
              <template #title>
                <u-text text="日期时间选择"></u-text>
              </template>
              <template #cell="current">
                <u-validator style="width:100%;" label="日期时间选择" appendTo="body">
                  <u-date-time-picker :emptyValueIsNull="true" converter="json" placeholder="请选择时间" :value.sync="current.item.property10"></u-date-time-picker>
                </u-validator>
              </template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
            </u-table-view-column>
            <u-table-view-column width="160" subFormInitialColumn="action" operateType="operateColumnList" :fixed="true">
              <template #title>
                <u-text text="操作"></u-text>
              </template>
              <template #cell="current">
                <u-linear-layout direction="horizontal" :wrap="true">
                  <u-link text="复制" subFormBtnType="copyLink" @click="link_1_click($event, current)"></u-link>
                  <u-link text="删除" subFormBtnType="deleteLink" @click="link_3_click($event, current)"></u-link>
                </u-linear-layout>
              </template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
              <template #editcell="current"></template>
              <template #expand-content="current"></template>
            </u-table-view-column>
          </u-table-view>
        </u-validator>
      </u-linear-layout>
    </u-form-item>
    <u-form-item labelLayout="block" layout="center" :span="2">
      <template #label>
        <u-text text="子表单" :subFormLabel="true"></u-text>
      </template>
      <u-linear-layout :wrap="true" mode="flex" direction="vertical" justify="start" alignment="start" :subFormLayout="true" subFormBindEntity="Form_482bd3cd_sub_form_info1">
        <u-linear-layout direction="horizontal" :wrap="true" operateType="operateRowList">
          <u-button color="primary" text="添 加" subFormBtnType="addBtn" @click="button_6_click($event)"></u-button>
          <u-button style="--custom-start: auto; display: none;" color="default" text="导 出" subFormBtnType="exportBtn"></u-button>
        </u-linear-layout>
        <u-validator style="width:100%;" label="子表单">
          <u-table-view style="--custom-start: auto; width: min(2020px, 100%);" :pageSize="20" :pageNumber="1" :subForm="true" :pagination="false" :showSizer="true" :dataSource="Form_482bd3cd_sub_form1" subFormBindEntity="Form_482bd3cd_sub_form_info1">
            <u-table-view-column type="index" width="60" subFormInitialColumn="index" :fixed="true">
              <template #title>
                <u-text text="序号"></u-text>
              </template>
              <template #cell="current"></template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
              <template #editcell="current"></template>
              <template #expand-content="current"></template>
            </u-table-view-column>
            <u-table-view-column width="180" field="property1">
              <template #title>
                <u-text text="单行输入"></u-text>
              </template>
              <template #cell="current">
                <u-validator style="width:100%;" label="单行输入" appendTo="body">
                  <u-input placeholder="请输入" :emptyValueIsNull="true" :value.sync="current.item.property1"></u-input>
                </u-validator>
              </template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
            </u-table-view-column>
            <u-table-view-column width="180" field="property2">
              <template #title>
                <u-text style="color: red;" text="*"></u-text>
                <u-text text="整数输入"></u-text>
              </template>
              <template #cell="current">
                <u-validator style="width:100%;" label="整数输入" appendTo="body" :rules="[{validate: 'required',message: \`表单项不得为空\`,trigger: 'input+blur',required: true}]">
                  <u-number-input :decimalPlacesOmitZero="true" unitType="suffix" :value.sync="current.item.property2"></u-number-input>
                </u-validator>
              </template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
            </u-table-view-column>
            <u-table-view-column width="180" field="property3">
              <template #title>
                <u-text text="小数输入"></u-text>
              </template>
              <template #cell="current">
                <u-validator style="width:100%;" label="小数输入" appendTo="body">
                  <u-number-input-decimal :decimalPlacesOmitZero="true" :decimalPlacesValue="2" :decimalLength="2" unitType="suffix" :value.sync="current.item.property3"></u-number-input-decimal>
                </u-validator>
              </template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
            </u-table-view-column>
            <u-table-view-column width="180" field="property4">
              <template #title>
                <u-text text="多行输入"></u-text>
              </template>
              <template #cell="current">
                <u-validator style="width:100%;" label="多行输入" appendTo="body">
                  <u-textarea style="--custom-start: auto;min-width:initial;
max-width:min(240px,100%);" placeholder="请输入" limitPosition="outside" :emptyValueIsNull="true" :value.sync="current.item.property4"></u-textarea>
                </u-validator>
              </template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
            </u-table-view-column>
            <u-table-view-column width="180" field="property5">
              <template #title>
                <u-text text="单选组"></u-text>
              </template>
              <template #cell="current">
                <u-validator style="width:100%;" label="单选组" appendTo="body">
                  <u-radios :value.sync="current.item.property5">
                    <u-radio label="1">
                      <template #item>
                        <u-text text="选项1"></u-text>
                      </template>
                    </u-radio>
                    <u-radio label="2">
                      <template #item>
                        <u-text text="选项2"></u-text>
                      </template>
                    </u-radio>
                  </u-radios>
                </u-validator>
              </template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
            </u-table-view-column>
            <u-table-view-column width="180" field="property6">
              <template #title>
                <u-text text="多选组"></u-text>
              </template>
              <template #cell="current">
                <u-validator style="width:100%;" label="多选组" appendTo="body">
                  <u-checkboxes :value.sync="current.item.property6">
                    <u-checkbox label="1">
                      <template #item>
                        <u-text text="选项1"></u-text>
                      </template>
                    </u-checkbox>
                    <u-checkbox label="2">
                      <template #item>
                        <u-text text="选项2"></u-text>
                      </template>
                    </u-checkbox>
                  </u-checkboxes>
                </u-validator>
              </template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
            </u-table-view-column>
            <u-table-view-column width="180" field="property7">
              <template #title>
                <u-text text="选择器"></u-text>
              </template>
              <template #cell="current">
                <u-validator style="width:100%;" label="选择器" appendTo="body">
                  <u-select placeholder="请选择" :pagination="true" :pageSize="50" :emptyValueIsNull="true" appendTo="body" :value.sync="current.item.property7">
                    <template #option="current"></template>
                    <template #renderFooter></template>
                  </u-select>
                </u-validator>
              </template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
            </u-table-view-column>
            <u-table-view-column width="180" field="property8">
              <template #title>
                <u-text text="日期选择"></u-text>
              </template>
              <template #cell="current">
                <u-validator style="width:100%;" label="日期选择" appendTo="body">
                  <u-date-picker :emptyValueIsNull="true" placeholder="请选择日期" :value.sync="current.item.property8"></u-date-picker>
                </u-validator>
              </template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
            </u-table-view-column>
            <u-table-view-column width="180" field="property9">
              <template #title>
                <u-text text="时间选择"></u-text>
              </template>
              <template #cell="current">
                <u-validator style="width:100%;" label="时间选择" appendTo="body">
                  <u-time-picker style="--custom-start: auto;min-width:initial;
max-width:min(240px,100%);" placeholder="请选择时间" :value.sync="current.item.property9"></u-time-picker>
                </u-validator>
              </template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
            </u-table-view-column>
            <u-table-view-column width="180" field="property10">
              <template #title>
                <u-text text="日期时间选择"></u-text>
              </template>
              <template #cell="current">
                <u-validator style="width:100%;" label="日期时间选择" appendTo="body">
                  <u-date-time-picker :emptyValueIsNull="true" converter="json" placeholder="请选择时间" :value.sync="current.item.property10"></u-date-time-picker>
                </u-validator>
              </template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
            </u-table-view-column>
            <u-table-view-column width="160" subFormInitialColumn="action" operateType="operateColumnList" :fixed="true">
              <template #title>
                <u-text text="操作"></u-text>
              </template>
              <template #cell="current">
                <u-linear-layout direction="horizontal" :wrap="true">
                  <u-link text="复制" subFormBtnType="copyLink" @click="link_4_click($event, current)"></u-link>
                  <u-link text="删除" subFormBtnType="deleteLink" @click="link_5_click($event, current)"></u-link>
                </u-linear-layout>
              </template>
              <template #expander="current">
                <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
              </template>
              <template #editcell="current"></template>
              <template #expand-content="current"></template>
            </u-table-view-column>
          </u-table-view>
        </u-validator>
      </u-linear-layout>
    </u-form-item>
  </u-form>
  <u-modal :ref="\`delInfoModal\`" icon="warning">
    <template #foot>
      <u-linear-layout justify="end" gap="normal">
        <u-button text="取 消" subFormBtnType="cancelBtn" @click="button_1_click($event)"></u-button>
        <u-button color="primary" text="确 定" subFormBtnType="confirmBtn" @click="button_2_click($event)"></u-button>
      </u-linear-layout>
    </template>
    <template #body>
      <u-text style="font-size:18px;font-weight:bold;" text="请确认是否删除？"></u-text>
      <u-linear-layout direction="horizontal" :wrap="true">
        <u-text text="删除后将无法恢复，请谨慎操作"></u-text>
      </u-linear-layout>
    </template>
    <template #title>
      <u-text text="删除"></u-text>
    </template>
    <template #heading></template>
  </u-modal>
</u-linear-layout>
</template>
<script>
export default {
  name: "form_designer",
  props: {
    initData: {
      type: Object,
      default: () => ({})
    }
  },
  data(){
    const initData = this.$props.initData || {};
    const defaultStructures = {
      Form_482bd3cd: () => ({
          'id': undefined,
          'createdTime': undefined,
          'updatedTime': undefined,
          'createdBy': undefined,
          'updatedBy': undefined,
          'property1': undefined,
          'property2': undefined,
          'property3': undefined,
          'property4': undefined,
          'property5': undefined,
          'property6': undefined,
          'property7': undefined,
          'property8': undefined,
          'property9': undefined,
          'property10': undefined,
          'property11': undefined,
          'property12': undefined,
        }),
      Form_482bd3cd_sub_form: () => [],
      Form_482bd3cd_sub_form1: () => [],
    };
    const link = (key) => {
      const factory = defaultStructures[key];
      const res = initData[key] = typeof factory === 'function' ? factory() : {};
      return res;
    };

    return {
      currentData: initData, // 表单数据（包括： 主表+子表单）
      delSubFormDataSource: undefined, // 待删除的子表单数据源
      delInfoIndex: undefined, // 待删除的数据下标
      Form_482bd3cd: link('Form_482bd3cd'),
      Form_482bd3cd_sub_form: link('Form_482bd3cd_sub_form'),
      Form_482bd3cd_sub_form1: link('Form_482bd3cd_sub_form1')
    }
  },
  mounted(){
    // console.log('mounted', this.currentData)
  },
  methods: {
    async button_4_click(event) {
      await this.Form_482bd3cd_sub_form.push({
        id: undefined,
        createdTime: undefined,
        updatedTime: undefined,
        createdBy: undefined,
        updatedBy: undefined,
        relatedEntity: undefined,
        property1: undefined,
        property2: undefined,
        property3: undefined,
        property4: undefined,
        property5: undefined,
        property6: undefined,
        property7: undefined,
        property8: undefined,
        property9: undefined,
        property10: undefined,
      });
    },
    async link_1_click(event, current) {
      await this.Form_482bd3cd_sub_form.push({
        id: undefined,
        createdTime: undefined,
        updatedTime: undefined,
        createdBy: undefined,
        updatedBy: undefined,
        relatedEntity: undefined,
        property1: current.item.property1,
        property2: current.item.property2,
        property3: current.item.property3,
        property4: current.item.property4,
        property5: current.item.property5,
        property6: [...current.item.property6],
        property7: current.item.property7,
        property8: current.item.property8,
        property9: current.item.property9,
        property10: current.item.property10,
      });
    },
    async link_3_click(event, current) {
      this.delInfoIndex = current.index; 
      this.delSubFormDataSource = this.Form_482bd3cd_sub_form; 
      await this.$refs?.delInfoModal?.open?.();
    },
    async button_6_click(event) {
      await this.Form_482bd3cd_sub_form1.push({
        id: undefined,
        createdTime: undefined,
        updatedTime: undefined,
        createdBy: undefined,
        updatedBy: undefined,
        relatedEntity: undefined,
        property1: undefined,
        property2: undefined,
        property3: undefined,
        property4: undefined,
        property5: undefined,
        property6: undefined,
        property7: undefined,
        property8: undefined,
        property9: undefined,
        property10: undefined,
      });
    },
    async link_4_click(event, current) {
      await this.Form_482bd3cd_sub_form1.push({
        id: undefined,
        createdTime: undefined,
        updatedTime: undefined,
        createdBy: undefined,
        updatedBy: undefined,
        relatedEntity: undefined,
        property1: current.item.property1,
        property2: current.item.property2,
        property3: current.item.property3,
        property4: current.item.property4,
        property5: current.item.property5,
        property6: [...current.item.property6],
        property7: current.item.property7,
        property8: current.item.property8,
        property9: current.item.property9,
        property10: current.item.property10,
      });
    },
    async link_5_click(event, current) {
      this.delInfoIndex = current.index; 
      this.delSubFormDataSource = this.Form_482bd3cd_sub_form1; 
      await this.$refs?.delInfoModal?.open?.();
    },
    async button_1_click(event) {
      await this.$refs?.delInfoModal?.close?.();
    },
    async button_2_click(event) {
      this.delSubFormDataSource?.splice?.(this.delInfoIndex, 1); 
      await this.$refs?.delInfoModal?.close?.();
    },
  }
};
</script>
`;
