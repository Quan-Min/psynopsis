(()=>{var t={n:e=>{var o=e&&e.__esModule?()=>e.default:()=>e;return t.d(o,{a:o}),o},d:(e,o)=>{for(var s in o)t.o(o,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:o[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};(()=>{"use strict";const e=flarum.core.compat["forum/app"];var o=t.n(e);const s=flarum.core.compat["forum/components/Post"];var r=t.n(s);const n=flarum.core.compat["common/extend"],c=flarum.core.compat["forum/states/DiscussionListState"];var i=t.n(c);const a=flarum.core.compat["forum/components/DiscussionListItem"];var p=t.n(a);const u=flarum.core.compat["common/utils/string"],l=flarum.core.compat["tags/models/Tag"];var f=t.n(l);const d=flarum.core.compat["common/Model"];var v=t.n(d);const h=flarum.core.compat["forum/components/SearchPage"];var g=t.n(h);const x=flarum.core.compat["forum/components/SettingsPage"];var y=t.n(x);const b=flarum.core.compat["common/utils/Stream"];var P=t.n(b);o().initializers.add("prippp-synopsis",(function(){!function(){function t(){(0,n.extend)(p().prototype,"infoItems",(function(t){var e,s,r,n,c,i,a,p,l,f=this.attrs.discussion;if(!o().session.user||o().session.user.preferences().showSynopsisExcerpts){var d,v=f.tags();v&&(d=v[v.length-1]);var h="first"===o().forum.attribute("synopsis.excerpt_type")?f.firstPost():f.lastPost(),g="number"==typeof(null==(e=d)?void 0:e.excerptLength())?null==(s=d)?void 0:s.excerptLength():o().forum.attribute("synopsis.excerpt_length");if("number"==typeof(null==(r=d)?void 0:r.richExcerpts())?null==(n=d)||n.richExcerpts():o().forum.attribute("synopsis.rich_excerpts"),0!==g&&null!=h&&null!=h.contentHtml&&h.contentHtml()){console.log("源文件1：",h),console.log("源文件2：",h.contentHtml());var x=(i=/<p><IMG[^>]*src="([^"]*)"[^>]*><\/IMG><\/p>/i,p="",l="",(a=(c=h.contentHtml().replace(/https:\/\/(pan|baidu)\.[^\s]+/g,"进入详情查看")).match(i))&&(l='<img src="'+(p=a[1])+'" alt="image">'),(p?'<div class="image-container"><div class="blur-background" style="background-image: url(\''+p+"');\"></div>"+l+"</div>":"")+'<div class="content-container">'+c.replace(i,"")+"</div>"),y=m.trust((0,u.truncate)(x,g));if(console.log("源文件content：",y),h){if(m("div",{className:"custom-i1"}),!/<img[^>]*>/i.test(h.contentHtml())){var b=m("div",{className:"custom-excerptI"});t.add("excerptI",b,600)}var P=m("div",{className:"custom-excerpt"},y);t.add("excerptM",P,500),t.has("tags")&&t.setPriority("tags",70);var E=m("div",{className:"custom-excerpt2"});t.add("excerptMC",E,60),t.has("terminalPost")&&t.setPriority("terminalPost",50),t.has("discussion-views")&&t.setPriority("discussion-views",0)}}}}))}void 0!==g()&&(0,n.extend)(g().prototype,"viewItems",(function(e){t()})),o().initializers.has("flarum-tags")&&(f().prototype.richExcerpts=v().attribute("richExcerpts"),f().prototype.excerptLength=v().attribute("excerptLength")),t()}(),(0,n.extend)(y().prototype,"oninit",(function(){this.showSynopsisExcerpts=P()(this.user.preferences().showSynopsisExcerpts),this.showSynopsisExcerptsOnMobile=P()(this.user.preferences().showSynopsisExcerptsOnMobile)})),(0,n.extend)(r().prototype,"oncreate",(function(){if(o().current&&"discussion"===o().current.get("routeName")){var t=this.attrs.post.data.attributes,e=t.cslink,s=t.colink;if(e&&s){var r=this.element.querySelector(".Post-body");if(r){var n=new RegExp(s,"g");r.innerHTML=r.innerHTML.replace(n,e)}}}})),(0,n.extend)(i().prototype,"sortMap",(function(t){Object.keys(t).forEach((function(e){"latest"==e&&delete t[e],"top"==e&&delete t[e]})),t.latest="-lastPostedAt",t.top="-commentCount"}))}))})(),module.exports={}})();
//# sourceMappingURL=forum.js.map