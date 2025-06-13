const btn = document.querySelector('#btn');
const main = document.querySelector('.container');
const message = pageEles(main,'div', 'Press Start Button', 'message');
const url = '../script/quiz.json';
const output = pageEles(main,'div', '', 'game');
const game = {score:0};


btn.onclick = loadData;

function pageEles(parent, t, html, c){
    const ele = document.createElement(t);
    ele.innerHTML = html;
    ele.classList.add(c);
    return parent.appendChild(ele);
}

function loadData(){
    btn.style.display = 'none';
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const temp = {
            total : data.length,
            q : data,
            counter : 0
        };
        createQuestion(temp);
    })
}

function createQuestion(data){
    const el = pageEles(output, 'div', '', ); 

    
    if(data.q.length == 0){
        message.innerHTML = `<h1>Game Over</h1> <div> You scored ${game.score} out of ${data.total} questions.`;
    } else{
            const tBtn = pageEles(el, 'button', 'Next', 'next');
    tBtn.onclick = () => {
        el.remove();
        createQuestion(data);}

        const question = data.q.shift();
            data.counter++;
                message.textContent = `Question ${data.counter} of ${data.total}`;
                if(data.q.length == 0) tBtn.textContent = 'End Game'
                tBtn.style.display = 'none';
        outputQuestion(question, el, tBtn);
    }
}

function outputQuestion(question, parent, tBtn){
    console.log(question);
    const que = pageEles(parent, 'div', `${question.question}`, 'question');
    const arr = question.opt;
    arr.push(question.answer);
    arr.sort(()=>{
        return Math.random() - 0.5;
        })
        const btns = pageEles(parent, 'div', '', 'opts');
        arr.forEach(e=>{
            const optemp = pageEles(btns, 'button', e, 'btns');
            optemp.onclick = () => {
                if(question.answer == e) {
                    message.textContent = 'Correct';
                    game.score++;
                }else{
                    message.textContent = 'Incorrect';
                }
                const temps = parent.querySelectorAll('.btns');
                temps.forEach(el => {
                    el.disabled = true;
                    const bgc = (question.answer == el.textContent) ? 'green' : 'red';
                    el.style.backgroundColor = bgc;
                    
                })
                tBtn.style.display = 'block';
            }
        })
    console.log(arr);
}

function pageEles(parent,t,html,c){
    const ele = document.createElement(t);
    ele.innerHTML = html;
    ele.classList.add(c);
    return parent.appendChild(ele);
}