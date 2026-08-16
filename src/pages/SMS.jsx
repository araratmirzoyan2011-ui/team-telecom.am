import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { collection, getDocs, addDoc} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { db } from "../firebase.js";
import { N2 } from '../Components/style6.jsx';
import { N1 } from '../Components/style7.jsx';
import { Faq } from '../Components/Faq.jsx';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { N8 } from '../Components/stile8.jsx';
function SMS() {
    const arr1=[["https://www.telecomarmenia.am/images/block_with_icons_icons/1/16498478378277.png","Պատրաստի լուծում","Ձեր հարթակի պարզ և արագ ինտեգրում` առանց որևէ ծախսի Team համակարգերի հետ ավտոմատ ծանուցումներ ուղարկելու համար։"],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/16498479885084.png","Հավատարմության բարձրացում","Ուղարկեք անոնսներ նորությունների, իրադարձությունների և ընկերության կարևոր միջոցառումների մասին։"],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/16498479885364.png","Վաճառքների խթանում","Ապահովեք մինչև 20% վաճառքների աճ:"],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/16498479885611.png","SMS-թիրախավորում","Ընտրեք համապատասխան լսարանը 5 հատկանիշների հիման վրա։"]]

    const arr2 = [
  {
    id: 1,
    step: '1',
    image: 'https://www.telecomarmenia.am/images/block_with_news_slides/1/16498489526155.jpeg',
    title: 'Send a Request',
    description: 'Send a Request via form above and our specialists will contact you for further assistance.',
  },
  {
    id: 2,
    step: '2',
    image: 'https://www.telecomarmenia.am/images/block_with_news_slides/1/16498489526754.jpeg',
    title: 'Join Free Promo',
    description: 'You can test the service effectiveness by sending up to 500 messages completely free and without any strings attached.',
  },
  {
    id: 3,
    step: '3',
    image: 'https://www.telecomarmenia.am/images/block_with_news_slides/1/1649848952706.jpeg', 
    title: 'Activate the service',
    description: 'After testing, you can choose the package you are interested in and sign the main contract.',
  },
];
    const faqLeft = [
  {
    q: "Ծառայության սահմանափակումներ",
    a: `Հաճախորդը իրավունք չունի իրականացնել չհամաձայնեցված SMS հաղորդագրությունների ուղարկում (առևտրային բնույթի SMS հաղորդագրություններ այն անձանց, ովքեր չեն հայտնել համապատասխան համաձայնություն), այսինքն՝ ստեղծել SPAM:

SMS հաղորդագրությունները չպետք է պարունակեն այնպիսի տեղեկատվություն, որի տարածումն արգելված է Հայաստանի Հանրապետության գործող օրենսդրությամբ:

Բաժանորդները իրավունք ունեն արգելափակել SMS-ների ստացումը նշված տարբերակներից մեկով.`,
  },
];

const faqRight = [
  {
    q: "Ընդհանուր պայմաններ",
    a: `Բոլոր սակագները ներկայացված են ՀՀ դրամով՝ ներառյալ ԱԱՀ:

Ամսավճարը գանձվում է հաշվետու ժամանակահատվածի ավարտից հետո: Փաթեթով նախատեսված SMS-ները պետք է օգտագործվեն ընթացիկ օրացուցային ամսվա ընթացքում: Չօգտագործված SMS-երը չեն տեղափոխվում հաջորդ ամիս:

Եթե փաթեթով նախատեսված SMS-երը սպառվում են մինչև օրացուցային ամսվա ավարտը, ապա հավելյալ SMS-երը տարիֆիկացվում են համաձայն տվյալ փաթեթի համար նախատեսված SMS-ի արժեքի:

Փաթեթի միացումը գործող բաժանորդների համար հնարավոր է միայն ամսվա առաջին 3 աշխատանքային օրվա ընթացքում: Իսկ փաթեթի անջատումը հնարավոր է կատարել միայն ամսվա վերջին աշխատանքային օրը:

SMS-թիրախավորման սակագները գումարվում են «Բազային», «Գովազդային», «Ինֆո-ալիք» փաթեթներում ներառված և փաթեթներից գերազանցող SMS-երի սակագների հետ՝ յուրաքանչյուր ուղարկված SMS-ի համար:

SMS-թիրախավորումը գործում է միայն իրենց համաձայնությունը հայտնած բաժանորդների համար:`,
  },
];

    const navigate = useNavigate();
    // ...
return (
  <>
    {header()}

    <div className='mt-[100px] w-full min-h-[500px] grid grid-cols-1 md:grid-cols-2 bg-[#e3ddd2]'>
      <N2
            src='https://www.youtube.com/embed/XDc3E82hG0Q?start=1'
            h1='Online credit'
            p='Online credit enables you to make purchases from online shop (e-Shop) by paying with credit.'
            col="text-[#083f58]"
        />
    </div>

    <div className='w-full h-auto bg-[#083f58]'>
      <N1 arr={arr1} h1='Ծառայության առավելությունները' />
    </div>

    <Faq leftItems={faqLeft} rightItems={faqRight} />
    <div className='flex justify-center'>
      <h1 className='mt-[80px] text-[60px]'>SMS-info packages</h1>
    </div>
    <div className='grid grid-rows-[30%_70%] w-[80%] h-[400px] ml-[10%] mt-[60px]'>
      <div className='bg-gray-500 flex justify-center items-center text-[60px] max-[1000px]:grid grid-cols_1 text-[48px] max-[600px]: text-[38px]'>
        <h1>BASIC 0 ֏/month</h1>
      </div>
      <div>
        <div className='w-full h-[30%] flex flex-col justify-around border-y border-gray-500 pl-[30px] pt-[10px] mt-[20px]'>
          <p>11 ֏/SMS - to all networks</p>
        </div>
        <div className='w-full h-[30%] flex flex-col justify-around border-y border-gray-500 pl-[30px] pt-[10px]'>
          <p>30,000 ֏ - API integration*</p>
        </div>
        <div className='w-full h-[30%] flex flex-col justify-around border-y border-gray-500 pl-[30px] pt-[10px]'>
          <p>+2 ֏/SMS - SMS-targeting* *In case of 6 month contract - free.</p>
        </div>
      </div>
    </div>
   <div className="mt-[60px] w-full px-5 box-border h-[600px]  max-[1000px]:w-[500px] grid grid-cols_2 gap-[60px]  bg-[#01425f]">
  <Swiper
    modules={[Navigation, Pagination]}
    spaceBetween={30}
    slidesPerView={2}
    slidesPerGroup={1}
    navigation={true}
    pagination={{ clickable: true }}
    style={{ width: "100%", paddingBottom: "40px" }}
    className='mt-[40px] w-[100%]'
    breakpoints={{
    0: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 20 },
    1000: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 30 },
  }}
  >
    {arr2.map((el, index) => (
      <SwiperSlide key={el.id ?? index}>
        <div className="w-full h-full flex flex-col">
          <img
            src={el.image}
            alt=""
            className="w-full h-[70%] object-cover"
          />
          <div className="flex flex-col justify-start items-start mt-[20px]">
            <h1 className="text-[28px] font-bold text-[#e3ddd2]">
              {el.step}. {el.title}
            </h1>
            <p className="text-[16px] text-[#e3ddd2] mt-[8px]">
              {el.description}
            </p>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>
  <div className='w-full min-h-[500px]  flex justify-center items-center'>
      <N8
        h1='Connection request'
        p='Send a request to corp@telecomarmenia.am address or call 010-700-700 number'
        button='Join'
        col="text-[#01425f]"
      />
    </div>
    <Footer />
  </>
);
}
export default SMS