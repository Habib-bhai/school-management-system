import StudentDetailsDynamicPage from "@/components/teacherPortal/StudentDetailsDynamicPage";

export default async function StudentDetailPage({
    params,
}: {
    params: Promise<{ classId: string; studentId: string }>
}) {
    const { classId, studentId } = await params
    return (
        <StudentDetailsDynamicPage classId={classId} studentId={studentId}/>
    )
}


