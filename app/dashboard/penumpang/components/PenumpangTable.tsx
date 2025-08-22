"use client";
import { memo } from 'react';
import { Penumpang } from "@/types/penumpang";
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';

const TableRow = memo(({ item, index, currentPage, itemsPerPage, isSelected, onSelect, onEdit, onDelete, onView }: {
    item: Penumpang;
    index: number;
    currentPage: number;
    itemsPerPage: number;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onEdit: (item: Penumpang) => void;
    onDelete: (id: string) => void;
    onView: (item: Penumpang) => void;
}) => (
    <tr
        className={`border-b border-gray-200 dark:border-gray-700 cursor-pointer transition-colors ${isSelected
            ? 'bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-900'
            : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
        onClick={() => onSelect(item.id)}
    >
        <td className="px-6 py-4 whitespace-nowrap text-center" onClick={(e) => e.stopPropagation()}>
            <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelect(item.id)}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-400">{(currentPage - 1) * itemsPerPage + index + 1}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{item.nama}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.usia}</td>
        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-400">{item.jenisKelamin}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.tujuan}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(item.tanggal).toLocaleDateString('id-ID')}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.nopol}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.jenisKendaraan}</td>
        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-400">{item.golongan}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.kapal}</td>
        <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center space-x-1" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => onEdit(item)} className="text-blue-600 hover:text-blue-800 p-2 bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-400 rounded transition-colors">
                <IconEdit className="w-4 h-4" />
            </button>
            <button onClick={() => onDelete(item.id)} className="text-red-600 hover:text-red-800 p-2 bg-red-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-400 rounded transition-colors">
                <IconTrash className="w-4 h-4" />
            </button>
            <button onClick={() => onView(item)} className="text-green-600 hover:text-green-800 p-2 bg-green-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-green-400 rounded transition-colors">
                <IconEye className="w-4 h-4" />
            </button>
        </td>
    </tr>
));
TableRow.displayName = 'TableRow';

export const PenumpangTable = memo(({
    paginatedData,
    isLoading,
    selectedRows,
    allChecked,
    currentPage,
    itemsPerPage,
    onSelectAll,
    onSelectRow,
    onEdit,
    onDelete,
    onView,
    searchTerm,
    filterStartDate,
    filterEndDate,
    onResetFilters
}: {
    paginatedData: Penumpang[];
    isLoading: boolean;
    selectedRows: Set<string>;
    allChecked: boolean;
    currentPage: number;
    itemsPerPage: number;
    onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectRow: (id: string) => void;
    onEdit: (item: Penumpang) => void;
    onDelete: (id: string) => void;
    onView: (item: Penumpang) => void;
    searchTerm: string;
    filterStartDate: string;
    filterEndDate: string;
    onResetFilters: () => void;
}) => (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
                <tr className="text-center">
                    <th scope="col" className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                        <input
                            type="checkbox"
                            onChange={onSelectAll}
                            checked={allChecked}
                            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">No</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">Nama</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">Usia</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">Jenis Kelamin</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">Tujuan</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">Tanggal</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">No. Pol</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">Jenis Kendaraan</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">Golongan</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">Kapal</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">Aksi</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {isLoading ? (
                    <tr>
                        <td colSpan={12} className="text-center py-10">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                            <p className="mt-4 text-gray-500 dark:text-gray-400">Memuat data...</p>
                        </td>
                    </tr>
                ) : paginatedData.length > 0 ? (
                    paginatedData.map((item, index) => (
                        <TableRow
                            key={item.id}
                            item={item}
                            index={index}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            isSelected={selectedRows.has(item.id)}
                            onSelect={onSelectRow}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onView={onView}
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan={12} className="text-center py-10 text-gray-500 dark:text-gray-400">
                            {(searchTerm || filterStartDate || filterEndDate) ? (
                                <div>
                                    <p>Data tidak ditemukan.</p>
                                    <button
                                        onClick={onResetFilters}
                                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Reset Filter
                                    </button>
                                </div>
                            ) : (
                                'Tidak ada data penumpang.'
                            )}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
));
PenumpangTable.displayName = 'PenumpangTable';
