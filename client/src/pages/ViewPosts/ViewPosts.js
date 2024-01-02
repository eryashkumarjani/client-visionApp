import { useNavigate } from "react-router-dom";
import { Layout, Space, Flex, Card, Breadcrumb, Form, Input, Upload, Button, Spin } from 'antd';
import { HomeOutlined, UserOutlined, FileImageOutlined, HeartOutlined, HeartFilled, WechatOutlined } from '@ant-design/icons';
import LHeader from '../../components/Header/LHeader';
import './ViewPosts.scss';
import LFooter from '../../components/Footer/LFooter';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { getAllPosts } from "../../features/postDetailsSlice";

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

function ViewPosts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postData = useSelector((state) => state.post);
  console.log("#PostData", postData);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout className='mainLayout'>
          <LHeader />
          <Content className='createPostsContent' style={{ overflowY: "scroll" }}>
            <Breadcrumb
              className="breadcrumBg"
              items={[
                {
                  title: <HomeOutlined />,
                  href: '/dashboardUser'
                },
                {
                  title: 'View Posts',
                },
              ]}
            />
            <div className='mainPostsContentArea'>

              <div className="leftPostsContentArea">
                <h2> View Posts</h2>
                {postData.loading && <div>Loading </div>}
                {!postData.loading && postData.error ? <div>Error : {postData.error} </div> : null}
                {!postData.loading && postData.posts?.data?.allPostDetails.length ? (
                  <div>
                    {
                      postData?.posts?.data?.allPostDetails.map((el, index) => (
                        <div className="viewPosts">
                          <div className="postHeader" >
                            <img src={process.env.PUBLIC_URL + '/profile.png'} alt='logo' width={25} />
                            <h5> Yashkumar Jani</h5>
                            <span> 1 day ago.</span>
                          </div>
                          <div className="postContent">
                            <p key={index} > {el.postDescription} </p>
                            <img src={el.postUploadImage} />
                          </div>
                          <div className="postFooter">
                            {/* <HeartOutlined /> */}
                            <HeartFilled className="likeIcon" /> <span> 10 Likes</span>

                            <WechatOutlined className="commentIcon" /> <span> 2 Comments</span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ) : null}
              </div>

              <div className="rightPostsContentArea">
                <h2> Activities</h2>
                <div className="postActivities">
                  <div className="postActivityDetail" >
                    <div className="userDetail">
                      <img src={process.env.PUBLIC_URL + '/profile.png'} alt='logo' width={40} />
                      <h5> Ravi Patel </h5>
                      <p> has liked on your post.</p>
                      <span> 1 day ago.</span>
                    </div>
                    <div className="postDetail">
                      <img src={"https://5.imimg.com/data5/ANDROID/Default/2022/12/SR/OL/XK/48484822/product-jpeg-1000x1000.jpg"} alt='logo' width={25} />
                    </div>
                  </div>
                  <div className="postActivityDetail" >
                    <div className="userDetail">
                      <img src={process.env.PUBLIC_URL + '/profile.png'} alt='logo' width={40} />
                      <h5> Kelu Modi </h5>
                      <p> has commented on your post.</p>
                      <span> 1 day ago.</span>
                    </div>
                    <div className="postDetail">
                      <img src={"https://5.imimg.com/data5/ANDROID/Default/2022/12/SR/OL/XK/48484822/product-jpeg-1000x1000.jpg"} alt='logo' width={25} />
                    </div>
                  </div>
                  <div className="postActivityDetail" >
                    <div className="userDetail">
                      <img src={process.env.PUBLIC_URL + '/profile.png'} alt='logo' width={40} />
                      <h5> Kishan Jani </h5>
                      <p> has liked on your post.</p>
                      <span> 3 day ago.</span>
                    </div>
                    <div className="postDetail">
                      <img src={"https://5.imimg.com/data5/ANDROID/Default/2022/12/SR/OL/XK/48484822/product-jpeg-1000x1000.jpg"} alt='logo' width={25} />
                    </div>
                  </div>
                  <div className="postActivityDetail" >
                    <div className="userDetail">
                      <img src={process.env.PUBLIC_URL + '/profile.png'} alt='logo' width={40} />
                      <h5> Meet Pandya </h5>
                      <p> has commented on your post.</p>
                      <span> 1 week ago.</span>
                    </div>
                    <div className="postDetail">
                      <img src={"https://5.imimg.com/data5/ANDROID/Default/2022/12/SR/OL/XK/48484822/product-jpeg-1000x1000.jpg"} alt='logo' width={25} />
                    </div>
                  </div>
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

export default ViewPosts;
