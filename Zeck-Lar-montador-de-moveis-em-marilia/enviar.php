<?php
// Configurações
$to = "zecklarofc@gmail.com"; // E-mail de destino atualizado
$subject = "Nova Candidatura - Site ZECK LAR";

// Cabeçalhos CORS para permitir requisições do front-end se estiver em domínio diferente (ajustar conforme necessário)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Coleta e sanitização dos dados
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_SPECIAL_CHARS);
    $city = filter_input(INPUT_POST, 'city', FILTER_SANITIZE_SPECIAL_CHARS);
    $experience = filter_input(INPUT_POST, 'experience', FILTER_SANITIZE_SPECIAL_CHARS);
    $plannedFurniture = filter_input(INPUT_POST, 'plannedFurniture', FILTER_SANITIZE_SPECIAL_CHARS);
    $availability = filter_input(INPUT_POST, 'availability', FILTER_SANITIZE_SPECIAL_CHARS);
    $about = filter_input(INPUT_POST, 'about', FILTER_SANITIZE_SPECIAL_CHARS);

    // Validação básica
    if (empty($name) || empty($phone) || empty($city)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Campos obrigatórios faltando."]);
        exit;
    }

    // Montagem do corpo do e-mail
    $messageBody = "Nova candidatura recebida pelo site:\n\n";
    $messageBody .= "Nome: " . $name . "\n";
    $messageBody .= "Telefone: " . $phone . "\n";
    $messageBody .= "Cidade: " . $city . "\n";
    $messageBody .= "Experiência com montagem: " . ($experience ? $experience : 'Não informado') . "\n";
    $messageBody .= "Trabalhou com planejados: " . ($plannedFurniture ? $plannedFurniture : 'Não informado') . "\n";
    $messageBody .= "Disponibilidade: " . ($availability ? $availability : 'Não informado') . "\n";
    $messageBody .= "\nSobre o candidato:\n" . ($about ? $about : 'Nada informado');

    // Headers do e-mail
    $headers = "From: no-reply@zecklar.com.br" . "\r\n" .
               "Reply-To: no-reply@zecklar.com.br" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Tenta enviar o e-mail
    // Nota: A função mail() requer um servidor SMTP configurado (Sendmail/Postfix ou similar).
    if (mail($to, $subject, $messageBody, $headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "E-mail enviado com sucesso."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Falha ao enviar e-mail."]);
    }

} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método não permitido."]);
}
?>