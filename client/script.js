function FormSubmit(event) {
    event.preventDefault()
    const data = {

    }
    document.querySelectorAll('form>input, form>textarea').forEach(input => {
        if (input.value.length > 0) {
            data[input.name] = input.value
        }
    })
    document.querySelector('[type="submit"]').classList.add('loading')
    fetch('/email', {
        headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(data),
        method: "POST"
    }).then(res => {
        if (res.ok) {
            document.querySelector('[type="submit"]').classList.remove('loading')
            document.querySelector('.info').innerHTML = 'Bericht verzonden!'
            document.querySelector('.info').classList.add('success')
            
            document.querySelectorAll('form>input, form>textarea').forEach(input => {
                input.value = ''
            })
        } else {

            document.querySelector('.info').innerHTML = 'Sorry, er is een interne serverfout opgetreden. Probeer het later opnieuw.'
            document.querySelector('.info').classList.add('error')

            document.querySelector('[type="submit"]').style.backgroundColor = 'red'
        }
    })
}