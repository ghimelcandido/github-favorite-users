export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
    }
}

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)
        this.update()
    }

    update() {
        this.removeAllTr()
    }

    createRow() {
        const tr = document.createElement('tr')

        tr.innerHTML = `<tr>
        <td class="user">
          <img src="https://github.com/maykbrito.png" alt="Imagem de maykbrito">
          <a href="https://github.com/maykbrito" target="_blank">
            <p>Mayk Brito</p>
            <span>maykbrito</span>
          </a>
        </td>
        <td class="repositories">
          76
        </td>
        <td class="followers">
          9589
        </td>
        <td>
          <button class="remove">&times;</button>
        </td>
        </tr>`

        return tr
    }

    removeAllTr() {
        const tbody = this.root.querySelector('table tbody')

        tbody.querySelectorAll('tr')
            .forEach((tr) => {
                tr.remove()
            })
    }
}