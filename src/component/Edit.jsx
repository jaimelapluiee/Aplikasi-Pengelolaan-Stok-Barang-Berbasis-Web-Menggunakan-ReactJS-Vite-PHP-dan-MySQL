import React , {useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Edit(){
    const {barang_id} = useParams();
    const navigate = useNavigate();
    const [barang, setBarang] = useState({
        id_produk: '',
        nama_produk: '',
        harga: '',
        qty: ''
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setBarang({
            ...barang, 
            [name]: value
        });
    };

    const fetchBarangData = () => {
        fetch(`http://localhost/pweb/aplikasiujianpweb/api/action.php?id_produk=${barang_id}`)
        .then((response) => response.json())
        .then((data) => {
            setBarang(data);
        });
    };

    useEffect(() => {
        fetchBarangData();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost/pweb/aplikasiujianpweb/api/action.php?id_produk=${barang_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(barang)
        })
        .then((response) => response.json())
        .then((data) => {
            navigate("/");
        });
    };

    return (
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-md-6">Edit Stok</div>
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-success btn-sm float-end">Lihat Stok</Link>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-4">&nbsp;</div>
                    <div className="col-md-4">
                        <form method="POST" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>ID Produk</label>
                                <input type="text" name="id_produk" className="form-control" value={barang.id_produk} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label>Nama Produk</label>
                                <input type="text" name="nama_produk" className="form-control" value={barang.nama_produk} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label>Harga</label>
                                <input type="text" name="harga" className="form-control" value={barang.harga} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label>QTY</label>
                                <input type="text" name="qty" className="form-control" value={barang.qty} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <input type="submit" className="btn btn-primary" value="Edit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
    
export default Edit;
