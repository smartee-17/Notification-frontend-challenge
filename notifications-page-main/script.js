// backup dataset
const allNotifications = [
  { 
    id: 'msg1',
    image: 'assets/images/avatar-mark-webber.webp',
    name: 'Mark Webber',
    action: 'reacted to your recent post',
    message: 'My first tournament today!',
    period: '1m ago',
     type: 'Msg'
  }, {
    id: 'msg2',
    image: 'assets/images/avatar-angela-gray.webp',
    name: 'Angela Gray',
    action: 'followed you',
    message: '',
    period: '5m ago',
    type: 'Msg'
  },  {
    id: 'msg3',
    image: 'assets/images/avatar-jacob-thompson.webp',
    name: 'Jacob Thompson',
    action: 'has joined your group',
    message: '',
    period: '1 day ago',
    type: 'clubMsg',
    clubMsg: 'Chess Club'
  }, {
    id: 'msg4',
    image: 'assets/images/avatar-rizky-hasanuddin.webp',
    name: 'Rizky Hasanuddin',
    action: 'sent you a private message',
    message: '',
    period: '5 days ago',
    type: ['long-message', 'Msg'],
    recievedMessage: `Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and 
    I'm already having lots of fun and improving my game.`
  },  {
    id: 'msg5',
    image: 'assets/images/avatar-kimberly-smith.webp',
    name: 'Kimberly Smith',
    action: 'commented on your picture',
    message: '',
    period: '1 week ago',
    type: ['image-message', 'Msg'],
    imageRecieved: `assets/images/image-chess.webp`
  }, {
    id: 'msg6',
    image: 'assets/images/avatar-nathan-peterson.webp',
    name: 'Nathan Peterson',
    action: 'reacted to your recent post',
    message: '5 end-game strategies to increase your win rate',
    period: '2 weeks ago',
    type: 'Msg'
  }, {
    id: 'msg7',
    image: 'assets/images/avatar-anna-kim.webp',
    name: 'Anna Kim ',
    action: 'left the group',
    message: '',
    period: '2 weeks ago',
    type: 'clubMsg',
    clubMsg: 'Chess Club'
  }
];

let notifications = allNotifications.slice();

const articleElement = document.querySelector('.js-article');

const notificationNoElement = document.querySelector('.js-notification-no');

render();
storeNotificationNo();

function render() {
  // articleElement.innerHTML = "";

  allNotifications.forEach((element) => {
    const typeArray = Array.isArray(element.type) ? element.type : [element.type];

    // created Element
    const wrapperDiv = document.createElement('div');
    wrapperDiv.id = `${element.id}`;
    wrapperDiv.classList.add('js-wrapper');
    wrapperDiv.classList.add('cursor');
    wrapperDiv.classList.add('wrapper');
    wrapperDiv.classList.add('flex-row'); 
    wrapperDiv.classList.add('unread-bg-color')

    const profileImg = document.createElement('img');
    profileImg.src = element.image;
    profileImg.alt = 'Profile Image';
    profileImg.classList.add('profile-image')
    wrapperDiv.appendChild(profileImg);

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('flex-column');
    infoDiv.classList.add('info-div');

    const descP = document.createElement('p');
    descP.classList.add('desc-p');

    const name = document.createElement('span');
    name.textContent = element.name;
    name.classList.add('name');
    name.classList.add('margin-p');
    name.classList.add('hover');
    name.classList.add('transition')


    const action = document.createElement('span');
    action.textContent = element.action;
    action.classList.add('margin-p');
    

    const msgSpan = document.createElement('span');
      msgSpan.classList.add('msg');
      msgSpan.dataset.type = typeArray.join(" ");
      msgSpan.classList.add('msg');
      msgSpan.classList.add('margin-p');
      msgSpan.classList.add('hover');
      msgSpan.classList.add('transition')

    const unread = document.createElement('span');
    unread.classList.add('unread');
    unread.classList.add('js-unread');

    descP.appendChild(name);
    descP.appendChild(action);
    descP.appendChild(msgSpan);
    descP.appendChild(unread);
    infoDiv.appendChild(descP);
    wrapperDiv.appendChild(infoDiv);

    const Period = document.createElement('p');
    Period.textContent = element.period
    Period.classList.add('period')

    infoDiv.appendChild(Period);

    // Unread and read check
    wrapperDiv.dataset.id = element.id;

      // console.log(isUnread);

   if (typeArray.includes('clubMsg')) {
      msgSpan.classList.replace('msg', 'club-msg');
      msgSpan.textContent = element.clubMsg;
    } 
    if (typeArray.includes('Msg')){
      msgSpan.textContent = element.message;
    }

    if (typeArray.includes('long-message')) {
      const longMsg = document.createElement('p');
      longMsg.classList.add('recieve-msg');

      infoDiv.classList.add('flex-column');
      wrapperDiv.classList.add('long-msg');

      longMsg.textContent = element.recievedMessage;

      infoDiv.appendChild(longMsg)
    } 
    
    if (typeArray.includes('image-message')) {
      const img = document.createElement('img');
      img.src = `${element.imageRecieved}`;
      img.alt = 'Chess image';

      wrapperDiv.classList.add('flex-end');
      img.classList.add('image-msg');
 
      wrapperDiv.appendChild(img);
    } 


    // Wrapper eventlistener
    wrapperDiv.addEventListener('click', () => {
      const id = wrapperDiv.dataset.id;

      toggleRead(id);
      
      console.log(wrapperDiv.classList.contains('read'));            
      
      console.log(unread.classList.contains('hidden'));

      console.log(wrapperDiv.classList.contains('unread-bg-color'));

      const isUnread = notifications.some(n => String(n.id) === String(element.id));

      if (isUnread) {
        wrapperDiv.classList.remove('read');
        unread.classList.remove('hidden');
        wrapperDiv.classList.add('unread-bg-color');
        unread.classList.add('unread');
      
      }  else {
        wrapperDiv.classList.add('read');
        unread.classList.add('hidden');
        wrapperDiv.classList.remove('unread-bg-color');
        unread.classList.remove('unread');
      }
  

    });
    
    articleElement.appendChild(wrapperDiv);
});
}

  // mark all eventListener
  document.querySelector('.js-mark-all').addEventListener('click', () => {
      markAllRead();
    }
  );


  // Mark all Read function
  function markAllRead() {
    if (notifications.length > 0) {
      document.querySelectorAll('.js-unread').forEach(item => {
        item.classList.remove('unread');
        item.classList.add('hidden');
      })

      document.querySelectorAll('.js-wrapper').forEach(item => {
        item.classList.add('read');
        item.classList.remove('unread-bg-color');
      });

      notifications = [];
    } else {
      notifications = allNotifications.slice();

      document.querySelectorAll('.js-unread').forEach(item => {
        item.classList.add('unread');
        item.classList.remove('hidden');
      });

      document.querySelectorAll('.js-wrapper').forEach(item => {
        item.classList.remove('read');
        item.classList.add('unread-bg-color');
      });
    }

    storeNotificationNo();
  }



// Toggle Read function
function toggleRead(id){
  const isUnread = notifications.some(n => String(n.id) === String(id));

  if(isUnread) {
    notifications = notifications.filter(n => String(n.id) !== String(id));
  } else{

    const restored = allNotifications.find(n => String(n.id) === String(id));

    if (restored){
        const already = notifications.some(n => {
          String(n.id) === String(id)
        });

        if(!already){
          notifications.push(restored);
        }
    }
  }

  storeNotificationNo();
}

// Store Notification no
function storeNotificationNo() {
    return notificationNoElement.textContent= Number(notifications.length);
}