import { useNavigate } from "react-router-dom";
import { Layout, Space, Flex, Card, Breadcrumb, Form, Input, Upload, Button, Row, Col } from 'antd';
import { HomeOutlined, UserOutlined, FileImageOutlined, HeartOutlined, HeartFilled, WechatOutlined } from '@ant-design/icons';
import LHeader from '../../components/Header/LHeader';
import './ReviewTicket.scss';
import LFooter from '../../components/Footer/LFooter';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getAllTickets } from "../../features/ticketDetailsSlice";

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

function ReviewTicket() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ticketData = useSelector((state) => state.ticket);
  console.log("#ticketData", ticketData);

  useEffect(() => {
    dispatch(getAllTickets());
  }, [dispatch]);
  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout className='mainLayout'>
          <LHeader />
          <Content className='reviewTicket' style={{ overflowY: "scroll" }}>
            <Breadcrumb
              className="breadcrumBg"
              items={[
                {
                  title: <HomeOutlined />,
                  href: '/dashboard'
                },
                {
                  title: 'Raised TIckets',
                },
              ]}
            />
            <div className='mainReviewTicketContentArea'>
              <h2> Raised tickets by colony members</h2>
              <div className="reviewTicketContainer">
                {ticketData.loading && <div>Loading </div>}
                {!ticketData.loading && ticketData.error ? <div>Error : {ticketData.error} </div> : null}
                {!ticketData.loading && ticketData.tickets?.data?.allTicketsDetails.length ? (
                  <Row gutter={24}>
                    {ticketData.tickets?.data?.allTicketsDetails.map((el, index) => (
                      <Col className="colWidth" >
                        <div className="insideColumn">
                          <div className="profileImg">
                            <img src={el.ticketIssueProofImage} alt='logo' />
                            <h2> Meet Pandya </h2>
                          </div>
                          <div className="profileMsg">
                            <p> He has created the ticket for <strong>{el.ticketTitle} </strong> regarding the <b> {el.ticketType} </b> on <b> {el.dateOfRaisedTicket}</b> where the issue is <i> ( {el.ticketDescription})</i> click on chat button to get more details. </p>
                            {/* <Button type="primary" className="viewBtn" > CHAT</Button> */}
                            <a className="chatBtn" href={`https://wa.me/91${el.phoneNumberOfUser}`} > CHAT</a>
                          </div>
                        </div>
                      </Col>
                    ))
                    }
                  </Row>
                ) : null}

              </div>
            </div>
          </Content>
          <LFooter />
        </Layout >
      </Space >
    </>
  );
}

export default ReviewTicket;
