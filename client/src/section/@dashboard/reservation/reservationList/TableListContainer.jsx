import PropTypes from 'prop-types';
//@mui
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';
//component
import TableListItem from './TableListItem';
//--------------------------------------------------------

const TableListContainer = ({ reservations, tables }) => {
  return (
    <TableContainer
      sx={{
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ccc',
          borderRadius: '4px',
        },
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>FullName</TableCell>
            <TableCell>Table</TableCell>
            <TableCell>Reservation Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Note</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((reservation) => (
            <TableListItem
              key={reservation?._id}
              reservation={reservation}
              tables={tables}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableListContainer.propTypes = {
  reservations: PropTypes.array,
  tables: PropTypes.array,
};

export default TableListContainer;
