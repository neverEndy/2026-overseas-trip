import { defineConfig } from 'vitepress'
import { name } from "../../package.json"
// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
	title: "2026 出國行",
	base: `/${name}/`,
  themeConfig: {
    sidebar: [
      {
				text: "各假期航班票價",
				items: [
					{
						text: "福岡",
						link: "/flights/fukuoka"
					},
					{
						text: "濟州島",
						link: "/flights/jeju"
					},
					{
						text: "釜山",
						link: "/flights/busan"
					}
					
				]
			}
    ]
  }

})
