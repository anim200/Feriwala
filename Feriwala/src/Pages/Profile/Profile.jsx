import { useDispatch, useSelector } from "react-redux";
import "./profile.css";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { uploadProfilePicture } from "../../action";

const Profile = () => {
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file && user) {
          dispatch(uploadProfilePicture(file, user._id));
        }
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    const defaultImageUrl = '/noimage.png';

    return (
        <> 
        <div className="hsection">
        <div className="navbar-top">
                <div className="title">
                    <h1>Profile</h1>
                </div>
            </div>

        </div>
        <div className="bscection">
        <div className="main">
                <div className="profile-container">
                    <img 
                        src={user?.profilePicture || defaultImageUrl} 
                        alt="profile" 
                        onClick={triggerFileInput} 
                        className="profile-img"
                    />
                    <div className="name">{user.username}</div>
                    <div className="job">CSE-20</div>
                    <div className="button-container">
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <Link to="/detail">
                            <button>Post your product</button>
                        </Link>
                    </div>
                </div>

                <div className="card">
                    <h2>IDENTITY</h2>
                    <div className="card-body">
                        <i className="fa fa-pen fa-xs edit"></i>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>:</td>
                                    <td>{user.username}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>:</td>
                                    <td>{user.email}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
            

            
        </>
    );
}

export default Profile;

