<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Загрузка файла</title>
</head>
<body>
    <h2>Привет Лелочка. Пожалуйста нажми на кнопку и выбери файл чтобы загрузить его на сервер.</h2>
    <form action="" method="post" enctype="multipart/form-data">
        <input type="file" name="fileToUpload" id="fileToUpload">
        <input type="submit" value="Загрузить файл" name="submit">
    </form>

    <?php
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $target_dir = __DIR__ . "/";
        $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
        $uploadOk = 1;

        // Check if file already exists
        if (file_exists($target_file)) {
            echo "Извините, файл уже существует.";
            $uploadOk = 0;
        }

        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            echo "Извините, ваш файл не был загружен.";
        } else {
            if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
                echo "Файл ". htmlspecialchars(basename($_FILES["fileToUpload"]["name"])). " был загружен.";
            } else {
                echo "Извините, произошла ошибка при загрузке вашего файла.";
            }
        }
    }
    ?>
</body>
</html>