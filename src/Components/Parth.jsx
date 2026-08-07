import { PhoneInput } from "./PhoneInput";

export default function parth() {
    return (
        <>
        <div className="w-full grid grid-cols-1 min-[900px]:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
            <div>
                <label htmlFor="partner" className='block text-gray-500 whitespace-nowrap max-[700px]:text-[14px]'>Partner</label>
                <input id="partner" type="text" className='w-full h-[40px] rounded-[20px] border border-gray-300 px-[15px]' />
            </div>
            <div>
                <label htmlFor="legalAddress" className='block text-gray-500 whitespace-nowrap max-[700px]:text-[14px]'>Partner's legal address</label>
                <input id="legalAddress" type="text" className='w-full h-[40px] rounded-[20px] border border-gray-300 px-[15px]' />
            </div>
            <div>
                <label htmlFor="scope" className='block text-gray-500 whitespace-nowrap max-[700px]:text-[14px]'>Scope of activity</label>
                <input id="scope" type="text" className='w-full h-[40px] rounded-[20px] border border-gray-300 px-[15px]' />
            </div>
            <div>
                <label htmlFor="contactPerson" className='block text-gray-500 whitespace-nowrap max-[700px]:text-[14px]'>Contact person</label>
                <input id="contactPerson" type="text" className='w-full h-[40px] rounded-[20px] border border-gray-300 px-[15px]' />
            </div>
            <div>
                <label htmlFor="email" className='block text-gray-500 whitespace-nowrap max-[700px]:text-[14px]'>Email address</label>
                <input id="email" type="email" className='w-full h-[40px] rounded-[20px] border border-gray-300 px-[15px]' />
            </div>
            <div>
                <PhoneInput label="Contact phone number" required />
            </div>
        </div>
        <div className="mt-[80px] grid grid-cols-1 sm:grid-cols-2 w-full">
            <div>
                <label htmlFor="info" className='block text-gray-500 max-[700px]:text-[14px]'>Additional information</label>
                <textarea id="info" className='w-full h-[120px] rounded-[20px] border border-gray-300 px-[15px] py-[10px]' />
            </div>
        </div>
        <div className='mt-[60px] flex items-end'>
            <button type="submit" className='w-[100px] h-[40px] rounded-[20px] bg-red-500 text-white'>Send</button>
        </div>
        </>
    )
}