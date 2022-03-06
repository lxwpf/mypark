import { Form, Input, message, Modal as AntModal } from 'antd';
import { useEffect, useState } from 'react';
import { useRequest } from '@@/plugin-request/request';
import { addOrEditEmployee } from '@/services/ant-design-pro/employeeList';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Modal = ({ modalVisible, hideModal, modalType, currentRow }:
                 {modalVisible: boolean; hideModal: () => void; modalType: string; currentRow: API.TableListItem}) => {

  const init = useRequest<API.EmployeeItem>('');
  const [form] = Form.useForm();
  const [title,setTile] = useState<string>("");

  useEffect(() => {
    if (modalType === 'edit' && modalVisible) {
      setTile("编辑")
      form.setFieldsValue(currentRow);
    }else if (modalType === 'add' && modalVisible) {
      setTile("新增")
      form.resetFields();
    }
  },[modalVisible]);

  /**
   * 提交数据
   */
  async function submitData() {
    const data = form.getFieldsValue();
    const department = data.department;
    const name = data.name;
    const companyNumber = data.companyNumber;
    const phone = data.phone;
    const idCard = data.idCard;

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
    if (idCard === undefined || idCard === "") {
      message.error("身份证号不能为空！");
      return;
    }

    const res = await addOrEditEmployee(data);
    console.log(res);
    if (res.success) {
      message.success(res.message);
      hideModal();
    }
  }

  return <AntModal
    title={ title }
    visible={ modalVisible }
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
        rules={[{ required: true, message: '身份证号不能为空!' }]}
      >
        <Input placeholder="请输入身份证号" />
      </Form.Item>
    </Form>
  </AntModal>
}

export default Modal;
