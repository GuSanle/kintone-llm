import { GetWechatId } from "./sales";
export const MailTo = async (user: string) => {
  const result = await GetWechatId(user)!;
  if (!result) {
    return null;
  } else {
    const mailToUrl = `mailto:${result.data.email}`;
    window.open(mailToUrl, "_blank");
    return { success: true, data: "成功" };
  }
};
