import { useEffect, useRef, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { addOrEditAppUser, delAppUser, getAppUserList, getLogList } from '@/services/ant-design-pro/employeeList';
import { Button, Form, Input, message, Modal, Popconfirm, Upload } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@@/plugin-locale/localeExports';

export type UserListItem = {
  id: number;
  username: string;
  nickName: string;
  password: string;
};


export default () => {

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const [form] = Form.useForm();

  const actionRef = useRef();

  const [title,setTile] = useState<string>("新增或编辑");
  const [modalType, setModalType] = useState('');
  const [createModalVisible,handleModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.TableListItem>();

  useEffect(() => {
    if (modalType === 'edit' && createModalVisible) {
      setTile("编辑")
      form.setFieldsValue(currentRow);
    }else if (modalType === 'add' && createModalVisible) {
      setTile("新增")
      form.resetFields();
    }
  },[createModalVisible]);

  const columns: ProColumns<UserListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true,
      render: (_) => <span>{_}</span>,
    },
    {
      title: '账号',
      dataIndex: 'username',
      render: (_) => <span>{_}</span>,
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '密码',
      hideInSearch: true,
      dataIndex: 'password',
    },
    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      render: (e,record) => [
        <Popconfirm
          title="确定要删除吗?"
          okText="确定"
          cancelText="取消"
          key="id"
          onConfirm={(e)=>{
            delAppUser(record?.id);
            actionRef.current.reload();
          }}
        >
          <a
            key="del"
          >
            <span>删除</span>
          </a>
        </Popconfirm>,
        <a
          key="detail"
          onClick={() => {
            setModalType("edit")
            handleModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <span>编辑</span>
        </a>,
      ],
    },
  ];

  function hideModal(){
    handleModalVisible(false);
  }

  async function submitData() {
    try {
      const data =  form.getFieldsValue();
      const username = data.username;
      const nickName = data.nickName;
      const password = data.password;

      console.log(data);
      if (username === '' || username === undefined) {
        message.error("账号不能为空！");
        return;
      }
      if (nickName === '' || nickName === undefined) {
        message.error("昵称不能为空！");
        return;
      }
      if (password === '' || password === undefined) {
        message.error("密码不能为空！");
        return;
      }

      const res = await addOrEditAppUser(data);
      if (res.success) {
        message.success(res.message);
        hideModal();
        actionRef.current.reload();
      }
    }catch (e) {
      message.error("发生异常");
    }
  }

  return (
    <PageContainer>
      <ProTable<UserListItem,API.PageParams>
        actionRef={actionRef}
        columns={columns}
        request={getAppUserList}
        pagination={{
          showQuickJumper: true,
        }}
        rowKey="id"
        search={{
          layout: 'vertical',
          defaultCollapsed: false,
        }}
        headerTitle="App用户列表"
        toolBarRender={() => [
          // 新建弹窗按钮
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setModalType("add")
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.add" defaultMessage="New" />
          </Button>,
        ]}
      />

      <Modal
        title={title}
        visible={ createModalVisible }
        onCancel={ hideModal }
        onOk={ submitData }
      >
        <Form
          {...layout}
          name="basic"
          autoComplete="off"
          layout="horizontal"
          form={form}
        >
          <Form.Item
            label="主键"
            name="id"
            hidden={true}
          >
            <Input placeholder="请输入ID" />
          </Form.Item>
          <Form.Item
            label="账号"
            name="username"
            rules={[{ required: true, message: '账号不能为空!' }]}
          >
            <Input placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
            label="昵称"
            name="nickName"
            rules={[{ required: true, message: '昵称不能为空!' }]}
          >
            <Input placeholder="请输入昵称" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '密码不能为空!' }]}
          >
            <Input placeholder="请输入密码" />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};
