import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import { Layout, Space, Flex, Card, Breadcrumb, Form, Input, Upload, Button, Select, Table, Popconfirm, DatePicker } from 'antd';
import { HomeOutlined, BookOutlined, LockOutlined, CloudUploadOutlined, FileImageOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import LHeader from '../../components/Header/LHeader';
import LFooter from '../../components/Footer/LFooter';
import FormItemInput from "antd/es/form/FormItemInput";
import './AddFunds.scss';


const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const { Option } = Select;

const EditableCell = ({ editing, dataIndex, title, record, children, ...restProps }) => {
  const input = <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.item name={dataIndex} style={{ margin: 0 }} rules={[{
          required: true,
          message: `Please enter some value in ${title} field`
        }]}>
          {input}
        </Form.item>
      ) : (children)}
    </td>
  )
};

function AddFunds() {
  const navigate = useNavigate();

  //Editing Data in Form
  const [form] = Form.useForm();

  //Table code.
  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(false);

  //Editing Function
  const [editRowKey, setEditRowKey] = useState("");
  const isEditing = (record) => record.key === editRowKey;
  const cancelEdit = () => {
    setEditRowKey('');
  }
  const saveEdit = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...modifiedData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setGridData(newData);
        setEditRowKey('');
      } else {
        newData.push(row);
        setGridData(newData);
        setEditRowKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const doEdit = (record) => {
    form.setFieldsValue({
      name: "",
      email: "",
      body: "",
      ...record,
    });
    setEditRowKey(record.key);
  }

  //Define columns for Table
  const columns = [{
    title: "ID",
    dataIndex: "id",
    fixed: 'top',
    width: 50,
  },
  {
    title: "Name",
    dataIndex: "name",
    editTable: true,
    fixed: 'top',
    width: 250,
  },
  {
    title: "Email",
    dataIndex: "email",
    editTable: true,
    fixed: 'top',
    width: 200,
  },
  {
    title: "Body",
    dataIndex: "body",
    editTable: true,
    fixed: 'top',
    width: 500,
  },
  {
    title: "Action",
    dataIndex: "action",
    align: "center",
    fixed: 'top',
    width: 250,
    render: (_, record) => {
      const editable = isEditing(record);
      return modifiedData.length >= 1 ? (
        <Space>
          <Popconfirm
            title="Are you sure want to delete?"
            onConfirm={() => handleDelete(record)}>
            <Button danger icon={<DeleteOutlined />} disabled={editable}></Button>
          </Popconfirm>
          {editable ? (
            <span>
              <Space>
                <Button type="primary" onClick={() => saveEdit(record.key)} style={{ marginRight: 2 }} > Save</Button>
                <Popconfirm title="Are you sure want to Cancel?" onConfirm={() => cancelEdit()}>
                  <Button danger>Cancel</Button>
                </Popconfirm>
              </Space>
            </span>
          ) : (
            <Button ghost type="primary"
              icon={<EditOutlined />}
              onClick={() => doEdit(record)} ></Button>
          )
          }
        </Space >
      ) : null;
    }
  }];

  //Load data in Table
  const loadDataInTable = async () => {
    setLoading(true);
    const response = await axios.get("https://jsonplaceholder.typicode.com/comments");
    setGridData(response.data);
    setLoading(false);
  }

  //useEffect to append data in State.
  useEffect(() => {
    loadDataInTable();
  }, []);

  //modified Data with Key in Table
  const modifiedData = gridData.map(({ ...item }) => ({
    ...item,
    key: item.id
  }));

  //Delete Function
  const handleDelete = (value) => {
    const dataSource = [...modifiedData];
    const filteredData = dataSource.filter((item) => item.id !== value.id);
    setGridData(filteredData);
  };

  //Edit data on input field of Form
  const mergeColumns = columns.map((col) => {
    if (!col.editTable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        // inputType: col.dataIndex,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    }
  });

  //value is coming in console but...
  const handleSubmit = async (values) => {
    console.log({ values });
  }

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout className='mainLayout'>
          <LHeader />
          <Content className='addFunds' style={{ overflowY: "scroll" }}>
            <Breadcrumb
              className="breadcrumBg"
              items={[
                {
                  title: <HomeOutlined />,
                  href: '/dashboard'
                },
                {
                  title: 'Funds Monitor',
                  href: '/fundMonitor'
                },
                {
                  title: 'Add Funds',
                },
              ]}
            />
            <div className='mainAddFundsContentArea'>
              <h2> Add Funds</h2>
              <div className="addFundsContainer">
                <Form onFinish={handleSubmit} autoComplete="off">

                  <Flex gap="small" className='addFundsFormArea' justify={'center'} align={'center'} vertical>
                    <Form.Item name="fundAmount">
                      <Input
                        className='formInput'
                        placeholder="Enter Fund Amount"
                        prefix={<b>&#8377;</b>} />
                    </Form.Item>

                    <Form.Item
                      name="fundType"
                    >
                      <Select className='formInput' placeholder="select Fund Type">
                        <Option value="cash">Cash</Option>
                        <Option value="netBanking">Net Banking</Option>
                        <Option value="gPay">Gpay</Option>
                        <Option value="phonePay">Phone pay</Option>
                        <Option value="payTm">Paytm</Option>
                        <Option value="other">Other</Option>
                      </Select>
                    </Form.Item>


                    <Form.Item name="dateOfPayment">
                      <DatePicker
                        picker="date"
                        className='formDate'
                        // onChange={(e) => setDob(e.target.value)}
                        defaultValue={dayjs('01/01/2023', 'DD/MM/YYYY')} format={"DD/MM/YYYY"}
                      // onChange={(date, dateString) => {
                      //   console.log(dateString); setDob(date, dateString);
                      // }}
                      // value={dob}
                      // name={dob} 
                      />
                    </Form.Item>

                    <Form.Item name="fundDescription">
                      <Input
                        className='formInput'
                        placeholder="Enter Fund description"
                        prefix={<BookOutlined />} />
                    </Form.Item>

                    <Form.Item name="fundProofImage">
                      <Upload
                        action="/upload.do"
                        listType="picture"
                        maxCount={1}
                        // onChange={(e) => setPostImage(e.target.files[0])}
                        // value={postImage}
                        multiple
                        className="formUpload"
                      >
                        <div>
                          <Button icon={<FileImageOutlined />} style={{ fontWeight: "lighter" }}> Upload Fund Image</Button>
                        </div>
                      </Upload>
                    </Form.Item>

                    <Form.Item>
                      <Button className='formButton' htmlType="submit">Add Funds</Button>
                    </Form.Item>
                  </Flex>
                </Form>
              </div>
              <h2> List of Products</h2>
              <div className="listOfAddFundsContainer">
                <Form form={form} component={false}>
                  <Table
                    // columns={columns}
                    columns={mergeColumns}
                    components={{
                      body: {
                        cell: EditableCell,
                      },
                    }}
                    dataSource={modifiedData}
                    // bordered
                    loading={loading}
                    scroll={{
                      y: 200,
                    }}
                  />
                </Form>
              </div>
            </div>
          </Content>
          <LFooter />
        </Layout >
      </Space >
    </>
  );
}

export default AddFunds;
