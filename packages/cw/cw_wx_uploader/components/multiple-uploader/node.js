const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const app = express();

const appId = 'wx6324ca5f72f2e102'; // 替换为你的AppID
const appSecret = 'bf13ecf02adfce7136846ff4caff4979'; // 替换为你的AppSecret

// 获取微信access_token
async function getAccessToken() {
  const response = await axios.get('https://api.weixin.qq.com/cgi-bin/token', {
    params: {
      appid: appId,
      secret: appSecret,
      grant_type: 'client_credential',
    },
  });
  return response.data.access_token;
}

// 获取微信jsapi_ticket
async function getJsapiTicket(accessToken) {
  const response = await axios.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket', {
    params: {
      access_token: accessToken,
      type: 'jsapi',
    },
  });
  return response.data.ticket;
}

// 生成签名
function generateSignature(ticket, nonceStr, timestamp, url) {
  const string1 = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;
  return crypto.createHash('sha1').update(string1).digest('hex');
}

// API端点，返回微信JS-SDK配置
app.get('/weixin-config', async (req, res) => {
    console.log('请求了')
  const url = req.query.url;
  const nonceStr = Math.random().toString(36).substring(2, 15);
  const timestamp = Math.floor(Date.now() / 1000);

  try {
    const accessToken = await getAccessToken();
    const ticket = await getJsapiTicket(accessToken);
    const signature = generateSignature(ticket, nonceStr, timestamp, url);

    res.json({
      appId,
      timestamp,
      nonceStr,
      signature,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get Weixin config' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});