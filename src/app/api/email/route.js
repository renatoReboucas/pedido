import 'dotenv/config'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    const data = await request.json()
    // console.log(data.resposta)
    // console.log(data.msg)
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.SENHA,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL, // Envie para você mesmo
      subject: 'RESPOSTA PEDIDO NAMORO',
      text: `resposta foi sim para seu pedido \n\n\n MENSAGEM: ${data.msg}`,
    })

    return NextResponse.json(true)
  } catch (err) {
    console.error('DEU RUIM! ', err)
    // return NextResponse.json(err)
    return NextResponse({
      status: 500,
      body: err,
    })
  }
}
