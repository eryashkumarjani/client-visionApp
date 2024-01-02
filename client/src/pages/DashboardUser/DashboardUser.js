import { useNavigate } from "react-router-dom";
import { Layout, Space, Flex, Card } from 'antd';
import LFooter from '../../components/Footer/LFooter';
import './DashboardUser.scss';
import LHeader from "../../components/Header/LHeader";

const { Content } = Layout;
const { Meta } = Card;

function DashboardUser() {
  const navigate = useNavigate();

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout className='mainLayout'>
          <LHeader />
          <Content className='mainDashboardContent'>
            <Flex gap="large" wrap="wrap" className='mainDashboardContentArea' justify={'center'}>
              <Card
                hoverable
                onClick={() => { navigate('/raiseTicket'); }}
                style={{
                  width: 250,
                }}
                className="cardContent"
                cover={<img alt="Raise Tickets" src={process.env.PUBLIC_URL + '/Tickets.gif'} />}
              >
                <hr />
                <Meta title="Raise Tickets" />
              </Card>
              <Card
                hoverable
                onClick={() => { navigate('/fundMonitor'); }}
                style={{
                  width: 250,
                }}
                className="cardContent"
                cover={<img alt="Fund Monitor" src={process.env.PUBLIC_URL + '/Funds.gif'} />}
              >
                <hr />
                <Meta title="Fund Monitor" />
              </Card>
              <Card
                hoverable
                onClick={() => { navigate('/viewPosts'); }}
                style={{
                  width: 250,
                }}
                className="cardContent"
                cover={<img alt="View Posts" src={process.env.PUBLIC_URL + '/Posts.gif'} />}
              >
                <hr />
                <Meta title="View Posts" />
              </Card>
              <Card
                hoverable
                onClick={() => { navigate('/homemadeProducts'); }}
                style={{
                  width: 250,
                }}
                className="cardContent"
                cover={<img alt="Buy Products" src={process.env.PUBLIC_URL + '/Products.gif'} />}
              >
                <hr />
                <Meta title="Buy Products" />
              </Card>
              <Card
                hoverable
                onClick={() => { navigate('/serviceProviders'); }}
                style={{
                  width: 250,
                }}
                className="cardContent"
                cover={<img alt="View Service Providers" src={process.env.PUBLIC_URL + '/ServiceProviders.gif'} />}
              >
                <hr />
                <Meta title="View Service Providers" />
              </Card>
            </Flex>
          </Content>
          <LFooter />
        </Layout>
      </Space>
    </>
  );
}

export default DashboardUser;
