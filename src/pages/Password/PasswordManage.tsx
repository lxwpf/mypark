import { Card, Form, Input, Modal, message, Button, Row, Col, Upload, Popconfirm } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { useEffect, useRef, useState } from 'react';
import {
  getAccountList,
  getQrCodePassword,
  editAppPassword,
  editAccountPassword, delEmployee, delAccount,
} from '@/services/ant-design-pro/employeeList';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@@/plugin-locale/localeExports';
import { useModel } from '@@/plugin-model/useModel';

const { Search } = Input;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export default function Page() {

  const [form] = Form.useForm();
  const actionRef = useRef();

  //const [createModalVisible,handleModalVisible] = useState<boolean>(false);
  const [editPassword,handleEditPassword] = useState<boolean>(false);
  const [ipt,handleIpt] = useState<boolean>(true);
  const [currentRow, setCurrentRow] = useState<API.Account>();
  const [psd,setPsd] = useState("");
  const { initialState, setInitialState } = useModel('@@initialState');

  useEffect(() => {
    form.setFieldsValue(currentRow);
  },[editPassword]);

  // 给app密码赋值
  /*getQrCodePassword().then((res)=>{
    if (res.success) {
      setPsd(res.data.password);
    }
  }).catch(e=>{
    console.log(e)
  }) ;*/

  async function getPassword() {
    let res = await getQrCodePassword();
    if (res.success && (res.data !== null)) {
      setPsd(res.data.password);
    }
  }
  getPassword();

  function setIptShow() {
    handleIpt(false);
  }

  function hideModal() {
    handleEditPassword(false);
  }

  async function delUser(e,recode) {
    const id = recode.id;
    try {
      const name = initialState?.currentUser?.name;
      const delObj = {
        id: id,
        name: name
      }
      const res = await delAccount(delObj);
      if (res.success && res.data !== -1) {
        message.success("删除成功!");
        actionRef.current.reload();
      }else {
        message.error(res.message);
      }
    }catch (e) {
      message.error("异常！");
    }
  }

  // 修改账号密码
  async function submitEditPassword() {
    const id = currentRow.id;
    const newPassword = form.getFieldValue("newPassword");
    const confirmPassword = form.getFieldValue("confirmPassword");
    const username = form.getFieldValue("username");
    if (newPassword === undefined) {
      message.error("不能为空！");
      return;
    }
    if (newPassword !== confirmPassword) {
        message.error("两次输入密码不一致，请重新确认");
        return;
    }

    const account = {
      id: id,
      password: newPassword,
      username: username,
    }
    const res = await editAccountPassword(account);

    if (res.success) {
      message.success("操作成功");
      handleEditPassword(false);
      actionRef.current.reload();
    }else {
      message.error(res.message);
    }
  }

  // 修改app二维码密码
  async function editAppQrPassword(val) {
    console.log(val);
    if (val === undefined && val === "") {
      return;
    }
    await editAppPassword(val).then(res => {
      setPsd(res.data);
      handleIpt(true);
      message.success(res.message);
    });
  }

  const columns: ProColumns<API.Account>[] =[
    {
      title: "主键",
      dataIndex: "id",
      hideInDescriptions: true,
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: "用户名",
      dataIndex: "username",
      hideInSearch: true,
    },
    {
      title: "密码",
      dataIndex: "password",
      hideInSearch: true,
    },
    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      render: (e,record) => [
        <a
          key="detail"
          onClick={() => {
            handleEditPassword(true);
            setCurrentRow(record);
          }}
        >
          <span>修改密码</span>
        </a>,
        <Popconfirm
          title="确定要删除吗?"
          okText="确定"
          cancelText="取消"
          key="id"
          onConfirm={(e)=>delUser(e,record)}
        >
          <a
            key="del"
          >
            <span>删除</span>
          </a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
        <Card type="inner" title="登陆密码管理">

          <ProTable<API.Account,API.PageParams>
            actionRef={actionRef}
            columns={columns}
            request={getAccountList}
            rowKey="id"
            search={{
              optionRender: false,
              collapsed: false,
            }}
            toolBarRender={() => [

              // 新建弹窗按钮
              <Button
                type="primary"
                key="primary"
                onClick={() => {
                  const account = {
                    username: '',
                    password: '',
                  }
                  handleEditPassword(true);
                  setCurrentRow(account);
                }}
              >
                <PlusOutlined /> <FormattedMessage id="pages.searchTable.add" defaultMessage="New" />
              </Button>,
            ]}
          />

          <Modal
            title="新增"
            visible={ editPassword }
            onOk={ submitEditPassword }
            onCancel={ hideModal }
            >
            <Form
              {...layout}
              name="basic"
              autoComplete="off"
              layout="horizontal"
              form={form}
            >
              <Form.Item
                label="ID"
                name="id"
                hidden={true}
              >
                <Input readOnly />
              </Form.Item>
              <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true }]}
              >
                <Input readOnly={false} />
              </Form.Item>
              <Form.Item
                label="新密码"
                name="newPassword"
                rules={[{ required: true, message: '请输入新密码！' }]}
              >
                <Input placeholder="请输入新密码！" />
              </Form.Item>
              <Form.Item
                label="确认密码"
                name="confirmPassword"
                rules={[{ required: true, message: '请输入确认密码！' }]}
              >
                <Input placeholder="请再次输入新密码" />
              </Form.Item>
            </Form>
          </Modal>
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="二维码扫描密码管理"
        >
          <Row>
            <Col span={24}>
              <span>当前密码：<strong>{psd}</strong></span>&nbsp;&nbsp;&nbsp;
              <Button onClick={setIptShow}>修改密码</Button>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Search
                placeholder="请输入新密码"
                enterButton="提交"
                size="large"
                disabled={ipt}
                onSearch={editAppQrPassword}
              />
            </Col>
          </Row>
        </Card>
    </PageContainer>
  );
}
