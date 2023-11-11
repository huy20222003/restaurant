import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//@mui
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
//component
import DataTable from '../../../Components/Admin/DataTable';
//context
import { useReservation } from '../../../hooks/context';
import { Menu, MenuItem, Popover } from '@mui/material';
//util
import { fDateTime } from '../../../utils/formatTime';
//----------------------------------------

const Reservation = () => {
  const {
    reservationState: { reservations },
    handleGetAllReservations,
  } = useReservation();
  useEffect(() => {
    handleGetAllReservations();
  }, [handleGetAllReservations]);

  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'ID', type: 'String', width: 90 },
    { field: 'fullName', headerName: 'FullName', type: 'String', width: 160 },
    {
      field: 'tableId',
      headerName: 'Table Name',
      type: 'String',
      width: 160,
    },
    {
      field: 'reservationDate',
      headerName: 'Date',
      type: 'Date',
      width: 160,
    },
    { field: 'note', headerName: 'Note', type: 'String', width: 200 },
    {
      field: 'createdAt',
      headerName: 'Create Date',
      type: 'String',
      width: 200,
    },
    {
      field: 'updatedAt',
      headerName: 'Update Date',
      type: 'String',
      width: 200,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 90,
      renderCell: ActionsCell,
    },
  ];
  const rows = reservations.map((reservation) => {
    return {
      id: reservation?._id,
      fullName: reservation?.fullName,
      tableId: reservation?.tableId,
      reservationDate: fDateTime(reservation?.reservationDate),
      note: reservation?.note,
      createdAt: fDateTime(reservation?.createdAt),
      updatedAt: fDateTime(reservation?.updatedAt),
    };
  });
  function ActionsCell(params) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <IconButton
          onClick={handleClick}
          aria-label="More"
          aria-controls="menu-actions"
          aria-haspopup="true"
        >
          <MoreVertIcon />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{ style: { boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' } }}
        >
          <Menu
            id="menu-actions"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleView(params.row.id)}>
              <VisibilityIcon sx={{ paddingRight: '0.5rem' }} />
              View
            </MenuItem>
            <MenuItem onClick={() => handleEdit(params.row.id)}>
              <EditIcon sx={{ paddingRight: '0.5rem' }} />
              Edit
            </MenuItem>
            <MenuItem onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon sx={{ paddingRight: '0.5rem' }} />
              Delete
            </MenuItem>
          </Menu>
        </Popover>
      </div>
    );
  }
  const handleView = (reservationId) => {
    console.log(`View reservation with ID: ${reservationId}`);
  };

  const handleEdit = (reservationId) => {
    navigate(`/admin/reservation-manage/edit/${reservationId}`);
  };

  const handleDelete = async (reservationId) => {
    // Swal.fire({
    //   title: 'Delete this product?',
    //   text: 'Would you like to delete this product?',
    //   icon: 'question',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes, of course!',
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    //     try {
    //       const response = await handleDeleteProduct(productId);
    //       if (response.success) {
    //         Swal.fire('', 'Delete Successful!', 'success');
    //       } else {
    //         Swal.fire('', 'Delete failed!', 'error');
    //       }
    //     } catch (error) {
    //       Swal.fire('', 'Server error!', 'error');
    //     }
    //   }
    // });
    console.log(reservationId);
  };
  return <DataTable columns={columns} rows={rows} />;
};

export default Reservation;
