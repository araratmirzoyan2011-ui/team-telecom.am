import Footer from '../Components/footer.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { header } from '../Components/header.jsx';
import { Border } from '../Components/Appborder.jsx';
import { db } from "../firebase.js";
import { useState, useEffect } from 'react'
import { collection, getDocs, addDoc } from 'firebase/firestore';

function Applicate() {
    const [App, setApp] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const newsSnapshot = await getDocs(collection(db, "App"));
            const newsData = newsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setApp(newsData);
        };
        fetchData();
    }, []);

    return (
        <>
            {header()}
            <div className='w-[80%] h-auto grid grid-cols-[50%_50%] max-[1250px]:grid-cols-[100%] gap-[30px] ml-[10%] mt-[200px] mb-[100px] max-[630px]:ml-[5%] w-[88%]'>
                {
                    App.map((el) => (
                        <div key={el.id}>
                            {Border(el.src, el.title, el.text, () => navigate(el.onclick))}
                        </div>
                    ))
                }
            </div>
            <Footer />
        </>
    )
}
export default Applicate