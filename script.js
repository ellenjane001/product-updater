let App = {
    URL: 'https://techmart-96763-default-rtdb.asia-southeast1.firebasedatabase.app/',
    GET: async (url = '') => {
        return await fetch(url, {
            method: 'GET',
            mode: 'cors',
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
        console.log(e.target.getAttribute('data-value'))
        let res = await DOM.fetchList(e.target.getAttribute('data-value'))

        for (let i = 0; i < Object.keys(res).length; i++) {
            p.push(res[Object.keys(res)[i]])
        }

        if (document.getElementById('root').children.length > 1) {
            document.getElementById('root').children[1].remove()
        }
        document.getElementById('root').appendChild(DOM.showDropdown(p))
    },
    showForm: (e) => {
        let data = JSON.parse(e.target.value)
        console.log(data)
        let form = document.createElement('form')
        form.classList.add('d-flex')
        form.classList.add('flex-column')
        form.classList.add('gap-3')
        form.classList.add('w-75')
        form.classList.add('mx-auto')
        form.classList.add('py-3')
        let name = document.createElement('input')
        name.id = 'name'
        let span = document.createElement('span')
        span.innerText = 'Source Link'
        let a = document.createElement('a')
        a.href = data.specification
        a.target = '_blank'
        a.appendChild(document.createTextNode(data.specification))
        form.appendChild(span)
        form.appendChild(a)
        form.appendChild(name)
        document.getElementById('root').appendChild(form)
    },

}
let ul = DOM.appendUl()
ul.classList.add('nav')
ul.classList.add('nav-pills')
ul.classList.add('nav-fill')
document.getElementById('root').appendChild(ul)
for (i in ctgry) {
    document.getElementById('categories').appendChild(DOM.appendLiwithA(ctgry[i]))
}
