(function () {

  const featuresOption = document.querySelectorAll('.features__option')
  const questions = document.querySelectorAll('.question__heading-wrapper')
  const answers = document.querySelectorAll('.question__answer')
  const formButton = document.querySelector('.form__button')
  const formInput = document.querySelector('.form__input')
  const inputContainer = document.querySelector('.form__input-container')
  const navHamburger = document.querySelector('.nav__hamburger')
  const navClose = document.querySelector('.nav__close')
  const pageBody = document.querySelector('.body')
  const navLinks = document.querySelector('.nav__links-container')
  const navLogo = document.querySelector('.nav__logo')

  /* ------ HELPERS -------*/
  function hideAnswers() {
    answers.forEach(answer => {
      answer.dataset.answer_height = answer.clientHeight
      answer.style.height = 0
    })
  }

  function addActiveQuestion(target) {
    target.classList.add('active-question')
    const height = target.nextElementSibling.dataset.answer_height
    target.nextElementSibling.style.height = `${height}px`
    target.nextElementSibling.style.margin = `2rem 0`
    target.children[1].classList.add('question__svg--active')
  }

  function removeActiveQuestion(target) {
    target.classList.remove('active-question')
    target.nextElementSibling.style.height = `0`
    target.nextElementSibling.style.margin = `0`
    target.children[1].classList.remove('question__svg--active')
  }

  const validateEmail = (email) => {
    let reg = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/
    return reg.test(email)
  }

  /* ------ EVENT LISTENERS -------*/
  featuresOption.forEach(option => {
    option.addEventListener('click', e => {
      if (!e.target.classList.contains('features__option--active')) {
        document.querySelector('.features__option--active').classList.remove('features__option--active')
        document.querySelector('.features-card--active').classList.remove('features-card--active')
        e.target.classList.add('features__option--active')
        document.querySelector(`#features-card-${e.target.dataset.feature_option}`).classList.add('features-card--active')
      }
    })
  })

  questions.forEach(question => {
    question.addEventListener('click', e => {
      let target = e.target
      if (target.tagName === 'H4' || target.tagName === 'svg') target = target.parentNode
      if (target.tagName === 'path') target = target.parentNode.parentNode
      if (target.classList.contains('active-question')) removeActiveQuestion(target)
      else {
        const currentlyActive = document.querySelector('.active-question')
        currentlyActive !== null && removeActiveQuestion(currentlyActive)
        addActiveQuestion(target)
      }
    })
  })

  formButton.addEventListener('click', e => {
    e.preventDefault()
    const validEmail = validateEmail(formInput.value)
    if (!validEmail) inputContainer.classList.add('form__input--invalid')
    else inputContainer.classList.remove('form__input--invalid')
  })

  navHamburger.addEventListener('click', e => {
    navHamburger.style.display = 'none'
    navClose.style.display = 'block'
    navLinks.classList.add('nav__links-container--mobile')
    pageBody.classList.add('hide-overflow')
    navLogo.classList.add('light-path')
  })

  navClose.addEventListener('click', e => {
    navClose.style.display = 'none'
    navHamburger.style.display = 'block'
    navLinks.classList.remove('nav__links-container--mobile')
    pageBody.classList.remove('hide-overflow')
    navLogo.classList.remove('light-path')
  })

  hideAnswers()

})()
