#!/bin/bash

for i in {1..100}
do
  curl https://api-emitto.softecsa.com/email/send \
    --request POST \
    --header 'x-key-emitto: 13a5e720b7df3a3164314e879e1e8a6a3c9c74789eb81d948c36b94937bc63b6' \
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
