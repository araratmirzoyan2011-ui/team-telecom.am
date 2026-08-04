import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { share } from '../Components/Share.jsx';

function DeliveryTable() {
  const rows = [
    { region: "Yerevan", fee: "all addresses - free", time: "during 1 working day" },
    { region: "Regions", fee: "1500 AMD", time: "during 3 working days" },
  ];

  return (
    <>
    {header()}
    <div className="max-w-4xl ml-[10%] mx-auto rounded-lg overflow-hidden  mt-[150px]">
        <h1 className='text-[60px] mb-[40px]'>Delivery Terms</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#0a3d5c] text-white">
            <th className="py-6 px-4 text-lg font-bold text-center">Region</th>
            <th className="py-6 px-4 text-lg font-bold text-center">Locality/fee</th>
            <th className="py-6 px-4 text-lg font-bold text-center">Delivery time</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-gray-100" : "bg-white"}>
              <td className="py-8 px-4 text-center font-bold text-gray-800">{row.region}</td>
              <td className="py-8 px-4 text-center text-gray-600">{row.fee}</td>
              <td className="py-8 px-4 text-center text-gray-600">{row.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="w-[200px] h-[60px] ml-[10%] mt-[60px] flex flex-row items-center justify-around text-[rgb(44,43,43)] mb-[60px]">
        {share()}
      </div>
    <Footer />
    </>
  );
}

export default DeliveryTable;