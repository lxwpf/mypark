import {request} from 'umi';

export async function getTables() {
  return request('/api/tables');
}
