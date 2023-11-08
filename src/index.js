const formSubmit = document.getElementById("new-quote-form")


formSubmit.addEventListener("submit", (e)=>{
    e.preventDefault()
    const newQuote = {
        quote: e.target[0].value,
        author: e.target[1].value
    }
    addQuote(newQuote)
})

function initializeOrUpdate(){
    fetch("http://localhost:3000/quotes?+embed=likes")
    .then(r=>r.json())
    .then((data)=>{
        const quoteList = document.getElementById("quote-list")
        quoteList.innerHTML = ""
        data.forEach((e)=>{createCard(e)})
    })
}

function createCard(data){
    const quoteList = document.getElementById("quote-list")
    const newQuote = document.createElement("li")
    newQuote.classList = "quote-card"
    newQuote.innerHTML = `
    <blockquote class="blockquote">
      <p class="mb-0">${data.quote}</p>
      <footer class="blockquote-footer">${data.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>0</span></button>
      <button id="${data.id}-delete-button" class='btn-danger'>Delete</button>
    </blockquote>
    `
    quoteList.append(newQuote)
    attachListeners(data.id)
   


}

function attachListeners(id){
    document.getElementById(`${id}-delete-button`).addEventListener("click", ()=>{
        deleteQuote(id)
  
    })
}

function addQuote(data){
    const postObj = data
    fetch("http://localhost:3000/quotes", {
        method : "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(postObj)
    }).then(()=>{
        createCard(data)
    })

}

function deleteQuote(id){

    fetch(`http://localhost:3000/quotes/${id}`, {
        method: "DELETE",
        headers: {"Content-Type" : "application/json"}
    }).then(()=>{
        initializeOrUpdate()
    })
}

initializeOrUpdate()