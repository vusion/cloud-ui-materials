export default (options)=>{
    // TODO
    !function (e) {
        var el = document.createElement("div");
        if (/Android(?:\s+|\/)(\d+\.\d+)?/.test(navigator.userAgent)) {
            var t = parseFloat(RegExp.$1); if (t > 2.3) {
                var i = parseInt(window.screen.width) / e;
                el.innerHTML= '<meta name="viewport" content="width='+e+",minimum-scale="+i+",maximum-scale="+i+', target-densitydpi=device-dpi">'
                document.head.appendChild(el.firstChild);
            } else { 
                    el.innerHTML= '<meta name="viewport" content="width=' + e + ',target-densitydpi=device-dpi">'
                    document.head.appendChild(el.firstChild) 
                }
        } else { 
            var i = parseInt(window.screen.width) / e;
            el.innerHTML= '<meta name="viewport" content="width='+e+",minimum-scale="+i+",maximum-scale="+i+', target-densitydpi=device-dpi">'
            document.head.appendChild(el.firstChild);
        }
        el=null;
    }(375);
}