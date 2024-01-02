import { Link, useNavigate } from "react-router-dom";
import './Signin.scss';
import { Layout, Space, Flex, Input, Button, Form, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import LFooter from '../../components/Footer/LFooter';
import { useEffect, useState } from "react";
import { useFirebase } from "../../context/Firebase";

const { Header, Content, Footer } = Layout;

function Signin() {
  const navigate = useNavigate();

  const firebase = useFirebase();

  //Notification Code
  const [messageApi, contextHolder] = message.useMessage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'User is Logged in Successfully',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Something went wrong!',
    });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      console.log("#Logining the User.")
      await firebase.loginUserWithEmailAndPassword(email, password);
      success();
      console.log("#User is Loggedin");
      setEmail("");
      setPassword("");

      if (firebase.isLoggedIn && firebase.isAdmin) {
        navigate('/dashboard');

        console.log("#Admin", firebase.isAdmin)
      }

      if (firebase.isLoggedIn && !firebase.isAdmin) {
        navigate('/dashboardUser');
        console.log("#NotanAdmin", firebase.isAdmin)

      }

      // navigate('/dashboard');
    }
    catch (error) {
      console.warn("#Signin Error", error);
      error(error);
    }
  }

  // useEffect(() => {
  //   // if (firebase.isLoggedIn) {
  //   //   navigate('/dashboard');
  //   // }

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
              <div className='signInForm'>
                <img src={process.env.PUBLIC_URL + '/Vision.png'} alt='logo' width={120} />
                <h1> Signin to your account.</h1>
                <Form onFinish={handleSubmit} >

                  <Flex gap="small" className='signInFormArea' justify={'center'} align={'center'} vertical>
                    <Form.Item name="email"
                      rules={[
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
                      <Input onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className='formInput'
                        placeholder="Email"
                        prefix={<UserOutlined />} />
                    </Form.Item>

                    <Form.Item name="password" rules={[
                      {
                        required: true,
                      }, { min: 6 },
                    ]}
                      hasFeedback>
                      <Input.Password onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className='formInput'
                        placeholder="password"
                        prefix={<LockOutlined />} />
                    </Form.Item>

                    <Link to="/forgotPassword"> Forget password?</Link>

                    <Button className='formButton' htmlType="submit">Sign In</Button>

                    <label>Not a Member? <Link to="/signup"> Sign Up</Link> </label>
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

export default Signin;
