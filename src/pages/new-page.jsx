import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase.js';
import { Link } from 'react-router-dom';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { share } from '../Components/Share.jsx';
import { text } from '../Components/new-page-condition.jsx';
function NewsPage() {
  const { id } = useParams();
  const [news, setNews] = useState(null);

 useEffect(() => {
    const fetchNews = async () => {
      const newsSnapshot = await getDocs(collection(db, "news"));
      const found = newsSnapshot.docs.find(doc => doc.data().id == id);
      
      if (found) {
        setNews({ id: found.id, ...found.data() });
      }
    };

    fetchNews();
  }, [id]);
  if (!news) return <p>Loading...</p>;

  return (
    <>
      {header()}
      
      {text(news)}
      
      <div className="w-[200px] h-[60px] ml-[10%] flex flex-row items-center justify-around text-[rgb(44,43,43)] mb-[60px]">
        {share()}
      </div>
     <Footer />
    </>
  );
}

export default NewsPage;