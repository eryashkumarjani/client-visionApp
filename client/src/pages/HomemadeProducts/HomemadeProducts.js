// import { useNavigate } from "react-router-dom";
import { Layout, Space, Card, Breadcrumb, Button, Tabs, Row, Col, } from 'antd';
import { HomeOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import LHeader from '../../components/Header/LHeader';
import './HomemadeProducts.scss';
import LFooter from '../../components/Footer/LFooter';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllProducts, addToCart, getCartTotal, removeItem, increaseItemQuantity, decreaseItemQuantity
} from "../../features/productDetailsSlice";
import axios from "axios";

const { Content } = Layout;
const { Meta } = Card;

function HomemadeProducts() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const productData = useSelector((state) => state.product);

  //Filter Tutor providers from APIs
  const woodworkList = productData?.products?.data?.allProductsDetails.filter(
    (el) => el.productType === "woodwork", []
  );

  //cart Items
  const { allCart, totalQuantity, totalPrice } = useSelector((state) => state.product);
  console.log("#Cart", allCart);


  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCartTotal());
  }, [allCart, dispatch]);

  const checkouthandler = async (totalPrice) => {
    const { data: { order } } = await axios.post("https://visionapp-backend.onrender.com/api/v1/razorpay/checkout", { totalPrice })
    console.log(window);
    const options = {
      key: "rzp_test_CLCb3MHpT7PJRC",
      amount: order.totalPrice,
      currency: "INR",
      name: "Yashkumar Jani",
      description: "Razorpay tutorial",
      image: "https://media.licdn.com/dms/image/D4D03AQG9pYZy3A0FJQ/profile-displayphoto-shrink_200_200/0/1698504476531?e=2147483647&v=beta&t=R7rIJLCYeprEwZqlgWugwQr0yTAwF71ds9oO_VKiqI8",
      order_id: order.id,
      callback_url: "https://visionapp-backend.onrender.com/api/v1/razorpay/payment-verification",
      prefill: {
        name: "Yashkumar Jani",
        email: "eryashkumarjani@gmail.com",
        contact: "8320870517"
      },
      notes: {
        "address": "Babra 🙏 State"
      },
      theme: {
        "color": "#3399cc"
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();

  }


  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout className='mainLayout'>
          <LHeader />
          <Content className='homemadeProducts' style={{ overflowY: "scroll" }}>
            <Breadcrumb
              className="breadcrumBg"
              items={[
                {
                  title: <HomeOutlined />,
                  href: '/dashboardUser'
                },
                {
                  title: 'Homemade Products',
                },
              ]}
            />
            <div className='mainHomemadeProductsContentArea'>
              <h2> Choose tabs to see Homemade products</h2>
              <div className="homemadeProductsContainer">
                <div className="leftContainer">
                  <Tabs tabPosition="left" defaultActiveKey="tab1">
                    <Tabs.TabPane tab="Woodwork" key="tab1">
                      {productData.loading && <div>Loading </div>}
                      {!productData.loading && productData.error ? <div>Error : {productData.error} </div> : null}
                      {!productData.loading && productData.products?.data?.allProductsDetails.length ? (
                        <Row gutter={24}>
                          {woodworkList.map((item, index) => (
                            // <Col span={6}>
                            <Col className="cartItemBox">
                              <Card
                                key={item._id}
                                bordered={false}
                                cover={
                                  <img
                                    alt="example"
                                    src={item.productImage}
                                  />
                                }>
                                <Meta
                                  title={item.productName}
                                  description={item.productType}
                                />

                                <p> Price :- <b>₹&nbsp;{item.productPrice} </b></p>
                                <Button className="addToCartBtn" ghost type="primary" onClick={() => dispatch(addToCart(item))} > ADD TO CART</Button>
                              </Card>
                            </Col>
                          ))
                          }
                        </Row>
                      ) : null}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Pottery" key="tab2">
                      <p> No Data...</p>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Leather" key="tab3">
                      <p> No Data...</p>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Jute" key="tab4">
                      <p> No Data...</p>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Shell" key="tab5">
                      <p> No Data...</p>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Phulkaris" key="tab6">
                      <p> No Data...</p>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Zardozi" key="tab7">
                      <p> No Data...</p>
                    </Tabs.TabPane>
                  </Tabs>
                </div>
                <div className="rightContainer">
                  <h4> Shopping Cart</h4>
                  <Row gutter={12}>
                    {allCart?.map((item) => (
                      <>
                        <Col span={24}>
                          <Card
                            key={item._id}
                            className="shoppingCartBox"
                            bordered={true}>
                            <div className="startCart">
                              <img alt="Review Tickets" src={item.productImage} width={35} />
                              <h4> {item.productName}</h4>
                            </div>
                            <div className="endCard">
                              <div className="quantity">
                                <PlusCircleOutlined onClick={() =>
                                  dispatch(increaseItemQuantity(item._id))
                                } />
                                <p>&nbsp;<b>{item.productQuantity} </b> &nbsp;</p>
                                <MinusCircleOutlined onClick={() =>
                                  dispatch(decreaseItemQuantity(item._id))
                                } />
                              </div>
                              <div className="price">
                                <b>₹&nbsp;{item.productPrice}</b>
                                <label onClick={() => dispatch(removeItem(item._id))}> Remove </label>
                              </div>
                            </div>
                          </Card>
                        </Col>

                      </>
                    ))}
                  </Row>

                  <hr />
                  {allCart.length ? (
                    <Row gutter={12}>
                      <Col span={24}>
                        <Card
                          className="shoppingCartBox"
                          bordered={false}>
                          <div className="totalAmount">
                            <div className="totalQ">
                              <p> <strong> Sub-total : </strong> </p>
                              <span> {totalQuantity} items</span>
                            </div>
                            <div className="totalP">
                              <h2> ₹&nbsp;{totalPrice}/-</h2>
                            </div>
                          </div>
                        </Card>
                      </Col>

                      <Col span={24}>
                        <Button className="checkItOut" onClick={() => checkouthandler(totalPrice)}> CHECKOUT </Button>
                      </Col>
                    </Row>
                  ) : <div className="emptyCartBox"> <img src={process.env.PUBLIC_URL + '/emptyCart.png'} alt='logo' /></div>
                  }
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

export default HomemadeProducts;
