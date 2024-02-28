import { WechatNotice } from "../service/wechatTuisong";
import { GetWechatId } from "./sales";

export const PushToWechat = async (user: string, message: string) => {
  const result = await GetWechatId(user)!;
  if (!result) {
    return null;
  } else {
    const [, status] = await WechatNotice([result.data.wechatId], message);
    const resp = status === 200 ? true : false;
    return {
      success: resp,
      data: "成功",
    };
  }
};
