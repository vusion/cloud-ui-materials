<template>
<div style="min-width: 1200px">
    <div style="background:#343e4f">
        <u-navbar style="width: 100%;">
            <template #left>
                <u-navbar-item href="/" style="margin-left:20px">
                    <u-text text="轻舟低代码"></u-text>
                </u-navbar-item>
            </template>
            <u-navbar-item href="/">
                <u-text text="产品"></u-text>
            </u-navbar-item>
            <u-navbar-item href="/">
                <u-text text="关于我们"></u-text>
            </u-navbar-item>
            <template #right>
                <u-navbar-item href="/dashboard" style="margin-right:20px"><u-text text="控制台"></u-text></u-navbar-item>
            </template>
        </u-navbar>
    </div>
    <div style=" background: #1C2138;">
        <u-carousel style=" width: 100%;margin: 0 auto;height: 420px;text-align: center;">
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

    <u-linear-layout style="width: 1200px;margin: 0 auto;">
        <u-linear-layout style="position: relative;height:840px;margin:0 auto">
            <div style="position: absolute;top:80px;left:0;right:0; margin:0 auto;text-align:center;">
                <u-text display="block" style="color:#333;font-size:32px;line-height:45px;margin-bottom:12px;font-weight:500" text="让软件驱动生产力"></u-text>
                <u-text display="block" text="打造更敏捷、更高效的软件生产力平台" style="color:#687492;font-size:16px;line-height:22px;">

                </u-text>
            </div>

            <div style="position: absolute;top:285px;left:75px;width:288px">
                <u-text display="block" style="color:#333;font-size:24px;line-height:34px;margin-bottom:16px;font-weight:500" text="让软件驱动生产力"></u-text>
                <div style="color:#687492;font-size:16px;line-height:32px;">
                    <u-text display="block">
                        <u-text style="color:#333" text="服务化："></u-text>
                        <u-text text="重塑企业面向数字化的服务能力">

                        </u-text>
                    </u-text>
                    <u-text display="block">
                        <u-text style="color:#333" text="敏   捷："></u-text>
                        <u-text text="敏捷迭代提升研发和运维效率"></u-text>
                    </u-text>
                    <u-text display="block">
                        <u-text style="color:#333" text="高   效："></u-text>
                        <u-text text="软件生命周期自动化与协作水平"></u-text>
                    </u-text>
                    <u-text display="block">

                        <u-text style="color:#333" text="开   放："></u-text>
                        <u-text text="打造开放的技术体系和软件架构"></u-text>
                    </u-text>
                </div>
                <u-link style="margin-top:16px;font-size:16px;line-height:32px;display: block;">
                    <u-text text="查看详情 >"></u-text>
                </u-link>
                <u-button color="primary" style="margin-top:40px;height:42px;line-height:42px" href="/">
                    <u-text text="免费试用"></u-text>
                </u-button>
            </div>
            <u-image src="https://static-vusion.nos-eastchina1.126.net/assets/%E5%8F%B3%E5%9B%BE%402x.png" style="position: absolute;top:240px;left:455px;width:672px;height: 400px">
            </u-image>
        </u-linear-layout>
    </u-linear-layout>

    <div style="height:320px;background: #242A38;">
        <div style="width: 1200px;margin: 0 auto;">
            <div style="position: relative;height:174px;margin:0 auto ;left:30px;right:0">
                <div style="position: absolute;top:30px;left:0">
                    <u-text style="display:block;font-size: 16px;line-height: 22px;color:#fff;margin-top:10px">产品和服务</u-text>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px"><u-text text="轻舟微服务"></u-text></a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px"><u-text text="轻舟混合云"></u-text></a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px"><u-text text="轻舟低代码"></u-text></a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px"><u-text text="轻舟中间件"></u-text></a>
                </div>
                <div style="position: absolute;top:30px;left:217px;">
                    <u-text style="display:block;font-size: 16px;line-height: 22px;color:#fff;margin-top:10px">关于我们</u-text>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px"><u-text text="公司简介"></u-text></a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px"><u-text text="媒体报道"></u-text></a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px"><u-text text="荣誉与认证"></u-text></a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px"><u-text text="友情链接"></u-text></a>
                </div>
                <div style="position: absolute;top:30px;left:424px;">
                    <u-text style="display:block;font-size: 16px;line-height: 22px;color:#fff;margin-top:10px">资源与文档</u-text>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px"><u-text text="新手帮助"></u-text></a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px"><u-text text="产品文档"></u-text></a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px"><u-text text="开发者资源"></u-text></a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px"><u-text text="备案帮助"></u-text></a>
                </div>
                <div style="position: absolute;top:30px;left:641px;">
                    <u-text style="display:block;font-size: 16px;line-height: 22px;color:#fff;margin-top:10px">诚邀合作</u-text>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px"><u-text text="渠道合作"></u-text></a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px"><u-text text="社区合作"></u-text></a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px"><u-text text="教育合作"></u-text></a>
                </div>
                <div style="position: absolute;top:30px;left:842px;">
                    <u-text style="display:block;font-size: 16px;line-height: 22px;color:#fff;margin-top:10px">管理与支持</u-text>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px"><u-text text="控制台"></u-text></a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px"><u-text text="联系我们"></u-text></a>
                </div>
                <div style="position: absolute;left:1049px;top:30px">
                    <a style=" position: relative;
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: 24px auto;
    background-position: 0 -48px;
    background-image: url(https://static-vusion.nos-eastchina1.126.net/assets/footer-icon-sns.png);" @mouseenter="linkCode = 'weixin'" v-show="linkCode !== 'weixin'" weixin>

                    </a>
                    <a style=" position: relative;
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: 24px auto;
    background-position: 0 -72px;
    background-image: url(https://static-vusion.nos-eastchina1.126.net/assets/footer-icon-sns.png);" @mouseenter="linkCode = 'weixin'" v-show="linkCode === 'weixin'" weixin>
                        <u-image style=" position: absolute;width: 120px;height: 120px;max-width: none;top: 30px;right: -30px;" src="https://static-vusion.nos-eastchina1.126.net/assets/weixin%402x.png" fit="full"></u-image>
                    </a>
                    <a href="/" weibo style=" position: relative;
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: 24px auto;
    background-position: 0 -24px;
    margin-left:20px;
    background-image: url(https://static-vusion.nos-eastchina1.126.net/assets/footer-icon-sns.png);" @mouseenter="linkCode = 'weibo'" v-show="linkCode === 'weibo'">
                        <u-image style=" position: absolute;width: 120px;height: 120px;max-width: none;top: 30px;right: -30px;" src="https://static-vusion.nos-eastchina1.126.net/assets/weibo%402x.png" fit="full"></u-image>
                    </a>
                    <a href="/" weibo style=" position: relative;
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-left:20px;
    background-size: 24px auto;
    background-position: 0 0;
    background-image: url(https://static-vusion.nos-eastchina1.126.net/assets/footer-icon-sns.png);" @mouseenter="linkCode = 'weibo'" v-show="linkCode !== 'weibo'">

                    </a>
                </div>
            </div>
            <div style="margin-top: 70px;font-size: 14px;line-height: 20px;color:#999;text-align:center">
                <u-text display="block" text="XX 公司版权所有 © 1997-2020 "></u-text>
                <u-text display="block" style="margin-top:10px" text="备案号"></u-text>
            </div>
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
