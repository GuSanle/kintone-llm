import { GetSalesDataById, GetAllSalesData, GetWechatId } from './sales'
import { PushToWechat } from './wechat'
import { ShowMap, DistanceMap } from './map'
import { MailTo } from './mail'

import { ParseFile } from './parseFile'
export const functionDefinitions = [
  {
    name: 'GetSalesDataById',
    description: '获取，分析当前记录',
    parameters: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'GetAllSalesData',
    description: '获取所有销售数据',
    parameters: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'GetWechatId',
    description: '根据用户名获取该用户的微信id',
    parameters: {
      type: 'object',
      properties: {
        user: {
          type: 'string',
        },
      },
      required: ['user'],
    },
  },
  // {
  //   name: 'SendMessageToWechatById',
  //   description: '根据微信id给用户发送信息',
  //   parameters: {
  //     type: 'object',
  //     properties: {
  //       id: {
  //         type: 'string',
  //       },
  //     },
  //     required: ['id'],
  //   },
  // },
  {
    name: 'ShowMap',
    description: '根据地址显示地图',
    parameters: {
      type: 'object',
      properties: {
        address: {
          type: 'string',
        },
      },
      required: ['address'],
    },
  },
  {
    name: 'DistanceMap',
    description: '通过地图获取路线',
    parameters: {
      type: 'object',
      properties: {
        from: {
          type: 'string',
        },
        to: {
          type: 'string',
        },
      },
      required: ['from', 'to'],
    },
  },
  {
    name: 'PushToWechat',
    description: '给指定的人发送微信信息',
    parameters: {
      type: 'object',
      properties: {
        user: {
          type: 'string',
        },
        message: {
          type: 'string',
        },
      },
      required: ['user', 'message'],
    },
  },
  {
    name: 'MailTo',
    description: '给指定的人发送邮件',
    parameters: {
      type: 'object',
      properties: {
        user: {
          type: 'string',
        },
      },
      required: ['user'],
    },
  },
  {
    name: 'ParseFile',
    description: '解析附件中文件的内容',
    parameters: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
]

export const availableFunctions = {
  GetSalesDataById,
  GetAllSalesData,
  GetWechatId,
  PushToWechat,
  ShowMap,
  DistanceMap,
  MailTo,
  ParseFile,
  // SendMessageToWechatById,
}
