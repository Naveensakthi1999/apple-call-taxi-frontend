import '../../assets/scss/mystyle.css';
import React, { useState, useEffect } from 'react';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import { API_BASE_URL } from '../../utils/config';
import axios from 'axios';
import PaidFromCallCenterFess from './PaidFormCallCenterFess';
import CallCenterFessCount from './CallCenterFessCount';

function PendingCallCenterFess() {
    const [length, setLength] = useState();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);
    const [paidBy, setPaidBy] = useState('');
    const [carid, setCarid] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [pendingAmount, setPendingAmount] = useState('');
    const [open, setOpen] = useState(false);
    const [date, setdate] = useState(new Date());
    const [totalPayableAmount, setTotalPayableAmount] = useState('');
    const [totalPaidAmount, setTotalPaidAmount] = useState('');
    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(1);
    };

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get(`${API_BASE_URL}/verify`)
            .then(result => {
                if (result.data.Status) {
                    setPaidBy(result.data.id);
                }
            }).catch(err => console.log(err))
    }, [])

    const fetchlength = () => {
        axios.get(`${API_BASE_URL}/callcenterfess/pendingcallcenterfess_count?search=${search}&date=${date}`)
            .then(result => {
                if (result.data.Status) {
                    setLength(result.data.Result[0].count)
                    setRowsPerPage(result.data.Result[0].count)
                }
            })
    }

    const fetchData = () => {
        axios.get(`${API_BASE_URL}/callcenterfess/pendingcallcenterfess_list?page=${page}&limit=${rowsPerPage}&search=${search}&date=${date}`)
            .then((result) => {
                if (result.data.Status) {
                    setItems(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        fetchlength();
        fetchData();
    }, [page, rowsPerPage, search, date]);

    const handlePaid = (id, payable_amount, paid_amount) => {
        setCarid(id);
        setTotalAmount(payable_amount);
        setPendingAmount(payable_amount-paid_amount);
        setOpen(true);
    }

    const handlePaymentClose = (e) => {
        setOpen(e);
    };

    useEffect(() => {

    let totalPayableAmount = 0;
    let totalPaidAmount = 0;

    items.forEach(item => {
        let payable_amount = 0;
        if (item.total_amount >= item.min_trip_amount) {
            payable_amount = Math.round(((item.total_amount - item.min_trip_amount) * item.max_service_charge) / 100) + Number(item.fixed_amount);
        } else {
            payable_amount = Math.round((item.total_amount * item.min_service_charge) / 100);
        }
        totalPayableAmount += payable_amount;
        totalPaidAmount += item.paid_amount;
    });

    setTotalPayableAmount(totalPayableAmount);
    setTotalPaidAmount(totalPaidAmount);
    }, [items]);

    return (
        <>
            {/* CARD */}
            <div className='pb-4'>
              <CallCenterFessCount 
              totalPayableAmount={totalPayableAmount} 
              totalPaidAmount={totalPaidAmount} 
              />  
            </div>

            <div className="row">
                <div className="col-6 col-sm-12 col-lg-6">
                    <div className="my-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label={'"month" and "year"'} views={['month', 'year']}
                                value={dayjs(date)}
                                onChange={(dateValue) => setdate(new Date(dateValue))}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
                    <div className="d-flex justify-content-end my-2">
                        <TextField id="filled-search" label="Search field" type="search" variant="outlined"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* POP-UP */}
            <PaidFromCallCenterFess data={open} 
            carid={carid} 
            paidBy={paidBy}
            totalAmount={totalAmount} 
            pendingAmount={pendingAmount} 
            handleClose={handlePaymentClose}
            date={date}
            />

            {/* TABLE PAGINATION */}
            <TablePagination
                rowsPerPageOptions={[40, 80, 120]}
                component="div"
                count={length}
                rowsPerPage={rowsPerPage}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* table-fixed */}
            <div className="example">
                <table className="table table-hover">
                    <thead className="fixed-header">
                        <tr>
                            <th>S.NO</th>
                            <th>Owner Name</th>
                            <th>Mobile</th>
                            <th>Car No</th>
                            <th>Car Name</th>
                            <th>Amount</th>
                            <th>Paid Amount</th>
                            <th>Pending Amount</th>
                            <th>Paid</th>
                        </tr>
                    </thead>
                    {length > 0 ? (
                        <tbody>
                            {items.map((item, i) => {
                                let payable_amount = 0;
                                if (item.total_amount >= item.min_trip_amount) {
                                    payable_amount = Math.round(((item.total_amount - item.min_trip_amount) * item.max_service_charge) / 100) + Number(item.fixed_amount);
                                } else {
                                    payable_amount = Math.round((item.total_amount * item.min_service_charge) / 100);
                                }
                                return (
                                    <tr key={item.id}>
                                        <th>{i + 1}</th>
                                        <td>{item.firstname}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.car_no}</td>
                                        <td>{item.carname}</td>
                                        <td>{payable_amount}</td>
                                        <td>{item.paid_amount}</td>
                                        <td>{payable_amount - item.paid_amount}</td>
                                        <td>
                                            <Button variant="text"
                                                onClick={() => {
                                                    handlePaid(item.car_id, payable_amount, item.paid_amount);
                                                }} >
                                                PAID
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td className='text-center' colSpan={9}>No matching records found</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </>
    );
}

export default PendingCallCenterFess;
