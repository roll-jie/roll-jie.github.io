# roll-jie.github.io

个人主页、博客和 Showcase。博客使用 Markdown 写作，发布时生成静态页面。

## 本地预览

在此目录运行以下命令，然后打开 [http://127.0.0.1:8000](http://127.0.0.1:8000)。

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

## 更新内容

- 在 `index.html` 更新简介、教育经历、论文、实习和左侧联系方式。
- 博客文章在 `_posts/` 管理，写法见下方。
- 旅行照片可以放在 `showcase/photos/`。编辑 `showcase/travel-data.js`，填写照片以及想点亮的省份。照片所属省份也会自动点亮。

```js
const travel = {
  visited: ["浙江"],
  photos: [
    { province: "浙江", title: "西湖", src: "photos/west-lake.jpg", alt: "湖面和远山" },
  ],
};
```

`province` 使用地图上的名称，例如「浙江」「湖北」或「北京」。照片路径相对于 `showcase/index.html`。`title` 和 `alt` 都可省略。省略标题时，图注只显示地区名。

校徽来自[浙江大学学校标识](https://www.zju.edu.cn/xxbs/list.htm)与[武汉大学标识页](https://www.whu.edu.cn/xxgk/wdbs.htm)。Showcase 参照 [Taozhi Chen 的旅行地图](https://taozhi-chen.github.io/assets/maps/china-map.html)为省份填色。边界来自[天地图行政区划可视化的省级公开预览](https://cloudcenter.tianditu.gov.cn/administrativeDivision/)，来源页面标注 GS（2024）0650 号。本站把省级面和境界线投影成 SVG，另设南海诸岛附图。

## 写博客

复制 `_posts/2026-11-10-site-notes.md`，或在 `_posts/` 新建类似 `2026-11-12-my-notes.md` 的文件。

```markdown
---
title: 学习笔记
tags: [学习, 笔记]
---

这一段会显示在博客列表中。

## 第一节

这里写正文。
```

文件名前半部分是发布日期，后半部分决定文章链接（例如 `blog/my-notes.html`）。列表按日期倒序生成，搜索匹配标题、日期、标签和摘要。正文里的 `##` 至 `######` 标题会进入目录。图片可放在 `assets/`，在文章中用 `![说明](../assets/filename.png)` 引用。

本地预览需要 Python 3.12 或更新版本。首次使用时，在项目根目录创建虚拟环境并安装依赖。

```sh
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements-blog.txt
python scripts/build_blog.py
```

之后改完文章，重新运行最后一条命令并刷新预览。`blog/` 中的 HTML 由脚本生成。

## 发布到 GitHub Pages

1. 在 GitHub 上创建名为 `roll-jie.github.io` 的公开仓库。
2. 将项目文件（包括 `.github/workflows/pages.yml`）提交到仓库的 `main` 分支根目录。
3. 打开仓库的 **Settings → Pages → Source**，选择 **GitHub Actions**。如果首次推送时还未设置此选项，可在 **Actions → Deploy GitHub Pages** 手动运行一次。
4. 部署完成后访问 [roll-jie.github.io](https://roll-jie.github.io/)。之后新增、修改或删除 Markdown，推送到 `main` 就会自动重新生成并部署博客。

[GitHub Pages 发布文档](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
