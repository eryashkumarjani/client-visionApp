import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getAllProviders } from "../../features/providerDetailsSlice";
import { Layout, Space, Card, Breadcrumb, Tabs, Row, Col, } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import LHeader from '../../components/Header/LHeader';
import LFooter from '../../components/Footer/LFooter';
import './ServiceProviders.scss';

const { Content } = Layout;
const { Meta } = Card;

function ServiceProviders() {
  const dispatch = useDispatch();

  const providerData = useSelector((state) => state.provider);
  console.log("PROVIDER_DATA", providerData)

  //Filter Tutor providers from APIs
  const tutorList = providerData?.providers?.data?.allProvidersDetails.filter(
    (el) => el.providerServiceType === "tutor",
    []
  );

  console.log("#Tutor List", tutorList)

  //Filter stationery providers from APIs
  const stationeryList = providerData?.providers?.data?.allProvidersDetails.filter(
    (el) => el.providerServiceType === "stationery",
    []
  );

  //Filter stationery providers from APIs
  const gymList = providerData?.providers?.data?.allProvidersDetails.filter(
    (el) => el.providerServiceType === "gym",
    []
  );

  useEffect(() => {
    dispatch(getAllProviders());
  }, [dispatch]);

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout className='mainLayout'>
          <LHeader />
          <Content className='serviceProviders' style={{ overflowY: "scroll" }}>
            <Breadcrumb
              className="breadcrumBg"
              items={[
                {
                  title: <HomeOutlined />,
                  href: '/dashboardUser'
                },
                {
                  title: 'Service Providers',
                },
              ]}
            />
            <div className='mainServiceProvidersContentArea'>
              <h2> Choose tabs to see service products</h2>
              <div className="serviceProvidersContainer">
                <div className="tabContainer">
                  <Tabs tabPosition="left" defaultActiveKey="tab1">
                    <Tabs.TabPane tab="Tutor" key="tab1">
                      {providerData.loading && <div>Loading </div>}
                      {!providerData.loading && providerData.error ? <div>Error : {providerData.error} </div> : null}
                      {!providerData.loading && providerData.providers?.data?.allProvidersDetails.length ? (
                        <Row gutter={24}>
                          {
                            tutorList.map((el, index) => (
                              <Col className="providerCard">
                                <Card
                                  bordered={false}
                                  className="cardDetail"
                                  key={index}
                                  cover={
                                    <img
                                      alt="example"
                                      src={el.providerImage}
                                    />
                                  }>
                                  <Meta
                                    title={el.providerName}
                                    description={el.providerServiceType}
                                  />
                                  <h5> Location : <b>{el.providerLocation}. </b></h5>
                                  {/* <Button type="primary" onClick={() => setOpen(true)}> View Detail</Button> */}
                                  <a className="chatBtn" href={`https://wa.me/91${el.providerNumber}`} > CHAT</a>
                                </Card>
                              </Col>
                            ))
                          }
                        </Row>

                      ) : null}

                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Stationery" key="tab2">
                      {providerData.loading && <div>Loading </div>}
                      {!providerData.loading && providerData.error ? <div>Error : {providerData.error} </div> : null}
                      {!providerData.loading && providerData.providers?.data?.allProvidersDetails.length ? (
                        <Row gutter={24}>
                          {
                            // providerData?.providers?.data?.allProvidersDetails.map((el, index) => (
                            stationeryList.map((el, index) => (
                              <Col span={4}>
                                <Card
                                  bordered={false}
                                  className="cardDetail"
                                  key={index}
                                  cover={
                                    <img
                                      alt="example"
                                      src={el.providerImage}
                                    />
                                  }>
                                  <Meta
                                    title={el.providerName}
                                    description={el.providerServiceType}
                                  />
                                  <h5> Location :- <b>{el.providerLocation}. </b></h5>
                                  {/* <Button type="primary" onClick={() => setOpen(true)}> View Detail</Button> */}
                                  <a className="chatBtn" href={`https://wa.me/91${el.providerNumber}`} > CHAT</a>

                                </Card>
                              </Col>
                            ))
                          }
                        </Row>

                      ) : null}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Gym" key="tab3">
                      {providerData.loading && <div>Loading </div>}
                      {!providerData.loading && providerData.error ? <div>Error : {providerData.error} </div> : null}
                      {!providerData.loading && providerData.providers?.data?.allProvidersDetails.length ? (
                        <Row gutter={24}>
                          {
                            // providerData?.providers?.data?.allProvidersDetails.map((el, index) => (
                            gymList.map((el, index) => (
                              <Col span={4}>
                                <Card
                                  bordered={false}
                                  className="cardDetail"
                                  key={index}
                                  cover={
                                    <img
                                      alt="example"
                                      src={el.providerImage}
                                    />
                                  }>
                                  <Meta
                                    title={el.providerName}
                                    description={el.providerServiceType}
                                  />
                                  <h5> Location :- <b>{el.providerLocation}. </b></h5>
                                  {/* <Button type="primary" onClick={() => setOpen(true)}> View Detail</Button> */}
                                  <a className="chatBtn" href={`https://wa.me/91${el.providerNumber}`} > CHAT</a>

                                </Card>
                              </Col>
                            ))
                          }
                        </Row>

                      ) : null}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Electronic Repair" key="tab4">
                      <p> No Data... </p>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Hair Salon" key="tab5">
                      <p> No Data... </p>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Pharmacy" key="tab6">
                      <p> No Data... </p>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Carpenter" key="tab7">
                      <p> No Data...</p>
                    </Tabs.TabPane>
                  </Tabs>
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

export default ServiceProviders;
