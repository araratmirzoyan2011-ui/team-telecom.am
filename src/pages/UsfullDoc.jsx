import { header as Header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { share as Share } from '../Components/Share.jsx';
import Doc from '../Components/doc.jsx';

function UsfullDoc() {
  return (
    <>
      <Header />
      <div className="max-w-5xl ml-[10%] mx-auto rounded-lg overflow-hidden mt-[150px]">
        <h1 className='text-[60px] mb-[40px]'>Delivery Terms</h1>
        <div className='grid grid-cols-2 gap-[40px] col-gap-[40px]'>
          <Doc inf="Շարժական ֆիքսված ծառայությունների մատուցման դիմում հայտ" />
          <Doc inf="«ԿՈՄԲՈ»(«COMBO») «ԿՈՍՄՈ»(«COSMO») ծառայությունների մատուցման դիմում հայտ" />
          <Doc inf="«ԿՈՄԲՈ»(«COMBO») «ԿՈՍՄՈ»(«COSMO») սառեցման դիմում-հայտ" />
          <Doc inf="Ամրակցված հեռախոսահամարի  կասեցման դիմում-հայտ" />
          <Doc inf="Ֆիքսված ինտերնետ ծառայության ժամանակավոր կասեցման դիմում-հայտ" />
          <Doc inf="«ՏԵԼԵԿՈՄ ԱՐՄԵՆԻԱ» ԲԲԸ ֆիքսված կապի ծառայությունների մատուցման դիմում-հայտ" />
          <Doc inf="«My Team» Հավելվածի տրամադրման պայմաններ" />
          <Doc inf="Լիազորագիր" />
          <Doc inf="Հեռախոսահամարի փաստացի օգտագործողի կողմից պայմանագրի անվանափոխության դիմում հայտ" />
          <Doc inf="Հաստատուն սահմանաչափի սահմանման դիմում -հայտ" />
        </div>
        <p className='mt-[60px]'>Ապառիկ վաճառքի պայմաններ՝</p>
        <div className='grid grid-cols-2 gap-[40px] col-gap-[40px] mt-[40px]'>
            <Doc inf="«Յունիբանկ» ԲԲԸ" />
          <Doc inf="«Ինեկոբանկ» ՓԲԸ" />
          <Doc inf="«ACBA Credit Agricole» ՓԲԸ" />
        </div>
      </div>
      <div className="w-[200px] h-[60px] ml-[10%] mt-[60px] flex flex-row items-center justify-around text-[rgb(44,43,43)] mb-[60px]">
        <Share />
      </div>
      <Footer />
    </>
  );
}

export default UsfullDoc;