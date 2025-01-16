<?php

header("Access-Control-Allow-Origin:* ");

header("Access-Control-Allow-Headers:* ");

header("Access-Control-Allow-Methods:* ");

$connect = new PDO("mysql:host=127.0.0.1;dbname=ujianpweb", "root", "");

$method = $_SERVER['REQUEST_METHOD']; 

if($method === 'GET')
{
		if(isset($_GET['id_produk']))
		{
			$query = "SELECT * FROM stok_barang WHERE id_produk = '".$_GET["id_produk"]."'";

			$result = $connect->query($query, PDO::FETCH_ASSOC);

			$data = array();

			foreach($result as $row)

			{
				$data['id_produk'] = $row['id_produk'];

				$data['nama_produk'] = $row['nama_produk'];

				$data['harga'] = $row['harga'];

				$data['qty'] = $row['qty'];

			}

			echo json_encode($data);

		}
		else 
		{
			//fetch all user

			$query = "SELECT * FROM stok_barang ORDER BY id_produk ASC";

			$result = $connect->query($query, PDO::FETCH_ASSOC);

			$data = array();

			foreach($result as $row)
			{
				$data[] = $row;
			}

			echo json_encode($data);
		}	
	
}

if($method === 'POST')
{
	$form_data = json_decode(file_get_contents('php://input'));

	$data = array (
		':id_produk'		=>	$form_data->id_produk,
		':nama_produk'		=>	$form_data->nama_produk,
		':harga'			=>	$form_data->harga,
		':qty'				=>	$form_data->qty
	);

	$query = "
	INSERT INTO stok_barang (id_produk, nama_produk, harga, qty) VALUES (:id_produk, :nama_produk, :harga, :qty);
	";

	$statement = $connect->prepare($query);

	$statement->execute($data);

	echo json_encode(["success" => "done"]);
}

if($method === 'PUT')
{
	$form_data = json_decode(file_get_contents('php://input'));
	
	$data = array(
		':id_produk'		=>	$form_data->id_produk,
		':nama_produk'		=>	$form_data->nama_produk,
		':harga'			=>	$form_data->harga,
		':qty'				=>	$form_data->qty,
	);

	$query = "
	UPDATE stok_barang 
    SET nama_produk = :nama_produk, 
        harga = :harga, 
        qty = :qty 
    WHERE id_produk = :id_produk
    ";

	$statement = $connect->prepare($query);

	$statement->execute($data);

	echo json_encode(["success" => "done"]);
}

if($method === 'DELETE')
{
	//Delete User Data
	
	$data = array(
		':id_produk' => $_GET['id_produk']
	);

	$query = "DELETE FROM stok_barang WHERE id_produk = :id_produk";

	$statement = $connect->prepare($query);

	$statement->execute($data);

	echo json_encode(["success" => "done"]);
}

?>

		 

