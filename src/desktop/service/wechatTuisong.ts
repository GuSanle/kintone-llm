const PLUGIN_ID = kintone.$PLUGIN_ID;
const { url } = kintone.plugin.app.getConfig(PLUGIN_ID);
const appId = kintone.app.getId();
// const { code } = kintone.getLoginUser();
const kintoneUrl = `https://${window.location.hostname}/k/${appId}/`;
// const users = ["oH8_mvq8uNXEENlmEtjMKSyfJFno"];

export const WechatNotice = (users: string[], message: string) => {
  const content = {
    message,
    kintoneUrl,
  };
  const body = { users, content };

  return kintone.plugin.app.proxy(
    PLUGIN_ID,
    url,
    "POST",
    { "Content-Type": "application/json" },
    body
  );
};
