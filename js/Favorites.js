import { githubUser } from "./githubUser.js"

export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.tbody = this.root.querySelector('table tbody')
        this.load()

    }

    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    }

    save() {
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    }

    delete(user) {
        const filteredEntries = this.entries
            .filter(entry => entry.login !== user.login)

        this.entries = filteredEntries
        this.update()
        this.save()
    }
}

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)
        this.update()
        this.onadd()
    }

    onadd() {
        const addButton = this.root.querySelector('.search button')
        addButton.onclick = () => {
            const { value } = this.root.querySelector('.search input')
            this.add(value)
        }
    }

    async add(username) {
        try {

            const userExists = this.entries.find(entry => entry.login === username)

            if (userExists) {
                throw new Error('O usuario já foi escolhido')
            }

            const user = await githubUser.search(username)
            if (user.login === undefined) {
                throw new Error('Usuario não encontrado!')
            }

            this.entries = [user, ...this.entries]
            this.update()
            this.save()

        } catch (error) {
            alert(error.message)
        }
    }

    update() {
        this.removeAllTr()

        this.entries
            .forEach(user => {
                const row = this.createRow()

                row.querySelector('.user img').src = `https://github.com/${user.login}.png`
                row.querySelector('.user img').alt = `Imagem de ${user.name}`
                row.querySelector('.user a').href = `https://github.com/${user.login}`
                row.querySelector('.user p').textContent = user.name
                row.querySelector('.user span').textContent = user.login
                row.querySelector('.repositories').textContent = user.public_repos
                row.querySelector('.followers').textContent = user.followers


                row.querySelector('.remove').onclick = () => {
                    const isOk = confirm('Você quer mesmo deletar essa linha?')
                    if (isOk) {
                        this.delete(user)
                    }
                }

                this.tbody.append(row)
            })
    }

    createRow() {
        const tr = document.createElement('tr')

        tr.innerHTML = `<tr>
        <td class="user">
          <img src="https://github.com/maykbrito.png" alt="Imagem de maykbrito">
          <a href="https://github.com/maykbrito" target="_blank">
            <p></p>
            <span></span>
          </a>
        </td>
        <td class="repositories">
        </td>
        <td class="followers">
        </td>
        <td>
          <button class="remove">&times;</button>
        </td>
        </tr>`

        return tr
    }

    removeAllTr() {

        this.tbody.querySelectorAll('tr')
            .forEach((tr) => {
                tr.remove()
            })
    }
}
