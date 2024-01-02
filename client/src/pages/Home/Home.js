import { useNavigate } from "react-router-dom";
import { Layout, Space, Flex } from 'antd';
import { Button } from 'antd';
import LFooter from '../../components/Footer/LFooter';
import './Home.scss';

const { Header, Content, Footer } = Layout;

function Home() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout className='mainLayout'>
          <Header className='mainHeader'>
            <Flex gap="small" justify={'flex-end'} align={'center'}>
              <Button className='signupBtn' onClick={()=>  {navigate('/signup');} }>Signup</Button>
              <Button className='signinBtn'  onClick={()=>  {navigate('/signin');} } >Signin</Button>
            </Flex>
          </Header>
          <Content className='mainContent'>
            <Flex className='mainContentArea' justify={'center'} align={'center'} vertical>
              <img src={process.env.PUBLIC_URL + '/Vision.png'} alt='logo' width={150} />
              <h1> Welcome to the Vision App.</h1>
              <h3>Vision App is a platform that allows all colony members to manage their society <br />
                and promote unity in a progressive way.</h3>
            </Flex>
          </Content>

          <LFooter />
        </Layout>
      </Space>
    </div >
  );
}

export default Home;
