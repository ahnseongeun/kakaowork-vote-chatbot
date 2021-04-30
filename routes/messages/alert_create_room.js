alert_create_room_generator = (conversationId) => {
  return ({
		"conversationId": conversationId,
		"text": "투표 만들기 완료 ✨",
		"blocks": [
      	{
			  "type": "header",
			  "text": "투표 만들기 완료 ✨",
			  "style": "yellow"
      	},
      	{
      		"type": "text",
      		"text": "투표가 완성되었어요 👀 \n\n투표를 진행할 새로운 톡방을 만들어 드렸습니다 \n팀원들을 초대하여 투표를 시작해보세요 Let's Go~!!",
      		"markdown": true
    	}
		]
  })
 	}

module.exports = alert_create_room_generator
