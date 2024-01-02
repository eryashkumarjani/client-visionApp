import './ForgotPassword.scss';
import { useNavigate } from "react-router-dom";
import { Layout, Space, Flex, Input, Button, Form } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import LFooter from '../../components/Footer/LFooter';
import { useEffect, useState } from "react";
import { useFirebase } from "../../context/Firebase";

const { Header, Content, Footer } = Layout;

function ForgotPassword() {
  const navigate = useNavigate();

  const firebase = useFirebase();
  console.log("#firebase", firebase);

  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    await firebase.resetEmailPassword(email);
    console.log("#Email is ", email);
    setEmail("");
  }

  return (
    <>
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
                <h1> Forgot Password.</h1>
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

                    <Button className='formButtonFP' htmlType="submit">Reset</Button>
                  </Flex>
                </Form>
              </div>
            </Flex>
          </Content>
          <LFooter />
        </Layout>
      </Space>
    </>
  );
}

export default ForgotPassword;
