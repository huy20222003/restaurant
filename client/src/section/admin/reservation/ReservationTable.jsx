import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
//@mui
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
//component
import DataTable from '../../../Components/Admin/DataTable';
//context
import { useTable, useCommon } from '../../../hooks/context';
import { Menu, MenuItem, Popover } from '@mui/material';
//util
import { fDateTime } from '../../../utils/formatTime';
//Swal
import Swal from 'sweetalert2';
//----------------------------------------

const ReservationTable = ({ isEdit, setIsEdit, formik }) => {
  const {
    tableState: { tables },
    handleGetAllTables,
    handleGetOneTable,
    handleDeleteTable
  } = useTable();

  useEffect(() => {
    handleGetAllTables();
  }, [handleGetAllTables]);

  const { setOpenFormDialog } = useCommon();

  const columns = [
    { field: 'id', headerName: 'ID', type: 'String', width: 90 },
    { field: 'name', headerName: 'Name', type: 'String', width: 160 },
    {
      field: 'description',
      headerName: 'Description',
      type: 'String',
      width: 200,
    },
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
  const rows = tables.map((table) => {
    return {
      id: table?._id,
      name: table?.name,
      description: table?.description,
      createdAt: fDateTime(table?.createdAt),
      updatedAt: fDateTime(table?.updatedAt),
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

  const handleEdit = useCallback(
    async (tableId) => {
      const response = await handleGetOneTable(tableId);
      if (response.success) {
        formik.setValues(response.table);
      }
      setIsEdit(true);
    },
    [formik, handleGetOneTable, setIsEdit]
  );

  useEffect(() => {
    if (isEdit) {
      setOpenFormDialog(true);
    }
  }, [isEdit, setOpenFormDialog]);

  const handleDelete = async (tableId) => {
    Swal.fire({
      title: 'Delete this table?',
      text: 'Would you like to delete this table?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, of course!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await handleDeleteTable(tableId);
          if (response.success) {
            Swal.fire('', 'Delete Successful!', 'success');
          } else {
            Swal.fire('', 'Delete failed!', 'error');
          }
        } catch (error) {
          Swal.fire('', 'Server error!', 'error');
        }
      }
    });
  };
  return <DataTable columns={columns} rows={rows} />;
};

ReservationTable.propTypes = {
    isEdit: PropTypes.bool, 
    setIsEdit: PropTypes.func.isRequired, 
    formik: PropTypes.object.isRequired, 
  };

export default ReservationTable;
