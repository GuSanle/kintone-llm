import { GetRecord, GetRecords, GetRecordsByApp } from "../service/kintoneApi";
const salesApp = 70;
const userApp = 71;

function convertToCommonData(kintoneDataObj: any) {
  let commonObj: any = {};
  Object.keys(kintoneDataObj).forEach((k) => {
    commonObj[k] = kintoneDataObj[k].value;
  });
  return commonObj;
}

export const GetSalesDataById = async () => {
  const id = kintone.app.record.getId();
  if (id) {
    const record = await GetRecord(salesApp, id);
    if (record) {
      return {
        success: true,
        data: convertToCommonData(record),
      };
    }
  }
  return null;
};

export const GetAllSalesData = async () => {
  const records = await GetRecordsByApp(salesApp);
  if (records) {
    const result = records.map((r) => {
      return {
        success: true,
        data: convertToCommonData(r),
      };
    });
    console.log(result, "result");
    return result;
  } else {
    return null;
  }
};

export const GetWechatId = async (user: string) => {
  const query = `user = "${user}"`;
  const records = await GetRecords(userApp, query);
  if (records) {
    const result = records.map((r) => {
      return convertToCommonData(r);
    });
    return {
      success: true,
      data: {
        wechatId: result[0].wechatId,
        email: result[0].email,
      },
    };
  } else {
    return null;
  }
};
