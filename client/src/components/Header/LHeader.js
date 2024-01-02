import { useNavigate } from "react-router-dom";
import { useFirebase, firestore } from "../../context/Firebase";
import { Layout, Space, Flex } from 'antd';
import { Button } from 'antd';
import LFooter from '../../components/Footer/LFooter';
import './LHeader.scss';
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

const docRef = doc(firestore, "profiles", "AZwiswgmHfZqvtJ2oJYN");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
const { Header, Content, Footer } = Layout;

function LHeader() {
  const navigate = useNavigate();
  const firebase = useFirebase();
  return (
    <div className="App">

      <Header className='mainHeader'>
        <Flex className='mainContentArea' justify={'space-between'} align={'center'}>
          <Flex gap="small" justify={'flex-start'} align={'center'} wrap="wrap">
            <img src={process.env.PUBLIC_URL + '/Vision.png'} alt='logo' width={90} />
            <h1 className="brandName" style={{ margin: "0rem" }}> VISION APP</h1>
          </Flex>
          <Flex gap="small" justify={'flex-end'} align={'center'} wrap="wrap">
            <Button className='logoutBtn' onClick={() => { firebase.logoutUser(); navigate("/") }} >logout</Button>
          </Flex>
        </Flex>
      </Header>
    </div >
  );
}

export default LHeader;
