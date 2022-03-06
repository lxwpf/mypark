import ProTable, { ProColumns } from '@ant-design/pro-table';
import {
  getEmployeeCarList,
  delEmployee,
  addOrEditEmployee,
  downloadOneQrCode,
} from '@/services/ant-design-pro/employeeList';
import { Button, Popconfirm, Upload, message, Spin, Form, Input, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@@/plugin-locale/localeExports';
import { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { UploadOutlined } from '@ant-design/icons';


export default function Page() {

  //const serverUrl = "http://112.74.78.57";
  const serverUrl = "http://localhost";

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const [form] = Form.useForm();
  const [title,setTile] = useState<string>("");

  const actionRef = useRef();
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible,handleModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.TableListItem>();
  const [modalType, setModalType] = useState('');
  const [loading,handleLoading] = useState<boolean>(false);

  useEffect(() => {
    if (modalType === 'edit' && createModalVisible) {
      setTile("编辑")
      form.setFieldsValue(currentRow);
    }else if (modalType === 'add' && createModalVisible) {
      setTile("新增")
      form.resetFields();
    }
  },[createModalVisible]);

  async function delUser(e,recode) {
    const id = recode.id;
    const res = await delEmployee(id);
    if (res.success) {
      message.success("删除成功!");
      actionRef.current.reload();
    }else {
      message.error("删除失败!");
    }
  }

  async function downloadOneQrcode(id) {
    const res = await downloadOneQrCode(id);
    if (res.success) {
      message.success("下载成功!");
    }else {
      message.error("下载失败!");
    }
  }

  function hideModal(){
    handleModalVisible(false);
  }

  /*async function downloadQrcode2() {
    handleLoading(true);
    await downloadQrcode();
    handleLoading(false);
  }*/

  const props = {
    name: 'file',
    action: serverUrl+'/excel/upload',
    accept: '.xlsx',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        //console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        const res = info.file.response;
        if (res.success) {
          message.success(`数据导入成功`);
          actionRef.current.reload();
        }else {
          message.error(res.message);
        }
      } else if (info.file.status === 'error') {
        message.error("导入数据错误！请联系管理员");
      }
    },
  };

  const columns: ProColumns<API.TableListItem>[] =[
    {
      title: "ID",
      dataIndex: "id",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "序号",
      dataIndex: "serialNumber",
      hideInDescriptions: true,
    },
    {
      title: "部门",
      dataIndex: "department",
    },
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "集团编号",
      dataIndex: "companyNumber",
    },
    {
      title: "车牌号",
      dataIndex: "carNumber",
    },
    {
      title: "联系方式",
      dataIndex: "phone",
    },
    {
      title: "身份证号",
      dataIndex: "idCard",
      hideInSearch: true,
      hideInTable: true,
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
          onConfirm={(e)=>delUser(e,record)}
        >
          <a
            key="del"
            onClick={() => {
              // 主键id
              // todo 删除
            }}
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
        <a href={serverUrl+`/download/qrCode?id=`+record.id}>下载二维码</a>,
      ],
    },
  ];

  /**
   * 提交数据
   */
  async function submitData() {
    const data = form.getFieldsValue();
    const department = data.department;
    const name = data.name;
    const companyNumber = data.companyNumber;
    const phone = data.phone;

    if (data.carNumber === undefined) {
      data.carNumber = "";
    }
    if (department === undefined || department === "") {
      message.error("部门不能为空！");
      return;
    }
    if (name === undefined || name === "") {
      message.error("姓名不能为空！");
      return;
    }
    if (companyNumber === undefined || companyNumber === "") {
      message.error("集团编号不能为空！");
      return;
    }
    if (phone === undefined || phone === "") {
      message.error("联系方式不能为空！");
      return;
    }

    const res = await addOrEditEmployee(data);
    if (res.success) {
      message.success(res.message);
      hideModal();
      actionRef.current.reload();
    }
  }

  return (
    <Spin spinning={loading}>
    <PageContainer>
      <ProTable<API.TableListItem,API.PageParams>
        actionRef={actionRef}
        columns={columns}
        request={getEmployeeCarList}
        rowKey="id"
        search={{
          defaultCollapsed: false
        }}
        toolBarRender={() => [

          // 批量下载二维码按钮

          <a href={serverUrl+`/download/qrCode`}>下载二维码</a>,

          // 导出excel
          <a href={serverUrl+"/downloadFailedUsingJson"} >导出excel</a>,

          // 上传excel
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>导入excel</Button>
          </Upload>,

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

      {/*<Modal modalVisible={createModalVisible} hideModal={() => {
        handleModalVisible(false);
      }} modalType={modalType} currentRow={currentRow}/>*/}

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
            label="部门"
            name="department"
            rules={[{ required: true, message: '部门名称不能为空!' }]}
          >
            <Input placeholder="请输入单位名称" />
          </Form.Item>
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: '姓名不能为空!' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            label="集团编号"
            name="companyNumber"
            rules={[{ required: true, message: '集团编号不能为空!' }]}
          >
            <Input placeholder="请输入集团编号" />
          </Form.Item>
          <Form.Item
            label="车牌号"
            name="carNumber"
            rules={[{ required: false }]}
          >
            <Input placeholder="请输入车牌号" />
          </Form.Item>
          <Form.Item
            label="联系方式"
            name="phone"
            rules={[{ required: true, message: '联系方式不能为空!' }]}
          >
            <Input placeholder="请输入联系方式" />
          </Form.Item>
          <Form.Item
            label="身份证号"
            name="idCard"
          >
            <Input placeholder="请输入身份证号" />
          </Form.Item>
        </Form>
      </Modal>

    </PageContainer>
    </Spin>
  );
}
