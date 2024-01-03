import { useFirebase } from "../../context/Firebase";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import moment from 'moment';
import { Layout, Space, Flex, Input, Button, Radio, Form, Upload, DatePicker } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, CloudUploadOutlined, GoogleOutlined } from '@ant-design/icons';
import LFooter from '../../components/Footer/LFooter';
import './Signup.scss';

const { Header, Content } = Layout;

function Signup() {
  const navigate = useNavigate();
  const firebase = useFirebase();

  const handleSubmit = async (values) => {
    try {
      console.log("#Registering the User.")
      //Below code will register the user details
      await firebase.registerUserDetails(values.username, values.email, values.password, moment(values.dob[0]).format('DD-MM-YYYY'), values.gender, values.profileImage.file.originFileObj);
      //Below code will register the Email and password in Authentication Mode.
      await firebase.registerUserWithEmailAndPassword(values.email, values.password);
      alert("User is registered Successfully.")
      navigate('/signin');
    }
    catch (error) {
      alert(error);
    }
  }

  return (
    <div className="App">
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout className='mainLayout'>
          <Header className='mainHeader'>
            <Flex justify={'flex-end'} align={'center'}>
              <Button className='signupBtn' onClick={() => { navigate('/'); }}>Go back</Button>
            </Flex>
          </Header>
          <Content className='mainContent'>
            <Flex className='mainContentArea' justify={'center'} align={'center'} vertical>
              <div className='signUpForm'>
                <img src={process.env.PUBLIC_URL + '/Vision.png'} alt='logo' width={120} />
                <h1> Signup to create an account.</h1>
                <Form onFinish={handleSubmit} autoComplete="off">

                  <Flex gap="small" className='signUpFormArea' justify={'center'} align={'center'} vertical>
                    <Form.Item name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your username."
                        }, { whitespace: true }, { min: 3 },
                      ]}
                      hasFeedback>
                      <Input
                        className='formInput'
                        placeholder="username"
                        prefix={<UserOutlined />} />
                    </Form.Item>

                    <Form.Item name="email" rules={[
                      {
                        required: true,
                        message: "Please enter your email."
                      },
                      {
                        type: "email",
                        message: "Please enter a valid email."
                      },
                    ]}
                      hasFeedback>
                      <Input
                        htmltype='email'
                        className='formInput'
                        placeholder="email"
                        prefix={<MailOutlined />} />
                    </Form.Item>

                    <Form.Item name="password" rules={[
                      {
                        required: true,
                      }, { min: 6 },
                    ]}
                      hasFeedback>
                      <Input.Password
                        className='formInput'
                        placeholder="password"
                        prefix={<LockOutlined />} />
                    </Form.Item>

                    <Form.Item name="confirmPassword"
                      dependencies={['password']}
                      rules={[
                        {
                          required: true,
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve()
                            } else {
                              return Promise.reject("The Two passwords that you entered doesn't match.");
                            }
                          }
                        })
                      ]}
                      hasFeedback>
                      <Input.Password
                        className='formInput'
                        placeholder="confirm password"
                        prefix={<LockOutlined />} />
                    </Form.Item>

                    <Form.Item name="dob" rules={[
                      {
                        required: true,
                        message: "Please select your date of birth."
                      },
                    ]}
                      hasFeedback>
                      <DatePicker
                        picker="date"
                        defaultValue={dayjs('01/01/2015', 'DD/MM/YYYY')} format={"DD/MM/YYYY"}
                      />
                    </Form.Item>

                    <Form.Item name="gender"
                      className='formRadio'
                      label="Gender"
                      rules={[
                        {
                          required: true,
                          message: "Please select your gender."
                        },
                      ]}
                      hasFeedback>
                      <Radio.Group
                      >
                        <Radio value="male"> Male </Radio>
                        <Radio value="female"> Female </Radio>
                        <Radio value="transgender"> Transgender </Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item name="profileImage" className='formUpload'>
                      <Upload htmltype="file"
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        listType="picture">
                        <div>
                          <CloudUploadOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                    </Form.Item>

                    <Form.Item>
                      <Button className='formButton' htmlType="submit">Sign Up</Button>
                    </Form.Item>

                    <Flex className='formLinks' justify={'center'} align={'center'}>
                      <label> Signin with </label> <GoogleOutlined className="googleIcon" title={"Google"} onClick={firebase.loginWithGoogle} />
                    </Flex>
                  </Flex>
                </Form>
              </div>
            </Flex>
          </Content>
          <LFooter />
        </Layout>
      </Space>
    </div >
  );
}

export default Signup;
