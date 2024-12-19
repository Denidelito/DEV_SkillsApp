window.addEventListener('load', function() {
    const DATA = [
        {
            question: 'Он начал учиться вождению 3.06',
            answers: [
                {
                    id: '1',
                    value: 'третье июня',
                    correct: false,
                },
                {
                    id: '2',
                    value: 'третьего июня',
                    correct: true,
                },
                {
                    id: '3',
                    value: 'три июня',
                    correct: false,
                }
            ]
        },
        {
            question: 'Когда ты&nbsp;отвез пассажира? Я&nbsp;отвез пассажира 15.01',
            answers: [
                {
                    id: '1',
                    value: 'пятнадцатого января',
                    correct: true,
                },
                {
                    id: '2',
                    value: 'пятнадцатое января',
                    correct: false,
                },
                {
                    id: '3',
                    value: 'пятнадцать января',
                    correct: false,
                }
            ]
        },
        {
            question: 'Антон начал выполнять заказы …',
            answers: [
                {
                    id: '1',
                    value: 'седьмое октября',
                    correct: false,
                },
                {
                    id: '2',
                    value: 'седьмого октября',
                    correct: true,
                },
                {
                    id: '3',
                    value: 'семь октября',
                    correct: false,
                }
            ]
        },
        {
            question: 'Я&nbsp;сел за&nbsp;руль в ______ (1987)',
            answers: [
                {
                    id: '1',
                    value: 'в тысяча девятьсот восемьдесят седьмом году',
                    correct: true,
                },
                {
                    id: '2',
                    value: 'тысяча девятьсот восемьдесят седьмой год',
                    correct: false,
                },
                {
                    id: '3',
                    value: 'в тысяча девятьсот восемьдесят восемь года',
                    correct: false,
                }
            ]
        },
        {
            question: 'Я вожу автомобиль с 2023 года.',
            answers: [
                {
                    id: '1',
                    value: 'две тысячи двадцать третьем году',
                    correct: false,
                },
                {
                    id: '2',
                    value: 'с две тысячи двадцать третьего года',
                    correct: true,
                },
                {
                    id: '3',
                    value: 'две тысячи двадцать третьего году',
                    correct: false,
                }
            ]
        },
        {
            question: 'Я купил свою первую машину в 2000',
            answers: [
                {
                    id: '1',
                    value: 'в двухтысячном году',
                    correct: true,
                },
                {
                    id: '2',
                    value: 'двух тысяч года',
                    correct: false,
                },
                {
                    id: '3',
                    value: 'двухтысячным годом',
                    correct: false,
                }
            ]
        },
        {
            question: 'Когда ты&nbsp;арендовал машину? Я&nbsp;арендую автомобиль _______ (23.04.2024)',
            answers: [
                {
                    id: '1',
                    value: 'двадцать третье апреля две тысячи двадцать четвертого года',
                    correct: false,
                },
                {
                    id: '2',
                    value: 'с двадцать третьего апреля две тысячи двадцать четвертого года',
                    correct: true,
                },
                {
                    id: '3',
                    value: 'с двадцать третьего апреля две тысячи двадцать четвертого год',
                    correct: false,
                }
            ]
        },
        {
            question: 'Я выполняю заказы здесь  _______ (23.04.2007)',
            answers: [
                {
                    id: '1',
                    value: 'двадцать третье апреля две тысячи седьмого года',
                    correct: false,
                },
                {
                    id: '2',
                    value: 'с двадцать третьего апреля две тысячи седьмого года',
                    correct: true,
                },
                {
                    id: '3',
                    value: 'с двадцать третьего апреля две тысячи седьмой год',
                    correct: false,
                }
            ]
        },
        {
            question: 'Анна получила права  _______ (2000)',
            answers: [
                {
                    id: '1',
                    value: 'в двухтысячном году',
                    correct: true,
                },
                {
                    id: '2',
                    value: 'двух тысяч года',
                    correct: false,
                },
                {
                    id: '3',
                    value: 'двухтысячным годом',
                    correct: false,
                }
            ]
        },
        {
            question: 'Мы записались на курс  25.07',
            answers: [
                {
                    id: '1',
                    value: 'двадцать пятого июля',
                    correct: true,
                },
                {
                    id: '2',
                    value: 'двадцать пятое июля',
                    correct: false,
                },
                {
                    id: '3',
                    value: 'двадцать пять июля',
                    correct: false,
                }
            ]
        }
    ]

    const test = document.querySelector('.test')
    const questions = document.querySelector('.questions')
    const btnSubmit = document.querySelector('.btn_submit')
    const btnNext = document.querySelector('.btn_next')
    const indicator = document.querySelector('.test_indicator')
    const progress = document.querySelector('.progress_inner')
    const resultsBlock = document.querySelector('.results')
    const results = document.querySelector('.results_inner')
    const btnsControl = document.querySelector('#btns_control')
    const btnDownload = document.querySelector('#download-test')
    const title = document.querySelector('.test_title')

    let currentIndex = 0
    let answersCount = 0
    let testCount = 1

    const renderQuestions = (index) => {
        btnSubmit.disabled = true
        renderIndicator(index + 1)
        currentIndex = index

        const renderAnswers = () => DATA[index].answers
            .map((answer) => `
              <li class="test_item" id="test_item-${answer.id}" data-name=${answer.id} value=${answer.id}>
                ${answer.value}
              </li>
            `)
            .join('')

        questions.innerHTML = ` 
    <div>     
      <p class="question_text">${DATA[index].question}</p>
        <ul class="test_list">${renderAnswers()}</ul>
    </div>
  `
    }

    const renderIndicator = (currentStep) => {
        indicator.innerHTML = `${currentStep}/${DATA.length}`
    }

    const renderProgress = (index) => {
        progress.style.width = `${Math.round(((index) / DATA.length) * 100)}%`
    }

    let currentItem = {}
    let isSelected = false

    const showResults = (index, value, item) => {
        //Показываем ошибку, если ответ неправильный
        if(!DATA[index].answers[value].correct) {
            item.classList.add('test_item--wrong')
        }

        if(DATA[index].answers[value].correct) {
            answersCount++
        }

        //Показывваем правильный ответ
        DATA[index].answers.forEach((el) => {
            if(el.correct) {
                const item = document.querySelector(`#test_item-${el.id}`)
                item.classList.add('test_item--right')
            }
        })

        renderProgress(currentIndex + 1)
        btnNext.classList.remove('hide')
        btnSubmit.classList.add('hide')
        btnSubmit.disabled = true

        return answersCount
    }

//Показываем тоговый результат
    const renderResults = (answers, questionsCount) => {
        resultsBlock.classList.remove('hide')
        btnNext.classList.add('hide')
        questions.classList.add('hide')
        title.classList.add('hide')
        if(btnsControl) btnsControl.style.display = 'grid'
        if(btnDownload) btnDownload.style.display = 'grid'

        let content2 = `
        <span class="result_points">
          ${answers} туура жооптун ичинен ${questionsCount} 
        </span>
        <span class="results_footer">
            Куттуктайбыз! Сиз суроолордун баарына туура жооп бердиңиз!
        </span>
  `

        let content = `
        <span class="result_points">
          ${answers} туура жооптун ичинен ${questionsCount}
        </span>
        <span class="results_footer">
            Куттуктайбыз! Ишти эң жакшы аткардыңыз!
        </span>
   `
        let contentRepeat = `
        <span class="result_points">
          ${answers} туура жооптун ичинен ${questionsCount}
        </span>
        <span class="results_footer">
          Жыйынтыгыңыз абдан начар эмес, бирок теманы дагы бир жолу окуп коюшуңузду сунуштайбыз  
        </span>
        <button class="btn_restart test_btn test_btn--fill">
          Кайра өтүү
        </button>
      `
        let contentRepeat2 = `
        <span class="result_points">
          ${answers} туура жооптун ичинен ${questionsCount}
        </span>
        <span class="results_footer">
          Теманы кайталап, тестти кайрадан тапшырып көрүңүз
        </span>
        <button class="btn_restart test_btn test_btn--fill">
          Кайра өтүү
        </button>
      `

        if(answers == 10) {
            results.innerHTML = content2
            btnDownload.style.display = 'grid'
            localStorage.setItem('testPass', JSON.stringify(testCount))
        }

        if(answers >= 7) {
            results.innerHTML = content
            btnDownload.style.display = 'grid'
            localStorage.setItem('testPass', JSON.stringify(testCount))
        }

        if(answers < 7) {
            if(localStorage.getItem('testFail1')) {
                results.innerHTML = contentRepeat2
            } else {
                results.innerHTML = contentRepeat
            }
        }
    }

    const QuizRepeat = () => {
        if(answersCount < 7) {
            localStorage.setItem('testFail1', true)
        }
        resultsBlock.classList.add('hide')
        questions.classList.remove('hide')
        btnSubmit.classList.remove('hide')
        title.classList.remove('hide')
        btnsControl.style.display = 'none'
        btnDownload.style.display = 'none'
        currentIndex = 0
        answersCount = 0
        renderQuestions(0)
        renderProgress(currentIndex)
    }

    test.addEventListener('click', (event) => {
        const target = event.target


        if(target.classList.contains('test_item')) {
            const item = document.querySelectorAll('.test_item')

            item.forEach((el) => {
                el.classList.remove('test_item--selected')
            })

            target.classList.add('test_item--selected')

            currentItem.value = Number(target.value)

            isSelected = true

            if(isSelected) {
                btnSubmit.disabled = false
            } else {
                btnSubmit.disabled = true
            }

            return currentItem && isSelected
        }

        if(target.classList.contains('btn_restart')) {
            QuizRepeat()
        }
    })


    btnSubmit?.addEventListener('click', () => {
        const item = document.querySelector(`#test_item-${currentItem.value}`)

        showResults(currentIndex, currentItem.value - 1, item)
    })

    btnNext?.addEventListener('click', () => {

        if(DATA.length === currentIndex + 1) {
            renderResults(answersCount, DATA.length)
        } else {
            renderQuestions(currentIndex + 1)
            btnNext.classList.add('hide')
            btnSubmit.classList.remove('hide')
        }
    })

    renderQuestions(0)

});