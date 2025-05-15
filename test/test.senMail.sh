#!/bin/bash

for i in {1..100}
do
  curl http://localhost:4000/email/send \
    --request POST \
    --header 'x-key-emitto: 0b9a3484ba37a24e68ed31d40f0c8f1fca8fa253b9a5dd2793eee16e3a64b316' \
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
