import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import { useDispatch } from "react-redux";
import { addTicket } from "../../features/ticketDetailsSlice";
import moment from 'moment';
import { Layout, Space, Flex, Breadcrumb, Form, Input, Upload, Button, Select, Table, Popconfirm, DatePicker, notification } from 'antd';
import { HomeOutlined, BookOutlined, FileImageOutlined, DeleteOutlined, PhoneOutlined, EditOutlined, ScheduleOutlined } from '@ant-design/icons';
import LHeader from '../../components/Header/LHeader';
import LFooter from '../../components/Footer/LFooter';
import './RaiseTicket.scss';

const { Content } = Layout;
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

function RaiseTicket() {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();

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
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      fixed: 'top',
      width: 170,
    },
    {
      title: "Image",
      dataIndex: "ticketIssueProofImage",
      editTable: true,
      align: "center",
      fixed: 'top',
      width: 70,
      render: (_, record) => {
        return modifiedData.length >= 1 ? (
          <img src={record.ticketIssueProofImage} alt="ticket img" width={50} />
        ) : null;
      }
    },
    {
      title: "Title of ticket",
      dataIndex: "ticketTitle",
      editTable: true,
      fixed: 'top',
      width: 90,
    },
    {
      title: "Ticket Type",
      dataIndex: "ticketType",
      editTable: true,
      fixed: 'top',
      width: 70,
    },
    {
      title: "Raised date",
      dataIndex: "dateOfRaisedTicket",
      editTable: true,
      fixed: 'top',
      width: 80,
    },
    {
      title: "Description",
      dataIndex: "ticketDescription",
      editTable: true,
      fixed: 'top',
      width: 200,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumberOfUser",
      editTable: true,
      fixed: 'top',
      width: 90,
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      fixed: 'top',
      width: 100,
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
    const response = await axios.get("https://visionapp-backend.onrender.com/api/v1/ticket/all-tickets");
    setGridData(response.data.allTicketsDetails);
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
    const filteredData = dataSource.filter((item) => item._id !== value._id);
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
  const handleSubmit = (values) => {
    try {
      const formData = new FormData();
      formData.append('ticketTitle', values.ticketTitle);
      formData.append('ticketType', values.ticketType);
      formData.append('dateOfRaisedTicket', moment(values.dateOfRaisedTicket).format('DD-MM-YYYY'));
      formData.append('ticketDescription', values.ticketDescription);
      formData.append('phoneNumberOfUser', values.phoneNumberOfUser);
      formData.append('ticketIssueProofImage', values.ticketIssueProofImage.file.originFileObj);
      dispatch(addTicket(formData));
      api['success']({
        message: 'Success',
        description:
          'Ticket has been raised successfully',
      });
      window.location.reload(false);
    }
    catch (error) {
      api['error']({
        message: 'Error',
        description:
          'Something went wrong!',
      });
    }
  }

  return (
    <>
      {contextHolder}
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout className='mainLayout'>
          <LHeader />
          <Content className='raiseTicket' style={{ overflowY: "scroll" }}>
            <Breadcrumb
              className="breadcrumBg"
              items={[
                {
                  title: <HomeOutlined />,
                  href: '/dashboardUser'
                },
                {
                  title: 'Raise Tickets',
                },
              ]}
            />
            <div className='mainRaiseTicketContentArea'>
              <h2> Raise Ticket</h2>
              <div className="raiseTicketContainer">
                <Form onFinish={handleSubmit} autoComplete="off">

                  <Flex gap="small" className='raiseTicketFormArea' justify={'center'} align={'center'} vertical>
                    <Form.Item name="ticketTitle">
                      <Input
                        className='formInput'
                        placeholder="Enter Title of Ticket"
                        prefix={<ScheduleOutlined />} />
                    </Form.Item>

                    <Form.Item
                      name="ticketType"
                    >
                      <Select className='formInput' placeholder="select Ticket Type">
                        <Option value="funds">Funds</Option>
                        <Option value="people">People</Option>
                        <Option value="function">Function</Option>
                        <Option value="other">Other</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item name="dateOfRaisedTicket">
                      <DatePicker
                        picker="date"
                        className='formDate'
                        defaultValue={dayjs('01/01/2023', 'DD/MM/YYYY')} format={"DD/MM/YYYY"}
                      />
                    </Form.Item>

                    <Form.Item name="ticketDescription">
                      <Input
                        className='formInput'
                        placeholder="Enter Ticket description"
                        prefix={<BookOutlined />} />
                    </Form.Item>

                    <Form.Item name="phoneNumberOfUser">
                      <Input
                        className='formInput'
                        placeholder="Enter your Phone number"
                        prefix={<PhoneOutlined />} />
                    </Form.Item>

                    <Form.Item name="ticketIssueProofImage">
                      <Upload
                        action="/upload.do"
                        listType="picture"
                        maxCount={1}
                        multiple
                        className="formUpload"
                      >
                        <div>
                          <Button icon={<FileImageOutlined />} style={{ fontWeight: "lighter" }}> Upload Issue Image</Button>
                        </div>
                      </Upload>
                    </Form.Item>

                    <Form.Item>
                      <Button className='formButton' htmlType="submit">Raise Ticket</Button>
                    </Form.Item>
                  </Flex>
                </Form>
              </div>
              <h2> List of Raised Tickets</h2>
              <div className="listOfRaiseTicketContainer">
                <Form form={form} component={false}>
                  <Table
                    columns={mergeColumns}
                    components={{
                      body: {
                        cell: EditableCell,
                      },
                    }}
                    dataSource={modifiedData}
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

export default RaiseTicket;
