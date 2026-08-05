import { header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
import { share } from '../Components/Share.jsx';

export default function CreditTable() {
const banks = [
  {
    name: "ACBA BANK",
    age: "20-65",
    rate: "21.6%",
    commission: "0%",
    months: "3-36",
    amount: "3,500,000 AMD",
    maxamount: "26,000 AMD", // Նվազագույն գումար
    documents: "Passport or ID-card and social card",
    registration: "Yes",
    NKR: "Yes, in the case of the original certificate of actual residence in the Republic of Armenia",
    amountsm: "2",
    seond: "No more than 2",
    RegisteredEmployee: "Not required",
    n: "Not acceptable",
    LoanRate: "23,80% - 23,95%",
    reditWeb: "https://www.acba.am/hy/individuals/loans/installment-loan",
    BankWebAdress: "https://www.acba.am",
    bankContract: "(37410) 31-88-88",
    Note: "ACBA bank is controlled by CBA"
  },
  {
    name: "UNIBANK",
    age: "21-65",
    rate: "21,5%",
    commission: "0,99%",
    months: "Only 36",
    amount: "1,500,000 AMD",
    maxamount: "30,000 AMD",
    documents: "Passport or ID-card and social card",
    registration: "Yes",
    NKR: "Yes",
    amountsm: "2",
    seond: "No more than 2",
    RegisteredEmployee: "Not required",
    n: "Acceptable after approval from translator",
    LoanRate: "23-24%",
    reditWeb: "https://www.unibank.am/hy/service/consumer/099plus/\nhttps://www.unibank.am/hy/service/consumer/099/",
    BankWebAdress: "https://www.unibank.am",
    bankContract: "(37410) 59-22-59; 59 55 55",
    Note: "UNIBANK is controlled by CBA"
  },
  {
    name: "INECOBANK",
    age: "21-70",
    rate: "19-21,7%",
    commission: "0%",
    months: "3-48",
    amount: "5,000,000 AMD",
    maxamount: "30,000 AMD",
    documents: "Passport or ID-card and social card",
    registration: "Yes",
    NKR: "Yes",
    amountsm: "2",
    seond: "2 smartphones can be issued if the total amount does not exceed 300,000 AMD",
    RegisteredEmployee: "Not required",
    n: "Acceptable if written in Russian/English language",
    LoanRate: "From 20.7 to 23.94%",
    reditWeb: "www.inecobank.am",
    BankWebAdress: "www.inecobank.am",
    bankContract: "(37410) 51-05-10",
    Note: "INECOBANK is controlled by CBA"
  },
  {
    name: "VTB-Armenia Bank (online credit)",
    age: "18-70",
    rate: "0%-21.5%",
    commission: "0%-1%",
    months: "3-36",
    amount: "1,000,000 AMD",
    maxamount: "30,000 AMD",
    documents: "Passport or ID-card and social card",
    registration: "Yes",
    NKR: "Yes, if lives and works in the Republic of Armenia",
    amountsm: "2",
    seond: "One smartphone worth up to AMD 100,000 and one smartphone worth over AMD 100,001 can be purchased.",
    RegisteredEmployee: "Required",
    n: "Not acceptable",
    LoanRate: "0% - 24%",
    reditWeb: "https://www.vtb.am/am/credits/installments/installments-loan/",
    BankWebAdress: "www.vtb.am",
    bankContract: "(374 8000) 87-87, headoffice@vtb.am",
    Note: "VTB-Armenia bank is controlled by CBA"
  },
  {
    name: "AMERIABANK",
    age: "20-65",
    rate: "21.5%",
    commission: "0%",
    months: "6-36",
    amount: "1,000,000 AMD",
    maxamount: "50,000 AMD",
    documents: "Passport or ID-card and social card",
    registration: "Yes",
    NKR: "Yes, in the case of the original certificate of actual residence in the Republic of Armenia",
    amountsm: "2",
    seond: "No more than 2",
    RegisteredEmployee: "Not required",
    n: "Not acceptable",
    LoanRate: "0%-21.5%",
    reditWeb: "https://ameriabank.am/",
    BankWebAdress: "https://ameriabank.am/",
    bankContract: "(37410) 56-11-11",
    Note: "AMERIABANK  is controlled by CBA"
  },
  {
    name: "EVOCABANK",
    age: "20-65",
    rate: "21%",
    commission: "0%",
    months: "12-48",
    amount: "2,500,000 AMD",
    maxamount: "50,000 AMD",
    documents: "Passport or ID-card and social card",
    registration: "Yes",
    NKR: "Yes, in the case of the original certificate of actual residence in the Republic of Armenia",
    amountsm: "2",
    seond: "No more than 2",
    RegisteredEmployee: "Not required",
    n: "Not acceptable",
    LoanRate: "0%-21%",
    reditWeb: "https://www.evoca.am/hy/loans/online-loans/online-and-point-of-sale-loans",
    BankWebAdress: "https://www.evoca.am/",
    bankContract: "(37410) 60-55-55",
    Note: " EVOCABANK is controlled by CBA"
  }
];

const rows = [
  { title: "Age", key: "age" },
  { title: "Yearly interest rate", key: "rate" },
  { title: "Monthly clearing commission", key: "commission" },
  { title: "Length of credit (months)", key: "months" },
  { title: "Maximum amount of credit", key: "amount" },
  { title: "Minimum amount of credit", key: "maxamount" },
  { title: "Required documents", key: "documents" },
  { title: "Actual registration", key: "registration" },
  { title: "NKR registration", key: "NKR" },
  { title: "Amount of smartphones per customer", key: "amountsm" },
  { title: "Second sale to the same customer", key: "seond" },
  { title: "Registered employee", key: "RegisteredEmployee" },
  { title: "If the subscriber does not know how to write in Armenian and fills out the form by hand in another language, is there a loan?", key: "n" },
  { title: "Actual loan interest rate", key: "LoanRate" },
  { title: "credit web page", key: "reditWeb" },
  { title: "Bank website address", key: "BankWebAdress" },
  { title: "Bank contact information", key: "bankContract" },
  { title: "Note", key: "Note" },
];
  return (
    <>
    {header()}
<div className="w-[60%] ml-[10%] overflow-x-auto mt-[200px] mb-[100px]">
  <table className="min-w-max border-collapse">
  <thead>
    <tr>
      <th></th>
      {banks.map((bank) => (
        <th
          key={bank.name}
          className="bg-[#0b4a69] text-white p-5 border"
        >
          {bank.name}
        </th>
      ))}
    </tr>
  </thead>

  <tbody>
    {rows.map((row) => (
      <tr key={row.key}>
        <td className="bg-[#0b4a69] text-white font-bold border p-5 w-[250px] min-w-[200px] max-w-[200px]">
  {row.title}
</td>

        {banks.map((bank) => (
          <td key={bank.name} className="border text-center p-5">
            {bank[row.key]}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>
</div>
<Footer />
    </>
  );
}