import app from 'flarum/forum/app';
import Post from 'flarum/forum/components/Post';
import { extend } from "flarum/common/extend";

import DiscussionListState from "flarum/forum/states/DiscussionListState";



import addSummaryExcerpt from './addSummaryExcerpt';
import addUserPreference from './addUserPreference';

app.initializers.add('prippp-synopsis', () => {

  addSummaryExcerpt();
  addUserPreference();
  
  // 扩展 DiscussionList 组件
  // 扩展帖子渲染逻辑
  extend(Post.prototype, 'oncreate', function () {
    // 仅在帖子详情页面时执行替换逻辑
    if (app.current && app.current.get('routeName') === 'discussion') {
      const postData = this.attrs.post.data.attributes;
      const slink = postData.cslink;  // 从帖子数据中获取自定义字段 slink
      const olink = postData.colink;  // 从帖子数据中获取自定义字段 olink

      // 当 slink 和 olink 都存在时执行替换
      if (slink && olink) {
        // console.log("扩展帖子渲染逻辑, slink:", slink, "olink:", olink);
        const contentElement = this.element.querySelector('.Post-body');  // 获取帖子正文元素
        // console.log("contentElement:", contentElement);

        if (contentElement) {
          // 将 olink 的所有出现替换为 slink
          const olinkRegex = new RegExp(olink, 'g');  // 创建一个正则表达式，匹配所有 olink 的出现
          contentElement.innerHTML = contentElement.innerHTML.replace(olinkRegex, slink);

          // console.log(`已将 ${olink} 替换为 ${slink}`);
        }
      }
    }
  });

  // 移除默认排序选项
  extend(DiscussionListState.prototype, "sortMap", function (map) {
    // 移除所有默认排序选项
    // Object.keys(map).forEach(key => delete map[key]);
    Object.keys(map).forEach(key => {
      if (key == 'latest') {
        delete map[key]; // 只删除不是 'latest' 的选项
      }

      if (key == 'top') {
        delete map[key]; // 只删除不是 'latest' 的选项
      }
    });

    map["latest"] = "-lastPostedAt";
    map["top"] = "-commentCount";
  });

});



// app.initializers.add("my-default-sort", function () {

// });
