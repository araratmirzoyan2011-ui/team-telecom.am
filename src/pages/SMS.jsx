import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { collection, getDocs, addDoc} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { db } from "../firebase.js";
import { N2 } from '../Components/style6.jsx';
import { N1 } from '../Components/style7.jsx';
import { Faq } from '../Components/Faq.jsx';

function SMS() {
    const arr1=[["https://www.telecomarmenia.am/images/block_with_icons_icons/1/16498478378277.png","Պատրաստի լուծում","Ձեր հարթակի պարզ և արագ ինտեգրում` առանց որևէ ծախսի Team համակարգերի հետ ավտոմատ ծանուցումներ ուղարկելու համար։"],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/16498479885084.png","Հավատարմության բարձրացում","Ուղարկեք անոնսներ նորությունների, իրադարձությունների և ընկերության կարևոր միջոցառումների մասին։"],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/16498479885364.png","Վաճառքների խթանում","Ապահովեք մինչև 20% վաճառքների աճ:"],
    ["https://www.telecomarmenia.am/images/block_with_icons_icons/1/16498479885611.png","SMS-թիրախավորում","Ընտրեք համապատասխան լսարանը 5 հատկանիշների հիման վրա։"]]


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
    <Footer />
  </>
);
}
export default SMS