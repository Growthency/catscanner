'use client'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import PageEditor from '@/components/admin/PageEditor'

function EditInner() {
  const params = useSearchParams()
  const id = params.get('id') || undefined
  return <PageEditor postId={id} />
}

export default function EditPage() {
  return (
    <Suspense fallback={null}>
      <EditInner />
    </Suspense>
  )
}
