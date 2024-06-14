const messages = [
  {
    img: "https://via.placeholder.com/40",
    messages: [
      {
        text: "Привет, как дела?",
        time: "10:00",
      },
      {
        text: "Я так устал работать :(",
        time: "10:00",
      },
      {
        text: "Не хочешь сегодня прогуляться?",
        time: "10:01",
      },
    ],
    isAuthor: false,
  },
  {
    img: "https://via.placeholder.com/40",
    messages: [
      {
        text: "Привет, все супер!",
        time: "10:05",
        replyTo: "Привет, как дела? fjfjfjfj",
      },
      {
        text: "Давай в 15:00?",
        time: "10:05",
        replyTo: "Не хочешь сегодня прогуляться?",
      },
    ],
    isAuthor: true,
  },
  {
    img: "https://via.placeholder.com/40",
    messages: [
      {
        text: "Отлично! Тогда до встречи!",
        time: "10:10",
        replyTo: "Давай в 15:00?",
      },
      {
        text: "Смотри че нашел!",
        time: "10:10",
        attachments: [
          {
            type: "image",
            url: "https://sun9-5.userapi.com/impg/9SLlwSIwkBrMAB9_hh4ZA011Qscz7NMzUo8CEQ/q58Ba6fzOIM.jpg?size=1620x2160&quality=95&sign=7ca5b70116acdf079eeb809a21769f62&type=album",
            width: 1620,
            height: 2160,
          },
          {
            type: "image",
            url: "https://via.placeholder.com/150",
            width: 120,
            height: 130,
          },
          {
            type: "image",
            url: "https://via.placeholder.com/140",
            width: 100,
            height: 260,
          },
          {
            type: "image",
            url: "https://via.placeholder.com/160",
            width: 130,
            height: 220,
          },
          {
            type: "image",
            url: "https://via.placeholder.com/145",
            width: 150,
            height: 360,
          },
        ],
      },
    ],
    isAuthor: false,
  },
  {
    img: "https://via.placeholder.com/40",
    messages: [
      {
        text: "Как тебе?",
        time: "10:10",
        replyTo: "Смотри че нашел!",
        attachments: [
          {
            type: "image",
            url: "https://via.placeholder.com/600",
            width: 600,
            height: 400,
          },
        ],
      },
    ],
    isAuthor: true,
  },
];

const chats = [
  {
    img: "https://via.placeholder.com/40",
    name: "Вася",
    lastMessage: "Привет, как дела?",
    time: "10:00",
    unread: 2,
  },
  {
    img: "https://via.placeholder.com/40",
    name: "Петя",
    lastMessage: "Привет, все супер!",
    time: "10:05",
    unread: 1,
  },
  {
    img: "https://via.placeholder.com/40",
    name: "Коля",
    lastMessage: "Отлично! Тогда до встречи!",
    time: "10:10",
    unread: 0,
  },
  {
    img: "https://via.placeholder.com/40",
    name: "Маша",
    lastMessage: "Как тебе?",
    time: "10:10",
    unread: 0,
  },
]

export { messages };
