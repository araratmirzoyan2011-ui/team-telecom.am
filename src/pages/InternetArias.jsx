import { header as Header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import Doc from '../Components/doc.jsx';

function Internet() {
  return (
    <>
      <Header />
      <div className="w-[60%] h-[auto] ml-[10%] mt-[150px] mb-[80px]">
        <p className='text-[24px]  max-[700px]:text-[18px]'>
          To check the internet speed available at a given address, fill out the following application and click «send» ․ Delivery and installation of devices is absolutely free all over RA territory.
        </p>
        <h1 className='text-[#2c3843] text-[48px]'>Send a request</h1>
        <div className='w-full grid grid-cols-3 gap-[20px] mt-[20px]'>
          <div>
            <label htmlFor="name" className='text-gray-500 max-[700px]:text-[14px]'>Name Surname*</label>
            <input id="name" type="text" className='w-full h-[40px] rounded-[20px] border border-gray-300 px-[15px]' />
          </div>
          <div>
            <label htmlFor="email" className='text-gray-500 max-[700px]:text-[14px]'>Email</label>
            <input id="email" type="email" className='w-full h-[40px] rounded-[20px] border border-gray-300 px-[15px]' />
          </div>
          <div>
            <label htmlFor="phone" className='text-gray-500 max-[700px]:text-[14px]'>Phone number*</label>
            <input id="phone" type="number" className='w-full h-[40px] rounded-[20px] border border-gray-300 px-[15px]' />
          </div>
          <div>
            <label htmlFor="city" className='text-gray-500 max-[700px]:text-[14px]'>Region*</label>
            <select id="city" className='w-full h-[40px] rounded-[20px] border border-gray-300 px-[15px] max-[550px]:text-[14px]'>
                <option value="Select">Select region</option>
              <option value="yerevan">Yerevan</option>
              <option value="ararat">Ararat</option>
              <option value="armavir">Armavir</option>
              <option value="vayots dzor">Vayots Dzor</option>
              <option value="gegharkunik">Gegharkunik</option>
              <option value="kotayq">Kotayq</option>
              <option value="lori">Lori</option>
              <option value="syuniq">Syuniq</option>
              <option value="tavush">Tavush</option>
              <option value="shirak">Shirak</option>
            </select>
          </div>
          <div>
            <label htmlFor="address" className='text-gray-500 max-[700px]:text-[14px]'>Address*</label>
            <input id="address" type="text" className='w-full h-[40px] rounded-[20px] border border-gray-300 px-[15px]' />
          </div>
          <div className='flex items-end'>
            <button type="submit" className='w-[100px] h-[40px] rounded-[20px] bg-red-500 text-white'>Send</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Internet;