
import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { collection, getDocs, addDoc} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { db } from "../firebase.js";
function IC() {
    const navigate = useNavigate();
    return (
        <>
        {header()}
        
        <Footer />
        </>
    )
}
export default IC