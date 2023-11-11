import PropTypes from 'prop-types';
import styled from '@emotion/styled';
//@mui
import { TableRow, TableCell, Box, Typography } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
//util
import { fDateTime } from '../../../../utils/formatTime';
//--------------------------------------------

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

const TableListItem = ({ reservation, tables }) => {
  const tableName = tables.find((item) => item?._id == reservation?.tableId);

  return (
    <TableRow hover>
      <LightTooltip title={reservation?._id} placement="top">
        <TableCell>
          <Typography variant="body2">
            {reservation?._id.substring(0, 15)}
            {'...'}
          </Typography>
        </TableCell>
      </LightTooltip>
      <LightTooltip title={reservation?.fullName} placement="top">
        <TableCell>
          <Typography variant="body2">{reservation?.fullName}</Typography>
        </TableCell>
      </LightTooltip>
      <LightTooltip title={tableName?.name} placement="top">
        <TableCell>
          <Typography variant="body2">{tableName?.name}</Typography>
        </TableCell>
      </LightTooltip>
      <LightTooltip title={fDateTime(reservation?.reservationDate)} placement="top">
        <TableCell>
          <Typography variant="body2">
            {fDateTime(reservation?.reservationDate)}
          </Typography>
        </TableCell>
      </LightTooltip>
      <LightTooltip title={reservation?.status} placement="top">
        <TableCell>
          <Box
            sx={{
              textTransform: 'capitalize',
              color: reservation?.status === 'ordered' ? '#2065D1' : '#FF4842',
            }}
          >
            <Typography variant="body2">{reservation?.status}</Typography>
          </Box>
        </TableCell>
      </LightTooltip>
      <LightTooltip title={reservation?.type} placement="top">
        <TableCell>
          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
            {reservation?.type}
          </Typography>
        </TableCell>
      </LightTooltip>
      <LightTooltip title={reservation?.note.substring(0, 30)} placement="top">
        <TableCell>
          <Typography variant="body2">
            {reservation?.note.substring(0, 30)}
            {'...'}
          </Typography>
        </TableCell>
      </LightTooltip>
    </TableRow>
  );
};

TableListItem.propTypes = {
  reservation: PropTypes.object,
  tables: PropTypes.object,
};

export default TableListItem;
