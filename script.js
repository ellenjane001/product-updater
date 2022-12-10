let App = {
    URL: 'https://techmart-96763-default-rtdb.asia-southeast1.firebasedatabase.app/',
    GET: async (url = '') => {
        return await fetch(url, {
            method: 'GET',
            mode: 'cors',
        })

    },
    CONTAINER: document.getElementById('root')
}
let ctgry = ['case', 'cooling', 'display', 'gpu', 'input', 'mb', 'processor', 'ps', 'ram', 'sd']
let DOM = {
    fetchList: (obj) => {
        return response = App.GET(`${App.URL}${obj}.json`).then(res => res.json())
    },
    appendLiwithA: (item) => {
        let li = document.createElement('li')
        let a = document.createElement('a')
        a.appendChild(document.createTextNode(item.toUpperCase()))
        a.setAttribute('data-value', item)
        a.href = 'javascript:void(0)'
        a.onclick = DOM.dataManipulation
        a.classList.add('nav-link')
        li.appendChild(a)
        li.classList.add('nav-item')
        return li
    },
    appendUl: () => {
        let ul = document.createElement('ul')
        ul.id = 'categories'
        return ul
    },
    showDropdown: (data) => {
        let select = document.createElement('select')
        for (d in data) {
            let option = document.createElement('option')
            option.value = JSON.stringify(data[d])
            option.appendChild(document.createTextNode(data[d].name))
            select.appendChild(option)
        }
        select.onchange = DOM.showForm
        select.classList.add('m-2')
        return select
    },
    dataManipulation: async (e) => {
        let p = []
        let res = await DOM.fetchList(e.target.getAttribute('data-value'))

        for (let i = 0; i < Object.keys(res).length; i++) {
            p.push(res[Object.keys(res)[i]])
        }
        document.querySelectorAll(`li.nav-item>a`).forEach(a => {
            a.innerText == e.target.innerText ? a.classList.add('active') : a.classList.remove('active')
        })
        DOM.clearElements(App.CONTAINER)
        DOM.clearElements(document.querySelector('.container.selector'))
        document.querySelector('.container.selector').appendChild(DOM.showDropdown(p))
        document.querySelector('select[class="m-2"]').dispatchEvent(new Event("change"))
    },
    showForm: (e) => {
        let data = JSON.parse(e.target.value)
        console.log(data)
        let form = document.createElement('form')
        let formClasses = ['d-flex', 'flex-column', 'gap-3', 'w-100', 'mx-auto', 'py-3', 'align-items-start']
        for (let c = 0; c < formClasses.length; c++) {
            form.classList.add(formClasses[c])
        }
        let nameDiv = document.createElement('div')
        let sourceDiv = document.createElement('div')
        sourceDiv.classList.add('d-flex')
        sourceDiv.classList.add('gap-3')
        sourceDiv.classList.add('w-100')
        nameDiv.classList.add('d-flex')
        nameDiv.classList.add('gap-3')
        nameDiv.classList.add('w-100')
        let nameLbl = document.createElement('label')
        nameLbl.innerText = 'Product name'
        let name = document.createElement('input')
        name.type = 'text'
        name.classList.add('w-100')
        name.id = 'name'
        name.value = data.name
        nameDiv.appendChild(nameLbl)
        nameDiv.appendChild(name)
        let imgLinksDiv = document.createElement('div')
        let linksSpan = document.createElement('span')
        linksSpan.innerText = 'Image Links'
        let ol = document.createElement('ol')
        ol.id = 'imgLinks'
        imgLinksDiv.classList.add('w-100')
        for (let v = 0; v < data.image_link.length; v++) {
            let li = document.createElement('li')
            let inputs = document.createElement('input')
            inputs.type = 'text'
            inputs.classList.add('image_link')
            inputs.classList.add('w-100')
            inputs.classList.add('m-2')
            inputs.value = data.image_link[v]
            li.appendChild(inputs)
            ol.appendChild(li)
        }
        let addNewImageBtn = document.createElement('button')
        addNewImageBtn.innerText = 'Add new image link'
        addNewImageBtn.classList.add('btn')
        addNewImageBtn.classList.add('btn-primary')
        addNewImageBtn.addEventListener('click', DOM.addNewImageLink)
        imgLinksDiv.appendChild(linksSpan)
        imgLinksDiv.appendChild(ol)
        imgLinksDiv.appendChild(addNewImageBtn)
        let span = document.createElement('span')
        span.innerText = 'Specifications Link'
        let a = document.createElement('a')
        a.href = data.specification
        a.target = '_blank'
        a.appendChild(document.createTextNode(data.specification))
        sourceDiv.appendChild(span)
        sourceDiv.appendChild(a)
        form.appendChild(sourceDiv)
        form.appendChild(nameDiv)
        form.appendChild(imgLinksDiv)
        let submitBtn = document.createElement('button')
        submitBtn.innerText = 'Submit'
        submitBtn.classList.add('btn')
        submitBtn.classList.add('btn-outline-primary')
        submitBtn.classList.add('mx-auto')
        submitBtn.classList.add('text-center')
        submitBtn.onclick = DOM.generateObj
        form.appendChild(submitBtn)
        DOM.clearElements(App.CONTAINER)
        App.CONTAINER.appendChild(form)
    },
    initialLoad: async () => {
        let p = []
        let res = await DOM.fetchList(ctgry[0])
        document.querySelectorAll(`li.nav-item>a[data-value="${ctgry[0]}"]`)[0].classList.add('active')
        for (let i = 0; i < Object.keys(res).length; i++) {
            p.push(res[Object.keys(res)[i]])
        }
        document.querySelector('.container.selector').appendChild(DOM.showDropdown(p))
        document.querySelector('select[class="m-2"]').dispatchEvent(new Event("change"))
    },
    clearElements: (element) => {
        element.innerHTML = ''
    },
    addNewImageLink: (e) => {
        e.preventDefault()
        let li = document.createElement('li')
        let inputs = document.createElement('input')
        inputs.type = 'text'
        inputs.classList.add('image_link')
        inputs.classList.add('w-100')
        inputs.classList.add('m-2')
        li.appendChild(inputs)
        console.log(document.getElementById('imgLinks').appendChild(li))
    },
    generateObj: (e) => {
        e.preventDefault()
        let obj = {}
        console.log(document.querySelector(`.${Array.from(e.target.parentElement.classList).join('.')}`).getElementsByTagName('input'))
        obj = {
            ...obj
        }
    },
    addProdSpec: () => {

    }

}
for (i in ctgry) {
    document.querySelector('.nav.nav-pills').appendChild(DOM.appendLiwithA(ctgry[i]))
}
DOM.initialLoad()


document.querySelector('.btn.btn-success').onclick = (e) => {
    e.preventDefault()
    DOM.addProdSpec()
}