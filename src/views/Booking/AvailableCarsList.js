import * as React from 'react';
import '../../assets/scss/mystyle.css';
import { useState , useEffect} from 'react';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import { API_BASE_URL } from '../../utils/config';
import axios from 'axios';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import UpcomingTrip from 'views/dashboard/Default/UpcomingTrip';

// ===============================|| Running Cars ||=============================== //

function AvailableCarsList() {
    const [length, setLength] = useState();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);
    const [openHistory, setOpenHistory] = useState(false);
    const [history, setHistory] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(1);
    };

    axios.defaults.withCredentials = true;

    const fetchlength = () => {
        axios.get(`${API_BASE_URL}/availablecars/availablecars_count?search=${search}`)
            .then(result => {
                if (result.data.Status) {
                    setLength(result.data.Result[0].count)
                }
            })
    }

    const fetchData = () => {
        axios.get(`${API_BASE_URL}/availablecars/availablecars_list?page=${page}&limit=${rowsPerPage}&search=${search}`)
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
    }, [page, rowsPerPage, search]);

    const handleHistory = (id) => {
    setHistory(id);
    setOpenHistory(true);
    }

    const handleHistoryClose = (e) => {
        setOpenHistory(e);
    };

    return (
        <>
            
            {/* POP-UP */}
           <UpcomingTrip data={openHistory} id={history} handleClose={handleHistoryClose}  />

            {/* TABLE SEARCH */}
            <div className="d-flex justify-content-end my-2">
                <TextField id="filled-search" label="Search field" type="search" variant="outlined"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* TABLE PAGINATION */}
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={length}
                rowsPerPage={rowsPerPage}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* TABLE DATA */}
            <div className=" example">
                <table className="table table-hover">
                    <thead className="fixed-header ">
                        <tr>
                            <th>S.NO</th>
                            <th>Car Name - Seats</th>
                            <th>Car Img</th>
                            <th>Car No</th>
                            <th>Amt</th>
                            <th>Driver</th>
                            <th>Location</th>
                            <th>Location Point</th>
                            <th>Owner</th>
                        </tr>
                    </thead>
                    { length>0 ?
                    <tbody>
                    {items.map((item, i) => (
                        <tr
                            key={item.id}
                            style={
                            item.upcoming_trip > 0
                                ? { backgroundColor: '#00c853', color: 'white' }
                                : {}
                            }
                            onClick={() => {
                            if (item.upcoming_trip > 0) {
                                handleHistory(item.id);
                            }
                            }}
                        >
                            <th>{i + 1}</th>
                            <td>{item.car_model_name} - {item.available_seats} - {item.ac_or_non_ac}</td>
                            <td>
                                <Zoom>
                                <img
                                src={`${API_BASE_URL}/Images/` + item.car_image}
                                alt="addharfrontpic"
                                style={{ width: '100px', height: 'auto' }}
                                role="presentation"
                                />
                                </Zoom>
                            </td>
                            <td>{item.car_no}</td>
                            <td>Rs.{item.total_amount_this_month}</td>
                            <td>{item.firstname}</td>
                            <td>{item.location}</td>
                            <td>{item.current_location}</td>
                            <td>{item.owner_name}</td>
                        </tr>
                    ))}
                    </tbody>
                    : <tbody><td className='text-center' colSpan={12}>No matching records found</td></tbody>}
                </table>
            </div>

        </>
    );
}

export default AvailableCarsList;
