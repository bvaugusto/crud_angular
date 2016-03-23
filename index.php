<?php

require_once __DIR__.'/vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app = new Silex\Application();
$app['debug'] = true;

// ini_set('memory_limit', '256M');
ini_set('memory_limit', '-1');

$app['db'] = function() {
    // return new \PDO('mysql:host=localhost;dbname=angular','root','root');
    // return new \PDO('mysql:host=localhost;dbname=angular','root','');

    $dsn 		= 'mysql:dbname=angular;host=localhost';
	$user 		= 'root';
	$password 	= '';

	try {
		$dbh = new PDO($dsn, $user, $password);
		return $dbh;
	} catch (PDOException $e) {
		echo 'Connection failed: ' . $e->getMessage();
	}

};

$app->get('/', function() use ($app) {
    return new Response(file_get_contents('pessoas/templates/template.html'), 200);
});

$app->get('/pessoas', function() use ($app){
	$stmt = $app['db']->query("SELECT * FROM pessoas limit 100");
	$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
	return $app->json($result);
});

$app->post('/pessoas', function(Request $request) use ($app){
	$data = $request->getContent();
	parse_str($data, $out);

	$stmt = $app['db']->prepare("INSERT INTO `pessoas` (`nome`,`email`,`cidade`) VALUES (:nome,:email,:cidade)");
	$stmt->bindParam('nome', $out['nome']);
	$stmt->bindParam('email', $out['email']);
	$stmt->bindParam('cidade', $out['cidade']);
	$stmt->execute();

	return $app->json(array('success' => true));
});

$app->get('/pessoas/{id}', function($id) use ($app) {

	$stmt = $app['db']->prepare("Select * from pessoas where id=:id");
    $stmt->bindParam('id',$id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    return $app->json($result);

});

$app->put('/pessoas/{id}', function(Request $request, $id) use ($app) {

    $data = $request->getContent();
    parse_str($data, $out);

    $stmt = $app['db']->prepare("update pessoas set nome=:nome, email=:email, cidade=:cidade where id=:id");
    $stmt->bindParam('id',$id);
    $stmt->bindParam('nome', $out['nome']);
    $stmt->bindParam('email', $out['email']);
    $stmt->bindParam('cidade', $out['cidade']);
    $stmt->execute();

    return $app->json(array('success'=>true));
});

$app->delete('/pessoas/{id}', function($id) use ($app) {

    $stmt = $app['db']->prepare("delete from pessoas where id=:id");
    $stmt->bindParam('id',$id);
    $stmt->execute();

    return $app->json(array('success'=>true));

});

$app->run();





