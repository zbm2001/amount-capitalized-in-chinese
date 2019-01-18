/*
 * @name: amount-capitalized-in-chinese
 * @version: 0.1.0
 * @description: 金额数值大写中文转换
 * @author: zbm2001@aliyun.com
 * @license: Apache 2.0
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.amountCapitalizedInChinese = factory());
}(this, function () { 'use strict';

  /**
   * 将数字金额转换为大写中文金额
   * @param {number|string} n
   * @returns {string}
   */
  function amountCapitalizedInChinese (n) {
    if (!/^(?:0|[1-9]\d*)(?:\.\d+)?$/.test(n)) {
      console.warn('参数 ' + n + ' 为非法数值！');
      return ''
    }
    var unit = '京亿万仟佰拾兆万仟佰拾亿仟佰拾万仟佰拾元角分', str = '', p;
    n += '00';
    p = n.indexOf('.');
    if (p > -1)
      { n = n.substring(0, p) + n.substr(p + 1, 2); }
    unit = unit.substr(unit.length - n.length);
    for (var l = n.length, i = 0; i < l; i++) {
      str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
    }
    return str.replace(/零(?:仟|佰|拾|角)/g, '零').
    replace(/零+/g, '零').
    replace(/零(兆|万|亿|元)/g, '$1').
    replace(/(兆|亿)万/g, '$1').
    replace(/(京|兆)亿/g, '$1').
    replace(/(京)兆/g, '$1').
    replace(/(京|兆|亿|仟|佰|拾)(万?)(\S)仟/g, '$1$2零$3仟').
    replace(/^元零?|零分/g, '').
    replace(/(元|角)$/g, '$1整')
  }

  return amountCapitalizedInChinese;

}));
