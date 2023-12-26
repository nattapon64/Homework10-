const userList = document.querySelector('.user-Select')
const userPost = document.querySelector('.post-info')

function makeElement(tag, attr_n, attr_v, content) {
    let output = document.createElement(tag);
    (!!attr_n) && output.setAttribute(attr_n, attr_v);
    output.textContent = content;
    return output;
}
function changeBackgroundColor() {
    const colors = ["green","red"];
    const body = document.body;
    let currentIndex = 0;
  
    setInterval(() => {
      body.style.backgroundColor = colors[currentIndex];
      currentIndex = (currentIndex + 1) % colors.length;
    }, 1000);
  }
  
  changeBackgroundColor();
  

fetch('https://jsonplaceholder.typicode.com/users')
.then(resp => resp.json())
.then( data => { 
    for (let el of data){
        const li = makeElement('li', 'class', `user user-${el.id}`, `${el.id} | ${el.name} | ${el.email}`);
        const poSts = () => {
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${el.id}`)
            .then(resp => resp.json())
            .then( data => { 
                userPost.innerHTML = '';
                for (let ps of data){
                    const card = makeElement('div', 'class', 'card', '');
                    const p3 = makeElement('p', 'class', 'post-title', `Title : ${ps.title}`);
                    const p4 = makeElement('p', 'class', 'post-body', `Body : ${ps.body}`);
                    userPost.append(card);
                    card.append(p3, p4);
                }
            } )
        };
        userList.append(li);
        li.addEventListener('click', poSts);
    }
} )
.catch(err => console.log('Error fetching users:', err));