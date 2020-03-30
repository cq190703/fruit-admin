import React from "react";
import {
  HomeOutlined, ShoppingOutlined, AppstoreAddOutlined,
  GiftOutlined, ProfileOutlined, FileTextOutlined, CoffeeOutlined,
  RedEnvelopeOutlined, SoundOutlined, SmileOutlined, HeartOutlined,
  LockOutlined, TeamOutlined, ToolOutlined
} from '@ant-design/icons';


export default [
  {
    key: "1",
    title: "首页",
    path: "/admin/home",
    icon: <HomeOutlined/>,
  },
  {
    key: "2",
    title: "商品管理",
    icon: <AppstoreAddOutlined/>,
    children: [
      {
        key: "2-1",
        title: "商品列表",
        path: "/admin/goods/list",
        icon: <ShoppingOutlined/>,
      },
      {
        key: "2-2",
        title: "精选",
        path: "",
        icon: <HeartOutlined/>,
      },
    ]
  },
  {
    key: "3",
    title: "订单管理",
    icon: <ProfileOutlined/>,
    children: [
      {
        key: "3-1",
        title: "订单列表",
        path: "/admin/order",
        icon: <FileTextOutlined/>,
      },
      {
        key: "3-2",
        title: "订单处理",
        path: "",
        icon: <CoffeeOutlined/>,
      },
    ]
  },
  {
    key: "4",
    title: "促销",
    icon: <GiftOutlined/>,
    children: [
      {
        key: "4-1",
        title: "优惠券",
        path: "",
        icon: <RedEnvelopeOutlined/>,
      },
      {
        key: "4-2",
        title: "现时疯抢",
        path: "",
        icon: <SoundOutlined/>,
      },
      {
        key: "4-3",
        title: "团购",
        path: "",
        icon: <SmileOutlined/>,
      },
    ]
  },
  {
    key: "5",
    title: "权限",
    icon: <LockOutlined/>,
    children: [
      {
        key: "5-1",
        title: "用户",
        path: "",
        icon: <TeamOutlined/>,
      },
      {
        key: "5-2",
        title: "管理员",
        path: "/admin/root/administrator",
        icon: <ToolOutlined/>,
      },
    ]
  },
]