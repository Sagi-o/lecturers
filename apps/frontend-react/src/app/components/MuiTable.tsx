import { BaseEntity } from '@lecturers/shared-models';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import React, { PropsWithChildren } from 'react';

export type TableHeadConfig<T> = { key: keyof T; label: string }[];

interface TableProps<T> {
  tableHead: TableHeadConfig<T>;
  tableRows: T[];
  renderObjectsConfig?: {
    [Property in keyof T]?: (obj: any) => React.ReactNode;
  };
  onRowClick?: (row: T) => void;
}

export const MuiTable = <T extends BaseEntity>({
  tableHead,
  tableRows,
  renderObjectsConfig,
  onRowClick,
}: PropsWithChildren<TableProps<T>>) => {

  const renderRow = (key: keyof T, row: T) => {
    if (renderObjectsConfig?.[key]) {
      return renderObjectsConfig[key]?.(row[key]);
    }
    return <span>{(row as any)[key]}</span>;
  };

  const headContent = (
    <TableRow>
      {tableHead.map((item) => (
        <TableCell key={String(item.key)} sx={{ fontWeight: 'bold' }}>
          {item.label}
        </TableCell>
      ))}
    </TableRow>
  );

  const bodyContent = tableRows.map((row) => (
    <TableRow key={row.id} onClick={() => onRowClick?.(row)} hover={true}>
      {tableHead.map((head) => (
        <TableCell key={String(head.key)}>{renderRow(head.key, row)}</TableCell>
      ))}
    </TableRow>
  ));

  return (
    <TableContainer>
      <Table>
        <TableHead>{headContent}</TableHead>
        <TableBody>{bodyContent}</TableBody>
      </Table>
    </TableContainer>
  );
};
