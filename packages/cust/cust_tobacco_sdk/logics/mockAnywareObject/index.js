/**
 * @returns {string} result
 */
export default () => {
    mockDD();
    if (window.anyware) {
        // 已经存在anyware
        return;
    }
    window.anyware = {
        ready(...args) {
            console.log(
                '%c [ anyware.ready ]调用参数',
                'font-size:13px; background:pink; color:#bf2c9f;',
                ...args
            );
        },
        runtime: {
            getAccountInfo({ onSuccess }) {
                setTimeout(
                    () =>
                        onSuccess({
                            isMock: true,
                            errcode: '0',
                            errmsg: 'ok',
                            accountinfo: [
                                {
                                    mobilephone: 'XXXX',
                                    loginname: 'zhangmoumou_sj',
                                    resources: [
                                        '31660240c11d11e6f7ea9d004895bdd3',
                                        '76e32350c11511e6f7ea9d004895bdd3',
                                    ],
                                    username: '张某某',
                                    orgn: [
                                        {
                                            orgncode: '103300012502',
                                            orgid: '1389361288697_2848_167',
                                            orgnname: '项目建设科',
                                            unitname: '浙江省烟草公司本级',
                                            unitid: '1389361289505_6782_199',
                                        },
                                    ],
                                },
                            ],
                        }),
                    0
                );
            },
            permission: {
                requestAuthCode({ onSuccess }) {
                    setTimeout(() => onSuccess('mock token'), 0);
                },
            },
        },
        util: {
            addBizAccessLog(...args) {
                console.log(
                    '%c [ anyware.util.addBizAccessLog ]调用参数',
                    'font-size:13px; background:pink; color:#bf2c9f;',
                    ...args
                );
            },
            addFunAccessLog(...args) {
                console.log(
                    '%c [ anyware.util.addFunAccessLog ]调用参数',
                    'font-size:13px; background:pink; color:#bf2c9f;',
                    ...args
                );
            },
        },
    };
};

function mockDD() {
    if (window.dd) {
        return;
    }
    window.dd = {
        biz: {
            map: {
                locate({ onSuccess, onFail }) {
                    console.log(
                        '%c [ dd.biz.map.locate ]调用参数',
                        'font-size:13px; background:pink; color:#bf2c9f;',
                        ...args
                    );
                    setTimeout(() => {
                        onSuccess({
                            latitude: 39.903578,
                            longitude: 116.473565,
                        });
                    }, 0);
                },
            },
        },
    };
}
