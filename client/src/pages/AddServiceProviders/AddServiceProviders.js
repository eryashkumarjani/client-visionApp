import { useNavigate } from "react-router-dom";
import { Layout, Space, Flex, Card, Breadcrumb, Form, Input, Upload, Button, Select, Popconfirm, Table, message } from 'antd';
import { HomeOutlined, UserOutlined, FileImageOutlined, HeartOutlined, HeartFilled, WechatOutlined, DeleteOutlined, EditOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import LHeader from '../../components/Header/LHeader';
import './AddServiceProviders.scss';
import LFooter from '../../components/Footer/LFooter';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { addProvider, getAllProviders } from "../../features/providerDetailsSlice";

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

function AddServiceProviders() {
  const navigate = useNavigate();
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
      width: 200,
    },
    {
      title: "Image",
      dataIndex: "providerImage",
      editTable: true,
      align: "center",
      fixed: 'top',
      width: 150,
      render: (_, record) => {
        return modifiedData.length >= 1 ? (
          <img src={record.providerImage} width={50} />
        ) : null;
      }
    },
    {
      title: "Provider Name",
      dataIndex: "providerName",
      editTable: true,
      fixed: 'top',
      width: 150,
    },
    {
      title: "Number",
      dataIndex: "providerNumber",
      editTable: true,
      fixed: 'top',
      width: 150,
    },
    {
      title: "Service Type",
      dataIndex: "providerServiceType",
      editTable: true,
      fixed: 'top',
      width: 150,
    },
    {
      title: "Location",
      dataIndex: "providerLocation",
      editTable: true,
      fixed: 'top',
      width: 150,
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      fixed: 'top',
      width: 150,
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
    // const response = await axios.get("https://jsonplaceholder.typicode.com/comments");
    const response = await axios.get("http://localhost:8080/api/v1/provider/all-providers");
    setGridData(response.data.allProvidersDetails);
    console.log("#GridData", response.data);
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

  //Notification Code
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Provider is added Successfully',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Something went wrong!',
    });
  };


  //value is coming in console but...
  const handleSubmit = (values) => {
    try {
      console.log({ values });
      const formData = new FormData();
      formData.append('providerName', values.providerName);
      formData.append('providerNumber', values.providerNumber);
      formData.append('providerServiceType', values.providerService);
      formData.append('providerLocation', values.providerLocation);
      formData.append('providerImage', values.providerImage.file.originFileObj);
      dispatch(addProvider(formData));
      success();
    }
    catch (error) {
      console.warn("#Error", error);
      error(error);
    }


  }

  useEffect(() => {
    dispatch(getAllProviders());
  }, [dispatch]);
  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout className='mainLayout'>
          <LHeader />
          <Content className='addServiceProviders' style={{ overflowY: "scroll" }}>
            <Breadcrumb
              className="breadcrumBg"
              items={[
                {
                  title: <HomeOutlined />,
                  href: '/dashboard'
                },
                {
                  title: 'Add Service Providers',
                },
              ]}
            />
            <div className='mainAddServiceProvidersContentArea'>
              <h2> Add service provider</h2>
              <div className="addServiceProvidersContainer">
                <Form onFinish={handleSubmit} autoComplete="off">

                  <Flex gap="small" className='addProviderFormArea' justify={'center'} align={'center'} vertical>
                    <Form.Item name="providerName">
                      <Input
                        className='formInput'
                        placeholder="Enter Provider Name"
                        prefix={<UserOutlined />} />
                    </Form.Item>

                    <Form.Item name="providerNumber">
                      <Input
                        className='formInput'
                        placeholder="Enter Provider Number"
                        prefix={<PhoneOutlined />} />
                    </Form.Item>

                    <Form.Item
                      name="providerService"
                    >
                      <Select className='formInput' placeholder="select Provider Service">
                        <Option value="tutor">Tutor</Option>
                        <Option value="fuelStation">Fuel Station</Option>
                        <Option value="stationery">Stationery</Option>
                        <Option value="plantNursery">Plant Nursery</Option>
                        <Option value="hairSalon">Hair Salon</Option>
                        <Option value="gym">Gym</Option>
                        <Option value="bakery">Bakery</Option>
                        <Option value="pharmacy">Pharmacy</Option>
                        <Option value="dairy">Dairy</Option>
                        <Option value="rlectronicRepair">Electronic Repair</Option>
                        <Option value="icecreamParlour">Icecream Parlour</Option>
                        <Option value="photographyAndVideography">Photography and Videography</Option>
                        <Option value="carpenter">Carpenter</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item name="providerLocation">
                      <Input
                        className='formInput'
                        placeholder="Enter Provider Location"
                        prefix={<EnvironmentOutlined />} />
                    </Form.Item>

                    <Form.Item name="providerImage">
                      <Upload
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        listType="picture"
                        maxCount={1}
                        // onChange={(e) => setPostImage(e.target.files[0])}
                        // value={postImage}
                        multiple
                        className="formUpload"
                      >
                        <div>
                          <Button icon={<FileImageOutlined />} style={{ fontWeight: "lighter" }}> Upload Provider Image</Button>
                        </div>
                      </Upload>
                    </Form.Item>

                    <Form.Item>
                      <Button className='formButton' htmlType="submit">Add Provider</Button>
                    </Form.Item>
                  </Flex>
                </Form>
              </div>
              <h2> List of service Providers</h2>
              <div className="listOfProviderContainer">
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

export default AddServiceProviders;
