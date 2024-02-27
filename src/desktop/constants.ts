export const fields = {
  subAppField: "sub_app",
  wIdField: "w_id",
  kIdField: "k_id",
};

export const PLUGIN_ID = kintone.$PLUGIN_ID;
export const appId = kintone.app.getId();
export const { code } = kintone.getLoginUser();
export const kintoneUrl = `https://${window.location.hostname}/k/${appId}/`;
export const { url, subId, userId } = kintone.plugin.app.getConfig(PLUGIN_ID);
