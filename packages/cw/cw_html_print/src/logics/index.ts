import '@nasl/types';
import 'jquery-migrate';
import './jquery.jqprint-0.3.js'

export {};


/**
 * @NaslLogic
 * @type both
 * @title 打印页面
 * @desc 打印页面
 * @param el 需要打印的节点
 * @returns 返回结果描述
 */
export function htmlPrint(el: nasl.ui.ViewComponent) {
  let id = 'print__' + Math.random().toString(36).substr(2);
  (el as Element).id = id;
  $(`#${id}`).jqprint();
  (el as Element).id = '';
}

