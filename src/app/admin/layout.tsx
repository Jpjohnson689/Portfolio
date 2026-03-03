import { Sidebar } from '@/components/admin/Sidebar'
import { MobileNav } from '@/components/admin/MobileNav'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <MobileNav />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
