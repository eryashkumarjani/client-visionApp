import { useNavigate } from "react-router-dom";
import './Signup.scss';
import { Layout, Space, Flex, Input, Button, Radio, Form, Upload, DatePicker, message } from 'antd';
import dayjs from 'dayjs';
import { UserOutlined, LockOutlined, MailOutlined, CloudUploadOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import LFooter from '../../components/Footer/LFooter';
import { useFirebase } from "../../context/Firebase";
import { useEffect, useState } from "react";
import moment from 'moment';

const { Header, Content, Footer } = Layout;

function Signup() {
  const navigate = useNavigate();

  const firebase = useFirebase();

  //Notification Code
  const [messageApi, contextHolder] = message.useMessage();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  // const [profileImg, setProfileImg] = useState("");

  //Notification Code
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'User is Registered Successfully',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Something went wrong!',
    });
  };

  //value is coming in console but...
  // const handleSubmit = async (values) => {
  //   console.log({values});
  //  }

  const handleSubmit = async (values) => {
    console.log("#SignUp Values :- ", values)
    // console.log("#SignUp DOB :- ", moment(values.dob[0]).format('DD-MM-YYYY'));
    // e.preventDefault();
    // try {
    console.log("#Registering the User.")
    //Below code will register the user details
    await firebase.registerUserDetails(values.username, values.email, values.password, moment(values.dob[0]).format('DD-MM-YYYY'), values.gender, values.profileImage.file.originFileObj);

    //Below code will register the Email and password in Authentication Mode.
    await firebase.registerUserWithEmailAndPassword(values.email, values.password);

    success();

    navigate('/signin');
    // }
    // catch (error) {
    //   console.warn("#Signup Error", error);
    //   error(error);
    // }
  }

  // useEffect(() => {
  //   if (firebase.isLoggedIn) {
  //     navigate('/dashboard');
  //   }
  // }, [firebase, navigate]);

  return (
    <div className="App">
      {contextHolder}
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
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        // name={username}
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
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        // name={email}
                        className='formInput'
                        placeholder="email"
                        prefix={<MailOutlined />} />
                    </Form.Item>

                    <Form.Item name="password" rules={[
                      {
                        required: true,
                      }, { min: 6 },
                      // {
                      //   validator: (_, value) =>
                      //     value && value.includes("A")
                      //       ? Promise.resolve()
                      //       : Promise.reject('Password does not match criteria.')
                      // }
                    ]}
                      hasFeedback>
                      <Input.Password
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        // name={password}
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
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        // name={confirmPassword}
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
                      // onChange={(date, dateString) => {
                      //   console.log(dateString); setDob(date, dateString);
                      // }}
                      // value={dob}
                      // name={dob} 
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
                      <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender}
                      // name={gender} 
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
                      {/* <label>or <FacebookOutlined onClick={firebase.loginWithFacebook} /></label> */}
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
