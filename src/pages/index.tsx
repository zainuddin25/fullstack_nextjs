import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token == null) {
      router.push('/auth/login')
    }
  }, [router])

  return (
    <div>

    </div>
  )
}
