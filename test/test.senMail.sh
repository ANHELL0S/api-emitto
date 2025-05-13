#!/bin/bash

for i in {1..20}
do
  curl http://206.189.205.144:4000/email/send \
    --request POST \
    --header 'x-key-emitto: 0bcb25e9ebcf5b8469cf01d820eadc1c7ec1743cc1e2610dfc7393375c8eccd2' \
    --header 'Content-Type: application/json' \
    --data '{
      "from": "aangelogarcia2021@gmail.com",
      "subjectEmail": "Asunto del correo",
      "sendTo": [
        "aangelogarcia2021@gmail.com",
        "angelogarcia@mailes.ueb.edu.ec"
      ],
      "message": "<p>Contenido HTML del correo</p>",
      "attachments": [
        {
          "filename": "example.pdf",
          "path": "https://pdfobject.com/pdf/sample.pdf"
        }
      ]
    }' &
done

wait
