import { defineConfig } from 'vitepress'
import { name } from "../../package.json"
// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
	title: "2026 釜山行",
  description: "2026 釜山行",
	base: `/${name}/`,
  themeConfig: {
    sidebar: [
      {
        text: "總覽",
        items: [{ text: "首頁", link: "/" }],
      },
      {
        text: "階段一：地點與假期",
        items: [
          { text: "地點與假期投票（已結束）", link: "/planning/01-voting/" },
          { text: "投票結果", link: "/planning/01-voting/result" },
          {
            text: "航班與票價參考",
            items: [
              { text: "福岡 · 航班與票價", link: "/planning/01-voting/fukuoka" },
              { text: "濟州島 · 航班與票價", link: "/planning/01-voting/jeju" },
              { text: "釜山 · 航班與票價", link: "/planning/01-voting/busan" },
            ]
          },
        ],
      },
      {
        text: "階段二：機加酒與接送",
        items: [
          { text: "成員資料與接送聯絡", link: "/planning/02-booking-and-transfers/" },
          // 之後可新增：機位訂位總表、接送車聯絡方式、費用分攤 等
        ],
      },
      {
        text: "階段三：行程規劃",
        items: [
          { text: "每日行程總覽", link: "/planning/03-itinerary/" },
          // 之後可新增：Day 1、Day 2 … 或依城市／主題拆頁
        ],
      },
    ],
  },

})
