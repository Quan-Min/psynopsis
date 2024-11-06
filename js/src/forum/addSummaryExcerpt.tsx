import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import DiscussionListState from 'flarum/forum/states/DiscussionListState';
import DiscussionListItem from 'flarum/forum/components/DiscussionListItem';
import { truncate } from 'flarum/common/utils/string';
import ItemList from 'flarum/common/utils/ItemList';
import Tag from 'flarum/tags/models/Tag';
import Model from 'flarum/common/Model';
import type Mithril from 'mithril';
import IndexPage from 'flarum/forum/components/IndexPage';
import SearchPage from 'flarum/forum/components/SearchPage'; // 引入 SearchPage 组件


export default function addSummaryExcerpt() {

    /// 设置搜索页面
    if (typeof SearchPage !== 'undefined') {
        extend(SearchPage.prototype, 'viewItems', function (items: ItemList<Mithril.Children>) {
            extendDiscussionListItem();
        });
    }

    // 继续你的代码...
    if (app.initializers.has('flarum-tags')) {
        Tag.prototype.richExcerpts = Model.attribute('richExcerpts');
        Tag.prototype.excerptLength = Model.attribute('excerptLength');
    }

    function extendDiscussionListItem() {

        extend(DiscussionListItem.prototype, 'infoItems', function (items: ItemList<Mithril.Children>) {
            const discussion = this.attrs.discussion;

            if (app.session.user && !app.session.user.preferences().showSynopsisExcerpts) { return; }

            const tags = discussion.tags();
            let tag;
            if (tags) { tag = tags[tags.length - 1]; }

            const excerptPost = app.forum.attribute('synopsis.excerpt_type') === 'first' ? discussion.firstPost() : discussion.lastPost();
            const excerptLength = typeof tag?.excerptLength() === 'number' ? tag?.excerptLength() : app.forum.attribute('synopsis.excerpt_length');
            // 这里是富文本判断  下面直接使用了
            const richExcerpt = typeof tag?.richExcerpts() === 'number' ? tag?.richExcerpts() : app.forum.attribute('synopsis.rich_excerpts');

            const onMobile = true;

            if (excerptLength === 0) { return; }

            if (!excerptPost?.contentHtml?.()) return;
            // console.log("源文件adasda：", excerptPost.contentHtml())

            // 移除付费标签
            let noPayContent = excerptPost.contentHtml().replace(/\[pay\]/g, '').replace(/\[\/pay\]/g, '');

            // 替换未支付的内容块
            const payBlockPattern = /<blockquote style="text-align:center;padding:30px"><div><p>付费内容<\/p><\/div><\/blockquote>/g;
            const replacementHtml = '<p>链接：<a href="进入详情查看" rel="ugc nofollow">进入详情查看</a></p>';
            noPayContent = noPayContent.replace(payBlockPattern, replacementHtml);



            // 付费用户内容移除
            const pay2seePattern = /<div class="pay2see_gray"><div class="pay2see_header_gray">付费内容 \[权限设置可见\]<\/div>/g;
            noPayContent = noPayContent.replace(pay2seePattern, '');
            console.log("源文件 aaaaaa", noPayContent)
            // 购买的内容 
            const pay2seePattern2 = /<div class="pay2see_green">\s*<div class="pay2see_header_green">\s*购买的内容\s*<\/div>/g;
            noPayContent = noPayContent.replace(pay2seePattern2, '');

            const pay2seePatternGray = /<div class="pay2see_gray"><div class="pay2see_header_gray">付费内容 \[作者可见\]<\/div>/g;
            noPayContent = noPayContent.replace(pay2seePatternGray, '');

            console.log("源文件 bbbbbbb：", noPayContent)

            noPayContent = noPayContent.replace(/<\/div>/g, '');



            const contentWithoutLinks = noPayContent.replace(/https:\/\/(pan|baidu)\.[^\s]+/g, '进入详情查看');
            // console.log("contentWithoutLinks", contentWithoutLinks)
            // 调用字符串解析方法，将图片和文本分开处理
            const modifiedHtml = restructureHtmlWithStrings(contentWithoutLinks);

            const content = m.trust(truncate(modifiedHtml, excerptLength));

            // console.log("源文件content：", content)
            if (excerptPost) {
                const noImgs = <div className="custom-i1"></div>;
                const hasImages = /<img[^>]*>/i.test(excerptPost.contentHtml());
                // console.log(excerptPost)
                // 如果没有图片，添加一个自定义的 noImgs 元素
                if (!hasImages) {
                    const noImgs = <div className="custom-excerptI"></div>; // 您可以自定义内容
                    items.add('excerptI', noImgs, 600); // 设置优先级为 400，确保在摘要之后
                }

                const excerpt = <div className="custom-excerpt">{content}</div>;
                items.add(onMobile ? 'excerptM' : 'excerpt', excerpt, 500);

                if (items.has('tags')) {
                    items.setPriority('tags', 70);
                }

                const excerpt2 = <div className="custom-excerpt2"></div>;
                items.add('excerptMC', excerpt2, 60);
                if (items.has('terminalPost')) {
                    items.setPriority('terminalPost', 50);
                }
                if (items.has('discussion-views')) {
                    items.setPriority('discussion-views', 0);
                }
            }
        });
    }

    // 初始扩展调用
    extendDiscussionListItem();
}

// 解析和处理 HTML 的函数，结合上面的字符串解析方法
// function restructureHtmlWithStrings(htmlString) {
//     // 提取第一个 <p> 标签中的图片内容
//     const imgPattern = /<p>(<img[^>]*>.*?<\/p>)/i;
//     const imageContent = htmlString.match(imgPattern) ? htmlString.match(imgPattern)[1] : ''; // 提取出包含图片的部分

//     // 提取图片之后的所有内容
//     const restContent = htmlString.replace(imgPattern, ''); // 删除图片部分，保留剩下的内容

//     // 为图片部分添加 class
//     const imageWithClass = imageContent ? `<div class="image-container">${imageContent}</div>` : '';

//     // 为其余内容添加 class
//     const contentWithClass = `<div class="content-container">${restContent}</div>`;

//     // 合并并返回新的结构
//     return imageWithClass + contentWithClass;
// }

function restructureHtmlWithStrings(htmlString) {
    // 匹配带有 <IMG> 标签的图片
    // const imgPattern = /<p><img[^>]*src="([^"]*)"[^>]*><\/img><\/p>/i;
    // const imgPattern = /<p><img[^>]*src="([^"]*)"[^>]*><\/p>/i;
    const imgPattern = /<img[^>]*src="([^"]*)"[^>]*>/i;

    const imageMatch = htmlString.match(imgPattern);
    let imageUrl = '';
    let imageContent = '';
    // console.log("Image Match:", imageMatch);

    if (imageMatch) {
        imageUrl = imageMatch[1];
        // console.log("imageUrl:", imageUrl);
        imageContent = `<img src="${imageUrl}" alt="image">`;
    }

    // 删除图片部分，保留剩余内容
    let restContent = htmlString.replace(imgPattern, '');

    // 移除所有 <div> 标签，但保留其中的内容
    restContent = restContent.replace(/<div[^>]*>|<\/div>/g, '');

    // 移除特定的 <div> 元素
    // restContent = restContent.replace(/<div class="ptr-block ptr-render ptr-paid".*?>(.*?)<\/div>/s, (match, p1) => {
    //     return p1; // 保留 <p> 的内容
    // });
    // console.log("源文件filteredContent：", filteredContent)

    // 为图片部分添加背景样式
    const imageWithClass = imageUrl ? `
            <div class="image-container">
                <div class="blur-background" style="
                    background-image: url('${imageUrl}?x-oss-process=image/resize,h_10,m_lfit');
                    background-size: 100% 100%;
                ">
                    ${imageContent}
                </div>
            </div>
        ` : '';


    // 为其余内容添加 class
    const contentWithClass = `<div class="content-container">${restContent}</div>`;

    // 合并并返回新的结构
    return imageWithClass + contentWithClass;
}



// function restructureHtmlWithStrings(htmlString) {
//     // 提取第一个 <p> 标签中的图片内容
//     const imgPattern = /<p>(<img[^>]*>.*?<\/p>)/i;
//     let imageContent = htmlString.match(imgPattern) ? htmlString.match(imgPattern)[1] : ''; // 提取出包含图片的部分

//     // 给第一个 img 标签添加 class
//     if (imageContent) {
//         imageContent = imageContent.replace('<img', '<img class="first-image-class"'); // 给第一个 <img> 标签添加 class
//     }

//     // 提取图片之后的所有内容
//     const restContent = htmlString.replace(imgPattern, ''); // 删除图片部分，保留剩下的内容

//     // 为图片部分添加 class
//     const imageWithClass = imageContent ? `<div class="image-container">${imageContent}</div>` : '';

//     // 为其余内容添加 class
//     const contentWithClass = `<div class="content-container">${restContent}</div>`;

//     // 合并并返回新的结构
//     return imageWithClass + contentWithClass;
// }