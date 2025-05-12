import Sidebar from './Sidebar'

export default function AccountLayout({ children}: { children: React.ReactNode}) {
    return (
        <div className='flex flex-col md:flex-row items-center justify-start min-h-[60vh] md:min-h-[85vh]'>
            <Sidebar />
            <div className='flex-1 p-3 md:p-6 md:py-15'>
                {children}
            </div>
        </div>
    )
}