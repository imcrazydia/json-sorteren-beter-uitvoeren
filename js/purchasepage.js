const giveMonthNumber = (month) => {
    let number;
    switch (month) {
        case "januari":
            number = 0;
            break;
        case "februari":
            number = 1;
            break;
        case "maart":
            number = 2;
            break;
        case "april":
            number = 3;
            break;
        case "mei":
            number = 4;
            break;
        case "juni":
            number = 5;
            break;
        case "juli":
            number = 6;
            break;
        case "augustus":
            number = 7;
            break;
        case "september":
            number = 8;
            break;
        case "oktober":
            number = 9;
            break;
        case "november":
            number = 10;
            break;
        case "december":
            number = 11;
            break;
        default:
            number = 0;
    }
    return number;
}


//Put the text after , at the front
const reverseText = (string) => {
    if (string.indexOf(',') != -1) {
        let array = string.split(',');
        string = array[1] + ' ' + array[0];
    }

    return string;
}

//to add and remove from the shoppingCart object, and get data from the localstorage
let shoppingcart = {
    items: [],

    getItems: function () {
        let purchase;
        if (localStorage.getItem('purchasedBooks') == null) {
            purchase = [];
        } else {
            purchase = JSON.parse(localStorage.getItem('purchasedBooks'));
            document.querySelector('.shoppingcart__quantity').innerHTML = purchase.length;
        }
        return purchase;
    },

    add: function (el) {
        this.items = this.getItems();
        this.items.push(el);
        localStorage.setItem('purchasedBooks', JSON.stringify(this.items));
        document.querySelector('.shoppingcart__quantity').innerHTML = this.items.length;
    },

    uitvoeren: function () {
        //first empty the id = 'uitvoer'
        document.getElementById('uitvoer').innerHTML = "";

        this.items.forEach(book => {
            let section = document.createElement('section');
            section.className = 'bookSelection';

            //main element with all the info except the price and cover
            let main = document.createElement('main');
            main.className = 'bookSelection__main';

            //create book cover
            let image = document.createElement('img');
            image.className = 'bookSelection__cover';
            image.setAttribute('src', book.cover);
            image.setAttribute('alt', reverseText(book.titel));

            //create book title
            let title = document.createElement('h3');
            title.className = 'bookSelection__title';
            title.textContent = reverseText(book.titel);

            //add authors
            let authors = document.createElement('p');
            authors.className = 'bookSelection__authors';
            //Reverse the first- and last name of the author
            book.auteur[0] = reverseText(book.auteur[0]);
            //Authors added to a array and changed into NL String
            authors.textContent = maakOpsomming(book.auteur);

            //Add the extra info
            let extra = document.createElement('p');
            extra.className = 'bookSelection__extra';
            extra.textContent = book.uitgave + ' | aantal pagina\'s: ' + book.paginas + ' | ' + book.taal + ' | ean ' + book.ean;

            //add the prices
            let price = document.createElement('div');
            price.className = 'bookSelection__price';
            // https://freeformatter.com/netherlands-standards-code-snippets.html
            price.textContent = book.prijs.toLocaleString('nl-NL', {
                currency: 'EUR',
                style: 'currency'
            });

            //add price button
            let priceButton = document.createElement('button');
            priceButton.className = 'bookSelection__priceButton';
            priceButton.innerHTML = 'add to<br>shoppingcart';
            priceButton.addEventListener('click', () => {
                shoppingcart.add(book);
            })

            //Add the element
            section.appendChild(image);
            main.appendChild(title);
            main.appendChild(authors);
            main.appendChild(extra);
            section.appendChild(main);
            price.appendChild(priceButton);
            section.appendChild(price);
            document.getElementById('uitvoer').appendChild(section);
        });
    }

}

shoppingcart.getItems();
shoppingcart.uitvoeren();