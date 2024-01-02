import { useNavigate } from "react-router-dom";
import { Layout, Space, Flex, Card } from 'antd';
import { Button } from 'antd';
import LFooter from '../../components/Footer/LFooter';
import './Dashboard.scss';
import LHeader from "../../components/Header/LHeader";
import Users from "../Users/Users";

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

function Dashboard() {
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
                onClick={() => { navigate('/acceptApprovals'); }}
                style={{
                  width: 250,
                }}
                className="cardContent"
                cover={<img alt="Accept Approvals" src={process.env.PUBLIC_URL + '/Approvals.gif'} />}
              >
                <hr />
                <Meta title="Accept Approvals" />
              </Card>
              <Card
                hoverable
                onClick={() => { navigate('/reviewTicket'); }}
                style={{
                  width: 250,
                }}
                className="cardContent"
                cover={<img alt="Review Tickets" src={process.env.PUBLIC_URL + '/Tickets.gif'} />}
              >
                <hr />
                <Meta title="Review Tickets" />
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
                onClick={() => { navigate('/createPosts'); }}
                style={{
                  width: 250,
                }}
                className="cardContent"
                cover={<img alt="Create Posts" src={process.env.PUBLIC_URL + '/Posts.gif'} />}
              >
                <hr />
                <Meta title="Create Posts" />
              </Card>
              <Card
                hoverable
                onClick={() => { navigate('/addProducts'); }}
                style={{
                  width: 250,
                }}
                className="cardContent"
                cover={<img alt="Add Products" src={process.env.PUBLIC_URL + '/Products.gif'} />}
              >
                <hr />
                <Meta title="Add Products" />
              </Card>
              <Card
                hoverable
                onClick={() => { navigate('/addServiceProviders'); }}
                style={{
                  width: 250,
                }}
                className="cardContent"
                cover={<img alt="Add Service Providers" src={process.env.PUBLIC_URL + '/ServiceProviders.gif'} />}
              >
                <hr />
                <Meta title="Add Service Providers" />
              </Card>
            </Flex>
          </Content>
          <LFooter />
        </Layout>
      </Space>
    </>
  );
}

export default Dashboard;
