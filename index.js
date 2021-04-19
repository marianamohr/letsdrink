function criar(drink) {
  const {
    strDrink,
    strDrinkThumb,
    strGlass,
    strInstructions,
  } = drink;

  const ingredientsKeys = Object.entries(drink)
  const ingredients = [];
  const measures = [];
  ingredientsKeys.forEach((key) => {
    if (key[0].match('strIngredient') && key[1] !== null) {
      ingredients.push(key[1]);
    }
  });
  ingredientsKeys.forEach((key) => {
    if (key[0].match('strMeasure') && key[1] !== null) {
      measures.push(key[1]);
    }
  });
  const listaFinal = [];
  console.log(ingredients);
  console.log(measures);
  for (let i = 0; i <= (ingredients.length - 1); i += 1) {
    if (measures[i] === undefined) {
      listaFinal.push(ingredients[i]);
    } else {
      listaFinal.push(`${measures[i]} - ${ingredients[i]}`);
    }
  }
  limpar();
  const divNome = document.getElementById('nome-drink');
  const h2 = document.createElement('h2');
  const nomeDrink = strDrink
  h2.innerHTML = `Drink: ${nomeDrink}`;
  divNome.appendChild(h2);

  const divFoto = document.getElementById('foto');

  const img = document.createElement('img');
  img.src = strDrinkThumb;
  img.classList.add('foto');
  divFoto.appendChild(img);

  const ulListaIngredientes = document.getElementById('lista-ingredientes');

  listaFinal.forEach((ingredient) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerHTML = ingredient;
    li.appendChild(span);
    ulListaIngredientes.appendChild(li);
  });

  const divModoPreparo = document.getElementById('modo-preparo');
  const pGlass = document.createElement('p');
  const pModo = document.createElement('p');
  pGlass.innerHTML = `Type Glass : ${strGlass}`;
  pModo.innerHTML = strInstructions;
  divModoPreparo.appendChild(pGlass);
  divModoPreparo.appendChild(pModo);

}

const limpar = () => {
  const divNome = document.getElementById('nome-drink');
  while (divNome.firstChild) divNome.removeChild(divNome.firstChild);

  const divFoto = document.getElementById('foto');
  while (divFoto.firstChild) divFoto.removeChild(divFoto.firstChild);

  const divIngredientes = document.getElementById('lista-ingredientes');
  while (divIngredientes.firstChild) divIngredientes.removeChild(divIngredientes.firstChild);

  const divOptions = document.getElementById('options');
  while (divOptions.firstChild) divOptions.removeChild(divOptions.firstChild);

  const divPreparo = document.getElementById('modo-preparo');
  while (divPreparo.firstChild) divPreparo.removeChild(divPreparo.firstChild);

}

function renderOptions(drinks) {
  drinks.forEach((drink) => {
    const {
      strDrink,
    } = drink;

    const pai = document.getElementById('options');

    const a = document.createElement('a');
    const h3 = document.createElement('h3');
    h3.innerHTML = strDrink;
    h3.classList = 'stlDrink';
    a.classList = 'typeDrink';
    a.appendChild(h3);
    pai.appendChild(a);

    a.addEventListener('click', (event) => {
      criar(drink);
    });
  });
}

function renderDrink(drinks) {
  const divNome = document.getElementById('nome-drink');

  limpar();

  if (divNome.firstChild === null) {
    if (drinks.length === 1) {
      criar(drinks[0])
    } else {
      renderOptions(drinks);
    }
  } else {
    limpar();
    criar(drinks[0])
  }
}

async function getDrink(name) {
  const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`).then((res) => res.json());
  const drinks = result['drinks'];
  renderDrink(drinks);
}
async function randomGetDrink(name) {
  const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php').then((res) => res.json());
  const drinks = result['drinks'];
  renderDrink(drinks);
}

const drink = document.getElementById('drink');
const btnListar = document.getElementById('btn-list');
const btnRamdom = document.getElementById('btn-ramdom');

btnListar.addEventListener('click', () => getDrink(drink.value));
btnRamdom.addEventListener('click', randomGetDrink);