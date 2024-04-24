import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  const data = await request.formData();
  const file = data.get('file');
  const pdf = !file;
  if (pdf) return NextResponse.json({ message: 'File not found' }, { status: 400 });

  const formData = new FormData();
  formData.append('file', file);

  try {
    const pdf_template = await axios.post(process.env.BACKEND_LOCAL_URL, formData, {
      responseType: 'arraybuffer',
    });

    const response = new NextResponse(pdf_template.data, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="plantilla-factura.pdf"',
      },
    });

    return response;
  } catch (error) {
    console.error('Error al obtener el PDF:', error);
    return NextResponse.json({ message: 'Error al obtener el PDF' }, { status: 500 });
  }
}
