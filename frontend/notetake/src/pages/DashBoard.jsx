import {PlusCircleIcon} from "lucide-react";


const Dashboard = () => {
    return (
        <div className="w-screen h-full flex items-center justify-center px-8 py-4">
            <div className="w-full h-10/12 rounded-lg shadow-sm flex items-center justify-center flex-col gap-4">
                <button className="absolute top-30 right-10 flex gap-2 items-center justify-center bg-blue-500 font-semibold hover:bg-blue-600 px-2 py-2 rounded-lg text-white">
                    <PlusCircleIcon size={20}/>
                    <span>Create Note</span>
                </button>
            </div>
        </div>
    )
}

export default Dashboard;