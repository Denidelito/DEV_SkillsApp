window.addEventListener('load', function() {
    const test = document.querySelector('.test')
    const testProgress = document.querySelector('.test_progress')
    const questions = document.querySelector('.questions')
    const btnSubmit = document.querySelector('.btn_submit')
// const indicator = document.querySelector('.test_indicator')
    const progress = document.querySelector('.progress_inner')
    const resultsBlock = document.querySelector('.results')
    const results = document.querySelector('.results_inner')
    const formBtn = document.querySelector('#btn_link')
    const img1 = document.querySelector('#img-1')
    const img2 = document.querySelector('#img-2')
    const img3 = document.querySelector('#img-3')
    const img4 = document.querySelector('#img-4')
    const img5 = document.querySelector('#img-5')
    const img6 = document.querySelector('#img-6')
    const img7 = document.querySelector('#img-7')
    const img8 = document.querySelector('#img-8')

    formBtn.classList.add('hide')

    const images = [img1, img2, img3, img4, img5, img6, img7, img8]

    images.forEach((el) => el.classList.add('hide'))

    let questionsLenght = 8

    btnSubmit.addEventListener('click', () => {
            yaCounter97914413.reachGoal('test_sotrudnichestvo_button_click')
        }
    )

// const renderIndicator = (currentStep) => {
//   indicator.innerHTML = `${currentStep}/${questionsLenght}`
// }

    const renderProgress = (index) => {
        progress.style.width = `${Math.round((index / questionsLenght) * 100)}%`
    }

    const renderQuestions = (index) => {
        // renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        questions.innerHTML = ``

        let question2 = `
    <div>     
        <p class="question_text">Сизде Орусияда берилген айдоочулук күбөлүк барбы?</p>
        <ul class="test_list">
          <li class="test_item" data-id="2" data-value="script-1-final">ооба</li>
          <li class="test_item" data-id="2" data-value="script-1-1">жок</li>
        </ul>
    </div>
  `

        let content = `
    <div>     
      <p class="question_text">Канча жаштасыз?</p>
        <ul class="test_list">
        <li class="test_item" data-id="1" data-value="script18">18ден төмөн</li>
        <li class="test_item" data-id="1" data-value="script-2">18 – 21</li>
        <li class="test_item" data-id="1" data-value="script-3">21 жана андан жогору</li>
        </ul>
    </div>
  `

        let question6 = `
    <div>     
    <p class="question_text">Сиз рулда өзүңүздү ишенимдүү сезип, бир калыпта айдайсызбы? </p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="script-77">ооба</li>
      <li class="test_item" data-id="2" data-value="script-77">жок</li>
    </ul>
    </div>
`

        let question7 = `
    <div>     
    <p class="question_text">Машина айдаганды киреше табуунун негизги булагына айлантканга даярсызбы?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="script-8">ооба</li>
      <li class="test_item" data-id="2" data-value="script-8">жок</li>
    </ul>
    </div>
`

        let question8 = `
    <div>     
    <p class="question_text">Сиз бейтааныш адамдар менен бат тил табышасызбы?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="results">ооба</li>
      <li class="test_item" data-id="2" data-value="results">жок</li>
    </ul>
    </div>
`

        switch (index) {
            case 2:
                questions.innerHTML = question2
                break
            case 6:
                questions.innerHTML = question6
                break
            case 7:
                questions.innerHTML = question7
                break
            case 8:
                questions.innerHTML = question8
                break

            default:
                questions.innerHTML = content
        }
    }

    const renderQuestionsVer2 = (index) => {
        //renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        questions.innerHTML = ``

        let question7 = `
    <div>     
    <p class="question_text">Машина айдаганды киреше табуунун негизги булагына айлантканга даярсызбы?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="script-8-7">ооба</li>
      <li class="test_item" data-id="2" data-value="script-8-7">жок</li>
    </ul>
    </div>
`

        let question8 = `
    <div>     
    <p class="question_text">Сиз бейтааныш адамдар менен бат тил табышасызбы?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="results2">ооба</li>
      <li class="test_item" data-id="2" data-value="results2">жок</li>
    </ul>
    </div>
`

        switch (index) {
            case 7:
                questions.innerHTML = question7
                break
            case 8:
                questions.innerHTML = question8
                break
        }
    }

    const renderQuestionsVer3 = (index) => {
        //renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        questions.innerHTML = ``

        let question6 = `
  <div>     
  <p class="question_text">Сиз рулда өзүңүздү ишенимдүү сезип, бир калыпта айдайсызбы?</p>
  <ul class="test_list">
    <li class="test_item" data-id="2" data-value="script-7-1">ооба</li>
    <li class="test_item" data-id="2" data-value="script-7-1">жок</li>
  </ul>
  </div>
`

        let question7 = `
    <div>     
    <p class="question_text">Машина айдаганды киреше табуунун негизги булагына айлантканга даярсызбы?
</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="script-8-1">ооба</li>
      <li class="test_item" data-id="2" data-value="script-8-1">жок</li>
    </ul>
    </div>
`

        let question8 = `
    <div>     
    <p class="question_text">Сиз бейтааныш адамдар менен бат тил табышасызбы?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="results3">ооба</li>
      <li class="test_item" data-id="2" data-value="results3">жок</li>
    </ul>
    </div>
`

        switch (index) {
            case 6:
                questions.innerHTML = question6
                break
            case 7:
                questions.innerHTML = question7
                break
            case 8:
                questions.innerHTML = question8
                break
        }
    }

    const renderQuestionsVer4 = (index) => {
        //renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        questions.innerHTML = ``

        let question7 = `
    <div>     
    <p class="question_text">Машина айдаганды киреше табуунун негизги булагына айлантканга даярсызбы?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="script-ver4">ооба</li>
      <li class="test_item" data-id="2" data-value="script-ver4">жок</li>
    </ul>
    </div>
`

        let question8 = `
    <div>     
    <p class="question_text">Сиз бейтааныш адамдар менен бат тил табышасызбы?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="results4">ооба</li>
      <li class="test_item" data-id="2" data-value="results4">жок</li>
    </ul>
    </div>
`

        switch (index) {
            case 7:
                questions.innerHTML = question7
                break
            case 8:
                questions.innerHTML = question8
                break
        }
    }

    const renderQuestionsVer5 = (index) => {
        //renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        questions.innerHTML = ``

        let question6 = `
  <div>     
  <p class="question_text">Сиз рулда өзүңүздү ишенимдүү сезип, бир калыпта айдайсызбы?</p>
  <ul class="test_list">
    <li class="test_item" data-id="2" data-value="script-ver-5-6">ооба</li>
    <li class="test_item" data-id="2" data-value="script-ver-5-6">жок</li>
  </ul>
  </div>
`

        let question7 = `
    <div>     
    <p class="question_text">Машина айдаганды киреше табуунун негизги булагына айлантканга даярсызбы?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="script-ver-5-7">ооба</li>
      <li class="test_item" data-id="2" data-value="script-ver-5-7">жок</li>
    </ul>
    </div>
`

        let question8 = `
    <div>     
    <p class="question_text">Сиз бейтааныш адамдар менен бат тил табышасызбы?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="results4">ооба</li>
      <li class="test_item" data-id="2" data-value="results4">жок</li>
    </ul>
    </div>
`

        switch (index) {
            case 6:
                questions.innerHTML = question6
                break
            case 7:
                questions.innerHTML = question7
                break
            case 8:
                questions.innerHTML = question8
                break
        }
    }

    const renderQuestionsVer6 = (index) => {
        //renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        questions.innerHTML = ``

        let question6 = `
  <div>     
  <p class="question_text">Сиз рулда өзүңүздү ишенимдүү сезип, бир калыпта айдайсызбы?</p>
  <ul class="test_list">
    <li class="test_item" data-id="2" data-value="script-ver-5-6new">ооба</li>
    <li class="test_item" data-id="2" data-value="script-ver-5-6new">жок</li>
  </ul>
  </div>
`

        let question7 = `
    <div>     
    <p class="question_text">Машина айдаганды киреше табуунун негизги булагына айлантканга даярсызбы?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="script-ver-5-7new">ооба</li>
      <li class="test_item" data-id="2" data-value="script-ver-5-7new">жок</li>
    </ul>
    </div>
`

        let question8 = `
    <div>     
    <p class="question_text">Сиз бейтааныш адамдар менен бат тил табышасызбы?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="results2">ооба</li>
      <li class="test_item" data-id="2" data-value="results2">жок</li>
    </ul>
    </div>
`

        switch (index) {
            case 6:
                questions.innerHTML = question6
                break
            case 7:
                questions.innerHTML = question7
                break
            case 8:
                questions.innerHTML = question8
                break
        }
    }

    const script1 = (index) => {
        //renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Сизде Орусияда берилген айдоочулук күбөлүк барбы?</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="script-6">ооба</li>
        <li class="test_item" data-id="2" data-value="script-1-1">жок</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const renderQuestion8 = (index) => {
        //renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Сиз бейтааныш адамдар менен бат тил табышасызбы?</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="results-5">ооба</li>
        <li class="test_item" data-id="2" data-value="results-5">жок</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const renderQuestion8No = (index) => {
        //renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Сиз бейтааныш адамдар менен бат тил табышасызбы?</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="renderResults8Taxi1">ооба</li>
        <li class="test_item" data-id="2" data-value="renderResults8Taxi2">жок</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const renderQuestion8Yes = (index) => {
        //renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Сиз бейтааныш адамдар менен бат тил табышасызбы?</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="renderResults8Taxi3">ооба</li>
        <li class="test_item" data-id="2" data-value="renderResults8Taxi2">жок</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const renderQuestion7 = (index) => {
        //renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Машина айдаганды киреше табуунун негизги булагына айлантканга даярсызбы?</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="script-7-yes">ооба</li>
        <li class="test_item" data-id="2" data-value="script-7-no">жок</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const script3 = (index) => {
        //renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Сизде Орусияда берилген айдоочулук күбөлүк барбы?</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="script-3-2">ооба</li>
        <li class="test_item" data-id="2" data-value="script-3-1">жок</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const script6 = (index) => {
        //renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Сизде Орусияда берилген айдоочулук күбөлүк барбы?</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="script-3-2">ооба</li>
        <li class="test_item" data-id="2" data-value="script-3-1">жок</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const script1Question3 = (index) => {
        //renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Сизде көрсөтүлгөн өлкөлөрдүн биринин айдоочулук күбөлүгү барбы (Абхазия, Беларусь, Түштүк Осетия, Казакстан, Кыргызстан)</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="script-1-4">ооба</li>
        <li class="test_item" data-id="2" data-value="script-8-final">жок</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const script1Question4 = (index) => {
        //renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Сиз күбөлүк берилген өлкөнүн жаранысызбы? </p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="script-1-final">ооба</li>
        <li class="test_item" data-id="2" data-value="script-8-final">жок</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const script3Question3 = (index) => {
        //renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Сизде көрсөтүлгөн өлкөлөрдүн биринин айдоочулук күбөлүгү барбы (Абхазия, Беларусь, Түштүк Осетия, Казакстан, Кыргызстан)</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="script-3-4">ооба</li>
        <li class="test_item" data-id="2" data-value="script-7">жок</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const script3Question4 = (index) => {
        //renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Сиз күбөлүк берилген өлкөнүн жаранысызбы? </p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="script-ver5">ооба</li>
        <li class="test_item" data-id="2" data-value="script-7-8">жок</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const script3Question5 = (index) => {
        //renderIndicator(index)
        renderProgress(index)
        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Сиздин айдоочулук тажрыйбаңыз 
3 жылдан көппү?</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="script-3-6">ооба</li>
        <li class="test_item" data-id="2" data-value="script-ver4">жок</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const script4Question5 = (index) => {
        //renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Сиздин айдоочулук тажрыйбаңыз 
3 жылдан көппү?</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="script-3-6">ооба</li>
        <li class="test_item" data-id="2" data-value="script-6-8new">жок</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const script3Question6 = (index) => {
        //renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Сиз рулда өзүңүздү ишенимдүү сезип, бир калыпта айдайсызбы?</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="script-ver-7">ооба</li>
        <li class="test_item" data-id="2" data-value="script-ver4-7">жок</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const renderResultsScript1 = () => {
        resultsBlock.classList.remove('hide')
        questions.classList.add('hide')
        btnSubmit.classList.add('hide')
        testProgress.classList.add('hide')
        formBtn.classList.remove('hide')

        results.innerHTML = `
    <div>
        <div class="results_title">Чоң рахмат!</div>
        <div class="results_text">Учурда сиз өзүңүздү курьер катары сынап көрө аласыз: авто, жөө же велосипедде. Айдоочулук жөндөмүңүздү жакшыртыңыз, анан сиздин айдоочулук тажрыйбаңыз 3 жылдан ашканда, такси айдоочусу боло аласыз.</div>
    </div>
  `
    }

    const renderResults8 = () => {
        results.innerHTML = `
    <div>
        <div class="results_title">Чоң рахмат!</div>
        <div class="results_text">Сиз өзүңүздү жөө курьер же велосипедчен курьер катары сынап көрө аласыз!</div> 
    </div>
  `

        resultsBlock.classList.remove('hide')
        questions.classList.add('hide')
        btnSubmit.classList.add('hide')
        testProgress.classList.add('hide')
        formBtn.classList.remove('hide')
    }

    const renderResults8Taxi1 = () => {
        formBtn.classList.remove('hide')

        results.innerHTML = `
    <div>
        <div class="results_title">Чоң рахмат!</div>
        <div class="results_text">Сизге такси айдоочусу болгон мыкты жарашат экен! Яндекс кызматташтыктын түрдүү форматтарын сунуштайт: таксиде күнүнө бир нече саат гана иштесе болот</div>
    </div>
  `

        resultsBlock.classList.remove('hide')
        questions.classList.add('hide')
        btnSubmit.classList.add('hide')
        testProgress.classList.add('hide')
    }

    const renderResults8Taxi2 = () => {
        formBtn.classList.remove('hide')
        testProgress.classList.add('hide')

        results.innerHTML = `
    <div>
        <div class="results_title">Чоң рахмат!</div>
        <div class="results_text">кызматташуу ылайык келет. 
    Коммуникациялык жөндөмдөрүңүздү өстүрүңүз. Адамдар менен баарлашуу – таксист үчүн маанилүү жөндөм.</div>
    </div>
  `

        resultsBlock.classList.remove('hide')
        questions.classList.add('hide')
        btnSubmit.classList.add('hide')
    }

    const renderResults8Taxi3 = () => {
        formBtn.classList.remove('hide')
        testProgress.classList.add('hide')

        results.innerHTML = `
    <div>
        <div class="results_title">Чоң рахмат!</div>
        <div class="results_text">Куттуктайбыз! Такси айдоочусу болууга абдан ылайыктуу экенсиз.
    Яндекс Про менен </div>
    </div>
  `

        resultsBlock.classList.remove('hide')
        questions.classList.add('hide')
        btnSubmit.classList.add('hide')
    }

    const renderResults18 = () => {
        results.innerHTML = `
    <div>
        <div class="results_title">Чоң рахмат!</div>
        <div class="results_text">Тилекке каршы, биз жашы 18ден жогору адамдар менен гана кызматташабыз. 
    18ге толоруңуз менен жөө курьер же велосипедчен курьер болуудан баштап көрсөңүз болот. 
    Эгер айдоочулук күбөлүккө ээ болсоңуз, автокурьер болуп көрө аласыз. 
    Айдоочулук жөндөмүңүздү өстүрүп, жетиштүү тажрыйба алгандан кийин такси айдоочусу боло аласыз.</div>
    </p>
  `

        resultsBlock.classList.remove('hide')
        questions.classList.add('hide')
        btnSubmit.classList.add('hide')
        testProgress.classList.add('hide')
        formBtn.classList.remove('hide')
    }

    const renderResults2 = (index) => {
        resultsBlock.classList.remove('hide')
        questions.classList.add('hide')
        btnSubmit.classList.add('hide')
        testProgress.classList.add('hide')
        formBtn.classList.remove('hide')

        let results1 = `
    <div>
        <div class="results_title">Чоң рахмат!</div>
        <div class="results_text">Сизге Яндекс менен жөө курьер же велосипедчен курьер катары кызматташтык ылайык келет. 
    Сиз айдоочулук күбөлүктү орус тилинде алып, такси айдоочусу боло аласыз.</div>
    </div>
  `

        let results2 = `
  <div>
    <div class="results_title">Чоң рахмат!</div>
    <div class="results_text">Сиз өзүңүздү жөө курьер же велосипедчен курьер катары сынап көрсөңүз болот. 
  Айдоочулук жөндөмүңүздү өстүрүп, такси айдоочусу боло аласыз.</div>
  </div>
`

        let results4 = `
<div>
    <div class="results_title">Чоң рахмат!</div>
    <div class="results_text">Сиз өзүңүздү жөө курьер же велосипедчен курьер катары сынап көрсөңүз болот. 
Айдоочулук жөндөмүңүздү өстүрүп, такси айдоочусу боло аласыз.</div>
</div>
`

        switch (index) {
            case 1:
                results.innerHTML = results1
                break
            case 2:
                results.innerHTML = results2
                break
            case 4:
                results.innerHTML = results4
                break
        }
    }

    const renderResults3 = () => {
        results.classList.remove('hide')
        questions.classList.add('hide')
        btnSubmit.classList.add('hide')
        testProgress.classList.add('hide')
        formBtn.classList.remove('hide')

        results.innerHTML = `
    <p>
    Сизге Яндекс менен жөө курьер же велосипедчен курьер катары кызматташтык ылайык келет. 
    Сиз айдоочулук күбөлүктү орус тилинде алып, такси айдоочусу боло аласыз. 

    </p>
  `
    }

    test.addEventListener('click', (event) => {
        const target = event.target

        if (target.classList.contains('test_item')) {
            const item = document.querySelectorAll('.test_item')

            item.forEach((el) => {
                el.classList.remove('test_item--selected')
            })

            target.classList.add('test_item--selected')
        }
    })

    btnSubmit?.addEventListener('click', () => {
        const item = document.querySelector('.test_item--selected')

        switch (item.dataset.value) {
            case 'script18':
                renderResults18()
                break
            case 'script-1':
                script1(2)
                break
            case 'script-1-final':
                renderQuestions(6)
                break
            case 'script-1-1':
                script1Question3(3)
                break
            case 'script-1-4':
                script1Question4(4)
                break
            case 'script-2':
                renderQuestions(2)
                break
            case 'script-3':
                script3(3)
                break
            case 'script-ver4':
                renderQuestionsVer5(6)
                break
            case 'script-3-1':
                script3Question3(3)
                break
            case 'script-3-2':
                script3Question5(5)
                break
            case 'script-3-4':
                script3Question4(4)
                break
            case 'script-3-6':
                script3Question6(6)
                break
            case 'script-4':
                script1Question4(4)
                break
            case 'script-ver5':
                script4Question5(5)
                break
            case 'script-6':
                renderQuestions(6)
                break
            case 'script-6-1':
                renderQuestionsVer3(6)
                break
            case 'script-ver-5-6':
                renderQuestionsVer5(7)
                break
            case 'script-ver-5-6new':
                renderQuestionsVer6(7)
                break
            case 'script-6-8':
                renderQuestionsVer5(6)
                break
            case 'script-6-8new':
                renderQuestionsVer6(6)
                break
            case 'script-ver-5-7':
                renderQuestionsVer5(8)
                break
            case 'script-ver-5-7new':
                renderQuestionsVer6(8)
                break
            case 'script-ver-7':
                renderQuestion7(7)
                break
            case 'script-77':
                renderQuestions(7)
                break
            case 'script-7':
                renderQuestion8(8)
                break
            case 'script-7-1':
                renderQuestionsVer3(7)
                break
            case 'script-8-1':
                renderQuestionsVer3(8)
                break
            case 'script-8':
                renderQuestions(8)
                break
            case 'script-7-8':
                renderQuestionsVer2(7)
                break
            case 'script-8-7':
                renderQuestionsVer2(8)
                break
            case 'script-7-yes':
                renderQuestion8Yes(8)
                break
            case 'script-7-no':
                renderQuestion8No(8)
                break
            case 'script-8-final':
                renderQuestion8(8)
                break
            case 'script-ver4-7':
                renderQuestionsVer5(7)
                break
            case 'results':
                renderResultsScript1()
                break
            case 'results2':
                renderResults2(1)
                break
            case 'results3':
                renderResults2(2)
                break
            case 'results4':
                renderResults2(4)
                break
            case 'results-5':
                renderResults8()
                break
            case 'renderResults8Taxi1':
                renderResults8Taxi1()
                break
            case 'renderResults8Taxi2':
                renderResults8Taxi2()
                break
            case 'renderResults8Taxi3':
                renderResults8Taxi3()
                break
        }
    })

    renderQuestions(1)
});