'use client'
import { useParams } from 'next/navigation'
import PageEditor from '@/components/admin/PageEditor'

export default function EditPage() {
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id
  return <PageEditor postId={id} />
}
