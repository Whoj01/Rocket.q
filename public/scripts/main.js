import Modal from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalSubTitle = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

const checkButtons = document.querySelectorAll('.actions a.check')

/* quando o botao check for clicado ele abrea o modal */
checkButtons.forEach(button => {
  button.addEventListener('click', handleClick)
})

const deleteButtons = document.querySelectorAll(`.actions a.delete`)

/* quando o botao delete for clicacado ele abrea o modal */

deleteButtons.forEach(button => {
  button.addEventListener('click', event => handleClick(event, false))
})

/* colocando a diferenca quando cada um dos botoes forem clicados */

function handleClick(event, check = true) {
  event.preventDefault()

  const text = check ? 'Marcar como lida ' : 'Excluir '
  const roomId = document.querySelector('#room-id').dataset.id
  const slug = check ? 'check' : 'delete'
  const questionId = event.target.dataset.id

  const form = document.querySelector('.modal form')
  form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)

  modalTitle.innerHTML = `${text} esta pergunta`

  modalSubTitle.innerHTML = `Tem certeza que você deseja ${text.toLocaleLowerCase()} esta pergunta?`

  modalButton.innerHTML = `Sim, ${text.toLocaleLowerCase()}`

  check ? modalButton.classList.remove(`red`) : modalButton.classList.add(`red`)

  modal.open()
}



