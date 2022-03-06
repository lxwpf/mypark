import { request } from 'umi';

const serverUrl = "http://112.74.78.57";
//const serverUrl = "http://localhost";

export async function getEmployeeCarList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request(serverUrl+"/employee/car/list",{
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),});
}

export async function getLogList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request(serverUrl+"/log/list",{
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),});
}

export async function getAppUserList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request(serverUrl+"/appUser/list",{
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),});
}

export async function getAccountList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request(serverUrl+"/account/list",{
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),});
}

export async function getDepartmentList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request(serverUrl+"/department/list",{
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),});
}

export async function getQrCodePassword(options?: { [key: string]: any }) {
  return request(serverUrl+"/app/getPassword", {
    method: 'GET',
    ...(options || {}),
  });
}

export async function editDepartment(body: API.Department,options?: { [key: string]: any }) {
  return request(serverUrl+"/department/edit", {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function editAppPassword(params: { password?: string },options?: { [key: string]: any }) {
  return request(serverUrl+"/app/editPassword?password="+params, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function editAccountPassword(body: API.Account,options?: { [key: string]: any }) {
  return request(serverUrl+"/account/edit", {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function delEmployee(params: number,options?: { [key: string]: any }) {
  return request(serverUrl+"/employee/delById?id="+params, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function delAccount(body: API.DelObject ,options?: { [key: string]: any }) {
  return request(serverUrl+"/account/del", {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function delAppUser(params: number,options?: { [key: string]: any }) {
  return request(serverUrl+"/appUser/del?id="+params, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function downloadOneQrCode(params: number ,options?: { [key: string]: any }) {
  return request(serverUrl+"/download/qrCode?id="+params, {
    method: 'POST',
    ...(options || {}),
  });
}

export async function addOrEditEmployee(body: API.EmployeeItem,options?: { [key: string]: any }) {
  return request(serverUrl+"/employee/addOrEditEmploy", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function addOrEditAppUser(body: API.AppUserItem,options?: { [key: string]: any }) {
  return request(serverUrl+"/appUser/saveOrEdit", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
