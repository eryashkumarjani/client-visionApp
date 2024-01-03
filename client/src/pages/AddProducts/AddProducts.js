import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct, getAllProducts } from "../../features/productDetailsSlice";
import { Layout, Space, Flex, Breadcrumb, Form, Input, Upload, Button, Select, Table, Popconfirm, notification } from 'antd';
import { HomeOutlined, BookOutlined, FileImageOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import LHeader from '../../components/Header/LHeader';
import LFooter from '../../components/Footer/LFooter';
import './AddProducts.scss';

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

function AddProducts() {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

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
      dataIndex: "productImage",
      editTable: true,
      align: "center",
      fixed: 'top',
      width: 150,
      render: (_, record) => {
        return modifiedData.length >= 1 ? (
          <img src={record.productImage} alt="product img" width={50} />
        ) : null;
      }
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      editTable: true,
      fixed: 'top',
      width: 150,

    },
    {
      title: "Price",
      dataIndex: "productPrice",
      editTable: true,
      fixed: 'top',
      width: 150,
      render: (_, record) => {
        return modifiedData.length >= 1 ? (
          <label>₹ {record.productPrice} </label>
        ) : null;
      }
    },
    {
      title: "Product Type",
      dataIndex: "productType",
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
    const response = await axios.get("https://visionapp-backend.onrender.com/api/v1/product/all-products");
    setGridData(response.data.allProductsDetails);
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
      formData.append('productName', values.productName);
      formData.append('productPrice', values.productPrice);
      formData.append('productType', values.productType);
      formData.append('productImage', values.productImage.file.originFileObj);
      dispatch(addProduct(formData));
      api['success']({
        message: 'Success',
        description:
          'Product has been added successfully',
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

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      {contextHolder}
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout className='mainLayout'>
          <LHeader />
          <Content className='addProducts' style={{ overflowY: "scroll" }}>
            <Breadcrumb
              className="breadcrumBg"
              items={[
                {
                  title: <HomeOutlined />,
                  href: '/dashboard'
                },
                {
                  title: 'Add Products',
                },
              ]}
            />
            <div className='mainAddProductsContentArea'>
              <h2> Add Products</h2>
              <div className="addProductsContainer">
                <Form onFinish={handleSubmit} autoComplete="off">

                  <Flex gap="small" className='addProductsFormArea' justify={'center'} align={'center'} vertical>
                    <Form.Item name="productName">
                      <Input
                        className='formInput'
                        placeholder="Enter Product Name"
                        prefix={<BookOutlined />} />
                    </Form.Item>

                    <Form.Item name="productPrice">
                      <Input
                        className='formInput'
                        placeholder="Enter Product Price"
                        prefix={<b>&#8377;</b>} />
                    </Form.Item>

                    <Form.Item
                      name="productType"
                    >
                      <Select className='formInput' placeholder="select Product Type">
                        <Option value="woodwork">Woodwork</Option>
                        <Option value="pottery">Pottery</Option>
                        <Option value="leather">Leather</Option>
                        <Option value="jute">Jute</Option>
                        <Option value="shell">Shell</Option>
                        <Option value="phulkaris">Phulkaris</Option>
                        <Option value="zardozi">Zardozi</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item name="productImage">
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
                          <Button icon={<FileImageOutlined />} style={{ fontWeight: "lighter" }}> Upload Product Image</Button>
                        </div>
                      </Upload>
                    </Form.Item>

                    <Form.Item>
                      <Button className='formButton' htmlType="submit">Add Products</Button>
                    </Form.Item>
                  </Flex>
                </Form>
              </div>
              <h2> List of Products</h2>
              <div className="listOfProductsContainer">
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

export default AddProducts;

