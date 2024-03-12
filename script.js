
// ? =============================== So'rovlar bilan ishlash ===============================
// ? ======== Web soccet =========
let ws = new WebSocket('wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self')
let btn = document.querySelector('button')
let inp = document.querySelector('input')
let ul = document.querySelector('ul')
let messages = []

ws.onopen = (e) =>{
    console.log(e, 'opened');
}

ws.onerror = (e) =>{
    console.log('Ulanishda xatolik'); 
}

ws.onmessage = (e) =>{
    console.log(e.data);
    let m = JSON.parse(e.data)
    messages.push(m)
    render(messages)
}

function render(messes) {
    ul.innerHtml = ''
    messes.forEach(m =>{
        let li = document.createElement('li')
        li.innerHTML = `
        <p>${m.text}</p>
        <i><b>${m.writer}</b></i>
        `

        if(m.writer === 'Qarshiboyev Bobur' ){
            li.classList.add('me')
        }

        ul.append(li)
    });
}

btn.addEventListener('click', ()=>{
    let mess = {
        writer: 'Qarshiboyev Bobur',
        text: inp.value,
    }

    ws.send(JSON.stringify(mess))
    messages.push(mess)
    render(messages)
})