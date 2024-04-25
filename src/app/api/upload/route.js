import { NextResponse } from 'next/server';
import axios from 'axios';

export function POST(request) {
  return new Promise((resolve, reject) => {
    request.formData().then(async (data) => {
      const file = data.get('file');
      const pdf = !file;
      if (pdf) {
        resolve(NextResponse.json({ message: 'File not found' }, { status: 400 }));
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
        const pdf_template = await axios.post(process.env.BACKEND_URL, formData, {
          responseType: 'arraybuffer',
        });

        const response = new NextResponse(pdf_template.data, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="plantilla-factura.pdf"',
          },
        });

        resolve(response);
      } catch (error) {
        console.error('Error al obtener el PDF:', error);
        resolve(NextResponse.json({ message: 'Error al obtener el PDF' }, { status: 500 }));
      }
    });
  });
}
