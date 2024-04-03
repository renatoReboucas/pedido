'use client'
import React, { useEffect, useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import Confetti from 'react-confetti'
import Image from 'next/image'
import Modal from '../components/modal/index'

import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'

export default function Home() {
  const [moveCount, setMoveCount] = useState(0)
  const [confettiActive, setConfettiActive] = useState(false)
  const [path, setPath] = useState('')
  const [gifActive, setGifActive] = useState(false)
  const [activeBtn, setActiveBtn] = useState(false)
  const [activeModal, setActiveModal] = useState(false)
  const [msg, setMsg] = useState('')

  // const [position, setPosition] = useState({ x: 525, y: 192 })
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  })

  const moveButton = () => {
    // Obtém as dimensões da janela do navegador
    const windowWidth = window.innerWidth / 2
    const windowHeight = window.innerHeight

    // Obtém as dimensões do botão
    const buttonWidth = 100 // Largura do botão
    const buttonHeight = 40 // Altura do botão

    // Calcula as coordenadas máximas levando em consideração a posição atual do botão
    const maxX = windowWidth - buttonWidth
    const maxY = windowHeight - buttonHeight

    // Calcula as coordenadas aleatórias dentro dos limites da tela visível
    const randomX = Math.floor(Math.random() * (windowWidth - buttonWidth))
    const randomY = Math.floor(Math.random() * (windowHeight - buttonHeight))

    // Define a nova posição do botão, garantindo que esteja dentro dos limites da tela visível
    setPosition({
      x: Math.max(0, Math.min(randomX, maxX)),
      y: Math.max(0, Math.min(randomY, maxY)),
    })
    setMoveCount(moveCount + 1)
  }

  useEffect(() => {
    setGifActive(false)
    const pathImageArray = [
      '/cat.gif',
      '/bu_moster_sa.gif',
      '/sad_stitch.gif',
      '/picachu.gif',
    ]
    if (moveCount > 2) {
      const indiceAleatorio = Math.floor(Math.random() * pathImageArray.length)
      const caminhoAleatorio = pathImageArray[indiceAleatorio]
      setActiveBtn(true)
      setPath(caminhoAleatorio)
      setGifActive(true)
    }
  }, [moveCount])

  // Define a animação usando useSpring
  const springProps = useSpring({
    left: position.x,
    top: position.y,
    config: { duration: 300 }, // Configuração de duração da transição
  })

  const handleClick = () => {
    setConfettiActive(true)
    setTimeout(() => {
      setConfettiActive(false)
      setActiveModal(true)
    }, 5000) // Tempo em milissegundos para manter o efeito de confete
  }
  const handleResponse = async () => {
    const response = await fetch('api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resposta: true,
        msg: msg,
      }),
    })
    if (response.status === 200) {
      setMsg('')
      setActiveModal(false)
      toast.success('Sucesso ao Enviar sua resposta ao pedido!')
    } else {
      toast.error('Erro ao Enviar sua resposta ao pedido!')
    }
  }
  return (
    <>
      {confettiActive && <Confetti />}
      <div className="flex h-screen flex-col items-center bg-pink-300 px-3">
        <div className="flex flex-col items-center justify-center bg-white w-1/2 h-auto mt-16 p-5 drop-shadow-2xl rounded-md">
          {gifActive && (
            <div className="my-10">
              <Image
                src={path}
                alt="gif-aleatório"
                width={100}
                height={100}
                className="size-[200px]"
              />
            </div>
          )}
          <p className="my-10 text-red-500 text-lg">Prezada Beatriz Kodama,</p>
          <p className=" text-red-500 text-lg">
            Espero que esta mensagem a encontre bem. Gostaria de expressar meu
            interesse em compartilhar minha vida ao seu lado e consequentemente,
            dedicar-me a proporcionar-lhe felicidade ao longo de nossos dias
            juntos.
          </p>

          <div className="mt-16 flex">
            {activeBtn && (
              <button
                className="border-blue-500 border-2 rounded-md p-2 text-blue-500 hover:bg-blue-500 hover:text-white text-2xl "
                onClick={handleClick}
              >
                SIM
              </button>
            )}
            <animated.button
              className="absolute border-pink-500 border-2 rounded-md p-2 text-pink-500 hover:bg-pink-500 hover:text-white text-2xl"
              style={{ ...springProps, transition: 'all 300ms ease-in-out' }}
              onMouseOver={moveButton}
              onTouchStart={moveButton}
            >
              Não
            </animated.button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={activeModal}
        onClose={() => setActiveModal(!activeModal)}
        onSubmit={handleResponse}
        title="Parabéns você acaba de tomar a melhor decisão da sua vida!"
        txtBtn="Enviar"
      >
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Deseja enviar uma mensagem para Renato?
        </label>
        <textarea
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        pauseOnFocusLoss
        theme="colored"
      />
    </>
  )
}
