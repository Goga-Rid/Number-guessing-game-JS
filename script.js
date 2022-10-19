
      /*----------------------- (Вводим переменные)Генерируем случайное число и подключаем селекторы к переменным JS ------------------------------ */
      let randomNumber = Math.floor(Math.random() * 100) + 1;
      const guesses = document.querySelector('.guesses');
      const lastResult = document.querySelector('.lastResult');
      const lowOrHi = document.querySelector('.lowOrHi');
      const guessSubmit = document.querySelector('.guessSubmit');
      const guessField = document.querySelector('.guessField');
      let guessCount = 1;
      let resetButton;

      /*----------------------- Вводим функцию которая смотрит на вводимое число и говорит правильно или нет, выводит к соответствующим селекторам------------------------------ */
      function checkGuess() {
        const userGuess = Number(guessField.value);
        if (guessCount === 1  ) {
          guesses.textContent = 'Предыдущие догадки: ';
        }
        
          guesses.textContent += userGuess + ' ';

        if (userGuess === randomNumber) {
          lastResult.textContent = 'Превосходно ты угадал, теперь советую пойти в казино!';
          lastResult.style.backgroundColor = '#009900';
          lowOrHi.textContent = '';
          setGameOver();
        } else if (guessCount === 10) {
          lastResult.textContent = 'Не судьба друг мой(((';
          lowOrHi.textContent = '';
          setGameOver();
        } else {
          lastResult.textContent = 'Неправильное предположение';
          lastResult.style.backgroundColor = 'tomato';
          if(userGuess < randomNumber) {
            lowOrHi.textContent = 'последнее предположение было далеко!  (бери больше)' ;
          } else if(userGuess > randomNumber) {
            lowOrHi.textContent = 'последнее предположение было близко!  (бери меньше)';
          }
        }

        guessCount++;
        guessField.value = '';
        guessField.focus();
      }

      guessSubmit.addEventListener('click', checkGuess);
/*----------------------- Вводим функцию, выводящую кнопку попытаться снова  ------------------------------ */
      function setGameOver() {
        guessField.disabled = true;
        guessSubmit.disabled = true;
        resetButton = document.createElement('button');
        resetButton.textContent = 'Попытаться снова';
        resetButton.backgroundColor = '#000000';
        document.body.appendChild(resetButton);
        resetButton.addEventListener('click', resetGame);
      }
/*----------------------- Вводим функцию, выполняющую попытку снова, возвращает к началу  ------------------------------ */
      function resetGame() {
        guessCount = 1;
        const resetParas = document.querySelectorAll('.resultParas p');
        for (const resetPara of resetParas) {
          resetPara.textContent = '';
        }

        resetButton.parentNode.removeChild(resetButton);
        guessField.disabled = false;
        guessSubmit.disabled = false;
        guessField.value = '';
        guessField.focus();
        lastResult.style.backgroundColor = 'white';
        randomNumber = Math.floor(Math.random() * 100) + 1;
      }
      /*-----------------------Функция для ограничения ввода чисел  ------------------------------ */
      function imposeMinMax(numb) {
        if(numb.value != ""){
          if(parseInt(numb.value) < parseInt(numb.min)){
            numb.value = numb.min;
          }
          if(parseInt(numb.value) > parseInt(numb.max)){
            numb.value = numb.max;
          }
        }
      }
/*----------------------- Функция для работы клавиши Enter  ------------------------------ */
            document.querySelector('input').addEventListener('keydown', function(e) {
              if (e.keyCode === 13) {
                checkGuess();
              }
            });

        
    
    