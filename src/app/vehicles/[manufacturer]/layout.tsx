"use client"
import { Breadcrumbs } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function VehiclesLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const path = usePathname()

  const pathItems = path.split("/").slice(1, ).map((p, i, arr) =>{
    return(
      <Link key={p} href={`/${arr.slice(0, i+1).join('/')}`}>{p}</Link>
    )
  })

  return(
    <>
    <Breadcrumbs separator=">" aria-label="breadcrumb">
      {pathItems}
    </Breadcrumbs>
    {children}
    </>
  )
}