const https = require('https');

/**
 * Normalise a phone number to E.164 format.
 * Strips spaces, dashes, parentheses.
 * Defaults to +880 (Bangladesh) prefix if no country code detected.
 */
function normalisePhone(phone) {
  if (!phone || !phone.trim()) return null;

  let num = phone.replace(/[\s\-().]/g, '');

  if (num.startsWith('00')) num = '+' + num.slice(2);

  if (!num.startsWith('+')) {
    num = num.startsWith('0') ? '+880' + num.slice(1) : '+880' + num;
  }

  return num.replace('+', '').length >= 10 ? num : null;
}

/**
 * Build the Meta Cloud API request payload.
 *
 * If WA_TEMPLATE_NAME is set in .env, sends a template message.
 * templateParams is an array of strings mapped to {{1}}, {{2}}, … in the template body.
 *
 * If WA_TEMPLATE_NAME is not set, falls back to a plain text message (only
 * works within a 24-hour customer service window — not for cold outbound).
 */
function buildPayload(to, templateParams, fallbackText) {
  const templateName = process.env.WA_TEMPLATE_NAME;
  const templateLang = process.env.WA_TEMPLATE_LANG || 'en';

  if (templateName) {
    return {
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name:     templateName,
        language: { code: templateLang },
        components: [
          {
            type:       'body',
            parameters: templateParams.map(text => ({ type: 'text', text: String(text) })),
          },
        ],
      },
    };
  }

  // Fallback: plain text (requires user to have messaged first within 24 h)
  return {
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: { body: fallbackText },
  };
}

/**
 * Send a WhatsApp message via Meta Cloud API.
 *
 * @param {string}   to             - E.164 phone number, e.g. +8801712345678
 * @param {string[]} templateParams - Values for {{1}}, {{2}}, … in the template body
 * @param {string}   fallbackText   - Plain-text fallback if no template is configured
 *
 * Requires in .env:
 *   WA_PHONE_NUMBER_ID  — Phone Number ID from Meta Business Manager
 *   WA_ACCESS_TOKEN     — Permanent or temporary system-user access token
 *   WA_TEMPLATE_NAME    — Approved template name (e.g. welcome_contact)
 *   WA_TEMPLATE_LANG    — Template language code (default: en)
 */
function sendWhatsApp(to, templateParams, fallbackText) {
  return new Promise((resolve, reject) => {
    const phoneNumberId = process.env.WA_PHONE_NUMBER_ID;
    const accessToken   = process.env.WA_ACCESS_TOKEN;

    if (!phoneNumberId || !accessToken) {
      return reject(new Error('WhatsApp credentials not configured (WA_PHONE_NUMBER_ID / WA_ACCESS_TOKEN missing)'));
    }

    const payload = JSON.stringify(buildPayload(to, templateParams, fallbackText));

    const options = {
      hostname: 'graph.facebook.com',
      path:     `/v19.0/${phoneNumberId}/messages`,
      method:   'POST',
      headers:  {
        'Authorization':  `Bearer ${accessToken}`,
        'Content-Type':   'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`WhatsApp API ${res.statusCode}: ${data}`));
          }
        } catch {
          reject(new Error(`WhatsApp API response parse error: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

module.exports = { sendWhatsApp, normalisePhone };
