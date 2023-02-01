<template>
<div :class="$style.root">
    <u-tabs :class="$style.tabs" appear="line" v-model="tabId">
        <u-tab :class="$style.tabCard" :value="0">
            <template slot="title">
                <u-linear-layout direction="vertical" :class="$style.tabBox" justify="center">
                    <img :src="require('./assets/community_tab.png')" :class="$style.tabImage">
                    <u-text display="block" :class="[$style.tabText, $style.tabTextTitle]">论坛</u-text>
                    <u-text display="block" :class="[$style.tabText, $style.tabTextContent]" style="margin-top: 20px">
                        官方响应，100%解答<br>
                        开放交流，共创新一代开发模式<br>
                    </u-text>
                </u-linear-layout>
            </template>
        </u-tab>
        <u-tab :class="$style.tabCard" :value="1">
            <template slot="title">
                <u-linear-layout direction="vertical" :class="$style.tabBox" justify="center">
                    <img :src="require('./assets/studyCenter_tab.png')" :class="$style.tabImage">
                    <u-text display="block" :class="[$style.tabText, $style.tabTextTitle]">学习中心</u-text>
                    <u-text display="block" :class="[$style.tabText, $style.tabTextContent]" style="margin-top: 20px">
                        定制化的学习路线、丰富的课程设计<br>
                        助你玩转低代码<br>
                    </u-text>
                </u-linear-layout>
            </template>
        </u-tab>
        <u-tab :class="$style.tabCard" :value="2">
            <template slot="title">
                <u-linear-layout direction="vertical" :class="$style.tabBox" justify="center">
                    <img :src="require('./assets/helpDoc_tab.png')" :class="$style.tabImage">
                    <u-text display="block" :class="[$style.tabText, $style.tabTextTitle]">文档中心</u-text>
                    <u-text display="block" :class="[$style.tabText, $style.tabTextContent]" style="margin-top: 20px">
                        产品指引、帮助文档<br>
                        功能介绍、最佳实践<br>
                    </u-text>
                </u-linear-layout>
            </template>
        </u-tab>
    </u-tabs>

    <div :class="$style.pages">
        <u-linear-layout :style="containerStyle" type="flex" gap="none" justify="center" :class="$style.transitionAnimation">
            <div :class="$style.page" style="padding: 30px 30px 50px 30px; width: 100%">
                <u-linear-layout style="width: 1200px; height: 380px;" justify="center" :class="$style.innerContent" display="inline">
                    <u-linear-layout direction="vertical" display="inline" style="width: 510px;" :class="$style.contentLeft">
                        <u-text display="block" :class="[$style.contentWidth, $style.contentTitle]">开发者论坛</u-text>
                        <u-text display="block" :class="[$style.contentWidth, $style.tabTextContent]" overflow="break">
                            使用中遇到的问题，可以在论坛获得及时、官方的解答，<br>
                            使用中积累的心得，可以在论坛与同行交流分享，<br>
                            在论坛，与更多开发者共同进步。<br>
                        </u-text>
                        <u-button color="primary" :class="$style.button" @click="jumpCommunity" style="margin-top: 75px">
                            进入论坛 <img :src="require('./assets/arrow.png')" :class="$style.arrow">
                        </u-button>
                    </u-linear-layout>
                    <u-linear-layout display="inline" style="width: 500px; position: relative; top: 5.2%">
                        <img :src="require('./assets/community_content.png')" :class="$style.contentImage">
                    </u-linear-layout>
                </u-linear-layout>
            </div>
            <div :class="$style.page" style="padding: 30px 30px 50px 30px; width: 100%">
                <u-linear-layout style="width: 1200px; height: 380px;" justify="center" :class="$style.innerContent" display="inline">
                    <u-linear-layout direction="vertical" display="inline" style="width: 510px;" :class="$style.contentLeft">
                        <u-text display="block" :class="[$style.contentWidth, $style.contentTitle]">学习中心</u-text>
                        <u-text display="block" :class="[$style.contentWidth, $style.tabTextContent]" overflow="break">
                            全方位的视频课程，提供从需求沟通到应用搭建的全流程课程，<br>
                            根据您的需要，选取您的学习课程，快速解锁低代码开发技能。<br>
                        </u-text>
                        <u-button color="primary" :class="$style.button" @click="jumpLearning" style="margin-top: 95px">
                            开始学习 <img :src="require('./assets/arrow.png')" :class="$style.arrow">
                        </u-button>
                    </u-linear-layout>
                    <u-linear-layout display="inline" style="width: 500px; position: relative; top: 5.2%">
                        <img :src="require('./assets/studyCenter_content.png')" :class="$style.contentImage">
                    </u-linear-layout>
                </u-linear-layout>
            </div>
            <div :class="$style.page" style="padding: 30px 30px 50px 30px; width: 100%">
                <u-linear-layout style="width: 1200px; height: 380px;" justify="center" :class="$style.innerContent" display="inline">
                    <u-linear-layout direction="vertical" display="inline" style="width: 510px;" :class="$style.contentLeft">
                        <u-text display="block" :class="[$style.contentWidth, $style.contentTitle]">文档中心</u-text>
                        <u-text display="block" :class="[$style.contentWidth, $style.tabTextContent]" overflow="break">
                            丰富的产品文档，包括使用指南、常见问题、功能介绍等文档，<br>
                            提供部署、配置、开发、上线的全部指导信息，方便您查阅学习。<br>
                        </u-text>
                        <u-button color="primary" :class="$style.button" @click="jumpDoc" style="margin-top: 75px">
                            查看详情 <img :src="require('./assets/arrow.png')" :class="$style.arrow">
                        </u-button>
                    </u-linear-layout>
                    <u-linear-layout display="inline" style="width: 500px; position: relative; top: 5.2%">
                        <img :src="require('./assets/helpDoc_content.png')" :class="$style.contentImage">
                    </u-linear-layout>
                </u-linear-layout>
            </div>
        </u-linear-layout>
    </div>
</div>
</template>

<script>
export default {
    name: 'lcap-community-tabs',
    data() {
        return {
            tabId: 0,
        };
    },
    computed: {
        containerStyle() {
            return {
                transform: `translateX(-${(this.tabId) * 100 / 3}%`,
            };
        },
    },
    methods: {
        jumpCommunity() {
            window.open('/CommunityParent/Community', '_self');
        },
        jumpLearning() {
            window.open('/CommunityParent/learncenter', '_self');
        },
        jumpDoc() {
            window.open('/CommunityParent/fileIndex', '_self');
        },
    },
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
.root .pages {
  width: 100%;
  overflow: hidden;
  background: #F6F7FD;
}
.root .page {
  display: flex;
  justify-content: center;
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
    width: 400px;
    margin: 20px;
}
.root [class^="u-tabs__"] [class^="u-tabs_item__"] {
    padding-bottom: 27px !important;
}
.root [class^="u-tabs__"] [class^="u-tabs_item__"][class]:after {
    height: 4px;
}
.root .tabs [class^="u-tabs_head__"] {
    border-bottom-width: 0;
}
.root .tabText {
    width: 335px;
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
}
.root .tabTextContent {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 30px;
;
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
    padding-top: 30px;
}
.root [class^="u-tabs_body__"] {
    display: none;
}
.root [class^="u-tabs_item__"] {
    color: #778399;
}
.root [class^="u-tabs_item__"]:hover,
.root [class^="u-tabs_item__"][selected] {
    color: #1F2F4D !important;
}


.root .contentImage {
    width: 480px;
    height: 360px;
}
.root .tabImage {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
}
.root .transitionAnimation {
    transition: 0.2s ease-in-out;
    width: 300%;
    min-width: 3780px;
}
.root [class^="u-linear-layout__"][direction=vertical]>:not(:last-child) {
    margin-bottom: 4px;
}
.root .arrow {
    width: 10px;
    height: 10px;
    display: inline-block;
}
</style>
