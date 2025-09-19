//==本JS是加载Lodop插件或Web打印服务CLodop/Lodop7的综合示例，可直接使用，建议理解后融入自己程序==

//用双端口加载主JS文件Lodop.js(或CLodopfuncs.js兼容老版本)以防其中某端口被占:
var MainJS ="CLodopfuncs.js",
    URL_WS1   = "ws://localhost:8000/"+MainJS,                //ws用8000/18000
    URL_WS2   = "ws://localhost:18000/"+MainJS,
    URL_HTTP1 = "http://localhost:8000/"+MainJS,              //http用8000/18000
    URL_HTTP2 = "http://localhost:18000/"+MainJS,
    URL_HTTP3 = "https://localhost.lodop.net:8443/"+MainJS;   //https用8000/8443

var CreatedOKLodopObject, CLodopIsLocal, LoadJsState;

//==判断是否需要CLodop(那些不支持插件的浏览器):==
function needCLodop() {
    try {
        // 如果当前在IDE中，则不需要CLodop
        if (process.env.VUE_APP_DESIGNER ?? true) return false;

        var ua = navigator.userAgent;
        if (ua.match(/Windows\sPhone/i) ||
            ua.match(/iPhone|iPod|iPad/i) ||
            ua.match(/Android/i) ||
            ua.match(/Edge\D?\d+/i))
            return true;
        var verTrident = ua.match(/Trident\D?\d+/i);
        var verIE = ua.match(/MSIE\D?\d+/i);
        var verOPR = ua.match(/OPR\D?\d+/i);
        var verFF = ua.match(/Firefox\D?\d+/i);
        var x64 = ua.match(/x64/i);
        if ((!verTrident) && (!verIE) && (x64)) return true;
        else if (verFF) {
            verFF = verFF[0].match(/\d+/);
            if ((verFF[0] >= 41) || (x64)) return true;
        } else if (verOPR) {
            verOPR = verOPR[0].match(/\d+/);
            if (verOPR[0] >= 32) return true;
        } else if ((!verTrident) && (!verIE)) {
            var verChrome = ua.match(/Chrome\D?\d+/i);
            if (verChrome) {
                verChrome = verChrome[0].match(/\d+/);
                if (verChrome[0] >= 41) return true;
            }
        }
        return false;
    } catch (err) {
        return true;
    }
}

//==检查加载成功与否，如没成功则用http(s)再试==
//==低版本CLODOP6.561/Lodop7.043及前)用本方法==
function checkOrTryHttp() {
  if (window.getCLodop) {
     LoadJsState = "complete";
     return true;
  }
  if (LoadJsState == "loadingB" || LoadJsState == "complete") return;
  LoadJsState = "loadingB";
  var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
  var JS1 = document.createElement("script")
     ,JS2 = document.createElement("script")
     ,JS3 = document.createElement("script");
  JS1.src = URL_HTTP1;
  JS2.src = URL_HTTP2;
  JS3.src = URL_HTTP3;
  JS1.onload = JS2.onload = JS3.onload = JS2.onerror = JS3.onerror=function(){LoadJsState = "complete";}
  JS1.onerror = function(e) {
      if (window.location.protocol !== 'https:')
          head.insertBefore(JS2, head.firstChild); else
          head.insertBefore(JS3, head.firstChild);
  }
  head.insertBefore(JS1,head.firstChild);
}

//==加载Lodop对象的主过程:==
(function loadCLodop(){
  if (!needCLodop()) return;
  CLodopIsLocal = !!((URL_WS1 + URL_WS2).match(/\/\/localho|\/\/127.0.0./i));
  LoadJsState = "loadingA";
  if (!window.WebSocket && window.MozWebSocket) window.WebSocket=window.MozWebSocket;
  //ws方式速度快(小于200ms)且可避免CORS错误,但要求Lodop版本足够新:
  try {
    var WSK1=new WebSocket(URL_WS1);
    WSK1.onopen = function(e) { setTimeout("checkOrTryHttp()",200); }
    WSK1.onmessage = function(e) {if (!window.getCLodop) eval(e.data);}
    WSK1.onerror = function(e) {
         var WSK2=new WebSocket(URL_WS2);
         WSK2.onopen = function(e) {setTimeout("checkOrTryHttp()",200);}
         WSK2.onmessage = function(e) {if (!window.getCLodop) eval(e.data);}
         WSK2.onerror= function(e) {checkOrTryHttp();}
    }
  } catch(e){
    checkOrTryHttp();
  }
})();

//==获取LODOP对象主过程,判断是否安装、需否升级:==
export function getLodop(oOBJECT, oEMBED) {
    var strLodopInstall = "打印控件未安装！请前往LODOP官网下载安装包进行安装";
    var strLodopUpdate = "打印控件需要升级！请前往LODOP官网下载最新版本进行升级";
    var strLodop64Install = "打印控件未安装！请前往LODOP官网下载64位安装包进行安装";
    var strLodop64Update = "打印控件需要升级！请前往LODOP官网下载最新64位版本进行升级";
    var strCLodopInstallA = "Web打印服务CLodop未安装启动，请前往LODOP官网下载CLodop安装包";
    var strCLodopInstallB = "（安装完成后请重启浏览器）";
    var strCLodopUpdate = "Web打印服务CLodop需升级！请前往LODOP官网下载最新版本";
    var strLodop7FontTag = "Web打印服务Lodop7";
    var strLodop7HrefX86 = "请前往LODOP官网下载Linux X86_64版本安装包，下载后解压并运行lodop文件";
    var strLodop7HrefARM = "请前往LODOP官网下载Linux ARM64版本安装包，下载后解压并运行lodop文件";
    var strOfficialUrl = "http://www.c-lodop.com/index.html";
    var strLodop7Install_X86 = strLodop7FontTag + "未安装启动，" + strLodop7HrefX86;
    var strLodop7Install_ARM = strLodop7FontTag + "未安装启动，" + strLodop7HrefARM;
    var strLodop7Update_X86 = strLodop7FontTag + "需升级，" + strLodop7HrefX86;
    var strLodop7Update_ARM = strLodop7FontTag + "需升级，" + strLodop7HrefARM;
    var strInstallOK = "，成功后请刷新本页面或重启浏览器。";
    var LODOP;
    try {
        var isWinIE = (/MSIE/i.test(navigator.userAgent)) || (/Trident/i.test(navigator.userAgent));
        var isWinIE64 = isWinIE && (/x64/i.test(navigator.userAgent));
        var isLinuxX86 = (/Linux/i.test(navigator.platform)) && (/x86/i.test(navigator.platform));
        var isLinuxARM = (/Linux/i.test(navigator.platform)) && (/aarch/i.test(navigator.platform));

        if (needCLodop() || isLinuxX86 || isLinuxARM) {
            try {
                LODOP = window.getCLodop();
            } catch (err) {}
            if (!LODOP && LoadJsState !== "complete") {
                if (!LoadJsState)
                    alert("未曾加载Lodop主JS文件，请先调用loadCLodop过程."); else
                    alert("网页还没下载完毕，请稍等一下再操作.");
                return;
            }
            var strAlertMessage;
            if (!LODOP) {
                if (isLinuxX86)
                    strAlertMessage = strLodop7Install_X86;
                else if (isLinuxARM)
                    strAlertMessage = strLodop7Install_ARM;
                else
                    strAlertMessage = strCLodopInstallA + (CLodopIsLocal ? strCLodopInstallB : "");
                console.error(strAlertMessage + strInstallOK + '\n官网链接：' + strOfficialUrl);
                return;
            } else {
                if (isLinuxX86 && LODOP.CVERSION < "7.1.0.5")
                    strAlertMessage = strLodop7Update_X86;
                else if (isLinuxARM && LODOP.CVERSION < "7.1.0.5")
                    strAlertMessage = strLodop7Update_ARM;
                else if (CLODOP.CVERSION < "6.6.2.8")
                    strAlertMessage = strCLodopUpdate;

                if (strAlertMessage)
                    console.error(strAlertMessage + strInstallOK + '\n官网链接：' + strOfficialUrl);
            }
        } else {
            //==如果页面有Lodop插件就直接使用,否则新建:==
            if (oOBJECT || oEMBED) {
                if (isWinIE)
                    LODOP = oOBJECT;
                else
                    LODOP = oEMBED;
            } else if (!CreatedOKLodopObject) {
                LODOP = document.createElement("object");
                LODOP.setAttribute("width", 0);
                LODOP.setAttribute("height", 0);
                LODOP.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;");
                if (isWinIE)
                    LODOP.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
                else
                    LODOP.setAttribute("type", "application/x-print-lodop");
                document.documentElement.appendChild(LODOP);
                CreatedOKLodopObject = LODOP;
            } else
                LODOP = CreatedOKLodopObject;
            //==Lodop插件未安装时提示下载地址:==
            if ((!LODOP) || (!LODOP.VERSION)) {
                console.error((isWinIE64 ? strLodop64Install : strLodopInstall) + strInstallOK + '\n官网链接：' + strOfficialUrl);
                return LODOP;
            }
            if (LODOP.VERSION < "6.2.2.6") {
                console.error((isWinIE64 ? strLodop64Update : strLodopUpdate) + strInstallOK + '\n官网链接：' + strOfficialUrl);
            }
        }
        //===如下空白位置适合调用统一功能(如注册语句、语言选择等):=======================


        //===============================================================================
        return LODOP;
    } catch (err) {
        console.error("getLodop出错:", err);
        // 返回null而不是弹出alert，让调用方处理错误
        return null;
    }
}

