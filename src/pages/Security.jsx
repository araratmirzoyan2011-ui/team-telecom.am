import { header } from "../Components/header";
import Footer from "../Components/footer";
import { Select } from "../Components/m2";
import { text112 } from "../Components/inf";
const sectionsData = [
  {
    glname: " Mobile Communication",
    name: "Calls from International Numbers",
    name2: "Calls to Short Numbers",
    name3: "Participation in Lotteries",
    files: [`Please be careful with calls to unknown numbers, particularly those with a different country code. If there is an unknown international number in your list of missed calls, please do not rush to call back to it. Potentially, that could be a scamming attempt to withdraw funds from your account.`],
    files2: [`Please be careful with calls to short numbers: those are mainly paid calls. We recommend checking out in advance the cost of the call, as well as cost for services and participation in promotions or lotteries held through short numbers.`],
    files3: [`Please explain to your family, especially to the elder or younger members of it, that participation in games with rules involving calls to win money might imply paid calls.`],
    },

   {
    glname: "Internet Security",
    name: "Suspicious links",
    name2: "Strong Password",
    name3: "Registration of a Phone Number",
    name4:"Instructions from Strangers",
    name5:"Calls for Aid",
    files: [`Please be careful clicking on links received through messages in social networks or found on unreliable sites. Some websites may contain viruses with potential harm to your device or they might even subsequently incur loss of your private data and embezzlement of funds from your account.`],
    files2: [`While registering in social networks or websites delivering various services, please choose complex passwords, update them from time to time and never give them to anyone else. Please note: the employees of a mobile operator, bank or any other services would not ever ask for your password.`],
    files3: [`Please, be careful registering your telephone number on different websites, offering information or services. Potentially, those services may not be free, and your account might be subsequently charged for those services.`],
    files4:[`Do not rush to follow instructions received from a stranger by phone or through text messages. In some reported cases subscribers received text messages “from the Police” after visiting a website, where they were requested to transfer funds to the account mentioned. Keep alert! Such cases are events of fraud. Please, keep in mind that all official payments should be made only in a clearly set procedure.`],
    files5:[`Social networks frequently flash with calls for transfer of funds for charity causes. The subscribers of landline network often get calls with a request to buy magazines, the income from which shall be directed at supporting orphans or people with disabilities. Please be careful to choose reliable organizations or to contact the target beneficiaries directly to make sure that your funds really served a good cause.`],
    },
  {
    glname: "Security for Children",
    name: "Security for Children",
    files: [text112()],
  },
];

export default function Security() {
  return (
    <>
      {header()}
      <Select sectionsData={sectionsData} title="Security" />
      <Footer />
    </>
  );
}