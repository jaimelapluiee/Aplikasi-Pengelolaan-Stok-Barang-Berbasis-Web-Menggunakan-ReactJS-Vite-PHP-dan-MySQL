import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

function Baranglist(){
    const [barang, setBarang] = useState([]);

    useEffect(() => {
        const apiUrl = 'http://localhost/pweb/aplikasiujianpweb/api/action.php';

        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            setBarang(data);
        });

    }, []);

    const handleDelete = (id_produk) => {
        if(confirm("Are you sure you want to remove it?")) {
            fetch(`http://localhost/pweb/aplikasiujianpweb/api/action.php?id_produk=${id_produk}`, {
                method: 'DELETE'
            })
            .then((response) => response.json())
            .then((data) => {
                setBarang((prevBarang) => prevBarang.filter((barang) => barang.id_produk !== id_produk));
            });
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-md-6"><b>Stok Barang</b></div>
                    <div className="col-md-6">
                        <Link to="/add" className="btn btn-success btn-sm float-end">Tambah</Link>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID Produk</th>
                            <th>Nama Produk</th>
                            <th>Harga Produk</th>
                            <th>QTY</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                    {barang.map((stok, index) => (
                            <tr key={index}>
                                <td>{stok.id_produk}</td>
                                <td>{stok.nama_produk}</td>
                                <td>{stok.harga}</td>
                                <td>{stok.qty}</td>
                                <td>
                                    <Link to={`/edit/${stok.id_produk}`} className="btn btn-warning btn-sm">Edit</Link>
                                    <button type="button" onClick={() => handleDelete(stok.id_produk)} className="btn btn-danger btn-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Baranglist;
