// // client component
// 'use client'
//
// import React from "react";
//
// import {
//     ColumnDef,
//     flexRender,
//     getCoreRowModel,
//     useReactTable,
// } from "@tanstack/react-table"
//
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
//
//
// interface DataTableProps<TData, TValue> {
//     columns: ColumnDef<TData, TValue>[]
//     data: TData[]
// }
//
// export default function ItemDataTable<TData, TValue>({columns, data}:DataTableProps<TData, TValue>){
//     const table = useReactTable({
//         data,
//         columns,
//         getCoreRowModel: getCoreRowModel() // like a configuration
//     })
// };