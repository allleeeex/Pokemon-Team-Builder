import './ProfileBox.css'
import Avatar from '@mui/material/Avatar';
import { useAuth } from '../routes/AuthContext';
import pfp from '../assets/pfp.png';

function ProfileBox({ onClick }) {
	const { auth } = useAuth();

    return (
        <div className="main" onClick={(onClick)}>
			{auth.token ? (
				<Avatar alt="w" src={pfp} />
			) : (
				<div></div>
			)}
            {auth.token ? (
				<div>{auth.user}</div>
			) : (
				<div>Not Logged In</div>
			)}
        </div>
    )
}  

export default ProfileBox