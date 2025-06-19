import ClassDynamicPage from "@/components/teacherPortal/ClassDynamicPage";



export default async function ClassDetailPage({ params }: { params: Promise<{ classId: string }> }) {
    const { classId } = await params
    return (

        <ClassDynamicPage classId={classId} />
    )
}
