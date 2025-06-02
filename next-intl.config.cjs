// Runtime configuration for next-intl (overrides 'next-intl/config')
// This function is called on the server to provide locale settings and messages
const en = require('./locales/en.json');
const ptBR = require('./locales/pt-BR.json');
module.exports = function getConfig({ locale }) {
  // Default to English when no locale override provided
  const loc = locale || 'en';
  const messages = loc === 'pt-BR' ? ptBR : en;
  return {
    locale: loc,
    messages,
    // Custom formats (empty for now)
    formats: {},
    // Current time
    now: new Date(),
    // User time zone
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
};
