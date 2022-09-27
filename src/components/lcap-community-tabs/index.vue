<template>
<div :class="$style.root">
    <u-tabs :class="$style.tabs" appear="line">
        <u-tab :class="$style.tabCard">
            <template slot="title">
                <u-linear-layout  direction="vertical" :class="$style.tabBox" justify="center">
                    <img :src="require('./assets/community_tab.png')" :class="$style.tabImage">
                    <u-text display="block" :class="[$style.tabText, $style.tabTextTitle]">论坛</u-text>
                    <u-text display="block" :class="[$style.tabText, $style.tabTextContent]" style="margin-top: 20px">2小时内解答，100%解答</u-text>
                </u-linear-layout>
            </template>
            <u-linear-layout style="width: auto; background: #F6F7FD; padding: 30px" justify="center">
                <u-linear-layout style="width: 1200px; height: 380px" justify="center" :class="$style.innerContent" display="inline">
                    <u-linear-layout direction="vertical" display="inline" style="width: 350px;" :class="$style.contentLeft">
                        <u-text display="block" :class="[$style.contentWidth, $style.contentTitle]">低代码开发者论坛</u-text>
                        <u-text display="block" :class="[$style.contentWidth, $style.tabTextContent]" overflow="break">
                            全渠道接入，统一接待<br>
                            精确洞察客户信息及行为轨迹<br>
                            智能分配，个性化服务<br>
                            快捷回复、内部知识库高效接待<br>
                            2小时内解答 100%解答<br>
                        </u-text>
                        <u-button color="primary" :class="$style.button">进入论坛 <img :src="require('./assets/arrow.svg')"></u-button>
                    </u-linear-layout>
                    <u-linear-layout display="inline" style="width: 450px">
                        <img :src="require('./assets/community_content.png')" :class="$style.contentImage">
                    </u-linear-layout>
                </u-linear-layout>
            </u-linear-layout>
        </u-tab>
        <u-tab :class="$style.tabCard">
            <template slot="title">
                <u-linear-layout  direction="vertical" :class="$style.tabBox" justify="center">
                    <img :src="require('./assets/studyCenter_tab.png')" :class="$style.tabImage">
                    <u-text display="block" :class="[$style.tabText, $style.tabTextTitle]">学习中心</u-text>
                    <u-text display="block" :class="[$style.tabText, $style.tabTextContent]" style="margin-bottom: 0">根据您的需要，定制自己的学习路线<br>一周上手搭建完整应用</u-text>
                </u-linear-layout>
            </template>
            <u-linear-layout style="width: auto; background: #F6F7FD; padding: 30px" justify="center">
                <u-linear-layout style="width: 1200px; height: 380px" justify="center" :class="$style.innerContent" display="inline">
                    <u-linear-layout direction="vertical" display="inline" style="width: 350px;" :class="$style.contentLeft">
                        <u-text display="block" :class="[$style.contentWidth, $style.contentTitle]">低代码开发者论坛</u-text>
                        <u-text display="block" :class="[$style.contentWidth, $style.tabTextContent]" overflow="break">
                            全渠道接入，统一接待<br>
                            精确洞察客户信息及行为轨迹<br>
                            智能分配，个性化服务<br>
                            快捷回复、内部知识库高效接待<br>
                            2小时内解答 100%解答<br>
                        </u-text>
                        <u-button color="primary" :class="$style.button">进入论坛 <img :src="require('./assets/arrow.svg')"></u-button>
                    </u-linear-layout>
                    <u-linear-layout display="inline" style="width: 450px">
                        <img :src="require('./assets/community_content.png')" :class="$style.contentImage">
                    </u-linear-layout>
                </u-linear-layout>
            </u-linear-layout>
        </u-tab>
        <u-tab :class="$style.tabCard">
            <template slot="title">
                <u-linear-layout  direction="vertical" :class="$style.tabBox" justify="center">
                    <img :src="require('./assets/helpDoc_tab.png')" :class="$style.tabImage">
                    <u-text display="block" :class="[$style.tabText, $style.tabTextTitle]">帮助文档</u-text>
                    <u-text display="block" :class="[$style.tabText, $style.tabTextContent]">产品手册，产品答疑文档最佳实践</u-text>
                </u-linear-layout>
            </template>
            <u-linear-layout style="width: auto; background: #F6F7FD; padding: 30px" justify="center">
                <u-linear-layout style="width: 1200px; height: 380px" justify="center" :class="$style.innerContent" display="inline">
                    <u-linear-layout direction="vertical" display="inline" style="width: 350px;" :class="$style.contentLeft">
                        <u-text display="block" :class="[$style.contentWidth, $style.contentTitle]">低代码开发者论坛</u-text>
                        <u-text display="block" :class="[$style.contentWidth, $style.tabTextContent]" overflow="break">
                            全渠道接入，统一接待<br>
                            精确洞察客户信息及行为轨迹<br>
                            智能分配，个性化服务<br>
                            快捷回复、内部知识库高效接待<br>
                            2小时内解答 100%解答<br>
                        </u-text>
                        <u-button color="primary" :class="$style.button">进入论坛 <img :src="require('./assets/arrow.svg')"></u-button>
                    </u-linear-layout>
                    <u-linear-layout display="inline" style="width: 450px">
                        <img :src="require('./assets/community_content.png')" :class="$style.contentImage">
                    </u-linear-layout>
                </u-linear-layout>
            </u-linear-layout>
        </u-tab>
    </u-tabs>


</div>
</template>

<script>
export default {
    name: 'lcap-community-tabs',
};
</script>

<style module>
.root {}

.root [class^="u-tabs_head__"] {
  background-color: #FFFFFF;
}

.root .tabBox {
    position: relative;
}
.root [class^="u-tabs_tab__"] {
    margin: 0 !important;
}

.root .contentLeft {
    width: 300px;
    position: relative;
    top: -20%;
}

.contentLeft .button {
    display: block;
    background: #0056FF;
    margin-left: 40px;
    border-radius: 4px;
    width: 140px;
    height: 36px;
}

.root .innerContent {
    background: #ffffff;
    box-shadow: 0px 20px 60px rgba(47, 56, 111, 0.1);
    border-radius: 16px;

}
.root .tabCard {
    margin: 20px;
}

.root [class^="u-tabs__"] [class^="u-tabs_item__"] {
    padding-bottom: 30px !important;
}

.root .tabs [class^="u-tabs_head__"] {
    border-bottom-width: 0;
}

.root .tabText {
    width: 300px;
    white-space: normal;
}
.root .contentWidth {
    text-align: left;
    margin-left: 40px;
}

.root .tabTextTitle {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: #596780;
}

.root .tabTextContent {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 30px;
}

.root .contentTitle {
    font-family: 'PingFang TC';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 34px;
    color: #1F2F4D;
}

.root .tabs [class^="u-tabs_scroll__"] {
    display: flex;
    justify-content: center;
    align-items: center;
}

.root .tabs [class^="u-tabs_nav__"] {
    height: 300px !important;
}

.root .contentImage {
    width: 480px;
    height: 360px;
}
.root .tabImage {
    width: 100px;
    height: 100px;
}
</style>
