import { flatten, concat } from 'lodash';
// 1. babel-plugin-import 插件将上面转换成下面 （tree-shaking）
//import flatten from 'lodash/flatten';
//import concat from 'lodash/concat';

console.log(flatten);
console.log(concat);
// 2. babel-logger 插件将上面转换成下面 （添加位置标记）
// console.log('src/index.js 6:0 flatten');
// console.log('src/index.js 7:0 concat');
