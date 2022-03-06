import React from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { getLogList } from '@/services/ant-design-pro/employeeList';

export type LogListItem = {
  id: number;
  username: string;
  nickName: string;
  serialNumber: number;
  employeeName: string;
  companyNumber: string;
  success: number;
  loginTime: string;
};

const columns: ProColumns<LogListItem>[] = [
  {
    title: 'ID',
    width: 80,
    dataIndex: 'id',
    hideInSearch: true,
    hideInTable: true,
    render: (_) => <span>{_}</span>,
  },
  {
    title: '账号',
    width: 80,
    dataIndex: 'username',
    render: (_) => <span>{_}</span>,
  },
  {
    title: '昵称',
    dataIndex: 'nickName',
    width: 100,
  },
  {
    title: '二维码序列号',
    width: 80,
    dataIndex: 'serialNumber',
    hideInSearch: true,
    render: (_) => <span>{_}</span>,
  },
  {
    title: '被查看人姓名',
    width: 80,
    dataIndex: 'employeeName',
    hideInSearch: true,
    render: (_) => <span>{_}</span>,
  },
  {
    title: '被查看人集团编码',
    width: 80,
    dataIndex: 'companyNumber',
    hideInSearch: true,
    render: (_) => <span>{_}</span>,
  },
  {
    title: '状态',
    width: 80,
    dataIndex: 'success',
    hideInSearch: true,
    valueEnum: {
      0: { text: '失败', status: 'Default' },
      1: { text: '成功', status: 'Success' },
    },
  },
  {
    title: (
      <>
        创建时间
      </>
    ),
    width: 140,
    key: 'since',
    dataIndex: 'loginTime',
    valueType: 'date',
    hideInSearch: true,
    sorter: (a, b) => a.loginTime - b.loginTime,
  },
];

export default () => {
  return (
    <PageContainer>
      <ProTable<LogListItem,API.PageParams>
        columns={columns}
        request={getLogList}
        pagination={{
          showQuickJumper: true,
        }}
        rowKey="key"
        search={{
          layout: 'vertical',
          defaultCollapsed: false,
        }}
        headerTitle="日志列表"
      />
    </PageContainer>
  );
};
