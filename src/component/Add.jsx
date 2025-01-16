import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Add(){

	let navigate = useNavigate();


	const [barang, setBarang] = useState({
		id_produk : '',
		nama_produk : '',
		harga : '',
        qty : ''
	});

	const handleChange = (event) => {
		const { name, value } = event.target;

		setBarang({
			...barang,
			[name] : value
		});
	};

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost/pweb/aplikasiujianpweb/api/action.php', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(barang)
        })
        .then((response) => response.json())
        .then((data) => {
            navigate("/");
        })
    };

	return (
		<div className="card">
			<div className="card-header">
				<div className="row">
					<div className="col-md-6">Tambah Stok</div>
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
								<input type="text" name="id_produk" className="form-control" onChange={handleChange} />
							</div>
							<div className="mb-3">
								<label>Nama Produk</label>
								<input type="text" name="nama_produk" className="form-control" onChange={handleChange} />
							</div>
							<div className="mb-3">
								<label>Harga</label>
								<input type="text" name="harga" className="form-control" onChange={handleChange} />
							</div>
                            <div className="mb-3">
								<label>QTY</label>
								<input type="text" name="qty" className="form-control" onChange={handleChange} />
							</div>
							<div className="mb-3">
								<input type="submit" className="btn btn-primary" value="Tambah Stok" />
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Add;