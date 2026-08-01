import { db } from '../firebase.js';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { border } from '../Components/news-border.jsx';
import { border2 } from '../Components/news-border2.jsx';
import { kalendar } from '../Components/kalendar.jsx';
import { border8 } from '../Components/border8.jsx';
import { pagination } from '../Components/pagination1.jsx';
import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { share } from '../Components/Share.jsx';
function News() {
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchData = async () => {
            const newsSnapshot = await getDocs(collection(db, "news"));
            const newsData = newsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setNews(newsData);
        };
        fetchData();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const offset = (currentPage - 1) * itemsPerPage;
    const currentItems = news.slice(offset, offset + itemsPerPage);

    return (
        <>
        {header()}
        <h1 className="text-[40px] ml-[10%] text-[rgb(22,20,20)] mt-[150px]">News</h1>
        <div className="mt-10 ml-[10%] w-[80%] h-10 border-b border-gray-500 flex">
            {border2("News")}
            {border("Announcements")}
            {border("All")}
        </div>
        <div className="mt-10 ml-[10%] w-1/5 h-auto flex max-[1340px]:flex-col">
            {kalendar("2026.07.02", "2026.07.02")}
            {border8("Search")}
        </div>
        <div className="ml-[10%] mt-[60px] w-[70%] grid grid-cols-2 gap-5 max-[1000px]:grid-cols-1">
            {pagination(currentItems, navigate)}
        </div>

        {news.length > itemsPerPage && (
        <div className="flex justify-center mt-[30px]">
            <Pagination
            current={currentPage}
            total={news.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            />
        </div>
        )}
        <div className="w-[200px] h-[60px] ml-[10%] flex flex-row items-center justify-around text-[rgb(44,43,43)] mb-[60px]">
            {share()}
        </div>

        <Footer />
        </>
    )
}

export default News