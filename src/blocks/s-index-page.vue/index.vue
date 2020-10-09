<template>
<div :class="$style.root">
    <div :class="$style.head">
        <u-navbar :class="$style.nav">
            <template #left>
                <u-navbar-item href="/" style="margin-left:15px">轻舟低代码</u-navbar-item>
            </template>
            <u-navbar-item href="/">产品</u-navbar-item>
            <u-navbar-item href="/">关于我们</u-navbar-item>
            <template #right>
                <u-navbar-item href="/dashboard" style="margin-right:15px">控制台</u-navbar-item>
            </template>
        </u-navbar>
    </div>
    <div :class="$style.banner">
        <u-carousel :class="$style.carousel">
            <u-carousel-item>
                <u-link>
                    <u-image style="width:100%;height:100%" src="https://raw.githubusercontent.com/vusion/cloud-ui/master/src/assets/images/1.jpg"></u-image>
                </u-link>
            </u-carousel-item>
            <u-carousel-item>
                <u-link>
                    <u-image style="width:100%;height:100%" src="https://raw.githubusercontent.com/vusion/cloud-ui/master/src/assets/images/3.jpg"></u-image>
                </u-link>
            </u-carousel-item>
        </u-carousel>
    </div>
    <div :class="$style.body">

        <u-linear-layout :class="$style.content">
            <u-linear-layout :class="$style.item" style="position: relative;height:840px;margin:0 auto">
                <div style="position: absolute;top:80px;left:0;right:0; margin:0 auto;text-align:center;">
                    <div style="color:#333;font-size:32px;line-height:45px;margin-bottom:12px;font-weight:500">让软件驱动生产力</div>
                    <div style="color:#687492;font-size:16px;line-height:22px;">
                        打造更敏捷、更高效的软件生产力平台
                    </div>
                </div>

                <div style="position: absolute;top:285px;left:75px;width:288px">
                    <div style="color:#333;font-size:24px;line-height:34px;margin-bottom:16px;font-weight:500">让软件驱动生产力</div>
                    <div style="color:#687492;font-size:16px;line-height:32px;">
                        <span style="color:#333">服务化：</span>重塑企业面向数字化的服务能力
                        <br><span style="color:#333">敏   捷：</span>敏捷迭代提升研发和运维效率
                        <br><span style="color:#333">高   效：</span>软件生命周期自动化与协作水平
                        <br><span style="color:#333">开   放：</span>打造开放的技术体系和软件架构
                    </div>
                    <u-link style="margin-top:16px;font-size:16px;line-height:32px;display: block;">查看详情 ></u-link>
                    <u-button color="primary" style="margin-top:40px;height:42px;line-height:42px" href="/">免费试用</u-button>
                </div>
                <u-image src="https://static-vusion.nos-eastchina1.126.net/assets/%E5%8F%B3%E5%9B%BE%402x.png" style="position: absolute;top:240px;left:455px;width:672px;height: 400px">
                </u-image>
            </u-linear-layout>
        </u-linear-layout>
    </div>
    <div :class="$style.footer">
        <div :class="$style.footerLinks">
            <div :class="$style.footerLink" style="left:0">
                <div :class="$style.footerLinkDesc">产品和服务</div>
                <a :class="$style.footerLinkItem">轻舟微服务</a>
                <a :class="$style.footerLinkItem">轻舟混合云</a>
                <a :class="$style.footerLinkItem">轻舟低代码</a>
                <a :class="$style.footerLinkItem">轻舟中间件</a>
            </div>
            <div :class="$style.footerLink" style="left:217px;">
                <div :class="$style.footerLinkDesc">关于我们</div>
                <a :class="$style.footerLinkItem">公司简介</a>
                <a :class="$style.footerLinkItem">媒体报道</a>
                <a :class="$style.footerLinkItem">荣誉与认证</a>
                <a :class="$style.footerLinkItem">友情链接</a>
            </div>
            <div :class="$style.footerLink" style="left:424px;">
                <div :class="$style.footerLinkDesc">资源与文档</div>
                <a :class="$style.footerLinkItem">新手帮助</a>
                <a :class="$style.footerLinkItem">产品文档</a>
                <a :class="$style.footerLinkItem">开发者资源</a>
                <a :class="$style.footerLinkItem">备案帮助</a>
            </div>
            <div :class="$style.footerLink" style="left:641px;">
                <div :class="$style.footerLinkDesc">诚邀合作</div>
                <a :class="$style.footerLinkItem">渠道合作</a>
                <a :class="$style.footerLinkItem">社区合作</a>
                <a :class="$style.footerLinkItem">教育合作</a>
            </div>
            <div :class="$style.footerLink" style="left:842px;">
                <div :class="$style.footerLinkDesc">管理与支持</div>
                <a :class="$style.footerLinkItem">控制台</a>
                <a :class="$style.footerLinkItem">联系我们</a>
            </div>
            <div :class="$style.footerLinkCode">
                <a :class="$style.footerLinkCodeIcon" @mouseenter="linkCode = 'weixin'" :selected="linkCode === 'weixin'" weixin>

                    <u-image :class="$style.footerLinkCodeImg" src="https://static-vusion.nos-eastchina1.126.net/assets/weixin%402x.png" fit="full"></u-image>
                </a>
                <a href="/" weibo :class="$style.footerLinkCodeIcon" :selected="linkCode === 'weibo'" @mouseenter="linkCode = 'weibo'">

                    <u-image :class="$style.footerLinkCodeImg" src="https://static-vusion.nos-eastchina1.126.net/assets/weibo%402x.png" fit="full"></u-image>
                </a>
            </div>
        </div>
        <div :class="$style.footerInfo">
            <div>XX 公司版权所有 © 1997-2020 </div>
            <div style="margin-top:10px">备案号</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            linkCode: 'weixin',
        };
    },
};
</script>

<style module>
.root {
width: 1200px;
    margin: 0 auto;
}
.head [class^=u-navbar_],
.head {
    background: #191919;
}
.nav,
.body {
    width: 100%;
}
.footer {
    height:320px;
    background: #242A38;
    position: relative;
}
.footerLink {
    position: absolute;
    top:30px
}
.footerLinks {
    position: relative;
    height:174px;
    margin:0 auto ;
    left:30px;
    right:0
}
.footerLinkDesc {
    font-size: 16px;
    line-height: 22px;
    color:#fff;
    margin-bottom:10px
}
.footerLinkItem {
    display:block;
    font-size: 14px;
    line-height: 20px;
    color:#999;
    margin-top:8px
}
.footerInfo {
    margin-top: 70px;
    font-size: 14px;
    line-height: 20px;
    color:#999;
    text-align:center
}
.footerLinkCode {
    position: absolute;
    left:1049px;
    top:30px
}
.footerLinkCodeIcon {
    position: relative;
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: 24px auto;
    background-image: url(https://static-vusion.nos-eastchina1.126.net/assets/footer-icon-sns.png);
}
.footerLinkCodeIcon  + .footerLinkCodeIcon  {
    margin-left: 20px;
}
.footerLinkCodeImg {
    position: absolute;
    display: none;
    width: 120px;
    height: 120px;
    max-width: none;
    top: 30px;
    right: -30px;
}
.footerLinkCodeIcon[selected] .footerLinkCodeImg {
    display: block;
}
.footerLinkCodeIcon[weixin] {
    background-position: 0 -48px!important;
}
.footerLinkCodeIcon[weixin][selected] {
    background-position: 0 -72px!important;
}
.footerLinkCodeIcon[weibo] {
    background-position: 0 0!important;
}
.footerLinkCodeIcon[weibo][selected] {
    background-position: 0 -24px!important;
}
.banner {
    background: #1C2138;
}
.carousel {
    width: 100%;
    margin: 0 auto;
    height: 420px;
    text-align: center;
}
.content {

}
.title {
    margin: 0;
    margin-top: -15px;
    padding-bottom: 20px;
    font-family: Geneva, 'Arial Black', Verdana, Tahoma, sans-serif;
    font-size: 64px;
}

.h2 {
    color: var(--color-light);
}
</style>
