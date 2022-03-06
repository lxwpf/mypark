import { Form, Input } from 'antd';

const EmployeeModal = ({currentRow}:
                         {currentRow: API.TableListItem}) => {
  return <div>
    <input value={currentRow?.name}/>
      {/*<Form
        name="basic"
        autoComplete="off"
        layout="horizontal"
      >
        <Form.Item
          label="序号"
          name="serialNumber"
          rules={[{ required: true, message: 'Please input your username!' }]}
          initialValue={`${currentRow?.serialNumber}`}
        >
          <Input  />
        </Form.Item>
        <Form.Item
          label="单位"
          name="department"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input  />
        </Form.Item>
        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input  />
        </Form.Item>
        <Form.Item
          label="集团编号"
          name="companyNumber"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input  />
        </Form.Item>
        <Form.Item
          label="车牌号"
          name="carNumber"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input  />
        </Form.Item>
        <Form.Item
          label="联系方式"
          name="phone"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input  />
        </Form.Item>
      </Form>*/}
  </div>
}

export default EmployeeModal;
