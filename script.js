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
    showTbl: (data) => {
        console.log(data)
        let table = DOM.createElem('table', ['table', 'border'])
        let thead = document.createElement('thead')
        let tr = document.createElement('tr')
        let thName = document.createElement('th')
        let thOptions = document.createElement('th')
        let tbody = document.createElement('tbody')
        thName.innerText = 'Name'
        thOptions.innerText = 'Options'
        tr.appendChild(thName)
        tr.appendChild(thOptions)
        thead.appendChild(tr)
        for (d in data) {
            let tr = document.createElement('tr')
            let tdName = document.createElement('td')
            let tdOption = document.createElement('td')
            let btn = DOM.createElem('button', ['btn', 'btn-outline-danger'], [{ a: 'data-value', v: JSON.stringify(data[d]) }])
            btn.innerText = 'Update'
            btn.addEventListener('click', DOM.showProd)
            tdOption.appendChild(btn)
            tdName.innerText = data[d].name
            tr.appendChild(tdName)
            tr.appendChild(tdOption)
            tbody.appendChild(tr)
        }
        table.appendChild(thead)
        table.appendChild(tbody)
        return table
    },
    showProd: (e) => {
        DOM.clearElements(document.querySelector('.container.selector'))
        DOM.showForm(e.target.getAttribute('data-value'))
    },
    showDropdown: (data) => {
        let select = document.createElement('select')
        select.classList.add('form-select')
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
        document.querySelector('.container.selector').appendChild(DOM.showTbl(p))
        // document.querySelector('.container.selector').appendChild(DOM.showDropdown(p))
        // document.querySelector('select[class="form-select m-2"]').dispatchEvent(new Event("change"))
        // document.querySelector('.btn.btn-outline-primary.mx-auto.text-center').dispatchEvent(new Event("click"))
    },
    createElem: (element, classes = [], attribs = []) => {
        let e = document.createElement(element)
        if (classes.length > 0) {
            for (c in classes) {
                e.classList.add(classes[c])
            }
        }
        if (attribs.length > 0) {
            for (attr in attribs) {
                e.setAttribute(attribs[attr].a, attribs[attr].v)
            }
        }
        return e
    },
    showForm: (e) => {
        let data = JSON.parse(e)
        let form = DOM.createElem('form', ['d-flex', 'flex-column', 'gap-3', 'w-100', 'mx-auto', 'py-3', 'align-items-start'])
        let nameDiv = DOM.createElem('div', ['d-flex', 'gap-3', 'w-100'])
        let sourceDiv = DOM.createElem('div', ['d-flex', 'gap-3', 'w-100'])
        let nameLbl = DOM.createElem('label')
        nameLbl.innerText = 'Product name'
        let name = document.createElement('input')
        name.type = 'text'
        name.classList.add('w-100')
        name.id = 'name'
        name.name = 'name'
        name.value = data.name
        name.classList.add('form-control')
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
            inputs.classList.add('image_link', 'w-100', 'm-2', 'form-control')
            inputs.value = data.image_link[v]
            li.appendChild(inputs)
            ol.appendChild(li)
        }
        let addNewImageBtn = DOM.createElem('button', ['btn', 'btn-primary'])
        addNewImageBtn.innerText = 'Add new image link'
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
        let submitBtn = DOM.createElem('button', ['btn', 'btn-outline-primary', 'mx-auto', 'text-center'], [{ a: 'data-value', v: JSON.stringify(data) }])
        submitBtn.innerText = 'Submit'
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
        document.querySelector('.container.selector').appendChild(DOM.showTbl(p))
        // document.querySelector('.container.selector').appendChild(DOM.showDropdown(p))
        // document.querySelector('select[class="form-select m-2"]').dispatchEvent(new Event("change"))
        // document.querySelector('.btn.btn-outline-primary.mx-auto.text-center').dispatchEvent(new Event("click"))
    },
    clearElements: (element) => {
        element.innerHTML = ''
    },
    addNewImageLink: (e) => {
        e.preventDefault()
        let li = document.createElement('li')
        let inputs = DOM.createElem('input', ['image_link', 'w-100', 'm-2', 'form-control'])
        inputs.type = 'text'
        li.appendChild(inputs)
        document.getElementById('imgLinks').appendChild(li)
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
    },
    addProductPrice: () => {
        let html = `<div class="container text-center p-4 d-flex gap-2 justify-content-center">
        <h3>Add Product Price: </h3>
        <form id="add-product-price" class="d-flex gap-3 align-items-center justify-content-center">
            <input title="product-price" type="number" name="price" id="price" class="form-control">
            <button class="btn btn-outline-success">Add</button>
        </form>
        </div>`
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