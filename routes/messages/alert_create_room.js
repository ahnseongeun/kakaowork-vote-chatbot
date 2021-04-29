alert_create_room_generator = (conversationId) => {
  return ({
		conversationId: conversationId,
		text: '투표가 생성되었습니다!',
		blocks: [
      	{
			  type: 'header',
			  text: '투표가 생성되었습니다!',
			  style: 'blue'
      	},
      	{
      		"type": "text",
      		"text": "투표를 진행할 투표방이 생성되었습니다!",
      		"markdown": true
    	}
		]
  })
 	}

module.exports = alert_create_room_generator
