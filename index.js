var $start = document.querySelector('#start') //подключили кнопку начать
var $game = document.querySelector('#game') //подключение backGround игрового поля\
var $time = document.querySelector('#time')//подключение таймера
var $timeHeader = document.querySelector('#time-header')//подключение заголовка с таймером
var $resultHeader = document.querySelector('#result-header')//подключение счётчика очков
var $result = document.querySelector('#result')//подключение результата счётчика
var $gameTime = document.querySelector('#game-time')//подклбчения поля ввода

var score = 0 //счётчик очков(по умолчанию равен нулю)
var isGameStarted = false //игра не активна пока не нажата кнопка 'начать'

$start.addEventListener('click', startGame) //добавления события на кнопку 'начать'
$game.addEventListener('click', handleBoxClick)//добавление события на клик в игровом поле box
$gameTime.addEventListener('input', setGameTime)//добавление отслеживания содержимого input

function show($el){ //функция для отображения элементов
    $el.classList.remove('hide') //функция для 
}

function hide($el){ //функция для скрытия элементов
    $el.classList.add('hide')
}


function startGame() { 
    $gameTime.setAttribute('disabled', true)//блокирует поле ввода после запуска игры
    setGameTime()
    score = 0//обнуление счётчика результа после рестарта игры
    isGameStarted = true//игра активна после клика по кнопке 'начать'
    $game.style.backgroundColor = '#fff'//изменение цвета backGround игрового поля
    hide($start) //скрывает кнопку 'начать'

    var intelval = setInterval(function(){ //интервал таймера
    var time = parseFloat($time.textContent)
        
        if(time <= 0){
            clearInterval(intelval)//сброс интервала
            endGame()//конец игры
        }else{
            $time.textContent = (time - 0.1).toFixed(1)//обратный отсчёт
        }
    }, 100)

    renderBox()//генерация рандомных квадратов на игровом поле
}

function setGameScore(){//подсчёт результата
    $result.textContent = score.toString()
}

function setGameTime(){ //задаётся значение таймера
    var time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)//показывает таймер после рестарта игры
    hide($resultHeader)//скрывает счётчик результата после рестарта игры
}

function endGame(){
    $gameTime.removeAttribute('disabled')//разброкирует поле ввода после окончания игры
    isGameStarted = false//игра остонавливается при окончании обратного отсчёта
    setGameScore()
    show($start)//отображение кнопки после остановки игры
    $game.innerHTML = ''//удаление квадрата с игрового поля после окончания игры
    $game.style.backgroundColor = '#ccc'//сброс игрового поля после остановки игры
    hide($timeHeader)//скрывает таймер после окончания игры
    show($resultHeader)//показывает счётчик очков после окончания игры
}

function handleBoxClick(event){ //если при проверке обьект является квадратом то генерируется новый квадрат
    if(!isGameStarted){
        return
    }
    if(event.target.dataset.box){
        renderBox() //создание нового квадрата
        score++ //+1 в счётчик очков
    }
}

function renderBox(){ //генерация рандомных квадратов на игровом поле
    $game.innerHTML = ''//удаление старого квадрата, при создании нового во время клика
    var box = document.createElement('div')//создание div, в котом будут генерироваться рандомные квадраты
    var boxSize = getRandom(30, 100)//создание рандомной высоты для квадрата
    var gameSize = $game.getBoundingClientRect()//вычисление размера игрового поля
    var maxTop = gameSize.height - boxSize//максимальное значение отклонения
    var maxLeft = gameSize.width - boxSize//максимальное значение отклонения
    var boxColor = '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase()//создание рандомного цвета для квадратов
    //console.log(boxColor);

    box.style.height = box.style.width = boxSize + 'px'//длина и высота для созданного выше div
    box.style.position = 'absolute'//Абсолютно позиционируемый элемент
    box.style.backgroundColor = boxColor //задание цвета квадратам
    box.style.top = getRandom(0, maxTop) + 'px'//максимальное значение отклонения
    box.style.left = getRandom(0, maxLeft) + 'px'//максимальное значение отклонения
    box.style.cursor = 'pointer'//pointer на квадраты
    box.setAttribute('data-box', 'true')//проверке с помощью данного атрибута можно проверить: является ли элемент квадратом при клике на него
    box.classList.add('radius')//добавляет скругления у квадратов

    $game.insertAdjacentElement('afterbegin', box)//добавляет переданный элемент в DOM дерево, 'afterbegin':сразу после открывающего тега element

}

function getRandom(min, max){ //возвращает значение какого-либо числа в заданном диапазоне
    return Math.floor(Math.random() * (max - min) + min) //создание рандомных высот(значений) для квадрата
}




