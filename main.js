const questions = [
  { question: "Как называется роман, в котором есть глава под названием «Бэла»?", options: ["Герой нашего времени", "Капитанская дочка", "Война и мир", "Анна Каренина"], answer: "Герой нашего времени" },
  { question: "Кто является автором романа «Герой нашего времени»?", options: ["Александр Пушкин", "Михаил Лермонтов", "Иван Тургенев", "Фёдор Достоевский"], answer: "Михаил Лермонтов" },
  { question: "В каком году был написан роман М. Ю. Лермонтова «Герой нашего времени»?", options: ["1825", "1838", "1840", "1852"], answer: "1840" },
  { question: "Кем был Максим Максимыч, поведавший рассказчику печальную историю Бэле?", options: ["Генерал", "Офицер", "Слуга", "Крестьянин"], answer: "Офицер" },
  { question: "Как звали сына князя, который часто наведывался в крепость к русским офицерам?", options: ["Георгий", "Азамат", "Петр", "Владимир"], answer: "Азамат" },
  { question: "Сколько лет было Бэле, когда Печорин впервые увидел ее на свадьбе?", options: ["12", "16", "18", "20"], answer: "16" },
  { question: "Что так страстно желал иметь Азамат, что даже предлагал Казбичу свою сестру Бэлу в качестве платы?", options: ["Конь", "Саблю", "Лошадь", "Деньги"], answer: "Конь" },
  { question: "Кто помог Азамату выкрасть коня у Казбича?", options: ["Печорин", "Максим Максимыч", "Георгий", "Никита"], answer: "Печорин" },
  { question: "Что получил Печорин за свое участие в краже коня?", options: ["Золото", "Славу", "Серебро", "Бэлу"], answer: "Бэлу" },
  { question: "Кто лишил Бэлу жизни?", options: ["Печорин", "Азамат", "Казбич", "Максим Максимыч"], answer: "Казбич" }
];

const shuffledQuestions = questions.sort(() => Math.random() - 0.5); // Перемешиваем вопросы

// Функция для генерации HTML-кода вопросов
function loadQuestions() {
  const testContainer = document.getElementById("test-container");
  if (!testContainer) {
      console.error("Контейнер для тестов не найден.");
      return;
  }

  shuffledQuestions.forEach((item, index) => {
      const questionCard = document.createElement("div");
      questionCard.classList.add("question-card");
      questionCard.innerHTML = `
          <p><strong>Вопрос ${index + 1}:</strong> ${item.question}</p>
          ${item.options.map(option => `
              <label>
                  <input type="radio" name="question${index}" value="${option}">
                  ${option}
              </label>
          `).join('')}
      `;
      testContainer.appendChild(questionCard);
  });
}

// Проверка и вывод результатов теста
function submitTest() {
  let score = 0;
  let incorrectAnswers = [];

  shuffledQuestions.forEach((item, index) => {
      const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
      if (selectedOption && selectedOption.value === item.answer) {
          score++;
      } else {
          // Добавляем неверные ответы для отображения позже
          incorrectAnswers.push({ question: item.question, selected: selectedOption ? selectedOption.value : "Не отвечено", correct: item.answer, number: index + 1 });
      }
  });

  const resultContainer = document.getElementById("result");
  if (resultContainer) {
      resultContainer.innerHTML = `Ваш результат: ${score} из ${shuffledQuestions.length}`;

      // Отображение неверных ответов
      if (incorrectAnswers.length > 0) {
          const incorrectContainer = document.createElement("div");
          incorrectContainer.innerHTML = "<h3>Неверные ответы:</h3>";
          incorrectAnswers.forEach(item => {
              incorrectContainer.innerHTML += `
                  <p><strong>Вопрос ${item.number}:</strong> ${item.question}</p>
                  <p>Ваш ответ: ${item.selected}</p>
                  <p>Правильный ответ: ${item.correct}</p>
                  <hr>
              `;
          });
          resultContainer.appendChild(incorrectContainer);
      }
  } else {
      console.error("Контейнер для результатов не найден.");
  }
}

window.onload = loadQuestions;
