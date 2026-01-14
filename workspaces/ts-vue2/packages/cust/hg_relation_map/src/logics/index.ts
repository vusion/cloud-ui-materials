import '@nasl/types';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
// import { CurrencyToWords } from "currency-to-words"; // 已移除，改用 numberToEnglishWords
dayjs.extend(utc);
export {};

/**
 * @NaslLogic
 * @type both
 * @title 转化当前时区的时间
 * @desc 将传入的 0 时区时间字符串转为本地时区并返回带本地偏移的字符串
 * @param str 参数描述
 * @returns 返回结果描述
 */
export function convertTimeToTargetTimezone(str: nasl.core.String): nasl.core.String {
    // 将传入的 0 时区时间字符串转为本地时区并返回带本地偏移的字符串
    // 例："2025-11-06T08:00:00Z" -> "2025-11-06T16:00:00+08:00"（取决于本机时区）
    if (!str) return '' as unknown as nasl.core.String;
    const local = dayjs.utc(String(str)).local();
    return local.format('YYYY-MM-DD HH:mm:ss') as unknown as nasl.core.String;
}

/**
 * @NaslLogic
 * @type both
 * @title 生成当前时间（0时区字符串）
 * @desc 根据电脑时区生成一个0时区（UTC）字符串时间
 * @returns 0时区时间字符串
 */
export function generateUTCStringFromLocal(): nasl.core.String {
    // 返回 0 时区（UTC）时间字符串，格式：YYYY-MM-DD HH:mm:ss
    return dayjs().utc().format('YYYY-MM-DD HH:mm:ss') as unknown as nasl.core.String;
}




/**
 * 数字转英文大写（最终版：纯小数仅CENTS XXX ONLY，整数百位加AND，小数为AND CENTS XXX）
 * 核心规则：
 * 1. 整数部分全大写，百位与后两位之间加AND；
 * 2. 带整数的小数：整数部分 + AND CENTS + 小数单词 + ONLY；
 * 3. 纯小数（整数=0）：CENTS + 小数单词 + ONLY（去掉ZERO和AND）；
 * 4. 纯整数：整数部分 + ONLY；
 * 5. 所有单词大写，无多余连接词。
 * @param {number} num - 待转换的数字
 * @returns {string} 转换后的英文大写字符串
 */
function numberToEnglishWords(num) {
    // 定义基础数字单词（全大写）
    const ones = [
        "", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE",
        "TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN",
        "SEVENTEEN", "EIGHTEEN", "NINETEEN"
    ];
    const tens = ["", "", "TWENTY", "THIRTY", "FORTY", "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY"];
    const scales = ["", "THOUSAND", "MILLION", "BILLION"];

    // 转换0-999的数字为英文单词（百位后加AND）
    function convertThreeDigits(n) {
        let result = "";
        const hundredDigit = Math.floor(n / 100);
        const remainder = n % 100;
        
        if (hundredDigit > 0) {
            result += ones[hundredDigit] + " HUNDRED";
            if (remainder > 0) {
                result += " AND ";
            }
        }
        
        if (remainder >= 20) {
            result += tens[Math.floor(remainder / 10)];
            const oneDigit = remainder % 10;
            if (oneDigit > 0) {
                result += " " + ones[oneDigit];
            }
        } else if (remainder > 0) {
            result += ones[remainder];
        }
        
        return result.trim();
    }

    // 转换整数部分为英文单词
    function convertIntegerPart(n) {
        if (n === 0) {
            return ""; // 纯小数时整数部分返回空，去掉ZERO
        }
        let result = "";
        let scaleIndex = 0;
        while (n > 0) {
            const chunk = n % 1000;
            if (chunk !== 0) {
                const chunkStr = convertThreeDigits(chunk);
                result = chunkStr + (scaleIndex > 0 ? " " + scales[scaleIndex] + " " : " ") + result;
            }
            n = Math.floor(n / 1000);
            scaleIndex++;
        }
        return result.trim();
    }

    // 处理负数
    let isNegative = false;
    if (num < 0) {
        isNegative = true;
        num = Math.abs(num);
    }

    // 拆分整数和小数部分（强制保留两位小数）
    const integerPart = Math.floor(num);
    const decimalPart = Math.round((num - integerPart) * 100).toString().padStart(2, '0');
    const decimalNum = parseInt(decimalPart, 10);

    // 转换整数部分
    let englishInteger = convertIntegerPart(integerPart);

    // 转换小数部分
    let englishDecimal = "";
    if (decimalNum > 0) {
        let decimalStr = "";
        const tenDigit = parseInt(decimalPart[0], 10);
        const oneDigit = parseInt(decimalPart[1], 10);
        
        if (decimalNum >= 20) {
            decimalStr += tens[tenDigit];
            if (oneDigit > 0) {
                decimalStr += " " + ones[oneDigit];
            }
        } else if (decimalNum > 0) {
            decimalStr += ones[decimalNum];
        }

        // 核心修改：纯小数直接拼CENTS，带整数的小数拼AND CENTS
        englishDecimal = englishInteger ? " AND CENTS " + decimalStr.trim() : "CENTS " + decimalStr.trim();
    }

    // 拼接最终结果
    let finalResult = "";
    if (isNegative) {
        finalResult += "NEGATIVE ";
    }
    finalResult += englishInteger;
    if (englishDecimal) {
        finalResult += (englishInteger ? " " : "") + englishDecimal;
    }
    finalResult += " ONLY";

    // 去除多余空格（避免纯小数时开头有空格）
    finalResult = finalResult.trim();

    return finalResult;
}




/**
 * @NaslLogic
 * @type both
 * @title 自定义文本转换
 * @desc 自定义文本转换
 * @param str 参数描述
 * @returns 返回结果描述
 */
export function changeStrByMap(str: nasl.core.String,titleMap:nasl.core.String):nasl.core.String {
    let map = {}
    console.log(titleMap)
    if(typeof titleMap ==='string'){
        titleMap = JSON.parse(titleMap)
    }
    titleMap?.forEach(item => {
        map[item.name]=item.value
    })
    if (!str) {
        return ""
    }
    const newString = str.replace(/(<wise id="(.*?)">(.*?)<\/wise>)/g, function (match, value, value1, value2) {
        return  map[value1]
    });

    const getData = (value)=>{
        if(value==='null'|| value==="NULL")
            return null
        return  isNaN(Number(value))?"'"+value+"'":Number(value)
    }

   const _newString =  newString.replace(/if\((.*?)\)/g,function(match,value){
        const [decision,correct,failure] =  value.split(",")
        decision.replace()
        const op = ['==','!=',"<=",">=",'>',"<"]
        let str = '(.+)('
        op.forEach((item,index)=>{
            str+= index ===0?item: "|"+item
        })
        str+= ")(.+)"
        let regex = new RegExp(str);
        console.log(decision,regex);
        const [,firstData,op1,secordData] = regex.exec(decision)
        const result =   eval(`${getData(firstData)}${op1}${getData(secordData)}`)
        console.log(result);
        if(result){
            return correct
        }else{
            return failure
        }
   })
    return _newString.replace(/<br>/g,"")
}

/**
 * @NaslLogic
 * @type both
 * @title 数字转人民币金额（大写）
 * @desc 将数字转换为人民币金额大写形式，用于金融场景
 * @param str 参数描述
 * @returns 返回结果描述
 */
export function convertNumberToTraditionalChinese(str: nasl.core.String): nasl.core.String {
    if (!str) return '' as unknown as nasl.core.String;
    
    // 尝试将字符串转换为数字
    const num = Number(String(str));
    if (isNaN(num)) {
        return str; // 如果不是有效数字，返回原字符串
    }
    
    // 内置实现：人民币金额转换（使用标准大写数字）
    // 人民币使用：零、壹、贰、叁、肆、伍、陆、柒、捌、玖
    const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const units = ['', '拾', '佰', '仟'];
    const bigUnits = ['', '万', '亿', '兆'];
    
    // 处理负数：金额不能为负，转换为0
    const absNum = Math.abs(num);
    if (num < 0) {
        return '零元整' as unknown as nasl.core.String;
    }
    
    // 处理小数部分（最多两位：角、分）
    const numStr = absNum.toFixed(2); // 保留两位小数
    const parts = numStr.split('.');
    const integerPart = parseInt(parts[0]);
    const decimalPart = parts[1] || '00';
    const jiao = parseInt(decimalPart[0] || '0'); // 角
    const fen = parseInt(decimalPart[1] || '0'); // 分
    
    let result = '';
    
    // 转换整数部分
    if (integerPart === 0) {
        result = '零';
    } else {
        const numStrInt = integerPart.toString();
        const len = numStrInt.length;
        let needZero = false;
        
        for (let i = 0; i < len; i++) {
            const digit = parseInt(numStrInt[i]);
            const pos = len - i - 1;
            const bigUnitIndex = Math.floor(pos / 4);
            const smallUnitIndex = pos % 4;
            
            if (digit !== 0) {
                if (needZero) {
                    result += '零';
                    needZero = false;
                }
                result += digits[digit];
                if (smallUnitIndex > 0) {
                    result += units[smallUnitIndex];
                }
            } else if (smallUnitIndex === 0 && bigUnitIndex > 0) {
                // 处理万、亿等单位
                if (result && !result.endsWith(bigUnits[bigUnitIndex])) {
                    result += bigUnits[bigUnitIndex];
                }
                needZero = false;
            } else {
                needZero = true;
            }
            
            // 添加大单位（万、亿等）
            if (smallUnitIndex === 0 && bigUnitIndex > 0 && digit !== 0) {
                if (!result.endsWith(bigUnits[bigUnitIndex])) {
                    result += bigUnits[bigUnitIndex];
                }
            }
        }
    }
    
    // 添加"元"
    result += '元';
    
    // 处理小数部分（角、分）
    if (jiao === 0 && fen === 0) {
        // 没有小数，添加"整"
        result += '整';
    } else {
        // 有角或分
        if (jiao > 0) {
            result += digits[jiao] + '角';
            if (fen > 0) {
                result += digits[fen] + '分';
            }
        } else {
            // 角为0，但有分
            if (fen > 0) {
                result += '零' + digits[fen] + '分';
            }
        }
    }
    
    return result as unknown as nasl.core.String;
}






/**
 * 币种配置映射表
 * 包含各国家币种的主单位和辅单位
 */
const CURRENCY_CONFIG: { [key: string]: { mainUnit: string; subUnit: string; useChinese: boolean } } = {
    // 人民币
    'CNY': { mainUnit: '元', subUnit: '分', useChinese: true }, // 1
    'RMB': { mainUnit: '元', subUnit: '分', useChinese: true }, 
    
    // 美元
    'USD': { mainUnit: 'dollar', subUnit: 'cent', useChinese: false }, // 2
    
    // 欧元
    'EUR': { mainUnit: 'euro', subUnit: 'cent', useChinese: false },  // 3
    
    // 英镑
    'GBP': { mainUnit: 'pound', subUnit: 'penny', useChinese: false }, // 4
    
    // 日元（无辅单位）
    'JPY': { mainUnit: 'yen', subUnit: '', useChinese: false },   // 5
    
    // 韩元
    'KRW': { mainUnit: 'won', subUnit: '', useChinese: false },  // 6
    
    // 港币
    'HKD': { mainUnit: 'dollar', subUnit: 'cent', useChinese: false },
    
    // 澳元
    'AUD': { mainUnit: 'dollar', subUnit: 'cent', useChinese: false },
    
    // 加元
    'CAD': { mainUnit: 'dollar', subUnit: 'cent', useChinese: false },
    
    // 新加坡元
    'SGD': { mainUnit: 'dollar', subUnit: 'cent', useChinese: false },
    
    // 瑞士法郎
    'CHF': { mainUnit: 'franc', subUnit: 'centime', useChinese: false },
    
    // 印度卢比
    'INR': { mainUnit: 'rupee', subUnit: 'paisa', useChinese: false },
    
    // 泰铢
    'THB': { mainUnit: 'baht', subUnit: 'satang', useChinese: false },
    
    // 马来西亚林吉特
    'MYR': { mainUnit: 'ringgit', subUnit: 'sen', useChinese: false },
    
    // 菲律宾比索
    'PHP': { mainUnit: 'peso', subUnit: 'centavo', useChinese: false },

    // 新西兰元
    'NZD': { mainUnit: 'dollar', subUnit: 'cent', useChinese: false },
    
    // 俄罗斯卢布
    'RUB': { mainUnit: 'ruble', subUnit: 'kopecks', useChinese: false },
    
    // 南非兰特
    'ZAR': { mainUnit: 'rand', subUnit: 'cent', useChinese: false },
    
    // 阿拉伯联合酋长国迪拉姆
    'AED': { mainUnit: 'dirham', subUnit: 'fils', useChinese: false },
    
    // 巴西雷亚尔
    'BRL': { mainUnit: 'real', subUnit: 'cent', useChinese: false },
    
    // 墨西哥比索
    'MXN': { mainUnit: 'peso', subUnit: 'centavo', useChinese: false },
    
    // 土耳其里拉
    'TRY': { mainUnit: 'lira', subUnit: 'kurus', useChinese: false },
    
    // 印度尼西亚卢比
    'IDR': { mainUnit: 'rupiah', subUnit: 'sen', useChinese: false },
    
    // 沙特阿拉伯里亚尔
    'SAR': { mainUnit: 'riyal', subUnit: 'halalah', useChinese: false },
    
    // 阿联酋迪拉姆
    'UAE': { mainUnit: 'dirham', subUnit: 'fils', useChinese: false },
    
};

/**
 * @NaslLogic
 * @type both
 * @title 数字转指定币种金额（大写）
 * @desc 根据国家币种代码将数字转换为对应国家的金额大写形式，用于金融场景
 * @param str 数字字符串
 * @param currencyCode 币种代码（如：CNY-人民币, USD-美元, EUR-欧元, GBP-英镑, JPY-日元等）
 * @returns 对应币种的金额大写形式
 */
export function convertNumberToWords(str: nasl.core.String, currencyCode: nasl.core.String): nasl.core.String {
    if (!str) return '' as unknown as nasl.core.String;
    
    // 尝试将字符串转换为数字
    const num = Number(String(str));
    if (isNaN(num)) {
        return str; // 如果不是有效数字，返回原字符串
    }
    
    const code = (String(currencyCode || 'CNY')).toUpperCase();
    const config = CURRENCY_CONFIG[code];
    
    // 如果币种不存在，默认使用人民币
    if (!config) {
        return convertNumberToTraditionalChinese(str);
    }
    
    // 如果是人民币，使用中文大写转换
    if (config.useChinese) {
        return convertNumberToTraditionalChinese(str);
    }
    
    // 其他币种使用英文转换
    try {
        // 对于没有辅单位的币种（如日元、韩元），只处理整数部分
        let amountToConvert = num;
        if (!config.subUnit) {
            amountToConvert = Math.floor(num);
        }
        
        // 改用内置 numberToEnglishWords 进行英文金额大写转换
        // 该方法输出格式形如："One Hundred Twenty Three and Forty Five Cents ONLY"
        // 这里与原逻辑保持一致：
        // - 若币种没有辅单位（如 JPY/KRW），只转换整数部分
        // - 有辅单位的币种，保留两位小数（Cents）
        const english = numberToEnglishWords(amountToConvert);

        // 追加币种主/辅单位（主单位必有，辅单位可能为空）
        // numberToEnglishWords 自带 "Cents" 字样；这里统一替换为配置的 subUnit（如 cent/penny 等）
        // 并在整数部分后拼接 mainUnit
        let result = english;


        // 在 ONLY 之前插入主单位（如 dollar/euro/pound 等）
        // result = result.replace(/\s+ONLY$/i, ` ${capitalizeFirstLetter(config.mainUnit)} ONLY`);

        return result as unknown as nasl.core.String;
        
    } catch (e: any) {
        // 如果库调用失败，返回错误信息
        return `Error: ${e?.message || String(e)}` as unknown as nasl.core.String;
    }
}


function runTestCases() {
    const testCases = [
        0,                  // 零（无小数，无单位）
        1,                  // 一（无小数，无单位）
        12,                 // 十二（无小数，无单位）
        99,                 // 九十九（无小数，无单位）
        100,                // 一百（无小数，无单位）
        123,                // 一百二十三（无小数，无单位）
        1000,               // 一千（无小数，无单位）
        1234,               // 一千二百三十四（无小数，无单位）
        123456,             // 十二万三千四百五十六（无小数，无单位）
        123456789,          // 一亿二千三百四十五万六千七百八十九（无小数，无单位）
        999999999999.99,    // 带小数，加Cents
        -123.45,            // 负数带小数，加Cents
        0.5,                // 纯小数，加Cents
        1000000.0,          // 无小数，无单位
        789.89              // 带小数，加Cents
    ];

    console.log("===== 数字转英文大写（有小数加Cents，无小数无单位）测试案例 =====");
    testCases.forEach(num => {
        const english = numberToEnglishWords(num);
        // 格式化输出，让数字对齐更美观
        console.log(`数字: ${num.toString().padStart(15)} → 英文大写: ${english}`);
    });
}

// 执行测试案例
runTestCases();




// console.log(convertNumberToWords("123456789.22","MYR"));
// console.log(convertNumberToWords("123456789.2","USD"));
// convertNumberToWords("1234567890.13","CNY")



