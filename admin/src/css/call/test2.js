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
        <p class="question_text">Sizda Rossiyada berilgan 
haydovchilik guvohnomasi bormi?</p>
        <ul class="test_list">
          <li class="test_item" data-id="2" data-value="script-1-final">ha</li>
          <li class="test_item" data-id="2" data-value="script-1-1">yoʻq</li>
        </ul>
    </div>
  `

        let content = `
    <div>     
      <p class="question_text">Yoshingiz nechada?</p>
        <ul class="test_list">
        <li class="test_item" data-id="1" data-value="script18">18 dan kam</li>
        <li class="test_item" data-id="1" data-value="script-2">18 – 21</li>
        <li class="test_item" data-id="1" data-value="script-3">21 va undan yuqori</li>
        </ul>
    </div>
  `

        let question6 = `
    <div>     
    <p class="question_text">Rulda oʻzingizni ishonchli his qilasizmi va ehtiyotkor haydash uslubini saqlaysizmi?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="script-77">ha</li>
      <li class="test_item" data-id="2" data-value="script-77">yoʻq</li>
    </ul>
    </div>
`

        let question7 = `
    <div>     
    <p class="question_text">Mashina haydashni asosiy daromad manbaiga aylantirishga tayyormisiz?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="script-8">ha</li>
      <li class="test_item" data-id="2" data-value="script-8">yoʻq</li>
    </ul>
    </div>
`

        let question8 = `
    <div>     
    <p class="question_text">Begona odamlar bilan tez til topishib ketasizmi?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="results">ha</li>
      <li class="test_item" data-id="2" data-value="results">yoʻq</li>
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
        // renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        questions.innerHTML = ``

        let question7 = `
    <div>     
    <p class="question_text">Mashina haydashni asosiy daromad manbaiga aylantirishga tayyormisiz?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="script-8-7">ha</li>
      <li class="test_item" data-id="2" data-value="script-8-7">yoʻq</li>
    </ul>
    </div>
`

        let question8 = `
    <div>     
    <p class="question_text">Begona odamlar bilan tez til topishib ketasizmi?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="results2">ha</li>
      <li class="test_item" data-id="2" data-value="results2">yoʻq</li>
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
        // renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        questions.innerHTML = ``

        let question6 = `
  <div>     
  <p class="question_text">Rulda oʻzingizni ishonchli his qilasizmi va ehtiyotkor haydash uslubini saqlaysizmi?</p>
  <ul class="test_list">
    <li class="test_item" data-id="2" data-value="script-7-1">ha</li>
    <li class="test_item" data-id="2" data-value="script-7-1">yoʻq</li>
  </ul>
  </div>
`

        let question7 = `
    <div>     
    <p class="question_text">Mashina haydashni asosiy daromad manbaiga aylantirishga tayyormisiz?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="script-8-1">ha</li>
      <li class="test_item" data-id="2" data-value="script-8-1">yoʻq</li>
    </ul>
    </div>
`

        let question8 = `
    <div>     
    <p class="question_text">Begona odamlar bilan tez til topishib ketasizmi?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="results3">ha</li>
      <li class="test_item" data-id="2" data-value="results3">yoʻq</li>
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
        // renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        questions.innerHTML = ``

        let question7 = `
    <div>     
    <p class="question_text">Mashina haydashni asosiy daromad manbaiga aylantirishga tayyormisiz?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="script-ver4">ha</li>
      <li class="test_item" data-id="2" data-value="script-ver4">yoʻq</li>
    </ul>
    </div>
`

        let question8 = `
    <div>     
    <p class="question_text">Begona odamlar bilan tez til topishib ketasizmi?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="results4">ha</li>
      <li class="test_item" data-id="2" data-value="results4">yoʻq</li>
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
        // renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        questions.innerHTML = ``

        let question6 = `
  <div>     
  <p class="question_text">Rulda oʻzingizni ishonchli his qilasizmi va ehtiyotkor haydash uslubini saqlaysizmi?</p>
  <ul class="test_list">
    <li class="test_item" data-id="2" data-value="script-ver-5-6">ha</li>
    <li class="test_item" data-id="2" data-value="script-ver-5-6">yoʻq</li>
  </ul>
  </div>
`

        let question7 = `
    <div>     
    <p class="question_text">Mashina haydashni asosiy daromad manbaiga aylantirishga tayyormisiz?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="script-ver-5-7">ha</li>
      <li class="test_item" data-id="2" data-value="script-ver-5-7">yoʻq</li>
    </ul>
    </div>
`

        let question8 = `
    <div>     
    <p class="question_text">Begona odamlar bilan tez til topishib ketasizmi?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="results4">ha</li>
      <li class="test_item" data-id="2" data-value="results4">yoʻq</li>
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
        // renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        questions.innerHTML = ``

        let question6 = `
  <div>     
  <p class="question_text">Rulda oʻzingizni ishonchli his qilasizmi va ehtiyotkor haydash uslubini saqlaysizmi?</p>
  <ul class="test_list">
    <li class="test_item" data-id="2" data-value="script-ver-5-6new">ha</li>
    <li class="test_item" data-id="2" data-value="script-ver-5-6new">yoʻq</li>
  </ul>
  </div>
`

        let question7 = `
    <div>     
    <p class="question_text">Mashina haydashni asosiy daromad manbaiga aylantirishga tayyormisiz?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="script-ver-5-7new">ha</li>
      <li class="test_item" data-id="2" data-value="script-ver-5-7new">yoʻq</li>
    </ul>
    </div>
`

        let question8 = `
    <div>     
    <p class="question_text">Begona odamlar bilan tez til topishib ketasizmi?</p>
    <ul class="test_list">
      <li class="test_item" data-id="2" data-value="results2">ha</li>
      <li class="test_item" data-id="2" data-value="results2">yoʻq</li>
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
        // renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Sizda Rossiyada berilgan haydovchilik guvohnomasi bormi?</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="script-6">ha</li>
        <li class="test_item" data-id="2" data-value="script-1-1">yoʻq</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const renderQuestion8 = (index) => {
        // renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Begona odamlar bilan tez til topishib ketasizmi?</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="results-5">ha</li>
        <li class="test_item" data-id="2" data-value="results-5">yoʻq</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const renderQuestion8No = (index) => {
        // renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Begona odamlar bilan tez til topishib ketasizmi?</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="renderResults8Taxi1">ha</li>
        <li class="test_item" data-id="2" data-value="renderResults8Taxi2">yoʻq</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const renderQuestion8Yes = (index) => {
        // renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Begona odamlar bilan tez til topishib ketasizmi?</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="renderResults8Taxi3">ha</li>
        <li class="test_item" data-id="2" data-value="renderResults8Taxi2">yoʻq</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const renderQuestion7 = (index) => {
        // renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Mashina haydashni asosiy daromad manbaiga aylantirishga tayyormisiz?</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="script-7-yes">ha</li>
        <li class="test_item" data-id="2" data-value="script-7-no">yoʻq</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const script3 = (index) => {
        // renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Sizda Rossiyada berilgan 
haydovchilik guvohnomasi bormi?</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="script-3-2">ha</li>
        <li class="test_item" data-id="2" data-value="script-3-1">yoʻq</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const script6 = (index) => {
        // renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Sizda Rossiyada berilgan haydovchilik guvohnomasi bormi?</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="script-3-2">ha</li>
        <li class="test_item" data-id="2" data-value="script-3-1">yoʻq</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const script1Question3 = (index) => {
        // renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Sizda quyida koʻrsatilgan mamlakatlardan birining haydovchilik guvohnomasi bormi (Abxaziya, Belarus, Janubiy Osetiya, Qozogʻiston, Qirgʻiziston)</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="script-1-4">ha</li>
        <li class="test_item" data-id="2" data-value="script-8-final">yoʻq</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const script1Question4 = (index) => {
        // renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Siz haydovchilik guvohnomangiz berilgan mamlakat fuqarosi hisoblanasizmi?</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="script-1-final">ha</li>
        <li class="test_item" data-id="2" data-value="script-8-final">yoʻq</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const script3Question3 = (index) => {
        // renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Sizda quyida koʻrsatilgan mamlakatlardan birining haydovchilik guvohnomasi bormi (Abxaziya, Belarus, Janubiy Osetiya, Qozogʻiston, Qirgʻiziston)</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="script-3-4">ha</li>
        <li class="test_item" data-id="2" data-value="script-7">yoʻq</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const script3Question4 = (index) => {
        // renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Siz haydovchilik guvohnomangiz berilgan mamlakat 
fuqarosi hisoblanasizmi?</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="script-ver5">ha</li>
        <li class="test_item" data-id="2" data-value="script-7-8">yoʻq</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const script3Question5 = (index) => {
        // renderIndicator(index)
        renderProgress(index)
        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Haydovchilik stajingiz 
3 yildan ortiqmi?</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="script-3-6">ha</li>
        <li class="test_item" data-id="2" data-value="script-ver4">yoʻq</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const script4Question5 = (index) => {
        // renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Haydovchilik stajingiz 
3 yildan ortiqmi?</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="script-3-6">ha</li>
        <li class="test_item" data-id="2" data-value="script-6-8new">yoʻq</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const script3Question6 = (index) => {
        // renderIndicator(index)
        renderProgress(index)

        images.forEach((el) => el.classList.add('hide'))

        const img = document.querySelector(`#img-${index}`)
        img.classList.remove('hide');

        let question = `
  <div>     
      <p class="question_text">Rulda oʻzingizni ishonchli his qilasizmi va ehtiyotkor haydash uslubini saqlaysizmi?</p>
      <ul class="test_list">
        <li class="test_item" data-id="2" data-value="script-ver-7">ha</li>
        <li class="test_item" data-id="2" data-value="script-ver4-7">yoʻq</li>
      </ul>
  </div>
`

        questions.innerHTML = question
    }

    const renderResultsScript1 = () => {
        resultsBlock.classList.remove('hide')
        questions.classList.add('hide')
        btnSubmit.classList.add('hide')
        // testProgress.classList.add('hide')
        formBtn.classList.remove('hide')

        results.innerHTML = `
    <div class="">
        <p class="results_title">Rahmat!</p>
        <p class="results_text">Endi siz oʻzingizni avtomobilda, piyoda yoki velosipeddagi kuryer sifatida sinab koʻrishingiz mumkin. Haydovchilik mahoratingizni oshiring va haydovchilik stajingiz 3 yildan oshganda, taksi haydovchisi boʻlishingiz mumkin. 
    </p>
  `
    }

    const renderResults8 = () => {
        results.innerHTML = `
    <div>
        <p class="results_title">Rahmat!</p>
        <p class="results_text">Oʻzingizni piyoda kuryer yoki velosipeddagi kuryer sifatida sinab koʻrishingiz mumkin!</p> 
    </div>
  `

        resultsBlock.classList.remove('hide')
        questions.classList.add('hide')
        btnSubmit.classList.add('hide')
        // testProgress.classList.add('hide')
        formBtn.classList.remove('hide')
    }

    const renderResults8Taxi1 = () => {
        formBtn.classList.remove('hide')

        results.innerHTML = `
    <div>
        <p class="results_title">Rahmat!</p>
        <p class="results_text">Sizga taksi haydovchisi boʻlish keladi!
    Yandex turli xil hamkorlik formatlarini taklif etadi: siz kuniga bir necha soat taksida ishlashingiz mumkin</p>
    </p>
  `

        resultsBlock.classList.remove('hide')
        questions.classList.add('hide')
        btnSubmit.classList.add('hide')
        // testProgress.classList.add('hide')
    }

    const renderResults8Taxi2 = () => {
        formBtn.classList.remove('hide')
//  testProgress.classList.add('hide')

        results.innerHTML = `
    <div>
        <p class="results_title">Rahmat!</p>
        <p class="results_text">Taksi haydovchisi sifatida 
    Yandex bilan hamkorlik qilish sizga mos keladi. Muloqot mahoratingizni oshiring. Odamlar bilan muloqot – haydovchi uchun muhim mahoratdir.</p>
    </p>
  `

        resultsBlock.classList.remove('hide')
        questions.classList.add('hide')
        btnSubmit.classList.add('hide')
    }

    const renderResults8Taxi3 = () => {
        formBtn.classList.remove('hide')
        // testProgress.classList.add('hide')

        results.innerHTML = `
    <div>
        <p class="results_title">Rahmat!</p>
        <p class="results_text">Tabriklaymiz! Taksi haydovchisi boʻlish uchun juda mossiz.
    Tez va qulay boshlash mumkin. Yandex Pro bilan</p>
    </p>
  `

        resultsBlock.classList.remove('hide')
        questions.classList.add('hide')
        btnSubmit.classList.add('hide')
    }

    const renderResults18 = () => {
        results.innerHTML = `
    <div>
        <p class="results_title">Rahmat!</p>
        <p class="results_text">Afsuski, biz 18 yoshdan yuqori boʻlgan odamlar bilan hamkorlik qilamiz. 18 yoshga toʻlishingiz bilan oʻzingizni piyoda kuryer yoki velosipeddagi kuryer sifatida sinab koʻrishingiz mumkin. Agar haydovchilik guvohnomasi olsangiz, avtokuryer boʻlishingiz mumkin. Haydovchilik mahoratingizni oshirib, yetarli tajribaga ega boʻlsangiz, taksi haydovchisi boʻlishingiz mumkin.</p>
    </p>
  `

        resultsBlock.classList.remove('hide')
        questions.classList.add('hide')
        btnSubmit.classList.add('hide')
        // testProgress.classList.add('hide')
        formBtn.classList.remove('hide')
    }

    const renderResults2 = (index) => {
        resultsBlock.classList.remove('hide')
        questions.classList.add('hide')
        btnSubmit.classList.add('hide')
        // testProgress.classList.add('hide')
        formBtn.classList.remove('hide')

        let results1 = `
    <div>
        <p class="results_title">Rahmat!</p>
        <p class="results_text">Yandex bilan piyoda kuryer yoki velosipeddagi kuryer sifatida hamkorlik qilish sizga mos keladi. Siz rus tilida haydovchilik guvohnomasini olishingiz va taksi haydovchisi boʻlishingiz mumkin.</p> 
    </p>
  `

        let results2 = `
  <div>
    <p class="results_title">Rahmat!</p>
    <p class="results_text">Oʻzingizni piyoda kuryer yoki velosipeddagi kuryer sifatida sinab koʻrishingiz mumkin. Haydovchilik mahoratingizni oshiring va taksi haydovchisi boʻlishingiz mumkin.</p>
  </p>
`

        let results4 = `
<div>
    <p class="results_title">Rahmat!</p>
    <p class="results_text">Oʻzingizni piyoda kuryer yoki velosipeddagi kuryer sifatida sinab koʻrishingiz mumkin. Haydovchilik mahoratingizni oshiring va taksi haydovchisi boʻlishingiz mumkin.</p>
</p>
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
        // testProgress.classList.add('hide')
        formBtn.classList.remove('hide')

        results.innerHTML = `
    <p>
    Yandex bilan piyoda kuryer yoki velosipeddagi kuryer sifatida hamkorlik qilish sizga mos keladi. Siz rus tilida haydovchilik guvohnomasini olishingiz va taksi haydovchisi boʻlishingiz mumkin. 
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