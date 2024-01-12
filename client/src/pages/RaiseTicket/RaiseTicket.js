import dayjs from 'dayjs';
import { useDispatch } from "react-redux";
import { addTicket } from "../../features/ticketDetailsSlice";
import moment from 'moment';
import { Layout, Space, Flex, Breadcrumb, Form, Input, Upload, Button, Select, DatePicker, notification } from 'antd';
import { HomeOutlined, BookOutlined, FileImageOutlined, PhoneOutlined, ScheduleOutlined } from '@ant-design/icons';
import LHeader from '../../components/Header/LHeader';
import LFooter from '../../components/Footer/LFooter';
import './RaiseTicket.scss';

const { Content } = Layout;
const { Option } = Select;

function RaiseTicket() {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
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
                <div className='leftSide'>
                  <img src={process.env.PUBLIC_URL + 'complaintImg.PNG'} alt='logo' />
                </div>
                <div className='rightSide'>
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
                            <Button className='formButton' icon={<FileImageOutlined />} style={{ fontWeight: "lighter" }}> Upload Issue Image</Button>
                          </div>
                        </Upload>
                      </Form.Item>

                      <Form.Item>
                        <Button className='formButton' htmlType="submit">Raise Ticket</Button>
                      </Form.Item>
                    </Flex>
                  </Form>
                </div>

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
