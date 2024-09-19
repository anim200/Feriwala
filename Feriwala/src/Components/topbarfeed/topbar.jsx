import "./topbarfeed.css"
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import SmsIcon from '@mui/icons-material/Sms';
import NotificationsIcon from '@mui/icons-material/Notifications';
export default function Topbar(){

return(
    <div className="topbar-container">
        <div className="topbarLeft">
            <span className="logo">Alapcharita</span>
        </div>
        <div className="topbarCenter">
            <div className="searchbar">
            <SearchIcon className="searchIcon"/>
            <input placeholder="search for friend,post or videos" className="searchInput" />
            </div>
           
        </div>
        <div className="topbarRight">
            <div className="topbarLinks">
                <span className="topbarLink">Homepage</span>
                <span className="topbarLink">TimeLine</span>
                

            </div>
            <div className="topbarIcon">
                <div className="topbarIconItem">
                    <PersonIcon/>
                    <span className="topbarIconBadge">1</span>

                </div>
                <div className="topbarIconItem">
                    <SmsIcon/>
                    <span className="topbarIconBadge">2</span>

                </div>
                <div className="topbarIconItem">
                    <NotificationsIcon/>
                    <span className="topbarIconBadge">1</span>

                </div>
            </div>
            <img src="/assets/pf10.jpg" alt="" className="topbarImg" />
        </div>
        
    
    </div>
)


}