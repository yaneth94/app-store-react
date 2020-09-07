import React from 'react'
import {
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableFooter,
  TablePagination,
  TableHead,
  Button
} from '@material-ui/core'
import TablePaginationActions from './TablePaginationActions'

const useStyles2 = makeStyles({
  table: {
    minWidth: 500
  },
  button: {
    marginRight: '10px'
  }
})

export default function PaginationActionsTable (props) {
  const { columns, rows } = props
  const classes = useStyles2()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell key={column.id} align='center'>
                {column.label}
              </TableCell>
            ))}
            <TableCell key='actions2' align='center'>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map(row => (
            <TableRow key={row.id}>
              {columns.map(column => (
                <TableCell component='th' scope='row' align='center'>
                  {row[column.id]}
                </TableCell>
              ))}
              <TableCell align='center'>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.button}
                >
                  Update
                </Button>
                <Button variant='contained' color='secondary'>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}