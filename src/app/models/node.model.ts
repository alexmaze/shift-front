/**
 * INode          节点
 * INodeType      节点类型
 * INodePosition  节点位置
 * INodeInput     节点输入
 * INodeOutput    节点输出
 */

export interface INode {
  id: string;
  type: INodeType;
  // 某些类型的patch需要填写operation, ==/!=/>/</+/-/*...
  operation: string;
  // 硬件地址
  adress: string;
  // 用户设置label
  label: string;
  // 图形坐标
  position: INodePosition;
  inputs: INodeInput[];
  outputs: INodeOutput[];
}

export interface INodeType {
  // virtual/device
  primary: string;
  // [virtual]: logic/control/operator/math/utility/data
  secondary: string;
  // [[logic]]: and/or/not/condition
  // [[...]]
  tertiary: string;
}

export interface INodePosition {
  x: number;
  y: number;
}

export interface INodeInput {
  /**
   * 输入孔位：孔位根据设计图从上往下定义
   *     位于不同顺序位置上的输入代表不同输入类型
   * 同时有多输入情况下和数组index保持一致
   * 多选一的情况下，用于判定选择类型，此时为string类型
   */
  port: string | number;
  // 输入类型：ref/const
  type: string;
  // ref数据来源
  refId: string;
  // ref数据来源端口
  refOutputPort: string | number;
  // const数据值
  constValue: any;

  // 值
  value: any;
  // 值类型
  valueType: string,

  // 子输入，主要用于模块节点，输入有其他参数
  sub: INodeInput[];

}

export interface INodeOutput {
  port: number;
  value: any;
  valueType: string;
}


// // NodeModel
// {
//     id: 'TP14...',          // 系统保存id
//     type: {
//         primary: 'virtual', // virtual/device
//         secondary: 'logic', // [virtual]: logic/control/operator/math/utility/data
//                             // [device]: sensor/switch/adjuster/module
//         tertiary: 'and'     // [[logic]]: and/or/not/condition
//                             // [[...]]
//     },
//     operation: '',          // 某些类型的patch需要填写operation, ==/!=/>/</+/-/*...
//     address: '345F...',     // 硬件地址
//     label: '',              // 用户设置label
//     position: {             // 图形坐标，px
//         x: 34,
//         y: 100
//     },

//     inputs: [
//         {
//             port: 0,        // 输入孔位：孔位根据设计图从上往下定义
//                             //      位于不同顺序位置上的输入代表不同输入类型
//                             // 同时有多输入情况下和数组index保持一致
//                             // 多选一的情况下，用于判定选择类型，此时为string类型

//             type: 'ref',    // 输入类型：ref/const
//             refId: '',      // ref数据来源
//             refOutputPort: 0, // ref数据来源端口
//             constValue: '', // const数据值

//             value: '',      // 值
//             valueType: 'string', // 值类型

//             sub: [
//                 {              // 子输入，主要用于模块节点，输入有其他参数
//                     port: 'rate',   // 子输入孔位
//                     type: 'const',
//                     refId: '',
//                     refOutputPort: 0,
//                     constValue: '',

//                     value: '',
//                     valueType: 'string'
//                 }
//                 ...
//             ]
//             ...
//         }
//     ],

//     outputs: [
//         {
//             port: 0,
//             value: '',
//             valueType: ''
//         }
//         ...
//     ]

// }
