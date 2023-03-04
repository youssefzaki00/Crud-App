let title = document.querySelector('#title');
let price = document.querySelector('#price');
let taxes = document.querySelector('#taxes');
let ads  = document.querySelector('#ads');
let discount = document.querySelector('#discount');
let total = document.querySelector('#total');
let count = document.querySelector('#count');
let category = document.querySelector('#category');
let create = document.querySelector('#Submit');
let searchEngine = document.querySelector('#searchEngine');
let searchByTitle = document.querySelector('#searchTitle');
let searchByCategory = document.querySelector('#searchCategory');
let deleteAll = document.querySelector('.deleteAll');
let choice = document.querySelector('.choice');
let yes = document.querySelector('.choice .icons .yes');
let no = document.querySelector('.choice .icons .no');
let mood = 'create';
let tmp;
function getTotal() {
  if (price.value !== '' && discount.value !== ''
    && price.value > 0 && taxes.value >= 0
    && discount.value > 0) {
    let totalNum=(
      (+price.value + +taxes.value + +ads.value) -
      ((+discount.value / 100 ) * +price.value));
    // total.innerHTML = totalNum.toFixed(2);
    total.innerHTML = `${Math.round(totalNum)}EG`;
    total.style.background = `#040`;
  } else {
    total.innerHTML = '0EG';
    total.style.background = '#a00d02';
  }
};
price.addEventListener('keyup', getTotal);
taxes.addEventListener('keyup', getTotal);
ads.addEventListener('keyup', getTotal);
discount.addEventListener('keyup', getTotal);

let arr =[];

if (localStorage.product) {
  arr = JSON.parse(localStorage.product);
} else {
  arr =[];
}

create.addEventListener('click', makeData);
create.addEventListener('click', showData);
// create.addEventListener('click', clearInputs);

function makeData() {
  let data= {
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
  }
  if (title.value != '' && price.value != '' && discount.value!=''&&category.value!=''&& data.count<=100) {
    
    if (mood === 'create') {
      if (data.count > 1) {
        for (let i = 0; i < data.count; i++) {
          arr.push(data);
        }
      } else {
        arr.push(data);
      }
    } else {
      arr[tmp] = data;
      mood = 'create';
      count.style.display = 'block';
      create.innerHTML = 'create';
    }
    clearInputs();
  } 
  
    saveData();
};
function saveData() {
  localStorage.setItem('product',JSON.stringify(arr));
};
function clearInputs() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '0EG';
  count.value = '';
  category.value = '';
};

function showData() {
  getTotal()
  let table = '';
  for (let i = 0; i < arr.length; i++) {
    table +=
      `
      <tr>
        <td>${i+1}</td>
        <td>${arr[i].title}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].taxes}</td>
        <td>${arr[i].ads}</td>
        <td>${arr[i].discount}</td>
        <td>${arr[i].total}</td>
        <td>${arr[i].category}</td>
        <td><button onclick='updateProduct(${i})' id="update">update</button></td>
        <td><button onclick='delProduct(${i})' id="delete">delete</button></td>
      </tr>
    `
  };
  document.getElementById('tbody').innerHTML = table;
  // delete all  button show and hide
  if (table !='') {
    deleteAll.classList.add('show');
    deleteAll.innerHTML=`delete all (${arr.length})`
  } else {
    deleteAll.classList.remove('show');
  }
};
showData();
deleteAll.addEventListener('click', function () {
  document.querySelector('.crud').classList.add('disabled');
  choice.classList.add('show');
  scroll({
    top: 0,
    behavior: 'smooth',
  });
});
yes.addEventListener('click', function () {
  document.querySelector('.crud').classList.remove('disabled');
  choice.classList.remove('show');
  document.getElementById('tbody').innerHTML = '';
  localStorage.clear();
  deleteAll.classList.remove('show');
});
no.addEventListener('click', function () {
  document.querySelector('.crud').classList.remove('disabled');
  choice.classList.remove('show');
});

function delProduct(i) {
  arr.splice(i, 1);
  saveData(arr)
  showData();
};
function updateProduct(i) {
  title.value = arr[i].title;
  price.value = arr[i].price;
  taxes.value = arr[i].taxes;
  ads.value = arr[i].ads;
  discount.value = arr[i].discount;
  category.value = arr[i].category;
  getTotal();
  count.style.display = 'none';
  create.innerHTML = 'update';
  mood = 'update';
  tmp = i;
  scroll({
    top: 0,
    behavior: 'smooth',
  });
};
searchByTitle.addEventListener('click',changeSearchMood);
searchByCategory.addEventListener('click',changeSearchMood)
searchEngine.addEventListener('keyup',searchData)

let searchMood = 'title';
function changeSearchMood() {
  if (this.id== searchByTitle.id) {
    searchMood = 'title';
  } else {
    searchMood = 'category';
  }
  searchEngine.placeholder = `Search By ` + searchMood;
  searchEngine.focus();
  searchEngine.value = '';
  showData()
};

function searchData() {
    let table = '';
    for (let i = 0; i < arr.length; i++) {

      if (searchMood == 'title') {
        if (arr[i].title.includes(searchEngine.value.toLowerCase())) {
          table +=
            `<tr>
        <td>${i + 1}</td>
        <td>${arr[i].title}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].taxes}</td>
        <td>${arr[i].ads}</td>
        <td>${arr[i].discount}</td>
        <td>${arr[i].total}</td>
        <td>${arr[i].category}</td>
        <td><button onclick='updateProduct(${i})' id="update">update</
        button></td>
        <td><button onclick='delProduct(${i})' id="delete">delete</
        button></td>
      </tr>`
        }
      }
      else {
        if (arr[i].category.includes(searchEngine.value.toLowerCase())) {
          table +=
            `<tr>
        <td>${i + 1}</td>
        <td>${arr[i].title}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].taxes}</td>
        <td>${arr[i].ads}</td>
        <td>${arr[i].discount}</td>
        <td>${arr[i].total}</td>
        <td>${arr[i].category}</td>
        <td><button onclick='updateProduct(${i})' id="update">update</
        button></td>
        <td><button onclick='delProduct(${i})' id="delete">delete</
        button></td>
      </tr>`
        }
      }
  }
  document.getElementById('tbody').innerHTML = table;
};