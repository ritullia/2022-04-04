const url = 'http://localhost:5001'


const transferData = async (url, method = 'GET', data = {}) => {
    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }

    }

    if (method != "GET")
        options.body = JSON.stringify(data)

    const resp = await fetch(url, options)

    return resp.json()
}

const validator = (fields) => {
    let valid = true
    let entries = Object.entries(fields)

    if (fields.product) {
        valid = false
    }

    entries.forEach(value => {

        if (value[1] === '') {
            valid = false
            return
        }
    })

    return valid
}


const newOrderForm = async () => {
    const root = document.querySelector('#newOrderForm')
    const productsContainer = root.querySelector('.productSelect')

    const products = await transferData(url + '/products/show-products')
    console.log(products)

    let html = '<ul>'

    products.forEach(product => {
        let price = `<span class="normalPrice">${product.price}</span>`

        if (product.discount_price)
            price = `<span class="specialPrice">${product.discount_price}</span>
                     <span class="originalPrice">${product.price}</span>`


        html += `<li>
                <label>
                    <input type="radio" name="product" value="${product._id}">
                    <div class="contents">
                            <div class="name">${product.product_name}</div>
                            <div class="description">${product.description}</div>
                            <div class="price">${price}</div>
                    </div>
                 </label>       
                </li>`

    })

    html += '<ul>'

    productsContainer.innerHTML = html

    root.querySelector('button.checkout-button').addEventListener('click', () => {
        const form = root.querySelector('form')
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData)

        if (validator(formJson)) {
            transferData(url + '/orders/save-order', 'POST', formJson)
                .then(resp => {
                    console.log(resp)
                })

        }


    })


}


window.addEventListener('load', () => {
    newOrderForm()

})

