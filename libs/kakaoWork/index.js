const Config = require('config')

const axios = require('axios')
const kakaoInstance = axios.create({
  baseURL: 'https://api.kakaowork.com',
  headers: {
    Authorization: `Bearer ${Config.keys.kakaoWork.bot}`
  }
})

// 유저 목록 검색 (1)
exports.getUserList = async () => {
  const res = await kakaoInstance.get('/v1/users.list')
  return res.data.users
}

// 채팅방 생성 (2)
exports.openConversations = async ({ userId }) => {
  const data = {
    user_id: userId
  }
  const res = await kakaoInstance.post('/v1/conversations.open', data)
  return res.data.conversation
}

// 그룹 채팅방 생성
// Usage : openGroupConversations({userIds:[투표 생성자 userid]})
exports.openGroupConversations = async ({ userIds }) => {
  const data = {
    user_ids: userIds
  }
  const res = await kakaoInstance.post('/v1/conversations.open', data)
  return res.data.conversation
}
//

// 메시지 전송 (3)
exports.sendMessage = async ({ conversationId, text, blocks }) => {
  const data = {
    conversation_id: conversationId,
    text,
    ...blocks && { blocks }
  }
  const res = await kakaoInstance.post('/v1/messages.send', data)
  return res.data.message
}

exports.kickUser = async ({ user_id, conversation_id }) => {
  const data = {
    user_ids: [user_id]
  }
  const res = await kakaoInstance.post('/v1/conversations/' + `${conversation_id}` + '/kick', data)
  return res.data
}

//유저 모두 가져오기
exports.getAllUserList = async () => {
	let users = [];
	let res = await kakaoInstance.get('/v1/users.list');
    let cursor = res.data.cursor;
	users = users.concat(res.data.users);

  	while(true){
	  res = await kakaoInstance.get(`/v1/users.list?cursor=${cursor}`);
	  cursor = res.data.cursor
	  if(cursor === null) break;
  	  users = users.concat(res.data.users);
  	}
	
	return users;
}

