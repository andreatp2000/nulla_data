import { prisma } from '../../../lib/prisma'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../../../components/ui/tabs'
import { FindingsTable } from '../../../components/cases/FindingsTable'

export default async function CasePage({ params }: { params: { id: string } }) {
  const caseId = params.id
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const findings = await (prisma as any).scanFinding.findMany({
    where: { caseId },
  })
  return (
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
  )
}
