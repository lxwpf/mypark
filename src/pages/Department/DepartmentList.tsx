import styles from './DepartmentList.css';
import { Button, Card, Col, Form, Input, message, Modal, Row } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { editDepartment, getAccountList, getDepartmentList } from '@/services/ant-design-pro/employeeList';
import { PageContainer } from '@ant-design/pro-layout';
import { useRef, useState } from 'react';

export default function Page() {

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const actionRef = useRef();

  const [form] = Form.useForm();

  const [editModal,handleEditModal] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.Department>();

  function hideModal() {
    handleEditModal(false);
  }

  async function submitEdit() {
    const id = currentRow.id;
    const departmentName = form.getFieldValue("departmentName");
    const department = {
      id: id,
      departmentName: departmentName
    }
    const res = await editDepartment(department);
    if (res.success) {
      message.success(res.message);
      handleEditModal(false);
      actionRef.current.reload();
    }else {
      message.error(res.message);
    }
  }

  const columns: ProColumns<API.Department>[] =[
    {
      title: "主键",
      dataIndex: "id",
      hideInDescriptions: true,
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: "部门名称",
      dataIndex: "departmentName",
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
            handleEditModal(true);
            setCurrentRow(record);
          }}
        >
          <span>修改部门名称</span>
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
        <ProTable<API.Department,API.PageParams>
          actionRef={actionRef}
          columns={columns}
          request={getDepartmentList}
          rowKey="id"
          search={false}
        />

        <Modal
          title="修改部门名称"
          visible={ editModal }
          onOk={ submitEdit }
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
              label="部门名称"
              name="departmentName"
              rules={[{ required: true , message: '请输入部门名称！'}]}
              initialValue=""
            >
              <Input placeholder="请输入部门名称！" autoComplete="off"/>
            </Form.Item>
          </Form>
        </Modal>
    </PageContainer>
  );
}
