import React from 'react';
import Topbar from '../../Component/Topbar';
import Sidebar from '../../Component/Sidebar/SideBar';
import Feed from '../../Component/Feed/Feed';
import RightBar from '../../Component/RightBar/RightBar';
import './Profile.css';

const Profile = () => {
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src="/assets/image.jpg"
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src="/assets/image.jpg"
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">Harshit</h4>
                            <span className="profileInfoDesc">
                                Shiddat Banalu Teri Chahat Banalu , Tumse Mei Maagu Ibadat Banalu ....
                                Haa Shiddat Banalu Tujhe !!!!.............
                            </span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed userid={"123"}/>
                        <RightBar profile />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
