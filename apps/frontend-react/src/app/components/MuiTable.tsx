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
export type TableRenderObjectsConfig<T> = {
  [Property in keyof T]?: (obj: any) => React.ReactNode;
};

interface TableProps<T> {
  tableHead: TableHeadConfig<T>;
  tableRows: T[];
  renderObjectsConfig?: TableRenderObjectsConfig<T>;
  onRowClick?: (row: T) => void;
}

export const MuiTable = <T extends BaseEntity>({
  tableHead,
  tableRows,
  renderObjectsConfig,
  onRowClick,
}: PropsWithChildren<TableProps<T>>) => {
  const renderRowCell = (key: keyof T, row: T) => {
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
    <TableRow
      hover
      key={row.id}
      onClick={() => onRowClick?.(row)}
      sx={{ cursor: 'pointer' }}
    >
      {tableHead.map((head) => (
        <TableCell key={String(head.key)}>
          {renderRowCell(head.key, row)}
        </TableCell>
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
