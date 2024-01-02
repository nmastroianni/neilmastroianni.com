'use client'
import { FC } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

interface PaginationProps {
  hasNextPage: boolean
  hasPrevPage: boolean
  totalPages: number
}

const Pagination: FC<PaginationProps> = ({
  hasNextPage,
  hasPrevPage,
  totalPages,
}) => {
  const router = useRouter()
  const path = usePathname()
  const searchParams = useSearchParams()
  const pageNumber = searchParams.get('page') || '1'
  return (
    <>
      <div className="my-4 flex justify-center gap-2">
        <Button
          variant="ghost"
          disabled={!hasPrevPage}
          onClick={() => {
            router.push(`${path}?page=${Number(pageNumber) - 1}`)
          }}
        >
          prev page
        </Button>

        <Button
          variant="ghost"
          disabled={!hasNextPage}
          onClick={() => {
            router.push(`${path}?page=${Number(pageNumber) + 1}`)
          }}
        >
          next page
        </Button>
      </div>
      {totalPages && (
        <div className="my-6 flex justify-center ">
          Page {pageNumber} of {totalPages}
        </div>
      )}
    </>
  )
}
export default Pagination
