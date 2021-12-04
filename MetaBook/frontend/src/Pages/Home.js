import React from 'react'
import Feed from '../Component/Feed/Feed'
import RightBar from '../Component/RightBar/RightBar'
import SideBar from '../Component/Sidebar/SideBar'
import Topbar from '../Component/Topbar';
import "./Home.css";

const Home = () => {
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Feed />
                <RightBar />
            </div>
        </>
    )
}

export default Home
