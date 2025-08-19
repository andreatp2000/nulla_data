import { prisma } from '@/lib/prisma'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { FindingsTable } from '@/components/cases/FindingsTable'
import { AppLayout } from '@/components/layout/AppLayout'

export default async function CasePage({ params }: { params: { id: string } }) {
  const caseId = params.id
  const findings = await prisma.scanFinding.findMany({
    where: { caseId },
  })
  return (
    <AppLayout>
      <div className="p-6">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="findings">Findings</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="targets">Targets</TabsTrigger>
            <TabsTrigger value="audit">Audit</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">Caso {caseId}</TabsContent>
          <TabsContent value="findings">
            <FindingsTable caseId={caseId} findings={findings} />
          </TabsContent>
          <TabsContent value="requests">-</TabsContent>
          <TabsContent value="targets">-</TabsContent>
          <TabsContent value="audit">-</TabsContent>
          <TabsContent value="reports">-</TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
