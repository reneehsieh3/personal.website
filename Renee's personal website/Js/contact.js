$(document).ready(function () {

    firebase.initializeApp({
        apiKey: "AIzaSyAAvY1RierNixpq5XnGnXY0WJjY2pVo2mc",
        authDomain: "renee-3f116.firebaseapp.com",
        projectId: "renee-3f116",
        storageBucket: "renee-3f116.firebasestorage.app",
        messagingSenderId: "757432938246",
        appId: "1:757432938246:web:1fadc255aaa3a099caf887"
    });

    let chatroomDocRef = firebase.firestore()
        .collection("chatrooms")
        .doc("Guest Message");  

    let messagesCollectionRef
        = chatroomDocRef.collection("Guests")

    let queryMessagesCollectionRef
        = messagesCollectionRef.orderBy("timeStamp", "asc");

    const $nameField = $('#g-name');
    const $titleField = $('#g-title');
    const $messageField = $('#g-message');
    const $submitBtn = $('#g-submit');
    const $messageList = $('#message-list');

    $submitBtn.on('click', function (e) {
        e.preventDefault();

        let name = $nameField.val();
        let title = $titleField.val();
        let content = $messageField.val();

        messagesCollectionRef.add({
            name: name,
            title: title,
            message: content,

        })
      $nameField.val('');
      $titleField.val('');
      $messageField.val('');
    })




  });

  queryMessageBoardRef.onSnapshot(function (querySnapshot) {
    $messageList.html("");

    querySnapshot.forEach(function (doc) {
      let data = doc.data();

      let name = data.name || "anonymous";
      let title = data.title || "";
      let content = data.content || "";

      let messageItem = `
        <li class="message-item">
          <div class="mb-header">
            <strong class="mb-name">${name}</strong>
            <span class="mb-title">${title}</span>
          </div>
          <div class="mb-content">${content}</div>
        </li>
      `;

      $messageList.append(messageItem);
    });

    //SCROLL TO BOTTOM OF MESSAGE LIST
    $messageList[0].scrollTop = $messageList[0].scrollHeight;
  });

