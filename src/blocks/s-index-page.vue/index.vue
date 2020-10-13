<template>
<div style="min-width: 1200px">
    <div style="background:#343e4f">
        <u-navbar style="width: 100%;">
            <template #left>
                <u-navbar-item href="/" style="margin-left:20px">轻舟低代码</u-navbar-item>
            </template>
            <u-navbar-item href="/">产品</u-navbar-item>
            <u-navbar-item href="/">关于我们</u-navbar-item>
            <template #right>
                <u-navbar-item href="/dashboard" style="margin-right:20px">控制台</u-navbar-item>
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

    <div style="height:320px;background: #242A38;">
        <div style="width: 1200px;margin: 0 auto;">
            <div style="position: relative;height:174px;margin:0 auto ;left:30px;right:0">
                <div style="position: absolute;top:30px;left:0">
                    <div style="display:block;font-size: 16px;line-height: 22px;color:#fff;margin-top:10px">产品和服务</div>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px">轻舟微服务</a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px">轻舟混合云</a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px">轻舟低代码</a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px">轻舟中间件</a>
                </div>
                <div style="position: absolute;top:30px;left:217px;">
                    <div style="display:block;font-size: 16px;line-height: 22px;color:#fff;margin-top:10px">关于我们</div>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px">公司简介</a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px">媒体报道</a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px">荣誉与认证</a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px">友情链接</a>
                </div>
                <div style="position: absolute;top:30px;left:424px;">
                    <div style="display:block;font-size: 16px;line-height: 22px;color:#fff;margin-top:10px">资源与文档</div>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px">新手帮助</a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px">产品文档</a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px">开发者资源</a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px">备案帮助</a>
                </div>
                <div style="position: absolute;top:30px;left:641px;">
                    <div style="display:block;font-size: 16px;line-height: 22px;color:#fff;margin-top:10px">诚邀合作</div>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px">渠道合作</a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px">社区合作</a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px">教育合作</a>
                </div>
                <div style="position: absolute;top:30px;left:842px;">
                    <div style="display:block;font-size: 16px;line-height: 22px;color:#fff;margin-top:10px">管理与支持</div>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px">控制台</a>
                    <a style="display:block;font-size: 14px;line-height: 20px;color:#999;margin-top:8px">联系我们</a>
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
                <div>XX 公司版权所有 © 1997-2020 </div>
                <div style="margin-top:10px">备案号</div>
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
