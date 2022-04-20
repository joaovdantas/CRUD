const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sEmail = document.querySelector('#m-email')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

// pega os dados do banco em JSON, caso não tenha nada retorna vazio
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []  
// transforma os dados em JSON e adiciona ao banco
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens)) 

// funçao para carregar a tela 
function loadItens(){
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    })
}
loadItens()

// funçao para inserir cada item
function insertItem(item, index) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.email}</td>
      <td>${item.funcao}</td>
      <td>R$ ${item.salario}</td>
      <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
      </td>
      <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `
    tbody.appendChild(tr)
}

// funçao para editar 
function editItem(index) {
    openModal(true, index)
}
  
// funçao para deletar
function deleteItem(index) {
    itens.splice(index, 1) // delete 1-item
    setItensBD() //atualiza
    loadItens() //recarregar a tela
}


function openModal(edit = false, index = 0) {
    modal.classList.add('active') // adiciona classe do CSS (active)
  
    modal.onclick = e => {
      if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active') //remove classe (active)
      }
    }
        
    //condiçao para ediçao focando nos itens do modal
    if (edit) {
      sNome.value = itens[index].nome
      sEmail.value = itens[index].email
      sFuncao.value = itens[index].funcao
      sSalario.value = itens[index].salario
      id = index
    } else {
      sNome.value = ''
      sEmail.value = ''
      sFuncao.value = ''
      sSalario.value = ''
    }
    
}

// funçao para salvar
btnSalvar.onclick = e => {
  
    if (sNome.value == '' || sEmail.value == '' || sFuncao.value == '' || sSalario.value == '') {
      return
    }
  
    e.preventDefault();
  
    if (id !== undefined) {
      itens[id].nome = sNome.value
      itens[id].email = sEmail.value
      itens[id].funcao = sFuncao.value
      itens[id].salario = sSalario.value
    } else {
      itens.push({'nome': sNome.value, 'email': sEmail.value, 'funcao': sFuncao.value, 'salario': sSalario.value})
    }
    
    //atualiza
    setItensBD() 
  
    modal.classList.remove('active')
    loadItens() // ativa a funçao de carregar a tela 
    id = undefined
}