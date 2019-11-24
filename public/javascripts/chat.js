const nickname = Math.random();
document.getElementById('nickname').innerText = nickname;
const wsc = new WebSocket('wss://localhost:3000/');

wsc.onopen = () => {
  console.info('Connected to server');
  document.send_message.elements['send'].disabled = false;

  document.send_message.elements['send'].addEventListener('click', () => {
    const messageInput = document.send_message.elements['message'];
    wsc.send(JSON.stringify({
      nickname,
      message: messageInput.value
    }));
    messageInput.value = '';
  });
};

wsc.onmessage = event => {
  const data = JSON.parse(event.data);
  const nickname = document.createElement('dt');
  nickname.innerText = data.nickname;
  const message = document.createElement('dd');
  message.innerText = data.message;
  const chat = document.getElementById('chat');
  chat.append(nickname);
  chat.append(message);
};
