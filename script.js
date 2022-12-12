let App = {
    URL: 'https://techmart-96763-default-rtdb.asia-southeast1.firebasedatabase.app/',
    GET: async (url = '') => {
        return await fetch(url, {
            method: 'GET',
            mode: 'cors',
        })
    },
    CONTAINER: document.getElementById('root'),
    // SEND data to API
    POST: async (url = '', data = {}) => {
        return await fetch(url, {
            method: 'POST',
            // mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    },
    PUT: async (url = '', data = {}) => {
        return await fetch(url, {
            method: 'PUT',
            // mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
    },
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
            res[Object.keys(res)[i]]['category'] = e.target.getAttribute('data-value')
            res[Object.keys(res)[i]]['key'] = Object.keys(res)[i]
            p.push(res[Object.keys(res)[i]])
        }
        document.querySelectorAll(`li.nav-item>a`).forEach(a => {
            a.innerText == e.target.innerText ? a.classList.add('active') : a.classList.remove('active')
        })
        DOM.clearElements(App.CONTAINER)
        DOM.clearElements(document.querySelector('.container.selector'))
        document.querySelector('.container.selector').appendChild(DOM.showDropdown(p))
        document.querySelector('select[class="m-2"]').dispatchEvent(new Event("change"))
        document.querySelector('.btn.btn-outline-primary.mx-auto.text-center').dispatchEvent(new Event("click"))
    },
    showForm: (e) => {
        let data = JSON.parse(e.target.value)
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
        name.name = 'name'
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
        submitBtn.setAttribute('data-value', JSON.stringify(data))
        submitBtn.onclick = DOM.generateObj
        form.appendChild(submitBtn)
        DOM.clearElements(App.CONTAINER)
        App.CONTAINER.appendChild(form)
        document.querySelector('.btn.btn-outline-primary.mx-auto.text-center').dispatchEvent(new Event("click"))
    },
    initialLoad: async () => {
        let p = []
        let res = await DOM.fetchList(ctgry[0])
        document.querySelectorAll(`li.nav-item>a[data-value="${ctgry[0]}"]`)[0].classList.add('active')
        for (let i = 0; i < Object.keys(res).length; i++) {
            res[Object.keys(res)[i]]['category'] = ctgry[0]
            res[Object.keys(res)[i]]['key'] = Object.keys(res)[i]
            p.push(res[Object.keys(res)[i]])
        }
        document.querySelector('.container.selector').appendChild(DOM.showDropdown(p))
        document.querySelector('select[class="m-2"]').dispatchEvent(new Event("change"))
        document.querySelector('.btn.btn-outline-primary.mx-auto.text-center').dispatchEvent(new Event("click"))
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
    },
    generateObj: (e) => {
        e.preventDefault()
        let data = JSON.parse(e.target.getAttribute('data-value'))
        let obj = {
            image_link: data.image_link || [],
            name: data.name,
            source: data.source,
            specification: data.specification,
            key: data.key,
            category: data.category,
            specs: data.specs || {},
            price: data.price || ''
        }
        let form = document.querySelector(`.${Array.from(e.target.parentElement.classList).join('.')}`)
        if (data.image_link.length < document.getElementById('imgLinks').children.length) {
            obj['image_link'].push(form.querySelectorAll('.image_link')[document.getElementById('imgLinks').children.length - 1].value)
        }
        if (document.getElementById('name').value !== data.name) {
            obj.name = document.getElementById('name').value
        }
        document.getElementsByTagName('pre')[0].innerHTML = JSON.stringify(obj, null, 3)
    },
    addProdSpec: () => {
        let data = JSON.parse(document.getElementsByTagName('pre')[0].innerHTML)
        let inputs = document.getElementById('add-product-spec').getElementsByTagName('input')[0]
        let textArea = document.getElementById('add-product-spec').getElementsByTagName('textarea')[0]
        data['specs'][`${inputs.value.replace(/\//g, '')}`] = textArea.value.replace(/\n/g, ',')
        document.getElementsByTagName('pre')[0].innerHTML = JSON.stringify(data, null, 3)
    },
    updateData: (obj, key, data) => {
        return response = App.PUT(`${App.URL}${obj}/${key}.json`, data).then(res => res.json())
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
document.querySelector('.btn.btn-outline-success').onclick = (e) => {
    e.preventDefault()
    let data = JSON.parse(document.getElementsByTagName('pre')[0].innerHTML)
    console.log(data)
    if (data.price !== '') {
        alert('price already exists')
        document.querySelector('.btn.btn-outline-success').disabled = true
    } else {
        let inputs = document.getElementById('add-product-price').getElementsByTagName('input')[0]
        data[inputs.name] = inputs.value
        document.getElementsByTagName('pre')[0].innerHTML = JSON.stringify(data, null, 3)
    }

}
document.querySelector('.btn.btn-danger').onclick = (e) => {
    e.preventDefault()
    let inp = document.querySelector(`.${Array.from(e.target.parentElement.classList).join('.')}`).getElementsByTagName('input')
    for (let i in inp) {
        inp[i].value = ''
    }
}
document.querySelector('.btn.btn-warning').onclick = (e) => {
    e.preventDefault()
    let data = JSON.parse(document.getElementsByTagName('pre')[0].innerHTML)
    let key = data.key
    let category = data.category
    delete data.key
    delete data.category
    if (Object.values(data.specs).length !== 0) {
        let res = DOM.updateData(category, key, data)
        res.then(c => {
            console.log(c)
            alert('success')
        }).catch(e => console.log(e))
    } else {
        alert('no changes was made')
    }
}