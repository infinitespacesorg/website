import Sidebar from './Sidebar'

export default function AccountLayout({ children}: { children: React.ReactNode}) {
    return (
        <div className='flex flex-row min-h-screen'>
            <Sidebar />
            <main className='flex-1 p-6 py-15'>
                {children}
            </main>
        </div>
    )
}